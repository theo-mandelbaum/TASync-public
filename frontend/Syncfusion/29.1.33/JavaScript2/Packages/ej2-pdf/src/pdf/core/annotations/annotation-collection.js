import { _PdfDictionary, _PdfReference } from './../pdf-primitives';
import { _checkReview, _isNullOrUndefined } from './../utils';
import { PdfLineAnnotation, PdfCircleAnnotation, PdfEllipseAnnotation, PdfAngleMeasurementAnnotation, PdfRectangleAnnotation, PdfSquareAnnotation, PdfPolyLineAnnotation, PdfPolygonAnnotation, PdfInkAnnotation, PdfPopupAnnotation, PdfAttachmentAnnotation, Pdf3DAnnotation, PdfFileLinkAnnotation, PdfWatermarkAnnotation, PdfRubberStampAnnotation, PdfSoundAnnotation, PdfFreeTextAnnotation, PdfRedactionAnnotation, PdfRichMediaAnnotation, PdfTextMarkupAnnotation, PdfDocumentLinkAnnotation, PdfTextWebLinkAnnotation, PdfUriAnnotation, PdfComment } from './annotation';
import { PdfAnnotationFlag } from './../enumerator';
/**
 * The class provides methods and properties to handle the collection of `PdfAnnotation`.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access annotation coolection from first page
 * let annotations: PdfAnnotationCollection = document.getPage(0).annotations;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfAnnotationCollection = /** @class */ (function () {
    /**
     * Represents a annotation collection.
     *
     * @private
     * @param {Array<_PdfReference>} array Annotation references.
     * @param {_PdfCrossReference} xref Cross reference object.
     * @param {PdfPage} page PDF page object.
     */
    function PdfAnnotationCollection(array, xref, page) {
        this._isExport = false;
        if (_isNullOrUndefined(array)) {
            this._annotations = array;
        }
        else {
            this._annotations = [];
        }
        this._page = page;
        this._crossReference = xref;
        this._parsedAnnotations = new Map();
        this._comments = [];
    }
    Object.defineProperty(PdfAnnotationCollection.prototype, "count", {
        /**
         * Gets the annotation count (Read only).
         *
         * @returns {number} Number of annotations.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the annotation count
         * let count: number = page.annotations.count;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._annotations.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the `PdfAnnotation` at the specified index.
     *
     * @param {number} index Field index.
     * @returns {PdfAnnotation} Annotation at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access the annotation at index 0
     * let annotation: PdfAnnotation = page.annotations.at(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfAnnotationCollection.prototype.at = function (index) {
        if (index < 0 || index >= this._annotations.length) {
            throw Error('Index out of range.');
        }
        if (!this._parsedAnnotations.has(index)) {
            var dictionary = this._annotations[Number.parseInt(index.toString(), 10)];
            if (dictionary && dictionary instanceof _PdfReference) {
                dictionary = this._crossReference._fetch(dictionary);
            }
            if (dictionary && dictionary instanceof _PdfDictionary) {
                var annotation = this._parseAnnotation(dictionary);
                if (annotation) {
                    annotation._ref = this._annotations[Number.parseInt(index.toString(), 10)];
                    this._parsedAnnotations.set(index, annotation);
                }
            }
        }
        return this._parsedAnnotations.get(index);
    };
    /**
     * Add a new `PdfAnnotation` into the collection.
     *
     * @param {PdfAnnotation} annotation Annotation to add.
     * @returns {number} Annotation index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Add a new annotation into the collection
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfAnnotationCollection.prototype.add = function (annotation) {
        if (typeof annotation === 'undefined' || annotation === null) {
            throw Error('annotation cannot be null or undefined');
        }
        if (annotation._isLoaded) {
            throw Error('cannot add an existing annotation');
        }
        annotation._initialize(this._page);
        var reference;
        if (typeof annotation._ref !== 'undefined' && annotation._ref._isNew) {
            reference = annotation._ref;
        }
        else {
            reference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(reference, annotation._dictionary);
            annotation._ref = reference;
        }
        var index = this._annotations.length;
        this._annotations.push(reference);
        this._parsedAnnotations.set(index, annotation);
        var isAdded = false;
        if (this._page && this._page._pageDictionary.has('Annots')) {
            var collection = this._page._pageDictionary.get('Annots');
            if (collection !== null && typeof collection !== 'undefined' && collection.indexOf(reference) === -1) {
                collection.push(reference);
                this._page._pageDictionary.set('Annots', collection);
                isAdded = true;
            }
        }
        if (!isAdded) {
            this._page._pageDictionary.set('Annots', this._annotations);
        }
        this._page._pageDictionary._updated = true;
        if (annotation && annotation instanceof PdfComment) {
            this._addCommentsAndReview(annotation, annotation._dictionary.get('F'));
        }
        this._updateCustomAppearanceResource(annotation);
        return index;
    };
    /**
     * Remove an annotation from the collection.
     *
     * @param {PdfAnnotation} annotation Annotation to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access first annotation from the PDF page
     * let annotation: PdfAnnotation = page.annotations.at(0);
     * // Remove an annotation from the collection
     * page.annotations.remove(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfAnnotationCollection.prototype.remove = function (annotation) {
        if (annotation && annotation._ref) {
            var index = this._annotations.lastIndexOf(annotation._ref);
            if (index > -1) {
                this.removeAt(index);
            }
        }
    };
    /**
     * Remove an annotation from the collection at the specified index.
     *
     * @param {number} index Annotation index.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Remove an annotation from the collection
     * page.annotations.removeAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfAnnotationCollection.prototype.removeAt = function (index) {
        if (index < 0 || index >= this._annotations.length) {
            throw Error('Index out of range.');
        }
        var reference = this._annotations[Number.parseInt(index.toString(), 10)];
        if (reference && this._page) {
            var array = this._page._getProperty('Annots');
            var actualIndex = array.indexOf(reference);
            if (actualIndex > -1) {
                array.splice(actualIndex, 1);
            }
            this._page._pageDictionary.set('Annots', array);
            this._page._pageDictionary._updated = true;
            if (this._annotations.indexOf(reference) > -1) {
                this._annotations.splice(index, 1);
            }
            if (this._parsedAnnotations.has(index)) {
                this._parsedAnnotations.delete(index);
                this._reorderParsedAnnotations(index);
            }
            var crossReference = this._page._crossReference;
            if (crossReference && crossReference._cacheMap.has(reference)) {
                crossReference._cacheMap.delete(reference);
            }
        }
    };
    PdfAnnotationCollection.prototype._reorderParsedAnnotations = function (index) {
        var result = new Map();
        this._parsedAnnotations.forEach(function (value, key) {
            if (key > index) {
                result.set(key - 1, value);
            }
            else {
                result.set(key, value);
            }
        });
        this._parsedAnnotations = result;
    };
    PdfAnnotationCollection.prototype._updateCustomAppearanceResource = function (annotation) {
        if (annotation && annotation instanceof PdfRubberStampAnnotation && typeof annotation._appearance !== 'undefined') {
            annotation._appearance.normal.graphics._processResources(annotation._crossReference);
        }
    };
    PdfAnnotationCollection.prototype._addCommentsAndReview = function (annotation, flag) {
        this._updateChildReference(annotation, annotation.comments, flag);
        this._updateChildReference(annotation, annotation.reviewHistory, flag);
    };
    PdfAnnotationCollection.prototype._updateChildReference = function (annotation, collection, flag) {
        if (collection && collection.count > 0) {
            if (flag !== 30) {
                for (var i = 0; i < collection.count; i++) {
                    var childAnnotation = collection._collection[Number.parseInt(i.toString(), 10)];
                    if (childAnnotation && !childAnnotation._dictionary.has('IRT')) {
                        if (i === 0 || !collection._isReview) {
                            childAnnotation._dictionary.update('IRT', annotation._ref);
                        }
                        else {
                            childAnnotation._dictionary.update('IRT', collection._collection[i - 1]._ref);
                        }
                        if (collection._isReview) {
                            childAnnotation._isReview = true;
                        }
                        else {
                            childAnnotation._isComment = true;
                        }
                        this.add(childAnnotation);
                    }
                }
            }
            else {
                throw new Error('Could not add comments/reviews to the review');
            }
        }
    };
    PdfAnnotationCollection.prototype._parseAnnotation = function (dictionary) {
        var annot;
        if (dictionary && dictionary.has('Subtype') && this._page !== null && typeof this._page !== 'undefined') {
            var key = dictionary.get('Subtype');
            var size = dictionary.get('Rect');
            if (key) {
                var link = void 0;
                switch (key.name) {
                    case 'Line':
                        annot = PdfLineAnnotation._load(this._page, dictionary);
                        break;
                    case 'Circle':
                        if (dictionary.has('Measure')) {
                            annot = PdfCircleAnnotation._load(this._page, dictionary);
                        }
                        else {
                            var width = size[2] - size[0];
                            var height = size[3] - size[1];
                            if (width === height) {
                                annot = PdfCircleAnnotation._load(this._page, dictionary);
                            }
                            else {
                                annot = PdfEllipseAnnotation._load(this._page, dictionary);
                            }
                        }
                        break;
                    case 'Square':
                        if (size[2] === size[3]) {
                            annot = PdfSquareAnnotation._load(this._page, dictionary);
                        }
                        else {
                            annot = PdfRectangleAnnotation._load(this._page, dictionary);
                        }
                        break;
                    case 'Polygon':
                        annot = PdfPolygonAnnotation._load(this._page, dictionary);
                        break;
                    case 'PolyLine':
                        if (dictionary.has('Measure') && dictionary.has('IT')) {
                            var type = dictionary.get('IT');
                            if (type && type.name === 'PolyLineAngle') {
                                annot = PdfAngleMeasurementAnnotation._load(this._page, dictionary);
                            }
                        }
                        if (!annot) {
                            annot = PdfPolyLineAnnotation._load(this._page, dictionary);
                        }
                        break;
                    case 'Ink':
                        annot = PdfInkAnnotation._load(this._page, dictionary);
                        break;
                    case 'Popup':
                        annot = PdfPopupAnnotation._load(this._page, dictionary);
                        break;
                    case 'Text':
                        annot = PdfPopupAnnotation._load(this._page, dictionary);
                        break;
                    case 'Link':
                        if (dictionary.has('A')) {
                            link = dictionary.get('A');
                        }
                        if (link && link.has('S')) {
                            var type = link.get('S').name;
                            if (type) {
                                var isTextWebLink = this._hasValidBorder(dictionary.getArray('Border'));
                                if (type === 'URI') {
                                    annot = isTextWebLink ?
                                        PdfTextWebLinkAnnotation._load(this._page, dictionary) :
                                        this._getLinkAnnotation(dictionary);
                                }
                                else if (type === 'Launch') {
                                    annot = PdfFileLinkAnnotation._load(this._page, dictionary);
                                }
                                else if (type === 'GoToR') {
                                    annot = this._getLinkAnnotation(dictionary);
                                }
                                else if (type === 'GoTo') {
                                    annot = PdfDocumentLinkAnnotation._load(this._page, dictionary);
                                }
                            }
                        }
                        else if (key.name === 'Link') {
                            annot = PdfDocumentLinkAnnotation._load(this._page, dictionary);
                        }
                        break;
                    case 'FileAttachment':
                        annot = PdfAttachmentAnnotation._load(this._page, dictionary);
                        break;
                    case '3D':
                        annot = Pdf3DAnnotation._load(this._page, dictionary);
                        break;
                    case 'FreeText':
                        annot = PdfFreeTextAnnotation._load(this._page, dictionary);
                        break;
                    case 'Redact':
                        annot = PdfRedactionAnnotation._load(this._page, dictionary);
                        break;
                    case 'RichMedia':
                        annot = PdfRichMediaAnnotation._load(this._page, dictionary);
                        break;
                    case 'Watermark':
                        annot = PdfWatermarkAnnotation._load(this._page, dictionary);
                        break;
                    case 'Stamp':
                        annot = PdfRubberStampAnnotation._load(this._page, dictionary);
                        break;
                    case 'Sound':
                        annot = PdfSoundAnnotation._load(this._page, dictionary);
                        break;
                    case 'Highlight':
                    case 'Squiggly':
                    case 'StrikeOut':
                    case 'Underline':
                        annot = PdfTextMarkupAnnotation._load(this._page, dictionary);
                        break;
                }
            }
        }
        return annot;
    };
    PdfAnnotationCollection.prototype._getLinkAnnotation = function (dictionary) {
        var annot;
        if (this._page) {
            if (dictionary && dictionary.has('A')) {
                var remote = dictionary.get('A');
                if (remote && remote.has('S')) {
                    var link = remote.get('S');
                    if (link && link.name === 'GoToR' && remote.has('F')) {
                        annot = PdfFileLinkAnnotation._load(this._page, dictionary);
                    }
                    else if (link && link.name === 'URI') {
                        annot = PdfUriAnnotation._load(this._page, dictionary);
                    }
                }
            }
            else {
                annot = PdfUriAnnotation._load(this._page, dictionary);
            }
        }
        return annot;
    };
    PdfAnnotationCollection.prototype._hasValidBorder = function (border) {
        if (typeof border === 'undefined' || border === null) {
            return false;
        }
        for (var i = 0; i < border.length; i++) {
            var val = 0;
            var value = border[Number.parseInt(i.toString(), 10)];
            if (value !== null && typeof value !== 'undefined') {
                val = value;
            }
            if (val > 0) {
                return false;
            }
        }
        return true;
    };
    PdfAnnotationCollection.prototype._doPostProcess = function (isFlatten) {
        var index = 0;
        while (index < this.count) {
            var annotation = this.at(index);
            if (annotation) {
                var flattenValue = annotation.flatten || isFlatten;
                annotation._isExport = this._isExport;
                if (flattenValue && this._annotations.lastIndexOf(annotation._ref) === -1) {
                    index++;
                }
                annotation._doPostProcess(flattenValue);
                if (!flattenValue) {
                    index++;
                }
            }
            else {
                index++;
            }
        }
    };
    PdfAnnotationCollection.prototype._reArrange = function (ref, tabIndex, index) {
        if (this._annotations) {
            if (tabIndex > this._annotations.length) {
                tabIndex = 0;
            }
            if (index >= this._annotations.length) {
                index = this._annotations.indexOf(ref);
            }
            var annotationDictionary = this._crossReference.
                _fetch(this._annotations[Number.parseInt(index.toString(), 10)]);
            if (annotationDictionary && annotationDictionary.has('Parent')) {
                var parentReference = annotationDictionary.getRaw('Parent');
                if ((parentReference && parentReference === ref) || ref ===
                    this._annotations[Number.parseInt(index.toString(), 10)]) {
                    var temp = this._annotations[Number.parseInt(index.toString(), 10)];
                    this._annotations[Number.parseInt(index.toString(), 10)] = this._annotations[Number.parseInt(tabIndex.toString(), 10)];
                    this._annotations[Number.parseInt(tabIndex.toString(), 10)] = temp;
                }
            }
        }
        return this._annotations;
    };
    PdfAnnotationCollection.prototype._clear = function () {
        this._annotations = [];
        this._parsedAnnotations = new Map();
        this._comments = [];
    };
    return PdfAnnotationCollection;
}());
export { PdfAnnotationCollection };
/**
 * Represents the collection of `PdfPopupAnnotation`
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access annotation collection from first page
 * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
 * // Gets the comments of annotation
 * let comments: PdfPopupAnnotationCollection = annotation.comments;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfPopupAnnotationCollection = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfPopupAnnotationCollection` class
     *
     * @private
     * @param {PdfAnnotation} annotation Annotation reference
     * @param {boolean} isReview Boolean flag to set review
     */
    function PdfPopupAnnotationCollection(annotation, isReview) {
        this._collection = [];
        if (annotation) {
            this._annotation = annotation;
        }
        this._isReview = isReview;
        if (annotation && this._annotation._isLoaded || annotation._page) {
            this._page = annotation._page;
            this._parentDictionary = annotation._dictionary;
            if (this._annotation._isLoaded) {
                this._parseCommentsOrReview();
            }
        }
    }
    Object.defineProperty(PdfPopupAnnotationCollection.prototype, "count", {
        /**
         * Gets the annotation count (Read only).
         *
         * @private
         * @returns {number} Number of annotations
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access annotation collection from first page
         * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
         * // Gets the comments of annotation
         * let comments: PdfPopupAnnotationCollection = annotation.comments;
         * // Gets the count of comments
         * let count: number = comments.count;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._collection.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the popup annotation at the specified index.
     *
     * @private
     * @param {number} index Index of the annotation
     * @returns {number} Annotation at the specified index
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Gets the first comment
     * let comment: PdfPopupAnnotation = comments.at(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfPopupAnnotationCollection.prototype.at = function (index) {
        if (index < 0 || index >= this._collection.length) {
            throw Error('Index out of range.');
        }
        return this._collection[Number.parseInt(index.toString(), 10)];
    };
    /**
     * Add a new popup annotation into the collection
     *
     * @param {PdfPopupAnnotation} annotation Annotation to add
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new popup annotation
     * const popupAnnotation: PdfPopupAnnotation = new PdfPopupAnnotation('Test popup annotation', 10, 40, 30, 30);
     * popupAnnotation.author = 'Syncfusion';
     * // Add a new popup annotation into the collection
     * annotation.comments.add(popupAnnotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfPopupAnnotationCollection.prototype.add = function (annotation) {
        if (this._annotation._dictionary.get('F') === 30) {
            throw new Error('Could not add comments/reviews to the review');
        }
        annotation._dictionary.update('F', ((this._annotation.flags === PdfAnnotationFlag.locked) ? 128 : (this._isReview ? 30 : 28)));
        if (this._annotation && (this._annotation._isLoaded || (this._page && this._annotation._ref))) {
            this._page.annotations.add(annotation);
            var length_1 = this._collection.length;
            if (length_1 === 0 || !this._isReview) {
                annotation._dictionary.update('IRT', this._annotation._ref);
            }
            else {
                annotation._dictionary.update('IRT', this._collection[Number.parseInt((length_1 - 1).toString(), 10)]._ref);
            }
            if (this._isReview) {
                annotation._isReview = true;
            }
            else {
                annotation._isComment = true;
            }
        }
        this._collection.push(annotation);
    };
    /**
     * Remove an annotation from the collection
     *
     * @param {PdfPopupAnnotation} annotation Annotation to remove
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Gets the first comment
     * let comment: PdfPopupAnnotation = comments.at(0);
     * // Remove the comment
     * comments.remove(comment);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfPopupAnnotationCollection.prototype.remove = function (annotation) {
        var index = this._collection.indexOf(annotation);
        if (index > -1) {
            this.removeAt(index);
        }
    };
    /**
     * Remove an annotation from the collection at the specified index
     *
     * @param {number} index Annotation index to remove
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Remove the first comment
     * comments.removeAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfPopupAnnotationCollection.prototype.removeAt = function (index) {
        if (index > -1 && index < this._collection.length) {
            var annotation = this._collection[Number.parseInt(index.toString(), 10)];
            if (this._isReview && index < this._collection.length - 1) {
                var nextAnnotation = this._collection[Number.parseInt((index + 1).toString(), 10)];
                var previous = annotation._dictionary._get('IRT');
                nextAnnotation._dictionary.set('IRT', previous);
                nextAnnotation._dictionary._updated = true;
            }
            this._collection.splice(index, 1);
            this._page.annotations.remove(annotation);
        }
        else {
            throw new Error('Index out of range.');
        }
    };
    PdfPopupAnnotationCollection.prototype._parseCommentsOrReview = function () {
        if (this._isReview) {
            this._parseReview();
        }
        else {
            this._parseComments();
        }
    };
    PdfPopupAnnotationCollection.prototype._parseReview = function () {
        var collection;
        if (this._page) {
            collection = this._page.annotations;
        }
        var map = new Map();
        map.set(this._annotation._ref, this._annotation);
        if (collection && collection._comments && collection._comments.length > 0) {
            var remaining = [];
            for (var i = 0; i < collection._comments.length; i++) {
                var annotation = collection._comments[Number.parseInt(i.toString(), 10)];
                var reference = annotation._dictionary._get('IRT');
                if (annotation._isReview && reference && map.has(reference)) {
                    this._collection.push(annotation);
                    map.set(annotation._ref, annotation);
                }
                else {
                    remaining.push(annotation);
                }
            }
            if (remaining.length > 0) {
                collection._comments = remaining;
            }
            else {
                collection._comments = [];
            }
        }
        else if (collection) {
            var count = collection.count;
            for (var i = 0; i < count; i++) {
                var annotation = collection.at(i);
                if (annotation && annotation instanceof PdfPopupAnnotation) {
                    var dictionary = annotation._dictionary;
                    if (annotation._dictionary.has('IRT')) {
                        var reference = dictionary._get('IRT');
                        if (annotation._isReview && reference && map.has(reference)) {
                            this._collection.push(annotation);
                            map.set(annotation._ref, annotation);
                        }
                        else {
                            collection._comments.push(annotation);
                        }
                    }
                }
            }
        }
        map.clear();
    };
    PdfPopupAnnotationCollection.prototype._parseComments = function () {
        var collection;
        if (this._page) {
            collection = this._page.annotations;
        }
        if (collection && collection._comments && collection._comments.length > 0) {
            var remaining = [];
            for (var i = 0; i < collection._comments.length; i++) {
                var annotation = collection._comments[Number.parseInt(i.toString(), 10)];
                var dictionary = annotation._dictionary;
                var isReview = _checkReview(dictionary);
                var reference = dictionary._get('IRT');
                if (reference && reference === this._annotation._ref && !isReview) {
                    this._collection.push(annotation);
                }
                else {
                    remaining.push(annotation);
                }
            }
            if (remaining.length > 0) {
                collection._comments = remaining;
            }
            else {
                collection._comments = [];
            }
        }
        else if (collection) {
            var count = collection.count;
            for (var i = 0; i < count; i++) {
                var annotation = collection.at(i);
                if (annotation && annotation instanceof PdfPopupAnnotation) {
                    var dictionary = annotation._dictionary;
                    if (annotation._dictionary.has('IRT')) {
                        var isReview = _checkReview(dictionary);
                        var reference = dictionary._get('IRT');
                        if (reference && reference === this._annotation._ref && !isReview) {
                            this._collection.push(annotation);
                        }
                        else {
                            collection._comments.push(annotation);
                        }
                    }
                }
            }
        }
    };
    return PdfPopupAnnotationCollection;
}());
export { PdfPopupAnnotationCollection };
