import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeModel } from '@syncfusion/ej2-circulargauge';
/**
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <RangesDirective>
 * <RangeDirective></RangeDirective>
 * </RangesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
export declare class RangeDirective extends ComplexBase<RangeModel & {
    children?: React.ReactNode;
}, RangeModel> {
    static moduleName: string;
}
export declare class RangesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
