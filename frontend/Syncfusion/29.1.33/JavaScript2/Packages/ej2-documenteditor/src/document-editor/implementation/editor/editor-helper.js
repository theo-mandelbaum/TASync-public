import { isNullOrUndefined, Internationalization, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { ZipArchive } from '@syncfusion/ej2-compression';
import { ElementBox, TextElementBox } from '../viewer/page';
import { FieldElementBox } from '../viewer/page';
import { boldProperty, italicProperty, fontSizeProperty, fontFamilyProperty, underlineProperty, underlineColorProperty, fontHintTypeProperty, strikethroughProperty, baselineAlignmentProperty, highlightColorProperty, fontColorProperty, styleNameProperty, bidiProperty, bdoProperty, boldBidiProperty, italicBidiProperty, fontSizeBidiProperty, fontFamilyBidiProperty, allCapsProperty, localeIdBidiProperty, localeIdProperty, complexScriptProperty, fontFamilyAsciiProperty, characterSpacingProperty, scalingProperty, hiddenProperty, fontFamilyFarEastProperty, fontFamilyNonFarEastProperty, bordersProperty, leftIndentProperty, rightIndentProperty, firstLineIndentProperty, textAlignmentProperty, beforeSpacingProperty, afterSpacingProperty, spaceBeforeAutoProperty, spaceAfterAutoProperty, lineSpacingProperty, lineSpacingTypeProperty, outlineLevelProperty, keepLinesTogetherProperty, keepWithNextProperty, contextualSpacingProperty, widowControlProperty, topProperty, leftProperty, rightProperty, bottomProperty, horizontalProperty, verticalProperty, colorProperty, hasNoneStyleProperty, lineStyleProperty, lineWidthProperty, shadowProperty, spaceProperty, inlinesProperty, characterFormatProperty, textProperty, fieldTypeProperty, hasFieldEndProperty, localeIdFarEastProperty } from '../../index';
/**
 * @private
 */
var HelperMethods = /** @class */ (function () {
    function HelperMethods() {
    }
    /**
     * Inserts text at specified index in string.
     *
     * @private
     * @param {string} spanText - Specifies the span text.
     * @param {number} index - Specifies the index
     * @param {string} text - Specifies the text
     * @returns {string} - Returns modified string
     */
    HelperMethods.insert = function (spanText, index, text) {
        if (index >= 0) {
            return [spanText.slice(0, index) + text + spanText.slice(index)].join('');
        }
        else {
            return text + this;
        }
    };
    /**
     * @returns {string} returns a string value
     * @param {string} text takes string as parameter
     * @private
     */
    HelperMethods.replaceSpecialChars = function (text) {
        text = text.replace('^[\\s]*', '');
        /* eslint-disable quotes */
        text = text.replace("^[#@!~\\$%^&\\*\\(\\)\\-_\\+\\.=\\{\\}\\[\\]:;,<>\\?'\\\\\"\\“\\”\\//0123456789]+", '');
        text = text.replace("[#@!~\\$%^&\\*\\(\\)\\-_\\+\\.=\\{\\}\\[\\]:;,<>\\?'\\\\\"\\“\\”\\//0123456789]+$", '');
        /* eslint-enable quotes */
        return text;
    };
    /**
     * @returns {any} returns any type
     * @param {string} text gets string as a input
     * @public
     */
    HelperMethods.getSpellCheckData = function (text) {
        text = text.replace('\r\n', ' ');
        text = text.replace('\n', ' ');
        text = text.replace('\r', ' ');
        text = text.replace('\v', ' ');
        text = text.replace('\t', ' ');
        text = text.replace('/', ' ');
        text = text.replace(String.fromCharCode(160), ' ');
        var stringarr = text.split(' ');
        var spellColl = [];
        for (var _i = 0, stringarr_1 = stringarr; _i < stringarr_1.length; _i++) {
            var str = stringarr_1[_i];
            var spellInfo = {};
            spellInfo.Text = this.replaceSpecialChars(str);
            spellInfo.HasSpellError = false;
            spellColl.push(spellInfo);
        }
        return spellColl;
    };
    /**
     * Check given string is a valid either roman or arabic number
     * @private
     * @param {string} input input string value to check if it is a number
     * @returns {boolean} weather given string is a number or not
     */
    HelperMethods.checkTextFormat = function (input) {
        // Regular expression patterns for Roman and Arabic numerals
        var romanPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
        var arabicPattern = /^[0-9]+$/;
        // Check if the input matches either pattern
        if (romanPattern.test(input) || arabicPattern.test(input)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @returns {string}
     * Sanitize the string for xss string content
     * @param {string} value accepts a string value
     * @public
     */
    HelperMethods.sanitizeString = function (value) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        var sanitizedContent = SanitizeHtmlHelper.sanitize(value)
            .replace(/&amp;/g, '&')
            .replace(/&nbsp;/g, String.fromCharCode(160))
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<');
        return sanitizedContent;
    };
    /**
     * @returns {any} returns any type
     * Get the SFDT document from the optimized SFDT.
     * @param {any} json accepts a json file
     * @public
     */
    HelperMethods.getSfdtDocument = function (json) {
        json = (json instanceof Object) ? json : JSON.parse(json);
        if (!isNullOrUndefined(json.sfdt)) {
            var zipArchive = new ZipArchive();
            zipArchive.open(JSON.stringify(json.sfdt));
            var zipItem = zipArchive.items[0];
            var value = new Uint8Array(zipItem.data);
            var str = new TextDecoder('utf-8').decode(value);
            json = JSON.parse(str);
        }
        // json = JSON.parse(this.sanitizeString(JSON.stringify(json)));
        return json;
    };
    /**
     * @returns {number}
     * Generates a unique unique hexadecimal ID.
     * @param {WList[]} lists accepts list
     * @param {WAbstractList[]} abstractLists accepts array of abstractList
     * @public
     */
    HelperMethods.generateUniqueId = function (lists, abstractLists) {
        var isAbstractList = !isNullOrUndefined(abstractLists) ? true : false;
        var randomNumber = Math.floor(Math.random() * 100000000);
        if (isAbstractList) {
            return this.isSameListIDExists(randomNumber, undefined, abstractLists, isAbstractList) ?
                this.generateUniqueId(undefined, abstractLists) : randomNumber;
        }
        else {
            return this.isSameListIDExists(randomNumber, lists) ? this.generateUniqueId(lists) : randomNumber;
        }
    };
    /**
     * @private
     * @returns {string} returns a string value
     */
    HelperMethods.generateHexDecimal = function () {
        return (Math.floor(Math.random() * (4000000000 - 270000000)) + 270000000).toString(16).toUpperCase();
    };
    /**
     * @private
     * @param {number} id id need to be converted
     * @returns {string} returns a string value
     */
    HelperMethods.numberToHexDecimal = function (id) {
        return (id >>> 0).toString(16).toUpperCase();
    };
    /**
     * @returns {boolean} returns a boolean value
     * @param {number} nsid accepts number as a parameter
     * @param {WList[]} lists accepts an array of type WList
     * @param {WAbstractList[]} abstractLists accepts an array of type WAbstractList
     * @param {boolean} isAbstractList accepts a boolean value
     * @private
     */
    HelperMethods.isSameListIDExists = function (nsid, lists, abstractLists, isAbstractList) {
        if (isAbstractList) {
            for (var i = 0; i < abstractLists.length; i++) {
                var abstractList = abstractLists[parseInt(i.toString(), 10)];
                if (nsid === abstractList.nsid) {
                    return true;
                }
            }
        }
        else {
            for (var j = 0; j < lists.length; j++) {
                var list = lists[parseInt(j.toString(), 10)];
                if (nsid === list.nsid) {
                    return true;
                }
            }
        }
        return false;
    };
    /* eslint-enable */
    /**
     * Removes text from specified index in string.
     *
     * @private
     * @param {string} text - Specifies the text
     * @param {number} index - Specifies the index
     * @returns {string} - Returns modified string
     */
    HelperMethods.remove = function (text, index) {
        if (index === 0) {
            return text.substring(index + 1, text.length);
        }
        else {
            return text.substring(0, index) + text.substring(index + 1, text.length);
        }
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    HelperMethods.indexOfAny = function (text, wordSplitCharacter) {
        var index = undefined;
        for (var j = 0; j < wordSplitCharacter.length; j++) {
            var temp = text.indexOf(wordSplitCharacter[parseInt(j.toString(), 10)]);
            if (temp !== -1 && isNullOrUndefined(index)) {
                index = temp;
            }
            else if (temp !== -1 && temp < index) {
                index = temp;
            }
        }
        return isNullOrUndefined(index) ? -1 : index;
    };
    HelperMethods.lastIndexOfAny = function (text, wordSplitCharacter) {
        for (var i = text.length - 1; i >= 0; i--) {
            for (var j = 0; j <= wordSplitCharacter.length - 1; j++) {
                if (text[parseInt(i.toString(), 10)] === wordSplitCharacter[parseInt(j.toString(), 10)]) {
                    return i;
                }
            }
        }
        return -1;
    };
    /**
     * Convert ARGB to RGB
     * @private
     * @param {string} color accepts a color string
     * @returns {string} returns a string value
     */
    HelperMethods.convertArgbToRgb = function (color) {
        if (color.length >= 8) {
            return color.substr(0, 6);
        }
        return color;
    };
    HelperMethods.convertRgbToHex = function (val) {
        var hex = Number(val).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    };
    // public static convertPointsToCentimetre(val: number): number {
    //     return val/28.34644;
    // }
    // public static convertCentimetreToPoints(val: number): number {
    //     return val*28.34644;
    // }
    /**
     * @returns {number} returns a number
     * @param {string} input accepts a string value as an input
     * @private
     */
    HelperMethods.getNumberFromString = function (input) {
        var numbers = [];
        var currentNumber = '';
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            if (/\d|\./.test(char)) {
                currentNumber += char;
            }
            else if (currentNumber) {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
        }
        if (currentNumber) {
            numbers.push(parseFloat(currentNumber));
        }
        return parseFloat(numbers.join(''));
    };
    HelperMethods.convertHexToRgb = function (colorCode) {
        var r;
        var g;
        var b;
        if (colorCode) {
            colorCode = colorCode.replace(/[^0-9A-â€Œâ€‹F]/gi, ''); // To remove # from color code string.
            var colCodeNo = parseInt(colorCode, 16);
            if (colorCode.length === 8) {
                r = (colCodeNo >> 32) & 255;
                g = (colCodeNo >> 16) & 255;
                b = (colCodeNo >> 8) & 255;
            }
            else if (colorCode.length === 6) {
                r = (colCodeNo >> 16) & 255;
                g = (colCodeNo >> 8) & 255;
                b = colCodeNo & 255;
            }
            return { 'r': r, 'g': g, 'b': b };
        }
        return undefined;
    };
    HelperMethods.addCssStyle = function (css) {
        var style = document.createElement('style');
        if (style.style.cssText) {
            style.style.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    /**
     * @returns {HTMLElement[]} returns an array of HTML elements
     * @param {NodeListOf<HTMLElement>} nodeList accepts a list of HTML elements
     * @public
     */
    HelperMethods.convertNodeListToArray = function (nodeList) {
        var array = [];
        if (!isNullOrUndefined(nodeList)) {
            for (var i = 0; i < nodeList.length; i++) {
                array.push(nodeList[parseInt(i.toString(), 10)]);
            }
        }
        return array;
    };
    HelperMethods.getHighlightColorCode = function (highlightColor) {
        var color = '#ffffff';
        switch (highlightColor) {
            case 'Yellow':
                color = '#ffff00';
                break;
            case 'BrightGreen':
                color = '#00ff00';
                break;
            case 'Turquoise':
                color = '#00ffff';
                break;
            case 'Pink':
                color = '#ff00ff';
                break;
            case 'Blue':
                color = '#0000ff';
                break;
            case 'Red':
                color = '#ff0000';
                break;
            case 'DarkBlue':
                color = '#000080';
                break;
            case 'Teal':
                color = '#008080';
                break;
            case 'Green':
                color = '#008000';
                break;
            case 'Violet':
                color = '#800080';
                break;
            case 'DarkRed':
                color = '#800000';
                break;
            case 'DarkYellow':
                color = '#808000';
                break;
            case 'Gray50':
                color = '#808080';
                break;
            case 'Gray25':
                color = '#c0c0c0';
                break;
            case 'Black':
                color = '#000000';
                break;
        }
        return color;
    };
    HelperMethods.isVeryDark = function (backColor) {
        var backgroundColor = backColor.substring(1);
        var r = parseInt(backgroundColor.substr(0, 2), 16);
        var g = parseInt(backgroundColor.substr(2, 2), 16);
        var b = parseInt(backgroundColor.substr(4, 2), 16);
        var contrast = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return contrast <= 60;
    };
    HelperMethods.getColor = function (color) {
        if (color.length > 0) {
            if (color[0] === '#') {
                if (color.length > 7) {
                    return color.substr(0, 7);
                }
            }
        }
        return color;
    };
    HelperMethods.getTextVerticalAlignment = function (textVerticalAlignment) {
        switch (textVerticalAlignment) {
            case 0:
                return 'Top';
            case 1:
                return 'Middle';
            case 2:
                return 'Bottom';
            default:
                return textVerticalAlignment;
        }
    };
    HelperMethods.convertPointToPixel = function (point) {
        point = HelperMethods.round(point, 5);
        var pixel = HelperMethods.round((point * 96 / 72), 5);
        return pixel;
    };
    HelperMethods.convertPixelToPoint = function (pixel) {
        var point = HelperMethods.round((pixel * 72 / 96), 5);
        return point;
    };
    HelperMethods.isLinkedFieldCharacter = function (inline) {
        if (inline instanceof FieldElementBox && inline.fieldType === 0) {
            return !isNullOrUndefined(inline.fieldEnd);
        }
        else if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            return !isNullOrUndefined(inline.fieldBegin) && !isNullOrUndefined(inline.fieldEnd);
        }
        else {
            return !isNullOrUndefined(inline.fieldBegin);
        }
    };
    /**
     * Removes white space in a string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    HelperMethods.removeSpace = function (text) {
        if (!isNullOrUndefined(text) && text.length !== 0) {
            for (var i = 0; i < text.length; i++) {
                if (text.charAt(i) === ' ') {
                    //replace the space by empty string in string
                    text = text.replace(' ', '');
                }
            }
        }
        return text;
    };
    /**
     * Trims white space at start of the string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    HelperMethods.trimStart = function (text) {
        var i = 0;
        for (i; i < text.length; i++) {
            if (text[parseInt(i.toString(), 10)] !== ' ') {
                break;
            }
        }
        return text.substring(i, text.length);
    };
    /**
     * Trims white space at end of the string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    HelperMethods.trimEnd = function (text) {
        var i = text.length - 1;
        for (i; i >= 0; i--) {
            if (text[parseInt(i.toString(), 10)] !== ' ') {
                break;
            }
        }
        return text.substring(0, i + 1);
    };
    /**
     * Checks whether string ends with whitespace.
     * @private
     * @param {string} text - Specifies the text.
     * @returns {boolean} - Returns true if text ends with specified text.
     */
    HelperMethods.endsWith = function (text) {
        if (!isNullOrUndefined(text) && text.length !== 0) {
            return text[text.length - 1] === ' ';
        }
        return false;
    };
    HelperMethods.addSpace = function (length) {
        var str = '';
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                str += ' ';
            }
        }
        return str;
    };
    HelperMethods.getBoolValue = function (value) {
        return value ? 1 : 0;
    };
    HelperMethods.getBoolInfo = function (value, keywordIndex) {
        if (keywordIndex === 1) {
            return this.getBoolValue(value);
        }
        else {
            return value;
        }
    };
    HelperMethods.parseBoolValue = function (value) {
        if (value instanceof String) {
            if (isNullOrUndefined(value) || value === 'f' || value === '0' || value === 'off' || value === 'false') {
                return false;
            }
            else {
                return true;
            }
        }
        /* eslint-disable eqeqeq */
        else {
            if (value == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /* eslint-enable eqeqeq */
    HelperMethods.getBaselineAlignmentEnumValue = function (baselineAlignment) {
        switch (baselineAlignment) {
            case 'Normal':
                return 0;
            case 'Superscript':
                return 1;
            case 'Subscript':
                return 2;
        }
    };
    HelperMethods.getFontHintTypeEnumValue = function (fontHintType) {
        switch (fontHintType) {
            case 'Default':
                return 0;
            case 'EastAsia':
                return 1;
            case 'CS':
                return 2;
        }
    };
    HelperMethods.getUnderlineEnumValue = function (underline) {
        switch (underline) {
            case 'None':
                return 0;
            case 'Single':
                return 1;
            case 'Words':
                return 2;
            case 'Double':
                return 3;
            case 'Dotted':
                return 4;
            case 'Thick':
                return 5;
            case 'Dash':
                return 6;
            case 'DashLong':
                return 7;
            case 'DotDash':
                return 8;
            case 'DotDotDash':
                return 9;
            case 'Wavy':
                return 10;
            case 'DottedHeavy':
                return 11;
            case 'DashHeavy':
                return 12;
            case 'DashLongHeavy':
                return 13;
            case 'DotDashHeavy':
                return 14;
            case 'DotDotDashHeavy':
                return 15;
            case 'WavyHeavy':
                return 16;
            case 'WavyDouble':
                return 17;
        }
    };
    /* eslint-disable */
    HelperMethods.getStrikeThroughEnumValue = function (strikethrough) {
        switch (strikethrough) {
            case 'None':
                return 0;
            case 'SingleStrike':
                return 1;
            case 'DoubleStrike':
                return 2;
        }
    };
    HelperMethods.getHighlightColorEnumValue = function (highlightColor) {
        switch (highlightColor) {
            case 'NoColor':
                return 0;
            case 'Yellow':
                return 1;
            case 'BrightGreen':
                return 2;
            case 'Turquoise':
                return 3;
            case 'Pink':
                return 4;
            case 'Blue':
                return 5;
            case 'Red':
                return 6;
            case 'DarkBlue':
                return 7;
            case 'Teal':
                return 8;
            case 'Green':
                return 9;
            case 'Violet':
                return 10;
            case 'DarkRed':
                return 11;
            case 'DarkYellow':
                return 12;
            case 'Gray50':
                return 13;
            case 'Gray25':
                return 14;
            case 'Black':
                return 15;
        }
    };
    HelperMethods.getBiDirectionalOverride = function (biDirectionalOverride) {
        switch (biDirectionalOverride) {
            case 'None':
                return 0;
            case 'LTR':
                return 1;
            case 'RTL':
                return 2;
        }
    };
    HelperMethods.getBreakClearType = function (breakClearType) {
        switch (breakClearType) {
            case 'None':
                return 0;
            case 'Left':
                return 1;
            case 'Right':
                return 2;
            case 'All':
                return 3;
        }
    };
    /* eslint-disable */
    HelperMethods.getOutlineLevelEnumValue = function (outlineLevel) {
        switch (outlineLevel) {
            case 'BodyText':
                return 0;
            case 'Level1':
                return 1;
            case 'Level2':
                return 2;
            case 'Level3':
                return 3;
            case 'Level4':
                return 4;
            case 'Level5':
                return 5;
            case 'Level6':
                return 6;
            case 'Level7':
                return 7;
            case 'Level8':
                return 8;
            case 'Level9':
                return 9;
        }
    };
    /* eslint-disable */
    HelperMethods.getTextAlignmentEnumValue = function (textAlignment) {
        switch (textAlignment) {
            case 'Left':
                return 0;
            case 'Center':
                return 1;
            case 'Right':
                return 2;
            case 'Justify':
                return 3;
        }
    };
    /* eslint-disable */
    HelperMethods.getLineStyleEnumValue = function (lineStyle) {
        switch (lineStyle) {
            case 'Single':
                return 0;
            case 'None':
                return 1;
            case 'Dot':
                return 2;
            case 'DashSmallGap':
                return 3;
            case 'DashLargeGap':
                return 4;
            case 'DashDot':
                return 5;
            case 'DashDotDot':
                return 6;
            case 'Double':
                return 7;
            case 'Triple':
                return 8;
            case 'ThinThickSmallGap':
                return 9;
            case 'ThickThinSmallGap':
                return 10;
            case 'ThinThickThinSmallGap':
                return 11;
            case 'ThinThickMediumGap':
                return 12;
            case 'ThickThinMediumGap':
                return 13;
            case 'ThinThickThinMediumGap':
                return 14;
            case 'ThinThickLargeGap':
                return 15;
            case 'ThickThinLargeGap':
                return 16;
            case 'ThinThickThinLargeGap':
                return 17;
            case 'SingleWavy':
                return 18;
            case 'DoubleWavy':
                return 19;
            case 'DashDotStroked':
                return 20;
            case 'Emboss3D':
                return 21;
            case 'Engrave3D':
                return 22;
            case 'Outset':
                return 23;
            case 'Inset':
                return 24;
            case 'Thick':
                return 25;
            case 'Cleared':
                return 26;
        }
    };
    /* eslint-disable */
    HelperMethods.getLineSpacingTypeEnumValue = function (lineSpacing) {
        switch (lineSpacing) {
            case 'Multiple':
                return 0;
            case 'AtLeast':
                return 1;
            case 'Exactly':
                return 2;
        }
    };
    /* eslint-disable */
    HelperMethods.writeBorder = function (wBorder, keywordIndex) {
        var border = {};
        border[colorProperty[keywordIndex]] = wBorder.hasValue('color') ? wBorder.color : undefined;
        border[hasNoneStyleProperty[keywordIndex]] = wBorder.hasValue('hasNoneStyle') ? HelperMethods.getBoolInfo(wBorder.hasNoneStyle, keywordIndex) : undefined;
        border[lineStyleProperty[keywordIndex]] = wBorder.hasValue('lineStyle') ?
            keywordIndex == 1 ? this.getLineStyleEnumValue(wBorder.lineStyle) : wBorder.lineStyle : undefined;
        border[lineWidthProperty[keywordIndex]] = wBorder.hasValue('lineWidth') ? wBorder.lineWidth : undefined;
        border[shadowProperty[keywordIndex]] = wBorder.hasValue('shadow') ? HelperMethods.getBoolInfo(wBorder.shadow, keywordIndex) : undefined;
        border[spaceProperty[keywordIndex]] = wBorder.hasValue('space') ? wBorder.space : undefined;
        return border;
    };
    /* eslint-disable */
    HelperMethods.writeBorders = function (wBorders, keywordIndex) {
        var borders = {};
        borders[topProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('top'), keywordIndex);
        borders[leftProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('left'), keywordIndex);
        borders[rightProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('right'), keywordIndex);
        borders[bottomProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('bottom'), keywordIndex);
        borders[horizontalProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('horizontal'), keywordIndex);
        borders[verticalProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('vertical'), keywordIndex);
        return borders;
    };
    /* eslint-disable */
    HelperMethods.writeParagraphFormat = function (paragraphFormat, isInline, format, keywordIndex) {
        keywordIndex = isNullOrUndefined(keywordIndex) ? 0 : keywordIndex;
        paragraphFormat[bordersProperty[keywordIndex]] = this.writeBorders(format.borders, keywordIndex);
        paragraphFormat[leftIndentProperty[keywordIndex]] = isInline ? format.leftIndent : format.getValue('leftIndent');
        paragraphFormat[rightIndentProperty[keywordIndex]] = isInline ? format.rightIndent : format.getValue('rightIndent');
        paragraphFormat[firstLineIndentProperty[keywordIndex]] = isInline ? format.firstLineIndent : format.getValue('firstLineIndent');
        paragraphFormat[textAlignmentProperty[keywordIndex]] = isInline ?
            keywordIndex == 1 ? this.getTextAlignmentEnumValue(format.textAlignment) : format.textAlignment :
            keywordIndex == 1 ? this.getTextAlignmentEnumValue(format.getValue('textAlignment')) : format.getValue('textAlignment');
        paragraphFormat[beforeSpacingProperty[keywordIndex]] = isInline ? format.beforeSpacing : format.getValue('beforeSpacing');
        paragraphFormat[afterSpacingProperty[keywordIndex]] = isInline ? format.afterSpacing : format.getValue('afterSpacing');
        paragraphFormat[spaceBeforeAutoProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.spaceBeforeAuto, keywordIndex) : format.getValue('spaceBeforeAuto');
        paragraphFormat[spaceAfterAutoProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.spaceAfterAuto, keywordIndex) : format.getValue('spaceAfterAuto');
        paragraphFormat[lineSpacingProperty[keywordIndex]] = isInline ? format.lineSpacing : format.getValue('lineSpacing');
        paragraphFormat[lineSpacingTypeProperty[keywordIndex]] = isInline ?
            keywordIndex == 1 ? this.getLineSpacingTypeEnumValue(format.lineSpacingType) : format.lineSpacingType :
            keywordIndex == 1 ? this.getLineSpacingTypeEnumValue(format.getValue('lineSpacingType')) : format.getValue('lineSpacingType');
        paragraphFormat[styleNameProperty[keywordIndex]] = !isNullOrUndefined(format.baseStyle) ? format.baseStyle.name : undefined;
        paragraphFormat[outlineLevelProperty[keywordIndex]] = isInline ?
            keywordIndex == 1 ? this.getOutlineLevelEnumValue(format.outlineLevel) : format.outlineLevel :
            keywordIndex == 1 ? this.getOutlineLevelEnumValue(format.getValue('outlineLevel')) : format.getValue('outlineLevel');
        paragraphFormat[bidiProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.bidi, keywordIndex) : format.getValue('bidi');
        paragraphFormat[keepLinesTogetherProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.keepLinesTogether, keywordIndex) : format.getValue('keepLinesTogether');
        paragraphFormat[keepWithNextProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.keepWithNext, keywordIndex) : format.getValue('keepWithNext');
        paragraphFormat[contextualSpacingProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.contextualSpacing, keywordIndex) : format.getValue('contextualSpacing');
        paragraphFormat[widowControlProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.widowControl, keywordIndex) : format.getValue('widowControl');
    };
    /* eslint-disable */
    HelperMethods.writeCharacterFormat = function (characterFormat, isInline, format, keywordIndex, isWriteAllValues) {
        keywordIndex = isNullOrUndefined(keywordIndex) ? 0 : keywordIndex;
        characterFormat[boldProperty[keywordIndex]] = isWriteAllValues ? HelperMethods.getBoolInfo(format.bold, keywordIndex) : isInline ? HelperMethods.getBoolInfo(format.bold, keywordIndex) : format.getValue('bold');
        characterFormat[italicProperty[keywordIndex]] = isWriteAllValues ? HelperMethods.getBoolInfo(format.italic, keywordIndex) : isInline ? HelperMethods.getBoolInfo(format.italic, keywordIndex) : format.getValue('italic');
        characterFormat[fontSizeProperty[keywordIndex]] = isWriteAllValues ? format.fontSize : isInline ? this.toWriteInline(format, 'fontSize') : format.getValue('fontSize');
        characterFormat[fontFamilyProperty[keywordIndex]] = isWriteAllValues ? format.fontFamily : isInline ? this.toWriteInline(format, 'fontFamily') : format.getValue('fontFamily');
        characterFormat[underlineProperty[keywordIndex]] = isWriteAllValues ? format.underline : isInline ?
            keywordIndex == 1 ? HelperMethods.getUnderlineEnumValue(format.underline) : format.underline :
            keywordIndex == 1 ? HelperMethods.getUnderlineEnumValue(format.getValue('underline')) : format.getValue('underline');
        characterFormat[underlineColorProperty[keywordIndex]] = isWriteAllValues ? format.underlineColor : isInline ? this.toWriteInline(format, 'underlineColor') : format.getValue('underlineColor');
        characterFormat[fontHintTypeProperty[keywordIndex]] = isWriteAllValues ? format.fontHintType : isInline ?
            keywordIndex == 1 ? HelperMethods.getFontHintTypeEnumValue(format.fontHintType) : (format.fontHintType) :
            keywordIndex == 1 ? HelperMethods.getFontHintTypeEnumValue(format.getValue('fontHintType')) : format.getValue('fontHintType');
        characterFormat[strikethroughProperty[keywordIndex]] = isWriteAllValues ? format.strikethrough : isInline ?
            keywordIndex == 1 ? HelperMethods.getStrikeThroughEnumValue(format.strikethrough) : (format.strikethrough) :
            keywordIndex == 1 ? HelperMethods.getStrikeThroughEnumValue(format.getValue('strikethrough')) : format.getValue('strikethrough');
        characterFormat[baselineAlignmentProperty[keywordIndex]] = isWriteAllValues ? format.baselineAlignment : isInline ?
            keywordIndex == 1 ? HelperMethods.getBaselineAlignmentEnumValue(format.baselineAlignment) : (format.baselineAlignment) :
            keywordIndex == 1 ? HelperMethods.getBaselineAlignmentEnumValue(format.getValue('baselineAlignment')) : format.getValue('baselineAlignment');
        characterFormat[highlightColorProperty[keywordIndex]] = isWriteAllValues ? format.highlightColor : isInline ?
            keywordIndex == 1 ? HelperMethods.getHighlightColorEnumValue(format.highlightColor) : (format.highlightColor) :
            keywordIndex == 1 ? HelperMethods.getHighlightColorEnumValue(format.getValue('highlightColor')) : format.getValue('highlightColor');
        characterFormat[fontColorProperty[keywordIndex]] = isWriteAllValues ? format.fontColor : isInline ? this.toWriteInline(format, 'fontColor') : format.getValue('fontColor');
        characterFormat[styleNameProperty[keywordIndex]] = !isNullOrUndefined(format.baseCharStyle) ? format.baseCharStyle.name : undefined;
        characterFormat[bidiProperty[keywordIndex]] = isWriteAllValues ? format.bidi : isInline ? HelperMethods.getBoolInfo(format.bidi, keywordIndex) : format.getValue('bidi');
        characterFormat[bdoProperty[keywordIndex]] = isWriteAllValues ? format.bdo : isInline ?
            keywordIndex == 1 ? HelperMethods.getBiDirectionalOverride(format.bdo) : (format.bdo) :
            keywordIndex == 1 ? HelperMethods.getBiDirectionalOverride(format.getValue('bdo')) : format.getValue('bdo');
        characterFormat[boldBidiProperty[keywordIndex]] = isWriteAllValues ? format.boldBidi : isInline ? HelperMethods.getBoolInfo(format.boldBidi, keywordIndex) : format.getValue('boldBidi');
        characterFormat[italicBidiProperty[keywordIndex]] = isWriteAllValues ? format.italicBidi : isInline ? HelperMethods.getBoolInfo(format.italicBidi, keywordIndex) : format.getValue('italicBidi');
        characterFormat[fontSizeBidiProperty[keywordIndex]] = isWriteAllValues ? format.fontSizeBidi : isInline ? format.fontSizeBidi : format.getValue('fontSizeBidi');
        characterFormat[fontFamilyBidiProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyBidi : isInline ? format.fontFamilyBidi : format.getValue('fontFamilyBidi');
        characterFormat[allCapsProperty[keywordIndex]] = isWriteAllValues ? format.allCaps : isInline ? HelperMethods.getBoolInfo(format.allCaps, keywordIndex) : format.getValue('allCaps');
        characterFormat[localeIdBidiProperty[keywordIndex]] = isWriteAllValues ? format.localeIdBidi : isInline ? format.localeIdBidi : format.getValue('localeIdBidi');
        characterFormat[localeIdProperty[keywordIndex]] = isWriteAllValues ? format.localeIdBidi : isInline ? format.localeIdAscii : format.getValue('localeIdAscii');
        characterFormat[localeIdFarEastProperty[keywordIndex]] = isWriteAllValues ? format.localeIdFarEast : isInline ? format.localeIdFarEast : format.getValue('localeIdFarEast');
        characterFormat[complexScriptProperty[keywordIndex]] = isWriteAllValues ? format.complexScript : isInline ? HelperMethods.getBoolInfo(format.complexScript, keywordIndex) : format.getValue('complexScript');
        if (format.hasValue('hidden')) {
            characterFormat[hiddenProperty[keywordIndex]] = isWriteAllValues ? format.hidden : isInline ? HelperMethods.getBoolInfo(format.hidden, keywordIndex) : format.getValue('hidden');
        }
        characterFormat[fontFamilyAsciiProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyAscii : isInline ? this.toWriteInline(format, 'fontFamilyAscii') : format.getValue('fontFamilyAscii');
        characterFormat[fontFamilyNonFarEastProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyNonFarEast : isInline ? this.toWriteInline(format, 'fontFamilyNonFarEast') : format.getValue('fontFamilyNonFarEast');
        characterFormat[fontFamilyFarEastProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyFarEast : isInline ? this.toWriteInline(format, 'fontFamilyFarEast') : format.getValue('fontFamilyFarEast');
        characterFormat[characterSpacingProperty[keywordIndex]] = isWriteAllValues ? format.characterSpacing : isInline ? this.toWriteInline(format, 'characterSpacing') : format.getValue('characterSpacing');
        characterFormat[scalingProperty[keywordIndex]] = isWriteAllValues ? format.scaling : isInline ? this.toWriteInline(format, 'scaling') : format.getValue('scaling');
        if (format.hasValue('fontFamily') || isWriteAllValues) {
            if (isNullOrUndefined(characterFormat[fontFamilyAsciiProperty[keywordIndex]])) {
                characterFormat[fontFamilyAsciiProperty[keywordIndex]] = format.fontFamily;
            }
            if (isNullOrUndefined(characterFormat[fontFamilyNonFarEastProperty[keywordIndex]])) {
                characterFormat[fontFamilyNonFarEastProperty[keywordIndex]] = format.fontFamily;
            }
        }
    };
    /// <summary>
    /// To check whether the font name is theme font or not.
    /// </summary>
    /// <param name="fontName">Specify the font name.</param>
    /// <returns>Returns true if the font name is represent a theme font.</returns>
    HelperMethods.isThemeFont = function (fontName) {
        return (fontName == "majorAscii" || fontName == "majorBidi" || fontName == "majorEastAsia"
            || fontName == "majorHAnsi" || fontName == "minorAscii" || fontName == "minorBidi" || fontName == "minorEastAsia"
            || fontName == "minorHAnsi");
    };
    HelperMethods.toWriteInline = function (format, propertyName) {
        if (!isNullOrUndefined(format.ownerBase) && (format.ownerBase instanceof ElementBox)) {
            return format.hasValue(propertyName) ? format[propertyName] : format.getValue(propertyName);
        }
        else {
            return format[propertyName];
        }
    };
    /* eslint-enable */
    HelperMethods.round = function (value, decimalDigits) {
        var temp = value;
        for (var i = 0; i < decimalDigits; i++) {
            temp = temp * 10;
        }
        temp = Math.round(temp);
        for (var i = 0; i < decimalDigits; i++) {
            temp = temp / 10;
        }
        return temp;
    };
    /* eslint-disable  */
    HelperMethods.removeInvalidXmlChars = function (text) {
        // From xml spec valid chars:
        // #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
        // any Unicode character, excluding the surrogate blocks, FFFE, and FFFF.
        // and used unicodes in DocumentEditor \f | \v | \r | \u000E
        var invalidXMLChars = /[^\x09\x0A\x0C\x0D\v\f\r\u000E\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/ug;
        return text.replace(invalidXMLChars, '');
    };
    HelperMethods.commentInlines = function (ctext, mentions, keywordIndex) {
        var _this = this;
        var blocks = [];
        var outputArray = ctext.split(/<\/?div>/).filter(Boolean).map(function (item) { return item.trim(); });
        outputArray = outputArray.filter(Boolean).map(function (item) { return item === "<br>" ? item : item.split(/<br\s*\/?>/); }).flat();
        outputArray.forEach(function (text) {
            var block = {};
            block[inlinesProperty[keywordIndex]] = [];
            if (text !== "" && text !== "<br>") {
                // Extracting parts into an array
                var parts = text.match(/(<[^>]+>[^<]*<\/[^>]+>|[^<]+)/g);
                // Iterate through the parts array
                parts.forEach(function (content) {
                    // Replace &nbsp; &lt; &gt; &amp; with a space,"<",">" and "&" respectively
                    var replacements = {
                        "&nbsp;": " ",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&amp;": "&"
                    };
                    content = content.replace(/&nbsp;|&lt;|&gt;|&amp;/g, function (match) { return replacements[match]; });
                    if (content.indexOf("<span") === 0) {
                        // Regular expression to match the content inside the span tag
                        var regex = /<span[^>]*>([^<]*)<\/span>/;
                        // Extract the text
                        var match = content.match(regex);
                        var name_1 = match ? match[1].trim() : '';
                        var email = _this.getEmailIdByName(name_1, mentions);
                        block = _this.serializeMentions(name_1, email, block, keywordIndex);
                    }
                    else {
                        var inlines = {};
                        inlines[textProperty[keywordIndex]] = content;
                        block[inlinesProperty[keywordIndex]].push(inlines);
                    }
                });
            }
            blocks.push(block);
        });
        // adding a inline.
        if (blocks.length == 0) {
            var block = {};
            block[inlinesProperty[keywordIndex]] = [];
            var inlines = {};
            block[inlinesProperty[keywordIndex]].push(inlines);
            blocks.push(block);
        }
        return blocks;
    };
    HelperMethods.parseCommentAsText = function (comment) {
        // Create a temporary DOM element to manipulate the input string
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = comment.text;
        // Find all span elements with the class 'e-mention-chip'
        var spanElements = tempDiv.querySelectorAll('span.e-mention-chip');
        var inputDataStr = JSON.stringify(comment.mentions);
        var inputData = JSON.parse(inputDataStr);
        var index = 0;
        if (spanElements.length !== inputData.length) {
            throw new Error("The lengths of spanElements and inputData do not match");
        }
        spanElements.forEach(function (span) {
            if (index in inputData) {
                var data = inputData[index];
                if (data && typeof data.value === 'string' && typeof data.text === 'string') {
                    var anchor = document.createElement('a');
                    anchor.href = "mailto:" + data.value;
                    anchor.textContent = "@" + data.text;
                    span.replaceWith(anchor);
                }
                index++;
            }
        });
        // Get the updated innerHTML
        var result = tempDiv.innerHTML;
        // Replace <br> with appropriate newline characters
        result = result.replace(/<br>/g, '\r\n');
        return result;
    };
    HelperMethods.getEmailIdByName = function (name, mentions) {
        for (var _i = 0, mentions_1 = mentions; _i < mentions_1.length; _i++) {
            var item = mentions_1[_i];
            if (item["text"] === name) {
                if (!isNullOrUndefined(item["value"])) {
                    return item["value"];
                }
                else {
                    return item["text"] + '.com';
                }
            }
        }
        return "";
    };
    HelperMethods.serializeMentions = function (name, email, block, keywordIndex) {
        var inlines = {};
        inlines[characterFormatProperty[keywordIndex]] = {};
        inlines[fieldTypeProperty[keywordIndex]] = 0;
        inlines[hasFieldEndProperty[keywordIndex]] = true;
        block[inlinesProperty[keywordIndex]].push(inlines);
        var inlines2 = {};
        inlines2[characterFormatProperty[keywordIndex]] = {};
        inlines2[textProperty[keywordIndex]] = ' HYPERLINK \"mailto:' + email + '\" ';
        block[inlinesProperty[keywordIndex]].push(inlines2);
        var inlines3 = {};
        inlines3[characterFormatProperty[keywordIndex]] = {};
        inlines3[fieldTypeProperty[keywordIndex]] = 2;
        block[inlinesProperty[keywordIndex]].push(inlines3);
        var inlines4 = {};
        inlines4[characterFormatProperty[keywordIndex]] = {
            "underline": "Single",
            "fontColor": "#0563c1",
            "bidi": false
        };
        inlines4[textProperty[keywordIndex]] = name;
        block[inlinesProperty[keywordIndex]].push(inlines4);
        var inlines5 = {};
        inlines5[characterFormatProperty[keywordIndex]] = {};
        inlines5[fieldTypeProperty[keywordIndex]] = 1;
        block[inlinesProperty[keywordIndex]].push(inlines5);
        return block;
    };
    HelperMethods.reverseString = function (text) {
        if (!isNullOrUndefined(text) && text !== '') {
            // return a new array
            var splitString = text.split('');
            // reverse the new created array
            var reverseString = splitString.reverse();
            // join all elements of the array into a string
            text = reverseString.join('');
        }
        return text;
    };
    HelperMethods.formatClippedString = function (base64ImageString) {
        var extension = '';
        var formatClippedString = '';
        if (this.startsWith(base64ImageString, 'data:image/svg+xml;base64,')) {
            extension = '.svg';
            formatClippedString = base64ImageString.replace('data:image/svg+xml;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/svg+xml;utf8,')) {
            extension = '.svg';
            formatClippedString = base64ImageString.replace('data:image/svg+xml;utf8,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/bmp;base64,')) {
            extension = '.bmp';
            formatClippedString = base64ImageString.replace('data:image/bmp;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/x-emf;base64,')) {
            extension = '.emf';
            formatClippedString = base64ImageString.replace('data:image/x-emf;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/exif;base64,')) {
            extension = '.exif';
            formatClippedString = base64ImageString.replace('data:image/exif;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/gif;base64,')) {
            extension = '.gif';
            formatClippedString = base64ImageString.replace('data:image/gif;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/icon;base64,')) {
            extension = '.ico';
            formatClippedString = base64ImageString.replace('data:image/icon;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/jpeg;base64,')) {
            extension = '.jpeg';
            formatClippedString = base64ImageString.replace('data:image/jpeg;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/jpg;base64,')) {
            extension = '.jpg';
            formatClippedString = base64ImageString.replace('data:image/jpg;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/png;base64,')) {
            extension = '.png';
            formatClippedString = base64ImageString.replace('data:image/png;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/tiff;base64,')) {
            extension = '.tif';
            formatClippedString = base64ImageString.replace('data:image/tiff;base64,', '');
        }
        else if (this.startsWith(base64ImageString, 'data:image/x-wmf;base64,')) {
            extension = '.wmf';
            formatClippedString = base64ImageString.replace('data:image/x-wmf;base64,', '');
        }
        else {
            extension = '.jpeg';
        }
        return { 'extension': extension, 'formatClippedString': formatClippedString };
    };
    /**
     * @private
     * @param sourceString
     * @param startString
     * @returns
     */
    HelperMethods.startsWith = function (sourceString, startString) {
        return startString.length > 0 && sourceString.substring(0, startString.length) === startString;
    };
    HelperMethods.formatText = function (format, value) {
        var text = value;
        switch (format.toLowerCase()) {
            case 'uppercase':
                text = value.toUpperCase();
                break;
            case 'lowercase':
                text = value.toLowerCase();
                break;
            case 'firstlower':
                text = this.lowerFirstChar(value);
                break;
            case 'firstcapital':
                text = this.capitaliseFirst(value, 'FirstCapital');
                break;
            case 'titlecase':
                text = this.capitaliseFirst(value, 'Titlecase');
                break;
        }
        return text;
    };
    HelperMethods.formatNumber = function (format, value) {
        var intl = new Internationalization();
        var dotData = value.split('.');
        value = dotData[0];
        var numberValue = intl.parseNumber(value);
        if (value.toString() === 'NaN') {
            return '';
        }
        if (format === '') {
            format = '0';
        }
        var numberFormat = { format: format };
        return intl.formatNumber(numberValue, numberFormat);
    };
    HelperMethods.formatDate = function (format, value) {
        var intl = new Internationalization();
        var date = new Date(value);
        if (isNaN(date.getDate())) {
            return '';
        }
        if (format === '') {
            return value;
        }
        if (format.indexOf('am/pm') !== -1) {
            format = format.replace(/am\/pm/gi, 'a');
        }
        var dateFormat = { 'format': format };
        return intl.formatDate(date, dateFormat);
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    HelperMethods.capitaliseFirst = function (value, type, splitBy) {
        var text = '';
        if (type === 'Titlecase') {
            var valArry = splitBy ? value.split(splitBy) : value.split(' ');
            for (var i = 0; i < valArry.length; i++) {
                /* eslint-disable-next-line max-len */
                text += splitBy ? valArry[parseInt(i.toString(), 10)].charAt(0).toUpperCase() + valArry[parseInt(i.toString(), 10)].slice(1, valArry[parseInt(i.toString(), 10)].length) : this.capitaliseFirstInternal(valArry[parseInt(i.toString(), 10)]);
                if (valArry.length >= 0 && !splitBy) {
                    text += ' ';
                }
            }
            if (!splitBy) {
                text = this.capitaliseFirst(text, 'Titlecase', '\r');
            }
        }
        else if (type === 'FirstCapital') {
            text = this.capitaliseFirstInternal(value);
        }
        return text;
    };
    HelperMethods.lowerFirstChar = function (value) {
        return (value.charAt(0).toLowerCase() + value.slice(1, value.length));
    };
    HelperMethods.capitaliseFirstInternal = function (value) {
        return (value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase());
    };
    HelperMethods.getModifiedDate = function (date) {
        var modifiedDate = HelperMethods.getLocaleDate(date);
        var dateString = modifiedDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
        var time = modifiedDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        var dateTime = dateString + ' ' + time;
        return dateTime;
    };
    HelperMethods.getUtcDate = function (dateTime) {
        if (isNullOrUndefined(dateTime)) {
            dateTime = new Date();
        }
        return new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000).toISOString();
    };
    HelperMethods.getLocaleDate = function (date) {
        var dt = new Date(date);
        return new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);
    };
    HelperMethods.getCompatibilityModeValue = function (compatibilityMode) {
        var compatValue;
        switch (compatibilityMode) {
            case 1:
                compatValue = '11';
                break;
            case 2:
                compatValue = '12';
                break;
            case 3:
                compatValue = '14';
                break;
            default:
                compatValue = '15';
                break;
        }
        return compatValue;
    };
    /**
     * @private
     * @returns {string} - Returns the unique id for document editor.
     */
    HelperMethods.getUniqueElementId = function () {
        return 'de_element' + Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    /**
     * @private
     * @param element - element to be splitted of space
     * @param fromStart - weather to removed space from start or end
     * @returns {Boolean} - is the input element is splitted
     */
    /* eslint-disable  */
    HelperMethods.splitSpaceInTextElementBox = function (element, fromStart) {
        var elementText = element.text;
        var emptySpace = "";
        if (fromStart) {
            while (HelperMethods.startsWith(elementText, " ")) {
                emptySpace += ' ';
                elementText = elementText.substring(1);
            }
        }
        else {
            while (HelperMethods.endsWith(elementText)) {
                emptySpace += ' ';
                elementText = elementText.slice(0, -1);
            }
        }
        if (emptySpace != "") {
            var textBox = new TextElementBox();
            textBox.characterFormat.copyFormat(element.characterFormat);
            if (element.revisions.length > 0) {
                for (var i = 0; i < element.revisions.length; i++) {
                    var currentRevision = element.revisions[i];
                    textBox.revisions.push(currentRevision);
                    var rangeIndex = currentRevision.range.indexOf(element);
                    if (rangeIndex < 0) {
                        currentRevision.range.push(textBox);
                    }
                    else {
                        currentRevision.range.splice(rangeIndex + 1, 0, textBox);
                    }
                }
                textBox.isMarkedForRevision = element.isMarkedForRevision;
            }
            textBox.line = element.line;
            var lineChildren = textBox.line.children;
            if (fromStart) {
                element.text = emptySpace;
                textBox.text = elementText;
            }
            else {
                element.text = elementText;
                textBox.text = emptySpace;
            }
            lineChildren.splice(lineChildren.indexOf(element) + 1, 0, textBox);
        }
    };
    /* eslint-disable */
    HelperMethods.getTextIndexAfterWhitespace = function (text, startIndex) {
        var length = text.length;
        var index = 0;
        index = text.indexOf(' ', startIndex) + 1;
        var nextIndex = index;
        if (nextIndex === 0 || nextIndex === length) {
            return nextIndex;
        }
        while (text[nextIndex] === ' ') {
            nextIndex++;
            if (nextIndex === length) {
                break;
            }
        }
        return nextIndex;
    };
    /**
     * @private
     * @param {TextElementBox} textElementBox text element box to split the text based on max text length.
     * @param {LineWidget} lineWidget  line widget to add the splitted text element box.
     * @returns {void}
     */
    HelperMethods.splitWordByMaxLength = function (textElementBox, lineWidget, isInitialParsing) {
        var text = textElementBox.text;
        var index = 0;
        var textLength = text.length;
        var maxLength = 90;
        var splittedText = '';
        var characterFormat = textElementBox.characterFormat;
        var revisions = textElementBox.revisions;
        var spanIndex = lineWidget.children.indexOf(textElementBox);
        while (index < textLength) {
            var nextIndex = index + maxLength;
            if (nextIndex > textLength) {
                nextIndex = textLength;
            }
            var spaceIndex = HelperMethods.getTextIndexAfterWhitespace(text, nextIndex);
            if (spaceIndex === 0 || spaceIndex > textLength) {
                spaceIndex = nextIndex;
            }
            splittedText = text.substring(index, spaceIndex);
            if (index === 0) {
                textElementBox.text = splittedText;
                textElementBox.isWidthUpdated = false;
            }
            else {
                var splittedElement = new TextElementBox();
                splittedElement.text = splittedText;
                splittedElement.line = lineWidget;
                splittedElement.characterFormat.copyFormat(characterFormat);
                if (revisions.length > 0) {
                    for (var i = 0; i < revisions.length; i++) {
                        var revision = revisions[i];
                        splittedElement.revisions.push(revision);
                        var rangeIndex = revision.range.indexOf(textElementBox);
                        if (isInitialParsing) {
                            revision.range.push(splittedElement);
                        }
                        else {
                            if (rangeIndex < 0) {
                                revision.range.push(splittedElement);
                            }
                            else {
                                revision.range.splice(rangeIndex + 1, 0, splittedElement);
                            }
                        }
                    }
                }
                if (isInitialParsing) {
                    lineWidget.children.push(splittedElement);
                }
                else {
                    lineWidget.children.splice(spanIndex + 1, 0, splittedElement);
                    spanIndex++;
                }
            }
            index = spaceIndex;
        }
    };
    /**
     * @private
     */
    HelperMethods.wordBefore = '\\b';
    /**
     * @private
     */
    HelperMethods.wordAfter = '\\b';
    /**
     * @private
     */
    HelperMethods.wordSplitCharacters = [' ', ',', '.', ':', ';', '<', '>', '=',
        '+', '-', '_', '{', '}', '[', ']', '`', '~', '!', '@', '#', '$', '%', '^', '&',
        '*', '(', ')', '"', '?', '/', '|', '\\', '”', '　', '،', '؟', '؛', '’', '‘'];
    return HelperMethods;
}());
export { HelperMethods };
/**
 * @private
 */
var Point = /** @class */ (function () {
    function Point(xPosition, yPosition) {
        this.xIn = 0;
        this.yIn = 0;
        this.xIn = xPosition;
        this.yIn = yPosition;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this.xIn;
        },
        set: function (value) {
            this.xIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this.yIn;
        },
        set: function (value) {
            this.yIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.copy = function (point) {
        this.xIn = point.xIn;
        this.yIn = point.yIn;
    };
    /**
     * Destroys the internal objects maintained.
     *
     * @returns {void}
     */
    Point.prototype.destroy = function () {
        this.xIn = undefined;
        this.yIn = undefined;
    };
    return Point;
}());
export { Point };
/**
 * @private
 */
var Base64 = /** @class */ (function () {
    function Base64() {
        this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
    // public method for encoding
    Base64.prototype.encodeString = function (input) {
        var output = '';
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        input = this.unicodeEncode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        }
        return output;
    };
    // private method for UTF-8 encoding
    Base64.prototype.unicodeEncode = function (input) {
        var tempInput = input.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < tempInput.length; n++) {
            var c = tempInput.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Base64.prototype.decodeString = function (input) {
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        var resultIndex = 0;
        /*let dataUrlPrefix: string = 'data:';*/
        input = input.replace(/[^A-Za-z0-9+/=]/g, '');
        var totalLength = input.length * 3 / 4;
        if (input.charAt(input.length - 1) === this.keyStr.charAt(64)) {
            totalLength--;
        }
        if (input.charAt(input.length - 2) === this.keyStr.charAt(64)) {
            totalLength--;
        }
        if (totalLength % 1 !== 0) {
            // totalLength is not an integer, the length does not match a valid
            // base64 content. That can happen if:
            // - the input is not a base64 content
            // - the input is *almost* a base64 content, with a extra chars at the
            // beginning or at the end
            // - the input uses a base64 variant (base64url for example)
            throw new Error('Invalid base64 input, bad content length.');
        }
        var output = new Uint8Array(totalLength | 0);
        while (i < input.length) {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output[resultIndex++] = chr1;
            if (enc3 !== 64) {
                output[resultIndex++] = chr2;
            }
            if (enc4 !== 64) {
                output[resultIndex++] = chr3;
            }
        }
        return output;
    };
    /**
     * @private
     * @returns {void}
     */
    Base64.prototype.destroy = function () {
        this.keyStr = undefined;
    };
    return Base64;
}());
export { Base64 };
/**
 * @private
 */
var WrapPosition = /** @class */ (function () {
    function WrapPosition(x, width) {
        this.x = 0;
        this.width = 0;
        this.x = x;
        this.width = width;
    }
    Object.defineProperty(WrapPosition.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    return WrapPosition;
}());
export { WrapPosition };
