/* eslint-disable */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeMap, TreeMapTooltip, TreeMapLegend, LegendMode } from '@syncfusion/ej2-angular-treemap';
import { electionData } from './assets/election-data';
import { ILoadEventArgs, TreeMapTheme } from '@syncfusion/ej2-angular-treemap';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);

@Component({
    selector: '<%=dasherize(selector)%>',
    templateUrl: '<%=dasherize(name)%>.component.html',
    styleUrls: ['<%=dasherize(name)%>.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>Component {
    @ViewChild('treemap')
    public treemap: TreeMap;
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
        titleSettings: object = {
            text: 'US Presidential election result - 2016',
            textStyle: { size: '15px' }
        };
        dataSource: object[] = electionData;
        weightValuePath: string = 'Population';
        tooltipSettings: object = {
            visible: true,
            format: ' <b>${Winner}<b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
        };
        legendSettings: object = {
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            height: '10',
            mode:'Interactive',
        };
        equalColorValuePath: string = 'Winner';
        leafItemSettings: object = {
            labelPath: 'State',
            fill: '#6699cc',
            border: { color: 'white', width: 0.5 },
            colorMapping: [
                {
                    value: 'Trump', color: '#D84444'
                },
                {
                    value: 'Clinton', color: '#316DB5'
                }
            ]
        };
        
        constructor() {
            //code
          }
};