import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeModel } from '@syncfusion/ej2-lineargauge';
/**
 * Represents the directive to render and customize the ranges in an axis of linear gauge.
 * ```tsx
 * <LinearGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <RangesDirective>
 * <RangeDirective></RangeDirective>
 * </RangesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </LinearGaugeComponent>
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
