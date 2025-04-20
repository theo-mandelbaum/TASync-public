"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./icons.css");
var dataSource = require("./icons-data.json");
var Icons = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.iconData, value: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section dropdowntree-icons' },
            React.createElement("div", { className: 'control_wrapper' },
                React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: fields, placeholder: "Select a folder or file", popupHeight: "200px", cssClass: "dropdowntree-icon" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explains you about the Dropdown Tree item that can be configured by the icons or images. Click on the icon or double click on it to expand or collapse and to show the icons or images that are configured with the items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Dropdown Tree"),
                " component has the built-in option to customize each item's appearance with the icons and images by mapping the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#iconcss" }, "iconCss"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#imageurl" }, "imageUrl"),
                " fields."),
            React.createElement("p", null, "In this demo, the Dropdown Tree is showcased like a file system with custom icons and images."))));
};
exports.default = Icons;
