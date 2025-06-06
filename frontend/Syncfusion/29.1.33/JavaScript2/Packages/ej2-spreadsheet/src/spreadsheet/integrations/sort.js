import { initiateCustomSort, locale, dialog, getFilterRange, refreshFilterRange } from '../index';
import { applySort, completeAction, focus, getUpdateUsingRaf, isDiscontinuousRange } from '../index';
import { sortComplete, beforeSort, getFormattedCellObject, sortImport, workbookFormulaOperation, isImported } from '../../workbook/index';
import { getIndexesFromAddress, getSwapRange, getCell, inRange, getSheet, getSheetIndex } from '../../workbook/index';
import { getColumnHeaderText, getRangeAddress, initiateSort, beginAction } from '../../workbook/index';
import { applyCF, getRangeIndexes } from '../../workbook/common/index';
import { getUniqueID, getComponent, enableRipple, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';
/**
 * `Sort` module is used to handle the sort action in Spreadsheet.
 */
var Sort = /** @class */ (function () {
    /**
     * Constructor for sort module.
     *
     * @param {Spreadsheet} parent - Specifies the Spreadsheet instance.
     */
    function Sort(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the sort module.
     *
     * @returns {void}
     */
    Sort.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Sort.prototype.addEventListener = function () {
        this.parent.on(applySort, this.applySortHandler, this);
        this.parent.on(sortComplete, this.sortCompleteHandler, this);
        this.parent.on(initiateCustomSort, this.initiateCustomSortHandler, this);
        this.parent.on(sortImport, this.sortImport, this);
    };
    Sort.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applySort, this.applySortHandler);
            this.parent.off(sortComplete, this.sortCompleteHandler);
            this.parent.off(initiateCustomSort, this.initiateCustomSortHandler);
            this.parent.off(sortImport, this.sortImport);
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    Sort.prototype.getModuleName = function () {
        return 'sort';
    };
    /**
     * Validates the range and returns false when invalid.
     *
     * @returns {boolean} - Validates the range and returns false when invalid.
     */
    Sort.prototype.isValidSortRange = function () {
        var sheet = this.parent.getActiveSheet();
        var range = getSwapRange(getIndexesFromAddress(sheet.selectedRange));
        if (range[0] > sheet.usedRange.rowIndex || range[1] > sheet.usedRange.colIndex) {
            return false;
        }
        return true;
    };
    /**
     * sort while importing.
     *
     * @param {any} args - Specifies the args
     * @param {number} args.sheetIdx - Specifies the sheet index
     * @returns {void}
     */
    Sort.prototype.sortImport = function (args) {
        var sort = this.parent.sortCollection;
        var cell;
        var rowId = this.parent.getActiveSheet().usedRange.rowIndex - 1;
        var sheetIdx = args ? args.sheetIdx : this.parent.activeSheetIndex;
        for (var j = 0; j < sort.length; j++) {
            if (sort[j].sheetIndex === sheetIdx) {
                for (var i = 0; i < rowId; i++) {
                    cell = this.parent.getCell(i, sort[j].columnIndex);
                    if (cell && cell.querySelector('.e-filter-icon')) {
                        if (sort[j].order === 'Ascending' || sort[j].order === 'OnTop') {
                            if (!cell.querySelector('.e-filter-icon').classList.contains('e-sortasc-filter')) {
                                cell.querySelector('.e-filter-icon').classList.add('e-sortasc-filter');
                            }
                        }
                        else {
                            if (!cell.querySelector('.e-filter-icon').classList.contains('e-sortdesc-filter')) {
                                cell.querySelector('.e-filter-icon').classList.add('e-sortdesc-filter');
                            }
                        }
                        return;
                    }
                }
            }
        }
    };
    /**
     * Shows the range error alert dialog.
     *
     * @param {object} args - specify the args
     * @param {string} args.error - range error string.
     * @returns {void}
     */
    Sort.prototype.sortRangeAlertHandler = function (args) {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var l10n = this.parent.serviceLocator.getService(locale);
        dialogInst.show({
            height: 180, width: 400, isModal: true, showCloseIcon: true,
            content: args.error,
            beforeOpen: function (openArgs) {
                var dlgArgs = {
                    dialogName: args.error === l10n.getConstant('MultiRangeSortError') ? 'MultiRangeSortDialog' : 'SortRangeDialog',
                    content: args.error,
                    element: openArgs.element, target: openArgs.target, cancel: openArgs.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    openArgs.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = dlgArgs.content;
                    focus(_this.parent.element);
                }
            }
        });
        this.parent.hideSpinner();
    };
    /**
     * Initiates the custom sort dialog.
     *
     * @returns {void}
     */
    Sort.prototype.initiateCustomSortHandler = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var sheet = this.parent.getActiveSheet();
        if (!this.isValidSortRange() || sheet.rows.length === 0) {
            this.sortRangeAlertHandler({ error: l10n.getConstant('SortOutOfRangeError') });
            return;
        }
        if (isDiscontinuousRange(sheet.selectedRange)) {
            this.sortRangeAlertHandler({ error: l10n.getConstant('MultiRangeSortError') });
            return;
        }
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var sortOptions;
        dialogInst.show({
            height: 400, width: 560, isModal: true, showCloseIcon: true, cssClass: 'e-customsort-dlg',
            header: l10n.getConstant('CustomSort'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'CustomSortDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.customSortContent();
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            buttons: [{
                    buttonModel: { content: l10n.getConstant('Ok'), isPrimary: true },
                    click: function () {
                        var element = dialogInst.dialogInstance.content;
                        var listview = getComponent(element.getElementsByClassName('e-list-sort e-listview e-lib')[0], 'listview');
                        var data = listview.dataSource;
                        _this.clearError();
                        var errorElem = element.getElementsByClassName('e-sort-error')[0];
                        errorElem.style.display = 'block';
                        if (!_this.validateError(data, element, errorElem)) {
                            sortOptions = { sortDescriptors: data, containsHeader: element.getElementsByClassName('e-sort-checkheader')[0].checked,
                                caseSensitive: element.getElementsByClassName('e-sort-checkcase')[0].checked };
                            dialogInst.hide();
                        }
                    }
                }],
            close: function () {
                if (sortOptions) {
                    getUpdateUsingRaf(function () { return _this.applySortHandler({ sortOptions: sortOptions }); });
                }
            }
        });
    };
    /**
     * Validates the errors of the sort criteria and displays the error.
     *
     * @param {Object} json - listview datasource.
     * @param {HTMLElement} dialogElem - dialog content element.
     * @param {HTMLElement} errorElem - element to display error.
     * @returns {boolean} - Return boolean value.
     */
    Sort.prototype.validateError = function (json, dialogElem, errorElem) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var hasEmpty = json.some(function (element) { return element.field.toString() === ''; });
        if (hasEmpty) {
            Array.prototype.some.call(dialogElem.getElementsByClassName('e-sort-field'), function (dropDown) {
                var hasError = !getComponent(dropDown, 'dropdownlist').value;
                if (hasError) {
                    dropDown.parentElement.classList.add('e-error');
                }
                return hasError; //breaks the loop if only one error added.
            });
            errorElem.innerText = l10n.getConstant('SortEmptyFieldError');
            return true;
        }
        var temp = new Set();
        var duplicateField = '';
        var hasDuplicate = json.some(function (element) {
            duplicateField = element.field.toString();
            return temp.size === temp.add(element.field).size;
        });
        var errorField = '';
        if (hasDuplicate) {
            var count_1 = 0;
            Array.prototype.some.call(dialogElem.getElementsByClassName('e-sort-field'), function (dropDown) {
                var dropDownList = getComponent(dropDown, 'dropdownlist');
                if (dropDownList.value === duplicateField) {
                    dropDown.parentElement.classList.add('e-error');
                    errorField = dropDownList.text;
                    count_1++;
                }
                return count_1 === 2; //breaks the loop when 2 errors added.
            });
            errorElem.innerText = '';
            var errorFieldEle = this.parent.createElement('strong');
            errorFieldEle.innerText = errorField;
            errorElem.appendChild(errorFieldEle);
            errorElem.appendChild(document.createTextNode(l10n.getConstant('SortDuplicateFieldError')));
            return true;
        }
        return false;
    };
    /**
     * Creates all the elements and generates the dialog content element.
     *
     * @returns {HTMLElement} - Returns the dialog element.
     */
    Sort.prototype.customSortContent = function () {
        var dialogElem = this.parent.createElement('div', { className: 'e-sort-dialog' });
        var fields = this.getFields();
        var listId = getUniqueID('customSort');
        var listviewObj = this.getCustomListview(listId);
        this.setHeaderTab(dialogElem, listviewObj, fields);
        var contentElem = this.parent.createElement('div', {
            className: 'e-sort-listsection',
            styles: ''
        });
        dialogElem.appendChild(contentElem);
        var listview = this.parent.createElement('div', { className: 'e-list-sort', styles: '' });
        contentElem.appendChild(listview);
        listviewObj.createElement = this.parent.createElement;
        listviewObj.appendTo(listview);
        listview.removeAttribute('tabindex');
        this.renderListItem(listId, listviewObj, true, fields);
        var errorElem = this.parent.createElement('div', { className: 'e-sort-error' });
        dialogElem.appendChild(errorElem);
        return dialogElem;
    };
    /**
     * Gets the fields data from the selected range.
     *
     * @returns {Object} - Gets the fields data from the selected range.
     */
    Sort.prototype.getFields = function () {
        var sheet = this.parent.getActiveSheet();
        var range = getSwapRange(getIndexesFromAddress(sheet.selectedRange));
        if (range[0] === range[2] && (range[2] - range[0]) === 0) { //for entire range
            range[0] = 0;
            range[1] = 0;
            range[3] = sheet.usedRange.colIndex;
            var args = { filterRange: [], hasFilter: false };
            this.parent.notify(getFilterRange, args);
            if (args.hasFilter && args.filterRange) {
                range[0] = args.filterRange[0];
            }
        }
        var fields = [];
        var text;
        var value;
        for (range[1]; range[1] <= range[3]; range[1]++) {
            var cell = getCell(range[0], range[1], sheet);
            value = 'Column ' + getColumnHeaderText(range[1] + 1);
            if (cell && cell.value) {
                text = cell.value;
                if (cell.format) {
                    var eventArgs = { formattedText: text, value: text, format: cell.format, rowIndex: range[0],
                        colIndex: range[1] };
                    this.parent.notify(getFormattedCellObject, eventArgs);
                    text = eventArgs.formattedText;
                }
            }
            else {
                text = value;
            }
            fields.push({ text: text, value: value });
        }
        return fields;
    };
    /**
     * Creates the header tab for the custom sort dialog.
     *
     * @param {HTMLElement} dialogElem - dialog content element.
     * @param {ListView} listviewObj - listview instance.
     * @param {Object} fields - fields data.
     * @returns {void} - set header tab.
     */
    Sort.prototype.setHeaderTab = function (dialogElem, listviewObj, fields) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var headerTabElement = this.parent.createElement('div', { className: 'e-sort-header' });
        dialogElem.appendChild(headerTabElement);
        var addButton = this.parent.createElement('button', { className: 'e-btn e-sort-addbtn e-flat', attrs: { 'type': 'button' } });
        addButton.innerText = l10n.getConstant('AddColumn');
        var footer = this.parent.element.querySelector('.e-customsort-dlg .e-footer-content');
        footer.insertBefore(addButton, footer.firstElementChild);
        addButton.addEventListener('click', function () {
            if (listviewObj) {
                var listId = getUniqueID('customSort');
                listviewObj.addItem([{ id: listId, text: l10n.getConstant('ThenBy'), field: '', order: 'ascending' }]);
                _this.renderListItem(listId, listviewObj, checkHeaderObj.checked, fields, true);
            }
        });
        var checkHeaderObj = new CheckBox({
            label: l10n.getConstant('ContainsHeader'),
            checked: true,
            change: function (args) {
                var fieldsMap = args.checked ? { text: 'text', value: 'value' } : { text: 'value' };
                Array.prototype.forEach.call(dialogElem.getElementsByClassName('e-sort-field e-dropdownlist e-lib'), function (dropDown) {
                    var dropDownListObj = getComponent(dropDown, 'dropdownlist');
                    dropDownListObj.dataSource = null; //reset datasource.
                    dropDownListObj.dataSource = fields;
                    dropDownListObj.fields = fieldsMap;
                    dropDownListObj.dataBind();
                });
            },
            cssClass: 'e-sort-headercheckbox'
        });
        var headerCheckbox = this.parent.createElement('input', {
            className: 'e-sort-checkheader', attrs: { type: 'checkbox' }
        });
        headerTabElement.appendChild(headerCheckbox);
        checkHeaderObj.createElement = this.parent.createElement;
        checkHeaderObj.appendTo(headerCheckbox);
        var checkCaseObj = new CheckBox({
            label: l10n.getConstant('CaseSensitive'),
            checked: false,
            cssClass: 'e-sort-casecheckbox'
        });
        var caseCheckbox = this.parent.createElement('input', {
            className: 'e-sort-checkcase', attrs: { type: 'checkbox' }
        });
        headerTabElement.appendChild(caseCheckbox);
        checkCaseObj.createElement = this.parent.createElement;
        checkCaseObj.appendTo(caseCheckbox);
    };
    /**
     * Creates a listview instance.
     *
     * @param {string} listId - unique id of the list item.
     * @returns {void}
     */
    Sort.prototype.getCustomListview = function (listId) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var data = [{ id: listId, text: l10n.getConstant('SortBy'), field: '', order: 'ascending' }];
        enableRipple(false);
        var listviewObj = new ListView({
            dataSource: data,
            fields: { id: 'id' },
            height: '100%',
            /* eslint-disable */
            template: initializeCSPTemplate(function (data) {
                return ('<div class="e-sort-listwrapper">' +
                    ("<span class=\"text\">" + data.text + "</span>") +
                    '<div class="e-sort-row"><div class="e-sort-field"></div>' +
                    '<div class="e-sort-order">' +
                    ("<span class=\"e-sort-ordertxt\" style=\"display:none;\">" + data.order + "</span></div>") +
                    '<span class="e-icons e-sort-delete" tabindex="0"></span></div>');
            }),
            /* eslint-enable */
            cssClass: 'e-sort-template'
        });
        return listviewObj;
    };
    /**
     * Triggers the click event for delete icon.
     *
     * @param {Element} element - current list item element.
     * @param {ListView} listviewObj - listview instance.
     * @returns {void}
     */
    Sort.prototype.deleteHandler = function (element, listviewObj) {
        var iconEle = element.getElementsByClassName('e-sort-delete')[0];
        //Event handler to bind the click event for delete icon
        iconEle.addEventListener('click', function () {
            if (element) {
                listviewObj.removeItem(element);
            }
        });
    };
    /**
     * Renders the dropdown and radio button components inside list item.
     *
     * @param {string} id - unique id of the list item.
     * @param {ListView} lvObj - listview instance.
     * @param {boolean} containsHeader - data contains header.
     * @param {string} fields - fields data.
     * @param {boolean} btn - boolean value.
     * @returns {void}
     */
    Sort.prototype.renderListItem = function (id, lvObj, containsHeader, fields, btn) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var element = lvObj.element.querySelector('li[data-uid=' + id + ']');
        var fieldsMap = containsHeader ? { text: 'text', value: 'value' } : { text: 'value' };
        var dropDown = element.getElementsByClassName('e-sort-field')[0];
        var dropDownListObj = new DropDownList({
            dataSource: fields,
            width: 'auto',
            cssClass: 'e-sort-field-ddl',
            fields: fieldsMap,
            placeholder: l10n.getConstant('SelectAColumn'),
            change: function (args) {
                if (!args.value) {
                    return;
                }
                Array.prototype.some.call(lvObj.dataSource, function (item) {
                    if (item.id === id) {
                        item.field = args.value.toString().replace('Column ', '');
                    }
                    return item.id === id; //breaks the loop when proper id found
                });
                _this.clearError();
            }
        });
        dropDownListObj.createElement = this.parent.createElement;
        dropDownListObj.appendTo(dropDown);
        if (!btn) {
            dropDownListObj.index = 0;
        }
        /* sort ascending radio button */
        var orderRadio = element.getElementsByClassName('e-sort-order')[0];
        var ordertxtElem = orderRadio.getElementsByClassName('e-sort-ordertxt')[0];
        var isAscending = ordertxtElem.innerText.toLocaleLowerCase() === 'ascending';
        var radiobutton = new RadioButton({
            label: l10n.getConstant('SortAscending'),
            name: 'sortAZ_' + id, value: 'ascending', checked: isAscending, cssClass: 'e-sort-radiobutton',
            change: function (args) { _this.setRadioBtnValue(lvObj, id, args.value); }
        });
        var radio = this.parent.createElement('input', {
            id: 'orderAsc_' + id, className: 'e-sort-radioasc', styles: '', attrs: { type: 'radio' }
        });
        orderRadio.appendChild(radio);
        radiobutton.createElement = this.parent.createElement;
        radiobutton.appendTo(radio);
        /* sort descending radio button */
        var radiobutton2 = new RadioButton({
            label: l10n.getConstant('SortDescending'),
            name: 'sortAZ_' + id, value: 'descending', checked: !isAscending, cssClass: 'e-sort-radiobutton',
            change: function (args) { _this.setRadioBtnValue(lvObj, id, args.value); }
        });
        var radio2 = this.parent.createElement('input', {
            id: 'orderDesc_' + id, className: 'e-sort-radiodesc', styles: '', attrs: { type: 'radio' }
        });
        orderRadio.appendChild(radio2);
        radiobutton2.createElement = this.parent.createElement;
        radiobutton2.appendTo(radio2);
        this.deleteHandler(element, lvObj);
    };
    /**
     * Sets the new value of the radio button.
     *
     * @param {ListView} listviewObj - listview instance.
     * @param {string} id - unique id of the list item.
     * @param {string} value - new value.
     * @returns {void}
     */
    Sort.prototype.setRadioBtnValue = function (listviewObj, id, value) {
        if (!value) {
            return;
        }
        Array.prototype.some.call(listviewObj.dataSource, function (item) {
            if (item.id === id) {
                item.order = value;
            }
            return item.id === id; //breaks the loop when proper id found
        });
    };
    /**
     *
     * Clears the error from the dialog.
     *
     * @returns {void}
     */
    Sort.prototype.clearError = function () {
        var dialogElem = document.getElementsByClassName('e-sort-dialog')[0];
        var errorElem = dialogElem.getElementsByClassName('e-sort-error')[0];
        if (errorElem.style.display !== 'none' && errorElem.innerHTML !== '') {
            errorElem.style.display = 'none';
            Array.prototype.forEach.call(dialogElem.getElementsByClassName('e-error'), function (element) {
                element.classList.remove('e-error');
            });
        }
    };
    /**
     * Triggers sort events and applies sorting.
     *
     * @param {Object} args - Specifies the args.
     * @param {SortOptions} args.sortOptions - Specifies the sort options.
     * @param {string} args.range - Specifies the range.
     * @param {SortCollectionModel} args.previousSort - Specifies the previous sort collection.
     * @returns {void}
     */
    Sort.prototype.applySortHandler = function (args) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var address = args && args.range || sheet.selectedRange;
        var range = getSwapRange(getIndexesFromAddress(address));
        var sortOptions = args && args.sortOptions || { sortDescriptors: {} };
        var isSingle = range[0] === range[2];
        var eventArgs = { filterRange: [], hasFilter: false, sheetIdx: this.parent.activeSheetIndex };
        this.parent.notify(getFilterRange, eventArgs);
        if (eventArgs.hasFilter && (isSingle ? inRange(eventArgs.filterRange, range[0], range[1]) : (eventArgs.filterRange[0] ===
            range[0] && (this.parent.element.querySelector('.e-selectall.e-highlight') || (range[1] >= eventArgs.filterRange[1] && range[1]
            <= eventArgs.filterRange[3]) || (range[3] >= eventArgs.filterRange[1] && range[3] <= eventArgs.filterRange[3]))))) {
            range[0] = eventArgs.filterRange[0];
            range[1] = eventArgs.filterRange[1];
            range[2] = sheet.usedRange.rowIndex;
            range[3] = sheet.usedRange.colIndex;
            sortOptions.containsHeader = !eventArgs.allowHeaderFilter;
            isSingle = false;
        }
        address = getRangeAddress(range);
        var beforeArgs = { range: address, sortOptions: sortOptions, cancel: false };
        this.parent.trigger(beforeSort, beforeArgs);
        if (beforeArgs.cancel) {
            return;
        }
        this.parent.notify(beginAction, { eventArgs: beforeArgs, action: 'beforeSort' });
        this.parent.showSpinner();
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        var sortArgs = { args: { range: beforeArgs.range, sortOptions: beforeArgs.sortOptions, checkForHeader: isSingle && address !== beforeArgs.range }, promise: promise, previousSort: args && args.previousSort };
        this.parent.notify(initiateSort, sortArgs);
        sortArgs.promise.then(function (sortArgs) {
            _this.sortCompleteHandler(sortArgs);
            _this.parent.trigger(sortComplete, sortArgs);
            _this.parent.notify(completeAction, { eventArgs: sortArgs, action: 'sorting' });
            if (document.activeElement.tagName === 'BODY') {
                focus(_this.parent.element);
            }
            return Promise.resolve(sortArgs);
        }).catch(function (error) {
            _this.sortRangeAlertHandler({ error: error });
            return Promise.reject(error);
        });
    };
    /**
     *
     * Invoked when the sort action is completed.
     *
     * @param {SortEventArgs} args - Specifies the range and sort options.
     * @returns {void}
     */
    Sort.prototype.sortCompleteHandler = function (args) {
        var sheet;
        var range;
        var sheetIdx = this.parent.activeSheetIndex;
        if (args.range.includes('!')) {
            var lastIndex = args.range.lastIndexOf('!');
            sheetIdx = getSheetIndex(this.parent, args.range.substring(0, lastIndex));
            sheet = getSheet(this.parent, sheetIdx);
            range = getRangeIndexes(args.range.substring(lastIndex + 1));
        }
        else {
            sheet = this.parent.getActiveSheet();
            range = getRangeIndexes(args.range);
        }
        for (var i = range[0]; i <= range[2]; i++) {
            for (var j = range[1]; j <= range[3]; j++) {
                this.parent.notify(workbookFormulaOperation, { action: 'refreshCalculate', rowIndex: i, colIndex: j });
            }
        }
        this.parent.serviceLocator.getService('cell').refreshRange(range, true, true, false, false, isImported(this.parent), undefined, undefined, undefined, true);
        if (sheetIdx === this.parent.activeSheetIndex && sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: range });
        }
        this.parent.hideSpinner();
        this.parent.notify(refreshFilterRange, null);
    };
    return Sort;
}());
export { Sort };
