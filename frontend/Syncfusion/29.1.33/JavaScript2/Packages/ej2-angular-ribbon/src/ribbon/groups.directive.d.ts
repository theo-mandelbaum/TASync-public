import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export declare class RibbonGroupDirective extends ComplexBase<RibbonGroupDirective> {
    private viewContainerRef;
    directivePropList: any;
    childCollections: any;
    tags: string[];
    /**
     * Defines the list of ribbon collections.
     * @default []
     * @asptype List<RibbonCollection>
     */
    collections: any;
    /**
     * Defines one or more CSS classes to customize the appearance of group.
     * @default ''
     */
    cssClass: any;
    /**
     * Defines whether to add a separate popup for the overflow items in the group.
     * If it is set to false, the overflow items will be shown in the common overflow popup present at the right end of the tab content.
     * @default false
     */
    enableGroupOverflow: any;
    /**
     * Defines the CSS class for the icons to be shown in the group overflow dropdown button in classic mode.
     * During overflow, the entire group will be shown in a popup of a dropdown button which appears in the place of the group in ribbon tab.
     * @default ''
     */
    groupIconCss: any;
    /**
     * Defines the content of group header.
     * @default ''
     */
    header: any;
    /**
     * Defines a unique identifier for the group.
     * @default ''
     */
    id: any;
    /**
     * Defines whether the group is in collapsed state or not during classic mode.
     * @default false
     */
    isCollapsed: any;
    /**
     * Defines whether the group can be collapsed on resize during classic mode.
     * @default true
     */
    isCollapsible: any;
    /**
     * Specifies the keytip content.
     * @default ''
     */
    keyTip: any;
    /**
     * Specifies the keytip content for launcher icon.
     * @default ''
     */
    launcherIconKeyTip: any;
    /**
     * Defines whether to orientation in which the items of the group should be arranged.
     * @isenumeration true
     * @default ItemOrientation.Column
     * @asptype ItemOrientation
     */
    orientation: any;
    /**
     * Defines the header shown in overflow popup of Ribbon group.
     * @default ''
     */
    overflowHeader: any;
    /**
     * Defines the priority order at which the group should be collapsed or expanded.
     * For collapsing value is fetched in ascending order and for expanding value is fetched in descending order.
     * @default 0
     */
    priority: any;
    /**
     * Defines whether to show or hide the launcher icon for the group.
     * @default false
     */
    showLauncherIcon: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonGroupDirective, "e-ribbon-group", never, { "collections": "collections"; "cssClass": "cssClass"; "enableGroupOverflow": "enableGroupOverflow"; "groupIconCss": "groupIconCss"; "header": "header"; "id": "id"; "isCollapsed": "isCollapsed"; "isCollapsible": "isCollapsible"; "keyTip": "keyTip"; "launcherIconKeyTip": "launcherIconKeyTip"; "orientation": "orientation"; "overflowHeader": "overflowHeader"; "priority": "priority"; "showLauncherIcon": "showLauncherIcon"; }, {}, ["childCollections"]>;
}
/**
 * RibbonGroup Array Directive
 * @private
 */
export declare class RibbonGroupsDirective extends ArrayBase<RibbonGroupsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RibbonGroupsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RibbonGroupsDirective, "e-ribbon-groups", never, {}, {}, ["children"]>;
}
