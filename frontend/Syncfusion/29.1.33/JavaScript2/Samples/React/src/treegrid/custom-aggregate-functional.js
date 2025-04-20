"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ /* custom code start */ }
var SAMPLE_CSS = "\n  .e-input {\n    padding-bottom: 1px !important;\n  }\n\n  .e-summarycell.e-templatecell {\n    pointer-events:visible !important;\n  }\n  \n  .e-treegrid .e-summarycell.e-templatecell .e-input-group input.e-control.e-dropdownlist.e-lib.e-input {\n    padding-left: 6px !important;\n  }";
{ /* custom code end */ }
var CustomAggregate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var item = "Frozen seafood";
    var treegridObj = (0, react_1.useRef)(null);
    var listObj;
    var foods = [
        { food: "Frozen seafood" },
        { food: "Dairy" },
        { food: "Edible" },
        { food: "Solid crystals" },
    ];
    var customAggregateFn = function (data) {
        var sampleData = (0, ej2_react_grids_1.getObject)("result", data);
        var countLength;
        countLength = 0;
        sampleData.filter(function (record) {
            var data = (0, ej2_react_grids_1.getObject)("category", record);
            var value = item;
            if (data === value) {
                countLength++;
            }
        });
        return countLength;
    };
    var custom = function (props) {
        return (React.createElement("span", null,
            " ",
            "Count of ",
            React.createElement("input", { type: "text", id: "customers" }),
            ": ",
            props.Custom));
    };
    var dataBound = function () {
        setTimeout(function () {
            if (!(0, ej2_base_1.isNullOrUndefined)(listObj)) {
                listObj.destroy();
            }
            listObj = new ej2_react_dropdowns_1.DropDownList({
                dataSource: foods,
                fields: { value: "food" },
                placeholder: "Select a Category",
                width: "165px",
                value: item,
                change: function () {
                    setTimeout(function () {
                        item = listObj.value.toString();
                        treegridObj.current.refresh();
                    }, 300);
                },
            });
            listObj.appendTo("#customers");
        });
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.summaryData, treeColumnIndex: 1, childMapping: "subtasks", height: "400", ref: treegridObj, dataBound: dataBound.bind(_this) },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "ID", headerText: "S.No", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Name", headerText: "Shipment Name", width: "220" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "category", headerText: "Category", width: "270", minWidth: "270" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "units", headerText: "Total Units", width: "130", textAlign: "Right", type: "number" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "unitPrice", headerText: "Unit Price($)", width: "130", textAlign: "Right", type: "number", format: "C2" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "price", headerText: "Price($)", width: "90", textAlign: "Right", type: "number", format: "C0" })),
                React.createElement(ej2_react_treegrid_1.AggregatesDirective, null,
                    React.createElement(ej2_react_treegrid_1.AggregateDirective, { showChildSummary: false },
                        React.createElement(ej2_react_treegrid_1.AggregateColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { columnName: "category", type: "Custom", customAggregate: customAggregateFn.bind(_this), footerTemplate: custom }, " ")))),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Aggregate] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates custom aggregate functionality of the Tree Grid. In this sample, the custom aggregate value for the columns \u201CCategory\u201D is displayed in column footer with dropdown to display the count of selected category name.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid supports aggregates which will be displayed at the footer and every hierarchy level. The aggregate configurations can be provided by the ",
                React.createElement("code", null, "aggregates"),
                " property."),
            React.createElement("p", null, "The built-in aggregates are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Sum")),
                React.createElement("li", null,
                    React.createElement("code", null, "Average")),
                React.createElement("li", null,
                    React.createElement("code", null, "Min")),
                React.createElement("li", null,
                    React.createElement("code", null, "Max")),
                React.createElement("li", null,
                    React.createElement("code", null, "Count")),
                React.createElement("li", null,
                    React.createElement("code", null, "TrueCount")),
                React.createElement("li", null,
                    React.createElement("code", null, "FalseCount")),
                React.createElement("li", null,
                    React.createElement("code", null, "Custom"),
                    " - Requires the ",
                    React.createElement("code", null, "customAggregate"),
                    " ",
                    "property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                    React.createElement("code", null,
                        "$",
                        "Custom"))),
            React.createElement("p", null, "In this demo, the footerTemplate property shows the custom aggregate value for the columns \u201CCategory\u201D in column footer to display the count of category name."),
            React.createElement("p", null,
                "The template expression should be provided inside",
                " ",
                React.createElement("code", null,
                    "$",
                    "..."),
                " the interpolation syntax."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                " ",
                React.createElement("code", null, "Aggregate"),
                " module in this services."),
            React.createElement("p", null,
                "More information about aggregate can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/aggregates/custom-aggregate" }, "documentation section"),
                "."))));
};
exports.default = CustomAggregate;
