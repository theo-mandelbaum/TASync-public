import { _PdfDictionary } from './../pdf-primitives';
import { _PdfBaseStream } from './../base-stream';
import { PdfGraphics } from './pdf-graphics';
import { _PdfCrossReference } from './../pdf-cross-reference';
/**
 * `PdfTemplate` class represents the template of the PDF.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new rubber stamp annotation
 * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
 * // Get the normal appearance of the annotation
 * let normalAppearance: PdfTemplate = annotation.appearance.normal;
 * // Create new image object by using JPEG image data as Base64 string format
 * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
 * // Draw the image as the custom appearance for the annotation
 * normalAppearance.graphics.drawImage(image, 0, 0, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfTemplate {
    _content: any;
    _size: number[];
    _writeTransformation: boolean;
    _isReadOnly: boolean;
    _isAnnotationTemplate: boolean;
    _needScale: boolean;
    _g: PdfGraphics;
    _crossReference: _PdfCrossReference;
    _isExported: boolean;
    _isResourceExport: boolean;
    _appearance: string;
    _pendingResources: string;
    _templateOriginalSize: number[];
    _isSignature: boolean;
    /**
     * Initializes a new instance of the `PdfTemplate` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfTemplate` class.
     *
     * @param {_PdfBaseStream} appearance - The appearance stream.
     * @param {_PdfCrossReference} crossReference - The cross reference object.
     * @private
     */
    constructor(appearance: _PdfBaseStream, crossReference: _PdfCrossReference);
    /**
     * Initializes a new instance of the `PdfTemplate` class.
     *
     * @param {number[]} bounds - The bounds.
     * @param {_PdfCrossReference} crossReference - The cross reference object.
     * @private
     */
    constructor(bounds: number[], crossReference: _PdfCrossReference);
    /**
     * Get the graphics of the PDF template. (Read only)
     *
     * @returns {PdfGraphics} The graphics object of the PDF template.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
     * // Access the graphics of the normal appearance
     * let graphics: PdfGraphics = annotation.appearance.normal.graphics;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image as the custom appearance for the annotation
     * graphics.drawImage(image, 0, 0, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly graphics: PdfGraphics;
    /**
     * Get the size of the PDF template. (Read only)
     *
     * @returns {number[]} Template width and height as number array.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
     * // Access the normal template of the appearance
     * let template: PdfTemplate = appearance.normal;
     * // Get the width and height of the PDF template as number array.
     * let size: number[] = template.size;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image as the custom appearance for the annotation
     * template.graphics.drawImage(image, 0, 0, size[0], size[1]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly size: number[];
    /**
     * Get the original size of the PDF template. (Read only)
     *
     * Remarks: The `_originalSize` property is internal and provides access to the original dimensions of the PDF template.
     *
     * @returns {number[]} Template original width and height as number array.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
     * // Access the normal template of the appearance
     * let template: PdfTemplate = appearance.normal;
     * // Get the width and height of the PDF template as number array
     * let size: number[] = template._originalSize;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image as the custom appearance for the annotation
     * template.graphics.drawImage(image, 0, 0, size[0], size[1]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly _originalSize: number[];
    _initialize(): void;
    _exportStream(dictionary: _PdfDictionary, crossReference: _PdfCrossReference): void;
    _importStream(hasCrossReference: boolean, isResourceExport?: boolean): void;
    _updatePendingResource(crossReference: _PdfCrossReference): void;
}
