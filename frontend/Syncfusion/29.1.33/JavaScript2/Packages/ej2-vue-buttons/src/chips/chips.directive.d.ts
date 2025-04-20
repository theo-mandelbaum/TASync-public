import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ChipModel } from '@syncfusion/ej2-buttons';
export declare let ChipsDirective: any;
export declare const ChipsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-chip` directive represent a chip of the Vue ChipList.
 * ```html
 * <ejs-chiplist >
 *   <e-chips>
 *    <e-chip text='chip1'></e-chip>
 *    <e-chip text='chip2'></e-chip>
 *   </e-chips>
 * </ejs-chiplist>
 * ```
 */
export declare let ChipDirective: DefineVueDirective<ChipModel>;
export declare const ChipPlugin: {
    name: string;
    install(Vue: any): void;
};
