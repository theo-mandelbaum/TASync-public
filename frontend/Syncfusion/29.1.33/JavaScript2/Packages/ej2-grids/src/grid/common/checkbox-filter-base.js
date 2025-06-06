/* tslint:disable-next-line:max-line-length */
import { EventHandler, isNullOrUndefined, extend, classList, addClass, removeClass, Browser, getValue, setValue } from '@syncfusion/ej2-base';
import { parentsUntil, getUid, appendChildren, getDatePredicate, getObject, extendObjWithFn, eventPromise, setChecked, clearReactVueTemplates, padZero, Global } from '../base/util';
import { remove, debounce, Internationalization, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { DataUtil, Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import * as events from '../base/constant';
import { ValueFormatter } from '../services/value-formatter';
import { getForeignData, resetDialogAppend } from '../base/util';
import { Dialog } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { getFilterMenuPostion, toogleCheckbox, createCboxWithWrap, removeAddCboxClasses, getColumnByForeignKeyValue, getListHeight, infiniteRemoveElements, infiniteAppendElements } from '../base/util';
/**
 * @hidden
 * `CheckBoxFilterBase` module is used to handle filtering action.
 */
var CheckBoxFilterBase = /** @class */ (function () {
    /**
     * Constructor for checkbox filtering module
     *
     * @param {IXLFilter} parent - specifies the IXLFilter
     * @hidden
     */
    function CheckBoxFilterBase(parent) {
        this.searchInputArgs = null;
        this.isExecuteLocal = false;
        this.queryFilteredColumn = [];
        this.existingPredicate = {};
        this.foreignKeyQuery = new Query();
        /** @hidden */
        this.filterState = true;
        this.values = {};
        this.renderEmpty = false;
        this.isCheckboxFilterTemplate = false;
        this.infiniteRenderMod = false;
        // for infinite scroll ui
        this.infiniteInitialLoad = false;
        this.infiniteSearchValChange = false;
        this.infinitePermenantLocalData = [];
        this.infiniteQueryExecutionPending = false;
        this.infiniteSkipCnt = 0;
        this.infiniteScrollAppendDiff = 0;
        this.prevInfiniteScrollDirection = '';
        this.infiniteLoadedElem = [];
        this.infiniteDataCount = 0;
        this.infiniteLocalSelectAll = true;
        this.localInfiniteSelectAllClicked = false;
        this.localInfiniteSelectionInteracted = false;
        this.infiniteManualSelectMaintainPred = [];
        this.parent = parent;
        this.id = this.parent.element.id;
        this.valueFormatter = new ValueFormatter(this.parent.locale);
        this.cBoxTrue = createCheckBox(this.parent.createElement, false, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(this.parent.createElement, false, { checked: false, label: ' ' });
        this.cBoxTrue.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
        if (this.parent.cssClass) {
            if (this.parent.cssClass.indexOf(' ') !== -1) {
                addClass([this.cBoxTrue, this.cBoxFalse], this.parent.cssClass.split(' '));
            }
            else {
                addClass([this.cBoxTrue, this.cBoxFalse], [this.parent.cssClass]);
            }
        }
    }
    /**
     * @returns {void}
     * @hidden
     */
    CheckBoxFilterBase.prototype.destroy = function () {
        this.closeDialog();
    };
    CheckBoxFilterBase.prototype.wireEvents = function () {
        EventHandler.add(this.dlg, 'click', this.clickHandler, this);
        EventHandler.add(this.dlg, 'keyup', this.keyupHandler, this);
        this.searchHandler = debounce(this.searchBoxKeyUp, 200);
        var elem = this.dialogObj.element.querySelector('.e-searchinput');
        if (elem) {
            EventHandler.add(elem, 'keyup', this.searchHandler, this);
            EventHandler.add(elem, 'input', this.searchHandler, this);
        }
    };
    CheckBoxFilterBase.prototype.unWireEvents = function () {
        EventHandler.remove(this.dlg, 'click', this.clickHandler);
        EventHandler.remove(this.dlg, 'keyup', this.keyupHandler);
        var elem = this.dialogObj.element.querySelector('.e-searchinput');
        if (elem) {
            EventHandler.remove(elem, 'keyup', this.searchHandler);
            EventHandler.remove(elem, 'input', this.searchHandler);
        }
    };
    CheckBoxFilterBase.prototype.foreignKeyFilter = function (args, fColl, mPredicate) {
        var _this = this;
        var fPredicate = {};
        var filterCollection = [];
        var query = this.foreignKeyQuery.clone();
        this.options.column.dataSource.
            executeQuery(query.where(mPredicate)).then(function (e) {
            _this.options.column.columnData = e.result;
            _this.parent.notify(events.generateQuery, { predicate: fPredicate, column: _this.options.column });
            args.ejpredicate = fPredicate.predicate.predicates;
            var fpred = fPredicate.predicate.predicates;
            for (var i = 0; i < fpred.length; i++) {
                filterCollection.push({
                    field: fpred[parseInt(i.toString(), 10)].field,
                    predicate: 'or',
                    matchCase: fpred[parseInt(i.toString(), 10)].ignoreCase,
                    ignoreAccent: fpred[parseInt(i.toString(), 10)].ignoreAccent,
                    operator: fpred[parseInt(i.toString(), 10)].operator,
                    value: fpred[parseInt(i.toString(), 10)].value,
                    type: _this.options.type
                });
            }
            args.filterCollection = filterCollection.length ? filterCollection :
                fColl.filter(function (col) { return col.field = _this.options.field; });
            _this.options.handler(args);
        });
    };
    CheckBoxFilterBase.prototype.searchBoxClick = function (e) {
        var target = e.target;
        if (target.classList.contains('e-searchclear')) {
            this.sInput.value = target.classList.contains('e-chkcancel-icon') ? '' : this.sInput.value;
            if (this.isCheckboxFilterTemplate) {
                this.parent.notify('refreshCheckbox', { event: e });
            }
            else {
                this.refreshCheckboxes();
            }
            this.updateSearchIcon();
            this.sInput.focus();
        }
    };
    CheckBoxFilterBase.prototype.searchBoxKeyUp = function (e) {
        if (isNullOrUndefined(this.sInput)) {
            return;
        }
        if (isNullOrUndefined(e) || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab' && !(e.key === 'Tab' && e.shiftKey))) {
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                this.parent.showMaskRow(undefined, this.dialogObj.element);
            }
            if (this.isCheckboxFilterTemplate) {
                this.parent.notify('refreshCheckbox', { event: e });
            }
            else {
                this.refreshCheckboxes();
            }
            this.updateSearchIcon();
        }
    };
    CheckBoxFilterBase.prototype.updateSearchIcon = function () {
        if (this.sInput.value.length) {
            classList(this.sIcon, ['e-chkcancel-icon'], ['e-search-icon']);
            if (!isNullOrUndefined(document.body.querySelector('.e-chkcancel-icon'))) {
                document.body.querySelector('.e-chkcancel-icon').setAttribute('title', this.localeObj.getConstant('Clear'));
            }
        }
        else {
            classList(this.sIcon, ['e-search-icon'], ['e-chkcancel-icon']);
            if (!isNullOrUndefined(document.body.querySelector('.e-searchclear.e-search-icon'))) {
                document.body.querySelector('.e-searchclear.e-search-icon').setAttribute('title', this.localeObj.getConstant('Search'));
            }
        }
    };
    /**
     * Gets the localized label by locale keyword.
     *
     * @param {string} key - Defines localization key
     * @returns {string} - returns localization label
     */
    CheckBoxFilterBase.prototype.getLocalizedLabel = function (key) {
        return this.localeObj.getConstant(key);
    };
    CheckBoxFilterBase.prototype.updateDataSource = function () {
        var dataSource = this.options.dataSource;
        var str = 'object';
        if (!(dataSource instanceof DataManager)) {
            for (var i = 0; i < dataSource.length; i++) {
                // eslint-disable-next-line valid-typeof
                if (typeof dataSource !== str) {
                    var obj = {};
                    obj[this.options.field] = dataSource[parseInt(i.toString(), 10)];
                    dataSource[parseInt(i.toString(), 10)] = obj;
                }
            }
        }
    };
    CheckBoxFilterBase.prototype.updateModel = function (options) {
        this.options = options;
        this.existingPredicate = options.actualPredicate || {};
        this.options.dataSource = options.dataSource;
        this.options.dataManager = options.dataManager ? options.dataManager : options.dataSource;
        this.updateDataSource();
        this.options.type = options.type;
        this.options.format = options.format || '';
        this.options.ignoreAccent = options.ignoreAccent || false;
        this.options.filteredColumns = options.filteredColumns || this.parent.filterSettings.columns;
        this.options.query = options.query || new Query();
        this.options.allowCaseSensitive = options.allowCaseSensitive || false;
        this.options.uid = options.column.uid;
        this.options.disableHtmlEncode = options.column.disableHtmlEncode || false;
        this.values = {};
        this.localeObj = options.localeObj;
        this.isFiltered = options.filteredColumns.length;
        this.infiniteRenderMod = this.parent.filterSettings && this.parent.filterSettings.enableInfiniteScrolling ? true : false;
        this.infiniteUnloadParentExistPred = this.infiniteRenderMod && this.existingPredicate[this.options.column.field] ? this.existingPredicate[this.options.column.field].slice() : [];
    };
    CheckBoxFilterBase.prototype.getAndSetChkElem = function (options) {
        this.dlg = this.parent.createElement('div', {
            id: this.id + this.options.type + '_excelDlg',
            attrs: { uid: this.options.column.uid },
            className: 'e-checkboxfilter e-filter-popup'
        });
        this.sBox = this.parent.createElement('div', { className: 'e-searchcontainer' });
        if (!options.hideSearchbox) {
            this.sInput = this.parent.createElement('input', {
                id: this.id + '_SearchBox',
                className: 'e-searchinput'
            });
            this.sIcon = this.parent.createElement('span', {
                className: 'e-searchclear e-search-icon e-icons e-input-group-icon', attrs: {
                    type: 'text', title: this.getLocalizedLabel('Search')
                }
            });
            this.searchBox = this.parent.createElement('span', { className: 'e-searchbox e-fields' });
            this.searchBox.appendChild(this.sInput);
            this.sBox.appendChild(this.searchBox);
            this.searchInputArgs = {
                element: this.sInput, floatLabelType: 'Never', properties: {
                    placeholder: this.getLocalizedLabel('Search'),
                    cssClass: this.parent.cssClass
                }
            };
            Input.createInput(this.searchInputArgs, this.parent.createElement);
            this.searchBox.querySelector('.e-input-group').appendChild(this.sIcon);
        }
        this.spinner = this.parent.createElement('div', { className: 'e-spinner' }); //for spinner
        this.cBox = this.parent.createElement('div', {
            id: this.id + this.options.type + '_CheckBoxList',
            className: 'e-checkboxlist e-fields'
        });
        this.spinner.appendChild(this.cBox);
        this.sBox.appendChild(this.spinner);
        return this.sBox;
    };
    CheckBoxFilterBase.prototype.showDialog = function (options) {
        var args = {
            requestType: events.filterBeforeOpen,
            columnName: this.options.field, columnType: this.options.type, cancel: false
        };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        this.parent.notify(events.cBoxFltrBegin, args);
        if (args.cancel) {
            options.cancel = args.cancel;
            return;
        }
        this.dialogObj = new Dialog({
            visible: false, content: this.sBox,
            close: this.closeDialog.bind(this),
            enableRtl: this.parent.enableRtl,
            width: (!isNullOrUndefined(parentsUntil(options.target, 'e-bigger')))
                || this.parent.element.classList.contains('e-device') ? 260 : 255,
            target: this.parent.element, animationSettings: { effect: 'None' },
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: {
                        content: this.getLocalizedLabel(this.isExcel ? 'OKButton' : 'FilterButton'),
                        cssClass: this.parent.cssClass ? 'e-primary' + ' ' + this.parent.cssClass : 'e-primary',
                        isPrimary: true
                    }
                },
                {
                    click: this.btnClick.bind(this),
                    buttonModel: { cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                        content: this.getLocalizedLabel(this.isExcel ? 'CancelButton' : 'ClearButton') }
                }],
            created: this.dialogCreated.bind(this),
            open: this.dialogOpen.bind(this),
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        var isStringTemplate = 'isStringTemplate';
        this.dialogObj["" + isStringTemplate] = true;
        this.renderResponsiveFilter(options);
        var dialogLabel = this.parent.filterSettings && this.parent.filterSettings.type === 'CheckBox' ?
            this.getLocalizedLabel('CheckBoxFilterDialogARIA') : this.getLocalizedLabel('ExcelFilterDialogARIA');
        this.dlg.setAttribute('aria-label', dialogLabel);
        if (options.isResponsiveFilter) {
            var responsiveCnt = document.querySelector('.e-responsive-dialog > .e-dlg-content > .e-mainfilterdiv');
            responsiveCnt.appendChild(this.dlg);
        }
        else {
            this.parent.element.appendChild(this.dlg);
        }
        this.dialogObj.appendTo(this.dlg);
        this.dialogObj.element.style.maxHeight = options.isResponsiveFilter ? 'none' : this.options.height + 'px';
        this.dialogObj.show();
        if (this.parent && this.parent.filterSettings && (this.parent.filterSettings.type === 'CheckBox'
            || (this.options.column && this.options.column.filter && this.options.column.filter.type === 'CheckBox')) &&
            this.parent.getContent().firstElementChild.offsetHeight < this.dialogObj.element.offsetHeight &&
            !parentsUntil(this.parent.element, 'e-gantt-dialog')) {
            resetDialogAppend(this.parent, this.dialogObj);
        }
        var content = this.dialogObj.element.querySelector('.e-dlg-content');
        content.appendChild(this.sBox);
        this.wireEvents();
        if (!this.parent.enableAdaptiveUI) {
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer'
                && !this.infiniteRenderMod) {
                this.parent.showMaskRow(undefined, this.dialogObj.element);
            }
            if (this.infiniteRenderMod && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer') {
                this.showMask();
            }
        }
        else {
            if (this.infiniteRenderMod && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer') {
                this.getAllData();
                return;
            }
            if (this.infiniteRenderMod) {
                this.cBox.style.marginTop = getListHeight(this.cBox) + 'px';
            }
        }
        if (!(this.infiniteRenderMod && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer')) {
            createSpinner({ target: this.spinner, cssClass: this.parent.cssClass ? this.parent.cssClass : null }, this.parent.createElement);
            showSpinner(this.spinner);
        }
        this.getAllData();
    };
    CheckBoxFilterBase.prototype.renderResponsiveFilter = function (options) {
        if (options.isResponsiveFilter) {
            this.dialogObj.buttons = [{}];
            this.dialogObj.position = { X: '', Y: '' };
            this.dialogObj.target = document.querySelector('.e-resfilter > .e-dlg-content > .e-mainfilterdiv');
            this.dialogObj.width = '100%';
        }
    };
    CheckBoxFilterBase.prototype.dialogCreated = function (e) {
        if (this.options.isResponsiveFilter) {
            this.dialogObj.element.style.left = '0px';
        }
        else {
            if (!Browser.isDevice) {
                getFilterMenuPostion(this.options.target, this.dialogObj);
            }
            else {
                this.dialogObj.position = { X: 'center', Y: 'center' };
            }
        }
        if (this.options.column.showColumnMenu) {
            this.parent.notify(events.filterDialogCreated, e);
        }
    };
    CheckBoxFilterBase.prototype.openDialog = function (options) {
        this.updateModel(options);
        this.getAndSetChkElem(options);
        this.showDialog(options);
    };
    CheckBoxFilterBase.prototype.closeDialog = function () {
        if (this.infiniteRenderMod && this.infinitePermenantLocalData.length && !this.options.isRemote) {
            this.options.dataSource.dataSource.json = this.infinitePermenantLocalData;
        }
        if (this.dialogObj && !this.dialogObj.isDestroyed) {
            this.isBlanks = false;
            var filterTemplateCol = this.options.columns.filter(function (col) { return col.getFilterItemTemplate(); });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var registeredTemplate = this.parent.registeredTemplate;
            if (filterTemplateCol.length && !isNullOrUndefined(registeredTemplate) && registeredTemplate.filterItemTemplate) {
                this.parent.destroyTemplate(['filterItemTemplate']);
            }
            if ((this.parent.isReact || this.parent.isVue) && this.parent.destroyTemplate !== undefined) {
                clearReactVueTemplates(this.parent, ['filterItemTemplate']);
            }
            this.parent.notify(events.filterMenuClose, { field: this.options.field });
            this.unWireEvents();
            if (this.searchInputArgs && this.searchInputArgs.element && this.searchInputArgs.element.parentElement) {
                Input.destroy(this.searchInputArgs);
                remove(this.searchInputArgs.element);
            }
            this.searchInputArgs = null;
            this.sInput = null;
            if (this.parent.isReact && this.options.column.filter && typeof (this.options.column.filter.itemTemplate) !== 'string'
                && (this.options.column.filter.type === 'CheckBox' || this.options.column.filter.type === 'Excel')) {
                this.dialogObj.element.querySelector('.e-dlg-content').innerHTML = '';
            }
            this.dialogObj.destroy();
            if (this.dialogObj['dlgClosedBy'] === 'escape') {
                this.parent.isColumnMenuFilterClosing = true;
            }
            if (this.dlg && this.dlg.parentElement) {
                remove(this.dlg);
            }
            this.dlg = null;
            this.parent.notify(events.filterDialogClose, {});
        }
    };
    /**
     * @param {Column} col - Defines column details
     * @returns {void}
     * @hidden
     */
    CheckBoxFilterBase.prototype.clearFilter = function (col) {
        // eslint-disable-next-line max-len
        var args = { instance: this, handler: this.clearFilter, cancel: false };
        this.parent.notify(events.fltrPrevent, args);
        if (args.cancel) {
            return;
        }
        this.options.handler({ action: 'clear-filter', field: col ? col.field : this.options.field });
    };
    CheckBoxFilterBase.prototype.btnClick = function (e) {
        if (this.filterState) {
            if ((e.target.tagName.toLowerCase() === 'input' && e.target.classList.contains('e-searchinput')) ||
                e.keyCode === 13) {
                if (!this.isCheckboxFilterTemplate) {
                    this.fltrBtnHandler();
                }
            }
            else {
                var text = e.target.firstChild.textContent.toLowerCase();
                if (this.getLocalizedLabel(this.isExcel ? 'OKButton' : 'FilterButton').toLowerCase() === text) {
                    if (!this.isCheckboxFilterTemplate) {
                        this.fltrBtnHandler();
                    }
                }
                else if (this.getLocalizedLabel('ClearButton').toLowerCase() === text) {
                    this.clearFilter();
                }
            }
            this.closeDialog();
        }
        else if (e.target && e.target.firstChild &&
            e.target.firstChild.textContent.toLowerCase() === this.getLocalizedLabel('CancelButton').toLowerCase()) {
            this.closeDialog();
        }
        else if (!(e.target.tagName.toLowerCase() === 'input')) {
            this.clearFilter();
            this.closeDialog();
        }
        if (this.options.column.showColumnMenu) {
            this.parent.notify(events.afterFilterColumnMenuClose, {});
        }
        if (!isNullOrUndefined(this.parent.focusModule)) {
            this.parent.focusModule.filterfocus();
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    CheckBoxFilterBase.prototype.fltrBtnHandler = function () {
        var _this = this;
        if (this.infiniteRenderMod) {
            this.cBox.innerHTML = '';
            appendChildren(this.cBox, this.infiniteLoadedElem.slice());
        }
        var checked = [].slice.call(this.cBox.querySelectorAll('.e-check:not(.e-selectall):not(.e-add-current)'));
        var check = checked;
        var optr = 'equal';
        var ddlValue = this.dialogObj.element.querySelector('.e-dropdownlist');
        if (ddlValue) {
            this.options.operator = optr = ddlValue.ej2_instances[0].value;
        }
        this.isMenuNotEqual = this.options.operator === 'notequal';
        var searchInput;
        if (!this.options.hideSearchbox) {
            searchInput = this.searchBox.querySelector('.e-searchinput');
        }
        var caseSen = this.options.allowCaseSensitive;
        var defaults = {
            field: this.options.field, predicate: this.isMenuNotEqual ? 'and' : 'or', uid: this.options.uid,
            operator: optr, type: this.options.type, matchCase: caseSen, ignoreAccent: this.options.ignoreAccent
        };
        var isNotEqual = this.itemsCnt !== checked.length && this.itemsCnt - checked.length < checked.length;
        if (isNotEqual && searchInput && searchInput.value === '') {
            optr = this.isMenuNotEqual ? 'equal' : 'notequal';
            checked = [].slice.call(this.cBox.querySelectorAll('.e-uncheck:not(.e-selectall)'));
            defaults.predicate = this.isMenuNotEqual ? 'or' : 'and';
            defaults.operator = optr;
        }
        var val;
        var length;
        var coll = [];
        if ((checked.length !== this.itemsCnt || (searchInput && searchInput.value && searchInput.value !== ''))
            || this.infiniteRenderMod) {
            if (!this.infiniteRenderMod) {
                coll = this.complexQueryPredicate(checked, defaults, isNotEqual);
            }
            else if (this.infiniteRenderMod &&
                (!this.infiniteSearchPred || (this.infiniteSearchPred && !this.infiniteSearchPred.isComplex))) {
                this.infiniteFltrBtnHandler(coll);
            }
            else {
                if (this.infiniteSearchPred.isComplex) {
                    coll = this.complexQueryPredicate(checked, defaults, isNotEqual);
                }
            }
            if ((this.options.type === 'date' || this.options.type === 'datetime') && check.length) {
                length = check.length - 1;
                val = this.values[parentsUntil(check[parseInt(length.toString(), 10)], 'e-ftrchk').getAttribute('uid')];
                if (isNullOrUndefined(val) && isNotEqual) {
                    coll.push({
                        field: defaults.field, matchCase: defaults.matchCase, operator: 'equal',
                        predicate: 'or', value: null
                    });
                }
            }
            var addCurrSelection = this.infiniteRenderMod ? this.sBox.querySelector('.e-add-current') :
                this.cBox.querySelector('.e-add-current');
            if (addCurrSelection && addCurrSelection.classList.contains('e-check')) {
                var existingPredicate_1 = this.existingPredicate[this.options.field];
                if (existingPredicate_1) {
                    var _loop_1 = function (j) {
                        if (!coll.some(function (data) {
                            return data
                                .value === existingPredicate_1[parseInt(j.toString(), 10)].value;
                        })) {
                            coll.push(existingPredicate_1[parseInt(j.toString(), 10)]);
                        }
                    };
                    for (var j = 0; j < existingPredicate_1.length; j++) {
                        _loop_1(j);
                    }
                }
                else {
                    return;
                }
            }
            if (!this.infiniteRenderMod) {
                this.initiateFilter(coll);
            }
            else if (coll.length) {
                this.initiateFilter(coll);
            }
            else if (this.sBox.querySelector('.e-selectall').classList.contains('e-check') && !coll.length) {
                var isClearFilter = this.options.filteredColumns.some(function (value) {
                    return _this.options.field === value.field;
                });
                if (isClearFilter) {
                    this.clearFilter();
                }
            }
        }
        else {
            var isClearFilter = this.options.filteredColumns.some(function (value) {
                return _this.options.field === value.field;
            });
            if (isClearFilter) {
                this.clearFilter();
            }
        }
    };
    CheckBoxFilterBase.prototype.complexQueryPredicate = function (checkBoxChecked, defaults, isNotEqual) {
        var value;
        var fObj;
        var coll = [];
        for (var i = 0; i < checkBoxChecked.length; i++) {
            value = this.values[parentsUntil(checkBoxChecked[parseInt(i.toString(), 10)], 'e-ftrchk').getAttribute('uid')];
            fObj = extend({}, { value: value }, defaults);
            if (value && !value.toString().length) {
                fObj.operator = isNotEqual ? 'notequal' : 'equal';
            }
            if (value === '' || isNullOrUndefined(value)) {
                coll = coll.concat(CheckBoxFilterBase.generateNullValuePredicates(defaults));
            }
            else {
                coll.push(fObj);
            }
            this.notifyFilterPrevEvent(fObj);
        }
        return coll;
    };
    CheckBoxFilterBase.prototype.infiniteFltrBtnHandler = function (coll) {
        var value;
        if (this.infiniteManualSelectMaintainPred.length) {
            for (var i = 0; i < this.infiniteManualSelectMaintainPred.length; i++) {
                var pred = this.infiniteManualSelectMaintainPred[i];
                value = pred.value + '';
                if (value === '' || isNullOrUndefined(value)) {
                    var dummyDefaults = { predicate: pred.predicate, field: pred.field, type: pred.type, uid: pred.uid, operator: pred.operator,
                        matchCase: pred.matchCase, ignoreAccent: pred.ignoreAccent };
                    coll.push.apply(coll, CheckBoxFilterBase.generateNullValuePredicates(dummyDefaults));
                }
                else {
                    coll.push(this.infiniteManualSelectMaintainPred[i]);
                }
                this.notifyFilterPrevEvent(this.infiniteManualSelectMaintainPred[i]);
            }
        }
        if (!this.localInfiniteSelectAllClicked && this.sInput.value === '' && !(!this.options.parentCurrentViewDataCount && coll.length)) {
            for (var i = 0; i < this.infiniteUnloadParentExistPred.length; i++) {
                coll.unshift(this.infiniteUnloadParentExistPred[i]);
                this.notifyFilterPrevEvent(this.existingPredicate[this.options.field][i]);
            }
        }
        if (this.sInput.value !== '' && (!this.localInfiniteSelectAllClicked || this.infiniteLocalSelectAll)) {
            this.infiniteSearchPred['predicate'] = 'or';
            coll.unshift(this.infiniteSearchPred);
            this.notifyFilterPrevEvent(this.infiniteSearchPred);
        }
    };
    CheckBoxFilterBase.prototype.notifyFilterPrevEvent = function (predicate) {
        var args = {
            instance: this, handler: this.fltrBtnHandler, arg1: predicate.field, arg2: predicate.predicate, arg3: predicate.operator,
            arg4: predicate.matchCase, arg5: predicate.ignoreAccent, arg6: predicate.value, cancel: false
        };
        this.parent.notify(events.fltrPrevent, args);
        if (args.cancel) {
            return;
        }
    };
    // eslint-disable-next-line
    /** @hidden */
    CheckBoxFilterBase.generateNullValuePredicates = function (defaults) {
        var coll = [];
        if (defaults.type === 'string') {
            coll.push({
                field: defaults.field, ignoreAccent: defaults.ignoreAccent, matchCase: defaults.matchCase,
                operator: defaults.operator, predicate: defaults.predicate, value: ''
            });
        }
        coll.push({
            field: defaults.field,
            matchCase: defaults.matchCase, operator: defaults.operator, predicate: defaults.predicate, value: null
        });
        coll.push({
            field: defaults.field, matchCase: defaults.matchCase, operator: defaults.operator,
            predicate: defaults.predicate, value: undefined
        });
        return coll;
    };
    // eslint-disable-next-line
    /** @hidden */
    CheckBoxFilterBase.prototype.initiateFilter = function (fColl) {
        var firstVal = fColl[0];
        var predicate;
        if (!isNullOrUndefined(firstVal)) {
            predicate = firstVal.ejpredicate ? firstVal.ejpredicate :
                new Predicate(firstVal.field, firstVal.operator, firstVal.value, !firstVal.matchCase, firstVal.ignoreAccent);
            for (var j = 1; j < fColl.length; j++) {
                predicate = fColl[parseInt(j.toString(), 10)].ejpredicate !== undefined ?
                    predicate[fColl[parseInt(j.toString(), 10)].predicate](fColl[parseInt(j.toString(), 10)].ejpredicate) :
                    predicate[fColl[parseInt(j.toString(), 10)].predicate](fColl[parseInt(j.toString(), 10)].field, fColl[parseInt(j.toString(), 10)].operator, fColl[parseInt(j.toString(), 10)].value, !fColl[parseInt(j.toString(), 10)].matchCase, fColl[parseInt(j.toString(), 10)].ignoreAccent);
            }
            var args = {
                action: 'filtering', filterCollection: fColl, field: this.options.field,
                ejpredicate: Predicate.or(predicate)
            };
            this.options.handler(args);
        }
    };
    CheckBoxFilterBase.prototype.isForeignColumn = function (col) {
        return col.isForeignColumn ? col.isForeignColumn() : false;
    };
    CheckBoxFilterBase.prototype.refreshCheckboxes = function () {
        var _this = this;
        var val = this.sInput.value;
        var column = this.options.column;
        var query = this.isForeignColumn(column) ? this.foreignKeyQuery.clone() : this.options.query.clone();
        var foreignQuery = this.options.query.clone();
        var pred = query.queries.filter(function (e) { return e && e.fn === 'onWhere'; })[0];
        query.queries = [];
        foreignQuery.queries = [];
        var parsed = (this.options.type !== 'string' && parseFloat(val)) ? parseFloat(val) : val;
        var operator = this.options.isRemote ?
            (this.options.type === 'string' ? 'contains' : 'equal') : (this.options.type ? 'contains' : 'equal');
        var matchCase = true;
        var ignoreAccent = this.options.ignoreAccent;
        var field = this.isForeignColumn(column) ? column.foreignKeyValue : column.field;
        parsed = (parsed === '' || parsed === undefined) ? undefined : parsed;
        var coll = [];
        var defaults = {
            field: field, predicate: 'or', uid: this.options.uid,
            operator: 'equal', type: this.options.type, matchCase: matchCase, ignoreAccent: ignoreAccent
        };
        var predicte;
        var moduleName = this.options.dataManager.adaptor.getModuleName;
        if (this.options.type === 'boolean') {
            if (parsed !== undefined &&
                this.getLocalizedLabel('FilterTrue').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = 'true';
            }
            else if (parsed !== undefined &&
                this.getLocalizedLabel('FilterFalse').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = 'false';
            }
            if (parsed !== undefined &&
                this.getLocalizedLabel('FilterTrue').toLowerCase().indexOf(parsed.toLowerCase()) !== -1 && moduleName) {
                // eslint-disable-next-line no-constant-condition
                parsed = (moduleName() === 'ODataAdaptor' || 'ODataV4Adaptor') ? true : 'true';
            }
            else if (parsed !== undefined &&
                this.getLocalizedLabel('FilterFalse').toLowerCase().indexOf(parsed.toLowerCase()) !== -1 && moduleName) {
                // eslint-disable-next-line no-constant-condition
                parsed = (moduleName() === 'ODataAdaptor' || 'ODataV4Adaptor') ? false : 'false';
            }
            operator = 'equal';
        }
        if ((this.options.type === 'date' || this.options.type === 'datetime' || this.options.type === 'dateonly') && this.options.format) {
            var intl = new Internationalization();
            var format = typeof (this.options.format) === 'string' ? this.options.format :
                this.options.format.format;
            if (format) {
                parsed = intl.parseDate(val, { format: format }) || new Date(val);
            }
            else {
                parsed = new Date(val);
            }
            if (this.options.type === 'dateonly') {
                parsed = parsed.getFullYear() + '-' + padZero(parsed.getMonth() + 1) + '-' + padZero(parsed.getDate());
            }
        }
        this.infiniteSearchValChange = true;
        this.infiniteLoadedElem = [];
        this.infiniteLocalSelectAll = true;
        this.localInfiniteSelectAllClicked = false;
        this.localInfiniteSelectionInteracted = false;
        this.infiniteSkipCnt = 0;
        this.infiniteDataCount = 0;
        this.infiniteManualSelectMaintainPred = [];
        if (this.sInput.value === '') {
            this.infiniteUnloadParentExistPred = this.infiniteRenderMod && this.existingPredicate[this.options.column.field] ? this.existingPredicate[this.options.column.field].slice() : [];
        }
        else {
            this.infiniteUnloadParentExistPred = [];
        }
        this.addDistinct(query);
        var args = {
            requestType: events.filterSearchBegin,
            filterModel: this, columnName: field, column: column,
            operator: operator, matchCase: matchCase, ignoreAccent: ignoreAccent, filterChoiceCount: null,
            query: query, value: parsed
        };
        if (this.infiniteRenderMod && this.parent.filterSettings.itemsCount) {
            args.filterChoiceCount = this.parent.filterSettings.itemsCount;
        }
        this.parent.trigger(events.actionBegin, args, function (filterargs) {
            // eslint-disable-next-line no-self-assign
            filterargs.operator = filterargs.operator;
            predicte = new Predicate(field, filterargs.operator, args.value, filterargs.matchCase, filterargs.ignoreAccent);
            if (_this.options.type === 'date' || _this.options.type === 'datetime' || _this.options.type === 'dateonly') {
                operator = 'equal';
                var filterObj = {
                    field: field, operator: operator, value: parsed, matchCase: matchCase,
                    ignoreAccent: ignoreAccent
                };
                if (!isNullOrUndefined(parsed)) {
                    predicte = getDatePredicate(filterObj, _this.options.type);
                }
            }
            if (val && typeof val === 'string' && _this.isBlanks &&
                _this.getLocalizedLabel('Blanks').toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                coll = coll.concat(CheckBoxFilterBase.generateNullValuePredicates(defaults));
                var emptyValPredicte = CheckBoxFilterBase.generatePredicate(coll);
                emptyValPredicte.predicates.push(predicte);
                predicte = emptyValPredicte;
                query.where(emptyValPredicte);
            }
            else if (val.length) {
                predicte = !isNullOrUndefined(pred) ? predicte.and(pred.e) : predicte;
                query.where(predicte);
            }
            else if (!isNullOrUndefined(pred)) {
                predicte = pred.e;
                query.where(pred.e);
            }
            _this.infiniteSearchPred = predicte;
            filterargs.filterChoiceCount = !isNullOrUndefined(filterargs.filterChoiceCount) ? filterargs.filterChoiceCount : 1000;
            if (_this.infiniteRenderMod && _this.parent.filterSettings.itemsCount !== filterargs.filterChoiceCount) {
                _this.parent.filterSettings.itemsCount = args.filterChoiceCount;
            }
            var fPredicate = {};
            showSpinner(_this.spinner);
            _this.renderEmpty = false;
            if (_this.isForeignColumn(column) && val.length) {
                var colData = ('result' in column.dataSource) ? new DataManager(column.dataSource.result) :
                    column.dataSource;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                colData.executeQuery(query).then(function (e) {
                    var columnData = _this.options.column.columnData;
                    _this.options.column.columnData = e.result;
                    _this.parent.notify(events.generateQuery, { predicate: fPredicate, column: column });
                    if (fPredicate.predicate.predicates.length) {
                        foreignQuery.where(fPredicate.predicate);
                    }
                    else {
                        _this.renderEmpty = true;
                    }
                    _this.options.column.columnData = columnData;
                    if (_this.infiniteRenderMod) {
                        _this.infiniteInitialLoad = isNullOrUndefined(_this.fullData) ? true : false;
                        _this.makeInfiniteScrollRequest(foreignQuery);
                        foreignQuery.requiresCount();
                    }
                    else {
                        foreignQuery.take(filterargs.filterChoiceCount);
                    }
                    _this.search(filterargs, foreignQuery);
                });
            }
            else {
                if (_this.infiniteRenderMod && _this.parent.filterSettings.itemsCount) {
                    _this.infiniteInitialLoad = isNullOrUndefined(_this.fullData) ? true : false;
                    _this.makeInfiniteScrollRequest(query);
                    query.requiresCount();
                }
                else {
                    query.take(filterargs.filterChoiceCount);
                }
                _this.search(filterargs, query);
            }
        });
    };
    CheckBoxFilterBase.prototype.search = function (args, query) {
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            this.filterEvent(args, query);
        }
        else {
            this.processSearch(query);
        }
    };
    CheckBoxFilterBase.prototype.getPredicateFromCols = function (columns, isExecuteLocal) {
        var predicates = CheckBoxFilterBase.getPredicate(columns, isExecuteLocal);
        var predicateList = [];
        var fPredicate = {};
        var isGrid = this.parent.getForeignKeyColumns !== undefined;
        var foreignColumn = isGrid ? this.parent.getForeignKeyColumns() : [];
        for (var _i = 0, _a = Object.keys(predicates); _i < _a.length; _i++) {
            var prop = _a[_i];
            var col = void 0;
            if (isGrid && !this.parent.getColumnByField(prop)) {
                col = getColumnByForeignKeyValue(prop, foreignColumn);
            }
            if (col) {
                this.parent.notify(events.generateQuery, { predicate: fPredicate, column: col });
                if (fPredicate.predicate.predicates.length) {
                    predicateList.push(Predicate.or(fPredicate.predicate.predicates));
                }
            }
            else {
                predicateList.push(predicates["" + prop]);
            }
        }
        return predicateList.length && Predicate.and(predicateList);
    };
    CheckBoxFilterBase.prototype.getQuery = function () {
        return this.parent.getQuery ? this.parent.getQuery().clone() : new Query();
    };
    CheckBoxFilterBase.prototype.getAllData = function () {
        var _this = this;
        this.customQuery = false;
        var query = this.getQuery();
        var moduleName = this.options.dataManager.adaptor.getModuleName;
        if (!(!isNullOrUndefined(this.parent.getDataModule) && moduleName && moduleName() === 'ODataV4Adaptor')) {
            query.requiresCount(); //consider take query
        }
        this.addDistinct(query);
        var args = {
            requestType: events.filterChoiceRequest, query: query, filterChoiceCount: null
        };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        if (this.infiniteRenderMod && this.parent.filterSettings.itemsCount) {
            args.filterChoiceCount = this.parent.filterSettings.itemsCount;
        }
        this.parent.trigger(events.actionBegin, args, function (args) {
            args.filterChoiceCount = !isNullOrUndefined(args.filterChoiceCount) ? args.filterChoiceCount : 1000;
            if (_this.infiniteRenderMod && _this.parent.filterSettings.itemsCount !== args.filterChoiceCount) {
                _this.parent.filterSettings.itemsCount = args.filterChoiceCount;
            }
            if (!_this.infiniteRenderMod) {
                query.take(args.filterChoiceCount);
            }
            if (!args.query.distincts.length || _this.infiniteRenderMod) {
                _this.customQuery = true;
                _this.queryGenerate(query);
            }
            if (_this.infiniteRenderMod) {
                _this.infiniteInitialLoad = isNullOrUndefined(_this.fullData) ? true : false;
                _this.makeInfiniteScrollRequest(query);
            }
            if (_this.parent.dataSource && 'result' in _this.parent.dataSource) {
                _this.filterEvent(args, query);
            }
            else {
                _this.processDataOperation(query, true);
            }
        });
    };
    CheckBoxFilterBase.prototype.addDistinct = function (query) {
        var _this = this;
        var filteredColumn = DataUtil.distinct(this.options.filteredColumns, 'field');
        if (filteredColumn.indexOf(this.options.column.field) <= -1) {
            filteredColumn = filteredColumn.concat(this.options.column.field);
        }
        var moduleName = this.options.dataManager.adaptor.getModuleName;
        if (moduleName && moduleName() === 'ODataV4Adaptor' && this.parent &&
            this.parent.query instanceof Query) {
            var gridQuery = this.parent.query;
            for (var i = 0; i < gridQuery.queries.length; i++) {
                var queryOptions = gridQuery.queries[parseInt(i.toString(), 10)];
                if (queryOptions.fn === 'onWhere') {
                    this.getPredicateFields(queryOptions.e);
                    this.queryFilteredColumn.map(function (field) {
                        if (filteredColumn.indexOf(field) === -1) {
                            filteredColumn.push(field);
                        }
                    });
                    this.queryFilteredColumn = [];
                }
            }
        }
        if (!this.infiniteRenderMod) {
            query.distinct(filteredColumn);
        }
        if (this.infiniteRenderMod && !this.options.isRemote && this.sInput.value === '') {
            this.options.dataSource = this.options.dataSource instanceof DataManager ?
                this.options.dataSource : new DataManager(this.options.dataSource);
            this.infinitePermenantLocalData = this.options.dataSource.dataSource.json.slice();
            var query1 = new Query();
            this.queryGenerate(query1);
            var result = new DataManager(this.options.dataSource.dataSource).executeLocal(query1);
            this.options.dataSource.dataSource.json = DataUtil.distinct(result, this.options.column.field, true);
            if (this.isForeignColumn(this.options.column)) {
                this.options.column.dataSource = this.options.column.dataSource instanceof DataManager ?
                    this.options.column.dataSource : new DataManager(this.options.column.dataSource);
                this.options.dataSource.dataSource.json = this.options.dataSource.dataSource.json.map(function (item, i) {
                    return Object.assign({}, item, _this.options.column.dataSource.dataSource.json[i]);
                });
            }
        }
        else if (this.infiniteRenderMod && this.options.isRemote) {
            query.select(this.options.column.field);
            query.sortBy(this.options.column.field, 'ascending');
            var moduleName_1 = this.options.dataManager.adaptor.getModuleName;
            if (moduleName_1 && moduleName_1() && (moduleName_1() === 'ODataV4Adaptor' || moduleName_1() === 'WebApiAdaptor'
                || moduleName_1() === 'CustomDataAdaptor' || moduleName_1() === 'GraphQLAdaptor' || moduleName_1() === 'ODataAdaptor')) {
                query.distinct(filteredColumn);
            }
        }
        return query;
    };
    CheckBoxFilterBase.prototype.getPredicateFields = function (query) {
        var _this = this;
        if (query.isComplex && query.predicates) {
            query.predicates.forEach(function (predicate) {
                if (Array.isArray(predicate)) {
                    predicate.forEach(function (p) { return _this.getPredicateFields(p); });
                }
                else {
                    _this.getPredicateFields(predicate);
                }
            });
        }
        else {
            if (query.field && !query.isComplex) {
                if (this.queryFilteredColumn.indexOf(query.field) <= -1) {
                    this.queryFilteredColumn = this.queryFilteredColumn.concat(DataUtil.distinct([query.field], 'field'));
                }
            }
        }
    };
    CheckBoxFilterBase.prototype.filterEvent = function (args, query) {
        var _this = this;
        var defObj = eventPromise(args, query);
        this.parent.trigger(events.dataStateChange, defObj.state);
        this.addInfiniteScrollEvent(query);
        var def = defObj.deffered;
        def.promise.then(function (e) {
            _this.infiniteDataCount = _this.infiniteRenderMod && !_this.infiniteDataCount ? e['count'] : _this.infiniteDataCount;
            var dataResult = _this.infiniteRenderMod ? e['result'] : e;
            _this.dataSuccess(dataResult);
        });
    };
    CheckBoxFilterBase.prototype.addInfiniteScrollEvent = function (query) {
        if (this.infiniteRenderMod) {
            this.infiniteQuery = query.clone();
            if (this.infiniteInitialLoad) {
                this.cBox.classList.add('e-checkbox-infinitescroll');
                EventHandler.add(this.cBox, 'scroll', this.infiniteScrollHandler, this);
                EventHandler.add(this.cBox, 'mouseup', this.infiniteScrollMouseKeyUpHandler, this);
                EventHandler.add(this.cBox, 'mousedown', this.infiniteScrollMouseKeyDownHandler, this);
            }
            else if (this.infiniteSearchValChange) {
                this.cBox.innerHTML = '';
            }
        }
    };
    CheckBoxFilterBase.prototype.infiniteScrollMouseKeyDownHandler = function () {
        EventHandler.remove(this.cBox, 'scroll', this.infiniteScrollHandler);
    };
    CheckBoxFilterBase.prototype.infiniteScrollMouseKeyUpHandler = function (e) {
        var _this = this;
        EventHandler.add(this.cBox, 'scroll', this.infiniteScrollHandler, this);
        var target = this.cBox;
        if (target.children.length > 1 && (target.scrollTop >= target.scrollHeight - target.offsetHeight || target.scrollTop <= 0)) {
            this.infiniteScrollHandler();
        }
        Global.timer = setTimeout(function () { _this.clickHandler(e); Global.timer = null; }, 0);
    };
    CheckBoxFilterBase.prototype.getShimmerTemplate = function () {
        return '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave"></span>';
    };
    /**
     * @returns {void}
     * @hidden
     */
    CheckBoxFilterBase.prototype.showMask = function () {
        var maskRowCount = 5;
        var maskItemHeight;
        var maskList = this.parent.createElement('div', { id: this.id + this.options.type + '_CheckBoxMaskList',
            className: 'e-checkboxlist e-fields e-infinite-list e-masklist' });
        maskList.style.zIndex = '10';
        var wrapperElem = this.cBox;
        this.removeMask();
        if (wrapperElem) {
            var computedStyle = getComputedStyle(wrapperElem);
            var liHeight = getListHeight(wrapperElem);
            var height = wrapperElem.children.length ? parseInt(computedStyle.height, 10) :
                Math.floor(parseInt(computedStyle.height.split('px')[0], 10)) - 5;
            if (this.parent.enableAdaptiveUI && this.infiniteRenderMod) {
                maskList.style.height = (height - liHeight) + 'px';
                this.dlg.querySelector('.e-dlg-content').style.overflow = 'hidden';
            }
            var backgroundColor = this.isExcel && !wrapperElem.children.length && !this.dlg.classList.contains('e-excelfilter') ?
                '' : getComputedStyle(this.dlg.querySelector('.e-dlg-content')).backgroundColor;
            maskList.style.cssText = 'width: ' + computedStyle.width + '; min-height: ' + computedStyle.minHeight + '; height: ' +
                height + 'px; margin: ' + computedStyle.margin + '; border-style: ' + computedStyle.borderStyle + '; border-width: '
                + computedStyle.borderWidth + '; border-color: ' + computedStyle.borderColor + '; position: absolute; background-color: ' +
                backgroundColor + ';';
            maskRowCount = Math.floor(height / liHeight);
            maskRowCount = wrapperElem.children.length > maskRowCount ? wrapperElem.children.length : maskRowCount;
            maskItemHeight = liHeight + 'px';
        }
        var maskTemplate = '<div class="e-ftrchk e-mask-ftrchk">'
            + '<div class="e-checkbox-wrapper"><input class="e-chk-hidden">'
            + this.getShimmerTemplate() + this.getShimmerTemplate() + '</div></div>';
        maskList.innerHTML = '';
        if (!wrapperElem.children.length) {
            this.spinner.insertAdjacentHTML('beforebegin', maskTemplate);
            this.spinner.parentElement.querySelector('.e-ftrchk.e-mask-ftrchk').style.cssText =
                'width: 100%; height: ' + maskItemHeight + ';';
            this.spinner.parentElement.querySelector('.e-checkbox-wrapper').style.width = '100%';
            var maskSpan = [].slice.call(this.spinner.parentElement
                .querySelectorAll('.e-mask:not(.e-mask-checkbox-filter-intent):not(.e-mask-checkbox-filter-span-intent)'));
            maskSpan[0].classList.add('e-mask-checkbox-filter-intent');
            maskSpan[1].classList.add('e-mask-checkbox-filter-span-intent');
        }
        this.spinner.insertBefore(maskList, this.cBox);
        for (var i = 0; maskRowCount && i < maskRowCount; i++) {
            maskList.innerHTML += maskTemplate;
            maskList.querySelector('.e-ftrchk.e-mask-ftrchk').style.cssText =
                'width: 100%; height: ' + maskItemHeight + ';';
            maskList.querySelector('.e-checkbox-wrapper').style.width = '100%';
            var maskSpan = [].slice.call(maskList
                .querySelectorAll('.e-mask:not(.e-mask-checkbox-filter-intent):not(.e-mask-checkbox-filter-span-intent)'));
            maskSpan[0].classList.add('e-mask-checkbox-filter-intent');
            maskSpan[1].classList.add('e-mask-checkbox-filter-span-intent');
        }
        if (this.cBox) {
            maskList.scrollTop = this.cBox.scrollTop;
        }
    };
    CheckBoxFilterBase.prototype.removeMask = function () {
        var maskLists = this.dialogObj.element.querySelectorAll('.e-mask-ftrchk');
        if (maskLists.length) {
            for (var i = 0; i < maskLists.length; i++) {
                remove(maskLists[i]);
            }
        }
        var maskParent = this.dialogObj.element.querySelector('.e-checkboxlist.e-masklist');
        if (maskParent) {
            remove(this.dialogObj.element.querySelector('.e-checkboxlist.e-masklist'));
        }
    };
    CheckBoxFilterBase.prototype.infiniteScrollHandler = function () {
        var target = this.cBox;
        if (target.scrollTop >= target.scrollHeight - target.offsetHeight && !this.infiniteQueryExecutionPending
            && this.infiniteLoadedElem.length <= (this.infiniteSkipCnt + this.parent.filterSettings.itemsCount)
            && this.cBox.children.length === this.parent.filterSettings.itemsCount * 3
            && (!this.infiniteDataCount || this.infiniteDataCount > (this.infiniteSkipCnt + this.parent.filterSettings.itemsCount))) {
            this.makeInfiniteScrollRequest();
            this.prevInfiniteScrollDirection = 'down';
        }
        else if (target.scrollTop >= target.scrollHeight - target.offsetHeight && !this.infiniteQueryExecutionPending
            && this.infiniteLoadedElem.length > (this.infiniteSkipCnt + this.parent.filterSettings.itemsCount)
            && this.cBox.children.length === this.parent.filterSettings.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.cBox.children)).splice(0, this.parent.filterSettings.itemsCount));
            this.infiniteSkipCnt += this.prevInfiniteScrollDirection === 'down' ? this.parent.filterSettings.itemsCount :
                (this.parent.filterSettings.itemsCount * 3);
            appendChildren(this.cBox, this.infiniteLoadedElem.slice(this.infiniteSkipCnt, this.parent.filterSettings.itemsCount +
                this.infiniteSkipCnt));
            this.prevInfiniteScrollDirection = 'down';
        }
        else if (target.scrollTop === 0 && !this.infiniteInitialLoad && !this.infiniteSearchValChange && this.infiniteSkipCnt
            && this.infiniteLoadedElem.length && this.infiniteLoadedElem.length > this.parent.filterSettings.itemsCount * 3
            && this.cBox.children.length === this.parent.filterSettings.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.cBox.children)).splice((this.parent.filterSettings
                .itemsCount * 2), this.parent.filterSettings.itemsCount));
            this.infiniteSkipCnt -= this.prevInfiniteScrollDirection === 'up' ? this.parent.filterSettings.itemsCount :
                (this.parent.filterSettings.itemsCount * 3);
            infiniteAppendElements([].slice.call(this.infiniteLoadedElem.slice(this.infiniteSkipCnt, this.infiniteSkipCnt +
                this.parent.filterSettings.itemsCount)), this.cBox);
            this.cBox.scrollTop = this.infiniteScrollAppendDiff;
            this.prevInfiniteScrollDirection = 'up';
        }
        else if (target.scrollTop === 0 && !this.infiniteInitialLoad && !this.infiniteSearchValChange && this.infiniteSkipCnt
            && this.infiniteLoadedElem.length && this.cBox.children.length < this.parent.filterSettings.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.cBox.children)).splice((this.parent.filterSettings
                .itemsCount * 2), this.infiniteDataCount % this.parent.filterSettings.itemsCount));
            this.infiniteSkipCnt = (Math.floor(this.infiniteDataCount / this.parent.filterSettings.itemsCount) - 3) *
                this.parent.filterSettings.itemsCount;
            infiniteAppendElements([].slice.call(this.infiniteLoadedElem.slice(this.infiniteSkipCnt, this.infiniteSkipCnt +
                this.parent.filterSettings.itemsCount)), this.cBox);
            this.cBox.scrollTop = this.infiniteScrollAppendDiff;
            this.prevInfiniteScrollDirection = 'up';
        }
    };
    CheckBoxFilterBase.prototype.makeInfiniteScrollRequest = function (query) {
        var _this = this;
        if (!this.infiniteInitialLoad && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer') {
            setTimeout(function () {
                if (_this.infiniteQueryExecutionPending) {
                    _this.showMask();
                }
            }, 500);
        }
        else if (!this.infiniteInitialLoad) {
            createSpinner({ target: this.spinner, cssClass: this.parent.cssClass ? this.parent.cssClass : null }, this.parent
                .createElement);
            showSpinner(this.spinner);
        }
        var fName = 'fn';
        if (this.infiniteQuery && this.infiniteQuery.queries && this.infiniteQuery.queries.length) {
            for (var i = 0; i < this.infiniteQuery.queries.length; i++) {
                if (this.infiniteQuery.queries[i]["" + fName] === 'onTake'
                    || this.infiniteQuery.queries[i]["" + fName] === 'onSkip') {
                    this.infiniteQuery.queries.splice(i, 1);
                    i--;
                }
            }
        }
        var existQuery = query ? true : false;
        query = query ? query : this.infiniteQuery;
        if (this.infiniteInitialLoad || this.infiniteSearchValChange) {
            this.infiniteSkipCnt = 0;
        }
        else {
            this.infiniteSkipCnt += this.parent.filterSettings.itemsCount;
        }
        query.skip(this.infiniteSkipCnt);
        if (this.infiniteInitialLoad || this.infiniteSearchValChange) {
            query.take(this.parent.filterSettings.itemsCount * 3);
            this.infiniteSkipCnt += this.parent.filterSettings.itemsCount * 2;
        }
        else {
            query.take(this.parent.filterSettings.itemsCount);
        }
        if (!existQuery) {
            if (this.parent.dataSource && 'result' in this.parent.dataSource) {
                var args = {
                    requestType: events.filterChoiceRequest, query: query, filterChoiceCount: null, filterModel: this
                };
                if (this.infiniteRenderMod && this.parent.filterSettings.itemsCount) {
                    args.filterChoiceCount = this.parent.filterSettings.itemsCount;
                }
                this.filterEvent(args, query);
            }
            else {
                this.processDataOperation(query);
                this.infiniteQueryExecutionPending = true;
            }
        }
    };
    CheckBoxFilterBase.prototype.processDataOperation = function (query, isInitial) {
        var _this = this;
        this.options.dataSource = this.options.dataSource instanceof DataManager ?
            this.options.dataSource : new DataManager(this.options.dataSource);
        var allPromise = [];
        var runArray = [];
        if (this.isForeignColumn(this.options.column) && isInitial) {
            var colData = ('result' in this.options.column.dataSource) ?
                new DataManager(this.options.column.dataSource.result) :
                this.options.column.dataSource;
            this.foreignKeyQuery.params = query.params;
            allPromise.push(colData.executeQuery(this.foreignKeyQuery));
            runArray.push(function (data) { return _this.foreignKeyData = data; });
        }
        this.addInfiniteScrollEvent(query);
        if (this.infiniteRenderMod && this.infiniteInitialLoad && !this.options.isRemote) {
            var field = this.isForeignColumn(this.options.column) ? this.options.foreignKeyValue :
                this.options.column.field;
            this.options.dataSource.executeQuery(new Query().sortBy(field, DataUtil.fnAscending)).then(function (e) {
                _this.options.dataSource.dataSource.json = e.result;
                _this.executeQueryOperations(query, allPromise, runArray);
            });
        }
        else {
            this.executeQueryOperations(query, allPromise, runArray);
        }
    };
    CheckBoxFilterBase.prototype.executeQueryOperations = function (query, allPromise, runArray) {
        var _this = this;
        allPromise.push(this.options.dataSource.executeQuery(query));
        runArray.push(this.dataSuccess.bind(this));
        var i = 0;
        Promise.all(allPromise).then(function (e) {
            _this.infiniteQueryExecutionPending = _this.infiniteRenderMod ? false : _this.infiniteQueryExecutionPending;
            for (var j = 0; j < e.length; j++) {
                _this.infiniteDataCount = _this.infiniteRenderMod && !_this.infiniteDataCount ? e[j].count : _this.infiniteDataCount;
                runArray[i++](e[parseInt(j.toString(), 10)].result);
            }
        }).catch(function () {
            if (_this.infiniteRenderMod && _this.parent.filterSettings && _this.parent.filterSettings.loadingIndicator === 'Shimmer') {
                _this.parent.showMaskRow(undefined, _this.dialogObj.element);
            }
        });
    };
    CheckBoxFilterBase.prototype.dataSuccess = function (e) {
        if (!this.infiniteInitialLoad && this.infiniteDataCount && ((this.infiniteSkipCnt >= this.infiniteDataCount
            && !this.infiniteSearchValChange) || (e.length === 0))) {
            return;
        }
        this.fullData = e;
        var args1 = { dataSource: this.fullData, executeQuery: true, field: this.options.field };
        this.parent.notify(events.beforeCheckboxRenderer, args1);
        if (args1.executeQuery) {
            var query = new Query();
            if (!this.customQuery) {
                this.isExecuteLocal = true;
                this.queryGenerate(query);
                this.isExecuteLocal = false;
            }
            // query.select(this.options.field);
            var result = new DataManager(args1.dataSource).executeLocal(query);
            var col = this.options.column;
            this.filteredData = CheckBoxFilterBase.getDistinct(result, this.options.field, col, this.foreignKeyData, this).records || [];
        }
        var data = args1.executeQuery ? this.filteredData : args1.dataSource;
        this.processDataSource(null, true, data, args1);
        if (this.sInput && ((this.infiniteRenderMod && this.infiniteInitialLoad) || !this.infiniteRenderMod)) {
            this.sInput.focus();
        }
        if (this.infiniteInitialLoad || this.infiniteSearchValChange) {
            this.infiniteInitialLoad = false;
            this.infiniteSearchValChange = false;
        }
        var args = {
            requestType: events.filterAfterOpen,
            columnName: this.options.field, columnType: this.options.type
        };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        this.parent.notify(events.cBoxFltrComplete, args);
        if (this.isCheckboxFilterTemplate) {
            hideSpinner(this.spinner);
        }
    };
    CheckBoxFilterBase.prototype.queryGenerate = function (query) {
        if (this.parent.searchSettings && this.parent.searchSettings.key.length) {
            var moduleName = this.options.dataManager.adaptor.getModuleName;
            if (!isNullOrUndefined(this.parent.getDataModule) && moduleName && moduleName() === 'ODataV4Adaptor') {
                this.parent.getDataModule().searchQuery(query);
            }
            else {
                var searchSettings = this.parent.searchSettings;
                var fields = searchSettings.fields.length ? searchSettings.fields
                    : this.options.columns.map(function (f) { return f.field; });
                query.search(searchSettings.key, fields, searchSettings.operator, searchSettings.ignoreCase, searchSettings.ignoreAccent);
            }
        }
        if ((this.options.filteredColumns.length)) {
            var cols = [];
            for (var i = 0; i < this.options.filteredColumns.length; i++) {
                var filterColumn = this.options.filteredColumns[parseInt(i.toString(), 10)];
                if (this.options.uid) {
                    filterColumn.uid = filterColumn.uid || this.parent.getColumnByField(filterColumn.field).uid;
                    if (filterColumn.uid !== this.options.uid) {
                        cols.push(this.options.filteredColumns[parseInt(i.toString(), 10)]);
                    }
                }
                else {
                    if (filterColumn.field !== this.options.field) {
                        cols.push(this.options.filteredColumns[parseInt(i.toString(), 10)]);
                    }
                }
            }
            var predicate = this.getPredicateFromCols(cols, this.isExecuteLocal);
            if (predicate) {
                query.where(predicate);
            }
        }
    };
    CheckBoxFilterBase.prototype.processDataSource = function (query, isInitial, dataSource, args) {
        showSpinner(this.spinner);
        // query = query ? query : this.options.query.clone();
        // query.requiresCount();
        // let result: Object = new DataManager(dataSource as JSON[]).executeLocal(query);
        // let res: { result: Object[] } = result as { result: Object[] };
        this.isExecuteLocal = true;
        this.updateResult();
        this.isExecuteLocal = false;
        var args1 = { dataSource: this.fullData, isCheckboxFilterTemplate: false, column: this.options.column,
            element: this.cBox, type: this.options.type, format: this.options.type, btnObj: this.options.isResponsiveFilter ? null :
                this.dialogObj.btnObj[0], searchBox: this.searchBox };
        this.parent.notify(events.beforeCheckboxfilterRenderer, args1);
        this.isCheckboxFilterTemplate = args1.isCheckboxFilterTemplate;
        if (!this.isCheckboxFilterTemplate) {
            this.createFilterItems(dataSource, isInitial, args);
        }
        else if (this.infiniteRenderMod && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer') {
            this.removeMask();
        }
    };
    CheckBoxFilterBase.prototype.processSearch = function (query) {
        this.processDataOperation(query);
    };
    CheckBoxFilterBase.prototype.updateResult = function () {
        this.result = {};
        var predicate = this.infiniteRenderMod && this.existingPredicate[this.options.field] ?
            this.getPredicateFromCols(this.existingPredicate[this.options.field], this.isExecuteLocal) :
            this.getPredicateFromCols(this.options.filteredColumns, this.isExecuteLocal);
        var query = new Query();
        if (predicate) {
            query.where(predicate);
        }
        this.parent.notify(events.beforeCheckboxRendererQuery, { query: query });
        var result = new DataManager(this.fullData).executeLocal(query);
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var res = result_1[_i];
            this.result[getObject(this.options.field, res)] = true;
        }
    };
    CheckBoxFilterBase.prototype.clickHandler = function (e) {
        var _a;
        if (!isNullOrUndefined(Global.timer)) {
            clearTimeout(Global.timer);
        }
        var target = e.target;
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer'
            && parentsUntil(target, 'e-mask-ftrchk')) {
            return;
        }
        var elem = parentsUntil(target, 'e-checkbox-wrapper');
        if (parentsUntil(target, 'e-searchbox')) {
            this.searchBoxClick(e);
        }
        if (elem && !this.isCheckboxFilterTemplate) {
            var selectAll = elem.querySelector('.e-selectall');
            if (selectAll) {
                this.updateAllCBoxes(!selectAll.classList.contains('e-check'));
            }
            else {
                toogleCheckbox(elem.parentElement);
                if (this.infiniteRenderMod && !elem.parentElement.querySelector('.e-add-current')) {
                    this.localInfiniteSelectionInteracted = true;
                    var caseSen = this.options.allowCaseSensitive;
                    var span = elem.parentElement.querySelector('.e-frame');
                    var input = span.previousSibling;
                    var optr = input.checked ? 'equal' : 'notequal';
                    var pred = input.checked ? 'or' : 'and';
                    var defaults = { field: this.options.field, predicate: pred, uid: this.options.uid,
                        operator: optr, type: this.options.type, matchCase: caseSen, ignoreAccent: this.options.ignoreAccent
                    };
                    var value = this.values[parentsUntil(input, 'e-ftrchk').getAttribute('uid')];
                    this.updateInfiniteManualSelectPred(defaults, value);
                    if (this.infiniteRenderMod && !this.options.isRemote && this.options.parentTotalDataCount
                        && this.infiniteUnloadParentExistPred.length) {
                        var predicate = this.getPredicateFromCols((_a = this.options.filteredColumns).concat.apply(_a, this.infiniteManualSelectMaintainPred), true);
                        var query = new Query();
                        if (predicate) {
                            query.where(predicate);
                        }
                        var result = new DataManager(this.infinitePermenantLocalData).executeLocal(query);
                        if (this.options.parentTotalDataCount !== result.length) {
                            this.options.parentTotalDataCount = result.length;
                        }
                        if (!this.options.parentTotalDataCount && this.infiniteUnloadParentExistPred.length) {
                            this.infiniteUnloadParentExistPred = [];
                        }
                    }
                    if (this.infiniteUnloadParentExistPred.length && (this.options.parentTotalDataCount === this.infiniteDataCount
                        || !this.options.parentTotalDataCount)) {
                        this.infiniteUnloadParentExistPred = [];
                    }
                }
            }
            this.updateIndeterminatenBtn();
            elem.querySelector('.e-chk-hidden').focus();
        }
        this.setFocus(parentsUntil(elem, 'e-ftrchk'));
    };
    CheckBoxFilterBase.prototype.updateInfiniteManualSelectPred = function (defaults, value) {
        for (var i = 0; i < this.infiniteManualSelectMaintainPred.length; i++) {
            var predmdl = this.infiniteManualSelectMaintainPred[i];
            if (predmdl.value + '' === value + '' && (predmdl.operator === 'equal' || predmdl.operator === 'notequal')) {
                this.infiniteManualSelectMaintainPred.splice(i, 1);
                break;
            }
        }
        if ((defaults.predicate === 'or' && (!this.localInfiniteSelectAllClicked || !this.infiniteLocalSelectAll))
            || (defaults.predicate === 'and' && (!this.localInfiniteSelectAllClicked || this.infiniteLocalSelectAll))) {
            this.infiniteManualSelectMaintainPred.push(extend({}, { value: value }, defaults));
            if (defaults.predicate === 'or') {
                this.options.parentTotalDataCount++;
            }
            else {
                this.options.parentTotalDataCount--;
            }
        }
    };
    /**
     * Method to set the next target element on keyboard navigation using arrow keys.
     *
     * @param {KeyboardEventArgs} e - Defines the Keyboard event argument
     * @param {HTMLElement[]} focusableElements - Defines the Focusable elements
     * @returns {void}
     */
    CheckBoxFilterBase.prototype.focusNextOrPrev = function (e, focusableElements) {
        var nextIndex = (e.key === 'ArrowUp') ? focusableElements.indexOf(document.activeElement) - 1
            : focusableElements.indexOf(document.activeElement) + 1;
        var nextElement = focusableElements[((nextIndex + focusableElements.length) % focusableElements.length)];
        // Set focus on the next / previous element
        if (nextElement) {
            nextElement.focus();
            var target = nextElement.classList.contains('e-chk-hidden') ? parentsUntil(nextElement, 'e-ftrchk') : nextElement;
            this.setFocus(target);
        }
    };
    CheckBoxFilterBase.prototype.keyupHandler = function (e) {
        if (e.key === 'Tab' || ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.altKey)) {
            this.setFocus(parentsUntil(e.target, 'e-ftrchk'));
        }
        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.altKey && this.parent.filterSettings
            && this.parent.filterSettings.type === 'CheckBox') {
            e.preventDefault();
            var focusableElements = Array.from(this.dlg.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])'));
            this.focusNextOrPrev(e, focusableElements);
        }
    };
    CheckBoxFilterBase.prototype.setFocus = function (elem) {
        var prevElem = this.dlg.querySelector('.e-chkfocus');
        if (prevElem) {
            prevElem.classList.remove('e-chkfocus');
        }
        if (elem && elem !== prevElem) {
            elem.classList.add('e-chkfocus');
        }
    };
    CheckBoxFilterBase.prototype.updateAllCBoxes = function (checked) {
        if (this.infiniteRenderMod) {
            this.localInfiniteSelectAllClicked = true;
            this.infiniteLocalSelectAll = checked;
            this.infiniteUnloadParentExistPred = [];
            this.infiniteManualSelectMaintainPred = [];
        }
        var cBoxes = this.infiniteRenderMod ?
            this.infiniteLoadedElem.map(function (arr) {
                return arr.querySelector('.e-frame');
            }) : [].slice.call(this.cBox.querySelectorAll('.e-frame:not(.e-add-current)'));
        for (var _i = 0, cBoxes_1 = cBoxes; _i < cBoxes_1.length; _i++) {
            var cBox = cBoxes_1[_i];
            removeAddCboxClasses(cBox, checked);
            setChecked(cBox.previousSibling, checked);
        }
    };
    CheckBoxFilterBase.prototype.dialogOpen = function () {
        if (this.parent.element.classList.contains('e-device')) {
            this.dialogObj.element.querySelector('.e-input-group').classList.remove('e-input-focus');
            if (!this.options.isResponsiveFilter) {
                this.dialogObj.element.querySelector('.e-btn').focus();
            }
        }
    };
    CheckBoxFilterBase.prototype.createCheckbox = function (value, checked, data) {
        var elem = checked ? this.cBoxTrue.cloneNode(true) :
            this.cBoxFalse.cloneNode(true);
        setChecked(elem.querySelector('input'), checked);
        var label = elem.querySelector('.e-label');
        var dummyData = extendObjWithFn({}, data, { column: this.options.column, parent: this.parent });
        var innerText = this.options.disableHtmlEncode ? 'textContent' : 'innerHTML';
        label["" + innerText] = !isNullOrUndefined(value) && value.toString().length ?
            this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(value) : value : this.getLocalizedLabel('Blanks');
        var checkboxUid = getUid('cbox');
        label.setAttribute('id', checkboxUid + 'cboxLabel');
        elem.querySelector('input').setAttribute('aria-labelledby', label.id);
        if (label.innerHTML === this.getLocalizedLabel('Blanks')) {
            this.isBlanks = true;
        }
        if (typeof value === 'boolean') {
            label.innerHTML = value === true ? this.getLocalizedLabel('FilterTrue') : this.getLocalizedLabel('FilterFalse');
        }
        addClass([label], ['e-checkboxfiltertext']);
        if (this.options.template && data[this.options.column.field] !== this.getLocalizedLabel('SelectAll')
            && data[this.options.column.field] !== this.getLocalizedLabel('AddCurrentSelection')) {
            label.innerHTML = '';
            var isReactCompiler = this.parent.isReact && this.options.column.filter
                && typeof (this.options.column.filter.itemTemplate) !== 'string' &&
                !(this.options.column.filter.itemTemplate.prototype && this.options.column.filter.itemTemplate.prototype.CSPTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.parent.parentDetails.parentInstObj.isReact;
            if (isReactCompiler || isReactChild) {
                this.options.template(dummyData, this.parent, 'filterItemTemplate', null, null, null, label);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(label, this.options.template(dummyData, this.parent, 'filterItemTemplate', null, null, null, null, this.parent.root));
            }
        }
        return elem;
    };
    CheckBoxFilterBase.prototype.updateIndeterminatenBtn = function () {
        var cnt = this.infiniteRenderMod ? this.infiniteLoadedElem.length : this.cBox.children.length - 1;
        var className = [];
        var disabled = false;
        var elem = this.infiniteRenderMod ? this.sBox.querySelector('.e-selectall') : this.cBox.querySelector('.e-selectall');
        var selected = this.infiniteRenderMod ? this.infiniteLoadedElem.filter(function (arr) { return arr.querySelector('.e-check'); }).length :
            this.cBox.querySelectorAll('.e-check:not(.e-selectall):not(.e-add-current)').length;
        if (this.cBox.querySelector('.e-add-current')) {
            cnt -= 1;
        }
        var btn;
        if (!this.options.isResponsiveFilter) {
            btn = this.dialogObj.btnObj[0];
            btn.disabled = false;
        }
        var input = elem.previousSibling;
        setChecked(input, false);
        input.indeterminate = false;
        if (this.infiniteRenderMod && this.sInput.value === '' && !this.options.parentCurrentViewDataCount && !this.localInfiniteSelectionInteracted
            && (!this.localInfiniteSelectAllClicked || (!this.infiniteLocalSelectAll && !selected)) && (cnt !== selected || cnt === selected)) {
            selected = 0;
        }
        else if (this.infiniteRenderMod && this.infiniteLoadedElem.length < this.infiniteDataCount
            && this.infiniteUnloadParentExistPred.length && (!selected || cnt === selected) && this.infiniteLocalSelectAll) {
            if (!selected) {
                selected += this.infiniteUnloadParentExistPred.length;
            }
            else {
                cnt += this.infiniteUnloadParentExistPred.length;
            }
        }
        if (cnt === selected) {
            if (this.infiniteRenderMod) {
                this.infiniteLocalSelectAll = true;
                this.localInfiniteSelectAllClicked = true;
                this.infiniteManualSelectMaintainPred = [];
            }
            className = ['e-check'];
            setChecked(input, true);
        }
        else if (selected) {
            className = ['e-stop'];
            input.indeterminate = true;
        }
        else {
            if (this.infiniteRenderMod) {
                this.infiniteLocalSelectAll = false;
                this.localInfiniteSelectAllClicked = true;
                this.infiniteManualSelectMaintainPred = [];
            }
            className = ['e-uncheck'];
            disabled = true;
            if (btn) {
                btn.disabled = true;
            }
        }
        if (btn) {
            this.filterState = !btn.disabled;
            btn.dataBind();
        }
        removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
        addClass([elem], className);
        this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: disabled });
    };
    CheckBoxFilterBase.prototype.createFilterItems = function (data, isInitial, args1) {
        var _a, _b, _c;
        var cBoxes = this.parent.createElement('div');
        var btn;
        var disabled = false;
        if (!this.options.isResponsiveFilter) {
            btn = this.dialogObj.btnObj[0];
        }
        var nullCounter = -1;
        var key = 'ejValue';
        if (!args1.executeQuery) {
            key = args1.field;
        }
        for (var i = 0; i < data.length; i++) {
            var val = getValue(key, data[parseInt(i.toString(), 10)]);
            if (val === '' || isNullOrUndefined(val)) {
                nullCounter = nullCounter + 1;
            }
        }
        if (!this.infiniteRenderMod) {
            this.itemsCnt = nullCounter !== -1 ? data.length - nullCounter : data.length;
        }
        if (this.infiniteRenderMod && this.parent.filterSettings && this.parent.filterSettings.loadingIndicator === 'Shimmer') {
            this.removeMask();
        }
        if (data.length && !this.renderEmpty) {
            var selectAllValue = this.getLocalizedLabel('SelectAll');
            var innerDiv = this.cBox.querySelector('.e-checkfltrnmdiv');
            if (innerDiv) {
                innerDiv.classList.remove('e-checkfltrnmdiv');
            }
            var checkBox = this.createCheckbox(selectAllValue, false, (_a = {}, _a[this.options.field] = selectAllValue, _a));
            if (this.parent.cssClass) {
                if (this.parent.cssClass.indexOf(' ') !== -1) {
                    addClass([checkBox], this.parent.cssClass.split(' '));
                }
                else {
                    addClass([checkBox], [this.parent.cssClass]);
                }
            }
            if (this.infiniteInitialLoad || !this.infiniteRenderMod) {
                var selectAll = createCboxWithWrap(getUid('cbox'), checkBox, 'e-ftrchk');
                selectAll.querySelector('.e-frame').classList.add('e-selectall');
                if (this.infiniteRenderMod) {
                    selectAll.classList.add('e-infinitescroll');
                    if (this.parent.enableAdaptiveUI) {
                        this.spinner.style.height = (this.spinner.offsetHeight - getListHeight(this.cBox)) + 'px';
                    }
                    this.sBox.insertBefore(selectAll, this.spinner);
                }
                else {
                    cBoxes.appendChild(selectAll);
                }
            }
            else if (this.sBox.querySelector('.e-ftrchk .e-selectall')) {
                this.sBox.querySelector('.e-ftrchk .e-selectall').previousSibling.disabled = false;
                this.sBox.querySelector('.e-ftrchk .e-selectall').parentElement.classList.remove('e-checkbox-disabled');
            }
            var predicate = new Predicate('field', 'equal', this.options.field);
            if (this.options.foreignKeyValue) {
                predicate = predicate.or('field', 'equal', this.options.foreignKeyValue);
            }
            var isColFiltered = new DataManager(this.options.filteredColumns).executeLocal(new Query().where(predicate)).length;
            if (this.sInput.value) {
                var predicateCheckBox = this.createCheckbox(this.getLocalizedLabel('AddCurrentSelection'), false, (_b = {},
                    _b[this.options.field] = this.getLocalizedLabel('AddCurrentSelection'),
                    _b));
                if (this.parent.cssClass) {
                    if (this.parent.cssClass.indexOf(' ') !== -1) {
                        addClass([predicateCheckBox], this.parent.cssClass.split(' '));
                    }
                    else {
                        addClass([predicateCheckBox], [this.parent.cssClass]);
                    }
                }
                if ((this.infiniteRenderMod && (!isNullOrUndefined(this.sBox.children[2])
                    && this.sBox.children[2].innerText !== this.getLocalizedLabel('AddCurrentSelection'))) || !this.infiniteRenderMod) {
                    var predicateElement = createCboxWithWrap(getUid('cbox'), predicateCheckBox, 'e-ftrchk');
                    predicateElement.querySelector('.e-frame').classList.add('e-add-current');
                    if (this.infiniteRenderMod) {
                        predicateElement.classList.add('e-infinitescroll');
                        this.sBox.insertBefore(predicateElement, this.spinner);
                        var checkBoxListElem = this.spinner.querySelector('.e-checkboxlist');
                        var reduceHeight = Math.ceil(predicateElement.getBoundingClientRect().height);
                        checkBoxListElem.style.height = (parseInt(getComputedStyle(checkBoxListElem).height.split('px')[0], 10) - reduceHeight)
                            + 'px';
                        checkBoxListElem.style.minHeight = checkBoxListElem.style.height;
                    }
                    else {
                        cBoxes.appendChild(predicateElement);
                    }
                }
                else if (this.sBox.querySelector('.e-ftrchk .e-add-current')) {
                    this.sBox.querySelector('.e-ftrchk .e-add-current').previousSibling.disabled = false;
                    this.sBox.querySelector('.e-ftrchk .e-add-current').parentElement.classList.remove('e-checkbox-disabled');
                }
            }
            else if (this.infiniteRenderMod && !isNullOrUndefined(this.sBox.children[2])
                && this.sBox.children[2].innerText === this.getLocalizedLabel('AddCurrentSelection')) {
                var checkBoxListElem = this.spinner.querySelector('.e-checkboxlist');
                var increaseHeight = Math.ceil(this.sBox.children[2].getBoundingClientRect().height);
                checkBoxListElem.style.height = (parseInt(getComputedStyle(checkBoxListElem).height.split('px')[0], 10) + increaseHeight)
                    + 'px';
                checkBoxListElem.style.minHeight = checkBoxListElem.style.height;
                remove(this.sBox.children[2]);
            }
            var isRndere = void 0;
            for (var i = 0; i < data.length; i++) {
                var uid = getUid('cbox');
                this.values["" + uid] = getValue(key, data[parseInt(i.toString(), 10)]);
                var value = getValue(this.options.field, data[parseInt(i.toString(), 10)]);
                if (this.options.formatFn) {
                    value = this.valueFormatter.toView(value, this.options.formatFn);
                }
                var args_1 = { value: value, column: this.options.column, data: data[parseInt(i.toString(), 10)] };
                this.parent.notify(events.filterCboxValue, args_1);
                value = args_1.value;
                if ((value === '' || isNullOrUndefined(value))) {
                    if (isRndere) {
                        continue;
                    }
                    isRndere = true;
                }
                if (this.infiniteRenderMod) {
                    this.updateInfiniteUnLoadedCheckboxExistPred(value, this.infiniteUnloadParentExistPred);
                }
                var checkbox = this.localInfiniteSelectAllClicked ?
                    this.createCheckbox(value, this.infiniteLocalSelectAll, getValue('dataObj', data[i])) :
                    this.createCheckbox(value, this.getCheckedState(isColFiltered, this.values["" + uid]), getValue('dataObj', data[i]));
                cBoxes.appendChild(createCboxWithWrap(uid, checkbox, 'e-ftrchk'));
                if (this.infiniteRenderMod) {
                    cBoxes.lastChild.style.height = getListHeight(this.cBox) + 'px';
                }
            }
            var scrollTop = this.cBox.scrollTop;
            if (!this.infiniteRenderMod || this.infiniteSearchValChange) {
                this.cBox.innerHTML = '';
            }
            else if (this.infiniteRenderMod && this.cBox.children.length) {
                infiniteRemoveElements(([].slice.call(this.cBox.children)).splice(0, this.parent.filterSettings.itemsCount));
            }
            if (this.infiniteRenderMod) {
                (_c = this.infiniteLoadedElem).push.apply(_c, [].slice.call(cBoxes.children));
                this.itemsCnt = nullCounter !== -1 ? this.infiniteLoadedElem.length - nullCounter : this.infiniteLoadedElem.length;
            }
            if (this.infiniteUnloadParentExistPred.length && (this.infiniteLoadedElem.length >= this.infiniteDataCount
                || !this.options.parentCurrentViewDataCount || (this.options.parentTotalDataCount === this.infiniteDataCount
                && this.options.parentCurrentViewDataCount))) {
                this.infiniteUnloadParentExistPred = [];
            }
            appendChildren(this.cBox, [].slice.call(cBoxes.children));
            if (this.infiniteRenderMod && !this.infiniteScrollAppendDiff) {
                this.infiniteScrollAppendDiff = Math.round(scrollTop - this.cBox.scrollTop);
            }
            this.updateIndeterminatenBtn();
            if (!this.infiniteRenderMod) {
                if (btn) {
                    btn.disabled = false;
                }
                disabled = false;
            }
            else {
                if (btn && btn.disabled) {
                    disabled = true;
                }
                else {
                    disabled = false;
                }
            }
        }
        else {
            cBoxes.appendChild(this.parent.createElement('span', { innerHTML: this.getLocalizedLabel('NoResult') }));
            this.cBox.innerHTML = '';
            if (this.infiniteRenderMod) {
                var selectAll = this.sBox.querySelector('.e-ftrchk .e-selectall');
                if (selectAll) {
                    var selectAllParent = selectAll.parentElement.parentElement;
                    if (selectAll.classList.contains('e-check')) {
                        toogleCheckbox(selectAllParent);
                    }
                    else if (selectAll.classList.contains('e-stop')) {
                        toogleCheckbox(selectAllParent);
                        selectAll.classList.remove('e-stop');
                        toogleCheckbox(selectAllParent);
                    }
                    selectAll.previousSibling.disabled = true;
                    selectAll.parentElement.classList.add('e-checkbox-disabled');
                }
                var addCurrSelection = this.sBox.querySelector('.e-ftrchk .e-add-current');
                if (addCurrSelection) {
                    var addCurrSelectionParent = addCurrSelection.parentElement.parentElement;
                    if (addCurrSelection.classList.contains('e-check')) {
                        toogleCheckbox(addCurrSelectionParent);
                    }
                    addCurrSelection.previousSibling.disabled = true;
                    addCurrSelection.parentElement.classList.add('e-checkbox-disabled');
                }
            }
            this.cBox.appendChild(this.parent.createElement('div', { className: 'e-checkfltrnmdiv' }));
            appendChildren(this.cBox.children[0], [].slice.call(cBoxes.children));
            if (btn) {
                btn.disabled = true;
            }
            disabled = true;
            this.filterState = !disabled;
        }
        if (btn && data.length) {
            this.filterState = !btn.disabled;
            btn.dataBind();
        }
        var args = { requestType: events.filterChoiceRequest, dataSource: this.renderEmpty ? [] : data };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        this.parent.notify(events.cBoxFltrComplete, args);
        this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: disabled });
        if (this.infiniteRenderMod && this.infiniteInitialLoad) {
            this.cBox.style.marginTop = '0px';
        }
        hideSpinner(this.spinner);
    };
    CheckBoxFilterBase.prototype.updateInfiniteUnLoadedCheckboxExistPred = function (value, updatePredArr) {
        for (var j = 0; j < updatePredArr.length; j++) {
            var pred = updatePredArr[j];
            var predValue = pred.value instanceof Date ?
                this.valueFormatter.toView(pred.value, this.options.formatFn) : pred.value;
            var column = this.options.column;
            if (column.isForeignColumn()) {
                var foreignDataObj = getForeignData(column, {}, predValue, this.foreignKeyData)[0];
                value = getValue(column.foreignKeyField, foreignDataObj);
            }
            if (value === predValue && (pred.operator === 'equal' || pred.operator === 'notequal')) {
                this.infiniteManualSelectMaintainPred.push(updatePredArr[j]);
                updatePredArr.splice(j, 1);
                j--;
            }
        }
    };
    CheckBoxFilterBase.prototype.getCheckedState = function (isColFiltered, value) {
        if (!this.isFiltered || !isColFiltered) {
            return true;
        }
        else {
            var checkState = this.sInput.value ? true : this.result["" + value];
            if (this.infiniteRenderMod) {
                return checkState;
            }
            else {
                return this.options.operator === 'notequal' ? !checkState : checkState;
            }
        }
    };
    CheckBoxFilterBase.getDistinct = function (json, field, column, foreignKeyData, checkboxFilter) {
        var len = json.length;
        var result = [];
        var value;
        var ejValue = 'ejValue';
        var lookup = {};
        var isForeignKey = column && column.isForeignColumn ? column.isForeignColumn() : false;
        while (len--) {
            value = json[parseInt(len.toString(), 10)];
            if (column && column.type === 'dateonly' && typeof value["" + field] === 'string' && value["" + field]) {
                var arr = value["" + field].split(/[^0-9.]/);
                value["" + field] = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
            }
            value = getObject(field, value); //local remote diff, check with mdu
            var currentFilterValue = (typeof value === 'string') && !(isNullOrUndefined(checkboxFilter)) &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !(isNullOrUndefined(checkboxFilter.parent)) && !(isNullOrUndefined(checkboxFilter.parent.filterSettings)) &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !(isNullOrUndefined(checkboxFilter.parent.filterSettings.enableCaseSensitivity)) ? value.toLowerCase() : value;
            if (!(currentFilterValue in lookup)) {
                var obj = {};
                obj["" + ejValue] = value;
                lookup["" + currentFilterValue] = true;
                if (isForeignKey) {
                    var foreignDataObj = getForeignData(column, {}, value, foreignKeyData)[0];
                    setValue(events.foreignKeyData, foreignDataObj, json[parseInt(len.toString(), 10)]);
                    value = getValue(column.foreignKeyValue, foreignDataObj);
                }
                setValue(field, isNullOrUndefined(value) ? null : value, obj);
                setValue('dataObj', json[parseInt(len.toString(), 10)], obj);
                result.push(obj);
            }
        }
        return DataUtil.group(DataUtil.sort(result, field, DataUtil.fnAscending), 'ejValue');
    };
    CheckBoxFilterBase.getPredicate = function (columns, isExecuteLocal) {
        var cols = DataUtil.distinct(columns, 'field', true) || [];
        var collection = [];
        var pred = {};
        for (var i = 0; i < cols.length; i++) {
            collection = new DataManager(columns).executeLocal(new Query().where('field', 'equal', cols[parseInt(i.toString(), 10)].field));
            if (collection.length !== 0) {
                pred[cols[parseInt(i.toString(), 10)].field] = CheckBoxFilterBase.generatePredicate(collection, isExecuteLocal);
            }
        }
        return pred;
    };
    CheckBoxFilterBase.generatePredicate = function (cols, isExecuteLocal) {
        var len = cols ? cols.length : 0;
        var predicate;
        var operate = 'or';
        var first = CheckBoxFilterBase.updateDateFilter(cols[0]);
        first.ignoreAccent = !isNullOrUndefined(first.ignoreAccent) ? first.ignoreAccent : false;
        if (first.type === 'date' || first.type === 'datetime' || first.type === 'dateonly') {
            predicate = getDatePredicate(first, first.type, isExecuteLocal);
        }
        else {
            predicate = first.ejpredicate ? first.ejpredicate :
                new Predicate(first.field, first.operator, first.value, !CheckBoxFilterBase.getCaseValue(first), first.ignoreAccent);
        }
        for (var p = 1; p < len; p++) {
            cols[parseInt(p.toString(), 10)] = CheckBoxFilterBase.updateDateFilter(cols[parseInt(p.toString(), 10)]);
            if (len > 2 && p > 1 && ((cols[p].predicate === 'or' && cols[p - 1].predicate === 'or')
                || (cols[p].predicate === 'and' && cols[p - 1].predicate === 'and'))) {
                if (cols[p].type === 'date' || cols[p].type === 'datetime' || cols[p].type === 'dateonly') {
                    predicate.predicates.push(getDatePredicate(cols[parseInt(p.toString(), 10)], cols[p].type, isExecuteLocal));
                }
                else {
                    predicate.predicates.push(new Predicate(cols[p].field, cols[parseInt(p.toString(), 10)].operator, cols[parseInt(p.toString(), 10)].value, !CheckBoxFilterBase.getCaseValue(cols[parseInt(p.toString(), 10)]), cols[parseInt(p.toString(), 10)].ignoreAccent));
                }
            }
            else {
                if (cols[p].type === 'date' || cols[p].type === 'datetime' || cols[p].type === 'dateonly') {
                    if (cols[parseInt(p.toString(), 10)].predicate === 'and' && cols[parseInt(p.toString(), 10)].operator === 'equal') {
                        predicate = predicate["" + operate](getDatePredicate(cols[parseInt(p.toString(), 10)], cols[parseInt(p.toString(), 10)].type, isExecuteLocal), cols[parseInt(p.toString(), 10)].type, cols[parseInt(p.toString(), 10)].ignoreAccent);
                    }
                    else {
                        predicate = predicate[(cols[parseInt(p.toString(), 10)].predicate)](getDatePredicate(cols[parseInt(p.toString(), 10)], cols[parseInt(p.toString(), 10)].type, isExecuteLocal), cols[parseInt(p.toString(), 10)].type, cols[parseInt(p.toString(), 10)].ignoreAccent);
                    }
                }
                else {
                    predicate = cols[parseInt(p.toString(), 10)].ejpredicate ?
                        predicate[cols[parseInt(p.toString(), 10)]
                            .predicate](cols[parseInt(p.toString(), 10)].ejpredicate) :
                        predicate[(cols[parseInt(p.toString(), 10)].predicate)](cols[parseInt(p.toString(), 10)].field, cols[parseInt(p.toString(), 10)].operator, cols[parseInt(p.toString(), 10)].value, !CheckBoxFilterBase.getCaseValue(cols[parseInt(p.toString(), 10)]), cols[parseInt(p.toString(), 10)].ignoreAccent);
                }
            }
        }
        return predicate || null;
    };
    CheckBoxFilterBase.getCaseValue = function (filter) {
        if (isNullOrUndefined(filter.matchCase)) {
            if (filter.type === 'string' || isNullOrUndefined(filter.type) && typeof (filter.value) === 'string') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return filter.matchCase;
        }
    };
    CheckBoxFilterBase.updateDateFilter = function (filter) {
        if ((filter.type === 'date' || filter.type === 'datetime' || filter.type === 'dateonly' || filter.value instanceof Date)) {
            filter.type = filter.type || 'date';
        }
        return filter;
    };
    return CheckBoxFilterBase;
}());
export { CheckBoxFilterBase };
