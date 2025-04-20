import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { LayerSettingsModel } from '@syncfusion/ej2-maps';
export declare let LayersDirective: any;
export declare const LayersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the layer of the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export declare let LayerDirective: DefineVueDirective<LayerSettingsModel>;
export declare const LayerPlugin: {
    name: string;
    install(Vue: any): void;
};
