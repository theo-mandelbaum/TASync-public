import { Property, ChildProperty, initializeCSPTemplate, getValue, isNullOrUndefined, matches, select, closest, createElement, setValue, detach, extend, Ajax, Fetch, remove, Internationalization, selectAll, Draggable, KeyboardEvents, EventHandler, Touch, addClass, removeClass, isVisible, getUniqueID, setStyleAttribute, formatUnit, Browser, L10n, Complex, Collection, Event, NotifyPropertyChanges, Component, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Dialog, showSpinner, hideSpinner, createSpinner } from '@syncfusion/ej2-popups';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { getUid, Grid, Resize, ContextMenu as ContextMenu$2, Sort, VirtualScroll } from '@syncfusion/ej2-grids';
import { Input, TextBox, Uploader } from '@syncfusion/ej2-inputs';
import { CheckBox, createCheckBox } from '@syncfusion/ej2-buttons';
import { ListBase } from '@syncfusion/ej2-lists';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ContextMenu as ContextMenu$1, Toolbar as Toolbar$1, TreeView } from '@syncfusion/ej2-navigations';

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Ajax settings of the File Manager.
 */
var AjaxSettings = /** @class */ (function (_super) {
    __extends(AjaxSettings, _super);
    function AjaxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return AjaxSettings;
}(ChildProperty));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var defaultToolbarItems = ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download', 'Rename',
    'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
