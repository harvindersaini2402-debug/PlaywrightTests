
import {test,expect} from '../src/fixtures/pageFixtures';


test.beforeEach(async ({loginPage, homePage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin("pwtestbatch@open.com", "pw123");
});

test('home page title test', async ({homePage})=>{
const title=await homePage.getPageTitle();
expect(title).toBe('My Account');
});

test('logout link test', async ({homePage})=>{
    let isExist = await homePage.isLogoutLinkExist();
    expect(isExist).toBeTruthy();
});

test('home page headers test', async ({homePage})=>{
    let headers = await homePage.getHomePageHeaders();
    expect.soft(headers).toHaveLength(4);
    expect.soft(headers).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});