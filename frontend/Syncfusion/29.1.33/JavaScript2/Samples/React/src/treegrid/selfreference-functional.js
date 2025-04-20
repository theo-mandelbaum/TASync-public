"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SelfReference = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.projectData, treeColumnIndex: 1, allowPaging: true, height: "350", idMapping: "TaskID", parentIdMapping: "parentID" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "TaskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "TaskName", headerText: "Task Name", width: "100" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "StartDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "EndDate", headerText: "End Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of binding self-referential flat data to Tree Grid component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid can be bound either to local or remote data services. The",
                " ",
                React.createElement("code", null, "dataSource"),
                " property can be assigned either with the array of JavaScript objects or instance of ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null, "In this demo, the array of self-referential flat data with parent ID is assigned as the data source to the Tree Grid."),
            React.createElement("p", null,
                "More information on the self-referential data binding can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/local-data/#self-referential-data-binding-flat-data' }, " documentation section.")))));
};
exports.default = SelfReference;
