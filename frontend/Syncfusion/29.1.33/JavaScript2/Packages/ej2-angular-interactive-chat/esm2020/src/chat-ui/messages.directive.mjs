import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['author', 'id', 'status', 'text', 'timeStamp', 'timeStampFormat'];
let outputs = [];
/**
 * Represents the Essential JS 2 Angular ChatUI Component.
 * ```html
 * <ejs-chatui>
 *   <e-messages>
 *     <e-message>
 *     </e-message>
 *    </e-messages>
 * </ejs-chatui>
 * ```
 */
export class MessageDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
MessageDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
MessageDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MessageDirective, selector: "ejs-chatui>e-messages>e-message", inputs: { author: "author", id: "id", status: "status", text: "text", timeStamp: "timeStamp", timeStampFormat: "timeStampFormat" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chatui>e-messages>e-message',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Message Array Directive
 * @private
 */
export class MessagesDirective extends ArrayBase {
    constructor() {
        super('messages');
    }
}
MessagesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessagesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MessagesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MessagesDirective, selector: "ejs-chatui>e-messages", queries: [{ propertyName: "children", predicate: MessageDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessagesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chatui>e-messages',
                    queries: {
                        children: new ContentChildren(MessageDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NoYXQtdWkvbWVzc2FnZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDekYsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7O0dBVUc7QUFTSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsV0FBNkI7SUEwQy9ELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7NkdBL0NRLGdCQUFnQjtpR0FBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBUjVCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQW1ERDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsU0FBNEI7SUFDL0Q7UUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7OEdBSFEsaUJBQWlCO2tHQUFqQixpQkFBaUIsc0ZBSFEsZ0JBQWdCOzJGQUd6QyxpQkFBaUI7a0JBTjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDbEQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2F1dGhvcicsICdpZCcsICdzdGF0dXMnLCAndGV4dCcsICd0aW1lU3RhbXAnLCAndGltZVN0YW1wRm9ybWF0J107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRXNzZW50aWFsIEpTIDIgQW5ndWxhciBDaGF0VUkgQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy1jaGF0dWk+IFxuICogICA8ZS1tZXNzYWdlcz5cbiAqICAgICA8ZS1tZXNzYWdlPlxuICogICAgIDwvZS1tZXNzYWdlPlxuICogICAgPC9lLW1lc3NhZ2VzPlxuICogPC9lanMtY2hhdHVpPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoYXR1aT5lLW1lc3NhZ2VzPmUtbWVzc2FnZScsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxNZXNzYWdlRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBhdXRob3Igb2YgdGhlIG1lc3NhZ2UgaW4gdGhlIENoYXQgVUkgY29tcG9uZW50LiBcbiAgICAgKiBUaGlzIHByb3BlcnR5IHJlZmVyZW5jZXMgYSBgVXNlck1vZGVsYCBvYmplY3QgdGhhdCBjb250YWlucyBkZXRhaWxzIGFib3V0IHRoZSB1c2VyIHdobyBzZW50IHRoZSBtZXNzYWdlLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXV0aG9yOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIGVhY2ggbWVzc2FnZSBzZW50IGluIHRoZSBDaGF0IFVJIGNvbXBvbmVudC4gXG4gICAgICogUmVwcmVzZW50cyBhIHN0cmluZyB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgYSBtZXNzYWdlIGZvciB0cmFja2luZyBhbmQgbWFuYWdpbmcgaW5kaXZpZHVhbCBtZXNzYWdlcyB3aXRoaW4gdGhlIGNoYXQuXG4gICAgICogQGRlZmF1bHQgJycnXG4gICAgICovXG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgc3RhdHVzIG9mIHRoZSBtZXNzYWdlIGluIHRoZSBDaGF0IFVJIGNvbXBvbmVudC4gXG4gICAgICogUmVwcmVzZW50cyB0aGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIG1lc3NhZ2UsIHN1Y2ggYXMgc2VudCwgcmVjZWl2ZWQsIG9yIHJlYWQuIEl0IGhlbHBzIGluIHRyYWNraW5nIHRoZSBtZXNzYWdlcyB3aXRoaW4gdGhlIGNoYXQgY29tcG9uZW50LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdHVzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFJlcHJlc2VudHMgdGhlIGNvbnRlbnQgb2YgdGhlIG1lc3NhZ2Ugc2VudCBieSBhIHVzZXIgaW4gdGhlIENoYXQgVUkgY29tcG9uZW50LlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRleHQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0aW1lc3RhbXAgb2Ygd2hlbiB0aGUgbWVzc2FnZSB3YXMgc2VudC4gXG4gICAgICogVGhpcyBwcm9wZXJ0eSBob2xkcyBhIGBEYXRlYCBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBleGFjdCB0aW1lIHRoZSBtZXNzYWdlIHdhcyBjcmVhdGVkLCBwcm92aWRpbmcgY29udGV4dCB0byB0aGUgY29udmVyc2F0aW9uIGZsb3cuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgdGltZVN0YW1wOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgZm9ybWF0IG9mIHRoZSB0aW1lc3RhbXAgZm9yIGRpc3BsYXlpbmcgdGhlIG1lc3NhZ2UncyBzZW5kaW5nIHRpbWUuIFxuICAgICAqIEJ5IGRlZmF1bHQsIHRoZSBmb3JtYXQgaXMgc2V0IGJhc2VkIG9uIHRoZSBjdWx0dXJlIG9mIHRoZSBhcHBsaWNhdGlvbi4gXG4gICAgICogWW91IGNhbiBjdXN0b21pemUgdGhlIGZvcm1hdCB1c2luZyBhIHNwZWNpZmljIHBhdHRlcm4sIHN1Y2ggYXMgXCInZGQvTU0veXl5eSBoaDptbSdcIiBpbiBzdHJpbmcgZm9ybWF0LlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRpbWVTdGFtcEZvcm1hdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogTWVzc2FnZSBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoYXR1aT5lLW1lc3NhZ2VzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKE1lc3NhZ2VEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8TWVzc2FnZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ21lc3NhZ2VzJyk7XG4gICAgfVxufSJdfQ==