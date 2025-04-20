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
exports.Contextual = void 0;
var React = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./contextual.css");
var Contextual = /** @class */ (function (_super) {
    __extends(Contextual, _super);
    function Contextual() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedCell = null;
        _this.tableElement = null;
        _this.imageElement = null;
        _this.placeholderElement = null;
        _this.pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
        _this.findOptions = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
        _this.selectOptions = [{ text: "Select All" }, { text: "Select Objects" }];
        _this.dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
        _this.tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
        _this.shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
        _this.headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
        _this.footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
        _this.pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
        _this.linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
        _this.tableDropdownOptions = [{ text: "Header Row" }, { text: "Banded Rows" }, { text: "Banded Columns" }];
        _this.borderDropdownOptions = [
            { text: 'Border Right', iconCss: 'e-icons e-border-right' },
            { text: 'Border Left', iconCss: 'e-icons e-border-left' },
            { text: 'Border Bottom', iconCss: 'e-icons e-border-bottom' },
            { text: 'Border Top', iconCss: 'e-icons e-border-top' }
        ];
        _this.mergeDropdownOptions = [{ text: 'Merge Cells', iconCss: 'e-icons e-merge-cells' }, { text: 'Split Cells', iconCss: 'e-icons e-split-horizontal' }];
        _this.fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
        _this.fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
        _this.fileOptions = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
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
        _this.isPasteDisabled = true;
        _this.updateSelectedState = function (args) {
            if (_this.selectedCell) {
                _this.selectedCell.classList.remove('e-table-selected');
                _this.selectedCell = null;
            }
            _this.imageElement.classList[args === 'Image' ? 'add' : 'remove']('e-image-selected');
        };
        return _this;
    }
    Contextual.prototype.componentDidMount = function () {
        var _this = this;
        this.tableElement.onclick = function (args) {
            _this.ribbonObj.showTab('TableDesign', true);
            _this.ribbonObj.showTab('TableLayout', true);
            _this.ribbonObj.selectTab('TableDesign');
            _this.ribbonObj.hideTab('Format', true);
            if (_this.selectedCell) {
                _this.selectedCell.classList.remove('e-table-selected');
            }
            args.target.classList.add('e-table-selected');
            _this.selectedCell = args.currentTarget.querySelector('.e-table-selected');
            _this.imageElement.classList.remove('e-image-selected');
        };
        this.imageElement.onclick = function (e) {
            e.stopPropagation();
            _this.ribbonObj.showTab('Format', true);
            _this.ribbonObj.selectTab('Format');
            _this.ribbonObj.hideTab('TableDesign', true);
            _this.ribbonObj.hideTab('TableLayout', true);
            _this.updateSelectedState('Image');
        };
        this.placeholderElement.onclick = function (args) {
            if (args.target.nodeName !== 'TD' && args.target.nodeName !== 'IMG') {
                _this.ribbonObj.hideTab('TableDesign', true);
                _this.ribbonObj.hideTab('TableLayout', true);
                _this.ribbonObj.hideTab('Format', true);
                _this.updateSelectedState('Table');
            }
        };
    };
    Contextual.prototype.enablePaste = function () {
        if (!this.isPasteDisabled) {
            return;
        }
        this.ribbonObj.enableItem('pastebtn');
        this.isPasteDisabled = false;
    };
    Contextual.prototype.updateContent = function (args) {
        this.toastInstance.show({ content: "Last clicked item is " + args });
    };
    Contextual.prototype.fileSelect = function (args) {
        if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
            this.updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            this.updateContent("File -> " + args.item.text);
        }
    };
    Contextual.prototype.launchClick = function (args) {
        if (args.groupId == "clipboard") {
            this.updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            this.updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            this.updateContent("Header & Footer Launcher Icon");
        }
    };
    Contextual.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section contextual-tab' },
                React.createElement("div", { id: "ribbonContainer" },
                    React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'ribbon', ref: function (ribbon) { _this.ribbonObj = ribbon; }, enablePersistence: true, fileMenu: { visible: true, menuItems: this.fileOptions, select: this.fileSelect }, launcherIconClick: this.launchClick },
                        React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Home' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Clipboard", id: 'clipboard', groupIconCss: "e-icons e-paste", showLauncherIcon: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", disabled: true, id: "pastebtn", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "e-icons e-paste", items: this.pasteOptions, content: "Paste", select: function (args) { this.updateContent("Paste -> " + args.item.text); }, click: function () { this.updateContent("Paste"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-cut", content: "Cut", clicked: function () { this.updateContent("Cut"); this.enablePaste(); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-copy", content: "Copy", clicked: function () { this.updateContent("Copy"); this.enablePaste(); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { this.updateContent("Format Painter"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Font", overflowHeader: "More Font Options", groupIconCss: "e-icons e-bold", isCollapsible: false, enableGroupOverflow: true, orientation: "Row", cssClass: 'font-group' },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: this.fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                                this.updateContent("Font Style -> " + args.itemData.text);
                                                            } } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ComboBox", comboBoxSettings: { dataSource: this.fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                                this.updateContent("Font Size -> " + args.itemData.text);
                                                            } } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_2.RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{ iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: function () { _this.updateContent("Bold"); } }, { iconCss: 'e-icons e-italic', content: 'Italic', click: function () { _this.updateContent("Italic"); } }, { iconCss: 'e-icons e-underline', content: 'Underline', click: function () { _this.updateContent("Underline"); } }, { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: function () { _this.updateContent("Strikethrough"); } }, { iconCss: 'e-icons e-change-case', content: 'Change Case', click: function () { _this.updateContent("Change Case"); } }] } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ColorPicker", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, displayOptions: ej2_react_ribbon_2.DisplayMode.Simplified | ej2_react_ribbon_2.DisplayMode.Classic, colorPickerSettings: { value: '#123456', change: function (args) { this.updateContent(args.currentValue.hex + " color"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Paragraph", groupIconCss: "e-icons e-align-center", orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: function () { this.updateContent("Decrease Indent"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: function () { this.updateContent("Increase Indent"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: function () { this.updateContent("Paragraph Mark"); } } }))),
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_2.RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: function () { _this.updateContent("Align Left"); } }, { iconCss: 'e-icons e-align-center', click: function () { _this.updateContent("Align Center"); } }, { iconCss: 'e-icons e-align-right', click: function () { _this.updateContent("Align Right"); } }, { iconCss: 'e-icons e-justify', click: function () { _this.updateContent("Justify"); } }] } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editing", groupIconCss: "e-icons e-edit", orientation: "Column" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-search", items: this.findOptions, content: "Find", select: function (args) { this.updateContent("Find -> " + args.item.text); }, click: function () { this.updateContent("Find"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { this.updateContent("Replace"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", splitButtonSettings: { iconCss: "e-icons e-mouse-pointer", items: this.selectOptions, content: "Select", select: function (args) { this.updateContent("Select -> " + args.item.text); }, click: function () { this.updateContent("Select"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Voice", groupIconCss: "sf-icon-dictate", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "sf-icon-dictate", items: this.dictateOptions, content: "Dictate", select: function (args) { this.updateContent("Dictate -> " + args.item.text); }, click: function () { this.updateContent("Dictate"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editor", groupIconCss: "sf-icon-editor", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-editor", content: "Editor", clicked: function () { this.updateContent("Editor"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Reuse Files", groupIconCss: "sf-icon-reuse", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", disabled: true, allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: function () { this.updateContent("Reuse Files"); } } }))))))),
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Insert' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Tables", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-table", items: this.tableOptions, content: "Table", select: function (args) { this.updateContent("Table -> " + args.item.text); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Illustration", overflowHeader: "Illustrations", id: "illustration", groupIconCss: "e-icons e-image", enableGroupOverflow: true, orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { id: 'pictureddl', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#pictureList' } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "sf-icon-shapes", items: this.shapeOptions, content: "Shapes", select: function (args) { this.updateContent("Shapes -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-3d-model", content: "3D Models", clicked: function () { this.updateContent("3D Models"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: function () { this.updateContent("Smart Art"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-chart", content: "Charts", clicked: function () { this.updateContent("Chart"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: function () { this.updateContent("Screenshot"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Header & Footer", id: "header_footer", groupIconCss: "e-icons e-table", orientation: "Column", showLauncherIcon: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-header", items: this.headerOptions, content: "Header", select: function (args) { this.updateContent("Header -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-footer", items: this.footerOptions, content: "Footer", select: function (args) { this.updateContent("Footer -> " + args.item.text); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", dropDownSettings: { iconCss: "e-icons e-page-numbering", items: this.pageOptions, content: "Page Numbering", select: function (args) { this.updateContent("Page Numbering -> " + args.item.text); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Comments", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-comment-add", content: "New Comment", clicked: function () { this.updateContent("New Comment"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Links", groupIconCss: "e-icons e-link", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-link", items: this.linkOptions, content: "Link", select: function (args) { this.updateContent("Link -> " + args.item.text); } } }))))))),
                            React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'View' },
                                React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Views", groupIconCss: 'e-icons e-print', orientation: 'Row' },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-read", content: "Read Mode", clicked: function () { this.updateContent("Read Mode"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-print", content: "Print Layout", clicked: function () { this.updateContent("Print Layout"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: function () { this.updateContent("Web Layout"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Zoom", groupIconCss: "e-icons e-zoom-to-fit", orientation: "Row" },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: function () { this.updateContent("Zoom in"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: function () { this.updateContent("Zoom out"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Show", isCollapsible: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Ruler", checked: false, change: function () { this.updateContent("Ruler"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Gridlines", checked: false, change: function () { this.updateContent("Gridlines"); } } }),
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", checkBoxSettings: { label: "Navigation Pane", checked: true, change: function () { this.updateContent("Navigation Pane"); } } }))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Dark Mode", isCollapsible: false },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", buttonSettings: { iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { this.this.updateContent("Dark Mode"); } } })))))))),
                        React.createElement(ej2_react_ribbon_1.RibbonContextualTabsDirective, null,
                            React.createElement(ej2_react_ribbon_1.RibbonContextualTabDirective, { visible: true },
                                React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "TableDesign", header: 'Table Design' },
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Table Style", groupIconCss: "e-icons e-field-settings" },
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-field-settings", content: "Table Style", items: this.tableDropdownOptions, select: function (args) { this.updateContent("Table Style -> " + args.item.text); } } }))))),
                                            React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Borders Style", groupIconCss: "e-icons e-field-settings" },
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-border-all", content: "Borders", items: this.borderDropdownOptions, select: function (args) { this.updateContent("Borders -> " + args.item.text); } } }))))))),
                                    React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "TableLayout", header: 'Table Layout' },
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Data", groupIconCss: "e-icons e-custom-sort" },
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-sort-ascending", content: "Sort Table Ascending", clicked: function () { this.updateContent("Sort Table Ascending"); } } }))),
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-sort-descending", content: "Sort Table Descending", clicked: function () { this.updateContent("Sort Table Descending"); } } }))))),
                                            React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Merge", groupIconCss: "e-icons e-merge-cells" },
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-merge-cells", content: "Merge", items: this.mergeDropdownOptions, select: function (args) { this.updateContent("Merge -> " + args.item.text); } } }))))))))),
                            React.createElement(ej2_react_ribbon_1.RibbonContextualTabDirective, { visible: false },
                                React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                                    React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { id: "Format", header: 'Picture Format' },
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Background", groupIconCss: "e-icons e-image" },
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                            React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-image", content: "Remove Background", clicked: function () { this.updateContent("Remove Background"); } } })))))))))),
                        React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_2.RibbonColorPicker, ej2_react_ribbon_1.RibbonContextualTab] })),
                    React.createElement("div", { id: "contextual-ribbonPlaceHolder", ref: function (holder) { _this.placeholderElement = holder; } },
                        React.createElement("div", { className: "content-wrap" },
                            React.createElement("div", { className: "table-content", style: { backgroundColor: "white" } },
                                React.createElement("table", { border: 1, className: "ribbon-table" },
                                    React.createElement("caption", { className: "table-header" }, "Click on the table or image to show contextual tabs."),
                                    React.createElement("tbody", { className: "table-body", ref: function (table) { _this.tableElement = table; } },
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
                                React.createElement("img", { id: "ribbonImage", ref: function (image) { _this.imageElement = image; }, className: "ribbon-image", src: "src/ribbon/images/empire-state-building.png", alt: "image" }))),
                        React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: function (toast) { return _this.toastInstance = toast; }, position: { X: 'Right' }, width: 'auto', height: 25, timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#contextual-ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { this.updateContent("Picture -> " + args.text); } }))),
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
    return Contextual;
}(sample_base_1.SampleBase));
exports.Contextual = Contextual;
