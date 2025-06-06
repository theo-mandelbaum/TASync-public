import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { HolidayModel } from '@syncfusion/ej2-gantt';
export declare let HolidaysDirective: any;
export declare const HolidaysPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'/>
 *     <e-holiday from='05/15/2018' label='Holiday 2'/>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export declare let HolidayDirective: DefineVueDirective<HolidayModel>;
export declare const HolidayPlugin: {
    name: string;
    install(Vue: any): void;
};
