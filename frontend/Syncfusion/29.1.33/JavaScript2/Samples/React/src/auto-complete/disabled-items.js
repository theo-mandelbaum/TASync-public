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
exports.Grouping = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./disabled-items.css");
var data = require("./dataSource.json");
var Grouping = /** @class */ (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'statusData';
        //define the data with status
        _this.statusData = data[_this.temp];
        // map the groupBy field with status
        _this.statusFields = { value: "Status", disabled: "State" };
        _this.tempData = 'vegetables';
        //define the data with groupong
        _this.vegetableData = data[_this.tempData];
        // map the vegetable field with Class column
        _this.vegetableFields = { groupBy: 'Category', value: 'Vegetable', disabled: 'State' };
        return _this;
    }
    Grouping.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'dropIcon' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "disabled-status" },
                        React.createElement("h4", null, "Status"),
                        React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "status", dataSource: this.statusData, fields: this.statusFields, placeholder: "Select Status" }))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "vegetable" },
                        React.createElement("h4", null, "Vegetable"),
                        React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "vegetables", dataSource: this.vegetableData, fields: this.vegetableFields, placeholder: "Select Vegetable" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example showcases the disabled items of AutoComplete. When you type on the AutoComplete the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The AutoComplete provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the ",
                    React.createElement("code", null, "fields.disabled"),
                    " property."))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
