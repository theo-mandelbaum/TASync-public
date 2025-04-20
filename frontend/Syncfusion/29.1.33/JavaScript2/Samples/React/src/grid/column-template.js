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
exports.ColumnTemplate = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var ColumnTemplate = /** @class */ (function (_super) {
    __extends(ColumnTemplate, _super);
    function ColumnTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = _this.gridTemplate;
        _this.filterSettings = {
            type: 'CheckBox',
            operators: {
                stringOperator: [
                    { value: 'contains', text: 'Contains' },
                    { value: 'doesnotcontain', text: 'Does Not Contains' },
                ],
            },
        };
        _this.filter = {
            type: 'Menu',
            ui: {
                create: function (args) {
                    var flValInput = (0, ej2_base_1.createElement)('input', {
                        className: 'flm-input',
                    });
                    args.target.appendChild(flValInput);
                    var dropdownData = [
                        'Phone',
                        'Mouse',
                        'Laptop',
                        'Keyboard',
                        'Headset',
                        'Tablet',
                        'Projector',
                        'Printer',
                        'Calculator',
                    ];
                    _this.dropInstance = new ej2_dropdowns_1.MultiSelect({
                        dataSource: dropdownData,
                        placeholder: 'Select a value',
                        popupHeight: '200px',
                        allowFiltering: true,
                        mode: 'Box',
                    });
                    _this.dropInstance.appendTo(flValInput);
                },
                write: function (args) {
                    if (args.filteredValue && args.filteredValue.length > 0) {
                        _this.dropInstance.value = args.filteredValue.split(', ');
                    }
                },
                read: function (args) {
                    var _a, _b;
                    _this.gridInstance.removeFilteredColsByField(args.column.field);
                    if ((_a = _this.dropInstance) === null || _a === void 0 ? void 0 : _a.value.length) {
                        args.fltrObj.filterByColumn(args.column.field, args.operator, (_b = _this.dropInstance) === null || _b === void 0 ? void 0 : _b.value.sort().join(', '));
                    }
                },
            },
        };
        return _this;
    }
    ColumnTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    };
    ColumnTemplate.prototype.locationTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-location e-icons" }),
            props.Location));
    };
    ColumnTemplate.prototype.statusTemplate = function (props) {
        return (React.createElement("div", null, props.EmployeeAvailability === "Available" ?
            React.createElement("div", { id: "status", className: "statuscolor e-availablecolor" },
                React.createElement("span", { className: "statustxt e-availablecolor" }, props.EmployeeAvailability)) :
            React.createElement("div", { id: "status", className: "statuscolor e-nonavailablecolor" },
                React.createElement("span", { className: "statustxt e-nonavailablecolor" }, props.EmployeeAvailability))));
    };
    ColumnTemplate.prototype.assetTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_buttons_1.ChipListComponent, { id: 'chip', chips: props.AssetKit.split(',') })));
    };
    ColumnTemplate.prototype.mailIDTemplate = function (props) {
        var src = 'mailto:${MailID}' + props.MailID;
        return (React.createElement("div", null,
            React.createElement("a", { href: src }, props.MailID)));
    };
    ColumnTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return (_this.gridInstance = grid); }, dataSource: data_1.employeeDetail, width: 'auto', height: '359', allowSorting: true, allowFiltering: true, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Image', width: '180', template: this.template, textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'ID', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MailID', headerText: 'Email ID', width: '150', template: this.mailIDTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'DateOfJoining', headerText: 'Date Joined', width: '170', textAlign: 'Right', format: 'yMd', type: 'date' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Team', headerText: 'Team(s)', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportTo', headerText: 'Reporter', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeAvailability', headerText: 'Availability', width: '200', template: this.statusTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'YearOfExperience', headerText: 'Experience', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKit', headerText: 'Asset Kit', width: '180', template: this.assetTemplate, filter: this.filter }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: '170', format: 'yMd', textAlign: 'Right', type: 'date' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Location', headerText: 'Location', width: '150', template: this.locationTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'PhoneNumber', headerText: 'Contact No', width: '150', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates usage of template columns in Grid. In this sample, we have shown custom images in the Employee Image column.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid creates a custom layout for each cell using the column template feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#template" }, "columns->template")),
                    " property accepts either string or HTML element`s ID value, which will be used as the template for the cell."),
                React.createElement("p", null,
                    "The column template feature allows the customization of grid cells. In this demo, the Grid showcases the ",
                    React.createElement("strong", null, "Employee Image"),
                    "column with employee photos, ",
                    React.createElement("strong", null, "Mail ID"),
                    " column with link tags, ",
                    React.createElement("strong", null, "Location"),
                    " column with location icons, ",
                    React.createElement("strong", null, "Asset Kit"),
                    " column with Syncfusion Chip components and ",
                    React.createElement("strong", null, "Employee Availability"),
                    " column with HTML span elements, using green to indicate available and red to indicate for not available."),
                React.createElement("p", null,
                    "More information on the column template can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/columns/column-template" }, "documentation section"),
                    "."))));
    };
    return ColumnTemplate;
}(sample_base_1.SampleBase));
exports.ColumnTemplate = ColumnTemplate;
