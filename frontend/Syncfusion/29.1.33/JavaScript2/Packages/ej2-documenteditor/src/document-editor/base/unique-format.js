/* eslint-disable */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dictionary } from './dictionary';
/**
 * @private
 */
var WUniqueFormat = /** @class */ (function () {
    function WUniqueFormat(type) {
        this.referenceCount = 0;
        this.uniqueFormatType = type;
        this.propertiesHash = new Dictionary();
    }
    /**
     * @private
     */
    WUniqueFormat.prototype.isEqual = function (source, property, modifiedValue) {
        var isEqual = false;
        switch (this.uniqueFormatType) {
            case 1:
                isEqual = this.isBorderEqual(source, property, modifiedValue);
                break;
            case 2:
                isEqual = this.isCharacterFormatEqual(source, property, modifiedValue);
                break;
            case 3:
                isEqual = this.isParagraphFormatEqual(source, property, modifiedValue);
                break;
            case 4:
                isEqual = this.isCellFormatEqual(source, property, modifiedValue);
                break;
            case 5:
                isEqual = this.isShadingEqual(source, property, modifiedValue);
                break;
            case 6:
                isEqual = this.isRowFormatEqual(source, property, modifiedValue);
                break;
            case 7:
                isEqual = this.isListFormatEqual(source, property, modifiedValue);
                break;
            case 8:
                isEqual = this.isTableFormatEqual(source, property, modifiedValue);
                break;
            case 9:
                isEqual = this.isListLevelEqual(source, property, modifiedValue);
                break;
            case 10:
                isEqual = this.isSectionFormatEqual(source, property, modifiedValue);
                break;
            case 11:
                isEqual = this.isColumnFormatEqual(source, property, modifiedValue);
                break;
            default:
                break;
        }
        return isEqual;
    };
    WUniqueFormat.prototype.isNotEqual = function (property, source, modifiedProperty, modifiedValue, uniqueFormatType) {
        var targetValue = undefined;
        var propertyType = WUniqueFormat.getPropertyType(uniqueFormatType, property);
        if (this.propertiesHash.containsKey(propertyType)) {
            targetValue = this.propertiesHash.get(propertyType);
        }
        var sourceValue = undefined;
        if (property === modifiedProperty) {
            sourceValue = modifiedValue;
        }
        else if (source.containsKey(propertyType)) {
            sourceValue = source.get(propertyType);
        }
        if (!(targetValue === sourceValue || (!isNullOrUndefined(targetValue) && !isNullOrUndefined(sourceValue) && targetValue === sourceValue))) {
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    WUniqueFormat.getPropertyType = function (uniqueFormatType, property) {
        var type = 0;
        switch (uniqueFormatType) {
            case 1:
                type = this.getBorderPropertyType(property);
                break;
            case 2:
                type = this.getCharacterFormatPropertyType(property);
                break;
            case 3:
                type = this.getParaFormatPropertyType(property);
                break;
            case 4:
                type = this.getCellFormatPropertyType(property);
                break;
            case 5:
                type = this.getShadingPropertyType(property);
                break;
            case 6:
                type = this.getRowFormatType(property);
                break;
            case 7:
                type = this.getListFormatType(property);
                break;
            case 8:
                type = this.getTableFormatType(property);
                break;
            case 9:
                type = this.getListLevelType(property);
                break;
            case 10:
                type = this.getSectionFormatType(property);
                break;
            case 11:
                type = this.getColumnFormatType(property);
                break;
            default:
                break;
        }
        return type;
    };
    WUniqueFormat.getRowFormatType = function (property) {
        switch (property) {
            case 'allowBreakAcrossPages': return 1;
            case 'isHeader': return 2;
            case 'height': return 3;
            case 'heightType': return 4;
            case 'gridBefore': return 5;
            case 'gridBeforeWidth': return 6;
            case 'gridBeforeWidthType': return 7;
            case 'gridAfter': return 8;
            case 'gridAfterWidth': return 9;
            case 'gridAfterWidthType': return 10;
            case 'leftMargin': return 11;
            case 'topMargin': return 12;
            case 'bottomMargin': return 13;
            case 'rightMargin': return 14;
            case 'leftIndent': return 15;
            default: return 0;
        }
    };
    WUniqueFormat.getListFormatType = function (property) {
        switch (property) {
            case 'listId': return 1;
            case 'listLevelNumber': return 2;
            case 'nsid': return 3;
            default: return 0;
        }
    };
    WUniqueFormat.getTableFormatType = function (property) {
        switch (property) {
            case 'leftMargin': return 1;
            case 'rightMargin': return 2;
            case 'topMargin': return 3;
            case 'bottomMargin': return 4;
            case 'cellSpacing': return 5;
            case 'leftIndent': return 6;
            case 'tableAlignment': return 7;
            case 'preferredWidth': return 8;
            case 'preferredWidthType': return 9;
            case 'bidi': return 10;
            case 'allowAutoFit': return 11;
            case 'horizontalPositionAbs': return 12;
            case 'horizontalPosition': return 13;
            default: return 0;
        }
    };
    WUniqueFormat.getListLevelType = function (property) {
        switch (property) {
            case 'listLevelPattern': return 1;
            case 'startAt': return 2;
            case 'followCharacter': return 3;
            case 'numberFormat': return 4;
            case 'restartLevel': return 5;
            case 'isLegalStyleNumbering': return 6;
            case 'paraStyleName': return 7;
            default: return 0;
        }
    };
    WUniqueFormat.getShadingPropertyType = function (property) {
        switch (property) {
            case 'backgroundColor': return 1;
            case 'foregroundColor': return 2;
            case 'textureStyle': return 3;
            default: return 0;
        }
    };
    WUniqueFormat.getCellFormatPropertyType = function (property) {
        switch (property) {
            case 'leftMargin': return 1;
            case 'rightMargin': return 2;
            case 'topMargin': return 3;
            case 'bottomMargin': return 4;
            case 'columnSpan': return 5;
            case 'rowSpan': return 6;
            case 'verticalAlignment': return 7;
            case 'preferredWidthType': return 8;
            case 'preferredWidth': return 9;
            case 'cellWidth': return 10;
            default: return 0;
        }
    };
    WUniqueFormat.getBorderPropertyType = function (property) {
        switch (property) {
            case 'color': return 1;
            case 'lineStyle': return 2;
            case 'lineWidth': return 3;
            case 'shadow': return 4;
            case 'space': return 5;
            case 'hasNoneStyle': return 6;
            default: return 0;
        }
    };
    WUniqueFormat.getCharacterFormatPropertyType = function (property) {
        switch (property) {
            case 'fontColor': return 1;
            case 'fontFamily': return 2;
            case 'fontSize': return 3;
            case 'bold': return 4;
            case 'italic': return 5;
            case 'underline': return 6;
            case 'strikethrough': return 7;
            case 'baselineAlignment': return 8;
            case 'highlightColor': return 9;
            case 'bidi': return 10;
            case 'bdo': return 11;
            case 'boldBidi': return 12;
            case 'italicBidi': return 13;
            case 'fontFamilyBidi': return 14;
            case 'fontSizeBidi': return 15;
            case 'allCaps': return 16;
            case 'localeIdBidi': return 17;
            case 'complexScript': return 18;
            case 'fontFamilyFarEast': return 19;
            case 'fontFamilyAscii': return 20;
            case 'fontFamilyNonFarEast': return 21;
            case 'localeIdAscii': return 22;
            case 'localeIdFarEast': return 23;
            case 'characterSpacing': return 24;
            case 'scaling': return 25;
            case 'hidden': return 26;
            case 'underlineColor': return 27;
            case 'fontHintType': return 28;
            default: return 0;
        }
    };
    WUniqueFormat.getParaFormatPropertyType = function (property) {
        switch (property) {
            case 'leftIndent': return 1;
            case 'rightIndent': return 2;
            case 'firstLineIndent': return 3;
            case 'textAlignment': return 4;
            case 'beforeSpacing': return 5;
            case 'afterSpacing': return 6;
            case 'lineSpacing': return 7;
            case 'lineSpacingType': return 8;
            case 'outlineLevel': return 9;
            case 'bidi': return 10;
            case 'contextualSpacing': return 11;
            case 'keepWithNext': return 12;
            case 'keepLinesTogether': return 13;
            case 'widowControl': return 14;
            case 'spaceBeforeAuto': return 15;
            case 'spaceAfterAuto': return 16;
            default: return 0;
        }
    };
    WUniqueFormat.getColumnFormatType = function (property) {
        switch (property) {
            case 'width': return 1;
            case 'space': return 2;
            default: return 0;
        }
    };
    WUniqueFormat.getSectionFormatType = function (property) {
        switch (property) {
            case 'headerDistance': return 1;
            case 'footerDistance': return 2;
            case 'differentFirstPage': return 3;
            case 'differentOddAndEvenPages': return 4;
            case 'pageWidth': return 5;
            case 'pageHeight': return 6;
            case 'leftMargin': return 7;
            case 'topMargin': return 8;
            case 'rightMargin': return 9;
            case 'bottomMargin': return 10;
            case 'bidi': return 11;
            case 'restartPageNumbering': return 12;
            case 'pageStartingNumber': return 13;
            case 'endnoteNumberFormat': return 14;
            case 'endnotePosition': return 15;
            case 'footNoteNumberFormat': return 16;
            case 'footnotePosition': return 17;
            case 'restartIndexForEndnotes': return 18;
            case 'restartIndexForFootnotes': return 19;
            case 'initialFootNoteNumber': return 20;
            case 'initialEndNoteNumber': return 21;
            case 'pageNumberStyle': return 22;
            case 'numberOfColumns': return 23;
            case 'equalWidth': return 24;
            case 'lineBetweenColumns': return 25;
            case 'columns': return 26;
            case 'breakCode': return 27;
            default: return 0;
        }
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isBorderEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('color', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        if (this.isNotEqual('lineStyle', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        if (this.isNotEqual('lineWidth', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        if (this.isNotEqual('shadow', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        if (this.isNotEqual('space', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        if (this.isNotEqual('hasNoneStyle', source, modifiedProperty, modifiedValue, 1)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isCharacterFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('fontColor', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontFamily', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontSize', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('bold', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('italic', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('underline', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('strikethrough', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('baselineAlignment', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('highlightColor', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('bdo', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontColor', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontFamilyBidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontSizeBidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('boldBidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('italicBidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('allCaps', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('localeIdBidi', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('localeIdAscii', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('localeIdFarEast', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('complexScript', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('hidden', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontFamilyFarEast', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontFamilyAscii', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontFamilyNonFarEast', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('characterSpacing', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('scaling', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('underlineColor', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        if (this.isNotEqual('fontHintType', source, modifiedProperty, modifiedValue, 2)) {
            return false;
        }
        return true;
    };
    WUniqueFormat.prototype.isParagraphFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('leftIndent', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('rightIndent', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('firstLineIndent', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('textAlignment', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('beforeSpacing', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('afterSpacing', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('spaceBeforeAuto', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('spaceAfterAuto', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('lineSpacing', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('lineSpacingType', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('outlineLevel', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('contextualSpacing', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('keepWithNext', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('keepLinesTogether', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        if (this.isNotEqual('widowControl', source, modifiedProperty, modifiedValue, 3)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isCellFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('columnSpan', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('rowSpan', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('verticalAlignment', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('preferredWidthType', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('preferredWidth', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        if (this.isNotEqual('cellWidth', source, modifiedProperty, modifiedValue, 4)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isShadingEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('backgroundColor', source, modifiedProperty, modifiedValue, 5)) {
            return false;
        }
        if (this.isNotEqual('foregroundColor', source, modifiedProperty, modifiedValue, 5)) {
            return false;
        }
        if (this.isNotEqual('textureStyle', source, modifiedProperty, modifiedValue, 5)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isRowFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('allowBreakAcrossPages', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('isHeader', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('height', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('heightType', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridBefore', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridBeforeWidth', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridBeforeWidthType', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridAfter', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridAfterWidth', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('gridAfterWidthType', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        if (this.isNotEqual('leftIndent', source, modifiedProperty, modifiedValue, 6)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isListFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('listId', source, modifiedProperty, modifiedValue, 7)) {
            return false;
        }
        if (this.isNotEqual('listLevelNumber', source, modifiedProperty, modifiedValue, 7)) {
            return false;
        }
        if (this.isNotEqual('nsid', source, modifiedProperty, modifiedValue, 7)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isTableFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('cellSpacing', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('leftIndent', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('tableAlignment', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('preferredWidth', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('preferredWidthType', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('allowAutoFit', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('horizontalPositionAbs', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        if (this.isNotEqual('horizontalPosition', source, modifiedProperty, modifiedValue, 8)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isListLevelEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('listLevelPattern', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('startAt', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('followCharacter', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('numberFormat', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('paraStyleName', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('restartLevel', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        if (this.isNotEqual('isLegalStyleNumbering', source, modifiedProperty, modifiedValue, 9)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isSectionFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('headerDistance', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('footerDistance', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('differentFirstPage', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('differentOddAndEvenPages', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('pageWidth', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('pageHeight', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('restartPageNumbering', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('pageStartingNumber', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('endnoteNumberFormat', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('endnotePosition', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('footNoteNumberFormat', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('footnotePosition', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('restartIndexForEndnotes', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('restartIndexForFootnotes', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('initialFootNoteNumber', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('initialEndNoteNumber', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('pageNumberStyle', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('numberOfColumns', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('equalWidth', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('lineBetweenColumns', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        if (this.isNotEqual('breakCode', source, modifiedProperty, modifiedValue, 10)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.isColumnFormatEqual = function (source, modifiedProperty, modifiedValue) {
        if (this.isNotEqual('width', source, modifiedProperty, modifiedValue, 11)) {
            return false;
        }
        if (this.isNotEqual('space', source, modifiedProperty, modifiedValue, 11)) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.cloneItems = function (format, property, value, uniqueFormatType) {
        var propertyType = WUniqueFormat.getPropertyType(uniqueFormatType, property);
        var keys = format.propertiesHash.keys;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === propertyType) {
                this.propertiesHash.add(propertyType, value);
            }
            else {
                this.propertiesHash.add(keys[i], format.propertiesHash.get(keys[i]));
            }
        }
        if (!format.propertiesHash.containsKey(propertyType)) {
            this.propertiesHash.add(propertyType, value);
        }
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.mergeProperties = function (format) {
        var hash = format.cloneProperties();
        var keys = this.propertiesHash.keys;
        for (var i = 0; i < keys.length; i++) {
            if (!hash.containsKey(keys[i])) {
                hash.add(keys[i], this.propertiesHash.get(keys[i]));
            }
        }
        return hash;
    };
    /**
     * @private
     */
    WUniqueFormat.prototype.cloneProperties = function () {
        var hash = new Dictionary();
        var keys = this.propertiesHash.keys;
        for (var i = 0; i < keys.length; i++) {
            hash.add(keys[i], this.propertiesHash.get(keys[i]));
        }
        return hash;
    };
    // public cloneItemsInternal(format: WUniqueFormat): void {
    //     let keys: number[] = format.propertiesHash.getItem();
    //     for (let i: number = 0; i < keys.length; i++) {
    //         this.propertiesHash.add(keys[i], format.propertiesHash.get(keys[i]));
    //     }
    //     this.referenceCount = format.referenceCount;
    // }
    /**
     * @private
     */
    WUniqueFormat.prototype.destroy = function () {
        if (!isNullOrUndefined(this.propertiesHash)) {
            this.propertiesHash.destroy();
        }
        this.propertiesHash = undefined;
        this.referenceCount = undefined;
        this.uniqueFormatType = undefined;
    };
    return WUniqueFormat;
}());
export { WUniqueFormat };
