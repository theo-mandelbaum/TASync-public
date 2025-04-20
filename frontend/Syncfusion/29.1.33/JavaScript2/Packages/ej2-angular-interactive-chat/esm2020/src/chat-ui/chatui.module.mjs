import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDirective, MessagesDirective } from './messages.directive';
import { ChatUIComponent } from './chatui.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the ChatUI component.
 */
export class ChatUIModule {
}
ChatUIModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChatUIModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIModule, declarations: [ChatUIComponent,
        MessageDirective,
        MessagesDirective], imports: [CommonModule], exports: [ChatUIComponent,
        MessageDirective,
        MessagesDirective] });
ChatUIModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChatUIModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ChatUIComponent,
                        MessageDirective,
                        MessagesDirective
                    ],
                    exports: [
                        ChatUIComponent,
                        MessageDirective,
                        MessagesDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHVpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jaGF0LXVpL2NoYXR1aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUVyRDs7R0FFRztBQWNILE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBVmpCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsaUJBQWlCLGFBSlgsWUFBWSxhQU9sQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGlCQUFpQjswR0FHWixZQUFZLFlBWlosQ0FBQyxZQUFZLENBQUM7MkZBWWQsWUFBWTtrQkFieEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDVixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjtxQkFDcEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1lc3NhZ2VEaXJlY3RpdmUsIE1lc3NhZ2VzRGlyZWN0aXZlIH0gZnJvbSAnLi9tZXNzYWdlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hhdFVJQ29tcG9uZW50IH0gZnJvbSAnLi9jaGF0dWkuY29tcG9uZW50JztcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgQ2hhdFVJIGNvbXBvbmVudC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2hhdFVJQ29tcG9uZW50LFxuICAgICAgICBNZXNzYWdlRGlyZWN0aXZlLFxuICAgICAgICBNZXNzYWdlc0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBDaGF0VUlDb21wb25lbnQsXG4gICAgICAgIE1lc3NhZ2VEaXJlY3RpdmUsXG4gICAgICAgIE1lc3NhZ2VzRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGF0VUlNb2R1bGUgeyB9Il19