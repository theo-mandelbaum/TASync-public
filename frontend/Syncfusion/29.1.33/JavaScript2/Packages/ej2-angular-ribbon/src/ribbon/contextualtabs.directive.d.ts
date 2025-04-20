import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the Angular Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```html
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab>
 *    </e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
export declare class RibbonContextualTabDirective extends ComplexBase<RibbonContextualTabDirective> {
    private viewContainerRef;
    directivePropList: any;
    childTabs: any;
    tags: string[];
    /**
     * Specifies whether the contextual tab is selected.
     * @default false
     */
    isSelected: any;
    /**
     * Defines the tab groups to be rendered in ribbon.
     * @default []
     * @asptype List<RibbonTab>
     */
    tabs: any;
    /**
     * Specifies whether the contextual tab is visible.
     * @default false
     */
    visible: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonContextualTabDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonContextualTabDirective, "e-ribbon-contextual-tab", never, { "isSelected": "isSelected"; "tabs": "tabs"; "visible": "visible"; }, {}, ["childTabs"]>;
}
/**
 * RibbonContextualTab Array Directive
 * @private
 */
export declare class RibbonContextualTabsDirective extends ArrayBase<RibbonContextualTabsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonContextualTabsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonContextualTabsDirective, "e-ribbon-contextual-tabs", never, {}, {}, ["children"]>;
}
