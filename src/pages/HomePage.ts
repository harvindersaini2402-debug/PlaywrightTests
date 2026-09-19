import {test,expect,Page, Locator} from '@playwright/test';

 import {BasePage} from './BasePage';

 export class HomePage extends BasePage {

private readonly logoutLink: Locator;
private readonly headers: Locator;

 constructor(page: Page) {
    super(page);
 this.logoutLink = page.getByRole('link', { name: 'Logout' }).first();
 this.headers = page.getByRole('heading',{level: 2})
}

async getHomePageTitle(): Promise<string> {
    return await this.page.title();
}

async isLogoutLinkExist(): Promise<boolean> {
return await this.logoutLink.isVisible();
}

async getHomePageHeaders(): Promise<string[]> {
return await this.headers.allInnerTexts();
}

async doSearch(productName: string): Promise<void> {
    console.log(`Searching for product: ${productName}`);
    await this.searchBox.fill(productName);
    await this.searchIcon.click();  
}
 }