const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const coreDir = path.join(__dirname, '..', 'VeltrixCore');
const destDir = path.join(__dirname, 'assets', 'core-screenshots');
const historyDir = path.join(coreDir, 'history');

// Ensure destination directories exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
}

// Simple static file server for VeltrixCore
const server = http.createServer((req, res) => {
  let filePath = path.join(coreDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  if (ext === '.js') contentType = 'application/javascript';
  else if (ext === '.css') contentType = 'text/css';
  else if (ext === '.json') contentType = 'application/json';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.ico') contentType = 'image/x-icon';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      defaultViewport: { width: 1000, height: 800 }
    });

    const runScenario = async (filename, commands, clickDot = true, bootWait = 4000, isPanelOnly = true) => {
      const page = await browser.newPage();
      
      // Clear localStorage to start clean
      await page.goto(`http://localhost:${port}`);
      await page.evaluate(() => localStorage.clear());
      
      // Reload page to apply clean slate
      await page.goto(`http://localhost:${port}`);
      
      if (clickDot) {
        await page.waitForSelector('#core-dot');
        await page.click('#core-dot');
        await new Promise(r => setTimeout(r, bootWait));
      } else {
        // Just wait a moment for the page load / dot pulsing animation to start
        await new Promise(r => setTimeout(r, 1000));
      }
      
      // Run commands if any
      if (commands && commands.length > 0) {
        for (const cmd of commands) {
          await page.type('#command', cmd);
          await page.keyboard.press('Enter');
          await new Promise(r => setTimeout(r, 800));
        }
      }
      
      // Take screenshot of #panel or full page
      const screenshotPathDest = path.join(destDir, filename);
      const screenshotPathHist = path.join(historyDir, filename);
      
      if (isPanelOnly) {
        const panel = await page.$('#panel');
        if (panel) {
          await panel.screenshot({ path: screenshotPathDest });
          await panel.screenshot({ path: screenshotPathHist });
        } else {
          await page.screenshot({ path: screenshotPathDest });
          await page.screenshot({ path: screenshotPathHist });
        }
      } else {
        await page.screenshot({ path: screenshotPathDest });
        await page.screenshot({ path: screenshotPathHist });
      }
      
      console.log(`Saved screenshot: ${filename}`);
      await page.close();
    };

    // v0.1: Genesis (pulsing dot on black background, panel hidden)
    console.log('Capturing v0.1-genesis...');
    await runScenario('v0.1-genesis.png', [], false, 0, false);

    // v0.2: Awakening (dot clicked, panel boots up)
    console.log('Capturing v0.2-awakening...');
    await runScenario('v0.2-awakening.png', [], true, 1500, true);

    // v0.3: Communication (boot finished, say hello)
    console.log('Capturing v0.3-communication.png...');
    await runScenario('v0.3-communication.png', [
      'hello'
    ], true, 4000, true);

    // v0.4: Memory (multiple commands showing memory capabilities)
    console.log('Capturing v0.4-memory...');
    await runScenario('v0.4-memory.png', [
      'hello',
      '/time',
      'what did i just say'
    ], true, 4000, true);

    // v0.5: Knowledge (showing loaded knowledge)
    console.log('Capturing v0.5-personality.png (v0.5 Knowledge)...');
    await runScenario('v0.5-personality.png', [
      '/knowledge',
      '/knowledge business'
    ], true, 4000, true);

    // v0.6: Personality (mood and state tracking)
    console.log('Capturing v0.6-command-center.png (v0.6 Personality)...');
    await runScenario('v0.6-command-center.png', [
      '/personality',
      '/mood'
    ], true, 4000, true);

    // Scenario v0.7: Fact Management
    console.log('Capturing v0.7-fact-management...');
    await runScenario('v0.7-fact-management.png', [
      '/learn favorite_anime one piece',
      '/facts',
      '/report'
    ], true, 4000, true);

    // Scenario v0.8: Modular Architecture
    console.log('Capturing v0.8-modular-architecture...');
    await runScenario('v0.8-modular-architecture.png', [
      '/status'
    ], true, 4000, true);

    // Scenario v0.9: Knowledge Files
    console.log('Capturing v0.9-knowledge-files...');
    await runScenario('v0.9-knowledge-files.png', [
      '/knowledge veltrix',
      '/knowledge anime'
    ], true, 4000, true);

    // Scenario v0.95: Productivity & Natural Input
    console.log('Capturing v0.95-productivity-natural-input...');
    await runScenario('v0.95-productivity-natural-input.png', [
      '/note Buy milk and data',
      '/task Finish presentation',
      '/tasks'
    ], true, 4000, true);

    // Scenario v1.0: Even Dots Can Dream
    console.log('Capturing v1.0-even-dots-can-dream...');
    await runScenario('v1.0-even-dots-can-dream.png', [
      '/release'
    ], true, 4000, true);

    await browser.close();
    console.log('All Veltrix Core screenshots updated and regenerated successfully!');
  } catch (err) {
    console.error('Error during screenshot generation:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
