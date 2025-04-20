"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./hamburger-mode.css");
var dataSource = require("./menu-data.json");
var ej2_base_1 = require("@syncfusion/ej2-base");
var HamburgerMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var menuObj = (0, react_1.useRef)(null);
    var data = dataSource;
    var _a = (0, react_1.useState)({
        showItemOnClick: true,
        hamburgerMode: true
    }), state = _a[0], setState = _a[1];
    var _b = (0, react_1.useState)('deviceLayout'), layout = _b[0], setLayout = _b[1];
    var menuCreated = function () {
        if (ej2_base_1.Browser.isDevice) {
            (0, ej2_base_1.select)('.property-section').remove();
            (0, ej2_base_1.select)('#layoutcontainer').removeAttribute('class');
            (0, ej2_base_1.select)('#layoutcontainer').removeAttribute('id');
            (0, ej2_base_1.select)('#menu').style.height = '363px';
        }
    };
    var modeChange = function (args) {
        var container = document.querySelector('#layoutcontainer');
        switch (args.value) {
            case 'Mobile':
            case 'Tablet':
                menuObj.current.close();
                args.value === 'Mobile' ? setLayout('deviceLayout') : setLayout('deviceLayout tabletview');
                menuObj.current.element.parentElement.classList[args.value === 'Mobile' ? 'remove' : 'add']('e-menu-icon-right');
                setState({ showItemOnClick: true, hamburgerMode: true });
                break;
            case 'Desktop':
                setLayout('');
                setState({ showItemOnClick: false, hamburgerMode: false });
                break;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "menu-section control-section" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { id: "hamburgerMenu" },
                    React.createElement("div", { id: 'layoutcontainer', className: layout },
                        React.createElement("div", { className: "speaker" },
                            React.createElement("div", { className: "camera" })),
                        React.createElement("div", { className: "layout" },
                            React.createElement("div", { id: "container" },
                                React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menu", items: data.hamburgerData, showItemOnClick: state.showItemOnClick, hamburgerMode: state.hamburgerMode, ref: menuObj, created: menuCreated }))),
                        React.createElement("div", { className: "outerButton" })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", null, "View Mode")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { value: 'Mobile', dataSource: data.viewModeData, popupHeight: '200px', change: modeChange }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the hamburger mode in the ",
                React.createElement("code", null, "menu"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Enabling the ",
                React.createElement("code", null, "hamburgerMode"),
                " property makes the ",
                React.createElement("code", null, "menu"),
                " component in adaptive view. By default, its shows header with hamburger icon in ",
                React.createElement("code", null, "Horizontal"),
                " orientation."),
            React.createElement("p", null,
                "The menu shows on clicking hamburger icon. You can use the ",
                React.createElement("code", null, "open"),
                " and ",
                React.createElement("code", null, "close"),
                " methods to show / hide the menu programmatically."),
            React.createElement("p", null,
                "More information about Menu can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/getting-started" }, "documentation"),
                " section."))));
};
exports.default = HamburgerMenu;
