import { ElementRef, ViewContainerRef, Renderer2, Injector, QueryList } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { ViewsDirective } from './views.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Essential JS 2 Angular AIAssistView Component.
 * ```html
 * <ejs-aiassistview></ejs-aiassistview>
 * ```
 */
export declare class AIAssistViewComponent extends AIAssistView implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    created: any;
    promptChanged: any;
    promptRequest: any;
    stopRespondingClick: any;
    promptChange: any;
    childViews: QueryList<ViewsDirective>;
    tags: string[];
    /**
     * Specifies the template for the footer in the AIAssistView component.
     * Defines the content or layout used to render the footer. Can be a string or a function.
     *
     * {% codeBlock src='ai-assistview/footerTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    footerTemplate: any;
    /**
     * Specifies the template for rendering prompt items in the AIAssistView component.
     * Defines the content or layout used to render prompt items, and can be either a string or a function.
     * The template context includes prompt text and toolbar items.
     *
     * {% codeBlock src='ai-assistview/promptItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    promptItemTemplate: any;
    /**
     * Specifies the template for rendering response items in the AIAssistView component.
     * Defines the content or layout used to render response items, and can be either a string or a function.
     * The template context includes the prompt text, response text, and toolbar items.
     *
     * {% codeBlock src='ai-assistview/responseItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    responseItemTemplate: any;
    /**
     * Specifies the template for rendering prompt suggestion items in the AIAssistView component.
     * Defines the content or layout used to render prompt suggestion items, and can be either a string or a function.
     * The template context includes the index and suggestion text.
     *
     * {% codeBlock src='ai-assistview/suggestionItemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    promptSuggestionItemTemplate: any;
    /**
     * Specifies the template for the banner in the AIAssistView component.
     * Represents the content or layout used to render the banner. Can be a string or a function.
     *
     * {% codeBlock src='ai-assistview/bannerTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    bannerTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AIAssistViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AIAssistViewComponent, "[ejs-aiassistview]", never, { "activeView": "activeView"; "bannerTemplate": "bannerTemplate"; "cssClass": "cssClass"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "footerTemplate": "footerTemplate"; "height": "height"; "locale": "locale"; "prompt": "prompt"; "promptIconCss": "promptIconCss"; "promptItemTemplate": "promptItemTemplate"; "promptPlaceholder": "promptPlaceholder"; "promptSuggestionItemTemplate": "promptSuggestionItemTemplate"; "promptSuggestions": "promptSuggestions"; "promptSuggestionsHeader": "promptSuggestionsHeader"; "promptToolbarSettings": "promptToolbarSettings"; "prompts": "prompts"; "responseIconCss": "responseIconCss"; "responseItemTemplate": "responseItemTemplate"; "responseToolbarSettings": "responseToolbarSettings"; "showClearButton": "showClearButton"; "showHeader": "showHeader"; "toolbarSettings": "toolbarSettings"; "views": "views"; "width": "width"; }, { "created": "created"; "promptChanged": "promptChanged"; "promptRequest": "promptRequest"; "stopRespondingClick": "stopRespondingClick"; "promptChange": "promptChange"; }, ["footerTemplate", "promptItemTemplate", "responseItemTemplate", "promptSuggestionItemTemplate", "bannerTemplate", "childViews"], ["*"]>;
}
