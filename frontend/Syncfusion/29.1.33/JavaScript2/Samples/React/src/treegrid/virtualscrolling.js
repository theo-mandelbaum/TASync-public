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
exports.VirtualScrolling = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var VirtualScrolling = /** @class */ (function (_super) {
    __extends(VirtualScrolling, _super);
    function VirtualScrolling() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row', newRowPosition: 'Child' };
        _this.validationRule = { required: true };
        _this.validationRule1 = { required: true, number: true };
        return _this;
    }
    VirtualScrolling.prototype.render = function () {
        if (data_1.virtualData.length === 0) {
            (0, data_1.dataSource)();
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.virtualData, childMapping: 'Crew', enableVirtualization: true, enableVirtualMaskRow: true, treeColumnIndex: 1, editSettings: this.editSettings, toolbar: this.toolbarOptions, height: '400' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskID', headerText: 'Player Jersey', validationRules: this.validationRule1, width: '120', textAlign: 'Right', isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD1', headerText: 'Player Name', validationRules: this.validationRule, width: '120' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD2', headerText: 'Year', width: '100', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD3', headerText: 'Stint', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FIELD4', headerText: 'TMID', width: '120', textAlign: 'Right' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.VirtualScroll, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.RowDD] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Tree Grid component with the virtual scrolling feature. Scroll the Tree Grid content vertically to load rows.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Tree Grid UI virtualization allows you to render only rows visible within the view-port without buffering the entire datasource. To enable the virtualization, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" }, "enableVirtualization")),
                    " property as true."),
                React.createElement("p", null,
                    "By default, ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualmaskrow" }, "enableVirtualMaskRow ")),
                    " is set to true. we can change by setting ",
                    React.createElement("code", null, "enableVirtualMaskRow"),
                    " property to false."),
                React.createElement("p", null,
                    "Note: The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                    " property must be defined when enabling ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" }, " enableVirtualization"))),
                React.createElement("p", null, "In this demo, Tree Grid is enabled with row virtualization and also perform the CRUD (Add, Edit, Delete, Update) actions."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use virtual scrolling feature, we need to inject ",
                    React.createElement("code", null, "VirtualScroll"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return VirtualScrolling;
}(sample_base_1.SampleBase));
exports.VirtualScrolling = VirtualScrolling;
