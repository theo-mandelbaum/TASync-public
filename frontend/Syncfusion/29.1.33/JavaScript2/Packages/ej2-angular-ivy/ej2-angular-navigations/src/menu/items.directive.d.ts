import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class MenuItemDirective extends ComplexBase<MenuItemDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the htmlAttributes property to support adding custom attributes to the menu items in the menu component.
     * @default null
     */
    htmlAttributes: any;
    /**
     * Defines class/multiple classes separated by a space for the menu Item that is used to include an icon.
     * Menu Item can include font icon and sprite image.
     * @default null
     */
    iconCss: any;
    /**
     * Specifies the id for menu item.
     * @default ''
     */
    id: any;
    /**
     * Specifies the sub menu items that is the array of MenuItem model.
     * @default []
     */
    items: any;
    /**
     * Specifies separator between the menu items. Separator are either horizontal or vertical lines used to group menu items.
     * @default false
     */
    separator: any;
    /**
     * Specifies text for menu item.
     * @default ''
     */
    text: any;
    /**
     * Specifies url for menu item that creates the anchor link to navigate to the url provided.
     * @default ''
     */
    url: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuItemDirective, "ejs-menu>e-menu-items>e-menu-item>", never, { "htmlAttributes": "htmlAttributes"; "iconCss": "iconCss"; "id": "id"; "items": "items"; "separator": "separator"; "text": "text"; "url": "url"; }, {}, never>;
}
/**
 * MenuItem Array Directive
 * @private
 */
export declare class MenuItemsDirective extends ArrayBase<MenuItemsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuItemsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuItemsDirective, "ejs-menu>e-menu-items", never, {}, {}, ["children"]>;
}
