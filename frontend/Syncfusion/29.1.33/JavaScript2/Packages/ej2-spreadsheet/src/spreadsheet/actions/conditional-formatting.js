import { renderCFDlg, locale, dialog, focus, removeElements, readonlyAlert } from '../common/index';
import { getCell, isHiddenRow, isHiddenCol, getRowHeight, skipDefaultValue } from '../../workbook/base/index';
import { getRangeIndexes, checkDateFormat, applyCF, isNumber, getCellIndexes, parseLocaleNumber } from '../../workbook/index';
import { isDateTime, dateToInt, applyCellFormat, clearCF, getSwapRange, isReadOnlyCells } from '../../workbook/common/index';
import { setCFRule, getCellAddress, checkRange, getViewportIndexes } from '../../workbook/common/index';
import { extend, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { calculateFormula, rowFillHandler, getTypeFromFormat } from '../../workbook/index';
/**
 * Represents Conditional Formatting support for Spreadsheet.
 */
var ConditionalFormatting = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Conditional Formatting module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Conditional Formatting module.
     */
    function ConditionalFormatting(parent) {
        this.divElements = [];
        this.spanElements = [];
        this.inputElements = [];
        this.dropDownListElements = [];
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the Conditional Formatting module.
     *
     * @returns {void} - To destroy the Conditional Formatting module.
     */
    ConditionalFormatting.prototype.destroy = function () {
        this.removeEventListener();
        if (this.dupData) {
            this.dupData = [];
        }
        if (this.colorData) {
            this.colorData = [];
        }
        this.parent = null;
    };
    ConditionalFormatting.prototype.addEventListener = function () {
        this.parent.on(applyCF, this.applyCF, this);
        this.parent.on(renderCFDlg, this.renderCFDlg, this);
        this.parent.on(clearCF, this.clearCF, this);
    };
    ConditionalFormatting.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applyCF, this.applyCF);
            this.parent.off(renderCFDlg, this.renderCFDlg);
            this.parent.off(clearCF, this.clearCF);
        }
    };
    ConditionalFormatting.prototype.clearCF = function (args) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var clearFn = function (rIdx, cIdx, cell, td) {
            removeClass([td], ['e-redft', 'e-yellowft', 'e-greenft', 'e-redf', 'e-redt', 'e-iconset']);
            var styleVal;
            var style;
            ['backgroundColor', 'color'].forEach(function (styleProp) {
                if (td.style["" + styleProp]) {
                    td.style["" + styleProp] = '';
                    styleVal = cell && cell.style && cell.style["" + styleProp] || _this.parent.commonCellStyle["" + styleProp];
                    if (styleVal) {
                        style = {};
                        style["" + styleProp] = styleVal;
                        _this.parent.notify(applyCellFormat, { style: style, rowIdx: rIdx, colIdx: cIdx, td: td });
                    }
                }
            });
            var cfEle;
            ['.e-cf-databar', '.e-iconsetspan'].forEach(function (clsSelector) {
                cfEle = td.querySelector(clsSelector);
                var wrapElement = td.querySelector('.e-wrap-content');
                if (cfEle) {
                    if (wrapElement) {
                        wrapElement.removeChild(cfEle);
                    }
                    else {
                        td.removeChild(cfEle);
                    }
                    td.textContent = _this.parent.getDisplayText(cell);
                }
            });
        };
        this.updateRange(sheet, args.indexes, this.parent.frozenRowCount(sheet), this.parent.frozenColCount(sheet), getCellIndexes(sheet.topLeftCell), clearFn);
    };
    ConditionalFormatting.prototype.renderCFDlg = function (args) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var readonlyAlertThrow;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 375, showCloseIcon: true, isModal: true, cssClass: 'e-conditionalformatting-dlg',
            header: args.action.replace('...', ''),
            beforeOpen: function (beforeOpenArgs) {
                var dlgArgs = {
                    dialogName: 'ConditionalFormatDialog',
                    element: beforeOpenArgs.element, target: beforeOpenArgs.target, cancel: beforeOpenArgs.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    beforeOpenArgs.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.cfDlgContent(args.action);
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            beforeClose: this.dialogBeforeClose.bind(this),
            close: function () {
                if (readonlyAlertThrow) {
                    _this.parent.notify(readonlyAlert, null);
                    readonlyAlertThrow = false;
                }
            },
            buttons: [{
                    buttonModel: { content: l10n.getConstant('Ok'), isPrimary: true },
                    click: function () {
                        var sheet = _this.parent.getActiveSheet();
                        if (isReadOnlyCells(_this.parent, getSwapRange(getRangeIndexes(sheet.selectedRange)))) {
                            readonlyAlertThrow = true;
                        }
                        else {
                            _this.dlgClickHandler(args.action);
                        }
                        dialogInst.hide();
                    }
                }]
        });
    };
    ConditionalFormatting.prototype.dialogBeforeClose = function () {
        var numeric = this.numericTBElements;
        if (numeric && numeric.element) {
            numeric.destroy();
            numeric.element.remove();
        }
        this.numericTBElements = null;
        this.dropDownListElements.forEach(function (dropDownList) {
            if (dropDownList && dropDownList.element) {
                dropDownList.destroy();
                dropDownList.element.remove();
            }
        });
        this.dropDownListElements = [];
        if (this.value1Inp) {
            this.value1Inp.removeEventListener('input', this.validateCFInput.bind(this));
            if (this.value1Inp.parentNode) {
                this.value1Inp.parentNode.removeChild(this.value1Inp);
            }
            this.value1Inp = null;
        }
        if (this.value2Inp) {
            this.value2Inp.removeEventListener('input', this.validateCFInput.bind(this));
            if (this.value2Inp.parentNode) {
                this.value2Inp.parentNode.removeChild(this.value2Inp);
            }
            this.value2Inp = null;
        }
        removeElements(this.spanElements);
        this.spanElements = [];
        removeElements(this.inputElements);
        this.inputElements = [];
        removeElements(this.divElements);
        this.divElements = [];
    };
    ConditionalFormatting.prototype.dlgClickHandler = function (action) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var cont = this.parent.element.querySelector('.e-conditionalformatting-dlg .e-dlg-content .e-cf-dlg');
        var cf = { cFColor: this.getCFColor(cont.querySelector('.e-cfsub .e-input').value),
            range: this.parent.getActiveSheet().selectedRange };
        var cfInputs = cont.querySelectorAll('.e-cfmain .e-input');
        if (action === l10n.getConstant('DuplicateValues') + '...') {
            cf.type = cfInputs[0].value === l10n.getConstant('Duplicate') ? 'Duplicate' : 'Unique';
        }
        else {
            cf.type = this.getType(action);
            var cfValues = [];
            if (cfInputs[0]) {
                cfValues.push(cfInputs[0].value);
            }
            if (cfInputs[1]) {
                cfValues.push(cfInputs[1].value);
            }
            parseLocaleNumber(cfValues, this.parent);
            cf.value = cfValues.join(',');
        }
        this.parent.notify(setCFRule, { cfModel: cf, isAction: true });
    };
    ConditionalFormatting.prototype.getType = function (action) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var result;
        switch (action) {
            case l10n.getConstant('GreaterThan') + '...':
                result = 'GreaterThan';
                break;
            case l10n.getConstant('LessThan') + '...':
                result = 'LessThan';
                break;
            case l10n.getConstant('Between') + '...':
                result = 'Between';
                break;
            case l10n.getConstant('CFEqualTo') + '...':
                result = 'EqualTo';
                break;
            case l10n.getConstant('TextThatContains') + '...':
                result = 'ContainsText';
                break;
            case l10n.getConstant('ADateOccuring') + '...':
                result = 'DateOccur';
                break;
            case l10n.getConstant('Top10Items') + '...':
                result = 'Top10Items';
                break;
            case l10n.getConstant('Bottom10Items') + '...':
                result = 'Bottom10Items';
                break;
            case l10n.getConstant('Top10') + ' %...':
                result = 'Top10Percentage';
                break;
            case l10n.getConstant('Bottom10') + ' %...':
                result = 'Bottom10Percentage';
                break;
            case l10n.getConstant('AboveAverage') + '...':
                result = 'AboveAverage';
                break;
            case l10n.getConstant('BelowAverage') + '...':
                result = 'BelowAverage';
                break;
        }
        return result;
    };
    ConditionalFormatting.prototype.getCFColor = function (value) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var result = 'RedFT';
        switch (value) {
            case l10n.getConstant('LightRedFillWithDarkRedText'):
                result = 'RedFT';
                break;
            case l10n.getConstant('YellowFillWithDarkYellowText'):
                result = 'YellowFT';
                break;
            case l10n.getConstant('GreenFillWithDarkGreenText'):
                result = 'GreenFT';
                break;
            case l10n.getConstant('RedFill'):
                result = 'RedF';
                break;
            case l10n.getConstant('RedText'):
                result = 'RedT';
                break;
        }
        return result;
    };
    ConditionalFormatting.prototype.cfDlgContent = function (action) {
        var dlgText = this.getDlgText(action);
        var l10n = this.parent.serviceLocator.getService(locale);
        var dlgContent = this.parent.createElement('div', { className: 'e-cf-dlg' });
        var mainDiv = this.parent.createElement('div', { className: 'e-cfmain' });
        var subDiv = this.parent.createElement('div', { className: 'e-cfsub' });
        this.divElements.push(dlgContent);
        this.divElements.push(mainDiv);
        this.divElements.push(subDiv);
        var value1Text = this.parent.createElement('span', { className: 'e-header e-top-header' });
        value1Text.innerText = dlgText;
        this.value1Inp =
            this.parent.createElement('input', { className: 'e-input', id: 'valueInput', attrs: { type: 'text',
                    'aria-label': dlgText } });
        var duplicateSelectEle = this.parent.createElement('input', { className: 'e-select' });
        var subDivText = this.parent.createElement('span', { className: 'e-header' });
        subDivText.innerText = l10n.getConstant('With');
        var colorSelectEle = this.parent.createElement('input', { className: 'e-select' });
        this.spanElements.push(value1Text);
        this.inputElements.push(duplicateSelectEle);
        this.spanElements.push(subDivText);
        this.inputElements.push(colorSelectEle);
        dlgContent.appendChild(mainDiv);
        dlgContent.appendChild(subDiv);
        mainDiv.appendChild(value1Text);
        var setValidation;
        if (action !== l10n.getConstant('DuplicateValues') + '...') {
            if (action !== l10n.getConstant('AboveAverage') + '...' && action !== l10n.getConstant('BelowAverage') + '...') {
                mainDiv.appendChild(this.value1Inp);
                setValidation = true;
                var percent = action === l10n.getConstant('Top10') + ' %...' || action === l10n.getConstant('Bottom10') + ' %...';
                if (action === l10n.getConstant('Top10Items') + '...' || action === l10n.getConstant('Bottom10Items') + '...' || percent) {
                    this.value1Inp.maxLength = percent ? 3 : 4;
                    var numeric = new NumericTextBox({ value: 10, min: 1, max: percent ? 100 : 1000, format: '###' });
                    this.numericTBElements = numeric;
                    numeric.appendTo(this.value1Inp);
                }
            }
        }
        else {
            mainDiv.appendChild(duplicateSelectEle);
            this.dupData = [
                { text: l10n.getConstant('Duplicate'), id: 'duplicate' },
                { text: l10n.getConstant('Unique'), id: 'unique' }
            ];
            var dupList = new DropDownList({
                dataSource: this.dupData,
                index: 0,
                popupHeight: '200px'
            });
            this.dropDownListElements.push(dupList);
            dupList.appendTo(duplicateSelectEle);
        }
        if (action === l10n.getConstant('Between') + '...') {
            var value2Text = this.parent.createElement('span', { className: 'e-header e-header-2' });
            value2Text.innerText = l10n.getConstant('And');
            this.value2Inp = this.parent.createElement('input', { className: 'e-input e-between' });
            this.spanElements.push(value2Text);
            mainDiv.appendChild(value2Text);
            mainDiv.appendChild(this.value2Inp);
            this.value2Inp.addEventListener('input', this.validateCFInput.bind(this));
        }
        if (setValidation) {
            this.validateCFInput({ target: this.value1Inp });
            this.value1Inp.addEventListener('input', this.validateCFInput.bind(this));
        }
        subDiv.appendChild(subDivText);
        subDiv.appendChild(colorSelectEle);
        this.colorData = [
            { text: l10n.getConstant('LightRedFillWithDarkRedText'), value: 'redft', id: 'redft' },
            { text: l10n.getConstant('YellowFillWithDarkYellowText'), id: 'yellowft' },
            { text: l10n.getConstant('GreenFillWithDarkGreenText'), id: 'greenft' },
            { text: l10n.getConstant('RedFill'), id: 'redf' },
            { text: l10n.getConstant('RedText'), id: 'redt' }
        ];
        var colorList = new DropDownList({
            dataSource: this.colorData,
            index: 0,
            popupHeight: '200px'
        });
        this.dropDownListElements.push(colorList);
        colorList.appendTo(colorSelectEle);
        return dlgContent;
    };
    ConditionalFormatting.prototype.validateCFInput = function (e) {
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var text = e.target.value;
        var btn = dialogInst.dialogInstance.element.getElementsByClassName('e-primary')[0];
        if (text && (e.target.classList.contains('e-between') || e.target.parentElement.querySelector('.e-between'))) {
            text = e.target.parentElement.querySelector((e.target.classList.contains('e-between') ? '.e-input' : '.e-between')).value;
        }
        btn.disabled = !(text.trim());
    };
    ConditionalFormatting.prototype.checkCellHandler = function (rowIdx, colIdx, cf) {
        var ranges = cf.range.trim().split(',');
        return ranges.some(function (range) {
            var indexes = getRangeIndexes(range.includes(':') ? range : range + ":" + range);
            return rowIdx >= indexes[0] && rowIdx <= indexes[2] && colIdx >= indexes[1] && colIdx <= indexes[3];
        });
    };
    ConditionalFormatting.prototype.getDlgText = function (action) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var result = '';
        switch (action) {
            case l10n.getConstant('GreaterThan') + '...':
                result = l10n.getConstant('FormatCellsGreaterThan');
                break;
            case l10n.getConstant('LessThan') + '...':
                result = l10n.getConstant('FormatCellsLessThan');
                break;
            case l10n.getConstant('Between') + '...':
                result = l10n.getConstant('FormatCellsBetween');
                break;
            case l10n.getConstant('CFEqualTo') + '...':
                result = l10n.getConstant('FormatCellsEqualTo');
                break;
            case l10n.getConstant('TextThatContains') + '...':
                result = l10n.getConstant('FormatCellsThatContainTheText');
                break;
            case l10n.getConstant('ADateOccuring') + '...':
                result = l10n.getConstant('FormatCellsThatContainADateOccurring');
                break;
            case l10n.getConstant('DuplicateValues') + '...':
                result = l10n.getConstant('FormatCellsDuplicate');
                break;
            case l10n.getConstant('Top10Items') + '...':
                result = l10n.getConstant('FormatCellsTop');
                break;
            case l10n.getConstant('Top10') + ' %...':
                result = l10n.getConstant('FormatCellsTop');
                break;
            case l10n.getConstant('Bottom10Items') + '...':
                result = l10n.getConstant('FormatCellsBottom');
                break;
            case l10n.getConstant('Bottom10') + ' %...':
                result = l10n.getConstant('FormatCellsBottom');
                break;
            case l10n.getConstant('AboveAverage') + '...':
                result = l10n.getConstant('FormatCellsAbove');
                break;
            case l10n.getConstant('BelowAverage') + '...':
                result = l10n.getConstant('FormatCellsBelow');
                break;
        }
        return result;
    };
    ConditionalFormatting.prototype.updateResult = function (cf, sheet, isDataBar, isColorScale, isAverage, isTopBottom, isIconSets, input) {
        var valueObj = {};
        var dupValueObj = {};
        var rangeArr = cf.range.split(',');
        var result = [];
        var rangeIndexes;
        var val;
        var cell;
        var cellType;
        var updateFn;
        if (isDataBar) {
            updateFn = function () {
                if (isNumber(val) && cellType !== 'Text') {
                    var intVal = parseFloat(val);
                    if (intVal >= 0) {
                        if (result[0] === undefined || intVal > result[0]) {
                            result[0] = intVal;
                        }
                    }
                    else if (result[1] === undefined || intVal < result[1]) {
                        result[1] = intVal;
                    }
                }
            };
        }
        else if (isColorScale) {
            updateFn = function () {
                if (isNumber(val) && cellType !== 'Text') {
                    var intVal = parseFloat(val);
                    result.push(Number(intVal));
                }
            };
        }
        else if (isAverage) {
            result = [0, 0];
            updateFn = function () {
                if (isNumber(val) && cellType !== 'Text') {
                    result[0] += parseFloat(val);
                    result[1]++;
                }
            };
        }
        else if (isTopBottom) {
            updateFn = function () {
                if (isNumber(val) && cellType !== 'Text') {
                    result.push(parseFloat(val));
                }
            };
        }
        else if (isIconSets) {
            updateFn = function () {
                if (isNumber(val) && cellType !== 'Text') {
                    var intVal = parseFloat(val);
                    if (result[0] === undefined || intVal < result[0]) {
                        result[0] = intVal;
                    }
                    if (result[1] === undefined || intVal > result[1]) {
                        result[1] = intVal;
                    }
                }
            };
        }
        else {
            updateFn = function () {
                if (valueObj["" + val]) {
                    if (val !== '') {
                        if (!dupValueObj["" + val]) {
                            dupValueObj["" + val] = true;
                            result.push(val);
                        }
                    }
                }
                else {
                    valueObj["" + val] = true;
                }
            };
        }
        for (var rangeIdx = 0; rangeIdx < rangeArr.length; rangeIdx++) {
            rangeIndexes = getRangeIndexes(rangeArr[rangeIdx]);
            for (var i = rangeIndexes[0]; i <= rangeIndexes[2]; i++) {
                for (var j = rangeIndexes[1]; j <= rangeIndexes[3]; j++) {
                    cell = getCell(i, j, sheet, false, true);
                    cellType = '';
                    if (!isNullOrUndefined(cell.value)) {
                        val = cell.value.toString().toLowerCase();
                        cellType = getTypeFromFormat(cell.format);
                        updateFn();
                    }
                    else if (cell.formula) {
                        this.parent.notify(calculateFormula, {
                            cell: cell, rowIdx: i, colIdx: j, sheetIndex: this.parent.activeSheetIndex
                        });
                        val = cell.value.toString().toLowerCase();
                        cellType = getTypeFromFormat(cell.format);
                        updateFn();
                    }
                }
            }
        }
        if (isColorScale || isTopBottom) {
            result = result.sort(function (n1, n2) { return n1 - n2; });
            if (!cf.type.includes('Bottom')) {
                result = result.reverse();
            }
            if (isTopBottom) {
                var endIdx = parseFloat(input);
                if (cf.type.includes('Percentage')) {
                    endIdx = endIdx / (100 / result.length);
                    endIdx = (endIdx < 1) ? 1 : endIdx;
                }
                result = result.slice(0, endIdx);
            }
        }
        else if (isAverage) {
            result = [result[0] / result[1]];
            if (!result[0]) {
                result = [];
            }
        }
        cf.result = result;
    };
    ConditionalFormatting.prototype.applyCF = function (args) {
        var rangeCheck = !args.cfModel;
        var sheet = this.parent.getActiveSheet();
        var cfRule = args.cfModel || sheet.conditionalFormats;
        var indexes = [args.indexes];
        if (args.refreshAll) {
            indexes = getViewportIndexes(this.parent, this.parent.viewport);
        }
        var updatedCFCellRef = {};
        for (var i = cfRule.length - 1; i >= 0; i--) {
            if (rangeCheck && (indexes[0].length === 2 ? !this.checkCellHandler(args.indexes[0], args.indexes[1], cfRule[i]) :
                !checkRange(indexes, cfRule[i].range))) {
                continue;
            }
            this.updateCF(args, sheet, cfRule[i], updatedCFCellRef);
        }
    };
    ConditionalFormatting.prototype.updateCF = function (args, sheet, cf, updatedCFCellRef) {
        var _this = this;
        var value1;
        var value2 = '';
        var isLongDate = false;
        if (cf.value) {
            var dateValues = [];
            var valueArr = [];
            if (cf.type === 'Between') {
                dateValues = cf.value.split('"').filter(function (date) { return date.trim() && date.trim() !== ','; });
                if (dateValues.length > 1) {
                    valueArr = dateValues;
                    isLongDate = true;
                }
                else {
                    valueArr = cf.value.split(',').filter(function (value) { return !!value.trim(); });
                }
            }
            else {
                valueArr = [cf.value];
            }
            if (valueArr.length > 1) {
                if (valueArr[0].split('(').length > 1) {
                    var valueStr = '';
                    for (var idx = 0; idx < valueArr.length; idx++) {
                        valueStr += valueArr[idx] + ',';
                        if (valueStr.split('(').length === valueStr.split(')').length && value1 === undefined) {
                            value1 = valueStr.substring(0, valueStr.length - 1);
                            valueStr = '';
                        }
                    }
                    value2 = valueStr.substring(0, valueStr.length - 1);
                }
                else {
                    value1 = valueArr[0];
                    for (var idx = 1; idx < valueArr.length; idx++) {
                        value2 += idx + 1 === valueArr.length ? valueArr[idx] : valueArr[idx] + ',';
                    }
                }
            }
            else {
                value1 = valueArr[0] || cf.value;
            }
        }
        if (!cf.type) {
            cf.type = 'GreaterThan';
        }
        var style;
        var cfColor;
        if (cf.format && cf.format.style) {
            style = skipDefaultValue(cf.format.style, true);
            if (!Object.keys(style).length) {
                cfColor = cf.cFColor;
                if (!cfColor) {
                    cfColor = cf.cFColor = 'RedFT';
                }
            }
        }
        else {
            style = {};
            cfColor = cf.cFColor;
            if (!cfColor) {
                cfColor = cf.cFColor = 'RedFT';
            }
        }
        var isAverage = cf.type.includes('Average');
        var isTopBottom = cf.type.includes('10') && isNumber(value1);
        var isIconSets = (cf.type.includes('Three') || cf.type.includes('Four') || cf.type.includes('Five'));
        var isDataBar = cf.type.includes('DataBar');
        var isColorScale = cf.type.includes('ColorScale');
        if ((!args.isRender || !cf.result) && (cf.type === 'Duplicate' || cf.type === 'Unique' || isDataBar
            || isColorScale || isAverage || isTopBottom || isIconSets)) {
            this.updateResult(cf, sheet, isDataBar, isColorScale, isAverage, isTopBottom, isIconSets, value1);
        }
        var updateCF = function (rIdx, cIdx, cell, td, currentRowHeight, isLongDate) {
            var cellVal = cell && !isNullOrUndefined(cell.value) ? cell.value.toString() : '';
            var isApply;
            var dateEventArgs;
            var isValueCFRule = true;
            var cellType = cell ? getTypeFromFormat(cell.format) : '';
            switch (cf.type) {
                case 'GreaterThan':
                case 'LessThan':
                    isApply = _this.isGreaterThanLessThan(cf, cellVal, value1, cellType);
                    break;
                case 'Between':
                    isApply = isNumber(cellVal) && cellType !== 'Text' && _this.isBetWeen(cf, cellVal, value1, value2, isLongDate);
                    break;
                case 'EqualTo':
                    isApply = _this.isEqualTo(cf, cellVal, value1);
                    break;
                case 'ContainsText':
                    isApply = cellVal && value1 && _this.isContainsText(cellVal, value1);
                    break;
                case 'DateOccur':
                    dateEventArgs = { value: value1, cell: {}, updatedVal: value1 };
                    if (!isNumber(value1)) {
                        _this.parent.notify(checkDateFormat, dateEventArgs);
                    }
                    isApply = cellVal === dateEventArgs.updatedVal;
                    break;
                case 'Unique':
                    isApply = cellVal !== '' && cf.result.indexOf(cellVal.toLowerCase()) === -1;
                    break;
                case 'Duplicate':
                    isApply = cf.result.indexOf(cellVal.toLowerCase()) > -1;
                    break;
                case 'Top10Items':
                case 'Bottom10Items':
                case 'Top10Percentage':
                case 'Bottom10Percentage':
                    if (cf.result) {
                        var value = parseFloat(cellVal);
                        if (isDateTime(cellVal)) {
                            value = dateToInt(cellVal);
                        }
                        isApply = cf.result.indexOf(value) > -1;
                    }
                    break;
                case 'AboveAverage':
                    isApply = cf.result.length && isNumber(cellVal) && cellType !== 'Text' && parseFloat(cellVal) > cf.result[0];
                    break;
                case 'BelowAverage':
                    isApply = cf.result.length && isNumber(cellVal) && cellType !== 'Text' && parseFloat(cellVal) < cf.result[0];
                    break;
                default:
                    isValueCFRule = false;
                    if (isDataBar) {
                        if (!updatedCFCellRef[rIdx + "_" + cIdx + "_bars"]) {
                            updatedCFCellRef[rIdx + "_" + cIdx + "_bars"] = true;
                            _this.applyDataBars(cellVal, cf, td, rIdx, cellType, currentRowHeight);
                        }
                    }
                    else if (isColorScale) {
                        if (!updatedCFCellRef[rIdx + "_" + cIdx]) {
                            var value = isNumber(cellVal) ? parseFloat(cellVal) : NaN;
                            if (isNaN(value)) {
                                if (td.style.backgroundColor && !td.classList.contains('e-yellowft') && !td.classList.contains('e-greenft') && !td.classList.value.includes('e-redf')) {
                                    td.style.backgroundColor = '';
                                    var style_1 = extend({}, _this.parent.commonCellStyle, cell && cell.style);
                                    if (style_1.backgroundColor) {
                                        _this.parent.notify(applyCellFormat, {
                                            style: { backgroundColor: style_1.backgroundColor }, td: td, rowIdx: rIdx,
                                            colIdx: cIdx
                                        });
                                    }
                                }
                            }
                            else {
                                var valArr = cf.result;
                                var idx = valArr.indexOf(value);
                                if (idx === -1) {
                                    if (td.style.backgroundColor) {
                                        td.style.backgroundColor = '';
                                        var style_2 = extend({}, _this.parent.commonCellStyle, cell && cell.style);
                                        if (style_2.backgroundColor) {
                                            _this.parent.notify(applyCellFormat, {
                                                style: { backgroundColor: style_2.backgroundColor }, td: td, rowIdx: rIdx,
                                                colIdx: cIdx
                                            });
                                        }
                                    }
                                }
                                else {
                                    var colors = _this.getColor(cf.type);
                                    td.style.backgroundColor = idx === 0 ? colors[0] :
                                        (idx === valArr.length - 1 ? colors[colors.length - 1] : (valArr.length === 3 && idx === 1 ? colors[1] :
                                            _this.getGradient(idx, colors[0], colors[1], colors[2], valArr.length)));
                                    updatedCFCellRef[rIdx + "_" + cIdx] = true;
                                }
                            }
                        }
                    }
                    else {
                        if (!updatedCFCellRef[rIdx + "_" + cIdx + "_icons"]) {
                            updatedCFCellRef[rIdx + "_" + cIdx + "_icons"] = true;
                            var cfIcon = _this.parent.createElement('span', { className: 'e-icon e-iconsetspan' });
                            var iconSetUpdated = _this.applyIconSet(cellVal, cf, td, cfIcon, cellType);
                            if (iconSetUpdated && cell && cell.format && cell.format.includes('*') &&
                                getTypeFromFormat(cell.format) !== 'Accounting') {
                                _this.parent.notify(rowFillHandler, { cell: cell, cellEle: td, rowIdx: rIdx, colIdx: cIdx, updateFillSize: true,
                                    iconSetSpan: cfIcon });
                            }
                        }
                    }
                    break;
            }
            if (args.isAction && isValueCFRule) {
                _this.parent.trigger('beforeConditionalFormat', { conditionalFormat: cf, cell: cell, element: td, apply: isApply,
                    address: getCellAddress(rIdx, cIdx) });
                if (!isApply && args.isEdit && !updatedCFCellRef[rIdx + "_" + cIdx]) {
                    var style_3;
                    if (cfColor) {
                        if (td.className.includes('e-' + cfColor.toLowerCase())) {
                            td.classList.remove('e-' + cfColor.toLowerCase());
                            td.style.backgroundColor = '';
                            td.style.color = '';
                            style_3 = extend({}, _this.parent.commonCellStyle, cell && cell.style);
                            if (style_3.backgroundColor || style_3.color) {
                                _this.parent.notify(applyCellFormat, { rowIdx: rIdx, colIdx: cIdx, td: td,
                                    style: { backgroundColor: style_3.backgroundColor, color: style_3.color } });
                            }
                        }
                    }
                    else {
                        td.removeAttribute('style');
                        style_3 = extend({}, _this.parent.commonCellStyle, cell && cell.style);
                        if (Object.keys(style_3).length) {
                            _this.parent.notify(applyCellFormat, { style: style_3, rowIdx: rIdx, colIdx: cIdx, td: td });
                        }
                    }
                }
            }
            if (isApply && !updatedCFCellRef[rIdx + "_" + cIdx]) {
                updatedCFCellRef[rIdx + "_" + cIdx] = true;
                removeClass([td], ['e-redft', 'e-yellowft', 'e-greenft', 'e-redf', 'e-redt']);
                if (cfColor) {
                    td.classList.add('e-' + cfColor.toLowerCase());
                    _this.setCFStyle(style, cf);
                }
                Object.assign(td.style, style);
            }
        };
        if (args.ele) {
            updateCF(args.indexes[0], args.indexes[1], args.cell, args.ele, args.resizedRowHeight, isLongDate);
        }
        else {
            var rangeArr = cf.range.split(',');
            var frozenRow = this.parent.frozenRowCount(sheet);
            var frozenCol = this.parent.frozenColCount(sheet);
            var topLeftIdx = getCellIndexes(sheet.topLeftCell);
            for (var i = 0; i < rangeArr.length; i++) {
                this.updateRange(sheet, getRangeIndexes(rangeArr[i]), frozenRow, frozenCol, topLeftIdx, updateCF, isLongDate);
            }
        }
    };
    ConditionalFormatting.prototype.updateRange = function (sheet, rangeIdx, frozenRow, frozenCol, topLeftIdx, invokeFn, isLongDate) {
        rangeIdx[0] = rangeIdx[0] < frozenRow ? (rangeIdx[0] < topLeftIdx[0] ? topLeftIdx[0] : rangeIdx[0]) :
            (rangeIdx[0] < this.parent.viewport.topIndex + frozenRow ? this.parent.viewport.topIndex + frozenRow : rangeIdx[0]);
        rangeIdx[1] = rangeIdx[1] < frozenCol ? (rangeIdx[1] < topLeftIdx[1] ? topLeftIdx[1] : rangeIdx[1]) :
            (rangeIdx[1] < this.parent.viewport.leftIndex + frozenCol ? this.parent.viewport.leftIndex + frozenCol : rangeIdx[1]);
        rangeIdx[2] = rangeIdx[2] < frozenRow ? (rangeIdx[2] < topLeftIdx[0] ? topLeftIdx[0] - 1 :
            rangeIdx[2]) : (rangeIdx[2] > this.parent.viewport.bottomIndex ? this.parent.viewport.bottomIndex : rangeIdx[2]);
        rangeIdx[3] = rangeIdx[3] < frozenCol ? (rangeIdx[3] < topLeftIdx[1] ? topLeftIdx[1] - 1 : rangeIdx[3]) :
            (rangeIdx[3] > this.parent.viewport.rightIndex ? this.parent.viewport.rightIndex : rangeIdx[3]);
        var td;
        for (var rowIdx = rangeIdx[0]; rowIdx <= rangeIdx[2]; rowIdx++) {
            if (frozenRow && rowIdx === frozenRow) {
                rowIdx = this.parent.viewport.topIndex + frozenRow;
            }
            if (isHiddenRow(sheet, rowIdx)) {
                continue;
            }
            for (var colIdx = rangeIdx[1]; colIdx <= rangeIdx[3]; colIdx++) {
                if (frozenCol && colIdx === frozenCol) {
                    colIdx = this.parent.viewport.leftIndex + frozenCol;
                }
                if (isHiddenCol(sheet, colIdx)) {
                    continue;
                }
                td = this.parent.getCell(rowIdx, colIdx);
                if (td) {
                    invokeFn(rowIdx, colIdx, getCell(rowIdx, colIdx, sheet), td, undefined, isLongDate);
                }
            }
        }
    };
    ConditionalFormatting.prototype.applyIconSet = function (val, cf, cellEle, cfIcon, cellType) {
        var iconSetExist = cellEle.classList.contains('e-iconset');
        var wrapText = cellEle.querySelector('.e-wrap-content');
        if (iconSetExist) {
            cellEle.classList.remove('e-iconset');
            var iconSpan = cellEle.querySelector('.e-iconsetspan');
            if (iconSpan) {
                if (wrapText) {
                    wrapText.removeChild(iconSpan);
                }
                else {
                    cellEle.removeChild(iconSpan);
                }
            }
        }
        var value = isNumber(val) ? parseFloat(val) : NaN;
        var result = cf.result;
        if (isNaN(value) || (result[0] === undefined && result[1] === undefined) || (isNumber(val) && cellType === 'Text')) {
            return iconSetExist;
        }
        var min = result[0];
        var max = result[1];
        var iconList = this.getIconList(cf.type).split(',');
        var currentSymbol;
        if (iconList.length === 3) {
            var maxPercent = min + (0.67 * ((max) - (min)));
            var minPercent = min + (0.33 * ((max) - (min)));
            currentSymbol =
                'e-' + (value >= maxPercent ? iconList[0].trim() : value >= minPercent ? iconList[1].trim() : iconList[2].trim());
        }
        else if (iconList.length === 4) {
            var percent1 = min + (0.25 * ((max) - (min)));
            var percent2 = min + (0.50 * ((max) - (min)));
            var percent3 = min + (0.75 * ((max) - (min)));
            currentSymbol =
                'e-' + (value >= percent3 ? iconList[0].trim() : value >= percent2 ? iconList[1].trim() : value >= percent1 ?
                    iconList[2].trim() : iconList[3].trim());
        }
        else if (iconList.length === 5) {
            var percent1 = min + (0.20 * ((max) - (min)));
            var percent2 = min + (0.40 * ((max) - (min)));
            var percent3 = min + (0.60 * ((max) - (min)));
            var percent4 = min + (0.80 * ((max) - (min)));
            currentSymbol =
                'e-' + (value >= percent4 ? iconList[0].trim() : value >= percent3 ? iconList[1].trim() : value >= percent2 ?
                    iconList[2].trim() : value >= percent1 ? iconList[3].trim() : iconList[4].trim());
        }
        cfIcon.classList.add(currentSymbol);
        var dataBar = cellEle.querySelector('.e-cf-databar');
        if (dataBar) {
            cfIcon.style.height = dataBar.style.height;
            cfIcon.classList.add(cellEle.style.verticalAlign === 'top' ? 'e-cf-icon-top' : cellEle.style.verticalAlign === 'middle' ?
                'e-cf-icon-middle' : 'e-cf-icon-end');
        }
        if (wrapText) {
            wrapText.insertBefore(cfIcon, wrapText.firstChild);
        }
        else {
            cellEle.insertBefore(cfIcon, cellEle.childNodes[0]);
        }
        cellEle.classList.add('e-iconset');
        return true;
    };
    ConditionalFormatting.prototype.getIconList = function (iconName) {
        var result = '3arrows-1,3arrows-2,3arrows-3';
        switch (iconName) {
            case 'ThreeArrows':
                return '3arrows-1,3arrows-2,3arrows-3';
            case 'ThreeArrowsGray':
                return '3arrowsgray-1,3arrowsgray-2,3arrowsgray-3';
            case 'FourArrowsGray':
                return '4arrowsgray-1,4arrowsgray-2,4arrowsgray-3,4arrowsgray-4';
            case 'FourArrows':
                return '4arrows-1,4arrows-2,4arrows-3,4arrows-4';
            case 'FiveArrowsGray':
                return '5arrowsgray-1,5arrowsgray-2,5arrowsgray-3,5arrowsgray-4,5arrowsgray-5';
            case 'FiveArrows':
                return '5arrows-1,5arrows-2,5arrows-3,5arrows-4,5arrows-5';
            case 'ThreeTrafficLights1':
                return '3trafficlights-1,3trafficlights-2,3trafficlights-3';
            case 'ThreeTrafficLights2':
                return '3rafficlights2-1,3rafficlights2-2,3rafficlights2-3';
            case 'ThreeSigns':
                return '3signs-1,3signs-2,3signs-3';
            case 'FourTrafficLights':
                return '4trafficlights-1,4trafficlights-2,4trafficlights-3,4trafficlights-4';
            case 'FourRedToBlack':
                return '4redtoblack-1,4redtoblack-2,4redtoblack-3,4redtoblack-4';
            case 'ThreeSymbols':
                return '3symbols-1,3symbols-2,3symbols-3';
            case 'ThreeSymbols2':
                return '3symbols2-1,3symbols2-2,3symbols2-3';
            case 'ThreeFlags':
                return '3flags-1,3flags-2,3flags-3';
            case 'FourRating':
                return '4rating-4,4rating-3,4rating-2,4rating-1';
            case 'FiveQuarters':
                return '5quarters-1,5quarters-2,5quarters-3,5quarters-4,5quarters-5';
            case 'FiveRating':
                return '5rating-5,5rating-4,5rating-3,5rating-2,5rating-1';
            case 'ThreeTriangles':
                return '3triangles-1,3triangles-2,3triangles-3';
            case 'ThreeStars':
                return '3stars-1,3stars-2,3stars-3';
            case 'FiveBoxes':
                return '5boxes-1,5boxes-2,5boxes-3,5boxes-4,5boxes-5';
        }
        return result;
    };
    ConditionalFormatting.prototype.applyDataBars = function (val, cf, td, rIdx, cellType, currentRowHeight) {
        var sheet = this.parent.getActiveSheet();
        var result = cf.result;
        var leftStandardWidth = 0;
        var topVal;
        var value;
        if (isNumber(val)) {
            value = parseFloat(val);
        }
        if ((result[0] === undefined && result[1] === undefined) || isNaN(value) || (isNumber(val) && cellType === 'Text')) {
            var dataBar = td.getElementsByClassName('e-cf-databar')[0];
            if (dataBar) {
                var textContent = dataBar.getElementsByClassName('e-databar-value')[0].textContent;
                var hyperlink_1 = td.querySelector('.e-hyperlink');
                var noteIndicator_1 = td.querySelector('.e-addNoteIndicator');
                var wrapText_1 = td.querySelector('.e-wrap-content');
                if (wrapText_1) {
                    wrapText_1.textContent = '';
                    if (hyperlink_1) {
                        wrapText_1.appendChild(hyperlink_1);
                    }
                    else {
                        wrapText_1.innerText = textContent;
                    }
                }
                else {
                    td.removeChild(dataBar);
                    if (hyperlink_1) {
                        td.appendChild(hyperlink_1);
                    }
                    else {
                        td.innerText = textContent;
                    }
                }
                if (noteIndicator_1) {
                    td.appendChild(noteIndicator_1);
                }
            }
            return;
        }
        if (result[0] !== undefined && result[1] !== undefined) {
            topVal = result[0] + Math.abs(result[1]);
            leftStandardWidth = Math.abs((result[1] / topVal) * 100);
        }
        else if (result[0] !== undefined) {
            topVal = result[0];
        }
        else {
            topVal = result[1];
        }
        var databar = this.parent.createElement('div', { id: 'spreadsheet-databar', className: 'e-cf-databar' });
        var leftSpan = this.parent.createElement('span', { id: 'spreadsheet-leftspan', className: 'e-databar' });
        var rightSpan = this.parent.createElement('span', { id: 'spreadsheet-rightspan', className: 'e-databar' });
        var dataSpan = this.parent.createElement('span', { id: 'spreadsheet-dataspan', className: 'e-databar-value' });
        var iconSetSpan = td.querySelector('.e-iconsetspan');
        var noteIndicator = td.querySelector('.e-addNoteIndicator');
        var wrapText = td.querySelector('.e-wrap-content');
        var rowHeight = currentRowHeight ? currentRowHeight : getRowHeight(sheet, rIdx, true);
        var currencySpan = td.querySelector('#' + this.parent.element.id + '_currency');
        databar.style.height = rowHeight - 1 + 'px';
        if (iconSetSpan) {
            iconSetSpan.style.height = rowHeight - 1 + 'px';
            iconSetSpan.classList.add(td.style.verticalAlign === 'top' ? 'e-cf-icon-top' : td.style.verticalAlign === 'middle' ?
                'e-cf-icon-middle' : 'e-cf-icon-end');
        }
        if (currencySpan) {
            currencySpan.style.alignItems = td.style.verticalAlign === 'top' ? 'start' : td.style.verticalAlign === 'middle' ?
                'center' : 'end';
            currencySpan.classList.add('e-cf-currency');
        }
        var cfColor = cf.type[0];
        if (cfColor === 'L') {
            cfColor += 'B';
        }
        if (result[1] === undefined) {
            rightSpan.style.width = '' + Math.ceil(Math.abs((value / topVal) * 100)) + '%';
            rightSpan.style.height = rowHeight - 3 + 'px';
            rightSpan.style.backgroundColor = this.getColor(cfColor)[0];
            rightSpan.style.left = '0px';
        }
        else if (result[0] === undefined) {
            rightSpan.style.width = '' + Math.ceil(Math.abs((value / topVal) * 100)) + '%';
            rightSpan.style.height = rowHeight - 3 + 'px';
            rightSpan.style.backgroundColor = this.getColor('R')[0];
            rightSpan.style.left = '0px';
        }
        else if (value >= 0) {
            leftSpan.style.width = leftStandardWidth + '%';
            leftSpan.style.height = rowHeight - 3 + 'px'; // -3 buffer of data bar.
            leftSpan.style.backgroundColor = 'transparent';
            leftSpan.style.left = '0px';
            rightSpan.style.width = '' + Math.ceil(Math.abs((value / topVal) * 100)) + '%';
            rightSpan.style.height = rowHeight - 3 + 'px';
            rightSpan.style.backgroundColor = this.getColor(cfColor)[0];
            rightSpan.style.left = leftStandardWidth + '%';
        }
        else {
            leftSpan.style.width = '' + Math.ceil(Math.abs((value / topVal) * 100)) + '%';
            leftSpan.style.height = rowHeight - 3 + 'px';
            leftSpan.style.backgroundColor = this.getColor('R')[0];
            if (leftSpan.style.width === leftStandardWidth + '%') {
                leftSpan.style.left = '0px';
            }
            else {
                leftSpan.style.right = (100 - leftStandardWidth) + '%';
            }
        }
        dataSpan.style.fontSize = td.style.fontSize || '11pt';
        dataSpan.style.alignItems = td.style.verticalAlign === 'top' ? 'start' : td.style.verticalAlign === 'middle' ?
            'center' : 'end';
        dataSpan.style.textDecoration = td.style.textDecoration;
        var curEle = td.querySelector("#" + this.parent.element.id + "_currency");
        if (curEle) {
            databar.appendChild(curEle);
        }
        var hyperlink = td.querySelector('.e-hyperlink');
        if (hyperlink) {
            dataSpan.appendChild(hyperlink);
        }
        else {
            var dataContent = td.querySelector('.e-validation-list') ? td.innerText : td.textContent;
            dataSpan.innerText = dataContent;
            if (dataContent === '') {
                dataSpan.appendChild(document.createTextNode(dataContent));
            }
        }
        databar.appendChild(leftSpan);
        databar.appendChild(rightSpan);
        databar.appendChild(dataSpan);
        td.textContent = '';
        if (wrapText) {
            wrapText.textContent = '';
            if (iconSetSpan) {
                wrapText.appendChild(iconSetSpan);
            }
            wrapText.appendChild(databar);
            td.appendChild(wrapText);
        }
        else {
            if (iconSetSpan) {
                td.insertBefore(iconSetSpan, td.firstElementChild);
            }
            td.appendChild(databar);
        }
        if (noteIndicator) {
            td.appendChild(noteIndicator);
        }
    };
    ConditionalFormatting.prototype.getColor = function (cfColor) {
        if (cfColor === 'LB') {
            return ['#008aef'];
        }
        var colorCodeArr = cfColor.split('');
        var colorArr = [];
        for (var i = 0; i < colorCodeArr.length; i++) {
            switch (colorCodeArr[i]) {
                case 'G':
                    colorArr.push('#63be7b');
                    break;
                case 'Y':
                    colorArr.push('#ffeb84');
                    break;
                case 'R':
                    colorArr.push('#f8696b');
                    break;
                case 'W':
                    colorArr.push('#ffffff');
                    break;
                case 'B':
                    colorArr.push('#5a8ac6');
                    break;
                case 'O':
                    colorArr.push('#ffb628');
                    break;
                case 'LB':
                    colorArr.push('#008aef');
                    break;
                case 'P':
                    colorArr.push('#d6007b');
                    break;
            }
        }
        return colorArr;
    };
    ConditionalFormatting.prototype.getGradient = function (t, start, middle, end, large) {
        if (isNullOrUndefined(end)) {
            return this.getLinear(start, middle, t / large);
        }
        else {
            var center = large / 2;
            return t >= center ? this.getLinear(middle, end, Math.abs((t - center) / center)) : this.getLinear(start, middle, t / center);
        }
    };
    ConditionalFormatting.prototype.getLinear = function (s, e, x) {
        var r = this.byteLinear(s[1] + s[2], e[1] + e[2], x);
        var g = this.byteLinear(s[3] + s[4], e[3] + e[4], x);
        var b = this.byteLinear(s[5] + s[6], e[5] + e[6], x);
        return '#' + r + g + b;
    };
    ConditionalFormatting.prototype.byteLinear = function (a, b, x) {
        var y = (parseInt(a, 16) * (1 - x) + parseInt(b, 16) * x) | 0;
        return Math.abs(y).toString(16);
    };
    ConditionalFormatting.prototype.isGreaterThanLessThan = function (cf, value, input, cellType) {
        if (isNumber(value) && cellType !== 'Text') {
            if (isNumber(input)) {
                var txtRegx = new RegExp(/[^.-a-zA-Z 0-9]+/g);
                return cf.type === 'GreaterThan' ? parseFloat(value) > parseFloat(input.replace(txtRegx, '')) : parseFloat(value) <
                    parseFloat(input.replace(txtRegx, ''));
            }
            else {
                var dateEventArgs = {
                    value: input, rowIndex: 0, colIndex: 0, sheetIndex: 0,
                    isDate: false, updatedVal: '', isTime: false
                };
                this.parent.notify(checkDateFormat, dateEventArgs);
                if (dateEventArgs.isDate || dateEventArgs.isTime) {
                    cf.value = dateEventArgs.updatedVal.toString();
                    return cf.type === 'GreaterThan' ? Number(value) > Number(dateEventArgs.updatedVal) :
                        Number(value) < Number(dateEventArgs.updatedVal);
                }
                else if (input) {
                    return cf.type === 'GreaterThan' ? value.toLowerCase() > input.toLowerCase() : value.toLowerCase() < input.toLowerCase();
                }
            }
        }
        else if (value === '' && Number(input) > 0 && cf.type === 'LessThan') {
            return true;
        }
        return false;
    };
    ConditionalFormatting.prototype.isBetWeen = function (cf, value, input1, input2, isLongDate) {
        var _a, _b;
        if (!isLongDate) {
            var txtRegx = new RegExp(/[^.-a-zA-Z 0-9]+/g);
            input1 = input1.replace(txtRegx, '');
            input2 = input2.replace(txtRegx, '');
        }
        if (isNumber(input1)) {
            var firstVal = parseFloat(input1);
            var secondVal = parseFloat(input2);
            if (firstVal > secondVal) {
                _a = [secondVal, firstVal], firstVal = _a[0], secondVal = _a[1];
            }
            return parseFloat(value) >= firstVal && parseFloat(value) <= secondVal;
        }
        else if (input1 && input2) {
            var dateEventArgs1 = { value: input1, cell: {}, updatedVal: '' };
            var dateEventArgs2 = { value: input2, cell: {}, updatedVal: '' };
            this.parent.notify(checkDateFormat, dateEventArgs1);
            this.parent.notify(checkDateFormat, dateEventArgs2);
            if ((dateEventArgs1.isDate || dateEventArgs1.isTime) && (dateEventArgs2.isDate || dateEventArgs2.isTime)) {
                cf.value = dateEventArgs1.updatedVal + ',' + dateEventArgs2.updatedVal;
                if (dateEventArgs1.updatedVal > dateEventArgs2.updatedVal) {
                    _b = [dateEventArgs2.updatedVal, dateEventArgs1.updatedVal], dateEventArgs1.updatedVal = _b[0], dateEventArgs2.updatedVal = _b[1];
                }
                return value >= dateEventArgs1.updatedVal && value <= dateEventArgs2.updatedVal;
            }
            else {
                return value.toLowerCase() >= input1.toLowerCase() && value.toLowerCase() <= input2.toLowerCase();
            }
        }
        return false;
    };
    ConditionalFormatting.prototype.isEqualTo = function (cf, value, input) {
        if (isNumber(input)) {
            if (value === '') {
                return parseFloat(input) === 0;
            }
            var txtRegx = new RegExp(/[^.-a-zA-Z 0-9]+/g);
            return parseFloat(value) === parseFloat(input.replace(txtRegx, ''));
        }
        else if (!value || !input) {
            return false;
        }
        else {
            var dateTimeArgs = { value: input, cell: {}, updatedVal: '' };
            this.parent.notify(checkDateFormat, dateTimeArgs);
            if (dateTimeArgs.isTime || dateTimeArgs.isDate) {
                cf.value = dateTimeArgs.updatedVal;
                return value === dateTimeArgs.updatedVal;
            }
            else {
                return value.toLowerCase() === input.toLowerCase();
            }
        }
    };
    ConditionalFormatting.prototype.isContainsText = function (value, input) {
        var txtRegx = new RegExp(/[^.-a-zA-Z 0-9]+/g);
        if (isNumber(input.replace(txtRegx, ''))) {
            input = input.replace(txtRegx, '');
            if (isDateTime(value)) {
                value = dateToInt(value).toString();
            }
            return value.indexOf(input) > -1;
        }
        else if (isDateTime(input)) {
            if (isDateTime(value)) {
                value = dateToInt(value).toString();
            }
            return value.indexOf(dateToInt(input).toString()) > -1;
        }
        else {
            return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
        }
    };
    ConditionalFormatting.prototype.setCFStyle = function (style, cf) {
        switch (cf.cFColor) {
            case 'RedFT':
                style.backgroundColor = '#ffc7ce';
                style.color = '#9c0055';
                break;
            case 'YellowFT':
                style.backgroundColor = '#ffeb9c';
                style.color = '#9c6500';
                break;
            case 'GreenFT':
                style.backgroundColor = '#c6efce';
                style.color = '#006100';
                break;
            case 'RedF':
                style.backgroundColor = '#ffc7ce';
                break;
            case 'RedT':
                style.color = '#9c0055';
                break;
        }
        return style;
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    ConditionalFormatting.prototype.getModuleName = function () {
        return 'conditionalFormatting';
    };
    return ConditionalFormatting;
}());
export { ConditionalFormatting };
