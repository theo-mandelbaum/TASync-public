import { _PdfCrossReference } from './pdf-cross-reference';
import { _PdfDictionary, _PdfReference } from './pdf-primitives';
import { PdfDocument, PdfPageSettings } from './pdf-document';
import { PdfPage } from './pdf-page';
/**
 * Represents a PDF section, a set of pages with similar page settings.
 * ```typescript
 * // Create a new PDF document
 * let document: PdfDocument = new PdfDocument();
 * // Add a new section to the document
 * let section: PdfSection = document.addSection();
 * // Add a page to the section
 * let page: PdfPage = section.addPage();
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfSection {
    _document: PdfDocument;
    _crossReference: _PdfCrossReference;
    _dictionary: _PdfDictionary;
    _reference: _PdfReference;
    _pageCount: number;
    _pageSettings: PdfPageSettings;
    /**
     * Initializes a new instance of the `PdfSection` class.
     *
     * @param {PdfDocument} document PDF document.
     * @param {PdfPageSettings} settings Page settings.
     *
     * @private
     */
    constructor(document: PdfDocument, settings: PdfPageSettings);
    /**
     * Creates a new page and adds it to the collection.
     *
     * @returns {PdfPage} PDF page.
     *
     * ```typescript
     * // Create a new PDF document
     * let document: PdfDocument = new PdfDocument();
     * // Add a new section to the document
     * let section: PdfSection = document.addSection();
     * // Add a page to the section
     * let page: PdfPage = section.addPage();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPage(): PdfPage;
}
