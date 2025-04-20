"use strict";
/**
 * ListView Nested Sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./listview.css");
var listData_1 = require("./listData");
var FolderCss = "\n.e-listview .e-list-icon,\n.e-bigger .e-listview .e-list-icon {\n    height: 24px;\n    width: 30px;\n}\n#listview {\n    max-width: 500px;\n    margin: auto;\n    border: 1px solid #dddddd;\n    border-radius: 3px;\n}\n.folder {\n    background-repeat: no-repeat;\n    background-image: url('./src/listview/images/file_icons.png');\n    background-position: -5px -466px;\n    background-size: 302%;\n}\n\n.file {\n    background-repeat: no-repeat;\n    background-image: url('./src/listview/images/file_icons.png');\n    background-position: -5px -151px;\n    background-size: 302%;\n}";
var Nested = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Map appropriate columns to fields property
    var fields = {
        iconCss: 'icon', tooltip: 'text'
    };
    var animation = { duration: 0 };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("style", null, FolderCss),
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'listview', dataSource: listData_1.nestedListData, fields: fields, headerTitle: 'Folders', showIcon: true, showHeader: true, animation: animation })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the nested list functionalities, which allows you to navigate to the sub list items by clicking any item and navigating back to the list item using the back icon at the top left.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ListView component supports nested list. To achieve list navigation, the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#child' }, "child")),
                " property should be defined for the nested list in the array of JSON."),
            React.createElement("p", null, "This sample have nested folder with the sub folders or files."))));
};
exports.default = Nested;
