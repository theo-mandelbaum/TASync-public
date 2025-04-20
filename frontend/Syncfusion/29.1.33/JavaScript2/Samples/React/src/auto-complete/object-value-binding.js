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
exports.Default = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        var _this = _super.call(this, props) || this;
        _this.records = [];
        // maps the appropriate column to fields property
        _this.fields = { text: 'text', value: 'id' };
        for (var i = 1; i <= 150; i++) {
            var item = {};
            item.id = 'id' + i;
            item.text = "Item ".concat(i);
            // Generate a random number between 1 and 4 to determine the group
            var randomGroup = Math.floor(Math.random() * 4) + 1;
            switch (randomGroup) {
                case 1:
                    item.group = 'Group A';
                    break;
                case 2:
                    item.group = 'Group B';
                    break;
                case 3:
                    item.group = 'Group C';
                    break;
                case 4:
                    item.group = 'Group D';
                    break;
                default:
                    break;
            }
            _this.records.push(item);
        }
        return _this;
    }
    Default.prototype.onChange = function (args) {
        var value = document.getElementById('value');
        // update the text and value property values in property panel based on selected item in DropDownList
        value.innerHTML = "Selected value : " + JSON.stringify(args.value);
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "control-wrapper" },
                    React.createElement("div", { id: "default", style: { paddingTop: '75px' } },
                        React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "games", dataSource: this.records, ref: function (AutoComplete) { _this.listObj = AutoComplete; }, placeholder: "e.g. Item", allowObjectBinding: true, fields: this.fields, change: this.onChange.bind(this), popupHeight: "220px" })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("textarea", { id: "value", title: "Properties", style: { width: '100%', marginTop: '90px', height: '60px', backgroundColor: 'inherit' }, readOnly: true }, "Selected value : ")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The sample showcases the functionality of object value binding in the AutoComplete component. Users can type characters into the AutoComplete field and select an item from the suggestion list. The corresponding object value of the selected item is then assigned to the value property. In the property panel, the ",
                    React.createElement("code", null, "value"),
                    " property of the selected item's will be displayed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "AutoComplete"),
                    " component allows users to select single value from a predefined list. Upon selection, the associated object value is automatically assigned to the ",
                    React.createElement("code", null, "value"),
                    " property, enabled by the ",
                    React.createElement("code", null, "allowObjectBinding"),
                    " feature."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
