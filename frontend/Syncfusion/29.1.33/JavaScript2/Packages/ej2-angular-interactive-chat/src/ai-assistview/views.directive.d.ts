import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the Essential JS 2 Angular AIAssistView Component.
 * ```html
 * <ejs-aiassistview>
 *   <e-views>
 *     <e-view>
 *      </e-view>
 *    </e-views>
 * </ejs-aiassistview>
 * ```
 */
export declare class ViewDirective extends ComplexBase<ViewDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the type of the assist view.
     * @isenumeration true
     * @default AssistViewType.Assist
     * @asptype AssistViewType
     */
    type: any;
    /**
     * Specifies the icon CSS for the assist view.
     * Represents the CSS class for the icon of the assist view.
     * @default null
     */
    iconCss: any;
    /**
     * Specifies the name of the assist view.
     * Represents the name displayed in the assist view.
     * @default ''
     */
    name: any;
    /**
     * Specifies the template for the view of the assist view.
     * Represents the template for rendering the view, which can be a string or a function.
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    viewTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ViewDirective, "ejs-aiassistview>e-views>e-view", never, { "iconCss": "iconCss"; "name": "name"; "type": "type"; "viewTemplate": "viewTemplate"; }, {}, never>;
}
/**
 * View Array Directive
 * @private
 */
export declare class ViewsDirective extends ArrayBase<ViewsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ViewsDirective, "ejs-aiassistview>e-views", never, {}, {}, ["children"]>;
}
