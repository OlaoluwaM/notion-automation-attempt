const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.notion.so/9f9a5830ee4a4523ae69a5a6e115cbc7?v=40988ee1ecc94de19948672f8c9052bf',
    {
      waitUntil: 'networkidle2',
    }
  );

  const completedItemsCount = await page.evaluate(() => {
    return document
      .querySelector('.notion-table-view > div > div:nth-last-child(2)')
      .querySelector('span:nth-of-type(2)').textContent;
  });

  console.log(completedItemsCount);
  await browser.close();

  return completedItemsCount;
})();
