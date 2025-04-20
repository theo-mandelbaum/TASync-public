import { ComplexBase } from '@syncfusion/ej2-react-base';
import { PointerModel } from '@syncfusion/ej2-circulargauge';
/**
 * Represents the directive to render and customize the pointers in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <PointersDirective>
 * <PointerDirective></PointerDirective>
 * </PointersDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
export declare class PointerDirective extends ComplexBase<PointerModel & {
    children?: React.ReactNode;
}, PointerModel> {
    static moduleName: string;
}
export declare class PointersDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
