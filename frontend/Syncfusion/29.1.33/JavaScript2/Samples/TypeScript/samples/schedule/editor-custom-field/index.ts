import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
    Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs, EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule editor custom fields sample
 */


    
    let data: Object[] = <Object[]>extend([], (dataSource as any).eventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 1, 15),
        eventSettings: {
            dataSource: data
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'Editor') {
                // Create required custom elements in initial time
                if (!args.element.querySelector('.custom-field-row')) {
                    let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                    let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
                    formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
                    let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
                    let inputEle: HTMLInputElement = createElement('input', {
                        className: 'e-field', attrs: { name: 'EventType' }
                    }) as HTMLInputElement;
                    container.appendChild(inputEle);
                    row.appendChild(container);
                    let dropDownList: DropDownList = new DropDownList({
                        dataSource: [
                            { text: 'Public Event', value: 'public-event' },
                            { text: 'Maintenance', value: 'maintenance' },
                            { text: 'Commercial Event', value: 'commercial-event' },
                            { text: 'Family Event', value: 'family-event' }
                        ],
                        fields: { text: 'text', value: 'value' },
                        value: args.data.EventType as string,
                        floatLabelType: 'Always', placeholder: 'Event Type'
                    });
                    dropDownList.appendTo(inputEle);
                    inputEle.setAttribute('name', 'EventType');
                }
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

