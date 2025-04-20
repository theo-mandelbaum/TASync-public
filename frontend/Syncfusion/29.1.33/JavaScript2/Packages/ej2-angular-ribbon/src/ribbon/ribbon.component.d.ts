import { ElementRef, ViewContainerRef, Renderer2, Injector, QueryList } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Ribbon } from '@syncfusion/ej2-ribbon';
import { RibbonTabsDirective } from './tabs.directive';
import { RibbonContextualTabsDirective } from './contextualtabs.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Essential JS 2 Angular Ribbon Component.
 * ```html
 * <ejs-ribbon></ejs-ribbon>
 * ```
 */
export declare class RibbonComponent extends Ribbon implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    created: any;
    launcherIconClick: any;
    overflowPopupClose: any;
    overflowPopupOpen: any;
    ribbonCollapsing: any;
    ribbonExpanding: any;
    ribbonLayoutSwitched: any;
    tabSelected: any;
    tabSelecting: any;
    childTabs: QueryList<RibbonTabsDirective>;
    childContextualTabs: QueryList<RibbonContextualTabsDirective>;
    tags: string[];
    /**
     * Specifies the template content for the help pane of ribbon.
     * The help pane appears on the right side of the ribbon header row.
     * @default ''
     * @angulartype string | object | HTMLElement
     * @reacttype string | function | JSX.Element | HTMLElement
     * @vuetype string | function | HTMLElement
     * @asptype string
     */
    helpPaneTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RibbonComponent, "ejs-ribbon", never, { "activeLayout": "activeLayout"; "backStageMenu": "backStageMenu"; "contextualTabs": "contextualTabs"; "cssClass": "cssClass"; "enableKeyTips": "enableKeyTips"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "fileMenu": "fileMenu"; "helpPaneTemplate": "helpPaneTemplate"; "hideLayoutSwitcher": "hideLayoutSwitcher"; "isMinimized": "isMinimized"; "launcherIconCss": "launcherIconCss"; "layoutSwitcherKeyTip": "layoutSwitcherKeyTip"; "locale": "locale"; "selectedTab": "selectedTab"; "tabAnimation": "tabAnimation"; "tabs": "tabs"; "width": "width"; }, { "created": "created"; "launcherIconClick": "launcherIconClick"; "overflowPopupClose": "overflowPopupClose"; "overflowPopupOpen": "overflowPopupOpen"; "ribbonCollapsing": "ribbonCollapsing"; "ribbonExpanding": "ribbonExpanding"; "ribbonLayoutSwitched": "ribbonLayoutSwitched"; "tabSelected": "tabSelected"; "tabSelecting": "tabSelecting"; }, ["helpPaneTemplate", "childTabs", "childContextualTabs"], ["div"]>;
}
