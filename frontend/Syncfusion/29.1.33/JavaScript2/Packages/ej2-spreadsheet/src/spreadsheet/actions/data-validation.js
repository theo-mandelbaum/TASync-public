import { editAlert, readonlyAlert, completeAction, createNoteIndicator } from '../index';
import { isValidation, checkDateFormat, applyCellFormat, activeCellChanged, getUpdatedFormula, getCellRefValue, commputeFormulaValue, isReadOnlyCells } from '../../workbook/common/index';
import { getRangeIndexes, getIndexesFromAddress, getCellIndexes, cellValidation, isInMultipleRange } from '../../workbook/common/index';
import { updateCell, isNumber, addListValidationDropdown } from '../../workbook/common/index';
import { getCell, setCell, getFormattedCellObject, getFormattedBarText, getRow, getRowHeight } from '../../workbook/index';
import { isHiddenRow, setRow, beginAction, getSwapRange, checkColumnValidation } from '../../workbook/index';
import { getData, isCellReference, parseLocaleNumber } from '../../workbook/index';
import { getSheet, getSheetIndex, checkIsFormula, isReadOnly } from '../../workbook/index';
import { getColumn, isLocked, updateHighlight, formulaInValidation } from '../../workbook/index';
import { dialog, locale, initiateDataValidation, invalidData, editOperation, keyUp, focus, removeElements } from '../common/index';
import { formulaBarOperation, removeDataValidation } from '../common/index';
import { EventHandler, remove, closest, isNullOrUndefined, select, Browser, getNumericObject } from '@syncfusion/ej2-base';
import { parseThousandSeparator } from '../../workbook/common/internalization';
import { FormValidator, NumericTextBox } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { getBorderHeight, rowHeightChanged } from '../../spreadsheet/index';
import { isHiddenCol, addHighlight, removeHighlight, isCustomDateTime, getTypeFromFormat, refreshRibbonIcons } from '../../workbook/index';
/**
 * Represents Data Validation support for Spreadsheet.
 */
