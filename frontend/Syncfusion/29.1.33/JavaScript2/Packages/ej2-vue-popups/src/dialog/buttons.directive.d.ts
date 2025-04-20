import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ButtonPropsModel } from '@syncfusion/ej2-popups';
export declare let ButtonsDirective: any;
export declare const ButtonsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-button' directive represent a button of Vue Dialog
 * It must be contained in a Dialog component(`ejs-dialog`).
 * ```html
 * <ejs-Dialog id='dialog' :showCloseIcon=true>
 *   <e-buttons>
 *    <e-dialogbutton :buttonModal='okButton'></e-dialogbutton>
 *    <e-dialogbutton :buttonModal='cancelButton'></e-dialogbutton>
 *   </e-buttons>
 * </ejs-Dialog>
 * ```
 */
export declare let DialogButtonDirective: DefineVueDirective<ButtonPropsModel>;
export declare const DialogButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
