import { PdfViewer } from '../index';
import { PdfAnnotationBaseModel, PdfFormFieldBaseModel } from './pdf-annotation-model';
import { ZOrderPageTable } from './pdf-annotation';
import { Container, Rect, PointModel, ThumbsConstraints, BaseAttributes, CircleAttributes, IElement, SelectorConstraints } from '@syncfusion/ej2-drawings';
import { DrawingElement } from '@syncfusion/ej2-drawings';
import { Canvas } from '@syncfusion/ej2-drawings';
import { SelectorModel } from './selector-model';
import { AnnotationResizerLocation, AnnotationSelectorSettingsModel } from '../index';
/**
 * Renderer module is used to render basic diagram elements
 *
 * @hidden
 */
export declare class Drawing {
    private pdfViewer;
    private renderer;
    private svgRenderer;
    private isDynamicStamps;
    /**
     * @private
     */
    copiedElementID: string;
    /**
     * @private
     */
    isPasted: boolean;
    constructor(viewer: PdfViewer);
    /**
     * @private
     * @param {PdfViewer} viewer - Specified the pdfViewer element.
     * @returns {void}
     */
    renderLabels(viewer: PdfViewer): void;
    private createNewZindexTable;
    /**
     * @private
     * @param {number} pageId - Specified the page Id.
     * @returns {ZOrderPageTable} - Returns the ZOrder page table.
     */
    getPageTable(pageId: number): ZOrderPageTable;
    /**
     * @private
     * @param {number} index - Specified the page index value.
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @returns {void}
     */
    setZIndex(index: number, obj: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel | PdfFormFieldBaseModel} obj - Specified the annotation object.
     * @returns {PdfAnnotationBaseModel | PdfFormFieldBaseModel} - Returns the annotaion or form fields model.
     */
    initObject(obj: PdfAnnotationBaseModel | PdfFormFieldBaseModel): PdfAnnotationBaseModel | PdfFormFieldBaseModel;
    private initNode;
    /**
     * Allows to initialize the UI of a node
     */
    /**
     * @private
     * @param {PdfAnnotationBaseModel | PdfFormFieldBaseModel} obj - Specified the annotation object.
     * @param {Container} canvas - Specified the canvas element.
     * @returns {DrawingElement} - Returns the drawing element.
     */
    init(obj: PdfAnnotationBaseModel | PdfFormFieldBaseModel, canvas: Container): DrawingElement;
    private initFormFields;
    private initAnnotationObject;
    private textElement;
    /**
     * @private
     * @param {DrawingElement} obj - Specified the drawing element.
     * @param {PdfAnnotationBaseModel} node - Specified the node element.
     * @returns {void}
     */
    setNodePosition(obj: DrawingElement, node: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @returns {Container} - Returns the container element.
     */
    initContainer(obj: PdfAnnotationBaseModel): Container;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @returns {Canvas} - Returns the canvas element.
     */
    initLine(obj: PdfAnnotationBaseModel): Canvas;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @returns {PdfAnnotationBaseModel} - Returns the added annotaion object.
     */
    add(obj: PdfAnnotationBaseModel): PdfAnnotationBaseModel;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @returns {void}
     */
    remove(obj: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @param {number} pageIndex - Specified the page index.
     * @returns {PdfAnnotationBaseModel[]} - Returns the annotation base model collections.
     */
    getPageObjects(pageIndex: number): (PdfAnnotationBaseModel)[];
    /**
     * @private
     * @param {HTMLCanvasElement} diagramLayer - Specified the diagram layer element.
     * @param {number} pageIndex - Specified the page index.
     * @param {string} objectId - Specified the object id.
     * @returns {void}
     */
    refreshCanvasDiagramLayer(diagramLayer?: HTMLCanvasElement, pageIndex?: number, objectId?: string): void;
    private shouldRefreshElement;
    /**
     * @private
     * @param {number} index - Specified the page index.
     * @returns {void}
     */
    clearHighlighter(index?: number): void;
    /**
     * @private
     * @param {string} diagramId - Specified the diagram id.
     * @param {number} index - Specified the page index.
     * @returns {SVGSVGElement} Return the svg element.
     */
    getSelectorElement(diagramId: string, index?: number): SVGElement;
    /**
     * @private
     * @param {string} diagramId - Specified the diagram id.
     * @param {number} index - Specified the page index.
     * @returns {SVGSVGElement} Return the svg element.
     */
    getAdornerLayerSvg(diagramId: string, index?: number): SVGSVGElement;
    /**
     * @private
     * @param {number} index - Specified the page index.
     * @returns {void}
     */
    clearSelectorLayer(index?: number): void;
    /**
     * @private
     * @param {number} select - Specified the select value.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the annotation selector element.
     * @param {PdfAnnotationBaseModel} helper - Specified the annotation helper element.
     * @param {boolean} isSelect - Specified the is select or not.
     * @returns {void}
     */
    renderSelector(select?: number, currentSelector?: AnnotationSelectorSettingsModel, helper?: PdfAnnotationBaseModel, isSelect?: boolean): void;
    /**
     * Rotates the given nodes/connectors by the given angle
     *
     * @private
     * @param {PdfAnnotationBaseModel | SelectorModel} obj - Specified the objects to be rotated.
     * @param {number} angle - Specified the angle by which the objects have to be rotated.
     * @param {PointModel} pivot - Specified the reference point with reference to which the objects have to be rotated.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the current selector value.
     * @returns {void}
     */
    rotate(obj: PdfAnnotationBaseModel | SelectorModel, angle: number, pivot?: PointModel, currentSelector?: AnnotationSelectorSettingsModel): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel | SelectorModel} parent - Specified the annotation object.
     * @param {PdfAnnotationBaseModel[]} objects - Specified the annotation objects.
     * @param {number} angle - Specified the annotation angle.
     * @param {PointModel} pivot - Specified the pivot value.
     * @param {boolean} includeParent - Specified the include parent value.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the current selector value.
     * @returns {void}
     */
    rotateObjects(parent: PdfAnnotationBaseModel | SelectorModel, objects: PdfAnnotationBaseModel[], angle: number, pivot?: PointModel, includeParent?: boolean, currentSelector?: AnnotationSelectorSettingsModel): void;
    private getParentSvg;
    private shownBorder;
    /**
     * @private
     * @param {DrawingElement} selector - Specified the annotation selector object.
     * @param {HTMLCanvasElement | SVGElement} canvas - Specified the canvas element.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {Transforms} transform - Specfied the transform value.
     * @param {number} enableNode - Specified the node number.
     * @param {boolean} isBorderTickness - Specified is thickness or not.
     * @param {boolean} isSwimlane - Specified is swimlane annotation or not.
     * @param {boolean} isSticky - Specified is sticky annotation or not.
     * @returns {void}
     */
    renderBorder(selector: DrawingElement, canvas: HTMLCanvasElement | SVGElement, currentSelector?: any, transform?: Transforms, enableNode?: number, isBorderTickness?: boolean, isSwimlane?: boolean, isSticky?: boolean): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotation object.
     * @param {BaseAttributes} options - Specified the options value.
     * @param {boolean} isFormFieldSign - Specified is form field sign or not.
     * @returns {void}
     */
    getSignBorder(type: any, options: BaseAttributes, isFormFieldSign?: boolean): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotation object.
     * @param {BaseAttributes} options - Specified the base attributes.
     * @returns {void}
     */
    getBorderSelector(type: PdfAnnotationBaseModel, options: BaseAttributes): void;
    /**
     * @private
     * @param {string} id - Specified the annotaion id.
     * @param {DrawingElement} selector - Specified the drawing element.
     * @param {number} cx - Specified the cx number.
     * @param {number} cy - Specified the cy number.
     * @param {HTMLCanvasElement | SVGElement} canvas - Specified the html canvas element.
     * @param {boolean} visible - Specified the annotation visible or not.
     * @param {number} enableSelector - Specified the enable selector value.
     * @param {Transforms} t - Specified the transforms value.
     * @param {boolean} connected - Specified is connected or not.
     * @param {boolean} canMask - Specified is mask or not.
     * @param {object} ariaLabel - Specified the aria label object.
     * @param {number} count - Specified the count value.
     * @param {string} className - Specified the class name.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the annotation selector settings.
     * @returns {void}
     */
    renderCircularHandle(id: string, selector: DrawingElement, cx: number, cy: number, canvas: HTMLCanvasElement | SVGElement, visible: boolean, enableSelector?: number, t?: Transforms, connected?: boolean, canMask?: boolean, ariaLabel?: Object, count?: number, className?: string, currentSelector?: AnnotationSelectorSettingsModel): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotaion object.
     * @param {CircleAttributes} options - Specified the circle attributes value.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {Transforms} t - Specified the transforms value.
     * @returns {void}
     */
    getShapeSize(type: PdfAnnotationBaseModel, options: CircleAttributes, currentSelector: any, t?: Transforms): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotation object.
     * @param {any} currentSelector - Specified the current selector value.
     * @returns {AnnotationSelectorSettingsModel} - Specified the annotation selector settings model.
     */
    getShape(type: PdfAnnotationBaseModel, currentSelector?: any): AnnotationSelectorSettingsModel;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotaion object.
     * @param {CircleAttributes} options - Specified the circle attributes value.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {Transforms} t - Specified the transforms value.
     * @returns {void}
     */
    getResizerColors(type: PdfAnnotationBaseModel, options: CircleAttributes, currentSelector?: any, t?: Transforms): void;
    /**
     * @private
     * @param {DrawingElement} wrapper - Specified the drawing element.
     * @param {HTMLCanvasElement | SVGElement} canvas - Specified the canvas element.
     * @param {Transforms} transform - Specified the transform value.
     * @param {SelectorConstraints} selectorConstraints - Specified the selector constraints value.
     * @param {boolean} canMask - Specified the is mask or not.
     * @returns {void}
     */
    renderRotateThumb(wrapper: DrawingElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**
     * @private
     * @param {DrawingElement} element - Specified the drawing element.
     * @param {HTMLCanvasElement | SVGElement} canvas - Specified the canvas element.
     * @param {ThumbsConstraints} constraints - Specified the thumbs constraints element.
     * @param {number} currentZoom - Specified the current zoom value.
     * @param {boolean} canMask - Specified the is mask or not.
     * @param {number} enableNode - Specified the node number.
     * @param {boolean} nodeConstraints - Specified the node constraints or not.
     * @param {boolean} isStamp - Specified is stamp or not.
     * @param {boolean} isSticky - Specified is sticky or not.
     * @param {boolean} isPath - Specified is path or not.
     * @param {boolean} isFreeText - Specified is free text or not.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the current selector settings value.
     * @returns {void}
     */
    renderResizeHandle(element: DrawingElement, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, currentZoom: number, canMask?: boolean, enableNode?: number, nodeConstraints?: boolean, isStamp?: boolean, isSticky?: boolean, isPath?: boolean, isFreeText?: boolean, currentSelector?: AnnotationSelectorSettingsModel): void;
    private getAllowedInteractions;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} type - Specified the annotation base model.
     * @param {any} currentSelector - Specified the current selector value
     * @returns {AnnotationResizerLocation} - Returns the annotation resizer location value.
     */
    getResizerLocation(type: PdfAnnotationBaseModel, currentSelector?: any): AnnotationResizerLocation;
    /**
     * @private
     * @param {DrawingElement} element - Specified the drawing element.
     * @param {HTMLCanvasElement | SVGAElement} canvas - Specified the canvas element.
     * @param {Transforms} transform - Specified the transform values.
     * @param {SelectorConstraints} selectorConstraints - Specified the selector constraints value.
     * @param {boolean} canMask - Specified is mask value or not.
     * @returns {void}
     */
    renderPivotLine(element: DrawingElement, canvas: HTMLCanvasElement | SVGElement, transform?: Transforms, selectorConstraints?: SelectorConstraints, canMask?: boolean): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} selector - Specified the annotation element.
     * @param {HTMLCanvasElement | SVGAElement} canvas - Specified the canvas element.
     * @param {SelectorConstraints} constraints - Specified the selector constraints value.
     * @param {Transforms} transform - Specified the transform values.
     * @param {boolean} connectedSource - Specified is connected source or not.
     * @param {boolean} connectedTarget - Specified is connected target or not.
     * @param {boolean} isSegmentEditing - Specified is segment editing or not.
     * @param {AnnotationSelectorSettingsModel} currentSelector - Specified the current selector value.
     * @returns {void}
     */
    renderEndPointHandle(selector: PdfAnnotationBaseModel, canvas: HTMLCanvasElement | SVGElement, constraints: ThumbsConstraints, transform: Transforms, connectedSource: boolean, connectedTarget?: boolean, isSegmentEditing?: boolean, currentSelector?: AnnotationSelectorSettingsModel): void;
    /**
     * @private
     * @returns {void}
     */
    initSelectorWrapper(): void;
    /**
     * @private
     * @param {string[]} objArray - Specified the annotation object array.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {boolean} multipleSelection - Specified the multiple selection or not.
     * @param {boolean} preventUpdate - Specified the prevent update or not.
     * @returns {void}
     */
    select(objArray: string[], currentSelector?: any, multipleSelection?: boolean, preventUpdate?: boolean): void;
    /**
     * @private
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the ty value.
     * @param {number} pageIndex - Specified the page index value.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {PdfAnnotationBaseModel} helper - Specified the helper object.
     * @returns {boolean} - boolean value
     */
    dragSelectedObjects(tx: number, ty: number, pageIndex: number, currentSelector: any, helper: PdfAnnotationBaseModel): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotaion object.
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the ty value.
     * @param {any} currentSelector - Specified the current selector value.
     * @param {PdfAnnotationBaseModel} helper - Specified the helper object.
     * @returns {void}
     */
    drag(obj: PdfAnnotationBaseModel | SelectorModel, tx: number, ty: number, currentSelector: any, helper: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotaion object.
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the ty value.
     * @returns {void}
     */
    dragAnnotation(obj: PdfAnnotationBaseModel, tx: number, ty: number): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotaion object.
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the ty value.
     * @param {boolean} preventUpdate - Specified the prevent update or not.
     * @param {number} segmentNumber - Specified the segment value.
     * @returns {boolean} - Returns true or false.
     */
    dragControlPoint(obj: PdfAnnotationBaseModel, tx: number, ty: number, preventUpdate?: boolean, segmentNumber?: number): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} connector - Specified the connector object.
     * @returns {void}
     */
    updateEndPoint(connector: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} actualObject - Specified the actual annotaion object.
     * @param {PdfAnnotationBaseModel} node - Specified the node annotation object.
     * @returns {void}
     */
    nodePropertyChange(actualObject: PdfAnnotationBaseModel, node: PdfAnnotationBaseModel): void;
    private fontSizeCalculation;
    private setLineDistance;
    /**
     * @private
     * @param {number} sx - Specified the sx value.
     * @param {number} sy - Specified the sy value.
     * @param {PointModel} pivot - Specified the pivot value.
     * @returns {boolean} - Returns true or false.
     */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel | SelectorModel} obj - Specified the annotaion object.
     * @param {number} sx - Specified the sx value.
     * @param {number} sy - Specified the sy value.
     * @param {PointModel} pivot - Specified the pivot value.
     * @returns {boolean} - Returns true or false.
     */
    scale(obj: PdfAnnotationBaseModel | SelectorModel, sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * @private
     * @param {number} sw - Specified the sw value.
     * @param {number} sh - Specified the sh value.
     * @param {PointModel} pivot - Specified the pivot value.
     * @param {IElement} obj - Specified the annotation object.
     * @param {DrawingElement} element - Specified the annotation element.
     * @param {IElement} refObject - Specified the annotation reference object.
     * @returns {void}
     */
    scaleObject(sw: number, sh: number, pivot: PointModel, obj: IElement, element: DrawingElement, refObject: IElement): void;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotaion object.
     * @param {number} sw - Specified the sw value.
     * @param {number} sh - Specified the sh value.
     * @param {PointModel} pivot - Specified the pivot value.
     * @param {IElement} refObject - Specified the reference object.
     * @returns {boolean} - Returns true or false.
     */
    scaleAnnotation(obj: PdfAnnotationBaseModel, sw: number, sh: number, pivot: PointModel, refObject?: IElement): boolean;
    private moveInsideViewer;
    /**
     * @private
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the ty value.
     * @param {number} pageIndex - Specified the page index value.
     * @param {Rect} nodeBounds - Specified the node bounds value.
     * @param {boolean} isStamp - Specified the annotation is stamp or not.
     * @param {boolean} isSkip - Specified the annotaion is skip or not.
     * @returns {boolean} - Returns true or false.
     */
    checkBoundaryConstraints(tx: number, ty: number, pageIndex: number, nodeBounds?: Rect, isStamp?: boolean, isSkip?: boolean): boolean;
    private RestrictStamp;
    /**
     * @private
     * @param {DrawingElement} shapeElement - Specified the shape element.
     * @returns {Rect} - Returns the rectangle object.
     */
    getShapeBounds(shapeElement: DrawingElement): Rect;
    /**
     * @private
     * @param {number} x - Specified the x value.
     * @param {number} y - Specified the y value.
     * @param {number} w - Specified the w value.
     * @param {number} h - Specified the h value.
     * @param {number} angle - Specified the angle value.
     * @param {number} offsetX - Specified the offset x value.
     * @param {number} offsetY - Specified the offset y value.
     * @param {PointModel} cornerPoint - Specified the corner point value.
     * @returns {PointModel} - Returns the point model.
     */
    getShapePoint(x: number, y: number, w: number, h: number, angle: number, offsetX: number, offsetY: number, cornerPoint: PointModel): PointModel;
    /**
     * @private
     * @param {string} endPoint - Specified the end point value.
     * @param {IElement} obj - Specified the annotaion object.
     * @param {PointModel} point - Specified the annotation points.
     * @param {PointModel} segment - Specified the annotaion segment.
     * @param {IElement} target - Specified the target element.
     * @param {string} targetPortId - Specified the target port id.
     * @param {any} currentSelector - Specified the current selector value.
     * @returns {boolean} - Returns true or false.
     */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: PointModel, target?: IElement, targetPortId?: string, currentSelector?: any): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @param {number} tx - Specified the tx value.
     * @param {number} ty - Specified the y value.
     * @param {number} i - Specified the index value.
     * @returns {boolean} - Returns true or false.
     */
    dragSourceEnd(obj: PdfAnnotationBaseModel, tx: number, ty: number, i: number): boolean;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} connector - Specified the connector object.
     * @param {PointModel[]} points - Specified the points value.
     * @returns {void}
     */
    updateConnector(connector: PdfAnnotationBaseModel, points: PointModel[]): void;
    /**
     * @private
     * @returns {object} - Returns the object.
     */
    copy(): Object;
    /**
     * @private
     * @returns {object[]} - Returns the object array.
     */
    copyObjects(): Object[];
    private getNewObject;
    private isWithinBounds;
    /**
     * @private
     * @param {PdfAnnotationBaseModel[]} obj - Specified the annotation object.
     * @param {number} index - Specified the annotation index.
     * @returns {void}
     */
    paste(obj: PdfAnnotationBaseModel[], index: number): void;
    private splitFormFieldName;
    private calculateCopyPosition;
    /**
     * @private
     * @param {number} index - Specified the annotaion index.
     * @returns {void}
     */
    cut(index: number): void;
    /**
     * @private
     * @param {object[]} nodeArray - Specified the node array.
     * @param {string} sortID - Specified the sort id.
     * @returns {object[]} - Returns the node array.
     */
    sortByZIndex(nodeArray: Object[], sortID?: string): Object[];
}
/**
 * @hidden
 */
export interface Transforms {
    tx: number;
    ty: number;
    scale: number;
}
/**
 * @hidden
 */
export interface ClipBoardObject {
    pasteIndex?: number;
    clipObject?: Object;
    childTable?: {};
}
