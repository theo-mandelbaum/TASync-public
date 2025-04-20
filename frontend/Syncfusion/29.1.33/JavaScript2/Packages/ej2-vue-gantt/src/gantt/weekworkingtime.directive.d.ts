import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { WeekWorkingTimeModel } from '@syncfusion/ej2-gantt';
export declare let WeekWorkingTimesDirective: any;
export declare const WeekWorkingTimesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-week-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-week-working-time-collection>
 *     <e-week-working-time dayOfWeek='Monday' from='8' to='12'/>
 *     <e-week-working-time dayOfWeek='Monday' from='13' to='17'/>
 *   </e-week-working-time-collection>
 * </ejs-gantt>
 * ```
 */
export declare let WeekWorkingTimeDirective: DefineVueDirective<WeekWorkingTimeModel>;
export declare const WeekWorkingTimePlugin: {
    name: string;
    install(Vue: any): void;
};
