"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
require("./dynamic.css");
var DynamicWidget = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var btnobj = (0, react_1.useRef)(null);
    var dashboardObj = (0, react_1.useRef)(null);
    var lineObj = (0, react_1.useRef)(null);
    var pieObj = (0, react_1.useRef)(null);
    var splineObj = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = (0, react_1.useState)(false), isResizing = _b[0], setResizing = _b[1];
    var _c = (0, react_1.useState)('Edit'), btnContent = _c[0], setBtnContent = _c[1];
    var _d = (0, react_1.useState)('edit'), icon = _d[0], setIcon = _d[1];
    var _e = (0, react_1.useState)('none'), display = _e[0], setDisplay = _e[1];
    var _f = (0, react_1.useState)(false), isVisible = _f[0], setIsVisible = _f[1];
    var count = 4;
    var cellSpacing = [10, 10];
    var loc = window.location;
    var btnClick = function () {
        if (btnobj.current.element.classList.contains('e-active')) {
            setIsDragging(true);
            setResizing(true);
            setBtnContent("Save");
            setIcon("save");
            setDisplay("block");
        }
        else {
            setIsDragging(false);
            setResizing(false);
            setBtnContent("Edit");
            setIcon("edit");
            setDisplay("none");
        }
    };
    var onPanelResize = function (args) {
        if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
            var chartObj = (args.element.querySelector('.e-panel-container .e-panel-content div div')).ej2_instances[0];
            chartObj.height = '95%';
            chartObj.width = '100%';
            chartObj.refresh();
        }
    };
    var dlgClick = function () {
        setIsVisible(true);
        lineObj.current.onclick = function () {
            var countValue = count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Line Chart</div>', content: lineTemplate.bind(_this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-chart").ej2_instances[0].refresh();
            }, 20);
        };
        pieObj.current.onclick = function () {
            var countValue = count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Pie Chart</div>', content: pieTemplate.bind(_this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-accumulationchart").ej2_instances[0].refresh();
            }, 20);
        };
        splineObj.current.onclick = function () {
            var countValue = count.toString();
            var panel = [{
                    'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Spline Chart</div>', content: splineTemplate.bind(_this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-chart").ej2_instances[0].refresh();
            }, 20);
        };
    };
    var load = function (args) {
        var selectedTheme = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    var Pieload = function (args) {
        var selectedTheme = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    var content = function () {
        return (React.createElement("div", { id: "dialogcontent" },
            React.createElement("div", null,
                React.createElement("div", { id: "linetemplate", ref: lineObj },
                    React.createElement("p", { className: "dialog-text" }, "Linechart (1x1) ")),
                React.createElement("div", { id: "pietemplate", ref: pieObj },
                    React.createElement("p", { className: "dialog-text" }, "Piechart (1x1) ")),
                React.createElement("div", { id: "splinetemplate", ref: splineObj },
                    React.createElement("p", { className: "dialog-text" }, "Splinechart (2x1) ")))));
    };
    var splineTemplate = function () {
        var splineData1 = [
            { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
            { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
            { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
            { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
        ];
        var splineData2 = [
            { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
            { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
            { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
            { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
        ];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%", textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', labelFormat: 'MMM', majorGridLines: { width: 0 }, intervalType: 'Months', edgeLabelPlacement: 'Shift' }, primaryYAxis: { labelFormat: '{value}%', lineStyle: { width: 0 }, maximum: 4, interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: load.bind(_this), chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: splineData1, xName: 'x', yName: 'y', name: 'Jan', opacity: 0.5, type: 'SplineArea', width: 2, fill: 'rgb(239, 183, 202)' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: splineData2, xName: 'x', yName: 'y', name: 'Feb', opacity: 0.5, type: 'SplineArea', width: 2, fill: 'rgb(0, 189, 174)' })))));
    };
    var lineTemplate = function () {
        var data1 = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
        var data2 = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
        var data3 = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%" }, load: load.bind(_this), primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }, primaryYAxis: { majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: 'x', yName: 'y', name: 'Jan', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#00bdae' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: 'x', yName: 'y', name: 'Feb', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#e56691' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data3, xName: 'x', yName: 'y', name: 'Mar', type: 'Column', marker: { dataLabel: { visible: false } }, fill: '#357cd2' })))));
    };
    var pieTemplate = function () {
        var pieData = [
            { "x": "Jan", y: 12.5, text: "January" },
            { "x": "Feb", y: 25, text: "February" },
            { "x": "Mar", y: 50, text: "March" },
        ];
        var piePalette = ["#00bdaed1", "#357cd2bf", "#e56691e8"];
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { style: { "height": "100%", "width": "100%" }, legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: true, center: { x: '50%', y: '50%' }, load: Pieload.bind(_this), tooltip: { enable: true, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: pieData, name: 'Earnings', xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', name: 'value', font: { fontWeight: '600' } }, radius: '100%', innerRadius: "40%", palettes: ['#00bdae', '#357cd2', '#e56691'] })))));
    };
    return (React.createElement("div", null,
        React.createElement("div", { id: 'edit_target', className: "control-section" },
            React.createElement("div", null,
                React.createElement("div", { style: { "width": "100%", "marginBottom": "10px", "marginTop": "10px", "height": "30px" } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "togglebtn", cssClass: 'e-outline e-flat e-primary', ref: btnobj, iconCss: icon, isToggle: true, onClick: btnClick.bind(_this), style: { "float": "right", "width": "75px" } }, btnContent)),
                React.createElement("div", { style: { "padding": "5px", "marginBottom": "5px", "textAlign": "end" } },
                    React.createElement("div", { id: "dialogBtn", className: "add-widget-button e-control e-btn e-lib", style: { display: display }, onClick: dlgClick.bind(_this) }, "Add New Widget"))),
            React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { id: "edit_dashboard", columns: 2, cellSpacing: cellSpacing, ref: dashboardObj, resizeStop: onPanelResize.bind(_this), allowResizing: isResizing, allowDragging: isDragging },
                React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 1, sizeY: 1, row: 0, col: 0, content: lineTemplate.bind(_this), header: "<div>Line Chart</div>" }),
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 1, sizeY: 1, row: 0, col: 1, content: pieTemplate.bind(_this), header: "<div>Pie Chart</div>" }),
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 2, sizeY: 1, row: 1, col: 0, content: splineTemplate.bind(_this), header: "<div>Spline Chart</div>" })))),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "listdialog", width: "500px", height: "260px", visible: isVisible, header: "Add a widget", showCloseIcon: true, animationSettings: { effect: 'Zoom' }, isModal: true, target: '#edit_target', content: content }),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The following sample demonstrates a editable dashboard layout. Initially the DashboardLayout component doesn't allow to ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowdragging", target: "_blank" }, "drag"),
                ",",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "resize"),
                " or reorder the panels. After clicking the edit button, the layout becomes editable which allows to drag and reorder the panels as per the requirement and also you can add new panels to the layout with predefined templates by clicking the add new button and reorder them by dragging and placing in the required position. Drag and resizing of the panles are not applicable in mobile resolution.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The following sample demonstrates about using the dashboard layout as an editable layout."))));
};
exports.default = DynamicWidget;
