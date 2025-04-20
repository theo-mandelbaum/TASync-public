import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { DayWorkingTimeModel } from '@syncfusion/ej2-gantt';
export declare let DayWorkingTimeCollectionDirective: any;
export declare const DayWorkingTimeCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-day-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-day-working-time-collection>
 *     <e-day-working-time from='8' to='12'/>
 *     <e-day-working-time from='13' to='17'/>
 *   </e-day-working-time-collection>
 * </ejs-gantt>
 * ```
 */
export declare let DayWorkingTimeDirective: DefineVueDirective<DayWorkingTimeModel>;
export declare const DayWorkingTimePlugin: {
    name: string;
    install(Vue: any): void;
};
