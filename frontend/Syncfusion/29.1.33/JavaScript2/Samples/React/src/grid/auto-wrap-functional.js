"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
function AutoWrap() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.inventoryData, allowPaging: true, pageSettings: { pageCount: 5 }, allowTextWrap: true, height: '400' },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Inventor', headerText: 'Inventor', width: '180', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'NumberofPatentFamilies', headerText: 'Number of Patent Families', width: '180', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Active', headerText: 'Active', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Mainfieldsofinvention', headerText: 'Main Fields of Invention', width: '200' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] })),
            React.createElement("div", { className: "e-dsalign" },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_prolific_inventors", target: '_blank' }, "Wikipedia: List of Prolific inventors"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the Grid component with the auto wrap column cell. In this sample, you can see that the ",
                React.createElement("b", null, "main fields of invention"),
                " column cell content exceeded the available width hence it has been wrapped into multiple lines.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Auto wrap cell content can be enabled using  ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowtextwrap' }, "allowTextWrap")),
                " property of the Grid. Setting this property will wrap cell text on multiple lines. This feature is useful to view the cell content when it exceeds the cell width."),
            React.createElement("p", null, "Setting this property will wrap the text in both content cell and header cell."),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowtextwrap' }, "allowTextWrap")),
                " property is enabled and you can also see that the ",
                React.createElement("b", null, "main fields of invention"),
                " column whose content exceeded the cell width is wrapped into multiple lines."))));
}
exports.default = AutoWrap;
