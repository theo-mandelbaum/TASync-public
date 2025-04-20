import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDirective, ViewsDirective } from './views.directive';
import { AIAssistViewComponent } from './aiassistview.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the AIAssistView component.
 */
export class AIAssistViewModule {
}
AIAssistViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AIAssistViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewModule, declarations: [AIAssistViewComponent,
        ViewDirective,
        ViewsDirective], imports: [CommonModule], exports: [AIAssistViewComponent,
        ViewDirective,
        ViewsDirective] });
AIAssistViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        AIAssistViewComponent,
                        ViewDirective,
                        ViewsDirective
                    ],
                    exports: [
                        AIAssistViewComponent,
                        ViewDirective,
                        ViewsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWlhc3Npc3R2aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9haS1hc3Npc3R2aWV3L2FpYXNzaXN0dmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFakU7O0dBRUc7QUFjSCxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBVnZCLHFCQUFxQjtRQUNyQixhQUFhO1FBQ2IsY0FBYyxhQUpSLFlBQVksYUFPbEIscUJBQXFCO1FBQ3JCLGFBQWE7UUFDYixjQUFjO2dIQUdULGtCQUFrQixZQVpsQixDQUFDLFlBQVksQ0FBQzsyRkFZZCxrQkFBa0I7a0JBYjlCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1YscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsY0FBYztxQkFDakI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFZpZXdEaXJlY3RpdmUsIFZpZXdzRGlyZWN0aXZlIH0gZnJvbSAnLi92aWV3cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQUlBc3Npc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9haWFzc2lzdHZpZXcuY29tcG9uZW50JztcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgQUlBc3Npc3RWaWV3IGNvbXBvbmVudC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQUlBc3Npc3RWaWV3Q29tcG9uZW50LFxuICAgICAgICBWaWV3RGlyZWN0aXZlLFxuICAgICAgICBWaWV3c0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBBSUFzc2lzdFZpZXdDb21wb25lbnQsXG4gICAgICAgIFZpZXdEaXJlY3RpdmUsXG4gICAgICAgIFZpZXdzRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBSUFzc2lzdFZpZXdNb2R1bGUgeyB9Il19