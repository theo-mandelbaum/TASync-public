import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ButtonModelPropsModel } from '@syncfusion/ej2-notifications';
export declare let ButtonModelPropsDirective: any;
export declare const ButtonModelPropsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-button' directive represent a button of Vue toast
 * It must be contained in a Toast component(`ejs-toast`).
 * ```html
 * <ejs-toast id='toast' :showCloseIcon=true>
 *   <e-buttons>
 *    <e-button :content='Ok' :isPrimary=true></e-button>
 *    <e-button :content='Cancel'></e-button>
 *   </e-buttons>
 * </ejs-toast>
 * ```
 */
export declare let ButtonModelPropDirective: DefineVueDirective<ButtonModelPropsModel>;
export declare const ButtonModelPropPlugin: {
    name: string;
    install(Vue: any): void;
};
