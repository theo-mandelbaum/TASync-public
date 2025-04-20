import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['iconCss', 'name', 'type', 'viewTemplate'];
let outputs = [];
/**
 * Represents the Essential JS 2 Angular AIAssistView Component.
 * ```html
 * <ejs-aiassistview>
 *   <e-views>
 *     <e-view>
 *      </e-view>
 *    </e-views>
 * </ejs-aiassistview>
 * ```
 */
export class ViewDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ViewDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ViewDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ViewDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ViewDirective, selector: "ejs-aiassistview>e-views>e-view", inputs: { iconCss: "iconCss", name: "name", type: "type", viewTemplate: "viewTemplate" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ViewDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-aiassistview>e-views>e-view',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * View Array Directive
 * @private
 */
export class ViewsDirective extends ArrayBase {
    constructor() {
        super('views');
    }
}
ViewsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ViewsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ViewsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ViewsDirective, selector: "ejs-aiassistview>e-views", queries: [{ propertyName: "children", predicate: ViewDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ViewsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-aiassistview>e-views',
                    queries: {
                        children: new ContentChildren(ViewDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FpLWFzc2lzdHZpZXcvdmlld3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNsRSxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7R0FVRztBQVNILE1BQU0sT0FBTyxhQUFjLFNBQVEsV0FBMEI7SUFtQ3pELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7MEdBeENRLGFBQWE7OEZBQWIsYUFBYTsyRkFBYixhQUFhO2tCQVJ6QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUE0Q0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGNBQWUsU0FBUSxTQUF5QjtJQUN6RDtRQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDOzsyR0FIUSxjQUFjOytGQUFkLGNBQWMseUZBSFcsYUFBYTsyRkFHdEMsY0FBYztrQkFOMUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGFBQWEsQ0FBQztxQkFDL0M7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2ljb25Dc3MnLCAnbmFtZScsICd0eXBlJywgJ3ZpZXdUZW1wbGF0ZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVzc2VudGlhbCBKUyAyIEFuZ3VsYXIgQUlBc3Npc3RWaWV3IENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtYWlhc3Npc3R2aWV3PiBcbiAqICAgPGUtdmlld3M+XG4gKiAgICAgPGUtdmlldz5cbiAqICAgICAgPC9lLXZpZXc+XG4gKiAgICA8L2Utdmlld3M+XG4gKiA8L2Vqcy1haWFzc2lzdHZpZXc+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtYWlhc3Npc3R2aWV3PmUtdmlld3M+ZS12aWV3JyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVmlld0RpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPFZpZXdEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHR5cGUgb2YgdGhlIGFzc2lzdCB2aWV3LlxuICAgICAqIEBpc2VudW1lcmF0aW9uIHRydWVcbiAgICAgKiBAZGVmYXVsdCBBc3Npc3RWaWV3VHlwZS5Bc3Npc3RcbiAgICAgKiBAYXNwdHlwZSBBc3Npc3RWaWV3VHlwZVxuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaWNvbiBDU1MgZm9yIHRoZSBhc3Npc3Qgdmlldy4gXG4gICAgICogUmVwcmVzZW50cyB0aGUgQ1NTIGNsYXNzIGZvciB0aGUgaWNvbiBvZiB0aGUgYXNzaXN0IHZpZXcuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBpY29uQ3NzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgbmFtZSBvZiB0aGUgYXNzaXN0IHZpZXcuIFxuICAgICAqIFJlcHJlc2VudHMgdGhlIG5hbWUgZGlzcGxheWVkIGluIHRoZSBhc3Npc3Qgdmlldy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBuYW1lOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHRoZSB2aWV3IG9mIHRoZSBhc3Npc3Qgdmlldy4gXG4gICAgICogUmVwcmVzZW50cyB0aGUgdGVtcGxhdGUgZm9yIHJlbmRlcmluZyB0aGUgdmlldywgd2hpY2ggY2FuIGJlIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24uXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlld1RlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBWaWV3IEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtYWlhc3Npc3R2aWV3PmUtdmlld3MnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oVmlld0RpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3c0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxWaWV3c0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigndmlld3MnKTtcbiAgICB9XG59Il19