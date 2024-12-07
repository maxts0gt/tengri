const puppeteer = require('puppeteer');
const path = require('path');

async function generateEmailSignature() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 320,
    height: 90,
    deviceScaleFactor: 2,
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 12px;
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.3;
          }
          .signature {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo {
            font-size: 16px;
            letter-spacing: -0.05em;
            color: #0A1628;
            white-space: nowrap;
          }
          .light { font-weight: 300; }
          .bold { font-weight: 700; }
          .dot { color: #E63946; }
          .divider {
            width: 1px;
            height: 50px;
            background: #E1E1E1;
          }
          .info {
            font-size: 12px;
          }
          .name {
            font-weight: 600;
            color: #0A1628;
            margin: 0 0 1px 0;
          }
          .title {
            color: #666;
            margin: 0 0 6px 0;
          }
          .contact {
            color: #666;
          }
          .contact a {
            color: #0A1628;
            text-decoration: none;
          }
          .social {
            margin-top: 6px;
            color: #666;
          }
          .social a {
            color: #666;
            text-decoration: none;
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <div class="signature">
          <div class="logo">
            <span class="light">ten</span><span class="bold">gri</span><span class="dot">.</span>
          </div>
          <div class="divider"></div>
          <div class="info">
            <p class="name">Tengri Support</p>
            <p class="title">Support Team | Tengri Consulting</p>
            <div class="contact">
              <a href="mailto:hello@tengri-consulting.com">hello@tengri-consulting.com</a><br>
              <a href="https://tengri-consulting.com">tengri-consulting.com</a>
            </div>
            <div class="social">
              <a href="https://linkedin.com/company/tengri">LinkedIn</a>
              <a href="https://twitter.com/tengri">Twitter</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  const outputPath = path.join(__dirname, '../public/email-signature.png');
  await page.screenshot({
    path: outputPath,
    omitBackground: true
  });

  const htmlOutputPath = path.join(__dirname, '../public/email-signature.html');
  const html = `
<div style="display: flex; align-items: center; gap: 12px; font-family: system-ui, -apple-system, sans-serif;">
  <div style="font-size: 16px; letter-spacing: -0.05em;">
    <span style="font-weight: 300;">ten</span><span style="font-weight: 700;">gri</span><span style="color: #E63946;">.</span>
  </div>
  <div style="width: 1px; height: 50px; background: #E1E1E1;"></div>
  <div style="font-size: 12px;">
    <p style="font-weight: 600; color: #0A1628; margin: 0 0 1px 0;">Tengri Support</p>
    <p style="color: #666; margin: 0 0 6px 0;">Support Team | Tengri Consulting</p>
    <div style="color: #666;">
      <a href="mailto:hello@tengri-consulting.com" style="color: #0A1628; text-decoration: none;">hello@tengri-consulting.com</a><br>
      <a href="https://tengri-consulting.com" style="color: #0A1628; text-decoration: none;">tengri-consulting.com</a>
    </div>
    <div style="margin-top: 6px;">
      <a href="https://linkedin.com/company/tengri" style="color: #666; text-decoration: none; margin-right: 10px;">LinkedIn</a>
      <a href="https://twitter.com/tengri" style="color: #666; text-decoration: none;">Twitter</a>
    </div>
  </div>
</div>
  `;
  require('fs').writeFileSync(htmlOutputPath, html);

  await browser.close();
  console.log(`Email signature generated at: ${outputPath}`);
  console.log(`HTML version saved at: ${htmlOutputPath}`);
}

generateEmailSignature().catch(console.error); 