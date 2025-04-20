var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { extend, Property, ChildProperty, Complex, Collection } from '@syncfusion/ej2-base';
import { CellStyle, wrapEvent, Chart } from '../common/index';
import { Image, updateCell } from '../common/index';
import { getRow } from './index';
import { getSheet } from './sheet';
/**
 * Represents the cell.
 */
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Cell.prototype, "notes", void 0);
    __decorate([
        Collection([], Image)
    ], Cell.prototype, "image", void 0);
    __decorate([
        Collection([], Chart)
    ], Cell.prototype, "chart", void 0);
    __decorate([
        Property('')
    ], Cell.prototype, "value", void 0);
    __decorate([
        Property('')
    ], Cell.prototype, "formula", void 0);
    __decorate([
        Property(0)
    ], Cell.prototype, "index", void 0);
    __decorate([
        Property('General')
    ], Cell.prototype, "format", void 0);
    __decorate([
        Complex({}, CellStyle)
    ], Cell.prototype, "style", void 0);
    __decorate([
        Property('')
    ], Cell.prototype, "hyperlink", void 0);
    __decorate([
        Property(false)
    ], Cell.prototype, "wrap", void 0);
    __decorate([
        Property(true)
    ], Cell.prototype, "isLocked", void 0);
    __decorate([
        Property('')
    ], Cell.prototype, "validation", void 0);
    __decorate([
        Property(1)
    ], Cell.prototype, "colSpan", void 0);
    __decorate([
        Property(1)
    ], Cell.prototype, "rowSpan", void 0);
    __decorate([
        Property(false)
    ], Cell.prototype, "isReadOnly", void 0);
    return Cell;
}(ChildProperty));
export { Cell };
/**
 * @hidden
 * @param {number} rowIndex - Specifies the rowIndex.
 * @param {number} colIndex - Specifies the colIndex.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {boolean} isInitRow - Specifies the isInitRow.
 * @param {boolean} returnEmptyObjIfNull - Specifies the bool value.
 * @returns {CellModel} - get the cell.
 */
export function getCell(rowIndex, colIndex, sheet, isInitRow, returnEmptyObjIfNull) {
    var row = getRow(sheet, rowIndex);
    if (!row || !row.cells) {
        if (isInitRow) {
            if (!row) {
                sheet.rows[rowIndex] = { cells: [] };
            }
            else {
                sheet.rows[rowIndex].cells = [];
            }
        }
        else {
            return returnEmptyObjIfNull ? {} : null;
        }
    }
    return sheet.rows[rowIndex].cells[colIndex] || (returnEmptyObjIfNull ? {} : null);
}
/**
 * @hidden
 * @param {number} rowIndex - Specifies the rowIndex.
 * @param {number} colIndex - Specifies the colIndex.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {CellModel} cell - Specifies the cell.
 * @param {boolean} isExtend - Specifies the bool value.
 * @param {boolean} isUpdate - If true, allows updating the existing cell data without extending.
 * @returns {void} - set the cell.
 */
export function setCell(rowIndex, colIndex, sheet, cell, isExtend, isUpdate) {
    if (!sheet.rows[rowIndex]) {
        sheet.rows[rowIndex] = { cells: [] };
    }
    else if (!sheet.rows[rowIndex].cells) {
        sheet.rows[rowIndex].cells = [];
    }
    if (isExtend && sheet.rows[rowIndex].cells[colIndex] && !isUpdate) {
        extend(sheet.rows[rowIndex].cells[colIndex], cell, null, true);
    }
    else {
        sheet.rows[rowIndex].cells[colIndex] = cell;
    }
}
/**
 * @hidden
 * @param {CellStyleModel} style - Specifies the style.
 * @param {boolean} defaultKey - Specifies the defaultKey.
 * @returns {CellStyleModel} - Specifies the CellStyleModel.
 */
export function skipDefaultValue(style, defaultKey) {
    var defaultProps = { fontFamily: 'Calibri', verticalAlign: 'bottom', textIndent: '0pt', backgroundColor: '#ffffff',
        color: '#000000', textAlign: 'left', fontSize: '11pt', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none',
        border: '', borderLeft: '', borderTop: '', borderRight: '', borderBottom: '' };
    var changedProps = {};
    var styleVal;
    Object.keys(defaultKey ? defaultProps : style).forEach(function (propName) {
        styleVal = style["" + propName];
        if (styleVal !== defaultProps["" + propName]) {
            changedProps["" + propName] = styleVal;
        }
    });
    return changedProps;
}
/**
 * @hidden
 * @param {string} address - Specifies the address.
 * @param {boolean} wrap - Specifies the wrap.
 * @param {Workbook} context - Specifies the context.
 * @param {Workbook} preventEvt - Preventing the before cell update event.
 * @param {boolean} isPublic - Specifies if the wrap operation is invoked from a public method.
 * @returns {void} - Specifies the wrap.
 */
