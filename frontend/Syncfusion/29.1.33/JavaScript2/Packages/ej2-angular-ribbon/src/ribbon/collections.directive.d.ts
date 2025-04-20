import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class RibbonCollectionDirective extends ComplexBase<RibbonCollectionDirective> {
    private viewContainerRef;
    directivePropList: any;
    childItems: any;
    tags: string[];
    /**
     * Defines one or more CSS classes to customize the appearance of collection.
     * @default ''
     */
    cssClass: any;
    /**
     * Defines a unique identifier for the collection.
     * @default ''
     */
    id: any;
    /**
     * Defines the list of ribbon items.
     * @default []
     * @asptype List<RibbonItem>
     */
    items: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonCollectionDirective, "e-ribbon-collection", never, { "cssClass": "cssClass"; "id": "id"; "items": "items"; }, {}, ["childItems"]>;
}
/**
 * RibbonCollection Array Directive
 * @private
 */
export declare class RibbonCollectionsDirective extends ArrayBase<RibbonCollectionsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonCollectionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonCollectionsDirective, "e-ribbon-collections", never, {}, {}, ["children"]>;
}
