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
exports.NaturalLanguageQuery = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var NaturalLanguageQuery = /** @class */ (function (_super) {
    __extends(NaturalLanguageQuery, _super);
    function NaturalLanguageQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NaturalLanguageQuery.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-querybuilder/images/natural-languagequery.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Natural Language Querying in the Query Builder allows users to construct complex queries using plain, everyday language. Instead of relying on technical query syntax, users can simply type their questions or requests as they would naturally speak them. This feature interprets the intent and generates the corresponding query, making data retrieval more accessible to non-technical users."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Natural Language Querying feature enables users to input queries in plain language, which the system then interprets to automatically generate the appropriate database queries. This simplifies the process of data retrieval, allowing users to obtain insights without needing to understand complex query syntax."))));
    };
    return NaturalLanguageQuery;
}(sample_base_1.SampleBase));
exports.NaturalLanguageQuery = NaturalLanguageQuery;
