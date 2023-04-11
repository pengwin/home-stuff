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
 * @interface AddUserRequest
 */
export interface AddUserRequest {
    /**
     *
     * @type {boolean}
     * @memberof AddUserRequest
     */
    admin: boolean;
    /**
     *
     * @type {string}
     * @memberof AddUserRequest
     */
    email: string;
    /**
     *
     * @type {string}
     * @memberof AddUserRequest
     */
    password: string;
    /**
     *
     * @type {string}
     * @memberof AddUserRequest
     */
    username: string;
}

/**
 * Check if a given object implements the AddUserRequest interface.
 */
export function instanceOfAddUserRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'admin' in value;
    isInstance = isInstance && 'email' in value;
    isInstance = isInstance && 'password' in value;
    isInstance = isInstance && 'username' in value;

    return isInstance;
}

export function AddUserRequestFromJSON(json: any): AddUserRequest {
    return AddUserRequestFromJSONTyped(json, false);
}

export function AddUserRequestFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): AddUserRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        admin: json['admin'],
        email: json['email'],
        password: json['password'],
        username: json['username'],
    };
}

export function AddUserRequestToJSON(value?: AddUserRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        admin: value.admin,
        email: value.email,
        password: value.password,
        username: value.username,
    };
}