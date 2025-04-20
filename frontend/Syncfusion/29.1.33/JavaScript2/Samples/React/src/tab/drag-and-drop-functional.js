"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
var Dragdrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var tabObj = (0, react_1.useRef)(null);
    var treeObj = (0, react_1.useRef)(null);
    var data = [
        { text: "DropDown List", id: "list-01" },
        { text: "DatePicker", id: "list-02" },
        { text: "Calendar", id: "list-03" },
        { text: "File Upload", id: "list-04" },
        { text: "Rich Text Editor", id: "list-05" }
    ];
    var allowDragAndDrop = true;
    var field = { dataSource: data, id: 'id', text: 'text' };
    var draggedItemHeader;
    var i = 0;
    var onTabCreate = function () {
        var tabElement = tabObj.current.element;
        if (!(0, ej2_base_1.isNullOrUndefined)(tabElement)) {
            tabElement.querySelector(".e-tab-header").classList.add("e-droppable");
            tabElement.querySelector(".e-content").classList.add("tab-content");
        }
    };
    var onTabDragStart = function (args) {
        draggedItemHeader = tabObj.current.items[args.index].header.text;
    };
    var onDraggedTab = function (args) {
        var dragTabIndex = Array.prototype.indexOf.call(tabObj.current.element.querySelectorAll('.e-toolbar-item'), args.draggedItem);
        var dropNode = args.target.closest("#ListView .e-list-item");
        if (dropNode != null && !args.target.closest("#draggableTab .e-toolbar-item") && tabObj.current.items.length > 1) {
            args.cancel = true;
            var dropContainer = (document.querySelector('.treeview-external-drag-tab')).querySelectorAll('.e-list-item');
            var dropIndex = Array.prototype.indexOf.call(dropContainer, dropNode);
            var newNode = [{ id: "list" + i, text: draggedItemHeader }];
            tabObj.current.removeTab(dragTabIndex);
            treeObj.current.addNodes(newNode, "Treeview", dropIndex);
        }
    };
    var onNodeDragStop = function (args) {
        var dropElement = args.target.closest("#draggableTab .e-toolbar-item");
        if (dropElement != null) {
            var tabElement = tabObj.current.element;
            var itemPosition = (((args.event.type.indexOf('touch') > -1) ? args.event.changedTouches[0].clientX
                : args.event.clientX) < dropElement.getBoundingClientRect().left + dropElement.offsetWidth / 2) ? 0 : 1;
            var dropItemIndex = [].slice.call(tabElement.querySelectorAll(".e-toolbar-item")).indexOf(dropElement) + itemPosition;
            var tabContent = void 0;
            switch (args.draggedNodeData.text) {
                case "DropDown List":
                    tabContent = DropDownList;
                    break;
                case "DatePicker":
                    tabContent = DatePicker;
                    break;
                case "Calendar":
                    tabContent = Calendar;
                    break;
                case "File Upload":
                    tabContent = Uploader;
                    break;
                case "Rich Text Editor":
                    tabContent = RichTextEditor;
                    break;
                case "Grid":
                    tabContent = Grid;
                    break;
                case "Schedule":
                    tabContent = Schedule;
                    break;
                case "Chart":
                    tabContent = Chart;
                    break;
                default:
                    break;
            }
            var newTabItem = [{ header: { text: args.draggedNodeData.text.toString() }, content: tabContent }];
            tabObj.current.addTab(newTabItem, dropItemIndex);
            treeObj.current.removeNodes([args.draggedNode]);
        }
        args.cancel = true;
    };
    var onNodeDrag = function (args) {
        if (!(0, ej2_base_1.isNullOrUndefined)(args.target.closest(".tab-content"))) {
            args.dropIndicator = "e-no-drop";
        }
        else if (!(0, ej2_base_1.isNullOrUndefined)(args.target.closest("#draggableTab .e-tab-header"))) {
            args.dropIndicator = "e-drop-in";
        }
    };
    var Grid = function () {
        var gridData = [
            {
                OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
                ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
                ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
            },
            {
                OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
                ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
                ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
            },
            {
                OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
                ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
                ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
            },
            {
                OrderID: 10251, CustomerID: 'VICTE', EmployeeID: 3, OrderDate: new Date(8367642e5),
                ShipName: 'Victuailles en stock', ShipCity: 'Lyon', ShipAddress: '2, rue du Commerce',
                ShipRegion: 'CJ', ShipPostalCode: '69004', ShipCountry: 'France', Freight: 41.34, Verified: !0
            },
            {
                OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 2, OrderDate: new Date(8368506e5),
                ShipName: 'Suprêmes délices', ShipCity: 'Charleroi', ShipAddress: 'Boulevard Tirou, 255',
                ShipRegion: 'CJ', ShipPostalCode: 'B-6000', ShipCountry: 'Belgium', Freight: 51.3, Verified: !0
            }
        ];
        return (React.createElement(ej2_react_grids_1.GridComponent, { dataSource: gridData },
            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right", type: "number" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '140', type: "string" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Freight", headerText: "Freight", width: "120", textAlign: "Right", format: "C" }),
                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "OrderDate", headerText: "Order Date", width: "140", format: "yMd" }))));
    };
    var Chart = function () {
        var chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        return (React.createElement(ej2_react_charts_1.ChartComponent, { height: '300px', primaryXAxis: { valueType: 'Category' } },
            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: 'month', yName: 'sales', type: 'Line' })),
            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] })));
    };
    var Schedule = function () {
        var dataManger = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/schedule',
            adaptor: new ej2_data_1.ODataV4Adaptor,
            crossDomain: true
        });
        return (React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '500px', currentView: 'Month', eventSettings: { dataSource: dataManger }, readonly: true },
            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] })));
    };
    var DropDownList = function () {
        var sportsData = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
        return (React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '200px', dataSource: sportsData, placeholder: 'Select a game' }));
    };
    var DatePicker = function () {
        return (React.createElement(ej2_react_calendars_1.DatePickerComponent, { width: '200px', placeholder: 'Enter date' }));
    };
    var Calendar = function () {
        return (React.createElement(ej2_react_calendars_1.CalendarComponent, null));
    };
    var Uploader = function () {
        return (React.createElement(ej2_react_inputs_1.UploaderComponent, { autoUpload: false }));
    };
    var RichTextEditor = function () {
        return (React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { height: '340px' },
            React.createElement("p", null, "The Rich Text Editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
            React.createElement("p", null,
                React.createElement("b", null, "Key features:")),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                React.createElement("li", null,
                    React.createElement("p", null, "Capable of handling markdown editing.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains a modular library to load the necessary functionality on demand.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides a fully customizable toolbar.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Supports third-party library integration.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Allows preview of modified content before saving it.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Contains undo/redo manager.")),
                React.createElement("li", null,
                    React.createElement("p", null, "Creates bulleted and numbered lists."))),
            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar] })));
    };
    var headerText = [{ text: "Grid" }, { text: "Chart" }, { text: "Schedule" }];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section tab-control-section row' },
            React.createElement("div", { id: "TabContainer" },
                React.createElement("div", { className: "col-lg-4", style: { marginTop: '10px' } },
                    React.createElement("div", { className: 'property-panel-header' }, "List of Components"),
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "ListView", ref: treeObj, dragArea: "#TabContainer", cssClass: "treeview-external-drag-tab", fields: field, nodeDragStop: onNodeDragStop, nodeDragging: onNodeDrag, allowDragAndDrop: allowDragAndDrop })),
                React.createElement("div", { className: "col-lg-8 content-wrapper control-section" },
                    React.createElement(ej2_react_navigations_1.TabComponent, { id: "draggableTab", ref: tabObj, created: onTabCreate, dragArea: "#TabContainer", onDragStart: onTabDragStart, dragged: onDraggedTab, allowDragAndDrop: allowDragAndDrop },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[0], content: Grid }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[1], content: Chart }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[2], content: Schedule })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to reorder tabs and add tabs from an external source(list of components) by drag and drop. Here, you can drag and drop the items from TreeView into Tab.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the ",
                React.createElement("code", null, "allowDragAndDrop"),
                " property is used to enable drag and drop and the ",
                React.createElement("code", null, "dragArea"),
                " property is used to define the draggable area."),
            React.createElement("p", null,
                "In this example, the list of components is rendered using the ",
                React.createElement("code", null, "treeview"),
                " component. We can drag the item from the treeview component to the tab component by using the ",
                React.createElement("code", null, "nodeDragStop"),
                " event of the treeview component and add the same item with the help of the ",
                React.createElement("code", null, "addTab"),
                " public method of Tab and remove this item from the treeview by using the ",
                React.createElement("code", null, "removeNodes"),
                " method."),
            React.createElement("p", null,
                "In the same way, we can drag the tab item within the tab component and also add the tab item to the treeview component. Here, we can drop the tab item in the treeview component by using the ",
                React.createElement("code", null, "dragged"),
                " event of the tab component. In this case, we can remove the dropped item from tab with the help of the ",
                React.createElement("code", null, "removeTab"),
                " public method and add the item to the treeview in its ",
                React.createElement("code", null, "addNodes"),
                " public method."))));
};
exports.default = Dragdrop;
