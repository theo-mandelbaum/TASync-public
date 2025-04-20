/* eslint-disable */
import { Component } from '@angular/core';
@Component({
    selector: '<%=dasherize(selector)%>',
    templateUrl: '<%=dasherize(name)%>.component.html',
    styleUrls: ['<%=dasherize(name)%>.component.css']
})
export class <%= classify(name) %>Component {
    // initializing Axes
    public Axes: Object[] = [{
        majorTicks: {
            color: '#9E9E9E',
            interval: 10
        },
        minorTicks: {
            color: '#9E9E9E',
            interval: 2
        },
        pointers: [{
            value: 10,
            height: 0,
            width: 0,
        }],
        ranges: [{
            start: 0,
            end: 32,
            color: '#30B32D',
            startWidth: 15,
            endWidth: 15
        },
        {
            start: 32,
            end: 52,
            color: 'yellow',
            startWidth: 15,
            endWidth: 15
        },
    ]
    }];
    constructor() {
        // code
    };
}
