import { loadCultureFiles } from '../common/culture-loader';
import { Kanban, SortDirection, SortOrderBy } from '@syncfusion/ej2-kanban';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban Sorting Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            headerField: 'Id',
            contentField: 'Summary',
            template: '#cardTemplate'
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    let sortBy: DropDownList = new DropDownList({ change: onChange, index: 1 });
    sortBy.appendTo('#sortBy');
    let field: DropDownList = new DropDownList({ enabled: false });
    field.appendTo('#field');
    let direction: DropDownList = new DropDownList({ change: onChange });
    direction.appendTo('#direction');
    document.getElementById('sort').onclick = (): void => {
        setKanbanProperties();
    };
    document.getElementById('clear').onclick = (): void => {
        sortBy.value = 'Index';
        direction.value = 'Ascending';
        setFieldValue('None');
        setKanbanProperties();
    };
    function setKanbanProperties(): void {
        kanbanObj.sortSettings.sortBy = sortBy.value as SortOrderBy;
        kanbanObj.sortSettings.field = field.value as string;
        kanbanObj.sortSettings.direction = direction.value as SortDirection;
    }
    function onChange(args: ChangeEventArgs): void {
        if (args.value === 'DataSourceOrder' || args.value === 'Index') {
            let data: string = args.value === 'Index' ? 'RankId' : 'None';
            setFieldValue(data);
        }
        if (args.value === 'Custom') {
            field.dataSource = ['Priority', 'RankId', 'Summary'];
            field.value = 'Priority';
            field.enabled = true;
        }
      if (args.value === 'Ascending') {
        let data: string = sortBy.value === 'Index' ? 'RankId' : 'None';
        setFieldValue(data);
        direction.value = 'Ascending';
      }
      if (args.value === 'Descending') {
        let data: string = sortBy.value === 'Index' ? 'RankId' : 'None';
        setFieldValue(data);
        direction.value = 'Descending';
      }
    }
    function setFieldValue(data: string): void {
        field.dataSource = [data];
        field.value = data;
        field.enabled = false;
    }
};
