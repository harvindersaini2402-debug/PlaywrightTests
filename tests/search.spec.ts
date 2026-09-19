import { CsvError } from 'csv-parse';
import {test, expect} from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { verify } from 'crypto';


test.beforeEach(async ({loginPage, homePage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin("pwtestbatch@open.com", "pw123");
});

const products = CsvHelper.readCsv('src/data/products.csv');
for(let row of products){
test(`verify search results count test - ${row.searchkey} - ${row.resultcount}`, async ({homePage, searchResultsPage,page}) => {
    console.log(`Testing search for: ${row.searchkey} -  Expected results count: ${row.resultcount}`);
    await homePage.doSearch(row.searchkey);
    const resultsCount = await searchResultsPage.getSearchResultsCount();
    expect(resultsCount).toBe(Number(row.resultcount));
});
};

for(const row of products){
test(`verify use is landed on search results page test - ${row.searchkey}`, async ({homePage, searchResultsPage,page}) => {
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
});

};