var DataValidation = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Data Validation module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Data Validation module.
     */
    function DataValidation(parent) {
        this.divElements = [];
        this.spanElements = [];
        this.inputElements = [];
        this.checkBoxElements = [];
        this.numericTextBoxElements = [];
        this.dropDownListElements = [];
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the Data Validation module.
     *
     * @returns {void}
     */
    DataValidation.prototype.destroy = function () {
        this.removeEventListener();
        var validationArgs = {};
        if (!this.parent.isDestroyed && !this.parent.refreshing) {
            var activeCellIndex = getCellIndexes(this.parent.getActiveSheet().activeCell);
            var activeCell = this.parent.getCell(activeCellIndex[0], activeCellIndex[1]);
            if (activeCell) {
                validationArgs = { rowIdx: activeCellIndex[0], colIdx: activeCellIndex[1], td: activeCell, isRefresh: true };
            }
        }
        this.removeListDropdownHandler(this.parent.element.querySelector('.e-validation-list'), validationArgs);
        var dataValPopup = select('#' + this.parent.element.id + '_datavalidation-popup');
        if (dataValPopup) {
            dataValPopup.remove();
        }
        this.typeData = [];
        this.operatorData = [];
        if (this.dataList) {
            this.dataList = null;
        }
        if (this.formObj) {
            this.formObj.destroy();
            this.formObj = null;
        }
        this.parent = null;
    };
    DataValidation.prototype.addEventListener = function () {
        if (Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
            EventHandler.add(this.parent.element, 'touchend', this.listOpen, this);
        }
        else {
            EventHandler.add(this.parent.element, 'dblclick', this.listOpen, this);
        }
        this.parent.on(initiateDataValidation, this.initiateDataValidationHandler, this);
        this.parent.on(invalidData, this.invalidDataHandler, this);
        this.parent.on(isValidation, this.isValidCellHandler, this);
        this.parent.on(activeCellChanged, this.listHandler, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
        this.parent.on(removeDataValidation, this.removeValidationHandler, this);
        this.parent.on(updateHighlight, this.updateHighlightHandler, this);
        this.parent.on(rowHeightChanged, this.listValidationHeightHandler, this);
        this.parent.on(addListValidationDropdown, this.addListValidationDropdownHandler, this);
    };
    DataValidation.prototype.removeEventListener = function () {
        if (Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
            EventHandler.remove(this.parent.element, 'touchend', this.listOpen);
        }
        else {
            EventHandler.remove(this.parent.element, 'dblclick', this.listOpen);
        }
        if (!this.parent.isDestroyed) {
            this.parent.off(initiateDataValidation, this.initiateDataValidationHandler);
            this.parent.off(invalidData, this.invalidDataHandler);
            this.parent.off(isValidation, this.isValidCellHandler);
            this.parent.off(activeCellChanged, this.listHandler);
            this.parent.off(keyUp, this.keyUpHandler);
            this.parent.off(removeDataValidation, this.removeValidationHandler);
            this.parent.off(updateHighlight, this.updateHighlightHandler);
            this.parent.off(rowHeightChanged, this.listValidationHeightHandler);
            this.parent.off(addListValidationDropdown, this.addListValidationDropdownHandler);
        }
    };
    DataValidation.prototype.removeValidationHandler = function (eventArgs) {
        var sheet;
        var range;
        var args = { cancel: false, isColSelected: eventArgs.isCol };
        if (eventArgs.range && eventArgs.range.includes('!')) {
            range = eventArgs.range;
            sheet = getSheet(this.parent, getSheetIndex(this.parent, range.substring(0, range.lastIndexOf('!'))));
            if (!sheet) {
                return;
            }
        }
        else {
            sheet = this.parent.getActiveSheet();
            range = sheet.name + '!';
            if (eventArgs.range) {
                range += eventArgs.range;
            }
            else {
                var rangeArgs = this.getRange(sheet.selectedRange);
                range += rangeArgs.range;
                args.isColSelected = rangeArgs.isColSelected;
            }
        }
        args.range = range;
        if (eventArgs.isAction) {
            this.parent.notify(beginAction, { eventArgs: args, action: 'removeValidation' });
        }
        if (!args.cancel) {
            this.parent.notify(cellValidation, { range: range, isRemoveValidation: true });
            if (eventArgs.isAction) {
                delete args.cancel;
                this.parent.notify(completeAction, { eventArgs: args, action: 'removeValidation' });
            }
        }
    };
    DataValidation.prototype.updateNoteIndicator = function (td, rowIndex, columnIndex) {
        var noteIndicator = td.querySelector('.e-addNoteIndicator');
        if (noteIndicator) {
            remove(noteIndicator);
            this.parent.notify(createNoteIndicator, { targetElement: td, rowIndex: rowIndex, columnIndex: columnIndex, skipEvent: true });
        }
    };
    DataValidation.prototype.keyUpHandler = function (e) {
        var target = e.target;
        var dlgEle = this.parent.element.querySelector('.e-datavalidation-dlg');
        if (closest(target, '.e-values') && dlgEle && e.keyCode !== 13) {
            var valuesCont = dlgEle.querySelector('.e-values');
            var errorEle = valuesCont.querySelector('.e-dlg-error');
            var footerCont = dlgEle.querySelector('.e-footer-content');
            var primaryBut = footerCont.querySelector('.e-primary');
            if (primaryBut.hasAttribute('disabled')) {
                primaryBut.removeAttribute('disabled');
            }
            if (errorEle) {
                valuesCont.removeChild(errorEle);
            }
        }
    };
    DataValidation.prototype.listOpen = function (e) {
        var target = e.target;
        if (this.listObj && target.classList.contains('e-cell') && target.querySelector('.e-validation-list') && this.parent.isEdit) {
            this.listObj.showPopup();
        }
    };
    DataValidation.prototype.invalidDataHandler = function (args) {
        var eventArgs = { range: '', cancel: false };
        var actionArgs;
        var action = args.isRemoveHighlight ? removeHighlight : addHighlight;
        if (!args.isPublic) {
            actionArgs = { eventArgs: eventArgs, action: action };
            this.parent.notify(beginAction, actionArgs);
            if (eventArgs.cancel) {
                return;
            }
        }
        this.parent.notify(action, { range: eventArgs.range, isAction: true });
        if (!args.isPublic) {
            actionArgs.preventAction = true;
            this.parent.notify(completeAction, actionArgs);
        }
    };
    DataValidation.prototype.listHandler = function () {
        var sheet = this.parent.getActiveSheet();
        var indexes = getCellIndexes(sheet.activeCell);
        var cell = getCell(indexes[0], indexes[1], sheet);
        var tdEle = this.parent.getCell(indexes[0], indexes[1]);
        if (!tdEle) {
            return;
        }
        this.removeListDropdownHandler(this.parent.element.getElementsByClassName('e-validation-list')[0]);
        var validation = (cell && cell.validation) || (sheet.columns && sheet.columns[indexes[1]] &&
            sheet.columns[indexes[1]].validation);
        if (validation && validation.type === 'List') {
            if (validation.address && !isInMultipleRange(validation.address, indexes[0], indexes[1])) {
                return;
            }
            this.addListValidationDropdownHandler({ cell: cell, validation: validation, td: tdEle, rowIdx: indexes[0], colIdx: indexes[1] });
        }
        if (cell && cell.validation) {
            cell.validation = validation;
        }
    };
    DataValidation.prototype.removeListDropdownHandler = function (listEle, validationArgs) {
        if (listEle) {
            if (this.listObj) {
                this.listObj.destroy();
            }
            remove(listEle);
            if (!validationArgs) {
                if (!isNullOrUndefined(this.parent.selectionModule.previousActiveCell)) {
                    var pervActiveCellIdx = getCellIndexes(this.parent.selectionModule.previousActiveCell);
                    var pervActiveCellEle = this.parent.getCell(pervActiveCellIdx[0], pervActiveCellIdx[1]);
                    if (pervActiveCellEle) {
                        this.updateNoteIndicator(pervActiveCellEle, pervActiveCellIdx[0], pervActiveCellIdx[1]);
                    }
                }
            }
            else if (validationArgs.isRefresh) {
                this.updateNoteIndicator(validationArgs.td, validationArgs.rowIdx, validationArgs.colIdx);
            }
        }
    };
    DataValidation.prototype.addListValidationDropdownHandler = function (args) {
        var _this = this;
        if (args.updatePosition) {
            this.updateTopPosition({ ddlCont: args.ddlCont, rowIdx: args.rowIdx, colIdx: args.colIdx });
            return;
        }
        var inCellDropDown = args.validation.inCellDropDown;
        if (args.isRefresh) {
            if (!args.td) {
                args.td = this.parent.getCell(args.rowIdx, args.colIdx);
                if (!args.td) {
                    return;
                }
            }
            this.removeListDropdownHandler(args.td.querySelector('.e-validation-list'), args);
            if (args.validation.type !== 'List') {
                return;
            }
            if (isNullOrUndefined(inCellDropDown)) {
                inCellDropDown = true;
            }
        }
        else {
            if (isNullOrUndefined(args.validation.ignoreBlank)) {
                args.validation.ignoreBlank = true;
            }
            if (isNullOrUndefined(inCellDropDown)) {
                inCellDropDown = args.validation.inCellDropDown = true;
            }
        }
        if (inCellDropDown) {
            var ddlCont = this.parent.createElement('div', { className: 'e-validation-list' });
            var ddlEle = this.parent.createElement('input', { id: this.parent.element.id + 'listValid' });
            ddlCont.appendChild(ddlEle);
            var isDevice_1;
            var tdEle_1 = args.td;
            var parent_1 = tdEle_1.getElementsByClassName('e-wrap-content')[0] || tdEle_1;
            this.updateTopPosition({ ddlCont: ddlCont, rowIdx: args.rowIdx, colIdx: args.colIdx });
            this.listValidationHeightHandler({ ddlCont: ddlCont });
            parent_1.insertBefore(ddlCont, parent_1.firstChild);
            var validationVal = args.validation.value1;
            if ((!args.cell || !args.cell.validation) && validationVal.startsWith('=')) {
                validationVal = getUpdatedFormula([args.rowIdx, args.colIdx, args.rowIdx, args.colIdx], [0, args.colIdx, 0, args.colIdx], this.parent.getActiveSheet(), this.parent, { formula: validationVal });
            }
            var dataSource = this.getListDataSource(validationVal);
            this.listObj = new DropDownList({
                index: this.setDropDownListIndex(dataSource, args.cell),
                dataSource: dataSource,
                fields: { text: 'text', value: 'id' },
                width: '0px',
                popupHeight: '200px',
                change: function () { return _this.listValueChange(_this.listObj.text); },
                beforeOpen: function () {
                    isDevice_1 = window.browserDetails.isDevice;
                    if (isDevice_1) {
                        window.browserDetails.isDevice = false;
                    }
                },
                open: function (args) {
                    args.popup.offsetX = _this.listObj.enableRtl ? 3 : -tdEle_1.offsetWidth + (_this.parent.enableRtl ? 4 : 24);
                    args.popup.offsetY = -(tdEle_1.querySelector('.e-control-wrapper.e-ddl').offsetHeight - 18);
                    args.popup.element.style.width = tdEle_1.offsetWidth - 1 + 'px';
                    if (isDevice_1) {
                        window.browserDetails.isDevice = true;
                    }
                },
                close: function (args) {
                    if (args.event && (args.event.keyCode === 13 ||
                        (args.event.altKey && args.event.keyCode === 38))) {
                        args.event.preventDefault();
                        args.event.stopPropagation();
                    }
                    focus(_this.parent.element);
                }
            });
            this.listObj.appendTo(ddlEle);
            this.updateNoteIndicator(tdEle_1, args.rowIdx, args.colIdx);
        }
    };
    DataValidation.prototype.updateTopPosition = function (args) {
        var sheet = this.parent.getActiveSheet();
        var cell = getCell(args.rowIdx, args.colIdx, sheet);
        if (cell && cell.style && cell.style.fontSize && parseFloat(cell.style.fontSize) > 11) {
            args.ddlCont.style.top = parseFloat(cell.style.fontSize) - 11 + "pt";
        }
        else if (args.ddlCont.style.top) {
            args.ddlCont.style.top = '';
        }
    };
    DataValidation.prototype.listValidationHeightHandler = function (args) {
        var sheet = this.parent.getActiveSheet();
        var indexes = getCellIndexes(sheet.activeCell);
        var cell = getCell(indexes[0], indexes[1], sheet);
        var validation = (cell && cell.validation) || (sheet.columns && sheet.columns[indexes[1]] &&
            sheet.columns[indexes[1]].validation);
        if (validation && validation.type === 'List') {
            if (validation.inCellDropDown) {
                var tdRowHeight = getRowHeight(sheet, indexes[0], true) - getBorderHeight(indexes[0], indexes[1], sheet);
                if (tdRowHeight <= 18) {
                    var ddlCont = args.ddlCont || this.parent.element.querySelector('.e-validation-list');
                    if (ddlCont) {
                        ddlCont.style.height = tdRowHeight + 'px';
                    }
                }
                else if (!args.ddlCont) {
                    var ddlCont = this.parent.element.querySelector('.e-validation-list');
                    if (ddlCont) {
                        ddlCont.style.removeProperty('height');
                    }
                }
            }
        }
    };
    DataValidation.prototype.setDropDownListIndex = function (dataSource, cell) {
        if (cell && !isNullOrUndefined(cell.value)) {
            var cellVal = cell.value.toString();
            var isNumVal = isNumber(cellVal);
            var numObj = isNumVal && getNumericObject(this.parent.locale);
            for (var idx = 0, len = dataSource.length; idx < len; idx++) {
                if (dataSource[idx].text === cellVal || (isNumVal &&
                    this.parseValidationValue(dataSource[idx].text, numObj).toString() === cellVal)) {
                    return idx;
                }
            }
        }
        return null;
    };
    DataValidation.prototype.getListDataSource = function (validationVal) {
        var _this = this;
        var data = [];
        var count = 0;
        var definedNames = this.parent.definedNames;
        var value = validationVal;
        var isRange = value.startsWith('=');
        if (definedNames.length > 0 && isRange) {
            var listValue = value.split('=')[1];
            for (var idx = 0, len = definedNames.length; idx < len; idx++) {
                if (definedNames[idx].name === listValue) {
                    var definedNameRange = definedNames[idx].refersTo;
                    while (definedNameRange.includes('\'')) {
                        definedNameRange = definedNameRange.replace('\'', '');
                    }
                    value = definedNameRange;
                }
            }
        }
        if (isRange) {
            var sheet = void 0;
            var address = void 0;
            var sheetName = void 0;
            var lastIndex = value.lastIndexOf('!');
            if (lastIndex > -1) {
                sheetName = value.substring(1, lastIndex);
                address = value.substring(lastIndex + 1);
                if (sheetName.startsWith('\'') && sheetName.endsWith('\'')) {
                    sheetName = sheetName.substring(1, sheetName.length - 1);
                }
                sheet = getSheet(this.parent, getSheetIndex(this.parent, sheetName));
            }
            else {
                sheet = this.parent.getActiveSheet();
                address = value.substring(1);
            }
            var activeSheet_1 = this.parent.getActiveSheet();
            if (sheet) {
                if (sheet.name !== activeSheet_1.name) {
                    var isNotLoaded_1;
                    var selectedRange_1 = getRangeIndexes(activeSheet_1.selectedRange);
                    sheet.ranges.forEach(function (range) {
                        if (!range.info || !range.info.loadedRange || !range.info.loadedRange.length) {
                            isNotLoaded_1 = true;
                            return;
                        }
                    });
                    if (isNotLoaded_1) {
                        this.parent.showSpinner();
                        getData(this.parent, sheet.name + "!" + address).then(function () {
                            _this.parent.hideSpinner();
                            if (activeSheet_1.name === _this.parent.getActiveSheet().name) {
                                var curRange = getRangeIndexes(_this.parent.getActiveSheet().selectedRange);
                                if (curRange[0] === selectedRange_1[0] && curRange[1] === selectedRange_1[1]) {
                                    var dataSource = _this.getListDataSource(validationVal);
                                    _this.listObj.dataSource = dataSource;
                                    var cell_1 = getCell(curRange[0], curRange[1], activeSheet_1);
                                    _this.listObj.index = _this.setDropDownListIndex(dataSource, cell_1);
                                    _this.listObj.dataBind();
                                }
                            }
                        });
                    }
                }
                var indexes = void 0;
                var range = address.split(':');
                if (range[0] && range[1] && ((range[0].match(/[a-z]+$/ig) && range[1].match(/[a-z]+$/ig)) ||
                    (range[0].match(/^[0-9]/g) && range[1].match(/^[0-9]/g)))) {
                    var addressInfo = this.parent.getIndexes(address);
                    if (addressInfo.isCol) {
                        indexes = [0, addressInfo.startIdx, sheet.usedRange.rowIndex, addressInfo.startIdx];
                    }
                    else {
                        indexes = [addressInfo.startIdx, 0, addressInfo.startIdx, sheet.usedRange.colIndex];
                    }
                }
                else {
                    indexes = getRangeIndexes(address);
                }
                var cell = void 0;
                for (var rowIdx = indexes[0]; rowIdx <= indexes[2]; rowIdx++) {
                    if (!sheet.rows[rowIdx]) {
                        setRow(sheet, rowIdx, {});
                    }
                    for (var colIdx = indexes[1]; colIdx <= indexes[3]; colIdx++) {
                        if (!sheet.rows[rowIdx].cells) {
                            setCell(rowIdx, colIdx, sheet, {});
                        }
                        count += 1;
                        cell = sheet.rows[rowIdx].cells[colIdx];
                        var formattedText = this.parent.getDisplayText(cell) || '';
                        data.push({ text: formattedText, id: 'list-' + count });
                    }
                }
            }
        }
        else {
            var listValues = this.getListOfValues(value);
            for (var idx = 0; idx < listValues.length; idx++) {
                count += 1;
                data.push({ text: listValues[idx], id: 'list-' + count });
            }
        }
        return data;
    };
    DataValidation.prototype.listValueChange = function (value) {
        var sheet = this.parent.getActiveSheet();
        var cellIdx = getIndexesFromAddress(sheet.activeCell);
        var cellObj = Object.assign({}, getCell(cellIdx[0], cellIdx[1], sheet));
        if (sheet.isProtected && isLocked(cellObj, getColumn(sheet, cellIdx[1]))) {
            this.parent.notify(editAlert, null);
        }
        else if (isReadOnly(cellObj, getColumn(sheet, cellIdx[1]), getRow(sheet, cellIdx[0]))) {
            this.parent.notify(readonlyAlert, null);
        }
        else {
            if (this.parent.isEdit) {
                this.parent.closeEdit();
            }
            var args = { value: value, oldValue: cellObj.value,
                address: sheet.name + '!' + sheet.activeCell, cancel: false };
            this.parent.notify(beginAction, { action: 'cellSave', eventArgs: args });
            if (args.cancel) {
                return;
            }
            var cell = { value: value, formula: '' };
            if (cellObj.format && isCustomDateTime(cellObj.format) && !isNumber(value)) {
                var formatArgs = { formattedText: value, value: value, format: 'General',
                    cell: { value: value, format: 'General' }, isEdit: true };
                this.parent.notify(getFormattedCellObject, formatArgs);
                if (formatArgs.format !== 'General' && ['Currency', 'Percentage'].indexOf(getTypeFromFormat(formatArgs.format)) > -1) {
                    cell.format = formatArgs.format;
                    cell.value = formatArgs.value;
                }
            }
            var cancelled = updateCell(this.parent, sheet, { cell: cell, rowIdx: cellIdx[0], colIdx: cellIdx[1], valChange: true, lastCell: true, checkCF: true,
                uiRefresh: true });
            if (!cancelled) {
                var cell_2 = getCell(cellIdx[0], cellIdx[1], sheet, false, true);
                delete cell_2.formula;
                this.parent.notify(formulaBarOperation, { action: 'refreshFormulabar', cell: cell_2 });
                this.parent.notify(refreshRibbonIcons, null);
                this.parent.notify(completeAction, { action: 'cellSave', eventArgs: { value: value, oldValue: cellObj.value, address: sheet.name + '!' + sheet.activeCell } });
            }
        }
    };
    DataValidation.prototype.getRange = function (range) {
        var indexes = getRangeIndexes(range);
        var sheet = this.parent.getActiveSheet();
        var maxRowCount = sheet.rowCount;
        var isColSelected;
        if (indexes[2] === maxRowCount - 1 && indexes[0] === 0) {
            range = range.replace(/[0-9]/g, '');
            isColSelected = true;
        }
        return { range: range, isColSelected: isColSelected };
    };
    DataValidation.prototype.initiateDataValidationHandler = function () {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var indexes = getRangeIndexes(sheet.selectedRange);
        var rowIdx = indexes[0];
        var colIdx = indexes[1];
        var rowIterateCondition;
        var updateRowIdx;
        if (indexes[2] >= indexes[0]) {
            rowIterateCondition = function () { return rowIdx <= indexes[2]; };
            updateRowIdx = function () { rowIdx++; };
        }
        else {
            rowIterateCondition = function () { return rowIdx >= indexes[2]; };
            updateRowIdx = function () { rowIdx--; };
        }
        var colIterateCondition;
        var updateColIdx;
        if (indexes[3] >= indexes[1]) {
            colIterateCondition = function () { return colIdx <= indexes[3]; };
            updateColIdx = function () { colIdx++; };
        }
        else {
            colIterateCondition = function () { return colIdx >= indexes[3]; };
            updateColIdx = function () { colIdx--; };
        }
        var cell;
        var moreValidation;
        var cellsWithoutValidation;
        var validation;
        var curValidation;
        var isVal1Formula;
        var isVal2Formula;
        var updateFormula = function (curIdx, prevIdx) {
            if (isVal1Formula) {
                var updatedFormula = getUpdatedFormula(curIdx, prevIdx, sheet, _this.parent, { formula: validation.value1 });
                if (!updatedFormula.includes('#REF!')) {
                    validation.value1 = updatedFormula;
                }
            }
            if (isVal2Formula) {
                var updatedFormula = getUpdatedFormula(curIdx, prevIdx, sheet, _this.parent, { formula: validation.value2 });
                if (!updatedFormula.includes('#REF!')) {
                    validation.value2 = updatedFormula;
                }
            }
        };
        for (rowIdx; rowIterateCondition(); updateRowIdx()) {
            for (colIdx; colIterateCondition(); updateColIdx()) {
                cell = getCell(rowIdx, colIdx, sheet, false, true);
                curValidation = cell.validation || (checkColumnValidation(sheet.columns[colIdx], rowIdx, colIdx) &&
                    sheet.columns[colIdx].validation);
                if (curValidation) {
                    if (validation) {
                        if (curValidation.type !== validation.type || curValidation.operator !== validation.operator ||
                            ((!isVal1Formula || !checkIsFormula(curValidation.value1)) && curValidation.value1 !== validation.value1) ||
                            ((!isVal2Formula || !checkIsFormula(curValidation.value2)) && curValidation.value2 !== validation.value2)) {
                            moreValidation = true;
                            break;
                        }
                    }
                    else {
                        validation = Object.assign({}, curValidation);
                        isVal1Formula = checkIsFormula(validation.value1);
                        isVal2Formula = checkIsFormula(validation.value2);
                        if (!cell.validation) {
                            updateFormula([rowIdx, colIdx, rowIdx, colIdx], [0, colIdx, 0, colIdx]);
                        }
                        var actIdxes = getRangeIndexes(sheet.activeCell);
                        if (rowIdx !== actIdxes[0] || colIdx !== actIdxes[1]) {
                            updateFormula(actIdxes, [rowIdx, colIdx, rowIdx, colIdx]);
                        }
                    }
                }
                else {
                    cellsWithoutValidation = true;
                }
            }
            colIdx = indexes[1];
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var validationDialogHandler = function (validation) {
            if (!_this.parent.element.querySelector('.e-datavalidation-dlg')) {
                var range_1 = _this.getRange(sheet.selectedRange).range;
                dialogInst.show({
                    width: 375, showCloseIcon: true, isModal: true, cssClass: 'e-datavalidation-dlg',
                    header: l10n.getConstant('DataValidation'),
                    beforeOpen: function (args) {
                        var dlgArgs = { dialogName: 'ValidationDialog', element: args.element,
                            target: args.target, cancel: args.cancel };
                        _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                        if (dlgArgs.cancel) {
                            args.cancel = true;
                        }
                        else {
                            dialogInst.dialogInstance.content = _this.dataValidationContent(l10n, range_1, validation);
                            dialogInst.dialogInstance.dataBind();
                            focus(_this.parent.element);
                        }
                    },
                    beforeClose: _this.dialogBeforeClose.bind(_this),
                    buttons: [{
                            buttonModel: {
                                content: l10n.getConstant('ClearAll'),
                                cssClass: 'e-btn e-clearall-btn e-flat'
                            },
                            click: function () {
                                dialogInst.dialogInstance.content = _this.dataValidationContent(l10n, range_1);
                                dialogInst.dialogInstance.dataBind();
                            }
                        },
                        {
                            buttonModel: { content: l10n.getConstant('Apply'), isPrimary: true },
                            click: function () {
                                _this.dlgClickHandler(dialogInst);
                            }
                        }]
                });
            }
        };
        if (moreValidation || (validation && cellsWithoutValidation)) {
            var dialogName_1;
            var btns = [{
                    buttonModel: { isPrimary: true, cssClass: 'e-btn-goto-ok' },
                    click: function () {
                        dialogInst.hide(true);
                        validationDialogHandler();
                    }
                }];
            if (moreValidation) {
                dialogName_1 = 'MoreValidation';
                btns[0].buttonModel.content = l10n.getConstant('Ok');
            }
            else {
                dialogName_1 = 'ExtendValidation';
                btns[0].buttonModel.content = l10n.getConstant('No');
                btns.splice(0, 0, {
                    buttonModel: {
                        content: l10n.getConstant('Yes'), isPrimary: true, cssClass: 'e-btn-goto-ok'
                    },
                    click: function () {
                        dialogInst.hide(true);
                        validationDialogHandler(validation);
                    }
                });
            }
            var dialogContent_1 = l10n.getConstant(dialogName_1);
            var dlg = {
                width: 350, isModal: true, showCloseIcon: true, cssClass: 'e-goto-dlg', header: l10n.getConstant('Spreadsheet'),
                content: dialogContent_1,
                beforeOpen: function (args) {
                    var dlgArgs = { dialogName: dialogName_1, element: args.element, target: args.target,
                        cancel: args.cancel, content: dialogContent_1 };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                    else {
                        if (dlgArgs.content !== dialogContent_1) {
                            dialogInst.dialogInstance.content = dlgArgs.content;
                            dialogInst.dialogInstance.dataBind();
                        }
                        focus(_this.parent.element);
                    }
                },
                buttons: btns
            };
            dialogInst.show(dlg);
        }
        else {
            validationDialogHandler(validation);
        }
    };
    DataValidation.prototype.dataValidationContent = function (l10n, range, validation) {
        var _this = this;
        var value1;
        var value2;
        var type;
        var isNew = !validation;
        var operator;
        var ignoreBlank;
        if (isNew) {
            value1 = value2 = '0';
            ignoreBlank = true;
        }
        else {
            var val1 = validation.value1;
            var val2 = validation.value2;
            type = validation.type;
            operator = validation.operator;
            ignoreBlank = validation.ignoreBlank === false ? false : true;
            if (type === 'Date' || type === 'Time') {
                var getFormattedDate = function (val) {
                    if (isNumber(val)) {
                        var args = { cell: { value: val }, type: type.toLowerCase(),
                            value: val };
                        _this.parent.notify(getFormattedBarText, args);
                        return args.value;
                    }
                    return val;
                };
                value1 = getFormattedDate(val1);
                value2 = getFormattedDate(val2);
            }
            else {
                var getFormattedValue = function (val) {
                    if (isNumber(val)) {
                        val = val.toString();
                        var localeObj = getNumericObject(_this.parent.locale);
                        if (localeObj.decimal !== '.' && val.includes('.')) {
                            val = val.replace('.', localeObj.decimal);
                        }
                    }
                    return val;
                };
                value1 = getFormattedValue(val1);
                value2 = getFormattedValue(val2);
            }
        }
        var dlgContent = this.parent.createElement('div', { className: 'e-validation-dlg' });
        var cellRangeCont = this.parent.createElement('div', { className: 'e-cellrange' });
        var allowDataCont = this.parent.createElement('div', { className: 'e-allowdata' });
        var valuesCont = this.parent.createElement('div', { className: 'e-values' });
        var ignoreBlankCont = this.parent.createElement('div', { className: 'e-ignoreblank' });
        this.divElements.push(dlgContent);
        this.divElements.push(cellRangeCont);
        this.divElements.push(allowDataCont);
        this.divElements.push(valuesCont);
        this.divElements.push(ignoreBlankCont);
        dlgContent.appendChild(cellRangeCont);
        dlgContent.appendChild(allowDataCont);
        dlgContent.appendChild(valuesCont);
        dlgContent.appendChild(ignoreBlankCont);
        var cellRangeText = this.parent.createElement('span', { className: 'e-header' });
        cellRangeText.innerText = l10n.getConstant('CellRange');
        var cellRangeEle = this.parent.createElement('input', {
            className: 'e-input',
            attrs: { value: range, 'aria-label': l10n.getConstant('CellRange') }
        });
        cellRangeCont.appendChild(cellRangeText);
        cellRangeCont.appendChild(cellRangeEle);
        var allowCont = this.parent.createElement('div', { className: 'e-allow' });
        var dataCont = this.parent.createElement('div', { className: 'e-data' });
        allowDataCont.appendChild(allowCont);
        allowDataCont.appendChild(dataCont);
        var allowText = this.parent.createElement('span', { className: 'e-header' });
        allowText.innerText = l10n.getConstant('Allow');
        this.typeData = [
            { text: l10n.getConstant('WholeNumber'), id: 'type-1' },
            { text: l10n.getConstant('Decimal'), id: 'type-2' },
            { text: l10n.getConstant('Date'), id: 'type-3' },
            { text: l10n.getConstant('Time'), id: 'type-4' },
            { text: l10n.getConstant('TextLength'), id: 'type-5' },
            { text: l10n.getConstant('List'), id: 'type-6' },
            { text: l10n.getConstant('Custom'), id: 'type-7' }
        ];
        this.operatorData = [
            { text: l10n.getConstant('Between'), id: 'operator-1' },
            { text: l10n.getConstant('NotBetween'), id: 'operator-2' },
            { text: l10n.getConstant('EqualTo'), id: 'operator-3' },
            { text: l10n.getConstant('NotEqualTo'), id: 'operator-4' },
            { text: l10n.getConstant('GreaterThan'), id: 'operator-5' },
            { text: l10n.getConstant('LessThan'), id: 'operator-6' },
            { text: l10n.getConstant('GreaterThanOrEqualTo'), id: 'operator-7' },
            { text: l10n.getConstant('LessThanOrEqualTo'), id: 'operator-8' }
        ];
        var allowSelectEle = this.parent.createElement('input', { className: 'e-select' });
        this.spanElements.push(cellRangeText);
        this.inputElements.push(cellRangeEle);
        this.divElements.push(allowCont);
        this.divElements.push(dataCont);
        this.spanElements.push(allowText);
        this.inputElements.push(allowSelectEle);
        var allowIdx = 0;
        if (!isNew) {
            if (type) {
                type = this.formattedType(type);
            }
            for (var idx = 0; idx < this.typeData.length; idx++) {
                if (type === this.formattedType(this.typeData[idx].text)) {
                    allowIdx = idx;
                    break;
                }
            }
        }
        if (isNew || (type !== 'List' && type !== 'Custom')) {
            var dataIdx = 0;
            var dataText = this.parent.createElement('span', { className: 'e-header' });
            dataText.innerText = l10n.getConstant('Data');
            var dataSelectEle = this.parent.createElement('input', { className: 'e-select' });
            if (!isNew) {
                for (var idx = 0; idx < this.operatorData.length; idx++) {
                    if (operator === this.formattedValue(this.operatorData[idx].text)) {
                        dataIdx = idx;
                        break;
                    }
                }
            }
            dataCont.appendChild(dataText);
            dataCont.appendChild(dataSelectEle);
            this.spanElements.push(dataText);
            this.inputElements.push(dataSelectEle);
            this.dataList = new DropDownList({
                dataSource: this.operatorData,
                index: dataIdx,
                popupHeight: '200px',
                change: this.userInput.bind(this)
            });
            this.dropDownListElements.push(this.dataList);
            this.dataList.appendTo(dataSelectEle);
        }
        else if (type !== 'Custom') {
            var ignoreBlankEle_1 = this.parent.createElement('input', { className: 'e-checkbox' });
            dataCont.appendChild(ignoreBlankEle_1);
            var ignoreBlankObj_1 = new CheckBox({ label: l10n.getConstant('InCellDropDown'), checked: validation.inCellDropDown === false ? false : true });
            this.checkBoxElements.push(ignoreBlankObj_1);
            ignoreBlankObj_1.appendTo(ignoreBlankEle_1);
            this.inputElements.push(ignoreBlankEle_1);
        }
        allowCont.appendChild(allowText);
        allowCont.appendChild(allowSelectEle);
        this.typeList = new DropDownList({
            dataSource: this.typeData,
            index: allowIdx,
            popupHeight: '200px',
            change: this.userInput.bind(this)
        });
        this.dropDownListElements.push(this.typeList);
        this.typeList.appendTo(allowSelectEle);
        var createContEle = function (labelKey, value) {
            var valueText = _this.parent.createElement('span', { className: 'e-header' });
            valueText.innerText = labelKey;
            var valueEle = _this.parent.createElement('input', { className: 'e-input', attrs: { value: value } });
            valuesCont.appendChild(valueText);
            valuesCont.appendChild(valueEle);
            _this.spanElements.push(valueText);
            _this.inputElements.push(valueEle);
        };
        if (isNew || ((this.typeList.value !== l10n.getConstant('List') && this.typeList.value !== l10n.getConstant('Custom')) &&
            (this.dataList.value === l10n.getConstant('Between') || this.dataList.value === l10n.getConstant('NotBetween')))) {
            var minimumCont = this.parent.createElement('div', { className: 'e-minimum' });
            var maximumCont = this.parent.createElement('div', { className: 'e-maximum' });
            valuesCont.appendChild(minimumCont);
            valuesCont.appendChild(maximumCont);
            var minimumText = this.parent.createElement('span', { className: 'e-header' });
            minimumText.innerText = l10n.getConstant('Minimum');
            var maximumText = this.parent.createElement('span', { className: 'e-header' });
            maximumText.innerText = l10n.getConstant('Maximum');
            var minimumInp = this.parent.createElement('input', {
                id: 'minvalue',
                className: 'e-input', attrs: { value: value1, 'aria-label': l10n.getConstant('Minimum') }
            });
            var maximumInp = this.parent.createElement('input', {
                id: 'maxvalue',
                className: 'e-input', attrs: { value: value2, 'aria-label': l10n.getConstant('Maximum') }
            });
            minimumCont.appendChild(minimumText);
            minimumCont.appendChild(minimumInp);
            maximumCont.appendChild(maximumText);
            maximumCont.appendChild(maximumInp);
            this.divElements.push(minimumCont);
            this.divElements.push(maximumCont);
            this.spanElements.push(minimumText);
            this.spanElements.push(maximumText);
            this.inputElements.push(minimumInp);
            this.inputElements.push(maximumInp);
            var numericMin = new NumericTextBox({
                value: 0
            });
            this.numericTextBoxElements.push(numericMin);
            numericMin.appendTo('#minvalue');
            var numericMax = new NumericTextBox({
                value: 0
            });
            this.numericTextBoxElements.push(numericMax);
            numericMax.appendTo('#maxvalue');
        }
        else if (!isNew && type === 'List') {
            createContEle(l10n.getConstant('Sources'), value1);
        }
        else if (!isNew && type === 'Custom') {
            createContEle(l10n.getConstant('Formula'), value1);
        }
        else {
            createContEle(l10n.getConstant('Value'), value1);
        }
        var ignoreBlankEle = this.parent.createElement('input', { className: 'e-checkbox' });
        ignoreBlankCont.appendChild(ignoreBlankEle);
        var ignoreBlankObj = new CheckBox({ label: l10n.getConstant('IgnoreBlank'), checked: ignoreBlank });
        this.checkBoxElements.push(ignoreBlankObj);
        ignoreBlankObj.appendTo(ignoreBlankEle);
        this.inputElements.push(ignoreBlankEle);
        return dlgContent;
    };
    DataValidation.prototype.dialogBeforeClose = function () {
        this.checkBoxElements.forEach(function (checkbox) {
            if (checkbox && checkbox.element) {
                checkbox.destroy();
                checkbox.element.remove();
            }
        });
        this.checkBoxElements = [];
        this.numericTextBoxElements.forEach(function (numericTextBox) {
            if (numericTextBox && numericTextBox.element) {
                numericTextBox.destroy();
                numericTextBox.element.remove();
            }
        });
        this.numericTextBoxElements = [];
        this.dropDownListElements.forEach(function (dropDownList) {
            if (dropDownList && dropDownList.element) {
                dropDownList.destroy();
                dropDownList.element.remove();
            }
        });
        this.dropDownListElements = [];
        removeElements(this.spanElements);
        this.spanElements = [];
        removeElements(this.inputElements);
        this.inputElements = [];
        removeElements(this.divElements);
        this.divElements = [];
    };
    DataValidation.prototype.userInput = function () {
        var listObj = this.typeList;
        var listObj1 = this.dataList;
        var dlgEle = this.parent.element.querySelector('.e-datavalidation-dlg');
        var dlgCont = dlgEle.querySelector('.e-validation-dlg');
        var allowDataCont = dlgCont.querySelector('.e-allowdata');
        var valuesCont = dlgCont.querySelector('.e-values');
        var l10n = this.parent.serviceLocator.getService(locale);
        var dataCont = allowDataCont.querySelector('.e-data');
        var clearChildEle = function (element) {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        };
        clearChildEle(valuesCont);
        if (listObj.value === l10n.getConstant('List')) {
            clearChildEle(dataCont);
            var cellDropDownEle = this.parent.createElement('input', { className: 'e-checkbox' });
            this.inputElements.push(cellDropDownEle);
            dataCont.appendChild(cellDropDownEle);
            var cellDropDownOhj = new CheckBox({ label: l10n.getConstant('InCellDropDown'), checked: true });
            this.checkBoxElements.push(cellDropDownOhj);
            cellDropDownOhj.appendTo(cellDropDownEle);
        }
        else if (listObj.value === l10n.getConstant('Custom')) {
            clearChildEle(dataCont);
        }
        else if (!dataCont.childElementCount || dataCont.getElementsByClassName('e-checkbox-wrapper')[0]) {
            clearChildEle(dataCont);
            var dataText = this.parent.createElement('span', { className: 'e-header' });
            dataText.innerText = l10n.getConstant('Data');
            var dataSelectEle = this.parent.createElement('input', { className: 'e-select' });
            this.spanElements.push(dataText);
            this.inputElements.push(dataSelectEle);
            dataCont.appendChild(dataText);
            dataCont.appendChild(dataSelectEle);
            listObj1.appendTo(dataSelectEle);
        }
        if ((listObj.value !== l10n.getConstant('List') && listObj.value !== l10n.getConstant('Custom')) && (listObj1.value === l10n.getConstant('Between') || listObj1.value === l10n.getConstant('NotBetween'))) {
            var minimumCont = this.parent.createElement('div', { className: 'e-minimum' });
            var maximumCont = this.parent.createElement('div', { className: 'e-maximum' });
            this.divElements.push(minimumCont);
            this.divElements.push(maximumCont);
            valuesCont.appendChild(minimumCont);
            valuesCont.appendChild(maximumCont);
            var minimumText = this.parent.createElement('span', { className: 'e-header' });
            minimumText.innerText = l10n.getConstant('Minimum');
            var maximumText = this.parent.createElement('span', { className: 'e-header' });
            maximumText.innerText = l10n.getConstant('Maximum');
            var minimumInp = this.parent.createElement('input', { id: 'min', className: 'e-input', attrs: { value: '0' } });
            var maximumInp = this.parent.createElement('input', { id: 'max', className: 'e-input', attrs: { value: '0' } });
            this.spanElements.push(minimumText);
            this.spanElements.push(maximumText);
            this.inputElements.push(minimumInp);
            this.inputElements.push(maximumInp);
            var numericMin = new NumericTextBox({
                value: 0
            });
            this.numericTextBoxElements.push(numericMin);
            numericMin.appendTo('min');
            var numericMax = new NumericTextBox({
                value: 0
            });
            this.numericTextBoxElements.push(numericMax);
            numericMax.appendTo('max');
            minimumCont.appendChild(minimumText);
            minimumCont.appendChild(minimumInp);
            maximumCont.appendChild(maximumText);
            maximumCont.appendChild(maximumInp);
        }
        else {
            var valueText = this.parent.createElement('span', { className: 'e-header' });
            valueText.innerText = listObj.value === l10n.getConstant('List') ? l10n.getConstant('Sources') :
                listObj.value === l10n.getConstant('Custom') ? l10n.getConstant('Formula') : l10n.getConstant('Value');
            var valueEle = listObj.value === l10n.getConstant('List') ? this.parent.createElement('input', {
                className: 'e-input',
                attrs: { placeholder: 'Enter value' }
            }) :
                this.parent.createElement('input', { className: 'e-input', attrs: { value: '0' } });
            this.spanElements.push(valueText);
            this.inputElements.push(valueEle);
            valuesCont.appendChild(valueText);
            valuesCont.appendChild(valueEle);
        }
    };
    DataValidation.prototype.dlgClickHandler = function (dialogInst) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var errorMsg;
        var dlgEle = this.parent.element.querySelector('.e-datavalidation-dlg');
        var dlgFooter = dlgEle.querySelector('.e-footer-content');
        var dlgContEle = dlgEle.getElementsByClassName('e-dlg-content')[0].
            getElementsByClassName('e-validation-dlg')[0];
        var allowData = dlgContEle.getElementsByClassName('e-allowdata')[0];
        var allowEle = allowData.getElementsByClassName('e-allow')[0].getElementsByTagName('input')[0];
        var dataEle = allowData.getElementsByClassName('e-data')[0].getElementsByTagName('input')[0];
        var values = dlgContEle.getElementsByClassName('e-values')[0];
        var valueArr = [];
        valueArr[0] = values.getElementsByTagName('input')[0].value;
        valueArr[1] = values.getElementsByTagName('input')[1] ? values.getElementsByTagName('input')[1].value : '';
        var type = this.formattedType(allowEle.value);
        var isValid = true;
        var ignoreBlank = dlgContEle.querySelector('.e-ignoreblank .e-checkbox').checked;
        var inCellDropDown = allowData.querySelector('.e-data').querySelector('.e-checkbox-wrapper') ?
            allowData.querySelector('.e-data').querySelector('.e-checkbox-wrapper').querySelector('.e-check') ? true : false : null;
        var range = dlgContEle.querySelector('.e-cellrange').getElementsByTagName('input')[0].value;
        var operator;
        if (dataEle) {
            operator = this.formattedValue(dataEle.value);
        }
        var valArr = [];
        if (type === 'List') {
            if (valueArr[0] !== '') {
                valArr.push(valueArr[0]);
            }
            if (valueArr[0].startsWith('=')) {
                var address_1 = valueArr[0].substring(1);
                var definedName = this.parent.definedNames.find(function (item) { return item.name === address_1; });
                if (definedName) {
                    address_1 = definedName.refersTo.substring(1);
                }
                var isSheetNameValid = void 0;
                var sheetTokenIdx = void 0;
                if (address_1.includes('!')) {
                    sheetTokenIdx = address_1.lastIndexOf('!');
                    var sheetName = address_1.substring(0, sheetTokenIdx);
                    address_1 = address_1.substring(sheetTokenIdx + 1);
                    if (sheetName.startsWith('\'') && sheetName.endsWith('\'')) {
                        sheetName = sheetName.substring(1, sheetName.length - 1);
                    }
                    isSheetNameValid = getSheetIndex(this.parent, sheetName) > -1;
                    if (!definedName) {
                        valArr[0] = '=' + sheetName + '!' + address_1;
                    }
                }
                else {
                    isSheetNameValid = true;
                }
                if (!address_1.includes(':') && isCellReference(address_1)) {
                    address_1 = address_1 + ":" + address_1;
                }
                var isSingleRowOrCol = void 0;
                if (isSheetNameValid) {
                    var cellRef = address_1.split(':');
                    if (cellRef.length === 2) {
                        isSingleRowOrCol = address_1.match(/[a-z]/gi) && cellRef[0].replace(/[0-9]/g, '') === cellRef[1].replace(/[0-9]/g, '')
                            || address_1.match(/\d/g) && cellRef[0].replace(/\D/g, '') === cellRef[1].replace(/\D/g, '');
                    }
                }
                isValid = isSingleRowOrCol;
                if (!isValid) {
                    errorMsg = !definedName && sheetTokenIdx === undefined && !address_1.includes(':') ?
                        l10n.getConstant('NamedRangeError') : l10n.getConstant('DialogError');
                }
            }
            else if (valueArr[0].length > 256) {
                isValid = false;
                errorMsg = l10n.getConstant('ListLengthError');
            }
        }
        else {
            var numObj_1 = getNumericObject(this.parent.locale);
            if (type === 'Decimal' && numObj_1.decimal !== '.') {
                var isNotCulturedNumber = function (val) { return isNumber(val) && val.includes('.') &&
                    (numObj_1.group !== '.' || !parseThousandSeparator(val, _this.parent.locale, numObj_1.group, numObj_1.decimal)); };
                if (isNotCulturedNumber(valueArr[0]) || isNotCulturedNumber(valueArr[1])) {
                    isValid = false;
                    errorMsg = l10n.getConstant('InvalidNumberError');
                }
            }
            parseLocaleNumber(valueArr, this.parent, numObj_1);
            if (valueArr[0] !== '') {
                valArr.push(valueArr[0]);
            }
            if (valueArr[1] !== '') {
                valArr.push(valueArr[1]);
            }
        }
        if (isValid) {
            var sheet = this.parent.getActiveSheet();
            var validDlg = this.isDialogValidator(valArr, type, operator);
            if (operator === 'Between' && validDlg.isValid && !isNaN(parseFloat(valArr[0])) && !isNaN(parseFloat(valArr[1])) &&
                parseFloat(valArr[0]) > parseFloat(valArr[1])) {
                validDlg.isValid = false;
                validDlg.errorMsg = l10n.getConstant('MinMaxError');
            }
            if (type === 'Custom') {
                if (checkIsFormula(valArr[0])) {
                    var errorStrings = ['#N/A', '#VALUE!', '#REF!', '#DIV/0!', '#NUM!', '#NAME?', '#NULL!', '#CALC!'];
                    var eventArgs = { value: valArr[0] };
                    this.parent.notify(commputeFormulaValue, eventArgs);
                    var customValue = eventArgs.value;
                    if (errorStrings.indexOf(customValue) > -1) {
                        validDlg.isValid = false;
                        validDlg.errorMsg = l10n.getConstant('InvalidFormula');
                    }
                }
            }
            errorMsg = validDlg.errorMsg;
            isValid = validDlg.isValid;
            if (isValid) {
                if (isReadOnlyCells(this.parent, getSwapRange(getRangeIndexes(range)))) {
                    dialogInst.hide(true);
                    this.parent.notify(readonlyAlert, null);
                    return;
                }
                var args = { range: sheet.name + '!' + range, value1: valArr[0], value2: valArr[1] || '',
                    ignoreBlank: ignoreBlank, type: type, operator: operator, inCellDropDown: inCellDropDown, cancel: false };
                this.parent.notify(beginAction, { eventArgs: args, action: 'validation' });
                if (!args.cancel) {
                    this.parent.notify(cellValidation, { rules: { type: args.type, operator: args.operator, value1: args.value1, value2: args.value2,
                            ignoreBlank: args.ignoreBlank, inCellDropDown: args.inCellDropDown }, range: args.range, isAction: true });
                    delete args.cancel;
                    if (!this.parent.element.getElementsByClassName('e-validation-error-dlg')[0]) {
                        if (dialogInst.dialogInstance) {
                            dialogInst.dialogInstance.hide();
                        }
                        else {
                            dialogInst.hide();
                        }
                    }
                    this.parent.notify(completeAction, { eventArgs: args, action: 'validation' });
                }
            }
        }
        if (!isValid) {
            var errorEle = this.parent.createElement('div', { className: 'e-dlg-error', id: 'e-invalid' });
            errorEle.innerText = errorMsg;
            values.appendChild(errorEle);
            dlgFooter.querySelector('.e-primary').setAttribute('disabled', 'true');
        }
    };
    DataValidation.prototype.formattedValue = function (value) {
        var l10n = this.parent.serviceLocator.getService(locale);
        switch (value) {
            case l10n.getConstant('Between'):
                value = 'Between';
                break;
            case l10n.getConstant('NotBetween'):
                value = 'NotBetween';
                break;
            case l10n.getConstant('EqualTo'):
                value = 'EqualTo';
                break;
            case l10n.getConstant('NotEqualTo'):
                value = 'NotEqualTo';
                break;
            case l10n.getConstant('GreaterThan'):
                value = 'GreaterThan';
                break;
            case l10n.getConstant('LessThan'):
                value = 'LessThan';
                break;
            case l10n.getConstant('GreaterThanOrEqualTo'):
                value = 'GreaterThanOrEqualTo';
                break;
            case l10n.getConstant('LessThanOrEqualTo'):
                value = 'LessThanOrEqualTo';
                break;
            default:
                value = 'Between';
                break;
        }
        return value;
    };
    DataValidation.prototype.formattedType = function (value) {
        var l10n = this.parent.serviceLocator.getService(locale);
        switch (value) {
            case l10n.getConstant('WholeNumber'):
                value = 'WholeNumber';
                break;
            case l10n.getConstant('Decimal'):
                value = 'Decimal';
                break;
            case l10n.getConstant('Date'):
                value = 'Date';
                break;
            case l10n.getConstant('TextLength'):
                value = 'TextLength';
                break;
            case l10n.getConstant('List'):
                value = 'List';
                break;
            case l10n.getConstant('Time'):
                value = 'Time';
                break;
            case l10n.getConstant('Custom'):
                value = 'Custom';
                break;
            default:
                break;
        }
        return value;
    };
    DataValidation.prototype.isDialogValidator = function (values, type, operator) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var count = 0;
        var isEmpty = false;
        var formValidation;
        if (type === 'List') {
            isEmpty = values.length > 0 ? false : true;
        }
        else {
            if (operator === 'Between' || operator === 'NotBetween') {
                isEmpty = values.length === 2 ? false : true;
            }
            else {
                isEmpty = values.length > 0 ? false : true;
            }
        }
        if (!isEmpty) {
            var value = void 0;
            for (var idx = 0; idx < values.length; idx++) {
                if (checkIsFormula(values[idx])) {
                    var eventArgs = { value: values[idx] };
                    this.parent.notify(commputeFormulaValue, eventArgs);
                    value = eventArgs.value;
                }
                else if (type === 'Date' || type === 'Time') {
                    value = values[idx] = this.getDateAsNumber({ range: [], cell: { value: values[idx] } }, values[idx]);
                }
                else {
                    value = values[idx];
                }
                formValidation = this.formatValidation(value, type, true);
                if (formValidation.isValid) {
                    count = count + 1;
                }
                else {
                    break;
                }
            }
            formValidation.isValid = count === values.length;
            return formValidation;
        }
        else {
            return { isValid: false, errorMsg: l10n.getConstant('EmptyError') };
        }
    };
    DataValidation.prototype.getDateAsNumber = function (args, cellValue) {
        var dateEventArgs = { value: cellValue, rowIndex: args.range[0], cell: args.cell,
            colIndex: args.range[1], sheetIndex: args.sheetIdx, updatedVal: '' };
        this.parent.notify(checkDateFormat, dateEventArgs);
        return dateEventArgs.updatedVal || cellValue;
    };
    DataValidation.prototype.getListOfValues = function (listValue) {
        var listValArr;
        if (this.parent.listSeparator !== ',' && listValue.includes(this.parent.listSeparator)) {
            listValArr = listValue.split(this.parent.listSeparator);
        }
        else {
            listValArr = listValue.split(',');
        }
        return listValArr;
    };
    DataValidation.prototype.checkValidationHandler = function (args, validation) {
        var enterValue = args.value.toString();
        var sheet = this.parent.sheets[args.sheetIdx];
        var cell = getCell(args.range[0], args.range[1], sheet, null, true);
        var value1 = validation.value1;
        var value2 = validation.value2;
        if (!cell.validation) {
            var currIdx = args.range;
            var prevIdx = [0, args.range[1], 0, args.range[3]];
            if (checkIsFormula(value1)) {
                value1 = getUpdatedFormula(currIdx, prevIdx, sheet, this.parent, { formula: value1 });
            }
            if (checkIsFormula(value2)) {
                value2 = getUpdatedFormula(currIdx, prevIdx, sheet, this.parent, { formula: value2 });
            }
        }
        if (validation.type !== 'List') {
            if (checkIsFormula(value1)) {
                var eventArgs1 = { value: value1 };
                this.parent.notify(commputeFormulaValue, eventArgs1);
                value1 = eventArgs1.value;
            }
            if (checkIsFormula(value2)) {
                var eventArgs2 = { value: value2 };
                this.parent.notify(commputeFormulaValue, eventArgs2);
                value2 = eventArgs2.value;
            }
            if (checkIsFormula(args.value)) {
                var eventArgs = { value: args.value };
                this.parent.notify(commputeFormulaValue, eventArgs);
                args.value = eventArgs.value;
            }
        }
        var value = args.value;
        var opt = validation.operator || 'Between';
        var type = validation.type || 'WholeNumber';
        var ignoreBlank = isNullOrUndefined(validation.ignoreBlank) ? true : validation.ignoreBlank;
        if (ignoreBlank && enterValue === '') {
            return true;
        }
        else {
            var isDateTimeType = type === 'Date' || type === 'Time';
            if (args.value) {
                if (isDateTimeType || validation.type === 'TextLength') {
                    if (!isNumber(args.value)) {
                        value = args.value = this.getDateAsNumber(args, args.value);
                    }
                }
                else {
                    var numObj = args.isEdit && getNumericObject(this.parent.locale);
                    var numVal = this.parseValidationValue(args.value, numObj);
                    if (numVal !== args.value && isNumber(numVal)) {
                        value = args.value = numVal.toString();
                    }
                }
            }
            var isValid = this.formatValidation(args.value, type).isValid;
            if (isValid) {
                isValid = false;
                if (isDateTimeType) {
                    if (value1 && !isNumber(value1)) {
                        value1 = this.getDateAsNumber(args, value1);
                    }
                    if (value2 && !isNumber(value2)) {
                        value2 = this.getDateAsNumber(args, value2);
                    }
                }
                else if (validation.type === 'TextLength') {
                    value = args.value.toString().length.toString();
                }
                if (type === 'List') {
                    var val = args.value.toString();
                    var isNumVal = isNumber(val);
                    var numObj = isNumVal && getNumericObject(this.parent.locale);
                    if (value1.startsWith('=')) {
                        var listVal = void 0;
                        var data = this.getListDataSource(value1);
                        for (var idx = 0; idx < data.length; idx++) {
                            listVal = data[idx].text.toString();
                            if (enterValue === listVal || val === listVal || (isNumVal &&
                                val === this.parseValidationValue(listVal, numObj).toString())) {
                                isValid = true;
                                break;
                            }
                        }
                    }
                    else {
                        var listValues = this.getListOfValues(value1);
                        for (var idx = 0; idx < listValues.length; idx++) {
                            if (enterValue === listValues[idx] || val === listValues[idx] || (isNumVal &&
                                val === this.parseValidationValue(listValues[idx], numObj).toString())) {
                                isValid = true;
                                break;
                            }
                        }
                    }
                    if (!isValid && ignoreBlank && val === '') {
                        isValid = true;
                    }
                }
                else if (type === 'Custom') {
                    var numVal = parseFloat(value1.toString());
                    if (isNumber(numVal)) {
                        if (numVal === 0) {
                            var cellRefVal = { value: validation.value1 };
                            this.parent.notify(getCellRefValue, cellRefVal); // To consider empty cell references cases.
                            isValid = cellRefVal.value !== '' ? false : true;
                        }
                        else {
                            isValid = true;
                        }
                    }
                    else if (value1.toUpperCase() === 'TRUE') {
                        isValid = true;
                    }
                    else {
                        isValid = false;
                    }
                    if (!isValid && ignoreBlank && value1 === '') {
                        isValid = true;
                    }
                }
                else {
                    if (type === 'Decimal' || type === 'Time') {
                        value = parseFloat(value.toString());
                        value1 = parseFloat(value1.toString());
                        value2 = value2 ? parseFloat(value2.toString()) : null;
                    }
                    else {
                        value = parseInt(value.toString(), 10);
                        value1 = parseInt(value1.toString(), 10);
                        value2 = value2 ? parseInt(value2.toString(), 10) : null;
                    }
                    switch (opt) {
                        case 'EqualTo':
                            isValid = value === value1;
                            break;
                        case 'NotEqualTo':
                            isValid = value !== value1;
                            break;
                        case 'Between':
                            isValid = value >= value1 && value <= value2;
                            break;
                        case 'NotBetween':
                            isValid = !(value >= value1 && value <= value2);
                            break;
                        case 'GreaterThan':
                            isValid = value > value1;
                            break;
                        case 'LessThan':
                            isValid = value < value1;
                            break;
                        case 'GreaterThanOrEqualTo':
                            isValid = value >= value1;
                            break;
                        case 'LessThanOrEqualTo':
                            isValid = value <= value1;
                            break;
                        default:
                            break;
                    }
                }
            }
            return isValid;
        }
    };
    DataValidation.prototype.parseValidationValue = function (val, numObj) {
        if (isNumber(val)) {
            if (numObj && numObj.group === '.') {
                val = val.toString();
                if (val.indexOf('.') && parseThousandSeparator(val, this.parent.locale, numObj.group, numObj.decimal)) {
                    val = val.split(numObj.group).join('');
                }
            }
            return val;
        }
        var formatArgs = { formattedText: val, value: val, format: 'General', cell: { value: val, format: 'General' },
            isEdit: !!numObj };
        this.parent.notify(getFormattedCellObject, formatArgs);
        return formatArgs.value;
    };
    DataValidation.prototype.isValidCellHandler = function (args) {
        var sheet = this.parent.sheets[args.sheetIdx];
        var cell = getCell(args.range[0], args.range[1], sheet);
        var formulaArgs = { skip: false, value: '' };
        var validation = cell && cell.validation;
        if (validation) {
            if (checkIsFormula(validation.value1) && !isCellReference(validation.value1.substring(1, validation.value1.length)) &&
                validation.value1.indexOf('(') > -1) {
                var val = validation.value1;
                val = val.substring(val.indexOf('=') + 1, val.indexOf('('));
                formulaArgs.value = val.toUpperCase();
                this.parent.notify(formulaInValidation, formulaArgs);
            }
            if (!formulaArgs.skip && checkIsFormula(validation.value2) &&
                !isCellReference(validation.value2.substring(1, validation.value2.length)) && validation.value1.indexOf('(') > -1) {
                var val2 = validation.value2;
                val2 = val2.substring(val2.indexOf('=') + 1, val2.indexOf('('));
                formulaArgs.value = val2.toUpperCase();
                this.parent.notify(formulaInValidation, formulaArgs);
            }
        }
        if (!formulaArgs.skip) {
            args.value = isNullOrUndefined(args.value) ? '' : args.value;
            if (validation) {
                args.isValid = this.checkValidationHandler(args, validation);
                if (args.isValid && checkColumnValidation(sheet.columns[args.range[1]], args.range[0], args.range[1])) {
                    validation = sheet.columns[args.range[1]].validation;
                    args.isValid = this.checkValidationHandler(args, validation);
                }
            }
            else if (checkColumnValidation(sheet.columns[args.range[1]], args.range[0], args.range[1])) {
                validation = sheet.columns[args.range[1]].validation;
                args.isValid = this.checkValidationHandler(args, validation);
            }
            if (validation) {
                var addInvalidHighlight = void 0;
                if (args.isEdit && !args.isValid) {
                    args.isValid = addInvalidHighlight = this.validationErrorHandler(this.parent.serviceLocator.getService(locale).getConstant('ValidationError'));
                }
                if (args.isValid && validation.isHighlighted && !isHiddenRow(sheet, args.range[0]) && !isHiddenCol(sheet, args.range[1])) {
                    this.updateHighlightHandler({
                        rowIdx: args.range[0], colIdx: args.range[1],
                        isRemoveHighlightedData: !addInvalidHighlight, isRemoveValidation: true
                    });
                }
            }
        }
    };
    DataValidation.prototype.formatValidation = function (value, type, isDialogValidator) {
        var sheetPanel = this.parent.element.getElementsByClassName('e-sheet-panel')[0];
        var errorMsg;
        var formEle = this.parent.createElement('form', { id: 'formId', className: 'form-horizontal' });
        var inputEle = this.parent.createElement('input', { id: 'e-validation' });
        inputEle.setAttribute('name', 'validation');
        inputEle.setAttribute('type', 'text');
        if (type === 'Date' && isNumber(value)) {
            var valArr = value.toString().split('.');
            if (valArr.length === 2) {
                value = valArr[0];
            }
        }
        inputEle.setAttribute('value', value);
        formEle.appendChild(inputEle);
        sheetPanel.appendChild(formEle);
        var options;
        switch (type) {
            case 'Date':
                options = {
                    rules: {
                        'validation': { date: true }
                    },
                    customPlacement: function (inputElement, error) {
                        errorMsg = error.innerText;
                    }
                };
                break;
            case 'Decimal':
                options = {
                    rules: {
                        'validation': { number: true }
                    },
                    customPlacement: function (inputElement, error) {
                        errorMsg = error.innerText;
                    }
                };
                break;
            case 'WholeNumber':
                options = {
                    rules: {
                        'validation': { regex: /^-?\d*\.?[0]*$/ }
                    },
                    customPlacement: function (inputElement, error) {
                        errorMsg = error.innerText;
                    }
                };
                break;
            case 'TextLength':
                if (isDialogValidator) {
                    options = {
                        rules: {
                            'validation': { regex: /^\d*\.?[0]*$/ }
                        },
                        customPlacement: function (inputElement, error) {
                            errorMsg = error.innerText;
                        }
                    };
                }
                break;
            default:
                break;
        }
        this.formObj = new FormValidator('#formId', options);
        var isValid = this.formObj.validate();
        sheetPanel.removeChild(sheetPanel.getElementsByClassName('form-horizontal')[0]);
        return { isValid: isValid, errorMsg: errorMsg };
    };
    DataValidation.prototype.updateHighlightHandler = function (args) {
        var isValid;
        if (!args.isRemoveValidation) {
            var cellValue = args.cell.value || args.cell.value === 0 ? args.cell.value : args.cell.hyperlink ?
                (typeof args.cell.hyperlink === 'string' ? args.cell.hyperlink : (args.cell.hyperlink.address || '')) : '';
            var validEventArgs = {
                value: cellValue, range: [args.rowIdx, args.colIdx], sheetIdx: this.parent.activeSheetIndex
            };
            isValid = this.checkValidationHandler(validEventArgs, args.validation);
            if (isValid && args.col && checkColumnValidation(args.col, args.rowIdx, args.colIdx)) {
                validEventArgs.value = cellValue;
                isValid = this.checkValidationHandler(validEventArgs, args.col.validation);
            }
        }
        if (isValid) {
            if (args.removeOnValidData) {
                var cellEle = this.parent.getCell(args.rowIdx, args.colIdx);
                if (cellEle && cellEle.style.backgroundColor) {
                    args.td = cellEle;
                    args.style = this.parent.getCellStyleValue(['backgroundColor', 'color'], [args.rowIdx, args.colIdx]);
                    this.parent.notify(applyCellFormat, args);
                    args.td = null;
                }
            }
        }
        else {
            if (args.isRemoveHighlightedData) {
                args.style = this.parent.getCellStyleValue(['backgroundColor', 'color'], [args.rowIdx, args.colIdx]);
                this.parent.notify(applyCellFormat, args);
            }
            else {
                args.style = { backgroundColor: '#ffff00', color: '#ff0000' };
                this.parent.notify(applyCellFormat, args);
            }
        }
    };
    DataValidation.prototype.validationErrorHandler = function (error) {
        var _this = this;
        var el = this.parent.element.getElementsByClassName('e-spreadsheet-edit')[0];
        var l10n = this.parent.serviceLocator.getService(locale);
        var cancel = false;
        if (!this.parent.element.querySelector('.e-validation-error-dlg')) {
            var erroDialogInst_1 = this.parent.serviceLocator.getService(dialog);
            var disableCancel = false;
            var dlgModel = {
                width: 400, height: 200, isModal: true, showCloseIcon: true, cssClass: 'e-validation-error-dlg',
                target: document.getElementById(this.parent.element.id) || this.parent.element,
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: 'ValidationErrorDialog',
                        element: args.element, target: args.target, cancel: args.cancel, content: error
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                        cancel = true;
                    }
                    el.focus();
                    erroDialogInst_1.dialogInstance.content = dlgArgs.content;
                    erroDialogInst_1.dialogInstance.dataBind();
                },
                buttons: [{
                        buttonModel: {
                            content: l10n.getConstant('Retry'), isPrimary: true
                        },
                        click: function () {
                            _this.errorDlgHandler(erroDialogInst_1, 'Retry');
                        }
                    },
                    {
                        buttonModel: {
                            content: l10n.getConstant('Cancel')
                        },
                        click: function () {
                            _this.errorDlgHandler(erroDialogInst_1, 'Cancel');
                        }
                    }]
            };
            erroDialogInst_1.show(dlgModel, disableCancel);
        }
        return cancel;
    };
    DataValidation.prototype.errorDlgHandler = function (errorDialogInst, buttonName) {
        if (buttonName === 'Retry') {
            var el = this.parent.element.getElementsByClassName('e-spreadsheet-edit')[0];
            errorDialogInst.hide();
            if (el.innerText) {
                window.getSelection().selectAllChildren(el);
                if (this.listObj && !this.listObj.isDestroyed) {
                    this.listObj.showPopup();
                }
            }
        }
        else {
            var indexes = getCellIndexes(this.parent.getActiveSheet().activeCell);
            var cell = getCell(indexes[0], indexes[1], this.parent.getActiveSheet());
            var value = cell ? this.parent.getDisplayText(cell) : '';
            this.parent.notify(editOperation, {
                action: 'cancelEdit', value: value, refreshFormulaBar: true,
                refreshEditorElem: true, isAppend: false, trigEvent: true
            });
            errorDialogInst.hide();
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    DataValidation.prototype.getModuleName = function () {
        return 'dataValidation';
    };
    return DataValidation;
}());
export { DataValidation };
