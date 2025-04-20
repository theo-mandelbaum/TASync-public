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
exports.KeyTip = void 0;
var React = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./keytip.css");
var data = require("./dataSource/datasource.json");
var KeyTip = /** @class */ (function (_super) {
    __extends(KeyTip, _super);
    function KeyTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
        _this.findOptions = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
        _this.selectOptions = [{ text: "Select All" }, { text: "Select Objects" }];
        _this.dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
        _this.tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel Spreadsheet" }];
        _this.shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
        _this.headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
        _this.footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
        _this.pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
        _this.linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
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
        _this.isBackstageOpened = false;
        _this.menuItems = [
            { id: 'home', text: 'Home', iconCss: 'e-icons e-home', content: _this.getBackstageContent('home'), keyTip: 'H' },
            { id: 'new', text: 'New', iconCss: 'e-icons e-file-new', content: _this.getBackstageContent('new'), keyTip: 'N' },
            { id: 'open', text: 'Open', iconCss: 'e-icons e-folder-open', content: _this.getBackstageContent('open'), keyTip: 'O' },
            { separator: true },
            { id: 'info', text: 'Info', content: _this.getBackstageContent('info'), keyTip: 'I' },
            { id: 'saveAs', text: 'Save as', content: _this.getBackstageContent('save'), keyTip: 'S' },
            { id: 'export', text: 'Export', content: _this.getBackstageContent('export'), keyTip: 'M' },
            { id: 'print', text: 'Print', backStageItemClick: _this.backstageClickHandler.bind(_this), keyTip: 'P' },
            { id: 'share', text: 'Share', content: _this.getBackstageContent('share'), keyTip: 'Z' },
            { separator: true, isFooter: true },
            { id: 'account', text: 'Account', isFooter: true, content: _this.getBackstageContent('account'), keyTip: 'D' },
            { id: 'feedback', text: 'Feedback', isFooter: true, content: _this.getBackstageContent('feedback'), keyTip: 'K' }
        ];
        return _this;
    }
    KeyTip.prototype.enablePaste = function () {
        if (!this.isPasteDisabled) {
            return;
        }
        this.ribbonObj.enableItem('pastebtn');
        this.isPasteDisabled = false;
    };
    KeyTip.prototype.updateContent = function (args) {
        this.toastInstance.show({ content: "Last clicked item is " + args });
    };
    KeyTip.prototype.launchClick = function (args) {
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
    KeyTip.prototype.handleClickInsideBackstageContent = function (e) {
        e.stopPropagation();
        var cName = e.target.className;
        if (cName !== "section-title" && cName !== "home-wrapper" && cName !== "new-wrapper" && cName !== "block-wrapper" && cName !== "e-ribbon-backstage-content") {
            this.ribbonObj.ribbonBackstageModule.hideBackstage();
            this.toastInstance.show({ content: 'Backstage content is interacted and closed.' });
            this.ribbonObj.element.querySelector('.e-ribbon-backstage-content').removeEventListener('click', this.handleClickInsideBackstageContent.bind(this));
        }
    };
    KeyTip.prototype.backstageClickHandler = function () {
        this.ribbonObj.ribbonBackstageModule.hideBackstage();
        this.toastInstance.show({ content: 'Print action is selected' });
    };
    KeyTip.prototype.getBackstageContent = function (item) {
        var homeContentTemplate = "<div class='home-wrapper'>{{newSection}}{{recentSection}}</div>";
        var newSection = "<div class='new-wrapper'><div class='section-title'> New </div><div class='category_container'><div class='doc_category_image'></div> <span class='doc_category_text'> New document </span></div></div>";
        var recentSection = "<div class='block-wrapper'><div class='section-title'> Recent </div>{{recentWrapper}}</div>";
        var recentWrapper = "<div class='section-content'><table><tbody><tr><td> <span class='doc_icon e-icons {{icon}}'></span> </td><td><span style='display: block; font-size: 14px'> {{title}} </span><span style='font-size: 12px'> {{description}} </span></td></tr></tbody></table></div>";
        var blockSection = "<div class='block-wrapper'> <div class='section-title'> {{blockTitle}} </div> {{blockSection}} </div>";
        var content = "";
        var recentDocUpdatedString = "";
        switch (item) {
            case 'home': {
                data['recentDocuments'].slice(0, 3).forEach(function (doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
                var updatedRecentSection = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                content = homeContentTemplate.replace(/{{newSection}}/g, newSection).replace(/{{recentSection}}/g, updatedRecentSection);
                break;
            }
            case 'new': {
                content = newSection;
                break;
            }
            case 'open': {
                data['recentDocuments'].forEach(function (doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
                content = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                break;
            }
            default:
                data['dataOptions'][item].forEach(function (doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, doc.icon).replace(/{{title}}/g, doc.title).replace(/{{description}}/g, doc.description); });
                content = blockSection.replace(/{{blockSection}}/g, recentDocUpdatedString).replace(/{{blockTitle}}/g, (item.charAt(0).toUpperCase() + item.slice(1)));
                break;
        }
        return content;
    };
    KeyTip.prototype.ribbonCreated = function () {
        if (!this.isBackstageOpened) {
            this.ribbonObj.element.querySelector('.e-ribbon-backstage').addEventListener('click', this.backstageClick.bind(this));
        }
        this.ribbonObj.ribbonKeyTipModule.showKeyTips();
    };
    KeyTip.prototype.backstageClick = function () {
        this.isBackstageOpened = true;
        this.ribbonObj.element.querySelector('.e-ribbon-backstage-content').addEventListener('click', this.handleClickInsideBackstageContent.bind(this));
    };
    KeyTip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section ribbon-keytip-section' },
                React.createElement("div", { className: 'control ribbon-sample' },
                    React.createElement("div", { id: "ribbonContainer", className: 'ribbon-keytip-container' },
                        React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'keytip-ribbon', ref: function (ribbonDefault) { _this.ribbonObj = ribbonDefault; }, enableKeyTips: true, layoutSwitcherKeyTip: "ZR", backStageMenu: { text: 'File', visible: true, items: this.menuItems, backButton: { text: 'Close' } }, created: this.ribbonCreated, launcherIconClick: this.launchClick },
                            React.createElement(ej2_react_ribbon_1.RibbonTabsDirective, null,
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Home', keyTip: "H" },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Clipboard", id: 'clipboard', groupIconCss: "e-icons e-paste" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", disabled: true, keyTip: 'V', id: "pastebtn", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "e-icons e-paste", items: this.pasteOptions, content: "Paste", select: function (args) { this.updateContent("Paste -> " + args.item.text); }, click: function () { this.updateContent("Paste"); } } }))),
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'X', buttonSettings: { iconCss: "e-icons e-cut", content: "Cut", clicked: function () { this.updateContent("Cut"); this.enablePaste(); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'C', buttonSettings: { iconCss: "e-icons e-copy", content: "Copy", clicked: function () { this.updateContent("Copy"); this.enablePaste(); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'FP', buttonSettings: { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { this.updateContent("Format Painter"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Font", overflowHeader: "More Font Options", groupIconCss: "e-icons e-bold", isCollapsible: false, launcherIconKeyTip: "FJ", showLauncherIcon: true, enableGroupOverflow: true, orientation: "Row", cssClass: 'font-group' },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ComboBox", keyTip: 'FF', comboBoxSettings: { dataSource: this.fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                                    this.updateContent("Font Style -> " + args.itemData.text);
                                                                } } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ComboBox", keyTip: 'FS', comboBoxSettings: { dataSource: this.fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: function (args) { if (args.itemData) {
                                                                    this.updateContent("Font Size -> " + args.itemData.text);
                                                                } } } }))),
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "ColorPicker", keyTip: 'CP', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, displayOptions: ej2_react_ribbon_2.DisplayMode.Simplified | ej2_react_ribbon_2.DisplayMode.Classic, colorPickerSettings: { value: '#123456', change: function (args) { this.updateContent(args.currentValue.hex + " color"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '1', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: function () { this.updateContent("Bold"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '2', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: function () { this.updateContent("Italic"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '3', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: function () { this.updateContent("Underline"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '4', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: function () { this.updateContent("Strikethrough"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '5', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: function () { this.updateContent("Change case"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Paragraph", launcherIconKeyTip: "PG", showLauncherIcon: true, groupIconCss: "e-icons e-align-center", orientation: "Row" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'AO', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: function () { this.updateContent("Decrease Indent"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'AI', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: function () { this.updateContent("Increase Indent"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'FM', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: function () { this.updateContent("Paragraph Mark"); } } }))),
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "GroupButton", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, groupButtonSettings: { selection: ej2_react_ribbon_2.RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: function () { _this.updateContent("Align Left"); }, keyTip: "AL" }, { iconCss: 'e-icons e-align-center', click: function () { _this.updateContent("Align Center"); }, keyTip: "AC" }, { iconCss: 'e-icons e-align-right', click: function () { _this.updateContent("Align Right"); }, keyTip: "AR" }, { iconCss: 'e-icons e-justify', click: function () { _this.updateContent("Justify"); }, keyTip: "AJ" }] } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editing", groupIconCss: "e-icons e-edit", orientation: "Column" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", keyTip: 'FD', splitButtonSettings: { iconCss: "e-icons e-search", items: this.findOptions, content: "Find", select: function (args) { this.updateContent("Find -> " + args.item.text); }, click: function () { this.updateContent("Find"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'R', buttonSettings: { iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { this.updateContent("Replace"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", keyTip: 'S', splitButtonSettings: { iconCss: "e-icons e-mouse-pointer", items: this.selectOptions, content: "Select", select: function (args) { this.updateContent("Select -> " + args.item.text); }, click: function () { this.updateContent("Select"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Voice", groupIconCss: "sf-icon-dictate", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "SplitButton", keyTip: 'D', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, splitButtonSettings: { iconCss: "sf-icon-dictate", items: this.dictateOptions, content: "Dictate", select: function (args) { this.updateContent("Dictate -> " + args.item.text); }, click: function () { this.updateContent("Dictate"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Editor", groupIconCss: "sf-icon-editor", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-editor", content: "Editor", clicked: function () { this.updateContent("Editor"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Reuse Files", groupIconCss: "sf-icon-reuse", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'RF', disabled: true, allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: function () { this.updateContent("Reuse Files"); } } }))))))),
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'Insert', keyTip: "N" },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Tables", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'T', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-table", items: this.tableOptions, content: "Table", select: function (args) { this.updateContent("Table -> " + args.item.text); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Illustration", overflowHeader: "Illustrations", id: "illustration", groupIconCss: "e-icons e-image", enableGroupOverflow: true, orientation: "Row" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { id: 'pictureddl', keyTip: 'P', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#default-pictureList' } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'SA', dropDownSettings: { iconCss: "sf-icon-shapes", items: this.shapeOptions, content: "Shapes", select: function (args) { this.updateContent("Shapes -> " + args.item.text); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: '3D', buttonSettings: { iconCss: "sf-icon-3d-model", content: "3D Models", clicked: function () { this.updateContent("3D Models"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'M', buttonSettings: { iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: function () { this.updateContent("Smart Art"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'CC', buttonSettings: { iconCss: "sf-icon-chart", content: "Charts", clicked: function () { this.updateContent("Chart"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'SS', buttonSettings: { iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: function () { this.updateContent("Screenshot"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Header & Footer", id: "header_footer", groupIconCss: "e-icons e-table", orientation: "Column", showLauncherIcon: true },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'H', dropDownSettings: { iconCss: "e-icons e-header", items: this.headerOptions, content: "Header", select: function (args) { this.updateContent("Header -> " + args.item.text); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'HF', dropDownSettings: { iconCss: "e-icons e-footer", items: this.footerOptions, content: "Footer", select: function (args) { this.updateContent("Footer -> " + args.item.text); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'NU', dropDownSettings: { iconCss: "e-icons e-page-numbering", items: this.pageOptions, content: "Page Numbering", select: function (args) { this.updateContent("Page Numbering -> " + args.item.text); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Comments", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'C', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, buttonSettings: { iconCss: "e-icons e-comment-add", content: "New Comment", clicked: function () { this.updateContent("New Comment"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Links", groupIconCss: "e-icons e-link", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "DropDown", keyTip: 'L2', allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, dropDownSettings: { iconCss: "e-icons e-link", items: this.linkOptions, content: "Link", select: function (args) { this.updateContent("Link -> " + args.item.text); } } }))))))),
                                React.createElement(ej2_react_ribbon_1.RibbonTabDirective, { header: 'View', keyTip: "W" },
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupsDirective, null,
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Views", groupIconCss: 'e-icons e-print', orientation: 'Row' },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'F', buttonSettings: { iconCss: "sf-icon-read", content: "Read Mode", clicked: function () { this.updateContent("Read Mode"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'LP', buttonSettings: { iconCss: "e-icons e-print", content: "Print Layout", clicked: function () { this.updateContent("Print Layout"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'W', buttonSettings: { iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: function () { this.updateContent("Web Layout"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Zoom", groupIconCss: "e-icons e-zoom-to-fit", orientation: "Row" },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'Q', buttonSettings: { iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: function () { this.updateContent("Zoom in"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'J', buttonSettings: { iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: function () { this.updateContent("Zoom out"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Show", isCollapsible: true },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", keyTip: 'VR', checkBoxSettings: { label: "Ruler", checked: false, change: function () { this.updateContent("Ruler"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", keyTip: 'VG', checkBoxSettings: { label: "Gridlines", checked: false, change: function () { this.updateContent("Gridlines"); } } }),
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "CheckBox", keyTip: 'VN', checkBoxSettings: { label: "Navigation Pane", checked: true, change: function () { this.updateContent("Navigation Pane"); } } }))))),
                                        React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Dark Mode", isCollapsible: false },
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                    React.createElement(ej2_react_ribbon_2.RibbonItemsDirective, null,
                                                        React.createElement(ej2_react_ribbon_2.RibbonItemDirective, { type: "Button", keyTip: 'D', buttonSettings: { iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { this.this.updateContent("Dark Mode"); } } })))))))),
                            React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_2.RibbonColorPicker, ej2_react_ribbon_2.RibbonBackstage, ej2_react_ribbon_2.RibbonKeyTip] })),
                        React.createElement("div", { id: "keytip-ribbonPlaceHolder" },
                            React.createElement("div", { className: "content1" }),
                            React.createElement("div", { className: "content2" }),
                            React.createElement("div", { className: "content3" }),
                            React.createElement("div", { className: "content4" }),
                            React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: function (toast) { return _this.toastInstance = toast; }, position: { X: 'Right' }, width: 'auto', height: 25, timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#keytip-ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'keytip-pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { this.updateContent("Picture -> " + args.text); } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the KeyTips functionality in the Ribbon. Users can press specific keys or key combinations to perform actions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, " The KeyTips feature enables quick access to tabs or ribbon items using keyboard actions. "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Alt + Windows/Command")),
                        React.createElement("span", null, " - To Display the KeyTips ")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Esc")),
                        React.createElement("span", null, " - To close the KeyTips or traverse through the items."))),
                React.createElement("p", null,
                    "In this sample, the keytips are configured for all ribbon items and backstage using the ",
                    React.createElement("code", null, "keytip"),
                    " property. The KeyTips are initially shown using the ",
                    React.createElement("code", null, "showKeytips()"),
                    " method."))));
    };
    return KeyTip;
}(sample_base_1.SampleBase));
exports.KeyTip = KeyTip;
