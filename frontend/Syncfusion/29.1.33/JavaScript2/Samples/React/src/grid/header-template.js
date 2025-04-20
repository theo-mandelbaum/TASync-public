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
exports.HeaderTemplate = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var HeaderTemplate = /** @class */ (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = _this.gridTemplate;
        return _this;
    }
    HeaderTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    };
    HeaderTemplate.prototype.locationTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-location e-icons" }),
            props.Location));
    };
    HeaderTemplate.prototype.assetTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_buttons_1.ChipListComponent, { id: 'chip', chips: props.AssetKit.split(',') })));
    };
    HeaderTemplate.prototype.employeeImageHeaderTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-icon-userlogin e-icons" }),
            "Image"));
    };
    HeaderTemplate.prototype.locationHeaderTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-location e-icons" }),
            "Location"));
    };
    HeaderTemplate.prototype.assetKitHeaderTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-description e-icons" }),
            "Asset Kit"));
    };
    HeaderTemplate.prototype.mailIDHeaderTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-mail e-icons" }),
            "Email ID"));
    };
    HeaderTemplate.prototype.phoneHeaderTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-phone e-icons" }),
            "Contact No"));
    };
    HeaderTemplate.prototype.dateTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-icon-calender e-icons" }),
            "Assigned Date"));
    };
    HeaderTemplate.prototype.mailIDTemplate = function (props) {
        var src = 'mailto:${MailID}' + props.MailID;
        return (React.createElement("div", null,
            React.createElement("a", { href: src }, props.MailID)));
    };
    HeaderTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: "gridheadersample", dataSource: data_1.employeeDetail, width: 'auto', height: '359' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Image', width: '180', template: this.template, textAlign: 'Center', headerTemplate: this.employeeImageHeaderTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'ID', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MailID', headerText: 'Email ID', width: '150', template: this.mailIDTemplate, headerTemplate: this.mailIDHeaderTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKit', headerText: 'Asset Kit', width: '180', template: this.assetTemplate, headerTemplate: this.assetKitHeaderTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: '170', format: 'yMd', headerTemplate: this.dateTemplate, textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Location', headerText: 'Location', width: '150', template: this.locationTemplate, headerTemplate: this.locationHeaderTemplate }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'PhoneNumber', headerText: 'Contact No', width: '150', textAlign: 'Right', headerTemplate: this.phoneHeaderTemplate })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid header template feature. In this sample, custom icons are shown in the column headers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#headertemplate" }, "header template")),
                    " feature enhances your column headers by incorporating custom icons or text alongside the header text. This allows for a more visually appealing and informative presentation of your data. In this demonstration, you will see how custom icons are integrated into the column headers, which include ",
                    React.createElement("strong", null, "Employee Image"),
                    ", ",
                    React.createElement("strong", null, "MailID"),
                    ", ",
                    React.createElement("strong", null, "Phone Number"),
                    ", ",
                    React.createElement("strong", null, "Location"),
                    ", ",
                    React.createElement("strong", null, "Asset Kit"),
                    ", and ",
                    React.createElement("strong", null, "Assigned Date"),
                    ". These header icons represent the column's content, making it easy to identify and understand at a glance."),
                React.createElement("p", null,
                    "More information on the header template can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/columns/column-headers#header-template" }, "documentation section"),
                    "."))));
    };
    return HeaderTemplate;
}(sample_base_1.SampleBase));
exports.HeaderTemplate = HeaderTemplate;
