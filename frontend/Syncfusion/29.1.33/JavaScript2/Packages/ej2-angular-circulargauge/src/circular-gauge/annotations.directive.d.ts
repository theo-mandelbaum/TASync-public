import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```html
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Sets and gets the angle for annotation with respect to axis in circular gauge.
     * @default 90
     */
    angle: any;
    /**
     * Enables and disables the rotation of the annotation along the axis.
     * @default false
     */
    autoAngle: any;
    /**
     * Sets and gets the information about annotation for assistive technology.
     * @default null
     */
    description: any;
    /**
     * Sets and gets the radius for annotation with respect to axis in circular gauge.
     * @default '50%'
     */
    radius: any;
    /**
     * Sets and gets the style of the text in annotation.
     */
    textStyle: any;
    /**
     * Sets and gets the z-index of an annotation in an axis in the circular gauge.
     * @default '-1'
     */
    zIndex: any;
    /**
     * Sets and gets the content of the annotation. This property accepts the HTML string or id of the custom element.
     * @default null
     * @asptype string
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationDirective, "e-annotations>e-annotation", never, { "angle": "angle"; "autoAngle": "autoAngle"; "content": "content"; "description": "description"; "radius": "radius"; "textStyle": "textStyle"; "zIndex": "zIndex"; }, {}, ["content"]>;
}
/**
 * Annotation Array Directive
 * @private
 */
export declare class AnnotationsDirective extends ArrayBase<AnnotationsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationsDirective, "ej-circulargauge>e-axes>e-axis>e-annotations", never, {}, {}, ["children"]>;
}
