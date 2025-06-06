import { PointModel } from './../primitives/point-model';
import { RectAttributes, PathAttributes, TextAttributes } from './canvas-interface';
import { ImageAttributes, StyleAttributes } from './canvas-interface';
import { BaseAttributes, LineAttributes, CircleAttributes, SubTextElement, TextBounds } from './canvas-interface';
import { LinearGradientModel, RadialGradientModel } from './../core/appearance-model';
import { IRenderer } from './../rendering/IRenderer';
import { DiagramNativeElement } from '../core/elements/native-element';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { TransformFactor as Transforms } from '../interaction/scroller';
/**
 * SVG Renderer
 */
/** @private */
export declare class SvgRenderer implements IRenderer {
    /**
     * Draw the shawdow  for the rectangle shape in diagram \
     *
     *  @returns {void}  Draw the shawdow  for the rectangle shape in diagram .\
     *
     *  @param { SVGElement} options - Provide the base attributes .
     *  @param { RectAttributes} canvas - Provide the canvas values .
     *  @param { string} collection - Provide the collection value.
     *  @param { boolean} parentSvg - Provide the parent SVG values .
     *  @private
     */
    renderShadow(options: BaseAttributes, canvas: SVGElement, collection?: Object[], parentSvg?: SVGSVGElement): void;
    /**
     * Return the dashed array values \
     *
     *  @returns {number[]}  Return the dashed array values .\
     *  @param { SVGElement} dashArray - Return the dashed array values .
     *  @private
     */
    parseDashArray(dashArray: string): number[];
    /**
     * Draw the Rectangle for the diagram \
     *
     *  @returns {void}  Draw the Rectangle for the diagram .\
     *
     *  @param { SVGElement} svg - Provide the SVG .
     *  @param { RectAttributes} options - Provide the Rect attributes .
     *  @param { string} diagramId - Provide the diagram id .
     *  @param { boolean} onlyRect - Provide the boolean attribute for the shawdow rendering  .
     *  @param { boolean} isSelector - Provide the selector possobilities .
     *  @param { SVGSVGElement} parentSvg - Provide the parent svg element .
     *  @param { Object} ariaLabel - Provide the Arial label attributes .
     *  @param { boolean} isCircularHandle - Provide the boolean attribute for the circular handle .
     *  @param { number} enableSelector - Provide the selector possobilities .
     *  @private
     */
    drawRectangle(svg: SVGElement, options: RectAttributes, diagramId: string, onlyRect?: boolean, isSelector?: boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object, isCircularHandle?: boolean, enableSelector?: number): void;
    /**
     * Update the diagram selection region \
     *
     *  @returns {void}  Update the diagram selection region .\
     *
     *  @param { SVGElement} gElement - Provide the element type.
     *  @param { RectAttributes} options - Provide the Rect attributes .
     *  @private
     */
    updateSelectionRegion(gElement: SVGElement, options: RectAttributes): void;
    /**
     * Create the g element for the diagram \
     *
     *  @returns {SVGGElement}   Create the g element for the diagram .\
     *
     *  @param { SVGElement} elementType - Provide the element type.
     *  @param { Object} attribute - Provide the attributes for the g element.
     *  @private
     */
    createGElement(elementType: string, attribute: Object): SVGGElement;
    /**
     * Draw the line for the diagram\
     *
     *  @returns {void}  Draw the line for the diagram .\
     *
     *  @param { SVGElement} gElement - Provide the g element .
     *  @param { LineAttributes} options - Provide the line element attributes .
     *  @private
     */
    drawLine(gElement: SVGElement, options: LineAttributes): void;
    /**
     * Draw the circle for the diagram\
     *
     *  @returns {void}  Draw the circle for the diagram .\
     *
     *  @param { SVGElement} gElement - Provide the g element .
     *  @param { CircleAttributes} options - Provide the circle element attributes .
     *  @param {string} enableSelector - Provide the selector constraints string .
     *  @param {Object} ariaLabel - Provide arial label value .
     *  @private
     */
    drawCircle(gElement: SVGElement, options: CircleAttributes, enableSelector?: number, ariaLabel?: Object): void;
    /**
     * Draw the path element for the diagram\
     *
     *  @returns {void}  Draw the path element for the diagram .\
     *
     *  @param { SVGElement} svg - Provide the SVG element .
     *  @param { PathAttributes} options - Provide the path element attributes .
     *  @param {string} diagramId - Provide the diagram id .
     *  @param {boolean} isSelector - Provide selector boolean value .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {Object} ariaLabel - Provide arial label value .
     *  @param {number} scale - Provide the scale value .
     *  @private
     */
    drawPath(svg: SVGElement, options: PathAttributes, diagramId: string, isSelector?: boolean, parentSvg?: SVGSVGElement, ariaLabel?: Object, scale?: number): void;
    /**
     * Draw the path element for the diagram\
     *
     *  @returns {void}  Draw the path element for the diagram .\
     *
     *  @param { SVGElement} svg - Provide the SVG element .
     *  @param {PathAttributes} options - Provide the path element attributes .
     *  @param {Object[]} collection - Provide the parent SVG element .
     *  @private
     */
    renderPath(svg: SVGElement, options: PathAttributes, collection: Object[]): void;
    private setSvgFontStyle;
    /**
     * Draw the text element for the diagram\
     *
     *  @returns {void}  Draw the text element for the diagram .\
     *
     *  @param { SVGElement} canvas - Provide the SVG element .
     *  @param {TextAttributes} options - Provide the text element attributes .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {Object} ariaLabel - Provide the label properties .
     *  @param {string} diagramId - Provide the diagram id .
     *  @param {number} scaleValue - Provide the scale value .
     *  @param {any} renderer - Provide the renderer value .
     *  @private
     */
    drawText(canvas: SVGElement, options: TextAttributes, parentSvg?: SVGSVGElement, ariaLabel?: Object, diagramId?: string, scaleValue?: number, renderer?: any): void;
    private alignText;
    private setText;
    /**
     * Draw the image element for the diagram\
     *
     *  @returns {void} Draw the image element for the diagram .
     *  @param { SVGElement | HTMLCanvasElement} canvas - Provide the SVG element .
     *  @param {ImageAttributes} obj - Provide the image attributes .
     *  @param {SVGSVGElement} parentSvg - Provide the parent SVG element .
     *  @param {boolean} fromPalette - Provide the pointer event value .
     *  @private
     */
    drawImage(canvas: SVGElement | HTMLCanvasElement, obj: ImageAttributes, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    /**
     * Draw the HTML element for the diagram\
     *
     *  @returns {void} Draw the native element for the diagram.
     *  @param {DiagramHtmlElement} element - Provide the element .
     *  @param {HTMLElement} canvas - Provide the canvas element  .
     *  @param {Transforms} transform - Provide the transform value .
     *  @param {boolean} value - Provide the pointer event value .
     *  @param {number} indexValue - Provide the index value .
     *  @private
     */
    drawHTMLContent(element: DiagramHtmlElement, canvas: HTMLElement, transform?: Transforms, value?: boolean, indexValue?: number): void;
    /**
     * Draw the native element for the diagram\
     *
     *  @returns {void} Draw the native element for the diagram.
     *  @param {DiagramNativeElement} element - Provide the node element .
     *  @param {HTMLCanvasElement} canvas - Provide the SVG element  .
     *  @param {number} height - Provide the height for the shape .
     *  @param {number} width - Provide the width for the shape .
     *  @param {SVGSVGElement} parentSvg - Provide the parent svg for  the shape .
     *  @private
     */
    drawNativeContent(element: DiagramNativeElement, canvas: HTMLCanvasElement | SVGElement, height: number, width: number, parentSvg: SVGSVGElement): void;
    private setNativTransform;
    /**
     *used to crop the given native element into a rectangle of the given size .\
     *
     *  @returns {SVGElement} used to crop the given native element into a rectangle of the given size.
     *  @param {DiagramNativeElement} node - Provide the node element .
     *  @param {SVGElement} group - Provide the SVG element  .
     *  @param {number} height - Provide the height for the shape .
     *  @param {number} width - Provide the width for the shape .
     *  @param {SVGSVGElement} parentSvg - Provide the parent svg for  the shape .
     *  @private
     */
    drawClipPath(node: DiagramNativeElement, group: SVGElement, height: number, width: number, parentSvg: SVGSVGElement): SVGElement;
    /**
     * Draw the gradient for the diagram shapes .\
     *
     *  @returns {SVGElement} Draw the gradient for the diagram shapes.
     *  @param {StyleAttributes} options - Provide the options  for the gradient  element .
     *  @param {SVGElement} svg - Provide the SVG element  .
     *  @param {string} diagramId - Provide the diagram id .
     *  @private
     */
    renderGradient(options: StyleAttributes, svg: SVGElement, diagramId?: string): SVGElement;
    /**
     * Draw the Linear gradient for the diagram .\
     *
     *  @returns {SVGElement} Draw the Linear gradient for the diagram.
     *  @param {LinearGradientModel} linear - Provide the objects for the gradient  element .
     *  @private
     */
    createLinearGradient(linear: LinearGradientModel): SVGElement;
    /**
     * Draw the radial gradient for the diagram .\
     *
     *  @returns {SVGElement} Draw the radial gradient for the diagram.
     *  @param {RadialGradientModel} radial - Provide the objects for the gradient  element .
     *  @private
     */
    createRadialGradient(radial: RadialGradientModel): SVGElement;
    /**
     * Set the SVG style for the SVG elements in the diagram.\
     *
     *  @returns {void}
     *  @param {SVGElement} svg - Provide the canvas element .
     *  @param {StyleAttributes} style - Provide the canvas element .
     *  @param {string} diagramId - Provide the canvas element .
     *  @private
     */
    setSvgStyle(svg: SVGElement, style: StyleAttributes, diagramId?: string): void;
    /**
     * Draw the SVG label.\
     *
     * @returns {PointModel} Draw the SVG label .
     *  @param {TextAttributes} text - Provide the canvas element .
     *  @param {Object} wrapBound - Provide the canvas element .
     *  @param {SubTextElement []} childNodes - Provide the canvas element .
     * @private
     */
    svgLabelAlign(text: TextAttributes, wrapBound: TextBounds, childNodes: SubTextElement[]): PointModel;
}
