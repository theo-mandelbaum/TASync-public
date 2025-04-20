"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./stacked-header.css");
function StackedHeader() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function HeaderTemplate() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-icons e-columns", id: "column-chooser-icon", style: { position: 'relative', top: '2px' } }),
            React.createElement("span", { id: "column-chooser-text", style: { position: 'relative', left: '5px' } }, "Column Options")));
    }
    function Template(props) {
        var parentNodes = [
            { id: 1, name: 'Order Details', hasChild: true, expanded: true },
            { id: 2, name: 'Shipping Details', hasChild: true, expanded: true },
            { id: 3, name: 'Delivery Status', hasChild: true, expanded: true },
        ];
        var treeData = [];
        if (props.columns && props.columns.length) {
            treeData = props.columns.map(function (column) {
                var parentId;
                switch (column.field) {
                    case 'OrderID':
                    case 'OrderDate':
                        parentId = 1;
                        break;
                    case 'ShipCountry':
                    case 'Freight':
                        parentId = 2;
                        break;
                    case 'Status':
                    case 'Feedback':
                        parentId = 3;
                        break;
                    default:
                        break;
                }
                return {
                    id: column.uid,
                    name: column.headerText,
                    pid: parentId,
                    isChecked: column.visible
                };
            });
            var uniquePids_1 = [];
            treeData.forEach(function (item) {
                if (!uniquePids_1.includes(item.pid)) {
                    uniquePids_1.push(item.pid);
                }
            });
            var filteredParents = parentNodes.filter(function (parent) { return uniquePids_1.includes(parent.id); });
            treeData.push.apply(treeData, filteredParents);
        }
        else {
            treeData = [];
        }
        var fields = { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        var enableRTL = gridInstance.enableRtl ? true : false;
        React.useEffect(function () {
            if (treeObj) {
                treeObj.setProperties({ fields: fields });
            }
        }, [props.columns]);
        return (React.createElement("div", null, props.columns && props.columns.length ? (React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, cssClass: "no-border", enableRtl: enableRTL, showCheckBox: true, nodeClicked: nodeCheck.bind(this), keyPress: nodeCheck.bind(this), ref: function (treeview) { treeObj = treeview; } })) : (React.createElement("div", { className: "no-record-text" }, "No Matches Found"))));
    }
    function FooterTemplate() {
        return (React.createElement("div", { id: "columnChooserFooter" },
            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: columnChooserSubmit }, "Apply"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: columnChooserClose }, "Close")));
    }
    function nodeCheck(args) {
        var checkedNode = [args.node];
        if (args.event.target.classList.contains('e-fullrow') || args.event.key == "Enter") {
            var getNodeDetails = treeObj.getNode(args.node);
            if (getNodeDetails.isChecked == 'true') {
                treeObj.uncheckAll(checkedNode);
            }
            else {
                treeObj.checkAll(checkedNode);
            }
        }
    }
    function queryCellInfo(args) {
        if (args.column.field === 'Status') {
            if (args.data['Status'] === 'Delivered') {
                args.cell.classList.remove('e-inprogress');
                args.cell.classList.add('e-delivered');
            }
            else {
                args.cell.classList.remove('e-delivered');
                args.cell.classList.add('e-inprogress');
            }
        }
    }
    function feedbackTemplate(props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.RatingComponent, { value: props.Feedback, cssClass: 'custom-rating', readOnly: true })));
    }
    function locationtemplate(props) {
        return (React.createElement("div", { className: "Mapimage" },
            React.createElement("img", { src: "https://ej2.syncfusion.com/react/demos/src/grid/images/Map.png", className: "e-image", alt: "" }),
            ' ',
            React.createElement("span", null, " "),
            React.createElement("span", { id: "locationtext" }, props.ShipCountry)));
    }
    function columnChooserClose() {
        gridInstance.columnChooserModule.hideDialog();
    }
    function columnChooserSubmit() {
        var checkedElements = [];
        var uncheckedElements = [];
        var showColumns = gridInstance.getVisibleColumns().filter(function (column) { return (column.showInColumnChooser === true); });
        showColumns = showColumns.map(function (col) { return col.headerText; });
        var treeItems = document.querySelectorAll('.e-list-item');
        treeItems.forEach(function (item) {
            var itemDetails = treeObj.getNode(item);
            if (!itemDetails.hasChildren) {
                if (item.getAttribute('aria-checked') === 'true') {
                    checkedElements.push(itemDetails.text);
                }
                else {
                    uncheckedElements.push(itemDetails.text);
                }
            }
        });
        showColumns = showColumns.filter(function (col) { return !uncheckedElements.includes(col); });
        checkedElements.forEach(function (item) {
            if (!showColumns.includes(item)) {
                showColumns.push(item);
            }
        });
        var columnsToUpdate = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
        gridInstance.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    }
    var treeObj;
    var gridInstance;
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var orderidRules = { required: true, number: true };
    var columnChooserSettings = { template: Template, headerTemplate: HeaderTemplate, footerTemplate: FooterTemplate };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.stackedHeaderData, ref: function (grid) { gridInstance = grid; }, allowPaging: true, allowResizing: true, enableHover: false, clipMode: "EllipsisWithTooltip", allowSorting: true, allowMultiSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar, queryCellInfo: queryCellInfo, showColumnChooser: true, columnChooserSettings: columnChooserSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '160', minWidth: '100', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true, showInColumnChooser: false }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Name', width: '100', minWidth: '100' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { columns: [
                            { field: 'OrderID', headerText: 'ID', textAlign: 'Right', width: 90, minWidth: 90 },
                            { field: 'OrderDate', headerText: 'Date', textAlign: 'Right', width: 110, minWidth: 100, format: 'yMd', editType: 'datepickeredit' }
                        ], headerText: 'Order Details', textAlign: 'Center' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { columns: [
                            { field: 'ShipCountry', headerText: 'Country', textAlign: 'Left', width: 115, minWidth: 100, editType: 'dropdownedit', template: locationtemplate, validationRules: { required: true } },
                            { field: 'Freight', headerText: 'Charges', textAlign: 'Right', width: 130, minWidth: 100, format: 'C2', editType: 'numericedit', validationRules: { required: true, number: true } },
                        ], headerText: 'Shipping Details', textAlign: 'Center' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { columns: [
                            { field: 'Status', headerText: 'Status', textAlign: 'Center', width: 110, minWidth: 100, editType: 'dropdownedit', validationRules: { required: true, } },
                            { field: 'Feedback', headerText: 'Feedback', allowResizing: false, textAlign: 'Center', width: 130, minWidth: 100, template: feedbackTemplate, editType: 'numericedit', validationRules: { required: true, min: 0, max: 5 }, }
                        ], headerText: 'Delivery Status', textAlign: 'Center' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Resize, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit, ej2_react_grids_1.ColumnChooser] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example showcases the Syncfusion EJ2 Grid component which features stacked headers, column resizing, and a customizable column chooser template.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                React.createElement("b", null, "Stacked Headers:")),
            React.createElement("p", null,
                "The Grid allows grouping columns to display multiple levels of headers using the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid#columns' }, " columns")),
                " property."),
            React.createElement("p", null, "In this demo, the columns are grouped as follows:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Order Details"),
                    ": ID and Date"),
                React.createElement("li", null,
                    React.createElement("b", null, "Shipping Details"),
                    ": Country and Charges "),
                React.createElement("li", null,
                    React.createElement("b", null, "Delivery Status"),
                    ": Status and Feedback")),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Column Resizing:")),
            React.createElement("p", null,
                "Columns can be resized by clicking and dragging the right edges of the column header. To enable this feature, set",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#allowresizing" }, "allowResizing ")),
                " to true. to true. To disable resizing for specific columns, set",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column#allowresizing" }, "columns->allowResizing ")),
                "to false."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Column Chooser Templates:")),
            React.createElement("p", null, "The column chooser template is used to customize layout and manage column visibility."),
            React.createElement("p", null, "Key properties: "),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "columnChooserSettings->headerTemplate "),
                    " :- Defines the header template."),
                React.createElement("li", null,
                    React.createElement("code", null, "columnChooserSettings->template "),
                    " :- Defines the content template."),
                React.createElement("li", null,
                    React.createElement("code", null, "columnChooserSettings->footerTemplate "),
                    " :- Defines the footer template."),
                React.createElement("li", null,
                    React.createElement("code", null, "columnChooserSettings->enableSearching "),
                    " :- Enables or disables search functionality.")),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, " showInColumnChooser "),
                " of the ",
                React.createElement("b", null, "Customer ID"),
                " column is set to false, preventing it from being displayed in the column chooser popup."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("p", null,
                " More information on the Stacked Header feature configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/columns/#resize-stacked-column' }, " documentation section"),
                "."))));
}
exports.default = StackedHeader;
