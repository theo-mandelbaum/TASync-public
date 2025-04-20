import { PdfCrossReferenceType } from './enumerator';
/**
 * `PdfFileStructure` class represents the internal structure of the PDF file.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the internal file structure of the PDF document
 * let fileStructure: PdfFileStructure = document.fileStructure;
 * // Set the cross reference type
 * fileStructure.crossReferenceType = PdfCrossReferenceType.stream;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfFileStructure {
    _crossReferenceType: PdfCrossReferenceType;
    _incrementalUpdate: boolean;
    /**
     * Gets the cross reference type of the PDF document.
     *
     * @returns {PdfCrossReferenceType} - Returns the cross reference type of the PDF document.
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
    /**
    * Sets the cross reference type of the PDF document.
    *
    * @param {PdfCrossReferenceType} value - Specifies the cross reference type of the PDF document.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the internal file structure of the PDF document
    * let fileStructure: PdfFileStructure = document.fileStructure;
    * // Set the cross reference type
    * fileStructure.crossReferenceType = PdfCrossReferenceType.stream;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    crossReferenceType: PdfCrossReferenceType;
    /**
     * Gets the boolean flag indicating whether the update is incremental.
     *
     * @returns { boolean } - Returns true if the PDF document supports incremental updates, otherwise false
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the internal file structure of the PDF document
     * let fileStructure: PdfFileStructure = document.fileStructure;
     * // Get the incremental update
     * let incrementalUpdate: boolean = fileStructure.isIncrementalUpdate;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether the update is incremental.
    *
    * @param {boolean} value - If `true`, enables incremental updates for the PDF document; otherwise, disables it.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the internal file structure of the PDF document
    * let fileStructure: PdfFileStructure = document.fileStructure;
    * // Set the incremental updates
    * fileStructure.isIncrementalUpdate = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    isIncrementalUpdate: boolean;
}
