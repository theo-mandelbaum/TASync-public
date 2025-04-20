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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                title: 'Home',
                iconCss: 'e-icons e-home'
            },
            {
                title: 'People',
                iconCss: 'e-icons e-people'
            },
            {
                title: 'Search',
                iconCss: 'e-icons e-search'
            },
            {
                title: 'Message',
                iconCss: 'e-icons e-comment-show'
            }
        ];
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "speed-dial-wrapper" },
                    React.createElement("div", { id: "speeddialtarget", className: "speeddial-default-target  custom-index" },
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { title: "Menu", openIconCss: 'e-icons e-justify', closeIconCss: 'e-icons e-close', target: '#speeddialtarget', position: 'BottomCenter', items: this.items })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the Speed Dial component. Speed dial is a ",
                    React.createElement("b", null, "transition type"),
                    " of FAB which displays a list of action buttons when clicked.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Speed Dial component is used to display multiple action items for the floating action button. It is useful when there are more than one primary action on the page. The Speed dial displays action items in linear and radial directions.. "))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
