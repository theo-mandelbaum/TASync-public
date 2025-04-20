"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./backstage.css");
var data = require("./dataSource/datasource.json");
var Backstage = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ribbonObj = (0, react_1.useRef)(null);
    var pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    var findOptions = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    var selectOptions = [{ text: "Select All" }, { text: "Select Objects" }];
    var dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    var tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel Spreadsheet" }];
    var shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    var headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    var footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    var pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    var linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
    var fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    var fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
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
    var getBackstageContent = function (item) {
        var homeContentTemplate = "<div class='home-wrapper'>{{newSection}}{{recentSection}}</div>";
        var newSection = "<div class='new-wrapper'><div class='section-title'> New </div><div class='category_container'><div class='doc_category_image'></div> <span class='doc_category_text'> New document </span></div></div>";
        var recentSection = "<div class='block-wrapper'><div class='section-title'> Recent </div>{{recentWrapper}}</div>";
        var recentWrapper = "<div class='section-content'><table><tbody><tr><td> <span class='doc_icon e-icons {{icon}}'></span> </td><td><span style='display: block; font-size: 14px'> {{title}} </span><span style='font-size: 12px'> {{description}} </span></td></tr></tbody></table></div>";
        var blockSection = "<div class='block-wrapper'> <div class='section-title'> {{blockTitle}} </div> {{blockSection}} </div>";
        var content = "";
        var recentDocUpdatedString = "";
        switch (item) {
            case 'home': {
                data['recentDocuments'].slice(0, 4).forEach(function (doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
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
    var isBackstageOpened = false;
    var handleClickInsideBackstageContent = function (e) {
        e.stopPropagation();
        var cName = e.target.className;
        if (cName !== "section-title" && cName !== "home-wrapper" && cName !== "new-wrapper" && cName !== "block-wrapper" && cName !== "e-ribbon-backstage-content") {
            ribbonObj.current.ribbonBackstageModule.hideBackstage();
            toastInstance.current.show({ content: 'Backstage content is interacted and closed.' });
            ribbonObj.current.element.querySelector('.e-ribbon-backstage-content').removeEventListener('click', handleClickInsideBackstageContent);
        }
    };
    var ribbonCreated = function () {
        if (!isBackstageOpened) {
            ribbonObj.current.element.querySelector('.e-ribbon-backstage').addEventListener('click', function () {
                isBackstageOpened = true;
                ribbonObj.current.element.querySelector('.e-ribbon-backstage-content').addEventListener('click', handleClickInsideBackstageContent);
            });
        }
    };
    var backstageClickHandler = function () {
        ribbonObj.current.ribbonBackstageModule.hideBackstage();
        toastInstance.current.show({ content: 'Print action is selected' });
    };
    var menuItems = [
        { id: 'home', text: 'Home', iconCss: 'e-icons e-home', content: getBackstageContent('home') },
        { id: 'new', text: 'New', iconCss: 'e-icons e-file-new', content: getBackstageContent('new') },
        { id: 'open', text: 'Open', iconCss: 'e-icons e-folder-open', content: getBackstageContent('open') },
        { separator: true },
        { text: 'Info', content: getBackstageContent('info') },
        { text: 'Save as', content: getBackstageContent('save') },
        { text: 'Export', content: getBackstageContent('export') },
        { text: 'Print', backStageItemClick: backstageClickHandler },
        { text: 'Share', content: getBackstageContent('share') },
        { separator: true, isFooter: true },
        { text: 'Account', isFooter: true, content: getBackstageContent('account') },
        { text: 'Feedback', isFooter: true, content: getBackstageContent('feedback') }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section ribbon-backstage-section' },
            React.createElement("div", { className: 'control ribbon-sample' },
                React.createElement("div", { id: "ribbonContainer", className: 'ribbon-backstage-container' },
                    React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'backstage-ribbon', ref: ribbonObj, backStageMenu: { text: 'File', visible: true, items: menuItems, backButton: { text: 'Close' } }, created: ribbonCreated, launcherIconClick: launchClick },
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
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "ColorPicker", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, displayOptions: ej2_react_ribbon_1.DisplayMode.Simplified | ej2_react_ribbon_1.DisplayMode.Classic, colorPickerSettings: { value: '#123456', change: function (args) { updateContent(args.currentValue.hex + " color"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: function () { updateContent("Bold"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: function () { updateContent("Italic"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: function () { updateContent("Underline"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: function () { updateContent("Strikethrough"); } } }),
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Button", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Small, buttonSettings: { iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: function () { updateContent("Change case"); } } }))))),
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
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { id: 'pictureddl', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#default-pictureList' } }),
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
                        React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_1.RibbonColorPicker, ej2_react_ribbon_2.RibbonBackstage] })),
                    React.createElement("div", { id: "default-ribbonPlaceHolder" },
                        React.createElement("div", { className: "content1" }),
                        React.createElement("div", { className: "content2" }),
                        React.createElement("div", { className: "content3" }),
                        React.createElement("div", { className: "content4" }),
                        React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: toastInstance, position: { X: 'Right' }, width: 'auto', height: 25, timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#default-ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'default-pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { updateContent("Picture -> " + args.text); } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the basic ribbon backstage view.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Ribbon backstage is a place for handling files, settings, and document-related tasks. It simplifies user interactions with documents and app preferences, improving efficiency and organization."))));
};
exports.default = Backstage;
