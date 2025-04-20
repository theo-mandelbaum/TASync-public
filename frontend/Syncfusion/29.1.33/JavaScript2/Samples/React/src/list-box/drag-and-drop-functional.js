"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./drag-and-drop.css");
var DragAndDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var listObj1 = (0, react_1.useRef)(null);
    var listObj2 = (0, react_1.useRef)(null);
    var dataA = new ej2_data_1.DataManager({
        json: data["dragAndDropA"]
    });
    var dataB = new ej2_data_1.DataManager({
        json: data["dragAndDropB"]
    });
    var fields = { text: 'Name' };
    var modifiedDataA = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    var modifiedDataB = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    var saveChanges = function () {
        dataA.saveChanges(modifiedDataA, fields.text);
        dataB.saveChanges(modifiedDataB, fields.text);
        modifiedDataA.addedRecords = [];
        modifiedDataB.addedRecords = [];
    };
    var onDropGroupA = function (args) {
        args.items.forEach(function (item) {
            if (!listObj1.current.getDataByValue(item[fields.text])) { /*Preventing item manipulation on drag and drop within same list box.*/
                modifiedDataB.addedRecords.push(item);
                modifiedDataA.deletedRecords.push(item);
            }
        });
    };
    var onDropGroupB = function (args) {
        args.items.forEach(function (item) {
            if (!listObj2.current.getDataByValue(item[fields.text])) {
                modifiedDataA.addedRecords.push(item);
                modifiedDataB.deletedRecords.push(item);
            }
        });
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section', style: { minHeight: '450px' } },
            React.createElement("div", { id: "drag-drop-wrapper" },
                React.createElement("div", { className: "listbox-control" },
                    React.createElement("h4", null, "Group A"),
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { ref: listObj1, dataSource: dataA, scope: "combined-list", height: "330px", allowDragAndDrop: true, fields: fields, drop: onDropGroupA })),
                React.createElement("span", { className: "e-swap-icon" }),
                React.createElement("div", { className: "listbox-control" },
                    React.createElement("h4", null, "Group B"),
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { ref: listObj2, dataSource: dataB, scope: "combined-list", height: "330px", allowDragAndDrop: true, fields: fields, drop: onDropGroupB }),
                    React.createElement("button", { className: "e-btn", onClick: saveChanges }, "Update")))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This sample demonstrates the drag and drop functionalities of a ListBox. Drag an item or a group of selected items and drop it within the same list box or into another list box.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "The ListBox component allows the user to drag and drop a desired item from one list box into another list box. The drag and drop feature can be enabled by using the following properties,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "To drag and drop a desired item within the ListBox, the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#allowdraganddrop" },
                        React.createElement("code", null, "allowDragAndDrop")),
                    " property should be set to ",
                    React.createElement("code", null, "true.")),
                React.createElement("li", null,
                    "To drag and drop between two listboxes, the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#scope" },
                        React.createElement("code", null, "scope")),
                    " property should be set to both the listboxes.")),
            React.createElement("p", null,
                "In this sample, a list of countries is loaded in Group A and another list of countries is loaded in Group B. You can drag and drop an item or multiple items from Group A to Group B, and vice versa. By clicking update button, user can save the changes to the corresponding JSON using Datamanager ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/data/dataManager/#savechanges" },
                    React.createElement("code", null, "saveChanges")),
                " method."),
            React.createElement("p", null,
                "More information about drag and drop functionalities in the ListBox can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                " section."))));
};
exports.default = DragAndDrop;
