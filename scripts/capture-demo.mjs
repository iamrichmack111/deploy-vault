import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const media=path.join(root,'media'), raw=path.join(root,'demo-artifacts');
fs.mkdirSync(media,{recursive:true}); fs.mkdirSync(raw,{recursive:true});
const server=spawn('python3',['app.py','--no-browser','--port','8765'],{cwd:root,stdio:'ignore'});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try {
  await wait(700);
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:raw,size:{width:1440,height:900}}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});
  await page.screenshot({path:path.join(media,'dashboard.png'),fullPage:true}); await wait(4200);
  await page.getByRole('button',{name:'Lab',exact:true}).click(); await wait(1200);
  await page.locator('.drill').nth(1).click(); await wait(700);
  await page.locator('[data-command]').first().click(); await wait(3000);
  await page.screenshot({path:path.join(media,'incident-lab.png'),fullPage:true});
  await page.getByRole('button',{name:'Interview',exact:true}).click(); await wait(4200);
  await page.screenshot({path:path.join(media,'interview-mode.png'),fullPage:true});
  await page.getByRole('button',{name:'Study',exact:true}).click(); await wait(4000);
  await page.getByRole('button',{name:'REVEAL ANSWER'}).click(); await wait(3500);
  await page.getByRole('button',{name:'Dashboard',exact:true}).click(); await wait(3500);
  await context.close(); await browser.close();
  const videos=fs.readdirSync(raw).filter(x=>x.endsWith('.webm')).sort((a,b)=>fs.statSync(path.join(raw,b)).mtimeMs-fs.statSync(path.join(raw,a)).mtimeMs);
  if(!videos.length) throw new Error('Playwright did not create a video');
  fs.copyFileSync(path.join(raw,videos[0]),path.join(media,'deployvault-demo-raw.webm'));
} finally { server.kill('SIGTERM'); }
