import { Dictionary } from '../../base/dictionary';
import { WUniqueFormat } from '../../base/unique-format';
import { WUniqueFormats } from '../../base/unique-formats';
import { WCharacterFormat } from '../format/character-format';
import { WParagraphFormat } from '../format/paragraph-format';
import { WAbstractList } from './abstract-list';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 */
var WListLevel = /** @class */ (function () {
    function WListLevel(node) {
        this.uniqueListLevel = undefined;
        this.paragraphFormat = undefined;
        this.characterFormat = undefined;
        if (node instanceof WAbstractList) {
            this.ownerBase = node;
        }
        else {
            this.ownerBase = node;
        }
        this.characterFormat = new WCharacterFormat(undefined);
        this.paragraphFormat = new WParagraphFormat(undefined);
    }
    Object.defineProperty(WListLevel.prototype, "listLevelPattern", {
        get: function () {
            return this.getPropertyValue('listLevelPattern');
        },
        set: function (listLevelPattern) {
            this.setPropertyValue('listLevelPattern', listLevelPattern);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "followCharacter", {
        get: function () {
            return this.getPropertyValue('followCharacter');
        },
        set: function (followCharacter) {
            this.setPropertyValue('followCharacter', followCharacter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "startAt", {
        get: function () {
            return this.getPropertyValue('startAt');
        },
        set: function (startAt) {
            this.setPropertyValue('startAt', startAt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "numberFormat", {
        get: function () {
            return this.getPropertyValue('numberFormat');
        },
        set: function (numberFormat) {
            this.setPropertyValue('numberFormat', numberFormat);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "paraStyleName", {
        get: function () {
            return this.getPropertyValue('paraStyleName');
        },
        set: function (paraStyleName) {
            this.setPropertyValue('paraStyleName', paraStyleName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "restartLevel", {
        get: function () {
            return this.getPropertyValue('restartLevel');
        },
        set: function (restartLevel) {
            this.setPropertyValue('restartLevel', restartLevel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListLevel.prototype, "isLegalStyleNumbering", {
        /**
         * Gets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
         */
        get: function () {
            return this.getPropertyValue('isLegalStyleNumbering');
        },
        /**
         * Sets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
         * @param {boolean} isLegalStyleNumbering - Specifies the value.
         */
        set: function (isLegalStyleNumbering) {
            this.setPropertyValue('isLegalStyleNumbering', isLegalStyleNumbering);
        },
        enumerable: true,
        configurable: true
    });
    /* eslint-disable */
    WListLevel.prototype.getPropertyValue = function (property) {
        var propertyType = WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
        if (!isNullOrUndefined(this.uniqueListLevel) && this.uniqueListLevel.propertiesHash.containsKey(propertyType)) {
            return this.uniqueListLevel.propertiesHash.get(propertyType);
        }
        return WListLevel.getPropertyDefaultValue(property);
    };
    WListLevel.prototype.setPropertyValue = function (property, value) {
        if (isNullOrUndefined(value) || value === '') {
            value = WListLevel.getPropertyDefaultValue(property);
        }
        if (isNullOrUndefined(this.uniqueListLevel)) {
            this.initializeUniqueWListLevel(property, value);
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueListLevel.uniqueFormatType, property);
            if (this.uniqueListLevel.propertiesHash.containsKey(propertyType) &&
                this.uniqueListLevel.propertiesHash.get(propertyType) === value) { //Do nothing, since no change in property value and return
                return;
            }
            this.uniqueListLevel = WListLevel.uniqueListLevels.updateUniqueFormat(this.uniqueListLevel, property, value);
        }
    };
    WListLevel.prototype.initializeUniqueWListLevel = function (property, propValue) {
        var uniqueListLevelTemp = new Dictionary();
        this.addUniqueWListLevel('listLevelPattern', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('startAt', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('followCharacter', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('numberFormat', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('paraStyleName', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('restartLevel', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('isLegalStyleNumbering', property, propValue, uniqueListLevelTemp);
        this.uniqueListLevel = WListLevel.uniqueListLevels.addUniqueFormat(uniqueListLevelTemp, WListLevel.uniqueFormatType);
    };
    WListLevel.prototype.addUniqueWListLevel = function (property, modifiedProperty, propValue, uniqueCharFormatTemp) {
        var propertyType;
        propertyType = WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
        if (property === modifiedProperty) {
            uniqueCharFormatTemp.add(propertyType, propValue);
        }
        else {
            uniqueCharFormatTemp.add(propertyType, WListLevel.getPropertyDefaultValue(property));
        }
    };
    WListLevel.getPropertyDefaultValue = function (property) {
        /* eslint-disable */
        var value = undefined;
        switch (property) {
            case 'listLevelPattern':
                value = 'Arabic';
                break;
            case 'startAt':
                value = 0;
                break;
            case 'followCharacter':
                value = 'Tab';
                break;
            case 'paraStyleName':
            case 'numberFormat':
                value = '';
                break;
            case 'restartLevel':
                value = 0;
                break;
            case 'isLegalStyleNumbering':
                value = false;
                break;
        }
        return value;
        /* eslint-enable */
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     * @returns {void}
     */
    WListLevel.prototype.destroy = function () {
        if (!isNullOrUndefined(this.uniqueListLevel)) {
            WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
        }
        this.uniqueListLevel = undefined;
        if (!isNullOrUndefined(this.characterFormat)) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        if (!isNullOrUndefined(this.paragraphFormat)) {
            this.paragraphFormat.destroy();
            this.paragraphFormat = undefined;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    WListLevel.prototype.clearFormat = function () {
        if (!isNullOrUndefined(this.uniqueListLevel)) {
            WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
        }
        this.uniqueListLevel = undefined;
        if (this.characterFormat) {
            this.characterFormat.clearFormat();
        }
        this.characterFormat = undefined;
        if (this.paragraphFormat) {
            this.paragraphFormat.clearFormat();
        }
        this.paragraphFormat = undefined;
    };
    WListLevel.clear = function () {
        this.uniqueListLevels.clear();
    };
    WListLevel.prototype.clone = function (node) {
        var listLevel = new WListLevel(node);
        listLevel.paragraphFormat = this.paragraphFormat.cloneFormat();
        listLevel.characterFormat = this.characterFormat.cloneFormat();
        if (this.uniqueListLevel) {
            listLevel.uniqueListLevel = this.uniqueListLevel;
            listLevel.uniqueListLevel.referenceCount++;
        }
        return listLevel;
    };
    WListLevel.dotBullet = String.fromCharCode(61623);
    WListLevel.squareBullet = String.fromCharCode(61607); //Symbol font \u25aa.
    WListLevel.arrowBullet = String.fromCharCode(10148);
    WListLevel.circleBullet = String.fromCharCode(61551) + String.fromCharCode(32);
    WListLevel.uniqueListLevels = new WUniqueFormats();
    WListLevel.uniqueFormatType = 9;
    return WListLevel;
}());
export { WListLevel };
