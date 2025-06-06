import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['option', 'template'];
let outputs = [];
/**
 * `e-header-rows` directive represent a header rows of the Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```html
 * <ejs-schedule>
 *   <e-header-rows>
 *    <e-header-row option='Week'></e-header-row>
 *    <e-header-row option='Date'></e-header-row>
 *   </e-header-rows>
 * </ejs-schedule>
 * ```
 */
export class HeaderRowDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
HeaderRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HeaderRowDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
HeaderRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HeaderRowDirective, selector: "e-header-rows>e-header-row", inputs: { option: "option", template: "template" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], HeaderRowDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HeaderRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-header-rows>e-header-row',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * HeaderRow Array Directive
 * @private
 */
export class HeaderRowsDirective extends ArrayBase {
    constructor() {
        super('headerrows');
    }
}
HeaderRowsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HeaderRowsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
HeaderRowsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HeaderRowsDirective, selector: "ejs-schedule>e-header-rows", queries: [{ propertyName: "children", predicate: HeaderRowDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HeaderRowsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-schedule>e-header-rows',
                    queries: {
                        children: new ContentChildren(HeaderRowDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycm93cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NoZWR1bGUvaGVhZGVycm93cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxJQUFJLEtBQUssR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3QyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7O0dBV0c7QUFTSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBK0I7SUE2Qm5FLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7K0dBbENRLGtCQUFrQjttR0FBbEIsa0JBQWtCO0FBMkIzQjtJQURDLFFBQVEsRUFBRTtvREFDVTsyRkEzQlosa0JBQWtCO2tCQVI5QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjt1R0E0QlUsUUFBUTtzQkFGZCxZQUFZO3VCQUFDLFVBQVU7O0FBWTVCOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxTQUE4QjtJQUNuRTtRQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDOztnSEFIUSxtQkFBbUI7b0dBQW5CLG1CQUFtQiwyRkFITSxrQkFBa0I7MkZBRzNDLG1CQUFtQjtrQkFOL0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDO3FCQUNwRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ29wdGlvbicsICd0ZW1wbGF0ZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIGBlLWhlYWRlci1yb3dzYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgaGVhZGVyIHJvd3Mgb2YgdGhlIFNjaGVkdWxlLiBcbiAqIEl0IG11c3QgYmUgY29udGFpbmVkIGluIGEgU2NoZWR1bGUgY29tcG9uZW50KGBlanMtc2NoZWR1bGVgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXNjaGVkdWxlPlxuICogICA8ZS1oZWFkZXItcm93cz5cbiAqICAgIDxlLWhlYWRlci1yb3cgb3B0aW9uPSdXZWVrJz48L2UtaGVhZGVyLXJvdz5cbiAqICAgIDxlLWhlYWRlci1yb3cgb3B0aW9uPSdEYXRlJz48L2UtaGVhZGVyLXJvdz5cbiAqICAgPC9lLWhlYWRlci1yb3dzPlxuICogPC9lanMtc2NoZWR1bGU+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLWhlYWRlci1yb3dzPmUtaGVhZGVyLXJvdycsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlclJvd0RpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPEhlYWRlclJvd0RpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIEl0IGRlZmluZXMgdGhlIGhlYWRlciByb3cgdHlwZSwgd2hpY2ggYWNjZXB0cyBlaXRoZXIgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXMuIFxuICAgICAqICogYFllYXJgOiBEZW5vdGVzIHRoZSB5ZWFyIHJvdyBpbiB0aGUgaGVhZGVyIGJhci4gXG4gICAgICogKiBgTW9udGhgOiBEZW5vdGVzIHRoZSBtb250aCByb3cgaW4gdGhlIGhlYWRlciBiYXIuIFxuICAgICAqICogYFdlZWtgOiBEZW5vdGVzIHRoZSB3ZWVrIHJvdyBpbiB0aGUgaGVhZGVyIGJhci4gXG4gICAgICogKiBgRGF0ZWA6IERlbm90ZXMgdGhlIGRhdGUgcm93IGluIHRoZSBoZWFkZXIgYmFyLiBcbiAgICAgKiAqIGBIb3VyYDogRGVub3RlcyB0aGUgaG91ciByb3cgaW4gdGhlIGhlYWRlciBiYXIuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBvcHRpb246IGFueTtcbiAgICAvKiogXG4gICAgICogVGVtcGxhdGUgb3B0aW9uIHRvIGN1c3RvbWl6ZSB0aGUgaW5kaXZpZHVhbCBoZWFkZXIgcm93cy4gSXQgYWNjZXB0cyBlaXRoZXIgdGhlIHN0cmluZyBvciBIVE1MRWxlbWVudCBhcyB0ZW1wbGF0ZSBkZXNpZ24gXG4gICAgICogIGNvbnRlbnQgYW5kIHBhcnNlIGl0IGFwcHJvcHJpYXRlbHkgYmVmb3JlIGRpc3BsYXlpbmcgaXQgb250byB0aGUgaGVhZGVyIGNlbGxzLiBUaGUgZmllbGQgdGhhdCBcbiAgICAgKiAgY2FuIGJlIGFjY2Vzc2VkIHZpYSB0aGlzIHRlbXBsYXRlIGlzIGBkYXRlYC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgndGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBIZWFkZXJSb3cgQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1zY2hlZHVsZT5lLWhlYWRlci1yb3dzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKEhlYWRlclJvd0RpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJSb3dzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPEhlYWRlclJvd3NEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2hlYWRlcnJvd3MnKTtcbiAgICB9XG59Il19