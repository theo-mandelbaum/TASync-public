"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function HeaderTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function gridTemplate(props) {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    }
    function locationTemplate(props) {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-location e-icons" }),
            props.Location));
    }
    function assetTemplate(props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_buttons_1.ChipListComponent, { id: 'chip', chips: props.AssetKit.split(',') })));
    }
    function employeeImageHeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-icon-userlogin e-icons" }),
            "Image"));
    }
    function locationHeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-location e-icons" }),
            "Location"));
    }
    function assetKitHeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-description e-icons" }),
            "Asset Kit"));
    }
    function mailIDHeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-mail e-icons" }),
            "Email ID"));
    }
    function phoneHeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-phone e-icons" }),
            "Contact No"));
    }
    function dateTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-icon-calender e-icons" }),
            "Assigned Date"));
    }
    function mailIDTemplate(props) {
        var src = 'mailto:${MailID}' + props.MailID;
        return (React.createElement("div", null,
            React.createElement("a", { href: src }, props.MailID)));
    }
    var template = gridTemplate;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { id: "gridheadersample", dataSource: data_1.employeeDetail, width: 'auto', height: '359' },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Image', width: '180', template: template, textAlign: 'Center', headerTemplate: employeeImageHeaderTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'ID', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MailID', headerText: 'Email ID', width: '150', template: mailIDTemplate, headerTemplate: mailIDHeaderTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKit', headerText: 'Asset Kit', width: '180', template: assetTemplate, headerTemplate: assetKitHeaderTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: '170', format: 'yMd', headerTemplate: dateTemplate, textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Location', headerText: 'Location', width: '150', template: locationTemplate, headerTemplate: locationHeaderTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'PhoneNumber', headerText: 'Contact No', width: '150', textAlign: 'Right', headerTemplate: phoneHeaderTemplate })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid header template feature. In this sample, custom icons are shown in the column headers.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#headertemplate" }, "header template")),
                " feature enhances your column headers by incorporating custom icons or text alongside the header text. This allows for a more visually appealing and informative presentation of your data. In this demonstration, you will see how custom icons are integrated into the column headers, which include ",
                React.createElement("strong", null, "Employee Image"),
                ", ",
                React.createElement("strong", null, "MailID"),
                ", ",
                React.createElement("strong", null, "Phone Number"),
                ", ",
                React.createElement("strong", null, "Location"),
                ", ",
                React.createElement("strong", null, "Asset Kit"),
                ", and ",
                React.createElement("strong", null, "Assigned Date"),
                ". These header icons represent the column's content, making it easy to identify and understand at a glance."),
            React.createElement("p", null,
                "More information on the header template can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/columns/column-headers#header-template" }, "documentation section"),
                "."))));
}
exports.default = HeaderTemplate;
