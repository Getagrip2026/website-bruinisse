/**
 * screenshot.js
 * Maakt automatisch screenshots van index.html
 * Gebruik: node screenshot.js [--mobile]
 *
 * Vereist: npm install (installeer puppeteer eenmalig)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const isMobile = process.argv.includes('--mobile');

const VIEWPORTS = isMobile
  ? [{ name: 'mobile', width: 390, height: 844 }]
  : [
      { name: 'desktop', width: 1280, height: 800 },
      { name: 'tablet',  width: 768,  height: 1024 },
      { name: 'mobile',  width: 390,  height: 844  },
    ];

const OUTPUT_DIR = path.join(__dirname, 'temporary_screenshots');
const FILE = path.join(__dirname, 'index.html');

// Secties om los te fotograferen (id van het element)
const SECTIONS = [
  { id: null,         name: 'hero' },          // bovenste viewport
  { id: 'video',      name: 'video' },
  { id: 'uitleg',     name: 'uitleg' },
  { id: 'faq',        name: 'faq' },
  { id: 'contact',    name: 'contact' },
];

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const vp of VIEWPORTS) {
    console.log(`\n📐 Viewport: ${vp.name} (${vp.width}×${vp.height})`);

    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

    const url = `file://${FILE}`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wacht tot fonts geladen zijn
    await page.evaluateHandle('document.fonts.ready');

    // 1. Volledige pagina
    const fullPath = path.join(OUTPUT_DIR, `${timestamp}_${vp.name}_full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`  ✅ Volledige pagina → ${path.basename(fullPath)}`);

    // 2. Bovenste viewport (above the fold)
    const foldPath = path.join(OUTPUT_DIR, `${timestamp}_${vp.name}_above-fold.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    console.log(`  ✅ Above the fold   → ${path.basename(foldPath)}`);

    // 3. Losse secties
    for (const section of SECTIONS.filter(s => s.id)) {
      try {
        const el = await page.$(`#${section.id}`);
        if (!el) continue;
        const sectionPath = path.join(OUTPUT_DIR, `${timestamp}_${vp.name}_${section.name}.png`);
        await el.screenshot({ path: sectionPath });
        console.log(`  ✅ Sectie ${section.name.padEnd(10)} → ${path.basename(sectionPath)}`);
      } catch (e) {
        console.warn(`  ⚠️  Sectie ${section.id} niet gevonden: ${e.message}`);
      }
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n✨ Klaar. Screenshots staan in: temporary_screenshots/`);
}

run().catch(err => {
  console.error('❌ Fout:', err.message);
  process.exit(1);
});
