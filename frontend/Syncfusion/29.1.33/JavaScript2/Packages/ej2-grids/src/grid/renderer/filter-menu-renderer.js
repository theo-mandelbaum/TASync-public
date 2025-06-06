import { isNullOrUndefined, getValue, remove } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { FlMenuOptrUI } from './filter-menu-operator';
import { StringFilterUI } from './string-filter-ui';
import { NumberFilterUI } from './number-filter-ui';
import { BooleanFilterUI } from './boolean-filter-ui';
import { DateFilterUI } from './date-filter-ui';
import { getFilterMenuPostion, parentsUntil, appendChildren, resetDialogAppend } from '../base/util';
import * as events from '../base/constant';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
/**
 * `filter menu` render boolean column.
 *
 * @hidden
 */
var FilterMenuRenderer = /** @class */ (function () {
    function FilterMenuRenderer(parent, filterSettings, serviceLocator, customFltrOperators, fltrObj) {
        this.isDialogOpen = false;
        this.maxHeight = '350px';
        this.isMenuCheck = false;
        this.colTypes = {
            'string': StringFilterUI, 'number': NumberFilterUI, 'date': DateFilterUI, 'dateonly': DateFilterUI, 'boolean': BooleanFilterUI, 'datetime': DateFilterUI
        };
        this.parent = parent;
        this.filterSettings = filterSettings;
        this.serviceLocator = serviceLocator;
        this.customFilterOperators = customFltrOperators;
        this.filterObj = fltrObj;
        this.flMuiObj = new FlMenuOptrUI(this.parent, this.customFilterOperators, this.serviceLocator);
        this.l10n = this.serviceLocator.getService('localization');
        this.menuFilterBase = new CheckBoxFilterBase(parent);
    }
    FilterMenuRenderer.prototype.clearCustomFilter = function (col) {
        this.clearBtnClick(col);
    };
    FilterMenuRenderer.prototype.applyCustomFilter = function (args) {
        this.filterBtnClick(args.col);
    };
    FilterMenuRenderer.prototype.openDialog = function (args) {
        this.options = args;
        this.col = this.parent.getColumnByField(args.field);
        if (isNullOrUndefined(this.col.filter) || (isNullOrUndefined(this.col.filter.type) || this.col.filter.type === 'Menu')) { ///
            this.renderDlgContent(args.target, this.col);
        }
    };
    FilterMenuRenderer.prototype.closeDialog = function (target) {
        var _this = this;
        if (!this.dlgObj) {
            return;
        }
        var elem = document.getElementById(this.dlgObj.element.id);
        if (this.dlgObj && !this.dlgObj.isDestroyed && elem) {
            var argument = { cancel: false, column: this.col, target: target, element: elem };
            if (argument.cancel) {
                this.parent.isColumnMenuFilterClosing = false;
                return;
            }
            this.parent.notify(events.filterMenuClose, argument);
            this.isDialogOpen = false;
            if (this.isMenuCheck) {
                this.menuFilterBase.unWireEvents();
                this.parent.off(events.cBoxFltrComplete, this.actionComplete);
                this.isMenuCheck = false;
            }
            var column = this.col;
            if (!isNullOrUndefined(column.filter) && !isNullOrUndefined(column.filter.ui)
                && !isNullOrUndefined(column.filter.ui.destroy)) {
                var temp = column.filter.ui.destroy;
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                }
                temp();
            }
            if ((this.parent.isReact || this.parent.isVue) && this.col.filterTemplate && this.col.filterTemplate instanceof Function) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.parent.clearTemplate(['filterTemplate'], undefined, function () {
                    _this.dlgObj.destroy();
                });
            }
            else {
                this.dlgObj.destroy();
                remove(elem);
            }
            if (!isNullOrUndefined(this.dlgObj['storeActiveElement'])) {
                this.dlgObj['storeActiveElement'].focus();
            }
        }
        this.parent.notify(events.filterDialogClose, {});
    };
    FilterMenuRenderer.prototype.renderDlgContent = function (target, column) {
        var args = {
            requestType: events.filterBeforeOpen,
            columnName: column.field, columnType: column.type
        };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        this.parent.trigger(events.actionBegin, args);
        var mainDiv = this.parent.createElement('div', { className: 'e-flmenu-maindiv', id: column.uid + '-flmenu' });
        this.dlgDiv = this.parent.createElement('div', { className: 'e-flmenu', id: column.uid + '-flmdlg' });
        this.dlgDiv.setAttribute('aria-label', this.l10n.getConstant('FilterMenuDialogARIA'));
        if (this.parent.enableAdaptiveUI) {
            var responsiveCnt = document.querySelector('.e-resfilter > .e-dlg-content > .e-mainfilterdiv');
            responsiveCnt.appendChild(this.dlgDiv);
        }
        else {
            this.parent.element.appendChild(this.dlgDiv);
        }
        this.dlgObj = new Dialog({
            showCloseIcon: false,
            closeOnEscape: false,
            locale: this.parent.locale,
            visible: false,
            enableRtl: this.parent.enableRtl,
            created: this.dialogCreated.bind(this, target, column),
            position: this.parent.element.classList.contains('e-device') ? { X: 'center', Y: 'center' } : { X: '', Y: '' },
            target: this.parent.element.classList.contains('e-device') ? document.body : this.parent.element,
            buttons: [{
                    click: this.filterBtnClick.bind(this, column),
                    buttonModel: {
                        content: this.l10n.getConstant('FilterButton'), isPrimary: true,
                        cssClass: this.parent.cssClass ? 'e-flmenu-okbtn' + ' ' + this.parent.cssClass : 'e-flmenu-okbtn'
                    }
                },
                {
                    click: this.clearBtnClick.bind(this, column),
                    buttonModel: { content: this.l10n.getConstant('ClearButton'),
                        cssClass: this.parent.cssClass ? 'e-flmenu-cancelbtn' + ' ' + this.parent.cssClass : 'e-flmenu-cancelbtn' }
                }],
            content: mainDiv,
            width: (!isNullOrUndefined(parentsUntil(target, 'e-bigger'))) || this.parent.element.classList.contains('e-device') ? 260 : 250,
            animationSettings: { effect: 'None' },
            cssClass: this.parent.cssClass ? 'e-filter-popup' + ' ' + this.parent.cssClass : 'e-filter-popup'
        });
        var isStringTemplate = 'isStringTemplate';
        this.dlgObj["" + isStringTemplate] = true;
        this.renderResponsiveDialog();
        this.dlgObj.appendTo(this.dlgDiv);
    };
    FilterMenuRenderer.prototype.renderResponsiveDialog = function () {
        var gObj = this.parent;
        if (gObj.enableAdaptiveUI) {
            this.dlgObj.position = { X: '', Y: '' };
            this.dlgObj.target = document.querySelector('.e-resfilter > .e-dlg-content > .e-mainfilterdiv');
            this.dlgObj.width = '100%';
            this.dlgObj.isModal = false;
            this.dlgObj.buttons = [{}];
        }
    };
    FilterMenuRenderer.prototype.dialogCreated = function (target, column) {
        if (!Browser.isDevice && target) {
            getFilterMenuPostion(target, this.dlgObj);
        }
        else if (!this.options.isResponsiveFilter) {
            this.dlgObj.position = { X: 'center', Y: 'center' };
        }
        this.currentDialogCreatedColumn = column;
        this.renderFilterUI(target, column);
        if (!(column.isForeignColumn() && !(!isNullOrUndefined(column.filter) && !isNullOrUndefined(column.filter.ui)
            && !isNullOrUndefined(column.filter.ui.create)))) {
            this.afterRenderFilterUI();
        }
        var isReactCompiler = this.parent.isReact && typeof (column.filterTemplate) !== 'string';
        var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
            this.parent.parentDetails.parentInstObj.isReact;
        if (!isNullOrUndefined(column.filterTemplate) && !(isReactCompiler || isReactChild)) {
            this.dlgDiv.querySelector('.e-flmenu-valuediv').firstElementChild.focus();
            this.dlgDiv.querySelector('.e-flmenu-valuediv').firstElementChild.classList.add('e-input-focus');
        }
        else if (!isNullOrUndefined(this.dlgDiv.querySelector('.e-flmenu-input'))) {
            this.dlgDiv.querySelector('.e-flmenu-input').focus();
            this.dlgDiv.querySelector('.e-flmenu-input').parentElement.classList.add('e-input-focus');
        }
    };
    /**
     * Function to notify filterDialogCreated and trigger actionComplete
     *
     * @returns {void}
     * @hidden
     */
    FilterMenuRenderer.prototype.afterRenderFilterUI = function () {
        var column = this.currentDialogCreatedColumn;
        if (column.showColumnMenu) {
            this.parent.notify(events.filterDialogCreated, {});
        }
        if (this.parent.enableAdaptiveUI) {
            this.dlgObj.element.style.left = '0px';
            this.dlgObj.element.style.maxHeight = 'none';
        }
        else {
            this.dlgObj.element.style.maxHeight = this.maxHeight;
        }
        this.dlgObj.show();
        if (this.parent.getContent().firstElementChild.offsetHeight < this.dlgObj.element.offsetHeight &&
            !parentsUntil(this.parent.element, 'e-gantt-dialog')) {
            resetDialogAppend(this.parent, this.dlgObj);
        }
        var optrInput = this.dlgObj.element.querySelector('.e-flm_optrdiv').querySelector('input');
        var valInput = this.dlgObj.element.querySelector('.e-flmenu-valuediv').querySelector('input');
        if (optrInput.value === 'Empty' || optrInput.value === 'Not Empty' ||
            optrInput.value === 'Null' || optrInput.value === 'Not Null') {
            if (!isNullOrUndefined(valInput['ej2_instances'])) {
                valInput['ej2_instances'][0]['enabled'] = false;
            }
            else {
                valInput.setAttribute('disabled', 'true');
            }
        }
        else if (!isNullOrUndefined(valInput && valInput.getAttribute('disabled'))) {
            if (!isNullOrUndefined(valInput['ej2_instances'])) {
                valInput['ej2_instances'][0]['enabled'] = true;
            }
            else {
                valInput.removeAttribute('disabled');
            }
        }
        if (!column.filterTemplate) {
            this.writeMethod(column, this.dlgObj.element.querySelector('#' + column.uid + '-flmenu'));
        }
        var args = {
            requestType: events.filterAfterOpen,
            columnName: column.field, columnType: column.type
        };
        var filterModel = 'filterModel';
        args["" + filterModel] = this;
        this.isDialogOpen = true;
        if (!this.isMenuCheck) {
            this.parent.trigger(events.actionComplete, args);
        }
    };
    FilterMenuRenderer.prototype.renderFilterUI = function (target, col) {
        var dlgConetntEle = this.dlgObj.element.querySelector('.e-flmenu-maindiv');
        this.parent.log('column_type_missing', { column: col });
        this.renderOperatorUI(dlgConetntEle, target, col);
        this.renderFlValueUI(dlgConetntEle, target, col);
    };
    FilterMenuRenderer.prototype.renderOperatorUI = function (dlgConetntEle, target, column) {
        this.flMuiObj.renderOperatorUI(dlgConetntEle, target, column, this.dlgObj, this.filterObj.menuOperator);
    };
    FilterMenuRenderer.prototype.renderFlValueUI = function (dlgConetntEle, target, column) {
        var valueDiv = this.parent.createElement('div', { className: 'e-flmenu-valuediv' });
        var fObj = this.filterObj;
        dlgConetntEle.appendChild(valueDiv);
        var instanceofFilterUI = new this.colTypes[column.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        if (column.filterTemplate) {
            var fltrData = {};
            var valueInString = 'value';
            fltrData[column.field] = fltrData["" + valueInString] = fObj.values[column.field];
            if (column.foreignKeyValue) {
                fltrData[column.foreignKeyValue] = fObj.values[column.field];
                fltrData[column.field] = undefined;
            }
            var col = 'column';
            fltrData["" + col] = column;
            var isReactCompiler = this.parent.isReact && typeof (column.filterTemplate) !== 'string' &&
                !(column.filterTemplate.prototype && column.filterTemplate.prototype.CSPTemplate);
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            var tempID = this.parent.element.id + column.uid + 'filterTemplate';
            if (isReactCompiler || isReactChild) {
                column.getFilterTemplate()(fltrData, this.parent, 'filterTemplate', tempID, null, null, valueDiv);
                this.parent.renderTemplates();
            }
            else {
                var compElement = column.getFilterTemplate()(fltrData, this.parent, 'filterTemplate', tempID, null, null, null, this.parent.root);
                appendChildren(valueDiv, compElement);
            }
            if (this.isMenuCheck) {
                this.menuFilterBase.cBox = this.dlgObj.element.querySelector('.e-checkboxlist.e-fields');
                this.menuFilterBase.wireEvents();
                this.parent.on(events.cBoxFltrComplete, this.actionComplete, this);
                this.menuFilterBase.getAllData();
            }
        }
        else {
            if (!isNullOrUndefined(column.filter) && !isNullOrUndefined(column.filter.ui)
                && !isNullOrUndefined(column.filter.ui.create)) {
                var temp = column.filter.ui.create;
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                }
                temp({
                    column: column, target: valueDiv,
                    getOptrInstance: this.flMuiObj, dialogObj: this.dlgObj
                });
            }
            else {
                instanceofFilterUI.create({
                    column: column, target: valueDiv,
                    getOptrInstance: this.flMuiObj, localizeText: this.l10n, dialogObj: this.dlgObj
                });
            }
        }
    };
    FilterMenuRenderer.prototype.writeMethod = function (col, dlgContentEle) {
        var flValue;
        var target = dlgContentEle.querySelector('.e-flmenu-valinput');
        var instanceofFilterUI = new this.colTypes[col.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        var columns = this.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (col.uid === column.uid) {
                flValue = column.value;
            }
        }
        if (!isNullOrUndefined(col.filter) && !isNullOrUndefined(col.filter.ui)
            && !isNullOrUndefined(col.filter.ui.write)) {
            var temp = col.filter.ui.write;
            if (typeof temp === 'string') {
                temp = getValue(temp, window);
            }
            temp({ column: col, target: target, parent: this.parent, filteredValue: flValue });
        }
        else {
            instanceofFilterUI.write({ column: col, target: target, parent: this.parent, filteredValue: flValue });
        }
    };
    FilterMenuRenderer.prototype.filterBtnClick = function (col) {
        var flValue;
        var targ = this.dlgObj.element.querySelector('.e-flmenu-valuediv input');
        var flOptrValue = this.flMuiObj.getFlOperator();
        var instanceofFilterUI = new this.colTypes[col.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        if (col.filterTemplate) {
            var element = this.dlgDiv.querySelector('.e-flmenu-valuediv');
            var fltrValue = void 0;
            if (element.children[0].value) {
                fltrValue = element.children[0].value;
            }
            else {
                if (!isNullOrUndefined(element.children[0].ej2_instances)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    fltrValue = (this.parent.isAngular ? element.children[0] :
                        element.querySelector('input')).ej2_instances[0].value;
                }
                else {
                    var eControl = element.querySelector('.e-control');
                    if (!isNullOrUndefined(eControl)) {
                        fltrValue = col.type === 'boolean' ? eControl.checked :
                            !isNullOrUndefined(eControl.ej2_instances) ?
                                eControl.ej2_instances[0].value :
                                eControl.value;
                    }
                }
            }
            this.filterObj.filterByColumn(col.field, flOptrValue, fltrValue);
        }
        else {
            if (!isNullOrUndefined(col.filter) &&
                !isNullOrUndefined(col.filter.ui) && !isNullOrUndefined(col.filter.ui.read)) {
                var temp = col.filter.ui.read;
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                }
                // eslint-disable-next-line
                flValue = temp({ element: targ, column: col, operator: flOptrValue, fltrObj: this.filterObj });
            }
            else {
                instanceofFilterUI.read(targ, col, flOptrValue, this.filterObj);
            }
        }
        this.closeDialog();
        if (this.parent.showColumnMenu) {
            this.parent.notify(events.afterFilterColumnMenuClose, {});
        }
    };
    FilterMenuRenderer.prototype.closeResponsiveDialog = function () {
        this.closeDialog();
    };
    FilterMenuRenderer.prototype.clearBtnClick = function (column) {
        this.filterObj.removeFilteredColsByField(column.field);
        this.closeDialog();
        if (this.parent.showColumnMenu) {
            this.parent.notify(events.afterFilterColumnMenuClose, {});
        }
    };
    FilterMenuRenderer.prototype.destroy = function () {
        this.closeDialog();
    };
    /**
     * @returns {FilterUI} returns the filterUI
     * @hidden
     */
    FilterMenuRenderer.prototype.getFilterUIInfo = function () {
        return { field: this.col.field, operator: this.flMuiObj.getFlOperator() };
    };
    FilterMenuRenderer.prototype.getOperatorDropdown = function () {
        return this.flMuiObj.dropOptr;
    };
    FilterMenuRenderer.prototype.renderCheckBoxMenu = function () {
        this.isMenuCheck = true;
        this.menuFilterBase.updateModel(this.options);
        this.menuFilterBase.getAndSetChkElem(this.options);
        this.dlgObj.buttons = [{
                click: this.menuFilterBase.btnClick.bind(this.menuFilterBase),
                buttonModel: {
                    content: this.menuFilterBase.getLocalizedLabel('FilterButton'),
                    cssClass: 'e-primary', isPrimary: true
                }
            },
            {
                click: this.menuFilterBase.btnClick.bind(this.menuFilterBase),
                buttonModel: { cssClass: 'e-flat', content: this.menuFilterBase.getLocalizedLabel('ClearButton') }
            }];
        this.menuFilterBase.dialogObj = this.dlgObj;
        this.menuFilterBase.dlg = this.dlgObj.element;
        this.menuFilterBase.dlg.classList.add('e-menucheckbox');
        this.menuFilterBase.dlg.classList.remove('e-checkboxfilter');
        this.maxHeight = '800px';
        return this.menuFilterBase.sBox.innerHTML;
    };
    FilterMenuRenderer.prototype.actionComplete = function (args) {
        if (this.isMenuCheck) {
            this.parent.trigger(events.actionComplete, args);
        }
    };
    return FilterMenuRenderer;
}());
export { FilterMenuRenderer };
