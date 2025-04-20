"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
var defaultcss = "\n#all-property-table .property-panel-section .property-panel-content table#property tr {\n    height: 50px;\n}\n\n@media (max-width: 550px) {\n    #rangeSelectionRow {\n        display: none;\n    }\n}";
/**
 * File Manager API sample
 */
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        _this.items = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];
        return _this;
    }
    Default.prototype.toolCheck = function (args, id) {
        if (id == "toolbar") {
            this.fmObj.toolbarSettings.visible = args.checked;
        }
        if (id == "fileExtension") {
            this.fmObj.showFileExtension = args.checked;
        }
        if (id == "thumbnail") {
            this.fmObj.showThumbnail = args.checked;
        }
        if (id == "rangeSelection") {
            this.fmObj.enableRangeSelection = args.checked;
        }
    };
    Default.prototype.onDisableItemChange = function (args) {
        if (args.itemData != null) {
            this.fmObj.disableToolbarItems([args.itemData.value]);
            if (args.value === this.enableDropDownList.value) {
                this.enableDropDownList.value = null;
            }
        }
    };
    Default.prototype.onEnableItemChange = function (args) {
        if (args.itemData != null) {
            this.fmObj.enableToolbarItems([args.itemData.value]);
            if (args.value === this.disableDropDownList.value) {
                this.disableDropDownList.value = null;
            }
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("style", null, defaultcss),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "api_filemanager", ref: function (scope) { _this.fmObj = scope; }, ajaxSettings: {
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }, view: "LargeIcons", navigationPaneSettings: { visible: false }, enableRangeSelection: true },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "all-property-table", className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { id: "rangeSelectionRow" },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Enable Range Selection")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "rangeSelection", checked: true, change: function (args) { return _this.toolCheck(args, "rangeSelection"); } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Toolbar")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "toolbar", checked: true, change: function (args) { return _this.toolCheck(args, "toolbar"); } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Show File Extension")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "fileExtension", checked: true, change: function (args) { return _this.toolCheck(args, "fileExtension"); } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Show Thumbnail")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "thumbnail", checked: true, change: function (args) { return _this.toolCheck(args, "thumbnail"); } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Disable Toolbar Item")),
                                React.createElement("td", { style: { width: '50%', paddingLeft: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { _this.disableDropDownList = scope; }, id: "disable", dataSource: this.items, change: this.onDisableItemChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Enable Toolbar Item")),
                                React.createElement("td", { style: { width: '50%', paddingLeft: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { _this.enableDropDownList = scope; }, id: "enable", dataSource: this.items, change: this.onEnableItemChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The property pane in this sample displays the features available in the File Manager component. The visibility of the toolbar, file extensions,  range selection, and image thumbnails can be easily controlled by checking or unchecking the respective checkboxes. Additionally, specific toolbar items can be enabled or disabled by selecting values in the Dropdown List.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, the above mentioned requirements are achieved by using the following API properties and method of the File Manager component. "),
                React.createElement("p", null,
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings' }, "toolbarSettings"),
                    " defines the group of items in the toolbar that are aligned horizontally."),
                React.createElement("p", null,
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/file-manager/#showfileextension' }, "showFileExtension"),
                    " property shows or hides the file extension in the File Manager."),
                React.createElement("p", null,
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail' }, "showThumbnail"),
                    " property shows or hides thumbnail images in the large icons view."),
                React.createElement("p", null,
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/file-manager/#enableRangeSelection' }, "enableRangeSelection"),
                    " property allows multiple items selection with mouse dragging. "),
                React.createElement("p", null,
                    React.createElement("code", null, "enableToolbarItems"),
                    " specifies which items should be enabled in the toolbar."),
                React.createElement("p", null,
                    React.createElement("code", null, "disableToolbarItems"),
                    " specifies which items should be disabled in the toolbar."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
