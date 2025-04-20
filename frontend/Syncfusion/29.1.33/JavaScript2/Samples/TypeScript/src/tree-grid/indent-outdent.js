define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-treegrid", "./data-source"], function (require, exports, culture_loader_1, ej2_treegrid_1, data_source_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_treegrid_1.TreeGrid.Inject(ej2_treegrid_1.RowDD, ej2_treegrid_1.Toolbar);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var treegrid = new ej2_treegrid_1.TreeGrid({
            dataSource: data_source_1.dragData,
            childMapping: 'subtasks',
            height: '400',
            toolbar: ['Indent', 'Outdent'],
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right', width: 100 },
                { field: 'taskName', headerText: 'Task Name', width: 250 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'endDate', headerText: 'End Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 120 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 120 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 135 },
            ],
        });
        treegrid.appendTo('#TreeGrid');
    };
});
