import { IElement } from '@syncfusion/ej2-drawings';
import { PointModel } from '@syncfusion/ej2-drawings';
import { DrawingElement } from '@syncfusion/ej2-drawings';
import { Container } from '@syncfusion/ej2-drawings';
import { PdfViewerBase, PdfViewer } from '../index';
import { PdfAnnotationBaseModel } from './pdf-annotation-model';
/**
 * @private
 * @param {MouseEvent | TouchEvent} event - Specified the annotaion event.
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @param {boolean} isOverlapped - Specified the overlapped element or not.
 * @returns {any} - Returns the active element.
 */
export declare function findActiveElement(event: MouseEvent | TouchEvent, pdfBase: PdfViewerBase, pdfViewer: PdfViewer, isOverlapped?: boolean): any;
/**
 * @private
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @param {MouseEvent} event - Specified the annotaion event.
 * @returns {IElement[]} - Returns the annotaion elements.
 */
export declare function findObjectsUnderMouse(pdfBase: PdfViewerBase, pdfViewer: PdfViewer, event: MouseEvent): IElement[];
/**
 * @private
 * @param {PdfAnnotationBaseModel[]} objects - Specified the annotaion object model.
 * @param {any} event - Specified the annotaion event.
 * @param {PdfViewerBase} pdfBase - Specified the pdfviewer base element.
 * @param {PdfViewer} pdfViewer - Specified the pdfviewer element.
 * @returns {IElement} - Returns the annotaion element.
 */
export declare function findObjectUnderMouse(objects: (PdfAnnotationBaseModel)[], event: any, pdfBase: PdfViewerBase, pdfViewer: PdfViewer): IElement;
/**
 * @private
 * @param {any} selector - Specified the annotaion selctor.
 * @param {any} currentobject - Specified the current annotaion object.
 * @returns {any} - Returns the leader points.
 */
export declare function CalculateLeaderPoints(selector: any, currentobject: any): any;
/**
 * @private
 * @param {IElement} obj - Specified the annotation element.
 * @param {PointModel} position - Specified the annotation position value.
 * @param {number} padding - Specified the annotation padding.
 * @returns {DrawingElement} - Returns the annotation drawing element.
 */
export declare function findElementUnderMouse(obj: IElement, position: PointModel, padding?: number): DrawingElement;
/**
 * @private
 * @param {PdfAnnotationBaseModel} obj - Specified the annotation object model.
 * @param {string} key - Specified the annotation key value.
 * @param {object[]} collection - Specified the annotation collection.
 * @returns {void}
 */
export declare function insertObject(obj: PdfAnnotationBaseModel, key: string, collection: Object[]): void;
/**
 * @private
 * @param {Container} container - Specified the annotaion container.
 * @param {PointModel} position - Specified the annotation position.
 * @param {number} padding - Specified the annotaion padding value.
 * @returns {DrawingElement} - Returns the annotation drawing element.
 */
export declare function findTargetShapeElement(container: Container, position: PointModel, padding?: number): DrawingElement;
/**
 * @private
 * @param {PointModel} region - Specified the annotation region point model.
 * @param {PdfAnnotationBaseModel[]} objCollection - Specified the annotation object collections.
 * @param {number} touchPadding - touchPadding
 * @returns {PdfAnnotationBaseModel[]} - Returns the annotation object collections.
 */
export declare function findObjects(region: PointModel, objCollection: (PdfAnnotationBaseModel)[], touchPadding: number): (PdfAnnotationBaseModel)[];
/**
 * @private
 * @param {MouseEvent} event - Specified the annotaion mouse event.
 * @returns {number} - Returns the active page Id.
 */
export declare function findActivePage(event: MouseEvent): number;
/**
 * @hidden
 */
export declare class ActiveElements {
    private activePage;
    /**
     * @private
     * @returns {number} - Returns the active page Id.
     */
    /**
    * @private
    * @param {number} offset - The page offset value.
    */
    activePageID: number;
    constructor();
}
