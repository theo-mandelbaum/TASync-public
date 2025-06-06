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
import QuestionSchema from './QuestionSchema';
import UserSchema from './UserSchema';

/**
 * The CommentSchema model module.
 * @module model/CommentSchema
 * @version 1.0
 */
class CommentSchema {
    /**
     * Constructs a new <code>CommentSchema</code>.
     * @alias module:model/CommentSchema
     * @param id {String} 
     * @param question {module:model/QuestionSchema} 
     * @param user {module:model/UserSchema} 
     * @param content {String} 
     * @param datePosted {Date} 
     */
    constructor(id, question, user, content, datePosted) { 
        
        CommentSchema.initialize(this, id, question, user, content, datePosted);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, question, user, content, datePosted) { 
        obj['id'] = id;
        obj['question'] = question;
        obj['user'] = user;
        obj['content'] = content;
        obj['date_posted'] = datePosted;
    }

    /**
     * Constructs a <code>CommentSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CommentSchema} obj Optional instance to populate.
     * @return {module:model/CommentSchema} The populated <code>CommentSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CommentSchema();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('question')) {
                obj['question'] = QuestionSchema.constructFromObject(data['question']);
            }
            if (data.hasOwnProperty('user')) {
                obj['user'] = UserSchema.constructFromObject(data['user']);
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('date_posted')) {
                obj['date_posted'] = ApiClient.convertToType(data['date_posted'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CommentSchema</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CommentSchema</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of CommentSchema.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // validate the optional field `question`
        if (data['question']) { // data not null
          QuestionSchema.validateJSON(data['question']);
        }
        // validate the optional field `user`
        if (data['user']) { // data not null
          UserSchema.validateJSON(data['user']);
        }
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }

        return true;
    }


}

CommentSchema.RequiredProperties = ["id", "question", "user", "content", "date_posted"];

/**
 * @member {String} id
 */
CommentSchema.prototype['id'] = undefined;

/**
 * @member {module:model/QuestionSchema} question
 */
CommentSchema.prototype['question'] = undefined;

/**
 * @member {module:model/UserSchema} user
 */
CommentSchema.prototype['user'] = undefined;

/**
 * @member {String} content
 */
CommentSchema.prototype['content'] = undefined;

/**
 * @member {Date} date_posted
 */
CommentSchema.prototype['date_posted'] = undefined;






export default CommentSchema;

