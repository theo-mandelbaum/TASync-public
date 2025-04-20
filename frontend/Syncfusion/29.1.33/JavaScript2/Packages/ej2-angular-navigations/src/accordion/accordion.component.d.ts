import { ElementRef, ViewContainerRef, Renderer2, Injector, QueryList } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Accordion } from '@syncfusion/ej2-navigations';
import { AccordionItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Accordion Component.
 * ```html
 * <ejs-accordion></ejs-accordion>
 * ```
 */
export declare class AccordionComponent extends Accordion implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    clicked: any;
    created: any;
    destroyed: any;
    expanded: any;
    expanding: any;
    expandedIndicesChange: any;
    childItems: QueryList<AccordionItemsDirective>;
    tags: string[];
    /**
     * Specifies the header title template option for accordion items.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    headerTemplate: any;
    /**
     * Specifies the template option for accordion items.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    itemTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionComponent, "ejs-accordion", never, { "animation": "animation"; "dataSource": "dataSource"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "expandMode": "expandMode"; "expandedIndices": "expandedIndices"; "headerTemplate": "headerTemplate"; "height": "height"; "itemTemplate": "itemTemplate"; "items": "items"; "locale": "locale"; "width": "width"; }, { "clicked": "clicked"; "created": "created"; "destroyed": "destroyed"; "expanded": "expanded"; "expanding": "expanding"; "expandedIndicesChange": "expandedIndicesChange"; }, ["headerTemplate", "itemTemplate", "childItems"], ["div"]>;
}
