import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AxisModel } from '@syncfusion/ej2-circulargauge';
/**
 * Represents the directive to render the axes in the Circular Gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective></AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
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
