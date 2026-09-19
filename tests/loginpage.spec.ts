
import {test,expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
});

test('login page title test', async() => {
let title= await loginPage.getLoginPageTitle();
expect(title).toBe('Account Login');
});

test('forgot password link test', async() => {
    let isExist = await loginPage.isForgotPwdLinkExist();
    expect(isExist).toBeTruthy();
});

test('user is able to login to app test', async() => {
await loginPage.doLogin("pwtestbatch@open.com","pw123")
expect(await homePage.isLogoutLinkExist()).toBeTruthy();
expect(await homePage.getHomePageTitle()).toBe('My Account');
});