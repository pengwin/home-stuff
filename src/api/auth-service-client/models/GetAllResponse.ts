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
import type { User } from './User';
import { UserFromJSON, UserFromJSONTyped, UserToJSON } from './User';

/**
 *
 * @export
 * @interface GetAllResponse
 */
export interface GetAllResponse {
    /**
     *
     * @type {Array<User>}
     * @memberof GetAllResponse
     */
    users: Array<User>;
}

/**
 * Check if a given object implements the GetAllResponse interface.
 */
export function instanceOfGetAllResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'users' in value;

    return isInstance;
}

export function GetAllResponseFromJSON(json: any): GetAllResponse {
    return GetAllResponseFromJSONTyped(json, false);
}

export function GetAllResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): GetAllResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        users: (json['users'] as Array<any>).map(UserFromJSON),
    };
}

export function GetAllResponseToJSON(value?: GetAllResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        users: (value.users as Array<any>).map(UserToJSON),
    };
}
