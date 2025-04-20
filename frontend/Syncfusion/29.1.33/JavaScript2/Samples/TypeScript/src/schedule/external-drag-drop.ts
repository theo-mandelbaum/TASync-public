import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, TimelineViews, TimelineMonth, Resize, DragAndDrop, CellClickEventArgs } from '@syncfusion/ej2-schedule';
import { ResourceDetails, ActionEventArgs } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { DragAndDropEventArgs, TreeView } from '@syncfusion/ej2-navigations';
import { closest, remove, addClass, extend } from '@syncfusion/ej2-base';

Schedule.Inject(TimelineViews, TimelineMonth, Resize, DragAndDrop);

/**
 * Schedule external drag and drop sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    // tslint:disable-next-line:max-func-body-length
    interface TemplateFunction extends Window {
        getConsultantName?: Function;
        getConsultantImage?: Function;
        getConsultantDesignation?: Function;
    }

    (window as TemplateFunction).getConsultantName = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField];
    };

    (window as TemplateFunction).getConsultantImage = (value: ResourceDetails) => {
        let resourceName: string =
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return '';
        } else {
            return '<img class="specialist-image" src="src/schedule/images/' + resourceName.toLowerCase() + '.png" alt="' + resourceName.toLowerCase() + '"/>';
        }
    };
    (window as TemplateFunction).getConsultantDesignation = (value: ResourceDetails) => {
        let resourceName: string =
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return '';
        } else {
            return (value as ResourceDetails).resourceData.Designation;
        }
    };

    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 7, 2),
        currentView: 'TimelineDay',
        resourceHeaderTemplate: '#resource-template',
        cssClass: 'schedule-drag-drop',
        workHours: {
            start: '08:00',
            end: '18:00'
        },
        views: [
            { option: 'TimelineDay' },
            { option: 'TimelineMonth' }
        ],
        group: {
            enableCompactView: false,
            resources: ['Departments', 'Consultants']
        },
        resources: [
            {
                field: 'DepartmentID', title: 'Department',
                name: 'Departments', allowMultiple: false,
                dataSource: [
                    { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
                    { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
                ],
                textField: 'Text', idField: 'Id', colorField: 'Color'
            },
            {
                field: 'ConsultantID', title: 'Consultant',
                name: 'Consultants', allowMultiple: false,
                dataSource: [
                    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
                    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
                    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
                    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
                    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
                    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
                ],
                textField: 'Text', idField: 'Id', groupIDField: 'GroupId', colorField: 'Color'
            }
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as Record<string, any>).hospitalData, null, true),
            fields: {
                subject: { title: 'Patient Name', name: 'Name' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' },
                description: { title: 'Reason', name: 'Description' }
            }
        },
        actionBegin: onActionBegin
    });
    scheduleObj.appendTo('#Schedule');

    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as Record<string, any>).waitingList, id: 'Id', text: 'Name' },
        allowDragAndDrop: true,
        nodeDragStop: onTreeDragStop,
        nodeDragging: onTreeDrag,
        nodeDragStart: onTreeDragStart,
        nodeSelecting: onItemSelecting,
        nodeTemplate: '#treeTemplate',
        cssClass: 'treeview-external-drag',
        dragArea: '.content-wrapper'
    });
    treeObj.appendTo('#Tree');

    let isTreeItemDropped: boolean = false;
    let draggedItemId: string = '';

    function onItemSelecting(args: any): void {
        args.cancel = true;
    } 

    function onTreeDrag(event: any): void {
        if (scheduleObj.isAdaptive) {
            let classElement: HTMLElement = scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    }

    function onActionBegin(event: ActionEventArgs): void {
        if (event.requestType === 'eventCreate' && isTreeItemDropped) {
            let treeViewData: Record<string, any>[] = treeObj.fields.dataSource as Record<string, any>[];
            const filteredPeople: Record<string, any>[] =
                treeViewData.filter((item: any) => item.Id !== parseInt(draggedItemId, 10));
            treeObj.fields.dataSource = filteredPeople;
            let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let element of [].slice.call(elements)) {
                remove(element);
            }
        }
    }

    function onTreeDragStop(event: DragAndDropEventArgs): void {
        let treeElement: Element = <Element>closest(event.target, '.e-treeview');
        let classElement: HTMLElement = scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap') ||
                <Element>closest(event.target, '.e-all-day-row');
            if (scheduleElement) {
                let treeviewData: Record<string, any>[] =
                    treeObj.fields.dataSource as Record<string, any>[];
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData: Record<string, any>[] =
                        treeviewData.filter((item: any) => item.Id === parseInt(event.draggedNodeData.id as string, 10));
                    let cellData: CellClickEventArgs = scheduleObj.getCellDetails(event.target);
                    let resourceDetails: ResourceDetails = scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    let eventData: Record<string, any> = {
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id
                    };
                    scheduleObj.openEditor(eventData, 'Add', true);
                    isTreeItemDropped = true;
                    draggedItemId = event.draggedNodeData.id as string;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    }
    function onTreeDragStart() {
        document.body.classList.add('e-disble-not-allowed');
      }
};
