

import {Page,} from '@playwright/test';

export class BasePage {

    protected readonly page: Page;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
    }


    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    async isSearchIconVisible(): Promise<boolean> {
        return await this.searchIcon.isVisible();
    }   
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}