import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Toolbar sample to demonstrate keyboard interactions.
 */
import { Toolbar } from '@syncfusion/ej2-navigations';


    
    //Initialize Toolbar component
    let toolbarObj: Toolbar = new Toolbar({
        overflowMode: 'Popup',
        items: [
            {
                prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut', text: 'Cut', showTextOn: 'Overflow', overflow: 'Show' },
            {
                prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy', text: 'Copy', showTextOn: 'Overflow', overflow: 'Show'},
            {
                prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste', text: 'Paste', showTextOn: 'Overflow', overflow: 'Show'},
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold', text: 'Bold', showTextOn: 'Overflow', overflow: 'Show' },
            {
                prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline', text: 'Underline', showTextOn: 'Overflow',
                 overflow: 'Show' },
            {
                prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic', text: 'Italic', showTextOn: 'Overflow', overflow: 'Show'},
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-bullets-icon tb-icons', text: 'Bullets', tooltipText: 'Bullets', overflow: 'Show'},
            {
                prefixIcon: 'e-numbering-icon tb-icons', text: 'Numbering', tooltipText: 'Numbering', overflow: 'Show'},
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-tbar-undo-icon tb-icons', tooltipText: 'Undo', text: 'Undo' },
            {
                prefixIcon: 'e-tbar-redo-icon tb-icons', tooltipText: 'Redo', text: 'Redo' },
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align-Left', showTextOn : 'Overflow',
                overflow: 'Show', text: 'Left' },
            {
                prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align-Right',
                showTextOn : 'Overflow', overflow: 'Show', text: 'Right' },
            {
                prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align-Center',
                showTextOn : 'Overflow', overflow: 'Show', text: 'Center' },
            {
                prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align-Justify',
                showTextOn : 'Overflow', overflow: 'Show', text: 'Justify' },
            {
                type: 'Separator' },
            {
                prefixIcon: 'e-radar-icon tb-icons', text: 'Radar', tooltipText: 'Radar Chart' , showTextOn : 'Overflow' },
            {
                prefixIcon: 'e-line-icon tb-icons', text: 'Line', tooltipText: 'Line Chart' , showTextOn : 'Overflow' },
            {
                prefixIcon: 'e-doughnut-icon tb-icons', text: 'Doughnut', tooltipText: 'Doughnut Chart' , showTextOn : 'Overflow' },
            {
                prefixIcon: 'e-bubble-icon tb-icons', text: 'Bubble', tooltipText: 'Bubble Chart' , showTextOn : 'Overflow' },
            {
                prefixIcon: 'e-table-icon tb-icons', text: 'Table', tooltipText: 'Table' , showTextOn : 'Overflow' },
            {
                prefixIcon: 'e-picture-icon tb-icons', text: 'Picture', tooltipText: 'Picture' , showTextOn : 'Overflow' },
            {
                text: 'Design', prefixIcon: 'e-design-icon tb-icons' , tooltipText: 'Design' , showTextOn : 'Overflow'
        }],
    });
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar_keyboard_interaction');
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        let toolbarElement: HTMLElement = document.querySelector('#toolbar_keyboard_interaction .e-toolbar-items .e-toolbar-item .e-tbar-btn') as HTMLElement;
        if (e.altKey && e.keyCode === 74 && toolbarElement) {
            toolbarElement.focus();
        }
    });
