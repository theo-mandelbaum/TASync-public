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
exports.Template = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./template.css");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = data["template_data"];
        return _this;
    }
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { id: "template-listbox-control" },
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: this.data, itemTemplate: '<div class="list-wrapper"><span class="${pic} e-avatar e-avatar-xlarge e-avatar-circle"></span><span class="text">${text}</span><span class="description">${description}</span></div>' }))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the Item template functionalities of a ListBox. Here, SVG icons were used for visual representation of every list items. ")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "ListBox"),
                    "is a graphical user interface component used to display a list of items. This sample illustrates how to integrate the item template to customize the list item's content and this can be specified by using ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#itemtemplate" },
                        React.createElement("code", null, "itemTemplate")),
                    " property."),
                React.createElement("p", null,
                    "In this sample, data is bound to the ListBox using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#datasource" },
                        React.createElement("code", null, "dataSource")),
                    " property."),
                React.createElement("p", null,
                    " More information about the ListBox can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/getting-started", target: "_blank" }, " documentation"),
                    " section."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
