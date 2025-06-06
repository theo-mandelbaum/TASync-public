import { createElement, detach, closest, Browser, isNullOrUndefined as isNOU, getComponent } from '@syncfusion/ej2-base';
import { isNullOrUndefined, EventHandler, addClass } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import * as classes from '../base/classes';
import { dispatchEvent, parseHtml, hasClass } from '../base/util';
import { removeClassWithAttr } from '../../common/util';
/**
 * `Table` module is used to handle table actions.
 */
var Table = /** @class */ (function () {
    function Table(parent, serviceLocator) {
        this.ensureInsideTableList = true;
        this.pageX = null;
        this.pageY = null;
        this.moveEle = null;
        this.currentColumnResize = '';
        this.resizeEndTime = 0;
        this.isTableMoveActive = false;
        this.isResizeBind = true;
        this.parent = parent;
        this.rteID = parent.element.id;
        this.l10n = serviceLocator.getService('rteLocale');
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.isDestroyed = false;
    }
    Table.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.createTable, this.renderDlgContent, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.showTableDialog, this.showDialog, this);
        this.parent.on(events.closeTableDialog, this.closeDialog, this);
        this.parent.on(events.docClick, this.docClick, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.tableToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.dropDownSelect, this.dropdownSelect, this);
        this.parent.on(events.keyDown, this.keyDown, this);
        this.parent.on(events.tableModulekeyUp, this.tableModulekeyUp, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.afterKeyDown, this.afterKeyDown, this);
        this.parent.on(events.hideTableQuickToolbar, this.hideTableQuickToolbar, this);
    };
    Table.prototype.removeEventListener = function () {
        this.parent.off(events.createTable, this.renderDlgContent);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.docClick, this.docClick);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.showTableDialog, this.showDialog);
        this.parent.off(events.closeTableDialog, this.closeDialog);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.tableToolbarAction, this.onToolbarAction);
        this.parent.off(events.dropDownSelect, this.dropdownSelect);
        this.parent.off(events.mouseDown, this.cellSelect);
        this.parent.off(events.hideTableQuickToolbar, this.hideTableQuickToolbar);
        this.parent.off(events.keyDown, this.keyDown);
        this.parent.off(events.tableModulekeyUp, this.tableModulekeyUp);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.afterKeyDown, this.afterKeyDown);
        if (!Browser.isDevice && this.parent.tableSettings.resize) {
            EventHandler.remove(this.contentModule.getEditPanel(), 'mouseover', this.resizeHelper);
            EventHandler.remove(this.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart);
        }
    };
    Table.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                currentObj.setProperties({ cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                currentObj.setProperties({ cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    Table.prototype.setCssClass = function (e) {
        if (this.popupObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                addClass([this.popupObj.element], e.cssClass);
            }
            else {
                removeClassWithAttr([this.popupObj.element], e.oldCssClass);
                addClass([this.popupObj.element], e.cssClass);
            }
        }
        this.updateCss(this.createTableButton, e);
        this.updateCss(this.editdlgObj, e);
        var numericTextBoxObj = [
            this.columnTextBox, this.rowTextBox, this.tableWidthNum, this.tableCellPadding, this.tableCellSpacing
        ];
        for (var i = 0; i < numericTextBoxObj.length; i++) {
            this.updateCss(numericTextBoxObj[i], e);
        }
    };
    Table.prototype.afterRender = function () {
        if (isNullOrUndefined(this.contentModule)) {
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            this.parent.on(events.mouseDown, this.cellSelect, this);
            if (this.parent.tableSettings.resize) {
                EventHandler.add(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart, this);
            }
            if (!Browser.isDevice && this.parent.tableSettings.resize) {
                EventHandler.add(this.contentModule.getEditPanel(), 'mouseover', this.resizeHelper, this);
            }
        }
    };
    Table.prototype.dropdownSelect = function (e) {
        var item = e.item;
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Table') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var args = {
            args: e,
            selection: this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument()),
            selectParent: this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)
        };
        switch (item.subCommand) {
            case 'InsertRowBefore':
            case 'InsertRowAfter':
                this.addRow(args.selection, e);
                break;
            case 'InsertColumnLeft':
            case 'InsertColumnRight':
                this.addColumn(args.selection, e);
                break;
            case 'DeleteColumn':
            case 'DeleteRow':
                this.removeRowColumn(args.selection, e);
                break;
            case 'AlignTop':
            case 'AlignMiddle':
            case 'AlignBottom':
                this.verticalAlign(args, e);
                break;
            case 'Dashed':
            case 'Alternate':
            case 'Custom':
                this.tableStyles(args, e);
                break;
            case 'Merge':
            case 'VerticalSplit':
            case 'HorizontalSplit':
                this.UpdateCells(args.selection, e);
                break;
        }
    };
    Table.prototype.UpdateCells = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, subCommand: e.item.subCommand });
        this.hideTableQuickToolbar();
    };
    Table.prototype.keyDown = function (e) {
        var event = e.args;
        // eslint-disable-next-line
        var proxy = this;
        switch (event.action) {
            case 'escape':
                break;
            case 'insert-table':
                if (this.parent.editorMode === 'HTML') {
                    this.openDialog(true, e);
                }
                else if (this.parent.editorMode === 'Markdown') {
                    this.parent.formatter.process(this.parent, null, event);
                }
                event.preventDefault();
                break;
        }
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule
            && event.code !== 'KeyK') {
            var selection = void 0;
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var ele = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)[0];
            ele = (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') ? ele.parentElement : ele;
            if ((event.keyCode === 8 || event.keyCode === 46) ||
                (event.ctrlKey && event.keyCode === 88)) {
                if (ele && ele.tagName === 'TBODY') {
                    if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
                        selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
                    }
                    event.preventDefault();
                    proxy.removeTable(selection, event, true);
                }
                else if (ele && ele.querySelectorAll('table').length > 0) {
                    this.removeResizeElement();
                    this.hideTableQuickToolbar();
                }
            }
            if (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') {
                var closestTd = closest(ele, 'td');
                ele = !isNullOrUndefined(closestTd) && this.parent.inputElement.contains(closestTd) ? closestTd : ele;
            }
            if (ele && (ele.tagName === 'TD' || ele.tagName === 'TH')) {
                var selectedEndCell = this.contentModule.getEditPanel().querySelectorAll('.e-cell-select-end');
                if ((isNOU(this.activeCell) || this.activeCell !== ele) && !isNOU(selectedEndCell) && selectedEndCell.length === 0) {
                    this.activeCell = ele;
                }
                if (!isNOU(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
                    selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
                }
                if (!event.shiftKey ||
                    (event.shiftKey && event.keyCode === 9)) {
                    switch (event.keyCode) {
                        case 9:
                        case 37:
                        case 39:
                            proxy.tabSelection(event, selection, ele);
                            break;
                        case 40:
                        case 38:
                            proxy.tableArrowNavigation(event, selection, ele);
                            break;
                    }
                }
            }
        }
        if (event.shiftKey && (event.keyCode === 39 ||
            event.keyCode === 37
            || event.keyCode === 38 || event.keyCode === 40)) {
            this.keyDownEventInstance = event;
            EventHandler.add(this.parent.contentModule.getDocument(), 'selectionchange', this.tableCellsKeyboardSelection, this);
        }
        if (event.ctrlKey && event.key === 'a') {
            this.handleSelectAll();
        }
        if (((event.code === 'Delete' && event.which === 46) || (event.code === 'Backspace' && event.which === 8)) && this.parent.editorMode === 'HTML') {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            if (range.startContainer.nodeType === Node.ELEMENT_NODE && range.startContainer.nodeName === 'DIV' && range.startContainer.classList.contains('e-table-fake-selection')) {
                this.deleteTable();
                event.preventDefault();
            }
            else {
                var table = (event.code === 'Delete' && event.which === 46) ? this.getAdjacentTableElement(range, true) : this.getAdjacentTableElement(range, false);
                if (table) {
                    this.updateTableSelection(table);
                    event.preventDefault();
                }
            }
        }
        else {
            var isShiftEnter = event.shiftKey && event.key === 'Enter';
            var isActionKey = classes.ALLOWED_ACTIONKEYS.indexOf(event.key) !== -1;
            if (isShiftEnter || isActionKey || (event.key && event.key.length === 1)) {
                var table = this.parent.contentModule.getEditPanel().querySelector('table.e-cell-select');
                if (table) {
                    if (event.keyCode === 39 || event.keyCode === 37) {
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), table, 0);
                    }
                    else {
                        var firstTd = table.querySelector('tr').cells[0];
                        this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), firstTd, firstTd, 0, 0);
                    }
                }
                this.removeTableSelection();
            }
        }
    };
    Table.prototype.tableCellsKeyboardSelection = function (e) {
        EventHandler.remove(this.parent.contentModule.getDocument(), 'selectionchange', this.tableCellsKeyboardSelection);
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var event = this.keyDownEventInstance;
        var isMultiSelect = !isNullOrUndefined(range) && !isNullOrUndefined(range.commonAncestorContainer) &&
            range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
            && (range.commonAncestorContainer.tagName === 'TR'
                || range.commonAncestorContainer.tagName === 'TBODY') && !isNullOrUndefined(this.activeCell);
        var selectedEndCell = this.contentModule.getEditPanel().querySelectorAll('.e-cell-select-end');
        if (!isNullOrUndefined(selectedEndCell) && selectedEndCell.length > 0) {
            this.parent.formatter.editorManager.nodeSelection.Clear(this.parent.contentModule.getDocument());
            this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.parent.contentModule.getDocument(), selectedEndCell[0], selectedEndCell[0], 0, 0);
            this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), selectedEndCell[0], 0);
        }
        if (isMultiSelect || (!isNullOrUndefined(selectedEndCell) && selectedEndCell.length > 0)) {
            var cells = this.getCorrespondingColumns();
            var cell = !isNullOrUndefined(selectedEndCell)
                && selectedEndCell.length > 0 ? selectedEndCell[0] : this.activeCell;
            var activeIndexes = this.getCorrespondingIndex(cell, cells);
            var activeCellRowIndex = activeIndexes[0];
            var activeCellColIndex = activeIndexes[1];
            var target = void 0;
            if (event.keyCode === 39) {
                if (activeCellColIndex < cells[0].length - 1) {
                    target = cells[activeCellRowIndex][(activeCellColIndex + 1)];
                }
                else if (activeCellRowIndex < cells.length - 1) {
                    target = cells[(activeCellRowIndex + 1)][activeCellColIndex];
                    if (selectedEndCell.length === 0 && activeCellRowIndex < cells.length - 1) {
                        this.activeCell = cells[activeCellRowIndex][0];
                    }
                }
                else {
                    this.resetTableSelection();
                }
            }
            else if (event.keyCode === 37) {
                if (0 < activeCellColIndex) {
                    target = cells[activeCellRowIndex][(activeCellColIndex - 1)];
                }
                else if (0 < activeCellRowIndex) {
                    target = cells[(activeCellRowIndex - 1)][activeCellColIndex];
                    if (selectedEndCell.length === 0 && 0 < activeCellRowIndex) {
                        this.activeCell = cells[activeCellRowIndex][(cells[activeCellRowIndex].length - 1)];
                    }
                }
                else {
                    this.resetTableSelection();
                }
            }
            else if (event.keyCode === 38) {
                if (0 < activeCellRowIndex) {
                    target = cells[(activeCellRowIndex - 1)][activeCellColIndex];
                }
                else {
                    this.resetTableSelection();
                }
            }
            else if (event.keyCode === 40) {
                if (activeCellRowIndex < cells.length - 1) {
                    target = cells[(activeCellRowIndex + 1)][activeCellColIndex];
                }
                else {
                    this.resetTableSelection();
                }
            }
            if (target) {
                this.parent.formatter.editorManager.observer.notify('TABLE_MOVE', {
                    event: { target: target },
                    selectNode: [this.activeCell]
                });
            }
        }
        if (selectedEndCell.length > 0) {
            event.preventDefault();
            e.preventDefault();
        }
    };
    Table.prototype.resetTableSelection = function () {
        var selectedEndCell = this.contentModule.getEditPanel().querySelectorAll('.e-cell-select-end');
        if (!isNullOrUndefined(selectedEndCell) && selectedEndCell.length > 0) {
            this.parent.formatter.editorManager.nodeSelection.setSelectionNode(this.parent.contentModule.getDocument(), this.curTable);
        }
        this.activeCell = null;
        this.removeCellSelectClasses();
        this.removeTableSelection();
    };
    Table.prototype.getCorrespondingColumns = function () {
        var elementArray = [];
        var colspan = 0;
        var allRows = this.curTable.rows;
        for (var i = 0; i <= allRows.length - 1; i++) {
            var ele = allRows[i];
            var index = 0;
            for (var j = 0; j <= ele.children.length - 1; j++) {
                var colEle = ele.children[j];
                for (var ele_1 = colEle, colspan_1 = parseInt(ele_1.getAttribute('colspan'), 10) || 1, rowSpan = parseInt(ele_1.getAttribute('rowspan'), 10) || 1, rowIndex = i; rowIndex < i + rowSpan; rowIndex++) {
                    for (var colIndex = index; colIndex < index + colspan_1; colIndex++) {
                        if (!elementArray[rowIndex]) {
                            elementArray[rowIndex] = [];
                        }
                        if (elementArray[rowIndex][colIndex]) {
                            index++;
                        }
                        else {
                            elementArray[rowIndex][colIndex] = colEle;
                        }
                    }
                }
                index += colspan;
            }
        }
        return elementArray;
    };
    Table.prototype.getCorrespondingIndex = function (cell, allCells) {
        for (var i = 0; i < allCells.length; i++) {
            for (var j = 0; j < allCells[i].length; j++) {
                if (allCells[i][j] === cell) {
                    return [i, j];
                }
            }
        }
        return [];
    };
    Table.prototype.getAdjacentTableElement = function (range, isdelKey) {
        if (!range.collapsed || (!isdelKey && this.quickToolObj && this.quickToolObj.tableQTBar
            && document.body.contains(this.quickToolObj.tableQTBar.element))) {
            return null;
        }
        var nodeCollection = this.getNodeCollection(range);
        var startContainer = (range.collapsed && this.parent.contentModule.getEditPanel() === range.startContainer
            && nodeCollection && nodeCollection.length > 0 && nodeCollection[0] ?
            nodeCollection[0] : range.startContainer);
        var adjacentElement = this.getSelectedTableEle(nodeCollection);
        var isBrEle = this.getBrElement(range, nodeCollection);
        if (startContainer && startContainer.nodeType === Node.ELEMENT_NODE) {
            if (startContainer.tagName === 'IMG' || startContainer.querySelector('img') || startContainer.tagName === 'AUDIO'
                || startContainer.querySelector('audio') || startContainer.tagName === 'VIDEO' || startContainer.querySelector('video')
                || startContainer.querySelector('.e-video-clickelem')) {
                var compareRange = this.contentModule.getDocument().createRange();
                compareRange.collapse(true);
                compareRange.selectNodeContents(startContainer);
                var nodeIndex = this.parent.formatter.editorManager.nodeSelection.getIndex(startContainer);
                if ((isdelKey && compareRange.startOffset >= range.startOffset) ||
                    (!isdelKey && (startContainer.tagName !== 'IMG' && compareRange.startOffset !== range.startOffset
                        || startContainer.tagName === 'IMG' && nodeIndex !== range.startOffset))) {
                    return null;
                }
            }
        }
        if (startContainer && startContainer.nodeType === Node.TEXT_NODE) {
            if (isdelKey) {
                if (range.endOffset !== range.endContainer.textContent.length) {
                    if (range.endOffset !== range.endContainer.textContent.trim().length) {
                        return null;
                    }
                }
            }
            else if (range.startOffset !== 0) {
                return null;
            }
        }
        if (startContainer && startContainer.nodeType === Node.ELEMENT_NODE && startContainer.tagName === 'TABLE') {
            adjacentElement = startContainer;
        }
        if (adjacentElement) {
            var currentEleIndex = this.parent.formatter.editorManager.nodeSelection.getIndex(adjacentElement);
            if (!((range.startOffset === currentEleIndex && isdelKey) || (range.startOffset !== currentEleIndex && !isdelKey))) {
                adjacentElement = null;
            }
        }
        if (!adjacentElement && startContainer) {
            adjacentElement = this.getAdjacentElementFromDom(startContainer, isBrEle, isdelKey);
        }
        if (adjacentElement && adjacentElement.nodeType === Node.ELEMENT_NODE && adjacentElement.tagName === 'TABLE') {
            this.setSelection(adjacentElement, isBrEle);
            return adjacentElement;
        }
        return null;
    };
    Table.prototype.getAdjacentElementFromDom = function (startContainer, isBrEle, isdelKey) {
        var adjacentElement;
        var parentElement = (isBrEle ? isBrEle : startContainer.parentNode);
        var currentElement = startContainer;
        while (parentElement && !adjacentElement && parentElement.parentNode) {
            var childNodes = Array.from(parentElement.childNodes);
            var startContainerIndex = childNodes.indexOf(currentElement);
            if (startContainerIndex !== -1 && ((isdelKey && startContainerIndex < childNodes.length - 1)
                || (!isdelKey && startContainerIndex > 0))) {
                adjacentElement = (childNodes[isdelKey ? startContainerIndex + 1 : startContainerIndex - 1]);
            }
            else {
                adjacentElement = (isdelKey ? parentElement.nextSibling : parentElement.previousSibling);
                currentElement = parentElement;
            }
            if (!isBrEle && startContainer.nodeType === Node.TEXT_NODE && adjacentElement && adjacentElement.tagName && adjacentElement.tagName.toUpperCase() === 'BR') {
                isBrEle = currentElement = parentElement = adjacentElement;
                adjacentElement = null;
            }
            if (!isBrEle && adjacentElement && !(adjacentElement.nodeType === Node.ELEMENT_NODE && adjacentElement.tagName === 'TABLE') && !isNullOrUndefined(adjacentElement.textContent) && !adjacentElement.textContent.trim()) {
                currentElement = parentElement = adjacentElement.parentNode;
                adjacentElement = null;
            }
            if (adjacentElement && adjacentElement.tagName && ['UL', 'OL', 'LI'].indexOf(adjacentElement.tagName.toUpperCase()) !== -1) {
                adjacentElement = this.getAdjacentElementFromList(adjacentElement, isdelKey);
                if (!adjacentElement) {
                    return null;
                }
            }
            if (parentElement && parentElement.tagName && parentElement.tagName.toUpperCase() === 'LI' && !isdelKey) {
                adjacentElement = parentElement;
            }
            parentElement = parentElement.parentNode;
        }
        return adjacentElement;
    };
    Table.prototype.getAdjacentElementFromList = function (adjacentElement, isdelKey) {
        while (adjacentElement) {
            if (adjacentElement.tagName && ['UL', 'OL', 'LI'].indexOf(adjacentElement.tagName.toUpperCase()) === -1) {
                if (!(adjacentElement.nodeType === Node.ELEMENT_NODE && adjacentElement.tagName === 'TABLE')) {
                    adjacentElement = (isdelKey ? adjacentElement.firstChild : adjacentElement.lastChild);
                }
                break;
            }
            adjacentElement = (isdelKey ? adjacentElement.firstChild : adjacentElement.lastChild);
        }
        return adjacentElement;
    };
    Table.prototype.getNodeCollection = function (range) {
        var nodes = [];
        if (range.collapsed && this.parent.contentModule.getEditPanel() === range.startContainer
            && range.startContainer.childNodes.length > 0) {
            var index = Math.max(0, Math.min(range.startContainer.childNodes.length - 1, range.endOffset - 1));
            nodes.push(range.startContainer.childNodes[index]);
        }
        else {
            nodes = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
        }
        return nodes;
    };
    Table.prototype.getSelectedTableEle = function (nodeCollection) {
        if (nodeCollection && nodeCollection.length > 0) {
            for (var _i = 0, _a = Array.from(nodeCollection); _i < _a.length; _i++) {
                var element = _a[_i];
                if (element && element.tagName === 'TABLE') {
                    return element;
                }
            }
        }
        return null;
    };
    Table.prototype.getBrElement = function (range, nodeCollection) {
        if (range.endContainer.tagName === 'BR') {
            return range.endContainer;
        }
        if (nodeCollection.length === 1 && nodeCollection[0]
            && nodeCollection[0].tagName === 'BR') {
            return nodeCollection[0];
        }
        return null;
    };
    Table.prototype.setSelection = function (nextElement, isBrEle) {
        if (!nextElement.classList.contains('e-cell-select')) {
            this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
            if (isBrEle) {
                if (isBrEle.parentNode && isBrEle.parentNode.childNodes.length === 1 && isBrEle.parentNode.firstChild.nodeName === 'BR') {
                    detach(isBrEle.parentNode);
                }
                else {
                    detach(isBrEle);
                }
            }
            var fakeSelectionEle = this.parent.createElement('div', { className: 'e-table-fake-selection' });
            fakeSelectionEle.setAttribute('contenteditable', 'false');
            this.contentModule.getEditPanel().appendChild(fakeSelectionEle);
            this.parent.formatter.editorManager.nodeSelection.setSelectionNode(this.contentModule.getDocument(), fakeSelectionEle);
        }
    };
    Table.prototype.removeAllFakeSelectionEles = function () {
        var fakeSelectionEles = this.parent.contentModule.getEditPanel().querySelectorAll('.e-table-fake-selection');
        if (fakeSelectionEles && fakeSelectionEles.length > 0) {
            fakeSelectionEles.forEach(function (element) {
                detach(element);
            });
        }
    };
    Table.prototype.deleteTable = function () {
        var table = this.parent.contentModule.getEditPanel().querySelector('table.e-cell-select');
        this.removeResizeElement();
        if (table) {
            var brElement = document.createElement('br');
            var containerEle = brElement;
            if (this.parent.enterKey === 'DIV') {
                containerEle = document.createElement('div');
                containerEle.appendChild(brElement);
            }
            else if (this.parent.enterKey === 'P') {
                containerEle = document.createElement('p');
                containerEle.appendChild(brElement);
            }
            table.parentNode.replaceChild(containerEle, table);
            this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), containerEle, containerEle, 0, 0);
            this.removeTableSelection();
        }
    };
    Table.prototype.removeTableSelection = function () {
        var table = this.parent.contentModule.getEditPanel().querySelector('table.e-cell-select');
        if (table) {
            removeClassWithAttr([table], classes.CLS_TABLE_SEL);
        }
        this.removeAllFakeSelectionEles();
    };
    Table.prototype.updateTableSelection = function (table) {
        addClass([table], 'e-cell-select');
    };
    Table.prototype.handleSelectAll = function () {
        this.cancelResizeAction();
        var selectedCells = this.parent.inputElement.querySelectorAll('.' + classes.CLS_TABLE_SEL);
        removeClassWithAttr(selectedCells, classes.CLS_TABLE_SEL);
        this.removeTableSelection();
    };
    Table.prototype.tableModulekeyUp = function (e) {
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var ele = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)[0];
            ele = (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') ? ele.parentElement : ele;
            if (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') {
                var closestTd = closest(ele, 'td');
                ele = !isNullOrUndefined(closestTd) && this.parent.inputElement.contains(closestTd) ? closestTd : ele;
            }
            if ((ele && ele.tagName === 'TD' || ele.tagName === 'TH') && !ele.classList.contains(classes.CLS_TABLE_SEL)) {
                ele.classList.add(classes.CLS_TABLE_SEL);
            }
            var eventArgs = e.args;
            if (this.previousTableElement !== ele && !isNullOrUndefined(this.previousTableElement)
                && !eventArgs.shiftKey && (eventArgs.keyCode === 39 || eventArgs.keyCode === 37 ||
                eventArgs.keyCode === 38 || eventArgs.keyCode === 40)) {
                removeClassWithAttr([this.previousTableElement], classes.CLS_TABLE_SEL);
                this.removeTableSelection();
            }
        }
    };
    Table.prototype.openDialog = function (isInternal, e) {
        if (!isInternal) {
            this.parent.contentModule.getEditPanel().focus();
        }
        if (this.parent.editorMode === 'HTML') {
            var docElement = this.parent.contentModule.getDocument();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(docElement);
            var selection = this.parent.formatter.editorManager.nodeSelection.save(range, docElement);
            var args = {
                originalEvent: e ? e.args : { action: 'insert-table' },
                item: {
                    command: 'Table',
                    subCommand: 'CreateTable'
                },
                name: !isInternal ? 'showDialog' : null
            };
            this.insertTableDialog({ self: this, args: args, selection: selection });
        }
    };
    Table.prototype.showDialog = function () {
        this.openDialog(false);
        this.setCssClass({ cssClass: this.parent.getCssClass() });
    };
    Table.prototype.closeDialog = function () {
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
        }
    };
    Table.prototype.onToolbarAction = function (args) {
        var item = args.args.item;
        switch (item.subCommand) {
            case 'TableHeader':
                this.tableHeader(args.selection, args.args);
                break;
            case 'TableRemove':
                this.removeTable(args.selection, args.args);
                break;
            case 'TableEditProperties':
                this.editTable(args);
                break;
        }
    };
    Table.prototype.verticalAlign = function (args, e) {
        var tdEle = closest(args.selectParent[0], 'th') || closest(args.selectParent[0], 'td');
        if (tdEle) {
            this.parent.formatter.process(this.parent, e, e, { tableCell: tdEle, subCommand: e.item.subCommand });
        }
    };
    Table.prototype.tableStyles = function (args, e) {
        var command = e.item.subCommand;
        var table = closest(args.selectParent[0], 'table');
        if (command === 'Dashed') {
            /* eslint-disable */
            (this.parent.element.classList.contains(classes.CLS_TB_DASH_BOR)) ?
                removeClassWithAttr([this.parent.element], classes.CLS_TB_DASH_BOR) : this.parent.element.classList.add(classes.CLS_TB_DASH_BOR);
            (table.classList.contains(classes.CLS_TB_DASH_BOR)) ? removeClassWithAttr([table], classes.CLS_TB_DASH_BOR) :
                table.classList.add(classes.CLS_TB_DASH_BOR);
        }
        if (command === 'Alternate') {
            (this.parent.element.classList.contains(classes.CLS_TB_ALT_BOR)) ?
                removeClassWithAttr([this.parent.element], classes.CLS_TB_ALT_BOR) : this.parent.element.classList.add(classes.CLS_TB_ALT_BOR);
            (table.classList.contains(classes.CLS_TB_ALT_BOR)) ? removeClassWithAttr([table], classes.CLS_TB_ALT_BOR) :
                table.classList.add(classes.CLS_TB_ALT_BOR);
            /* eslint-enable */
        }
        if (args.args && args.args.item.cssClass) {
            var classList = args.args.item.cssClass.split(' ');
            for (var i = 0; i < classList.length; i++) {
                if (table.classList.contains(classList[i])) {
                    removeClassWithAttr([table], (classList[i]));
                }
                else {
                    table.classList.add(classList[i]);
                }
            }
        }
        this.parent.formatter.process(this.parent, e, e, { subCommand: e.item.subCommand });
        this.parent.formatter.saveData();
        this.hideTableQuickToolbar();
        this.parent.formatter.editorManager.nodeSelection.restore();
    };
    Table.prototype.insideList = function (range) {
        var blockNodes = this.getBlockNodesInSelection(range);
        var nodes = [];
        for (var i = 0; i < blockNodes.length; i++) {
            if (blockNodes[i].parentNode.tagName === 'LI') {
                nodes.push(blockNodes[i].parentNode);
            }
            else if (blockNodes[i].tagName === 'LI' && blockNodes[i].childNodes[0].tagName !== 'P' &&
                (blockNodes[i].childNodes[0].tagName !== 'OL' &&
                    blockNodes[i].childNodes[0].tagName !== 'UL')) {
                nodes.push(blockNodes[i]);
            }
        }
        if (nodes.length > 1 || nodes.length && ((range.startOffset === 0 && range.endOffset === 0))) {
            this.ensureInsideTableList = true;
            return true;
        }
        else {
            this.ensureInsideTableList = false;
            return false;
        }
    };
    Table.prototype.getBlockNodesInSelection = function (range) {
        var blockTags = [
            'DIV', 'SECTION', 'HEADER', 'FOOTER', 'ARTICLE', 'NAV',
            'P', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'LI', 'PRE',
            'TD', 'TH', 'FORM', 'FIELDSET', 'LEGEND', 'LABEL', 'TEXTAREA'
        ];
        var blockNodes = new Set();
        var treeWalker = this.contentModule.getDocument().createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) { return (range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT); }
        });
        // If selection is collapsed, handle the case explicitly
        if (range.collapsed) {
            var blockNode = this.getImmediateBlockNode(range.startContainer, blockTags);
            if (blockNode) {
                blockNodes.add(blockNode);
            }
        }
        else {
            while (treeWalker.nextNode()) {
                var blockNode = this.getImmediateBlockNode(treeWalker.currentNode, blockTags);
                if (blockNode) {
                    blockNodes.add(blockNode);
                }
            }
        }
        return Array.from(blockNodes);
    };
    Table.prototype.getImmediateBlockNode = function (node, blockTags) {
        var parentNode = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
        while (parentNode && parentNode.nodeType === Node.ELEMENT_NODE) {
            var element = parentNode;
            if (blockTags.indexOf(element.tagName) > -1) {
                return element;
            }
            parentNode = parentNode.parentNode;
        }
        return null;
    };
    Table.prototype.removeEmptyTextNodes = function (element) {
        var children = element.childNodes;
        for (var i = children.length - 1; i >= 0; i--) {
            var node = children[i];
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === '') {
                element.removeChild(node);
            }
        }
    };
    Table.prototype.tabSelection = function (event, selection, ele) {
        var allHeadBodyTRElements = ele.closest('table').querySelectorAll('thead, tbody, tr');
        for (var i = 0; i < allHeadBodyTRElements.length; i++) {
            this.removeEmptyTextNodes(allHeadBodyTRElements[i]);
        }
        this.previousTableElement = ele;
        var insideList = this.insideList(selection.range);
        if ((event.keyCode === 37 || event.keyCode === 39) ||
            insideList) {
            return;
        }
        event.preventDefault();
        removeClassWithAttr([ele], classes.CLS_TABLE_SEL);
        this.removeTableSelection();
        if (!event.shiftKey && event.keyCode !== 37) {
            var nextElement = (!isNullOrUndefined(ele.nextSibling)) ? ele.nextSibling :
                (!isNullOrUndefined(closest(ele, 'tr').nextSibling) ? closest(ele, 'tr').nextSibling.childNodes[0] :
                    (!isNullOrUndefined(closest(ele, 'table').nextSibling)) ?
                        (closest(ele, 'table').nextSibling.nodeName.toLowerCase() === 'td') ?
                            closest(ele, 'table').nextSibling : ele : ele);
            if (ele === nextElement && ele.nodeName === 'TH') {
                nextElement = closest(ele, 'table').rows[1].cells[0];
            }
            if (event.keyCode === 39 && ele === nextElement) {
                nextElement = closest(ele, 'table').nextSibling;
            }
            if (nextElement) {
                // eslint-disable-next-line
                (nextElement.textContent.trim() !== '' && closest(nextElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), nextElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), nextElement, nextElement, 0, 0);
            }
            if (ele === nextElement && event.keyCode !== 39 && nextElement) {
                ele.classList.add(classes.CLS_TABLE_SEL);
                this.addRow(selection, event, true);
                removeClassWithAttr([ele], classes.CLS_TABLE_SEL);
                this.removeTableSelection();
                nextElement = nextElement.parentElement.nextSibling ? nextElement.parentElement.nextSibling.firstChild :
                    nextElement.parentElement.firstChild;
                // eslint-disable-next-line
                (nextElement.textContent.trim() !== '' && closest(nextElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), nextElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), nextElement, nextElement, 0, 0);
            }
        }
        else {
            var prevElement = (!isNullOrUndefined(ele.previousSibling)) ? ele.previousSibling :
                (!isNullOrUndefined(closest(ele, 'tr').previousSibling) ?
                    closest(ele, 'tr').previousSibling.childNodes[closest(ele, 'tr').previousSibling.childNodes.length - 1] :
                    (!isNullOrUndefined(closest(ele, 'table').previousSibling)) ?
                        (closest(ele, 'table').previousSibling.nodeName.toLowerCase() === 'td') ? closest(ele, 'table').previousSibling :
                            ele : ele);
            if (ele === prevElement && ele.cellIndex === 0 &&
                closest(ele, 'table').tHead && ele.nodeName !== 'TH') {
                var clsTble = closest(ele, 'table');
                prevElement = clsTble.rows[0].cells[clsTble.rows[0].cells.length - 1];
            }
            if (event.keyCode === 37 && ele === prevElement) {
                prevElement = closest(ele, 'table').previousSibling;
            }
            if (!isNOU(prevElement) && prevElement.firstChild.nodeName === 'TABLE') {
                var tableChild = prevElement;
                while (!isNOU(tableChild.firstChild) && tableChild.firstChild.nodeName === 'TABLE' && tableChild.firstChild.rows.length > 0 && tableChild.firstChild.rows[0].cells.length > 0) {
                    tableChild = tableChild.firstChild.rows[0].cells[0];
                }
                prevElement = tableChild;
            }
            if (prevElement) {
                // eslint-disable-next-line
                (prevElement.textContent.trim() !== '' && closest(prevElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), prevElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), prevElement, prevElement, 0, 0);
            }
        }
    };
    Table.prototype.tableArrowNavigation = function (event, selection, ele) {
        var selText = selection.range.startContainer;
        this.previousTableElement = ele;
        if ((event.keyCode === 40 && selText.nodeType === 3 && (selText.nextSibling && selText.nextSibling.nodeName === 'BR' ||
            selText.parentNode && selText.parentNode.nodeName !== 'TD')) ||
            (event.keyCode === 38 && selText.nodeType === 3 && (selText.previousSibling && selText.previousSibling.nodeName === 'BR' ||
                selText.parentNode && selText.parentNode.nodeName !== 'TD'))) {
            return;
        }
        event.preventDefault();
        removeClassWithAttr([ele], classes.CLS_TABLE_SEL);
        this.removeTableSelection();
        if (event.keyCode === 40) {
            ele = (!isNullOrUndefined(closest(ele, 'tr').nextElementSibling)) ?
                closest(ele, 'tr').nextElementSibling.children[ele.cellIndex] :
                (closest(ele, 'table').tHead && ele.nodeName === 'TH') ?
                    closest(ele, 'table').rows[1].cells[ele.cellIndex] :
                    (!isNullOrUndefined(closest(ele, 'table').nextSibling)) ? closest(ele, 'table').nextSibling :
                        ele;
        }
        else {
            ele = (!isNullOrUndefined(closest(ele, 'tr').previousElementSibling)) ?
                closest(ele, 'tr').previousElementSibling.children[ele.cellIndex] :
                (closest(ele, 'table').tHead && ele.nodeName !== 'TH') ?
                    closest(ele, 'table').tHead.rows[0].cells[ele.cellIndex] :
                    (!isNullOrUndefined(closest(ele, 'table').previousSibling)) ? closest(ele, 'table').previousSibling :
                        ele;
        }
        if (ele) {
            selection.setSelectionText(this.contentModule.getDocument(), ele, ele, 0, 0);
        }
    };
    Table.prototype.hideTableQuickToolbar = function () {
        if (this.quickToolObj && this.quickToolObj.tableQTBar && document.body.contains(this.quickToolObj.tableQTBar.element)) {
            this.quickToolObj.tableQTBar.hidePopup();
        }
    };
    Table.prototype.tableHeader = function (selection, e) {
        this.parent.formatter.process(this.parent, e, e.originalEvent, { selection: selection, subCommand: e.item.subCommand });
    };
    Table.prototype.getAnchorNode = function (element) {
        var selectParent = closest(element, 'a');
        return (selectParent ? selectParent : element);
    };
    Table.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly || !isNOU(closest(e.args.target, '.e-img-caption'))) {
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.tableQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.tableQTBar.element.classList.contains('e-rte-pop');
            if (isPopupOpen) {
                return;
            }
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
            var closestTable = closest(target, 'table');
            var startNode = this.parent.getRange().startContainer.parentElement;
            var endNode = this.parent.getRange().endContainer.parentElement;
            var isAnchorEle = this.getAnchorNode(target);
            var currentTime = new Date().getTime();
            var ismacRightClick = this.parent.userAgentData.getPlatform() === 'macOS' && args.which === 3;
            if (target && target.nodeName !== 'A' && isAnchorEle.nodeName !== 'A' && target.nodeName !== 'IMG' && target.nodeName !== 'VIDEO' && !target.classList.contains(classes.CLS_CLICKELEM) &&
                target.nodeName !== 'AUDIO' && (startNode === endNode || ismacRightClick) && (target.nodeName === 'TD' || target.nodeName === 'TH' ||
                target.nodeName === 'TABLE' || (closestTable && this.parent.contentModule.getEditPanel().contains(closestTable)))
                && !(range.startContainer.nodeType === 3 && !(range.collapsed || ismacRightClick)) &&
                currentTime - this.resizeEndTime > 100 && !(ismacRightClick && (range.collapsed && range.startOffset !== 0)) && !(ismacRightClick && range.endContainer.nodeName === '#text')) {
                var range_1 = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.save(range_1, this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                var pageX = void 0;
                var pageY = void 0;
                if (Browser.isDevice && e.args.touches) {
                    pageX = (this.parent.iframeSettings.enable) ? window.pageXOffset + this.parent.element.getBoundingClientRect().left +
                        e.args.changedTouches[0].clientX : e.args.changedTouches[0].pageX;
                    pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset + this.parent.element.getBoundingClientRect().top +
                        (!this.parent.inlineMode.enable ? this.parent.toolbarModule.getToolbarHeight() : 0)
                        + e.args.changedTouches[0].clientY : e.args.changedTouches[0].pageY;
                }
                else {
                    pageX = (this.parent.iframeSettings.enable) ? window.pageXOffset
                        + this.parent.element.getBoundingClientRect().left + args.clientX : args.pageX;
                    pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset + this.parent.element.getBoundingClientRect().top +
                        this.parent.toolbarModule.getToolbarHeight() + args.clientY : args.pageY;
                }
                this.quickToolObj.tableQTBar.showPopup(pageX, pageY, target);
                this.parent.formatter.editorManager.nodeSelection.restore();
            }
            else {
                this.hideTableQuickToolbar();
            }
        }
    };
    Table.prototype.tableCellSelect = function (e) {
        var target = e.target;
        var row = Array.prototype.slice.call(target.parentElement.parentElement.children).indexOf(target.parentElement);
        var col = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
        var list = this.dlgDiv.querySelectorAll('.e-rte-tablecell');
        Array.prototype.forEach.call(list, function (item) {
            var parentIndex = Array.prototype.slice.call(item.parentElement.parentElement.children).indexOf(item.parentElement);
            var cellIndex = Array.prototype.slice.call(item.parentElement.children).indexOf(item);
            removeClassWithAttr([item], 'e-active');
            if (parentIndex <= row && cellIndex <= col) {
                addClass([item], 'e-active');
            }
        });
        this.tblHeader.innerHTML = (col + 1) + 'x' + (row + 1);
    };
    Table.prototype.tableMouseUp = function () {
        this.unwireTableSelectionEvents();
        this.isTableMoveActive = false;
    };
    Table.prototype.tableMouseLeave = function () {
        if (!Browser.isDevice) {
            this.unwireTableSelectionEvents();
            this.isTableMoveActive = false;
            this.resetTableSelection();
        }
    };
    // eslint-disable-next-line
    Table.prototype.tableCellLeave = function (e) {
        removeClassWithAttr(this.dlgDiv.querySelectorAll('.e-rte-tablecell'), 'e-active');
        addClass([this.dlgDiv.querySelector('.e-rte-tablecell')], 'e-active');
        this.tblHeader.innerHTML = 1 + 'x' + 1;
    };
    Table.prototype.tableCellClick = function (e) {
        var target = e.target;
        var row = Array.prototype.slice.call(target.parentElement.parentElement.children).indexOf(target.parentElement) + 1;
        var col = Array.prototype.slice.call(target.parentElement.children).indexOf(target) + 1;
        this.self.tableInsert(row, col, e, this);
    };
    Table.prototype.tableInsert = function (row, col, e, selectionObj) {
        var proxy = (selectionObj.self) ? selectionObj.self : this;
        var startContainer = selectionObj.selection.range.startContainer;
        if (startContainer.nodeName === 'P' && startContainer.textContent.trim() === '' && !(startContainer.childNodes.length > 0)) {
            startContainer.innerHTML = '<br />';
        }
        var parentNode = startContainer.parentNode;
        if (proxy.parent.editorMode === 'HTML' &&
            ((proxy.parent.iframeSettings.enable && !hasClass(parentNode.ownerDocument.querySelector('body'), 'e-lib')) ||
                // eslint-disable-next-line
                (!proxy.parent.iframeSettings.enable && isNOU(closest(parentNode, '[id=' + "'" + proxy.contentModule.getPanel().id + "'" + ']'))))) {
            proxy.contentModule.getEditPanel().focus();
            var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.contentModule.getDocument());
            selectionObj.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.contentModule.getDocument());
        }
        var value = {
            rows: row, columns: col, width: {
                minWidth: proxy.parent.tableSettings.minWidth,
                maxWidth: proxy.parent.tableSettings.maxWidth,
                width: proxy.parent.tableSettings.width
            },
            selection: selectionObj.selection
        };
        if (proxy.popupObj) {
            var rows = Array.prototype.slice.call(e.target.parentElement.parentElement.children);
            for (var i = 0; i < rows.length; i++) {
                EventHandler.remove(rows[i], 'mouseleave', this.tableCellLeave);
                var cells = Array.prototype.slice.call(rows[i].children);
                for (var j = 0; j < cells.length; j++) {
                    EventHandler.remove(cells[j], 'mousemove', this.tableCellSelect);
                    EventHandler.remove(cells[j], 'mouseup', this.tableCellClick);
                }
            }
            proxy.popupObj.hide();
        }
        if (proxy.editdlgObj) {
            proxy.editdlgObj.hide();
        }
        var x = window.scrollX;
        var y = window.scrollY;
        proxy.parent.formatter.process(proxy.parent, selectionObj.args, selectionObj.args.originalEvent, value);
        proxy.contentModule.getEditPanel().focus();
        window.scrollTo(x, y);
        proxy.parent.on(events.mouseDown, proxy.cellSelect, proxy);
        var selection = proxy.parent.formatter.editorManager.nodeSelection.get(proxy.contentModule.getDocument());
        if (!isNullOrUndefined(selection) && !isNullOrUndefined(selection.anchorNode) &&
            selection.anchorNode.nodeType === Node.ELEMENT_NODE && (selection.anchorNode.tagName === 'TD'
            || selection.anchorNode.tagName === 'TH')) {
            proxy.curTable = closest(selection.anchorNode, 'table');
            proxy.activeCell = selection.anchorNode;
        }
    };
    Table.prototype.cellSelect = function (e) {
        var target = e.args.target;
        var tdNode = closest(target, 'td,th');
        target = (target.nodeName !== 'TD' && tdNode && this.parent.contentModule.getEditPanel().contains(tdNode)) ?
            tdNode : target;
        if (!isNOU(this.activeCell) && e.args.shiftKey && !isNOU(target) && !isNOU(target.tagName)
            && (target.tagName === 'TD' || target.tagName === 'TH') && this.activeCell !== target) {
            this.parent.formatter.editorManager.observer.notify('TABLE_MOVE', { event: e.args, selectNode: [this.activeCell] });
            e.args.preventDefault();
            return;
        }
        if (!(this.parent.quickToolbarSettings.showOnRightClick && e.args.which === 3 &&
            target.classList.contains(classes.CLS_TABLE_SEL))) {
            if (this.isTableMoveActive) {
                this.unwireTableSelectionEvents();
                this.isTableMoveActive = false;
            }
            this.activeCell = null;
            this.heightcheck();
            this.removeCellSelectClasses();
            this.removeTableSelection();
        }
        if (target && (target.tagName === 'TD' || target.tagName === 'TH')) {
            addClass([target], classes.CLS_TABLE_SEL);
            this.activeCell = target;
            this.curTable = (this.curTable) ? this.curTable : closest(target, 'table');
            this.wireTableSelectionEvents();
            this.isTableMoveActive = true;
            this.removeResizeElement();
            if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
                detach(this.helper);
            }
        }
    };
    Table.prototype.heightcheck = function () {
        var table = this.parent.contentModule.getEditPanel().querySelector('td.e-cell-select');
        if (table && table.querySelector('img') && table.querySelector('img').style.height.includes('%')) {
            table.style.height = 'inherit';
        }
    };
    Table.prototype.wireTableSelectionEvents = function () {
        EventHandler.add(this.curTable, 'mousemove', this.tableMove, this);
        EventHandler.add(this.curTable, 'mouseup', this.tableMouseUp, this);
        EventHandler.add(this.curTable, 'mouseleave', this.tableMouseLeave, this);
    };
    Table.prototype.unwireTableSelectionEvents = function () {
        EventHandler.remove(this.curTable, 'mousemove', this.tableMove);
        EventHandler.remove(this.curTable, 'mouseup', this.tableMouseUp);
        EventHandler.remove(this.curTable, 'mouseleave', this.tableMouseLeave);
    };
    Table.prototype.removeCellSelectClasses = function () {
        removeClassWithAttr(this.contentModule.getEditPanel().querySelectorAll('table td, table th'), classes.CLS_TABLE_SEL_END);
        removeClassWithAttr(this.contentModule.getEditPanel().querySelectorAll('table td, table th'), classes.CLS_TABLE_MULTI_CELL);
        removeClassWithAttr(this.contentModule.getEditPanel().querySelectorAll('table td, table th'), classes.CLS_TABLE_SEL);
    };
    Table.prototype.tableMove = function (event) {
        this.parent.formatter.editorManager.observer.notify('TABLE_MOVE', { event: event, selectNode: [this.activeCell] });
    };
    Table.prototype.resizeHelper = function (e) {
        if (this.parent.readonly) {
            return;
        }
        if (this.isTableMoveActive) {
            return;
        }
        if (e && e.buttons && e.buttons > 0) {
            return;
        }
        var target = e.target || e.targetTouches[0].target;
        var closestTable = closest(target, 'table.e-rte-table, table.e-rte-paste-table, table.e-rte-custom-table');
        var isResizing = this.parent.contentModule.getEditPanel().querySelectorAll('.e-table-box.e-rbox-select, .e-table-rhelper.e-column-helper, .e-table-rhelper.e-row-helper').length > 0;
        if (!isResizing && !isNOU(this.curTable) && !isNOU(closestTable) && closestTable !== this.curTable &&
            this.parent.contentModule.getEditPanel().contains(closestTable)) {
            this.removeResizeElement();
            this.removeHelper(e);
            this.cancelResizeAction();
        }
        if (!isResizing && (target.nodeName === 'TABLE' || target.nodeName === 'TD' || target.nodeName === 'TH')) {
            this.curTable = (closestTable && this.parent.contentModule.getEditPanel().contains(closestTable))
                && (target.nodeName === 'TD' || target.nodeName === 'TH') ?
                closestTable : target;
            this.removeResizeElement();
            this.tableResizeEleCreation(this.curTable, e);
        }
    };
    Table.prototype.tableResizeEleCreation = function (table, e) {
        this.parent.preventDefaultResize(e);
        var columns = this.calMaxCol(this.curTable);
        var rows = [];
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                if (!table.rows[i].cells[j].hasAttribute('rowspan')) {
                    rows.push(Array.prototype.slice.call(table.rows[i].cells, 0, table.rows[i].cells.length)[j]);
                    break;
                }
            }
        }
        var height = parseInt(getComputedStyle(table).height, 10);
        var width = parseInt(getComputedStyle(table).width, 10);
        var pos = this.calcPos(table);
        for (var i = 0; columns.length >= i; i++) {
            var colReEle = this.parent.createElement('span', {
                attrs: {
                    'data-col': (i).toString(), 'unselectable': 'on', 'contenteditable': 'false'
                }
            });
            colReEle.classList.add(classes.CLS_RTE_TABLE_RESIZE, classes.CLS_TB_COL_RES);
            if (columns.length === i) {
                colReEle.style.cssText = 'height: ' + height + 'px; width: 4px; top: ' + pos.top +
                    'px; left:' + ((columns[i - 1].classList.contains('e-multi-cells-select') ? 0 : pos.left) + this.calcPos(columns[i - 1]).left + columns[i - 1].offsetWidth - 2) + 'px;';
            }
            else {
                colReEle.style.cssText = 'height: ' + height + 'px; width: 4px; top: ' + pos.top +
                    'px; left:' + ((columns[i].classList.contains('e-multi-cells-select') ? 0 : pos.left) + this.calcPos(columns[i]).left - 2) + 'px;';
            }
            this.contentModule.getEditPanel().appendChild(colReEle);
        }
        for (var i = 0; rows.length > i; i++) {
            var rowReEle = this.parent.createElement('span', {
                attrs: {
                    'data-row': (i).toString(), 'unselectable': 'on', 'contenteditable': 'false'
                }
            });
            rowReEle.classList.add(classes.CLS_RTE_TABLE_RESIZE, classes.CLS_TB_ROW_RES);
            var rowPosLeft = !isNOU(table.getAttribute('cellspacing')) || table.getAttribute('cellspacing') !== '' ?
                0 : this.calcPos(rows[i]).left;
            rowReEle.style.cssText = 'width: ' + width + 'px; height: 4px; top: ' +
                (this.calcPos(rows[i]).top + (rows[i].classList.contains('e-multi-cells-select') ? 0 : pos.top) + rows[i].offsetHeight - 2) +
                'px; left:' + (rowPosLeft + pos.left) + 'px;';
            this.contentModule.getEditPanel().appendChild(rowReEle);
        }
        var tableReBox = this.parent.createElement('span', {
            className: classes.CLS_TB_BOX_RES + this.parent.getCssClass(true), attrs: {
                'data-col': columns.length.toString(), 'unselectable': 'on', 'contenteditable': 'false'
            }
        });
        tableReBox.style.cssText = 'top: ' + (pos.top + height - 4) +
            'px; left:' + (pos.left + width - 4) + 'px;';
        if (Browser.isDevice) {
            tableReBox.classList.add('e-rmob');
        }
        this.contentModule.getEditPanel().appendChild(tableReBox);
    };
    Table.prototype.removeResizeElement = function () {
        var item = this.parent.contentModule.getEditPanel().
            querySelectorAll('.e-column-resize, .e-row-resize, .e-table-box');
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                detach(item[i]);
            }
        }
    };
    Table.prototype.calcPos = function (elem) {
        var parentOffset = {
            top: 0,
            left: 0
        };
        var offset = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var offsetParent = elem.offsetParent || doc.documentElement;
        var isNestedTable = false;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            offsetParent.style.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent.nodeName === 'TD' && elem.nodeName === 'TABLE') {
            offsetParent = closest(offsetParent, '.e-rte-content');
            isNestedTable = true;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
        }
        if (isNestedTable) {
            isNestedTable = false;
            var topValue = this.parent.inputElement && this.parent.inputElement.scrollTop > 0 ?
                (this.parent.inputElement.scrollTop + offset.top) - parentOffset.top : offset.top - parentOffset.top;
            var leftValue = this.parent.inputElement && this.parent.inputElement.scrollLeft > 0 ?
                (this.parent.inputElement.scrollLeft + offset.left) - parentOffset.left : offset.left - parentOffset.left;
            return {
                top: topValue,
                left: leftValue
            };
        }
        else {
            return {
                top: elem.offsetTop,
                left: elem.offsetLeft
            };
        }
    };
    Table.prototype.getPointX = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageX;
        }
        else {
            return e.pageX;
        }
    };
    Table.prototype.getPointY = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageY;
        }
        else {
            return e.pageY;
        }
    };
    Table.prototype.resizeStart = function (e) {
        var _this = this;
        if (this.parent.readonly) {
            return;
        }
        if (Browser.isDevice) {
            this.resizeHelper(e);
        }
        var target = e.target;
        if (target.classList.contains(classes.CLS_TB_COL_RES) ||
            target.classList.contains(classes.CLS_TB_ROW_RES) ||
            target.classList.contains(classes.CLS_TB_BOX_RES)) {
            this.resetResizeHelper(this.curTable);
            e.preventDefault();
            this.parent.preventDefaultResize(e);
            removeClassWithAttr(this.curTable.querySelectorAll('td,th'), classes.CLS_TABLE_SEL);
            this.removeTableSelection();
            this.pageX = this.getPointX(e);
            this.pageY = this.getPointY(e);
            this.resizeBtnInit();
            this.hideTableQuickToolbar();
            if (target.classList.contains(classes.CLS_TB_COL_RES)) {
                this.resizeBtnStat.column = true;
                if (parseInt(target.getAttribute('data-col'), 10) === this.calMaxCol(this.curTable).length) {
                    this.currentColumnResize = 'last';
                    this.colIndex = parseInt(target.getAttribute('data-col'), 10) - 1;
                    this.columnEle = this.calMaxCol(this.curTable)[this.colIndex];
                }
                else {
                    if (parseInt(target.getAttribute('data-col'), 10) === 0) {
                        this.currentColumnResize = 'first';
                    }
                    else {
                        this.currentColumnResize = 'middle';
                        var cellColl = this.curTable.rows[0].cells;
                        var cellCount = 0;
                        for (var cell = 0; cell < cellColl.length; cell++) {
                            cellCount = cellCount + cellColl[cell].colSpan;
                        }
                        var sizes = new Array(cellCount);
                        var colGroupEle = createElement('colgroup');
                        var rowSpanCells = new Map();
                        for (var i = 0; i < this.curTable.rows.length; i++) {
                            var currentColIndex = 0;
                            for (var k = 0; k < this.curTable.rows[i].cells.length; k++) {
                                for (var l = 1; l < this.curTable.rows[i].cells[k].rowSpan; l++) {
                                    var key = "" + (i + l) + currentColIndex;
                                    rowSpanCells.set(key, this.curTable.rows[i].cells[k]);
                                }
                                var cellIndex = this.getCellIndex(rowSpanCells, i, k);
                                if (cellIndex > currentColIndex) {
                                    currentColIndex = cellIndex;
                                }
                                var width = this.curTable.rows[i].cells[k].offsetWidth;
                                if (!sizes[currentColIndex] || width < sizes[currentColIndex]) {
                                    sizes[currentColIndex] = width;
                                }
                                currentColIndex += 1 + this.curTable.rows[i].cells[k].colSpan - 1;
                            }
                        }
                        for (var size = 0; size < sizes.length; size++) {
                            var cell = createElement('col');
                            cell.appendChild(createElement('br'));
                            cell.style.width = this.convertPixelToPercentage(sizes[size], parseInt(getComputedStyle(this.curTable).width, 10)) + '%';
                            colGroupEle.appendChild(cell);
                        }
                        this.curTable.insertBefore(colGroupEle, this.curTable.firstChild);
                        for (var i = 0; i < this.curTable.rows.length; i++) {
                            for (var k = 0; k < this.curTable.rows[i].cells.length; k++) {
                                this.curTable.rows[i].cells[k].style.width = '';
                            }
                        }
                    }
                    this.colIndex = parseInt(target.getAttribute('data-col'), 10);
                    this.columnEle = this.calMaxCol(this.curTable)[this.colIndex];
                }
                this.moveEle = e.target;
                this.appendHelper();
            }
            if (target.classList.contains(classes.CLS_TB_ROW_RES)) {
                this.rowEle = this.curTable.rows[parseInt(target.getAttribute('data-row'), 10)];
                this.resizeBtnStat.row = true;
                this.appendHelper();
            }
            if (target.classList.contains(classes.CLS_TB_BOX_RES)) {
                this.resizeBtnStat.tableBox = true;
            }
            if (Browser.isDevice && this.helper && !this.helper.classList.contains('e-reicon')) {
                this.helper.classList.add('e-reicon');
                EventHandler.add(document, Browser.touchStartEvent, this.removeHelper, this);
                EventHandler.add(this.helper, Browser.touchStartEvent, this.resizeStart, this);
            }
            else {
                var args = { event: e, requestType: 'Table' };
                this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
                    if (resizeStartArgs.cancel) {
                        _this.cancelResizeAction();
                    }
                });
            }
            if (this.isResizeBind) {
                EventHandler.add(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing, this);
                EventHandler.add(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd, this);
                this.isResizeBind = false;
            }
        }
    };
    Table.prototype.getCellIndex = function (rowSpanCells, rowIndex, colIndex) {
        var cellKey = "" + rowIndex + colIndex;
        var spannedCell = rowSpanCells.get(cellKey);
        if (spannedCell) {
            return this.getCellIndex(rowSpanCells, rowIndex, colIndex + spannedCell.colSpan);
        }
        else {
            return colIndex;
        }
    };
    Table.prototype.removeHelper = function (e) {
        var cls = e.target.classList;
        if (!(cls.contains('e-reicon')) && this.helper) {
            EventHandler.remove(document, Browser.touchStartEvent, this.removeHelper);
            EventHandler.remove(this.helper, Browser.touchStartEvent, this.resizeStart);
            if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
                detach(this.helper);
            }
            this.pageX = null;
            this.helper = null;
        }
    };
    Table.prototype.appendHelper = function () {
        this.helper = this.parent.createElement('div', {
            className: 'e-table-rhelper' + this.parent.getCssClass(true)
        });
        if (Browser.isDevice) {
            this.helper.classList.add('e-reicon');
        }
        this.contentModule.getEditPanel().appendChild(this.helper);
        this.setHelperHeight();
    };
    Table.prototype.setHelperHeight = function () {
        var pos = this.calcPos(this.curTable);
        if (this.resizeBtnStat.column) {
            this.helper.classList.add('e-column-helper');
            this.helper.style.cssText = 'height: ' + getComputedStyle(this.curTable).height + '; top: ' +
                pos.top + 'px; left:' + ((pos.left + this.calcPos(this.columnEle).left) +
                (this.currentColumnResize === 'last' ? this.columnEle.offsetWidth : 0) - 1) + 'px;';
        }
        else {
            this.helper.classList.add('e-row-helper');
            this.helper.style.cssText = 'width: ' + getComputedStyle(this.curTable).width + '; top: ' +
                (this.calcPos(this.rowEle).top + pos.top + this.rowEle.offsetHeight - 1) +
                'px; left:' + (this.calcPos(this.rowEle).left + pos.left) + 'px;';
        }
    };
    Table.prototype.updateHelper = function () {
        var pos = this.calcPos(this.curTable);
        if (this.resizeBtnStat.column) {
            var left = (pos.left + this.calcPos(this.columnEle).left) +
                (this.currentColumnResize === 'last' ? this.columnEle.offsetWidth : 0) - 1;
            this.helper.style.left = left + 'px';
            this.helper.style.height = this.curTable.offsetHeight + 'px';
        }
        else {
            var top_1 = this.calcPos(this.rowEle).top + pos.top + this.rowEle.offsetHeight - 1;
            this.helper.style.top = top_1 + 'px';
        }
    };
    Table.prototype.calMaxCol = function (curTable) {
        var cellColl = curTable.rows[0].cells;
        var cellCount = 0;
        for (var cell = 0; cell < cellColl.length; cell++) {
            cellCount = cellCount + cellColl[cell].colSpan;
        }
        var cells = new Array(cellCount);
        var rowSpanCells = new Map();
        for (var i = 0; i < curTable.rows.length; i++) {
            var currentColIndex = 0;
            for (var k = 0; k < curTable.rows[i].cells.length; k++) {
                for (var l = 1; l < curTable.rows[i].cells[k].rowSpan; l++) {
                    var key = "" + (i + l) + currentColIndex;
                    rowSpanCells.set(key, curTable.rows[i].cells[k]);
                }
                var cellIndex = this.getCellIndex(rowSpanCells, i, k);
                if (cellIndex > currentColIndex) {
                    currentColIndex = cellIndex;
                }
                var width = curTable.rows[i].cells[k].offsetWidth;
                if (!cells[currentColIndex] || width < cells[currentColIndex].offsetWidth) {
                    cells[currentColIndex] = curTable.rows[i].cells[k];
                }
                currentColIndex += 1 + curTable.rows[i].cells[k].colSpan - 1;
            }
        }
        return cells;
    };
    Table.prototype.resizing = function (e) {
        var _this = this;
        var pageX = this.getPointX(e);
        var pageY = this.getPointY(e);
        var mouseX = (this.parent.enableRtl) ? -(pageX - this.pageX) : (pageX - this.pageX);
        var mouseY = (this.parent.enableRtl) ? -(pageY - this.pageY) : (pageY - this.pageY);
        this.pageX = pageX;
        this.pageY = pageY;
        var maxiumWidth;
        var currentTdElement = this.curTable.closest('td');
        var args = { event: e, requestType: 'table' };
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (resizingArgs.cancel) {
                _this.cancelResizeAction();
            }
            else {
                var tableReBox = _this.contentModule.getEditPanel().querySelector('.e-table-box');
                var tableWidth = parseInt(getComputedStyle(_this.curTable).width, 10);
                var tableHeight = !isNaN(parseInt(_this.curTable.style.height, 10)) ?
                    parseInt(_this.curTable.style.height, 10) : parseInt(getComputedStyle(_this.curTable).height, 10);
                var paddingSize = +getComputedStyle(_this.contentModule.getEditPanel()).paddingRight.match(/\d/g).join('');
                var rteWidth = _this.contentModule.getEditPanel().offsetWidth -
                    (_this.contentModule.getEditPanel().offsetWidth -
                        _this.contentModule.getEditPanel().clientWidth) - paddingSize * 2;
                var widthCompare = void 0;
                if (!isNOU(_this.curTable.parentElement.closest('table')) && !isNOU(_this.curTable.closest('td')) &&
                    _this.contentModule.getEditPanel().contains(_this.curTable.closest('td'))) {
                    var currentTd = _this.curTable.closest('td');
                    var currentTDPad = +getComputedStyle(currentTd).paddingRight.match(/\d/g).join('');
                    // Padding of the current table with the parent element multiply with 2.
                    widthCompare = currentTd.offsetWidth - (currentTd.offsetWidth - currentTd.clientWidth) - currentTDPad * 2;
                }
                else {
                    widthCompare = rteWidth;
                }
                if (_this.resizeBtnStat.column) {
                    if (_this.curTable.closest('li')) {
                        widthCompare = _this.curTable.closest('li').offsetWidth;
                    }
                    var colGroup = _this.curTable.querySelectorAll('colgroup > col');
                    var currentTableWidth = void 0;
                    if (_this.curTable.style.width !== '' && _this.curTable.style.width.includes('%')) {
                        currentTableWidth = parseFloat(_this.curTable.style.width.split('%')[0]);
                    }
                    else {
                        currentTableWidth = _this.getCurrentTableWidth(_this.curTable.offsetWidth, _this.parent.inputElement.offsetWidth);
                    }
                    var currentCol = _this.calMaxCol(_this.curTable)[_this.colIndex];
                    var currentColResizableWidth = _this.getCurrentColWidth(currentCol, tableWidth);
                    if (_this.currentColumnResize === 'first') {
                        mouseX = mouseX - 0.75; //This was done for to make the gripper and the table first/last column will be close.
                        _this.removeResizeElement();
                        if (currentTdElement) {
                            maxiumWidth = _this.curTable.getBoundingClientRect().right - _this.calcPos(currentTdElement).left;
                            _this.curTable.style.maxWidth = maxiumWidth + 'px';
                        }
                        // Below the value '100' is the 100% width of the parent element.
                        if (((mouseX !== 0 && 5 < currentColResizableWidth) || mouseX < 0) && currentTableWidth <= 100 &&
                            _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) <= 100) {
                            var firstColumnsCell = _this.findFirstLastColCells(_this.curTable, true);
                            _this.curTable.style.width = _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) > 100 ? (100 + '%') :
                                (_this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) + '%');
                            var differenceWidth = currentTableWidth - _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare);
                            var preMarginLeft = 0;
                            var widthType = _this.curTable.style.width.indexOf('%') > -1;
                            if (!widthType && _this.curTable.offsetWidth > _this.contentModule.getEditPanel().offsetWidth) {
                                _this.curTable.style.width = rteWidth + 'px';
                                return;
                            }
                            if (widthType && parseFloat(_this.curTable.style.width.split('%')[0]) > 100) {
                                _this.curTable.style.width = '100%';
                                return;
                            }
                            if (!isNOU(_this.curTable.style.marginLeft) && _this.curTable.style.marginLeft !== '') {
                                var regex = /[-+]?\d*\.\d+|\d+/;
                                var value = _this.curTable.style.marginLeft.match(regex);
                                if (!isNOU(value)) {
                                    preMarginLeft = parseFloat(value[0]);
                                }
                            }
                            var currentMarginLeft = preMarginLeft + differenceWidth;
                            if (currentMarginLeft && currentMarginLeft > 100) {
                                var width = parseFloat(_this.curTable.style.width);
                                currentMarginLeft = 100 - width;
                            }
                            // For table pasted from word, Margin left can be anything so we are avoiding the below process.
                            if (!_this.curTable.classList.contains('e-rte-paste-table') && currentMarginLeft && currentMarginLeft < 1) {
                                _this.curTable.style.marginLeft = null;
                                _this.curTable.style.width = '100%';
                                return;
                            }
                            _this.curTable.style.marginLeft = 'calc(' + (_this.curTable.style.width === '100%' ? 0 : currentMarginLeft) + '%)';
                            for (var i = 0; i < firstColumnsCell.length; i++) {
                                var currentColumnCellWidth = _this.getCurrentColWidth(firstColumnsCell[i], tableWidth);
                                firstColumnsCell[i].style.width = (currentColumnCellWidth - differenceWidth) + '%';
                            }
                        }
                    }
                    else if (_this.currentColumnResize === 'last') {
                        mouseX = mouseX + 0.75; //This was done for to make the gripper and the table first/last column will be close.
                        _this.removeResizeElement();
                        if (currentTdElement) {
                            maxiumWidth = currentTdElement.getBoundingClientRect().right - _this.curTable.getBoundingClientRect().left;
                            _this.curTable.style.maxWidth = maxiumWidth + 'px';
                        }
                        // Below the value '100' is the 100% width of the parent element.
                        if (((mouseX !== 0 && 5 < currentColResizableWidth) || mouseX > 0) &&
                            currentTableWidth <= 100 && _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) <= 100) {
                            var lastColumnsCell = _this.findFirstLastColCells(_this.curTable, false);
                            _this.curTable.style.width = _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) > 100 ? (100 + '%') : (_this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) + '%');
                            var differenceWidth = currentTableWidth - _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare);
                            for (var i = 0; i < lastColumnsCell.length; i++) {
                                var currentColumnCellWidth = _this.getCurrentColWidth(lastColumnsCell[i], tableWidth);
                                lastColumnsCell[i].style.width = (currentColumnCellWidth - differenceWidth) + '%';
                            }
                        }
                    }
                    else {
                        var actualwid = colGroup[_this.colIndex].offsetWidth - mouseX;
                        // eslint-disable-next-line
                        var totalwid = colGroup[_this.colIndex].offsetWidth + colGroup[_this.colIndex - 1].offsetWidth;
                        if ((totalwid - actualwid) > 20 && actualwid > 20) {
                            var leftColumnWidth = totalwid - actualwid;
                            var rightColWidth = actualwid;
                            colGroup[_this.colIndex - 1].style.width = _this.convertPixelToPercentage(leftColumnWidth, tableWidth) + '%';
                            colGroup[_this.colIndex].style.width = _this.convertPixelToPercentage(rightColWidth, tableWidth) + '%';
                        }
                    }
                    _this.updateHelper();
                }
                else if (_this.resizeBtnStat.row) {
                    _this.parent.preventDefaultResize(e);
                    var tableTrElementPixel = [];
                    var currentTableTrElement = _this.curTable.querySelectorAll('tr');
                    for (var i = 0; i < currentTableTrElement.length; i++) {
                        if (_this.rowEle !== currentTableTrElement[i]) {
                            tableTrElementPixel[i] = (parseFloat(currentTableTrElement[i].clientHeight.toString()));
                        }
                    }
                    _this.curTable.style.height = (parseFloat(_this.curTable.clientHeight.toString()) + ((mouseY > 0) ? 0 : mouseY)) + 'px';
                    for (var i = 0; i < currentTableTrElement.length; i++) {
                        if (_this.rowEle === currentTableTrElement[i]) {
                            currentTableTrElement[i].style.height = (parseFloat(currentTableTrElement[i].clientHeight.toString()) + mouseY) + 'px';
                        }
                        else {
                            currentTableTrElement[i].style.height = tableTrElementPixel[i] + 'px';
                        }
                    }
                    if (!isNOU(tableReBox)) {
                        tableReBox.style.cssText = 'top: ' + (_this.calcPos(_this.curTable).top + tableHeight - 4) +
                            'px; left:' + (_this.calcPos(_this.curTable).left + tableWidth - 4) + 'px;';
                    }
                    _this.updateHelper();
                }
                else if (_this.resizeBtnStat.tableBox) {
                    if (currentTdElement) {
                        var tableBoxPosition = _this.curTable.getBoundingClientRect().left
                            - currentTdElement.getBoundingClientRect().left;
                        maxiumWidth = Math.abs(tableBoxPosition - currentTdElement.getBoundingClientRect().width) - 5;
                        _this.curTable.style.maxWidth = maxiumWidth + 'px';
                    }
                    _this.curTable.style.height = tableHeight + mouseY + 'px';
                    if (!isNOU(tableReBox)) {
                        tableReBox.classList.add('e-rbox-select');
                        tableReBox.style.cssText = 'top: ' + (_this.calcPos(_this.curTable).top + parseInt(getComputedStyle(_this.curTable).height, 10) - 4) +
                            'px; left:' + (_this.calcPos(_this.curTable).left + tableWidth - 4) + 'px;';
                    }
                    if (_this.curTable.closest('li')) {
                        widthCompare = _this.curTable.closest('li').offsetWidth;
                    }
                    var widthType = _this.curTable.style.width.indexOf('%') > -1;
                    if (widthType && parseFloat(_this.curTable.style.width.split('%')[0]) > 100) {
                        _this.curTable.style.width = '100%';
                        return;
                    }
                    if (!widthType && _this.curTable.offsetWidth > _this.contentModule.getEditPanel().offsetWidth) {
                        _this.curTable.style.width = rteWidth + 'px';
                        return;
                    }
                    _this.curTable.style.width = widthType ? _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) + '%'
                        : tableWidth + mouseX + 'px';
                }
            }
        });
    };
    Table.prototype.getCurrentColWidth = function (col, tableWidth) {
        var currentColWidth = 0;
        if (col.style.width !== '' && col.style.width.includes('%')) {
            currentColWidth = parseFloat(col.style.width.split('%')[0]);
        }
        else {
            currentColWidth = this.convertPixelToPercentage(col.offsetWidth, tableWidth);
        }
        return currentColWidth;
    };
    Table.prototype.getCurrentTableWidth = function (tableWidth, parentWidth) {
        var currentTableWidth = 0;
        currentTableWidth = tableWidth / parentWidth * 100;
        return currentTableWidth;
    };
    Table.prototype.findFirstLastColCells = function (table, isFirst) {
        var resultColumns = [];
        var rows = table.rows;
        var rowSpanCellIndexs = [];
        var _loop_1 = function (i) {
            var cellIndex = isFirst ? 0 : rows[i].cells.length - 1;
            var column = rows[i].cells[cellIndex];
            for (var rowSpan = 1; rowSpan < column.rowSpan; rowSpan++) {
                var key = i + rowSpan + "-" + cellIndex;
                rowSpanCellIndexs.push(key);
            }
            var spannedCellKey = i + "-" + cellIndex;
            if (rowSpanCellIndexs.length === 0 || (isFirst && rowSpanCellIndexs.indexOf(spannedCellKey) === -1) || (!isFirst && rowSpanCellIndexs.indexOf(spannedCellKey) === -1 && rowSpanCellIndexs.every(function (key) { return key.split('-')[0] !== i.toString(); }))) {
                resultColumns.push(column);
            }
        };
        for (var i = 0; i < rows.length; i++) {
            _loop_1(i);
        }
        return resultColumns;
    };
    Table.prototype.convertPixelToPercentage = function (value, offsetValue) {
        return (value / offsetValue) * 100;
    };
    Table.prototype.cancelResizeAction = function () {
        this.isResizeBind = true;
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        this.removeResizeElement();
    };
    Table.prototype.resizeEnd = function (e) {
        this.resizeBtnInit();
        this.isResizeBind = true;
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        if (this.contentModule.getEditPanel().querySelector('.e-table-box') &&
            this.contentModule.getEditPanel().contains(this.contentModule.getEditPanel().querySelector('.e-table-box'))) {
            this.removeResizeElement();
        }
        if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
            detach(this.helper);
            this.helper = null;
        }
        this.resetResizeHelper(this.curTable);
        this.pageX = null;
        this.pageY = null;
        this.moveEle = null;
        var currentTableTrElement = this.curTable.querySelectorAll('tr');
        var tableTrPercentage = [];
        for (var i = 0; i < currentTableTrElement.length; i++) {
            var percentage = (parseFloat(currentTableTrElement[i].clientHeight.toString())
                / parseFloat(this.curTable.clientHeight.toString())) * 100;
            tableTrPercentage[i] = percentage;
        }
        for (var i = 0; i < currentTableTrElement.length; i++) {
            if (currentTableTrElement[i].parentElement.nodeName === 'THEAD') {
                currentTableTrElement[i].parentElement.style.height = tableTrPercentage[i] + '%';
                currentTableTrElement[i].style.height = tableTrPercentage[i] + '%';
            }
            else {
                currentTableTrElement[i].style.height = tableTrPercentage[i] + '%';
            }
        }
        var args = { event: e, requestType: 'table' };
        this.parent.trigger(events.resizeStop, args);
        this.parent.formatter.saveData();
        this.resizeEndTime = new Date().getTime();
    };
    Table.prototype.resetResizeHelper = function (curTable) {
        var colHelper = this.parent.element.querySelectorAll('.e-table-rhelper.e-column-helper');
        Array.from(colHelper).forEach(function (element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        var rowHelper = this.parent.element.querySelectorAll('.e-table-rhelper.e-row-helper');
        Array.from(rowHelper).forEach(function (element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        if (parseInt(curTable.style.width, 10) === 0) {
            curTable.style.width = curTable.offsetWidth + 'px';
        }
        var colGroup = curTable.querySelector('colgroup');
        if (colGroup) {
            for (var i = 0; i < curTable.rows.length; i++) {
                for (var k = 0; k < curTable.rows[i].cells.length; k++) {
                    var width = this.convertPixelToPercentage(curTable.rows[i].cells[k].offsetWidth, parseInt(getComputedStyle(curTable).width, 10)) + '%';
                    curTable.rows[i].cells[k].style.width = width;
                }
            }
            curTable.removeChild(colGroup);
        }
    };
    Table.prototype.resizeBtnInit = function () {
        return this.resizeBtnStat = { column: false, row: false, tableBox: false };
    };
    Table.prototype.addRow = function (selectCell, e, tabkey) {
        var cmd;
        if (tabkey) {
            cmd = {
                item: { command: 'Table', subCommand: 'InsertRowAfter' }
            };
        }
        var value = {
            selection: selectCell,
            subCommand: (tabkey) ? cmd.item.subCommand : e.item.subCommand
        };
        this.parent.formatter.process(this.parent, (tabkey) ? cmd : e, e, value);
    };
    Table.prototype.addColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, width: this.parent.tableSettings.width, subCommand: e.item.subCommand });
    };
    Table.prototype.removeRowColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, subCommand: e.item.subCommand });
        this.hideTableQuickToolbar();
    };
    Table.prototype.removeTable = function (selection, args, delKey) {
        var cmd;
        if (delKey) {
            cmd = { item: { command: 'Table', subCommand: 'TableRemove' } };
        }
        var value = {
            selection: selection,
            subCommand: (delKey) ? cmd.item.subCommand : args.item.subCommand
        };
        this.parent.formatter.process(this.parent, (delKey) ? cmd : args, args.originalEvent, value);
        this.contentModule.getEditPanel().focus();
        if (this.parent.inputElement.innerHTML === null || this.parent.inputElement.innerHTML === '') {
            if (this.parent.enterKey === 'DIV') {
                this.contentModule.getEditPanel().innerHTML = '<div><br/></div>';
            }
            else if (this.parent.enterKey === 'BR') {
                this.contentModule.getEditPanel().innerHTML = '<br/>';
            }
            else {
                this.contentModule.getEditPanel().innerHTML = '<p><br/></p>';
            }
        }
        this.removeResizeElement();
        this.hideTableQuickToolbar();
    };
    Table.prototype.renderDlgContent = function (args) {
        var _this = this;
        var argsTarget = args.args.originalEvent.target;
        if (Browser.isDevice || this.parent.inlineMode.enable || !isNullOrUndefined(closest(argsTarget, '.e-rte-text-popup'))) {
            this.insertTableDialog(args);
            return;
        }
        if (this.popupObj) {
            this.popupObj.hide();
            return;
        }
        this.hideTableQuickToolbar();
        var header = '1X1';
        var insertbtn = this.l10n.getConstant('inserttablebtn');
        this.dlgDiv = this.parent.createElement('div', { className: 'e-rte-table-popup' + this.parent.getCssClass(true), id: this.rteID + '_table' });
        this.createTablePopupBoundFn = this.createTablePopupKeyDown.bind(this);
        this.dlgDiv.addEventListener('keydown', this.createTablePopupBoundFn);
        this.tblHeader = this.parent.createElement('div', { className: 'e-rte-popup-header' + this.parent.getCssClass(true) });
        this.tblHeader.innerHTML = header;
        this.dlgDiv.appendChild(this.tblHeader);
        var tableDiv = this.parent.createElement('div', { className: 'e-rte-table-span' + this.parent.getCssClass(true) });
        this.drawTable(tableDiv, args);
        this.dlgDiv.appendChild(tableDiv);
        this.dlgDiv.appendChild(this.parent.createElement('span', { className: 'e-span-border' + this.parent.getCssClass(true) }));
        var btnEle = this.parent.createElement('button', {
            className: 'e-insert-table-btn' + this.parent.getCssClass(true), id: this.rteID + '_insertTable',
            attrs: { type: 'button', tabindex: '0' }
        });
        if (!isNOU(this.parent.getToolbarElement().querySelector('.e-expended-nav'))) {
            this.parent.getToolbarElement().querySelector('.e-expended-nav').setAttribute('tabindex', '1');
        }
        this.dlgDiv.appendChild(btnEle);
        this.createTableButton = new Button({
            iconCss: 'e-icons e-create-table', content: insertbtn, cssClass: 'e-flat' + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.createTableButton.isStringTemplate = true;
        this.createTableButton.appendTo(btnEle);
        EventHandler.add(btnEle, 'click', this.insertTableDialog, { self: this, args: args.args, selection: args.selection });
        this.parent.getToolbar().parentElement.appendChild(this.dlgDiv);
        var target = args.args.originalEvent.target;
        target = target.classList.contains('e-toolbar-item') ? target.firstChild : target.parentElement;
        this.popupObj = new Popup(this.dlgDiv, {
            targetType: 'relative',
            relateTo: target,
            collision: { X: 'fit', Y: 'none' },
            offsetY: 8,
            viewPortElement: this.parent.element,
            position: { X: 'left', Y: 'bottom' },
            enableRtl: this.parent.enableRtl,
            zIndex: 10001,
            // eslint-disable-next-line
            close: function (event) {
                EventHandler.remove(btnEle, 'click', _this.insertTableDialog);
                _this.dlgDiv.removeEventListener('keydown', _this.createTablePopupBoundFn);
                detach(btnEle);
                if (_this.createTableButton && !_this.createTableButton.isDestroyed) {
                    _this.createTableButton.destroy();
                    _this.createTableButton.element = null;
                    _this.createTableButton = null;
                }
                _this.parent.isBlur = false;
                _this.popupObj.element.parentElement.style.zIndex = '';
                _this.popupObj.destroy();
                detach(_this.popupObj.element);
                _this.popupObj = null;
            }
        });
        addClass([this.popupObj.element], 'e-popup-open');
        this.popupObj.element.parentElement.style.zIndex = '11';
        if (!isNOU(this.parent.cssClass)) {
            addClass([this.popupObj.element], this.parent.getCssClass());
        }
        btnEle.focus();
        this.popupObj.refreshPosition(target);
    };
    Table.prototype.onIframeMouseDown = function () {
        if (this.popupObj) {
            this.popupObj.hide();
        }
        if (this.parent.inlineMode.enable && this.editdlgObj) {
            this.editdlgObj.hide();
        }
        if (!isNOU(this.parent) && !isNOU(this.parent.contentModule) && !isNOU(this.parent.contentModule.getEditPanel())) {
            this.removeResizeElement();
        }
    };
    Table.prototype.docClick = function (e) {
        var target = e.args.target;
        // eslint-disable-next-line
        if (target && target.classList && ((this.popupObj && !closest(target, '[id=' + "'" + this.popupObj.element.id + "'" + ']') ||
            (this.editdlgObj && !closest(target, '#' + this.editdlgObj.element.id)))) && !target.classList.contains('e-create-table') &&
            target.offsetParent && !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown')) {
            if (this.popupObj) {
                this.popupObj.hide();
            }
            if (this.editdlgObj) {
                this.parent.notify(events.documentClickClosedBy, { closedBy: 'outside click' });
                this.editdlgObj.hide();
            }
            this.parent.isBlur = true;
            dispatchEvent(this.parent.element, 'focusout');
        }
        var closestEle = closest(target, 'td');
        var isExist = closestEle && this.parent.contentModule.getEditPanel().contains(closestEle) ? true : false;
        if (target && target.tagName !== 'TD' && target.tagName !== 'TH' && !isExist &&
            closest(target, '.e-rte-quick-popup') === null && target.offsetParent &&
            !target.offsetParent.classList.contains('e-quick-dropdown') &&
            !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown') && !closest(target, '.e-rte-dropdown-popup')
            && !closest(target, '.e-rte-elements')) {
            var isToolbarClick = target && target.closest('.e-toolbar') ? true : false;
            if (!isToolbarClick) {
                this.removeCellSelectClasses();
            }
            this.removeTableSelection();
            if (!Browser.isIE) {
                this.hideTableQuickToolbar();
            }
        }
        if (target && target.classList && !target.classList.contains(classes.CLS_TB_COL_RES) &&
            !target.classList.contains(classes.CLS_TB_ROW_RES) && !target.classList.contains(classes.CLS_TB_BOX_RES)) {
            this.removeResizeElement();
        }
    };
    Table.prototype.drawTable = function (tableDiv, args) {
        var rowDiv;
        var tableCell;
        for (var row = 0; row < 3; row++) {
            rowDiv = this.parent.createElement('div', { className: 'e-rte-table-row' + this.parent.getCssClass(true), attrs: { 'data-column': '' + row } });
            EventHandler.add(rowDiv, 'mouseleave', this.tableCellLeave, this);
            for (var col = 0; col < 10; col++) {
                tableCell = this.parent.createElement('div', { className: 'e-rte-tablecell e-default' + this.parent.getCssClass(true), attrs: { 'data-cell': '' + col } });
                rowDiv.appendChild(tableCell);
                tableCell.style.display = 'inline-block';
                if (col === 0 && row === 0) {
                    addClass([tableCell], 'e-active');
                }
                EventHandler.add(tableCell, 'mousemove', this.tableCellSelect, this);
                EventHandler.add(tableCell, 'mouseup', this.tableCellClick, { self: this, args: args.args, selection: args.selection });
            }
            tableDiv.appendChild(rowDiv);
        }
    };
    Table.prototype.editTable = function (args) {
        var _this = this;
        this.createDialog(args);
        var editContent = this.tableDlgContent(args);
        var update = this.l10n.getConstant('dialogUpdate');
        var cancel = this.l10n.getConstant('dialogCancel');
        var editHeader = this.l10n.getConstant('tableEditHeader');
        this.editdlgObj.setProperties({
            height: 'initial', width: '290px', content: editContent, header: editHeader,
            buttons: [{
                    click: this.applyProperties.bind(this, args),
                    buttonModel: { content: update, cssClass: 'e-flat e-size-update' + this.parent.getCssClass(true), isPrimary: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + this.parent.getCssClass(true), content: cancel }
                }],
            cssClass: this.editdlgObj.cssClass + ' e-rte-edit-table-prop-dialog'
        });
        this.editdlgObj.element.style.maxHeight = 'none';
        this.editdlgObj.content.querySelector('input').focus();
        this.hideTableQuickToolbar();
    };
    Table.prototype.insertTableDialog = function (args) {
        var proxy = (this.self) ? this.self : this;
        if (proxy.popupObj) {
            proxy.popupObj.hide();
        }
        proxy.createDialog(args);
        var dlgContent = proxy.tableCellDlgContent();
        var insert = proxy.l10n.getConstant('dialogInsert');
        var cancel = proxy.l10n.getConstant('dialogCancel');
        if (isNullOrUndefined(proxy.editdlgObj)) {
            return;
        }
        proxy.editdlgObj.setProperties({
            height: 'initial', width: '290px', content: dlgContent,
            buttons: [{
                    click: proxy.customTable.bind(this, args),
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + ' ' + proxy.parent.cssClass, isPrimary: true }
                },
                {
                    click: function (e) {
                        proxy.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + ' ' + proxy.parent.cssClass, content: cancel }
                }]
        });
        if (!isNOU(proxy.parent.cssClass)) {
            proxy.editdlgObj.setProperties({ cssClass: proxy.parent.cssClass });
        }
        proxy.editdlgObj.element.style.maxHeight = 'none';
        proxy.editdlgObj.content.querySelector('input').focus();
    };
    Table.prototype.tableCellDlgContent = function () {
        var tableColumn = this.l10n.getConstant('columns');
        var tableRow = this.l10n.getConstant('rows');
        var tableWrap = this.parent.createElement('div', { className: 'e-cell-wrap' + this.parent.getCssClass(true) });
        var content = '<div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" '
            + ' data-role ="none" id="tableColumn" class="e-table-column' + this.parent.getCssClass(true) + '"/></div>'
            + '<div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" data-role ="none" id="tableRow" class="e-table-row' + this.parent.getCssClass(true) + '" /></div>';
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        this.columnTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableColumn,
            floatLabelType: 'Auto',
            max: 50,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass()
        });
        this.columnTextBox.isStringTemplate = true;
        this.columnTextBox.appendTo(tableWrap.querySelector('#tableColumn'));
        this.rowTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableRow,
            floatLabelType: 'Auto',
            max: 1000,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.getCssClass()
        });
        this.rowTextBox.isStringTemplate = true;
        this.rowTextBox.appendTo(tableWrap.querySelector('#tableRow'));
        return tableWrap;
    };
    Table.prototype.clearDialogObj = function () {
        if (this.editdlgObj) {
            this.editdlgObj.destroy();
            detach(this.editdlgObj.element);
            this.editdlgObj = null;
        }
    };
    // eslint-disable-next-line
    Table.prototype.createDialog = function (args) {
        var _this = this;
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
            return;
        }
        var tableDialog = this.parent.createElement('div', {
            className: 'e-rte-edit-table' + this.parent.getCssClass(true), id: this.rteID + '_tabledialog'
        });
        this.parent.rootContainer.appendChild(tableDialog);
        var insert = this.l10n.getConstant('dialogInsert');
        var cancel = this.l10n.getConstant('dialogCancel');
        var header = this.l10n.getConstant('tabledialogHeader');
        var dialogModel = {
            header: header,
            cssClass: classes.CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px', height: 'initial',
            position: { X: 'center', Y: (Browser.isDevice) ? 'center' : 'top' },
            isModal: Browser.isDevice,
            buttons: [{
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + this.parent.getCssClass(true), isPrimary: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + this.parent.getCssClass(true), content: cancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                _this.parent.isBlur = false;
                _this.editdlgObj.destroy();
                detach(_this.editdlgObj.element);
                _this.dialogRenderObj.close(event);
                _this.editdlgObj = null;
            }
        };
        this.editdlgObj = this.dialogRenderObj.render(dialogModel);
        this.editdlgObj.appendTo(tableDialog);
        if (this.quickToolObj && this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
            this.quickToolObj.inlineQTBar.hidePopup();
        }
        if (this.quickToolObj && this.quickToolObj.textQTBar &&
            this.parent.element.ownerDocument.body.contains(this.quickToolObj.textQTBar.element)) {
            this.quickToolObj.textQTBar.hidePopup();
        }
    };
    Table.prototype.customTable = function (args, e) {
        var proxy = (this.self) ? this.self : this;
        if (proxy && proxy.rowTextBox && proxy.rowTextBox.value && proxy.columnTextBox && proxy.columnTextBox.value) {
            var argument = ((Browser.isDevice || (!isNullOrUndefined(args.args)
                && !isNullOrUndefined(args.args.originalEvent) &&
                args.args.originalEvent.action === 'insert-table')
                || proxy.parent.inlineMode.enable ||
                ((!isNullOrUndefined(proxy.parent.quickToolbarSettings.text)) && !(args instanceof PointerEvent))) ? args :
                this);
            proxy.tableInsert(proxy.rowTextBox.value, proxy.columnTextBox.value, e, argument);
        }
    };
    // eslint-disable-next-line
    Table.prototype.cancelDialog = function (e) {
        this.parent.isBlur = false;
        this.editdlgObj.hide({ returnValue: true });
    };
    // eslint-disable-next-line
    Table.prototype.applyProperties = function (args, e) {
        var dialogEle = this.editdlgObj.element;
        if (dialogEle && args && args.selectNode.length > 0 && args.selectNode[0]) {
            var selectedElement = (args.selectNode[0] && args.selectNode[0].nodeType === 3 ?
                args.selectNode[0].parentNode : args.selectNode[0]);
            var table = selectedElement ? closest(selectedElement, 'table') : null;
            if (table) {
                table.style.width = dialogEle.querySelector('.e-table-width') ? dialogEle.querySelector('.e-table-width').value + 'px'
                    : table.style.width;
                if (dialogEle.querySelector('.e-cell-padding') && dialogEle.querySelector('.e-cell-padding').value !== '') {
                    var tdElm = table.querySelectorAll('td');
                    for (var i = 0; i < tdElm.length; i++) {
                        var padVal = '';
                        if (tdElm[i].style.padding === '') {
                            padVal = tdElm[i].getAttribute('style') + ' padding:' +
                                dialogEle.querySelector('.e-cell-padding').value + 'px;';
                        }
                        else {
                            tdElm[i].style.padding = dialogEle.querySelector('.e-cell-padding').value + 'px';
                            padVal = tdElm[i].getAttribute('style');
                        }
                        tdElm[i].style.cssText = padVal;
                    }
                }
                table.cellSpacing = dialogEle.querySelector('.e-cell-spacing') ? dialogEle.querySelector('.e-cell-spacing').value
                    : table.cellSpacing;
                if (!isNOU(table.cellSpacing) && table.cellSpacing !== '0') {
                    addClass([table], classes.CLS_TABLE_BORDER);
                }
                else {
                    removeClassWithAttr([table], classes.CLS_TABLE_BORDER);
                }
                this.parent.formatter.saveData();
                this.editdlgObj.hide({ returnValue: true });
            }
        }
    };
    Table.prototype.tableDlgContent = function (e) {
        var selectNode = e.selectParent[0];
        var tableWidth = this.l10n.getConstant('tableWidth');
        var cellPadding = this.l10n.getConstant('cellpadding');
        var cellSpacing = this.l10n.getConstant('cellspacing');
        var tableWrap = this.parent.createElement('div', { className: 'e-table-sizewrap' + this.parent.getCssClass(true) });
        var widthVal = closest(selectNode, 'table').getClientRects()[0].width;
        var padVal = closest(selectNode, 'td').style.padding;
        var brdSpcVal = closest(selectNode, 'table').getAttribute('cellspacing');
        var content = '<div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" data-role ="none" id="tableWidth" class="e-table-width' + this.parent.getCssClass(true) + '" '
            + ' /></div>' + '<div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" data-role ="none" id="cellPadding" class="e-cell-padding' + this.parent.getCssClass(true) + '" />'
            + ' </div><div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" data-role ="none" id="cellSpacing" class="e-cell-spacing' + this.parent.getCssClass(true) + '" /></div>';
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        this.tableWidthNum = new NumericTextBox({
            format: 'n0',
            min: 0,
            value: widthVal,
            placeholder: tableWidth,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableWidthNum.isStringTemplate = true;
        this.tableWidthNum.appendTo(tableWrap.querySelector('#tableWidth'));
        this.tableCellPadding = new NumericTextBox({
            format: 'n0',
            min: 0,
            // eslint-disable-next-line
            value: padVal !== '' ? parseInt(padVal, null) : 0,
            placeholder: cellPadding,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableCellPadding.isStringTemplate = true;
        this.tableCellPadding.appendTo(tableWrap.querySelector('#cellPadding'));
        this.tableCellSpacing = new NumericTextBox({
            format: 'n0',
            min: 0,
            // eslint-disable-next-line
            value: brdSpcVal !== '' && !isNOU(brdSpcVal) ? parseInt(brdSpcVal, null) : 0,
            placeholder: cellSpacing,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableCellSpacing.isStringTemplate = true;
        this.tableCellSpacing.appendTo(tableWrap.querySelector('#cellSpacing'));
        return tableWrap;
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Table.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.resizeIconPositionTime) {
            clearTimeout(this.resizeIconPositionTime);
            this.resizeIconPositionTime = null;
        }
        this.removeEventListener();
        EventHandler.remove(this.parent.contentModule.getDocument(), 'selectionchange', this.tableCellsKeyboardSelection);
        if (this.curTable) {
            EventHandler.remove(this.curTable, 'mouseleave', this.tableMouseLeave);
        }
        if (this.tableCellSpacing && !this.tableCellSpacing.isDestroyed) {
            this.tableCellSpacing.destroy();
            this.tableCellSpacing = null;
        }
        if (this.tableCellPadding && !this.tableCellPadding.isDestroyed) {
            this.tableCellPadding.destroy();
            this.tableCellPadding = null;
        }
        if (this.tableWidthNum && !this.tableWidthNum.isDestroyed) {
            this.tableWidthNum.destroy();
            this.tableWidthNum = null;
        }
        if (this.rowTextBox && !this.rowTextBox.isDestroyed) {
            this.rowTextBox.destroy();
            this.rowTextBox = null;
        }
        if (this.columnTextBox && !this.columnTextBox.isDestroyed) {
            this.columnTextBox.destroy();
            this.columnTextBox = null;
        }
        if (this.createTableButton && !this.createTableButton.isDestroyed) {
            this.createTableButton.destroy();
            this.createTableButton = null;
        }
        this.createTablePopupBoundFn = null;
        this.isDestroyed = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    Table.prototype.getModuleName = function () {
        return 'table';
    };
    Table.prototype.afterKeyDown = function () {
        var _this = this;
        if (this.curTable) {
            this.resizeIconPositionTime = setTimeout(function () {
                _this.updateResizeIconPosition();
            }, 1);
        }
    };
    Table.prototype.updateResizeIconPosition = function () {
        var tableReBox = this.parent.contentModule.getEditPanel().querySelector('.e-table-box');
        if (!isNOU(tableReBox)) {
            var tablePosition = this.calcPos(this.curTable);
            tableReBox.style.cssText = 'top: ' + (tablePosition.top + parseInt(getComputedStyle(this.curTable).height, 10) - 4) +
                'px; left:' + (tablePosition.left + parseInt(getComputedStyle(this.curTable).width, 10) - 4) + 'px;';
        }
    };
    Table.prototype.createTablePopupKeyDown = function (e) {
        if (e.key === 'Escape') {
            var popupRootElem = e.target.closest('.e-rte-table-popup');
            var popup = getComponent(popupRootElem, 'popup');
            var tableToolbarButton = popup.relateTo;
            popup.hide();
            tableToolbarButton.focus({ preventScroll: true });
        }
    };
    return Table;
}());
export { Table };