/**
 * Specifies the Toolbar settings of the FileManager.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends$1(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(defaultToolbarItems)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate$1([
        Property(true)
    ], ToolbarSettings.prototype, "visible", void 0);
    return ToolbarSettings;
}(ChildProperty));
var ToolbarItem = /** @class */ (function (_super) {
    __extends$1(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return ToolbarItem;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Search settings of the File Manager.
 */
var SearchSettings = /** @class */ (function (_super) {
    __extends$2(SearchSettings, _super);
    function SearchSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return SearchSettings;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the columns in the details view of the file manager.
 */
var columnArray = [
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
            return "<span class=\"e-fe-size\">" + data.size + "</span>";
        }), format: 'n2'
    }
];
/**
 * Specifies the grid settings of the File Manager.
 */
var DetailsViewSettings = /** @class */ (function (_super) {
    __extends$3(DetailsViewSettings, _super);
    function DetailsViewSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property(true)
    ], DetailsViewSettings.prototype, "columnResizing", void 0);
    __decorate$3([
        Property(columnArray)
    ], DetailsViewSettings.prototype, "columns", void 0);
    return DetailsViewSettings;
}(ChildProperty));

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var fileItems = ['Open', '|', 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'];
var folderItems = ['Open', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', 'Download', '|', 'Details'];
var layoutItems = [
    'SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'
];
/**
 * Specifies the ContextMenu settings of the File Manager.
 */
var ContextMenuSettings = /** @class */ (function (_super) {
    __extends$4(ContextMenuSettings, _super);
    function ContextMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return ContextMenuSettings;
}(ChildProperty));

var __extends$5 = (undefined && undefined.__extends) || (function () {
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
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the navigationpane settings of the File Manager.
 */
var NavigationPaneSettings = /** @class */ (function (_super) {
    __extends$5(NavigationPaneSettings, _super);
    function NavigationPaneSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return NavigationPaneSettings;
}(ChildProperty));

var __extends$6 = (undefined && undefined.__extends) || (function () {
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
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the Ajax settings of the File Manager.
 */
var UploadSettings = /** @class */ (function (_super) {
    __extends$6(UploadSettings, _super);
    function UploadSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return UploadSettings;
}(ChildProperty));

var __extends$7 = (undefined && undefined.__extends) || (function () {
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
var Column = /** @class */ (function (_super) {
    __extends$7(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Column;
}(ChildProperty));

/**
 * Specifies the File Manager internal ID's
 */
/** @hidden */
var TOOLBAR_ID = '_toolbar';
/** @hidden */
var LAYOUT_ID = '_layout';
/** @hidden */
var NAVIGATION_ID = '_navigation';
/** @hidden */
var TREE_ID = '_tree';
/** @hidden */
var GRID_ID = '_grid';
/** @hidden */
var LARGEICON_ID = '_largeicons';
/** @hidden */
var DIALOG_ID = '_dialog';
/** @hidden */
var ALT_DIALOG_ID = '_alt_dialog';
/** @hidden */
var IMG_DIALOG_ID = '_img_dialog';
/** @hidden */
var EXTN_DIALOG_ID = '_extn_dialog';
/** @hidden */
var UPLOAD_DIALOG_ID = '_upload_dialog';
/** @hidden */
var RETRY_DIALOG_ID = '_retry_dialog';
/** @hidden */
var CONTEXT_MENU_ID = '_contextmenu';
/** @hidden */
var SORTBY_ID = '_sortby';
/** @hidden */
var VIEW_ID = '_view';
/** @hidden */
var SPLITTER_ID = '_splitter';
/** @hidden */
var CONTENT_ID = '_content';
/** @hidden */
var BREADCRUMBBAR_ID = '_breadcrumbbar';
/** @hidden */
var UPLOAD_ID = '_upload';
/** @hidden */
var RETRY_ID = '_retry';
/** @hidden */
var SEARCH_ID = '_search';
/**
 * Specifies the File Manager internal class names
 */
/** @hidden */
var ROOT = 'e-filemanager';
/** @hidden */
var CONTROL = 'e-control';
/** @hidden */
var CHECK_SELECT = 'e-fe-cb-select';
/** @hidden */
var ROOT_POPUP = 'e-fe-popup';
/** @hidden */
var MOBILE = 'e-fe-mobile';
/** @hidden */
var MOB_POPUP = 'e-fe-popup e-fe-mobile';
/** @hidden */
var MULTI_SELECT = 'e-fe-m-select';
/** @hidden */
var FILTER = 'e-fe-m-filter';
/** @hidden */
var LAYOUT = 'e-layout';
/** @hidden */
var NAVIGATION = 'e-navigation';
/** @hidden */
var LAYOUT_CONTENT = 'e-layout-content';
/** @hidden */
var LARGE_ICONS = 'e-large-icons';
/** @hidden */
var TB_ITEM = 'e-toolbar-item';
/** @hidden */
var LIST_ITEM = 'e-list-item';
/** @hidden */
var LIST_TEXT = 'e-list-text';
/** @hidden */
var LIST_PARENT = 'e-list-parent';
/** @hidden */
var TB_OPTION_TICK = 'e-icons e-fe-tick';
/** @hidden */
var TB_OPTION_DOT = 'e-icons e-fe-dot';
/** @hidden */
var BLUR = 'e-blur';
/** @hidden */
var ACTIVE = 'e-active';
/** @hidden */
var HOVER = 'e-hover';
/** @hidden */
var FOCUS = 'e-focus';
/** @hidden */
var FOCUSED = 'e-focused';
/** @hidden */
var CHECK = 'e-check';
/** @hidden */
var FRAME = 'e-frame';
/** @hidden */
var CB_WRAP = 'e-checkbox-wrapper';
/** @hidden */
var ROW = 'e-row';
/** @hidden */
var ROWCELL = 'e-rowcell';
/** @hidden */
var EMPTY = 'e-empty';
/** @hidden */
var EMPTY_CONTENT = 'e-empty-content';
/** @hidden */
var EMPTY_INNER_CONTENT = 'e-empty-inner-content';
/** @hidden */
var CLONE = 'e-fe-clone';
/** @hidden */
var DROP_FOLDER = 'e-fe-drop-folder';
/** @hidden */
var DROP_FILE = 'e-fe-drop-file';
/** @hidden */
var FOLDER = 'e-fe-folder';
/** @hidden */
var ICON_IMAGE = 'e-fe-image';
/** @hidden */
var ICON_MUSIC = 'e-fe-music';
/** @hidden */
var ICON_VIDEO = 'e-fe-video';
/** @hidden */
var LARGE_ICON = 'e-large-icon';
/** @hidden */
var LARGE_EMPTY_FOLDER = 'e-empty-icon e-fe-folder';
/** @hidden */
var LARGE_EMPTY_FOLDER_TWO = 'e-empty-icon.e-fe-folder';
/** @hidden */
var LARGE_ICON_FOLDER = 'e-fe-folder';
/** @hidden */
var SELECTED_ITEMS = 'e-items';
/** @hidden */
var TEXT_CONTENT = 'e-text-content';
/** @hidden */
var GRID_HEADER = 'e-gridheader';
/** @hidden */
var TEMPLATE_CELL = 'e-templatecell';
/** @hidden */
var TREE_VIEW = 'e-treeview';
/** @hidden */
var MENU_ITEM = 'e-menu-item';
/** @hidden */
var MENU_ICON = 'e-menu-icon';
/** @hidden */
var SUBMENU_ICON = 'e-caret';
/** @hidden */
var GRID_VIEW = 'e-content';
/** @hidden */
var GRID_CONTENT = 'e-gridcontent';
/** @hidden */
var ICON_VIEW = 'e-list-parent';
/** @hidden */
var ICON_OPEN = 'e-icons e-fe-open';
/** @hidden */
var ICON_UPLOAD = 'e-icons e-fe-upload';
/** @hidden */
var ICON_CUT = 'e-icons e-fe-cut';
/** @hidden */
var ICON_COPY = 'e-icons e-fe-copy';
/** @hidden */
var ICON_PASTE = 'e-icons e-fe-paste';
/** @hidden */
var ICON_DELETE = 'e-icons e-fe-delete';
/** @hidden */
var ICON_RENAME = 'e-icons e-fe-rename';
/** @hidden */
var ICON_NEWFOLDER = 'e-icons e-fe-newfolder';
/** @hidden */
var ICON_DETAILS = 'e-icons e-fe-details';
/** @hidden */
var ICON_SHORTBY = 'e-icons e-fe-sort';
/** @hidden */
var ICON_REFRESH = 'e-icons e-fe-refresh';
/** @hidden */
var ICON_SELECTALL = 'e-icons e-fe-select';
/** @hidden */
var ICON_DOWNLOAD = 'e-icons e-fe-download';
/** @hidden */
var ICON_OPTIONS = 'e-icons e-fe-options';
/** @hidden */
var ICON_GRID = 'e-icons e-fe-grid';
/** @hidden */
var ICON_LARGE = 'e-icons e-fe-large';
/** @hidden */
var ICON_BREADCRUMB = 'e-icons e-fe-breadcrumb';
/** @hidden */
var ICON_CLEAR = 'e-icons e-fe-clear';
/** @hidden */
var ICON_DROP_IN = 'e-icons e-fe-drop-in';
/** @hidden */
var ICON_DROP_OUT = 'e-icons e-fe-drop-out';
/** @hidden */
var ICON_NO_DROP = 'e-icons e-fe-no-drop';
/** @hidden */
var ICONS = 'e-icons';
/** @hidden */
var DETAILS_LABEL = 'e-detailslabel';
/** @hidden */
var ERROR_CONTENT = 'e-fe-errorcontent';
/** @hidden */
var STATUS = 'e-status';
/** @hidden */
var BREADCRUMBS = 'e-address';
/** @hidden */
var RTL = 'e-rtl';
/** @hidden */
var DISPLAY_NONE = 'e-display-none';
/** @hidden */
var COLLAPSED = 'e-node-collapsed';
/** @hidden */
var FULLROW = 'e-fullrow';
/** @hidden */
var ICON_COLLAPSIBLE = 'e-icon-collapsible';
/** @hidden */
var SPLIT_BAR = 'e-split-bar';
/** @hidden */
var HEADER_CHECK = 'e-headercheck';
/** @hidden */
var OVERLAY = 'e-fe-overlay';
/** @hidden */
var VALUE = 'e-fe-value';

/**
 * Specifies the File Manager internal variables
 */
/** @hidden */
var isFile = 'isFile';
/**
 * Specifies the File Manager internal events
 */
/** @hidden */
var modelChanged = 'model-changed';
/** @hidden */
var initialEnd = 'initial-end';
/** @hidden */
var finalizeEnd = 'finalize-end';
/** @hidden */
var createEnd = 'create-end';
/** @hidden */
var filterEnd = 'filter-end';
/** @hidden */
var beforeDelete = 'before-delete';
/** @hidden */
var pathDrag = 'path-drag';
/** @hidden */
var deleteInit = 'delete-init';
/** @hidden */
var deleteEnd = 'delete-end';
/** @hidden */
var refreshEnd = 'refresh-end';
/** @hidden */
var resizeEnd = 'resize-end';
/** @hidden */
var splitterResize = 'splitter-resize';
/** @hidden */
var pathChanged = 'path-changed';
/** @hidden */
var destroy = 'destroy';
/** @hidden */
var beforeRequest = 'before-request';
/** @hidden */
var upload = 'upload';
/** @hidden */
var skipUpload = 'skip-upload';
/** @hidden */
var afterRequest = 'after-request';
/** @hidden */
var download = 'download';
/** @hidden */
var layoutRefresh = 'layout-refresh';
/** @hidden */
var actionFailure = 'actionFailure';
/** @hidden */
var search = 'search';
/** @hidden */
var openInit = 'open-init';
/** @hidden */
var openEnd = 'open-end';
/** @hidden */
var selectionChanged = 'selection-changed';
/** @hidden */
var selectAllInit = 'select-all-init';
/** @hidden */
var clearAllInit = 'clear-all-init';
/** @hidden */
var clearPathInit = 'clear-path-init';
/** @hidden */
var layoutChange = 'layout-change';
/** @hidden */
var sortByChange = 'sort-by-change';
/** @hidden */
var nodeExpand = 'node-expand';
/** @hidden */
var detailsInit = 'details-init';
/** @hidden */
var menuItemData = 'menu-item-data';
/** @hidden */
var renameInit = 'rename-init';
/** @hidden */
var renameEndParent = 'rename-end-parent';
/** @hidden */
var renameEnd = 'rename-end';
/** @hidden */
var showPaste = 'show-paste';
/** @hidden */
var hidePaste = 'hide-paste';
/** @hidden */
var selectedData = 'selected-data';
/** @hidden */
var cutCopyInit = 'cut-copy-init';
/** @hidden */
var pasteInit = 'paste-init';
/** @hidden */
var pasteEnd = 'paste-end';
/** @hidden */
var cutEnd = 'cut-end';
/** @hidden */
var hideLayout = 'hide-layout';
/** @hidden */
var updateTreeSelection = 'update-tree-selection';
/** @hidden */
var treeSelect = 'select-node';
/** @hidden */
var sortColumn = 'sort-column';
/** @hidden */
var pathColumn = 'path-column';
/** @hidden */
var searchTextChange = 'search-change';
/** @hidden */
var beforeDownload = 'before-download';
/** @hidden */
var downloadInit = 'download-init';
/** @hidden */
var dropInit = 'drop-init';
/** @hidden */
var dragEnd = 'drag-end';
/** @hidden */
var dropPath = 'drop-path';
/** @hidden */
var dragHelper = 'drag-helper';
/** @hidden */
var dragging = 'dragging';
/** @hidden */
var updateSelectionData = 'update-selection-data';
/** @hidden */
var methodCall = 'method-call';
/** @hidden */
var permissionRead = 'read';
/** @hidden */
var permissionEdit = 'write';
/** @hidden */
var permissionEditContents = 'writeContents';
/** @hidden */
var permissionCopy = 'copy';
/** @hidden */
var permissionUpload = 'upload';
/** @hidden */
var permissionDownload = 'download';

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
    var referenceIsFile = /\.\S+/.test(reference);
    var comparerIsFile = /\.\S+/.test(comparer);
    // If one is a file and the other is a folder, the folder should come first
    if (referenceIsFile && !comparerIsFile) {
        return 1;
    }
    if (!referenceIsFile && comparerIsFile) {
        return -1;
    }
    var referenceParts = [];
    var comparerParts = [];
    (reference + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { referenceParts.push([$1 || Infinity, $2 || '']); return ''; });
    (comparer + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { comparerParts.push([$1 || Infinity, $2 || '']); return ''; });
    // Compare each part of reference and comparer
    while (referenceParts.length && comparerParts.length) {
        var referencePart = referenceParts.shift();
        var comparerPart = comparerParts.shift();
        if (referencePart && comparerPart) {
            var comparisonResult = referencePart[0] - comparerPart[0] ||
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
    var text = getValue('name', data);
    var id = node.getAttribute('data-id');
    var newText = isNullOrUndefined(id) ? text : id;
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
    var matched = getParents(element, text, false, hasId);
    var path = '/';
    var len = matched.length - (2);
    for (var i = len; i >= 0; i--) {
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
    var matched = getParents(node, node.getAttribute('data-uid'), true);
    var ids = [];
    for (var i = matched.length - 1; i >= 0; i--) {
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
    var matched = getParents(element, text, false);
    var names = [];
    for (var i = matched.length - 1; i >= 0; i--) {
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
    var matched = [text];
    var el = element.parentNode;
    while (!isNullOrUndefined(el)) {
        if (matches(el, '.' + LIST_ITEM)) {
            var parentText = isId ? el.getAttribute('data-uid') : (hasId ? el.getAttribute('data-id') :
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
    var key = parent.hasId ? 'id' : 'name';
    var newPath = '/';
    var i = 1;
    for (i; i < parent.pathId.length; i++) {
        var data = getValue(parent.pathId[parseInt(i.toString(), 10)], parent.feParent);
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
    var blurEle = parent.activeElements;
    if (parent.activeModule !== 'navigationpane') {
        parent.targetPath = parent.path;
    }
    else {
        parent.targetPath = getParentPath(parent.path);
    }
    var i = 0;
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
        var i_1 = 0;
        while (i_1 < parent.selectedItems.length) {
            parent.selectedNodes.push(parent.selectedItems[i_1]);
            i_1++;
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
    var blurEle = (!hover) ? parent.element.querySelectorAll('.' + BLUR) :
        parent.element.querySelectorAll('.' + HOVER);
    var i = 0;
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
    var children = parent.fileSystemData.filter(function (item) {
        return String(item.parentId) === String(parentId);
    });
    var allChildren = children.slice();
    children.forEach(function (child) {
        var childId = child.id;
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
    var searchWord;
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
            var currData = getValue(parent.pathId[parent.pathId.length - 1], parent.feParent);
            var parentId = getValue('id', currData);
            var filteredData = getAllChildItems(parent, parentId);
            var data = new DataManager(filteredData).
                executeLocal(new Query().where('name', parent.searchSettings.filterType, value, parent.searchSettings.ignoreCase));
            var searchValue = parent.searchSettings.ignoreCase ? value.toLowerCase() : value;
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
        var caseSensitive = parent.searchSettings.ignoreCase;
        var hiddenItems = parent.showHiddenItems;
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
    var searchWord = '';
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
    var tartgetModule = '';
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
    var isFile = getValue('isFile', file);
    if (!isFile) {
        return FOLDER;
    }
    var imageFormat = ['bmp', 'dib', 'jpg', 'jpeg', 'jpe', 'jfif', 'gif', 'tif', 'tiff', 'png', 'ico'];
    var audioFormat = ['mp3', 'wav', 'aac', 'ogg', 'wma', 'aif', 'fla', 'm4a'];
    var videoFormat = ['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'avi', 'wmv', 'mp4', '3gp'];
    var knownFormat = ['css', 'exe', 'html', 'js', 'msi', 'pdf', 'pptx', 'ppt', 'rar', 'zip', 'txt', 'docx', 'doc',
        'xlsx', 'xls', 'xml', 'rtf', 'php'];
    var filetype = getValue('type', file);
    filetype = filetype.toLowerCase();
    if (filetype.indexOf('.') !== -1) {
        filetype = filetype.split('.').join('');
    }
    var iconType;
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
    var imgUrl = isFileSystemData(parent) ? getValue('imageUrl', item) : '';
    if (isFileSystemData(parent)) {
        var eventArgs_1 = {
            fileDetails: [item],
            imageUrl: imgUrl
        };
        parent.trigger('beforeImageLoad', eventArgs_1);
        return eventArgs_1.imageUrl;
    }
    var baseUrl = parent.ajaxSettings.getImageUrl ? parent.ajaxSettings.getImageUrl : parent.ajaxSettings.url;
    var pathUrl = (baseUrl.indexOf('?') !== -1) ? '&path=' : '?path=';
    var fileName = encodeURIComponent(getValue('name', item));
    var fPath = getValue('filterPath', item);
    if (parent.hasId) {
        var imgId = getValue('id', item);
        imgUrl = baseUrl + pathUrl + parent.path + '&id=' + imgId;
    }
    else if (!isNullOrUndefined(fPath)) {
        imgUrl = baseUrl + pathUrl + encodeURIComponent(fPath.replace(/\\/g, '/')) + fileName;
    }
    else {
        imgUrl = baseUrl + pathUrl + parent.path + fileName;
    }
    imgUrl = imgUrl + '&time=' + (new Date().getTime()).toString();
    var eventArgs = {
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
    var filePath = getValue(parent.hasId ? 'id' : 'name', data) + '/';
    var fPath = getValue(parent.hasId ? 'filterId' : 'filterPath', data);
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
    var name = getValue('name', data);
    var fPath = getValue('filterPath', data);
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
    var query;
    if (parent.sortOrder !== 'None' && !isNullOrUndefined(parent.sortOrder)) {
        query = new Query().sortBy(parent.sortBy, parent.sortOrder.toLowerCase(), true).group('isFile');
    }
    else {
        query = new Query().group('isFile');
    }
    var lists = new DataManager(items).executeLocal(query);
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
    var currFiles = getValue(parent.pathId[parent.pathId.length - 1], parent.feFiles);
    var result = currFiles.filter(function (data) { return data[key].toString() === value; });
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
    var top;
    var layoutElement = select('#' + parent.element.id + LAYOUT_ID, parent.element);
    var addressBarHeight = select('#' + parent.element.id + BREADCRUMBBAR_ID, layoutElement).offsetHeight;
    top = layoutElement.offsetHeight - addressBarHeight;
    if (parent.view === 'Details') {
        top = top - select('.' + GRID_HEADER, layoutElement).offsetHeight;
    }
    if (isNullOrUndefined(element.querySelector('.' + EMPTY))) {
        var emptyDiv = createElement('div', { className: EMPTY });
        var emptyFolder = createElement('div', { className: LARGE_EMPTY_FOLDER });
        var emptyEle = createElement('div', { className: EMPTY_CONTENT });
        var dragFile = createElement('div', { className: EMPTY_INNER_CONTENT });
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
    var eDiv = select('.' + EMPTY, element);
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
    var dirs = getDirectories(result.files);
    for (var i = 0, len = dirs.length; i < len; i++) {
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
    for (var i = 0; i < args.length; i++) {
        var createdDate = new Date(getValue('dateCreated', args[i]));
        var modifiedDate = new Date(getValue('dateModified', args[i]));
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
    var locale = parent.localeObj.getConstant(text);
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
    var cssClass = parent.cssClass;
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
    var tick;
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
    var text = id.substring(id.lastIndexOf('_') + 1);
    var field = text;
    var column;
    if (parent) {
        column = parent.detailsViewSettings.columns;
    }
    switch (text) {
        case 'date':
            for (var i = 0, len = column.length; i < len; i++) {
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
    var currfolders = path.split('/');
    var folders = parent.originalPath.split('/');
    var root = getValue(parent.pathId[0], parent.feParent);
    var key = isNullOrUndefined(getValue('id', root)) ? 'name' : 'id';
    for (var i = currfolders.length - 1, len = folders.length - 1; i < len; i++) {
        var eventName = (folders[i + 1] === '') ? finalizeEnd : initialEnd;
        var newPath = (folders[i] === '') ? '/' : (parent.path + folders[i] + '/');
        var data = getObject(parent, key, folders[parseInt(i.toString(), 10)]);
        if (!isNullOrUndefined(data)) {
            var id = getValue('_fm_id', data);
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
    var root = getValue(parent.pathId[0], parent.feParent);
    var navData = parent.feParent[getValue('_fm_id', parent.itemData[0])];
    var isRoot = isNullOrUndefined(navData) || getValue('_fm_id', navData) === 'fe_tree';
    var key = isNullOrUndefined(getValue('id', root)) ? 'name' : 'id';
    var searchData = getObject(parent, key, isFileSystemData(parent) ? getValue('id', data) : getValue('name', data));
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
        var id = getValue('_fm_id', searchData);
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
        var path = (parent.folderPath === '') ? parent.path : parent.folderPath;
        if (parent.activeModule === 'navigationpane' && !parent.selectedNodes[0].includes('/')) {
            parent.targetPath = getTargetPath(parent, parent.actionRecords[0]);
        }
        var subFolder = validateSubFolder(parent, parent.actionRecords, path, parent.path);
        if (!subFolder) {
            if ((parent.fileAction === 'move' && parent.targetPath !== path) || parent.fileAction === 'copy') {
                parent.notify(pasteInit, {});
                paste(parent, parent.targetPath, parent.selectedNodes, path, parent.fileAction, [], parent.actionRecords);
            }
            else {
                parent.enablePaste = false;
                parent.notify(hidePaste, {});
                removeBlur(parent);
                var result = {
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
    var subFolder = false;
    for (var i = 0; i < data.length; i++) {
        if (!getValue('isFile', data[i])) {
            var tempTarget = getFullPath(parent, data[i], dragPath);
            if (dropPath.indexOf(tempTarget) === 0) {
                var result = {
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
            var name_1 = parent.dragData[i] ? parent.dragData[i].name : null;
            var srcData = isFileSystemData(parent) ? name_1 : parent.dragNodes[i];
            var len = 0;
            if (srcData) {
                len = srcData.lastIndexOf('/');
            }
            var path = '';
            if (len > 0) {
                path = dragPath + srcData.substring(0, len + 1);
            }
            if (path === dropPath) {
                var result = {
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
        var subFolder = validateSubFolder(parent, parent.dragData, parent.dropPath, parent.dragPath);
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
    var path = oldPath.split('/');
    var newPath = path[0] + '/';
    for (var i = 1; i < path.length - 2; i++) {
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
    var filePath = getValue(parent.hasId ? 'id' : 'name', args.cwd) + '/';
    var fPath = getValue(parent.hasId && !isNullOrUndefined(parent.ajaxSettings.url) ? 'filterId' : 'filterPath', args.cwd);
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
    var flag = false;
    for (var count = 0; (count < result.files.length) && !flag; count++) {
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
    var pathId = getValue('_fm_id', parent.dropData);
    parent.expandedId = pathId;
    parent.itemData = [parent.dropData];
    if (parent.isPathDrag) {
        parent.notify(pathDrag, parent.itemData);
    }
    else {
        if (parent.navigationpaneModule) {
            var node = select('[data-uid="' + pathId + '"]', parent.navigationpaneModule.treeObj.element);
            if (!node) {
                var liElement = document.querySelector('[data-id = "' + getValue('id', parent.dropData) + '"]');
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
    var data = null;
    var records = parent.isDragDrop ? parent.dragData : parent.actionRecords;
    for (var i = 0; i < records.length; i++) {
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
        var i = 0;
        while (i < parent.selectedItems.length) {
            parent.dragNodes.push(parent.selectedItems[i]);
            i++;
        }
        if (parent.selectedItems.length === 0 && parent.dragData && parent.dragData.length === 1) {
            parent.dragNodes.push(getItemName(parent, parent.dragData[0]));
        }
    }
    var cloneIcon = parent.createElement('div', {
        className: 'e-fe-icon ' + fileType(parent.dragData[0])
    });
    var cloneName = parent.createElement('div', {
        className: 'e-fe-name',
        innerHTML: parent.dragData[0].name
    });
    var virtualEle = parent.createElement('div', {
        className: 'e-fe-content'
    });
    virtualEle.appendChild(cloneIcon);
    virtualEle.appendChild(cloneName);
    var ele = parent.createElement('div', {
        className: CLONE
    });
    ele.appendChild(virtualEle);
    if (parent.dragNodes.length > 1) {
        var badge = parent.createElement('span', {
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
    var dragArgs = args;
    dragArgs.cancel = false;
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeDropTarget(parent);
    parent.element.classList.remove('e-fe-drop', 'e-no-drop');
    removeBlur(parent);
    parent.uploadObj.dropArea = select('#' + parent.element.id + CONTENT_ID, parent.element);
    var virtualEle = select('.' + CLONE, parent.element);
    if (virtualEle) {
        detach(virtualEle);
    }
    getTargetModule(parent, args.target);
    parent.notify(dropInit, args);
    removeBlur(parent, 'hover');
    dragArgs.fileDetails = parent.dragData;
    parent.trigger('fileDragStop', dragArgs, function (dragArgs) {
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
    var dragArgs = args;
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
        var i = 0;
        while (i < parent.activeElements.length) {
            addBlur(parent.activeElements[i]);
            i++;
        }
        parent.trigger('fileDragStart', dragArgs, function (dragArgs) {
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
    var virtualEle = select('.' + CLONE, parent.element);
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
    var ele = parent.element.querySelectorAll('.' + value);
    for (var i = 0; i < ele.length; i++) {
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
    var position;
    var elementData = scrollParent.getBoundingClientRect();
    var node = select('.' + nodeClass, scrollParent);
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
    var dragArgs = args;
    dragArgs.fileDetails = parent.dragData;
    var canDrop = false;
    getTargetModule(parent, args.target);
    removeDropTarget(parent);
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeBlur(parent, 'hover');
    var node = null;
    var scrollParent;
    if (parent.targetModule === 'navigationpane') {
        node = closest(args.target, 'li');
        node.classList.add(HOVER, DROP_FOLDER);
        canDrop = true;
        /* istanbul ignore next */
        parent.treeExpandTimer = window.setTimeout(function () { parent.notify(dragging, args); }, 800);
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
    var str = '';
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
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
    var items = parent.itemData;
    for (var i = 0; i < items.length; i++) {
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
    for (var i = 0; i < data.length; i++) {
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
    for (var i = 0; i < data.length; i++) {
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
    var message = getValue('message', getValue('permission', data));
    if (message === '') {
        message = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', data)).replace('{1}', action);
    }
    var response = {
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
    var permission = getValue('permission', data);
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
    var permission = getValue('permission', data);
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
    var permission = getValue('permission', data);
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
    var permission = getValue('permission', data);
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
    var permission = getValue('permission', data);
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
    var details = parent.itemData[0];
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
    var details = parent.itemData[0];
    if (!hasUploadAccess(details)) {
        createDeniedDialog(parent, details, permissionUpload);
    }
    else {
        var eleId = '#' + parent.element.id + UPLOAD_ID;
        var uploadEle = document.querySelector(eleId);
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
    var accessMessage = '';
    for (var i = 0; i < itemData.length; i++) {
        var permission = getValue('permission', itemData[i]);
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
            var copyOrMovePermission = action === 'copy' ? getValue('copy', permission) : getValue('write', permission);
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
    var itemData = parent.itemData;
    for (var i = 0; i < itemData.length; i++) {
        if (isNullOrUndefined(getValue('hasChild', itemData[i]))) {
            setValue('hasChild', false, itemData[i]);
        }
    }
    var data = { action: 'read', path: path, showHiddenItems: parent.showHiddenItems, data: itemData };
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
    var data = { action: 'create', path: parent.path, name: itemName, data: parent.itemData };
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
    var data = { action: 'filter', path: parent.path, showHiddenItems: parent.showHiddenItems, data: [getPathObject(parent)] };
    var filterData;
    var filterDataVal = parent.filterData ? extend(filterData, data, parent.filterData) : data;
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
    var name;
    var newName;
    if (parent.breadcrumbbarModule.searchObj.element.value === '' && !parent.isFiltered) {
        name = parent.currentItemText;
        newName = itemNewName;
    }
    else {
        var fPath = parent.filterPath;
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
    var data = {
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
    var data = {
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
    var data = { action: operation, path: path, names: items, data: parent.itemData };
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
    var data = { action: operation, path: path, names: names, data: parent.itemData };
    createAjax(parent, data, detailsSuccess, path, operation);
}
/**
 * Checks whether fileSystemData is enabled.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {boolean} - returns the boolean value.
 */
function isFileSystemData(parent) {
    var isFileSystemData = parent.fileSystemData.length >= 0 && isNullOrUndefined(parent.ajaxSettings.url);
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
    var isExists = fileSystemData.some(function (item) { return item.name === name; });
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
    var index = parent.fileSystemData.findIndex(function (item) {
        return !isNullOrUndefined(item) && String(item.id) === String(id);
    });
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
    var data = parent.fileSystemData.filter(function (item) { return String(item.id) === String(id); })[0];
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
    var data = parent.fileSystemData.filter(function (item) { return String(item.parentId) === String(parentId); });
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
    var newItem = {};
    //Construct the new folder details.
    for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            newItem[key] = null;
        }
    }
    var currentDate = new Date();
    var folderPath = String(target.id) !== String(0) && !isNullOrUndefined(target.parentId) ? target.filterPath + target.name + '\\' : '\\';
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
    var createEventArgs = {
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
                var data_1 = args.parentFolder[0];
                var newObject = createNewItem(data_1, data_1, args.folderName, false);
                parent.fileSystemData.push(newObject);
            }
            else {
                var message = 'A file or folder with the name ' + args.folderName + ' already exists.';
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
    var deleteEventArgs = {
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
            args.itemData.forEach(function (itemData) {
                var index = findIndexById(parent, itemData.id);
                if (index !== -1) {
                    parent.fileSystemData.splice(index, 1);
                }
                if (!itemData.isFile) {
                    var subItems = parent.fileSystemData.filter(function (obj) { return obj.filterPath.includes(itemData.name); });
                    subItems.forEach(function (subItem) {
                        var index = findIndexById(parent, subItem.id);
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
    var renameEventArgs = {
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
                var fileData = filterById(parent, args.itemData[0].id);
                var oldName = fileData.name;
                fileData.name = args.newName;
                updateChildrenFilterPath(parent, fileData.id, oldName, args.newName);
            }
            else {
                var message = 'Cannot rename' + args.itemData[0].name + 'to' + args.newName + ': destination already exists.';
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
    parent.fileSystemData.forEach(function (item) {
        if (String(item.parentId) === String(parentId)) {
            var oldPath = item.filterPath;
            var newPath = oldPath.replace(oldName + '\\', newName + '\\');
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
    var moveEventArgs = {
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
            var message = 'File Already Exists';
            var action = getValue('action', data);
            var itemPermission = getAccessDetails(parent, args.itemData, action, false);
            var pathPermission = getAccessDetails(parent, [args.targetData], action, true);
            var file_1 = [];
            parent.pasteNodes = [];
            if (itemPermission === '' && pathPermission === '') {
                if (args.isCopy) {
                    var folderSubItems_1 = filterByParent(parent, args.targetData.id);
                    var copiedFolders = args.itemData;
                    copiedFolders.forEach(function (itemData) {
                        if (!isFileExists(folderSubItems_1, itemData.name) || getValue('renameFiles', data).length > 0) {
                            if (getValue('renameFiles', data).length > 0) {
                                var names = itemData.name.split('.');
                                var name_1 = itemData.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                                copyFolderItems(parent, itemData, args.targetData, name_1);
                                parent.responseData.error = null;
                                parent.existingFileCount++;
                                return;
                            }
                            copyFolderItems(parent, itemData, args.targetData, null);
                        }
                        else {
                            file_1.push(itemData.name);
                        }
                    });
                    if (file_1.length > 0) {
                        createErrorObject(parent, message, '400', file_1);
                    }
                    return;
                }
                var target_1 = args.targetData;
                var getTargetFiles = filterByParent(parent, target_1.id);
                for (var i = 0; i < args.itemData.length; i++) {
                    var currItem = args.itemData[i];
                    if (!isFileExists(getTargetFiles, currItem.name) || getValue('renameFiles', data).length > 0) {
                        if (!target_1.hasChild) {
                            target_1.hasChild = !currItem.isFile;
                            var targetItem = parent.fileSystemData
                                .filter(function (item) { return String(item.id) === String(target_1.id); });
                            if (targetItem.length > 0) {
                                targetItem[0].hasChild = target_1.hasChild;
                            }
                        }
                        if (!currItem.isFile) {
                            //Check whether the source folder include other sub folders or not.
                            var subItems = currItem.parentId !== 0
                                ? filterByParent(parent, currItem.parentId) : [];
                            var itemData = filterById(parent, currItem.parentId);
                            itemData.hasChild = subItems.length > 1 ? true : false;
                        }
                        var fileData = filterById(parent, currItem.id);
                        if (getValue('renameFiles', data).length > 0) {
                            var names = currItem.name.split('.');
                            currItem.name = currItem.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                            fileData.name = currItem.name;
                            parent.responseData.error = null;
                            parent.existingFileCount++;
                            parent.dropData = target_1;
                            parent.dropPath = args.path;
                            var pathArray = args.targetPath.replace(/^\/|\/$/g, '').split('/');
                            target_1 = filterById(parent, pathArray[pathArray.length - 1]);
                        }
                        fileData.parentId = target_1.id;
                        fileData.filterPath = target_1.id === 0 ? '\\' : target_1.filterPath + target_1.name + '\\';
                    }
                    else {
                        file_1.push(currItem.name);
                    }
                }
                if (file_1.length > 0) {
                    createErrorObject(parent, message, '400', file_1);
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
    var searchEventArgs = {
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
    var ajaxSettings = {
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
    var eventArgs = { action: getValue('action', data), ajaxSettings: ajaxSettings, cancel: false };
    triggerClientEvents(parent, data, eventArgs);
    parent.trigger('beforeSend', eventArgs, function (beforeSendArgs) {
        if (!beforeSendArgs.cancel) {
            parent.notify(beforeRequest, {});
            if (isFileSystemData(parent)) {
                var filePath = event === 'node-expand' || event === 'finalize-end' || event === 'rename-end-parent'
                    ? getValue('path', data) : parent.path;
                var pathArray = filePath.replace(/^\/|\/$/g, '').split('/');
                var idValue = event === 'rename-end-parent' || (event === 'path-changed' && getValue('data', data).length !== 0 && isNullOrUndefined(parent.renamedItem))
                    ? getValue('data', data)[0].id : pathArray[pathArray.length - 1];
                var action = getValue('action', data);
                var isFileOperation = (action === 'move' || action === 'rename' || action === 'copy' || action === 'delete' || action === 'search') && event !== 'rename-end';
                if (action === 'read' || action === 'create' || event === 'rename-end') {
                    var rootId = parent.fileSystemData
                        .filter(function (item) { return isNullOrUndefined(item.parentId); })
                        .length > 0
                        ? parent.fileSystemData
                            .filter(function (item) { return isNullOrUndefined(item.parentId); })[0].id
                        : 0;
                    parent.responseData = {
                        cwd: filterById(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue),
                        details: null,
                        error: null,
                        files: filterByParent(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue)
                    };
                    if (isNullOrUndefined(parent.responseData.cwd)) {
                        var message = 'Cannot load empty data within the File Manager.';
                        createErrorObject(parent, message, '400', null);
                    }
                }
                else if (isFileOperation && parent.responseData.error === null) {
                    var itemData = action === 'search' || action === 'delete' ? getValue('data', data) : [];
                    if (itemData.length === 0) {
                        if (action === 'copy') {
                            itemData = parent.pasteNodes.map(function (item) { return filterById(parent, item); });
                        }
                        else {
                            itemData = getValue('data', data).map(function (item) { return filterById(parent, item.id); });
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
                    var itemData = getValue('data', data);
                    var details = itemData[0];
                    var isMultipleFiles = itemData.length > 1;
                    var itemNames = itemData.map(function (item) { return item.name; });
                    var totalSize = isMultipleFiles ? getSize(itemData.reduce(function (accumulator, currentObject) { return accumulator + (currentObject.size || 0); }, 0)) : getSize(details.size);
                    var path = (parent.pathNames.includes(details.name) || isMultipleFiles ? parent.pathNames.join('/') : parent.pathNames.join('/') + '/' + details.name);
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
            var ajax = new Ajax({
                url: getValue('url', beforeSendArgs.ajaxSettings),
                type: getValue('type', beforeSendArgs.ajaxSettings),
                mode: getValue('mode', beforeSendArgs.ajaxSettings),
                dataType: getValue('dataType', beforeSendArgs.ajaxSettings),
                contentType: getValue('contentType', beforeSendArgs.ajaxSettings),
                data: getValue('data', beforeSendArgs.ajaxSettings),
                beforeSend: getValue('beforeSend', beforeSendArgs.ajaxSettings),
                onSuccess: function (result) {
                    if (isNullOrUndefined(result)) {
                        var result_1 = {
                            error: {
                                fileExists: null,
                                message: getLocaleText(parent, 'Server-Error') + ' ' + parent.ajaxSettings.url,
                                code: '406'
                            },
                            files: null
                        };
                        triggerAjaxFailure(parent, beforeSendArgs, fn, result_1, event, operation, targetPath);
                        return;
                    }
                    if (typeof (result) === 'string') {
                        result = JSON.parse(result);
                    }
                    performReadOperation(parent, result, fn, data, event, operation, targetPath, beforeSendArgs);
                },
                onFailure: function () {
                    var result = {
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
    var hz;
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
    var id = parent.expandedId ? parent.expandedId : parent.pathId[parent.pathId.length - 1];
    if (!isNullOrUndefined(result.cwd) && (getValue('action', data) === 'read')) {
        result.cwd.name = (parent.pathId.length === 1) ? (parent.rootAliasName || result.cwd.name) : result.cwd.name;
        setValue('_fm_id', id, result.cwd);
        setValue(id, result.cwd, parent.feParent);
        if (!isNullOrUndefined(result.files) || result.error.code === '401') {
            if ((event === 'finalize-end' || event === 'initial-end') && parent.pathNames.length === 0) {
                var root = getValue(parent.pathId[0], parent.feParent);
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
        for (var i = 0, len = result.files.length; i < len; i++) {
            var item = result.files[i];
            setValue('_fm_iconClass', fileType(item), item);
        }
        if (getValue('action', data) === 'read') {
            setNodeId(result, id);
            setValue(id, result.files, parent.feFiles);
        }
    }
    if (!isNullOrUndefined(result.details) && !isNullOrUndefined(parent.rootAliasName)) {
        var rootName = parent.rootAliasName || getValue('name', result.details);
        var location_1 = getValue('location', result.details).replace(new RegExp('/', 'g'), '\\');
        if ((getValue('path', data) === '/') || (parent.hasId && getValue('path', data).match(/[/]/g).length === 1)) {
            if (getValue('names', data).length === 0) {
                setValue('name', rootName, result.details);
            }
            if (location_1.indexOf('\\') === -1) {
                location_1 = rootName;
            }
            else {
                location_1 = location_1.replace(location_1.substring(0, location_1.indexOf('\\')), rootName);
            }
        }
        else {
            location_1 = location_1.replace(location_1.substring(0, location_1.indexOf('\\')), rootName);
        }
        setValue('location', location_1, result.details);
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
    var newObject = createNewItem(data, target, itemName, true);
    parent.fileSystemData.push(newObject);
    parent.pasteNodes.push(newObject.id);
    var copiedItems = filterByParent(parent, data.id);
    for (var i = 0; i < copiedItems.length; i++) {
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
            var args = { action: 'read', result: result };
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
            var args = { fileDetails: parent.droppedObjects };
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
            var args = { action: action, result: result };
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
            var createEventArgs = {
                folderName: itemName,
                path: parent.path,
                parentFolder: parent.itemData
            };
            parent.trigger('folderCreate', createEventArgs);
            var args = { action: 'create', result: result };
            parent.trigger('success', args);
            parent.itemData = [getPathObject(parent)];
            read(parent, createEnd, parent.path);
        }
        else {
            if (result.error.code === '400') {
                if (parent.dialogObj && parent.dialogObj.visible) {
                    var ele = select('#newname', parent.dialogObj.element);
                    var error = getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + ele.value + '"');
                    ele.parentElement.nextElementSibling.innerHTML = error;
                }
                else {
                    var result_2 = {
                        files: null,
                        error: {
                            code: '400',
                            message: getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + itemName + '"'),
                            fileExists: null
                        }
                    };
                    createDialog(parent, 'Error', result_2);
                }
                var args = { action: 'create', error: result.error };
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
            var args = { action: 'rename', result: result };
            parent.trigger('success', args);
            parent.renamedItem = Array.isArray(result.files) ? result.files[0] : result.files;
            var renameEventArgs = {
                newName: parent.renamedItem.name,
                itemData: [parent.renamedItem],
                path: parent.path
            };
            parent.trigger('rename', renameEventArgs);
            if (parent.activeModule === 'navigationpane') {
                var pathObject = getPathObject(parent);
                var pathLevel = parent.pathId[parent.pathId.length - 1].split('_').length - 2;
                parent.pathId.pop();
                parent.itemData = [getValue(parent.pathId[parent.pathId.length - 1], parent.feParent)];
                var renamePath = getTargetPath(parent, parent.renamedItem);
                read(parent, renameEndParent, renamePath);
                if (!isNullOrUndefined(pathObject) && parent.pathNames.length > 1 && pathLevel <= parent.pathNames.length - 1) {
                    parent.pathNames[pathLevel] = parent.renameText;
                    if (!parent.hasId) {
                        parent.setProperties({ path: "/" + parent.pathNames.slice(1).join('/') + "/" }, true);
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
                var ele = select('#rename', parent.dialogObj.element);
                var error = getLocaleText(parent, 'Validation-Rename-Exists').replace('{0}', '"' + parent.currentItemText + '"');
                error = error.replace('{1}', '"' + ele.value + '"');
                ele.parentElement.nextElementSibling.innerHTML = error;
                var args = { action: 'rename', error: result.error };
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
        var moveorcopyEventArgs = {
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
        var deleteEventArgs = {
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
                var args = { action: 'delete', result: result };
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
            var args = { action: 'details', result: result };
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
    var args = { action: action, error: result.error };
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
    var data = {
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
            var args = { action: 'search', result: result };
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
    var downloadUrl = parent.ajaxSettings.downloadUrl ? parent.ajaxSettings.downloadUrl : parent.ajaxSettings.url;
    var data = { 'action': 'download', 'path': path, 'names': items, 'data': parent.itemData };
    var ajaxSettings = {
        url: downloadUrl,
        type: 'POST',
        contentType: 'application/json',
        responseType: 'blob',
        data: JSON.stringify(data),
        onSuccess: null,
        onFailure: null,
        beforeSend: null
    };
    var eventArgs = { data: data, cancel: false, useFormPost: true, ajaxSettings: ajaxSettings };
    parent.trigger('beforeDownload', eventArgs, function (downloadArgs) {
        if (!downloadArgs.cancel) {
            if (downloadArgs.useFormPost) {
                var form = createElement('form', {
                    id: parent.element.id + '_downloadForm',
                    attrs: { action: downloadUrl, method: 'post', name: 'downloadForm', 'download': '' }
                });
                var input = createElement('input', {
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
                    var contentDisposition_1;
                    var fileName_1;
                    var fetch_1 = new Fetch({
                        url: getValue('url', downloadArgs.ajaxSettings),
                        type: getValue('type', downloadArgs.ajaxSettings),
                        contentType: getValue('contentType', downloadArgs.ajaxSettings),
                        responseType: getValue('responseType', downloadArgs.ajaxSettings),
                        beforeSend: getValue('beforeSend', downloadArgs.ajaxSettings),
                        onLoad: function (e) {
                            contentDisposition_1 = e.headers.get('Content-Disposition');
                            if (contentDisposition_1) {
                                var filenameMatch = contentDisposition_1.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                                var extractedFilename = filenameMatch && filenameMatch[1];
                                fileName_1 = extractedFilename ? extractedFilename.replace(/['"]/g, '') : fileName_1;
                            }
                            else {
                                fileName_1 = parent.itemData.length > 1 ? 'files.zip' : getValue('isFile', parent.itemData[0]) ? getValue('name', parent.itemData[0]) : getValue('name', parent.itemData[0]) + '.zip';
                            }
                        },
                        onSuccess: function (e) {
                            parent.trigger('success', downloadArgs);
                            var blob = e;
                            var blobUrl = URL.createObjectURL(blob);
                            var link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = fileName_1;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        },
                        onFailure: function (e) {
                            var result = {
                                error: {
                                    code: e.status.toString(),
                                    message: getLocaleText(parent, 'Network-Error') + ' ' + parent.ajaxSettings.downloadUrl
                                }
                            };
                            createDialog(parent, 'Error', result);
                            parent.trigger('failure', downloadArgs);
                        }
                    });
                    fetch_1.send(JSON.stringify(downloadArgs.data));
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
    var errorResult = {
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
    var options = getOptions(parent, text, e, details);
    if (isNullOrUndefined(parent.dialogObj)) {
        parent.dialogObj = new Dialog({
            beforeOpen: keydownAction.bind(this, parent, options.dialogName),
            beforeClose: function (args) {
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
    var extOptions = getExtOptions(parent, text, replaceItems, newPath);
    parent.isApplySame = false;
    if (isNullOrUndefined(parent.extDialogObj)) {
        parent.extDialogObj = new Dialog({
            beforeOpen: beforeExtOpen.bind(this, parent, extOptions.dialogName),
            beforeClose: function (args) {
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
        parent.extDialogObj.beforeClose = function (args) {
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
    var eventArgs = {
        cancel: args.cancel, popupName: dialogName, popupModule: dlgModule
    };
    parent.trigger('beforePopupOpen', eventArgs, function (eventargs) {
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
    var eventArgs = {
        cancel: args.cancel, popupModule: dlgModule, popupName: dialogName
    };
    parent.trigger('beforePopupClose', eventArgs, function (eventargs) {
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
    var args = { popupModule: dlgModule, element: dlgModule.element, popupName: dialogName };
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
    var args = { popupModule: dlgModule, element: dlgModule.element, popupName: dialogName };
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
    var options = {
        header: '', content: '', buttons: [], dialogName: ''
    };
    var duplicateContent;
    var item;
    var index;
    options.open = function () { triggerPopupOpen(parent, parent.extDialogObj, options.dialogName); };
    options.close = function () { triggerPopupClose(parent, parent.extDialogObj, options.dialogName); };
    switch (text) {
        case 'Extension':
            options.header = getLocaleText(parent, 'Header-Rename-Confirmation');
            options.content = '<div>' + getLocaleText(parent, 'Content-Rename-Confirmation') + '</div>';
            options.buttons = [{
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Yes') },
                    click: function () {
                        parent.extDialogObj.hide();
                        rename(parent, newPath, parent.renameText);
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: function () {
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
            options.close = function () {
                if (!parent.isDropEnd && parent.duplicateItems.length === 0) {
                    var args = { fileDetails: parent.droppedObjects };
                    parent.trigger('fileDropped', args);
                    parent.isDropEnd = parent.isDragDrop = false;
                }
                triggerPopupClose(parent, parent.extDialogObj, options.dialogName);
            };
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Yes') },
                    click: function () {
                        parent.duplicateItems.push(parent.replaceItems[parent.fileLength]);
                        parent.duplicateRecords.push(getDuplicateData(parent, parent.replaceItems[parent.fileLength]));
                        parent.fileLength++;
                        if (replaceItems[parent.fileLength]) {
                            var item_1 = parent.replaceItems[parent.fileLength];
                            var indexval = item_1.lastIndexOf('/');
                            item_1 = indexval === -1 ? item_1 : item_1.substring(indexval);
                            parent.extDialogObj.content = (duplicateContent).replace('{0}', item_1);
                            parent.extDialogObj.show();
                        }
                        else {
                            parent.extDialogObj.hide();
                            var targetPath = parent.isDragDrop ? parent.dragPath : parent.targetPath;
                            var path = parent.isDragDrop ? parent.dropPath : ((parent.folderPath === '') ? parent.path :
                                parent.folderPath);
                            var action = parent.isDragDrop ? 'move' : parent.fileAction;
                            paste(parent, targetPath, parent.duplicateItems, path, action, parent.duplicateItems, parent.duplicateRecords);
                        }
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: function () {
                        parent.fileLength++;
                        if (replaceItems[parent.fileLength]) {
                            var item_2 = parent.replaceItems[parent.fileLength];
                            var ind = item_2.lastIndexOf('/');
                            item_2 = ind === -1 ? item_2 : item_2.substring(ind);
                            parent.extDialogObj.content = (duplicateContent).replace('{0}', item_2);
                            parent.extDialogObj.show();
                        }
                        else {
                            parent.extDialogObj.hide();
                            if (parent.duplicateItems.length !== 0) {
                                var action = parent.isDragDrop ? 'move' : parent.fileAction;
                                var targetPath = parent.isDragDrop ? parent.dragPath : parent.targetPath;
                                var path = parent.isDragDrop ? parent.dropPath : ((parent.folderPath === '') ? parent.path :
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
            options.close = function () {
                parent.isRetryOpened = false;
                retryDlgClose(parent);
                triggerPopupClose(parent, parent.extDialogObj, options.dialogName);
            };
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Keep-Both') },
                    click: function () {
                        retryDlgUpdate(parent, true);
                    }
                },
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Replace') },
                    click: function () {
                        retryDlgUpdate(parent, false);
                    }
                },
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Skip') },
                    click: function () {
                        var count = 0;
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
    var flag = true;
    if (parent.isRetryOpened) {
        parent.isRetryOpened = false;
    }
    else {
        flag = false;
    }
    var ele = select('.e-dlg-checkbox', parent.extDialogObj.element);
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
    var dialogEle = getValue('element', args);
    var container = select('.e-dlg-content', dialogEle);
    var checkContainer = parent.createElement('div', {
        className: 'e-dlg-checkbox'
    });
    var checkbox = parent.createElement('input', {
        id: parent.element.id + '_applyall'
    });
    checkContainer.appendChild(checkbox);
    container.appendChild(checkContainer);
    var checkBoxObj = new CheckBox({
        label: getLocaleText(parent, 'ApplyAll-Label'),
        change: function (args) {
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
    var ele = select('#newname', parent.dialogObj.element);
    ele.focus();
    ele.value = '';
    var len = ele.value.length;
    ele.setSelectionRange(0, len);
}
/**
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
function onFolderDialogOpen(parent) {
    var ele = select('#newname', parent.dialogObj.element);
    if (!ele.parentElement.classList.contains('e-control-wrapper')) {
        createInput(ele, getLocaleText(parent, 'Content-NewFolder'));
    }
    ele.parentElement.nextElementSibling.innerHTML = '';
    ele.oninput = function () {
        onValidate(parent, ele);
    };
    ele.onkeyup = function (e) {
        var code = getKeyCode(e);
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
    var inputEle = select('#rename', parent.dialogObj.element);
    if (!inputEle.parentElement.classList.contains('e-control-wrapper')) {
        createInput(inputEle, getLocaleText(parent, 'Content-Rename'));
    }
    inputEle.parentElement.nextElementSibling.innerHTML = '';
    inputEle.oninput = function () {
        onValidate(parent, inputEle);
    };
    inputEle.onkeyup = function (e) {
        var code = getKeyCode(e);
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
    var txt = '';
    if (parent.isFile && !parent.showFileExtension) {
        var index = parent.currentItemText.lastIndexOf('.');
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
    var options = {
        header: '', content: '', buttons: [], dialogName: ''
    };
    var permission;
    var formattedString;
    var intl;
    var strArr;
    var fileType;
    var location;
    options.open = function () { triggerPopupOpen(parent, parent.dialogObj, options.dialogName); };
    options.close = function () { triggerPopupClose(parent, parent.dialogObj, options.dialogName); };
    text = (details && details.multipleFiles === true) ? 'MultipleFileDetails' : text;
    var index;
    switch (text) {
        case 'NewFolder':
            options.dialogName = 'Create Folder';
            options.header = getLocaleText(parent, 'Header-NewFolder');
            options.content = '<input type="text" value="New folder" id="newname"><div class="e-fe-error"></div>';
            options.buttons = [
                {
                    buttonModel: { isPrimary: true, content: getLocaleText(parent, 'Button-Create') },
                    click: function (e) {
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
                    click: function () {
                        onDeleteSubmit(parent);
                    }
                },
                {
                    buttonModel: { content: getLocaleText(parent, 'Button-No') },
                    click: function () {
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
                    click: function (e) {
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
                    click: function () {
                        parent.dialogObj.hide();
                    }
                }
            ];
            break;
        case 'MultipleFileDetails':
            options.dialogName = 'File Details';
            strArr = parent.itemData.map(function (val) {
                index = val.name.indexOf('.') + 1;
                return (index === 0 && (!val.isFile)) ? 'Folder' : ((index !== 0) ? val.name.substr(index).replace(' ', '') : 'undetermined');
            });
            if (strArr[0] === undefined) {
                strArr = details.name.split(',').map(function (val) {
                    index = val.indexOf('.') + 1;
                    return (index === 0) ? 'Folder' : val.substr(index).replace(' ', '');
                });
            }
            fileType = strArr.every(function (val, i, arr) { return val === arr[0]; }) ?
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
                    click: function (e) {
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
                    click: function () {
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
    var btnElement = selectAll('.e-btn', parent.dialogObj.element);
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
    var btnElement = selectAll('.e-btn', parent.extDialogObj.element);
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
    var _loop_1 = function (btnCount) {
        btnElement[btnCount].onkeydown = function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        };
        btnElement[btnCount].onkeyup = function (e) {
            if (e.keyCode === 13) {
                btnElement[btnCount].click();
            }
        };
    };
    for (var btnCount = 0; btnCount < btnElement.length; btnCount++) {
        _loop_1(btnCount);
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
    parent.dialogObj.beforeClose = function (args) {
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
    var ele = select('#newname', parent.dialogObj.element);
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
    var ele = select('#rename', parent.dialogObj.element);
    onSubmitValidate(parent, ele);
    if (ele.parentElement.nextElementSibling.innerHTML !== '') {
        return;
    }
    var text = ele.value;
    var oIndex = parent.currentItemText.lastIndexOf('.');
    if (parent.isFile && !parent.showFileExtension) {
        var extn = (oIndex === -1) ? '' : parent.currentItemText.substr(oIndex);
        text += extn;
    }
    parent.renameText = text;
    if (parent.currentItemText === text) {
        parent.dialogObj.hide();
        return;
    }
    var newPath = '';
    if (parent.activeModule === 'navigationpane') {
        newPath = getTargetPath(parent, parent.itemData[0]);
    }
    else {
        newPath = parent.path;
    }
    parent.renamedId = getValue('id', parent.itemData[0]);
    if (parent.isFile) {
        var oldExtension = (oIndex === -1) ? '' : parent.currentItemText.substr(oIndex);
        var nIndex = text.lastIndexOf('.');
        var newExtension = (nIndex === -1) ? '' : text.substr(nIndex);
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
    var len = ele.value.length - 1;
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
    var error = getLocaleText(parent, 'Validation-Invalid').replace('{0}', '"' + ele.value + '"');
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
    var code;
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
    var content = createElement('div', { className: 'e-image-wrap' });
    var image = createElement('img', { className: 'e-image', attrs: { src: imageUrl, alt: header } });
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
            close: function () { triggerPopupClose(parent, parent.viewerObj, 'Image Preview'); },
            beforeOpen: function (args) {
                triggerPopupBeforeOpen(parent, parent.viewerObj, args, 'Image Preview');
            },
            beforeClose: function (args) {
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
    setTimeout(function () {
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
    var content = select('.e-dlg-content', parent.viewerObj.element);
    var imgWrap = select('.e-image-wrap', parent.viewerObj.element);
    var cssObj = window.getComputedStyle(content, null);
    var paddingWidth = cssObj ? (2 * parseFloat(cssObj.paddingRight)) : 36;
    var paddingHeight = cssObj ? (2 * parseFloat(cssObj.paddingBottom)) : 20;
    imgWrap.style.width = (content.offsetWidth - paddingWidth) + 'px';
    imgWrap.style.height = (content.offsetHeight - paddingHeight) + 'px';
}

/**
 * LargeIconsView module
 */
var LargeIconsView = /** @class */ (function () {
    /**
     * Constructor for the LargeIcons module.
     *
     * @param {IFileManager} parent - specifies the parent element.
     * @hidden
     */
    function LargeIconsView(parent) {
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
    LargeIconsView.prototype.render = function (args) {
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
            var iconsView = select('#' + this.parent.element.id + LARGEICON_ID, this.parent.element);
            var ul = select('ul', iconsView);
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
                var emptyList = this.element.querySelector('.' + LIST_PARENT);
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
            var activeEle = this.element.querySelectorAll('.' + ACTIVE);
            if (activeEle.length !== 0) {
                this.parent.activeModule = 'largeiconsview';
            }
            for (var i = 0; i < activeEle.length; i++) {
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
    };
    LargeIconsView.prototype.comparer = function (x, y) {
        if (this.parent.sortOrder === 'Descending') {
            var z = x;
            x = y;
            y = z;
        }
        return this.parent.sortComparer(x, y);
    };
    LargeIconsView.prototype.preventImgDrag = function () {
        var i = 0;
        while (i < this.itemList.length) {
            if (this.itemList[i].querySelector('img')) {
                /* istanbul ignore next */
                this.itemList[i].ondragstart = function () { return false; };
            }
            i++;
        }
    };
    LargeIconsView.prototype.createDragObj = function () {
        var _this = this;
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
                    dragStart: function (args) {
                        dragStartHandler(_this.parent, args, _this.dragObj);
                    }
                });
            }
            else if (this.dragObj && !this.parent.allowDragAndDrop) {
                this.dragObj.destroy();
            }
        }
    };
    LargeIconsView.prototype.dragHelper = function (args) {
        var dragTarget = args.sender.target;
        var dragLi = closest(dragTarget, '.e-list-item');
        if (!dragLi) {
            return null;
        }
        if (dragLi && !dragLi.classList.contains('e-active')) {
            this.setFocus(dragLi);
        }
        var activeEle = this.element.querySelectorAll('.' + ACTIVE);
        this.parent.activeElements = [];
        this.parent.dragData = [];
        for (var i = 0; i < activeEle.length; i++) {
            this.parent.dragData.push(this.getItemObject(activeEle[parseInt(i.toString(), 10)]));
            this.parent.activeElements.push(activeEle[i]);
        }
        getModule(this.parent, dragLi);
        this.parent.dragPath = this.parent.path;
        createVirtualDragElement(this.parent);
        return this.parent.virtualDragElement;
    };
    LargeIconsView.prototype.onDropInit = function (args) {
        if (this.parent.targetModule === this.getModuleName()) {
            var dropLi = closest(args.target, '.e-list-item');
            var cwdData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            if (dropLi) {
                var info = this.getItemObject(dropLi);
                this.parent.dropPath = info.isFile ? this.parent.path : getFullPath(this.parent, info, this.parent.path);
                this.parent.dropData = info.isFile ? cwdData : info;
            }
            else {
                this.parent.dropPath = this.parent.path;
                this.parent.dropData = cwdData;
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    LargeIconsView.prototype.getModuleName = function () {
        return 'largeiconsview';
    };
    LargeIconsView.prototype.onItemCreated = function (args) {
        args.item.removeAttribute('aria-level');
        if (!this.parent.showFileExtension && getValue('isFile', args.curData)) {
            var textEle = args.item.querySelector('.' + LIST_TEXT);
            var txt = getValue('name', args.curData);
            var type = getValue('type', args.curData);
            if (txt.indexOf(type) !== -1) {
                textEle.innerHTML = txt.substr(0, txt.length - type.length);
            }
        }
        this.renderCheckbox(args);
        var eventArgs = {
            element: args.item,
            fileDetails: args.curData,
            module: 'LargeIconsView'
        };
        this.parent.trigger('fileLoad', eventArgs);
    };
    LargeIconsView.prototype.renderCheckbox = function (args) {
        if (!this.parent.showItemCheckBoxes) {
            return;
        }
        var checkElement = createCheckBox(createElement, false, {
            checked: false,
            cssClass: 'e-small'
        });
        checkElement.setAttribute('role', 'checkbox');
        checkElement.setAttribute('aria-checked', 'false');
        checkElement.setAttribute('aria-label', 'checkbox');
        args.item.firstElementChild.insertBefore(checkElement, args.item.firstElementChild.childNodes[0]);
    };
    LargeIconsView.prototype.onLayoutChange = function (args) {
        if (this.parent.view === 'LargeIcons') {
            this.destroy();
            if (this.parent.enableVirtualization) {
                this.parent.setProperties({ selectedItems: [] }, true);
            }
            this.render(args);
            /* istanbul ignore next */
            if (getValue('name', args) === 'layout-change' && this.parent.fileAction === 'move' &&
                this.parent.isCut && this.parent.selectedNodes && this.parent.selectedNodes.length !== 0) {
                var indexes = this.getIndexes(this.parent.selectedNodes);
                var length_1 = 0;
                while (length_1 < indexes.length) {
                    addBlur(this.itemList[indexes[length_1]]);
                    length_1++;
                }
            }
            var activeEle = this.element.querySelectorAll('.' + ACTIVE);
            if (activeEle.length !== 0) {
                this.element.focus();
            }
            this.checkItem();
            this.parent.isLayoutChange = false;
        }
        else {
            this.element.setAttribute('tabindex', '-1');
        }
    };
    LargeIconsView.prototype.checkItem = function () {
        var checkEle = this.element.querySelectorAll('.' + ACTIVE);
        if (checkEle) {
            var checkLength = 0;
            while (checkLength < checkEle.length) {
                this.checkState(checkEle[checkLength], true);
                checkLength++;
            }
        }
    };
    LargeIconsView.prototype.renderList = function (args) {
        var i = 0;
        var items = JSON.parse(JSON.stringify(args.files));
        while (i < items.length) {
            var icon = fileType(items[i]);
            var name_1 = getValue('name', items[i]);
            var selected = getItemName(this.parent, items[i]);
            var className = ((this.parent.selectedItems &&
                this.parent.selectedItems.indexOf(selected) !== -1)) ?
                LARGE_ICON + ' e-active' : LARGE_ICON;
            if (!hasEditAccess(items[i])) {
                className += ' ' + getAccessClass(items[i]);
            }
            if (icon === ICON_IMAGE && this.parent.showThumbnail && hasReadAccess(items[i])) {
                var imgUrl = getImageUrl(this.parent, items[i]);
                setValue('_fm_imageUrl', imgUrl, items[i]);
                setValue('_fm_imageAttr', { alt: name_1 }, items[i]);
            }
            else {
                setValue('_fm_icon', icon, items[i]);
            }
            setValue('_fm_htmlAttr', { class: className, title: name_1 }, items[i]);
            i++;
        }
        return items;
    };
    LargeIconsView.prototype.onFinalizeEnd = function (args) {
        this.render(args);
    };
    LargeIconsView.prototype.onCreateEnd = function (args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
        this.clearSelect();
        this.selectItems([getValue(this.parent.hasId ? 'id' : 'name', this.parent.createdItem)]);
        this.parent.createdItem = null;
        this.parent.largeiconsviewModule.element.focus();
        this.parent.activeModule = 'largeiconsview';
    };
    LargeIconsView.prototype.onSelectedData = function () {
        if (this.parent.activeModule === 'largeiconsview') {
            this.updateSelectedData();
        }
    };
    LargeIconsView.prototype.onDeleteInit = function () {
        if (this.parent.activeModule === 'largeiconsview') {
            Delete(this.parent, this.parent.selectedItems, this.parent.path, 'delete');
        }
    };
    /* istanbul ignore next */
    LargeIconsView.prototype.onDeleteEnd = function (args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
        this.parent.setProperties({ selectedItems: [] }, true);
        this.clearSelect();
    };
    LargeIconsView.prototype.onRefreshEnd = function (args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.onLayoutChange(args);
    };
    LargeIconsView.prototype.onRenameInit = function () {
        if (this.parent.activeModule === 'largeiconsview' && this.parent.selectedItems.length === 1) {
            this.updateRenameData();
        }
    };
    LargeIconsView.prototype.onPathChanged = function (args) {
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
    };
    LargeIconsView.prototype.onOpenInit = function (args) {
        if (this.parent.activeModule === 'largeiconsview') {
            this.doOpenAction(args.target);
        }
    };
    LargeIconsView.prototype.onHideLayout = function () {
        if (this.parent.view !== 'LargeIcons' && this.element) {
            this.element.classList.add(DISPLAY_NONE);
        }
    };
    LargeIconsView.prototype.onSelectAllInit = function () {
        if (this.parent.view === 'LargeIcons') {
            this.startItem = this.getFirstItem();
            var lastItem = this.getLastItem();
            var eveArgs = { ctrlKey: true, shiftKey: true };
            this.doSelection(lastItem, eveArgs);
            this.isInteraction = true;
            this.isInteracted = true;
        }
    };
    LargeIconsView.prototype.onClearAllInit = function () {
        if (this.parent.view === 'LargeIcons') {
            this.clearSelection();
            this.isInteraction = true;
            this.isInteracted = true;
        }
    };
    LargeIconsView.prototype.onBeforeRequest = function () {
        this.isRendered = false;
    };
    LargeIconsView.prototype.onAfterRequest = function () {
        this.isRendered = true;
    };
    /* istanbul ignore next */
    LargeIconsView.prototype.onSearch = function (args) {
        if (this.parent.view === 'LargeIcons') {
            this.parent.setProperties({ selectedItems: [] }, true);
            this.parent.notify(selectionChanged, {});
            this.parent.searchedItems = args.files;
            this.onLayoutChange(args);
        }
    };
    LargeIconsView.prototype.onLayoutRefresh = function () {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
    };
    LargeIconsView.prototype.onUpdateSelectionData = function () {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        this.updateSelectedData();
    };
    LargeIconsView.prototype.onPathColumn = function () {
        if (this.parent.view === 'LargeIcons' && !isNullOrUndefined(this.listObj) &&
            this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered
            && this.parent.sortBy === 'filterPath') {
            this.parent.sortBy = 'name';
            this.parent.notify(sortByChange, {});
        }
    };
    LargeIconsView.prototype.removeEventListener = function () {
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
    };
    LargeIconsView.prototype.addEventListener = function () {
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
    };
    LargeIconsView.prototype.onActionFailure = function () { this.isInteraction = true; this.isInteracted = true; };
    LargeIconsView.prototype.onMenuItemData = function (args) {
        if (this.parent.activeModule === this.getModuleName()) {
            var ele = closest(args.target, 'li');
            this.parent.itemData = [this.getItemObject(ele)];
        }
    };
    LargeIconsView.prototype.onDetailsInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            if (this.parent.selectedItems.length !== 0) {
                this.updateSelectedData();
            }
            else {
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
            }
        }
    };
    LargeIconsView.prototype.onpasteInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.itemData = (this.parent.folderPath === '') ? [getPathObject(this.parent)] :
                [this.getItemObject(select('.e-active', this.element))];
        }
    };
    LargeIconsView.prototype.oncutCopyInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            var activeEle = this.element.querySelectorAll('.' + ACTIVE);
            this.parent.activeRecords = [];
            this.parent.activeElements = [];
            for (var i = 0; i < activeEle.length; i++) {
                this.parent.activeElements.push(activeEle[i]);
                this.parent.activeRecords.push(this.getItemObject(activeEle[i]));
            }
        }
    };
    LargeIconsView.prototype.onpasteEnd = function (args) {
        if (this.parent.view === 'LargeIcons') {
            this.isPasteOperation = true;
            if (this.parent.path === this.parent.destinationPath ||
                this.parent.path === getDirectoryPath(this.parent, args) || this.parent.hasId) {
                this.onPathChanged(args);
            }
        }
    };
    LargeIconsView.prototype.onDropPath = function (args) {
        if (this.parent.view === 'LargeIcons') {
            this.isPasteOperation = true;
            this.onPathChanged(args);
        }
    };
    LargeIconsView.prototype.onPropertyChanged = function (e) {
        var currentSelected;
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
    };
    LargeIconsView.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.listObj) {
            this.unWireEvents();
        }
        this.startItem = null;
        this.listElements = null;
    };
    LargeIconsView.prototype.wireEvents = function () {
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
    };
    LargeIconsView.prototype.unWireEvents = function () {
        this.wireClickEvent(false);
        EventHandler.remove(this.element, 'mouseover', this.onMouseOver);
        this.keyboardModule.destroy();
        this.keyboardDownModule.destroy();
    };
    /* istanbul ignore next */
    LargeIconsView.prototype.onMouseOver = function (e) {
        var targetEle = closest(e.target, '.e-list-item');
        removeBlur(this.parent, 'hover');
        if (targetEle !== null) {
            targetEle.classList.add(HOVER);
        }
    };
    LargeIconsView.prototype.wireClickEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            this.clickObj = new Touch(this.element, {
                tap: function (eve) {
                    if (_this.parent.isDevice) {
                        _this.tapCount = eve.tapCount;
                        _this.tapEvent = eve;
                        setTimeout(function () {
                            if (_this.tapCount > 0) {
                                _this.doTapAction(_this.tapEvent);
                            }
                            _this.tapCount = 0;
                        }, 350);
                    }
                    else {
                        if (eve.tapCount === 2 && eve.originalEvent.which !== 3) {
                            _this.dblClickHandler(eve);
                        }
                        else {
                            _this.clickHandler(eve);
                        }
                    }
                },
                tapHold: function (e) {
                    if (_this.parent.isDevice) {
                        _this.multiSelect = _this.parent.allowMultiSelection ? true : false;
                        if (_this.parent.allowMultiSelection) {
                            addClass([_this.parent.element], MULTI_SELECT);
                        }
                        _this.clickHandler(e);
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
    LargeIconsView.prototype.doTapAction = function (eve) {
        var target = eve.originalEvent.target;
        var item = closest(target, '.' + LIST_ITEM);
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
    };
    LargeIconsView.prototype.clickHandler = function (e) {
        var target = e.originalEvent.target;
        removeBlur(this.parent, 'hover');
        this.doSelection(target, e.originalEvent);
        this.parent.activeModule = 'largeiconsview';
    };
    /**
     *
     * @param {Element} target - specifies the target element.
     * @param {TouchEventArgs | MouseEventArgs | KeyboardEventArgs} e - specifies event arguements.
     * @returns {void}
     * @hidden
     */
    LargeIconsView.prototype.doSelection = function (target, e) {
        var ctrlKey = this.parent.isMac ? e.metaKey : e.ctrlKey;
        var isMacRightClick = this.parent.isMac && e.ctrlKey && e.shiftKey;
        var item = closest(target, '.' + LIST_ITEM);
        var cList = target.classList;
        this.parent.isFile = false;
        var action = 'select';
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
            var fileSelectionArgs = this.triggerSelection(action, item);
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
                    var startIndex = this.itemList.indexOf(this.startItem);
                    var endIndex = this.itemList.indexOf(item);
                    if (startIndex > endIndex) {
                        for (var i = startIndex; i >= endIndex; i--) {
                            this.addActive(this.itemList[i]);
                        }
                    }
                    else {
                        for (var i = startIndex; i <= endIndex; i++) {
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
    };
    LargeIconsView.prototype.dblClickHandler = function (e) {
        this.parent.activeModule = 'largeiconsview';
        var target = e.originalEvent.target;
        this.doOpenAction(target);
    };
    LargeIconsView.prototype.clearSelection = function () {
        this.clearSelect();
        this.resetMultiSelect();
        this.parent.notify(selectionChanged, {});
    };
    LargeIconsView.prototype.resetMultiSelect = function () {
        this.multiSelect = false;
        removeClass([this.parent.element], MULTI_SELECT);
    };
    LargeIconsView.prototype.doOpenAction = function (target) {
        var _this = this;
        if (isNullOrUndefined(target)) {
            return;
        }
        var item = closest(target, '.' + LIST_ITEM);
        this.parent.isFile = false;
        if (!isNullOrUndefined(item)) {
            this.updateType(item);
            var details_1 = this.getItemObject(item);
            if (!hasReadAccess(details_1)) {
                createDeniedDialog(this.parent, details_1, permissionRead);
                return;
            }
            var eventArgs = { cancel: false, fileDetails: details_1, module: 'LargeIconsView' };
            this.parent.trigger('fileOpen', eventArgs, function (fileOpenArgs) {
                if (!fileOpenArgs.cancel) {
                    var text = getValue('name', details_1);
                    if (!_this.parent.isFile) {
                        var val = _this.parent.breadcrumbbarModule.searchObj.element.value;
                        if (val === '' && !_this.parent.isFiltered) {
                            var id = getValue('id', details_1);
                            _this.parent.oldPath = _this.parent.path;
                            var newPath = _this.parent.path + (isNullOrUndefined(id) ? text : id) + '/';
                            _this.parent.setProperties({ path: newPath }, true);
                            _this.parent.pathNames.push(text);
                            _this.parent.pathId.push(getValue('_fm_id', details_1));
                            _this.parent.itemData = [details_1];
                            openAction(_this.parent);
                        }
                        else {
                            openSearchFolder(_this.parent, details_1);
                        }
                        _this.parent.isFiltered = false;
                        _this.parent.setProperties({ selectedItems: [] }, true);
                    }
                    else {
                        var icon = fileType(details_1);
                        if (icon === ICON_IMAGE) {
                            var imgUrl = getImageUrl(_this.parent, details_1);
                            createImageDialog(_this.parent, text, imgUrl);
                        }
                    }
                }
            });
        }
    };
    LargeIconsView.prototype.updateType = function (item) {
        var folder = select('.' + FOLDER, item);
        this.parent.isFile = isNullOrUndefined(folder) ? true : false;
    };
    /* istanbul ignore next */
    LargeIconsView.prototype.keydownActionHandler = function (e) {
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
    };
    /* istanbul ignore next */
    LargeIconsView.prototype.keyActionHandler = function (e) {
        var _this = this;
        if (!this.isRendered) {
            return;
        }
        var fItem = this.getFocusedItem();
        var firstItem = this.getFirstItem();
        var lastItem = this.getLastItem();
        switch (e.action) {
            case 'end':
                if (this.parent.enableVirtualization) {
                    this.clearSelect();
                    this.element.firstElementChild.scrollTo(0, this.element.firstElementChild.scrollHeight);
                    setTimeout(function () {
                        _this.navigateItem(_this.itemList[_this.itemList.length - 1]);
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
                    setTimeout(function () {
                        _this.navigateItem(_this.itemList[0]);
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
    };
    LargeIconsView.prototype.doDownload = function () {
        this.updateSelectedData();
        doDownload(this.parent);
    };
    LargeIconsView.prototype.performDelete = function () {
        if (this.parent.selectedItems && this.parent.selectedItems.length > 0) {
            this.updateSelectedData();
            var data = this.parent.itemData;
            for (var i = 0; i < data.length; i++) {
                if (!hasEditAccess(data[i])) {
                    createDeniedDialog(this.parent, data[i], permissionEdit);
                    return;
                }
            }
            createDialog(this.parent, 'Delete');
        }
    };
    LargeIconsView.prototype.performRename = function () {
        if (this.parent.selectedItems.length === 1) {
            this.updateRenameData();
            doRename(this.parent);
        }
    };
    LargeIconsView.prototype.updateRenameData = function () {
        var item = select('.' + LIST_ITEM + '.' + ACTIVE, this.element);
        var data = this.getItemObject(item);
        updateRenamingData(this.parent, data);
    };
    LargeIconsView.prototype.getVisitedItem = function () {
        var item = this.parent.selectedItems[this.parent.selectedItems.length - 1];
        var indexes = this.getIndexes([item], this.parent.hasId);
        return this.itemList[indexes[0]];
    };
    LargeIconsView.prototype.getFocusedItem = function () {
        return select('.' + LIST_ITEM + '.' + FOCUS, this.element);
    };
    LargeIconsView.prototype.getActiveItem = function () {
        return select('.' + LIST_ITEM + '.' + ACTIVE, this.element);
    };
    LargeIconsView.prototype.getFirstItem = function () {
        return this.itemList[0];
    };
    LargeIconsView.prototype.getLastItem = function () {
        return this.itemList[this.itemList.length - 1];
    };
    LargeIconsView.prototype.navigateItem = function (item) {
        this.setFocus(item);
    };
    LargeIconsView.prototype.navigateDown = function (fItem, isTowards) {
        var nItem = this.getNextItem(fItem, isTowards, this.perRow);
        this.setFocus(nItem);
    };
    LargeIconsView.prototype.navigateRight = function (fItem, isTowards) {
        var nItem = this.getNextItem(fItem, isTowards);
        this.setFocus(nItem);
    };
    LargeIconsView.prototype.getNextItem = function (li, isTowards, perRow) {
        if (isNullOrUndefined(li)) {
            return this.getFocusedItem() || this.getActiveItem() || this.getFirstItem();
        }
        var index = this.itemList.indexOf(li);
        var nextItem;
        do {
            if (isTowards) {
                index = perRow ? index + perRow : index + 1;
            }
            else {
                index = perRow ? index - perRow : index - 1;
            }
            nextItem = this.itemList[index];
            if (this.parent.enableVirtualization && isNullOrUndefined(nextItem)) {
                var marginValue = parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-top'), 10) +
                    parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-bottom'), 10);
                var scrollHeight = this.itemList[0].getBoundingClientRect().height + marginValue;
                this.element.firstElementChild.scrollTo(this.element.firstElementChild.scrollTop, this.element.firstElementChild.scrollTop + scrollHeight);
            }
            if (isNullOrUndefined(nextItem)) {
                return li;
            }
        } while (!isVisible(nextItem));
        return nextItem;
    };
    LargeIconsView.prototype.setFocus = function (nextItem) {
        if (!isNullOrUndefined(nextItem)) {
            var fileSelectionArgs = this.triggerSelection('select', nextItem);
            if (fileSelectionArgs.cancel !== true) {
                this.startItem = nextItem;
                this.clearSelect();
                this.addActive(nextItem);
                this.addFocus(nextItem);
                this.parent.notify(selectionChanged, {});
                this.triggerSelect('select', nextItem);
            }
        }
    };
    LargeIconsView.prototype.spaceKey = function (fItem) {
        if (!isNullOrUndefined(fItem) && !fItem.classList.contains(ACTIVE)) {
            var fileSelectionArgs = this.triggerSelection('select', fItem);
            if (fileSelectionArgs.cancel !== true) {
                this.addActive(fItem);
                this.parent.notify(selectionChanged, {});
                this.triggerSelect('select', fItem);
            }
        }
    };
    LargeIconsView.prototype.ctrlAKey = function (firstItem, lastItem) {
        if (this.parent.allowMultiSelection && !isNullOrUndefined(firstItem)) {
            this.startItem = firstItem;
            var eveArgs = { ctrlKey: true, shiftKey: true };
            var liParent = this.element.querySelector('.' + LIST_PARENT);
            var liScrPos = liParent.scrollTop;
            var getCurFocusedItem = this.getFocusedItem();
            this.doSelection(lastItem, eveArgs);
            liParent.scrollTop = liScrPos;
            if (!isNullOrUndefined(getCurFocusedItem)) {
                this.addFocus(getCurFocusedItem);
            }
        }
    };
    LargeIconsView.prototype.csEndKey = function (lastItem, e) {
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
    };
    LargeIconsView.prototype.csHomeKey = function (firstItem, e) {
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
    };
    LargeIconsView.prototype.csDownKey = function (fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateDown(fItem, true);
        }
        else {
            var dItem = this.getNextItem(fItem, true, this.perRow);
            if (!isNullOrUndefined(dItem)) {
                if (e.action === 'ctrlDown') {
                    this.addFocus(dItem);
                }
                else {
                    this.doSelection(dItem, e);
                }
            }
        }
    };
    LargeIconsView.prototype.csLeftKey = function (fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateRight(fItem, false);
        }
        else {
            var lItem = this.getNextItem(fItem, false);
            if (!isNullOrUndefined(lItem)) {
                if (e.action === 'ctrlLeft') {
                    this.addFocus(lItem);
                }
                else {
                    this.doSelection(lItem, e);
                }
            }
        }
    };
    LargeIconsView.prototype.csRightKey = function (fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateRight(fItem, true);
        }
        else {
            var rItem = this.getNextItem(fItem, true);
            if (!isNullOrUndefined(rItem)) {
                if (e.action === 'ctrlRight') {
                    this.addFocus(rItem);
                }
                else {
                    this.doSelection(rItem, e);
                }
            }
        }
    };
    LargeIconsView.prototype.csUpKey = function (fItem, e) {
        if (!this.parent.allowMultiSelection) {
            this.navigateDown(fItem, false);
        }
        else {
            var uItem = this.getNextItem(fItem, false, this.perRow);
            if (!isNullOrUndefined(uItem)) {
                if (e.action === 'ctrlUp') {
                    this.addFocus(uItem);
                }
                else {
                    this.doSelection(uItem, e);
                }
            }
        }
    };
    LargeIconsView.prototype.addActive = function (nextItem) {
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
    };
    LargeIconsView.prototype.removeActive = function (preItem) {
        if (!isNullOrUndefined(preItem)) {
            removeClass([preItem], [ACTIVE]);
            if (this.parent.allowMultiSelection) {
                preItem.setAttribute('aria-selected', 'false');
            }
            else {
                preItem.removeAttribute('aria-selected');
            }
            this.checkState(preItem, false);
            var index = this.parent.selectedItems.indexOf(this.getDataName(preItem));
            if (index > -1) {
                this.parent.selectedItems.splice(index, 1);
                this.parent.setProperties({ selectedItems: this.parent.selectedItems }, true);
            }
            this.parent.visitedItem = null;
        }
    };
    LargeIconsView.prototype.getDataName = function (item) {
        var data = this.getItemObject(item);
        return getItemName(this.parent, data);
    };
    LargeIconsView.prototype.addFocus = function (item) {
        this.element.setAttribute('tabindex', '-1');
        var fItem = this.getFocusedItem();
        if (fItem) {
            fItem.removeAttribute('tabindex');
            removeClass([fItem], [FOCUS]);
        }
        addClass([item], [FOCUS]);
        item.setAttribute('tabindex', '0');
        item.focus();
    };
    LargeIconsView.prototype.checkState = function (item, toCheck) {
        if (!this.parent.showItemCheckBoxes) {
            return;
        }
        var checkEle = select('.' + FRAME, item);
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
    };
    LargeIconsView.prototype.clearSelect = function () {
        var eles = Array.prototype.slice.call(selectAll('.' + ACTIVE, this.listElements));
        var fileSelectionArgs;
        if (eles.length !== 0) {
            fileSelectionArgs = this.triggerSelection('unselect', eles[0]);
            if (fileSelectionArgs.cancel !== true) {
                for (var i = 0, len = eles.length; i < len; i++) {
                    this.removeActive(eles[i]);
                }
            }
            this.triggerSelect('unselect', eles[0]);
        }
    };
    LargeIconsView.prototype.resizeHandler = function () {
        this.getItemCount();
    };
    LargeIconsView.prototype.splitterResizeHandler = function () {
        this.getItemCount();
    };
    LargeIconsView.prototype.getItemCount = function () {
        var perRow = 1;
        if (this.itemList) {
            for (var i = 0, len = this.itemList.length - 1; i < len; i++) {
                if (this.itemList[i].getBoundingClientRect().top === this.itemList[i + 1].getBoundingClientRect().top) {
                    perRow++;
                }
                else {
                    break;
                }
            }
        }
        this.perRow = perRow;
    };
    LargeIconsView.prototype.triggerSelection = function (action, item) {
        var data = [];
        if (this.isSelectAllCalled) {
            for (var i = 0, len = this.itemList.length; i < len; i++) {
                data[i] = this.getItemObject(this.itemList[i]);
            }
        }
        else {
            data[0] = this.getItemObject(item);
        }
        var eventArgs = { action: action, fileDetails: data.length > 1
                ? data : data[0], isInteracted: this.isInteraction, cancel: false, target: this.isSelectAllCalled ? null
                : item
        };
        this.parent.trigger('fileSelection', eventArgs);
        this.isInteraction = true;
        return eventArgs;
    };
    LargeIconsView.prototype.triggerSelect = function (action, item) {
        var data = [];
        if (this.isSelectAllCalled) {
            for (var i = 0, len = this.itemList.length; i < len; i++) {
                data[i] = this.getItemObject(this.itemList[i]);
            }
            this.isSelectAllCalled = false;
        }
        else {
            data[0] = this.getItemObject(item);
        }
        this.parent.visitedData = data.length > 1 ? data[data.length - 1] : data[0];
        var eventArgs = { action: action, fileDetails: data.length > 1
                ? data
                : data[0], isInteracted: this.isInteracted };
        this.parent.trigger('fileSelect', eventArgs);
        this.isInteracted = true;
    };
    LargeIconsView.prototype.selectItems = function (items) {
        var indexes = this.getIndexes(items, this.parent.hasId);
        for (var j = 0, len = indexes.length; j < len; j++) {
            var eveArgs = { ctrlKey: true, shiftKey: false };
            this.doSelection(this.itemList[indexes[j]], eveArgs);
        }
    };
    LargeIconsView.prototype.getIndexes = function (items, byId) {
        var indexes = [];
        var filter = byId ? 'id' : 'name';
        for (var i = 0, len = this.items.length; i < len; i++) {
            if (items.indexOf(getValue(filter, this.items[i])) !== -1) {
                indexes.push(i);
            }
        }
        return indexes;
    };
    LargeIconsView.prototype.getItemObject = function (item) {
        var index = this.itemList.indexOf(item);
        return this.items[index];
    };
    LargeIconsView.prototype.addSelection = function (data) {
        var resultData = [];
        if (this.parent.hasId) {
            resultData = new DataManager(this.items).
                executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
        }
        else {
            var newData = new DataManager(this.items).
                executeLocal(new Query().where('name', 'equal', getValue('name', data), false));
            if (newData.length > 0) {
                resultData = new DataManager(newData).
                    executeLocal(new Query().where('filterPath', 'equal', this.parent.filterPath, false));
            }
        }
        if (resultData.length > 0) {
            var index = this.items.indexOf(resultData[0]);
            var eveArgs = { ctrlKey: true, shiftKey: false };
            this.doSelection(this.itemList[index], eveArgs);
        }
    };
    LargeIconsView.prototype.updateSelectedData = function () {
        var data = [];
        var items = selectAll('.' + LIST_ITEM + '.' + ACTIVE, this.element);
        for (var i = 0; i < items.length; i++) {
            data[i] = this.getItemObject(items[i]);
        }
        this.parent.itemData = data;
    };
    LargeIconsView.prototype.onMethodCall = function (args) {
        if (this.parent.view !== 'LargeIcons') {
            return;
        }
        var action = getValue('action', args);
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
    };
    LargeIconsView.prototype.getItemsIndex = function (items) {
        var indexes = [];
        var isFilter = (this.parent.breadcrumbbarModule.searchObj.element.value !== '' || this.parent.isFiltered) ? true : false;
        var filterName = this.parent.hasId ? 'id' : 'name';
        if (this.parent.hasId || !isFilter) {
            for (var i = 0, len = this.items.length; i < len; i++) {
                if (items.indexOf(getValue(filterName, this.items[i])) !== -1) {
                    indexes.push(i);
                }
            }
        }
        else {
            for (var i = 0, len = this.items.length; i < len; i++) {
                var name_2 = getValue('filterPath', this.items[i]) + getValue('name', this.items[i]);
                if ((items.indexOf(name_2) !== -1) || (items.indexOf(getValue(filterName, this.items[i])) !== -1)) {
                    indexes.push(i);
                }
            }
        }
        return indexes;
    };
    LargeIconsView.prototype.deleteFiles = function (ids) {
        this.parent.activeModule = 'largeiconsview';
        if (isNullOrUndefined(ids)) {
            this.performDelete();
            return;
        }
        var indexes = this.getItemsIndex(ids);
        if (indexes.length === 0) {
            return;
        }
        var data = [];
        var newIds = [];
        for (var i = 0; i < indexes.length; i++) {
            data[i] = this.items[indexes[i]];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDeleteFiles(this.parent, data, newIds);
    };
    LargeIconsView.prototype.downloadFiles = function (ids) {
        if (isNullOrUndefined(ids)) {
            this.doDownload();
            return;
        }
        var index = this.getItemsIndex(ids);
        if (index.length === 0) {
            return;
        }
        var data = [];
        var newIds = [];
        for (var i = 0; i < index.length; i++) {
            data[i] = this.items[index[i]];
            newIds[i] = getItemName(this.parent, data[i]);
        }
        doDownloadFiles(this.parent, data, newIds);
    };
    LargeIconsView.prototype.openFile = function (id) {
        if (isNullOrUndefined(id)) {
            return;
        }
        var indexes = this.getItemsIndex([id]);
        if (indexes.length > 0) {
            this.doOpenAction(this.itemList[indexes[0]]);
        }
    };
    LargeIconsView.prototype.renameFile = function (id, name) {
        this.parent.activeModule = 'largeiconsview';
        if (isNullOrUndefined(id)) {
            this.performRename();
            return;
        }
        var indexes = this.getItemsIndex([id]);
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
    };
    return LargeIconsView;
}());

/**
 * BreadCrumbBar module
 */
var BreadCrumbBar = /** @class */ (function () {
    /**
     * constructor for addressbar module
     *
     * @hidden
     * @param {IFileManager} parent - specifies parent element.
     * @private
     *
     */
    function BreadCrumbBar(parent) {
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
    BreadCrumbBar.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var value = e.newProp.searchSettings;
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
    };
    BreadCrumbBar.prototype.render = function () {
        this.addEventListener();
    };
    BreadCrumbBar.prototype.onPathChange = function () {
        var pathNames = this.parent.pathNames;
        var paths = this.parent.path.split('/');
        var addressbarUL = this.parent.createElement('ul', { className: 'e-addressbar-ul' });
        var addressbarLI = null;
        var pathNamesLen = pathNames.length;
        if (pathNames.length > 0) {
            var id = '';
            for (var i = 0; i < pathNamesLen; i++) {
                var addressATag = null;
                addressbarLI = this.parent.createElement('li', { className: 'e-address-list-item' });
                for (var j = 0; j <= i; j++) {
                    id = id + paths[j] + '/';
                }
                addressbarLI.setAttribute('data-utext', id);
                if (i !== 0) {
                    var icon = createElement('span', { className: ICONS });
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
            var ulElement = this.parent.breadCrumbBarNavigation.querySelector('.e-addressbar-ul');
            if (!isNullOrUndefined(ulElement)) {
                if (!isNullOrUndefined(this.subMenuObj)) {
                    this.subMenuObj.destroy();
                }
                remove(ulElement);
            }
            var searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
            if (!searchWrap) {
                this.parent.breadCrumbBarNavigation.insertBefore(addressbarUL, searchWrap);
            }
            else {
                this.parent.breadCrumbBarNavigation.appendChild(addressbarUL);
            }
            this.updateBreadCrumbBar(addressbarUL);
        }
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.updateBreadCrumbBar = function (addresBarUL) {
        var liElements = addresBarUL.querySelectorAll('li');
        var ulElement = this.parent.breadCrumbBarNavigation.querySelector('.e-addressbar-ul');
        var style = window.getComputedStyle(ulElement, null);
        var pRight = parseFloat(style.getPropertyValue('padding-right'));
        var pLeft = parseFloat(style.getPropertyValue('padding-left'));
        var breadCrumbBarWidth = ulElement.offsetWidth - pRight - pLeft;
        var addressbarUL = this.parent.createElement('ul', { className: 'e-addressbar-ul' });
        var liElementsWidth = 0;
        var liElementsWidths = [];
        for (var i = 0; i < liElements.length; i++) {
            var width = liElements[i].clientWidth;
            liElementsWidths.push(width);
            liElementsWidth = liElementsWidth + width;
        }
        if (!isNullOrUndefined(ulElement)) {
            remove(ulElement);
        }
        var searchContainer = this.parent.createElement('div');
        searchContainer.setAttribute('class', 'e-search-wrap');
        var id = this.parent.element.id + SEARCH_ID;
        var searchInput = createElement('input', { id: id,
            attrs: { autocomplete: 'off', 'aria-label': getLocaleText(this.parent, 'Search') } });
        searchContainer.appendChild(searchInput);
        var searchEle = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap .e-input');
        if (isNullOrUndefined(searchEle)) {
            this.parent.breadCrumbBarNavigation.appendChild(searchContainer);
            var span = createElement('span', { className: 'e-icons e-fe-search' });
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
            var search = this.searchObj.element.nextElementSibling;
            EventHandler.add(search, 'mousedown', this.searchChangeHandler.bind(this), this);
            EventHandler.add(this.searchObj.element, 'keyup', this.onKeyUp.bind(this), this);
        }
        var searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
        breadCrumbBarWidth = breadCrumbBarWidth - (this.searchWrapWidth ? this.searchWrapWidth : searchWrap.offsetWidth);
        if (liElementsWidth > breadCrumbBarWidth) {
            var i = liElements.length;
            while (i--) {
                var diff = breadCrumbBarWidth - liElementsWidths[i];
                if (diff > 40) {
                    addressbarUL.insertBefore(liElements[i], addressbarUL.querySelector('li'));
                    breadCrumbBarWidth = diff;
                }
                else {
                    var items = [];
                    for (var j = 0; j <= i; j++) {
                        var liElement = liElements[j];
                        items.push({
                            text: liElement.innerText,
                            utext: liElement.getAttribute('data-utext')
                        });
                    }
                    var subMenuLi = this.parent.createElement('li', { className: 'e-breadcrumb-menu' });
                    var attributes = { className: 'e-breadcrumb-submenu' };
                    var subMenuSpan = this.parent.createElement('button', attributes);
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
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onFocus = function () {
        var wrap = closest(this.searchObj.element, '.e-search-wrap');
        wrap.classList.add('e-focus');
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onKeyUp = function () {
        this.parent.notify(pathColumn, { args: this.parent });
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onBlur = function () {
        var wrap = closest(this.searchObj.element, '.e-search-wrap');
        wrap.classList.remove('e-focus');
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.subMenuSelectOperations = function (event) {
        var args = { target: event.element };
        this.addressPathClickHandler(args);
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.addSubMenuAttributes = function (args) {
        args.element.setAttribute('data-utext', getValue('utext', args.item));
        var anchor = this.parent.createElement('a', { className: 'e-list-text' });
        args.element.appendChild(anchor);
    };
    BreadCrumbBar.prototype.searchEventBind = function (allow) {
        if (allow) {
            this.searchObj.input = this.searchChangeHandler.bind(this);
            this.searchObj.change = null;
        }
        else {
            this.searchObj.change = this.searchChangeHandler.bind(this);
            this.searchObj.input = null;
        }
    };
    BreadCrumbBar.prototype.searchChangeHandler = function (args) {
        var _this = this;
        if (!isNullOrUndefined(args.value)) {
            this.parent.isFiltered = false;
            if (this.parent.searchSettings.allowSearchOnTyping) {
                window.clearTimeout(this.searchTimer);
                this.searchTimer = window.setTimeout(function () { searchWordHandler(_this.parent, args.value, false); }, 300);
            }
            else {
                searchWordHandler(this.parent, args.value, false);
            }
        }
    };
    BreadCrumbBar.prototype.addressPathClickHandler = function (e) {
        var li = e.target;
        if (li.nodeName === 'LI' || li.nodeName === 'A') {
            var node = li.nodeName === 'LI' ? li.children[0] : li;
            if (!isNullOrUndefined(node)) {
                this.parent.isFiltered = false;
                var currentPath = this.updatePath(node);
                this.parent.itemData = [getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent)];
                this.triggerFileOpen(this.parent.itemData[0]);
                read(this.parent, pathChanged, currentPath);
                var treeNodeId = this.parent.pathId[this.parent.pathId.length - 1];
                this.parent.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
            }
        }
    };
    BreadCrumbBar.prototype.triggerFileOpen = function (data) {
        var eventArgs = { cancel: false, fileDetails: data, module: 'BreadCrumbBar' };
        delete eventArgs.cancel;
        this.parent.trigger('fileOpen', eventArgs);
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onShowInput = function () {
        if (this.parent.isMobile) {
            if (this.parent.element.classList.contains(FILTER)) {
                removeClass([this.parent.element], FILTER);
                this.searchWrapWidth = null;
            }
            else {
                var searchWrap = this.parent.breadCrumbBarNavigation.querySelector('.e-search-wrap');
                this.searchWrapWidth = searchWrap.offsetWidth;
                addClass([this.parent.element], FILTER);
                this.searchObj.element.focus();
            }
        }
    };
    BreadCrumbBar.prototype.updatePath = function (list) {
        var li = closest(list, 'li');
        var liElementId = li.getAttribute('data-utext');
        this.addressBarLink = liElementId;
        var link = this.addressBarLink.split('/');
        var ids = this.parent.pathId;
        var names = this.parent.pathNames;
        this.parent.pathId = [];
        this.parent.pathNames = [];
        var newpath = '';
        for (var i = 0, len = link.length - 1; i < len; i++) {
            this.parent.pathId.push(ids[i]);
            this.parent.pathNames.push(names[i]);
            newpath += link[i] + '/';
        }
        this.parent.setProperties({ path: newpath }, true);
        return newpath;
    };
    BreadCrumbBar.prototype.onUpdatePath = function () {
        this.onPathChange();
        this.removeSearchValue();
    };
    BreadCrumbBar.prototype.onCreateEnd = function () {
        this.onPathChange();
    };
    BreadCrumbBar.prototype.onRenameEnd = function () {
        this.onPathChange();
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onDeleteEnd = function () {
        this.onUpdatePath();
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.removeSearchValue = function () {
        this.parent.isFiltered = false;
        if (this.searchObj && (this.searchObj.value !== '' || this.searchObj.element.value !== '')) {
            this.searchObj.value = '';
            this.searchObj.element.value = '';
            this.searchObj.dataBind();
        }
    };
    BreadCrumbBar.prototype.onResize = function () {
        this.onPathChange();
    };
    BreadCrumbBar.prototype.onPasteEnd = function () {
        this.onPathChange();
    };
    BreadCrumbBar.prototype.addEventListener = function () {
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
    };
    BreadCrumbBar.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'enter':
                this.addressPathClickHandler(e);
                break;
        }
    };
    BreadCrumbBar.prototype.removeEventListener = function () {
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
    };
    /* istanbul ignore next */
    BreadCrumbBar.prototype.onDropInit = function (args) {
        if (this.parent.targetModule === this.getModuleName()) {
            var liEle = args.target.closest('li');
            this.parent.dropPath = this.updatePath((liEle.children[0]));
            this.parent.dropData = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feParent);
            this.triggerFileOpen(this.parent.dropData);
            var treeNodeId = this.parent.pathId[this.parent.pathId.length - 1];
            this.parent.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name
     * @private
     */
    BreadCrumbBar.prototype.getModuleName = function () {
        return 'breadcrumbbar';
    };
    BreadCrumbBar.prototype.destroy = function () {
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
    };
    BreadCrumbBar.prototype.onSearchTextChange = function (args) {
        this.searchObj.element.placeholder = (this.parent.searchSettings.placeholder != null) ? this.parent.searchSettings.placeholder : getLocaleText(this.parent, 'Search') + ' ' + getLocaleText(this.parent, args.cwd.name.toString());
    };
    return BreadCrumbBar;
}());

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
    };
    /* istanbul ignore next */
    ContextMenu.prototype.onBeforeItemRender = function (args) {
        if (args.item.id === this.getMenuId('largeiconsview')) {
            var iconSpan = createElement('span');
            var element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'LargeIcons' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', ICON_LARGE + ' ' + MENU_ICON);
        }
        if (args.item.id === this.getMenuId('detailsview')) {
            var iconSpan = createElement('span');
            var element = args.element;
            element.insertBefore(iconSpan, this.parent.view === 'Details' ? element.childNodes[1] : element.childNodes[0]);
            iconSpan.setAttribute('class', ICON_GRID + ' ' + MENU_ICON);
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
            target = this.parent.navigationpaneModule.activeNode.getElementsByClassName(FULLROW)[0];
            this.menuTarget = this.targetNodeElement = target;
        }
        this.targetElement = this.parent.view === 'Details' ? closest(target, 'tr.e-row') : target;
        if (this.parent.enableVirtualization && (target.classList.contains('e-virtual-bottom') || target.classList.contains('e-virtualtable'))) {
            target = target.parentElement.closest('div');
        }
        var view = this.getTargetView(target);
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
                var eveArgs = { ctrlKey: true, shiftKey: true };
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
        if (target.classList.contains(MENU_ITEM) ||
            target.classList.contains(MENU_ICON) || target.classList.contains(SUBMENU_ICON)) {
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
        this.parent.activeModule = closest(this.menuTarget, '#' + this.parent.element.id + TREE_ID) ?
            'navigationpane' : closest(this.menuTarget, '#' + this.parent.element.id + GRID_ID) ?
            'detailsview' : closest(this.menuTarget, '#' + this.parent.element.id + LARGEICON_ID) ?
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
        return target.classList.contains(TREE_VIEW) ?
            'TreeView' : target.classList.contains(GRID_VIEW) ?
            'GridView' : target.classList.contains(ICON_VIEW) ?
            'LargeIcon' : target.classList.contains(LARGE_ICONS) ?
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
            if (!isNullOrUndefined(selectedTreeNode) &&
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
            (closest(target, '#' + this.parent.element.id + LARGEICON_ID).getElementsByClassName(EMPTY).length !== 0))
            || (this.parent.view === 'Details' &&
                (closest(target, '#' + this.parent.element.id + GRID_ID).getElementsByClassName(EMPTY).length !== 0)))) {
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
        if (!isNullOrUndefined(this.currentElement)) {
            if (!isNullOrUndefined(select('#' + this.getMenuId(nameEle), this.currentElement))) {
                return 1;
            }
            else if (!isNullOrUndefined(select('#' + nameEle, this.currentElement))) {
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
            this.parent.notify(menuItemData, args);
            return this.parent.itemData[0];
        }
    };
    /* istanbul ignore next */
    ContextMenu.prototype.onSelect = function (args) {
        var _this = this;
        if (isNullOrUndefined(args.item) || !args.item.id) {
            return;
        }
        var itemText = args.item.id.substr((this.parent.element.id + '_cm_').length);
        var details;
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
                                createDeniedDialog(_this.parent, details[j], permissionEdit);
                                return;
                            }
                        }
                        createDialog(_this.parent, 'Delete');
                        break;
                    /* istanbul ignore next */
                    case 'download':
                        for (var i = 0; i < details.length; i++) {
                            if (!hasDownloadAccess(details[i])) {
                                createDeniedDialog(_this.parent, details[i], permissionDownload);
                                return;
                            }
                        }
                        if (_this.parent.activeModule === 'navigationpane') {
                            _this.parent.notify(downloadInit, {});
                        }
                        else if (_this.parent.selectedItems.length > 0) {
                            Download(_this.parent, _this.parent.path, _this.parent.selectedItems);
                        }
                        break;
                    case 'rename':
                        if (!hasEditAccess(details[0])) {
                            createDeniedDialog(_this.parent, details[0], permissionEdit);
                        }
                        else {
                            _this.parent.notify(renameInit, {});
                            createDialog(_this.parent, 'Rename');
                        }
                        break;
                    case 'selectall':
                        /* istanbul ignore next */
                        _this.parent.notify(selectAllInit, {});
                        break;
                    case 'refresh':
                        refresh(_this.parent);
                        break;
                    case 'open':
                        if (_this.parent.visitedItem && _this.parent.activeModule !== 'navigationpane') {
                            _this.parent.notify(openInit, { target: _this.parent.visitedItem });
                        }
                        else if (_this.parent.activeModule === 'navigationpane') {
                            if (_this.parent.visitedItem) {
                                _this.parent.notify(openInit, { target: _this.parent.visitedItem });
                            }
                            _this.parent.navigationpaneModule.openFileOnContextMenuClick(closest(_this.targetNodeElement, 'li'));
                        }
                        break;
                    case 'details':
                        _this.parent.notify(detailsInit, {});
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
                    this.contextMenu.cssClass = getCssClass(this.parent, ROOT_POPUP);
                    break;
            }
        }
    };
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.keyboardModule = new KeyboardEvents(this.contextMenu.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    ContextMenu.prototype.removeEventListener = function () {
        this.parent.off(destroy, this.destroy);
        this.parent.off(modelChanged, this.onPropertyChanged);
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
    };
    ContextMenu.prototype.getMenuId = function (id) {
        return this.parent.element.id + '_cm_' + id.split(' ').join('').toLowerCase();
    };
    return ContextMenu;
}());

/**
 * Specifies the default locale of FileManager component
 */
var defaultLocale = {
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

var __extends$8 = (undefined && undefined.__extends) || (function () {
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
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var FileManager = /** @class */ (function (_super) {
    __extends$8(FileManager, _super);
    function FileManager(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.filterData = null;
        _this.selectedNodes = [];
        _this.duplicateItems = [];
        _this.duplicateRecords = [];
        _this.previousPath = [];
        _this.nextPath = [];
        _this.existingFileCount = 0;
        _this.isLayoutChange = false;
        _this.layoutSelectedItems = [];
        _this.renamedId = null;
        _this.uploadItem = [];
        _this.deleteRecords = [];
        _this.isFile = false;
        _this.isCut = false;
        _this.isSearchCut = false;
        _this.isSearchDrag = false;
        _this.isPasteError = false;
        _this.folderPath = '';
        _this.isSameAction = false;
        _this.isFiltered = false;
        // Specifies whether the sort by option is clicked or not.
        _this.isSortByClicked = false;
        _this.enablePaste = false;
        _this.persistData = false;
        _this.retryArgs = [];
        _this.isOpened = false;
        _this.isRetryOpened = false;
        _this.isPathDrag = false;
        _this.searchedItems = [];
        _this.retryFiles = [];
        _this.isApplySame = false;
        _this.dragData = [];
        _this.dragNodes = [];
        _this.dragPath = '';
        _this.dropPath = '';
        _this.isDragDrop = false;
        _this.treeExpandTimer = null;
        _this.dragCursorPosition = { left: 44, top: 18 };
        _this.isDropEnd = false;
        _this.dragCount = 0;
        _this.droppedObjects = [];
        _this.uploadingCount = 0;
        _this.uploadedCount = 0;
        //Specifies whether the operating system is MAC or not
        _this.isMac = false;
        _this.dragSelectedItems = [];
        _this.onScrollHandler = function () {
            if (!isNullOrUndefined(_this.contextmenuModule) && !isNullOrUndefined(_this.contextmenuModule.contextMenu)) {
                _this.contextmenuModule.contextMenu.close();
            }
        };
        FileManager_1.Inject(BreadCrumbBar, LargeIconsView, ContextMenu);
        return _this;
    }
    FileManager_1 = FileManager;
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    FileManager.prototype.getModuleName = function () {
        return 'filemanager';
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    FileManager.prototype.preRender = function () {
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
        var ele = closest(this.element, '.e-bigger');
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
    };
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string} - returns the persisted data.
     * @hidden
     */
    FileManager.prototype.getPersistData = function () {
        var keyEntity = ['view', 'path', 'selectedItems'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    FileManager.prototype.requiredModules = function () {
        var modules = [];
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
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    FileManager.prototype.render = function () {
        this.initialize();
        var slItems = isNullOrUndefined(this.selectedItems) ? [] :
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
            var bar = select('.' + SPLIT_BAR, this.element);
            bar.classList.add(DISPLAY_NONE);
        }
        this.wireEvents();
        this.renderComplete();
    };
    FileManager.prototype.ensurePath = function () {
        var currentPath = this.path;
        if (isNullOrUndefined(currentPath)) {
            currentPath = '/';
        }
        if (currentPath.lastIndexOf('/') !== (currentPath.length - 1)) {
            currentPath = currentPath + '/';
        }
        this.originalPath = currentPath;
        var paths = currentPath.split('/');
        this.setProperties({ path: paths[0] + '/' }, true);
        this.pathNames = [];
        this.pathId = ['fe_tree'];
        this.itemData = [];
    };
    FileManager.prototype.initialize = function () {
        if (this.isMobile) {
            addClass([this.element], MOBILE);
        }
        if (this.allowMultiSelection) {
            addClass([this.element], CHECK_SELECT);
        }
        this.addCssClass(null, this.cssClass);
        this.renderFileUpload();
    };
    FileManager.prototype.addWrapper = function () {
        var headerWrap = this.createElement('div', { id: this.element.id + TOOLBAR_ID });
        this.element.appendChild(headerWrap);
        var layoutWrap = this.createElement('div', {
            id: this.element.id + LAYOUT_ID, className: LAYOUT
        });
        this.element.appendChild(layoutWrap);
        var navigationWrap = this.createElement('div', {
            id: this.element.id + NAVIGATION_ID, className: NAVIGATION
        });
        var treeWrap = this.createElement('div', {
            id: this.element.id + TREE_ID
        });
        navigationWrap.appendChild(treeWrap);
        var contentWrap = this.createElement('div', {
            id: this.element.id + CONTENT_ID, className: LAYOUT_CONTENT
        });
        this.breadCrumbBarNavigation = this.createElement('div', {
            id: this.element.id + BREADCRUMBBAR_ID,
            className: BREADCRUMBS
        });
        contentWrap.appendChild(this.breadCrumbBarNavigation);
        var gridWrap = this.createElement('div', {
            id: this.element.id + GRID_ID
        });
        contentWrap.appendChild(gridWrap);
        var largeiconWrap = this.createElement('div', {
            id: this.element.id + LARGEICON_ID,
            className: LARGE_ICONS, attrs: { 'role': 'group' }
        });
        contentWrap.appendChild(largeiconWrap);
        var overlay = this.createElement('span', { className: OVERLAY });
        contentWrap.appendChild(overlay);
        var paneSettings;
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
        var dialogWrap = this.createElement('div', { id: this.element.id + DIALOG_ID });
        this.element.appendChild(dialogWrap);
        var menuWrap = this.createElement('ul', { id: this.element.id + CONTEXT_MENU_ID });
        this.element.appendChild(menuWrap);
        var dialogImgWrap = this.createElement('div', { id: this.element.id + IMG_DIALOG_ID });
        this.element.appendChild(dialogImgWrap);
        var extnDialogWrap = this.createElement('div', { id: this.element.id + EXTN_DIALOG_ID });
        this.element.appendChild(extnDialogWrap);
        var uploadDialogWrap = this.createElement('div', { id: this.element.id + UPLOAD_DIALOG_ID });
        this.element.appendChild(uploadDialogWrap);
    };
    FileManager.prototype.adjustHeight = function () {
        var toolbar = select('#' + this.element.id + TOOLBAR_ID, this.element);
        var toolBarHeight = toolbar ? toolbar.offsetHeight : 0;
        if (this.splitterObj) {
            this.splitterObj.height = (this.element.clientHeight - toolBarHeight).toString();
            this.splitterObj.dataBind();
        }
    };
    /* istanbul ignore next */
    FileManager.prototype.splitterResize = function () {
        this.notify(splitterResize, {});
    };
    FileManager.prototype.splitterAdjust = function () {
        var bar = select('.' + SPLIT_BAR, this.element);
        if (this.navigationPaneSettings.visible) {
            this.splitterObj.expand(this.enableRtl ? 1 : 0);
            bar.classList.remove(DISPLAY_NONE);
        }
        else {
            this.splitterObj.collapse(this.enableRtl ? 1 : 0);
            bar.classList.add(DISPLAY_NONE);
        }
    };
    FileManager.prototype.addCssClass = function (oldOne, newOne) {
        if (!isNullOrUndefined(oldOne) && oldOne !== '') {
            removeClass([this.element], oldOne.split(' '));
        }
        if (!isNullOrUndefined(newOne) && newOne !== '') {
            addClass([this.element], newOne.split(' '));
        }
    };
    FileManager.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    FileManager.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    FileManager.prototype.onContextMenu = function (e) {
        e.preventDefault();
    };
    FileManager.prototype.checkMobile = function () {
        return (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(Browser.userAgent.toLowerCase())
            && /mobile/i.test(Browser.userAgent.toLowerCase()));
    };
    FileManager.prototype.renderFileUpload = function () {
        var id = this.element.id + UPLOAD_ID;
        var uploadEle = this.createElement('input', { id: id, attrs: { name: 'uploadFiles', type: 'file' } });
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
    };
    FileManager.prototype.renderUploadBox = function () {
        var uploadUrl = this.ajaxSettings.uploadUrl ? this.ajaxSettings.uploadUrl : this.ajaxSettings.url;
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
    };
    FileManager.prototype.onFileListRender = function (args) {
        this.trigger('uploadListCreate', args);
    };
    FileManager.prototype.updateUploader = function () {
        this.uploadObj.autoUpload = this.uploadSettings.autoUpload;
        this.uploadObj.minFileSize = this.uploadSettings.minFileSize;
        this.uploadObj.maxFileSize = this.uploadSettings.maxFileSize;
        this.uploadObj.allowedExtensions = this.uploadSettings.allowedExtensions;
        this.uploadObj.directoryUpload = this.uploadSettings.directoryUpload;
        this.uploadObj.dataBind();
    };
    FileManager.prototype.onBeforeOpen = function (args) {
        var eventArgs = {
            cancel: args.cancel, popupName: 'Upload', popupModule: this.uploadDialogObj
        };
        this.trigger('beforePopupOpen', eventArgs, function (eventargs) {
            args.cancel = eventargs.cancel;
        });
    };
    FileManager.prototype.onBeforeClose = function (args) {
        var eventArgs = {
            cancel: args.cancel, popupName: 'Upload', popupModule: this.uploadDialogObj
        };
        this.trigger('beforePopupClose', eventArgs, function (eventargs) {
            args.cancel = eventargs.cancel;
        });
    };
    FileManager.prototype.onOpen = function () {
        this.isOpened = true;
        this.uploadDialogObj.element.focus();
        var args = {
            popupModule: this.uploadDialogObj, popupName: 'Upload',
            element: this.uploadDialogObj.element
        };
        this.trigger('popupOpen', args);
    };
    FileManager.prototype.onClose = function () {
        this.isOpened = false;
        this.uploadObj.clearAll();
        var args = {
            popupModule: this.uploadDialogObj, popupName: 'Upload',
            element: this.uploadDialogObj.element
        };
        this.trigger('popupClose', args);
    };
    /* istanbul ignore next */
    FileManager.prototype.onChunkUploading = function (args) {
        var action = 'save';
        if ((this.retryArgs.length !== 0)) {
            for (var i = 0; i < this.retryArgs.length; i++) {
                if (args.fileData.name === this.retryArgs[i].file.name) {
                    action = this.retryArgs[i].action;
                }
            }
        }
        var data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'size': args.fileData.size }, { 'action': action }, { 'data': data }, { 'filename': args.fileData.name }];
    };
    /* istanbul ignore next */
    FileManager.prototype.onUploading = function (args) {
        var action = 'save';
        if ((this.retryArgs.length !== 0)) {
            for (var i = 0; i < this.retryArgs.length; i++) {
                if (args.fileData.name === this.retryArgs[i].file.name) {
                    action = this.retryArgs[i].action;
                    if (this.uploadSettings.chunkSize === 0) {
                        this.retryArgs.splice(i, 1);
                        i = this.retryArgs.length;
                    }
                }
            }
        }
        var data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'size': args.fileData.size }, { 'action': action }, { 'data': data }, { 'filename': args.fileData.name }];
        var uploadUrl = this.ajaxSettings.uploadUrl ? this.ajaxSettings.uploadUrl : this.ajaxSettings.url;
        var ajaxSettings = {
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
        this.trigger('beforeSend', this.uploadEventArgs, function (uploadEventArgs) {
            args.customFormData = JSON.parse(getValue('data', uploadEventArgs.ajaxSettings));
            args.cancel = uploadEventArgs.cancel;
            var eventArgs = {
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
    };
    FileManager.prototype.onRemoving = function () {
        this.onFileUploadSuccess({ count: 1 });
        if (this.uploadObj.getFilesData().length === 1) {
            this.uploadDialogObj.hide();
        }
    };
    /* istanbul ignore next */
    FileManager.prototype.onCancel = function (args) {
        var data = JSON.stringify(getValue(this.pathId[this.pathId.length - 1], this.feParent));
        args.customFormData = [{ 'path': this.path }, { 'action': 'remove' }, { 'data': data }];
    };
    /* istanbul ignore next */
    FileManager.prototype.onClearing = function () {
        if (this.isOpened) {
            this.uploadDialogObj.hide();
        }
    };
    /* istanbul ignore next */
    FileManager.prototype.onSelected = function (args) {
        if (args.filesData.length === 0) {
            return;
        }
        this.uploadingCount = args.filesData.length;
        this.uploadedCount = 0;
        var details = getPathObject(this);
        if (!hasUploadAccess(details)) {
            args.cancel = true;
            createDeniedDialog(this, details, permissionUpload);
            return;
        }
        this.uploadDialogObj.show();
    };
    FileManager.prototype.onFileUploadSuccess = function (args) {
        this.uploadedCount = this.uploadedCount + args.count;
        if (this.uploadSettings.autoClose && (this.uploadingCount === this.uploadedCount)) {
            this.uploadDialogObj.hide();
        }
    };
    FileManager.prototype.onChunkUploadComplete = function (files) {
        if ((this.retryArgs.length !== 0)) {
            for (var i = 0; i < this.retryArgs.length; i++) {
                var uploadFile = !isNullOrUndefined(files) ? getValue('file', files).name : '';
                if (uploadFile === this.retryArgs[i].file.name) {
                    this.retryArgs.splice(i, 1);
                    i = this.retryArgs.length;
                }
            }
        }
    };
    /* istanbul ignore next */
    FileManager.prototype.onUploadSuccess = function (files) {
        if (this.uploadSettings.chunkSize > 0) {
            this.onChunkUploadComplete(files);
        }
        var args = { action: 'Upload', result: files };
        this.trigger('success', args);
        this.itemData = [getValue(this.pathId[this.pathId.length - 1], this.feParent)];
        read(this, pathChanged, this.path);
        this.onFileUploadSuccess({ count: 1 });
        if (typeof getValue('onSuccess', this.uploadEventArgs.ajaxSettings) === 'function') {
            getValue('onSuccess', this.uploadEventArgs.ajaxSettings)();
        }
    };
    /* istanbul ignore next */
    FileManager.prototype.onUploadFailure = function (files) {
        if (this.uploadSettings.chunkSize > 0) {
            this.onChunkUploadComplete(files);
        }
        var response = getValue('response', files);
        var statusText = getValue('statusText', response);
        if (statusText !== '') {
            setValue('statusText', statusText, files);
        }
        var args = { action: 'Upload', error: files };
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
    };
    FileManager.prototype.onInitialEnd = function () {
        setNextPath(this, this.path);
    };
    FileManager.prototype.addEventListeners = function () {
        this.on(beforeRequest, this.showSpinner, this);
        this.on(afterRequest, this.hideSpinner, this);
        this.on(initialEnd, this.onInitialEnd, this);
        this.on(detailsInit, this.onDetailsInit, this);
        this.on(skipUpload, this.onFileUploadSuccess, this);
        EventHandler.add(this.element, 'contextmenu', this.onContextMenu, this);
    };
    FileManager.prototype.removeEventListeners = function () {
        if (this.isDestroyed) {
            return;
        }
        this.off(beforeRequest, this.showSpinner);
        this.off(afterRequest, this.hideSpinner);
        this.off(initialEnd, this.onInitialEnd);
        this.off(detailsInit, this.onDetailsInit);
        this.off(skipUpload, this.onFileUploadSuccess);
        EventHandler.remove(this.element, 'contextmenu', this.onContextMenu);
    };
    FileManager.prototype.onDetailsInit = function () {
        if (isNullOrUndefined(this.activeModule)) {
            this.itemData = [getValue(this.pathId[this.pathId.length - 1], this.feParent)];
        }
    };
    FileManager.prototype.resizeHandler = function () {
        this.adjustHeight();
        this.notify(resizeEnd, {});
    };
    FileManager.prototype.keyActionHandler = function (e) {
        var uploadEle;
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
    };
    FileManager.prototype.wireSelectOnDragEvent = function (isBind) {
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
    };
    FileManager.prototype.wireEvents = function () {
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
    };
    FileManager.prototype.unWireEvents = function () {
        this.wireSelectOnDragEvent(false);
        EventHandler.remove(window, 'resize', this.resizeHandler);
        if (this.contextMenuSettings.visible) {
            this.element.removeEventListener('scroll', this.onScrollHandler, true);
        }
        this.keyboardModule.destroy();
    };
    FileManager.prototype.onDragStart = function (event) {
        if (this.viewElem) {
            if (this.allowDragAndDrop) {
                var targetElement = closest(event.target, this.viewElem.classList.contains('e-large-icons') ? '.e-list-item' : '.e-fe-text');
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
    };
    FileManager.prototype.onDrag = function (event) {
        event.stopPropagation();
        if (this.dragSelectElement) {
            var diffX = event.pageX - this.dragX;
            var diffY = event.pageY - this.dragY;
            setStyleAttribute(this.dragSelectElement, {
                'left': diffX < 0 ? this.dragX + diffX + 'px' : this.dragX + 'px', 'top': diffY < 0 ? this.dragY + diffY + 'px' : this.dragY + 'px',
                'height': Math.abs(diffY) + 'px', 'width': Math.abs(diffX) + 'px'
            });
            this.selectItems();
        }
        else {
            EventHandler.remove(this.viewElem, 'mousemove', this.onDrag);
        }
    };
    FileManager.prototype.onDragStop = function () {
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
    };
    FileManager.prototype.selectItems = function () {
        var dragRect = this.dragSelectElement.getBoundingClientRect();
        if (dragRect.height > 0 && dragRect.width > 0) {
            this.dragSelectedItems = [];
            removeClass(selectAll('.e-active', this.viewElem), ['e-active', 'e-focus']);
            removeClass(selectAll('.e-check', this.viewElem), ['e-check']);
        }
        var allItems = selectAll(this.viewElem.classList.contains('e-large-icons') ? '.e-list-item' : '.e-row', this.viewElem);
        for (var _i = 0, allItems_1 = allItems; _i < allItems_1.length; _i++) {
            var item = allItems_1[_i];
            var itemRect = item.getBoundingClientRect();
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
    };
    FileManager.prototype.onLayoutChange = function () {
        if (this.enableRangeSelection) {
            this.unWireEvents();
            this.wireEvents();
        }
    };
    FileManager.prototype.setPath = function () {
        this.setProperties({ selectedItems: [] }, true);
        this.ensurePath();
        this.notify(clearPathInit, { selectedNode: this.pathId[0] });
        read(this, (this.path !== this.originalPath) ? initialEnd : finalizeEnd, this.path);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FileManager} newProp
     * @param  {FileManager} oldProp
     * @returns void
     * @private
     */
    /* istanbul ignore next */
    FileManager.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        var height;
        var requiresRefresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
                        var columns = this.detailsViewSettings.columns;
                        var isValidSortField = !isNullOrUndefined(columns) &&
                            columns.findIndex(function (col) { return col.field === _this.sortBy; }) !== -1;
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
    };
    /* istanbul ignore next */
    FileManager.prototype.ajaxSettingSetModel = function (newProp) {
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
        _super.prototype.refresh.call(this);
    };
    /* istanbul ignore next */
    FileManager.prototype.localeSetModelOption = function (newProp) {
        this.uploadObj.locale = newProp.locale;
        _super.prototype.refresh.call(this);
    };
    /**
     * Triggers when the component is destroyed.
     *
     * @returns {void}
     */
    FileManager.prototype.destroy = function () {
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
        _super.prototype.destroy.call(this);
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
    };
    /**
     * Creates a new folder in file manager.
     *
     * @param {string} name – Specifies the name of new folder in current path.
     * If it is not specified, then the default new folder dialog will be opened.
     * @returns {void}
     */
    FileManager.prototype.createFolder = function (name) {
        this.notify(methodCall, { action: 'createFolder' });
        var details = [getPathObject(this)];
        this.itemData = details;
        if (name) {
            if (/[/\\|*?"<>:]/.test(name)) {
                var result = {
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
    };
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
    FileManager.prototype.deleteFiles = function (ids) {
        this.notify(methodCall, { action: 'deleteFiles', ids: ids });
    };
    /**
     * Disables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    FileManager.prototype.disableToolbarItems = function (items) {
        if (!isNullOrUndefined(items) && this.toolbarModule) {
            this.toolbarModule.enableItems(items, false);
        }
    };
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
    FileManager.prototype.downloadFiles = function (ids) {
        this.notify(methodCall, { action: 'downloadFiles', ids: ids });
    };
    /**
     * Enables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be enabled.
     * @returns {void}
     */
    FileManager.prototype.enableToolbarItems = function (items) {
        if (!isNullOrUndefined(items) && this.toolbarModule) {
            this.toolbarModule.enableItems(items, true);
        }
    };
    /**
     * Enables the specified menu items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be enabled.
     * @returns {void}
     */
    FileManager.prototype.enableMenuItems = function (items) {
        if (!isNullOrUndefined(items) && !isNullOrUndefined(this.contextmenuModule) && !isNullOrUndefined(this.contextmenuModule.contextMenu)) {
            this.contextmenuModule.enableItems(items, true, true);
        }
    };
    /**
     * Disables the specified context menu items in file manager. This method is used only in the menuOpen event.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    FileManager.prototype.disableMenuItems = function (items) {
        if (!isNullOrUndefined(items) && !isNullOrUndefined(this.contextmenuModule) && !isNullOrUndefined(this.contextmenuModule.contextMenu)) {
            this.contextmenuModule.disableItem(items);
        }
    };
    /**
     * Returns the index position of given current context menu item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns menu item index.
     */
    FileManager.prototype.getMenuItemIndex = function (item) {
        if (this.contextmenuModule) {
            return this.contextmenuModule.getItemIndex(item);
        }
        else {
            return -1;
        }
    };
    /**
     * Returns the index position of given toolbar item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns toolbar item index.
     */
    FileManager.prototype.getToolbarItemIndex = function (item) {
        if (this.toolbarModule) {
            return this.toolbarModule.getItemIndex(item);
        }
        else {
            return -1;
        }
    };
    /**
     * Display the custom filtering files in file manager.
     *
     * @param {Object} filterData - Specifies the custom filter details along with custom file action name,
     * which needs to be sent to the server side. If you do not specify the details, then default action name will be `filter`.
     *
     * @returns {void}
     */
    FileManager.prototype.filterFiles = function (filterData) {
        this.filterData = filterData ? filterData : null;
        this.setProperties({ selectedItems: [] }, true);
        this.notify(selectionChanged, {});
        this.isFiltered = true;
        if (this.breadcrumbbarModule.searchObj.element.value !== '') {
            this.breadcrumbbarModule.searchObj.element.value = '';
        }
        filter(this, filterEnd);
    };
    /**
     * Gets the details of the selected files in the file manager.
     *
     * @returns {Object[]} - returns selected files.
     */
    FileManager.prototype.getSelectedFiles = function () {
        this.notify(updateSelectionData, {});
        return this.itemData;
    };
    /**
     * Opens the corresponding file or folder from the given unique identifier.
     *
     * @param {string} id - Specifies the name of folder or file in current path. If you want to open the nested level folder or
     * file, then specify the filter path along with name of the folder or file when performing search or custom filtering. For ID based
     * file provider, specify the unique identifier of folder or file.
     *
     * @returns {void}
     */
    FileManager.prototype.openFile = function (id) {
        this.notify(methodCall, { action: 'openFile', id: id });
    };
    /**
     * Refreshes the folder files of the file manager.
     *
     * @returns {void}
     */
    FileManager.prototype.refreshFiles = function () {
        refresh(this);
    };
    /**
     * Refreshes the layout of the file manager.
     *
     * @returns {void}
     */
    FileManager.prototype.refreshLayout = function () {
        this.adjustHeight();
        this.notify(layoutRefresh, {});
    };
    /**
     * Selects the entire folders and files in current path.
     *
     * @returns {void}
     */
    FileManager.prototype.selectAll = function () {
        this.notify(methodCall, { action: 'selectAll' });
    };
    /**
     * Specifies the method that must be invoked to traverse the path backwards in the file manager.
     *
     * @returns {void}
     */
    FileManager.prototype.traverseBackward = function () {
        if (this.pathNames.length > 1 && this.breadcrumbbarModule.searchObj.element.value === '' && !this.isFiltered) {
            this.pathId.pop();
            this.pathNames.pop();
            var newPath = this.pathNames.slice(1).join('/');
            newPath = newPath === '' ? '/' : '/' + newPath + '/';
            this.setProperties({ path: newPath }, true);
            read(this, pathChanged, this.path);
            var treeNodeId = this.pathId[this.pathId.length - 1];
            this.notify(updateTreeSelection, { module: 'treeview', selectedNode: treeNodeId });
        }
    };
    /**
     * Deselects the currently selected folders and files in current path.
     *
     * @returns {void}
     */
    FileManager.prototype.clearSelection = function () {
        this.notify(methodCall, { action: 'clearSelection' });
    };
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
    FileManager.prototype.renameFile = function (id, name) {
        this.notify(methodCall, { action: 'renameFile', id: id, newName: name });
    };
    /**
     * Opens the upload dialog in file manager.
     *
     * @returns {void}
     */
    FileManager.prototype.uploadFiles = function () {
        var details = [getPathObject(this)];
        this.itemData = details;
        uploadItem(this);
    };
    /**
     * Specifies the method which must be invoked to programmatically close the dialog popup in the file manager.
     *
     * @returns {void}
     */
    FileManager.prototype.closeDialog = function () {
        closePopup(this);
    };
    /**
     * Specifies the direction of FileManager
     *
     * @param {boolean} rtl - specifies rtl parameter.
     * @returns {void}
     */
    FileManager.prototype.setRtl = function (rtl) {
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
    };
    var FileManager_1;
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
    return FileManager;
}(Component));

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Toolbar module
 */
var Toolbar = /** @class */ (function () {
    /**
     * Constructor for the Toolbar module
     *
     * @hidden
     * @param {IFileManager} parent - specifies the parent element.
     * @private
     */
    function Toolbar(parent) {
        this.default = ['Delete', 'Rename', 'Download', 'Cut', 'Copy', 'Paste'];
        this.single = ['Delete', 'Rename', 'Download', 'Cut', 'Copy'];
        this.multiple = ['Delete', 'Download', 'Cut', 'Copy', 'Refresh'];
        this.selection = ['NewFolder', 'Upload', 'SortBy', 'Refresh'];
        this.parent = parent;
        this.render();
        this.addEventListener();
    }
    Toolbar.prototype.render = function () {
        var _this = this;
        this.items = this.toolbarItemData(this.getItems(this.parent.toolbarSettings.items.map(function (item) { return item.trim(); })));
        var eventArgs = { items: this.items };
        this.parent.trigger('toolbarCreate', eventArgs, function (toolbarCreateArgs) {
            _this.items = toolbarCreateArgs.items;
            _this.toolbarObj = new Toolbar$1({
                items: _this.items,
                created: _this.toolbarCreateHandler.bind(_this),
                overflowMode: 'Popup',
                clicked: _this.onClicked.bind(_this),
                enableHtmlSanitizer: _this.parent.enableHtmlSanitizer,
                enableRtl: _this.parent.enableRtl
            });
            _this.toolbarObj.isStringTemplate = true;
            _this.toolbarObj.root = _this.parent.root ? _this.parent.root : _this.parent;
            _this.toolbarObj.appendTo('#' + _this.parent.element.id + TOOLBAR_ID);
        });
    };
    Toolbar.prototype.getItemIndex = function (item) {
        var itemId = this.getId(item);
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === itemId) {
                return i;
            }
        }
        return -1;
    };
    Toolbar.prototype.getItems = function (items) {
        var currItems = items.slice();
        if (this.parent.isDevice && this.parent.allowMultiSelection) {
            currItems.push('SelectAll');
        }
        if (this.parent.toolbarItems.length > 0) {
            currItems = this.parent.toolbarItems.map(function (item) { return item.name; });
        }
        return currItems;
    };
    /* istanbul ignore next */
    Toolbar.prototype.onClicked = function (args) {
        var _this = this;
        if (isNullOrUndefined(args.item) || !args.item.id) {
            return;
        }
        var tool = args.item.id.substr((this.parent.element.id + '_tb_').length);
        var details;
        if (tool === 'refresh' || tool === 'newfolder' || tool === 'upload') {
            details = [getPathObject(this.parent)];
            this.parent.itemData = details;
        }
        else {
            this.parent.notify(selectedData, {});
            details = this.parent.itemData;
        }
        var eventArgs = { cancel: false, fileDetails: details, item: args.item };
        this.parent.trigger('toolbarClick', eventArgs, function (toolbarClickArgs) {
            var sItems;
            var target;
            if (!toolbarClickArgs.cancel) {
                switch (tool) {
                    case 'sortby':
                        target = closest(args.originalEvent.target, '.' + TB_ITEM);
                        if (target && target.classList.contains('e-toolbar-popup')) {
                            args.cancel = true;
                        }
                        break;
                    case 'newfolder':
                        createNewFolder(_this.parent);
                        break;
                    case 'cut':
                        cutFiles(_this.parent);
                        break;
                    case 'copy':
                        copyFiles(_this.parent);
                        break;
                    case 'delete':
                        for (var i = 0; i < details.length; i++) {
                            if (!hasEditAccess(details[i])) {
                                createDeniedDialog(_this.parent, details[i], permissionEdit);
                                return;
                            }
                        }
                        createDialog(_this.parent, 'Delete');
                        break;
                    case 'details':
                        _this.parent.notify(detailsInit, {});
                        sItems = _this.parent.selectedItems;
                        if (_this.parent.activeModule === 'navigationpane') {
                            sItems = [];
                        }
                        GetDetails(_this.parent, sItems, _this.parent.path, 'details');
                        break;
                    case 'paste':
                        _this.parent.folderPath = '';
                        pasteHandler(_this.parent);
                        break;
                    case 'refresh':
                        refresh(_this.parent);
                        break;
                    case 'download':
                        doDownload(_this.parent);
                        break;
                    case 'rename':
                        if (!hasEditAccess(details[0])) {
                            createDeniedDialog(_this.parent, details[0], permissionEdit);
                        }
                        else {
                            _this.parent.notify(renameInit, {});
                            createDialog(_this.parent, 'Rename');
                        }
                        break;
                    case 'upload':
                        uploadItem(_this.parent);
                        break;
                    case 'selectall':
                        _this.parent.notify(selectAllInit, {});
                        break;
                    case 'selection':
                        _this.parent.notify(clearAllInit, {});
                        break;
                }
            }
        });
    };
    Toolbar.prototype.toolbarCreateHandler = function () {
        var _this = this;
        if (!isNullOrUndefined(select('#' + this.getId('SortBy'), this.parent.element))) {
            var items = [
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
            var gridSpan_1 = '<span class="' + ICON_GRID + ' ' + MENU_ICON + '"></span>';
            var largeIconSpan_1 = '<span class="' + ICON_LARGE + ' ' + MENU_ICON + '"></span>';
            var layoutItems = [
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
                beforeItemRender: function (args) {
                    var tickIcon = args.item.iconCss;
                    var viewText = args.item.text === getLocaleText(_this.parent, 'View-LargeIcons');
                    var iconClass = tickIcon ? ' e-menu-icon ' + tickIcon : '';
                    args.element.innerHTML = '<span class="' + iconClass + '"></span>' + (viewText ? largeIconSpan_1 : gridSpan_1) + args.item.text;
                    var span = args.element.firstChild;
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
        var btnElement = selectAll('.e-btn', this.toolbarObj.element);
        var _loop_1 = function (btnCount) {
            /* istanbul ignore next */
            btnElement[btnCount].onkeydown = function (e) {
                if (e.keyCode === 13 && !e.target.classList.contains('e-fe-popup')) {
                    e.preventDefault();
                }
            };
            btnElement[btnCount].onkeyup = function (e) {
                if (e.keyCode === 13 && !e.target.classList.contains('e-fe-popup')) {
                    btnElement[btnCount].click();
                }
            };
        };
        for (var btnCount = 0; btnCount < btnElement.length; btnCount++) {
            _loop_1(btnCount);
        }
        this.parent.refreshLayout();
    };
    Toolbar.prototype.updateSortByButton = function () {
        if (this.buttonObj) {
            var items = this.buttonObj.items;
            for (var itemCount = 0; itemCount < items.length; itemCount++) {
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
    };
    Toolbar.prototype.getPupupId = function (id) {
        return this.parent.element.id + '_ddl_' + id.toLowerCase();
    };
    Toolbar.prototype.layoutChange = function (args) {
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
    };
    Toolbar.prototype.toolbarItemData = function (data) {
        var items = [];
        var mode = 'Both';
        if (this.parent.isMobile) {
            mode = 'Overflow';
        }
        for (var i = 0; i < data.length; i++) {
            var item = void 0;
            var propItem = void 0;
            if (this.parent.toolbarItems.length > 0) {
                propItem = this.getItemModel(this.parent.toolbarItems[parseInt(i.toString(), 10)]);
            }
            var itemId = this.getId(data[i]);
            var itemText = getLocaleText(this.parent, data[i]);
            var itemTooltip = getLocaleText(this.parent, 'Tooltip-' + data[i]);
            switch (data[i]) {
                case '|':
                    item = { type: 'Separator' };
                    break;
                case 'Upload':
                    item = { id: itemId, text: itemText, tooltipText: itemTooltip, prefixIcon: ICON_UPLOAD, showTextOn: mode };
                    break;
                case 'SortBy': {
                    var spanElement = '<span class="e-tbar-btn-text e-tbar-ddb-text">' + itemText + '</span>';
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
                    var viewText = void 0;
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
                var mergedItems = Object.assign({}, item, propItem);
                items.push(mergedItems);
            }
            else {
                items.push(item);
            }
        }
        return items;
    };
    Toolbar.prototype.getItemModel = function (propItem) {
        var item = {};
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
    };
    Toolbar.prototype.getId = function (id) {
        return this.parent.element.id + '_tb_' + id.toLowerCase();
    };
    Toolbar.prototype.addEventListener = function () {
        this.parent.on(modelChanged, this.onPropertyChanged, this);
        this.parent.on(selectionChanged, this.onSelectionChanged, this);
        this.parent.on(layoutChange, this.onLayoutChange, this);
        this.parent.on(showPaste, this.showPaste, this);
        this.parent.on(hidePaste, this.hidePaste, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(sortByChange, this.updateSortByButton, this);
    };
    Toolbar.prototype.reRenderToolbar = function (e) {
        var _this = this;
        var itemsToProcess = [];
        if (this.parent.toolbarItems.length > 0) {
            itemsToProcess = this.parent.toolbarItems.map(function (item) {
                return item.name;
            });
        }
        else if (e.newProp.toolbarSettings.items !== undefined) {
            itemsToProcess = e.newProp.toolbarSettings.items.map(function (item) {
                return item.trim();
            });
        }
        if (itemsToProcess.length > 0) {
            this.items = this.toolbarItemData(this.getItems(itemsToProcess));
            var eventArgs = { items: this.items };
            this.parent.trigger('toolbarCreate', eventArgs, function (toolbarCreateArgs) {
                if (_this.buttonObj) {
                    _this.buttonObj.destroy();
                }
                if (_this.layoutBtnObj) {
                    _this.layoutBtnObj.destroy();
                }
                _this.items = toolbarCreateArgs.items;
                _this.toolbarObj.items = _this.items;
                _this.toolbarObj.dataBind();
                _this.toolbarCreateHandler();
            });
        }
    };
    Toolbar.prototype.onSelectionChanged = function () {
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
        var ele = select('#' + this.getId('Selection'), this.toolbarObj.element);
        if (this.parent.selectedItems.length > 0 && ele && !this.parent.enableVirtualization) {
            var txt = void 0;
            if (this.parent.selectedItems.length === 1) {
                txt = this.parent.selectedItems.length + ' ' + getLocaleText(this.parent, 'Item-Selection');
            }
            else {
                txt = this.parent.selectedItems.length + ' ' + getLocaleText(this.parent, 'Items-Selection');
            }
            select('.e-tbar-btn-text', ele).textContent = txt;
            this.toolbarObj.hideItem(ele.parentElement, false);
        }
    };
    Toolbar.prototype.hideItems = function (tools, toHide) {
        for (var i = 0; i < tools.length; i++) {
            var ele = select('#' + this.getId(tools[i]), this.parent.element);
            if (ele) {
                this.toolbarObj.hideItem(ele.parentElement, toHide);
            }
        }
    };
    Toolbar.prototype.hideStatus = function () {
        var ele = select('#' + this.getId('Selection'), this.toolbarObj.element);
        if (ele) {
            this.toolbarObj.hideItem(ele.parentElement, true);
        }
    };
    Toolbar.prototype.showPaste = function () {
        this.hideItems(['Paste'], false);
    };
    Toolbar.prototype.hidePaste = function () {
        this.hideItems(['Paste'], true);
    };
    Toolbar.prototype.onLayoutChange = function () {
        if (this.layoutBtnObj) {
            this.layoutBtnObj.iconCss = this.parent.view === 'Details' ? ICON_GRID : ICON_LARGE;
            var items = this.layoutBtnObj.items;
            for (var itemCount = 0; itemCount < items.length; itemCount++) {
                if (items[itemCount].id === this.getPupupId('large')) {
                    items[itemCount].iconCss = this.parent.view === 'LargeIcons' ? TB_OPTION_TICK : '';
                }
                else if (items[itemCount].id === this.getPupupId('details')) {
                    items[itemCount].iconCss = this.parent.view === 'Details' ? TB_OPTION_TICK : '';
                }
            }
        }
    };
    Toolbar.prototype.removeEventListener = function () {
        this.parent.off(modelChanged, this.onPropertyChanged);
        this.parent.off(selectionChanged, this.onSelectionChanged);
        this.parent.off(layoutChange, this.onLayoutChange);
        this.parent.off(showPaste, this.showPaste);
        this.parent.off(hidePaste, this.hidePaste);
        this.parent.off(destroy, this.destroy);
        this.parent.off(sortByChange, this.updateSortByButton);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    Toolbar.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
    };
    Toolbar.prototype.destroy = function () {
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
    };
    Toolbar.prototype.enableItems = function (items, isEnable) {
        for (var i = 0; i < items.length; i++) {
            var ele = select('#' + this.getId(items[i]), this.parent.element);
            if (ele) {
                this.toolbarObj.enableItems(ele.parentElement, isEnable);
            }
        }
    };
    return Toolbar;
}());

var Virtualization = /** @class */ (function () {
    function Virtualization(instance) {
        this.filemanagerInstance = instance;
        this.largeIconInstance = instance.largeiconsviewModule;
    }
    /**
     * Sets up UI virtualization for the large icon view.
     *
     * @returns {void}
     */
    Virtualization.prototype.setUIVirtualization = function () {
        // Get the current view data source
        var currentViewItems = this.largeIconInstance.items;
        // Get the first item in the data source
        var firstItem = currentViewItems.slice(0, 1);
        // Create a list element from the first item in the data source
        var listElements = ListBase.createListFromJson(createElement, firstItem, this.largeIconInstance.listObj);
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
    };
    /**
     * Sets the height of the top and bottom elements that are used for virtualization.
     * These elements are used to give the appearance of an infinitely scrolling list.
     *
     * @returns {void}
     */
    Virtualization.prototype.setUlElementHeight = function () {
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
        var marginValue = parseInt(window.getComputedStyle(this.largeIconInstance.itemList[0]).getPropertyValue('margin-top'), 10) +
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
    };
    /**
     * Calculates the number of items to display in the list based on the available width and height.
     *
     * @param {number} dataSourceLength The length of the data source.
     * @returns {number} The number of items to display.
     */
    Virtualization.prototype.getItemCount = function (dataSourceLength) {
        // Get the margin values for list items
        var widthMargin = parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-right'), 10) +
            parseInt(window.getComputedStyle(this.itemList[0]).getPropertyValue('margin-left'), 10);
        // Calculate the number of items that can fit in a single row
        this.rowItemCount =
            Math.floor(parseFloat(formatUnit(this.largeIconInstance.element.firstElementChild.clientWidth)) /
                (this.itemList[0].offsetWidth + widthMargin));
        // Calculate the number of items that can fit in the available height
        var itemCount = this.rowItemCount *
            (Math.round(parseFloat(formatUnit(this.largeIconInstance.element.clientHeight)) / this.itemList[0].offsetHeight));
        // If the calculated item count is greater than the data source length, set the item count to the data source length
        if (itemCount > dataSourceLength || itemCount === 0) {
            itemCount = dataSourceLength;
        }
        return itemCount;
    };
    /**
     * Wires or un wires the scroll event for the list element.
     *
     * @param {boolean} destroy - Set `true` to unwire the scroll event.
     * @returns {void}
     */
    Virtualization.prototype.wireScrollEvent = function (destroy) {
        if (!destroy) {
            // Wire the scroll event
            EventHandler.add(this.largeIconInstance.element.firstElementChild, 'scroll', this.onVirtualUiScroll, this);
        }
        else {
            // Unwire the scroll event
            EventHandler.remove(this.largeIconInstance.element.firstElementChild, 'scroll', this.onVirtualUiScroll);
        }
    };
    /**
     * Handles the scroll event for the list element.
     * This method updates the top and bottom elements and the displayed items based on the scroll position.
     *
     * @returns {void}
     * @private
     */
    Virtualization.prototype.onVirtualUiScroll = function () {
        var _a;
        // Set the starting height to 0
        var startingHeight = 0;
        // Get the current scroll position
        this.scrollPosition = isNullOrUndefined(this.scrollPosition) ? 0 : this.scrollPosition;
        var scroll = this.getscrollerHeight(startingHeight);
        // Calculate the height of the top element
        this.topElementHeight = this.listItemHeight * Math.floor(scroll / this.listItemHeight);
        // Calculate the height of the bottom element
        this.bottomElementHeight = this.totalHeight - this.topElementHeight;
        // If the scroll position is less than or equal to the total height, set the top and bottom element heights.
        // Otherwise, set the top element height to the total height and the bottom element height to 0.
        _a = scroll <= this.totalHeight ?
            [this.topElementHeight, this.bottomElementHeight] : [this.totalHeight, 0], this.topElementHeight = _a[0], this.bottomElementHeight = _a[1];
        // If the top element height has changed, update the top and bottom element heights and re-render the items.
        if (this.topElementHeight !== parseFloat(this.topElement.style.height)) {
            this.topElement.style.height = this.topElementHeight + 'px';
            this.bottomElement.style.height = this.bottomElementHeight + 'px';
            // Check whether the scroll direction is upward or downward
            if (scroll > this.scrollPosition) {
                // Scrolling is upward
                var listDiff = Math.round(((this.topElementHeight / this.listItemHeight) - this.listDiff));
                this.onNormalScroll(listDiff, true);
            }
            else {
                // Scrolling is downward
                var listDiff = Math.round((this.listDiff - (this.topElementHeight / this.listItemHeight)));
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
    };
    /**
     * Calculates the current scroll position of the list element.
     *
     * @param {number} startingHeight The starting height from which to calculate the scroll position.
     * @returns {number} The current scroll position.
     * @private
     */
    Virtualization.prototype.getscrollerHeight = function (startingHeight) {
        // If the scroll position is less than or equal to the starting height, return 0.
        // Otherwise, return the scroll position minus the starting height.
        return ((this.largeIconInstance.element.firstElementChild.scrollTop - startingHeight) <= 0) ? 0 :
            (this.largeIconInstance.element.firstElementChild.scrollTop - startingHeight);
    };
    /**
     * This method updates the displayed items and the selection based on the scroll direction.
     *
     * @param {number} listDiff The number of rows to update.
     * @param {boolean} isScrollingDown If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    Virtualization.prototype.onNormalScroll = function (listDiff, isScrollingDown) {
        // Update the displayed items
        for (var i = 0; i < listDiff; i++) {
            this.updateUI(isScrollingDown);
        }
    };
    /**
     * Updates the items in the large icons view.
     *
     * @param {boolean} isScrollingDown - If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    Virtualization.prototype.updateUI = function (isScrollingDown) {
        var _this = this;
        if (isScrollingDown) {
            // Get the next batch of items to be displayed
            this.items = this.largeIconInstance.allItems.slice(this.renderedCount, this.renderedCount + this.rowItemCount);
            // If there are items to be displayed, create list elements for them and append them to the list
            if (this.items.length > 0) {
                var listElements = ListBase.createListFromJson(createElement, this.items, this.largeIconInstance.listObj);
                this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, listElements));
                this.itemList.forEach(function (liEle) {
                    _this.largeIconInstance.element.firstElementChild.insertBefore(liEle, _this.bottomElement);
                });
                // Update the rendered count variable
                this.renderedCount = (this.largeIconInstance.allItems.length >= this.renderedCount + this.rowItemCount) ?
                    this.renderedCount + this.rowItemCount : this.renderedCount + this.lastRowCount;
                // Remove the first batch of items from the list
                for (var i = 0; i < this.rowItemCount; i++) {
                    detach(this.topElement.nextElementSibling);
                }
            }
        }
        else {
            // Scrolling up
            var lastItemIndex = void 0;
            var isAllRendered = void 0;
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
            var startItemIndex = (lastItemIndex - this.rowItemCount > 0) ? lastItemIndex - this.rowItemCount : 0;
            // Set the items array to the items in the current or previous row
            this.items = this.largeIconInstance.allItems.slice(startItemIndex, lastItemIndex);
            if (this.items.length > 0) {
                // Create a list of elements from the items array
                var listElements = ListBase.createListFromJson(createElement, this.items, this.largeIconInstance.listObj);
                // Set the itemList array to the list items in the list elements
                this.itemList = Array.prototype.slice.call(selectAll('.' + LIST_ITEM, listElements));
                // Add the items to the beginning of the list
                for (var len = this.itemList.length; len > 0; len--) {
                    this.largeIconInstance.element.firstElementChild.insertBefore(this.itemList[len - 1], this.topElement.nextElementSibling);
                }
                // Remove the last row of items from the list
                for (var i = 0; i < ((isAllRendered) ? this.lastRowCount : this.rowItemCount); i++) {
                    detach(this.bottomElement.previousElementSibling);
                }
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    Virtualization.prototype.getModuleName = function () {
        return 'virtualization';
    };
    /**
     * Destroys the component.
     *
     * @returns {void}
     */
    Virtualization.prototype.destroy = function () {
        // If the file manager has already been destroyed, return immediately
        if (this.filemanagerInstance.isDestroyed) {
            return;
        }
        // If the large icon element has a child element, unwire the scroll event
        if (!isNullOrUndefined(this.largeIconInstance.element.firstElementChild)) {
            this.wireScrollEvent(true);
        }
    };
    return Virtualization;
}());

/**
 * NavigationPane module
 */
var NavigationPane = /** @class */ (function () {
    /**
     * Constructor for the TreeView module
     *
     * @param {IFileManager} parent - specifies the parent element.
     * @hidden
     */
    /* istanbul ignore next */
    function NavigationPane(parent) {
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
    NavigationPane.prototype.onInit = function () {
        if (!isNullOrUndefined(this.treeObj)) {
            return;
        }
        var rootData = getValue(this.parent.pathId[0], this.parent.feParent);
        setValue('_fm_icon', 'e-fe-folder', rootData);
        var attr = {};
        var id = getValue('id', rootData);
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
    };
    NavigationPane.prototype.addDragDrop = function () {
        var _this = this;
        if (!this.parent.isMobile && this.treeObj) {
            if (this.parent.allowDragAndDrop && isNullOrUndefined(this.dragObj)) {
                this.dragObj = new Draggable(this.treeObj.element, {
                    cursorAt: this.parent.dragCursorPosition,
                    dragTarget: '.' + FULLROW,
                    distance: 5,
                    dragArea: this.parent.element,
                    drag: draggingHandler.bind(this, this.parent),
                    dragStart: function (args) {
                        dragStartHandler(_this.parent, args, _this.dragObj);
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
    };
    NavigationPane.prototype.dragHelper = function (args) {
        var dragTarget = args.sender.target;
        if (!dragTarget.classList.contains(FULLROW)) {
            return null;
        }
        var dragLi = closest(dragTarget, 'li');
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
    };
    NavigationPane.prototype.getDragPath = function (dragLi, text) {
        var path = this.getDropPath(dragLi, text);
        return getParentPath(path);
    };
    NavigationPane.prototype.getDropPath = function (node, text) {
        var id = node.getAttribute('data-id');
        var newText = this.parent.hasId ? id : text;
        return getPath(node, newText, this.parent.hasId);
    };
    NavigationPane.prototype.onDrowNode = function (args) {
        var eventArgs = {
            element: args.node,
            fileDetails: args.nodeData,
            module: 'NavigationPane'
        };
        this.parent.trigger('fileLoad', eventArgs);
    };
    NavigationPane.prototype.addChild = function (files, target, prevent) {
        var directories = getDirectories(files);
        var targetDirectory = this.getTreeData(target);
        if (directories.length > 0 && targetDirectory.length > 0 &&
            (directories[0].filterPath == null ||
                isNullOrUndefined(targetDirectory[0])
                    && targetDirectory[0].filterPath == null
                || directories[0].filterPath !==
                    targetDirectory[0].filterPath)) {
            var length_1 = 0;
            var folders = directories;
            while (length_1 < directories.length) {
                // eslint-disable-next-line camelcase
                folders[parseInt(length_1.toString(), 10)]._fm_icon = 'e-fe-folder';
                var attr = {};
                var id = getValue('id', folders[length_1]);
                if (!isNullOrUndefined(id)) {
                    setValue('data-id', id, attr);
                }
                if (!hasEditAccess(folders[length_1])) {
                    setValue('class', getAccessClass(folders[length_1]), attr);
                }
                if (!isNullOrUndefined(attr)) {
                    setValue('_fm_htmlAttr', attr, folders[length_1]);
                }
                length_1++;
            }
            var element = select('[data-uid="' + target + '"]', this.treeObj.element);
            var childElements = select('ul', element);
            if (isNullOrUndefined(childElements)) {
                this.treeObj.addNodes(directories, target, null, prevent);
            }
        }
    };
    // Node Selecting event handler
    NavigationPane.prototype.onNodeSelecting = function (args) {
        if (!args.isInteracted && !this.isRightClick &&
            !this.isSameNodeClicked && !this.isPathDragged && !this.isRenameParent || this.restrictSelecting) {
            this.restrictSelecting = false;
            this.isNodeClickCalled = false;
            return;
        }
        if (!this.renameParent) {
            this.parent.activeModule = 'navigationpane';
            var nodeData = this.getTreeData(getValue('id', args.nodeData));
            if (args.node.getAttribute('data-uid') !== this.parent.pathId[this.parent.pathId.length - 1] && !this.isRightClick && !this.isNodeClickCalled || this.isSameNodeClicked || this.isPathDragged) {
                this.isNodeClickCalled = false;
                if (!this.isSameNodeClicked) {
                    this.isSameNodeClicked = true;
                    var selecEventArgs = { action: args.action, fileDetails: nodeData[0], isInteracted: args.isInteracted };
                    this.parent.trigger('fileSelect', selecEventArgs);
                }
                if (!this.isRightClick) {
                    var eventArgs = { cancel: false, fileDetails: nodeData[0], module: 'NavigationPane' };
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
                var selecEventArgs = { action: args.action, fileDetails: nodeData[0], isInteracted: this.isNodeClickCalled };
                this.parent.trigger('fileSelect', selecEventArgs);
            }
        }
    };
    // Opens the folder while clicking open context menu item in the treeview.
    NavigationPane.prototype.openFileOnContextMenuClick = function (node) {
        var data = this.treeObj.getTreeData(node);
        this.parent.selectedItems = [];
        this.parent.itemData = data;
        this.activeNode = node;
        this.parent.activeModule = 'navigationpane';
        var eventArgs = { cancel: false, fileDetails: data[0], module: 'NavigationPane' };
        this.parent.trigger('fileOpen', eventArgs);
        this.isNodeClickCalled = true;
        if (!eventArgs.cancel) {
            updatePath(node, this.parent.itemData[0], this.parent);
            read(this.parent, this.isPathDragged ? pasteEnd : pathChanged, this.parent.path);
            this.parent.visitedItem = node;
            this.isPathDragged = this.isRenameParent = this.isRightClick = false;
            this.treeObj.setProperties({ selectedNodes: [node.getAttribute('data-uid')] });
        }
    };
    NavigationPane.prototype.onNodeSelected = function (args) {
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
        var nodeData = this.getTreeData(getValue('id', args.nodeData));
        this.parent.selectedItems = [];
        this.parent.itemData = nodeData;
        var previousPath = this.parent.path;
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
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onPathDrag = function (args) {
        this.isPathDragged = true;
        this.selectResultNode(args[0]);
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onNodeExpand = function (args) {
        if (!args.isInteracted && !this.isDrag) {
            return;
        }
        if (args.node.querySelector('.' + LIST_ITEM) === null) {
            this.isNodeExpandCalled = true;
            var text = getValue('text', args.nodeData);
            var id = args.node.getAttribute('data-id');
            var isId = isNullOrUndefined(id) ? false : true;
            var newText = isNullOrUndefined(id) ? text : id;
            var path = getPath(args.node, newText, isId);
            this.expandNodeTarget = args.node.getAttribute('data-uid');
            this.parent.expandedId = this.expandNodeTarget;
            this.parent.itemData = this.getTreeData(getValue('id', args.nodeData));
            this.parent.pathId.push(getValue('id', args.nodeData));
            read(this.parent, nodeExpand, path);
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onNodeExpanded = function (args) {
        this.addChild(args.files, this.expandNodeTarget, false);
        this.parent.expandedId = null;
        this.isNodeExpandCalled = false;
    };
    NavigationPane.prototype.onNodeClicked = function (args) {
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
            var layout = (this.parent.view === 'LargeIcons') ? 'largeiconsview' : 'detailsview';
            this.parent.notify(modelChanged, { module: layout, newProp: { selectedItems: [] } });
        }
        else if (args.node.getAttribute('data-uid') === this.treeObj.selectedNodes[0] && !this.isNodeClickCalled && !this.isNodeExpandCalled) {
            if (args.event.which === 3) {
                this.isRightClick = true;
            }
            this.isSameNodeClicked = true;
            this.isNodeClickCalled = true;
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onNodeEditing = function (args) {
        if (!isNullOrUndefined(args.innerHtml)) {
            args.cancel = true;
        }
    };
    NavigationPane.prototype.onPathChanged = function (args) {
        this.parent.isCut = false;
        var currFiles = getValue(this.parent.pathId[this.parent.pathId.length - 1], this.parent.feFiles);
        if (this.expandNodeTarget === 'add') {
            var sNode = select('[data-uid="' + this.treeObj.selectedNodes[0] + '"]', this.treeObj.element);
            var ul = (!isNullOrUndefined(sNode)) ? select('.' + LIST_PARENT, sNode) : null;
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
    };
    NavigationPane.prototype.updateTree = function (args) {
        if (this.treeObj) {
            var id = this.treeObj.selectedNodes[0];
            this.updateTreeNode(args, id);
        }
    };
    NavigationPane.prototype.updateTreeNode = function (args, id) {
        var toExpand = this.treeObj.expandedNodes.indexOf(id) === -1 ? false : true;
        this.removeChildNodes(id);
        this.addChild(args.files, id, !toExpand);
    };
    NavigationPane.prototype.removeChildNodes = function (id) {
        var sNode = select('[data-uid="' + id + '"]', this.treeObj.element);
        var parent = select('.' + LIST_PARENT, sNode);
        var childs = parent ? Array.prototype.slice.call(parent.children) : null;
        if (childs) {
            this.treeObj.removeNodes(childs);
        }
    };
    NavigationPane.prototype.onOpenEnd = function (args) {
        var sleId = this.parent.pathId[this.parent.pathId.length - 1];
        this.treeObj.expandAll(this.treeObj.selectedNodes);
        this.treeObj.setProperties({ selectedNodes: [sleId] });
        this.expandNodeTarget = 'add';
        this.onPathChanged(args);
    };
    NavigationPane.prototype.onOpenInit = function (args) {
        if (this.parent.activeModule === 'navigationpane') {
            if (args.target.querySelector('.' + ICONS)) {
                this.treeObj.expandAll(this.treeObj.selectedNodes);
            }
        }
    };
    NavigationPane.prototype.onInitialEnd = function (args) {
        this.onInit();
        this.addChild(args.files, getValue('_fm_id', args.cwd), false);
    };
    NavigationPane.prototype.onFinalizeEnd = function (args) {
        this.onInit();
        var id = getValue('_fm_id', args.cwd);
        this.addChild(args.files, id, false);
        this.treeObj.setProperties({ selectedNodes: [this.parent.pathId[this.parent.pathId.length - 1]] });
    };
    NavigationPane.prototype.onCreateEnd = function (args) {
        this.updateTree(args);
    };
    NavigationPane.prototype.onSelectedData = function () {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateItemData();
        }
    };
    NavigationPane.prototype.onDeleteInit = function () {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateActionData();
            var name_1 = getValue('name', this.parent.itemData[0]);
            Delete(this.parent, [name_1], this.parent.path, 'delete');
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onDeleteEnd = function (args) {
        if (this.parent.activeModule === 'navigationpane') {
            var selectedNode = this.treeObj.selectedNodes[0];
            var selcetedEle = select('[data-uid="' + selectedNode + '"]', this.treeObj.element);
            var selectedNodeEle = closest(selcetedEle, '.' + LIST_PARENT).parentElement;
            this.treeObj.selectedNodes = [selectedNodeEle.getAttribute('data-uid')];
            this.treeObj.dataBind();
        }
        this.updateTree(args);
    };
    NavigationPane.prototype.onRefreshEnd = function (args) {
        this.updateTree(args);
    };
    NavigationPane.prototype.onRenameInit = function () {
        if (this.parent.activeModule === 'navigationpane') {
            this.updateRenameData();
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onRenameEndParent = function (args) {
        var id = this.renameParent ? this.renameParent : this.parent.pathId[this.parent.pathId.length - 1];
        this.updateTreeNode(args, id);
        this.parent.expandedId = null;
        if (this.renameParent) {
            this.renameParent = null;
        }
        else {
            var resultData = [];
            if (this.parent.hasId) {
                resultData = new DataManager(this.treeObj.getTreeData()).
                    executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
            }
            else {
                var nData = new DataManager(this.treeObj.getTreeData()).
                    executeLocal(new Query().where(this.treeObj.fields.text, 'equal', this.parent.renameText, false));
                if (nData.length > 0) {
                    resultData = new DataManager(nData).
                        executeLocal(new Query().where('_fm_pId', 'equal', id, false));
                }
            }
            if (resultData.length > 0) {
                var id_1 = this.previousSelected.length > 0 && this.treeObj.getTreeData(this.previousSelected[0]).length !== 0
                    ? this.previousSelected[0] : getValue(this.treeObj.fields.id, resultData[0]);
                this.treeObj.selectedNodes = [id_1];
                this.treeObj.dataBind();
                this.updateItemData();
            }
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onRenameEnd = function (args) {
        if (this.parent.breadcrumbbarModule.searchObj.element.value === '' && !this.parent.isFiltered) {
            this.updateTree(args);
        }
        else {
            var data = this.treeObj.getTreeData();
            var resultData = [];
            if (this.parent.hasId) {
                resultData = new DataManager(data).
                    executeLocal(new Query().where('id', 'equal', this.parent.renamedId, false));
            }
            else {
                var nData = new DataManager(data).
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
    };
    NavigationPane.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() && e.module !== 'common') {
            /* istanbul ignore next */
            return;
        }
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onDownLoadInit = function () {
        this.doDownload();
    };
    NavigationPane.prototype.onSelectionChanged = function (e) {
        this.treeObj.setProperties({ selectedNodes: [e.selectedNode] });
    };
    NavigationPane.prototype.onClearPathInit = function (e) {
        this.removeChildNodes(e.selectedNode);
    };
    NavigationPane.prototype.onDragEnd = function (args) {
        if (isFileSystemData(this.parent)) {
            this.moveNames = [];
            var obj = this.parent.dragData;
            for (var i = 0; i < obj.length; i++) {
                if (getValue('isFile', obj[i]) === false) {
                    this.moveNames.push(getValue('_fm_id', obj[i]));
                }
            }
        }
        var moveNames = [];
        if (this.parent.isPasteError || this.parent.isSearchDrag) {
            moveNames = this.getMoveNames(args.files, this.parent.isSearchDrag, this.parent.dragPath);
        }
        else {
            moveNames = this.moveNames;
        }
        this.treeObj.removeNodes(moveNames);
    };
    NavigationPane.prototype.getMoveNames = function (files, flag, path) {
        var moveNames = [];
        for (var i = 0; i < files.length; i++) {
            if (!files[i].isFile) {
                if (!this.parent.hasId) {
                    var name_2 = (files[i].previousName);
                    if (flag) {
                        path = path + files[i].previousName;
                        var index = path.lastIndexOf('/');
                        name_2 = path.substring(index + 1);
                        path = path.substring(0, index + 1);
                    }
                    var resultData = new DataManager(this.treeObj.getTreeData()).
                        executeLocal(new Query().where(this.treeObj.fields.text, 'equal', name_2, false));
                    for (var j = 0; j < resultData.length; j++) {
                        var fPath = getValue('filterPath', resultData[j]);
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
    };
    NavigationPane.prototype.onCutEnd = function (args) {
        var moveNames = [];
        if (this.parent.isPasteError || this.parent.isSearchCut) {
            this.moveNames = this.getMoveNames(args.files, this.parent.isSearchCut, this.parent.targetPath);
        }
        else {
            moveNames = this.moveNames;
        }
        this.treeObj.removeNodes(moveNames);
    };
    /* istanbul ignore next */
    NavigationPane.prototype.selectResultNode = function (resultObj) {
        if (!this.parent.hasId) {
            var path = getValue('filterPath', resultObj);
            var itemname = getValue('name', resultObj);
            var data = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where(this.treeObj.fields.text, 'equal', itemname, false));
            if (data.length > 0) {
                var resultData = new DataManager(data).
                    executeLocal(new Query().where('filterPath', 'equal', path, false));
                if (resultData.length > 0) {
                    var id = getValue(this.treeObj.fields.id, resultData[0]);
                    this.treeObj.selectedNodes = [id];
                    this.treeObj.dataBind();
                }
            }
        }
        else {
            var selectedNode = this.treeObj.getTreeData().filter(function (obj) { return obj.name === resultObj.name; })[0];
            this.treeObj.selectedNodes = [getValue('_fm_id', selectedNode)];
            this.treeObj.dataBind();
        }
    };
    NavigationPane.prototype.onDropPath = function (args) {
        this.onpasteEnd(args);
        this.selectResultNode(this.parent.dropData);
        this.parent.isDropEnd = !this.parent.isPasteError;
    };
    NavigationPane.prototype.onpasteEnd = function (args) {
        var resultData = [];
        if (this.parent.hasId) {
            resultData = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where('id', 'equal', getValue('id', args.cwd), false));
        }
        else {
            var nData = new DataManager(this.treeObj.getTreeData()).
                executeLocal(new Query().where(this.treeObj.fields.text, 'equal', getValue('name', args.cwd), false));
            if (nData.length > 0) {
                resultData = new DataManager(nData).
                    executeLocal(new Query().where('filterPath', 'equal', getValue('filterPath', args.cwd), false));
            }
        }
        if (resultData.length > 0) {
            var id = getValue(this.treeObj.fields.id, resultData[0]);
            var toExpand = this.treeObj.expandedNodes.indexOf(id) === -1;
            this.removeChildNodes(id);
            this.addChild(args.files, id, toExpand);
        }
        this.parent.expandedId = null;
        this.onPathChanged(args);
        if (this.parent.isDragDrop) {
            this.checkDropPath(args);
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.checkDropPath = function (args) {
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
    };
    NavigationPane.prototype.onpasteInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            this.updateItemData();
        }
        this.moveNames = [];
        var obj = this.parent.isDragDrop ? this.parent.dragData : this.parent.actionRecords;
        for (var i = 0; i < obj.length; i++) {
            if (getValue('isFile', obj[i]) === false) {
                this.moveNames.push(getValue('_fm_id', obj[i]));
            }
        }
    };
    NavigationPane.prototype.oncutCopyInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            this.parent.activeRecords = this.getTreeData(this.treeObj.selectedNodes[0]);
            this.parent.activeElements = [this.activeNode];
        }
    };
    NavigationPane.prototype.addEventListener = function () {
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
    };
    NavigationPane.prototype.removeEventListener = function () {
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
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onDetailsInit = function () {
        if (this.parent.activeModule === this.getModuleName()) {
            var dataobj = this.getTreeData(this.treeObj.selectedNodes[0]);
            this.parent.itemData = dataobj;
        }
    };
    NavigationPane.prototype.onMenuItemData = function (args) {
        if (this.parent.activeModule === this.getModuleName()) {
            var liEle = closest(args.target, 'li');
            this.parent.itemData = this.getTreeData(liEle.getAttribute('data-uid'));
        }
    };
    /* istanbul ignore next */
    NavigationPane.prototype.onDragging = function (args) {
        var ele = closest(args.target, 'li');
        if (ele.classList.contains('e-node-collapsed')) {
            this.isDrag = true;
            var level = parseInt(ele.getAttribute('aria-level'), 10);
            this.treeObj.expandAll([ele.getAttribute('data-uid')], level + 1);
            this.isDrag = false;
        }
    };
    NavigationPane.prototype.onDropInit = function (args) {
        if (this.parent.targetModule === this.getModuleName()) {
            var dropLi = closest(args.target, 'li');
            this.parent.dropData = this.getTreeData(dropLi)[0];
            this.parent.dropPath = this.getDropPath(dropLi, getValue('name', this.parent.dropData));
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    NavigationPane.prototype.getModuleName = function () {
        return 'navigationpane';
    };
    NavigationPane.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.treeObj) {
            this.unWireEvents();
            this.treeObj.destroy();
        }
    };
    NavigationPane.prototype.wireEvents = function () {
        this.keyboardModule = new KeyboardEvents(this.treeObj.element, {
            keyAction: this.keyDown.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    NavigationPane.prototype.unWireEvents = function () {
        this.keyboardModule.destroy();
    };
    /* istanbul ignore next */
    NavigationPane.prototype.keyDown = function (e) {
        var action = e.action;
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
                    var data = this.getTreeData(this.treeObj.selectedNodes[0])[0];
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
    };
    NavigationPane.prototype.getTreeData = function (args) {
        var data = this.treeObj.getTreeData(args);
        for (var i = 0; i < data.length; i++) {
            if (isNullOrUndefined(getValue('hasChild', data[i]))) {
                setValue('hasChild', false, data[i]);
            }
        }
        return data;
    };
    NavigationPane.prototype.updateRenameData = function () {
        this.updateItemData();
        this.parent.currentItemText = getValue('name', this.parent.itemData[0]);
    };
    NavigationPane.prototype.updateItemData = function () {
        var data = this.getTreeData(this.treeObj.selectedNodes[0])[0];
        this.parent.itemData = [data];
        this.parent.isFile = false;
    };
    NavigationPane.prototype.updateActionData = function () {
        this.updateItemData();
        var node = select('[data-uid="' + this.parent.pathId[this.parent.pathId.length - 1] + '"]', this.treeObj.element);
        updatePath(node, this.parent.itemData[0], this.parent);
        var newPath = getParentPath(this.parent.path);
        this.parent.setProperties({ path: newPath }, true);
        this.parent.pathId.pop();
        this.parent.pathNames.pop();
    };
    /* istanbul ignore next */
    NavigationPane.prototype.doDownload = function () {
        var newPath = getParentPath(this.parent.path);
        var itemId = this.treeObj.selectedNodes[0];
        var name = (itemId === this.parent.pathId[0]) ? '' : getValue('name', this.parent.itemData[0]);
        Download(this.parent, newPath, [name]);
    };
    return NavigationPane;
}());

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
    DetailsView.prototype.render = function (args) {
        var _this = this;
        if (this.parent.enablePersistence) {
            var gridPersistenceValue = window.localStorage.getItem('grid' + this.parent.element.id + '_grid');
            if (!isNullOrUndefined(gridPersistenceValue)) {
                var model = JSON.parse(gridPersistenceValue);
                if (!isNullOrUndefined(model) && Object.keys(model).length > 0 && 'sortSettings' in model) {
                    delete model.sortSettings;
                    window.localStorage.setItem('grid' + this.parent.element.id + '_grid', JSON.stringify(model));
                }
            }
        }
        showSpinner(this.parent.element);
        if (this.parent.view === 'Details') {
            removeClass([this.parent.element], MULTI_SELECT);
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
            this.gridObj.appendTo('#' + this.parent.element.id + GRID_ID);
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
        var pane = select('#' + this.parent.element.id + CONTENT_ID, this.parent.element);
        var bar = select('#' + this.parent.element.id + BREADCRUMBBAR_ID, this.parent.element);
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
                this.isNameWidth = !isNullOrUndefined(initialColumn[i].width);
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
                if (columns[i].field === 'name' && !isNullOrUndefined(columns[i].template) && !(typeof columns[i].template === 'function')) {
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
        var pane = select('#' + this.parent.element.id + CONTENT_ID, this.parent.element);
        var bar = select('#' + this.parent.element.id + BREADCRUMBBAR_ID, this.parent.element);
        var gridHeader = select('.' + GRID_HEADER, this.parent.element);
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
        var checkWrap = args.row.querySelector('.' + CB_WRAP);
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
            this.parent.notify(sortByChange, {});
        }
    };
    DetailsView.prototype.onHeaderCellInfo = function (args) {
        var checkWrap = args.node.querySelector('.' + CB_WRAP);
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
        if (items.length === 0 && !isNullOrUndefined(this.element.querySelector('.' + GRID_VIEW))) {
            createEmptyElement(this.parent, this.element, args);
        }
        else if (items.length !== 0 && this.element.querySelector('.' + EMPTY)) {
            if (this.element.querySelector('.' + GRID_VIEW).querySelector('.' + EMPTY)) {
                var emptyDiv = this.element.querySelector('.' + GRID_VIEW).querySelector('.' + EMPTY);
                this.element.querySelector('.' + GRID_VIEW).removeChild(emptyDiv);
            }
            else {
                this.element.removeChild(this.element.querySelector('.' + EMPTY));
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
            createDeniedDialog(this.parent, data, permissionRead);
            return;
        }
        var eventArgs = { cancel: false, fileDetails: data, module: 'DetailsView' };
        this.parent.trigger('fileOpen', eventArgs, function (fileOpenArgs) {
            if (!fileOpenArgs.cancel) {
                var name_2 = getValue('name', data);
                if (getValue('isFile', data)) {
                    var icon = fileType(data);
                    if (icon === ICON_IMAGE) {
                        var imgUrl = getImageUrl(_this.parent, data);
                        createImageDialog(_this.parent, name_2, imgUrl);
                    }
                }
                else {
                    var val = _this.parent.breadcrumbbarModule.searchObj.element.value;
                    if (val === '' && !_this.parent.isFiltered) {
                        var id = getValue('id', data);
                        _this.parent.oldPath = _this.parent.path;
                        var newPath = _this.parent.path + (isNullOrUndefined(id) ? name_2 : id) + '/';
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
                    _this.parent.element.querySelector('#' + _this.parent.element.id + IMG_DIALOG_ID).focus();
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
    };
    /* istanbul ignore next */
    DetailsView.prototype.onSearchFiles = function (args) {
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
                this.parent.notify(sortByChange, {});
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
            this.gridObj.element.classList.add(DISPLAY_NONE);
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
        removeClass([this.element], HEADER_CHECK);
        if (this.parent.selectedItems.length > 0) {
            addClass([this.element], HEADER_CHECK);
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
    };
    DetailsView.prototype.removeEventListener = function () {
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
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNullOrUndefined(this.gridObj)) {
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
        if (this.parent.view === 'Details' && !this.parent.isMobile && !isNullOrUndefined(this.gridObj)) {
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
                    dragTarget: '.' + ROW,
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
        var folder = select('.' + FOLDER, item);
        this.parent.isFile = isNullOrUndefined(folder) ? true : false;
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
        this.parent.notify(selectionChanged, {});
        if (this.gridObj.getSelectedRowIndexes().length === 1) {
            this.firstItemIndex = this.gridObj.selectedRowIndex;
        }
        this.gridObj.element.setAttribute('tabindex', '-1');
        this.triggerSelect('select', args);
        var item = this.gridObj.getRowByIndex(this.gridObj.selectedRowIndex);
        this.updateType(item);
        if (!isNullOrUndefined(item) && !isNullOrUndefined(item.querySelector('.e-checkselect'))) {
            if (this.gridObj.getSelectedRowIndexes().length !== 1) {
                var lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
                var lastItem = this.gridObj.getRowByIndex(lastItemIndex);
                if (!isNullOrUndefined(lastItem)) {
                    lastItem.querySelector('.e-checkselect').setAttribute('tabindex', '-1');
                }
            }
            item.querySelector('.e-rowcell.e-fe-checkbox').removeAttribute('tabindex');
        }
        if (!isNullOrUndefined(this.gridObj) && !isNullOrUndefined(this.gridObj.element.querySelector('.e-checkselectall'))) {
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
    };
    /* istanbul ignore next */
    DetailsView.prototype.onPathColumn = function () {
        if (this.parent.view === 'Details' && !isNullOrUndefined(this.gridObj)) {
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
        if (!this.parent.allowMultiSelection && isNullOrUndefined(args.data)) {
            var item = this.gridObj.getRowByIndex(args.rowIndex);
            if (!isNullOrUndefined(item)) {
                item.removeAttribute('tabindex');
            }
        }
        else if (this.gridObj.getSelectedRowIndexes().length > 1) {
            var lastItemIndex = this.gridObj.getSelectedRowIndexes()[this.gridObj.getSelectedRowIndexes().length - 2];
            var lastItem = this.gridObj.getRowByIndex(lastItemIndex);
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
                            addClass([_this.parent.element], MULTI_SELECT);
                        }
                        var target = e.originalEvent.target;
                        if (target) {
                            var row = closest(target, '.' + ROW);
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
        removeClass([this.parent.element], MULTI_SELECT);
        this.gridObj.clearSelection();
        this.parent.setProperties({ selectedItems: [] }, true);
        this.parent.notify(selectionChanged, {});
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
        if (!isNullOrUndefined(this.gridObj.element)) {
            var thElements = this.gridObj.element.querySelectorAll('th');
            for (var i = 0; i < thElements.length; i++) {
                if (thElements[i].classList.contains('e-focus')) {
                    this.addFocus(null);
                }
            }
        }
    };
    DetailsView.prototype.getFocusedItemIndex = function () {
        return (!isNullOrUndefined(this.getFocusedItem())) ?
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
                        var direction = !e.target.getElementsByClassName('e-ascending').length ? 'Ascending' : 'Descending';
                        var currentField = this.gridObj.getColumnByUid(e.target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid')).field;
                        this.gridObj.sortColumn(currentField, direction);
                        if (!isNullOrUndefined(this.getFocusedItem().nextSibling)) {
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
                if (!isNullOrUndefined(gridItems[0]) && this.parent.allowMultiSelection) {
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
                    createDeniedDialog(this.parent, items[i], permissionDownload);
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
                    createDeniedDialog(this.parent, items[i], permissionEdit);
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
        else if (!isNullOrUndefined(this.getFocusedItem()) && focIndex !== selIndex) {
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
        if (!isNullOrUndefined(this.getFocusedItem())) {
            var nextIndex = this.getFocusedItemIndex();
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
    };
    DetailsView.prototype.checkRowsKey = function (items, indexValue, focIndex, e) {
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
        var fItem = isNullOrUndefined(this.startIndex) ? selIndex : selRowIndexes[0];
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
            removeClass([fItem], [FOCUS, FOCUSED]);
        }
        if (!isNullOrUndefined(itemElement)) {
            this.gridObj.element.setAttribute('tabindex', '-1');
            itemElement.setAttribute('tabindex', '0');
            itemElement.focus();
            addClass([itemElement], [FOCUS, FOCUSED]);
        }
    };
    DetailsView.prototype.addHeaderFocus = function (e) {
        var treeFocus = select('.e-row', this.element);
        this.gridObj.element.setAttribute('tabindex', '-1');
        var nameFocus;
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
    };
    DetailsView.prototype.getFocusedItem = function () {
        return select('.' + FOCUSED, this.element);
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
        if (isNullOrUndefined(ids)) {
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
        if (isNullOrUndefined(ids)) {
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
        if (isNullOrUndefined(id)) {
            return;
        }
        var records = this.getRecords([id]);
        if (records.length > 0) {
            this.openContent(records[0]);
        }
    };
    DetailsView.prototype.renameFile = function (id, name) {
        this.parent.activeModule = 'detailsview';
        if (isNullOrUndefined(id)) {
            this.performRename();
            return;
        }
        var records = this.getRecords([id]);
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
    };
    return DetailsView;
}());

export { ACTIVE, ALT_DIALOG_ID, AjaxSettings, BLUR, BREADCRUMBBAR_ID, BREADCRUMBS, BreadCrumbBar, CB_WRAP, CHECK, CHECK_SELECT, CLONE, COLLAPSED, CONTENT_ID, CONTEXT_MENU_ID, CONTROL, Column, ContextMenu, ContextMenuSettings, DETAILS_LABEL, DIALOG_ID, DISPLAY_NONE, DROP_FILE, DROP_FOLDER, Delete, DetailsView, DetailsViewSettings, Download, EMPTY, EMPTY_CONTENT, EMPTY_INNER_CONTENT, ERROR_CONTENT, EXTN_DIALOG_ID, FILTER, FOCUS, FOCUSED, FOLDER, FRAME, FULLROW, FileManager, GRID_CONTENT, GRID_HEADER, GRID_ID, GRID_VIEW, GetDetails, HEADER_CHECK, HOVER, ICONS, ICON_BREADCRUMB, ICON_CLEAR, ICON_COLLAPSIBLE, ICON_COPY, ICON_CUT, ICON_DELETE, ICON_DETAILS, ICON_DOWNLOAD, ICON_DROP_IN, ICON_DROP_OUT, ICON_GRID, ICON_IMAGE, ICON_LARGE, ICON_MUSIC, ICON_NEWFOLDER, ICON_NO_DROP, ICON_OPEN, ICON_OPTIONS, ICON_PASTE, ICON_REFRESH, ICON_RENAME, ICON_SELECTALL, ICON_SHORTBY, ICON_UPLOAD, ICON_VIDEO, ICON_VIEW, IMG_DIALOG_ID, LARGEICON_ID, LARGE_EMPTY_FOLDER, LARGE_EMPTY_FOLDER_TWO, LARGE_ICON, LARGE_ICONS, LARGE_ICON_FOLDER, LAYOUT, LAYOUT_CONTENT, LAYOUT_ID, LIST_ITEM, LIST_PARENT, LIST_TEXT, LargeIconsView, MENU_ICON, MENU_ITEM, MOBILE, MOB_POPUP, MULTI_SELECT, NAVIGATION, NAVIGATION_ID, NavigationPane, NavigationPaneSettings, OVERLAY, RETRY_DIALOG_ID, RETRY_ID, ROOT, ROOT_POPUP, ROW, ROWCELL, RTL, SEARCH_ID, SELECTED_ITEMS, SORTBY_ID, SPLITTER_ID, SPLIT_BAR, STATUS, SUBMENU_ICON, Search, SearchSettings, TB_ITEM, TB_OPTION_DOT, TB_OPTION_TICK, TEMPLATE_CELL, TEXT_CONTENT, TOOLBAR_ID, TREE_ID, TREE_VIEW, Toolbar, ToolbarItem, ToolbarSettings, UPLOAD_DIALOG_ID, UPLOAD_ID, UploadSettings, VALUE, VIEW_ID, Virtualization, actionFailure, activeElement, addBlur, afterRequest, beforeDelete, beforeDownload, beforeRequest, clearAllInit, clearPathInit, closePopup, columnArray, copyFiles, createDeniedDialog, createDialog, createEmptyElement, createEnd, createExtDialog, createFolder, createImageDialog, createNewFolder, createVirtualDragElement, cutCopyInit, cutEnd, cutFiles, defaultToolbarItems, deleteEnd, deleteInit, destroy, detailsInit, doDeleteFiles, doDownload, doDownloadFiles, doPasteUpdate, doRename, download, downloadInit, dragCancel, dragEnd, dragHelper, dragStartHandler, dragStopHandler, dragging, draggingHandler, dropHandler, dropInit, dropPath, fileItems, fileType, filter, filterEnd, finalizeEnd, folderItems, generatePath, getAccessClass, getAccessDetails, getAllChildItems, getCssClass, getDirectories, getDirectoryPath, getDuplicateData, getFullPath, getImageUrl, getItemName, getLocaleText, getModule, getName, getObject, getParentPath, getParents, getPath, getPathId, getPathNames, getPathObject, getSortField, getSortedData, getTargetModule, getTargetPath, hasContentAccess, hasDownloadAccess, hasEditAccess, hasReadAccess, hasUploadAccess, hideLayout, hidePaste, initialEnd, isFile, isFileSystemData, layoutChange, layoutItems, layoutRefresh, menuItemData, methodCall, modelChanged, nodeExpand, objectToString, openAction, openEnd, openInit, openSearchFolder, paste, pasteEnd, pasteHandler, pasteInit, pathChanged, pathColumn, pathDrag, permissionCopy, permissionDownload, permissionEdit, permissionEditContents, permissionRead, permissionUpload, read, readDropPath, refresh, refreshEnd, removeActive, removeBlur, removeDropTarget, removeItemClass, rename, renameEnd, renameEndParent, renameInit, resizeEnd, scrollHandler, search, searchTextChange, searchWordHandler, selectAllInit, selectedData, selectionChanged, setDateObject, setNextPath, setNodeId, showPaste, skipUpload, sortByChange, sortColumn, sortComparer, sortbyClickHandler, splitterResize, treeSelect, updateLayout, updatePath, updateRenamingData, updateSelectionData, updateTreeSelection, upload, uploadItem, validateSubFolder };
//# sourceMappingURL=ej2-filemanager.es5.js.map
