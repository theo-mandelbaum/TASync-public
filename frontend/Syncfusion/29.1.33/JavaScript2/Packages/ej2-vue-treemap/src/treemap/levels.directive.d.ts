import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { LevelSettingsModel } from '@syncfusion/ej2-treemap';
export declare let LevelsDirective: any;
export declare const LevelsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to configure and render level leaf items in the treemap.
 * ```vue
 * <ejs-treemap>
 * <e-levels>
 * <e-level></e-level>
 * </e-levels>
 * </ejs-treemap>
 * ```
 */
export declare let LevelDirective: DefineVueDirective<LevelSettingsModel>;
export declare const LevelPlugin: {
    name: string;
    install(Vue: any): void;
};
