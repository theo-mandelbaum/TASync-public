import { Tab } from '@syncfusion/ej2-navigations';
import { refreshSheetTabs, locale, insertSheetTab, cMenuBeforeOpen, dialog, hideSheet, removeDesignChart, goToSheet, showSheet } from '../common/index';
import { sheetNameUpdate, clearUndoRedoCollection, completeAction, showAggregate, focus, getUpdateUsingRaf } from '../common/index';
import { sheetTabs, renameSheetTab, removeSheetTab, activeSheetChanged, focusRenameInput } from '../common/index';
import { protectSheet, editOperation } from '../common/index';
import { getSheetName, aggregateComputation } from '../../workbook/index';
import { isSingleCell, getRangeIndexes, getSheet, getSheetIndex, beginAction } from '../../workbook/index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { isCollide, calculatePosition } from '@syncfusion/ej2-popups';
import { rippleEffect, closest, EventHandler, remove, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { sheetsDestroyed, activeCellChanged, workbookFormulaOperation, checkIsFormula, sheetRenameUpdate } from '../../workbook/common/index';
import { insertModel, refreshInsertDelete } from './../../workbook/common/index';
/**
 * Represents SheetTabs for Spreadsheet.
 */
var SheetTabs = /** @class */ (function () {
    function SheetTabs(parent) {
        this.aggregateContent = '';
        this.selaggregateCnt = 'Sum';
        this.parent = parent;
        this.addEventListener();
    }
    SheetTabs.prototype.getModuleName = function () {
        return 'sheetTabs';
    };
    SheetTabs.prototype.createSheetTabs = function () {
        var _this = this;
        if (!this.parent.showSheetTabs && this.tabInstance) {
            this.destroy();
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var panel = this.parent.createElement('div', {
            className: 'e-sheet-tab-panel', id: this.parent.element.id + '_sheet_tab_panel'
        });
        var addBtn = this.parent.createElement('button', {
            className: 'e-add-sheet-tab e-btn e-css e-flat e-icon-btn' + (this.parent.allowInsert ? '' : ' e-disabled'),
            attrs: { 'title': l10n.getConstant('AddSheet'), 'type': 'button' }
        });
        addBtn.appendChild(this.parent.createElement('span', { className: 'e-btn-icon e-icons e-add-icon' }));
        addBtn.addEventListener('click', this.addSheetTab.bind(this));
        addBtn.disabled = !this.parent.allowInsert;
        panel.appendChild(addBtn);
        this.addBtnRipple = rippleEffect(panel, { selector: '.e-add-sheet-tab' });
        var ddb = this.parent.createElement('button', { attrs: { 'title': l10n.getConstant('ListAllSheets'), 'type': 'button' } });
        panel.appendChild(ddb);
        this.parent.element.appendChild(panel);
        var items = this.getSheetTabItems();
        this.dropDownInstance = new DropDownButton({
            iconCss: 'e-icons',
            items: items.ddbItems,
            createPopupOnClick: true,
            beforeItemRender: function (args) {
                var sheet = _this.parent.sheets[_this.dropDownInstance.items.indexOf(args.item)];
                if (sheet.state === 'Hidden') {
                    args.element.classList.add('e-hide');
                }
                else if (sheet.state === 'VeryHidden') {
                    args.element.style.display = 'none';
                }
            },
            select: function (args) { return _this.updateSheetTab({ idx: _this.dropDownInstance.items.indexOf(args.item) }); },
            beforeOpen: function (args) { return _this.beforeOpenHandler(_this.dropDownInstance, args.element, l10n.getConstant('ListAllSheets')); },
            open: function (args) { return _this.openHandler(_this.dropDownInstance, args.element, 'left'); },
            cssClass: 'e-sheets-list e-flat e-caret-hide',
            close: function () { return _this.focusTab(_this.tabInstance.element); }
        });
        this.dropDownInstance.createElement = this.parent.createElement;
        this.dropDownInstance.appendTo(ddb);
        var sheetTab = this.parent.createElement('div', { className: 'e-sheet-tab' });
        var cancelSelect;
        this.tabInstance = new Tab({
            selectedItem: this.parent.activeSheetIndex,
            overflowMode: 'Scrollable',
            items: items.tabItems,
            scrollStep: 250,
            selecting: function (args) {
                if (args.selectingIndex === args.selectedIndex) {
                    return;
                }
                if (cancelSelect) {
                    cancelSelect = false;
                }
                else {
                    var beginEventArgs = { currentSheetIndex: args.selectingIndex, previousSheetIndex: args.selectedIndex, cancel: false };
                    _this.parent.notify(beginAction, { eventArgs: beginEventArgs, action: 'gotoSheet' });
                    cancelSelect = beginEventArgs.cancel;
                }
            },
            selected: function (args) {
                if (!args.isInteracted) {
                    args.preventFocus = true;
                }
                _this.goToSheet(args, cancelSelect, true);
            },
            created: function () {
                var tBarItems = _this.tabInstance.element.querySelector('.e-toolbar-items');
                tBarItems.classList.add('e-sheet-tabs-items');
                EventHandler.add(tBarItems, 'dblclick', _this.renameSheetTab, _this);
            }
        });
        panel.appendChild(sheetTab);
        this.tabInstance.createElement = this.parent.createElement;
        this.tabInstance.appendTo(sheetTab);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.remove(this.tabInstance.element, 'keydown', this.tabInstance.spaceKeyDown);
        var sheetCount = items.tabItems.length;
        var sheet;
        for (var i = 0; i < sheetCount; i++) {
            sheet = getSheet(this.parent, i);
            var arg = { action: 'addSheet', sheetName: 'Sheet' + sheet.id, sheetId: sheet.id, visibleName: sheet.name };
            this.parent.notify(workbookFormulaOperation, arg);
        }
        this.parent.notify(workbookFormulaOperation, { action: 'initiateDefinedNames' });
        this.parent.notify(protectSheet, null);
    };
    SheetTabs.prototype.goToSheet = function (args, cancelSelect, triggerEvent) {
        var _this = this;
        if (args.selectedIndex === args.previousIndex) {
            return;
        }
        if (cancelSelect) {
            this.tabInstance.selectedItem = args.previousIndex;
            this.tabInstance.dataBind();
            focus(this.parent.element);
            return;
        }
        this.parent.notify(removeDesignChart, {});
        if (this.parent.isEdit) {
            var selection = window.getSelection();
            var editArgs = { action: 'getCurrentEditValue', editedValue: '' };
            this.parent.notify(editOperation, editArgs);
            var formula = editArgs.editedValue ? checkIsFormula(editArgs.editedValue, true) : false;
            if (!formula && selection && selection.focusNode && selection.focusNode.classList &&
                selection.focusNode.classList.contains('e-formula-bar-panel')) {
                formula = checkIsFormula(this.parent.element.querySelector('.e-formula-bar').value, true);
            }
            if (!formula) {
                this.parent.endEdit();
            }
        }
        this.parent.activeSheetIndex = args.selectedIndex;
        this.parent.dataBind();
        this.updateDropDownItems(args.selectedIndex, args.previousIndex);
        var eventArgs = {
            action: 'registerGridInCalc',
            sheetID: (args.selectedIndex + 1).toString()
        };
        this.parent.notify(workbookFormulaOperation, eventArgs);
        if (triggerEvent) {
            this.parent.notify(completeAction, {
                eventArgs: { previousSheetIndex: args.previousIndex, currentSheetIndex: args.selectedIndex }, action: 'gotoSheet'
            });
            getUpdateUsingRaf(function () { return focus(_this.parent.element); });
        }
    };
    SheetTabs.prototype.updateDropDownItems = function (curIdx, prevIdx) {
        if (prevIdx > -1) {
            this.dropDownInstance.items[prevIdx].iconCss = '';
        }
        this.dropDownInstance.items[curIdx].iconCss = 'e-selected-icon e-icons';
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
    };
    SheetTabs.prototype.beforeOpenHandler = function (instance, element, localeText) {
        var viewportHeight = this.parent.viewport.height;
        var actualHeight = (parseInt(getComputedStyle(element.firstElementChild).height, 10) *
            instance.items.length) + (parseInt(getComputedStyle(element).paddingTop, 10) * 2);
        if (actualHeight > viewportHeight) {
            element.style.height = viewportHeight + "px";
            element.style.overflowY = 'auto';
        }
        element.parentElement.style.visibility = 'hidden';
        if (localeText) {
            element.setAttribute('aria-label', localeText);
        }
    };
    SheetTabs.prototype.openHandler = function (instance, element, positionX) {
        var wrapper = element.parentElement;
        var height;
        var collide = isCollide(wrapper);
        if (collide.indexOf('bottom') === -1) {
            height = element.style.overflowY === 'auto' ? this.parent.viewport.height : wrapper.getBoundingClientRect().height;
            var offset = calculatePosition(instance.element, positionX, 'top');
            if (positionX === 'right') {
                offset.left -= wrapper.getBoundingClientRect().width;
            }
            wrapper.style.left = offset.left + "px";
            wrapper.style.top = offset.top - height + "px";
        }
        wrapper.style.visibility = '';
        focus(element);
    };
    SheetTabs.prototype.getSheetTabItems = function () {
        var _this = this;
        var tabItems = [];
        var ddbItems = [];
        var sheetName;
        this.parent.sheets.forEach(function (sheet, index) {
            sheetName = getSheetName(_this.parent, index).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            tabItems.push({ header: { 'text': sheetName }, visible: sheet.state === 'Visible' });
            ddbItems.push({ text: sheetName, iconCss: index === _this.parent.activeSheetIndex ? 'e-selected-icon e-icons' : '' });
        });
        return { tabItems: tabItems, ddbItems: ddbItems };
    };
    SheetTabs.prototype.refreshSheetTab = function () {
        var items = this.getSheetTabItems();
        this.dropDownInstance.items = items.ddbItems;
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        this.tabInstance.items = items.tabItems;
        this.tabInstance.selectedItem = this.parent.activeSheetIndex;
        this.tabInstance.dataBind();
    };
    SheetTabs.prototype.addSheetTab = function () {
        this.parent.notify(insertModel, { model: this.parent, start: this.parent.activeSheetIndex + 1, end: this.parent.activeSheetIndex + 1, modelType: 'Sheet', isAction: true, activeSheetIndex: this.parent.activeSheetIndex + 1 });
    };
    SheetTabs.prototype.insertSheetTab = function (args) {
        this.parent.notify(removeDesignChart, {});
        if (!args.preventUpdate || args.startIdx === this.tabInstance.selectedItem) {
            this.dropDownInstance.items[this.tabInstance.selectedItem].iconCss = '';
        }
        for (var i = args.startIdx; i <= args.endIdx; i++) {
            var sheetName = this.parent.sheets[i].name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.dropDownInstance.items.splice(i, 0, { text: sheetName });
            this.tabInstance.addTab([{ header: { text: sheetName }, content: '' }], i);
        }
        if (!args.preventUpdate || args.startIdx === this.tabInstance.selectedItem) {
            this.dropDownInstance.items[args.startIdx].iconCss = 'e-selected-icon e-icons';
        }
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        if (args.preventUpdate) {
            if (args.startIdx !== this.tabInstance.selectedItem) {
                this.refreshSheetTab();
            }
            else {
                this.parent.notify(protectSheet, null);
            }
        }
        else {
            this.updateSheetTab({ idx: args.startIdx, preventDataBind: true });
        }
    };
    SheetTabs.prototype.updateSheetTab = function (args) {
        if (args.name === 'activeSheetChanged') {
            args.idx = this.parent.skipHiddenSheets(args.idx);
        }
        else {
            if (this.parent.sheets[args.idx].state === 'Hidden') {
                if (this.parent.isProtected) {
                    return;
                }
                this.showSheet({ sheetIndex: args.idx, triggerEvent: true });
            }
        }
        this.tabInstance.selectedItem = args.idx;
        if (!args.preventDataBind) {
            this.tabInstance.dataBind();
        }
        this.parent.notify(protectSheet, null);
    };
    SheetTabs.prototype.showSheet = function (args) {
        this.parent.setSheetPropertyOnMute(this.parent.sheets[args.sheetIndex], 'state', 'Visible');
        this.tabInstance.hideTab(args.sheetIndex, false);
        if (args.triggerEvent) {
            this.parent.notify(completeAction, { action: 'showSheet', eventArgs: { sheetIndex: args.sheetIndex } });
        }
    };
    SheetTabs.prototype.switchSheetTab = function (args) {
        var target = closest(args.event.target, '.e-toolbar-item');
        if (!target) {
            return;
        }
        var name = target.querySelector('.e-tab-text').textContent;
        var disableItems = [];
        var id = this.parent.element.id + "_cmenu";
        for (var i = 0, len = this.parent.sheets.length; i < len; i++) {
            if (this.parent.sheets[i].name === name) {
                if (this.parent.activeSheetIndex !== i) {
                    this.updateSheetTab({ idx: i });
                }
                break;
            }
        }
        if (args.element.classList.contains('e-contextmenu') && args.items[0] &&
            args.items[0].id === this.parent.element.id + "_cmenu_insert_sheet") {
            if (this.skipHiddenSheets() === 1) {
                //let id: string = `${this.parent.element.id}_cmenu`;
                //this.parent.enableFileMenuItems([`${id}_hide_sheet`, `${id}_delete_sheet`], false, true);
                disableItems.push(id + "_hide_sheet", id + "_delete_sheet");
            }
            if (!this.parent.allowInsert || this.parent.isProtected) {
                disableItems.push(id + "_insert_sheet");
            }
            if (!this.parent.allowDelete && disableItems.indexOf(id + "_delete_sheet") > -1) {
                disableItems.push(id + "_delete_sheet");
            }
        }
        if (this.parent.password.length > 0 || this.parent.isProtected) {
            if (disableItems.indexOf(id + "_insert_sheet") > -1) {
                disableItems.push(id + "_insert_sheet");
            }
            if (disableItems.indexOf(id + "_delete_sheet") > -1) {
                disableItems.push(id + "_delete_sheet");
            }
            disableItems.push(id + "_duplicate", id + "_rename", id + "_hide_sheet", id + "_delete_sheet", id + "_insert_sheet", id + "_move_left", id + "_move_right");
        }
        this.parent.enableContextMenuItems(disableItems, false, true);
    };
    SheetTabs.prototype.skipHiddenSheets = function () {
        var count = this.parent.sheets.length;
        this.parent.sheets.forEach(function (sheet) {
            if (sheet.state !== 'Visible') {
                --count;
            }
        });
        return count;
    };
    SheetTabs.prototype.renameSheetTab = function () {
        var target = this.tabInstance.element.querySelector('.e-toolbar-item.e-active');
        if (target) {
            target = target.querySelector('.e-text-wrap');
            var value = target.querySelector('.e-tab-text').textContent;
            var args = {
                eventArgs: {
                    name: value, index: this.parent.getActiveSheet().id
                },
                action: 'renameSheet', cancel: false
            };
            this.parent.trigger('actionBegin', args);
            if (args.cancel || this.parent.isProtected) {
                return;
            }
            var input = this.parent.createElement('input', {
                id: this.parent.element.id + '_rename_input',
                className: 'e-input e-sheet-rename', styles: "width: " + target.getBoundingClientRect().width + "px", attrs: {
                    'type': 'text', 'name': 'Rename', 'required': '', 'value': value, 'spellcheck': 'false', 'maxlength': '31'
                }
            });
            target.firstElementChild.style.display = 'none';
            target.appendChild(input);
            EventHandler.add(document, 'mousedown touchstart', this.renameInputFocusOut, this);
            EventHandler.add(input, 'keydown', this.renameKeyDown, this);
            EventHandler.add(input, 'input', this.updateWidth, this);
            input.focus();
            input.setSelectionRange(0, value.length);
            EventHandler.remove(closest(target, '.e-toolbar-items'), 'dblclick', this.renameSheetTab);
        }
    };
    SheetTabs.prototype.updateWidth = function (e) {
        var target = e.target;
        var len = target.value.length;
        var value = target.value.split(' ');
        if (value.length) {
            var spaceLen = value.length - 1;
            len -= spaceLen;
            len += (spaceLen * 0.5);
        }
        target.style.width = len + "ch";
    };
    SheetTabs.prototype.renameKeyDown = function (e) {
        if (e.keyCode === 32) {
            e.stopPropagation();
        }
        else if (e.keyCode === 27) {
            this.removeRenameInput(e.target);
            this.focusTab(this.tabInstance.element);
        }
        else if (e.keyCode === 13) {
            this.renameInputFocusOut(e);
        }
    };
    SheetTabs.prototype.renameInputFocusOut = function (e) {
        var target = e.target;
        if ((e.type === 'mousedown' || e.type === 'touchstart') && (target.classList.contains('e-sheet-rename') ||
            closest(target, '.e-dlg-container'))) {
            return;
        }
        target = document.getElementById(this.parent.element.id + '_rename_input');
        var value = target.value;
        var l10n = this.parent.serviceLocator.getService(locale);
        if (value) {
            var idx = this.tabInstance.selectedItem;
            // eslint-disable-next-line no-useless-escape
            if (!value.match(new RegExp('.*[\\[\\]\\*\\\\\/\\?].*'))) {
                if (this.parent.sheets[idx].name !== value) {
                    for (var i = 0, len = this.parent.sheets.length; i < len; i++) {
                        if (i !== this.parent.activeSheetIndex && this.parent.sheets[i].name.toLowerCase() ===
                            value.toLowerCase()) {
                            this.showRenameDialog(target, l10n.getConstant('SheetRenameAlreadyExistsAlert'));
                            return;
                        }
                    }
                }
                var items = this.removeRenameInput(target);
                if (this.parent.sheets[idx].name !== value) {
                    this.parent.setSheetPropertyOnMute(this.parent.sheets[idx], 'name', value);
                    this.updateSheetName({ value: value, idx: idx, items: items });
                }
                if (e.type === 'keydown') {
                    this.focusTab(items);
                }
                else if ((closest(e.target, '.e-spreadsheet'))) {
                    focus(this.parent.element);
                }
            }
            else {
                this.showRenameDialog(target, l10n.getConstant('SheetRenameInvalidAlert'));
            }
        }
        else {
            this.showRenameDialog(target, l10n.getConstant('SheetRenameEmptyAlert'));
        }
        this.parent.notify(completeAction, { eventArgs: { index: this.parent.getActiveSheet().id, value: value }, action: 'renameSheet' });
    };
    SheetTabs.prototype.focusTab = function (context) {
        focus(select('.e-toolbar-item.e-active .e-tab-wrap', context));
    };
    SheetTabs.prototype.updateSheetName = function (args) {
        var pName = this.tabInstance.items[args.idx].header.text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        var name = args.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.tabInstance.items[args.idx].header.text = name;
        this.dropDownInstance.items[args.idx].text = name;
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        var sheetTabText = args.items.querySelectorAll('.e-toolbar-item')[args.idx].querySelector('.e-tab-text');
        sheetTabText.textContent = '';
        sheetTabText.appendChild(document.createTextNode(args.value));
        if (args.value.indexOf('  ') > -1) {
            this.tabInstance.setProperties({ 'items': this.tabInstance.items }, true);
        }
        else {
            this.tabInstance.dataBind();
        }
        this.parent.notify(sheetRenameUpdate, { value: args.value, pName: pName });
        if (this.parent.allowChart) {
            var range_1 = [];
            var lastIndex_1;
            this.parent.chartColl.forEach(function (chart) {
                if (chart.range.includes('!')) {
                    lastIndex_1 = chart.range.lastIndexOf('!');
                    range_1[0] = chart.range.substring(0, lastIndex_1);
                    range_1[1] = chart.range.substring(lastIndex_1 + 1);
                    if (range_1[0].toLowerCase() === pName.toLowerCase()) {
                        range_1[0] = args.value;
                        chart.range = range_1.join('!');
                    }
                }
            });
        }
    };
    SheetTabs.prototype.hideSheet = function (args) {
        var actionArgs = {
            action: 'hideSheet', eventArgs: { sheetIndex: args.sheetIndex, cancel: false }
        };
        if (args.triggerEvent) {
            this.parent.notify(beginAction, actionArgs);
            if (actionArgs.eventArgs.cancel) {
                return;
            }
        }
        this.parent.setSheetPropertyOnMute(getSheet(this.parent, args.sheetIndex), 'state', 'Hidden');
        this.tabInstance.hideTab(args.sheetIndex);
        if (args.triggerEvent) {
            delete actionArgs.eventArgs.cancel;
            this.parent.notify(completeAction, actionArgs);
        }
    };
    SheetTabs.prototype.removeRenameInput = function (target) {
        var textEle = target.parentElement.querySelector('.e-tab-text');
        var sheetItems = closest(target, '.e-toolbar-items');
        EventHandler.add(sheetItems, 'dblclick', this.renameSheetTab, this);
        EventHandler.remove(document, 'mousedown touchstart', this.renameInputFocusOut);
        EventHandler.remove(target, 'keydown', this.renameKeyDown);
        EventHandler.remove(target, 'input', this.updateWidth);
        remove(target);
        textEle.style.display = '';
        return sheetItems;
    };
    SheetTabs.prototype.showRenameDialog = function (target, content) {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var isCancelled;
        dialogInst.show({
            height: 180, width: 400, isModal: true, showCloseIcon: true,
            content: content,
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'SheetRenameDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    isCancelled = args.preventFocus = args.cancel = true;
                }
                else {
                    args.element.querySelector('.e-footer-content .e-primary').setAttribute('aria-label', content + " " + _this.parent.serviceLocator.getService(locale).getConstant('Ok'));
                    focus(target);
                }
            },
            close: function () {
                if (isCancelled) {
                    getUpdateUsingRaf(function () {
                        var curPosition = [target.selectionStart, target.selectionEnd];
                        focus(target);
                        target.setSelectionRange(curPosition[0], curPosition[1]);
                    });
                }
                else {
                    target.setSelectionRange(0, target.value.length);
                }
            }
        });
    };
    SheetTabs.prototype.focusRenameInput = function () {
        var input = document.getElementById(this.parent.element.id + '_rename_input');
        if (input) {
            input.focus();
        }
    };
    SheetTabs.prototype.removeSheetTab = function (args) {
        var _this = this;
        if (args.count && (args.count === this.parent.sheets.length)) {
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        if (this.skipHiddenSheets() > 1) {
            var sheet = args.sheetName ?
                getSheet(this.parent, getSheetIndex(this.parent, args.sheetName)) :
                this.parent.getActiveSheet();
            var sheetIndex_1 = isNullOrUndefined(args.index) ? getSheetIndex(this.parent, sheet.name) : args.index;
            var eventArgs_1 = {
                index: sheetIndex_1,
                sheetCount: this.parent.sheets.length,
                sheetName: sheet.name
            };
            var isDataAvail = sheet.rows && sheet.rows.length ?
                (sheet.rows.length === 1 ? (sheet.rows[0].cells && sheet.rows[0].cells.length ? true : false) : true) : false;
            if (isDataAvail) {
                var dialogInst_1 = this.parent.serviceLocator.getService(dialog);
                if (args.clicked) {
                    this.forceDelete(sheetIndex_1);
                }
                else {
                    dialogInst_1.show({
                        height: 200, width: 400, isModal: true, showCloseIcon: true, cssClass: 'e-delete-sheet-dlg',
                        content: l10n.getConstant('DeleteSheetAlert'),
                        beforeOpen: function (args) {
                            var dlgArgs = {
                                dialogName: 'DeleteSheetDialog',
                                element: args.element, target: args.target, cancel: args.cancel
                            };
                            _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                            if (dlgArgs.cancel) {
                                args.cancel = true;
                            }
                            else {
                                args.element.querySelector('.e-footer-content .e-primary').setAttribute('aria-label', l10n.getConstant('DeleteSheetAlert') + " " + l10n.getConstant('Ok'));
                                focus(_this.parent.element);
                            }
                        },
                        buttons: [{
                                buttonModel: { content: l10n.getConstant('Ok'), isPrimary: true },
                                click: function () {
                                    dialogInst_1.hide();
                                    _this.forceDelete(sheetIndex_1);
                                    _this.parent.notify(clearUndoRedoCollection, null);
                                    if (args && !args.isAction) {
                                        eventArgs_1.sheetCount = _this.parent.sheets.length;
                                        _this.parent.notify(completeAction, { eventArgs: eventArgs_1, action: 'removeSheet' });
                                    }
                                }
                            }]
                    });
                }
            }
            else {
                this.parent.notify(refreshInsertDelete, { startIndex: sheetIndex_1, endIndex: sheetIndex_1, modelType: 'Sheet', isDelete: true });
                this.parent.notify(workbookFormulaOperation, { action: 'deleteSheetTab', sheetId: getSheet(this.parent, sheetIndex_1).id });
                this.destroySheet(sheetIndex_1);
                this.parent.notify(clearUndoRedoCollection, null);
                if (args && !args.isAction) {
                    eventArgs_1.sheetCount = this.parent.sheets.length;
                    this.parent.notify(completeAction, { eventArgs: eventArgs_1, action: 'removeSheet' });
                }
            }
        }
        else {
            this.parent.serviceLocator.getService(dialog).show({
                height: 180, width: 400, isModal: true, showCloseIcon: true,
                content: l10n.getConstant('DeleteSingleLastSheetAlert'),
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: 'DeleteSingleSheetDialog',
                        element: args.element, target: args.target, cancel: args.cancel
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                }
            });
        }
    };
    SheetTabs.prototype.forceDelete = function (sheetIndex) {
        this.parent.notify(removeDesignChart, {});
        this.parent.notify(refreshInsertDelete, { startIndex: sheetIndex, endIndex: sheetIndex, modelType: 'Sheet', isDelete: true });
        this.parent.notify(workbookFormulaOperation, { action: 'deleteSheetTab', sheetId: getSheet(this.parent, sheetIndex).id });
        this.destroySheet(sheetIndex);
    };
    SheetTabs.prototype.destroySheet = function (sheetIndex) {
        var activeSheetIdx = isNullOrUndefined(sheetIndex) ? this.parent.activeSheetIndex : sheetIndex;
        this.parent.removeSheet(activeSheetIdx);
        this.parent.notify(sheetsDestroyed, { sheetIndex: activeSheetIdx });
        this.dropDownInstance.items.splice(activeSheetIdx, 1);
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        this.tabInstance.removeTab(activeSheetIdx);
        var activeIndex = this.parent.skipHiddenSheets(this.tabInstance.selectedItem);
        this.parent.activeSheetIndex = activeIndex;
        this.parent.setProperties({ activeSheetIndex: activeIndex }, true);
        this.parent.renderModule.refreshSheet();
        this.tabInstance.selectedItem = activeIndex;
        this.tabInstance.dataBind();
        this.updateDropDownItems(activeIndex);
        this.parent.notify(protectSheet, null);
    };
    SheetTabs.prototype.showAggregate = function (args) {
        var _this = this;
        if (isSingleCell(getRangeIndexes(this.parent.getActiveSheet().selectedRange)) || (args && args.remove)) {
            this.removeAggregate();
            return;
        }
        var eventArgs = { Count: 0, Sum: '0', Avg: '0', Min: '0', Max: '0', countOnly: true };
        this.parent.notify(aggregateComputation, eventArgs);
        if (eventArgs.Count > 1) {
            this.aggregateContent = eventArgs.countOnly ? 'Count' : this.selaggregateCnt;
            if (eventArgs.countOnly) {
                this.aggregateContent = 'Count';
                delete eventArgs.Sum;
                delete eventArgs.Avg;
                delete eventArgs.Min;
                delete eventArgs.Max;
            }
            var btnClass = eventArgs.countOnly ? 'e-aggregate-list e-flat e-aggregate-list-countonly e-caret-hide'
                : 'e-aggregate-list e-flat';
            delete eventArgs.countOnly;
            var key = this.aggregateContent;
            var content = key + ": " + eventArgs[key.toString()];
            if (!this.aggregateDropDown) {
                var aggregateEle = this.parent.createElement('button', { id: this.parent.element.id + '_aggregate', attrs: { 'type': 'button' } });
                document.getElementById(this.parent.element.id + "_sheet_tab_panel").appendChild(aggregateEle);
                this.aggregateDropDown = new DropDownButton({
                    content: content,
                    items: this.getAggregateItems(eventArgs),
                    createPopupOnClick: true,
                    select: function (args) {
                        _this.parent.notify(aggregateComputation, eventArgs);
                        _this.updateAggregateContent(args.item.text, { Count: eventArgs.Count, Sum: eventArgs.Sum, Avg: eventArgs.Avg, Min: eventArgs.Min,
                            Max: eventArgs.Max }, true);
                    },
                    beforeOpen: function (args) {
                        return _this.beforeOpenHandler(_this.aggregateDropDown, args.element);
                    },
                    open: function (args) { return _this.openHandler(_this.aggregateDropDown, args.element, 'right'); },
                    close: function () { return focus(_this.parent.element); },
                    cssClass: btnClass
                });
                this.aggregateDropDown.createElement = this.parent.createElement;
                this.aggregateDropDown.appendTo(aggregateEle);
            }
            else {
                this.updateAggregateContent(content, eventArgs);
            }
        }
        else {
            this.removeAggregate();
        }
    };
    SheetTabs.prototype.getAggregateItems = function (args) {
        var _this = this;
        var items = [];
        var text;
        var iconCss;
        var argsKey;
        Object.keys(args).forEach(function (key) {
            argsKey = args["" + key];
            if (argsKey !== aggregateComputation) {
                text = key + ": " + argsKey;
                iconCss = key === _this.aggregateContent ? 'e-selected-icon e-icons' : '';
                items.push({ text: text, iconCss: iconCss });
            }
        });
        return items;
    };
    SheetTabs.prototype.updateAggregateContent = function (text, eventArgs, isSelect) {
        this.aggregateContent = text.split(': ')[0];
        if (isSelect) {
            this.selaggregateCnt = text.split(': ')[0];
        }
        this.aggregateDropDown.content = text;
        this.aggregateDropDown.dataBind();
        this.aggregateDropDown.setProperties({ 'items': this.getAggregateItems(eventArgs) }, true);
    };
    SheetTabs.prototype.removeAggregate = function () {
        if (!isNullOrUndefined(this.aggregateDropDown)) {
            this.aggregateDropDown.destroy();
            remove(this.aggregateDropDown.element);
            this.aggregateDropDown = null;
        }
    };
    SheetTabs.prototype.addEventListener = function () {
        this.parent.on(sheetTabs, this.createSheetTabs, this);
        this.parent.on(refreshSheetTabs, this.refreshSheetTab, this);
        this.parent.on(insertSheetTab, this.insertSheetTab, this);
        this.parent.on(removeSheetTab, this.removeSheetTab, this);
        this.parent.on(renameSheetTab, this.renameSheetTab, this);
        this.parent.on(cMenuBeforeOpen, this.switchSheetTab, this);
        this.parent.on(activeSheetChanged, this.updateSheetTab, this);
        this.parent.on(activeCellChanged, this.removeAggregate, this);
        this.parent.on(focusRenameInput, this.focusRenameInput, this);
        this.parent.on(sheetNameUpdate, this.updateSheetName, this);
        this.parent.on(hideSheet, this.hideSheet, this);
        this.parent.on(showAggregate, this.showAggregate, this);
        this.parent.on(goToSheet, this.goToSheet, this);
        this.parent.on(showSheet, this.showSheet, this);
    };
    SheetTabs.prototype.destroy = function () {
        this.removeEventListener();
        if (this.dropDownInstance) {
            this.dropDownInstance.destroy();
        }
        this.dropDownInstance = null;
        if (this.tabInstance) {
            this.tabInstance.destroy();
        }
        this.tabInstance = null;
        this.removeAggregate();
        this.aggregateContent = null;
        if (this.addBtnRipple) {
            this.addBtnRipple();
        }
        this.addBtnRipple = null;
        EventHandler.remove(document, 'mousedown touchstart', this.renameInputFocusOut);
        var ele = document.getElementById(this.parent.element.id + '_sheet_tab_panel');
        if (ele) {
            remove(ele);
        }
        if (this.selaggregateCnt) {
            this.selaggregateCnt = null;
        }
        this.parent = null;
    };
    SheetTabs.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(sheetTabs, this.createSheetTabs);
            this.parent.off(refreshSheetTabs, this.refreshSheetTab);
            this.parent.off(insertSheetTab, this.insertSheetTab);
            this.parent.off(removeSheetTab, this.removeSheetTab);
            this.parent.off(renameSheetTab, this.renameSheetTab);
            this.parent.off(cMenuBeforeOpen, this.switchSheetTab);
            this.parent.off(activeSheetChanged, this.updateSheetTab);
            this.parent.off(activeCellChanged, this.removeAggregate);
            this.parent.off(focusRenameInput, this.focusRenameInput);
            this.parent.off(sheetNameUpdate, this.updateSheetName);
            this.parent.off(hideSheet, this.hideSheet);
            this.parent.off(showAggregate, this.showAggregate);
            this.parent.off(goToSheet, this.goToSheet);
            this.parent.off(showSheet, this.showSheet);
        }
    };
    return SheetTabs;
}());
export { SheetTabs };
