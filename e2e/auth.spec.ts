import { test, expect, Page } from '@playwright/test';

import { coverage } from './utils/coverage';

import {
    AuthSuccessResponse,
    AuthRequest,
    ProfileResponse,
} from '../src/api/auth-service-client';

class PageObject {
    constructor(private readonly page: Page) {}

    async goToIndex() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        const loginButton = await this.loginButton();
        await loginButton.click();

        const loginModal = await this.page.getByTestId('modal-Login');

        await expect(loginModal).toBeVisible();

        const usernameTxt = await loginModal.getByRole('textbox', {
            name: 'username',
        });
        const passwordTxt = await loginModal.getByRole('textbox', {
            name: 'password',
        });

        await usernameTxt.fill(username);
        await passwordTxt.fill(password);

        const sendBtn = await loginModal.getByRole('button');
        await sendBtn.click();

        await expect(loginModal).toBeHidden();
    }

    async logout() {
        const logoutButton = await this.logoutButton();
        await logoutButton.click();

        await this.loginButton();
    }

    private async loginButton() {
        const loginButton = await this.page.getByTestId('login-btn');

        await expect(loginButton).toBeVisible();
        return loginButton;
    }

    private async logoutButton() {
        const logoutButton = await this.page.getByTestId('logout-btn');

        await expect(logoutButton).toBeVisible();
        return logoutButton;
    }
}

test.describe('Auth tests', () => {
    test('Login', async ({ page }, testInfo) => {
        await coverage.start(page, testInfo);

        const expectedUsername = 'test@test.com';
        const expectedPassword = 'test@test.com';
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0ZXN0IiwiZXhwIjoxNjgwOTI2NDU2LCJpYXQiOjE2ODA4NDAwNTYsImlzcyI6InRlc3QiLCJzdWIiOiJjZDMwMWFiOS0yMjQ2LTRmNGYtYWJkNi04NzYwNjFjOTQ1NGEifQ.AAOx1_pe89PbHHNfHU5yjGRNP8QNKbpH39Vffo5LTsc';

        await page.route('http://localhost:5001/authorize', async route => {
            const request: AuthRequest = route.request().postDataJSON();

            expect(request.login).toBe(expectedUsername);

            const json: AuthSuccessResponse = {
                token,
            };
            await route.fulfill({ json });
        });

        await page.route('http://localhost:5001/profile', async route => {
            const request = route.request();

            const headers = await request.allHeaders();
            const expectedBearer = `Bearer ${token}`;

            if (headers['authorization'] != expectedBearer) {
                await route.fulfill({ status: 401, body: 'Invalid token' });
                return;
            }

            const json: ProfileResponse = {
                username: 'TestUser',
            };
            await route.fulfill({ json });
        });

        const pageObject = new PageObject(page);

        await pageObject.goToIndex();
        await pageObject.login(expectedUsername, expectedPassword);

        await pageObject.logout();

        await coverage.collect(page, testInfo);
    });
});
