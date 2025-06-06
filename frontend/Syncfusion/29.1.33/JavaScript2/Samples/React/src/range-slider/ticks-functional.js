"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var slidercss = "  \n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 45px;\n}\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n.sliderwrap label {\n    padding-bottom: 50px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n}\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\nbody.fluent2-highcontrast .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick,\nbody.fluent2 .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick,\nbody.fluent2-dark .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick {\n    top: -5px;\n}\n\nbody.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick\nbody.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {\n    top: 0px;\n}\n";
function Ticks() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Instance of the control
    var listObj;
    var defaultObj;
    var rangeObj;
    // Initialize ticks with placement, largestep, smallstep
    var defaultTicks = { placement: 'Before', largeStep: 0.20, smallStep: 0.05, showSmallTicks: true };
    var rangeTicks = { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true };
    //Dropdownlist datasource values for changing ticks placement for slider component
    var option = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' },
        { text: 'Both', value: 'Both' }, { text: 'None', value: 'None' }];
    var fields = { value: 'value', text: 'text' };
    // Handling the dropdown list change event to change slider ticks position
    function change() {
        defaultObj.ticks = { placement: listObj.value };
        defaultObj.dataBind();
        rangeObj.ticks = { placement: listObj.value };
        rangeObj.dataBind();
    }
    // Handler used to enable or disable sliders
    function onChange(args) {
        defaultObj.enabled = !args.checked;
        rangeObj.enabled = !args.checked;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Default Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { value: 0.3, min: 0.1, max: 0.9, step: 0.05, ticks: defaultTicks, ref: function (slider) { defaultObj = slider; } })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Range Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { value: [30, 70], min: 10, max: 90, step: 5, type: 'Range', ticks: rangeTicks, ref: function (slider) { rangeObj = slider; } })))),
            React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "userselect" }, "Placement")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: option, fields: fields, index: 0, placeholder: "Select a Placement", popupHeight: "200px", ref: function (dropdownlist) { listObj = dropdownlist; }, change: change.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '12px' } },
                                    React.createElement("div", { className: "userselect" }, "Disabled")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: 0, paddingTop: 0 } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: onChange.bind(this) })))))))),
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
                React.createElement("p", null,
                    "For more information, we can refer the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/range-slider/ticks" }, "ticks"),
                    " section from the documentation.")))));
}
exports.default = Ticks;
