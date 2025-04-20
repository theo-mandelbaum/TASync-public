import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class RibbonItemDirective extends ComplexBase<RibbonItemDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the type of control to be added as the Ribbon Item.
     * @isenumeration true
     * @default RibbonItemType.Button
     * @asptype RibbonItemType
     */
    type: any;
    /**
     * Defines the active size of the ribbon item.
     * @default 'Medium'
     * @aspnumberenum
     */
    activeSize: any;
    /**
     * Defines the sizes that are allowed for the ribbon item on ribbon resize.
     * @default null
     * @aspnumberenum
     */
    allowedSizes: any;
    /**
     * Defines the settings for the ribbon button.
     * @default {}
     */
    buttonSettings: any;
    /**
     * Defines the settings for the ribbon checkbox.
     * @default {}
     */
    checkBoxSettings: any;
    /**
     * Defines the settings for the ribbon color picker.
     * @default {}
     */
    colorPickerSettings: any;
    /**
     * Defines the settings for the ribbon combobox.
     * @default {}
     */
    comboBoxSettings: any;
    /**
     * Defines one or more CSS classes to customize the appearance of item.
     * @default ''
     */
    cssClass: any;
    /**
     * Defines whether the item is disabled or not.
     * @default false
     */
    disabled: any;
    /**
     * Defines the display options for the ribbon item.
     * @default 'Auto'
     * @aspnumberenum
     */
    displayOptions: any;
    /**
     * Defines the settings for the ribbon dropdown button.
     * @default {}
     */
    dropDownSettings: any;
    /**
     * Defines the properties of the gallery view in Ribbon.
     * @default {}
     */
    gallerySettings: any;
    /**
     * Defines the properties for group button in Ribbon
     * @default {}
     */
    groupButtonSettings: any;
    /**
     * Defines a unique identifier for the item.
     * @default ''
     */
    id: any;
    /**
     * Defines the key tip text to be accessed for specified Ribbon item.
     * @default ''
     */
    keyTip: any;
    /**
     * Defines the settings for the tooltip of the item.
     * @default {}
     */
    ribbonTooltipSettings: any;
    /**
     * Defines the settings for the ribbon split button.
     * @default {}
     */
    splitButtonSettings: any;
    /**
     * Defines the template content for the ribbon item.
     * `ActiveSize` property is passed as string in template context.
     * @default ''
     * @angulartype string | object | HTMLElement
     * @reacttype string | function | JSX.Element | HTMLElement
     * @vuetype string | function | HTMLElement
     * @asptype string
     */
    itemTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonItemDirective, "e-ribbon-item", never, { "activeSize": "activeSize"; "allowedSizes": "allowedSizes"; "buttonSettings": "buttonSettings"; "checkBoxSettings": "checkBoxSettings"; "colorPickerSettings": "colorPickerSettings"; "comboBoxSettings": "comboBoxSettings"; "cssClass": "cssClass"; "disabled": "disabled"; "displayOptions": "displayOptions"; "dropDownSettings": "dropDownSettings"; "gallerySettings": "gallerySettings"; "groupButtonSettings": "groupButtonSettings"; "id": "id"; "itemTemplate": "itemTemplate"; "keyTip": "keyTip"; "ribbonTooltipSettings": "ribbonTooltipSettings"; "splitButtonSettings": "splitButtonSettings"; "type": "type"; }, {}, ["itemTemplate"]>;
}
/**
 * RibbonItem Array Directive
 * @private
 */
export declare class RibbonItemsDirective extends ArrayBase<RibbonItemsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonItemsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonItemsDirective, "e-ribbon-items", never, {}, {}, ["children"]>;
}
