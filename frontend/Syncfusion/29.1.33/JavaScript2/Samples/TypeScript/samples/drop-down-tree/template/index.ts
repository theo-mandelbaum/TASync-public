import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Dropdown Tree template Sample
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';

    
    let ddtreeObj: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).templateData, text: 'name', value: 'id', parentValue: 'pid', hasChildren: 'hasChild' },
        headerTemplate: '#headerTemplate',
        itemTemplate: '#itemTemplate',
        footerTemplate: '#footerTemplate',
        valueTemplate: '#valueTemplate',
        width: '100%',
        cssClass: 'ddt-template',
        placeholder: 'Select an employee',
        popupHeight: '250px'
    });
    ddtreeObj.appendTo('#ddttemplate');
