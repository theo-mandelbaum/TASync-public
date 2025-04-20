"use strict";
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
exports.Templates = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./templates.css");
var dataSource = require("./template-data.json");
var Templates = /** @class */ (function (_super) {
    __extends(Templates, _super);
    function Templates() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        // maps the appropriate column to fields property
        _this.fields = { dataSource: _this.data.templateData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        return _this;
    }
    //set the value to header template
    Templates.prototype.headerTemplate = function () {
        return (React.createElement("div", { className: "head" }, " Employee List "));
    };
    //set the value to item template
    Templates.prototype.itemTemplate = function (data) {
        return (React.createElement("div", null,
            " ",
            React.createElement("img", { className: "eimage", src: "src/images/employees/" + data['eimg'] + ".png" }),
            React.createElement("div", null,
                " ",
                React.createElement("div", { className: "ename" },
                    " ",
                    data.name,
                    " "),
                React.createElement("div", { className: "ejob" },
                    " ",
                    data.job,
                    " "),
                React.createElement("span", { className: "e-badge icons" },
                    React.createElement("span", { className: data['status'] })))));
    };
    //set the value to footer template
    Templates.prototype.footerTemplate = function () {
        return (React.createElement("div", { className: "footer" },
            " ",
            React.createElement("div", { className: "footer-content" },
                React.createElement("span", { className: "e-badge" },
                    React.createElement("span", { className: "display available" },
                        React.createElement("span", { className: "status online" }),
                        "Available"),
                    React.createElement("span", { className: "display meeting" },
                        React.createElement("span", { className: "status busy" }),
                        "Busy"),
                    React.createElement("span", { className: "display unavailable" },
                        React.createElement("span", { className: "status away" }),
                        "Away"))),
            " "));
    };
    //set the value to value template
    Templates.prototype.valueTemplate = function (data) {
        return (React.createElement("div", null,
            React.createElement("div", null,
                " ",
                data.name,
                " - ",
                data.job,
                " ")));
    };
    Templates.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section dropdowntree-templates' },
                React.createElement("div", { className: 'control_wrapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.fields, placeholder: "Select an employee", itemTemplate: this.itemTemplate, footerTemplate: this.footerTemplate, headerTemplate: this.headerTemplate, valueTemplate: this.valueTemplate, popupHeight: "270px", cssClass: "ddt-template", width: "100%" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the template functionalities of the Dropdown Tree. Click the Dropdown Tree element, and then select an item from the customized list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Dropdown Tree has been provided with several options to customize each list items, header, and footer elements."),
                React.createElement("p", null, "This sample uses the following list of templates in the Dropdown Tree"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#itemtemplate" }, "ItemTemplate"),
                        " - To customize the list item's content."),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#headertemplate" }, "HeaderTemplate"),
                        " - To customize the header element."),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#footertemplate" }, "FooterTemplate"),
                        " - To customize the footer element."),
                    React.createElement("li", null,
                        React.createElement("code", null, "valueTemplate"),
                        " - To customize the selected item's element.")))));
    };
    return Templates;
}(sample_base_1.SampleBase));
exports.Templates = Templates;
