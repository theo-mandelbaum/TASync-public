import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ProgressAnnotationSettingsModel } from '@syncfusion/ej2-progressbar';
export interface ProgressAnnotationSettingsDirTypecast {
    content?: string | Function | any;
}
/**
 * `ProgressBarAnnotationsDirective` directive represent a annotation of the react progressbar.
 * ```tsx
 * <progressbarComponent>
 * <ProgressBarAnnotationsDirective>
 * <ProgressBarAnnotationDirective></ProgressBarAnnotationDirective>
 * </ProgressBarAnnotationsDirective>
 * </progressbarComponent>
 * ```
 */
export declare class ProgressBarAnnotationDirective extends ComplexBase<ProgressAnnotationSettingsModel | ProgressAnnotationSettingsDirTypecast & {
    children?: React.ReactNode;
}, ProgressAnnotationSettingsModel | ProgressAnnotationSettingsDirTypecast> {
    static moduleName: string;
}
export declare class ProgressBarAnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
