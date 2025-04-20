import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AggregateRowModel } from '@syncfusion/ej2-treegrid';
export declare let AggregatesDirective: any;
export declare const AggregatesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-aggregate` directive represent a aggregate row of the VueJS TreeGrid.
 * It must be contained in a TreeGrid component(`ejs-treegrid`).
 * ```vue
 * <ejs-treegrid :dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'/>
 *     <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'/>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
export declare let AggregateDirective: DefineVueDirective<AggregateRowModel>;
export declare const AggregatePlugin: {
    name: string;
    install(Vue: any): void;
};
