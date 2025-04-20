import { findDlg, locale, dialog, gotoDlg, findHandler, focus, getUpdateUsingRaf, activeSheetChanged, removeElements, finiteAlert } from '../common/index';
import { getComponent, isNullOrUndefined, closest, select, EventHandler, detach, Browser } from '@syncfusion/ej2-base';
import { goto, showFindAlert, replaceAllDialog, findKeyUp, replace, replaceAll } from '../../workbook/index';
import { getRangeIndexes, getSwapRange, findToolDlg, count } from '../../workbook/common/index';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Dialog as FindDialog } from '@syncfusion/ej2-popups';
/**
 * `FindAndReplace` module is used to handle the search action in Spreadsheet.
 */
var FindAndReplace = /** @class */ (function () {
    /**
     * Constructor for FindAndReplace module.
     *
     * @param {Spreadsheet} parent - Constructor for FindAndReplace module.
     */
    function FindAndReplace(parent) {
        this.shortValue = '';
        this.divElements = [];
        this.paraElements = [];
        this.inputElements = [];
        this.textBoxElements = [];
        this.dropDownListElements = [];
        this.parent = parent;
        this.addEventListener();
    }
    FindAndReplace.prototype.addEventListener = function () {
        this.parent.on(findDlg, this.renderFindDlg, this);
        this.parent.on(gotoDlg, this.renderGotoDlg, this);
        this.parent.on(goto, this.gotoHandler, this);
        this.parent.on(findHandler, this.findHandler, this);
        this.parent.on(showFindAlert, this.showFindAlert, this);
        this.parent.on(replaceAllDialog, this.replaceAllDialog, this);
        this.parent.on(findKeyUp, this.findKeyUp, this);
        this.parent.on(findToolDlg, this.findToolDlg, this);
        this.parent.on(activeSheetChanged, this.refreshFindDlg, this);
    };
    FindAndReplace.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(findDlg, this.renderFindDlg);
            this.parent.off(gotoDlg, this.renderGotoDlg);
            this.parent.off(goto, this.gotoHandler);
            this.parent.off(findHandler, this.findHandler);
            this.parent.off(showFindAlert, this.showFindAlert);
            this.parent.off(replaceAllDialog, this.replaceAllDialog);
            this.parent.off(findKeyUp, this.findKeyUp);
            this.parent.off(findToolDlg, this.findToolDlg);
            this.parent.off(activeSheetChanged, this.refreshFindDlg);
        }
    };
    FindAndReplace.prototype.findToolDlg = function (args) {
        var _this = this;
        var updateDisableState = function (disable) {
            var ribbon = _this.parent.showRibbon && _this.parent.element.querySelector('.e-ribbon');
            if (ribbon) {
                var findBtn = (args.event && args.event.target ?
                    closest(args.event.target, "#" + _this.parent.element.id + "_findbtn") :
                    select("#" + _this.parent.element.id + "_findbtn", ribbon));
                if (findBtn) {
                    if (disable) {
                        findBtn.classList.add('e-disabled');
                    }
                    else {
                        findBtn.classList.remove('e-disabled');
                    }
                    findBtn.disabled = disable;
                }
            }
        };
        var dialogDiv = args.dialogEle || this.parent.element.getElementsByClassName('e-findtool-dlg')[0];
        if (args.isPublic) {
            this.findValue = args.findValue;
        }
        var sheet = this.parent.getActiveSheet();
        var toolbarObj;
        var findTextInput;
        var findSpan;
        var findHandlerFn = function (e) {
            if (!findTextInput || (sheet.isProtected && !sheet.protectSettings.selectCells &&
                !sheet.protectSettings.selectUnLockedCells)) {
                return;
            }
            var inputValue = findTextInput.value;
            if (e && e.keyCode === 13) {
                if (findTextInput.value && findSpan.textContent !== '0 of 0') {
                    _this.parent.notify(findHandler, { findOption: e.shiftKey ? 'prev' : 'next' });
                    _this.updateCount(findSpan, e.shiftKey);
                }
            }
            else {
                var enable = void 0;
                if (inputValue === '') {
                    findSpan.textContent = '0 of 0';
                    enable = false;
                }
                else {
                    var countArgs = { value: inputValue, mode: 'Sheet',
                        isCSen: false, sheetIndex: _this.parent.activeSheetIndex, isEMatch: false, searchBy: 'By Row' };
                    _this.parent.notify(count, countArgs);
                    findSpan.textContent = countArgs.findCount;
                    enable = countArgs.findCount !== '0 of 0';
                }
                toolbarObj.enableItems(1, enable);
                toolbarObj.enableItems(2, enable);
            }
        };
        if (dialogDiv) {
            if (args.isPublic || args.refreshPosition) {
                if (args.isPublic) {
                    findTextInput = dialogDiv.querySelector('.e-text-findNext-short');
                    findTextInput.value = this.findValue;
                    findSpan = dialogDiv.querySelector('.e-input-group-icon');
                    toolbarObj = getComponent(dialogDiv.querySelector('.e-find-toolbar'), 'toolbar');
                    findHandlerFn();
                }
                if (args.refreshPosition) {
                    var headerHgt = void 0;
                    if (this.parent.getActiveSheet().showHeaders) {
                        var hdrPanel = this.parent.getColumnHeaderContent().parentElement;
                        headerHgt = ((hdrPanel && hdrPanel.offsetHeight) || 30) + 1;
                    }
                    else {
                        headerHgt = 1;
                    }
                    dialogDiv.style.top = headerHgt + "px";
                }
            }
            else {
                updateDisableState(true);
                this.findDialog.hide();
            }
        }
        else {
            var findTextElement = this.parent.createElement('div', { className: 'e-input-group' });
            findTextInput = this.parent.createElement('input', { className: 'e-input e-text-findNext-short', attrs: { 'type': 'Text' } });
            if (this.findValue) {
                findTextInput.value = this.findValue;
            }
            var l10n = this.parent.serviceLocator.getService(locale);
            findTextInput.setAttribute('placeholder', l10n.getConstant('FindValue'));
            findSpan = this.parent.createElement('span', { className: 'e-input-group-icon' });
            var timeoutHandler_1;
            var largeData_1 = (sheet.usedRange.rowIndex * sheet.usedRange.colIndex) > 100;
            findTextInput.onkeyup = function (e) {
                if (largeData_1) {
                    if (timeoutHandler_1) {
                        clearTimeout(timeoutHandler_1);
                    }
                    timeoutHandler_1 = setTimeout(findHandlerFn.bind(_this, e), 500);
                }
                else {
                    findHandlerFn(e);
                }
            };
            findTextElement.appendChild(findTextInput);
            findTextElement.appendChild(findSpan);
            var toolItemModel = [
                { type: 'Input', template: findTextElement },
                {
                    prefixIcon: 'e-icons e-prev-icon', tooltipText: l10n.getConstant('FindPreviousBtn'), type: 'Button', cssClass: 'e-findRib-prev',
                    disabled: true
                },
                { prefixIcon: 'e-icons e-next-icon', tooltipText: l10n.getConstant('FindNextBtn'), type: 'Button', cssClass: 'e-findRib-next', disabled: true },
                { type: 'Separator' },
                { prefixIcon: 'e-icons e-option-icon', tooltipText: l10n.getConstant('MoreOptions'), type: 'Button', cssClass: 'e-findRib-more' },
                { prefixIcon: 'e-icons e-close', tooltipText: l10n.getConstant('Close'), type: 'Button', cssClass: 'e-findRib-close' }
            ];
            toolbarObj = new Toolbar({
                clicked: function (args) {
                    if (args.item.cssClass === 'e-findRib-next') {
                        _this.parent.notify(findHandler, { findOption: 'next' });
                        _this.updateCount(findSpan);
                    }
                    else if (args.item.cssClass === 'e-findRib-prev') {
                        _this.parent.notify(findHandler, { findOption: 'prev' });
                        _this.updateCount(findSpan, true);
                    }
                    else if (args.item.cssClass === 'e-findRib-more') {
                        _this.findDialog.animationSettings.effect = 'None';
                        _this.findDialog.setProperties({ animationSettings: _this.findDialog.animationSettings }, true);
                        _this.renderFindDlg();
                        _this.findDialog.hide();
                    }
                }, width: 'auto', height: 'auto', items: toolItemModel, cssClass: 'e-find-toolObj',
                created: function () {
                    var tbarBtns = toolbarObj.element.querySelectorAll('.e-toolbar-item .e-tbar-btn');
                    tbarBtns.forEach(function (tbarBtn) { return tbarBtn.removeAttribute('tabindex'); });
                }
            });
            var tbarEle = this.parent.createElement('div', { className: 'e-find-toolbar', attrs: { 'tabindex': '-1' } });
            toolbarObj.createElement = this.parent.createElement;
            toolbarObj.appendTo(tbarEle);
            dialogDiv = this.parent.createElement('div', { className: 'e-dlg-div', attrs: { 'aria-label': l10n.getConstant('FindValue') } });
            var sheetPanel_1 = this.parent.element.getElementsByClassName('e-sheet-panel')[0];
            var findDlgModel = {
                cssClass: 'e-findtool-dlg', visible: false, enableRtl: this.parent.enableRtl, target: sheetPanel_1,
                open: function () {
                    EventHandler.add(document, 'click', _this.closeDialog, _this);
                    if (_this.findValue && (!sheet.isProtected || sheet.protectSettings.selectCells ||
                        sheet.protectSettings.selectUnLockedCells)) {
                        var countArgs = { value: _this.findValue, mode: 'Sheet',
                            isCSen: false, sheetIndex: _this.parent.activeSheetIndex, isEMatch: false, searchBy: 'By Row' };
                        _this.parent.notify(count, countArgs);
                        findSpan.textContent = countArgs.findCount;
                        var enable = countArgs.findCount !== '0 of 0';
                        toolbarObj.enableItems(1, enable);
                        toolbarObj.enableItems(2, enable);
                    }
                    else {
                        findSpan.textContent = '0 of 0';
                    }
                    updateDisableState(false);
                    var inputContainer = toolbarObj.element.querySelector('.e-input-group');
                    if (inputContainer) {
                        inputContainer.addEventListener('focus', function () {
                            var textInput = toolbarObj.element.querySelector('.e-text-findNext-short');
                            focus(textInput);
                            textInput.classList.add('e-input-focus');
                            (textInput).setSelectionRange(0, textInput.value.length);
                        });
                    }
                    if (animationSettings_1) {
                        _this.findDialog.setProperties({ animationSettings: animationSettings_1 }, true);
                    }
                },
                beforeOpen: function () { return focus(_this.parent.element); },
                beforeClose: function () {
                    _this.findValue = findTextInput.value || null;
                    toolbarObj.destroy();
                    EventHandler.remove(document, 'click', _this.closeDialog);
                },
                close: function () {
                    _this.findDialog.destroy();
                    _this.findDialog = null;
                    detach(dialogDiv);
                    sheetPanel_1.style.position = '';
                    focus(_this.parent.element);
                    updateDisableState(false);
                },
                created: function () {
                    sheetPanel_1.style.position = 'relative';
                    dialogDiv.style.width = _this.parent.getMainContent().offsetWidth + 'px';
                    dialogDiv.style.visibility = 'hidden';
                    dialogDiv.style.display = 'block';
                    _this.findDialog.width = (parseInt(getComputedStyle(dialogDiv).borderLeftWidth, 10) * 2) +
                        dialogDiv.querySelector('.e-toolbar-items').getBoundingClientRect().width + 'px';
                    dialogDiv.style.display = '';
                    dialogDiv.style.width = '';
                    dialogDiv.style.visibility = '';
                    dialogDiv.style.top =
                        ((args && args.headerHgt) || (_this.parent.getColumnHeaderContent().parentElement.offsetHeight + 1)) + "px";
                    dialogDiv.style.left = '';
                    dialogDiv.style[_this.parent.enableRtl ? 'left' : 'right'] = _this.parent.sheetModule.getScrollSize() + "px";
                    _this.findDialog.show();
                }
            };
            if (Browser.isDevice) {
                findDlgModel.header = tbarEle;
                findDlgModel.allowDragging = true;
            }
            else {
                findDlgModel.content = tbarEle;
            }
            this.findDialog = new FindDialog(findDlgModel);
            this.findDialog.createElement = this.parent.createElement;
            var animationSettings_1;
            if (args && args.isPublic) {
                animationSettings_1 = { effect: this.findDialog.animationSettings.effect };
                this.findDialog.setProperties({ animationSettings: { effect: 'None' } }, true);
            }
            this.findDialog.appendTo(dialogDiv);
        }
    };
    FindAndReplace.prototype.refreshFindDlg = function () {
        var findDialog = this.findDialog && this.parent.element.getElementsByClassName('e-findtool-dlg')[0];
        if (findDialog) {
            var findToolInput = findDialog.querySelector('.e-text-findNext-short');
            this.findToolDlg({ findValue: findToolInput.value, isPublic: true, refreshPosition: true, dialogEle: findDialog });
        }
    };
    FindAndReplace.prototype.updateCount = function (countEle, isPrev) {
        var values = countEle.textContent.split(' ');
        var newStart;
        if (isPrev) {
            newStart = Number(values[0]) - 1;
            if (newStart < 1) {
                newStart = Number(values[2]);
            }
        }
        else {
            newStart = Number(values[0]) + 1;
            if (newStart > Number(values[2])) {
                newStart = 1;
            }
        }
        values[0] = newStart.toString();
        countEle.textContent = values.join(' ');
    };
    FindAndReplace.prototype.closeDialog = function (e) {
        if ((closest(e.target, '.e-findRib-close') || !closest(e.target, '.e-spreadsheet')) && this.findDialog) {
            this.findToolDlg({});
        }
    };
    FindAndReplace.prototype.renderFindDlg = function () {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        if (!this.parent.element.querySelector('.e-find-dlg')) {
            var l10n = this.parent.serviceLocator.getService(locale);
            var dlg = {
                isModal: false, showCloseIcon: true, cssClass: 'e-find-dlg',
                header: l10n.getConstant('FindAndReplace'),
                beforeOpen: function (args) {
                    var dlgArgs = { dialogName: 'FindAndReplaceDialog', element: args.element, target: args.target, cancel: args.cancel };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                    else {
                        dialogInst.dialogInstance.content = _this.findandreplaceContent();
                        dialogInst.dialogInstance.dataBind();
                        focus(_this.parent.element);
                    }
                },
                buttons: [{
                        buttonModel: { content: l10n.getConstant('FindPreviousBtn'), isPrimary: true, cssClass: 'e-btn-findPrevious',
                            disabled: true },
                        click: function (e) {
                            _this.dialogMessage();
                            _this.findHandler({ findOption: e && e.keyCode === 13 ? 'next' : 'prev' });
                        }
                    },
                    {
                        buttonModel: { content: l10n.getConstant('FindNextBtn'), isPrimary: true, cssClass: 'e-btn-findNext', disabled: true },
                        click: function () {
                            _this.dialogMessage();
                            _this.findHandler({ findOption: 'next' });
                        }
                    },
                    {
                        buttonModel: { content: l10n.getConstant('ReplaceBtn'), isPrimary: true, cssClass: 'e-btn-replace', disabled: true },
                        click: function () {
                            _this.dialogMessage();
                            _this.replaceHandler(replace);
                        }
                    },
                    {
                        buttonModel: { content: l10n.getConstant('ReplaceAllBtn'), isPrimary: true, cssClass: 'e-btn-replaceAll', disabled: true },
                        click: function () {
                            _this.dialogMessage();
                            _this.replaceHandler(replaceAll);
                        }
                    }],
                open: function () {
                    var findInput = _this.parent.element.querySelector('.e-text-findNext');
                    if (findInput.value) {
                        var prevButton = _this.parent.element.querySelector('.e-btn-findPrevious');
                        var prevButtonObj = getComponent(prevButton, 'btn');
                        prevButtonObj.disabled = false;
                        getComponent(_this.parent.element.querySelector('.e-btn-findNext'), 'btn').disabled = false;
                    }
                    getUpdateUsingRaf(function () {
                        focus(findInput);
                    });
                },
                beforeClose: this.dialogBeforeClose.bind(this)
            };
            dialogInst.show(dlg);
        }
        else {
            dialogInst.hide();
        }
    };
    FindAndReplace.prototype.dialogBeforeClose = function () {
        var checkBox = this.checkBoxElements;
        if (checkBox && checkBox.element) {
            checkBox.destroy();
            checkBox.element.remove();
        }
        this.checkBoxElements = null;
        this.textBoxElements.forEach(function (textBox) {
            if (textBox && textBox.element) {
                textBox.destroy();
                textBox.element.remove();
            }
        });
        this.textBoxElements = [];
        this.dropDownListElements.forEach(function (dropDownList) {
            if (dropDownList && dropDownList.element) {
                dropDownList.destroy();
                dropDownList.element.remove();
            }
        });
        this.dropDownListElements = [];
        removeElements(this.paraElements);
        this.paraElements = [];
        removeElements(this.inputElements);
        this.inputElements = [];
        removeElements(this.divElements);
        this.divElements = [];
    };
    FindAndReplace.prototype.dialogMessage = function () {
        if (this.parent.element.querySelector('.e-replace-alert-span')) {
            this.parent.element.querySelector('.e-replace-alert-span').remove();
        }
        else if (this.parent.element.querySelector('.e-find-alert-span')) {
            this.parent.element.querySelector('.e-find-alert-span').remove();
        }
    };
    FindAndReplace.prototype.renderGotoDlg = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var cancelBtn = false;
        if (isNullOrUndefined(this.parent.element.querySelector('.e-goto-dlg'))) {
            var dlg = {
                width: 300, isModal: false, showCloseIcon: true, cssClass: 'e-goto-dlg',
                header: l10n.getConstant('GotoHeader'),
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: 'GoToDialog',
                        element: args.element, target: args.target, cancel: args.cancel
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                    else {
                        dialogInst.dialogInstance.content = _this.GotoContent();
                        dialogInst.dialogInstance.dataBind();
                        focus(_this.parent.element);
                    }
                },
                buttons: [{
                        buttonModel: {
                            content: l10n.getConstant('Ok'), isPrimary: true, cssClass: 'e-btn-goto-ok'
                        },
                        click: function () {
                            if (_this.gotoHandler()) {
                                dialogInst.hide();
                            }
                        }
                    }], open: function () {
                    _this.textFocus();
                }
            };
            dialogInst.show(dlg, cancelBtn);
        }
        else {
            dialogInst.hide();
        }
    };
    FindAndReplace.prototype.textFocus = function () {
        var _this = this;
        var element = this.parent.element.querySelector('.e-text-goto');
        element.addEventListener('focus', function () {
            if (_this.parent.element.querySelector('.e-goto-alert-span')) {
                _this.parent.element.querySelector('.e-goto-alert-span').remove();
            }
        });
    };
    FindAndReplace.prototype.findHandler = function (findOpt) {
        var findInput = this.parent.element.querySelector('.e-text-findNext');
        if (!findInput) {
            findInput = this.parent.element.querySelector('.e-text-findNext-short');
            if (!findInput) {
                this.gotoAlert();
            }
        }
        var value = findInput.value;
        if (findInput.value !== '') {
            var sheet = this.parent.getActiveSheet();
            if (sheet.isProtected && !sheet.protectSettings.selectCells && !sheet.protectSettings.selectUnLockedCells) {
                return;
            }
            var sheetIndex = this.parent.activeSheetIndex;
            var checkCase = this.parent.element.querySelector('.e-findnreplace-checkcase');
            var isCSen = void 0;
            if (!checkCase) {
                isCSen = false;
            }
            else {
                var caseCheckbox = getComponent(checkCase, 'checkbox');
                isCSen = caseCheckbox.checked;
            }
            var checkmatch = this.parent.element.querySelector('.e-findnreplace-checkmatch');
            var isEMatch = void 0;
            if (!checkmatch) {
                isEMatch = false;
            }
            else {
                var entireMatchCheckbox = getComponent(checkmatch, 'checkbox');
                isEMatch = entireMatchCheckbox.checked;
            }
            var searchitem = this.parent.element.querySelector('.e-findnreplace-searchby');
            var searchBy = void 0;
            if (!searchitem) {
                searchBy = 'By Row';
            }
            else {
                var searchDDL = getComponent(searchitem, 'dropdownlist');
                searchBy = searchDDL.value.toString();
            }
            var modeitem = this.parent.element.querySelector('.e-findnreplace-searchwithin');
            var mode = void 0;
            if (!modeitem) {
                mode = 'Sheet';
            }
            else {
                var modeDDL = getComponent(modeitem, 'dropdownlist');
                mode = modeDDL.value.toString();
            }
            var args = {
                value: value, sheetIndex: sheetIndex, findOpt: findOpt.findOption, mode: mode, isCSen: isCSen,
                isEMatch: isEMatch, searchBy: searchBy, isAction: true
            };
            this.parent.find(args);
        }
    };
    FindAndReplace.prototype.replaceHandler = function (action) {
        var dlg = this.parent.element.querySelector('.e-find-dlg');
        var findValue = dlg.querySelector('.e-text-findNext').value;
        var replaceValue = this.parent.element.querySelector('.e-text-replaceInp').value;
        var checkCase = this.parent.element.querySelector('.e-findnreplace-checkcase').checked;
        var checkmatch = this.parent.element.querySelector('.e-findnreplace-checkmatch').checked;
        var searchInValue = this.parent.element.querySelector('.e-search-within .e-ddl-hidden').value;
        var searchByValue = this.parent.element.querySelector('.e-searchby .e-ddl-hidden').value;
        this.parent.notify(action, { value: findValue, mode: searchInValue, isCSen: checkCase, isEMatch: checkmatch, searchBy: searchByValue,
            findOpt: 'next', replaceValue: replaceValue, replaceBy: action, sheetIndex: this.parent.activeSheetIndex, isAction: true });
    };
    FindAndReplace.prototype.gotoHandler = function (address) {
        var isNotAlertShown = true;
        if (address) {
            this.parent.goTo(address.address);
        }
        else {
            var gotoAddress = this.parent.element.querySelector('.e-text-goto').value;
            for (var nameIdx = 0; nameIdx < this.parent.definedNames.length; nameIdx++) {
                if (this.parent.definedNames[nameIdx].name === gotoAddress) {
                    gotoAddress = this.parent.definedNames[nameIdx].refersTo.slice(1);
                    break;
                }
            }
            var addr = gotoAddress;
            if (gotoAddress.includes('!')) {
                addr = gotoAddress.substring(gotoAddress.lastIndexOf('!') + 1);
            }
            addr = addr.split('$').join('');
            if (addr.includes(':')) {
                addr = addr.split(':')[0];
            }
            var rowMatch = addr.match(/\d+/);
            var colMatch = addr.match(/[A-Z]+/i);
            if (!rowMatch || !colMatch || colMatch.index !== 0) {
                this.gotoAlert();
                isNotAlertShown = false;
            }
            else {
                var indexes = getSwapRange(getRangeIndexes(addr));
                var sheet = this.parent.getActiveSheet();
                if (indexes[2] >= 1048576 || indexes[3] >= 16384) {
                    this.gotoAlert();
                    isNotAlertShown = false;
                }
                else if (this.parent.scrollSettings.isFinite && (sheet.rowCount < indexes[2] + 1 || sheet.colCount < indexes[3] + 1)) {
                    this.parent.notify(finiteAlert, null);
                    isNotAlertShown = false;
                }
                else {
                    this.parent.goTo(gotoAddress);
                }
            }
        }
        return isNotAlertShown;
    };
    FindAndReplace.prototype.gotoAlert = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var gotoSpan = this.parent.createElement('span', { className: 'e-goto-alert-span' });
        gotoSpan.innerText = l10n.getConstant('InsertingEmptyValue');
        if (this.parent.element.querySelector('.e-goto-alert-span')) {
            this.parent.element.querySelector('.e-goto-alert-span').remove();
        }
        (this.parent.element.querySelector('.e-goto-dlg').querySelector('.e-dlg-content')).appendChild(gotoSpan);
    };
    FindAndReplace.prototype.showFindAlert = function () {
        if (this.parent.element.querySelector('.e-replace-alert-span')) {
            this.parent.element.querySelector('.e-replace-alert-span').remove();
        }
        var replaceDlgCont = this.parent.element.querySelector('.e-find-dlg .e-dlg-content');
        if (replaceDlgCont) {
            var findSpan = this.parent.createElement('span', { className: 'e-find-alert-span' });
            findSpan.innerText = this.parent.serviceLocator.getService(locale).getConstant('NoElements');
            replaceDlgCont.appendChild(findSpan);
        }
    };
    FindAndReplace.prototype.replaceAllDialog = function (options) {
        if (this.parent.element.querySelector('.e-find-alert-span')) {
            this.parent.element.querySelector('.e-find-alert-span').remove();
        }
        var replaceAlert = this.parent.element.querySelector('.e-replace-alert-span');
        if (replaceAlert) {
            replaceAlert.remove();
        }
        var l10n = (this.parent.serviceLocator.getService(locale));
        var replaceSpan = this.parent.createElement('span', { className: 'e-replace-alert-span' });
        replaceSpan.innerText = options.count + l10n.getConstant('ReplaceAllEnd') + options.replaceValue;
        if (this.parent.element.querySelector('.e-find-dlg')) {
            (this.parent.element.querySelector('.e-find-dlg').querySelector('.e-dlg-content')).appendChild(replaceSpan);
        }
    };
    FindAndReplace.prototype.findKeyUp = function (e) {
        if (e.target.classList.contains('e-text-findNext')) {
            var findValue_1 = this.parent.element.querySelector('.e-text-findNext').value;
            if (!isNullOrUndefined(findValue_1) && findValue_1 !== '') {
                var prevButton = this.parent.element.querySelector('.e-btn-findPrevious');
                var prevButtonObj = getComponent(prevButton, 'btn');
                prevButtonObj.disabled = false;
                getComponent(this.parent.element.querySelector('.e-btn-findNext'), 'btn').disabled = false;
            }
            else {
                getComponent(this.parent.element.querySelector('.e-btn-findPrevious'), 'btn').disabled = true;
                getComponent(this.parent.element.querySelector('.e-btn-findNext'), 'btn').disabled = true;
                this.dialogMessage();
            }
        }
        var findValue = this.parent.element.querySelector('.e-text-findNext').value;
        var replaceValue = this.parent.element.querySelector('.e-text-replaceInp').value;
        if (!isNullOrUndefined(findValue) && !isNullOrUndefined(replaceValue) && (findValue !== '') && (replaceValue !== '')) {
            if (!this.parent.getActiveSheet().isProtected) {
                getComponent(this.parent.element.querySelector('.e-btn-replace'), 'btn').disabled = false;
                getComponent(this.parent.element.querySelector('.e-btn-replaceAll'), 'btn').disabled = false;
            }
        }
        else {
            getComponent(this.parent.element.querySelector('.e-btn-replace'), 'btn').disabled = true;
            getComponent(this.parent.element.querySelector('.e-btn-replaceAll'), 'btn').disabled = true;
        }
    };
    FindAndReplace.prototype.findandreplaceContent = function () {
        if (this.parent.element.querySelector('.e-text-findNext-short')) {
            this.shortValue = this.parent.element.querySelector('.e-text-findNext-short').value;
        }
        var dialogElem = this.parent.createElement('div', { className: 'e-link-dialog' });
        var findElem = this.parent.createElement('div', { className: 'e-find' });
        var findCheck = this.parent.createElement('div', { className: 'e-findCheck' });
        this.divElements.push(dialogElem);
        this.divElements.push(findElem);
        this.divElements.push(findCheck);
        var l10n = this.parent.serviceLocator.getService(locale);
        dialogElem.appendChild(findElem);
        var findTextE = this.parent.createElement('div', { className: 'e-cont' });
        var findTextH = this.parent.createElement('p', { className: 'e-header' });
        findTextH.innerText = l10n.getConstant('FindWhat');
        var findTextIp = this.parent.createElement('input', {
            className: 'e-input e-text-findNext', attrs: {
                'type': 'Text', 'placeholder': l10n.getConstant('FindValue'),
                'value': this.shortValue
            }
        });
        this.divElements.push(findTextE);
        this.paraElements.push(findTextH);
        this.inputElements.push(findTextIp);
        findTextE.appendChild(findTextIp);
        findTextE.insertBefore(findTextH, findTextIp);
        findElem.appendChild(findTextE);
        var findTextBox = new TextBox({ width: '70%' });
        this.textBoxElements.push(findTextBox);
        findTextBox.createElement = this.parent.createElement;
        findTextBox.appendTo(findTextIp);
        var replaceTextE = this.parent.createElement('div', { className: 'e-cont' });
        var replaceTextH = this.parent.createElement('p', { className: 'e-header' });
        replaceTextH.innerText = l10n.getConstant('ReplaceWith');
        var replaceTextIp = this.parent.createElement('input', {
            className: 'e-input e-text-replaceInp', attrs: { 'type': 'Text', 'placeholder': l10n.getConstant('ReplaceValue') }
        });
        this.divElements.push(replaceTextE);
        this.paraElements.push(replaceTextH);
        this.inputElements.push(replaceTextIp);
        replaceTextE.appendChild(replaceTextIp);
        replaceTextE.insertBefore(replaceTextH, replaceTextIp);
        findElem.appendChild(replaceTextE);
        var replaceTextBox = new TextBox({ width: '70%' });
        this.textBoxElements.push(replaceTextBox);
        replaceTextBox.createElement = this.parent.createElement;
        replaceTextBox.appendTo(replaceTextIp);
        var withinData = [
            { Id: 'Sheet', Within: l10n.getConstant('Sheet') },
            { Id: 'Workbook', Within: l10n.getConstant('Workbook') }
        ];
        var withInDDL = new DropDownList({
            dataSource: withinData,
            cssClass: 'e-search-within',
            fields: { value: 'Id', text: 'Within' }, width: '50%', index: 0
        });
        this.dropDownListElements.push(withInDDL);
        var label = l10n.getConstant('SearchWithin');
        var withIn = this.parent.createElement('input', {
            className: 'e-findnreplace-searchwithin', attrs: { type: 'select', label: label }
        });
        var withinTextH = this.parent.createElement('p', { className: 'e-header' });
        withinTextH.innerText = label;
        this.inputElements.push(withIn);
        this.paraElements.push(withinTextH);
        findElem.appendChild(withinTextH);
        findElem.appendChild(withIn);
        withInDDL.createElement = this.parent.createElement;
        withInDDL.appendTo(withIn);
        var searchData = [
            { Id: 'By Row', Search: l10n.getConstant('ByRow') },
            { Id: 'By Column', Search: l10n.getConstant('ByColumn') }
        ];
        var searchDDL = new DropDownList({
            dataSource: searchData,
            cssClass: 'e-searchby',
            fields: { value: 'Id', text: 'Search' }, width: '50%', index: 0
        });
        this.dropDownListElements.push(searchDDL);
        label = l10n.getConstant('SearchBy');
        var searchIn = this.parent.createElement('input', {
            className: 'e-findnreplace-searchby', attrs: { type: 'select', label: label }
        });
        var searchTextH = this.parent.createElement('p', { className: 'e-header' });
        searchTextH.innerText = label;
        this.inputElements.push(searchIn);
        this.paraElements.push(searchTextH);
        findElem.appendChild(searchTextH);
        findElem.appendChild(searchIn);
        searchDDL.createElement = this.parent.createElement;
        searchDDL.appendTo(searchIn);
        var isCSen = new CheckBox({
            label: l10n.getConstant('MatchCase'), checked: false,
            cssClass: 'e-findnreplace-casecheckbox'
        });
        var caaseCheckbox = this.parent.createElement('input', {
            className: 'e-findnreplace-checkcase', attrs: { type: 'checkbox' }
        });
        this.inputElements.push(caaseCheckbox);
        findCheck.appendChild(caaseCheckbox);
        isCSen.createElement = this.parent.createElement;
        isCSen.appendTo(caaseCheckbox);
        var isEMatch = new CheckBox({
            label: l10n.getConstant('MatchExactCellElements'), checked: false,
            cssClass: 'e-findnreplace-exactmatchcheckbox'
        });
        this.checkBoxElements = isEMatch;
        var entirematchCheckbox = this.parent.createElement('input', {
            className: 'e-findnreplace-checkmatch', attrs: { type: 'checkbox' }
        });
        this.inputElements.push(entirematchCheckbox);
        findCheck.appendChild(entirematchCheckbox);
        isEMatch.createElement = this.parent.createElement;
        isEMatch.appendTo(entirematchCheckbox);
        findElem.appendChild(findCheck);
        return dialogElem;
    };
    FindAndReplace.prototype.GotoContent = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogElem = this.parent.createElement('div', { className: 'e-link-dialog' });
        var gotoElem = this.parent.createElement('div', { className: 'e-goto' });
        dialogElem.appendChild(gotoElem);
        var gotoTextE = this.parent.createElement('div', { className: 'e-cont' });
        var gotoTextH = this.parent.createElement('p', { className: 'e-header' });
        gotoTextH.innerText = l10n.getConstant('Reference');
        var gotoTextBox = new TextBox({
            placeholder: l10n.getConstant('EnterCellAddress')
        });
        var gotoTextIp = this.parent.createElement('input', { className: 'e-text-goto', attrs: { 'type': 'Text' } });
        gotoTextE.appendChild(gotoTextIp);
        gotoTextE.insertBefore(gotoTextH, gotoTextIp);
        gotoElem.appendChild(gotoTextE);
        gotoTextBox.createElement = this.parent.createElement;
        gotoTextBox.appendTo(gotoTextIp);
        return dialogElem;
    };
    /**
     * To destroy the find-and-replace module.
     *
     * @returns {void} - To destroy the find-and-replace module.
     */
    FindAndReplace.prototype.destroy = function () {
        this.removeEventListener();
        if (this.findDialog) {
            this.findDialog.hide();
        }
        this.parent = null;
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    FindAndReplace.prototype.getModuleName = function () {
        return 'findAndReplace';
    };
    return FindAndReplace;
}());
export { FindAndReplace };
