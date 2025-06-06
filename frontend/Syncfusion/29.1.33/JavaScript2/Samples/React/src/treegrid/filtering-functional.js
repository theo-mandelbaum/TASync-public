"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Filtering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridInstance = (0, react_1.useRef)(null);
    var modes = [
        { text: "Parent", value: "Parent" },
        { text: "Child", value: "Child" },
        { text: "Both", value: "Both" },
        { text: "None", value: "None" },
    ];
    var onChange = function (sel) {
        var mode = sel.value.toString();
        treegridInstance.current.filterSettings.hierarchyMode = mode;
        treegridInstance.current.clearFiltering();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: treegridInstance, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, allowFiltering: true, filterSettings: {
                        mode: "Immediate",
                        type: "FilterBar",
                        hierarchyMode: "Parent",
                    } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "120", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "110", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "110", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "10px" } }, " Hierarchy Mode ")),
                                React.createElement("td", { style: { width: "70%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "110px", id: "selmode", change: onChange.bind(_this), dataSource: modes, value: "Parent" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                " ",
                "This sample demonstrates the default support of filterbar in Tree Grid.In this sample, type the value in the filterbar and press enter to filter particular column.The filtering is based on hierarchy mode.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled by setting",
                " ",
                React.createElement("code", null, "allowFiltering "),
                " property as true. A filter bar row will be rendered next to header which allows the end-users to filter data by entering text within its cells."),
            React.createElement("p", null, "Filterbar uses two modes which specifies how to start filtering. They are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "OnEnter"),
                    " - Enabled by default, filter will be initiated after pressing ",
                    React.createElement("code", null, "Enter"),
                    " key."),
                React.createElement("li", null,
                    React.createElement("code", null, "Immediate"),
                    " - Filter will start after user ends typing. This uses a time delay of ",
                    React.createElement("i", null, "1500ms"),
                    " to initiate filter after use stops typing. It can be overridden using the",
                    " ",
                    React.createElement("code", null, "filterSettings->immediateModeDelay"),
                    " property.")),
            React.createElement("p", null,
                "Tree Grid provides support for a set of filtering modes with",
                " ",
                React.createElement("code", null, "hierarchyMode"),
                " property. The below are the type of filter mode available in Tree Grid."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Parent"),
                    " - This is the default filter hierarchy mode in Tree Grid. The filtered records are displayed with its parent records, if the filtered records not have any parent record then the filtered record only displayed."),
                React.createElement("li", null,
                    React.createElement("code", null, "Child"),
                    " - The filtered records are displayed with its child record, if the filtered records do not have any child record then only the filtered records are displayed."),
                React.createElement("li", null,
                    React.createElement("code", null, "Both"),
                    " - The filtered records are displayed with its both parent and child record. If the filtered records do not have any parent and child record then only the filtered records are displayed."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Only the filtered records are displayed.")),
            React.createElement("br", null),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use filtering feature, we need to inject",
                React.createElement("code", null, "Filter"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the filter configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/filtering/filtering" }, "documentation section"),
                "."))));
};
exports.default = Filtering;
