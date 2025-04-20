import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { StackedHeadersModel } from '@syncfusion/ej2-kanban';
export declare let StackedHeadersDirective: any;
export declare const StackedHeadersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-stackedHeaders` directive represent a stacked header of the VueJS Kanban board.
 * It must be contained in a Kanban component(`ejs-kanban`).
 * ```vue
 * <ejs-kanban>
 *   <e-stackedHeaders>
 *    <e-stackedHeader keyField='Open' text='To Do'></e-stackedHeader>
 *    <e-stackedHeader keyField='Close' text='Completed'></e-stackedHeader>
 *   </e-stackedHeaders>
 * </ejs-kanban>
 * ```
 */
export declare let StackedHeaderDirective: DefineVueDirective<StackedHeadersModel>;
export declare const StackedHeaderPlugin: {
    name: string;
    install(Vue: any): void;
};
