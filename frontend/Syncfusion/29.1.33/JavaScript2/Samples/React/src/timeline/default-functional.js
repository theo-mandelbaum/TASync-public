"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var orderStatus = [
        'Ordered \n 9:15 AM, January 1, 2024',
        'Shipped \n 12:20 PM, January 4, 2024',
        'Out for delivery \n 07:00 AM, January 8, 2024',
        'Delivered \n Estimated delivery by 09:20 AM'
    ];
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "default-timeline-section" },
                React.createElement(ej2_react_layouts_1.TimelineComponent, null,
                    React.createElement(ej2_react_layouts_1.ItemsDirective, null,
                        React.createElement(ej2_react_layouts_1.ItemDirective, { content: orderStatus[0], dotCss: 'state-success', cssClass: 'completed' }),
                        React.createElement(ej2_react_layouts_1.ItemDirective, { content: orderStatus[1], dotCss: 'state-success', cssClass: 'completed' }),
                        React.createElement(ej2_react_layouts_1.ItemDirective, { content: orderStatus[2], dotCss: 'state-progress', cssClass: 'intermediate' }),
                        React.createElement(ej2_react_layouts_1.ItemDirective, { content: orderStatus[3] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the Timeline component including the highlighted customization.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Timeline component enables users to display a series of data in chronological order, such as user activities, tracking progress, and more. In this example, we have used the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline/timelineItem/#content" }, "content"),
                " property to display the item's content, ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline/timelineItem/#dotcss" }, "dotCss"),
                " property to customize the dot with background color and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline/timelineItem/#cssclass" }, "cssClass"),
                " to customize the last connector as dashed style."))));
};
exports.default = Default;
