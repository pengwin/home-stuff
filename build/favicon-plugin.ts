import { HtmlTagDescriptor, Plugin, ConfigEnv, Rollup } from 'vite';
import favicons, { FaviconOptions } from 'favicons';
import { parse, HTMLElement } from 'node-html-parser';

function generateTags(
    files: Array<{ tagName: string; attrs: Record<string, string> }>,
    options: FaviconOptions,
): HtmlTagDescriptor[] {
    const fileTags: HtmlTagDescriptor[] = files.map(f => ({
        tag: f.tagName,
        attrs: f.attrs,
        injectTo: 'head-prepend',
    }));

    const additionalTags: HtmlTagDescriptor[] = [
        {
            tag: 'meta',
            attrs: {
                name: 'description',
                content: options.appDescription,
            },
            injectTo: 'head-prepend',
        },
    ];

    return fileTags.concat(additionalTags);
}

interface FaviconPluginOptions {
    icon: string;
    favicon: FaviconOptions;
}

interface WebmanifestIcon {
    src: string;
}

interface WebmanifestType {
    icons: WebmanifestIcon[];
}

export const faviconPlugin: (
    opts: FaviconPluginOptions,
    env: ConfigEnv,
) => Plugin = (opts, env) => {
    const isProd = env.mode === 'production';
    const filesRefs: Map<string, string> = new Map<string, string>();
    const itemsToHeader: Array<{
        tagName: string;
        attrs: Record<string, string>;
    }> = [];

    let normalizedAssetPath = opts.favicon.path || '/assets';
    if (!normalizedAssetPath.endsWith('/')) {
        normalizedAssetPath = normalizedAssetPath + '/';
    }

    return {
        name: 'favicon-plugin',
        async buildStart() {
            if (!isProd) {
                return;
            }

            const response = await favicons(opts.icon, opts.favicon);

            for (const image of response.images) {
                const ref = this.emitFile({
                    type: 'asset',
                    name: image.name,
                    source: image.contents,
                });
                filesRefs.set(image.name, ref);
            }

            for (const file of response.files) {
                const ref = this.emitFile({
                    type: 'asset',
                    name: file.name,
                    source: file.contents,
                });
                filesRefs.set(file.name, ref);
            }

            for (const html of response.html) {
                const items = parse(html);
                for (const node of items.childNodes) {
                    const item = node as HTMLElement;
                    itemsToHeader.push({
                        tagName: item.tagName.toLowerCase(),
                        attrs: item.attributes,
                    });
                }
            }
        },
        resolveFileUrl(opts) {
            this.warn(opts.fileName);
            return null;
        },
        generateBundle(_, bundle) {
            const assets = Object.keys(bundle)
                .map(k => bundle[k])
                .filter(f => f.type === 'asset') as Rollup.OutputAsset[];

            const manifestAsset = assets.find(f =>
                f.fileName.endsWith('.webmanifest'),
            );
            if (manifestAsset) {
                const manifest: WebmanifestType = JSON.parse(
                    manifestAsset.source.toString(),
                );

                for (const icon of manifest.icons) {
                    const iconFile = icon.src.replace(normalizedAssetPath, '');
                    const ref = filesRefs.get(iconFile);
                    if (!ref) {
                        this.error(`Ref for file ${iconFile} is not found`);
                        continue;
                    }
                    const fileName = this.getFileName(ref);
                    icon.src = `/${fileName}`;
                }

                manifestAsset.source = JSON.stringify(manifest, null, 2);
            }

            for (const itemToHeader of itemsToHeader) {
                for (const k of Object.keys(itemToHeader.attrs)) {
                    if (k === 'href') {
                        const hrefValue = itemToHeader.attrs[k];
                        const hrefFile = hrefValue.replace(
                            normalizedAssetPath,
                            '',
                        );
                        const ref = filesRefs.get(hrefFile);
                        if (!ref) {
                            this.error(`Ref for file ${hrefFile} is not found`);
                            continue;
                        }
                        const fileName = this.getFileName(ref);
                        itemToHeader.attrs[k] = `/${fileName}`;
                    }
                }
            }
        },
        transformIndexHtml() {
            if (!isProd) {
                return [];
            }

            return generateTags(itemsToHeader, opts.favicon);
        },
    };
};
