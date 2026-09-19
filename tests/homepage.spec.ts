
import {test,expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin("pwtestbatch@open.com", "pw123");
    homePage = new HomePage(page);
});

test('home page title test', async ()=>{
const title=await homePage.getHomePageTitle();
expect(title).toBe('My Account');
});

test('logout link test', async ()=>{
    let isExist = await homePage.isLogoutLinkExist();
    expect(isExist).toBeTruthy();
});

test('home page headers test', async ()=>{
    let headers = await homePage.getHomePageHeaders();
    expect.soft(headers).toHaveLength(4);
    expect.soft(headers).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});