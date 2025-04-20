import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { ChipList } from '@syncfusion/ej2-buttons';
import * as data from './data.json';
/**
 * Default Chip sample
 */


    
    let chipsData: any = data;
    // initialize default chip
    new ChipList({ chips: chipsData.defaultData }, '#chip-default');

    // initialize avatar chip
    new ChipList({ chips: chipsData.avatarData, enableDelete: true }, '#chip-avatar');

    // initialize filter chip
    new ChipList({ chips: chipsData.filterData, selection: 'Multiple', selectedChips: [1, 3] }, '#chip-filter');

    // initialize choice chip
    new ChipList(
        {
            chips: chipsData.choiceData, selection: 'Single', cssClass: 'e-outline',
            selectedChips: [1]
        },
        '#chip-choice');

