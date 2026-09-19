
import { Page,Locator } from '@playwright/test';

import {BasePage} from './BasePage';


export class LoginPage extends BasePage {

    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPwdLink: Locator;
    private readonly loginErrorMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.emailId = page.locator('#input-email');
        this.password = page.locator('#input-password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPwdLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMsg = page.locator('div.alert.alert-danger.alert-dismissible');
}


async goToLoginPage(): Promise<void> {
    await this.page.goto('opencart/index.php?route=account/login');
}

async getLoginPageTitle(): Promise<string> {
    return this.page.title();
}

async doLogin(username: string, password: string): Promise<void> {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
}

async isForgotPwdLinkExist(): Promise<boolean> {
    return await this.forgotPwdLink.isVisible();
}

async isInvalidLoginErrorMsgExist(): Promise<boolean> {
    return await this.loginErrorMsg.isVisible();
}
}