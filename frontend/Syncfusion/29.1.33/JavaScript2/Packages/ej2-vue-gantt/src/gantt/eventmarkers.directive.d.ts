import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { EventMarkerModel } from '@syncfusion/ej2-gantt';
export declare let EventMarkersDirective: any;
export declare const EventMarkersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-event-markers` directive represent a event marker collection in Gantt
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'/>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export declare let EventMarkerDirective: DefineVueDirective<EventMarkerModel>;
export declare const EventMarkerPlugin: {
    name: string;
    install(Vue: any): void;
};
