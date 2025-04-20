"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
var Orientation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("Top"), orientation = _a[0], setOrientation = _a[1];
    var tabObj = (0, react_1.useRef)(null);
    // Mapping ListView component dataSource property
    var romeEmployees = [
        { id: '1', name: 'Anne Dodsworth', role: 'Product Manager' },
        { id: '2', name: 'Laura Callahan', role: 'Team Lead' },
        { id: '3', name: 'Andrew Fuller', role: 'Developer' }
    ];
    // Mapping ListView component dataSource property
    var parisEmployees = [
        { id: '4', name: 'Robert King', role: 'Team Lead' },
        { id: '5', name: 'Michael Suyama', role: 'Developer' },
        { id: '6', name: 'Margaret Peacock', role: 'Developer' }
    ];
    // Mapping ListView component dataSource property
    var londonEmployees = [
        { id: '7', name: 'Janet Leverling', role: 'CEO' },
        { id: '8', name: 'Steven Buchanan', role: 'HR' },
        { id: '9', name: 'Nancy Davolio', role: 'Product Manager' }
    ];
    // Change event funtion for DropDownList component   
    var changeOrientationMode = function (e) {
        setOrientation(e.itemData.text);
    };
    // Change event funtion for DropDownList component   
    var changeHeaderStyles = function (e) {
        removeStyleClass();
        var name = document.getElementById('headerStyles').value;
        if (name === 'Fill') {
            tabObj.current.element.classList.add('e-fill');
        }
        else if (name === 'Accent') {
            tabObj.current.element.classList.add("e-background");
            tabObj.current.element.classList.add("e-accent");
        }
        tabObj.current.refreshActiveBorder();
    };
    var removeStyleClass = function () {
        tabObj.current.element.classList.remove("e-fill");
        tabObj.current.element.classList.remove("e-background");
        tabObj.current.element.classList.remove("e-accent");
    };
    // Mapping DropDownList dataSource property
    var oData = [
        { 'value': 'top', 'text': 'Top' }, { 'value': 'bottom', 'text': 'Bottom' },
        { 'value': 'left', 'text': 'Left' }, { 'value': 'right', 'text': 'Right' }
    ];
    // Mapping DropDownList fields property
    var fields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    var orientVal = 'top';
    // Mapping DropDownList dataSource property
    var hData = [
        { 'value': 'default', 'text': 'Default' },
        { 'value': 'fill', 'text': 'Fill' },
        { 'value': 'accent', 'text': 'Accent' }
    ];
    // Mapping DropDownList value property
    var hdrVal = 'default';
    var templateString = function (data) {
        return (React.createElement("div", { className: "template-container" },
            React.createElement("div", { className: "left" },
                React.createElement("img", { className: 'empImg', src: "src/tab/Employees/".concat(data.id, ".png"), alt: '${data.id}' }),
                React.createElement("div", { className: "left info-div" },
                    React.createElement("div", { className: "name" },
                        " ",
                        data.name),
                    React.createElement("div", { className: "role" },
                        " ",
                        data.role)))));
    };
    var template1 = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "content-title" },
                React.createElement("div", { className: "cnt-text" }, "Employee Info")),
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "rome", dataSource: romeEmployees, template: templateString })));
    };
    var template2 = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "content-title" },
                React.createElement("div", { className: "cnt-text" }, "Employee Info")),
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "paris", dataSource: parisEmployees, template: templateString })));
    };
    var template3 = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "content-title" },
                React.createElement("div", { className: "cnt-text" }, "Employee Info")),
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "london", dataSource: londonEmployees, template: templateString })));
    };
    // Mapping Tab items Header property
    var headertext;
    headertext = [{ text: "Rome" }, { text: "Paris" }, { text: "London" }];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section tab-control-section row' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement(ej2_react_navigations_1.TabComponent, { ref: tabObj, cssClass: 'orientation-tab', headerPlacement: orientation, showCloseButton: true, height: 320 },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: template1.bind(_this) }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: template2.bind(_this) }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[2], content: template3.bind(_this) })))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Header Placement")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'orientation', dataSource: oData, fields: fields, value: orientVal, width: '90%', change: changeOrientationMode.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Header Styles")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'headerStyles', dataSource: hData, fields: fields, value: hdrVal, width: '90%', change: changeHeaderStyles.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "header"),
                " orientation of the ",
                React.createElement("code", null, "Tab"),
                ". Select option from drop-downs to switch header placement and changing the header style in properties panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Tab"),
                " allows to place the header section inside the Tab component either at",
                React.createElement("code", null, "top / bottom / left / right"),
                " position by using ",
                React.createElement("code", null, "headerPlacement"),
                " property."),
            React.createElement("p", null,
                "This sample illustrates the use of header placement and ",
                React.createElement("code", null, "showCloseButton"),
                " property. Users can change the header position by changing the drop-down value options and can close the Tab item by clicking close icon in header.",
                React.createElement("br", null),
                React.createElement("br", null),
                "The User can also view different header styles of Tab component by selecting options from `Header Styles` drop-down. Header styles changed by adding predefined classes in Tab root element and it class names listed below",
                React.createElement("br", null)),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Material and Fabric theme differentiates all the available tab header styles such as ",
                    React.createElement("code", null, "e-fill"),
                    ", ",
                    React.createElement("code", null, "e-background e-accent"),
                    "."),
                React.createElement("li", null,
                    "In bootstrap theme, all the styles such as ",
                    React.createElement("code", null, "e-fill"),
                    " & ",
                    React.createElement("code", null, "e-background e-accent"),
                    " will have the same look with no difference.")),
            React.createElement("p", null, "If above classes not included in root element default style will applied in Tab component."),
            React.createElement("p", null,
                "More information about Tab can be found in this ",
                React.createElement("a", { "aria-label": "Tab getting started", target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, "documentation"),
                " section."))));
};
exports.default = Orientation;
