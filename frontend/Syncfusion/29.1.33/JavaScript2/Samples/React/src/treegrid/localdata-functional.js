"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var LocalData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "410" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo shows the way of binding an array of JavaScript objects (local JSON datasource) to Tree Grid.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid can be bound either to local or remote data services. The",
                " ",
                React.createElement("code", null, "dataSource"),
                " property can be assigned either with the array of JavaScript objects or instance of ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null, "In this demo, the array of JavaScript objects is assigned as the data source to the Tree Grid."),
            React.createElement("p", null,
                "More information on the local data binding can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/local-data/' }, " documentation section.")))));
};
exports.default = LocalData;
