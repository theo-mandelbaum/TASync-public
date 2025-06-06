"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function ReactiveAggregate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function footerSum(props) {
        return (React.createElement("span", null,
            "Sum: ",
            props.Sum));
    }
    function groupFooterSum(props) {
        return (React.createElement("span", null,
            "Sum: ",
            props.Sum));
    }
    function groupcFooterAvg(props) {
        return (React.createElement("span", null,
            "Average: ",
            props.Average));
    }
    var pageSettings = { pageCount: 5 };
    var filterSettings = { type: 'Excel' };
    var groupSettings = { showDropArea: false, columns: ['CustomerID'] };
    var toolbarOptions = ['Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowDeleting: true, mode: 'Batch' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, pageSettings: pageSettings, toolbar: toolbarOptions, allowFiltering: true, filterSettings: filterSettings, editSettings: editSettings, allowGrouping: true, groupSettings: groupSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Customer Name', isPrimaryKey: true, width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', editType: 'numericedit', width: '120', format: 'C2', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: '150' })),
                React.createElement(ej2_react_grids_1.AggregatesDirective, null,
                    React.createElement(ej2_react_grids_1.AggregateDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Freight', type: 'Sum', format: 'C2', footerTemplate: footerSum }, " "))),
                    React.createElement(ej2_react_grids_1.AggregateDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Freight', type: 'Sum', format: 'C2', groupFooterTemplate: groupFooterSum }, " "))),
                    React.createElement(ej2_react_grids_1.AggregateDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Freight', type: 'Average', format: 'C2', groupCaptionTemplate: groupcFooterAvg }, " ")))),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Group, ej2_react_grids_1.Filter] })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates reactive aggregate update on data change functionality of the Grid. In this sample, the batch editing  is enabled and the corresponding aggregate values will be refreshed when 'Freight' cell value is changed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid. The aggregate configurations can be provided by the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#aggregates" }, "aggregates")),
                    " property."),
                React.createElement("p", null,
                    "In this demo, the batch editing  is enabled and the corresponding aggregate values will be refreshed when ",
                    React.createElement("strong", null,
                        React.createElement("i", null, "Freight")),
                    " cell value is changed."),
                React.createElement("p", null,
                    "By default, reactive aggregate update is not supported by inline and dialog edit modes. But, we can refresh aggregates manually. Please refer to the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/aggregates/reactive-aggregate#refresh-aggregate-values-in-inline-editing" }, "documentation."))))));
}
exports.default = ReactiveAggregate;
