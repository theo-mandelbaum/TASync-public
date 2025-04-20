"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./paging.css");
ej2_base_1.L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});
function Paging() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section paging-api' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, locale: 'en-US', allowPaging: true, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar, height: 365, pageSettings: { pageCount: 4, pageSizes: true } },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '170', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid paging feature. In this sample, click the numeric items to navigate to particular page. You can also change the page size using the dropdown.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Paging allows you to display the contents of the Grid component in page segments. By default, paging is disabled. To enable paging, set ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowpaging' }, "allowPaging")),
                " property to true.",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagesizes' }, "pageSettings->pagesizes")),
                "property enables a dropdown in pager which allows you to change the number of records in the Grid dynamically."),
            React.createElement("p", null,
                "In this demo, the Grid is rendered with",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagesizes" }, "pageSettings->pageSizes")),
                " set to true and",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagecount" }, "pageSettings->pageCount")),
                " set to 4."),
            React.createElement("p", null, "The Pager component has been enhanced to be more responsive. It now includes the ability to automatically resize itself and dynamically show or hide pager items based on the width of the Grid."),
            React.createElement("p", null,
                "Changed default pager details information using the ",
                React.createElement("code", null, "totalItemsInfo"),
                " locale property."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use paging feature, we need to inject ",
                React.createElement("code", null, "Page"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the paging feature configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/paging.html' }, " documentation section"),
                "."))));
}
exports.default = Paging;
