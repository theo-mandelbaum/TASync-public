"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./card.component.css");
var Basic = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section card-control-section basic_card_layout' },
            React.createElement("div", { className: "e-card-resize-container" },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: "row card-layout" },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "e-card", id: "basic_card" },
                                React.createElement("div", { className: "e-card-header" },
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-title" }, "Debunking Five Data Science Myths"),
                                        React.createElement("div", { className: "e-card-sub-title" }, "By John Doe | Jan 20, 2018 "))),
                                React.createElement("div", { className: "e-card-content" }, "Tech evangelists are currently pounding their pulpits about all things AI, machine learning, analytics\u2014anything that sounds like the future and probably involves lots of numbers. Many of these topics can be grouped under the intimidating term data science."),
                                React.createElement("div", { className: "e-card-actions" },
                                    React.createElement("button", { className: "e-btn e-outline e-primary" }, "Read More")))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "e-card", id: "weather_card" },
                                React.createElement("div", { className: "e-card-header" },
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-header-title" }, "Today"),
                                        React.createElement("div", { className: "e-card-sub-title" }, "New York - Scattered Showers."))),
                                React.createElement("div", { className: "e-card-header weather_report" },
                                    React.createElement("div", { className: "e-card-header-image" }),
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-header-title" }, "1\u00BA / -4\u00BA"),
                                        React.createElement("div", { className: "e-card-sub-title" }, "Chance for snow: 100%"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates ",
                React.createElement("code", null, "card"),
                " rendering with the following basic weather layout.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The card is a small content display area in which specific structure of the content can be shown. This sample demonstrates the defined structure and predefined classes for adding basic cards with header, and content elements."),
            React.createElement("p", null,
                "More information about Card can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, " documentation"),
                " section."))));
};
exports.default = Basic;
