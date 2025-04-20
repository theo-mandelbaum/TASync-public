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
exports.DetailTemplate = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var instance = new ej2_base_1.Internationalization();
var textcolor_CSS = "\n .tailwind3-dark #TreeGrid .e-description,\n.fluent2-dark #TreeGrid .e-description,\n.bootstrap5.3-dark #TreeGrid .e-description,\n.material3-dark #TreeGrid .e-description,\n.fluent2-highcontrast #TreeGrid .e-description {\n    color: #fff;\n}";
var DetailTemplate = /** @class */ (function (_super) {
    __extends(DetailTemplate, _super);
    function DetailTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = function (value) {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        _this.template = _this.detailtemplate;
        return _this;
    }
    DetailTemplate.prototype.detailtemplate = function (props) {
        var imag = 'src/treegrid/images/' + props.FullName + '.png';
        return (React.createElement("div", null,
            React.createElement("div", { style: { position: 'relative', display: 'inline-block', float: 'left', padding: '5px 4px 2px 27px' } },
                React.createElement("img", { src: imag, alt: props.FullName })),
            React.createElement("div", { style: { paddingLeft: '10px', display: 'inline-block', width: '66%', fontSize: '13px', fontFamily: 'Segoe UI' } },
                React.createElement("div", { className: "e-description", style: { marginTop: '5px' } },
                    React.createElement("b", null, props.Name),
                    " was born on ",
                    this.format(props.DOB),
                    ". Now lives at ",
                    props.Address,
                    ", ",
                    props.Country,
                    ". ",
                    props.Name,
                    " holds a position of ",
                    React.createElement("b", null, props.Designation),
                    " in our WA department, (Seattle USA)."),
                React.createElement("div", { className: "e-description", style: { marginTop: '5px' } },
                    React.createElement("b", { style: { marginRight: '10px' } }, "Contact:"),
                    props.Contact))));
    };
    DetailTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, textcolor_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.textdata, childMapping: 'Children', detailTemplate: this.template.bind(this), treeColumnIndex: 0, height: '335' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Full Name', width: '180', field: 'Name' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'DOB', field: 'DOB', width: '85', type: 'date', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '147' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'EmpID', headerText: 'EmployeeID', width: '125' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '148' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.DetailRow] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Tree Grid component with the detail template feature.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The detail row template provides an additional information about a data row. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/treegrid/row/#detail-template" }, "detailTemplate")),
                    "property accepts either string or HTML element`s ID value, which will be used as the template for the detail row."),
                React.createElement("p", null, "In this demo, we have presented Employee Information with image in the detail row."),
                React.createElement("p", null,
                    "Injecting Module: Tree Grid features are segregated into individual feature-wise modules. To use detail template feature, we need to inject ",
                    React.createElement("code", null, "DetailRow"),
                    " using the ",
                    React.createElement("code", null, "services"),
                    " section."))));
    };
    return DetailTemplate;
}(sample_base_1.SampleBase));
exports.DetailTemplate = DetailTemplate;
