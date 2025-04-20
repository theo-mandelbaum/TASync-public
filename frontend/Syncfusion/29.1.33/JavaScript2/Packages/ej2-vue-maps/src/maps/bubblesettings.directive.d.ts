import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { BubbleSettingsModel } from '@syncfusion/ej2-maps';
export declare let BubblesDirective: any;
export declare const BubblesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the bubbles in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export declare let BubbleDirective: DefineVueDirective<BubbleSettingsModel>;
export declare const BubblePlugin: {
    name: string;
    install(Vue: any): void;
};
