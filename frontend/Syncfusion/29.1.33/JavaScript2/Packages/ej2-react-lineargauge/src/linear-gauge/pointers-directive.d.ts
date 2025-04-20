import { ComplexBase } from '@syncfusion/ej2-react-base';
import { PointerModel } from '@syncfusion/ej2-lineargauge';
/**
 * Represents the directive to render and customize the pointers in an axis of linear gauge.
 * ```tsx
 * <LinearGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <PointersDirective>
 * <PointerDirective></PointerDirective>
 * </PointersDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </LinearGaugeComponent>
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
