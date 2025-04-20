import { classList, addClass, removeClass, isNullOrUndefined, Browser, updateCSSText } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { EventHandler, closest } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { Dialog, calculateRelativeBasedPosition } from '@syncfusion/ej2-popups';
import { createCboxWithWrap, toogleCheckbox, parentsUntil, removeAddCboxClasses, setChecked, resetDialogAppend, Global, appendChildren, getListHeight, infiniteRemoveElements, infiniteAppendElements, clearReactVueTemplates, getObject } from '../base/util';
import { ResponsiveDialogAction } from '../base/enum';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { SearchBox } from '../services/focus-strategy';
import * as literals from '../base/string-literals';
/**
 * The `ColumnChooser` module is used to show or hide columns dynamically.
 */
var ColumnChooser = /** @class */ (function () {
    /**
     * Constructor for the Grid ColumnChooser module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     * @hidden
     */
    function ColumnChooser(parent, serviceLocator) {
        this.filterColumns = [];
        this.showColumn = [];
        this.hideColumn = [];
        this.changedColumns = [];
        this.unchangedColumns = [];
        this.infiniteLoadedElement = [];
        this.isDlgOpen = false;
        this.isColumnChooserOpen = false;
        this.initialOpenDlg = true;
        this.stateChangeColumns = [];
        this.changedStateColumns = [];
        this.isInitialOpen = false;
        this.isCustomizeOpenCC = false;
        this.searchOperator = 'startswith';
        this.itemsCount = 50;
        this.infiniteSkipCount = 0;
        this.infiniteColumns = [];
        this.infiniteInitialLoad = false;
        this.prevInfiniteScrollDirection = '';
        this.prevShowedCols = [];
        this.hideDialogFunction = this.hideDialog.bind(this);
        this.infiniteRenderMode = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.infiniteRenderMode = this.parent.enableColumnVirtualization ? true : false;
        this.addEventListener();
        this.cBoxTrue = createCheckBox(this.parent.createElement, false, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(this.parent.createElement, false, { checked: false, label: ' ' });
        this.cBoxTrue.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
        if (this.parent.cssClass) {
            if (this.parent.cssClass.indexOf(' ') !== -1) {
                addClass([this.cBoxTrue, this.cBoxFalse], this.parent.cssClass.split(' '));
            }
            else {
                addClass([this.cBoxTrue, this.cBoxFalse], [this.parent.cssClass]);
            }
        }
        if (this.parent.enableAdaptiveUI) {
            this.setFullScreenDialog();
        }
    }
    ColumnChooser.prototype.destroy = function () {
        var _this = this;
        var gridElement = this.parent.element;
        if (!gridElement.querySelector('.' + literals.gridContent) && (!gridElement.querySelector('.' + literals.gridHeader)) || !gridElement) {
            return;
        }
        this.removeEventListener();
        this.unWireEvents();
        this.infiniteLoadedElement = null;
        this.infiniteDiv = null;
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.element && !this.dlgObj.isDestroyed) {
            if (this.parent.isReact && this.parent.columnChooserSettings.template) {
                if (!Global.timer) {
                    Global.timer = (setTimeout(function () {
                        if (!isNullOrUndefined(_this.dlgObj) && _this.dlgObj.element && !_this.dlgObj.isDestroyed) {
                            _this.dlgObj.destroy();
                        }
                    }, 0));
                }
                else {
                    clearTimeout(Global.timer);
                    Global.timer = null;
                }
            }
            else {
                this.dlgObj.destroy();
            }
        }
    };
    ColumnChooser.prototype.setFullScreenDialog = function () {
        if (this.serviceLocator) {
            this.serviceLocator.registerAdaptiveService(this, this.parent.enableAdaptiveUI, ResponsiveDialogAction.isColumnChooser);
        }
        if (this.parent.enableAdaptiveUI) {
            this.parent.on(events.renderResponsiveColumnChooserDiv, this.renderResponsiveColumnChooserDiv, this);
            this.parent.on(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction, this);
        }
    };
    ColumnChooser.prototype.rtlUpdate = function () {
        if (!isNullOrUndefined(this.innerDiv)) {
            if (this.parent.enableRtl) {
                addClass([].slice.call(this.innerDiv.getElementsByClassName('e-checkbox-wrapper')), ['e-rtl']);
            }
            else {
                removeClass([].slice.call(this.innerDiv.getElementsByClassName('e-checkbox-wrapper')), ['e-rtl']);
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.add(document, 'click', this.clickHandler, this);
        this.parent.on(events.uiUpdate, this.enableAfterRenderEle, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.addEventListener(events.dataBound, this.hideDialogFunction);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.rtlUpdated, this.rtlUpdate, this);
        this.parent.on(events.resetColumns, this.onResetColumns, this);
        this.parent.on(events.setFullScreenDialog, this.setFullScreenDialog, this);
        if (this.parent.enableAdaptiveUI) {
            this.parent.on(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction, this);
        }
        if (this.infiniteRenderMode || this.parent.enableAdaptiveUI) {
            this.parent.on(events.renderResponsiveColumnChooserDiv, this.renderResponsiveColumnChooserDiv, this);
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(document, 'click', this.clickHandler);
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.uiUpdate, this.enableAfterRenderEle);
        this.parent.off(events.rtlUpdated, this.rtlUpdate);
        this.parent.off(events.resetColumns, this.onResetColumns);
        this.parent.removeEventListener(events.dataBound, this.hideDialogFunction);
        this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
        if (this.infiniteDiv) {
            EventHandler.remove(this.infiniteDiv, 'scroll', this.infiniteScrollHandler);
            EventHandler.remove(this.infiniteDiv, 'mouseup', this.infiniteScrollMouseKeyUpHandler);
            EventHandler.remove(this.infiniteDiv, 'mousedown', this.infiniteScrollMouseKeyDownHandler);
        }
        if (this.parent.enableAdaptiveUI) {
            this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
            this.parent.off(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction);
        }
        if (this.infiniteRenderMode || this.parent.enableAdaptiveUI) {
            this.parent.off(events.renderResponsiveColumnChooserDiv, this.renderResponsiveColumnChooserDiv);
        }
    };
    ColumnChooser.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        if (!this.parent.enableAdaptiveUI) {
            this.renderDlgContent();
        }
        this.getShowHideService = this.serviceLocator.getService('showHideService');
    };
    ColumnChooser.prototype.clickHandler = function (e) {
        var targetElement = e.target;
        if (!this.isCustomizeOpenCC) {
            if (!isNullOrUndefined(closest(targetElement, '.e-cc-toolbar')) || !isNullOrUndefined(closest(targetElement, '.e-cc'))) {
                if (targetElement.classList.contains('e-columnchooser-btn') || targetElement.classList.contains('e-cc-toolbar')) {
                    if ((this.initialOpenDlg && this.dlgObj.visible) || !this.isDlgOpen) {
                        this.isDlgOpen = true;
                        return;
                    }
                }
                else if (targetElement.classList.contains('e-cc-cancel')) {
                    targetElement.parentElement.querySelector('.e-ccsearch').value = '';
                    this.columnChooserSearch('', false);
                    this.removeCancelIcon();
                    this.refreshCheckboxButton();
                }
            }
            else {
                if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible && !targetElement.classList.contains('e-toolbar-items')) {
                    this.dlgObj.hide();
                    this.clearActions();
                    this.refreshCheckboxState();
                    // this.unWireEvents();
                    this.isDlgOpen = false;
                }
            }
            if (this.parent.detailTemplate || this.parent.childGrid) {
                this.targetdlg = e.target;
            }
        }
        if (this.isCustomizeOpenCC && e.target.classList.contains('e-cc-cancel')) {
            this.refreshCheckboxState();
        }
        if (!this.parent.enableAdaptiveUI) {
            this.rtlUpdate();
        }
        else {
            if (this.parent.enableRtl) {
                addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
            }
        }
    };
    ColumnChooser.prototype.hideDialog = function () {
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible) {
            if (this.parent.enableAdaptiveUI) {
                this.responsiveDialogRenderer.hideResponsiveColumnChooser();
            }
            else {
                this.dlgObj.hide();
                // this.unWireEvents();
                this.isDlgOpen = false;
            }
        }
    };
    /**
     * To render columnChooser when showColumnChooser enabled.
     *
     * @param {number} x - specifies the position x
     * @param {number} y - specifies the position y
     * @param {Element} target - specifies the target
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.renderColumnChooser = function (x, y, target) {
        if (!this.dlgObj.visible && (this.parent.detailTemplate || this.parent.childGrid)) {
            this.hideOpenedDialog();
        }
        if (!this.dlgObj.visible) {
            var args = this.beforeOpenColumnChooserEvent();
            if (args.cancel) {
                return;
            }
            args.columns = null;
            if (target) {
                this.targetdlg = target;
            }
            if (this.infiniteRenderMode) {
                this.dlgObj.show();
            }
            this.refreshCheckboxState();
            this.dlgObj.dataBind();
            this.dlgObj.element.style.maxHeight = '430px';
            var elementVisible = this.dlgObj.element.style.display;
            if (!this.parent.columnChooserSettings.enableSearching) {
                var contentElement = this.dlgObj.element.querySelector('.e-dlg-content');
                contentElement.style.margin = '0px';
            }
            this.dlgObj.element.style.display = 'block';
            var isSticky = this.parent.getHeaderContent().classList.contains('e-sticky');
            var toolbarItem = closest(target, '.e-toolbar-item');
            var newpos = void 0;
            if (document.getElementById(this.parent.element.id + '_e-popup') && document.getElementById(this.parent.element.id + '_e-popup').querySelector('.e-ccdlg')) {
                this.parent.element.appendChild(this.dlgObj.element);
            }
            if (isSticky) {
                newpos = toolbarItem.getBoundingClientRect();
                this.dlgObj.element.classList.add('e-sticky');
            }
            else {
                this.dlgObj.element.classList.remove('e-sticky');
                newpos = calculateRelativeBasedPosition(toolbarItem, this.dlgObj.element);
            }
            this.dlgObj.element.style.display = elementVisible;
            this.dlgObj.element.style.top = newpos.top + closest(target, '.e-cc-toolbar').getBoundingClientRect().height + 'px';
            var dlgWidth = 250;
            if (!isNullOrUndefined(closest(target, '.e-bigger'))) {
                this.dlgObj.width = 258;
            }
            if (Browser.isDevice) {
                this.dlgObj.position = { X: 'center', Y: 'center' };
                this.dlgObj.refreshPosition();
                this.dlgObj.open = this.mOpenDlg.bind(this);
            }
            else {
                if (this.parent.enableRtl) {
                    this.dlgObj.element.style.left = target.offsetLeft + 'px';
                }
                else {
                    this.dlgObj.element.style.left = ((newpos.left - dlgWidth) + closest(target, '.e-cc-toolbar').clientWidth) + 2 + 'px';
                }
            }
            this.removeCancelIcon();
            if (!this.infiniteRenderMode) {
                this.dlgObj.show();
            }
            if (this.parent.getContent().firstElementChild.offsetHeight < this.dlgObj.element.offsetHeight &&
                !this.parent.element.classList.contains('e-drillthrough-grid')) {
                resetDialogAppend(this.parent, this.dlgObj);
                if (this.dlgObj.element.querySelector('.e-ccsearch')) {
                    this.dlgObj.element.querySelector('.e-ccsearch').select();
                }
            }
            this.parent.notify(events.columnChooserOpened, { dialog: this.dlgObj });
        }
        else {
            // this.unWireEvents();
            this.hideDialog();
            this.addcancelIcon();
            this.clearActions();
            this.refreshCheckboxState();
        }
        this.rtlUpdate();
    };
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    ColumnChooser.prototype.openColumnChooser = function (X, Y) {
        this.isCustomizeOpenCC = true;
        if (this.parent.enableAdaptiveUI) {
            if (!this.isColumnChooserOpen) {
                this.parent.showResponsiveCustomColumnChooser();
                return;
            }
            this.isColumnChooserOpen = false;
            this.renderDlgContent();
        }
        if (this.dlgObj.visible) {
            this.hideDialog();
            return;
        }
        var args = this.beforeOpenColumnChooserEvent();
        if (args.cancel) {
            return;
        }
        args.columns = null;
        if (this.infiniteRenderMode) {
            this.dlgObj.show();
        }
        if (!this.isInitialOpen) {
            this.dlgObj.content = this.renderChooserList();
            if (!this.parent.columnChooserSettings.template) {
                this.updateIntermediateBtn();
            }
        }
        else {
            this.refreshCheckboxState();
        }
        this.dlgObj.dataBind();
        if (this.infiniteRenderMode) {
            this.refreshCheckboxState();
        }
        this.dlgObj.position = { X: 'center', Y: 'center' };
        if (isNullOrUndefined(X)) {
            if (this.parent.enableAdaptiveUI) {
                this.dlgObj.position = { X: '', Y: '' };
            }
            this.dlgObj.refreshPosition();
        }
        else {
            this.dlgObj.element.style.top = '';
            this.dlgObj.element.style.left = '';
            this.dlgObj.element.style.top = Y + 'px';
            this.dlgObj.element.style.left = X + 'px';
        }
        if (!this.parent.columnChooserSettings.enableSearching) {
            var contentElement = this.dlgObj.element.querySelector('.e-dlg-content');
            contentElement.style.margin = '0px';
        }
        this.dlgObj.beforeOpen = this.customDialogOpen.bind(this);
        if (!this.infiniteRenderMode) {
            this.dlgObj.show();
        }
        if (this.parent.getContent().firstElementChild.offsetHeight < this.dlgObj.element.offsetHeight &&
            !this.parent.element.classList.contains('e-drillthrough-grid')) {
            resetDialogAppend(this.parent, this.dlgObj);
        }
        this.isInitialOpen = true;
        this.dlgObj.beforeClose = this.customDialogClose.bind(this);
    };
    ColumnChooser.prototype.enableAfterRenderEle = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
        }
    };
    ColumnChooser.prototype.keyUpHandler = function (e) {
        if (e.key === 'Escape') {
            this.resetColumnState();
        }
        if (e && e.target && !isNullOrUndefined(closest(e.target, '.e-grid-popup'))) {
            this.parent.trigger('keyPressed', e);
        }
        this.setFocus(parentsUntil(e.target, 'e-cclist'));
    };
    ColumnChooser.prototype.setFocus = function (elem) {
        var prevElem = this.dlgDiv.querySelector('.e-colfocus');
        if (prevElem) {
            prevElem.classList.remove('e-colfocus');
        }
        if (elem) {
            elem.classList.add('e-colfocus');
        }
    };
    ColumnChooser.prototype.customDialogOpen = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.add(searchElement, 'keyup', this.columnChooserManualSearch, this);
    };
    ColumnChooser.prototype.customDialogClose = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.remove(searchElement, 'keyup', this.columnChooserManualSearch);
    };
    ColumnChooser.prototype.getColumns = function () {
        var columns = (this.infiniteRenderMode ? this.infiniteColumns : this.parent.getColumns()).filter(function (column) { return (column.type !== 'checkbox'
            && column.showInColumnChooser === true) || (column.type === 'checkbox' && column.field !== undefined); });
        return columns;
    };
    ColumnChooser.prototype.renderDlgContent = function () {
        var isAdaptive = this.parent.enableAdaptiveUI;
        this.dlgDiv = this.parent.createElement('div', { className: 'e-ccdlg e-cc', id: this.parent.element.id + '_ccdlg' });
        if (!isAdaptive) {
            this.parent.element.appendChild(this.dlgDiv);
        }
        this.dlgObj = new Dialog({
            header: this.parent.enableAdaptiveUI ? null : this.renderHeader(),
            showCloseIcon: false,
            closeOnEscape: false,
            locale: this.parent.locale,
            visible: false,
            enableRtl: this.parent.enableRtl,
            target: document.getElementById(this.parent.element.id),
            content: this.renderChooserList(),
            width: 250,
            cssClass: this.parent.cssClass ? 'e-cc' + ' ' + this.parent.cssClass : 'e-cc',
            animationSettings: { effect: 'None' },
            footerTemplate: this.parent.enableAdaptiveUI ? null : this.renderFooter()
        });
        if (!isAdaptive && (this.infiniteRenderMode || !this.parent.columnChooserSettings.footerTemplate)) {
            this.dlgObj.buttons = [{
                    click: this.confirmDlgBtnClick.bind(this),
                    buttonModel: {
                        content: this.l10n.getConstant('OKButton'), isPrimary: true,
                        cssClass: this.parent.cssClass ? 'e-cc e-cc_okbtn' + ' ' + this.parent.cssClass : 'e-cc e-cc_okbtn'
                    }
                },
                {
                    click: this.clearBtnClick.bind(this),
                    buttonModel: {
                        cssClass: this.parent.cssClass ?
                            'e-flat e-cc e-cc-cnbtn' + ' ' + this.parent.cssClass : 'e-flat e-cc e-cc-cnbtn',
                        content: this.l10n.getConstant('CancelButton')
                    }
                }];
        }
        var isStringTemplate = 'isStringTemplate';
        this.dlgObj["" + isStringTemplate] = true;
        this.dlgObj.appendTo(this.dlgDiv);
        if (isAdaptive) {
            var responsiveCnt = document.querySelector('.e-responsive-dialog > .e-dlg-content > .e-mainfilterdiv');
            if (responsiveCnt) {
                responsiveCnt.appendChild(this.dlgDiv);
            }
            this.dlgObj.open = this.mOpenDlg.bind(this);
            this.dlgObj.target = document.querySelector('.e-rescolumnchooser > .e-dlg-content > .e-mainfilterdiv');
        }
        this.wireEvents();
    };
    /**
     * To render the header template for the column chooser.
     * @returns {HTMLElement | string} This method return HTMLElement or string.
     * @hidden
     */
    ColumnChooser.prototype.renderHeader = function () {
        var gridInstance = this.parent;
        if (gridInstance.columnChooserSettings.headerTemplate && !this.infiniteRenderMode) {
            var templateDiv = this.parent.createElement('div', { className: 'e-columnChooserHeaderTemplate' });
            var templateID = this.parent.element.id + 'columnChooserHeaderTemplate';
            if (this.parent.isReact) {
                this.parent.getColumnChooserHeaderTemplate()(null, this.parent, 'columnChooserHeaderTemplate', templateID, null, null, templateDiv);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(templateDiv, this.parent.getColumnChooserHeaderTemplate()(null, this.parent, 'columnChooserHeaderTemplate', templateID));
            }
            return templateDiv;
        }
        return this.l10n.getConstant('ChooseColumns');
    };
    /**
     * To render the footer template for the column chooser.
     * @returns {HTMLElement | string} This method return HTMLElement or string.
     */
    ColumnChooser.prototype.renderFooter = function () {
        var gridInstance = this.parent;
        if (gridInstance.columnChooserSettings.footerTemplate && !this.infiniteRenderMode) {
            var templateDiv = this.parent.createElement('div', { className: 'e-columnChooserFooterTemplate' });
            var templateID = this.parent.element.id + 'columnChooserFooterTemplate';
            if (this.parent.isReact) {
                this.parent.getColumnChooserFooterTemplate()(null, this.parent, 'columnChooserFooterTemplate', templateID, null, null, templateDiv);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(templateDiv, this.parent.getColumnChooserFooterTemplate()(null, this.parent, 'columnChooserFooterTemplate', templateID));
            }
            return templateDiv;
        }
        return null;
    };
    ColumnChooser.prototype.renderChooserList = function () {
        this.mainDiv = this.parent.createElement('div', { className: 'e-main-div e-cc' });
        var searchDiv = this.parent.createElement('div', { className: 'e-cc-searchdiv e-cc e-input-group' });
        var ccsearchele = this.parent.createElement('input', {
            className: 'e-ccsearch e-cc e-input',
            attrs: { placeholder: this.l10n.getConstant('Search'), cssClass: this.parent.cssClass }
        });
        var ccsearchicon = this.parent.createElement('span', {
            className: 'e-ccsearch-icon e-icons e-cc e-input-group-icon',
            attrs: { title: this.l10n.getConstant('Search') }
        });
        var conDiv = this.parent.createElement('div', { className: 'e-cc-contentdiv' });
        this.innerDiv = this.parent.createElement('div', { className: 'e-innerdiv e-cc' });
        searchDiv.appendChild(ccsearchele);
        searchDiv.appendChild(ccsearchicon);
        this.searchBoxObj = new SearchBox(ccsearchele, this.serviceLocator);
        var columns = this.getColumns();
        var showColumns = [];
        var hideColumns = [];
        columns.forEach(function (column) {
            if (column.visible) {
                showColumns.push(column.headerText);
            }
            else {
                hideColumns.push(column.headerText);
            }
        });
        if (this.infiniteRenderMode && !this.isInitialOpen) {
            columns = this.parent.columns;
            for (var i = 0; i < columns.length; i++) {
                if (columns[parseInt(i.toString(), 10)].showInColumnChooser) {
                    this.infiniteColumns.push(columns[parseInt(i.toString(), 10)]);
                }
            }
        }
        if (this.parent.columnChooserSettings.template && !this.infiniteRenderMode) {
            var templateDiv = this.parent.createElement('div', { className: 'e-columnChooserTemplate' });
            templateDiv.style.cssText = this.parent.enableAdaptiveUI ?
                'height: 90%; min-height: 160px; overflow-y: auto;' : 'height: 196px; overflow-y: auto;';
            var TemplateID = this.parent.element.id + 'columnChooserTemplate';
            var argsData = { columns: columns, hideColumns: hideColumns, showColumns: showColumns };
            if (this.parent.isReact) {
                this.parent.getColumnChooserTemplate()(argsData, this.parent, 'columnChooserTemplate', TemplateID, null, null, templateDiv);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(templateDiv, this.parent.getColumnChooserTemplate()(argsData, this.parent, 'columnChooserTemplate', TemplateID, null, null, null, this.parent.root));
            }
            if (this.parent.columnChooserSettings.renderCustomColumnChooser) {
                if (typeof this.parent.columnChooserSettings.renderCustomColumnChooser === 'function') {
                    this.parent.columnChooserSettings.renderCustomColumnChooser(templateDiv, columns);
                }
                else if (typeof this.parent.columnChooserSettings.renderCustomColumnChooser === 'string') {
                    this.parent.columnChooserSettings.renderCustomColumnChooser =
                        getObject(this.parent.columnChooserSettings.renderCustomColumnChooser, window);
                    this.parent.columnChooserSettings.renderCustomColumnChooser(templateDiv, columns);
                }
            }
            this.mainDiv.appendChild(searchDiv);
            this.mainDiv.appendChild(templateDiv);
        }
        else {
            var innerDivContent = this.refreshCheckboxList(columns);
            this.innerDiv.appendChild(innerDivContent);
            conDiv.appendChild(this.innerDiv);
            if (this.parent.enableAdaptiveUI) {
                var searchBoxDiv = this.parent.createElement('div', { className: 'e-cc-searchBox' });
                searchBoxDiv.appendChild(searchDiv);
                this.mainDiv.appendChild(searchBoxDiv);
            }
            else {
                this.mainDiv.appendChild(searchDiv);
            }
            this.mainDiv.appendChild(conDiv);
        }
        if (!this.parent.columnChooserSettings.enableSearching) {
            searchDiv.style.display = 'none';
        }
        return this.mainDiv;
    };
    ColumnChooser.prototype.confirmDlgBtnClick = function (args) {
        var onActionBeginArgs = {
            requestType: 'columnVisibilityUpdate',
            columns: this.getColumns(),
            cancel: false
        };
        this.parent.trigger(events.actionBegin, onActionBeginArgs);
        if (onActionBeginArgs.cancel) {
            return;
        }
        this.stateChangeColumns = [];
        this.changedStateColumns = [];
        var columns = this.infiniteRenderMode ? this.infiniteColumns : this.parent.getColumns();
        this.changedColumns = (this.changedColumns.length > 0) ? this.changedColumns : this.unchangedColumns;
        this.changedColumnState(this.changedColumns);
        var uncheckedLength = this.infiniteRenderMode ? this.infiniteLoadedElement.filter(function (arr) { return arr.querySelector('.e-uncheck'); }).length : this.ulElement &&
            this.ulElement.querySelector('.e-uncheck') && this.ulElement.querySelectorAll('.e-uncheck:not(.e-selectall)').length;
        if (!isNullOrUndefined(args)) {
            if (uncheckedLength < columns.length) {
                this.changeColumnVisibility({ visibleColumns: this.showColumn, hiddenColumns: this.hideColumn }, 'uid');
                if (this.parent.getCurrentViewRecords().length === 0) {
                    var emptyRowCell = this.parent.element.querySelector('.e-emptyrow').querySelector('td');
                    emptyRowCell.setAttribute('colSpan', this.parent.getVisibleColumns().length.toString());
                }
            }
            if (this.parent.enableAdaptiveUI && this.parent.scrollModule) {
                this.parent.scrollModule.refresh();
            }
            if (this.parent.editSettings.showAddNewRow) {
                this.parent.notify(events.showAddNewRowFocus, {});
            }
        }
        var onActionCompleteArgs = {
            requestType: 'columnVisibilityUpdate',
            columns: this.getColumns(),
            cancel: false
        };
        this.parent.trigger(events.actionComplete, onActionCompleteArgs);
    };
    /**
     * Toggles the visibility of specified columns in the grid.
     * @param {Object} columns - An object specifying the columns to show or hide.
     * @param {string[]} columns.visibleColumns - An array of column identifiers specifying the columns to show.
     * @param {string[]} columns.hiddenColumns - An array of column identifiers specifying the columns to hide.
     * @param {string} columnKey - Defines the column key as a UID, field name, or header text.
     * @returns {void}
     * The 'columns' object contains the properties 'visibleColumns' and 'hiddenColumns' as arrays of column identifiers.
     */
    ColumnChooser.prototype.changeColumnVisibility = function (columns, columnKey) {
        columnKey = columnKey ? columnKey : 'headerText';
        if (columnKey !== 'uid') {
            if (columns.visibleColumns || columns.hiddenColumns) {
                this.stateChangeColumns = [];
                this.changedStateColumns = [];
                var columnChooserColumns = this.getColumns();
                columns.hiddenColumns = columnChooserColumns.filter(function (column) {
                    return columns.hiddenColumns.indexOf(column[columnKey]) !== -1;
                }).map(function (column) { return column.uid; });
                columns.visibleColumns = columnChooserColumns.filter(function (column) {
                    return columns.visibleColumns.indexOf(column[columnKey]) !== -1;
                }).map(function (column) { return column.uid; });
            }
        }
        if (columns.hiddenColumns.length) {
            this.columnStateChange(columns.hiddenColumns, false);
        }
        if (columns.visibleColumns.length) {
            this.columnStateChange(columns.visibleColumns, true);
        }
        this.getShowHideService.setVisible(this.stateChangeColumns, this.changedStateColumns);
        this.clearActions();
        this.parent.notify(events.tooltipDestroy, { module: 'edit' });
    };
    ColumnChooser.prototype.onResetColumns = function (e) {
        if (e.requestType === 'columnstate') {
            this.resetColumnState();
            return;
        }
    };
    ColumnChooser.prototype.renderResponsiveColumnChooserDiv = function (args) {
        if (args.action === 'open') {
            this.isColumnChooserOpen = true;
            this.openColumnChooser();
        }
        else if (args.action === 'clear') {
            this.clearBtnClick();
        }
        else if (args.action === 'confirm') {
            this.confirmDlgBtnClick(true);
        }
    };
    ColumnChooser.prototype.resetColumnState = function () {
        this.showColumn = [];
        this.hideColumn = [];
        this.changedColumns = [];
        this.filterColumns = [];
        this.searchValue = '';
        if (this.infiniteRenderMode) {
            var focusListElement = this.dlgDiv.querySelector('.e-cclist.e-cc-selectall.e-colfocus');
            if (focusListElement) {
                focusListElement.classList.remove('e-colfocus');
            }
        }
        this.hideDialog();
    };
    ColumnChooser.prototype.changedColumnState = function (changedColumns) {
        for (var index = 0; index < changedColumns.length; index++) {
            var colUid = changedColumns[parseInt(index.toString(), 10)];
            var currentColumn = this.parent.getColumnByUid(colUid, this.infiniteRenderMode);
            this.changedStateColumns.push(currentColumn);
        }
    };
    ColumnChooser.prototype.columnStateChange = function (stateColumns, state) {
        for (var index = 0; index < stateColumns.length; index++) {
            var colUid = stateColumns[parseInt(index.toString(), 10)];
            var currentColumn = this.parent.getColumnByUid(colUid, this.infiniteRenderMode);
            if (currentColumn) {
                if (currentColumn.type !== 'checkbox') {
                    currentColumn.visible = state;
                }
                this.stateChangeColumns.push(currentColumn);
            }
        }
    };
    ColumnChooser.prototype.clearActions = function () {
        this.resetColumnState();
        this.addcancelIcon();
    };
    ColumnChooser.prototype.clearBtnClick = function () {
        var onActionBeginArgs = {
            requestType: 'columnChooserClose',
            cancel: false
        };
        this.parent.trigger(events.actionBegin, onActionBeginArgs);
        if (onActionBeginArgs.cancel) {
            return;
        }
        this.clearActions();
        this.parent.notify(events.columnChooserCancelBtnClick, { dialog: this.dlgObj });
        var onActionCompleteArgs = {
            requestType: 'columnChooserClose',
            cancel: false
        };
        this.parent.trigger(events.actionComplete, onActionCompleteArgs);
    };
    ColumnChooser.prototype.checkstatecolumn = function (isChecked, coluid, selectAll) {
        if (selectAll === void 0) { selectAll = false; }
        var currentColumn = this.parent.getColumnByUid(coluid, this.infiniteRenderMode);
        if (isChecked) {
            if (this.hideColumn.indexOf(coluid) !== -1) {
                this.hideColumn.splice(this.hideColumn.indexOf(coluid), 1);
            }
            if (this.showColumn.indexOf(coluid) === -1 && !(currentColumn && currentColumn.visible)) {
                this.showColumn.push(coluid);
            }
        }
        else {
            if (this.showColumn.indexOf(coluid) !== -1) {
                this.showColumn.splice(this.showColumn.indexOf(coluid), 1);
            }
            if (this.hideColumn.indexOf(coluid) === -1 && (currentColumn && currentColumn.visible)) {
                this.hideColumn.push(coluid);
            }
        }
        if (selectAll) {
            if (!isChecked) {
                this.changedColumns.push(coluid);
            }
            else {
                this.unchangedColumns.push(coluid);
            }
        }
        else if (this.changedColumns.indexOf(coluid) !== -1) {
            this.changedColumns.splice(this.changedColumns.indexOf(coluid), 1);
        }
        else {
            this.changedColumns.push(coluid);
        }
    };
    ColumnChooser.prototype.columnChooserSearch = function (searchVal, check) {
        if (check) {
            var onActionBeginArgs = {
                requestType: 'columnChooserSearch',
                columns: this.getColumns(),
                cancel: false
            };
            this.parent.trigger(events.actionBegin, onActionBeginArgs);
            if (onActionBeginArgs.cancel) {
                return;
            }
        }
        var clearSearch = false;
        var okButton;
        var buttonEle = this.dlgDiv.querySelector('.e-footer-content');
        var selectedCheckbox = this.ulElement && this.ulElement.querySelector('.e-check') &&
            this.ulElement.querySelectorAll('.e-check:not(.e-selectall)').length;
        if (this.infiniteRenderMode) {
            selectedCheckbox = this.infiniteLoadedElement.filter(function (arr) { return arr.querySelector('.e-check'); }).length;
        }
        this.isInitialOpen = true;
        if (buttonEle && buttonEle.querySelector('.e-btn')) {
            okButton = buttonEle.querySelector('.e-btn').ej2_instances[0];
        }
        if (searchVal === '') {
            this.removeCancelIcon();
            this.filterColumns = this.getColumns();
            clearSearch = true;
        }
        else {
            this.filterColumns = new DataManager(this.getColumns()).executeLocal(new Query()
                .where('headerText', this.searchOperator, searchVal, true, this.parent.columnChooserSettings.ignoreAccent));
        }
        if (this.infiniteRenderMode) {
            this.updateIfiniteSelectAll();
        }
        if (this.parent.columnChooserSettings.template && !this.infiniteRenderMode) {
            var TemplateElement = void 0;
            var isReactCompiler = this.parent.isReact;
            if (isReactCompiler) {
                clearReactVueTemplates(this.parent, ['columnChooserTemplate']);
                TemplateElement = this.mainDiv.querySelector('.e-columnChooserTemplate');
            }
            else {
                this.mainDiv.querySelector('.e-columnChooserTemplate').remove();
                TemplateElement = this.parent.createElement('div', { className: 'e-columnChooserTemplate' });
                TemplateElement.style.cssText = this.parent.enableAdaptiveUI ?
                    'height: 90%; min-height: 160px; overflow-y: auto;' : 'height: 196px; overflow-y: auto;';
            }
            var TemplateID = this.parent.element.id + 'columnChooserTemplate';
            var chooserColumns = this.filterColumns;
            var searchedValue = searchVal;
            var showColumns_1 = [];
            var hideColumns_1 = [];
            chooserColumns.forEach(function (column) {
                if (column.visible) {
                    showColumns_1.push(column.headerText);
                }
                else {
                    hideColumns_1.push(column.headerText);
                }
            });
            var argsData = {
                columns: chooserColumns,
                hideColumns: hideColumns_1,
                showColumns: showColumns_1,
                searchValue: searchedValue
            };
            if (isReactCompiler) {
                this.parent.getColumnChooserTemplate()(argsData, this.parent, 'columnChooserTemplate', TemplateID, null, null, TemplateElement);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(TemplateElement, this.parent.getColumnChooserTemplate()(argsData, this.parent, 'columnChooserTemplate', TemplateID, null, null, null, this.parent.root));
            }
            if (this.parent.columnChooserSettings.renderCustomColumnChooser) {
                if (typeof this.parent.columnChooserSettings.renderCustomColumnChooser === 'function') {
                    this.parent.columnChooserSettings.renderCustomColumnChooser(TemplateElement, this.filterColumns);
                }
                else if (typeof this.parent.columnChooserSettings.renderCustomColumnChooser === 'string') {
                    this.parent.columnChooserSettings.renderCustomColumnChooser =
                        getObject(this.parent.columnChooserSettings.renderCustomColumnChooser, window);
                    this.parent.columnChooserSettings.renderCustomColumnChooser(TemplateElement, this.filterColumns);
                }
            }
            this.mainDiv.appendChild(TemplateElement);
        }
        else if (this.filterColumns.length) {
            this.innerDiv.innerHTML = ' ';
            this.innerDiv.classList.remove('e-ccnmdiv');
            this.infiniteInitialLoad = true;
            this.infiniteLoadedElement = [];
            this.innerDiv.appendChild(this.refreshCheckboxList(this.filterColumns));
            if (this.infiniteRenderMode) {
                this.mainDiv.querySelector('.e-ccheck .e-selectall').parentElement.classList.remove('e-checkbox-disabled');
                this.updateIntermediateBtn();
            }
            if (!clearSearch) {
                this.addcancelIcon();
                this.refreshCheckboxButton();
            }
            else {
                if (okButton && selectedCheckbox) {
                    okButton.disabled = false;
                }
                if (selectedCheckbox && this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                    this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
                }
            }
        }
        else {
            var nMatchele = this.parent.createElement('span', { className: 'e-cc e-nmatch' });
            nMatchele.innerHTML = this.l10n.getConstant('Matchs');
            this.innerDiv.innerHTML = ' ';
            if (this.infiniteRenderMode) {
                removeClass([this.mainDiv.querySelector('.e-frame.e-selectall')], ['e-check', 'e-stop', 'e-uncheck']);
                this.mainDiv.querySelector('.e-ccheck .e-selectall').parentElement.classList.add('e-checkbox-disabled');
            }
            this.innerDiv.appendChild(nMatchele);
            this.innerDiv.classList.add('e-ccnmdiv');
            if (okButton) {
                okButton.disabled = true;
            }
            if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        this.flag = true;
        this.stopTimer();
        if (check) {
            var onActionCompleteArgs = {
                requestType: 'columnChooserSearch',
                columns: this.getColumns(),
                cancel: false
            };
            this.parent.trigger(events.actionComplete, onActionCompleteArgs);
        }
    };
    ColumnChooser.prototype.updateIfiniteSelectAll = function () {
        this.changedColumns = [];
        this.hideColumn = [];
        this.showColumn = [];
        var unCheckItem = this.infiniteLoadedElement.filter(function (arr) { return arr.querySelector('.e-uncheck'); });
        for (var i = 0; i < unCheckItem.length; i++) {
            this.checkState(unCheckItem[parseInt(i.toString(), 10)].querySelector('.e-frame'), true);
        }
    };
    ColumnChooser.prototype.wireEvents = function () {
        EventHandler.add(this.dlgObj.element, 'click', this.checkBoxClickHandler, this);
        EventHandler.add(this.searchBoxObj.searchBox, 'keyup', this.columnChooserManualSearch, this);
        EventHandler.add(this.dlgObj.element, 'keyup', this.keyUpHandler, this);
        this.searchBoxObj.wireEvent();
    };
    ColumnChooser.prototype.unWireEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.dlgObj && this.dlgObj.element) {
            EventHandler.remove(this.dlgObj.element, 'click', this.checkBoxClickHandler);
            EventHandler.remove(this.dlgObj.element, 'keyup', this.keyUpHandler);
        }
        if (this.searchBoxObj) {
            EventHandler.remove(this.searchBoxObj.searchBox, 'keyup', this.columnChooserManualSearch);
            this.searchBoxObj.unWireEvent();
        }
    };
    ColumnChooser.prototype.checkBoxClickHandler = function (e) {
        if (this.parent.columnChooserSettings.template && !this.infiniteRenderMode) {
            return;
        }
        var checkstate;
        var selectAllElement = parentsUntil(e.target, 'e-checkbox-wrapper');
        var columns = this.infiniteRenderMode ? this.infiniteColumns : this.parent.getColumns();
        if (selectAllElement) {
            var selectAll = selectAllElement.querySelector('.e-selectall');
            if (selectAll) {
                this.updateSelectAll(!selectAllElement.querySelector('.e-check'));
            }
            else {
                toogleCheckbox(selectAllElement.parentElement);
            }
            selectAllElement.querySelector('.e-chk-hidden').focus();
            if (selectAllElement.querySelector('.e-check')) {
                checkstate = true;
            }
            else if (selectAllElement.querySelector('.e-uncheck')) {
                checkstate = false;
            }
            if (!this.infiniteRenderMode) {
                this.updateIntermediateBtn();
            }
            var columnUid = parentsUntil(selectAllElement, 'e-ccheck').getAttribute('uid');
            var column = (this.searchValue && this.searchValue.length) ? this.filterColumns : columns;
            if (columnUid === this.parent.element.id + '-selectAll') {
                this.changedColumns = [];
                this.unchangedColumns = [];
                for (var i = 0; i < column.length; i++) {
                    if (column[parseInt(i.toString(), 10)].showInColumnChooser) {
                        this.checkstatecolumn(checkstate, column[parseInt(i.toString(), 10)].uid, true);
                    }
                }
            }
            else {
                this.checkstatecolumn(checkstate, columnUid);
            }
            var isSelectAll = this.infiniteRenderMode && selectAllElement.querySelector('.e-selectall') &&
                selectAllElement.querySelector('.e-uncheck') ? true : false;
            if (!this.parent.columnChooserSettings.footerTemplate) {
                this.refreshCheckboxButton(isSelectAll);
            }
            this.setFocus(parentsUntil(e.target, 'e-cclist'));
            if (this.infiniteRenderMode) {
                this.updateIntermediateBtn();
            }
        }
    };
    ColumnChooser.prototype.updateIntermediateBtn = function () {
        var count = this.infiniteRenderMode ? this.infiniteLoadedElement.length : this.ulElement.children.length - 1;
        var className = [];
        var hideColumnsCount = 0;
        var showColumnsCount = 0;
        (this.searchValue && this.searchValue.length ? this.filterColumns : this.infiniteColumns).filter(function (column) {
            if (column.visible === false) {
                hideColumnsCount++;
            }
            else {
                showColumnsCount++;
            }
        });
        var selectAllElement = (this.infiniteRenderMode && this.mainDiv.querySelector('.e-cc-selectall') ?
            this.mainDiv.querySelector('.e-cc-selectall') : this.ulElement.children[0]).querySelector('.e-frame');
        var selected = this.infiniteRenderMode ? this.infiniteLoadedElement.filter(function (arr) { return arr.querySelector('.e-check'); }).length : this.ulElement.querySelectorAll('.e-check:not(.e-selectall)').length;
        var btn;
        if (!this.parent.enableAdaptiveUI && !this.parent.columnChooserSettings.footerTemplate) {
            btn = this.dlgObj.btnObj[0];
            btn.disabled = false;
        }
        else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
            this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
        }
        var inputElem = selectAllElement.parentElement.querySelector('input');
        if (count === selected && (!this.infiniteRenderMode || (this.infiniteRenderMode &&
            hideColumnsCount === this.showColumn.length))) {
            className = ['e-check'];
            setChecked(inputElem, true);
        }
        else if (selected || (this.infiniteRenderMode && !selected && showColumnsCount !== this.hideColumn.length)) {
            className = ['e-stop'];
            inputElem.indeterminate = true;
        }
        else {
            className = ['e-uncheck'];
            setChecked(inputElem, false);
            if (btn && !this.parent.enableAdaptiveUI) {
                btn.disabled = true;
            }
            else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        if (btn && !this.parent.enableAdaptiveUI) {
            btn.dataBind();
        }
        removeClass([selectAllElement], ['e-check', 'e-stop', 'e-uncheck']);
        addClass([selectAllElement], className);
    };
    ColumnChooser.prototype.updateSelectAll = function (checked) {
        var checkBoxItems = [].slice.call(this.ulElement.getElementsByClassName('e-frame'));
        if (this.infiniteRenderMode) {
            checkBoxItems = [];
            this.infiniteLoadedElement.map(function (arr) { return checkBoxItems.push(arr.querySelector('.e-frame')); });
            checkBoxItems.unshift(this.mainDiv.querySelector('.e-cc-selectall').querySelector('.e-frame'));
        }
        for (var _i = 0, checkBoxItems_1 = checkBoxItems; _i < checkBoxItems_1.length; _i++) {
            var checkBoxItem = checkBoxItems_1[_i];
            removeAddCboxClasses(checkBoxItem, checked);
            var cBoxInput = checkBoxItem.parentElement.querySelector('input');
            if (checkBoxItem.classList.contains('e-check')) {
                setChecked(cBoxInput, true);
            }
            else if (checkBoxItem.classList.contains('e-uncheck')) {
                setChecked(cBoxInput, false);
            }
        }
    };
    ColumnChooser.prototype.refreshCheckboxButton = function (checkstate) {
        var visibleCols = this.parent.getVisibleColumns();
        for (var i = 0; i < visibleCols.length; i++) {
            var columnUID = visibleCols[parseInt(i.toString(), 10)].uid;
            if (this.prevShowedCols.indexOf(columnUID) === -1 && visibleCols[parseInt(i.toString(), 10)].type !== 'checkbox') {
                this.prevShowedCols.push(columnUID);
            }
        }
        for (var i = 0; i < this.hideColumn.length; i++) {
            var index = this.prevShowedCols.indexOf(this.hideColumn[parseInt(i.toString(), 10)]);
            if (index !== -1) {
                this.prevShowedCols.splice(index, 1);
            }
        }
        var selected = this.showColumn.length !== 0 ? 1 : this.prevShowedCols.length;
        if (this.infiniteRenderMode) {
            selected = this.infiniteLoadedElement.filter(function (arr) { return arr.querySelector('.e-uncheck'); }).length;
        }
        var btn;
        if (!this.parent.enableAdaptiveUI) {
            btn = this.dlgDiv.querySelector('.e-footer-content').querySelector('.e-btn').ej2_instances[0];
            btn.disabled = false;
        }
        else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
            this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
        }
        var sreachShowColumns = [];
        var searchData = [].slice.call(document.getElementsByClassName('e-cc-chbox'));
        for (var i = 0, itemsLen = searchData.length; i < itemsLen; i++) {
            var element = searchData[parseInt(i.toString(), 10)];
            if (this.infiniteRenderMode && element.classList.contains('e-selectall')) {
                continue;
            }
            var columnUID = parentsUntil(element, 'e-ccheck').getAttribute('uid');
            sreachShowColumns.push(columnUID);
        }
        var hideColumns = this.showColumn.filter(function (column) { return sreachShowColumns.indexOf(column) !== -1; });
        if ((this.infiniteRenderMode && (checkstate || sreachShowColumns.length === selected)) ||
            (!this.infiniteRenderMode && selected === 0 && hideColumns.length === 0)) {
            if (!this.parent.enableAdaptiveUI) {
                btn.disabled = true;
            }
            else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        if (!this.parent.enableAdaptiveUI) {
            btn.dataBind();
        }
    };
    ColumnChooser.prototype.refreshCheckboxList = function (chooserColumns) {
        this.ulElement = this.parent.createElement('ul', { className: 'e-ccul-ele e-cc' });
        var selectAllValue = this.l10n.getConstant('SelectAll');
        var columnChooserList = this.parent.createElement('li', { className: 'e-cclist e-cc e-cc-selectall' });
        updateCSSText(columnChooserList, this.infiniteRenderMode ? 'list-style: None;' : '');
        var selectAll = this.createCheckBox(selectAllValue, false, this.parent.element.id + '-selectAll');
        if (chooserColumns.length) {
            selectAll.querySelector('.e-checkbox-wrapper').firstElementChild.classList.add('e-selectall');
            selectAll.querySelector('.e-frame').classList.add('e-selectall');
            this.checkState(selectAll.querySelector('.e-icons'), true);
            columnChooserList.appendChild(selectAll);
            if (this.infiniteRenderMode) {
                if (this.mainDiv.querySelector('.e-cc-contentdiv') && !this.mainDiv.querySelector('.e-cc-selectall')) {
                    this.infiniteDiv = this.mainDiv.querySelector('.e-cc-contentdiv');
                    this.mainDiv.insertBefore(columnChooserList, this.infiniteDiv);
                    this.infiniteDiv.classList.add('e-checkbox-infinitescroll');
                    EventHandler.add(this.infiniteDiv, 'scroll', this.infiniteScrollHandler, this);
                    EventHandler.add(this.infiniteDiv, 'mouseup', this.infiniteScrollMouseKeyUpHandler, this);
                    EventHandler.add(this.infiniteDiv, 'mousedown', this.infiniteScrollMouseKeyDownHandler, this);
                }
            }
            else {
                this.ulElement.appendChild(columnChooserList);
            }
        }
        if (this.parent.cssClass) {
            if (this.parent.cssClass.indexOf(' ') !== -1) {
                addClass([selectAll], this.parent.cssClass.split(' '));
            }
            else {
                addClass([selectAll], [this.parent.cssClass]);
            }
        }
        if (this.infiniteRenderMode && chooserColumns.length > (this.itemsCount * 3)) {
            this.infiniteSkipCount = this.itemsCount * 2;
        }
        this.renderCheckbox(chooserColumns.slice(0, this.infiniteRenderMode ? this.itemsCount * 3 : chooserColumns.length));
        return this.ulElement;
    };
    ColumnChooser.prototype.infiniteScrollMouseKeyDownHandler = function () {
        EventHandler.remove(this.infiniteDiv, 'scroll', this.infiniteScrollHandler);
    };
    ColumnChooser.prototype.infiniteScrollMouseKeyUpHandler = function (e) {
        var _this = this;
        EventHandler.add(this.infiniteDiv, 'scroll', this.infiniteScrollHandler, this);
        var target = this.infiniteDiv;
        if (this.ulElement.children.length > 1 && (target.scrollTop >= target.scrollHeight - target.offsetHeight ||
            target.scrollTop <= 0)) {
            this.infiniteScrollHandler();
        }
        Global.timer = setTimeout(function () { _this.clickHandler(e); Global.timer = null; }, 0);
    };
    ColumnChooser.prototype.infiniteScrollHandler = function () {
        var target = this.infiniteDiv;
        var columns = this.searchValue && this.searchValue.length ? this.filterColumns : this.infiniteColumns;
        if (target.scrollTop >= target.scrollHeight - target.offsetHeight
            && this.infiniteLoadedElement.length <= (this.infiniteSkipCount + this.itemsCount)
            && this.ulElement.children.length === this.itemsCount * 3
            && (!columns.length || columns.length > (this.infiniteSkipCount + this.itemsCount))) {
            var diffcount = columns.length - (this.infiniteSkipCount + this.itemsCount);
            var count = 0;
            if (diffcount < this.itemsCount) {
                count = diffcount;
            }
            infiniteRemoveElements(([].slice.call(this.ulElement.children)).splice(0, this.itemsCount));
            this.infiniteInitialLoad = true;
            this.infiniteSkipCount += this.itemsCount;
            this.renderCheckbox(columns.slice(this.infiniteSkipCount, this.infiniteSkipCount + (count + this.itemsCount)));
            this.prevInfiniteScrollDirection = 'down';
        }
        else if (target.scrollTop >= target.scrollHeight - target.offsetHeight && this.infiniteLoadedElement.length > (this.infiniteSkipCount + this.itemsCount) && this.ulElement.children.length === this.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.ulElement.children)).splice(0, this.itemsCount));
            this.infiniteSkipCount += this.prevInfiniteScrollDirection === 'down' ? this.itemsCount :
                (this.itemsCount * 3);
            appendChildren(this.ulElement, this.infiniteLoadedElement.slice(this.infiniteSkipCount, this.itemsCount +
                this.infiniteSkipCount));
            this.prevInfiniteScrollDirection = 'down';
        }
        else if (target.scrollTop === 0 && !this.infiniteInitialLoad && this.infiniteSkipCount
            && this.infiniteLoadedElement.length && this.infiniteLoadedElement.length > this.itemsCount * 3
            && this.ulElement.children.length === this.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.ulElement.children)).splice(this.itemsCount * 2, this.itemsCount));
            this.infiniteSkipCount -= this.prevInfiniteScrollDirection === 'up' ? this.itemsCount : this.itemsCount * 3;
            infiniteAppendElements([].slice.call(this.infiniteLoadedElement.slice(this.infiniteSkipCount, this.infiniteSkipCount +
                this.itemsCount)), this.ulElement);
            this.prevInfiniteScrollDirection = 'up';
            this.infiniteDiv.scrollTop = this.infiniteScrollAppendDiff;
        }
        else if (target.scrollTop === 0 && !this.infiniteInitialLoad && this.infiniteSkipCount &&
            (this.infiniteSkipCount > this.itemsCount * 2) && this.infiniteLoadedElement.length &&
            this.ulElement.children.length < this.itemsCount * 3) {
            infiniteRemoveElements(([].slice.call(this.ulElement.children)).splice((this.itemsCount * 2), columns.length % this.itemsCount));
            this.infiniteSkipCount = (Math.floor(columns.length / this.itemsCount) - 3) *
                this.itemsCount;
            infiniteAppendElements([].slice.call(this.infiniteLoadedElement.slice(this.infiniteSkipCount, this.infiniteSkipCount +
                this.itemsCount)), this.ulElement);
            this.infiniteDiv.scrollTop = this.infiniteScrollAppendDiff;
            this.prevInfiniteScrollDirection = 'up';
        }
    };
    ColumnChooser.prototype.refreshCheckboxState = function () {
        if (!this.parent.columnChooserSettings.enableSearching) {
            return;
        }
        this.dlgObj.element.querySelector('.e-cc.e-input').value = '';
        this.columnChooserSearch('', false);
        var gridObject = this.parent;
        var currentCheckBoxColls = this.dlgObj.element.querySelectorAll('.e-cc-chbox:not(.e-selectall)');
        for (var i = 0, itemLen = currentCheckBoxColls.length; i < itemLen; i++) {
            var element = currentCheckBoxColls[parseInt(i.toString(), 10)];
            var columnUID = void 0;
            if (this.parent.childGrid || this.parent.detailTemplate) {
                columnUID = parentsUntil(this.dlgObj.element.querySelectorAll('.e-cc-chbox:not(.e-selectall)')[parseInt(i.toString(), 10)], 'e-ccheck').getAttribute('uid');
            }
            else {
                columnUID = parentsUntil(element, 'e-ccheck').getAttribute('uid');
            }
            var column = gridObject.getColumnByUid(columnUID, this.infiniteRenderMode);
            var uncheck = [].slice.call(element.parentElement.getElementsByClassName('e-uncheck'));
            if (column.visible && !uncheck.length) {
                element.checked = true;
                this.checkState(element.parentElement.querySelector('.e-icons'), true);
            }
            else {
                element.checked = false;
                this.checkState(element.parentElement.querySelector('.e-icons'), false);
            }
        }
    };
    ColumnChooser.prototype.checkState = function (element, state) {
        if (state) {
            classList(element, ['e-check'], ['e-uncheck']);
        }
        else {
            classList(element, ['e-uncheck'], ['e-check']);
        }
    };
    ColumnChooser.prototype.createCheckBox = function (label, checked, uid) {
        var cbox = checked ? this.cBoxTrue.cloneNode(true) : this.cBoxFalse.cloneNode(true);
        if (!this.parent.enableAdaptiveUI && this.parent.enableRtl && !cbox.classList.contains('e-rtl')) {
            cbox.classList.add('e-rtl');
        }
        var cboxLabel = cbox.querySelector('.e-label');
        var inputcbox = cbox.querySelector('input');
        setChecked(inputcbox, checked);
        cboxLabel.setAttribute('id', uid + 'label');
        cboxLabel.innerHTML = label;
        inputcbox.setAttribute('aria-labelledby', cboxLabel.id);
        return createCboxWithWrap(uid, cbox, 'e-ccheck');
    };
    ColumnChooser.prototype.renderCheckbox = function (columns) {
        var _a;
        var checkBoxItems = this.parent.createElement('div');
        var offsetHeight = this.ulElement.offsetHeight;
        for (var i = 0; i < columns.length; i++) {
            var column = columns[parseInt(i.toString(), 10)];
            if (column.showInColumnChooser) {
                var columnChooserList = this.parent.createElement('li', { className: 'e-cclist e-cc', id: 'e-ccli_' + column.uid });
                columnChooserList.style.listStyle = 'none';
                var hideColumnState = this.hideColumn.indexOf(column.uid) === -1 ? false : true;
                var showColumnState = this.showColumn.indexOf(column.uid) === -1 ? false : true;
                var columnchooserccheckboxlist = this.createCheckBox(column.headerText, (column.visible && !hideColumnState) || showColumnState, column.uid);
                columnChooserList.appendChild(columnchooserccheckboxlist);
                if (this.parent.cssClass) {
                    if (this.parent.cssClass.indexOf(' ') !== -1) {
                        addClass([columnchooserccheckboxlist], this.parent.cssClass.split(' '));
                    }
                    else {
                        addClass([columnchooserccheckboxlist], [this.parent.cssClass]);
                    }
                }
                if (this.infiniteRenderMode && this.infiniteDiv) {
                    columnChooserList.style.height = getListHeight(this.infiniteDiv, true) + 'px';
                }
                checkBoxItems.appendChild(columnChooserList);
            }
        }
        if (this.infiniteRenderMode && this.infiniteInitialLoad) {
            (_a = this.infiniteLoadedElement).push.apply(_a, [].slice.call(checkBoxItems.children));
            this.infiniteInitialLoad = false;
        }
        appendChildren(this.ulElement, [].slice.call(checkBoxItems.children));
        if (this.infiniteRenderMode && !this.infiniteScrollAppendDiff) {
            this.infiniteScrollAppendDiff = this.ulElement.offsetHeight - offsetHeight;
        }
        if (this.isInitialOpen) {
            this.updateIntermediateBtn();
        }
    };
    ColumnChooser.prototype.columnChooserManualSearch = function (e) {
        this.addcancelIcon();
        this.searchValue = e.target.value;
        this.stopTimer();
        this.startTimer(e);
    };
    ColumnChooser.prototype.startTimer = function (e) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var interval = !proxy.flag && e.keyCode !== 13 ? 500 : 0;
        this.timer = window.setInterval(function () { proxy.columnChooserSearch(proxy.searchValue, true); }, interval);
    };
    ColumnChooser.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    ColumnChooser.prototype.addcancelIcon = function () {
        if (this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon')) {
            this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.add('e-cc-cancel');
            this.dlgDiv.querySelector('.e-cc-cancel').setAttribute('title', this.l10n.getConstant('Clear'));
        }
    };
    ColumnChooser.prototype.removeCancelIcon = function () {
        if (this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon')) {
            this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.remove('e-cc-cancel');
            this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').setAttribute('title', this.l10n.getConstant('Search'));
        }
    };
    ColumnChooser.prototype.mOpenDlg = function () {
        if (Browser.isDevice) {
            if (this.dlgObj.element.querySelector('.e-cc-searchdiv')) {
                this.dlgObj.element.querySelector('.e-cc-searchdiv').classList.remove('e-input-focus');
            }
            if (this.dlgObj.element.querySelectorAll('.e-cc-chbox')[0]) {
                this.dlgObj.element.querySelectorAll('.e-cc-chbox')[0].focus();
            }
        }
        if (this.parent.enableAdaptiveUI) {
            if (this.dlgObj.element.querySelector('.e-cc-searchdiv')) {
                this.dlgObj.element.querySelector('.e-cc-searchdiv').classList.add('e-input-focus');
            }
        }
    };
    // internally use
    ColumnChooser.prototype.getModuleName = function () {
        return 'columnChooser';
    };
    ColumnChooser.prototype.hideOpenedDialog = function () {
        var openCC = [].slice.call(document.getElementsByClassName('e-ccdlg')).filter(function (dlgEle) {
            return dlgEle.classList.contains('e-popup-open');
        });
        for (var i = 0, dlgLen = openCC.length; i < dlgLen; i++) {
            if (this.parent.element.id + '_ccdlg' !== openCC[parseInt(i.toString(), 10)].id || openCC[parseInt(i.toString(), 10)].classList.contains('e-dialog')) {
                openCC[parseInt(i.toString(), 10)].ej2_instances[0].hide();
            }
        }
    };
    ColumnChooser.prototype.beforeOpenColumnChooserEvent = function () {
        var args1 = {
            requestType: 'beforeOpenColumnChooser', element: this.parent.element,
            columns: this.getColumns(), cancel: false,
            searchOperator: this.parent.columnChooserSettings.operator
        };
        this.parent.trigger(events.beforeOpenColumnChooser, args1);
        this.searchOperator = args1.searchOperator;
        return args1;
    };
    ColumnChooser.prototype.renderResponsiveChangeAction = function (args) {
        this.responsiveDialogRenderer.action = args.action;
    };
    /**
     * To show the responsive custom sort dialog
     *
     * @param {boolean} enable - specifes dialog open
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.showCustomColumnChooser = function (enable) {
        this.responsiveDialogRenderer.isCustomDialog = enable;
        this.responsiveDialogRenderer.showResponsiveDialog();
    };
    return ColumnChooser;
}());
export { ColumnChooser };
