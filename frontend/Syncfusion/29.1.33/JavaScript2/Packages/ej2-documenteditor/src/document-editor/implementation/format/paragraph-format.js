import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { WBorders } from './borders';
import { WUniqueFormat } from '../../base/unique-format';
import { WUniqueFormats } from '../../base/unique-formats';
import { WListFormat } from './list-format';
import { ParagraphWidget, TableCellWidget, BlockContainer, TextFrame } from '../viewer/page';
import { WParagraphStyle } from './style';
/* eslint-disable */
/**
 * @private
 */
var WTabStop = /** @class */ (function () {
    function WTabStop() {
    }
    Object.defineProperty(WTabStop.prototype, "position", {
        get: function () {
            return this.positionIn;
        },
        set: function (value) {
            this.positionIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WTabStop.prototype, "deletePosition", {
        get: function () {
            return this.deletePositionIn;
        },
        set: function (value) {
            this.deletePositionIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WTabStop.prototype, "tabJustification", {
        get: function () {
            return this.justification;
        },
        set: function (value) {
            this.justification = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WTabStop.prototype, "tabLeader", {
        get: function () {
            return this.leader;
        },
        set: function (value) {
            this.leader = value;
        },
        enumerable: true,
        configurable: true
    });
    WTabStop.prototype.clone = function () {
        var tabStop = new WTabStop();
        tabStop.deletePosition = this.deletePosition;
        tabStop.position = this.position;
        tabStop.tabJustification = this.tabJustification;
        tabStop.tabLeader = this.tabLeader;
        return tabStop;
    };
    WTabStop.prototype.equals = function (tab) {
        if (this.position === tab.position &&
            this.deletePosition === tab.deletePosition &&
            this.tabJustification === tab.tabJustification &&
            this.tabLeader === tab.tabLeader) {
            return true;
        }
        else {
            return false;
        }
    };
    WTabStop.prototype.destroy = function () {
        this.position = undefined;
        this.deletePosition = undefined;
        this.tabJustification = undefined;
        this.leader = undefined;
    };
    return WTabStop;
}());
export { WTabStop };
/**
 * @private
 */
var WParagraphFormat = /** @class */ (function () {
    function WParagraphFormat(node) {
        this.uniqueParagraphFormat = undefined;
        this.ownerBase = undefined;
        this.baseStyle = undefined;
        this.tabs = undefined;
        this.ownerBase = node;
        this.listFormat = new WListFormat(this);
        this.borders = new WBorders(this);
        this.tabs = [];
    }
    WParagraphFormat.prototype.getUpdatedTabs = function () {
        var inTabs = [];
        var tabStops = new Dictionary();
        var tabsInListFormat = this.getTabStopsFromListFormat();
        for (var _i = 0, tabsInListFormat_1 = tabsInListFormat; _i < tabsInListFormat_1.length; _i++) {
            var tabStop = tabsInListFormat_1[_i];
            if (!tabStops.containsKey(tabStop.position)) {
                tabStops.add(tabStop.position, tabStop);
            }
        }
        if (!isNullOrUndefined(this.baseStyle) && this.baseStyle instanceof WParagraphStyle) {
            var baseStyle = this.baseStyle;
            while (!isNullOrUndefined(baseStyle)) {
                for (var _a = 0, _b = baseStyle.paragraphFormat.tabs; _a < _b.length; _a++) {
                    var tab = _b[_a];
                    if (!tabStops.containsKey(tab.position)) {
                        tabStops.add(tab.position, tab);
                    }
                }
                baseStyle = baseStyle.basedOn;
            }
            var tabsCollection_1 = [];
            tabStops.keys.forEach(function (key) { tabsCollection_1.push(tabStops.get(key)); });
            for (var i = 0; i < tabsCollection_1.length; i++) {
                var tabStop = tabsCollection_1[i];
                if (!this.isValidTabStop(tabsCollection_1, tabStop)) {
                    tabStops.remove(tabStop.position);
                }
            }
            for (var _c = 0, _d = tabStops.keys; _c < _d.length; _c++) {
                var key = _d[_c];
                if (!this.hasTabStop(parseFloat(key.toFixed(4)))) {
                    inTabs.push(tabStops.get(key));
                }
            }
        }
        inTabs = inTabs.concat(this.tabs.filter(function (a) { return (a.position !== 0 && a.deletePosition === 0); }));
        inTabs = inTabs.sort(function (a, b) { return a.position - b.position; });
        return inTabs;
    };
    WParagraphFormat.prototype.getTabStopsFromListFormat = function () {
        if (this.listFormat.listId > -1 && this.listFormat.listLevelNumber > -1) {
            var level = this.listFormat.listLevel;
            if (level && level.paragraphFormat) {
                return level.paragraphFormat.tabs;
            }
        }
        return [];
    };
    WParagraphFormat.prototype.isValidTabStop = function (tabs, tabStop) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabStop != tabs[i] && (parseFloat(tabs[i].position.toFixed(4)) === parseFloat(tabStop.position.toFixed(4)) ||
                parseFloat(tabs[i].deletePosition.toFixed(4)) === parseFloat(tabStop.position.toFixed(4)))) {
                return false;
            }
        }
        return true;
    };
    WParagraphFormat.prototype.hasTabStop = function (position) {
        for (var i = 0; i < this.tabs.length; i++) {
            if (parseFloat(this.tabs[i].position.toFixed(4)) === position ||
                parseFloat(this.tabs[i].deletePosition.toFixed(4)) === position) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(WParagraphFormat.prototype, "leftIndent", {
        get: function () {
            return this.getPropertyValue('leftIndent');
        },
        set: function (value) {
            this.setPropertyValue('leftIndent', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "rightIndent", {
        get: function () {
            return this.getPropertyValue('rightIndent');
        },
        set: function (value) {
            this.setPropertyValue('rightIndent', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "firstLineIndent", {
        get: function () {
            return this.getPropertyValue('firstLineIndent');
        },
        set: function (value) {
            this.setPropertyValue('firstLineIndent', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "beforeSpacing", {
        get: function () {
            return this.getPropertyValue('beforeSpacing');
        },
        set: function (value) {
            this.setPropertyValue('beforeSpacing', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "afterSpacing", {
        get: function () {
            return this.getPropertyValue('afterSpacing');
        },
        set: function (value) {
            this.setPropertyValue('afterSpacing', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "spaceBeforeAuto", {
        get: function () {
            return this.getPropertyValue('spaceBeforeAuto');
        },
        set: function (value) {
            this.setPropertyValue('spaceBeforeAuto', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "spaceAfterAuto", {
        get: function () {
            return this.getPropertyValue('spaceAfterAuto');
        },
        set: function (value) {
            this.setPropertyValue('spaceAfterAuto', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "lineSpacing", {
        get: function () {
            return this.getPropertyValue('lineSpacing');
        },
        set: function (value) {
            this.setPropertyValue('lineSpacing', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "lineSpacingType", {
        get: function () {
            return this.getPropertyValue('lineSpacingType');
        },
        set: function (value) {
            this.setPropertyValue('lineSpacingType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "textAlignment", {
        get: function () {
            var value = this.getPropertyValue('textAlignment');
            if (this.bidi) {
                if (value === 'Left') {
                    value = 'Right';
                }
                else if (value === 'Right') {
                    value = 'Left';
                }
            }
            return value;
        },
        set: function (value) {
            this.setPropertyValue('textAlignment', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "keepWithNext", {
        get: function () {
            return this.getPropertyValue('keepWithNext');
        },
        set: function (value) {
            this.setPropertyValue('keepWithNext', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "keepLinesTogether", {
        get: function () {
            return this.getPropertyValue('keepLinesTogether');
        },
        set: function (value) {
            this.setPropertyValue('keepLinesTogether', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "widowControl", {
        get: function () {
            return this.getPropertyValue('widowControl');
        },
        set: function (value) {
            this.setPropertyValue('widowControl', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "outlineLevel", {
        get: function () {
            return this.getPropertyValue('outlineLevel');
        },
        set: function (value) {
            this.setPropertyValue('outlineLevel', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "bidi", {
        get: function () {
            return this.getPropertyValue('bidi');
        },
        set: function (value) {
            this.setPropertyValue('bidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WParagraphFormat.prototype, "contextualSpacing", {
        get: function () {
            return this.getPropertyValue('contextualSpacing');
        },
        set: function (value) {
            this.setPropertyValue('contextualSpacing', value);
        },
        enumerable: true,
        configurable: true
    });
    WParagraphFormat.prototype.getListFormatParagraphFormat = function (property) {
        var paragraphFormat = this.getListPargaraphFormat(property);
        if (!isNullOrUndefined(paragraphFormat)) {
            return paragraphFormat.uniqueParagraphFormat.propertiesHash.get(WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property));
        }
        return undefined;
    };
    /**
    * @private
    */
    WParagraphFormat.prototype.getListPargaraphFormat = function (property) {
        if (this.listFormat.hasValue('listId') && this.listFormat.listId > -1 && this.listFormat.listLevelNumber > -1) {
            var level = this.listFormat.listLevel;
            var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
            if (!isNullOrUndefined(level) && !isNullOrUndefined(level.paragraphFormat.uniqueParagraphFormat) &&
                level.paragraphFormat.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)) {
                return level.paragraphFormat;
            }
            else {
                return undefined;
            }
        }
        else if (this.listFormat.hasValue('listId') && this.listFormat.listId === -1
            && (property === 'leftIndent' || property === 'firstLineIndent')) {
            var paraFormat = new WParagraphFormat();
            if (!this.hasValue('leftIndent')) {
                paraFormat.leftIndent = 0;
            }
            if (!this.hasValue('firstLineIndent')) {
                paraFormat.firstLineIndent = 0;
            }
            return paraFormat;
        }
        return undefined;
    };
    WParagraphFormat.prototype.getPropertyValue = function (property) {
        if (!this.hasValue(property)) {
            var formatInList = this.getListFormatParagraphFormat(property);
            if (this.baseStyle instanceof WParagraphStyle) {
                var currentFormat = this;
                var baseStyle = this.baseStyle;
                while (!isNullOrUndefined(baseStyle)) {
                    var listParaFormat = void 0;
                    if (!this.listFormat.hasValue('listId')) {
                        listParaFormat = baseStyle.paragraphFormat.getListPargaraphFormat(property);
                    }
                    if (baseStyle.paragraphFormat.hasValue(property)) {
                        currentFormat = baseStyle.paragraphFormat;
                        break;
                    }
                    else if (!isNullOrUndefined(listParaFormat) && listParaFormat.hasValue(property)) {
                        if (baseStyle.paragraphFormat.listFormat.listLevelNumber !== this.listFormat.listLevelNumber) {
                            var level = this.listFormat.listLevel;
                            var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
                            if (!isNullOrUndefined(level) && !isNullOrUndefined(level.paragraphFormat.uniqueParagraphFormat) &&
                                level.paragraphFormat.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)) {
                                currentFormat = level.paragraphFormat;
                                break;
                            }
                        }
                        currentFormat = listParaFormat;
                        break;
                    }
                    else {
                        baseStyle = baseStyle.basedOn;
                    }
                }
                if (!isNullOrUndefined(baseStyle)) {
                    if (!isNullOrUndefined(formatInList) && this.listFormat.hasValue('listId')
                        && currentFormat.listFormat.listId === -1 && currentFormat.listFormat.listLevelNumber <= 1
                        || !isNullOrUndefined(formatInList) && this.listFormat.listId !== currentFormat.listFormat.listId
                            && currentFormat.listFormat.listLevelNumber <= 1) {
                        return formatInList;
                    }
                    var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
                    return currentFormat.uniqueParagraphFormat.propertiesHash.get(propertyType);
                }
            }
            if (!isNullOrUndefined(formatInList)) {
                return formatInList;
            }
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
            if (!isNullOrUndefined(this.uniqueParagraphFormat) && this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)) {
                return this.uniqueParagraphFormat.propertiesHash.get(propertyType);
            }
        }
        return this.getDefaultValue(property);
    };
    WParagraphFormat.prototype.getDefaultValue = function (property) {
        var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
        var docParagraphFormat = this.getDocumentParagraphFormat();
        var isInsideBodyWidget = true;
        if (this.ownerBase && this.ownerBase instanceof ParagraphWidget) {
            isInsideBodyWidget = this.ownerBase.containerWidget instanceof BlockContainer || this.ownerBase.containerWidget instanceof TextFrame ||
                this.ownerBase.containerWidget instanceof TableCellWidget;
        }
        var isPaste = !isNullOrUndefined(this.ownerBase) && !isNullOrUndefined(this.ownerBase.bodyWidget)
            && this.ownerBase.bodyWidget.page && !isNullOrUndefined(this.ownerBase.bodyWidget.page.documentHelper) && this.ownerBase.bodyWidget.page.documentHelper.owner.editorModule
            && this.ownerBase.bodyWidget.page.documentHelper.owner.editorModule.isPaste;
        if (isInsideBodyWidget && !isPaste
            && !isNullOrUndefined(docParagraphFormat) && !isNullOrUndefined(docParagraphFormat.uniqueParagraphFormat)) {
            var propValue = docParagraphFormat.uniqueParagraphFormat.propertiesHash.get(propertyType);
            if (!isNullOrUndefined(propValue)) {
                return propValue;
            }
        }
        return WParagraphFormat.getPropertyDefaultValue(property);
    };
    /**
    * @private
    */
    WParagraphFormat.prototype.getDocumentParagraphFormat = function () {
        var docParagraphFormat;
        if (!isNullOrUndefined(this.ownerBase)) {
            var documentHelper = this.getDocumentHelperObject();
            if (!isNullOrUndefined(documentHelper)) {
                docParagraphFormat = documentHelper.paragraphFormat;
            }
        }
        return docParagraphFormat;
    };
    /**
    * @private
    */
    WParagraphFormat.prototype.getDocumentHelperObject = function () {
        var documentHelper;
        if (this.ownerBase instanceof ParagraphWidget) {
            var bodyWidget = this.ownerBase.bodyWidget;
            if (!isNullOrUndefined(bodyWidget) && !isNullOrUndefined(bodyWidget.page) && !isNullOrUndefined(bodyWidget.page.documentHelper)) {
                documentHelper = bodyWidget.page.documentHelper;
            }
        }
        return documentHelper;
    };
    WParagraphFormat.prototype.setPropertyValue = function (property, value, clearProperty) {
        if (isNullOrUndefined(value) || value === '' && !clearProperty) {
            value = WParagraphFormat.getPropertyDefaultValue(property);
        }
        if (isNullOrUndefined(this.uniqueParagraphFormat)
            || (isNullOrUndefined(this.uniqueParagraphFormat.propertiesHash)
                && isNullOrUndefined(this.uniqueParagraphFormat.uniqueFormatType)
                && isNullOrUndefined(this.uniqueParagraphFormat.referenceCount))) {
            this.initializeUniqueParagraphFormat(property, value);
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
            if (this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType) &&
                this.uniqueParagraphFormat.propertiesHash.get(propertyType) === value) {
                //Do nothing, since no change in property value and return
                return;
            }
            this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.updateUniqueFormat(this.uniqueParagraphFormat, property, value);
        }
    };
    WParagraphFormat.prototype.initializeUniqueParagraphFormat = function (property, propValue) {
        var uniqueParaFormatTemp = new Dictionary();
        this.addUniqueParaFormat('leftIndent', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('rightIndent', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('firstLineIndent', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('textAlignment', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('beforeSpacing', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('afterSpacing', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('spaceBeforeAuto', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('spaceAfterAuto', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('lineSpacing', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('lineSpacingType', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('outlineLevel', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('bidi', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('contextualSpacing', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('keepWithNext', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('keepLinesTogether', property, propValue, uniqueParaFormatTemp);
        this.addUniqueParaFormat('widowControl', property, propValue, uniqueParaFormatTemp);
        this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.addUniqueFormat(uniqueParaFormatTemp, WParagraphFormat.uniqueFormatType);
    };
    WParagraphFormat.prototype.addUniqueParaFormat = function (property, modifiedProperty, propValue, uniqueParaFormatTemp) {
        var propertyType = WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
        if (property === modifiedProperty) {
            uniqueParaFormatTemp.add(propertyType, propValue);
        }
    };
    WParagraphFormat.getPropertyDefaultValue = function (property) {
        var value = undefined;
        switch (property) {
            case 'leftIndent':
                value = 0;
                break;
            case 'rightIndent':
                value = 0;
                break;
            case 'firstLineIndent':
                value = 0;
                break;
            case 'textAlignment':
                value = 'Left';
                break;
            case 'beforeSpacing':
                value = 0;
                break;
            case 'afterSpacing':
                value = 0;
                break;
            case 'spaceBeforeAuto':
                value = false;
                break;
            case 'spaceAfterAuto':
                value = false;
                break;
            case 'lineSpacing':
                value = 1;
                break;
            case 'lineSpacingType':
                value = 'Multiple';
                break;
            case 'styleName':
                value = 'Normal';
                break;
            case 'outlineLevel':
                value = 'BodyText';
                break;
            case 'bidi':
                value = false;
                break;
            case 'contextualSpacing':
                value = false;
                break;
            case 'keepWithNext':
                value = false;
                break;
            case 'keepLinesTogether':
                value = false;
                break;
            case 'widowControl':
                value = true;
                break;
        }
        return value;
    };
    WParagraphFormat.prototype.clearIndent = function () {
        this.clearPropertyValue('leftIndent');
        this.clearPropertyValue('firstLineIndent');
    };
    WParagraphFormat.prototype.clearPropertyValue = function (property) {
        this.setPropertyValue(property, undefined, true);
        if (!isNullOrUndefined(this.uniqueParagraphFormat)) {
            var key = WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
            if (this.uniqueParagraphFormat.propertiesHash.containsKey(key)) {
                this.uniqueParagraphFormat.propertiesHash.remove(key);
            }
        }
    };
    WParagraphFormat.prototype.clearFormat = function () {
        if (!isNullOrUndefined(this.listFormat)) {
            this.listFormat.clearFormat();
        }
        if (!isNullOrUndefined(this.borders)) {
            this.borders.clearFormat();
        }
        if (!isNullOrUndefined(this.uniqueParagraphFormat) && this.uniqueParagraphFormat.referenceCount === 0) {
            WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
        }
        this.uniqueParagraphFormat = undefined;
        if (!isNullOrUndefined(this.getDocumentHelperObject())) {
            this.baseStyle = this.getDocumentHelperObject().styles.findByName('Normal');
        }
    };
    WParagraphFormat.prototype.destroy = function () {
        if (!isNullOrUndefined(this.uniqueParagraphFormat)) {
            WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
        }
        this.uniqueParagraphFormat = undefined;
        if (!isNullOrUndefined(this.listFormat)) {
            this.listFormat.destroy();
        }
        this.listFormat = undefined;
        if (this.tabs && this.tabs.length > 0) {
            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs[i].destroy();
            }
            this.tabs = [];
            this.tabs = undefined;
        }
        if (!isNullOrUndefined(this.borders)) {
            this.borders.destroy();
        }
        this.borders = undefined;
        this.baseStyle = undefined;
        this.ownerBase = undefined;
    };
    WParagraphFormat.prototype.copyFormat = function (format) {
        if (!isNullOrUndefined(format)) {
            if (!isNullOrUndefined(format.uniqueParagraphFormat)) {
                this.updateUniqueParagraphFormat(format);
            }
            if (!isNullOrUndefined(format.borders)) {
                if (isNullOrUndefined(this.borders)) {
                    this.borders = new WBorders(this);
                }
                this.borders.copyFormat(format.borders);
            }
            if (!isNullOrUndefined(format.listFormat)) {
                if (isNullOrUndefined(this.listFormat)) {
                    this.listFormat = new WListFormat(this);
                }
                this.listFormat.copyFormat(format.listFormat);
            }
            if (!isNullOrUndefined(format.baseStyle)) {
                this.baseStyle = format.baseStyle;
            }
            if (!isNullOrUndefined(format.tabs)) {
                for (var i = 0; i < format.tabs.length; i++) {
                    this.tabs[i] = format.tabs[i];
                }
            }
        }
    };
    WParagraphFormat.prototype.updateUniqueParagraphFormat = function (format) {
        var hash = undefined;
        if (this.uniqueParagraphFormat) {
            hash = this.uniqueParagraphFormat.mergeProperties(format.uniqueParagraphFormat);
            if (this.uniqueParagraphFormat.referenceCount === 0) {
                WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
                this.uniqueParagraphFormat = undefined;
            }
        }
        this.uniqueParagraphFormat = new WUniqueFormat(WParagraphFormat.uniqueFormatType);
        if (isNullOrUndefined(hash)) {
            hash = this.uniqueParagraphFormat.mergeProperties(format.uniqueParagraphFormat);
        }
        this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.addUniqueFormat(hash, WParagraphFormat.uniqueFormatType);
    };
    WParagraphFormat.prototype.cloneFormat = function () {
        var format = new WParagraphFormat(undefined);
        format.uniqueParagraphFormat = this.uniqueParagraphFormat;
        format.baseStyle = this.baseStyle;
        if (isNullOrUndefined(this.listFormat)) {
            format.listFormat = undefined;
        }
        else {
            format.listFormat = this.listFormat.cloneListFormat();
            format.listFormat.ownerBase = format;
        }
        format.borders = isNullOrUndefined(this.borders) ? undefined : this.borders.cloneFormat();
        return format;
    };
    /**
     *
     * @private
     */
    WParagraphFormat.prototype.hasValue = function (property) {
        if (!isNullOrUndefined(this.uniqueParagraphFormat) && !isNullOrUndefined(this.uniqueParagraphFormat.propertiesHash)) {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
            return this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType);
        }
        return false;
    };
    WParagraphFormat.clear = function () {
        this.uniqueParagraphFormats.clear();
    };
    WParagraphFormat.prototype.applyStyle = function (baseStyle) {
        this.baseStyle = baseStyle;
        this.listFormat.applyStyle(this.baseStyle);
    };
    WParagraphFormat.prototype.getValue = function (property) {
        return this.hasValue(property) ? this.getPropertyValue(property) : undefined;
    };
    //This method logic is not correct for changing the style dialog. Instead of this created assign format method and used it..
    // public mergeFormat(format: WParagraphFormat, isStyle?: boolean): void {
    //     isStyle = isNullOrUndefined(isStyle) ? false : isStyle;
    //     if (isNullOrUndefined(this.getValue('leftIndent'))) {
    //         this.leftIndent = format.getValue('leftIndent') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('rightIndent'))) {
    //         this.rightIndent = format.getValue('rightIndent') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('firstLineIndent'))) {
    //         this.firstLineIndent = format.getValue('firstLineIndent') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('beforeSpacing'))) {
    //         this.beforeSpacing = format.getValue('beforeSpacing') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('afterSpacing'))) {
    //         this.afterSpacing = format.getValue('afterSpacing') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('spaceBeforeAuto'))) {
    //         this.spaceBeforeAuto = format.getValue('spaceBeforeAuto') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('spaceAfterAuto'))) {
    //         this.spaceAfterAuto = format.getValue('spaceAfterAuto') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('lineSpacing'))) {
    //         this.lineSpacing = format.getValue('lineSpacing') as number;
    //     }
    //     if (isNullOrUndefined(this.getValue('lineSpacingType'))) {
    //         this.lineSpacingType = format.getValue('lineSpacingType') as LineSpacingType;
    //     }
    //     if (isNullOrUndefined(this.getValue('textAlignment'))) {
    //         this.textAlignment = format.getValue('textAlignment') as TextAlignment;
    //     }
    //     if (isNullOrUndefined(this.getValue('outlineLevel'))) {
    //         this.outlineLevel = format.getValue('outlineLevel') as OutlineLevel;
    //     }
    //     if (!isStyle && isNullOrUndefined(this.getValue('bidi'))) {
    //         this.bidi = format.getValue('bidi') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('contextualSpacing'))) {
    //         this.contextualSpacing = format.getValue('contextualSpacing') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('keepWithNext'))) {
    //         this.keepWithNext = format.getValue('keepWithNext') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('keepLinesTogether'))) {
    //         this.keepLinesTogether = format.getValue('keepLinesTogether') as boolean;
    //     }
    //     if (isNullOrUndefined(this.getValue('widowControl'))) {
    //         this.widowControl = format.getValue('widowControl') as boolean;
    //     }
    //     if (isNullOrUndefined(this.listFormat)) {
    // this.listFormat.mergeFormat(format.listFormat);
    //     }
    // }
    /**
     * Assinging the value for style dialog
     * @private
     * @returns {void}
     */
    WParagraphFormat.prototype.assignFormat = function (format, isStyle) {
        isStyle = isNullOrUndefined(isStyle) ? false : isStyle;
        if (format.hasValue('leftIndent')) {
            this.leftIndent = format.getValue('leftIndent');
        }
        if (format.hasValue('rightIndent')) {
            this.rightIndent = format.getValue('rightIndent');
        }
        if (format.hasValue('firstLineIndent')) {
            this.firstLineIndent = format.getValue('firstLineIndent');
        }
        if (format.hasValue('beforeSpacing')) {
            this.beforeSpacing = format.getValue('beforeSpacing');
        }
        if (format.hasValue('afterSpacing')) {
            this.afterSpacing = format.getValue('afterSpacing');
        }
        if (format.hasValue('spaceBeforeAuto')) {
            this.spaceBeforeAuto = format.getValue('spaceBeforeAuto');
        }
        if (format.hasValue('spaceAfterAuto')) {
            this.spaceAfterAuto = format.getValue('spaceAfterAuto');
        }
        if (format.hasValue('lineSpacing')) {
            this.lineSpacing = format.getValue('lineSpacing');
        }
        if (format.hasValue('lineSpacingType')) {
            this.lineSpacingType = format.getValue('lineSpacingType');
        }
        if (format.hasValue('textAlignment')) {
            this.textAlignment = format.getValue('textAlignment');
        }
        if (format.hasValue('outlineLevel')) {
            this.outlineLevel = format.getValue('outlineLevel');
        }
        if (!isStyle && format.hasValue('bidi')) {
            this.bidi = format.getValue('bidi');
        }
        if (format.hasValue('contextualSpacing')) {
            this.contextualSpacing = format.getValue('contextualSpacing');
        }
        if (format.hasValue('keepWithNext')) {
            this.keepWithNext = format.getValue('keepWithNext');
        }
        if (format.hasValue('keepLinesTogether')) {
            this.keepLinesTogether = format.getValue('keepLinesTogether');
        }
        if (format.hasValue('widowControl')) {
            this.widowControl = format.getValue('widowControl');
        }
    };
    WParagraphFormat.uniqueParagraphFormats = new WUniqueFormats();
    WParagraphFormat.uniqueFormatType = 3;
    return WParagraphFormat;
}());
export { WParagraphFormat };
