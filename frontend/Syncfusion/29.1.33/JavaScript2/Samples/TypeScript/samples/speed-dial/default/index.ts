import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { SpeedDial,SpeedDialItemModel } from '@syncfusion/ej2-buttons';


    

    let items:SpeedDialItemModel[] = [
        {
            title:'Home',
            iconCss:'e-icons e-home'
        },
        {
            title:'People',
            iconCss:'e-icons e-people'
        },
        {
            title:'Search',
            iconCss:'e-icons e-search'
        },
        {
            title:'Message',
            iconCss:'e-icons e-comment-show'
        }
    ]

    let speedDial:SpeedDial = new SpeedDial(
        {
        openIconCss:'e-icons e-justify',
        closeIconCss:'e-icons e-close',
        items:items,
        target: '#target',
        position:'BottomCenter',
        });
    speedDial.appendTo('#btn1');

