import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Menu } from '@syncfusion/ej2-navigations';
import { MenuItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Menu Component.
 * ```html
 * <ejs-menu [items]='menuItems'></ejs-menu>
 * ```
 */
export declare class MenuComponent extends Menu implements IComponentBase {
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
    childItems: QueryList<MenuItemsDirective>;
    tags: string[];
    /**
     * Specifies the template for Menu item.
     * @default null
     * @asptype string
     */
    template: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuComponent, "ejs-menu", never, { "animationSettings": "animationSettings"; "cssClass": "cssClass"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableScrolling": "enableScrolling"; "fields": "fields"; "filter": "filter"; "hamburgerMode": "hamburgerMode"; "hoverDelay": "hoverDelay"; "items": "items"; "locale": "locale"; "orientation": "orientation"; "showItemOnClick": "showItemOnClick"; "target": "target"; "template": "template"; "title": "title"; }, { "beforeClose": "beforeClose"; "beforeItemRender": "beforeItemRender"; "beforeOpen": "beforeOpen"; "created": "created"; "onClose": "onClose"; "onOpen": "onOpen"; "select": "select"; }, ["template", "childItems"], never>;
}
