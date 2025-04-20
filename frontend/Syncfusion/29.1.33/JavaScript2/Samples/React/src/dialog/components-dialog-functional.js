"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
require("./components-dialog.css");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ComponentsDialog = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var buttons;
    var animationSettings;
    var dialogInstance = (0, react_1.useRef)(null);
    var formObject = (0, react_1.useRef)(null);
    var buttonEle;
    var buttonRef = function (element) {
        buttonEle = element;
    };
    buttons = [
        {
            click: function () {
                dialogInstance.current.hide();
            },
            buttonModel: {
                content: 'OK',
                isPrimary: true,
            },
        },
        {
            click: function () {
                dialogInstance.current.hide();
            },
            buttonModel: {
                content: 'CANCEL',
            },
        },
    ];
    animationSettings = { effect: 'None' };
    var onSubmitClick = function () {
        if (formObject.current.validate()) {
            formObject.current.element.reset();
        }
    };
    var data1 = [
        { x: new Date(2005, 0, 1), y: 21 },
        { x: new Date(2006, 0, 1), y: 24 },
        { x: new Date(2007, 0, 1), y: 36 },
        { x: new Date(2008, 0, 1), y: 38 },
        { x: new Date(2009, 0, 1), y: 54 },
        { x: new Date(2010, 0, 1), y: 57 },
        { x: new Date(2011, 0, 1), y: 70 },
    ];
    var data2 = [
        { x: new Date(2005, 0, 1), y: 28 },
        { x: new Date(2006, 0, 1), y: 44 },
        { x: new Date(2007, 0, 1), y: 48 },
        { x: new Date(2008, 0, 1), y: 50 },
        { x: new Date(2009, 0, 1), y: 66 },
        { x: new Date(2010, 0, 1), y: 78 },
        { x: new Date(2011, 0, 1), y: 84 },
    ];
    var onDragStart = function (args) {
        args.navigation.enable = true;
    };
    var headerText = [
        { text: 'Grid' },
        { text: 'Scheduler' },
        { text: 'Chart' },
        { text: 'Rich Text Editor' },
        { text: 'Form' },
    ];
    var content0 = function () {
        return (React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.gridData, allowPaging: true, pageSettings: { pageSize: 5, pageSizes: true } },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "OrderID", headerText: "Order ID", width: "120", textAlign: "Right" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "CustomerName", headerText: "Customer Name", width: "150" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "OrderDate", headerText: "Order Date", width: "130", format: "yMd", textAlign: "Right" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Freight", headerText: "Freight", width: "120", format: "C2", textAlign: "Right" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "ShippedDate", headerText: "Shipped Date", width: "130", format: "yMd", textAlign: "Right" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "ShipCountry", headerText: "Ship Country", width: "150" })),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] })));
    };
    var content1 = function () {
        return (React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: "300px", selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: data_1.scheduleData }, dragStart: onDragStart },
            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "Day" }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "Week" }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "WorkWeek" }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "Month" }),
                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "Agenda" })),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })));
    };
    var content2 = function () {
        return (React.createElement(ej2_react_charts_1.ChartComponent, { id: "DialogChart", primaryXAxis: { valueType: 'DateTime', labelFormat: 'y', intervalType: 'Years', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, }, load: load, primaryYAxis: { labelFormat: '{value}%', rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, }, chartArea: { border: { width: 0 } }, tooltip: { enable: true }, width: "100%", height: "300px", title: "Inflation - Consumer Price", loaded: onChartLoad },
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: "x", yName: "y", name: "Germany", width: 2, marker: { visible: true, width: 10, height: 10 }, type: "Line" }),
                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: "x", yName: "y", name: "England", width: 2, marker: { visible: true, width: 10, height: 10 }, type: "Line" }))));
    };
    var content3 = function () {
        return (React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE" },
            React.createElement("p", null, "The rich text editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
            React.createElement("p", null,
                React.createElement("b", null, "Key features:")),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                React.createElement("li", null,
                    React.createElement("p", null, "Capable of handling markdown editing.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains a modular library to load the necessary functionality ondemand.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides a fully customizable toolbar.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Supports third-party library integration.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Allows preview of modified content before saving it.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains undo/redo manager.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Creates bulleted and numbered lists."))),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] })));
    };
    var content4 = function () {
        return (React.createElement("div", { id: "formComponents" },
            React.createElement("h4", { className: "form-title" }, "Add Customer details"),
            React.createElement("div", { className: "validation_wrapper" },
                React.createElement("form", { id: "formId", className: "form-horizontal" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "user", name: "user", "data-msg-containerid": "userError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "name" }, "User Name")),
                        React.createElement("div", { id: "userError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement(ej2_react_calendars_1.DatePickerComponent, { placeholder: "Date of Birth", id: "dob", name: "dob", "data-msg-containerid": "dobError" }),
                            React.createElement("span", { className: "e-float-line" })),
                        React.createElement("div", { id: "dobError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("textarea", { id: "Address", name: "Address" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "mobile" }, "Address")),
                        React.createElement("div", { id: "noError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "city", name: "city", "data-msg-containerid": "cityError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "city" }, "City")),
                        React.createElement("div", { id: "cityError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "state", name: "state", "data-msg-containerid": "stateError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "state" }, "State")),
                        React.createElement("div", { id: "stateError" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "submitRow" },
                            React.createElement("div", { style: { display: 'inline-block' } },
                                React.createElement("button", { id: "submit-btn", className: "samplebtn e-control e-btn e-primary e-submit-btn", onClick: onSubmitClick, type: "submit", "data-ripple": "true" }, "Add Customer")),
                            React.createElement("div", { style: { float: 'right' } },
                                React.createElement("button", { id: "resetbtn", className: "samplebtn e-control e-btn e-reset-btn", type: "reset", "data-ripple": "true" }, "Clear"))))),
                React.createElement("br", null),
                React.createElement("br", null))));
    };
    var load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    var onChartLoad = function () {
        var chart = document.getElementById('DialogChart');
        chart.setAttribute('title', '');
    };
    var buttonClick = function () {
        dialogInstance.current.show();
    };
    var dialogClose = function () {
        buttonEle.style.display = 'block';
    };
    var dialogOpen = function () {
        buttonEle.style.display = 'none';
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "targetElement", className: "control-section col-lg-12 defaultDialogComponent dialog-target" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", ref: buttonRef, onClick: buttonClick, id: "dialogBtn" }, "Open"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultDialog", showCloseIcon: true, ref: dialogInstance, animationSettings: animationSettings, visible: true, width: '700px', target: '#targetElement', header: "Syncfusion Components inside Dialog", buttons: buttons, open: dialogOpen, close: dialogClose },
                React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab-wizard" },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[0], content: content0 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[1], content: content1 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[2], content: content2 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[3], content: content3 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[4], content: content4 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press Esc This example demonstrates how to integrate other React UI components within the dialog control. In the below example, The dialog component renders with the Grid, Schedule, Chart, Rich Text Editor, Tabs and Form components.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Since the dialog is container component, you can integrate other React UI components within the dialog. The dialog can be renders with simple plain-text, HTML string, or React UI components. In the above sample, used major components such as Grid, Schedule, Chart, and Rich Text Editor inside dialog."))));
};
exports.default = ComponentsDialog;
