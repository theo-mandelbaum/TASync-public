import { Toolbar as tool, Menu } from '@syncfusion/ej2-navigations';
import { remove, createElement, formatUnit, getInstance, addClass, removeClass, select, SanitizeHtmlHelper, setValue } from '@syncfusion/ej2-base';
import * as events from '../../common/base/constant';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as cls from '../../common/base/css-constant';
import { PivotView } from '../../pivotview/base/pivotview';
import { Deferred } from '@syncfusion/ej2-data';
import { CheckBox } from '@syncfusion/ej2-buttons';
/**
 * Module for Toolbar
 */
/** @hidden */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent) {
        /** @hidden */
        this.isMultiAxisChange = false;
        /** @hidden */
        this.isReportChange = false;
        this.currentReport = '';
        this.parent = parent;
        this.parent.toolbarModule = this;
        this.addEventListener();
    }
    /**
     * It returns the Module name.
     *
     * @returns {string} - string
     * @hidden
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    Toolbar.prototype.createToolbar = function () {
        this.parent.isModified = false;
        this.renderDialog();
        if (select('#' + this.parent.element.id + 'pivot-toolbar', this.parent.element) !== null) {
            remove(select('#' + this.parent.element.id + 'pivot-toolbar', this.parent.element));
        }
        var element = createElement('div', {
            id: this.parent.element.id + 'pivot-toolbar',
            className: cls.GRID_TOOLBAR
        });
        if (this.parent.showFieldList && select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element)) {
            this.parent.element.insertBefore(element, select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element));
        }
        else if (this.parent.showGroupingBar &&
            select('#' + this.parent.element.id + ' .' + 'e-pivot-grouping-bar', this.parent.element)) {
            this.parent.element.insertBefore(element, select('#' + this.parent.element.id + ' .' + 'e-pivot-grouping-bar', this.parent.element));
        }
        else {
            this.parent.element.insertBefore(element, select('#' + this.parent.element.id + '_grid', this.parent.element));
        }
        this.toolbar = new tool({
            created: this.create.bind(this),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            items: this.getItems(),
            allowKeyboard: false,
            cssClass: this.parent.cssClass,
            width: this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber()
        });
        this.toolbar.isStringTemplate = true;
        var viewStr = 'viewContainerRef';
        var registerTemp = 'registeredTemplate';
        var registeredTemplate = {};
        if ((this.parent)[viewStr]) {
            setValue(registerTemp, registeredTemplate, this.toolbar);
            (this.toolbar)[viewStr] = (this.parent)[viewStr];
        }
        if (this.parent.toolbarTemplate && typeof (this.parent.toolbarTemplate) === 'string') {
            this.toolbar.appendTo(this.parent.toolbarTemplate);
            this.parent.element.replaceChild(this.toolbar.element, this.parent.element.querySelector('.' + cls.GRID_TOOLBAR));
            this.toolbar.element.classList.add(cls.GRID_TOOLBAR);
        }
        else {
            this.toolbar.appendTo(element);
        }
        this.toolbar.width = this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber();
        if (this.parent.chart) {
            this.parent.chart.setProperties({ width: this.parent.grid ? this.parent.getGridWidthAsNumber().toString() : this.parent.getWidthAsNumber().toString() }, true);
        }
        if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
            this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            this.parent.groupingBarModule.refreshUI();
        }
    };
    Toolbar.prototype.fetchReports = function () {
        var reports = { reportName: [] };
        this.parent.trigger(events.fetchReport, reports);
        return reports;
    };
    Toolbar.prototype.fetchReportsArgs = function () {
        var callbackPromise = new Deferred();
        var reports = { reportName: [] };
        this.parent.trigger(events.fetchReport, reports, function (observedArgs) {
            callbackPromise.resolve(observedArgs);
        });
        return callbackPromise;
    };
    Toolbar.prototype.getItems = function () {
        var toolbar = this.parent.toolbar.filter(function (v, i, a) { return a.indexOf(v) === i; });
        var items = [];
        for (var _i = 0, toolbar_1 = toolbar; _i < toolbar_1.length; _i++) {
            var item = toolbar_1[_i];
            switch (item) {
                case 'New':
                    items.push({
                        prefixIcon: cls.GRID_NEW + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('new'),
                        click: this.actionClick.bind(this), id: this.parent.element.id + 'new'
                    });
                    break;
                case 'Save':
                    items.push({
                        prefixIcon: cls.GRID_SAVE + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('save'),
                        click: this.actionClick.bind(this), id: this.parent.element.id + 'save'
                    });
                    break;
                case 'SaveAs':
                    items.push({
                        prefixIcon: cls.GRID_SAVEAS + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('saveAs'),
                        click: this.actionClick.bind(this), id: this.parent.element.id + 'saveas'
                    });
                    break;
                case 'Rename':
                    items.push({
                        prefixIcon: cls.GRID_RENAME + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('rename'),
                        click: this.actionClick.bind(this), id: this.parent.element.id + 'rename'
                    });
                    break;
                case 'Remove':
                    items.push({
                        prefixIcon: cls.GRID_REMOVE + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('deleteReport'),
                        click: this.actionClick.bind(this), id: this.parent.element.id + 'remove'
                    });
                    break;
                case 'Load':
                    items.push({
                        template: '<div><input class=' + cls.GRID_LOAD + ' id=' + this.parent.element.id + '_reportlist></input></div>',
                        click: this.actionClick.bind(this),
                        id: this.parent.element.id + 'load'
                    });
                    break;
                case 'Grid':
                    {
                        var toDisable = this.parent.displayOption.view === 'Chart';
                        items.push({
                            prefixIcon: cls.TOOLBAR_GRID + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('grid'),
                            id: this.parent.element.id + 'grid', cssClass: (toDisable ? cls.MENU_DISABLE : '') + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                            click: this.menuItemClick.bind(this)
                        });
                    }
                    break;
                case 'Chart':
                    {
                        var validTypes = (this.parent.displayOption.view === 'Table');
                        items.push({
                            template: '<ul id="' + this.parent.element.id + 'chart_menu"></ul>',
                            id: this.parent.element.id + 'chartmenu', cssClass: (validTypes ? cls.MENU_DISABLE : '') + (this.parent.cssClass ? (' ' + this.parent.cssClass) : '')
                        });
                    }
                    break;
                case 'MDX':
                    if (this.parent.dataType === 'olap') {
                        items.push({
                            prefixIcon: cls.GRID_MDX + ' ' + cls.ICON, id: this.parent.element.id + 'mdxQuery',
                            click: this.actionClick.bind(this), tooltipText: this.parent.localeObj.getConstant('mdxQuery')
                        });
                    }
                    break;
                case 'Export':
                    items.push({
                        template: '<ul id="' + this.parent.element.id + 'export_menu"></ul>',
                        id: this.parent.element.id + 'exportmenu'
                    });
                    break;
                case 'SubTotal':
                    items.push({
                        template: '<ul id="' + this.parent.element.id + 'subtotal_menu"></ul>',
                        id: this.parent.element.id + 'subtotalmenu'
                    });
                    break;
                case 'GrandTotal':
                    items.push({
                        template: '<ul id="' + this.parent.element.id + 'grandtotal_menu"></ul>',
                        id: this.parent.element.id + 'grandtotalmenu'
                    });
                    break;
                case 'ConditionalFormatting':
                    items.push({
                        prefixIcon: cls.GRID_FORMATTING + ' ' + cls.ICON, id: this.parent.element.id + 'formatting',
                        click: this.actionClick.bind(this), tooltipText: this.parent.localeObj.getConstant('toolbarFormatting')
                    });
                    break;
                case 'NumberFormatting':
                    items.push({
                        prefixIcon: cls.FORMATTING_TOOLBAR + ' ' + cls.ICON, id: this.parent.element.id + 'numberFormatting',
                        click: this.actionClick.bind(this), tooltipText: this.parent.localeObj.getConstant('numberFormat')
                    });
                    break;
                case 'Formatting':
                    items.push({
                        template: '<ul id="' + this.parent.element.id + 'formatting_menu"></ul>',
                        id: this.parent.element.id + 'formattingmenu'
                    });
                    break;
                case 'FieldList':
                    items.push({
                        prefixIcon: cls.TOOLBAR_FIELDLIST + ' ' + cls.ICON, tooltipText: this.parent.localeObj.getConstant('fieldList'),
                        click: this.actionClick.bind(this), align: 'Right', id: this.parent.element.id + 'fieldlist'
                    });
                    if (this.parent.element.querySelector('.e-toggle-field-list')) {
                        this.parent.element.querySelector('.e-toggle-field-list').style.display = 'none';
                    }
                    break;
                default:
                    if (typeof (item) === 'object') {
                        items.push(item);
                    }
            }
        }
        if (this.parent.showFieldList && toolbar.indexOf('FieldList') === -1 && select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element) &&
            select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element).style.display === 'none') {
            select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element).style.display = 'block';
        }
        var toolbarArgs = { customToolbar: items };
        this.parent.trigger(events.toolbarRender, toolbarArgs);
        return items;
    };
    Toolbar.prototype.reportChange = function (args) {
        this.parent.actionObj.actionName = events.reportChange;
        this.isReportChange = true;
        if (this.parent.actionBeginMethod()) {
            args.cancel = true;
            return;
        }
        try {
            this.dropArgs = args;
            if (this.parent.isModified && this.currentReport !== '') {
                this.createConfirmDialog(this.parent.localeObj.getConstant('alert'), this.parent.localeObj.getConstant('newReportConfirm'));
            }
            else {
                this.reportLoad(args);
            }
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    Toolbar.prototype.reportLoad = function (args) {
        var _this_1 = this;
        if (this.action !== 'Save' && this.action !== 'Rename' && this.action !== 'New') {
            var loadArgs = {
                reportName: args.itemData.value
            };
            var actionInfo = {
                reportName: args.itemData.value
            };
            this.parent.actionObj.actionInfo = actionInfo;
            this.parent.trigger(events.loadReport, loadArgs, function (observedArgs) {
                _this_1.currentReport = observedArgs.reportName;
                _this_1.parent.isModified = false;
            });
        }
    };
    Toolbar.prototype.saveReport = function (args) {
        if (this.currentReport && this.currentReport !== '' && args.item.id === (this.parent.element.id + 'save')) {
            var saveArgs = {
                report: this.getCurrentReport(),
                reportName: this.currentReport
            };
            this.parent.actionObj.actionName = this.parent.getActionCompleteName();
            var actionInfo = {
                reportName: this.currentReport
            };
            this.parent.actionObj.actionInfo = actionInfo;
            this.parent.trigger(events.saveReport, saveArgs);
            if (this.parent.actionObj.actionName) {
                this.parent.actionCompleteMethod();
            }
            this.parent.isModified = false;
        }
        else if (this.currentReport === '' && (args.item.id === (this.parent.element.id + 'save') || args.item.id === (this.parent.element.id + 'saveas'))) {
            this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('emptyReport'));
            return;
        }
        else {
            this.dialogShow(args, 'saveAs');
        }
    };
    Toolbar.prototype.mdxQueryDialog = function () {
        if (!select('#' + this.parent.element.id + 'mdx-dialog', document)) {
            this.renderMDXDialog();
        }
        var mdxDialog = getInstance(select('#' + this.parent.element.id + 'mdx-dialog', document), Dialog);
        var outerDiv = createElement('div', {
            className: cls.MDX_QUERY
        });
        var textarea = createElement('textarea', {
            className: cls.MDX_QUERY_CONTENT,
            attrs: { 'readonly': 'readonly', 'aria-label': this.parent.localeObj.getConstant('mdxQuery') }
        });
        textarea.innerText = this.parent.olapEngineModule.getMDXQuery(this.parent.dataSourceSettings).trim();
        outerDiv.appendChild(textarea);
        mdxDialog.content = outerDiv;
        mdxDialog.show();
    };
    Toolbar.prototype.dialogShow = function (args, action) {
        if (args) {
            var dialog = getInstance(select('#' + this.parent.element.id + 'report-dialog', document), Dialog);
            dialog.header = args.item.tooltipText;
            var outerDiv = createElement('div', {
                className: cls.GRID_REPORT_OUTER
            });
            var label = createElement('div', {
                className: cls.GRID_REPORT_LABEL
            });
            label.innerText = this.parent.localeObj.getConstant('reportName');
            var input = createElement('input', {
                className: cls.GRID_REPORT_INPUT + ' ' + cls.INPUT,
                attrs: {
                    'placeholder': this.parent.localeObj.getConstant('emptyReportName'),
                    'value': (action && action === 'rename' ? this.currentReport : '')
                }
            });
            input.innerText = (action && action === 'rename' ? this.currentReport : '');
            input.setSelectionRange(input.textContent.length, input.textContent.length);
            outerDiv.appendChild(label);
            outerDiv.appendChild(input);
            dialog.content = outerDiv;
            dialog.refresh();
            dialog.show();
        }
    };
    Toolbar.prototype.renameReport = function (args) {
        this.parent.trigger(events.toolbarClick, args);
        if (this.currentReport && this.currentReport !== '') {
            this.dialogShow(args, 'rename');
        }
        else {
            this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('emptyReport'));
            return;
        }
    };
    Toolbar.prototype.actionClick = function (args) {
        var actionName = (args.item.id === this.parent.element.id + 'new') ? events.addNewReport : (args.item.id === this.parent.element.id + 'save') ? events.saveCurrentReport : (args.item.id === this.parent.element.id + 'saveas') ? events.saveAsCurrentReport
            : (args.item.id === this.parent.element.id + 'rename') ? events.renameCurrentReport : (args.item.id === this.parent.element.id + 'remove') ? events.removeCurrentReport : (args.item.id === this.parent.element.id + 'load') ? events.loadReports
                : (args.item.id === this.parent.element.id + 'formatting') ? events.openConditionalFormatting : (args.item.id === this.parent.element.id + 'numberFormatting') ? events.openNumberFormatting
                    : (args.item.id === this.parent.element.id + 'mdxQuery') ? events.MdxQuery : (args.item.id === this.parent.element.id + 'fieldlist') ? events.showFieldList : '';
        this.parent.actionObj.actionName = actionName;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        try {
            switch (args.item.id) {
                case (this.parent.element.id + 'save'):
                case (this.parent.element.id + 'saveas'):
                    this.saveReport(args);
                    break;
                case (this.parent.element.id + 'remove'):
                    this.action = 'Remove';
                    if (this.currentReport && this.currentReport !== '') {
                        this.createConfirmDialog(this.parent.localeObj.getConstant('alert'), this.parent.localeObj.getConstant('removeConfirm'));
                    }
                    else {
                        this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('emptyReport'));
                    }
                    return;
                case (this.parent.element.id + 'rename'):
                    this.renameReport(args);
                    break;
                case (this.parent.element.id + 'new'):
                    this.action = 'New';
                    this.newArgs = args;
                    if (this.parent.isModified && this.currentReport && this.currentReport !== '') {
                        this.createConfirmDialog(this.parent.localeObj.getConstant('alert'), this.parent.localeObj.getConstant('newReportConfirm'));
                    }
                    else {
                        this.createNewReport(args);
                    }
                    break;
                case (this.parent.element.id + 'load'):
                    this.action = 'Load';
                    break;
                case (this.parent.element.id + 'fieldlist'):
                    if (this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.dialogRenderer) {
                        this.parent.pivotFieldListModule.dialogRenderer.onShowFieldList();
                    }
                    break;
                case (this.parent.element.id + 'formatting'):
                    if (this.parent.conditionalFormattingModule) {
                        this.parent.conditionalFormattingModule.showConditionalFormattingDialog();
                    }
                    break;
                case (this.parent.element.id + 'mdxQuery'):
                    this.mdxQueryDialog();
                    break;
                case (this.parent.element.id + 'numberFormatting'):
                    if (this.parent.numberFormattingModule) {
                        this.parent.numberFormattingModule.showNumberFormattingDialog();
                    }
                    break;
            }
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    Toolbar.prototype.renderDialog = function () {
        if (select('#' + this.parent.element.id + 'report-dialog', this.parent.element) !== null) {
            remove(select('#' + this.parent.element.id + 'report-dialog', this.parent.element));
        }
        var reportDialogElement = createElement('div', {
            id: this.parent.element.id + 'report-dialog',
            className: cls.GRID_REPORT_DIALOG
        });
        this.parent.element.appendChild(reportDialogElement);
        var dialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.okBtnClick.bind(this),
                    isFlat: false,
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('ok'),
                        isPrimary: true
                    }
                },
                {
                    click: this.cancelBtnClick.bind(this),
                    isFlat: false,
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('cancel')
                    }
                }
            ],
            isModal: true,
            visible: false,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: 'auto',
            height: 'auto',
            zIndex: 1000001,
            closeOnEscape: true,
            target: document.body,
            cssClass: this.parent.cssClass
        });
        dialog.isStringTemplate = true;
        dialog.appendTo(reportDialogElement);
    };
    Toolbar.prototype.renderMDXDialog = function () {
        if (select('#' + this.parent.element.id + 'mdx-dialog', this.parent.element) !== null) {
            remove(select('#' + this.parent.element.id + 'mdx-dialog', this.parent.element));
        }
        var mdxDialogElement = createElement('div', {
            id: this.parent.element.id + 'mdx-dialog',
            className: cls.GRID_MDX_DIALOG
        });
        this.parent.element.appendChild(mdxDialogElement);
        var mdxDialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.copyMDXQuery.bind(this),
                    isFlat: false,
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('copy'),
                        isPrimary: true
                    }
                }
            ],
            header: this.parent.localeObj.getConstant('mdxQuery'),
            isModal: true,
            visible: false,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: 'auto',
            height: 'auto',
            zIndex: 1000001,
            closeOnEscape: true,
            target: document.body,
            cssClass: this.parent.cssClass
        });
        mdxDialog.isStringTemplate = true;
        mdxDialog.appendTo(mdxDialogElement);
    };
    Toolbar.prototype.copyMDXQuery = function () {
        var mdxDialog = getInstance(select('#' + this.parent.element.id + 'mdx-dialog', document), Dialog);
        var textArea = mdxDialog.element.querySelector('.' + cls.MDX_QUERY_CONTENT);
        try {
            textArea.select();
            document.execCommand('copy');
        }
        catch (err) {
            window.alert('Oops, unable to copy');
        }
        return;
    };
    Toolbar.prototype.okBtnClick = function () {
        var _this_1 = this;
        var dialog = getInstance(select('#' + this.parent.element.id + 'report-dialog', document), Dialog);
        var reportInput = dialog.element.querySelector('.' + cls.GRID_REPORT_INPUT);
        if (reportInput && reportInput.value === '') {
            reportInput.focus();
            return;
        }
        if (!this.parent.localeObj) {
            this.parent = getInstance(select('#' + this.parent.element.id, document), PivotView);
        }
        if ((dialog.header === this.parent.localeObj.getConstant('save') ||
            dialog.header === this.parent.localeObj.getConstant('saveAs')) &&
            reportInput.value && reportInput.value !== '') {
            this.action = 'Save';
            this.currentReport = reportInput.value;
            var isExist_1 = false;
            var _this_2 = this;
            var reports = { reportName: [] };
            this.parent.trigger(events.fetchReport, reports, function (observedArgs) {
                for (var i = 0; i < observedArgs.reportName.length; i++) {
                    if (reportInput.value === observedArgs.reportName[i]) {
                        isExist_1 = true;
                        break;
                    }
                }
                if (isExist_1) {
                    _this_2.createConfirmDialog(_this_2.parent.localeObj.getConstant('alert'), _this_2.parent.localeObj.getConstant('replaceConfirmBefore') + '"' + reportInput.value + '"' +
                        _this_2.parent.localeObj.getConstant('replaceConfirmAfter'));
                    return;
                }
                var saveArgs = {
                    report: _this_2.getCurrentReport(),
                    reportName: reportInput.value
                };
                var actionInfo = {
                    reportName: reportInput.value
                };
                _this_1.parent.actionObj.actionInfo = actionInfo;
                _this_2.parent.trigger(events.saveReport, saveArgs);
                _this_2.parent.isModified = false;
                _this_2.updateReportList();
                getInstance(select('#' + _this_1.parent.element.id + 'report-dialog', document), Dialog).hide();
            });
        }
        else if (dialog.header === this.parent.localeObj.getConstant('new') &&
            reportInput.value && reportInput.value !== '') {
            this.action = 'New';
            this.currentReport = reportInput.value;
            var isExist_2 = false;
            var _this_3 = this;
            var reports_1 = { reportName: [] };
            this.parent.trigger(events.fetchReport, reports_1, function (observedArgs) {
                for (var i = 0; i < observedArgs.reportName.length; i++) {
                    if (reportInput.value === reports_1.reportName[i]) {
                        isExist_2 = true;
                        break;
                    }
                }
                if (isExist_2) {
                    _this_3.createConfirmDialog(_this_3.parent.localeObj.getConstant('alert'), _this_3.parent.localeObj.getConstant('replaceConfirmBefore') + '"' + reportInput.value + '"' +
                        _this_3.parent.localeObj.getConstant('replaceConfirmAfter'));
                    return;
                }
                _this_3.parent.trigger(events.newReport);
                var saveArgs = {
                    report: _this_3.getCurrentReport(),
                    reportName: reportInput.value
                };
                var actionInfo = {
                    reportName: reportInput.value
                };
                _this_1.parent.actionObj.actionInfo = actionInfo;
                _this_3.parent.trigger(events.saveReport, saveArgs);
                _this_3.parent.isModified = false;
                _this_3.updateReportList();
                getInstance(select('#' + _this_1.parent.element.id + 'report-dialog', document), Dialog).hide();
            });
        }
        else if (dialog.header === this.parent.localeObj.getConstant('rename') && reportInput.value && reportInput.value !== '') {
            if (this.currentReport === reportInput.value) {
                dialog.hide();
                return;
            }
            this.action = 'Rename';
            var isExist = false;
            this.renameText = reportInput.value;
            var reports = this.fetchReports();
            for (var i = 0; i < reports.reportName.length; i++) {
                if (reportInput.value === reports.reportName[i]) {
                    isExist = true;
                    break;
                }
            }
            if (isExist) {
                this.createConfirmDialog(this.parent.localeObj.getConstant('alert'), this.parent.localeObj.getConstant('replaceConfirmBefore') + '"' + reportInput.value + '"' +
                    this.parent.localeObj.getConstant('replaceConfirmAfter'));
                return;
            }
            var renameArgs = {
                reportName: this.currentReport,
                rename: reportInput.value
            };
            var actionInfo = {
                reportName: { oldName: this.currentReport, newName: reportInput.value }
            };
            this.parent.actionObj.actionInfo = actionInfo;
            this.parent.trigger(events.renameReport, renameArgs);
            this.currentReport = reportInput.value;
            this.updateReportList();
            dialog.hide();
        }
        this.parent.actionObj.actionName = this.parent.getActionCompleteName();
        if (this.parent.actionObj.actionName) {
            this.parent.actionCompleteMethod();
        }
    };
    Toolbar.prototype.createNewReport = function (args) {
        this.dialogShow(args);
    };
    Toolbar.prototype.cancelBtnClick = function () {
        var dialog = getInstance(select('#' + this.parent.element.id + 'report-dialog', document), Dialog);
        dialog.hide();
    };
    Toolbar.prototype.createConfirmDialog = function (title, description) {
        if (document.getElementById(this.parent.element.id + '_ConfirmDialog')) {
            remove(document.getElementById(this.parent.element.id + '_ConfirmDialog').parentElement);
        }
        var errorDialog = createElement('div', {
            id: this.parent.element.id + '_ConfirmDialog',
            className: cls.ERROR_DIALOG_CLASS
        });
        this.parent.element.appendChild(errorDialog);
        var confirmPopUp = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            header: title,
            content: description,
            isModal: true,
            visible: true,
            closeOnEscape: true,
            target: document.body,
            cssClass: this.parent.cssClass,
            width: 'auto',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    isFlat: false,
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('yes'), isPrimary: true,
                        cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : '')
                    },
                    click: this.okButtonClick.bind(this)
                },
                {
                    isFlat: false,
                    buttonModel: {
                        content: this.parent.localeObj.getConstant('no'),
                        cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : '')
                    },
                    click: this.cancelButtonClick.bind(this)
                }
            ]
        });
        confirmPopUp.isStringTemplate = true;
        confirmPopUp.appendTo(errorDialog);
        confirmPopUp.element.querySelector('.e-dlg-header').innerText = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title) : title;
    };
    Toolbar.prototype.okButtonClick = function () {
        var _this_1 = this;
        var dialog = getInstance(select('#' + this.parent.element.id + 'report-dialog', document), Dialog);
        if (this.action === 'Remove') {
            var removeArgs = {
                reportName: this.currentReport
            };
            var actionInfo = {
                reportName: this.currentReport
            };
            this.parent.actionObj.actionInfo = actionInfo;
            this.parent.trigger(events.removeReport, removeArgs);
            var reports = this.fetchReports();
            if (reports.reportName && reports.reportName.length > 0) {
                var loadArgs = {
                    reportName: reports.reportName[reports.reportName.length - 1]
                };
                this.parent.trigger(events.loadReport, loadArgs, function (observedArgs) {
                    _this_1.currentReport = observedArgs.reportName;
                    _this_1.parent.isModified = false;
                });
                this.currentReport = reports.reportName[reports.reportName.length - 1];
            }
            else {
                this.currentReport = '';
                this.parent.isModified = false;
                this.action = '';
            }
            this.updateReportList();
            this.parent.actionObj.actionName = events.reportRemoved;
            if (this.parent.actionObj.actionName) {
                this.parent.actionCompleteMethod();
            }
        }
        else if (this.action === 'New' || (this.action !== 'Save' && this.action !== 'Rename' && this.action !== 'New')) {
            if (this.currentReport && this.currentReport !== '' && this.parent.isModified) {
                var saveArgs = {
                    report: this.getCurrentReport(),
                    reportName: this.currentReport
                };
                var actionInfo = {
                    reportName: this.currentReport
                };
                this.parent.actionObj.actionInfo = actionInfo;
                this.parent.actionObj.actionName = events.reportSaved;
                if (this.parent.actionObj.actionName) {
                    this.parent.actionCompleteMethod();
                }
                this.parent.trigger(events.saveReport, saveArgs);
                this.parent.isModified = false;
                if (this.action === 'New') {
                    this.parent.actionObj.actionName = events.addNewReport;
                    this.createNewReport(this.newArgs);
                }
                else {
                    this.parent.actionObj.actionName = events.reportChange;
                    this.reportLoad(this.dropArgs);
                }
            }
            else if (this.action === 'New') {
                this.parent.trigger(events.newReport);
                var saveArgs = {
                    report: this.getCurrentReport(),
                    reportName: this.currentReport
                };
                this.parent.trigger(events.saveReport, saveArgs);
                this.parent.isModified = false;
                this.updateReportList();
                dialog.hide();
            }
        }
        else if (this.action === 'Save') {
            var saveArgs = {
                report: this.getCurrentReport(),
                reportName: this.currentReport
            };
            this.parent.trigger(events.saveReport, saveArgs);
            this.parent.isModified = false;
            this.updateReportList();
            dialog.hide();
        }
        else if (this.action === 'Rename') {
            var renameArgs = {
                reportName: this.currentReport,
                rename: this.renameText,
                isReportExists: true
            };
            this.parent.trigger(events.renameReport, renameArgs);
            this.currentReport = this.renameText;
            this.parent.isModified = false;
            this.updateReportList();
            dialog.hide();
        }
        var confirmPopUp = getInstance(select('#' + this.parent.element.id + '_ConfirmDialog', document), Dialog);
        confirmPopUp.hide();
    };
    Toolbar.prototype.cancelButtonClick = function () {
        var dialog = getInstance(select('#' + this.parent.element.id + 'report-dialog', document), Dialog);
        if (this.action === 'New') {
            if (this.parent.isModified) {
                this.createNewReport(this.newArgs);
            }
            else {
                dialog.hide();
            }
        }
        else if (this.action === 'Save') {
            if (select('#' + this.parent.element.id + '_reportlist', this.parent.element)) {
                var reportList = getInstance(select('#' + this.parent.element.id + '_reportlist', this.parent.element), DropDownList);
                this.currentReport = reportList.value;
            }
            dialog.hide();
        }
        else if (this.action === 'Rename') {
            dialog.hide();
        }
        else if (this.dropArgs && this.action !== 'Remove') {
            this.reportLoad(this.dropArgs);
        }
        var confirmPopUp = getInstance(select('#' + this.parent.element.id + '_ConfirmDialog', document), Dialog);
        confirmPopUp.hide();
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.createChartMenu = function () {
        var _this_1 = this;
        if (select('#' + this.parent.element.id + 'chart_menu', this.parent.element)) {
            var chartMenuElement = select('#' + this.parent.element.id + 'chart_menu', this.parent.element);
            var menuItems = [];
            var types = this.getValidChartType();
            for (var i = 0; (i < types.length && i < 7); i++) {
                var type = types[i];
                menuItems.push({
                    text: this.parent.localeObj.getConstant(type.toLowerCase()),
                    id: this.parent.element.id + '_' + type
                });
            }
            if (menuItems.length === 7) {
                menuItems.splice(6);
                menuItems.push({
                    text: this.parent.localeObj.getConstant('MoreOption'),
                    id: this.parent.element.id + '_' + 'ChartMoreOption'
                });
            }
            var toDisable = (menuItems.length <= 0 || this.parent.displayOption.view === 'Table');
            menuItems.push({
                separator: true
            });
            menuItems.push({
                text: this.parent.localeObj.getConstant('multipleAxes'),
                id: this.parent.element.id + '_' + 'multipleAxes'
            });
            menuItems.push({
                text: this.parent.localeObj.getConstant('showLegend'),
                id: this.parent.element.id + '_' + 'showLegend'
            });
            var menu = [{
                    iconCss: cls.TOOLBAR_CHART + ' ' + cls.ICON,
                    items: toDisable ? [] : menuItems
                }];
            var chartMenu = chartMenuElement ? getInstance(chartMenuElement, Menu) : null;
            if (chartMenu && !chartMenu.isDestroyed) {
                chartMenu.destroy();
                chartMenu = null;
            }
            chartMenu = new Menu({
                items: menu, enableRtl: this.parent.enableRtl,
                locale: this.parent.locale,
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: cls.TOOLBAR_MENU + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.menuItemClick.bind(this),
                beforeOpen: this.whitespaceRemove.bind(this),
                onClose: function () {
                    _this_1.focusToolBar();
                },
                beforeItemRender: this.multipleAxesCheckbox.bind(this)
            });
            chartMenu.isStringTemplate = true;
            chartMenu.appendTo(chartMenuElement);
        }
    };
    Toolbar.prototype.create = function () {
        var _this_1 = this;
        if (select('#' + this.parent.element.id + 'chart_menu', this.parent.element)) {
            this.createChartMenu();
        }
        if (select('#' + this.parent.element.id + 'export_menu', this.parent.element)) {
            var exportMenuElement = select('#' + this.parent.element.id + 'export_menu', this.parent.element);
            var menu = [{
                    iconCss: cls.GRID_EXPORT + ' ' + cls.ICON,
                    items: [
                        {
                            text: this.parent.localeObj.getConstant('pdf'),
                            iconCss: cls.GRID_PDF_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'pdf'
                        },
                        {
                            text: this.parent.localeObj.getConstant('excel'),
                            iconCss: cls.GRID_EXCEL_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'excel'
                        },
                        {
                            text: this.parent.localeObj.getConstant('csv'),
                            iconCss: cls.GRID_CSV_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'csv'
                        },
                        {
                            text: this.parent.localeObj.getConstant('png'),
                            iconCss: cls.GRID_PNG_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'png'
                        },
                        {
                            text: this.parent.localeObj.getConstant('jpeg'),
                            iconCss: cls.GRID_JPEG_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'jpeg'
                        },
                        {
                            text: this.parent.localeObj.getConstant('svg'),
                            iconCss: cls.GRID_SVG_EXPORT + ' ' + cls.ICON,
                            id: this.parent.element.id + 'svg'
                        }
                    ]
                }];
            var exportMenu = new Menu({
                items: menu, enableRtl: this.parent.enableRtl,
                locale: this.parent.locale, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: cls.TOOLBAR_MENU + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.menuItemClick.bind(this), beforeOpen: this.updateExportMenu.bind(this),
                onClose: function () {
                    _this_1.focusToolBar();
                }
            });
            exportMenu.isStringTemplate = true;
            exportMenu.appendTo(exportMenuElement);
        }
        if (select('#' + this.parent.element.id + 'subtotal_menu', this.parent.element)) {
            var subTotalMenuElement = select('#' + this.parent.element.id + 'subtotal_menu', this.parent.element);
            var menu = [{
                    iconCss: cls.GRID_SUB_TOTAL + ' ' + cls.ICON,
                    items: [
                        {
                            text: this.parent.localeObj.getConstant('showSubTotals'),
                            id: this.parent.element.id + 'subtotal',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('doNotShowSubTotals'),
                            id: this.parent.element.id + 'notsubtotal',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('showSubTotalsRowsOnly'),
                            id: this.parent.element.id + 'subtotalrow',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('showSubTotalsColumnsOnly'),
                            id: this.parent.element.id + 'subtotalcolumn',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            separator: true
                        },
                        {
                            text: this.parent.localeObj.getConstant('subTotalPosition'),
                            id: this.parent.element.id + 'subtotalpositions',
                            iconCss: cls.PIVOT_DISABLE_ICON + ' ' + cls.ICON,
                            items: [
                                {
                                    text: this.parent.localeObj.getConstant('auto'),
                                    id: this.parent.element.id + 'sub-none-position',
                                    iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                                },
                                {
                                    text: this.parent.localeObj.getConstant('top'),
                                    id: this.parent.element.id + 'sub-top-position',
                                    iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                                },
                                {
                                    text: this.parent.localeObj.getConstant('bottom'),
                                    id: this.parent.element.id + 'sub-bottom-position',
                                    iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                                }
                            ]
                        }
                    ]
                }];
            var subTotalMenu = new Menu({
                items: menu, enableRtl: this.parent.enableRtl,
                locale: this.parent.locale, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: cls.TOOLBAR_MENU + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.menuItemClick.bind(this), beforeOpen: this.updateSubtotalSelection.bind(this),
                onClose: function () {
                    _this_1.focusToolBar();
                }
            });
            subTotalMenu.isStringTemplate = true;
            subTotalMenu.appendTo(subTotalMenuElement);
        }
        if (select('#' + this.parent.element.id + 'grandtotal_menu', this.parent.element)) {
            var grandTotalMenuElement = select('#' + this.parent.element.id + 'grandtotal_menu', this.parent.element);
            var menu = [{
                    iconCss: cls.GRID_GRAND_TOTAL + ' ' + cls.ICON,
                    items: [
                        {
                            text: this.parent.localeObj.getConstant('showGrandTotals'),
                            id: this.parent.element.id + 'grandtotal',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('doNotShowGrandTotals'),
                            id: this.parent.element.id + 'notgrandtotal',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('showGrandTotalsRowsOnly'),
                            id: this.parent.element.id + 'grandtotalrow',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            text: this.parent.localeObj.getConstant('showGrandTotalsColumnsOnly'),
                            id: this.parent.element.id + 'grandtotalcolumn',
                            iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                        },
                        {
                            separator: true
                        },
                        {
                            text: this.parent.localeObj.getConstant('grandTotalPosition'),
                            id: this.parent.element.id + 'grandtotalpositions',
                            iconCss: cls.PIVOT_DISABLE_ICON + ' ' + cls.ICON,
                            items: [
                                {
                                    text: this.parent.localeObj.getConstant('top'),
                                    id: this.parent.element.id + 'top-position',
                                    iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                                },
                                {
                                    text: this.parent.localeObj.getConstant('bottom'),
                                    id: this.parent.element.id + 'bottom-position',
                                    iconCss: cls.PIVOT_SELECT_ICON + ' ' + cls.ICON
                                }
                            ]
                        }
                    ]
                }];
            var grandTotalMenu = new Menu({
                items: menu, enableRtl: this.parent.enableRtl,
                locale: this.parent.locale, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: cls.TOOLBAR_MENU + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.menuItemClick.bind(this), beforeOpen: this.updateGrandtotalSelection.bind(this),
                onClose: function () {
                    _this_1.focusToolBar();
                }
            });
            grandTotalMenu.isStringTemplate = true;
            grandTotalMenu.appendTo(grandTotalMenuElement);
        }
        if (select('#' + this.parent.element.id + 'formatting_menu', this.parent.element)) {
            var formattingMenuElement = select('#' + this.parent.element.id + 'formatting_menu', this.parent.element);
            var menu = [{
                    iconCss: cls.FORMATTING_MENU + ' ' + cls.ICON,
                    items: [
                        {
                            text: this.parent.localeObj.getConstant('numberFormatMenu'),
                            iconCss: cls.NUMBER_FORMATTING_MENU + ' ' + cls.ICON,
                            id: this.parent.element.id + 'numberFormattingMenu'
                        },
                        {
                            text: this.parent.localeObj.getConstant('conditionalFormattingMenu'),
                            iconCss: cls.CONDITIONAL_FORMATTING_MENU + ' ' + cls.ICON,
                            id: this.parent.element.id + 'conditionalFormattingMenu'
                        }
                    ]
                }];
            var formattingMenu = new Menu({
                items: menu, enableRtl: this.parent.enableRtl,
                locale: this.parent.locale, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: cls.TOOLBAR_MENU + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.menuItemClick.bind(this)
            });
            formattingMenu.isStringTemplate = true;
            formattingMenu.appendTo(formattingMenuElement);
        }
        var saveArgs = {
            report: this.parent.getPersistData(),
            reportName: this.parent.localeObj.getConstant('defaultReport')
        };
        this.currentReport = this.parent.localeObj.getConstant('defaultReport');
        this.parent.trigger(events.saveReport, saveArgs);
        if (select('#' + this.parent.element.id + '_reportlist', this.parent.element)) {
            var reportListElement = select('#' + this.parent.element.id + '_reportlist', this.parent.element);
            var reports = this.fetchReports();
            var reportList = new DropDownList({
                dataSource: reports.reportName,
                width: '150px',
                popupHeight: '200px',
                placeholder: this.currentReport === '' ? this.parent.localeObj.getConstant('reportList') : '',
                enableRtl: this.parent.enableRtl,
                locale: this.parent.locale,
                cssClass: cls.REPORT_LIST_DROP + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                select: this.reportChange.bind(this),
                value: this.currentReport
            });
            reportList.isStringTemplate = true;
            reportList.appendTo(reportListElement);
        }
        this.updateItemElements();
    };
    Toolbar.prototype.getCurrentReport = function () {
        var reportStr = this.parent.getPersistData();
        if (this.parent.dataSourceSettings.type === 'CSV' && this.parent.dataSourceSettings.mode !== 'Server') {
            var reportSettings = JSON.parse(reportStr);
            reportSettings.dataSourceSettings.dataSource.splice(0, 0, this.parent.engineModule.fields);
            reportStr = JSON.stringify(reportSettings);
        }
        return reportStr;
    };
    Toolbar.prototype.updateItemElements = function () {
        var itemElements = [].slice.call(this.toolbar.element.querySelectorAll('.e-toolbar-item'));
        for (var _i = 0, itemElements_1 = itemElements; _i < itemElements_1.length; _i++) {
            var element = itemElements_1[_i];
            if (element.querySelector('button')) {
                element.querySelector('button').setAttribute('tabindex', '0');
            }
            else if (element.querySelector('.e-menu.e-menu-parent')) {
                element.querySelector('.e-menu.e-menu-parent').setAttribute('tabindex', '-1');
                if (element.querySelector('.e-menu-item.e-menu-caret-icon')) {
                    element.querySelector('.e-menu-item.e-menu-caret-icon').setAttribute('tabindex', '0');
                }
            }
        }
    };
    Toolbar.prototype.whitespaceRemove = function (args) {
        var separator = args.element.querySelector('.e-separator');
        if (separator) {
            separator.style.margin = '0px';
        }
    };
    Toolbar.prototype.multipleAxesCheckbox = function (args) {
        var _this_1 = this;
        if (this.parent.element.id + '_' + 'multipleAxes' === args.element.id) {
            var inputCheckbox = createElement('input', {
                id: this.parent.element.id + '_' + 'checkBox'
            });
            inputCheckbox.style.display = 'none';
            this.parent.element.appendChild(inputCheckbox);
            var checkbox = new CheckBox({
                label: this.parent.localeObj.getConstant('multipleAxes'),
                cssClass: 'e-multipleAxes' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                checked: this.parent.chartSettings.enableMultipleAxis,
                change: function () {
                    document.getElementById(_this_1.parent.element.id + '_' + 'multipleAxes').click();
                },
                enableRtl: this.parent.enableRtl,
                locale: this.parent.locale,
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            });
            args.element.innerText = '';
            checkbox.appendTo(inputCheckbox);
            if ((['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Pareto'].indexOf(this.parent.chartSettings.chartSeries.type) > -1) &&
                !args.element.classList.contains(cls.MENU_DISABLE)) {
                args.element.classList.add(cls.MENU_DISABLE);
                checkbox.disabled = true;
            }
            else if ((['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Pareto'].indexOf(this.parent.chartSettings.chartSeries.type) < 0) &&
                args.element.classList.contains(cls.MENU_DISABLE)) {
                args.element.classList.remove(cls.MENU_DISABLE);
                checkbox.disabled = false;
            }
            var checkboxObj = this.parent.element.querySelector('.' + cls.CHECKBOX_CONTAINER + '.e-multipleAxes');
            args.element.appendChild(checkboxObj);
        }
        else if (this.parent.element.id + '_' + 'showLegend' === args.element.id) {
            var inputCheckbox = createElement('input', {
                id: this.parent.element.id + '_' + 'showLegendCheckBox'
            });
            inputCheckbox.style.display = 'none';
            this.parent.element.appendChild(inputCheckbox);
            var checkbox = new CheckBox({
                label: this.parent.localeObj.getConstant('showLegend'),
                checked: this.getLableState(),
                cssClass: 'e-showLegend' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                change: function () {
                    document.getElementById(_this_1.parent.element.id + '_' + 'showLegend').click();
                },
                enableRtl: this.parent.enableRtl,
                locale: this.parent.locale,
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            });
            args.element.innerText = '';
            checkbox.appendTo(inputCheckbox);
            var checkboxObj = this.parent.element.querySelector('.' + cls.CHECKBOX_CONTAINER + '.e-showLegend');
            args.element.appendChild(checkboxObj);
        }
    };
    Toolbar.prototype.getLableState = function () {
        var chartSettings = JSON.parse(this.parent.getChartSettings()).chartSettings;
        if (chartSettings && chartSettings.legendSettings && chartSettings.legendSettings.visible !== undefined) {
            this.showLableState = chartSettings.legendSettings.visible;
        }
        else {
            this.showLableState = true;
        }
        return this.showLableState;
    };
    Toolbar.prototype.getAllChartItems = function () {
        return ['Line', 'Column', 'Area', 'Bar', 'StackingColumn', 'StackingArea', 'StackingBar', 'StackingLine', 'StepLine', 'StepArea',
            'SplineArea', 'Scatter', 'Spline', 'StackingColumn100', 'StackingBar100', 'StackingArea100', 'StackingLine100', 'Bubble', 'Pareto',
            'Polar', 'Radar', 'Pie', 'Pyramid', 'Funnel', 'Doughnut'];
    };
    Toolbar.prototype.updateExportMenu = function (args) {
        var items = [].slice.call(args.element.querySelectorAll('li'));
        if (this.parent.currentView === 'Table') {
            addClass(items.slice(3), cls.MENU_HIDE);
            removeClass(items.slice(1, 3), cls.MENU_HIDE);
        }
        else {
            addClass(items.slice(1, 3), cls.MENU_HIDE);
            removeClass(items.slice(3), cls.MENU_HIDE);
        }
    };
    Toolbar.prototype.updateSubtotalSelection = function (args) {
        if (!(args.parentItem.id === this.parent.element.id + 'subtotalpositions')) {
            if (!select('#' + this.parent.element.id + 'subtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'subtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'notsubtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'notsubtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'subtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'subtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'subtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'subtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (this.parent.dataSourceSettings.showSubTotals && this.parent.dataSourceSettings.showRowSubTotals &&
                !this.parent.dataSourceSettings.showColumnSubTotals) {
                select('#' + this.parent.element.id + 'subtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (this.parent.dataSourceSettings.showSubTotals && !this.parent.dataSourceSettings.showRowSubTotals &&
                this.parent.dataSourceSettings.showColumnSubTotals) {
                select('#' + this.parent.element.id + 'subtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (this.parent.dataSourceSettings.showSubTotals && this.parent.dataSourceSettings.showRowSubTotals &&
                this.parent.dataSourceSettings.showColumnSubTotals) {
                select('#' + this.parent.element.id + 'subtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (!this.parent.dataSourceSettings.showSubTotals || (!this.parent.dataSourceSettings.showRowSubTotals &&
                !this.parent.dataSourceSettings.showColumnSubTotals)) {
                select('#' + this.parent.element.id + 'notsubtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
        }
        else {
            select('#' + this.parent.element.id + 'sub-none-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            if (this.parent.dataSourceSettings.subTotalsPosition === 'Auto') {
                select('#' + this.parent.element.id + 'sub-none-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            select('#' + this.parent.element.id + 'sub-top-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            if (this.parent.dataSourceSettings.subTotalsPosition === 'Top') {
                select('#' + this.parent.element.id + 'sub-top-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            select('#' + this.parent.element.id + 'sub-bottom-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            if (this.parent.dataSourceSettings.subTotalsPosition === 'Bottom') {
                select('#' + this.parent.element.id + 'sub-bottom-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
        }
    };
    Toolbar.prototype.updateGrandtotalSelection = function (args) {
        if (!(args.parentItem.id === this.parent.element.id + 'grandtotalpositions')) {
            if (!select('#' + this.parent.element.id + 'grandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'grandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'notgrandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'notgrandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'grandtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'grandtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (!select('#' + this.parent.element.id + 'grandtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.contains(cls.PIVOT_DISABLE_ICON)) {
                select('#' + this.parent.element.id + 'grandtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            }
            if (this.parent.dataSourceSettings.showGrandTotals && this.parent.dataSourceSettings.showRowGrandTotals &&
                !this.parent.dataSourceSettings.showColumnGrandTotals) {
                select('#' + this.parent.element.id + 'grandtotalrow' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (this.parent.dataSourceSettings.showGrandTotals && !this.parent.dataSourceSettings.showRowGrandTotals &&
                this.parent.dataSourceSettings.showColumnGrandTotals) {
                select('#' + this.parent.element.id + 'grandtotalcolumn' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (this.parent.dataSourceSettings.showGrandTotals && this.parent.dataSourceSettings.showRowGrandTotals &&
                this.parent.dataSourceSettings.showColumnGrandTotals) {
                select('#' + this.parent.element.id + 'grandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            else if (!this.parent.dataSourceSettings.showGrandTotals || (!this.parent.dataSourceSettings.showRowGrandTotals &&
                !this.parent.dataSourceSettings.showColumnGrandTotals)) {
                select('#' + this.parent.element.id + 'notgrandtotal' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
        }
        else {
            select('#' + this.parent.element.id + 'top-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            if (this.parent.dataSourceSettings.grandTotalsPosition === 'Top') {
                select('#' + this.parent.element.id + 'top-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
            select('#' + this.parent.element.id + 'bottom-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.add(cls.PIVOT_DISABLE_ICON);
            if (this.parent.dataSourceSettings.grandTotalsPosition === 'Bottom') {
                select('#' + this.parent.element.id + 'bottom-position' + ' .' + cls.PIVOT_SELECT_ICON, args.element).classList.remove(cls.PIVOT_DISABLE_ICON);
            }
        }
    };
    Toolbar.prototype.updateReportList = function () {
        if (select('#' + this.parent.element.id + '_reportlist', this.parent.element)) {
            var reports = this.fetchReports();
            var reportList = getInstance(select('#' + this.parent.element.id + '_reportlist', this.parent.element), DropDownList);
            reportList.dataSource = reports.reportName;
            if (this.currentReport === '' && reportList.dataSource.length > 0) {
                reportList.value = reportList.dataSource[reportList.dataSource.length - 1];
                reportList.text = reportList.dataSource[reportList.dataSource.length - 1];
                this.currentReport = reportList.dataSource[reportList.dataSource.length - 1];
            }
            else {
                reportList.value = this.currentReport;
                reportList.text = this.currentReport;
            }
            reportList.refresh();
        }
    };
    Toolbar.prototype.menuItemClick = function (args) {
        var _this_1 = this;
        var exportArgs = {};
        var type;
        var actionName = (args.item.id === this.parent.element.id + 'grid') ? events.tableView : (args.item.id === this.parent.element.id + '_' + 'Column') ? events.chartView : (args.item.id === this.parent.element.id + '_' + 'Bar') ? events.chartView : (args.item.id === this.parent.element.id + '_' + 'Line') ? events.chartView
            : (args.item.id === this.parent.element.id + '_' + 'Area') ? events.chartView : (args.item.id === this.parent.element.id + '_' + 'Scatter') ? events.chartView : (args.item.id === this.parent.element.id + '_' + 'Polar') ? events.chartView : (args.item.id === this.parent.element.id + '_' + 'ChartMoreOption') ? events.chartView
                : (args.item.id === this.parent.element.id + '_' + 'multipleAxes') ? events.multipleAxis : (args.item.id === this.parent.element.id + '_' + 'showLegend') ? events.showLegend : (args.item.id === this.parent.element.id + 'pdf') ? events.pdfExport : (args.item.id === this.parent.element.id + 'png') ? events.pngExport
                    : (args.item.id === this.parent.element.id + 'excel') ? events.excelExport : (args.item.id === this.parent.element.id + 'csv') ? events.csvExport : (args.item.id === this.parent.element.id + 'jpeg') ? events.jpegExport : (args.item.id === this.parent.element.id + 'svg') ? events.svgExport
                        : (args.item.id === this.parent.element.id + 'notsubtotal') ? events.hideSubTotals : (args.item.id === this.parent.element.id + 'subtotalrow') ? events.subTotalsRow : (args.item.id === this.parent.element.id + 'subtotalcolumn') ? events.subTotalsColumn
                            : (args.item.id === this.parent.element.id + 'subtotal') ? events.showSubTotals : (args.item.id === this.parent.element.id + 'notgrandtotal') ? events.hideGrandTotals : (args.item.id === this.parent.element.id + 'grandtotalrow') ? events.grandTotalsRow
                                : (args.item.id === this.parent.element.id + 'grandtotalcolumn') ? events.grandTotalsColumn : (args.item.id === this.parent.element.id + 'grandtotal') ? events.showGrandTotals
                                    : (args.item.id === this.parent.element.id + 'numberFormattingMenu') ? events.numberFormattingMenu : (args.item.id === this.parent.element.id + 'conditionalFormattingMenu') ? events.conditionalFormattingMenu : '';
        this.parent.actionObj.actionName = actionName;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        if (this.getAllChartItems().indexOf(args.item.id.split(this.parent.element.id + '_')[1]) > -1 ||
            (args.item.id.split(this.parent.element.id + '_')[1] === 'ChartMoreOption') ||
            (args.item.id.split(this.parent.element.id + '_')[1] === 'multipleAxes') ||
            (args.item.id.split(this.parent.element.id + '_')[1] === 'showLegend')) {
            type = args.item.id.split(this.parent.element.id + '_')[1];
        }
        try {
            switch (args.item.id) {
                case (this.parent.element.id + 'grid'):
                    if (this.parent.grid && this.parent.chart) {
                        this.parent.grid.element.style.display = '';
                        this.parent.chart.element.style.display = 'none';
                        if (this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.enableScrollOnMultiAxis) {
                            this.parent.element.querySelector('.e-pivotchart').style.display = 'none';
                        }
                        this.parent.currentView = 'Table';
                        this.parent.setProperties({ displayOption: { primary: 'Table' } }, true);
                        if (this.parent.showGroupingBar && this.parent.groupingBarModule) {
                            if (this.parent.element.querySelector('.e-pivot-grouping-bar')) {
                                this.parent.element.querySelector('.e-pivot-grouping-bar').style.display = '';
                            }
                            if (this.parent.element.querySelector('.e-chart-grouping-bar')) {
                                this.parent.element.querySelector('.e-chart-grouping-bar').style.display = 'none';
                            }
                        }
                        var actionInfo = {
                            toolbarInfo: {
                                displayOption: this.parent.displayOption,
                                gridSettings: this.parent.gridSettings
                            }
                        };
                        this.parent.actionObj.actionInfo = actionInfo;
                        this.parent.layoutRefresh();
                    }
                    break;
                case (this.parent.element.id + 'pdf'):
                    if (this.parent.currentView === 'Table') {
                        this.parent.pdfExport({ fileName: 'Export.pdf' }, false, undefined, false);
                    }
                    else {
                        this.parent.chartExport('PDF', { fileName: 'result' }, undefined, null, undefined);
                    }
                    break;
                case (this.parent.element.id + 'excel'):
                    exportArgs = {
                        excelExportProperties: { fileName: 'Export.xlsx' },
                        isBlob: undefined,
                        isMultipleExport: undefined,
                        workbook: undefined
                    };
                    this.parent.trigger(events.beforeExport, exportArgs, function (observedArgs) {
                        _this_1.parent.excelExport(observedArgs.excelExportProperties, observedArgs.isMultipleExport, observedArgs.workbook, observedArgs.isBlob);
                    });
                    break;
                case (this.parent.element.id + 'csv'):
                    exportArgs = {
                        excelExportProperties: { fileName: 'Export.csv' },
                        isBlob: false,
                        isMultipleExport: false,
                        workbook: undefined
                    };
                    this.parent.trigger(events.beforeExport, exportArgs, function (observedArgs) {
                        if (_this_1.parent.dataSourceSettings.mode === 'Server') {
                            _this_1.parent.getEngine('onCsvExport', null, null, null, null, null, null, null, null, observedArgs.excelExportProperties);
                        }
                        else {
                            _this_1.parent.csvExport(observedArgs.excelExportProperties, observedArgs.isMultipleExport, observedArgs.workbook, observedArgs.isBlob);
                        }
                    });
                    break;
                case (this.parent.element.id + 'png'):
                    this.parent.chartExport('PNG', { fileName: 'result' }, undefined, null, undefined);
                    break;
                case (this.parent.element.id + 'jpeg'):
                    this.parent.chartExport('JPEG', { fileName: 'result' }, undefined, null, undefined);
                    break;
                case (this.parent.element.id + 'svg'):
                    this.parent.chartExport('SVG', { fileName: 'result' }, undefined, null, undefined);
                    break;
                case (this.parent.element.id + 'notsubtotal'):
                    this.parent.setProperties({ dataSourceSettings: { showSubTotals: false, showColumnSubTotals: false, showRowSubTotals: false } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'subtotalrow'):
                    this.parent.setProperties({ dataSourceSettings: { showSubTotals: true, showColumnSubTotals: false, showRowSubTotals: true } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'subtotalcolumn'):
                    this.parent.setProperties({ dataSourceSettings: { showSubTotals: true, showColumnSubTotals: true, showRowSubTotals: false } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'subtotal'):
                    this.parent.setProperties({ dataSourceSettings: { showSubTotals: true, showColumnSubTotals: true, showRowSubTotals: true } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'notgrandtotal'):
                    this.parent.setProperties({ dataSourceSettings: { showGrandTotals: false, showColumnGrandTotals: false, showRowGrandTotals: false } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'grandtotalrow'):
                    this.parent.setProperties({ dataSourceSettings: { showGrandTotals: true, showColumnGrandTotals: false, showRowGrandTotals: true } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'grandtotalcolumn'):
                    this.parent.setProperties({ dataSourceSettings: { showGrandTotals: true, showColumnGrandTotals: true, showRowGrandTotals: false } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'grandtotal'):
                    this.parent.setProperties({ dataSourceSettings: { showGrandTotals: true, showColumnGrandTotals: true, showRowGrandTotals: true } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'top-position'):
                    this.parent.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'bottom-position'):
                    this.parent.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'sub-top-position'):
                    this.parent.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'sub-bottom-position'):
                    this.parent.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'sub-none-position'):
                    this.parent.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
                    this.parent.refreshData();
                    break;
                case (this.parent.element.id + 'numberFormattingMenu'):
                    if (this.parent.numberFormattingModule) {
                        this.parent.numberFormattingModule.showNumberFormattingDialog();
                    }
                    break;
                case (this.parent.element.id + 'conditionalFormattingMenu'):
                    if (this.parent.conditionalFormattingModule) {
                        this.parent.conditionalFormattingModule.showConditionalFormattingDialog();
                    }
                    break;
                case (this.parent.element.id + '_' + type):
                    if (args.item && args.item.text) {
                        if (type === 'ChartMoreOption') {
                            this.createChartTypeDialog();
                        }
                        else if (type === 'multipleAxes') {
                            if (this.parent.chartSettings.enableScrollOnMultiAxis) {
                                this.isMultiAxisChange = true;
                            }
                            this.parent.chartSettings.enableMultipleAxis = !this.parent.chartSettings.enableMultipleAxis;
                            this.updateChartType(this.parent.chartSettings.chartSeries.type, true);
                        }
                        else if (this.getAllChartItems().indexOf(type) > -1) {
                            this.updateChartType(type, false);
                        }
                        else if (type === 'showLegend') {
                            this.parent.chart.legendSettings.visible = !this.showLableState;
                            if (this.parent.chartSettings.legendSettings) {
                                this.parent.chartSettings.legendSettings.visible = !this.showLableState;
                            }
                            else {
                                this.parent.setProperties({ chartSettings: { legendSettings: { visible: !this.showLableState } } }, true);
                            }
                            this.updateChartType(this.parent.chartSettings.chartSeries.type, true);
                        }
                    }
                    break;
            }
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initToolbar, this.createToolbar, this);
    };
    Toolbar.prototype.getValidChartType = function () {
        var menuItems = [];
        for (var i = 0; (i <= this.parent.chartTypes.length); i++) {
            var type = this.parent.chartTypes[i];
            if ((this.getAllChartItems().indexOf(type) > -1) && (menuItems.indexOf(type) < 0)) {
                menuItems.push(type);
            }
        }
        return menuItems;
    };
    Toolbar.prototype.createChartTypeDialog = function () {
        var _this_1 = this;
        var chartDialog = this.parent.element.appendChild(createElement('div', {
            id: this.parent.element.id + '_ChartTypeDialog',
            className: cls.PIVOTCHART_TYPE_DIALOG
        }));
        var chartTypesDialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            header: this.parent.localeObj.getConstant('chartTypeSettings'),
            content: this.getDialogContent(),
            isModal: true,
            beforeOpen: this.beforeOpen.bind(this),
            visible: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: 'auto',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: function () { _this_1.chartTypeDialogUpdate(); },
                    isFlat: false,
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('ok'), isPrimary: true }
                },
                {
                    click: function () { _this_1.removeDialog(); },
                    isFlat: false,
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: true,
            target: this.parent.element,
            cssClass: this.parent.cssClass,
            close: this.removeDialog.bind(this)
        });
        chartTypesDialog.isStringTemplate = true;
        chartTypesDialog.appendTo(chartDialog);
    };
    Toolbar.prototype.removeDialog = function () {
        var chartTypesDialog = select('#' + this.parent.element.id + '_ChartTypeDialog', this.parent.element) ?
            getInstance(select('#' + this.parent.element.id + '_ChartTypeDialog', this.parent.element), Dialog) : null;
        if (chartTypesDialog && !chartTypesDialog.isDestroyed) {
            chartTypesDialog.destroy();
        }
        if (document.getElementById(this.parent.element.id + '_ChartTypeDialog')) {
            remove(document.getElementById(this.parent.element.id + '_ChartTypeDialog'));
        }
    };
    Toolbar.prototype.chartTypeDialogUpdate = function () {
        var chartType = getInstance(select('#' + this.parent.element.id + '_ChartTypeOption'), DropDownList).value;
        var checked = getInstance(select('#' + this.parent.element.id + '_DialogMultipleAxis'), CheckBox).checked;
        var checkedShow = getInstance(select('#' + this.parent.element.id + '_DialogShowLabel'), CheckBox).checked;
        this.parent.chart.legendSettings.visible = checkedShow;
        if (this.chartLableState) {
            this.parent.chart.legendSettings.visible = checkedShow;
            if (this.parent.chartSettings.legendSettings) {
                this.parent.chartSettings.legendSettings.visible = checkedShow;
            }
            else {
                this.parent.setProperties({ chartSettings: { legendSettings: { visible: checkedShow } } }, true);
            }
        }
        this.updateChartType(chartType, false);
        this.parent.chartSettings.enableMultipleAxis = checked;
        this.parent.chartSettings.multipleAxisMode = getInstance(select('#' + this.parent.element.id + '_AxisModeOption'), DropDownList).value;
        var chartTypesDialog = select('#' + this.parent.element.id + '_ChartTypeDialog', document) ?
            getInstance(select('#' + this.parent.element.id + '_ChartTypeDialog', document), Dialog) : null;
        chartTypesDialog.close();
    };
    Toolbar.prototype.updateChartType = function (type, isMultiAxis) {
        if (this.getAllChartItems().indexOf(type) > -1) {
            if (this.parent.chart) {
                this.parent.currentView = 'Chart';
                this.parent.setProperties({ displayOption: { primary: 'Chart' } }, true);
                if (this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis) {
                    this.parent.element.querySelector('.' + cls.PIVOTCHART).style.width = formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber());
                    this.parent.element.querySelector('.' + cls.PIVOTCHART).style.height = formatUnit(this.parent.pivotChartModule.getChartHeight());
                }
                this.parent.chart.setProperties({
                    width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber()),
                    height: formatUnit(this.parent.pivotChartModule.getChartHeight())
                }, true);
                if (this.parent.chartSettings.chartSeries.type === type && !isMultiAxis) {
                    this.parent.chart.refresh();
                }
                else {
                    this.parent.chartSettings.chartSeries.type = type;
                }
                var actionInfo = {
                    toolbarInfo: {
                        displayOption: this.parent.displayOption,
                        chartSettings: this.parent.chartSettings
                    }
                };
                this.parent.actionObj.actionInfo = actionInfo;
            }
        }
    };
    Toolbar.prototype.getDialogContent = function () {
        var mainWrapper = createElement('div', { className: 'e-chart-type-div-content' });
        var optionWrapperDiv = createElement('div', { className: 'e-chart-type-option-container' });
        var axisModeWrapperDiv = createElement('div', { className: 'e-multiple-axes-mode-container' });
        var optionTextDiv = createElement('div', {
            className: 'e-chart-type-option-text'
        });
        optionTextDiv.innerText = this.parent.localeObj.getConstant('ChartType');
        var axisModeTextDiv = createElement('div', {
            className: 'e-multiple-axes-mode-text'
        });
        axisModeTextDiv.innerText = this.parent.localeObj.getConstant('multipleAxisMode');
        var dropOptionDiv = createElement('div', { id: this.parent.element.id + '_ChartTypeOption' });
        var dropModeOptionDiv = createElement('div', { id: this.parent.element.id + '_AxisModeOption' });
        optionWrapperDiv.appendChild(optionTextDiv);
        optionWrapperDiv.appendChild(dropOptionDiv);
        var chartTypeDatasource = [];
        var multipleAxisModeDatasource = [
            { value: 'Stacked', text: this.parent.localeObj.getConstant('stacked') },
            { value: 'Single', text: this.parent.localeObj.getConstant('single') },
            { value: 'Combined', text: this.parent.localeObj.getConstant('combined') }
        ];
        var chartType = this.getValidChartType();
        for (var i = 0; i < chartType.length; i++) {
            chartTypeDatasource.push({
                value: chartType[i], text: this.parent.localeObj.getConstant(chartType[i].toLowerCase())
            });
        }
        var optionWrapper = new DropDownList({
            dataSource: chartTypeDatasource, enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            fields: { value: 'value', text: 'text' },
            value: this.parent.chartSettings.chartSeries.type ? this.parent.chartSettings.chartSeries.type : this.getValidChartType()[0],
            width: '100%',
            change: this.changeDropDown.bind(this),
            cssClass: this.parent.cssClass
        });
        optionWrapper.isStringTemplate = true;
        optionWrapper.appendTo(dropOptionDiv);
        mainWrapper.appendChild(optionWrapperDiv);
        var checkboxWrap = createElement('input', {
            id: this.parent.element.id + '_DialogMultipleAxis',
            attrs: { 'type': 'checkbox' }
        });
        mainWrapper.appendChild(checkboxWrap);
        var labelCheckboxWrap = createElement('input', {
            id: this.parent.element.id + '_DialogShowLabel',
            attrs: { 'type': 'checkbox' }
        });
        mainWrapper.appendChild(labelCheckboxWrap);
        axisModeWrapperDiv.appendChild(axisModeTextDiv);
        axisModeWrapperDiv.appendChild(dropModeOptionDiv);
        mainWrapper.appendChild(axisModeWrapperDiv);
        var axisModeWrapper = new DropDownList({
            dataSource: multipleAxisModeDatasource, enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            fields: { value: 'value', text: 'text' },
            value: this.parent.chartSettings.multipleAxisMode ? this.parent.chartSettings.multipleAxisMode : 'Stacked',
            width: '100%',
            enabled: this.parent.chartSettings.enableMultipleAxis,
            cssClass: this.parent.cssClass
        });
        axisModeWrapper.isStringTemplate = true;
        axisModeWrapper.appendTo(dropModeOptionDiv);
        return mainWrapper;
    };
    Toolbar.prototype.changeDropDown = function (args) {
        var chartSettings = JSON.parse(this.parent.getChartSettings()).chartSettings;
        if (!(chartSettings && chartSettings.legendSettings && chartSettings.legendSettings.visible !== undefined)) {
            getInstance(select('#' + this.parent.element.id + '_DialogShowLabel'), CheckBox).checked = true;
        }
        if (['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Pareto'].indexOf(args.value.toString()) > -1) {
            getInstance(select('#' + this.parent.element.id + '_DialogMultipleAxis'), CheckBox).disabled = true;
            getInstance(select('#' + this.parent.element.id + '_AxisModeOption'), DropDownList).enabled = false;
        }
        else {
            var multipleAxisCheckBox = getInstance(select('#' + this.parent.element.id + '_DialogMultipleAxis'), CheckBox);
            multipleAxisCheckBox.disabled = false;
            getInstance(select('#' + this.parent.element.id + '_AxisModeOption'), DropDownList).enabled = multipleAxisCheckBox.checked;
        }
    };
    Toolbar.prototype.beforeOpen = function () {
        var _this_1 = this;
        var checkbox = new CheckBox({
            label: this.parent.localeObj.getConstant('multipleAxes'),
            cssClass: 'e-dialog-multiple-axis' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            checked: this.parent.chartSettings.enableMultipleAxis ? this.parent.chartSettings.enableMultipleAxis : false,
            change: function (args) {
                getInstance(select('#' + _this_1.parent.element.id + '_AxisModeOption'), DropDownList).enabled = args.checked;
            },
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer
        });
        var checkbox1 = new CheckBox({
            label: this.parent.localeObj.getConstant('showLegend'),
            checked: this.getLableState(),
            change: function () { _this_1.chartLableState = true; },
            cssClass: 'e-dialog-show-legend' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer
        });
        var chartTypesDialog = select('#' + this.parent.element.id + '_ChartTypeDialog', document) ?
            getInstance(select('#' + this.parent.element.id + '_ChartTypeDialog', document), Dialog) : null;
        checkbox1.appendTo(select('#' + this.parent.element.id + '_DialogShowLabel', chartTypesDialog.element));
        checkbox.appendTo(select('#' + this.parent.element.id + '_DialogMultipleAxis', chartTypesDialog.element));
        if (['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Pareto'].indexOf(this.parent.chartSettings.chartSeries.type) > -1) {
            checkbox.disabled = true;
            getInstance(select('#' + this.parent.element.id + '_AxisModeOption'), DropDownList).enabled = false;
        }
        var chartSettings = JSON.parse(this.parent.getChartSettings()).chartSettings;
        if (chartSettings && chartSettings.legendSettings && chartSettings.legendSettings.visible !== undefined) {
            this.chartLableState = true;
        }
        else {
            this.chartLableState = false;
        }
    };
    /**
     * To refresh the toolbar
     *
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.refreshToolbar = function () {
        this.destroy();
        this.createToolbar();
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initToolbar, this.createToolbar);
    };
    /**
     * To destroy the toolbar
     *
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.destroy = function () {
        this.removeEventListener();
        var element = select('#' + this.parent.element.id + '_ConfirmDialog', document);
        var confirmPopUp = element ? getInstance(element, Dialog) : null;
        if (confirmPopUp && !confirmPopUp.isDestroyed) {
            confirmPopUp.destroy();
            confirmPopUp = null;
        }
        element = select('#' + this.parent.element.id + 'report-dialog', document);
        var dialog = element ? getInstance(element, Dialog) : null;
        if (dialog && !dialog.isDestroyed) {
            dialog.destroy();
            dialog = null;
        }
        element = select('#' + this.parent.element.id + 'mdx-dialog', document);
        var mdxDialog = element ? getInstance(element, Dialog) : null;
        if (mdxDialog && !mdxDialog.isDestroyed) {
            mdxDialog.destroy();
            mdxDialog = null;
        }
        element = select('#' + this.parent.element.id + 'chart_menu', document);
        var chartMenu = element ? getInstance(element, Menu) : null;
        if (chartMenu && !chartMenu.isDestroyed) {
            chartMenu.destroy();
            chartMenu = null;
        }
        element = select('#' + this.parent.element.id + '_ChartTypeDialog', document);
        var chartTypesDialog = element ? getInstance(element, Dialog) : null;
        if (chartTypesDialog && !chartTypesDialog.isDestroyed) {
            chartTypesDialog.destroy();
            chartTypesDialog = null;
        }
        element = select('#' + this.parent.element.id + 'export_menu', document);
        var exportMenu = element ? getInstance(element, Menu) : null;
        if (exportMenu && !exportMenu.isDestroyed) {
            exportMenu.destroy();
            exportMenu = null;
        }
        element = select('#' + this.parent.element.id + 'subtotal_menu', document);
        var subTotalMenu = element ? getInstance(element, Menu) : null;
        if (subTotalMenu && !subTotalMenu.isDestroyed) {
            subTotalMenu.destroy();
            subTotalMenu = null;
        }
        element = select('#' + this.parent.element.id + 'grandtotal_menu', document);
        var grandTotalMenu = element ? getInstance(element, Menu) : null;
        if (grandTotalMenu && !grandTotalMenu.isDestroyed) {
            grandTotalMenu.destroy();
            grandTotalMenu = null;
        }
        element = select('#' + this.parent.element.id + 'formatting_menu', document);
        var formattingMenu = element ? getInstance(element, Menu) : null;
        if (formattingMenu && !formattingMenu.isDestroyed) {
            formattingMenu.destroy();
            formattingMenu = null;
        }
        element = select('#' + this.parent.element.id + '_reportlist', document);
        var reportList = element ? getInstance(element, DropDownList) : null;
        if (reportList && !reportList.isDestroyed) {
            reportList.destroy();
            reportList = null;
        }
        if (this.toolbar && !this.toolbar.isDestroyed) {
            this.toolbar.destroy();
            this.toolbar = null;
        }
        element = select('#' + this.parent.element.id + 'pivot-toolbar', document);
        if (element) {
            remove(element);
        }
    };
    Toolbar.prototype.focusToolBar = function () {
        removeClass(document.querySelector('.' + cls.GRID_TOOLBAR).querySelectorAll('.e-menu-item.e-focused'), 'e-focused');
        removeClass(document.querySelector('.' + cls.GRID_TOOLBAR).querySelectorAll('.e-menu-item.e-selected'), 'e-selected');
        if (document.querySelector('.e-toolbar-items')) {
            addClass([document.querySelector('.e-toolbar-items')], 'e-focused');
        }
    };
    return Toolbar;
}());
export { Toolbar };
