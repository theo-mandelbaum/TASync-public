import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { Chart3DSeriesModel } from '@syncfusion/ej2-charts';
export declare let Chart3DSeriesCollectionDirective: any;
export declare const Chart3DSeriesCollectionPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d>
 * <e-chart3d-series-collection>
 * <e-chart3d-series></e-chart3d-series>
 * </e-chart3d-series-collection>
 * </ejs-chart3d>
 * ```
 */
export declare let Chart3DSeriesDirective: DefineVueDirective<Chart3DSeriesModel>;
export declare const Chart3DSeriesPlugin: {
    name: string;
    install(Vue: any): void;
};
