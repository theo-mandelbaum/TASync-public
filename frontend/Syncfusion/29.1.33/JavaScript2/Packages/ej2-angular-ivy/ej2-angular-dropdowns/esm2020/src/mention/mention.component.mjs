import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Mention } from '@syncfusion/ej2-dropdowns';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['allowSpaces', 'cssClass', 'dataSource', 'displayTemplate', 'fields', 'filterType', 'highlight', 'ignoreCase', 'itemTemplate', 'locale', 'mentionChar', 'minLength', 'noRecordsTemplate', 'popupHeight', 'popupWidth', 'query', 'requireLeadingSpace', 'showMentionChar', 'sortOrder', 'spinnerTemplate', 'suffixText', 'suggestionCount', 'target'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'change', 'closed', 'created', 'destroyed', 'filtering', 'opened', 'select'];
export const twoWays = [''];
/**
*The Mention component contains a list of predefined values, from which the user can choose a single value.
*```html
*<ejs-mention></ejs-mention>
*```
*/
let MentionComponent = class MentionComponent extends Mention {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
MentionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MentionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MentionComponent, selector: "ejs-mention", inputs: { allowSpaces: "allowSpaces", cssClass: "cssClass", dataSource: "dataSource", displayTemplate: "displayTemplate", fields: "fields", filterType: "filterType", highlight: "highlight", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", mentionChar: "mentionChar", minLength: "minLength", noRecordsTemplate: "noRecordsTemplate", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", requireLeadingSpace: "requireLeadingSpace", showMentionChar: "showMentionChar", sortOrder: "sortOrder", spinnerTemplate: "spinnerTemplate", suffixText: "suffixText", suggestionCount: "suggestionCount", target: "target" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", change: "change", closed: "closed", created: "created", destroyed: "destroyed", filtering: "filtering", opened: "opened", select: "select" }, queries: [{ propertyName: "displayTemplate", first: true, predicate: ["displayTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "spinnerTemplate", first: true, predicate: ["spinnerTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MentionComponent.prototype, "displayTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "spinnerTemplate", void 0);
__decorate([
    Template('No records found')
], MentionComponent.prototype, "noRecordsTemplate", void 0);
MentionComponent = __decorate([
    ComponentMixins([ComponentBase])
], MentionComponent);
export { MentionComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-mention',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { displayTemplate: [{
                type: ContentChild,
                args: ['displayTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], spinnerTemplate: [{
                type: ContentChild,
                args: ['spinnerTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWVudGlvbi9tZW50aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUQsdUJBQXVCLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBdUQsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsaUJBQWlCLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsWUFBWSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxtQkFBbUIsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxFQUFDLGlCQUFpQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hXLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLGFBQWEsRUFBQyxnQkFBZ0IsRUFBQyxlQUFlLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JLLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXRDOzs7OztFQUtFO0lBWVcsZ0JBQWdCLFNBQWhCLGdCQUFpQixTQUFRLE9BQU87SUEyQ3pDLFlBQW9CLEtBQWlCLEVBQVUsU0FBb0IsRUFBVSxnQkFBaUMsRUFBVSxRQUFrQjtRQUN0SSxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFdEksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxxQkFBcUI7UUFFeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBOzZHQXpFWSxnQkFBZ0I7aUdBQWhCLGdCQUFnQixnNENBUGYsNEJBQTRCO0FBOEJ0QztJQURDLFFBQVEsRUFBRTt5REFDaUI7QUFPNUI7SUFEQyxRQUFRLEVBQUU7c0RBQ2M7QUFRekI7SUFEQyxRQUFRLEVBQUU7eURBQ2lCO0FBRzVCO0lBREMsUUFBUSxDQUFDLGtCQUFrQixDQUFDOzJEQUNDO0FBekNyQixnQkFBZ0I7SUFENUIsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsZ0JBQWdCLENBeUU1QjtTQXpFWSxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFYNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUUsRUFFUjtpQkFDSjsrS0F5QlUsZUFBZTtzQkFGckIsWUFBWTt1QkFBQyxpQkFBaUI7Z0JBU3hCLFlBQVk7c0JBRmxCLFlBQVk7dUJBQUMsY0FBYztnQkFVckIsZUFBZTtzQkFGckIsWUFBWTt1QkFBQyxpQkFBaUI7Z0JBS3hCLGlCQUFpQjtzQkFGdkIsWUFBWTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgQ29tcG9uZW50TWl4aW5zLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBNZW50aW9uIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhbGxvd1NwYWNlcycsJ2Nzc0NsYXNzJywnZGF0YVNvdXJjZScsJ2Rpc3BsYXlUZW1wbGF0ZScsJ2ZpZWxkcycsJ2ZpbHRlclR5cGUnLCdoaWdobGlnaHQnLCdpZ25vcmVDYXNlJywnaXRlbVRlbXBsYXRlJywnbG9jYWxlJywnbWVudGlvbkNoYXInLCdtaW5MZW5ndGgnLCdub1JlY29yZHNUZW1wbGF0ZScsJ3BvcHVwSGVpZ2h0JywncG9wdXBXaWR0aCcsJ3F1ZXJ5JywncmVxdWlyZUxlYWRpbmdTcGFjZScsJ3Nob3dNZW50aW9uQ2hhcicsJ3NvcnRPcmRlcicsJ3NwaW5uZXJUZW1wbGF0ZScsJ3N1ZmZpeFRleHQnLCdzdWdnZXN0aW9uQ291bnQnLCd0YXJnZXQnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uQmVnaW4nLCdhY3Rpb25Db21wbGV0ZScsJ2FjdGlvbkZhaWx1cmUnLCdiZWZvcmVPcGVuJywnY2hhbmdlJywnY2xvc2VkJywnY3JlYXRlZCcsJ2Rlc3Ryb3llZCcsJ2ZpbHRlcmluZycsJ29wZW5lZCcsJ3NlbGVjdCddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4qVGhlIE1lbnRpb24gY29tcG9uZW50IGNvbnRhaW5zIGEgbGlzdCBvZiBwcmVkZWZpbmVkIHZhbHVlcywgZnJvbSB3aGljaCB0aGUgdXNlciBjYW4gY2hvb3NlIGEgc2luZ2xlIHZhbHVlLlxuKmBgYGh0bWxcbio8ZWpzLW1lbnRpb24+PC9lanMtbWVudGlvbj5cbipgYGBcbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1tZW50aW9uJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgPjwvbmctY29udGVudD5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBNZW50aW9uQ29tcG9uZW50IGV4dGVuZHMgTWVudGlvbiBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGFpbmVyQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRhY3Rpb25CZWdpbjogYW55O1xuXHRhY3Rpb25Db21wbGV0ZTogYW55O1xuXHRhY3Rpb25GYWlsdXJlOiBhbnk7XG5cdGJlZm9yZU9wZW46IGFueTtcblx0Y2hhbmdlOiBhbnk7XG5cdGNsb3NlZDogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGRlc3Ryb3llZDogYW55O1xuXHRmaWx0ZXJpbmc6IGFueTtcblx0b3BlbmVkOiBhbnk7XG5cdHB1YmxpYyBzZWxlY3Q6IGFueTtcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHRoZSBzZWxlY3RlZCB2YWx1ZSBmcm9tIHRoZSBzdWdnZXN0aW9uIGxpc3QuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Rpc3BsYXlUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZGlzcGxheVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHRoZSBzdWdnZXN0aW9uIGxpc3QuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHNob3dpbmcgdW50aWwgZGF0YSBpcyBsb2FkZWQgaW4gdGhlIHBvcHVwLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdzcGlubmVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHNwaW5uZXJUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ25vUmVjb3Jkc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ05vIHJlY29yZHMgZm91bmQnKVxuICAgIHB1YmxpYyBub1JlY29yZHNUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==