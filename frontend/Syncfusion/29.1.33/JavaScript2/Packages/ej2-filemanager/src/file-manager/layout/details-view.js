import { Grid, Resize, ContextMenu, Sort, VirtualScroll } from '@syncfusion/ej2-grids';
import { select, KeyboardEvents, EventHandler, getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, Touch, setValue, addClass, removeClass } from '@syncfusion/ej2-base';
import { Internationalization, closest, Draggable, initializeCSPTemplate, extend, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import * as events from '../base/constant';
import * as CLS from '../base/classes';
import { createDialog, createImageDialog } from '../pop-up/dialog';
import { removeBlur, openAction, getImageUrl, fileType, getSortedData, getLocaleText, updateLayout } from '../common/utility';
import { createEmptyElement } from '../common/utility';
import { read, Download, GetDetails, Delete } from '../common/operations';
import { cutFiles, addBlur, openSearchFolder, copyFiles, removeActive, pasteHandler, getPathObject, getName } from '../common/index';
import { hasReadAccess, hasEditAccess, hasDownloadAccess, doRename, getAccessClass, createDeniedDialog, rename } from '../common/index';
import { createVirtualDragElement, dragStopHandler, dragStartHandler, draggingHandler, getModule, getFullPath } from '../common/index';
import { getDirectoryPath, updateRenamingData, getItemName, doDeleteFiles, doDownloadFiles } from '../common/index';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * DetailsView module
 */
var DetailsView = /** @class */ (function () {
    /**
     * Constructor for the GridView module
     *
     * @param {FileManager} parent - specifies the parent.
     * @hidden
     */
    function DetailsView(parent) {
        this.isInteracted = true;
        this.interaction = true;
        this.isPasteOperation = false;
        this.isColumnRefresh = false;
        this.dragObj = null;
        this.startIndex = null;
        this.firstItemIndex = null;
        this.isSelectionUpdate = false;
        this.currentSelectedItem = [];
        this.count = 0;
        this.isRendered = true;
        this.isLoaded = false;
        this.isNameWidth = false;
        this.isMultiSelect = false;
        this.pasteOperation = false;
        this.uploadOperation = false;
        Grid.Inject(Resize, ContextMenu, Sort, VirtualScroll);
        this.parent = parent;
        this.element = select('#' + this.parent.element.id + CLS.GRID_ID, this.parent.element);
        this.addEventListener();
        this.keyConfigs = {
            altEnter: 'alt+enter',
            esc: 'escape',
            tab: 'tab',
            moveDown: 'downarrow',
            ctrlEnd: 'ctrl+end',
            ctrlHome: 'ctrl+home',
            ctrlDown: 'ctrl+downarrow',
            ctrlLeft: 'ctrl+leftarrow',
            ctrlRight: 'ctrl+rightarrow',
            shiftEnd: 'shift+end',
            shiftHome: 'shift+home',
            shiftDown: 'shift+downarrow',
            shiftUp: 'shift+uparrow',
            ctrlUp: 'ctrl+uparrow',
            csEnd: 'ctrl+shift+end',
            csHome: 'ctrl+shift+home',
            csDown: 'ctrl+shift+downarrow',
            csUp: 'ctrl+shift+uparrow',
            space: 'space',
            ctrlSpace: 'ctrl+space',
            shiftSpace: 'shift+space',
            csSpace: 'ctrl+shift+space',
            end: 'end',
            home: 'home',
            moveUp: 'uparrow',
            del: 'delete',
            ctrlX: this.parent.isMac ? 'cmd+x' : 'ctrl+x',
            ctrlC: this.parent.isMac ? 'cmd+c' : 'ctrl+c',
            ctrlV: this.parent.isMac ? 'cmd+v' : 'ctrl+v',
            ctrlShiftN: 'ctrl+shift+n',
            shiftdel: 'shift+delete',
            ctrlD: 'ctrl+d',
            f2: 'f2',
            ctrlA: 'ctrl+a',
            enter: 'enter',
            back: 'backspace'
        };
    }
    /* istanbul ignore next */
    DetailsView.prototype.render = function (args) {
        var _this = this;
        if (this.parent.enablePersistence) {
            var gridPersistenceValue = window.localStorage.getItem('grid' + this.parent.element.id + '_grid');
            if (!isNOU(gridPersistenceValue)) {
                var model = JSON.parse(gridPersistenceValue);
                if (!isNOU(model) && Object.keys(model).length > 0 && 'sortSettings' in model) {
                    delete model.sortSettings;
                    window.localStorage.setItem('grid' + this.parent.element.id + '_grid', JSON.stringify(model));
                }
            }
        }
        showSpinner(this.parent.element);
        if (this.parent.view === 'Details') {
            removeClass([this.parent.element], CLS.MULTI_SELECT);
            var items = getSortedData(this.parent, args.files);
            this.checkNameWidth();
            var columns = this.getColumns();
            var sortSettings = void 0;
            var isValidSortField = !isNullOrUndefined(columns) &&
                columns.findIndex(function (col) { return col.field === _this.parent.sortBy; }) !== -1;
            if (this.parent.isMobile || !isValidSortField) {
                sortSettings = [];
            }
            else {
                if (this.parent.sortOrder !== 'None') {
                    sortSettings = [{ direction: this.parent.sortOrder, field: this.parent.sortBy }];
                }
            }
            this.gridObj = new Grid({
                dataSource: items,
                allowSorting: true,
                rowSelecting: this.onSelection.bind(this, 'select'),
                rowDeselecting: this.onSelection.bind(this, 'unselect'),
                rowSelected: this.onSelected.bind(this),
                rowDeselected: this.onDeSelection.bind(this),
                allowResizing: this.parent.detailsViewSettings.columnResizing,
                selectionSettings: {
                    type: this.parent.allowMultiSelection ? 'Multiple' : 'Single',
                    checkboxMode: 'ResetOnRowClick'
                },
                enableRtl: this.parent.enableRtl,
                pageSettings: { pageSize: 20 },
                enableVirtualization: this.parent.enableVirtualization,
                enablePersistence: this.parent.enablePersistence,
                enableVirtualMaskRow: true,
                sortSettings: { allowUnsort: false, columns: sortSettings },
                columns: columns,
                recordDoubleClick: this.DblClickEvents.bind(this),
                beforeDataBound: this.onBeforeDataBound.bind(this),
                dataBound: this.onDataBound.bind(this),
                rowDataBound: this.onRowDataBound.bind(this),
                actionBegin: this.onActionBegin.bind(this),
                headerCellInfo: this.onHeaderCellInfo.bind(this),
                width: '100%',
                height: (this.parent.enableVirtualization) ? this.getGridHeight() : 'auto',
                beforeCopy: function (args) { args.cancel = true; },
                load: function () {
                    this.focusModule.destroy();
                },
                locale: this.parent.locale
            });
            if (this.parent.isReact) {
                this.gridObj.isReact = true;
                this.gridObj.portals = [];
                this.gridObj.on('reactTemplateRender', this.reactTemplateRender, this);
            }
            this.gridObj.isStringTemplate = true;
            this.gridObj.appendTo('#' + this.parent.element.id + CLS.GRID_ID);
            if (this.parent.selectedItems.length !== 0 && this.parent.enableVirtualization && this.parent.enablePersistence) {
                this.isLoaded = true;
            }
            this.wireEvents();
            this.adjustHeight();
            this.emptyArgs = args;
        }
    };
    DetailsView.prototype.reactTemplateRender = function (args) {
        this.parent['portals'] = args;
        if (this.parent.portals && this.parent.toolbarModule && this.parent.toolbarModule.toolbarObj &&
            this.parent.toolbarModule.toolbarObj.portals) {
            this.parent['portals'] = this.parent['portals'].concat(this.parent.toolbarModule.toolbarObj.portals);
        }
        this.parent.notify('renderReactTemplate', this.parent['portals']);
        this.parent['renderReactTemplates']();
    };
    /**
     * Gets the grid height.
     *
     * @returns {number} - The grid height.
     * @private
     */
    DetailsView.prototype.getGridHeight = function () {
        // Get the content pane and breadcrumb bar elements
        var pane = select('#' + this.parent.element.id + CLS.CONTENT_ID, this.parent.element);
        var bar = select('#' + this.parent.element.id + CLS.BREADCRUMBBAR_ID, this.parent.element);
        // The maximum height of the header is 36
        var headerMaxHeight = 36;
        // Calculate and return the grid height
        return (pane.offsetHeight - bar.offsetHeight - headerMaxHeight);
    };
    DetailsView.prototype.checkNameWidth = function () {
        var initialColumn = this.parent.detailsViewSettings.columns;
        this.isNameWidth = false;
        for (var i = 0; i < initialColumn.length; i++) {
            if (initialColumn[i].field === 'name') {
                this.isNameWidth = !isNOU(initialColumn[i].width);
                return;
            }
        }
    };
    DetailsView.prototype.adjustWidth = function (columns, fieldName) {
        if (this.isNameWidth && (fieldName === 'name')) {
            return;
        }
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].field === fieldName) {
                var nameWidth = void 0;
                if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
                    nameWidth = (this.element.clientWidth <= 500) ? '120px' : 'auto';
                }
                else {
                    nameWidth = (this.element.clientWidth <= 680) ? ((fieldName === 'name') ? '120px' : '180px') : 'auto';
                }
                columns[i].width = nameWidth;
            }
        }
    };
    DetailsView.prototype.getColumns = function () {
        var columns;
        var enableHtmlSanitizer = this.parent.enableHtmlSanitizer;
        if (this.parent.isMobile) {
            columns = [
                {
                    field: 'name', headerText: getLocaleText(this.parent, 'Name'), width: 'auto', minWidth: 120, headerTextAlign: 'Left',
                    template: initializeCSPTemplate(function (data) {
                        var name = enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(data.name) : data.name;
                        return "<div class=\"e-fe-text\">" + name + "</div><div class=\"e-fe-date\">" + data._fm_modified + "</div><span class=\"e-fe-size\">" + data.size + "</span>";
                    })
                }
            ];
        }
        else {
            columns = extend([], this.parent.detailsViewSettings.columns, null, true);
            this.adjustWidth(columns, 'name');
            var _loop_1 = function (i, len) {
                columns[i].headerText = getLocaleText(this_1.parent, columns[i].headerText);
                if (columns[i].field === 'name' && !isNOU(columns[i].template) && !(typeof columns[i].template === 'function')) {
                    var template_1 = columns[i].template;
                    columns[i].template = initializeCSPTemplate(function (data) {
                        var name = enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(data.name) : data.name;
                        return template_1.replace(/\${name}/g, name);
                    });
                }
            };
            var this_1 = this;
            for (var i = 0, len = columns.length; i < len; i++) {
                _loop_1(i, len);
            }
        }
        var iWidth = ((this.parent.isMobile || this.parent.isBigger) ? '54' : '46');
        var icon = {
            field: 'type', width: iWidth, minWidth: iWidth,
            template: initializeCSPTemplate(function (data) {
                return "<span class=\"e-fe-icon " + data._fm_iconClass + "\"></span>";
            }), allowResizing: false, allowSorting: true, customAttributes: { class: 'e-fe-grid-icon' },
            headerTemplate: initializeCSPTemplate(function () {
                return '<span class=\'e-fe-icon e-fe-folder\'></span>';
            })
        };
        columns.unshift(icon);
        if (this.parent.showItemCheckBoxes) {
            var cWidth = (this.parent.isBigger ? '36' : '26');
            var cBox = {
                type: 'checkbox', width: cWidth, minWidth: cWidth, customAttributes: { class: 'e-fe-checkbox' },
                allowResizing: false, allowSorting: false
            };
            if (this.parent.isMobile) {
                columns.push(cBox);
            }
            else {
                columns.unshift(cBox);
            }
        }
        for (var i = 0, len = columns.length; i < len; i++) {
            columns[i].disableHtmlEncode = !this.parent.enableHtmlSanitizer;
        }
        if (this.parent.enableRangeSelection) {
            var HiddenName = { field: 'name', visible: false, customAttributes: { class: 'e-drag-text' } };
            columns.push(HiddenName);
        }
        return columns;
    };
    DetailsView.prototype.adjustHeight = function () {
        if (!this.gridObj) {
            return;
        }
        var pane = select('#' + this.parent.element.id + CLS.CONTENT_ID, this.parent.element);
        var bar = select('#' + this.parent.element.id + CLS.BREADCRUMBBAR_ID, this.parent.element);
        var gridHeader = select('.' + CLS.GRID_HEADER, this.parent.element);
        var height = (pane.offsetHeight - bar.offsetHeight - gridHeader.offsetHeight);
        this.gridObj.height = height;
        this.gridObj.dataBind();
    };
    DetailsView.prototype.renderCheckBox = function () {
        this.gridObj.columns = this.getColumns();
        this.isColumnRefresh = true;
        this.gridObj.refreshColumns();
    };
    DetailsView.prototype.onRowDataBound = function (args) {
        var td = select('.e-fe-grid-name', args.row);
        if (!td) {
            var columns = this.parent.detailsViewSettings.columns;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].field === 'name') {
                    td = args.row.children[this.parent.allowMultiSelection ? (i + 2) : (i + 1)];
                    break;
                }
            }
        }
        if (td) {
            td.setAttribute('title', getValue('name', args.data));
        }
        if (this.parent.isLayoutChange && this.parent.isCut && this.parent.fileAction === 'move' &&
            this.parent.selectedNodes && this.parent.selectedNodes.length !== 0) {
            if (this.parent.selectedNodes.indexOf(getValue('name', args.data)) !== -1) {
                addBlur(args.row);
            }
        }
        if (!this.parent.showFileExtension && getValue('isFile', args.data)) {
            var text = getValue('name', args.data);
            var textEle = args.row.querySelector('[title= "' + text + '"]');
            if (textEle) {
                var name_1 = getValue('name', args.data);
                var type = getValue('type', args.data);
                if (name_1.indexOf(type) !== -1) {
                    textEle.innerHTML = name_1.substr(0, name_1.length - type.length);
                }
            }
        }
        if (getValue('size', args.data) !== undefined && args.row.querySelector('.e-fe-size')) {
            var sizeEle = args.row.querySelector('.e-fe-size');
            var modifiedSize = void 0;
            if (!getValue('isFile', args.data)) {
                modifiedSize = '';
            }
            else {
                var sizeValue = getValue('size', args.data);
                var intl = new Internationalization(this.parent.locale);
                var sizeFormat = void 0;
                var columns = this.parent.detailsViewSettings.columns;
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].field === 'size') {
                        sizeFormat = !isNullOrUndefined(columns[i].format) ? columns[i].format.toString() : 'n';
                        break;
                    }
                }
                var value = intl.formatNumber((sizeValue / 1024), { format: sizeFormat });
                modifiedSize = value + ' ' + getLocaleText(this.parent, 'KB');
            }
            sizeEle.innerHTML = modifiedSize;
        }
        if (this.parent.isMobile) {
            if (getValue('_fm_modified', args.data) !== undefined && args.row.querySelector('.e-fe-date')) {
                var dateEle = args.row.querySelector('.e-fe-date');
                var intl = new Internationalization(this.parent.locale);
                var columns = this.parent.detailsViewSettings.columns;
                var format = void 0;
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].field === 'dateModified') {
                        format = columns[i].format;
                        break;
                    }
                }
                var formattedString = intl.formatDate(new Date(getValue('_fm_modified', args.data)), format);
                dateEle.innerHTML = formattedString;
            }
        }
        var checkWrap = args.row.querySelector('.' + CLS.CB_WRAP);
        if (checkWrap) {
            checkWrap.classList.add('e-small');
        }
        if (!hasEditAccess(args.data)) {
            args.row.className += ' ' + getAccessClass(args.data);
        }
        var eventArgs = {
            element: args.row,
            fileDetails: args.data,
            module: 'DetailsView'
        };
        this.parent.trigger('fileLoad', eventArgs);
    };
    DetailsView.prototype.onActionBegin = function (args) {
        if (args.requestType === 'sorting') {
            this.parent.setProperties({ sortOrder: args.direction }, true);
            this.parent.setProperties({ sortBy: args.columnName }, true);
            if (this.parent.selectedItems.length !== 0) {
                this.sortItem = true;
                var rows = this.gridObj.getSelectedRowIndexes();
                var len = rows.length;
                this.sortSelectedNodes = [];
                while (len > 0) {
                    var data = this.gridObj.getRowsObject()[rows[len - 1]].data;
                    this.sortSelectedNodes.push(getValue(this.parent.hasId ? 'id' : 'name', data));
                    len--;
                }
            }
            this.parent.notify(events.sortByChange, {});
        }
    };
    DetailsView.prototype.onHeaderCellInfo = function (args) {
        var checkWrap = args.node.querySelector('.' + CLS.CB_WRAP);
        if (checkWrap) {
            checkWrap.classList.add('e-small');
        }
    };
    DetailsView.prototype.onBeforeDataBound = function (args) {
        var _this = this;
        showSpinner(this.parent.element);
        var nameColumn = this.parent.detailsViewSettings.columns.find(function (column) { return column.field === _this.parent.sortBy; });
        if (nameColumn && !('sortComparer' in nameColumn)) {
            var items = getSortedData(this.parent, (this.parent.enableVirtualization)
                ? args.result
                : this.gridObj.dataSource);
            args.result = items;
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onDataBound = function () {
        this.createDragObj();
        if ((this.parent.selectedItems.length !== 0 && !this.parent.enableVirtualization) || this.isLoaded) {
            this.selectRecords(this.parent.selectedItems);
        }
        if (this.isPasteOperation === true && (!isNullOrUndefined(this.gridObj.getDataRows()) && this.gridObj.getDataRows().length > 0)) {
            if (!this.isColumnRefresh) {
                this.selectRecords(this.parent.pasteNodes);
                this.isPasteOperation = false;
            }
            else {
                this.isColumnRefresh = false;
            }
        }
        if (this.parent.createdItem) {
            this.selectRecords([getValue(this.parent.hasId ? 'id' : 'name', this.parent.createdItem)]);
            this.parent.createdItem = null;
        }
        if (this.parent.layoutSelectedItems.length) {
            this.selectRecords(this.parent.layoutSelectedItems);
        }
        if (this.parent.renamedItem) {
            this.addSelection(this.parent.renamedItem);
            this.parent.renamedItem = null;
        }
        if (this.sortItem === true) {
            this.selectRecords(this.sortSelectedNodes);
            this.sortItem = false;
        }
        if (this.isSelectionUpdate) {
            if (!this.isColumnRefresh) {
                this.selectRecords(this.currentSelectedItem);
                this.isSelectionUpdate = false;
            }
            else {
                this.isColumnRefresh = false;
            }
        }
        if (this.uploadOperation === true) {
            this.count++;
            this.selectRecords(this.parent.uploadItem);
            if (this.count === this.parent.uploadItem.length) {
                this.uploadOperation = false;
                this.parent.uploadItem = [];
            }
        }
        if (this.gridObj.currentViewData.length * this.gridObj.getRowHeight() < this.gridObj.height) {
            var hdTable = this.gridObj.getHeaderContent();
            hdTable.style.paddingRight = '';
            hdTable.style.paddingLeft = '';
            var hdContent = select('.e-headercontent', hdTable);
            hdContent.style.borderRightWidth = '0';
            var cnTable = this.gridObj.getContent().querySelector('.e-content');
            cnTable.style.overflowY = '';
            cnTable.classList.add('e-scrollShow');
        }
        else {
            var hdTable = this.gridObj.getHeaderContent();
            if (!this.parent.enableRtl) {
                hdTable.style.paddingRight = '16px';
            }
            else {
                hdTable.style.paddingLeft = '16px';
            }
            var cnTable = this.gridObj.getContent().querySelector('.e-content');
            cnTable.classList.remove('e-scrollShow');
        }
        this.isRendered = true;
        this.parent.isLayoutChange = false;
        hideSpinner(this.parent.element);
        this.checkEmptyDiv(this.emptyArgs);
        this.isInteracted = this.isLoaded ? true : this.isInteracted;
        this.isLoaded = false;
    };
    DetailsView.prototype.selectRecords = function (nodes) {
        var gridRecords = this.gridObj.getCurrentViewRecords();
        var sRecords = [];
        for (var i = 0, len = gridRecords.length; i < len; i++) {
            var node = this.parent.hasId ? getValue('id', gridRecords[i]) : getName(this.parent, gridRecords[i]);
            if (nodes.indexOf(node) !== -1) {
                sRecords.push(i);
            }
            else if (!this.parent.showFileExtension && !this.parent.hasId && node.includes('.')) {
                var Str2 = node.split('.').slice(0, -1).join('.');
                if (nodes.indexOf(Str2) !== -1) {
                    sRecords.push(i);
                }
            }
        }
        if (sRecords.length !== 0) {
            this.gridObj.selectRows(sRecords);
            this.addFocus(this.gridObj.selectedRowIndex);
        }
    };
    DetailsView.prototype.addSelection = function (data) {
        var items = this.gridObj.getCurrentViewRecords();
        var rData = [];
        if (this.parent.hasId) {
            rData = new DataManager(items).
                executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
        }
        else {
            var nData = new DataManager(items).
                executeLocal(new Query().where('name', 'equal', getValue('name', data), false));
            if (nData.length > 0) {
                rData = new DataManager(nData).
                    executeLocal(new Query().where('filterPath', 'equal', this.parent.filterPath, false));
            }
        }
        if (rData.length > 0) {
            var index = items.indexOf(rData[0]);
            this.gridObj.selectRows([index]);
        }
    };
    DetailsView.prototype.onSortColumn = function () {
        if (this.parent.sortOrder !== 'None') {
            this.gridObj.sortModule.sortColumn(this.parent.sortBy, this.parent.sortOrder);
        }
        else {
            this.gridObj.dataSource = getSortedData(this.parent, this.gridObj.dataSource);
        }
        if (this.element.querySelector('.e-content').scrollTop !== 0) {
            this.gridObj.freezeRefresh();
        }
    };
    DetailsView.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowDragAndDrop':
                    this.createDragObj();
                    break;
                case 'height':
                    this.adjustHeight();
                    break;
                case 'detailsViewSettings':
                    if (!isNullOrUndefined(this.gridObj)) {
                        this.checkNameWidth();
                        var columns = this.getColumns();
                        this.gridObj.columns = columns;
                        this.gridObj.allowResizing = this.parent.detailsViewSettings.columnResizing;
                        this.gridObj.dataBind();
                        this.gridObj.refreshColumns();
                    }
                    break;
                case 'selectedItems':
                    this.interaction = false;
                    if (this.parent.selectedItems.length !== 0) {
                        if (!this.parent.allowMultiSelection) {
                            var slItems = this.parent.selectedItems.slice(this.parent.selectedItems.length - 1);
                            this.parent.setProperties({ selectedItems: slItems }, true);
                        }
                        this.selectRecords(this.parent.selectedItems);
                        this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
                    }
                    else if (!isNOU(this.gridObj)) {
                        this.gridObj.clearSelection();
                        this.interaction = true;
                    }
                    break;
                case 'showFileExtension':
                    read(this.parent, events.pathChanged, this.parent.path);
                    break;
                case 'showHiddenItems':
                    read(this.parent, events.pathChanged, this.parent.path);
                    break;
                case 'showItemCheckBoxes':
                case 'allowMultiSelection':
                    if (!isNullOrUndefined(this.gridObj)) {
                        this.currentSelectedItem = this.parent.selectedItems;
                        this.gridObj.selectionSettings.type = e.newProp.allowMultiSelection ? 'Multiple' : 'Single';
                        this.isSelectionUpdate = true;
                        this.renderCheckBox();
                    }
                    break;
                case 'view':
                    updateLayout(this.parent, 'Details');
                    break;
                case 'width':
                    this.onDetailsResize();
            }
        }
    };
    DetailsView.prototype.onPathChanged = function (args) {
        this.parent.isCut = false;
        var pathField = this.parent.detailsViewSettings.columns.find(function (column) { return column.field === 'filterPath'; });
        if ((this.parent.breadcrumbbarModule.searchObj.element.value.trim() === '' && this.gridObj) ||
            (!isNullOrUndefined(pathField) && !isNullOrUndefined(pathField.hideAtMedia) && pathField.hideAtMedia !== '')) {
            this.parent.searchedItems = [];
            if (!this.parent.isFiltered) {
                this.removePathColumn(false);
            }
            else {
                this.updatePathColumn();
            }
        }
        removeBlur(this.parent);
        if (this.parent.view === 'Details') {
            /* istanbul ignore next */
            this.isInteracted = false;
            showSpinner(this.parent.element);
            this.parent.setProperties({ selectedItems: [] }, true);
            this.gridObj.dataSource = getSortedData(this.parent, args.files);
            this.gridObj.freezeRefresh();
            if (this.parent.isReact) {
                this.gridObj.on('reactTemplateRender', this.reactTemplateRender, this);
            }
            this.wireClickEvent(true);
        }
        this.emptyArgs = args;
    };
    DetailsView.prototype.updatePathColumn = function () {
        var len = this.gridObj.columns.length;
        var columnData = JSON.parse(JSON.stringify(this.gridObj.columns));
        if (columnData[len - 1].field && columnData[len - 1].field !== 'filterPath' && !this.parent.isMobile) {
            var pathColumn = {
                field: 'filterPath', headerText: getLocaleText(this.parent, 'Path'), minWidth: 180, width: 'auto'
            };
            this.gridObj.columns.push(pathColumn);
            this.adjustWidth(this.gridObj.columns, 'filterPath');
            this.adjustWidth(this.gridObj.columns, 'name');
            this.isColumnRefresh = true;
            this.gridObj.refreshColumns();
        }
    };
    DetailsView.prototype.checkEmptyDiv = function (args) {
        var items = getSortedData(this.parent, args.files);
        if (items.length === 0 && !isNOU(this.element.querySelector('.' + CLS.GRID_VIEW))) {
            createEmptyElement(this.parent, this.element, args);
        }
        else if (items.length !== 0 && this.element.querySelector('.' + CLS.EMPTY)) {
            if (this.element.querySelector('.' + CLS.GRID_VIEW).querySelector('.' + CLS.EMPTY)) {
                var emptyDiv = this.element.querySelector('.' + CLS.GRID_VIEW).querySelector('.' + CLS.EMPTY);
                this.element.querySelector('.' + CLS.GRID_VIEW).removeChild(emptyDiv);
            }
            else {
                this.element.removeChild(this.element.querySelector('.' + CLS.EMPTY));
            }
        }
    };
    DetailsView.prototype.onOpenInit = function () {
        if (this.parent.activeModule === 'detailsview') {
            var data = this.gridObj.getSelectedRecords()[0];
            this.openContent(data);
        }
    };
    DetailsView.prototype.DblClickEvents = function (args) {
        this.gridObj.selectRows([args.rowIndex]);
        var data;
        if (args.rowData) {
            data = JSON.parse(JSON.stringify(args.rowData));
            this.openContent(data);
        }
    };
    DetailsView.prototype.openContent = function (data) {
        var _this = this;
        if (!hasReadAccess(data)) {
            createDeniedDialog(this.parent, data, events.permissionRead);
            return;
        }
        var eventArgs = { cancel: false, fileDetails: data, module: 'DetailsView' };
        this.parent.trigger('fileOpen', eventArgs, function (fileOpenArgs) {
            if (!fileOpenArgs.cancel) {
                var name_2 = getValue('name', data);
                if (getValue('isFile', data)) {
                    var icon = fileType(data);
                    if (icon === CLS.ICON_IMAGE) {
                        var imgUrl = getImageUrl(_this.parent, data);
                        createImageDialog(_this.parent, name_2, imgUrl);
                    }
                }
                else {
                    var val = _this.parent.breadcrumbbarModule.searchObj.element.value;
                    if (val === '' && !_this.parent.isFiltered) {
                        var id = getValue('id', data);
                        _this.parent.oldPath = _this.parent.path;
                        var newPath = _this.parent.path + (isNOU(id) ? name_2 : id) + '/';
                        _this.parent.setProperties({ path: newPath }, true);
                        _this.parent.pathNames.push(name_2);
                        _this.parent.pathId.push(getValue('_fm_id', data));
                        _this.parent.itemData = [data];
                        openAction(_this.parent);
                    }
                    else {
                        openSearchFolder(_this.parent, data);
                    }
                    _this.parent.isFiltered = false;
                }
                _this.element.focus();
                if (_this.parent.enableVirtualization) {
                    _this.parent.element.querySelector('#' + _this.parent.element.id + CLS.IMG_DIALOG_ID).focus();
                }
            }
        });
    };
    /* istanbul ignore next */
    DetailsView.prototype.onLayoutChange = function (args) {
        if (this.parent.view === 'Details') {
            if (this.parent.enableVirtualization) {
                this.parent.setProperties({ selectedItems: [] }, true);
            }
            if (!this.gridObj) {
                this.render(args);
            }
            else {
                this.isLoaded = true;
            }
            if (this.parent.isFiltered) {
                this.updatePathColumn();
                this.parent.setProperties({ selectedItems: [] }, true);
            }
            this.gridObj.dataSource = getSortedData(this.parent, args.files);
            this.parent.notify(events.hideLayout, {});
            this.gridObj.element.classList.remove(CLS.DISPLAY_NONE);
            this.isInteracted = false;
            this.gridObj.clearSelection();
            if (this.parent.breadcrumbbarModule.searchObj.element.value.trim() !== '') {
                this.onSearchFiles(args);
            }
            this.adjustHeight();
            if (this.gridObj.sortSettings.columns.length > 0 && this.gridObj.sortSettings.columns[0].field !== this.parent.sortBy) {
                if (this.parent.sortOrder !== 'None') {
                    this.gridObj.sortColumn(this.parent.sortBy, this.parent.sortOrder);
                }
            }
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onSearchFiles = function (args) {
        if (this.parent.view === 'Details') {
            this.parent.setProperties({ selectedItems: [] }, true);
            this.parent.notify(events.selectionChanged, {});
            if (!this.parent.isLayoutChange) {
                this.parent.layoutSelectedItems = [];
            }
            this.updatePathColumn();
            this.parent.searchedItems = args.files;
            this.onPathChanged(args);
        }
    };
    DetailsView.prototype.removePathColumn = function (isRefresh) {
        var len = this.gridObj.columns.length;
        var columnData = JSON.parse(JSON.stringify(this.gridObj.columns));
        var filterPathInSettings = this.parent.detailsViewSettings.columns.some(function (col) { return col.field === 'filterPath'; });
        if (columnData[len - 1].field && (columnData[len - 1].field === 'filterPath') && !filterPathInSettings) {
            /* istanbul ignore next */
            if (!isNullOrUndefined(this.gridObj.sortSettings.columns[0]) && this.gridObj.sortSettings.columns[0].field === 'filterPath') {
                if (this.parent.sortOrder !== 'None') {
                    this.gridObj.sortColumn('name', this.parent.sortOrder);
                }
                else {
                    this.gridObj.dataSource = getSortedData(this.parent, this.gridObj.dataSource);
                }
                this.parent.notify(events.sortByChange, {});
            }
            this.gridObj.columns.pop();
            if (!isRefresh) {
                this.isColumnRefresh = true;
                this.gridObj.refreshColumns();
            }
        }
    };
    DetailsView.prototype.onFinalizeEnd = function (args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        if (!this.gridObj) {
            this.render(args);
        }
        else {
            this.onPathChanged(args);
        }
    };
    DetailsView.prototype.onCreateEnd = function (args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.onPathChanged(args);
    };
    DetailsView.prototype.onRenameInit = function () {
        if (this.parent.activeModule === 'detailsview' && this.parent.selectedItems.length === 1) {
            this.updateRenameData();
        }
    };
    DetailsView.prototype.onSelectedData = function () {
        if (this.parent.activeModule === 'detailsview') {
            this.parent.itemData = this.gridObj.getSelectedRecords();
        }
    };
    DetailsView.prototype.onDeleteInit = function () {
        if (this.parent.activeModule === 'detailsview') {
            Delete(this.parent, this.parent.selectedItems, this.parent.path, 'delete');
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onDeleteEnd = function (args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.onPathChanged(args);
        this.parent.setProperties({ selectedItems: [] }, true);
    };
    DetailsView.prototype.onRefreshEnd = function (args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.isInteracted = false;
        this.removePathColumn(false);
        this.gridObj.dataSource = getSortedData(this.parent, args.files);
        this.emptyArgs = args;
    };
    DetailsView.prototype.onHideLayout = function () {
        if (this.parent.view !== 'Details' && this.gridObj) {
            this.gridObj.element.classList.add(CLS.DISPLAY_NONE);
        }
    };
    DetailsView.prototype.onSelectAllInit = function () {
        if (this.parent.view === 'Details') {
            this.isInteracted = false;
            if (this.parent.allowMultiSelection) {
                this.gridObj.selectionModule.selectRowsByRange(0, this.gridObj.getRows().length);
            }
            else {
                this.gridObj.selectRow(this.gridObj.getRows().length - 1);
            }
            this.isInteracted = true;
            this.interaction = true;
        }
    };
    DetailsView.prototype.onClearAllInit = function () {
        if (this.parent.view === 'Details') {
            this.removeSelection();
            this.interaction = true;
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onSelectionChanged = function () {
        removeClass([this.element], CLS.HEADER_CHECK);
        if (this.parent.selectedItems.length > 0) {
            addClass([this.element], CLS.HEADER_CHECK);
        }
    };
    DetailsView.prototype.onLayoutRefresh = function () {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.adjustHeight();
    };
    DetailsView.prototype.onBeforeRequest = function () {
        this.isRendered = false;
    };
    DetailsView.prototype.onAfterRequest = function () {
        this.isRendered = true;
    };
    DetailsView.prototype.onUpdateSelectionData = function () {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.parent.itemData = this.gridObj.getSelectedRecords();
    };
    DetailsView.prototype.addEventListener = function () {
        this.parent.on(events.finalizeEnd, this.onFinalizeEnd, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.layoutChange, this.onLayoutChange, this);
        this.parent.on(events.pathChanged, this.onPathChanged, this);
        this.parent.on(events.createEnd, this.onCreateEnd, this);
        this.parent.on(events.dropInit, this.onDropInit, this);
        this.parent.on(events.detailsInit, this.onDetailsInit, this);
        this.parent.on(events.refreshEnd, this.onRefreshEnd, this);
        this.parent.on(events.search, this.onSearchFiles, this);
        this.parent.on(events.methodCall, this.onMethodCall, this);
        this.parent.on(events.actionFailure, this.onActionFailure, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.deleteInit, this.onDeleteInit, this);
        this.parent.on(events.deleteEnd, this.onDeleteEnd, this);
        this.parent.on(events.selectedData, this.onSelectedData, this);
        this.parent.on(events.renameInit, this.onRenameInit, this);
        this.parent.on(events.renameEnd, this.onPathChanged, this);
        this.parent.on(events.openInit, this.onOpenInit, this);
        this.parent.on(events.sortColumn, this.onSortColumn, this);
        this.parent.on(events.openEnd, this.onPathChanged, this);
        this.parent.on(events.filterEnd, this.onPathChanged, this);
        this.parent.on(events.pasteInit, this.onPasteInit, this);
        this.parent.on(events.hideLayout, this.onHideLayout, this);
        this.parent.on(events.selectAllInit, this.onSelectAllInit, this);
        this.parent.on(events.clearAllInit, this.onClearAllInit, this);
        this.parent.on(events.pathColumn, this.onPathColumn, this);
        this.parent.on(events.selectionChanged, this.onSelectionChanged, this);
        this.parent.on(events.beforeRequest, this.onBeforeRequest, this);
        this.parent.on(events.afterRequest, this.onAfterRequest, this);
        this.parent.on(events.pasteEnd, this.onpasteEnd, this);
        this.parent.on(events.cutCopyInit, this.oncutCopyInit, this);
        this.parent.on(events.menuItemData, this.onMenuItemData, this);
        this.parent.on(events.resizeEnd, this.onDetailsResizeHandler, this);
        this.parent.on(events.splitterResize, this.onDetailsResize, this);
        this.parent.on(events.layoutRefresh, this.onLayoutRefresh, this);
        this.parent.on(events.dropPath, this.onDropPath, this);
        this.parent.on(events.updateSelectionData, this.onUpdateSelectionData, this);
    };
    DetailsView.prototype.removeEventListener = function () {
        this.parent.off(events.finalizeEnd, this.onFinalizeEnd);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.layoutChange, this.onLayoutChange);
        this.parent.off(events.pathChanged, this.onPathChanged);
        this.parent.off(events.pasteInit, this.onPasteInit);
        this.parent.off(events.createEnd, this.onCreateEnd);
        this.parent.off(events.refreshEnd, this.onRefreshEnd);
        this.parent.off(events.search, this.onSearchFiles);
        this.parent.off(events.methodCall, this.onMethodCall);
        this.parent.off(events.actionFailure, this.onActionFailure);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.renameInit, this.onRenameInit);
        this.parent.off(events.renameEnd, this.onPathChanged);
        this.parent.off(events.filterEnd, this.onPathChanged);
        this.parent.off(events.openInit, this.onOpenInit);
        this.parent.off(events.sortColumn, this.onSortColumn);
        this.parent.off(events.openEnd, this.onPathChanged);
        this.parent.off(events.hideLayout, this.onHideLayout);
        this.parent.off(events.selectAllInit, this.onSelectAllInit);
        this.parent.off(events.clearAllInit, this.onClearAllInit);
        this.parent.off(events.deleteInit, this.onDeleteInit);
        this.parent.off(events.deleteEnd, this.onDeleteEnd);
        this.parent.off(events.pathColumn, this.onPathColumn);
        this.parent.off(events.selectionChanged, this.onSelectionChanged);
        this.parent.off(events.beforeRequest, this.onBeforeRequest);
        this.parent.off(events.afterRequest, this.onAfterRequest);
        this.parent.off(events.pasteEnd, this.onpasteEnd);
        this.parent.off(events.cutCopyInit, this.oncutCopyInit);
        this.parent.off(events.dropInit, this.onDropInit);
        this.parent.off(events.selectedData, this.onSelectedData);
        this.parent.off(events.detailsInit, this.onDetailsInit);
        this.parent.off(events.menuItemData, this.onMenuItemData);
        this.parent.off(events.resizeEnd, this.onDetailsResizeHandler);
        this.parent.off(events.splitterResize, this.onDetailsResize);
        this.parent.off(events.layoutRefresh, this.onLayoutRefresh);
        this.parent.off(events.dropPath, this.onDropPath);
        this.parent.off(events.updateSelectionData, this.onUpdateSelectionData);
    };
    DetailsView.prototype.onActionFailure = function () { this.interaction = true; };
    DetailsView.prototype.onMenuItemData = function (args) {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = [this.gridObj.getRowInfo(args.target).rowData];
        }
    };
    DetailsView.prototype.onPasteInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = (this.parent.folderPath !== '') ? this.gridObj.getSelectedRecords() :
                [getPathObject(this.parent)];
        }
    };
    DetailsView.prototype.onDetailsInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            if (this.parent.selectedItems.length !== 0) {
                this.parent.itemData = this.gridObj.getSelectedRecords();
            }
            else {
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
            }
        }
    };
    DetailsView.prototype.dragHelper = function (args) {
        var dragTarget = args.sender.target;
        var dragLi = dragTarget.closest('tr.e-row');
        if (!dragLi) {
            return null;
        }
        var name;
        if (dragLi.getElementsByClassName('e-fe-text')[0]) {
            name = this.parent.hasId ? this.gridObj.getRowInfo(dragLi).rowData.id : dragLi.getElementsByClassName('e-fe-text')[0].innerText;
        }
        else if (dragLi.getElementsByClassName('e-rowcell e-templatecell')[0].nextElementSibling) {
            name = this.parent.hasId ? this.gridObj.getRowInfo(dragLi).rowData.id : dragLi.getElementsByClassName('e-rowcell e-templatecell')[0].nextElementSibling.innerText;
        }
        if (dragLi && !dragLi.querySelector('.e-active')) {
            this.selectRecords([name]);
        }
        getModule(this.parent, dragLi);
        this.parent.activeElements = [];
        this.parent.dragData = [];
        this.parent.dragData = this.gridObj.getSelectedRecords();
        var dragRow;
        if (this.parent.dragData.length === 0 && dragLi) {
            dragRow = this.gridObj.getRowInfo(dragLi);
        }
        if (dragRow) {
            this.parent.dragData.push(dragRow.rowData);
        }
        this.parent.dragPath = this.parent.path;
        this.parent.activeElements = this.gridObj.getSelectedRows();
        createVirtualDragElement(this.parent);
        return this.parent.virtualDragElement;
    };
    /* istanbul ignore next */
    DetailsView.prototype.onDetailsResize = function () {
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNOU(this.gridObj)) {
            var gridHeader = this.gridObj.getHeaderContent().querySelector('.e-headercontent');
            var gridHeaderColGroup = gridHeader.firstChild.childNodes[0];
            var gridContentColGroup = this.gridObj.getContent().querySelector('.e-content .e-table').children[0];
            var gridHeaderColNames = this.gridObj.getColumns();
            for (var i = 0; i < gridHeaderColNames.length; i++) {
                if ((!this.isNameWidth && gridHeaderColNames[i].field === 'name') || gridHeaderColNames[i].field === 'filterPath') {
                    if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
                        if (this.element.clientWidth <= 500) {
                            gridHeaderColGroup.children[i].style.width = '120px';
                            gridContentColGroup.children[i].style.width = '120px';
                        }
                        else if (this.element.clientWidth > 500) {
                            gridHeaderColGroup.children[i].style.width = 'auto';
                            gridContentColGroup.children[i].style.width = 'auto';
                        }
                    }
                    else {
                        if (this.element.clientWidth <= 680) {
                            if (gridHeaderColNames[i].field === 'name') {
                                gridHeaderColGroup.children[i].style.width = '120px';
                                gridContentColGroup.children[i].style.width = '120px';
                            }
                            else {
                                gridHeaderColGroup.children[i].style.width = '180px';
                                gridContentColGroup.children[i].style.width = '180px';
                            }
                        }
                        else if (this.element.clientWidth > 680) {
                            gridHeaderColGroup.children[i].style.width = 'auto';
                            gridContentColGroup.children[i].style.width = 'auto';
                        }
                    }
                }
            }
        }
    };
    DetailsView.prototype.onDetailsResizeHandler = function () {
        this.onDetailsResize();
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNOU(this.gridObj)) {
            this.adjustHeight();
        }
    };
    DetailsView.prototype.createDragObj = function () {
        var _this = this;
        if (this.gridObj) {
            if (this.parent.allowDragAndDrop && isNullOrUndefined(this.dragObj)) {
                this.dragObj = new Draggable(this.gridObj.element, {
                    cursorAt: this.parent.dragCursorPosition,
                    distance: 5,
                    enableTailMode: true,
                    dragArea: this.parent.element,
                    dragTarget: '.' + CLS.ROW,
                    drag: draggingHandler.bind(this, this.parent),
                    dragStart: function (args) {
                        dragStartHandler(_this.parent, args, _this.dragObj);
                    },
                    dragStop: dragStopHandler.bind(this, this.parent),
                    enableAutoScroll: false,
                    helper: this.dragHelper.bind(this)
                });
            }
            else if (!this.parent.allowDragAndDrop && this.dragObj) {
                this.dragObj.destroy();
                this.dragObj = null;
            }
        }
    };
    DetailsView.prototype.onDropInit = function (args) {
        if (this.parent.targetModule === this.getModuleName()) {
            /* istanbul ignore next */
            var cwdData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            if (!args.target.closest('tr')) {
                this.parent.dropPath = this.parent.path;
                this.parent.dropData = cwdData;
            }
            else {
                var info = null;
                info = this.gridObj.getRowInfo(args.target).rowData;
                this.parent.dropPath = info.isFile ? this.parent.path : getFullPath(this.parent, info, this.parent.path);
                this.parent.dropData = info.isFile ? cwdData : info;
            }
        }
    };
    DetailsView.prototype.oncutCopyInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.activeRecords = this.gridObj.getSelectedRecords();
            this.parent.activeElements = this.gridObj.getSelectedRows();
        }
    };
    DetailsView.prototype.onpasteEnd = function (args) {
        if (this.parent.view === 'Details') {
            this.isPasteOperation = true;
            if (this.parent.path === this.parent.destinationPath ||
                this.parent.path === getDirectoryPath(this.parent, args) || this.parent.hasId) {
                this.onPathChanged(args);
            }
        }
    };
    DetailsView.prototype.onDropPath = function (args) {
        if (this.parent.view === 'Details') {
            this.isPasteOperation = true;
            this.onPathChanged(args);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns modules name.
     * @private
     */
    DetailsView.prototype.getModuleName = function () {
        return 'detailsview';
    };
    DetailsView.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.gridObj) {
            if (this.parent.isReact) {
                this.gridObj.off('reactTemplateRender', this.reactTemplateRender);
            }
            this.unWireEvents();
            this.gridObj.destroy();
        }
    };
    DetailsView.prototype.updateType = function (item) {
        var folder = select('.' + CLS.FOLDER, item);
        this.parent.isFile = isNOU(folder) ? true : false;
    };
    /* istanbul ignore next */
    DetailsView.prototype.onSelection = function (action, args) {
        var eventArgs = {
            action: action, fileDetails: args.data, isInteracted: this.interaction, cancel: false, target: args.target
        };
        this.parent.trigger('fileSelection', eventArgs);
        args.cancel = eventArgs.cancel;
        if (!this.isMultiSelect) {
            this.isMultiSelect = true;
            if ((args.isShiftPressed || args.isCtrlPressed) && !this.parent.allowMultiSelection && (args.target && args.target.parentElement && !args.target.parentElement.classList.contains('e-checkbox-wrapper'))) {
                args.cancel = true;
                var rowIndex = (args && args.rowIndexes)
                    ? args.rowIndexes[args.rowIndexes.length - 1]
                    : args.rowIndex;
                this.gridObj.selectRow(rowIndex);
            }
            this.isMultiSelect = false;
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onSelected = function (args) {
        this.parent.activeModule = 'detailsview';
        if (!this.parent.isLayoutChange || this.parent.isFiltered) {
            this.selectedRecords();
        }
        this.parent.notify(events.selectionChanged, {});
        if (this.gridObj.getSelectedRowIndexes().length === 1) {
            this.firstItemIndex = this.gridObj.selectedRowIndex;
        }
        this.gridObj.element.setAttribute('tabindex', '-1');
        this.triggerSelect('select', args);
        var item = this.gridObj.getRowByIndex(this.gridObj.selectedRowIndex);
        this.updateType(item);
        if (!isNOU(item) && !isNOU(item.querySelector('.e-checkselect'))) {
            if (this.gridObj.getSelectedRowIndexes().length !== 1) {
                var lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
                var lastItem = this.gridObj.getRowByIndex(lastItemIndex);
                if (!isNOU(lastItem)) {
                    lastItem.querySelector('.e-checkselect').setAttribute('tabindex', '-1');
                }
            }
            item.querySelector('.e-rowcell.e-fe-checkbox').removeAttribute('tabindex');
        }
        if (!isNOU(this.gridObj) && !isNOU(this.gridObj.element.querySelector('.e-checkselectall'))) {
            this.gridObj.element.querySelector('.e-checkselectall').setAttribute('tabindex', '-1');
        }
        var rows = this.gridObj.getSelectedRowIndexes();
        if (!this.parent.allowMultiSelection) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i] === this.gridObj.selectedRowIndex) {
                    this.gridObj.getRowByIndex(rows[i]).setAttribute('tabindex', '0');
                }
                else {
                    this.gridObj.getRowByIndex(rows[i]).removeAttribute('tabindex');
                }
            }
        }
        var len = rows.length;
        if (this.parent.enableVirtualization) {
            this.parent.currentItemText = getValue('name', args.data);
        }
        else if (len > 0) {
            var data = this.gridObj.getRowsObject()[rows[len - 1]].data;
            this.parent.currentItemText = getValue('name', data);
        }
        var indexes = getValue('rowIndexes', args);
        var multiSelect = getValue('enableSelectMultiTouch', this.gridObj.selectionModule);
        if (this.parent.isDevice && isNOU(indexes) && args.target && !multiSelect && !args.target.closest('.e-headercell')) {
            this.parent.isFile = getValue('isFile', args.data);
            if (!this.parent.isFile) {
                this.openContent(args.data);
            }
        }
        this.parent.visitedItem = args.row;
        if ((!this.parent.enableVirtualization) || (!args.isHeaderCheckboxClicked)) {
            this.addFocus(this.gridObj.selectedRowIndex);
        }
        if (!this.parent.isLayoutChange) {
            this.isInteracted = true;
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.onPathColumn = function () {
        if (this.parent.view === 'Details' && !isNOU(this.gridObj)) {
            if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
                this.removePathColumn(false);
            }
        }
    };
    DetailsView.prototype.selectedRecords = function () {
        this.parent.setProperties({ selectedItems: [] }, true);
        var selectedRecords = this.gridSelectNodes();
        var selectSize = 0;
        while (selectSize < selectedRecords.length) {
            var record = selectedRecords[selectSize];
            var name_3 = getItemName(this.parent, record);
            this.parent.selectedItems.push(name_3);
            selectSize++;
        }
        this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
    };
    DetailsView.prototype.onDeSelection = function (args) {
        /* istanbul ignore next */
        if (!this.parent.allowMultiSelection && isNOU(args.data)) {
            var item = this.gridObj.getRowByIndex(args.rowIndex);
            if (!isNOU(item)) {
                item.removeAttribute('tabindex');
            }
        }
        else if (this.gridObj.getSelectedRowIndexes().length > 1) {
            var lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
            var lastItem = this.gridObj.getRowByIndex(lastItemIndex);
            if (!isNOU(lastItem)) {
                lastItem.querySelector('.e-checkselect').removeAttribute('tabindex');
            }
        }
        if (this.gridObj.selectedRowIndex === -1) {
            this.gridObj.element.setAttribute('tabindex', '0');
        }
        if (!this.isInteracted) {
            this.isInteracted = true;
            return;
        }
        this.selectedRecords();
        if (this.parent.selectedItems.length === 0) {
            setValue('enableSelectMultiTouch', false, this.gridObj.selectionModule);
            removeClass([this.parent.element], CLS.MULTI_SELECT);
        }
        this.parent.notify(events.selectionChanged, {});
        this.triggerSelect('unselect', args);
        this.parent.visitedItem = null;
    };
    DetailsView.prototype.triggerSelect = function (action, args) {
        var eventArgs = { action: action, fileDetails: args.data, isInteracted: this.interaction };
        this.parent.trigger('fileSelect', eventArgs);
        this.interaction = true;
    };
    DetailsView.prototype.wireEvents = function () {
        this.wireClickEvent(true);
        this.keyboardModule = new KeyboardEvents(this.gridObj.element, {
            keyAction: this.keyupHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keyup'
        });
        this.keyboardDownModule = new KeyboardEvents(this.element, {
            keyAction: this.keydownHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        EventHandler.add(this.gridObj.element, 'blur', this.removeFocus, this);
        EventHandler.add(this.parent.element, 'focusout', this.onBlur, this);
    };
    DetailsView.prototype.unWireEvents = function () {
        this.wireClickEvent(false);
        this.keyboardModule.destroy();
        this.keyboardDownModule.destroy();
        EventHandler.remove(this.gridObj.element, 'blur', this.removeFocus);
        EventHandler.remove(this.parent.element, 'focusout', this.onBlur);
    };
    DetailsView.prototype.wireClickEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            var ele = this.gridObj.getContent();
            this.clickObj = new Touch(ele, {
                tap: function (eve) {
                    if (eve.tapCount === 1 && eve.originalEvent.target.classList.contains('e-content')) {
                        _this.onClearAllInit();
                    }
                },
                tapHold: function (e) {
                    if (_this.parent.isDevice) {
                        e.originalEvent.preventDefault();
                        if (_this.parent.allowMultiSelection) {
                            setValue('enableSelectMultiTouch', _this.parent.allowMultiSelection, _this.gridObj.selectionModule);
                            addClass([_this.parent.element], CLS.MULTI_SELECT);
                        }
                        var target = e.originalEvent.target;
                        if (target) {
                            var row = closest(target, '.' + CLS.ROW);
                            var index = _this.gridObj.getRows().indexOf(row);
                            _this.gridObj.selectRow(index);
                        }
                    }
                }
            });
        }
        else {
            if (this.clickObj) {
                this.clickObj.destroy();
            }
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.removeSelection = function () {
        removeClass([this.parent.element], CLS.MULTI_SELECT);
        this.gridObj.clearSelection();
        this.parent.setProperties({ selectedItems: [] }, true);
        this.parent.notify(events.selectionChanged, {});
        if (this.gridObj.selectedRowIndex === -1) {
            this.startIndex = null;
        }
        this.isInteracted = true;
    };
    DetailsView.prototype.removeFocus = function () {
        this.addFocus(null);
    };
    DetailsView.prototype.onBlur = function (e) {
        if ((e.relatedTarget !== null && closest(e.relatedTarget, '.e-grid') !== e.relatedTarget)) {
            return;
        }
        if (!isNOU(this.gridObj.element)) {
            var thElements = this.gridObj.element.querySelectorAll('th');
            for (var i = 0; i < thElements.length; i++) {
                if (thElements[i].classList.contains('e-focus')) {
                    this.addFocus(null);
                }
            }
        }
    };
    DetailsView.prototype.getFocusedItemIndex = function () {
        return (!isNOU(this.getFocusedItem())) ?
            parseInt(this.getFocusedItem().getAttribute('aria-rowindex'), 10) - 1 : null;
    };
    /* istanbul ignore next */
    DetailsView.prototype.keydownHandler = function (e) {
        if (!this.isRendered) {
            return;
        }
        switch (e.action) {
            case 'end':
            case 'home':
            case 'space':
            case 'ctrlSpace':
            case 'shiftSpace':
            case 'csSpace':
            case 'ctrlA':
            case 'enter':
            case 'altEnter':
            case 'ctrlEnd':
            case 'shiftEnd':
            case 'csEnd':
            case 'ctrlHome':
            case 'shiftHome':
            case 'csHome':
            case 'ctrlDown':
            case 'shiftDown':
            case 'csDown':
            case 'ctrlLeft':
            case 'shiftLeft':
            case 'csLeft':
            case 'esc':
            case 'del':
            case 'shiftdel':
            case 'ctrlC':
            case 'ctrlV':
            case 'ctrlX':
            case 'f2':
            case 'moveDown':
            case 'moveUp':
            case 'ctrlD':
                e.preventDefault();
                break;
            default:
                break;
        }
    };
    /* istanbul ignore next */
    DetailsView.prototype.keyupHandler = function (e) {
        if (!this.isRendered) {
            return;
        }
        e.preventDefault();
        var action = e.action;
        var gridItems = getSortedData(this.parent, this.gridObj.dataSource);
        var gridLength = gridItems.length;
        var focIndex = this.getFocusedItemIndex();
        var selIndex = this.gridObj.selectedRowIndex;
        var selRowIndeces = this.gridObj.getSelectedRowIndexes();
        var rowData;
        var firstItem;
        var lastItem;
        switch (action) {
            case 'altEnter':
                this.parent.notify(events.detailsInit, {});
                GetDetails(this.parent, this.parent.selectedItems, this.parent.path, 'details');
                break;
            case 'esc':
                removeActive(this.parent);
                break;
            case 'del':
            case 'shiftdel':
                this.performDelete();
                break;
            case 'enter':
                if (this.gridObj.selectedRowIndex === -1 && this.gridObj.allowSorting === true) {
                    if (!e.target.classList.contains('e-fe-grid-icon')) {
                        var direction = !e.target.getElementsByClassName('e-ascending').length ? 'Ascending' : 'Descending';
                        var currentField = this.gridObj.getColumnByUid(e.target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid')).field;
                        this.gridObj.sortColumn(currentField, direction);
                        if (!isNOU(this.getFocusedItem().nextSibling)) {
                            this.getFocusedItem().nextSibling.setAttribute('tabindex', '0');
                        }
                    }
                    break;
                }
                rowData = this.gridObj.getRowsObject()[this.gridObj.selectedRowIndex].data;
                if (rowData) {
                    var data = JSON.parse(JSON.stringify(rowData));
                    this.openContent(data);
                }
                break;
            case 'ctrlC':
                copyFiles(this.parent);
                break;
            case 'ctrlV':
                this.parent.folderPath = '';
                pasteHandler(this.parent);
                break;
            case 'ctrlX':
                cutFiles(this.parent);
                break;
            case 'ctrlD':
                this.doDownload();
                break;
            case 'f2':
                this.performRename();
                break;
            case 'ctrlA':
                if (!isNOU(gridItems[0]) && this.parent.allowMultiSelection) {
                    var cnTable = this.gridObj.getContent().querySelector('.e-content');
                    var crtSrlPos = cnTable.scrollTop;
                    var crtFocusIndex = this.gridObj.selectedRowIndex;
                    this.gridObj.selectionModule.selectRowsByRange(0, gridItems.length - 1);
                    cnTable.scrollTop = crtSrlPos;
                    if (crtFocusIndex !== -1) {
                        this.addFocus(crtFocusIndex);
                    }
                }
                break;
            case 'ctrlHome':
            case 'tab':
                if (!isNOU(gridItems[0])) {
                    if (!this.parent.allowMultiSelection && e.action === 'ctrlHome') {
                        this.gridObj.selectRow(0);
                    }
                    else if (this.gridObj.selectedRowIndex !== -1 && e.action === 'tab') {
                        return;
                    }
                    else {
                        this.addHeaderFocus(e);
                    }
                }
                break;
            case 'ctrlEnd':
                if (!isNOU(gridItems[0])) {
                    if (!this.parent.allowMultiSelection) {
                        this.gridObj.selectRow(gridLength - 1);
                    }
                    else {
                        this.addFocus(gridLength - 1);
                    }
                }
                break;
            case 'shiftHome':
            case 'shiftEnd':
            case 'csHome':
            case 'csEnd':
                if (!this.parent.allowMultiSelection) {
                    this.gridObj.selectRow((e.action === 'shiftHome' || e.action === 'csHome') ? 0 : gridItems.length - 1);
                }
                else {
                    if (!isNOU(gridItems[0])) {
                        if (!isNOU(selIndex) && selIndex !== -1) {
                            this.checkRowsKey(gridItems, selIndex, null, e);
                        }
                        else {
                            if (e.action === 'csHome' || e.action === 'shiftHome') {
                                this.gridObj.selectRow(0);
                            }
                            else {
                                this.gridObj.selectionModule.selectRowsByRange(0, gridItems.length - 1);
                            }
                        }
                    }
                }
                break;
            case 'space':
            case 'csSpace':
            case 'shiftSpace':
            case 'ctrlSpace':
                this.spaceSelection(selRowIndeces, focIndex, selIndex, e);
                break;
            case 'csUp':
            case 'csDown':
            case 'shiftUp':
            case 'shiftDown':
                this.shiftMoveMethod(gridItems, selIndex, focIndex, selRowIndeces, e);
                break;
            case 'ctrlUp':
            case 'ctrlDown':
                if (!this.parent.allowMultiSelection) {
                    this.moveFunction(gridItems, e, selIndex);
                }
                else {
                    this.ctrlMoveFunction(gridItems, e, selIndex);
                }
                break;
            case 'home':
                firstItem = [getValue(this.parent.hasId ? 'id' : 'name', gridItems[0])];
                this.parent.setProperties({ selectedItems: firstItem }, true);
                this.selectRecords(firstItem);
                break;
            case 'moveUp':
            case 'moveDown':
                this.moveFunction(gridItems, e, selIndex);
                break;
            case 'end':
                lastItem = [getValue(this.parent.hasId ? 'id' : 'name', gridItems[gridLength - 1])];
                this.parent.setProperties({ selectedItems: lastItem }, true);
                this.selectRecords(lastItem);
                break;
            case 'back':
                this.parent.traverseBackward();
                break;
        }
    };
    DetailsView.prototype.gridSelectNodes = function () {
        return this.gridObj.getSelectedRecords();
    };
    DetailsView.prototype.doDownload = function () {
        if (this.parent.selectedItems.length !== 0) {
            this.parent.itemData = this.gridObj.getSelectedRecords();
            var items = this.parent.itemData;
            for (var i = 0; i < items.length; i++) {
                if (!hasDownloadAccess(items[i])) {
                    createDeniedDialog(this.parent, items[i], events.permissionDownload);
                    return;
                }
            }
            Download(this.parent, this.parent.path, this.parent.selectedItems);
        }
    };
    DetailsView.prototype.performDelete = function () {
        if (this.parent.selectedItems && this.parent.selectedItems.length > 0) {
            this.parent.itemData = this.gridObj.getSelectedRecords();
            var items = this.parent.itemData;
            for (var i = 0; i < items.length; i++) {
                if (!hasEditAccess(items[i])) {
                    createDeniedDialog(this.parent, items[i], events.permissionEdit);
                    return;
                }
            }
            createDialog(this.parent, 'Delete');
        }
    };
    DetailsView.prototype.performRename = function () {
        if (this.parent.selectedItems.length === 1) {
            this.updateRenameData();
            doRename(this.parent);
        }
    };
    DetailsView.prototype.updateRenameData = function () {
        var data = this.gridSelectNodes()[0];
        updateRenamingData(this.parent, data);
    };
    DetailsView.prototype.shiftMoveMethod = function (gridItems, selIndex, focIndex, selRowIndeces, e) {
        if (!this.parent.allowMultiSelection) {
            this.moveFunction(gridItems, e, selIndex);
        }
        else {
            if (selIndex === -1 && (e.action === 'csUp' || e.action === 'csDown')) {
                this.ctrlMoveFunction(gridItems, e, selIndex);
            }
            else if (selIndex !== -1 && focIndex !== selIndex &&
                !((e.action === 'csUp' || e.action === 'csDown') && this.isSelected(selRowIndeces, focIndex))) {
                this.shiftSelectFocusItem(selIndex, focIndex, selRowIndeces, e);
            }
            else {
                this.shiftSelectedItem(selIndex, selRowIndeces, gridItems, e);
            }
        }
    };
    DetailsView.prototype.moveFunction = function (selectedItems, e, rowIndex) {
        if (!isNOU(this.getFocusedItem()) && this.parent.allowMultiSelection) {
            if (e.action === 'moveDown') {
                this.gridObj.selectRow(this.getFocusedItemIndex() + 1);
            }
            else {
                this.gridObj.selectRow(this.getFocusedItemIndex() - 1);
            }
        }
        else if (!isNOU(rowIndex) && rowIndex !== -1) {
            if (e.action === 'moveDown' || e.action === 'ctrlDown' || e.action === 'shiftDown' || e.action === 'csDown') {
                this.gridObj.selectRow(rowIndex + ((rowIndex !== selectedItems.length - 1) ? 1 : 0));
            }
            else {
                this.gridObj.selectRow(rowIndex - ((rowIndex !== 0) ? 1 : 0));
            }
        }
        else {
            if (!isNOU(selectedItems[0])) {
                this.gridObj.selectRow(0);
            }
        }
    };
    DetailsView.prototype.spaceSelection = function (selRowIndeces, focIndex, selIndex, e) {
        if (!this.isSelected(selRowIndeces, focIndex) && selIndex !== -1 && (e.action === 'shiftSpace' || e.action === 'csSpace')) {
            if (focIndex < selIndex) {
                this.gridObj.selectionModule.selectRowsByRange(focIndex, selIndex);
            }
            else {
                this.gridObj.selectionModule.selectRowsByRange(selIndex, focIndex);
            }
        }
        else if (!isNOU(this.getFocusedItem()) && focIndex !== selIndex) {
            selRowIndeces.push(this.getFocusedItemIndex());
            this.gridObj.selectRows(selRowIndeces);
        }
        else if (selIndex !== -1 && e.action === 'ctrlSpace' && this.parent.allowMultiSelection) {
            var lItem = selIndex;
            selRowIndeces.pop();
            this.gridObj.selectRows(selRowIndeces);
            this.addFocus(lItem);
        }
        else if (e.action === 'shiftSpace') {
            this.gridObj.selectRow(selIndex);
        }
    };
    DetailsView.prototype.ctrlMoveFunction = function (items, e, rowIndex) {
        var nextItem;
        if (!isNOU(this.getFocusedItem())) {
            var nextIndex = this.getFocusedItemIndex();
            nextItem = (e.action === 'ctrlDown' || e.action === 'csDown') ?
                nextIndex + ((nextIndex < items.length - 1) ? 1 : 0) : nextIndex - ((nextIndex < 1) ? 0 : 1);
        }
        else if (!isNOU(rowIndex) && rowIndex !== -1) {
            nextItem = (e.action === 'ctrlDown' || e.action === 'csDown') ?
                rowIndex + ((rowIndex < items.length) ? 1 : 0) : rowIndex - ((rowIndex < 1) ? 0 : 1);
        }
        else {
            if (!isNOU(items[0])) {
                nextItem = 0;
            }
        }
        this.addFocus(nextItem);
    };
    DetailsView.prototype.checkRowsKey = function (items, indexValue, focIndex, e) {
        if (this.gridObj.checkAllRows === 'Uncheck' || this.gridObj.checkAllRows === 'Intermediate') {
            if (e.action !== 'csHome' && e.action !== 'csEnd') {
                if (isNOU(this.startIndex) && this.firstItemIndex !== indexValue) {
                    this.firstItemIndex = indexValue;
                }
                if (e.action === 'shiftEnd') {
                    this.gridObj.selectionModule.selectRowsByRange(this.firstItemIndex, items.length - 1);
                }
                else {
                    this.gridObj.selectionModule.selectRowsByRange(0, this.firstItemIndex);
                }
                this.startIndex = indexValue;
            }
            else {
                if (e.action === 'csEnd') {
                    this.gridObj.
                        selectRows(this.InnerItems(isNOU(indexValue) ? 0 : indexValue, isNOU(focIndex) ? items.length - 1 : focIndex, e));
                }
                else {
                    if (isNOU(indexValue)) {
                        this.gridObj.selectRow(0);
                    }
                    else {
                        this.gridObj.selectRows(this.InnerItems(isNOU(focIndex) ? 0 : focIndex, indexValue, e));
                    }
                }
            }
        }
        else {
            this.gridObj.selectionModule.selectRow(((e.action === 'shiftHome' || e.action === 'csHome') ? 0 : items.length - 1));
        }
    };
    DetailsView.prototype.InnerItems = function (fItem, lItem, e) {
        var itemArr = this.gridObj.getSelectedRowIndexes();
        if (e.action === 'csEnd') {
            for (var i = fItem + 1; i <= lItem; i++) {
                itemArr.push(i);
            }
        }
        else {
            for (var i = lItem - 1; fItem <= i; i--) {
                itemArr.push(i);
            }
        }
        return itemArr;
    };
    DetailsView.prototype.shiftSelectFocusItem = function (selIndex, fIndex, selRowIndexes, e) {
        var lItem = fIndex + ((e.action === 'shiftDown' || e.action === 'csDown') ? 1 : -1);
        var fItem = isNOU(this.startIndex) ? selIndex : selRowIndexes[0];
        if (fItem === lItem) {
            this.gridObj.selectRow(fItem);
        }
        else {
            if (fItem < lItem) {
                if (e.action === 'shiftDown' || e.action === 'csDown') {
                    this.gridObj.selectionModule.selectRowsByRange(fItem, lItem);
                }
                else {
                    this.gridObj.selectionModule.selectRowsByRange(lItem, fItem);
                }
            }
            else if (e.action === 'shiftDown' || e.action === 'csDown') {
                this.gridObj.selectionModule.selectRowsByRange(lItem, fItem);
            }
            else {
                this.gridObj.selectionModule.selectRowsByRange(fItem, lItem);
            }
        }
        this.startIndex = this.gridObj.selectedRowIndex;
    };
    DetailsView.prototype.addFocus = function (item) {
        var fItem = this.getFocusedItem();
        var itemElement = this.gridObj.getRowByIndex(item);
        if (fItem) {
            fItem.removeAttribute('tabindex');
            removeClass([fItem], [CLS.FOCUS, CLS.FOCUSED]);
        }
        if (!isNOU(itemElement)) {
            this.gridObj.element.setAttribute('tabindex', '-1');
            itemElement.setAttribute('tabindex', '0');
            itemElement.focus();
            addClass([itemElement], [CLS.FOCUS, CLS.FOCUSED]);
        }
    };
    DetailsView.prototype.addHeaderFocus = function (e) {
        var treeFocus = select('.e-row', this.element);
        this.gridObj.element.setAttribute('tabindex', '-1');
        var nameFocus;
        if (!isNOU(e.target) && e.target.classList.contains('e-defaultcursor')) {
            this.addFocus(0);
            nameFocus = e.target.nextElementSibling;
        }
        else if (!isNOU(this.gridObj.element.querySelector('.e-focus')) && (this.gridObj.element.querySelector('.e-focus').tagName === 'TH')) {
            nameFocus = this.gridObj.element.querySelector('.e-focus').nextElementSibling;
            this.addFocus(0);
        }
        else {
            nameFocus = select('th.e-fe-grid-icon', this.element);
        }
        if (!isNOU(nameFocus)) {
            nameFocus.setAttribute('tabindex', '0');
            nameFocus.focus();
            addClass([nameFocus], [CLS.FOCUS, CLS.FOCUSED]);
            treeFocus.setAttribute('tabindex', '0');
            if (treeFocus.tabIndex === 0 && nameFocus.tabIndex === 0) {
                removeClass([treeFocus], [CLS.FOCUS, CLS.FOCUSED]);
            }
        }
    };
    DetailsView.prototype.getFocusedItem = function () {
        return select('.' + CLS.FOCUSED, this.element);
    };
    DetailsView.prototype.isSelected = function (selRowIndexes, focIndex) {
        var check = false;
        for (var i = 0; i <= selRowIndexes.length - 1; i++) {
            if (selRowIndexes[i] === focIndex) {
                check = true;
                break;
            }
        }
        return check;
    };
    DetailsView.prototype.shiftSelectedItem = function (selIndex, selRowIndexes, gridItems, e) {
        if (selIndex === -1) {
            this.gridObj.selectRow(0);
        }
        else {
            if (isNOU(this.startIndex) && e.shiftKey) {
                this.startIndex = this.gridObj.selectedRowIndex;
                this.gridObj.selectRows([selIndex, (e.action === 'shiftDown' || e.action === 'csDown') ?
                        (selIndex + ((selIndex !== gridItems.length - 1) ? 1 : 0)) : (selIndex - ((selIndex !== 0) ? 1 : 0))]);
            }
            else {
                if (e.action === 'shiftDown' || e.action === 'shiftUp') {
                    if (e.action === 'shiftDown' && selRowIndexes.indexOf(selIndex + 1) === -1) {
                        if (selIndex !== gridItems.length - 1) {
                            selRowIndexes.push(selIndex + 1);
                        }
                    }
                    else if (e.action === 'shiftUp' && selRowIndexes.indexOf(selIndex - 1) === -1) {
                        if (selIndex !== 0) {
                            selRowIndexes.push(selIndex - 1);
                        }
                    }
                    else {
                        selRowIndexes.pop();
                    }
                    this.gridObj.selectRows(selRowIndexes);
                }
                else {
                    if (e.action === 'csDown') {
                        if (!this.isSelected(selRowIndexes, this.getFocusedItemIndex() + 1)) {
                            selRowIndexes.push((this.getFocusedItemIndex() + 1));
                            this.gridObj.selectRows(selRowIndexes);
                        }
                        else {
                            this.addFocus(this.getFocusedItemIndex() + 1);
                        }
                    }
                    else if (!this.isSelected(selRowIndexes, this.getFocusedItemIndex() - 1)) {
                        selRowIndexes.push((this.getFocusedItemIndex() - 1));
                        this.gridObj.selectRows(selRowIndexes);
                    }
                    else {
                        this.addFocus(this.getFocusedItemIndex() - 1);
                    }
                }
            }
        }
    };
    DetailsView.prototype.onMethodCall = function (e) {
        if (this.parent.view !== 'Details') {
            return;
        }
        var action = getValue('action', e);
        switch (action) {
            case 'deleteFiles':
                this.deleteFiles(getValue('ids', e));
                break;
            case 'downloadFiles':
                this.downloadFiles(getValue('ids', e));
                break;
            case 'openFile':
                this.openFile(getValue('id', e));
                break;
            case 'createFolder':
                this.interaction = false;
                break;
            case 'renameFile':
                this.interaction = false;
                this.renameFile(getValue('id', e), getValue('newName', e));
                break;
            case 'selectAll':
                this.interaction = false;
                this.onSelectAllInit();
                break;
            case 'clearSelection':
                this.interaction = false;
                this.onClearAllInit();
                break;
        }
    };
    DetailsView.prototype.getRecords = function (nodes) {
        var gridRecords = this.gridObj.getCurrentViewRecords();
        var records = [];
        var hasFilter = (this.parent.breadcrumbbarModule.searchObj.element.value !== '' || this.parent.isFiltered) ? true : false;
        var filter = this.parent.hasId ? 'id' : 'name';
        if (this.parent.hasId || !hasFilter) {
            for (var i = 0, len = gridRecords.length; i < len; i++) {
                if (nodes.indexOf(getValue(filter, gridRecords[i])) !== -1) {
                    records.push(gridRecords[i]);
                }
            }
        }
        else {
            for (var i = 0, len = gridRecords.length; i < len; i++) {
                var name_4 = getValue('filterPath', gridRecords[i]) + getValue('name', gridRecords[i]);
                if (nodes.indexOf(name_4) !== -1) {
                    records.push(gridRecords[i]);
                }
            }
        }
        return records;
    };
    DetailsView.prototype.deleteFiles = function (ids) {
        this.parent.activeModule = 'detailsview';
        if (isNOU(ids)) {
            this.performDelete();
            return;
        }
        var records = this.getRecords(ids);
        if (records.length === 0) {
            return;
        }
        var data = [];
        var newIds = [];
        for (var i = 0; i < records.length; i++) {
            data[i] = records[i];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDeleteFiles(this.parent, data, newIds);
    };
    DetailsView.prototype.downloadFiles = function (ids) {
        if (isNOU(ids)) {
            this.doDownload();
            return;
        }
        var dRecords = this.getRecords(ids);
        if (dRecords.length === 0) {
            return;
        }
        var data = [];
        var newIds = [];
        for (var i = 0; i < dRecords.length; i++) {
            data[i] = dRecords[i];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDownloadFiles(this.parent, data, newIds);
    };
    DetailsView.prototype.openFile = function (id) {
        if (isNOU(id)) {
            return;
        }
        var records = this.getRecords([id]);
        if (records.length > 0) {
            this.openContent(records[0]);
        }
    };
    DetailsView.prototype.renameFile = function (id, name) {
        this.parent.activeModule = 'detailsview';
        if (isNOU(id)) {
            this.performRename();
            return;
        }
        var records = this.getRecords([id]);
        if (records.length > 0) {
            updateRenamingData(this.parent, records[0]);
            if (!isNOU(name)) {
                if (hasEditAccess(this.parent.itemData[0])) {
                    rename(this.parent, this.parent.path, name);
                }
                else {
                    createDeniedDialog(this.parent, this.parent.itemData[0], events.permissionEdit);
                }
            }
            else {
                doRename(this.parent);
            }
        }
    };
    return DetailsView;
}());
export { DetailsView };
