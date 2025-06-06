import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { isNullOrUndefined as isNOU, createElement, closest, KeyboardEvents } from '@syncfusion/ej2-base';
import { getValue, select } from '@syncfusion/ej2-base';
import { Download, GetDetails } from './../common/operations';
import { createDialog } from './dialog';
import { cutFiles, copyFiles, refresh, getPathObject, getLocaleText, updateLayout, getFullPath } from './../common/utility';
import { getCssClass, sortbyClickHandler, pasteHandler } from './../common/utility';
import { createDeniedDialog, createNewFolder, uploadItem, hasEditAccess, hasDownloadAccess } from './../common/utility';
import * as events from './../base/constant';
import * as CLS from '../base/classes';
/**
 * ContextMenu module
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Constructor for the ContextMenu module
     *
     * @param {IFileManager} parent - Specifies the parent element.
     * @hidden
     */
    function ContextMenu(parent) {
        this.isMenuItemClicked = false;
        this.currentItems = [];
        this.currentElement = null;
        this.disabledItems = [];
        this.parent = parent;
        this.render();
    }
    ContextMenu.prototype.render = function () {
        this.keyConfigs = {
            downarrow: 'downarrow',
            uparrow: 'uparrown'
        };
        this.contextMenu = new Menu({
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            target: '#' + this.parent.element.id,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            beforeItemRender: this.onBeforeItemRender.bind(this),
            select: this.onSelect.bind(this),
            beforeOpen: this.onBeforeOpen.bind(this),
            beforeClose: this.onBeforeClose.bind(this),
            cssClass: getCssClass(this.parent, CLS.ROOT_POPUP)
        });
        this.contextMenu.isStringTemplate = true;
        this.contextMenu.appendTo('#' + this.parent.element.id + CLS.CONTEXT_MENU_ID);
        this.addEventListener();
    };
    /* istanbul ignore next */
    ContextMenu.prototype.onBeforeItemRender = function (args) {
        if (args.item.id === this.getMenuId('largeiconsview')) {
            var iconSpan = createElement('span');
            var element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'LargeIcons' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', CLS.ICON_LARGE + ' ' + CLS.MENU_ICON);
        }
        if (args.item.id === this.getMenuId('detailsview')) {
            var iconSpan = createElement('span');
            var element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'Details' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', CLS.ICON_GRID + ' ' + CLS.MENU_ICON);
        }
    };
    ContextMenu.prototype.onBeforeClose = function (args) {
        var eventArgs = {
            cancel: false,
            element: args.element,
            event: args.event,
            isFocused: args.isFocused,
            fileDetails: [this.menuItemData],
            items: args.items,
            parentItem: args.parentItem,
            menuType: this.menuType
        };
        this.parent.trigger('menuClose', eventArgs, function (menuCloseArgs) {
            if (menuCloseArgs.cancel) {
                args.cancel = menuCloseArgs.cancel;
                return;
            }
        });
        this.menuTarget = null;
        if (!this.isMenuItemClicked && this.parent.pathId.length > 1 && this.parent.activeModule === 'navigationpane') {
            this.parent.pathId.pop();
            var parentKey = [];
            var itemKeys = Object.keys(this.parent.feParent);
            for (var _i = 0, itemKeys_1 = itemKeys; _i < itemKeys_1.length; _i++) {
                var item = itemKeys_1[_i];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var itemData = getValue(item, this.parent.feParent);
                if (this.parent.pathNames.indexOf(itemData.name) !== -1) {
                    parentKey.push(itemData._fm_id);
                }
            }
            this.parent.pathId.push(parentKey[parentKey.length - 1]);
            this.parent.navigationpaneModule.treeObj.setProperties({ selectedNodes: [this.parent.pathId[this.parent.pathId.length - 1]] });
        }
        this.isMenuItemClicked = false;
    };
    /* istanbul ignore next */
    ContextMenu.prototype.onBeforeOpen = function (args) {
        var _this = this;
        var selected = false;
        var uid;
        var data;
        var treeFolder = false;
        var target = args.event.target;
        this.menuTarget = this.targetNodeElement = target;
        this.currentElement = args.element;
        if (target.classList.contains('e-spinner-pane')) {
            target = this.parent.navigationpaneModule.activeNode.getElementsByClassName(CLS.FULLROW)[0];
            this.menuTarget = this.targetNodeElement = target;
        }
        this.targetElement = this.parent.view === 'Details' ? closest(target, 'tr.e-row') : target;
        if (this.parent.enableVirtualization && (target.classList.contains('e-virtual-bottom') || target.classList.contains('e-virtualtable'))) {
            target = target.parentElement.closest('div');
        }
        var view = this.getTargetView(target);
        this.updateActiveModule();
        /* istanbul ignore next */
        if (target.classList.contains(CLS.TREE_VIEW) || closest(target, 'th') ||
            (closest(target, '#' + this.parent.element.id + CLS.BREADCRUMBBAR_ID)) ||
            (closest(target, '#' + this.parent.element.id + CLS.TOOLBAR_ID))) {
            args.cancel = true;
        }
        else if (!(this.parent.view === 'LargeIcons') && this.targetElement &&
            this.targetElement.classList.contains('e-emptyrow')) {
            this.setLayoutItem(target);
            /* istanbul ignore next */
        }
        else if (closest(target, '.' + CLS.EMPTY)) {
            this.setLayoutItem(target);
        }
        else if (!target.classList.contains(CLS.MENU_ITEM) &&
            !target.classList.contains(CLS.MENU_ICON) && !target.classList.contains(CLS.SUBMENU_ICON)) {
            /* istanbul ignore next */
            if (this.parent.view === 'LargeIcons' && !isNOU(closest(target, 'li')) && !closest(target, '#' + this.parent.element.id + CLS.TREE_ID)) {
                var eveArgs = { ctrlKey: true, shiftKey: true };
                if (!closest(target, 'li').classList.contains('e-active')) {
                    this.parent.largeiconsviewModule.doSelection(target, eveArgs);
                }
                data = this.parent.visitedData;
                selected = true;
            }
            else if (!isNOU(closest(target, 'tr.e-row'))) {
                uid = this.targetElement.getAttribute('data-uid');
                data = this.parent.detailsviewModule.gridObj.getRowObjectFromUID(uid).data;
                if (isNOU(this.targetElement.getAttribute('aria-selected'))) {
                    /* istanbul ignore next */
                    this.parent.detailsviewModule.gridObj.selectRows([parseInt(this.targetElement.getAttribute('aria-rowindex'), 10) - 1]);
                }
                selected = true;
                /* istanbul ignore next */
            }
            else if (closest(target, '#' + this.parent.element.id + CLS.TREE_ID)) {
                uid = closest(target, 'li').getAttribute('data-uid');
                if (!isNOU(uid)) {
                    this.navUid = uid;
                }
                treeFolder = true;
            }
            /* istanbul ignore next */
            if (selected) {
                if (getValue('isFile', data) === true) {
                    this.setFileItem();
                }
                else {
                    this.setFolderItem(false);
                }
                /* istanbul ignore next */
            }
            else if (treeFolder) {
                this.setFolderItem(true);
                if (uid === this.parent.pathId[0]) {
                    this.disabledItems.push('Delete', 'Rename', 'Cut', 'Copy');
                }
                else {
                    var itemsToRemove = ['Delete', 'Rename', 'Cut', 'Copy'];
                    for (var i = 0; i < this.disabledItems.length; i++) {
                        var item = this.disabledItems[i];
                        if (itemsToRemove.indexOf(item) !== -1) {
                            this.disabledItems.splice(i, 1);
                            i--;
                        }
                    }
                }
                /* istanbul ignore next */
            }
            else if (view === 'TreeView' || view === 'GridView' || view === 'LargeIcon') {
                this.setLayoutItem(target);
                /* istanbul ignore next */
            }
            else {
                args.cancel = true;
            }
        }
        var pasteEle = select('#' + this.getMenuId('Paste'), this.contextMenu.element);
        if (!args.cancel && !this.parent.enablePaste &&
            pasteEle && !pasteEle.classList.contains('e-disabled')) {
            if (this.disabledItems.indexOf('Paste') === -1) {
                this.disabledItems.push('Paste');
            }
        }
        else {
            var pasteIndex = this.disabledItems.indexOf('Paste');
            if (pasteIndex !== -1) {
                this.disabledItems.splice(pasteIndex, 1);
            }
        }
        if (args.cancel) {
            this.menuTarget = this.currentElement = null;
            return;
        }
        this.contextMenu.dataBind();
        var isSubMenu = false;
        if (target.classList.contains(CLS.MENU_ITEM) ||
            target.classList.contains(CLS.MENU_ICON) || target.classList.contains(CLS.SUBMENU_ICON)) {
            isSubMenu = true;
        }
        this.menuItemData = isSubMenu ? this.menuItemData : this.getMenuItemData();
        var eventArgs = {
            fileDetails: [this.menuItemData],
            element: args.element,
            target: target,
            items: isSubMenu ? args.items : this.contextMenu.items,
            menuModule: this.contextMenu,
            cancel: false,
            menuType: this.menuType,
            isSubMenu: isSubMenu
        };
        this.currentItems = eventArgs.items;
        this.parent.trigger('menuOpen', eventArgs, function (menuOpenArgs) {
            if (!isSubMenu) {
                _this.contextMenu.dataBind();
                _this.contextMenu.items = menuOpenArgs.items;
                _this.contextMenu.dataBind();
            }
            _this.enableItems(_this.disabledItems, false, true);
            args.cancel = menuOpenArgs.cancel;
            if (menuOpenArgs.cancel) {
                _this.menuTarget = _this.targetNodeElement = _this.currentElement = null;
            }
        });
    };
    ContextMenu.prototype.updateActiveModule = function () {
        this.parent.activeModule = closest(this.menuTarget, '#' + this.parent.element.id + CLS.TREE_ID) ?
            'navigationpane' : closest(this.menuTarget, '#' + this.parent.element.id + CLS.GRID_ID) ?
            'detailsview' : closest(this.menuTarget, '#' + this.parent.element.id + CLS.LARGEICON_ID) ?
            'largeiconsview' : this.parent.activeModule;
    };
    /* istanbul ignore next */
    /**
     *
     * @param {Element} target - specifies the target element.
     * @returns {string} -returns the target view.
     * @hidden
     */
    ContextMenu.prototype.getTargetView = function (target) {
        return target.classList.contains(CLS.TREE_VIEW) ?
            'TreeView' : target.classList.contains(CLS.GRID_VIEW) ?
            'GridView' : target.classList.contains(CLS.ICON_VIEW) ?
            'LargeIcon' : target.classList.contains(CLS.LARGE_ICONS) ?
            'LargeIcon' : '';
    };
    ContextMenu.prototype.getItemIndex = function (item) {
        var itemId = this.getMenuId(item);
        for (var i = 0; i < this.currentItems.length; i++) {
            if ((this.currentItems[i].id === itemId) || (this.currentItems[i].id === item)) {
                return i;
            }
        }
        return -1;
    };
    ContextMenu.prototype.disableItem = function (items) {
        if (items.length !== 0) {
            this.disabledItems = this.disabledItems.concat(items);
        }
    };
    ContextMenu.prototype.enableItems = function (items, enable, isUniqueId) {
        if (enable) {
            this.disabledItems = this.disabledItems.filter(function (item) { return items.indexOf(item) === -1; });
        }
        for (var i = 0; i < items.length; i++) {
            var validItem = this.checkValidItem(items[i]);
            if (validItem === 1) {
                this.contextMenu.enableItems([this.getMenuId(items[i])], enable, isUniqueId);
            }
            else if (validItem === 2) {
                this.contextMenu.enableItems([items[i]], enable, isUniqueId);
            }
        }
    };
    ContextMenu.prototype.setFolderItem = function (isTree) {
        this.menuType = 'folder';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.folder.map(function (item) { return item.trim(); }));
        this.contextMenu.dataBind();
        if (isTree) {
            var selectedTreeNode = select('[data-uid="' + this.navUid + '"]', this.parent.navigationpaneModule.treeObj.element);
            if (!isNOU(selectedTreeNode) &&
                this.parent.pathNames[this.parent.pathNames.length - 1] === selectedTreeNode.querySelector('.e-list-text').innerHTML && this.parent.activeModule === 'navigationpane') {
                this.disabledItems.push('Open');
            }
            else {
                var indexToRemove = this.disabledItems.indexOf('Open');
                if (indexToRemove !== -1) {
                    this.disabledItems.splice(indexToRemove, 1);
                }
            }
            if (this.parent.selectedItems.length === 0) {
                var renameIndex = this.disabledItems.indexOf('Rename');
                if (renameIndex !== -1) {
                    this.disabledItems.splice(renameIndex, 1);
                }
            }
        }
        else if (this.parent.activeModule !== 'navigationpane') {
            if (this.parent.selectedItems.length === 1) {
                var renameIndex = this.disabledItems.indexOf('Rename');
                if (renameIndex !== -1) {
                    this.disabledItems.splice(renameIndex, 1);
                }
            }
            else {
                this.disabledItems.push('Rename', 'Paste');
            }
        }
    };
    ContextMenu.prototype.setFileItem = function () {
        this.menuType = 'file';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.file.map(function (item) { return item.trim(); }));
        this.contextMenu.dataBind();
        if (this.parent.selectedItems.length === 1) {
            var renameIndex = this.disabledItems.indexOf('Rename');
            if (renameIndex !== -1) {
                this.disabledItems.splice(renameIndex, 1);
            }
        }
        else {
            this.disabledItems.push('Rename');
        }
    };
    ContextMenu.prototype.setLayoutItem = function (target) {
        this.menuType = 'layout';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.layout.map(function (item) { return item.trim(); }));
        this.contextMenu.dataBind();
        if (!this.parent.allowMultiSelection || ((this.parent.view === 'LargeIcons' &&
            (closest(target, '#' + this.parent.element.id + CLS.LARGEICON_ID).getElementsByClassName(CLS.EMPTY).length !== 0))
            || (this.parent.view === 'Details' &&
                (closest(target, '#' + this.parent.element.id + CLS.GRID_ID).getElementsByClassName(CLS.EMPTY).length !== 0)))) {
            this.disabledItems.push('SelectAll');
        }
        else {
            this.disabledItems = this.disabledItems.filter(function (item) { return item !== 'SelectAll'; });
        }
        if (this.parent.selectedNodes.length === 0) {
            if (this.disabledItems.indexOf('Paste') === -1) {
                this.disabledItems.push('Paste');
            }
        }
        this.contextMenu.dataBind();
    };
    ContextMenu.prototype.checkValidItem = function (nameEle) {
        if (!isNOU(this.currentElement)) {
            if (!isNOU(select('#' + this.getMenuId(nameEle), this.currentElement))) {
                return 1;
            }
            else if (!isNOU(select('#' + nameEle, this.currentElement))) {
                return 2;
            }
        }
        return -1;
    };
    ContextMenu.prototype.getMenuItemData = function () {
        if (this.menuType === 'layout') {
            return getPathObject(this.parent);
        }
        else {
            var args = { target: this.menuTarget };
            this.parent.notify(events.menuItemData, args);
            return this.parent.itemData[0];
        }
    };
    /* istanbul ignore next */
    ContextMenu.prototype.onSelect = function (args) {
        var _this = this;
        if (isNOU(args.item) || !args.item.id) {
            return;
        }
        var itemText = args.item.id.substr((this.parent.element.id + '_cm_').length);
        var details;
        if (itemText === 'refresh' || itemText === 'newfolder' || itemText === 'upload') {
            details = [getPathObject(this.parent)];
            this.parent.itemData = details;
        }
        else {
            this.parent.notify(events.selectedData, {});
            if (this.parent.activeModule === 'navigationpane' && itemText === 'open') {
                details = [this.menuItemData];
            }
            else {
                details = this.parent.itemData;
            }
        }
        var eventArgs = {
            cancel: false,
            element: args.element,
            fileDetails: details,
            item: args.item
        };
        this.parent.trigger('menuClick', eventArgs, function (menuClickArgs) {
            var sItems;
            if (!menuClickArgs.cancel) {
                if (itemText !== 'cut' && itemText !== 'copy') {
                    _this.isMenuItemClicked = true;
                }
                switch (itemText) {
                    case 'cut':
                        cutFiles(_this.parent);
                        break;
                    case 'copy':
                        copyFiles(_this.parent);
                        break;
                    case 'paste':
                        if (_this.menuType === 'folder') {
                            if (_this.parent.activeModule === 'navigationpane') {
                                _this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(_this.targetNodeElement, 'li'));
                                _this.parent.folderPath = _this.parent.path;
                            }
                            else {
                                _this.parent.folderPath = getFullPath(_this.parent, _this.menuItemData, _this.parent.path);
                            }
                        }
                        else {
                            _this.parent.folderPath = '';
                        }
                        pasteHandler(_this.parent);
                        break;
                    case 'delete':
                        for (var j = 0; j < details.length; j++) {
                            if (!hasEditAccess(details[j])) {
                                createDeniedDialog(_this.parent, details[j], events.permissionEdit);
                                return;
                            }
                        }
                        createDialog(_this.parent, 'Delete');
                        break;
                    /* istanbul ignore next */
                    case 'download':
                        for (var i = 0; i < details.length; i++) {
                            if (!hasDownloadAccess(details[i])) {
                                createDeniedDialog(_this.parent, details[i], events.permissionDownload);
                                return;
                            }
                        }
                        if (_this.parent.activeModule === 'navigationpane') {
                            _this.parent.notify(events.downloadInit, {});
                        }
                        else if (_this.parent.selectedItems.length > 0) {
                            Download(_this.parent, _this.parent.path, _this.parent.selectedItems);
                        }
                        break;
                    case 'rename':
                        if (!hasEditAccess(details[0])) {
                            createDeniedDialog(_this.parent, details[0], events.permissionEdit);
                        }
                        else {
                            _this.parent.notify(events.renameInit, {});
                            createDialog(_this.parent, 'Rename');
                        }
                        break;
                    case 'selectall':
                        /* istanbul ignore next */
                        _this.parent.notify(events.selectAllInit, {});
                        break;
                    case 'refresh':
                        refresh(_this.parent);
                        break;
                    case 'open':
                        if (_this.parent.visitedItem && _this.parent.activeModule !== 'navigationpane') {
                            _this.parent.notify(events.openInit, { target: _this.parent.visitedItem });
                        }
                        else if (_this.parent.activeModule === 'navigationpane') {
                            if (_this.parent.visitedItem) {
                                _this.parent.notify(events.openInit, { target: _this.parent.visitedItem });
                            }
                            _this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(_this.targetNodeElement, 'li'));
                        }
                        break;
                    case 'details':
                        _this.parent.notify(events.detailsInit, {});
                        sItems = _this.parent.selectedItems;
                        if (_this.parent.activeModule === 'navigationpane') {
                            sItems = [];
                            _this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(_this.targetNodeElement, 'li'));
                        }
                        GetDetails(_this.parent, sItems, _this.parent.path, 'details');
                        break;
                    case 'newfolder':
                        createNewFolder(_this.parent);
                        break;
                    case 'upload':
                        uploadItem(_this.parent);
                        break;
                    case 'name':
                    case 'size':
                    case 'date':
                    case 'ascending':
                    case 'descending':
                        /* istanbul ignore next */
                        sortbyClickHandler(_this.parent, args);
                        break;
                    /* istanbul ignore next */
                    case 'none':
                        /* istanbul ignore next */
                        sortbyClickHandler(_this.parent, args);
                        break;
                    /* istanbul ignore next */
                    case 'largeiconsview':
                        updateLayout(_this.parent, 'LargeIcons');
                        break;
                    /* istanbul ignore next */
                    case 'detailsview':
                        updateLayout(_this.parent, 'Details');
                        break;
                }
            }
        });
    };
    ContextMenu.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    this.contextMenu.cssClass = getCssClass(this.parent, CLS.ROOT_POPUP);
                    break;
            }
        }
    };
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.keyboardModule = new KeyboardEvents(this.contextMenu.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    ContextMenu.prototype.removeEventListener = function () {
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.keyboardModule.destroy();
    };
    ContextMenu.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'uparrow':
            case 'downarrow':
                e.preventDefault();
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextmenu';
    };
    ContextMenu.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.contextMenu.destroy();
        this.targetElement = null;
    };
    /* istanbul ignore next */
    ContextMenu.prototype.getItemData = function (data) {
        var items = [];
        for (var i = 0; i < data.length; i++) {
            var item = void 0;
            var itemId = this.getMenuId(data[i]);
            var itemText = getLocaleText(this.parent, data[i]);
            switch (data[i]) {
                case '|':
                    item = { separator: true };
                    break;
                case 'Open':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_OPEN };
                    break;
                case 'Upload':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_UPLOAD };
                    break;
                case 'Cut':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_CUT };
                    break;
                case 'Copy':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_COPY };
                    break;
                case 'Paste':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_PASTE };
                    break;
                case 'Delete':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_DELETE };
                    break;
                case 'Rename':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_RENAME };
                    break;
                case 'NewFolder':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_NEWFOLDER };
                    break;
                case 'Details':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_DETAILS };
                    break;
                case 'SortBy':
                    item = {
                        id: itemId, text: itemText, iconCss: CLS.ICON_SHORTBY,
                        items: [
                            {
                                id: this.getMenuId('Name'), text: getLocaleText(this.parent, 'Name'),
                                iconCss: this.parent.sortBy === 'name' ? CLS.TB_OPTION_DOT : null
                            },
                            {
                                id: this.getMenuId('Size'), text: getLocaleText(this.parent, 'Size'),
                                iconCss: this.parent.sortBy === 'size' ? CLS.TB_OPTION_DOT : null
                            },
                            {
                                id: this.getMenuId('Date'), text: getLocaleText(this.parent, 'DateModified'),
                                iconCss: this.parent.sortBy === '_fm_modified' ? CLS.TB_OPTION_DOT : null
                            },
                            { separator: true },
                            {
                                id: this.getMenuId('Ascending'), text: getLocaleText(this.parent, 'Ascending'),
                                iconCss: this.parent.sortOrder === 'Ascending' ? CLS.TB_OPTION_TICK : null
                            },
                            {
                                id: this.getMenuId('Descending'), text: getLocaleText(this.parent, 'Descending'),
                                iconCss: this.parent.sortOrder === 'Descending' ? CLS.TB_OPTION_TICK : null
                            },
                            {
                                id: this.getMenuId('None'), text: getLocaleText(this.parent, 'None'),
                                iconCss: this.parent.sortOrder === 'None' ? CLS.TB_OPTION_TICK : null
                            }
                        ]
                    };
                    break;
                /* istanbul ignore next */
                case 'View':
                    item = {
                        id: itemId, text: itemText, iconCss: this.parent.view === 'Details' ? CLS.ICON_GRID : CLS.ICON_LARGE,
                        items: [
                            {
                                id: this.getMenuId('largeiconsview'), text: getLocaleText(this.parent, 'View-LargeIcons'),
                                iconCss: this.parent.view === 'Details' ? null : CLS.TB_OPTION_TICK
                            },
                            {
                                id: this.getMenuId('detailsview'), text: getLocaleText(this.parent, 'View-Details'),
                                iconCss: this.parent.view === 'Details' ? CLS.TB_OPTION_TICK : null
                            }
                        ]
                    };
                    break;
                case 'Refresh':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_REFRESH };
                    break;
                case 'SelectAll':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_SELECTALL };
                    break;
                /* istanbul ignore next */
                case 'Download':
                    item = { id: itemId, text: itemText, iconCss: CLS.ICON_DOWNLOAD };
                    break;
                /* istanbul ignore next */
                default:
                    item = { id: itemId, text: itemText };
                    break;
            }
            items.push(item);
        }
        return items;
    };
    ContextMenu.prototype.getMenuId = function (id) {
        return this.parent.element.id + '_cm_' + id.split(' ').join('').toLowerCase();
    };
    return ContextMenu;
}());
export { ContextMenu };
