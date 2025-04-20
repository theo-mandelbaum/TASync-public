"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
function ColumnTemplate() {
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
    function statusTemplate(props) {
        return (React.createElement("div", null, props.EmployeeAvailability === "Available" ?
            React.createElement("div", { id: "status", className: "statuscolor e-availablecolor" },
                React.createElement("span", { className: "statustxt e-availablecolor" }, props.EmployeeAvailability)) :
            React.createElement("div", { id: "status", className: "statuscolor e-nonavailablecolor" },
                React.createElement("span", { className: "statustxt e-nonavailablecolor" }, props.EmployeeAvailability))));
    }
    function assetTemplate(props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_buttons_1.ChipListComponent, { id: 'chip', chips: props.AssetKit.split(',') })));
    }
    function mailIDTemplate(props) {
        var src = 'mailto:${MailID}' + props.MailID;
        return (React.createElement("div", null,
            React.createElement("a", { href: src }, props.MailID)));
    }
    var template = gridTemplate;
    var filterSettings = {
        type: 'CheckBox',
        operators: {
            stringOperator: [
                { value: 'contains', text: 'Contains' },
                { value: 'doesnotcontain', text: 'Does Not Contains' },
            ],
        },
    };
    var gridInstance;
    var dropInstance;
    var filter = {
        type: 'Menu',
        ui: {
            create: function (args) {
                var flValInput = (0, ej2_base_1.createElement)('input', {
                    className: 'flm-input',
                });
                args.target.appendChild(flValInput);
                var dropdownData = [
                    'Phone',
                    'Mouse',
                    'Laptop',
                    'Keyboard',
                    'Headset',
                    'Tablet',
                    'Projector',
                    'Printer',
                    'Calculator',
                ];
                dropInstance = new ej2_dropdowns_1.MultiSelect({
                    dataSource: dropdownData,
                    placeholder: 'Select a value',
                    popupHeight: '200px',
                    allowFiltering: true,
                    mode: 'Box',
                });
                dropInstance.appendTo(flValInput);
            },
            write: function (args) {
                if (args.filteredValue && args.filteredValue.length > 0) {
                    dropInstance.value = args.filteredValue.split(', ');
                }
            },
            read: function (args) {
                gridInstance.removeFilteredColsByField(args.column.field);
                if ((dropInstance === null || dropInstance === void 0 ? void 0 : dropInstance.value) && (dropInstance === null || dropInstance === void 0 ? void 0 : dropInstance.value.length)) {
                    args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance === null || dropInstance === void 0 ? void 0 : dropInstance.value.sort().join(', '));
                }
            },
        },
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return (gridInstance = grid); }, dataSource: data_1.employeeDetail, width: 'auto', height: '359', allowSorting: true, allowFiltering: true, filterSettings: filterSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Image', width: '180', template: template, textAlign: 'Center' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'ID', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MailID', headerText: 'Email ID', width: '150', template: mailIDTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'DateOfJoining', headerText: 'Date Joined', width: '170', textAlign: 'Right', format: 'yMd', type: 'date' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Team', headerText: 'Team(s)', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportTo', headerText: 'Reporter', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeAvailability', headerText: 'Availability', width: '200', template: statusTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'YearOfExperience', headerText: 'Experience', width: '180' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKit', headerText: 'Asset Kit', width: '180', template: assetTemplate, filter: filter }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: '170', format: 'yMd', textAlign: 'Right', type: 'date' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Location', headerText: 'Location', width: '150', template: locationTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'PhoneNumber', headerText: 'Contact No', width: '150', textAlign: 'Right' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of template columns in a Grid. In this sample, custom images are shown in the Employee Image column.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Grid creates a custom layout for each cell using the column template feature. The",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#template" }, "columns->template")),
                " property accepts either string or HTML element`s ID value, which will be used as the template for the cell."),
            React.createElement("p", null,
                "The column template feature allows the customization of grid cells. In this demo, the Grid showcases the ",
                React.createElement("strong", null, "Employee Image"),
                "column with employee photos, ",
                React.createElement("strong", null, "Mail ID"),
                " column with link tags, ",
                React.createElement("strong", null, "Location"),
                " column with location icons, ",
                React.createElement("strong", null, "Asset Kit"),
                " column with Syncfusion Chip components and ",
                React.createElement("strong", null, "Employee Availability"),
                " column with HTML span elements, using green to indicate available and red to indicate for not available."),
            React.createElement("p", null,
                "More information on the column template can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/columns/column-template" }, "documentation section"),
                "."))));
}
exports.default = ColumnTemplate;
