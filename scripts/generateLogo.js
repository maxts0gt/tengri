const puppeteer = require('puppeteer');
const path = require('path');

async function generateLogo() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match logo dimensions
  await page.setViewport({
    width: 400,
    height: 400,
    deviceScaleFactor: 2, // For higher resolution
  });

  // Create a simple HTML page with your logo
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 400px;
            height: 400px;
            background: #0A1628;
          }
          .logo {
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 60px;
            letter-spacing: -0.05em;
            color: white;
          }
          .light { font-weight: 300; }
          .bold { font-weight: 700; }
          .dot { color: #E63946; }
        </style>
      </head>
      <body>
        <div class="logo">
          <span class="light">ten</span><span class="bold">gri</span><span class="dot">.</span>
        </div>
      </body>
    </html>
  `);

  // Generate and save the screenshot
  const outputPath = path.join(__dirname, '../public/logo-square.png');
  await page.screenshot({
    path: outputPath,
    omitBackground: false
  });

  await browser.close();
  console.log(`Logo generated at: ${outputPath}`);
}

generateLogo().catch(console.error); 