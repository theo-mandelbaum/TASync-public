"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./resize.css");
var Resize = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var resizeRibbonObj = (0, react_1.useRef)(null);
    var pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    var findOptions = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    var selectOptions = [{ text: "Select All" }, { text: "Select Objects" }];
    var dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    var tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    var shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    var headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    var footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    var pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    var linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
    var fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    var fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
    function filtering(e) {
        var query = new ej2_data_1.Query();
        query = (e.text !== "") ? query.where("Text", "contains", e.text, true) : query;
        e.updateData(fontStyle, query);
    }
    var fileOptions = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
        { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
        { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
        {
            text: "Save as", iconCss: "e-icons e-save", id: "save",
            items: [
                { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
                { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
                { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }
            ]
        }];
    var toastInstance = (0, react_1.useRef)(null);
    var isPasteDisabled = true;
    var enablePaste = function () {
        if (!isPasteDisabled) {
            return;
        }
        resizeRibbonObj.current.enableItem('resize-pastebtn');
        isPasteDisabled = false;
    };
    var updateContent = function (args) {
        toastInstance.current.show({ content: "Last clicked item is " + args });
    };
    var sliderRef = (0, react_1.useRef)(null);
    var onCreated = function () {
        var container = document.getElementById('ribbonContainer');
        var slider = sliderRef.current;
        slider.max = container.offsetWidth;
        slider.value = container.offsetWidth;
        slider.min = 350;
    };
    (0, react_1.useEffect)(function () {
        var onResize = function () {
            var container = document.getElementById('ribbonContainer');
            container.style.width = '100%';
            var slider = sliderRef.current;
            slider.max = container.offsetWidth;
            slider.value = container.offsetWidth;
        };
        window.addEventListener('resize', onResize);
        return function () {
            window.removeEventListener('resize', onResize);
        };
    });
    var onChange = function (args) {
        var container = document.getElementById('ribbonContainer');
        container.style.width = args.value + 'px';
        resizeRibbonObj.current.refreshLayout();
    };
    var fileSelect = function (args) {
        if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
            updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            updateContent("File -> " + args.item.text);
        }
    };
    var launchClick = function (args) {
        if (args.groupId == "clipboard") {
            updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            updateContent("Header & Footer Launcher Icon");
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section resize-ribbon-section' },
            React.createElement("div", { className: 'control ribbon-sample' },
                React.createElement("div", { id: "ribbonContainer", className: 'resize-ribbon-container' },
                    React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'ribbon', ref: resizeRibbonObj, enablePersistence: true, fileMenu: { visible: true, menuItems: fileOptions, select: fileSelect }, launcherIconClick: launchClick, cssClass: 'ribbon-resize' },
                        React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Home' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Clipboard", id: 'clipboard', groupIconCss: "e-icons e-paste", showLauncherIcon: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", disabled: true, id: "resize-pastebtn", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: function (args) { updateContent("Paste -> " + args.item.text); }, click: function () { updateContent("Paste"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-cut", content: "Cut", clicked: function () { updateContent("Cut"); enablePaste(); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-copy", content: "Copy", clicked: function () { updateContent("Copy"); enablePaste(); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { updateContent("Format Painter"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Font", overflowHeader: "More Font Options", groupIconCss: "e-icons e-bold", isCollapsible: false, enableGroupOverflow: true, orientation: "Row", cssClass: 'font-group' },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, filtering: filtering, select: function (args) { if (args.itemData) {
                                                                updateContent("Font Style -> " + args.itemData.text);
                                                            } } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', select: function (args) { if (args.itemData) {
                                                                updateContent("Font Size -> " + args.itemData.text);
                                                            } } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_1.RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{ iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: function () { updateContent("Bold"); } }, { iconCss: 'e-icons e-italic', content: 'Italic', click: function () { updateContent("Italic"); } }, { iconCss: 'e-icons e-underline', content: 'Underline', click: function () { updateContent("Underline"); } }, { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: function () { updateContent("Strikethrough"); } }, { iconCss: 'e-icons e-change-case', content: 'Change Case', click: function () { updateContent("Change Case"); } }] } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ColorPicker", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, displayOptions: ej2_react_ribbon_1.DisplayMode.Simplified | ej2_react_ribbon_1.DisplayMode.Classic, colorPickerSettings: { value: '#123456', change: function (args) { updateContent(args.currentValue.hex + " color"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Paragraph", groupIconCss: "e-icons e-align-center", orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: function () { updateContent("Decrease Indent"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: function () { updateContent("Increase Indent"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: function () { updateContent("Paragraph Mark"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_1.RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: function () { updateContent("Align Left"); } }, { iconCss: 'e-icons e-align-center', click: function () { updateContent("Align Center"); } }, { iconCss: 'e-icons e-align-right', click: function () { updateContent("Align Right"); } }, { iconCss: 'e-icons e-justify', click: function () { updateContent("Justify"); } }] } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editing", groupIconCss: "e-icons e-edit", orientation: "Column" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-search", items: findOptions, content: "Find", select: function (args) { updateContent("Find -> " + args.item.text); }, click: function () { updateContent("Find"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { updateContent("Replace"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: function (args) { updateContent("Select -> " + args.item.text); }, click: function () { updateContent("Select"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Voice", groupIconCss: "sf-icon-dictate", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", disabled: true, allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: function (args) { updateContent("Dictate -> " + args.item.text); }, click: function () { updateContent("Dictate"); } } }))))))),
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Insert' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Tables", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-table", items: tableOptions, content: "Table", select: function (args) { updateContent("Table -> " + args.item.text); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Illustration", overflowHeader: "Illustrations", id: "illustration", groupIconCss: "e-icons e-image", enableGroupOverflow: true, orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { id: 'pictureddl', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#resize-pictureList' } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "sf-icon-shapes", items: shapeOptions, content: "Shapes", select: function (args) { updateContent("Shapes -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-3d-model", content: "3D Models", clicked: function () { updateContent("3D Models"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: function () { updateContent("Smart Art"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-chart", content: "Charts", clicked: function () { updateContent("Chart"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: function () { updateContent("Screenshot"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Header & Footer", id: "header_footer", groupIconCss: "e-icons e-table", orientation: "Column", showLauncherIcon: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-header", items: headerOptions, content: "Header", select: function (args) { updateContent("Header -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-footer", items: footerOptions, content: "Footer", select: function (args) { updateContent("Footer -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-page-numbering", items: pageOptions, content: "Page Numbering", select: function (args) { updateContent("Page Numbering -> " + args.item.text); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Comments", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-comment-add", content: "New Comment", clicked: function () { updateContent("New Comment"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Links", groupIconCss: "e-icons e-link", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-link", items: linkOptions, content: "Link", select: function (args) { updateContent("Link -> " + args.item.text); } } }))))))),
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'View' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Views", groupIconCss: 'e-icons e-print', orientation: 'Row' },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-read", content: "Read Mode", clicked: function () { updateContent("Read Mode"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-print", content: "Print Layout", clicked: function () { updateContent("Print Layout"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: function () { updateContent("Web Layout"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Zoom", groupIconCss: "e-icons e-zoom-to-fit", orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: function () { updateContent("Zoom in"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: function () { updateContent("Zoom out"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Show", isCollapsible: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Ruler", checked: false, change: function () { updateContent("Ruler"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Gridlines", checked: false, change: function () { updateContent("Gridlines"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Navigation Pane", checked: true, change: function () { updateContent("Navigation Pane"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Dark Mode", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { updateContent("Dark Mode"); } } })))))))),
                        React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_1.RibbonColorPicker] })),
                    React.createElement("div", { id: "ribbonPlaceHolder" },
                        React.createElement("div", { style: { width: '100%', height: '40px' }, className: 'ribbonSliderWrapper' },
                            React.createElement("p", { className: 'ribbonResizeDisplayText' }, "Resize Ribbon"),
                            React.createElement("div", { id: 'ribbonSlider', style: { width: '200px', margin: '0 15px' } },
                                React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'slider', ref: sliderRef, min: 350, change: onChange.bind(_this), created: onCreated.bind(_this) }))),
                        React.createElement("div", { className: "content1" }),
                        React.createElement("div", { className: "content2" }),
                        React.createElement("div", { className: "content3" }),
                        React.createElement("div", { className: "content4" }),
                        React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: toastInstance, position: { X: 'Right' }, height: 25, width: 'auto', timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'resize-pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { updateContent("Picture -> " + args.text); } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the adaptiveness of the ribbon to different screen sizes. Move the slider to resize the ribbon.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ribbon supports three sizes of ribbon items in classic mode: ",
                React.createElement("code", null, "Large"),
                ", ",
                React.createElement("code", null, "Medium"),
                ", and ",
                React.createElement("code", null, "Small"),
                ", and two sizes in simplified mode: ",
                React.createElement("code", null, "Medium"),
                ", and ",
                React.createElement("code", null, "Small"),
                ". The ribbon items switch between these sizes based on the screen size. In addition, the ribbon also has overflow dropdowns and horizontal scrolling to ensure all items are accessible in all screen sizes and resolutions."))));
};
exports.default = Resize;
