import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.new_page();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const results = {
    consoleErrors: consoleErrors,
    hasSvgLogo: false,
    heroHeadlines: [],
    transparencyDates: []
  };

  // 2. Check if the Header shows the SVG logo
  results.hasSvgLogo = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return false;
    return !!header.querySelector('svg');
  });

  // 3. Check if the Hero section has the P.A.S.T.O.R. headlines
  results.heroHeadlines = await page.evaluate(() => {
    const hero = document.querySelector('section'); // Assuming hero is the first section
    if (!hero) return [];
    const text = hero.innerText;
    const pastor = ['P', 'A', 'S', 'T', 'O', 'R'];
    return pastor.filter(letter => text.includes(letter + '.'));
  });

  // 4. Check if the Transparency grid shows dynamic dates
  results.transparencyDates = await page.evaluate(() => {
    const grid = document.querySelector('.grid') || document.body;
    const dates = Array.from(grid.querySelectorAll('*'))
      .map(el => el.innerText)
      .filter(text => /202[0-9]/.test(text));
    return dates;
  });

  await page.screenshot({ path: 'verification_result.png', fullPage: true });

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
