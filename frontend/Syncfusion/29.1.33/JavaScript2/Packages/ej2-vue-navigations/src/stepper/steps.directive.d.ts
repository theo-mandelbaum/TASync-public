import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { StepModel } from '@syncfusion/ej2-navigations';
export declare let StepsDirective: any;
export declare const StepsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-step' directive represents a step of the Vue Stepper
 * It must be contained in a Stepper component(`ejs-stepper`).
 * ```html
 * <ejs-stepper>
 *  <e-steps>
 *   <e-step :iconCss='e-icons e-folder' :text='Step 1' />
 *   <e-step :iconCss='e-icons e-folder' :text='Step 2' />
 *  </e-steps>
 * </ejs-stepper>
 * ```
 */
export declare let StepDirective: DefineVueDirective<StepModel>;
export declare const StepPlugin: {
    name: string;
    install(Vue: any): void;
};
