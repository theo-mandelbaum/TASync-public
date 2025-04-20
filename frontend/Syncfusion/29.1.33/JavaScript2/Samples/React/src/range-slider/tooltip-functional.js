"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.material #property tr#showon {\n    display: none;\n}\n\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n";
var Tooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)({
        placement: 'Before',
        isVisible: true,
        showOn: 'Focus'
    }), tooltip = _a[0], setTooltip = _a[1];
    //Instance of the component
    var defaultObj = (0, react_1.useRef)(null);
    var rangeObj = (0, react_1.useRef)(null);
    //Dropdownlist datasource values for changing tooltip placement for slider component
    var option = [{ text: 'Focus', value: 'Focus' }, { text: 'Hover', value: 'Hover' }, { text: 'Auto', value: 'Auto' },
        { text: 'Always', value: 'Always' }];
    var fields = { value: 'value', text: 'text' };
    var placement = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }];
    var placementField = { value: 'value', text: 'text' };
    // Handling the dropdown list change event to change slider tooltip showOn property
    var onChange = function (args) {
        setTooltip(__assign(__assign({}, tooltip), { showOn: args.value }));
    };
    // Handling the dropdown list change event to change slider tooltip placement
    var onPlacementChange = function (args) {
        setTooltip(__assign(__assign({}, tooltip), { placement: args.value }));
    };
    // Handler used to reposition the tooltip on page scroll
    var onScroll = function () {
        if (rangeObj.current && defaultObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
            rangeObj.current.refreshTooltip(rangeObj.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Default Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: 30, showButtons: true, tooltip: tooltip, ref: defaultObj })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Range Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider02", value: [30, 70], showButtons: true, type: 'Range', tooltip: tooltip, ref: rangeObj })))),
            React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Tooltip' },
                    React.createElement("table", { id: "property", title: "Tooltip", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Placement")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: placement, fields: placementField, index: 0, placeholder: "Select a Placement", popupHeight: "200px", change: onPlacementChange.bind(_this) })))),
                            React.createElement("tr", { id: "showon" },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "ShowOn")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: option, fields: fields, index: 0, placeholder: "Select a ShowOn", popupHeight: "200px", change: onChange.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the rendering of Slider component with Ticks placement. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Ticks are the visual representation of the Slider values. The ticks are differentiated as small ticks and large ticks based on its size. The ticks position can be defined by the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#smallstep" }, " smallStep"),
                " and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#largestep" }, "largeStep"),
                " properties."),
            React.createElement("p", null, " In this demo, we have demonstrated Ticks position with Default and Range Slider."),
            React.createElement("ul", null,
                React.createElement("li", null, "Default Slider \u2013 In this sample, the small ticks and large ticks are rendered with the frequency of 0.05 and 0.20."),
                React.createElement("li", null, "Range Slider \u2013 In this sample, the small ticks and large ticks are rendered with the frequency of 5 and 20.")),
            React.createElement("p", null, " We can also change the Ticks placement of  Slider and Disable Slider component from the property pane."),
            React.createElement("p", null, "We can use the below property to restrict the value range for the slider:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#step" }, "step "),
                    " - to define incremental/decremental step value for slider"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#min" }, "min "),
                    " \u2013 to specify minimum value of the slider"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#max" }, "max "),
                    " \u2013 to specify maximum value of the slider")),
            React.createElement("p", null, "The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider."),
            React.createElement("p", null,
                "For more information, we can refer the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/range-slider/ticks/" }, "ticks"),
                " section from the documentation."))));
};
exports.default = Tooltip;
