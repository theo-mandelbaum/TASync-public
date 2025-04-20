import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS MultiColumnComboBox.
 * It must be contained in a MultiColumnComboBox component(`ejs-multicolumncombobox`).
 * ```vue
 * <ejs-multicolumncombobox :dataSource='data'>
 *   <e-columns>
 *    <e-column field='ID' width='100'/>
 *    <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 * </ejs-multicolumncombobox>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<ColumnModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
