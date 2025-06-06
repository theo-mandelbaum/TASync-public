import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { WUniqueFormat } from '../../base/unique-format';
import { WUniqueFormats } from '../../base/unique-formats';
import { WParagraphStyle } from './style';
/* eslint-disable */
/**
 * @private
 */
var WListFormat = /** @class */ (function () {
    function WListFormat(node) {
        this.uniqueListFormat = undefined;
        this.ownerBase = undefined;
        this.baseStyle = undefined;
        this.list = undefined;
        this.ownerBase = node;
    }
    Object.defineProperty(WListFormat.prototype, "nsid", {
        get: function () {
            return this.getPropertyValue('nsid');
        },
        set: function (id) {
            this.setPropertyValue('nsid', id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListFormat.prototype, "listId", {
        get: function () {
            return this.getPropertyValue('listId');
        },
        set: function (listId) {
            if (listId >= 0) {
                if (!isNullOrUndefined(this.ownerBase)) {
                    var helper = this.ownerBase.getDocumentHelperObject();
                    if (!isNullOrUndefined(helper)) {
                        this.list = helper.getListById(listId);
                    }
                }
            }
            else if (!isNullOrUndefined(this.list) && listId < 0) {
                this.list = undefined;
            }
            this.setPropertyValue('listId', listId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListFormat.prototype, "listLevelNumber", {
        get: function () {
            return this.getPropertyValue('listLevelNumber');
        },
        set: function (value) {
            this.setPropertyValue('listLevelNumber', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WListFormat.prototype, "listLevel", {
        get: function () {
            var list = undefined;
            if (!isNullOrUndefined(this.list)) {
                list = this.list;
            }
            else {
                var baseListStyle = this.baseStyle;
                while (!isNullOrUndefined(baseListStyle) && baseListStyle instanceof WParagraphStyle) {
                    if (baseListStyle.paragraphFormat.listFormat.list) {
                        list = baseListStyle.paragraphFormat.listFormat.list;
                        break;
                    }
                    else {
                        baseListStyle = baseListStyle.basedOn;
                    }
                }
            }
            if (!isNullOrUndefined(list)) {
                return list.getListLevel(this.listLevelNumber);
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    WListFormat.prototype.getPropertyValue = function (property) {
        if (!this.hasValue(property)) {
            if (this.baseStyle instanceof WParagraphStyle) {
                var baseStyle = this.baseStyle;
                while (!isNullOrUndefined(baseStyle)) {
                    if (baseStyle.paragraphFormat.listFormat.hasValue(property)) {
                        break;
                    }
                    else {
                        baseStyle = baseStyle.basedOn;
                    }
                }
                if (!isNullOrUndefined(baseStyle)) {
                    var propertyType = WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
                    return baseStyle.paragraphFormat.listFormat.uniqueListFormat.propertiesHash.get(propertyType);
                }
            }
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
            if (!isNullOrUndefined(this.uniqueListFormat) && this.uniqueListFormat.propertiesHash.containsKey(propertyType)) {
                return this.uniqueListFormat.propertiesHash.get(propertyType);
            }
        }
        return WListFormat.getPropertyDefaultValue(property);
    };
    WListFormat.prototype.setPropertyValue = function (property, value) {
        if (isNullOrUndefined(value) || value === '') {
            value = WListFormat.getPropertyDefaultValue(property);
        }
        if (isNullOrUndefined(this.uniqueListFormat)) {
            this.initializeUniqueListFormat(property, value);
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueListFormat.uniqueFormatType, property);
            if (this.uniqueListFormat.propertiesHash.containsKey(propertyType) &&
                this.uniqueListFormat.propertiesHash.get(propertyType) === value) {
                //Do nothing, since no change in property value and return
                return;
            }
            this.uniqueListFormat = WListFormat.uniqueListFormats.updateUniqueFormat(this.uniqueListFormat, property, value);
        }
    };
    WListFormat.prototype.initializeUniqueListFormat = function (property, propValue) {
        var uniqueListFormatTemp = new Dictionary();
        this.addUniqueListFormat('listId', property, propValue, uniqueListFormatTemp);
        this.addUniqueListFormat('listLevelNumber', property, propValue, uniqueListFormatTemp);
        this.addUniqueListFormat('nsid', property, propValue, uniqueListFormatTemp);
        this.uniqueListFormat = WListFormat.uniqueListFormats.addUniqueFormat(uniqueListFormatTemp, WListFormat.uniqueFormatType);
    };
    WListFormat.prototype.addUniqueListFormat = function (property, modifiedProperty, propValue, uniqueListFormatTemp) {
        var propertyType = WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
        if (property === modifiedProperty) {
            uniqueListFormatTemp.add(propertyType, propValue);
        }
    };
    WListFormat.getPropertyDefaultValue = function (property) {
        var value = undefined;
        switch (property) {
            case 'listId':
                value = -1;
                break;
            case 'listLevelNumber':
                value = 0;
                break;
            case 'nsid':
                value = -1;
                break;
        }
        return value;
    };
    WListFormat.prototype.copyFormat = function (format) {
        if (!isNullOrUndefined(format)) {
            if (!isNullOrUndefined(format.uniqueListFormat)) {
                this.listId = format.listId;
                this.listLevelNumber = format.listLevelNumber;
                this.nsid = format.nsid;
            }
            if (!isNullOrUndefined(format.baseStyle)) {
                this.baseStyle = format.baseStyle;
            }
            if (!isNullOrUndefined(format.list)) {
                this.list = format.list;
            }
        }
    };
    WListFormat.prototype.hasValue = function (property) {
        if (!isNullOrUndefined(this.uniqueListFormat)) {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueListFormat.uniqueFormatType, property);
            return this.uniqueListFormat.propertiesHash.containsKey(propertyType);
        }
        return false;
    };
    WListFormat.prototype.clearFormat = function () {
        if (!isNullOrUndefined(this.uniqueListFormat) && this.uniqueListFormat.referenceCount === 0) {
            WListFormat.uniqueListFormats.remove(this.uniqueListFormat);
        }
        this.uniqueListFormat = undefined;
        this.list = undefined;
    };
    WListFormat.prototype.destroy = function () {
        if (!isNullOrUndefined(this.uniqueListFormat)) {
            WListFormat.uniqueListFormats.remove(this.uniqueListFormat);
        }
        this.uniqueListFormat = undefined;
        this.list = undefined;
        this.ownerBase = undefined;
        this.baseStyle = undefined;
    };
    WListFormat.clear = function () {
        this.uniqueListFormats.clear();
    };
    WListFormat.prototype.applyStyle = function (baseStyle) {
        this.baseStyle = baseStyle;
    };
    WListFormat.prototype.getValue = function (property) {
        return this.hasValue(property) ? this.getPropertyValue(property) : undefined;
    };
    //This method logic is not correct for changing the style dialog. Instead of this created assign format method and used it..
    // public mergeFormat(format: WListFormat): void {
    //     if (isNullOrUndefined(this.getValue('listId'))) {
    //         this.listId = format.getValue('listId') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('listLevelNumber'))) {
    //         this.listLevelNumber = format.getValue('listLevelNumber') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('nsid'))) {
    //         this.nsid = format.getValue('nsid') as number;
    //     }
    //     if (!isNullOrUndefined(format.list)) {
    //         if (isNullOrUndefined(this.list)) {
    //             this.list = new WList();
    //         }
    //         this.list.mergeList(format.list);
    //     }
    // }
    WListFormat.prototype.cloneListFormat = function () {
        var format = new WListFormat(undefined);
        format.list = this.list;
        format.listId = this.listId;
        format.nsid = this.nsid;
        format.baseStyle = this.baseStyle;
        format.listLevelNumber = this.listLevelNumber;
        format.uniqueListFormat = this.uniqueListFormat;
        return format;
    };
    WListFormat.uniqueListFormats = new WUniqueFormats();
    WListFormat.uniqueFormatType = 7;
    return WListFormat;
}());
export { WListFormat };
