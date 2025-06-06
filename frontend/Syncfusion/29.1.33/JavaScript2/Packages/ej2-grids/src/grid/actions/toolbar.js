import { EventHandler, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { remove, select, removeClass } from '@syncfusion/ej2-base';
import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import * as events from '../base/constant';
import { templateCompiler, appendChildren, parentsUntil, addRemoveEventListener, applyBiggerTheme } from '../base/util';
import { ResponsiveToolbarAction } from '../base/enum';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { calculatePosition } from '@syncfusion/ej2-popups';
import { SearchBox } from '../services/focus-strategy';
import * as literals from '../base/string-literals';
/**
 *
 * The `Toolbar` module is used to handle ToolBar actions.
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent, serviceLocator) {
        this.predefinedItems = {};
        this.isSearched = false;
        this.items = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print', 'Search',
            'ColumnChooser', 'PdfExport', 'ExcelExport', 'CsvExport', 'WordExport'];
        this.isRightToolbarMenu = false;
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    Toolbar.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        var preItems = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print',
            'PdfExport', 'ExcelExport', 'WordExport', 'CsvExport'];
        var isAdaptive = this.parent.enableAdaptiveUI;
        var excludingItems = ['Edit', 'Delete', 'Update', 'Cancel'];
        for (var _i = 0, preItems_1 = preItems; _i < preItems_1.length; _i++) {
            var item = preItems_1[_i];
            var itemStr = item.toLowerCase();
            var localeName = itemStr[0].toUpperCase() + itemStr.slice(1);
            this.predefinedItems["" + item] = {
                id: this.gridID + '_' + itemStr, prefixIcon: 'e-' + itemStr,
                text: this.l10n.getConstant(localeName), tooltipText: this.l10n.getConstant(localeName)
            };
            if (isAdaptive) {
                this.predefinedItems["" + item].text = '';
                this.predefinedItems["" + item].visible = excludingItems.indexOf(item) === -1;
            }
        }
        this.predefinedItems.Search = {
            id: this.gridID + '_search',
            tooltipText: this.l10n.getConstant('Search'), align: 'Right', cssClass: 'e-search-wrapper',
            type: 'Input'
        };
        this.isRightToolbarMenu = false;
        if (this.parent.enableAdaptiveUI && this.isResponsiveToolbarMenuItems(true) && ((this.parent.rowRenderingMode === 'Horizontal') ||
            (this.parent.rowRenderingMode === 'Vertical' && !this.parent.allowFiltering && !this.parent.allowSorting))) {
            this.isRightToolbarMenu = true;
        }
        if (isAdaptive && this.isResponsiveToolbarMenuItems(false)) {
            this.predefinedItems.responsiveToolbarItems = {
                id: this.gridID + '_' + 'responsivetoolbaritems', cssClass: 'e-responsive-toolbar-items e-menu-toolbar', suffixIcon: 'e-' + 'responsivetoolbaritems-btn',
                align: this.isRightToolbarMenu ? 'Left' : 'Right'
            };
        }
        else {
            this.predefinedItems.ColumnChooser = {
                id: this.gridID + '_' + 'columnchooser', cssClass: 'e-cc e-ccdiv e-cc-toolbar', suffixIcon: 'e-' + 'columnchooser-btn',
                text: isAdaptive ? '' : this.l10n.getConstant('Columnchooser'),
                tooltipText: this.l10n.getConstant('Columnchooser'), align: 'Right'
            };
        }
        if (this.parent.rowRenderingMode === 'Vertical') {
            if (this.parent.allowFiltering && this.parent.filterSettings.type !== 'FilterBar') {
                this.predefinedItems.responsiveFilter = {
                    id: this.gridID + '_' + 'responsivefilter', cssClass: 'e-gridresponsiveicons e-icons',
                    suffixIcon: 'e-' + 'resfilter-icon', tooltipText: this.l10n.getConstant('FilterIcon')
                };
            }
            if (this.parent.allowSorting) {
                this.predefinedItems.responsiveSort = {
                    id: this.gridID + '_' + 'responsivesort', cssClass: 'e-gridresponsiveicons e-icons',
                    suffixIcon: 'e-' + 'ressort-icon', tooltipText: this.l10n.getConstant('SortIcon')
                };
            }
        }
        if (this.parent.enableAdaptiveUI && this.parent.toolbar && this.parent.toolbar.some(function (item) {
            return (typeof item === 'object' && item.text === 'Search') || item === 'Search';
        })) {
            this.predefinedItems.responsiveBack = {
                id: this.gridID + '_' + 'responsiveback', cssClass: 'e-gridresponsiveicons e-icons',
                suffixIcon: 'e-' + 'resback-icon', visible: false
            };
        }
        this.createToolbar();
        if (this.parent.enableAdaptiveUI) {
            if (isNullOrUndefined(this.responsiveToolbarMenu)) {
                this.renderResponsiveToolbarpopup();
            }
            if (this.toolbar.element) {
                this.toolbar.refreshOverflow();
            }
        }
    };
    Toolbar.prototype.isResponsiveToolbarMenuItems = function (isRight) {
        var items = isRight ? ['Add', 'Edit', 'Delete', 'Search'] : ['Print', 'ColumnChooser', 'PdfExport', 'ExcelExport', 'CsvExport'];
        var toolbarItems = this.parent.toolbar || [];
        for (var i = 0; i < items.length; i++) {
            if (toolbarItems.indexOf(items[parseInt(i.toString(), 10)]) >= 0) {
                return isRight ? false : true;
            }
        }
        return isRight ? true : false;
    };
    /**
     * Gets the toolbar of the Grid.
     *
     * @returns {Element} returns the element
     * @hidden
     */
    Toolbar.prototype.getToolbar = function () {
        return this.toolbar.element;
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     */
    Toolbar.prototype.destroy = function () {
        if (this.toolbar && !this.toolbar.isDestroyed) {
            if (this.responsiveToolbarMenu) {
                this.responsiveToolbarMenu.destroy();
            }
            this.toolbar.off('render-react-toolbar-template', this.addReactToolbarPortals);
            this.unWireEvent();
            this.removeEventListener();
            this.toolbar.created = null;
            this.toolbar.clicked = null;
            if (!this.toolbar.element) {
                this.parent.destroyTemplate(['toolbarTemplate']);
                if (this.parent.isReact) {
                    this.parent.renderTemplates();
                }
            }
            else {
                this.toolbar.destroy();
            }
            if (this.parent.isAngular) {
                var viewStr = 'viewContainerRef';
                var registerTemp = 'registeredTemplate';
                this.toolbar["" + viewStr] = null;
                this.toolbar["" + registerTemp] = null;
            }
            if (this.element.parentNode) {
                remove(this.element);
                this.toolbar = null;
            }
        }
    };
    Toolbar.prototype.bindSearchEvents = function () {
        this.searchElement = select('#' + this.gridID + '_searchbar', this.element);
        this.wireEvent();
        this.refreshToolbarItems();
        if (this.parent.searchSettings) {
            this.updateSearchBox();
        }
    };
    Toolbar.prototype.toolbarCreated = function (isNormal) {
        if (this.element.querySelector('.e-search-wrapper')) {
            if (!this.parent.enableAdaptiveUI || isNormal) {
                var classList = this.parent.cssClass ? 'e-input-group e-search ' + this.parent.cssClass
                    : 'e-input-group e-search';
                this.element.querySelector('.e-search-wrapper').innerHTML = '<div class="' + classList + '" role="search">\
                    <input id="' + this.gridID + '_searchbar" class="e-input e-search" name="input" type="search" \
                    placeholder= "' + this.l10n.getConstant('Search') + '"/>\
                    <span id="' + this.gridID + '_clearbutton" class="e-input-group-icon e-icons e-sicon" \
                    tabindex="-1" aria-label= "clear" role= "button" ></span>\
                    <span id="' + this.gridID + '_searchbutton" class="e-input-group-icon e-search-icon e-icons" \
                    tabindex="-1" title="' + this.l10n.getConstant('Search') + '" role= "search"></span> \
                    </div>';
            }
            else {
                this.element.querySelector('.e-search-wrapper').innerHTML = '<span id="' + this.gridID
                    + '_clearbutton" class="e-input-group-icon e-icons e-sicon" \
                    tabindex="-1" role= "button" aria-label= "clear" ></span>\
                    <span id="' + this.gridID
                    + '_searchbutton" class="e-input-group-icon e-search-icon e-icons" \
                    tabindex="-1" role= "button" title="' + this.l10n.getConstant('Search') + '"></span> \
                    </div>';
            }
            this.element.querySelector('#' + this.gridID + '_clearbutton').style.cursor = 'default';
        }
        if (this.element.querySelector('.e-responsive-toolbar-items')) {
            this.element.querySelector('.e-responsive-toolbar-items').innerHTML = '<button id="' + this.gridID
                + '_responsivetoolbaritems" class="e-tbar-btn e-control e-btn e-lib e-icon-btn" \
                    type="button" data-ripple="true" tabindex="-1" data-tabindex="-1" aria-label="responsivetoolbaritems" \
                     aria-disabled="false" ><span class="e-btn-icon e-responsivetoolbaritems-btn e-icons"></span>';
            this.element.querySelector('#' + this.gridID + '_responsivetoolbaritems').style.width = 'auto';
        }
        this.bindSearchEvents();
    };
    Toolbar.prototype.createToolbar = function () {
        var items = this.getItems();
        this.toolbar = new tool({
            items: items,
            clicked: this.toolbarClickHandler.bind(this),
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            created: this.toolbarCreated.bind(this),
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        });
        this.toolbar.isReact = this.parent.isReact;
        this.toolbar.on('render-react-toolbar-template', this.addReactToolbarPortals, this);
        var isStringTemplate = 'isStringTemplate';
        this.toolbar["" + isStringTemplate] = true;
        var viewStr = 'viewContainerRef';
        var registerTemp = 'registeredTemplate';
        if (this.parent["" + viewStr]) {
            this.toolbar["" + registerTemp] = {};
            this.toolbar["" + viewStr] = this.parent["" + viewStr];
        }
        this.element = this.parent.createElement('div', { id: this.gridID + '_toolbarItems' });
        if (this.parent.enableAdaptiveUI) {
            this.element.classList.add('e-res-toolbar');
        }
        if (this.parent.toolbarTemplate) {
            var isVue = this.parent.isVue
                || (this.parent.parentDetails && this.parent.parentDetails.parentInstObj && this.parent.parentDetails.parentInstObj.isVue);
            if (typeof (this.parent.toolbarTemplate) === 'string'
                && !(isVue && !document.querySelectorAll(this.parent.toolbarTemplate).length)) {
                this.toolbar.appendTo(this.parent.toolbarTemplate);
                this.element = this.toolbar.element;
            }
            else {
                var isReactCompiler = this.parent.isReact && typeof (this.parent.toolbarTemplate) !== 'string' &&
                    !(this.parent.toolbarTemplate.prototype && this.parent.toolbarTemplate.prototype.CSPTemplate);
                var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                    this.parent.parentDetails.parentInstObj.isReact;
                var ID = this.parent.element.id + 'toolbarTemplate';
                if (isReactCompiler || isReactChild) {
                    templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate', ID, null, null, this.element);
                    this.parent.renderTemplates();
                }
                else {
                    appendChildren(this.element, templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate', null, null, null, null, this.parent.root));
                }
            }
            this.element.classList.add('e-temp-toolbar');
        }
        else {
            this.toolbar.appendTo(this.element);
        }
        this.parent.element.insertBefore(this.element, this.parent.getHeaderContent());
        var tlbrLeftElement = this.element.querySelector('.e-toolbar-left');
        var tlbrCenterElement = this.element.querySelector('.e-toolbar-center');
        var tlbrRightElement = this.element.querySelector('.e-toolbar-right');
        var tlbrItems = this.element.querySelector('.e-toolbar-items');
        var tlbrElement = this.element;
        var tlbrLeftWidth = tlbrLeftElement ? tlbrLeftElement.clientWidth : 0;
        var tlbrCenterWidth = tlbrCenterElement ? tlbrCenterElement.clientWidth : 0;
        var tlbrRightWidth = tlbrRightElement ? tlbrRightElement.clientWidth : 0;
        var tlbrItemsWidth = tlbrItems ? tlbrItems.clientWidth : 0;
        var tlbrWidth = tlbrElement ? tlbrElement.clientWidth : 0;
        if (tlbrLeftWidth > tlbrWidth || tlbrCenterWidth > tlbrWidth || tlbrRightWidth > tlbrWidth || tlbrItemsWidth > tlbrWidth) {
            this.toolbar.refreshOverflow();
        }
    };
    Toolbar.prototype.addReactToolbarPortals = function (args) {
        if (this.parent.isReact && args) {
            this.parent.portals = this.parent.portals.concat(args);
            this.parent.renderTemplates();
        }
    };
    Toolbar.prototype.renderResponsiveSearch = function (isRender) {
        if (isRender) {
            this.toolbarCreated(true);
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isSearch);
            this.searchElement = select('#' + this.gridID + '_searchbar', this.element);
            var right = parentsUntil(this.searchElement, 'e-toolbar-right');
            if (right) {
                right.classList.add('e-responsive-right');
            }
            if (this.parent.searchSettings) {
                this.updateSearchBox();
            }
            this.searchBoxObj.searchFocus({ target: this.searchElement });
            this.searchElement.focus();
        }
        else {
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isInitial);
        }
    };
    Toolbar.prototype.refreshResponsiveToolbarItems = function (action) {
        if (action === ResponsiveToolbarAction.isInitial) {
            var id = this.parent.element.id;
            var items = [id + '_edit', id + '_delete'];
            var selectedRecords = this.parent.getSelectedRowIndexes();
            var excludingItems = [id + '_responsiveback', id + '_update', id + '_cancel'];
            for (var _i = 0, _a = this.toolbar.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var toolbarEle = item.template && item.template.length ?
                    parentsUntil(this.toolbar.element.querySelector('#' + item.id), 'e-template').children[0] : this.toolbar.element.querySelector('#' + item.id);
                if (toolbarEle) {
                    if (items.indexOf(item.id) > -1) {
                        if (selectedRecords.length) {
                            toolbarEle.parentElement.classList.remove('e-hidden');
                        }
                        else {
                            toolbarEle.parentElement.classList.add('e-hidden');
                        }
                    }
                    else {
                        if (excludingItems.indexOf(item.id) === -1 || (excludingItems.indexOf(item.id) > 0 && this.parent.isEdit)) {
                            toolbarEle.parentElement.classList.remove('e-hidden');
                        }
                        else {
                            toolbarEle.parentElement.classList.add('e-hidden');
                        }
                    }
                }
            }
            if (this.searchElement) {
                var right = parentsUntil(this.searchElement, 'e-toolbar-right');
                if (right) {
                    right.classList.remove('e-responsive-right');
                }
                this.toolbarCreated(false);
                this.unWireEvent();
                this.searchElement = undefined;
            }
        }
        if (action === ResponsiveToolbarAction.isSearch) {
            var items = [this.parent.element.id + '_responsiveback', this.parent.element.id + '_search'];
            for (var _b = 0, _c = this.toolbar.items; _b < _c.length; _b++) {
                var item = _c[_b];
                var toolbarEle = this.toolbar.element.querySelector('#' + item.id);
                if (toolbarEle) {
                    if (items.indexOf(item.id) > -1) {
                        toolbarEle.parentElement.classList.remove('e-hidden');
                    }
                    else {
                        toolbarEle.parentElement.classList.add('e-hidden');
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /**
     * Refreshes the toolbar items
     *
     * @param {RefreshToolbarItemsArgs} args - Defines the editSettings model and name.
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.refreshToolbarItems = function (args) {
        var gObj = this.parent;
        var enableItems = [];
        var disableItems = [];
        var edit = gObj.editSettings;
        var hasData = (gObj.currentViewData && gObj.currentViewData.length) ||
            (gObj.editSettings.mode === 'Batch' && !isNullOrUndefined(gObj.editModule) && gObj.editModule.getBatchChanges()[literals.addedRecords].length);
        var addRow = edit.showAddNewRow && !gObj.element.querySelector('.e-editedrow');
        if (edit.allowAdding) {
            enableItems.push(this.gridID + '_add');
        }
        else {
            disableItems.push(this.gridID + '_add');
        }
        if (edit.allowEditing && hasData) {
            enableItems.push(this.gridID + '_edit');
        }
        else {
            disableItems.push(this.gridID + '_edit');
        }
        if (edit.allowDeleting && hasData) {
            enableItems.push(this.gridID + '_delete');
        }
        else {
            disableItems.push(this.gridID + '_delete');
        }
        if (gObj.allowPdfExport && hasData) {
            enableItems.push(this.gridID + '_pdfexport');
        }
        else {
            disableItems.push(this.gridID + '_pdfexport');
        }
        if (gObj.allowExcelExport && hasData) {
            enableItems.push(this.gridID + '_excelexport');
            enableItems.push(this.gridID + '_csvexport');
        }
        else {
            disableItems.push(this.gridID + '_excelexport');
            disableItems.push(this.gridID + '_csvexport');
        }
        if (gObj.showColumnChooser) {
            enableItems.push(this.gridID + '_columnchooser');
        }
        else {
            disableItems.push(this.gridID + '_columnchooser');
        }
        if (gObj.editSettings.mode === 'Batch') {
            if (gObj.element.getElementsByClassName('e-updatedtd').length && (edit.allowAdding || edit.allowEditing)) {
                enableItems.push(this.gridID + '_update');
                enableItems.push(this.gridID + '_cancel');
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        else {
            if ((gObj.isEdit || edit.showAddNewRow) && (edit.allowAdding || edit.allowEditing)) {
                enableItems = addRow ? [this.gridID + '_update', this.gridID + '_cancel', this.gridID + '_edit', this.gridID + '_delete'] :
                    [this.gridID + '_update', this.gridID + '_cancel'];
                disableItems = addRow ? [this.gridID + '_add'] :
                    [this.gridID + '_add', this.gridID + '_edit', this.gridID + '_delete'];
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        this.enableItems(enableItems, true);
        this.enableItems(disableItems, false);
    };
    Toolbar.prototype.getItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar || [];
        if (typeof (this.parent.toolbar) === 'string') {
            return [];
        }
        if (this.parent.rowRenderingMode === 'Vertical') {
            if (this.parent.allowFiltering && this.parent.filterSettings.type !== 'FilterBar') {
                items.push(this.getItemObject('responsiveFilter'));
            }
            if (this.parent.allowSorting) {
                items.push(this.getItemObject('responsiveSort'));
            }
        }
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            if (this.parent.enableAdaptiveUI && ['Print', 'ColumnChooser',
                'PdfExport', 'ExcelExport', 'CsvExport'].indexOf(item) !== -1) {
                continue;
            }
            if (this.parent.enableAdaptiveUI && ((typeof item === 'object' && item.text === 'Search') || item === 'Search')) {
                items.push(this.getItemObject('responsiveBack'));
            }
            switch (typeof item) {
                case 'number':
                    items.push(this.getItemObject(this.items[item]));
                    break;
                case 'string':
                    items.push(this.getItemObject(item));
                    break;
                default:
                    items.push(this.getItem(item));
            }
        }
        if (this.parent.enableAdaptiveUI && this.isResponsiveToolbarMenuItems(false)) {
            items.push(this.getItemObject('responsiveToolbarItems'));
        }
        return items;
    };
    Toolbar.prototype.getItem = function (itemObject) {
        var item = this.predefinedItems[itemObject.text];
        return item ? extend(item, item, itemObject) : itemObject;
    };
    Toolbar.prototype.getItemObject = function (itemName) {
        return this.predefinedItems["" + itemName] || { text: itemName, id: this.gridID + '_' + itemName };
    };
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var element = select('#' + item, this.element);
            if (element) {
                this.toolbar.enableItems(element.closest('.e-toolbar-item'), isEnable);
            }
        }
    };
    Toolbar.prototype.toolbarClickHandler = function (args) {
        var _this = this;
        var gObj = this.parent;
        var gID = this.gridID;
        var originalEvent = args.originalEvent;
        if (this.parent.enableAdaptiveUI && args.item.id === gID + '_responsivetoolbaritems') {
            this.openResponsiveToolbarMenuPopup(originalEvent, args.item.id);
        }
        else {
            extend(args, { cancel: false });
            var newArgs = args;
            gObj.trigger(events.toolbarClick, newArgs, function (toolbarargs) {
                toolbarargs.originalEvent = toolbarargs.originalEvent ? toolbarargs.originalEvent : originalEvent;
                if (!toolbarargs.cancel) {
                    switch (!isNullOrUndefined(toolbarargs.item) && toolbarargs.item.id) {
                        case gID + '_print':
                            gObj.print();
                            break;
                        case gID + '_edit':
                            gObj.startEdit();
                            break;
                        case gID + '_update':
                            gObj.endEdit();
                            break;
                        case gID + '_cancel':
                            gObj.closeEdit();
                            break;
                        case gID + '_add':
                            gObj.addRecord();
                            break;
                        case gID + '_delete':
                            gObj.deleteRecord();
                            break;
                        case gID + '_search':
                            if (toolbarargs.originalEvent.target.id === gID + '_searchbutton' && _this.searchElement) {
                                _this.search();
                            }
                            else if (gObj.enableAdaptiveUI && !_this.searchElement
                                && (toolbarargs.originalEvent.target.classList.contains('e-search-wrapper')
                                    || toolbarargs.originalEvent.target.id === gID + '_searchbutton')) {
                                _this.renderResponsiveSearch(true);
                            }
                            else if (toolbarargs.originalEvent.target.classList.contains('e-clear-icon') && toolbarargs.originalEvent.target.id === gID + '_clearbutton' && _this.searchElement) {
                                _this.searchElement.value = '';
                                if (_this.searchElement) {
                                    _this.sIcon = _this.searchElement.parentElement.querySelector('.e-sicon');
                                    _this.sIcon.classList.remove('e-clear-icon');
                                    _this.sIcon.removeAttribute('title');
                                    _this.sIcon.style.cursor = 'default';
                                }
                                if (_this.isSearched || _this.parent.searchSettings.key.length) {
                                    _this.parent.search(_this.searchElement.value);
                                    _this.isSearched = false;
                                }
                            }
                            break;
                        case gID + '_columnchooser':
                            if (_this.parent.enableAdaptiveUI) {
                                gObj.showResponsiveCustomColumnChooser();
                            }
                            else {
                                /* eslint-disable */
                                var tarElement = _this.parent.element.querySelector('.e-ccdiv');
                                var y = tarElement.getBoundingClientRect().top;
                                var x = tarElement.getBoundingClientRect().left;
                                var targetEle = toolbarargs.originalEvent.target;
                                /* eslint-enable */
                                y = tarElement.getBoundingClientRect().top + tarElement.offsetTop;
                                gObj.createColumnchooser(x, y, targetEle);
                            }
                            break;
                        case gID + '_responsivefilter':
                            gObj.notify(events.renderResponsiveChangeAction, { action: 3 });
                            gObj.showResponsiveCustomFilter();
                            break;
                        case gID + '_responsivesort':
                            gObj.notify(events.renderResponsiveChangeAction, { action: 2 });
                            gObj.showResponsiveCustomSort();
                            break;
                        case gID + '_responsiveback':
                            _this.renderResponsiveSearch(false);
                            break;
                    }
                }
            });
        }
    };
    Toolbar.prototype.openResponsiveToolbarMenuPopup = function (e, id) {
        var pos = { top: 0, left: 0 };
        this.toolbarMenuElement.style.cssText = 'display:block;visibility:hidden';
        var elePos = this.toolbarMenuElement.getBoundingClientRect();
        var gClient = this.parent.element.getBoundingClientRect();
        this.toolbarMenuElement.style.cssText = 'display:none;visibility:visible';
        var target;
        if (isNullOrUndefined(e)) {
            target = this.parent.element.querySelector('#' + id);
        }
        else {
            target = e.target;
        }
        if (this.parent.enableRtl) {
            pos = calculatePosition(target, 'left', 'bottom');
            if (this.isRightToolbarMenu) {
                pos.left -= elePos.width;
            }
        }
        else {
            pos = calculatePosition(target, 'right', 'bottom');
            if (!this.isRightToolbarMenu) {
                pos.left -= elePos.width;
            }
            if ((pos.left + elePos.width + 1) >= gClient.right) {
                pos.left -= 35;
            }
        }
        this.responsiveToolbarMenu['open'](pos.top, pos.left);
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        applyBiggerTheme(this.parent.element, this.responsiveToolbarMenu.element.parentElement);
    };
    Toolbar.prototype.getMenuItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar || [];
        for (var _i = 0, toolbarItems_2 = toolbarItems; _i < toolbarItems_2.length; _i++) {
            var item = toolbarItems_2[_i];
            if (typeof item === 'string' && (item === 'ColumnChooser' || item === 'PdfExport' || item === 'ExcelExport' ||
                item === 'CsvExport' || item === 'Print')) {
                items.push({
                    text: this.getLocaleText(item),
                    id: this.gridID + '_' + item.toLowerCase(),
                    iconCss: 'e-btn-icon e-' + item.toLowerCase() + ' e-icons'
                });
            }
        }
        return items;
    };
    Toolbar.prototype.getLocaleText = function (item) {
        var title;
        if (item === 'ColumnChooser') {
            title = this.l10n.getConstant('Columnchooser');
        }
        else if (item === 'PdfExport') {
            title = this.l10n.getConstant('Pdfexport');
        }
        else if (item === 'ExcelExport') {
            title = this.l10n.getConstant('Excelexport');
        }
        else if (item === 'CsvExport') {
            title = this.l10n.getConstant('Csvexport');
        }
        else if (item === 'Print') {
            title = this.l10n.getConstant('Print');
        }
        return title;
    };
    Toolbar.prototype.renderResponsiveToolbarpopup = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.toolbarMenuElement = this.parent.createElement('ul', {
            id: this.gridID + '__toolbaritemsmenu', className: 'e-responsivetoolbar-menu'
        });
        this.element.setAttribute('aria-label', this.l10n.getConstant('ToolbarMenuDialogARIA'));
        this.parent.element.appendChild(this.toolbarMenuElement);
        this.responsiveToolbarMenu = new Menu({
            cssClass: this.parent.cssClass ? 'e-grid-toolbarmenu e-bigger' + ' ' + this.parent.cssClass : 'e-grid-toolbarmenu e-bigger',
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            locale: this.parent.locale,
            beforeOpen: this.beforeOpenResponsiveToolbarMenuItem.bind(this),
            items: this.getMenuItems(),
            select: this.ResponsiveToolbarMenuItemClick.bind(this)
        });
        this.responsiveToolbarMenu.appendTo(this.toolbarMenuElement);
    };
    Toolbar.prototype.ResponsiveToolbarMenuItemClick = function (args) {
        var _this = this;
        var gObj = this.parent;
        var element = args.element;
        args.item.id = element.id;
        var newArgs = { cancel: false, name: 'clicked', item: args.item, originalEvent: args.event };
        gObj.trigger(events.toolbarClick, newArgs, function (toolbarargs) {
            if (!toolbarargs.cancel) {
                switch (!isNullOrUndefined(toolbarargs.item) && toolbarargs.item.id) {
                    case _this.gridID + '_columnchooser':
                        gObj.notify(events.renderResponsiveChangeAction, { action: 5 });
                        gObj.showResponsiveCustomColumnChooser();
                        break;
                    case _this.gridID + '_print':
                        gObj.print();
                        break;
                }
            }
        });
    };
    Toolbar.prototype.beforeOpenResponsiveToolbarMenuItem = function () {
        var _this = this;
        var toolbarItems = this.parent.toolbar || [];
        var responsiveMenuItems = [
            { key: 'PdfExport', enabled: this.parent.allowPdfExport },
            { key: 'ExcelExport', enabled: this.parent.allowExcelExport },
            { key: 'CsvExport', enabled: this.parent.allowExcelExport },
            { key: 'ColumnChooser', enabled: this.parent.showColumnChooser }
        ];
        var enableItems = [];
        var disableItems = [];
        responsiveMenuItems.forEach(function (item) {
            if (toolbarItems.indexOf(item.key) !== -1) {
                var localeText = _this.getLocaleText(item.key);
                if (item.enabled) {
                    enableItems.push(localeText);
                }
                else {
                    disableItems.push(localeText);
                }
            }
        });
        this.responsiveToolbarMenu.enableItems(enableItems, true);
        this.responsiveToolbarMenu.enableItems(disableItems, false);
    };
    Toolbar.prototype.modelChanged = function (e) {
        if (e.module === 'edit') {
            this.refreshToolbarItems();
        }
    };
    Toolbar.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() || !this.parent.toolbar) {
            return;
        }
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 13) {
            this.parent.searchModule.refreshSearch = false;
            this.search();
        }
        if (this.searchElement) {
            this.sIcon = this.searchElement.parentElement.querySelector('.e-sicon');
            if (this.searchElement.value.length && !isNullOrUndefined(this.sIcon)) {
                this.sIcon.classList.add('e-clear-icon');
                this.sIcon.setAttribute('title', this.l10n.getConstant('Clear'));
                this.sIcon.style.cursor = 'pointer';
            }
            else {
                this.sIcon.classList.remove('e-clear-icon');
                this.sIcon.removeAttribute('title');
                this.sIcon.style.cursor = 'default';
            }
        }
    };
    Toolbar.prototype.search = function () {
        this.isSearched = true;
        this.parent.search(this.searchElement.value);
    };
    Toolbar.prototype.updateSearchBox = function () {
        if (this.searchElement) {
            this.searchElement.value = this.parent.searchSettings.key;
        }
    };
    Toolbar.prototype.wireEvent = function () {
        if (this.searchElement) {
            this.searchBoxObj = new SearchBox(this.searchElement, this.serviceLocator);
            EventHandler.add(this.searchElement, 'keyup', this.keyUpHandler, this);
            this.searchBoxObj.wireEvent();
        }
        EventHandler.add(this.element, 'focusin', this.onFocusIn, this);
        EventHandler.add(this.element, 'focusout', this.onFocusOut, this);
    };
    Toolbar.prototype.unWireEvent = function () {
        if (this.searchElement) {
            EventHandler.remove(this.searchElement, 'keyup', this.keyUpHandler);
            this.searchBoxObj.unWireEvent();
        }
        EventHandler.remove(this.element, 'focusin', this.onFocusIn);
        EventHandler.remove(this.element, 'focusout', this.onFocusOut);
    };
    Toolbar.prototype.onFocusIn = function (e) {
        var currentInfo = this.parent.focusModule.currentInfo;
        if (currentInfo && currentInfo.element) {
            removeClass([currentInfo.element, currentInfo.elementToFocus], ['e-focused', 'e-focus']);
            currentInfo.element.tabIndex = -1;
        }
        e.target.tabIndex = 0;
    };
    Toolbar.prototype.onFocusOut = function (e) {
        e.target.tabIndex = -1;
        if (e.target && e.target.id === this.parent.element.id + '_searchbar' &&
            !(e.relatedTarget && (e.relatedTarget.id === this.parent.element.id + '_clearbutton' ||
                e.relatedTarget.id === this.parent.element.id + '_searchbutton'))) {
            this.parent.searchModule.refreshSearch = false;
            this.search();
        }
    };
    Toolbar.prototype.setFocusToolbarItem = function (element) {
        var elementToFocus = element.querySelector('.e-btn,.e-input,.e-toolbar-item-focus');
        if (!elementToFocus && this.parent.enableAdaptiveUI && !this.searchElement
            && element.classList.contains('e-search-wrapper')) {
            elementToFocus = element.querySelector('#' + this.gridID + '_searchbutton');
        }
        elementToFocus.focus();
    };
    Toolbar.prototype.getFocusableToolbarItems = function () {
        var getFocusToolbarElements = [].slice.call(this.element.querySelectorAll('.e-toolbar-item:not(.e-overlay):not(.e-hidden)'));
        var getFocusToolbarItems = [];
        for (var i = 0; i < getFocusToolbarElements.length; i++) {
            if (!isNullOrUndefined(getFocusToolbarElements[parseInt(i.toString(), 10)].querySelector('.e-btn,.e-input,.e-toolbar-item-focus'))) {
                getFocusToolbarItems.push(getFocusToolbarElements[parseInt(i.toString(), 10)]);
            }
        }
        return getFocusToolbarItems;
    };
    Toolbar.prototype.keyPressedHandler = function (e) {
        if (e.target && parentsUntil(e.target, 'e-toolbar-item')) {
            var targetParent = parentsUntil(e.target, 'e-toolbar-item');
            var focusableToolbarItems = this.getFocusableToolbarItems();
            if (e.action === 'tab' || e.action === 'shiftTab') {
                if ((e.action === 'tab' && targetParent === focusableToolbarItems[focusableToolbarItems.length - 1])
                    || (e.action === 'shiftTab' && targetParent === focusableToolbarItems[0])) {
                    return;
                }
                for (var i = 0; i < focusableToolbarItems.length; i++) {
                    if (targetParent === focusableToolbarItems[parseInt(i.toString(), 10)]) {
                        e.preventDefault();
                        var index = e.action === 'tab' ? i + 1 : i - 1;
                        this.setFocusToolbarItem(focusableToolbarItems[parseInt(index.toString(), 10)]);
                        return;
                    }
                }
            }
            if (e.action === 'enter') {
                if (this.parent.enableAdaptiveUI && !this.searchElement
                    && e.target.id === this.gridID + '_searchbutton') {
                    this.renderResponsiveSearch(true);
                }
            }
        }
    };
    Toolbar.prototype.reRenderToolbar = function () {
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.evtHandlers = [{ event: events.setFullScreenDialog, handler: this.reRenderToolbar },
            { event: events.initialEnd, handler: this.render },
            { event: events.uiUpdate, handler: this.onPropertyChanged },
            { event: events.inBoundModelChanged, handler: this.updateSearchBox.bind(this) },
            { event: events.modelChanged, handler: this.refreshToolbarItems },
            { event: events.toolbarRefresh, handler: this.refreshToolbarItems },
            { event: events.inBoundModelChanged, handler: this.modelChanged },
            { event: events.dataBound, handler: this.refreshToolbarItems },
            { event: events.click, handler: this.removeResponsiveSearch },
            { event: events.rowModeChange, handler: this.reRenderToolbar },
            { event: events.destroy, handler: this.destroy },
            { event: events.keyPressed, handler: this.keyPressedHandler }];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
        this.rowSelectedFunction = this.rowSelected.bind(this);
        this.rowDeSelectedFunction = this.rowSelected.bind(this);
        this.parent.addEventListener(events.rowSelected, this.rowSelectedFunction);
        this.parent.addEventListener(events.rowDeselected, this.rowDeSelectedFunction);
    };
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.evtHandlers, false);
        this.parent.removeEventListener(events.rowSelected, this.rowSelectedFunction);
        this.parent.removeEventListener(events.rowDeselected, this.rowDeSelectedFunction);
    };
    Toolbar.prototype.removeResponsiveSearch = function (e) {
        var target = e.target;
        var isSearch = target.classList.contains('e-search-icon') || target.classList.contains('e-search-wrapper');
        if (this.parent.enableAdaptiveUI && !isSearch && this.searchElement
            && !parentsUntil(e.target, 'e-res-toolbar')) {
            this.renderResponsiveSearch(false);
        }
    };
    Toolbar.prototype.rowSelected = function () {
        if (this.parent.enableAdaptiveUI && this.toolbar.element) {
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isInitial);
            this.toolbar.refreshOverflow();
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    return Toolbar;
}());
export { Toolbar };
