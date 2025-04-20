import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { GridColumnModel } from '@syncfusion/ej2-grids';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS Grid.
 * It must be contained in a Grid component(`ejs-grid`).
 * ```vue
 * <ejs-grid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='100'/>
 *    <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 * </ejs-grid>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<GridColumnModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
