import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OWNER = 'oboroge0';
const REPO = 'AITuberFlow';
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;
const DATA_DIR = path.join(process.cwd(), 'data', 'download-stats');
const PUBLIC_DIR = path.join(process.cwd(), 'landing', 'public');
const SUMMARY_PATH = path.join(DATA_DIR, 'summary.json');
const HISTORY_PATH = path.join(DATA_DIR, 'history.ndjson');
const SVG_PATH = path.join(PUBLIC_DIR, 'download-stats.svg');

const PLATFORMS = [
  {
    key: 'windows_x64',
    label: 'Windows x64',
    color: '#60a5fa',
    match: (name) => name.includes('x64-setup.exe') && !name.endsWith('.sig'),
  },
  {
    key: 'macos_apple_silicon',
    label: 'macOS Apple Silicon',
    color: '#a78bfa',
    match: (name) => name.includes('aarch64.dmg') && !name.endsWith('.sig'),
  },
  {
    key: 'macos_intel',
    label: 'macOS Intel',
    color: '#f59e0b',
    match: (name) => name.includes('x64.dmg') && !name.endsWith('.sig'),
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function platformCountsFromAssets(assets) {
  const counts = Object.fromEntries(PLATFORMS.map((platform) => [platform.key, 0]));

  for (const asset of assets || []) {
    const platform = PLATFORMS.find((candidate) => candidate.match(asset.name));
    if (platform) counts[platform.key] += asset.download_count || 0;
  }

  return counts;
}

function buildSummary(release, previous) {
  const counts = platformCountsFromAssets(release.assets || []);
  const previousCounts = previous?.installer_downloads?.by_platform || {};
  const byPlatform = {};
  let total = 0;
  let totalDelta = 0;

  for (const platform of PLATFORMS) {
    const count = counts[platform.key] || 0;
    const previousCount = previousCounts[platform.key]?.count ?? 0;
    byPlatform[platform.key] = {
      label: platform.label,
      count,
      delta_since_previous: count - previousCount,
    };
    total += count;
    totalDelta += count - previousCount;
  }

  const macTotal = byPlatform.macos_apple_silicon.count + byPlatform.macos_intel.count;
  const macIntelShare = macTotal > 0 ? byPlatform.macos_intel.count / macTotal : null;

  return {
    generated_at: new Date().toISOString(),
    repository: `${OWNER}/${REPO}`,
    release: {
      tag_name: release.tag_name,
      name: release.name,
      html_url: release.html_url,
      published_at: release.published_at,
    },
    installer_downloads: {
      total,
      delta_since_previous: totalDelta,
      by_platform: byPlatform,
      macos_intel_share: macIntelShare,
    },
  };
}

function renderSvg(summary) {
  const width = 760;
  const height = 360;
  const chartX = 54;
  const chartY = 92;
  const chartWidth = 652;
  const barHeight = 34;
  const barGap = 20;
  const maxCount = Math.max(1, ...PLATFORMS.map((platform) => summary.installer_downloads.by_platform[platform.key].count));
  const total = summary.installer_downloads.total;
  const generated = new Date(summary.generated_at).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

  const bars = PLATFORMS.map((platform, index) => {
    const item = summary.installer_downloads.by_platform[platform.key];
    const y = chartY + index * (barHeight + barGap);
    const barWidth = Math.round((item.count / maxCount) * chartWidth);
    const share = total > 0 ? Math.round((item.count / total) * 1000) / 10 : 0;
    const delta = item.delta_since_previous;
    const deltaText = delta === 0 ? '' : ` (${delta > 0 ? '+' : ''}${delta})`;

    return `
      <g>
        <text x="${chartX}" y="${y - 10}" fill="#d4d4d8" font-size="15" font-weight="600">${escapeXml(item.label)}</text>
        <rect x="${chartX}" y="${y}" width="${chartWidth}" height="${barHeight}" rx="10" fill="#18181b" />
        <rect x="${chartX}" y="${y}" width="${barWidth}" height="${barHeight}" rx="10" fill="${platform.color}" />
        <text x="${chartX + 14}" y="${y + 23}" fill="#ffffff" font-size="14" font-weight="700">${item.count.toLocaleString()}${escapeXml(deltaText)}</text>
        <text x="${chartX + chartWidth - 12}" y="${y + 23}" text-anchor="end" fill="#a1a1aa" font-size="13">${share}%</text>
      </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="AITuberFlow installer downloads by platform">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#09090f" />
      <stop offset="55%" stop-color="#111827" />
      <stop offset="100%" stop-color="#312e81" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" rx="24" fill="url(#bg)" />
  <circle cx="650" cy="40" r="160" fill="#7c3aed" opacity="0.16" />
  <circle cx="110" cy="320" r="140" fill="#06b6d4" opacity="0.10" />
  <g filter="url(#shadow)">
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="20" fill="#09090b" opacity="0.74" stroke="#ffffff" stroke-opacity="0.08" />
  </g>
  <text x="54" y="58" fill="#ffffff" font-size="26" font-weight="800">AITuberFlow Downloads</text>
  <text x="54" y="80" fill="#a1a1aa" font-size="13">Installer downloads by platform · ${escapeXml(summary.release.tag_name)} · total ${total.toLocaleString()}</text>
  ${bars}
  <text x="54" y="310" fill="#71717a" font-size="12">Generated from public GitHub Release asset download_count. Updated: ${escapeXml(generated)}</text>
</svg>
`;
}

async function readPreviousSummary() {
  if (!existsSync(SUMMARY_PATH)) return null;
  return JSON.parse(await readFile(SUMMARY_PATH, 'utf8'));
}

const response = await fetch(API_URL, {
  headers: {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'aituber-flow-download-stats',
  },
});

if (!response.ok) {
  throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
}

const release = await response.json();
const previous = await readPreviousSummary();
const summary = buildSummary(release, previous);
const svg = renderSvg(summary);
const historyEntry = {
  generated_at: summary.generated_at,
  tag_name: summary.release.tag_name,
  total: summary.installer_downloads.total,
  by_platform: Object.fromEntries(
    Object.entries(summary.installer_downloads.by_platform).map(([key, value]) => [key, value.count]),
  ),
};

await mkdir(DATA_DIR, { recursive: true });
await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(SVG_PATH, svg);

const previousHistoryLine = existsSync(HISTORY_PATH)
  ? (await readFile(HISTORY_PATH, 'utf8')).trim().split('\n').at(-1)
  : null;
const previousHistoryEntry = previousHistoryLine ? JSON.parse(previousHistoryLine) : null;
if (JSON.stringify(previousHistoryEntry?.by_platform) !== JSON.stringify(historyEntry.by_platform)) {
  await writeFile(HISTORY_PATH, `${JSON.stringify(historyEntry)}\n`, { flag: 'a' });
}

console.log(`Generated download chart for ${summary.release.tag_name}: ${summary.installer_downloads.total} installer downloads.`);

