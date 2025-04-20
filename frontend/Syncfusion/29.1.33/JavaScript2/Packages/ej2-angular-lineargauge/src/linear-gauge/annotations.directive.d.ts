import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to render and customize the annotations in the linear gauge.
 * ```html
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Sets and gets the axis index which places the annotation in the specified axis in the linear gauge.
     * @aspdefaultvalueignore
     * @default null
     */
    axisIndex: any;
    /**
     * Sets and gets the value of axis which places the annotation near the specified axis value.
     * @aspdefaultvalueignore
     * @default null
     */
    axisValue: any;
    /**
     * Sets and gets the options to customize the font of the annotation in linear gauge.
     */
    font: any;
    /**
     * Sets and gets the horizontal alignment of annotation.
     * @default None
     */
    horizontalAlignment: any;
    /**
     * Sets and gets the vertical alignment of annotation.
     * @default None
     */
    verticalAlignment: any;
    /**
     * Sets and gets the x position for the annotation in linear gauge.
     * @default 0
     */
    x: any;
    /**
     * Sets and gets the y position for the annotation in linear gauge.
     * @default 0
     */
    y: any;
    /**
     * Sets and gets the z-index of the annotation.
     * @default '-1'
     */
    zIndex: any;
    /**
     * Sets and gets the content for the annotation.
     * @default ''
     * @asptype string
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationDirective, "e-annotations>e-annotation", never, { "axisIndex": "axisIndex"; "axisValue": "axisValue"; "content": "content"; "font": "font"; "horizontalAlignment": "horizontalAlignment"; "verticalAlignment": "verticalAlignment"; "x": "x"; "y": "y"; "zIndex": "zIndex"; }, {}, ["content"]>;
}
/**
 * Annotation Array Directive
 * @private
 */
export declare class AnnotationsDirective extends ArrayBase<AnnotationsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AnnotationsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AnnotationsDirective, "ej-linear-gauge>e-annotations", never, {}, {}, ["children"]>;
}
