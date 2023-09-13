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

function getBadge(label, pct) {
    if (pct === null) {
        return `https://img.shields.io/badge/${label}-unknown-lightgrey`;
    }
    const color = getPercentageColor(pct);
    return `https://img.shields.io/badge/${label}-${pct}%25-${color}`;
}

export function replace(content, anchor, label, pct) {
    // ![](https://img.shields.io/badge/Unit_Test_Coverage-100%-0000FF)

    const start = `![${anchor}](`;
    const end = ')';
    const startPos = content.indexOf(start) + start.length;
    const endPos = content.indexOf(end, startPos);
    return (
        content.substring(0, startPos) +
        getBadge(label, pct) +
        content.substring(endPos)
    );
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
    readme = replace(
        readme,
        'UnitTestCoverage',
        'Unit_Test_Coverage',
        coverageUnit,
    );
    readme = replace(readme, 'E2ECoverage', 'E2E_Coverage', coverageE2e);

    await fs.writeFile('./README.md', readme);
}

async function checkFile(file) {
    try {
        await fs.access(file, fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

async function loadCoverage(file, type) {
    if (!(await checkFile(file))) {
        return null;
    }
    const coverageStr = await fs.readFile(file, 'utf-8');
    const coverage = JSON.parse(coverageStr);
    return coverage.total[type].pct;
}
/* c8 ignore stop */

if (typeof module === 'undefined') {
    main();
}
