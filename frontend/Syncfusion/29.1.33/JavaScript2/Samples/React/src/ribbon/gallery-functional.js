"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_ribbon_1 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_ribbon_2 = require("@syncfusion/ej2-react-ribbon");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./gallery.css");
var Gallery = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ribbonObj = (0, react_1.useRef)(null);
    var gallerySettings = ({
        select: function (args) {
            updateContent("Gallery -> " + args.currentItem.content);
        },
        popupWidth: '544px',
        itemCount: 3,
        groups: [{
                itemWidth: '100',
                itemHeight: '40',
                header: 'Title and Headings',
                items: [
                    {
                        content: 'Heading 1',
                        cssClass: 'heading_1'
                    },
                    {
                        content: 'Heading 2',
                        cssClass: 'heading_2'
                    }, {
                        content: 'Heading 3',
                        cssClass: 'heading_3'
                    }, {
                        content: 'Heading 4',
                        cssClass: 'heading_4'
                    }, {
                        content: 'Title',
                        cssClass: 'title'
                    }, {
                        content: 'Total',
                        cssClass: 'total'
                    }
                ]
            }, {
                itemWidth: '100',
                itemHeight: '40',
                header: 'Data and Model',
                items: [
                    {
                        content: 'Calculation',
                        cssClass: 'calculation'
                    },
                    {
                        content: 'Check Cell',
                        cssClass: 'check-cell'
                    }, {
                        content: 'Hyperlink',
                        cssClass: 'hyperlink'
                    }, {
                        content: 'Input',
                        cssClass: 'input'
                    }, {
                        content: 'Linked Cell',
                        cssClass: 'linked-cell'
                    }, {
                        content: 'Note',
                        cssClass: 'note'
                    }
                ]
            }, {
                itemWidth: '100',
                itemHeight: '40',
                header: 'Good, Bad and Neutral',
                items: [{
                        content: 'Normal',
                        cssClass: 'normal'
                    }, {
                        content: 'Bad',
                        cssClass: 'bad'
                    }, {
                        content: 'Good',
                        cssClass: 'good'
                    }, {
                        content: 'Neutral',
                        cssClass: 'neutral'
                    }
                ]
            }]
    });
    var pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    var tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    var shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    var headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    var footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    var pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    var linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
    var dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
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
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section ribbon-gallery-section' },
            React.createElement("div", { className: 'control ribbon-sample' },
                React.createElement("div", { id: "gallery-ribbonContainer", className: 'ribbon-gallery-container' },
                    React.createElement(ej2_react_ribbon_1.RibbonComponent, { id: 'gallery-ribbon', cssClass: 'ribbonGallery', ref: ribbonObj, fileMenu: { visible: true, menuItems: fileOptions, select: fileSelect }, launcherIconClick: launchClick },
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
                                    React.createElement(ej2_react_ribbon_1.RibbonGroupDirective, { header: "Gallery", id: "gallery", groupIconCss: "e-icons e-paste", showLauncherIcon: true },
                                        React.createElement(ej2_react_ribbon_1.RibbonCollectionsDirective, null,
                                            React.createElement(ej2_react_ribbon_1.RibbonCollectionDirective, null,
                                                React.createElement(ej2_react_ribbon_1.RibbonItemsDirective, null,
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { type: "Gallery", allowedSizes: ej2_react_ribbon_2.RibbonItemSize.Large, gallerySettings: gallerySettings }))))),
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
                                                    React.createElement(ej2_react_ribbon_1.RibbonItemDirective, { id: 'pictureddl', type: "DropDown", dropDownSettings: { iconCss: "e-icons e-image", content: "Pictures", target: '#gallery-pictureList' } }),
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
                        React.createElement(ej2_react_ribbon_2.Inject, { services: [ej2_react_ribbon_2.RibbonFileMenu, ej2_react_ribbon_1.RibbonColorPicker, ej2_react_ribbon_2.RibbonGallery] })),
                    React.createElement("div", { id: "gallery-ribbonPlaceHolder" },
                        React.createElement("div", { className: "content1" }),
                        React.createElement("div", { className: "content2" }),
                        React.createElement("div", { className: "content3" }),
                        React.createElement("div", { className: "content4" }),
                        React.createElement(ej2_react_notifications_1.ToastComponent, { id: 'toast', ref: toastInstance, position: { X: 'Right' }, width: 'auto', height: 25, timeOut: 2000, cssClass: 'e-toast-info', showCloseButton: true, target: "#gallery-ribbonPlaceHolder", newestOnTop: true, animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } } })),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'gallery-pictureList', dataSource: ['This Device', 'Stock Images', 'Online Images'], showHeader: true, headerTitle: "Insert Picture From", select: function (args) { updateContent("Picture -> " + args.text); } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the functionality of the Ribbon Gallery item.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Ribbon Gallery item enables to perform specific actions by displaying a collection of related items, including icons, content, or images. In this sample, the gallery item is added to showcase a collection of items with content using ",
                React.createElement("code", null, "gallerySettings"),
                " property with the defined type as ",
                React.createElement("code", null, "RibbonItemType.Gallery"),
                ". Each collection can be grouped using ",
                React.createElement("code", null, "groups"),
                " property with defined group name using ",
                React.createElement("code", null, "header"),
                " property. Each item's content is added using ",
                React.createElement("code", null, "content"),
                " property, and its customization using ",
                React.createElement("code", null, "itemWidth"),
                ", ",
                React.createElement("code", null, "itemHeight"),
                ", and ",
                React.createElement("code", null, "cssClass"),
                " properties."))));
};
exports.default = Gallery;
