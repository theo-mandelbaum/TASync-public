import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { NavigationLineSettingsModel } from '@syncfusion/ej2-maps';
export declare let NavigationLinesDirective: any;
export declare const NavigationLinesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export declare let NavigationLineDirective: DefineVueDirective<NavigationLineSettingsModel>;
export declare const NavigationLinePlugin: {
    name: string;
    install(Vue: any): void;
};
