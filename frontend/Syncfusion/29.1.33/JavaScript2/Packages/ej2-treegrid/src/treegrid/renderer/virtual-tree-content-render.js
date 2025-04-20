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
import { Cell, CellType } from '@syncfusion/ej2-grids';
import { VirtualContentRenderer } from '@syncfusion/ej2-grids';
import * as literals from '../base/constant';
import { InterSectionObserver } from '@syncfusion/ej2-grids';
import { TreeVirtualRowModelGenerator } from '../renderer/virtual-row-model-generator';
import * as events from '../base/constant';
import { isNullOrUndefined, EventHandler, getValue, setValue, Browser, debounce } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { isCountRequired } from '../utils';
/**
 * VirtualTreeContentRenderer
 *
 * @hidden
 */
var VirtualTreeContentRenderer = /** @class */ (function (_super) {
    __extends(VirtualTreeContentRenderer, _super);
    function VirtualTreeContentRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.isExpandCollapse = false;
        _this.translateY = 0;
        _this.maxiPage = 0;
        _this.recordAdded = false;
        /** @hidden */
        _this.startIndex = -1;
        _this.endIndex = -1;
        _this.preTranslate = 0;
        _this.isRemoteExpand = false;
        /** @hidden */
        _this.isDataSourceChanged = false;
        _this.addEventListener();
        return _this;
    }
    VirtualTreeContentRenderer.prototype.getModelGenerator = function () {
        return new TreeVirtualRowModelGenerator(this.parent);
    };
    /**
     * Retrieves the row element for a given row index.
     *
     * @param {number} index - The index of the row to retrieve.
     * @returns {Element} The row element at the specified index.
     */
    VirtualTreeContentRenderer.prototype.getRowByIndex = function (index) {
        if (this.parent.enableVirtualization && this.parent.isFrozenGrid()) {
            return this.getRowCollection(index, true);
        }
        var dataRows = this.parent.getDataRows();
        var targetRow = dataRows.find(function (e) { return parseInt(e.getAttribute('aria-rowindex'), 10) - 1 === index; });
        if (!targetRow && this.parent.isEdit && this.parent.editSettings.mode === 'Batch') {
            return index != null ? this.parent.getRows()[parseInt(index.toString(), 10)] : undefined;
        }
        return targetRow;
    };
    /**
     * Retrieves the frozen right virtual row element by its index.
     *
     * @param {number} index - The index of the row to be retrieved.
     * @returns {Element} The DOM element representing the frozen right virtual row.
     */
    VirtualTreeContentRenderer.prototype.getFrozenRightVirtualRowByIndex = function (index) {
        return this.getRowCollection(index, false, false, true);
    };
    /**
     * Retrieves the row or record from the virtual tree grid based on the provided index.
     * Considers conditions such as frozen rows and pagination for accurate retrieval.
     *
     * @param {number} index - The index of the desired row or record.
     * @param {boolean} isMovable - Specifies if the content is movable.
     * @param {boolean} [isRowObject] - Optional. Determines if the return value should be a row object.
     * @param {boolean} [isFrozenRight] - Optional. Used for determining frozen right rows.
     * @returns {Element | Object} - The HTML element or row object.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualTreeContentRenderer.prototype.getRowCollection = function (index, isMovable, isRowObject, isFrozenRight) {
        var startIdx = parseInt(this.parent.getRows()[0].getAttribute(literals.ariaRowIndex), 10) - 1;
        var rowCollection = this.parent.getDataRows();
        var collection = isRowObject ? this.parent.getCurrentViewRecords() : rowCollection;
        var selectedRow = collection[index - startIdx];
        if (this.parent.frozenRows && this.parent.pageSettings.currentPage > 1) {
            if (!isRowObject) {
                selectedRow = index <= this.parent.frozenRows ? rowCollection[parseInt(index.toString(), 10)]
                    : rowCollection[(index - startIdx) + this.parent.frozenRows];
            }
            else {
                selectedRow = index <= this.parent.frozenRows ?
                    this.parent.getRowsObject()[parseInt(index.toString(), 10)].data : selectedRow;
            }
        }
        if (selectedRow == null && index != null && this.parent.editSettings.mode === 'Batch' && this.parent.isEdit && isMovable) {
            selectedRow = rowCollection[parseInt(index.toString(), 10)];
        }
        return selectedRow;
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.addEventListener = function () {
        this.parent.on(events.virtualActionArgs, this.virtualOtherAction, this);
        this.parent.on(events.indexModifier, this.indexModifier, this);
    };
    /**
     * Handles virtual scrolling actions based on the provided arguments.
     *
     * @param {Object} args - The argument object.
     * @param {boolean} args.setTop - Determines if the virtual scroll position should reset to top.
     * @param {boolean} args.isExpandCollapse - Determines if the action is part of an expand/collapse operation.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.virtualOtherAction = function (args) {
        if (args.setTop) {
            this.translateY = 0;
            this.startIndex = 0;
            this.endIndex = this.parent.pageSettings.pageSize - 1;
        }
        else if (args.isExpandCollapse) {
            this.isExpandCollapse = true;
        }
    };
    /**
     * Modifies the index based on various conditions such as record addition, deletion, or data source changes.
     *
     * @private
     * @param {Object} args - Contains parameters for the current operation.
     * @param {number} args.startIndex - The starting index for the modification.
     * @param {number} args.endIndex - The ending index for the modification.
     * @param {number} args.count - The number of items affected in the operation.
     * @param {string} args.requestType - The type of request, such as 'insert', 'delete', or 'update'.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.indexModifier = function (args) {
        var content = this.parent.getContent().querySelector('.e-content');
        var pageSize = this.parent.pageSettings.pageSize;
        if ((this.recordAdded || args.requestType === 'delete' && this.endIndex > args.count - this.parent.pageSettings.pageSize) && this.startIndex > -1 && this.endIndex > -1) {
            if (this.endIndex > args.count - pageSize) {
                var nextSetResIndex = ~~(content.scrollTop / this.parent.getRowHeight());
                var lastIndex = nextSetResIndex + this.parent.getRows().length;
                if (lastIndex > args.count) {
                    lastIndex = nextSetResIndex +
                        (args.count - nextSetResIndex);
                }
                this.startIndex = lastIndex - this.parent.getRows().length;
                this.endIndex = lastIndex;
            }
            else if (this.parent.root.editSettings.newRowPosition !== 'Top' && this.parent.root.editModule.selectedIndex !== -1 || this.parent.root.editModule.selectedIndex !== -1) {
                this.startIndex += 1;
                this.endIndex += 1;
            }
            this.recordAdded = false;
        }
        if (this.isDataSourceChanged) {
            this.startIndex = 0;
            this.endIndex = pageSize - 1;
        }
        if ((this.endIndex - this.startIndex !== pageSize) &&
            (this.totalRecords > pageSize)
            && (this.endIndex === this.totalRecords)) {
            args.startIndex = this.endIndex - pageSize;
            args.endIndex = this.endIndex;
        }
        else {
            args.startIndex = this.startIndex;
            args.endIndex = this.endIndex;
        }
    };
    /**
     * Handles the addition or removal of event listeners for virtual scrolling in a TreeGrid.
     *
     * @param {string} action - The action to perform, either 'on' or 'off'.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.eventListener = function (action) {
        var _this = this;
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            this.parent["" + action]('data-ready', this.onDataReady, this);
            this.parent["" + action]('refresh-virtual-block', this.refreshContentRows, this);
            this.fn = function () {
                _this.observers.observes(function (scrollArgs) { return _this.scrollListeners(scrollArgs); }, _this.onEnteredAction(), _this.parent);
                var gObj = _this.parent;
                if (gObj.root.enablePersistence && gObj.root.scrollPosition) {
                    _this.content.scrollTop = gObj.root.scrollPosition.top;
                    if (gObj.root.enableColumnVirtualization) {
                        _this.content.scrollLeft = gObj.root.scrollPosition.left;
                    }
                    var scrollValues = {
                        direction: 'down', sentinel: _this.observer.sentinelInfo.down,
                        offset: gObj.root.scrollPosition, focusElement: gObj.element
                    };
                    _this.scrollListeners(scrollValues);
                }
                _this.parent.off('content-ready', _this.fn);
            };
            this.parent.addEventListener('dataBound', this.dataBoundEvent.bind(this));
            this.parent.addEventListener('rowSelected', this.rowSelectedEvent.bind(this));
            this.parent["" + action]('select-virtual-Row', this.toSelectVirtualRow, this);
            this.parent.on('content-ready', this.fn, this);
            this.parent.addEventListener(events.actionBegin, this.handleActionBegin.bind(this));
            this.parent.addEventListener(events.actionComplete, this.onActionComplete.bind(this));
            this.parent["" + action]('virtual-scroll-edit-action-begin', this.beginEdit, this);
            this.parent["" + action]('virtual-scroll-add-action-begin', this.beginAdd, this);
            this.parent["" + action]('virtual-scroll-edit-success', this.virtualEditSuccess, this);
            this.parent["" + action]('edit-reset', this.resetIseditValue, this);
            this.parent["" + action]('get-virtual-data', this.getData, this);
            this.parent["" + action]('virtual-scroll-edit-cancel', this.cancelEdit, this);
            this.parent["" + action]('select-row-on-context-open', this.toSelectRowOnContextOpen, this);
            this.parent["" + action]('refresh-virtual-editform-cells', this.refreshCell, this);
            this.parent["" + action]('virtaul-cell-focus', this.cellFocus, this);
            this.parent["" + action]('virtual-scroll-edit', this.restoreEditState, this);
        }
        else {
            _super.prototype.eventListener.call(this, 'on');
        }
    };
    /**
     * Handles cell focus transitions in a virtualized tree grid component
     * when a keyboard event is triggered.
     *
     * @param {KeyboardEventArgs} e - The keyboard event arguments that contain
     *                                information about the key action.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.cellFocus = function (e) {
        var virtualCellFocus = 'virtualCellFocus';
        _super.prototype["" + virtualCellFocus].call(this, e);
    };
    /**
     * Handles the data ready event for the virtual tree grid content renderer.
     *
     * @param {NotifyArgs} [e] - The notification arguments that contain information about the data.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.onDataReady = function (e) {
        _super.prototype.onDataReady.call(this, e);
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            if (!isNullOrUndefined(e.count)) {
                this.totalRecords = e.count;
                // To overcome the white space issue in last page when records collapsed
                if (this.parent.isFrozenGrid() && e.count < Object.keys(this.parent.dataSource).length) {
                    var width = this.parent.enableColumnVirtualization ?
                        this.getColumnOffset(this.parent.columns.length - 1) + 'px' : '100%';
                    var height = (this.parent.getRowHeight() * e.count) -
                        (this.parent.getRowHeight() * this.parent.pageSettings.pageSize);
                    getValue('virtualEle', this).setVirtualHeight(height, width);
                }
                if (!this.parent.enableColumnVirtualization && !this.parent.isFrozenGrid()) {
                    getValue('virtualEle', this).setVirtualHeight(this.parent.getRowHeight() * e.count, '100%');
                }
            }
            if ((!isNullOrUndefined(e.requestType) && e.requestType.toString() === 'collapseAll') || (this.isDataSourceChanged && (this.startIndex === -1 || this.startIndex === 0 && this['preStartIndex'] === 0))) {
                this.contents.scrollTop = 0;
                this.isDataSourceChanged = false;
            }
        }
    };
    /**
     * Renders the table for the virtual tree content. It sets up a new `TreeInterSectionObserver`
     * based on certain conditions regarding the data source and counting requirements.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            getValue('observer', this).options.debounceEvent = false;
            this.observers = new TreeInterSectionObserver(getValue('observer', this).element, getValue('observer', this).options);
            this.contents = this.getPanel().firstChild;
        }
    };
    /**
     * Calculates the translateY value for a virtual tree grid based on the scroll top, container height,
     * and additional virtual scrolling information. This method specifically handles logic for remote
     * data sources and ensures smooth scrolling with respect to expansion states.
     *
     * @param {number} sTop - The scroll top position.
     * @param {number} cHeight - The height of the container.
     * @param {VirtualInfo} [info] - Optional virtual scrolling information.
     * @param {boolean} [isOnenter] - Flag indicating if the scroll event is on enter.
     * @returns {number} The calculated translateY value.
     */
    VirtualTreeContentRenderer.prototype.getTranslateY = function (sTop, cHeight, info, isOnenter) {
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)) {
            if (this.isRemoteExpand) {
                this.isRemoteExpand = false;
                return this.preTranslate;
            }
            this.preTranslate = _super.prototype.getTranslateY.call(this, sTop, cHeight, info, isOnenter);
        }
        return _super.prototype.getTranslateY.call(this, sTop, cHeight, info, isOnenter);
    };
    /**
     * Handles the dataBound event to calculate and set the initial row top position for the grid.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.dataBoundEvent = function () {
        var dataBoundEve = 'dataBound';
        var initialRowTop = 'initialRowTop';
        if (!isNullOrUndefined(this.parent.getRows()) && this.parent.getRows().length && !isNullOrUndefined(this.parent.getRowByIndex(0)) && !this["" + initialRowTop]) {
            var rowTop = this.parent.getRowByIndex(0).getBoundingClientRect().top;
            var gridTop = this.parent.element.getBoundingClientRect().top;
            if (rowTop > 0) {
                this["" + initialRowTop] = this.parent.getRowByIndex(0).getBoundingClientRect().top - gridTop;
            }
            else if (this.parent.selectedRowIndex === -1) {
                this["" + initialRowTop] = this.content.getBoundingClientRect().top -
                    this.parent.getRowByIndex(0).getBoundingClientRect().height;
            }
        }
        _super.prototype["" + dataBoundEve].call(this);
    };
    /**
     * Handles the row selection event for virtual tree grid rows.
     * It invokes the base class's rowSelected method and notifies
     * the parent component about a virtual transformation change.
     *
     * @param {RowSelectEventArgs} args - The arguments related to the row selection event.
     * @returns {void} This method does not return a value.
     */
    VirtualTreeContentRenderer.prototype.rowSelectedEvent = function (args) {
        var rowSelected = 'rowSelected';
        _super.prototype["" + rowSelected].call(this, args);
        this.parent.notify('virtualTransform', { requestType: 'transformChange' });
    };
    /**
     * Handles virtual row selection in TreeGrid.
     *
     * @param {Object} args - The argument object containing the selected index.
     * @param {number} args.selectedIndex - The index of the row to be selected.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.toSelectVirtualRow = function (args) {
        if (this.parent.isEdit) {
            return;
        }
        var selectVirtualRow = 'selectVirtualRow';
        var containerRect = 'containerRect';
        if (isNullOrUndefined(this.observer["" + containerRect])) {
            this.observer["" + containerRect] = this.observers["" + containerRect];
        }
        var treeGridParent = this.parent.clipboardModule['treeGridParent'];
        if (isNullOrUndefined(treeGridParent.editModule) ||
            isNullOrUndefined(treeGridParent.editModule['addRowIndex']) || args.selectedIndex !== 0) {
            if (!isNullOrUndefined(treeGridParent.grid.sortModule) && treeGridParent.grid.sortModule['sortedColumns'].length > 0) {
                var sortedData = treeGridParent.dataModule['sortedData'];
                if (!isNullOrUndefined(sortedData) && sortedData.length > 0) {
                    var targetIndex = sortedData.findIndex(function (record) { return record.index === args.selectedIndex; });
                    args.selectedIndex = targetIndex;
                }
            }
            _super.prototype["" + selectVirtualRow].call(this, args);
        }
    };
    /**
     * Refreshes the cells for the given row object by regenerating them.
     *
     * @param {Row<Column>} rowObj - The row object for which the cells need to be refreshed.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.refreshCell = function (rowObj) {
        rowObj.cells = this.generateCells();
    };
    /**
     * Generates an array of cells for each column in the parent.
     *
     * @returns {Cell<Column>[]} An array of cells for the corresponding columns.
     */
    VirtualTreeContentRenderer.prototype.generateCells = function () {
        var cells = [];
        for (var i = 0; i < this.parent.columns.length; i++) {
            cells.push(this.generateCell(this.parent.columns[parseInt(i.toString(), 10)]));
        }
        return cells;
    };
    /**
     * Generates a cell object with provided column and row configurations.
     *
     * @param {Column} col - The Column object which holds the column configuration.
     * @param {string} [rowId] - An optional string that represents the row ID.
     * @param {CellType} [cellType] - An optional CellType enum to specify the type of the cell.
     * @param {number} [colSpan] - An optional number to specify the column span of the cell.
     * @param {number} [oIndex] - An optional number for the order index of the cell.
     * @param {Object} [foreignKeyData] - An optional object for foreign key data associated with the column.
     *
     * @returns {Cell<Column>} Returns a newly created Cell object of type Column.
     */
    VirtualTreeContentRenderer.prototype.generateCell = function (col, rowId, cellType, colSpan, oIndex, foreignKeyData) {
        var opt = {
            'visible': col.visible,
            'isDataCell': !isNullOrUndefined(col.field || col.template),
            'isTemplate': !isNullOrUndefined(col.template),
            'rowID': rowId,
            'column': col,
            'cellType': !isNullOrUndefined(cellType) ? cellType : CellType.Data,
            'colSpan': colSpan,
            'commands': col.commands,
            'isForeignKey': col.isForeignColumn && col.isForeignColumn(),
            'foreignKeyData': col.isForeignColumn && col.isForeignColumn() && getValue(col.field, foreignKeyData)
        };
        if (opt.isDataCell || opt.column.type === 'checkbox' || opt.commands) {
            opt.index = oIndex;
        }
        return new Cell(opt);
    };
    /**
     * Begins the edit operation for a specified row in the grid.
     * Updates the `editedRowIndex` and assigns row data to the event data.
     *
     * @param {{ data: Object, index: number }} e - An object containing the row data and index.
     * @param {Object} e.data - The data of the row to be edited.
     * @param {number} e.index - The index of the row to be edited.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.beginEdit = function (e) {
        this['editedRowIndex'] = e.index;
        var selector = '.e-row[aria-rowindex="' + (e.index + 1) + '"]';
        var index = this.parent.getContent().querySelector(selector).rowIndex;
        var rowData = this.parent.getCurrentViewRecords()[parseInt(index.toString(), 10)];
        e.data = rowData;
    };
    /**
     * Begins the process of adding a new row in the tree grid.
     *
     * @param {Object} args - The arguments for adding a new row.
     * @param {boolean} args.startEdit - A flag indicating whether to start editing.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.beginAdd = function (args) {
        var addAction = 'addActionBegin';
        var isAdd = 'isAdd';
        var addArgs = { newRowPosition: this.rowPosition, addRowIndex: this.addRowIndex, dataRowIndex: this.dataRowIndex };
        this.parent.notify('get-row-position', addArgs);
        this.rowPosition = addArgs.newRowPosition;
        this.addRowIndex = addArgs.addRowIndex;
        this.dataRowIndex = addArgs.dataRowIndex;
        var rows = this.parent.getRows();
        var firstAriaIndex = rows.length ? +rows[0].getAttribute('aria-rowindex') - 1 : 0;
        var lastAriaIndex = rows.length ? +rows[rows.length - 1].getAttribute('aria-rowindex') - 1 : 0;
        var withInRange = this.parent.selectedRowIndex >= firstAriaIndex && this.parent.selectedRowIndex <= lastAriaIndex;
        if (!(this.rowPosition === 'Top' || this.rowPosition === 'Bottom')) {
            this["" + isAdd] = true;
        }
        if (this.rowPosition === 'Top' || this.rowPosition === 'Bottom' ||
            ((!this.addRowIndex || this.addRowIndex === -1) && (this.parent.selectedRowIndex === -1 || !withInRange))) {
            _super.prototype["" + addAction].call(this, args);
        }
    };
    /**
     * Restores the edit state of the tree grid content. This method calls the
     * base class method to handle the restoration logic.
     *
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.restoreEditState = function () {
        var restoreEdit = 'restoreEdit';
        _super.prototype["" + restoreEdit].call(this);
    };
    /**
     * Resets the edit state if certain conditions are met.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.resetIseditValue = function () {
        var resetIsEdit = 'resetIsedit';
        var isAdd = 'isAdd';
        this.parent.notify('reset-edit-props', {});
        if ((this.rowPosition === 'Top' || this.rowPosition === 'Bottom') && this["" + isAdd]) {
            _super.prototype["" + resetIsEdit].call(this);
        }
    };
    /**
     * Handles the successful editing operation when virtual scrolling is enabled.
     * Checks if a row has been added to the tree grid and sets the `recordAdded` flag accordingly.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.virtualEditSuccess = function () {
        var isAdd = 'isAdd';
        var content = this.parent.getContent().querySelector('.e-content');
        if (this["" + isAdd] && content.querySelector('.e-addedrow')) {
            this.recordAdded = true;
        }
    };
    /**
     * Cancels the edit operation for the provided data.
     *
     * @param {Object} args - The arguments containing the data to cancel edit for.
     * @param {Object} args.data - The specific data object for which the edit operation needs to be canceled.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.cancelEdit = function (args) {
        var editCancel = 'editCancel';
        _super.prototype["" + editCancel].call(this, args);
    };
    /**
     * Handles the action of selecting a row when the context menu is opened.
     *
     * @param {Object} args - An object containing related parameters.
     * @param {boolean} args.isOpen - A flag indicating whether the context menu is open.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.toSelectRowOnContextOpen = function (args) {
        var selectRowOnContextOpen = 'selectRowOnContextOpen';
        _super.prototype["" + selectRowOnContextOpen].call(this, args);
    };
    /**
     * Restores a new row in the grid when necessary by adding it back to the content.
     *
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.restoreNewRow = function () {
        var isAdd = 'isAdd';
        var content = this.parent.getContent().querySelector('.e-content');
        if (this["" + isAdd] && !content.querySelector('.e-addedrow')) {
            this.parent.isEdit = false;
            this.parent.editModule.addRecord(null, this.parent.root.editModule.selectedIndex);
        }
    };
    /**
     * Retrieves virtual data for operations like adding or canceling rows in the grid.
     *
     * @param {Object} data - An object containing properties to determine the virtual data processing.
     * @param {Object} data.virtualData - The virtual data object to be processed.
     * @param {boolean} data.isAdd - A boolean indicating if the operation is an addition.
     * @param {boolean} data.isCancel - A boolean indicating if the operation is a cancellation.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.getData = function (data) {
        var getVirtualData = 'getVirtualData';
        _super.prototype["" + getVirtualData].call(this, data);
    };
    /**
     * Initiates the beginning of an action within the tree grid component.
     * This method is invoked before any action is performed, allowing for
     * any necessary modifications or cancellations of the upcoming action.
     *
     * @param {NotifyArgs} args - The arguments associated with the action,
     * providing context and specifics about what is being commenced.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.handleActionBegin = function (args) {
        var actionBegin = 'actionBegin';
        _super.prototype["" + actionBegin].call(this, args);
    };
    /**
     * Handles the completion of various actions, such as adding a new row.
     * Updates row positions and indexes based on the action completed.
     *
     * @param {NotifyArgs} args - An object containing the details of the completed action.
     *               Specifically, it includes the `requestType` which determines the type
     *               of action that was completed.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.onActionComplete = function (args) {
        if (args.requestType === 'add') {
            var addArgs = { newRowPosition: this.rowPosition, addRowIndex: this.addRowIndex, dataRowIndex: this.dataRowIndex };
            this.parent.notify('get-row-position', addArgs);
            this.rowPosition = addArgs.newRowPosition;
            this.addRowIndex = addArgs.addRowIndex;
            this.dataRowIndex = this.parent.root.editModule.selectedIndex;
        }
        var actionComplete = 'actionComplete';
        _super.prototype["" + actionComplete].call(this, args);
    };
    /**
     * Creates a callback function to be executed during virtual scrolling actions.
     * This function handles the adjustment of virtual elements and rendering logic,
     * particularly optimizing for non-IE browsers, wheel events, and virtual masks.
     *
     * @returns {Function} A function that handles scrolling and adjusts table rendering.
     * @param {HTMLElement} element - The HTML element involved in the action.
     * @param {SentinelType} current - The type of sentinel indicating the scroll.
     * @param {string} direction - The scroll direction.
     * @param {Offsets} e - The offset values indicating the current scroll position.
     * @param {boolean} isWheel - Indicates if the scrolling was initiated by a mouse wheel.
     * @param {boolean} check - A boolean flag for additional control logic.
     */
    VirtualTreeContentRenderer.prototype.onEnteredAction = function () {
        var _this = this;
        return function (element, current, direction, e, isWheel, check) {
            var directVirtualRender = 'directVirtualRender';
            if (!_this.parent["" + directVirtualRender]) { // with this property, columns are rendered without debouncing on horizontal scroll.
                var preventEvent = 'preventEvent';
                if (Browser.isIE && !isWheel && check && !_this["" + preventEvent] && !_this.parent.enableVirtualMaskRow) {
                    _this.parent.showSpinner();
                }
                if (_this.parent.enableVirtualMaskRow && !_this["" + preventEvent]) {
                    setTimeout(function () {
                        _this.parent.showMaskRow(current.axis);
                        _this.parent.notify('showGanttShimmer', { requestType: 'showShimmer' });
                    }, 0);
                }
                var height = _this.content.getBoundingClientRect().height;
                var top_1 = _this.prevInfo.offsets ? _this.prevInfo.offsets.top : null;
                var xAxis = current.axis === 'X';
                var x = _this.getColumnOffset(xAxis ? _this.vgenerator.getColumnIndexes()[0] - 1 : _this.prevInfo.columnIndexes[0]
                    - 1);
                if (xAxis) {
                    var idx = Object.keys(_this.vgenerator.cOffsets).length - _this.prevInfo.columnIndexes.length;
                    var maxLeft = _this.vgenerator.cOffsets[idx - 1];
                    x = x > maxLeft ? maxLeft : x; //TODO: This fix horizontal scrollbar jumping issue in column virtualization.
                }
                var y = _this.getTranslateY(e.top, height, xAxis && top_1 === e.top ? _this.prevInfo : undefined, true);
                if (!_this.parent.isFrozenGrid() || _this.parent.enableVirtualMaskRow) {
                    if (_this.parent.enableVirtualMaskRow) {
                        var upScroll = (e.top - _this.translateY) < 0;
                        y = (Math.round(_this.translateY) > y && !upScroll) ? Math.round(_this.translateY) : y;
                        _this.virtualEle.adjustTable(x, y);
                    }
                    else {
                        _this.virtualEle.adjustTable(x, _this.translateY);
                    }
                    if (_this.parent.enableColumnVirtualization) {
                        _this.header.virtualEle.adjustTable(x, 0);
                    }
                }
            }
        };
    };
    /**
     * Handles scroll events to manage virtual scrolling and row rendering.
     * Adjusts view information, row indexes, and translates viewport positioning
     * based on the given scroll arguments.
     *
     * @param {ScrollArg} scrollArgs - Contains the scroll offsets, sentinel information, direction of scroll, and other related details.
     * @returns {void} - No return value. It adjusts scrolling state internally.
     */
    VirtualTreeContentRenderer.prototype.scrollListeners = function (scrollArgs) {
        this['scrollAfterEdit']();
        this.shouldPreventScrolling(scrollArgs);
        if (this.parent.root.enablePersistence) {
            this.parent.root.scrollPosition = scrollArgs.offset;
        }
        var info = scrollArgs.sentinel;
        var rowHeight = this.parent.getRowHeight();
        var outBuffer = this.parent.pageSettings.pageSize - Math.ceil(this.parent.pageSettings.pageSize / 2);
        var content;
        if (!isNullOrUndefined(this.parent.contentModule)) {
            content = this.parent.getContent().querySelector('.e-content');
        }
        var scrollHeight = outBuffer * rowHeight;
        var upScroll = (scrollArgs.offset.top - this.translateY) < 0 && this.activeKey !== 'downArrow';
        var downScroll = Math.ceil(scrollArgs.offset.top - this.translateY) + rowHeight >= scrollHeight;
        var selectedRowIndex = 'selectedRowIndex';
        var currentViewData = this.parent.currentViewData;
        var indexValue = 'index';
        if (upScroll && (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left') && !isNullOrUndefined(content)) {
            var vHeight = +(this.parent.height.toString().indexOf('%') < 0 ? parseInt(this.parent.height.toString(), 10) :
                this.parent.element.getBoundingClientRect().height);
            // Calculate the integer number of rows that are scrolled past plus the number of rows that fit within the visible height
            var scrolledRows = Math.floor(content.scrollTop / rowHeight);
            var visibleRows = Math.ceil(vHeight / rowHeight);
            // Calculate the index by subtracting the page size from the total rows taken into account
            var index = scrolledRows + visibleRows - this.parent.pageSettings.pageSize;
            index = (index > 0) ? index : 0;
            if (!isNullOrUndefined(this["" + selectedRowIndex]) && this["" + selectedRowIndex] !== -1 && index !== this["" + selectedRowIndex] &&
                ((this.parent.rowHeight * this.parent.pageSettings.pageSize) < content.scrollTop) && !this.parent.allowRowDragAndDrop) {
                index = this["" + selectedRowIndex];
            }
            this.startIndex = index;
            this.endIndex = index + this.parent.pageSettings.pageSize;
            if (this.endIndex > this.totalRecords) {
                var lastInx = this.totalRecords;
                var remains = this.endIndex % lastInx;
                this.endIndex = lastInx;
                this.startIndex = (this.startIndex - remains) < 0 ? 0 : (this.startIndex - remains);
            }
            if (currentViewData.length && (currentViewData[0]["" + indexValue] >= this.parent.pageSettings.pageSize / 2) &&
                ((currentViewData[0]["" + indexValue] - this.startIndex) < (this.parent.pageSettings.pageSize / 2)) &&
                this.parent.selectionModule && this.parent.selectionModule.isRowSelected) {
                this.startIndex = currentViewData[0]["" + indexValue] - (this.parent.pageSettings.pageSize / 2);
                this.endIndex = this.startIndex + this.parent.pageSettings.pageSize;
            }
            //var firsttdinx = parseInt(this.parent.getContent().querySelector('.e-content td').getAttribute('index'), 0);
            var rowPt = Math.ceil(scrollArgs.offset.top / rowHeight);
            rowPt = rowPt % this.parent.pageSettings.pageSize;
            var firsttdinx = 0;
            if (!isNullOrUndefined(this.parent.getRows()[parseInt(rowPt.toString(), 10)]) &&
                !isNullOrUndefined(this.parent.getContent().querySelectorAll('.e-content tr')[parseInt(rowPt.toString(), 10)])) {
                var attr = this.parent.getContent().querySelectorAll('.e-content tr')[parseInt(rowPt.toString(), 10)]
                    .querySelector('td').getAttribute('index');
                firsttdinx = +attr; // this.parent.getContent().querySelector('.e-content tr').getAttribute('data-rowindex');
            }
            if (firsttdinx === 0) {
                if (this.endIndex - this.startIndex < this.parent.pageSettings.pageSize) {
                    this.translateY = !isNullOrUndefined(this.endIndex) ?
                        (this.endIndex - this.parent.pageSettings.pageSize) * (this.parent.rowHeight ?
                            this.parent.rowHeight : this.parent.getRowHeight()) : 0;
                }
                else if (this.startIndex === this["" + selectedRowIndex]) {
                    this.translateY = scrollArgs.offset.top;
                }
                else {
                    this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                        scrollArgs.offset.top - (outBuffer * rowHeight) + rowHeight : 0;
                }
            }
            else if (this.parent.getFrozenColumns() > 0) {
                scrollArgs.offset.top = scrollArgs.offset.top + 80;
                this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                    scrollArgs.offset.top - (outBuffer * rowHeight) + 10 : 0;
            }
            else {
                this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                    scrollArgs.offset.top - (outBuffer * rowHeight) + 10 : 0;
            }
        }
        else if (downScroll && (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left' && scrollArgs.direction !== 'up') && !isNullOrUndefined(content)) {
            var nextSetResIndex = ~~(content.scrollTop / rowHeight);
            var isLastBlock = (this["" + selectedRowIndex] + this.parent.pageSettings.pageSize) < this.totalRecords ? false : true;
            if (!isNullOrUndefined(this["" + selectedRowIndex]) && this["" + selectedRowIndex] !== -1 &&
                nextSetResIndex !== this["" + selectedRowIndex] && !isLastBlock && !this.parent.allowRowDragAndDrop) {
                nextSetResIndex = this["" + selectedRowIndex];
            }
            var lastIndex = nextSetResIndex + this.parent.pageSettings.pageSize;
            if (lastIndex > this.totalRecords) {
                lastIndex = nextSetResIndex +
                    (this.totalRecords - nextSetResIndex);
            }
            this.startIndex = !isLastBlock || isNullOrUndefined(this['' + selectedRowIndex]) ? lastIndex - this.parent.pageSettings.pageSize : nextSetResIndex;
            this.endIndex = lastIndex;
            if ((nextSetResIndex + this.parent.pageSettings.pageSize) > this.totalRecords && (this.endIndex - this.startIndex) <
                (this.parent.pageSettings.pageSize / 2) && (this.endIndex - nextSetResIndex) < (this.parent.pageSettings.pageSize / 2)) {
                this.startIndex = lastIndex - (this.parent.pageSettings.pageSize / 2);
            }
            if (currentViewData.length && this.startIndex > currentViewData[0]["" + indexValue] &&
                ((this.startIndex - currentViewData[0]["" + indexValue]) < (this.parent.pageSettings.pageSize / 2)) &&
                this.parent.selectionModule && this.parent.selectionModule.isRowSelected) {
                this.startIndex = currentViewData[0]["" + indexValue] + (this.parent.pageSettings.pageSize / 2);
            }
            if (scrollArgs.offset.top > (rowHeight * this.totalRecords)) {
                this.translateY = this.getTranslateY(scrollArgs.offset.top, content.getBoundingClientRect().height);
            }
            else {
                if (this.totalRecords === this.endIndex) {
                    if (this.totalRecords === this.endIndex) {
                        if (this.parent.isEdit) {
                            this.translateY = ((this.totalRecords * rowHeight) - (this.parent.pageSettings.pageSize * rowHeight))
                                + rowHeight;
                        }
                        else {
                            this.translateY = (this.totalRecords * rowHeight) - (this.parent.pageSettings.pageSize * rowHeight);
                        }
                    }
                }
                else {
                    if (this.parent.getFrozenColumns() > 0) {
                        this.translateY = scrollArgs.offset.top - ((rowHeight * 2) + this.parent.pageSettings.pageSize);
                    }
                    else {
                        this.translateY = scrollArgs.offset.top;
                    }
                }
            }
        }
        if (((downScroll && (scrollArgs.offset.top < (rowHeight * this.totalRecords)))
            || (upScroll)) || (scrollArgs.direction === 'right' || scrollArgs.direction === 'left') ||
            ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
                && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') && (downScroll || upScroll) || isCountRequired(this.parent))) {
            var viewInfo = this.currentInfo = getValue('getInfoFromView', this).apply(this, [scrollArgs.direction, info, scrollArgs.offset]);
            this.previousInfo = viewInfo;
            if (this.prevInfo && viewInfo.event !== 'refresh-virtual-block' && ((info.axis === 'Y' && this.prevInfo.blockIndexes.toString() === viewInfo.blockIndexes.toString())
                || ((info.axis === 'X' && this.prevInfo.columnIndexes.toString() === viewInfo.columnIndexes.toString())
                    || (this.parent.isFrozenGrid() && this.parent.getVisibleFrozenLeftCount() >= viewInfo.columnIndexes[0]
                        && this.prevInfo.columnIndexes.toString().includes(viewInfo.columnIndexes.toString()))))) {
                this.parent.removeMaskRow();
                if (Browser.isIE) {
                    this.parent.hideSpinner();
                }
                this.requestType = this.requestType === 'virtualscroll' ? this['empty'] : this.requestType;
                if (info.axis === 'Y') {
                    this.restoreEditState();
                }
                return;
            }
            this.parent.setColumnIndexesInView(this.parent.enableColumnVirtualization ? viewInfo.columnIndexes : []);
            var page = viewInfo.loadNext && !viewInfo.loadSelf ? viewInfo.nextInfo.page : viewInfo.page;
            this.parent.setProperties({ pageSettings: { currentPage: page } }, true);
            if (downScroll && this.endIndex === this.totalRecords && viewInfo.loadNext) {
                viewInfo.loadNext = false;
            }
            this.requestType = 'virtualscroll';
            if (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left') {
                viewInfo.event = viewInfo.event === 'refresh-virtual-block' ? 'model-changed' : viewInfo.event;
            }
            if (this.parent.enableVirtualMaskRow) {
                this.parent.showMaskRow(info.axis);
                this.parent.addShimmerEffect();
                this.parent.notify('showGanttShimmer', { requestType: 'showShimmer' });
            }
            this.parent.notify(viewInfo.event, { requestType: 'virtualscroll', virtualInfo: viewInfo, focusElement: scrollArgs.focusElement });
        }
        else {
            if (this.parent.enableVirtualMaskRow) {
                this.parent.removeMaskRow();
                this.parent.notify('removeGanttShimmer', { requestType: 'hideShimmer' });
            }
        }
    };
    /**
     * Prevents scrolling under specific conditions related to adding a new row.
     *
     * @param {ScrollArg} scrollArgs - The scroll event arguments containing offset details.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.shouldPreventScrolling = function (scrollArgs) {
        var addedRow = this.parent.element.querySelector('.e-addedrow');
        if (addedRow && this.rowPosition !== 'Top' && this.rowPosition !== 'Bottom' && scrollArgs.offset.top !== 0) {
            this.parent.closeEdit();
            return;
        }
    };
    /**
     * Appends content to the target element. Handles dynamic adjustments for remote data sources,
     * frozen columns, and virtual scrolling.
     *
     * @param {HTMLElement} target - The target HTML element where content is to be appended.
     * @param {DocumentFragment} newChild - The new content as a DocumentFragment to append.
     * @param {NotifyArgs} e - Object containing information about the operation.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.appendContent = function (target, newChild, e) {
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)
            || (this.parent.isFrozenGrid() && (e.requestType === undefined || !isNullOrUndefined(e.virtualInfo) && (e.virtualInfo.direction === 'right' || e.virtualInfo.direction === 'left')))) {
            if (getValue('isExpandCollapse', e)) {
                this.isRemoteExpand = true;
            }
            _super.prototype.appendContent.call(this, target, newChild, e);
            if (getValue('requestTypes', this).indexOf('isFrozen') !== -1) {
                getValue('requestTypes', this).splice(getValue('requestTypes', this).indexOf('isFrozen'), 1);
                this.requestType = this.requestType === 'isFrozen' ? undefined : this.requestType;
            }
        }
        else {
            var info = e.virtualInfo.sentinelInfo && e.virtualInfo.sentinelInfo.axis === 'Y' &&
                getValue('currentInfo', this).page && getValue('currentInfo', this).page !== e.virtualInfo.page ?
                getValue('currentInfo', this) : e.virtualInfo;
            var cBlock = (info.columnIndexes[0]) - 1;
            var cOffset = this.getColumnOffset(cBlock);
            var width = void 0;
            if (this.parent.enableColumnVirtualization) {
                this.header.virtualEle.adjustTable(cOffset, 0);
                var cIndex = info.columnIndexes;
                width = this.getColumnOffset(cIndex[cIndex.length - 1]) - this.getColumnOffset(cIndex[0] - 1) + '';
                this.header.virtualEle.setWrapperWidth(width);
            }
            this.virtualEle.setWrapperWidth(width, (Browser.isIE || Browser.info.name === 'edge'));
            target = this.parent.createElement('tbody');
            target.appendChild(newChild);
            var replace = 'replaceWith';
            this.getTable().querySelector('tbody')["" + replace](target);
            if (e.requestType === 'virtualscroll' && e.virtualInfo.sentinelInfo.axis === 'Y') {
                this.isExpandCollapse = false;
            }
            if (!this.isExpandCollapse || this.translateY === 0) {
                this.translateY = this.translateY < 0 ? 0 : this.translateY;
                getValue('virtualEle', this).adjustTable(cOffset, this.translateY);
            }
            else {
                this.isExpandCollapse = false;
            }
            setValue('prevInfo', this.previousInfo ? this.previousInfo : info, this);
            if (e.requestType === 'virtualscroll' && e.virtualInfo.sentinelInfo.axis === 'X') {
                this.parent.notify(events.autoCol, {});
            }
            var focusCell = 'focusCell';
            var restoreAdd = 'restoreAdd';
            var ensureSelectedRowPosition = 'ensureSelectedRowPosition';
            _super.prototype["" + focusCell].call(this, e);
            var isAdd = 'isAdd';
            if (this["" + isAdd] && !this.parent.getContent().querySelector('.e-content').querySelector('.e-addedrow')) {
                if (!(this.rowPosition === 'Top' || this.rowPosition === 'Bottom')) {
                    if (this.dataRowIndex >= this.startIndex) {
                        this.restoreNewRow();
                    }
                    else if (this.addRowIndex && this.addRowIndex > -1) {
                        this["" + isAdd] = false;
                        this.parent.isEdit = false;
                    }
                }
            }
            this.restoreEditState();
            _super.prototype["" + restoreAdd].call(this);
            _super.prototype["" + ensureSelectedRowPosition].call(this);
        }
    };
    /**
     * Unsubscribes all event listeners to prevent memory leaks.
     * This method is called when the component is being destroyed or when event listeners need to be cleaned up.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('data-ready', this.onDataReady);
        this.parent.off('content-ready', this.fn);
        this.parent.off('select-virtual-Row', this.toSelectVirtualRow);
        this.parent.off('dataBound', this.dataBoundEvent);
        this.parent.off('rowSelected', this.rowSelectedEvent);
        this.parent.off(events.virtualActionArgs, this.virtualOtherAction);
        this.parent.off(events.indexModifier, this.indexModifier);
        this.parent.off('virtual-scroll-edit-action-begin', this.beginEdit);
        this.parent.off('virtual-scroll-add-action-begin', this.beginAdd);
        this.parent.off('virtual-scroll-edit-success', this.virtualEditSuccess);
        this.parent.off('edit-reset', this.resetIseditValue);
        this.parent.off('get-virtual-data', this.getData);
        this.parent.off('virtual-scroll-edit-cancel', this.cancelEdit);
        this.parent.off('select-row-on-context-open', this.toSelectRowOnContextOpen);
        this.parent.off('refresh-virtual-editform-cells', this.refreshCell);
        this.parent.off('virtaul-cell-focus', this.cellFocus);
        this.parent.off('virtual-scroll-edit', this.restoreEditState);
    };
    return VirtualTreeContentRenderer;
}(VirtualContentRenderer));
export { VirtualTreeContentRenderer };
var TreeInterSectionObserver = /** @class */ (function (_super) {
    __extends(TreeInterSectionObserver, _super);
    function TreeInterSectionObserver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isWheeling = false;
        _this.newPos = 0;
        _this.lastPos = 0;
        _this.timer = 0;
        return _this;
    }
    /**
     * Sets up observers to monitor scroll events on a given container
     * and its movable companion within a virtual grid setup.
     *
     * @param {Function} callback - Function to call when a scroll event is detected.
     * @param {Function} onEnterCallback - Function to call when a specific event, like entering a region, is detected.
     * @param {IGrid} instance - The grid instance that requires observation.
     * @returns {void}
     */
    TreeInterSectionObserver.prototype.observes = function (callback, onEnterCallback, instance) {
        var containerRect = 'containerRect';
        _super.prototype["" + containerRect] = getValue('options', this).container.getBoundingClientRect();
        EventHandler.add(getValue('options', this).container, 'scroll', this.virtualScrollHandlers(callback, onEnterCallback, instance), this);
        if (getValue('options', this).movableContainer) {
            var movableContainerRect = 'movableContainerRect';
            _super.prototype["" + movableContainerRect] = getValue('options', this).movableContainer.getBoundingClientRect();
            EventHandler.add(getValue('options', this).movableContainer, 'scroll', this.virtualScrollHandlers(callback, onEnterCallback, instance), this);
        }
    };
    /**
     * Clears the last known position.
     *
     * @returns {void} No value is returned from this function.
     */
    TreeInterSectionObserver.prototype.clear = function () {
        this.lastPos = null;
    };
    /**
     * Handles virtual scrolling events and manages scroll direction and debouncing for rendering updates.
     *
     * @private
     * @param {Function} callback - Function to call on scroll end.
     * @param {Function} onEnterCallback - Function to call on entering a virtual scrolling area.
     * @param {IGrid} instance - The grid instance on which virtual scrolling is being implemented.
     * @returns {Function} - A function that processes scroll events.
     */
    TreeInterSectionObserver.prototype.virtualScrollHandlers = function (callback, onEnterCallback, instance) {
        var _this = this;
        var delay = Browser.info.name === 'chrome' ? 200 : 100;
        var options = 'options';
        var movableEle = 'movableEle';
        var element = 'element';
        var fromWheel = 'fromWheel';
        var debounced100 = debounce(callback, delay);
        var debounced50 = debounce(callback, 50);
        this["" + options].prevTop = this["" + options].prevLeft = 0;
        var isScrollByFocus = 'isScrollByFocus';
        return function (e) {
            if (instance.isEdit && instance.root.editModule["" + isScrollByFocus]) {
                instance.root.editModule["" + isScrollByFocus] = false;
                return;
            }
            var top = _this["" + options].movableContainer ? _this["" + options].container.scrollTop : e.target.scrollTop;
            var left = _this["" + options].movableContainer ? _this["" + options].scrollbar.scrollLeft : e.target.scrollLeft;
            var direction = _this["" + options].prevTop < top ? 'down' : 'up';
            direction = _this["" + options].prevLeft === left ? direction : _this["" + options].prevLeft < left ? 'right' : 'left';
            _this["" + options].prevTop = top;
            _this["" + options].prevLeft = left;
            var current = _this.sentinelInfo["" + direction];
            var delta = 0;
            _this.newPos = top;
            if (_this.lastPos != null) { // && newPos < maxScroll
                delta = _this.newPos - _this.lastPos;
            }
            _this.lastPos = _this.newPos;
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(_this.clear, 0);
            if ((delta > 100 || delta < -100) && (e && e.preventDefault)) {
                e.returnValue = false;
                e.preventDefault();
            }
            if (_this["" + options].axes.indexOf(current.axis) === -1) {
                return;
            }
            var containerRect = 'containerRect';
            _this["" + containerRect] = _this["" + options].container.getBoundingClientRect();
            var check = _this.check(direction);
            if (current.entered && (current.axis === 'X' || instance.enableVirtualMaskRow)) {
                if (_this["" + movableEle] && (direction === 'right' || direction === 'left')) {
                    onEnterCallback(_this["" + movableEle], current, direction, { top: top, left: left }, _this["" + fromWheel], check);
                }
                else {
                    onEnterCallback(_this["" + element], current, direction, { top: top, left: left }, _this["" + fromWheel], check);
                }
            }
            if (check) {
                var fn = debounced50;
                if (current.axis === 'X') {
                    fn({ direction: direction, sentinel: current, offset: { top: top, left: left },
                        focusElement: document.activeElement });
                }
                else {
                    if ((instance.dataSource instanceof DataManager && instance.dataSource.dataSource.url !== undefined
                        && !instance.dataSource.dataSource.offline && instance.dataSource.dataSource.url !== '') || isCountRequired(instance)
                        || instance.enableVirtualMaskRow) {
                        fn = instance.enableVirtualMaskRow ? debounced100 : fn;
                        fn({ direction: direction, sentinel: current, offset: { top: top, left: left },
                            focusElement: document.activeElement });
                    }
                    else {
                        callback({ direction: direction, sentinel: current, offset: { top: top, left: left },
                            focusElement: document.activeElement });
                    }
                }
            }
            _this["" + fromWheel] = false;
        };
    };
    return TreeInterSectionObserver;
}(InterSectionObserver));
export { TreeInterSectionObserver };
