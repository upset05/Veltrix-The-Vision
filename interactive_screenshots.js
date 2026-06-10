const puppeteer = require('puppeteer-core');
const path = require('path');

const destDir = path.join(__dirname, 'assets');

async function captureInteractiveScreenshots() {
  console.log('Launching browser to capture veltrix.com.ng...');
  
  const browser = await puppeteer.launch({
    headless: false, // Must be visible so the user can log in!
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    const page = await browser.newPage();

    // 1. Capture Homepage
    console.log('Navigating to homepage...');
    await page.goto('https://veltrix.com.ng', { waitUntil: 'networkidle2' });
    
    // Smooth scroll down and up to load lazy elements if any
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => window.scrollBy(0, -500));
    await new Promise(r => setTimeout(r, 500));

    const homePath = path.join(destDir, 'vtu-home.png');
    await page.screenshot({ path: homePath });
    console.log(`Saved Homepage screenshot to: ${homePath}`);

    // 2. Go to Login page
    console.log('Navigating to login page...');
    await page.goto('https://veltrix.com.ng/login', { waitUntil: 'networkidle2' });

    // 3. Prompt user to log in
    console.log('============================================================');
    console.log('ACTION REQUIRED: Please log in to Veltrix in the open browser window.');
    console.log('The script will detect when you reach the dashboard and continue.');
    console.log('============================================================');

    // Wait for the URL to contain '/dashboard' indicating successful login
    await page.waitForFunction(() => window.location.href.includes('/dashboard'), { timeout: 120000 });
    console.log('Logged in successfully! Dashboard detected.');
    
    // Wait for dashboard dashboard metrics to load/animates
    await new Promise(r => setTimeout(r, 3000));

    // Capture Dashboard
    const dashboardPath = path.join(destDir, 'vtu-dashboard.png');
    await page.screenshot({ path: dashboardPath });
    console.log(`Saved Dashboard screenshot to: ${dashboardPath}`);

    // 4. Navigate to admin panel
    console.log('Navigating to Admin panel...');
    
    // Trigger navigation
    await page.goto('https://veltrix.com.ng/admin');
    
    // We want to capture the admin panel before it fully loads details.
    // So we wait for the body or main container of admin, but take screenshot immediately (e.g. wait 300-500ms)
    console.log('Taking admin screenshot before full details render to hide sensitive info...');
    await new Promise(r => setTimeout(r, 500)); 

    const adminPath = path.join(destDir, 'vtu-admin.png');
    await page.screenshot({ path: adminPath });
    console.log(`Saved Admin panel screenshot to: ${adminPath}`);

    console.log('All live screenshots captured successfully!');
  } catch (err) {
    console.error('Error during live screenshot capture:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

captureInteractiveScreenshots();
