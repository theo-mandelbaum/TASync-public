/* eslint-disable */
import { Component, ViewEncapsulation } from '@angular/core';
import { MapsTheme, Maps, Legend, Marker, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { world_map } from './assets/world-map';

@Component({
    selector: '<%=dasherize(selector)%>',
    templateUrl: '<%=dasherize(name)%>.component.html',
    styleUrls: ['<%=dasherize(name)%>.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>Component {
    titleSettings: object = {
        text: 'World Map',
        textStyle: {
            size: '16px'
        }
    };
    public zoomSettings: object = {
        enable: true
    };
    public layers: object[] = [{
        shapeData: world_map
    }];
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    constructor() {
        //code
    };
}