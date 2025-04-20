import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class RibbonTabDirective extends ComplexBase<RibbonTabDirective> {
    private viewContainerRef;
    directivePropList: any;
    childGroups: any;
    tags: string[];
    /**
     * Defines one or more CSS classes to customize the appearance of tab.
     * @default ''
     */
    cssClass: any;
    /**
     * Defines the list of ribbon groups.
     * @default []
     * @asptype List<RibbonGroup>
     */
    groups: any;
    /**
     * Defines the content of tab header.
     * @default ''
     */
    header: any;
    /**
     * Defines a unique identifier for the tab.
     * @default ''
     */
    id: any;
    /**
     * Specifies the keytip content.
     * @default ''
     */
    keyTip: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonTabDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonTabDirective, "e-ribbon-tab", never, { "cssClass": "cssClass"; "groups": "groups"; "header": "header"; "id": "id"; "keyTip": "keyTip"; }, {}, ["childGroups"]>;
}
/**
 * RibbonTab Array Directive
 * @private
 */
export declare class RibbonTabsDirective extends ArrayBase<RibbonTabsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonTabsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonTabsDirective, "e-ribbon-tabs", never, {}, {}, ["children"]>;
}
