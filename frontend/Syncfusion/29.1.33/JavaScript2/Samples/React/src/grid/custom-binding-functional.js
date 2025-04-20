"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
function CustomBinding() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var grid;
    var data;
    var BASE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';
    function rendereComplete() {
        var state = { skip: 0, take: 10 };
        dataStateChange(state);
    }
    function dataStateChange(state) {
        execute(state).then(function (gridData) { grid.dataSource = gridData; });
    }
    var ajax = new ej2_base_1.Ajax({
        type: 'GET', mode: true,
        onFailure: function (e) { return false; }
    });
    function execute(state) {
        return getData(state);
    }
    function getData(state) {
        var pageQuery = "$skip=".concat(state.skip, "&$top=").concat(state.take);
        var sortQuery = '';
        if ((state.sorted || []).length) {
            sortQuery = "&$orderby=" + (state).sorted.map(function (obj) {
                return obj.direction === 'descending' ? "".concat(obj.name, " desc") : obj.name;
            }).reverse().join(',');
        }
        ajax.url = "".concat(BASE_URL, "?").concat(pageQuery).concat(sortQuery, "&$count=true");
        return ajax.send().then(function (response) {
            var data = JSON.parse(response);
            return { result: data['value'], count: parseInt(data['@odata.count'], 10) };
        });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data, ref: function (g) { return grid = g; }, allowPaging: true, allowSorting: true, pageSettings: { pageCount: 4, pageSize: 10 }, allowGrouping: true, dataStateChange: dataStateChange.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', allowGrouping: false }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of grid with AJAX. Paging, sorting and grouping can be performed in this sample.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Grid can be bound with data from external API. In this demo, the external data communication is done using\u00A0AJAX\u00A0and the grid is resolved with the response data. When performing grid actions such as paging, sorting and grouping etc. the\u00A0",
                React.createElement("code", null, "dataStateChange"),
                "\u00A0event will be triggered and we need perform the request and assign the new grid data."),
            React.createElement("p", null,
                "In this demo, simply select the paging and click the column header to sort a column, multiple sorting is also enabled. To group a specify column, drag and drop the column in the group drop area. To enable paging, sorting and grouping, set the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowpaging" }, "allowPaging")),
                " , ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowsorting" }, "allowSorting ")),
                " and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                " as true."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use the paging ,sorting and grouping features, inject the ",
                React.createElement("code", null, "Page"),
                ", ",
                React.createElement("code", null, "Sort"),
                " and ",
                React.createElement("code", null, "Group"),
                " respectively into the",
                React.createElement("code", null, "services"),
                "."))));
}
exports.default = CustomBinding;
