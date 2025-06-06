ej.base.enableRipple(window.ripple)

    var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/api/GanttData';
    var data = new ej.data.DataManager({
        url: hostUrl,
        adaptor: new ej.data.WebApiAdaptor(),
        crossDomain: true
    });
    var ganttChart = new ej.gantt.Gantt({
        dataSource: data,
        height: '450px',
        taskFields: {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'SubTasks',
        },
        columns: [
		    { field: 'TaskId', visible: false },
            { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate' },
            { field: 'Duration' },
        ],
        treeColumnIndex: 1,
        allowSelection: true,
        gridLines: 'Both',
        showColumnMenu: false,
        highlightWeekends: true,
        timelineSettings: {
            timelineUnitSize: 50,
            topTier: {
                unit: 'Month',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
                formatter: function(date) {
                    var month = date.getMonth();
                    if (month === 1) {
                        return '';
                    } else {
                        var presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        var start = new Date(presentDate.getFullYear(), 0, 0);
                        var diff = Number(presentDate) - Number(start);
                        var oneDay = 1000 * 60 * 60 * 24;
                        var day = Math.floor(diff / oneDay);
                        return 'day ' + (day - 59);
                    }
                },
            },
        },
        labelSettings: {
            leftLabel: 'TaskName',
        },
        includeWeekend: true,
        projectStartDate: new Date('02/24/2021'),
        projectEndDate: new Date('06/10/2021'),
    });
    ganttChart.appendTo('#RemoteData');

