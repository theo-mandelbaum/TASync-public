import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
export declare let ItemsDirective: any;
export declare const ItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-item' directive represent a item of Vue Toolbar
 * It must be contained in a Toolbar component(`ejs-toolbar`).
 * ```html
 * <ejs-toolbar>
 *   <e-items>
 *    <e-item text='Cut'></e-item>
 *    <e-item text='Copy'></e-item>
 *   </e-items>
 * </ejs-toolbar>
 * ```
 */
export declare let ItemDirective: DefineVueDirective<ItemModel>;
export declare const ItemPlugin: {
    name: string;
    install(Vue: any): void;
};
