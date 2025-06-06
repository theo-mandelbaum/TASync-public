import { DiagramElement } from '../core/elements/diagram-element';
import { PathElement } from '../core/elements/path-element';
import { ImageElement } from '../core/elements/image-element';
import { TextElement } from '../core/elements/text-element';
import { Container } from '../core/containers/container';
import { PointModel } from '../primitives/point-model';
import { ConnectorModel } from '../objects/connector-model';
import { SnapSettingsModel } from '../../diagram/diagram/grid-lines-model';
import { BackgroundModel } from '../../diagram/diagram/page-settings-model';
import { PathAttributes, LineAttributes } from './canvas-interface';
import { RectAttributes, BaseAttributes } from './canvas-interface';
import { RendererAction, FlipDirection, FlipMode } from '../enum/enum';
import { ThumbsConstraints, SelectorConstraints } from '../enum/enum';
import { TransformFactor as Transforms } from '../interaction/scroller';
import { SelectorModel } from '../objects/node-model';
import { IRenderer } from './../rendering/IRenderer';
import { OrthogonalSegment } from '../objects/connector';
import { RulerSettingsModel } from '../diagram/ruler-settings-model';
import { RulerModel } from '../../ruler';
import { Actions } from '../interaction/actions';
/**
 * Renderer module is used to render basic diagram elements
 */
