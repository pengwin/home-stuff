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

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface AuthRequest
 */
export interface AuthRequest {
    /**
     *
     * @type {string}
     * @memberof AuthRequest
     */
    login: string;
    /**
     *
     * @type {string}
     * @memberof AuthRequest
     */
    password: string;
}

/**
 * Check if a given object implements the AuthRequest interface.
 */
export function instanceOfAuthRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'login' in value;
    isInstance = isInstance && 'password' in value;

    return isInstance;
}

export function AuthRequestFromJSON(json: any): AuthRequest {
    return AuthRequestFromJSONTyped(json, false);
}

export function AuthRequestFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): AuthRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        login: json['login'],
        password: json['password'],
    };
}

export function AuthRequestToJSON(value?: AuthRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        login: value.login,
        password: value.password,
    };
}