import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Schedule, Day, TimelineViews, TimelineMonth, Resize, DragAndDrop, ResourceDetails
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

/**
 * schedule block events sample
 */
Schedule.Inject(Day, TimelineViews, TimelineMonth, Resize, DragAndDrop);
// tslint:disable-next-line:max-func-body-length

    

    interface TemplateFunction extends Window {
        getEmployeeName?: Function;
        getEmployeeImage?: Function;
        getEmployeeDesignation?: Function;
    }

    (window as TemplateFunction).getEmployeeName = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField];
    };

    (window as TemplateFunction).getEmployeeImage = (value: ResourceDetails) => {
        let resourceName: string = (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
        return `<img class="employee-image" src="//npmci.syncfusion.com/development/demos/src/schedule/images/${resourceName.toLowerCase()}.png" alt="${resourceName.toLowerCase()}"/>`;
    };

    (window as TemplateFunction).getEmployeeDesignation = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData.Designation;
    };

    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 7, 2),
        currentView: 'TimelineDay',
        views: [
            { option: 'Day' },
            { option: 'TimelineDay' },
            { option: 'TimelineMonth' }
        ],
        resourceHeaderTemplate: '#resource-template',
        group: {
            enableCompactView: false,
            resources: ['Employee']
        },
        resources: [{
            field: 'EmployeeId', title: 'Employees',
            name: 'Employee', allowMultiple: true,
            dataSource: [
                { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
                { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
                { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
                { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
                { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
                { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
            ],
            textField: 'Text', idField: 'Id', groupIDField: 'GroupId', colorField: 'Color'
        }],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).blockData, null, true)
        }
    });
    scheduleObj.appendTo('#Schedule');