/** @private */
export declare class DiagramRenderer {
    /**   @private  */
    renderer: IRenderer;
    private diagramId;
    /** @private */
    isSvgMode: Boolean;
    /** @private */
    touchMove: boolean;
    private svgRenderer;
    private nativeSvgLayer;
    private diagramSvgLayer;
    private iconSvgLayer;
    /** @private */
    adornerSvgLayer: SVGSVGElement;
    /** @private */
    rendererActions: RendererAction;
    private groupElement;
    private element;
    private transform;
    constructor(name: string, svgRender: IRenderer, isSvgMode: boolean);
    /**
     * Method used to set the cur \
     *
     *  @param {HTMLElement} canvas - Provide the canvas .
     *  @param {string} cursor - Provide the element .
     * @returns {void }   Method used to set the layer  .\
     * @private
     */
    setCursor(canvas: HTMLElement, cursor: string): void;
    /**
     * Method used to set the layer \
     *
     * @returns {void }   Method used to set the layer  .\
     *
     * @private
     */
    setLayers(): void;
    private getAdornerLayer;
    private getParentSvg;
    private getParentElement;
    private getGroupElement;
    /**
     * Method used to render the diagram element \
     *
     * @returns {void }   Method used to render the diagram element  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the canvas value.
     * @param {HTMLElement } htmlLayer - Provide the HTMLElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {SVGSVGElement} parentSvg - Provide the SVGSVGElement value.
     * @param {boolean } createParent - Provide the boolean value.
     * @param {boolean } fromPalette - Provide the boolean value.
     * @param {number } indexValue - Provide the indexValue value.
     * @param {boolean } isPreviewNode - Provide the isPreviewNode value.
     * @param {object } centerPoint - Provide the centerPoint value.
     * @param {object} portCenterPoint - Provide the portCenterPoint value.
     * @private
     */
    renderElement(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, htmlLayer: HTMLElement, transform?: Transforms, parentSvg?: SVGSVGElement, createParent?: boolean, fromPalette?: boolean, indexValue?: number, isPreviewNode?: boolean, centerPoint?: object, portCenterPoint?: object): void;
    /**
     * Method used to draw the selection rectangle for the node \
     *
     * @returns {void }  Method used to draw the selection rectangle for the node  .\
     *
     * @param {number} x - Provide the DiagramElement value.
     * @param {number } y - Provide the SVGElement value.
     * @param {number } w - Provide the Transforms value.
     * @param {number } h - Provide the Transforms value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the Transforms value.
     * @param {number } t - Provide the Transforms value.
     * @private
     */
    drawSelectionRectangle(x: number, y: number, w: number, h: number, canvas: HTMLCanvasElement | SVGElement, t: Transforms): void;
    /**
     * Method used to render the highlighter \
     *
     * @returns {void }  Method used to render the highlighter  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @private
     */
    renderHighlighter(element: DiagramElement, canvas: SVGElement, transform: Transforms): void;
    /**
     * Method used to render the node selection rectangle \
     *
     * @returns {void }  Method used to render the node selection rectangle  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {number } isFirst - Provide the boolean value.
     * @private
     */
    renderSelectionRectangle(element: DiagramElement, canvas: SVGElement, transform: Transforms, isFirst: boolean): void;
    /**
     * Method used to render the selection line for connector  \
     *
     * @returns {void } Method used to render the selection line for connector .\
     *
     * @param {PathElement} element - Provide the path element of the diagram .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value.
     * @param { boolean } isFirst - Provide the boolean value.
     * @private
     */
    renderSelectionLine(element: PathElement, canvas: HTMLCanvasElement | SVGElement, transform: Transforms, isFirst: boolean): void;
    /**
     * Method used to render the stack highlighter \
     *
     * @returns {void }  Method used to render the stack highlighter  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {boolean} isVertical - Provide the Boolean value.
     * @param {PointModel } position - Provide the PointModel value.
     * @param {boolean } isUml - Provide the boolean value.
     * @param {boolean } isSwimlane - Provide the boolean value.
     * @private
     */
    renderStackHighlighter(element: DiagramElement, canvas: SVGElement, transform: Transforms, isVertical: boolean, position: PointModel, isUml?: boolean, isSwimlane?: boolean): void;
    /**
     * Method used to draw the line \
     *
     * @returns {void }  Method used to draw the line  .\
     *
     * @param {SVGElement} canvas - Provide the SVGElement value.
     * @param {LineAttributes } options - Provide the LineAttributes value.
     * @private
     */
    drawLine(canvas: SVGElement, options: LineAttributes): void;
    /**
     * Method used to draw the path \
     *
     * @returns {void }  Method used to draw the path  .\
     *
     * @param {SVGElement} canvas - Provide the canvas value.
     * @param {PathAttributes } options - Provide the PathAttributes value.
     * @private
     */
    drawPath(canvas: SVGElement, options: PathAttributes): void;
    /**
     * Method used to render the resize handle \
     *
     * @returns {void }  Method used to render the resize handle  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param {  ThumbsConstraints } constraints - Provide the constraints value  .
     * @param { number} currentZoom - Provide the currentZoom value.
     * @param { SelectorConstraints } selectorConstraints - Provide the selectorConstraints value .
     * @param { Transforms } transform - Provide the transform  value.
     * @param { boolean } canMask - Provide the canMask boolean value.
     * @param { number } enableNode - Provide the enableNode value.
     * @param { boolean } nodeConstraints - Provide the nodeConstraints  value.
     * @param { boolean } isSwimlane - Provide the isSwimlane boolean value.
     * @param { number } handleSize - Provide the handleSize value.
     * @private
     */
    renderResizeHandle(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, currentZoom: number, selectorConstraints?: SelectorConstraints, transform?: Transforms, canMask?: boolean, enableNode?: number, nodeConstraints?: boolean, isSwimlane?: boolean, handleSize?: number): void;
    /**
     * Method used to render the end point of the handle \
     *
     * @returns {void }  Method used to render the end point of the handle  .\
     *
     * @param {ConnectorModel} selector - Provide the ConnectorModel.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the element.
     * @param {  ThumbsConstraints } constraints - Provide the constraints value  .
     * @param { SelectorConstraints} selectorConstraints - Provide the selectorConstraints value.
     * @param { Transforms } transform - Provide the transform value .
     * @param { boolean } connectedSource - Provide the connectedSource boolean value.
     * @param { boolean } connectedTarget - Provide the connectedTarget boolean value.
     * @param { boolean } isSegmentEditing - Provide the isSegmentEditing boolean value.
     * @param { boolean } canShowBezierPoints - Provide the canShowBezierPoints boolean value.
     * @param {number} handleSize - Provide the handleSize value.
     * @private
     */
    renderEndPointHandle(selector: ConnectorModel, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, selectorConstraints: SelectorConstraints, transform: Transforms, connectedSource: boolean, connectedTarget?: boolean, isSegmentEditing?: boolean, canShowBezierPoints?: boolean, handleSize?: number): void;
    /**
     * Method used to render the orthogonal thumb \
     *
     * @returns {void }  Method used to render the orthogonal thumb  .\
     *
     * @param {string} id - Provide the id for the element.
     * @param {DiagramElement } selector - Provide the selector element.
     * @param {  OrthogonalSegment } segment - Provide the segment value  .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { boolean } visibility - Provide the visibility value .
     * @param { Transforms } t - Provide the Transforms value.
     * @param { ConnectorModel } connector - Provide the connector value.
     * @private
     */
    renderOrthogonalThumbs(id: string, selector: DiagramElement, segment: OrthogonalSegment, canvas: HTMLCanvasElement | SVGElement, visibility: boolean, t: Transforms, connector: ConnectorModel): void;
    /**
     * Method used to render the orthogonal thumb \
     *
     * @returns {void }  Method used to render the orthogonal thumb  .\
     *
     * @param {string} id - Provide the id for the element.
     * @param {DiagramElement } selector - Provide the selector element.
     * @param {  Transforms } x - Provide the x value  .
     * @param { Transforms } y - Provide the y value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible boolean value.
     * @param { string } orientation - Provide the orientation value.
     * @param { Transforms } t - Provide the Transforms value.
     * @param { ConnectorModel } connector - Provide the connector value.
     * @param { string } direction - Provide the direction of the segment.
     * @private
     */
    renderOrthogonalThumb(id: string, selector: DiagramElement, x: number, y: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, orientation: string, t: Transforms, connector: ConnectorModel, direction: string): void;
    /**
     * Method used to render the pivot line line\
     *
     * @returns {void } Method used to render the pivot line line .\
     *
     * @param {DiagramElement} element - Provide the diagram element value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param {  Transforms } transform - Provide the transform value  .
     * @param { SelectorConstraints } selectorConstraints - Provide the selector constraints value.
     * @param { boolean } canMask - Provide the canMask boolean value.
     * @private
     */
    renderPivotLine(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**
     * Method used to render the bezier line for the connector  \
     *
     * @returns {void } Method used to render the bezier line for the connector .\
     *
     * @param {string} id - Provide the id value for the bezier line.
     * @param { DiagramElement } wrapper - Provide the wrapper for the element.
     * @param {  HTMLCanvasElement | SVGElement } canvas - Provide the canvas element  .
     * @param { PointModel } start - Provide the pointmodel value.
     * @param { PointModel } end - Provide the pointmodel value.
     * @param { Transforms } transform - Provide the itransform value .
     * @private
     */
    renderBezierLine(id: string, wrapper: DiagramElement, canvas: HTMLCanvasElement | SVGElement, start: PointModel, end: PointModel, transform?: Transforms): void;
    /**
     * Method used to render the circular handle for the node element  \
     *
     * @returns {void } Method used to render the circular handle for the node element .\
     *
     * @param {string} id - Provide the id value.
     * @param { DiagramElement } selector - Provide the selector element value.
     * @param { number } cx - Provide cx value  .
     * @param { number } cy - Provide cx value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible property for the handle .
     * @param { number } enableSelector - Provide the value for the enableSelector .
     * @param { Transforms } t - Provide the transform value .
     * @param { boolean } connected - Provide the connected boolean value .
     * @param { boolean } canMask - Provide the canMask boolean value .
     * @param { Object } ariaLabel - Provide the label properties .
     * @param { number } count - Provide the count value  .
     * @param { string } className - Provide the class name for this element .
     * @param { number } handleSize - Provide the handle size value .
     *
     * @private
     */
    renderCircularHandle(id: string, selector: DiagramElement, cx: number, cy: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, enableSelector?: number, t?: Transforms, connected?: boolean, canMask?: boolean, ariaLabel?: Object, count?: number, className?: string, handleSize?: number): void;
    private updateResizeHandle;
    /**
     * Method used to render the segment thumb shape for Bezier connector  \
     *
     * @returns {void } Method used to render the segment thumb shape for Bezier connector .\
     *
     * @param {string} id - Provide the id value.
     * @param { DiagramElement } selector - Provide the selector element value.
     * @param { number } cx - Provide cx value  .
     * @param { number } cy - Provide cx value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible property for the handle .
     * @param { ConnectorModel } connector - Provide the value for the connector .
     * @param { Transforms } t - Provide the transform value .
     * @param { boolean } connected - Provide the connected boolean value .
     * @param { boolean } canMask - Provide the canMask boolean value .
     * @param { number } count - Provide the count value  .
     * @param { string } className - Provide the class name for this element .
     * @param { number } handleSize - Provide the handle size value .
     *
     * @private
     */
    renderBezierHandle(id: string, selector: DiagramElement, cx: number, cy: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, connector?: ConnectorModel, t?: Transforms, connected?: boolean, canMask?: boolean, count?: number, className?: string, handleSize?: number): void;
    private updateSegmentPosition;
    /**
     * Method used to render border for the node element  \
     *
     * @returns {void } Method used to render border for the node element .\
     *
     * @param {SelectorModel} selector - Provide the selector model instance.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { number } enableNode - Provide enableNode boolean value.
     * @param { boolean } isBorderTickness - Provide the thickness value for the node.
     * @param { boolean } isSwimlane - Provide the isSwimlane boolean value .
     * @private
     */
    renderBorder(selector: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, enableNode?: number, isBorderTickness?: boolean, isSwimlane?: boolean): void;
    /**
     * Method used to render user handle for the node element\
     *
     * @returns {void } Method used to render user handle for the node element .\
     *
     * @param {SelectorModel} selectorItem - Provide the selector model instance.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value.
     * @param { HTMLElement } diagramUserHandlelayer - Provide the HTMLElement value.
     * @param { Actions } currentAction - Provide the currentAction value.
     * @param { boolean } inAction - Provide the inAction value.
     * @private
     */
    renderUserHandler(selectorItem: SelectorModel, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, diagramUserHandlelayer?: HTMLElement, currentAction?: Actions, inAction?: boolean): void;
    /**
     * Method used to render rotate thumb of the diagramnode element  \
     *
     * @returns {void } Method used to render rotate thumb of the diagramnode element .\
     *
     * @param {DiagramElement} wrapper - Provide the wrapper  element value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SelectorConstraints } selectorConstraints - Provide the selectorConstraints value.
     * @param { boolean } canMask - Provide the boolean value .
     * @private
     */
    renderRotateThumb(wrapper: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**
     * Method used to render the path element for the diagram  \
     *
     * @returns {void } Method used to render the path element for the diagram .\
     *
     * @param {PathElement} element - Provide the path element of the diagram .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the parent SVG element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @param { boolean } isPreviewNode - Provide the boolean value .
     * @param {object} portCenterPoint - provide the portCenterPoint value.
     * @private
     */
    renderPathElement(element: PathElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean, isPreviewNode?: boolean, portCenterPoint?: object): void;
    private findAndStoreArcValues;
    /**
     * Method used to update the grid line for the diagram  \
     *
     * @returns {void } Method used to update the grid line for the diagram .\
     *
     * @param {SnapSettingsModel} snapSettings - Provide the snapsetting value of the diagram .
     * @param { SVGSVGElement } gridSvg - Provide the SVG grid  element value.
     * @param { Transforms } t - Provide the transform value  .
     * @param { RulerSettingsModel } rulerSettings - Provide the ruler setting property .
     * @param { RulerModel } hRuler - Provide the horizontal ruler property value .
     * @param { RulerModel } vRuler - Provide the vertical ruler property value .
     * @private
     */
    renderSvgGridlines(snapSettings: SnapSettingsModel, gridSvg: SVGElement, t: Transforms, rulerSettings: RulerSettingsModel, hRuler: RulerModel, vRuler: RulerModel): void;
    private horizontalSvgGridlines;
    private renderDotGrid;
    private verticalSvgGridlines;
    /**
     * Method used to update the grid line for the diagram  \
     *
     * @returns {void } Method used to update the grid line for the diagram .\
     *
     * @param {SnapSettingsModel} snapSettings - Provide the snapsetting value of the diagram .
     * @param { SVGSVGElement } svgGrid - Provide the SVG grid  element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { RulerSettingsModel } rulerSettings - Provide the ruler setting property .
     * @param { RulerModel } hRuler - Provide the horizontal ruler property value .
     * @param { RulerModel } vRuler - Provide the vertical ruler property value .
     * @private
     */
    updateGrid(snapSettings: SnapSettingsModel, svgGrid: SVGSVGElement, transform: Transforms, rulerSettings: RulerSettingsModel, hRuler: RulerModel, vRuler: RulerModel): void;
    private updateLineIntervals;
    private scaleSnapInterval;
    /**
     * Method used to render the text element  \
     *
     * @returns {void }Method used to render the text element  .\
     *
     * @param {TextElement} element - Provide the text element .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @param { object } centerPoint - Provide the center point value .
     * @private
     */
    renderTextElement(element: TextElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean, centerPoint?: object): void;
    private renderNativeElement;
    private renderHTMLElement;
    /**
     * Method used to render the image element  \
     *
     * @returns {void }Method used to render the image element  .\
     *
     * @param {ImageElement} element - Provide the image element .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @private
     */
    renderImageElement(element: ImageElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, fromPalette?: boolean): void;
    /**
     * Method used to render the container  \
     *
     * @returns {void} Method used to render the container .\
     *
     * @param {Container} group - Provide the container .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { HTMLElement } htmlLayer - Provide the html layer element  .
     * @param { Transforms } transform - Provide the transform value .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } createParent - Provide the boolean value .
     * @param { boolean } fromPalette - Provide the boolean value  .
     * @param { number } indexValue - Provide the indexValue value .
     * @param { boolean } isPreviewNode - Provide the boolean value .
     * @param { object } centerPoint - Provide the centerPoint value .
     * @param {object} portCenterPoint - provide the portCenterPoint value.
     * @private
     */
    renderContainer(group: Container, canvas: HTMLCanvasElement | SVGElement, htmlLayer: HTMLElement, transform?: Transforms, parentSvg?: SVGSVGElement, createParent?: boolean, fromPalette?: boolean, indexValue?: number, isPreviewNode?: boolean, centerPoint?: object, portCenterPoint?: object): void;
    /**
     * Method used to flip the text element   \
     *
     * @returns {void} Method used to flip the text element.\
     *
     * @param {DiagramElement} element - Provide the node element.
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the text canvas element.
     * @param { DiagramElement } textElement - Provide the text element.
     * @param { FlipDirection } flip - Provide the node flip direction.
     * @param { FlipMode } flipMode - Provide the node flipMode.
     * @param { boolean } isCanvasMode - Provide the isCanvas mode.
     */
    renderFlipTextElement(element: DiagramElement, canvas: SVGElement | HTMLCanvasElement, textElement: DiagramElement, flip: FlipDirection, flipMode: FlipMode, isCanvasMode?: boolean): object;
    renderFlipElement(element: DiagramElement, canvas: SVGElement | HTMLCanvasElement, flip: FlipDirection, isCanvasMode?: boolean): object;
    private setFlipAttributes;
    /**
     * Calculates Flipped Position of textElement considering annotation offset
     *
     * @returns {PointModel} - flipped point of textElement current point
     *
     * @param {NodeModel} element - Provide node wrapper element containing the text element.
     * @param {TextElement} textElement - Provide the textElememt to flip.
     * @param {PointModel} labelPos - Provide the annotation offset.
     * @param {FlipDirection} flip - Provide the node flip direction.
     */
    private flipLabel;
    /**
     * Method used to check the native parent  \
     *
     * @returns {void} Method used to check the native parent .\
     *
     * @param { DiagramElement[]} children - Provide the diagram element .
     * @param { number} count - Provide the count value .
     * @private
     */
    hasNativeParent(children: DiagramElement[], count?: number): DiagramElement;
    /**
     * Method used the draw the reactangle for the diagram  \
     *
     * @returns {void} Method used the draw the reactangle for the diagram .\
     *
     * @param { SVGElement} element - Provide the SVG elements .
     * @param { RectAttributes} canvas - Provide the Canvas element  .
     * @param { RectAttributes} transform - Provide transform value for the node  .
     * @param { RectAttributes} parentSvg -provide the parent SVG  .
     * @param { RectAttributes} isPreviewNode - Provide the preview boolean value  .
     * @private
     */
    renderRect(element: DiagramElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, parentSvg?: SVGSVGElement, isPreviewNode?: boolean): void;
    /**
     * Method used the draw the reactangle for the diagram  \
     *
     * @returns {void} Method used the draw the reactangle for the diagram .\
     *
     * @param { SVGElement} canvas - Provide the SVG elements .
     * @param { RectAttributes} options - Provide the attributes to draw the rectangle  .
     * @private
     */
    drawRect(canvas: SVGElement, options: RectAttributes): void;
    /**
     * Will get the base attributes for all the elements  \
     *
     * @returns {BaseAttributes} Will get the base attributes for all the elements .\
     *
     * @param { DiagramElement} element - Provide the diagram elements .
     * @param { Transforms} transform - Provide the transform value for the  elements .
     * @param { boolean} isPreviewNode - Provide the preview boolean value.
     * @private
     */
    getBaseAttributes(element: DiagramElement, transform?: Transforms, isPreviewNode?: boolean): BaseAttributes;
    /**
     * Will render the SVG background image  \
     *
     * @returns {void} Will render the SVG background image  .\
     *
     * @param { Transforms} background - Provide the transforms values .
     * @param { boolean} diagramElement - Provide element for the daigram.
     * @param { boolean} x - Provide the rendering mode of the daigram.
     * @param { boolean} y - Provide the rendering mode of the daigram.
     * @param { boolean} width - Provide the rendering mode of the daigram.
     * @param { boolean} height - Provide the rendering mode of the daigram.
     * @private
     */
    static renderSvgBackGroundImage(background: BackgroundModel, diagramElement: HTMLElement, x: number, y: number, width: number, height: number): void;
    /**
     * Method used to transform the layer  \
     *
     *  @returns {boolean} Method used to transform the layer  .\
     *  @param { Transforms} transform - Provide the transforms values .
     *  @param { boolean} svgMode - Provide the rendering mode of the daigram.
     *  @private
     */
    transformLayers(transform: Transforms, svgMode: boolean): boolean;
    /**
     * Method used to update the nodes in the diagram  \
     *
     *  @returns {void} Method used to update the nodes in the diagram  .\
     *  @param { HTMLCanvasElement} element - Provide the diagram element .
     *  @param { HTMLCanvasElement} diagramElementsLayer - Provide the diagram layer element .
     *  @param { HTMLCanvasElement} htmlLayer -Provide the html element .
     *  @param { HTMLCanvasElement} transform - Provide the transform value .
     *  @param { HTMLCanvasElement} insertIndex - Provide the index value.
     *  @param { object} centerPoint - Provide the center point value.
     *  @param {object} portCenterPoint - provide the portCenterPoint value.
     *  @private
     */
    updateNode(element: DiagramElement, diagramElementsLayer: HTMLCanvasElement, htmlLayer: HTMLElement, transform?: Transforms, insertIndex?: number, centerPoint?: object, portCenterPoint?: object): void;
}
