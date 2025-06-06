/**
 * Sched API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import SchoolSchema from './SchoolSchema';
import SubjectSchema from './SubjectSchema';

/**
 * The UserSchema model module.
 * @module model/UserSchema
 * @version 1.0
 */
class UserSchema {
    /**
     * Constructs a new <code>UserSchema</code>.
     * @alias module:model/UserSchema
     * @param id {String} 
     * @param username {String} 
     * @param name {String} 
     * @param school {module:model/SchoolSchema} 
     * @param subjects {Array.<module:model/SubjectSchema>} 
     */
    constructor(id, username, name, school, subjects) { 
        
        UserSchema.initialize(this, id, username, name, school, subjects);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, username, name, school, subjects) { 
        obj['id'] = id;
        obj['username'] = username;
        obj['name'] = name;
        obj['school'] = school;
        obj['subjects'] = subjects;
    }

    /**
     * Constructs a <code>UserSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserSchema} obj Optional instance to populate.
     * @return {module:model/UserSchema} The populated <code>UserSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserSchema();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('school')) {
                obj['school'] = SchoolSchema.constructFromObject(data['school']);
            }
            if (data.hasOwnProperty('subjects')) {
                obj['subjects'] = ApiClient.convertToType(data['subjects'], [SubjectSchema]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UserSchema</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UserSchema</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of UserSchema.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['username'] && !(typeof data['username'] === 'string' || data['username'] instanceof String)) {
            throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + data['username']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // validate the optional field `school`
        if (data['school']) { // data not null
          SchoolSchema.validateJSON(data['school']);
        }
        if (data['subjects']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['subjects'])) {
                throw new Error("Expected the field `subjects` to be an array in the JSON data but got " + data['subjects']);
            }
            // validate the optional field `subjects` (array)
            for (const item of data['subjects']) {
                SubjectSchema.validateJSON(item);
            };
        }

        return true;
    }


}

UserSchema.RequiredProperties = ["id", "username", "name", "school", "subjects"];

/**
 * @member {String} id
 */
UserSchema.prototype['id'] = undefined;

/**
 * @member {String} username
 */
UserSchema.prototype['username'] = undefined;

/**
 * @member {String} name
 */
UserSchema.prototype['name'] = undefined;

/**
 * @member {module:model/SchoolSchema} school
 */
UserSchema.prototype['school'] = undefined;

/**
 * @member {Array.<module:model/SubjectSchema>} subjects
 */
UserSchema.prototype['subjects'] = undefined;






export default UserSchema;

