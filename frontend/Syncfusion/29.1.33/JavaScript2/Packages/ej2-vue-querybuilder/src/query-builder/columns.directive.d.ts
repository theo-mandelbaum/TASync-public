import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ColumnsModel } from '@syncfusion/ej2-querybuilder';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS QueryBuilder.
 * It must be contained in a QueryBuilder component(`ejs-querybuilder`).
 * ```vue
 * <ejs-querybuilder :dataSource='data'>
 *   <e-columns>
 *    <e-column field='ID' label='ID' type='number'/>
 *    <e-column field='Date' label='Date' type='date' format='dd/MM/yyyy'/>
 *   </e-columns>
 * </ejs-querybuilder>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<ColumnsModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
