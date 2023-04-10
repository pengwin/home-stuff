import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import { TestInfo, Page } from '@playwright/test';

interface Coverage {
    start(page: Page, testInfo: TestInfo): Promise<Coverage>;
    collect(page: Page, testInfo: TestInfo): Promise<Coverage>;
}

class PageCoverage implements Coverage {
    async start(page: Page, testInfo: TestInfo): Promise<Coverage> {
        const projectName = testInfo.project.name;
        if (projectName !== 'chromium') {
            return this;
        }

        await page.coverage.startJSCoverage({
            resetOnNavigation: false,
        });
        return this;
    }

    async collect(page: Page, testInfo: TestInfo): Promise<Coverage> {
        const projectName = testInfo.project.name;
        if (projectName !== 'chromium') {
            return this;
        }

        const fullPath = testInfo.titlePath.join('_');
        const hash = hashCode(fullPath).toString();

        const baseUrl = testInfo.project?.use?.baseURL;
        if (baseUrl == null) {
            throw new Error('base url is null');
        }

        const coverage = (await page.coverage.stopJSCoverage()).filter(entry =>
            checkUrl(entry.url, baseUrl),
        );

        const e2eV8RawDir = './.artifacts/e2e/v8-raw';

        if (!existsSync(e2eV8RawDir)) {
            await mkdir(e2eV8RawDir, { recursive: true });
        }

        const v8CoveragePath = path.join(e2eV8RawDir, `coverage_${hash}.json`);

        // eslint-disable-next-line no-console
        console.info(`Writing coverage for ${fullPath}`);
        await writeFile(v8CoveragePath, JSON.stringify(coverage));
        return this;
    }
}

function checkUrl(url: string, baseUrl: string): boolean {
    if (!baseUrl.endsWith('/')) {
        baseUrl = baseUrl + '/';
    }
    const u = url.replace(baseUrl, '');

    return u.startsWith('src/') && !u.endsWith('.css');
}

function hashCode(s: string) {
    let h = 0;
    const l = s.length;
    let i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
}

export const coverage = new PageCoverage();
