import { TextElementBox, ParagraphWidget, ElementBox } from '../viewer/page';
import { Dictionary } from '../../base/dictionary';
import { WUniqueFormat } from '../../base/unique-format';
import { WUniqueFormats } from '../../base/unique-formats';
import { WParagraphStyle, WCharacterStyle } from './style';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Revision } from '../track-changes/track-changes';
/* eslint-disable */
/**
 * @private
 */
var WCharacterFormat = /** @class */ (function () {
    function WCharacterFormat(node) {
        this.uniqueCharacterFormat = undefined;
        this.ownerBase = undefined;
        this.baseCharStyle = undefined;
        /**
         * @private
         */
        this.removedIds = [];
        /**
         * @private
         */
        this.revisions = [];
        this.ownerBase = node;
    }
    Object.defineProperty(WCharacterFormat.prototype, "bold", {
        get: function () {
            return this.getPropertyValue('bold');
        },
        set: function (value) {
            this.setPropertyValue('bold', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "italic", {
        get: function () {
            return this.getPropertyValue('italic');
        },
        set: function (value) {
            this.setPropertyValue('italic', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontSize", {
        get: function () {
            return this.getPropertyValue('fontSize');
        },
        set: function (value) {
            this.setPropertyValue('fontSize', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "characterSpacing", {
        get: function () {
            return this.getPropertyValue('characterSpacing');
        },
        set: function (value) {
            this.setPropertyValue('characterSpacing', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "scaling", {
        get: function () {
            return this.getPropertyValue('scaling');
        },
        set: function (value) {
            this.setPropertyValue('scaling', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontFamily", {
        get: function () {
            return this.getPropertyValue('fontFamily');
        },
        set: function (value) {
            this.setPropertyValue('fontFamily', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "underline", {
        get: function () {
            return this.getPropertyValue('underline');
        },
        set: function (value) {
            this.setPropertyValue('underline', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "underlineColor", {
        get: function () {
            return this.getPropertyValue('underlineColor');
        },
        set: function (value) {
            this.setPropertyValue('underlineColor', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontHintType", {
        get: function () {
            return this.getPropertyValue('fontHintType');
        },
        set: function (value) {
            this.setPropertyValue('fontHintType', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "strikethrough", {
        get: function () {
            return this.getPropertyValue('strikethrough');
        },
        set: function (value) {
            this.setPropertyValue('strikethrough', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "baselineAlignment", {
        get: function () {
            return this.getPropertyValue('baselineAlignment');
        },
        set: function (value) {
            this.setPropertyValue('baselineAlignment', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "highlightColor", {
        get: function () {
            return this.getPropertyValue('highlightColor');
        },
        set: function (value) {
            this.setPropertyValue('highlightColor', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontColor", {
        get: function () {
            return this.getPropertyValue('fontColor');
        },
        set: function (value) {
            this.setPropertyValue('fontColor', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "bidi", {
        get: function () {
            return this.getPropertyValue('bidi');
        },
        set: function (value) {
            this.setPropertyValue('bidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "localeIdBidi", {
        get: function () {
            return this.getPropertyValue('localeIdBidi');
        },
        set: function (value) {
            this.setPropertyValue('localeIdBidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "localeIdFarEast", {
        get: function () {
            return this.getPropertyValue('localeIdFarEast');
        },
        set: function (value) {
            this.setPropertyValue('localeIdFarEast', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "localeIdAscii", {
        get: function () {
            return this.getPropertyValue('localeIdAscii');
        },
        set: function (value) {
            this.setPropertyValue('localeIdAscii', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "bdo", {
        get: function () {
            return this.getPropertyValue('bdo');
        },
        set: function (value) {
            this.setPropertyValue('bdo', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "boldBidi", {
        get: function () {
            return this.getPropertyValue('boldBidi');
        },
        set: function (value) {
            this.setPropertyValue('boldBidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "italicBidi", {
        get: function () {
            return this.getPropertyValue('italicBidi');
        },
        set: function (value) {
            this.setPropertyValue('italicBidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontSizeBidi", {
        get: function () {
            return this.getPropertyValue('fontSizeBidi');
        },
        set: function (value) {
            this.setPropertyValue('fontSizeBidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontFamilyBidi", {
        get: function () {
            return this.getPropertyValue('fontFamilyBidi');
        },
        set: function (value) {
            this.setPropertyValue('fontFamilyBidi', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "allCaps", {
        get: function () {
            return this.getPropertyValue('allCaps');
        },
        set: function (value) {
            this.setPropertyValue('allCaps', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "Lowercase", {
        get: function () {
            return this.getPropertyValue('Lowercase');
        },
        set: function (value) {
            this.setPropertyValue('Lowercase', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "Uppercase", {
        get: function () {
            return this.getPropertyValue('Uppercase');
        },
        set: function (value) {
            this.setPropertyValue('Uppercase', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "SentenceCase", {
        get: function () {
            return this.getPropertyValue('SentenceCase');
        },
        set: function (value) {
            this.setPropertyValue('SentenceCase', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "ToggleCase", {
        get: function () {
            return this.getPropertyValue('ToggleCase');
        },
        set: function (value) {
            this.setPropertyValue('ToggleCase', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "CapitalizeEachWord", {
        get: function () {
            return this.getPropertyValue('CapitalizeEachWord');
        },
        set: function (value) {
            this.setPropertyValue('CapitalizeEachWord', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "complexScript", {
        get: function () {
            return this.getPropertyValue('complexScript');
        },
        set: function (value) {
            this.setPropertyValue('complexScript', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "hidden", {
        get: function () {
            return this.getPropertyValue('hidden');
        },
        set: function (value) {
            this.setPropertyValue('hidden', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontFamilyFarEast", {
        get: function () {
            return this.getPropertyValue('fontFamilyFarEast');
        },
        set: function (value) {
            this.setPropertyValue('fontFamilyFarEast', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontFamilyAscii", {
        get: function () {
            return this.getPropertyValue('fontFamilyAscii');
        },
        set: function (value) {
            this.setPropertyValue('fontFamilyAscii', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WCharacterFormat.prototype, "fontFamilyNonFarEast", {
        get: function () {
            return this.getPropertyValue('fontFamilyNonFarEast');
        },
        set: function (value) {
            this.setPropertyValue('fontFamilyNonFarEast', value);
        },
        enumerable: true,
        configurable: true
    });
    WCharacterFormat.prototype.getPropertyValue = function (property) {
        if (!this.hasValue(property)) {
            var charStyleValue = this.checkCharacterStyle(property);
            if (!isNullOrUndefined(charStyleValue)) {
                return charStyleValue;
            }
            else {
                if (!isNullOrUndefined(this.baseCharStyle)) {
                    var paragraph = undefined;
                    var line = undefined;
                    if (!isNullOrUndefined(this.ownerBase)) {
                        paragraph = this.ownerBase.paragraph;
                        line = this.ownerBase.line;
                    }
                    if (!isNullOrUndefined(paragraph) && !isNullOrUndefined(line)) {
                        var length_1 = line.children.length;
                        for (var i = 0; i < length_1; i++) {
                            var element = this.ownerBase.line.children[i];
                            if (element instanceof TextElementBox) {
                                var text = element.text;
                                if (text.startsWith('HYPERLINK')) {
                                    var index = text.indexOf('_Toc');
                                    if (index !== -1) {
                                        this.baseCharStyle = this.ownerBase.paragraph.paragraphFormat.baseStyle;
                                    }
                                }
                            }
                        }
                    }
                }
                var baseStyleValue = this.checkBaseStyle(property);
                if (!isNullOrUndefined(baseStyleValue)) {
                    return baseStyleValue;
                }
            }
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(WCharacterFormat.uniqueFormatType, property);
            if (!isNullOrUndefined(this.uniqueCharacterFormat) && this.uniqueCharacterFormat.propertiesHash.containsKey(propertyType)) {
                return this.uniqueCharacterFormat.propertiesHash.get(propertyType);
            }
        }
        return this.getDefaultValue(property);
    };
    WCharacterFormat.prototype.getDefaultValue = function (property) {
        var propertyType = WUniqueFormat.getPropertyType(WCharacterFormat.uniqueFormatType, property);
        var docCharacterFormat = this.documentCharacterFormat();
        if (!isNullOrUndefined(docCharacterFormat) && !isNullOrUndefined(docCharacterFormat.uniqueCharacterFormat) && docCharacterFormat.uniqueCharacterFormat.propertiesHash.containsKey(propertyType)) {
            return docCharacterFormat.uniqueCharacterFormat.propertiesHash.get(propertyType);
        }
        else {
            return WCharacterFormat.getPropertyDefaultValue(property);
        }
    };
    WCharacterFormat.prototype.documentCharacterFormat = function () {
        if (isNullOrUndefined(this.ownerBase)) {
            return undefined;
        }
        var paragraph;
        if (this.ownerBase instanceof ElementBox) {
            paragraph = this.ownerBase.paragraph;
        }
        else if (this.ownerBase instanceof ParagraphWidget) {
            paragraph = this.ownerBase;
        }
        if (paragraph) {
            var bodyWidget = paragraph.bodyWidget;
            if (bodyWidget && bodyWidget.page && bodyWidget.page.documentHelper) {
                return bodyWidget.page.documentHelper.characterFormat;
            }
        }
        return undefined;
    };
    WCharacterFormat.prototype.checkBaseStyle = function (property) {
        var baseStyle;
        if (!isNullOrUndefined(this.ownerBase)) {
            if (!isNullOrUndefined(this.ownerBase.paragraph)) {
                baseStyle = this.ownerBase.paragraph.paragraphFormat.baseStyle;
            }
            else {
                if ((this.ownerBase instanceof ParagraphWidget) && !isNullOrUndefined(this.ownerBase.paragraphFormat)) {
                    baseStyle = this.ownerBase.paragraphFormat.baseStyle;
                }
                else {
                    if (!isNullOrUndefined(this.ownerBase instanceof WParagraphStyle)) {
                        baseStyle = this.ownerBase.basedOn;
                    }
                }
            }
        }
        while (!isNullOrUndefined(baseStyle)) {
            if (baseStyle.characterFormat.hasValue(property)) {
                break;
            }
            else if (!isNullOrUndefined(baseStyle.link) && isNullOrUndefined(baseStyle.basedOn) && baseStyle.link.type == 'Character' && baseStyle.link.characterFormat.hasValue(property) && baseStyle.name != "Normal") {
                baseStyle = baseStyle.link;
                break;
            }
            else {
                baseStyle = baseStyle.basedOn;
            }
        }
        if (!isNullOrUndefined(baseStyle)) {
            var propertyType = WUniqueFormat.getPropertyType(WCharacterFormat.uniqueFormatType, property);
            return baseStyle.characterFormat.uniqueCharacterFormat.propertiesHash.get(propertyType);
        }
        return undefined;
    };
    WCharacterFormat.prototype.checkCharacterStyle = function (property) {
        var baseStyle = this.baseCharStyle;
        if (!isNullOrUndefined(baseStyle)) {
            while (!isNullOrUndefined(baseStyle) && baseStyle.name !== 'Default Paragraph Font') {
                var hasKey = baseStyle.characterFormat.hasValue(property);
                if (hasKey) {
                    if (property === 'bold' && !isNullOrUndefined(this.ownerBase) && this.ownerBase instanceof TextElementBox && !isNullOrUndefined(this.ownerBase.paragraph) &&
                        !isNullOrUndefined(this.ownerBase.paragraph.paragraphFormat.baseStyle) && this.ownerBase.paragraph.paragraphFormat.baseStyle instanceof WParagraphStyle &&
                        this.ownerBase.paragraph.paragraphFormat.baseStyle.characterFormat && baseStyle.name !== this.ownerBase.paragraph.paragraphFormat.baseStyle.name &&
                        baseStyle.characterFormat.hasValue(property) === this.ownerBase.paragraph.paragraphFormat.baseStyle.characterFormat.hasValue(property)) {
                        return this.hasValue(property);
                    }
                    var returnPropertyType = WUniqueFormat.getPropertyType(WCharacterFormat.uniqueFormatType, property);
                    return baseStyle.characterFormat.uniqueCharacterFormat.propertiesHash.get(returnPropertyType);
                }
                else {
                    baseStyle = baseStyle.basedOn;
                }
            }
        }
        return undefined;
    };
    WCharacterFormat.prototype.setPropertyValue = function (property, value) {
        if (isNullOrUndefined(value) || value === '') {
            value = WCharacterFormat.getPropertyDefaultValue(property);
        }
        if (isNullOrUndefined(this.uniqueCharacterFormat)
            || (isNullOrUndefined(this.uniqueCharacterFormat.propertiesHash)
                && isNullOrUndefined(this.uniqueCharacterFormat.uniqueFormatType)
                && isNullOrUndefined(this.uniqueCharacterFormat.referenceCount))) {
            this.initializeUniqueCharacterFormat(property, value);
        }
        else {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueCharacterFormat.uniqueFormatType, property);
            if (this.uniqueCharacterFormat.propertiesHash.containsKey(propertyType) &&
                this.uniqueCharacterFormat.propertiesHash.get(propertyType) === value) { //Do nothing, since no change in property value and return
                return;
            }
            this.uniqueCharacterFormat = WCharacterFormat.uniqueCharacterFormats.updateUniqueFormat(this.uniqueCharacterFormat, property, value);
        }
    };
    WCharacterFormat.prototype.initializeUniqueCharacterFormat = function (property, propValue) {
        var uniqueCharFormatTemp = new Dictionary();
        this.addUniqueCharacterFormat('fontColor', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontFamily', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontSize', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('bold', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('italic', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('underline', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('underlineColor', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontHintType', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('strikethrough', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('baselineAlignment', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('highlightColor', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('styleName', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('bidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('bdo', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontFamilyBidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontSizeBidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('boldBidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('italicBidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('allCaps', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('Uppercase', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('Lowercase', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('SentenceCase', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('ToggleCase', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('CapitalizeEachWord', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('localeIdAscii', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('localeIdFarEast', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('localeIdBidi', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontFamilyFarEast', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontFamilyAscii', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('fontFamilyNonFarEast', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('complexScript', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('characterSpacing', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('scaling', property, propValue, uniqueCharFormatTemp);
        this.addUniqueCharacterFormat('hidden', property, propValue, uniqueCharFormatTemp);
        this.uniqueCharacterFormat = WCharacterFormat.uniqueCharacterFormats.addUniqueFormat(uniqueCharFormatTemp, WCharacterFormat.uniqueFormatType);
    };
    WCharacterFormat.prototype.addUniqueCharacterFormat = function (property, modifiedProperty, propValue, uniqueCharFormatTemp) {
        var propertyType = WUniqueFormat.getPropertyType(WCharacterFormat.uniqueFormatType, property);
        if (property === modifiedProperty) {
            uniqueCharFormatTemp.add(propertyType, propValue);
        }
    };
    WCharacterFormat.getPropertyDefaultValue = function (property) {
        var value = undefined;
        switch (property) {
            case 'bold':
                value = false;
                break;
            case 'italic':
                value = false;
                break;
            case 'fontSize':
                value = 11;
                break;
            case 'underline':
                value = 'None';
                break;
            case 'underlineColor':
                value = undefined;
                break;
            case 'fontHintType':
                value = 'Default';
                break;
            case 'strikethrough':
                value = 'None';
                break;
            case 'baselineAlignment':
                value = 'Normal';
                break;
            case 'highlightColor':
                value = 'NoColor';
                break;
            case 'fontColor':
                value = '#00000000';
                break;
            case 'fontFamily':
                value = 'Calibri';
                break;
            case 'styleName':
                value = 'Default Paragraph Font';
                break;
            case 'bidi':
                value = false;
                break;
            case 'bdo':
                value = 'None';
                break;
            case 'boldBidi':
                value = false;
                break;
            case 'italicBidi':
                value = false;
                break;
            case 'fontSizeBidi':
                value = 11;
                break;
            case 'fontFamilyBidi':
                value = 'Calibri';
                break;
            case 'allCaps':
            case 'Uppercase':
            case 'Lowercase':
            case 'CapitalizeEachWord':
            case 'SentenceCase':
            case 'ToggleCase':
                value = false;
                break;
            case 'localeIdAscii':
            case 'localeIdFarEast':
            case 'localeIdBidi':
                value = 0;
                break;
            case 'complexScript':
                value = false;
                break;
            case 'hidden':
                value = false;
                break;
            case 'fontFamilyFarEast':
            case 'fontFamilyAscii':
            case 'fontFamilyNonFarEast':
                value = undefined;
                break;
            case 'characterSpacing':
                value = 0;
                break;
            case 'scaling':
                value = 100;
                break;
        }
        return value;
    };
    WCharacterFormat.prototype.isEqualFormat = function (format) {
        return (this.fontSize === format.fontSize
            && this.fontFamily === format.fontFamily
            && this.bold === format.bold
            && this.italic === format.italic
            && this.baselineAlignment === format.baselineAlignment
            && this.underline === format.underline
            && this.fontColor === format.fontColor
            && this.strikethrough === format.strikethrough
            && this.highlightColor === format.highlightColor && this.bidi === format.bidi
            && this.bdo === format.bdo
            && this.allCaps === format.allCaps
            && this.Uppercase === format.Uppercase
            && this.Lowercase === format.Lowercase
            && this.ToggleCase === format.ToggleCase
            && this.SentenceCase === format.SentenceCase
            && this.CapitalizeEachWord === format.CapitalizeEachWord
            && this.localeIdBidi === format.localeIdBidi
            && this.localeIdAscii === format.localeIdAscii
            && this.localeIdFarEast === format.localeIdFarEast
            && this.complexScript === format.complexScript
            && this.fontFamilyAscii === format.fontFamilyAscii
            && this.fontFamilyBidi === format.fontFamilyBidi
            && this.fontFamilyFarEast === format.fontFamilyFarEast
            && this.characterSpacing === format.characterSpacing
            && this.scaling === format.scaling
            && this.fontFamilyNonFarEast === format.fontFamilyNonFarEast
            && this.hidden === format.hidden);
    };
    WCharacterFormat.prototype.isSameFormat = function (format) {
        return this.baseCharStyle === format.baseCharStyle &&
            this.uniqueCharacterFormat === format.uniqueCharacterFormat;
    };
    WCharacterFormat.prototype.cloneFormat = function () {
        var format = new WCharacterFormat(undefined);
        format.uniqueCharacterFormat = this.uniqueCharacterFormat;
        format.baseCharStyle = this.baseCharStyle;
        if (this.revisions.length > 0) {
            format.removedIds = Revision.cloneRevisions(this.revisions);
        }
        else {
            format.removedIds = this.removedIds.slice();
        }
        return format;
    };
    WCharacterFormat.prototype.hasValue = function (property) {
        if (!isNullOrUndefined(this.uniqueCharacterFormat) && !isNullOrUndefined(this.uniqueCharacterFormat.propertiesHash)) {
            var propertyType = WUniqueFormat.getPropertyType(this.uniqueCharacterFormat.uniqueFormatType, property);
            return this.uniqueCharacterFormat.propertiesHash.containsKey(propertyType);
        }
        return false;
    };
    WCharacterFormat.prototype.clearFormat = function () {
        if (!isNullOrUndefined(this.uniqueCharacterFormat) && this.uniqueCharacterFormat.referenceCount === 0) {
            WCharacterFormat.uniqueCharacterFormats.remove(this.uniqueCharacterFormat);
        }
        this.uniqueCharacterFormat = undefined;
        this.baseCharStyle = undefined;
    };
    WCharacterFormat.prototype.destroy = function () {
        if (!isNullOrUndefined(this.uniqueCharacterFormat)) {
            WCharacterFormat.uniqueCharacterFormats.remove(this.uniqueCharacterFormat);
        }
        this.uniqueCharacterFormat = undefined;
        this.baseCharStyle = undefined;
        this.ownerBase = undefined;
    };
    WCharacterFormat.prototype.copyFormat = function (format) {
        if (!isNullOrUndefined(format)) {
            if (!isNullOrUndefined(format.uniqueCharacterFormat) && format.uniqueCharacterFormat.propertiesHash) {
                this.updateUniqueCharacterFormat(format);
            }
            if (!isNullOrUndefined(format.baseCharStyle)) {
                this.baseCharStyle = format.baseCharStyle;
            }
            if (format.revisions.length > 0) {
                this.removedIds = Revision.cloneRevisions(format.revisions);
            }
            else {
                this.removedIds = format.removedIds.slice();
            }
        }
    };
    WCharacterFormat.prototype.isEqualTocFormat = function (format) {
        return (this.fontFamily === format.fontFamily
            && this.bold === format.bold
            && this.italic === format.italic
            && this.strikethrough === format.strikethrough
            && this.highlightColor === format.highlightColor
            && this.fontFamilyAscii === format.fontFamilyAscii
            && this.fontFamilyFarEast === format.fontFamilyFarEast
            && this.fontFamilyNonFarEast === format.fontFamilyNonFarEast);
    };
    WCharacterFormat.prototype.copyTocFormat = function (format) {
        if (!isNullOrUndefined(format.bold)) {
            this.bold = format.bold;
        }
        if (!isNullOrUndefined(format.italic)) {
            this.italic = format.italic;
        }
        if (!isNullOrUndefined(format.strikethrough)) {
            this.strikethrough = format.strikethrough;
        }
        if (!isNullOrUndefined(format.highlightColor)) {
            this.highlightColor = format.highlightColor;
        }
        if (!isNullOrUndefined(format.fontFamily)) {
            this.fontFamily = format.fontFamily;
            this.fontFamilyAscii = format.fontFamily;
            this.fontFamilyFarEast = format.fontFamily;
            this.fontFamilyNonFarEast = format.fontFamily;
        }
    };
    WCharacterFormat.prototype.updateUniqueCharacterFormat = function (format) {
        var hash = undefined;
        if (this.uniqueCharacterFormat) {
            hash = this.uniqueCharacterFormat.mergeProperties(format.uniqueCharacterFormat);
            if (this.uniqueCharacterFormat.referenceCount === 0) {
                WCharacterFormat.uniqueCharacterFormats.remove(this.uniqueCharacterFormat);
                this.uniqueCharacterFormat = undefined;
            }
        }
        this.uniqueCharacterFormat = new WUniqueFormat(WCharacterFormat.uniqueFormatType);
        if (isNullOrUndefined(hash)) {
            hash = this.uniqueCharacterFormat.mergeProperties(format.uniqueCharacterFormat);
        }
        this.uniqueCharacterFormat = WCharacterFormat.uniqueCharacterFormats.addUniqueFormat(hash, WCharacterFormat.uniqueFormatType);
    };
    WCharacterFormat.clear = function () {
        this.uniqueCharacterFormats.clear();
    };
    WCharacterFormat.prototype.applyStyle = function (baseCharStyle) {
        this.baseCharStyle = baseCharStyle;
    };
    WCharacterFormat.prototype.getValue = function (property) {
        return this.hasValue(property) ? this.getPropertyValue(property) : undefined;
    };
    WCharacterFormat.prototype.mergeFormat = function (format) {
        if (isNullOrUndefined(this.getValue('bold'))) {
            this.bold = format.getValue('bold');
        }
        if (isNullOrUndefined(this.getValue('italic'))) {
            this.italic = format.getValue('italic');
        }
        if (isNullOrUndefined(this.getValue('fontSize'))) {
            this.fontSize = format.getValue('fontSize');
        }
        if (isNullOrUndefined(this.getValue('boldBidi'))) {
            this.boldBidi = format.getValue('boldBidi');
        }
        if (isNullOrUndefined(this.getValue('italicBidi'))) {
            this.italicBidi = format.getValue('italicBidi');
        }
        if (isNullOrUndefined(this.getValue('fontSizeBidi'))) {
            this.fontSizeBidi = format.getValue('fontSizeBidi');
        }
        if (isNullOrUndefined(this.getValue('characterSpacing'))) {
            this.characterSpacing = format.getValue('characterSpacing');
        }
        if (isNullOrUndefined(this.getValue('scaling'))) {
            this.scaling = format.getValue('scaling');
        }
        if (isNullOrUndefined(this.getValue('fontFamily'))) {
            this.fontFamily = format.getValue('fontFamily');
        }
        else {
            if (isNullOrUndefined(this.getValue('fontFamilyAscii'))) {
                this.fontFamilyAscii = format.getValue('fontFamily');
            }
            if (isNullOrUndefined(this.getValue('fontFamilyFarEast'))) {
                this.fontFamilyFarEast = format.getValue('fontFamily');
            }
            if (isNullOrUndefined(this.getValue('fontFamilyNonFarEast'))) {
                this.fontFamilyNonFarEast = format.getValue('fontFamily');
            }
        }
        if (isNullOrUndefined(this.getValue('underline'))) {
            this.underline = format.getValue('underline');
        }
        if (isNullOrUndefined(this.getValue('fontHintType'))) {
            this.fontHintType = format.getValue('fontHintType');
        }
        if (isNullOrUndefined(this.getValue('strikethrough'))) {
            this.strikethrough = format.getValue('strikethrough');
        }
        if (isNullOrUndefined(this.getValue('baselineAlignment'))) {
            this.baselineAlignment = format.getValue('baselineAlignment');
        }
        if (isNullOrUndefined(this.getValue('highlightColor'))) {
            this.highlightColor = format.getValue('highlightColor');
        }
        if (isNullOrUndefined(this.getValue('fontColor'))) {
            this.fontColor = format.getValue('fontColor');
        }
        if (isNullOrUndefined(this.getValue('bidi'))) {
            this.bidi = format.getValue('bidi');
        }
        if (isNullOrUndefined(this.getValue('bdo'))) {
            this.bdo = format.getValue('bdo');
        }
        if (isNullOrUndefined(this.getValue('allCaps'))) {
            this.allCaps = format.getValue('allCaps');
        }
        if (isNullOrUndefined(this.getValue('Lowercase'))) {
            this.Lowercase = format.getValue('Lowercase');
        }
        if (isNullOrUndefined(this.getValue('SentenceCase'))) {
            this.SentenceCase = format.getValue('SentenceCase');
        }
        if (isNullOrUndefined(this.getValue('ToggleCase'))) {
            this.ToggleCase = format.getValue('ToggleCase');
        }
        if (isNullOrUndefined(this.getValue('CapitalizeEachWord'))) {
            this.CapitalizeEachWord = format.getValue('CapitalizeEachWord');
        }
        if (isNullOrUndefined(this.getValue('Uppercase'))) {
            this.Uppercase = format.getValue('Uppercase');
        }
        if (isNullOrUndefined(this.getValue('localeIdBidi'))) {
            this.localeIdBidi = format.getValue('localeIdBidi');
        }
        if (isNullOrUndefined(this.getValue('localeIdAscii'))) {
            this.localeIdAscii = format.getValue('localeIdAscii');
        }
        if (isNullOrUndefined(this.getValue('localeIdFarEast'))) {
            this.localeIdFarEast = format.getValue('localeIdFarEast');
        }
        if (isNullOrUndefined(this.getValue('complexScript'))) {
            this.complexScript = format.getValue('complexScript');
        }
        if (isNullOrUndefined(this.getValue('fontFamilyAscii'))) {
            this.fontFamilyAscii = format.getValue('fontFamilyAscii');
        }
        if (isNullOrUndefined(this.getValue('fontFamilyBidi'))) {
            this.fontFamilyBidi = format.getValue('fontFamilyBidi');
        }
        if (isNullOrUndefined(this.getValue('fontFamilyFarEast'))) {
            this.fontFamilyFarEast = format.getValue('fontFamilyFarEast');
        }
        if (isNullOrUndefined(this.getValue('fontFamilyNonFarEast'))) {
            this.fontFamilyNonFarEast = format.getValue('fontFamilyNonFarEast');
        }
    };
    /**
     * Assinging the value for style dialog
     * @private
     * @returns {void}
     */
    WCharacterFormat.prototype.assignFormat = function (format) {
        if (format.hasValue('bold')) {
            this.bold = format.getValue('bold');
        }
        if (format.hasValue('italic')) {
            this.italic = format.getValue('italic');
        }
        if (format.hasValue('fontSize')) {
            this.fontSize = format.getValue('fontSize');
        }
        if (format.hasValue('characterSpacing')) {
            this.characterSpacing = format.getValue('characterSpacing');
        }
        if (format.hasValue('scaling')) {
            this.scaling = format.getValue('scaling');
        }
        if (format.hasValue('fontFamily')) {
            this.fontFamily = format.getValue('fontFamily');
            this.fontFamilyFarEast = format.getValue('fontFamily');
            this.fontFamilyAscii = format.getValue('fontFamily');
            this.fontFamilyNonFarEast = format.getValue('fontFamily');
            this.fontFamilyBidi = format.getValue('fontFamily');
        }
        if (format.hasValue('underline')) {
            this.underline = format.getValue('underline');
        }
        if (format.hasValue('fontHintType')) {
            this.fontHintType = format.getValue('fontHintType');
        }
        if (format.hasValue('strikethrough')) {
            this.strikethrough = format.getValue('strikethrough');
        }
        if (format.hasValue('baselineAlignment')) {
            this.baselineAlignment = format.getValue('baselineAlignment');
        }
        if (format.hasValue('highlightColor')) {
            this.highlightColor = format.getValue('highlightColor');
        }
        if (format.hasValue('fontColor')) {
            this.fontColor = format.getValue('fontColor');
        }
        if (format.hasValue('bidi')) {
            this.bidi = format.getValue('bidi');
        }
        if (format.hasValue('bdo')) {
            this.bdo = format.getValue('bdo');
        }
        if (format.hasValue('allCaps')) {
            this.allCaps = format.getValue('allCaps');
        }
        if (format.hasValue('Lowercase')) {
            this.Lowercase = format.getValue('Lowercase');
        }
        if (format.hasValue('SentenceCase')) {
            this.SentenceCase = format.getValue('SentenceCase');
        }
        if (format.hasValue('ToggleCase')) {
            this.ToggleCase = format.getValue('ToggleCase');
        }
        if (format.hasValue('CapitalizeEachWord')) {
            this.CapitalizeEachWord = format.getValue('CapitalizeEachWord');
        }
        if (format.hasValue('Uppercase')) {
            this.Uppercase = format.getValue('Uppercase');
        }
        if (format.hasValue('localeIdBidi')) {
            this.localeIdBidi = format.getValue('localeIdBidi');
        }
        if (format.hasValue('localeIdAscii')) {
            this.localeIdAscii = format.getValue('localeIdAscii');
        }
        if (format.hasValue('localeIdFarEast')) {
            this.localeIdFarEast = format.getValue('localeIdFarEast');
        }
        if (format.hasValue('complexScript')) {
            this.complexScript = format.getValue('complexScript');
        }
    };
    WCharacterFormat.prototype.hasValueWithParent = function (property) {
        // 2.1 Define direct VALUE
        var hasValue = this.hasValue(property);
        // 2.2 If SELF VALUE is NULL get BASE VALUE
        // if (!hasValue && this.BaseFormat != null && this.BaseFormat is WCharacterFormat)
        //     hasValue = (this.BaseFormat as WCharacterFormat).HasValueWithParent(propertyKey);
        // 2.3 If VALUE not in hash, get CharStyle VALUE
        if (!hasValue && !isNullOrUndefined(this.baseCharStyle) && this.baseCharStyle instanceof WCharacterStyle) {
            hasValue = this.baseCharStyle.characterFormat.hasValue(property);
        }
        // 3. If VALUE is NULL get DEFAULT VALUE
        var defFormat = this.documentCharacterFormat();
        if (!hasValue && !isNullOrUndefined(defFormat)) {
            hasValue = defFormat.hasValue(property);
        }
        return hasValue;
    };
    WCharacterFormat.uniqueCharacterFormats = new WUniqueFormats();
    WCharacterFormat.uniqueFormatType = 2;
    return WCharacterFormat;
}());
export { WCharacterFormat };