export function wrap(address, wrap, context, preventEvt, isPublic) {
    if (wrap === void 0) { wrap = true; }
    var addressInfo = context.getAddressInfo(address);
    var rng = addressInfo.indices;
    var sheet = getSheet(context, addressInfo.sheetIndex);
    var uiRefresh = addressInfo.sheetIndex === context.activeSheetIndex;
    var cancel = !preventEvt;
    for (var i = rng[0]; i <= rng[2]; i++) {
        for (var j = rng[1]; j <= rng[3]; j++) {
            cancel = updateCell(context, sheet, { cell: { wrap: wrap }, rowIdx: i, colIdx: j, preventEvt: preventEvt });
            if (!cancel && uiRefresh) {
                context.notify(wrapEvent, { range: [i, j, i, j], wrap: wrap, sheet: sheet, initial: true, isPublic: isPublic });
            }
        }
    }
    context.setProperties({ sheets: context.sheets }, true);
}
/**
 * @hidden
 * @param {string} format - Specifies the cell format.
 * @returns {string} - Specifies the supported color code.
 */
export function getColorCode(format) {
    var code;
    if (format.indexOf('[') > -1) {
        var colorValue = format.split('[')[1].split(']')[0];
        var customColors = getCustomColors();
        if (customColors.indexOf(colorValue) > -1) {
            code = colorValue;
        }
    }
    return code;
}
/**
 * @hidden
 * @returns {string[]} - Returns the custom format colors
 */
export function getCustomColors() {
    return ['Black', 'Blue', 'Cyan', 'Green', 'Magenta', 'Red', 'White', 'Yellow'];
}
/**
 * @param {string} format - Specify the format.
 * @param {boolean} checkTime - Specify the checktime.
 * @param {Object} option - Specify rhe option value.
 * @param {string} option.type - Specify the type.
 * @param {boolean} checkBoth - Specify check both values.
 * @returns {boolean} - This function is used to return is custom Data time or not.
 * @hidden
 */
export function isCustomDateTime(format, checkTime, option, checkBoth) {
    var isCustom;
    if (format.includes('"')) {
        var formatSection_1 = format.split(';');
        var endStrIdx_1;
        var prevChar_1;
        formatSection_1.forEach(function (formatCode, index) {
            for (var idx = 0; idx < formatCode.length; idx++) {
                if (formatCode[idx] === '"' && formatCode[idx - 1] !== '\\') {
                    endStrIdx_1 = idx;
                    do {
                        endStrIdx_1 = formatCode.indexOf('"', endStrIdx_1 + 1);
                        prevChar_1 = formatCode[endStrIdx_1 - 1];
                    } while (prevChar_1 === '\\' || prevChar_1 === '_' || prevChar_1 === '*');
                    if (endStrIdx_1 === -1) {
                        break;
                    }
                    formatCode = formatCode.substring(0, idx) + formatCode.substring(endStrIdx_1 + 1);
                    idx--;
                }
            }
            formatSection_1[index] = formatCode;
        });
        format = formatSection_1.join(';');
    }
    if ((format.includes('d') || format.includes('y')) && !format.includes('#') && !getColorCode(format)) {
        if (option) {
            option.type = 'date';
        }
        if (checkBoth && format.includes(' ') && format.split(' ').length === 2) {
            format = format.split(' ')[1];
        }
        else {
            checkTime = false;
        }
        isCustom = true;
    }
    if (checkTime && (format.includes('h') || format.includes('m') || format.includes('s')) && !format.includes('#') &&
        !getColorCode(format)) {
        if (option) {
            option.type = option.type || '';
            option.type += 'time';
        }
        isCustom = true;
    }
    return isCustom;
}
/**
 * Represents the configuration options for the Spreadsheet when opening a document.
 */
var OpenSettings = /** @class */ (function (_super) {
    __extends(OpenSettings, _super);
    function OpenSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], OpenSettings.prototype, "chunkSize", void 0);
    __decorate([
        Property(3)
    ], OpenSettings.prototype, "retryCount", void 0);
    __decorate([
        Property(500)
    ], OpenSettings.prototype, "retryAfterDelay", void 0);
    return OpenSettings;
}(ChildProperty));
export { OpenSettings };
