import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { ChatUI } from '@syncfusion/ej2-interactive-chat';
import { Template } from '@syncfusion/ej2-angular-base';
import { MessagesDirective } from './messages.directive';
import * as i0 from "@angular/core";
export const inputs = ['autoScrollToBottom', 'cssClass', 'emptyChatTemplate', 'enablePersistence', 'enableRtl', 'footerTemplate', 'headerIconCss', 'headerText', 'headerToolbar', 'height', 'loadOnDemand', 'locale', 'messageTemplate', 'messages', 'placeholder', 'showFooter', 'showHeader', 'showTimeBreak', 'showTimeStamp', 'suggestionTemplate', 'suggestions', 'timeBreakTemplate', 'timeStampFormat', 'typingUsers', 'typingUsersTemplate', 'user', 'width'];
export const outputs = ['created', 'messageSend', 'userTyping'];
export const twoWays = [''];
/**
 * Represents the Essential JS 2 Angular ChatUI Component.
 * ```html
 * <ejs-chatui></ejs-chatui>
 * ```
 */
let ChatUIComponent = class ChatUIComponent extends ChatUI {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['messages'];
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
        this.tagObjects[0].instance = this.childMessages;
        this.containerContext.ngAfterContentChecked(this);
    }
};
ChatUIComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ChatUIComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ChatUIComponent, selector: "[ejs-chatui]", inputs: { autoScrollToBottom: "autoScrollToBottom", cssClass: "cssClass", emptyChatTemplate: "emptyChatTemplate", enablePersistence: "enablePersistence", enableRtl: "enableRtl", footerTemplate: "footerTemplate", headerIconCss: "headerIconCss", headerText: "headerText", headerToolbar: "headerToolbar", height: "height", loadOnDemand: "loadOnDemand", locale: "locale", messageTemplate: "messageTemplate", messages: "messages", placeholder: "placeholder", showFooter: "showFooter", showHeader: "showHeader", showTimeBreak: "showTimeBreak", showTimeStamp: "showTimeStamp", suggestionTemplate: "suggestionTemplate", suggestions: "suggestions", timeBreakTemplate: "timeBreakTemplate", timeStampFormat: "timeStampFormat", typingUsers: "typingUsers", typingUsersTemplate: "typingUsersTemplate", user: "user", width: "width" }, outputs: { created: "created", messageSend: "messageSend", userTyping: "userTyping" }, queries: [{ propertyName: "suggestionTemplate", first: true, predicate: ["suggestionTemplate"], descendants: true }, { propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "emptyChatTemplate", first: true, predicate: ["emptyChatTemplate"], descendants: true }, { propertyName: "messageTemplate", first: true, predicate: ["messageTemplate"], descendants: true }, { propertyName: "typingUsersTemplate", first: true, predicate: ["typingUsersTemplate"], descendants: true }, { propertyName: "timeBreakTemplate", first: true, predicate: ["timeBreakTemplate"], descendants: true }, { propertyName: "childMessages", first: true, predicate: MessagesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ChatUIComponent.prototype, "suggestionTemplate", void 0);
__decorate([
    Template()
], ChatUIComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], ChatUIComponent.prototype, "emptyChatTemplate", void 0);
__decorate([
    Template()
], ChatUIComponent.prototype, "messageTemplate", void 0);
__decorate([
    Template()
], ChatUIComponent.prototype, "typingUsersTemplate", void 0);
__decorate([
    Template()
], ChatUIComponent.prototype, "timeBreakTemplate", void 0);
ChatUIComponent = __decorate([
    ComponentMixins([ComponentBase])
], ChatUIComponent);
export { ChatUIComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-chatui]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childMessages: new ContentChild(MessagesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { suggestionTemplate: [{
                type: ContentChild,
                args: ['suggestionTemplate']
            }], footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], emptyChatTemplate: [{
                type: ContentChild,
                args: ['emptyChatTemplate']
            }], messageTemplate: [{
                type: ContentChild,
                args: ['messageTemplate']
            }], typingUsersTemplate: [{
                type: ContentChild,
                args: ['typingUsersTemplate']
            }], timeBreakTemplate: [{
                type: ContentChild,
                args: ['timeBreakTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHVpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaGF0LXVpL2NoYXR1aS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFELHVCQUF1QixFQUE0QixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQXVELFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBRXpELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxtQkFBbUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsaUJBQWlCLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxlQUFlLEVBQUMsb0JBQW9CLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLGlCQUFpQixFQUFDLGFBQWEsRUFBQyxxQkFBcUIsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDdGIsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxZQUFZLENBQUMsQ0FBQztBQUN4RSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUV0Qzs7Ozs7R0FLRztJQVlVLGVBQWUsU0FBZixlQUFnQixTQUFRLE1BQU07SUFrRnZDLFlBQW9CLEtBQWlCLEVBQVUsU0FBb0IsRUFBVSxnQkFBaUMsRUFBVSxRQUFrQjtRQUN0SSxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUEzRW5JLFNBQUksR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBNkVqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHFCQUFxQjtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBSUosQ0FBQTs0R0FoSFksZUFBZTtnR0FBZixlQUFlLDRsREFKWSxpQkFBaUIsdUVBSDNDLDRCQUE0QjtBQTJCdEM7SUFEQyxRQUFRLEVBQUU7MkRBQ29CO0FBWS9CO0lBREMsUUFBUSxFQUFFO3VEQUNnQjtBQVkzQjtJQURDLFFBQVEsRUFBRTswREFDbUI7QUFZOUI7SUFEQyxRQUFRLEVBQUU7d0RBQ2lCO0FBWTVCO0lBREMsUUFBUSxFQUFFOzREQUNxQjtBQVloQztJQURDLFFBQVEsRUFBRTswREFDbUI7QUFoRnJCLGVBQWU7SUFEM0IsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsZUFBZSxDQWdIM0I7U0FoSFksZUFBZTsyRkFBZixlQUFlO2tCQVgzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxhQUFhLEVBQUUsSUFBSSxZQUFZLENBQUMsaUJBQWlCLENBQUM7cUJBQ3JEO2lCQUNKOytLQXNCVSxrQkFBa0I7c0JBRnhCLFlBQVk7dUJBQUMsb0JBQW9CO2dCQWMzQixjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFjdkIsaUJBQWlCO3NCQUZ2QixZQUFZO3VCQUFDLG1CQUFtQjtnQkFjMUIsZUFBZTtzQkFGckIsWUFBWTt1QkFBQyxpQkFBaUI7Z0JBY3hCLG1CQUFtQjtzQkFGekIsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBYzVCLGlCQUFpQjtzQkFGdkIsWUFBWTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgQ29tcG9uZW50TWl4aW5zLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBDaGF0VUkgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW50ZXJhY3RpdmUtY2hhdCc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgTWVzc2FnZXNEaXJlY3RpdmUgfSBmcm9tICcuL21lc3NhZ2VzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhdXRvU2Nyb2xsVG9Cb3R0b20nLCdjc3NDbGFzcycsJ2VtcHR5Q2hhdFRlbXBsYXRlJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdmb290ZXJUZW1wbGF0ZScsJ2hlYWRlckljb25Dc3MnLCdoZWFkZXJUZXh0JywnaGVhZGVyVG9vbGJhcicsJ2hlaWdodCcsJ2xvYWRPbkRlbWFuZCcsJ2xvY2FsZScsJ21lc3NhZ2VUZW1wbGF0ZScsJ21lc3NhZ2VzJywncGxhY2Vob2xkZXInLCdzaG93Rm9vdGVyJywnc2hvd0hlYWRlcicsJ3Nob3dUaW1lQnJlYWsnLCdzaG93VGltZVN0YW1wJywnc3VnZ2VzdGlvblRlbXBsYXRlJywnc3VnZ2VzdGlvbnMnLCd0aW1lQnJlYWtUZW1wbGF0ZScsJ3RpbWVTdGFtcEZvcm1hdCcsJ3R5cGluZ1VzZXJzJywndHlwaW5nVXNlcnNUZW1wbGF0ZScsJ3VzZXInLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydjcmVhdGVkJywnbWVzc2FnZVNlbmQnLCd1c2VyVHlwaW5nJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJyddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVzc2VudGlhbCBKUyAyIEFuZ3VsYXIgQ2hhdFVJIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtY2hhdHVpPjwvZWpzLWNoYXR1aT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tlanMtY2hhdHVpXScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50ID48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkTWVzc2FnZXM6IG5ldyBDb250ZW50Q2hpbGQoTWVzc2FnZXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIENoYXRVSUNvbXBvbmVudCBleHRlbmRzIENoYXRVSSBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGFpbmVyQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdG1lc3NhZ2VTZW5kOiBhbnk7XG5cdHB1YmxpYyB1c2VyVHlwaW5nOiBhbnk7XG4gICAgcHVibGljIGNoaWxkTWVzc2FnZXM6IFF1ZXJ5TGlzdDxNZXNzYWdlc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydtZXNzYWdlcyddO1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIGZvciByZW5kZXJpbmcgc3VnZ2VzdGlvbiBpdGVtcyBpbiB0aGUgQ2hhdCBVSSBjb21wb25lbnQuIFxuICAgICAqIERlZmluZXMgdGhlIGNvbnRlbnQgb3IgbGF5b3V0IHVzZWQgdG8gcmVuZGVyIHN1Z2dlc3Rpb24gaXRlbXMsIGFuZCBjYW4gYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24uIFxuICAgICAqIFRoZSB0ZW1wbGF0ZSBjb250ZXh0IGluY2x1ZGVzIHRoZSBpbmRleCBhbmQgc3VnZ2VzdGlvbiB0ZXh0LlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnc3VnZ2VzdGlvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBzdWdnZXN0aW9uVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgdGhlIGZvb3RlciBhcmVhIGluIHRoZSBDaGF0IFVJIGNvbXBvbmVudC4gXG4gICAgICogRGVmaW5lcyB0aGUgY29udGVudCBvciBsYXlvdXQgdXNlZCB0byByZW5kZXIgdGhlIGZvb3Rlciwgd2hpY2ggY2FuIGJlIHByb3ZpZGVkIGFzIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24uXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZm9vdGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgcmVuZGVyaW5nIHRoZSBlbXB0eSBzdGF0ZSBvZiB0aGUgQ2hhdCBVSSBjb21wb25lbnQuIFxuICAgICAqIFRoaXMgcHJvcGVydHkgY2FuIGFjY2VwdCBlaXRoZXIgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiB0byBjdXN0b21pemUgdGhlIGFwcGVhcmFuY2Ugd2hlbiB0aGVyZSBhcmUgbm8gbWVzc2FnZXMgdG8gZGlzcGxheSBpbiB0aGUgY2hhdC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2VtcHR5Q2hhdFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBlbXB0eUNoYXRUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIGZvciByZW5kZXJpbmcgaW5kaXZpZHVhbCBtZXNzYWdlcyBpbiB0aGUgQ2hhdCBVSSBjb21wb25lbnQuIFxuICAgICAqIFRoaXMgcHJvcGVydHkgY2FuIGFjY2VwdCBlaXRoZXIgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiB0byBjdXN0b21pemUgdGhlIGFwcGVhcmFuY2Ugb2YgbWVzc2FnZXMuIFRoZSB0ZW1wbGF0ZSBjb250ZXh0IGluY2x1ZGVzIG1lc3NhZ2UgYW5kIGluZGV4LlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbWVzc2FnZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBtZXNzYWdlVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGVtcGxhdGUgZm9yIGRpc3BsYXlpbmcgdXNlcnMgY3VycmVudGx5IHR5cGluZyBpbiB0aGUgY2hhdCBpbnRlcmZhY2UuIFxuICAgICAqIEFjY2VwdHMgYSBzdHJpbmcgb3IgZnVuY3Rpb24gdG8gY3VzdG9taXplIHRoZSBkaXNwbGF5IGZvcm1hdC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3R5cGluZ1VzZXJzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHR5cGluZ1VzZXJzVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgcmVuZGVyaW5nIHRpbWUgYnJlYWtzIGluIHRoZSBDaGF0IFVJIGNvbXBvbmVudC4gXG4gICAgICogQWNjZXB0cyBhIHN0cmluZyBvciBmdW5jdGlvbiB0aGF0IGZvcm1hdHMgdGhlIGFwcGVhcmFuY2Ugb2YgZGF0ZS1iYXNlZCBzZXBhcmF0b3JzLMKgYWxsb3dpbmcgY3VzdG9taXphdGlvbiBvZiBob3cgbWVzc2FnZXMgYXJlIHZpc3VhbGx5IGdyb3VwZWQgYnkgZGF0ZS5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3RpbWVCcmVha1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0aW1lQnJlYWtUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkTWVzc2FnZXM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=