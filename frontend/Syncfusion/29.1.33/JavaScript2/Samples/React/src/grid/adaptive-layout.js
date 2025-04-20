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
exports.AdaptiveLayout = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_grids_2 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./adaptive-layout.css");
// custom code start
var SAMPLE_CSS = "\n.e-bigger.e-responsive-dialog .e-dlg-content {\n  padding: 16px;\n}\n\n/* The device with borders */\n.e-mobile-layout {\n  position: relative;\n  width: 360px;\n  height: 640px;\n  margin: auto;\n  border: 16px #f4f4f4 solid;\n  border-top-width: 60px;\n  border-bottom-width: 60px;\n  border-radius: 36px;\n  box-shadow: 0 0px 2px rgb(144 144 144), 0 0px 10px rgb(0 0 0 / 16%);\n}\n\n.tailwind-dark .e-mobile-layout,\n.material-dark .e-mobile-layout,\n.fabric-dark .e-mobile-layout,\n.bootstrap-dark .e-mobile-layout,\n.bootstrap5-dark .e-mobile-layout {\n  border: 16px rgb(255 255 255 / 10%) solid;\n  border-top-width: 60px;\n  border-bottom-width: 60px;\n}\n\n/* The horizontal line on the top of the device */\n.e-mobile-layout:before {\n  content: '';\n  display: block;\n  width: 60px;\n  height: 5px;\n  position: absolute;\n  top: -30px;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: #ebebeb;\n  border-radius: 10px;\n}\n\n.tailwind-dark .e-mobile-layout::before,\n.tailwind-dark .e-mobile-layout::after,\n.material-dark .e-mobile-layout::before,\n.material-dark .e-mobile-layout::after,\n.fabric-dark .e-mobile-layout::before,\n.fabric-dark .e-mobile-layout::after,\n.bootstrap-dark .e-mobile-layout::before,\n.bootstrap-dark .e-mobile-layout::after,\n.bootstrap5-dark .e-mobile-layout::before,\n.bootstrap5-dark .e-mobile-layout::after {\n  background: rgb(255 255 255  / 20%);\n}\n\n/* The circle on the bottom of the device */\n.e-mobile-layout:after {\n  content: '';\n  display: block;\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  left: 50%;\n  bottom: -65px;\n  transform: translate(-50%, -50%);\n  background: #e8e8e8;\n  border-radius: 50%;\n}\n\n/* The screen (or content) of the device */\n.e-mobile-layout .e-mobile-content {\n  overflow: hidden;\n  width: 328px;\n  height: 100%;\n  background: transparent;\n  border: 0px solid #dddddd;\n}\n\n.highcontrast .e-mobile-layout {\n    border: 16px #000000 solid;\n    border-top-width: 60px;\n    border-bottom-width: 60px;\n    box-shadow: -1px 2px white, -2px -2px white, 2px -2px white, 2px 1px white;\n}";
// custom code end
var AdaptiveLayout = /** @class */ (function (_super) {
    __extends(AdaptiveLayout, _super);
    function AdaptiveLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'];
        _this.renderingMode = 'Vertical';
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        _this.groupOptions = { showGroupedColumn: true };
        _this.validationRule = { required: true };
        _this.orderidRules = { required: true, number: true };
        _this.filterOptions = { type: 'Excel' };
        return _this;
    }
    AdaptiveLayout.prototype.onChange = function (e) {
        this.grid.rowRenderingMode = e.checked ? 'Horizontal' : 'Vertical';
        this.grid.allowGrouping = e.checked;
    };
    ;
    AdaptiveLayout.prototype.footerSum = function (props) {
        return (React.createElement("span", null,
            "Sum: ",
            props.Sum));
    };
    AdaptiveLayout.prototype.footerAvg = function (props) {
        return (React.createElement("span", null,
            "Average: ",
            props.Average));
    };
    AdaptiveLayout.prototype.load = function () {
        var _a, _b;
        this.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
        if (this.pageSettings.pageSizes) {
            (_a = document.querySelector('.e-adaptive-demo')) === null || _a === void 0 ? void 0 : _a.classList.add('e-pager-pagesizes');
        }
        else {
            (_b = document.querySelector('.e-adaptive-demo')) === null || _b === void 0 ? void 0 : _b.classList.remove('e-pager-pagesizes');
        }
    };
    AdaptiveLayout.prototype.toolbarClick = function (args) {
        switch (args.item.id) {
            case this.grid.element.id + '_pdfexport':
                this.grid.pdfExport();
                break;
            case this.grid.element.id + '_excelexport':
                this.grid.excelExport();
                break;
        }
    };
    AdaptiveLayout.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: "col-md-9 e-bigger e-adaptive-demo" }, !ej2_base_1.Browser.isDevice ? (React.createElement("div", { className: "e-mobile-layout" },
                    React.createElement("div", { className: "e-mobile-content" },
                        React.createElement(ej2_react_grids_1.GridComponent, { id: "adaptivebrowser", dataSource: data_1.data, height: '100%', ref: function (grid) { return _this.grid = grid; }, enableAdaptiveUI: true, rowRenderingMode: this.renderingMode, allowFiltering: true, allowSorting: true, allowGrouping: false, showColumnChooser: true, showColumnMenu: true, allowPaging: true, groupSettings: this.groupOptions, filterSettings: this.filterOptions, toolbar: this.toolbarOptions, editSettings: this.editSettings, pageSettings: { pageCount: 3, pageSizes: true }, load: this.load, toolbarClick: this.toolbarClick.bind(this), allowExcelExport: true, allowPdfExport: true },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '180', isPrimaryKey: true, validationRules: this.orderidRules }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '180', format: 'C2', editType: 'numericedit', validationRules: this.validationRule }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Name', width: '180', validationRules: this.validationRule }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '180' })),
                            React.createElement(ej2_react_grids_2.AggregatesDirective, null,
                                React.createElement(ej2_react_grids_2.AggregateDirective, null,
                                    React.createElement(ej2_react_grids_2.AggregateColumnsDirective, null,
                                        React.createElement(ej2_react_grids_2.AggregateColumnDirective, { field: 'Freight', type: 'Sum', format: 'C2', footerTemplate: '<span>Sum: ${Sum}</span>' }, " ")))),
                            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Sort, ej2_react_grids_1.Group, ej2_react_grids_1.Edit, ej2_react_grids_1.Resize, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Page, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.ColumnChooser, ej2_react_grids_1.ColumnMenu] }))))) : (React.createElement(ej2_react_grids_1.GridComponent, { id: "adaptivedevice", dataSource: data_1.data, height: '100%', ref: function (grid) { return _this.grid = grid; }, enableAdaptiveUI: true, rowRenderingMode: this.renderingMode, allowFiltering: true, allowSorting: true, allowGrouping: false, showColumnChooser: true, showColumnMenu: true, allowPaging: true, groupSettings: this.groupOptions, filterSettings: this.filterOptions, toolbar: this.toolbarOptions, editSettings: this.editSettings, pageSettings: { pageCount: 3, pageSizes: true }, load: this.load, toolbarClick: this.toolbarClick.bind(this), allowExcelExport: true, allowPdfExport: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '180', isPrimaryKey: true, validationRules: this.orderidRules }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '180', format: 'C2', editType: 'numericedit', validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Name', width: '180', validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '180' })),
                    React.createElement(ej2_react_grids_2.AggregatesDirective, null,
                        React.createElement(ej2_react_grids_2.AggregateDirective, null,
                            React.createElement(ej2_react_grids_2.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_2.AggregateColumnDirective, { field: 'Freight', type: 'Sum', format: 'C2', footerTemplate: '<span>Sum: ${Sum}</span>' }, " ")))),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Sort, ej2_react_grids_1.Group, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Page, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.ColumnChooser, ej2_react_grids_1.ColumnMenu] })))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, "Enable horizontal row mode")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChange.bind(this), "aria-label": "Enable horizontal row mode" })))))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates optimal viewing experience and improve usability on small screens.")),
                React.createElement("div", { id: 'description' },
                    React.createElement("p", null,
                        "The ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enableadaptiveui" }, "enableAdaptiveUI")),
                        " property is used to render the grid filter, sort, edit, pager and toolbars like column chooser, pdf export, excel export, etc... dialogs adaptively and",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#rowrenderingmode" }, " rowRenderingMode")),
                        "property is used to render the grid row elements in the following directions,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Horizontal"),
                            " - Renders the grid row elements in the horizontal direction."),
                        React.createElement("li", null,
                            React.createElement("code", null, "Vertical"),
                            " - Renders the grid row elements in the vertical direction.")),
                    React.createElement("p", null, " In this sample, you can change the row direction by using the properties panel checkbox"),
                    React.createElement("p", null,
                        " In this demo, the column menu feature is only supported for the Grid ",
                        React.createElement("code", null, "rowRenderingMode"),
                        " mode as ",
                        React.createElement("code", null, "Vertical"),
                        ". This feature includes grouping, sorting, autofit, filter, and column chooser feature."),
                    React.createElement("p", null,
                        "More information on the rowRenderingMode configuration can be found in this",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#rowrenderingmode" }, "documentation section"),
                        ".")))));
    };
    return AdaptiveLayout;
}(sample_base_1.SampleBase));
exports.AdaptiveLayout = AdaptiveLayout;
