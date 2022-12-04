import fs from 'fs/promises';

const colors = [
    'brightgreen',
    'green',
    'yellowgreen',
    'yellow',
    'orange',
    'red',
];

const step = 100 / colors.length;

function getPercentageColor(pct) {
    const res = 100 - pct;
    const index = Math.floor(res / step);
    return colors[index];
}

export function replace(content, label, pct) {
    // ![](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF.svg?prefix=$lines$)

    const start = `${label}-`;
    const end = '.svg?prefix=$lines$';
    const startPos = content.indexOf(start) + start.length;
    const endPos = content.indexOf(end, startPos);
    const prefix = content.substr(0, startPos);
    const postfix = content.substr(endPos);
    return prefix + `${pct}%-${getPercentageColor(pct)}` + postfix;
}

/* c8 ignore start */
async function main() {
    const coverageUnit = await loadCoverage(
        './.artifacts/coverage/coverage-summary.json',
        'lines',
    );
    const coverageE2e = await loadCoverage(
        './.artifacts/e2e/coverage/coverage-summary.json',
        'lines',
    );

    let readme = await fs.readFile('./README.md', 'utf-8');
    readme = replace(readme, 'Unit_Test_Coverage', coverageUnit);
    readme = replace(readme, 'E2E_Coverage', coverageE2e);

    await fs.writeFile('./README.md', readme);
}

async function loadCoverage(file, type) {
    const coverageStr = await fs.readFile(file, 'utf-8');
    const coverage = JSON.parse(coverageStr);
    return coverage.total[type].pct;
}
/* c8 ignore stop */

if (typeof module === 'undefined') {
    main();
}
