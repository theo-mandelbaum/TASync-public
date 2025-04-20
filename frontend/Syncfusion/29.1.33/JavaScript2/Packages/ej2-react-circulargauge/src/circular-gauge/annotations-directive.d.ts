import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AnnotationModel } from '@syncfusion/ej2-circulargauge';
export interface AnnotationDirTypecast {
    content?: string | Function | any;
}
/**
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationModel | AnnotationDirTypecast & {
    children?: React.ReactNode;
}, AnnotationModel | AnnotationDirTypecast> {
    static moduleName: string;
}
export declare class AnnotationsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
