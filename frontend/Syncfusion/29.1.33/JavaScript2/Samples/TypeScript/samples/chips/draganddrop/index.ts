import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { ChipList } from '@syncfusion/ej2-buttons';
/**
 * Drag and drop Chip sample
 */


    
    let choiceContainer = new ChipList({
        chips: [
            { text: 'Extra cheese', cssClass: 'e-info' },
            { text: 'Spicy Level: Medium', cssClass: 'e-danger' },
            { text: 'Spicy Level: Low', cssClass: 'e-success' },
            { text: 'Fast Delivery', cssClass: 'e-warning' },
            { text: 'Gift Wrapping', cssClass: 'e-primary' },
            { text: 'Eco-Friendly Packaging', cssClass: 'e-success' }
        ],
        allowDragAndDrop: true,
    }, '#choice-container');

    let selectionContainer = new ChipList({
        chips: [],
        allowDragAndDrop: true,
    }, '#selection-container');

