import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ColorMappingSettingsModel } from '@syncfusion/ej2-maps';
export declare let ColorMappingsDirective: any;
export declare const ColorMappingsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the bubble color mapping in the maps.
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
export declare let ColorMappingDirective: DefineVueDirective<ColorMappingSettingsModel>;
export declare const ColorMappingPlugin: {
    name: string;
    install(Vue: any): void;
};
