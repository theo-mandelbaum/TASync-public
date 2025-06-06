import { Browser, EventHandler, createElement } from '@syncfusion/ej2-base';
import { isNullOrUndefined, isUndefined, addClass, removeClass } from '@syncfusion/ej2-base';
import { remove, closest, select } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { setCssInGridPopUp, getPosition, isGroupAdaptive, addRemoveActiveClasses, removeAddCboxClasses, getCellFromRow } from '../base/util';
import { getCellsByTableName, parentsUntil, getScrollBarWidth } from '../base/util';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { iterateExtend, setChecked, isComplexField, getObject } from '../base/util';
import { addRemoveEventListener } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * The `Selection` module is used to handle cell and row selection.
 */
var Selection = /** @class */ (function () {
    /**
     * Constructor for the Grid selection module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {SelectionSettings} selectionSettings - specifies the selectionsettings
     * @param {ServiceLocator} locator - specifies the ServiceLocator
     * @hidden
     */
    function Selection(parent, selectionSettings, locator) {
        //Internal letiables
        /**
         * @hidden
         */
        this.selectedRowIndexes = [];
        /**
         * @hidden
         */
        this.selectedRowCellIndexes = [];
        /**
         * @hidden
         */
        this.selectedRecords = [];
        /**
         * @hidden
         */
        this.preventFocus = false;
        /**
         *  @hidden
         */
        this.selectedColumnsIndexes = [];
        this.checkBoxState = false;
        this.isMultiShiftRequest = false;
        this.isMultiCtrlRequest = false;
        this.isMultiCtrlRequestCell = false;
        this.enableSelectMultiTouch = false;
        this.clearRowCheck = false;
        this.selectRowCheck = false;
        /**
         * @hidden
         */
        this.selectedRowState = {};
        this.unSelectedRowState = {};
        this.totalRecordsCount = 0;
        this.chkAllCollec = [];
        this.isCheckedOnAdd = false;
        this.persistSelectedData = [];
        this.virtualSelectedData = [];
        this.deSelectedData = [];
        this.isHdrSelectAllClicked = false;
        this.needColumnSelection = false;
        this.isCancelDeSelect = false;
        this.isPreventCellSelect = false;
        this.disableUI = false;
        this.isPersisted = false;
        this.cmdKeyPressed = false;
        this.cellselected = false;
        this.isMultiSelection = false;
        this.isAddRowsToSelection = false;
        this.initialRowSelection = false;
        this.isPrevRowSelection = false;
        this.isKeyAction = false;
        this.isRowDragSelected = false;
        this.isPartialSelection = false;
        this.rmtHdrChkbxClicked = false;
        this.isCheckboxReset = false;
        this.isRowDeselect = false;
        /**
         * @hidden
         */
        this.autoFillRLselection = true;
        this.isFocusLastCell = false;
        this.bottom = '0 0 2px 0';
        this.top = '2px 0 0 0';
        /* eslint-disable */
        this.right_bottom = '0 2px 2px 0';
        this.bottom_left = '0 0 2px 2px';
        this.top_right = '2px 2px 0 0';
        this.top_left = '2px 0 0 2px';
        this.top_bottom = '2px 0 2px 0';
        this.top_right_bottom = '2px 2px 2px 0';
        this.top_bottom_left = '2px 0 2px 2px';
        this.top_right_left = '2px 2px 0 2px';
        this.right_bottom_left = '0 2px 2px 2px';
        this.all_border = '2px';
        this.parent = parent;
        this.selectionSettings = selectionSettings;
        this.factory = locator.getService('rendererFactory');
        this.focus = locator.getService('focus');
        this.addEventListener();
        this.wireEvents();
    }
    Selection.prototype.initializeSelection = function () {
        this.parent.log('selection_key_missing');
        this.render();
    };
    /**
     * The function used to trigger onActionBegin
     *
     * @param {Object} args - specifies the args
     * @param {string} type - specifies the type
     * @returns {void}
     * @hidden
     */
    Selection.prototype.onActionBegin = function (args, type) {
        this.parent.trigger(type, this.fDataUpdate(args));
    };
    Selection.prototype.fDataUpdate = function (args) {
        if (!this.isMultiSelection && (!isNullOrUndefined(args.cellIndex) || !isNullOrUndefined(args.rowIndex))) {
            var rowObj = this.getRowObj(isNullOrUndefined(args.rowIndex) ? isNullOrUndefined(args.cellIndex) ?
                this.currentIndex : args.cellIndex.rowIndex : args.rowIndex);
            args.foreignKeyData = rowObj.foreignKeyData;
        }
        return args;
    };
    /**
     * The function used to trigger onActionComplete
     *
     * @param {Object} args - specifies the args
     * @param {string} type - specifies the type
     * @returns {void}
     * @hidden
     */
    Selection.prototype.onActionComplete = function (args, type) {
        this.parent.trigger(type, this.fDataUpdate(args));
        this.isMultiSelection = false;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    /**
     * To destroy the selection
     *
     * @returns {void}
     * @hidden
     */
    Selection.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement || (!gridElement.querySelector('.' + literals.gridHeader) && !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        this.hidePopUp();
        this.clearSelection();
        this.destroyAutoFillElements();
        this.removeEventListener();
        this.unWireEvents();
        EventHandler.remove(this.parent.getContent(), 'mousedown', this.mouseDownHandler);
        EventHandler.remove(this.parent.getHeaderContent(), 'mousedown', this.mouseDownHandler);
    };
    Selection.prototype.isEditing = function () {
        return (this.parent.editSettings.mode === 'Normal' || (this.parent.editSettings.mode === 'Batch' && this.parent.editModule &&
            this.parent.editModule.formObj && !this.parent.editModule.formObj.validate())) &&
            (this.parent.isEdit && !this.parent.editSettings.showAddNewRow) && !this.parent.isPersistSelection;
    };
    Selection.prototype.getCurrentBatchRecordChanges = function () {
        var gObj = this.parent;
        if (gObj.editSettings.mode === 'Batch' && gObj.editModule) {
            var currentRecords = iterateExtend(this.parent.getCurrentViewRecords());
            currentRecords = gObj.editSettings.newRowPosition === 'Bottom' ?
                currentRecords.concat(this.parent.editModule.getBatchChanges()[literals.addedRecords]) :
                this.parent.editModule.getBatchChanges()[literals.addedRecords].concat(currentRecords);
            var deletedRecords = this.parent.editModule.getBatchChanges()[literals.deletedRecords];
            var primaryKey = this.parent.getPrimaryKeyFieldNames()[0];
            for (var i = 0; i < (deletedRecords.length); i++) {
                for (var j = 0; j < currentRecords.length; j++) {
                    if (deletedRecords[parseInt(i.toString(), 10)]["" + primaryKey] === currentRecords[parseInt(j.toString(), 10)]["" + primaryKey]) {
                        currentRecords.splice(j, 1);
                        break;
                    }
                }
            }
            return currentRecords;
        }
        else if (this.parent.enableVirtualization && this.parent.groupSettings.columns.length && !this.parent.isPersistSelection) {
            var selectedGroupedData = gObj.getCurrentViewRecords().filter(function (col) { return col['key'] === undefined; });
            return selectedGroupedData;
        }
        else {
            return gObj.getCurrentViewRecords();
        }
    };
    /**
     * Selects a row by the given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    Selection.prototype.selectRow = function (index, isToggle) {
        if (this.selectedRowIndexes.length && this.selectionSettings.enableSimpleMultiRowSelection) {
            this.addRowsToSelection([index]);
            return;
        }
        var gObj = this.parent;
        var selectedRow = gObj.getRowByIndex(index);
        var rowObj = selectedRow && gObj.getRowObjectFromUID(selectedRow.getAttribute('data-uid'));
        if (this.isPartialSelection && rowObj && rowObj.isDataRow && !rowObj.isSelectable) {
            return;
        }
        var selectData;
        var isRemoved = false;
        if (gObj.enableVirtualization && index > -1) {
            var e = { selectedIndex: index, isAvailable: true };
            this.parent.notify(events.selectVirtualRow, e);
            if (selectedRow && (gObj.getRowObjectFromUID(selectedRow.getAttribute('data-uid')))) {
                selectData = gObj.getRowObjectFromUID(selectedRow.getAttribute('data-uid')).data;
            }
            else {
                if (e.isAvailable && !gObj.selectionSettings.persistSelection) {
                    var prevSelectedData = this.parent.getSelectedRecords();
                    if (prevSelectedData.length > 0) {
                        this.clearRowSelection();
                    }
                }
                return;
            }
        }
        else {
            selectData = this.getRowObj(index).data;
        }
        if (!this.isRowType() || !selectedRow || this.isEditing()) {
            // if (this.isEditing()) {
            //     gObj.selectedRowIndex = index;
            // }
            return;
        }
        var isRowSelected = selectedRow.hasAttribute('aria-selected');
        this.activeTarget();
        if (!isToggle || !this.selectedRowIndexes.length) {
            isToggle = false;
        }
        else {
            var isCheckboxModeResetOnRowClick = this.selectionSettings.checkboxMode === 'ResetOnRowClick';
            var isSelectionTypeMultiple = !this.parent.isCheckBoxSelection && this.selectionSettings.type === 'Multiple';
            if ((!isCheckboxModeResetOnRowClick && !isSelectionTypeMultiple) ||
                (this.selectedRowIndexes.length === 1 && (isCheckboxModeResetOnRowClick || isSelectionTypeMultiple))) {
                isToggle = !(this.isKeyAction && this.parent.isCheckBoxSelection) ? this.selectedRowIndexes.indexOf(index) !== -1 : false;
            }
            else {
                isToggle = false;
            }
        }
        this.isKeyAction = false;
        var args;
        var can = 'cancel';
        if (!isToggle) {
            args = {
                data: selectData, rowIndex: index, isCtrlPressed: this.isMultiCtrlRequest,
                isShiftPressed: this.isMultiShiftRequest, row: selectedRow,
                previousRow: gObj.getRowByIndex(this.prevRowIndex),
                previousRowIndex: this.prevRowIndex, target: this.actualTarget, cancel: false, isInteracted: this.isInteracted,
                isHeaderCheckboxClicked: this.isHeaderCheckboxClicked
            };
            this.parent.trigger(events.rowSelecting, this.fDataUpdate(args), this.rowSelectingCallBack(args, isToggle, index, selectData, isRemoved, isRowSelected, can));
        }
        else {
            if (this.selectionSettings.checkboxMode !== 'ResetOnRowClick' && this.selectionSettings.persistSelection) {
                this.rowDeselect(events.rowDeselecting, [rowObj.index], [rowObj.data], [selectedRow], [rowObj.foreignKeyData], this.actualTarget);
                if (this.isCancelDeSelect) {
                    return;
                }
                if (!this.parent.isCheckBoxSelection) {
                    this.selectedRowIndexes = [];
                    this.selectedRecords = [];
                    this.isRowSelected = false;
                    this.selectRowIndex(-1);
                }
                this.rowDeselect(events.rowDeselected, [rowObj.index], [rowObj.data], [selectedRow], [rowObj.foreignKeyData], this.actualTarget, undefined, undefined, undefined);
            }
            this.rowSelectingCallBack(args, isToggle, index, selectData, isRemoved, isRowSelected, can)(args);
        }
    };
    Selection.prototype.rowSelectingCallBack = function (args, isToggle, index, selectData, isRemoved, isRowSelected, can) {
        var _this = this;
        return function (args) {
            if (!isNullOrUndefined(args) && args["" + can] === true) {
                _this.disableInteracted();
                return;
            }
            _this.index = index;
            _this.toggle = isToggle;
            _this.data = selectData;
            _this.removed = isRemoved;
            if (isRowSelected && _this.selectionSettings.persistSelection && !(_this.selectionSettings.checkboxMode === 'ResetOnRowClick')) {
                _this.clearSelectedRow(index);
                _this.selectRowCallBack();
            }
            else if (!isRowSelected && _this.selectionSettings.persistSelection && _this.parent.isCheckBoxSelection &&
                _this.selectionSettings.checkboxMode !== 'ResetOnRowClick') {
                _this.selectRowCallBack();
            }
            if (_this.selectionSettings.checkboxMode === 'ResetOnRowClick') {
                _this.isCheckboxReset = true;
                _this.clearSelection();
            }
            if (!_this.selectionSettings.persistSelection || _this.selectionSettings.checkboxMode === 'ResetOnRowClick' ||
                (!_this.parent.isCheckBoxSelection && _this.selectionSettings.persistSelection)) {
                _this.selectRowCheck = true;
                _this.clearRow();
            }
        };
    };
    Selection.prototype.selectRowCallBack = function () {
        var gObj = this.parent;
        var args;
        var index = this.index;
        var isToggle = this.toggle;
        var selectData = this.data;
        var isRemoved = this.removed;
        var selectedRow = gObj.getRowByIndex(index);
        if (!isToggle && !isRemoved) {
            if (this.selectedRowIndexes.indexOf(index) <= -1) {
                this.updateRowSelection(selectedRow, index);
            }
            this.selectRowIndex(index);
        }
        if (!isToggle) {
            args = {
                data: selectData, rowIndex: index,
                row: selectedRow, previousRow: gObj.getRowByIndex(this.prevRowIndex),
                previousRowIndex: this.prevRowIndex, target: this.actualTarget, isInteracted: this.isInteracted,
                isHeaderCheckBoxClicked: this.isHeaderCheckboxClicked, rowIndexes: index
            };
            this.onActionComplete(args, events.rowSelected);
        }
        this.isInteracted = false;
        this.updateRowProps(index);
    };
    /**
     * Selects a range of rows from start and end row indexes.
     *
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @returns {void}
     */
    Selection.prototype.selectRowsByRange = function (startIndex, endIndex) {
        this.selectRows(this.getCollectionFromIndexes(startIndex, endIndex));
        this.selectRowIndex(endIndex);
    };
    Selection.prototype.selectedDataUpdate = function (selectedData, foreignKeyData, selectedRows, rowIndexes, selectableRowIndex) {
        for (var i = 0, len = rowIndexes.length; i < len; i++) {
            var currentRow = this.parent.getDataRows()[rowIndexes[parseInt(i.toString(), 10)]];
            if (this.parent.enableVirtualization) {
                currentRow = this.parent.getRowByIndex(rowIndexes[parseInt(i.toString(), 10)]);
            }
            var rowObj = this.getRowObj(currentRow);
            if (rowObj && rowObj.isDataRow && rowObj.isSelectable) {
                selectedData.push(rowObj.data);
                selectedRows.push(currentRow);
                foreignKeyData.push(rowObj.foreignKeyData);
            }
            else {
                if (this.isPartialSelection && selectableRowIndex) {
                    selectableRowIndex.splice(selectableRowIndex.indexOf(rowIndexes[parseInt(i.toString(), 10)]), 1);
                }
            }
        }
    };
    /**
     * Selects a collection of rows by index.
     *
     * @param  {number[]} rowIndexes - Specifies an array of row indexes.
     * @returns {void}
     */
    Selection.prototype.selectRows = function (rowIndexes) {
        var _this = this;
        var gObj = this.parent;
        var selectableRowIndex = rowIndexes.slice();
        var rowIndex = !this.isSingleSel() ? rowIndexes[0] : rowIndexes[rowIndexes.length - 1];
        this.isMultiSelection = true;
        var selectedRows = [];
        var foreignKeyData = [];
        var can = 'cancel';
        var selectedData = [];
        if (!this.isRowType() || this.isEditing()) {
            return;
        }
        this.selectedDataUpdate(selectedData, foreignKeyData, selectedRows, rowIndexes, selectableRowIndex);
        this.activeTarget();
        var args = {
            cancel: false,
            rowIndexes: selectableRowIndex, row: selectedRows, rowIndex: rowIndex, target: this.actualTarget,
            prevRow: gObj.getRows()[this.prevRowIndex], previousRowIndex: this.prevRowIndex,
            isInteracted: this.isInteracted, isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest,
            data: selectedData, isHeaderCheckboxClicked: this.isHeaderCheckboxClicked, foreignKeyData: foreignKeyData
        };
        this.parent.trigger(events.rowSelecting, this.fDataUpdate(args), function (args) {
            if (!isNullOrUndefined(args) && args["" + can] === true) {
                _this.disableInteracted();
                return;
            }
            if (!(_this.selectionSettings.persistSelection && gObj.allowRowDragAndDrop && _this.isDragged)) {
                _this.clearRow();
            }
            _this.selectRowIndex(selectableRowIndex.slice(-1)[0]);
            var selectRowFn = function (index, preventFocus) {
                _this.updateRowSelection(gObj.getRowByIndex(index), index, preventFocus);
                _this.updateRowProps(rowIndex);
            };
            if (!_this.isSingleSel()) {
                for (var _i = 0, selectableRowIndex_1 = selectableRowIndex; _i < selectableRowIndex_1.length; _i++) {
                    var rowIdx = selectableRowIndex_1[_i];
                    selectRowFn(rowIdx, gObj.enableVirtualization ? true : false);
                }
            }
            else {
                selectRowFn(rowIndex);
            }
            if (_this.checkVirtualCheckBox() && !_this.parent.isPersistSelection) {
                if (selectableRowIndex.length === _this.totalRecordsCount) {
                    _this.virtualSelectedData = _this.virtualCheckBoxData().slice();
                    _this.selectedRowIndexes = Object.keys(_this.virtualSelectedData).map(function (key) { return parseInt(key, 10); });
                    _this.setCheckAllState();
                }
                else {
                    var selectionData = selectableRowIndex.filter(function (index) {
                        return _this.selectedRowIndexes.indexOf(index) === -1;
                    });
                    if (selectionData.length > 0) {
                        var allData = _this.virtualCheckBoxData().slice();
                        for (var i = 0; i < selectionData.length; i++) {
                            var record = allData[selectionData[i]];
                            if (!isNullOrUndefined(record)) {
                                _this.virtualSelectedData.push(record);
                                _this.selectedRowIndexes.push(selectionData[i]);
                            }
                        }
                        _this.setCheckAllState();
                    }
                }
            }
            args = {
                rowIndexes: selectableRowIndex, row: selectedRows, rowIndex: rowIndex, target: _this.actualTarget,
                prevRow: gObj.getRows()[_this.prevRowIndex], previousRowIndex: _this.prevRowIndex,
                data: _this.getSelectedRecords(), isInteracted: _this.isInteracted,
                isHeaderCheckboxClicked: _this.isHeaderCheckboxClicked, foreignKeyData: foreignKeyData
            };
            if (_this.isRowSelected) {
                _this.onActionComplete(args, events.rowSelected);
            }
            _this.isInteracted = false;
        });
    };
    /**
     * Select rows with existing row selection by passing row indexes.
     *
     * @param {number} rowIndexes - Specifies the row indexes.
     * @returns {void}
     * @hidden
     */
    Selection.prototype.addRowsToSelection = function (rowIndexes) {
        var gObj = this.parent;
        var can = 'cancel';
        var target = this.target;
        this.isMultiSelection = true;
        var selectedRows = [];
        var foreignKeyData = [];
        var selectedData = [];
        var indexes = gObj.getSelectedRowIndexes().concat(rowIndexes);
        var selectedRow = !this.isSingleSel() ? gObj.getRowByIndex(rowIndexes[0]) :
            gObj.getRowByIndex(rowIndexes[rowIndexes.length - 1]);
        if ((!this.isRowType() || this.isEditing()) && !this.selectionSettings.checkboxOnly) {
            return;
        }
        var args;
        var checkboxColumn = this.parent.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (this.isMultiCtrlRequest && !checkboxColumn.length) {
            this.selectedDataUpdate(selectedData, foreignKeyData, selectedRows, indexes);
        }
        for (var _i = 0, rowIndexes_1 = rowIndexes; _i < rowIndexes_1.length; _i++) {
            var rowIndex = rowIndexes_1[_i];
            var rowObj = this.getRowObj(rowIndex);
            var isUnSelected = this.selectedRowIndexes.indexOf(rowIndex) > -1;
            if (this.isPartialSelection && rowObj && rowObj.isDataRow && !rowObj.isSelectable) {
                continue;
            }
            this.selectRowIndex(rowIndex);
            if (isUnSelected && ((checkboxColumn.length ? true : this.selectionSettings.enableToggle) || this.isMultiCtrlRequest)) {
                this.isAddRowsToSelection = true;
                this.rowDeselect(events.rowDeselecting, [rowIndex], [rowObj.data], [selectedRow], [rowObj.foreignKeyData], target);
                if (this.isCancelDeSelect) {
                    return;
                }
                if (this.checkVirtualCheckBox() && !this.parent.isPersistSelection) {
                    this.virtualSelectedData.splice(this.virtualSelectedData.indexOf(rowObj.data), 1);
                }
                this.selectedRowIndexes.splice(this.selectedRowIndexes.indexOf(rowIndex), 1);
                this.selectedRecords.splice(this.selectedRecords.indexOf(selectedRow), 1);
                this.selectRowIndex(this.selectedRowIndexes.length ? this.selectedRowIndexes[this.selectedRowIndexes.length - 1] : -1);
                selectedRow.removeAttribute('aria-selected');
                this.addRemoveClassesForRow(selectedRow, false, null, 'e-selectionbackground', 'e-active');
                this.rowDeselect(events.rowDeselected, [rowIndex], [rowObj.data], [selectedRow], [rowObj.foreignKeyData], target, undefined, undefined, undefined);
                this.isInteracted = false;
                this.isMultiSelection = false;
                this.isAddRowsToSelection = false;
                this.isHdrSelectAllClicked = false;
            }
            else {
                this.activeTarget();
                args = {
                    cancel: false,
                    data: selectedData.length ? selectedData : rowObj.data, rowIndex: rowIndex, row: selectedRows.length ? selectedRows :
                        selectedRow, target: this.actualTarget, prevRow: gObj.getRows()[this.prevRowIndex],
                    previousRowIndex: this.prevRowIndex, isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest,
                    foreignKeyData: foreignKeyData.length ? foreignKeyData : rowObj.foreignKeyData, isInteracted: this.isInteracted,
                    isHeaderCheckboxClicked: this.isHeaderCheckboxClicked, rowIndexes: indexes
                };
                this.parent.trigger(events.rowSelecting, this.fDataUpdate(args));
                if (!isNullOrUndefined(args) && args["" + can] === true) {
                    this.disableInteracted();
                    return;
                }
                if (this.isSingleSel()) {
                    this.clearRow();
                }
                this.updateRowSelection(selectedRow, rowIndex);
            }
            if (!isUnSelected) {
                args = {
                    data: selectedData.length ? selectedData : rowObj.data, rowIndex: rowIndex, row: selectedRows.length ? selectedRows :
                        selectedRow, target: this.actualTarget, prevRow: gObj.getRows()[this.prevRowIndex],
                    previousRowIndex: this.prevRowIndex, foreignKeyData: foreignKeyData.length ? foreignKeyData : rowObj.foreignKeyData,
                    isInteracted: this.isInteracted, isHeaderCheckboxClicked: this.isHeaderCheckboxClicked, rowIndexes: indexes
                };
                this.onActionComplete(args, events.rowSelected);
            }
            this.isInteracted = false;
            this.updateRowProps(rowIndex);
            if (this.isSingleSel()) {
                break;
            }
        }
    };
    Selection.prototype.getCollectionFromIndexes = function (startIndex, endIndex) {
        var indexes = [];
        // eslint-disable-next-line prefer-const
        var _a = (startIndex <= endIndex) ?
            { i: startIndex, max: endIndex } : { i: endIndex, max: startIndex }, i = _a.i, max = _a.max;
        for (; i <= max; i++) {
            indexes.push(i);
        }
        if (startIndex > endIndex) {
            indexes.reverse();
        }
        return indexes;
    };
    Selection.prototype.clearRow = function () {
        this.clearRowCheck = true;
        this.clearRowSelection();
    };
    Selection.prototype.clearRowCallBack = function () {
        if (this.isCancelDeSelect && this.parent.checkAllRows !== 'Check') {
            return;
        }
        this.selectedRowIndexes = [];
        this.selectedRecords = [];
        this.selectRowIndex(-1);
        if (this.isSingleSel() && this.parent.isPersistSelection) {
            this.selectedRowState = {};
        }
    };
    Selection.prototype.clearSelectedRow = function (index) {
        if (this.toggle) {
            var selectedEle = this.parent.getRowByIndex(index);
            if (!this.disableUI) {
                selectedEle.removeAttribute('aria-selected');
                this.addRemoveClassesForRow(selectedEle, false, true, 'e-selectionbackground', 'e-active');
            }
            this.removed = true;
            this.updatePersistCollection(selectedEle, false);
            this.updateCheckBoxes(selectedEle);
            this.selectedRowIndexes.splice(this.selectedRowIndexes.indexOf(index), 1);
            this.selectedRecords.splice(this.selectedRecords.indexOf(this.parent.getRowByIndex(index)), 1);
        }
    };
    Selection.prototype.updateRowProps = function (startIndex) {
        this.prevRowIndex = startIndex;
        this.isRowSelected = this.selectedRowIndexes.length && true;
    };
    Selection.prototype.getPkValue = function (pkField, data) {
        return pkField ? isComplexField(pkField) ? getObject(pkField, data) : data["" + pkField] : data["" + pkField];
    };
    Selection.prototype.updatePersistCollection = function (selectedRow, chkState) {
        var _this = this;
        if ((this.parent.isPersistSelection || this.parent.selectionSettings.persistSelection &&
            this.parent.getPrimaryKeyFieldNames().length > 0) && !isNullOrUndefined(selectedRow)) {
            if (!this.parent.isPersistSelection) {
                this.ensureCheckboxFieldSelection();
            }
            var rowObj = this.getRowObj(selectedRow);
            var pKey_1 = rowObj.data ? this.getPkValue(this.primaryKey, rowObj.data) : null;
            if (pKey_1 === null) {
                return;
            }
            rowObj.isSelected = chkState;
            if ((chkState && !this.isPartialSelection) || (this.isPartialSelection && rowObj.isSelectable && rowObj.isSelected)) {
                this.selectedRowState["" + pKey_1] = chkState;
                delete (this.unSelectedRowState["" + pKey_1]);
                if (!this.persistSelectedData.some(function (data) { return _this.getPkValue(_this.primaryKey, data) === pKey_1; })) {
                    this.persistSelectedData.push(rowObj.data);
                }
            }
            else {
                this.updatePersistDelete(pKey_1);
            }
        }
    };
    Selection.prototype.updatePersistDelete = function (pKey, isPartialSelection) {
        var _this = this;
        delete (this.selectedRowState["" + pKey]);
        if (this.rmtHdrChkbxClicked) {
            this.unSelectedRowState["" + pKey] = true;
        }
        var index;
        var isPresent = this.persistSelectedData.some(function (data, i) {
            index = i;
            return _this.getPkValue(_this.primaryKey, data) === pKey;
        });
        if (isPresent) {
            this.persistSelectedData.splice(index, 1);
            if (isPartialSelection) {
                this.parent.partialSelectedRecords.splice(index, 1);
            }
        }
    };
    Selection.prototype.updateCheckBoxes = function (row, chkState, rowIndex) {
        if (!isNullOrUndefined(row)) {
            var chkBox = row.querySelector('.e-checkselect');
            if (!isNullOrUndefined(chkBox)) {
                removeAddCboxClasses(chkBox.nextElementSibling, chkState);
                setChecked(chkBox, chkState);
                if (isNullOrUndefined(this.checkedTarget) || (!isNullOrUndefined(this.checkedTarget)
                    && !this.checkedTarget.classList.contains('e-checkselectall'))) {
                    this.setCheckAllState(rowIndex);
                }
            }
        }
    };
    Selection.prototype.updateRowSelection = function (selectedRow, startIndex, preventFocus) {
        if (!selectedRow) {
            return;
        }
        if (this.selectedRowIndexes.indexOf(startIndex) === -1) {
            if (this.checkVirtualCheckBox() && !this.parent.isPersistSelection) {
                this.virtualSelectedData.push(this.parent.getRowObjectFromUID(selectedRow.getAttribute('data-uid')).data);
            }
            this.selectedRowIndexes.push(startIndex);
            this.selectedRecords.push(selectedRow);
        }
        selectedRow.setAttribute('aria-selected', 'true');
        this.updatePersistCollection(selectedRow, true);
        this.updateCheckBoxes(selectedRow, true);
        this.addRemoveClassesForRow(selectedRow, true, null, 'e-selectionbackground', 'e-active');
        if (!this.preventFocus && !(this.parent.isFocusFirstCell || this.isFocusLastCell)) {
            var target = this.focus.getPrevIndexes().cellIndex ?
                selectedRow.cells[this.focus.getPrevIndexes().cellIndex] :
                selectedRow.querySelector('.e-selectionbackground:not(.e-hide):not(.e-detailrowcollapse):not(.e-detailrowexpand)');
            if (this.parent.contextMenuModule && this.mouseButton === 2) {
                target = this.parent.contextMenuModule.cell;
            }
            if (!target || preventFocus) {
                return;
            }
            this.focus.onClick({ target: target }, true);
        }
        else {
            if (this.parent.isFocusFirstCell || this.isFocusLastCell) {
                this.parent.isFocusFirstCell = false;
                var selector = this.isFocusLastCell ? 'last-child' : 'first-child';
                var target = selectedRow.querySelector('.e-selectionbackground.e-rowcell:not(.e-hide, .e-detailrowcollapse, .e-detailrowexpand, .e-rowdragdrop, .e-gridchkbox):' + selector);
                this.isFocusLastCell = false;
                if (target) {
                    this.focus.onClick({ target: target }, true, true);
                }
            }
        }
    };
    /**
     * Deselects the currently selected rows and cells.
     *
     * @returns {void}
     */
    Selection.prototype.clearSelection = function () {
        this.checkSelectAllClicked = true;
        if (this.selectionSettings.persistSelection && this.persistSelectedData.length) {
            this.deSelectedData = iterateExtend(this.persistSelectedData);
        }
        if (!this.parent.isPersistSelection || (this.parent.isPersistSelection && !this.parent.isEdit) ||
            (!isNullOrUndefined(this.checkedTarget) && this.checkedTarget.classList.contains('e-checkselectall'))) {
            var span = this.parent.element.querySelector('.e-gridpopup').querySelector('span');
            if (span.classList.contains('e-rowselect')) {
                span.classList.remove('e-spanclicked');
            }
            if (this.parent.isPersistSelection) {
                this.persistSelectedData = [];
                this.selectedRowState = {};
            }
            this.clearRowSelection();
            this.clearCellSelection();
            this.clearColumnSelection();
            this.prevRowIndex = undefined;
            this.prevCIdxs = undefined;
            this.prevECIdxs = undefined;
            this.enableSelectMultiTouch = false;
            this.isInteracted = false;
            this.checkSelectAllClicked = false;
            this.isHdrSelectAllClicked = false;
        }
    };
    /**
     * Deselects the currently selected rows.
     *
     * @returns {void}
     */
    Selection.prototype.clearRowSelection = function () {
        var _this = this;
        if (this.isRowSelected) {
            var rows_1 = this.parent.getDataRows();
            var data_1 = [];
            var row_1 = [];
            var rowIndex_1 = [];
            var foreignKeyData_1 = [];
            var target_1 = this.target;
            this.isRowDeselect = true;
            for (var i = 0, len = this.selectedRowIndexes.length; i < len; i++) {
                var currentRow = void 0;
                if (this.parent.enableVirtualization || (this.parent.enableInfiniteScrolling
                    && this.parent.infiniteScrollSettings.enableCache)) {
                    currentRow = this.parent.getRowByIndex(this.selectedRowIndexes[parseInt(i.toString(), 10)]);
                }
                else {
                    currentRow = this.parent.editSettings.mode === 'Batch' ?
                        this.parent.getRows()[this.selectedRowIndexes[parseInt(i.toString(), 10)]]
                        : this.parent.getDataRows()[this.selectedRowIndexes[parseInt(i.toString(), 10)]];
                }
                var rowObj = this.getRowObj(currentRow);
                if (rowObj) {
                    data_1.push(rowObj.data);
                    row_1.push(currentRow);
                    rowIndex_1.push(this.selectedRowIndexes[parseInt(i.toString(), 10)]);
                    foreignKeyData_1.push(rowObj.foreignKeyData);
                }
            }
            if (this.selectionSettings.persistSelection && this.selectionSettings.checkboxMode !== 'ResetOnRowClick') {
                this.isRowClicked = this.checkSelectAllClicked ? true : false;
            }
            this.rowDeselect(events.rowDeselecting, rowIndex_1, data_1, row_1, foreignKeyData_1, target_1, null, function () {
                if (_this.isCancelDeSelect && (_this.isRowClicked || _this.checkSelectAllClicked || (_this.isInteracted &&
                    !_this.parent.isPersistSelection))) {
                    if (_this.parent.isPersistSelection) {
                        if (_this.getCheckAllStatus(_this.parent.element.querySelector('.e-checkselectall')) === 'Intermediate' || _this.parent.isPersistSelection) {
                            for (var i = 0; i < _this.selectedRecords.length; i++) {
                                _this.updatePersistCollection(_this.selectedRecords[parseInt(i.toString(), 10)], true);
                            }
                        }
                        else {
                            _this.parent.checkAllRows = 'Check';
                            _this.updatePersistSelectedData(true);
                        }
                    }
                    if (_this.clearRowCheck) {
                        _this.clearRowCallBack();
                        _this.clearRowCheck = false;
                        if (_this.selectRowCheck) {
                            _this.selectRowCallBack();
                            _this.selectRowCheck = false;
                        }
                    }
                    return;
                }
                var element = [].slice.call(rows_1.filter(function (record) { return record.hasAttribute('aria-selected'); }));
                for (var j = 0; j < element.length; j++) {
                    if (!_this.disableUI) {
                        element[parseInt(j.toString(), 10)].removeAttribute('aria-selected');
                        _this.addRemoveClassesForRow(element[parseInt(j.toString(), 10)], false, true, 'e-selectionbackground', 'e-active');
                    }
                    // tslint:disable-next-line:align
                    if (!_this.isPrevRowSelection) {
                        _this.updatePersistCollection(element[parseInt(j.toString(), 10)], false);
                    }
                    _this.updateCheckBoxes(element[parseInt(j.toString(), 10)]);
                }
                if ((_this.parent.enableVirtualization || (_this.parent.enableInfiniteScrolling
                    && _this.parent.infiniteScrollSettings.enableCache)) && _this.selectedRecords.length && !element.length
                    && !_this.parent.selectionSettings.persistSelection && !_this.disableUI
                    && !_this.parent.isCheckBoxSelection) {
                    _this.addRemoveClassesForRow(null, false, true);
                }
                _this.virtualSelectedData = [];
                _this.selectedRowIndexes = [];
                _this.selectedRecords = [];
                _this.isRowSelected = false;
                _this.selectRowIndex(-1);
                _this.isPrevRowSelection = false;
                _this.rowDeselect(events.rowDeselected, rowIndex_1, data_1, row_1, foreignKeyData_1, target_1, null, undefined, null);
                if (_this.clearRowCheck) {
                    _this.clearRowCallBack();
                    _this.clearRowCheck = false;
                    if (_this.selectRowCheck) {
                        _this.selectRowCallBack();
                        _this.selectRowCheck = false;
                    }
                }
            }, null);
            this.isRowDeselect = false;
        }
        else {
            if (this.clearRowCheck) {
                this.clearRowCallBack();
                this.clearRowCheck = false;
                if (this.selectRowCheck) {
                    this.selectRowCallBack();
                    this.selectRowCheck = false;
                }
            }
        }
    };
    Selection.prototype.rowDeselect = function (type, rowIndex, data, row, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    foreignKeyData, target, mRow, rowDeselectCallBack, frozenRightRow) {
        var _this = this;
        if ((this.selectionSettings.persistSelection && (this.isRowClicked || !this.isRowDeselect || this.checkSelectAllClicked || (this.focus['activeKey'] &&
            this.focus.currentInfo.element.classList.contains('e-gridchkbox') && this.focus['activeKey'] === 'space'))) ||
            !this.selectionSettings.persistSelection) {
            var cancl_1 = 'cancel';
            var isSingleDeSel = rowIndex.length === 1 && this.deSelectedData.length === 1;
            var rowDeselectObj = {
                rowIndex: rowIndex[0], data: this.selectionSettings.persistSelection && (this.parent.checkAllRows === 'Uncheck' &&
                    !isSingleDeSel) && this.selectionSettings.checkboxMode !== 'ResetOnRowClick' ? this.deSelectedData : data,
                foreignKeyData: foreignKeyData, cancel: false, isInteracted: this.isInteracted,
                isHeaderCheckboxClicked: this.isHeaderCheckboxClicked
            };
            if (type === 'rowDeselected') {
                delete rowDeselectObj.cancel;
            }
            var rowInString = 'row';
            var target_2 = 'target';
            var rowidx = 'rowIndex';
            var rowidxex = 'rowIndexes';
            var dataTxt = 'data';
            var foreignKey = 'foreignKeyData';
            rowDeselectObj["" + rowInString] = row;
            rowDeselectObj["" + target_2] = this.actualTarget;
            var isHeaderCheckBxClick = this.actualTarget && !isNullOrUndefined(closest(this.actualTarget, 'thead'));
            if (isHeaderCheckBxClick || rowIndex.length > 1) {
                rowDeselectObj["" + rowidx] = rowIndex[0];
                rowDeselectObj["" + rowidxex] = rowIndex;
            }
            else if (rowIndex.length === 1) {
                rowDeselectObj["" + dataTxt] = rowDeselectObj["" + dataTxt][0];
                rowDeselectObj["" + rowInString] = rowDeselectObj["" + rowInString][0];
                rowDeselectObj["" + foreignKey] = rowDeselectObj["" + foreignKey][0];
                if (this.isAddRowsToSelection) {
                    rowDeselectObj["" + rowidxex] = rowIndex;
                }
            }
            this.parent.trigger(type, rowDeselectObj, function (args) {
                _this.isCancelDeSelect = args["" + cancl_1];
                if (!_this.isCancelDeSelect || (!_this.isRowClicked && !_this.isInteracted && !_this.checkSelectAllClicked)) {
                    _this.updatePersistCollection(row[0], false);
                    _this.updateCheckBoxes(row[0], undefined, rowIndex[0]);
                }
                if (rowDeselectCallBack !== undefined) {
                    rowDeselectCallBack();
                }
            });
        }
        else if (this.selectionSettings.persistSelection && !this.isInteracted) {
            if (rowDeselectCallBack !== undefined) {
                rowDeselectCallBack();
            }
        }
    };
    Selection.prototype.getRowObj = function (row) {
        if (row === void 0) { row = this.currentIndex; }
        if (isNullOrUndefined(row)) {
            return {};
        }
        if (typeof row === 'number') {
            row = this.parent.getRowByIndex(row);
        }
        if (row) {
            return this.parent.getRowObjectFromUID(row.getAttribute('data-uid')) || {};
        }
        return {};
    };
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    Selection.prototype.selectCell = function (cellIndex, isToggle) {
        if (!this.isCellType() || (this.isCellType() && (this.parent.enableVirtualization ||
            (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache)))) {
            return;
        }
        var gObj = this.parent;
        var args;
        var selectedCell = gObj.getCellFromIndex(cellIndex.rowIndex, this.getColIndex(cellIndex.rowIndex, cellIndex.cellIndex));
        this.currentIndex = cellIndex.rowIndex;
        var selectedData = this.getCurrentBatchRecordChanges()[this.currentIndex];
        if (!this.isCellType() || !selectedCell || this.isEditing()) {
            return;
        }
        var isCellSelected = selectedCell.classList.contains('e-cellselectionbackground');
        isToggle = !isToggle ? isToggle : (!isUndefined(this.prevCIdxs) &&
            cellIndex.rowIndex === this.prevCIdxs.rowIndex && cellIndex.cellIndex === this.prevCIdxs.cellIndex &&
            isCellSelected);
        if (!isToggle) {
            args = {
                data: selectedData, cellIndex: cellIndex,
                isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest,
                previousRowCell: this.prevECIdxs ?
                    this.getCellIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined,
                cancel: false
            };
            var currentCell = 'currentCell';
            args["" + currentCell] = selectedCell;
            var previousRowCellIndex = 'previousRowCellIndex';
            args["" + previousRowCellIndex] = this.prevECIdxs;
            this.parent.trigger(events.cellSelecting, this.fDataUpdate(args), this.successCallBack(args, isToggle, cellIndex, selectedCell, selectedData));
            this.cellselected = true;
        }
        else {
            this.successCallBack(args, isToggle, cellIndex, selectedCell, selectedData)(args);
        }
    };
    Selection.prototype.successCallBack = function (cellSelectingArgs, isToggle, cellIndex, selectedCell, selectedData) {
        var _this = this;
        return function (cellSelectingArgs) {
            var cncl = 'cancel';
            var currentCell = 'currentCell';
            if (!isNullOrUndefined(cellSelectingArgs) && cellSelectingArgs["" + cncl] === true) {
                return;
            }
            if (!isToggle) {
                cellSelectingArgs["" + currentCell] = cellSelectingArgs["" + currentCell] ? cellSelectingArgs["" + currentCell] : selectedCell;
            }
            _this.clearCell();
            if (!isToggle) {
                _this.updateCellSelection(selectedCell, cellIndex.rowIndex, cellIndex.cellIndex);
            }
            if (!isToggle) {
                var args = {
                    data: selectedData, cellIndex: cellIndex, currentCell: selectedCell,
                    selectedRowCellIndex: _this.selectedRowCellIndexes,
                    previousRowCell: _this.prevECIdxs ?
                        _this.getCellIndex(_this.prevECIdxs.rowIndex, _this.prevECIdxs.cellIndex) : undefined
                };
                var previousRowCellIndex = 'previousRowCellIndex';
                args["" + previousRowCellIndex] = _this.prevECIdxs;
                _this.updateCellProps(cellIndex, cellIndex);
                _this.onActionComplete(args, events.cellSelected);
            }
        };
    };
    Selection.prototype.getCellIndex = function (rIdx, cIdx) {
        return this.parent.getCellFromIndex(rIdx, cIdx);
    };
    /**
     * Selects a range of cells from start and end indexes.
     *
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     * @returns {void}
     */
    Selection.prototype.selectCellsByRange = function (startIndex, endIndex) {
        var _this = this;
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = this.parent.isSpan ? getCellFromRow(this.parent, startIndex.rowIndex, startIndex.cellIndex) :
            gObj.getCellFromIndex(startIndex.rowIndex, startIndex.cellIndex);
        var min;
        var max;
        var stIndex = startIndex;
        var edIndex = endIndex = endIndex ? endIndex : startIndex;
        var cellIndexes;
        this.currentIndex = startIndex.rowIndex;
        var cncl = 'cancel';
        var selectedData = this.getCurrentBatchRecordChanges()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        var args = {
            data: selectedData, cellIndex: startIndex, currentCell: selectedCell,
            isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest,
            previousRowCell: this.prevECIdxs ? this.getCellIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        };
        var previousRowCellIndex = 'previousRowCellIndex';
        args["" + previousRowCellIndex] = this.prevECIdxs;
        this.parent.trigger(events.cellSelecting, this.fDataUpdate(args), function (cellSelectingArgs) {
            if (!isNullOrUndefined(cellSelectingArgs) && cellSelectingArgs["" + cncl] === true) {
                return;
            }
            _this.clearCell();
            if (startIndex.rowIndex > endIndex.rowIndex) {
                var temp = startIndex;
                startIndex = endIndex;
                endIndex = temp;
            }
            for (var i = startIndex.rowIndex; i <= endIndex.rowIndex; i++) {
                if (_this.selectionSettings.cellSelectionMode.indexOf('Box') < 0) {
                    min = i === startIndex.rowIndex ? (startIndex.cellIndex) : 0;
                    max = i === endIndex.rowIndex ? (endIndex.cellIndex) : _this.getLastColIndex(i);
                }
                else {
                    min = startIndex.cellIndex;
                    max = endIndex.cellIndex;
                }
                cellIndexes = [];
                for (var j = min < max ? min : max, len = min > max ? min : max; j <= len; j++) {
                    selectedCell = _this.parent.isSpan ? getCellFromRow(gObj, i, j) : gObj.getCellFromIndex(i, j);
                    if (!selectedCell) {
                        continue;
                    }
                    cellIndexes.push(j);
                    _this.updateCellSelection(selectedCell);
                    _this.addAttribute(selectedCell);
                }
                _this.selectedRowCellIndexes.push({ rowIndex: i, cellIndexes: cellIndexes });
            }
            var cellSelectedArgs = {
                data: selectedData, cellIndex: edIndex, currentCell: gObj.getCellFromIndex(edIndex.rowIndex, edIndex.cellIndex),
                selectedRowCellIndex: _this.selectedRowCellIndexes,
                previousRowCell: _this.prevECIdxs ? _this.getCellIndex(_this.prevECIdxs.rowIndex, _this.prevECIdxs.cellIndex) : undefined
            };
            var previousRowCellIndex = 'previousRowCellIndex';
            cellSelectedArgs["" + previousRowCellIndex] = _this.prevECIdxs;
            if (!_this.isDragged) {
                _this.onActionComplete(cellSelectedArgs, events.cellSelected);
                _this.cellselected = true;
            }
            _this.updateCellProps(stIndex, edIndex);
        });
    };
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void}
     */
    Selection.prototype.selectCells = function (rowCellIndexes) {
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = gObj.getCellFromIndex(rowCellIndexes[0].rowIndex, rowCellIndexes[0].cellIndexes[0]);
        this.currentIndex = rowCellIndexes[0].rowIndex;
        var selectedData = this.getCurrentBatchRecordChanges()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        var cellSelectArgs = {
            data: selectedData, cellIndex: rowCellIndexes[0].cellIndexes[0],
            currentCell: selectedCell, isCtrlPressed: this.isMultiCtrlRequest,
            isShiftPressed: this.isMultiShiftRequest,
            previousRowCell: this.prevECIdxs ? this.getCellIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        };
        var previousRowCellIndex = 'previousRowCellIndex';
        cellSelectArgs["" + previousRowCellIndex] = this.prevECIdxs;
        this.onActionBegin(cellSelectArgs, events.cellSelecting);
        for (var i = 0, len = rowCellIndexes.length; i < len; i++) {
            for (var j = 0, cellLen = rowCellIndexes[parseInt(i.toString(), 10)].cellIndexes.length; j < cellLen; j++) {
                selectedCell = gObj.getCellFromIndex(rowCellIndexes[parseInt(i.toString(), 10)].rowIndex, rowCellIndexes[parseInt(i.toString(), 10)].cellIndexes[parseInt(j.toString(), 10)]);
                if (!selectedCell) {
                    continue;
                }
                this.updateCellSelection(selectedCell);
                this.addAttribute(selectedCell);
                this.addRowCellIndex({ rowIndex: rowCellIndexes[parseInt(i.toString(), 10)].rowIndex,
                    cellIndex: rowCellIndexes[parseInt(i.toString(), 10)].cellIndexes[parseInt(j.toString(), 10)] });
            }
        }
        this.updateCellProps({ rowIndex: rowCellIndexes[0].rowIndex, cellIndex: rowCellIndexes[0].cellIndexes[0] }, { rowIndex: rowCellIndexes[0].rowIndex, cellIndex: rowCellIndexes[0].cellIndexes[0] });
        var cellSelectedArgs = {
            data: selectedData, cellIndex: rowCellIndexes[0].cellIndexes[0],
            currentCell: selectedCell, selectedRowCellIndex: this.selectedRowCellIndexes,
            previousRowCell: this.prevECIdxs ? this.getCellIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        };
        var prvRowCellIndex = 'previousRowCellIndex';
        cellSelectedArgs["" + prvRowCellIndex] = this.prevECIdxs;
        this.onActionComplete(cellSelectedArgs, events.cellSelected);
    };
    /**
     * Select cells with existing cell selection by passing row and column index.
     *
     * @param {IIndex} cellIndexes - Defines the collection of row and column index.
     * @returns {void}
     * @hidden
     */
    Selection.prototype.addCellsToSelection = function (cellIndexes) {
        if (!this.isCellType() || (this.isCellType() && (this.parent.enableVirtualization ||
            (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache)))) {
            return;
        }
        var gObj = this.parent;
        var selectedCell;
        var index;
        this.currentIndex = cellIndexes[0].rowIndex;
        var cncl = 'cancel';
        var selectedData = this.getCurrentBatchRecordChanges()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        this.hideAutoFill();
        var rowObj;
        rowObj = gObj.getRowsObject()[cellIndexes[0].rowIndex];
        if (gObj.groupSettings.columns.length > 0) {
            rowObj = gObj.getRowObjectFromUID(this.target.parentElement.getAttribute('data-uid'));
        }
        var foreignKeyData = [];
        for (var _i = 0, cellIndexes_1 = cellIndexes; _i < cellIndexes_1.length; _i++) {
            var cellIndex = cellIndexes_1[_i];
            for (var i = 0, len = this.selectedRowCellIndexes.length; i < len; i++) {
                if (this.selectedRowCellIndexes[parseInt(i.toString(), 10)].rowIndex === cellIndex.rowIndex) {
                    index = i;
                    break;
                }
            }
            selectedCell = gObj.getCellFromIndex(cellIndex.rowIndex, this.getColIndex(cellIndex.rowIndex, cellIndex.cellIndex));
            var idx = cellIndex.cellIndex;
            if (gObj.groupSettings.columns.length > 0) {
                foreignKeyData.push(rowObj.cells[idx + gObj.groupSettings.columns.length].foreignKeyData);
            }
            else {
                foreignKeyData.push(rowObj.cells[parseInt(idx.toString(), 10)].foreignKeyData);
            }
            var args = {
                cancel: false, data: selectedData, cellIndex: cellIndexes[0],
                isShiftPressed: this.isMultiShiftRequest,
                currentCell: selectedCell, isCtrlPressed: this.isMultiCtrlRequest,
                previousRowCell: this.prevECIdxs ?
                    gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
            };
            var prvRowCellIndex = 'previousRowCellIndex';
            args["" + prvRowCellIndex] = this.prevECIdxs;
            var isUnSelected = index > -1;
            if (isUnSelected) {
                var selectedCellIdx = this.selectedRowCellIndexes[parseInt(index.toString(), 10)].cellIndexes;
                if (selectedCellIdx.indexOf(cellIndex.cellIndex) > -1 || (this.selectionSettings.mode === 'Both' &&
                    selectedCell.classList.contains('e-gridchkbox') && !selectedCell.getAttribute('aria-selected'))) {
                    this.cellDeselect(events.cellDeselecting, [{ rowIndex: cellIndex.rowIndex, cellIndexes: [cellIndex.cellIndex] }], selectedData, [selectedCell], foreignKeyData);
                    selectedCellIdx.splice(selectedCellIdx.indexOf(cellIndex.cellIndex), 1);
                    if (selectedCellIdx.length === 0) {
                        this.selectedRowCellIndexes.splice(index, 1);
                    }
                    selectedCell.classList.remove('e-cellselectionbackground');
                    selectedCell.removeAttribute('aria-selected');
                    this.cellDeselect(events.cellDeselected, [{ rowIndex: cellIndex.rowIndex, cellIndexes: [cellIndex.cellIndex] }], selectedData, [selectedCell], foreignKeyData);
                }
                else {
                    isUnSelected = false;
                    this.onActionBegin(args, events.cellSelecting);
                    this.addRowCellIndex({ rowIndex: cellIndex.rowIndex, cellIndex: cellIndex.cellIndex });
                    this.updateCellSelection(selectedCell);
                    this.addAttribute(selectedCell);
                }
            }
            else {
                this.onActionBegin(args, events.cellSelecting);
                if (!isNullOrUndefined(args) && args["" + cncl] === true) {
                    return;
                }
                this.updateCellSelection(selectedCell, cellIndex.rowIndex, cellIndex.cellIndex);
            }
            if (!isUnSelected) {
                var cellSelectedArgs = {
                    data: selectedData, cellIndex: cellIndexes[0], currentCell: selectedCell,
                    previousRowCell: this.prevECIdxs ? this.getCellIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) :
                        undefined, selectedRowCellIndex: this.selectedRowCellIndexes
                };
                cellSelectedArgs["" + prvRowCellIndex] = this.prevECIdxs;
                this.onActionComplete(cellSelectedArgs, events.cellSelected);
                this.cellselected = true;
            }
            this.updateCellProps(cellIndex, cellIndex);
        }
    };
    Selection.prototype.getColIndex = function (rowIndex, index) {
        var col = this.parent.getColumnByIndex(index);
        var cells = getCellsByTableName(this.parent, col, rowIndex);
        if (cells) {
            for (var m = 0; m < cells.length; m++) {
                var colIndex = parseInt(cells[parseInt(m.toString(), 10)].getAttribute(literals.ariaColIndex), 10) - 1;
                if (colIndex === index) {
                    return m;
                }
            }
        }
        return -1;
    };
    Selection.prototype.getLastColIndex = function (rowIndex) {
        var cells = this.parent.getDataRows()[parseInt(rowIndex.toString(), 10)].querySelectorAll('td.e-rowcell');
        return parseInt(cells[cells.length - 1].getAttribute(literals.ariaColIndex), 10) - 1;
    };
    Selection.prototype.clearCell = function () {
        this.clearCellSelection();
    };
    Selection.prototype.cellDeselect = function (type, cellIndexes, data, cells, foreignKeyData) {
        var cancl = 'cancel';
        if (cells && cells.length > 0) {
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var cell = cells_1[_i];
                if (cell && cell.classList.contains(literals.gridChkBox)) {
                    this.updateCheckBoxes(closest(cell, 'tr'));
                }
            }
        }
        var args = {
            cells: cells, data: data, cellIndexes: cellIndexes, foreignKeyData: foreignKeyData, cancel: false
        };
        this.parent.trigger(type, args);
        this.isPreventCellSelect = args["" + cancl];
    };
    Selection.prototype.updateCellSelection = function (selectedCell, rowIndex, cellIndex) {
        if (!isNullOrUndefined(rowIndex)) {
            this.addRowCellIndex({ rowIndex: rowIndex, cellIndex: cellIndex });
        }
        selectedCell.classList.add('e-cellselectionbackground');
        if (selectedCell.classList.contains(literals.gridChkBox)) {
            this.updateCheckBoxes(closest(selectedCell, 'tr'), true);
        }
        this.addAttribute(selectedCell);
    };
    Selection.prototype.addAttribute = function (cell) {
        this.target = cell;
        if (!isNullOrUndefined(cell)) {
            cell.setAttribute('aria-selected', 'true');
            if (!this.preventFocus) {
                this.focus.onClick({ target: cell }, true);
            }
        }
    };
    Selection.prototype.updateCellProps = function (startIndex, endIndex) {
        this.prevCIdxs = startIndex;
        this.prevECIdxs = endIndex;
        this.isCellSelected = this.selectedRowCellIndexes.length && true;
    };
    Selection.prototype.addRowCellIndex = function (rowCellIndex) {
        var isRowAvail;
        var index;
        for (var i = 0, len = this.selectedRowCellIndexes.length; i < len; i++) {
            if (this.selectedRowCellIndexes[parseInt(i.toString(), 10)].rowIndex === rowCellIndex.rowIndex) {
                isRowAvail = true;
                index = i;
                break;
            }
        }
        if (isRowAvail) {
            if (this.selectedRowCellIndexes[parseInt(index.toString(), 10)].cellIndexes.indexOf(rowCellIndex.cellIndex) < 0) {
                this.selectedRowCellIndexes[parseInt(index.toString(), 10)].cellIndexes.push(rowCellIndex.cellIndex);
            }
        }
        else {
            this.selectedRowCellIndexes.push({ rowIndex: rowCellIndex.rowIndex, cellIndexes: [rowCellIndex.cellIndex] });
        }
    };
    /**
     * Deselects the currently selected cells.
     *
     * @returns {void}
     */
    Selection.prototype.clearCellSelection = function () {
        if (this.isCellSelected) {
            var gObj = this.parent;
            var selectedCells = this.getSelectedCellsElement();
            var rowCell = this.selectedRowCellIndexes;
            var data = [];
            var cells = [];
            var foreignKeyData = [];
            var currentViewData = this.getCurrentBatchRecordChanges();
            this.hideAutoFill();
            for (var i = 0, len = rowCell.length; i < len; i++) {
                data.push(currentViewData[rowCell[parseInt(i.toString(), 10)].rowIndex]);
                var rowObj = this.getRowObj(rowCell[parseInt(i.toString(), 10)].rowIndex);
                for (var j = 0, cLen = rowCell[parseInt(i.toString(), 10)].cellIndexes.length; j < cLen; j++) {
                    if (rowObj.cells) {
                        foreignKeyData.push(rowObj.cells[rowCell[parseInt(i.toString(), 10)]
                            .cellIndexes[parseInt(j.toString(), 10)]].foreignKeyData);
                    }
                    cells.push(gObj.getCellFromIndex(rowCell[parseInt(i.toString(), 10)].rowIndex, rowCell[parseInt(i.toString(), 10)].cellIndexes[parseInt(j.toString(), 10)]));
                }
            }
            this.cellDeselect(events.cellDeselecting, rowCell, data, cells, foreignKeyData);
            if (this.isPreventCellSelect === true) {
                return;
            }
            for (var i = 0, len = selectedCells.length; i < len; i++) {
                selectedCells[parseInt(i.toString(), 10)].classList.remove('e-cellselectionbackground');
                selectedCells[parseInt(i.toString(), 10)].removeAttribute('aria-selected');
            }
            if (this.bdrElement) {
                this.showHideBorders('none');
            }
            this.selectedRowCellIndexes = [];
            this.isCellSelected = false;
            if (!this.isDragged && this.cellselected) {
                this.cellDeselect(events.cellDeselected, rowCell, data, cells, foreignKeyData);
            }
        }
    };
    Selection.prototype.getSelectedCellsElement = function () {
        var gObj = this.parent;
        var rows = gObj.getDataRows();
        var cells = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            cells = cells.concat([].slice.call(rows[parseInt(i.toString(), 10)].getElementsByClassName('e-cellselectionbackground')));
        }
        return cells;
    };
    Selection.prototype.mouseMoveHandler = function (e) {
        e.preventDefault();
        this.stopTimer();
        var gBRect = this.parent.element.getBoundingClientRect();
        var x1 = this.x;
        var y1 = this.y;
        var position = getPosition(e);
        var x2 = position.x - gBRect.left;
        var y2 = position.y - gBRect.top;
        var tmp;
        var target = closest(e.target, 'tr');
        this.isDragged = true;
        if (!this.isCellDrag) {
            if (!target) {
                target = closest(document.elementFromPoint(this.parent.element.offsetLeft + 2, e.clientY), 'tr');
            }
            if (x1 > x2) {
                tmp = x2;
                x2 = x1;
                x1 = tmp;
            }
            if (y1 > y2) {
                tmp = y2;
                y2 = y1;
                y1 = tmp;
            }
            this.element.style.left = x1 + 'px';
            this.element.style.top = y1 + 'px';
            this.element.style.width = x2 - x1 + 'px';
            this.element.style.height = y2 - y1 + 'px';
        }
        if (target && !e.ctrlKey && !e.shiftKey) {
            var rowIndex = parseInt(target.getAttribute(literals.ariaRowIndex), 10) - 1;
            if (!this.isCellDrag) {
                this.hideAutoFill();
                this.selectRowsByRange(this.startDIndex, rowIndex);
                this.isRowDragSelected = true;
            }
            else {
                var td = parentsUntil(e.target, literals.rowCell);
                if (td) {
                    this.startAFCell = this.startCell;
                    this.endAFCell = parentsUntil(e.target, literals.rowCell);
                    if (rowIndex > -1) {
                        this.selectLikeExcel(e, rowIndex, parseInt(td.getAttribute(literals.ariaColIndex), 10) - 1);
                    }
                }
            }
        }
        if (!e.ctrlKey && !e.shiftKey && !this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling &&
            !this.parent.enableColumnVirtualization && !this.parent.groupSettings.columns.length && this.isCellDrag) {
            this.updateScrollPosition(e, position, this.parent.getContent());
        }
    };
    Selection.prototype.updateScrollPosition = function (mouseEvent, position, scrollElement) {
        var _this = this;
        var clientRect = scrollElement.getBoundingClientRect();
        if (clientRect.left >= position.x - 20 -
            (this.parent.enableRtl && this.parent.height !== 'auto' ? getScrollBarWidth() : 0)) {
            this.timer1 = window.setInterval(function () { _this.setScrollPosition(scrollElement.firstElementChild, _this.parent.enableRtl ? 'right' : 'left', mouseEvent); }, 200);
        }
        else if (clientRect.left + scrollElement.clientWidth - 20 -
            (!this.parent.enableRtl && this.parent.height !== 'auto' ? getScrollBarWidth() : 0) < position.x) {
            this.timer1 = window.setInterval(function () { _this.setScrollPosition(scrollElement.firstElementChild, _this.parent.enableRtl ? 'left' : 'right', mouseEvent); }, 200);
        }
        if (clientRect.top >= position.y - (this.parent.getRowHeight() * 0.5)) {
            this.timer2 = window.setInterval(function () { _this.setScrollPosition(scrollElement.firstElementChild, 'up', mouseEvent); }, 200);
        }
        else if (clientRect.top + scrollElement.clientHeight - (this.parent.getRowHeight() * 0.5) -
            (scrollElement.firstElementChild.scrollWidth > scrollElement.firstElementChild.offsetWidth ?
                getScrollBarWidth() : 0) <= position.y) {
            this.timer2 = window.setInterval(function () { _this.setScrollPosition(scrollElement.firstElementChild, 'down', mouseEvent); }, 200);
        }
    };
    Selection.prototype.stopTimer = function () {
        if (this.timer1) {
            window.clearInterval(this.timer1);
            this.timer1 = null;
        }
        if (this.timer2) {
            window.clearInterval(this.timer2);
            this.timer2 = null;
        }
        this.preventFocus = false;
    };
    Selection.prototype.setScrollPosition = function (scrollElement, direction, mouseEvent) {
        var rowIndex = -1;
        var columnIndex = -1;
        if (this.endAFCell || this.prevECIdxs) {
            rowIndex = this.endAFCell ? parseInt(this.endAFCell.getAttribute('index'), 10) : this.prevECIdxs.rowIndex;
            columnIndex = this.endAFCell ? parseInt(this.endAFCell.getAttribute('aria-colindex'), 10) - 1 : this.prevECIdxs.cellIndex;
        }
        switch (direction) {
            case 'up':
                if (mouseEvent && closest(mouseEvent.target, '.e-headercontent')) {
                    return;
                }
                if (this.isAutoFillSel && this.startAFCell && this.selectedRowCellIndexes.length &&
                    ((this.selectedRowCellIndexes.length === 1 && this.startAFCell !== this.startCell) ||
                        (this.selectedRowCellIndexes.length > 1 && this.startAFCell.getBoundingClientRect().top > 0))) {
                    rowIndex = parseInt(this.startAFCell.getAttribute('index'), 10);
                }
                rowIndex -= 1;
                if (this.parent.frozenRows) {
                    rowIndex += this.parent.frozenRows + 1;
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                rowIndex < 1 ? scrollElement.scrollTop = 0 : scrollElement.scrollTop -= this.parent.getRowByIndex(rowIndex)
                    .offsetHeight;
                break;
            case 'down':
                if (this.isAutoFillSel && this.startAFCell && this.startAFCell !== this.startCell) {
                    rowIndex = parseInt(this.startAFCell.getAttribute('index'), 10);
                }
                if (rowIndex < this.parent.getRows().length - 1) {
                    rowIndex += 1;
                    if (this.isAutoFillSel && this.startAFCell && this.startAFCell !== this.startCell) {
                        this.startAFCell = this.parent.getCellFromIndex(rowIndex, this.selectedRowCellIndexes[0].cellIndexes[0]);
                    }
                    scrollElement.scrollTop += this.parent.getRowByIndex(rowIndex).offsetHeight;
                }
                else {
                    scrollElement.scrollTop = scrollElement.scrollHeight;
                }
                break;
            case 'left':
                if (columnIndex > 0 && rowIndex > -1) {
                    if (this.isAutoFillSel && this.startAFCell && this.selectedRowCellIndexes.length &&
                        ((this.selectedRowCellIndexes[0].cellIndexes.length > 0 && this.startAFCell !== this.startCell) ||
                            (this.selectedRowCellIndexes[0].cellIndexes.length > 1 &&
                                ((!this.parent.enableRtl && this.startAFCell.getBoundingClientRect().left > 0) || (this.parent.enableRtl &&
                                    this.startAFCell.getBoundingClientRect().left < this.parent.element.offsetWidth))))) {
                        columnIndex = parseInt(this.startAFCell.getAttribute('aria-colindex'), 10) - 1;
                    }
                    var nextElement_1 = this.findNextCell(scrollElement, direction, columnIndex, rowIndex);
                    columnIndex = nextElement_1 ? parseInt(nextElement_1.getAttribute('aria-colindex'), 10) - 1 : -1;
                    if (this.parent.enableRtl && nextElement_1) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        columnIndex < 1 ? scrollElement.scrollLeft = scrollElement.scrollWidth :
                            scrollElement.scrollLeft += nextElement_1.offsetWidth;
                    }
                    else if (nextElement_1) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        columnIndex < 1 ? scrollElement.scrollLeft = 0 : scrollElement.scrollLeft -= nextElement_1.offsetWidth;
                    }
                }
                break;
            case 'right':
                if (this.isAutoFillSel && this.startAFCell && this.startAFCell !== this.startCell) {
                    columnIndex = parseInt(this.startAFCell.getAttribute('aria-colindex'), 10) - 1;
                }
                // eslint-disable-next-line no-case-declarations
                var currentElement = this.parent.getCellFromIndex(rowIndex, columnIndex);
                // eslint-disable-next-line no-case-declarations
                var nextElement = this.findNextCell(scrollElement, direction, columnIndex, rowIndex);
                if (nextElement && this.isAutoFillSel && this.startAFCell && this.startAFCell !== this.startCell) {
                    this.startAFCell = this.parent.getCellFromIndex(this.selectedRowCellIndexes[0].rowIndex, parseInt(nextElement.getAttribute('aria-colindex'), 10) - 1);
                }
                columnIndex = nextElement ? parseInt(nextElement.getAttribute('aria-colindex'), 10) - 1 : -1;
                if (this.parent.enableRtl && nextElement) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    columnIndex < this.parent.columns.length - 1 ? scrollElement.scrollLeft -= currentElement.offsetWidth :
                        scrollElement.scrollLeft = -scrollElement.scrollWidth;
                }
                else if (nextElement) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    columnIndex < this.parent.columns.length - 1 ? scrollElement.scrollLeft += currentElement.offsetWidth :
                        scrollElement.scrollLeft = scrollElement.scrollWidth;
                }
                if (this.isAutoFillSel && (columnIndex === this.parent.columns.length - 1 || columnIndex === -1) &&
                    this.startAFCell && this.endAFCell) {
                    this.positionAFBorders();
                    scrollElement.scrollLeft = this.parent.enableRtl ? -scrollElement.scrollWidth : scrollElement.scrollWidth;
                }
                break;
        }
        if (rowIndex > -1 && rowIndex < this.parent.getRows().length && columnIndex > -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var mouseEvent_1 = { target: this.parent.getCellFromIndex(rowIndex, columnIndex) };
            if (this.isAutoFillSel && mouseEvent_1.target.classList.contains('e-cellselectionbackground') &&
                ((direction === 'down' && parseInt(mouseEvent_1.target.getAttribute('index'), 10) === this.parent.getRows().length - 1) ||
                    (direction === 'right' && parseInt(mouseEvent_1.target.getAttribute('aria-colindex'), 10) - 1 === this.parent.columns.length - 1))) {
                return;
            }
            this.endAFCell = mouseEvent_1.target;
            this.preventFocus = true;
            this.selectLikeExcel(mouseEvent_1, rowIndex, columnIndex);
        }
    };
    Selection.prototype.findNextCell = function (scrollElement, direction, columnIndex, rowIndex) {
        var nextElement = this.parent.getCellFromIndex(rowIndex, direction === 'left' ? columnIndex - 1 : columnIndex + 1);
        if (nextElement && nextElement.classList.contains('e-hide')) {
            var siblingEles = nextElement.closest('tr').querySelectorAll('.e-rowcell:not(.e-hide)');
            var nextEleInd = Array.from(siblingEles).indexOf(nextElement.nextElementSibling);
            if (nextEleInd > 0 && nextEleInd < siblingEles.length - 1) {
                nextElement = siblingEles[nextEleInd + (direction === 'left' ? -1 : 1)];
                return nextElement;
            }
            else {
                scrollElement.scrollLeft = 0;
                return null;
            }
        }
        return nextElement;
    };
    Selection.prototype.selectLikeExcel = function (e, rowIndex, cellIndex) {
        if (!this.isAutoFillSel) {
            this.clearCellSelection();
            this.selectCellsByRange({ rowIndex: this.startDIndex, cellIndex: this.startDCellIndex }, { rowIndex: rowIndex, cellIndex: cellIndex });
            this.drawBorders();
        }
        else { //Autofill
            this.showAFBorders();
            this.selectLikeAutoFill(e);
        }
    };
    Selection.prototype.setFrozenBorders = function (parentEle, border, bdrStr) {
        var width = border.style.borderWidth.toString().split(' ');
        var strCell = ['', 'e-leftfreeze', 'e-unfreeze', 'e-leftfreeze', 'e-unfreeze', 'e-rightfreeze', 'e-rightfreeze'];
        var cells = [].slice.call(parentEle.querySelectorAll('.e-cellselectionbackground' + '.' + strCell["" + bdrStr])).
            filter(function (ele) { return ele.style.display === ''; });
        var fixedCells = [].slice.call(parentEle.querySelectorAll('.e-cellselectionbackground.e-fixedfreeze')).
            filter(function (ele) { return ele.style.display === ''; });
        var isRtl = this.parent.enableRtl;
        if (cells.length) {
            var firstRowIdx = cells[0].getAttribute('index');
            var firstColIdx = cells[0].getAttribute('aria-colindex');
            var lastRowIdx = cells[cells.length - 1].getAttribute('index');
            var lastColIdx = cells[cells.length - 1].getAttribute('aria-colindex');
            for (var i = 0; i < cells.length; i++) {
                if (cells[parseInt(i.toString(), 10)].getAttribute('index') === firstRowIdx && (width.length === 1 || (width.length === 3
                    && parseInt(width[0], 10) === 2) || (width.length === 4 && parseInt(width[0], 10) === 2))) {
                    cells[parseInt(i.toString(), 10)].classList.add('e-xlsel-top-border');
                }
                if (cells[parseInt(i.toString(), 10)].getAttribute('aria-colindex') === firstColIdx && (width.length === 1 ||
                    (width.length === 3 && parseInt(width[1], 10) === 2) || (width.length === 4 && (((!isRtl &&
                    parseInt(width[3], 10) === 2)) || (isRtl && parseInt(width[1], 10) === 2))))) {
                    cells[parseInt(i.toString(), 10)].classList.add(isRtl ? 'e-xlsel-right-border' : 'e-xlsel-left-border');
                }
                if (cells[parseInt(i.toString(), 10)].getAttribute('index') === lastRowIdx && (width.length === 1 ||
                    (width.length === 3 && parseInt(width[2], 10) === 2) || (width.length === 4 && parseInt(width[2], 10) === 2))) {
                    cells[parseInt(i.toString(), 10)].classList.add('e-xlsel-bottom-border');
                }
                if (cells[parseInt(i.toString(), 10)].getAttribute('aria-colindex') === lastColIdx && (width.length === 1 ||
                    (width.length === 3 && parseInt(width[1], 10) === 2) || (width.length === 4 && ((!isRtl &&
                    parseInt(width[1], 10) === 2)) || (isRtl && parseInt(width[3], 10) === 2)))) {
                    cells[parseInt(i.toString(), 10)].classList.add(isRtl ? 'e-xlsel-left-border' : 'e-xlsel-right-border');
                }
            }
        }
        if (fixedCells.length) {
            var firstRowIdx = fixedCells[0].getAttribute('index');
            var firstColIdx = (parseInt(fixedCells[0].getAttribute('aria-colindex'), 10) - 1).toString();
            var lastRowIdx = fixedCells[fixedCells.length - 1].getAttribute('index');
            var lastColIdx = (parseInt(fixedCells[fixedCells.length - 1].getAttribute('aria-colindex'), 10) - 1).toString();
            for (var i = 0; i < fixedCells.length; i++) {
                var idx = fixedCells[parseInt(i.toString(), 10)].getAttribute('index');
                var colIdx = (parseInt(fixedCells[parseInt(i.toString(), 10)].getAttribute('aria-colindex'), 10) - 1).toString();
                if (idx === firstRowIdx &&
                    ((!this.parent.getHeaderContent().querySelector('.e-cellselectionbackground.e-fixedfreeze')
                        && parentsUntil(parentEle, 'e-content')) || !parentsUntil(parentEle, 'e-content'))) {
                    fixedCells[parseInt(i.toString(), 10)].classList.add('e-xlsel-top-border');
                }
                if (idx === lastRowIdx &&
                    ((!this.parent.getContent().querySelector('.e-cellselectionbackground.e-fixedfreeze')
                        && parentsUntil(parentEle, 'e-headercontent')) || !parentsUntil(parentEle, 'e-headercontent'))) {
                    fixedCells[parseInt(i.toString(), 10)].classList.add('e-xlsel-bottom-border');
                }
                var preCell = fixedCells[parseInt(i.toString(), 10)].parentElement.children[parseInt(colIdx, 10) - 1];
                if (colIdx === firstColIdx && (!preCell || (preCell && !preCell.classList.contains('e-cellselectionbackground')))) {
                    fixedCells[parseInt(i.toString(), 10)].classList.add(isRtl ? 'e-xlsel-right-border' : 'e-xlsel-left-border');
                }
                var nextCell = fixedCells[parseInt(i.toString(), 10)].parentElement.children[parseInt(colIdx, 10) + 1];
                if (colIdx === lastColIdx && (!nextCell || (nextCell && !nextCell.classList.contains('e-cellselectionbackground')))) {
                    fixedCells[parseInt(i.toString(), 10)].classList.add(isRtl ? 'e-xlsel-left-border' : 'e-xlsel-right-border');
                }
            }
        }
    };
    Selection.prototype.refreshFrozenBorders = function () {
        if (this.bdrElement) {
            this.setFrozenBorders(this.parent.getContentTable(), this.bdrElement, '1');
            if (this.parent.isFrozenGrid() && this.parent.getFrozenMode() === literals.leftRight) {
                this.setFrozenBorders(this.parent.getContentTable(), this.frcBdrElement, '5');
            }
            if (this.parent.frozenRows) {
                this.setFrozenBorders(this.parent.getHeaderTable(), this.fhBdrElement, '3');
                if (this.parent.isFrozenGrid() && this.parent.getFrozenMode() === literals.leftRight) {
                    this.setFrozenBorders(this.parent.getHeaderTable(), this.frhBdrElement, '6');
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Selection.prototype.drawBorders = function () {
        if (this.selectionSettings.cellSelectionMode === 'BoxWithBorder' && this.selectedRowCellIndexes.length && !this.parent.isEdit) {
            this.parent.element.classList.add('e-enabledboxbdr');
            if (!this.bdrElement) {
                this.createBorders();
            }
            this.positionBorders();
            if (this.parent.isFrozenGrid()) {
                this.showHideBorders('none', true);
                this.refreshFrozenBorders();
            }
        }
        else {
            this.showHideBorders('none');
        }
    };
    Selection.prototype.isLastCell = function (cell) {
        var cells = [].slice.call(cell.parentElement.querySelectorAll('.e-rowcell:not(.e-hide)'));
        return cells[cells.length - 1] === cell;
    };
    Selection.prototype.isLastRow = function (cell) {
        var rows = [].slice.call(closest(cell, literals.tbody).querySelectorAll('.e-row:not(.e-hiddenrow)'));
        return cell.parentElement === rows[rows.length - 1];
    };
    Selection.prototype.isFirstRow = function (cell) {
        var rows = [].slice.call(closest(cell, literals.tbody).querySelectorAll('.e-row:not(.e-hiddenrow)'));
        return cell.parentElement === rows[0];
    };
    Selection.prototype.isFirstCell = function (cell) {
        var cells = [].slice.call(cell.parentElement.querySelectorAll('.e-rowcell:not(.e-hide)'));
        return cells[0] === cell;
    };
    Selection.prototype.setBorders = function (parentEle, border, bdrStr) {
        var cells = [].slice.call(parentEle.getElementsByClassName('e-cellselectionbackground')).
            filter(function (ele) { return ele.style.display === ''; });
        if (cells.length && this.parent.isFrozenGrid()) {
            var strCell = ['', 'e-leftfreeze', 'e-unfreeze', 'e-leftfreeze', 'e-unfreeze', 'e-rightfreeze', 'e-rightfreeze'];
            cells = [].slice.call(parentEle.querySelectorAll('.e-cellselectionbackground' + '.' + strCell["" + bdrStr] + ':not(.e-hide)')).
                filter(function (ele) { return ele.style.display === ''; });
        }
        if (cells.length) {
            var isFrozen = this.parent.isFrozenGrid();
            var start = cells[0];
            var end = cells[cells.length - 1];
            var stOff = start.getBoundingClientRect();
            var endOff = end.getBoundingClientRect();
            var parentOff = start.offsetParent.getBoundingClientRect();
            if (start.offsetParent.classList.contains('e-content') || start.offsetParent.classList.contains('e-headercontent')) {
                parentOff = start.offsetParent.querySelector('table').getBoundingClientRect();
            }
            var rowHeight = !isFrozen && this.isLastRow(end) && (bdrStr === '1' || bdrStr === '2' || bdrStr === '5') ? 2 : 0;
            var topOffSet = 0;
            var leftOffset = isFrozen && (bdrStr === '2' || bdrStr === '4') && this.isFirstCell(start) ? 1 : 0;
            var rightOffset = ((this.parent.getFrozenMode() === 'Right' && (bdrStr === '1' || bdrStr === '3'))
                || (this.parent.getFrozenMode() === literals.leftRight && (bdrStr === '5' || bdrStr === '6')))
                && this.isFirstCell(start) ? 1 : 0;
            if (this.parent.enableRtl) {
                border.style.right = parentOff.right - stOff.right - leftOffset + 'px';
                border.style.width = stOff.right - endOff.left + leftOffset + 1 + 'px';
            }
            else {
                border.style.left = stOff.left - parentOff.left - leftOffset - rightOffset + 'px';
                border.style.width = endOff.right - stOff.left + leftOffset - rightOffset + 1 + 'px';
            }
            border.style.top = stOff.top - parentOff.top - topOffSet + 'px';
            border.style.height = endOff.top - stOff.top > 0 ?
                (endOff.top - parentOff.top + endOff.height + (isFrozen ? 0 : 1)) - (stOff.top - parentOff.top) - rowHeight + topOffSet + 'px' :
                endOff.height + topOffSet - rowHeight + (isFrozen ? 0 : 1) + 'px';
            this.selectDirection += bdrStr;
        }
        else {
            border.style.display = 'none';
        }
    };
    Selection.prototype.positionBorders = function () {
        this.updateStartEndCells();
        if (!this.startCell || !this.bdrElement || !this.selectedRowCellIndexes.length) {
            return;
        }
        this.selectDirection = '';
        this.showHideBorders('');
        this.setBorders(this.parent.getContentTable(), this.bdrElement, '1');
        if (this.parent.isFrozenGrid()) {
            this.setBorders(this.parent.getContentTable(), this.mcBdrElement, '2');
            if (this.parent.getFrozenMode() === literals.leftRight) {
                this.setBorders(this.parent.getContentTable(), this.frcBdrElement, '5');
            }
        }
        if (this.parent.frozenRows) {
            this.setBorders(this.parent.getHeaderTable(), this.fhBdrElement, '3');
            if (this.parent.isFrozenGrid()) {
                this.setBorders(this.parent.getHeaderTable(), this.mhBdrElement, '4');
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    this.setBorders(this.parent.getHeaderTable(), this.frhBdrElement, '6');
                }
            }
        }
        this.applyBorders(this.selectDirection);
    };
    /* eslint-enable */
    Selection.prototype.applyBothFrozenBorders = function (str) {
        var rtl = this.parent.enableRtl;
        switch (str.length) {
            case 6:
                {
                    this.bdrElement.style.borderWidth = rtl ? this.right_bottom : this.bottom_left;
                    this.mcBdrElement.style.borderWidth = this.bottom;
                    this.fhBdrElement.style.borderWidth = rtl ? this.top_right : this.top_left;
                    this.mhBdrElement.style.borderWidth = this.top;
                    this.frcBdrElement.style.borderWidth = rtl ? this.bottom_left : this.right_bottom;
                    this.frhBdrElement.style.borderWidth = rtl ? this.top_left : this.top_right;
                }
                break;
            case 4:
                {
                    if (str.includes('1') && str.includes('2') && str.includes('3') && str.includes('4')) {
                        this.fhBdrElement.style.borderWidth = rtl ? this.top_right : this.top_left;
                        this.mhBdrElement.style.borderWidth = rtl ? this.top_left : this.top_right;
                        this.bdrElement.style.borderWidth = rtl ? this.right_bottom : this.bottom_left;
                        this.mcBdrElement.style.borderWidth = rtl ? this.bottom_left : this.right_bottom;
                    }
                    if (str.includes('2') && str.includes('4') && str.includes('5') && str.includes('6')) {
                        this.mcBdrElement.style.borderWidth = rtl ? this.right_bottom : this.bottom_left;
                        this.mhBdrElement.style.borderWidth = rtl ? this.top_right : this.top_left;
                        this.frcBdrElement.style.borderWidth = rtl ? this.bottom_left : this.right_bottom;
                        this.frhBdrElement.style.borderWidth = rtl ? this.top_left : this.top_right;
                    }
                }
                break;
            case 3:
                {
                    this.bdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                    this.mcBdrElement.style.borderWidth = this.top_bottom;
                    this.frcBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                    if (this.parent.frozenRows) {
                        this.fhBdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                        this.mhBdrElement.style.borderWidth = this.top_bottom;
                        this.frcBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                    }
                }
                break;
            case 2:
                {
                    if (str.includes('1')) {
                        this.mcBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                        if (this.parent.frozenRows) {
                            this.fhBdrElement.style.borderWidth = this.top_right_left;
                        }
                    }
                    if (str.includes('2')) {
                        this.bdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                        this.frcBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                        if (this.parent.frozenRows) {
                            this.mhBdrElement.style.borderWidth = this.top_right_left;
                        }
                    }
                    if (str.includes('3')) {
                        this.mhBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                        this.bdrElement.style.borderWidth = this.right_bottom_left;
                    }
                    if (str.includes('4')) {
                        this.fhBdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                        this.frhBdrElement.style.borderWidth = rtl ? this.top_bottom_left : this.top_right_bottom;
                        this.mcBdrElement.style.borderWidth = this.right_bottom_left;
                    }
                    if (str.includes('5')) {
                        this.mcBdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                        if (this.parent.frozenRows) {
                            this.frhBdrElement.style.borderWidth = this.top_right_left;
                        }
                    }
                    if (str.includes('6')) {
                        this.mhBdrElement.style.borderWidth = rtl ? this.top_right_bottom : this.top_bottom_left;
                        this.frcBdrElement.style.borderWidth = this.right_bottom_left;
                    }
                }
                break;
            default:
                this.bdrElement.style.borderWidth = this.all_border;
                this.mcBdrElement.style.borderWidth = this.all_border;
                this.frcBdrElement.style.borderWidth = this.all_border;
                if (this.parent.frozenRows) {
                    this.fhBdrElement.style.borderWidth = this.all_border;
                    this.mhBdrElement.style.borderWidth = this.all_border;
                    this.frhBdrElement.style.borderWidth = this.all_border;
                }
                break;
        }
    };
    Selection.prototype.applyBorders = function (str) {
        var rtl = this.parent.enableRtl;
        if (this.parent.getFrozenMode() === literals.leftRight) {
            this.applyBothFrozenBorders(str);
        }
        else {
            switch (str.length) {
                case 4:
                    {
                        if (this.parent.getFrozenMode() === 'Right') {
                            this.bdrElement.style.borderWidth = rtl ? this.bottom_left : this.right_bottom;
                            this.mcBdrElement.style.borderWidth = rtl ? this.right_bottom : this.bottom_left;
                            this.fhBdrElement.style.borderWidth = rtl ? this.top_left : this.top_right;
                            this.mhBdrElement.style.borderWidth = rtl ? this.top_right : this.top_left;
                        }
                        else {
                            this.bdrElement.style.borderWidth = rtl ? this.right_bottom : this.bottom_left;
                            this.mcBdrElement.style.borderWidth = rtl ? this.bottom_left : this.right_bottom;
                            this.fhBdrElement.style.borderWidth = rtl ? this.top_right : this.top_left;
                            this.mhBdrElement.style.borderWidth = rtl ? this.top_left : this.top_right;
                        }
                    }
                    break;
                case 2:
                    {
                        if (this.parent.getFrozenMode() === 'Right') {
                            this.bdrElement.style.borderWidth = str.includes('2') ? rtl ? this.top_bottom_left
                                : this.top_right_bottom : this.right_bottom_left;
                            this.mcBdrElement.style.borderWidth = str.includes('1') ? rtl ? this.top_right_bottom
                                : this.top_bottom_left : this.right_bottom_left;
                            if (this.parent.frozenRows) {
                                this.fhBdrElement.style.borderWidth = str.includes('1') ? this.top_right_left
                                    : rtl ? this.top_bottom_left : this.top_right_bottom;
                                this.mhBdrElement.style.borderWidth = str.includes('2') ? this.top_right_left
                                    : rtl ? this.top_right_bottom : this.top_bottom_left;
                            }
                        }
                        else {
                            this.bdrElement.style.borderWidth = str.includes('2') ? rtl ? this.top_right_bottom
                                : this.top_bottom_left : this.right_bottom_left;
                            if (this.parent.isFrozenGrid()) {
                                this.mcBdrElement.style.borderWidth = str.includes('1') ? rtl ? this.top_bottom_left
                                    : this.top_right_bottom : this.right_bottom_left;
                            }
                            if (this.parent.frozenRows) {
                                this.fhBdrElement.style.borderWidth = str.includes('1') ? this.top_right_left
                                    : rtl ? this.top_right_bottom : this.top_bottom_left;
                                if (this.parent.isFrozenGrid()) {
                                    this.mhBdrElement.style.borderWidth = str.includes('2') ? this.top_right_left
                                        : rtl ? this.top_bottom_left : this.top_right_bottom;
                                }
                            }
                        }
                    }
                    break;
                default:
                    this.bdrElement.style.borderWidth = this.all_border;
                    if (this.parent.isFrozenGrid()) {
                        this.mcBdrElement.style.borderWidth = this.all_border;
                    }
                    if (this.parent.frozenRows) {
                        this.fhBdrElement.style.borderWidth = this.all_border;
                        if (this.parent.isFrozenGrid()) {
                            this.mhBdrElement.style.borderWidth = this.all_border;
                        }
                    }
                    break;
            }
        }
    };
    Selection.prototype.createBorders = function () {
        if (!this.bdrElement) {
            var selectionBorder = createElement('div', {
                className: 'e-xlsel', id: this.parent.element.id + '_bdr'
            });
            selectionBorder.style.cssText = 'width: 2px; border-width: 0;';
            this.bdrElement = this.parent.getContentTable().parentElement.appendChild(selectionBorder);
            if (this.parent.isFrozenGrid()) {
                var middleContentBorder = createElement('div', {
                    className: 'e-xlsel', id: this.parent.element.id + '_mcbdr'
                });
                middleContentBorder.style.cssText = 'height: 2px; border-width: 0;';
                this.mcBdrElement = this.parent.getContentTable().parentElement.appendChild(middleContentBorder);
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    var frozenRightContentBorder = createElement('div', {
                        className: 'e-xlsel', id: this.parent.element.id + '_frcbdr'
                    });
                    frozenRightContentBorder.style.cssText = 'height: 2px; border-width: 0;';
                    this.frcBdrElement = this.parent.getContentTable().parentElement.appendChild(frozenRightContentBorder);
                }
            }
            if (this.parent.frozenRows) {
                var frozenHeaderBorder = createElement('div', {
                    className: 'e-xlsel', id: this.parent.element.id + '_fhbdr'
                });
                frozenHeaderBorder.style.height = '2px';
                this.fhBdrElement = this.parent.getHeaderTable().parentElement.appendChild(frozenHeaderBorder);
            }
            if (this.parent.frozenRows && this.parent.isFrozenGrid()) {
                var middleHeaderBorder = createElement('div', {
                    className: 'e-xlsel', id: this.parent.element.id + '_mhbdr'
                });
                middleHeaderBorder.style.height = '2px';
                this.mhBdrElement = this.parent.getHeaderTable().parentElement.appendChild(middleHeaderBorder);
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    var frozenRightHeaderBorder = createElement('div', {
                        className: 'e-xlsel', id: this.parent.element.id + '_frhbdr'
                    });
                    frozenRightHeaderBorder.style.height = '2px';
                    this.frhBdrElement = this.parent.getHeaderTable().parentElement.appendChild(frozenRightHeaderBorder);
                }
            }
        }
    };
    Selection.prototype.showHideBorders = function (display, freeze) {
        if (this.bdrElement) {
            this.bdrElement.style.display = display;
            if (this.parent.isFrozenGrid()) {
                var parentEle = this.parent.getContentTable();
                removeClass(parentEle.querySelectorAll('.e-xlsel-top-border'), 'e-xlsel-top-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-left-border'), 'e-xlsel-left-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-right-border'), 'e-xlsel-right-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-bottom-border'), 'e-xlsel-bottom-border');
                if (!freeze) {
                    this.mcBdrElement.style.display = display;
                }
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    this.frcBdrElement.style.display = display;
                }
            }
            if (this.parent.frozenRows) {
                var parentEle = this.parent.getHeaderTable();
                removeClass(parentEle.querySelectorAll('.e-xlsel-top-border'), 'e-xlsel-top-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-left-border'), 'e-xlsel-left-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-right-border'), 'e-xlsel-right-border');
                removeClass(parentEle.querySelectorAll('.e-xlsel-bottom-border'), 'e-xlsel-bottom-border');
                this.fhBdrElement.style.display = display;
            }
            if (this.parent.frozenRows && this.parent.isFrozenGrid()) {
                if (!freeze) {
                    this.mhBdrElement.style.display = display;
                }
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    this.frhBdrElement.style.display = display;
                }
            }
        }
    };
    Selection.prototype.drawAFBorders = function () {
        if (!this.bdrAFBottom) {
            this.createAFBorders();
        }
        this.positionAFBorders();
    };
    Selection.prototype.positionAFBorders = function () {
        if (!this.startCell || !this.bdrAFLeft) {
            return;
        }
        var stOff = this.startAFCell.getBoundingClientRect();
        var endOff = this.endAFCell.getBoundingClientRect();
        var top = endOff.top - stOff.top > 0 ? 1 : 0;
        var firstCellTop = endOff.top - stOff.top >= 0 && (parentsUntil(this.startAFCell, literals.movableContent) ||
            parentsUntil(this.startAFCell, 'e-frozencontent')) && this.isFirstRow(this.startAFCell) ? 1.5 : 0;
        var firstCellLeft = (parentsUntil(this.startAFCell, literals.movableContent) ||
            parentsUntil(this.startAFCell, literals.movableHeader)) && this.isFirstCell(this.startAFCell) ? 1 : 0;
        var rowHeight = this.isLastRow(this.endAFCell) && (parentsUntil(this.endAFCell, literals.movableContent) ||
            parentsUntil(this.endAFCell, 'e-frozencontent')) ? 2 : 0;
        var parentOff = this.startAFCell.offsetParent.getBoundingClientRect();
        var parentRect = this.parent.element.getBoundingClientRect();
        var sTop = this.startAFCell.offsetParent.parentElement.scrollTop;
        var sLeft = this.startAFCell.offsetParent.parentElement.scrollLeft;
        var scrollTop = sTop - this.startAFCell.offsetTop;
        var scrollLeft = sLeft - this.startAFCell.offsetLeft;
        var totalHeight = this.parent.element.clientHeight - getScrollBarWidth();
        if (this.parent.allowPaging) {
            totalHeight -= this.parent.element.querySelector('.e-pager').offsetHeight;
        }
        if (this.parent.aggregates.length) {
            totalHeight -= this.parent.getFooterContent().offsetHeight;
        }
        var totalWidth = this.parent.element.clientWidth - (this.parent.height !== 'auto' ? getScrollBarWidth() : 0);
        scrollTop = scrollTop > 0 ? Math.floor(scrollTop) - 1 : 0;
        scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
        var left = stOff.left - parentRect.left;
        if (!this.parent.enableRtl) {
            this.bdrAFLeft.style.left = left - firstCellLeft + scrollLeft - 1 + 'px';
            this.bdrAFRight.style.left = endOff.left - parentRect.left - 2 + endOff.width + 'px';
            this.bdrAFRight.style.width = totalWidth <= parseInt(this.bdrAFRight.style.left, 10) ? '0px' : '2px';
            this.bdrAFTop.style.left = left + scrollLeft - 0.5 + 'px';
            this.bdrAFTop.style.width = parseInt(this.bdrAFRight.style.left, 10) - parseInt(this.bdrAFLeft.style.left, 10)
                - firstCellLeft + 1 + 'px';
            if (totalWidth <= (parseInt(this.bdrAFTop.style.width, 10) + parseInt(this.bdrAFTop.style.left, 10))) {
                var leftRemove = (parseInt(this.bdrAFTop.style.width, 10) + parseInt(this.bdrAFTop.style.left, 10)) - totalWidth;
                this.bdrAFTop.style.width = parseInt(this.bdrAFTop.style.width, 10) - leftRemove + 'px';
            }
        }
        else {
            var scrolloffSet = (parentsUntil(this.startAFCell, literals.movableContent) ||
                parentsUntil(this.startAFCell, literals.movableHeader)) ? stOff.right -
                this.startAFCell.offsetParent.parentElement.getBoundingClientRect().width -
                parentRect.left : 0;
            this.bdrAFLeft.style.right = parentRect.right - endOff.right - 2 + endOff.width + 'px';
            this.bdrAFLeft.style.width = totalWidth <= parseInt(this.bdrAFLeft.style.right, 10) ? '0px' : '2px';
            var borderAFRightValue = parentRect.right - stOff.right - firstCellLeft + scrolloffSet - 1;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            borderAFRightValue > 0 ? this.bdrAFRight.style.right = borderAFRightValue + 'px' : this.bdrAFRight.style.right = '0px';
            this.bdrAFTop.style.left = endOff.left - parentRect.left - 0.5 + 'px';
            this.bdrAFTop.style.width = parseInt(this.bdrAFLeft.style.right, 10) - parseInt(this.bdrAFRight.style.right, 10)
                - firstCellLeft + 1 + 'px';
            if (parseInt(this.bdrAFTop.style.left, 10) < 0) {
                this.bdrAFTop.style.width = parseInt(this.bdrAFTop.style.width, 10) + parseInt(this.bdrAFTop.style.left, 10) + 'px';
                if (this.parent.height !== 'auto' && getScrollBarWidth()) {
                    this.bdrAFTop.style.left = getScrollBarWidth() + 'px';
                    this.bdrAFTop.style.width = (parseInt(this.bdrAFTop.style.width, 10) - getScrollBarWidth()) + 'px';
                }
                else {
                    this.bdrAFTop.style.left = '0px';
                }
            }
        }
        this.bdrAFLeft.style.top = stOff.top - parentRect.top - firstCellTop + scrollTop + 'px';
        this.bdrAFLeft.style.height = endOff.top - stOff.top > 0 ?
            (endOff.top - parentOff.top + endOff.height + 1) - (stOff.top - parentOff.top) + firstCellTop - rowHeight - scrollTop + 'px' :
            endOff.height + firstCellTop - rowHeight - scrollTop + 'px';
        this.bdrAFRight.style.top = this.bdrAFLeft.style.top;
        this.bdrAFRight.style.height = parseInt(this.bdrAFLeft.style.height, 10) + 'px';
        this.bdrAFTop.style.top = this.bdrAFRight.style.top;
        this.bdrAFBottom.style.left = this.bdrAFTop.style.left;
        this.bdrAFBottom.style.top = parseFloat(this.bdrAFLeft.style.top) + parseFloat(this.bdrAFLeft.style.height) - top - 1 + 'px';
        this.bdrAFBottom.style.width = totalHeight <= parseFloat(this.bdrAFBottom.style.top) ? '0px' : this.bdrAFTop.style.width;
        if (totalHeight <= (parseInt(this.bdrAFLeft.style.height, 10) + parseInt(this.bdrAFLeft.style.top, 10))) {
            var topRemove = parseInt(this.bdrAFLeft.style.height, 10) + parseInt(this.bdrAFLeft.style.top, 10) - totalHeight;
            this.bdrAFLeft.style.height = parseInt(this.bdrAFLeft.style.height, 10) - topRemove + 'px';
            this.bdrAFRight.style.height = parseInt(this.bdrAFLeft.style.height, 10) + 'px';
        }
    };
    Selection.prototype.createAFBorders = function () {
        if (!this.bdrAFLeft) {
            var leftSelectionBorder = createElement('div', {
                className: 'e-xlselaf', id: this.parent.element.id + '_bdrafleft'
            });
            leftSelectionBorder.style.width = '2px';
            this.bdrAFLeft = this.parent.element.appendChild(leftSelectionBorder);
            var rightSelectionBorder = createElement('div', {
                className: 'e-xlselaf', id: this.parent.element.id + '_bdrafright'
            });
            rightSelectionBorder.style.width = '2px';
            this.bdrAFRight = this.parent.element.appendChild(rightSelectionBorder);
            var bottomSelectionBorder = createElement('div', {
                className: 'e-xlselaf', id: this.parent.element.id + '_bdrafbottom'
            });
            bottomSelectionBorder.style.height = '2px';
            this.bdrAFBottom = this.parent.element.appendChild(bottomSelectionBorder);
            var topSelectionBorder = createElement('div', {
                className: 'e-xlselaf', id: this.parent.element.id + '_bdraftop'
            });
            topSelectionBorder.style.height = '2px';
            this.bdrAFTop = this.parent.element.appendChild(topSelectionBorder);
        }
    };
    Selection.prototype.destroyAutoFillElements = function () {
        if (this.bdrAFLeft) {
            this.bdrAFLeft.remove();
            this.bdrAFRight.remove();
            this.bdrAFBottom.remove();
            this.bdrAFTop.remove();
            this.bdrAFLeft = this.bdrAFRight = this.bdrAFBottom = this.bdrAFTop = null;
        }
        if (this.autofill) {
            this.autofill.remove();
            this.autofill = null;
        }
    };
    Selection.prototype.showAFBorders = function () {
        if (this.bdrAFLeft) {
            this.bdrAFLeft.style.display = '';
            this.bdrAFRight.style.display = '';
            this.bdrAFBottom.style.display = '';
            this.bdrAFTop.style.display = '';
        }
    };
    Selection.prototype.hideAFBorders = function () {
        if (this.bdrAFLeft) {
            this.bdrAFLeft.style.display = 'none';
            this.bdrAFRight.style.display = 'none';
            this.bdrAFBottom.style.display = 'none';
            this.bdrAFTop.style.display = 'none';
        }
    };
    Selection.prototype.updateValue = function (rIdx, cIdx, cell) {
        var args = this.createBeforeAutoFill(rIdx, cIdx, cell);
        if (!args.cancel) {
            var col = this.parent.getColumnByIndex(cIdx);
            if (this.parent.editModule && cell) {
                if (col.type === 'number') {
                    this.parent.editModule.updateCell(rIdx, col.field, parseFloat(args.value));
                }
                else {
                    this.parent.editModule.updateCell(rIdx, col.field, args.value);
                }
            }
        }
    };
    Selection.prototype.createBeforeAutoFill = function (rowIndex, colIndex, cell) {
        var col = this.parent.getColumnByIndex(colIndex);
        var args = {
            column: col,
            value: cell.innerText
        };
        this.parent.trigger(events.beforeAutoFill, args);
        return args;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Selection.prototype.getAutoFillCells = function (rowIndex, startCellIdx) {
        var cls = '.e-cellselectionbackground';
        var cells = [].slice.call(this.parent.getDataRows()[parseInt(rowIndex.toString(), 10)].querySelectorAll(cls));
        return cells;
    };
    Selection.prototype.selectLikeAutoFill = function (e, isApply) {
        var startrowIdx = parseInt(parentsUntil(this.startAFCell, literals.row).getAttribute(literals.ariaRowIndex), 10) - 1;
        var startCellIdx = parseInt(this.startAFCell.getAttribute(literals.ariaColIndex), 10) - 1;
        var endrowIdx = parseInt(parentsUntil(this.endAFCell, literals.row).getAttribute(literals.ariaRowIndex), 10) - 1;
        var endCellIdx = parseInt(this.endAFCell.getAttribute(literals.ariaColIndex), 10) - 1;
        var rowLen = this.selectedRowCellIndexes.length - 1;
        var colLen = this.selectedRowCellIndexes[0].cellIndexes.length - 1;
        switch (true) { //direction
            case !isApply && this.endAFCell.classList.contains('e-cellselectionbackground') &&
                !!parentsUntil(e.target, literals.rowCell):
                this.startAFCell = this.parent.getCellFromIndex(startrowIdx, startCellIdx);
                this.endAFCell = this.parent.getCellFromIndex(startrowIdx + rowLen, startCellIdx + colLen);
                this.drawAFBorders();
                break;
            case this.autoFillRLselection && startCellIdx + colLen < endCellIdx && //right
                endCellIdx - startCellIdx - colLen + 1 > endrowIdx - startrowIdx - rowLen // right bottom
                && endCellIdx - startCellIdx - colLen + 1 > startrowIdx - endrowIdx: //right top
                this.endAFCell = this.parent.getCellFromIndex(startrowIdx + rowLen, endCellIdx);
                endrowIdx = parseInt(parentsUntil(this.endAFCell, literals.row).getAttribute(literals.ariaRowIndex), 10) - 1;
                endCellIdx = parseInt(this.endAFCell.getAttribute(literals.ariaColIndex), 10) - 1;
                if (!isApply) {
                    this.drawAFBorders();
                }
                else {
                    var cellIdx = parseInt(this.endCell.getAttribute(literals.ariaColIndex), 10) - 1;
                    for (var i = startrowIdx; i <= endrowIdx; i++) {
                        var cells = this.getAutoFillCells(i, startCellIdx);
                        var c = 0;
                        for (var j = cellIdx + 1; j <= endCellIdx; j++) {
                            if (c > colLen) {
                                c = 0;
                            }
                            this.updateValue(i, j, cells[parseInt(c.toString(), 10)]);
                            c++;
                        }
                    }
                    this.selectCellsByRange({ rowIndex: startrowIdx, cellIndex: this.startCellIndex }, { rowIndex: endrowIdx, cellIndex: endCellIdx });
                }
                break;
            case this.autoFillRLselection && startCellIdx > endCellIdx && // left
                startCellIdx - endCellIdx + 1 > endrowIdx - startrowIdx - rowLen && //left top
                startCellIdx - endCellIdx + 1 > startrowIdx - endrowIdx: // left bottom
                this.startAFCell = this.parent.getCellFromIndex(startrowIdx, endCellIdx);
                this.endAFCell = this.endCell;
                if (!isApply) {
                    this.drawAFBorders();
                }
                else {
                    for (var i = startrowIdx; i <= startrowIdx + rowLen; i++) {
                        var cells = this.getAutoFillCells(i, startCellIdx);
                        cells.reverse();
                        var c = 0;
                        for (var j = this.startCellIndex - 1; j >= endCellIdx; j--) {
                            if (c > colLen) {
                                c = 0;
                            }
                            this.updateValue(i, j, cells[parseInt(c.toString(), 10)]);
                            c++;
                        }
                    }
                    this.selectCellsByRange({ rowIndex: startrowIdx, cellIndex: endCellIdx }, { rowIndex: startrowIdx + rowLen, cellIndex: this.startCellIndex + colLen });
                }
                break;
            case startrowIdx > endrowIdx: //up
                this.startAFCell = this.parent.getCellFromIndex(endrowIdx, startCellIdx);
                this.endAFCell = this.endCell;
                if (!isApply) {
                    this.drawAFBorders();
                }
                else {
                    var trIdx = parseInt(this.endCell.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
                    var r = trIdx;
                    for (var i = startrowIdx - 1; i >= endrowIdx; i--) {
                        if (r === this.startIndex - 1) {
                            r = trIdx;
                        }
                        var cells = this.getAutoFillCells(r, startCellIdx);
                        var c = 0;
                        r--;
                        for (var j = this.startCellIndex; j <= this.startCellIndex + colLen; j++) {
                            this.updateValue(i, j, cells[parseInt(c.toString(), 10)]);
                            c++;
                        }
                    }
                    this.selectCellsByRange({ rowIndex: endrowIdx, cellIndex: startCellIdx + colLen }, { rowIndex: startrowIdx + rowLen, cellIndex: startCellIdx });
                }
                break;
            default: //down
                this.endAFCell = this.parent.getCellFromIndex(endrowIdx, startCellIdx + colLen);
                if (!isApply) {
                    this.drawAFBorders();
                }
                else {
                    var trIdx = parseInt(this.endCell.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
                    var r = this.startIndex;
                    for (var i = trIdx + 1; i <= endrowIdx; i++) {
                        if (r === trIdx + 1) {
                            r = this.startIndex;
                        }
                        var cells = this.getAutoFillCells(r, startCellIdx);
                        r++;
                        var c = 0;
                        for (var m = this.startCellIndex; m <= this.startCellIndex + colLen; m++) {
                            this.updateValue(i, m, cells[parseInt(c.toString(), 10)]);
                            c++;
                        }
                    }
                    this.selectCellsByRange({ rowIndex: trIdx - rowLen, cellIndex: startCellIdx }, { rowIndex: endrowIdx, cellIndex: startCellIdx + colLen });
                }
                break;
        }
    };
    Selection.prototype.mouseUpHandler = function (e) {
        this.stopTimer();
        document.body.classList.remove('e-disableuserselect');
        if (this.element && !isNullOrUndefined(this.element.parentElement)) {
            remove(this.element);
        }
        if (this.isDragged && this.selectedRowCellIndexes.length === 1 && this.selectedRowCellIndexes[0].cellIndexes.length === 1) {
            this.mUPTarget = parentsUntil(e.target, literals.rowCell);
        }
        else {
            this.mUPTarget = null;
        }
        var closeRowCell = closest(e.target, '.e-rowcell');
        if (this.isDragged && !this.isAutoFillSel && this.selectionSettings.mode === 'Cell' &&
            closeRowCell && closeRowCell.classList.contains(literals.rowCell)) {
            var rowIndex = parseInt(closeRowCell.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
            var cellIndex = parseInt(closeRowCell.getAttribute(literals.ariaColIndex), 10) - 1;
            this.isDragged = false;
            this.clearCellSelection();
            this.selectCellsByRange({ rowIndex: this.startDIndex, cellIndex: this.startDCellIndex }, { rowIndex: rowIndex, cellIndex: cellIndex });
        }
        this.isDragged = false;
        this.updateAutoFillPosition();
        if (this.isAutoFillSel) {
            this.preventFocus = true;
            var lastCell = parentsUntil(e.target, literals.rowCell);
            this.endAFCell = lastCell ? lastCell : this.endCell === this.endAFCell ? this.startAFCell : this.endAFCell;
            this.startAFCell = this.startCell;
            if (!isNullOrUndefined(this.endAFCell) && !isNullOrUndefined(this.startAFCell)) {
                this.updateStartCellsIndex();
                this.selectLikeAutoFill(e, true);
                this.updateAutoFillPosition();
                this.hideAFBorders();
                this.positionBorders();
                if (this.parent.isFrozenGrid()) {
                    this.showHideBorders('none', true);
                    this.refreshFrozenBorders();
                }
                if (this.parent.aggregates.length > 0) {
                    this.parent.notify(events.refreshFooterRenderer, {});
                }
            }
            this.isAutoFillSel = false;
            this.preventFocus = false;
        }
        EventHandler.remove(this.parent.getContent(), 'mousemove', this.mouseMoveHandler);
        if (this.parent.frozenRows) {
            EventHandler.remove(this.parent.getHeaderContent(), 'mousemove', this.mouseMoveHandler);
        }
        EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
    };
    Selection.prototype.hideAutoFill = function () {
        if (this.autofill) {
            this.autofill.style.display = 'none';
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Selection.prototype.updateAutoFillPosition = function () {
        if (this.parent.enableAutoFill && !this.parent.isEdit &&
            this.selectionSettings.cellSelectionMode.indexOf('Box') > -1 && !this.isRowType() && !this.isSingleSel()
            && this.selectedRowCellIndexes.length) {
            var index = parseInt(this.target.getAttribute(literals.ariaColIndex), 10) - 1;
            var rindex = parseInt(this.target.getAttribute('index'), 10);
            var rowIndex = this.selectedRowCellIndexes[this.selectedRowCellIndexes.length - 1].rowIndex;
            var cells = this.getAutoFillCells(rowIndex, index).filter(function (ele) { return ele.style.display === ''; });
            var col = this.parent.getColumnByIndex(index);
            var isFrozenCol = col.getFreezeTableName() === 'movable';
            var isFrozenRow = rindex < this.parent.frozenRows;
            var isFrozenRight = this.parent.getFrozenMode() === literals.leftRight
                && col.getFreezeTableName() === literals.frozenRight;
            if (!select('#' + this.parent.element.id + '_autofill', parentsUntil(this.target, literals.table))) {
                if (select('#' + this.parent.element.id + '_autofill', this.parent.element)) {
                    select('#' + this.parent.element.id + '_autofill', this.parent.element).remove();
                }
                this.autofill = createElement('div', { className: 'e-autofill', id: this.parent.element.id + '_autofill' });
                this.autofill.style.display = 'none';
                if (this.target.classList.contains('e-leftfreeze') || this.target.classList.contains('e-rightfreeze') ||
                    this.target.classList.contains('e-fixedfreeze')) {
                    this.autofill.classList.add('e-freeze-autofill');
                }
                if (!isFrozenRow) {
                    if (!isFrozenCol) {
                        this.parent.getContentTable().parentElement.appendChild(this.autofill);
                    }
                    else {
                        this.parent.getContentTable().parentElement.appendChild(this.autofill);
                    }
                }
                else {
                    if (!isFrozenCol) {
                        this.parent.getHeaderTable().parentElement.appendChild(this.autofill);
                    }
                    else {
                        this.parent.getHeaderTable().parentElement.appendChild(this.autofill);
                    }
                }
                if (isFrozenRight) {
                    if (isFrozenRow) {
                        this.parent.getHeaderTable().parentElement.appendChild(this.autofill);
                    }
                    else {
                        this.parent.getContentTable().parentElement.appendChild(this.autofill);
                    }
                }
            }
            var cell = cells[cells.length - 1];
            if (cell && cell.offsetParent) {
                var clientRect = cell.getBoundingClientRect();
                var parentOff = cell.offsetParent.getBoundingClientRect();
                if (cell.offsetParent.classList.contains('e-content') || cell.offsetParent.classList.contains('e-headercontent')) {
                    parentOff = cell.offsetParent.querySelector('table').getBoundingClientRect();
                }
                var colWidth = this.isLastCell(cell) ? 4 : 0;
                var rowHeight = this.isLastRow(cell) ? 3 : 0;
                if (!this.parent.enableRtl) {
                    this.autofill.style.left = clientRect.left - parentOff.left + clientRect.width - 4 - colWidth + 'px';
                }
                else {
                    this.autofill.style.right = parentOff.right - clientRect.right + clientRect.width - 4 - colWidth + 'px';
                }
                this.autofill.style.top = clientRect.top - parentOff.top + clientRect.height - 5 - rowHeight + 'px';
            }
            this.autofill.style.display = '';
        }
        else {
            this.hideAutoFill();
        }
    };
    Selection.prototype.mouseDownHandler = function (e) {
        this.mouseButton = e.button;
        var target = e.target;
        var gObj = this.parent;
        var isDrag;
        var gridElement = parentsUntil(target, 'e-grid');
        if (gridElement && gridElement.id !== gObj.element.id || parentsUntil(target, literals.headerContent) && !this.parent.frozenRows ||
            parentsUntil(target, 'e-editedbatchcell') || parentsUntil(target, literals.editedRow)) {
            return;
        }
        if (e.shiftKey || e.ctrlKey) {
            e.preventDefault();
        }
        if (parentsUntil(target, literals.rowCell) && !e.shiftKey && !e.ctrlKey) {
            if (gObj.selectionSettings.cellSelectionMode.indexOf('Box') > -1 && !this.isRowType() && !this.isSingleSel()) {
                this.isCellDrag = true;
                isDrag = true;
            }
            else if (gObj.allowRowDragAndDrop && !gObj.isEdit && !this.parent.selectionSettings.checkboxOnly) {
                this.isRowDragSelected = false;
                if (!this.isRowType() || this.isSingleSel() || closest(target, 'td').classList.contains('e-selectionbackground')) {
                    this.isDragged = false;
                    return;
                }
                isDrag = true;
                this.element = this.parent.createElement('div', { className: 'e-griddragarea' });
                gObj.getContent().appendChild(this.element);
            }
            if (isDrag) {
                this.enableDrag(e, true);
            }
        }
        this.updateStartEndCells();
        if (target.classList.contains('e-autofill') || target.classList.contains('e-xlsel')) {
            this.isCellDrag = true;
            this.isAutoFillSel = true;
            this.enableDrag(e);
        }
    };
    Selection.prototype.updateStartEndCells = function () {
        var cells = [].slice.call(this.parent.element.getElementsByClassName('e-cellselectionbackground'));
        this.startCell = cells[0];
        this.endCell = cells[cells.length - 1];
        if (this.startCell) {
            this.startIndex = parseInt(this.startCell.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
            this.startCellIndex = parseInt(parentsUntil(this.startCell, literals.rowCell).getAttribute(literals.ariaColIndex), 10) - 1;
        }
    };
    Selection.prototype.updateStartCellsIndex = function () {
        if (this.startCell) {
            this.startIndex = parseInt(this.startCell.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
            this.startCellIndex = parseInt(parentsUntil(this.startCell, literals.rowCell).getAttribute(literals.ariaColIndex), 10) - 1;
        }
    };
    Selection.prototype.enableDrag = function (e, isUpdate) {
        var gObj = this.parent;
        if (isUpdate) {
            var tr = closest(e.target, 'tr');
            this.startDIndex = parseInt(tr.getAttribute(literals.ariaRowIndex), 10) - 1;
            this.startDCellIndex = parseInt(parentsUntil(e.target, literals.rowCell)
                .getAttribute(literals.ariaColIndex), 10) - 1;
        }
        document.body.classList.add('e-disableuserselect');
        var gBRect = gObj.element.getBoundingClientRect();
        var postion = getPosition(e);
        this.x = postion.x - gBRect.left;
        this.y = postion.y - gBRect.top;
        EventHandler.add(gObj.getContent(), 'mousemove', this.mouseMoveHandler, this);
        if (this.parent.frozenRows) {
            EventHandler.add(gObj.getHeaderContent(), 'mousemove', this.mouseMoveHandler, this);
        }
        EventHandler.add(document, 'mouseup', this.mouseUpHandler, this);
    };
    Selection.prototype.clearSelAfterRefresh = function (e) {
        var isInfiniteScroll = this.parent.enableInfiniteScrolling && e.requestType === 'infiniteScroll';
        if (e.requestType !== 'virtualscroll' && !this.parent.isPersistSelection && !isInfiniteScroll) {
            this.clearSelection();
        }
        if ((e.requestType === 'virtualscroll' || isInfiniteScroll) && this.parent.isPersistSelection && this.isPartialSelection
            && this.isHdrSelectAllClicked) {
            var rowObj = this.parent.getRowsObject().filter(function (e) { return e.isSelectable; });
            var indexes = [];
            this.selectedRowState = {};
            this.persistSelectedData = [];
            for (var i = 0; i < rowObj.length; i++) {
                indexes.push(rowObj[parseInt(i.toString(), 10)].index);
                var pkValue = this.getPkValue(this.primaryKey, rowObj[parseInt(i.toString(), 10)].data);
                this.selectedRowState["" + pkValue] = true;
                this.persistSelectedData.push(rowObj[parseInt(i.toString(), 10)].data);
            }
            this.selectedRowIndexes = indexes;
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Selection.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.evtHandlers = [{ event: events.uiUpdate, handler: this.enableAfterRender },
            { event: events.initialEnd, handler: this.initializeSelection },
            { event: events.rowSelectionComplete, handler: this.onActionComplete },
            { event: events.cellSelectionComplete, handler: this.onActionComplete },
            { event: events.inBoundModelChanged, handler: this.onPropertyChanged },
            { event: events.cellFocused, handler: this.onCellFocused },
            { event: events.beforeFragAppend, handler: this.clearSelAfterRefresh },
            { event: events.columnPositionChanged, handler: this.columnPositionChanged },
            { event: events.contentReady, handler: this.initialEnd },
            { event: events.rowsRemoved, handler: this.rowsRemoved },
            { event: events.headerRefreshed, handler: this.refreshHeader },
            { event: events.destroyAutoFillElements, handler: this.destroyAutoFillElements },
            { event: events.destroy, handler: this.destroy }];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
        this.actionBeginFunction = this.actionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.parent.addEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunction);
        this.addEventListener_checkbox();
    };
    /**
     * @returns {void}
     * @hidden
     */
    Selection.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
        EventHandler.remove(this.parent.getContent(), 'mousedown', this.mouseDownHandler);
        EventHandler.remove(this.parent.getHeaderContent(), 'mousedown', this.mouseDownHandler);
        addRemoveEventListener(this.parent, this.evtHandlers, false);
        this.parent.removeEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunction);
        this.removeEventListener_checkbox();
        this.parent.off(events.destroyAutoFillElements, this.destroyAutoFillElements);
    };
    Selection.prototype.wireEvents = function () {
        this.isMacOS = navigator.userAgent.indexOf('Mac OS') !== -1;
        if (this.isMacOS) {
            EventHandler.add(this.parent.element, 'keydown', this.keyDownHandler, this);
            EventHandler.add(this.parent.element, 'keyup', this.keyUpHandler, this);
        }
        else {
            if (!this.parent.allowKeyboard) {
                EventHandler.add(this.parent.element, 'keydown', this.keyDownHandler, this);
            }
        }
    };
    Selection.prototype.unWireEvents = function () {
        if (this.isMacOS) {
            EventHandler.remove(this.parent.element, 'keydown', this.keyDownHandler);
            EventHandler.remove(this.parent.element, 'keyup', this.keyUpHandler);
        }
        else {
            if (!this.parent.allowKeyboard) {
                EventHandler.remove(this.parent.element, 'keydown', this.keyDownHandler);
            }
        }
    };
    Selection.prototype.columnPositionChanged = function () {
        if (!this.parent.isPersistSelection) {
            this.clearSelection();
        }
    };
    Selection.prototype.refreshHeader = function () {
        var checkboxColumn = this.parent.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (checkboxColumn.length && !this.parent.getDataModule().isRemote()) {
            this.gridCurrentRecord = this.getData();
        }
        this.setCheckAllState();
    };
    Selection.prototype.rowsRemoved = function (e) {
        for (var i = 0; i < e.records.length; i++) {
            var pkValue = this.getPkValue(this.primaryKey, e.records[parseInt(i.toString(), 10)]);
            delete (this.selectedRowState["" + pkValue]);
            --this.totalRecordsCount;
        }
        this.setCheckAllState();
    };
    Selection.prototype.beforeFragAppend = function (e) {
        if (e.requestType !== 'virtualscroll' && !this.parent.isPersistSelection) {
            this.clearSelection();
        }
    };
    Selection.prototype.getCheckAllBox = function () {
        return this.parent.getHeaderContent().querySelector('.e-checkselectall');
    };
    Selection.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
            this.initPerisistSelection();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Selection.prototype.render = function (e) {
        EventHandler.add(this.parent.getContent(), 'mousedown', this.mouseDownHandler, this);
        EventHandler.add(this.parent.getHeaderContent(), 'mousedown', this.mouseDownHandler, this);
    };
    Selection.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        if (!isNullOrUndefined(e.properties.type)) {
            if (this.selectionSettings.type === 'Single') {
                gObj.element.removeAttribute('aria-multiselectable');
                if (this.selectedRowCellIndexes.length > 1) {
                    this.clearCellSelection();
                    this.prevCIdxs = undefined;
                }
                if (this.selectedRowIndexes.length > 1) {
                    this.clearRowSelection();
                    this.prevRowIndex = undefined;
                }
                if (this.selectedColumnsIndexes.length > 1) {
                    this.clearColumnSelection();
                    this.prevColIndex = undefined;
                }
                this.enableSelectMultiTouch = false;
                this.hidePopUp();
            }
            else if (this.selectionSettings.type === 'Multiple') {
                gObj.element.setAttribute('aria-multiselectable', 'true');
            }
        }
        if (!isNullOrUndefined(e.properties.mode) ||
            !isNullOrUndefined(e.properties.cellSelectionMode)) {
            this.clearSelection();
            this.prevRowIndex = undefined;
            this.prevCIdxs = undefined;
            this.prevColIndex = undefined;
        }
        this.isPersisted = true;
        this.checkBoxSelectionChanged();
        this.isPersisted = false;
        if (!this.parent.isCheckBoxSelection) {
            this.initPerisistSelection();
        }
        var checkboxColumn = this.parent.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (checkboxColumn.length) {
            gObj.isCheckBoxSelection = !(this.selectionSettings.checkboxMode === 'ResetOnRowClick');
        }
        this.drawBorders();
    };
    Selection.prototype.hidePopUp = function () {
        if (this.parent.element.querySelector('.e-gridpopup').getElementsByClassName('e-rowselect').length) {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    Selection.prototype.initialEnd = function () {
        if (!this.selectedRowIndexes.length) {
            this.parent.off(events.contentReady, this.initialEnd);
            this.selectRow(this.parent.selectedRowIndex);
        }
    };
    Selection.prototype.checkBoxSelectionChanged = function () {
        var gobj = this.parent;
        gobj.off(events.contentReady, this.checkBoxSelectionChanged);
        var checkboxColumn = gobj.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (checkboxColumn.length > 0) {
            gobj.isCheckBoxSelection = true;
            this.chkField = checkboxColumn[0].field;
            this.totalRecordsCount = this.parent.pageSettings.totalRecordsCount;
            if (isNullOrUndefined(this.totalRecordsCount)) {
                this.totalRecordsCount = this.getCurrentBatchRecordChanges().length;
            }
            if (this.isSingleSel()) {
                gobj.selectionSettings.type = 'Multiple';
                gobj.dataBind();
            }
            else {
                this.initPerisistSelection();
            }
        }
        if (!gobj.isCheckBoxSelection && !this.isPersisted) {
            this.chkField = null;
            this.initPerisistSelection();
        }
    };
    Selection.prototype.initPerisistSelection = function () {
        var gobj = this.parent;
        if (this.parent.selectionSettings.persistSelection && this.parent.getPrimaryKeyFieldNames().length > 0) {
            gobj.isPersistSelection = true;
            this.ensureCheckboxFieldSelection();
        }
        else if (this.parent.getPrimaryKeyFieldNames().length > 0) {
            gobj.isPersistSelection = false;
            this.ensureCheckboxFieldSelection();
        }
        else {
            gobj.isPersistSelection = false;
            this.selectedRowState = {};
        }
    };
    Selection.prototype.ensureCheckboxFieldSelection = function () {
        var gobj = this.parent;
        this.primaryKey = this.parent.getPrimaryKeyFieldNames()[0];
        if (!gobj.enableVirtualization && this.chkField
            && ((gobj.isPersistSelection && Object.keys(this.selectedRowState).length === 0) ||
                !gobj.isPersistSelection)) {
            this.dataSuccess((!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result) ||
                this.parent.getDataModule().isRemote() ? this.parent.getCurrentViewRecords() :
                this.parent.renderModule.data.dataManager.dataSource.json);
        }
    };
    Selection.prototype.dataSuccess = function (res) {
        for (var i = 0; i < res.length; i++) {
            var pkValue = this.getPkValue(this.primaryKey, res[parseInt(i.toString(), 10)]);
            var checkedFieldData = res[parseInt(i.toString(), 10)][this.chkField];
            if (isNullOrUndefined(this.selectedRowState["" + pkValue]) && checkedFieldData && typeof checkedFieldData === 'boolean') {
                this.selectedRowState["" + pkValue] = checkedFieldData;
                if (this.parent.isPersistSelection) {
                    this.persistSelectedData.push(res[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    Selection.prototype.setRowSelection = function (state) {
        if (!(this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result))) {
            if (state) {
                if (this.isPartialSelection && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
                    var rowObj = this.parent.getRowsObject().filter(function (e) { return e.isSelectable; });
                    for (var _i = 0, rowObj_1 = rowObj; _i < rowObj_1.length; _i++) {
                        var row = rowObj_1[_i];
                        this.selectedRowState[this.getPkValue(this.primaryKey, row.data)] = true;
                    }
                }
                else {
                    var selectedData = this.isPartialSelection ? this.parent.partialSelectedRecords : this.getData();
                    if (this.parent.groupSettings.columns.length) {
                        for (var _a = 0, _b = this.isPartialSelection ? selectedData : selectedData.records; _a < _b.length; _a++) {
                            var data = _b[_a];
                            this.selectedRowState[this.getPkValue(this.primaryKey, data)] = true;
                        }
                    }
                    else {
                        for (var _c = 0, selectedData_1 = selectedData; _c < selectedData_1.length; _c++) {
                            var data = selectedData_1[_c];
                            this.selectedRowState[this.getPkValue(this.primaryKey, data)] = true;
                        }
                    }
                }
            }
            else {
                this.selectedRowState = {};
            }
            // (this.getData()).forEach(function (data) {
            //     this.selectedRowState[data[this.primaryKey]] = true;
            // })
        }
        else {
            if (state) {
                var selectedStateKeys = Object.keys(this.selectedRowState);
                var unSelectedRowStateKeys = Object.keys(this.unSelectedRowState);
                if (!this.isCheckboxReset) {
                    var rowData = (this.parent.groupSettings.columns.length && this.parent.isPersistSelection) ?
                        this.parent.currentViewData['records'] : this.parent.currentViewData;
                    for (var _d = 0, rowData_1 = rowData; _d < rowData_1.length; _d++) {
                        var data = rowData_1[_d];
                        if (!isNullOrUndefined(data[this.primaryKey])) {
                            var key = data[this.primaryKey].toString();
                            if (selectedStateKeys.indexOf(key) === -1 && unSelectedRowStateKeys.indexOf(key) === -1) {
                                this.selectedRowState[data[this.primaryKey]] = true;
                            }
                        }
                    }
                }
            }
            else {
                this.selectedRowState = {};
                this.unSelectedRowState = {};
                this.rmtHdrChkbxClicked = false;
            }
        }
    };
    Selection.prototype.getData = function () {
        return this.parent.getDataModule().dataManager.executeLocal(this.parent.getDataModule().generateQuery(true));
    };
    Selection.prototype.getAvailableSelectedData = function () {
        var filteredSearchedSelectedData = new DataManager(this.persistSelectedData).executeLocal(this.parent.getDataModule().generateQuery(true));
        if (this.parent.groupSettings.columns.length && filteredSearchedSelectedData &&
            filteredSearchedSelectedData.records) {
            filteredSearchedSelectedData = filteredSearchedSelectedData.records.slice();
        }
        return filteredSearchedSelectedData;
    };
    Selection.prototype.refreshPersistSelection = function () {
        var rows = this.parent.getRows();
        this.totalRecordsCount = this.parent.getCurrentViewRecords().length;
        if (this.parent.allowPaging) {
            this.totalRecordsCount = this.parent.pageSettings.totalRecordsCount;
        }
        if (!isNullOrUndefined(rows) && rows.length > 0 && (this.parent.isPersistSelection || this.chkField)) {
            var indexes = [];
            for (var j = 0; j < rows.length; j++) {
                var rowObj = this.getRowObj(rows[parseInt(j.toString(), 10)]);
                var pKey = rowObj ? rowObj.data ? this.getPkValue(this.primaryKey, rowObj.data) : null : null;
                if (pKey === null) {
                    return;
                }
                if (this.isPartialSelection && !rowObj.isSelectable) {
                    continue;
                }
                var checkState = void 0;
                var chkBox = rows[parseInt(j.toString(), 10)].querySelector('.e-checkselect');
                if (this.selectedRowState["" + pKey] || (this.parent.checkAllRows === 'Check' && this.selectedRowState["" + pKey] &&
                    this.totalRecordsCount === Object.keys(this.selectedRowState).length && this.chkAllCollec.indexOf(pKey) < 0)
                    || (this.parent.checkAllRows === 'Uncheck' && this.chkAllCollec.indexOf(pKey) > 0 && !this.parent.selectedRowIndex)
                    || (this.parent.checkAllRows === 'Intermediate' && !isNullOrUndefined(this.chkField) && rowObj.data[this.chkField])) {
                    indexes.push(parseInt(rows[parseInt(j.toString(), 10)].getAttribute(literals.ariaRowIndex), 10) - 1);
                    checkState = true;
                }
                else {
                    checkState = false;
                    if (this.checkedTarget !== chkBox && this.parent.isCheckBoxSelection && chkBox) {
                        removeAddCboxClasses(chkBox.nextElementSibling, checkState);
                    }
                }
                this.updatePersistCollection(rows[parseInt(j.toString(), 10)], checkState);
            }
            if (this.isSingleSel() && indexes.length > 0) {
                this.selectRow(indexes[0], true);
            }
            else {
                this.selectRows(indexes);
            }
        }
        if ((this.parent.isCheckBoxSelection || this.parent.selectionSettings.checkboxMode === 'ResetOnRowClick') && this.getCurrentBatchRecordChanges().length > 0) {
            this.setCheckAllState();
        }
    };
    Selection.prototype.actionBegin = function (e) {
        if (e.requestType === 'save' && this.parent.isPersistSelection) {
            var editChkBox = this.parent.element.querySelector('.e-edit-checkselect');
            if (!isNullOrUndefined(editChkBox)) {
                var row = closest(editChkBox, '.' + literals.editedRow);
                if (row) {
                    if (this.parent.editSettings.mode === 'Dialog') {
                        row = this.parent.element.querySelector('.e-dlgeditrow');
                    }
                    var rowObj = this.getRowObj(row);
                    if (!rowObj) {
                        return;
                    }
                    this.selectedRowState[this.getPkValue(this.primaryKey, rowObj.data)] = rowObj.isSelected = editChkBox.checked;
                }
                else {
                    this.isCheckedOnAdd = editChkBox.checked;
                }
            }
        }
        if (this.parent.isPersistSelection && this.isPartialSelection) {
            if (e.requestType === 'paging' && (this.parent.getDataModule().isRemote()
                || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result))) {
                this.selectedRowIndexes = [];
            }
            if (e.requestType === 'filtering' || e.requestType === 'searching') {
                this.parent.partialSelectedRecords = [];
                this.parent.disableSelectedRecords = [];
            }
        }
    };
    Selection.prototype.actionComplete = function (e) {
        if (e.requestType === 'save' && this.parent.isPersistSelection) {
            if (e.action === 'add') {
                if (this.isCheckedOnAdd) {
                    var rowObj = this.parent.getRowObjectFromUID(this.parent.getRows()[e.selectedRow].getAttribute('data-uid'));
                    this.selectedRowState[this.getPkValue(this.primaryKey, rowObj.data)] = rowObj.isSelected = this.isCheckedOnAdd;
                }
                this.isHdrSelectAllClicked = false;
                this.setCheckAllState();
            }
            this.refreshPersistSelection();
        }
        if (e.requestType === 'delete' && this.parent.isPersistSelection) {
            var records = e.data;
            var data = records.slice();
            for (var i = 0; i < data.length; i++) {
                var pkValue = this.getPkValue(this.primaryKey, data[parseInt(i.toString(), 10)]);
                if (!isNullOrUndefined(pkValue)) {
                    this.updatePersistDelete(pkValue, this.isPartialSelection);
                }
            }
            this.isHdrSelectAllClicked = false;
            this.setCheckAllState();
            this.totalRecordsCount = this.parent.pageSettings.totalRecordsCount;
        }
        if (e.requestType === 'paging') {
            if (this.parent.isPersistSelection && this.isPartialSelection && this.isHdrSelectAllClicked) {
                var rows = this.parent.getRowsObject();
                var indexes = [];
                for (var i = 0; i < rows.length; i++) {
                    if (rows[parseInt(i.toString(), 10)].isSelectable) {
                        indexes.push(rows[parseInt(i.toString(), 10)].index);
                    }
                }
                if (indexes.length) {
                    this.selectRows(indexes);
                }
            }
            this.prevRowIndex = undefined;
            this.prevCIdxs = undefined;
            this.prevECIdxs = undefined;
        }
    };
    Selection.prototype.onDataBound = function () {
        var checkboxColumn = this.parent.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (checkboxColumn.length && !this.parent.getDataModule().isRemote()) {
            this.gridCurrentRecord = this.getData();
        }
        if (!this.parent.enableVirtualization && this.parent.isPersistSelection) {
            if (this.selectedRecords.length) {
                this.isPrevRowSelection = true;
            }
        }
        if ((this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result)) && this.rmtHdrChkbxClicked) {
            if (this.parent.checkAllRows === 'Intermediate') {
                this.setRowSelection(true);
            }
            else if (this.parent.checkAllRows === 'Uncheck') {
                this.setRowSelection(false);
            }
        }
        if (this.parent.enableVirtualization) {
            this.setCheckAllState();
        }
        if (this.parent.isPersistSelection) {
            this.refreshPersistSelection();
        }
        this.initialRowSelection = this.isRowType() && this.parent.element.querySelectorAll('.e-selectionbackground') &&
            this.parent.getSelectedRows().length ? true : false;
        if (this.parent.isCheckBoxSelection && !this.initialRowSelection) {
            var totalRecords = this.parent.getRowsObject();
            var indexes = [];
            for (var i = 0; i < totalRecords.length; i++) {
                if (totalRecords[parseInt(i.toString(), 10)].isSelected) {
                    indexes.push(i);
                }
            }
            if (indexes.length) {
                this.selectRows(indexes);
            }
            this.initialRowSelection = true;
        }
    };
    Selection.prototype.updatePersistSelectedData = function (checkState) {
        if (this.parent.isPersistSelection) {
            var rows = this.parent.getRows();
            for (var i = 0; i < rows.length; i++) {
                this.updatePersistCollection(rows[parseInt(i.toString(), 10)], checkState);
            }
            if (this.parent.checkAllRows === 'Uncheck') {
                this.setRowSelection(false);
                this.persistSelectedData = (this.parent.getDataModule().isRemote()
                    || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result))
                    ? this.persistSelectedData : [];
            }
            else if (this.parent.checkAllRows === 'Check') {
                this.setRowSelection(true);
                this.persistSelectedData = !(this.parent.getDataModule().isRemote()
                    || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result))
                    && !this.isPartialSelection ?
                    this.parent.groupSettings.columns.length ? this.getData().records.slice() :
                        this.getData().slice() : this.persistSelectedData;
            }
        }
    };
    Selection.prototype.checkSelectAllAction = function (checkState) {
        var cRenderer = this.getRenderer();
        var editForm = this.parent.element.querySelector('.e-gridform');
        this.checkedTarget = this.getCheckAllBox();
        if (checkState && this.getCurrentBatchRecordChanges().length) {
            this.parent.checkAllRows = 'Check';
            this.updatePersistSelectedData(checkState);
            this.selectRowsByRange(cRenderer.getVirtualRowIndex(0), cRenderer.getVirtualRowIndex(this.getCurrentBatchRecordChanges().length - 1));
            if (this.checkVirtualCheckBox() && !this.parent.isPersistSelection) {
                this.virtualSelectedData = this.virtualCheckBoxData().slice();
                this.selectedRowIndexes = Object.keys(this.virtualSelectedData).map(function (key) { return parseInt(key, 10); });
            }
        }
        else {
            this.parent.checkAllRows = 'Uncheck';
            this.updatePersistSelectedData(checkState);
            this.clearSelection();
        }
        this.chkAllCollec = [];
        if (!isNullOrUndefined(editForm)) {
            var editChkBox = editForm.querySelector('.e-edit-checkselect');
            if (!isNullOrUndefined(editChkBox)) {
                removeAddCboxClasses(editChkBox.nextElementSibling, checkState);
            }
        }
    };
    Selection.prototype.checkSelectAll = function (checkBox) {
        var _this = this;
        var stateStr = this.getCheckAllStatus(checkBox);
        var state = stateStr === 'Check';
        this.isHeaderCheckboxClicked = true;
        if ((this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result)) && ((stateStr === 'Uncheck' || this.isCheckboxReset) ||
            (stateStr === 'Intermediate' && this.parent.isPersistSelection))) {
            this.rmtHdrChkbxClicked = true;
        }
        else {
            this.rmtHdrChkbxClicked = false;
        }
        if (this.rmtHdrChkbxClicked && this.isCheckboxReset) {
            this.unSelectedRowState = {};
        }
        this.isCheckboxReset = false;
        if (stateStr === 'Intermediate') {
            if (!this.chkField && !this.parent.isPersistSelection) {
                state = this.getCurrentBatchRecordChanges().some(function (data) {
                    return _this.getPkValue(_this.primaryKey, data) in _this.selectedRowState;
                });
            }
            if ((this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
                && this.parent.dataSource.result)) && this.parent.isPersistSelection) {
                for (var i = 0; i < this.getCurrentBatchRecordChanges().length; i++) {
                    if (!isNullOrUndefined(this.getPkValue(this.primaryKey, this.getCurrentBatchRecordChanges()["" + i]))) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (Object.keys(this.selectedRowState).includes((this.getPkValue(this.primaryKey, this.getCurrentBatchRecordChanges()["" + i])).toString())) {
                            state = true;
                        }
                        else {
                            state = false;
                            break;
                        }
                    }
                }
            }
        }
        if (this.parent.isPersistSelection && this.parent.allowPaging) {
            this.totalRecordsCount = this.parent.pageSettings.totalRecordsCount;
        }
        this.checkSelectAllAction(!state);
        this.target = null;
        if (this.getCurrentBatchRecordChanges().length > 0) {
            this.setCheckAllState();
            this.updateSelectedRowIndexes();
        }
        this.triggerChkChangeEvent(checkBox, !state);
    };
    Selection.prototype.getCheckAllStatus = function (ele) {
        var classes;
        if (!isNullOrUndefined(ele)) {
            classes = ele.nextElementSibling.classList;
        }
        else {
            if (!isNullOrUndefined(this.getCheckAllBox())) {
                classes = this.getCheckAllBox().nextElementSibling.classList;
            }
        }
        var status = 'None';
        if (classes instanceof DOMTokenList) {
            if (classes.contains('e-check')) {
                status = 'Check';
            }
            else if (classes.contains('e-uncheck')) {
                status = 'Uncheck';
            }
            else if (classes.contains('e-stop')) {
                status = 'Intermediate';
            }
        }
        return status;
    };
    Selection.prototype.checkSelect = function (checkBox) {
        var target = closest(this.checkedTarget, '.' + literals.rowCell);
        var gObj = this.parent;
        this.isMultiCtrlRequest = true;
        var rIndex = 0;
        this.isHeaderCheckboxClicked = false;
        if (isGroupAdaptive(gObj)) {
            var uid = target.parentElement.getAttribute('data-uid');
            if (this.parent.enableVirtualization && this.parent.groupSettings.columns.length) {
                rIndex = parseInt(target.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
            }
            else {
                rIndex = gObj.getRows().map(function (m) { return m.getAttribute('data-uid'); }).indexOf(uid);
            }
        }
        else {
            rIndex = parseInt(target.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
        }
        if (this.parent.isPersistSelection && this.parent.element.getElementsByClassName(literals.addedRow).length > 0 &&
            this.parent.editSettings.newRowPosition === 'Top' && !this.parent.editSettings.showAddNewRow) {
            ++rIndex;
        }
        this.rowCellSelectionHandler(rIndex, parseInt(target.getAttribute(literals.ariaColIndex), 10) - 1);
        this.moveIntoUncheckCollection(closest(target, '.' + literals.row));
        this.setCheckAllState();
        this.isMultiCtrlRequest = false;
        this.triggerChkChangeEvent(checkBox, checkBox.nextElementSibling.classList.contains('e-check'));
    };
    Selection.prototype.moveIntoUncheckCollection = function (row) {
        if (this.parent.checkAllRows === 'Check' || this.parent.checkAllRows === 'Uncheck') {
            var rowObj = this.getRowObj(row);
            var pKey = rowObj && rowObj.data ? this.getPkValue(this.primaryKey, rowObj.data) : null;
            if (!pKey) {
                return;
            }
            if (this.chkAllCollec.indexOf(pKey) < 0) {
                this.chkAllCollec.push(pKey);
            }
            else {
                this.chkAllCollec.splice(this.chkAllCollec.indexOf(pKey), 1);
            }
        }
    };
    Selection.prototype.triggerChkChangeEvent = function (checkBox, checkState) {
        this.parent.trigger(events.checkBoxChange, {
            checked: checkState, selectedRowIndexes: this.parent.getSelectedRowIndexes(),
            target: checkBox
        });
        if (!this.parent.isEdit) {
            this.checkedTarget = null;
        }
    };
    Selection.prototype.updateSelectedRowIndexes = function () {
        if (this.parent.isCheckBoxSelection && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) &&
            this.isPartialSelection && !(this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result))
            && this.parent.selectionSettings.persistSelection) {
            if (this.parent.checkAllRows !== 'Uncheck') {
                var rowObj = this.parent.getRowsObject().filter(function (e) { return e.isSelectable; });
                for (var _i = 0, rowObj_2 = rowObj; _i < rowObj_2.length; _i++) {
                    var row = rowObj_2[_i];
                    this.selectedRowIndexes.push(row.index);
                }
            }
        }
        if (this.parent.isCheckBoxSelection && this.parent.enableVirtualization && !this.isPartialSelection &&
            (this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
                && this.parent.dataSource.result))
            && !this.parent.isPersistSelection && this.parent.checkAllRows === 'Check') {
            var rowObj = this.parent.getRowsObject().filter(function (e) { return e.isSelectable; });
            if (rowObj.length !== this.selectedRowIndexes.length) {
                for (var _a = 0, rowObj_3 = rowObj; _a < rowObj_3.length; _a++) {
                    var row = rowObj_3[_a];
                    if (this.selectedRowIndexes.indexOf(row.index) <= -1) {
                        this.selectedRowIndexes.push(row.index);
                    }
                }
            }
        }
    };
    Selection.prototype.updateSelectedRowIndex = function (index) {
        if (this.parent.isCheckBoxSelection && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)
            && !(this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
                && this.parent.dataSource.result))
            && !this.isPartialSelection) {
            if (this.parent.checkAllRows === 'Check') {
                this.selectedRowIndexes = [];
                var dataLength = this.parent.groupSettings.columns.length ? this.getData()['records'].length :
                    this.getData().length;
                for (var data = 0; data < dataLength; data++) {
                    this.selectedRowIndexes.push(data);
                }
            }
            else if (this.parent.checkAllRows === 'Uncheck') {
                this.selectedRowIndexes = [];
            }
            else {
                var row = this.parent.getRowByIndex(index);
                if (index && row && row.getAttribute('aria-selected') === 'false') {
                    var selectedVal = this.selectedRowIndexes.indexOf(index);
                    this.selectedRowIndexes.splice(selectedVal, 1);
                }
            }
        }
    };
    Selection.prototype.isAllSelected = function (count) {
        if (this.parent.getDataModule().isRemote()
            || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result)) {
            return this.getAvailableSelectedData().length === (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling
                ? this.parent.totalDataRecordsCount : this.totalRecordsCount);
        }
        else {
            if (this.isPartialSelection) {
                if (this.parent.allowPaging && this.parent.pageSettings.pageSize < this.parent.pageSettings.totalRecordsCount) {
                    var data = this.parent.partialSelectedRecords;
                    for (var i = 0; i < data.length; i++) {
                        var pKey = this.getPkValue(this.primaryKey, data[parseInt(i.toString(), 10)]);
                        if (!this.selectedRowState["" + pKey]) {
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    return this.isSelectAllRowCount(count);
                }
            }
            else {
                var data = this.getData();
                if (this.parent.groupSettings.columns.length && data['records']) {
                    data = data['records'];
                }
                for (var i = 0; i < data.length; i++) {
                    var pKey = this.getPkValue(this.primaryKey, data[parseInt(i.toString(), 10)]);
                    if (!this.selectedRowState["" + pKey]) {
                        return false;
                    }
                }
                return true;
            }
        }
    };
    Selection.prototype.someDataSelected = function () {
        if ((this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result))
            && (this.parent.searchSettings.key.length || this.parent.filterSettings.columns.length)) {
            var filteredSearchedSelectedData = this.getAvailableSelectedData();
            for (var i = 0; i < filteredSearchedSelectedData.length; i++) {
                var pKey = this.getPkValue(this.primaryKey, filteredSearchedSelectedData[parseInt(i.toString(), 10)]);
                if (this.selectedRowState["" + pKey]) {
                    return false;
                }
            }
        }
        var data = this.isPartialSelection ? this.parent.partialSelectedRecords
            : (this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
                && this.parent.dataSource.result)) ? [] : this.getData();
        for (var i = 0; i < data.length; i++) {
            var pKey = this.getPkValue(this.primaryKey, data[parseInt(i.toString(), 10)]);
            if (this.selectedRowState["" + pKey]) {
                return false;
            }
        }
        return true;
    };
    Selection.prototype.setCheckAllState = function (index, isInteraction) {
        if (this.parent.isCheckBoxSelection || this.parent.selectionSettings.checkboxMode === 'ResetOnRowClick') {
            var checkToSelectAll = false;
            var isFiltered = false;
            var checkedLen = Object.keys(this.selectedRowState).length;
            if (!this.parent.isPersistSelection) {
                checkedLen = this.selectedRowIndexes.length;
                this.totalRecordsCount = this.getCurrentBatchRecordChanges().length;
            }
            if (this.parent.isPersistSelection && !((this.parent.getDataModule().isRemote() ||
                (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result)) &&
                this.isPartialSelection)
                && (this.parent.searchSettings.key.length || this.parent.filterSettings.columns.length)) {
                isFiltered = true;
                checkToSelectAll = this.isAllSelected(checkedLen);
            }
            var input = this.getCheckAllBox();
            if (input) {
                var spanEle = input.nextElementSibling;
                removeClass([spanEle], ['e-check', 'e-stop', 'e-uncheck']);
                setChecked(input, false);
                input.indeterminate = false;
                var getRecord = this.parent.getDataModule().isRemote() ? [] : this.gridCurrentRecord;
                if (this.parent.groupSettings.columns.length && getRecord['records']) {
                    getRecord = getRecord['records'];
                }
                this.totalRecordsCount = this.checkVirtualCheckBox() ? getRecord.length : this.totalRecordsCount;
                if ((checkToSelectAll && isFiltered && (this.parent.getDataModule().isRemote() ||
                    (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result) ||
                    getRecord.length)) || (!isFiltered && ((checkedLen === this.totalRecordsCount && this.totalRecordsCount
                    && !this.isPartialSelection && (!(this.parent.getDataModule().isRemote()
                    || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result))
                    || this.parent.allowPaging)) ||
                    (!this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling
                        && this.isPartialSelection && (this.isSelectAllRowCount(checkedLen) || this.isHdrSelectAllClicked))
                    || ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)
                        && !this.parent.allowPaging && ((!(this.parent.getDataModule().isRemote()
                        || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result)) &&
                        getRecord.length && checkedLen === getRecord.length) || ((this.parent.getDataModule().isRemote()
                        || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result)) &&
                        !this.isPartialSelection && ((checkedLen === this.parent.totalDataRecordsCount) || ((this.
                        isSelectAllRowCount(checkedLen) || checkedLen === this.totalRecordsCount) && !this.parent.isPersistSelection))) ||
                        (this.isPartialSelection && (this.isHdrSelectAllClicked || this.isSelectAllRowCount(checkedLen)))))
                    || (checkedLen === this.totalRecordsCount && this.totalRecordsCount && !this.isPartialSelection &&
                        !this.parent.allowPaging && !this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling)))) {
                    addClass([spanEle], ['e-check']);
                    setChecked(input, true);
                    if (isInteraction) {
                        this.getRenderer().setSelection(null, true, true);
                    }
                    this.parent.checkAllRows = 'Check';
                }
                else if (((!this.selectedRowIndexes.length && (!this.parent.enableVirtualization ||
                    (!this.persistSelectedData.length && !isFiltered) || (isFiltered && this.someDataSelected())) ||
                    checkedLen === 0 && this.getCurrentBatchRecordChanges().length === 0) && !this.parent.allowPaging) ||
                    (this.parent.allowPaging && (checkedLen === 0 || (checkedLen && isFiltered && this.someDataSelected())))) {
                    addClass([spanEle], ['e-uncheck']);
                    if (isInteraction) {
                        this.getRenderer().setSelection(null, false, true);
                    }
                    this.parent.checkAllRows = 'Uncheck';
                }
                else {
                    addClass([spanEle], ['e-stop']);
                    this.parent.checkAllRows = 'Intermediate';
                    input.indeterminate = true;
                }
                if (checkedLen === 0 && this.getCurrentBatchRecordChanges().length === 0) {
                    addClass([spanEle.parentElement], ['e-checkbox-disabled']);
                }
                else {
                    removeClass([spanEle.parentElement], ['e-checkbox-disabled']);
                }
                if (this.isPartialSelection) {
                    var rowCount = this.parent.getRowsObject().filter(function (e) { return e.isSelectable; }).length;
                    if (rowCount === 0 && spanEle.parentElement.querySelector('.e-frame').classList.contains('e-uncheck')) {
                        addClass([spanEle.parentElement], ['e-checkbox-disabled']);
                    }
                    else {
                        removeClass([spanEle.parentElement], ['e-checkbox-disabled']);
                    }
                }
                if ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)
                    && !this.parent.allowPaging && !(this.parent.getDataModule().isRemote()
                    || (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result))) {
                    this.updateSelectedRowIndex(index);
                }
            }
        }
    };
    Selection.prototype.checkVirtualCheckBox = function () {
        return this.parent.enableVirtualization && !(this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result)) && this.parent.isCheckBoxSelection && !this.isPartialSelection;
    };
    Selection.prototype.virtualCheckBoxData = function () {
        var data = this.getData();
        if (this.parent.groupSettings.columns.length && data['records']) {
            data = data['records'];
        }
        return data;
    };
    Selection.prototype.isSelectAllRowCount = function (count) {
        var rowCount = 0;
        var rowObj = this.parent.getRowsObject();
        if (this.parent.selectionSettings.persistSelection && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
            var dataLen = (this.parent.getDataModule().isRemote() || (!isNullOrUndefined(this.parent.dataSource)
                && this.parent.dataSource.result)) ?
                this.parent.totalDataRecordsCount : this.getData() && this.getData().length;
            if (dataLen === rowObj.length) {
                rowCount = rowObj.filter(function (e) { return e.isSelectable; }).length;
                return rowCount && count === rowCount;
            }
            else {
                return false;
            }
        }
        else {
            if (this.parent.allowPaging && this.parent.selectionSettings.persistSelection) {
                rowCount = this.parent.partialSelectedRecords.length + this.parent.disableSelectedRecords.length;
                if (rowCount === this.totalRecordsCount) {
                    return this.parent.partialSelectedRecords.length && count === this.parent.partialSelectedRecords.length;
                }
                else {
                    return false;
                }
            }
            else {
                rowCount = rowObj.filter(function (e) { return e.isSelectable; }).length;
                return rowCount && count === rowCount;
            }
        }
    };
    Selection.prototype.keyDownHandler = function (e) {
        // Below are keyCode for command key in MAC OS. Safari/Chrome(91-Left command, 93-Right Command), Opera(17), FireFox(224)
        if ((Browser.info.name === 'opera' && e.keyCode === 17) || (Browser.info.name === 'mozilla' && e.keyCode === 224) ||
            (((Browser.info.name === 'safari') || (Browser.info.name === 'chrome')) && (e.keyCode === 91 || e.keyCode === 93))) {
            this.cmdKeyPressed = true;
        }
        var targetHeadCell = parentsUntil(e.target, 'e-headercell');
        var targetRowCell = parentsUntil(e.target, literals.rowCell);
        var isCheckBox = targetHeadCell ? targetHeadCell.children[0].classList.contains('e-headerchkcelldiv') :
            targetRowCell ? targetRowCell.classList.contains('e-gridchkbox') : false;
        if (isCheckBox && !this.parent.allowKeyboard && e.keyCode === 32) {
            e.preventDefault();
        }
    };
    Selection.prototype.keyUpHandler = function (e) {
        if ((Browser.info.name === 'opera' && e.keyCode === 17) || (Browser.info.name === 'mozilla' && e.keyCode === 224) ||
            (((Browser.info.name === 'safari') || (Browser.info.name === 'chrome')) && (e.keyCode === 91 || e.keyCode === 93))) {
            this.cmdKeyPressed = false;
        }
    };
    Selection.prototype.clickHandler = function (e) {
        var target = e.target;
        this.actualTarget = target;
        if (!this.isAutoFillSel && !e.ctrlKey && !e.shiftKey) {
            this.startAFCell = this.endAFCell = null;
        }
        if (this.selectionSettings.persistSelection) {
            this.deSelectedData = iterateExtend(this.persistSelectedData);
        }
        if (parentsUntil(target, literals.row) || parentsUntil(target, 'e-headerchkcelldiv') ||
            (this.selectionSettings.allowColumnSelection && target.classList.contains('e-headercell'))) {
            this.isInteracted = true;
        }
        this.cmdKeyPressed = e.metaKey;
        this.isMultiCtrlRequest = e.ctrlKey || this.enableSelectMultiTouch ||
            (this.isMacOS && this.cmdKeyPressed);
        if (!this.parent.allowKeyboard) {
            this.isMultiShiftRequest = false;
            this.isMultiCtrlRequest = false;
        }
        else {
            this.isMultiShiftRequest = e.shiftKey;
        }
        this.isMultiCtrlRequestCell = this.isMultiCtrlRequest;
        this.popUpClickHandler(e);
        var chkSelect = false;
        this.preventFocus = true;
        var checkBox;
        var checkWrap = parentsUntil(target, 'e-checkbox-wrapper');
        this.checkSelectAllClicked = checkWrap && checkWrap.getElementsByClassName('e-checkselectall') ||
            (this.selectionSettings.persistSelection && parentsUntil(target, literals.row)) ? true : false;
        if (this.selectionSettings.persistSelection && this.isPartialSelection && parentsUntil(target, 'e-headerchkcelldiv')
            && !target.querySelector('.e-checkbox-disabled')) {
            this.isHdrSelectAllClicked = true;
        }
        if (checkWrap && checkWrap.querySelectorAll('.e-checkselect,.e-checkselectall').length > 0) {
            checkBox = checkWrap.querySelector('input[type="checkbox"]');
            chkSelect = true;
        }
        this.drawBorders();
        this.updateAutoFillPosition();
        target = parentsUntil(target, literals.rowCell);
        if (this.parent.isReact && (target && !target.parentElement && target.classList.contains('e-rowcell'))) {
            target = this.parent.getCellFromIndex(parseInt(target.getAttribute('index'), 10), parseInt(target.getAttribute('aria-colindex'), 10) - 1);
        }
        if (this.isRowDragSelected && isNullOrUndefined(target) && this.parent.allowRowDragAndDrop &&
            this.selectionSettings.persistSelection && this.checkSelectAllClicked) {
            this.isRowDragSelected = false;
        }
        if (((target && target.parentElement.classList.contains(literals.row) && !this.parent.selectionSettings.checkboxOnly) || chkSelect)
            && !this.isRowDragSelected) {
            if (this.parent.isCheckBoxSelection) {
                this.isMultiCtrlRequest = true;
            }
            this.target = target;
            if (!isNullOrUndefined(checkBox)) {
                this.checkedTarget = checkBox;
                if (checkBox.classList.contains('e-checkselectall')) {
                    this.checkSelectAll(checkBox);
                }
                else {
                    this.checkSelect(checkBox);
                }
            }
            else {
                var rIndex = 0;
                rIndex = parseInt(target.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
                if (this.parent.isPersistSelection && !this.parent.editSettings.showAddNewRow
                    && this.parent.element.getElementsByClassName(literals.addedRow).length > 0) {
                    ++rIndex;
                }
                if (!this.mUPTarget || !this.mUPTarget.isEqualNode(target)) {
                    this.rowCellSelectionHandler(rIndex, parseInt(target.getAttribute(literals.ariaColIndex), 10) - 1);
                }
                if (this.parent.isCheckBoxSelection) {
                    this.moveIntoUncheckCollection(closest(target, '.' + literals.row));
                    this.setCheckAllState();
                }
            }
            if (!this.parent.isCheckBoxSelection && Browser.isDevice && !this.isSingleSel()) {
                this.showPopup(e);
            }
        }
        else if (e.target.classList.contains('e-headercell') &&
            !e.target.classList.contains('e-stackedheadercell')) {
            var uid = e.target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
            this.headerSelectionHandler(this.parent.getColumnIndexByUid(uid));
        }
        this.isMultiCtrlRequest = false;
        this.isMultiCtrlRequestCell = this.isMultiCtrlRequest;
        this.isMultiShiftRequest = false;
        if (isNullOrUndefined(closest(e.target, '.e-unboundcell'))) {
            this.preventFocus = false;
        }
    };
    Selection.prototype.popUpClickHandler = function (e) {
        var target = e.target;
        if (closest(target, '.e-headercell') || e.target.classList.contains(literals.rowCell) ||
            closest(target, '.e-gridpopup')) {
            if (target.classList.contains('e-rowselect')) {
                if (!target.classList.contains('e-spanclicked')) {
                    target.classList.add('e-spanclicked');
                    this.enableSelectMultiTouch = true;
                }
                else {
                    target.classList.remove('e-spanclicked');
                    this.enableSelectMultiTouch = false;
                    this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
                }
            }
        }
        else {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    Selection.prototype.showPopup = function (e) {
        if (!this.selectionSettings.enableSimpleMultiRowSelection) {
            setCssInGridPopUp(this.parent.element.querySelector('.e-gridpopup'), e, 'e-rowselect e-icons e-icon-rowselect' +
                (!this.isSingleSel() && (this.selectedRecords.length > 1
                    || this.selectedRowCellIndexes.length > 1) ? ' e-spanclicked' : ''));
        }
    };
    Selection.prototype.rowCellSelectionHandler = function (rowIndex, cellIndex) {
        if ((!this.isMultiCtrlRequest && !this.isMultiShiftRequest) || this.isSingleSel()) {
            if (!this.isDragged) {
                this.selectRow(rowIndex, this.selectionSettings.enableToggle);
            }
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, this.selectionSettings.enableToggle);
            if (this.selectedRowCellIndexes.length) {
                this.updateAutoFillPosition();
            }
            this.drawBorders();
        }
        else if (this.isMultiShiftRequest) {
            if (this.parent.isCheckBoxSelection || (!this.parent.isCheckBoxSelection &&
                !closest(this.target, '.' + literals.rowCell).classList.contains(literals.gridChkBox))) {
                this.selectRowsByRange(isUndefined(this.prevRowIndex) ? rowIndex : this.prevRowIndex, rowIndex);
            }
            else {
                this.addRowsToSelection([rowIndex]);
            }
            this.selectCellsByRange(isUndefined(this.prevCIdxs) ? { rowIndex: rowIndex, cellIndex: cellIndex } : this.prevCIdxs, { rowIndex: rowIndex, cellIndex: cellIndex });
            this.updateAutoFillPosition();
            this.drawBorders();
        }
        else {
            this.addRowsToSelection([rowIndex]);
            if (this.selectionSettings.mode === 'Both') {
                var checkboxColumn = this.parent.getColumns().find(function (col) { return col.type === 'checkbox'; });
                var checkboxColumnIndexCheck = checkboxColumn && checkboxColumn.index !== cellIndex;
                if (checkboxColumnIndexCheck && !this.isMultiCtrlRequestCell) {
                    this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, this.selectionSettings.enableToggle);
                }
                else if (!checkboxColumn || checkboxColumnIndexCheck) {
                    this.addCellsToSelection([{ rowIndex: rowIndex, cellIndex: cellIndex }]);
                }
            }
            else {
                this.addCellsToSelection([{ rowIndex: rowIndex, cellIndex: cellIndex }]);
            }
            this.showHideBorders('none');
        }
        this.isDragged = false;
    };
    Selection.prototype.onCellFocused = function (e) {
        if (this.parent.frozenRows && e.container.isHeader && e.byKey) {
            if (e.keyArgs.action === 'upArrow') {
                if (this.parent.allowFiltering) {
                    e.isJump = e.element.tagName === 'INPUT' ? true : false;
                }
                else {
                    e.isJump = e.element.tagName === 'TH' ? true : false;
                }
            }
            else {
                if (e.keyArgs.action === 'downArrow') {
                    var rIdx = Number(e.element.parentElement.getAttribute(literals.ariaRowIndex)) - 1;
                    e.isJump = rIdx === 0 ? true : false;
                }
                else {
                    if (e.keyArgs.action === 'ctrlHome') {
                        e.isJump = true;
                    }
                }
            }
        }
        var clear = ((e.container.isHeader && e.isJump) ||
            (e.container.isContent && !e.container.isSelectable)) && !(e.byKey && e.keyArgs.action === 'space')
            && !(e.element.classList.contains('e-detailrowexpand') || e.element.classList.contains('e-detailrowcollapse'));
        var headerAction = (e.container.isHeader && e.element.tagName !== 'TD' && !closest(e.element, '.' + literals.rowCell))
            && !(e.byKey && e.keyArgs.action === 'space');
        if (!e.byKey || clear) {
            if (clear && !(this.parent.isCheckBoxSelection || (this.selectionSettings.persistSelection && (e.parent.classList.contains('e-recordplusexpand') ||
                e.parent.classList.contains('e-groupcaption'))))) {
                this.clearSelection();
            }
            return;
        }
        var _a = e.container.isContent ? e.container.indexes : e.indexes, rowIndex = _a[0], cellIndex = _a[1];
        var prev = this.focus.getPrevIndexes();
        if (e.element.parentElement.querySelector('.e-rowcelldrag') || e.element.parentElement.querySelector('.e-dtdiagonalright')
            || e.element.parentElement.querySelector('.e-dtdiagonaldown')) {
            prev.cellIndex = prev.cellIndex - 1;
        }
        if (this.parent.frozenRows) {
            if (e.container.isHeader && (e.element.tagName === 'TD' || closest(e.element, '.' + literals.rowCell))) {
                var hdrLength = this.parent.getHeaderTable().querySelector('thead').childElementCount;
                if (this.parent.editSettings.showAddNewRow && this.parent.editSettings.newRowPosition === 'Top' &&
                    e.keyArgs.action === 'upArrow') {
                    hdrLength++;
                }
                rowIndex -= hdrLength;
                prev.rowIndex = !isNullOrUndefined(prev.rowIndex) ? prev.rowIndex - hdrLength : null;
            }
            else {
                rowIndex += this.parent.frozenRows;
                prev.rowIndex = prev.rowIndex === 0 || !isNullOrUndefined(prev.rowIndex) ? prev.rowIndex + this.parent.frozenRows : null;
            }
        }
        if (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache) {
            rowIndex = parseInt(e.element.parentElement.getAttribute('aria-rowindex'), 10) - 1;
        }
        if ((headerAction || (['ctrlPlusA', 'escape'].indexOf(e.keyArgs.action) === -1 &&
            e.keyArgs.action !== 'space' && rowIndex === prev.rowIndex && cellIndex === prev.cellIndex)) &&
            !this.selectionSettings.allowColumnSelection) {
            return;
        }
        if (this.parent.enableVirtualization) {
            rowIndex = parseInt(e.element.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            if (!this.parent.enableColumnVirtualization && !this.parent.groupSettings.columns.length &&
                this.parent.totalDataRecordsCount >= 1) {
                if (e.keyArgs.action === 'ctrlHome') {
                    rowIndex = 0;
                    this.parent.isFocusFirstCell = true;
                }
                else if (e.keyArgs.action === 'ctrlEnd') {
                    rowIndex = this.parent.totalDataRecordsCount - 1;
                    this.isFocusLastCell = true;
                }
            }
        }
        if (this.parent.editSettings.showAddNewRow && this.parent.editSettings.newRowPosition === 'Top' &&
            (!this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling) && e.keyArgs.action === 'downArrow') {
            rowIndex--;
        }
        this.preventFocus = true;
        var columnIndex = this.getKeyColIndex(e);
        if (this.needColumnSelection) {
            cellIndex = columnIndex;
        }
        if (this.parent.element.classList.contains('e-gridcell-read') && (e.keyArgs.action === 'tab' || e.keyArgs.action === 'shiftTab'
            || e.keyArgs.action === 'rightArrow' || e.keyArgs.action === 'leftArrow')) {
            var targetLabel = this.target.getAttribute('aria-label');
            targetLabel = this.target.innerHTML + ' column header ' + this.parent.getColumnByIndex(cellIndex).field;
            this.target.setAttribute('aria-label', targetLabel);
        }
        switch (e.keyArgs.action) {
            case 'downArrow':
            case 'upArrow':
            case 'enter':
            case 'shiftEnter':
                this.target = e.element;
                this.isKeyAction = true;
                this.applyDownUpKey(rowIndex, cellIndex);
                break;
            case 'rightArrow':
            case 'leftArrow':
                this.applyRightLeftKey(rowIndex, cellIndex);
                break;
            case 'shiftDown':
            case 'shiftUp':
                this.shiftDownKey(rowIndex, cellIndex);
                break;
            case 'shiftLeft':
            case 'shiftRight':
                this.applyShiftLeftRightKey(rowIndex, cellIndex);
                break;
            case 'home':
            case 'end':
                cellIndex = e.keyArgs.action === 'end' ? this.getLastColIndex(rowIndex) : 0;
                this.applyHomeEndKey(rowIndex, cellIndex);
                break;
            case 'ctrlHome':
            case 'ctrlEnd':
                this.applyCtrlHomeEndKey(rowIndex, cellIndex);
                break;
            case 'escape':
                this.clearSelection();
                if (this.parent.clipboardModule) {
                    window.navigator['clipboard'].writeText('');
                }
                break;
            case 'ctrlPlusA':
                this.ctrlPlusA();
                break;
            case 'space':
                this.applySpaceSelection(e.element);
                break;
            case 'tab':
                if (this.parent.editSettings.allowNextRowEdit) {
                    this.selectRow(rowIndex);
                }
                break;
        }
        this.needColumnSelection = false;
        this.preventFocus = false;
        this.positionBorders();
        if (this.parent.isFrozenGrid()) {
            this.showHideBorders('none', true);
            this.refreshFrozenBorders();
        }
        this.updateAutoFillPosition();
    };
    Selection.prototype.getKeyColIndex = function (e) {
        var uid;
        var index = null;
        var stackedHeader = e.element.querySelector('.e-stackedheadercelldiv');
        if (this.selectionSettings.allowColumnSelection && parentsUntil(e.element, 'e-columnheader')) {
            this.needColumnSelection = e.container.isHeader ? true : false;
            if (stackedHeader) {
                if (e.keyArgs.action === 'rightArrow' || e.keyArgs.action === 'leftArrow') {
                    return index;
                }
                uid = stackedHeader.getAttribute('e-mappinguid');
                var innerColumn = this.getstackedColumns(this.parent.getColumnByUid(uid).columns);
                var lastIndex = this.parent.getColumnIndexByUid(innerColumn[innerColumn.length - 1].uid);
                var firstIndex = this.parent.getColumnIndexByUid(innerColumn[0].uid);
                index = this.prevColIndex >= lastIndex ? firstIndex : lastIndex;
            }
            else {
                index = this.parent.getColumnIndexByUid(e.element
                    .querySelector('.e-headercelldiv').getAttribute('e-mappinguid'));
            }
        }
        return index;
    };
    /**
     * Apply ctrl + A key selection
     *
     * @returns {void}
     * @hidden
     */
    Selection.prototype.ctrlPlusA = function () {
        if (this.isRowType() && !this.isSingleSel()) {
            var rowObj = this.parent.getRowsObject();
            this.selectRowsByRange(rowObj[0].index, rowObj[rowObj.length - 1].index);
        }
        if (this.isCellType() && !this.isSingleSel()) {
            this.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: this.parent.getRows().length - 1, cellIndex: this.parent.getColumns().length - 1 });
        }
    };
    Selection.prototype.applySpaceSelection = function (target) {
        if (target.classList.contains('e-checkselectall')) {
            this.checkedTarget = target;
            this.checkSelectAll(this.checkedTarget);
        }
        else {
            if (target.classList.contains('e-checkselect')) {
                this.checkedTarget = target;
                this.checkSelect(this.checkedTarget);
            }
        }
    };
    Selection.prototype.applyDownUpKey = function (rowIndex, cellIndex) {
        var gObj = this.parent;
        if (this.parent.isCheckBoxSelection && this.parent.checkAllRows === 'Check' && !this.selectionSettings.persistSelection &&
            !this.selectionSettings.checkboxOnly) {
            this.checkSelectAllAction(false);
            this.checkedTarget = null;
        }
        if (this.isRowType() && !this.selectionSettings.checkboxOnly) {
            if (this.parent.frozenRows) {
                this.selectRow(rowIndex, true);
                this.applyUpDown(gObj.selectedRowIndex);
            }
            else {
                this.selectRow(rowIndex, true);
                this.applyUpDown(gObj.selectedRowIndex);
            }
        }
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
        if (this.selectionSettings.allowColumnSelection && this.needColumnSelection) {
            this.selectColumn(cellIndex);
        }
    };
    Selection.prototype.applyUpDown = function (rowIndex) {
        if (rowIndex < 0) {
            return;
        }
        if (!this.target) {
            this.target = this.parent.getRows()[0].children[this.parent.groupSettings.columns.length || 0];
        }
        var cIndex = parseInt(this.target.getAttribute(literals.ariaColIndex), 10) - 1;
        var row = this.contentRenderer.getRowByIndex(rowIndex);
        if (row) {
            this.target = row.getElementsByClassName(literals.rowCell)[parseInt(cIndex.toString(), 10)];
        }
        this.addAttribute(this.target);
        if (this.parent.element.classList.contains('e-gridcell-read')) {
            var targetLabel = this.target.getAttribute('aria-label');
            targetLabel = this.target.innerHTML;
            this.target.setAttribute('aria-label', targetLabel);
        }
    };
    Selection.prototype.applyRightLeftKey = function (rowIndex, cellIndex) {
        if (this.selectionSettings.allowColumnSelection && this.needColumnSelection) {
            this.selectColumn(cellIndex);
        }
        else if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
            this.addAttribute(this.target);
        }
    };
    Selection.prototype.applyHomeEndKey = function (rowIndex, cellIndex) {
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
        else {
            this.addAttribute(this.parent.getCellFromIndex(rowIndex, cellIndex));
        }
    };
    /**
     * Apply shift+down key selection
     *
     * @param {number} rowIndex - specfies the rowIndex
     * @param {number} cellIndex - specifies the CellIndex
     * @returns {void}
     * @hidden
     */
    Selection.prototype.shiftDownKey = function (rowIndex, cellIndex) {
        this.isMultiShiftRequest = true;
        if (this.isRowType() && !this.isSingleSel()) {
            if (!isUndefined(this.prevRowIndex)) {
                this.selectRowsByRange(this.prevRowIndex, rowIndex);
                this.applyUpDown(rowIndex);
            }
            else if (this.isPartialSelection) {
                this.selectRow(rowIndex, true);
            }
            else {
                this.selectRow(0, true);
            }
        }
        if (this.isCellType() && !this.isSingleSel()) {
            this.selectCellsByRange(this.prevCIdxs || { rowIndex: 0, cellIndex: 0 }, { rowIndex: rowIndex, cellIndex: cellIndex });
        }
        this.isMultiShiftRequest = false;
    };
    Selection.prototype.applyShiftLeftRightKey = function (rowIndex, cellIndex) {
        this.isMultiShiftRequest = true;
        if (this.selectionSettings.allowColumnSelection && this.needColumnSelection) {
            this.selectColumnsByRange(this.prevColIndex, cellIndex);
        }
        else {
            this.selectCellsByRange(this.prevCIdxs, { rowIndex: rowIndex, cellIndex: cellIndex });
        }
        this.isMultiShiftRequest = false;
    };
    Selection.prototype.getstackedColumns = function (column) {
        var innerColumnIndexes = [];
        for (var i = 0, len = column.length; i < len; i++) {
            if (column[parseInt(i.toString(), 10)].columns) {
                this.getstackedColumns(column[parseInt(i.toString(), 10)].columns);
            }
            else {
                innerColumnIndexes.push(column[parseInt(i.toString(), 10)]);
            }
        }
        return innerColumnIndexes;
    };
    Selection.prototype.applyCtrlHomeEndKey = function (rowIndex, cellIndex) {
        if (this.isRowType()) {
            this.selectRow(rowIndex, true);
            if (!(this.parent.enableVirtualization || this.parent.enableColumnVirtualization)) {
                this.addAttribute(this.parent.getCellFromIndex(rowIndex, cellIndex));
            }
        }
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
    };
    Selection.prototype.addRemoveClassesForRow = function (row, isAdd, clearAll) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (row) {
            var cells = [].slice.call(row.getElementsByClassName(literals.rowCell));
            var detailIndentCell = row.querySelector('.e-detailrowcollapse') || row.querySelector('.e-detailrowexpand');
            var dragdropIndentCell = row.querySelector('.e-rowdragdrop');
            if (detailIndentCell) {
                cells.push(detailIndentCell);
            }
            if (dragdropIndentCell) {
                cells.push(dragdropIndentCell);
            }
            addRemoveActiveClasses.apply(void 0, [cells, isAdd].concat(args));
        }
        this.getRenderer().setSelection(row ? row.getAttribute('data-uid') : null, isAdd, clearAll);
    };
    Selection.prototype.isRowType = function () {
        return this.selectionSettings.mode === 'Row' || this.selectionSettings.mode === 'Both';
    };
    Selection.prototype.isCellType = function () {
        return this.selectionSettings.mode === 'Cell' || this.selectionSettings.mode === 'Both';
    };
    Selection.prototype.isSingleSel = function () {
        return this.selectionSettings.type === 'Single';
    };
    Selection.prototype.getRenderer = function () {
        if (isNullOrUndefined(this.contentRenderer)) {
            this.contentRenderer = this.factory.getRenderer(RenderType.Content);
        }
        return this.contentRenderer;
    };
    /**
     * Gets the collection of selected records.
     *
     * @returns {Object[]} returns the Object
     */
    Selection.prototype.getSelectedRecords = function () {
        var selectedData = [];
        if (!this.selectionSettings.persistSelection && this.selectedRecords.length) {
            selectedData = this.parent.getRowsObject().filter(function (row) { return row.isSelected; })
                .map(function (m) { return m.data; });
        }
        else {
            selectedData = this.persistSelectedData;
        }
        if (this.checkVirtualCheckBox() && !this.parent.isPersistSelection) {
            selectedData = this.virtualSelectedData;
        }
        return selectedData;
    };
    /**
     * Select the column by passing start column index
     *
     * @param {number} index - specifies the index
     * @returns {void}
     */
    Selection.prototype.selectColumn = function (index) {
        var gObj = this.parent;
        if (isNullOrUndefined(gObj.getColumns()[parseInt(index.toString(), 10)])) {
            return;
        }
        var column = gObj.getColumnByIndex(index);
        var selectedCol = gObj.getColumnHeaderByUid(column.uid);
        var isColSelected = selectedCol.classList.contains('e-columnselection');
        if ((!gObj.selectionSettings.allowColumnSelection)) {
            return;
        }
        var isMultiColumns = this.selectedColumnsIndexes.length > 1 &&
            this.selectedColumnsIndexes.indexOf(index) > -1;
        this.clearColDependency();
        if (!this.selectionSettings.enableToggle || isMultiColumns || !isColSelected) {
            var args = {
                columnIndex: index, headerCell: selectedCol,
                column: column,
                cancel: false, target: this.actualTarget,
                isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex,
                isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest
            };
            this.onActionBegin(args, events.columnSelecting);
            if (args.cancel) {
                this.disableInteracted();
                return;
            }
            if (isMultiColumns || !(isColSelected && gObj.selectionSettings.enableToggle && index === this.prevColIndex)) {
                this.updateColSelection(selectedCol, index);
            }
            var selectedArgs = {
                columnIndex: index, headerCell: selectedCol,
                column: column,
                target: this.actualTarget,
                isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex
            };
            this.onActionComplete(selectedArgs, events.columnSelected);
        }
        this.updateColProps(index);
    };
    /**
     * Select the columns by passing start and end column index
     *
     * @param  {number} startIndex - specifies the start index
     * @param  {number} endIndex - specifies the end index
     * @returns {void}
     */
    Selection.prototype.selectColumnsByRange = function (startIndex, endIndex) {
        var gObj = this.parent;
        if (isNullOrUndefined(gObj.getColumns()[parseInt(startIndex.toString(), 10)])) {
            return;
        }
        var indexes = [];
        if (gObj.selectionSettings.type === 'Single' || isNullOrUndefined(endIndex)) {
            indexes[0] = startIndex;
        }
        else {
            var min = startIndex < endIndex;
            for (var i = startIndex; min ? i <= endIndex : i >= endIndex; min ? i++ : i--) {
                indexes.push(i);
            }
        }
        this.selectColumns(indexes);
    };
    /**
     * Select the columns by passing column indexes
     *
     * @param  {number[]} columnIndexes - specifies the columnIndexes
     * @returns {void}
     */
    Selection.prototype.selectColumns = function (columnIndexes) {
        var gObj = this.parent;
        var selectedCol = this.getselectedCols();
        if (gObj.selectionSettings.type === 'Single') {
            columnIndexes = [columnIndexes[0]];
        }
        if (!gObj.selectionSettings.allowColumnSelection) {
            return;
        }
        this.clearColDependency();
        var selectingArgs = {
            columnIndex: columnIndexes[0], headerCell: selectedCol,
            columnIndexes: columnIndexes,
            column: gObj.getColumnByIndex(columnIndexes[0]),
            cancel: false, target: this.actualTarget,
            isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex,
            isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest
        };
        this.onActionBegin(selectingArgs, events.columnSelecting);
        if (selectingArgs.cancel) {
            this.disableInteracted();
            return;
        }
        for (var i = 0, len = columnIndexes.length; i < len; i++) {
            this.updateColSelection(gObj.getColumnHeaderByUid(gObj.getColumnByIndex(columnIndexes[parseInt(i.toString(), 10)]).uid), columnIndexes[parseInt(i.toString(), 10)]);
        }
        selectedCol = this.getselectedCols();
        var selectedArgs = {
            columnIndex: columnIndexes[0], headerCell: selectedCol,
            columnIndexes: columnIndexes,
            column: gObj.getColumnByIndex(columnIndexes[0]),
            target: this.actualTarget,
            isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex
        };
        this.onActionComplete(selectedArgs, events.columnSelected);
        this.updateColProps(columnIndexes[0]);
    };
    /**
     * Select the column with existing column by passing column index
     *
     * @param  {number} startIndex - specifies the start index
     * @returns {void}
     */
    Selection.prototype.selectColumnWithExisting = function (startIndex) {
        var gObj = this.parent;
        if (isNullOrUndefined(gObj.getColumns()[parseInt(startIndex.toString(), 10)])) {
            return;
        }
        var newCol = gObj.getColumnHeaderByUid(gObj.getColumnByIndex(startIndex).uid);
        var selectedCol = this.getselectedCols();
        if (gObj.selectionSettings.type === 'Single') {
            this.clearColDependency();
        }
        if (!gObj.selectionSettings.allowColumnSelection) {
            return;
        }
        if (this.selectedColumnsIndexes.indexOf(startIndex) > -1) {
            this.clearColumnSelection(startIndex);
        }
        else {
            var selectingArgs = {
                columnIndex: startIndex, headerCell: selectedCol,
                columnIndexes: this.selectedColumnsIndexes,
                column: gObj.getColumnByIndex(startIndex),
                cancel: false, target: this.actualTarget,
                isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex,
                isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest
            };
            this.onActionBegin(selectingArgs, events.columnSelecting);
            if (selectingArgs.cancel) {
                this.disableInteracted();
                return;
            }
            this.updateColSelection(newCol, startIndex);
            selectedCol = this.getselectedCols();
            var selectedArgs = {
                columnIndex: startIndex, headerCell: selectedCol,
                column: gObj.getColumnByIndex(startIndex),
                columnIndexes: this.selectedColumnsIndexes,
                target: this.actualTarget,
                isInteracted: this.isInteracted, previousColumnIndex: this.prevColIndex
            };
            this.onActionComplete(selectedArgs, events.columnSelected);
        }
        this.updateColProps(startIndex);
    };
    /**
     * Clear the column selection
     *
     * @param {number} clearIndex - specifies the clearIndex
     * @returns {void}
     */
    Selection.prototype.clearColumnSelection = function (clearIndex) {
        if (this.isColumnSelected) {
            var gObj = this.parent;
            if (!isNullOrUndefined(clearIndex) && this.selectedColumnsIndexes.indexOf(clearIndex) === -1) {
                return;
            }
            var index = !isNullOrUndefined(clearIndex) ? clearIndex :
                this.selectedColumnsIndexes[this.selectedColumnsIndexes.length - 1];
            var column = gObj.getColumnByIndex(index);
            var selectedCol = gObj.getColumnHeaderByUid(column.uid);
            var deselectedArgs = {
                columnIndex: index, headerCell: selectedCol,
                columnIndexes: this.selectedColumnsIndexes,
                column: column,
                cancel: false, target: this.actualTarget,
                isInteracted: this.isInteracted
            };
            var isCanceled = this.columnDeselect(deselectedArgs, events.columnDeselecting);
            if (isCanceled) {
                this.disableInteracted();
                return;
            }
            var selectedHeader = !isNullOrUndefined(clearIndex) ? [selectedCol] :
                [].slice.call(gObj.getHeaderContent().getElementsByClassName('e-columnselection'));
            var selectedCells = this.getSelectedColumnCells(clearIndex);
            for (var i = 0, len = selectedHeader.length; i < len; i++) {
                addRemoveActiveClasses([selectedHeader[parseInt(i.toString(), 10)]], false, 'e-columnselection');
            }
            for (var i = 0, len = selectedCells.length; i < len; i++) {
                addRemoveActiveClasses([selectedCells[parseInt(i.toString(), 10)]], false, 'e-columnselection');
            }
            if (!isNullOrUndefined(clearIndex)) {
                this.selectedColumnsIndexes.splice(this.selectedColumnsIndexes.indexOf(clearIndex), 1);
                this.parent.getColumns()[parseInt(clearIndex.toString(), 10)].isSelected = false;
            }
            else {
                this.columnDeselect(deselectedArgs, events.columnDeselected);
                this.selectedColumnsIndexes = [];
                this.isColumnSelected = false;
                this.parent.getColumns().filter(function (col) { return col.isSelected = false; });
            }
        }
    };
    Selection.prototype.getselectedCols = function () {
        var gObj = this.parent;
        var selectedCol;
        if (this.selectedColumnsIndexes.length > 1) {
            selectedCol = [];
            for (var i = 0; i < this.selectedColumnsIndexes.length; i++) {
                (selectedCol).push(gObj.getColumnHeaderByUid(gObj.getColumnByIndex(this.selectedColumnsIndexes[parseInt(i.toString(), 10)]).uid));
            }
        }
        else {
            selectedCol = gObj.getColumnHeaderByUid(gObj.getColumnByIndex(this.selectedColumnsIndexes[0]).uid);
        }
        return selectedCol;
    };
    Selection.prototype.getSelectedColumnCells = function (clearIndex) {
        var gObj = this.parent;
        var isRowTemplate = !isNullOrUndefined(this.parent.rowTemplate);
        var rows = isRowTemplate ? gObj.getRows() : gObj.getDataRows();
        var seletedcells = [];
        var selectionString = !isNullOrUndefined(clearIndex) ? '[aria-colindex="' + (clearIndex + 1) + '"]' : '.e-columnselection';
        for (var i = 0, len = rows.length; i < len; i++) {
            seletedcells = seletedcells.concat([].slice.call(rows[parseInt(i.toString(), 10)].querySelectorAll(selectionString)));
        }
        return seletedcells;
    };
    Selection.prototype.columnDeselect = function (args, event) {
        if (event === 'columnDeselected') {
            delete args.cancel;
        }
        this.onActionComplete(args, event);
        return args.cancel;
    };
    Selection.prototype.updateColProps = function (startIndex) {
        this.prevColIndex = startIndex;
        this.isColumnSelected = this.selectedColumnsIndexes.length && true;
    };
    Selection.prototype.clearColDependency = function () {
        this.clearColumnSelection();
        this.selectedColumnsIndexes = [];
    };
    Selection.prototype.updateColSelection = function (selectedCol, startIndex) {
        if (isNullOrUndefined(this.parent.getColumns()[parseInt(startIndex.toString(), 10)])) {
            return;
        }
        var isRowTemplate = !isNullOrUndefined(this.parent.rowTemplate);
        var rows = isRowTemplate ? this.parent.getRows() : this.parent.getDataRows();
        this.selectedColumnsIndexes.push(startIndex);
        this.parent.getColumns()[parseInt(startIndex.toString(), 10)].isSelected = true;
        startIndex = startIndex + this.parent.getIndentCount();
        addRemoveActiveClasses([selectedCol], true, 'e-columnselection');
        for (var j = 0, len = rows.length; j < len; j++) {
            if (rows[parseInt(j.toString(), 10)].classList.contains(literals.row)) {
                if ((rows[parseInt(j.toString(), 10)].classList.contains(literals.editedRow)
                    || rows[parseInt(j.toString(), 10)].classList.contains(literals.addedRow))
                    && this.parent.editSettings.mode === 'Normal'
                    && !isNullOrUndefined(rows[parseInt(j.toString(), 10)].querySelector('tr').childNodes[parseInt(startIndex.toString(), 10)])) {
                    addRemoveActiveClasses([rows[parseInt(j.toString(), 10)].querySelector('tr').childNodes[parseInt(startIndex.toString(), 10)]], true, 'e-columnselection');
                }
                else {
                    if (this.parent.isSpan && this.parent.isFrozenGrid()) {
                        var cells = rows[parseInt(j.toString(), 10)].querySelectorAll('.e-rowcell');
                        for (var i = 0; i < cells.length; i++) {
                            if (cells[parseInt(i.toString(), 10)].getAttribute('aria-colindex') === selectedCol.getAttribute('aria-colindex')) {
                                addRemoveActiveClasses([cells[parseInt(i.toString(), 10)]], true, 'e-columnselection');
                            }
                        }
                    }
                    else if (!isNullOrUndefined(rows[parseInt(j.toString(), 10)].childNodes[parseInt(startIndex.toString(), 10)])) {
                        addRemoveActiveClasses([rows[parseInt(j.toString(), 10)].childNodes[parseInt(startIndex.toString(), 10)]], true, 'e-columnselection');
                    }
                }
            }
        }
    };
    Selection.prototype.headerSelectionHandler = function (colIndex) {
        if ((!this.isMultiCtrlRequest && !this.isMultiShiftRequest) || this.isSingleSel()) {
            this.selectColumn(colIndex);
        }
        else if (this.isMultiShiftRequest) {
            this.selectColumnsByRange(isUndefined(this.prevColIndex) ? colIndex : this.prevColIndex, colIndex);
        }
        else {
            this.selectColumnWithExisting(colIndex);
        }
    };
    // eslint-disable-next-line camelcase
    Selection.prototype.addEventListener_checkbox = function () {
        var _this = this;
        this.parent.on(events.dataReady, this.dataReady, this);
        this.onDataBoundFunction = this.onDataBound.bind(this);
        this.parent.addEventListener(events.dataBound, this.onDataBoundFunction);
        this.parent.on(events.refreshInfinitePersistSelection, this.onDataBoundFunction);
        this.parent.on(events.contentReady, this.checkBoxSelectionChanged, this);
        this.parent.on(events.beforeRefreshOnDataChange, this.initPerisistSelection, this);
        this.parent.on(events.onEmpty, this.setCheckAllForEmptyGrid, this);
        this.actionCompleteFunc = this.actionCompleteHandler.bind(this);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunc);
        this.parent.on(events.click, this.clickHandler, this);
        this.resizeEndFn = function () {
            _this.updateAutoFillPosition();
            _this.drawBorders();
        };
        this.resizeEndFn.bind(this);
        this.parent.addEventListener(events.resizeStop, this.resizeEndFn);
    };
    // eslint-disable-next-line camelcase
    Selection.prototype.removeEventListener_checkbox = function () {
        this.parent.off(events.dataReady, this.dataReady);
        this.parent.removeEventListener(events.dataBound, this.onDataBoundFunction);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunc);
        this.parent.off(events.refreshInfinitePersistSelection, this.onDataBoundFunction);
        this.parent.off(events.onEmpty, this.setCheckAllForEmptyGrid);
        this.parent.off(events.click, this.clickHandler);
        this.parent.removeEventListener(events.resizeStop, this.resizeEndFn);
        this.parent.off(events.beforeRefreshOnDataChange, this.initPerisistSelection);
    };
    Selection.prototype.setCheckAllForEmptyGrid = function () {
        var checkAllBox = this.getCheckAllBox();
        if (checkAllBox) {
            this.parent.isCheckBoxSelection = true;
            var spanEle = checkAllBox.nextElementSibling;
            removeClass([spanEle], ['e-check', 'e-stop', 'e-uncheck']);
            addClass([spanEle.parentElement], ['e-checkbox-disabled']);
        }
    };
    Selection.prototype.dataReady = function (e) {
        this.isHeaderCheckboxClicked = false;
        var isInfinitecroll = this.parent.enableInfiniteScrolling && e.requestType === 'infiniteScroll';
        if (e.requestType !== 'virtualscroll' && !this.parent.isPersistSelection && !isInfinitecroll) {
            this.disableUI = !this.parent.enableImmutableMode && !(e.requestType === 'save' && e['action'] === 'add');
            this.clearSelection();
            this.setCheckAllState();
            this.disableUI = false;
        }
    };
    Selection.prototype.actionCompleteHandler = function (e) {
        if (e.requestType === 'save' && this.parent.isPersistSelection) {
            this.refreshPersistSelection();
        }
    };
    Selection.prototype.selectRowIndex = function (index) {
        this.parent.isSelectedRowIndexUpdating = true;
        if ((isNullOrUndefined(this.parent.selectedRowIndex) || this.parent.selectedRowIndex === -1) || !this.parent.enablePersistence) {
            this.parent.selectedRowIndex = index;
        }
        else {
            this.parent.selectedRowIndex = -1;
        }
    };
    Selection.prototype.disableInteracted = function () {
        this.isInteracted = false;
    };
    Selection.prototype.activeTarget = function () {
        this.actualTarget = this.isInteracted ? this.actualTarget : null;
    };
    return Selection;
}());
export { Selection };
