import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['accessibility', 'animation', 'backwardForecast', 'dashArray', 'enableTooltip', 'fill', 'forwardForecast', 'intercept', 'legendShape', 'marker', 'name', 'period', 'polynomialOrder', 'type', 'visible', 'width'];
let outputs = [];
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series>
 * <e-trendlines>
 * <e-trendline>
 * </e-trendline>
 * </e-trendlines>
 * </e-series-collection>
 * ```
 */
export class TrendlineDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
TrendlineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TrendlineDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TrendlineDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TrendlineDirective, selector: "e-series>e-trendlines>e-trendline", inputs: { accessibility: "accessibility", animation: "animation", backwardForecast: "backwardForecast", dashArray: "dashArray", enableTooltip: "enableTooltip", fill: "fill", forwardForecast: "forwardForecast", intercept: "intercept", legendShape: "legendShape", marker: "marker", name: "name", period: "period", polynomialOrder: "polynomialOrder", type: "type", visible: "visible", width: "width" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TrendlineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-series>e-trendlines>e-trendline',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Trendline Array Directive
 * @private
 */
export class TrendlinesDirective extends ArrayBase {
    constructor() {
        super('trendlines');
    }
}
TrendlinesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TrendlinesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
TrendlinesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TrendlinesDirective, selector: "e-series>e-trendlines", queries: [{ propertyName: "children", predicate: TrendlineDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TrendlinesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-series>e-trendlines',
                    queries: {
                        children: new ContentChildren(TrendlineDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlbmRsaW5lcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhcnQvdHJlbmRsaW5lcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pPLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxXQUErQjtJQTRGbkUsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzsrR0FqR1Esa0JBQWtCO21HQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFSOUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7O0FBcUdEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxTQUE4QjtJQUNuRTtRQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDOztnSEFIUSxtQkFBbUI7b0dBQW5CLG1CQUFtQixzRkFITSxrQkFBa0I7MkZBRzNDLG1CQUFtQjtrQkFOL0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDO3FCQUNwRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnYWNjZXNzaWJpbGl0eScsICdhbmltYXRpb24nLCAnYmFja3dhcmRGb3JlY2FzdCcsICdkYXNoQXJyYXknLCAnZW5hYmxlVG9vbHRpcCcsICdmaWxsJywgJ2ZvcndhcmRGb3JlY2FzdCcsICdpbnRlcmNlcHQnLCAnbGVnZW5kU2hhcGUnLCAnbWFya2VyJywgJ25hbWUnLCAncGVyaW9kJywgJ3BvbHlub21pYWxPcmRlcicsICd0eXBlJywgJ3Zpc2libGUnLCAnd2lkdGgnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBTZXJpZXMgRGlyZWN0aXZlXG4gKiBgYGBodG1sXG4gKiA8ZS1zZXJpZXMtY29sbGVjdGlvbj5cbiAqIDxlLXNlcmllcz5cbiAqIDxlLXRyZW5kbGluZXM+XG4gKiA8ZS10cmVuZGxpbmU+XG4gKiA8L2UtdHJlbmRsaW5lPlxuICogPC9lLXRyZW5kbGluZXM+XG4gKiA8L2Utc2VyaWVzLWNvbGxlY3Rpb24+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXNlcmllcz5lLXRyZW5kbGluZXM+ZS10cmVuZGxpbmUnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUcmVuZGxpbmVEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxUcmVuZGxpbmVEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0eXBlIG9mIHRyZW5kbGluZSB1c2VkIGluIHRoZSBzZXJpZXMuIFxuICAgICAqIEF2YWlsYWJsZSB0eXBlcyBhcmU6IFxuICAgICAqICogTGluZWFyIC0gQSBzdHJhaWdodCBsaW5lIHRoYXQgc2hvd3MgdGhlIGdlbmVyYWwgZGlyZWN0aW9uIG9mIGRhdGEuIFxuICAgICAqICogRXhwb25lbnRpYWwgLSBBIGN1cnZlIHRoYXQgZml0cyBkYXRhIHdpdGggZXhwb25lbnRpYWwgZ3Jvd3RoIG9yIGRlY2F5LiBcbiAgICAgKiAqIFBvbHlub21pYWwgLSBBIGN1cnZlIHRoYXQgZml0cyBkYXRhIHdpdGggYSBwb2x5bm9taWFsIGZ1bmN0aW9uLiBcbiAgICAgKiAqIFBvd2VyIC0gQSBjdXJ2ZSB0aGF0IHJlcHJlc2VudHMgZGF0YSB3aXRoIGEgcG93ZXIgZnVuY3Rpb24uIFxuICAgICAqICogTG9nYXJpdGhtaWMgLSBBIGN1cnZlIHRoYXQgZml0cyBkYXRhIHdpdGggYSBsb2dhcml0aG1pYyBzY2FsZS4gXG4gICAgICogKiBNb3ZpbmdBdmVyYWdlIC0gQSB0cmVuZGxpbmUgdGhhdCBzbW9vdGhlbnMgZGF0YSB1c2luZyBhIG1vdmluZyBhdmVyYWdlIGNhbGN1bGF0aW9uLlxuICAgICAqIEBkZWZhdWx0ICdMaW5lYXInXG4gICAgICovXG4gICAgcHVibGljIHR5cGU6IGFueTtcbiAgICAvKiogXG4gICAgICogT3B0aW9ucyB0byBpbXByb3ZlIGFjY2Vzc2liaWxpdHkgZm9yIGNoYXJ0IHRyZW5kbGluZSBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWNjZXNzaWJpbGl0eTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBPcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgYW5pbWF0aW9uIGZvciB0cmVuZGxpbmVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhbmltYXRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgcGVyaW9kIGJ5IHdoaWNoIHRoZSB0cmVuZCBpcyB0byBiZSBiYWNrd2FyZCBmb3JlY2FzdGVkLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBwdWJsaWMgYmFja3dhcmRGb3JlY2FzdDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBDb25maWd1cmVzIHRoZSBwYXR0ZXJuIG9mIGRhc2hlcyBhbmQgZ2FwcyBpbiB0aGUgdHJlbmRsaW5lIHN0cm9rZSB1c2luZyB0aGUgYGRhc2hBcnJheWAgcHJvcGVydHkuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgZGFzaEFycmF5OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIHRvb2x0aXAgZm9yIHRoZSB0cmVuZGxpbmUgdXNpbmcgdGhlIGBlbmFibGVUb29sdGlwYCBwcm9wZXJ0eS4gQnkgZGVmYXVsdCwgaXQgaXMgc2V0IHRvIHRydWUuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGVUb29sdGlwOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBmaWxsIGNvbG9yIGZvciB0aGUgdHJlbmRsaW5lLCB3aGljaCBhY2NlcHRzIHZhbHVlcyBpbiBoZXggb3IgcmdiYSBhcyB2YWxpZCBDU1MgY29sb3Igc3RyaW5ncy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBmaWxsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHBlcmlvZCBieSB3aGljaCB0aGUgdHJlbmQgbXVzdCBiZSBmb3J3YXJkIGZvcmVjYXN0ZWQuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHB1YmxpYyBmb3J3YXJkRm9yZWNhc3Q6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnRlcmNlcHQgdmFsdWUgb2YgdGhlIHRyZW5kbGluZS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgaW50ZXJjZXB0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBgbGVnZW5kU2hhcGVgIHByb3BlcnR5IGRlZmluZXMgdGhlIHNoYXBlIHVzZWQgdG8gcmVwcmVzZW50IHRoZSB0cmVuZGxpbmUgaW4gdGhlIGNoYXJ0IGxlZ2VuZC5cbiAgICAgKiBAZGVmYXVsdCAnU2VyaWVzVHlwZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgbGVnZW5kU2hhcGU6IGFueTtcbiAgICAvKiogXG4gICAgICogT3B0aW9ucyBmb3IgY3VzdG9taXppbmcgdGhlIG1hcmtlcnMgZm9yIHRyZW5kbGluZXMsIGluY2x1ZGluZyBzaGFwZSwgc2l6ZSwgY29sb3IsIGFuZCBvdGhlciB2aXN1YWwgYXNwZWN0cy5cbiAgICAgKiBAZGVwcmVjYXRlZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgbWFya2VyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBgbmFtZWAgcHJvcGVydHkgaXMgdXNlZCB0byBhc3NpZ24gYSBkZXNjcmlwdGl2ZSBuYW1lIHRvIHRoZSB0cmVuZGxpbmUsIHdoaWNoIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBjaGFydCBhcyBhIGxlZ2VuZC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBuYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHBlcmlvZCwgdGhlIHByaWNlIGNoYW5nZXMgb3ZlciB3aGljaCB3aWxsIGJlIGNvbnNpZGVyZWQgdG8gcHJlZGljdCB0aGUgbW92aW5nIGF2ZXJhZ2UgdHJlbmRsaW5lLlxuICAgICAqIEBkZWZhdWx0IDJcbiAgICAgKi9cbiAgICBwdWJsaWMgcGVyaW9kOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHBvbHlub21pYWwgb3JkZXIgb2YgdGhlIHBvbHlub21pYWwgdHJlbmRsaW5lLlxuICAgICAqIEBkZWZhdWx0IDJcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9seW5vbWlhbE9yZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBgdmlzaWJsZWAgcHJvcGVydHkgY29udHJvbHMgdGhlIGRpc3BsYXkgb2YgdGhlIHRyZW5kbGluZS4gSWYgc2V0IHRvIHRydWUsIHRoZSB0cmVuZGxpbmUgd2lsbCBiZSByZW5kZXJlZCBvbiB0aGUgY2hhcnQuIElmIHNldCB0byBmYWxzZSwgdGhlIHRyZW5kbGluZSB3aWxsIGJlIGhpZGRlbi5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHVibGljIHZpc2libGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgd2lkdGggb2YgdGhlIHRyZW5kbGluZS5cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgcHVibGljIHdpZHRoOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBUcmVuZGxpbmUgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Utc2VyaWVzPmUtdHJlbmRsaW5lcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihUcmVuZGxpbmVEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVHJlbmRsaW5lc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxUcmVuZGxpbmVzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCd0cmVuZGxpbmVzJyk7XG4gICAgfVxufSJdfQ==