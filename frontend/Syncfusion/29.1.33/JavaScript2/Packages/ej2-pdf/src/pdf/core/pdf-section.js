import { _PdfDictionary, _PdfName } from './pdf-primitives';
import { PdfPage } from './pdf-page';
import { _updatePageSettings, _updatePageCount } from './utils';
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
var PdfSection = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfSection` class.
     *
     * @param {PdfDocument} document PDF document.
     * @param {PdfPageSettings} settings Page settings.
     *
     * @private
     */
    function PdfSection(document, settings) {
        this._pageCount = 0;
        this._document = document;
        this._crossReference = document._crossReference;
        var sectionDictionary = new _PdfDictionary(this._crossReference);
        sectionDictionary.update('Type', _PdfName.get('Pages'));
        this._pageSettings = settings;
        _updatePageSettings(sectionDictionary, settings);
        var sectionReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(sectionReference, sectionDictionary);
        sectionDictionary.objId = sectionReference.toString();
        sectionDictionary.update('Kids', []);
        sectionDictionary.update('Count', 0);
        this._dictionary = sectionDictionary;
        this._reference = sectionReference;
        var pageCount = this._document.pageCount;
        if (pageCount === 0) {
            var parentReference = this._document._catalog._catalogDictionary._get('Pages');
            var topPagesDictionary = this._document._catalog._topPagesDictionary;
            if (topPagesDictionary) {
                if (topPagesDictionary.has('Kids')) {
                    var kids = topPagesDictionary.get('Kids');
                    if (kids) {
                        kids.push(sectionReference);
                        topPagesDictionary.update('Kids', kids);
                        sectionDictionary.update('Parent', parentReference);
                    }
                }
                else {
                    topPagesDictionary.update('Kids', [sectionReference]);
                    sectionDictionary.update('Parent', parentReference);
                }
            }
        }
        else {
            var lastPage = this._document.getPage(pageCount - 1);
            if (lastPage && lastPage._pageDictionary) {
                var parentReference = lastPage._pageDictionary._get('Parent');
                var parentDictionary = this._crossReference._fetch(parentReference);
                if (parentDictionary && parentDictionary.has('Kids')) {
                    var kids = parentDictionary.get('Kids');
                    if (kids) {
                        kids.push(sectionReference);
                        parentDictionary.update('Kids', kids);
                        sectionDictionary.update('Parent', parentReference);
                    }
                }
            }
        }
    }
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
    PdfSection.prototype.addPage = function () {
        var pageIndex = this._document.pageCount === 0 ? 0 : (this._document.pageCount);
        var pageDictionary = new _PdfDictionary(this._crossReference);
        pageDictionary.update('Type', _PdfName.get('Page'));
        var pageReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pageReference, pageDictionary);
        pageDictionary.objId = pageReference.toString();
        pageDictionary.update('Parent', this._reference);
        if (this._dictionary.has('Kids')) {
            var kids = this._dictionary.get('Kids');
            if (kids) {
                kids.push(pageReference);
                this._dictionary.update('Kids', kids);
                _updatePageCount(this._dictionary, 1);
                this._document._pageCount++;
            }
        }
        else {
            this._dictionary.update('Kids', [pageReference]);
            _updatePageCount(this._dictionary, 1);
            this._document._pageCount = 1;
        }
        this._pageCount++;
        var result = new PdfPage(this._crossReference, pageIndex, pageDictionary, pageReference);
        result._pageSettings = this._pageSettings;
        result._isNew = true;
        this._document._pages.set(pageIndex, result);
        return result;
    };
    return PdfSection;
}());
export { PdfSection };
