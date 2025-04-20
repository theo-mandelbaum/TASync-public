import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Schedule, Month, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { generateResourceData } from './helper';

/**
 * schedule timeline views virtual scrolling sample
 */

Schedule.Inject(Month, TimelineMonth, Resize, DragAndDrop);

    
    let date: Date = new Date(new Date().getFullYear(), 4, 1);
    let ownerData: Record<string, any>[] = generateResourceData(1, 300, 'Resource');
    let eventData: Record<string, any>[] = generateStaticEvents(new Date(date), 300, 12);
    let scheduleObj: Schedule = new Schedule({
        height: '650px', width: '100%', currentView: 'TimelineMonth', cssClass: 'virtual-scroll',
        views: [
            { option: 'TimelineMonth', eventTemplate: '#timeline-event-template', allowVirtualScrolling: true },
            { option: 'Month', eventTemplate: '#timeline-event-template', allowVirtualScrolling: true }
        ],
        group: {
            byGroupID: false,
            resources: ['Owners']
        },
        resources: [
            {
                field: 'OwnerId', title: 'Owner',
                name: 'Owners', allowMultiple: true,
                dataSource: ownerData,
                textField: 'Text', idField: 'Id', colorField: 'Color'
            }
        ],
        selectedDate: new Date(date),
        eventSettings: { dataSource: eventData }
    });

    scheduleObj.appendTo('#Schedule');


    function generateStaticEvents(start: Date, resCount: number, overlapCount: number): Record<string, any>[] {
        let data: Record<string, any>[] = [];
        let id: number = 1;
        for (let i: number = 0; i < resCount; i++) {
            let randomCollection: number[] = [];
            let random: number = 0;
            for (let j: number = 0; j < overlapCount; j++) {
                random = Math.floor(Math.random() * (30));
                random = (random === 0) ? 1 : random;
                if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
                    randomCollection.indexOf(random - 2) !== -1) {
                    random += (Math.max.apply(null, randomCollection) + 10);
                }
                for (let k: number = 1; k <= 2; k++) {
                    randomCollection.push(random + k);
                }
                let startDate: Date = new Date(start.getFullYear(), start.getMonth(), random);
                startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
                let endDate: Date = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
                data.push({
                    Id: id,
                    Subject: 'Event #' + id,
                    StartTime: startDate,
                    EndTime: endDate,
                    IsAllDay: (id % 10) ? false : true,
                    OwnerId: i + 1
                });
                id++;
            }
        }
        return data;
    }

