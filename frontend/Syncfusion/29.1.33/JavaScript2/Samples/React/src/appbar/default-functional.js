"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section default-appbar-section' },
            React.createElement("div", { className: 'control appbar-sample' },
                React.createElement("div", { className: "default-appbar-container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("h1", null, "Simple AppBar"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement(ej2_react_navigations_1.AppBarComponent, { colorMode: "Primary" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (regularBtn) { return (regularBtn = regularBtn); }, "aria-label": 'menu', cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' }),
                                React.createElement("span", { className: "regular" }, "React AppBar"),
                                React.createElement("div", { className: "e-appbar-spacer" }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-inherit login' }, "FREE TRIAL")))),
                    React.createElement("br", null),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("h1", null, "Prominent"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement(ej2_react_navigations_1.AppBarComponent, { mode: "Prominent", cssClass: 'prominent-appbar', colorMode: "Primary" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (primaryBtn) { return (primaryBtn = primaryBtn); }, "aria-label": 'menu', cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' }),
                                React.createElement("span", { className: "prominent" }, "React AppBar Component with Prominent mode"),
                                React.createElement("div", { className: "e-appbar-spacer" }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-inherit login' }, "FREE TRIAL")))),
                    React.createElement("br", null),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("h1", null, "Dense"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement(ej2_react_navigations_1.AppBarComponent, { mode: "Dense", colorMode: "Primary" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (denseBtn) { return (denseBtn = denseBtn); }, "aria-label": 'menu', cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' }),
                                React.createElement("span", { className: "dense" }, "React AppBar"),
                                React.createElement("div", { className: "e-appbar-spacer" }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-inherit login' }, "FREE TRIAL")))),
                    React.createElement("br", null)))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the default functionalities of the ",
                React.createElement("strong", null, "React AppBar"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("strong", null, "React AppBar"),
                " is a navigation component that displays information and actions related to the current view horizontally. "),
            " ",
            React.createElement("br", null),
            React.createElement("p", null,
                "In this demo, the available types of React AppBar are showcased. They are ",
                React.createElement("code", null, "regular"),
                ", ",
                React.createElement("code", null, "prominent"),
                ", and ",
                React.createElement("code", null, "dense"),
                ", and can be set using the ",
                React.createElement("strong", null, "Mode"),
                " property. "),
            React.createElement("p", null,
                React.createElement("code", null, "Regular"),
                " - The AppBar is displayed with the default height."),
            React.createElement("p", null,
                React.createElement("code", null, "Prominent"),
                " - Prominent top app bars are longer than regular, and can be used for larger titles, images, or texts."),
            React.createElement("p", null,
                React.createElement("code", null, "Dense"),
                " - The AppBar's layout is denser to accommodate all the AppBar content."),
            React.createElement("p", null,
                "In this demo, ",
                React.createElement("strong", null, "Button"),
                " component's styles are inherited from the ",
                React.createElement("strong", null, "AppBar"),
                " component using the ",
                React.createElement("code", null, "e-inherit"),
                " CSS class. "))));
};
exports.default = Default;
