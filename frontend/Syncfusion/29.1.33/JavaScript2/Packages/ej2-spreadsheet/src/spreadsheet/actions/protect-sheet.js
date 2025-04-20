import { applyProtect, protectSheet, protectCellFormat, editAlert, enableFormulaInput, protectWorkbook, keyUp, unProtectSheetPassword, completeAction, setProtectWorkbook, removeWorkbookProtection } from '../common/event';
import { unProtectWorkbook, importProtectWorkbook, hideAutoFillElement } from '../common/event';
import { clearCopy, protectSelection, clearUndoRedoCollection, focus, isLockedCells, toggleProtect } from '../common/index';
import { ListView } from '@syncfusion/ej2-lists';
import { EventHandler, closest, isNullOrUndefined, getInstance } from '@syncfusion/ej2-base';
import { locale, updateToggleItem, dialog } from '../common/index';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { getSheet, protectsheetHandler, getRangeIndexes } from '../../workbook/index';
/**
 * The `Protect-sheet` module is used to handle the Protecting functionalities in Spreadsheet.
 */
var ProtectSheet = /** @class */ (function () {
    /**
     * Constructor for protectSheet module in Spreadsheet.
     *
     * @param {Spreadsheet} parent - Specify the spreadsheet.
     * @private
     */
    function ProtectSheet(parent) {
        this.parent = parent;
        this.init();
    }
    ProtectSheet.prototype.init = function () {
        this.addEventListener();
    };
    /**
     * To destroy the protectSheet module.
     *
     * @returns {void} - To destroy the protectSheet module.
     * @hidden
     */
    ProtectSheet.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    ProtectSheet.prototype.addEventListener = function () {
        this.parent.on(applyProtect, this.protect, this);
        this.parent.on(protectSheet, this.protectSheetHandler, this);
        this.parent.on(editAlert, this.editProtectedAlert, this);
        this.parent.on(protectWorkbook, this.protectWorkbook, this);
        this.parent.on(keyUp, this.KeyUpHandler, this);
        this.parent.on(unProtectWorkbook, this.unProtectWorkbook, this);
        this.parent.on(unProtectSheetPassword, this.unProtectSheetPassword, this);
        this.parent.on(importProtectWorkbook, this.importProtectWorkbook, this);
        this.parent.on(setProtectWorkbook, this.protectWorkbookHandler, this);
        this.parent.on(removeWorkbookProtection, this.removeWorkbookProtection, this);
        this.parent.on(toggleProtect, this.toggleProtect, this);
    };
    ProtectSheet.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applyProtect, this.protect);
            this.parent.off(protectSheet, this.protectSheetHandler);
            this.parent.off(editAlert, this.editProtectedAlert);
            this.parent.off(protectWorkbook, this.protectWorkbook);
            this.parent.off(keyUp, this.KeyUpHandler);
            this.parent.off(unProtectWorkbook, this.unProtectWorkbook);
            this.parent.off(unProtectSheetPassword, this.unProtectSheetPassword);
            this.parent.off(importProtectWorkbook, this.importProtectWorkbook);
            this.parent.off(setProtectWorkbook, this.protectWorkbookHandler);
            this.parent.off(removeWorkbookProtection, this.removeWorkbookProtection);
            this.parent.off(toggleProtect, this.toggleProtect);
        }
    };
    ProtectSheet.prototype.protect = function (args) {
        if (args.isActive) {
            var sheet = this.parent.getActiveSheet();
            if (sheet.isImportProtected) {
                sheet.isImportProtected = false;
            }
        }
        this.parent.notify(clearCopy, null);
        if (!args.isActive) {
            this.createDialogue();
        }
        else {
            this.parent.setSheetPropertyOnMute(getSheet(this.parent, args.sheetIndex), 'isProtected', false);
            this.parent.notify(updateToggleItem, { props: 'Protect' });
            this.parent.notify(protectSheet, args);
            this.parent.notify(protectSelection, null);
        }
    };
    ProtectSheet.prototype.createDialogue = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var listData = [
            { text: l10n.getConstant('SelectCells'), id: '1' },
            { text: l10n.getConstant('SelectUnlockedCells'), id: '6' },
            { text: l10n.getConstant('FormatCells'), id: '2' },
            { text: l10n.getConstant('FormatRows'), id: '3' },
            { text: l10n.getConstant('FormatColumns'), id: '4' },
            { text: l10n.getConstant('InsertLinks'), id: '5' }
        ];
        this.optionList = new ListView({
            dataSource: listData,
            showCheckBox: true,
            select: this.dialogOpen.bind(this)
        });
        var dialogElem = this.parent.createElement('div', { className: 'e-sheet-password-dialog' });
        var pwdCont = this.parent.createElement('div', { className: 'e-sheet-password-content' });
        var textH = this.parent.createElement('div', { className: 'e-header' });
        textH.innerText = l10n.getConstant('SheetPassword');
        var pwdInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        pwdInput.setAttribute('placeholder', l10n.getConstant('EnterThePassword'));
        pwdCont.appendChild(pwdInput);
        pwdCont.insertBefore(textH, pwdInput);
        dialogElem.appendChild(pwdCont);
        var protectHeaderCntent = this.parent.createElement('div', { className: 'e-protect-content' });
        protectHeaderCntent.innerText = l10n.getConstant('ProtectAllowUser');
        this.parent.setSheetPropertyOnMute(this.parent.getActiveSheet(), 'isProtected', false);
        var checkbox = new CheckBox({ checked: true, label: l10n.getConstant('ProtectContent'), cssClass: 'e-protect-checkbox' });
        var listViewElement = this.parent.createElement('div', {
            className: 'e-protect-option-list',
            id: this.parent.element.id + '_option_list'
        });
        var headerContent = this.parent.createElement('div', { className: 'e-header-content' });
        headerContent.innerText = l10n.getConstant('ProtectSheet');
        var checkBoxElement = this.parent.createElement('input', { id: this.parent.element.id + '_protect_check', attrs: { type: 'checkbox' } });
        var protectSheetDlg = this.parent.serviceLocator.getService('dialog');
        var checkBoxClickHandler = function () {
            var ch = getInstance(document.getElementById(_this.parent.element.id + '_protect_check'), CheckBox);
            protectSheetDlg.dialogInstance.element.querySelector('.e-footer-content .e-btn.e-primary').disabled =
                !ch.checked;
        };
        var dlgCanceled;
        protectSheetDlg.show({
            header: headerContent.outerHTML,
            content: dialogElem.outerHTML + checkBoxElement.outerHTML + protectHeaderCntent.outerHTML + listViewElement.outerHTML,
            showCloseIcon: true, isModal: true,
            cssClass: 'e-protect-dlg',
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'ProtectSheetDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    dlgCanceled = args.cancel = true;
                }
                else {
                    focus(_this.parent.element);
                }
            },
            beforeClose: function () {
                if (!dlgCanceled) {
                    EventHandler.remove(checkbox.element, 'click', checkBoxClickHandler);
                }
            },
            buttons: [{
                    click: this.selectOption.bind(this, protectSheetDlg),
                    buttonModel: { content: l10n.getConstant('Ok'), isPrimary: true }
                },
                {
                    click: function () { return protectSheetDlg.hide(); },
                    buttonModel: { content: l10n.getConstant('Cancel') }
                }]
        }, false);
        if (!dlgCanceled) {
            checkbox.appendTo('#' + this.parent.element.id + '_protect_check');
            this.optionList.appendTo('#' + this.parent.element.id + '_option_list');
            this.optionList.selectMultipleItems([{ id: '1' }, { id: '6' }]);
            EventHandler.add(checkbox.element, 'click', checkBoxClickHandler, this);
        }
    };
    ProtectSheet.prototype.dialogOpen = function (args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (args.text === l10n.getConstant('SelectCells') && args.isChecked && args.isInteracted) {
            this.optionList.checkItem({ id: '6' });
        }
        if (args.text === l10n.getConstant('SelectUnlockedCells') && !args.isChecked && args.isInteracted) {
            this.optionList.uncheckItem({ id: '1' });
        }
    };
    ProtectSheet.prototype.selectOption = function (protectSheetDlg) {
        var pwdInput = protectSheetDlg.dialogInstance.element.querySelector('.e-sheet-password-content .e-input');
        var pwd = pwdInput.value;
        if (pwd) {
            this.reEnterSheetPassword(pwd);
        }
        else {
            var sheet = this.parent.getActiveSheet();
            this.parent.setSheetPropertyOnMute(sheet, 'isProtected', true);
            this.parent.setSheetPropertyOnMute(sheet, 'password', pwd);
            this.updateProtectSheet(pwd);
            protectSheetDlg.hide();
            if (!sheet.protectSettings.selectCells && !sheet.protectSettings.selectUnLockedCells) {
                this.parent.notify(hideAutoFillElement, null);
            }
            else if (sheet.protectSettings.selectUnLockedCells && isLockedCells(this.parent, getRangeIndexes(sheet.selectedRange))) {
                this.parent.notify(hideAutoFillElement, null);
            }
        }
    };
    ProtectSheet.prototype.applySheetPwd = function (pwd) {
        var actSheet = this.parent.getActiveSheet();
        this.parent.setSheetPropertyOnMute(actSheet, 'isProtected', true);
        this.parent.setSheetPropertyOnMute(actSheet, 'password', pwd);
        this.updateProtectSheet(pwd);
        if (!actSheet.protectSettings.selectCells && !actSheet.protectSettings.selectUnLockedCells) {
            this.parent.notify(hideAutoFillElement, null);
        }
    };
    ProtectSheet.prototype.updateProtectSheet = function (password) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var selectedItems = this.optionList.getSelectedItems();
        var protectSettings = {
            selectCells: selectedItems.text.indexOf(l10n.getConstant('SelectCells')) > -1,
            formatCells: selectedItems.text.indexOf(l10n.getConstant('FormatCells')) > -1,
            formatRows: selectedItems.text.indexOf(l10n.getConstant('FormatRows')) > -1,
            formatColumns: selectedItems.text.indexOf(l10n.getConstant('FormatColumns')) > -1,
            insertLink: selectedItems.text.indexOf(l10n.getConstant('InsertLinks')) > -1,
            selectUnLockedCells: selectedItems.text.indexOf(l10n.getConstant('SelectUnlockedCells')) > -1
        };
        this.parent.notify(protectsheetHandler, { protectSettings: protectSettings, password: password, triggerEvent: true });
        this.parent.notify(protectSelection, null);
        this.parent.notify(clearUndoRedoCollection, null);
    };
    ProtectSheet.prototype.protectSheetHandler = function (args) {
        var sheetIndex = isNullOrUndefined(args && args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = getSheet(this.parent, sheetIndex);
        var id = this.parent.element.id;
        var disableHomeBtnId = [id + '_undo', id + '_redo', id + '_cut', id + '_copy', id + '_paste', id + '_number_format',
            id + '_font_name', id + '_font_size', id + '_bold', id + '_italic', id + '_line-through', id + '_underline',
            id + '_font_color_picker', id + '_fill_color_picker', id + '_borders', id + '_merge_cells', id + '_text_align',
            id + '_vertical_align', id + '_wrap', id + '_sorting', id + '_clear', id + '_conditionalformatting'];
        var enableHomeBtnId = [id + '_cut', id + '_copy', id + '_number_format', id + '_font_name', id + '_font_size',
            id + '_bold', id + '_italic', id + '_line-through', id + '_underline', id + '_font_color_picker', id + '_fill_color_picker',
            id + '_borders', id + '_text_align', id + '_vertical_align', id + '_wrap', id + '_sorting',
            id + '_clear', id + '_conditionalformatting'];
        var enableFrmlaBtnId = [id + '_insert_function'];
        var enableInsertBtnId = [id + '_hyperlink', id + '_', id + '_chart'];
        var imageBtnId = [id + '_image'];
        var findBtnId = [id + '_find'];
        var dataValidationBtnId = [id + '_datavalidation'];
        var chartBtnId = [id + '_chart'];
        var sheetElement = document.getElementById(this.parent.element.id + '_sheet_panel');
        if (sheetElement) {
            if (sheet.isProtected) {
                if (sheet.protectSettings.selectCells) {
                    sheetElement.classList.remove('e-protected');
                }
                else if (sheet.protectSettings.selectUnLockedCells && !isLockedCells(this.parent, getRangeIndexes(sheet.selectedRange))) {
                    sheetElement.classList.remove('e-protected');
                }
                else {
                    sheetElement.classList.add('e-protected');
                }
            }
            else {
                sheetElement.classList.add('e-protected');
            }
            if (!sheet.isProtected) {
                sheetElement.classList.remove('e-protected');
            }
        }
        this.parent.dataBind();
        this.parent.notify(protectCellFormat, {
            disableHomeBtnId: disableHomeBtnId,
            enableHomeBtnId: enableHomeBtnId, enableFrmlaBtnId: enableFrmlaBtnId, enableInsertBtnId: enableInsertBtnId,
            findBtnId: findBtnId, dataValidationBtnId: dataValidationBtnId, imageBtnId: imageBtnId, chartBtnId: chartBtnId
        });
        this.parent.notify(enableFormulaInput, null);
        if (sheet.isProtected) {
            this.parent.notify(updateToggleItem, { props: 'Protect' });
        }
        if (args && args.triggerEvent) {
            this.parent.notify(completeAction, { action: 'protectSheet', eventArgs: { sheetIndex: sheetIndex, isProtected: sheet.isProtected, password: sheet.password, protectSettings: sheet.protectSettings.properties || sheet.protectSettings } });
        }
    };
    ProtectSheet.prototype.editProtectedAlert = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var protectedAlertDlg = this.parent.serviceLocator.getService('dialog');
        protectedAlertDlg.show({
            content: l10n.getConstant('EditAlert'),
            isModal: true,
            closeOnEscape: true,
            showCloseIcon: true,
            width: '400px',
            cssClass: 'e-editAlert-dlg',
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'EditAlertDialog',
                    content: l10n.getConstant('EditAlert'),
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    protectedAlertDlg.dialogInstance.content = dlgArgs.content;
                    focus(_this.parent.element);
                }
            },
            close: function () { return focus(_this.parent.element); }
        });
    };
    ProtectSheet.prototype.protectWorkbook = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-protectworkbook-dlg',
            header: l10n.getConstant('ProtectWorkbook'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'ProtectWorkbook',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.passwordProtectContent();
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true
                    },
                    click: function () {
                        _this.alertMessage();
                        _this.dlgClickHandler(dialogInst);
                    }
                }]
        });
    };
    ProtectSheet.prototype.passwordProtectContent = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogElem = this.parent.createElement('div', { className: 'e-password-dialog' });
        var pwdCont = this.parent.createElement('div', { className: 'e-password-content' });
        var cnfrmPwdCont = this.parent.createElement('div', { className: 'e-password-content' });
        var textH = this.parent.createElement('div', { className: 'e-header' });
        textH.innerText = l10n.getConstant('Password');
        var urlH = this.parent.createElement('div', { className: 'e-header' });
        urlH.innerText = l10n.getConstant('ConfirmPassword');
        var pwdInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        var cnfrmPwdInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        pwdInput.setAttribute('placeholder', l10n.getConstant('EnterThePassword'));
        cnfrmPwdInput.setAttribute('placeholder', l10n.getConstant('EnterTheConfirmPassword'));
        pwdCont.appendChild(pwdInput);
        pwdCont.insertBefore(textH, pwdInput);
        cnfrmPwdCont.appendChild(cnfrmPwdInput);
        cnfrmPwdCont.insertBefore(urlH, cnfrmPwdInput);
        dialogElem.appendChild(cnfrmPwdCont);
        dialogElem.insertBefore(pwdCont, cnfrmPwdCont);
        return dialogElem;
    };
    ProtectSheet.prototype.KeyUpHandler = function (e) {
        var trgt = e.target;
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-password-content')) {
            if (closest(trgt, '.e-password-dialog') && closest(trgt, '.e-password-dialog').
                getElementsByClassName('e-password-content')[1] === trgt.parentElement) {
                var dlgEle = closest(trgt, '.e-protectworkbook-dlg');
                var ftrEle = dlgEle.getElementsByClassName('e-footer-content')[0];
                var okBtn = ftrEle.firstChild;
                if (trgt.value !== '') {
                    okBtn.removeAttribute('disabled');
                }
                else {
                    okBtn.setAttribute('disabled', 'true');
                }
            }
        }
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-unprotectpwd-content')) {
            if (closest(trgt, '.e-unprotectpwd-dialog') && closest(trgt, '.e-unprotectpwd-dialog').
                getElementsByClassName('e-unprotectpwd-content')[0] === trgt.parentElement) {
                var dlgElement = closest(trgt, '.e-unprotectworkbook-dlg');
                var ftrElement = dlgElement.getElementsByClassName('e-footer-content')[0];
                var okButton = ftrElement.firstChild;
                if (trgt.value !== '') {
                    okButton.removeAttribute('disabled');
                }
                else {
                    okButton.setAttribute('disabled', 'true');
                }
            }
        }
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-reenterpwd-content')) {
            if (closest(trgt, '.e-reenterpwd-dialog') && closest(trgt, '.e-reenterpwd-dialog').
                getElementsByClassName('e-reenterpwd-content')[0] === trgt.parentElement) {
                var dlgCnt = closest(trgt, '.e-reenterpwd-dlg');
                var ftrCnt = dlgCnt.getElementsByClassName('e-footer-content')[0];
                var okBtnElem = ftrCnt.firstChild;
                if (trgt.value !== '') {
                    okBtnElem.removeAttribute('disabled');
                }
                else {
                    okBtnElem.setAttribute('disabled', 'true');
                }
            }
        }
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-unprotectsheetpwd-content')) {
            if (closest(trgt, '.e-unprotectsheetpwd-dialog') && closest(trgt, '.e-unprotectsheetpwd-dialog').
                getElementsByClassName('e-unprotectsheetpwd-content')[0] === trgt.parentElement) {
                var dlg = closest(trgt, '.e-unprotectworksheet-dlg');
                var ftr = dlg.getElementsByClassName('e-footer-content')[0];
                var btn = ftr.firstChild;
                if (trgt.value !== '') {
                    btn.removeAttribute('disabled');
                }
                else {
                    btn.setAttribute('disabled', 'true');
                }
            }
        }
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-importprotectpwd-content')) {
            if (closest(trgt, '.e-importprotectpwd-dialog') && closest(trgt, '.e-importprotectpwd-dialog').
                getElementsByClassName('e-importprotectpwd-content')[0] === trgt.parentElement) {
                var dlgElem = closest(trgt, '.e-importprotectworkbook-dlg');
                var ftrElem = dlgElem.getElementsByClassName('e-footer-content')[0];
                var btn = ftrElem.firstChild;
                if (trgt.value !== '') {
                    btn.removeAttribute('disabled');
                }
                else {
                    btn.setAttribute('disabled', 'true');
                }
            }
        }
    };
    ProtectSheet.prototype.alertMessage = function () {
        var spanElem = this.parent.element.querySelector('.e-pwd-alert-span');
        var unpotectSpanElem = this.parent.element.querySelector('.e-unprotectpwd-alert-span');
        var importpotectSpanElem = this.parent.element.querySelector('.e-importprotectpwd-alert-span');
        var protectSheetSpanElem = this.parent.element.querySelector('.e-reenterpwd-alert-span');
        var unProtectSheetSpanElem = this.parent.element.querySelector('.e-unprotectsheetpwd-alert-span');
        if (spanElem) {
            spanElem.remove();
        }
        if (unpotectSpanElem) {
            unpotectSpanElem.remove();
        }
        if (importpotectSpanElem) {
            importpotectSpanElem.remove();
        }
        if (protectSheetSpanElem) {
            protectSheetSpanElem.remove();
        }
        if (unProtectSheetSpanElem) {
            unProtectSheetSpanElem.remove();
        }
    };
    ProtectSheet.prototype.dlgClickHandler = function (dialogInst) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var pwdVal = this.parent.element.querySelector('.e-password-dialog').
            getElementsByClassName('e-password-content')[0].querySelector('.e-input');
        var cnfrmPwd = this.parent.element.querySelector('.e-password-dialog').
            getElementsByClassName('e-password-content')[1].querySelector('.e-input');
        var pwdSpan = this.parent.createElement('span', {
            className: 'e-pwd-alert-span'
        });
        if (pwdVal.value === cnfrmPwd.value) {
            dialogInst.hide();
            this.parent.notify(updateToggleItem, { props: 'Protectworkbook' });
            this.protectWorkbookHandler({ password: pwdVal.value });
            this.parent.notify(completeAction, { action: 'protectWorkbook', eventArgs: { isProtected: true, password: pwdVal.value } });
        }
        else if (pwdVal.value === '') {
            pwdSpan.textContent = l10n.getConstant('PasswordAlertMsg');
        }
        else if (cnfrmPwd.value === '') {
            pwdSpan.textContent = l10n.getConstant('ConfirmPasswordAlertMsg');
        }
        else if (pwdVal.value !== cnfrmPwd.value) {
            pwdSpan.textContent = l10n.getConstant('PasswordAlert');
        }
        if (dialogInst.dialogInstance) {
            (this.parent.element.querySelector('.e-protectworkbook-dlg').querySelector('.e-dlg-content')).appendChild(pwdSpan);
        }
    };
    ProtectSheet.prototype.protectWorkbookHandler = function (args) {
        this.parent.password = args.password;
        this.parent.isProtected = true;
        if (this.parent.showSheetTabs) {
            this.parent.element.querySelector('.e-add-sheet-tab').setAttribute('disabled', 'true');
            this.parent.element.querySelector('.e-add-sheet-tab').classList.add('e-disabled');
        }
        this.parent.notify(updateToggleItem, { props: 'Protectworkbook' });
    };
    ProtectSheet.prototype.unProtectWorkbook = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-unprotectworkbook-dlg',
            header: l10n.getConstant('UnprotectWorkbook'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'UnprotectWorkbook',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.unProtectPasswordContent();
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true, disabled: true
                    },
                    click: function () {
                        _this.alertMessage();
                        _this.unprotectdlgOkClick(dialogInst);
                    }
                }]
        });
    };
    ProtectSheet.prototype.unProtectsheet = function (isImportedSheet) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-unprotectworksheet-dlg',
            header: l10n.getConstant('UnprotectWorksheet'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'UnProtectSheet',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.unProtectSheetPasswordContent();
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true, disabled: this.parent.allowOpen && this.parent.openModule.isImportedFile &&
                            (this.parent.openModule.unProtectSheetIdx.indexOf(this.parent.activeSheetIndex) === -1) ? false : true
                    },
                    click: function () {
                        _this.alertMessage();
                        _this.unprotectSheetdlgOkClick(dialogInst, isImportedSheet);
                    }
                }]
        });
    };
    ProtectSheet.prototype.reEnterSheetPassword = function (pwd) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var protectSheetDlgInst = dialogInst.dialogInstance;
        var dlgCancel;
        var pwdApplied;
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-reenterpwd-dlg',
            header: l10n.getConstant('ConfirmPassword'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'Re-enterPassword',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    dlgCancel = args.cancel = true;
                }
                else {
                    var l10n_1 = _this.parent.serviceLocator.getService(locale);
                    var dialogCont = _this.parent.createElement('div', { className: 'e-reenterpwd-dialog' });
                    var pwdCont = _this.parent.createElement('div', { className: 'e-reenterpwd-content' });
                    var textH = _this.parent.createElement('div', { className: 'e-header' });
                    textH.innerText = l10n_1.getConstant('ReEnterPassword');
                    var pwdInput = _this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
                    pwdCont.appendChild(pwdInput);
                    pwdCont.insertBefore(textH, pwdInput);
                    dialogCont.appendChild(pwdCont);
                    dialogInst.dialogInstance.content = dialogCont;
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element.querySelector('.e-protect-dlg.e-dialog .e-footer-content .e-btn'));
                }
            },
            close: function () {
                dialogInst.dialogInstance = protectSheetDlgInst;
                if (dlgCancel) {
                    _this.applySheetPwd(pwd);
                    dialogInst.hide(true);
                }
                else if (pwdApplied) {
                    dialogInst.hide(true);
                }
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true, disabled: true
                    },
                    click: function () {
                        _this.alertMessage();
                        var l10n = _this.parent.serviceLocator.getService(locale);
                        var cnfrmPwdInput = _this.parent.element.querySelector('.e-reenterpwd-dialog .e-reenterpwd-content .e-input');
                        var cnfrmPwd = cnfrmPwdInput.value;
                        if (pwd === cnfrmPwd) {
                            _this.applySheetPwd(pwd);
                            pwdApplied = true;
                            dialogInst.hide();
                        }
                        else {
                            var pwdSpan = _this.parent.createElement('span', { className: 'e-reenterpwd-alert-span' });
                            if (!cnfrmPwd) {
                                pwdSpan.textContent = l10n.getConstant('ConfirmPasswordAlertMsg');
                            }
                            else {
                                pwdSpan.textContent = l10n.getConstant('PasswordAlert');
                            }
                            (_this.parent.element.querySelector('.e-reenterpwd-dlg').querySelector('.e-reenterpwd-dialog')).appendChild(pwdSpan);
                        }
                    }
                }]
        });
    };
    ProtectSheet.prototype.unProtectPasswordContent = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dlgElem = this.parent.createElement('div', { className: 'e-unprotectpwd-dialog' });
        var pwdCont = this.parent.createElement('div', { className: 'e-unprotectpwd-content' });
        var textHeader = this.parent.createElement('div', { className: 'e-header' });
        textHeader.innerText = l10n.getConstant('EnterThePassword');
        var pwdInputElem = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        pwdCont.appendChild(pwdInputElem);
        pwdCont.insertBefore(textHeader, pwdInputElem);
        dlgElem.appendChild(pwdCont);
        return dlgElem;
    };
    ProtectSheet.prototype.unProtectSheetPasswordContent = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogCnt = this.parent.createElement('div', { className: 'e-unprotectsheetpwd-dialog' });
        var pwdCnt = this.parent.createElement('div', { className: 'e-unprotectsheetpwd-content' });
        var textH = this.parent.createElement('div', { className: 'e-header' });
        textH.innerText = l10n.getConstant('EnterThePassword');
        var pwdInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        pwdCnt.appendChild(pwdInput);
        pwdCnt.insertBefore(textH, pwdInput);
        dialogCnt.appendChild(pwdCnt);
        return dialogCnt;
    };
    ProtectSheet.prototype.unprotectdlgOkClick = function (dialogInst) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var pwd = this.parent.element.querySelector('.e-unprotectpwd-dialog').
            getElementsByClassName('e-unprotectpwd-content')[0].querySelector('.e-input');
        if (this.parent.password === pwd.value) {
            dialogInst.hide();
            this.removeWorkbookProtection();
            this.parent.notify(completeAction, { action: 'protectWorkbook', eventArgs: { isProtected: false } });
        }
        else {
            var pwdSpan = this.parent.createElement('span', { className: 'e-unprotectpwd-alert-span' });
            pwdSpan.innerText = l10n.getConstant('UnprotectPasswordAlert');
            (this.parent.element.querySelector('.e-unprotectworkbook-dlg').querySelector('.e-dlg-content')).appendChild(pwdSpan);
        }
    };
    ProtectSheet.prototype.removeWorkbookProtection = function () {
        this.parent.password = '';
        this.parent.isProtected = false;
        if (this.parent.showSheetTabs) {
            this.parent.element.querySelector('.e-add-sheet-tab').removeAttribute('disabled');
            this.parent.element.querySelector('.e-add-sheet-tab').classList.remove('e-disabled');
        }
        var elem = document.getElementById(this.parent.element.id + '_protectworkbook');
        if (elem) {
            elem.classList.remove('e-active');
        }
        this.parent.notify(updateToggleItem, { props: 'Protectworkbook' });
    };
    ProtectSheet.prototype.unprotectSheetdlgOkClick = function (dialogInst, isImportedSheet) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var sheet = this.parent.getActiveSheet();
        var pwd = this.parent.element.querySelector('.e-unprotectsheetpwd-dialog').
            getElementsByClassName('e-unprotectsheetpwd-content')[0].querySelector('.e-input');
        if (isImportedSheet && sheet.password.length === 0) {
            var impArgs = {
                sheetPassword: pwd.value,
                sheetIndex: this.parent.activeSheetIndex
            };
            this.parent.open(impArgs);
        }
        else {
            if (sheet.password === pwd.value) {
                dialogInst.hide();
                this.unProtectSheetPassword();
            }
            else {
                var pwdSpan = this.parent.createElement('span', { className: 'e-unprotectsheetpwd-alert-span' });
                pwdSpan.innerText = l10n.getConstant('UnprotectPasswordAlert');
                (this.parent.element.querySelector('.e-unprotectworksheet-dlg').querySelector('.e-dlg-content')).appendChild(pwdSpan);
            }
        }
    };
    ProtectSheet.prototype.unProtectSheetPassword = function () {
        var sheet = this.parent.getActiveSheet();
        var sheetIdx = this.parent.activeSheetIndex;
        this.parent.setSheetPropertyOnMute(sheet, 'isProtected', !sheet.isProtected);
        this.parent.setSheetPropertyOnMute(sheet, 'password', '');
        var isActive = sheet.isProtected ? false : true;
        this.parent.notify(applyProtect, { isActive: isActive, id: this.parent.element.id + '_protect', sheetIndex: sheetIdx, triggerEvent: true });
        if (this.parent.allowOpen && this.parent.openModule.isImportedFile &&
            this.parent.openModule.unProtectSheetIdx.indexOf(sheetIdx) === -1) {
            this.parent.openModule.unProtectSheetIdx.push(sheetIdx);
        }
    };
    ProtectSheet.prototype.importProtectWorkbook = function (fileArgs) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-importprotectworkbook-dlg',
            header: l10n.getConstant('UnprotectWorkbook'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'ImportProtectWorkbook',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialogInst.dialogInstance.content = _this.importProtectPasswordContent(fileArgs);
                    dialogInst.dialogInstance.dataBind();
                    focus(_this.parent.element);
                }
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true, disabled: true
                    },
                    click: function () {
                        _this.alertMessage();
                        _this.importOkClick(fileArgs);
                    }
                }]
        });
    };
    ProtectSheet.prototype.importProtectPasswordContent = function (args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogElem = this.parent.createElement('div', { className: 'e-importprotectpwd-dialog' });
        var pwdCont = this.parent.createElement('div', { className: 'e-importprotectpwd-content' });
        var textSpan = this.parent.createElement('span', { className: 'e-header' });
        textSpan.innerText = '"' + args.file.name + '"' + ' ' + l10n.getConstant('IsProtected');
        var pwdInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'password' } });
        pwdInput.setAttribute('placeholder', l10n.getConstant('EnterThePassword'));
        pwdCont.appendChild(textSpan);
        pwdCont.appendChild(pwdInput);
        dialogElem.appendChild(pwdCont);
        return dialogElem;
    };
    ProtectSheet.prototype.importOkClick = function (args) {
        var pwd = this.parent.element.querySelector('.e-importprotectpwd-dialog').
            getElementsByClassName('e-importprotectpwd-content')[0].querySelector('.e-input');
        this.parent.password = pwd.value;
        var impArgs = {
            file: args.file,
            password: pwd.value
        };
        this.parent.open(impArgs);
    };
    ProtectSheet.prototype.toggleProtect = function () {
        var isActive;
        var parentId = this.parent.element.id;
        var sheet = this.parent.getActiveSheet();
        if (sheet.isProtected && this.parent.allowOpen && sheet.isImportProtected && this.parent.openModule.isImportedFile &&
            this.parent.openModule.unProtectSheetIdx.indexOf(this.parent.activeSheetIndex) === -1) {
            this.unProtectsheet(true);
        }
        else if (sheet.password && sheet.password.length > 0) {
            this.unProtectsheet();
        }
        else {
            this.parent.setSheetPropertyOnMute(sheet, 'isProtected', !sheet.isProtected);
            isActive = sheet.isProtected ? false : true;
            this.parent.notify(applyProtect, { isActive: isActive, id: parentId + '_protect', sheetIndex: this.parent.activeSheetIndex, triggerEvent: true });
        }
    };
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     *
     * @private
     */
    ProtectSheet.prototype.getModuleName = function () {
        return 'protectSheet';
    };
    return ProtectSheet;
}());
export { ProtectSheet };
