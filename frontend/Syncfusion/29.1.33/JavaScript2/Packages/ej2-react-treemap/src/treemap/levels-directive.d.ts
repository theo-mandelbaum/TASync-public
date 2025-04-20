import { ComplexBase } from '@syncfusion/ej2-react-base';
import { LevelSettingsModel } from '@syncfusion/ej2-treemap';
export interface LevelSettingsDirTypecast {
    headerTemplate?: string | Function | any;
}
/**
 * Represents the directive to configure and render level leaf items in the treemap.
 * ```tsx
 * <TreeMapComponent>
 * <LevelsDirective>
 * <LevelDirective></LevelDirective>
 * </LevelsDirective>
 * </TreeMapComponent>
 * ```
 */
export declare class LevelDirective extends ComplexBase<LevelSettingsModel | LevelSettingsDirTypecast & {
    children?: React.ReactNode;
}, LevelSettingsModel | LevelSettingsDirTypecast> {
    static moduleName: string;
}
export declare class LevelsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
