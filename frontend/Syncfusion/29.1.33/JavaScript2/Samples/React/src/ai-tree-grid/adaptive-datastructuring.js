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
exports.AdaptiveDataStructuring = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var AdaptiveDataStructuring = /** @class */ (function (_super) {
    __extends(AdaptiveDataStructuring, _super);
    function AdaptiveDataStructuring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptiveDataStructuring.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-tree-grid/images/adaptive-datastructuring.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo highlights the use of AI to structure and correct erroneous hierarchical data within a Tree Grid. The AI-powered prompt identifies and organizes data items into a hierarchical format by accurately establishing parent-child relationships, ensuring the data is properly nested and ready for display in the Tree Grid component."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: '', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Utilizing a specialized AI prompt, the system scans a dataset to identify and restructure hierarchical relationships between records. The AI meticulously corrects any misassigned relationships by adjusting the ",
                    React.createElement("code", null, "ParentId"),
                    " fields, aligning them with their respective top-level ",
                    React.createElement("code", null, "CategoryId"),
                    ". The resulting dataset, now properly organized, is then bound to the Tree Grid for a coherent and accurate display."))));
    };
    return AdaptiveDataStructuring;
}(sample_base_1.SampleBase));
exports.AdaptiveDataStructuring = AdaptiveDataStructuring;
