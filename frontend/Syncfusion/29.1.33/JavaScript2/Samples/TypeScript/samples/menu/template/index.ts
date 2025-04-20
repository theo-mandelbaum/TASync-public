import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Menu, MenuModel } from '@syncfusion/ej2-navigations';
import * as dataSource from './template-data.json';

/**
 * Menu Template sample
 */

    
    // Menu model definition
    let menuOptions: MenuModel = {
        // Menu data source
        items: (dataSource as any).templateData,
        fields: {
            text: ['category', 'value'],
            children: ['options']
        },
        template: '#menuTemplate'
    };

    // Menu initialization
    new Menu(menuOptions, '#menu');

