import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { PanePropertiesModel } from '@syncfusion/ej2-layouts';
export declare let PanesDirective: any;
export declare const PanesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-pane' directive represent a pane of Vue Splitter
 * It must be contained in a Splitter component(`ejs-splitter`).
 * ```html
 * <ejs-splitter id='splitter'>
 *   <e-panes>
 *    <e-pane size='150px'></e-pane>
 *    <e-pane size='150px'></e-pane>
 *   </e-panes>
 * </ejs-splitter>
 * ```
 */
export declare let PaneDirective: DefineVueDirective<PanePropertiesModel>;
export declare const PanePlugin: {
    name: string;
    install(Vue: any): void;
};
