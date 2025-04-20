import { _PdfStream } from './base-stream';
import { _PdfCrossReference } from './pdf-cross-reference';
import { _Linearization } from './pdf-parser';
import { _PdfCatalog } from './pdf-catalog';
import { _PdfDictionary, _PdfReference } from './pdf-primitives';
import { PdfPage } from './pdf-page';
import { DataFormat, PdfPermissionFlag, PdfPageOrientation, PdfRotationAngle } from './enumerator';
import { PdfForm } from './form/form';
import { PdfBookmarkBase, _PdfNamedDestinationCollection } from './pdf-outline';
import { PdfFileStructure } from './pdf-file-structure';
import { _PdfMergeHelper } from './pdf-merge';
import { PdfPageImportOptions } from './pdf-page-import-options';
import { PdfLayerCollection } from './layers/layer-collection';
import { PdfSection } from './pdf-section';
/**
 * Represents a PDF document and can be used to parse an existing PDF document.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Flatten annotations and form fields
 * document.flatten = true;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfDocument {
    _stream: _PdfStream;
    _crossReference: _PdfCrossReference;
    _catalog: _PdfCatalog;
    _fileStructure: PdfFileStructure;
    private _headerSignature;
    private _startXrefSignature;
    private _endObjSignature;
    private _version;
    _pages: Map<number, PdfPage>;
    private _linear;
    _pageCount: number;
    private _flatten;
    _permissions: PdfPermissionFlag;
    _form: PdfForm;
    _bookmarkBase: PdfBookmarkBase;
    _namedDestinationCollection: _PdfNamedDestinationCollection;
    _isEncrypted: boolean;
    _isUserPassword: boolean;
    _hasUserPasswordOnly: boolean;
    _encryptOnlyAttachment: boolean;
    _encryptMetaData: boolean;
    _isExport: boolean;
    private _allowCustomData;
    _bookmarkHashTable: Map<PdfPage, PdfBookmarkBase[]>;
    _targetIndex: number;
    _isDuplicatePage: boolean;
    _mergeHelperCache: Map<string, _PdfMergeHelper>;
    _uniqueID: string;
    _isSplitDocument: boolean;
    private _layers;
    _optionalContentDictionaries: _PdfReference[];
    _order: (_PdfReference | _PdfReference[])[];
    _on: _PdfReference[];
    _off: _PdfReference[];
    _as: _PdfReference[];
    _printLayer: _PdfReference[];
    _isLoaded: boolean;
    splitEvent: Function;
    /**
     * Creates a new PDF document
     *
     * ```typescript
     * // Create a new PDF document
     * let document: PdfDocument = new PdfDocument();
     * // Add a new page
     * let page: PdfPage = document.addPage();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw line on the page graphics.
     * graphics.drawLine(pen, 10, 10, 100, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfDocument` class.
     *
     * @param {string} data PDF data as Base64 string.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Flatten annotations and form fields
     * document.flatten = true;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(data: string);
    /**
     * Initializes a new instance of the `PdfDocument` class with password.
     *
     * @param {string} data PDF data as Base64 string.
     * @param {string} password Password to decrypt PDF.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Flatten annotations and form fields
     * document.flatten = true;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(data: string, password: string);
    /**
     * Initializes a new instance of the `PdfDocument` class.
     *
     * @param {Uint8Array} data PDF data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Flatten annotations and form fields
     * document.flatten = true;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(data: Uint8Array);
    /**
     * Initializes a new instance of the `PdfDocument` class with password.
     *
     * @param {Uint8Array} data PDF data as byte array.
     * @param {string} password Password to decrypt PDF.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Flatten annotations and form fields
     * document.flatten = true;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(data: Uint8Array, password: string);
    _allowImportCustomData: boolean;
    readonly _linearization: _Linearization;
    readonly _startXRef: number;
    /**
     * Gets a value indicating whether the document is encrypted. (Read Only).
     *
     * @returns {boolean} A boolean value indicates whether the document is encrypted.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets a value indicating whether the document is encrypted.
     * let isEncrypted: boolean = document.isEncrypted;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isEncrypted: boolean;
    /**
     * Gets a value indicating whether the document is decrypted using the user password. (Read only).
     *
     * @returns {boolean} A boolean value indicates whether the document is decrypted using the user password.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets a value indicating whether the document is decrypted using the user password
     * let isUserPassword: boolean = document.isUserPassword;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isUserPassword: boolean;
    /**
     * Gets the page count (Read only).
     *
     * @returns {number} Number of pages
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the page count
     * let count: number = document.pageCount;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly pageCount: number;
    /**
     * Gets the PDF form fields included in the document (Read only).
     *
     * @returns {PdfForm} Form object
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access loaded form
     * let form: PdfForm = document.form;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly form: PdfForm;
    /**
     * Gets the boolean flag to flatten the annotations and form fields.
     *
     * @returns {boolean} Flag to flatten
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the flatten value applied
     * let flatten: boolean = document.flatten;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag to flatten the annotations and form fields.
    *
    * @param {boolean} value to flatten
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Flatten PDF annotations and form fields
    * document.flatten = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    flatten: boolean;
    /**
     * Gets the permission flag of the PDF document (Read only).
     *
     * @returns {PdfPermissionFlag} permission flag. Default value is PdfPermissionFlag.default.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the permission flag
     * let permission: PdfPermissionFlag = document.permissions;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly permissions: PdfPermissionFlag;
    /**
     * Gets the bookmarks (Read only).
     *
     * @returns {PdfBookmarkBase} Bookmarks.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly bookmarks: PdfBookmarkBase;
    /**
     * Gets the internal structure of the PDF document.
     *
     * @returns {PdfFileStructure} The internal structure of the PDF document.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the internal file structure of the PDF document
     * let fileStructure: PdfFileStructure = document.fileStructure;
     * // Get the cross reference type
     * let type: PdfCrossReferenceType = fileStructure.crossReferenceType;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly fileStructure: PdfFileStructure;
    /**
     * Gets the collection of `PdfLayer` from the document.
     *
     * @returns {PdfLayerCollection} Layer collection.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly layers: PdfLayerCollection;
    /**
     * Gets the `PdfPage` at the specified index.
     *
     * @param {number} pageIndex Page index.
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getPage(pageIndex: number): PdfPage;
    /**
     * Creates a new page with default page settings and adds it to the collection.
     *
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Add a new PDF page
     * let page: PdfPage = document.addPage();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPage(): PdfPage;
    /**
     * Creates a new page with default settings and inserts it into the collection at the specified page index.
     *
     * @param {number} index Page index.
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create and insert a new PDF page at 5th index
     * let page: PdfPage = document.addPage(5);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPage(index: number): PdfPage;
    /**
     * Creates a new page with specified page settings and adds it to the collection.
     *
     * @param {PdfPageSettings} pageSettings Page settings.
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPage(pageSettings: PdfPageSettings): PdfPage;
    /**
     * Creates a new page with specified page settings and inserts it into the collection at the specified page index.
     *
     * @param {number} index Page index.
     * @param {PdfPageSettings} pageSettings Page settings.
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Create and insert a new PDF page at 5th index with specified page settings
     * page = document.addPage(5, pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPage(index: number, pageSettings: PdfPageSettings): PdfPage;
    /**
     * Creates a new section with default page settings.
     *
     * @returns {PdfSection} section of document
     *
     * ```typescript
     * // Create a new PDF document
     * let document: PdfDocument = new PdfDocument();
     * // Add a new section to the document
     * let section: PdfSection = document.addSection();
     * // Add a new page to the section
     * let page: PdfPage = section.addPage();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw line on the page graphics.
     * graphics.drawLine(pen, 10, 10, 100, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addSection(): PdfSection;
    /**
     * Creates a new section with custom page settings.
     *
     * @param {PdfPageSettings} settings Settings of the section.
     * @returns {PdfSection} section of document
     *
     * ```typescript
     * // Create an new PDF document
     * let document: PdfDocument = new PdfDocument();
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new section to the document with page settings
     * let section: PdfSection = document.addSection(pageSettings);
     * // Add a new page to the section
     * let page: PdfPage = section.addPage();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw line on the page graphics.
     * graphics.drawLine(pen, 10, 10, 100, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addSection(settings: PdfPageSettings): PdfSection;
    /**
     * Removes the specified page.
     *
     * @param {PdfPage} page The page to remove.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Removes the specified page
     * document.removePage(page);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removePage(page: PdfPage): void;
    /**
     * Removes the page from the specified index.
     *
     * @param {number} index The page index to remove.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Removes the first page
     * document.removePage(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removePage(index: number): void;
    _checkPageNumber(index: number): void;
    _updatePageCache(index: number, isIncrement?: boolean): void;
    _removePage(pageToRemove: PdfPage): void;
    _removeParent(referenceToRemove: _PdfReference, dictionary: _PdfDictionary): void;
    _parseBookmarkDestination(): Map<PdfPage, PdfBookmarkBase[]>;
    _removePageTemplates(page: PdfPage): void;
    _removeInternalTemplates(dictionary: _PdfDictionary, key: string, page: PdfPage): void;
    _getUpdatedPageTemplates(namedPages: _PdfDictionary[], page: PdfPage): _PdfDictionary[];
    /**
     * Reorders the pages in the PDF document.
     *
     * @param {number[]} orderArray The page sequence to arrange the pages.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Reorders the pages in the PDF document
     * document.reorderPages([3, 2, 1]);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    reorderPages(orderArray: number[]): void;
    _sortedArray(order: number[]): number[];
    _cloneResources(source: _PdfDictionary, target: _PdfDictionary): void;
    _cloneInnerResources(key: string, value: any, resourceDictionary: _PdfDictionary): void;
    /**
     * Saves the modified document.
     *
     * @returns {Uint8Array} Saved PDF data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Save the document
     * let data: Uint8Array = document.save();
     * // Destroy the document
     * document.destroy();
     * ```
     */
    save(): Uint8Array;
    /**
     * Saves the modified document to the specified filename.
     *
     * @param {string} filename Specifies the filename to save the output pdf document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Save the document
     * document.save('Output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    save(filename: string): void;
    /**
     * Saves the document to the specified output stream and return the stream as Blob.
     *
     * @returns {Promise<{ blobData: Blob }>} Saved PDF data as `Blob`.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Save the document
     * let data: Promise<{ blobData: Blob }> = document.saveAsBlob();
     * // Destroy the document
     * document.destroy();
     * ```
     */
    saveAsBlob(): Promise<{
        blobData: Blob;
    }>;
    /**
     * Exports the annotations from the PDF document.
     *
     * @returns {Uint8Array} Exported annotation data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Exports the annotations from the PDF document.
     * let data: Uint8Array = document.exportAnnotations();
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportAnnotations(): Uint8Array;
    /**
     * Exports the annotations from the PDF document.
     *
     * @param {PdfAnnotationExportSettings} settings Annotation export settings.
     * @returns {Uint8Array} Exported annotation data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Sets export data format as JSON type to annotation export settings
     * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
     * settings.dataFormat = DataFormat.json;
     * // Export annotations to JSON format
     * let json: Uint8Array = document.exportAnnotations(settings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportAnnotations(settings: PdfAnnotationExportSettings): Uint8Array;
    /**
     * Exports the annotations from the PDF document.
     *
     * @param {string} filename Output file name.
     * @returns {void} Exports the annotations from the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Exports the annotations from the PDF document.
     * document.exportAnnotations('annotations.xfdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportAnnotations(filename: string): void;
    /**
     * Exports the annotations from the PDF document.
     *
     * @param {string} filename Output file name.
     * @param {PdfAnnotationExportSettings} settings Annotation export settings.
     * @returns {void} Exports the annotations from the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Sets export data format as JSON type to annotation export settings
     * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
     * settings.dataFormat = DataFormat.json;
     * // Export annotations to JSON format
     * let json: Uint8Array = document.exportAnnotations('annotations.json', settings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportAnnotations(filename: string, settings: PdfAnnotationExportSettings): void;
    /**
     * Exports the form data from the PDF document.
     *
     * @returns {Uint8Array} Exported form data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Exports the form data from the PDF document.
     * let data: Uint8Array = document.exportFormData();
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportFormData(): Uint8Array;
    /**
     * Exports the form data from the PDF document.
     *
     * @param {PdfFormFieldExportSettings} settings Form field export settings.
     * @returns {Uint8Array} Exported form data as byte array.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Sets the form field data export settings with output data format.
     * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
     * settings.dataFormat = DataFormat.json;
     * // Export form field to JSON format
     * let json: Uint8Array = document.exportFormData(settings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportFormData(settings: PdfFormFieldExportSettings): Uint8Array;
    /**
     * Exports the form data from the PDF document.
     *
     * @param {string} filename Output file name.
     * @returns {void} Exports the form data from the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Export form field to XFDF format
     * let xfdf: Uint8Array = document.exportFormData(‘formData.xfdf’);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportFormData(filename: string): void;
    /**
     * Exports the form data from the PDF document.
     *
     * @param {string} filename Output file name.
     * @param {PdfFormFieldExportSettings} settings Form field export settings.
     * @returns {void} Exports the form data from the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Sets the form field data export settings with output data format.
     * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
     * settings.dataFormat = DataFormat.json;
     * // Export form field to JSON format
     * let json: Uint8Array = document.exportFormData('formData.json', settings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    exportFormData(filename: string, settings: PdfFormFieldExportSettings): void;
    /**
     * Imports the annotations from the PDF document.
     *
     * @param {string} data annotations data as base64 string.
     * @param {DataFormat} dataFormat Data format of the input data.
     * @returns {void} Imports the annotations to the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Imports annotations from to the PDF document.
     * document.importAnnotations('annotations.json', DataFormat.json);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    importAnnotations(data: string, dataFormat: DataFormat): void;
    /**
     * Imports the annotations from the PDF document.
     *
     * @param {Uint8Array} data annotations data as byte array.
     * @param {DataFormat} dataFormat Data format of the input data.
     * @returns {void} Imports the annotations to the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Imports annotations from to the PDF document.
     * document.importAnnotations(annotations, DataFormat.json);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    importAnnotations(data: Uint8Array, dataFormat: DataFormat): void;
    /**
     * Imports the form data from the PDF document.
     *
     * @param {string} data Form data as base64 string.
     * @param {DataFormat} dataFormat Data format of the input data.
     * @returns {void} Imports the form data to the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Imports form data from to the PDF document.
     * document.importFormData('formData.json', DataFormat.json);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    importFormData(data: string, dataFormat: DataFormat): void;
    /**
     * Imports the form data from the PDF document.
     *
     * @param {Uint8Array} data Form data as byte array.
     * @param {DataFormat} dataFormat Data format of the input data.
     * @returns {void} Imports the form data to the PDF document.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Imports form data from to the PDF document.
     * document.importFormData(data, DataFormat.json);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    importFormData(data: Uint8Array, dataFormat: DataFormat): void;
    /**
     * Disposes the current instance of `PdfDocument` class.
     *
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    destroy(): void;
    readonly _destinationCollection: _PdfNamedDestinationCollection;
    _getLinearizationPage(pageIndex: number): {
        dictionary: _PdfDictionary;
        reference: _PdfReference;
    };
    _checkHeader(): void;
    _parse(recoveryMode: boolean): void;
    _find(stream: _PdfStream, signature: Uint8Array, limit?: number, backwards?: boolean): boolean;
    _doPostProcess(isFlatten?: boolean): void;
    _doPostProcessOnFormFields(isFlatten?: boolean): void;
    _doPostProcessOnAnnotations(isFlatten?: boolean): void;
    _addWatermarkText(): void;
    /**
     * Import the pages specified by the start and end index into the current document's pages collection.
     *
     * @param {PdfDocument} sourceDocument PDF document to get pages to import.
     * @param {number} startIndex Start page index. The default value is 0.
     * @param {number} endIndex End page index. The default value is the index of the last page in the source document.
     * @remarks The source document must be disposed of after the destination document is saved during the import function.
     *
     * ```typescript
     * // Load an existing PDF document
     * let destination: PdfDocument = new PdfDocument(data1);
     * // Load another existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(data2);
     * // Import 5 pages from page index 2 to 6 into the destination document.
     * destination.importPageRange(sourceDocument, 2, 6);
     * // Save the output PDF
     * destination.save(‘Output.pdf’);
     * // Destroy the documents
     * destination.destroy();
     * sourceDocument.destroy();
     * ```
     */
    importPageRange(sourceDocument: PdfDocument, startIndex: number, endIndex: number): void;
    /**
     * Import the pages specified by start and end index into the current document's pages collection.
     *
     * @param {PdfDocument} sourceDocument PDF document to get pages to import.
     * @param {number} startIndex Start page index. The default value is 0.
     * @param {number} endIndex End page index. The default value is the index of the last page in the source document.
     * @param {PdfPageImportOptions} options Options to customize the support of import PDF pages.
     * @remarks The source document must be disposed of after the destination document is saved during the import function.
     *
     * ```typescript
     * // Load an existing PDF document
     * let destination: PdfDocument = new PdfDocument(data1);
     * // Load another existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(data2);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Sets the target page index to import
     * options.targetIndex = 3;
     * // Import 5 pages from page index 2 to 6 into the destination document and insert them at index 3.
     * destination.importPageRange(sourceDocument, 2, 6, options);
     * // Save the output PDF
     * destination.save(‘Output.pdf’);
     * // Destroy the documents
     * destination.destroy();
     * sourceDocument.destroy();
     * ```
     */
    importPageRange(sourceDocument: PdfDocument, startIndex: number, endIndex: number, options?: PdfPageImportOptions): void;
    _importPages(sourceDocument: PdfDocument, startIndex: number, endIndex: number, options?: PdfPageImportOptions): void;
    /**
     * Copy the specific page and insert it as the next page
     *
     * @param {number} pageIndex Target page index to import.
     *
     * ```typescript
     * // Load an existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(data1);
     * // Copy the second page and add it as third page
     * sourceDocument.importPage(1);
     * // Save the output PDF
     * sourceDocument.save(‘Output.pdf’);
     * // Destroy the documents
     * sourceDocument.destroy();
     * ```
     */
    importPage(index: number): void;
    /**
     * Copy the specific page and insert it at the specified target page index and page rotation.
     *
     * @param {number} pageIndex Target page index to import.
     * @param {PdfPageImportOptions} options Options to customize the support of import PDF pages.
     *
     * ```typescript
     * // Load an existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(readFromResources('PDF_Succinctly.pdf'));
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Sets the target page index to import
     * options.targetIndex = 1;
     * // Sets the rotation angle of the page to import
     * options.rotation = PdfRotationAngle.angle180;
     * // Copy the first page and add it as second page with page rotation
     * sourceDocument.importPage(0, options);
     * // Save the output PDF
     * let output = sourceDocument.save();
     * write('863764-86.pdf', output);
     * // Destroy the documents
     * sourceDocument.destroy();
     * ```
     */
    importPage(index: number, options: PdfPageImportOptions): void;
    /**
     * Import the specified page into the current document pages collection as the last page
     *
     * @param {PdfPage} page Page to import.
     * @param {PdfDocument} sourceDocument PDF document to get pages to import.
     * @remarks The source document must be disposed of after the destination document is saved during the import function.
     *
     * ```typescript
     * // Load an existing PDF document
     * let destination: PdfDocument = new PdfDocument(data1);
     * // Load another existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(data2);
     * // Access first page of the source document
     * let pageToImport: PdfPage = sourceDocument.getPage(0);
     * // Import the page into the destination document as the last page.
     * destination.importPage(pageToImport, sourceDocument);
     * // Save the output PDF
     * destination.save(‘Output.pdf’);
     * // Destroy the documents
     * destination.destroy();
     * sourceDocument.destroy();
     * ```
     */
    importPage(page: PdfPage, sourceDocument: PdfDocument): void;
    /**
     * Create a new page with default settings and insert it into the collection at the specified page index.
     *
     * @param {PdfPage} page Page to import.
     * @param {PdfDocument} sourceDocument PDF document to get pages to import.
     * @param {PdfPageImportOptions} options Options to customize the support of import PDF pages.
     * @remarks The source document must be disposed of after the destination document is saved during the import function.
     *
     * ```typescript
     * // Load an existing PDF document
     * let destination: PdfDocument = new PdfDocument(data1);
     * // Load another existing PDF document
     * let sourceDocument: PdfDocument = new PdfDocument(data2);
     * // Access first page of the source document
     * let pageToImport: PdfPage = sourceDocument.getPage(0);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Sets the target page index to import
     * options.targetIndex = 5;
     * // Imports the page into destination document as 5th page
     * destination.importPage(pageToImport, sourceDocument, options);
     * // Save the output PDF
     * destination.save(‘Output.pdf’);
     * // Destroy the documents
     * destination.destroy();
     * sourceDocument.destroy();
     * ```
     */
    importPage(page: PdfPage, sourceDocument: PdfDocument, options?: PdfPageImportOptions): void;
    /**
     * Splitting a PDF file into individual pages.
     *
     * @returns {void} Nothing
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document into individual pages
     * document.split();
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    split(): void;
    /**
     * Splits the PDF document into parts, each containing a maximum number of pages specified.
     *
     * @param {number} fixedNumber specifies the maximum number of pages in each split PDF. The default value is 1.
     * @returns {void} Nothing
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document by fixed number of pages
     * document.splitByFixedNumber(1);
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    splitByFixedNumber(fixedNumber: number): void;
    /**
     * Splits the PDF document into multiple parts based on the specified page ranges.
     *
     * @param {Array<number[]>} ranges The two dimensional number array specified for start and end page indexes to split PDF documents.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document by page ranges specified
     * document.splitByPageRanges([[0, 4], [5, 9]]);
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    splitByPageRanges(ranges: number[][]): void;
    private _importDocumentPages;
    private _invokeSplitEvent;
}
/**
 * Represents annotation export settings.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Sets export data format as JSON type to annotation export settings
 * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
 * // Set the data format defined in annotation export settings
 * settings.dataFormat = DataFormat.json;
 * // Export annotations to JSON format
 * let json: Uint8Array = document.exportAnnotations(settings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAnnotationExportSettings {
    _format: DataFormat;
    _exportAppearance: boolean;
    /**
     * Gets the data format defined in annotation export settings.
     *
     * @returns {DataFormat} - Returns the data format.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Sets export data format as JSON type to annotation export settings
     * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
     * // Export annotations to JSON format
     * let json: Uint8Array = document.exportAnnotations(settings);
     * // Get the data format defined in annotation export settings
     * let dataFormat: DataFormat = settings.dataFormat;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the data format defined in annotation export settings.
    *
    * @param {DataFormat} format - Specifies the data format.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Sets export data format as JSON type to annotation export settings
    * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
    * // Set the data format defined in annotation export settings
    * settings.dataFormat = DataFormat.json;
    * // Export annotations to JSON format
    * let json: Uint8Array = document.exportAnnotations(settings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    dataFormat: DataFormat;
    /**
     * Gets the boolean value indicating whether the appearance of a particular object can be exported or not.
     *
     * @returns {boolean} - Returns the boolean value.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Sets the annotation export settings with enabled export appearance.
     * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
     * // Export annotations to XFDF format
     * let xfdf: Uint8Array = document.exportAnnotations(settings);
     * // Get the boolean value indicating whether the appearance of a particular object can be exported or not
     * let appearance: boolean = settings.exportAppearance;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean value indicating whether the appearance of a particular object can be exported or not.
    *
    * @param {boolean} value - The boolean value.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Sets the annotation export settings with enabled export appearance.
    * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
    * // Set the boolean value indicating whether the appearance of a particular object can be exported or not
    * settings.exportAppearance = true;
    * // Export annotations to XFDF format
    * let xfdf: Uint8Array = document.exportAnnotations(settings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    exportAppearance: boolean;
}
/**
 * Represents form fields export settings.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Sets the form field data export settings with output data format.
 * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
 * // Set the data format defined in form field export settings.
 * settings.dataFormat = DataFormat.json;
 * // Export form field to JSON format
 * let json: Uint8Array = document.exportFormData(settings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfFormFieldExportSettings {
    _format: DataFormat;
    _exportName: string;
    _asPerSpecification: boolean;
    /**
     * Gets the data format defined in form field export settings.
     *
     * @returns {DataFormat} - Returns the data format.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Sets the form field data export settings with output data format.
     * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
     * // Export form field to JSON format
     * let json: Uint8Array = document.exportFormData(settings);
     * // Get the data format defined in form field export settings
     * let dataFormat: DataFormat = settings.dataFormat;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the data format defined in form field export settings.
    *
    * @param {DataFormat} format - Specifies the data format.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Sets the form field data export settings with output data format.
    * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
    * // Set the data format defined in form field export settings.
    * settings.dataFormat = DataFormat.json;
    * // Export form field to JSON format
    * let json: Uint8Array = document.exportFormData(settings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    dataFormat: DataFormat;
    /**
     * Gets the export name defined in form field export settings.
     *
     * @returns {string} - Returns the string value.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Sets the form field data export settings with export name.
     * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
     * // Export form field to JSON format
     * let json: Uint8Array = document.exportFormData(settings);
     * // Get the export name defined in form field export settings
     * let name: boolean = settings.exportName;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the export name defined in form field export settings.
    *
    * @param {string} name - Specifies the export name of the form.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Sets the form field data export settings with export name.
    * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
    * // Set the export name defined in form field export settings.
    * settings.exportName = ‘JobApplication’.
    * // Export form field to JSON format
    * let json: Uint8Array = document.exportFormData(settings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    exportName: string;
    /**
     * Gets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
     *
     * @returns {boolean} - Returns the boolean value.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
     * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
     * // Export form field to JSON format
     * let json: Uint8Array = document.exportFormData(settings);
     * // Get the boolean value indicating whether the data in a form field can be exported based on a certain specification.
     * let asPerSpecification: boolean = settings.asPerSpecification;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
    *
    * @param {boolean} value - The boolean value.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
    * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
    * // Set the boolean value indicating whether the data in a form field can be exported based on a certain specification.
    * settings.asPerSpecification = true;
    * // Export form field to JSON format
    * let json: Uint8Array = document.exportFormData(settings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    asPerSpecification: boolean;
}
/**
 * The class provides various settings related to PDF pages.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Create a new PDF page settings instance
 * let pageSettings: PdfPageSettings = new PdfPageSettings();
 * // Sets the margins
 * pageSettings.margins = new PdfMargins(40);
 * // Sets the page size
 * pageSettings.size = [595, 842];
 * // Sets the page orientation
 * pageSettings.orientation = PdfPageOrientation.landscape;
 * // Add a new PDF page with page settings
 * page = document.addPage(pageSettings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPageSettings {
    _orientation: PdfPageOrientation;
    _size: number[];
    _isOrientation: boolean;
    _margins: PdfMargins;
    _rotation: PdfRotationAngle;
    /**
     * Initializes a new instance of the `PdfPageSettings` class
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Gets the orientation of the page.
     *
     * @returns {PdfPageOrientation} The orientation.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the page size
     * pageSettings.size = [842, 595];
     * // Gets the page orientation
     * let orientation: PdfPageOrientation = pageSettings.orientation;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the orientation of the page.
    *
    * @param {PdfPageOrientation} value The orientation.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    orientation: PdfPageOrientation;
    /**
     * Gets the size of the page.
     *
     * @returns {number[]} The width and height of the page as number array.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the width and height of the PDF page as number array
     * let size: number[] = page.size;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the width and height of the page.
    *
    * @param {number[]} value The width and height of the page as number array.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the page size
    * pageSettings.size = [595, 842];
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    size: number[];
    /**
     * Gets the margin value of the page.
     *
     * @returns {PdfMargins} PDF margins
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the margins
     * let margins: PdfMargins = pageSettings.margins;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the margin value of the page.
    *
    * @param {PdfMargins} value PDF margins
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the margins
    * pageSettings.margins = new PdfMargins(40);
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    margins: PdfMargins;
    /**
     * Gets the rotation angle of the PDF page.
     *
     * @returns {PdfRotationAngle} PDF rotation angle
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the rotation angle
     * let rotation: PdfRotationAngle = pageSettings.rotation;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation angle of the PDF page.
    *
    * @param {PdfRotationAngle} value PDF rotation angle
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the rotation angle
    * pageSettings.rotation = PdfRotationAngle.angle90;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotation: PdfRotationAngle;
    _updateSize(size: number[]): void;
    _updateSize(orientation: PdfPageOrientation): void;
    _updateOrientation(): void;
    _getActualSize(): number[];
}
/**
 * A class representing PDF page margins.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Create a new PDF page settings instance
 * let pageSettings: PdfPageSettings = new PdfPageSettings();
 * // Sets the margins
 * pageSettings.margins = new PdfMargins(40);
 * // Sets the page size
 * pageSettings.size = [595, 842];
 * // Sets the page orientation
 * pageSettings.orientation = PdfPageOrientation.landscape;
 * // Add a new PDF page with page settings
 * page = document.addPage(pageSettings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfMargins {
    _left: number;
    _right: number;
    _top: number;
    _bottom: number;
    /**
     * Initializes a new instance of the `PdfMargins` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance with specified margin values for each page side.
     *
     * @param {number} all The margin value for each side of the page.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(all: number);
    /**
     * Gets the left margin value of the page.
     *
     * @returns {number} Left margin.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the left margin
     * let left: number = pageSettings.margins.left;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the left margin value of the page.
    *
    * @param {number} value Left margin.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the margins
    * let margins: PdfMargins = new PdfMargins();
    * margins.left = 40;
    * margins.right = 40;
    * margins.top = 20;
    * margins.bottom = 20;
    * pageSettings.margins = margins;
    * // Sets the page size
    * pageSettings.size = [595, 842];
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    left: number;
    /**
     * Gets the right margin value of the page.
     *
     * @returns {number} Right margin.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the right margin
     * let right: number = pageSettings.margins.right;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the right margin value of the page.
    *
    * @param {number} value - Right margin.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the margins
    * let margins: PdfMargins = new PdfMargins();
    * margins.left = 40;
    * margins.right = 40;
    * margins.top = 20;
    * margins.bottom = 20;
    * pageSettings.margins = margins;
    * // Sets the page size
    * pageSettings.size = [595, 842];
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    right: number;
    /**
     * Gets the top margin value of the page.
     *
     * @returns {number} Top margin.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the top margin
     * let top: number = pageSettings.margins.top;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    *Sets the top margin value of the page.
    *
    * @param {number} value Top margin.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the margins
    * let margins: PdfMargins = new PdfMargins();
    * margins.left = 40;
    * margins.right = 40;
    * margins.top = 20;
    * margins.bottom = 20;
    * pageSettings.margins = margins;
    * // Sets the page size
    * pageSettings.size = [595, 842];
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    top: number;
    /**
     * Get the bottom margin value of the page.
     *
     * @returns {number} Bottom margin.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Gets the bottom margin
     * let bottom: number = pageSettings.margins.bottom;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bottom margin value of the page.
    *
    * @param {number} value Bottom margin.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Create a new PDF page settings instance
    * let pageSettings: PdfPageSettings = new PdfPageSettings();
    * // Sets the margins
    * let margins: PdfMargins = new PdfMargins();
    * margins.left = 40;
    * margins.right = 40;
    * margins.top = 20;
    * margins.bottom = 20;
    * pageSettings.margins = margins;
    * // Sets the page size
    * pageSettings.size = [595, 842];
    * // Sets the page orientation
    * pageSettings.orientation = PdfPageOrientation.landscape;
    * // Add a new PDF page with page settings
    * page = document.addPage(pageSettings);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    bottom: number;
}
/**
 * Public class to provide data for the document split event, including the split index and PDF data.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * document.splitEvent = documentSplitEvent;
 * // Split PDF document by fixed number of pages
 * document.splitByFixedNumber(1);
 * // Event to invoke while splitting PDF document data
 * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
 *  Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
 * }
 * // Destroy the document
 * document.destroy();
 */
export declare class PdfDocumentSplitEventArgs {
    private _index;
    private _pdfData;
    constructor(splitIndex: number, pdfData: Uint8Array);
    readonly pdfData: Uint8Array;
    readonly index: number;
}
