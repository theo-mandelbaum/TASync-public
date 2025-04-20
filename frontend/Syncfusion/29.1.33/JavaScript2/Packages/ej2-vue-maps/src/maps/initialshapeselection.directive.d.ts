import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { InitialShapeSelectionSettingsModel } from '@syncfusion/ej2-maps';
export declare let InitialShapeSelectionsDirective: any;
export declare const InitialShapeSelectionsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-initialShapeSelections>
 * <e-initialShapeSelection>
 * </e-initialShapeSelection>
 * </e-initialShapeSelections>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export declare let InitialShapeSelectionDirective: DefineVueDirective<InitialShapeSelectionSettingsModel>;
export declare const InitialShapeSelectionPlugin: {
    name: string;
    install(Vue: any): void;
};
