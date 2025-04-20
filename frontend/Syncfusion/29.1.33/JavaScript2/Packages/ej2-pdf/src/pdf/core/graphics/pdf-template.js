import { _PdfName } from './../pdf-primitives';
import { _PdfBaseStream, _PdfContentStream } from './../base-stream';
import { PdfGraphics } from './pdf-graphics';
import { _toRectangle } from './../utils';
import { _JsonDocument } from './../import-export/json-document';
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
var PdfTemplate = /** @class */ (function () {
    function PdfTemplate(value, crossReference) {
        this._isExported = false;
        this._isResourceExport = false;
        this._isSignature = false;
        this._crossReference = crossReference;
        if (value instanceof _PdfBaseStream) {
            this._content = value;
            if (!this._content.dictionary.has('Type') || !this._content.dictionary.has('Subtype')) {
                this._initialize();
            }
            var bounds = this._content.dictionary.getArray('BBox');
            if (bounds && bounds.length > 3) {
                var rect = _toRectangle(bounds);
                this._size = [rect.width, rect.height];
                this._templateOriginalSize = this._size;
            }
            this._isReadOnly = true;
        }
        else {
            if (typeof value !== 'undefined') {
                this._size = [value[2], value[3]];
                this._content = new _PdfContentStream([]);
                this._content.dictionary._crossReference = this._crossReference;
                this._initialize();
                this._content.dictionary.set('BBox', [value[0], value[1], value[0] + value[2], value[1] + value[3]]);
            }
            else {
                this._isReadOnly = true;
            }
        }
        this._writeTransformation = true;
    }
    Object.defineProperty(PdfTemplate.prototype, "graphics", {
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
        get: function () {
            if (this._isReadOnly) {
                return null;
            }
            if (typeof this._g === 'undefined') {
                this._g = new PdfGraphics(this._size, this._content, this._crossReference, this);
                if (this._writeTransformation) {
                    this._g._initializeCoordinates();
                }
                this._g._isTemplateGraphics = true;
            }
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTemplate.prototype, "size", {
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
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTemplate.prototype, "_originalSize", {
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
        get: function () {
            return this._templateOriginalSize;
        },
        enumerable: true,
        configurable: true
    });
    PdfTemplate.prototype._initialize = function () {
        this._content.dictionary.set('Type', _PdfName.get('XObject'));
        this._content.dictionary.set('Subtype', _PdfName.get('Form'));
    };
    PdfTemplate.prototype._exportStream = function (dictionary, crossReference) {
        var jsonDocument = new _JsonDocument();
        jsonDocument._crossReference = crossReference;
        jsonDocument._isAnnotationExport = true;
        var resourceTable = new Map();
        jsonDocument._writeObject(resourceTable, dictionary.get('N'), dictionary, 'normal');
        this._appearance = jsonDocument._convertToJson(resourceTable);
        jsonDocument._dispose();
    };
    PdfTemplate.prototype._importStream = function (hasCrossReference, isResourceExport) {
        var jsonDocument = new _JsonDocument();
        if (hasCrossReference) {
            jsonDocument._crossReference = this._crossReference;
        }
        var json = JSON.parse(this._appearance); // eslint-disable-line    
        if (json) {
            var entryKey = isResourceExport ? 'resources' : 'normal'; // eslint-disable-line
            var entry = json[entryKey]; // eslint-disable-line    
            if (entry) {
                if (isResourceExport) {
                    var resourceDictionary = jsonDocument._parseDictionary(entry['dict']);
                    if (hasCrossReference) {
                        this._content.dictionary.update('Resources', resourceDictionary);
                    }
                }
                else {
                    this._content = jsonDocument._parseStream(entry['stream']);
                    if (hasCrossReference) {
                        this._content.dictionary._crossReference = this._crossReference;
                        this._content.dictionary._updated = true;
                    }
                }
            }
        }
        jsonDocument._dispose();
    };
    PdfTemplate.prototype._updatePendingResource = function (crossReference) {
        if (this._content._pendingResources && this._content._pendingResources !== '') {
            var jsonDocument = new _JsonDocument();
            jsonDocument._crossReference = crossReference;
            jsonDocument._parseStreamElements(this._content);
            this._content._pendingResources = '';
            jsonDocument._dispose();
        }
    };
    return PdfTemplate;
}());
export { PdfTemplate };
