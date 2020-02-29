const { Builder, By, Key, until } = require('selenium-webdriver');
const base_url = 'https://www.shopping.com/search.html?keyword=';
const browser = 'safari';

async function crawler(keyword, page = null) {
  const url = `${base_url}${keyword}${page ? '&page='+page : ''}`;
  try {
    let driver = await new Builder().forBrowser(browser).build();

    console.log('Fetching data... (May take time on slower internet)');
    await driver.get(url);
    await driver.wait(until.elementLocated(By.className('searchContent')), 10000);
    const elements = await driver.findElements(By.className('item_card'));
    const pageCountText = await driver.findElement(By.css('.page-top-item-count')).getText();

    const pageNo = pageCountText.split('of ')[1].slice(0, -1);
    if (!page) return `Total queries found: ${pageNo}`;

    const scrapedData = await Promise.all(elements.map(getFormattedData));
    
    return scrapedData;
  } catch(e) {
  	console.log('An error occured.', e.message);
  }
};

async function getDetails(element, cssSelector) {
	let data = null;
	try {
		data = await element.findElement(By.css(cssSelector)).getText();
	} catch(e) {}
	return data;
}

async function getFormattedData(element) {
	const [name, sellingPrice, originalPrice, discount, shipping, description, image] = await Promise.all([
		getDetails(element, 'a.item_title > .item_title'),
    	getDetails(element, '.sellingPrice'),
    	getDetails(element, '.strikedOutOriginalPrice'),
    	getDetails(element, 'span.discount'),
    	getDetails(element, 'div.shipping'),
    	getDetails(element, '.item_description'),
    	element.findElement(By.css('.item_title > img')).getAttribute('src'),
	]);
	
   	return { name, originalPrice, discount, sellingPrice, shipping, description, image };
}


(async function(){
	if (process.argv.length === 3)
	result = await crawler(process.argv[2]);
	else if (process.argv.length === 4)
		result = await crawler(process.argv[2], process.argv[3]);
	else
		result = 'You need to pass atleast 1 argument';

	console.log(result);
}());
