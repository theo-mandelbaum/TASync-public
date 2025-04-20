"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./dock.css");
function Dock() {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dockBar = (0, react_1.useRef)(null);
    //Toolbar component template element specification
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">React Documentation</div></div>';
    var ListData = [
        { id: "1", text: "Grid", iconcss: "sb-icons icon-grid e-sb-icon control-icon",
            description: "The React DataGrid is a feature-rich component useful for" +
                "displaying data in a tabular format. Its wide range of functionalities" +
                "includes data binding, editing, Excel-like filtering, custom sorting," +
                "aggregating rows, selection, and support for Excel, CSV, and PDF formats." +
                "It loads millions of records in just a second. It has flexible editing and intuitive record selection modes." +
                "Also, it has seamless data exporting options like PDF, CSV, and Excel." },
        { id: "2", text: "Chart", iconcss: "sb-icons icon-chart e-sb-icon control-icon",
            description: "The React Charts is a well-crafted charting component to visualize data." +
                "It contains a rich UI gallery of 30+ charts and graphs, ranging from line to financial" +
                " that cater to all charting scenarios. Its high performance helps to render large amounts of data quickly." +
                "It also comes with features such as zooming, panning, tooltip, crosshair, trackball, highlight, and selection" },
        { id: "3", text: "Datepicker", iconcss: "sb-icons icon-datepicker e-sb-icon control-icon",
            description: "The React DatePicker is a lightweight and mobile-friendly component that allows" +
                "end-users to enter or select a date value. It has month, year, and decade view options to quickly" +
                "navigate to the desired date. It supports minimum dates, maximum dates, and disabled dates to restrict the date selection." +
                "It has built-in features such as validation, custom date formats, range restriction, and disable dates to enhance the progressive usage." },
        { id: "4", text: "Dialog", iconcss: "sb-icons icon-dialog e-sb-icon control-icon",
            description: "The React Dialog is a useful user interface (UI) component for informing users" +
                "about critical information, errors, warnings, and questions, as well as confirming decisions and collecting" +
                "input from users. The component has a rich set of built-in features such as action buttons, positioning, animations," +
                "dragging, resizing, templating, and more with mobile dialog support. The React dialog provides two different types:" +
                "modal dialogs and non-modal dialogs (modeless) based on interactions." },
        { id: "5", text: "Dropdown List", iconcss: "sb-icons icon-dropdownlist e-sb-icon control-icon",
            description: "The React Dropdown List is a quick replacement of the HTML select tags." +
                "It has a rich appearance and allows users to select a single value that is non-editable" +
                " from a list of predefined values. It has several out-of-the-box features, such as data binding," +
                " filtering, grouping, UI customization, accessibility, and preselected values." }
    ];
    var _a = (0, react_1.useState)(ListData[0].description.toString()), description = _a[0], setDescription = _a[1];
    var listFields = { id: "id", text: "text", iconCss: "iconcss" };
    var toolbarCliked = function (args) {
        if (args.item.tooltipText == "Menu") {
            dockBar.current.toggle();
        }
    };
    var onSelect = function (args) {
        setDescription(args.data.description);
    };
    return (React.createElement("div", { className: "control-section", id: "dock-wrapper" },
        React.createElement("div", null,
            React.createElement(ej2_react_navigations_1.ToolbarComponent, { cssClass: "dockToolbar", id: "dockToolbar", clicked: toolbarCliked.bind(this) },
                React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" }),
                    React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle })))),
        React.createElement("div", { id: "main-content container-fluid col-md-12", className: "dockmaincontent" },
            React.createElement("div", null,
                React.createElement("div", { id: "dockContent", className: "dockContent" }, description))),
        React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "dockSidebar", ref: dockBar, className: "dockSidebar", width: "220px", dockSize: "60px", target: ".dockmaincontent", enableDock: true, type: "Auto" },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "dockList", dataSource: ListData, cssClass: "e-template-list", showIcon: true, fields: listFields, select: onSelect.bind(this) })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " dock sample demonstrates the dock functionalities of the ",
                React.createElement("code", null, "Sidebar"),
                ". Click on the hamburger menu icon to expand/collapse the sidebar with dock state.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Dock state of the Sidebar reserves some space on the page that always remains in a visible state when the Sidebar is collapsed. It is used to show the short term of a content like icons alone instead of lengthy text."),
            React.createElement("p", null,
                "In this demo, the list item has an icon with text representation. On dock state, only the icon listed out to interact. It can be achieved by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar/#enabledock" }, "EnableDock"),
                " property."))));
}
exports.default = Dock;
