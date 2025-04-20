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
exports.WeatherPrediction = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var WeatherPrediction = /** @class */ (function (_super) {
    __extends(WeatherPrediction, _super);
    function WeatherPrediction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeatherPrediction.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-maps/images/weather-prediction.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of AI for automatically forecasting weather conditions in the United States for the next five days using marker templates in the Syncfusion React Maps component."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, users can view weather predictions for the next five days provided by AI. The data is then converted into a source for the ",
                    React.createElement("code", null, "markerSettings"),
                    " property, which renders the weather forecasts as marker templates in the Syncfusion React Maps component."))));
    };
    return WeatherPrediction;
}(sample_base_1.SampleBase));
exports.WeatherPrediction = WeatherPrediction;
