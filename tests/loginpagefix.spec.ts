
import {test,expect} from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();
});

test('login page title test', async({loginPage}) => {
let title= await loginPage.getPageTitle();
expect(title).toBe('Account Login');
});

test('forgot password link test', async({loginPage}) => {
    let isExist = await loginPage.isForgotPwdLinkExist();
    expect(isExist).toBeTruthy();
});

test('user is able to login to app test', async({loginPage, homePage}) => {
await loginPage.doLogin(process.env.USERNAME,process.env.PASSWORD)
expect(await homePage.isLogoutLinkExist()).toBeTruthy();
expect(await homePage.getPageTitle()).toBe('My Account');
});

test('invalid login negative test', async({loginPage,testData}) => {
for (let row of testData) {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorMsgExist()).toBeTruthy();
}
})


let testData = CsvHelper.readCsv('src/data/loginData.csv');

for (let row of testData) {
test(`invalid login test - ${row.username} -  ${row.password}`, async({loginPage}) => {
  await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorMsgExist()).toBeTruthy();
})};

let loginJsonData = JsonHelper.readJson('src/data/login.json');

for (let row of loginJsonData) {
test(`invalid login test with json data- ${row.username} -  ${row.password}`, async({loginPage}) => {
  await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorMsgExist()).toBeTruthy();
})};