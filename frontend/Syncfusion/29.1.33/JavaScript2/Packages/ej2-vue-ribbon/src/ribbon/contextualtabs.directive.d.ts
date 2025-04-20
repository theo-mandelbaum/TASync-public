import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { RibbonContextualTabSettingsModel } from '@syncfusion/ej2-ribbon';
export declare let RibbonContextualTabsDirective: any;
export declare const RibbonContextualTabsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the VueJS Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```vue
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
export declare let RibbonContextualTabDirective: DefineVueDirective<RibbonContextualTabSettingsModel>;
export declare const RibbonContextualTabPlugin: {
    name: string;
    install(Vue: any): void;
};
