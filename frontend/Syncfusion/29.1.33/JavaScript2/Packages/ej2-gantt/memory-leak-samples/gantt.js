define(["require", "exports", "../src/gantt/base/gantt", "../src/gantt/actions/toolbar", "../src/gantt/actions/selection", "../src/gantt/actions/excel-export", "../src/gantt/actions/pdf-export", "../src/gantt/actions/day-markers", "../src/gantt/actions/context-menu", "../src/gantt/actions/edit", "../src/gantt/actions/rowdragdrop", "../src/gantt/actions/filter", "../src/gantt/actions/sort", "../src/gantt/actions/virtual-scroll", "../src/gantt/actions/critical-path", "../src/gantt/actions/undo-redo", "@syncfusion/ej2-treegrid", "./data"], function (require, exports, gantt_1, toolbar_1, selection_1, excel_export_1, pdf_export_1, day_markers_1, context_menu_1, edit_1, rowdragdrop_1, filter_1, sort_1, virtual_scroll_1, critical_path_1, undo_redo_1, ej2_treegrid_1, data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    gantt_1.Gantt.Inject(selection_1.Selection, toolbar_1.Toolbar, day_markers_1.DayMarkers, edit_1.Edit, filter_1.Filter, ej2_treegrid_1.Resize, virtual_scroll_1.VirtualScroll, undo_redo_1.UndoRedo, ej2_treegrid_1.Reorder, sort_1.Sort, rowdragdrop_1.RowDD, context_menu_1.ContextMenu, excel_export_1.ExcelExport, pdf_export_1.PdfExport, critical_path_1.CriticalPath);
    var gantt;
    var date1;
    var date2;
    var date3;
    var flag = true;
    document.getElementById('render').addEventListener('click', renderGantt);
    document.getElementById('destroy').addEventListener('click', destoryGantt);
    function renderGantt() {
        gantt = new gantt_1.Gantt({
            dataSource: data_1.virtualData,
            treeColumnIndex: 1,
            allowSorting: true,
            showOverAllocation: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'parentID',
                baselineStartDate: 'BaselineStartDate',
                baselineEndDate: 'BaselineEndDate',
                indicators: 'Indicators'
            },
            enableCriticalPath: true,
            enableVirtualization: true,
            enableTimelineVirtualization: true,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            allowReordering: true,
            enableContextMenu: true,
            columns: [
                { field: 'TaskID' },
                { field: 'TaskName' },
                { field: 'StartDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'CustomColumn', headerText: 'CustomColumn' }
            ],
            enableUndoRedo: true,
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
                'Indent', 'Outdent', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'PrevTimeSpan', 'NextTimeSpan', 'ExcelExport', 'CsvExport', 'PdfExport', 'Undo', 'Redo'],
            toolbarClick: function (args) {
                if (args.item.id === 'Gantt_excelexport') {
                    gantt.excelExport();
                }
                else if (args.item.id === 'Gantt_csvexport') {
                    gantt.csvExport();
                }
                else if (args.item.id === 'Gantt_pdfexport') {
                    gantt.pdfExport();
                }
            },
            allowExcelExport: true,
            allowPdfExport: true,
            sortSettings: {
                columns: [{ field: 'TaskID', direction: 'Ascending' },
                    { field: 'TaskName', direction: 'Ascending' }]
            },
            allowSelection: true,
            allowRowDragAndDrop: true,
            selectedRowIndex: 1,
            highlightWeekends: true,
            allowFiltering: true,
            gridLines: 'Both',
            selectionSettings: {
                mode: 'Row',
                type: 'Single',
                enableToggle: false
            },
            tooltipSettings: {
                showTooltip: true
            },
            filterSettings: {
                type: 'Menu'
            },
            height: '550px',
            searchSettings: {
                fields: ['TaskName', 'Duration']
            },
            labelSettings: {
                rightLabel: 'TaskName',
                taskLabel: 'Progress',
                leftLabel: 'TaskID'
            },
            timelineSettings: {
                showTooltip: true,
                topTier: {
                    unit: 'Week',
                    format: 'dd/MM/yyyy'
                },
                bottomTier: {
                    unit: 'Day',
                    count: 1
                }
            },
            eventMarkers: [
                {
                    day: '04/10/2019',
                    cssClass: 'e-custom-event-marker',
                    label: 'Project approval and kick-off'
                }
            ],
            holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                }],
            renderBaseline: true,
            baselineColor: 'red',
            allowResizing: true,
            taskbarHeight: 20,
            rowHeight: 40,
            readOnly: false,
            allowUnscheduledTasks: true,
            splitterSettings: {
                position: "50%"
            },
            created: function () {
                date1 = new Date().getTime();
            },
            actionBegin: function (args) {
                if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching' ||
                    args.requestType === 'reorder') {
                    date3 = new Date().getTime();
                }
            },
            actionComplete: function (args) {
                if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching'
                    || args.requestType === 'reorder') {
                    if (date3) {
                        var dateAction = new Date().getTime();
                        document.getElementById('performanceTime1').innerHTML = 'Action Time Taken: ' + (dateAction - date3) + 'ms';
                    }
                }
            },
            dataBound: hide
        });
        gantt.appendTo('#Gantt');
    }
    function hide() {
        if (flag && date1) {
            date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
            flag = false;
        }
    }
    function destoryGantt() {
        if (gantt && !gantt.isDestroyed) {
            gantt.destroy();
        }
    }
});
