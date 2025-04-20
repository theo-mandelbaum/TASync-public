"use strict";
/**
 * ListView Nested Sample
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nested = void 0;
var React = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./listview.css");
var listData_1 = require("./listData");
var FolderCss = "\n.e-listview .e-list-icon,\n.e-bigger .e-listview .e-list-icon {\n    height: 24px;\n    width: 30px;\n}\n#listview {\n    max-width: 500px;\n    margin: auto;\n    border: 1px solid #dddddd;\n    border-radius: 3px;\n}\n.folder {\n    background-repeat: no-repeat;\n    background-image: url('./src/listview/images/file_icons.png');\n    background-position: -5px -466px;\n    background-size: 302%;\n}\n\n.file {\n    background-repeat: no-repeat;\n    background-image: url('./src/listview/images/file_icons.png');\n    background-position: -5px -151px;\n    background-size: 302%;\n}";
var Nested = /** @class */ (function (_super) {
    __extends(Nested, _super);
    function Nested() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Map appropriate columns to fields property
        _this.fields = {
            iconCss: 'icon', tooltip: 'text'
        };
        _this.animation = { duration: 0 };
        return _this;
    }
    Nested.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("style", null, FolderCss),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'listview', dataSource: listData_1.nestedListData, fields: this.fields, headerTitle: 'Folders', showIcon: true, showHeader: true, animation: this.animation })),
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
    return Nested;
}(sample_base_1.SampleBase));
exports.Nested = Nested;
