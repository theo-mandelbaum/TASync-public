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
exports.SemanticFiltering = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SemanticFiltering = /** @class */ (function (_super) {
    __extends(SemanticFiltering, _super);
    function SemanticFiltering() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemanticFiltering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-grid/images/semantic-filtering.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how the syncfusion React DataGrid, integrated with AI, supports Semantic Search."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the DataGrid displays diagnostic information from medical reports. With Semantic Search, you don\u2019t need to enter the exact word to find related information. For instance, if the DataGrid lists \"Abdominal pain,\" it can still show relevant reports even if you search for \"stomach\" instead of the exact term. The grid dynamically displays related search results using AI."))));
    };
    return SemanticFiltering;
}(sample_base_1.SampleBase));
exports.SemanticFiltering = SemanticFiltering;
