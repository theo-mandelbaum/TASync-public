import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AxisModel } from '@syncfusion/ej2-lineargauge';
/**
 * Represents the directive to render the axes in the Linear Gauge.
 * ```tsx
 * <LinearGaugeComponent>
 * <AxesDirective>
 * <AxisDirective></AxisDirective>
 * </AxesDirective>
 * </LinearGaugeComponent>
 * ```
 */
export declare class AxisDirective extends ComplexBase<AxisModel & {
    children?: React.ReactNode;
}, AxisModel> {
    static moduleName: string;
}
export declare class AxesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
