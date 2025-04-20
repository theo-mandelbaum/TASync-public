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
exports.PropertyPane = void 0;
var ReactDOM = require("react-dom");
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var PropertyPane = /** @class */ (function (_super) {
    __extends(PropertyPane, _super);
    function PropertyPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPane.prototype.render = function () {
        var mobilePropPane = (0, ej2_base_1.select)('.sb-mobile-prop-pane');
        var isMobile = window.matchMedia('(max-width:550px)').matches;
        return isMobile && mobilePropPane ?
            ReactDOM.createPortal(React.createElement("div", { className: 'property-panel-section' },
                React.createElement("div", { className: "property-panel-header" }, this.props.title),
                React.createElement("div", { className: "property-panel-content" }, this.props.children)), mobilePropPane)
            :
                (React.createElement("div", { className: 'property-panel-section' },
                    React.createElement("div", { className: "property-panel-header" }, this.props.title),
                    React.createElement("div", { className: "property-panel-content" }, this.props.children)));
    };
    return PropertyPane;
}(React.Component));
exports.PropertyPane = PropertyPane;
