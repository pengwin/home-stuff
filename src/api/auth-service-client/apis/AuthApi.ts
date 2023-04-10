/* tslint:disable */
/* eslint-disable */
/**
 * auth-service
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact:
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
    AuthErrorResponse,
    AuthRequest,
    AuthSuccessResponse,
    ProfileResponse,
} from '../models';
import {
    AuthErrorResponseFromJSON,
    AuthErrorResponseToJSON,
    AuthRequestFromJSON,
    AuthRequestToJSON,
    AuthSuccessResponseFromJSON,
    AuthSuccessResponseToJSON,
    ProfileResponseFromJSON,
    ProfileResponseToJSON,
} from '../models';

export interface AuthorizeRequest {
    authRequest: AuthRequest;
}

/**
 * AuthApi - interface
 *
 * @export
 * @interface AuthApiInterface
 */
export interface AuthApiInterface {
    /**
     *
     * @param {AuthRequest} authRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApiInterface
     */
    authorizeRaw(
        requestParameters: AuthorizeRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<AuthSuccessResponse>>;

    /**
     */
    authorize(
        requestParameters: AuthorizeRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<AuthSuccessResponse>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApiInterface
     */
    profileRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ProfileResponse>>;

    /**
     */
    profile(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ProfileResponse>;
}

/**
 *
 */
export class AuthApi extends runtime.BaseAPI implements AuthApiInterface {
    /**
     */
    async authorizeRaw(
        requestParameters: AuthorizeRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<AuthSuccessResponse>> {
        if (
            requestParameters.authRequest === null ||
            requestParameters.authRequest === undefined
        ) {
            throw new runtime.RequiredError(
                'authRequest',
                'Required parameter requestParameters.authRequest was null or undefined when calling authorize.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request(
            {
                path: `/authorize`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: AuthRequestToJSON(requestParameters.authRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, jsonValue =>
            AuthSuccessResponseFromJSON(jsonValue),
        );
    }

    /**
     */
    async authorize(
        requestParameters: AuthorizeRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<AuthSuccessResponse> {
        const response = await this.authorizeRaw(
            requestParameters,
            initOverrides,
        );
        return await response.value();
    }

    /**
     */
    async profileRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ProfileResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('token', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/profile`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, jsonValue =>
            ProfileResponseFromJSON(jsonValue),
        );
    }

    /**
     */
    async profile(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ProfileResponse> {
        const response = await this.profileRaw(initOverrides);
        return await response.value();
    }
}
