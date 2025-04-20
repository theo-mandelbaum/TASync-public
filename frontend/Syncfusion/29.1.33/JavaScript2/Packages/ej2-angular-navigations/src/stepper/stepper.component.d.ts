import { ElementRef, ViewContainerRef, Renderer2, Injector, QueryList } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Stepper } from '@syncfusion/ej2-navigations';
import { StepsDirective } from './steps.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Stepper Component.
 * ```html
 * <nav ejs-stepper [steps]='stepItems'></nav>
 * ```
 */
export declare class StepperComponent extends Stepper implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    beforeStepRender: any;
    created: any;
    stepChanged: any;
    stepChanging: any;
    stepClick: any;
    activeStepChange: any;
    childSteps: QueryList<StepsDirective>;
    tags: string[];
    /**
     * Defines the template content for each step.
     *
     * {% codeBlock src='stepper/template/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    template: any;
    /**
     * Defines the template content for the tooltip.
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    tooltipTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperComponent, "ejs-stepper", never, { "activeStep": "activeStep"; "animation": "animation"; "cssClass": "cssClass"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "labelPosition": "labelPosition"; "linear": "linear"; "locale": "locale"; "orientation": "orientation"; "readOnly": "readOnly"; "showTooltip": "showTooltip"; "stepType": "stepType"; "steps": "steps"; "template": "template"; "tooltipTemplate": "tooltipTemplate"; }, { "beforeStepRender": "beforeStepRender"; "created": "created"; "stepChanged": "stepChanged"; "stepChanging": "stepChanging"; "stepClick": "stepClick"; "activeStepChange": "activeStepChange"; }, ["template", "tooltipTemplate", "childSteps"], ["nav"]>;
}
