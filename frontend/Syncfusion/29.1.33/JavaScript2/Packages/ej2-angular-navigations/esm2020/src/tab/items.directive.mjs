import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['content', 'cssClass', 'disabled', 'header', 'headerTemplate', 'id', 'tabIndex', 'visible'];
let outputs = [];
/**
 * 'e-tabitem' directive represent a item of the Angular Tab.
 * It must be contained in a Tab component(`ejs-tab`).
 * ```html
 * <ejs-tab>
 *  <e-tabitems>
 *   <e-tabitem [header]='Header 1' [content]='Content 1'></e-tabitem>
 *   <e-tabitem [header]='Header 2' [content]='Content 2'></e-tabitem>
 *  <e-tabitems>
 * </ejs-tab>
 * ```
 */
export class TabItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
TabItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TabItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TabItemDirective, selector: "e-tabitems>e-tabitem", inputs: { content: "content", cssClass: "cssClass", disabled: "disabled", header: "header", headerTemplate: "headerTemplate", id: "id", tabIndex: "tabIndex", visible: "visible" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "header_text", first: true, predicate: ["headerText"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], TabItemDirective.prototype, "content", void 0);
__decorate([
    Template()
], TabItemDirective.prototype, "header_text", void 0);
__decorate([
    Template()
], TabItemDirective.prototype, "headerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-tabitems>e-tabitem',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }], header_text: [{
                type: ContentChild,
                args: ['headerText']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
/**
 * TabItem Array Directive
 * @private
 */
export class TabItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
TabItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
TabItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TabItemsDirective, selector: "ejs-tab>e-tabitems", queries: [{ propertyName: "children", predicate: TabItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-tab>e-tabitems',
                    queries: {
                        children: new ContentChildren(TabItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RhYi9pdGVtcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxJQUFJLEtBQUssR0FBYSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25ILElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxXQUE2QjtJQStEL0QsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUVqRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs2R0FwRVEsZ0JBQWdCO2lHQUFoQixnQkFBZ0I7QUErQ3pCO0lBREMsUUFBUSxFQUFFO2lEQUNTO0FBR3BCO0lBREMsUUFBUSxFQUFFO3FEQUNhO0FBV3hCO0lBREMsUUFBUSxFQUFFO3dEQUNnQjsyRkE3RGxCLGdCQUFnQjtrQkFSNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7dUdBZ0RVLE9BQU87c0JBRmIsWUFBWTt1QkFBQyxTQUFTO2dCQUtoQixXQUFXO3NCQUZqQixZQUFZO3VCQUFDLFlBQVk7Z0JBYW5CLGNBQWM7c0JBRnBCLFlBQVk7dUJBQUMsZ0JBQWdCOztBQVlsQzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsU0FBNEI7SUFDL0Q7UUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7OEdBSFEsaUJBQWlCO2tHQUFqQixpQkFBaUIsbUZBSFEsZ0JBQWdCOzJGQUd6QyxpQkFBaUI7a0JBTjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDbEQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb250ZW50JywgJ2Nzc0NsYXNzJywgJ2Rpc2FibGVkJywgJ2hlYWRlcicsICdoZWFkZXJUZW1wbGF0ZScsICdpZCcsICd0YWJJbmRleCcsICd2aXNpYmxlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogJ2UtdGFiaXRlbScgZGlyZWN0aXZlIHJlcHJlc2VudCBhIGl0ZW0gb2YgdGhlIEFuZ3VsYXIgVGFiLlxuICogSXQgbXVzdCBiZSBjb250YWluZWQgaW4gYSBUYWIgY29tcG9uZW50KGBlanMtdGFiYCkuIFxuICogYGBgaHRtbFxuICogPGVqcy10YWI+XG4gKiAgPGUtdGFiaXRlbXM+XG4gKiAgIDxlLXRhYml0ZW0gW2hlYWRlcl09J0hlYWRlciAxJyBbY29udGVudF09J0NvbnRlbnQgMSc+PC9lLXRhYml0ZW0+XG4gKiAgIDxlLXRhYml0ZW0gW2hlYWRlcl09J0hlYWRlciAyJyBbY29udGVudF09J0NvbnRlbnQgMic+PC9lLXRhYml0ZW0+XG4gKiAgPGUtdGFiaXRlbXM+IFxuICogPC9lanMtdGFiPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS10YWJpdGVtcz5lLXRhYml0ZW0nLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJJdGVtRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8VGFiSXRlbURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNldHMgdGhlIENTUyBjbGFzc2VzIHRvIHRoZSBUYWIgaXRlbSB0byBjdXN0b21pemUgaXRzIHN0eWxlcy5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBjc3NDbGFzczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTZXRzIHRydWUgdG8gZGlzYWJsZSB1c2VyIGludGVyYWN0aW9ucyBvZiB0aGUgVGFiIGl0ZW0uXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzYWJsZWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIG9iamVjdCB1c2VkIGZvciBjb25maWd1cmluZyB0aGUgVGFiIGl0ZW0gaGVhZGVyIHByb3BlcnRpZXMuXG4gICAgICogQGRlZmF1bHQge31cbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgdW5pcXVlIElEIHRvIFRhYiBpdGVtLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgaWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0YWIgb3JkZXIgb2YgdGhlIFRhYnMgaXRlbXMuIFdoZW4gcG9zaXRpdmUgdmFsdWVzIGFzc2lnbmVkLCBpdCBhbGxvd3MgdG8gc3dpdGNoIGZvY3VzIHRvIHRoZSBuZXh0L3ByZXZpb3VzIHRhYnMgaXRlbXMgd2l0aCBUYWIvU2hpZnRUYWIga2V5cy4gXG4gICAgICogQnkgZGVmYXVsdCwgdXNlciBjYW4gYWJsZSB0byBzd2l0Y2ggYmV0d2VlbiBpdGVtcyBvbmx5IHZpYSBhcnJvdyBrZXlzLiBcbiAgICAgKiBJZiB0aGUgdmFsdWUgaXMgc2V0IHRvIDAgZm9yIGFsbCB0YWJzIGl0ZW1zLCB0aGVuIHRhYiBzd2l0Y2hlcyBiYXNlZCBvbiBlbGVtZW50IG9yZGVyLlxuICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICovXG4gICAgcHVibGljIHRhYkluZGV4OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNldHMgZmFsc2UgdG8gaGlkZSB0aGUgVGFiIGl0ZW0uXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgY29udGVudCBvZiBUYWIgaXRlbSwgdGhhdCBpcyBkaXNwbGF5ZWQgd2hlbiBjb25jZXJuIGl0ZW0gaGVhZGVyIGlzIHNlbGVjdGVkLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudCcpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY29udGVudDogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclRleHQnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGhlYWRlcl90ZXh0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgaGVhZGVyIHRleHQgb2YgVGFiIGl0ZW0uXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogVGFiSXRlbSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXRhYj5lLXRhYml0ZW1zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFRhYkl0ZW1EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVGFiSXRlbXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8VGFiSXRlbXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2l0ZW1zJyk7XG4gICAgfVxufSJdfQ==