"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ColumnFormat = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var dropdownObj = (0, react_1.useRef)(null);
    var dropdownObj2 = (0, react_1.useRef)(null);
    var format = { type: "dateTime", format: "M/d/yyyy" };
    var columnNames = [
        { id: "price", name: "Price" },
        { id: "orderDate", name: "Order Date" },
    ];
    var priceFormat = [
        { id: "n2", format: "n2" },
        { id: "n3", format: "n3" },
        { id: "c2", format: "c2" },
        { id: "c3", format: "c3" },
        { id: "p2", format: "p2" },
        { id: "p3", format: "p3" },
    ];
    var dateFormat = [
        { id: "M/d/yyyy", format: "Short Date" },
        { id: "dddd, MMMM dd, yyyy", format: "Long Date" },
        { id: "MMMM, yyyy", format: "Month/Year" },
        { id: "MMMM, dd", format: "Month/Day" },
    ];
    var change = function (args) {
        var columnName = args.value.toString();
        if (columnName === "price") {
            dropdownObj2.current.dataSource = priceFormat;
            var priceColumn = treegridObj.current.getColumnByField("price");
            dropdownObj2.current.value = priceColumn.format.toString();
        }
        if (columnName === "orderDate") {
            dropdownObj2.current.dataSource = dateFormat;
            var format_1 = treegridObj.current.getColumnByField("orderDate").format;
            dropdownObj2.current.value = format_1.format;
        }
    };
    var change2 = function (args) {
        var formatval = args.value;
        var columnName = dropdownObj.current.value.toString();
        if (columnName === "price") {
            treegridObj.current.getColumnByField(columnName).format = formatval;
        }
        if (columnName === "orderDate") {
            treegridObj.current.getColumnByField(columnName).format = {
                format: formatval,
                type: "date",
            };
        }
        treegridObj.current.refreshColumns();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.formatData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, pageSettings: { pageCount: 5 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "orderID", headerText: "Order ID", width: "110", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "orderName", headerText: "Order Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "orderDate", headerText: "Order Date", width: "190", type: "date", format: format, textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "price", headerText: "Price", width: "120", format: "c2", textAlign: "Right", type: "number" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-lg-3 property-section", style: { paddingLeft: '5px' } },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Column ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "145px", id: "columns", change: change.bind(_this), dataSource: columnNames, fields: { text: "name", value: "id" }, value: "price", ref: dropdownObj })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", null, " Format ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "145px", id: "colformat", change: change2.bind(_this), dataSource: priceFormat, fields: { text: "format", value: "id" }, value: "c2", ref: dropdownObj2 }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of displaying the content of Tree Grid columns based on the specified format. In this sample, format of columns can be changed dynamically through property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Format is the process of customizing the particular column data/values based on specific culture. The Tree Grid uses Internalization library to format number and date values. The format can be specified by using",
                " ",
                React.createElement("code", null, "format"),
                " property of columns."),
            React.createElement("p", null, "In this demo, select the column and format from the property panel to format the corresponding column values."),
            React.createElement("p", null, "More information about Column Formatting can be found in this documentation section."))));
};
exports.default = ColumnFormat;
