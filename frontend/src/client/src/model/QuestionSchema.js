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
import SubjectSchema from './SubjectSchema';
import UserSchema from './UserSchema';

/**
 * The QuestionSchema model module.
 * @module model/QuestionSchema
 * @version 1.0
 */
class QuestionSchema {
    /**
     * Constructs a new <code>QuestionSchema</code>.
     * @alias module:model/QuestionSchema
     * @param id {String} 
     * @param questionText {String} 
     * @param asker {module:model/UserSchema} 
     * @param subject {module:model/SubjectSchema} 
     * @param dateAsked {Date} 
     * @param isAnswered {Boolean} 
     */
    constructor(id, questionText, asker, subject, dateAsked, isAnswered) { 
        
        QuestionSchema.initialize(this, id, questionText, asker, subject, dateAsked, isAnswered);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, questionText, asker, subject, dateAsked, isAnswered) { 
        obj['id'] = id;
        obj['question_text'] = questionText;
        obj['asker'] = asker;
        obj['subject'] = subject;
        obj['date_asked'] = dateAsked;
        obj['is_answered'] = isAnswered;
    }

    /**
     * Constructs a <code>QuestionSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QuestionSchema} obj Optional instance to populate.
     * @return {module:model/QuestionSchema} The populated <code>QuestionSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QuestionSchema();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('question_text')) {
                obj['question_text'] = ApiClient.convertToType(data['question_text'], 'String');
            }
            if (data.hasOwnProperty('asker')) {
                obj['asker'] = UserSchema.constructFromObject(data['asker']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectSchema.constructFromObject(data['subject']);
            }
            if (data.hasOwnProperty('date_asked')) {
                obj['date_asked'] = ApiClient.convertToType(data['date_asked'], 'Date');
            }
            if (data.hasOwnProperty('is_answered')) {
                obj['is_answered'] = ApiClient.convertToType(data['is_answered'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>QuestionSchema</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>QuestionSchema</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of QuestionSchema.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['question_text'] && !(typeof data['question_text'] === 'string' || data['question_text'] instanceof String)) {
            throw new Error("Expected the field `question_text` to be a primitive type in the JSON string but got " + data['question_text']);
        }
        // validate the optional field `asker`
        if (data['asker']) { // data not null
          UserSchema.validateJSON(data['asker']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectSchema.validateJSON(data['subject']);
        }

        return true;
    }


}

QuestionSchema.RequiredProperties = ["id", "question_text", "asker", "subject", "date_asked", "is_answered"];

/**
 * @member {String} id
 */
QuestionSchema.prototype['id'] = undefined;

/**
 * @member {String} question_text
 */
QuestionSchema.prototype['question_text'] = undefined;

/**
 * @member {module:model/UserSchema} asker
 */
QuestionSchema.prototype['asker'] = undefined;

/**
 * @member {module:model/SubjectSchema} subject
 */
QuestionSchema.prototype['subject'] = undefined;

/**
 * @member {Date} date_asked
 */
QuestionSchema.prototype['date_asked'] = undefined;

/**
 * @member {Boolean} is_answered
 */
QuestionSchema.prototype['is_answered'] = undefined;






export default QuestionSchema;

