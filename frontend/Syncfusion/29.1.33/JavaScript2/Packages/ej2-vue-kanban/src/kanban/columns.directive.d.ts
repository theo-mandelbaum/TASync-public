import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ColumnsModel } from '@syncfusion/ej2-kanban';
export declare let ColumnsDirective: any;
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-columns` directive represent a columns of the VueJS Kanban board.
 * It must be contained in a Kanban component(`ejs-kanban`).
 * ```vue
 * <ejs-kanban>
 *   <e-columns>
 *    <e-column keyField='Open' textField='To Do'></e-column>
 *    <e-column keyField='Close' textField='Completed'></e-column>
 *   </e-columns>
 * </ejs-kanban>
 * ```
 */
export declare let ColumnDirective: DefineVueDirective<ColumnsModel>;
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
