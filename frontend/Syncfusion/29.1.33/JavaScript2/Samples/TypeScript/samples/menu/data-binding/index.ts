import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Menu } from '@syncfusion/ej2-navigations';
import * as dataSource from './menu-data.json';

/**
 * Menu data binding sample
 */

    

    // Menu initialization
    new Menu({ items: (dataSource as any).dataBinding }, '#menu');

