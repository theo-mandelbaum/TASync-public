"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./grid-overview.css");
function statusTemplate(props) {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", null, props.Status === "Active" ?
        React.createElement("div", { id: "status", className: "statustemp e-activecolor" },
            React.createElement("span", { className: "statustxt e-activecolor" }, props.Status)) :
        React.createElement("div", { id: "status", className: "statustemp e-inactivecolor" },
            React.createElement("span", { className: "statustxt e-inactivecolor" }, props.Status))));
}
function ratingTemplate(props) {
    return (React.createElement("div", null,
        React.createElement(ej2_react_inputs_1.RatingComponent, { value: props.Rating, cssClass: 'custom-rating', readOnly: true })));
}
function progessTemplate(props) {
    var percentage = props[props.column.field];
    if (percentage <= 20) {
        percentage = percentage + 30;
    }
    return (React.createElement("div", { id: "myProgress", className: "pbar" }, props.Status === "Inactive" ?
        React.createElement("div", { id: "myBar", className: "bar progressdisable", style: { width: percentage + "%" } },
            React.createElement("div", { id: "pbarlabel", className: "barlabel" }, percentage + "%")) :
        React.createElement("div", { id: "myBar", className: "bar", style: { width: percentage + "%" } },
            React.createElement("div", { id: "pbarlabel", className: "barlabel" }, percentage + "%"))));
}
var loc = { width: '31px', height: '24px' };
function trustTemplate(props) {
    var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
    return (React.createElement("div", null,
        " ",
        React.createElement("img", { style: loc, src: Trustworthiness, alt: "" }),
        React.createElement("span", { id: "Trusttext" }, props.Trustworthiness)));
}
function empTemplate(props) {
    return (React.createElement("div", null,
        props.EmployeeImg === 'usermale' ?
            React.createElement("div", { className: "empimg" },
                React.createElement("span", { className: "e-userimg sf-icon-Male" })) :
            React.createElement("div", { className: "empimg" },
                React.createElement("span", { className: "e-userimg sf-icon-FeMale" })),
        React.createElement("span", { id: "Emptext" }, props.Employees)));
}
function coltemplate(props) {
    return (React.createElement("div", { className: "Mapimage" },
        React.createElement("img", { src: "src/grid/images/Map.png", className: "e-image", alt: "" }),
        " ",
        React.createElement("span", null, "  "),
        React.createElement("span", { id: "locationtext" }, props.Location)));
}
function trustdetails(props) {
    if (props.Trustworthiness === "Select All") {
        return (React.createElement("span", null));
    }
    var loc = { width: '31px', height: '24px' };
    var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
    return (React.createElement("div", null,
        React.createElement("img", { style: loc, src: Trustworthiness, alt: "" }),
        " ",
        React.createElement("span", { id: "Trusttext" }, props.Trustworthiness)));
}
function ratingDetails(props) {
    return (React.createElement(ej2_react_inputs_1.RatingComponent, { value: props.Rating, cssClass: 'custom-rating', readOnly: true }));
}
function statusdetails(props) {
    if (props.Status === "Select All") {
        return (React.createElement("span", null, "Select All"));
    }
    if (props.Status === "Active") {
        return (React.createElement("div", { className: "statustemp e-activecolor" },
            React.createElement("span", { className: "statustxt e-activecolor" }, "Active")));
    }
    if (props.Status === "Inactive") {
        return (React.createElement("div", { className: "statustemp e-inactivecolor" },
            React.createElement("span", { className: "statustxt e-inactivecolor" }, "Inactive")));
    }
}
function OverView() {
    var dReady = false;
    var dtTime = false;
    var isDataBound = false;
    var isDataChanged = true;
    var intervalFun;
    var clrIntervalFun;
    var clrIntervalFun1;
    var clrIntervalFun2;
    var dropSlectedIndex = null;
    var ddObj;
    var gridInstance;
    var stTime;
    var ddlData = [
        { text: '1,000 Rows and 11 Columns', value: '1000' },
        { text: '10,000 Rows and 11 Columns', value: '10000' },
        { text: '1,00,000 Rows and 11 Columns', value: '100000' }
    ];
    var fields = { text: 'text', value: 'value' };
    function onDataBound() {
        clearTimeout(clrIntervalFun);
        clearInterval(intervalFun);
        dtTime = true;
    }
    function onComplete(args) {
        if (args.requestType === "filterchoicerequest") {
            if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
                var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
                if (!(0, ej2_base_1.isNullOrUndefined)(span)) {
                    (0, ej2_base_1.closest)(span, '.e-ftrchk').classList.add("e-hide");
                }
            }
        }
    }
    var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    var data = new ej2_data_1.DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new ej2_data_1.UrlAdaptor });
    var query = new ej2_data_1.Query().addParams('dataCount', '1000');
    function onChange() {
        ddObj.hidePopup();
        dropSlectedIndex = null;
        var index = ddObj.value;
        clearTimeout(clrIntervalFun2);
        clrIntervalFun2 = setTimeout(function () {
            isDataChanged = true;
            stTime = null;
            var contentElement = gridInstance.contentModule.getPanel().firstChild;
            contentElement.scrollLeft = 0;
            contentElement.scrollTop = 0;
            gridInstance.pageSettings.currentPage = 1;
            stTime = performance.now();
            if (gridInstance.query.params.length > 1) {
                for (var i = 0; i < gridInstance.query.params.length; i++) {
                    if (gridInstance.query.params[i].key === 'dataCount') {
                        gridInstance.query.params[i].value = index.toString();
                        break;
                    }
                }
            }
            else {
                gridInstance.query.params[0].value = index.toString();
            }
            gridInstance.setProperties({ dataSource: data });
        }, 100);
    }
    var check = {
        type: 'CheckBox'
    };
    var select = {
        persistSelection: true,
        type: "Multiple",
        checkboxOnly: true
    };
    function onLoad(args) {
        document.getElementById('overviewgrid').ej2_instances[0].on('data-ready', function () {
            dReady = true;
            stTime = performance.now();
        });
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                if (dReady && stTime && isDataChanged) {
                    var msgEle = document.getElementById('msg');
                    var val = (performance.now() - stTime).toFixed(0);
                    stTime = null;
                    dReady = false;
                    dtTime = false;
                    isDataChanged = false;
                    msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                    msgEle.classList.remove('e-hide');
                }
            });
        });
        observer.observe(document.getElementById('overviewgrid'), {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
    var gridFilter = {
        type: 'Menu'
    };
    var status = {
        type: 'CheckBox',
        itemTemplate: statusdetails
    };
    var trust = {
        type: 'CheckBox',
        itemTemplate: trustdetails
    };
    var rating = {
        type: 'CheckBox',
        itemTemplate: ratingDetails
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { style: { paddingBottom: '18px' } },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "games", width: '220', dataSource: ddlData, index: 0, ref: function (dropdownlist) { ddObj = dropdownlist; }, fields: fields, change: onChange.bind(this), placeholder: "Select a Data Range", popupHeight: "240px" }),
                React.createElement("span", { id: 'msg' }),
                React.createElement("br", null)),
            React.createElement(ej2_react_grids_1.GridComponent, { id: "overviewgrid", dataSource: data, loadingIndicator: { indicatorType: 'Shimmer' }, query: query, enableHover: false, enableVirtualization: true, rowHeight: 38, height: '400', ref: function (g) { gridInstance = g; }, actionComplete: onComplete.bind(this), load: onLoad.bind(this), dataBound: onDataBound.bind(this), filterSettings: gridFilter, allowFiltering: true, allowSorting: true, allowSelection: true, selectionSettings: select },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { type: 'checkbox', allowSorting: false, allowFiltering: false, width: '60' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', visible: false, headerText: 'Employee ID', isPrimaryKey: true, width: '130' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Employees', headerText: 'Employee Name', width: '230', clipMode: 'EllipsisWithTooltip', template: empTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '170', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Mail', headerText: 'Mail', width: '230' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Location', headerText: 'Location', width: '140', template: coltemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Status', headerText: 'Status', template: statusTemplate, width: '130' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Trustworthiness', headerText: 'Trustworthiness', template: trustTemplate, width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Rating', headerText: 'Rating', template: ratingTemplate, width: '220' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Software', allowFiltering: false, allowSorting: false, headerText: 'Software Proficiency', width: '180', template: progessTemplate, format: 'C2' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CurrentSalary', headerText: 'Current Salary', width: '160', format: 'C2' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Address', headerText: 'Address', width: '240', clipMode: "EllipsisWithTooltip" })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.VirtualScroll, ej2_react_grids_1.Sort] }))),
        React.createElement("style", null, "@import 'src/grid/Grid/style.css';"),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the overview of basic grid features with its performance metrics of large data. To change datasource count, select rows and columns count from dropdown.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Grid is used to display and manipulate tabular data with configuration options to control the way the data is presented and manipulated. It will pull the data from a data source, such as an array of JSON objects, OData web services, or ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", "aria-label": "API link for documentation", href: "https://ej2.syncfusion.com/documentation/api/data/dataManager/" }, "DataManager")),
                " binding data fields to columns. Also, displaying a column header to identify the field with support for grouped records."),
            React.createElement("p", null,
                "In this demo, Grid features such as ",
                React.createElement("code", null, "Virtual Scrolling, Filtering, Sorting, Column Template "),
                " etc... are used along with large data source."),
            React.createElement("p", null,
                "You can follow the guidelines in this ",
                React.createElement("a", { target: "_blank", "aria-label": "API link for documentation", href: "https://ej2.syncfusion.com/react/documentation/grid/virtual-scroll/#browser-height-limitation-in-virtual-scrolling-and-solution" }, "documentation"),
                " to get around the browser height restriction when loading and viewing millions of records."),
            React.createElement("p", null,
                "More information on the Grid instantiation can be found in this",
                React.createElement("a", { target: "_blank", "aria-label": "API link for documentation", href: "https://ej2.syncfusion.com/react/documentation/grid/getting-started" }, " documentation section"),
                "."))));
}
exports.default = OverView;
