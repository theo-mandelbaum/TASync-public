import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { SpeedDialItemModel } from '@syncfusion/ej2-buttons';
export declare let SpeedDialItemsDirective: any;
export declare const SpeedDialItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-speeddialitem' directive represent a item of Vue SpeedDial
 * It must be contained in a SpeedDial component(`ejs-speeddial`).
 * ```html
 * <ejs-speeddial>
 *   <e-speeddialitems>
 *    <e-speeddialitem text='Cut'></e-speeddialitem>
 *    <e-speeddialitem text='Copy'></e-speeddialitem>
 *   </e-speeddialitems>
 * </ejs-speeddial>
 * ```
 */
export declare let SpeedDialItemDirective: DefineVueDirective<SpeedDialItemModel>;
export declare const SpeedDialItemPlugin: {
    name: string;
    install(Vue: any): void;
};
