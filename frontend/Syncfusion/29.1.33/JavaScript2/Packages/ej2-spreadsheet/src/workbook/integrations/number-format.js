import { getRangeIndexes, updateCell, applyCellFormat, isReadOnly, isImported, getSwapRange, getGcd } from '../common/index';
import { getCell, getSheet, setCell, getSheetIndex, getColorCode, getCustomColors, getRow, isHiddenRow } from '../base/index';
import { Internationalization, getNumberDependable, getNumericObject, isNullOrUndefined, IntlBase } from '@syncfusion/ej2-base';
import { cldrData, defaultCurrencyCode } from '@syncfusion/ej2-base';
import { isNumber, toFraction, intToDate, toDate, dateToInt, rowFillHandler } from '../common/index';
import { applyNumberFormatting, getFormattedCellObject, refreshCellElement, checkDateFormat, getFormattedBarText, applyCF } from '../common/index';
import { getTextSpace, isCustomDateTime, setVisibleMergeIndex, refreshChart } from './../index';
import { checkIsNumberAndGetNumber, parseThousandSeparator } from '../common/internalization';
import { checkNumberFormat, parseDecimalNumber } from './../common/index';
import { localizedFormatAction, wrapEvent } from '../common/index';
/**
 * Specifies number format.
 */
var WorkbookNumberFormat = /** @class */ (function () {
    function WorkbookNumberFormat(parent) {
        this.parent = parent;
        this.localeObj = getNumericObject(this.parent.locale);
        var dependables = IntlBase.getDependables(cldrData, this.parent.locale, null).dateObject;
        if (dependables.dayPeriods && dependables.dayPeriods && dependables.dayPeriods.format && dependables.dayPeriods.format.wide) {
            this.localeObj.am = dependables.dayPeriods.format.wide.am || 'AM';
            this.localeObj.pm = dependables.dayPeriods.format.wide.pm || 'PM';
        }
        else {
            this.localeObj.am = 'AM';
            this.localeObj.pm = 'PM';
        }
        this.updateLocalizedFormats(dependables);
        this.addEventListener();
    }
    WorkbookNumberFormat.prototype.numberFormatting = function (args) {
        var sheetIdx = this.parent.activeSheetIndex;
        var activeSheet = true;
        if (args.range && args.range.indexOf('!') > -1) {
            sheetIdx = getSheetIndex(this.parent, args.range.substring(0, args.range.lastIndexOf('!')));
            activeSheet = sheetIdx === this.parent.activeSheetIndex;
        }
        var sheet = getSheet(this.parent, sheetIdx);
        var formatRange = args.range ? ((args.range.lastIndexOf('!') > -1) ?
            args.range.substring(args.range.lastIndexOf('!') + 1) : args.range) : sheet.selectedRange;
        var selectedRange = getSwapRange(getRangeIndexes(formatRange));
        args.curSym = getNumberDependable(this.parent.locale, defaultCurrencyCode);
        var fArgs;
        var cell;
        var prevFormat;
        var row;
        var isVisibleRow;
        for (var rowIdx = selectedRange[0]; rowIdx <= selectedRange[2]; rowIdx++) {
            row = getRow(sheet, rowIdx);
            isVisibleRow = activeSheet && !isHiddenRow(sheet, rowIdx);
            for (var colIdx = selectedRange[1]; colIdx <= selectedRange[3]; colIdx++) {
                cell = getCell(rowIdx, colIdx, sheet, false, true);
                prevFormat = cell.format;
                if (!isReadOnly(cell, sheet.columns[colIdx], row) &&
                    !updateCell(this.parent, sheet, { cell: { format: args.format }, rowIdx: rowIdx, colIdx: colIdx })) {
                    cell = getCell(rowIdx, colIdx, sheet);
                    if (!(cell.rowSpan < 0 || cell.colSpan < 0)) {
                        fArgs = { value: cell.value, format: cell.format, rowIndex: rowIdx, colIndex: colIdx, sheetIndex: sheetIdx,
                            cell: cell, refresh: activeSheet, curSymbol: args.curSym };
                        this.getFormattedCell(fArgs);
                        if (isVisibleRow) {
                            this.setCell(fArgs);
                            if (fArgs.td) {
                                this.parent.notify(refreshCellElement, fArgs);
                                if (cell.wrap && (!row || !row.customHeight) && prevFormat !== args.format) {
                                    this.parent.notify(wrapEvent, { range: [rowIdx, colIdx, rowIdx, colIdx], wrap: true, sheet: sheet, initial: true,
                                        td: fArgs.td, isOtherAction: true });
                                }
                            }
                            if (prevFormat && prevFormat !== args.format && prevFormat.includes('[') &&
                                getCustomColors().indexOf(getColorCode(args.format)) === -1) {
                                this.removeFormatColor(fArgs, { format: prevFormat, style: cell.style });
                            }
                        }
                    }
                    this.parent.setUsedRange(rowIdx, colIdx);
                }
            }
        }
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: selectedRange, isAction: true, isEdit: true });
        }
        if (this.parent.chartColl && this.parent.chartColl.length) {
            this.parent.notify(refreshChart, { range: selectedRange });
        }
    };
    WorkbookNumberFormat.prototype.isDigitPlaceHolder = function (char) {
        return char === '#' || char === '0' || char === '?' || char === '.';
    };
    WorkbookNumberFormat.prototype.parseToLocalizedFormat = function (args) {
        if (args.decimalGroupSepsChanged && (args.format.includes('.') || args.format.includes(','))) {
            var formatChar = void 0;
            var endPos = void 0;
            var prevChar_1;
            var formatChars = args.format.split('');
            for (var idx = 0; idx < formatChars.length; idx++) {
                formatChar = formatChars[idx];
                if (formatChar === '"') {
                    endPos = args.format.indexOf('"', idx + 1);
                    if (endPos > -1) {
                        idx = endPos;
                    }
                }
                else if (formatChar === '_' || formatChar === '*' || formatChar === '\\') {
                    idx++;
                }
                else if (formatChar === '[') {
                    endPos = args.format.indexOf(']', idx + 1);
                    if (endPos > -1) {
                        idx = endPos;
                    }
                }
                else if (formatChar === ',') {
                    if (this.isDigitPlaceHolder(formatChars[idx - 1])) {
                        formatChars[idx] = this.localeObj.group;
                    }
                }
                else if (formatChar === '.') {
                    if (formatChars[idx - 1]) {
                        prevChar_1 = formatChars[idx - 1].toLowerCase();
                        if (!['d', 'm', 'y', 'h'].some(function (char) { return prevChar_1 === char; })) {
                            formatChars[idx] = this.localeObj.decimal;
                        }
                    }
                    else {
                        formatChars[idx] = this.localeObj.decimal;
                    }
                }
            }
            args.format = formatChars.join('');
        }
        if (args.curChanged && args.format.includes("\"" + args.curSym + "\"")) {
            args.format = args.format.split("\"" + args.curSym + "\"").join(args.curSym);
        }
    };
    WorkbookNumberFormat.prototype.updateLocalizedFormats = function (dependables, isFormatMapping) {
        var _this = this;
        var _a;
        numberFormatsCode = {
            currency: ['$#,##0.00', '$#,##0', '$#,##0_);($#,##0)', '$#,##0_);[Red]($#,##0)', '$#,##0.00_);($#,##0.00)',
                '$#,##0.00_);[Red]($#,##0.00)'],
            accounting: ['_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
                '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)', '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)'],
            time: dependables.timeFormats && dependables.timeFormats.medium === 'HH:mm:ss' ? 'HH:mm:ss' : 'h:mm:ss AM/PM'
        };
        var curSym = getNumberDependable(this.parent.locale, defaultCurrencyCode);
        var args = { curChanged: curSym !== '$', curSym: curSym,
            decimalGroupSepsChanged: this.localeObj.decimal !== '.' && this.localeObj.group !== ',' };
        if (args.curChanged) {
            var intl = new Internationalization(this.parent.locale);
            var formatStr = intl.getNumberPattern({ currency: '$', useGrouping: true, format: 'c0' }, true);
            if (formatStr && formatStr.endsWith('$')) {
                var curSpacing_1 = formatStr[formatStr.indexOf('$') - 1].trim().length ? '' : ' ';
                numberFormatsCode.currency.forEach(function (format, index) {
                    if (format.includes('$#,##0')) {
                        var decimalFormat = '';
                        var decimalPart = format.split('$#,##0.')[1];
                        if (decimalPart) {
                            var decimalCount = 0;
                            while (decimalPart[decimalCount] === '0') {
                                decimalFormat += '0';
                                decimalCount++;
                            }
                        }
                        if (decimalFormat) {
                            decimalFormat = "." + decimalFormat;
                        }
                        numberFormatsCode.currency[index] = format.split("$#,##0" + decimalFormat).join("#,##0" + decimalFormat + curSpacing_1 + "\"" + curSym + "\"");
                    }
                });
                numberFormatsCode.accounting.forEach(function (format, index) {
                    if (format.slice(0, format.indexOf('#')).includes('$')) {
                        var formatArr_1 = format.split(';');
                        var replaceIdx_1;
                        formatArr_1.forEach(function (formatStr, index) {
                            if (formatStr.includes('$')) {
                                formatStr = formatStr.replace('$', '');
                                if (formatStr.includes('0)')) {
                                    replaceIdx_1 = formatStr.indexOf('0)') + 2;
                                }
                                else {
                                    replaceIdx_1 = formatStr.lastIndexOf(formatStr.includes('0') ? '0' : (formatStr.includes('?') ? '?' :
                                        (formatStr.includes('"-"') ? '"' : '#'))) + 1;
                                }
                                if (replaceIdx_1 > 0) {
                                    formatArr_1[index] = formatStr.slice(0, replaceIdx_1) + curSpacing_1 + ("\"" + curSym + "\"") +
                                        formatStr.slice(replaceIdx_1);
                                }
                            }
                        });
                        numberFormatsCode.accounting[index] = formatArr_1.join(';');
                    }
                });
            }
            else {
                var updateLocalizedCurrency = function (format, index, formats) { return formats[index] = format.split('$').join("\"" + curSym + "\""); };
                numberFormatsCode.currency.forEach(updateLocalizedCurrency);
                numberFormatsCode.accounting.forEach(updateLocalizedCurrency);
            }
        }
        var customFormats = ['General', '0', '0.00', '#,##0', '#,##0.00', '#,##0_);(#,##0)', '#,##0_);[Red](#,##0)',
            '#,##0.00_);(#,##0.00)', '#,##0.00_);[Red](#,##0.00)', numberFormatsCode.currency[2], numberFormatsCode.currency[3],
            numberFormatsCode.currency[4], numberFormatsCode.currency[5], '0%', '0.00%', '0.00E+00', '##0.0E+0', '# ?/?', '# ??/??',
            'm/d/yyyy', 'd-mmm-yy', 'd-mmm', 'mmm-yy', 'h:mm AM/PM', 'h:mm:ss AM/PM', 'h:mm', 'h:mm:ss', 'm/d/yyyy h:mm', 'mm:ss',
            'mm:ss.0', '@', '[h]:mm:ss'].concat(numberFormatsCode.accounting);
        if (isFormatMapping) {
            (_a = this.customFormats).splice.apply(_a, [0, customFormats.length].concat(customFormats));
        }
        else {
            this.customFormats = customFormats;
            this.localizedFormats = [];
        }
        var defaultFormatsId = [0, 1, 2, 3, 4, 37, 38, 39, 40, 5, 6, 7, 8, 9, 10, 11, 48, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 45, 47, 49, 46, 42, 41, 44, 43];
        var formatIdx;
        defaultFormatsId.forEach(function (id, index) {
            if (defaultFormats && defaultFormats.has(id)) {
                _this.customFormats[index] = defaultFormats.get(id);
                formatIdx = [5, 6, 7, 8].indexOf(id);
                if (formatIdx > -1) {
                    numberFormatsCode.currency[formatIdx + 2] = _this.customFormats[index];
                }
                else {
                    formatIdx = [42, 41, 44, 43].indexOf(id);
                    if (formatIdx > -1) {
                        numberFormatsCode.accounting[formatIdx] = _this.customFormats[index];
                    }
                }
            }
            args.format = _this.customFormats[index];
            _this.parseToLocalizedFormat(args);
            _this.localizedFormats[index] = args.format;
        });
        var _loop_1 = function (idx) {
            var cusFormatIdx = this_1.localizedFormats.findIndex(function (format, index) { return format === _this.localizedFormats[idx] && index < defaultFormatsId.length; });
            if (cusFormatIdx > -1) {
                this_1.localizedFormats.splice(idx, 1);
                this_1.customFormats.splice(idx, 1);
                idx--;
            }
            out_idx_1 = idx;
        };
        var this_1 = this, out_idx_1;
        for (var idx = defaultFormatsId.length; idx < this.localizedFormats.length; idx++) {
            _loop_1(idx);
            idx = out_idx_1;
        }
    };
    WorkbookNumberFormat.prototype.localizedFormatAction = function (args) {
        if (args.action === 'getLocalizedFormats') {
            args.defaultFormats = this.customFormats;
            args.localizedFormats = this.localizedFormats;
        }
        else if (args.action === 'mapNumberFormatId') {
            this.updateLocalizedFormats(IntlBase.getDependables(cldrData, this.parent.locale, null).dateObject, true);
        }
        else {
            args.curSym = getNumberDependable(this.parent.locale, defaultCurrencyCode);
            if (args.action === 'parseToDefaultFormat') {
                this.parseToDefaultFormat(args);
            }
            else {
                // addToCustomFormats action
                args.decimalGroupSepsChanged = this.localeObj.decimal !== '.' && this.localeObj.group !== ',';
                args.curChanged = args.curSym !== '$';
                if (!args.defaultFormat) {
                    args.defaultFormat = args.format;
                    this.parseToLocalizedFormat(args);
                }
                if (this.localizedFormats.indexOf(args.format) === -1) {
                    this.localizedFormats.push(args.format);
                    this.customFormats.push(args.defaultFormat);
                }
            }
        }
    };
    WorkbookNumberFormat.prototype.parseToDefaultFormat = function (args) {
        var _this = this;
        var decimalSepChanged = this.localeObj.decimal !== '.' && args.format.includes(this.localeObj.decimal);
        var groupSepChanged = this.localeObj.group !== ',' && args.format.includes(this.localeObj.group);
        var curSymChanged = args.curSym !== '$' && args.format.includes(args.curSym);
        if (decimalSepChanged || groupSepChanged || curSymChanged) {
            var endPos_1;
            var prevChar_2;
            var formatChar_1;
            var formatSection_1 = args.format.split(';');
            formatSection_1.forEach(function (format, index) {
                var formatChars = format.split('');
                for (var idx = 0; idx < formatChars.length; idx++) {
                    formatChar_1 = formatChars[idx];
                    if (formatChar_1 === '"') {
                        idx = format.indexOf('"', idx + 1);
                    }
                    else if (formatChar_1 === '_' || formatChar_1 === '*' || formatChar_1 === '\\') {
                        idx++;
                    }
                    else if (formatChar_1 === '[') {
                        endPos_1 = format.indexOf(']', idx + 1);
                        if (endPos_1 > -1) {
                            idx = endPos_1;
                        }
                    }
                    else if (decimalSepChanged && formatChar_1 === _this.localeObj.decimal) {
                        prevChar_2 = formatChars[idx - 1];
                        if (prevChar_2) {
                            prevChar_2 = prevChar_2.toLowerCase();
                            if (!['d', 'm', 'y', 'h'].some(function (char) { return prevChar_2 === char; })) {
                                formatChars[idx] = '.';
                            }
                        }
                        else {
                            formatChars[idx] = '.';
                        }
                    }
                    else if (groupSepChanged && formatChar_1 === _this.localeObj.group) {
                        if (_this.isDigitPlaceHolder(formatChars[idx - 1])) {
                            formatChars[idx] = ',';
                        }
                    }
                    else if (curSymChanged) {
                        if (formatChar_1 === args.curSym) {
                            formatChars[idx] = "\"" + args.curSym + "\"";
                        }
                        else if (args.curSym.startsWith(formatChar_1) &&
                            format.substring(idx, idx + args.curSym.length) === args.curSym) {
                            formatChars.splice(idx, args.curSym.length, "\"" + args.curSym + "\"");
                        }
                    }
                }
                formatSection_1[index] = formatChars.join('');
            });
            args.format = formatSection_1.join(';');
        }
    };
    /**
     * @hidden
     *
     * @param {Object} args - Specifies the args.
     * @returns {string} - to get formatted cell.
     */
    WorkbookNumberFormat.prototype.getFormattedCell = function (args) {
        var fResult = args.value === undefined || args.value === null ? '' : args.value;
        args.sheetIndex = args.sheetIndex === undefined ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = getSheet(this.parent, args.sheetIndex);
        var cell = args.cell || getCell(args.rowIndex, args.colIndex, sheet, false, true);
        var rightAlign = false;
        var intl = new Internationalization();
        if (!args.curSymbol) {
            args.curSymbol = getNumberDependable(this.parent.locale, defaultCurrencyCode);
        }
        if ((!args.format || args.format === 'General') && !args.skipFormatCheck && (!cell.formula ||
            !cell.formula.toLowerCase().startsWith('=text('))) {
            args.type = args.format = 'General';
            if (!cell.formula || (cell.formula && cell.formula.indexOf('&-') === -1)) { // for 5&-3=>5-3.
                var dateEventArgs = { value: fResult, updatedVal: fResult, cell: cell, isEdit: args.isEdit,
                    intl: intl };
                this.checkDateFormat(dateEventArgs);
                if (dateEventArgs.isDate || dateEventArgs.isTime) {
                    rightAlign = true;
                    cell.value = args.value = dateEventArgs.updatedVal;
                    if (cell.format && cell.format !== 'General') {
                        args.format = cell.format;
                        args.type = getTypeFromFormat(args.format);
                    }
                    else {
                        cell.format = args.format = getFormatFromType(dateEventArgs.isDate ? 'ShortDate' : 'Time');
                    }
                }
            }
        }
        else {
            args.type = getTypeFromFormat(args.format);
            if (args.skipFormatCheck && !args.format && args.type === 'General') {
                args.format = 'General';
            }
        }
        if (cell.format && this.isCustomType(cell)) {
            args.type = 'Custom';
            var isTextFormat = cell.format.indexOf('@') > -1;
            if (fResult !== '' && !isTextFormat && this.isPercentageValue(fResult.toString(), args, cell)) {
                fResult = args.value.toString();
            }
            var isCustomText = void 0;
            var option = {};
            if (defaultFormats && isImported(this.parent)) {
                cell.format = args.format = this.getMatchingCustomFormat(cell.format);
            }
            var orgFormat = cell.format;
            cell.format = cell.format.split('\\').join('');
            var formats = cell.format.split(';');
            if (isCustomDateTime(formats[0], true, option, true)) {
                if (fResult !== '') {
                    args.result = this.processCustomDateTime(args, cell, option.type !== 'time', formats);
                    isCustomText = !args.formatApplied;
                }
                args.result = args.result || cell.value;
            }
            else if (formats.length > 1) {
                if (cell.format.indexOf('<') > -1 || cell.format.indexOf('>') > -1) {
                    args.result = this.processCustomConditions(cell, args);
                }
                else {
                    var numObj = checkIsNumberAndGetNumber(cell, this.parent.locale, this.localeObj.group, this.localeObj.decimal, args.curSymbol);
                    if (numObj.isNumber) {
                        cell.value = numObj.value;
                        this.processCustomAccounting(cell, args, formats, formats[0]);
                        isCustomText = false;
                    }
                    else {
                        args.result = this.processCustomText(cell, args, formats);
                        isCustomText = true;
                    }
                }
                cell.format = orgFormat;
            }
            else if (isTextFormat) {
                isCustomText = true;
                args.result = this.processCustomText(cell, args);
            }
            else {
                var numObj = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal);
                if (numObj.isNumber) {
                    cell.value = args.value = numObj.value;
                    if (cell.format.includes('E+0')) {
                        if (args.format !== cell.format) {
                            args.format = cell.format;
                        }
                        this.checkAndSetColor(args);
                        var numberFormat = args.format.split('E')[0];
                        var formatArr = numberFormat.split('.');
                        if (this.localeObj.decimal !== '.' && formatArr.length === 1) {
                            formatArr = numberFormat.split(this.localeObj.decimal);
                        }
                        args.result = formatArr[0].length > 1 ? this.scientificHashFormat(args, formatArr) : this.scientificFormat(args);
                    }
                    else {
                        args.result = this.processCustomNumberFormat(cell, args);
                        isCustomText = !isNumber(cell.value);
                    }
                }
                else {
                    if (cell.format && cell.format.includes('[')) {
                        this.removeFormatColor(args, { format: cell.format, style: cell.style });
                    }
                    isCustomText = args.dataUpdate = true;
                }
            }
            if (args.dataUpdate) {
                args.formattedText = args.result || (isNullOrUndefined(args.value) ? '' : args.value.toString());
            }
            else {
                args.value = args.result;
                args.formattedText = isNullOrUndefined(args.value) ? '' : args.value.toString();
            }
            if (isCustomText) {
                args.isRightAlign = false;
            }
            else {
                args.isRightAlign = !isNullOrUndefined(args.value);
            }
        }
        else {
            var result = this.processFormats(args, fResult, rightAlign, cell, intl, sheet);
            args.formattedText = result.fResult || (args.value === undefined || args.value === null ? '' : args.value.toString());
            args.isRightAlign = result.rightAlign;
        }
        if (args.rowIndex !== undefined) {
            if (cell.format && args.formattedText && args.formattedText !== cell.value && cell.format !== 'General') {
                cell.formattedText = args.formattedText;
            }
            else if (cell.formattedText) {
                delete cell.formattedText;
            }
        }
        return args.formattedText;
    };
    WorkbookNumberFormat.prototype.isCustomType = function (cell) {
        var format = getTypeFromFormat(cell.format);
        return (format === 'General' && cell.format !== 'General') || (format === 'Time' && this.parent.isEdit);
    };
    WorkbookNumberFormat.prototype.processCustomFill = function (format, cell, args, formatText) {
        var repeatChar = format[format.indexOf('*') + 1];
        var codes = format.split('*' + repeatChar);
        if (args.rowIndex === undefined || args.dataUpdate) {
            formatText = formatText || this.processCustomNumberFormat({ format: codes.join(''), value: cell.value }, args);
        }
        else {
            var secText = void 0;
            if (codes[1]) {
                var cellVal = parseFloat(cell.value);
                if (cellVal < 0) {
                    secText = this.processCustomNumberFormat({ format: codes[1], value: Math.abs(cellVal).toString() }, args);
                    formatText = "-" + codes[0].split('\'').join('');
                }
                else {
                    secText = this.processCustomNumberFormat({ format: codes[1], value: cell.value }, args);
                    formatText = codes[0].split('\'').join('');
                }
                if (cellVal === 0) {
                    secText = secText.split('0').join('');
                }
            }
            else {
                formatText = formatText || this.processCustomNumberFormat({ format: codes[0], value: cell.value }, args);
            }
            args.isRowFill = true;
            this.setCell(args);
            this.parent.notify(rowFillHandler, { cell: cell, cellEle: args.td, rowIdx: args.rowIndex, colIdx: args.colIndex, beforeFillText: formatText,
                repeatChar: repeatChar, afterFillText: secText });
            formatText = this.parent.isPrintingProcessing ? formatText + secText : formatText;
        }
        return formatText;
    };
    WorkbookNumberFormat.prototype.processCustomDateTime = function (args, cell, isDate, formatSections) {
        var _this = this;
        if (this.localeObj.decimal !== '.' && cell.value && cell.value.toString().includes(this.localeObj.decimal)) {
            var cellVal = cell.value.replace(this.localeObj.decimal, '.');
            if (isNumber(cellVal)) {
                cell.value = args.value = cellVal;
            }
        }
        var isCustomDate;
        var checkCustomDate = function () {
            var cellVal = cell.value.toString();
            if (cellVal.includes(_this.localeObj.dateSeparator) || cellVal.indexOf('-') > 0 || cellVal.includes(_this.localeObj.timeSeparator)) {
                return true;
            }
            var formats = IntlBase.getDependables(cldrData, _this.parent.locale, null).dateObject;
            var months = formats.months['stand-alone'] && formats.months['stand-alone'].abbreviated;
            return months && !!Object.keys(months).find(function (key) { return cellVal.includes(months["" + key]); });
        };
        if (!isNumber(cell.value)) {
            isCustomDate = checkCustomDate();
            if (!isCustomDate) {
                return this.processCustomText(cell, args, formatSections);
            }
        }
        else if (formatSections.length > 1 && parseFloat(cell.value) <= 0) {
            args.formatApplied = this.processCustomAccounting(cell, args, formatSections);
            if (args.formatApplied) {
                return args.result;
            }
        }
        var type;
        var custFormat = formatSections[0];
        var intl = new Internationalization();
        var formatDateTime = function (checkDate) {
            var isValidDate;
            var dateArgs;
            if (isCustomDate) {
                var noOfDays = void 0;
                if (cell.format.includes('[h]')) {
                    var timeArr = cell.value.toString().split(':');
                    if (timeArr.length > 1 && Number(timeArr[0]) >= 24) {
                        noOfDays = Number(timeArr[0]) / 24;
                        timeArr[0] = '24';
                        cell.value = timeArr.join(':');
                    }
                }
                dateArgs = toDate(cell.value, new Internationalization(), _this.parent.locale, custFormat, cell);
                isValidDate = dateArgs.dateObj && dateArgs.dateObj.toString() !== 'Invalid Date';
                if (isValidDate) {
                    if (dateArgs.dateObj.getFullYear() < 1900) {
                        return '';
                    }
                    else {
                        var dateIntVal = dateToInt(dateArgs.dateObj, cell.value.toString().includes(':'), dateArgs.type === 'time');
                        if (noOfDays >= 1) {
                            dateIntVal += noOfDays;
                            dateArgs.dateObj = intToDate(dateIntVal);
                        }
                        cell.value = dateIntVal.toString();
                    }
                }
            }
            else {
                if (_this.checkAndProcessNegativeValue(args, cell.value)) {
                    args.formatApplied = true;
                    return args.formattedText;
                }
                dateArgs = { dateObj: intToDate(parseFloat(cell.value)) };
                isValidDate = dateArgs.dateObj && dateArgs.dateObj.toString() !== 'Invalid Date';
            }
            if (isValidDate) {
                if (checkDate && isDate) {
                    args.dateObj = dateArgs.dateObj;
                }
                args.formatApplied = true;
                var result = void 0;
                if (custFormat.startsWith('MM-dd-yyyy ')) { // While auto detect date time value, we will set this format only.
                    custFormat = custFormat.split(' ').splice(1).join(' ');
                    result = intl.formatDate(dateArgs.dateObj, { type: 'date', skeleton: 'yMd' }) + (custFormat ? ' ' +
                        intl.formatDate(dateArgs.dateObj, { type: type, format: custFormat }) : '');
                }
                else {
                    result = intl.formatDate(dateArgs.dateObj, { type: type, format: custFormat });
                    custFormat = custFormat.toLowerCase();
                    if (custFormat.startsWith('[h]')) {
                        var totalHours = (Number(cell.value.toString().split('.')[0]) * 24) + dateArgs.dateObj.getHours();
                        result = totalHours.toString() + result.slice(result.indexOf(']') + 1);
                    }
                    else if (custFormat.startsWith('[m')) {
                        var totalMins = (Number(cell.value.toString().split('.')[0]) * 1440) + (dateArgs.dateObj.getHours() * 60)
                            + dateArgs.dateObj.getMinutes();
                        result = totalMins.toString() + result.slice(result.indexOf(']') + 1);
                    }
                    else if (custFormat.startsWith('[s')) {
                        result = ((Number(cell.value.toString().split('.')[0]) * 86400) + (((dateArgs.dateObj.getHours() * 60) +
                            dateArgs.dateObj.getMinutes()) * 60) + dateArgs.dateObj.getSeconds()).toString();
                    }
                }
                if (isShortMeridian) {
                    return result.replace(_this.localeObj.am, 'A').replace(_this.localeObj.pm, 'P');
                }
                return result;
            }
            return '';
        };
        custFormat = custFormat.split('_(').join(' ').split('_)').join(' ');
        if (cell.format.indexOf('h') > -1) {
            custFormat = custFormat.split('h').join('H');
            type = 'time';
        }
        if (cell.format.indexOf('s') > -1) {
            type = 'time';
        }
        var isShortMeridian = cell.format.indexOf('A/P') > -1;
        if (cell.format.indexOf('AM/PM') > -1 || isShortMeridian) {
            custFormat = custFormat.split('H').join('h');
            custFormat = custFormat.split('A/P').join('AM/PM').split('AM/PM').join('a');
            type = 'time';
        }
        if (cell.format.indexOf('d') > -1) {
            type = 'date';
            // Split the format with ' ' for replacing d with E only for a day of the week in the MMM d, yyyy ddd format
            var formatArr = custFormat.split(' ');
            var dayMatchStr = void 0;
            var splitFormat = void 0;
            var part = void 0;
            var separator = void 0;
            for (var formatIdx = 0; formatIdx < formatArr.length; formatIdx++) {
                separator = formatArr[formatIdx].includes(this.localeObj.dateSeparator) ? this.localeObj.dateSeparator : '-';
                splitFormat = formatArr[formatIdx].split(separator);
                for (var index = 0; index < splitFormat.length; index++) {
                    part = splitFormat[index];
                    dayMatchStr = part.match(/d/g);
                    if (dayMatchStr && dayMatchStr.length > 2) {
                        splitFormat[index] = part.split('d').join('E');
                    }
                }
                formatArr[formatIdx] = splitFormat.join(separator);
            }
            custFormat = formatArr.join(' ');
        }
        if (cell.format.indexOf('m') > -1) {
            if (cell.format.indexOf('s') > -1 || cell.format.indexOf('h') > -1) {
                type = 'time';
                if (cell.format.includes(' ')) {
                    var formatArr = custFormat.split(' ');
                    if (formatArr[0].includes('d') || formatArr[0].includes('y')) {
                        formatArr[0] = formatArr[0].split('m').join('M');
                        custFormat = formatArr.join(' ');
                    }
                }
            }
            else {
                type = 'date';
                custFormat = custFormat.split('m').join('M');
                if (custFormat.includes('MMMMM')) {
                    var prevFormat = custFormat;
                    custFormat = 'MMMM';
                    var monthName = formatDateTime()[0];
                    custFormat = prevFormat.split('MMMMM').join('p');
                    return formatDateTime(args.checkDate).split('p').join(monthName);
                }
            }
        }
        return formatDateTime(args.checkDate);
    };
    WorkbookNumberFormat.prototype.processCustomConditions = function (cell, args) {
        if (isNumber(cell.value)) {
            var formatArr = cell.format.split(';');
            var val = Number(cell.value);
            var compareVal = void 0;
            var conditionNotMatch = void 0;
            var colorCode = void 0;
            for (var i = 0; i < formatArr.length; i++) {
                cell.format = formatArr[i];
                colorCode = getColorCode(cell.format);
                if (colorCode) {
                    cell.format = cell.format.split("[" + colorCode + "]").join('');
                }
                if (cell.format.includes('[')) {
                    compareVal = cell.format.split('[')[1].split(']')[0];
                    var ltEqualTo = compareVal.split('<=');
                    var gtEqualTo = compareVal.split('>=');
                    var lessThan = compareVal.split('<');
                    var greaterThan = compareVal.split('>');
                    if ((ltEqualTo.length === 2 && val <= Number(ltEqualTo[1])) ||
                        (gtEqualTo.length === 2 && val >= Number(gtEqualTo[1])) ||
                        (lessThan.length === 2 && val < Number(lessThan[1])) ||
                        (greaterThan.length === 2 && val > Number(greaterThan[1]))) {
                        cell.format = formatArr[i].split("[" + compareVal + "]").join('');
                        conditionNotMatch = false;
                        break;
                    }
                    conditionNotMatch = compareVal.split(/<=|>=|<|>/).length === 2;
                }
                else {
                    cell.format = formatArr[i];
                    conditionNotMatch = false;
                    break;
                }
            }
            if (conditionNotMatch) {
                this.removeFormatColor(args, { format: formatArr.join(''), style: cell.style });
                return this.processCustomFill('*#', cell, args, '#####');
            }
            return this.processCustomNumberFormat(cell, args);
        }
        else {
            return cell.value;
        }
    };
    WorkbookNumberFormat.prototype.processCustomAccounting = function (cell, args, formats, format) {
        var cellVal = parseFloat(cell.value);
        if (cellVal < 0) {
            if (!formats[1].includes('@')) {
                format = formats[1];
            }
        }
        else if (cellVal === 0 && formats[2] && !formats[2].includes('@')) {
            format = formats[2].includes(args.curSymbol + "0") ? formats[2].split('0').join('#') : formats[2];
        }
        if (format) {
            args.result = this.processCustomNumberFormat({
                format: cell.format, value: cellVal < 0 ? Math.abs(cellVal).toString() : cell.value, style: cell.style
            }, args, format);
            return true;
        }
        return false;
    };
    WorkbookNumberFormat.prototype.processCustomText = function (cell, args, formatSections) {
        var cellVal = cell.value || cell.value ? cell.value.toString() : '';
        var format;
        if (formatSections) {
            if (formatSections[3]) {
                format = formatSections[3];
            }
            else if (formatSections[1] && formatSections[1].includes('@')) {
                format = formatSections[1];
            }
            else {
                return cellVal;
            }
        }
        else {
            format = cell.format;
        }
        var result = this.processCustomNumberFormat({ format: format.split('@').join('#'), value: cellVal.split(cellVal).join('1') }, args);
        if (result) {
            result = result.split('1').join(cellVal);
            if (this.localeObj.decimal !== '.' && isNumber(result) && result.includes('.')) {
                result = result.replace('.', this.localeObj.decimal);
            }
        }
        return result;
    };
    WorkbookNumberFormat.prototype.thousandSeparator = function (count, value) {
        while (count) {
            value = value / 1000;
            count--;
        }
        return value;
    };
    WorkbookNumberFormat.prototype.getSeparatorCount = function (cell) {
        var count = 0;
        var codes = ['#', '0'];
        for (var i = 0; i < cell.format.length; i++) {
            if (cell.format[i] === '"' && cell.format[i - 1] !== '\\') {
                i = cell.format.indexOf('"', i + 1);
            }
            else if (cell.format[i] === ',' && !(codes.indexOf(cell.format[i + 1]) > -1)) {
                count++;
            }
        }
        return count;
    };
    WorkbookNumberFormat.prototype.processDigits = function (cell, customFormat) {
        customFormat = customFormat.split('?').join('0');
        var cellValue = cell.value.toString();
        cellValue = this.getFormattedNumber(customFormat, parseFloat(cellValue));
        if (cellValue && cellValue.includes(this.localeObj.decimal)) {
            var valArr = cellValue.split(this.localeObj.decimal);
            cellValue = valArr[0] + this.localeObj.decimal + valArr[1].split('0').join('  ');
        }
        return cellValue || cell.value;
    };
    WorkbookNumberFormat.prototype.processFormatWithSpace = function (format, cell, cellValue) {
        var space = ' ';
        var args = { cell: cell, char: space, width: 0 };
        this.parent.notify(getTextSpace, args);
        var spaceWidth = args.width;
        var count;
        var result = { format: format, formattedText: '' };
        for (var i = 0; i < format.length; i++) {
            if (format[i] === '_') {
                args.char = format[i + 1];
                this.parent.notify(getTextSpace, args);
                var textWidth = args.width;
                count = Math.round(textWidth / spaceWidth);
                format = format.replace(format[i] + format[i + 1], space.repeat(count));
            }
        }
        var lastSpaceCount = format.length - format.trim().length;
        if (lastSpaceCount > 0) {
            result.formattedText = this.getFormattedNumber(format.trim(), cellValue);
            if (format[0] === ' ') {
                var frontSpaceCount = 1;
                var idx = 1;
                while (format[idx] === ' ') {
                    frontSpaceCount++;
                    idx++;
                }
                lastSpaceCount -= frontSpaceCount;
                result.formattedText = space.repeat(frontSpaceCount) + result.formattedText;
            }
            result.formattedText += space.repeat(lastSpaceCount);
        }
        else {
            result.formattedText = this.getFormattedNumber(format, cellValue);
        }
        result.format = format;
        return result;
    };
    WorkbookNumberFormat.prototype.removeFormatColor = function (args, cell) {
        if (getCustomColors().indexOf(getColorCode(cell.format)) > -1) {
            args.color = cell.style && cell.style.color ? cell.style.color : '';
            this.applyColor(args);
        }
    };
    WorkbookNumberFormat.prototype.processCustomNumberFormat = function (cell, args, format) {
        if (!cell.format) {
            return '';
        }
        var formattedText = cell.value;
        var numArgs = checkIsNumberAndGetNumber(cell, this.parent.locale, this.localeObj.group, this.localeObj.decimal);
        if (numArgs.isNumber) {
            var isFormatted = void 0;
            var isZeroFormat = void 0;
            cell.value = numArgs.value;
            var cellValue = parseFloat(cell.value.toString());
            var customFormat = format || cell.format;
            if (cell.format.indexOf('[') > -1) {
                var colorCode = getColorCode(customFormat);
                if (colorCode) {
                    customFormat = customFormat.split("[" + colorCode + "]").join('');
                    args.color = colorCode.toLowerCase();
                    this.applyColor(args);
                }
                else {
                    this.removeFormatColor(args, cell);
                }
            }
            if (customFormat.indexOf('"') > -1 || customFormat.indexOf('\\') > -1) {
                customFormat = this.processText(customFormat);
                isZeroFormat = cellValue === 0 && !customFormat.includes('#') && !customFormat.includes('0');
                if (isZeroFormat) {
                    customFormat += '#';
                }
            }
            var separatorCount = this.getSeparatorCount(cell);
            if (separatorCount) {
                isFormatted = true;
                var result = this.thousandSeparator(separatorCount, cellValue);
                if (customFormat.indexOf('.') === -1) {
                    result = Math.round(result);
                }
                formattedText = this.getFormattedNumber(customFormat.split(',').join(''), result);
                if (result === 0) {
                    formattedText = formattedText.replace('0', '');
                }
            }
            if (customFormat.indexOf('?') > -1) {
                isFormatted = true;
                formattedText = this.processDigits(cell, customFormat);
                customFormat = customFormat.split('?').join('');
            }
            if (customFormat.indexOf('_') > -1) {
                isFormatted = true;
                var result = this.processFormatWithSpace(customFormat, cell, cellValue);
                customFormat = result.format;
                formattedText = result.formattedText;
            }
            if (formattedText && customFormat.indexOf('?') > -1) {
                formattedText = formattedText.replace('?', ' ');
            }
            if (customFormat.indexOf('*') > -1) {
                isFormatted = true;
                formattedText = this.processCustomFill(customFormat, cell, args);
            }
            if (customFormat === 'General') {
                isFormatted = true;
                formattedText = cellValue.toString();
            }
            if (!isFormatted) {
                formattedText = this.getFormattedNumber(customFormat, cellValue);
            }
            if (isZeroFormat && formattedText) {
                formattedText = formattedText.replace('0', '');
            }
            // Need to remove this line once this case is handled by core team.
            if (customFormat[0] === '#' && cellValue >= 0 && cellValue < 1) {
                var formatArr = customFormat.split('#').join('').split('.');
                if (!formatArr[0].includes('0')) {
                    if (cellValue === 0 && customFormat.includes('.') && (!formatArr[1] || !formatArr[1].includes('0'))) {
                        formattedText = this.getFormattedNumber(customFormat, 0.1);
                        formattedText = formattedText.replace('1', '');
                    }
                    var textArr = formattedText.split(this.localeObj.decimal);
                    textArr[0] = textArr[0].toString().replace(/^0+/, '');
                    formattedText = textArr.join(this.localeObj.decimal);
                }
            }
            if (formattedText === '-0') { // Need to remove this line once this case is handled by core team.
                formattedText = '0';
            }
        }
        return formattedText;
    };
    WorkbookNumberFormat.prototype.processText = function (format) {
        var custFormat = format;
        if (custFormat.indexOf('"') > -1) {
            custFormat = custFormat.split('"').join('\'');
        }
        else if (custFormat.indexOf('\\') > -1) {
            custFormat = custFormat.split('\\').join('');
        }
        return custFormat;
    };
    WorkbookNumberFormat.prototype.processFormats = function (args, fResult, isRightAlign, cell, intl, sheet) {
        var options;
        if (this.parent.isEdit && (args.type === 'Scientific' && !isNumber(args.value))) {
            args.type = 'General';
        }
        if (fResult !== '') {
            var numArgs = void 0;
            if (args.type !== 'General' && args.type !== 'Text' && this.isPercentageValue(fResult.toString(), args, cell)) {
                fResult = args.value.toString();
            }
            switch (args.type) {
                case 'General':
                    options = { args: args, fResult: fResult, intl: intl, isRightAlign: isRightAlign,
                        cell: cell, rowIdx: Number(args.rowIndex), colIdx: Number(args.colIndex), sheet: sheet };
                    if (!(options.fResult.toString().startsWith('\n') || options.fResult.toString().endsWith('\n '))) {
                        this.autoDetectGeneralFormat(options);
                    }
                    fResult = options.fResult;
                    isRightAlign = options.isRightAlign;
                    break;
                case 'Number':
                    numArgs = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal, args.curSymbol, true, true);
                    if (numArgs.isNumber) {
                        cell.value = args.value = numArgs.value;
                        fResult = this.applyNumberFormat(args, intl);
                        isRightAlign = true;
                    }
                    break;
                case 'Currency':
                    numArgs = checkIsNumberAndGetNumber({ value: fResult, format: args.format }, this.parent.locale, this.localeObj.group, this.localeObj.decimal, args.curSymbol);
                    if (numArgs.isNumber) {
                        cell.value = args.value = numArgs.value;
                        fResult = this.currencyFormat(args, intl, cell);
                        isRightAlign = true;
                    }
                    break;
                case 'Percentage':
                    numArgs = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal, args.curSymbol, true, true);
                    if (numArgs.isNumber) {
                        cell.value = args.value = numArgs.value;
                        fResult = this.percentageFormat(args, intl);
                        isRightAlign = true;
                    }
                    break;
                case 'Accounting':
                    fResult = this.accountingFormat(args, fResult, intl, cell);
                    isRightAlign = args.formatApplied;
                    break;
                case 'ShortDate':
                    fResult = this.checkAndProcessNegativeValue(args, args.value) ? args.formattedText : this.shortDateFormat(args, intl, cell);
                    isRightAlign = !!fResult;
                    break;
                case 'LongDate':
                    fResult = this.checkAndProcessNegativeValue(args, args.value) ? args.formattedText : this.longDateFormat(args, intl);
                    isRightAlign = !!fResult;
                    break;
                case 'Time':
                    fResult = this.checkAndProcessNegativeValue(args, args.value) ? args.formattedText : this.timeFormat(args, intl, cell);
                    isRightAlign = !!fResult;
                    break;
                case 'Fraction':
                    numArgs = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal, null, true);
                    if (numArgs.isNumber) {
                        cell.value = args.value = numArgs.value;
                        fResult = this.fractionFormat(args);
                        isRightAlign = true;
                    }
                    break;
                case 'Scientific':
                    numArgs = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal);
                    if (numArgs.isNumber) {
                        cell.value = args.value = numArgs.value;
                        fResult = this.scientificFormat(args);
                        isRightAlign = true;
                    }
                    break;
                case 'Text':
                    if (this.localeObj.decimal !== '.' && isNumber(fResult) && fResult.toString().includes('.')) {
                        fResult = fResult.toString().replace('.', this.localeObj.decimal);
                    }
                    isRightAlign = false;
                    break;
            }
        }
        return { fResult: fResult, rightAlign: isRightAlign };
    };
    WorkbookNumberFormat.prototype.autoDetectGeneralFormat = function (options) {
        var val = options.fResult;
        var prevVal;
        var addressFormula = options.args.cell && options.args.cell.formula && options.args.cell.formula.indexOf('ADDRESS(') > 0;
        var isDollarFormula = options.args.cell && options.args.cell.formula && options.args.cell.formula.indexOf('DOLLAR(') > 0;
        var isTextFormula = options.args.cell && options.args.cell.formula && options.args.cell.formula.indexOf('TEXT(') > 0;
        if (isDollarFormula && options.fResult && options.fResult.toString().includes(options.args.curSymbol) || isTextFormula) {
            return;
        }
        if (options.fResult && this.localeObj.decimal !== '.') {
            var cellVal = options.fResult.toString();
            prevVal = cellVal;
            if (cellVal.includes(this.localeObj.decimal)) {
                cellVal = cellVal.replace(this.localeObj.decimal, '.');
                if (isNumber(cellVal)) {
                    if (cellVal.includes('E')) {
                        options.fResult = cellVal;
                    }
                    else {
                        options.fResult = options.args.value = cellVal = Number(cellVal).toString();
                        setCell(options.rowIdx, options.colIdx, options.sheet, { value: cellVal }, true);
                    }
                    prevVal = cellVal.replace('.', this.localeObj.decimal);
                }
            }
        }
        if (isNumber(options.fResult)) {
            var cellVal = Number(options.fResult).toString();
            if (options.fResult.toString().includes('E')) {
                options.args.format = getFormatFromType('Scientific');
                setCell(options.rowIdx, options.colIdx, options.sheet, { value: cellVal, format: options.args.format }, true);
                options.args.value = cellVal;
                options.fResult = this.scientificFormat(options.args);
            }
            else if (options.args.format) {
                if (options.args.format.indexOf('%') > -1) {
                    options.fResult = this.percentageFormat(options.args, options.intl);
                }
                else if (options.args.format.indexOf(options.args.curSymbol) > -1) {
                    options.fResult = this.currencyFormat(options.args, options.intl, options.args.cell);
                }
                else {
                    options.fResult = this.applyNumberFormat(options.args, options.intl);
                }
            }
            if (options.args.format === 'General') {
                if (options.args.cell && options.args.cell.formula && cellVal.includes('.') && cellVal.length > 11) {
                    var decIndex = cellVal.indexOf('.') + 1;
                    prevVal = null;
                    if (options.args.cell.formula.includes('RANDBETWEEN')) {
                        options.fResult = cellVal = decIndex < 7 ? cellVal : (parseFloat(cellVal)).toFixed(0);
                    }
                }
                options.cellVal = cellVal;
                options.prevVal = prevVal;
                this.parseDecimalNumber(options);
                if (isNullOrUndefined(options.fResult) && !isNullOrUndefined(options.cellVal)) {
                    options.fResult = options.cellVal;
                }
            }
            options.isRightAlign = true;
        }
        if (options.fResult) {
            this.updateAutoDetectNumberFormat(options);
        }
        if (addressFormula) {
            options.isRightAlign = false;
            options.fResult = val;
        }
    };
    WorkbookNumberFormat.prototype.parseDecimalNumber = function (options) {
        var cellValArr = options.cellVal.split('.');
        if (cellValArr[0].length > 11) {
            options.cellVal = (Math.abs(Number(cellValArr[0])).toString()).substring(0, 6).replace(/0+$/, '');
            var digitLen = options.cellVal.length - 1;
            if (digitLen > -1) {
                options.fResult = this.scientificFormat(options.args, digitLen > 5 ? 5 : digitLen);
            }
        }
        else if (cellValArr[1]) {
            if (options.cellVal.length > 11) {
                // Subtract with 10 to neglect the decimal point.
                var rightDigitLen = 10 - (cellValArr[0].length - (Math.sign(Number(options.cellVal)) < 0 ? 1 : 0));
                options.fResult = Number(Number(options.cellVal).toFixed(rightDigitLen > 0 ? rightDigitLen : 0)).toString();
            }
            else if (options.cellVal.includes('e-')) {
                var expVal = options.cellVal.split('e-');
                var digitLen = Number(expVal[1]) + (expVal[0].includes('.') ? expVal[0].split('.')[1].length : 0);
                expVal[0] = expVal[0].replace('.', this.localeObj.decimal);
                if (expVal[1].length === 1) {
                    expVal[1] = '0' + expVal[1];
                }
                if (!options.args.updateValue) {
                    setCell(options.rowIdx, options.colIdx, options.sheet, { value: Number(options.cellVal).toFixed(digitLen) }, true);
                }
                options.fResult = expVal.join('E-');
            }
            else if (options.prevVal) {
                options.fResult = options.prevVal;
            }
            else if (options.args.updateValue && this.localeObj.decimal !== '.') {
                options.fResult = options.cellVal.replace('.', this.localeObj.decimal);
            }
        }
    };
    WorkbookNumberFormat.prototype.updateAutoDetectNumberFormat = function (options) {
        var res = options.fResult.toString();
        var cell = options.args.cell || options.cell;
        if (this.isPercentageValue(res, options.args, cell)) {
            cell.format = res.includes(this.localeObj.decimal) ? getFormatFromType('Percentage') : '0%';
            if (!options.args.updateValue) {
                options.args.format = cell.format;
                options.fResult = this.percentageFormat(options.args, options.intl);
                options.isRightAlign = true;
            }
        }
        else {
            var fractionArr = res ? res.toString().split('/') : [];
            var isFraction = (this.parent.isEdit && getTypeFromFormat(cell.format) === 'Scientific' && fractionArr.length === 2 && isNumber(fractionArr[0]) && isNumber(fractionArr[1]));
            if (res.includes(' ') || isFraction) {
                var valArr = isFraction ? fractionArr : res.split(' ');
                if (isFraction || valArr[1].includes('/') && isNumber(valArr[0]) && Number(valArr[0]) % 1 === 0) {
                    var fracArr = isFraction ? fractionArr : valArr[1].split('/');
                    if (isNumber(fracArr[0]) && Number(fracArr[0]) % 1 === 0 && isNumber(fracArr[1]) && Number(fracArr[1]) % 1 === 0) {
                        cell.format = "# " + (fracArr[0].length > 1 || fracArr[1].length > 1 ? '??/??' : '?/?');
                        cell.value = isFraction ? (Number(fracArr[0]) / Number(fracArr[1])).toString() :
                            (Number(valArr[0]) + (Number(fracArr[0]) / Number(fracArr[1]))).toString();
                        if (!options.args.updateValue) {
                            options.args.value = cell.value;
                            options.args.format = cell.format;
                            options.fResult = this.fractionFormat(options.args);
                            options.isRightAlign = true;
                        }
                        return;
                    }
                }
            }
            var format = '';
            if (res.includes(options.args.curSymbol)) { // Auto detect 1000 separator format with currency symbol
                format = res.includes(this.localeObj.decimal) ? numberFormatsCode.currency[0] : numberFormatsCode.currency[1];
                res = res.replace(options.args.curSymbol, '');
            }
            var isEdit = this.localeObj.decimal === '.' || (options.args.isEdit && !cell.formula);
            if (isEdit && res.includes(this.localeObj.group) &&
                parseThousandSeparator(res, this.parent.locale, this.localeObj.group, this.localeObj.decimal)) {
                res = res.split(this.localeObj.group).join('');
                if (!format) { // Auto detect 1000 separator format
                    format = (res.includes(this.localeObj.decimal) ? '#,##0.00' : '#,##0');
                }
            }
            if (format) {
                res = res.replace(this.localeObj.decimal, '.');
                if (isNumber(res)) {
                    options.args.value = Number(res).toString();
                    if (options.args.updateValue) {
                        options.args.cell.value = options.args.value;
                        options.args.cell.format = format;
                    }
                    else {
                        options.args.format = format;
                        setCell(options.rowIdx, options.colIdx, options.sheet, { value: options.args.value, format: format }, true);
                        if (format.includes('"')) {
                            format = this.processText(format);
                        }
                        options.fResult = this.getFormattedNumber(format, Number(options.args.value));
                        options.isRightAlign = true;
                    }
                }
            }
            else if (this.localeObj.decimal !== '.' && options.args.format === 'General' && isNumber(res) && res.includes('.')) {
                options.fResult = Number(res).toString().replace('.', this.localeObj.decimal);
            }
        }
    };
    WorkbookNumberFormat.prototype.isPercentageValue = function (value, args, cell) {
        if (value.includes('%')) {
            var valArr = value.split('%');
            if (valArr[0] !== '' && valArr[1].trim() === '') {
                var numArgs = checkIsNumberAndGetNumber({ value: valArr[0] }, this.parent.locale, this.localeObj.group, this.localeObj.decimal);
                if (numArgs.isNumber) {
                    args.value = Number(numArgs.value) / 100;
                    cell.value = args.value.toString();
                    return true;
                }
            }
        }
        return false;
    };
    WorkbookNumberFormat.prototype.findSuffix = function (zeros, resultSuffix) {
        var len = zeros.length;
        var suffixLen = len - resultSuffix.length;
        return zeros.substr(0, suffixLen < 0 ? 0 : suffixLen) + resultSuffix;
    };
    WorkbookNumberFormat.prototype.applyNumberFormat = function (args, intl) {
        args.format = this.isCustomFormat(args.format);
        var formatArr = args.format.split(';');
        if (Number(args.value) > 0) {
            args.format = formatArr[0];
        }
        else if (Number(args.value) === 0) {
            args.format = formatArr[2] ? formatArr[2] : formatArr[0];
            if (args.format.indexOf('"') > -1 && args.format.indexOf('#') === -1) {
                args.format = args.format.split('_').join(' ').split('*').join(' ').split('?').join(' ').split('"').join('');
                return args.format;
            }
        }
        else if (Number(args.value) < 0) {
            args.format = !isNullOrUndefined(formatArr[1]) ? formatArr[1].split('*').join(' ') : formatArr[0];
            if (args.format.indexOf('-') > -1) {
                args.value = args.value.toString().split('-').join('');
            }
        }
        else {
            args.format = formatArr[3] ? formatArr[3] : formatArr[0];
            args.format = args.format.split('_').join(' ').split('*').join(' ').split('?').join(' ');
            if (args.format.indexOf('@') > -1) {
                return args.format.split('@').join(args.value.toString());
            }
        }
        args.format = args.format.split('_').join(' ').split('*').join(' ').split('"').join('');
        if (args.format.indexOf('?') > -1 && args.format.indexOf(this.localeObj.decimal) > -1) {
            var formatDecimalLen = args.format.split(this.localeObj.decimal)[1].length;
            var replaceString = '';
            if (Number(args.value) % 1) {
                var valueDecimalLen = args.value.toString().split('.')[1].length;
                if (formatDecimalLen > valueDecimalLen) {
                    replaceString = ' ';
                }
                else {
                    replaceString = '0';
                }
            }
            args.format = args.format.split('?').join(replaceString);
        }
        else {
            args.format = args.format.split('?').join(' ');
        }
        if (Number(args.value) < 0 && args.cell && args.cell.format) {
            args.format = args.cell.format;
        }
        return intl.formatNumber(Number(args.value), { format: args.format });
    };
    WorkbookNumberFormat.prototype.isCustomFormat = function (format) {
        if (format === '_-* #,##0.00_-;-* #,##0.00_-;_-* "-"_-;_-@_-' || format === '_-* #,##0_-;-* #,##0_-;_-* "-"_-;_-@_-') {
            format = '';
        }
        format = format === '' ? getFormatFromType('Number') : format;
        format = format.toString().split('_)').join(' ').split('_(').join(' ').split('[Red]').join('');
        return format;
    };
    WorkbookNumberFormat.prototype.currencyFormat = function (args, intl, cell) {
        args.format = args.format || getFormatFromType('Currency');
        args.format = args.format.split('_(').join(' ').split('_)').join(' ');
        var formatArr = args.format.split(';');
        var colorCode = getColorCode(args.format);
        var cellVal = Number(args.value);
        if (cellVal >= 0 || isNullOrUndefined(formatArr[1])) {
            if (colorCode) {
                args.color = cell.style && cell.style.color ? cell.style.color : '';
                this.applyColor(args);
            }
            args.format = formatArr[0];
        }
        else {
            cellVal = Math.abs(cellVal);
            args.format = formatArr[1].split("[" + colorCode + "]").join('').split('*').join(' ');
            if (colorCode) {
                args.color = colorCode.toLowerCase();
                this.applyColor(args);
            }
        }
        args.format = this.getFormatForOtherCurrency(args.format);
        if (args.format.includes('"')) {
            args.format = this.processText(args.format);
        }
        return intl.formatNumber(cellVal, { format: args.format, currency: defaultCurrencyCode });
    };
    WorkbookNumberFormat.prototype.applyColor = function (args) {
        if (args.refresh) {
            this.setCell(args);
            if (args.td && args.td.style.color !== args.color) {
                this.parent.notify(applyCellFormat, { style: { color: args.color }, rowIdx: args.rowIndex, colIdx: args.colIndex,
                    td: args.td });
            }
        }
    };
    WorkbookNumberFormat.prototype.setCell = function (args) {
        if (!args.td) {
            var mergeArgs = {
                sheet: getSheet(this.parent, args.sheetIndex),
                cell: args.cell, rowIdx: args.rowIndex, colIdx: args.colIndex
            };
            if (args.cell.rowSpan > 1 || args.cell.colSpan > 1) {
                setVisibleMergeIndex(mergeArgs);
            }
            args.td = this.parent.getCell(mergeArgs.rowIdx, mergeArgs.colIdx);
        }
    };
    WorkbookNumberFormat.prototype.percentageFormat = function (args, intl) {
        args.format = args.format === '' ? getFormatFromType('Percentage') : args.format;
        return intl.formatNumber(Number(args.value), {
            format: args.format
        });
    };
    WorkbookNumberFormat.prototype.accountingFormat = function (args, fResult, intl, cell) {
        args.format = args.format || getFormatFromType('Accounting');
        args.format = args.format.split('_(').join(' ').split('_)').join(' ').split('[Red]').join('').split('_').join('');
        var formatArr = args.format.split(';');
        var numArgs = checkIsNumberAndGetNumber({ value: fResult }, this.parent.locale, this.localeObj.group, this.localeObj.decimal, args.curSymbol, false, true);
        if (numArgs.isNumber) {
            cell.value = args.value = numArgs.value;
            var cellVal = Number(args.value);
            if (cellVal >= 0) {
                args.format = cellVal === 0 && formatArr[2] ? formatArr[2] : formatArr[0];
            }
            else {
                args.format = formatArr[1].split('*').join(' ');
                cellVal = Math.abs(cellVal);
            }
            if (args.format.includes(args.curSymbol)) {
                if (args.format.includes('"')) {
                    args.format = this.processText(args.format);
                }
            }
            args.format = this.getFormatForOtherCurrency(args.format);
            args.formatApplied = true;
            if (cellVal === 0) {
                args.format = this.processText(args.format.split('*').join(' ').split('?').join(' '));
                if (!args.format.includes('#') && !args.format.includes('0')) {
                    args.format += '#';
                    var formattedText = intl.formatNumber(cellVal, { format: args.format, currency: defaultCurrencyCode });
                    if (formattedText.includes('0')) {
                        formattedText = formattedText.replace('0', '');
                    }
                    return args.dataUpdate ? formattedText.split(' ').join('') : formattedText;
                }
                var result = intl.formatNumber(cellVal, { format: args.format, currency: defaultCurrencyCode });
                return args.dataUpdate ? result.split(' ').join('') : result;
            }
            else {
                var result = intl.formatNumber(cellVal, { format: args.format, currency: defaultCurrencyCode });
                return args.dataUpdate ? result.split(' ').join('') : result;
            }
        }
        else if (formatArr[3]) {
            return this.processCustomText(cell, args, formatArr);
        }
        return fResult;
    };
    WorkbookNumberFormat.prototype.getFormatForOtherCurrency = function (format) {
        if (format.indexOf('[$') > -1) {
            var symbol = format.split(']')[0].split('[$')[1].split('-')[0];
            if (format.indexOf('0') > format.indexOf('[$')) {
                format = symbol + format.slice(format.indexOf(']') + 1, format.length);
            }
            else {
                format = format.slice(0, format.indexOf('[$')) + symbol;
            }
        }
        return format;
    };
    WorkbookNumberFormat.prototype.checkAndProcessNegativeValue = function (args, cellValue) {
        if (cellValue && isNumber(cellValue) && Number(cellValue) < 0) {
            if (args.rowIndex === undefined || args.dataUpdate) {
                args.formattedText = '#'.repeat(args.dataUpdate ? 7 : 10);
                return true;
            }
            args.isRowFill = true;
            this.setCell(args);
            var eventArgs = { cell: args.cell, cellEle: args.td, rowIdx: args.rowIndex, colIdx: args.colIndex,
                repeatChar: '#' };
            this.parent.notify(rowFillHandler, eventArgs);
            args.formattedText = eventArgs.formattedText;
            return true;
        }
        return false;
    };
    WorkbookNumberFormat.prototype.shortDateFormat = function (args, intl, cell) {
        var dateObj;
        if (defaultFormats && isImported(this.parent) && cell && cell.format === 'm/d/yyyy' && defaultFormats.has(14)) {
            cell.format = args.format = defaultFormats.get(14);
        }
        var format;
        if (args.format === '' || args.format === 'General' || args.format === 'mm-dd-yyyy' || args.format === 'm/d/yyyy') {
            format = 'MM-dd-yyyy';
            dateObj = { type: 'date', skeleton: 'yMd' };
        }
        else {
            format = args.format;
            if (args.format === getFormatFromType('ShortDate')) {
                dateObj = { type: 'date', skeleton: 'yMd' };
            }
            else {
                dateObj = { type: 'date', format: args.format };
            }
        }
        var shortDate;
        args.value = args.value.toString();
        var checkForDateFormat = this.checkForDateFormat(args, cell);
        if (args.value && cell && (!isNumber(args.value) || checkForDateFormat)) {
            var dateArgs = {
                value: args.value, updatedVal: args.value, cell: cell, isEdit: args.isEdit, intl: intl,
                skipCellFormat: true, format: format
            };
            this.checkDateFormat(dateArgs);
            if (dateArgs.isDate || dateArgs.isTime) {
                cell.value = args.value = dateArgs.updatedVal;
                shortDate = dateArgs.dateObj;
            }
            else if (checkForDateFormat) {
                shortDate = intToDate(args.value);
            }
            else {
                return '';
            }
        }
        else {
            shortDate = intToDate(args.value);
        }
        if (!shortDate || shortDate.toString() === 'Invalid Date') {
            return '';
        }
        else if (shortDate.getFullYear() < 1900 || shortDate.getFullYear() > 9999) {
            return isNumber(args.value) ? args.value.toString() : '';
        }
        if (args.checkDate) {
            args.dateObj = shortDate;
        }
        return intl.formatDate(shortDate, dateObj);
    };
    WorkbookNumberFormat.prototype.longDateFormat = function (args, intl) {
        args.value = args.value.toString();
        var longDate;
        var checkForDateFormat = this.checkForDateFormat(args, args.cell);
        if ((args.value.includes(this.localeObj.dateSeparator) || args.value.indexOf('-') > 0) && (!isNumber(args.value)
            || checkForDateFormat)) {
            if (checkForDateFormat) {
                var dateEventArgs = {
                    value: args.value, updatedVal: args.value, cell: args.cell, isEdit: args.isEdit,
                    intl: intl
                };
                this.checkDateFormat(dateEventArgs);
                if (dateEventArgs.isDate || dateEventArgs.isTime) {
                    longDate = dateEventArgs.dateObj;
                    args.cell.value = args.value = dateToInt(longDate).toString();
                }
                else {
                    longDate = intToDate(args.value);
                }
            }
            else {
                longDate = toDate(args.value, intl, this.parent.locale, '', args.cell).dateObj;
                if (longDate && longDate.toString() !== 'Invalid Date' && longDate.getFullYear() >= 1900) {
                    args.cell.value = args.value = dateToInt(longDate).toString();
                }
                else {
                    return isNumber(args.value) ? args.value : '';
                }
            }
        }
        else {
            longDate = intToDate(args.value);
        }
        if (!longDate || longDate.toString() === 'Invalid Date') {
            return '';
        }
        else if (longDate.getFullYear() < 1900 || longDate.getFullYear() > 9999) {
            return isNumber(args.value) ? args.value.toString() : '';
        }
        if (args.checkDate) {
            args.dateObj = longDate;
        }
        return intl.formatDate(longDate, { type: 'date', skeleton: 'full' });
    };
    WorkbookNumberFormat.prototype.checkForDateFormat = function (args, cell) {
        var checkForDateFormat;
        var value = args.value;
        if (this.localeObj.decimal === '.' || (args.isEdit && !cell.formula)) {
            if (value.includes(this.localeObj.group) &&
                parseThousandSeparator(value, this.parent.locale, this.localeObj.group, this.localeObj.decimal)) {
                value = value.replace(this.localeObj.group, '');
                if (this.localeObj.decimal !== '.' && value.includes(this.localeObj.decimal)) {
                    value = value.replace(this.localeObj.decimal, '.');
                }
                if (isNumber(value) && cell) {
                    cell.value = args.value = value;
                }
                return false;
            }
            else {
                checkForDateFormat = this.localeObj.dateSeparator === '.' && value.includes('.');
            }
            if (this.localeObj.decimal !== '.' && !isNumber(value) && value.includes(this.localeObj.decimal)) {
                value = value.replace(this.localeObj.decimal, '.');
                if (isNumber(value) && cell) {
                    cell.value = args.value = value;
                }
            }
        }
        return checkForDateFormat;
    };
    WorkbookNumberFormat.prototype.timeFormat = function (args, intl, cell) {
        if (isNullOrUndefined(args.value)) {
            return '';
        }
        var defaultCode = getFormatFromType('Time');
        var code;
        if (args.format === '' || args.format === 'General') {
            code = defaultCode;
        }
        if (args.format === 'h:mm:ss AM/PM') {
            code = 'h:mm:ss a';
        }
        else {
            code = args.format;
        }
        var cellVal = args.value.toString();
        if (!isNumber(cellVal) && cell) {
            var timeArgs = { value: cellVal, updatedVal: cellVal, cell: cell, isEdit: args.isEdit, intl: intl,
                skipCellFormat: true };
            this.checkDateFormat(timeArgs);
            if (timeArgs.isDate || timeArgs.isTime) {
                cell.value = cellVal = timeArgs.updatedVal;
            }
            else {
                return '';
            }
        }
        var value = cellVal.split('.');
        if (!isNullOrUndefined(value[1])) {
            cellVal = parseFloat((value[0] + 1) + '.' + value[1]) || cellVal;
        }
        return intl.formatDate(intToDate(cellVal), { type: 'time', skeleton: 'medium', format: code });
    };
    WorkbookNumberFormat.prototype.scientificHashFormat = function (args, fArr) {
        var fractionCount = this.findDecimalPlaces(args.format);
        var wholeCount = (fArr[0].split('0').length - 1) + (fArr[0].split('#').length - 1);
        var formattedVal = Number(args.value).toExponential(fractionCount + wholeCount);
        var expoSeparator;
        if (formattedVal.includes('e+')) {
            expoSeparator = 'e+';
        }
        else if (formattedVal.includes('e-')) {
            expoSeparator = 'e-';
        }
        else {
            return formattedVal;
        }
        var exponentArr = formattedVal.split(expoSeparator);
        var decimalArr = exponentArr[0].split('.');
        var exponent = Number(exponentArr[1]);
        var fractionDiff;
        if (expoSeparator === 'e-') {
            var expoVal = exponent + Math.abs(exponent - (wholeCount * (exponent > wholeCount ? 2 : 1)));
            fractionDiff = expoVal - exponent;
            exponentArr[1] = expoVal.toString();
        }
        else {
            fractionDiff = exponent % wholeCount;
            exponentArr[1] = (exponent - fractionDiff).toString();
        }
        if (fractionDiff > 0) {
            decimalArr[0] += decimalArr[1].substring(0, fractionDiff);
            decimalArr[1] = decimalArr[1].slice(fractionDiff);
            exponentArr[0] = decimalArr.join('.');
        }
        var base = Number('1' + '0'.repeat(fractionCount));
        return this.getFormattedNumber(fArr.join('.'), Number((Math.round(Number(exponentArr[0]) * base) / base).toFixed(fractionCount))) +
            expoSeparator.toUpperCase() + this.findSuffix(args.format.split('+')[1], exponentArr[1]);
    };
    WorkbookNumberFormat.prototype.scientificFormat = function (args, prefix) {
        if (!args.format) {
            args.format = getFormatFromType('Scientific');
        }
        var zeros = args.format.split('+')[1] || '00';
        if (prefix === undefined) {
            prefix = this.findDecimalPlaces(args.format);
        }
        var fResult = Number(args.value).toExponential(prefix);
        if (fResult.indexOf('e+') > -1) {
            fResult = fResult.split('e+')[0] + 'E+' + this.findSuffix(zeros, fResult.split('e+')[1]);
        }
        else if (fResult.indexOf('e-') > -1) {
            fResult = fResult.split('e-')[0] + 'E-' + this.findSuffix(zeros, fResult.split('e-')[1]);
        }
        return fResult.replace('.', this.localeObj.decimal);
    };
    WorkbookNumberFormat.prototype.fractionFormat = function (args) {
        var _a, _b;
        var fractionResult;
        args.format = args.format || getFormatFromType('Fraction');
        this.checkAndSetColor(args);
        var valueArr = args.value.toString().split('.');
        var fractionDigit = args.format.split('?').length / 2;
        var formatArr = args.format.split(' ');
        var fractionArr = formatArr[1] ? formatArr[1].split('/') : [];
        if (/^\?{1,3}\/\?{1,3}$|^\?\/[248]$|^\?\?\/16$/.test(formatArr[1])) {
            if (valueArr.length === 2 && !valueArr[1].startsWith('0'.repeat(fractionArr[1].trim().length || 0))) {
                var _c = [0, 1, Number.MAX_VALUE], numerator = _c[0], denominator = _c[1], minError = _c[2];
                var denominatorLimit = fractionArr[1].includes('?') ?
                    Number('9'.repeat(fractionArr[1].split('?').length - 1)) : Number(fractionArr[1]);
                var decimalPart = parseFloat("0." + valueArr[1]);
                for (var tempDenom = 1; tempDenom <= denominatorLimit; tempDenom++) {
                    var tempNumer = Math.round(decimalPart * tempDenom);
                    var error = Math.abs(decimalPart - tempNumer / tempDenom);
                    if (error < minError) {
                        _a = [tempNumer, tempDenom, error], numerator = _a[0], denominator = _a[1], minError = _a[2];
                    }
                }
                var gcd = getGcd(numerator, denominator);
                _b = [numerator / gcd, denominator / gcd], numerator = _b[0], denominator = _b[1];
                if (numerator === denominator) {
                    valueArr[0] = "" + (parseInt(valueArr[0], 10) + 1);
                }
                else if (numerator !== 0) {
                    fractionResult = numerator + "/" + denominator;
                }
            }
        }
        else if (valueArr.length === 2 && !valueArr[1].startsWith('0'.repeat(fractionDigit))) {
            fractionResult = toFraction(Number(args.value));
        }
        var suffixVal = this.getFormattedNumber(formatArr[0], Math.abs(Number(valueArr[0])));
        if (fractionResult) {
            suffixVal = suffixVal === '0' ? '' : suffixVal;
            return (Number(args.value) < 0 ? '-' : '') + suffixVal + " " + fractionResult;
        }
        else {
            return (Number(args.value) < 0 ? '-' : '') + suffixVal + " " + '  '.repeat(fractionDigit * 2);
        }
    };
    WorkbookNumberFormat.prototype.checkAndSetColor = function (args) {
        var colorCode = getColorCode(args.format);
        if (colorCode) {
            args.format = args.format.split("[" + colorCode + "]").join('');
            args.color = colorCode.toLowerCase();
            this.applyColor(args);
        }
    };
    WorkbookNumberFormat.prototype.findDecimalPlaces = function (code) {
        var eIndex = code.toUpperCase().indexOf('E');
        if (eIndex > -1) {
            var decIndex = code.indexOf(this.localeObj.decimal);
            if (decIndex === -1 && this.localeObj.decimal !== '.') {
                decIndex = code.indexOf('.');
            }
            return decIndex > 0 ? code.substring(decIndex + 1, eIndex).length : 0;
        }
        return 2;
    };
    WorkbookNumberFormat.prototype.checkDateFormat = function (args) {
        if (isNullOrUndefined(args.value)) {
            return;
        }
        var cell = args.cell || getCell(args.rowIndex, args.colIndex, getSheet(this.parent, isNullOrUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex), false, true);
        var cellFormat = cell.format;
        if (this.parent.isEdit && getTypeFromFormat(cell.format) === 'Scientific') {
            cell.format = '';
        }
        var props = this.checkCustomDateFormat(args.value.toString(), cell, args.isEdit);
        if (props.val !== 'Invalid') {
            var noOfDays = void 0;
            if (props.format.startsWith('[h]')) {
                var timeArr = props.val.split(':');
                if (timeArr.length > 1 && Number(timeArr[0]) >= 24) {
                    noOfDays = Number(timeArr[0]) / 24;
                    timeArr[0] = '24';
                    props.val = timeArr.join(':');
                }
            }
            var dateObj = toDate(props.val, args.intl || new Internationalization(this.parent.locale), this.parent.locale, props.format || args.format, args.skipCellFormat && cell, props.isDateTime);
            if (dateObj.dateObj && dateObj.dateObj.toString() !== 'Invalid Date') {
                var year = dateObj.dateObj.getFullYear();
                if (year >= 1900 && year <= 9999) {
                    args.isTime = dateObj.type === 'time';
                    var dateIntVal = dateToInt(dateObj.dateObj, props.val.includes(':'), args.isTime);
                    if (noOfDays >= 1) {
                        dateIntVal += noOfDays;
                        dateObj.dateObj = intToDate(dateIntVal);
                    }
                    props.val = dateIntVal.toString();
                    if (!cell.format || cell.format === 'General') {
                        if (args.isTime) {
                            cell.format = getFormatFromType('Time');
                        }
                        else {
                            cell.format = getFormatFromType('ShortDate');
                        }
                        if (args.updateValue) {
                            cell.value = props.val;
                            return;
                        }
                    }
                    args.isDate = dateObj.type === 'date' || dateObj.type === 'datetime';
                    args.dateObj = dateObj.dateObj;
                }
                args.updatedVal = props.val;
            }
        }
        else if (cellFormat) {
            cell.format = cellFormat;
        }
    };
    WorkbookNumberFormat.prototype.checkCustomTimeFormat = function (val, cell) {
        var _this = this;
        var format = [];
        var am = " " + this.localeObj.am;
        var pm = " " + this.localeObj.pm;
        var isTewlveHr = val.includes(am) || val.includes(pm);
        if (!isTewlveHr) {
            if (val.includes(am.toLowerCase()) || val.includes(pm.toLowerCase())) {
                val = val.replace(am.toLowerCase(), am).replace(pm.toLowerCase(), pm);
                isTewlveHr = true;
            }
        }
        var timeArr = val.split(this.localeObj.timeSeparator);
        var isDefaultTime = timeArr.length === 3 && isTewlveHr;
        var twelveHrRep;
        if (timeArr.length <= 3) {
            var timeProp_1;
            var valArr_1;
            var maxHour_1 = isTewlveHr ? 12 : 23;
            timeArr.forEach(function (timeVal, index) {
                timeVal = timeVal.trim();
                timeArr[index] = timeVal;
                if (timeVal.includes(am) || timeVal.includes(pm)) {
                    twelveHrRep = ' AM/PM';
                    timeVal = timeVal.replace(am, '').replace(pm, '');
                }
                else {
                    twelveHrRep = '';
                }
                timeProp_1 = Number(timeVal);
                if (isNumber(timeProp_1) && timeProp_1 >= 0) {
                    if (timeProp_1 >= 24 && index === 0 && timeArr.length > 1) {
                        format.push('[h]');
                    }
                    else if (timeProp_1 <= maxHour_1 && index === 0) {
                        format.push('h' + twelveHrRep);
                        if (timeArr.length === 1) {
                            if (twelveHrRep) {
                                valArr_1 = val.split(' ');
                                valArr_1[0] += _this.localeObj.timeSeparator + "00";
                                timeArr[0] = valArr_1.join(' ');
                            }
                            else {
                                format = [];
                                val = 'Invalid';
                            }
                        }
                    }
                    else if (timeProp_1 <= 60 && (format.length === 1 || format.length === 2)) {
                        if (format.length === 1) {
                            format.push('mm' + twelveHrRep);
                            if (timeArr.length === 2 && format[0] === '[h]') {
                                format.push('ss');
                            }
                        }
                        else {
                            format.push('ss');
                        }
                        if (timeVal.length === 1) {
                            timeArr[index] = "0" + timeArr[index];
                        }
                    }
                    else {
                        format = [];
                        val = 'Invalid';
                    }
                }
                else {
                    format = [];
                    val = 'Invalid';
                }
            });
        }
        else {
            val = 'Invalid';
        }
        if (format.length) {
            val = timeArr.join(this.localeObj.timeSeparator);
            var formatCode = void 0;
            if (isDefaultTime) {
                formatCode = this.customFormats[24];
            }
            else {
                formatCode = format.join(':');
                if (defaultFormats) {
                    formatCode = this.getMatchingCustomFormat(formatCode);
                }
            }
            if (!cell.format || cell.format === 'General') {
                cell.format = formatCode;
                return { val: val, format: formatCode };
            }
        }
        return { val: val, format: '' };
    };
    WorkbookNumberFormat.prototype.checkCustomDateFormat = function (val, cell, isEdit) {
        var _this = this;
        var separator;
        var cellFormat = cell.format;
        var timeArgs;
        if (val.includes(this.localeObj.dateSeparator) && ((!val.includes(" " + this.localeObj.am) &&
            !val.includes(" " + this.localeObj.pm)) ||
            val.replace(" " + this.localeObj.am, '').replace(" " + this.localeObj.pm, '').includes(this.localeObj.dateSeparator))) {
            separator = this.localeObj.dateSeparator;
        }
        else if (val.indexOf('-') > 0) {
            separator = '-';
        }
        else if (val.indexOf(',') > 0) {
            var intl = new Internationalization(this.parent.locale);
            var parsedDate = intl.parseDate(val, { skeleton: 'full' });
            if (parsedDate && !isNaN(parsedDate.getTime())) {
                return { val: val, format: '', isDateTime: false };
            }
            return { val: 'Invalid', format: '' };
        }
        else {
            if (val.includes(this.localeObj.timeSeparator) || val.includes(" " + this.localeObj.am) ||
                val.includes(" " + this.localeObj.pm)) {
                return this.checkCustomTimeFormat(val, cell);
            }
            return { val: 'Invalid', format: '' };
        }
        if (val.includes(this.localeObj.timeSeparator) && val.includes(' ')) {
            var valArr = val.split(' ');
            val = valArr.shift();
            timeArgs = this.checkCustomTimeFormat(valArr.join(' '), cell);
            if (timeArgs.val === 'Invalid') {
                return { val: 'Invalid', format: '' };
            }
        }
        var dateArr = val.split(separator);
        var format = '';
        var formatArr = [];
        var updateFormat = function (defaultCode) {
            format = formatArr.join(separator);
            if (!cellFormat || cellFormat === 'General') {
                cell.format = defaultCode;
            }
        };
        var firstVal;
        var formats = IntlBase.getDependables(cldrData, this.parent.locale, null).dateObject;
        var months = formats.months['stand-alone'] ? formats.months['stand-alone'].wide : {};
        var abbreviatedMonth = formats.months['stand-alone'] ? formats.months['stand-alone'].abbreviated : { '1': '' };
        var enUSMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var isMonth = function (monthValue, monthKey, dateVal, dateLength) {
            if (abbreviatedMonth["" + monthKey] && abbreviatedMonth["" + monthKey].toLowerCase() === dateVal) {
                firstVal = enUSMonth[Number(monthKey) - 1];
                return;
            }
            var shortMonthValue = monthValue.substring(0, dateLength);
            if (shortMonthValue === dateVal) {
                firstVal = enUSMonth[Number(monthKey) - 1];
            }
        };
        if (dateArr.length === 2) {
            var updateSecValue = function (secVal) {
                val = firstVal;
                formatArr[0] = 'MMM';
                if (Number(secVal) <= 31 && Number(secVal) > 0) {
                    val = secVal + separator + val;
                    if (_this.localeObj.dateSeparator !== '/' && separator !== '-') {
                        val += separator + new Date().getFullYear();
                    }
                    formatArr.splice(0, 0, 'dd');
                    updateFormat(_this.customFormats[21]);
                }
                else {
                    if (secVal.length === 2 && isNumber(secVal) && Number(secVal) > -1) {
                        secVal = (Number(secVal) < 30 ? new Date().getFullYear().toString().slice(0, 2) : '19') + secVal;
                    }
                    if (Number(secVal) >= 1900 && Number(secVal) <= 9999) {
                        val = '1' + separator + val + separator + secVal;
                        formatArr[1] = 'yyyy';
                        updateFormat(_this.customFormats[22]);
                    }
                    else {
                        val = 'Invalid'; //Set as Invalid for invalid data like May-June.
                    }
                }
            };
            dateArr[0] = dateArr[0].toLowerCase().trim();
            dateArr[1] = dateArr[1].toLowerCase().trim();
            if (!Number(dateArr[0]) && dateArr[0].length >= abbreviatedMonth['1'].length) {
                Object.keys(months).find(function (key) { return isMonth(months["" + key].toLowerCase(), key, dateArr[0], dateArr[0].length); });
                if (!isNullOrUndefined(firstVal) && !dateArr[0].includes(',')) { // Added ',' checking to skip updating for the MMM d, yyyy ddd format.
                    updateSecValue(dateArr[1]);
                }
            }
            else if (!Number(dateArr[1]) && dateArr[1].length >= abbreviatedMonth['1'].length) {
                Object.keys(months).find(function (key) { return isMonth(months["" + key].toLowerCase(), key, dateArr[1], dateArr[1].length); });
                if (!isNullOrUndefined(firstVal)) {
                    updateSecValue(dateArr[0]);
                }
            }
            else if (Number(dateArr[0]) && Number(dateArr[0]) <= 12 && Number(dateArr[1]) && (this.localeObj.dateSeparator === '/' ||
                separator === '-' || (isEdit && !cell.formula))) {
                firstVal = enUSMonth[Number(dateArr[0]) - 1];
                updateSecValue(dateArr[1]);
            }
            if (!formatArr.length) {
                val = 'Invalid';
            }
        }
        else if (dateArr.length > 2) {
            var _loop_2 = function (i) {
                if (isNumber(dateArr[i])) {
                    if (dateArr[i].length !== 4 && dateArr[i].length !== 2 && dateArr[i].length !== 1) {
                        val = 'Invalid';
                    }
                }
                else {
                    dateArr[i] = dateArr[i].trim();
                    Object.keys(months).find(function (key) {
                        return isMonth(months["" + key].toLowerCase(), key, dateArr[i].trim().toLowerCase(), dateArr[i].length);
                    });
                    if (!isNullOrUndefined(firstVal)) {
                        if (i === 1) {
                            formatArr[1] = 'MMM';
                            dateArr[2] = dateArr[2].trim();
                            if (dateArr[2].length === 2 && isNumber(dateArr[2]) && Number(dateArr[2]) > -1) {
                                dateArr[2] = (Number(dateArr[2]) < 30 ? new Date().getFullYear().toString().slice(0, 2) : '19') + dateArr[2];
                            }
                            if (Number(dateArr[0]) <= 31 && Number(dateArr[2]) >= 1900 && Number(dateArr[2]) <= 9999) {
                                val = dateArr[0] + separator + firstVal;
                                val += (separator + dateArr[2]);
                                formatArr[0] = 'd';
                                formatArr[2] = 'yy';
                                updateFormat(this_2.customFormats[20]);
                                // Changed year format alone when given year value with 4 digits like 20-May-2022
                                formatArr[2] = 'yyyy';
                                format = formatArr.join(separator);
                            }
                        }
                    }
                    else {
                        val = 'Invalid';
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < dateArr.length; i++) {
                _loop_2(i);
            }
        }
        var isDateTime;
        if (timeArgs && val !== 'Invalid') {
            if (!cellFormat || cellFormat === 'General') {
                cell.format = this.customFormats[27];
            }
            if (format && timeArgs.format) {
                format += " " + timeArgs.format;
            }
            val += " " + timeArgs.val;
            isDateTime = true;
        }
        return { val: val, format: format, isDateTime: isDateTime };
    };
    WorkbookNumberFormat.prototype.formattedBarText = function (args) {
        var _this = this;
        if (args.value === '' || isNullOrUndefined(args.value)) {
            return;
        }
        var option = {};
        var format = (args.cell && args.cell.format) || '';
        var type = args.type || (format && isCustomDateTime(format, true, option, true) ? option.type : '');
        var intl = new Internationalization();
        var beforeText = args.value;
        var date = args.showFormattedText && (format === 'dd-MM-yyyy' || format === 'dd/MM/yyyy') ? format :
            getFormatFromType('ShortDate');
        var time = getFormatFromType('Time');
        if (time === 'h:mm:ss AM/PM') {
            time = 'h:mm:ss a';
        }
        var timeFormat = format.toLowerCase();
        var parseOtherCultureNumber = function () {
            if (_this.localeObj.decimal !== '.' && args.value) {
                args.value = args.value.toString();
                if (isNumber(args.value) && args.value.includes('.')) {
                    args.value = args.value.replace('.', _this.localeObj.decimal);
                }
            }
        };
        if (type === 'time' && timeFormat.includes('m') && !timeFormat.includes(':m') && !timeFormat.includes('m:') &&
            !timeFormat.includes('[m') && !timeFormat.includes('am')) {
            type = 'date';
        }
        if (type === 'date') {
            var val = args.value.toString();
            args.value = this.shortDateFormat({ type: type, value: args.value, format: date }, intl, args.cell);
            if (args.value && val.includes('.')) {
                args.value += " " + this.timeFormat({ type: type, value: val, format: time }, intl);
            }
        }
        else if (type.includes('time')) {
            if (beforeText && Number(beforeText) >= 1 || type === 'datetime') {
                args.value = this.shortDateFormat({ type: type, value: args.value, format: date }, intl) + ' ' +
                    this.timeFormat({ type: type, value: args.value, format: time }, intl);
            }
            else {
                args.value = this.timeFormat({ type: type, value: args.value, format: time }, intl);
            }
        }
        else if (args.cell.format && args.cell.format.includes('%') && isNumber(args.cell.value)) {
            args.value = this.parent.getDisplayText(args.cell);
            if (!args.value.includes('%')) {
                args.value = beforeText;
                parseOtherCultureNumber();
            }
        }
        else {
            parseOtherCultureNumber();
        }
        if (!args.value || (args.value && args.value.toString().indexOf('null') > -1)) {
            args.value = beforeText;
        }
    };
    WorkbookNumberFormat.prototype.getFormattedNumber = function (format, value) {
        return new Internationalization().formatNumber(Number(value), { format: format }) || '';
    };
    WorkbookNumberFormat.prototype.getMatchingCustomFormat = function (format) {
        if (format === '#,##0_);(#,##0)' && defaultFormats.has(37)) {
            return defaultFormats.get(37);
        }
        else if (format === '#,##0_);[Red](#,##0)' && defaultFormats.has(38)) {
            return defaultFormats.get(38);
        }
        else if (format === '#,##0.00_);(#,##0.00)' && defaultFormats.has(39)) {
            return defaultFormats.get(39);
        }
        else if (format === '#,##0.00_);[Red](#,##0.00)' && defaultFormats.has(40)) {
            return defaultFormats.get(40);
        }
        else if (format === 'd-mmm-yy' && defaultFormats.has(15)) {
            return defaultFormats.get(15);
        }
        else if (format === 'd-mmm' && defaultFormats.has(16)) {
            return defaultFormats.get(16);
        }
        else if (format === 'mmm-yy' && defaultFormats.has(17)) {
            return defaultFormats.get(17);
        }
        else if (format === 'h:mm AM/PM' && defaultFormats.has(18)) {
            return defaultFormats.get(18);
        }
        else if (format === 'h:mm:ss AM/PM' && defaultFormats.has(19)) {
            return defaultFormats.get(19);
        }
        else if (format === 'h:mm' && defaultFormats.has(20)) {
            return defaultFormats.get(20);
        }
        else if (format === 'h:mm:ss' && defaultFormats.has(21)) {
            return defaultFormats.get(21);
        }
        else if (format === 'm/d/yyyy h:mm' && defaultFormats.has(22)) {
            return defaultFormats.get(22);
        }
        else if (format === 'mm:ss' && defaultFormats.has(45)) {
            return defaultFormats.get(45);
        }
        else {
            return format;
        }
    };
    /**
     * Adding event listener for number format.
     *
     * @returns {void} - Adding event listener for number format.
     */
    WorkbookNumberFormat.prototype.addEventListener = function () {
        this.parent.on(applyNumberFormatting, this.numberFormatting, this);
        this.parent.on(getFormattedCellObject, this.getFormattedCell, this);
        this.parent.on(checkDateFormat, this.checkDateFormat, this);
        this.parent.on(getFormattedBarText, this.formattedBarText, this);
        this.parent.on(checkNumberFormat, this.updateAutoDetectNumberFormat, this);
        this.parent.on(parseDecimalNumber, this.parseDecimalNumber, this);
        this.parent.on(localizedFormatAction, this.localizedFormatAction, this);
    };
    /**
     * Removing event listener for number format.
     *
     * @returns {void} -  Removing event listener for number format.
     */
    WorkbookNumberFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applyNumberFormatting, this.numberFormatting);
            this.parent.off(getFormattedCellObject, this.getFormattedCell);
            this.parent.off(checkDateFormat, this.checkDateFormat);
            this.parent.off(getFormattedBarText, this.formattedBarText);
            this.parent.off(checkNumberFormat, this.updateAutoDetectNumberFormat);
            this.parent.off(parseDecimalNumber, this.parseDecimalNumber);
            this.parent.off(localizedFormatAction, this.localizedFormatAction);
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    WorkbookNumberFormat.prototype.destroy = function () {
        this.removeEventListener();
        if (defaultFormats && !this.parent.refreshing) {
            defaultFormats.clear();
            defaultFormats = null;
        }
        numberFormatsCode = this.parent = this.localeObj = this.customFormats = this.localizedFormats = null;
    };
    /**
     * Get the workbook number format module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookNumberFormat.prototype.getModuleName = function () {
        return 'workbookNumberFormat';
    };
    return WorkbookNumberFormat;
}());
export { WorkbookNumberFormat };
var defaultFormats;
var numberFormatsCode;
/**
 * Retrieves the built-in format code based on the specified number format type in either localized or non-localized format.
 *
 * @param {string} type - Specifies the type of number formatting.
 * @returns {string} - The built-in format code for the specified number format type.
 */
export function getFormatFromType(type) {
    var formatType = type.split(' ').join('');
    if (!numberFormatsCode) {
        switch (formatType) {
            case 'Currency':
                return '$#,##0.00';
            case 'Accounting':
                return '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)';
            case 'Time':
                return 'h:mm:ss AM/PM';
            default:
                return 'General';
        }
    }
    var getDefaultFormat = function (format, id) {
        return defaultFormats && defaultFormats.has(id) ? defaultFormats.get(id) : format;
    };
    var code = 'General';
    switch (formatType) {
        case 'Number':
            code = getDefaultFormat('0.00', 2);
            break;
        case 'Currency':
            code = numberFormatsCode.currency[0];
            break;
        case 'Accounting':
            code = numberFormatsCode.accounting[2];
            break;
        case 'ShortDate':
            code = getDefaultFormat('m/d/yyyy', 14);
            break;
        case 'LongDate':
            code = 'dddd, mmmm dd, yyyy';
            break;
        case 'Time':
            code = numberFormatsCode.time;
            break;
        case 'Percentage':
            code = getDefaultFormat('0.00%', 10);
            break;
        case 'Fraction':
            code = getDefaultFormat('# ?/?', 12);
            break;
        case 'Scientific':
            code = getDefaultFormat('0.00E+00', 11);
            break;
        case 'Text':
            code = getDefaultFormat('@', 49);
            break;
        case 'CurrencyWithColorCode':
            code = numberFormatsCode.currency[5];
            break;
    }
    return code;
}
/**
 * @hidden
 * @param {string} format -  Specidfies the format.
 * @param {boolean} isRibbonUpdate - Specifies where we are updating the type in the number format button.
 * @returns {string} - To get type from format.
 */
export function getTypeFromFormat(format, isRibbonUpdate) {
    var code = 'General';
    switch (format) {
        case '0':
        case '0.00':
        case '#,##0':
        case '#,##0.00':
            code = 'Number';
            break;
        case '$#,##0.00':
        case '$#,##0':
        case '$#,##0_);[Red]($#,##0)':
        case '$#,##0.00_);($#,##0.00)':
        case '$#,##0_);($#,##0)':
        case '$#,##0.00_);[Red]($#,##0.00)':
            code = 'Currency';
            break;
        case '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)':
        case '_ $ * #,##0.00_ ;_ $ * -#,##0.00_ ;_ $ * "-"??_ ;_ @_ ':
        case '_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)':
            code = 'Accounting';
            break;
        case 'mm-dd-yyyy':
        case 'm/d/yyyy':
        case 'dd/MM/yyyy':
            code = 'ShortDate';
            break;
        case 'dddd, mmmm dd, yyyy':
            code = 'LongDate';
            break;
        case 'h:mm:ss AM/PM':
            code = 'Time';
            break;
        case '0.00%':
        case '0%':
            code = 'Percentage';
            break;
        case '0.00E+00':
            code = 'Scientific';
            break;
        case '@':
            code = 'Text';
            break;
        default:
            if (format) {
                if (!numberFormatsCode) {
                    break;
                }
                if (format === numberFormatsCode.time) {
                    code = 'Time';
                }
                else if (numberFormatsCode.currency.indexOf(format) > -1) {
                    code = 'Currency';
                }
                else if (numberFormatsCode.accounting.indexOf(format) > -1) {
                    if (isRibbonUpdate) {
                        code = 'Accounting';
                    }
                }
                else if (format.includes('?/?') || ['2', '4', '8', '16'].indexOf(format.split('?/')[1]) > -1) {
                    code = 'Fraction';
                }
                if (defaultFormats && code === 'General' && isRibbonUpdate) {
                    var isDefaultFormat = function (ids) {
                        return ids.some(function (id) { return defaultFormats.has(id) && defaultFormats.get(id) === format; });
                    };
                    if (isDefaultFormat([1, 2, 3, 4])) {
                        code = 'Number';
                    }
                    else if (isDefaultFormat([14])) {
                        code = 'ShortDate';
                    }
                    else if (isDefaultFormat([9, 10])) {
                        code = 'Percentage';
                    }
                    else if (isDefaultFormat([11])) {
                        code = 'Scientific';
                    }
                    else if (isDefaultFormat([49])) {
                        code = 'Text';
                    }
                }
                isRibbonUpdate = false;
            }
            break;
    }
    if (isRibbonUpdate && numberFormatsCode && ((code === 'Currency' && numberFormatsCode.currency[0] !== '$#,##0.00') ||
        (code === 'Accounting' && numberFormatsCode.accounting[2] !== '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)'))) {
        code = 'General';
    }
    return code;
}
/**
 * This method converts a culture-specific format code, which may include localized decimal separators, group separators, and
 * currency symbols, to a default culture (en-US) format code. The default format uses a default decimal separator (.),
 * group separators (,), and a currency symbol.
 *
 * @param {Workbook} context - Specifies the workbook instance containing the format code to be converted.
 * @param {string} format - The culture-specific format code, with localized decimal separators, group separators, and currency symbols,
 * that needs to be converted to the default format.
 * @returns {string} - Returns the default culture (en-US) format code, using the default decimal separator (.), group separators (,), and
 * currency symbol.
 */
export function convertToDefaultFormat(context, format) {
    var eventArgs = { action: 'parseToDefaultFormat', format: format };
    context.notify(localizedFormatAction, eventArgs);
    return eventArgs.format;
}
/**
 * Populates culture-based number formats in the custom format dialog. By default, the decimal separator, group separator, and
 * currency symbol are updated based on the current culture. Currency and date formats can vary across cultures.
 * Excel maintains a default number format ID for each format code in the custom format dialog. This method maps these culture-based
 * format codes to their corresponding number format IDs, and the mapped formats will be populated in the custom format dialog.
 *
 * @param {Workbook} context - Specifies the workbook instance. If the component is not initialized, pass null for this parameter.
 * @param {FormatOption[]} formatOptions - Specifies the collection of number format IDs and their corresponding format codes.
 * @param {boolean} [clearMappedFormats] - Specifies whether to clear existing mapped formats or not. By default, this is set to true.
 * @returns {void}
 */
export function configureLocalizedFormat(context, formatOptions, clearMappedFormats) {
    if (clearMappedFormats === void 0) { clearMappedFormats = true; }
    if (clearMappedFormats && defaultFormats) {
        defaultFormats.clear();
        defaultFormats = null;
    }
    if (formatOptions && formatOptions.length) {
        if (!defaultFormats) {
            defaultFormats = new Map();
        }
        formatOptions.forEach(function (format) {
            defaultFormats.set(format.id, format.code);
        });
    }
    if (context) {
        context.notify(localizedFormatAction, { action: 'mapNumberFormatId' });
    }
}
