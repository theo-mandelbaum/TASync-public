import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { PanelModel } from '@syncfusion/ej2-layouts';
export declare let PanelsDirective: any;
export declare const PanelsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-panels' directive represent a presets of VueJS dashboardlayout component
 * It must be contained in a dashboardlayout component(`ejs-dashboardlayout`).
 * ```html
 * <ejs-dashboardlayout>
 *   <e-panels>
 *   <e-panel></e-panel>
 *   <e-panel></e-panel>
 *   </e-panels>
 * </ejs-dashboardlayout>
 * ```
 */
export declare let PanelDirective: DefineVueDirective<PanelModel>;
export declare const PanelPlugin: {
    name: string;
    install(Vue: any): void;
};
