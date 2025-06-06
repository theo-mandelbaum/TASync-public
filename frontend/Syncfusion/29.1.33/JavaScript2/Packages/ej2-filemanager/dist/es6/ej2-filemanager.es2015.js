import { ChildProperty, Property, initializeCSPTemplate, getValue, isNullOrUndefined, matches, select, closest, createElement, setValue, detach, extend, Ajax, Fetch, remove, Internationalization, selectAll, addClass, Draggable, KeyboardEvents, EventHandler, Touch, removeClass, isVisible, Component, getUniqueID, setStyleAttribute, formatUnit, Browser, L10n, Complex, Collection, Event, NotifyPropertyChanges, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Dialog, showSpinner, hideSpinner, createSpinner } from '@syncfusion/ej2-popups';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { getUid, Grid, Resize, ContextMenu as ContextMenu$2, Sort, VirtualScroll } from '@syncfusion/ej2-grids';
import { Input, TextBox, Uploader } from '@syncfusion/ej2-inputs';
import { CheckBox, createCheckBox } from '@syncfusion/ej2-buttons';
import { ListBase } from '@syncfusion/ej2-lists';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ContextMenu as ContextMenu$1, Toolbar as Toolbar$1, TreeView } from '@syncfusion/ej2-navigations';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Ajax settings of the File Manager.
 */
class AjaxSettings extends ChildProperty {
}
__decorate([
    Property(null)
], AjaxSettings.prototype, "downloadUrl", void 0);
__decorate([
    Property(null)
], AjaxSettings.prototype, "getImageUrl", void 0);
__decorate([
    Property(null)
], AjaxSettings.prototype, "uploadUrl", void 0);
__decorate([
    Property(null)
], AjaxSettings.prototype, "url", void 0);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const defaultToolbarItems = ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download', 'Rename',
    'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
/**
 * Specifies the Toolbar settings of the FileManager.
 */
class ToolbarSettings extends ChildProperty {
}
__decorate$1([
    Property(defaultToolbarItems)
], ToolbarSettings.prototype, "items", void 0);
__decorate$1([
    Property(true)
], ToolbarSettings.prototype, "visible", void 0);
class ToolbarItem extends ChildProperty {
}
__decorate$1([
    Property('')
], ToolbarItem.prototype, "id", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "text", void 0);
__decorate$1([
    Property('auto')
], ToolbarItem.prototype, "width", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "cssClass", void 0);
__decorate$1([
    Property(false)
], ToolbarItem.prototype, "showAlwaysInPopup", void 0);
__decorate$1([
    Property(false)
], ToolbarItem.prototype, "disabled", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "prefixIcon", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "suffixIcon", void 0);
__decorate$1([
    Property(true)
], ToolbarItem.prototype, "visible", void 0);
__decorate$1([
    Property('None')
], ToolbarItem.prototype, "overflow", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "template", void 0);
__decorate$1([
    Property('Button')
], ToolbarItem.prototype, "type", void 0);
__decorate$1([
    Property('Both')
], ToolbarItem.prototype, "showTextOn", void 0);
__decorate$1([
    Property(null)
], ToolbarItem.prototype, "htmlAttributes", void 0);
__decorate$1([
    Property('')
], ToolbarItem.prototype, "tooltipText", void 0);
__decorate$1([
    Property('Left')
], ToolbarItem.prototype, "align", void 0);
__decorate$1([
    Property(-1)
], ToolbarItem.prototype, "tabIndex", void 0);
__decorate$1([
    Property()
], ToolbarItem.prototype, "name", void 0);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Search settings of the File Manager.
 */
class SearchSettings extends ChildProperty {
}
__decorate$2([
    Property(true)
], SearchSettings.prototype, "allowSearchOnTyping", void 0);
__decorate$2([
    Property('contains')
], SearchSettings.prototype, "filterType", void 0);
__decorate$2([
    Property(true)
], SearchSettings.prototype, "ignoreCase", void 0);
__decorate$2([
    Property(null)
], SearchSettings.prototype, "placeholder", void 0);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the columns in the details view of the file manager.
 */
const columnArray = [
    {
        field: 'name', headerText: 'Name', minWidth: 120,
        template: '<span class="e-fe-text">${name}</span>',
        customAttributes: { class: 'e-fe-grid-name' }
    },
    {
        field: '_fm_modified', headerText: 'DateModified', type: 'dateTime',
        format: 'MMMM dd, yyyy HH:mm', minWidth: 120, width: '190'
    },
    {
        field: 'size', headerText: 'Size', minWidth: 90, width: '110',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        template: initializeCSPTemplate(function (data) {
            return `<span class="e-fe-size">${data.size}</span>`;
        }), format: 'n2'
    }
];
/**
 * Specifies the grid settings of the File Manager.
 */
class DetailsViewSettings extends ChildProperty {
}
__decorate$3([
    Property(true)
], DetailsViewSettings.prototype, "columnResizing", void 0);
__decorate$3([
    Property(columnArray)
], DetailsViewSettings.prototype, "columns", void 0);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const fileItems = ['Open', '|', 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'];
const folderItems = ['Open', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', 'Download', '|', 'Details'];
const layoutItems = [
    'SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'
];
/**
 * Specifies the ContextMenu settings of the File Manager.
 */
class ContextMenuSettings extends ChildProperty {
}
__decorate$4([
    Property(fileItems)
], ContextMenuSettings.prototype, "file", void 0);
__decorate$4([
    Property(folderItems)
], ContextMenuSettings.prototype, "folder", void 0);
__decorate$4([
    Property(layoutItems)
], ContextMenuSettings.prototype, "layout", void 0);
__decorate$4([
    Property(true)
], ContextMenuSettings.prototype, "visible", void 0);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the navigationpane settings of the File Manager.
 */
class NavigationPaneSettings extends ChildProperty {
}
__decorate$5([
    Property('650px')
], NavigationPaneSettings.prototype, "maxWidth", void 0);
__decorate$5([
    Property('240px')
], NavigationPaneSettings.prototype, "minWidth", void 0);
__decorate$5([
    Property(true)
], NavigationPaneSettings.prototype, "visible", void 0);
__decorate$5([
    Property('None')
], NavigationPaneSettings.prototype, "sortOrder", void 0);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Ajax settings of the File Manager.
 */
class UploadSettings extends ChildProperty {
}
__decorate$6([
    Property('')
], UploadSettings.prototype, "allowedExtensions", void 0);
__decorate$6([
    Property(true)
], UploadSettings.prototype, "autoUpload", void 0);
__decorate$6([
    Property(false)
], UploadSettings.prototype, "autoClose", void 0);
__decorate$6([
    Property(false)
], UploadSettings.prototype, "directoryUpload", void 0);
__decorate$6([
    Property(0)
], UploadSettings.prototype, "minFileSize", void 0);
__decorate$6([
    Property(30000000)
], UploadSettings.prototype, "maxFileSize", void 0);
__decorate$6([
    Property(0)
], UploadSettings.prototype, "chunkSize", void 0);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Interface for a class Column
 */
/* istanbul ignore next */
class Column extends ChildProperty {
}
__decorate$7([
    Property('')
], Column.prototype, "field", void 0);
__decorate$7([
    Property('')
], Column.prototype, "headerText", void 0);
__decorate$7([
    Property('')
], Column.prototype, "width", void 0);
__decorate$7([
    Property('')
], Column.prototype, "minWidth", void 0);
__decorate$7([
    Property('')
], Column.prototype, "maxWidth", void 0);
__decorate$7([
    Property('Left')
], Column.prototype, "textAlign", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "headerTextAlign", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "type", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "format", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "template", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "sortComparer", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "headerTemplate", void 0);
__decorate$7([
    Property(true)
], Column.prototype, "allowSorting", void 0);
__decorate$7([
    Property(true)
], Column.prototype, "allowResizing", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "customAttributes", void 0);
__decorate$7([
    Property('')
], Column.prototype, "hideAtMedia", void 0);
__decorate$7([
    Property(null)
], Column.prototype, "customFormat", void 0);
__decorate$7([
    Property(false)
], Column.prototype, "isPrimaryKey", void 0);

/**
 * Specifies the File Manager internal ID's
 */
/** @hidden */
const TOOLBAR_ID = '_toolbar';
/** @hidden */
const LAYOUT_ID = '_layout';
/** @hidden */
const NAVIGATION_ID = '_navigation';
/** @hidden */
const TREE_ID = '_tree';
/** @hidden */
const GRID_ID = '_grid';
/** @hidden */
const LARGEICON_ID = '_largeicons';
/** @hidden */
const DIALOG_ID = '_dialog';
/** @hidden */
const ALT_DIALOG_ID = '_alt_dialog';
/** @hidden */
const IMG_DIALOG_ID = '_img_dialog';
/** @hidden */
const EXTN_DIALOG_ID = '_extn_dialog';
/** @hidden */
const UPLOAD_DIALOG_ID = '_upload_dialog';
/** @hidden */
const RETRY_DIALOG_ID = '_retry_dialog';
/** @hidden */
const CONTEXT_MENU_ID = '_contextmenu';
/** @hidden */
const SORTBY_ID = '_sortby';
/** @hidden */
const VIEW_ID = '_view';
/** @hidden */
const SPLITTER_ID = '_splitter';
/** @hidden */
const CONTENT_ID = '_content';
/** @hidden */
const BREADCRUMBBAR_ID = '_breadcrumbbar';
/** @hidden */
const UPLOAD_ID = '_upload';
/** @hidden */
const RETRY_ID = '_retry';
/** @hidden */
const SEARCH_ID = '_search';
/**
 * Specifies the File Manager internal class names
 */
/** @hidden */
const ROOT = 'e-filemanager';
/** @hidden */
const CONTROL = 'e-control';
/** @hidden */
const CHECK_SELECT = 'e-fe-cb-select';
/** @hidden */
const ROOT_POPUP = 'e-fe-popup';
/** @hidden */
const MOBILE = 'e-fe-mobile';
/** @hidden */
const MOB_POPUP = 'e-fe-popup e-fe-mobile';
/** @hidden */
const MULTI_SELECT = 'e-fe-m-select';
/** @hidden */
const FILTER = 'e-fe-m-filter';
/** @hidden */
const LAYOUT = 'e-layout';
/** @hidden */
const NAVIGATION = 'e-navigation';
/** @hidden */
const LAYOUT_CONTENT = 'e-layout-content';
/** @hidden */
const LARGE_ICONS = 'e-large-icons';
/** @hidden */
const TB_ITEM = 'e-toolbar-item';
/** @hidden */
const LIST_ITEM = 'e-list-item';
/** @hidden */
const LIST_TEXT = 'e-list-text';
/** @hidden */
const LIST_PARENT = 'e-list-parent';
/** @hidden */
const TB_OPTION_TICK = 'e-icons e-fe-tick';
/** @hidden */
const TB_OPTION_DOT = 'e-icons e-fe-dot';
/** @hidden */
const BLUR = 'e-blur';
/** @hidden */
const ACTIVE = 'e-active';
/** @hidden */
const HOVER = 'e-hover';
/** @hidden */
const FOCUS = 'e-focus';
/** @hidden */
const FOCUSED = 'e-focused';
/** @hidden */
const CHECK = 'e-check';
/** @hidden */
const FRAME = 'e-frame';
/** @hidden */
const CB_WRAP = 'e-checkbox-wrapper';
/** @hidden */
const ROW = 'e-row';
/** @hidden */
const ROWCELL = 'e-rowcell';
/** @hidden */
const EMPTY = 'e-empty';
/** @hidden */
const EMPTY_CONTENT = 'e-empty-content';
/** @hidden */
const EMPTY_INNER_CONTENT = 'e-empty-inner-content';
/** @hidden */
const CLONE = 'e-fe-clone';
/** @hidden */
const DROP_FOLDER = 'e-fe-drop-folder';
/** @hidden */
const DROP_FILE = 'e-fe-drop-file';
/** @hidden */
const FOLDER = 'e-fe-folder';
/** @hidden */
const ICON_IMAGE = 'e-fe-image';
/** @hidden */
const ICON_MUSIC = 'e-fe-music';
/** @hidden */
const ICON_VIDEO = 'e-fe-video';
/** @hidden */
const LARGE_ICON = 'e-large-icon';
/** @hidden */
const LARGE_EMPTY_FOLDER = 'e-empty-icon e-fe-folder';
/** @hidden */
const LARGE_EMPTY_FOLDER_TWO = 'e-empty-icon.e-fe-folder';
/** @hidden */
const LARGE_ICON_FOLDER = 'e-fe-folder';
/** @hidden */
const SELECTED_ITEMS = 'e-items';
/** @hidden */
const TEXT_CONTENT = 'e-text-content';
/** @hidden */
const GRID_HEADER = 'e-gridheader';
/** @hidden */
const TEMPLATE_CELL = 'e-templatecell';
/** @hidden */
const TREE_VIEW = 'e-treeview';
/** @hidden */
const MENU_ITEM = 'e-menu-item';
/** @hidden */
const MENU_ICON = 'e-menu-icon';
/** @hidden */
const SUBMENU_ICON = 'e-caret';
/** @hidden */
const GRID_VIEW = 'e-content';
/** @hidden */
const GRID_CONTENT = 'e-gridcontent';
/** @hidden */
const ICON_VIEW = 'e-list-parent';
/** @hidden */
const ICON_OPEN = 'e-icons e-fe-open';
/** @hidden */
const ICON_UPLOAD = 'e-icons e-fe-upload';
/** @hidden */
const ICON_CUT = 'e-icons e-fe-cut';
/** @hidden */
const ICON_COPY = 'e-icons e-fe-copy';
/** @hidden */
const ICON_PASTE = 'e-icons e-fe-paste';
/** @hidden */
const ICON_DELETE = 'e-icons e-fe-delete';
/** @hidden */
const ICON_RENAME = 'e-icons e-fe-rename';
/** @hidden */
const ICON_NEWFOLDER = 'e-icons e-fe-newfolder';
/** @hidden */
const ICON_DETAILS = 'e-icons e-fe-details';
/** @hidden */
const ICON_SHORTBY = 'e-icons e-fe-sort';
/** @hidden */
const ICON_REFRESH = 'e-icons e-fe-refresh';
/** @hidden */
const ICON_SELECTALL = 'e-icons e-fe-select';
/** @hidden */
const ICON_DOWNLOAD = 'e-icons e-fe-download';
/** @hidden */
const ICON_OPTIONS = 'e-icons e-fe-options';
/** @hidden */
const ICON_GRID = 'e-icons e-fe-grid';
/** @hidden */
const ICON_LARGE = 'e-icons e-fe-large';
/** @hidden */
const ICON_BREADCRUMB = 'e-icons e-fe-breadcrumb';
/** @hidden */
const ICON_CLEAR = 'e-icons e-fe-clear';
/** @hidden */
const ICON_DROP_IN = 'e-icons e-fe-drop-in';
/** @hidden */
const ICON_DROP_OUT = 'e-icons e-fe-drop-out';
/** @hidden */
const ICON_NO_DROP = 'e-icons e-fe-no-drop';
/** @hidden */
const ICONS = 'e-icons';
/** @hidden */
const DETAILS_LABEL = 'e-detailslabel';
/** @hidden */
const ERROR_CONTENT = 'e-fe-errorcontent';
/** @hidden */
const STATUS = 'e-status';
/** @hidden */
const BREADCRUMBS = 'e-address';
/** @hidden */
const RTL = 'e-rtl';
/** @hidden */
const DISPLAY_NONE = 'e-display-none';
/** @hidden */
const COLLAPSED = 'e-node-collapsed';
/** @hidden */
const FULLROW = 'e-fullrow';
/** @hidden */
const ICON_COLLAPSIBLE = 'e-icon-collapsible';
/** @hidden */
const SPLIT_BAR = 'e-split-bar';
/** @hidden */
const HEADER_CHECK = 'e-headercheck';
/** @hidden */
const OVERLAY = 'e-fe-overlay';
/** @hidden */
const VALUE = 'e-fe-value';

/**
 * Specifies the File Manager internal variables
 */
/** @hidden */
const isFile = 'isFile';
/**
 * Specifies the File Manager internal events
 */
/** @hidden */
const modelChanged = 'model-changed';
/** @hidden */
const initialEnd = 'initial-end';
/** @hidden */
const finalizeEnd = 'finalize-end';
/** @hidden */
const createEnd = 'create-end';
/** @hidden */
const filterEnd = 'filter-end';
/** @hidden */
const beforeDelete = 'before-delete';
/** @hidden */
const pathDrag = 'path-drag';
/** @hidden */
const deleteInit = 'delete-init';
/** @hidden */
const deleteEnd = 'delete-end';
/** @hidden */
const refreshEnd = 'refresh-end';
/** @hidden */
const resizeEnd = 'resize-end';
/** @hidden */
const splitterResize = 'splitter-resize';
/** @hidden */
const pathChanged = 'path-changed';
/** @hidden */
const destroy = 'destroy';
/** @hidden */
const beforeRequest = 'before-request';
/** @hidden */
const upload = 'upload';
/** @hidden */
const skipUpload = 'skip-upload';
/** @hidden */
const afterRequest = 'after-request';
/** @hidden */
const download = 'download';
/** @hidden */
const layoutRefresh = 'layout-refresh';
/** @hidden */
const actionFailure = 'actionFailure';
/** @hidden */
const search = 'search';
/** @hidden */
const openInit = 'open-init';
/** @hidden */
const openEnd = 'open-end';
/** @hidden */
const selectionChanged = 'selection-changed';
/** @hidden */
const selectAllInit = 'select-all-init';
/** @hidden */
const clearAllInit = 'clear-all-init';
/** @hidden */
const clearPathInit = 'clear-path-init';
/** @hidden */
const layoutChange = 'layout-change';
/** @hidden */
const sortByChange = 'sort-by-change';
/** @hidden */
const nodeExpand = 'node-expand';
/** @hidden */
const detailsInit = 'details-init';
/** @hidden */
const menuItemData = 'menu-item-data';
/** @hidden */
const renameInit = 'rename-init';
/** @hidden */
const renameEndParent = 'rename-end-parent';
/** @hidden */
const renameEnd = 'rename-end';
/** @hidden */
const showPaste = 'show-paste';
/** @hidden */
const hidePaste = 'hide-paste';
/** @hidden */
const selectedData = 'selected-data';
/** @hidden */
const cutCopyInit = 'cut-copy-init';
/** @hidden */
const pasteInit = 'paste-init';
/** @hidden */
const pasteEnd = 'paste-end';
/** @hidden */
const cutEnd = 'cut-end';
/** @hidden */
const hideLayout = 'hide-layout';
/** @hidden */
const updateTreeSelection = 'update-tree-selection';
/** @hidden */
const treeSelect = 'select-node';
/** @hidden */
const sortColumn = 'sort-column';
/** @hidden */
const pathColumn = 'path-column';
/** @hidden */
const searchTextChange = 'search-change';
/** @hidden */
const beforeDownload = 'before-download';
/** @hidden */
const downloadInit = 'download-init';
/** @hidden */
const dropInit = 'drop-init';
/** @hidden */
const dragEnd = 'drag-end';
/** @hidden */
const dropPath = 'drop-path';
/** @hidden */
const dragHelper = 'drag-helper';
/** @hidden */
const dragging = 'dragging';
/** @hidden */
const updateSelectionData = 'update-selection-data';
/** @hidden */
const methodCall = 'method-call';
/** @hidden */
const permissionRead = 'read';
/** @hidden */
const permissionEdit = 'write';
/** @hidden */
const permissionEditContents = 'writeContents';
/** @hidden */
const permissionCopy = 'copy';
/** @hidden */
const permissionUpload = 'upload';
/** @hidden */
const permissionDownload = 'download';

/**
 * Utility function to compare two strings in a way similar to Windows Explorer.
 * Files and folders are sorted separately, with folders coming before files.
 *
 * @param {string} reference - The first string to compare. This could be a file or folder name.
 * @param {string} comparer - The second string to compare. This could be a file or folder name.
 * @returns {number} - A negative number if `reference` should come before `comparer`, a positive number if `comparer` should come before `reference`, and 0 if they are considered equal.
 */
function sortComparer(reference, comparer) {
    // Check if reference and comparer are files or folders
    const referenceIsFile = /\.\S+/.test(reference);
    const comparerIsFile = /\.\S+/.test(comparer);
    // If one is a file and the other is a folder, the folder should come first
    if (referenceIsFile && !comparerIsFile) {
        return 1;
    }
    if (!referenceIsFile && comparerIsFile) {
        return -1;
    }
    const referenceParts = [];
    const comparerParts = [];
    (reference + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { referenceParts.push([$1 || Infinity, $2 || '']); return ''; });
    (comparer + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { comparerParts.push([$1 || Infinity, $2 || '']); return ''; });
    // Compare each part of reference and comparer
    while (referenceParts.length && comparerParts.length) {
        const referencePart = referenceParts.shift();
        const comparerPart = comparerParts.shift();
        if (referencePart && comparerPart) {
            const comparisonResult = referencePart[0] - comparerPart[0] ||
                referencePart[1].localeCompare(comparerPart[1]);
            if (comparisonResult) {
                return comparisonResult;
            }
        }
    }
    return referenceParts.length - comparerParts.length;
}
/**
 * Utility file for common actions
 *
 * @param {HTMLLIElement} node - specifies the node.
 * @param {Object} data - specifies the data.
 * @param {IFileManager} instance - specifies the control instance.
 * @returns {void}
 * @private
 */
function updatePath(node, data, instance) {
    const text = getValue('name', data);
    const id = node.getAttribute('data-id');
    const newText = isNullOrUndefined(id) ? text : id;
    instance.setProperties({ path: getPath(node, newText, instance.hasId) }, true);
    instance.pathId = getPathId(node);
    instance.pathNames = getPathNames(node, text);
}
/**
 * Functions for get path in FileManager
 *
 * @param {Element | Node} element - specifies the element.
 * @param {string} text - specifies the text.
 * @param {boolean} hasId - specifies the id.
 * @returns {string} returns the path.
 * @private
 */
function getPath(element, text, hasId) {
    const matched = getParents(element, text, false, hasId);
    let path = '/';
    const len = matched.length - (2);
    for (let i = len; i >= 0; i--) {
        path += matched[i] + '/';
    }
    return path;
}
/**
 * Functions for get path id in FileManager
 *
 * @param {Element} node - specifies the node element.
 * @returns {string[]} returns the path ids.
 * @private
 */
function getPathId(node) {
    const matched = getParents(node, node.getAttribute('data-uid'), true);
    const ids = [];
    for (let i = matched.length - 1; i >= 0; i--) {
        ids.push(matched[i]);
    }
    return ids;
}
/**
 * Functions for get path names in FileManager
 *
 * @param {Element} element - specifies the node element.
 * @param {string} text - specifies the text.
 * @returns {string[]} returns the path names.
 * @private
 */
function getPathNames(element, text) {
    const matched = getParents(element, text, false);
    const names = [];
    for (let i = matched.length - 1; i >= 0; i--) {
        names.push(matched[i]);
    }
    return names;
}
/**
 * Functions for get path id in FileManager
 *
 * @param {Element} element - specifies the node element.
 * @param {string} text - specifies the text.
 * @param {boolean} isId - specifies the id.
 * @param {boolean} hasId - checks the id exists.
 * @returns {string[]} returns parent element.
 * @private
 */
function getParents(element, text, isId, hasId) {
    const matched = [text];
    let el = element.parentNode;
    while (!isNullOrUndefined(el)) {
        if (matches(el, '.' + LIST_ITEM)) {
            const parentText = isId ? el.getAttribute('data-uid') : (hasId ? el.getAttribute('data-id') :
                select('.' + LIST_TEXT, el).textContent);
            matched.push(parentText);
        }
        el = el.parentNode;
        if (el.classList.contains(TREE_VIEW)) {
            break;
        }
    }
    return matched;
}
/**
 * Functions for generate path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function generatePath(parent) {
    const key = parent.hasId ? 'id' : 'name';
    let newPath = '/';
    let i = 1;
    for (i; i < parent.pathId.length; i++) {
        const data = getValue(parent.pathId[parseInt(i.toString(), 10)], parent.feParent);
        newPath += getValue(key, data) + '/';
    }
    parent.setProperties({ path: newPath }, true);
}
/**
 * Functions for remove active element
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function removeActive(parent) {
    if (parent.isCut) {
        removeBlur(parent);
        parent.selectedNodes = [];
        parent.actionRecords = [];
        parent.enablePaste = false;
        parent.notify(hidePaste, {});
    }
}
/**
 * Selects active element in File Manager
 *
 * @param {string} action - specifies the action.
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {boolean} - returns active element.
 * @private
 */
function activeElement(action, parent) {
    parent.isSearchCut = false;
    parent.actionRecords = [];
    parent.activeElements = [];
    parent.notify(cutCopyInit, {});
    if (parent.activeElements.length === 0) {
        return false;
    }
    removeBlur(parent);
    const blurEle = parent.activeElements;
    if (parent.activeModule !== 'navigationpane') {
        parent.targetPath = parent.path;
    }
    else {
        parent.targetPath = getParentPath(parent.path);
    }
    let i = 0;
    if (blurEle) {
        getModule(parent, blurEle[0]);
        if (action === 'cut') {
            while (i < blurEle.length) {
                addBlur(blurEle[i]);
                i++;
            }
        }
    }
    i = 0;
    parent.selectedNodes = [];
    parent.enablePaste = true;
    parent.notify(showPaste, {});
    while (i < parent.activeRecords.length) {
        parent.actionRecords.push(parent.activeRecords[i]);
        parent.selectedNodes.push(getValue('name', parent.activeRecords[i]));
        i++;
    }
    if ((parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) &&
        parent.activeModule !== 'navigationpane') {
        parent.selectedNodes = [];
        parent.isSearchCut = true;
        let i = 0;
        while (i < parent.selectedItems.length) {
            parent.selectedNodes.push(parent.selectedItems[i]);
            i++;
        }
    }
    return true;
}
/**
 * Adds blur to the elements
 *
 * @param {Element} nodes - specifies the nodes.
 * @returns {void}
 * @private
 */
function addBlur(nodes) {
    nodes.classList.add(BLUR);
}
/**
 * Removes blur from elements
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} hover - specifies the hover string.
 * @returns {void}
 * @private
 */
function removeBlur(parent, hover) {
    const blurEle = (!hover) ? parent.element.querySelectorAll('.' + BLUR) :
        parent.element.querySelectorAll('.' + HOVER);
    let i = 0;
    while (i < blurEle.length) {
        blurEle[i].classList.remove((!hover) ? BLUR : HOVER);
        i++;
    }
}
/**
 * Gets module name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Element} element - specifies the element.
 * @returns {void}
 * @private
 */
function getModule(parent, element) {
    if (element) {
        if (element.classList.contains(ROW)) {
            parent.activeModule = 'detailsview';
        }
        else if (closest(element, '.' + LARGE_ICON)) {
            parent.activeModule = 'largeiconsview';
        }
        else {
            parent.activeModule = 'navigationpane';
        }
    }
}
/**
 * Get all child items
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string | number} parentId - specifies the parent ID.
 * @returns {Object[]} An array of child items
 * @private
 */
function getAllChildItems(parent, parentId) {
    const children = parent.fileSystemData.filter((item) => String(item.parentId) === String(parentId));
    let allChildren = [...children];
    children.forEach((child) => {
        const childId = child.id;
        allChildren = allChildren.concat(getAllChildItems(parent, childId));
    });
    return allChildren;
}
/**
 * Gets module name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} value - specifies the value.
 * @param {boolean} isLayoutChange - specifies the layout change.
 * @returns {void}
 * @private
 */
function searchWordHandler(parent, value, isLayoutChange) {
    let searchWord;
    if (value.length === 0 && !parent.isFiltered) {
        parent.notify(pathColumn, { args: parent });
    }
    if (isFileSystemData(parent)) {
        if (value === '') {
            parent.itemData = parent.fileSystemData;
            read(parent, isLayoutChange ? layoutChange : search, parent.path);
        }
        else {
            parent.searchSettings.filterType = isNullOrUndefined(parent.searchSettings.filterType) ? 'contains' : parent.searchSettings.filterType;
            const currData = getValue(parent.pathId[parent.pathId.length - 1], parent.feParent);
            const parentId = getValue('id', currData);
            const filteredData = getAllChildItems(parent, parentId);
            const data = new DataManager(filteredData).
                executeLocal(new Query().where('name', parent.searchSettings.filterType, value, parent.searchSettings.ignoreCase));
            const searchValue = parent.searchSettings.ignoreCase ? value.toLowerCase() : value;
            parent.itemData = data;
            Search(parent, isLayoutChange ? layoutChange : search, parent.path, searchValue, parent.showHiddenItems, !parent.searchSettings.ignoreCase);
        }
        return;
    }
    if (parent.searchSettings.filterType === 'startsWith') {
        searchWord = value + '*';
    }
    else if (parent.searchSettings.filterType === 'endsWith') {
        searchWord = '*' + value;
    }
    else {
        searchWord = '*' + value + '*';
    }
    parent.searchWord = searchWord;
    parent.itemData = [getPathObject(parent)];
    if (value.length > 0) {
        const caseSensitive = parent.searchSettings.ignoreCase;
        const hiddenItems = parent.showHiddenItems;
        Search(parent, isLayoutChange ? layoutChange : search, parent.path, searchWord, hiddenItems, !caseSensitive);
    }
    else {
        if (!parent.isFiltered) {
            if (parent.isSortByClicked) {
                parent.notify(layoutChange, { files: (parent.oldView === 'Details') ? parent.detailsviewModule.gridObj.dataSource : parent.largeiconsviewModule.allItems });
                parent.isSortByClicked = false;
            }
            else {
                read(parent, isLayoutChange ? layoutChange : search, parent.path);
            }
        }
        else {
            filter(parent, layoutChange);
        }
    }
}
/**
 * Gets updated layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} view - specifies the view.
 * @returns {void}
 * @private
 */
function updateLayout(parent, view) {
    parent.oldView = parent.view;
    parent.setProperties({ view: view }, true);
    if (parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) {
        parent.layoutSelectedItems = parent.selectedItems;
    }
    let searchWord = '';
    if (parent.breadcrumbbarModule.searchObj.element.value) {
        searchWord = parent.breadcrumbbarModule.searchObj.element.value;
    }
    parent.isLayoutChange = true;
    searchWordHandler(parent, searchWord, true);
}
/* istanbul ignore next */
/**
 * Gets updated layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Element} element - specifies the element.
 * @returns {void}
 * @private
 */
function getTargetModule(parent, element) {
    let tartgetModule = '';
    if (element) {
        if (closest(element, '.' + ROOT + '.' + CONTROL + ' .' + GRID_CONTENT)) {
            tartgetModule = 'detailsview';
        }
        else if (closest(element, '.' + LARGE_ICONS)) {
            tartgetModule = 'largeiconsview';
        }
        else if (element.classList.contains('e-fullrow') ||
            element.classList.contains('e-icon-expandable')) {
            tartgetModule = 'navigationpane';
        }
        else if (closest(element, '.e-address-list-item')) {
            tartgetModule = 'breadcrumbbar';
        }
        else {
            tartgetModule = '';
        }
    }
    parent.targetModule = tartgetModule;
}
/* istanbul ignore next */
/**
 * refresh the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function refresh(parent) {
    parent.itemData = [getPathObject(parent)];
    if (!hasReadAccess(parent.itemData[0])) {
        createDeniedDialog(parent, parent.itemData[0], permissionRead);
    }
    else {
        read(parent, refreshEnd, parent.path);
    }
}
/**
 * open action in the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function openAction(parent) {
    read(parent, openEnd, parent.path);
}
/**
 * open action in the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {Object} - returns the path data.
 * @private
 */
function getPathObject(parent) {
    return getValue(parent.pathId[parent.pathId.length - 1], parent.feParent);
}
/**
 * Copy files
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function copyFiles(parent) {
    if (!activeElement('copy', parent)) {
        return;
    }
    else {
        parent.fileAction = 'copy';
    }
}
/**
 * Cut files
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function cutFiles(parent) {
    if (!activeElement('cut', parent)) {
        return;
    }
    else {
        parent.isCut = true;
        parent.fileAction = 'move';
    }
}
/**
 * To add class for fileType
 *
 * @param {Object} file - specifies the file.
 * @returns {string} - returns the file type.
 * @private
 */
function fileType(file) {
    const isFile = getValue('isFile', file);
    if (!isFile) {
        return FOLDER;
    }
    const imageFormat = ['bmp', 'dib', 'jpg', 'jpeg', 'jpe', 'jfif', 'gif', 'tif', 'tiff', 'png', 'ico'];
    const audioFormat = ['mp3', 'wav', 'aac', 'ogg', 'wma', 'aif', 'fla', 'm4a'];
    const videoFormat = ['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'avi', 'wmv', 'mp4', '3gp'];
    const knownFormat = ['css', 'exe', 'html', 'js', 'msi', 'pdf', 'pptx', 'ppt', 'rar', 'zip', 'txt', 'docx', 'doc',
        'xlsx', 'xls', 'xml', 'rtf', 'php'];
    let filetype = getValue('type', file);
    filetype = filetype.toLowerCase();
    if (filetype.indexOf('.') !== -1) {
        filetype = filetype.split('.').join('');
    }
    let iconType;
    if (imageFormat.indexOf(filetype) !== -1) {
        iconType = ICON_IMAGE;
    }
    else if (audioFormat.indexOf(filetype) !== -1) {
        iconType = ICON_MUSIC;
    }
    else if (videoFormat.indexOf(filetype) !== -1) {
        iconType = ICON_VIDEO;
    }
    else if (knownFormat.indexOf(filetype) !== -1) {
        iconType = 'e-fe-' + filetype;
    }
    else {
        iconType = 'e-fe-unknown e-fe-' + filetype;
    }
    return iconType;
}
/* istanbul ignore next */
/**
 * To get the image URL
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} item - specifies the item.
 * @returns {string} - returns the image url.
 * @private
 */
function getImageUrl(parent, item) {
    let imgUrl = isFileSystemData(parent) ? getValue('imageUrl', item) : '';
    if (isFileSystemData(parent)) {
        const eventArgs = {
            fileDetails: [item],
            imageUrl: imgUrl
        };
        parent.trigger('beforeImageLoad', eventArgs);
        return eventArgs.imageUrl;
    }
    const baseUrl = parent.ajaxSettings.getImageUrl ? parent.ajaxSettings.getImageUrl : parent.ajaxSettings.url;
    const pathUrl = (baseUrl.indexOf('?') !== -1) ? '&path=' : '?path=';
    const fileName = encodeURIComponent(getValue('name', item));
    const fPath = getValue('filterPath', item);
    if (parent.hasId) {
        const imgId = getValue('id', item);
        imgUrl = baseUrl + pathUrl + parent.path + '&id=' + imgId;
    }
    else if (!isNullOrUndefined(fPath)) {
        imgUrl = baseUrl + pathUrl + encodeURIComponent(fPath.replace(/\\/g, '/')) + fileName;
    }
    else {
        imgUrl = baseUrl + pathUrl + parent.path + fileName;
    }
    imgUrl = imgUrl + '&time=' + (new Date().getTime()).toString();
    const eventArgs = {
        fileDetails: [item],
        imageUrl: imgUrl
    };
    parent.trigger('beforeImageLoad', eventArgs);
    return eventArgs.imageUrl;
}
/* istanbul ignore next */
/**
 * Gets the full path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {string} path - specifies the path.
 * @returns {string} - returns the image url.
 * @private
 */
function getFullPath(parent, data, path) {
    const filePath = getValue(parent.hasId ? 'id' : 'name', data) + '/';
    const fPath = getValue(parent.hasId ? 'filterId' : 'filterPath', data);
    if (!isNullOrUndefined(fPath)) {
        return fPath.replace(/\\/g, '/').replace(/^.*?(?=\/)/, '') + filePath;
    }
    else {
        return path + filePath;
    }
}
/**
 * Gets the name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @returns {string} - returns the name.
 * @private
 */
function getName(parent, data) {
    let name = getValue('name', data);
    let fPath = getValue('filterPath', data);
    if ((parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) && !isNullOrUndefined(fPath)) {
        fPath = fPath.replace(/\\/g, '/');
        name = fPath.replace(parent.path, '') + name;
    }
    return name;
}
/**
 * Gets the name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object[]} items - specifies the item elements.
 * @returns {Object[]} - returns the sorted data.
 * @private
 */
function getSortedData(parent, items) {
    if (items.length === 0) {
        return items;
    }
    let query;
    if (parent.sortOrder !== 'None' && !isNullOrUndefined(parent.sortOrder)) {
        query = new Query().sortBy(parent.sortBy, parent.sortOrder.toLowerCase(), true).group('isFile');
    }
    else {
        query = new Query().group('isFile');
    }
    const lists = new DataManager(items).executeLocal(query);
    return getValue('records', lists);
}
/**
 * Gets the data object
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} key - specifies the key.
 * @param {string} value - specifies the value.
 * @returns {Object} - returns the sorted data.
 * @private
 */
function getObject(parent, key, value) {
    const currFiles = getValue(parent.pathId[parent.pathId.length - 1], parent.feFiles);
    const result = currFiles.filter((data) => data[key].toString() === value);
    return result.length > 0 ? result[0] : null;
}
/**
 * Creates empty element
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLElement} element - specifies the element.
 * @param {ReadArgs | SearchArgs} args - specifies the args.
 * @returns {void}
 * @private
 */
function createEmptyElement(parent, element, args) {
    let top;
    const layoutElement = select('#' + parent.element.id + LAYOUT_ID, parent.element);
    const addressBarHeight = select('#' + parent.element.id + BREADCRUMBBAR_ID, layoutElement).offsetHeight;
    top = layoutElement.offsetHeight - addressBarHeight;
    if (parent.view === 'Details') {
        top = top - select('.' + GRID_HEADER, layoutElement).offsetHeight;
    }
    if (isNullOrUndefined(element.querySelector('.' + EMPTY))) {
        const emptyDiv = createElement('div', { className: EMPTY });
        const emptyFolder = createElement('div', { className: LARGE_EMPTY_FOLDER });
        const emptyEle = createElement('div', { className: EMPTY_CONTENT });
        const dragFile = createElement('div', { className: EMPTY_INNER_CONTENT });
        if (parent.view === 'Details') {
            element.querySelector('.' + GRID_VIEW).appendChild(emptyDiv);
        }
        else {
            element.appendChild(emptyDiv);
        }
        emptyDiv.appendChild(emptyFolder);
        emptyDiv.appendChild(emptyEle);
        emptyDiv.appendChild(dragFile);
    }
    if (element.querySelector('.' + EMPTY)) {
        if (!isNullOrUndefined(args.error)) {
            element.querySelector('.' + EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Access-Denied');
            element.querySelector('.' + EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Access-Details');
        }
        else if (parent.isFiltered) {
            element.querySelector('.' + EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Filter-Empty');
            element.querySelector('.' + EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Filter-Key');
        }
        else if (parent.breadcrumbbarModule.searchObj.element.value !== '') {
            element.querySelector('.' + EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Search-Empty');
            element.querySelector('.' + EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Search-Key');
        }
        else {
            element.querySelector('.' + EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Folder-Empty');
            element.querySelector('.' + EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'File-Upload');
        }
    }
    const eDiv = select('.' + EMPTY, element);
    top = (top - eDiv.offsetHeight) / 2;
    eDiv.style.marginTop = top + 'px';
}
/**
 * Gets the directories
 *
 * @param {Object[]} files - specifies the file object.
 * @returns {Object[]} - returns the sorted data.
 * @private
 */
function getDirectories(files) {
    return new DataManager(files).executeLocal(new Query().where(isFile, 'equal', false, false));
}
/**
 * set the Node ID
 *
 * @param {ReadArgs} result - specifies the result.
 * @param {string} rootId - specifies the rootId.
 * @returns {void}
 * @private
 */
function setNodeId(result, rootId) {
    const dirs = getDirectories(result.files);
    for (let i = 0, len = dirs.length; i < len; i++) {
        setValue('_fm_id', rootId + '_' + i, dirs[i]);
    }
}
/**
 * set the date object
 *
 * @param {Object[]} args - specifies the file object.
 * @returns {void}
 * @private
 */
function setDateObject(args) {
    for (let i = 0; i < args.length; i++) {
        const createdDate = new Date(getValue('dateCreated', args[i]));
        const modifiedDate = new Date(getValue('dateModified', args[i]));
        setValue('_fm_created', createdDate, args[i]);
        setValue('_fm_modified', modifiedDate, args[i]);
    }
}
/**
 * get the locale text
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} text - specifies the text.
 * @returns {string} - returns the locale text.
 * @private
 */
function getLocaleText(parent, text) {
    const locale = parent.localeObj.getConstant(text);
    return (locale === '') ? text : locale;
}
/**
 * get the CSS class
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} css - specifies the css.
 * @returns {string} - returns the css classes.
 * @private
 */
function getCssClass(parent, css) {
    let cssClass = parent.cssClass;
    cssClass = (isNullOrUndefined(cssClass) || cssClass === '') ? css : (cssClass + ' ' + css);
    return cssClass;
}
/**
 * sort on click
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {MenuEventArgs} args - specifies the menu event arguements.
 * @returns {void}
 * @private
 */
function sortbyClickHandler(parent, args) {
    let tick;
    parent.isSortByClicked = true;
    if (args.item.id.indexOf('ascending') !== -1 || args.item.id.indexOf('descending') !== -1 || args.item.id.indexOf('none') !== -1) {
        tick = true;
    }
    else {
        tick = false;
    }
    if (!tick) {
        parent.sortBy = getSortField(args.item.id, parent);
    }
    else {
        parent.sortOrder = getSortField(args.item.id);
    }
    parent.itemData = [getPathObject(parent)];
    if (parent.view === 'Details') {
        if (parent.isMobile) {
            updateLayout(parent, 'Details');
        }
        else {
            parent.notify(sortColumn, { module: 'detailsview' });
            parent.isSortByClicked = false;
        }
    }
    if (parent.view === 'LargeIcons') {
        updateLayout(parent, 'LargeIcons');
    }
    parent.notify(sortByChange, {});
}
/**
 * Gets the sorted fields
 *
 * @param {string} id - specifies the id.
 * @param {IFileManager} [parent] - optional parameter representing the parent IFileManager.
 * @returns {string} - returns the sorted fields
 * @private
 */
function getSortField(id, parent) {
    const text = id.substring(id.lastIndexOf('_') + 1);
    let field = text;
    let column;
    if (parent) {
        column = parent.detailsViewSettings.columns;
    }
    switch (text) {
        case 'date':
            for (let i = 0, len = column.length; i < len; i++) {
                if (column[i].field === 'dateModified' || column[i].field === 'dateCreated') {
                    field = column[i].field;
                    break;
                }
                else {
                    field = '_fm_modified';
                }
            }
            break;
        case 'ascending':
            field = 'Ascending';
            break;
        case 'descending':
            field = 'Descending';
            break;
        case 'none':
            field = 'None';
            break;
    }
    return field;
}
/**
 * Sets the next path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
function setNextPath(parent, path) {
    const currfolders = path.split('/');
    const folders = parent.originalPath.split('/');
    const root = getValue(parent.pathId[0], parent.feParent);
    const key = isNullOrUndefined(getValue('id', root)) ? 'name' : 'id';
    for (let i = currfolders.length - 1, len = folders.length - 1; i < len; i++) {
        const eventName = (folders[i + 1] === '') ? finalizeEnd : initialEnd;
        const newPath = (folders[i] === '') ? '/' : (parent.path + folders[i] + '/');
        const data = getObject(parent, key, folders[parseInt(i.toString(), 10)]);
        if (!isNullOrUndefined(data)) {
            const id = getValue('_fm_id', data);
            parent.setProperties({ path: newPath }, true);
            parent.pathId.push(id);
            parent.itemData = [data];
            parent.pathNames.push(getValue('name', data));
        }
        else {
            parent.originalPath = newPath;
        }
        read(parent, eventName, parent.path);
        break;
    }
}
/**
 * Opens the searched folder
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data
 * @returns {void}
 * @private
 */
function openSearchFolder(parent, data) {
    parent.originalPath = getFullPath(parent, data, parent.path);
    const root = getValue(parent.pathId[0], parent.feParent);
    const navData = parent.feParent[getValue('_fm_id', parent.itemData[0])];
    const isRoot = isNullOrUndefined(navData) || getValue('_fm_id', navData) === 'fe_tree';
    const key = isNullOrUndefined(getValue('id', root)) ? 'name' : 'id';
    const searchData = getObject(parent, key, isFileSystemData(parent) ? getValue('id', data) : getValue('name', data));
    if (isNullOrUndefined(searchData)) {
        if (!isRoot) {
            parent.notify(clearPathInit, { selectedNode: parent.pathId[parent.pathId.length - 1] });
        }
        else {
            setNextPath(parent, parent.path);
            return;
        }
    }
    else {
        const id = getValue('_fm_id', searchData);
        parent.setProperties({ path: parent.originalPath }, true);
        parent.pathId.push(id);
        parent.itemData = [searchData];
        parent.pathNames.push(getValue('name', searchData));
    }
    read(parent, (parent.path !== parent.originalPath) ? initialEnd : finalizeEnd, parent.path);
}
/**
 * Paste handling function
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function pasteHandler(parent) {
    parent.isDragDrop = false;
    if (parent.selectedNodes.length !== 0 && parent.enablePaste) {
        const path = (parent.folderPath === '') ? parent.path : parent.folderPath;
        if (parent.activeModule === 'navigationpane' && !parent.selectedNodes[0].includes('/')) {
            parent.targetPath = getTargetPath(parent, parent.actionRecords[0]);
        }
        const subFolder = validateSubFolder(parent, parent.actionRecords, path, parent.path);
        if (!subFolder) {
            if ((parent.fileAction === 'move' && parent.targetPath !== path) || parent.fileAction === 'copy') {
                parent.notify(pasteInit, {});
                paste(parent, parent.targetPath, parent.selectedNodes, path, parent.fileAction, [], parent.actionRecords);
            }
            else {
                parent.enablePaste = false;
                parent.notify(hidePaste, {});
                removeBlur(parent);
                const result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Same-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
            }
        }
    }
}
/**
 * Validates the sub folders
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {'{ [key: string]: Object; }[]'} data - specifies the data.
 * @param {string} dropPath - specifies the drop path.
 * @param {string} dragPath - specifies the drag path.
 * @returns {boolean} - returns the validated sub folder.
 * @private
 */
function validateSubFolder(parent, data, dropPath, dragPath) {
    let subFolder = false;
    for (let i = 0; i < data.length; i++) {
        if (!getValue('isFile', data[i])) {
            const tempTarget = getFullPath(parent, data[i], dragPath);
            if (dropPath.indexOf(tempTarget) === 0) {
                const result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Sub-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
                subFolder = true;
                break;
            }
        }
        else {
            const name = parent.dragData[i] ? parent.dragData[i].name : null;
            const srcData = isFileSystemData(parent) ? name : parent.dragNodes[i];
            let len = 0;
            if (srcData) {
                len = srcData.lastIndexOf('/');
            }
            let path = '';
            if (len > 0) {
                path = dragPath + srcData.substring(0, len + 1);
            }
            if (path === dropPath) {
                const result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Same-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
                subFolder = true;
                break;
            }
        }
    }
    return subFolder;
}
/**
 * Validates the drop handler
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function dropHandler(parent) {
    parent.isDragDrop = true;
    if (parent.dragData.length !== 0) {
        parent.dragPath = parent.dragPath.replace(/\\/g, '/');
        parent.dropPath = parent.dropPath.replace(/\\/g, '/');
        const subFolder = validateSubFolder(parent, parent.dragData, parent.dropPath, parent.dragPath);
        if (!subFolder && (parent.dragPath !== parent.dropPath)) {
            parent.itemData = [parent.dropData];
            paste(parent, parent.dragPath, parent.dragNodes, parent.dropPath, 'move', [], parent.dragData);
            parent.notify(pasteInit, {});
        }
    }
}
/**
 * Gets the parent path
 *
 * @param {string} oldPath - specifies the old path.
 * @returns {string} - returns the parent path.
 * @private
 */
function getParentPath(oldPath) {
    const path = oldPath.split('/');
    let newPath = path[0] + '/';
    for (let i = 1; i < path.length - 2; i++) {
        newPath += path[i] + '/';
    }
    return newPath;
}
/**
 * Gets the directory path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {ReadArgs} args - returns the read arguements.
 * @returns {string} - returns the directory path
 * @private
 */
function getDirectoryPath(parent, args) {
    const filePath = getValue(parent.hasId ? 'id' : 'name', args.cwd) + '/';
    const fPath = getValue(parent.hasId && !isNullOrUndefined(parent.ajaxSettings.url) ? 'filterId' : 'filterPath', args.cwd);
    if (!isNullOrUndefined(fPath)) {
        if (fPath === '') {
            return '/';
        }
        return fPath.replace(/\\/g, '/').replace(/^.*?(?=\/)/, '') + filePath;
    }
    else {
        return isFileSystemData(parent) ? filePath : parent.path + filePath;
    }
}
/**
 * Gets the do paste path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} operation - specifies the operations.
 * @param {ReadArgs} result - returns the result.
 * @returns {void}
 * @private
 */
function doPasteUpdate(parent, operation, result) {
    if (operation === 'move') {
        if (!parent.isDragDrop) {
            parent.enablePaste = false;
            parent.notify(hidePaste, {});
            parent.notify(cutEnd, result);
        }
        else {
            parent.notify(dragEnd, result);
        }
    }
    if (parent.duplicateItems.length === 0) {
        parent.pasteNodes = [];
    }
    const flag = false;
    for (let count = 0; (count < result.files.length) && !flag; count++) {
        parent.pasteNodes.push(result.files[count][parent.hasId ? 'id' : 'name']);
        if (parent.isDragDrop) {
            parent.droppedObjects.push(result.files[count]);
        }
    }
    parent.duplicateItems = [];
    parent.duplicateRecords = [];
    if (parent.isDragDrop && !parent.isPasteError) {
        parent.isDropEnd = true;
    }
    else {
        parent.isDropEnd = false;
    }
    parent.trigger('success', { action: operation, result: result });
    if (!parent.isDragDrop || (parent.path === parent.dragPath) || (parent.path === parent.dropPath)
        || parent.isSearchDrag) {
        parent.isPathDrag = false;
        read(parent, pasteEnd, parent.path);
    }
    else {
        readDropPath(parent);
    }
}
/**
 * Reads the drop path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function readDropPath(parent) {
    let pathId = getValue('_fm_id', parent.dropData);
    parent.expandedId = pathId;
    parent.itemData = [parent.dropData];
    if (parent.isPathDrag) {
        parent.notify(pathDrag, parent.itemData);
    }
    else {
        if (parent.navigationpaneModule) {
            let node = select('[data-uid="' + pathId + '"]', parent.navigationpaneModule.treeObj.element);
            if (!node) {
                const liElement = document.querySelector('[data-id = "' + getValue('id', parent.dropData) + '"]');
                pathId = liElement.getAttribute('data-uid');
                node = select('[data-uid="' + pathId + '"]', parent.navigationpaneModule.treeObj.element);
            }
            updatePath(node, parent.dropData, parent);
        }
        read(parent, dropPath, parent.dropPath);
    }
}
/**
 * Gets the duplicated path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} name - specifies the name.
 * @returns {object} - returns the duplicated path.
 * @private
 */
function getDuplicateData(parent, name) {
    let data = null;
    const records = parent.isDragDrop ? parent.dragData : parent.actionRecords;
    for (let i = 0; i < records.length; i++) {
        if (getValue('name', records[i]) === name) {
            data = records[i];
            break;
        }
    }
    return data;
}
/**
 * Gets the create the virtual drag element
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function createVirtualDragElement(parent) {
    parent.isSearchDrag = false;
    if (parent.breadcrumbbarModule.searchObj.element.value !== '') {
        parent.isSearchDrag = true;
    }
    if (parent.activeModule !== 'navigationpane') {
        parent.dragNodes = [];
        let i = 0;
        while (i < parent.selectedItems.length) {
            parent.dragNodes.push(parent.selectedItems[i]);
            i++;
        }
        if (parent.selectedItems.length === 0 && parent.dragData && parent.dragData.length === 1) {
            parent.dragNodes.push(getItemName(parent, parent.dragData[0]));
        }
    }
    const cloneIcon = parent.createElement('div', {
        className: 'e-fe-icon ' + fileType(parent.dragData[0])
    });
    const cloneName = parent.createElement('div', {
        className: 'e-fe-name',
        innerHTML: parent.dragData[0].name
    });
    const virtualEle = parent.createElement('div', {
        className: 'e-fe-content'
    });
    virtualEle.appendChild(cloneIcon);
    virtualEle.appendChild(cloneName);
    const ele = parent.createElement('div', {
        className: CLONE
    });
    ele.appendChild(virtualEle);
    if (parent.dragNodes.length > 1) {
        const badge = parent.createElement('span', {
            className: 'e-fe-count',
            innerHTML: (parent.dragNodes.length).toString(10)
        });
        ele.appendChild(badge);
    }
    parent.virtualDragElement = ele;
    parent.element.appendChild(parent.virtualDragElement);
}
/**
 * Drops the stop handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {DragEventArgs} args - specifies the drag event arguements.
 * @returns {void}
 * @private
 */
function dragStopHandler(parent, args) {
    const dragArgs = args;
    dragArgs.cancel = false;
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeDropTarget(parent);
    parent.element.classList.remove('e-fe-drop', 'e-no-drop');
    removeBlur(parent);
    parent.uploadObj.dropArea = select('#' + parent.element.id + CONTENT_ID, parent.element);
    const virtualEle = select('.' + CLONE, parent.element);
    if (virtualEle) {
        detach(virtualEle);
    }
    getTargetModule(parent, args.target);
    parent.notify(dropInit, args);
    removeBlur(parent, 'hover');
    dragArgs.fileDetails = parent.dragData;
    parent.trigger('fileDragStop', dragArgs, (dragArgs) => {
        if (!dragArgs.cancel && !isNullOrUndefined(parent.targetModule) && parent.targetModule !== '' && parent.dragCount > 2) {
            dropHandler(parent);
        }
        parent.dragCount = 0;
    });
}
/**
 * Drag the start handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {'DragEventArgs'} args - specifies the drag event arguements.
 * @param {Draggable} dragObj - specifies the drag event arguements.
 * @returns {void}
 * @private
 */
function dragStartHandler(parent, args, dragObj) {
    const dragArgs = args;
    dragArgs.cancel = false;
    dragArgs.fileDetails = parent.dragData;
    parent.dragCount = 0;
    parent.droppedObjects = [];
    if (!parent.allowDragAndDrop || ((parent.activeModule === 'navigationpane') &&
        (closest(args.element, 'li').getAttribute('data-uid') === parent.pathId[0]))) {
        dragArgs.cancel = true;
    }
    if ((parent.activeModule === 'navigationpane') &&
        (parent.pathId.indexOf(closest(args.element, 'li').getAttribute('data-uid')) !== -1)) {
        parent.isPathDrag = true;
    }
    else {
        parent.isPathDrag = false;
    }
    removeBlur(parent);
    if (dragArgs.cancel) {
        dragObj.intDestroy(args.event);
        dragCancel(parent);
    }
    else if (!dragArgs.cancel) {
        let i = 0;
        while (i < parent.activeElements.length) {
            addBlur(parent.activeElements[i]);
            i++;
        }
        parent.trigger('fileDragStart', dragArgs, (dragArgs) => {
            if (dragArgs.cancel) {
                dragObj.intDestroy(args.event);
                dragCancel(parent);
            }
            else {
                parent.uploadObj.dropArea = null;
            }
        });
    }
}
/**
 * Drag the cancel handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function dragCancel(parent) {
    removeBlur(parent);
    const virtualEle = select('.' + CLONE, parent.element);
    if (virtualEle) {
        detach(virtualEle);
    }
}
/**
 * Remove drop target handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function removeDropTarget(parent) {
    removeItemClass(parent, DROP_FOLDER);
    removeItemClass(parent, DROP_FILE);
}
/**
 * Remove item class handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} value - specifies the value.
 * @returns {void}
 * @private
 */
function removeItemClass(parent, value) {
    const ele = parent.element.querySelectorAll('.' + value);
    for (let i = 0; i < ele.length; i++) {
        ele[i].classList.remove(value);
    }
}
/**
 * Remove item class handler
 *
 * @param {Element} scrollParent - specifies the scrolling target.
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} nodeClass - specifies the node class.
 * @param {number} clientY - specifies the vertical (Y) coordinate of the mouse cursor position relative to the target element.
 * @returns {void}
 * @private
 */
function scrollHandler(scrollParent, parent, nodeClass, clientY) {
    let position;
    const elementData = scrollParent.getBoundingClientRect();
    const node = select('.' + nodeClass, scrollParent);
    if ((clientY >= (elementData.top + scrollParent.clientHeight - 30)) && !isNullOrUndefined(node)) {
        position = (parent.targetModule === 'navigationpane' || parent.targetModule === 'detailsview') ? node.offsetHeight / 2.5 : node.offsetHeight / 4.5;
        scrollParent.scrollBy(0, position);
    }
    if (!isNullOrUndefined(node) && (clientY <= (elementData.top + 30))) {
        position = (parent.targetModule === 'navigationpane' || parent.targetModule === 'detailsview') ? node.offsetHeight / 2.5 : node.offsetHeight / 4.5;
        scrollParent.scrollBy(0, -position);
    }
}
/**
 * Dragging handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {DragEventArgs} args - specifies the arguements.
 * @returns {void}
 * @private
 */
function draggingHandler(parent, args) {
    const dragArgs = args;
    dragArgs.fileDetails = parent.dragData;
    let canDrop = false;
    getTargetModule(parent, args.target);
    removeDropTarget(parent);
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeBlur(parent, 'hover');
    let node = null;
    let scrollParent;
    if (parent.targetModule === 'navigationpane') {
        node = closest(args.target, 'li');
        node.classList.add(HOVER, DROP_FOLDER);
        canDrop = true;
        /* istanbul ignore next */
        parent.treeExpandTimer = window.setTimeout(() => { parent.notify(dragging, args); }, 800);
        scrollParent = parent.navigationpaneModule.treeObj.element.parentElement;
        scrollHandler(scrollParent, parent, 'e-level-2', args.event.y);
    }
    else if (parent.targetModule === 'detailsview') {
        node = closest(args.target, 'tr');
        if (node && node.querySelector('.' + FOLDER) && !node.classList.contains(BLUR)) {
            node.classList.add(DROP_FOLDER);
        }
        else if (node && !node.querySelector('.' + FOLDER) && !node.classList.contains(BLUR)) {
            node.classList.add(DROP_FILE);
        }
        canDrop = true;
        scrollParent = parent.detailsviewModule.gridObj.element.querySelector('.e-content');
        scrollHandler(scrollParent, parent, 'e-row', args.event.y);
    }
    else if (parent.targetModule === 'largeiconsview') {
        node = closest(args.target, 'li');
        if (node && node.querySelector('.' + FOLDER) && !node.classList.contains(BLUR)) {
            node.classList.add(HOVER, DROP_FOLDER);
        }
        canDrop = true;
        scrollParent = parent.largeiconsviewModule.element.firstElementChild;
        scrollHandler(scrollParent, parent, 'e-large-icon', args.event.y);
        /* istanbul ignore next */
    }
    else if (parent.targetModule === 'breadcrumbbar') {
        canDrop = true;
    }
    parent.element.classList.remove('e-fe-drop', 'e-no-drop');
    parent.element.classList.add(canDrop ? 'e-fe-drop' : 'e-no-drop');
    parent.dragCount = parent.dragCount + 1;
    parent.trigger('fileDragging', dragArgs);
}
/**
 * Object to string handler
 *
 * @param {Object} data - specifies the data.
 * @returns {string} returns string converted from Object.
 * @private
 */
// Ignored the message key value in permission object
function objectToString(data) {
    let str = '';
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'message') {
            str += (i === 0 ? '' : ', ') + keys[i] + ': ' + getValue(keys[i], data);
        }
    }
    return str;
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @returns {string} returns the item name.
 * @private
 */
function getItemName(parent, data) {
    if (parent.hasId) {
        return getValue('id', data);
    }
    return getName(parent, data);
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @returns {void}
 * @private
 */
function updateRenamingData(parent, data) {
    parent.itemData = [data];
    parent.currentItemText = getValue('name', data);
    parent.isFile = getValue('isFile', data);
    parent.filterPath = getValue('filterPath', data);
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function doRename(parent) {
    if (!hasEditAccess(parent.itemData[0])) {
        createDeniedDialog(parent, parent.itemData[0], permissionEdit);
    }
    else {
        createDialog(parent, 'Rename');
    }
}
/* istanbul ignore next */
/**
 * Download handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function doDownload(parent) {
    const items = parent.itemData;
    for (let i = 0; i < items.length; i++) {
        if (!hasDownloadAccess(items[i])) {
            createDeniedDialog(parent, items[i], permissionDownload);
            return;
        }
    }
    if (parent.selectedItems.length > 0) {
        Download(parent, parent.path, parent.selectedItems);
    }
}
/**
 * Delete Files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} data - specifies the data.
 * @param {string[]} newIds - specifies the new Ids.
 * @returns {void}
 * @private
 */
function doDeleteFiles(parent, data, newIds) {
    for (let i = 0; i < data.length; i++) {
        if (!hasEditAccess(data[i])) {
            createDeniedDialog(parent, data[i], permissionEdit);
            return;
        }
    }
    parent.itemData = data;
    Delete(parent, newIds, parent.path, 'delete');
}
/* istanbul ignore next */
/**
 * Download files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} data - specifies the data.
 * @param {string[]} newIds - specifies the new Ids.
 * @returns {void}
 * @private
 */
function doDownloadFiles(parent, data, newIds) {
    for (let i = 0; i < data.length; i++) {
        if (!hasDownloadAccess(data[i])) {
            createDeniedDialog(parent, data[i], permissionDownload);
            return;
        }
    }
    parent.itemData = data;
    if (newIds.length > 0) {
        Download(parent, parent.path, newIds);
    }
}
/**
 * Download files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @param {string} action - specifies the actions.
 * @returns {void}
 * @private
 */
function createDeniedDialog(parent, data, action) {
    let message = getValue('message', getValue('permission', data));
    if (message === '') {
        message = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', data)).replace('{1}', action);
    }
    const response = {
        error: {
            code: '401',
            fileExists: null,
            message: message
        }
    };
    createDialog(parent, 'Error', response);
}
/**
 * Get Access Classes
 *
 * @param {Object} data - specifies the data.
 * @returns {string} - returns accesses classes.
 * @private
 */
function getAccessClass(data) {
    return !hasReadAccess(data) ? 'e-fe-locked e-fe-hidden' : 'e-fe-locked';
}
/**
 * Check read access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns read access.
 * @private
 */
function hasReadAccess(data) {
    const permission = getValue('permission', data);
    return (permission && !getValue('read', permission)) ? false : true;
}
/**
 * Check edit access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns edit access.
 * @private
 */
function hasEditAccess(data) {
    const permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('write', permission))) : true;
}
/**
 * Check content access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns content access.
 * @private
 */
function hasContentAccess(data) {
    const permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('writeContents', permission))) : true;
}
/**
 * Check upload access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns upload access.
 * @private
 */
function hasUploadAccess(data) {
    const permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('upload', permission))) : true;
}
/**
 * Check download access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns download access.
 * @private
 */
function hasDownloadAccess(data) {
    const permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('download', permission))) : true;
}
/**
 * Create new folder handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function createNewFolder(parent) {
    const details = parent.itemData[0];
    if (!hasContentAccess(details)) {
        createDeniedDialog(parent, details, permissionEditContents);
    }
    else {
        createDialog(parent, 'NewFolder');
    }
}
/**
 * Upload item handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function uploadItem(parent) {
    const details = parent.itemData[0];
    if (!hasUploadAccess(details)) {
        createDeniedDialog(parent, details, permissionUpload);
    }
    else {
        const eleId = '#' + parent.element.id + UPLOAD_ID;
        const uploadEle = document.querySelector(eleId);
        uploadEle.click();
    }
}
/**
 * Close dialog popup handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
function closePopup(parent) {
    if (!isNullOrUndefined(parent.dialogObj)) {
        parent.dialogObj.hide();
    }
}
/**
 * Get target path from item data.
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} itemData - specifies the item elements.
 * @returns {string} returns the path.
 * @private
 */
function getTargetPath(parent, itemData) {
    if (parent.hasId && !isNullOrUndefined(getValue('filterId', itemData))) {
        return getValue('filterId', itemData).replace(/\\/g, '/').replace(/^[^/]+\//, '/');
    }
    else {
        return getValue('filterPath', itemData).replace(/\\/g, '/');
    }
}
/**
 * Access control handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} itemData - specifies the item elements.
 * @param {string} action - specifies the action.
 * @param {boolean} isPathPermision - specifies the path permission.
 * @returns {string} returns the path.
 * @private
 */
function getAccessDetails(parent, itemData, action, isPathPermision) {
    let accessMessage = '';
    for (let i = 0; i < itemData.length; i++) {
        let permission = getValue('permission', itemData[i]);
        if (permission == null) {
            permission = undefined;
        }
        if (isPathPermision) {
            if (permission && (!getValue('read', permission) || !getValue('writeContents', permission))) {
                accessMessage = getValue('message', getValue('permission', itemData[i]));
                if (accessMessage === '') {
                    accessMessage = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', itemData[i])).replace('{1}', 'writeContents');
                }
            }
        }
        else {
            const copyOrMovePermission = action === 'copy' ? getValue('copy', permission) : getValue('write', permission);
            if (permission && (!getValue('read', permission) || !copyOrMovePermission)) {
                accessMessage = getValue('message', getValue('permission', itemData[i]));
                if (accessMessage === '') {
                    accessMessage = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', itemData[i])).replace('{1}', action);
                }
            }
        }
        if (accessMessage !== '') {
            parent.responseData = {
                cwd: null,
                details: null,
                error: {
                    code: '401',
                    message: accessMessage,
                    fileExists: null
                },
                files: null
            };
            break;
        }
    }
    return accessMessage;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Function to read the content from given path in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} event - specifies the event.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
function read(parent, event, path) {
    const itemData = parent.itemData;
    for (let i = 0; i < itemData.length; i++) {
        if (isNullOrUndefined(getValue('hasChild', itemData[i]))) {
            setValue('hasChild', false, itemData[i]);
        }
    }
    const data = { action: 'read', path: path, showHiddenItems: parent.showHiddenItems, data: itemData };
    createAjax(parent, data, readSuccess, event);
}
/**
 * Function to create new folder in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
function createFolder(parent, itemName) {
    const data = { action: 'create', path: parent.path, name: itemName, data: parent.itemData };
    createAjax(parent, data, createSuccess, itemName);
}
/**
 * Function to filter the files in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string}  event - specifies the event.
 * @returns {void}
 * @private
 */
function filter(parent, event) {
    const data = { action: 'filter', path: parent.path, showHiddenItems: parent.showHiddenItems, data: [getPathObject(parent)] };
    let filterData;
    const filterDataVal = parent.filterData ? extend(filterData, data, parent.filterData) : data;
    createAjax(parent, filterDataVal, filterSuccess, event, getValue('action', filterDataVal));
}
/**
 * Function to rename the folder/file in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string} itemNewName - specifies the item's new name.
 * @returns {void}
 * @private
 */
function rename(parent, path, itemNewName) {
    let name;
    let newName;
    if (parent.breadcrumbbarModule.searchObj.element.value === '' && !parent.isFiltered) {
        name = parent.currentItemText;
        newName = itemNewName;
    }
    else {
        let fPath = parent.filterPath;
        if (parent.hasId) {
            name = parent.currentItemText;
            newName = itemNewName;
        }
        else {
            fPath = fPath.replace(/\\/g, '/');
            name = fPath.replace(path, '') + parent.currentItemText;
            newName = fPath.replace(path, '') + itemNewName;
        }
    }
    const data = {
        action: 'rename', path: path, name: name, newName: newName, data: parent.itemData, showFileExtension: parent.showFileExtension
    };
    createAjax(parent, data, renameSuccess, path);
}
/**
 * Function to paste file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string[]} names - specifies the names.
 * @param {string} targetPath - specifies the target path.
 * @param {string} pasteOperation - specifies the paste operation.
 * @param {string[]} renameItems - specifies the rename items.
 * @param {Object[]} actionRecords - specifies the action records.
 * @returns {void}
 * @private
 */
function paste(parent, path, names, targetPath, pasteOperation, renameItems, actionRecords) {
    const data = {
        action: pasteOperation, path: path, targetData: parent.itemData[0],
        targetPath: targetPath, names: names, renameFiles: renameItems, data: actionRecords
    };
    parent.destinationPath = targetPath;
    createAjax(parent, data, pasteSuccess, path, pasteOperation, targetPath);
}
/**
 * Function to delete file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string[]} items - specifies the items.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
function Delete(parent, items, path, operation) {
    const data = { action: operation, path: path, names: items, data: parent.itemData };
    createAjax(parent, data, deleteSuccess, path);
}
/* istanbul ignore next */
/**
 * Function to get details of file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string[]} names - specifies the names.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation data.
 * @returns {void}
 * @private
 */
function GetDetails(parent, names, path, operation) {
    const data = { action: operation, path: path, names: names, data: parent.itemData };
    createAjax(parent, data, detailsSuccess, path, operation);
}
/**
 * Checks whether fileSystemData is enabled.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {boolean} - returns the boolean value.
 */
function isFileSystemData(parent) {
    const isFileSystemData = parent.fileSystemData.length >= 0 && isNullOrUndefined(parent.ajaxSettings.url);
    return isFileSystemData;
}
/**
 * Function to check whether file already exist or not.
 *
 * @param {Record<string, any>} fileSystemData - specifies the file data.
 * @param {string} name - specifies the name.
 * @returns {boolean} - returns the boolean value.
 * @private
 */
function isFileExists(fileSystemData, name) {
    const isExists = fileSystemData.some((item) => item.name === name);
    return isExists;
}
/**
 * Function to find the index value of a file or folder.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number} id - specifies the id.
 * @returns {number} - returns the index value.
 * @private
 */
function findIndexById(parent, id) {
    const index = parent.fileSystemData.findIndex((item) => !isNullOrUndefined(item) && String(item.id) === String(id));
    return index;
}
/**
 * Function to get the entire data of a file or folder using id value.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number | string} id - specifies the id.
 * @returns {Object} - returns the data.
 * @private
 */
function filterById(parent, id) {
    const data = parent.fileSystemData.filter((item) => String(item.id) === String(id))[0];
    return data;
}
/**
 * Function to get the entire data of a file or folder for a parent.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number | string} parentId - specifies the parent id.
 * @returns {Object[]} - returns the data.
 * @private
 */
function filterByParent(parent, parentId) {
    const data = parent.fileSystemData.filter((item) => String(item.parentId) === String(parentId));
    return data;
}
/**
 * Function to create a new copied file or folder.
 *
 * @param {Record<string, any>} data - specifies the file or folder data.
 * @param {Record<string, any>} target - specifies the target data.
 * @param {string} itemName - specifies the item name.
 * @param {boolean} isCopy - specifies the copy operation.
 * @returns {Record<string, Object>} - returns the data.
 * @private
 */
function createNewItem(data, target, itemName, isCopy) {
    const newItem = {};
    //Construct the new folder details.
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            newItem[key] = null;
        }
    }
    const currentDate = new Date();
    const folderPath = String(target.id) !== String(0) && !isNullOrUndefined(target.parentId) ? target.filterPath + target.name + '\\' : '\\';
    Object.assign(newItem, {
        dateCreated: currentDate,
        dateModified: currentDate,
        filterPath: folderPath,
        hasChild: isCopy ? data.hasChild : false,
        id: getUid(itemName === null ? data.name : itemName),
        isFile: isCopy ? data.isFile : false,
        name: itemName === null ? data.name : itemName,
        parentId: target.id,
        size: isCopy ? data.size : 0,
        type: isCopy ? data.type : ''
    });
    return newItem;
}
/**
 * Function to create an error response.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} message - specifies the error message.
 * @param {string} code - specifies the error code.
 * @param {Object[]} fileName - specifies the file name.
 * @returns {void}
 * @private
 */
function createErrorObject(parent, message, code, fileName) {
    parent.responseData = {
        cwd: null,
        details: null,
        error: {
            code: code,
            message: message,
            fileExists: fileName != null ? fileName : null
        },
        files: null
    };
}
/**
 * Function to trigger folder creation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerFolderCreation(parent, data, eventArgs) {
    const createEventArgs = {
        folderName: getValue('name', data),
        cancel: false,
        path: getValue('path', data),
        parentFolder: getValue('data', data)
    };
    parent.trigger('beforeFolderCreate', createEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            if (!isFileExists(parent.fileSystemData, args.folderName)) {
                const data = args.parentFolder[0];
                const newObject = createNewItem(data, data, args.folderName, false);
                parent.fileSystemData.push(newObject);
            }
            else {
                const message = 'A file or folder with the name ' + args.folderName + ' already exists.';
                createErrorObject(parent, message, '400', null);
            }
        }
    });
}
/**
 * Function to trigger delete operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerDeleteOperation(parent, data, eventArgs) {
    const deleteEventArgs = {
        cancel: false,
        itemData: getValue('data', data),
        path: getValue('path', data)
    };
    parent.trigger('beforeDelete', deleteEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            args.itemData.forEach((itemData) => {
                const index = findIndexById(parent, itemData.id);
                if (index !== -1) {
                    parent.fileSystemData.splice(index, 1);
                }
                if (!itemData.isFile) {
                    const subItems = parent.fileSystemData.filter(function (obj) { return obj.filterPath.includes(itemData.name); });
                    subItems.forEach((subItem) => {
                        const index = findIndexById(parent, subItem.id);
                        if (index !== -1) {
                            parent.fileSystemData.splice(index, 1);
                        }
                    });
                }
            });
        }
    });
}
/**
 * Function to trigger rename operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerRenameOperation(parent, data, eventArgs) {
    const renameEventArgs = {
        cancel: false,
        newName: getValue('newName', data),
        itemData: getValue('data', data),
        path: getValue('path', data)
    };
    parent.trigger('beforeRename', renameEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            if (!isFileExists(parent.fileSystemData, args.newName)) {
                const fileData = filterById(parent, args.itemData[0].id);
                const oldName = fileData.name;
                fileData.name = args.newName;
                updateChildrenFilterPath(parent, fileData.id, oldName, args.newName);
            }
            else {
                const message = 'Cannot rename' + args.itemData[0].name + 'to' + args.newName + ': destination already exists.';
                createErrorObject(parent, message, '400', null);
            }
        }
    });
}
/**
 * Function to update child item filter path.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string | number} parentId - specifies the parent id.
 * @param {string} oldName - specifies the previous name.
 * @param {string} newName - specifies the new name.
 * @returns {void}
 * @private
 */
function updateChildrenFilterPath(parent, parentId, oldName, newName) {
    parent.fileSystemData.forEach((item) => {
        if (String(item.parentId) === String(parentId)) {
            const oldPath = item.filterPath;
            const newPath = oldPath.replace(oldName + '\\', newName + '\\');
            item.filterPath = newPath;
            updateChildrenFilterPath(parent, item.id, oldName, newName);
        }
    });
}
/**
 * Function to trigger move or copy operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerMoveOrCopyOperation(parent, data, eventArgs) {
    const moveEventArgs = {
        cancel: false,
        itemData: getValue('data', data),
        isCopy: getValue('action', data) === 'copy' ? true : false,
        path: getValue('path', data),
        targetData: getValue('targetData', data),
        targetPath: getValue('targetPath', data)
    };
    parent.trigger('beforeMove', moveEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            const message = 'File Already Exists';
            const action = getValue('action', data);
            const itemPermission = getAccessDetails(parent, args.itemData, action, false);
            const pathPermission = getAccessDetails(parent, [args.targetData], action, true);
            const file = [];
            parent.pasteNodes = [];
            if (itemPermission === '' && pathPermission === '') {
                if (args.isCopy) {
                    const folderSubItems = filterByParent(parent, args.targetData.id);
                    const copiedFolders = args.itemData;
                    copiedFolders.forEach((itemData) => {
                        if (!isFileExists(folderSubItems, itemData.name) || getValue('renameFiles', data).length > 0) {
                            if (getValue('renameFiles', data).length > 0) {
                                const names = itemData.name.split('.');
                                const name = itemData.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                                copyFolderItems(parent, itemData, args.targetData, name);
                                parent.responseData.error = null;
                                parent.existingFileCount++;
                                return;
                            }
                            copyFolderItems(parent, itemData, args.targetData, null);
                        }
                        else {
                            file.push(itemData.name);
                        }
                    });
                    if (file.length > 0) {
                        createErrorObject(parent, message, '400', file);
                    }
                    return;
                }
                let target = args.targetData;
                const getTargetFiles = filterByParent(parent, target.id);
                for (let i = 0; i < args.itemData.length; i++) {
                    const currItem = args.itemData[i];
                    if (!isFileExists(getTargetFiles, currItem.name) || getValue('renameFiles', data).length > 0) {
                        if (!target.hasChild) {
                            target.hasChild = !currItem.isFile;
                            const targetItem = parent.fileSystemData
                                .filter((item) => String(item.id) === String(target.id));
                            if (targetItem.length > 0) {
                                targetItem[0].hasChild = target.hasChild;
                            }
                        }
                        if (!currItem.isFile) {
                            //Check whether the source folder include other sub folders or not.
                            const subItems = currItem.parentId !== 0
                                ? filterByParent(parent, currItem.parentId) : [];
                            const itemData = filterById(parent, currItem.parentId);
                            itemData.hasChild = subItems.length > 1 ? true : false;
                        }
                        const fileData = filterById(parent, currItem.id);
                        if (getValue('renameFiles', data).length > 0) {
                            const names = currItem.name.split('.');
                            currItem.name = currItem.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                            fileData.name = currItem.name;
                            parent.responseData.error = null;
                            parent.existingFileCount++;
                            parent.dropData = target;
                            parent.dropPath = args.path;
                            const pathArray = args.targetPath.replace(/^\/|\/$/g, '').split('/');
                            target = filterById(parent, pathArray[pathArray.length - 1]);
                        }
                        fileData.parentId = target.id;
                        fileData.filterPath = target.id === 0 ? '\\' : target.filterPath + target.name + '\\';
                    }
                    else {
                        file.push(currItem.name);
                    }
                }
                if (file.length > 0) {
                    createErrorObject(parent, message, '400', file);
                }
            }
        }
    });
}
/**
 * Function to trigger search operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerSearchOperation(parent, data, eventArgs) {
    const searchEventArgs = {
        searchResults: getValue('data', data),
        cancel: false,
        path: getValue('path', data),
        searchText: getValue('searchString', data),
        caseSensitive: getValue('caseSensitive', data),
        showHiddenItems: getValue('showHiddenItems', data)
    };
    parent.trigger('search', searchEventArgs, function (args) {
        setValue('data', args.searchResults, data);
        if (args.cancel) {
            eventArgs.cancel = true;
        }
    });
}
/**
 * Function to trigger client side events.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerClientEvents(parent, data, eventArgs) {
    switch (getValue('action', data)) {
        case 'create': {
            triggerFolderCreation(parent, data, eventArgs);
            break;
        }
        case 'delete': {
            triggerDeleteOperation(parent, data, eventArgs);
            break;
        }
        case 'rename': {
            triggerRenameOperation(parent, data, eventArgs);
            break;
        }
        case 'move':
        case 'copy': {
            triggerMoveOrCopyOperation(parent, data, eventArgs);
            break;
        }
        case 'search': {
            triggerSearchOperation(parent, data, eventArgs);
            break;
        }
    }
}
/**
 * Creates an AJAX request for the file manager.
 *
 * @param {IFileManager} parent - The parent file manager instance.
 * @param {Object} data - The data object for the AJAX request.
 * @param {Function} fn - The callback function to be executed after the AJAX request.
 * @param {string} [event] - The event type for the AJAX request.
 * @param {string} [operation] - The operation type for the AJAX request.
 * @param {string} [targetPath] - The target path for the AJAX request.
 * @returns {void}
 * @private
 */
function createAjax(parent, data, fn, event, operation, targetPath) {
    const ajaxSettings = {
        url: parent.ajaxSettings.url,
        type: 'POST',
        mode: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        onSuccess: null,
        onFailure: null,
        beforeSend: null
    };
    const eventArgs = { action: getValue('action', data), ajaxSettings: ajaxSettings, cancel: false };
    triggerClientEvents(parent, data, eventArgs);
    parent.trigger('beforeSend', eventArgs, (beforeSendArgs) => {
        if (!beforeSendArgs.cancel) {
            parent.notify(beforeRequest, {});
            if (isFileSystemData(parent)) {
                const filePath = event === 'node-expand' || event === 'finalize-end' || event === 'rename-end-parent'
                    ? getValue('path', data) : parent.path;
                const pathArray = filePath.replace(/^\/|\/$/g, '').split('/');
                const idValue = event === 'rename-end-parent' || (event === 'path-changed' && getValue('data', data).length !== 0 && isNullOrUndefined(parent.renamedItem))
                    ? getValue('data', data)[0].id : pathArray[pathArray.length - 1];
                const action = getValue('action', data);
                const isFileOperation = (action === 'move' || action === 'rename' || action === 'copy' || action === 'delete' || action === 'search') && event !== 'rename-end';
                if (action === 'read' || action === 'create' || event === 'rename-end') {
                    const rootId = parent.fileSystemData
                        .filter((item) => isNullOrUndefined(item.parentId))
                        .length > 0
                        ? parent.fileSystemData
                            .filter((item) => isNullOrUndefined(item.parentId))[0].id
                        : 0;
                    parent.responseData = {
                        cwd: filterById(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue),
                        details: null,
                        error: null,
                        files: filterByParent(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue)
                    };
                    if (isNullOrUndefined(parent.responseData.cwd)) {
                        const message = 'Cannot load empty data within the File Manager.';
                        createErrorObject(parent, message, '400', null);
                    }
                }
                else if (isFileOperation && parent.responseData.error === null) {
                    let itemData = action === 'search' || action === 'delete' ? getValue('data', data) : [];
                    if (itemData.length === 0) {
                        if (action === 'copy') {
                            itemData = parent.pasteNodes.map((item) => filterById(parent, item));
                        }
                        else {
                            itemData = getValue('data', data).map((item) => filterById(parent, item.id));
                        }
                    }
                    parent.responseData = {
                        cwd: null,
                        details: null,
                        error: null,
                        files: itemData
                    };
                }
                else if (getValue('action', data) === 'details') {
                    const itemData = getValue('data', data);
                    const details = itemData[0];
                    const isMultipleFiles = itemData.length > 1;
                    const itemNames = itemData.map((item) => item.name);
                    const totalSize = isMultipleFiles ? getSize(itemData.reduce((accumulator, currentObject) => accumulator + (currentObject.size || 0), 0)) : getSize(details.size);
                    const path = (parent.pathNames.includes(details.name) || isMultipleFiles ? parent.pathNames.join('/') : parent.pathNames.join('/') + '/' + details.name);
                    parent.responseData.details = Object.assign({
                        location: path,
                        multipleFiles: isMultipleFiles,
                        name: itemNames.join(', '),
                        size: totalSize
                    }, isMultipleFiles ? {} : {
                        created: details.dateCreated,
                        isFile: details.isFile,
                        modified: details.dateModified,
                        permission: details.permission
                    });
                }
                performReadOperation(parent, parent.responseData, fn, data, event, operation, targetPath, beforeSendArgs);
                return;
            }
            const ajax = new Ajax({
                url: getValue('url', beforeSendArgs.ajaxSettings),
                type: getValue('type', beforeSendArgs.ajaxSettings),
                mode: getValue('mode', beforeSendArgs.ajaxSettings),
                dataType: getValue('dataType', beforeSendArgs.ajaxSettings),
                contentType: getValue('contentType', beforeSendArgs.ajaxSettings),
                data: getValue('data', beforeSendArgs.ajaxSettings),
                beforeSend: getValue('beforeSend', beforeSendArgs.ajaxSettings),
                onSuccess: (result) => {
                    if (isNullOrUndefined(result)) {
                        const result = {
                            error: {
                                fileExists: null,
                                message: getLocaleText(parent, 'Server-Error') + ' ' + parent.ajaxSettings.url,
                                code: '406'
                            },
                            files: null
                        };
                        triggerAjaxFailure(parent, beforeSendArgs, fn, result, event, operation, targetPath);
                        return;
                    }
                    if (typeof (result) === 'string') {
                        result = JSON.parse(result);
                    }
                    performReadOperation(parent, result, fn, data, event, operation, targetPath, beforeSendArgs);
                },
                onFailure: () => {
                    const result = {
                        files: null,
                        error: {
                            code: '404',
                            message: getLocaleText(parent, 'Network-Error') + ' ' + parent.ajaxSettings.url,
                            fileExists: null
                        }
                    };
                    triggerAjaxFailure(parent, beforeSendArgs, fn, result, event, operation, targetPath);
                }
            });
            ajax.send();
        }
    });
}
/**
 * Function to get file size.
 *
 * @param {number} size - specifies the size.
 * @returns {string} - returns the size.
 * @private
 */
function getSize(size) {
    let hz;
    if (size < 1024) {
        hz = size + ' B';
    }
    else if (size < 1024 * 1024) {
        hz = (size / 1024).toFixed(2) + ' KB';
    }
    else if (size < 1024 * 1024 * 1024) {
        hz = (size / 1024 / 1024).toFixed(2) + ' MB';
    }
    else {
        hz = (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }
    return hz;
}
/**
 * Function to perform read operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {Function} fn - specifies the function.
 * @param {Object} data - specifies the data.
 * @param {string} event - specifies the event.
 * @param {string} operation - specifies the operation.
 * @param {string} targetPath - specifies the targetPath.
 * @param {BeforeSendEventArgs} beforeSendArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function performReadOperation(parent, result, fn, data, event, operation, targetPath, beforeSendArgs) {
    parent.notify(afterRequest, { action: 'success' });
    const id = parent.expandedId ? parent.expandedId : parent.pathId[parent.pathId.length - 1];
    if (!isNullOrUndefined(result.cwd) && (getValue('action', data) === 'read')) {
        result.cwd.name = (parent.pathId.length === 1) ? (parent.rootAliasName || result.cwd.name) : result.cwd.name;
        setValue('_fm_id', id, result.cwd);
        setValue(id, result.cwd, parent.feParent);
        if (!isNullOrUndefined(result.files) || result.error.code === '401') {
            if ((event === 'finalize-end' || event === 'initial-end') && parent.pathNames.length === 0) {
                const root = getValue(parent.pathId[0], parent.feParent);
                parent.pathNames[0] = getValue('name', root);
                parent.hasId = !isNullOrUndefined(getValue('id', root));
            }
            if (event === 'finalize-end') {
                generatePath(parent);
            }
        }
    }
    if (!isNullOrUndefined(result.files)) {
        setDateObject(result.files);
        for (let i = 0, len = result.files.length; i < len; i++) {
            const item = result.files[i];
            setValue('_fm_iconClass', fileType(item), item);
        }
        if (getValue('action', data) === 'read') {
            setNodeId(result, id);
            setValue(id, result.files, parent.feFiles);
        }
    }
    if (!isNullOrUndefined(result.details) && !isNullOrUndefined(parent.rootAliasName)) {
        const rootName = parent.rootAliasName || getValue('name', result.details);
        let location = getValue('location', result.details).replace(new RegExp('/', 'g'), '\\');
        if ((getValue('path', data) === '/') || (parent.hasId && getValue('path', data).match(/[/]/g).length === 1)) {
            if (getValue('names', data).length === 0) {
                setValue('name', rootName, result.details);
            }
            if (location.indexOf('\\') === -1) {
                location = rootName;
            }
            else {
                location = location.replace(location.substring(0, location.indexOf('\\')), rootName);
            }
        }
        else {
            location = location.replace(location.substring(0, location.indexOf('\\')), rootName);
        }
        setValue('location', location, result.details);
    }
    fn(parent, result, event, operation, targetPath);
    if (!isNullOrUndefined(result.files) && (event === 'path-changed' || event === 'finalize-end' || event === 'open-end' || event === 'drop-path')) {
        parent.notify(searchTextChange, result);
    }
    if (typeof getValue('onSuccess', beforeSendArgs.ajaxSettings) === 'function') {
        getValue('onSuccess', beforeSendArgs.ajaxSettings)();
    }
}
/**
 * Function to copy operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {string} target - specifies the target.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
function copyFolderItems(parent, data, target, itemName) {
    const newObject = createNewItem(data, target, itemName, true);
    parent.fileSystemData.push(newObject);
    parent.pasteNodes.push(newObject.id);
    const copiedItems = filterByParent(parent, data.id);
    for (let i = 0; i < copiedItems.length; i++) {
        copyFolderItems(parent, copiedItems[i], newObject, null);
    }
}
/**
 * Function for trigger Ajax failure in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {BeforeSendEventArgs} beforeSendArgs - specifies the beforeSendArgs.
 * @param {Function} fn - specifies the function.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @param {string} operation - specifies the operation.
 * @param {string} targetPath - specifies the targetPath.
 * @returns {void}
 * @private
 */
function triggerAjaxFailure(parent, beforeSendArgs, fn, result, event, operation, targetPath) {
    parent.notify(afterRequest, { action: 'failure' });
    fn(parent, result, event, operation, targetPath);
    if (typeof getValue('onFailure', beforeSendArgs.ajaxSettings) === 'function') {
        getValue('onFailure', beforeSendArgs.ajaxSettings)();
    }
}
/**
 * Function for read success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @returns {void}
 * @private
 */
function readSuccess(parent, result, event) {
    try {
        if (!isNullOrUndefined(result.files)) {
            parent.notify(event, result);
            parent.notify(selectionChanged, {});
            const args = { action: 'read', result: result };
            parent.trigger('success', args);
        }
        else {
            if (!isNullOrUndefined(result.error) && result.error.code === '401') {
                result.files = [];
                parent.notify(event, result);
                parent.notify(selectionChanged, {});
            }
            onFailure(parent, result, 'read');
            parent.setProperties({ path: parent.oldPath }, true);
            parent.pathNames.pop();
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'read');
        parent.setProperties({ path: parent.oldPath }, true);
        parent.pathNames.pop();
    }
    if (parent.isDragDrop && parent.isDropEnd) {
        if (parent.droppedObjects.length !== 0) {
            const args = { fileDetails: parent.droppedObjects };
            parent.trigger('fileDropped', args);
        }
        parent.isDropEnd = parent.isDragDrop = false;
    }
}
/**
 * Function for filter success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function filterSuccess(parent, result, event, action) {
    try {
        if (!isNullOrUndefined(result.files)) {
            parent.notify(event, result);
            const args = { action: action, result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, action);
        }
    }
    catch (error) {
        handleCatchError(parent, error, action);
    }
}
/* istanbul ignore next */
/**
 * Function for create success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
function createSuccess(parent, result, itemName) {
    try {
        if (!isNullOrUndefined(result.files)) {
            if (parent.dialogObj && parent.dialogObj.visible) {
                parent.dialogObj.hide();
            }
            parent.createdItem = isFileSystemData(parent) ? result.files[result.files.length - 1] : result.files[0];
            parent.breadcrumbbarModule.searchObj.value = '';
            const createEventArgs = {
                folderName: itemName,
                path: parent.path,
                parentFolder: parent.itemData
            };
            parent.trigger('folderCreate', createEventArgs);
            const args = { action: 'create', result: result };
            parent.trigger('success', args);
            parent.itemData = [getPathObject(parent)];
            read(parent, createEnd, parent.path);
        }
        else {
            if (result.error.code === '400') {
                if (parent.dialogObj && parent.dialogObj.visible) {
                    const ele = select('#newname', parent.dialogObj.element);
                    const error = getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + ele.value + '"');
                    ele.parentElement.nextElementSibling.innerHTML = error;
                }
                else {
                    const result = {
                        files: null,
                        error: {
                            code: '400',
                            message: getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + itemName + '"'),
                            fileExists: null
                        }
                    };
                    createDialog(parent, 'Error', result);
                }
                const args = { action: 'create', error: result.error };
                parent.trigger('failure', args);
            }
            else {
                if (parent.dialogObj && parent.dialogObj.visible) {
                    parent.dialogObj.hide();
                }
                onFailure(parent, result, 'create');
            }
        }
    }
    catch (error) {
        if (parent.dialogObj && parent.dialogObj.visible) {
            parent.dialogObj.hide();
        }
        handleCatchError(parent, error, 'create');
    }
}
/* istanbul ignore next */
/**
 * Function to rename the folder/file in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @returns {void}
 * @private
 */
function renameSuccess(parent, result) {
    try {
        if (!isNullOrUndefined(result.files)) {
            if (!isNullOrUndefined(parent.dialogObj)) {
                parent.dialogObj.hide();
            }
            const args = { action: 'rename', result: result };
            parent.trigger('success', args);
            parent.renamedItem = Array.isArray(result.files) ? result.files[0] : result.files;
            const renameEventArgs = {
                newName: parent.renamedItem.name,
                itemData: [parent.renamedItem],
                path: parent.path
            };
            parent.trigger('rename', renameEventArgs);
            if (parent.activeModule === 'navigationpane') {
                const pathObject = getPathObject(parent);
                const pathLevel = parent.pathId[parent.pathId.length - 1].split('_').length - 2;
                parent.pathId.pop();
                parent.itemData = [getValue(parent.pathId[parent.pathId.length - 1], parent.feParent)];
                const renamePath = getTargetPath(parent, parent.renamedItem);
                read(parent, renameEndParent, renamePath);
                if (!isNullOrUndefined(pathObject) && parent.pathNames.length > 1 && pathLevel <= parent.pathNames.length - 1) {
                    parent.pathNames[pathLevel] = parent.renameText;
                    if (!parent.hasId) {
                        parent.setProperties({ path: `/${parent.pathNames.slice(1).join('/')}/` }, true);
                    }
                }
                parent.itemData = parent.navigationpaneModule.previousSelected.length > 0
                    ? parent.navigationpaneModule.treeObj.getTreeData(parent.navigationpaneModule.previousSelected[0]) : parent.itemData;
                read(parent, pathChanged, parent.path);
                parent.itemData[0] = parent.renamedItem;
                parent.renamedItem = null;
            }
            else {
                parent.itemData = [getPathObject(parent)];
                if (parent.breadcrumbbarModule.searchObj.value !== '') {
                    Search(parent, renameEnd, parent.path, parent.searchWord, parent.showHiddenItems, !parent.searchSettings.ignoreCase);
                }
                else {
                    if (parent.isFiltered) {
                        filter(parent, renameEnd);
                    }
                    else {
                        read(parent, renameEnd, parent.path);
                    }
                }
            }
        }
        else {
            if (result.error.code === '400' && parent.dialogObj && parent.dialogObj.visible) {
                const ele = select('#rename', parent.dialogObj.element);
                let error = getLocaleText(parent, 'Validation-Rename-Exists').replace('{0}', '"' + parent.currentItemText + '"');
                error = error.replace('{1}', '"' + ele.value + '"');
                ele.parentElement.nextElementSibling.innerHTML = error;
                const args = { action: 'rename', error: result.error };
                parent.trigger('failure', args);
            }
            else {
                if (!isNullOrUndefined(parent.dialogObj)) {
                    parent.dialogObj.hide();
                }
                onFailure(parent, result, 'rename');
            }
        }
    }
    catch (error) {
        if (!isNullOrUndefined(parent.dialogObj)) {
            parent.dialogObj.hide();
        }
        handleCatchError(parent, error, 'rename');
    }
}
/* istanbul ignore next */
/**
 * Function to create new folder in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
function pasteSuccess(parent, result, path, operation) {
    try {
        const moveorcopyEventArgs = {
            itemData: result.files,
            isCopy: operation === 'copy' ? true : false,
            path: path,
            targetData: parent.itemData[0],
            targetPath: parent.path
        };
        parent.trigger('move', moveorcopyEventArgs);
        if (result.error && result.error.fileExists) {
            parent.fileLength = 0;
            if (!isNullOrUndefined(result.files)) {
                parent.isPasteError = true;
                doPasteUpdate(parent, operation, result);
            }
            createExtDialog(parent, 'DuplicateItems', result.error.fileExists);
            if (result.error.code === '404') {
                createDialog(parent, 'Error', result);
            }
        }
        else if (!result.error && !isNullOrUndefined(result.files)) {
            parent.isPasteError = false;
            doPasteUpdate(parent, operation, result);
        }
        else if (result.error && !isNullOrUndefined(result.files)) {
            parent.isPasteError = true;
            doPasteUpdate(parent, operation, result);
            createDialog(parent, 'Error', result);
        }
        else {
            onFailure(parent, result, operation);
        }
    }
    catch (error) {
        handleCatchError(parent, error, operation);
    }
}
/**
 * Function to delete success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
function deleteSuccess(parent, result, path) {
    try {
        const deleteEventArgs = {
            itemData: result.files,
            path: path
        };
        parent.trigger('delete', deleteEventArgs);
        if (!isNullOrUndefined(result.files)) {
            parent.setProperties({ path: path }, true);
            parent.itemData = [getPathObject(parent)];
            read(parent, deleteEnd, parent.path);
            if (result.error) {
                onFailure(parent, result, 'delete');
            }
            else {
                const args = { action: 'delete', result: result };
                parent.trigger('success', args);
            }
        }
        else {
            onFailure(parent, result, 'delete');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'delete');
    }
}
/**
 * Function for details success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
function detailsSuccess(
// eslint:disable-next-line
parent, result, path, operation) {
    try {
        if (!isNullOrUndefined(result.details)) {
            createDialog(parent, operation, null, result.details);
            const args = { action: 'details', result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, 'details');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'details');
    }
}
/**
 * Function for on failure event in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function onFailure(parent, result, action) {
    createDialog(parent, 'Error', result);
    const args = { action: action, error: result.error };
    parent.trigger('failure', args);
}
/**
 * Function for search in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} event - specifies the event.
 * @param {string} path - specifies the path.
 * @param {string} searchString - specifies the search string.
 * @param {boolean} showHiddenItems - specifies the hidden items.
 * @param {boolean} caseSensitive - specifies the casing of search text.
 * @returns {void}
 * @private
 */
function Search(parent, event, path, searchString, showHiddenItems, caseSensitive) {
    const data = {
        action: 'search', path: path, searchString: searchString, showHiddenItems: showHiddenItems, caseSensitive: caseSensitive,
        data: parent.itemData
    };
    createAjax(parent, data, searchSuccess, event);
}
/* istanbul ignore next */
/**
 * Function for search success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @returns {void}
 * @private
 */
function searchSuccess(parent, result, event) {
    try {
        if (!isNullOrUndefined(result.files)) {
            parent.notify(event, result);
            const args = { action: 'search', result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, 'search');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'search');
    }
}
/* istanbul ignore next */
/**
 * Function for download in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string[]} items - specifies the items.
 * @returns {void}
 * @private
 */
function Download(parent, path, items) {
    const downloadUrl = parent.ajaxSettings.downloadUrl ? parent.ajaxSettings.downloadUrl : parent.ajaxSettings.url;
    const data = { 'action': 'download', 'path': path, 'names': items, 'data': parent.itemData };
    const ajaxSettings = {
        url: downloadUrl,
        type: 'POST',
        contentType: 'application/json',
        responseType: 'blob',
        data: JSON.stringify(data),
        onSuccess: null,
        onFailure: null,
        beforeSend: null
    };
    const eventArgs = { data: data, cancel: false, useFormPost: true, ajaxSettings: ajaxSettings };
    parent.trigger('beforeDownload', eventArgs, (downloadArgs) => {
        if (!downloadArgs.cancel) {
            if (downloadArgs.useFormPost) {
                const form = createElement('form', {
                    id: parent.element.id + '_downloadForm',
                    attrs: { action: downloadUrl, method: 'post', name: 'downloadForm', 'download': '' }
                });
                const input = createElement('input', {
                    id: parent.element.id + '_hiddenForm',
                    attrs: { name: 'downloadInput', value: JSON.stringify(downloadArgs.data), type: 'hidden' }
                });
                form.appendChild(input);
                parent.element.appendChild(form);
                document.forms.namedItem('downloadForm').submit();
                parent.element.removeChild(form);
            }
            else {
                try {
                    let contentDisposition;
                    let fileName;
                    const fetch = new Fetch({
                        url: getValue('url', downloadArgs.ajaxSettings),
                        type: getValue('type', downloadArgs.ajaxSettings),
                        contentType: getValue('contentType', downloadArgs.ajaxSettings),
                        responseType: getValue('responseType', downloadArgs.ajaxSettings),
                        beforeSend: getValue('beforeSend', downloadArgs.ajaxSettings),
                        onLoad: (e) => {
                            contentDisposition = e.headers.get('Content-Disposition');
                            if (contentDisposition) {
                                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                                const extractedFilename = filenameMatch && filenameMatch[1];
                                fileName = extractedFilename ? extractedFilename.replace(/['"]/g, '') : fileName;
                            }
                            else {
                                fileName = parent.itemData.length > 1 ? 'files.zip' : getValue('isFile', parent.itemData[0]) ? getValue('name', parent.itemData[0]) : getValue('name', parent.itemData[0]) + '.zip';
                            }
                        },
                        onSuccess: (e) => {
                            parent.trigger('success', downloadArgs);
                            const blob = e;
                            const blobUrl = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = fileName;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        },
                        onFailure: (e) => {
                            const result = {
                                error: {
                                    code: e.status.toString(),
                                    message: getLocaleText(parent, 'Network-Error') + ' ' + parent.ajaxSettings.downloadUrl
                                }
                            };
                            createDialog(parent, 'Error', result);
                            parent.trigger('failure', downloadArgs);
                        }
                    });
                    fetch.send(JSON.stringify(downloadArgs.data));
                }
                catch (error) {
                    handleCatchError(parent, error, 'download');
                }
            }
        }
    });
}
/**
 * Function for on catch handler in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {any} error - specifies the catch error.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function handleCatchError(parent, error, action) {
    const errorResult = {
        files: null,
        error: {
            message: error.message,
            fileExists: null
        }
    };
    onFailure(parent, errorResult, action);
}

/**
 *
 * @param {IFileManager} parent - Specifies the parent element
 * @param {string} text - specifies the text string.
 * @param {ReadArgs | SelectedEventArgs} e - specifies the type of event args.
 * @param {FileDetails} details - specifies the file details.
 * @returns {void}
 * @private
 */
function createDialog(parent, text, e, details) {
    const options = getOptions(parent, text, e, details);
    if (isNullOrUndefined(parent.dialogObj)) {
        parent.dialogObj = new Dialog({
            beforeOpen: keydownAction.bind(this, parent, options.dialogName),
            beforeClose: (args) => {
                triggerPopupBeforeClose(parent, parent.dialogObj, args, options.dialogName);
            },
            header: options.header,
            content: options.content,
            buttons: options.buttons,
            animationSettings: { effect: 'None' },
            showCloseIcon: true,
            closeOnEscape: true,
            visible: true,
            allowDragging: true,
            isModal: true,
            target: parent.popupTarget ? parent.popupTarget : '#' + parent.element.id,
            cssClass: getCssClass(parent, parent.isMobile ? MOB_POPUP : ROOT_POPUP),
            width: '350px',
            open: options.open,
            close: options.close,
            enableRtl: parent.enableRtl,
            enableHtmlSanitizer: parent.enableHtmlSanitizer,
            locale: parent.locale
        });
        parent.dialogObj.isStringTemplate = true;
        parent.dialogObj.appendTo('#' + parent.element.id + DIALOG_ID);
    }
    else {
        changeOptions(parent, options);
    }
}
/**
 *
 * @param {IFileManager} parent - Specifies the parent element.
 * @param {string} text - specifies the text string.
 * @param {string[]} replaceItems - specifies the replacement items.
 * @param {string} newPath - specifies the new path.
 * @returns {void}
 * @private
 */
function createExtDialog(parent, text, replaceItems, newPath) {
    const extOptions = getExtOptions(parent, text, replaceItems, newPath);
    parent.isApplySame = false;
    if (isNullOrUndefined(parent.extDialogObj)) {
        parent.extDialogObj = new Dialog({
            beforeOpen: beforeExtOpen.bind(this, parent, extOptions.dialogName),
            beforeClose: (args) => {
                triggerPopupBeforeClose(parent, parent.extDialogObj, args, extOptions.dialogName);
            },
            content: extOptions.content,
            header: extOptions.header,
            closeOnEscape: true,
            allowDragging: true,
            animationSettings: { effect: 'None' },
            target: parent.popupTarget ? parent.popupTarget : '#' + parent.element.id,
            cssClass: getCssClass(parent, parent.isMobile ? MOB_POPUP : ROOT_POPUP),
            enableRtl: parent.enableRtl,
            showCloseIcon: true,
            isModal: true,
            width: 350,
            buttons: extOptions.buttons,
            open: extOptions.open,
            close: extOptions.close,
            enableHtmlSanitizer: parent.enableHtmlSanitizer,
            locale: parent.locale
        });
        parent.extDialogObj.isStringTemplate = true;
        parent.extDialogObj.appendTo('#' + parent.element.id + EXTN_DIALOG_ID);
    }
    else {
        parent.extDialogObj.header = extOptions.header;
        parent.extDialogObj.close = extOptions.close;
        parent.extDialogObj.open = extOptions.open;
        parent.extDialogObj.close = extOptions.close;
        parent.extDialogObj.content = extOptions.content;
        parent.extDialogObj.buttons = extOptions.buttons;
        parent.extDialogObj.enableRtl = parent.enableRtl;
        parent.extDialogObj.locale = parent.locale;
        parent.extDialogObj.beforeOpen = beforeExtOpen.bind(this, parent, extOptions.dialogName);
        parent.extDialogObj.beforeClose = (args) => {
            triggerPopupBeforeClose(parent, parent.extDialogObj, args, extOptions.dialogName);
        };
        parent.extDialogObj.dataBind();
        parent.extDialogObj.show();
    }
}
/**
 *
 * @param {IFileManager} parent - Specifies the parent element.
 * @param {Dialog} dlgModule - Specifies the dialog module.
 * @param {BeforeOpenEventArgs} args - specifies the before open arguements.
 * @param {string} dialogName - specifies the dialog name.
 * @returns {void}
 * @private
 */
function triggerPopupBeforeOpen(parent, dlgModule, args, dialogName) {
    const eventArgs = {
        cancel: args.cancel, popupName: dialogName, popupModule: dlgModule
    };
    parent.trigger('beforePopupOpen', eventArgs, (eventargs) => {
        args.cancel = eventargs.cancel;
    });
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Dialog} dlgModule - specifies the dialog module.
 * @param {BeforeCloseEventArgs} args - specifies the before close event arguements.
 * @param {string} dialogName - specifies the dialog name.
 * @returns {void}
 * @private
 */
function triggerPopupBeforeClose(parent, dlgModule, args, dialogName) {
    const eventArgs = {
        cancel: args.cancel, popupModule: dlgModule, popupName: dialogName
    };
    parent.trigger('beforePopupClose', eventArgs, (eventargs) => {
        args.cancel = eventargs.cancel;
        if (!args.cancel && args.isInteracted && ((dialogName === 'Rename') || (dialogName === 'Create Folder'))) {
            parent.trigger(actionFailure, {});
        }
    });
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Dialog} dlgModule - specifies the dialog module.
 * @param {string} dialogName - specifies the dialog name.
 * @returns {void}
 * @private
 */
function triggerPopupOpen(parent, dlgModule, dialogName) {
    const args = { popupModule: dlgModule, element: dlgModule.element, popupName: dialogName };
    parent.trigger('popupOpen', args);
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Dialog} dlgModule - specifies the dialog module.
 * @param {string} dialogName - specifies the dialog name.
 * @returns {void}
 * @private
 */
function triggerPopupClose(parent, dlgModule, dialogName) {
    const args = { popupModule: dlgModule, element: dlgModule.element, popupName: dialogName };
    parent.trigger('popupClose', args);
}
/**
 *
 * @param {IFileManager} parent - Specifies the parent element.
 * @param {string} text - specifies the text string.
 * @param {string[]} replaceItems - specifies the replacement items.
 * @param {string} newPath - specifies the new path.
 * @returns {DialogOptions} - returns the dialog options.
 * @private
 */
function getExtOptions(parent, text, replaceItems, newPath) {
    const options = {
        header: '', content: '', buttons: [], dialogName: ''
    };
    let duplicateContent;
    let item;
    let index;
    options.open = () => { triggerPopupOpen(parent, parent.extDialogObj, options.dialogName); };
    options.close = () => { triggerPopupClose(parent, parent.extDialogObj, options.dialogName); };
    switch (text) {
        case 'Extension':
            options.header = getLocaleText(parent, 'Header-Rename-Confirmation');
            options.content = '<div>' + getLocaleText(parent, 'Content-Rename-Confirmation') + '</div>';
            options.buttons = [{
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Yes') },
                    click: () => {
                        parent.extDialogObj.hide();
                        rename(parent, newPath, parent.renameText);
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: () => {
                        parent.extDialogObj.hide();
                        parent.dialogObj.hide();
                    }
                }];
            options.dialogName = 'Extension Change';
            break;
        case 'DuplicateItems':
            options.dialogName = 'Duplicate Items';
            parent.replaceItems = replaceItems;
            item = parent.replaceItems[parent.fileLength];
            index = item.lastIndexOf('/');
            item = index === -1 ? item : item.substring(index);
            options.header = getLocaleText(parent, 'Header-Duplicate');
            duplicateContent = '<div>' + getLocaleText(parent, 'Content-Duplicate') + '</div>';
            options.content = (duplicateContent).replace('{0}', item);
            options.close = () => {
                if (!parent.isDropEnd && parent.duplicateItems.length === 0) {
                    const args = { fileDetails: parent.droppedObjects };
                    parent.trigger('fileDropped', args);
                    parent.isDropEnd = parent.isDragDrop = false;
                }
                triggerPopupClose(parent, parent.extDialogObj, options.dialogName);
            };
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Yes') },
                    click: () => {
                        parent.duplicateItems.push(parent.replaceItems[parent.fileLength]);
                        parent.duplicateRecords.push(getDuplicateData(parent, parent.replaceItems[parent.fileLength]));
                        parent.fileLength++;
                        if (replaceItems[parent.fileLength]) {
                            let item = parent.replaceItems[parent.fileLength];
                            const indexval = item.lastIndexOf('/');
                            item = indexval === -1 ? item : item.substring(indexval);
                            parent.extDialogObj.content = (duplicateContent).replace('{0}', item);
                            parent.extDialogObj.show();
                        }
                        else {
                            parent.extDialogObj.hide();
                            const targetPath = parent.isDragDrop ? parent.dragPath : parent.targetPath;
                            const path = parent.isDragDrop ? parent.dropPath : ((parent.folderPath === '') ? parent.path :
                                parent.folderPath);
                            const action = parent.isDragDrop ? 'move' : parent.fileAction;
                            paste(parent, targetPath, parent.duplicateItems, path, action, parent.duplicateItems, parent.duplicateRecords);
                        }
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: () => {
                        parent.fileLength++;
                        if (replaceItems[parent.fileLength]) {
                            let item = parent.replaceItems[parent.fileLength];
                            const ind = item.lastIndexOf('/');
                            item = ind === -1 ? item : item.substring(ind);
                            parent.extDialogObj.content = (duplicateContent).replace('{0}', item);
                            parent.extDialogObj.show();
                        }
                        else {
                            parent.extDialogObj.hide();
                            if (parent.duplicateItems.length !== 0) {
                                const action = parent.isDragDrop ? 'move' : parent.fileAction;
                                const targetPath = parent.isDragDrop ? parent.dragPath : parent.targetPath;
                                const path = parent.isDragDrop ? parent.dropPath : ((parent.folderPath === '') ? parent.path :
                                    parent.folderPath);
                                paste(parent, targetPath, parent.duplicateItems, path, action, parent.duplicateItems, parent.duplicateRecords);
                            }
                        }
                    }
                }
            ];
            break;
        case 'UploadRetry':
            options.dialogName = 'Retry Upload';
            options.header = getLocaleText(parent, 'Header-Retry');
            options.content = parent.retryFiles[0].name + '<div class="e-fe-retrycontent">' +
                (getLocaleText(parent, 'Content-Retry')) + '</div>';
            options.open = onRetryOpen.bind(this, parent);
            options.close = () => {
                parent.isRetryOpened = false;
                retryDlgClose(parent);
                triggerPopupClose(parent, parent.extDialogObj, options.dialogName);
            };
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Keep-Both') },
                    click: () => {
                        retryDlgUpdate(parent, true);
                    }
                },
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Replace') },
                    click: () => {
                        retryDlgUpdate(parent, false);
                    }
                },
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Skip') },
                    click: () => {
                        let count = 0;
                        if (parent.isApplySame) {
                            count = parent.retryFiles.length;
                            parent.retryFiles = [];
                            retryDlgClose(parent);
                        }
                        else {
                            count = 1;
                            parent.retryFiles.splice(0, 1);
                            if (parent.retryFiles.length !== 0) {
                                createExtDialog(parent, 'UploadRetry');
                            }
                            else {
                                retryDlgClose(parent);
                            }
                        }
                        parent.notify(skipUpload, { count: count });
                    }
                }
            ];
            break;
    }
    return options;
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {boolean} isKeepBoth - checks the arguement to keep both.
 * @returns {void}
 * @private
 */
function retryDlgUpdate(parent, isKeepBoth) {
    if (parent.isApplySame) {
        if (isKeepBoth) {
            onKeepBothAll(parent);
        }
        else {
            onReplaceAll(parent);
        }
        retryDlgClose(parent);
    }
    else {
        parent.retryArgs.push({
            action: isKeepBoth ? 'keepboth' : 'replace',
            file: parent.retryFiles[0]
        });
        parent.uploadObj.retry(parent.retryFiles[0]);
        parent.retryFiles.splice(0, 1);
        if (parent.retryFiles.length !== 0) {
            createExtDialog(parent, 'UploadRetry');
        }
        else {
            retryDlgClose(parent);
        }
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function retryDlgClose(parent) {
    let flag = true;
    if (parent.isRetryOpened) {
        parent.isRetryOpened = false;
    }
    else {
        flag = false;
    }
    const ele = select('.e-dlg-checkbox', parent.extDialogObj.element);
    if (ele) {
        remove(ele);
    }
    if (flag) {
        parent.extDialogObj.hide();
    }
    else {
        parent.retryFiles = [];
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {object} args - specifies the arguements.
 * @returns {void}
 * @private
 */
function onRetryOpen(parent, args) {
    parent.isRetryOpened = true;
    const dialogEle = getValue('element', args);
    const container = select('.e-dlg-content', dialogEle);
    const checkContainer = parent.createElement('div', {
        className: 'e-dlg-checkbox'
    });
    const checkbox = parent.createElement('input', {
        id: parent.element.id + '_applyall'
    });
    checkContainer.appendChild(checkbox);
    container.appendChild(checkContainer);
    const checkBoxObj = new CheckBox({
        label: getLocaleText(parent, 'ApplyAll-Label'),
        change: (args) => {
            parent.isApplySame = args.checked;
        }
    });
    checkBoxObj.appendTo('#' + parent.element.id + '_applyall');
    triggerPopupOpen(parent, parent.extDialogObj, 'Retry Upload');
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onKeepBothAll(parent) {
    while (parent.retryFiles.length !== 0) {
        parent.retryArgs.push({ action: 'keepboth', file: parent.retryFiles[0] });
        parent.uploadObj.retry(parent.retryFiles[0]);
        parent.retryFiles.splice(0, 1);
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onReplaceAll(parent) {
    while (parent.retryFiles.length !== 0) {
        parent.retryArgs.push({ action: 'replace', file: parent.retryFiles[0] });
        parent.uploadObj.retry(parent.retryFiles[0]);
        parent.retryFiles.splice(0, 1);
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function focusInput(parent) {
    const ele = select('#newname', parent.dialogObj.element);
    ele.focus();
    ele.value = '';
    const len = ele.value.length;
    ele.setSelectionRange(0, len);
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onFolderDialogOpen(parent) {
    const ele = select('#newname', parent.dialogObj.element);
    if (!ele.parentElement.classList.contains('e-control-wrapper')) {
        createInput(ele, getLocaleText(parent, 'Content-NewFolder'));
    }
    ele.parentElement.nextElementSibling.innerHTML = '';
    ele.oninput = () => {
        onValidate(parent, ele);
    };
    ele.onkeyup = (e) => {
        const code = getKeyCode(e);
        if (code === 13) {
            onSubmit(parent);
        }
    };
    focusInput(parent);
    triggerPopupOpen(parent, parent.dialogObj, 'Create Folder');
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onRenameDialogOpen(parent) {
    const inputEle = select('#rename', parent.dialogObj.element);
    if (!inputEle.parentElement.classList.contains('e-control-wrapper')) {
        createInput(inputEle, getLocaleText(parent, 'Content-Rename'));
    }
    inputEle.parentElement.nextElementSibling.innerHTML = '';
    inputEle.oninput = () => {
        onValidate(parent, inputEle);
    };
    inputEle.onkeyup = (e) => {
        const code = getKeyCode(e);
        if (code === 13) {
            onReSubmit(parent);
        }
    };
    onFocusRenameInput(parent, inputEle);
    triggerPopupOpen(parent, parent.dialogObj, 'Rename');
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLInputElement} inputEle - specifies the input element.
 * @returns {void}
 * @private
 */
function onFocusRenameInput(parent, inputEle) {
    inputEle.focus();
    let txt = '';
    if (parent.isFile && !parent.showFileExtension) {
        const index = parent.currentItemText.lastIndexOf('.');
        txt = (index === -1) ? parent.currentItemText : parent.currentItemText.substring(0, index);
    }
    else {
        txt = parent.currentItemText;
    }
    inputEle.value = txt;
    if (parent.isFile && parent.showFileExtension && (inputEle.value.indexOf('.') !== -1)) {
        inputEle.setSelectionRange(0, inputEle.value.lastIndexOf('.'));
    }
    else {
        inputEle.setSelectionRange(0, inputEle.value.length);
    }
}
/**
 *
 * @param {HTMLInputElement} ele - specifies the element.
 * @param {string} placeholder - specifies the place holder.
 * @returns {void}
 * @private
 */
function createInput(ele, placeholder) {
    Input.createInput({
        element: ele,
        properties: {
            placeholder: placeholder
        }
    });
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} text - specifies the text string.
 * @param {ReadArgs | SelectedEventArgs} e - specifies the event arguements.
 * @param {FileDetails} details - specifies the file details.
 * @returns {DialogOptions} - specifies the dialog options.
 * @private
 */
function getOptions(parent, text, e, details) {
    const options = {
        header: '', content: '', buttons: [], dialogName: ''
    };
    let permission;
    let formattedString;
    let intl;
    let strArr;
    let fileType;
    let location;
    options.open = () => { triggerPopupOpen(parent, parent.dialogObj, options.dialogName); };
    options.close = () => { triggerPopupClose(parent, parent.dialogObj, options.dialogName); };
    text = (details && details.multipleFiles === true) ? 'MultipleFileDetails' : text;
    let index;
    switch (text) {
        case 'NewFolder':
            options.dialogName = 'Create Folder';
            options.header = getLocaleText(parent, 'Header-NewFolder');
            options.content = '<input type="text" value="New folder" id="newname"><div class="e-fe-error"></div>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Create') },
                    click: (e) => {
                        if (e.type === 'keydown') {
                            return;
                        }
                        onSubmit(parent);
                    }
                }
            ];
            options.open = onFolderDialogOpen.bind(this, parent);
            break;
        case 'Delete':
            options.dialogName = 'Delete';
            if (parent.selectedItems.length > 1) {
                options.content = ('<div>' + getLocaleText(parent, 'Content-Multiple-Delete') + '</div>')
                    .replace('{0}', parent.selectedItems.length.toString());
                options.header = getLocaleText(parent, 'Header-Multiple-Delete');
            }
            else {
                options.content = '<div>' + getLocaleText(parent, parent.isFile ? 'Content-Delete' : 'Content-Folder-Delete') + '</div>';
                options.header = getLocaleText(parent, parent.isFile ? 'Header-Delete' : 'Header-Folder-Delete');
            }
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Yes') },
                    click: () => {
                        onDeleteSubmit(parent);
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: () => {
                        parent.dialogObj.hide();
                    }
                }
            ];
            break;
        case 'Rename':
            options.dialogName = 'Rename';
            options.header = getLocaleText(parent, 'Header-Rename');
            options.content = '<input type="text" class="e-input" id="rename"><div class="e-fe-error"></div>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Save') },
                    click: (e) => {
                        if (e.type === 'keydown') {
                            return;
                        }
                        onReSubmit(parent);
                    }
                }
            ];
            options.open = onRenameDialogOpen.bind(this, parent);
            break;
        case 'details':
            options.dialogName = 'File Details';
            intl = new Internationalization(parent.locale);
            formattedString = intl.formatDate(new Date(details.modified), { format: 'MMMM dd, yyyy HH:mm:ss' });
            permission = '';
            if (!isNullOrUndefined(details.permission)) {
                permission = '<tr><td>' + getLocaleText(parent, 'Permission') + '</td><td class="' + VALUE + '" >'
                    + objectToString(details.permission) + '</td></tr>';
            }
            options.header = details.name;
            options.content = '<table>' +
                '<tr><td>' + getLocaleText(parent, 'Type') + '</td><td class="' + VALUE + '" title="' +
                (details.isFile ? 'File' : 'Folder') + '">' + (details.isFile ? 'File' : 'Folder') + '</td></tr>' +
                '<tr><td>' + getLocaleText(parent, 'Size') + '</td><td><span class="' + VALUE + '" title ="' +
                details.size + '">' + details.size + '</span></td></tr>' +
                '<tr><td>' + getLocaleText(parent, 'Location') + '</td><td class="' + VALUE + '" title="' +
                details.location + '">' + details.location + '</td></tr>' +
                '<tr><td>' + getLocaleText(parent, 'Modified') + '</td><td class="' + VALUE + '" >'
                + formattedString + '</td></tr>'
                + permission + '</table>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Ok') },
                    click: () => {
                        parent.dialogObj.hide();
                    }
                }
            ];
            break;
        case 'MultipleFileDetails':
            options.dialogName = 'File Details';
            strArr = parent.itemData.map((val) => {
                index = val.name.indexOf('.') + 1;
                return (index === 0 && (!val.isFile)) ? 'Folder' : ((index !== 0) ? val.name.substr(index).replace(' ', '') : 'undetermined');
            });
            if (strArr[0] === undefined) {
                strArr = details.name.split(',').map((val) => {
                    index = val.indexOf('.') + 1;
                    return (index === 0) ? 'Folder' : val.substr(index).replace(' ', '');
                });
            }
            fileType = strArr.every((val, i, arr) => val === arr[0]) ?
                ((strArr[0] === 'Folder') ? 'Folder' : strArr[0].toLocaleUpperCase() + ' Type') : 'Multiple Types';
            location = details.location;
            options.header = details.name;
            options.content = '<table><tr><td>' + getLocaleText(parent, 'Type')
                + ':</td><td class="' + VALUE + '">' + fileType + '</td></tr>' +
                '<tr><td>' + getLocaleText(parent, 'Size') + ':</td><td>' +
                details.size + '<span class="' + VALUE + '" title ="' + details.size
                + '"></span></td></tr>' + '<tr><td>' + getLocaleText(parent, 'Location') +
                ':</td><td class="' + VALUE + '" title="' + location + '">'
                + location + '</td></tr>' + '</table>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Ok') },
                    click: (e) => {
                        if (e.type === 'keydown') {
                            return;
                        }
                        parent.dialogObj.hide();
                    }
                }
            ];
            break;
        case 'Error':
            parent.notify(actionFailure, {});
            options.dialogName = 'Error';
            if (e.error.code === '401') {
                options.header = '<span class="e-fe-icon e-fe-access-error"></span><div class="e-fe-access-header">' +
                    getLocaleText(parent, 'Access-Denied') + '</div>';
            }
            else {
                options.header = getLocaleText(parent, 'Error');
            }
            options.content = '<div class="' + ERROR_CONTENT + '">' + e.error.message + '</div>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Ok') },
                    click: () => {
                        parent.dialogObj.hide();
                    }
                }
            ];
            break;
    }
    return options;
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} dialogName - specifies the dialog name.
 * @param {BeforeOpenEventArgs} args - specifies the before open event arguements.
 * @returns {void}
 * @private
 */
function keydownAction(parent, dialogName, args) {
    const btnElement = selectAll('.e-btn', parent.dialogObj.element);
    preventKeydown(btnElement);
    triggerPopupBeforeOpen(parent, parent.dialogObj, args, dialogName);
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} dlgName - specifies the dialog name.
 * @param {BeforeOpenEventArgs} args - specifies the before open event arguements.
 * @returns {void}
 * @private
 */
function beforeExtOpen(parent, dlgName, args) {
    const btnElement = selectAll('.e-btn', parent.extDialogObj.element);
    preventKeydown(btnElement);
    triggerPopupBeforeOpen(parent, parent.extDialogObj, args, dlgName);
}
/**
 *
 * @param {HTMLInputElement[]} btnElement - specifies the button element.
 * @returns {void}
 * @private
 */
function preventKeydown(btnElement) {
    for (let btnCount = 0; btnCount < btnElement.length; btnCount++) {
        btnElement[btnCount].onkeydown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        };
        btnElement[btnCount].onkeyup = (e) => {
            if (e.keyCode === 13) {
                btnElement[btnCount].click();
            }
        };
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {DialogOptions} options - specifies the dialog options.
 * @returns {void}
 * @private
 */
function changeOptions(parent, options) {
    parent.dialogObj.header = options.header;
    parent.dialogObj.content = options.content;
    parent.dialogObj.buttons = options.buttons;
    parent.dialogObj.enableRtl = parent.enableRtl;
    parent.dialogObj.open = options.open;
    parent.dialogObj.close = options.close;
    parent.dialogObj.beforeOpen = keydownAction.bind(this, parent, options.dialogName);
    parent.dialogObj.beforeClose = (args) => {
        triggerPopupBeforeClose(parent, parent.dialogObj, args, options.dialogName);
    };
    parent.dialogObj.dataBind();
    parent.dialogObj.show();
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onSubmit(parent) {
    const ele = select('#newname', parent.dialogObj.element);
    onSubmitValidate(parent, ele);
    if (ele.parentElement.nextElementSibling.innerHTML !== '') {
        return;
    }
    createFolder(parent, ele.value);
}
/* istanbul ignore next */
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onReSubmit(parent) {
    const ele = select('#rename', parent.dialogObj.element);
    onSubmitValidate(parent, ele);
    if (ele.parentElement.nextElementSibling.innerHTML !== '') {
        return;
    }
    let text = ele.value;
    const oIndex = parent.currentItemText.lastIndexOf('.');
    if (parent.isFile && !parent.showFileExtension) {
        const extn = (oIndex === -1) ? '' : parent.currentItemText.substr(oIndex);
        text += extn;
    }
    parent.renameText = text;
    if (parent.currentItemText === text) {
        parent.dialogObj.hide();
        return;
    }
    let newPath = '';
    if (parent.activeModule === 'navigationpane') {
        newPath = getTargetPath(parent, parent.itemData[0]);
    }
    else {
        newPath = parent.path;
    }
    parent.renamedId = getValue('id', parent.itemData[0]);
    if (parent.isFile) {
        const oldExtension = (oIndex === -1) ? '' : parent.currentItemText.substr(oIndex);
        const nIndex = text.lastIndexOf('.');
        const newExtension = (nIndex === -1) ? '' : text.substr(nIndex);
        if (parent.showFileExtension && oldExtension !== newExtension) {
            createExtDialog(parent, 'Extension', null, newPath);
        }
        else {
            rename(parent, newPath, text);
        }
    }
    else {
        rename(parent, newPath, text);
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onDeleteSubmit(parent) {
    parent.dialogObj.hide();
    parent.notify(deleteInit, {});
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLInputElement} ele - specifies the input element.
 * @returns {void}
 * @private
 */
function onValidate(parent, ele) {
    if (/[/\\|*?"<>:]/.test(ele.value)) {
        addInvalid(parent, ele);
    }
    else if (ele.value === '') {
        ele.parentElement.nextElementSibling.innerHTML = getLocaleText(parent, 'Validation-Empty');
    }
    else {
        ele.parentElement.nextElementSibling.innerHTML = '';
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLInputElement} ele - specifies the input element.
 * @returns {void}
 * @private
 */
function onSubmitValidate(parent, ele) {
    onValidate(parent, ele);
    const len = ele.value.length - 1;
    if (ele.value !== '' && ((ele.value.lastIndexOf('.') === len) || (ele.value.lastIndexOf(' ') === len)) &&
        (parent.showFileExtension || (ele.value.lastIndexOf('.') === -1 || ele.value.substring(ele.value.indexOf('.') + 1).length === 0))) {
        addInvalid(parent, ele);
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLInputElement} ele - specifies the input element.
 * @returns {void}
 * @private
 */
function addInvalid(parent, ele) {
    const error = getLocaleText(parent, 'Validation-Invalid').replace('{0}', '"' + ele.value + '"');
    if (parent.enableHtmlSanitizer) {
        ele.parentElement.nextElementSibling.textContent = error;
    }
    else {
        ele.parentElement.nextElementSibling.innerHTML = error;
    }
}
/**
 *
 * @param {KeyboardEvent} e - specifies the keyboard event.
 * @returns {number} - returns the key code.
 * @private
 */
function getKeyCode(e) {
    let code;
    if (e.keyCode) {
        code = e.keyCode;
    }
    else if (e.which) {
        code = e.which;
    }
    else {
        code = e.charCode;
    }
    return code;
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} header - specifies the header element.
 * @param {string} imageUrl - specifies the image URL.
 * @returns {void}
 * @private
 */
function createImageDialog(parent, header, imageUrl) {
    const content = createElement('div', { className: 'e-image-wrap' });
    const image = createElement('img', { className: 'e-image', attrs: { src: imageUrl, alt: header } });
    content.appendChild(image);
    if (isNullOrUndefined(parent.viewerObj)) {
        parent.viewerObj = new Dialog({
            header: header,
            content: content,
            animationSettings: { effect: 'None' },
            showCloseIcon: true,
            closeOnEscape: true,
            visible: true,
            isModal: true,
            width: '350px',
            height: '350px',
            target: parent.popupTarget ? parent.popupTarget : '#' + parent.element.id,
            cssClass: getCssClass(parent, parent.isMobile ? MOB_POPUP : ROOT_POPUP),
            locale: parent.locale,
            enableResize: true,
            allowDragging: true,
            enableHtmlSanitizer: parent.enableHtmlSanitizer,
            position: { X: 'center', Y: 'center' },
            enableRtl: parent.enableRtl,
            open: openImage.bind(this, parent),
            close: () => { triggerPopupClose(parent, parent.viewerObj, 'Image Preview'); },
            beforeOpen: (args) => {
                triggerPopupBeforeOpen(parent, parent.viewerObj, args, 'Image Preview');
            },
            beforeClose: (args) => {
                triggerPopupBeforeClose(parent, parent.viewerObj, args, 'Image Preview');
            },
            resizing: updateImage.bind(this, parent),
            resizeStop: updateImage.bind(this, parent)
        });
        parent.viewerObj.isStringTemplate = true;
        parent.viewerObj.appendTo('#' + parent.element.id + IMG_DIALOG_ID);
    }
    else {
        parent.viewerObj.refresh();
        parent.viewerObj.header = header;
        parent.viewerObj.content = content;
        parent.viewerObj.enableRtl = parent.enableRtl;
        parent.viewerObj.dataBind();
        parent.viewerObj.show();
    }
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function openImage(parent) {
    setTimeout(() => {
        if (parent.viewerObj) {
            parent.viewerObj.element.focus();
        }
    });
    updateImage(parent);
    triggerPopupOpen(parent, parent.viewerObj, 'Image Preview');
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function updateImage(parent) {
    const content = select('.e-dlg-content', parent.viewerObj.element);
    const imgWrap = select('.e-image-wrap', parent.viewerObj.element);
    const cssObj = window.getComputedStyle(content, null);
    const paddingWidth = cssObj ? (2 * parseFloat(cssObj.paddingRight)) : 36;
    const paddingHeight = cssObj ? (2 * parseFloat(cssObj.paddingBottom)) : 20;
    imgWrap.style.width = (content.offsetWidth - paddingWidth) + 'px';
    imgWrap.style.height = (content.offsetHeight - paddingHeight) + 'px';
}

/**
 * LargeIconsView module
 */
class LargeIconsView {
    /**
     * Constructor for the LargeIcons module.
     *
     * @param {IFileManager} parent - specifies the parent element.
     * @hidden
     */
    constructor(parent) {
        this.isInteraction = true;
        this.uploadOperation = false;
        this.count = 0;
        this.isRendered = true;
        this.tapCount = 0;
        this.isSelectAllCalled = false;
        this.isPasteOperation = false;
        this.isInteracted = true;
        this.parent = parent;
        this.element = select('#' + this.parent.element.id + LARGEICON_ID, this.parent.element);
        addClass([this.element], LARGE_ICONS);
        this.addEventListener();
        this.keyConfigs = {
            end: 'end',
            home: 'home',
            tab: 'tab',
            moveDown: 'downarrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            ctrlEnd: 'ctrl+end',
            ctrlHome: 'ctrl+home',
            ctrlDown: 'ctrl+downarrow',
            ctrlLeft: 'ctrl+leftarrow',
            ctrlRight: 'ctrl+rightarrow',
            ctrlUp: 'ctrl+uparrow',
            shiftEnd: 'shift+end',
            shiftHome: 'shift+home',
            shiftDown: 'shift+downarrow',
            shiftLeft: 'shift+leftarrow',
            shiftRight: 'shift+rightarrow',
            shiftUp: 'shift+uparrow',
            csEnd: 'ctrl+shift+end',
            csHome: 'ctrl+shift+home',
            csDown: 'ctrl+shift+downarrow',
            csLeft: 'ctrl+shift+leftarrow',
            csRight: 'ctrl+shift+rightarrow',
            csUp: 'ctrl+shift+uparrow',
            space: 'space',
            ctrlSpace: 'ctrl+space',
            shiftSpace: 'shift+space',
            csSpace: 'ctrl+shift+space',
            ctrlA: 'ctrl+a',
            enter: 'enter',
            altEnter: 'alt+enter',
            esc: 'escape',
            del: 'delete',
            ctrlX: this.parent.isMac ? 'cmd+x' : 'ctrl+x',
            ctrlC: this.parent.isMac ? 'cmd+c' : 'ctrl+c',
            ctrlV: this.parent.isMac ? 'cmd+v' : 'ctrl+v',
            f2: 'f2',
            shiftdel: 'shift+delete',
            back: 'backspace',
            ctrlD: 'ctrl+d'
        };
    }
    render(args) {
        this.parent.visitedItem = null;
        this.startItem = null;
        showSpinner(this.parent.element);
        if (this.parent.view === 'LargeIcons') {
            this.resetMultiSelect();
            this.element.setAttribute('tabindex', '0');
            if (this.listObj) {
                this.unWireEvents();
                this.removeEventListener();
            }
            this.parent.notify(hideLayout, {});
            const iconsView = select('#' + this.parent.element.id + LARGEICON_ID, this.parent.element);
            const ul = select('ul', iconsView);
            if (ul) {
                remove(ul);
            }
            this.listObj = {
                ariaAttributes: {
                    itemRole: 'option', listRole: 'listbox', itemText: '',
                    groupItemRole: 'group', wrapperRole: ''
                },
                showIcon: true,
                fields: { text: 'name', iconCss: '_fm_icon', imageUrl: '_fm_imageUrl', htmlAttributes: '_fm_htmlAttr' },
                sortOrder: this.parent.sortOrder,
                itemCreated: this.onItemCreated.bind(this),
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            };
            this.items = [];
            this.items = this.renderList(args);
            if (this.parent.sortComparer && this.parent.sortBy !== 'None') {
                this.items = this.allItems = DataUtil.sort(this.items, this.parent.sortBy, this.comparer.bind(this));
            }
            else {
                this.items = this.allItems = getSortedData(this.parent, this.items);
            }
            iconsView.classList.remove(DISPLAY_NONE);
            if (this.parent.enableVirtualization && this.allItems.length > 0 && !isNullOrUndefined(this.parent.virtualizationModule)) {
                this.parent.virtualizationModule.setUIVirtualization();
            }
            this.listElements = ListBase.createListFromJson(createElement, this.items, this.listObj);
            this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, this.listElements));
            this.element.appendChild(this.listElements);
            this.listElements.setAttribute('aria-label', 'listbox');
            this.preventImgDrag();
            this.createDragObj();
            if (this.itemList.length === 0) {
                const emptyList = this.element.querySelector('.' + LIST_PARENT);
                this.element.removeChild(emptyList);
                createEmptyElement(this.parent, this.element, args);
            }
            else if (this.itemList.length !== 0 && this.element.querySelector('.' + EMPTY)) {
                this.element.removeChild(this.element.querySelector('.' + EMPTY));
            }
            if (this.isPasteOperation === true) {
                this.selectItems(this.parent.pasteNodes);
                this.isPasteOperation = false;
            }
            /* istanbul ignore next */
            if (this.uploadOperation === true) {
                this.selectItems(this.parent.uploadItem);
                this.parent.setProperties({ selectedItems: [] }, true);
                this.count++;
                if (this.count === this.parent.uploadItem.length) {
                    this.uploadOperation = false;
                    this.parent.uploadItem = [];
                }
            }
            const activeEle = this.element.querySelectorAll('.' + ACTIVE);
            if (activeEle.length !== 0) {
                this.parent.activeModule = 'largeiconsview';
            }
            for (let i = 0; i < activeEle.length; i++) {
                activeEle[i].setAttribute('aria-selected', 'true');
            }
            this.element.style.maxHeight = '100%';
            this.getItemCount();
            this.addEventListener();
            this.wireEvents();
            if (this.parent.enableVirtualization && this.allItems.length > 0 && !isNullOrUndefined(this.parent.virtualizationModule)) {
                this.parent.virtualizationModule.setUlElementHeight();
                this.parent.virtualizationModule.wireScrollEvent(false);
            }
            this.isRendered = true;
            hideSpinner(this.parent.element);
            if (this.parent.selectedItems.length) {
                this.checkItem();
            }
        }
    }
    comparer(x, y) {
        if (this.parent.sortOrder === 'Descending') {
            const z = x;
            x = y;
            y = z;
        }
        return this.parent.sortComparer(x, y);
    }
    preventImgDrag() {
        let i = 0;
        while (i < this.itemList.length) {
            if (this.itemList[i].querySelector('img')) {
                /* istanbul ignore next */
                this.itemList[i].ondragstart = () => { return false; };
            }
            i++;
        }
    }
    createDragObj() {
        if (this.listObj) {
            if (this.parent.allowDragAndDrop) {
                if (this.dragObj) {
                    this.dragObj.destroy();
                }
                this.dragObj = new Draggable(this.listElements, {
                    enableTailMode: true,
                    distance: 5,
                    enableAutoScroll: false,
                    dragTarget: '.' + LARGE_ICON,
                    helper: this.dragHelper.bind(this),
                    cursorAt: this.parent.dragCursorPosition,
                    dragArea: this.parent.element,
                    dragStop: dragStopHandler.bind(this, this.parent),
                    drag: draggingHandler.bind(this, this.parent),
                    clone: true,
                    dragStart: (args) => {
                        dragStartHandler(this.parent, args, this.dragObj);
                    }
                });
            }
            else if (this.dragObj && !this.parent.allowDragAndDrop) {
                this.dragObj.destroy();
            }
        }
    }
    dragHelper(args) {
        const dragTarget = args.sender.target;
        const dragLi = closest(dragTarget, '.e-list-item');
        if (!dragLi) {
            return null;
        }
        if (dragLi && !dragLi.classList.contains('e-active')) {
            this.setFocus(dragLi);
        }
        const activeEle = this.element.querySelectorAll('.' + ACTIVE);
        this.parent.activeElements = [];
        this.parent.dragData = [];
        for (let i = 0; i < activeEle.length; i++) {
            this.parent.dragData.push(this.getItemObject(activeEle[parseInt(i.toString(), 10)]));
            this.parent.activeElements.push(activeEle[i]);
        }
        getModule(this.parent, dragLi);
        this.parent.dragPath = this.parent.path;
        createVirtualDragElement(this.parent);
        return this.parent.virtualDragElement;
    }
    onDropInit(args) {
        if (this.parent.targetModule === this.getModuleName()) {
            const dropLi = closest(args.target, '.e-list-item');
            const cwdData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            if (dropLi) {
                const info = this.getItemObject(dropLi);
                this.parent.dropPath = info.isFile ? this.parent.path : getFullPath(this.parent, info, this.parent.path);
                this.parent.dropData = info.isFile ? cwdData : info;
            }
            else {
                this.parent.dropPath = this.parent.path;
                this.parent.dropData = cwdData;
            }
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    getModuleName() {
        return 'largeiconsview';
    }
    onItemCreated(args) {
        args.item.removeAttribute('aria-level');
        if (!this.parent.showFileExtension && getValue('isFile', args.curData)) {
            const textEle = args.item.querySelector('.' + LIST_TEXT);
            const txt = getValue('name', args.curData);
            const type = getValue('type', args.curData);
            if (txt.indexOf(type) !== -1) {
                textEle.innerHTML = txt.substr(0, txt.length - type.length);
            }
        }
        this.renderCheckbox(args);
        const eventArgs = {
            element: args.item,
            fileDetails: args.curData,
            module: 'LargeIconsView'
        };
        this.parent.trigger('fileLoad', eventArgs);
    }
    renderCheckbox(args) {
        if (!this.parent.showItemCheckBoxes) {
            return;
        }
        const checkElement = createCheckBox(createElement, false, {
            checked: false,
            cssClass: 'e-small'
        });
        checkElement.setAttribute('role', 'checkbox');
        checkElement.setAttribute('aria-checked', 'false');
        checkElement.setAttribute('aria-label', 'checkbox');
        args.item.firstElementChild.insertBefore(checkElement, args.item.firstElementChild.childNodes[0]);
    }
    onLayoutChange(args) {
        if (this.parent.view === 'LargeIcons') {
            this.destroy();
            if (this.parent.enableVirtualization) {
                this.parent.setProperties({ selectedItems: [] }, true);
            }
            this.render(args);
            /* istanbul ignore next */
            if (getValue('name', args) === 'layout-change' && this.parent.fileAction === 'move' &&
                this.parent.isCut && this.parent.selectedNodes && this.parent.selectedNodes.length !== 0) {
                const indexes = this.getIndexes(this.parent.selectedNodes);
                let length = 0;
                while (length < indexes.length) {
                    addBlur(this.itemList[indexes[length]]);
                    length++;
                }
            }
            const activeEle = this.element.querySelectorAll('.' + ACTIVE);
            if (activeEle.length !== 0) {
                this.element.focus();
            }
            this.checkItem();
            this.parent.isLayoutChange = false;
        }
        else {
            this.element.setAttribute('tabindex', '-1');
        }
    }
    checkItem() {
        const checkEle = this.element.querySelectorAll('.' + ACTIVE);
        if (checkEle) {
            let checkLength = 0;
            while (checkLength < checkEle.length) {
                this.checkState(checkEle[checkLength], true);
                checkLength++;
            }
        }
    }
    renderList(args) {
        let i = 0;
        const items = JSON.parse(JSON.stringify(args.files));
        while (i < items.length) {
            const icon = fileType(items[i]);
            const name = getValue('name', items[i]);
            const selected = getItemName(this.parent, items[i]);
            let className = ((this.parent.selectedItems &&
                this.parent.selectedItems.indexOf(selected) !== -1)) ?
                LARGE_ICON + ' e-active' : LARGE_ICON;
            if (!hasEditAccess(items[i])) {
                className += ' ' + getAccessClass(items[i]);
            }
            if (icon === ICON_IMAGE && this.parent.showThumbnail && hasReadAccess(items[i])) {
                const imgUrl = getImageUrl(this.parent, items[i]);
                setValue('_fm_imageUrl', imgUrl, items[i]);
                setValue('_fm_imageAttr', { alt: name }, items[i]);
            }
            else {
                setValue('_fm_icon', icon, items[i]);
            }
            setValue('_fm_htmlAttr', { class: className, title: name }, items[i]);
            i++;
        }
        return items;
    }
    onFinalizeEnd(args) {
        this.render(args);
    }
    onCreateEnd(args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
        this.clearSelect();
        this.selectItems([getValue(this.parent.hasId ? 'id' : 'name', this.parent.createdItem)]);
        this.parent.createdItem = null;
        this.parent.largeiconsviewModule.element.focus();
        this.parent.activeModule = 'largeiconsview';
    }
    onSelectedData() {
        if (this.parent.activeModule === 'largeiconsview') {
            this.updateSelectedData();
        }
    }
    onDeleteInit() {
        if (this.parent.activeModule === 'largeiconsview') {
            Delete(this.parent, this.parent.selectedItems, this.parent.path, 'delete');
        }
    }
    /* istanbul ignore next */
    onDeleteEnd(args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
        this.parent.setProperties({ selectedItems: [] }, true);
        this.clearSelect();
    }
    onRefreshEnd(args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
    }
    onRenameInit() {
        if (this.parent.activeModule === 'largeiconsview' && this.parent.selectedItems.length === 1) {
            this.updateRenameData();
        }
    }
    onPathChanged(args) {
        this.parent.isCut = false;
        /* istanbul ignore next */
        if (this.parent.breadcrumbbarModule.searchObj.element.value === '') {
            this.parent.searchedItems = [];
        }
        if (this.parent.view === 'LargeIcons') {
            removeBlur(this.parent);
            this.parent.setProperties({ selectedItems: [] }, true);
            this.onLayoutChange(args);
            if (this.parent.renamedItem && this.parent.activeModule === 'largeiconsview') {
                this.clearSelect();
                this.addSelection(this.parent.renamedItem);
            }
        }
    }
    onOpenInit(args) {
        if (this.parent.activeModule === 'largeiconsview') {
            this.doOpenAction(args.target);
        }
    }
    onHideLayout() {
        if (this.parent.view !== 'LargeIcons' && this.element) {
            this.element.classList.add(DISPLAY_NONE);
        }
    }
    onSelectAllInit() {
        if (this.parent.view === 'LargeIcons') {
            this.startItem = this.getFirstItem();
            const lastItem = this.getLastItem();
            const eveArgs = { ctrlKey: true, shiftKey: true };
            this.doSelection(lastItem, eveArgs);
            this.isInteraction = true;
            this.isInteracted = true;
        }
    }
    onClearAllInit() {
        if (this.parent.view === 'LargeIcons') {
            this.clearSelection();
            this.isInteraction = true;
            this.isInteracted = true;
        }
    }
    onBeforeRequest() {
        this.isRendered = false;
    }
    onAfterRequest() {
        this.isRendered = true;
    }
    /* istanbul ignore next */
    onSearch(args) {
        if (this.parent.view === 'LargeIcons') {
            this.parent.setProperties({ selectedItems: [] }, true);
            this.parent.notify(selectionChanged, {});
            this.parent.searchedItems = args.files;
            this.onLayoutChange(args);
        }
    }
    onLayoutRefresh() {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
    }
    onUpdateSelectionData() {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.updateSelectedData();
    }
    onPathColumn() {
        if (this.parent.view === 'LargeIcons' && !isNullOrUndefined(this.listObj) &&
            this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered
            && this.parent.sortBy === 'filterPath') {
            this.parent.sortBy = 'name';
            this.parent.notify(sortByChange, {});
        }
    }
    removeEventListener() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(pathColumn, this.onPathColumn);
        this.parent.off(finalizeEnd, this.onFinalizeEnd);
        this.parent.off(createEnd, this.onCreateEnd);
        this.parent.off(selectedData, this.onSelectedData);
        this.parent.off(deleteInit, this.onDeleteInit);
        this.parent.off(deleteEnd, this.onDeleteEnd);
        this.parent.off(refreshEnd, this.onRefreshEnd);
        this.parent.off(pathChanged, this.onPathChanged);
        this.parent.off(layoutChange, this.onLayoutChange);
        this.parent.off(search, this.onSearch);
        this.parent.off(openInit, this.onOpenInit);
        this.parent.off(openEnd, this.onPathChanged);
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.parent.off(methodCall, this.onMethodCall);
        this.parent.off(actionFailure, this.onActionFailure);
        this.parent.off(renameInit, this.onRenameInit);
        this.parent.off(renameEnd, this.onPathChanged);
        this.parent.off(hideLayout, this.onHideLayout);
        this.parent.off(selectAllInit, this.onSelectAllInit);
        this.parent.off(clearAllInit, this.onClearAllInit);
        this.parent.off(menuItemData, this.onMenuItemData);
        this.parent.off(beforeRequest, this.onBeforeRequest);
        this.parent.off(afterRequest, this.onAfterRequest);
        this.parent.off(splitterResize, this.splitterResizeHandler);
        this.parent.off(resizeEnd, this.resizeHandler);
        this.parent.off(pasteInit, this.onpasteInit);
        this.parent.off(pasteEnd, this.onpasteEnd);
        this.parent.off(cutCopyInit, this.oncutCopyInit);
        this.parent.off(dropInit, this.onDropInit);
        this.parent.off(detailsInit, this.onDetailsInit);
        this.parent.off(layoutRefresh, this.onLayoutRefresh);
        this.parent.off(dropPath, this.onDropPath);
        this.parent.off(updateSelectionData, this.onUpdateSelectionData);
        this.parent.off(filterEnd, this.onPathChanged);
    }
    addEventListener() {
        this.parent.on(pathColumn, this.onPathColumn, this);
        this.parent.on(finalizeEnd, this.onFinalizeEnd, this);
        this.parent.on(createEnd, this.onCreateEnd, this);
        this.parent.on(refreshEnd, this.onRefreshEnd, this);
        this.parent.on(selectedData, this.onSelectedData, this);
        this.parent.on(pathChanged, this.onPathChanged, this);
        this.parent.on(deleteInit, this.onDeleteInit, this);
        this.parent.on(pasteInit, this.onpasteInit, this);
        this.parent.on(deleteEnd, this.onDeleteEnd, this);
        this.parent.on(layoutChange, this.onLayoutChange, this);
        this.parent.on(search, this.onSearch, this);
        this.parent.on(openInit, this.onOpenInit, this);
        this.parent.on(renameInit, this.onRenameInit, this);
        this.parent.on(renameEnd, this.onPathChanged, this);
        this.parent.on(openEnd, this.onPathChanged, this);
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.parent.on(methodCall, this.onMethodCall, this);
        this.parent.on(actionFailure, this.onActionFailure, this);
        this.parent.on(hideLayout, this.onHideLayout, this);
        this.parent.on(selectAllInit, this.onSelectAllInit, this);
        this.parent.on(clearAllInit, this.onClearAllInit, this);
        this.parent.on(menuItemData, this.onMenuItemData, this);
        this.parent.on(beforeRequest, this.onBeforeRequest, this);
        this.parent.on(afterRequest, this.onAfterRequest, this);
        this.parent.on(dropInit, this.onDropInit, this);
        this.parent.on(detailsInit, this.onDetailsInit, this);
        this.parent.on(splitterResize, this.splitterResizeHandler, this);
        this.parent.on(resizeEnd, this.resizeHandler, this);
        this.parent.on(pasteEnd, this.onpasteEnd, this);
        this.parent.on(cutCopyInit, this.oncutCopyInit, this);
        this.parent.on(layoutRefresh, this.onLayoutRefresh, this);
        this.parent.on(dropPath, this.onDropPath, this);
        this.parent.on(updateSelectionData, this.onUpdateSelectionData, this);
        this.parent.on(filterEnd, this.onPathChanged, this);
    }
    onActionFailure() { this.isInteraction = true; this.isInteracted = true; }
    onMenuItemData(args) {
        if (this.parent.activeModule === this.getModuleName()) {
            const ele = closest(args.target, 'li');
            this.parent.itemData = [this.getItemObject(ele)];
        }
    }
    onDetailsInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            if (this.parent.selectedItems.length !== 0) {
                this.updateSelectedData();
            }
            else {
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
            }
        }
    }
    onpasteInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = (this.parent.folderPath === '') ? [getPathObject(this.parent)] :
                [this.getItemObject(select('.e-active', this.element))];
        }
    }
    oncutCopyInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            const activeEle = this.element.querySelectorAll('.' + ACTIVE);
            this.parent.activeRecords = [];
            this.parent.activeElements = [];
            for (let i = 0; i < activeEle.length; i++) {
                this.parent.activeElements.push(activeEle[i]);
                this.parent.activeRecords.push(this.getItemObject(activeEle[i]));
            }
        }
    }
    onpasteEnd(args) {
        if (this.parent.view === 'LargeIcons') {
            this.isPasteOperation = true;
            if (this.parent.path === this.parent.destinationPath ||
                this.parent.path === getDirectoryPath(this.parent, args) || this.parent.hasId) {
                this.onPathChanged(args);
            }
        }
    }
    onDropPath(args) {
        if (this.parent.view === 'LargeIcons') {
            this.isPasteOperation = true;
            this.onPathChanged(args);
        }
    }
    onPropertyChanged(e) {
        let currentSelected;
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
            switch (prop) {
                case 'allowDragAndDrop':
                    this.createDragObj();
                    break;
                case 'selectedItems':
                    this.isInteraction = false;
                    this.isInteracted = false;
                    currentSelected = isNullOrUndefined(this.parent.selectedItems) ? [] : this.parent.selectedItems.slice(0);
                    currentSelected = this.parent.allowMultiSelection ? currentSelected :
                        currentSelected.slice(currentSelected.length - 1);
                    this.parent.setProperties({ selectedItems: [] }, true);
                    this.onClearAllInit();
                    if (currentSelected.length) {
                        this.selectItems(currentSelected);
                    }
                    this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
                    this.isInteraction = true;
                    this.isInteracted = true;
                    break;
                case 'showThumbnail':
                    refresh(this.parent);
                    break;
                case 'showFileExtension':
                    read(this.parent, pathChanged, this.parent.path);
                    break;
                case 'showHiddenItems':
                    read(this.parent, pathChanged, this.parent.path);
                    break;
                case 'allowMultiSelection':
                case 'showItemCheckBoxes':
                    if (this.parent.view !== 'LargeIcons') {
                        break;
                    }
                    refresh(this.parent);
                    break;
                case 'view':
                    updateLayout(this.parent, 'LargeIcons');
                    break;
            }
        }
    }
    destroy() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.listObj) {
            this.unWireEvents();
        }
        this.startItem = null;
        this.listElements = null;
    }
    wireEvents() {
        this.wireClickEvent(true);
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keyup'
        });
        this.keyboardDownModule = new KeyboardEvents(this.element, {
            keyAction: this.keydownActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        EventHandler.add(this.element, 'mouseover', this.onMouseOver, this);
    }
    unWireEvents() {
        this.wireClickEvent(false);
        EventHandler.remove(this.element, 'mouseover', this.onMouseOver);
        this.keyboardModule.destroy();
        this.keyboardDownModule.destroy();
    }
    /* istanbul ignore next */
    onMouseOver(e) {
        const targetEle = closest(e.target, '.e-list-item');
        removeBlur(this.parent, 'hover');
        if (targetEle !== null) {
            targetEle.classList.add(HOVER);
        }
    }
    wireClickEvent(toBind) {
        if (toBind) {
            this.clickObj = new Touch(this.element, {
                tap: (eve) => {
                    if (this.parent.isDevice) {
                        this.tapCount = eve.tapCount;
                        this.tapEvent = eve;
                        setTimeout(() => {
                            if (this.tapCount > 0) {
                                this.doTapAction(this.tapEvent);
                            }
                            this.tapCount = 0;
                        }, 350);
                    }
                    else {
                        if (eve.tapCount === 2 && eve.originalEvent.which !== 3) {
                            this.dblClickHandler(eve);
                        }
                        else {
                            this.clickHandler(eve);
                        }
                    }
                },
                tapHold: (e) => {
                    if (this.parent.isDevice) {
                        this.multiSelect = this.parent.allowMultiSelection ? true : false;
                        if (this.parent.allowMultiSelection) {
                            addClass([this.parent.element], MULTI_SELECT);
                        }
                        this.clickHandler(e);
                    }
                }
            });
        }
        else {
            if (this.clickObj) {
                this.clickObj.destroy();
            }
        }
    }
    doTapAction(eve) {
        const target = eve.originalEvent.target;
        const item = closest(target, '.' + LIST_ITEM);
        if (this.multiSelect || target.classList.contains(LIST_PARENT) || isNullOrUndefined(item)) {
            this.clickHandler(eve);
        }
        else {
            this.parent.isFile = false;
            this.updateType(item);
            if (!this.parent.isFile) {
                this.dblClickHandler(eve);
            }
            else if (eve.tapCount === 2) {
                this.clickHandler(eve);
                this.dblClickHandler(eve);
            }
            else {
                this.clickHandler(eve);
            }
        }
    }
    clickHandler(e) {
        const target = e.originalEvent.target;
        removeBlur(this.parent, 'hover');
        this.doSelection(target, e.originalEvent);
        this.parent.activeModule = 'largeiconsview';
    }
    /**
     *
     * @param {Element} target - specifies the target element.
     * @param {TouchEventArgs | MouseEventArgs | KeyboardEventArgs} e - specifies event arguements.
     * @returns {void}
     * @hidden
     */
    doSelection(target, e) {
        const ctrlKey = this.parent.isMac ? e.metaKey : e.ctrlKey;
        const isMacRightClick = this.parent.isMac && e.ctrlKey && e.shiftKey;
        const item = closest(target, '.' + LIST_ITEM);
        const cList = target.classList;
        this.parent.isFile = false;
        let action = 'select';
        if ((e.which === 3 || isMacRightClick) && !isNullOrUndefined(item) && item.classList.contains(ACTIVE)) {
            this.addActive(item);
            this.updateType(item);
            return;
        }
        else if (!isNullOrUndefined(item)) {
            if (this.parent.allowMultiSelection && item.classList.contains(ACTIVE)
                && (ctrlKey || target.classList.contains(CHECK))) {
                action = 'unselect';
            }
            if (ctrlKey && e.shiftKey && !isMacRightClick) {
                this.isSelectAllCalled = true;
            }
            const fileSelectionArgs = this.triggerSelection(action, item);
            if (fileSelectionArgs.cancel !== true) {
                if ((!this.parent.allowMultiSelection || (!this.multiSelect && (e && !ctrlKey)))
                    && !cList.contains(FRAME)) {
                    this.updateType(item);
                    this.clearSelect();
                }
                if (this.parent.allowMultiSelection && e.shiftKey && !isMacRightClick) {
                    if (!(e && ctrlKey)) {
                        this.clearSelect();
                    }
                    if (!this.startItem) {
                        this.startItem = item;
                    }
                    const startIndex = this.itemList.indexOf(this.startItem);
                    const endIndex = this.itemList.indexOf(item);
                    if (startIndex > endIndex) {
                        for (let i = startIndex; i >= endIndex; i--) {
                            this.addActive(this.itemList[i]);
                        }
                    }
                    else {
                        for (let i = startIndex; i <= endIndex; i++) {
                            this.addActive(this.itemList[i]);
                        }
                    }
                    this.addFocus(this.itemList[endIndex]);
                }
                else {
                    this.startItem = item;
                    if (this.parent.allowMultiSelection && item.classList.contains(ACTIVE)) {
                        this.removeActive(item);
                    }
                    else {
                        this.addActive(item);
                    }
                    this.addFocus(item);
                }
                if (this.parent.selectedItems.length === 0) {
                    this.resetMultiSelect();
                }
                this.parent.notify(selectionChanged, {});
                this.triggerSelect(action, item);
            }
        }
        else {
            if (this.parent.selectedItems.length === this.itemList.length) {
                this.isSelectAllCalled = true;
            }
            this.clearSelection();
        }
        if (!isNullOrUndefined(item)) {
            this.isSelectAllCalled = false;
            this.updateType(item);
        }
    }
    dblClickHandler(e) {
        this.parent.activeModule = 'largeiconsview';
        const target = e.originalEvent.target;
        this.doOpenAction(target);
    }
    clearSelection() {
        this.clearSelect();
        this.resetMultiSelect();
        this.parent.notify(selectionChanged, {});
    }
    resetMultiSelect() {
        this.multiSelect = false;
        removeClass([this.parent.element], MULTI_SELECT);
    }
    doOpenAction(target) {
        if (isNullOrUndefined(target)) {
            return;
        }
        const item = closest(target, '.' + LIST_ITEM);
        this.parent.isFile = false;
        if (!isNullOrUndefined(item)) {
            this.updateType(item);
            const details = this.getItemObject(item);
            if (!hasReadAccess(details)) {
                createDeniedDialog(this.parent, details, permissionRead);
                return;
            }
            const eventArgs = { cancel: false, fileDetails: details, module: 'LargeIconsView' };
            this.parent.trigger('fileOpen', eventArgs, (fileOpenArgs) => {
                if (!fileOpenArgs.cancel) {
                    const text = getValue('name', details);
                    if (!this.parent.isFile) {
                        const val = this.parent.breadcrumbbarModule.searchObj.element.value;
                        if (val === '' && !this.parent.isFiltered) {
                            const id = getValue('id', details);
                            this.parent.oldPath = this.parent.path;
                            const newPath = this.parent.path + (isNullOrUndefined(id) ? text : id) + '/';
                            this.parent.setProperties({ path: newPath }, true);
                            this.parent.pathNames.push(text);
                            this.parent.pathId.push(getValue('_fm_id', details));
                            this.parent.itemData = [details];
                            openAction(this.parent);
                        }
                        else {
                            openSearchFolder(this.parent, details);
                        }
                        this.parent.isFiltered = false;
                        this.parent.setProperties({ selectedItems: [] }, true);
                    }
                    else {
                        const icon = fileType(details);
                        if (icon === ICON_IMAGE) {
                            const imgUrl = getImageUrl(this.parent, details);
                            createImageDialog(this.parent, text, imgUrl);
                        }
                    }
                }
            });
        }
    }
    updateType(item) {
        const folder = select('.' + FOLDER, item);
        this.parent.isFile = isNullOrUndefined(folder) ? true : false;
    }
    /* istanbul ignore next */
    keydownActionHandler(e) {
        if (!this.isRendered) {
            return;
        }
        switch (e.action) {
            case 'end':
            case 'home':
            case 'moveDown':
            case 'moveLeft':
            case 'moveRight':
            case 'moveUp':
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
            case 'ctrlRight':
            case 'shiftRight':
            case 'csRight':
            case 'space':
            case 'ctrlSpace':
            case 'shiftSpace':
            case 'csSpace':
            case 'ctrlA':
            case 'enter':
            case 'altEnter':
            case 'esc':
            case 'del':
            case 'shiftdel':
            case 'ctrlC':
            case 'ctrlV':
            case 'ctrlX':
            case 'f2':
            case 'ctrlD':
                e.preventDefault();
                break;
        }
    }
    /* istanbul ignore next */
    keyActionHandler(e) {
        if (!this.isRendered) {
            return;
        }
        const fItem = this.getFocusedItem();
        const firstItem = this.getFirstItem();
        const lastItem = this.getLastItem();
        switch (e.action) {
            case 'end':
                if (this.parent.enableVirtualization) {
                    this.clearSelect();
                    this.element.firstElementChild.scrollTo(0, this.element.firstElementChild.scrollHeight);
                    setTimeout(() => {
                        this.navigateItem(this.itemList[this.itemList.length - 1]);
                    }, 10);
                }
                else {
                    this.navigateItem(lastItem);
                }
                break;
            case 'home':
                if (this.parent.enableVirtualization) {
                    this.clearSelect();
                    this.element.firstElementChild.scrollTop = 0;
                    setTimeout(() => {
                        this.navigateItem(this.itemList[0]);
                    }, 10);
                }
                else {
                    this.navigateItem(firstItem);
                }
                break;
            case 'tab':
                if (!isNullOrUndefined(fItem)) {
                    this.addFocus(fItem);
                }
                else if (!isNullOrUndefined(firstItem)) {
                    this.addFocus(firstItem);
                }
                break;
            case 'moveDown':
                this.navigateDown(fItem, true);
                break;
            case 'moveLeft':
                this.navigateRight(fItem, false);
                break;
            case 'moveRight':
                this.navigateRight(fItem, true);
                break;
            case 'moveUp':
                this.navigateDown(fItem, false);
                break;
            case 'ctrlEnd':
            case 'shiftEnd':
            case 'csEnd':
                this.csEndKey(lastItem, e);
                break;
            case 'ctrlHome':
            case 'shiftHome':
            case 'csHome':
                this.csHomeKey(firstItem, e);
                break;
            case 'ctrlDown':
            case 'shiftDown':
            case 'csDown':
                this.csDownKey(fItem, e);
                break;
            case 'ctrlLeft':
            case 'shiftLeft':
            case 'csLeft':
                this.csLeftKey(fItem, e);
                break;
            case 'ctrlRight':
            case 'shiftRight':
            case 'csRight':
                this.csRightKey(fItem, e);
                break;
            case 'ctrlUp':
            case 'shiftUp':
            case 'csUp':
                this.csUpKey(fItem, e);
                break;
            case 'space':
                this.spaceKey(fItem);
                break;
            case 'ctrlSpace':
            case 'shiftSpace':
            case 'csSpace':
                if (!isNullOrUndefined(fItem)) {
                    this.doSelection(fItem, e);
                }
                break;
            case 'ctrlA':
                this.ctrlAKey(firstItem, lastItem);
                break;
            case 'enter':
                this.doOpenAction(this.parent.visitedItem ? this.parent.visitedItem : this.getVisitedItem());
                break;
            case 'altEnter':
                this.parent.notify(detailsInit, {});
                GetDetails(this.parent, this.parent.selectedItems, this.parent.path, 'details');
                break;
            case 'esc':
                removeActive(this.parent);
                break;
            case 'del':
            case 'shiftdel':
                this.performDelete();
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
            case 'f2':
                this.performRename();
                break;
            case 'ctrlD':
                this.doDownload();
                break;
            case 'back':
                this.parent.traverseBackward();
                break;
        }
    }
    doDownload() {
        this.updateSelectedData();
        doDownload(this.parent);
    }
    performDelete() {
        if (this.parent.selectedItems && this.parent.selectedItems.length > 0) {
            this.updateSelectedData();
            const data = this.parent.itemData;
            for (let i = 0; i < data.length; i++) {
                if (!hasEditAccess(data[i])) {
                    createDeniedDialog(this.parent, data[i], permissionEdit);
                    return;
                }
            }
            createDialog(this.parent, 'Delete');
        }
    }
    performRename() {
        if (this.parent.selectedItems.length === 1) {
            this.updateRenameData();
            doRename(this.parent);
        }
    }
    updateRenameData() {
        const item = select('.' + LIST_ITEM + '.' + ACTIVE, this.element);
        const data = this.getItemObject(item);
        updateRenamingData(this.parent, data);
    }
    getVisitedItem() {
        const item = this.parent.selectedItems[this.parent.selectedItems.length - 1];
        const indexes = this.getIndexes([item], this.parent.hasId);
        return this.itemList[indexes[0]];
    }
    getFocusedItem() {
        return select('.' + LIST_ITEM + '.' + FOCUS, this.element);
    }
    getActiveItem() {
        return select('.' + LIST_ITEM + '.' + ACTIVE, this.element);
    }
    getFirstItem() {
        return this.itemList[0];
    }
    getLastItem() {
        return this.itemList[this.itemList.length - 1];
    }
    navigateItem(item) {
        this.setFocus(item);
    }
    navigateDown(fItem, isTowards) {
        const nItem = this.getNextItem(fItem, isTowards, this.perRow);
        this.setFocus(nItem);
    }
    navigateRight(fItem, isTowards) {
        const nItem = this.getNextItem(fItem, isTowards);
        this.setFocus(nItem);
    }
    getNextItem(li, isTowards, perRow) {
        if (isNullOrUndefined(li)) {
            return this.getFocusedItem() || this.getActiveItem() || this.getFirstItem();
        }
        let index = this.itemList.indexOf(li);
        let nextItem;
        do {
            if (isTowards) {
                index = perRow ? index + perRow : index + 1;
            }
            else {
                index = perRow ? index - perRow : index - 1;
            }
            nextItem = this.itemList[index];
            if (this.parent.enableVirtualization && isNullOrUndefined(nextItem)) {
                const marginValue = parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-top'), 10) +
                    parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-bottom'), 10);
                const scrollHeight = this.itemList[0].getBoundingClientRect().height + marginValue;
                this.element.firstElementChild.scrollTo(this.element.firstElementChild.scrollTop, this.element.firstElementChild.scrollTop + scrollHeight);
            }
            if (isNullOrUndefined(nextItem)) {
                return li;
            }
        } while (!isVisible(nextItem));
        return nextItem;
    }
    setFocus(nextItem) {
        if (!isNullOrUndefined(nextItem)) {
            const fileSelectionArgs = this.triggerSelection('select', nextItem);
            if (fileSelectionArgs.cancel !== true) {
                this.startItem = nextItem;
                this.clearSelect();
                this.addActive(nextItem);
                this.addFocus(nextItem);
                this.parent.notify(selectionChanged, {});
                this.triggerSelect('select', nextItem);
            }
        }
    }
    spaceKey(fItem) {
        if (!isNullOrUndefined(fItem) && !fItem.classList.contains(ACTIVE)) {
            const fileSelectionArgs = this.triggerSelection('select', fItem);
            if (fileSelectionArgs.cancel !== true) {
                this.addActive(fItem);
                this.parent.notify(selectionChanged, {});
                this.triggerSelect('select', fItem);
            }
        }
    }
    ctrlAKey(firstItem, lastItem) {
        if (this.parent.allowMultiSelection && !isNullOrUndefined(firstItem)) {
            this.startItem = firstItem;
            const eveArgs = { ctrlKey: true, shiftKey: true };
            const liParent = this.element.querySelector('.' + LIST_PARENT);
            const liScrPos = liParent.scrollTop;
            const getCurFocusedItem = this.getFocusedItem();
            this.doSelection(lastItem, eveArgs);
            liParent.scrollTop = liScrPos;
            if (!isNullOrUndefined(getCurFocusedItem)) {
                this.addFocus(getCurFocusedItem);
            }
        }
    }
    csEndKey(lastItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateItem(lastItem);
        }
        else if (!isNullOrUndefined(lastItem)) {
            if (e.action === 'ctrlEnd') {
                this.addFocus(lastItem);
            }
            else {
                this.doSelection(lastItem, e);
            }
        }
    }
    csHomeKey(firstItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateItem(firstItem);
        }
        else if (!isNullOrUndefined(firstItem)) {
            if (e.action === 'ctrlHome') {
                this.addFocus(firstItem);
            }
            else {
                this.doSelection(firstItem, e);
            }
        }
    }
    csDownKey(fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateDown(fItem, true);
        }
        else {
            const dItem = this.getNextItem(fItem, true, this.perRow);
            if (!isNullOrUndefined(dItem)) {
                if (e.action === 'ctrlDown') {
                    this.addFocus(dItem);
                }
                else {
                    this.doSelection(dItem, e);
                }
            }
        }
    }
    csLeftKey(fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateRight(fItem, false);
        }
        else {
            const lItem = this.getNextItem(fItem, false);
            if (!isNullOrUndefined(lItem)) {
                if (e.action === 'ctrlLeft') {
                    this.addFocus(lItem);
                }
                else {
                    this.doSelection(lItem, e);
                }
            }
        }
    }
    csRightKey(fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateRight(fItem, true);
        }
        else {
            const rItem = this.getNextItem(fItem, true);
            if (!isNullOrUndefined(rItem)) {
                if (e.action === 'ctrlRight') {
                    this.addFocus(rItem);
                }
                else {
                    this.doSelection(rItem, e);
                }
            }
        }
    }
    csUpKey(fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateDown(fItem, false);
        }
        else {
            const uItem = this.getNextItem(fItem, false, this.perRow);
            if (!isNullOrUndefined(uItem)) {
                if (e.action === 'ctrlUp') {
                    this.addFocus(uItem);
                }
                else {
                    this.doSelection(uItem, e);
                }
            }
        }
    }
    addActive(nextItem) {
        if (!isNullOrUndefined(nextItem)) {
            if (!nextItem.classList.contains(ACTIVE)) {
                this.parent.selectedItems.push(this.getDataName(nextItem));
                this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
                addClass([nextItem], [ACTIVE]);
                nextItem.setAttribute('aria-selected', 'true');
                this.checkState(nextItem, true);
            }
            this.parent.visitedItem = nextItem;
        }
    }
    removeActive(preItem) {
        if (!isNullOrUndefined(preItem)) {
            removeClass([preItem], [ACTIVE]);
            if (this.parent.allowMultiSelection) {
                preItem.setAttribute('aria-selected', 'false');
            }
            else {
                preItem.removeAttribute('aria-selected');
            }
            this.checkState(preItem, false);
            const index = this.parent.selectedItems.indexOf(this.getDataName(preItem));
            if (index > -1) {
                this.parent.selectedItems.splice(index, 1);
                this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
            }
            this.parent.visitedItem = null;
        }
    }
    getDataName(item) {
        const data = this.getItemObject(item);
        return getItemName(this.parent, data);
    }
    addFocus(item) {
        this.element.setAttribute('tabindex', '-1');
        const fItem = this.getFocusedItem();
        if (fItem) {
            fItem.removeAttribute('tabindex');
            removeClass([fItem], [FOCUS]);
        }
        addClass([item], [FOCUS]);
        item.setAttribute('tabindex', '0');
        item.focus();
    }
    checkState(item, toCheck) {
        if (!this.parent.showItemCheckBoxes) {
            return;
        }
        const checkEle = select('.' + FRAME, item);
        if (isNullOrUndefined(checkEle)) {
            return;
        }
        if (toCheck) {
            if (!checkEle.classList.contains(CHECK)) {
                addClass([checkEle], CHECK);
                closest(checkEle, '.' + CB_WRAP).setAttribute('aria-checked', 'true');
            }
        }
        else {
            if (checkEle.classList.contains(CHECK)) {
                removeClass([checkEle], CHECK);
                closest(checkEle, '.' + CB_WRAP).setAttribute('aria-checked', 'false');
            }
        }
    }
    clearSelect() {
        const eles = Array.prototype.slice.call(selectAll('.' + ACTIVE, this.listElements));
        let fileSelectionArgs;
        if (eles.length !== 0) {
            fileSelectionArgs = this.triggerSelection('unselect', eles[0]);
            if (fileSelectionArgs.cancel !== true) {
                for (let i = 0, len = eles.length; i < len; i++) {
                    this.removeActive(eles[i]);
                }
            }
            this.triggerSelect('unselect', eles[0]);
        }
    }
    resizeHandler() {
        this.getItemCount();
    }
    splitterResizeHandler() {
        this.getItemCount();
    }
    getItemCount() {
        let perRow = 1;
        if (this.itemList) {
            for (let i = 0, len = this.itemList.length - 1; i < len; i++) {
                if (this.itemList[i].getBoundingClientRect().top === this.itemList[i + 1].getBoundingClientRect().top) {
                    perRow++;
                }
                else {
                    break;
                }
            }
        }
        this.perRow = perRow;
    }
    triggerSelection(action, item) {
        const data = [];
        if (this.isSelectAllCalled) {
            for (let i = 0, len = this.itemList.length; i < len; i++) {
                data[i] = this.getItemObject(this.itemList[i]);
            }
        }
        else {
            data[0] = this.getItemObject(item);
        }
        const eventArgs = { action: action, fileDetails: data.length > 1
                ? data : data[0], isInteracted: this.isInteraction, cancel: false, target: this.isSelectAllCalled ? null
                : item
        };
        this.parent.trigger('fileSelection', eventArgs);
        this.isInteraction = true;
        return eventArgs;
    }
    triggerSelect(action, item) {
        const data = [];
        if (this.isSelectAllCalled) {
            for (let i = 0, len = this.itemList.length; i < len; i++) {
                data[i] = this.getItemObject(this.itemList[i]);
            }
            this.isSelectAllCalled = false;
        }
        else {
            data[0] = this.getItemObject(item);
        }
        this.parent.visitedData = data.length > 1 ? data[data.length - 1] : data[0];
        const eventArgs = { action: action, fileDetails: data.length > 1
                ? data
                : data[0], isInteracted: this.isInteracted };
        this.parent.trigger('fileSelect', eventArgs);
        this.isInteracted = true;
    }
    selectItems(items) {
        const indexes = this.getIndexes(items, this.parent.hasId);
        for (let j = 0, len = indexes.length; j < len; j++) {
            const eveArgs = { ctrlKey: true, shiftKey: false };
            this.doSelection(this.itemList[indexes[j]], eveArgs);
        }
    }
    getIndexes(items, byId) {
        const indexes = [];
        const filter = byId ? 'id' : 'name';
        for (let i = 0, len = this.items.length; i < len; i++) {
            if (items.indexOf(getValue(filter, this.items[i])) !== -1) {
                indexes.push(i);
            }
        }
        return indexes;
    }
    getItemObject(item) {
        const index = this.itemList.indexOf(item);
        return this.items[index];
    }
    addSelection(data) {
        let resultData = [];
        if (this.parent.hasId) {
            resultData = new DataManager(this.items).
                executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
        }
        else {
            const newData = new DataManager(this.items).
                executeLocal(new Query().where('name', 'equal', getValue('name', data), false));
            if (newData.length > 0) {
                resultData = new DataManager(newData).
                    executeLocal(new Query().where('filterPath', 'equal', this.parent.filterPath, false));
            }
        }
        if (resultData.length > 0) {
            const index = this.items.indexOf(resultData[0]);
            const eveArgs = { ctrlKey: true, shiftKey: false };
            this.doSelection(this.itemList[index], eveArgs);
        }
    }
    updateSelectedData() {
        const data = [];
        const items = selectAll('.' + LIST_ITEM + '.' + ACTIVE, this.element);
        for (let i = 0; i < items.length; i++) {
            data[i] = this.getItemObject(items[i]);
        }
        this.parent.itemData = data;
    }
    onMethodCall(args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        const action = getValue('action', args);
        switch (action) {
            case 'deleteFiles':
                this.deleteFiles(getValue('ids', args));
                break;
            case 'downloadFiles':
                this.downloadFiles(getValue('ids', args));
                break;
            case 'openFile':
                this.openFile(getValue('id', args));
                break;
            case 'renameFile':
                this.isInteraction = false;
                this.isInteracted = false;
                this.renameFile(getValue('id', args), getValue('newName', args));
                break;
            case 'createFolder':
                this.isInteraction = false;
                this.isInteracted = false;
                break;
            case 'clearSelection':
                this.isInteraction = false;
                this.isInteracted = false;
                this.onClearAllInit();
                break;
            case 'selectAll':
                this.isInteraction = false;
                this.isInteracted = false;
                this.onSelectAllInit();
                break;
        }
    }
    getItemsIndex(items) {
        const indexes = [];
        const isFilter = (this.parent.breadcrumbbarModule.searchObj.element.value !== '' || this.parent.isFiltered) ? true : false;
        const filterName = this.parent.hasId ? 'id' : 'name';
        if (this.parent.hasId || !isFilter) {
            for (let i = 0, len = this.items.length; i < len; i++) {
                if (items.indexOf(getValue(filterName, this.items[i])) !== -1) {
                    indexes.push(i);
                }
            }
        }
        else {
            for (let i = 0, len = this.items.length; i < len; i++) {
                const name = getValue('filterPath', this.items[i]) + getValue('name', this.items[i]);
                if ((items.indexOf(name) !== -1) || (items.indexOf(getValue(filterName, this.items[i])) !== -1)) {
                    indexes.push(i);
                }
            }
        }
        return indexes;
    }
    deleteFiles(ids) {
        this.parent.activeModule = 'largeiconsview';
        if (isNullOrUndefined(ids)) {
            this.performDelete();
            return;
        }
        const indexes = this.getItemsIndex(ids);
        if (indexes.length === 0) {
            return;
        }
        const data = [];
        const newIds = [];
        for (let i = 0; i < indexes.length; i++) {
            data[i] = this.items[indexes[i]];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDeleteFiles(this.parent, data, newIds);
    }
    downloadFiles(ids) {
        if (isNullOrUndefined(ids)) {
            this.doDownload();
            return;
        }
        const index = this.getItemsIndex(ids);
        if (index.length === 0) {
            return;
        }
        const data = [];
        const newIds = [];
        for (let i = 0; i < index.length; i++) {
            data[i] = this.items[index[i]];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDownloadFiles(this.parent, data, newIds);
    }
    openFile(id) {
        if (isNullOrUndefined(id)) {
            return;
        }
        const indexes = this.getItemsIndex([id]);
        if (indexes.length > 0) {
            this.doOpenAction(this.itemList[indexes[0]]);
        }
    }
    renameFile(id, name) {
        this.parent.activeModule = 'largeiconsview';
        if (isNullOrUndefined(id)) {
            this.performRename();
            return;
        }
        const indexes = this.getItemsIndex([id]);
        if (indexes.length > 0) {
            updateRenamingData(this.parent, this.items[indexes[0]]);
            if (isNullOrUndefined(name)) {
                doRename(this.parent);
            }
            else {
                if (!hasEditAccess(this.parent.itemData[0])) {
                    createDeniedDialog(this.parent, this.parent.itemData[0], permissionEdit);
                }
                else {
                    rename(this.parent, this.parent.path, name);
                }
            }
        }
    }
}

/**
 * BreadCrumbBar module
 */
class BreadCrumbBar {
    /**
     * constructor for addressbar module
     *
     * @hidden
     * @param {IFileManager} parent - specifies parent element.
     * @private
     *
     */
    constructor(parent) {
        this.addressPath = '';
        this.addressBarLink = '';
        this.searchTimer = null;
        this.searchWrapWidth = null;
        this.parent = parent;
        this.keyConfigs = {
            enter: 'enter'
        };
        this.render();
    }
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
            const value = e.newProp.searchSettings;
            switch (prop) {
                case 'searchSettings':
                    if (!isNullOrUndefined(value.allowSearchOnTyping)) {
                        this.searchEventBind(value.allowSearchOnTyping);
                    }
                    if (this.parent.breadcrumbbarModule.searchObj.value && this.parent.breadcrumbbarModule.searchObj.value !== '' &&
                        !(!isNullOrUndefined(value.allowSearchOnTyping) && isNullOrUndefined(value.filterType) &&
                            isNullOrUndefined(value.ignoreCase))) {
                        searchWordHandler(this.parent, this.parent.breadcrumbbarModule.searchObj.value, false);
                    }
                    break;
            }
        }
    }
    render() {
        this.addEventListener();
    }
    onPathChange() {
        const pathNames = this.parent.pathNames;
        const paths = this.parent.path.split('/');
        const addressbarUL = this.parent.createElement('ul', { className: 'e-addressbar-ul' });
        let addressbarLI = null;
        const pathNamesLen = pathNames.length;
        if (pathNames.length > 0) {
            let id = '';
            for (let i = 0; i < pathNamesLen; i++) {
                let addressATag = null;
                addressbarLI = this.parent.createElement('li', { className: 'e-address-list-item' });
                for (let j = 0; j <= i; j++) {
                    id = id + paths[j] + '/';
                }
                addressbarLI.setAttribute('data-utext', id);
                if (i !== 0) {
                    const icon = createElement('span', { className: ICONS });
                    addressbarLI.appendChild(icon);
                }
                if (pathNamesLen - i !== 1) {
                    addressATag = createElement('a', { className: LIST_TEXT });
                    addressbarLI.setAttribute('tabindex', '0');
                }
                else {
                    addressATag = createElement('span', { className: LIST_TEXT });
                }
                id = '';
                addressATag.innerText = pathNames[i];
                addressbarLI.appendChild(addressATag);
                addressbarUL.appendChild(addressbarLI);
            }
            const ulElement = this.parent.breadCrumbBarNavigation.querySelector('.e-addressbar-ul');
            if (!isNullOrUndefined(ulElement)) {
                if (!isNullOrUndefined(this.subMenuObj)) {
                    this.subMenuObj.destroy();
                }
                remove(ulElement);
            }
            const searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
            if (!searchWrap) {
                this.parent.breadCrumbBarNavigation.insertBefore(addressbarUL, searchWrap);
            }
            else {
                this.parent.breadCrumbBarNavigation.appendChild(addressbarUL);
            }
            this.updateBreadCrumbBar(addressbarUL);
        }
    }
    /* istanbul ignore next */
    updateBreadCrumbBar(addresBarUL) {
        const liElements = addresBarUL.querySelectorAll('li');
        const ulElement = this.parent.breadCrumbBarNavigation.querySelector('.e-addressbar-ul');
        const style = window.getComputedStyle(ulElement, null);
        const pRight = parseFloat(style.getPropertyValue('padding-right'));
        const pLeft = parseFloat(style.getPropertyValue('padding-left'));
        let breadCrumbBarWidth = ulElement.offsetWidth - pRight - pLeft;
        const addressbarUL = this.parent.createElement('ul', { className: 'e-addressbar-ul' });
        let liElementsWidth = 0;
        const liElementsWidths = [];
        for (let i = 0; i < liElements.length; i++) {
            const width = liElements[i].clientWidth;
            liElementsWidths.push(width);
            liElementsWidth = liElementsWidth + width;
        }
        if (!isNullOrUndefined(ulElement)) {
            remove(ulElement);
        }
        const searchContainer = this.parent.createElement('div');
        searchContainer.setAttribute('class', 'e-search-wrap');
        const id = this.parent.element.id + SEARCH_ID;
        const searchInput = createElement('input', { id: id,
            attrs: { autocomplete: 'off', 'aria-label': getLocaleText(this.parent, 'Search') } });
        searchContainer.appendChild(searchInput);
        const searchEle = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap .e-input');
        if (isNullOrUndefined(searchEle)) {
            this.parent.breadCrumbBarNavigation.appendChild(searchContainer);
            const span = createElement('span', { className: 'e-icons e-fe-search' });
            EventHandler.add(span, 'click', this.onShowInput, this);
            searchInput.parentElement.insertBefore(span, searchInput);
            this.searchObj = new TextBox({
                value: '',
                showClearButton: true,
                placeholder: getLocaleText(this.parent, 'Search'),
                focus: this.onFocus.bind(this),
                blur: this.onBlur.bind(this)
            });
            this.searchObj.appendTo('#' + this.parent.element.id + SEARCH_ID);
            this.searchEventBind(this.parent.searchSettings.allowSearchOnTyping);
            const search = this.searchObj.element.nextElementSibling;
            EventHandler.add(search, 'mousedown', this.searchChangeHandler.bind(this), this);
            EventHandler.add(this.searchObj.element, 'keyup', this.onKeyUp.bind(this), this);
        }
        const searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
        breadCrumbBarWidth = breadCrumbBarWidth - (this.searchWrapWidth ? this.searchWrapWidth : searchWrap.offsetWidth);
        if (liElementsWidth > breadCrumbBarWidth) {
            let i = liElements.length;
            while (i--) {
                const diff = breadCrumbBarWidth - liElementsWidths[i];
                if (diff > 40) {
                    addressbarUL.insertBefore(liElements[i], addressbarUL.querySelector('li'));
                    breadCrumbBarWidth = diff;
                }
                else {
                    const items = [];
                    for (let j = 0; j <= i; j++) {
                        const liElement = liElements[j];
                        items.push({
                            text: liElement.innerText,
                            utext: liElement.getAttribute('data-utext')
                        });
                    }
                    const subMenuLi = this.parent.createElement('li', { className: 'e-breadcrumb-menu' });
                    const attributes = { className: 'e-breadcrumb-submenu' };
                    const subMenuSpan = this.parent.createElement('button', attributes);
                    subMenuLi.appendChild(subMenuSpan);
                    addressbarUL.insertBefore(subMenuLi, addressbarUL.querySelector('li'));
                    this.subMenuObj = new DropDownButton({
                        items: items,
                        cssClass: 'e-caret-hide e-submenu',
                        iconCss: ICON_BREADCRUMB,
                        iconPosition: 'Top',
                        enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                        beforeItemRender: this.addSubMenuAttributes.bind(this),
                        select: this.subMenuSelectOperations.bind(this)
                    });
                    this.subMenuObj.isStringTemplate = true;
                    this.subMenuObj.appendTo(subMenuSpan);
                    break;
                }
            }
            this.parent.breadCrumbBarNavigation.insertBefore(addressbarUL, searchWrap);
        }
        else {
            this.parent.breadCrumbBarNavigation.insertBefore(addresBarUL, searchWrap);
        }
    }
    /* istanbul ignore next */
    onFocus() {
        const wrap = closest(this.searchObj.element, '.e-search-wrap');
        wrap.classList.add('e-focus');
    }
    /* istanbul ignore next */
    onKeyUp() {
        this.parent.notify(pathColumn, { args: this.parent });
    }
    /* istanbul ignore next */
    onBlur() {
        const wrap = closest(this.searchObj.element, '.e-search-wrap');
        wrap.classList.remove('e-focus');
    }
    /* istanbul ignore next */
    subMenuSelectOperations(event) {
        const args = { target: event.element };
        this.addressPathClickHandler(args);
    }
    /* istanbul ignore next */
    addSubMenuAttributes(args) {
        args.element.setAttribute('data-utext', getValue('utext', args.item));
        const anchor = this.parent.createElement('a', { className: 'e-list-text' });
        args.element.appendChild(anchor);
    }
    searchEventBind(allow) {
        if (allow) {
            this.searchObj.input = this.searchChangeHandler.bind(this);
            this.searchObj.change = null;
        }
        else {
            this.searchObj.change = this.searchChangeHandler.bind(this);
            this.searchObj.input = null;
        }
    }
    searchChangeHandler(args) {
        if (!isNullOrUndefined(args.value)) {
            this.parent.isFiltered = false;
            if (this.parent.searchSettings.allowSearchOnTyping) {
                window.clearTimeout(this.searchTimer);
                this.searchTimer = window.setTimeout(() => { searchWordHandler(this.parent, args.value, false); }, 300);
            }
            else {
                searchWordHandler(this.parent, args.value, false);
            }
        }
    }
    addressPathClickHandler(e) {
        const li = e.target;
        if (li.nodeName === 'LI' || li.nodeName === 'A') {
            const node = li.nodeName === 'LI' ? li.children[0] : li;
            if (!isNullOrUndefined(node)) {
                this.parent.isFiltered = false;
                const currentPath = this.updatePath(node);
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
                this.triggerFileOpen(this.parent.itemData[0]);
                read(this.parent, pathChanged, currentPath);
                const treeNodeId = this.parent.pathId[this.parent.pathId.length - 1];
                this.parent.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
            }
        }
    }
    triggerFileOpen(data) {
        const eventArgs = { cancel: false, fileDetails: data, module: 'BreadCrumbBar' };
        delete eventArgs.cancel;
        this.parent.trigger('fileOpen', eventArgs);
    }
    /* istanbul ignore next */
    onShowInput() {
        if (this.parent.isMobile) {
            if (this.parent.element.classList.contains(FILTER)) {
                removeClass([this.parent.element], FILTER);
                this.searchWrapWidth = null;
            }
            else {
                const searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
                this.searchWrapWidth = searchWrap.offsetWidth;
                addClass([this.parent.element], FILTER);
                this.searchObj.element.focus();
            }
        }
    }
    updatePath(list) {
        const li = closest(list, 'li');
        const liElementId = li.getAttribute('data-utext');
        this.addressBarLink = liElementId;
        const link = this.addressBarLink.split('/');
        const ids = this.parent.pathId;
        const names = this.parent.pathNames;
        this.parent.pathId = [];
        this.parent.pathNames = [];
        let newpath = '';
        for (let i = 0, len = link.length - 1; i < len; i++) {
            this.parent.pathId.push(ids[i]);
            this.parent.pathNames.push(names[i]);
            newpath += link[i] + '/';
        }
        this.parent.setProperties({ path: newpath }, true);
        return newpath;
    }
    onUpdatePath() {
        this.onPathChange();
        this.removeSearchValue();
    }
    onCreateEnd() {
        this.onPathChange();
    }
    onRenameEnd() {
        this.onPathChange();
    }
    /* istanbul ignore next */
    onDeleteEnd() {
        this.onUpdatePath();
    }
    /* istanbul ignore next */
    removeSearchValue() {
        this.parent.isFiltered = false;
        if (this.searchObj && (this.searchObj.value !== '' || this.searchObj.element.value !== '')) {
            this.searchObj.value = '';
            this.searchObj.element.value = '';
            this.searchObj.dataBind();
        }
    }
    onResize() {
        this.onPathChange();
    }
    onPasteEnd() {
        this.onPathChange();
    }
    addEventListener() {
        this.keyboardModule = new KeyboardEvents(this.parent.breadCrumbBarNavigation, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        EventHandler.add(this.parent.breadCrumbBarNavigation, 'click', this.addressPathClickHandler, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(pathChanged, this.onUpdatePath, this);
        this.parent.on(finalizeEnd, this.onUpdatePath, this);
        this.parent.on(refreshEnd, this.onUpdatePath, this);
        this.parent.on(openEnd, this.onUpdatePath, this);
        this.parent.on(createEnd, this.onCreateEnd, this);
        this.parent.on(renameEnd, this.onRenameEnd, this);
        this.parent.on(deleteEnd, this.onDeleteEnd, this);
        this.parent.on(splitterResize, this.onResize, this);
        this.parent.on(pasteEnd, this.onPasteEnd, this);
        this.parent.on(resizeEnd, this.onResize, this);
        this.parent.on(searchTextChange, this.onSearchTextChange, this);
        this.parent.on(dropInit, this.onDropInit, this);
        this.parent.on(layoutRefresh, this.onResize, this);
        this.parent.on(dropPath, this.onPathChange, this);
    }
    keyActionHandler(e) {
        switch (e.action) {
            case 'enter':
                this.addressPathClickHandler(e);
                break;
        }
    }
    removeEventListener() {
        this.keyboardModule.destroy();
        this.parent.off(pathChanged, this.onUpdatePath);
        this.parent.off(finalizeEnd, this.onUpdatePath);
        this.parent.off(refreshEnd, this.onUpdatePath);
        this.parent.off(openEnd, this.onUpdatePath);
        this.parent.off(pasteEnd, this.onPasteEnd);
        this.parent.off(createEnd, this.onCreateEnd);
        this.parent.off(renameEnd, this.onRenameEnd);
        this.parent.off(deleteEnd, this.onDeleteEnd);
        this.parent.off(splitterResize, this.onResize);
        this.parent.off(resizeEnd, this.onResize);
        this.parent.off(searchTextChange, this.onSearchTextChange);
        this.parent.off(dropInit, this.onDropInit);
        this.parent.off(layoutRefresh, this.onResize);
        this.parent.off(dropPath, this.onPathChange);
    }
    /* istanbul ignore next */
    onDropInit(args) {
        if (this.parent.targetModule === this.getModuleName()) {
            const liEle = args.target.closest('li');
            this.parent.dropPath = this.updatePath((liEle.children[0]));
            this.parent.dropData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            this.triggerFileOpen(this.parent.dropData);
            const treeNodeId = this.parent.pathId[this.parent.pathId.length - 1];
            this.parent.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name
     * @private
     */
    getModuleName() {
        return 'breadcrumbbar';
    }
    destroy() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        /* istanbul ignore next */
        if (!isNullOrUndefined(this.subMenuObj)) {
            this.subMenuObj.destroy();
        }
        if (!isNullOrUndefined(this.searchObj)) {
            this.searchObj.destroy();
        }
    }
    onSearchTextChange(args) {
        this.searchObj.element.placeholder = (this.parent.searchSettings.placeholder != null) ? this.parent.searchSettings.placeholder : getLocaleText(this.parent, 'Search') + ' ' + getLocaleText(this.parent, args.cwd.name.toString());
    }
}

/**
 * ContextMenu module
 */
class ContextMenu {
    /**
     * Constructor for the ContextMenu module
     *
     * @param {IFileManager} parent - Specifies the parent element.
     * @hidden
     */
    constructor(parent) {
        this.isMenuItemClicked = false;
        this.currentItems = [];
        this.currentElement = null;
        this.disabledItems = [];
        this.parent = parent;
        this.render();
    }
    render() {
        this.keyConfigs = {
            downarrow: 'downarrow',
            uparrow: 'uparrown'
        };
        this.contextMenu = new ContextMenu$1({
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            target: '#' + this.parent.element.id,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            beforeItemRender: this.onBeforeItemRender.bind(this),
            select: this.onSelect.bind(this),
            beforeOpen: this.onBeforeOpen.bind(this),
            beforeClose: this.onBeforeClose.bind(this),
            cssClass: getCssClass(this.parent, ROOT_POPUP)
        });
        this.contextMenu.isStringTemplate = true;
        this.contextMenu.appendTo('#' + this.parent.element.id + CONTEXT_MENU_ID);
        this.addEventListener();
    }
    /* istanbul ignore next */
    onBeforeItemRender(args) {
        if (args.item.id === this.getMenuId('largeiconsview')) {
            const iconSpan = createElement('span');
            const element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'LargeIcons' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', ICON_LARGE + ' ' + MENU_ICON);
        }
        if (args.item.id === this.getMenuId('detailsview')) {
            const iconSpan = createElement('span');
            const element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'Details' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', ICON_GRID + ' ' + MENU_ICON);
        }
    }
    onBeforeClose(args) {
        const eventArgs = {
            cancel: false,
            element: args.element,
            event: args.event,
            isFocused: args.isFocused,
            fileDetails: [this.menuItemData],
            items: args.items,
            parentItem: args.parentItem,
            menuType: this.menuType
        };
        this.parent.trigger('menuClose', eventArgs, (menuCloseArgs) => {
            if (menuCloseArgs.cancel) {
                args.cancel = menuCloseArgs.cancel;
                return;
            }
        });
        this.menuTarget = null;
        if (!this.isMenuItemClicked && this.parent.pathId.length > 1 && this.parent.activeModule === 'navigationpane') {
            this.parent.pathId.pop();
            const parentKey = [];
            const itemKeys = Object.keys(this.parent.feParent);
            for (const item of itemKeys) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const itemData = getValue(item, this.parent.feParent);
                if (this.parent.pathNames.indexOf(itemData.name) !== -1) {
                    parentKey.push(itemData._fm_id);
                }
            }
            this.parent.pathId.push(parentKey[parentKey.length - 1]);
            this.parent.navigationpaneModule.treeObj.setProperties({ selectedNodes: [this.parent.pathId[this.parent.pathId.length - 1]] });
        }
        this.isMenuItemClicked = false;
    }
    /* istanbul ignore next */
    onBeforeOpen(args) {
        let selected = false;
        let uid;
        let data;
        let treeFolder = false;
        let target = args.event.target;
        this.menuTarget = this.targetNodeElement = target;
        this.currentElement = args.element;
        if (target.classList.contains('e-spinner-pane')) {
            target = this.parent.navigationpaneModule.activeNode.getElementsByClassName(FULLROW)[0];
            this.menuTarget = this.targetNodeElement = target;
        }
        this.targetElement = this.parent.view === 'Details' ? closest(target, 'tr.e-row') : target;
        if (this.parent.enableVirtualization && (target.classList.contains('e-virtual-bottom') || target.classList.contains('e-virtualtable'))) {
            target = target.parentElement.closest('div');
        }
        const view = this.getTargetView(target);
        this.updateActiveModule();
        /* istanbul ignore next */
        if (target.classList.contains(TREE_VIEW) || closest(target, 'th') ||
            (closest(target, '#' + this.parent.element.id + BREADCRUMBBAR_ID)) ||
            (closest(target, '#' + this.parent.element.id + TOOLBAR_ID))) {
            args.cancel = true;
        }
        else if (!(this.parent.view === 'LargeIcons') && this.targetElement &&
            this.targetElement.classList.contains('e-emptyrow')) {
            this.setLayoutItem(target);
            /* istanbul ignore next */
        }
        else if (closest(target, '.' + EMPTY)) {
            this.setLayoutItem(target);
        }
        else if (!target.classList.contains(MENU_ITEM) &&
            !target.classList.contains(MENU_ICON) && !target.classList.contains(SUBMENU_ICON)) {
            /* istanbul ignore next */
            if (this.parent.view === 'LargeIcons' && !isNullOrUndefined(closest(target, 'li')) && !closest(target, '#' + this.parent.element.id + TREE_ID)) {
                const eveArgs = { ctrlKey: true, shiftKey: true };
                if (!closest(target, 'li').classList.contains('e-active')) {
                    this.parent.largeiconsviewModule.doSelection(target, eveArgs);
                }
                data = this.parent.visitedData;
                selected = true;
            }
            else if (!isNullOrUndefined(closest(target, 'tr.e-row'))) {
                uid = this.targetElement.getAttribute('data-uid');
                data = this.parent.detailsviewModule.gridObj.getRowObjectFromUID(uid).data;
                if (isNullOrUndefined(this.targetElement.getAttribute('aria-selected'))) {
                    /* istanbul ignore next */
                    this.parent.detailsviewModule.gridObj.selectRows([parseInt(this.targetElement.getAttribute('aria-rowindex'), 10) - 1]);
                }
                selected = true;
                /* istanbul ignore next */
            }
            else if (closest(target, '#' + this.parent.element.id + TREE_ID)) {
                uid = closest(target, 'li').getAttribute('data-uid');
                if (!isNullOrUndefined(uid)) {
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
                    const itemsToRemove = ['Delete', 'Rename', 'Cut', 'Copy'];
                    for (let i = 0; i < this.disabledItems.length; i++) {
                        const item = this.disabledItems[i];
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
        const pasteEle = select('#' + this.getMenuId('Paste'), this.contextMenu.element);
        if (!args.cancel && !this.parent.enablePaste &&
            pasteEle && !pasteEle.classList.contains('e-disabled')) {
            if (this.disabledItems.indexOf('Paste') === -1) {
                this.disabledItems.push('Paste');
            }
        }
        else {
            const pasteIndex = this.disabledItems.indexOf('Paste');
            if (pasteIndex !== -1) {
                this.disabledItems.splice(pasteIndex, 1);
            }
        }
        if (args.cancel) {
            this.menuTarget = this.currentElement = null;
            return;
        }
        this.contextMenu.dataBind();
        let isSubMenu = false;
        if (target.classList.contains(MENU_ITEM) ||
            target.classList.contains(MENU_ICON) || target.classList.contains(SUBMENU_ICON)) {
            isSubMenu = true;
        }
        this.menuItemData = isSubMenu ? this.menuItemData : this.getMenuItemData();
        const eventArgs = {
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
        this.parent.trigger('menuOpen', eventArgs, (menuOpenArgs) => {
            if (!isSubMenu) {
                this.contextMenu.dataBind();
                this.contextMenu.items = menuOpenArgs.items;
                this.contextMenu.dataBind();
            }
            this.enableItems(this.disabledItems, false, true);
            args.cancel = menuOpenArgs.cancel;
            if (menuOpenArgs.cancel) {
                this.menuTarget = this.targetNodeElement = this.currentElement = null;
            }
        });
    }
    updateActiveModule() {
        this.parent.activeModule = closest(this.menuTarget, '#' + this.parent.element.id + TREE_ID) ?
            'navigationpane' : closest(this.menuTarget, '#' + this.parent.element.id + GRID_ID) ?
            'detailsview' : closest(this.menuTarget, '#' + this.parent.element.id + LARGEICON_ID) ?
            'largeiconsview' : this.parent.activeModule;
    }
    /* istanbul ignore next */
    /**
     *
     * @param {Element} target - specifies the target element.
     * @returns {string} -returns the target view.
     * @hidden
     */
    getTargetView(target) {
        return target.classList.contains(TREE_VIEW) ?
            'TreeView' : target.classList.contains(GRID_VIEW) ?
            'GridView' : target.classList.contains(ICON_VIEW) ?
            'LargeIcon' : target.classList.contains(LARGE_ICONS) ?
            'LargeIcon' : '';
    }
    getItemIndex(item) {
        const itemId = this.getMenuId(item);
        for (let i = 0; i < this.currentItems.length; i++) {
            if ((this.currentItems[i].id === itemId) || (this.currentItems[i].id === item)) {
                return i;
            }
        }
        return -1;
    }
    disableItem(items) {
        if (items.length !== 0) {
            this.disabledItems = this.disabledItems.concat(items);
        }
    }
    enableItems(items, enable, isUniqueId) {
        if (enable) {
            this.disabledItems = this.disabledItems.filter((item) => { return items.indexOf(item) === -1; });
        }
        for (let i = 0; i < items.length; i++) {
            const validItem = this.checkValidItem(items[i]);
            if (validItem === 1) {
                this.contextMenu.enableItems([this.getMenuId(items[i])], enable, isUniqueId);
            }
            else if (validItem === 2) {
                this.contextMenu.enableItems([items[i]], enable, isUniqueId);
            }
        }
    }
    setFolderItem(isTree) {
        this.menuType = 'folder';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.folder.map((item) => item.trim()));
        this.contextMenu.dataBind();
        if (isTree) {
            const selectedTreeNode = select('[data-uid="' + this.navUid + '"]', this.parent.navigationpaneModule.treeObj.element);
            if (!isNullOrUndefined(selectedTreeNode) &&
                this.parent.pathNames[this.parent.pathNames.length - 1] === selectedTreeNode.querySelector('.e-list-text').innerHTML && this.parent.activeModule === 'navigationpane') {
                this.disabledItems.push('Open');
            }
            else {
                const indexToRemove = this.disabledItems.indexOf('Open');
                if (indexToRemove !== -1) {
                    this.disabledItems.splice(indexToRemove, 1);
                }
            }
            if (this.parent.selectedItems.length === 0) {
                const renameIndex = this.disabledItems.indexOf('Rename');
                if (renameIndex !== -1) {
                    this.disabledItems.splice(renameIndex, 1);
                }
            }
        }
        else if (this.parent.activeModule !== 'navigationpane') {
            if (this.parent.selectedItems.length === 1) {
                const renameIndex = this.disabledItems.indexOf('Rename');
                if (renameIndex !== -1) {
                    this.disabledItems.splice(renameIndex, 1);
                }
            }
            else {
                this.disabledItems.push('Rename', 'Paste');
            }
        }
    }
    setFileItem() {
        this.menuType = 'file';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.file.map((item) => item.trim()));
        this.contextMenu.dataBind();
        if (this.parent.selectedItems.length === 1) {
            const renameIndex = this.disabledItems.indexOf('Rename');
            if (renameIndex !== -1) {
                this.disabledItems.splice(renameIndex, 1);
            }
        }
        else {
            this.disabledItems.push('Rename');
        }
    }
    setLayoutItem(target) {
        this.menuType = 'layout';
        this.contextMenu.items = this.getItemData(this.parent.contextMenuSettings.layout.map((item) => item.trim()));
        this.contextMenu.dataBind();
        if (!this.parent.allowMultiSelection || ((this.parent.view === 'LargeIcons' &&
            (closest(target, '#' + this.parent.element.id + LARGEICON_ID).getElementsByClassName(EMPTY).length !== 0))
            || (this.parent.view === 'Details' &&
                (closest(target, '#' + this.parent.element.id + GRID_ID).getElementsByClassName(EMPTY).length !== 0)))) {
            this.disabledItems.push('SelectAll');
        }
        else {
            this.disabledItems = this.disabledItems.filter((item) => item !== 'SelectAll');
        }
        if (this.parent.selectedNodes.length === 0) {
            if (this.disabledItems.indexOf('Paste') === -1) {
                this.disabledItems.push('Paste');
            }
        }
        this.contextMenu.dataBind();
    }
    checkValidItem(nameEle) {
        if (!isNullOrUndefined(this.currentElement)) {
            if (!isNullOrUndefined(select('#' + this.getMenuId(nameEle), this.currentElement))) {
                return 1;
            }
            else if (!isNullOrUndefined(select('#' + nameEle, this.currentElement))) {
                return 2;
            }
        }
        return -1;
    }
    getMenuItemData() {
        if (this.menuType === 'layout') {
            return getPathObject(this.parent);
        }
        else {
            const args = { target: this.menuTarget };
            this.parent.notify(menuItemData, args);
            return this.parent.itemData[0];
        }
    }
    /* istanbul ignore next */
    onSelect(args) {
        if (isNullOrUndefined(args.item) || !args.item.id) {
            return;
        }
        const itemText = args.item.id.substr((this.parent.element.id + '_cm_').length);
        let details;
        if (itemText === 'refresh' || itemText === 'newfolder' || itemText === 'upload') {
            details = [getPathObject(this.parent)];
            this.parent.itemData = details;
        }
        else {
            this.parent.notify(selectedData, {});
            if (this.parent.activeModule === 'navigationpane' && itemText === 'open') {
                details = [this.menuItemData];
            }
            else {
                details = this.parent.itemData;
            }
        }
        const eventArgs = {
            cancel: false,
            element: args.element,
            fileDetails: details,
            item: args.item
        };
        this.parent.trigger('menuClick', eventArgs, (menuClickArgs) => {
            let sItems;
            if (!menuClickArgs.cancel) {
                if (itemText !== 'cut' && itemText !== 'copy') {
                    this.isMenuItemClicked = true;
                }
                switch (itemText) {
                    case 'cut':
                        cutFiles(this.parent);
                        break;
                    case 'copy':
                        copyFiles(this.parent);
                        break;
                    case 'paste':
                        if (this.menuType === 'folder') {
                            if (this.parent.activeModule === 'navigationpane') {
                                this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(this.targetNodeElement, 'li'));
                                this.parent.folderPath = this.parent.path;
                            }
                            else {
                                this.parent.folderPath = getFullPath(this.parent, this.menuItemData, this.parent.path);
                            }
                        }
                        else {
                            this.parent.folderPath = '';
                        }
                        pasteHandler(this.parent);
                        break;
                    case 'delete':
                        for (let j = 0; j < details.length; j++) {
                            if (!hasEditAccess(details[j])) {
                                createDeniedDialog(this.parent, details[j], permissionEdit);
                                return;
                            }
                        }
                        createDialog(this.parent, 'Delete');
                        break;
                    /* istanbul ignore next */
                    case 'download':
                        for (let i = 0; i < details.length; i++) {
                            if (!hasDownloadAccess(details[i])) {
                                createDeniedDialog(this.parent, details[i], permissionDownload);
                                return;
                            }
                        }
                        if (this.parent.activeModule === 'navigationpane') {
                            this.parent.notify(downloadInit, {});
                        }
                        else if (this.parent.selectedItems.length > 0) {
                            Download(this.parent, this.parent.path, this.parent.selectedItems);
                        }
                        break;
                    case 'rename':
                        if (!hasEditAccess(details[0])) {
                            createDeniedDialog(this.parent, details[0], permissionEdit);
                        }
                        else {
                            this.parent.notify(renameInit, {});
                            createDialog(this.parent, 'Rename');
                        }
                        break;
                    case 'selectall':
                        /* istanbul ignore next */
                        this.parent.notify(selectAllInit, {});
                        break;
                    case 'refresh':
                        refresh(this.parent);
                        break;
                    case 'open':
                        if (this.parent.visitedItem && this.parent.activeModule !== 'navigationpane') {
                            this.parent.notify(openInit, { target: this.parent.visitedItem });
                        }
                        else if (this.parent.activeModule === 'navigationpane') {
                            if (this.parent.visitedItem) {
                                this.parent.notify(openInit, { target: this.parent.visitedItem });
                            }
                            this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(this.targetNodeElement, 'li'));
                        }
                        break;
                    case 'details':
                        this.parent.notify(detailsInit, {});
                        sItems = this.parent.selectedItems;
                        if (this.parent.activeModule === 'navigationpane') {
                            sItems = [];
                            this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(this.targetNodeElement, 'li'));
                        }
                        GetDetails(this.parent, sItems, this.parent.path, 'details');
                        break;
                    case 'newfolder':
                        createNewFolder(this.parent);
                        break;
                    case 'upload':
                        uploadItem(this.parent);
                        break;
                    case 'name':
                    case 'size':
                    case 'date':
                    case 'ascending':
                    case 'descending':
                        /* istanbul ignore next */
                        sortbyClickHandler(this.parent, args);
                        break;
                    /* istanbul ignore next */
                    case 'none':
                        /* istanbul ignore next */
                        sortbyClickHandler(this.parent, args);
                        break;
                    /* istanbul ignore next */
                    case 'largeiconsview':
                        updateLayout(this.parent, 'LargeIcons');
                        break;
                    /* istanbul ignore next */
                    case 'detailsview':
                        updateLayout(this.parent, 'Details');
                        break;
                }
            }
        });
    }
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
            switch (prop) {
                case 'cssClass':
                    this.contextMenu.cssClass = getCssClass(this.parent, ROOT_POPUP);
                    break;
            }
        }
    }
    addEventListener() {
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.keyboardModule = new KeyboardEvents(this.contextMenu.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    removeEventListener() {
        this.parent.off(destroy, this.destroy);
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.keyboardModule.destroy();
    }
    keyActionHandler(e) {
        switch (e.action) {
            case 'uparrow':
            case 'downarrow':
                e.preventDefault();
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    getModuleName() {
        return 'contextmenu';
    }
    destroy() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.contextMenu.destroy();
        this.targetElement = null;
    }
    /* istanbul ignore next */
    getItemData(data) {
        const items = [];
        for (let i = 0; i < data.length; i++) {
            let item;
            const itemId = this.getMenuId(data[i]);
            const itemText = getLocaleText(this.parent, data[i]);
            switch (data[i]) {
                case '|':
                    item = { separator: true };
                    break;
                case 'Open':
                    item = { id: itemId, text: itemText, iconCss: ICON_OPEN };
                    break;
                case 'Upload':
                    item = { id: itemId, text: itemText, iconCss: ICON_UPLOAD };
                    break;
                case 'Cut':
                    item = { id: itemId, text: itemText, iconCss: ICON_CUT };
                    break;
                case 'Copy':
                    item = { id: itemId, text: itemText, iconCss: ICON_COPY };
                    break;
                case 'Paste':
                    item = { id: itemId, text: itemText, iconCss: ICON_PASTE };
                    break;
                case 'Delete':
                    item = { id: itemId, text: itemText, iconCss: ICON_DELETE };
                    break;
                case 'Rename':
                    item = { id: itemId, text: itemText, iconCss: ICON_RENAME };
                    break;
                case 'NewFolder':
                    item = { id: itemId, text: itemText, iconCss: ICON_NEWFOLDER };
                    break;
                case 'Details':
                    item = { id: itemId, text: itemText, iconCss: ICON_DETAILS };
                    break;
                case 'SortBy':
                    item = {
                        id: itemId, text: itemText, iconCss: ICON_SHORTBY,
                        items: [
                            {
                                id: this.getMenuId('Name'), text: getLocaleText(this.parent, 'Name'),
                                iconCss: this.parent.sortBy === 'name' ? TB_OPTION_DOT : null
                            },
                            {
                                id: this.getMenuId('Size'), text: getLocaleText(this.parent, 'Size'),
                                iconCss: this.parent.sortBy === 'size' ? TB_OPTION_DOT : null
                            },
                            {
                                id: this.getMenuId('Date'), text: getLocaleText(this.parent, 'DateModified'),
                                iconCss: this.parent.sortBy === '_fm_modified' ? TB_OPTION_DOT : null
                            },
                            { separator: true },
                            {
                                id: this.getMenuId('Ascending'), text: getLocaleText(this.parent, 'Ascending'),
                                iconCss: this.parent.sortOrder === 'Ascending' ? TB_OPTION_TICK : null
                            },
                            {
                                id: this.getMenuId('Descending'), text: getLocaleText(this.parent, 'Descending'),
                                iconCss: this.parent.sortOrder === 'Descending' ? TB_OPTION_TICK : null
                            },
                            {
                                id: this.getMenuId('None'), text: getLocaleText(this.parent, 'None'),
                                iconCss: this.parent.sortOrder === 'None' ? TB_OPTION_TICK : null
                            }
                        ]
                    };
                    break;
                /* istanbul ignore next */
                case 'View':
                    item = {
                        id: itemId, text: itemText, iconCss: this.parent.view === 'Details' ? ICON_GRID : ICON_LARGE,
                        items: [
                            {
                                id: this.getMenuId('largeiconsview'), text: getLocaleText(this.parent, 'View-LargeIcons'),
                                iconCss: this.parent.view === 'Details' ? null : TB_OPTION_TICK
                            },
                            {
                                id: this.getMenuId('detailsview'), text: getLocaleText(this.parent, 'View-Details'),
                                iconCss: this.parent.view === 'Details' ? TB_OPTION_TICK : null
                            }
                        ]
                    };
                    break;
                case 'Refresh':
                    item = { id: itemId, text: itemText, iconCss: ICON_REFRESH };
                    break;
                case 'SelectAll':
                    item = { id: itemId, text: itemText, iconCss: ICON_SELECTALL };
                    break;
                /* istanbul ignore next */
                case 'Download':
                    item = { id: itemId, text: itemText, iconCss: ICON_DOWNLOAD };
                    break;
                /* istanbul ignore next */
                default:
                    item = { id: itemId, text: itemText };
                    break;
            }
            items.push(item);
        }
        return items;
    }
    getMenuId(id) {
        return this.parent.element.id + '_cm_' + id.split(' ').join('').toLowerCase();
    }
}

/**
 * Specifies the default locale of FileManager component
 */
const defaultLocale = {
    'NewFolder': 'New folder',
    'Upload': 'Upload',
    'Delete': 'Delete',
    'Rename': 'Rename',
    'Download': 'Download',
    'Cut': 'Cut',
    'Copy': 'Copy',
    'Paste': 'Paste',
    'SortBy': 'Sort by',
    'Refresh': 'Refresh',
    'Item-Selection': 'item selected',
    'Items-Selection': 'items selected',
    'View': 'View',
    'Details': 'Details',
    'SelectAll': 'Select all',
    'Open': 'Open',
    'Tooltip-NewFolder': 'New folder',
    'Tooltip-Upload': 'Upload',
    'Tooltip-Delete': 'Delete',
    'Tooltip-Rename': 'Rename',
    'Tooltip-Download': 'Download',
    'Tooltip-Cut': 'Cut',
    'Tooltip-Copy': 'Copy',
    'Tooltip-Paste': 'Paste',
    'Tooltip-SortBy': 'Sort by',
    'Tooltip-Refresh': 'Refresh',
    'Tooltip-Selection': 'Clear selection',
    'Tooltip-View': 'View',
    'Tooltip-Details': 'Details',
    'Tooltip-SelectAll': 'Select all',
    'Name': 'Name',
    'Size': 'Size',
    'DateModified': 'Modified',
    'DateCreated': 'Date created',
    'Path': 'Path',
    'Modified': 'Modified',
    'Created': 'Created',
    'Location': 'Location',
    'Type': 'Type',
    'Permission': 'Permission',
    'Ascending': 'Ascending',
    'Descending': 'Descending',
    'None': 'None',
    'View-LargeIcons': 'Large icons',
    'View-Details': 'Details',
    'Search': 'Search',
    'Button-Ok': 'OK',
    'Button-Cancel': 'Cancel',
    'Button-Yes': 'Yes',
    'Button-No': 'No',
    'Button-Create': 'Create',
    'Button-Save': 'Save',
    'Header-NewFolder': 'Folder',
    'Content-NewFolder': 'Enter your folder name',
    'Header-Rename': 'Rename',
    'Content-Rename': 'Enter your new name',
    'Header-Rename-Confirmation': 'Rename Confirmation',
    'Content-Rename-Confirmation': 'If you change a file name extension, the file might become unstable. ' +
        'Are you sure you want to change it?',
    'Header-Delete': 'Delete File',
    'Content-Delete': 'Are you sure you want to delete this file?',
    'Header-Folder-Delete': 'Delete Folder',
    'Content-Folder-Delete': 'Are you sure you want to delete this folder?',
    'Header-Multiple-Delete': 'Delete Multiple Items',
    'Content-Multiple-Delete': 'Are you sure you want to delete these {0} items?',
    'Header-Duplicate': 'File/Folder exists',
    'Content-Duplicate': '{0} already exists. Do you want to rename and paste?',
    'Header-Upload': 'Upload Files',
    'Error': 'Error',
    'Validation-Empty': 'The file or folder name cannot be empty.',
    'Validation-Invalid': 'The file or folder name {0} contains invalid characters. Please use a different name. ' +
        // eslint-disable-next-line no-useless-escape
        'Valid file or folder names cannot end with a dot or space, and cannot contain any of the following characters: \\/:*?\"<>|',
    'Validation-NewFolder-Exists': 'A file or folder with the name {0} already exists.',
    'Validation-Rename-Exists': 'Cannot rename {0} to {1}: destination already exists.',
    'Folder-Empty': 'This folder is empty',
    'File-Upload': 'Drag files here to upload',
    'Search-Empty': 'No results found',
    'Search-Key': 'Try with different keywords',
    'Filter-Empty': 'No results found',
    'Filter-Key': 'Try with different filter',
    'Sub-Folder-Error': 'The destination folder is the subfolder of the source folder.',
    'Same-Folder-Error': 'The destination folder is the same as the source folder.',
    'Access-Denied': 'Access Denied',
    'Access-Details': 'You don"t have permission to access this folder.',
    'Header-Retry': 'File Already Exists',
    'Content-Retry': 'A file with this name already exists in this folder. What would you like to do?',
    'Button-Keep-Both': 'Keep both',
    'Button-Replace': 'Replace',
    'Button-Skip': 'Skip',
    'ApplyAll-Label': 'Do this for all current items',
    'KB': 'KB',
    'Access-Message': '{0} is not accessible. You need permission to perform the {1} action.',
    'Network-Error': 'NetworkError: Failed to send on XMLHTTPRequest: Failed to load',
    'Server-Error': 'ServerError: Invalid response from'
};

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FileManager_1;
/**
 * The FileManager component allows users to access and manage the file system through the web  browser. It can performs the
 * functionalities like add, rename, search, sort, upload and delete files or folders. And also it
 * provides an easy way of  dynamic injectable modules like toolbar, navigationpane, detailsview, largeiconsview.
 * ```html
 *  <div id="file"></div>
 * ```
 * ```typescript,
 *  let feObj: FileManager = new FileManager();
 *  feObj.appendTo('#file');
 * ```
 */
let FileManager = FileManager_1 = class FileManager extends Component {
    constructor(options, element) {
        super(options, element);
        this.filterData = null;
        this.selectedNodes = [];
        this.duplicateItems = [];
        this.duplicateRecords = [];
        this.previousPath = [];
        this.nextPath = [];
        this.existingFileCount = 0;
        this.isLayoutChange = false;
        this.layoutSelectedItems = [];
        this.renamedId = null;
        this.uploadItem = [];
        this.deleteRecords = [];
        this.isFile = false;
        this.isCut = false;
        this.isSearchCut = false;
        this.isSearchDrag = false;
        this.isPasteError = false;
        this.folderPath = '';
        this.isSameAction = false;
        this.isFiltered = false;
        // Specifies whether the sort by option is clicked or not.
        this.isSortByClicked = false;
        this.enablePaste = false;
        this.persistData = false;
        this.retryArgs = [];
        this.isOpened = false;
        this.isRetryOpened = false;
        this.isPathDrag = false;
        this.searchedItems = [];
        this.retryFiles = [];
        this.isApplySame = false;
        this.dragData = [];
        this.dragNodes = [];
        this.dragPath = '';
        this.dropPath = '';
        this.isDragDrop = false;
        this.treeExpandTimer = null;
        this.dragCursorPosition = { left: 44, top: 18 };
        this.isDropEnd = false;
        this.dragCount = 0;
        this.droppedObjects = [];
        this.uploadingCount = 0;
        this.uploadedCount = 0;
        //Specifies whether the operating system is MAC or not
        this.isMac = false;
        this.dragSelectedItems = [];
        this.onScrollHandler = () => {
            if (!isNullOrUndefined(this.contextmenuModule) && !isNullOrUndefined(this.contextmenuModule.contextMenu)) {
                this.contextmenuModule.contextMenu.close();
            }
        };
        FileManager_1.Inject(BreadCrumbBar, LargeIconsView, ContextMenu);
    }
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    getModuleName() {
        return 'filemanager';
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    preRender() {
        if (isNullOrUndefined(this.element.id) || this.element.id === '') {
            this.element.setAttribute('id', getUniqueID('filemanager'));
        }
        this.ensurePath();
        this.feParent = [];
        this.feFiles = [];
        setStyleAttribute(this.element, { 'width': formatUnit(this.width), 'height': formatUnit(this.height) });
        this.isDevice = Browser.isDevice;
        this.isMobile = this.checkMobile();
        if (this.isMobile) {
            this.setProperties({ navigationPaneSettings: { visible: false } }, true);
        }
        const ele = closest(this.element, '.e-bigger');
        this.isBigger = ele ? true : false;
        this.activeModule = (this.view === 'LargeIcons') ? 'largeiconsview' : 'detailsview';
        createSpinner({ target: this.element }, createElement);
        this.addWrapper();
        this.keyConfigs = {
            altN: 'alt+n',
            f5: 'f5',
            ctrlShift1: 'ctrl+shift+1',
            ctrlShift2: 'ctrl+shift+2',
            ctrlU: 'ctrl+u'
        };
        this.localeObj = new L10n(this.getModuleName(), defaultLocale, this.locale);
    }
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string} - returns the persisted data.
     * @hidden
     */
    getPersistData() {
        const keyEntity = ['view', 'path', 'selectedItems'];
        return this.addOnPersist(keyEntity);
    }
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    requiredModules() {
        const modules = [];
        modules.push({
            member: 'breadcrumbbar',
            args: [this]
        });
        modules.push({
            member: 'largeiconsview',
            args: [this]
        });
        if (this.toolbarSettings.visible) {
            modules.push({
                member: 'toolbar',
                args: [this],
                name: 'Toolbar'
            });
        }
        if (this.navigationPaneSettings.visible) {
            modules.push({
                member: 'navigationpane',
                args: [this],
                name: 'NavigationPane'
            });
        }
        if (this.view) {
            modules.push({
                member: 'detailsview',
                args: [this],
                name: 'DetailsView'
            });
        }
        if (this.contextMenuSettings.visible && !this.isDevice) {
            modules.push({
                member: 'contextmenu',
                args: [this],
                name: 'ContextMenu'
            });
        }
        if (this.enableVirtualization) {
            modules.push({
                member: 'virtualization',
                args: [this],
                name: 'Virtualization'
            });
        }
        return modules;
    }
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    render() {
        this.initialize();
        const slItems = isNullOrUndefined(this.selectedItems) ? [] :
            this.allowMultiSelection ? this.selectedItems : this.selectedItems.slice(this.selectedItems.length - 1);
        this.setProperties({ selectedItems: slItems }, true);
        this.fileView = this.view;
        this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        this.setRtl(this.enableRtl);
        this.addEventListeners();
        read(this, (this.path !== this.originalPath) ? initialEnd : finalizeEnd, this.path);
        if (this.fileView === 'Details') {
            this.largeiconsviewModule.element.classList.add(DISPLAY_NONE);
        }
        this.adjustHeight();
        if (isNullOrUndefined(this.navigationpaneModule)) {
            this.splitterObj.collapse(this.enableRtl ? 1 : 0);
            const bar = select('.' + SPLIT_BAR, this.element);
            bar.classList.add(DISPLAY_NONE);
        }
        this.wireEvents();
        this.renderComplete();
    }
    ensurePath() {
        let currentPath = this.path;
        if (isNullOrUndefined(currentPath)) {
            currentPath = '/';
        }
        if (currentPath.lastIndexOf('/') !== (currentPath.length - 1)) {
            currentPath = currentPath + '/';
        }
        this.originalPath = currentPath;
        const paths = currentPath.split('/');
        this.setProperties({ path: paths[0] + '/' }, true);
        this.pathNames = [];
        this.pathId = ['fe_tree'];
        this.itemData = [];
    }
    initialize() {
        if (this.isMobile) {
            addClass([this.element], MOBILE);
        }
        if (this.allowMultiSelection) {
            addClass([this.element], CHECK_SELECT);
        }
        this.addCssClass(null, this.cssClass);
        this.renderFileUpload();
    }
    addWrapper() {
        const headerWrap = this.createElement('div', { id: this.element.id + TOOLBAR_ID });
        this.element.appendChild(headerWrap);
        const layoutWrap = this.createElement('div', {
            id: this.element.id + LAYOUT_ID, className: LAYOUT
        });
        this.element.appendChild(layoutWrap);
        const navigationWrap = this.createElement('div', {
            id: this.element.id + NAVIGATION_ID, className: NAVIGATION
        });
        const treeWrap = this.createElement('div', {
            id: this.element.id + TREE_ID
        });
        navigationWrap.appendChild(treeWrap);
        const contentWrap = this.createElement('div', {
            id: this.element.id + CONTENT_ID, className: LAYOUT_CONTENT
        });
        this.breadCrumbBarNavigation = this.createElement('div', {
            id: this.element.id + BREADCRUMBBAR_ID,
            className: BREADCRUMBS
        });
        contentWrap.appendChild(this.breadCrumbBarNavigation);
        const gridWrap = this.createElement('div', {
            id: this.element.id + GRID_ID
        });
        contentWrap.appendChild(gridWrap);
        const largeiconWrap = this.createElement('div', {
            id: this.element.id + LARGEICON_ID,
            className: LARGE_ICONS, attrs: { 'role': 'group' }
        });
        contentWrap.appendChild(largeiconWrap);
        const overlay = this.createElement('span', { className: OVERLAY });
        contentWrap.appendChild(overlay);
        let paneSettings;
        if (!this.enableRtl) {
            layoutWrap.appendChild(navigationWrap);
            layoutWrap.appendChild(contentWrap);
            paneSettings = [
                {
                    size: '25%', min: this.navigationPaneSettings.minWidth.toString(),
                    max: this.navigationPaneSettings.maxWidth.toString()
                },
                { size: '75%', min: '270px' }
            ];
        }
        else {
            layoutWrap.appendChild(contentWrap);
            layoutWrap.appendChild(navigationWrap);
            paneSettings = [
                { size: '75%', min: '270px' },
                {
                    size: '25%', min: this.navigationPaneSettings.minWidth.toString(),
                    max: this.navigationPaneSettings.maxWidth.toString()
                }
            ];
        }
        this.splitterObj = new Splitter({
            paneSettings: paneSettings,
            width: '100%',
            enableRtl: false,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            resizing: this.splitterResize.bind(this)
        });
        this.splitterObj.isStringTemplate = true;
        this.splitterObj.appendTo(layoutWrap);
        const dialogWrap = this.createElement('div', { id: this.element.id + DIALOG_ID });
        this.element.appendChild(dialogWrap);
        const menuWrap = this.createElement('ul', { id: this.element.id + CONTEXT_MENU_ID });
        this.element.appendChild(menuWrap);
        const dialogImgWrap = this.createElement('div', { id: this.element.id + IMG_DIALOG_ID });
        this.element.appendChild(dialogImgWrap);
        const extnDialogWrap = this.createElement('div', { id: this.element.id + EXTN_DIALOG_ID });
        this.element.appendChild(extnDialogWrap);
        const uploadDialogWrap = this.createElement('div', { id: this.element.id + UPLOAD_DIALOG_ID });
        this.element.appendChild(uploadDialogWrap);
    }
    adjustHeight() {
        const toolbar = select('#' + this.element.id + TOOLBAR_ID, this.element);
        const toolBarHeight = toolbar ? toolbar.offsetHeight : 0;
        if (this.splitterObj) {
            this.splitterObj.height = (this.element.clientHeight - toolBarHeight).toString();
            this.splitterObj.dataBind();
        }
    }
    /* istanbul ignore next */
    splitterResize() {
        this.notify(splitterResize, {});
    }
    splitterAdjust() {
        const bar = select('.' + SPLIT_BAR, this.element);
        if (this.navigationPaneSettings.visible) {
            this.splitterObj.expand(this.enableRtl ? 1 : 0);
            bar.classList.remove(DISPLAY_NONE);
        }
        else {
            this.splitterObj.collapse(this.enableRtl ? 1 : 0);
            bar.classList.add(DISPLAY_NONE);
        }
    }
    addCssClass(oldOne, newOne) {
        if (!isNullOrUndefined(oldOne) && oldOne !== '') {
            removeClass([this.element], oldOne.split(' '));
        }
        if (!isNullOrUndefined(newOne) && newOne !== '') {
            addClass([this.element], newOne.split(' '));
        }
    }
    showSpinner() {
        showSpinner(this.element);
    }
    hideSpinner() {
        hideSpinner(this.element);
    }
    onContextMenu(e) {
        e.preventDefault();
    }
    checkMobile() {
        return (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(Browser.userAgent.toLowerCase())
            && /mobile/i.test(Browser.userAgent.toLowerCase()));
    }
    renderFileUpload() {
        const id = this.element.id + UPLOAD_ID;
        const uploadEle = this.createElement('input', { id: id, attrs: { name: 'uploadFiles', type: 'file' } });
        this.element.appendChild(uploadEle);
        this.uploadDialogObj = new Dialog({
            header: getLocaleText(this, 'Header-Upload'),
            content: uploadEle,
            animationSettings: { effect: 'None' },
            showCloseIcon: true,
            closeOnEscape: true,
            visible: false,
            isModal: true,
            width: '350px',
            target: this.popupTarget ? this.popupTarget : '#' + this.element.id,
            cssClass: getCssClass(this, this.isMobile ? MOB_POPUP : ROOT_POPUP),
            locale: this.locale,
            allowDragging: true,
            position: { X: 'center', Y: 'center' },
            enableRtl: this.enableRtl,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            open: this.onOpen.bind(this),
            close: this.onClose.bind(this),
            beforeOpen: this.onBeforeOpen.bind(this),
            beforeClose: this.onBeforeClose.bind(this)
        });
        this.uploadDialogObj.appendTo('#' + this.element.id + UPLOAD_DIALOG_ID);
        this.renderUploadBox();
    }
    renderUploadBox() {
        const uploadUrl = this.ajaxSettings.uploadUrl ? this.ajaxSettings.uploadUrl : this.ajaxSettings.url;
        this.uploadObj = new Uploader({
            dropArea: select('#' + this.element.id + CONTENT_ID, this.element),
            asyncSettings: {
                saveUrl: uploadUrl,
                removeUrl: uploadUrl,
                chunkSize: this.uploadSettings.chunkSize,
                retryCount: 0
            },
            locale: this.locale,
            enableRtl: this.enableRtl,
            uploading: this.onUploading.bind(this),
            chunkUploading: this.onChunkUploading.bind(this),
            removing: this.onRemoving.bind(this),
            canceling: this.onCancel.bind(this),
            clearing: this.onClearing.bind(this),
            selected: this.onSelected.bind(this),
            success: this.onUploadSuccess.bind(this),
            failure: this.onUploadFailure.bind(this),
            autoUpload: this.uploadSettings.autoUpload,
            minFileSize: this.uploadSettings.minFileSize,
            maxFileSize: this.uploadSettings.maxFileSize,
            allowedExtensions: this.uploadSettings.allowedExtensions,
            directoryUpload: this.uploadSettings.directoryUpload,
            fileListRendering: this.onFileListRender.bind(this)
        });
        this.uploadObj.appendTo('#' + this.element.id + UPLOAD_ID);
    }
    onFileListRender(args) {
        this.trigger('uploadListCreate', args);
    }
    updateUploader() {
        this.uploadObj.autoUpload = this.uploadSettings.autoUpload;
        this.uploadObj.minFileSize = this.uploadSettings.minFileSize;
        this.uploadObj.maxFileSize = this.uploadSettings.maxFileSize;
        this.uploadObj.allowedExtensions = this.uploadSettings.allowedExtensions;
        this.uploadObj.directoryUpload = this.uploadSettings.directoryUpload;
        this.uploadObj.dataBind();
    }
    onBeforeOpen(args) {
        const eventArgs = {
            cancel: args.cancel, popupName: 'Upload', popupModule: this.uploadDialogObj
        };
        this.trigger('beforePopupOpen', eventArgs, (eventargs) => {
            args.cancel = eventargs.cancel;
        });
    }
    onBeforeClose(args) {
        const eventArgs = {
            cancel: args.cancel, popupName: 'Upload', popupModule: this.uploadDialogObj
        };
        this.trigger('beforePopupClose', eventArgs, (eventargs) => {
            args.cancel = eventargs.cancel;
        });
    }
    onOpen() {
        this.isOpened = true;
        this.uploadDialogObj.element.focus();
        const args = {
            popupModule: this.uploadDialogObj, popupName: 'Upload',
            element: this.uploadDialogObj.element
        };
        this.trigger('popupOpen', args);
    }
    onClose() {
        this.isOpened = false;
        this.uploadObj.clearAll();
        const args = {
            popupModule: this.uploadDialogObj, popupName: 'Upload',
            element: this.uploadDialogObj.element
        };
        this.trigger('popupClose', args);
    }
    /* istanbul ignore next */
    onChunkUploading(args) {
        let action = 'save';
        if ((this.retryArgs.length !== 0)) {
            for (let i = 0; i < this.retryArgs.length; i++) {
                if (args.fileData.name === this.retryArgs[i].file.name) {
                    action = this.retryArgs[i].action;
                }
            }
        }
        const data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'size': args.fileData.size }, { 'action': action }, { 'data': data }, { 'filename': args.fileData.name }];
    }
    /* istanbul ignore next */
    onUploading(args) {
        let action = 'save';
        if ((this.retryArgs.length !== 0)) {
            for (let i = 0; i < this.retryArgs.length; i++) {
                if (args.fileData.name === this.retryArgs[i].file.name) {
                    action = this.retryArgs[i].action;
                    if (this.uploadSettings.chunkSize === 0) {
                        this.retryArgs.splice(i, 1);
                        i = this.retryArgs.length;
                    }
                }
            }
        }
        const data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'size': args.fileData.size }, { 'action': action }, { 'data': data }, { 'filename': args.fileData.name }];
        const uploadUrl = this.ajaxSettings.uploadUrl ? this.ajaxSettings.uploadUrl : this.ajaxSettings.url;
        const ajaxSettings = {
            url: uploadUrl,
            type: 'POST',
            mode: true,
            dataType: null,
            contentType: null,
            data: JSON.stringify(args.customFormData),
            onSuccess: null,
            onFailure: null,
            beforeSend: null
        };
        this.uploadEventArgs = { action: 'Upload', ajaxSettings: ajaxSettings, cancel: false };
        this.trigger('beforeSend', this.uploadEventArgs, (uploadEventArgs) => {
            args.customFormData = JSON.parse(getValue('data', uploadEventArgs.ajaxSettings));
            args.cancel = uploadEventArgs.cancel;
            const eventArgs = {
                cancel: false,
                httpRequest: args.currentRequest
            };
            if (typeof getValue('beforeSend', uploadEventArgs.ajaxSettings) === 'function') {
                getValue('beforeSend', uploadEventArgs.ajaxSettings)(eventArgs);
                if (getValue('cancel', eventArgs)) {
                    args.cancel = getValue('cancel', eventArgs);
                }
            }
        });
    }
    onRemoving() {
        this.onFileUploadSuccess({ count: 1 });
        if (this.uploadObj.getFilesData().length === 1) {
            this.uploadDialogObj.hide();
        }
    }
    /* istanbul ignore next */
    onCancel(args) {
        const data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'action': 'remove' }, { 'data': data }];
    }
    /* istanbul ignore next */
    onClearing() {
        if (this.isOpened) {
            this.uploadDialogObj.hide();
        }
    }
    /* istanbul ignore next */
    onSelected(args) {
        if (args.filesData.length === 0) {
            return;
        }
        this.uploadingCount = args.filesData.length;
        this.uploadedCount = 0;
        const details = getPathObject(this);
        if (!hasUploadAccess(details)) {
            args.cancel = true;
            createDeniedDialog(this, details, permissionUpload);
            return;
        }
        this.uploadDialogObj.show();
    }
    onFileUploadSuccess(args) {
        this.uploadedCount = this.uploadedCount + args.count;
        if (this.uploadSettings.autoClose && (this.uploadingCount === this.uploadedCount)) {
            this.uploadDialogObj.hide();
        }
    }
    onChunkUploadComplete(files) {
        if ((this.retryArgs.length !== 0)) {
            for (let i = 0; i < this.retryArgs.length; i++) {
                const uploadFile = !isNullOrUndefined(files) ? getValue('file', files).name : '';
                if (uploadFile === this.retryArgs[i].file.name) {
                    this.retryArgs.splice(i, 1);
                    i = this.retryArgs.length;
                }
            }
        }
    }
    /* istanbul ignore next */
    onUploadSuccess(files) {
        if (this.uploadSettings.chunkSize > 0) {
            this.onChunkUploadComplete(files);
        }
        const args = { action: 'Upload', result: files };
        this.trigger('success', args);
        this.itemData = [getValue(this.pathId[this.pathId.length - 1], this.feParent)];
        read(this, pathChanged, this.path);
        this.onFileUploadSuccess({ count: 1 });
        if (typeof getValue('onSuccess', this.uploadEventArgs.ajaxSettings) === 'function') {
            getValue('onSuccess', this.uploadEventArgs.ajaxSettings)();
        }
    }
    /* istanbul ignore next */
    onUploadFailure(files) {
        if (this.uploadSettings.chunkSize > 0) {
            this.onChunkUploadComplete(files);
        }
        const response = getValue('response', files);
        const statusText = getValue('statusText', response);
        if (statusText !== '') {
            setValue('statusText', statusText, files);
        }
        const args = { action: 'Upload', error: files };
        this.trigger('failure', args);
        if (getValue('statusCode', response) === 400) {
            this.retryFiles.push(getValue('file', files));
            if (!this.isRetryOpened) {
                createExtDialog(this, 'UploadRetry');
            }
        }
        if (typeof getValue('onFailure', this.uploadEventArgs.ajaxSettings) === 'function') {
            getValue('onFailure', this.uploadEventArgs.ajaxSettings)();
        }
    }
    onInitialEnd() {
        setNextPath(this, this.path);
    }
    addEventListeners() {
        this.on(beforeRequest, this.showSpinner, this);
        this.on(afterRequest, this.hideSpinner, this);
        this.on(initialEnd, this.onInitialEnd, this);
        this.on(detailsInit, this.onDetailsInit, this);
        this.on(skipUpload, this.onFileUploadSuccess, this);
        EventHandler.add(this.element, 'contextmenu', this.onContextMenu, this);
    }
    removeEventListeners() {
        if (this.isDestroyed) {
            return;
        }
        this.off(beforeRequest, this.showSpinner);
        this.off(afterRequest, this.hideSpinner);
        this.off(initialEnd, this.onInitialEnd);
        this.off(detailsInit, this.onDetailsInit);
        this.off(skipUpload, this.onFileUploadSuccess);
        EventHandler.remove(this.element, 'contextmenu', this.onContextMenu);
    }
    onDetailsInit() {
        if (isNullOrUndefined(this.activeModule)) {
            this.itemData = [getValue(this.pathId[this.pathId.length - 1], this.feParent)];
        }
    }
    resizeHandler() {
        this.adjustHeight();
        this.notify(resizeEnd, {});
    }
    keyActionHandler(e) {
        let uploadEle;
        switch (e.action) {
            case 'altN':
                e.preventDefault();
                this.itemData = [getPathObject(this)];
                if (!hasContentAccess(this.itemData[0])) {
                    createDeniedDialog(this, this.itemData[0], permissionEditContents);
                }
                else {
                    createDialog(this, 'NewFolder');
                }
                break;
            case 'f5':
                e.preventDefault();
                refresh(this);
                break;
            /* istanbul ignore next */
            case 'ctrlShift1':
                e.preventDefault();
                this.fileView = 'Details';
                this.setProperties({ view: 'Details' }, true);
                showSpinner(this.element);
                updateLayout(this, 'Details');
                break;
            /* istanbul ignore next */
            case 'ctrlShift2':
                e.preventDefault();
                this.fileView = 'LargeIcons';
                this.setProperties({ view: 'LargeIcons' }, true);
                showSpinner(this.element);
                updateLayout(this, 'LargeIcons');
                break;
            case 'ctrlU':
                e.preventDefault();
                if (this.toolbarSettings.items.indexOf('Upload') !== -1) {
                    uploadEle = select('#' + this.element.id + UPLOAD_ID, this.element);
                    uploadEle.click();
                }
                break;
        }
    }
    wireSelectOnDragEvent(isBind) {
        if (isNullOrUndefined(this.view)) {
            return;
        }
        if (isBind) {
            this.viewElem = this.view === 'LargeIcons' ? this.largeiconsviewModule.element : this.element.querySelector('.e-gridcontent');
        }
        if (!this.viewElem) {
            return;
        }
        if (isBind) {
            if (this.allowMultiSelection) {
                EventHandler.add(this.viewElem, 'mousedown', this.onDragStart, this);
                this.on(layoutChange, this.onLayoutChange, this);
                this.on(selectionChanged, this.onLayoutChange, this);
            }
        }
        else {
            EventHandler.remove(this.viewElem, 'mousedown', this.onDragStart);
            this.off(layoutChange, this.onLayoutChange);
            this.off(selectionChanged, this.onLayoutChange);
        }
    }
    wireEvents() {
        if (this.enableRangeSelection) {
            this.wireSelectOnDragEvent(true);
        }
        EventHandler.add(window, 'resize', this.resizeHandler, this);
        if (this.contextMenuSettings.visible) {
            this.element.addEventListener('scroll', this.onScrollHandler, true);
        }
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    unWireEvents() {
        this.wireSelectOnDragEvent(false);
        EventHandler.remove(window, 'resize', this.resizeHandler);
        if (this.contextMenuSettings.visible) {
            this.element.removeEventListener('scroll', this.onScrollHandler, true);
        }
        this.keyboardModule.destroy();
    }
    onDragStart(event) {
        if (this.viewElem) {
            if (this.allowDragAndDrop) {
                const targetElement = closest(event.target, this.viewElem.classList.contains('e-large-icons') ? '.e-list-item' : '.e-fe-text');
                if (targetElement) {
                    return;
                }
            }
            event.preventDefault();
            this.dragX = event.pageX;
            this.dragY = event.pageY;
            if (!this.dragSelectElement) {
                this.dragSelectElement = createElement('div', {
                    id: this.element.id + '_drag',
                    className: 'e-filemanager e-drag-select',
                    styles: 'left: ' + this.dragX + 'px;top: ' + this.dragY + 'px;'
                });
                document.body.append(this.dragSelectElement);
            }
            EventHandler.add(document, 'mouseup', this.onDragStop, this);
            EventHandler.add(this.viewElem, 'mousemove', this.onDrag, this);
            EventHandler.add(this.dragSelectElement, 'mousemove', this.onDrag, this);
        }
    }
    onDrag(event) {
        event.stopPropagation();
        if (this.dragSelectElement) {
            const diffX = event.pageX - this.dragX;
            const diffY = event.pageY - this.dragY;
            setStyleAttribute(this.dragSelectElement, {
                'left': diffX < 0 ? this.dragX + diffX + 'px' : this.dragX + 'px', 'top': diffY < 0 ? this.dragY + diffY + 'px' : this.dragY + 'px',
                'height': Math.abs(diffY) + 'px', 'width': Math.abs(diffX) + 'px'
            });
            this.selectItems();
        }
        else {
            EventHandler.remove(this.viewElem, 'mousemove', this.onDrag);
        }
    }
    onDragStop() {
        if (this.viewElem) {
            EventHandler.remove(document, 'mouseup', this.onDragStop);
            EventHandler.remove(this.viewElem, 'mousemove', this.onDrag);
        }
        if (this.dragSelectElement) {
            EventHandler.remove(this.dragSelectElement, 'mousemove', this.onDrag);
            if (this.dragSelectElement.clientHeight > 0 && this.dragSelectElement.clientWidth > 0) {
                this.setProperties({ selectedItems: this.dragSelectedItems });
            }
            this.dragSelectedItems = [];
            detach(this.dragSelectElement);
            this.dragSelectElement = null;
        }
    }
    selectItems() {
        const dragRect = this.dragSelectElement.getBoundingClientRect();
        if (dragRect.height > 0 && dragRect.width > 0) {
            this.dragSelectedItems = [];
            removeClass(selectAll('.e-active', this.viewElem), ['e-active', 'e-focus']);
            removeClass(selectAll('.e-check', this.viewElem), ['e-check']);
        }
        const allItems = selectAll(this.viewElem.classList.contains('e-large-icons') ? '.e-list-item' : '.e-row', this.viewElem);
        for (const item of allItems) {
            const itemRect = item.getBoundingClientRect();
            if (!(dragRect.right < itemRect.left || dragRect.left > itemRect.right
                || dragRect.bottom < itemRect.top || dragRect.top > itemRect.bottom)
                && (dragRect.height > 0 && dragRect.width > 0)) {
                if (this.viewElem.classList.contains('e-large-icons')) {
                    item.classList.add('e-active');
                    this.dragSelectedItems.push(item.getAttribute('title'));
                }
                else {
                    addClass(selectAll('.e-rowcell', item), ['e-active']);
                    this.dragSelectedItems.push(item.querySelector('.e-drag-text').textContent);
                }
                item.querySelector('.e-frame').classList.add('e-check');
            }
        }
    }
    onLayoutChange() {
        if (this.enableRangeSelection) {
            this.unWireEvents();
            this.wireEvents();
        }
    }
    setPath() {
        this.setProperties({ selectedItems: [] }, true);
        this.ensurePath();
        this.notify(clearPathInit, { selectedNode: this.pathId[0] });
        read(this, (this.path !== this.originalPath) ? initialEnd : finalizeEnd, this.path);
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FileManager} newProp
     * @param  {FileManager} oldProp
     * @returns void
     * @private
     */
    /* istanbul ignore next */
    onPropertyChanged(newProp, oldProp) {
        let height;
        let requiresRefresh = false;
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'ajaxSettings':
                    this.ajaxSettingSetModel(newProp);
                    break;
                case 'allowDragAndDrop':
                    this.allowDragAndDrop = newProp.allowDragAndDrop;
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'showItemCheckBoxes':
                    this.showItemCheckBoxes = newProp.showItemCheckBoxes;
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'enableVirtualization':
                    this.enableVirtualization = newProp.enableVirtualization;
                    requiresRefresh = true;
                    break;
                case 'allowMultiSelection':
                    if (this.allowMultiSelection) {
                        addClass([this.element], CHECK_SELECT);
                    }
                    else {
                        if (this.selectedItems.length > 1) {
                            this.setProperties({ selectedItems: this.selectedItems.slice(this.selectedItems.length - 1) }, true);
                        }
                        removeClass([this.element], CHECK_SELECT);
                    }
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'cssClass':
                    this.addCssClass(oldProp.cssClass, newProp.cssClass);
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'detailsViewSettings':
                    this.notify(modelChanged, { module: 'detailsview', newProp: newProp, oldProp: oldProp });
                    break;
                case 'enableRangeSelection':
                    this.wireSelectOnDragEvent(false);
                    if (newProp.enableRangeSelection) {
                        this.wireSelectOnDragEvent(true);
                    }
                    break;
                case 'enableRtl':
                    this.enableRtl = newProp.enableRtl;
                    requiresRefresh = true;
                    break;
                case 'rootAliasName':
                    this.rootAliasName = newProp.rootAliasName;
                    requiresRefresh = true;
                    break;
                case 'height':
                    height = !isNullOrUndefined(newProp.height) ? formatUnit(newProp.height) : newProp.height;
                    setStyleAttribute(this.element, { 'height': height });
                    this.adjustHeight();
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'locale':
                    if (!isNullOrUndefined(newProp.enableRtl)) {
                        this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    }
                    this.localeSetModelOption(newProp);
                    break;
                case 'navigationPaneSettings':
                    this.splitterAdjust();
                    this.notify(modelChanged, { module: 'navigationpane', newProp: newProp, oldProp: oldProp });
                    break;
                case 'path':
                    this.setPath();
                    break;
                case 'searchSettings':
                    if (!isNullOrUndefined(newProp.searchSettings.allowSearchOnTyping)) {
                        this.setProperties({ searchSettings: { allowSearchOnTyping: newProp.searchSettings.allowSearchOnTyping } }, true);
                    }
                    if (isNullOrUndefined(newProp.searchSettings.ignoreCase)) {
                        this.setProperties({ searchSettings: { ignoreCase: newProp.searchSettings.ignoreCase } }, true);
                    }
                    if (isNullOrUndefined(newProp.searchSettings.filterType)) {
                        this.setProperties({ searchSettings: { filterType: newProp.searchSettings.filterType } }, true);
                    }
                    this.notify(modelChanged, { module: 'breadcrumbbar', newProp: newProp, oldProp: oldProp });
                    break;
                case 'selectedItems':
                    if (this.view === 'Details') {
                        this.notify(modelChanged, { module: 'detailsview', newProp: newProp, oldProp: oldProp });
                    }
                    else if (this.view === 'LargeIcons') {
                        this.notify(modelChanged, { module: 'largeiconsview', newProp: newProp, oldProp: oldProp });
                    }
                    break;
                case 'showFileExtension':
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'showHiddenItems':
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'showThumbnail':
                    this.notify(modelChanged, { module: 'largeiconsview', newProp: newProp, oldProp: oldProp });
                    break;
                case 'toolbarSettings':
                case 'toolbarItems':
                    this.adjustHeight();
                    this.notify(modelChanged, { module: 'toolbar', newProp: newProp, oldProp: oldProp });
                    break;
                case 'uploadSettings':
                    this.updateUploader();
                    break;
                case 'view':
                    if (newProp.view === 'Details') {
                        this.notify(modelChanged, { module: 'detailsview', newProp: newProp, oldProp: oldProp });
                    }
                    else if (newProp.view === 'LargeIcons') {
                        this.notify(modelChanged, { module: 'largeiconsview', newProp: newProp, oldProp: oldProp });
                    }
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': !isNullOrUndefined(newProp.width) ? formatUnit(newProp.width) : newProp.width });
                    this.notify(modelChanged, { module: 'common', newProp: newProp, oldProp: oldProp });
                    break;
                case 'sortOrder':
                    refresh(this);
                    this.notify(sortByChange, {});
                    break;
                case 'sortBy':
                    if (this.view === 'Details') {
                        const columns = this.detailsViewSettings.columns;
                        const isValidSortField = !isNullOrUndefined(columns) &&
                            columns.findIndex((col) => col.field === this.sortBy) !== -1;
                        if (!isValidSortField) {
                            return;
                        }
                        refresh(this);
                        this.notify(sortByChange, {});
                        this.notify(sortColumn, {});
                    }
                    else {
                        refresh(this);
                        this.notify(sortByChange, {});
                    }
                    break;
                case 'popupTarget':
                    if (this.uploadDialogObj) {
                        this.uploadDialogObj.target = newProp.popupTarget;
                    }
                    if (this.dialogObj) {
                        this.dialogObj.target = newProp.popupTarget;
                    }
                    if (this.extDialogObj) {
                        this.extDialogObj.target = newProp.popupTarget;
                    }
                    if (this.viewerObj) {
                        this.viewerObj.target = newProp.popupTarget;
                    }
                    break;
                case 'fileSystemData':
                    this.fileSystemData = newProp.fileSystemData;
                    requiresRefresh = true;
                    break;
            }
        }
        if (requiresRefresh) {
            this.refresh();
        }
    }
    /* istanbul ignore next */
    ajaxSettingSetModel(newProp) {
        if (!isNullOrUndefined(newProp.ajaxSettings.url)) {
            this.setProperties({ ajaxSettings: { url: newProp.ajaxSettings.url } }, true);
        }
        if (!isNullOrUndefined(newProp.ajaxSettings.uploadUrl)) {
            this.setProperties({ ajaxSettings: { uploadUrl: newProp.ajaxSettings.uploadUrl } }, true);
        }
        if (!isNullOrUndefined(newProp.ajaxSettings.downloadUrl)) {
            this.setProperties({ ajaxSettings: { downloadUrl: newProp.ajaxSettings.downloadUrl } }, true);
        }
        if (!isNullOrUndefined(newProp.ajaxSettings.getImageUrl)) {
            this.setProperties({ ajaxSettings: { getImageUrl: newProp.ajaxSettings.getImageUrl } }, true);
        }
        this.setProperties({ path: '/' }, true);
        this.setProperties({ selectedItems: [] }, true);
        super.refresh();
    }
    /* istanbul ignore next */
    localeSetModelOption(newProp) {
        this.uploadObj.locale = newProp.locale;
        super.refresh();
    }
    /**
     * Triggers when the component is destroyed.
     *
     * @returns {void}
     */
    destroy() {
        if (this.isDestroyed) {
            return;
        }
        if (!this.refreshing) {
            this.notify(destroy, {});
        }
        this.uploadObj.destroy();
        this.uploadObj = null;
        this.uploadDialogObj.destroy();
        this.uploadDialogObj = null;
        this.splitterObj.destroy();
        this.splitterObj = null;
        if (this.dialogObj) {
            this.dialogObj.destroy();
            this.dialogObj = null;
        }
        if (this.viewerObj) {
            this.viewerObj.destroy();
            this.viewerObj = null;
        }
        if (this.extDialogObj) {
            this.extDialogObj.destroy();
            this.extDialogObj = null;
        }
        this.element.removeAttribute('style');
        this.element.removeAttribute('tabindex');
        this.removeEventListeners();
        this.unWireEvents();
        this.addCssClass(this.cssClass, null);
        removeClass([this.element], [RTL, MOBILE, CHECK_SELECT]);
        this.element.innerHTML = '';
        this.breadCrumbBarNavigation = null;
        this.activeElements = null;
        this.virtualDragElement = null;
        this.visitedItem = null;
        super.destroy();
        this.virtualizationModule = null;
        this.navigationpaneModule = null;
        this.toolbarModule = null;
        this.contextmenuModule = null;
        this.largeiconsviewModule = null;
        this.detailsviewModule = null;
        this.breadcrumbbarModule = null;
        this.viewElem = null;
        this.dragSelectElement = null;
        this.dragSelectedItems = null;
    }
    /**
     * Creates a new folder in file manager.
     *
     * @param {string} name – Specifies the name of new folder in current path.
     * If it is not specified, then the default new folder dialog will be opened.
     * @returns {void}
     */
    createFolder(name) {
        this.notify(methodCall, { action: 'createFolder' });
        const details = [getPathObject(this)];
        this.itemData = details;
        if (name) {
            if (/[/\\|*?"<>:]/.test(name)) {
                const result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(this, 'Validation-Invalid').replace('{0}', '"' + name + '"'),
                        fileExists: null
                    }
                };
                createDialog(this, 'Error', result);
            }
            else {
                if (!hasContentAccess(details[0])) {
                    createDeniedDialog(this, details[0], permissionEditContents);
                }
                else {
                    createFolder(this, name);
                }
            }
        }
        else {
            createNewFolder(this);
        }
    }
    /**
     * Deletes the folders or files from the given unique identifiers.
     *
     * @param {string} ids - Specifies the name of folders or files in current path. If you want to delete the nested level folders or
     * files, then specify the filter path along with name of the folders or files when performing the search or custom filtering.
     * For ID based file provider, specify the unique identifier of folders or files.
     * If it is not specified, then delete confirmation dialog will be opened for selected item.
     *
     * @returns {void}
     */
    deleteFiles(ids) {
        this.notify(methodCall, { action: 'deleteFiles', ids: ids });
    }
    /**
     * Disables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    disableToolbarItems(items) {
        if (!isNullOrUndefined(items) && this.toolbarModule) {
            this.toolbarModule.enableItems(items, false);
        }
    }
    /**
     * Downloads the folders or files from the given unique identifiers.
     *
     * @param {string} ids - Specifies the name of folders or files in current path. If you want to download the nested level folders
     * or files, then specify the filter path along with name of the folders or files when performing search or custom filtering.
     * For ID based file provider, specify the unique identifier of folders or files.
     * If it is not specified, then the selected items will be downloaded.
     *
     * @returns {void}
     */
    downloadFiles(ids) {
        this.notify(methodCall, { action: 'downloadFiles', ids: ids });
    }
    /**
     * Enables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be enabled.
     * @returns {void}
     */
    enableToolbarItems(items) {
        if (!isNullOrUndefined(items) && this.toolbarModule) {
            this.toolbarModule.enableItems(items, true);
        }
    }
    /**
     * Enables the specified menu items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be enabled.
     * @returns {void}
     */
    enableMenuItems(items) {
        if (!isNullOrUndefined(items) && !isNullOrUndefined(this.contextmenuModule) && !isNullOrUndefined(this.contextmenuModule.contextMenu)) {
            this.contextmenuModule.enableItems(items, true, true);
        }
    }
    /**
     * Disables the specified context menu items in file manager. This method is used only in the menuOpen event.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    disableMenuItems(items) {
        if (!isNullOrUndefined(items) && !isNullOrUndefined(this.contextmenuModule) && !isNullOrUndefined(this.contextmenuModule.contextMenu)) {
            this.contextmenuModule.disableItem(items);
        }
    }
    /**
     * Returns the index position of given current context menu item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns menu item index.
     */
    getMenuItemIndex(item) {
        if (this.contextmenuModule) {
            return this.contextmenuModule.getItemIndex(item);
        }
        else {
            return -1;
        }
    }
    /**
     * Returns the index position of given toolbar item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns toolbar item index.
     */
    getToolbarItemIndex(item) {
        if (this.toolbarModule) {
            return this.toolbarModule.getItemIndex(item);
        }
        else {
            return -1;
        }
    }
    /**
     * Display the custom filtering files in file manager.
     *
     * @param {Object} filterData - Specifies the custom filter details along with custom file action name,
     * which needs to be sent to the server side. If you do not specify the details, then default action name will be `filter`.
     *
     * @returns {void}
     */
    filterFiles(filterData) {
        this.filterData = filterData ? filterData : null;
        this.setProperties({ selectedItems: [] }, true);
        this.notify(selectionChanged, {});
        this.isFiltered = true;
        if (this.breadcrumbbarModule.searchObj.element.value !== '') {
            this.breadcrumbbarModule.searchObj.element.value = '';
        }
        filter(this, filterEnd);
    }
    /**
     * Gets the details of the selected files in the file manager.
     *
     * @returns {Object[]} - returns selected files.
     */
    getSelectedFiles() {
        this.notify(updateSelectionData, {});
        return this.itemData;
    }
    /**
     * Opens the corresponding file or folder from the given unique identifier.
     *
     * @param {string} id - Specifies the name of folder or file in current path. If you want to open the nested level folder or
     * file, then specify the filter path along with name of the folder or file when performing search or custom filtering. For ID based
     * file provider, specify the unique identifier of folder or file.
     *
     * @returns {void}
     */
    openFile(id) {
        this.notify(methodCall, { action: 'openFile', id: id });
    }
    /**
     * Refreshes the folder files of the file manager.
     *
     * @returns {void}
     */
    refreshFiles() {
        refresh(this);
    }
    /**
     * Refreshes the layout of the file manager.
     *
     * @returns {void}
     */
    refreshLayout() {
        this.adjustHeight();
        this.notify(layoutRefresh, {});
    }
    /**
     * Selects the entire folders and files in current path.
     *
     * @returns {void}
     */
    selectAll() {
        this.notify(methodCall, { action: 'selectAll' });
    }
    /**
     * Specifies the method that must be invoked to traverse the path backwards in the file manager.
     *
     * @returns {void}
     */
    traverseBackward() {
        if (this.pathNames.length > 1 && this.breadcrumbbarModule.searchObj.element.value === '' && !this.isFiltered) {
            this.pathId.pop();
            this.pathNames.pop();
            let newPath = this.pathNames.slice(1).join('/');
            newPath = newPath === '' ? '/' : '/' + newPath + '/';
            this.setProperties({ path: newPath }, true);
            read(this, pathChanged, this.path);
            const treeNodeId = this.pathId[this.pathId.length - 1];
            this.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
        }
    }
    /**
     * Deselects the currently selected folders and files in current path.
     *
     * @returns {void}
     */
    clearSelection() {
        this.notify(methodCall, { action: 'clearSelection' });
    }
    /**
     * Renames the file or folder with given new name in file manager.
     *
     * @param {string} id - Specifies the name of folder or file in current path. If you want to rename the nested level folder or
     * file, then specify the filter path along with name of the folder or file when performing search or custom filtering. For ID based
     * file provider, specify the unique identifier of folder or file.
     * If it is not specified, then rename dialog will be opened for selected item.
     *
     * @param {string} name – Specifies the new name of the file or folder in current path. If it is not specified, then rename dialog
     * will be opened for given identifier.
     *
     * @returns {void}
     */
    renameFile(id, name) {
        this.notify(methodCall, { action: 'renameFile', id: id, newName: name });
    }
    /**
     * Opens the upload dialog in file manager.
     *
     * @returns {void}
     */
    uploadFiles() {
        const details = [getPathObject(this)];
        this.itemData = details;
        uploadItem(this);
    }
    /**
     * Specifies the method which must be invoked to programmatically close the dialog popup in the file manager.
     *
     * @returns {void}
     */
    closeDialog() {
        closePopup(this);
    }
    /**
     * Specifies the direction of FileManager
     *
     * @param {boolean} rtl - specifies rtl parameter.
     * @returns {void}
     */
    setRtl(rtl) {
        if (rtl) {
            this.addCssClass(null, RTL);
        }
        else {
            this.addCssClass(RTL, null);
        }
        if (this.uploadObj) {
            this.uploadDialogObj.enableRtl = rtl;
            this.uploadObj.enableRtl = rtl;
        }
    }
};
__decorate$8([
    Complex({}, AjaxSettings)
], FileManager.prototype, "ajaxSettings", void 0);
__decorate$8([
    Property([])
], FileManager.prototype, "fileSystemData", void 0);
__decorate$8([
    Property(false)
], FileManager.prototype, "allowDragAndDrop", void 0);
__decorate$8([
    Property(true)
], FileManager.prototype, "allowMultiSelection", void 0);
__decorate$8([
    Property(true)
], FileManager.prototype, "showItemCheckBoxes", void 0);
__decorate$8([
    Complex({}, ContextMenuSettings)
], FileManager.prototype, "contextMenuSettings", void 0);
__decorate$8([
    Property('')
], FileManager.prototype, "cssClass", void 0);
__decorate$8([
    Complex({}, DetailsViewSettings)
], FileManager.prototype, "detailsViewSettings", void 0);
__decorate$8([
    Property(true)
], FileManager.prototype, "enableHtmlSanitizer", void 0);
__decorate$8([
    Property(false)
], FileManager.prototype, "enablePersistence", void 0);
__decorate$8([
    Property(false)
], FileManager.prototype, "enableVirtualization", void 0);
__decorate$8([
    Property('400px')
], FileManager.prototype, "height", void 0);
__decorate$8([
    Property('LargeIcons')
], FileManager.prototype, "view", void 0);
__decorate$8([
    Complex({}, NavigationPaneSettings)
], FileManager.prototype, "navigationPaneSettings", void 0);
__decorate$8([
    Property('/')
], FileManager.prototype, "path", void 0);
__decorate$8([
    Property(null)
], FileManager.prototype, "popupTarget", void 0);
__decorate$8([
    Complex({}, SearchSettings)
], FileManager.prototype, "searchSettings", void 0);
__decorate$8([
    Property()
], FileManager.prototype, "selectedItems", void 0);
__decorate$8([
    Property(true)
], FileManager.prototype, "showFileExtension", void 0);
__decorate$8([
    Property(null)
], FileManager.prototype, "rootAliasName", void 0);
__decorate$8([
    Property(false)
], FileManager.prototype, "showHiddenItems", void 0);
__decorate$8([
    Property(true)
], FileManager.prototype, "showThumbnail", void 0);
__decorate$8([
    Property('Ascending')
], FileManager.prototype, "sortOrder", void 0);
__decorate$8([
    Property('name')
], FileManager.prototype, "sortBy", void 0);
__decorate$8([
    Property(null)
], FileManager.prototype, "sortComparer", void 0);
__decorate$8([
    Property(false)
], FileManager.prototype, "enableRangeSelection", void 0);
__decorate$8([
    Complex({}, ToolbarSettings)
], FileManager.prototype, "toolbarSettings", void 0);
__decorate$8([
    Collection([], ToolbarItem)
], FileManager.prototype, "toolbarItems", void 0);
__decorate$8([
    Complex({}, UploadSettings)
], FileManager.prototype, "uploadSettings", void 0);
__decorate$8([
    Property('100%')
], FileManager.prototype, "width", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileLoad", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileOpen", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeDownload", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeImageLoad", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforePopupClose", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforePopupOpen", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeSend", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "created", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeFolderCreate", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "folderCreate", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "destroyed", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeDelete", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "delete", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeRename", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "rename", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "beforeMove", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "move", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "search", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileDragStart", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileDragging", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileDragStop", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileDropped", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileSelection", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "fileSelect", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "menuClick", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "menuOpen", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "menuClose", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "failure", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "popupClose", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "popupOpen", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "success", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "toolbarClick", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "toolbarCreate", void 0);
__decorate$8([
    Event()
], FileManager.prototype, "uploadListCreate", void 0);
FileManager = FileManager_1 = __decorate$8([
    NotifyPropertyChanges
], FileManager);

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Toolbar module
 */
class Toolbar {
    /**
     * Constructor for the Toolbar module
     *
     * @hidden
     * @param {IFileManager} parent - specifies the parent element.
     * @private
     */
    constructor(parent) {
        this.default = ['Delete', 'Rename', 'Download', 'Cut', 'Copy', 'Paste'];
        this.single = ['Delete', 'Rename', 'Download', 'Cut', 'Copy'];
        this.multiple = ['Delete', 'Download', 'Cut', 'Copy', 'Refresh'];
        this.selection = ['NewFolder', 'Upload', 'SortBy', 'Refresh'];
        this.parent = parent;
        this.render();
        this.addEventListener();
    }
    render() {
        this.items = this.toolbarItemData(this.getItems(this.parent.toolbarSettings.items.map((item) => item.trim())));
        const eventArgs = { items: this.items };
        this.parent.trigger('toolbarCreate', eventArgs, (toolbarCreateArgs) => {
            this.items = toolbarCreateArgs.items;
            this.toolbarObj = new Toolbar$1({
                items: this.items,
                created: this.toolbarCreateHandler.bind(this),
                overflowMode: 'Popup',
                clicked: this.onClicked.bind(this),
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                enableRtl: this.parent.enableRtl
            });
            this.toolbarObj.isStringTemplate = true;
            this.toolbarObj.root = this.parent.root ? this.parent.root : this.parent;
            this.toolbarObj.appendTo('#' + this.parent.element.id + TOOLBAR_ID);
        });
    }
    getItemIndex(item) {
        const itemId = this.getId(item);
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === itemId) {
                return i;
            }
        }
        return -1;
    }
    getItems(items) {
        let currItems = items.slice();
        if (this.parent.isDevice && this.parent.allowMultiSelection) {
            currItems.push('SelectAll');
        }
        if (this.parent.toolbarItems.length > 0) {
            currItems = this.parent.toolbarItems.map((item) => item.name);
        }
        return currItems;
    }
    /* istanbul ignore next */
    onClicked(args) {
        if (isNullOrUndefined(args.item) || !args.item.id) {
            return;
        }
        const tool = args.item.id.substr((this.parent.element.id + '_tb_').length);
        let details;
        if (tool === 'refresh' || tool === 'newfolder' || tool === 'upload') {
            details = [getPathObject(this.parent)];
            this.parent.itemData = details;
        }
        else {
            this.parent.notify(selectedData, {});
            details = this.parent.itemData;
        }
        const eventArgs = { cancel: false, fileDetails: details, item: args.item };
        this.parent.trigger('toolbarClick', eventArgs, (toolbarClickArgs) => {
            let sItems;
            let target;
            if (!toolbarClickArgs.cancel) {
                switch (tool) {
                    case 'sortby':
                        target = closest(args.originalEvent.target, '.' + TB_ITEM);
                        if (target && target.classList.contains('e-toolbar-popup')) {
                            args.cancel = true;
                        }
                        break;
                    case 'newfolder':
                        createNewFolder(this.parent);
                        break;
                    case 'cut':
                        cutFiles(this.parent);
                        break;
                    case 'copy':
                        copyFiles(this.parent);
                        break;
                    case 'delete':
                        for (let i = 0; i < details.length; i++) {
                            if (!hasEditAccess(details[i])) {
                                createDeniedDialog(this.parent, details[i], permissionEdit);
                                return;
                            }
                        }
                        createDialog(this.parent, 'Delete');
                        break;
                    case 'details':
                        this.parent.notify(detailsInit, {});
                        sItems = this.parent.selectedItems;
                        if (this.parent.activeModule === 'navigationpane') {
                            sItems = [];
                        }
                        GetDetails(this.parent, sItems, this.parent.path, 'details');
                        break;
                    case 'paste':
                        this.parent.folderPath = '';
                        pasteHandler(this.parent);
                        break;
                    case 'refresh':
                        refresh(this.parent);
                        break;
                    case 'download':
                        doDownload(this.parent);
                        break;
                    case 'rename':
                        if (!hasEditAccess(details[0])) {
                            createDeniedDialog(this.parent, details[0], permissionEdit);
                        }
                        else {
                            this.parent.notify(renameInit, {});
                            createDialog(this.parent, 'Rename');
                        }
                        break;
                    case 'upload':
                        uploadItem(this.parent);
                        break;
                    case 'selectall':
                        this.parent.notify(selectAllInit, {});
                        break;
                    case 'selection':
                        this.parent.notify(clearAllInit, {});
                        break;
                }
            }
        });
    }
    toolbarCreateHandler() {
        if (!isNullOrUndefined(select('#' + this.getId('SortBy'), this.parent.element))) {
            const items = [
                { id: this.getPupupId('name'), text: getLocaleText(this.parent, 'Name'),
                    iconCss: this.parent.sortBy === 'name' ? TB_OPTION_DOT : '' },
                { id: this.getPupupId('size'), text: getLocaleText(this.parent, 'Size'),
                    iconCss: this.parent.sortBy === 'size' ? TB_OPTION_DOT : '' },
                { id: this.getPupupId('date'), text: getLocaleText(this.parent, 'DateModified'),
                    iconCss: this.parent.sortBy === '_fm_modified' ? TB_OPTION_DOT : '' },
                { separator: true },
                { id: this.getPupupId('ascending'), text: getLocaleText(this.parent, 'Ascending'),
                    iconCss: this.parent.sortOrder === 'Ascending' ? TB_OPTION_TICK : '' },
                { id: this.getPupupId('descending'), text: getLocaleText(this.parent, 'Descending'),
                    iconCss: this.parent.sortOrder === 'Descending' ? TB_OPTION_TICK : '' },
                { id: this.getPupupId('none'), text: getLocaleText(this.parent, 'None'),
                    iconCss: this.parent.sortOrder === 'None' ? TB_OPTION_TICK : '' }
            ];
            this.buttonObj = new DropDownButton({
                items: items, cssClass: getCssClass(this.parent, ROOT_POPUP),
                select: sortbyClickHandler.bind(this, this.parent),
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                enableRtl: this.parent.enableRtl, iconCss: ICON_SHORTBY
            });
            this.buttonObj.isStringTemplate = true;
            this.buttonObj.appendTo('#' + this.getId('SortBy'));
        }
        if (!isNullOrUndefined(select('#' + this.getId('View'), this.parent.element))) {
            const gridSpan = '<span class="' + ICON_GRID + ' ' + MENU_ICON + '"></span>';
            const largeIconSpan = '<span class="' + ICON_LARGE + ' ' + MENU_ICON + '"></span>';
            const layoutItems = [
                {
                    id: this.getPupupId('large'), text: getLocaleText(this.parent, 'View-LargeIcons'),
                    iconCss: this.parent.view === 'Details' ? '' : TB_OPTION_TICK
                },
                {
                    id: this.getPupupId('details'), text: getLocaleText(this.parent, 'View-Details'),
                    iconCss: this.parent.view === 'Details' ? TB_OPTION_TICK : ''
                }
            ];
            this.layoutBtnObj = new DropDownButton({
                iconCss: this.parent.view === 'Details' ? ICON_GRID : ICON_LARGE,
                cssClass: getCssClass(this.parent, 'e-caret-hide ' + ROOT_POPUP),
                items: layoutItems, select: this.layoutChange.bind(this),
                enableRtl: this.parent.enableRtl,
                content: '<span class="e-tbar-btn-text">' + getLocaleText(this.parent, 'View') + '</span>',
                beforeItemRender: (args) => {
                    const tickIcon = args.item.iconCss;
                    const viewText = args.item.text === getLocaleText(this.parent, 'View-LargeIcons');
                    const iconClass = tickIcon ? ' e-menu-icon ' + tickIcon : '';
                    args.element.innerHTML = '<span class="' + iconClass + '"></span>' + (viewText ? largeIconSpan : gridSpan) + args.item.text;
                    const span = args.element.firstChild;
                    if (span && span.className === '') {
                        args.element.removeChild(span);
                    }
                }
            });
            this.layoutBtnObj.isStringTemplate = true;
            this.layoutBtnObj.appendTo('#' + this.getId('View'));
        }
        this.hideItems(this.default, true);
        this.hideStatus();
        if (this.parent.portals && this.toolbarObj.portals) {
            this.parent.portals = this.parent.portals.concat(this.toolbarObj.portals);
            this.parent['renderReactTemplates']();
        }
        const btnElement = selectAll('.e-btn', this.toolbarObj.element);
        for (let btnCount = 0; btnCount < btnElement.length; btnCount++) {
            /* istanbul ignore next */
            btnElement[btnCount].onkeydown = (e) => {
                if (e.keyCode === 13 && !e.target.classList.contains('e-fe-popup')) {
                    e.preventDefault();
                }
            };
            btnElement[btnCount].onkeyup = (e) => {
                if (e.keyCode === 13 && !e.target.classList.contains('e-fe-popup')) {
                    btnElement[btnCount].click();
                }
            };
        }
        this.parent.refreshLayout();
    }
    updateSortByButton() {
        if (this.buttonObj) {
            const items = this.buttonObj.items;
            for (let itemCount = 0; itemCount < items.length; itemCount++) {
                if (items[itemCount].id === this.getPupupId('name')) {
                    items[itemCount].iconCss = this.parent.sortBy === 'name' ? TB_OPTION_DOT : '';
                }
                else if (items[itemCount].id === this.getPupupId('size')) {
                    items[itemCount].iconCss = this.parent.sortBy === 'size' ? TB_OPTION_DOT : '';
                }
                else if (items[itemCount].id === this.getPupupId('date')) {
                    if (this.parent.sortBy === 'dateModified' || this.parent.sortBy === 'dateCreated') {
                        items[itemCount].iconCss = this.parent.sortBy === this.parent.sortBy ? TB_OPTION_DOT : '';
                    }
                    else {
                        items[itemCount].iconCss = this.parent.sortBy === '_fm_modified' ? TB_OPTION_DOT : '';
                    }
                }
                else if (items[itemCount].id === this.getPupupId('ascending')) {
                    items[itemCount].iconCss = this.parent.sortOrder === 'Ascending' ? TB_OPTION_TICK : '';
                }
                else if (items[itemCount].id === this.getPupupId('descending')) {
                    items[itemCount].iconCss = this.parent.sortOrder === 'Descending' ? TB_OPTION_TICK : '';
                }
                else if (items[itemCount].id === this.getPupupId('none')) {
                    items[itemCount].iconCss = this.parent.sortOrder === 'None' ? TB_OPTION_TICK : '';
                }
            }
        }
    }
    getPupupId(id) {
        return this.parent.element.id + '_ddl_' + id.toLowerCase();
    }
    layoutChange(args) {
        if (this.parent.view === 'Details') {
            if (args.item.id === this.getPupupId('large')) {
                updateLayout(this.parent, 'LargeIcons');
            }
        }
        else {
            if (args.item.id === this.getPupupId('details')) {
                updateLayout(this.parent, 'Details');
            }
        }
    }
    toolbarItemData(data) {
        const items = [];
        let mode = 'Both';
        if (this.parent.isMobile) {
            mode = 'Overflow';
        }
        for (let i = 0; i < data.length; i++) {
            let item;
            let propItem;
            if (this.parent.toolbarItems.length > 0) {
                propItem = this.getItemModel(this.parent.toolbarItems[parseInt(i.toString(), 10)]);
            }
            const itemId = this.getId(data[i]);
            const itemText = getLocaleText(this.parent, data[i]);
            const itemTooltip = getLocaleText(this.parent, 'Tooltip-' + data[i]);
            switch (data[i]) {
                case '|':
                    item = { type: 'Separator' };
                    break;
                case 'Upload':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_UPLOAD, showTextOn: mode };
                    break;
                case 'SortBy': {
                    let spanElement = '<span class="e-tbar-btn-text e-tbar-ddb-text">' + itemText + '</span>';
                    if (propItem && propItem.text) {
                        spanElement = '<span class="e-tbar-btn-text e-tbar-ddb-text">' + propItem.text + '</span>';
                    }
                    item = {
                        id: itemId, tooltipText: itemTooltip,
                        template: '<button id="' + itemId + '" class="e-tbar-btn e-tbtn-txt" tabindex="-1">' + spanElement + '</button>'
                    };
                    break;
                }
                case 'Refresh':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_REFRESH, showTextOn: mode };
                    break;
                case 'Selection':
                    item = {
                        id: itemId, text: itemText, tooltipText: itemTooltip, suffixIcon: ICON_CLEAR, overflow: 'Show',
                        align: 'Right'
                    };
                    break;
                case 'View': {
                    let viewText;
                    if (propItem && propItem.text) {
                        viewText = propItem.text;
                    }
                    else {
                        viewText = getLocaleText(this.parent, 'View');
                    }
                    item = {
                        id: itemId, tooltipText: itemTooltip, prefixIcon: this.parent.view === 'Details' ? ICON_GRID : ICON_LARGE,
                        overflow: 'Show', align: 'Right', text: itemText, showTextOn: 'Overflow',
                        template: '<button id="' + itemId + '" class="e-tbar-btn e-tbtn-txt" tabindex="-1" aria-label=' +
                            viewText + '></button>'
                    };
                    break;
                }
                case 'Details':
                    item = {
                        id: itemId, tooltipText: itemTooltip, prefixIcon: ICON_DETAILS, overflow: 'Show', align: 'Right',
                        text: itemText, showTextOn: 'Overflow'
                    };
                    break;
                case 'NewFolder':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_NEWFOLDER, showTextOn: mode };
                    break;
                case 'Cut':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_CUT, showTextOn: mode };
                    break;
                case 'Copy':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_COPY, showTextOn: mode };
                    break;
                case 'Paste':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_PASTE, showTextOn: mode };
                    break;
                case 'Delete':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_DELETE, showTextOn: mode };
                    break;
                case 'Rename':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_RENAME, showTextOn: mode };
                    break;
                case 'Download':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_DOWNLOAD, showTextOn: mode };
                    break;
                case 'SelectAll':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_SELECTALL, showTextOn: mode };
                    break;
                default:
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, template: '' };
                    break;
            }
            if (this.parent.toolbarItems.length > 0 && propItem) {
                const mergedItems = Object.assign({}, item, propItem);
                items.push(mergedItems);
            }
            else {
                items.push(item);
            }
        }
        return items;
    }
    getItemModel(propItem) {
        const item = {};
        if (propItem.id) {
            item.id = propItem.id;
        }
        if (propItem.text) {
            item.text = propItem.text;
        }
        if (propItem.tooltipText) {
            item.tooltipText = propItem.tooltipText;
        }
        if (propItem.prefixIcon) {
            item.prefixIcon = propItem.prefixIcon;
        }
        if (propItem.cssClass) {
            item.cssClass = propItem.cssClass;
        }
        if (propItem.showTextOn !== 'Both') {
            item.showTextOn = propItem.showTextOn;
        }
        if (propItem.template) {
            item.template = propItem.template;
        }
        if (propItem.disabled) {
            item.disabled = propItem.disabled;
        }
        if (propItem.width !== 'auto') {
            item.width = propItem.width;
        }
        if (propItem.suffixIcon) {
            item.suffixIcon = propItem.suffixIcon;
        }
        if (propItem.align !== 'Left') {
            item.align = propItem.align;
        }
        if (propItem.overflow !== 'None') {
            item.overflow = propItem.overflow;
        }
        if (propItem.htmlAttributes) {
            item.htmlAttributes = propItem.htmlAttributes;
        }
        if (propItem.type !== 'Button') {
            item.type = propItem.type;
        }
        if (propItem.visible !== true) {
            item.visible = propItem.visible;
        }
        if (propItem.showAlwaysInPopup) {
            item.showAlwaysInPopup = propItem.showAlwaysInPopup;
        }
        if (propItem.tabIndex !== -1) {
            item.tabIndex = propItem.tabIndex;
        }
        return item;
    }
    getId(id) {
        return this.parent.element.id + '_tb_' + id.toLowerCase();
    }
    addEventListener() {
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.parent.on(selectionChanged, this.onSelectionChanged, this);
        this.parent.on(layoutChange, this.onLayoutChange, this);
        this.parent.on(showPaste, this.showPaste, this);
        this.parent.on(hidePaste, this.hidePaste, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(sortByChange, this.updateSortByButton, this);
    }
    reRenderToolbar(e) {
        let itemsToProcess = [];
        if (this.parent.toolbarItems.length > 0) {
            itemsToProcess = this.parent.toolbarItems.map((item) => {
                return item.name;
            });
        }
        else if (e.newProp.toolbarSettings.items !== undefined) {
            itemsToProcess = e.newProp.toolbarSettings.items.map((item) => {
                return item.trim();
            });
        }
        if (itemsToProcess.length > 0) {
            this.items = this.toolbarItemData(this.getItems(itemsToProcess));
            const eventArgs = { items: this.items };
            this.parent.trigger('toolbarCreate', eventArgs, (toolbarCreateArgs) => {
                if (this.buttonObj) {
                    this.buttonObj.destroy();
                }
                if (this.layoutBtnObj) {
                    this.layoutBtnObj.destroy();
                }
                this.items = toolbarCreateArgs.items;
                this.toolbarObj.items = this.items;
                this.toolbarObj.dataBind();
                this.toolbarCreateHandler();
            });
        }
    }
    onSelectionChanged() {
        this.hideStatus();
        this.hideItems(this.single, true);
        this.hideItems(this.selection, false);
        if (this.parent.selectedItems.length === 1) {
            this.hideItems(this.single, false);
            this.hideItems(this.selection, true);
        }
        else if (this.parent.selectedItems.length > 1) {
            this.hideItems(this.multiple, false);
            this.hideItems(this.selection, true);
        }
        const ele = select('#' + this.getId('Selection'), this.toolbarObj.element);
        if (this.parent.selectedItems.length > 0 && ele && !this.parent.enableVirtualization) {
            let txt;
            if (this.parent.selectedItems.length === 1) {
                txt = this.parent.selectedItems.length + ' ' + getLocaleText(this.parent, 'Item-Selection');
            }
            else {
                txt = this.parent.selectedItems.length + ' ' + getLocaleText(this.parent, 'Items-Selection');
            }
            select('.e-tbar-btn-text', ele).textContent = txt;
            this.toolbarObj.hideItem(ele.parentElement, false);
        }
    }
    hideItems(tools, toHide) {
        for (let i = 0; i < tools.length; i++) {
            const ele = select('#' + this.getId(tools[i]), this.parent.element);
            if (ele) {
                this.toolbarObj.hideItem(ele.parentElement, toHide);
            }
        }
    }
    hideStatus() {
        const ele = select('#' + this.getId('Selection'), this.toolbarObj.element);
        if (ele) {
            this.toolbarObj.hideItem(ele.parentElement, true);
        }
    }
    showPaste() {
        this.hideItems(['Paste'], false);
    }
    hidePaste() {
        this.hideItems(['Paste'], true);
    }
    onLayoutChange() {
        if (this.layoutBtnObj) {
            this.layoutBtnObj.iconCss = this.parent.view === 'Details' ? ICON_GRID : ICON_LARGE;
            const items = this.layoutBtnObj.items;
            for (let itemCount = 0; itemCount < items.length; itemCount++) {
                if (items[itemCount].id === this.getPupupId('large')) {
                    items[itemCount].iconCss = this.parent.view === 'LargeIcons' ? TB_OPTION_TICK : '';
                }
                else if (items[itemCount].id === this.getPupupId('details')) {
                    items[itemCount].iconCss = this.parent.view === 'Details' ? TB_OPTION_TICK : '';
                }
            }
        }
    }
    removeEventListener() {
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.parent.off(selectionChanged, this.onSelectionChanged);
        this.parent.off(layoutChange, this.onLayoutChange);
        this.parent.off(showPaste, this.showPaste);
        this.parent.off(hidePaste, this.hidePaste);
        this.parent.off(destroy, this.destroy);
        this.parent.off(sortByChange, this.updateSortByButton);
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    getModuleName() {
        return 'toolbar';
    }
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
            switch (prop) {
                case 'cssClass':
                    if (this.buttonObj) {
                        this.buttonObj.cssClass = getCssClass(this.parent, ROOT_POPUP);
                    }
                    if (this.layoutBtnObj) {
                        this.layoutBtnObj.cssClass = getCssClass(this.parent, 'e-caret-hide ' + ROOT_POPUP);
                    }
                    break;
                case 'height':
                case 'width':
                    this.toolbarObj.refreshOverflow();
                    break;
                case 'toolbarSettings':
                case 'toolbarItems':
                    this.reRenderToolbar(e);
                    break;
            }
        }
    }
    destroy() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.buttonObj) {
            this.buttonObj.destroy();
        }
        if (this.layoutBtnObj) {
            this.layoutBtnObj.destroy();
        }
        this.toolbarObj.destroy();
        this.parent.refreshLayout();
    }
    enableItems(items, isEnable) {
        for (let i = 0; i < items.length; i++) {
            const ele = select('#' + this.getId(items[i]), this.parent.element);
            if (ele) {
                this.toolbarObj.enableItems(ele.parentElement, isEnable);
            }
        }
    }
}

class Virtualization {
    constructor(instance) {
        this.filemanagerInstance = instance;
        this.largeIconInstance = instance.largeiconsviewModule;
    }
    /**
     * Sets up UI virtualization for the large icon view.
     *
     * @returns {void}
     */
    setUIVirtualization() {
        // Get the current view data source
        const currentViewItems = this.largeIconInstance.items;
        // Get the first item in the data source
        const firstItem = currentViewItems.slice(0, 1);
        // Create a list element from the first item in the data source
        const listElements = ListBase.createListFromJson(createElement, firstItem, this.largeIconInstance.listObj);
        // Get the list items from the list element
        this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, listElements));
        // Append the list element to the large icon element
        this.largeIconInstance.element.appendChild(listElements);
        if (this.itemList.length !== 0 && this.largeIconInstance.element.querySelector('.' + EMPTY)) {
            this.largeIconInstance.element.removeChild(this.largeIconInstance.element.querySelector('.' + EMPTY));
        }
        // Get the total number of items
        this.itemCount = this.getItemCount(Object.keys(this.largeIconInstance.allItems).length);
        // Remove the first child element from the large icon element
        this.largeIconInstance.element.firstChild.remove();
        // Set the items for the large icon view to the current view data source, limited to the number of items to display
        this.largeIconInstance.items = currentViewItems.slice(0, this.itemCount);
    }
    /**
     * Sets the height of the top and bottom elements that are used for virtualization.
     * These elements are used to give the appearance of an infinitely scrolling list.
     *
     * @returns {void}
     */
    setUlElementHeight() {
        // Calculate the number of items in the last row
        this.lastRowCount = (this.largeIconInstance.allItems.length - this.itemCount) % this.rowItemCount ?
            (this.largeIconInstance.allItems.length - this.itemCount) % this.rowItemCount : this.rowItemCount;
        // Create top and bottom elements
        this.topElement = this.filemanagerInstance.createElement('div');
        this.topElement.classList.add('e-virtual-top');
        this.largeIconInstance.element.firstElementChild.insertBefore(this.topElement, this.largeIconInstance.element.firstElementChild.firstChild);
        this.bottomElement = this.filemanagerInstance.createElement('div');
        this.bottomElement.classList.add('e-virtual-bottom');
        this.largeIconInstance.element.firstElementChild.insertBefore(this.bottomElement, null);
        // Get the margin value for list items
        const marginValue = parseInt(window.getComputedStyle(this.largeIconInstance.itemList[0]).getPropertyValue('margin-top'), 10) +
            parseInt(window.getComputedStyle(this.largeIconInstance.itemList[0]).getPropertyValue('margin-bottom'), 10);
        // Calculate the height of a single list item
        this.listItemHeight = this.largeIconInstance.itemList[0].getBoundingClientRect().height + marginValue;
        // Calculate the total height of the list
        this.totalHeight = (Object.keys(this.largeIconInstance.allItems).length / this.rowItemCount) * this.listItemHeight;
        // Set the initial height of the top and bottom elements
        this.topElement.style.height = 0 + 'px';
        this.bottomElement.style.height = this.totalHeight + 'px';
        // Initialize the top and bottom element heights
        this.topElementHeight = 0;
        this.bottomElementHeight = this.totalHeight;
        // Initialize the list difference variable
        this.listDiff = 0;
        // Set the initial rendered count
        this.renderedCount = this.itemCount;
    }
    /**
     * Calculates the number of items to display in the list based on the available width and height.
     *
     * @param {number} dataSourceLength The length of the data source.
     * @returns {number} The number of items to display.
     */
    getItemCount(dataSourceLength) {
        // Get the margin values for list items
        const widthMargin = parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-right'), 10) +
            parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-left'), 10);
        // Calculate the number of items that can fit in a single row
        this.rowItemCount =
            Math.floor(parseFloat(formatUnit(this.largeIconInstance.element.firstElementChild.clientWidth)) /
                (this.itemList[0].offsetWidth + widthMargin));
        // Calculate the number of items that can fit in the available height
        let itemCount = this.rowItemCount *
            (Math.round(parseFloat(formatUnit(this.largeIconInstance.element.clientHeight)) / this.itemList[0].offsetHeight));
        // If the calculated item count is greater than the data source length, set the item count to the data source length
        if (itemCount > dataSourceLength || itemCount === 0) {
            itemCount = dataSourceLength;
        }
        return itemCount;
    }
    /**
     * Wires or un wires the scroll event for the list element.
     *
     * @param {boolean} destroy - Set `true` to unwire the scroll event.
     * @returns {void}
     */
    wireScrollEvent(destroy) {
        if (!destroy) {
            // Wire the scroll event
            EventHandler.add(this.largeIconInstance.element.firstElementChild, 'scroll', this.onVirtualUiScroll, this);
        }
        else {
            // Unwire the scroll event
            EventHandler.remove(this.largeIconInstance.element.firstElementChild, 'scroll', this.onVirtualUiScroll);
        }
    }
    /**
     * Handles the scroll event for the list element.
     * This method updates the top and bottom elements and the displayed items based on the scroll position.
     *
     * @returns {void}
     * @private
     */
    onVirtualUiScroll() {
        // Set the starting height to 0
        const startingHeight = 0;
        // Get the current scroll position
        this.scrollPosition = isNullOrUndefined(this.scrollPosition) ? 0 : this.scrollPosition;
        const scroll = this.getscrollerHeight(startingHeight);
        // Calculate the height of the top element
        this.topElementHeight = this.listItemHeight * Math.floor(scroll / this.listItemHeight);
        // Calculate the height of the bottom element
        this.bottomElementHeight = this.totalHeight - this.topElementHeight;
        // If the scroll position is less than or equal to the total height, set the top and bottom element heights.
        // Otherwise, set the top element height to the total height and the bottom element height to 0.
        [this.topElementHeight, this.bottomElementHeight] = scroll <= this.totalHeight ?
            [this.topElementHeight, this.bottomElementHeight] : [this.totalHeight, 0];
        // If the top element height has changed, update the top and bottom element heights and re-render the items.
        if (this.topElementHeight !== parseFloat(this.topElement.style.height)) {
            this.topElement.style.height = this.topElementHeight + 'px';
            this.bottomElement.style.height = this.bottomElementHeight + 'px';
            // Check whether the scroll direction is upward or downward
            if (scroll > this.scrollPosition) {
                // Scrolling is upward
                const listDiff = Math.round(((this.topElementHeight / this.listItemHeight) - this.listDiff));
                this.onNormalScroll(listDiff, true);
            }
            else {
                // Scrolling is downward
                const listDiff = Math.round((this.listDiff - (this.topElementHeight / this.listItemHeight)));
                this.onNormalScroll(listDiff, false);
            }
        }
        // Update the list difference and scroll position variables
        this.listDiff = Math.round(this.topElementHeight / this.listItemHeight);
        this.scrollPosition = scroll;
        // Update the list of items and the items property of the largeIconInstance
        this.largeIconInstance.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, this.largeIconInstance.element));
        this.itemCount = this.itemCount !== this.largeIconInstance.itemList.length ?
            this.largeIconInstance.itemList.length : this.itemCount;
        this.largeIconInstance.items = this.largeIconInstance.allItems.slice(this.renderedCount -
            this.itemCount, this.renderedCount);
    }
    /**
     * Calculates the current scroll position of the list element.
     *
     * @param {number} startingHeight The starting height from which to calculate the scroll position.
     * @returns {number} The current scroll position.
     * @private
     */
    getscrollerHeight(startingHeight) {
        // If the scroll position is less than or equal to the starting height, return 0.
        // Otherwise, return the scroll position minus the starting height.
        return ((this.largeIconInstance.element.firstElementChild.scrollTop - startingHeight) <= 0) ? 0 :
            (this.largeIconInstance.element.firstElementChild.scrollTop - startingHeight);
    }
    /**
     * This method updates the displayed items and the selection based on the scroll direction.
     *
     * @param {number} listDiff The number of rows to update.
     * @param {boolean} isScrollingDown If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    onNormalScroll(listDiff, isScrollingDown) {
        // Update the displayed items
        for (let i = 0; i < listDiff; i++) {
            this.updateUI(isScrollingDown);
        }
    }
    /**
     * Updates the items in the large icons view.
     *
     * @param {boolean} isScrollingDown - If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    updateUI(isScrollingDown) {
        if (isScrollingDown) {
            // Get the next batch of items to be displayed
            this.items = this.largeIconInstance.allItems.slice(this.renderedCount, this.renderedCount + this.rowItemCount);
            // If there are items to be displayed, create list elements for them and append them to the list
            if (this.items.length > 0) {
                const listElements = ListBase.createListFromJson(createElement, this.items, this.largeIconInstance.listObj);
                this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, listElements));
                this.itemList.forEach((liEle) => {
                    this.largeIconInstance.element.firstElementChild.insertBefore(liEle, this.bottomElement);
                });
                // Update the rendered count variable
                this.renderedCount = (this.largeIconInstance.allItems.length >= this.renderedCount + this.rowItemCount) ?
                    this.renderedCount + this.rowItemCount : this.renderedCount + this.lastRowCount;
                // Remove the first batch of items from the list
                for (let i = 0; i < this.rowItemCount; i++) {
                    detach(this.topElement.nextElementSibling);
                }
            }
        }
        else {
            // Scrolling up
            let lastItemIndex;
            let isAllRendered;
            if (this.renderedCount === this.largeIconInstance.allItems.length) {
                // Set lastItemIndex to the last item in the last row
                lastItemIndex = this.renderedCount - (this.itemCount - this.rowItemCount + this.lastRowCount);
                // Set renderedCount to the total number of items that have been rendered, except for the items in the last row
                this.renderedCount = ((this.renderedCount - this.lastRowCount) < this.itemCount) ?
                    this.itemCount : (this.renderedCount - this.lastRowCount);
                // Set isAllRendered to true to indicate that all items have been rendered
                isAllRendered = true;
            }
            else {
                // Set lastItemIndex to the last item in the current row
                lastItemIndex = this.renderedCount - this.itemCount;
                // Set renderedCount to the total number of items that have been rendered, except for the items in the current row
                this.renderedCount = ((this.renderedCount - this.rowItemCount) < this.itemCount) ?
                    this.itemCount : (this.renderedCount - this.rowItemCount);
            }
            // Set startItemIndex to the first item in the current or previous row
            const startItemIndex = (lastItemIndex - this.rowItemCount > 0) ? lastItemIndex - this.rowItemCount : 0;
            // Set the items array to the items in the current or previous row
            this.items = this.largeIconInstance.allItems.slice(startItemIndex, lastItemIndex);
            if (this.items.length > 0) {
                // Create a list of elements from the items array
                const listElements = ListBase.createListFromJson(createElement, this.items, this.largeIconInstance.listObj);
                // Set the itemList array to the list items in the list elements
                this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, listElements));
                // Add the items to the beginning of the list
                for (let len = this.itemList.length; len > 0; len--) {
                    this.largeIconInstance.element.firstElementChild.insertBefore(this.itemList[len - 1], this.topElement.nextElementSibling);
                }
                // Remove the last row of items from the list
                for (let i = 0; i < ((isAllRendered) ? this.lastRowCount : this.rowItemCount); i++) {
                    detach(this.bottomElement.previousElementSibling);
                }
            }
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    getModuleName() {
        return 'virtualization';
    }
    /**
     * Destroys the component.
     *
     * @returns {void}
     */
    destroy() {
        // If the file manager has already been destroyed, return immediately
        if (this.filemanagerInstance.isDestroyed) {
            return;
        }
        // If the large icon element has a child element, unwire the scroll event
        if (!isNullOrUndefined(this.largeIconInstance.element.firstElementChild)) {
            this.wireScrollEvent(true);
        }
    }
}

/**
 * NavigationPane module
 */
class NavigationPane {
    /**
     * Constructor for the TreeView module
     *
     * @param {IFileManager} parent - specifies the parent element.
     * @hidden
     */
    /* istanbul ignore next */
    constructor(parent) {
        this.removeNodes = [];
        this.moveNames = [];
        // Specifies the previously selected nodes in the treeview control.
        this.previousSelected = [];
        this.isDrag = false;
        this.isPathDragged = false;
        this.isRenameParent = false;
        this.isRightClick = false;
        this.isSameNodeClicked = false;
        this.isNodeExpandCalled = false;
        this.renameParent = null;
        // Specifies whether the nodeClicked event of the treeview control is triggered or not.
        this.isNodeClickCalled = false;
        // Specifies whether to restrict node selection in the treeview control.
        this.restrictSelecting = false;
        this.parent = parent;
        this.addEventListener();
        this.keyConfigs = {
            altEnter: 'alt+enter',
            esc: 'escape',
            del: 'delete',
            ctrlX: this.parent.isMac ? 'cmd+x' : 'ctrl+x',
            ctrlC: this.parent.isMac ? 'cmd+c' : 'ctrl+c',
            ctrlV: this.parent.isMac ? 'cmd+v' : 'ctrl+v',
            ctrlShiftN: 'ctrl+shift+n',
            shiftF10: 'shift+F10',
            f2: 'f2'
        };
    }
    onInit() {
        if (!isNullOrUndefined(this.treeObj)) {
            return;
        }
        const rootData = getValue(this.parent.pathId[0], this.parent.feParent);
        setValue('_fm_icon', 'e-fe-folder', rootData);
        const attr = {};
        const id = getValue('id', rootData);
        if (!isNullOrUndefined(id)) {
            setValue('data-id', id, attr);
        }
        if (!hasEditAccess(rootData)) {
            setValue('class', getAccessClass(rootData), attr);
        }
        if (!isNullOrUndefined(attr)) {
            setValue('_fm_htmlAttr', attr, rootData);
        }
        this.treeObj = new TreeView({
            fields: {
                dataSource: [rootData], id: '_fm_id', parentID: '_fm_pId', expanded: '_fm_expanded', selected: '_fm_selected', text: 'name',
                hasChildren: 'hasChild', iconCss: '_fm_icon', htmlAttributes: '_fm_htmlAttr', tooltip: 'name'
            },
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            sortOrder: this.parent.navigationPaneSettings.sortOrder,
            nodeSelecting: this.onNodeSelecting.bind(this),
            nodeSelected: this.onNodeSelected.bind(this),
            nodeExpanding: this.onNodeExpand.bind(this),
            nodeClicked: this.onNodeClicked.bind(this),
            allowEditing: true,
            nodeEditing: this.onNodeEditing.bind(this),
            drawNode: this.onDrowNode.bind(this),
            enableRtl: this.parent.enableRtl,
            dataBound: this.addDragDrop.bind(this)
        });
        this.treeObj.isStringTemplate = true;
        this.treeObj.appendTo('#' + this.parent.element.id + TREE_ID);
        this.wireEvents();
    }
    addDragDrop() {
        if (!this.parent.isMobile && this.treeObj) {
            if (this.parent.allowDragAndDrop && isNullOrUndefined(this.dragObj)) {
                this.dragObj = new Draggable(this.treeObj.element, {
                    cursorAt: this.parent.dragCursorPosition,
                    dragTarget: '.' + FULLROW,
                    distance: 5,
                    dragArea: this.parent.element,
                    drag: draggingHandler.bind(this, this.parent),
                    dragStart: (args) => {
                        dragStartHandler(this.parent, args, this.dragObj);
                    },
                    dragStop: dragStopHandler.bind(this, this.parent),
                    enableTailMode: true,
                    enableAutoScroll: false,
                    helper: this.dragHelper.bind(this)
                });
            }
            else if (!this.parent.allowDragAndDrop && this.dragObj) {
                this.dragObj.destroy();
                this.dragObj = null;
            }
        }
    }
    dragHelper(args) {
        const dragTarget = args.sender.target;
        if (!dragTarget.classList.contains(FULLROW)) {
            return null;
        }
        const dragLi = closest(dragTarget, 'li');
        this.parent.dragPath = '';
        this.parent.dragData = [];
        this.parent.activeElements = [];
        this.parent.activeElements = [dragLi];
        this.parent.dragNodes = [];
        getModule(this.parent, dragLi);
        this.parent.dragData = this.getTreeData(dragLi);
        this.parent.dragPath = this.getDragPath(dragLi, this.parent.dragData[0].name);
        this.parent.dragNodes.push(this.parent.dragData[0].name);
        createVirtualDragElement(this.parent);
        return this.parent.virtualDragElement;
    }
    getDragPath(dragLi, text) {
        const path = this.getDropPath(dragLi, text);
        return getParentPath(path);
    }
    getDropPath(node, text) {
        const id = node.getAttribute('data-id');
        const newText = this.parent.hasId ? id : text;
        return getPath(node, newText, this.parent.hasId);
    }
    onDrowNode(args) {
        const eventArgs = {
            element: args.node,
            fileDetails: args.nodeData,
            module: 'NavigationPane'
        };
        this.parent.trigger('fileLoad', eventArgs);
    }
    addChild(files, target, prevent) {
        const directories = getDirectories(files);
        const targetDirectory = this.getTreeData(target);
        if (directories.length > 0 && targetDirectory.length > 0 &&
            (directories[0].filterPath == null ||
                isNullOrUndefined(targetDirectory[0])
                    && targetDirectory[0].filterPath == null
                || directories[0].filterPath !==
                    targetDirectory[0].filterPath)) {
            let length = 0;
            const folders = directories;
            while (length < directories.length) {
                // eslint-disable-next-line camelcase
                folders[parseInt(length.toString(), 10)]._fm_icon = 'e-fe-folder';
                const attr = {};
                const id = getValue('id', folders[length]);
                if (!isNullOrUndefined(id)) {
                    setValue('data-id', id, attr);
                }
                if (!hasEditAccess(folders[length])) {
                    setValue('class', getAccessClass(folders[length]), attr);
                }
                if (!isNullOrUndefined(attr)) {
                    setValue('_fm_htmlAttr', attr, folders[length]);
                }
                length++;
            }
            const element = select('[data-uid="' + target + '"]', this.treeObj.element);
            const childElements = select('ul', element);
            if (isNullOrUndefined(childElements)) {
                this.treeObj.addNodes(directories, target, null, prevent);
            }
        }
    }
    // Node Selecting event handler
    onNodeSelecting(args) {
        if (!args.isInteracted && !this.isRightClick &&
            !this.isSameNodeClicked && !this.isPathDragged && !this.isRenameParent || this.restrictSelecting) {
            this.restrictSelecting = false;
            this.isNodeClickCalled = false;
            return;
        }
        if (!this.renameParent) {
            this.parent.activeModule = 'navigationpane';
            const nodeData = this.getTreeData(getValue('id', args.nodeData));
            if (args.node.getAttribute('data-uid') !== this.parent.pathId[this.parent.pathId.length - 1] && !this.isRightClick && !this.isNodeClickCalled || this.isSameNodeClicked || this.isPathDragged) {
                this.isNodeClickCalled = false;
                if (!this.isSameNodeClicked) {
                    this.isSameNodeClicked = true;
                    const selecEventArgs = { action: args.action, fileDetails: nodeData[0], isInteracted: args.isInteracted };
                    this.parent.trigger('fileSelect', selecEventArgs);
                }
                if (!this.isRightClick) {
                    const eventArgs = { cancel: false, fileDetails: nodeData[0], module: 'NavigationPane' };
                    this.parent.trigger('fileOpen', eventArgs);
                    args.cancel = eventArgs.cancel;
                }
                if (args.cancel) {
                    this.restrictSelecting = this.isNodeClickCalled ? this.previousSelected[0] !== args.node.getAttribute('data-uid') : false;
                    this.isNodeClickCalled = true;
                    this.isSameNodeClicked = false;
                    this.isPathDragged = false;
                    this.previousSelected = this.treeObj.selectedNodes;
                    this.treeObj.setProperties({ selectedNodes: [args.node.getAttribute('data-uid')] });
                }
            }
            else if (this.previousSelected[0] !== args.node.getAttribute('data-uid')) {
                const selecEventArgs = { action: args.action, fileDetails: nodeData[0], isInteracted: this.isNodeClickCalled };
                this.parent.trigger('fileSelect', selecEventArgs);
            }
        }
    }
    // Opens the folder while clicking open context menu item in the treeview.
    openFileOnContextMenuClick(node) {
        const data = this.treeObj.getTreeData(node);
        this.parent.selectedItems = [];
        this.parent.itemData = data;
        this.activeNode = node;
        this.parent.activeModule = 'navigationpane';
        const eventArgs = { cancel: false, fileDetails: data[0], module: 'NavigationPane' };
        this.parent.trigger('fileOpen', eventArgs);
        this.isNodeClickCalled = true;
        if (!eventArgs.cancel) {
            updatePath(node, this.parent.itemData[0], this.parent);
            read(this.parent, this.isPathDragged ? pasteEnd : pathChanged, this.parent.path);
            this.parent.visitedItem = node;
            this.isPathDragged = this.isRenameParent = this.isRightClick = false;
            this.treeObj.setProperties({ selectedNodes: [node.getAttribute('data-uid')] });
        }
    }
    onNodeSelected(args) {
        if (this.parent.breadcrumbbarModule && this.parent.breadcrumbbarModule.searchObj && !this.renameParent) {
            this.parent.breadcrumbbarModule.searchObj.element.value = '';
            this.parent.isFiltered = false;
            this.isNodeClickCalled = false;
        }
        this.parent.searchedItems = [];
        if (!args.isInteracted && !this.isRightClick && !this.isSameNodeClicked && !this.isPathDragged && !this.isRenameParent) {
            this.parent.pathId = getPathId(args.node);
            return;
        }
        this.activeNode = args.node;
        this.parent.activeModule = 'navigationpane';
        const nodeData = this.getTreeData(getValue('id', args.nodeData));
        this.parent.selectedItems = [];
        this.parent.itemData = nodeData;
        const previousPath = this.parent.path;
        if (!this.isRightClick && this.isSameNodeClicked) {
            updatePath(args.node, this.parent.itemData[0], this.parent);
        }
        else {
            this.parent.pathId = getPathId(args.node);
            this.parent.visitedItem = args.node;
        }
        if (args.node.querySelector('.' + ICONS) && args.node.querySelector('.' + LIST_ITEM) === null) {
            this.expandNodeTarget = 'add';
        }
        if (previousPath !== this.parent.path) {
            if (!this.isRightClick && this.isSameNodeClicked) {
                read(this.parent, this.isPathDragged ? pasteEnd : pathChanged, this.parent.path);
            }
            this.parent.visitedItem = args.node;
        }
        this.isPathDragged = this.isRenameParent = this.isRightClick = this.isSameNodeClicked = false;
    }
    /* istanbul ignore next */
    onPathDrag(args) {
        this.isPathDragged = true;
        this.selectResultNode(args[0]);
    }
    /* istanbul ignore next */
    onNodeExpand(args) {
        if (!args.isInteracted && !this.isDrag) {
            return;
        }
        if (args.node.querySelector('.' + LIST_ITEM) === null) {
            this.isNodeExpandCalled = true;
            const text = getValue('text', args.nodeData);
            const id = args.node.getAttribute('data-id');
            const isId = isNullOrUndefined(id) ? false : true;
            const newText = isNullOrUndefined(id) ? text : id;
            const path = getPath(args.node, newText, isId);
            this.expandNodeTarget = args.node.getAttribute('data-uid');
            this.parent.expandedId = this.expandNodeTarget;
            this.parent.itemData = this.getTreeData(getValue('id', args.nodeData));
            this.parent.pathId.push(getValue('id', args.nodeData));
            read(this.parent, nodeExpand, path);
        }
    }
    /* istanbul ignore next */
    onNodeExpanded(args) {
        this.addChild(args.files, this.expandNodeTarget, false);
        this.parent.expandedId = null;
        this.isNodeExpandCalled = false;
    }
    onNodeClicked(args) {
        this.parent.activeModule = 'navigationpane';
        this.previousSelected = this.treeObj.selectedNodes;
        this.activeNode = args.node;
        if ((args.event.which === 3) && (args.node.getAttribute('data-uid') !== this.treeObj.selectedNodes[0])) {
            this.isRightClick = true;
            this.isNodeClickCalled = true;
            this.treeObj.setProperties({ selectedNodes: [args.node.getAttribute('data-uid')] });
        }
        else if (args.node.getAttribute('data-uid') === this.treeObj.selectedNodes[0] && this.parent.selectedItems.length !== 0) {
            this.parent.setProperties({ selectedItems: [] }, true);
            const layout = (this.parent.view === 'LargeIcons') ? 'largeiconsview' : 'detailsview';
            this.parent.notify(modelChanged, { module: layout, newProp: { selectedItems: [] } });
        }
        else if (args.node.getAttribute('data-uid') === this.treeObj.selectedNodes[0] && !this.isNodeClickCalled && !this.isNodeExpandCalled) {
            if (args.event.which === 3) {
                this.isRightClick = true;
            }
            this.isSameNodeClicked = true;
            this.isNodeClickCalled = true;
        }
    }
    /* istanbul ignore next */
    onNodeEditing(args) {
        if (!isNullOrUndefined(args.innerHtml)) {
            args.cancel = true;
        }
    }
    onPathChanged(args) {
        this.parent.isCut = false;
        const currFiles = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feFiles);
        if (this.expandNodeTarget === 'add') {
            const sNode = select('[data-uid="' + this.treeObj.selectedNodes[0] + '"]', this.treeObj.element);
            const ul = (!isNullOrUndefined(sNode)) ? select('.' + LIST_PARENT, sNode) : null;
            if (isNullOrUndefined(ul)) {
                this.addChild(args.files, this.treeObj.selectedNodes[0], true);
            }
            this.expandNodeTarget = '';
        }
        if (isNullOrUndefined(currFiles)) {
            setValue(this.parent.pathId[this.parent.pathId.length - 1], args.files, this.parent.feFiles);
        }
        if (this.parent.uploadObj.directoryUpload && !(this.parent.hasId)) {
            this.updateTree(args);
        }
    }
    updateTree(args) {
        if (this.treeObj) {
            const id = this.treeObj.selectedNodes[0];
            this.updateTreeNode(args, id);
        }
    }
    updateTreeNode(args, id) {
        const toExpand = this.treeObj.expandedNodes.indexOf(id) === -1 ? false : true;
        this.removeChildNodes(id);
        this.addChild(args.files, id, !toExpand);
    }
    removeChildNodes(id) {
        const sNode = select('[data-uid="' + id + '"]', this.treeObj.element);
        const parent = select('.' + LIST_PARENT, sNode);
        const childs = parent ? Array.prototype.slice.call(parent.children) : null;
        if (childs) {
            this.treeObj.removeNodes(childs);
        }
    }
    onOpenEnd(args) {
        const sleId = this.parent.pathId[this.parent.pathId.length - 1];
        this.treeObj.expandAll(this.treeObj.selectedNodes);
        this.treeObj.setProperties({ selectedNodes: [sleId] });
        this.expandNodeTarget = 'add';
        this.onPathChanged(args);
    }
    onOpenInit(args) {
        if (this.parent.activeModule === 'navigationpane') {
            if (args.target.querySelector('.' + ICONS)) {
                this.treeObj.expandAll(this.treeObj.selectedNodes);
            }
        }
    }
    onInitialEnd(args) {
        this.onInit();
        this.addChild(args.files, getValue('_fm_id', args.cwd), false);
    }
    onFinalizeEnd(args) {
        this.onInit();
        const id = getValue('_fm_id', args.cwd);
        this.addChild(args.files, id, false);
        this.treeObj.setProperties({ selectedNodes: [this.parent.pathId[this.parent.pathId.length - 1]] });
    }
    onCreateEnd(args) {
        this.updateTree(args);
    }
    onSelectedData() {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateItemData();
        }
    }
    onDeleteInit() {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateActionData();
            const name = getValue('name', this.parent.itemData[0]);
            Delete(this.parent, [name], this.parent.path, 'delete');
        }
    }
    /* istanbul ignore next */
    onDeleteEnd(args) {
        if (this.parent.activeModule === 'navigationpane') {
            const selectedNode = this.treeObj.selectedNodes[0];
            const selcetedEle = select('[data-uid="' + selectedNode + '"]', this.treeObj.element);
            const selectedNodeEle = closest(selcetedEle, '.' + LIST_PARENT).parentElement;
            this.treeObj.selectedNodes = [selectedNodeEle.getAttribute('data-uid')];
            this.treeObj.dataBind();
        }
        this.updateTree(args);
    }
    onRefreshEnd(args) {
        this.updateTree(args);
    }
    onRenameInit() {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateRenameData();
        }
    }
    /* istanbul ignore next */
    onRenameEndParent(args) {
        const id = this.renameParent ? this.renameParent : this.parent.pathId[this.parent.pathId.length - 1];
        this.updateTreeNode(args, id);
        this.parent.expandedId = null;
        if (this.renameParent) {
            this.renameParent = null;
        }
        else {
            let resultData = [];
            if (this.parent.hasId) {
                resultData = new DataManager(this.treeObj.getTreeData()).
                    executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
            }
            else {
                const nData = new DataManager(this.treeObj.getTreeData()).
                    executeLocal(new Query().where(this.treeObj.fields.text, 'equal', this.parent.renameText, false));
                if (nData.length > 0) {
                    resultData = new DataManager(nData).
                        executeLocal(new Query().where('_fm_pId', 'equal', id, false));
                }
            }
            if (resultData.length > 0) {
                const id = this.previousSelected.length > 0 && this.treeObj.getTreeData(this.previousSelected[0]).length !== 0
                    ? this.previousSelected[0] : getValue(this.treeObj.fields.id, resultData[0]);
                this.treeObj.selectedNodes = [id];
                this.treeObj.dataBind();
                this.updateItemData();
            }
        }
    }
    /* istanbul ignore next */
    onRenameEnd(args) {
        if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
            this.updateTree(args);
        }
        else {
            const data = this.treeObj.getTreeData();
            let resultData = [];
            if (this.parent.hasId) {
                resultData = new DataManager(data).
                    executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
            }
            else {
                const nData = new DataManager(data).
                    executeLocal(new Query().where(this.treeObj.fields.text, 'equal', this.parent.currentItemText, false));
                if (nData.length > 0) {
                    resultData = new DataManager(nData).
                        executeLocal(new Query().where('filterPath', 'equal', this.parent.filterPath, false));
                }
            }
            if (resultData.length > 0) {
                this.renameParent = getValue(this.treeObj.fields.parentID, resultData[0]);
                this.parent.expandedId = this.renameParent;
                this.parent.itemData = this.getTreeData(this.renameParent);
                read(this.parent, renameEndParent, this.parent.filterPath.replace(/\\/g, '/'));
            }
        }
    }
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
            switch (prop) {
                case 'allowDragAndDrop':
                    this.addDragDrop();
                    break;
                case 'navigationPaneSettings':
                    read(this.parent, finalizeEnd, this.parent.path);
                    if (e.oldProp.navigationPaneSettings.sortOrder !== e.newProp.navigationPaneSettings.sortOrder) {
                        this.treeObj.sortOrder = e.newProp.navigationPaneSettings.sortOrder;
                    }
                    break;
            }
        }
    }
    /* istanbul ignore next */
    onDownLoadInit() {
        this.doDownload();
    }
    onSelectionChanged(e) {
        this.treeObj.setProperties({ selectedNodes: [e.selectedNode] });
    }
    onClearPathInit(e) {
        this.removeChildNodes(e.selectedNode);
    }
    onDragEnd(args) {
        if (isFileSystemData(this.parent)) {
            this.moveNames = [];
            const obj = this.parent.dragData;
            for (let i = 0; i < obj.length; i++) {
                if (getValue('isFile', obj[i]) === false) {
                    this.moveNames.push(getValue('_fm_id', obj[i]));
                }
            }
        }
        let moveNames = [];
        if (this.parent.isPasteError || this.parent.isSearchDrag) {
            moveNames = this.getMoveNames(args.files, this.parent.isSearchDrag, this.parent.dragPath);
        }
        else {
            moveNames = this.moveNames;
        }
        this.treeObj.removeNodes(moveNames);
    }
    getMoveNames(files, flag, path) {
        const moveNames = [];
        for (let i = 0; i < files.length; i++) {
            if (!files[i].isFile) {
                if (!this.parent.hasId) {
                    let name = (files[i].previousName);
                    if (flag) {
                        path = path + files[i].previousName;
                        const index = path.lastIndexOf('/');
                        name = path.substring(index + 1);
                        path = path.substring(0, index + 1);
                    }
                    const resultData = new DataManager(this.treeObj.getTreeData()).
                        executeLocal(new Query().where(this.treeObj.fields.text, 'equal', name, false));
                    for (let j = 0; j < resultData.length; j++) {
                        let fPath = getValue('filterPath', resultData[j]);
                        fPath = fPath.replace(/\\/g, '/');
                        if (fPath === path) {
                            moveNames.push(getValue(this.treeObj.fields.id, resultData[j]));
                            break;
                        }
                    }
                }
            }
        }
        return moveNames;
    }
    onCutEnd(args) {
        let moveNames = [];
        if (this.parent.isPasteError || this.parent.isSearchCut) {
            this.moveNames = this.getMoveNames(args.files, this.parent.isSearchCut, this.parent.targetPath);
        }
        else {
            moveNames = this.moveNames;
        }
        this.treeObj.removeNodes(moveNames);
    }
    /* istanbul ignore next */
    selectResultNode(resultObj) {
        if (!this.parent.hasId) {
            const path = getValue('filterPath', resultObj);
            const itemname = getValue('name', resultObj);
            const data = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where(this.treeObj.fields.text, 'equal', itemname, false));
            if (data.length > 0) {
                const resultData = new DataManager(data).
                    executeLocal(new Query().where('filterPath', 'equal', path, false));
                if (resultData.length > 0) {
                    const id = getValue(this.treeObj.fields.id, resultData[0]);
                    this.treeObj.selectedNodes = [id];
                    this.treeObj.dataBind();
                }
            }
        }
        else {
            const selectedNode = this.treeObj.getTreeData().filter((obj) => obj.name === resultObj.name)[0];
            this.treeObj.selectedNodes = [getValue('_fm_id', selectedNode)];
            this.treeObj.dataBind();
        }
    }
    onDropPath(args) {
        this.onpasteEnd(args);
        this.selectResultNode(this.parent.dropData);
        this.parent.isDropEnd = !this.parent.isPasteError;
    }
    onpasteEnd(args) {
        let resultData = [];
        if (this.parent.hasId) {
            resultData = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where('id', 'equal', getValue('id', args.cwd), false));
        }
        else {
            const nData = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where(this.treeObj.fields.text, 'equal', getValue('name', args.cwd), false));
            if (nData.length > 0) {
                resultData = new DataManager(nData).
                    executeLocal(new Query().where('filterPath', 'equal', getValue('filterPath', args.cwd), false));
            }
        }
        if (resultData.length > 0) {
            const id = getValue(this.treeObj.fields.id, resultData[0]);
            const toExpand = this.treeObj.expandedNodes.indexOf(id) === -1;
            this.removeChildNodes(id);
            this.addChild(args.files, id, toExpand);
        }
        this.parent.expandedId = null;
        this.onPathChanged(args);
        if (this.parent.isDragDrop) {
            this.checkDropPath(args);
        }
    }
    /* istanbul ignore next */
    checkDropPath(args) {
        if (isFileSystemData(this.parent) && (this.parent.path === this.parent.dropPath || this.parent.targetModule === 'navigationpane')) {
            return;
        }
        if ((this.parent.dropPath.indexOf(getDirectoryPath(this.parent, args)) === -1)) {
            this.parent.isDropEnd = false;
            readDropPath(this.parent);
        }
        else {
            this.parent.isDropEnd = !this.parent.isPasteError;
        }
    }
    onpasteInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            this.updateItemData();
        }
        this.moveNames = [];
        const obj = this.parent.isDragDrop ? this.parent.dragData : this.parent.actionRecords;
        for (let i = 0; i < obj.length; i++) {
            if (getValue('isFile', obj[i]) === false) {
                this.moveNames.push(getValue('_fm_id', obj[i]));
            }
        }
    }
    oncutCopyInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.activeRecords = this.getTreeData(this.treeObj.selectedNodes[0]);
            this.parent.activeElements = [this.activeNode];
        }
    }
    addEventListener() {
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.parent.on(downloadInit, this.onDownLoadInit, this);
        this.parent.on(initialEnd, this.onInitialEnd, this);
        this.parent.on(finalizeEnd, this.onFinalizeEnd, this);
        this.parent.on(pathChanged, this.onPathChanged, this);
        this.parent.on(pasteEnd, this.onpasteEnd, this);
        this.parent.on(cutEnd, this.onCutEnd, this);
        this.parent.on(pasteInit, this.onpasteInit, this);
        this.parent.on(nodeExpand, this.onNodeExpanded, this);
        this.parent.on(createEnd, this.onCreateEnd, this);
        this.parent.on(selectedData, this.onSelectedData, this);
        this.parent.on(deleteInit, this.onDeleteInit, this);
        this.parent.on(deleteEnd, this.onDeleteEnd, this);
        this.parent.on(refreshEnd, this.onRefreshEnd, this);
        this.parent.on(updateTreeSelection, this.onSelectionChanged, this);
        this.parent.on(openInit, this.onOpenInit, this);
        this.parent.on(openEnd, this.onOpenEnd, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(renameInit, this.onRenameInit, this);
        this.parent.on(renameEnd, this.onRenameEnd, this);
        this.parent.on(renameEndParent, this.onRenameEndParent, this);
        this.parent.on(clearPathInit, this.onClearPathInit, this);
        this.parent.on(cutCopyInit, this.oncutCopyInit, this);
        this.parent.on(dropInit, this.onDropInit, this);
        this.parent.on(menuItemData, this.onMenuItemData, this);
        this.parent.on(dragEnd, this.onDragEnd, this);
        this.parent.on(dragging, this.onDragging, this);
        this.parent.on(dropPath, this.onDropPath, this);
        this.parent.on(detailsInit, this.onDetailsInit, this);
        this.parent.on(pathDrag, this.onPathDrag, this);
    }
    removeEventListener() {
        this.parent.off(initialEnd, this.onInitialEnd);
        this.parent.off(downloadInit, this.onDownLoadInit);
        this.parent.off(finalizeEnd, this.onFinalizeEnd);
        this.parent.off(selectedData, this.onSelectedData);
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.parent.off(pathChanged, this.onPathChanged);
        this.parent.off(pasteEnd, this.onpasteEnd);
        this.parent.off(cutEnd, this.onCutEnd);
        this.parent.off(pasteInit, this.onpasteInit);
        this.parent.off(updateTreeSelection, this.onSelectionChanged);
        this.parent.off(nodeExpand, this.onNodeExpanded);
        this.parent.off(createEnd, this.onCreateEnd);
        this.parent.off(refreshEnd, this.onRefreshEnd);
        this.parent.off(openInit, this.onOpenInit);
        this.parent.off(openEnd, this.onOpenEnd);
        this.parent.off(destroy, this.destroy);
        this.parent.off(renameInit, this.onRenameInit);
        this.parent.off(renameEnd, this.onRenameEnd);
        this.parent.off(renameEndParent, this.onRenameEndParent);
        this.parent.off(clearPathInit, this.onClearPathInit);
        this.parent.off(deleteInit, this.onDeleteInit);
        this.parent.off(deleteEnd, this.onDeleteEnd);
        this.parent.off(cutCopyInit, this.oncutCopyInit);
        this.parent.off(dropInit, this.onDropInit);
        this.parent.off(dragEnd, this.onDragEnd);
        this.parent.off(dragging, this.onDragging);
        this.parent.off(dropPath, this.onDropPath);
        this.parent.off(detailsInit, this.onDetailsInit);
        this.parent.off(menuItemData, this.onMenuItemData);
        this.parent.off(pathDrag, this.onPathDrag);
    }
    /* istanbul ignore next */
    onDetailsInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            const dataobj = this.getTreeData(this.treeObj.selectedNodes[0]);
            this.parent.itemData = dataobj;
        }
    }
    onMenuItemData(args) {
        if (this.parent.activeModule === this.getModuleName()) {
            const liEle = closest(args.target, 'li');
            this.parent.itemData = this.getTreeData(liEle.getAttribute('data-uid'));
        }
    }
    /* istanbul ignore next */
    onDragging(args) {
        const ele = closest(args.target, 'li');
        if (ele.classList.contains('e-node-collapsed')) {
            this.isDrag = true;
            const level = parseInt(ele.getAttribute('aria-level'), 10);
            this.treeObj.expandAll([ele.getAttribute('data-uid')], level + 1);
            this.isDrag = false;
        }
    }
    onDropInit(args) {
        if (this.parent.targetModule === this.getModuleName()) {
            const dropLi = closest(args.target, 'li');
            this.parent.dropData = this.getTreeData(dropLi)[0];
            this.parent.dropPath = this.getDropPath(dropLi, getValue('name', this.parent.dropData));
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    getModuleName() {
        return 'navigationpane';
    }
    destroy() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.treeObj) {
            this.unWireEvents();
            this.treeObj.destroy();
        }
    }
    wireEvents() {
        this.keyboardModule = new KeyboardEvents(this.treeObj.element, {
            keyAction: this.keyDown.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    unWireEvents() {
        this.keyboardModule.destroy();
    }
    /* istanbul ignore next */
    keyDown(e) {
        const action = e.action;
        switch (action) {
            case 'altEnter':
                this.parent.notify(detailsInit, {});
                GetDetails(this.parent, [], this.parent.path, 'details');
                break;
            case 'esc':
                removeActive(this.parent);
                break;
            case 'del':
                if (this.parent.pathId[0] !== this.activeNode.getAttribute('data-uid')) {
                    this.updateItemData();
                    if (!hasEditAccess(this.parent.itemData[0])) {
                        createDeniedDialog(this.parent, this.parent.itemData[0], permissionEdit);
                    }
                    else {
                        this.removeNodes = [];
                        createDialog(this.parent, 'Delete');
                    }
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
            case 'shiftF10':
                this.updateItemData();
                if (!hasDownloadAccess(this.parent.itemData[0])) {
                    createDeniedDialog(this.parent, this.parent.itemData[0], permissionDownload);
                    return;
                }
                if (this.parent.selectedItems.length !== 0) {
                    this.doDownload();
                }
                break;
            case 'f2':
                if (this.parent.selectedItems.length === 0) {
                    const data = this.getTreeData(this.treeObj.selectedNodes[0])[0];
                    if (!hasEditAccess(data)) {
                        createDeniedDialog(this.parent, data, permissionEdit);
                    }
                    else {
                        this.updateRenameData();
                        createDialog(this.parent, 'Rename');
                    }
                }
                break;
        }
    }
    getTreeData(args) {
        const data = this.treeObj.getTreeData(args);
        for (let i = 0; i < data.length; i++) {
            if (isNullOrUndefined(getValue('hasChild', data[i]))) {
                setValue('hasChild', false, data[i]);
            }
        }
        return data;
    }
    updateRenameData() {
        this.updateItemData();
        this.parent.currentItemText = getValue('name', this.parent.itemData[0]);
    }
    updateItemData() {
        const data = this.getTreeData(this.treeObj.selectedNodes[0])[0];
        this.parent.itemData = [data];
        this.parent.isFile = false;
    }
    updateActionData() {
        this.updateItemData();
        const node = select('[data-uid="' + this.parent.pathId[this.parent.pathId.length - 1] + '"]', this.treeObj.element);
        updatePath(node, this.parent.itemData[0], this.parent);
        const newPath = getParentPath(this.parent.path);
        this.parent.setProperties({ path: newPath }, true);
        this.parent.pathId.pop();
        this.parent.pathNames.pop();
    }
    /* istanbul ignore next */
    doDownload() {
        const newPath = getParentPath(this.parent.path);
        const itemId = this.treeObj.selectedNodes[0];
        const name = (itemId === this.parent.pathId[0]) ? '' : getValue('name', this.parent.itemData[0]);
        Download(this.parent, newPath, [name]);
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * DetailsView module
 */
class DetailsView {
    /**
     * Constructor for the GridView module
     *
     * @param {FileManager} parent - specifies the parent.
     * @hidden
     */
    constructor(parent) {
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
        Grid.Inject(Resize, ContextMenu$2, Sort, VirtualScroll);
        this.parent = parent;
        this.element = select('#' + this.parent.element.id + GRID_ID, this.parent.element);
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
    render(args) {
        if (this.parent.enablePersistence) {
            const gridPersistenceValue = window.localStorage.getItem('grid' + this.parent.element.id + '_grid');
            if (!isNullOrUndefined(gridPersistenceValue)) {
                const model = JSON.parse(gridPersistenceValue);
                if (!isNullOrUndefined(model) && Object.keys(model).length > 0 && 'sortSettings' in model) {
                    delete model.sortSettings;
                    window.localStorage.setItem('grid' + this.parent.element.id + '_grid', JSON.stringify(model));
                }
            }
        }
        showSpinner(this.parent.element);
        if (this.parent.view === 'Details') {
            removeClass([this.parent.element], MULTI_SELECT);
            const items = getSortedData(this.parent, args.files);
            this.checkNameWidth();
            const columns = this.getColumns();
            let sortSettings;
            const isValidSortField = !isNullOrUndefined(columns) &&
                columns.findIndex((col) => col.field === this.parent.sortBy) !== -1;
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
                beforeCopy: (args) => { args.cancel = true; },
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
            this.gridObj.appendTo('#' + this.parent.element.id + GRID_ID);
            if (this.parent.selectedItems.length !== 0 && this.parent.enableVirtualization && this.parent.enablePersistence) {
                this.isLoaded = true;
            }
            this.wireEvents();
            this.adjustHeight();
            this.emptyArgs = args;
        }
    }
    reactTemplateRender(args) {
        this.parent['portals'] = args;
        if (this.parent.portals && this.parent.toolbarModule && this.parent.toolbarModule.toolbarObj &&
            this.parent.toolbarModule.toolbarObj.portals) {
            this.parent['portals'] = this.parent['portals'].concat(this.parent.toolbarModule.toolbarObj.portals);
        }
        this.parent.notify('renderReactTemplate', this.parent['portals']);
        this.parent['renderReactTemplates']();
    }
    /**
     * Gets the grid height.
     *
     * @returns {number} - The grid height.
     * @private
     */
    getGridHeight() {
        // Get the content pane and breadcrumb bar elements
        const pane = select('#' + this.parent.element.id + CONTENT_ID, this.parent.element);
        const bar = select('#' + this.parent.element.id + BREADCRUMBBAR_ID, this.parent.element);
        // The maximum height of the header is 36
        const headerMaxHeight = 36;
        // Calculate and return the grid height
        return (pane.offsetHeight - bar.offsetHeight - headerMaxHeight);
    }
    checkNameWidth() {
        const initialColumn = this.parent.detailsViewSettings.columns;
        this.isNameWidth = false;
        for (let i = 0; i < initialColumn.length; i++) {
            if (initialColumn[i].field === 'name') {
                this.isNameWidth = !isNullOrUndefined(initialColumn[i].width);
                return;
            }
        }
    }
    adjustWidth(columns, fieldName) {
        if (this.isNameWidth && (fieldName === 'name')) {
            return;
        }
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].field === fieldName) {
                let nameWidth;
                if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
                    nameWidth = (this.element.clientWidth <= 500) ? '120px' : 'auto';
                }
                else {
                    nameWidth = (this.element.clientWidth <= 680) ? ((fieldName === 'name') ? '120px' : '180px') : 'auto';
                }
                columns[i].width = nameWidth;
            }
        }
    }
    getColumns() {
        let columns;
        const enableHtmlSanitizer = this.parent.enableHtmlSanitizer;
        if (this.parent.isMobile) {
            columns = [
                {
                    field: 'name', headerText: getLocaleText(this.parent, 'Name'), width: 'auto', minWidth: 120, headerTextAlign: 'Left',
                    template: initializeCSPTemplate(function (data) {
                        const name = enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(data.name) : data.name;
                        return `<div class="e-fe-text">${name}</div><div class="e-fe-date">${data._fm_modified}</div><span class="e-fe-size">${data.size}</span>`;
                    })
                }
            ];
        }
        else {
            columns = extend([], this.parent.detailsViewSettings.columns, null, true);
            this.adjustWidth(columns, 'name');
            for (let i = 0, len = columns.length; i < len; i++) {
                columns[i].headerText = getLocaleText(this.parent, columns[i].headerText);
                if (columns[i].field === 'name' && !isNullOrUndefined(columns[i].template) && !(typeof columns[i].template === 'function')) {
                    const template = columns[i].template;
                    columns[i].template = initializeCSPTemplate(function (data) {
                        const name = enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(data.name) : data.name;
                        return template.replace(/\${name}/g, name);
                    });
                }
            }
        }
        const iWidth = ((this.parent.isMobile || this.parent.isBigger) ? '54' : '46');
        const icon = {
            field: 'type', width: iWidth, minWidth: iWidth,
            template: initializeCSPTemplate(function (data) {
                return `<span class="e-fe-icon ${data._fm_iconClass}"></span>`;
            }), allowResizing: false, allowSorting: true, customAttributes: { class: 'e-fe-grid-icon' },
            headerTemplate: initializeCSPTemplate(function () {
                return '<span class=\'e-fe-icon e-fe-folder\'></span>';
            })
        };
        columns.unshift(icon);
        if (this.parent.showItemCheckBoxes) {
            const cWidth = (this.parent.isBigger ? '36' : '26');
            const cBox = {
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
        for (let i = 0, len = columns.length; i < len; i++) {
            columns[i].disableHtmlEncode = !this.parent.enableHtmlSanitizer;
        }
        if (this.parent.enableRangeSelection) {
            const HiddenName = { field: 'name', visible: false, customAttributes: { class: 'e-drag-text' } };
            columns.push(HiddenName);
        }
        return columns;
    }
    adjustHeight() {
        if (!this.gridObj) {
            return;
        }
        const pane = select('#' + this.parent.element.id + CONTENT_ID, this.parent.element);
        const bar = select('#' + this.parent.element.id + BREADCRUMBBAR_ID, this.parent.element);
        const gridHeader = select('.' + GRID_HEADER, this.parent.element);
        const height = (pane.offsetHeight - bar.offsetHeight - gridHeader.offsetHeight);
        this.gridObj.height = height;
        this.gridObj.dataBind();
    }
    renderCheckBox() {
        this.gridObj.columns = this.getColumns();
        this.isColumnRefresh = true;
        this.gridObj.refreshColumns();
    }
    onRowDataBound(args) {
        let td = select('.e-fe-grid-name', args.row);
        if (!td) {
            const columns = this.parent.detailsViewSettings.columns;
            for (let i = 0; i < columns.length; i++) {
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
            const text = getValue('name', args.data);
            const textEle = args.row.querySelector('[title= "' + text + '"]');
            if (textEle) {
                const name = getValue('name', args.data);
                const type = getValue('type', args.data);
                if (name.indexOf(type) !== -1) {
                    textEle.innerHTML = name.substr(0, name.length - type.length);
                }
            }
        }
        if (getValue('size', args.data) !== undefined && args.row.querySelector('.e-fe-size')) {
            const sizeEle = args.row.querySelector('.e-fe-size');
            let modifiedSize;
            if (!getValue('isFile', args.data)) {
                modifiedSize = '';
            }
            else {
                const sizeValue = getValue('size', args.data);
                const intl = new Internationalization(this.parent.locale);
                let sizeFormat;
                const columns = this.parent.detailsViewSettings.columns;
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].field === 'size') {
                        sizeFormat = !isNullOrUndefined(columns[i].format) ? columns[i].format.toString() : 'n';
                        break;
                    }
                }
                const value = intl.formatNumber((sizeValue / 1024), { format: sizeFormat });
                modifiedSize = value + ' ' + getLocaleText(this.parent, 'KB');
            }
            sizeEle.innerHTML = modifiedSize;
        }
        if (this.parent.isMobile) {
            if (getValue('_fm_modified', args.data) !== undefined && args.row.querySelector('.e-fe-date')) {
                const dateEle = args.row.querySelector('.e-fe-date');
                const intl = new Internationalization(this.parent.locale);
                const columns = this.parent.detailsViewSettings.columns;
                let format;
                for (let i = 0; i < columns.length; i++) {
                    if (columns[i].field === 'dateModified') {
                        format = columns[i].format;
                        break;
                    }
                }
                const formattedString = intl.formatDate(new Date(getValue('_fm_modified', args.data)), format);
                dateEle.innerHTML = formattedString;
            }
        }
        const checkWrap = args.row.querySelector('.' + CB_WRAP);
        if (checkWrap) {
            checkWrap.classList.add('e-small');
        }
        if (!hasEditAccess(args.data)) {
            args.row.className += ' ' + getAccessClass(args.data);
        }
        const eventArgs = {
            element: args.row,
            fileDetails: args.data,
            module: 'DetailsView'
        };
        this.parent.trigger('fileLoad', eventArgs);
    }
    onActionBegin(args) {
        if (args.requestType === 'sorting') {
            this.parent.setProperties({ sortOrder: args.direction }, true);
            this.parent.setProperties({ sortBy: args.columnName }, true);
            if (this.parent.selectedItems.length !== 0) {
                this.sortItem = true;
                const rows = this.gridObj.getSelectedRowIndexes();
                let len = rows.length;
                this.sortSelectedNodes = [];
                while (len > 0) {
                    const data = this.gridObj.getRowsObject()[rows[len - 1]].data;
                    this.sortSelectedNodes.push(getValue(this.parent.hasId ? 'id' : 'name', data));
                    len--;
                }
            }
            this.parent.notify(sortByChange, {});
        }
    }
    onHeaderCellInfo(args) {
        const checkWrap = args.node.querySelector('.' + CB_WRAP);
        if (checkWrap) {
            checkWrap.classList.add('e-small');
        }
    }
    onBeforeDataBound(args) {
        showSpinner(this.parent.element);
        const nameColumn = this.parent.detailsViewSettings.columns.find((column) => column.field === this.parent.sortBy);
        if (nameColumn && !('sortComparer' in nameColumn)) {
            const items = getSortedData(this.parent, (this.parent.enableVirtualization)
                ? args.result
                : this.gridObj.dataSource);
            args.result = items;
        }
    }
    /* istanbul ignore next */
    onDataBound() {
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
            const hdTable = this.gridObj.getHeaderContent();
            hdTable.style.paddingRight = '';
            hdTable.style.paddingLeft = '';
            const hdContent = select('.e-headercontent', hdTable);
            hdContent.style.borderRightWidth = '0';
            const cnTable = this.gridObj.getContent().querySelector('.e-content');
            cnTable.style.overflowY = '';
            cnTable.classList.add('e-scrollShow');
        }
        else {
            const hdTable = this.gridObj.getHeaderContent();
            if (!this.parent.enableRtl) {
                hdTable.style.paddingRight = '16px';
            }
            else {
                hdTable.style.paddingLeft = '16px';
            }
            const cnTable = this.gridObj.getContent().querySelector('.e-content');
            cnTable.classList.remove('e-scrollShow');
        }
        this.isRendered = true;
        this.parent.isLayoutChange = false;
        hideSpinner(this.parent.element);
        this.checkEmptyDiv(this.emptyArgs);
        this.isInteracted = this.isLoaded ? true : this.isInteracted;
        this.isLoaded = false;
    }
    selectRecords(nodes) {
        const gridRecords = this.gridObj.getCurrentViewRecords();
        const sRecords = [];
        for (let i = 0, len = gridRecords.length; i < len; i++) {
            const node = this.parent.hasId ? getValue('id', gridRecords[i]) : getName(this.parent, gridRecords[i]);
            if (nodes.indexOf(node) !== -1) {
                sRecords.push(i);
            }
            else if (!this.parent.showFileExtension && !this.parent.hasId && node.includes('.')) {
                const Str2 = node.split('.').slice(0, -1).join('.');
                if (nodes.indexOf(Str2) !== -1) {
                    sRecords.push(i);
                }
            }
        }
        if (sRecords.length !== 0) {
            this.gridObj.selectRows(sRecords);
            this.addFocus(this.gridObj.selectedRowIndex);
        }
    }
    addSelection(data) {
        const items = this.gridObj.getCurrentViewRecords();
        let rData = [];
        if (this.parent.hasId) {
            rData = new DataManager(items).
                executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
        }
        else {
            const nData = new DataManager(items).
                executeLocal(new Query().where('name', 'equal', getValue('name', data), false));
            if (nData.length > 0) {
                rData = new DataManager(nData).
                    executeLocal(new Query().where('filterPath', 'equal', this.parent.filterPath, false));
            }
        }
        if (rData.length > 0) {
            const index = items.indexOf(rData[0]);
            this.gridObj.selectRows([index]);
        }
    }
    onSortColumn() {
        if (this.parent.sortOrder !== 'None') {
            this.gridObj.sortModule.sortColumn(this.parent.sortBy, this.parent.sortOrder);
        }
        else {
            this.gridObj.dataSource = getSortedData(this.parent, this.gridObj.dataSource);
        }
        if (this.element.querySelector('.e-content').scrollTop !== 0) {
            this.gridObj.freezeRefresh();
        }
    }
    onPropertyChanged(e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (const prop of Object.keys(e.newProp)) {
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
                        const columns = this.getColumns();
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
                            const slItems = this.parent.selectedItems.slice(this.parent.selectedItems.length - 1);
                            this.parent.setProperties({ selectedItems: slItems }, true);
                        }
                        this.selectRecords(this.parent.selectedItems);
                        this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
                    }
                    else if (!isNullOrUndefined(this.gridObj)) {
                        this.gridObj.clearSelection();
                        this.interaction = true;
                    }
                    break;
                case 'showFileExtension':
                    read(this.parent, pathChanged, this.parent.path);
                    break;
                case 'showHiddenItems':
                    read(this.parent, pathChanged, this.parent.path);
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
    }
    onPathChanged(args) {
        this.parent.isCut = false;
        const pathField = this.parent.detailsViewSettings.columns.find((column) => column.field === 'filterPath');
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
    }
    updatePathColumn() {
        const len = this.gridObj.columns.length;
        const columnData = JSON.parse(JSON.stringify(this.gridObj.columns));
        if (columnData[len - 1].field && columnData[len - 1].field !== 'filterPath' && !this.parent.isMobile) {
            const pathColumn = {
                field: 'filterPath', headerText: getLocaleText(this.parent, 'Path'), minWidth: 180, width: 'auto'
            };
            this.gridObj.columns.push(pathColumn);
            this.adjustWidth(this.gridObj.columns, 'filterPath');
            this.adjustWidth(this.gridObj.columns, 'name');
            this.isColumnRefresh = true;
            this.gridObj.refreshColumns();
        }
    }
    checkEmptyDiv(args) {
        const items = getSortedData(this.parent, args.files);
        if (items.length === 0 && !isNullOrUndefined(this.element.querySelector('.' + GRID_VIEW))) {
            createEmptyElement(this.parent, this.element, args);
        }
        else if (items.length !== 0 && this.element.querySelector('.' + EMPTY)) {
            if (this.element.querySelector('.' + GRID_VIEW).querySelector('.' + EMPTY)) {
                const emptyDiv = this.element.querySelector('.' + GRID_VIEW).querySelector('.' + EMPTY);
                this.element.querySelector('.' + GRID_VIEW).removeChild(emptyDiv);
            }
            else {
                this.element.removeChild(this.element.querySelector('.' + EMPTY));
            }
        }
    }
    onOpenInit() {
        if (this.parent.activeModule === 'detailsview') {
            const data = this.gridObj.getSelectedRecords()[0];
            this.openContent(data);
        }
    }
    DblClickEvents(args) {
        this.gridObj.selectRows([args.rowIndex]);
        let data;
        if (args.rowData) {
            data = JSON.parse(JSON.stringify(args.rowData));
            this.openContent(data);
        }
    }
    openContent(data) {
        if (!hasReadAccess(data)) {
            createDeniedDialog(this.parent, data, permissionRead);
            return;
        }
        const eventArgs = { cancel: false, fileDetails: data, module: 'DetailsView' };
        this.parent.trigger('fileOpen', eventArgs, (fileOpenArgs) => {
            if (!fileOpenArgs.cancel) {
                const name = getValue('name', data);
                if (getValue('isFile', data)) {
                    const icon = fileType(data);
                    if (icon === ICON_IMAGE) {
                        const imgUrl = getImageUrl(this.parent, data);
                        createImageDialog(this.parent, name, imgUrl);
                    }
                }
                else {
                    const val = this.parent.breadcrumbbarModule.searchObj.element.value;
                    if (val === '' && !this.parent.isFiltered) {
                        const id = getValue('id', data);
                        this.parent.oldPath = this.parent.path;
                        const newPath = this.parent.path + (isNullOrUndefined(id) ? name : id) + '/';
                        this.parent.setProperties({ path: newPath }, true);
                        this.parent.pathNames.push(name);
                        this.parent.pathId.push(getValue('_fm_id', data));
                        this.parent.itemData = [data];
                        openAction(this.parent);
                    }
                    else {
                        openSearchFolder(this.parent, data);
                    }
                    this.parent.isFiltered = false;
                }
                this.element.focus();
                if (this.parent.enableVirtualization) {
                    this.parent.element.querySelector('#' + this.parent.element.id + IMG_DIALOG_ID).focus();
                }
            }
        });
    }
    /* istanbul ignore next */
    onLayoutChange(args) {
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
            this.parent.notify(hideLayout, {});
            this.gridObj.element.classList.remove(DISPLAY_NONE);
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
    }
    /* istanbul ignore next */
    onSearchFiles(args) {
        if (this.parent.view === 'Details') {
            this.parent.setProperties({ selectedItems: [] }, true);
            this.parent.notify(selectionChanged, {});
            if (!this.parent.isLayoutChange) {
                this.parent.layoutSelectedItems = [];
            }
            this.updatePathColumn();
            this.parent.searchedItems = args.files;
            this.onPathChanged(args);
        }
    }
    removePathColumn(isRefresh) {
        const len = this.gridObj.columns.length;
        const columnData = JSON.parse(JSON.stringify(this.gridObj.columns));
        const filterPathInSettings = this.parent.detailsViewSettings.columns.some((col) => col.field === 'filterPath');
        if (columnData[len - 1].field && (columnData[len - 1].field === 'filterPath') && !filterPathInSettings) {
            /* istanbul ignore next */
            if (!isNullOrUndefined(this.gridObj.sortSettings.columns[0]) && this.gridObj.sortSettings.columns[0].field === 'filterPath') {
                if (this.parent.sortOrder !== 'None') {
                    this.gridObj.sortColumn('name', this.parent.sortOrder);
                }
                else {
                    this.gridObj.dataSource = getSortedData(this.parent, this.gridObj.dataSource);
                }
                this.parent.notify(sortByChange, {});
            }
            this.gridObj.columns.pop();
            if (!isRefresh) {
                this.isColumnRefresh = true;
                this.gridObj.refreshColumns();
            }
        }
    }
    onFinalizeEnd(args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        if (!this.gridObj) {
            this.render(args);
        }
        else {
            this.onPathChanged(args);
        }
    }
    onCreateEnd(args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.onPathChanged(args);
    }
    onRenameInit() {
        if (this.parent.activeModule === 'detailsview' && this.parent.selectedItems.length === 1) {
            this.updateRenameData();
        }
    }
    onSelectedData() {
        if (this.parent.activeModule === 'detailsview') {
            this.parent.itemData = this.gridObj.getSelectedRecords();
        }
    }
    onDeleteInit() {
        if (this.parent.activeModule === 'detailsview') {
            Delete(this.parent, this.parent.selectedItems, this.parent.path, 'delete');
        }
    }
    /* istanbul ignore next */
    onDeleteEnd(args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.onPathChanged(args);
        this.parent.setProperties({ selectedItems: [] }, true);
    }
    onRefreshEnd(args) {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.isInteracted = false;
        this.removePathColumn(false);
        this.gridObj.dataSource = getSortedData(this.parent, args.files);
        this.emptyArgs = args;
    }
    onHideLayout() {
        if (this.parent.view !== 'Details' && this.gridObj) {
            this.gridObj.element.classList.add(DISPLAY_NONE);
        }
    }
    onSelectAllInit() {
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
    }
    onClearAllInit() {
        if (this.parent.view === 'Details') {
            this.removeSelection();
            this.interaction = true;
        }
    }
    /* istanbul ignore next */
    onSelectionChanged() {
        removeClass([this.element], HEADER_CHECK);
        if (this.parent.selectedItems.length > 0) {
            addClass([this.element], HEADER_CHECK);
        }
    }
    onLayoutRefresh() {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.adjustHeight();
    }
    onBeforeRequest() {
        this.isRendered = false;
    }
    onAfterRequest() {
        this.isRendered = true;
    }
    onUpdateSelectionData() {
        if (this.parent.view !== 'Details') {
            return;
        }
        this.parent.itemData = this.gridObj.getSelectedRecords();
    }
    addEventListener() {
        this.parent.on(finalizeEnd, this.onFinalizeEnd, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(layoutChange, this.onLayoutChange, this);
        this.parent.on(pathChanged, this.onPathChanged, this);
        this.parent.on(createEnd, this.onCreateEnd, this);
        this.parent.on(dropInit, this.onDropInit, this);
        this.parent.on(detailsInit, this.onDetailsInit, this);
        this.parent.on(refreshEnd, this.onRefreshEnd, this);
        this.parent.on(search, this.onSearchFiles, this);
        this.parent.on(methodCall, this.onMethodCall, this);
        this.parent.on(actionFailure, this.onActionFailure, this);
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.parent.on(deleteInit, this.onDeleteInit, this);
        this.parent.on(deleteEnd, this.onDeleteEnd, this);
        this.parent.on(selectedData, this.onSelectedData, this);
        this.parent.on(renameInit, this.onRenameInit, this);
        this.parent.on(renameEnd, this.onPathChanged, this);
        this.parent.on(openInit, this.onOpenInit, this);
        this.parent.on(sortColumn, this.onSortColumn, this);
        this.parent.on(openEnd, this.onPathChanged, this);
        this.parent.on(filterEnd, this.onPathChanged, this);
        this.parent.on(pasteInit, this.onPasteInit, this);
        this.parent.on(hideLayout, this.onHideLayout, this);
        this.parent.on(selectAllInit, this.onSelectAllInit, this);
        this.parent.on(clearAllInit, this.onClearAllInit, this);
        this.parent.on(pathColumn, this.onPathColumn, this);
        this.parent.on(selectionChanged, this.onSelectionChanged, this);
        this.parent.on(beforeRequest, this.onBeforeRequest, this);
        this.parent.on(afterRequest, this.onAfterRequest, this);
        this.parent.on(pasteEnd, this.onpasteEnd, this);
        this.parent.on(cutCopyInit, this.oncutCopyInit, this);
        this.parent.on(menuItemData, this.onMenuItemData, this);
        this.parent.on(resizeEnd, this.onDetailsResizeHandler, this);
        this.parent.on(splitterResize, this.onDetailsResize, this);
        this.parent.on(layoutRefresh, this.onLayoutRefresh, this);
        this.parent.on(dropPath, this.onDropPath, this);
        this.parent.on(updateSelectionData, this.onUpdateSelectionData, this);
    }
    removeEventListener() {
        this.parent.off(finalizeEnd, this.onFinalizeEnd);
        this.parent.off(destroy, this.destroy);
        this.parent.off(layoutChange, this.onLayoutChange);
        this.parent.off(pathChanged, this.onPathChanged);
        this.parent.off(pasteInit, this.onPasteInit);
        this.parent.off(createEnd, this.onCreateEnd);
        this.parent.off(refreshEnd, this.onRefreshEnd);
        this.parent.off(search, this.onSearchFiles);
        this.parent.off(methodCall, this.onMethodCall);
        this.parent.off(actionFailure, this.onActionFailure);
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.parent.off(renameInit, this.onRenameInit);
        this.parent.off(renameEnd, this.onPathChanged);
        this.parent.off(filterEnd, this.onPathChanged);
        this.parent.off(openInit, this.onOpenInit);
        this.parent.off(sortColumn, this.onSortColumn);
        this.parent.off(openEnd, this.onPathChanged);
        this.parent.off(hideLayout, this.onHideLayout);
        this.parent.off(selectAllInit, this.onSelectAllInit);
        this.parent.off(clearAllInit, this.onClearAllInit);
        this.parent.off(deleteInit, this.onDeleteInit);
        this.parent.off(deleteEnd, this.onDeleteEnd);
        this.parent.off(pathColumn, this.onPathColumn);
        this.parent.off(selectionChanged, this.onSelectionChanged);
        this.parent.off(beforeRequest, this.onBeforeRequest);
        this.parent.off(afterRequest, this.onAfterRequest);
        this.parent.off(pasteEnd, this.onpasteEnd);
        this.parent.off(cutCopyInit, this.oncutCopyInit);
        this.parent.off(dropInit, this.onDropInit);
        this.parent.off(selectedData, this.onSelectedData);
        this.parent.off(detailsInit, this.onDetailsInit);
        this.parent.off(menuItemData, this.onMenuItemData);
        this.parent.off(resizeEnd, this.onDetailsResizeHandler);
        this.parent.off(splitterResize, this.onDetailsResize);
        this.parent.off(layoutRefresh, this.onLayoutRefresh);
        this.parent.off(dropPath, this.onDropPath);
        this.parent.off(updateSelectionData, this.onUpdateSelectionData);
    }
    onActionFailure() { this.interaction = true; }
    onMenuItemData(args) {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = [this.gridObj.getRowInfo(args.target).rowData];
        }
    }
    onPasteInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = (this.parent.folderPath !== '') ? this.gridObj.getSelectedRecords() :
                [getPathObject(this.parent)];
        }
    }
    onDetailsInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            if (this.parent.selectedItems.length !== 0) {
                this.parent.itemData = this.gridObj.getSelectedRecords();
            }
            else {
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
            }
        }
    }
    dragHelper(args) {
        const dragTarget = args.sender.target;
        const dragLi = dragTarget.closest('tr.e-row');
        if (!dragLi) {
            return null;
        }
        let name;
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
        let dragRow;
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
    }
    /* istanbul ignore next */
    onDetailsResize() {
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNullOrUndefined(this.gridObj)) {
            const gridHeader = this.gridObj.getHeaderContent().querySelector('.e-headercontent');
            const gridHeaderColGroup = gridHeader.firstChild.childNodes[0];
            const gridContentColGroup = this.gridObj.getContent().querySelector('.e-content .e-table').children[0];
            const gridHeaderColNames = this.gridObj.getColumns();
            for (let i = 0; i < gridHeaderColNames.length; i++) {
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
    }
    onDetailsResizeHandler() {
        this.onDetailsResize();
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNullOrUndefined(this.gridObj)) {
            this.adjustHeight();
        }
    }
    createDragObj() {
        if (this.gridObj) {
            if (this.parent.allowDragAndDrop && isNullOrUndefined(this.dragObj)) {
                this.dragObj = new Draggable(this.gridObj.element, {
                    cursorAt: this.parent.dragCursorPosition,
                    distance: 5,
                    enableTailMode: true,
                    dragArea: this.parent.element,
                    dragTarget: '.' + ROW,
                    drag: draggingHandler.bind(this, this.parent),
                    dragStart: (args) => {
                        dragStartHandler(this.parent, args, this.dragObj);
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
    }
    onDropInit(args) {
        if (this.parent.targetModule === this.getModuleName()) {
            /* istanbul ignore next */
            const cwdData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            if (!args.target.closest('tr')) {
                this.parent.dropPath = this.parent.path;
                this.parent.dropData = cwdData;
            }
            else {
                let info = null;
                info = this.gridObj.getRowInfo(args.target).rowData;
                this.parent.dropPath = info.isFile ? this.parent.path : getFullPath(this.parent, info, this.parent.path);
                this.parent.dropData = info.isFile ? cwdData : info;
            }
        }
    }
    oncutCopyInit() {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.activeRecords = this.gridObj.getSelectedRecords();
            this.parent.activeElements = this.gridObj.getSelectedRows();
        }
    }
    onpasteEnd(args) {
        if (this.parent.view === 'Details') {
            this.isPasteOperation = true;
            if (this.parent.path === this.parent.destinationPath ||
                this.parent.path === getDirectoryPath(this.parent, args) || this.parent.hasId) {
                this.onPathChanged(args);
            }
        }
    }
    onDropPath(args) {
        if (this.parent.view === 'Details') {
            this.isPasteOperation = true;
            this.onPathChanged(args);
        }
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns modules name.
     * @private
     */
    getModuleName() {
        return 'detailsview';
    }
    destroy() {
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
    }
    updateType(item) {
        const folder = select('.' + FOLDER, item);
        this.parent.isFile = isNullOrUndefined(folder) ? true : false;
    }
    /* istanbul ignore next */
    onSelection(action, args) {
        const eventArgs = {
            action: action, fileDetails: args.data, isInteracted: this.interaction, cancel: false, target: args.target
        };
        this.parent.trigger('fileSelection', eventArgs);
        args.cancel = eventArgs.cancel;
        if (!this.isMultiSelect) {
            this.isMultiSelect = true;
            if ((args.isShiftPressed || args.isCtrlPressed) && !this.parent.allowMultiSelection && (args.target && args.target.parentElement && !args.target.parentElement.classList.contains('e-checkbox-wrapper'))) {
                args.cancel = true;
                const rowIndex = (args && args.rowIndexes)
                    ? args.rowIndexes[args.rowIndexes.length - 1]
                    : args.rowIndex;
                this.gridObj.selectRow(rowIndex);
            }
            this.isMultiSelect = false;
        }
    }
    /* istanbul ignore next */
    onSelected(args) {
        this.parent.activeModule = 'detailsview';
        if (!this.parent.isLayoutChange || this.parent.isFiltered) {
            this.selectedRecords();
        }
        this.parent.notify(selectionChanged, {});
        if (this.gridObj.getSelectedRowIndexes().length === 1) {
            this.firstItemIndex = this.gridObj.selectedRowIndex;
        }
        this.gridObj.element.setAttribute('tabindex', '-1');
        this.triggerSelect('select', args);
        const item = this.gridObj.getRowByIndex(this.gridObj.selectedRowIndex);
        this.updateType(item);
        if (!isNullOrUndefined(item) && !isNullOrUndefined(item.querySelector('.e-checkselect'))) {
            if (this.gridObj.getSelectedRowIndexes().length !== 1) {
                const lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
                const lastItem = this.gridObj.getRowByIndex(lastItemIndex);
                if (!isNullOrUndefined(lastItem)) {
                    lastItem.querySelector('.e-checkselect').setAttribute('tabindex', '-1');
                }
            }
            item.querySelector('.e-rowcell.e-fe-checkbox').removeAttribute('tabindex');
        }
        if (!isNullOrUndefined(this.gridObj) && !isNullOrUndefined(this.gridObj.element.querySelector('.e-checkselectall'))) {
            this.gridObj.element.querySelector('.e-checkselectall').setAttribute('tabindex', '-1');
        }
        const rows = this.gridObj.getSelectedRowIndexes();
        if (!this.parent.allowMultiSelection) {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i] === this.gridObj.selectedRowIndex) {
                    this.gridObj.getRowByIndex(rows[i]).setAttribute('tabindex', '0');
                }
                else {
                    this.gridObj.getRowByIndex(rows[i]).removeAttribute('tabindex');
                }
            }
        }
        const len = rows.length;
        if (this.parent.enableVirtualization) {
            this.parent.currentItemText = getValue('name', args.data);
        }
        else if (len > 0) {
            const data = this.gridObj.getRowsObject()[rows[len - 1]].data;
            this.parent.currentItemText = getValue('name', data);
        }
        const indexes = getValue('rowIndexes', args);
        const multiSelect = getValue('enableSelectMultiTouch', this.gridObj.selectionModule);
        if (this.parent.isDevice && isNullOrUndefined(indexes) && args.target && !multiSelect && !args.target.closest('.e-headercell')) {
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
    }
    /* istanbul ignore next */
    onPathColumn() {
        if (this.parent.view === 'Details' && !isNullOrUndefined(this.gridObj)) {
            if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
                this.removePathColumn(false);
            }
        }
    }
    selectedRecords() {
        this.parent.setProperties({ selectedItems: [] }, true);
        const selectedRecords = this.gridSelectNodes();
        let selectSize = 0;
        while (selectSize < selectedRecords.length) {
            const record = selectedRecords[selectSize];
            const name = getItemName(this.parent, record);
            this.parent.selectedItems.push(name);
            selectSize++;
        }
        this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
    }
    onDeSelection(args) {
        /* istanbul ignore next */
        if (!this.parent.allowMultiSelection && isNullOrUndefined(args.data)) {
            const item = this.gridObj.getRowByIndex(args.rowIndex);
            if (!isNullOrUndefined(item)) {
                item.removeAttribute('tabindex');
            }
        }
        else if (this.gridObj.getSelectedRowIndexes().length > 1) {
            const lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
            const lastItem = this.gridObj.getRowByIndex(lastItemIndex);
            if (!isNullOrUndefined(lastItem)) {
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
            removeClass([this.parent.element], MULTI_SELECT);
        }
        this.parent.notify(selectionChanged, {});
        this.triggerSelect('unselect', args);
        this.parent.visitedItem = null;
    }
    triggerSelect(action, args) {
        const eventArgs = { action: action, fileDetails: args.data, isInteracted: this.interaction };
        this.parent.trigger('fileSelect', eventArgs);
        this.interaction = true;
    }
    wireEvents() {
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
    }
    unWireEvents() {
        this.wireClickEvent(false);
        this.keyboardModule.destroy();
        this.keyboardDownModule.destroy();
        EventHandler.remove(this.gridObj.element, 'blur', this.removeFocus);
        EventHandler.remove(this.parent.element, 'focusout', this.onBlur);
    }
    wireClickEvent(toBind) {
        if (toBind) {
            const ele = this.gridObj.getContent();
            this.clickObj = new Touch(ele, {
                tap: (eve) => {
                    if (eve.tapCount === 1 && eve.originalEvent.target.classList.contains('e-content')) {
                        this.onClearAllInit();
                    }
                },
                tapHold: (e) => {
                    if (this.parent.isDevice) {
                        e.originalEvent.preventDefault();
                        if (this.parent.allowMultiSelection) {
                            setValue('enableSelectMultiTouch', this.parent.allowMultiSelection, this.gridObj.selectionModule);
                            addClass([this.parent.element], MULTI_SELECT);
                        }
                        const target = e.originalEvent.target;
                        if (target) {
                            const row = closest(target, '.' + ROW);
                            const index = this.gridObj.getRows().indexOf(row);
                            this.gridObj.selectRow(index);
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
    }
    /* istanbul ignore next */
    removeSelection() {
        removeClass([this.parent.element], MULTI_SELECT);
        this.gridObj.clearSelection();
        this.parent.setProperties({ selectedItems: [] }, true);
        this.parent.notify(selectionChanged, {});
        if (this.gridObj.selectedRowIndex === -1) {
            this.startIndex = null;
        }
        this.isInteracted = true;
    }
    removeFocus() {
        this.addFocus(null);
    }
    onBlur(e) {
        if ((e.relatedTarget !== null && closest(e.relatedTarget, '.e-grid') !== e.relatedTarget)) {
            return;
        }
        if (!isNullOrUndefined(this.gridObj.element)) {
            const thElements = this.gridObj.element.querySelectorAll('th');
            for (let i = 0; i < thElements.length; i++) {
                if (thElements[i].classList.contains('e-focus')) {
                    this.addFocus(null);
                }
            }
        }
    }
    getFocusedItemIndex() {
        return (!isNullOrUndefined(this.getFocusedItem())) ?
            parseInt(this.getFocusedItem().getAttribute('aria-rowindex'), 10) - 1 : null;
    }
    /* istanbul ignore next */
    keydownHandler(e) {
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
        }
    }
    /* istanbul ignore next */
    keyupHandler(e) {
        if (!this.isRendered) {
            return;
        }
        e.preventDefault();
        const action = e.action;
        const gridItems = getSortedData(this.parent, this.gridObj.dataSource);
        const gridLength = gridItems.length;
        const focIndex = this.getFocusedItemIndex();
        const selIndex = this.gridObj.selectedRowIndex;
        const selRowIndeces = this.gridObj.getSelectedRowIndexes();
        let rowData;
        let firstItem;
        let lastItem;
        switch (action) {
            case 'altEnter':
                this.parent.notify(detailsInit, {});
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
                        const direction = !e.target.getElementsByClassName('e-ascending').length ? 'Ascending' : 'Descending';
                        const currentField = this.gridObj.getColumnByUid(e.target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid')).field;
                        this.gridObj.sortColumn(currentField, direction);
                        if (!isNullOrUndefined(this.getFocusedItem().nextSibling)) {
                            this.getFocusedItem().nextSibling.setAttribute('tabindex', '0');
                        }
                    }
                    break;
                }
                rowData = this.gridObj.getRowsObject()[this.gridObj.selectedRowIndex].data;
                if (rowData) {
                    const data = JSON.parse(JSON.stringify(rowData));
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
                if (!isNullOrUndefined(gridItems[0]) && this.parent.allowMultiSelection) {
                    const cnTable = this.gridObj.getContent().querySelector('.e-content');
                    const crtSrlPos = cnTable.scrollTop;
                    const crtFocusIndex = this.gridObj.selectedRowIndex;
                    this.gridObj.selectionModule.selectRowsByRange(0, gridItems.length - 1);
                    cnTable.scrollTop = crtSrlPos;
                    if (crtFocusIndex !== -1) {
                        this.addFocus(crtFocusIndex);
                    }
                }
                break;
            case 'ctrlHome':
            case 'tab':
                if (!isNullOrUndefined(gridItems[0])) {
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
                if (!isNullOrUndefined(gridItems[0])) {
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
                    if (!isNullOrUndefined(gridItems[0])) {
                        if (!isNullOrUndefined(selIndex) && selIndex !== -1) {
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
    }
    gridSelectNodes() {
        return this.gridObj.getSelectedRecords();
    }
    doDownload() {
        if (this.parent.selectedItems.length !== 0) {
            this.parent.itemData = this.gridObj.getSelectedRecords();
            const items = this.parent.itemData;
            for (let i = 0; i < items.length; i++) {
                if (!hasDownloadAccess(items[i])) {
                    createDeniedDialog(this.parent, items[i], permissionDownload);
                    return;
                }
            }
            Download(this.parent, this.parent.path, this.parent.selectedItems);
        }
    }
    performDelete() {
        if (this.parent.selectedItems && this.parent.selectedItems.length > 0) {
            this.parent.itemData = this.gridObj.getSelectedRecords();
            const items = this.parent.itemData;
            for (let i = 0; i < items.length; i++) {
                if (!hasEditAccess(items[i])) {
                    createDeniedDialog(this.parent, items[i], permissionEdit);
                    return;
                }
            }
            createDialog(this.parent, 'Delete');
        }
    }
    performRename() {
        if (this.parent.selectedItems.length === 1) {
            this.updateRenameData();
            doRename(this.parent);
        }
    }
    updateRenameData() {
        const data = this.gridSelectNodes()[0];
        updateRenamingData(this.parent, data);
    }
    shiftMoveMethod(gridItems, selIndex, focIndex, selRowIndeces, e) {
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
    }
    moveFunction(selectedItems, e, rowIndex) {
        if (!isNullOrUndefined(this.getFocusedItem()) && this.parent.allowMultiSelection) {
            if (e.action === 'moveDown') {
                this.gridObj.selectRow(this.getFocusedItemIndex() + 1);
            }
            else {
                this.gridObj.selectRow(this.getFocusedItemIndex() - 1);
            }
        }
        else if (!isNullOrUndefined(rowIndex) && rowIndex !== -1) {
            if (e.action === 'moveDown' || e.action === 'ctrlDown' || e.action === 'shiftDown' || e.action === 'csDown') {
                this.gridObj.selectRow(rowIndex + ((rowIndex !== selectedItems.length - 1) ? 1 : 0));
            }
            else {
                this.gridObj.selectRow(rowIndex - ((rowIndex !== 0) ? 1 : 0));
            }
        }
        else {
            if (!isNullOrUndefined(selectedItems[0])) {
                this.gridObj.selectRow(0);
            }
        }
    }
    spaceSelection(selRowIndeces, focIndex, selIndex, e) {
        if (!this.isSelected(selRowIndeces, focIndex) && selIndex !== -1 && (e.action === 'shiftSpace' || e.action === 'csSpace')) {
            if (focIndex < selIndex) {
                this.gridObj.selectionModule.selectRowsByRange(focIndex, selIndex);
            }
            else {
                this.gridObj.selectionModule.selectRowsByRange(selIndex, focIndex);
            }
        }
        else if (!isNullOrUndefined(this.getFocusedItem()) && focIndex !== selIndex) {
            selRowIndeces.push(this.getFocusedItemIndex());
            this.gridObj.selectRows(selRowIndeces);
        }
        else if (selIndex !== -1 && e.action === 'ctrlSpace' && this.parent.allowMultiSelection) {
            const lItem = selIndex;
            selRowIndeces.pop();
            this.gridObj.selectRows(selRowIndeces);
            this.addFocus(lItem);
        }
        else if (e.action === 'shiftSpace') {
            this.gridObj.selectRow(selIndex);
        }
    }
    ctrlMoveFunction(items, e, rowIndex) {
        let nextItem;
        if (!isNullOrUndefined(this.getFocusedItem())) {
            const nextIndex = this.getFocusedItemIndex();
            nextItem = (e.action === 'ctrlDown' || e.action === 'csDown') ?
                nextIndex + ((nextIndex < items.length - 1) ? 1 : 0) : nextIndex - ((nextIndex < 1) ? 0 : 1);
        }
        else if (!isNullOrUndefined(rowIndex) && rowIndex !== -1) {
            nextItem = (e.action === 'ctrlDown' || e.action === 'csDown') ?
                rowIndex + ((rowIndex < items.length) ? 1 : 0) : rowIndex - ((rowIndex < 1) ? 0 : 1);
        }
        else {
            if (!isNullOrUndefined(items[0])) {
                nextItem = 0;
            }
        }
        this.addFocus(nextItem);
    }
    checkRowsKey(items, indexValue, focIndex, e) {
        if (this.gridObj.checkAllRows === 'Uncheck' || this.gridObj.checkAllRows === 'Intermediate') {
            if (e.action !== 'csHome' && e.action !== 'csEnd') {
                if (isNullOrUndefined(this.startIndex) && this.firstItemIndex !== indexValue) {
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
                        selectRows(this.InnerItems(isNullOrUndefined(indexValue) ? 0 : indexValue, isNullOrUndefined(focIndex) ? items.length - 1 : focIndex, e));
                }
                else {
                    if (isNullOrUndefined(indexValue)) {
                        this.gridObj.selectRow(0);
                    }
                    else {
                        this.gridObj.selectRows(this.InnerItems(isNullOrUndefined(focIndex) ? 0 : focIndex, indexValue, e));
                    }
                }
            }
        }
        else {
            this.gridObj.selectionModule.selectRow(((e.action === 'shiftHome' || e.action === 'csHome') ? 0 : items.length - 1));
        }
    }
    InnerItems(fItem, lItem, e) {
        const itemArr = this.gridObj.getSelectedRowIndexes();
        if (e.action === 'csEnd') {
            for (let i = fItem + 1; i <= lItem; i++) {
                itemArr.push(i);
            }
        }
        else {
            for (let i = lItem - 1; fItem <= i; i--) {
                itemArr.push(i);
            }
        }
        return itemArr;
    }
    shiftSelectFocusItem(selIndex, fIndex, selRowIndexes, e) {
        const lItem = fIndex + ((e.action === 'shiftDown' || e.action === 'csDown') ? 1 : -1);
        const fItem = isNullOrUndefined(this.startIndex) ? selIndex : selRowIndexes[0];
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
    }
    addFocus(item) {
        const fItem = this.getFocusedItem();
        const itemElement = this.gridObj.getRowByIndex(item);
        if (fItem) {
            fItem.removeAttribute('tabindex');
            removeClass([fItem], [FOCUS, FOCUSED]);
        }
        if (!isNullOrUndefined(itemElement)) {
            this.gridObj.element.setAttribute('tabindex', '-1');
            itemElement.setAttribute('tabindex', '0');
            itemElement.focus();
            addClass([itemElement], [FOCUS, FOCUSED]);
        }
    }
    addHeaderFocus(e) {
        const treeFocus = select('.e-row', this.element);
        this.gridObj.element.setAttribute('tabindex', '-1');
        let nameFocus;
        if (!isNullOrUndefined(e.target) && e.target.classList.contains('e-defaultcursor')) {
            this.addFocus(0);
            nameFocus = e.target.nextElementSibling;
        }
        else if (!isNullOrUndefined(this.gridObj.element.querySelector('.e-focus')) && (this.gridObj.element.querySelector('.e-focus').tagName === 'TH')) {
            nameFocus = this.gridObj.element.querySelector('.e-focus').nextElementSibling;
            this.addFocus(0);
        }
        else {
            nameFocus = select('th.e-fe-grid-icon', this.element);
        }
        if (!isNullOrUndefined(nameFocus)) {
            nameFocus.setAttribute('tabindex', '0');
            nameFocus.focus();
            addClass([nameFocus], [FOCUS, FOCUSED]);
            treeFocus.setAttribute('tabindex', '0');
            if (treeFocus.tabIndex === 0 && nameFocus.tabIndex === 0) {
                removeClass([treeFocus], [FOCUS, FOCUSED]);
            }
        }
    }
    getFocusedItem() {
        return select('.' + FOCUSED, this.element);
    }
    isSelected(selRowIndexes, focIndex) {
        let check = false;
        for (let i = 0; i <= selRowIndexes.length - 1; i++) {
            if (selRowIndexes[i] === focIndex) {
                check = true;
                break;
            }
        }
        return check;
    }
    shiftSelectedItem(selIndex, selRowIndexes, gridItems, e) {
        if (selIndex === -1) {
            this.gridObj.selectRow(0);
        }
        else {
            if (isNullOrUndefined(this.startIndex) && e.shiftKey) {
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
    }
    onMethodCall(e) {
        if (this.parent.view !== 'Details') {
            return;
        }
        const action = getValue('action', e);
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
    }
    getRecords(nodes) {
        const gridRecords = this.gridObj.getCurrentViewRecords();
        const records = [];
        const hasFilter = (this.parent.breadcrumbbarModule.searchObj.element.value !== '' || this.parent.isFiltered) ? true : false;
        const filter = this.parent.hasId ? 'id' : 'name';
        if (this.parent.hasId || !hasFilter) {
            for (let i = 0, len = gridRecords.length; i < len; i++) {
                if (nodes.indexOf(getValue(filter, gridRecords[i])) !== -1) {
                    records.push(gridRecords[i]);
                }
            }
        }
        else {
            for (let i = 0, len = gridRecords.length; i < len; i++) {
                const name = getValue('filterPath', gridRecords[i]) + getValue('name', gridRecords[i]);
                if (nodes.indexOf(name) !== -1) {
                    records.push(gridRecords[i]);
                }
            }
        }
        return records;
    }
    deleteFiles(ids) {
        this.parent.activeModule = 'detailsview';
        if (isNullOrUndefined(ids)) {
            this.performDelete();
            return;
        }
        const records = this.getRecords(ids);
        if (records.length === 0) {
            return;
        }
        const data = [];
        const newIds = [];
        for (let i = 0; i < records.length; i++) {
            data[i] = records[i];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDeleteFiles(this.parent, data, newIds);
    }
    downloadFiles(ids) {
        if (isNullOrUndefined(ids)) {
            this.doDownload();
            return;
        }
        const dRecords = this.getRecords(ids);
        if (dRecords.length === 0) {
            return;
        }
        const data = [];
        const newIds = [];
        for (let i = 0; i < dRecords.length; i++) {
            data[i] = dRecords[i];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDownloadFiles(this.parent, data, newIds);
    }
    openFile(id) {
        if (isNullOrUndefined(id)) {
            return;
        }
        const records = this.getRecords([id]);
        if (records.length > 0) {
            this.openContent(records[0]);
        }
    }
    renameFile(id, name) {
        this.parent.activeModule = 'detailsview';
        if (isNullOrUndefined(id)) {
            this.performRename();
            return;
        }
        const records = this.getRecords([id]);
        if (records.length > 0) {
            updateRenamingData(this.parent, records[0]);
            if (!isNullOrUndefined(name)) {
                if (hasEditAccess(this.parent.itemData[0])) {
                    rename(this.parent, this.parent.path, name);
                }
                else {
                    createDeniedDialog(this.parent, this.parent.itemData[0], permissionEdit);
                }
            }
            else {
                doRename(this.parent);
            }
        }
    }
}

export { ACTIVE, ALT_DIALOG_ID, AjaxSettings, BLUR, BREADCRUMBBAR_ID, BREADCRUMBS, BreadCrumbBar, CB_WRAP, CHECK, CHECK_SELECT, CLONE, COLLAPSED, CONTENT_ID, CONTEXT_MENU_ID, CONTROL, Column, ContextMenu, ContextMenuSettings, DETAILS_LABEL, DIALOG_ID, DISPLAY_NONE, DROP_FILE, DROP_FOLDER, Delete, DetailsView, DetailsViewSettings, Download, EMPTY, EMPTY_CONTENT, EMPTY_INNER_CONTENT, ERROR_CONTENT, EXTN_DIALOG_ID, FILTER, FOCUS, FOCUSED, FOLDER, FRAME, FULLROW, FileManager, GRID_CONTENT, GRID_HEADER, GRID_ID, GRID_VIEW, GetDetails, HEADER_CHECK, HOVER, ICONS, ICON_BREADCRUMB, ICON_CLEAR, ICON_COLLAPSIBLE, ICON_COPY, ICON_CUT, ICON_DELETE, ICON_DETAILS, ICON_DOWNLOAD, ICON_DROP_IN, ICON_DROP_OUT, ICON_GRID, ICON_IMAGE, ICON_LARGE, ICON_MUSIC, ICON_NEWFOLDER, ICON_NO_DROP, ICON_OPEN, ICON_OPTIONS, ICON_PASTE, ICON_REFRESH, ICON_RENAME, ICON_SELECTALL, ICON_SHORTBY, ICON_UPLOAD, ICON_VIDEO, ICON_VIEW, IMG_DIALOG_ID, LARGEICON_ID, LARGE_EMPTY_FOLDER, LARGE_EMPTY_FOLDER_TWO, LARGE_ICON, LARGE_ICONS, LARGE_ICON_FOLDER, LAYOUT, LAYOUT_CONTENT, LAYOUT_ID, LIST_ITEM, LIST_PARENT, LIST_TEXT, LargeIconsView, MENU_ICON, MENU_ITEM, MOBILE, MOB_POPUP, MULTI_SELECT, NAVIGATION, NAVIGATION_ID, NavigationPane, NavigationPaneSettings, OVERLAY, RETRY_DIALOG_ID, RETRY_ID, ROOT, ROOT_POPUP, ROW, ROWCELL, RTL, SEARCH_ID, SELECTED_ITEMS, SORTBY_ID, SPLITTER_ID, SPLIT_BAR, STATUS, SUBMENU_ICON, Search, SearchSettings, TB_ITEM, TB_OPTION_DOT, TB_OPTION_TICK, TEMPLATE_CELL, TEXT_CONTENT, TOOLBAR_ID, TREE_ID, TREE_VIEW, Toolbar, ToolbarItem, ToolbarSettings, UPLOAD_DIALOG_ID, UPLOAD_ID, UploadSettings, VALUE, VIEW_ID, Virtualization, actionFailure, activeElement, addBlur, afterRequest, beforeDelete, beforeDownload, beforeRequest, clearAllInit, clearPathInit, closePopup, columnArray, copyFiles, createDeniedDialog, createDialog, createEmptyElement, createEnd, createExtDialog, createFolder, createImageDialog, createNewFolder, createVirtualDragElement, cutCopyInit, cutEnd, cutFiles, defaultToolbarItems, deleteEnd, deleteInit, destroy, detailsInit, doDeleteFiles, doDownload, doDownloadFiles, doPasteUpdate, doRename, download, downloadInit, dragCancel, dragEnd, dragHelper, dragStartHandler, dragStopHandler, dragging, draggingHandler, dropHandler, dropInit, dropPath, fileItems, fileType, filter, filterEnd, finalizeEnd, folderItems, generatePath, getAccessClass, getAccessDetails, getAllChildItems, getCssClass, getDirectories, getDirectoryPath, getDuplicateData, getFullPath, getImageUrl, getItemName, getLocaleText, getModule, getName, getObject, getParentPath, getParents, getPath, getPathId, getPathNames, getPathObject, getSortField, getSortedData, getTargetModule, getTargetPath, hasContentAccess, hasDownloadAccess, hasEditAccess, hasReadAccess, hasUploadAccess, hideLayout, hidePaste, initialEnd, isFile, isFileSystemData, layoutChange, layoutItems, layoutRefresh, menuItemData, methodCall, modelChanged, nodeExpand, objectToString, openAction, openEnd, openInit, openSearchFolder, paste, pasteEnd, pasteHandler, pasteInit, pathChanged, pathColumn, pathDrag, permissionCopy, permissionDownload, permissionEdit, permissionEditContents, permissionRead, permissionUpload, read, readDropPath, refresh, refreshEnd, removeActive, removeBlur, removeDropTarget, removeItemClass, rename, renameEnd, renameEndParent, renameInit, resizeEnd, scrollHandler, search, searchTextChange, searchWordHandler, selectAllInit, selectedData, selectionChanged, setDateObject, setNextPath, setNodeId, showPaste, skipUpload, sortByChange, sortColumn, sortComparer, sortbyClickHandler, splitterResize, treeSelect, updateLayout, updatePath, updateRenamingData, updateSelectionData, updateTreeSelection, upload, uploadItem, validateSubFolder };
//# sourceMappingURL=ej2-filemanager.es2015.js.map
