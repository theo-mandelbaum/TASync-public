import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ColumnModel } from '@syncfusion/ej2-gantt';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource='data' allowSelection='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='150'/>
 *    <e-column field='taskName' headerText='Task Name' width='200'/>
 *   </e-columns>
 * </ejs-gantt>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<ColumnModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
