"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var VirtualScrolling = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "Indent",
        "Outdent",
    ];
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Row",
        newRowPosition: "Child",
    };
    var validationRule = { required: true };
    var validationRule1 = { required: true, number: true };
    if (data_1.virtualData.length === 0) {
        (0, data_1.dataSource)();
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.virtualData, childMapping: "Crew", enableVirtualization: true, treeColumnIndex: 1, editSettings: editSettings, toolbar: toolbarOptions, height: "400" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "TaskID", headerText: "Player Jersey", validationRules: validationRule1, width: "120", textAlign: "Right", isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD1", headerText: "Player Name", validationRules: validationRule, width: "120" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD2", headerText: "Year", width: "100", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD3", headerText: "Stint", width: "120", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD4", headerText: "TMID", width: "120", textAlign: "Right" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.VirtualScroll, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.RowDD] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Tree Grid component with the virtual scrolling feature. Scroll the Tree Grid content vertically to load rows.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid UI virtualization allows you to render only rows visible within the view-port without buffering the entire datasource. To enable the virtualization, set",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" },
                        " ",
                        "enableVirtualization")),
                " ",
                "property as true."),
            React.createElement("p", null,
                "By default,",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualmaskrow" },
                        "enableVirtualMaskRow",
                        " ")),
                " ",
                "is set to true. we can change by setting",
                " ",
                React.createElement("code", null, "enableVirtualMaskRow"),
                " property to false."),
            React.createElement("p", null,
                "Note: The",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                " ",
                "property must be defined when enabling",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization" },
                        " ",
                        "enableVirtualization"))),
            React.createElement("p", null, "In this demo, Tree Grid is enabled with row virtualization and also perform the CRUD (Add, Edit, Delete, Update) actions."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use virtual scrolling feature, we need to inject",
                " ",
                React.createElement("code", null, "VirtualScroll"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = VirtualScrolling;
