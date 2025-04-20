"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
require("./overview.css");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var react_2 = require("react");
var ej2_react_dropdowns_2 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var Overview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var theme;
    var ganttInstance = (0, react_2.useRef)(null);
    var CurrentTheme;
    var statusStyleColor;
    var priorityStyle;
    var priorityContentStyle;
    var statusContentstyleColor;
    var display;
    var padding;
    var gap;
    var width;
    var height;
    var background;
    var borderRadius;
    var color;
    var fontStyle;
    var fontWeight;
    var fontSize;
    var lineHeight;
    var textAlign;
    var backgroundColor;
    var backgroundPri;
    var pad;
    var taskFields = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'TimeLog',
        progress: 'Progress',
        dependency: 'Predecessor',
        parentID: 'ParentId',
        resourceInfo: 'Assignee'
    };
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    var splitterSettings = {
        position: "57%"
    };
    var projectStartDate = new Date('12/17/2023');
    var projectEndDate = new Date('10/26/2024');
    var gridLines = 'Vertical';
    var change = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('57%', 'position');
        }
    };
    var timelineSettings = {
        showTooltip: true,
        topTier: {
            unit: 'Month',
            format: 'MMM yyyy'
        },
        bottomTier: {
            unit: 'Day',
            count: 4,
            format: 'dd'
        },
    };
    var labelSettings = {
        taskLabel: '${Progress}%',
        rightLabel: 'Assignee'
    };
    var toolbarClick = function (args) {
        if (args.item.id === "Overview_excelexport") {
            ganttInstance.current.excelExport();
        }
        else if (args.item.id === "Overview_csvexport") {
            ganttInstance.current.csvExport();
        }
        else if (args.item.id === "Overview_pdfexport") {
            ganttInstance.current.pdfExport();
        }
    };
    var eventMarkerDay1 = new Date('04/04/2024');
    var eventMarkerDay2 = new Date('06/30/2024');
    var eventMarkerDay3 = new Date('09/29/2024');
    var statustemplate = function (props) {
        var sts = Status(props.taskData.Status);
        var stsCon = StatusContent(props.taskData.Status);
        if (props.taskData.Status) {
            return (React.createElement("div", { className: 'columnTemplate' },
                React.createElement("div", { style: {
                        "display": "".concat(sts.display), "padding": "".concat(sts.padding), "gap": "".concat(sts.gap), "width": "".concat(sts.width), "height": "".concat(sts.height),
                        "background": "".concat(sts.background), "borderRadius": "".concat(sts.borderRadius)
                    } },
                    React.createElement("span", { style: {
                            "width": "".concat(stsCon.width), "height": "".concat(stsCon.height), "fontStyle": "".concat(stsCon.fontStyle), "fontWeight": "".concat(stsCon.fontWeight), "fontSize": "".concat(stsCon.fontSize),
                            "lineHeight": "".concat(stsCon.lineHeight), "borderRadius": "".concat(stsCon.borderRadius), "color": "".concat(stsCon.color), "padding": "".concat(stsCon.pad)
                        } }, props.taskData.Status))));
        }
    };
    var prioritytemplate = function (props) {
        var pri = Priority(props.taskData.Priority);
        var priCon = PriorityContent(props.taskData.Priority);
        if (props.taskData.Priority) {
            return (React.createElement("div", { className: 'columnTemplate1' },
                React.createElement("div", { style: {
                        "display": "".concat(pri.display), "padding": "".concat(pri.padding), "gap": "".concat(pri.gap), "width": "".concat(pri.width), "height": "".concat(pri.height),
                        "background": "".concat(pri.backgroundPri), "borderRadius": "".concat(pri.borderRadius)
                    } },
                    React.createElement("span", { style: {
                            "width": "".concat(priCon.width), "height": "".concat(priCon.height), "fontStyle": "".concat(priCon.fontStyle), "fontWeight": "".concat(priCon.fontWeight), "fontSize": "".concat(priCon.fontSize),
                            "lineHeight": "".concat(priCon.lineHeight), "color": "".concat(priCon.color)
                        } }, props.taskData.Priority))));
        }
    };
    var columnTemplate = function (props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        if ((props.ganttProperties.resourceNames)) {
            var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
            if (gantt.enableRtl) {
                return (React.createElement("div", { className: 'columnTemplate' },
                    React.createElement("img", { src: src, height: '25px', width: '25px' }),
                    React.createElement("div", { style: { display: "inline-block", width: '100%', position: "relative", right: "8px", bottom: "5px" } }, props.ganttProperties.resourceNames)));
            }
            else {
                return (React.createElement("div", { className: 'columnTemplate' },
                    React.createElement("img", { src: src, height: '25px', width: '25px' }),
                    React.createElement("div", { style: { display: "inline-block", width: '100%', position: "relative", left: "8px" } }, props.ganttProperties.resourceNames)));
            }
        }
        else {
            return React.createElement("div", null);
        }
    };
    var load = function () {
        var themeCollection = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind', 'fluent2', 'tailwind3', 'bootstrap5.3'];
        var cls = document.body.className.split(' ');
        theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : cls.indexOf('bootstrap5.3') > 0 ? 'bootstrap5.3' :
                        cls.indexOf('fluent2') > 0 ? 'fluent2' : cls.indexOf('tailwind3') > 0 ? 'tailwind3' : '';
        var check = themeCollection.indexOf(theme);
        if (check >= 0) {
            CurrentTheme = true;
        }
        else {
            CurrentTheme = false;
        }
    };
    var pdfQueryCellInfo = function (args) {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height: 25, width: 25, base64: args.data.taskData.resourcesImage };
            }
        }
    };
    var Status = function (status) {
        switch (status) {
            case "In Progress":
                statusStyleColor = (CurrentTheme) ? "#DFECFF" : "#2D3E57";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '96px';
                height = '24px';
                borderRadius = '24px';
                background = statusStyleColor;
                break;
            case "Open":
                background = "red";
                color = "white";
                borderRadius = '15px';
                padding = '6px';
                break;
            case "On Hold":
                statusStyleColor = (CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '78px';
                height = '24px';
                borderRadius = '24px';
                background = statusStyleColor;
                break;
            case "Completed":
                statusStyleColor = (CurrentTheme) ? "#DFFFE2" : "#16501C";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '98px';
                height = '24px';
                borderRadius = '24px';
                background = statusStyleColor;
                break;
            case "High":
                statusStyleColor = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '55px';
                height = '24px';
                borderRadius = '24px';
                background = statusStyleColor;
                break;
        }
        return { display: display, padding: padding, gap: gap, width: width, height: height, borderRadius: borderRadius, background: background, color: color };
    };
    var StatusContent = function (status) {
        switch (status) {
            case "In Progress":
                statusContentstyleColor = (CurrentTheme) ? "#006AA6" : "#34B6FF";
                width = "72px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = statusContentstyleColor;
                break;
            case "Open":
                backgroundColor = 'red';
                color = 'white';
                borderRadius = '15px';
                pad = '6px';
                break;
            case "On Hold":
                statusContentstyleColor = (CurrentTheme) ? "#766B7C" : "#CDCBD7";
                width = "54px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = statusContentstyleColor;
                break;
            case "Completed":
                statusContentstyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
                width = "74px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = statusContentstyleColor;
                break;
            case "High":
                statusContentstyleColor = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "31px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = statusContentstyleColor;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color,
            backgroundColor: backgroundColor, borderRadius: borderRadius, pad: pad
        };
    };
    var Priority = function (priority) {
        switch (priority) {
            case "Low":
                priorityStyle = (CurrentTheme) ? "#FFF6D1" : "#473F1E";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '52px';
                height = '24px';
                borderRadius = '24px';
                backgroundPri = priorityStyle;
                break;
            case "Normal":
                priorityStyle = (CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '73px';
                height = '24px';
                borderRadius = '24px';
                backgroundPri = priorityStyle;
                break;
            case "Critical":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '72px';
                height = '24px';
                borderRadius = '24px';
                backgroundPri = priorityStyle;
                break;
            case "High":
                priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
                display = 'flex';
                padding = '0px 12px';
                gap = '10px';
                width = '55px';
                height = '24px';
                borderRadius = '24px';
                backgroundPri = priorityStyle;
                break;
        }
        return { display: display, padding: padding, gap: gap, width: width, height: height, borderRadius: borderRadius, backgroundPri: backgroundPri };
    };
    var PriorityContent = function (priority) {
        switch (priority) {
            case "Low":
                priorityContentStyle = (CurrentTheme) ? "#70722B" : "#FDFF88";
                width = "28px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = priorityContentStyle;
                break;
            case "Normal":
                priorityContentStyle = (CurrentTheme) ? "#7100A6" : "#E3A9FF";
                width = "49px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = priorityContentStyle;
                break;
            case "Critical":
                priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "48px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = priorityContentStyle;
                break;
            case "High":
                priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
                width = "31px";
                height = "22px";
                fontStyle = 'normal';
                fontWeight = '500';
                fontSize = '14px';
                lineHeight = '20px';
                textAlign = 'center';
                color = priorityContentStyle;
                break;
        }
        return {
            width: width, height: height, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, textAlign: textAlign, color: color
        };
    };
    var template = columnTemplate.bind(_this);
    var statusTemplate = statustemplate.bind(_this);
    var priorityTemplate = prioritytemplate.bind(_this);
    var toolbarOptions = ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport'];
    // side bar rendering
    var _a = (0, react_2.useState)(false), sidebarToggle = _a[0], setSidebarToggle = _a[1];
    var _b = (0, react_2.useState)(false), isSideBar = _b[0], setIsSideBar = _b[1];
    var ganttRef = (0, react_2.useRef)(null);
    var sidebarRef = (0, react_2.useRef)(null);
    var triggerSidebar = function () {
        setSidebarToggle(function (prev) { return !prev; });
        setIsSideBar(true);
        if (sidebarRef.current) {
            sidebarRef.current.isOpen = true;
        }
    };
    var closeSidebar = function () {
        setSidebarToggle(false); // Close sidebar
        if (sidebarRef.current) {
            sidebarRef.current.hide();
        }
    };
    //   range slider rendering
    var defaultObj;
    var defaultTicks = { placement: 'Before', largeStep: 10, smallStep: 10, showSmallTicks: true };
    var tooltip = (0, react_2.useState)({
        placement: 'Before',
        isVisible: true,
        showOn: 'Focus'
    })[0];
    function onChanged(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.rowHeight = args.value;
    }
    // Grid lines
    function gridLinesChange(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.gridLines = 'Both';
        }
        else {
            gantt.gridLines = 'Vertical';
        }
    }
    // Show Event marekrs
    var tempEvents;
    function showEventMarkers(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = tempEvents;
        }
        else {
            tempEvents = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    }
    // Show depenency lines
    function dependencyChange(args) {
        var ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container');
        if (args.checked) {
            if (ganttDependencyViewContainer) {
                ganttDependencyViewContainer.style.visibility = 'visible';
            }
        }
        else {
            ganttDependencyViewContainer.style.visibility = 'hidden';
        }
    }
    // Show tasklabels
    var tempLabels;
    function taskLabelChange(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = tempLabels;
        }
        else {
            tempLabels = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    }
    // Working days
    var multiselectObj = (0, react_2.useRef)(null);
    var workDays = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
    ];
    var defaultValue = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var select = function (args) {
        if (multiselectObj && multiselectObj.current && multiselectObj.current.value && ganttInstance.current) {
            var workingDays = (0, ej2_base_1.extend)([], multiselectObj.current.value, [], true);
            workingDays.push(args.itemData.day);
            ganttInstance.current.workWeek = workingDays;
        }
    };
    var removed = function (args) {
        if (ganttInstance.current && multiselectObj.current) {
            var index = ganttInstance.current.workWeek.indexOf(args.itemData.day);
            if (index !== -1) {
                ganttInstance.current.workWeek = multiselectObj.current.value;
            }
        }
    };
    //   Duration Unit
    var durationUnit = [
        { id: "Minute", Text: "Minute" },
        { id: "Hour", Text: "Hour" },
        { id: "Day", Text: "Day" }
    ];
    var durationFields = { text: 'Text', value: 'id' };
    var durationValue = 'Day';
    function changeDuraiton(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.durationUnit = args.value;
    }
    // Timeline unit width
    function unitChange(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    }
    // view Type change
    var viewTypeData = [
        { id: "ResourceView", Text: "Resource View" },
        { id: "ProjectView", Text: "Project View" }
    ];
    var viewFileds = { text: 'Text', value: 'id' };
    function typeChange(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.viewType = args.value;
        if (document.getElementsByClassName('checkeddependency')[0].hidden !== true) {
            document.querySelectorAll('.e-switch')[2].ej2_instances[0].checked = true;
        }
    }
    // View Mode
    var viewModeData = [
        { ID: "Default", Text: "Default" },
        { ID: "Grid", Text: "Grid" },
        { ID: "Chart", Text: "Chart" },
    ];
    var modeFields = { value: 'ID', text: 'Text' };
    function modeChange(args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('50%', 'position');
        }
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'gantt-sidebar-parent' }, isSideBar && (React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar", ref: sidebarRef, type: "Over", className: "default-sidebar", width: "282px", target: "#sidebar-gantt", position: "Right", isOpen: sidebarToggle },
                React.createElement("div", { className: "gantt-title-header" },
                    React.createElement("div", { className: "gantt-title" }, "Project Settings"),
                    React.createElement("span", { className: "e-closed", onClick: closeSidebar, style: { cursor: 'pointer' } })),
                React.createElement("ul", { className: "settings-list", style: { margin: '15px 15px', paddingLeft: '5px' } },
                    React.createElement("label", { htmlFor: "rowHeightSlider", className: "gantt-labels-style" }, "Row height :"),
                    React.createElement("li", { className: "list-fields", style: { padding: '20px', paddingBottom: '0px', marginBottom: '0px' } },
                        React.createElement("div", { id: "rowHeightSlider" },
                            React.createElement(ej2_react_inputs_2.SliderComponent, { value: 30, min: 40, max: 60, step: 5, changed: onChanged, ticks: defaultTicks, width: 180, tooltip: tooltip, ref: function (slider) { defaultObj = slider; } }))),
                    React.createElement("li", { className: "list-fields" },
                        React.createElement("label", { htmlFor: "showGridLines", className: "gantt-labels-style" }, "Show Grid Lines :"),
                        React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                            React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "showGridLinesSwitch", className: "checked", change: gridLinesChange }))),
                    React.createElement("li", { className: "list-fields" },
                        React.createElement("label", { htmlFor: "showGridLines", className: "gantt-labels-style" }, "Show event markers :"),
                        React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                            React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "showGridLinesSwitch", className: "checked", checked: true, change: showEventMarkers }))),
                    React.createElement("li", { className: "list-fields" },
                        React.createElement("label", { htmlFor: "dependencyLines", className: "gantt-labels-style" }, "Show dependencies :"),
                        React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                            React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "dependencyLines", className: "checkeddependency", checked: true, change: dependencyChange }))),
                    React.createElement("li", { className: "list-fields" },
                        React.createElement("label", { htmlFor: "taskLabelChange", className: "gantt-labels-style" }, "Show task labels :"),
                        React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                            React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "taskLabelChange", className: "checked", checked: true, change: taskLabelChange }))),
                    React.createElement("li", { className: "list-fields section-header" },
                        React.createElement("label", { className: "scheduling" }, "Scheduling Settings")),
                    React.createElement("li", { className: "list-field stack-container" },
                        React.createElement("label", { htmlFor: "workDays", className: "gantt-labels-style" }, "Working days :"),
                        React.createElement("div", { style: { paddingLeft: '10px' } },
                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: multiselectObj, id: "WorkWeek", style: { padding: '2px' }, mode: "CheckBox", value: defaultValue, dataSource: workDays, showDropDownIcon: true, popupHeight: '350px', width: 200, fields: { text: 'day', value: 'id' }, select: select.bind(_this), removed: removed.bind(_this) },
                                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                    React.createElement("li", { className: "list-field stack-container" },
                        React.createElement("label", { htmlFor: "durationUnit", className: "gantt-labels-style" }, "Duration unit:"),
                        React.createElement("div", { style: { paddingLeft: '10px' } },
                            React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "games", dataSource: durationUnit, fields: durationFields, change: changeDuraiton, value: durationValue, popupHeight: "220px" }))),
                    React.createElement("li", { className: "list-field stack-container" },
                        React.createElement("label", { htmlFor: "unitWidth", className: "gantt-labels-style" }, "Timeline width:"),
                        React.createElement("div", { style: { paddingLeft: '10px' } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 10, value: 33, onChange: unitChange }))),
                    React.createElement("li", { className: "list-fields section-header" },
                        React.createElement("label", { className: "scheduling" }, "View Settings")),
                    React.createElement("li", { className: "list-field stack-container" },
                        React.createElement("label", { htmlFor: "viewType", className: "gantt-labels-style" }, "View type:"),
                        React.createElement("div", { style: { paddingLeft: '10px' } },
                            React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "viewType", dataSource: viewTypeData, placeholder: 'View Type', fields: viewFileds, change: typeChange }))),
                    React.createElement("li", { className: "list-field stack-container" },
                        React.createElement("label", { htmlFor: "viewMode", className: "gantt-labels-style" }, "View mode:"),
                        React.createElement("div", { style: { paddingLeft: '10px' } },
                            React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "viewMode", dataSource: viewModeData, placeholder: 'View', fields: modeFields, change: modeChange }))))))),
            React.createElement("div", null,
                React.createElement("div", { style: { padding: '16px' } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'settings-btn', onClick: triggerSidebar, className: 'settings-btn', style: { position: 'absolute', top: '10px', right: '10px', zIndex: 10 } },
                        React.createElement("span", { className: 'e-settings-icon', style: { padding: '3px' } }),
                        "Settings")),
                React.createElement("div", { id: 'sidebar-gantt' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Overview', ref: ganttInstance, dataSource: data_1.overviewData, treeColumnIndex: 1, allowSelection: true, highlightWeekends: true, allowExcelExport: true, allowPdfExport: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, load: load.bind(_this), pdfQueryCellInfo: pdfQueryCellInfo.bind(_this), toolbarClick: toolbarClick.bind(_this), taskFields: taskFields, timelineSettings: timelineSettings, labelSettings: labelSettings, splitterSettings: splitterSettings, height: '500px', gridLines: gridLines, allowFiltering: true, showColumnMenu: true, allowSorting: true, allowResizing: true, toolbar: toolbarOptions, resourceFields: resourceFields, resources: data_1.editingResources },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskId', headerText: 'Task Id', width: '180', visible: false }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Product Release', width: '250' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Assignee', headerText: 'Assignee', allowSorting: false, width: '170', template: template }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Status', headerText: 'Status', minWidth: "100", width: "120", template: statusTemplate }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Priority', headerText: 'Priority', minWidth: '80', width: '100', template: priorityTemplate }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Work', headerText: 'Planned Hours', width: '120' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TimeLog', headerText: 'Work Log', width: '120' })),
                        React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                            React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay1, label: 'Q-1 Release' }),
                            React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay2, label: 'Q-2 Release' }),
                            React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay3, label: 'Q-3 Release' })),
                        React.createElement(ej2_react_gantt_1.HolidaysDirective, null,
                            React.createElement(ej2_react_gantt_1.HolidayDirective, { from: new Date('01/01/2024'), to: new Date('01/01/2024'), label: 'New year Holiday' }),
                            React.createElement(ej2_react_gantt_1.HolidayDirective, { from: new Date('12/25/2023'), to: new Date('12/26/2023'), label: 'Christmas Holidays' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.ColumnMenu, ej2_react_gantt_1.Filter, ej2_react_gantt_1.Sort, ej2_react_gantt_1.Resize, ej2_react_gantt_1.ExcelExport, ej2_react_gantt_1.PdfExport] })))),
            React.createElement("div", { style: { float: 'right', margin: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Construction", target: '_blank' }, "https://en.wikipedia.org/"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows an overview of the EJ2 Gantt Chart features that visualize the progress of each feature of the product towards its release and make it easier to monitor the scheduling of the dependent items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This example shows the three-quarter release planning of product features rendered in the EJ2 Gantt chart. It tracks the quarterly release planning of product status, resources, and task scheduling."),
            React.createElement("p", null, "EJ2 Gantt Chart features such as Sorting, Filtering, Column resizing, Column menu, column template and so on are used in this demo."))));
};
exports.default = Overview;
