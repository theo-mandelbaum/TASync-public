import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AggregateColumnModel } from '@syncfusion/ej2-grids';
export declare let AggregateColumnsDirective: any;
export declare const AggregateColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the VueJS Grid.
 * ```vue
 * <ejs-grid :dataSource='data' allowPaging='true' allowSorting='true'>
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
 * </ejs-grid>
 * ```
 */
export declare let AggregateColumnDirective: DefineVueDirective<AggregateColumnModel>;
export declare const AggregateColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
