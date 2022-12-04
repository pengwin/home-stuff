import { writeFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import { TestInfo, Page } from '@playwright/test';

import v8toIstanbul from 'v8-to-istanbul';

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

        await page.coverage.startJSCoverage();
        return this;
    }

    async collect(page: Page, testInfo: TestInfo): Promise<Coverage> {
        const projectName = testInfo.project.name;
        if (projectName !== 'chromium') {
            return this;
        }

        const coverage = await page.coverage.stopJSCoverage();
        let counter = 0;
        const e2eRawDir = './.artifacts/e2e/raw/';
        if (existsSync(e2eRawDir)) {
            await rm(e2eRawDir, { recursive: true });
        }
        await mkdir(e2eRawDir, { recursive: true });

        for (const entry of coverage) {
            if (!checkUrl(entry.url, testInfo.project.use.baseURL)) {
                continue;
            }

            const converter = v8toIstanbul('', 0, { source: entry.source });

            await converter.load();
            converter.applyCoverage(entry.functions);
            const coverageResult = JSON.stringify(converter.toIstanbul());
            const coveragePath = path.join(
                e2eRawDir,
                `coverage_${counter}.json`,
            );
            // eslint-disable-next-line no-console
            console.info(`${counter}: Write coverage for ${entry.url}`);
            await writeFile(coveragePath, coverageResult);
            counter++;
        }
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

export const coverage = new PageCoverage();
