"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./local-data.css");
var dataSource = require("./dataSource/local-data.json");
var LocalData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var SAMPLE_CSS = "\n    .control-section {\n        overflow: auto;\n    }";
    var data = dataSource;
    // Hierarchical data source for TreeView component
    var fields = { dataSource: data.hierarchicalData, id: 'code', text: 'name', child: 'countries' };
    // Self-referential list data source for TreeView component
    var listfields = { dataSource: data.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-6 nested-data' },
                React.createElement("div", { className: 'content' },
                    React.createElement("p", { className: "displayText" }, "Hierarchical Data"),
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree', fields: fields }))),
            React.createElement("div", { className: 'col-lg-6 list-data' },
                React.createElement("div", { className: 'content' },
                    React.createElement("p", { className: "displayText" }, "List Data"),
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'listtree', fields: listfields })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the binding of local data to the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The TreeView component loads the data through the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#datasource" }, "dataSource"),
                " property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the ",
                React.createElement("b", null, "id"),
                " and ",
                React.createElement("b", null, "parentID"),
                " fields)."),
            React.createElement("p", null,
                "In this demo, the first TreeView is bound with the hierarchical data that contains array of nested objects. And the second TreeView is bound with the list type data where the parent-child relation is referred by the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#id" }, "id"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#parentid" }, "parentID"),
                " mapping fields."),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/data-binding/#local-data", target: "_blank" }, "Data Binding"),
                " section from the documentation."))));
};
exports.default = LocalData;
