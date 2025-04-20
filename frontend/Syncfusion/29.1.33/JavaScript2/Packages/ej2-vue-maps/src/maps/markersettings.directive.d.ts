import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { MarkerSettingsModel } from '@syncfusion/ej2-maps';
export declare let MarkersDirective: any;
export declare const MarkersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the markers in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-markerSettings>
 * <e-markerSetting>
 * </e-markerSetting>
 * </e-markerSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export declare let MarkerDirective: DefineVueDirective<MarkerSettingsModel>;
export declare const MarkerPlugin: {
    name: string;
    install(Vue: any): void;
};
