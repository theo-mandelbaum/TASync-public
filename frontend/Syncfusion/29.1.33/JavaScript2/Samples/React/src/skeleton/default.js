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
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row skeleton-row" },
                React.createElement("div", { className: "col-sm-6 container" },
                    React.createElement("p", { className: 'displayText' }, "Circle"),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonCircleSmall', shape: 'Circle', width: '3rem' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonCircleMedium', shape: 'Circle', width: '48px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonCircleLarge', shape: 'Circle', width: '64px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonCircleLarger', shape: 'Circle', width: '80px' })),
                React.createElement("div", { className: "col-sm-6 container" },
                    React.createElement("p", { className: 'displayText' }, "Square"),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonSquareSmall', shape: 'Square', width: '3rem' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonSquareMedium', shape: 'Square', width: '48px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonSquareLarge', shape: 'Square', width: '64px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { className: 'skeleton', id: 'skeletonSquareLarger', shape: 'Square', width: '80px' }))),
            React.createElement("div", { className: "row skeleton-row" },
                React.createElement("div", { className: "col-sm-6 container" },
                    React.createElement("p", { className: 'displayText' }, "Text"),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonText', shape: 'Text', width: '100%', height: '15px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonTextMedium', width: '30%', height: '15px' }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonTextSmall', width: '15%', height: '15px' }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonTextMedium1', width: '60%', height: '15px' }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonTextSmall1', width: '15%', height: '15px' })),
                React.createElement("div", { className: "col-sm-6 container" },
                    React.createElement("p", { className: 'displayText' }, "Rectangle"),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonRectangle', shape: 'Rectangle', width: '100%', height: '100px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonRectangleMedium', shape: 'Rectangle', width: '20%', height: '35px' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonRectangleMediumRight', shape: 'Rectangle', width: '20%', height: '35px' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different shapes supported by the skeleton component. The skeleton is an animating placeholder which shows the expected layout before the actual content is loaded.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The shape of skeleton can be changed using the ",
                    React.createElement("code", null, "shape"),
                    " property. It supports ",
                    React.createElement("b", null, "Circle"),
                    ", ",
                    React.createElement("b", null, "Square"),
                    ", ",
                    React.createElement("b", null, "Text"),
                    " and ",
                    React.createElement("b", null, "Rectangle"),
                    ". By default, the wave animation effect is applied."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
