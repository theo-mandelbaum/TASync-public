import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['accessibility', 'animation', 'backwardForecast', 'dashArray', 'enableTooltip', 'fill', 'forwardForecast', 'intercept', 'legendShape', 'marker', 'name', 'period', 'polynomialOrder', 'type', 'visible', 'width'];
let outputs = [];
/**
 * Series Directive
 * ```html
 * <e-stockchart-series-collection>
 * <e-stockchart-series>
 * <e-trendlines>
 * </e-trendline>
 * <e-trendline>
 * </e-trendlines>
 * </e-stockchart-series>
 * </e-stockchart-series-collection>
 * ```
 */
export class StockChartTrendlineDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
StockChartTrendlineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartTrendlineDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StockChartTrendlineDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StockChartTrendlineDirective, selector: "e-stockchart-series>e-trendlines>e-trendline", inputs: { accessibility: "accessibility", animation: "animation", backwardForecast: "backwardForecast", dashArray: "dashArray", enableTooltip: "enableTooltip", fill: "fill", forwardForecast: "forwardForecast", intercept: "intercept", legendShape: "legendShape", marker: "marker", name: "name", period: "period", polynomialOrder: "polynomialOrder", type: "type", visible: "visible", width: "width" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartTrendlineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-stockchart-series>e-trendlines>e-trendline',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * StockChartTrendline Array Directive
 * @private
 */
export class StockChartTrendlinesDirective extends ArrayBase {
    constructor() {
        super('trendlines');
    }
}
StockChartTrendlinesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartTrendlinesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StockChartTrendlinesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StockChartTrendlinesDirective, selector: "e-stockchart-series>e-trendlines", queries: [{ propertyName: "children", predicate: StockChartTrendlineDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StockChartTrendlinesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-stockchart-series>e-trendlines',
                    queries: {
                        children: new ContentChildren(StockChartTrendlineDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlbmRsaW5lcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvY2stY2hhcnQvdHJlbmRsaW5lcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pPLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsV0FBeUM7SUE0RnZGLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7eUhBakdRLDRCQUE0Qjs2R0FBNUIsNEJBQTRCOzJGQUE1Qiw0QkFBNEI7a0JBUnhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDhDQUE4QztvQkFDeEQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQXFHRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsU0FBd0M7SUFDdkY7UUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7MEhBSFEsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsaUdBSEosNEJBQTRCOzJGQUdyRCw2QkFBNkI7a0JBTnpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQztxQkFDOUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2FjY2Vzc2liaWxpdHknLCAnYW5pbWF0aW9uJywgJ2JhY2t3YXJkRm9yZWNhc3QnLCAnZGFzaEFycmF5JywgJ2VuYWJsZVRvb2x0aXAnLCAnZmlsbCcsICdmb3J3YXJkRm9yZWNhc3QnLCAnaW50ZXJjZXB0JywgJ2xlZ2VuZFNoYXBlJywgJ21hcmtlcicsICduYW1lJywgJ3BlcmlvZCcsICdwb2x5bm9taWFsT3JkZXInLCAndHlwZScsICd2aXNpYmxlJywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogU2VyaWVzIERpcmVjdGl2ZVxuICogYGBgaHRtbFxuICogPGUtc3RvY2tjaGFydC1zZXJpZXMtY29sbGVjdGlvbj5cbiAqIDxlLXN0b2NrY2hhcnQtc2VyaWVzPlxuICogPGUtdHJlbmRsaW5lcz5cbiAqIDwvZS10cmVuZGxpbmU+XG4gKiA8ZS10cmVuZGxpbmU+XG4gKiA8L2UtdHJlbmRsaW5lcz5cbiAqIDwvZS1zdG9ja2NoYXJ0LXNlcmllcz5cbiAqIDwvZS1zdG9ja2NoYXJ0LXNlcmllcy1jb2xsZWN0aW9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1zdG9ja2NoYXJ0LXNlcmllcz5lLXRyZW5kbGluZXM+ZS10cmVuZGxpbmUnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTdG9ja0NoYXJ0VHJlbmRsaW5lRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8U3RvY2tDaGFydFRyZW5kbGluZURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHR5cGUgb2YgdHJlbmRsaW5lIHVzZWQgaW4gdGhlIHNlcmllcy4gXG4gICAgICogQXZhaWxhYmxlIHR5cGVzIGFyZTogXG4gICAgICogKiBMaW5lYXIgLSBBIHN0cmFpZ2h0IGxpbmUgdGhhdCBzaG93cyB0aGUgZ2VuZXJhbCBkaXJlY3Rpb24gb2YgZGF0YS4gXG4gICAgICogKiBFeHBvbmVudGlhbCAtIEEgY3VydmUgdGhhdCBmaXRzIGRhdGEgd2l0aCBleHBvbmVudGlhbCBncm93dGggb3IgZGVjYXkuIFxuICAgICAqICogUG9seW5vbWlhbCAtIEEgY3VydmUgdGhhdCBmaXRzIGRhdGEgd2l0aCBhIHBvbHlub21pYWwgZnVuY3Rpb24uIFxuICAgICAqICogUG93ZXIgLSBBIGN1cnZlIHRoYXQgcmVwcmVzZW50cyBkYXRhIHdpdGggYSBwb3dlciBmdW5jdGlvbi4gXG4gICAgICogKiBMb2dhcml0aG1pYyAtIEEgY3VydmUgdGhhdCBmaXRzIGRhdGEgd2l0aCBhIGxvZ2FyaXRobWljIHNjYWxlLiBcbiAgICAgKiAqIE1vdmluZ0F2ZXJhZ2UgLSBBIHRyZW5kbGluZSB0aGF0IHNtb290aGVucyBkYXRhIHVzaW5nIGEgbW92aW5nIGF2ZXJhZ2UgY2FsY3VsYXRpb24uXG4gICAgICogQGRlZmF1bHQgJ0xpbmVhcidcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIHRvIGltcHJvdmUgYWNjZXNzaWJpbGl0eSBmb3IgY2hhcnQgdHJlbmRsaW5lIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhY2Nlc3NpYmlsaXR5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIE9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBhbmltYXRpb24gZm9yIHRyZW5kbGluZXMuXG4gICAgICovXG4gICAgcHVibGljIGFuaW1hdGlvbjogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBwZXJpb2QgYnkgd2hpY2ggdGhlIHRyZW5kIGlzIHRvIGJlIGJhY2t3YXJkIGZvcmVjYXN0ZWQuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBiYWNrd2FyZEZvcmVjYXN0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIENvbmZpZ3VyZXMgdGhlIHBhdHRlcm4gb2YgZGFzaGVzIGFuZCBnYXBzIGluIHRoZSB0cmVuZGxpbmUgc3Ryb2tlIHVzaW5nIHRoZSBgZGFzaEFycmF5YCBwcm9wZXJ0eS5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBkYXNoQXJyYXk6IGFueTtcbiAgICAvKiogXG4gICAgICogRW5hYmxlcyBvciBkaXNhYmxlcyB0aGUgdG9vbHRpcCBmb3IgdGhlIHRyZW5kbGluZSB1c2luZyB0aGUgYGVuYWJsZVRvb2x0aXBgIHByb3BlcnR5LiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZVRvb2x0aXA6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGZpbGwgY29sb3IgZm9yIHRoZSB0cmVuZGxpbmUsIHdoaWNoIGFjY2VwdHMgdmFsdWVzIGluIGhleCBvciByZ2JhIGFzIHZhbGlkIENTUyBjb2xvciBzdHJpbmdzLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGZpbGw6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgcGVyaW9kIGJ5IHdoaWNoIHRoZSB0cmVuZCBtdXN0IGJlIGZvcndhcmQgZm9yZWNhc3RlZC5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcHVibGljIGZvcndhcmRGb3JlY2FzdDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGludGVyY2VwdCB2YWx1ZSBvZiB0aGUgdHJlbmRsaW5lLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyBpbnRlcmNlcHQ6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGBsZWdlbmRTaGFwZWAgcHJvcGVydHkgZGVmaW5lcyB0aGUgc2hhcGUgdXNlZCB0byByZXByZXNlbnQgdGhlIHRyZW5kbGluZSBpbiB0aGUgY2hhcnQgbGVnZW5kLlxuICAgICAqIEBkZWZhdWx0ICdTZXJpZXNUeXBlJ1xuICAgICAqL1xuICAgIHB1YmxpYyBsZWdlbmRTaGFwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIGZvciBjdXN0b21pemluZyB0aGUgbWFya2VycyBmb3IgdHJlbmRsaW5lcywgaW5jbHVkaW5nIHNoYXBlLCBzaXplLCBjb2xvciwgYW5kIG90aGVyIHZpc3VhbCBhc3BlY3RzLlxuICAgICAqIEBkZXByZWNhdGVkIFxuICAgICAqL1xuICAgIHB1YmxpYyBtYXJrZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGBuYW1lYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGFzc2lnbiBhIGRlc2NyaXB0aXZlIG5hbWUgdG8gdGhlIHRyZW5kbGluZSwgd2hpY2ggd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGNoYXJ0IGFzIGEgbGVnZW5kLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIG5hbWU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgcGVyaW9kLCB0aGUgcHJpY2UgY2hhbmdlcyBvdmVyIHdoaWNoIHdpbGwgYmUgY29uc2lkZXJlZCB0byBwcmVkaWN0IHRoZSBtb3ZpbmcgYXZlcmFnZSB0cmVuZGxpbmUuXG4gICAgICogQGRlZmF1bHQgMlxuICAgICAqL1xuICAgIHB1YmxpYyBwZXJpb2Q6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgcG9seW5vbWlhbCBvcmRlciBvZiB0aGUgcG9seW5vbWlhbCB0cmVuZGxpbmUuXG4gICAgICogQGRlZmF1bHQgMlxuICAgICAqL1xuICAgIHB1YmxpYyBwb2x5bm9taWFsT3JkZXI6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIGB2aXNpYmxlYCBwcm9wZXJ0eSBjb250cm9scyB0aGUgZGlzcGxheSBvZiB0aGUgdHJlbmRsaW5lLiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHRyZW5kbGluZSB3aWxsIGJlIHJlbmRlcmVkIG9uIHRoZSBjaGFydC4gSWYgc2V0IHRvIGZhbHNlLCB0aGUgdHJlbmRsaW5lIHdpbGwgYmUgaGlkZGVuLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlzaWJsZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB0aGUgdHJlbmRsaW5lLlxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBwdWJsaWMgd2lkdGg6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFN0b2NrQ2hhcnRUcmVuZGxpbmUgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utc3RvY2tjaGFydC1zZXJpZXM+ZS10cmVuZGxpbmVzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFN0b2NrQ2hhcnRUcmVuZGxpbmVEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU3RvY2tDaGFydFRyZW5kbGluZXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8U3RvY2tDaGFydFRyZW5kbGluZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3RyZW5kbGluZXMnKTtcbiAgICB9XG59Il19