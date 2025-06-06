var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EventHandler, remove, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownList, AutoComplete } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { distinctStringValues, isComplexField, getComplexFieldID, getCustomDateFormat, applyBiggerTheme, performComplexDataOperation, registerEventHandlers, removeEventHandlers, clearReactVueTemplates } from '../base/util';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { parentsUntil, appendChildren, extend, eventPromise, resetDialogAppend } from '../base/util';
import * as events from '../base/constant';
import { ContextMenu } from '@syncfusion/ej2-navigations';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
import * as literals from '../base/string-literals';
/**
 * @hidden
 * `ExcelFilter` module is used to handle filtering action.
 */
var ExcelFilterBase = /** @class */ (function (_super) {
    __extends(ExcelFilterBase, _super);
    /**
     * Constructor for excel filtering module
     *
     * @param {IXLFilter} parent - parent details
     * @param {Object} customFltrOperators - operator details
     * @hidden
     */
    function ExcelFilterBase(parent, customFltrOperators) {
        var _this = _super.call(this, parent) || this;
        _this.childRefs = [];
        _this.eventHandlers = {};
        _this.isDevice = false;
        _this.focusedMenuItem = null;
        _this.customFilterOperators = customFltrOperators;
        _this.isExcel = true;
        return _this;
    }
    ExcelFilterBase.prototype.getCMenuDS = function (type, operator) {
        var options = {
            number: ['Equal', 'NotEqual', '', 'LessThan', 'LessThanOrEqual', 'GreaterThan',
                'GreaterThanOrEqual', 'Between', '', 'CustomFilter'],
            string: ['Equal', 'NotEqual', '', 'StartsWith', 'EndsWith', '', 'Contains', 'NotContains', '', 'CustomFilter']
        };
        options.date = options.number;
        options.datetime = options.number;
        options.dateonly = options.number;
        var model = [];
        for (var i = 0; i < options["" + type].length; i++) {
            if (options["" + type][parseInt(i.toString(), 10)].length) {
                if (operator) {
                    model.push({
                        text: this.getLocalizedLabel(options["" + type][parseInt(i.toString(), 10)]) + '...',
                        iconCss: 'e-icons e-icon-check ' + (operator === options["" + type][parseInt(i.toString(), 10)].toLowerCase() ? '' : 'e-emptyicon')
                    });
                }
                else {
                    model.push({
                        text: this.getLocalizedLabel(options["" + type][parseInt(i.toString(), 10)]) + '...'
                    });
                }
            }
            else {
                model.push({ separator: true });
            }
        }
        return model;
    };
    /**
     * To destroy the filter bar.
     *
     * @returns {void}
     * @hidden
     */
    ExcelFilterBase.prototype.destroy = function () {
        if (this.dlg) {
            this.unwireExEvents();
            _super.prototype.closeDialog.call(this);
        }
        if (!this.isDevice && this.menuObj) {
            var li = this.menuObj.element.querySelector('li.e-focused');
            if (!(li && parentsUntil(li, 'e-excel-menu'))) {
                this.destroyCMenu();
            }
        }
        if (this.dlgObj && !this.dlgObj.isDestroyed) {
            this.removeDialog();
        }
    };
    ExcelFilterBase.prototype.createMenu = function (type, isFiltered, isCheckIcon, eleOptions) {
        var options = { string: 'TextFilter', date: 'DateFilter', dateonly: 'DateFilter', datetime: 'DateTimeFilter', number: 'NumberFilter' };
        this.menu = this.parent.createElement('div', { className: 'e-contextmenu-wrapper' });
        if (this.parent.enableRtl) {
            this.menu.classList.add('e-rtl');
        }
        else {
            this.menu.classList.remove('e-rtl');
        }
        if (this.parent.cssClass) {
            this.menu.classList.add(this.parent.cssClass);
        }
        var ul = this.parent.createElement('ul');
        var icon = isFiltered ? 'e-excl-filter-icon e-filtered' : 'e-excl-filter-icon';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.allowSorting && this.parent.getModuleName() === 'grid'
            && !this.options.isResponsiveFilter) {
            var hdrele = this.parent.getColumnHeaderByUid(eleOptions.uid).getAttribute('aria-sort');
            var colIsSort = this.parent.getColumnByField(eleOptions.field).allowSorting;
            var isAsc = (!colIsSort || hdrele === 'ascending') ? 'e-disabled e-excel-ascending' : 'e-excel-ascending';
            var isDesc = (!colIsSort || hdrele === 'descending') ? 'e-disabled e-excel-descending' : 'e-excel-descending';
            var ascName = (type === 'string') ? this.getLocalizedLabel('SortAtoZ') : (type === 'datetime' || type === 'date') ?
                this.getLocalizedLabel('SortByOldest') : this.getLocalizedLabel('SortSmallestToLargest');
            var descName = (type === 'string') ? this.getLocalizedLabel('SortZtoA') : (type === 'datetime' || type === 'date') ?
                this.getLocalizedLabel('SortByNewest') : this.getLocalizedLabel('SortLargestToSmallest');
            ul.appendChild(this.createMenuElem(ascName, isAsc, 'e-sortascending'));
            ul.appendChild(this.createMenuElem(descName, isDesc, 'e-sortdescending'));
            var separator = this.parent.createElement('li', { className: 'e-separator e-menu-item e-excel-separator' });
            ul.appendChild(separator);
        }
        if (!this.options.isResponsiveFilter) {
            ul.appendChild(this.createMenuElem(this.getLocalizedLabel('ClearFilter'), isFiltered ? '' : 'e-disabled', icon));
        }
        if (type !== 'boolean') {
            ul.appendChild(this.createMenuElem(this.getLocalizedLabel(options["" + type]), 'e-submenu', isCheckIcon && this.ensureTextFilter() ? 'e-icon-check' : icon + ' e-emptyicon', true));
        }
        this.menu.appendChild(ul);
        this.parent.notify(events.beforeFltrcMenuOpen, { element: this.menu });
        this.parent.notify(events.refreshCustomFilterClearBtn, { isFiltered: isFiltered });
    };
    ExcelFilterBase.prototype.createMenuElem = function (val, className, iconName, isSubMenu) {
        var li = this.parent.createElement('li', { className: className + ' e-menu-item' });
        li.innerHTML = val;
        li.tabIndex = li.classList.contains('e-disabled') ? -1 : 0;
        li.insertBefore(this.parent.createElement('span', { className: 'e-menu-icon e-icons ' + iconName, attrs: { 'aria-hidden': 'true' } }), li.firstChild);
        if (isSubMenu) {
            li.appendChild(this.parent.createElement('span', { className: 'e-icons e-caret' }));
        }
        return li;
    };
    ExcelFilterBase.prototype.wireExEvents = function () {
        if (!Browser.isDevice) {
            EventHandler.add(this.dlg, 'mouseover', this.hoverHandler, this);
        }
        EventHandler.add(this.dlg, 'click', this.clickExHandler, this);
        EventHandler.add(this.dlg, 'keyup', this.keyUp, this);
        EventHandler.add(this.dlg, 'keydown', this.keyDown, this);
    };
    ExcelFilterBase.prototype.unwireExEvents = function () {
        if (!Browser.isDevice) {
            EventHandler.remove(this.dlg, 'mouseover', this.hoverHandler);
        }
        EventHandler.remove(this.dlg, 'click', this.clickExHandler);
        EventHandler.remove(this.dlg, 'keyup', this.keyUp);
        EventHandler.remove(this.dlg, 'keydown', this.keyDown);
    };
    ExcelFilterBase.prototype.clickExHandler = function (e) {
        var options = { string: 'TextFilter', date: 'DateFilter', datetime: 'DateTimeFilter', number: 'NumberFilter' };
        var menuItem = parentsUntil(e.target, 'e-menu-item');
        if (menuItem) {
            if (this.getLocalizedLabel('ClearFilter') === menuItem.innerText.trim()) {
                this.clearFilter();
                this.closeDialog();
            }
            else if ((this.options.isResponsiveFilter || Browser.isDevice)
                && this.getLocalizedLabel(options[this.options.type]) === menuItem.innerText.trim()) {
                this.hoverHandler(e);
            }
        }
    };
    ExcelFilterBase.prototype.focusNextOrPrevElement = function (e, focusableElements, focusClassName) {
        var nextIndex = (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) ? focusableElements.indexOf(document.activeElement) - 1
            : focusableElements.indexOf(document.activeElement) + 1;
        var nextElement = focusableElements[((nextIndex + focusableElements.length) % focusableElements.length)];
        // Set focus on the next / previous element
        if (nextElement) {
            nextElement.focus();
            var focusClass = nextElement.classList.contains('e-chk-hidden') ? 'e-chkfocus' : focusClassName;
            var target = nextElement.classList.contains('e-chk-hidden') ? parentsUntil(nextElement, 'e-ftrchk') : parentsUntil(nextElement, 'e-menu-item');
            this.excelSetFocus(target, focusClass);
        }
    };
    ExcelFilterBase.prototype.keyUp = function (e) {
        if ((e.key === 'Tab' && e.shiftKey) || e.key === 'Tab') {
            var focusClass = e.target.classList.contains('e-chk-hidden') ? 'e-chkfocus' : 'e-menufocus';
            var target = e.target.classList.contains('e-menu-item')
                ? parentsUntil(e.target, 'e-menu-item') : parentsUntil(e.target, 'e-ftrchk');
            this.excelSetFocus(target, focusClass);
        }
        else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.altKey) {
            e.preventDefault();
            var focusableElements = Array.from(this.dlg.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"]), .e-menu-item:not(.e-disabled):not(.e-separator)'));
            this.focusNextOrPrevElement(e, focusableElements, 'e-menufocus');
        }
        else if ((e.key === 'Enter' || e.code === 'ArrowRight') && e.target.classList.contains('e-menu-item')) {
            e.preventDefault();
            e.target.click();
            if (e.target.classList.contains('e-submenu')) {
                this.hoverHandler(e);
                this.menuObj.element.querySelector('.e-menu-item').focus();
                this.excelSetFocus(parentsUntil(this.menuObj.element.querySelector('.e-menu-item'), 'e-menu-item'), 'e-focused');
                this.focusedMenuItem = this.menuObj.element.querySelector('.e-menu-item');
            }
        }
    };
    ExcelFilterBase.prototype.keyDown = function (e) {
        //prevented up and down arrow key press default functionality to prevent the browser scroll when performing keyboard navigation in excel filter element.
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };
    ExcelFilterBase.prototype.excelSetFocus = function (elem, className) {
        var prevElem = this.cmenu.querySelector('.' + className);
        var menuFocusElem = this.menu.querySelector('.' + className);
        if (prevElem) {
            prevElem.classList.remove(className);
        }
        if (menuFocusElem && menuFocusElem.classList.contains('e-menufocus')) {
            menuFocusElem.classList.remove(className);
        }
        if (elem) {
            elem.classList.add(className);
        }
    };
    ExcelFilterBase.prototype.destroyCMenu = function () {
        this.isCMenuOpen = false;
        if (this.menuObj && !this.menuObj.isDestroyed) {
            this.menuObj.destroy();
            EventHandler.remove(this.menuObj.element, 'keydown', this.contextKeyDownHandler);
            remove(this.cmenu);
            this.parent.notify(events.renderResponsiveCmenu, { target: null, header: '', isOpen: false, col: this.options.column });
        }
    };
    ExcelFilterBase.prototype.hoverHandler = function (e) {
        if (this.options.isResponsiveFilter && e.type === 'mouseover') {
            return;
        }
        var target = e.target.querySelector('.e-contextmenu');
        var li = parentsUntil(e.target, 'e-menu-item');
        var focused = this.menu.querySelector('.e-focused');
        var isSubMenu;
        if (focused) {
            focused.classList.remove('e-focused');
        }
        if (li) {
            li.classList.add('e-focused');
            isSubMenu = li.classList.contains('e-submenu');
        }
        if (target) {
            return;
        }
        if (!isSubMenu) {
            var submenu = this.menu.querySelector('.e-submenu');
            if (!isNullOrUndefined(submenu)) {
                submenu.classList.remove('e-selected');
            }
            this.destroyCMenu();
        }
        var selectedMenu = this.ensureTextFilter();
        if (!this.isCMenuOpen && isSubMenu) {
            li.classList.add('e-selected');
            this.isCMenuOpen = true;
            var menuOptions = {
                items: this.getCMenuDS(this.options.type, selectedMenu ? selectedMenu.replace(/\s/g, '') : undefined),
                select: this.selectHandler.bind(this),
                onClose: this.destroyCMenu.bind(this),
                enableRtl: this.parent.enableRtl,
                animationSettings: { effect: Browser.isDevice ? 'ZoomIn' : 'None' },
                beforeClose: this.preventClose.bind(this),
                cssClass: this.options.isResponsiveFilter && this.parent.cssClass ?
                    'e-res-contextmenu-wrapper' + ' ' + this.parent.cssClass : this.options.isResponsiveFilter ?
                    'e-res-contextmenu-wrapper' : this.parent.cssClass ? this.parent.cssClass : ''
            };
            this.parent.element.appendChild(this.cmenu);
            this.menuObj = new ContextMenu(menuOptions, this.cmenu);
            EventHandler.add(this.menuObj.element, 'keydown', this.contextKeyDownHandler, this);
            var client = this.menu.querySelector('.e-submenu').getBoundingClientRect();
            var pos = { top: 0, left: 0 };
            if (this.options.isResponsiveFilter) {
                var options = { string: 'TextFilter', date: 'DateFilter', datetime: 'DateTimeFilter', number: 'NumberFilter' };
                var content = document.querySelector('.e-responsive-dialog > .e-dlg-header-content');
                var height = content.offsetHeight + 4;
                this.menuObj.element.style.height = 'calc(100% - ' + height + 'px)';
                this.menuObj['open'](height, 0, document.body);
                var header = this.getLocalizedLabel(options[this.options.type]);
                this.parent.notify(events.renderResponsiveCmenu, {
                    target: this.menuObj.element.parentElement, header: header, isOpen: true
                });
            }
            else {
                if (Browser.isDevice) {
                    this.isDevice = true;
                    var contextRect = this.getContextBounds();
                    pos.top = (window.innerHeight - contextRect.height) / 2;
                    pos.left = (window.innerWidth - contextRect.width) / 2;
                    this.closeDialog();
                    this.isDevice = false;
                }
                else {
                    pos.top = Browser.isIE ? window.pageYOffset + client.top : window.scrollY + client.top;
                    pos.left = this.getCMenuYPosition(this.dlg);
                }
                this.menuObj['open'](pos.top, pos.left, e.target);
            }
            applyBiggerTheme(this.parent.element, this.menuObj.element.parentElement);
        }
    };
    ExcelFilterBase.prototype.contextKeyDownHandler = function (e) {
        if ((e.key === 'Tab' && e.shiftKey) || e.key === 'Tab') {
            e.preventDefault();
            var focusableElements = Array.from(this.menuObj.element.querySelectorAll('[tabindex]:not([tabindex="-1"]), .e-menu-item:not(.e-disabled):not(.e-separator)'));
            // Focus the next / previous context menu item
            this.focusNextOrPrevElement(e, focusableElements, 'e-focused');
        }
        else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
            e.preventDefault();
            this.menuObj.close();
            this.focusedMenuItem = null;
            document.querySelector('.e-submenu.e-menu-item').classList.remove('e-selected');
            document.querySelector('.e-submenu.e-menu-item').focus();
        }
    };
    ExcelFilterBase.prototype.ensureTextFilter = function () {
        var selectedMenu;
        var predicates = this.existingPredicate[this.options.field];
        if (predicates && predicates.length === 2) {
            if (predicates[0].operator === 'greaterthanorequal' && predicates[1].operator === 'lessthanorequal') {
                selectedMenu = 'between';
            }
            else {
                selectedMenu = 'customfilter';
            }
        }
        else {
            if (predicates && predicates.length === 1) {
                this.optrData = this.customFilterOperators[this.options.type + 'Operator'];
                selectedMenu = predicates[0].operator;
            }
        }
        return selectedMenu;
    };
    ExcelFilterBase.prototype.preventClose = function (args) {
        if (this.options && this.options.isResponsiveFilter && args.event) {
            var target = args.event.target;
            var isFilterBack = target.classList && (target.classList.contains('e-resfilterback')
                || target.classList.contains('e-res-back-btn') || target.classList.contains('e-menu-item'));
            args.cancel = !isFilterBack;
        }
        else {
            if (args.event instanceof MouseEvent && args.event.target && args.event.target.classList &&
                args.event.target.classList.contains('e-submenu')) {
                args.cancel = true;
            }
        }
    };
    ExcelFilterBase.prototype.getContextBounds = function () {
        this.menuObj.element.style.display = 'block';
        return this.menuObj.element.getBoundingClientRect();
    };
    ExcelFilterBase.prototype.getCMenuYPosition = function (target) {
        var contextWidth = this.getContextBounds().width;
        var targetPosition = target.getBoundingClientRect();
        var leftPos = targetPosition.right + contextWidth - this.parent.element.clientWidth;
        var targetBorder = target.offsetWidth - target.clientWidth;
        targetBorder = targetBorder ? targetBorder + 1 : 0;
        return (leftPos < 1) ? (targetPosition.right + 1 - targetBorder) : (targetPosition.left - contextWidth - 1 + targetBorder);
    };
    ExcelFilterBase.prototype.openDialog = function (options) {
        var _this = this;
        this.updateModel(options);
        this.getAndSetChkElem(options);
        this.showDialog(options);
        if (options.cancel) {
            return;
        }
        this.dialogObj.dataBind();
        var filterLength = (this.existingPredicate[options.field] && this.existingPredicate[options.field].length) ||
            this.options.filteredColumns.filter(function (col) {
                return _this.options.field === col.field;
            }).length;
        this.createMenu(options.type, filterLength > 0, (filterLength === 1 || filterLength === 2), options);
        this.dlg.insertBefore(this.menu, this.dlg.firstChild);
        this.dlg.classList.add('e-excelfilter');
        if (this.parent && !isNullOrUndefined(this.parent.getContent) && this.parent.getContent()
            && this.parent.getContent().firstElementChild
                .offsetHeight < this.dlg.offsetHeight && !parentsUntil(this.parent.element, 'e-gantt-dialog')) {
            resetDialogAppend(this.parent, this.dialogObj);
        }
        if (this.parent.enableRtl) {
            this.dlg.classList.add('e-rtl');
        }
        this.dlg.classList.remove('e-checkboxfilter');
        this.cmenu = this.parent.createElement('ul', { className: 'e-excel-menu' });
        var menuItems = this.dlg.querySelectorAll('.e-menu-item');
        menuItems.forEach(function (menuItem) {
            if (menuItem.scrollWidth > menuItem.clientWidth) {
                menuItem.setAttribute('title', menuItem.textContent);
            }
        });
        if (options.column.showColumnMenu) {
            this.parent.notify(events.filterDialogCreated, {});
        }
        this.wireExEvents();
    };
    ExcelFilterBase.prototype.closeDialog = function () {
        this.destroy();
    };
    ExcelFilterBase.prototype.selectHandler = function (e) {
        if (e.item) {
            this.parent.notify(events.filterCmenuSelect, {});
            this.menuItem = e.item;
            this.closeDialog();
            this.renderDialogue(e);
        }
    };
    /**
     * @hidden
     * @param {MenuEventArgs} e - event args
     * @returns {void}
     */
    ExcelFilterBase.prototype.renderDialogue = function (e) {
        var _this = this;
        var target = e ? e.element : undefined;
        var column = this.options.field;
        var isComplex = !isNullOrUndefined(column) && isComplexField(column);
        var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
        var mainDiv = this.parent.createElement('div', {
            className: 'e-xlfl-maindiv',
            id: isComplex ? complexFieldName + '-xlflmenu' : column + '-xlflmenu'
        });
        this.dlgDiv = this.parent.createElement('div', {
            className: 'e-xlflmenu',
            id: isComplex ? complexFieldName + '-xlfldlg' : column + '-xlfldlg'
        });
        if (this.options.isResponsiveFilter) {
            var responsiveCnt = document.querySelector('.e-resfilter > .e-dlg-content > .e-xl-customfilterdiv');
            responsiveCnt.appendChild(this.dlgDiv);
        }
        else {
            this.parent.element.appendChild(this.dlgDiv);
        }
        this.dlgObj = new Dialog({
            header: this.getLocalizedLabel('CustomFilter'),
            isModal: true,
            overlayClick: this.removeDialog.bind(this),
            showCloseIcon: true,
            locale: this.parent.locale,
            closeOnEscape: true,
            target: document.body,
            // target: this.parent.element,
            visible: false,
            enableRtl: this.parent.enableRtl,
            open: function () {
                var rows = [].slice.call(_this.dlgObj.element.querySelectorAll('table.e-xlfl-table tr.e-xlfl-fields'));
                for (var i = 0; i < rows.length; i++) {
                    var valInput = rows[i].children[1].querySelector('.e-control');
                    var dropDownList = rows[i]
                        .querySelector('.e-dropdownlist.e-control')['ej2_instances'][0];
                    if (dropDownList.value === 'isempty' || dropDownList.value === 'isnotempty' ||
                        dropDownList.value === 'isnull' || dropDownList.value === 'isnotnull') {
                        valInput['ej2_instances'][0]['enabled'] = false;
                    }
                    else if (valInput && !isNullOrUndefined(valInput.getAttribute('disabled'))) {
                        valInput['ej2_instances'][0]['enabled'] = true;
                    }
                }
                var row = _this.dlgObj.element.querySelector('table.e-xlfl-table>tr');
                if (_this.options.column.filterTemplate) {
                    var templateField_1 = isComplexField(_this.options.column.field) ?
                        getComplexFieldID(_this.options.column.field) : _this.options.column.field;
                    var isReactCompiler = _this.parent.isReact && typeof (_this.options.column.filterTemplate) !== 'string' &&
                        !(_this.options.column.filterTemplate.prototype && _this.options.column.filterTemplate.prototype.CSPTemplate);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var isReactChild = _this.parent.parentDetails && _this.parent.parentDetails.parentInstObj &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.parent.parentDetails.parentInstObj.isReact;
                    if (isReactCompiler || isReactChild) {
                        _this.parent.renderTemplates(function () {
                            row.querySelector('#' + templateField_1 + '-xlfl-frstvalue').focus();
                        });
                    }
                    else {
                        row.querySelector('#' + templateField_1 + '-xlfl-frstvalue').focus();
                    }
                }
                else {
                    //(row.cells[1].querySelector('input:not([type=hidden])') as HTMLElement).focus();
                }
            },
            close: this.removeDialog.bind(this),
            created: this.createdDialog.bind(this, target, column),
            buttons: [{
                    click: this.filterBtnClick.bind(this, column),
                    buttonModel: {
                        content: this.getLocalizedLabel('OKButton'), isPrimary: true,
                        cssClass: this.parent.cssClass ? 'e-xlfl-okbtn' + ' ' + this.parent.cssClass : 'e-xlfl-okbtn'
                    }
                },
                {
                    click: this.removeDialog.bind(this),
                    buttonModel: { content: this.getLocalizedLabel('CancelButton'),
                        cssClass: this.parent.cssClass ? 'e-xlfl-cancelbtn' + ' ' + this.parent.cssClass : 'e-xlfl-cancelbtn' }
                }],
            content: mainDiv,
            width: 430,
            animationSettings: { effect: 'None' },
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        var isStringTemplate = 'isStringTemplate';
        this.dlgObj["" + isStringTemplate] = true;
        this.renderResponsiveDialog();
        this.dlgDiv.setAttribute('aria-label', this.getLocalizedLabel('CustomFilterDialogARIA'));
        this.childRefs.unshift(this.dlgObj);
        this.dlgObj.appendTo(this.dlgDiv);
    };
    ExcelFilterBase.prototype.renderResponsiveDialog = function () {
        if (this.options.isResponsiveFilter) {
            var rowResponsiveDlg = document.querySelector('.e-row-responsive-filter');
            if (rowResponsiveDlg) {
                rowResponsiveDlg.classList.remove('e-row-responsive-filter');
            }
            this.dlgObj.buttons = [{}];
            this.dlgObj.header = undefined;
            this.dlgObj.position = { X: '', Y: '' };
            this.dlgObj.target = document.querySelector('.e-resfilter > .e-dlg-content > .e-xl-customfilterdiv');
            this.dlgObj.width = '100%';
            this.dlgObj.isModal = false;
            this.dlgObj.showCloseIcon = false;
        }
    };
    /**
     * @hidden
     * @returns {void}
     */
    ExcelFilterBase.prototype.removeDialog = function () {
        this.parent.notify(events.customFilterClose, {});
        if ((this.parent.isReact || this.parent.isVue) && this.parent.destroyTemplate !== undefined) {
            clearReactVueTemplates(this.parent, ['filterTemplate']);
        }
        this.removeObjects(this.childRefs);
        remove(this.dlgDiv);
        this.parent.notify(events.filterDialogClose, {});
    };
    ExcelFilterBase.prototype.createdDialog = function (target, column) {
        this.renderCustomFilter(target, column);
        this.dlgObj.element.style.left = '0px';
        if (!this.options.isResponsiveFilter) {
            this.dlgObj.element.style.top = '0px';
        }
        else {
            var content = document.querySelector('.e-responsive-dialog > .e-dlg-header-content');
            var height = content.offsetHeight + 4;
            this.dlgObj.element.style.top = height + 'px';
        }
        if (!this.options.isResponsiveFilter && Browser.isDevice && window.innerWidth < 440) {
            this.dlgObj.element.style.width = '90%';
        }
        this.parent.notify(events.beforeCustomFilterOpen, { column: column, dialog: this.dialogObj });
        this.dlgObj.show();
        applyBiggerTheme(this.parent.element, this.dlgObj.element.parentElement);
    };
    ExcelFilterBase.prototype.renderCustomFilter = function (target, column) {
        var dlgConetntEle = this.dlgObj.element.querySelector('.e-xlfl-maindiv');
        var dlgFields = this.parent.createElement('div', { innerHTML: this.getLocalizedLabel('ShowRowsWhere'), className: 'e-xlfl-dlgfields' });
        dlgConetntEle.appendChild(dlgFields);
        //column name
        var fieldSet = this.parent.createElement('div', { innerHTML: this.options.displayName, className: 'e-xlfl-fieldset' });
        dlgConetntEle.appendChild(fieldSet);
        this.renderFilterUI(column, dlgConetntEle);
    };
    /**
     * @hidden
     * @param {string} col - Defines column details
     * @returns {void}
     */
    ExcelFilterBase.prototype.filterBtnClick = function (col) {
        var isComplex = !isNullOrUndefined(col) && isComplexField(col);
        var complexFieldName = !isNullOrUndefined(col) && getComplexFieldID(col);
        var colValue = isComplex ? complexFieldName : col;
        var fValue = this.dlgDiv.querySelector('#' + colValue + '-xlfl-frstvalue').ej2_instances[0];
        var fOperator = this.dlgDiv.querySelector('#' + colValue + '-xlfl-frstoptr').ej2_instances[0];
        var sValue = this.dlgDiv.querySelector('#' + colValue + '-xlfl-secndvalue').ej2_instances[0];
        var sOperator = this.dlgDiv.querySelector('#' + colValue + '-xlfl-secndoptr').ej2_instances[0];
        var checkBoxValue;
        if (this.options.type === 'string') {
            var checkBox = this.dlgDiv.querySelector('#' + colValue + '-xlflmtcase').ej2_instances[0];
            checkBoxValue = checkBox.checked;
        }
        var predicateSelector = this.dlgDiv.querySelector('#' + colValue + 'e-xlfl-frstpredicate').ej2_instances[0];
        var predicate = (predicateSelector.checked ? 'and' : 'or');
        this.filterByColumn(this.options.field, fOperator.value, fValue.value, predicate, checkBoxValue, this.options.ignoreAccent, sOperator.value, sValue.value);
        this.removeDialog();
    };
    /**
     * @hidden
     * Filters grid row by column name with given options.
     *
     * @param {string} fieldName - Defines the field name of the filter column.
     * @param {string} firstOperator - Defines the first operator by how to filter records.
     * @param {string | number | Date | boolean} firstValue - Defines the first value which is used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query with another by using AND or OR predicate.
     * @param {boolean} matchCase - If ignore case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     * @param {boolean} ignoreAccent - If ignoreAccent set to true, then ignores the diacritic characters or accents when filtering.
     * @param {string} secondOperator - Defines the second operator by how to filter records.
     * @param {string | number | Date | boolean} secondValue - Defines the first value which is used to filter records.
     * @returns {void}
     */
    ExcelFilterBase.prototype.filterByColumn = function (fieldName, firstOperator, firstValue, predicate, matchCase, ignoreAccent, secondOperator, secondValue) {
        var col = this.parent.getColumnByField ? this.parent.getColumnByField(fieldName) : this.options.column;
        var field = this.isForeignColumn(col) ? col.foreignKeyValue : fieldName;
        var fColl = [];
        var mPredicate;
        var arg = {
            instance: this, handler: this.filterByColumn, arg1: fieldName, arg2: firstOperator, arg3: firstValue, arg4: predicate,
            arg5: matchCase, arg6: ignoreAccent, arg7: secondOperator, arg8: secondValue, cancel: false
        };
        this.parent.notify(events.fltrPrevent, arg);
        if (arg.cancel) {
            return;
        }
        fColl.push({
            field: field,
            predicate: predicate,
            matchCase: matchCase,
            ignoreAccent: ignoreAccent,
            operator: firstOperator,
            value: arg.arg3,
            type: this.options.type
        });
        mPredicate = new Predicate(field, firstOperator.toLowerCase(), arg.arg3, !matchCase, ignoreAccent);
        if (!isNullOrUndefined(secondOperator)) {
            fColl.push({
                field: field,
                predicate: predicate,
                matchCase: matchCase,
                ignoreAccent: ignoreAccent,
                operator: secondOperator,
                value: arg.arg8,
                type: this.options.type
            });
            mPredicate = mPredicate["" + predicate](field, secondOperator.toLowerCase(), secondValue, !matchCase, ignoreAccent);
        }
        var args = {
            action: 'filtering', filterCollection: fColl, field: this.options.field,
            ejpredicate: mPredicate, actualPredicate: fColl
        };
        if (this.isForeignColumn(col)) {
            this.foreignKeyFilter(args, fColl, mPredicate);
        }
        else {
            this.options.handler(args);
        }
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderOperatorUI = function (column, table, elementID, predicates, isFirst) {
        var fieldElement = this.parent.createElement('tr', { className: 'e-xlfl-fields', attrs: { role: 'row' } });
        table.appendChild(fieldElement);
        var xlfloptr = this.parent.createElement('td', { className: 'e-xlfl-optr' });
        fieldElement.appendChild(xlfloptr);
        var optrDiv = this.parent.createElement('div', { className: 'e-xlfl-optrdiv' });
        var isComplex = !isNullOrUndefined(column) && isComplexField(column);
        var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
        var optrInput = this.parent
            .createElement('input', { id: isComplex ? complexFieldName + elementID : column + elementID });
        optrDiv.appendChild(optrInput);
        xlfloptr.appendChild(optrDiv);
        var optr = this.options.type + 'Operator';
        var dropDatasource = this.customFilterOperators["" + optr];
        this.optrData = dropDatasource;
        var selectedValue = this.dropSelectedVal(this.options.column, predicates, isFirst);
        //Trailing three dots are sliced.
        var menuText = '';
        if (this.menuItem) {
            menuText = this.menuItem.text.slice(0, -3);
            if (menuText !== this.getLocalizedLabel('CustomFilter')) {
                selectedValue = isFirst ? menuText : undefined;
            }
            if (menuText === this.getLocalizedLabel('Between')) {
                selectedValue = this.getLocalizedLabel(isFirst ? 'GreaterThanOrEqual' : 'LessThanOrEqual');
            }
        }
        var col = this.options.column;
        var dropOptr = new DropDownList(extend({
            dataSource: dropDatasource,
            fields: { text: 'text', value: 'value' },
            text: selectedValue,
            enableRtl: this.parent.enableRtl,
            cssClass: this.parent.cssClass ? this.parent.cssClass : null
        }, col.filter.params));
        this.childRefs.unshift(dropOptr);
        var evt = { 'open': this.dropDownOpen.bind(this), 'change': this.dropDownValueChange.bind(this) };
        registerEventHandlers(optrInput.id, [literals.open, literals.change], evt, this);
        dropOptr.addEventListener(literals['open'], this.eventHandlers[optrInput.id][literals.open]);
        dropOptr.addEventListener(literals.change, this.eventHandlers[optrInput.id][literals.change]);
        dropOptr.appendTo(optrInput);
        var operator = this.getSelectedValue(selectedValue);
        return { fieldElement: fieldElement, operator: operator };
    };
    ExcelFilterBase.prototype.removeHandlersFromComponent = function (component) {
        if (component.element.classList.contains('e-dropdownlist')) {
            removeEventHandlers(component, [literals.open, literals.change], this);
        }
        else if (component.element.classList.contains('e-autocomplete')) {
            removeEventHandlers(component, [events.actionComplete, literals.focus], this);
        }
    };
    ExcelFilterBase.prototype.dropDownOpen = function (args) {
        args.popup.element.style.zIndex = (this.dialogObj.zIndex + 1).toString();
    };
    ExcelFilterBase.prototype.dropDownValueChange = function (args) {
        if (args.element.id.includes('-xlfl-frstoptr')) {
            this.firstOperator = args.value.toString();
        }
        else {
            this.secondOperator = args.value.toString();
        }
        var valInput = args.element.closest('.e-xlfl-fields').children[1].querySelector('.e-control');
        var dropDownList = args.element['ej2_instances'][0];
        if (dropDownList.value === 'isempty' || dropDownList.value === 'isnotempty' ||
            dropDownList.value === 'isnull' || dropDownList.value === 'isnotnull') {
            valInput['ej2_instances'][0]['enabled'] = false;
        }
        else if (!isNullOrUndefined(valInput.getAttribute('disabled'))) {
            valInput['ej2_instances'][0]['enabled'] = true;
        }
    };
    /**
     * @hidden
     * @returns {FilterUI} returns filter UI
     */
    ExcelFilterBase.prototype.getFilterUIInfo = function () {
        return { firstOperator: this.firstOperator, secondOperator: this.secondOperator, field: this.options.field };
    };
    ExcelFilterBase.prototype.getSelectedValue = function (text) {
        var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('text', 'equal', text));
        return !isNullOrUndefined(selectedField[0]) ? selectedField[0].value : '';
    };
    ExcelFilterBase.prototype.dropSelectedVal = function (col, predicates, isFirst) {
        var operator;
        if (predicates && predicates.length > 0) {
            operator = predicates.length === 2 ?
                (isFirst ? predicates[0].operator : predicates[1].operator) :
                (isFirst ? predicates[0].operator : undefined);
        }
        else if (isFirst && col.type === 'string' && !col.filter.operator) {
            operator = 'startswith';
        }
        else {
            operator = isFirst ? col.filter.operator || 'equal' : undefined;
        }
        return this.getSelectedText(operator);
    };
    ExcelFilterBase.prototype.getSelectedText = function (operator) {
        var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('value', 'equal', operator));
        return !isNullOrUndefined(selectedField[0]) ? selectedField[0].text : '';
    };
    ExcelFilterBase.prototype.renderFilterUI = function (column, dlgConetntEle) {
        var predicates = this.existingPredicate["" + column];
        var table = this.parent.createElement('table', { className: 'e-xlfl-table', attrs: { role: 'grid' } });
        dlgConetntEle.appendChild(table);
        var colGroup = this.parent.createElement(literals.colGroup);
        colGroup.innerHTML = '<col style="width: 50%"></col><col style="width: 50%"></col>';
        table.appendChild(colGroup);
        //Renders first dropdown
        var optr = this.renderOperatorUI(column, table, '-xlfl-frstoptr', predicates, true);
        this.firstOperator = optr.operator;
        //Renders first value
        this.renderFlValueUI(column, optr, '-xlfl-frstvalue', predicates, true);
        var predicate = this.parent.createElement('tr', { className: 'e-xlfl-predicate', attrs: { role: 'row' } });
        table.appendChild(predicate);
        //Renders first radion button
        this.renderRadioButton(column, predicate, predicates);
        //Renders second dropdown
        optr = this.renderOperatorUI(column, table, '-xlfl-secndoptr', predicates, false);
        this.secondOperator = optr.operator;
        //Renders second text box
        this.renderFlValueUI(column, optr, '-xlfl-secndvalue', predicates, false);
    };
    ExcelFilterBase.prototype.renderRadioButton = function (column, tr, predicates) {
        var td = this.parent.createElement('td', { className: 'e-xlfl-radio', attrs: { 'colSpan': '2' } });
        tr.appendChild(td);
        var radioDiv = this.parent.createElement('div', { className: 'e-xlfl-radiodiv' });
        radioDiv.style.display = 'inline-block';
        var isComplex = !isNullOrUndefined(column) && isComplexField(column);
        var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
        var frstpredicate = this.parent.createElement('input', { id: isComplex ? complexFieldName + 'e-xlfl-frstpredicate' : column + 'e-xlfl-frstpredicate', attrs: { 'type': 'radio' } });
        var secndpredicate = this.parent.createElement('input', { id: isComplex ? complexFieldName + 'e-xlfl-secndpredicate' : column + 'e-xlfl-secndpredicate', attrs: { 'type': 'radio' } });
        //appends into div
        radioDiv.appendChild(frstpredicate);
        radioDiv.appendChild(secndpredicate);
        td.appendChild(radioDiv);
        if (this.options.type === 'string') {
            this.renderMatchCase(column, tr, td, '-xlflmtcase', predicates);
        }
        // Initialize AND RadioButton component.
        var andRadio = new RadioButton({
            label: this.getLocalizedLabel('AND'),
            name: 'default', checked: true,
            enableRtl: this.parent.enableRtl,
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        this.childRefs.unshift(andRadio);
        // Initialize OR RadioButton component.
        var orRadio = new RadioButton({
            label: this.getLocalizedLabel('OR'),
            name: 'default',
            enableRtl: this.parent.enableRtl,
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        this.childRefs.unshift(orRadio);
        var flValue = predicates && predicates.length === 2 ? predicates[1].predicate : 'and';
        if (flValue === 'and') {
            andRadio.checked = true;
            orRadio.checked = false;
        }
        else {
            orRadio.checked = true;
            andRadio.checked = false;
        }
        // Render initialized RadioButton.
        andRadio.appendTo(frstpredicate);
        orRadio.appendTo(secndpredicate);
        andRadio.element.nextElementSibling.classList.add('e-xlfl-radio-and');
        orRadio.element.nextElementSibling.classList.add('e-xlfl-radio-or');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ExcelFilterBase.prototype.removeObjects = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var obj = elements_1[_i];
            if (obj && !obj.isDestroyed) {
                this.removeHandlersFromComponent(obj);
                obj.destroy();
            }
        }
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderFlValueUI = function (column, optr, elementId, predicates, isFirst) {
        var value = this.parent.createElement('td', { className: 'e-xlfl-value' });
        optr.fieldElement.appendChild(value);
        var isComplex = !isNullOrUndefined(column) && isComplexField(column);
        var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
        var valueDiv = this.parent.createElement('div', { className: 'e-xlfl-valuediv' });
        var isFilteredCol = this.options.filteredColumns.some(function (col) { return column === col.field; });
        var fltrPredicates = this.options.filteredColumns.filter(function (col) { return col.field === column; });
        if (this.options.column.filterTemplate) {
            var data = {};
            var columnObj = this.options.column;
            if (isFilteredCol && elementId) {
                data = this.getExcelFilterData(elementId, data, columnObj, predicates, fltrPredicates);
            }
            var isReactCompiler = this.parent.isReact && typeof (this.options.column.filterTemplate) !== 'string' &&
                !(this.options.column.filterTemplate.prototype && this.options.column.filterTemplate.prototype.CSPTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.parent.parentDetails.parentInstObj.isReact;
            var tempID = this.parent.element.id + columnObj.uid + 'filterTemplate';
            if (isReactCompiler || isReactChild) {
                this.options.column.getFilterTemplate()(data, this.parent, 'filterTemplate', tempID, null, null, valueDiv);
            }
            else {
                var element = this.options.column.getFilterTemplate()(data, this.parent, 'filterTemplate', tempID, null, null, null, this.parent.root);
                appendChildren(valueDiv, element);
            }
            if (isReactCompiler || isReactChild) {
                this.parent.renderTemplates(function () {
                    valueDiv.querySelector('input').id = isComplex ? complexFieldName + elementId : column + elementId;
                    value.appendChild(valueDiv);
                });
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this.parent.isAngular ? valueDiv.children[0] : valueDiv.querySelector('input')).id = isComplex ?
                    complexFieldName + elementId : column + elementId;
                value.appendChild(valueDiv);
            }
        }
        else {
            var valueInput = this.parent
                .createElement('input', { id: isComplex ? complexFieldName + elementId : column + elementId });
            valueDiv.appendChild(valueInput);
            value.appendChild(valueDiv);
            var flValue = void 0;
            var predicate = void 0;
            if (predicates && predicates.length > 0) {
                predicate = predicates.length === 2 ?
                    (isFirst ? predicates[0] : predicates[1]) :
                    (isFirst ? predicates[0] : undefined);
                flValue = (predicate && predicate.operator === optr.operator) ? predicate.value : undefined;
                if (isNullOrUndefined(flValue)) {
                    flValue = undefined;
                }
            }
            var types = {
                'string': this.renderAutoComplete.bind(this),
                'number': this.renderNumericTextBox.bind(this),
                'date': this.renderDate.bind(this),
                'dateonly': this.renderDate.bind(this),
                'datetime': this.renderDateTime.bind(this)
            };
            types[this.options.type](this.options, column, valueInput, flValue, this.parent.enableRtl);
        }
    };
    ExcelFilterBase.prototype.getExcelFilterData = function (elementId, data, columnObj, predicates, fltrPredicates) {
        var predIndex = elementId === '-xlfl-frstvalue' ? 0 : 1;
        if (elementId === '-xlfl-frstvalue' || fltrPredicates.length > 1) {
            data = { column: predicates instanceof Array ? predicates[parseInt(predIndex.toString(), 10)] : predicates };
            var indx = this.options.column.columnData && fltrPredicates.length > 1 ?
                (this.options.column.columnData.length === 1 ? 0 : 1) : predIndex;
            data[this.options.field] = columnObj.foreignKeyValue ?
                this.options.column.columnData[parseInt(indx.toString(), 10)][columnObj.foreignKeyValue] :
                fltrPredicates[parseInt(indx.toString(), 10)].value;
            if (this.options.foreignKeyValue) {
                data[this.options.foreignKeyValue] = this.options.column
                    .columnData[parseInt(indx.toString(), 10)][columnObj.foreignKeyValue];
            }
        }
        return data;
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderMatchCase = function (column, tr, matchCase, elementId, predicates) {
        var matchCaseDiv = this.parent.createElement('div', { className: 'e-xlfl-matchcasediv' });
        matchCaseDiv.style.display = 'inline-block';
        var isComplex = !isNullOrUndefined(column) && isComplexField(column);
        var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
        var matchCaseInput = this.parent.createElement('input', { id: isComplex ? complexFieldName + elementId : column + elementId, attrs: { 'type': 'checkbox' } });
        matchCaseDiv.appendChild(matchCaseInput);
        matchCase.appendChild(matchCaseDiv);
        var flValue = predicates && predicates.length > 0 ?
            (predicates && predicates.length === 2 ? predicates[1].matchCase : predicates[0].matchCase) :
            false;
        // Initialize Match Case check box.
        var checkbox = new CheckBox({
            label: this.getLocalizedLabel('MatchCase'),
            enableRtl: this.parent.enableRtl, checked: flValue,
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        this.childRefs.unshift(checkbox);
        // Render initialized CheckBox.
        checkbox.appendTo(matchCaseInput);
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderDate = function (options, column, inputValue, fValue, isRtl) {
        var format = getCustomDateFormat(options.format, options.type) || options.format;
        var datePicker = new DatePicker(extend({
            format: format,
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            placeholder: this.getLocalizedLabel('CustomFilterDatePlaceHolder'),
            width: '100%',
            enableRtl: isRtl,
            value: new Date(fValue),
            locale: this.parent.locale
        }, options.column.filter.params));
        this.childRefs.unshift(datePicker);
        datePicker.appendTo(inputValue);
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderDateTime = function (options, column, inputValue, fValue, isRtl) {
        var format = getCustomDateFormat(options.format, options.type);
        var dateTimePicker = new DateTimePicker(extend({
            format: format,
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            placeholder: this.getLocalizedLabel('CustomFilterDatePlaceHolder'),
            width: '100%',
            enableRtl: isRtl,
            value: new Date(fValue),
            locale: this.parent.locale
        }, options.column.filter.params));
        this.childRefs.unshift(dateTimePicker);
        dateTimePicker.appendTo(inputValue);
    };
    ExcelFilterBase.prototype.completeAction = function (e) {
        e.result = distinctStringValues(e.result);
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderNumericTextBox = function (options, column, inputValue, fValue, isRtl) {
        var numericTextBox = new NumericTextBox(extend({
            format: options.format,
            placeholder: this.getLocalizedLabel('CustomFilterPlaceHolder'),
            enableRtl: isRtl,
            value: fValue,
            locale: this.parent.locale,
            cssClass: this.parent.cssClass ? this.parent.cssClass : null
        }, options.column.filter.params));
        this.childRefs.unshift(numericTextBox);
        numericTextBox.appendTo(inputValue);
    };
    // eslint-disable-next-line max-len
    ExcelFilterBase.prototype.renderAutoComplete = function (options, column, inputValue, fValue, isRtl) {
        var colObj = this.options.column;
        var isForeignColumn = this.isForeignColumn(colObj);
        var dataSource = isForeignColumn ? colObj.dataSource : options.dataSource;
        var fields = { value: isForeignColumn ? colObj.foreignKeyValue : column };
        var actObj = new AutoComplete(extend({
            dataSource: dataSource instanceof DataManager ? dataSource : new DataManager(dataSource),
            fields: fields,
            query: this.getQuery(),
            sortOrder: 'Ascending',
            locale: this.parent.locale,
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            autofill: true,
            placeholder: this.getLocalizedLabel('CustomFilterPlaceHolder'),
            enableRtl: isRtl,
            text: fValue
        }, colObj.filter.params));
        if (dataSource && 'result' in dataSource) {
            var defObj = eventPromise({ requestType: 'stringfilterrequest' }, this.getQuery());
            this.parent.trigger(events.dataStateChange, defObj.state);
            var def = defObj.deffered;
            def.promise.then(function (e) {
                actObj.dataSource = new DataManager(e);
            });
        }
        this.childRefs.unshift(actObj);
        var evt = { 'actionComplete': this.acActionComplete(actObj, column), 'focus': this.acFocus(actObj, column, options, inputValue) };
        registerEventHandlers(inputValue.id, [events.actionComplete, literals.focus], evt, this);
        actObj.addEventListener(literals.focus, this.eventHandlers[inputValue.id][literals.focus]);
        actObj.addEventListener(events.actionComplete, this.eventHandlers[inputValue.id][events.actionComplete]);
        actObj.appendTo(inputValue);
    };
    ExcelFilterBase.prototype.acActionComplete = function (actObj, column) {
        return function (e) {
            var isComplex = !isNullOrUndefined(column) && isComplexField(column);
            e.result = e.result.filter(function (obj, index, arr) {
                return arr.map(function (mapObject) {
                    return isComplex ? performComplexDataOperation(actObj.fields.value, mapObject)
                        : mapObject[actObj.fields.value];
                }).indexOf(isComplex ? performComplexDataOperation(actObj.fields.value, obj) :
                    obj[actObj.fields.value]) === index;
            });
        };
    };
    ExcelFilterBase.prototype.acFocus = function (actObj, column, options, inputValue) {
        var _this = this;
        return function () {
            var isComplex = !isNullOrUndefined(column) && isComplexField(column);
            var complexFieldName = !isNullOrUndefined(column) && getComplexFieldID(column);
            var columnvalue = isComplex ? complexFieldName : column;
            actObj.filterType = _this.dlgDiv.querySelector('#' + columnvalue +
                (inputValue.id === (columnvalue + '-xlfl-frstvalue') ?
                    '-xlfl-frstoptr' :
                    '-xlfl-secndoptr')).ej2_instances[0].value;
            actObj.ignoreCase = options.type === 'string' ?
                !_this.dlgDiv.querySelector('#' + columnvalue + '-xlflmtcase').ej2_instances[0].checked :
                true;
            actObj.filterType = !isNullOrUndefined(actObj.filterType) ? actObj.filterType :
                'equal';
        };
    };
    return ExcelFilterBase;
}(CheckBoxFilterBase));
export { ExcelFilterBase };
