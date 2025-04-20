"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
var DragAndDropBetween = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("p", null, "Drag and Drop Rows between two TreeGrids"),
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("div", { style: { float: 'left', width: '49%' } },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "TreeGrid", dataSource: data_1.dragData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: true, pageSettings: { pageCount: 2 }, allowRowDragAndDrop: true, rowDropSettings: { targetID: 'DestGrid' }, selectionSettings: { type: 'Multiple' } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', isPrimaryKey: true, headerText: 'Task ID', width: '100', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '180' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '110', format: 'yMd', textAlign: 'Right', type: 'date' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '100', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.RowDD] }))),
                React.createElement("div", { style: { float: 'right', width: '49%' } },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "DestGrid", childMapping: 'subtasks', treeColumnIndex: 1, allowPaging: true, pageSettings: { pageCount: 2 }, allowRowDragAndDrop: true, rowDropSettings: { targetID: 'TreeGrid' }, selectionSettings: { type: 'Multiple' } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', isPrimaryKey: true, headerText: 'Task ID', width: '100', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '180' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '110', format: 'yMd', textAlign: 'Right', type: 'date' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '100', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.RowDD] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the TreeGrid component's row drag and drop feature, enabling users to transfer tasks between tree grids effortlessly via drag and drop actions.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Enabling the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://helpej2.syncfusion.com/react/documentation/api/treegrid/#allowrowdraganddrop" }, "allowRowDragAndDrop")),
                " property facilitates drag and drop functionality for Tree Grid rows. Additionally, when performing row drag and drop between tree grids, the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://helpej2.syncfusion.com/react/documentation/api/treegrid/#rowdropsettings" }, "TreeGridRowDropSettings")),
                " component's ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/rowDropSettings/#targetid" }, "targetID ")),
                " property specifies the target onto which the Tree Grid rows should be dropped."),
            React.createElement("p", null,
                "For the row drag and drop feature to function correctly, it's essential to have a primary key column. To define this primary key, ensure that ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/column/#isprimarykey" }, "isPrimaryKey")),
                " is set to ",
                React.createElement("code", null, "true"),
                " for a unique data column."),
            React.createElement("p", null,
                "To select the rows, enable the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/selection/selection" }, "Selection ")),
                "feature. Selecting multiple rows within the Tree Grid is as simple as clicking and dragging them."),
            React.createElement("p", null, "The Row drag and drop feature is enabled in both TreeGrids in this demo. Drag and drop rows between TreeGrids by selecting the rows and dragging them to the adjacent TreeGrid."),
            React.createElement("p", null,
                "More information on the row drag and drop can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/row/row-drag-and-drop#drag-and-drop-to-another-tree-grid" }, "documentation "),
                "section."))));
};
exports.default = DragAndDropBetween;
