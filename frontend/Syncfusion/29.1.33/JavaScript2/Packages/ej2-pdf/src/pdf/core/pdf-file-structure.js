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
var PdfFileStructure = /** @class */ (function () {
    function PdfFileStructure() {
        this._incrementalUpdate = true;
    }
    Object.defineProperty(PdfFileStructure.prototype, "crossReferenceType", {
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
        get: function () {
            return this._crossReferenceType;
        },
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
        set: function (value) {
            this._crossReferenceType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFileStructure.prototype, "isIncrementalUpdate", {
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
        get: function () {
            return this._incrementalUpdate;
        },
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
        set: function (value) {
            this._incrementalUpdate = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfFileStructure;
}());
export { PdfFileStructure };
