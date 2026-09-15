import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const media = path.join(root, 'media');
const artifacts = path.join(root, 'demo-artifacts');
const timeline = JSON.parse(fs.readFileSync(path.join(artifacts, 'scene-durations.json'), 'utf8'));
const startSceneId = process.env.DEPLOYVAULT_DEMO_START_SCENE;
const outputName = process.env.DEPLOYVAULT_DEMO_OUTPUT || 'deployvault-demo-raw.webm';
fs.mkdirSync(media, { recursive: true });
fs.mkdirSync(artifacts, { recursive: true });

const server = spawn('python3', ['app.py', '--no-browser', '--port', '8765'], { cwd: root, stdio: 'ignore' });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const started = Date.now();

async function chapter(page, scene, action) {
  const sceneStart = Date.now();
  await page.evaluate(({ title, number, total }) => {
    document.getElementById('demo-chapter')?.remove();
    const banner = document.createElement('div');
    banner.id = 'demo-chapter';
    banner.innerHTML = `<small>FULL FEATURE WALKTHROUGH · ${String(number).padStart(2, '0')}/${String(total).padStart(2, '0')}</small><b>${title}</b>`;
    Object.assign(banner.style, {
      position: 'fixed', top: '76px', right: '22px', zIndex: '99999', padding: '13px 18px',
      border: '1px solid #55f2a1', borderRadius: '12px', background: 'rgba(7, 16, 25, .94)',
      color: '#eafff3', minWidth: '330px', boxShadow: '0 16px 50px rgba(0,0,0,.45)',
      fontFamily: 'system-ui', display: 'grid', gap: '4px', opacity: '0',
      transform: 'translateY(-8px)', transition: 'all .35s ease'
    });
    banner.querySelector('small').style.cssText = 'color:#55f2a1;font-size:10px;letter-spacing:1.8px';
    banner.querySelector('b').style.cssText = 'font-size:17px';
    document.body.appendChild(banner);
    requestAnimationFrame(() => { banner.style.opacity = '1'; banner.style.transform = 'translateY(0)'; });
  }, { title: scene.title, number: scene.index + 1, total: timeline.scenes.length });
  await action();
  await wait(Math.max(800, scene.duration * 1000 - (Date.now() - sceneStart)));
}

async function focus(page, selector, milliseconds = 1300) {
  const locator = page.locator(selector).first();
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.evaluate(element => {
    element.style.outline = '3px solid #55f2a1';
    element.style.outlineOffset = '5px';
    element.style.transition = 'outline .2s ease';
  }).catch(() => {});
  await wait(milliseconds);
  await locator.evaluate(element => { element.style.outline = ''; element.style.outlineOffset = ''; }).catch(() => {});
}

async function shippingCard(page) {
  await page.evaluate(() => {
    const card = document.createElement('div');
    card.id = 'shipping-card';
    card.innerHTML = `
      <div class="ship-eyebrow">SHIP IT YOUR WAY</div>
      <h1>One trainer. Every workstation.</h1>
      <div class="ship-grid">
        <article><b>macOS · Linux · Windows</b><span>OS-aware desktop installer and native icon</span></article>
        <article><b>Python 3</b><span>Zero runtime packages and instant local startup</span></article>
        <article><b>Docker + GHCR</b><span>Non-root, multi-architecture container image</span></article>
        <article><b>GitHub Actions</b><span>Validation, smoke test, build and publication</span></article>
      </div>
      <pre>docker run --rm -p 8080:8080 ghcr.io/iamrichmack111/deploy-vault:latest</pre>`;
    Object.assign(card.style, {
      position:'fixed', inset:'125px 130px 90px', zIndex:'99990', padding:'48px', color:'#f2fff7',
      background:'linear-gradient(145deg,#07131e 0%,#10253a 100%)', border:'1px solid #2d9d69',
      borderRadius:'24px', boxShadow:'0 30px 90px rgba(0,0,0,.7)', fontFamily:'system-ui'
    });
    document.body.appendChild(card);
    const style = document.createElement('style');
    style.textContent = `
      #shipping-card .ship-eyebrow{color:#55f2a1;letter-spacing:3px;font-size:12px;font-weight:800}
      #shipping-card h1{font-size:42px;margin:12px 0 32px}
      #shipping-card .ship-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
      #shipping-card article{display:grid;gap:9px;padding:23px;border:1px solid #28445b;border-radius:14px;background:#0a1a28}
      #shipping-card article b{font-size:20px;color:#55f2a1}
      #shipping-card article span{font-size:15px;color:#bed0dc}
      #shipping-card pre{margin-top:24px;padding:18px;border-radius:12px;background:#030a10;color:#d9ffe9;font-size:15px;white-space:pre-wrap}`;
    card.appendChild(style);
  });
}

