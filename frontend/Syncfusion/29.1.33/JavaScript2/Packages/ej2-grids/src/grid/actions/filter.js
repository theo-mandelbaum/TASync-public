import { EventHandler, isNullOrUndefined, extend, closest, getValue } from '@syncfusion/ej2-base';
import { getActualPropFromColl, isActionPrevent, getColumnByForeignKeyValue } from '../base/util';
import { remove, matches } from '@syncfusion/ej2-base';
import { DataUtil, Query, DataManager } from '@syncfusion/ej2-data';
import * as events from '../base/constant';
import { CellType, ResponsiveDialogAction } from '../base/enum';
import { RowRenderer } from '../renderer/row-renderer';
import { Cell } from '../models/cell';
import { Row } from '../models/row';
import { FilterCellRenderer } from '../renderer/filter-cell-renderer';
import { parentsUntil, addFixedColumnBorder, applyStickyLeftRightPosition } from '../base/util';
import { FilterMenuRenderer } from '../renderer/filter-menu-renderer';
import { CheckBoxFilter } from '../actions/checkbox-filter';
import { ExcelFilter } from '../actions/excel-filter';
import * as literals from '../base/string-literals';
import { Input } from '@syncfusion/ej2-inputs';
/**
 *
 * The `Filter` module is used to handle filtering action.
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor for Grid filtering module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {FilterSettings} filterSettings - specifies the filterSettings
     * @param {ServiceLocator} serviceLocator - specifes the serviceLocator
     * @hidden
     */
    function Filter(parent, filterSettings, serviceLocator) {
        this.predicate = 'and';
        this.contentRefresh = true;
        this.filterByMethod = true;
        this.refresh = true;
        this.values = {};
        this.operators = {};
        this.cellText = {};
        this.nextFlMenuOpen = '';
        this.type = { 'Menu': FilterMenuRenderer, 'CheckBox': CheckBoxFilter, 'Excel': ExcelFilter };
        /** @hidden */
        this.filterOperators = {
            contains: 'contains', endsWith: 'endswith', equal: 'equal', greaterThan: 'greaterthan', greaterThanOrEqual: 'greaterthanorequal',
            lessThan: 'lessthan', lessThanOrEqual: 'lessthanorequal', notEqual: 'notequal', startsWith: 'startswith', wildCard: 'wildcard',
            isNull: 'isnull', notNull: 'notnull', like: 'like'
        };
        this.fltrDlgDetails = { field: '', isOpen: false };
        /** @hidden */
        this.skipNumberInput = ['=', ' ', '!'];
        this.skipStringInput = ['>', '<', '='];
        this.actualPredicate = {};
        /** @hidden */
        this.inputList = [];
        this.parent = parent;
        this.filterSettings = filterSettings;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
        this.setFullScreenDialog();
    }
    /**
     * To render filter bar when filtering enabled.
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Filter.prototype.render = function (e) {
        if (DataUtil.getObject('args.isFrozen', e)) {
            return;
        }
        var gObj = this.parent;
        this.l10n = this.serviceLocator.getService('localization');
        this.getLocalizedCustomOperators();
        if (this.parent.filterSettings.type === 'FilterBar') {
            if (gObj.columns.length) {
                var fltrElem = this.parent.element.querySelector('.e-filterbar');
                if (fltrElem) {
                    remove(fltrElem);
                }
                var rowRenderer = new RowRenderer(this.serviceLocator, CellType.Filter, gObj);
                var cellrender = this.serviceLocator.getService('cellRendererFactory');
                cellrender.addCellRenderer(CellType.Filter, new FilterCellRenderer(this.parent, this.serviceLocator));
                this.valueFormatter = this.serviceLocator.getService('valueFormatter');
                rowRenderer.element = this.parent.createElement('tr', { className: 'e-filterbar', attrs: { role: 'row' } });
                var row = this.generateRow();
                row.data = this.values;
                this.parent.getHeaderContent().querySelector('thead:not(.e-masked-thead)').appendChild(rowRenderer.element);
                var rowdrag = this.parent.element.querySelector('.e-rowdragheader');
                this.element = rowRenderer.render(row, gObj.getColumns(), null, null, rowRenderer.element);
                if (this.element.querySelectorAll('.e-leftfreeze').length &&
                    (this.element.querySelectorAll('.e-indentcell').length || this.element.querySelectorAll('.e-grouptopleftcell').length)) {
                    var td = this.element.querySelectorAll('.e-indentcell, .e-grouptopleftcell');
                    for (var i = 0; i < td.length; i++) {
                        td[parseInt(i.toString(), 10)].classList.add('e-leftfreeze');
                        applyStickyLeftRightPosition(td[parseInt(i.toString(), 10)], i * 30, this.parent.enableRtl, 'Left');
                    }
                }
                addFixedColumnBorder(this.element);
                var detail = this.element.querySelector('.e-detailheadercell');
                if (detail) {
                    detail.className = 'e-filterbarcell e-mastercell';
                }
                if (rowdrag) {
                    if (rowdrag.classList.contains('e-leftfreeze')) {
                        rowdrag.className = 'e-dragheadercell e-mastercell e-leftfreeze';
                    }
                    else {
                        rowdrag.className = 'e-filterbarcell e-mastercell';
                    }
                }
                var gCells = [].slice.call(this.element.getElementsByClassName('e-grouptopleftcell'));
                if (gCells.length) {
                    gCells[gCells.length - 1].classList.add('e-lastgrouptopleftcell');
                }
                this.wireEvents();
                this.parent.notify(events.freezeRender, { case: 'filter' });
            }
        }
    };
    /**
     * To show the responsive custom filter dialog
     *
     * @param {boolean} enable - specifes dialog open
     * @returns {void}
     * @hidden
     */
    Filter.prototype.showCustomFilter = function (enable) {
        this.responsiveDialogRenderer.isCustomDialog = enable;
        this.responsiveDialogRenderer.showResponsiveDialog(this.column);
    };
    Filter.prototype.renderResponsiveChangeAction = function (args) {
        this.responsiveDialogRenderer.action = args.action;
    };
    /**
     * To create the filter module.
     *
     * @param {Column} col - specifies the filtering column name
     * @returns {void}
     * @hidden
     */
    Filter.prototype.setFilterModel = function (col) {
        var type = col.filter.type || this.parent.filterSettings.type;
        this.filterModule = new this.type["" + type](this.parent, this.parent.filterSettings, this.serviceLocator, this.customOperators, this);
    };
    /**
     * To destroy the filter bar.
     *
     * @returns {void}
     * @hidden
     */
    Filter.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement || (!gridElement.querySelector('.' + literals.gridHeader) && !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        if (this.filterModule) {
            this.filterModule.destroy();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.parent.refreshing && (this.parent.isDestroyed || !this.parent.allowFiltering)) {
            this.filterSettings.columns = [];
        }
        this.updateFilterMsg();
        this.removeEventListener();
        this.unWireEvents();
        if (this.filterSettings.type === 'FilterBar' && !this.parent.isDestroyed) {
            if (this.filterSettings.showFilterBarOperator) {
                var dropdownlist = [].slice.call(this.element.getElementsByClassName('e-filterbaroperator'));
                for (var i = 0; i < dropdownlist.length; i++) {
                    if (dropdownlist[parseInt(i.toString(), 10)].ej2_instances[0]) {
                        dropdownlist[parseInt(i.toString(), 10)].ej2_instances[0].destroy();
                    }
                }
            }
            this.parent.getColumns().map(function (column) {
                if (column.filterBarTemplate && !isNullOrUndefined(column.filterBarTemplate.destroy)) {
                    var destroyFn = column.filterBarTemplate.destroy;
                    if (typeof destroyFn === 'string') {
                        destroyFn = getValue(destroyFn, window);
                    }
                    destroyFn();
                }
            });
        }
        if (this.element) {
            if (this.element.parentElement) {
                for (var i = 0; i < this.inputList.length; i++) {
                    Input.destroy(this.inputList[parseInt(i.toString(), 10)], this.inputList[parseInt(i.toString(), 10)].element.nextElementSibling);
                    remove(this.inputList[parseInt(i.toString(), 10)].element);
                }
                this.inputList = [];
                remove(this.element);
                this.element = null;
            }
            var filterBarElement = this.parent.getHeaderContent().querySelector('.e-filterbar');
            if (filterBarElement) {
                remove(filterBarElement);
            }
        }
    };
    Filter.prototype.setFullScreenDialog = function () {
        if (this.serviceLocator) {
            this.serviceLocator.registerAdaptiveService(this, this.parent.enableAdaptiveUI, ResponsiveDialogAction.isFilter);
        }
    };
    Filter.prototype.generateRow = function () {
        var options = {};
        var row = new Row(options);
        row.cells = this.generateCells();
        return row;
    };
    Filter.prototype.generateCells = function () {
        //TODO: generate dummy column for group, detail, stacked row here for filtering;
        var cells = [];
        if (this.parent.allowGrouping) {
            for (var c = 0, len = this.parent.groupSettings.columns.length; c < len; c++) {
                cells.push(this.generateCell({}, CellType.HeaderIndent));
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            cells.push(this.generateCell({}, CellType.DetailHeader));
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() !== 'Right') {
            cells.push(this.generateCell({}, CellType.RowDragHIcon));
        }
        for (var _i = 0, _a = this.parent.getColumns(); _i < _a.length; _i++) {
            var dummy = _a[_i];
            cells.push(this.generateCell(dummy));
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() === 'Right') {
            cells.push(this.generateCell({}, CellType.RowDragHIcon));
        }
        return cells;
    };
    Filter.prototype.generateCell = function (column, cellType) {
        var opt = {
            'visible': column.visible,
            'isDataCell': false,
            'rowId': '',
            'column': column,
            'cellType': cellType ? cellType : CellType.Filter,
            'attributes': { title: this.l10n.getConstant('FilterbarTitle') }
        };
        return new Cell(opt);
    };
    /**
     * To update filterSettings when applying filter.
     *
     * @returns {void}
     * @hidden
     */
    Filter.prototype.updateModel = function () {
        var col = this.column.isForeignColumn() ? this.parent.getColumnByUid(this.column.uid) :
            this.parent.getColumnByField(this.fieldName);
        this.filterObjIndex = this.getFilteredColsIndexByField(col);
        this.prevFilterObject = this.filterSettings.columns[this.filterObjIndex];
        var arrayVal = Array.isArray(this.value) && this.value.length ? this.value : [this.value];
        var moduleName = this.parent.dataSource.adaptor && this.parent.dataSource.adaptor.getModuleName ? this.parent.dataSource.adaptor.getModuleName() : undefined;
        for (var i = 0, len = arrayVal.length; i < len; i++) {
            var field = col.isForeignColumn() ? col.foreignKeyValue : this.fieldName;
            var isMenuNotEqual = this.operator === 'notequal';
            if (this.operator === 'in' || this.operator === 'notin') {
                if (this.parent.getDataModule().isRemote() && (col.type === 'date' || col.type === 'dateonly' || col.type === 'datetime')) {
                    arrayVal = DataUtil.parse.arrayReplacer(arrayVal);
                }
                this.currentFilterObject = {
                    field: field, uid: col.uid, isForeignKey: col.isForeignColumn(), operator: this.operator,
                    value: arrayVal, predicate: this.predicate,
                    matchCase: this.matchCase, ignoreAccent: this.ignoreAccent, actualFilterValue: {}, actualOperator: {}
                };
                len = 0;
            }
            else {
                this.currentFilterObject = {
                    field: field, uid: col.uid, isForeignKey: col.isForeignColumn(), operator: this.operator,
                    value: arrayVal[parseInt(i.toString(), 10)], predicate: this.predicate,
                    matchCase: this.matchCase, ignoreAccent: this.ignoreAccent, actualFilterValue: {}, actualOperator: {}
                };
            }
            var index = this.getFilteredColsIndexByField(col);
            if (index > -1 && (!Array.isArray(this.value) || (Array.isArray(this.value) && (this.operator === 'in' || this.operator === 'notin')))) {
                this.filterSettings.columns[parseInt(index.toString(), 10)] = this.currentFilterObject;
            }
            else {
                this.filterSettings.columns.push(this.currentFilterObject);
            }
            if (!this.column.isForeignColumn() && isNullOrUndefined(this.value) && (this.operator === 'equal' ||
                this.operator === 'notequal') && (moduleName !== 'ODataAdaptor' && moduleName !== 'ODataV4Adaptor')) {
                for (var i_1 = 0; i_1 < this.filterSettings.columns.length; i_1++) {
                    if (this.filterSettings.columns["" + i_1].field === field &&
                        (this.filterSettings.columns["" + i_1].operator === 'equal' || this.filterSettings.columns["" + i_1].operator === 'notequal')
                        && isNullOrUndefined(this.filterSettings.columns["" + i_1].value)) {
                        this.filterSettings.columns.splice(i_1, 1);
                        i_1 = i_1 - 1;
                    }
                }
                if (col.type === 'string') {
                    this.filterSettings.columns.push({
                        field: field, ignoreAccent: this.ignoreAccent, matchCase: this.matchCase,
                        operator: this.operator, predicate: isMenuNotEqual ? 'and' : 'or', value: ''
                    });
                }
                this.filterSettings.columns.push({
                    field: field, ignoreAccent: this.ignoreAccent, matchCase: this.matchCase,
                    operator: this.operator, predicate: isMenuNotEqual ? 'and' : 'or', value: undefined
                });
                this.filterSettings.columns.push({
                    field: field, ignoreAccent: this.ignoreAccent, matchCase: this.matchCase,
                    operator: this.operator, predicate: isMenuNotEqual ? 'and' : 'or', value: null
                });
            }
        }
        // eslint-disable-next-line no-self-assign
        this.filterSettings.columns = this.filterSettings.columns;
        this.parent.dataBind();
    };
    Filter.prototype.getFilteredColsIndexByField = function (col) {
        var cols = this.filterSettings.columns;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[parseInt(i.toString(), 10)].uid === col.uid || (col.isForeignColumn()
                && this.parent.getColumnByUid(col.uid).field === col.foreignKeyValue)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * To trigger action complete event.
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Filter.prototype.onActionComplete = function (e) {
        var args = !this.isRemove ? {
            currentFilterObject: this.currentFilterObject,
            /* tslint:disable:no-string-literal */
            currentFilteringColumn: !isNullOrUndefined(this.column) ? this.column.field : undefined,
            /* tslint:enable:no-string-literal */
            columns: this.filterSettings.columns, requestType: 'filtering', type: events.actionComplete
        } : {
            requestType: 'filtering', type: events.actionComplete
        };
        this.parent.trigger(events.actionComplete, extend(e, args));
        this.isRemove = false;
    };
    Filter.prototype.wireEvents = function () {
        EventHandler.add(this.parent.getHeaderContent(), 'keyup', this.keyUpHandlerImmediate, this);
    };
    Filter.prototype.unWireEvents = function () {
        EventHandler.remove(this.parent.getHeaderContent(), 'keyup', this.keyUpHandlerImmediate);
    };
    Filter.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.parent.getHeaderTable().classList.add('e-sortfilter');
            this.render();
        }
    };
    Filter.prototype.refreshFilterValue = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!isNullOrUndefined(this.parent.modelObserver.boundedEvents)) {
            this.parent.removeEventListener(events.beforeDataBound, this.refreshFilterValueFn);
        }
        if ((this.filterSettings.type === 'FilterBar' || this.filterSettings.type === 'Excel') && this.filterSettings.columns.length &&
            !this.parent.getCurrentViewRecords().length) {
            this.initialEnd();
        }
    };
    Filter.prototype.initialEnd = function () {
        this.parent.off(events.contentReady, this.initialEnd);
        if (this.parent.getColumns().length && this.filterSettings.columns.length) {
            var gObj = this.parent;
            this.contentRefresh = false;
            this.initialLoad = true;
            for (var _i = 0, _a = gObj.filterSettings.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                this.filterByColumn(col.field, col.operator, col.value, col.predicate, col.matchCase, col.ignoreAccent, col.actualFilterValue, col.actualOperator, col.isForeignKey);
            }
            this.initialLoad = false;
            this.updateFilterMsg();
            this.contentRefresh = true;
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Filter.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.setFullScreenDialog, this.setFullScreenDialog, this);
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
        this.parent.on(events.filterComplete, this.onActionComplete, this);
        this.parent.on(events.inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(events.keyPressed, this.keyUpHandler, this);
        this.parent.on(events.columnPositionChanged, this.columnPositionChanged, this);
        this.parent.on(events.headerRefreshed, this.render, this);
        this.parent.on(events.contentReady, this.initialEnd, this);
        this.parent.on(events.filterMenuClose, this.filterMenuClose, this);
        this.parent.on(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction, this);
        this.docClickHandler = this.clickHandler.bind(this);
        EventHandler.add(document, 'click', this.docClickHandler, this);
        EventHandler.add(this.parent.element, 'mousedown', this.refreshClearIcon, this);
        this.parent.on(events.filterOpen, this.columnMenuFilter, this);
        this.parent.on(events.click, this.filterIconClickHandler, this);
        this.parent.on('persist-data-changed', this.initialEnd, this);
        this.parent.on(events.closeFilterDialog, this.clickHandler, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.refreshFilterValueFn = this.refreshFilterValue.bind(this);
        this.parent.addEventListener(events.beforeDataBound, this.refreshFilterValueFn);
    };
    /**
     * @returns {void}
     * @hidden
     */
    Filter.prototype.removeEventListener = function () {
        EventHandler.remove(document, 'click', this.docClickHandler);
        EventHandler.remove(this.parent.element, 'mousedown', this.refreshClearIcon);
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
        this.parent.off(events.uiUpdate, this.enableAfterRender);
        this.parent.off(events.filterComplete, this.onActionComplete);
        this.parent.off(events.inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(events.keyPressed, this.keyUpHandler);
        this.parent.off(events.columnPositionChanged, this.columnPositionChanged);
        this.parent.off(events.headerRefreshed, this.render);
        this.parent.off(events.filterOpen, this.columnMenuFilter);
        this.parent.off(events.filterMenuClose, this.filterMenuClose);
        this.parent.off(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction);
        this.parent.off(events.click, this.filterIconClickHandler);
        this.parent.off(events.closeFilterDialog, this.clickHandler);
        this.parent.off(events.destroy, this.destroy);
    };
    Filter.prototype.refreshClearIcon = function (e) {
        if (this.parent.allowFiltering && this.parent.filterSettings.type === 'FilterBar' &&
            e.target.closest('th') && e.target.closest('th').classList.contains('e-filterbarcell') &&
            e.target.classList.contains('e-clear-icon')) {
            var targetText = e.target.previousElementSibling;
            Input.setValue(null, targetText, 'Never', true);
            if (this.filterSettings.mode === 'Immediate') {
                this.removeFilteredColsByField(targetText.id.slice(0, -14)); //Length of _filterBarcell = 14
            }
        }
    };
    Filter.prototype.filterMenuClose = function () {
        this.fltrDlgDetails.isOpen = false;
    };
    /**
     * Filters the Grid row by fieldName, filterOperator, and filterValue.
     *
     * @param  {string} fieldName - Defines the field name of the filter column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value which is used to filter records.
     * @param  {string} predicate - Defines the relationship of one filter query with another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, then the filter records
     * the exact match or <br> filters records that are case insensitive (uppercase and lowercase letters treated the same).
     * @param {boolean} ignoreAccent - If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @param  {boolean} isForeignColumn - Defines whether it is a foreign key column.
     * @returns {void}
     */
    Filter.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator, isForeignColumn) {
        var _this = this;
        var gObj = this.parent;
        var filterCell;
        if (typeof filterValue === 'string') {
            filterValue = this.parent.sanitize(filterValue);
        }
        this.column = gObj.grabColumnByFieldFromAllCols(fieldName, isForeignColumn);
        if (this.filterSettings.type === 'FilterBar' && this.filterSettings.showFilterBarOperator
            && isNullOrUndefined(this.column.filterBarTemplate) && isNullOrUndefined(this.column.filterTemplate)) {
            filterOperator = this.getOperatorName(fieldName);
        }
        if (filterOperator === 'like' && filterValue && filterValue.indexOf('%') === -1) {
            filterValue = '%' + filterValue + '%';
        }
        if (!this.column) {
            return;
        }
        if (this.filterSettings.type === 'FilterBar') {
            filterCell = gObj.getHeaderContent().querySelector('[id=\'' + this.column.field + '_filterBarcell\']');
        }
        if (!isNullOrUndefined(this.column.allowFiltering) && !this.column.allowFiltering) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), columnName: this.column.headerText });
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, {
                instance: this, handler: this.filterByColumn, arg1: fieldName, arg2: filterOperator, arg3: filterValue, arg4: predicate,
                arg5: matchCase, arg6: ignoreAccent, arg7: actualFilterValue, arg8: actualOperator
            });
            return;
        }
        this.predicate = predicate ? predicate : Array.isArray(filterValue) ? 'or' : 'and';
        this.value = filterValue;
        this.matchCase = matchCase || false;
        this.ignoreAccent = this.ignoreAccent = !isNullOrUndefined(ignoreAccent) ? ignoreAccent : this.parent.filterSettings.ignoreAccent;
        this.fieldName = fieldName;
        this.operator = filterOperator;
        filterValue = !isNullOrUndefined(filterValue) ? filterValue.toString() : filterValue;
        if (filterValue === '') {
            filterValue = null;
        }
        if (this.column.type === 'number' || this.column.type === 'date') {
            this.matchCase = true;
        }
        if (filterCell && this.filterSettings.type === 'FilterBar') {
            if ((filterValue && filterValue.length < 1) || (!this.filterByMethod &&
                this.checkForSkipInput(this.column, filterValue))) {
                this.filterStatusMsg = (filterValue && filterValue.length < 1) ? '' : this.l10n.getConstant('InvalidFilterMessage');
                this.updateFilterMsg();
                return;
            }
            if (filterCell.value !== filterValue) {
                filterCell.value = filterValue;
            }
        }
        if (!isNullOrUndefined(this.column.format)) {
            this.applyColumnFormat(filterValue);
            if (this.initialLoad && this.filterSettings.type === 'FilterBar') {
                filterCell.value = this.values[this.column.field];
            }
        }
        else {
            this.values[this.column.field] = filterValue; //this line should be above updateModel
        }
        var predObj = {
            field: this.fieldName,
            predicate: predicate,
            matchCase: matchCase,
            ignoreAccent: ignoreAccent,
            operator: this.operator,
            value: this.value,
            type: this.column.type
        };
        var filterColumn = this.parent.filterSettings.columns.filter(function (fColumn) {
            return (fColumn.field === _this.fieldName);
        });
        if (filterColumn.length > 1 && !isNullOrUndefined(this.actualPredicate[this.fieldName])) {
            this.actualPredicate[this.fieldName].push(predObj);
        }
        else {
            this.actualPredicate[this.fieldName] = [predObj];
        }
        if (this.checkAlreadyColFiltered(this.column.field)) {
            return;
        }
        this.updateModel();
    };
    Filter.prototype.applyColumnFormat = function (filterValue) {
        var _this = this;
        var getFlvalue = (this.column.type === 'date' || this.column.type === 'datetime' || this.column.type === 'dateonly') ?
            new Date(filterValue) : parseFloat(filterValue);
        if ((this.column.type === 'date' || this.column.type === 'datetime' || this.column.type === 'dateonly') && filterValue &&
            Array.isArray(this.value) && filterValue.split(',').length > 1) {
            this.values[this.column.field] = ((filterValue).split(',')).map(function (val) {
                if (val === '') {
                    val = null;
                }
                return _this.setFormatForFlColumn(new Date(val), _this.column);
            });
        }
        else {
            this.values[this.column.field] = this.setFormatForFlColumn(getFlvalue, this.column);
        }
    };
    // To skip the second time request to server while applying initial filtering - EJ2-44361
    Filter.prototype.skipUid = function (col) {
        var flag = true;
        var colLen = Object.keys((col));
        for (var i = 0; i < colLen.length; i++) {
            var key = Object.keys(col[colLen[parseInt(i.toString(), 10)]]);
            if (key.length === 1 && key[0] === 'uid') {
                flag = false;
            }
        }
        return flag;
    };
    Filter.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'columns':
                    // eslint-disable-next-line no-case-declarations
                    var col = 'columns';
                    // eslint-disable-next-line no-case-declarations
                    var args = {
                        currentFilterObject: this.currentFilterObject, currentFilteringColumn: this.column ?
                            this.column.field : undefined, action: 'filter', columns: this.filterSettings.columns,
                        requestType: 'filtering', type: events.actionBegin, cancel: false
                    };
                    if (this.contentRefresh && this.skipUid(e.properties["" + col])) {
                        this.parent.notify(events.modelChanged, args);
                        if (args.cancel) {
                            if ((this.filterSettings.type === 'CheckBox' || this.filterSettings.type === 'Excel')) {
                                this.filterSettings.columns = (this.actualData.length <= 1) ? this.checkboxPrevFilterObject :
                                    this.checkboxFilterObject;
                                this.actualPredicate[this.column.field] = this.filterSettings.columns;
                                var col_1 = this.parent.getColumnByField(this.column.field);
                                var iconClass = this.parent.showColumnMenu && col_1.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
                                var filterIconElement = this.parent.getColumnHeaderByField(this.column.field)
                                    .querySelector(iconClass);
                                if (this.checkboxPrevFilterObject.length === 0) {
                                    filterIconElement.classList.remove('e-filtered');
                                }
                                else {
                                    filterIconElement.classList.add('e-filtered');
                                }
                            }
                            else {
                                if (isNullOrUndefined(this.prevFilterObject)) {
                                    this.filterSettings.columns.splice(this.filterSettings.columns.length - 1, 1);
                                }
                                else {
                                    this.filterSettings.columns[this.filterObjIndex] = this.prevFilterObject;
                                }
                            }
                            return;
                        }
                        this.updateFilterIcon();
                        this.refreshFilterSettings();
                        this.updateFilterMsg();
                        this.updateFilter();
                    }
                    break;
                case 'showFilterBarStatus':
                    if (e.properties["" + prop]) {
                        this.updateFilterMsg();
                    }
                    else if (this.parent.allowPaging) {
                        this.parent.updateExternalMessage('');
                    }
                    break;
                case 'showFilterBarOperator':
                case 'type':
                    this.parent.refreshHeader();
                    this.refreshFilterSettings();
                    if (this.parent.height === '100%') {
                        this.parent.scrollModule.refresh();
                    }
                    break;
            }
        }
    };
    Filter.prototype.refreshFilterSettings = function () {
        if (this.filterSettings.type === 'FilterBar') {
            for (var i = 0; i < this.filterSettings.columns.length; i++) {
                this.column = this.parent.grabColumnByUidFromAllCols(this.filterSettings.columns[parseInt(i.toString(), 10)].uid);
                var filterValue = this.filterSettings.columns[parseInt(i.toString(), 10)].value;
                filterValue = !isNullOrUndefined(filterValue) && filterValue.toString();
                if (!isNullOrUndefined(this.column.format)) {
                    this.applyColumnFormat(filterValue);
                }
                else {
                    var key = this.filterSettings.columns[parseInt(i.toString(), 10)].field;
                    this.values["" + key] = this.filterSettings.columns[parseInt(i.toString(), 10)].value;
                }
                var filterElement = this.getFilterBarElement(this.column.field);
                if (filterElement) {
                    if (this.cellText[this.filterSettings.columns[parseInt(i.toString(), 10)].field] !== ''
                        && !isNullOrUndefined(this.cellText[this.filterSettings.columns[parseInt(i.toString(), 10)].field])) {
                        filterElement.value = this.cellText[this.column.field];
                    }
                    else {
                        filterElement.value = this.filterSettings.columns[parseInt(i.toString(), 10)].value;
                    }
                }
            }
            if (this.filterSettings.columns.length === 0) {
                var col = this.parent.getColumns();
                for (var i = 0; i < col.length; i++) {
                    var filterElement = this.getFilterBarElement(col[parseInt(i.toString(), 10)].field);
                    if (filterElement && filterElement.value !== '') {
                        filterElement.value = '';
                        delete this.values[col[parseInt(i.toString(), 10)].field];
                    }
                }
            }
            var localeText = { isnull: 'IsNull', isnotnull: 'NotNull', isnotempty: 'IsNotEmpty', isempty: 'IsEmpty' };
            if (this.filterSettings.showFilterBarOperator && (this.operator === 'isempty' || this.operator === 'isnotempty' ||
                this.operator === 'isnotnull' || this.operator === 'isnull')) {
                var filterElement = this.getFilterBarElement(this.column.field);
                filterElement.value = this.l10n.getConstant(localeText[this.operator]);
            }
        }
    };
    Filter.prototype.updateFilterIcon = function () {
        if (this.filterSettings.columns.length === 0 && this.parent.element.querySelector('.e-filtered')) {
            var fltrIconElement = [].slice.call(this.parent.element.getElementsByClassName('e-filtered'));
            for (var i = 0, len = fltrIconElement.length; i < len; i++) {
                fltrIconElement[parseInt(i.toString(), 10)].classList.remove('e-filtered');
            }
        }
    };
    Filter.prototype.getFilterBarElement = function (col) {
        var selector = '[id=\'' + col + '_filterBarcell\']';
        var filterElement;
        if (selector && !isNullOrUndefined(this.element)) {
            filterElement = this.element.querySelector(selector);
        }
        return filterElement;
    };
    /**
     * @private
     * @returns {void}
     */
    Filter.prototype.refreshFilter = function () {
        this.refreshFilterSettings();
        this.updateFilterMsg();
    };
    /**
     * Clears all the filtered rows of the Grid.
     *
     * @param {string[]} fields - returns the fields
     * @returns {void}
     */
    Filter.prototype.clearFiltering = function (fields) {
        var _this = this;
        var cols = getActualPropFromColl(this.filterSettings.columns);
        if (!isNullOrUndefined(fields)) {
            this.refresh = false;
            fields.forEach(function (field) { _this.removeFilteredColsByField(field, false); });
            this.parent.setProperties({ filterSettings: { columns: this.filterSettings.columns } }, true);
            this.parent.renderModule.refresh();
            this.refresh = true;
            return;
        }
        if (isActionPrevent(this.parent)) {
            this.parent.notify(events.preventBatch, { instance: this, handler: this.clearFiltering });
            return;
        }
        for (var i = 0; i < cols.length; i++) {
            cols[parseInt(i.toString(), 10)].uid = cols[parseInt(i.toString(), 10)].uid
                || this.parent.getColumnByField(cols[parseInt(i.toString(), 10)].field).uid;
        }
        var colUid = cols.map(function (f) { return f.uid; });
        var filteredcols = colUid.filter(function (item, pos) { return colUid.indexOf(item) === pos; });
        this.refresh = false;
        for (var i = 0, len = filteredcols.length; i < len; i++) {
            this.removeFilteredColsByField(this.parent.getColumnByUid(filteredcols[parseInt(i.toString(), 10)]).field, false);
        }
        this.refresh = true;
        if (filteredcols.length) {
            this.parent.renderModule.refresh();
        }
        if (this.parent.filterSettings.columns.length === 0 && this.parent.element.querySelector('.e-filtered')) {
            var fltrElement = [].slice.call(this.parent.element.getElementsByClassName('e-filtered'));
            for (var i = 0, len = fltrElement.length; i < len; i++) {
                fltrElement[0].classList.remove('e-filtered');
            }
        }
        this.isRemove = true;
        this.filterStatusMsg = '';
        this.updateFilterMsg();
    };
    Filter.prototype.checkAlreadyColFiltered = function (field) {
        var columns = this.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            if (col.field === field && this.parent.filterSettings.type === 'Menu' &&
                (col.type === 'date' || col.type === 'datetime')) {
                return (this.checkDateColumnValue(col.value, this.value) &&
                    col.operator === this.operator && col.predicate === this.predicate);
            }
            else if (col.field === field && col.value === this.value &&
                col.operator === this.operator && col.predicate === this.predicate) {
                return true;
            }
        }
        return false;
    };
    Filter.prototype.checkDateColumnValue = function (colDate, filterDate) {
        if (isNullOrUndefined(colDate) && isNullOrUndefined(filterDate)) {
            return true;
        }
        else if (colDate instanceof Date && filterDate instanceof Date) {
            return colDate.getTime() === filterDate.getTime();
        }
        return false;
    };
    Filter.prototype.columnMenuFilter = function (args) {
        this.column = args.col;
        var ele = closest(args.target, '#' + args.id);
        if (args.isClose && !ele) {
            this.filterModule.closeDialog();
        }
        else if (ele) {
            this.filterDialogOpen(this.column, args.target);
        }
    };
    Filter.prototype.filterDialogOpen = function (col, target, left, top) {
        if (this.filterModule) {
            this.filterModule.isresetFocus = false;
            this.filterModule.closeDialog();
        }
        this.setFilterModel(col);
        this.filterModule.openDialog(this.createOptions(col, target, left, top));
    };
    /**
     * Create filter dialog options
     *
     * @param  {Column} col - Filtering column detail.
     * @param  {Element} target -  Filter dialog target.
     * @param  {number} left -  Filter dialog left position.
     * @param  {number} top -  Filter dialog top position.
     * @returns {Object} returns the created dialog options
     * @hidden
     */
    Filter.prototype.createOptions = function (col, target, left, top) {
        var gObj = this.parent;
        var dataSource = col.filter.dataSource || gObj.dataSource && 'result' in gObj.dataSource ? gObj.dataSource :
            gObj.getDataModule().dataManager;
        var type = col.filter.type || this.parent.filterSettings.type;
        var options = {
            type: col.type, field: col.field, displayName: col.headerText,
            dataSource: dataSource, format: col.format, height: 800, columns: gObj.getColumns(),
            filteredColumns: gObj.filterSettings.columns, target: target, dataManager: gObj.getDataModule().dataManager,
            formatFn: col.getFormatter(), ignoreAccent: gObj.filterSettings.ignoreAccent,
            parserFn: col.getParser(), query: gObj.query, template: col.getFilterItemTemplate(),
            hideSearchbox: isNullOrUndefined(col.filter.hideSearchbox) ? false : col.filter.hideSearchbox,
            handler: this.filterHandler.bind(this), localizedStrings: gObj.getLocaleConstants(),
            position: { X: left, Y: top }, column: col, foreignKeyValue: col.foreignKeyValue,
            actualPredicate: this.actualPredicate, localeObj: gObj.localeObj,
            isRemote: gObj.getDataModule().isRemote(), allowCaseSensitive: this.filterSettings.enableCaseSensitivity,
            isResponsiveFilter: this.parent.enableAdaptiveUI,
            operator: this.actualPredicate[col.field] && type === 'Menu' ? this.actualPredicate[col.field][0].operator : 'equal',
            parentTotalDataCount: gObj.getDataModule().isRemote() && gObj.allowPaging ? gObj.pagerModule.pagerObj.totalRecordsCount :
                gObj.getDataModule().isRemote() ? gObj.totalDataRecordsCount : gObj.getFilteredRecords().length,
            parentCurrentViewDataCount: gObj.currentViewData.length,
            parentFilteredLocalRecords: !gObj.getDataModule().isRemote() ? gObj.getFilteredRecords() : []
        };
        return options;
    };
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar - Specifies whether the filter bar value needs to be cleared.
     * @returns {void}
     * @hidden
     */
    Filter.prototype.removeFilteredColsByField = function (field, isClearFilterBar) {
        var fCell;
        var cols = this.filterSettings.columns;
        if (isActionPrevent(this.parent)) {
            var args = { instance: this, handler: this.removeFilteredColsByField, arg1: field, arg2: isClearFilterBar };
            this.parent.notify(events.preventBatch, args);
            return;
        }
        var colUid = cols.map(function (f) { return f.uid; });
        var filteredColsUid = colUid.filter(function (item, pos) { return colUid.indexOf(item) === pos; });
        if (!isNullOrUndefined(this.column)) {
            var col = this.column.isForeignColumn() ? this.parent.getColumnByUid(this.column.uid) :
                this.parent.getColumnByField(field);
            this.filterObjIndex = this.getFilteredColsIndexByField(col);
            this.prevFilterObject = this.filterSettings.columns[this.filterObjIndex];
        }
        var _loop_1 = function (i, len) {
            cols[parseInt(i.toString(), 10)].uid = cols[parseInt(i.toString(), 10)].uid
                || this_1.parent.getColumnByField(cols[parseInt(i.toString(), 10)].field).uid;
            var len_1 = cols.length;
            var column = this_1.parent.grabColumnByUidFromAllCols(filteredColsUid[parseInt(i.toString(), 10)]);
            if (column.field === field || (column.field === column.foreignKeyValue && column.isForeignColumn())) {
                var currentPred = this_1.filterSettings.columns.filter(function (e) {
                    return e.uid === column.uid;
                })[0];
                if (this_1.filterSettings.type === 'FilterBar' && !isClearFilterBar) {
                    var selector = '[id=\'' + column.field + '_filterBarcell\']';
                    fCell = this_1.parent.getHeaderContent().querySelector(selector);
                    if (fCell) {
                        fCell.value = '';
                        delete this_1.values["" + field];
                    }
                }
                while (len_1--) {
                    if (cols[parseInt(len_1.toString(), 10)].uid === column.uid) {
                        cols.splice(len_1, 1);
                    }
                }
                var fltrElement = this_1.parent.getColumnHeaderByField(column.field);
                if (this_1.filterSettings.type !== 'FilterBar' || this_1.parent.showColumnMenu) {
                    var iconClass = this_1.parent.showColumnMenu && column.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
                    fltrElement.querySelector(iconClass).classList.remove('e-filtered');
                }
                this_1.isRemove = true;
                if (this_1.actualPredicate["" + field]) {
                    delete this_1.actualPredicate["" + field];
                }
                if (this_1.values["" + field]) {
                    delete this_1.values["" + field];
                }
                if (this_1.refresh) {
                    this_1.parent.notify(events.modelChanged, {
                        requestType: 'filtering', type: events.actionBegin, currentFilterObject: currentPred,
                        currentFilterColumn: column, action: 'clearFilter'
                    });
                }
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0, len = filteredColsUid.length; i < len; i++) {
            var state_1 = _loop_1(i, len);
            if (state_1 === "break")
                break;
        }
        this.updateFilterMsg();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    Filter.prototype.keyUpHandlerImmediate = function (e) {
        if (e.keyCode !== 13) {
            this.keyUpHandler(e);
        }
    };
    Filter.prototype.keyUpHandler = function (e) {
        var gObj = this.parent;
        var target = e.target;
        if (target && matches(target, '.e-filterbar input')) {
            var closeHeaderEle = closest(target, 'th.e-filterbarcell');
            this.column = gObj.getColumnByUid(closeHeaderEle.getAttribute('e-mappinguid'));
            if (!this.column) {
                return;
            }
            if (e.action === 'altDownArrow' && this.parent.filterSettings.showFilterBarOperator) {
                var dropDownListInput = closest(target, 'span').querySelector('.e-filterbaroperator');
                dropDownListInput.ej2_instances[0].showPopup();
                dropDownListInput.focus();
            }
            if ((this.filterSettings.mode === 'Immediate' || (e.keyCode === 13 &&
                !e.target.classList.contains('e-filterbaroperator')))
                && e.keyCode !== 9 && !this.column.filterTemplate) {
                this.value = target.value.trim();
                this.processFilter(e);
            }
        }
        if (e.action === 'altDownArrow' && this.filterSettings.type !== 'FilterBar' && !parentsUntil(e.target, 'e-toolbar')
            && isNullOrUndefined(this.parent.element.querySelector('.e-filter-popup')) && !this.parent.enableAdaptiveUI) {
            var element = gObj.focusModule.currentInfo.element;
            if (element && element.classList.contains('e-headercell') && !element.classList.contains('e-stackedheadercell')) {
                var column = gObj.getColumnByUid(element.firstElementChild.getAttribute('e-mappinguid'));
                this.openMenuByField(column.field);
                this.parent.focusModule.clearIndicator();
            }
        }
        if (e.action === 'escape' && this.filterSettings.type === 'Menu' && this.filterModule) {
            if (this.parent.showColumnMenu && this.filterModule.isDialogOpen) {
                this.parent.isColumnMenuFilterClosing = true;
            }
            this.filterModule.closeDialog();
            gObj.notify(events.restoreFocus, {});
            if (!this.parent.showColumnMenu) {
                gObj.notify(events.restoreFocus, {});
            }
        }
    };
    Filter.prototype.updateCrossIcon = function (element) {
        if (element.value.length) {
            element.nextElementSibling.classList.remove('e-hide');
        }
    };
    Filter.prototype.updateFilterMsg = function () {
        if (this.filterSettings.type === 'FilterBar') {
            var gObj = this.parent;
            var getFormatFlValue = void 0;
            var columns = this.filterSettings.columns;
            var column = void 0;
            if (!this.filterSettings.showFilterBarStatus) {
                return;
            }
            if (columns.length > 0 && this.filterStatusMsg !== this.l10n.getConstant('InvalidFilterMessage')) {
                this.filterStatusMsg = '';
                for (var index = 0; index < columns.length; index++) {
                    column = gObj.grabColumnByUidFromAllCols(columns[parseInt(index.toString(), 10)].uid)
                        || gObj.grabColumnByFieldFromAllCols(columns[parseInt(index.toString(), 10)]
                            .field, columns[parseInt(index.toString(), 10)].isForeignKey);
                    if (index) {
                        this.filterStatusMsg += ' && ';
                    }
                    if (!isNullOrUndefined(column.format)) {
                        var flValue = (column.type === 'date' || column.type === 'datetime' || column.type === 'dateonly') ?
                            this.valueFormatter.fromView(this.values[column.field], column.getParser(), (column.type === 'dateonly' ? 'date' : column.type)) :
                            this.values[column.field];
                        if (!(column.type === 'date' || column.type === 'datetime' || column.type === 'dateonly')) {
                            var formater = this.serviceLocator.getService('valueFormatter');
                            getFormatFlValue = formater.toView(flValue, column.getParser()).toString();
                        }
                        else {
                            getFormatFlValue = this.setFormatForFlColumn(flValue, column);
                        }
                        this.filterStatusMsg += column.headerText + ': ' + getFormatFlValue;
                    }
                    else {
                        this.filterStatusMsg += column.headerText + ': ' + this.values[column.field];
                    }
                }
            }
            if (gObj.allowPaging) {
                gObj.updateExternalMessage(this.filterStatusMsg);
                if (this.parent.height === '100%') {
                    this.parent.scrollModule.refresh();
                }
            }
            //TODO: virtual paging
            this.filterStatusMsg = '';
        }
    };
    Filter.prototype.setFormatForFlColumn = function (value, column) {
        var formater = this.serviceLocator.getService('valueFormatter');
        return formater.toView(value, column.getFormatter()).toString();
    };
    Filter.prototype.checkForSkipInput = function (column, value) {
        var isSkip;
        if (column.type === 'number') {
            if (DataUtil.operatorSymbols["" + value] || this.skipNumberInput.indexOf(value) > -1) {
                isSkip = true;
            }
        }
        else if (column.type === 'string') {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var val = value_1[_i];
                if (this.skipStringInput.indexOf(val) > -1) {
                    isSkip = true;
                }
            }
        }
        return isSkip;
    };
    Filter.prototype.processFilter = function (e) {
        this.stopTimer();
        this.startTimer(e);
    };
    Filter.prototype.startTimer = function (e) {
        var _this = this;
        this.timer = window.setInterval(function () { _this.onTimerTick(); }, e.keyCode === 13 ? 0 : this.filterSettings.immediateModeDelay);
    };
    Filter.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    Filter.prototype.onTimerTick = function () {
        var selector = '[id=\'' + this.column.field + '_filterBarcell\']';
        var filterElement = this.element.querySelector(selector);
        if (!filterElement) {
            filterElement = this.parent.getHeaderContent().querySelector(selector);
        }
        var filterValue;
        this.cellText[this.column.field] = filterElement.value;
        this.stopTimer();
        if (!isNullOrUndefined(this.column.filterBarTemplate)) {
            var templateRead = this.column.filterBarTemplate.read;
            if (typeof templateRead === 'string') {
                templateRead = getValue(templateRead, window);
            }
            if (!isNullOrUndefined(templateRead)) {
                this.value = templateRead.call(this, filterElement);
            }
        }
        else {
            filterValue = JSON.parse(JSON.stringify(filterElement.value));
        }
        if (isNullOrUndefined(this.value) || this.value === '') {
            this.removeFilteredColsByField(this.column.field);
            return;
        }
        this.validateFilterValue(this.value);
        this.filterByMethod = false;
        this.filterByColumn(this.column.field, this.operator, this.value, this.predicate, this.filterSettings.enableCaseSensitivity, this.ignoreAccent, this.column.isForeignColumn());
        this.filterByMethod = true;
        filterElement.value = filterValue;
        this.updateFilterMsg();
    };
    Filter.prototype.validateFilterValue = function (value) {
        var skipInput;
        var index;
        this.matchCase = this.filterSettings.enableCaseSensitivity;
        switch (this.column.type) {
            case 'number':
                if (this.column.filter.operator) {
                    this.operator = this.column.filter.operator;
                }
                else {
                    this.operator = this.filterOperators.equal;
                }
                skipInput = ['>', '<', '=', '!'];
                for (var i = 0; i < value.length; i++) {
                    if (skipInput.indexOf(value[parseInt(i.toString(), 10)]) > -1) {
                        index = i;
                        break;
                    }
                }
                this.getOperator(value.substring(index));
                if (index !== 0) {
                    this.value = value.substring(0, index);
                }
                if (this.value !== '' && value.length >= 1) {
                    this.value = this.valueFormatter.fromView(this.value, this.column.getParser(), this.column.type);
                }
                if (isNaN(this.value)) {
                    this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                }
                break;
            case 'date':
            case 'datetime':
                this.operator = this.filterOperators.equal;
                if (this.value !== '' && !(this.value instanceof Date)) {
                    this.getOperator(value);
                    this.value = this.valueFormatter.fromView(this.value, this.column.getParser(), this.column.type);
                    if (isNullOrUndefined(this.value)) {
                        this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                    }
                }
                break;
            case 'string':
                this.matchCase = false;
                if (this.column.filter.operator) {
                    this.operator = this.column.filter.operator;
                }
                else {
                    if (value.indexOf('*') !== -1 || value.indexOf('?') !== -1 || value.indexOf('%3f') !== -1) {
                        this.operator = this.filterOperators.wildCard;
                    }
                    else if (value.indexOf('%') !== -1) {
                        this.operator = this.filterOperators.like;
                    }
                    else {
                        this.operator = this.filterOperators.startsWith;
                    }
                }
                break;
            case 'boolean':
                if (value.toLowerCase() === 'true' || value === '1') {
                    this.value = true;
                }
                else if (value.toLowerCase() === 'false' || value === '0') {
                    this.value = false;
                }
                else if (value.length) {
                    this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                }
                this.operator = this.filterOperators.equal;
                break;
            default:
                if (this.column.filter.operator) {
                    this.operator = this.column.filter.operator;
                }
                else {
                    this.operator = this.filterOperators.equal;
                }
        }
    };
    Filter.prototype.getOperator = function (value) {
        var singleOp = value.charAt(0);
        var multipleOp = value.slice(0, 2);
        var operators = extend({ '=': this.filterOperators.equal, '!': this.filterOperators.notEqual }, DataUtil.operatorSymbols);
        // eslint-disable-next-line no-prototype-builtins
        if (operators.hasOwnProperty(singleOp) || operators.hasOwnProperty(multipleOp)) {
            this.operator = operators["" + singleOp];
            this.value = value.substring(1);
            if (!this.operator) {
                this.operator = operators["" + multipleOp];
                this.value = value.substring(2);
            }
        }
        if (this.operator === this.filterOperators.lessThan || this.operator === this.filterOperators.greaterThan) {
            if (this.value.charAt(0) === '=') {
                this.operator = this.operator + 'orequal';
                this.value = this.value.substring(1);
            }
        }
    };
    Filter.prototype.columnPositionChanged = function () {
        if (this.parent.filterSettings.type !== 'FilterBar') {
            return;
        }
    };
    Filter.prototype.getLocalizedCustomOperators = function () {
        var numOptr = [
            { value: 'equal', text: this.l10n.getConstant('Equal') },
            { value: 'greaterthan', text: this.l10n.getConstant('GreaterThan') },
            { value: 'greaterthanorequal', text: this.l10n.getConstant('GreaterThanOrEqual') },
            { value: 'lessthan', text: this.l10n.getConstant('LessThan') },
            { value: 'lessthanorequal', text: this.l10n.getConstant('LessThanOrEqual') },
            { value: 'notequal', text: this.l10n.getConstant('NotEqual') },
            { value: 'isnull', text: this.l10n.getConstant('IsNull') },
            { value: 'isnotnull', text: this.l10n.getConstant('NotNull') }
        ];
        this.customOperators = {
            stringOperator: [
                { value: 'startswith', text: this.l10n.getConstant('StartsWith') },
                { value: 'endswith', text: this.l10n.getConstant('EndsWith') },
                { value: 'contains', text: this.l10n.getConstant('Contains') },
                { value: 'equal', text: this.l10n.getConstant('Equal') },
                { value: 'isempty', text: this.l10n.getConstant('IsEmpty') },
                { value: 'doesnotstartwith', text: this.l10n.getConstant('NotStartsWith') },
                { value: 'doesnotendwith', text: this.l10n.getConstant('NotEndsWith') },
                { value: 'doesnotcontain', text: this.l10n.getConstant('NotContains') },
                { value: 'notequal', text: this.l10n.getConstant('NotEqual') },
                { value: 'isnotempty', text: this.l10n.getConstant('IsNotEmpty') },
                { value: 'like', text: this.l10n.getConstant('Like') }
            ],
            numberOperator: numOptr,
            dateOperator: [
                { value: 'equal', text: this.l10n.getConstant('Equal') },
                { value: 'greaterthan', text: this.l10n.getConstant('GreaterThan') },
                { value: 'greaterthanorequal', text: this.l10n.getConstant('GreaterThanOrEqual') },
                { value: 'lessthan', text: this.l10n.getConstant('LessThan') },
                { value: 'lessthanorequal', text: this.l10n.getConstant('LessThanOrEqual') },
                { value: 'notequal', text: this.l10n.getConstant('NotEqual') },
                { value: 'isnull', text: this.l10n.getConstant('IsNull') },
                { value: 'isnotnull', text: this.l10n.getConstant('NotNull') }
            ],
            datetimeOperator: [
                { value: 'equal', text: this.l10n.getConstant('Equal') },
                { value: 'greaterthan', text: this.l10n.getConstant('GreaterThan') },
                { value: 'greaterthanorequal', text: this.l10n.getConstant('GreaterThanOrEqual') },
                { value: 'lessthan', text: this.l10n.getConstant('LessThan') },
                { value: 'lessthanorequal', text: this.l10n.getConstant('LessThanOrEqual') },
                { value: 'notequal', text: this.l10n.getConstant('NotEqual') },
                { value: 'isnull', text: this.l10n.getConstant('IsNull') },
                { value: 'isnotnull', text: this.l10n.getConstant('NotNull') }
            ],
            dateonlyOperator: [
                { value: 'equal', text: this.l10n.getConstant('Equal') },
                { value: 'greaterthan', text: this.l10n.getConstant('GreaterThan') },
                { value: 'greaterthanorequal', text: this.l10n.getConstant('GreaterThanOrEqual') },
                { value: 'lessthan', text: this.l10n.getConstant('LessThan') },
                { value: 'lessthanorequal', text: this.l10n.getConstant('LessThanOrEqual') },
                { value: 'notequal', text: this.l10n.getConstant('NotEqual') },
                { value: 'isnull', text: this.l10n.getConstant('IsNull') },
                { value: 'isnotnull', text: this.l10n.getConstant('NotNull') }
            ],
            booleanOperator: [
                { value: 'equal', text: this.l10n.getConstant('Equal') },
                { value: 'notequal', text: this.l10n.getConstant('NotEqual') }
            ]
        };
        if (this.filterSettings.type === 'Menu') {
            this.customOperators.stringOperator.push({ value: 'in', text: this.l10n.getConstant('In') }, { value: 'notin', text: this.l10n.getConstant('NotIn') });
            this.customOperators.booleanOperator.push({ value: 'in', text: this.l10n.getConstant('In') }, { value: 'notin', text: this.l10n.getConstant('NotIn') });
            this.customOperators.numberOperator.push({ value: 'in', text: this.l10n.getConstant('In') }, { value: 'notin', text: this.l10n.getConstant('NotIn') });
        }
    };
    /**
     * @param {string} field - specifies the field name
     * @returns {void}
     * @hidden
     */
    Filter.prototype.openMenuByField = function (field) {
        var gObj = this.parent;
        if (gObj.enableAdaptiveUI) {
            this.showCustomFilter(false);
            return;
        }
        var column = gObj.getColumnByField(field);
        var header = gObj.getColumnHeaderByField(field);
        var target = header.querySelector('.e-filtermenudiv');
        if (!target) {
            return;
        }
        var gClient = gObj.element.getBoundingClientRect();
        var fClient = target.getBoundingClientRect();
        this.filterDialogOpen(column, target, fClient.right - gClient.left, fClient.bottom - gClient.top);
    };
    Filter.prototype.filterIconClickHandler = function (e) {
        var target = e.target;
        if (target.classList.contains('e-filtermenudiv') && (this.parent.filterSettings.type === 'Menu' ||
            this.parent.filterSettings.type === 'CheckBox' || this.parent.filterSettings.type === 'Excel')) {
            var gObj = this.parent;
            var col = gObj.getColumnByUid(parentsUntil(target, 'e-headercell').firstElementChild.getAttribute('e-mappinguid'));
            this.column = col;
            if (this.fltrDlgDetails.field === col.field && this.fltrDlgDetails.isOpen) {
                return;
            }
            if (this.filterModule) {
                this.filterModule.closeDialog();
            }
            this.fltrDlgDetails = { field: col.field, isOpen: true };
            this.openMenuByField(col.field);
        }
    };
    Filter.prototype.clickHandler = function (e) {
        if (this.filterSettings.type === 'FilterBar' && this.filterSettings.showFilterBarOperator) {
            if (parentsUntil(e.target, 'e-filterbarcell') &&
                e.target.classList.contains('e-input-group-icon')) {
                var filterOperatorElement = closest(e.target, 'div').
                    querySelector('.e-filterbaroperator');
                if (filterOperatorElement) {
                    filterOperatorElement.focus();
                }
                else {
                    e.target.focus();
                }
            }
            if (e.target.classList.contains('e-list-item')) {
                var inputId = document.querySelector('.e-popup-open').getAttribute('id').replace('_popup', '');
                if (inputId.indexOf('grid-column') !== -1) {
                    closest(document.getElementById(inputId), 'div').querySelector('.e-filtertext').focus();
                }
            }
        }
        if (this.filterSettings.mode === 'Immediate' || this.parent.filterSettings.type === 'Menu' ||
            this.parent.filterSettings.type === 'CheckBox' || this.parent.filterSettings.type === 'Excel') {
            var target = e.target;
            var datepickerEle = target.classList.contains('e-day'); // due to datepicker popup cause
            var dialog = parentsUntil(this.parent.element, 'e-dialog');
            var hasDialog = false;
            var popupEle = parentsUntil(target, 'e-popup');
            var hasDialogClosed = this.parent.element.classList.contains('e-device') ?
                document.querySelector('.e-filter-popup') : document.getElementById(this.parent.element.id + '_e-popup') ?
                document.getElementById(this.parent.element.id + '_e-popup').querySelector('.e-filter-popup') : this.parent.element.querySelector('.e-filter-popup');
            if (dialog && popupEle) {
                hasDialog = dialog.id === popupEle.id;
            }
            if ((this.filterModule && hasDialogClosed && (parentsUntil(target, 'e-excel-ascending') ||
                parentsUntil(target, 'e-excel-descending')))) {
                this.filterModule.closeDialog(target);
            }
            if (parentsUntil(target, 'e-filter-popup') || target.classList.contains('e-filtermenudiv')) {
                return;
            }
            else if (this.filterModule && !parentsUntil(target, 'e-date-overflow') && (!parentsUntil(target, 'e-popup-wrapper')
                && (!closest(target, '.e-filter-item.e-menu-item'))) && !datepickerEle
                && !(parentsUntil(target, 'e-search-wrapper') && !hasDialogClosed)) {
                if ((hasDialog && (!parentsUntil(target, 'e-filter-popup'))
                    && (!parentsUntil(target, 'e-popup-flmenu'))) || (!popupEle && hasDialogClosed)) {
                    this.filterModule.isresetFocus = parentsUntil(target, 'e-grid') &&
                        parentsUntil(target, 'e-grid').id === this.parent.element.id && !(parentsUntil(target, 'e-search-wrapper')
                        && hasDialogClosed);
                    this.filterModule.closeDialog(target);
                }
            }
        }
    };
    Filter.prototype.filterHandler = function (args) {
        this.actualPredicate[args.field] = args.actualPredicate;
        this.actualData = Object.keys(this.actualPredicate);
        var dataManager = new DataManager(this.filterSettings.columns);
        var query = new Query().where('field', this.filterOperators.equal, args.field);
        this.checkboxFilterObject = dataManager.dataSource.json;
        this.checkboxPrevFilterObject = dataManager.executeLocal(query);
        for (var i = 0; i < this.checkboxPrevFilterObject.length; i++) {
            var index = -1;
            for (var j = 0; j < this.filterSettings.columns.length; j++) {
                if (this.checkboxPrevFilterObject[parseInt(i.toString(), 10)].field ===
                    this.filterSettings.columns[parseInt(j.toString(), 10)].field) {
                    index = j;
                    break;
                }
            }
            if (index !== -1) {
                this.filterSettings.columns.splice(index, 1);
            }
        }
        if (this.values[args.field]) {
            delete this.values[args.field];
        }
        var col = this.parent.getColumnByField(args.field);
        var iconClass = this.parent.showColumnMenu && col.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
        var filterIconElement = this.parent.getColumnHeaderByField(args.field).querySelector(iconClass);
        if (args.action === 'filtering') {
            this.filterSettings.columns = this.filterSettings.columns.concat(args.filterCollection);
            if (this.filterSettings.columns.length && filterIconElement) {
                filterIconElement.classList.add('e-filtered');
            }
        }
        else {
            if (filterIconElement) {
                filterIconElement.classList.remove('e-filtered');
            }
            args.requestType = 'filtering';
            this.parent.renderModule.refresh(args); //hot-fix onpropertychanged not working for object { array }
        }
        this.parent.dataBind();
    };
    Filter.prototype.updateFilter = function () {
        var cols = this.filterSettings.columns;
        this.actualPredicate = {};
        for (var i = 0; i < cols.length; i++) {
            this.column = this.parent.getColumnByField(cols[parseInt(i.toString(), 10)].field) ||
                getColumnByForeignKeyValue(cols[parseInt(i.toString(), 10)].field, this.parent.getForeignKeyColumns());
            var fieldName = cols[parseInt(i.toString(), 10)].field;
            if (!this.parent.getColumnByField(cols[parseInt(i.toString(), 10)].field)) {
                fieldName = getColumnByForeignKeyValue(cols[parseInt(i.toString(), 10)].field, this.parent.getForeignKeyColumns()).field;
            }
            this.refreshFilterIcon(fieldName, cols[parseInt(i.toString(), 10)].operator, cols[parseInt(i.toString(), 10)].value, cols[parseInt(i.toString(), 10)].type, cols[parseInt(i.toString(), 10)].predicate, cols[parseInt(i.toString(), 10)].matchCase, cols[parseInt(i.toString(), 10)].ignoreAccent, cols[parseInt(i.toString(), 10)].uid);
        }
    };
    Filter.prototype.refreshFilterIcon = function (fieldName, operator, value, type, predicate, matchCase, ignoreAccent, uid) {
        var obj = {
            field: fieldName,
            predicate: predicate,
            matchCase: matchCase,
            ignoreAccent: ignoreAccent,
            operator: operator,
            value: value,
            type: type
        };
        if (this.actualPredicate["" + fieldName]) {
            this.actualPredicate["" + fieldName].push(obj);
        }
        else {
            this.actualPredicate["" + fieldName] = [obj];
        }
        var field = uid ? this.parent.grabColumnByUidFromAllCols(uid).field : fieldName;
        this.addFilteredClass(field);
    };
    Filter.prototype.addFilteredClass = function (fieldName) {
        var filterIconElement;
        var col = this.parent.getColumnByField(fieldName);
        if (this.parent.showColumnMenu && col.showColumnMenu) {
            filterIconElement = this.parent.getColumnHeaderByField(fieldName).querySelector('.e-columnmenu');
        }
        else if (col) {
            filterIconElement = this.parent.getColumnHeaderByField(fieldName).querySelector('.e-icon-filter');
        }
        if (filterIconElement) {
            filterIconElement.classList.add('e-filtered');
        }
    };
    /**
     * @hidden
     * @returns {FilterUI} returns the FilterUI
     */
    Filter.prototype.getFilterUIInfo = function () {
        return this.filterModule ? this.filterModule.getFilterUIInfo() : {};
    };
    /**
     * @param {string} field - specifies the field name
     * @returns {string} returns the operator name
     * @hidden
     */
    Filter.prototype.getOperatorName = function (field) {
        return document.getElementById(this.parent.getColumnByField(field).uid).ej2_instances[0].value;
    };
    /**
     * Renders checkbox items in Menu filter dialog.
     *
     * @returns {void}
     */
    Filter.prototype.renderCheckboxOnFilterMenu = function () {
        return this.filterModule.renderCheckBoxMenu();
    };
    return Filter;
}());
export { Filter };
