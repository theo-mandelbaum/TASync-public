"use strict";
/**
 * Tooltip smart position sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n#targetContainer {\n    border: 1px solid #dddddd;\n    min-height: 350px;\n    position: relative;\n    overflow: hidden;\n}\n#demoSmart {\n    background-image: url('./src/tooltip/images/smartposition.png');\n    background-size: 100px 100px;\n    height: 100px;\n    position: absolute;\n    left: calc( 50% - 50px);\n    top: calc( 50% - 50px);\n    width: 100px;\n}";
var DraggableTooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var tooltipInstance = React.useRef(null);
    //Set tooltip animation
    var tooltipAnimation = {
        open: { effect: 'None' },
        close: { effect: 'None' }
    };
    var rendereComplete = function () {
        //Handle tooltip smart positioning.
        var ele = document.getElementById('demoSmart');
        var drag = new ej2_base_1.Draggable(ele, {
            clone: false,
            dragArea: '#targetContainer',
            drag: function (args) {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    tooltipInstance.current.open(args.element);
                }
                else {
                    tooltipInstance.current.refresh(args.element);
                }
            },
            dragStart: function (args) {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    tooltipInstance.current.open(args.element);
                }
            },
            dragStop: function () {
                tooltipInstance.current.close();
            }
        });
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_popups_1.TooltipComponent, { id: 'targetContainer', ref: tooltipInstance, content: 'Drag me anywhere, to start walking with me !!!', offsetX: -15, target: '#demoSmart', animation: tooltipAnimation },
                React.createElement("div", { id: 'demoSmart' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("b", null, "smart positioning"),
                " functionalities of the Tooltip which will open by dragging the picture.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample shows the dynamic adjustment of the tooltip position within the specified Viewport. Start dragging the ant image, so that the tooltip opens up immediately and keeps moving along with the target image. When the image reaches the corners of the sample container on dragging, the tooltip and its arrow position will be auto adjusted to make it look fit within the sample container area."),
            React.createElement("p", null,
                "In this sample, the tooltip is opened manually by using its ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#open" }, "open"),
                " method on drag start of the target image. On further dragging, the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#refresh" }, "refresh"),
                " method of the tooltip needs to be called to reposition it continuously and on drag stop, the tooltip will be hidden by using it\u2019s ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#close" }, "close"),
                " method."),
            React.createElement("p", null,
                "More information on dynamic positioning of the tooltip can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/tooltip/position/#dynamic-positioning", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = DraggableTooltip;
