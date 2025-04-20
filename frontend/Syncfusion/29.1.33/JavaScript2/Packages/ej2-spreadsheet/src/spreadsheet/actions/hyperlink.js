import { completeAction, isLockedCells } from '../index';
import { initiateHyperlink, locale, dialog, click, keyUp, createHyperlinkElement, getUpdateUsingRaf, focus, readonlyAlert, removeElements } from '../common/index';
import { editHyperlink, openHyperlink, editAlert, removeHyperlink } from '../common/index';
import { isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { getRangeIndexes, getCellIndexes, getRangeAddress } from '../../workbook/common/address';
import { getTypeFromFormat, getCell, isReadOnlyCells } from '../../workbook/index';
import { beforeHyperlinkClick, afterHyperlinkClick, refreshRibbonIcons, deleteHyperlink, beginAction } from '../../workbook/common/event';
import { isCellReference, updateCell, isImported } from '../../workbook/index';
import { Tab, TreeView } from '@syncfusion/ej2-navigations';
/**
 * `Hyperlink` module
 */
var SpreadsheetHyperlink = /** @class */ (function () {
    /**
     * Constructor for Hyperlink module.
     *
     * @param {Spreadsheet} parent - Constructor for Hyperlink module.
     */
    function SpreadsheetHyperlink(parent) {
        this.divElements = [];
        this.inputElements = [];
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the Hyperlink module.
     *
     * @returns {void} - To destroy the Hyperlink module.
     */
    SpreadsheetHyperlink.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    SpreadsheetHyperlink.prototype.addEventListener = function () {
        this.parent.on(initiateHyperlink, this.initiateHyperlinkHandler, this);
        this.parent.on(editHyperlink, this.editHyperlinkHandler, this);
        this.parent.on(openHyperlink, this.openHyperlinkHandler, this);
        this.parent.on(click, this.hyperlinkClickHandler, this);
        this.parent.on(createHyperlinkElement, this.createHyperlinkEle, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
        this.parent.on(deleteHyperlink, this.removeHyperlink, this);
        this.parent.on(removeHyperlink, this.removeHyperlinkHandler, this);
    };
    SpreadsheetHyperlink.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(initiateHyperlink, this.initiateHyperlinkHandler);
            this.parent.off(editHyperlink, this.editHyperlinkHandler);
            this.parent.off(openHyperlink, this.openHyperlinkHandler);
            this.parent.off(click, this.hyperlinkClickHandler);
            this.parent.off(createHyperlinkElement, this.createHyperlinkEle);
            this.parent.off(keyUp, this.keyUpHandler);
            this.parent.off(deleteHyperlink, this.removeHyperlink);
            this.parent.off(removeHyperlink, this.removeHyperlinkHandler);
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    SpreadsheetHyperlink.prototype.getModuleName = function () {
        return 'spreadsheetHyperlink';
    };
    SpreadsheetHyperlink.prototype.keyUpHandler = function (e) {
        var trgt = e.target;
        if (closest(trgt, '.e-document')) {
            var hyperlinkText = document.querySelector('.e-hyp-text');
            var hyperlinkSpan = this.parent.element.querySelector('.e-hyperlink-alert-span');
            var dlgElement = closest(trgt, '.e-hyperlink-dlg') || closest(trgt, '.e-edithyperlink-dlg');
            var footerEle = dlgElement.getElementsByClassName('e-footer-content')[0];
            var insertBut = footerEle.firstChild;
            if (hyperlinkText && !isNullOrUndefined(hyperlinkText.value)) {
                if (!isCellReference(hyperlinkText.value.toUpperCase())) {
                    this.showDialog();
                    insertBut.setAttribute('disabled', 'true');
                }
                else if (hyperlinkSpan) {
                    hyperlinkSpan.remove();
                    insertBut.removeAttribute('disabled');
                }
            }
        }
        if (trgt.classList.contains('e-text') && closest(trgt, '.e-cont')) {
            if (closest(trgt, '.e-webpage') && closest(trgt, '.e-webpage').getElementsByClassName('e-cont')[1] === trgt.parentElement) {
                var dlgEle = closest(trgt, '.e-hyperlink-dlg') || closest(trgt, '.e-edithyperlink-dlg');
                var ftrEle = dlgEle.getElementsByClassName('e-footer-content')[0];
                var insertBut = ftrEle.firstChild;
                if (trgt.value !== '') {
                    insertBut.removeAttribute('disabled');
                }
                else {
                    var linkDialog = closest(trgt, '.e-link-dialog');
                    var webPage = linkDialog.querySelector('.e-webpage');
                    var isUrl = webPage.querySelectorAll('.e-cont')[1].querySelector('.e-text').value ? true : false;
                    if (!isUrl) {
                        insertBut.setAttribute('disabled', 'true');
                    }
                }
            }
        }
    };
    SpreadsheetHyperlink.prototype.initiateHyperlinkHandler = function () {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        if (sheet.isProtected && (!sheet.protectSettings.insertLink || isLockedCells(this.parent))) {
            this.parent.notify(editAlert, null);
            return;
        }
        if (isReadOnlyCells(this.parent)) {
            this.parent.notify(readonlyAlert, null);
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        if (!this.parent.element.querySelector('.e-hyperlink-dlg')) {
            var dialogInst_1 = this.parent.serviceLocator.getService(dialog);
            var displayText_1;
            dialogInst_1.show({
                width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-hyperlink-dlg',
                header: l10n.getConstant('InsertLink'),
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: 'InsertLinkDialog',
                        element: args.element, target: args.target, cancel: args.cancel
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                        return;
                    }
                    dialogInst_1.dialogInstance.content = _this.hyperlinkContent();
                    displayText_1 = dialogInst_1.dialogInstance.content.querySelector('.e-text').value;
                    dialogInst_1.dialogInstance.dataBind();
                    focus(_this.parent.element);
                },
                open: function () {
                    setTimeout(function () {
                        focus(dialogInst_1.dialogInstance.element.querySelectorAll('.e-webpage input')[1]);
                    });
                },
                beforeClose: this.dialogBeforeClose.bind(this),
                buttons: [{
                        buttonModel: {
                            content: l10n.getConstant('Insert'), isPrimary: true, disabled: true
                        },
                        click: function () {
                            _this.dlgClickHandler(displayText_1);
                            dialogInst_1.hide();
                        }
                    }]
            });
        }
    };
    SpreadsheetHyperlink.prototype.dialogBeforeClose = function () {
        var headerTab = this.headerTabs;
        if (headerTab && headerTab.element) {
            headerTab.destroy();
            headerTab.element.remove();
        }
        this.headerTabs = null;
        removeElements(this.inputElements);
        this.inputElements = [];
        removeElements(this.divElements);
        this.divElements = [];
    };
    SpreadsheetHyperlink.prototype.dlgClickHandler = function (displayText) {
        var value;
        var address;
        var sheet = this.parent.getActiveSheet();
        var cellAddress = sheet.name + '!' + sheet.selectedRange;
        var item = this.parent.element.querySelector('.e-link-dialog').
            getElementsByClassName('e-content')[0].querySelector('.e-item.e-active');
        if (item) {
            value = item.getElementsByClassName('e-cont')[0].querySelector('.e-text').value;
            if (value === displayText) {
                value = null;
            }
            if (item.querySelector('.e-webpage')) {
                address = item.getElementsByClassName('e-cont')[1].querySelector('.e-text').value;
                var args = { address: address };
                this.parent.insertHyperlink(args, cellAddress, value, false);
            }
            else {
                address = item.getElementsByClassName('e-cont')[1].querySelector('.e-text').value;
                var dlgContent = item.getElementsByClassName('e-cont')[2];
                if (dlgContent.getElementsByClassName('e-list-item')[0].querySelector('.e-active')) {
                    var sheetName = item.getElementsByClassName('e-cont')[2].querySelector('.e-active').textContent;
                    // const sheets: SheetModel[] = spreadsheetInst.sheets;
                    // for (let idx: number = 0; idx < sheets.length; idx++) {
                    //     if (sheets[idx].name === sheetName) {
                    //         const sheetIdx: number = idx + 1;
                    //     }
                    // }
                    address = sheetName + '!' + address.toUpperCase();
                    var args = { address: address };
                    this.parent.insertHyperlink(args, cellAddress, value, false);
                }
                else if (dlgContent.querySelector('.e-active')) {
                    var definedName = item.getElementsByClassName('e-cont')[2].querySelector('.e-active').textContent;
                    for (var idx = 0; idx < this.parent.definedNames.length; idx++) {
                        if (this.parent.definedNames[idx].name === definedName) {
                            var args = {
                                address: this.parent.definedNames[idx].name
                            };
                            this.parent.insertHyperlink(args, cellAddress, value, false);
                        }
                    }
                }
            }
        }
    };
    SpreadsheetHyperlink.prototype.showDialog = function () {
        if (this.parent.element.querySelector('.e-hyperlink-alert-span')) {
            this.parent.element.querySelector('.e-hyperlink-alert-span').remove();
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var hyperlinkSpan = this.parent.createElement('span', { className: 'e-hyperlink-alert-span' });
        hyperlinkSpan.innerText = l10n.getConstant('HyperlinkAlert');
        var dlgEle = this.parent.element.querySelector('.e-hyperlink-dlg') || this.parent.element.querySelector('.e-edithyperlink-dlg');
        (dlgEle.querySelector('.e-dlg-content')).appendChild(hyperlinkSpan);
    };
    SpreadsheetHyperlink.prototype.editHyperlinkHandler = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var displayText;
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true, cssClass: 'e-edithyperlink-dlg',
            header: l10n.getConstant('EditLink'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'EditLinkDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                    return;
                }
                dialogInst.dialogInstance.content = _this.hyperEditContent();
                displayText = dialogInst.dialogInstance.content.querySelector('.e-text').value;
                dialogInst.dialogInstance.dataBind();
                focus(_this.parent.element);
            },
            open: function () {
                setTimeout(function () {
                    if (dialogInst.dialogInstance.element.querySelector('.e-webpage')) {
                        focus(dialogInst.dialogInstance.element.querySelectorAll('.e-webpage input')[1]);
                    }
                    else {
                        focus(dialogInst.dialogInstance.element.querySelectorAll('.e-document input')[1]);
                    }
                });
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Update'), isPrimary: true
                    },
                    click: function () {
                        _this.dlgClickHandler(displayText);
                        dialogInst.hide();
                    }
                }]
        });
    };
    SpreadsheetHyperlink.prototype.openHyperlinkHandler = function () {
        var cellIndexes = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var trgt = this.parent.getCell(cellIndexes[0], cellIndexes[1]);
        if (trgt.getElementsByClassName('e-hyperlink')[0]) {
            trgt = trgt.querySelector('.e-hyperlink');
        }
        this.hlOpenHandler(trgt);
    };
    SpreadsheetHyperlink.prototype.hlOpenHandler = function (trgt, isClick, event) {
        var _this = this;
        if (trgt.classList.contains('e-hyperlink')) {
            var cellEle = closest(trgt, '.e-cell');
            if (!cellEle) {
                return;
            }
            var range = ['', ''];
            var rangeIndexes = void 0;
            var isEmpty = true;
            var sheet = this.parent.getActiveSheet();
            var colIdx = parseInt(cellEle.getAttribute('aria-colindex'), 10) - 1;
            var rowIdx = parseInt(cellEle.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            var cell = getCell(rowIdx, colIdx, sheet, false, true);
            if (cell.style && cell.style.color === '#00e') {
                updateCell(this.parent, sheet, { rowIdx: rowIdx, colIdx: colIdx, preventEvt: true, cell: { style: { color: '#551a8b' } } });
                cellEle.style.color = '#551a8b';
            }
            var rangeAddr = cell.hyperlink;
            var address = void 0;
            var befArgs = { hyperlink: rangeAddr, address: sheet.activeCell, target: '_blank', cancel: false };
            this.parent.trigger(beforeHyperlinkClick, befArgs);
            if (befArgs.cancel) {
                if (event) {
                    event.preventDefault();
                }
                return;
            }
            rangeAddr = befArgs.hyperlink;
            var aftArgs = { hyperlink: rangeAddr, address: sheet.activeCell };
            if (typeof (rangeAddr) === 'string') {
                address = rangeAddr;
            }
            if (typeof (rangeAddr) === 'object') {
                address = rangeAddr.address;
            }
            var definedNameCheck = address;
            if (address.indexOf('http://') === -1 && address.indexOf('https://') === -1 && address.indexOf('ftp://') === -1) {
                if (!isNullOrUndefined(address)) {
                    if (this.parent.definedNames) {
                        for (var idx = 0; idx < this.parent.definedNames.length; idx++) {
                            if (this.parent.definedNames[idx].name === address) {
                                address = this.parent.definedNames[idx].refersTo;
                                address = address.slice(1);
                                break;
                            }
                        }
                    }
                    if (address.lastIndexOf('!') !== -1) {
                        range[0] = address.substring(0, address.lastIndexOf('!'));
                        if (range[0].startsWith('\'') && range[0].endsWith('\'')) {
                            range[0] = range[0].slice(1, range[0].length - 1);
                        }
                        range[1] = address.substring(address.lastIndexOf('!') + 1);
                    }
                    else {
                        range[0] = this.parent.getActiveSheet().name;
                        range[1] = address;
                    }
                    // selRange = range[1];
                    var sheetIdx_1;
                    for (var idx = 0; idx < this.parent.sheets.length; idx++) {
                        if (this.parent.sheets[idx].name === range[0]) {
                            sheetIdx_1 = idx;
                        }
                    }
                    sheet = this.parent.sheets[sheetIdx_1];
                    if (range[1].indexOf(':') !== -1) {
                        var colIndex = range[1].indexOf(':');
                        var left = range[1].substr(0, colIndex);
                        var right = range[1].substr(colIndex + 1, range[1].length);
                        left = left.replace('$', '');
                        right = right.replace('$', '');
                        if (right.match(/\D/g) && !right.match(/[0-9]/g) && left.match(/\D/g) && !left.match(/[0-9]/g)) {
                            // selRange = left + '1' + ':' + right + sheet.rowCount;
                            left = left + '1';
                            right = right + sheet.rowCount;
                            range[1] = left + ':' + right;
                        }
                        else if (!right.match(/\D/g) && right.match(/[0-9]/g) && !left.match(/\D/g) && left.match(/[0-9]/g)) {
                            // selRange = getCellAddress(parseInt(left, 10) - 1, 0) + ':' +
                            //     getCellAddress(parseInt(right, 10) - 1, sheet.colCount - 1);
                            rangeIndexes = [parseInt(left, 10) - 1, 0, parseInt(right, 10) - 1, sheet.colCount - 1];
                            isEmpty = false;
                        }
                    }
                    var isDefinedNamed = void 0;
                    var definedname = this.parent.definedNames;
                    if (!isNullOrUndefined(definedname)) {
                        for (var idx = 0; idx < definedname.length; idx++) {
                            if (definedname[idx].name === definedNameCheck) {
                                isDefinedNamed = true;
                                break;
                            }
                        }
                    }
                    if (isCellReference(range[1]) || isDefinedNamed) {
                        rangeIndexes = isEmpty ? getRangeIndexes(range[1]) : rangeIndexes;
                        if (!isNullOrUndefined(sheet)) {
                            var rangeAddr_1 = getRangeAddress(rangeIndexes);
                            if (sheet === this.parent.getActiveSheet()) {
                                getUpdateUsingRaf(function () { _this.parent.goTo(rangeAddr_1); });
                            }
                            else {
                                if (rangeAddr_1.indexOf(':') >= 0) {
                                    var addArr = rangeAddr_1.split(':');
                                    rangeAddr_1 = addArr[0] === addArr[1] ? addArr[0] : rangeAddr_1;
                                }
                                getUpdateUsingRaf(function () { _this.parent.goTo(_this.parent.sheets[sheetIdx_1].name + '!' + rangeAddr_1); });
                            }
                        }
                    }
                    else {
                        this.showInvalidHyperlinkDialog();
                    }
                }
            }
            else if (!isClick) {
                if (this.isValidUrl(address)) {
                    window.open(address, befArgs.target);
                }
                else {
                    this.showInvalidHyperlinkDialog();
                }
            }
            this.parent.trigger(afterHyperlinkClick, aftArgs);
        }
    };
    SpreadsheetHyperlink.prototype.isValidUrl = function (url) {
        // eslint-disable-next-line no-useless-escape, security/detect-unsafe-regex
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    };
    SpreadsheetHyperlink.prototype.showInvalidHyperlinkDialog = function () {
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var l10n = this.parent.serviceLocator.getService(locale);
        dialogInst.show({
            width: 323, isModal: true, showCloseIcon: true,
            header: l10n.getConstant('Hyperlink'),
            content: l10n.getConstant('InvalidHyperlinkAlert'),
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'), isPrimary: true
                    },
                    click: function () {
                        dialogInst.hide();
                    }
                }]
        }, false);
    };
    SpreadsheetHyperlink.prototype.hyperlinkClickHandler = function (e) {
        var trgt = e.target;
        if (closest(trgt, '.e-link-dialog') && closest(trgt, '.e-toolbar-item')) {
            var dlgEle = closest(trgt, '.e-hyperlink-dlg') || closest(trgt, '.e-edithyperlink-dlg');
            var ftrEle = dlgEle.getElementsByClassName('e-footer-content')[0];
            var insertBut = ftrEle.firstChild;
            var docEle = dlgEle.querySelector('.e-document');
            var webEle = dlgEle.querySelector('.e-webpage');
            var webEleText = webEle ? webEle.querySelectorAll('.e-cont')[0].querySelector('.e-text').value :
                docEle.querySelectorAll('.e-cont')[0].querySelector('.e-text').value;
            var docEleText = docEle ? docEle.querySelectorAll('.e-cont')[0].querySelector('.e-text').value :
                webEleText;
            var toolbarItems = closest(trgt, '.e-toolbar-items');
            if (toolbarItems.getElementsByClassName('e-toolbar-item')[1].classList.contains('e-active')) {
                var actEle = docEle.querySelectorAll('.e-cont')[2].querySelector('.e-active');
                docEle.querySelectorAll('.e-cont')[0].querySelector('.e-text').value = webEleText;
                if (closest(actEle, '.e-list-item').classList.contains('e-level-2') && insertBut.hasAttribute('disabled')) {
                    insertBut.removeAttribute('disabled');
                }
                else if (closest(actEle, '.e-list-item').classList.contains('e-level-1') && !insertBut.hasAttribute('disabled')) {
                    insertBut.setAttribute('disabled', 'true');
                }
            }
            else {
                var isEmpty = webEle.querySelectorAll('.e-cont')[1].querySelector('.e-text').value ? false : true;
                webEle.querySelectorAll('.e-cont')[0].querySelector('.e-text').value = docEleText;
                if (isEmpty && !insertBut.hasAttribute('disabled')) {
                    insertBut.setAttribute('disabled', 'true');
                }
                else if (!isEmpty && insertBut.hasAttribute('disabled')) {
                    insertBut.removeAttribute('disabled');
                }
            }
        }
        if (closest(trgt, '.e-list-item') && trgt.classList.contains('e-fullrow')) {
            var item = this.parent.element.getElementsByClassName('e-link-dialog')[0];
            if (item) {
                item = item.getElementsByClassName('e-content')[0].getElementsByClassName('e-active')[0];
            }
            else {
                return;
            }
            var cellRef = item.getElementsByClassName('e-cont')[1].getElementsByClassName('e-text')[0];
            var dlgEle = closest(trgt, '.e-hyperlink-dlg') || closest(trgt, '.e-edithyperlink-dlg');
            var ftrEle = dlgEle.getElementsByClassName('e-footer-content')[0];
            var insertBut = ftrEle.firstChild;
            if (closest(trgt, '.e-list-item').classList.contains('e-level-2')) {
                if (closest(trgt, '.e-list-item').getAttribute('data-uid') === 'defName') {
                    if (!cellRef.classList.contains('e-disabled') && !cellRef.hasAttribute('readonly')) {
                        cellRef.setAttribute('readonly', 'true');
                        cellRef.classList.add('e-disabled');
                        cellRef.setAttribute('disabled', 'true');
                    }
                    if (insertBut.hasAttribute('disabled')) {
                        insertBut.removeAttribute('disabled');
                    }
                }
                else if (closest(trgt, '.e-list-item').getAttribute('data-uid') === 'sheet') {
                    if (cellRef.classList.contains('e-disabled') && cellRef.hasAttribute('readonly')) {
                        cellRef.removeAttribute('readonly');
                        cellRef.classList.remove('e-disabled');
                        cellRef.removeAttribute('disabled');
                    }
                    if (isCellReference(cellRef.value.toUpperCase())) {
                        if (insertBut.hasAttribute('disabled')) {
                            insertBut.removeAttribute('disabled');
                        }
                    }
                }
            }
            else if (closest(trgt, '.e-list-item').classList.contains('e-level-1')) {
                insertBut.setAttribute('disabled', 'true');
            }
        }
        else {
            this.hlOpenHandler(trgt, true, e);
        }
    };
    SpreadsheetHyperlink.prototype.createHyperlinkEle = function (args) {
        var cell = args.cell;
        if (!isNullOrUndefined(cell.hyperlink)) {
            var td = args.td;
            var hyperEle = this.parent.createElement('a', { className: 'e-hyperlink e-hyperlink-style' });
            var address = void 0;
            if (typeof cell.hyperlink === 'string') {
                if (cell.hyperlink.toLowerCase().indexOf('www.') === 0) {
                    cell.hyperlink = 'http://' + cell.hyperlink;
                }
                address = cell.hyperlink;
            }
            else {
                address = cell.hyperlink.address;
                if (address.toLowerCase().indexOf('www.') === 0) {
                    cell.hyperlink.address = address = 'http://' + address;
                }
            }
            if (address.indexOf('http://') === 0 || address.indexOf('https://') === 0 || address.indexOf('ftp://') === 0) {
                hyperEle.setAttribute('href', address);
                hyperEle.setAttribute('target', '_blank');
            }
            else if (address.includes('=') || address.includes('!')) {
                hyperEle.setAttribute('ref', address);
            }
            if (getTypeFromFormat(cell.format) === 'Accounting') {
                hyperEle.innerHTML = td.innerHTML;
            }
            else {
                hyperEle.innerText = td.innerText !== '' ? td.innerText : address;
            }
            td.textContent = '';
            td.innerText = '';
            if (this.parent.autoFillSettings.fillType === 'FillWithoutFormatting' || args.fillType === 'FillWithoutFormatting' ||
                args.action === 'Clear Formats') {
                hyperEle.style.textDecoration = 'none';
            }
            td.appendChild(hyperEle);
            if (!args.style.color || !args.style.textDecoration) {
                var style = {};
                if (!args.style.color) {
                    args.style.color = style.color = '#00e';
                }
                if (!args.style.textDecoration) {
                    args.style.textDecoration = style.textDecoration = 'underline';
                }
                updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: args.rowIdx, colIdx: args.colIdx, preventEvt: true,
                    cell: { style: style } });
            }
        }
    };
    SpreadsheetHyperlink.prototype.hyperEditContent = function () {
        var isWeb = true;
        var dialog = this.hyperlinkContent();
        var indexes = getRangeIndexes(this.parent.getActiveSheet().activeCell);
        var cell = this.parent.sheets[this.parent.getActiveSheet().id - 1].rows[indexes[0]].cells[indexes[1]];
        if (this.parent.scrollSettings.enableVirtualization) {
            indexes[0] = indexes[0] - this.parent.viewport.topIndex;
            indexes[1] = indexes[1] - this.parent.viewport.leftIndex;
        }
        var value = this.parent.getDisplayText(cell);
        var address;
        var hyperlink = cell.hyperlink;
        if (typeof (hyperlink) === 'string') {
            address = hyperlink;
            value = value || address;
            if (address.indexOf('http://') === -1 && address.indexOf('https://') === -1 && address.indexOf('ftp://') === -1) {
                isWeb = false;
            }
        }
        else if (typeof (hyperlink) === 'object') {
            address = hyperlink.address;
            value = value || address;
            if (address.indexOf('http://') === -1 && address.indexOf('https://') === -1 && address.indexOf('ftp://') === -1) {
                isWeb = false;
            }
        }
        var definedNamesCount = 0;
        var rangeCount = 0;
        var definedNames = this.parent.definedNames;
        var sheets = this.parent.sheets;
        for (var idx = 0, len = definedNames.length; idx < len; idx++) {
            if (definedNames[idx].name === address) {
                definedNamesCount++;
            }
        }
        for (var idx = 0, len = sheets.length; idx < len; idx++) {
            if (address.includes(sheets[idx].name)) {
                rangeCount++;
            }
        }
        if (definedNamesCount === 0 && rangeCount === 0) {
            isWeb = true;
        }
        var item = dialog.querySelector('.e-content');
        if (isWeb) {
            var webContElem = item.querySelector('.e-webpage');
            webContElem.getElementsByClassName('e-cont')[0].getElementsByClassName('e-text')[0].setAttribute('value', value);
            if (typeof (hyperlink) === 'string') {
                webContElem.getElementsByClassName('e-cont')[1].querySelector('.e-text').setAttribute('value', hyperlink);
            }
            else {
                var address_1 = webContElem.getElementsByClassName('e-cont')[1].querySelector('.e-text');
                address_1.setAttribute('value', hyperlink.address);
            }
        }
        else {
            var isDefinedNamed = void 0;
            var docContElem = item.querySelector('.e-document');
            docContElem.getElementsByClassName('e-cont')[0].getElementsByClassName('e-text')[0].setAttribute('value', value);
            var sheetName = void 0;
            var range = void 0;
            // let sheet: SheetModel = this.parent.getActiveSheet();
            // let sheetIdx: number;
            if (this.parent.definedNames) {
                for (var idx = 0; idx < this.parent.definedNames.length; idx++) {
                    if (this.parent.definedNames[idx].name === address) {
                        isDefinedNamed = true;
                        break;
                    }
                }
            }
            if (isDefinedNamed) {
                var cellRef = docContElem.getElementsByClassName('e-cont')[1].getElementsByClassName('e-text')[0];
                cellRef.setAttribute('readonly', 'true');
                cellRef.classList.add('e-disabled');
                cellRef.setAttribute('disabled', 'true');
                var treeCont = docContElem.getElementsByClassName('e-cont')[2];
                var listEle = treeCont.querySelectorAll('.e-list-item.e-level-1')[1];
                for (var idx = 0; idx < listEle.getElementsByTagName('li').length; idx++) {
                    if (listEle.getElementsByTagName('li')[idx].innerText === address) {
                        listEle.getElementsByTagName('li')[idx].classList.add('e-active');
                    }
                }
            }
            else {
                if (address && address.lastIndexOf('!') !== -1) {
                    var lastIndex = address.lastIndexOf('!');
                    sheetName = address.substring(0, lastIndex);
                    range = address.substring(lastIndex + 1);
                    // sheetIdx = parseInt(rangeArr[0].replace(/\D/g, ''), 10) - 1;
                    // sheet = this.parent.sheets[sheetIdx];
                }
                docContElem.getElementsByClassName('e-cont')[1].querySelector('.e-text').setAttribute('value', range);
                var treeCont = docContElem.getElementsByClassName('e-cont')[2];
                var listEle = treeCont.querySelectorAll('.e-list-item.e-level-1')[0];
                for (var idx = 0; idx < listEle.getElementsByTagName('li').length; idx++) {
                    if (listEle.getElementsByTagName('li')[idx].innerText === sheetName) {
                        if (listEle.getElementsByTagName('li')[idx].classList.contains('e-active')) {
                            break;
                        }
                        else {
                            listEle.getElementsByTagName('li')[idx].classList.add('e-active');
                        }
                    }
                    else {
                        if (listEle.getElementsByTagName('li')[idx].classList.contains('e-active')) {
                            listEle.getElementsByTagName('li')[idx].classList.remove('e-active');
                        }
                    }
                }
            }
        }
        return dialog;
    };
    SpreadsheetHyperlink.prototype.hyperlinkContent = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var idx = 0;
        var selIdx = 0;
        var isWeb = true;
        var isDefinedName;
        var isCellRef = true;
        var address;
        var indexes = getRangeIndexes(this.parent.getActiveSheet().activeCell);
        var sheet = this.parent.getActiveSheet();
        var cell = getCell(indexes[0], indexes[1], sheet);
        var isEnable = true;
        if (cell) {
            if ((cell.value && typeof (cell.value) === 'string' && cell.value.match('[A-Za-z]+') !== null) ||
                cell.value === '' || isNullOrUndefined(cell.value)) {
                isEnable = true;
            }
            else {
                isEnable = false;
            }
            var hyperlink = cell.hyperlink;
            if (typeof (hyperlink) === 'string') {
                var hl = hyperlink;
                if (hl.indexOf('http://') === -1 && hl.indexOf('https://') === -1 && hl.indexOf('ftp://') === -1) {
                    address = hyperlink;
                    isWeb = false;
                }
            }
            else if (typeof (hyperlink) === 'object') {
                var hl = hyperlink.address;
                if (hl.indexOf('http://') === -1 && hl.indexOf('https://') === -1 && hl.indexOf('ftp://') === -1) {
                    address = hyperlink.address;
                    isWeb = false;
                }
            }
            if (address) {
                var defNamesCnt = 0;
                var rangeCnt = 0;
                var definedNames = this.parent.definedNames;
                var sheets_1 = this.parent.sheets;
                for (var idx_1 = 0, len = sheets_1.length; idx_1 < len; idx_1++) {
                    if (address.includes(sheets_1[idx_1].name)) {
                        rangeCnt++;
                    }
                }
                for (var idx_2 = 0, len = definedNames.length; idx_2 < len; idx_2++) {
                    if (definedNames[idx_2].name === address) {
                        defNamesCnt++;
                    }
                }
                if (defNamesCnt === 0 && rangeCnt === 0) {
                    isWeb = true;
                }
            }
            if (isWeb) {
                selIdx = 0;
            }
            else {
                selIdx = 1;
            }
            if (this.parent.definedNames) {
                for (var idx_3 = 0; idx_3 < this.parent.definedNames.length; idx_3++) {
                    if (this.parent.definedNames[idx_3].name === address) {
                        isDefinedName = true;
                        isCellRef = false;
                        break;
                    }
                }
            }
        }
        var dialogElem = this.parent.createElement('div', { className: 'e-link-dialog' });
        var webContElem = this.parent.createElement('div', { className: 'e-webpage' });
        var docContElem = this.parent.createElement('div', { className: 'e-document' });
        this.headerTabs = new Tab({
            selectedItem: selIdx,
            items: [
                {
                    header: { 'text': l10n.getConstant('WebPage') },
                    content: webContElem
                },
                {
                    header: { 'text': l10n.getConstant('ThisDocument') },
                    content: docContElem
                }
            ]
        });
        this.headerTabs.appendTo(dialogElem);
        var indicator = dialogElem.querySelector('.e-toolbar-items').querySelector('.e-indicator');
        if (isWeb) {
            indicator.style.cssText = 'left: 0; right: 136px';
        }
        else {
            indicator.style.cssText = 'left: 136px; right: 0';
        }
        var textCont = this.parent.createElement('div', { className: 'e-cont' });
        var urlCont = this.parent.createElement('div', { className: 'e-cont' });
        var textH = this.parent.createElement('div', { className: 'e-header' });
        textH.innerText = l10n.getConstant('DisplayText');
        var urlH = this.parent.createElement('div', { className: 'e-header' });
        urlH.innerText = l10n.getConstant('Url');
        var textInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'Text' } });
        this.inputElements.push(textInput);
        if (!isEnable) {
            textInput.classList.add('e-disabled');
            textInput.setAttribute('readonly', 'true');
            textInput.setAttribute('disabled', 'true');
        }
        if (cell && isNullOrUndefined(cell.hyperlink)) {
            textInput.setAttribute('value', this.parent.getDisplayText(cell));
        }
        var urlInput = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'Text' } });
        this.inputElements.push(urlInput);
        textInput.setAttribute('placeholder', l10n.getConstant('EnterTheTextToDisplay'));
        urlInput.setAttribute('placeholder', l10n.getConstant('EnterTheUrl'));
        textCont.appendChild(textInput);
        textCont.insertBefore(textH, textInput);
        urlCont.appendChild(urlInput);
        urlCont.insertBefore(urlH, urlInput);
        webContElem.appendChild(urlCont);
        webContElem.insertBefore(textCont, urlCont);
        var cellRef = [];
        var definedName = [];
        var sheets = this.parent.sheets;
        for (idx; idx < this.parent.sheets.length; idx++) {
            var sheetName = this.parent.sheets[idx].name;
            if (this.parent.sheets[idx].state === 'Visible') {
                if (sheets[idx] === this.parent.getActiveSheet()) {
                    cellRef.push({
                        nodeId: 'sheet',
                        nodeText: sheetName.indexOf(' ') !== -1 ? '\'' + sheetName + '\'' : sheetName,
                        selected: true
                    });
                }
                else {
                    cellRef.push({
                        nodeId: 'sheet',
                        nodeText: sheetName.indexOf(' ') !== -1 ? '\'' + sheetName + '\'' : sheetName
                    });
                }
            }
        }
        for (idx = 0; idx < this.parent.definedNames.length; idx++) {
            definedName.push({
                nodeId: 'defName',
                nodeText: this.parent.definedNames[idx].name
            });
        }
        var data = [
            {
                nodeId: '01', nodeText: l10n.getConstant('CellReference'), expanded: isCellRef,
                nodeChild: cellRef
            },
            {
                nodeId: '02', nodeText: l10n.getConstant('DefinedNames'), expanded: isDefinedName,
                nodeChild: definedName
            }
        ];
        var treeObj = new TreeView({
            fields: { dataSource: data, id: 'nodeId', text: 'nodeText', child: 'nodeChild' }
        });
        var cellrefCont = this.parent.createElement('div', { className: 'e-cont' });
        var cellrefH = this.parent.createElement('div', { className: 'e-header' });
        cellrefH.innerText = l10n.getConstant('CellReference');
        var cellrefInput = this.parent.createElement('input', { className: 'e-input e-text e-hyp-text', attrs: { 'type': 'Text' } });
        cellrefInput.setAttribute('value', 'A1');
        this.inputElements.push(cellrefInput);
        cellrefCont.appendChild(cellrefInput);
        cellrefCont.insertBefore(cellrefH, cellrefInput);
        var textCont1 = this.parent.createElement('div', { className: 'e-cont' });
        var textH1 = this.parent.createElement('div', { className: 'e-header' });
        textH1.innerText = l10n.getConstant('DisplayText');
        var textInput1 = this.parent.createElement('input', { className: 'e-input e-text', attrs: { 'type': 'Text' } });
        this.inputElements.push(textInput1);
        if (!isEnable) {
            textInput1.classList.add('e-disabled');
            textInput1.setAttribute('readonly', 'true');
            textInput1.setAttribute('disabled', 'true');
        }
        if (cell && isNullOrUndefined(cell.hyperlink)) {
            textInput1.setAttribute('value', this.parent.getDisplayText(cell));
        }
        textInput1.setAttribute('placeholder', l10n.getConstant('EnterTheTextToDisplay'));
        textCont1.appendChild(textInput1);
        textCont1.insertBefore(textH1, textInput1);
        var sheetCont = this.parent.createElement('div', { className: 'e-cont' });
        var sheetH = this.parent.createElement('div', { className: 'e-header' });
        sheetH.innerText = l10n.getConstant('Sheet');
        var refCont = this.parent.createElement('div', { className: 'e-refcont' });
        this.divElements.push(textCont);
        this.divElements.push(urlCont);
        this.divElements.push(textH);
        this.divElements.push(urlH);
        this.divElements.push(cellrefCont);
        this.divElements.push(cellrefH);
        this.divElements.push(textCont1);
        this.divElements.push(textH1);
        this.divElements.push(sheetCont);
        this.divElements.push(sheetH);
        this.divElements.push(refCont);
        this.divElements.push(docContElem);
        this.divElements.push(webContElem);
        this.divElements.push(dialogElem);
        sheetCont.appendChild(refCont);
        sheetCont.insertBefore(sheetH, refCont);
        docContElem.appendChild(cellrefCont);
        docContElem.insertBefore(textCont1, cellrefCont);
        treeObj.appendTo(refCont);
        docContElem.appendChild(sheetCont);
        return dialogElem;
    };
    SpreadsheetHyperlink.prototype.removeHyperlink = function (args) {
        var cell = getCell(args.rowIdx, args.colIdx, args.sheet);
        if (cell && cell.hyperlink) {
            if (typeof (cell.hyperlink) === 'string') {
                cell.value = cell.value || cell.value === 0 ? cell.value : cell.hyperlink;
            }
            else {
                cell.value = cell.value || cell.value === 0 ? cell.value : cell.hyperlink.address;
            }
            delete (cell.hyperlink);
            if (cell.style) {
                delete cell.style.textDecoration;
                delete cell.style.color;
            }
            if (cell.validation) {
                if (cell.validation.isHighlighted) {
                    if (cell.style.backgroundColor) {
                        cell.style.color = '#ff0000';
                    }
                }
            }
            if (args.sheet === this.parent.getActiveSheet()) {
                if (cell.style) {
                    this.parent.notify(refreshRibbonIcons, null);
                }
                if (!args.preventRefresh) {
                    this.parent.serviceLocator.getService('cell').refresh(args.rowIdx, args.colIdx, false, null, true, false, isImported(this.parent));
                }
            }
        }
    };
    SpreadsheetHyperlink.prototype.removeHyperlinkHandler = function (args) {
        var range = args.range;
        var sheetName;
        var sheet = this.parent.getActiveSheet();
        var sheetIdx;
        if (!args.preventEventTrigger) {
            var eventArgs = { address: range.indexOf('!') === -1 ? sheet.name + '!' + range : range, cancel: false };
            this.parent.notify(beginAction, { action: 'removeHyperlink', eventArgs: eventArgs });
            if (eventArgs.cancel) {
                return;
            }
        }
        if (range && range.indexOf('!') !== -1) {
            var lastIndex = range.lastIndexOf('!');
            sheetName = range.substring(0, lastIndex);
            var sheets = this.parent.sheets;
            for (var idx = 0; idx < sheets.length; idx++) {
                if (sheets[idx].name === sheetName) {
                    sheetIdx = idx;
                }
            }
            sheet = this.parent.sheets[sheetIdx];
            range = range.substring(lastIndex + 1);
        }
        var rangeIndexes = range ? getRangeIndexes(range) : getRangeIndexes(sheet.activeCell);
        var cellEle;
        var classList;
        for (var rowIdx = rangeIndexes[0]; rowIdx <= rangeIndexes[2]; rowIdx++) {
            for (var colIdx = rangeIndexes[1]; colIdx <= rangeIndexes[3]; colIdx++) {
                if (sheet && sheet.rows[rowIdx] && sheet.rows[rowIdx].cells[colIdx]) {
                    classList = [];
                    cellEle = this.parent.getCell(rowIdx, colIdx);
                    if (cellEle) {
                        for (var i = 0; i < cellEle.classList.length; i++) {
                            classList.push(cellEle.classList[i]);
                        }
                    }
                    this.parent.notify(deleteHyperlink, { sheet: sheet, rowIdx: rowIdx, colIdx: colIdx });
                    for (var i = 0; i < classList.length; i++) {
                        if (!cellEle.classList.contains(classList[i])) {
                            cellEle.classList.add(classList[i]);
                        }
                    }
                }
            }
        }
        if (!args.preventEventTrigger) {
            this.parent.notify(completeAction, { action: 'removeHyperlink', eventArgs: { address: range.indexOf('!') === -1 ? sheet.name + '!' + range : range } });
        }
    };
    return SpreadsheetHyperlink;
}());
export { SpreadsheetHyperlink };
