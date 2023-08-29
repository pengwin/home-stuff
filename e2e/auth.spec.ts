import { test, expect } from './utils/baseTest';

import {
    AuthSuccessResponse,
    AuthRequest,
    ProfileResponse,
} from '../src/api/auth-service-client';

test.describe('Auth tests', () => {
    test('Login', async ({ mainPage }) => {
        const expectedUsername = 'test@test.com';
        const expectedPassword = 'test@test.com';
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0ZXN0IiwiZXhwIjoxNjgwOTI2NDU2LCJpYXQiOjE2ODA4NDAwNTYsImlzcyI6InRlc3QiLCJzdWIiOiJjZDMwMWFiOS0yMjQ2LTRmNGYtYWJkNi04NzYwNjFjOTQ1NGEifQ.AAOx1_pe89PbHHNfHU5yjGRNP8QNKbpH39Vffo5LTsc';

        await mainPage.setupRoute('/authorize', async route => {
            const request: AuthRequest = route.request().postDataJSON();

            expect(request.login).toBe(expectedUsername);

            const json: AuthSuccessResponse = {
                token,
            };
            await route.fulfill({ json });
        });

        await mainPage.setupRoute('/profile', async route => {
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

        await mainPage.goToIndex();
        await mainPage.login(expectedUsername, expectedPassword);

        await mainPage.logout();
    });
});
