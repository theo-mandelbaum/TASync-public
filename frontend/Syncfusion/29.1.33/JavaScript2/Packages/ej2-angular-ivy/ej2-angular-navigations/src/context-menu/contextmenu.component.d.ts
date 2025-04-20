import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { ContextMenu } from '@syncfusion/ej2-navigations';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular ContextMenu Component.
 * ```html
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ejs-contextmenu target='#target' [items]='menuItems'></ejs-contextmenu>
 * ```
 */
export declare class ContextMenuComponent extends ContextMenu implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    beforeClose: any;
    beforeItemRender: any;
    beforeOpen: any;
    created: any;
    onClose: any;
    onOpen: any;
    select: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContextMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContextMenuComponent, "ejs-contextmenu", never, { "animationSettings": "animationSettings"; "cssClass": "cssClass"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableScrolling": "enableScrolling"; "fields": "fields"; "filter": "filter"; "hoverDelay": "hoverDelay"; "itemTemplate": "itemTemplate"; "items": "items"; "locale": "locale"; "showItemOnClick": "showItemOnClick"; "target": "target"; "template": "template"; }, { "beforeClose": "beforeClose"; "beforeItemRender": "beforeItemRender"; "beforeOpen": "beforeOpen"; "created": "created"; "onClose": "onClose"; "onOpen": "onOpen"; "select": "select"; }, never, never>;
}
