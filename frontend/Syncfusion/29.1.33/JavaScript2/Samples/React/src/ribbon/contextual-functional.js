"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./contextual.css");
var Contextual = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        tableElementRef.current.onclick = function (args) {
            ribbonObj.current.showTab('TableDesign', true);
            ribbonObj.current.showTab('TableLayout', true);
            ribbonObj.current.selectTab('TableDesign');
            ribbonObj.current.hideTab('Format', true);
            if (selectedCell) {
                selectedCell.classList.remove('e-table-selected');
            }
            args.target.classList.add('e-table-selected');
            selectedCell = args.currentTarget.querySelector('.e-table-selected');
            imageElementRef.current.classList.remove('e-image-selected');
        };
        imageElementRef.current.onclick = function (e) {
            e.stopPropagation();
            ribbonObj.current.showTab('Format', true);
            ribbonObj.current.selectTab('Format');
            ribbonObj.current.hideTab('TableDesign', true);
            ribbonObj.current.hideTab('TableLayout', true);
            updateSelectedState('Image');
        };
        placeholderElementRef.current.onclick = function (args) {
            if (args.target.nodeName !== 'TD' && args.target.nodeName !== 'IMG') {
                ribbonObj.current.hideTab('TableDesign', true);
                ribbonObj.current.hideTab('TableLayout', true);
                ribbonObj.current.hideTab('Format', true);
                updateSelectedState('Table');
            }
        };
    }, []);
    var ribbonObj = (0, react_1.useRef)(null);
    var selectedCell = null;
    var tableElementRef = (0, react_1.useRef)(null);
    var imageElementRef = (0, react_1.useRef)(null);
    var placeholderElementRef = (0, react_1.useRef)(null);
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
    var tableDropdownOptions = [{ text: "Header Row" }, { text: "Banded Rows" }, { text: "Banded Columns" }];
    var borderDropdownOptions = [
        { text: 'Border Right', iconCss: 'e-icons e-border-right' },
        { text: 'Border Left', iconCss: 'e-icons e-border-left' },
        { text: 'Border Bottom', iconCss: 'e-icons e-border-bottom' },
        { text: 'Border Top', iconCss: 'e-icons e-border-top' }
    ];
    var mergeDropdownOptions = [{ text: 'Merge Cells', iconCss: 'e-icons e-merge-cells' }, { text: 'Split Cells', iconCss: 'e-icons e-split-horizontal' }];
    var fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    var fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
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
        ribbonObj.current.enableItem('pastebtn');
        isPasteDisabled = false;
    };
    var updateContent = function (args) {
        toastInstance.current.show({ content: "Last clicked item is " + args });
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
    var updateSelectedState = function (args) {
        if (selectedCell) {
            selectedCell.classList.remove('e-table-selected');
            selectedCell = null;
        }
        imageElementRef.current.classList[args === 'Image' ? 'add' : 'remove']('e-image-selected');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section contextual-tab' },
            React.createElement("div", { id: "contextual-ribbonContainer" },
                React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'ribbon', ref: ribbonObj, enablePersistence: true, fileMenu: { visible: true, menuItems: fileOptions, select: fileSelect }, launcherIconClick: launchClick },
                    React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                        React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Home' },
                            React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Clipboard", id: "clipboard", groupIconCss: "e-icons e-paste", showLauncherIcon: true },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", disabled: true, id: "pastebtn", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: function (args) { updateContent("Paste -> " + args.item.text); }, click: function () { updateContent("Paste"); } } }))),
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-cut", content: "Cut", clicked: function () { updateContent("Cut"); enablePaste(); } } }),
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-copy", content: "Copy", clicked: function () { updateContent("Copy"); enablePaste(); } } }),
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { updateContent("Format Painter"); } } }))))),
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Font", overflowHeader: "More Font Options", groupIconCss: "e-icons e-bold", isCollapsible: false, enableGroupOverflow: true, orientation: "Row", cssClass: 'font-group' },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                            updateContent("Font Style -> " + args.itemData.text);
                                                        } } } }),
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                            updateContent("Font Size -> " + args.itemData.text);
                                                        } } } }))),
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_2.RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{ iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: function () { updateContent("Bold"); } }, { iconCss: 'e-icons e-italic', content: 'Italic', click: function () { updateContent("Italic"); } }, { iconCss: 'e-icons e-underline', content: 'Underline', click: function () { updateContent("Underline"); } }, { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: function () { updateContent("Strikethrough"); } }, { iconCss: 'e-icons e-change-case', content: 'Change Case', click: function () { updateContent("Change Case"); } }] } }),
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
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_2.RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: function () { updateContent("Align Left"); } }, { iconCss: 'e-icons e-align-center', click: function () { updateContent("Align Center"); } }, { iconCss: 'e-icons e-align-right', click: function () { updateContent("Align Right"); } }, { iconCss: 'e-icons e-justify', click: function () { updateContent("Justify"); } }] } }))))),
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editing", groupIconCss: "e-icons e-edit", orientation: "Column" },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-search", items: findOptions, content: "Find", select: function (args) { updateContent("Find -> " + args.item.text); }, click: function () { updateContent("Find"); } } }),
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { updateContent("Replace"); } } }),
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: function (args) { updateContent("Select -> " + args.item.text); }, click: function () { updateContent("Select"); } } }))))),
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Voice", groupIconCss: "sf-icon-dictate", isCollapsible: false },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "SplitButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: function (args) { updateContent("Dictate -> " + args.item.text); }, click: function () { updateContent("Dictate"); } } }))))),
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editor", groupIconCss: "sf-icon-editor", isCollapsible: false },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-editor", content: "Editor", clicked: function () { updateContent("Editor"); } } }))))),
                                React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Reuse Files", groupIconCss: "sf-icon-reuse", isCollapsible: false },
                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", disabled: true, allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: function () { updateContent("Reuse Files"); } } }))))))),
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
                                                React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { id: 'pictureddl', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#pictureList' } }),
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
                    React.createElement(ej2_react_ribbon_1.RibbonContextualTabsDirective, null,
                        React.createElement(ej2_react_ribbon_1.RibbonContextualTabDirective, { visible: true },
                            React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "TableDesign", header: 'Table Design' },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Table Style", groupIconCss: "e-icons e-field-settings" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-field-settings", content: "Table Style", items: tableDropdownOptions, select: function (args) { updateContent("Table Style -> " + args.item.text); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Borders Style", groupIconCss: "e-icons e-field-settings" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-border-all", content: "Borders", items: borderDropdownOptions, select: function (args) { updateContent("Borders -> " + args.item.text); } } }))))))),
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "TableLayout", header: 'Table Layout' },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Data", groupIconCss: "e-icons e-custom-sort" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-sort-ascending", content: "Sort Table Ascending", clicked: function () { updateContent("Sort Table Ascending"); } } }))),
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-sort-descending", content: "Sort Table Descending", clicked: function () { updateContent("Sort Table Descending"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Merge", groupIconCss: "e-icons e-merge-cells" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-merge-cells", content: "Merge", items: mergeDropdownOptions, select: function (args) { updateContent("Merge -> " + args.item.text); } } }))))))))),
                        React.createElement(ej2_react_ribbon_1.RibbonContextualTabDirective, { visible: false },
                            React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "Format", header: 'Picture Format' },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Background", groupIconCss: "e-icons e-image" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-image", content: "Remove Background", clicked: function () { updateContent("Remove Background"); } } })))))))))),
                    React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_1.RibbonColorPicker, ej2_react_ribbon_1.RibbonContextualTab] })),
                React.createElement("div", { id: "contextual-ribbonPlaceHolder", ref: placeholderElementRef },
                    React.createElement("div", { className: "content-wrap" },
                        React.createElement("div", { className: "table-content", style: { backgroundColor: "white" } },
                            React.createElement("table", { border: 1, className: "ribbon-table" },
                                React.createElement("caption", { className: "table-header" }, "Click on the table or image to show contextual tabs."),
                                React.createElement("tbody", { className: "table-body", ref: tableElementRef },
                                    React.createElement("tr", { id: "tableRow1" },
                                        React.createElement("td", null),
                                        React.createElement("td", null),
                                        React.createElement("td", null)),
                                    React.createElement("tr", { id: "tableRow2" },
                                        React.createElement("td", null),
                                        React.createElement("td", null),
                                        React.createElement("td", null)),
                                    React.createElement("tr", { id: "tableRow3" },
                                        React.createElement("td", null),
                                        React.createElement("td", null),
                                        React.createElement("td", null)))),
                            React.createElement("img", { id: "ribbonImage", ref: imageElementRef, className: "ribbon-image", src: "src/ribbon/images/empire-state-building.png", alt: "image" }))),
                    React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: toastInstance, position: { X: 'Right' }, width: 'auto', height: 25, timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#contextual-ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { updateContent("Picture -> " + args.text); } }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the contextual tabs support in the ribbon.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " The Ribbon contextual tabs enable users to display the ribbon tabs on demand based on specific actions or needs. It supports adding all built-in and custom ribbon items, similar to the normal ribbon tab. This example demonstrates adding the contextual tabs using the ",
                React.createElement("code", null, "contextualTabs"),
                " property and showing the contextual tabs in the initial load using the ",
                React.createElement("code", null, "visible"),
                " property. "))));
};
exports.default = Contextual;
