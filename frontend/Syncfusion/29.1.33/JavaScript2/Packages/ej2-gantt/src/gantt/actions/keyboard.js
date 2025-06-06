import { isNullOrUndefined, getValue, removeClass } from '@syncfusion/ej2-base';
/**
 * Focus module is used to handle certain action on focus elements in keyboard navigations.
 */
var FocusModule = /** @class */ (function () {
    function FocusModule(parent) {
        this.parent = parent;
        this.activeElement = null;
        this.previousActiveElement = null;
    }
    FocusModule.prototype.getActiveElement = function (isPreviousActiveElement) {
        return isPreviousActiveElement ? this.previousActiveElement : this.activeElement;
    };
    FocusModule.prototype.setActiveElement = function (element) {
        this.previousActiveElement = this.activeElement;
        this.activeElement = element;
    };
    /**
     * To perform key interaction in Gantt
     *
     * @param {KeyboardEventArgs} e .
     * @returns {void} .
     * @private
     */
    FocusModule.prototype.onKeyPress = function (e) {
        var ganttObj = this.parent;
        var ele = e.target;
        var expandedRecords = ganttObj.getExpandedRecords(ganttObj.currentViewData);
        if (isNullOrUndefined(this.parent.focusModule.getActiveElement()) && (e.action === 'expandAll' || e.action === 'collapseAll')) {
            var focussedElement = this.parent.element.querySelector('.e-treegrid');
            focussedElement.focus();
        }
        if (!this.parent.isEdit && !isNullOrUndefined(ele) && ele.closest('.e-headercell') && (e.key === 'Enter') && this.parent.sortModule
            && this.parent.allowSorting) {
            e.action = 'enter';
            this.parent.treeGrid.grid.notify('key-pressed', e);
        }
        var targetElement = this.parent.focusModule.getActiveElement();
        if (e.action === 'home' || e.action === 'end' || e.action === 'downArrow' || e.action === 'upArrow' || e.action === 'delete' ||
            e.action === 'rightArrow' || e.action === 'leftArrow' || e.action === 'focusTask' || e.action === 'focusSearch' ||
            e.action === 'expandAll' || e.action === 'collapseAll' || e.action === 'undo' || e.action === 'redo' || e.action === 'selectAll') {
            if (!isNullOrUndefined(ganttObj.editModule) && !isNullOrUndefined(ganttObj.editModule.cellEditModule) &&
                ganttObj.editModule.cellEditModule.isCellEdit === true) {
                return;
            }
        }
        if (ganttObj.isAdaptive) {
            if (e.action === 'addRowDialog' || e.action === 'editRowDialog' || e.action === 'delete'
                || e.action === 'addRow') {
                if (ganttObj.selectionModule && ganttObj.selectionSettings.type === 'Multiple') {
                    ganttObj.selectionModule.hidePopUp();
                    document.getElementsByClassName('e-gridpopup')[0].style.display = 'none';
                }
            }
        }
        switch (e.action) {
            case 'home':
                if (ganttObj.selectionModule && ganttObj.selectionSettings.mode !== 'Cell') {
                    if (ganttObj.selectedRowIndex === 0) {
                        return;
                    }
                    if (ganttObj.selectionModule && ganttObj.selectionModule.getCellSelectedRecords().length === 0) {
                        ganttObj.selectionModule.selectRow(0, false, true);
                    }
                }
                break;
            case 'end':
                if (ganttObj.selectionModule && ganttObj.selectionSettings.mode !== 'Cell') {
                    var currentSelectingRecord = expandedRecords[expandedRecords.length - 1];
                    if (ganttObj.selectedRowIndex === ganttObj.flatData.indexOf(currentSelectingRecord)) {
                        return;
                    }
                    if (ganttObj.selectionModule && ganttObj.selectionModule.getCellSelectedRecords().length === 0) {
                        ganttObj.selectionModule.selectRow(ganttObj.flatData.indexOf(currentSelectingRecord), false, true);
                    }
                }
                break;
            case 'downArrow':
            case 'upArrow':
                {
                    var searchElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_searchbar');
                    if (searchElement && searchElement.parentElement.classList.contains('e-input-focus')) {
                        ganttObj.selectionModule.clearSelection();
                    }
                    if (!ganttObj.element.classList.contains('e-scroll-disabled')) {
                        this.upDownKeyNavigate(e);
                        if (!isNullOrUndefined(targetElement) && !isNullOrUndefined(targetElement.closest('.e-chart-row'))) {
                            ganttObj.ganttChartModule.manageFocus(this.getActiveElement(), 'remove', true, e.action);
                        }
                        if (ganttObj.selectionSettings && ganttObj.selectionSettings.mode === 'Both' && e.target instanceof HTMLElement && e.target.classList.contains('e-cellselectionbackground')) {
                            e.target.classList.remove('e-cellselectionbackground');
                        }
                    }
                    break;
                }
            case 'expandAll':
                ganttObj.ganttChartModule.expandCollapseAll('expand');
                break;
            case 'collapseAll':
                ganttObj.ganttChartModule.expandCollapseAll('collapse');
                break;
            case 'expandRow':
            case 'collapseRow':
                this.expandCollapseKey(e);
                break;
            case 'saveRequest':
                if (!isNullOrUndefined(ganttObj.editModule) && !isNullOrUndefined(ganttObj.editModule.cellEditModule) &&
                    ganttObj.editModule.cellEditModule.isCellEdit) {
                    var col = ganttObj.editModule.cellEditModule.editedColumn;
                    if (col.field === ganttObj.columnMapping.duration && !isNullOrUndefined(col.edit) &&
                        !isNullOrUndefined(col.edit.read)) {
                        var textBox = e.target.ej2_instances[0];
                        var textValue = e.target.value;
                        // const ganttProp: ITaskData = ganttObj.currentViewData[ganttObj.selectedRowIndex].ganttProperties;
                        var tempValue = void 0;
                        if (col.field === ganttObj.columnMapping.duration) {
                            // tempValue = !isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.read) ? (col.edit.read as Function)() :
                            //     // eslint-disable-next-line
                            //     !isNullOrUndefined(col.valueAccessor) ? (col.valueAccessor as Function)(ganttObj.columnMapping.duration, ganttObj.editedRecords, col) :
                            //         ganttObj.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
                            if (!isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.read)) {
                                tempValue = col.edit.read();
                            }
                            if (textValue !== tempValue.toString()) {
                                textBox.value = textValue;
                                textBox.dataBind();
                            }
                        }
                    }
                    if (ganttObj.editModule.dialogModule.dialogObj && getValue('dialogOpen', ganttObj.editModule.dialogModule.dialogObj)) {
                        return;
                    }
                    ganttObj.treeGrid.grid.saveCell();
                    var focussedElement = ganttObj.element.querySelector('.e-treegrid');
                    focussedElement.focus();
                }
                // if (!isNullOrUndefined(this.parent.onTaskbarClick) && !isNullOrUndefined(targetElement)
                //     && !isNullOrUndefined(targetElement.closest('.e-chart-row'))) {
                //     const target: EventTarget = e.target;
                //     const taskbarElement: Element = targetElement.querySelector('.e-gantt-parent-taskbar,' +
                //             '.e-gantt-child-taskbar,.e-gantt-milestone');
                //     if (taskbarElement) {
                //         this.parent.ganttChartModule.onTaskbarClick(e, target, taskbarElement);
                //     }
                // }
                if (!isNullOrUndefined(targetElement)
                    && !isNullOrUndefined(targetElement.closest('.e-chart-row'))) {
                    var target = e.target;
                    var taskbarElement = targetElement.querySelector('.e-gantt-parent-taskbar,' +
                        '.e-gantt-child-taskbar,.e-gantt-milestone');
                    if (taskbarElement) {
                        this.parent.ganttChartModule.onTaskbarClick(e, target, taskbarElement);
                    }
                }
                break;
            case 'escape':
                if (!isNullOrUndefined(ganttObj.editModule) && !isNullOrUndefined(ganttObj.editModule.cellEditModule)) {
                    ganttObj.editModule.cellEditModule.isCellEdit = false;
                    if (!isNullOrUndefined(ganttObj.toolbarModule)) {
                        ganttObj.toolbarModule.refreshToolbarItems();
                    }
                }
                break;
            case 'addRow':
                {
                    if (ganttObj.editModule && ganttObj.editModule.cellEditModule && ganttObj.editModule.cellEditModule.isCellEdit) {
                        e.stopPropagation();
                    }
                    else if (isNullOrUndefined(document.getElementById(this.parent.element.id + '_dialog'))) {
                        e.preventDefault();
                        ganttObj.addRecord(undefined, this.parent.editSettings.newRowPosition, this.parent.selectedRowIndex);
                        var focussedElement = ganttObj.element;
                        focussedElement.focus();
                    }
                    break;
                }
            case 'addRowDialog':
                e.preventDefault();
                if (ganttObj.editModule && ganttObj.editModule.dialogModule && ganttObj.editSettings.allowAdding) {
                    if (ganttObj.editModule.dialogModule.dialogObj && getValue('dialogOpen', ganttObj.editModule.dialogModule.dialogObj)) {
                        return;
                    }
                    ganttObj.editModule.dialogModule.openAddDialog();
                }
                break;
            case 'editRowDialog':
                {
                    e.preventDefault();
                    var focussedTreeElement = ganttObj.element.querySelector('.e-treegrid');
                    focussedTreeElement.focus();
                    if (ganttObj.editModule && ganttObj.editModule.dialogModule && ganttObj.editSettings.allowEditing) {
                        if (ganttObj.editModule.dialogModule.dialogObj && getValue('dialogOpen', ganttObj.editModule.dialogModule.dialogObj)) {
                            return;
                        }
                        ganttObj.editModule.dialogModule.openToolbarEditDialog();
                    }
                    break;
                }
            case 'delete':
                if (ganttObj.selectionModule && ganttObj.editModule && ganttObj.editModule.dialogModule &&
                    (!ganttObj.editModule.dialogModule.dialogObj || (ganttObj.editModule.dialogModule.dialogObj &&
                        !ganttObj.editModule.dialogModule.dialogObj.visible)) && (!ganttObj.editSettings.allowTaskbarEditing
                    || (ganttObj.editSettings.allowTaskbarEditing && !ganttObj.editModule.taskbarEditModule.touchEdit))) {
                    if ((ganttObj.selectionSettings.mode !== 'Cell' && ganttObj.selectionModule.selectedRowIndexes.length)
                        || (ganttObj.selectionSettings.mode === 'Cell' && ganttObj.selectionModule.getSelectedRowCellIndexes().length)) {
                        if (!isNullOrUndefined(e.target)) {
                            if (e.target['tagName'] !== 'INPUT') {
                                ganttObj.editModule.startDeleteAction();
                            }
                        }
                        else {
                            ganttObj.editModule.startDeleteAction();
                        }
                    }
                }
                break;
            case 'focusTask':
                {
                    e.preventDefault();
                    var selectedId = void 0;
                    if (ganttObj.selectionModule) {
                        var currentViewData = ganttObj.currentViewData;
                        if (ganttObj.selectionSettings.mode !== 'Cell' &&
                            !isNullOrUndefined(currentViewData[ganttObj.selectedRowIndex])) {
                            selectedId = ganttObj.currentViewData[ganttObj.selectedRowIndex].ganttProperties.rowUniqueID;
                        }
                        else if (ganttObj.selectionSettings.mode === 'Cell' &&
                            ganttObj.selectionModule.getSelectedRowCellIndexes().length > 0) {
                            var selectCellIndex = ganttObj.selectionModule.getSelectedRowCellIndexes();
                            selectedId = currentViewData[selectCellIndex[selectCellIndex.length - 1].rowIndex].ganttProperties.rowUniqueID;
                        }
                    }
                    if (selectedId) {
                        ganttObj.scrollToTask(selectedId.toString());
                    }
                    break;
                }
            case 'focusSearch':
                {
                    if (ganttObj.element.querySelector('#' + ganttObj.element.id + '_searchbar')) {
                        var searchElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_searchbar');
                        searchElement.setAttribute('tabIndex', '-1');
                        searchElement.focus();
                    }
                    break;
                }
            case 'tab':
            case 'shiftTab':
                if (!ganttObj.element.classList.contains('e-scroll-disabled')) {
                    ganttObj.ganttChartModule.onTabAction(e);
                }
                break;
            case 'contextMenu':
                {
                    var contextMenu = document.getElementById(this.parent.element.id +
                        '_contextmenu').ej2_instances[0];
                    var containerPosition = this.parent.getOffsetRect(e.target);
                    var top_1 = containerPosition.top + (containerPosition.height / 2);
                    var left = containerPosition.left + (containerPosition.width / 2);
                    this.setActiveElement(e.target);
                    contextMenu.open(top_1, left);
                    e.preventDefault();
                    break;
                }
            case 'undo':
                {
                    if (this.parent.undoRedoModule && this.parent.undoRedoModule['getUndoCollection'].length > 0) {
                        this.parent.undo();
                    }
                    break;
                }
            case 'redo':
                {
                    if (this.parent.undoRedoModule && this.parent.undoRedoModule['getRedoCollection'].length > 0) {
                        this.parent.redo();
                    }
                    break;
                }
            case 'selectAll':
                {
                    e.preventDefault();
                    var ganttRow = [].slice.call(this.parent.ganttChartModule.chartBodyContent.querySelector('tbody').children);
                    if (ganttRow.length > 0) {
                        var firstRowIndex = parseInt(ganttRow[0].getAttribute('aria-rowindex'), 10) - 1;
                        var lastRowIndex = parseInt(ganttRow[ganttRow.length - 1].getAttribute('aria-rowindex'), 10) - 1;
                        if (!isNullOrUndefined(firstRowIndex)) {
                            firstRowIndex = Number(firstRowIndex);
                        }
                        if (!isNullOrUndefined(lastRowIndex)) {
                            lastRowIndex = Number(lastRowIndex);
                        }
                        if (!isNullOrUndefined(firstRowIndex) && !isNullOrUndefined(lastRowIndex)) {
                            this.parent.selectionModule.selectRowsByRange(firstRowIndex, lastRowIndex);
                        }
                    }
                    break;
                }
            default:
                {
                    var eventArgs = {
                        requestType: 'keyPressed',
                        action: e.action,
                        keyEvent: e
                    };
                    ganttObj.trigger('actionComplete', eventArgs);
                    break;
                }
        }
    };
    FocusModule.prototype.upDownKeyNavigate = function (e) {
        e.preventDefault();
        var ganttObj = this.parent;
        var expandedRecords;
        if ((e.action === 'downArrow' || e.action === 'upArrow') && this.parent.selectionModule && this.parent.allowSelection && this.parent.virtualScrollModule && this.parent.enableVirtualization) {
            expandedRecords = ganttObj.getExpandedRecords(ganttObj.flatData);
        }
        else {
            expandedRecords = ganttObj.getExpandedRecords(ganttObj.currentViewData);
        }
        if (ganttObj.selectionModule) {
            if (ganttObj.selectionSettings.mode !== 'Cell' && ganttObj.selectedRowIndex !== -1) {
                var selectedItem = void 0;
                if ((e.action === 'downArrow' || e.action === 'upArrow') && this.parent.selectionModule && this.parent.allowSelection && this.parent.virtualScrollModule && this.parent.enableVirtualization) {
                    selectedItem = ganttObj.flatData[ganttObj.selectedRowIndex];
                }
                else {
                    selectedItem = ganttObj.currentViewData[ganttObj.selectedRowIndex];
                }
                var focussedElement = ganttObj.element.querySelector('.e-focused');
                if (focussedElement) {
                    removeClass([focussedElement], 'e-focused');
                }
                var selectingRowIndex = expandedRecords.indexOf(selectedItem);
                var currentSelectingRecord = e.action === 'downArrow' ? expandedRecords[selectingRowIndex + 1] :
                    expandedRecords[selectingRowIndex - 1];
                var activeElement = this.parent['args'];
                if (document.activeElement !== activeElement) {
                    if ((e.action === 'downArrow' || e.action === 'upArrow') && this.parent.selectionModule && this.parent.allowSelection && this.parent.virtualScrollModule && this.parent.enableVirtualization) {
                        ganttObj.selectionModule.selectRow(ganttObj.flatData.indexOf(currentSelectingRecord), false, true);
                    }
                    else {
                        ganttObj.selectionModule.selectRow(ganttObj.currentViewData.indexOf(currentSelectingRecord), false, true);
                    }
                }
            }
            else if (ganttObj.selectionSettings.mode === 'Cell' && ganttObj.selectionModule.getSelectedRowCellIndexes().length > 0) {
                var selectCellIndex = ganttObj.selectionModule.getSelectedRowCellIndexes();
                var selectedCellItem = selectCellIndex[selectCellIndex.length - 1];
                var currentCellIndex = selectedCellItem.cellIndexes[selectedCellItem.cellIndexes.length - 1];
                var selectedItem = ganttObj.currentViewData[selectedCellItem.rowIndex];
                var selectingRowIndex = expandedRecords.indexOf(selectedItem);
                var currentSelectingRecord = e.action === 'downArrow' ? expandedRecords[selectingRowIndex + 1] :
                    expandedRecords[selectingRowIndex - 1];
                var cellInfo = {
                    rowIndex: ganttObj.currentViewData.indexOf(currentSelectingRecord),
                    cellIndex: currentCellIndex
                };
                ganttObj.selectionModule.selectCell(cellInfo);
            }
            this.parent.ganttChartModule.focusedRowIndex = this.parent.selectedRowIndex;
        }
    };
    FocusModule.prototype.expandCollapseKey = function (e) {
        var ganttObj = this.parent;
        if (ganttObj.selectionModule && ganttObj.selectedRowIndex !== -1) {
            var selectedRowIndex_1;
            if (ganttObj.selectionSettings.mode !== 'Cell') {
                selectedRowIndex_1 = ganttObj.selectedRowIndex;
            }
            else if (ganttObj.selectionSettings.mode === 'Cell' && ganttObj.selectionModule.getSelectedRowCellIndexes().length > 0) {
                var selectCellIndex = ganttObj.selectionModule.getSelectedRowCellIndexes();
                selectedRowIndex_1 = selectCellIndex[selectCellIndex.length - 1].rowIndex;
            }
            if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
                selectedRowIndex_1 = this.parent.currentViewData.findIndex(function (obj) { return obj.ganttProperties.rowUniqueID ===
                    selectedRowIndex_1.toString(); }) + 1;
            }
            if (e.action === 'expandRow') {
                ganttObj.expandByIndex(selectedRowIndex_1);
            }
            else {
                ganttObj.collapseByIndex(selectedRowIndex_1);
            }
        }
    };
    return FocusModule;
}());
export { FocusModule };
