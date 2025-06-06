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

/**
 * The SubjectSchema model module.
 * @module model/SubjectSchema
 * @version 1.0
 */
class SubjectSchema {
    /**
     * Constructs a new <code>SubjectSchema</code>.
     * @alias module:model/SubjectSchema
     * @param id {String} 
     * @param name {String} 
     * @param isTaHours {Boolean} 
     */
    constructor(id, name, isTaHours) { 
        
        SubjectSchema.initialize(this, id, name, isTaHours);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, isTaHours) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['is_ta_hours'] = isTaHours;
    }

    /**
     * Constructs a <code>SubjectSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubjectSchema} obj Optional instance to populate.
     * @return {module:model/SubjectSchema} The populated <code>SubjectSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectSchema();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('is_ta_hours')) {
                obj['is_ta_hours'] = ApiClient.convertToType(data['is_ta_hours'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubjectSchema</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubjectSchema</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of SubjectSchema.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }

        return true;
    }


}

SubjectSchema.RequiredProperties = ["id", "name", "is_ta_hours"];

/**
 * @member {String} id
 */
SubjectSchema.prototype['id'] = undefined;

/**
 * @member {String} name
 */
SubjectSchema.prototype['name'] = undefined;

/**
 * @member {Boolean} is_ta_hours
 */
SubjectSchema.prototype['is_ta_hours'] = undefined;






export default SubjectSchema;

