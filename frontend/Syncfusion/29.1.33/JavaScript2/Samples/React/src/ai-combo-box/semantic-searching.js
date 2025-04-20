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
exports.ComboBoxSemanticSearch = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ComboBoxSemanticSearch = /** @class */ (function (_super) {
    __extends(ComboBoxSemanticSearch, _super);
    function ComboBoxSemanticSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComboBoxSemanticSearch.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-combo-box/images/semantic-search.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo highlights the advanced capabilities of the Syncfusion React ComboBox, specifically focusing on the Semantic Search feature:"),
                React.createElement("p", null,
                    React.createElement("strong", null, "Semantic Search:"),
                    " Users can search for items based on the meaning and context of their queries, rather than relying solely on exact keyword matches. This AI-driven feature enhances search accuracy by understanding the intent behind user inputs, delivering more relevant and intuitive results. It is especially beneficial in applications where finding the right item quickly is crucial."),
                React.createElement("p", null, "This feature makes the Syncfusion React ComboBox a powerful tool for creating more intelligent and responsive search interfaces."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion JavaScript AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Semantic Search:"),
                    " The Semantic Search feature empowers users to find items by interpreting the context and meaning of their search queries. Unlike traditional search methods that depend on exact keyword matches, Semantic Search understands the intent behind the query, offering more accurate and relevant results. This enhances user experience, particularly in complex or large datasets, by making search interactions more intuitive and effective."))));
    };
    return ComboBoxSemanticSearch;
}(sample_base_1.SampleBase));
exports.ComboBoxSemanticSearch = ComboBoxSemanticSearch;
