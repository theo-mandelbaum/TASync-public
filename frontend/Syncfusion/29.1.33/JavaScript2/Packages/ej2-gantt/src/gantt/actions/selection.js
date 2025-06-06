import { parentsUntil, getActualProperties } from '@syncfusion/ej2-grids';
import { setCssInGridPopUp } from '@syncfusion/ej2-grids';
import { isNullOrUndefined, removeClass, getValue, addClass, closest, setValue, extend } from '@syncfusion/ej2-base';
import { Deferred } from '@syncfusion/ej2-data';
/**
 * The Selection module is used to handle cell and row selection.
 */
var Selection = /** @class */ (function () {
    function Selection(gantt) {
        this.isSelectionFromChart = false;
        this.isFromChart = false;
        this.multipleIndexes = [];
        this.selectedRowIndexes = [];
        this.enableSelectMultiTouch = false;
        this.openPopup = false;
        this.parent = gantt;
        this.bindEvents();
        this.parent.treeGrid.selectedRowIndex = this.parent.selectedRowIndex;
        this.parent.treeGrid.allowSelection = this.parent.allowSelection;
        this.parent.treeGrid.grid.selectionSettings.enableToggle = this.parent.selectionSettings.enableToggle;
        this.parent.treeGrid.selectionSettings = getActualProperties(this.parent.selectionSettings);
        this.wireEvents();
    }
    /**
     * Get module
     *
     * @returns {string} .
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    Selection.prototype.wireEvents = function () {
        this.parent.on('selectRowByIndex', this.selectRowByIndex, this);
        if (this.parent.isAdaptive) {
            this.parent.on('chartMouseClick', this.mouseUpHandler, this);
            this.parent.on('treeGridClick', this.popUpClickHandler, this);
        }
        else {
            this.parent.on('chartMouseUp', this.mouseUpHandler, this);
        }
    };
    /**
     * To update selected index.
     *
     * @returns {void} .
     * @private
     */
    Selection.prototype.selectRowByIndex = function () {
        if ((this.parent.selectedRowIndex !== -1 || this.parent.staticSelectedRowIndex !== -1)) {
            this.selectRow(this.parent.staticSelectedRowIndex !== -1 ? this.parent.staticSelectedRowIndex : this.parent.selectedRowIndex);
            this.parent.staticSelectedRowIndex = -1;
        }
    };
    /**
     * To bind selection events.
     *
     * @returns {void} .
     * @private
     */
    Selection.prototype.bindEvents = function () {
        this.parent.treeGrid.rowSelecting = this.rowSelecting.bind(this);
        this.parent.treeGrid.rowSelected = this.rowSelected.bind(this);
        this.parent.treeGrid.rowDeselecting = this.rowDeselecting.bind(this);
        this.parent.treeGrid.rowDeselected = this.rowDeselected.bind(this);
        this.parent.treeGrid.cellSelecting = this.cellSelecting.bind(this);
        this.parent.treeGrid.cellSelected = this.cellSelected.bind(this);
        this.parent.treeGrid.cellDeselecting = this.cellDeselecting.bind(this);
        this.parent.treeGrid.cellDeselected = this.cellDeselected.bind(this);
    };
    Selection.prototype.rowSelecting = function (args) {
        if (!this.parent.isGanttChartRendered) {
            args.cancel = true;
            return;
        }
        args.isCtrlPressed = this.isMultiCtrlRequest || args.isCtrlPressed;
        args.isShiftPressed = this.isMultiShiftRequest || args.isShiftPressed;
        args.target = this.actualTarget;
        if (!isNullOrUndefined(args.foreignKeyData) && Object.keys(args.foreignKeyData).length === 0) {
            delete args.foreignKeyData;
        }
        if (this.parent.selectionSettings && this.parent.selectionSettings.persistSelection) {
            this.parent.treeGrid.grid.selectionModule['checkSelectAllClicked'] = true;
        }
        this.parent.trigger('rowSelecting', args);
        if (this.isMultiShiftRequest || this.isMultiCtrlRequest) {
            this.isMultiShiftRequest = this.isMultiCtrlRequest = false;
        }
    };
    Selection.prototype.rowSelected = function (args) {
        var rowIndexes = 'rowIndexes';
        var index = (this.parent.selectionSettings.type === 'Multiple' && !isNullOrUndefined(args[rowIndexes])) ?
            args[rowIndexes] : [args.rowIndex];
        this.addRemoveClass(index, args['name']);
        this.selectedRowIndexes = extend([], this.getSelectedRowIndexes(), [], true);
        this.parent.setProperties({ selectedRowIndex: this.parent.treeGrid.grid.selectedRowIndex }, true);
        if (this.isMultiShiftRequest) {
            this.selectedRowIndexes = index;
        }
        if (this.parent.autoFocusTasks) {
            if (this.parent.enableTimelineVirtualization) {
                this.parent['isRowSelected'] = true;
            }
            if (args.data && !isNullOrUndefined(args.data['length'])) {
                for (var i = 0; i < args.data['length']; i++) {
                    this.parent.ganttChartModule.updateScrollLeft(args.data[i].ganttProperties.left);
                }
            }
            else {
                if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping &&
                    isNullOrUndefined(getValue('data.ganttProperties.left', args))) {
                    args.data = this.parent.getRecordByID(args.data.taskId);
                }
                this.parent.ganttChartModule.updateScrollLeft(getValue('data.ganttProperties.left', args));
            }
        }
        args.target = this.actualTarget;
        if (!isNullOrUndefined(args.foreignKeyData) && Object.keys(args.foreignKeyData).length === 0) {
            delete args.foreignKeyData;
        }
        this.prevRowIndex = args.rowIndex;
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems(args);
        }
        if (!isNullOrUndefined(this.parent.focusModule['previousActiveElement'])) {
            var previousSelection = this.parent.focusModule['previousActiveElement'];
            removeClass([previousSelection], 'e-focused');
            removeClass([previousSelection], 'e-focus');
        }
        this.parent.trigger('rowSelected', args);
    };
    Selection.prototype.rowDeselecting = function (args) {
        args.target = this.actualTarget;
        args.isInteracted = this.isInteracted;
        this.parent.trigger('rowDeselecting', args);
    };
    Selection.prototype.rowDeselected = function (args) {
        var index;
        var isContains;
        if (this.multipleIndexes.length !== 0) {
            index = this.multipleIndexes;
        }
        else {
            if (!isNullOrUndefined(args.rowIndexes)) {
                for (var i = 0; i < args.rowIndexes.length; i++) {
                    if (args.rowIndexes[i] === args.rowIndex) {
                        isContains = true;
                    }
                }
                if (isContains) {
                    index = args.rowIndexes;
                }
                else {
                    index = [args.rowIndex];
                }
            }
            else {
                index = [args.rowIndex];
            }
        }
        this.addRemoveClass(index);
        this.selectedRowIndexes = extend([], this.getSelectedRowIndexes(), [], true);
        this.parent.setProperties({ selectedRowIndex: -1 }, true);
        if (this.selectedRowIndexes.length === 1) {
            this.parent.setProperties({ selectedRowIndex: this.selectedRowIndexes[0] }, true);
        }
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
        if (this.parent.selectionSettings.type === 'Multiple' && this.parent.isAdaptive
            && this.selectedRowIndexes.length === 0) {
            this.hidePopUp();
        }
        args.target = this.actualTarget;
        args.isInteracted = this.isInteracted;
        this.parent.trigger('rowDeselected', args);
        this.isInteracted = false;
        this.multipleIndexes = [];
    };
    Selection.prototype.cellSelecting = function (args) {
        var callBackPromise = new Deferred();
        this.parent.trigger('cellSelecting', args, function (cellselectingArgs) {
            callBackPromise.resolve(cellselectingArgs);
        });
        return callBackPromise;
    };
    Selection.prototype.cellSelected = function (args) {
        this.parent.trigger('cellSelected', args);
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    Selection.prototype.cellDeselecting = function (args) {
        this.parent.trigger('cellDeselecting', args);
    };
    Selection.prototype.cellDeselected = function (args) {
        this.parent.trigger('cellDeselected', args);
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    /**
     * Selects a cell by given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    Selection.prototype.selectCell = function (cellIndex, isToggle) {
        this.parent.treeGrid.selectCell(cellIndex, isToggle);
    };
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void} .
     */
    Selection.prototype.selectCells = function (rowCellIndexes) {
        this.parent.treeGrid.grid.selectCells(rowCellIndexes);
    };
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @param {boolean} isPreventFocus .
     * @returns {void} .
     */
    Selection.prototype.selectRow = function (index, isToggle, isPreventFocus) {
        var ganttRow = [].slice.call(this.parent.ganttChartModule.chartBodyContent.querySelector('tbody').children);
        if (this.parent.enableVirtualization && (this.parent.treeGridModule.addedRecord ||
            (this.parent.editModule && this.parent.editModule.isAdded))) {
            index = this.parent.getExpandedRecords(this.parent.flatData).indexOf(this.parent.flatData[index]);
            this.parent.treeGridModule.addedRecord = false;
            if (this.parent.editModule) {
                this.parent.editModule.isAdded = false;
            }
        }
        var selectedRow = ganttRow.filter(function (e) { return parseInt(e.getAttribute('aria-rowindex'), 10) - 1 === index; })[0];
        var condition;
        if (index === -1 || (isNullOrUndefined(selectedRow) && !this.parent.enableVirtualization) || this.parent.selectionSettings.mode === 'Cell') {
            return;
        }
        if (this.parent.showActiveElement && !isNullOrUndefined(isPreventFocus) && !isPreventFocus || this.isFromChart) {
            if (this.isFromChart) {
                this.isFromChart = false;
            }
            this.parent.treeGrid.grid.selectionModule.preventFocus = true;
        }
        else {
            this.parent.treeGrid.grid.selectionModule.preventFocus = false;
        }
        if ((!isNullOrUndefined(this.selectedClass) && (this.selectedClass === selectedRow) && (!isToggle))) {
            condition = true;
        }
        if (condition !== true) {
            this.parent.treeGrid.selectRow(index, isToggle);
        }
        this.parent.treeGrid.grid.selectionModule.preventFocus = this.parent.treeGrid.grid.selectionModule.preventFocus === true ?
            false : this.parent.treeGrid.grid.selectionModule.preventFocus;
        this.prevRowIndex = index;
        this.selectedClass = selectedRow;
    };
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} records - Defines the collection of row indexes.
     * @returns {void} .
     */
    Selection.prototype.selectRows = function (records) {
        if (!isNullOrUndefined(records) && records.length > 0) {
            this.parent.treeGrid.selectRows(records);
        }
    };
    /**
     * Gets the collection of selected row indexes.
     *
     * @returns {number[]} .
     */
    Selection.prototype.getSelectedRowIndexes = function () {
        return this.parent.treeGrid.getSelectedRowIndexes();
    };
    /**
     * Gets the collection of selected row and cell indexes.
     *
     * @returns {number[]} .
     */
    Selection.prototype.getSelectedRowCellIndexes = function () {
        return this.parent.treeGrid.getSelectedRowCellIndexes();
    };
    /**
     * Gets the collection of selected records.
     *
     * @returns {Object[]} .
     */
    Selection.prototype.getSelectedRecords = function () {
        if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
            var selectedRows = [];
            var selectedIndexes_1 = this.parent.selectionModule.getSelectedRowIndexes();
            var _loop_1 = function (i) {
                var rec = this_1.parent.currentViewData.filter(function (data) {
                    return data.index === selectedIndexes_1[i];
                })[0];
                selectedRows.push(rec);
            };
            var this_1 = this;
            for (var i = 0; i < selectedIndexes_1.length; i++) {
                _loop_1(i);
            }
            return selectedRows;
        }
        else {
            return this.parent.treeGrid.getSelectedRecords();
        }
    };
    /**
     * Get the selected records for cell selection.
     *
     * @returns {IGanttData[]} .
     */
    Selection.prototype.getCellSelectedRecords = function () {
        var cellDetails = this.parent.selectionModule.getSelectedRowCellIndexes();
        var cellSelectedRecords = [];
        for (var i = 0; i < cellDetails.length; i++) {
            cellSelectedRecords.push(this.parent.currentViewData[cellDetails[i].rowIndex]);
        }
        return cellSelectedRecords;
    };
    /**
     * Gets the collection of selected rows.
     *
     * @returns {Element[]} .
     */
    Selection.prototype.getSelectedRows = function () {
        return this.parent.treeGrid.getSelectedRows();
    };
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void} .
     */
    Selection.prototype.clearSelection = function () {
        this.addRemoveClass(this.selectedRowIndexes);
        this.parent.treeGrid.clearSelection();
        this.parent.selectedRowIndex = -1;
        this.selectedRowIndexes = [];
        this.selectedClass = null;
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
        this.isInteracted = false;
    };
    Selection.prototype.highlightSelectedRows = function (e, fromChart) {
        this.isMultiCtrlRequest = e.ctrlKey || this.enableSelectMultiTouch;
        this.isMultiShiftRequest = e.shiftKey;
        this.actualTarget = e.target;
        this.isInteracted = true;
        this.isSelectionFromChart = fromChart;
        if (fromChart) {
            var selectedRow = closest(e.target, 'tr.e-chart-row');
            var rIndex = parseInt(selectedRow.getAttribute('aria-rowindex'), 10) - 1;
            var isToggle = this.parent.selectionSettings.enableToggle;
            if (this.parent.selectionSettings.type === 'Single' || (!this.isMultiCtrlRequest && !this.isMultiShiftRequest)) {
                if (this.parent.selectionSettings.persistSelection) {
                    this.addRemoveClass(this.selectedRowIndexes, e['name']);
                }
                if (!this.parent.allowTaskbarDragAndDrop || (this.parent.allowTaskbarDragAndDrop && (this.parent.rowDragAndDropModule &&
                    !this.parent.rowDragAndDropModule['draggedRecord']))) {
                    this.isFromChart = true;
                    this.selectRow(rIndex, isToggle);
                }
            }
            else {
                if (this.isMultiShiftRequest) {
                    this.selectRowsByRange(isNullOrUndefined(this.prevRowIndex) ? rIndex : this.prevRowIndex, rIndex);
                }
                else {
                    setValue('isMultiCtrlRequest', true, this.parent.treeGrid.grid.selectionModule);
                    this.parent.treeGrid.grid.selectionModule.addRowsToSelection([rIndex]);
                    var isUnSelected = this.selectedRowIndexes.indexOf(rIndex) > -1;
                    if (isUnSelected) {
                        this.addRemoveClass([rIndex], e['name']);
                    }
                }
            }
        }
    };
    Selection.prototype.getselectedrowsIndex = function (startIndex, endIndex) {
        var indexes = [];
        // eslint-disable-next-line
        var _a = (startIndex < endIndex) ?
            { i: startIndex, max: endIndex } : { i: endIndex, max: startIndex }, i = _a.i, max = _a.max;
        for (; i <= max; i++) {
            indexes.push(i);
        }
        if (startIndex > endIndex) {
            indexes.reverse();
        }
        this.selectedRowIndexes = indexes;
    };
    /**
     * Selects a range of rows from start and end row indexes.
     *
     * @param  {number} startIndex - Defines the start row index.
     * @param  {number} endIndex - Defines the end row index.
     * @returns {void} .
     */
    Selection.prototype.selectRowsByRange = function (startIndex, endIndex) {
        this.isSelectionFromChart = true;
        this.getselectedrowsIndex(startIndex, endIndex);
        this.selectRows(this.selectedRowIndexes);
    };
    Selection.prototype.addRemoveClass = function (records, request) {
        if (typeof (records) == 'number') {
            records = [records];
        }
        var ganttRow = [].slice.call(this.parent.ganttChartModule.chartBodyContent.querySelector('tbody').children);
        var _loop_2 = function (i) {
            var selectedRow = ganttRow.filter(function (e) {
                return parseInt(e.getAttribute('aria-rowindex'), 10) - 1 === records[parseInt(i.toString(), 10)];
            })[0];
            if (!isNullOrUndefined(selectedRow)) {
                var persist = false;
                var index = this_2.getSelectedRowIndexes().indexOf(records[parseInt(i.toString(), 10)]);
                var selectedRecordLen = this_2.getSelectedRecords().length;
                if (this_2.parent.selectionSettings.persistSelection && this_2.parent.selectionSettings.enableToggle &&
                    !isNullOrUndefined(request) && this_2.parent.selectionSettings.type !== 'Multiple' &&
                    selectedRecordLen > 0) {
                    persist = true;
                }
                if (this_2.parent.selectionSettings.enableToggle && this_2.parent.selectionSettings.persistSelection &&
                    (index > -1 && this_2.parent.selectionSettings.type === 'Single' && persist) ||
                    (index > -1 && ((!isNullOrUndefined(request) && this_2.parent.selectionSettings.type === 'Multiple')))) {
                    this_2.addClass(selectedRow);
                }
                else if (isNullOrUndefined(request)) {
                    this_2.removeClass(selectedRow);
                }
                else if (index > -1) {
                    this_2.addClass(selectedRow);
                }
                if (this_2.parent.selectionSettings.enableToggle && index > -1 && (this_2.parent.selectionSettings.type === 'Single' ||
                    (!this_2.isMultiCtrlRequest && !this_2.isMultiShiftRequest)) && this_2.parent.selectionSettings.persistSelection &&
                    request === 'chartMouseUp' && this_2.isSelectionFromChart) {
                    this_2.removeClass(selectedRow);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < records.length; i++) {
            _loop_2(i);
        }
    };
    Selection.prototype.addClass = function (selectedRow) {
        addClass([selectedRow], 'e-active');
        selectedRow.setAttribute('aria-selected', 'true');
    };
    Selection.prototype.removeClass = function (selectedRow) {
        removeClass([selectedRow], 'e-active');
        selectedRow.removeAttribute('aria-selected');
    };
    Selection.prototype.showPopup = function (e) {
        if (this.isSelectionFromChart) {
            setCssInGridPopUp(this.parent.element.querySelector('.e-ganttpopup'), e, 'e-rowselect e-icons e-icon-rowselect' +
                ((this.enableSelectMultiTouch &&
                    (this.getSelectedRecords().length > 1 || this.getSelectedRowCellIndexes().length > 1)) ? ' e-spanclicked' : ''));
            document.getElementsByClassName('e-gridpopup')[0].style.display = 'none';
            this.openPopup = true;
        }
        else if (this.selectedRowIndexes.length === 0) {
            this.hidePopUp();
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    Selection.prototype.hidePopUp = function () {
        if (this.openPopup) {
            document.getElementsByClassName('e-ganttpopup')[0].style.display = 'none';
            this.openPopup = false;
        }
        else {
            document.getElementsByClassName('e-gridpopup')[0].style.display = 'none';
        }
    };
    Selection.prototype.popUpClickHandler = function (e) {
        var target = e.target;
        var grid = this.parent.treeGrid.grid;
        var $popUpElemet = closest(target, '.e-ganttpopup') ?
            closest(target, '.e-ganttpopup') : closest(target, '.e-gridpopup');
        if ($popUpElemet) {
            var spanElement = $popUpElemet.querySelector('.' + 'e-rowselect');
            if (closest(target, '.e-ganttpopup') &&
                !spanElement.classList.contains('e-spanclicked')) {
                this.enableSelectMultiTouch = true;
                spanElement.classList.add('e-spanclicked');
            }
            else if (closest(target, '.e-gridpopup') &&
                spanElement.classList.contains('e-spanclicked')) {
                this.openPopup = true;
                this.enableSelectMultiTouch = true;
            }
            else {
                this.hidePopUp();
                this.enableSelectMultiTouch = false;
                if (closest(target, '.e-ganttpopup')) {
                    spanElement.classList.remove('e-spanclicked');
                }
            }
        }
        else if (this.parent.selectionSettings.type === 'Multiple' && this.parent.isAdaptive) {
            var $tr = closest(target, '.e-rowcell');
            if ($tr && ((this.selectedRowIndexes.length === 0 && this.parent.selectionSettings.mode === 'Row') ||
                (this.getCellSelectedRecords().length === 0 && this.parent.selectionSettings.mode === 'Cell'))) {
                this.hidePopUp();
            }
        }
        if (grid) {
            setValue('enableSelectMultiTouch', this.enableSelectMultiTouch, grid.selectionModule);
        }
    };
    /**
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    Selection.prototype.mouseUpHandler = function (e) {
        var isTaskbarEdited = false;
        var elements = document.querySelectorAll('.e-drag-item');
        var targetElement = null;
        if (e.target.closest('.e-rowcell')) {
            targetElement = e.target;
        }
        else if (e.target.closest('.e-chart-row')) {
            targetElement = e.target.closest('.e-left-label-container') ||
                e.target.closest('.e-taskbar-main-container') || e.target.closest('.e-right-label-container');
        }
        if (this.parent.focusModule) {
            this.parent.focusModule.setActiveElement(targetElement);
        }
        if (this.parent.editModule && this.parent.editSettings.allowTaskbarEditing && this.parent.editModule.taskbarEditModule) {
            var taskbarEdit = this.parent.editModule.taskbarEditModule;
            if (taskbarEdit.isMouseDragged || taskbarEdit.tapPointOnFocus) {
                isTaskbarEdited = true;
            }
        }
        if (!isTaskbarEdited && this.parent.element.contains(e.target) && !(elements.length === 1)) {
            var parent_1 = parentsUntil(e.target, 'e-chart-row');
            var isSelected = e.target.classList.contains('e-rowcell') ||
                e.target.classList.contains('e-row') ||
                e.target.classList.contains('e-treegridexpand') ||
                e.target.classList.contains('e-treegridcollapse') || !isNullOrUndefined(parent_1);
            this.popUpClickHandler(e);
            if (this.parent.selectionSettings.mode !== 'Cell' && isSelected) {
                if (closest(e.target, 'tr.e-chart-row')) {
                    if (this.parent.enableVirtualization) {
                        this.parent.treeGrid.grid.selectionModule.isInteracted = true;
                    }
                    this.parent.treeGrid['isFromChartSide'] = true;
                    this.highlightSelectedRows(e, true);
                }
                else {
                    this.parent.treeGrid['isFromChartSide'] = false;
                    this.highlightSelectedRows(e, false);
                }
                if (this.parent.selectionSettings.type === 'Multiple' && this.parent.isAdaptive) {
                    if (this.selectedRowIndexes.length > 0) {
                        this.showPopup(e);
                    }
                    else {
                        this.hidePopUp();
                    }
                }
            }
            else {
                this.isSelectionFromChart = false;
            }
        }
    };
    /**
     * To add class for selected records in virtualization mode.
     *
     * @param {number} i .
     * @returns {void} .
     * @hidden
     */
    Selection.prototype.maintainSelectedRecords = function (i) {
        var index = this.parent.selectionModule.getSelectedRowIndexes().indexOf(i);
        if (index > -1) {
            this.addRemoveClass([i]);
        }
    };
    /**
     * To destroy the selection module.
     *
     * @returns {void} .
     * @private
     */
    Selection.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('selectRowByIndex', this.selectRowByIndex);
        if (this.parent.isAdaptive) {
            this.parent.off('chartMouseClick', this.mouseUpHandler);
            this.parent.off('treeGridClick', this.popUpClickHandler);
        }
        else {
            this.parent.off('chartMouseUp', this.mouseUpHandler);
        }
    };
    return Selection;
}());
export { Selection };
