"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor quick format toolbar sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./quick-format-toolbar.css");
function QuickFormatToolbar() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        type: ej2_react_richtexteditor_1.ToolbarType.Expand,
        enableFloating: false
    };
    var quickToolbarSettings = {
        text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor', 'Alignments', '-', 'FontSize', 'FontName', 'Formats', 'OrderedList', 'UnorderedList', 'FormatPainter']
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "quickRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, toolbarSettings: toolbarSettings, quickToolbarSettings: quickToolbarSettings },
                    React.createElement("div", null,
                        React.createElement("p", null, "Solar energy is radiant light and heat from the sun that is harnessed and converted into usable forms of energy. It is a clean, renewable, and abundant source of power that has a wide range of applications across various sectors. Solar energy is typically harnessed through solar technologies, such as photovoltaic (PV) cells and solar thermal systems."),
                        React.createElement("p", null, "Here's an overview of solar energy:"),
                        React.createElement("h3", null,
                            React.createElement("strong", null, "Photovoltaic (PV) solar energy:")),
                        React.createElement("p", null, "Photovoltaic Cells: PV cells, commonly known as solar cells, convert sunlight directly into electricity. They are made of semiconductor materials, often silicon, which absorb photons (particles of light) and release electrons, generating an electric current."),
                        React.createElement("p", null, "Applications: PV solar energy is used for residential and commercial electricity generation, remote power systems, and grid-connected utility-scale power plants."),
                        React.createElement("h3", null,
                            React.createElement("strong", null, "Solar Thermal Energy:")),
                        React.createElement("ul", null,
                            React.createElement("li", null, "Concentrated Solar Power (CSP): CSP systems use mirrors or lenses to concentrate sunlight onto a receiver. The collected heat is used to generate steam, which drives turbines and generates electricity."),
                            React.createElement("li", null, "Solar Water Heating: Solar thermal systems can heat water for domestic or industrial use. They consist of solar collectors that absorb sunlight and transfer heat to a fluid, which is then used for heating.")),
                        React.createElement("h3", null,
                            React.createElement("strong", null, "Solar Energy Advantages:")),
                        React.createElement("p", null, "Renewable and Abundant: Solar energy is virtually limitless, as the sun provides an immense and continuous supply of energy. Clean and Environmentally Friendly: Solar energy production does not emit greenhouse gases or other pollutants, contributing to a reduced carbon footprint and improved air quality. Reduced Energy Bills: Solar installations can significantly lower electricity bills for homes and businesses by generating free electricity from the sun. Low Operating and Maintenance Costs: Solar systems have minimal operating and maintenance costs once installed, making them cost-effective over their lifespan."),
                        React.createElement("h3", null,
                            React.createElement("strong", null, "Challenges and Considerations:")),
                        React.createElement("p", null, "Intermittency: Solar energy is dependent on sunlight, which varies with weather conditions and the time of day. Energy storage solutions are important to ensure a continuous power supply. Initial Costs: While solar energy has become more affordable, the upfront costs of solar panel installation can be a barrier for some. Space Requirements: Large solar installations require substantial land or roof space to achieve significant energy output. Efficiency and Technology: Solar panel efficiency continues to improve, but optimising energy conversion and storage technologies remains a focus."),
                        React.createElement("h3", null,
                            React.createElement("strong", null, "Solar Energy Applications:")),
                        React.createElement("p", null, "Residential Energy: Homeowners can install solar panels on rooftops to generate electricity for personal use or even sell excess power back to the grid. Commercial and Industrial: Businesses and industries use solar energy to power their operations, reduce energy costs, and meet sustainability goals. Off-Grid Power: Solar power is invaluable in remote areas without access to traditional power grids, providing electricity for lighting, communication, and basic needs. Solar-Powered Transportation: Solar energy can be used to charge electric vehicles (EVs) and provide energy for electric public transportation."),
                        React.createElement("img", { src: "https://media.istockphoto.com/id/494417257/photo/photovoltaic-panels.jpg?s=612x612&w=0&k=20&c=USdqOh0Pjuyv-jOB-ny5JPV6VQ1U5PvPo-xgBuhKPxc=", width: "300px", className: "e-rte-image e-imginline" })),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.FormatPainter, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the \"Quick Format Toolbar\" option in Rich Text Editor content. To select the text content inside the Rich Text Editor and open the Quick Format toolbar for editing the Rich Text Editor value.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Quick format toolbar is used to easily edit the value of the Rich Text Editor when there is a lot of content in it. This quick toolbar item provides any toolbar item in the Rich Text Editor. This will support all the items in the toolbars of the Rich Text Editor."),
            React.createElement("p", null,
                "In this demo, to enable this feature, configure the items in",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/rich-text-editor/#quicktoolbarsettings' }, "quickToolbarSettings.text"),
                " property."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "The above features built as modules have to be included in your application. For example, to use image and link, inject the specific module using ",
                React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar, FormatPainter, PasteCleanup"),
                "."))));
}
exports.default = QuickFormatToolbar;
