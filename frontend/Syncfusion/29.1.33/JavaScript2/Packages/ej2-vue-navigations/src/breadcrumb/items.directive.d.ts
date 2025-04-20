import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { BreadcrumbItemModel } from '@syncfusion/ej2-navigations';
export declare let BreadcrumbItemsDirective: any;
export declare const BreadcrumbItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-breadcrumb-item` directive represent a item of the Vue Breadcrumb.
 * It must be contained in a Breadcrumb component(`ejs-breadcrumb`).
 * ```html
 * <ejs-breadcrumb>
 *   <e-breadcrumb-items>
 *    <e-breadcrumb-item text='Home' url='/'></e-breadcrumb-item>
 *    <e-breadcrumb-item text='Index' url='./index'></e-breadcrumb-item>
 *   </e-breadcrumb-items>
 * </ejs-breadcrumb>
 * ```
 */
export declare let BreadcrumbItemDirective: DefineVueDirective<BreadcrumbItemModel>;
export declare const BreadcrumbItemPlugin: {
    name: string;
    install(Vue: any): void;
};