try {
  await wait(900);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, recordVideo: { dir: artifacts, size: { width: 1440, height: 900 } }, acceptDownloads: true
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8765', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(media, 'dashboard.png'), fullPage: true });

  const startIndex = startSceneId ? timeline.scenes.findIndex(scene => scene.id === startSceneId) : 0;
  if (startSceneId && startIndex < 0) throw new Error(`Unknown starting scene: ${startSceneId}`);
  for (const scene of timeline.scenes.slice(Math.max(0, startIndex))) {
    await chapter(page, scene, async () => {
      switch (scene.id) {
        case 'welcome':
          await focus(page, '.brand', 1800); await focus(page, '#readiness', 1800); break;
        case 'dashboard':
          await focus(page, '.stat-grid', 1700); await focus(page, '.bars', 1800);
          await focus(page, '.dashboard-grid section:nth-child(2)', 1700); break;
        case 'incident-bank':
          await page.locator('#search').fill('CrashLoop'); await wait(1500); await page.locator('#search').fill('');
          await page.locator('#difficulty').selectOption('Advanced'); await wait(1300);
          await page.locator('#difficulty').selectOption('All'); await focus(page, '#randomBtn', 1500); break;
        case 'lab-overview':
          await page.getByRole('button', { name: 'Lab', exact: true }).click();
          await page.locator('.drill').filter({ hasText: 'CrashLoopBackOff' }).first().click().catch(async () => page.locator('.drill').nth(1).click());
          await focus(page, '.hero', 1700); await focus(page, '.topology', 1900); await focus(page, '.cards', 1500);
          await page.screenshot({ path: path.join(media, 'incident-lab.png'), fullPage: true }); break;
        case 'terminal':
          await focus(page, '.terminal', 1300);
          for (const button of await page.locator('[data-command]').all()) { await button.click(); await wait(1050); }
          await page.locator('#command').fill('kubectl'); await page.locator('#command').press('Tab'); await wait(900);
          await page.locator('#command').press('Enter'); await wait(1200); await page.locator('#command').press('ArrowUp'); await wait(900); break;
        case 'hints':
          await page.locator('#hintBtn').click(); await wait(1500); await focus(page, '.score', 1500);
          await page.locator('#hintBtn').click(); await wait(1300); break;
        case 'grading':
          await page.locator('#diagnosis').fill('I would use kubectl get pods, describe the pod, inspect events, and retrieve current and previous logs. The container is repeatedly crashing because its startup configuration is invalid. Correct the configuration, roll out safely, verify readiness and logs, monitor the deployment, and add validation and alerts to prevent another outage.');
          await page.locator('#submitBtn').click(); await wait(1800); await focus(page, '#rubric', 2100); await focus(page, '#result', 1800); break;
        case 'runbook':
          await page.locator('#notes').fill('Runbook: inspect events, compare previous container logs, verify configuration, then watch the rollout and readiness endpoints.');
          await page.locator('#saveNotes').click(); await wait(1200); await focus(page, '.runbook', 1500);
          await page.locator('details summary').click(); await wait(1300); await focus(page, 'details', 1500);
          await page.locator('#exportNotes').click(); break;
        case 'interview':
          await page.getByRole('button', { name: 'Interview', exact: true }).click();
          await page.screenshot({ path: path.join(media, 'interview-mode.png'), fullPage: true });
          await focus(page, '#timer', 1200); await focus(page, '#micBtn', 1200);
          await page.locator('#spokenAnswer').fill('First I would define scope and inspect events, endpoints, probes, logs, and recent changes. Then I would isolate the failed layer, apply the safest reversible fix, verify recovery, and document prevention.');
          await page.locator('#gradeSpokenBtn').click(); await wait(1400); await page.locator('#revealBtn').click(); await wait(1400); break;
        case 'study':
          await page.getByRole('button', { name: 'Study', exact: true }).click(); await focus(page, '#flashcard', 1500);
          await page.getByRole('button', { name: 'REVEAL ANSWER' }).click(); await wait(1700);
          await focus(page, '#studyActions', 1500); await page.locator('[data-rate="easy"]').click(); await wait(1200); break;
        case 'exam':
          await page.getByRole('button', { name: 'Exam', exact: true }).click(); await focus(page, '#modeLabel', 1300); await focus(page, '#timer', 1300);
          await page.locator('#spokenAnswer').fill('Inspect the workload and events, identify the exact root cause, make a safe correction, verify recovery, and prevent recurrence with monitoring and deployment checks.');
          await page.locator('#gradeSpokenBtn').click(); await wait(1700); break;
        case 'custom':
          await page.getByRole('button', { name: 'Dashboard', exact: true }).click(); await page.locator('#newBtn').click(); await wait(900);
          await page.locator('[name="title"]').fill('Certificate rotation failure'); await page.locator('[name="category"]').fill('Security');
          await page.locator('[name="brief"]').fill('Internal requests fail after a certificate expires.');
          await page.locator('[name="diagnosis"]').fill('The workload is using an expired mounted certificate.');
          await page.locator('[name="remediation"]').fill('Rotate the certificate and restart safely after validation.');
          await focus(page, '#customDialog', 1800); await page.getByRole('button', { name: 'ADD SCENARIO' }).click(); await wait(1700); break;
        case 'progress':
          await page.getByRole('button', { name: 'Dashboard', exact: true }).click(); await focus(page, '.stat-grid', 1500); await focus(page, '#clearBtn', 1200); break;
        case 'shipping':
          await shippingCard(page); await wait(2500); await focus(page, '#shipping-card .ship-grid', 1800); await focus(page, '#shipping-card pre', 1600); break;
        case 'close':
          await page.evaluate(() => document.getElementById('shipping-card')?.remove());
          await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
          await focus(page, '.dash-head', 1800); break;
      }
    });
  }

  await context.close(); await browser.close();
  const videos = fs.readdirSync(artifacts).filter(name => name.endsWith('.webm'))
    .sort((a, b) => fs.statSync(path.join(artifacts, b)).mtimeMs - fs.statSync(path.join(artifacts, a)).mtimeMs);
  if (!videos.length) throw new Error('Playwright did not create a video');
  fs.copyFileSync(path.join(artifacts, videos[0]), path.join(media, outputName));
  console.log(`Captured ${Math.round((Date.now() - started) / 1000)} seconds to ${outputName}.`);
} finally { server.kill('SIGTERM'); }
