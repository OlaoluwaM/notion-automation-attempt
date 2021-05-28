const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.notion.so/9f9a5830ee4a4523ae69a5a6e115cbc7?v=74160050d4c445cb8b1877b292ff22c7',
    {
      waitUntil: 'networkidle2',
    }
  );

  await page.evaluate(() => {
    document
      .querySelector('.notion-scroller.vertical.horizontal')
      .scrollBy(0, window.innerHeight * 3);
  });

  await page.waitForTimeout(1000);
  await page.waitForSelector('.notion-list-view');

  const totalCompletedItems = await (await page.$('.notion-list-view')).$eval(
    'div',
    listItemContainer => listItemContainer.childElementCount
  );

  console.log(totalCompletedItems - 1);

  await browser.close();
})();
