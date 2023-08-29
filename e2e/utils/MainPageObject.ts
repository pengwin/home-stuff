import { Page, Route, Request, Expect } from '@playwright/test';

export class MainPageObject {
    constructor(
        private readonly page: Page,
        private readonly expect: Expect,
    ) {}

    get originalPage() {
        return this.page;
    }

    async goToIndex() {
        await this.page.goto('/');
    }

    async setupRoute(
        path: string,
        handler: (route: Route, request: Request) => Promise<unknown> | unknown,
    ) {
        const baseUrl = 'http://localhost:5001';
        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        await this.page.route(`${baseUrl}${path}`, handler);
    }

    async login(username: string, password: string) {
        const loginButton = await this.loginButton();
        await loginButton.click();

        const loginModal = await this.page.getByTestId('modal-Login');
        const loginModalContent = await loginModal.getByTestId(
            'modal-Login-content',
        );

        await this.expect(loginModal).toHaveJSProperty('open', true);
        await this.expect(loginModalContent).toBeVisible();

        const usernameTxt = await loginModalContent.getByRole('textbox', {
            name: 'username',
        });
        const passwordTxt = await loginModalContent.getByRole('textbox', {
            name: 'password',
        });

        await usernameTxt.fill(username);
        await passwordTxt.fill(password);

        const sendBtn = await loginModalContent.getByRole('button');
        await sendBtn.click();

        await this.expect(loginModal).toHaveJSProperty('open', false);
    }

    async logout() {
        const logoutButton = await this.logoutButton();
        await logoutButton.click();

        await this.loginButton();
    }

    private async loginButton() {
        const loginButton = await this.page.getByTestId('login-btn');

        await this.expect(loginButton).toBeVisible();
        return loginButton;
    }

    private async logoutButton() {
        const logoutButton = await this.page.getByTestId('logout-btn');

        await this.expect(logoutButton).toBeVisible();
        return logoutButton;
    }
}
