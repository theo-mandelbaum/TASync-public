"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./advanced-filtering.css");
var AdvancedFiltering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(false), sidebarToggle = _a[0], setSidebarToggle = _a[1];
    var _b = (0, react_1.useState)(false), isSideBar = _b[0], setIsSideBar = _b[1];
    var _c = (0, react_1.useState)(false), querybuilderevent = _c[0], setQuerybuilderevent = _c[1];
    var _d = (0, react_1.useState)(''), create = _d[0], setCreate = _d[1];
    var _e = (0, react_1.useState)(null), predicateValue = _e[0], setPredicateValue = _e[1];
    var _f = (0, react_1.useState)(new ej2_data_1.Query()), searchQuery = _f[0], setSearchQuery = _f[1];
    var ganttRef = (0, react_1.useRef)(null);
    var sidebarRef = (0, react_1.useRef)(null);
    var queryBuilderRef = (0, react_1.useRef)(null);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var projectStartDate = new Date('04/01/2024');
    var projectEndDate = new Date('07/06/2024');
    var splitterSettings = { columnIndex: 3 };
    var labelSettings = { rightLabel: 'TaskName' };
    var target = '#ganttsidebar-parent';
    var rowSelected = function () {
        setSidebarToggle(false);
        setIsSideBar(false);
        if (isSideBar && sidebarRef.current) {
            sidebarRef.current.isOpen = false;
        }
    };
    var triggerSidebar = function () {
        var _a;
        setSidebarToggle(function (prev) { return !prev; });
        setIsSideBar(true);
        if (querybuilderevent) {
            setCreate((_a = queryBuilderRef.current) === null || _a === void 0 ? void 0 : _a.getSqlFromRules());
        }
        if (sidebarRef.current) {
            sidebarRef.current.isOpen = true;
        }
    };
    var created = function () {
        var _a;
        setQuerybuilderevent(true);
        if (create && create !== '') {
            (_a = queryBuilderRef.current) === null || _a === void 0 ? void 0 : _a.setRulesFromSql(create);
        }
    };
    var updateRule = (0, react_1.useCallback)(function (args) {
        var _a;
        var predicateValue = (_a = queryBuilderRef.current) === null || _a === void 0 ? void 0 : _a.getPredicate(args.rule);
        setPredicateValue(predicateValue);
        if (args.Type === "DeleteRule" && predicateValue !== null) {
            setSearchQuery(new ej2_data_1.Query().where(predicateValue));
        }
        else if (predicateValue === null && args.Type === "DeleteRule") {
            setSearchQuery(new ej2_data_1.Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']));
        }
    }, []);
    var handleClose = function () {
        var _a;
        setSidebarToggle(false);
        setIsSideBar(false);
        setCreate((_a = queryBuilderRef.current) === null || _a === void 0 ? void 0 : _a.getSqlFromRules());
        if (sidebarRef.current) {
            sidebarRef.current.hide();
        }
    };
    var handleApply = function () {
        if (predicateValue) {
            setSearchQuery(new ej2_data_1.Query().where(predicateValue));
        }
        else {
            setSearchQuery(new ej2_data_1.Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']));
        }
    };
    (0, react_1.useEffect)(function () {
        if (ganttRef.current) {
            ganttRef.current.query = searchQuery;
            ganttRef.current.refresh();
        }
    }, [searchQuery]); // This effect will run whenever `searchQuery` changes
    var handleClear = function () {
        setCreate('');
        setPredicateValue(null);
        setSearchQuery(new ej2_data_1.Query());
        if (queryBuilderRef.current) {
            queryBuilderRef.current.reset();
        }
        if (ganttRef.current) {
            ganttRef.current.query = new ej2_data_1.Query();
            ganttRef.current.refresh();
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { paddingTop: '0px' } },
            React.createElement("div", { id: 'ganttsidebar-parent', style: { overflow: 'hidden', height: '460px' } },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'filter-btn', onClick: triggerSidebar },
                    React.createElement("span", { className: 'e-quickfilter', style: { padding: '3px' } }),
                    "Advanced Filters"),
                isSideBar && (React.createElement(ej2_react_navigations_1.SidebarComponent, { id: 'ganttSidebar', ref: sidebarRef, target: target, width: '65%', type: 'Over', isOpen: sidebarToggle, position: 'Right' },
                    React.createElement("div", { className: "ganttsidebar-header" },
                        React.createElement("div", { className: "title" }, "Advanced Filters"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "close", className: "e-close", onClick: handleClose })),
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: 'ganttquerybuilder', ref: queryBuilderRef, dataSource: data_1.projectNewData, allowValidation: true, columns: [
                            { field: 'TaskID', label: 'Task ID', type: 'number' },
                            { field: 'TaskName', label: 'Task Name', type: 'string' },
                            { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
                            { field: 'Duration', label: 'Duration', type: 'number' },
                            { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
                            { field: 'Progress', label: 'Progress', type: 'number' },
                            { field: 'Predecessor', label: 'Predecessor', type: 'string' }
                        ], ruleChange: updateRule, created: created }),
                    React.createElement("div", { className: "ganttbtn-container" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "apply", cssClass: 'e-primary', onClick: handleApply }, "Apply"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", onClick: handleClear }, "Clear")))),
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'AdvancedFiltering', ref: ganttRef, dataSource: data_1.projectNewData, treeColumnIndex: 0, allowFiltering: true, includeWeekend: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, splitterSettings: splitterSettings, labelSettings: labelSettings, height: '410px', rowSelected: rowSelected },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', headerText: 'End Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Selection] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the integration of the QueryBuilder component for complex filtering in the Gantt Chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the process involves retrieving the complex query from the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started" }, "QueryBuilder"),
                "component and subsequently integrating it into the Gantt Chart by updating its ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#query" }, "Query"),
                " Property. The QueryBuilder component tool is located in a ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/sidebar/getting-started" }, "SideBar"),
                " component that appears when you click on the toolbar."))));
};
exports.default = AdvancedFiltering;
