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
exports.Rtl = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Rtl = /** @class */ (function (_super) {
    __extends(Rtl, _super);
    function Rtl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rtl.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, allowFiltering: true, height: 365, allowReordering: true, editSettings: { allowEditing: true, allowAdding: false, allowDeleting: false, mode: 'Normal' }, allowGrouping: true, enableRtl: true, filterSettings: { type: 'Menu' }, allowSorting: true, pageSettings: { pageSize: 10, pageCount: 2 } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', textAlign: 'Left' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', editType: 'datepickeredit', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', allowGrouping: false }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '170', textAlign: 'Left' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Reorder, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the right-to-Left(RTL) alignment in grid component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Right-to-left(RTL) is used to render the component from right to left direction and it can be enabled by setting ",
                    React.createElement("code", null,
                        " ",
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enablertl" }, "enableRtl")),
                    " property as true. In this demo, you can able to see Group drop area, header, content, pager, filter dialog, etc ... are aligned right to left direction."),
                React.createElement("p", null,
                    "More information on the RTL can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enablertl" }, "documentation section"),
                    "."))));
    };
    return Rtl;
}(sample_base_1.SampleBase));
exports.Rtl = Rtl;
