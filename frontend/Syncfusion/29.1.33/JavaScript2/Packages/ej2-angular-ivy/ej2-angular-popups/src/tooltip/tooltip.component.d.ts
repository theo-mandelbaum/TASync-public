import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <ejs-tooltip content='Tooltip content'>Show Tooltip</ejs-tooltip>
 * ```
 */
export declare class TooltipComponent extends Tooltip implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    afterClose: any;
    afterOpen: any;
    beforeClose: any;
    beforeCollision: any;
    beforeOpen: any;
    beforeRender: any;
    created: any;
    destroyed: any;
    /**
     * It is used to display the content of Tooltip which can be both string and HTML Elements.
     * Refer the documentation [here](https://ej2.syncfusion.com/documentation/tooltip/content/)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="tooltip/content-api/index.ts" %}{% endcodeBlock %}
     *
     * @asptype string
     */
    content: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "ejs-tooltip", never, { "animation": "animation"; "closeDelay": "closeDelay"; "container": "container"; "content": "content"; "cssClass": "cssClass"; "enableHtmlParse": "enableHtmlParse"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "height": "height"; "htmlAttributes": "htmlAttributes"; "isSticky": "isSticky"; "locale": "locale"; "mouseTrail": "mouseTrail"; "offsetX": "offsetX"; "offsetY": "offsetY"; "openDelay": "openDelay"; "opensOn": "opensOn"; "position": "position"; "showTipPointer": "showTipPointer"; "target": "target"; "tipPointerPosition": "tipPointerPosition"; "width": "width"; "windowCollision": "windowCollision"; }, { "afterClose": "afterClose"; "afterOpen": "afterOpen"; "beforeClose": "beforeClose"; "beforeCollision": "beforeCollision"; "beforeOpen": "beforeOpen"; "beforeRender": "beforeRender"; "created": "created"; "destroyed": "destroyed"; }, ["content"], ["*"]>;
}
