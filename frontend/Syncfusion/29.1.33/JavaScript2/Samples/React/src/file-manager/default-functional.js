"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
var defaultcss = "\n    #all-property-table .property-panel-section .property-panel-content table#property tr {\n        height: 50px;\n    }\n    @media (max-width: 550px) {\n        #rangeSelectionRow {\n            display: none;\n        }\n    }";
/**
 * File Manager API sample
 */
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isVisible = _a[0], setIsVisible = _a[1];
    var _b = (0, react_1.useState)(true), isAllowMultiselect = _b[0], setIsAllowmultiselect = _b[1];
    var _c = (0, react_1.useState)(true), isShowFileExtension = _c[0], setIsShowFileExtension = _c[1];
    var _d = (0, react_1.useState)(true), isShowThumbnail = _d[0], setShowThumbnail = _d[1];
    var _e = (0, react_1.useState)(true), isEnableRangeSelection = _e[0], setEnableRangeSelection = _e[1];
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    var fmObj = (0, react_1.useRef)(null);
    var disableDropDownList = (0, react_1.useRef)(null);
    var enableDropDownList = (0, react_1.useRef)(null);
    var items = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];
    var toolCheck = function (args, id) {
        if (id == "toolbar") {
            setIsVisible(args.checked);
        }
        if (id == "fileExtension") {
            setIsShowFileExtension(args.checked);
        }
        if (id == "thumbnail") {
            setShowThumbnail(args.checked);
        }
        if (id == "rangeSelection") {
            setEnableRangeSelection(args.checked);
        }
    };
    var onDisableItemChange = function (args) {
        if (args.itemData != null) {
            fmObj.current.disableToolbarItems([args.itemData.value]);
            if (args.value === enableDropDownList.current.value) {
                enableDropDownList.current.value = null;
            }
        }
    };
    var onEnableItemChange = function (args) {
        if (args.itemData != null) {
            fmObj.current.enableToolbarItems([args.itemData.value]);
            if (args.value === disableDropDownList.current.value) {
                disableDropDownList.current.value = null;
            }
        }
    };
    return (React.createElement("div", null,
        React.createElement("style", null, defaultcss),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "api_filemanager", ref: fmObj, ajaxSettings: { url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'], visible: isVisible }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, view: "LargeIcons", navigationPaneSettings: { visible: false }, allowMultiSelection: isAllowMultiselect, showFileExtension: isShowFileExtension, showThumbnail: isShowThumbnail, enableRangeSelection: isEnableRangeSelection },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.Toolbar] }))),
        React.createElement("div", { id: "all-property-table", className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Enable Range Selection")),
                            React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "rangeSelection", checked: true, change: function (args) { return toolCheck(args, "rangeSelection"); } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Toolbar")),
                            React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "toolbar", checked: true, change: function (args) { return toolCheck(args, "toolbar"); } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Show File Extension")),
                            React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "fileExtension", checked: true, change: function (args) { return toolCheck(args, "fileExtension"); } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Show Thumbnail")),
                            React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "thumbnail", checked: true, change: function (args) { return toolCheck(args, "thumbnail"); } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Disable Toolbar Item")),
                            React.createElement("td", { style: { width: '50%', paddingLeft: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: disableDropDownList, id: "disable", dataSource: items, change: onDisableItemChange.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%' } },
                                React.createElement("div", { style: { fontSize: '14px', paddingLeft: '0px' } }, "Enable Toolbar Item")),
                            React.createElement("td", { style: { width: '50%', paddingLeft: '10px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: enableDropDownList, id: "enable", dataSource: items, change: onEnableItemChange.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The property pane in this sample displays the features available in the File Manager component. The visibility of the toolbar, file extensions, range selection, and image thumbnails can be easily controlled by checking or unchecking the respective checkboxes. Additionally, specific toolbar items can be enabled or disabled by selecting values in the Dropdown List.")),
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
exports.default = Default;
