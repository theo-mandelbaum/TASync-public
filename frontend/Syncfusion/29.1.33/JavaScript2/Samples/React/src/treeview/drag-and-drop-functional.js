"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./drag-and-drop.css");
var dataSource = require("./dataSource/drag-data.json");
var Dragdrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), display = _a[0], setDisplay = _a[1];
    var data = dataSource;
    var listObj = (0, react_1.useRef)(null);
    var id = 1;
    // Render the first TreeView by mapping its fields property with data source properties
    var field = { dataSource: data.dragData1, id: 'id', text: 'name', child: 'child' };
    var allowDragAndDrop = true;
    // Render the second TreeView by mapping its fields property with data source properties     
    var fields = { dataSource: data.dragData2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
    var allowDragAndDrops = true;
    var onDragStop = function (args) {
        var targetEle = (0, ej2_base_1.closest)(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            var newData = [];
            if (args.draggedNode.classList.contains('e-active')) {
                var dragNode = (0, ej2_base_1.closest)(args.draggedNode, '.e-treeview');
                var selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (var i = 0, len = selNodes.length; i < len; i++) {
                    var nodeEle = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    var nodeText = nodeEle.textContent;
                    var newNode = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                    id++;
                    newData.push(newNode);
                }
            }
            else {
                var text = 'text';
                var nodeText = args.draggedNodeData[text];
                var newNode = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            listObj.current.addItem(newData, undefined);
        }
    };
    var removeElement = function () {
        setDisplay("none");
    };
    var removeNode = function (event) {
        if (event.target.classList.contains("custom-delete")) {
            var node = (0, ej2_base_1.closest)(event.target, "li");
            listObj.current.removeItem(node);
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section custom-tree" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement("div", { className: "col-lg-4 tree1-data" },
                    React.createElement("p", { className: "displayText" }, "TreeView-1"),
                    React.createElement("div", { className: "content" },
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree1', fields: field, nodeDragStop: onDragStop.bind(_this), allowDragAndDrop: allowDragAndDrop }))),
                React.createElement("div", { className: "col-lg-4 tree2-data" },
                    React.createElement("p", { className: "displayText" }, "TreeView-2"),
                    React.createElement("div", { className: "content" },
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree2', fields: fields, nodeDragStop: onDragStop.bind(_this), allowDragAndDrop: allowDragAndDrops }))),
                React.createElement("div", { className: "col-lg-4 tree3-data" },
                    React.createElement("p", { className: "displayText" }, "ListView"),
                    React.createElement("div", { className: "content" },
                        React.createElement("div", { onMouseDown: removeNode },
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "list", className: "e-droppable", dataSource: [], ref: listObj, cssClass: 'custom-list', template: "<div class='dropped-list-view-item'><span>${text}</span><span id=${iconId} class=${class}></span></div>" })))),
                React.createElement("div", { id: "overlay", style: { display: display }, onMouseDown: removeElement }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the drag and drop functionality of TreeView. A drag and drop image is present at the top of the sample which hides on clicking the sample. To drag and drop node, select and drag the desired node and drop it on the target node or external container.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component allows users to drag any node and drop it on any other node in the same or different tree using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview#allowdraganddrop" }, "allowDragAndDrop"),
                " property. Additionally, it supports dropping a tree node to an external container using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview#nodedragstop" }, "nodeDragStop"),
                " event of the TreeView"),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop/", target: "_blank" }, "Drag and Drop"),
                " section from the documentation."))));
};
exports.default = Dragdrop;
