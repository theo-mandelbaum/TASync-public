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
exports.AnomalyDetection = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var AnomalyDetection = /** @class */ (function (_super) {
    __extends(AnomalyDetection, _super);
    function AnomalyDetection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnomalyDetection.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-grid/images/anomaly-detection.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how the syncfusion React DataGrid, enhanced with AI, can detect anomalies within its data."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the DataGrid displays details like Machine ID, Voltage, Pressure, Temperature, Motor Speed, and Production Rate. AI analyzes this data to identify unusual points and explains why they are considered anomalies. When you press the \"Detect Anomaly\" button, the grid updates to display the anomaly details."))));
    };
    return AnomalyDetection;
}(sample_base_1.SampleBase));
exports.AnomalyDetection = AnomalyDetection;
