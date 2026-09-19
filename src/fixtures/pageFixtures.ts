import {test as baseTest } from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';
type pageFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    searchResultsPage: SearchResultsPage;
    testData: Record<string, string>[];
};

export let test=baseTest.extend<pageFixtures>({
    homePage: async ({page}, use) => {
    let homePage= new HomePage(page);
     await use(homePage);
    },
    loginPage: async ({page}, use) => {
        let loginPage= new LoginPage(page);
        await use(loginPage);
    },

    searchResultsPage: async ({page}, use) => {
        let searchResultsPage= new SearchResultsPage(page);
        await use(searchResultsPage);
    },
    testData: async ({}, use) => {
    let testData= CsvHelper.readCsv('src/data/loginData.csv');
    await use( testData);
    }
});

export {expect} from '@playwright/test';