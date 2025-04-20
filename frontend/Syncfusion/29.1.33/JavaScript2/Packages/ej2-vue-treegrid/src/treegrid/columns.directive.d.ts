import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { TreeGridColumnModel } from '@syncfusion/ej2-treegrid';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS TreeGrid.
 * It must be contained in a TreeGrid component(`ejs-treegrid`).
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='100'/>
 *    <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 * </ejs-treegrid>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<TreeGridColumnModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
