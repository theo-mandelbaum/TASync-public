"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overview = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./overview.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_dropdowns_2 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataList = [
            { ID: 'Default', Text: 'Default' },
            { ID: 'Grid', Text: 'Grid' },
            { ID: 'Chart', Text: 'Chart' }
        ];
        _this.template = _this.columnTemplate.bind(_this);
        _this.statusTemplate = _this.statustemplate.bind(_this);
        _this.priorityTemplate = _this.prioritytemplate.bind(_this);
        _this.taskFields = {
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
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        _this.splitterSettings = {
            position: "57%"
        };
        _this.projectStartDate = new Date('12/17/2023');
        _this.projectEndDate = new Date('10/26/2024');
        _this.gridLines = 'Vertical';
        _this.toolbarOptions = ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport'];
        _this.timelineSettings = {
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
        _this.labelSettings = {
            taskLabel: '${Progress}%',
            rightLabel: 'Assignee'
        };
        _this.eventMarkerDay1 = new Date('04/04/2024');
        _this.eventMarkerDay2 = new Date('06/30/2024');
        _this.eventMarkerDay3 = new Date('09/29/2024');
        _this.defaultTicks = { placement: 'Before', largeStep: 10, smallStep: 10, showSmallTicks: true };
        _this.tooltip = {
            placement: 'Before',
            isVisible: true,
            showOn: 'Hover'
        };
        _this.workDays = [
            { id: 'Sunday', day: 'Sunday' },
            { id: 'Monday', day: 'Monday' },
            { id: 'Tuesday', day: 'Tuesday' },
            { id: 'Wednesday', day: 'Wednesday' },
            { id: 'Thursday', day: 'Thursday' },
            { id: 'Friday', day: 'Friday' },
            { id: 'Saturday', day: 'Saturday' },
        ];
        _this.defaultValue = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        //   Duration Unit
        _this.durationUnit = [
            { id: "Minute", Text: "Minute" },
            { id: "Hour", Text: "Hour" },
            { id: "Day", Text: "Day" }
        ];
        _this.durationFields = { text: 'Text', value: 'id' };
        _this.durationValue = 'Day';
        // view Type change
        _this.viewTypeData = [
            { id: "ResourceView", Text: "Resource View" },
            { id: "ProjectView", Text: "Project View" }
        ];
        _this.viewFileds = { text: 'Text', value: 'id' };
        // View Mode
        _this.viewModeData = [
            { ID: "Default", Text: "Default" },
            { ID: "Grid", Text: "Grid" },
            { ID: "Chart", Text: "Chart" },
        ];
        _this.modeFields = { value: 'ID', text: 'Text' };
        return _this;
    }
    Overview.prototype.change = function (args) {
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
    ;
    Overview.prototype.toolbarClick = function (args) {
        debugger;
        if (args.item.id === "Overview_excelexport") {
            this.ganttInstance.excelExport();
        }
        else if (args.item.id === "Overview_csvexport") {
            this.ganttInstance.csvExport();
        }
        else if (args.item.id === "Overview_pdfexport") {
            this.ganttInstance.pdfExport();
        }
    };
    Overview.prototype.statustemplate = function (props) {
        var sts = this.Status(props.taskData.Status);
        var stsCon = this.StatusContent(props.taskData.Status);
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
    ;
    Overview.prototype.prioritytemplate = function (props) {
        var pri = this.Priority(props.taskData.Priority);
        var priCon = this.PriorityContent(props.taskData.Priority);
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
    ;
    Overview.prototype.columnTemplate = function (props) {
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
    Overview.prototype.load = function () {
        var themeCollection = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind', 'fluent2', 'tailwind3', 'bootstrap5.3'];
        var cls = document.body.className.split(' ');
        this.theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
            cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                    cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : cls.indexOf('bootstrap5.3') > 0 ? 'bootstrap5.3' :
                        cls.indexOf('fluent2') > 0 ? 'fluent2' : cls.indexOf('tailwind3') > 0 ? 'tailwind3' : '';
        var check = themeCollection.indexOf(this.theme);
        if (check >= 0) {
            this.CurrentTheme = true;
        }
        else {
            this.CurrentTheme = false;
        }
    };
    ;
    Overview.prototype.pdfQueryCellInfo = function (args) {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height: 25, width: 25, base64: args.data.taskData.resourcesImage };
            }
        }
    };
    ;
    Overview.prototype.Status = function (status) {
        switch (status) {
            case "In Progress":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFECFF" : "#2D3E57";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '96px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.background = this.statusStyleColor;
                break;
            case "Open":
                this.background = "red";
                this.color = "white";
                this.borderRadius = '15px';
                this.padding = '6px';
                break;
            case "On Hold":
                this.statusStyleColor = (this.CurrentTheme) ? "#E4E4E7" : "#3C3B43";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '78px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.background = this.statusStyleColor;
                break;
            case "Completed":
                this.statusStyleColor = (this.CurrentTheme) ? "#DFFFE2" : "#16501C";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '98px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.background = this.statusStyleColor;
                break;
            case "High":
                this.statusStyleColor = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '55px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.background = this.statusStyleColor;
                break;
        }
        return { display: this.display, padding: this.padding, gap: this.gap, width: this.width, height: this.height, borderRadius: this.borderRadius, background: this.background, color: this.color };
    };
    ;
    Overview.prototype.StatusContent = function (status) {
        switch (status) {
            case "In Progress":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#006AA6" : "#34B6FF";
                this.width = "72px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.statusContentstyleColor;
                break;
            case "Open":
                this.backgroundColor = 'red';
                this.color = 'white';
                this.borderRadius = '15px';
                this.pad = '6px';
                break;
            case "On Hold":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#766B7C" : "#CDCBD7";
                this.width = "54px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.statusContentstyleColor;
                break;
            case "Completed":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#00A653" : "#92FFC8";
                this.width = "74px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.statusContentstyleColor;
                break;
            case "High":
                this.statusContentstyleColor = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "31px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.statusContentstyleColor;
                break;
        }
        return {
            width: this.width, height: this.height, fontStyle: this.fontStyle, fontWeight: this.fontWeight, fontSize: this.fontSize, lineHeight: this.lineHeight, textAlign: this.textAlign, color: this.color,
            backgroundColor: this.backgroundColor, borderRadius: this.borderRadius, pad: this.pad
        };
    };
    ;
    Overview.prototype.Priority = function (priority) {
        switch (priority) {
            case "Low":
                this.priorityStyle = (this.CurrentTheme) ? "#FFF6D1" : "#473F1E";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '52px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.backgroundPri = this.priorityStyle;
                break;
            case "Normal":
                this.priorityStyle = (this.CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '73px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.backgroundPri = this.priorityStyle;
                break;
            case "Critical":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '72px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.backgroundPri = this.priorityStyle;
                break;
            case "High":
                this.priorityStyle = (this.CurrentTheme) ? "#FFEBE9" : "#48211D";
                this.display = 'flex';
                this.padding = '0px 12px';
                this.gap = '10px';
                this.width = '55px';
                this.height = '24px';
                this.borderRadius = '24px';
                this.backgroundPri = this.priorityStyle;
                break;
        }
        return { display: this.display, padding: this.padding, gap: this.gap, width: this.width, height: this.height, borderRadius: this.borderRadius, backgroundPri: this.backgroundPri };
    };
    ;
    Overview.prototype.PriorityContent = function (priority) {
        switch (priority) {
            case "Low":
                this.priorityContentStyle = (this.CurrentTheme) ? "#70722B" : "#FDFF88";
                this.width = "28px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.priorityContentStyle;
                break;
            case "Normal":
                this.priorityContentStyle = (this.CurrentTheme) ? "#7100A6" : "#E3A9FF";
                this.width = "49px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.priorityContentStyle;
                break;
            case "Critical":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "48px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.priorityContentStyle;
                break;
            case "High":
                this.priorityContentStyle = (this.CurrentTheme) ? "#FF3740" : "#FFB5B8";
                this.width = "31px";
                this.height = "22px";
                this.fontStyle = 'normal';
                this.fontWeight = '500';
                this.fontSize = '14px';
                this.lineHeight = '20px';
                this.textAlign = 'center';
                this.color = this.priorityContentStyle;
                break;
        }
        return {
            width: this.width, height: this.height, fontStyle: this.fontStyle, fontWeight: this.fontWeight, fontSize: this.fontSize, lineHeight: this.lineHeight, textAlign: this.textAlign, color: this.color
        };
    };
    ;
    Overview.prototype.triggerSidebar = function () {
        if (this.sidebarobj) {
            this.sidebarobj.isOpen = true;
        }
    };
    Overview.prototype.closeSidebar = function () {
        this.sidebarobj.hide();
    };
    Overview.prototype.onChanged = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.rowHeight = args.value;
    };
    // Grid lines
    Overview.prototype.gridLinesChange = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.gridLines = 'Both';
        }
        else {
            gantt.gridLines = 'Vertical';
        }
    };
    Overview.prototype.showEventMarkers = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = this.tempEvents;
        }
        else {
            this.tempEvents = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    };
    // Show depenency lines
    Overview.prototype.dependencyChange = function (args) {
        var ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container');
        if (args.checked) {
            if (ganttDependencyViewContainer) {
                ganttDependencyViewContainer.style.visibility = 'visible';
            }
        }
        else {
            ganttDependencyViewContainer.style.visibility = 'hidden';
        }
    };
    Overview.prototype.taskLabelChange = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = this.tempLabels;
        }
        else {
            this.tempLabels = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    };
    Overview.prototype.select = function (args) {
        var workingDays = (0, ej2_base_1.extend)([], this.multiselectObj.value, [], true);
        workingDays.push(args.itemData.day);
        this.ganttInstance.workWeek = workingDays;
    };
    ;
    Overview.prototype.removed = function (args) {
        var index = this.ganttInstance.workWeek.indexOf(args.itemData.day);
        if (index !== -1) {
            this.ganttInstance.workWeek = this.multiselectObj.value;
        }
    };
    ;
    Overview.prototype.changeDuraiton = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.durationUnit = args.value;
    };
    // Timeline unit width
    Overview.prototype.unitChange = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    };
    Overview.prototype.typeChange = function (args) {
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        gantt.viewType = args.value;
        if (document.getElementsByClassName('checkeddependency')[0].hidden !== true) {
            document.querySelectorAll('.e-switch')[2].ej2_instances[0].checked = true;
        }
    };
    Overview.prototype.modeChange = function (args) {
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
    };
    Overview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'gantt-sidebar-parent' },
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; }, type: "Over", className: "default-sidebar", width: "282px", target: "#sidebar-gantt", position: "Right" },
                        React.createElement("div", { className: "gantt-title-header" },
                            React.createElement("div", { className: "gantt-title" }, "Project Settings"),
                            React.createElement("span", { className: "e-closed", onClick: this.closeSidebar, style: { cursor: 'pointer' } })),
                        React.createElement("ul", { className: "settings-list", style: { margin: '15px 15px', paddingLeft: '5px' } },
                            React.createElement("label", { htmlFor: "rowHeightSlider", className: "gantt-labels-style" }, "Row height :"),
                            React.createElement("li", { className: "list-fields", style: { padding: '20px', paddingBottom: '0px', marginBottom: '0px' } },
                                React.createElement("div", { id: "rowHeightSlider" },
                                    React.createElement(ej2_react_inputs_2.SliderComponent, { value: 30, min: 40, max: 60, step: 5, changed: this.onChanged, ticks: this.defaultTicks, width: 180, tooltip: this.tooltip, ref: function (slider) { _this.defaultObj = slider; } }))),
                            React.createElement("li", { className: "list-fields" },
                                React.createElement("label", { htmlFor: "showGridLines", className: "gantt-labels-style" }, "Show Grid Lines :"),
                                React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                                    React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "showGridLinesSwitch", className: "checked", change: this.gridLinesChange }))),
                            React.createElement("li", { className: "list-fields" },
                                React.createElement("label", { htmlFor: "showGridLines", className: "gantt-labels-style" }, "Show event markers :"),
                                React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                                    React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "showGridLinesSwitch", className: "checked", checked: true, change: this.showEventMarkers }))),
                            React.createElement("li", { className: "list-fields" },
                                React.createElement("label", { htmlFor: "dependencyLines", className: "gantt-labels-style" }, "Show dependencies :"),
                                React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                                    React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "dependencyLines", className: "checkeddependency", checked: true, change: this.dependencyChange }))),
                            React.createElement("li", { className: "list-fields" },
                                React.createElement("label", { htmlFor: "taskLabelChange", className: "gantt-labels-style" }, "Show task labels :"),
                                React.createElement("div", { className: "switch", style: { marginLeft: '20px' } },
                                    React.createElement(ej2_react_buttons_2.SwitchComponent, { id: "taskLabelChange", className: "checked", checked: true, change: this.taskLabelChange }))),
                            React.createElement("li", { className: "list-fields section-header" },
                                React.createElement("label", { className: "scheduling" }, "Scheduling Settings")),
                            React.createElement("li", { className: "list-field stack-container" },
                                React.createElement("label", { htmlFor: "workDays", className: "gantt-labels-style" }, "Working days :"),
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (multiselect) { return _this.multiselectObj = multiselect; }, id: "WorkWeek", style: { padding: '2px' }, mode: "CheckBox", value: this.defaultValue, dataSource: this.workDays, showDropDownIcon: true, popupHeight: '350px', fields: { text: 'day', value: 'id' }, select: this.select.bind(this), removed: this.removed.bind(this) },
                                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                            React.createElement("li", { className: "list-field stack-container" },
                                React.createElement("label", { htmlFor: "durationUnit", className: "gantt-labels-style" }, "Duration unit:"),
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "games", dataSource: this.durationUnit, fields: this.durationFields, change: this.changeDuraiton, value: this.durationValue, popupHeight: "220px" }))),
                            React.createElement("li", { className: "list-field stack-container" },
                                React.createElement("label", { htmlFor: "unitWidth", className: "gantt-labels-style" }, "Timeline width:"),
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 10, value: 33, onChange: this.unitChange }))),
                            React.createElement("li", { className: "list-fields section-header" },
                                React.createElement("label", { className: "scheduling" }, "View Settings")),
                            React.createElement("li", { className: "list-field stack-container" },
                                React.createElement("label", { htmlFor: "viewType", className: "gantt-labels-style" }, "View type:"),
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "viewType", dataSource: this.viewTypeData, placeholder: 'View Type', fields: this.viewFileds, change: this.typeChange }))),
                            React.createElement("li", { className: "list-field stack-container" },
                                React.createElement("label", { htmlFor: "viewMode", className: "gantt-labels-style" }, "View mode:"),
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_dropdowns_2.DropDownListComponent, { id: "viewMode", dataSource: this.viewModeData, placeholder: 'View', fields: this.modeFields, change: this.modeChange })))))),
                React.createElement("div", null,
                    React.createElement("div", { style: { padding: '16px' } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'settings-btn', onClick: this.triggerSidebar, className: 'settings-btn', style: { position: 'absolute', top: '10px', right: '10px', zIndex: 10 } },
                            React.createElement("span", { className: 'e-settings-icon', style: { padding: '3px' } }),
                            "Settings")),
                    React.createElement("div", { id: 'sidebar-gantt' },
                        React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Overview', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.overviewData, treeColumnIndex: 1, allowSelection: true, highlightWeekends: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, load: this.load.bind(this), pdfQueryCellInfo: this.pdfQueryCellInfo.bind(this), taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings, height: '500px', gridLines: this.gridLines, allowFiltering: true, allowSorting: true, allowResizing: true, showColumnMenu: true, toolbar: this.toolbarOptions, resourceFields: this.resourceFields, resources: data_1.editingResources },
                            React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskId', headerText: 'Task Id', width: '180', visible: false }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Product Release', width: '250' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Assignee', headerText: 'Assignee', allowSorting: false, width: '170', template: this.template }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Status', headerText: 'Status', minWidth: "100", width: "120", template: this.statusTemplate }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Priority', headerText: 'Priority', minWidth: '80', width: '100', template: this.priorityTemplate }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Work', headerText: 'Planned Hours', width: '120' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TimeLog', headerText: 'Work Log', width: '120' })),
                            React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                                React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay1, label: 'Q-1 Release' }),
                                React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay2, label: 'Q-2 Release' }),
                                React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay3, label: 'Q-3 Release' })),
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
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
