import { _PdfCrossReference } from './pdf-cross-reference';
import { _PdfDictionary, _PdfReference } from './pdf-primitives';
import { PdfAnnotationCollection } from './annotations/annotation-collection';
import { PdfGraphics, PdfGraphicsState } from './graphics/pdf-graphics';
import { _PdfContentStream } from './base-stream';
import { PdfRotationAngle, PdfDestinationMode, PdfFormFieldsTabOrder, PdfPageOrientation } from './enumerator';
import { PdfPageSettings } from './pdf-document';
import { PdfTemplate } from './graphics/pdf-template';
/**
 * Represents a page loaded from the PDF document.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPage {
    _crossReference: _PdfCrossReference;
    _pageIndex: number;
    _pageDictionary: _PdfDictionary;
    _ref: _PdfReference;
    _annotations: PdfAnnotationCollection;
    _isAnnotationParsed: boolean;
    _size: number[];
    _mBox: number[];
    _cBox: number[];
    _orientation: PdfPageOrientation;
    _o: number[];
    _g: PdfGraphics;
    _graphicsState: PdfGraphicsState;
    _contents: Array<_PdfReference>;
    _rotation: PdfRotationAngle;
    _needInitializeGraphics: boolean;
    _hasResourceReference: boolean;
    _resourceObject: _PdfDictionary;
    _tabOrder: PdfFormFieldsTabOrder;
    _pageSettings: PdfPageSettings;
    _isNew: boolean;
    _isDuplicate: boolean;
    /**
     * Represents a loaded page of the PDF document.
     *
     * @private
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {number} pageIndex page index.
     * @param {_PdfDictionary} dictionary page Dictionary.
     * @param {_PdfReference} reference page reference.
     */
    constructor(crossReference: _PdfCrossReference, pageIndex: number, dictionary: _PdfDictionary, reference: _PdfReference);
    /**
     * Gets the collection of the page's annotations (Read only).
     *
     * @returns {PdfAnnotationCollection} Annotation collection.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the annotation collection
     * let annotations: PdfAnnotationCollection = page.annotations;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly annotations: PdfAnnotationCollection;
    /**
     * Gets the size of the page (Read only).
     *
     * @returns {number[]} Page width and height as number array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the width and height of the PDF page as number array
     * let size: number[] = page.size;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly size: number[];
    /**
     * Gets the rotation angle of the page (Read only).
     *
     * @returns {PdfRotationAngle} Page rotation angle.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the rotation angle of the page
     * let rotation: PdfRotationAngle = page.rotation;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation angle of the PDF page
    *
    * @param {PdfRotationAngle} value rotation angle.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access first page
    * let page: PdfPage = document.getPage(0);
    * // Sets the rotation angle of the PDF page
    * page.rotate = PdfRotationAngle.angle90;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotation: PdfRotationAngle;
    /**
     * Gets the tab order of a PDF form field.
     *
     * @returns {PdfFormFieldsTabOrder} tab order.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the tab order of a PDF form field.
     * let tabOrder: PdfFormFieldsTabOrder = page.tabOrder;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the tab order of a PDF form field.
    *
    * @param {PdfFormFieldsTabOrder} value tab order.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access first page
    * let page: PdfPage = document.getPage(0);
    * // Sets the tab order of a PDF form field.
    * page.tabOrder = PdfFormFieldsTabOrder.row;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    tabOrder: PdfFormFieldsTabOrder;
    /**
     * Gets the bounds that define the area intended for display or printing in the PDF viewer application (Read only).
     *
     * @returns {number[]} Page size as number array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the cropBox of the PDF page as number array
     * let cropBox: number[] = page.cropBox;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly cropBox: number[];
    /**
     * Gets the size that specify the width and height of the page (Read only).
     *
     * @returns {number[]} Page size as number array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the mediaBox of the PDF page as number array
     * let mediaBox: number[] = page.mediaBox;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly mediaBox: number[];
    /**
     * Gets the orientation of the page (Read only).
     *
     * @returns {PdfPageOrientation} Page orientation.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the orientation of the PDF page
     * let orientation: number[] = page.orientation;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly orientation: PdfPageOrientation;
    readonly _origin: number[];
    /**
     * Gets the graphics of the page (Read only).
     *
     * @returns {PdfGraphics} Page graphics.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * //Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * //Draw line on the page graphics.
     * graphics.drawLine(pen, 10, 10, 100, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly graphics: PdfGraphics;
    _addWidget(reference: _PdfReference): void;
    _getProperty(key: string, getArray?: boolean): any;
    _parseGraphics(): void;
    _loadContents(): void;
    _initializeGraphics(stream: _PdfContentStream): void;
    _getActualBounds(pageSettings: PdfPageSettings): number[];
    _fetchResources(): _PdfDictionary;
    _getCropOrMediaBox(): number[];
    _beginSave(): void;
    _destroy(): void;
    _obtainTabOrder(): PdfFormFieldsTabOrder;
    _removeAnnotation(reference: _PdfReference): void;
    readonly _contentTemplate: PdfTemplate;
    _combineIntoSingleArray(arrays: Uint8Array[]): Uint8Array;
    _combineContent(): Uint8Array;
}
/**
 * `PdfDestination` class represents the PDF destination.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the annotation at index 0
 * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
 * // Initializes a new instance of the `PdfDestination` class.
 * let destination: PdfDestination = new PdfDestination();
 * // Sets the zoom factor.
 * destination.zoom = 20;
 * // Sets the page where the destination is situated.
 * destination.page = page;
 * // Sets the mode of the destination.
 * destination.mode = PdfDestinationMode.fitToPage;
 * // Sets the location of the destination.
 * destination.location = [20, 20];
 * // Sets the bounds of the destination.
 * destination.destinationBounds = [20, 20, 100, 50];
 * // Sets destination to  document link annotation.
 * annotation.destination = destination;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfDestination {
    _page: PdfPage;
    _location: number[];
    _destinationMode: PdfDestinationMode;
    _zoom: number;
    _isValid: boolean;
    _index: number;
    _destinationBounds: number[];
    _array: Array<any>;
    _parent: any;
    /**
     * Initializes a new instance of the `PdfDestination` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the annotation at index 0
     * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Initializes a new instance of the `PdfDestination` class.
     * let destination: PdfDestination = new PdfDestination();
     * // Sets the zoom factor.
     * destination.zoom = 20;
     * // Sets the page where the destination is situated.
     * destination.page = page;
     * // Sets the mode of the destination.
     * destination.mode = PdfDestinationMode.fitToPage;
     * // Sets the location of the destination.
     * destination.location = [20, 20];
     * // Sets the bounds of the destination.
     * destination.destinationBounds = [20, 20, 100, 50];
     * // Sets destination to  document link annotation.
     * annotation.destination = destination;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfDestination` class.
     *
     * @private
     * @param {PdfPage} page PdfPage.
     */
    constructor(page: PdfPage);
    /**
     * Initializes a new instance of the `PdfDestination` class.
     *
     * @private
     * @param {PdfPage} page PdfPage.
     * @param {number[]} location Location.
     */
    constructor(page: PdfPage, location: number[]);
    /**
     * Gets the zoom factor.
     *
     * @returns {number} zoom.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * //Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = page.annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the zoom factor of the destination.
     * let zoom: number = annot.destination.zoom;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the zoom factor.
    *
    * @param {number} value zoom.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to  document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    zoom: number;
    /**
     * Gets the page where the destination is situated.
     *
     * @returns {PdfPage} page.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * //Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the page of the destination.
     * let page: PdfPage = annot.destination.page;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the page where the destination is situated.
    *
    * @param {PdfPage} value page.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to  document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    page: PdfPage;
    /**
     * Gets the page index of bookmark destination (Read only).
     *
     * @returns {number} index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * //Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the page index of the destination.
     * let pageIndex: number = annot.destination.pageIndex;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly pageIndex: number;
    /**
     * Gets the mode of the destination.
     *
     * @returns {PdfDestinationMode} page.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * //Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the mode of the destination.
     * let mode: PdfDestinationMode = annot.destination.mode;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the mode of the destination.
    *
    * @param {PdfDestinationMode} value page.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    mode: PdfDestinationMode;
    /**
     * Gets the location of the destination.
     *
     * @returns {number[]} page.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the location of the destination.
     * let location: number[] = annot.destination.location;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the location of the destination.
    *
    * @param {number[]} value page.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to  document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    location: number[];
    /**
     * Gets the bounds of the destination.
     *
     * @returns {number[]} bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the bounds of the destination.
     * let destinationBounds: number[] = annot.destination.destinationBounds;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds of the destination.
    *
    * @param {number[]} value bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to  document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    destinationBounds: number[];
    /**
     * Gets a value indicating whether this instance is valid (Read only).
     *
     * @returns {boolean} value indicating whether this instance is valid.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the annotation at index 0
     * let annot: PdfDocumentLinkAnnotation = document.getPage(0).annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets a value indicating whether this instance is valid.
     * let isValid: boolean = annot.destination.isValid;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isValid: boolean;
    _setValidation(value: boolean): void;
    _initializePrimitive(): void;
}
