"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var InfiniteScrolling = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    if (data_1.virtualData.length === 0) {
        (0, data_1.dataSource)();
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.virtualData, childMapping: "Crew", pageSettings: { pageSize: 50 }, enableInfiniteScrolling: true, treeColumnIndex: 1, height: "400" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "TaskID", headerText: "Player Jersey", width: "140", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD1", headerText: "Player Name", width: "120" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD2", headerText: "Year", width: "120", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD3", headerText: "Stint", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD4", headerText: "TMID", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD5", headerText: "LGID", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD6", headerText: "GP", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FIELD7", headerText: "GS", width: "90", textAlign: "Right" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.InfiniteScroll] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Tree Grid component with the infinite scrolling feature.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid Infinite scrolling, allows you to load data in lazy loading concept, which means the buffer data is loaded only when the scrollbar reaches the end of the scroller. To enable the enableInfiniteScrolling, set",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enableInfiniteScrolling" }, "enableInfiniteScrolling")),
                " ",
                "property as true."),
            React.createElement("p", null,
                "Note: The",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                " ",
                "property must be defined when enabling",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#enableInfiniteScrolling" }, "enableInfiniteScrolling"))),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use infinite scrolling feature, we need to inject",
                React.createElement("code", null, " InfiniteScroll "),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = InfiniteScrolling;
