ej.base.enableRipple(window.ripple)

    var resourceData = window.generateResourceData(1, 1000, 'Resource');
    var dataManager = new ej.data.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/VirtualEventData',
        adaptor: new ej.data.WebApiAdaptor(),
        crossDomain: true
    });
    var scheduleObj = new ej.schedule.Schedule({
        height: '650px',
        width: '100%',
        currentView: 'TimelineMonth',
        readonly: true,
        views: [{
            option: 'TimelineMonth',
            enableLazyLoading: true
        },
        {
            option: 'Month',
            enableLazyLoading: true
        }],
        group: {
            resources: ['Resources']
        },
        resources: [{
            field: 'ResourceId',
            title: 'Resource',
            name: 'Resources',
            dataSource: resourceData,
            textField: 'Text',
            idField: 'Id',
            colorField: 'Color'
        }],
        selectedDate: new Date(2023, 3, 1),
        eventSettings: {
            dataSource: dataManager
        }
    });
    scheduleObj.appendTo('#Schedule');

