import { PdfPage } from './../pdf-page';
import { _PdfStreamWriter } from './pdf-stream-writer';
import { _PdfBaseStream } from './../base-stream';
import { _floatToString, _addProcSet, _reverseMapBlendMode, _mapBlendMode, _getNewGuidString, _getBezierArc, _numberToString, _bytesToString, _stringToUnicodeArray } from './../utils';
import { _PdfDictionary, _PdfReference, _PdfName } from './../pdf-primitives';
import { PdfFont, PdfFontStyle, PdfStandardFont, PdfTrueTypeFont } from './../fonts/pdf-standard-font';
import { _PdfStringLayouter, _LineType, _StringTokenizer } from './../fonts/string-layouter';
import { PdfTextAlignment, PdfTextDirection, PdfSubSuperScript, PdfBlendMode, PdfLineJoin, PdfLineCap, PdfDashStyle, PdfFillMode, PathPointType } from './../enumerator';
import { PdfStringFormat, PdfVerticalAlignment } from './../fonts/pdf-string-format';
import { PdfTemplate } from './pdf-template';
import { PdfPath } from './pdf-path';
import { _UnicodeTrueTypeFont } from '../fonts/unicode-true-type-font';
import { _RtlRenderer } from './../graphics/rightToLeft/text-renderer';
import { PdfImage } from './images/pdf-image';
/**
 * Represents a graphics from a PDF page.
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
var PdfGraphics = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfGraphics` class.
     *
     * @param {number[]} size The graphics client size.
     * @param {_PdfContentStream} content Content stream.
     * @param {_PdfCrossReference} xref Cross reference.
     * @param {PdfPage | PdfTemplate} source Source object of the graphics.
     * @private
     */
    function PdfGraphics(size, content, xref, source) {
        this._pendingResource = []; // eslint-disable-line
        this._isItalic = false;
        this._hasResourceReference = false;
        if (source instanceof PdfPage) {
            this._source = source._pageDictionary;
            this._page = source;
        }
        else if (source instanceof PdfTemplate) {
            this._source = source._content.dictionary;
            this._template = source;
        }
        if (this._source && this._source.has('Resources')) {
            var obj = this._source.getRaw('Resources'); // eslint-disable-line
            if (obj) {
                if (obj instanceof _PdfReference) {
                    this._hasResourceReference = true;
                    this._resourceObject = xref._fetch(obj);
                }
                else if (obj instanceof _PdfDictionary) {
                    this._resourceObject = obj;
                }
            }
        }
        else {
            this._resourceObject = new _PdfDictionary();
            this._source.update('Resources', this._resourceObject);
        }
        this._crossReference = xref;
        this._sw = new _PdfStreamWriter(content);
        this._size = size;
        _addProcSet('PDF', this._resourceObject);
        this._initialize();
    }
    Object.defineProperty(PdfGraphics.prototype, "clientSize", {
        /**
         * Gets the size of the canvas reduced by margins and page templates (Read only).
         *
         * @returns {number[]} The width and height of the client area as number array.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics client size.
         * let size: number[] = page.graphics.clientSize;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return [this._clipBounds[2], this._clipBounds[3]];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfGraphics.prototype, "_matrix", {
        get: function () {
            if (typeof this._m === 'undefined') {
                this._m = new _PdfTransformationMatrix();
            }
            return this._m;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfGraphics.prototype, "_resources", {
        get: function () {
            var _this = this;
            if (typeof this._resourceMap === 'undefined') {
                this._resourceMap = new Map();
                if (this._resourceObject && this._resourceObject.has('Font')) {
                    var fonts = this._resourceObject.get('Font');
                    if (fonts && fonts.size > 0) {
                        fonts.forEach(function (key, value) {
                            if (value !== null && typeof value !== 'undefined' && value instanceof _PdfReference) {
                                _this._resourceMap.set(value, _PdfName.get(key));
                            }
                        });
                    }
                }
                if (this._resourceObject.has('XObject')) {
                    var other = this._resourceObject.get('XObject');
                    if (other && other.size > 0) {
                        other.forEach(function (key, value) {
                            if (value !== null && typeof value !== 'undefined' && value instanceof _PdfReference) {
                                _this._resourceMap.set(value, _PdfName.get(key));
                            }
                        });
                    }
                }
                if (this._resourceObject.has('ExtGState')) {
                    var state = this._resourceObject.get('ExtGState');
                    if (state && state.size > 0) {
                        if (!this._transparencies) {
                            this._transparencies = new Map();
                        }
                        state.forEach(function (key, value) {
                            if (value !== null && typeof value !== 'undefined' && value instanceof _PdfReference) {
                                _this._setTransparencyData(value, _PdfName.get(key));
                            }
                        });
                    }
                }
            }
            return this._resourceMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Save the current graphics state.
     *
     * @returns {PdfGraphicsState} graphics state.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Save the graphics
     * let state: PdfGraphicsState = graphics.save();
     * //Set graphics translate transform.
     * graphics.translateTransform(100, 100);
     * //Draws the String.
     * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * //Restore the graphics.
     * graphics.restore(state);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.save = function () {
        var state = new PdfGraphicsState(this, this._matrix);
        state._textRenderingMode = this._textRenderingMode;
        state._charSpacing = this._characterSpacing;
        state._textScaling = this._textScaling;
        state._wordSpacing = this._wordSpacing;
        state._currentBrush = this._currentBrush;
        state._currentPen = this._currentPen;
        state._currentFont = this._currentFont;
        this._graphicsState.push(state);
        this._sw._saveGraphicsState();
        return state;
    };
    /**
     * Restore the graphics state.
     *
     * @param {PdfGraphicsState} state graphics state.
     * @returns {void} restore of the graphics state.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Save the graphics
     * let state: PdfGraphicsState = graphics.save();
     * //Set graphics translate transform.
     * graphics.translateTransform(100, 100);
     * //Draws the String.
     * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * //Restore the graphics.
     * graphics.restore(state);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.restore = function (state) {
        if (this._graphicsState.length > 0) {
            if (typeof state === 'undefined') {
                this._doRestore();
            }
            else {
                if (this._graphicsState.length > 0 && this._graphicsState.indexOf(state) !== -1) {
                    while (this._graphicsState.length > 0) {
                        if (this._doRestore() === state) {
                            break;
                        }
                    }
                }
            }
        }
    };
    PdfGraphics.prototype._doRestore = function () {
        var state = this._graphicsState.pop();
        this._m = state._transformationMatrix;
        this._currentBrush = state._currentBrush;
        this._currentPen = state._currentPen;
        this._currentFont = state._currentFont;
        this._characterSpacing = state._charSpacing;
        this._wordSpacing = state._wordSpacing;
        this._textScaling = state._textScaling;
        this._textRenderingMode = state._textRenderingMode;
        this._sw._restoreGraphicsState();
        return state;
    };
    PdfGraphics.prototype.drawRectangle = function (x, y, width, height, first, second) {
        this._beginMarkContent();
        var result = this._setPenBrush(first, second);
        this._sw._appendRectangle(x, y, width, height);
        this._drawGraphicsPath(result.pen, result.brush);
        this._endMarkContent();
    };
    /**
     * Draws a Bezier curve using a specified pen and coordinates for the start point, two control points, and end point.
     *
     * @param {number} startX The x-coordinate of the starting point of the Bezier curve.
     * @param {number} startY The y-coordinate of the starting point of the Bezier curve.
     * @param {number} firstX The x-coordinate of the first control point of the Bezier curve.
     * @param {number} firstY The y-coordinate of the first control point of the Bezier curve.
     * @param {number} secondX The x-coordinate of the second control point of the Bezier curve.
     * @param {number} secondY The y-coordinate of the second control point of the Bezier curve.
     * @param {number} endX The x-coordinate of the ending point of the Bezier curve.
     * @param {number} endY The y-coordinate of the ending point of the Bezier curve.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the Bezier curve.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw a Bezier curve on the page graphics
     * graphics.drawBezier(50, 100, 200, 50, 100, 150, 150, 100, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawBezier = function (startX, startY, firstX, firstY, secondX, secondY, endX, endY, pen) {
        this._beginMarkContent();
        this._stateControl(pen, null, null);
        this._sw._beginPath(startX, startY);
        this._sw._appendBezierSegment(firstX, firstY, secondX, secondY, endX, endY);
        this._drawGraphicsPath(pen);
        this._endMarkContent();
    };
    PdfGraphics.prototype.drawPie = function (x, y, width, height, startAngle, sweepAngle, first, second) {
        this._beginMarkContent();
        var result = this._setPenBrush(first, second);
        this._constructPiePath(x, y, x + width, y + height, startAngle, sweepAngle);
        this._sw._appendLineSegment(x + width / 2, y + height / 2);
        this._drawGraphicsPath(result.pen, result.brush, null, true);
        this._endMarkContent();
    };
    PdfGraphics.prototype.drawPolygon = function (points, first, second) {
        this._beginMarkContent();
        if (points.length > 0) {
            var result = this._setPenBrush(first, second);
            this._sw._beginPath(points[0][0], points[0][1]);
            for (var i = 1; i < points.length; i++) {
                this._sw._appendLineSegment(points[Number.parseInt(i.toString(), 10)][0], points[Number.parseInt(i.toString(), 10)][1]);
            }
            this._drawGraphicsPath(result.pen, result.brush, PdfFillMode.winding, true);
        }
        this._endMarkContent();
    };
    PdfGraphics.prototype.drawEllipse = function (x, y, width, height, first, second) {
        this._beginMarkContent();
        var result = this._setPenBrush(first, second);
        this._constructArcPath(x, y, x + width, y + height, 0, 360);
        this._drawGraphicsPath(result.pen, result.brush, PdfFillMode.winding, true);
        this._endMarkContent();
    };
    /**
     * Draw arc on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse from which the arc shape comes.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse from which the arc shape comes.
     * @param {number} width Width of the bounding rectangle that defines the ellipse from which the arc shape comes.
     * @param {number} height Height of the bounding rectangle that defines the ellipse from which the arc shape comes.
     * @param {number} startAngle Angle measured in degrees clockwise from the x-axis to the first side of the arc shape.
     * @param {number} sweepAngle Angle measured in degrees clockwise from the startAngle parameter to the second side of the arc shape.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the arc.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw an arc on the page graphics
     * graphics.drawArc(10, 20, 100, 200, 20, 30, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawArc = function (x, y, width, height, startAngle, sweepAngle, pen) {
        if (sweepAngle !== 0) {
            this._beginMarkContent();
            this._stateControl(pen);
            this._constructArcPath(x, y, x + width, y + height, startAngle, sweepAngle);
            this._drawGraphicsPath(pen, null, PdfFillMode.winding, false);
            this._endMarkContent();
        }
    };
    PdfGraphics.prototype._beginMarkContent = function () {
        if (this._layer) {
            this._layer._beginLayer(this);
        }
    };
    PdfGraphics.prototype._endMarkContent = function () {
        if (this._layer) {
            if (this._layer._isEndState && this._layer._parentLayer.length !== 0) {
                for (var i = 0; i < this._layer._parentLayer.length; i++) {
                    this._sw._write('EMC');
                }
            }
            if (this._layer._isEndState) {
                this._sw._write('EMC');
            }
        }
    };
    PdfGraphics.prototype.drawImage = function (arg1, arg2, arg3, arg4, arg5) {
        this._beginMarkContent();
        if (typeof arg2 === 'number' && typeof arg3 === 'number' && typeof arg4 === 'undefined') {
            var size = arg1.physicalDimension;
            this.drawImage(arg1, arg2, arg3, size[0], size[1]);
        }
        else {
            arg1._save();
            var matrix = new _PdfTransformationMatrix();
            this._getTranslateTransform(arg2, (arg3 + arg5), matrix);
            this._getScaleTransform(arg4, arg5, matrix);
            this._sw._write('q');
            this._sw._modifyCtm(matrix);
            var sourceDictionary = void 0;
            var keyName = void 0;
            var isNew = true;
            if (this._resourceObject.has('XObject')) {
                var obj = this._resourceObject.getRaw('XObject'); // eslint-disable-line
                if (obj instanceof _PdfDictionary) {
                    sourceDictionary = obj;
                }
                if (sourceDictionary) {
                    isNew = false;
                }
            }
            if (isNew) {
                sourceDictionary = new _PdfDictionary(this._crossReference);
                this._resourceObject.update('XObject', sourceDictionary);
            }
            if (typeof keyName === 'undefined') {
                keyName = _PdfName.get(_getNewGuidString());
            }
            if (this._crossReference) {
                this._updateImageResource(arg1, keyName, sourceDictionary, this._crossReference);
                this._source.update('Resources', this._resourceObject);
                this._source._updated = true;
            }
            else {
                this._pendingResource.push({ 'resource': arg1, 'key': keyName, 'source': sourceDictionary });
            }
            this._sw._executeObject(keyName);
            this._sw._write('Q');
            this._sw._write('\r\n');
            _addProcSet('ImageB', this._resourceObject);
            _addProcSet('ImageC', this._resourceObject);
            _addProcSet('ImageI', this._resourceObject);
            _addProcSet('Text', this._resourceObject);
        }
        this._endMarkContent();
    };
    /**
     * Draws a PDF template onto the page graphics.
     *
     * @param {PdfTemplate} template The PDF template to be drawn.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the template.
     * @param {number} bounds.x The x-coordinate of the upper-left corner where the template will be drawn.
     * @param {number} bounds.y The y-coordinate of the upper-left corner where the template will be drawn.
     * @param {number} bounds.width The width of the area where the template will be drawn.
     * @param {number} bounds.height The height of the area where the template will be drawn.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Get the first annotation of the page
     * let annotation: PdfRubberStampAnnotation = page.annotations.at(0) as PdfRubberStampAnnotation;
     * // Get the appearance template of the annotation
     * let template: PdfTemplate = annotation.createTemplate();
     * // Get the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Draw the template on the page graphics within the specified bounds
     * graphics.drawTemplate(template, { x: 10, y: 20, width: template.size[0], height: template.size[1] });
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawTemplate = function (template, bounds) {
        var _this = this;
        this._beginMarkContent();
        if (typeof template !== 'undefined') {
            if (template._isExported || template._isResourceExport) {
                if (this._crossReference) {
                    template._crossReference = this._crossReference;
                    template._importStream(true, template._isResourceExport);
                }
                else {
                    template._importStream(false, template._isResourceExport);
                    this._pendingResource.push(template);
                }
            }
            var scaleX = (template && template._size[0] > 0) ? bounds.width / template._size[0] : 1;
            var scaleY = (template && template._size[1] > 0) ? bounds.height / template._size[1] : 1;
            var needScale = !(Math.trunc(scaleX * 1000) / 1000 === 1 && Math.trunc(scaleY * 1000) / 1000 === 1);
            var cropBox = void 0;
            var mediaBox = void 0;
            if (this._page) {
                cropBox = this._page.cropBox;
                mediaBox = this._page.mediaBox;
                if (this._page._pageDictionary.has('CropBox') && this._page._pageDictionary.has('MediaBox')) {
                    if (cropBox[0] > 0 && cropBox[1] > 0 && mediaBox[0] < 0 && mediaBox[1] < 0) {
                        this.translateTransform(cropBox[0], -cropBox[1]);
                        bounds.x = -cropBox[0];
                        bounds.y = cropBox[1];
                    }
                }
            }
            var state = this.save();
            var matrix = new _PdfTransformationMatrix();
            if (this._page) {
                var needTransform = (this._page._pageDictionary.has('CropBox') &&
                    this._page._pageDictionary.has('MediaBox') && cropBox && mediaBox &&
                    cropBox[0] === mediaBox[0] && cropBox[1] === mediaBox[1] && cropBox[2] === mediaBox[2] && cropBox[3] === mediaBox[3]) ||
                    (this._page._pageDictionary.has('MediaBox') && mediaBox && mediaBox[3] === 0);
                matrix._translate(bounds.x, -(bounds.y + ((this._page._origin[0] >= 0 || needTransform) ? bounds.height : 0)));
            }
            else {
                matrix._translate(bounds.x, -(bounds.y + bounds.height));
            }
            var scaleApplied = false;
            if (template._content && template._content.dictionary) {
                var dictionary = template._content.dictionary;
                if (dictionary.has('Matrix') && dictionary.has('BBox')) {
                    var templateMatrix = dictionary.getArray('Matrix');
                    var templateBox = dictionary.getArray('BBox');
                    if (templateMatrix && templateBox && templateMatrix.length > 5 && templateBox.length > 3) {
                        var templateScaleX = Number.parseFloat(_numberToString(-templateMatrix[1]));
                        var templateScaleY = Number.parseFloat(_numberToString(templateMatrix[2]));
                        var roundScaleX = Number.parseFloat(_numberToString(scaleX));
                        var roundScaleY = Number.parseFloat(_numberToString(scaleY));
                        if (roundScaleX === templateScaleX &&
                            roundScaleY === templateScaleY &&
                            templateBox[2] === template._size[0] &&
                            templateBox[3] === template._size[1] && template._isAnnotationTemplate
                            && template._needScale && needScale) {
                            matrix = new _PdfTransformationMatrix();
                            matrix._translate(bounds.x - templateMatrix[4], -(bounds.y + templateMatrix[5]));
                            matrix._scale(1, 1);
                            scaleApplied = true;
                        }
                        else if (templateBox[0] !== 0 && templateBox[1] !== 0 && templateBox[0] === bounds.x &&
                            this._page && template._isSignature) {
                            matrix._translate(bounds.x - templateBox[0], -this._page.size[1]);
                            matrix._scale(scaleX, scaleY);
                            scaleApplied = true;
                        }
                    }
                }
            }
            if (needScale && !scaleApplied) {
                matrix._scale(scaleX, scaleY);
            }
            this._sw._modifyCtm(matrix);
            var sourceDictionary = void 0;
            var isReference = false;
            var keyName_1;
            var isNew = true;
            var ref_1;
            if (this._resourceObject.has('XObject')) {
                var obj = this._resourceObject.getRaw('XObject'); // eslint-disable-line
                if (obj) {
                    if (obj instanceof _PdfReference) {
                        isReference = true;
                        sourceDictionary = this._crossReference._fetch(obj);
                    }
                    else if (obj instanceof _PdfDictionary) {
                        sourceDictionary = obj;
                    }
                }
                if (sourceDictionary) {
                    isNew = false;
                    this._resources.forEach(function (value, key) {
                        if (key && key instanceof _PdfReference) {
                            var base = _this._crossReference._fetch(key);
                            if (base && template && base === template._content) {
                                keyName_1 = value;
                                ref_1 = key;
                            }
                        }
                    });
                }
            }
            if (isNew) {
                sourceDictionary = new _PdfDictionary(this._crossReference);
                this._resourceObject.update('XObject', sourceDictionary);
            }
            if (typeof keyName_1 === 'undefined') {
                keyName_1 = _PdfName.get(_getNewGuidString());
                if (template && template._content.reference) {
                    ref_1 = template._content.reference;
                }
                else if (this._crossReference) {
                    ref_1 = this._crossReference._getNextReference();
                }
                else {
                    this._pendingResource.push({ 'resource': template._content, 'key': keyName_1, 'source': sourceDictionary });
                }
                if (ref_1 && this._crossReference) {
                    if (!this._crossReference._cacheMap.has(ref_1) && template && template._content) {
                        this._crossReference._cacheMap.set(ref_1, template._content);
                    }
                    sourceDictionary.update(keyName_1.name, ref_1);
                    this._resources.set(ref_1, keyName_1);
                }
                this._resourceObject._updated = true;
            }
            if (isReference) {
                this._resourceObject._updated = true;
            }
            if (this._hasResourceReference) {
                this._source._updated = true;
            }
            this._sw._executeObject(keyName_1);
            this.restore(state);
            _addProcSet('ImageB', this._resourceObject);
            _addProcSet('ImageC', this._resourceObject);
            _addProcSet('ImageI', this._resourceObject);
            _addProcSet('Text', this._resourceObject);
        }
        this._endMarkContent();
    };
    PdfGraphics.prototype._processResources = function (crossReference) {
        this._crossReference = crossReference;
        if (this._pendingResource.length > 0) {
            for (var i = 0; i < this._pendingResource.length; i++) {
                var entry = this._pendingResource[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                if (entry instanceof PdfTemplate) {
                    entry._crossReference = crossReference;
                    entry._updatePendingResource(crossReference);
                }
                else if (entry.resource instanceof _PdfBaseStream) {
                    var reference = void 0;
                    if (entry.resource._reference) {
                        reference = entry.resource._reference;
                    }
                    else {
                        reference = crossReference._getNextReference();
                        entry.resource._reference = reference;
                    }
                    if (!crossReference._cacheMap.has(reference) && entry.resource) {
                        crossReference._cacheMap.set(reference, entry.resource);
                    }
                    entry.source.update(entry.key.name, reference);
                    this._resources.set(reference, entry.key);
                }
                else if (entry.resource instanceof PdfImage) {
                    this._updateImageResource(entry.resource, entry.key, entry.source, crossReference);
                }
                else if (entry.resource instanceof PdfFont) {
                    this._updateFontResource(entry.resource, entry.key, entry.source, crossReference);
                }
                this._source.update('Resources', this._resourceObject);
                this._source._updated = true;
            }
            this._pendingResource = [];
        }
    };
    PdfGraphics.prototype._updateImageResource = function (image, keyName, source, crossReference) {
        var reference;
        if (image._reference) {
            reference = image._reference;
        }
        else {
            reference = crossReference._getNextReference();
            image._reference = reference;
        }
        if (!crossReference._cacheMap.has(reference)) {
            if (image && image._imageStream && image._imageStream.dictionary) {
                crossReference._cacheMap.set(reference, image._imageStream);
                image._imageStream.dictionary._updated = true;
                if (image._maskStream && image._maskStream.dictionary) {
                    var ref = void 0;
                    if (image._maskReference) {
                        ref = image._maskReference;
                    }
                    else {
                        ref = crossReference._getNextReference();
                        image._maskReference = ref;
                    }
                    crossReference._cacheMap.set(ref, image._maskStream);
                    image._maskStream.dictionary._updated = true;
                    image._imageStream.dictionary.set('SMask', ref);
                }
            }
        }
        source.update(keyName.name, reference);
        this._resources.set(reference, keyName);
        this._resourceObject._updated = true;
    };
    PdfGraphics.prototype._updateFontResource = function (font, keyName, source, crossReference) {
        var reference;
        if (font._reference) {
            reference = font._reference;
        }
        else {
            reference = crossReference._getNextReference();
            font._reference = reference;
        }
        if (!crossReference._cacheMap.has(reference)) {
            if (font._dictionary) {
                crossReference._cacheMap.set(reference, font._dictionary);
                source.update(keyName.name, reference);
                this._resources.set(reference, keyName);
            }
            else if (font instanceof PdfTrueTypeFont) {
                var internal = font._fontInternal;
                if (internal && internal._fontDictionary) {
                    crossReference._cacheMap.set(reference, internal._fontDictionary);
                }
                source.update(keyName.name, reference);
                this._resources.set(reference, keyName);
            }
        }
    };
    PdfGraphics.prototype.drawPath = function (path, first, second) {
        this._beginMarkContent();
        var result = this._setPenBrush(first, second);
        if (result.pen || result.brush) {
            this._buildUpPath(path._points, path._pathTypes);
            this._drawGraphicsPath(result.pen, result.brush, path.fillMode, false);
        }
        this._endMarkContent();
    };
    /**
     * Draws a rounded rectangle on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rounded rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the rounded rectangle.
     * @param {number} width The width of the rounded rectangle.
     * @param {number} height The height of the rounded rectangle.
     * @param {number} radius The radius of the rounded corners of the rectangle.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the rectangle.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the rectangle.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 0, 255]);
     * // Draw a rounded rectangle on the page graphics
     * graphics.drawRoundedRectangle(10, 20, 100, 200, 5, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawRoundedRectangle = function (x, y, width, height, radius, pen, brush) {
        if (pen === null) {
            throw new Error('pen');
        }
        if (brush === null) {
            throw new Error('brush');
        }
        var bounds = [x, y, width, height];
        var diameter = radius * 2;
        var size = [diameter, diameter];
        var arc = [bounds[0], bounds[1], size[0], size[1]];
        var path = new PdfPath();
        if (radius === 0) {
            path.addRectangle(bounds[0], bounds[1], bounds[2], bounds[3]);
            this.drawPath(path, pen, brush);
        }
        else {
            path._isRoundedRectangle = true;
            path.addArc(arc[0], arc[1], arc[2], arc[3], 180, 90);
            arc[0] = (bounds[0] + bounds[2]) - diameter;
            path.addArc(arc[0], arc[1], arc[2], arc[3], 270, 90);
            arc[1] = (bounds[1] + bounds[3]) - diameter;
            path.addArc(arc[0], arc[1], arc[2], arc[3], 0, 90);
            arc[0] = bounds[0];
            path.addArc(arc[0], arc[1], arc[2], arc[3], 90, 90);
            path.closeFigure();
            this.drawPath(path, pen, brush);
        }
    };
    PdfGraphics.prototype._constructArcPath = function (x1, y1, x2, y2, start, sweep) {
        var points = _getBezierArc(x1, y1, x2, y2, start, sweep);
        if (points.length === 8) {
            return;
        }
        var point = [points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7]];
        this._sw._beginPath(point[0], point[1]);
        for (var i = 0; i < points.length; i = i + 8) {
            point = [points[Number.parseInt(i.toString(), 10)],
                points[i + 1],
                points[i + 2],
                points[i + 3],
                points[i + 4],
                points[i + 5],
                points[i + 6],
                points[i + 7]];
            this._sw._appendBezierSegment(point[2], point[3], point[4], point[5], point[6], point[7]);
        }
    };
    PdfGraphics.prototype._constructPiePath = function (x1, y1, x2, y2, start, sweep) {
        var points = _getBezierArc(x1, y1, x2, y2, start, sweep);
        if (points.length === 8) {
            var point = [points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7]];
            this._sw._beginPath(point[0], point[1]);
            for (var i = 0; i < points.length; i = i + 8) {
                point = [points[Number.parseInt(i.toString(), 10)],
                    points[i + 1],
                    points[i + 2],
                    points[i + 3],
                    points[i + 4],
                    points[i + 5],
                    points[i + 6],
                    points[i + 7]];
                this._sw._appendBezierSegment(point[2], point[3], point[4], point[5], point[6], point[7]);
            }
        }
    };
    PdfGraphics.prototype._writePen = function (pen) {
        var lineWidth = pen._width;
        var pattern = pen._dashPattern;
        var setPattern = [];
        for (var i = 0; i < pattern.length; ++i) {
            setPattern[i] = pattern[i] * pen._width; // eslint-disable-line
        }
        this._sw._setLineDashPattern(setPattern, pen._dashOffset * lineWidth);
        this._sw._setLineWidth(pen._width);
        this._sw._setLineJoin(pen._lineJoin);
        this._sw._setLineCap(pen._lineCap);
        if (pen._miterLimit > 0) {
            this._sw._setMiterLimit(pen._miterLimit);
        }
        this._sw._setColor(pen._color, true);
    };
    /**
     * Draw text on the page graphics.
     *
     * @param {string} value The string to be drawn.
     * @param {PdfFont} font The font used to draw the string.
     * @param {number[]} bounds An array specifying the bounds [x, y, width, height] where the string will be drawn.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the string.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the string.
     * @param {PdfStringFormat} format The format that specifies text layout information such as alignment, line spacing, and trimming.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.helvetica, 12);
     * // Create a new string format
     * let format: PdfStringFormat = new PdfStringFormat();
     * format.alignment = PdfTextAlignment.center;
     * // Draw text on the page graphics
     * graphics.drawString('Hello World', font, [10, 20, 100, 200], pen, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawString = function (value, font, bounds, pen, brush, format) {
        this._beginMarkContent();
        var layouter = new _PdfStringLayouter();
        if (!format) {
            format = new PdfStringFormat();
        }
        var result = layouter._layout(value, font, format, [bounds[2], bounds[3]]);
        if (!result._empty) {
            var rect = this._checkCorrectLayoutRectangle(result._actualSize, bounds[0], bounds[1], format);
            if (bounds[2] <= 0) {
                bounds[0] = rect[0];
                bounds[2] = rect[2];
            }
            if (bounds[3] <= 0) {
                bounds[1] = rect[1];
                bounds[3] = rect[3];
            }
            this._drawStringLayoutResult(result, font, pen, brush, bounds, format);
        }
        _addProcSet('Text', this._resourceObject);
        this._endMarkContent();
    };
    PdfGraphics.prototype._buildUpPath = function (points, types) {
        for (var i = 0; i < points.length; i++) {
            var point = points[Number.parseInt(i.toString(), 10)];
            var type = types[Number.parseInt(i.toString(), 10)];
            switch (type & 0xf) {
                case PathPointType.start:
                    this._sw._beginPath(point[0], point[1]);
                    break;
                case PathPointType.bezier:
                    var result = this._getBezierPoint(points, types, i); // eslint-disable-line
                    i = result.index;
                    var first = result.point; // eslint-disable-line
                    result = this._getBezierPoint(points, types, i);
                    i = result.index;
                    var second = result.point; // eslint-disable-line
                    this._sw._appendBezierSegment(point[0], point[1], first[0], first[1], second[0], second[1]);
                    break;
                case PathPointType.line:
                    this._sw._appendLineSegment(point[0], point[1]);
                    break;
                default:
                    throw new Error('Incorrect path formation.');
            }
            type = types[Number.parseInt(i.toString(), 10)];
            if ((type & PathPointType.closePath) === PathPointType.closePath) {
                this._sw._closePath();
            }
        }
    };
    PdfGraphics.prototype._getBezierPoint = function (points, types, index) {
        if (types[Number.parseInt(index.toString(), 10)] !== PathPointType.bezier) {
            throw new Error('Malforming path.');
        }
        index++;
        return { 'index': index, 'point': points[Number.parseInt(index.toString(), 10)] };
    };
    PdfGraphics.prototype._initialize = function () {
        this._mediaBoxUpperRightBound = 0;
        this._characterSpacing = -1;
        this._wordSpacing = -1;
        this._textScaling = -100;
        this._textRenderingMode = -1;
        this._graphicsState = [];
        this._clipBounds = [0, 0, this._size[0], this._size[1]];
        this._colorSpaceInitialized = false;
        this._startCutIndex = -1;
    };
    PdfGraphics.prototype._initializeCurrentColorSpace = function () {
        if (!this._colorSpaceInitialized) {
            this._sw._setColorSpace('DeviceRGB', true);
            this._sw._setColorSpace('DeviceRGB', false);
            this._colorSpaceInitialized = true;
        }
    };
    PdfGraphics.prototype._brushControl = function (brush) {
        this._sw._setColor(brush._color, false);
        this._currentBrush = brush;
    };
    PdfGraphics.prototype._penControl = function (pen) {
        this._currentPen = pen;
        this._writePen(pen);
        this._currentPen = pen;
    };
    PdfGraphics.prototype._fontControl = function (font, format) {
        var _this = this;
        var size = font._metrics._getSize(format);
        this._currentFont = font;
        var sourceDictionary;
        var isReference = false;
        var keyName;
        var isNew = true;
        var ref;
        var hasResource = false;
        if (this._resourceObject.has('Font')) {
            var obj = this._resourceObject.getRaw('Font'); // eslint-disable-line
            if (obj !== null && typeof obj !== 'undefined') {
                if (obj instanceof _PdfReference) {
                    isReference = true;
                    sourceDictionary = this._crossReference._fetch(obj);
                }
                else if (obj instanceof _PdfDictionary) {
                    sourceDictionary = obj;
                }
            }
            if (typeof sourceDictionary !== 'undefined' && sourceDictionary !== null) {
                isNew = false;
                this._resources.forEach(function (value, key) {
                    if (_this._crossReference) {
                        if (key !== null && typeof key !== 'undefined') {
                            var dictionary = _this._crossReference._fetch(key);
                            if (dictionary && ((font instanceof PdfStandardFont && dictionary === font._dictionary) ||
                                (font instanceof PdfTrueTypeFont && dictionary === font._fontInternal._fontDictionary))) {
                                keyName = value;
                                ref = key;
                                hasResource = true;
                            }
                        }
                    }
                    else if (font._reference && font._reference === key) {
                        keyName = value;
                        ref = key;
                        hasResource = true;
                    }
                });
            }
        }
        if (isNew) {
            sourceDictionary = new _PdfDictionary(this._crossReference);
            this._resourceObject.update('Font', sourceDictionary);
        }
        if (typeof keyName === 'undefined') {
            keyName = _PdfName.get(_getNewGuidString());
            if (!ref) {
                if (font._reference) {
                    ref = font._reference;
                    sourceDictionary.update(keyName.name, ref);
                }
                else if (this._crossReference) {
                    ref = this._crossReference._getNextReference();
                }
                else {
                    this._pendingResource.push({ 'resource': font, 'key': keyName, 'source': sourceDictionary });
                }
            }
            if (ref && this._crossReference) {
                if (!font._reference) {
                    font._reference = ref;
                }
                if (font._dictionary) {
                    this._crossReference._cacheMap.set(ref, font._dictionary);
                    sourceDictionary.update(keyName.name, ref);
                }
                else if (font instanceof PdfTrueTypeFont) {
                    var internal = font._fontInternal;
                    if (internal && internal._fontDictionary) {
                        this._crossReference._cacheMap.set(ref, internal._fontDictionary);
                    }
                    sourceDictionary.update(keyName.name, ref);
                }
            }
            if (!hasResource) {
                this._resources.set(ref, keyName);
            }
        }
        if (isReference) {
            this._resourceObject._updated = true;
        }
        if (this._hasResourceReference) {
            this._source._updated = true;
        }
        this._sw._setFont(keyName.name, size);
    };
    PdfGraphics.prototype._setPenBrush = function (first, second) {
        var pen;
        var brush;
        if (first) {
            if (first instanceof PdfPen) {
                pen = first;
            }
            else {
                brush = first;
            }
        }
        if (second && second instanceof PdfBrush) {
            brush = second;
        }
        this._stateControl(pen, brush, null);
        return { pen: pen, brush: brush };
    };
    PdfGraphics.prototype._stateControl = function (pen, brush, font, format) {
        if (pen || brush) {
            this._initializeCurrentColorSpace();
        }
        if (pen) {
            this._penControl(pen);
        }
        if (brush) {
            this._brushControl(brush);
        }
        if (font) {
            this._fontControl(font, format);
        }
    };
    PdfGraphics.prototype._drawStringLayoutResult = function (result, font, pen, brush, layoutRectangle, format) {
        if (!result._empty) {
            var allowPartialLines = (format && typeof format.lineLimit !== 'undefined' && !format.lineLimit);
            var shouldClip = (typeof format === 'undefined' || (format && typeof format.noClip !== 'undefined'
                && !format.noClip));
            var clipRegion = allowPartialLines && shouldClip;
            var state = void 0;
            if (clipRegion) {
                state = this.save();
                var clipBounds = [layoutRectangle[0], layoutRectangle[1], result._actualSize[0], result._actualSize[1]];
                if (layoutRectangle[2] > 0) {
                    clipBounds[2] = layoutRectangle[2];
                }
                if (format.lineAlignment === PdfVerticalAlignment.middle) {
                    clipBounds[1] += (layoutRectangle[3] - clipBounds[3]) / 2;
                }
                else if (format.lineAlignment === PdfVerticalAlignment.bottom) {
                    clipBounds[1] += (layoutRectangle[3] - clipBounds[3]);
                }
                this.setClip(clipBounds);
            }
            if (font && font instanceof PdfTrueTypeFont && font._fontInternal &&
                font._fontInternal instanceof _UnicodeTrueTypeFont && font.isItalic) {
                if (!font._fontInternal._ttfMetrics._isItalic) {
                    state = this.save();
                    this._isItalic = true;
                }
            }
            this._applyStringSettings(font, pen, brush, format);
            var textScaling = (typeof format !== 'undefined' && format !== null) ? format.horizontalScalingFactor : 100.0;
            if (textScaling !== this._textScaling) {
                this._sw._setTextScaling(textScaling);
                this._textScaling = textScaling;
            }
            var verticalAlignShift = this._getTextVerticalAlignShift(result._actualSize[1], layoutRectangle[3], format);
            var height = (typeof format === 'undefined' || format === null || format.lineSpacing === 0) ?
                font._metrics._getHeight(format) :
                format.lineSpacing + font._metrics._getHeight(format);
            var script = (format !== null && typeof format !== 'undefined' &&
                format.subSuperScript === PdfSubSuperScript.subScript);
            var shift = 0;
            shift = (script) ? height - (font.height + font._metrics._getDescent(format)) : (height - font._metrics._getAscent(format));
            if (format && format.lineAlignment === PdfVerticalAlignment.bottom) {
                if (layoutRectangle[3] - result._actualSize[1] !== 0 &&
                    (layoutRectangle[3] - result._actualSize[1]) < (font._metrics._size / 2) - 1) {
                    if (Number.parseFloat(_numberToString(layoutRectangle[3])) <=
                        Number.parseFloat(_numberToString(font._metrics._getHeight(format)))) {
                        shift = -(height / font._metrics._size);
                    }
                }
            }
            var matrix = new _PdfTransformationMatrix();
            if (this._isItalic) {
                this.translateTransform(layoutRectangle[0] + font.size / 5, layoutRectangle[1] - shift + verticalAlignShift);
                this._skewTransform(0, -11);
            }
            else {
                matrix._translate(layoutRectangle[0], (-(layoutRectangle[1] + font._metrics._getHeight(format)) -
                    (font._metrics._getDescent(format) > 0 ? -font._metrics._getDescent(format) : font._metrics._getDescent(format))) -
                    verticalAlignShift);
                this._sw._modifyTM(matrix);
            }
            if (layoutRectangle[3] < font._metrics._size) {
                if ((result._actualSize[1] - layoutRectangle[3]) < (font._metrics._size / 2) - 1) {
                    verticalAlignShift = 0;
                }
            }
            if (verticalAlignShift !== 0) {
                if (format !== null && format.lineAlignment === PdfVerticalAlignment.bottom) {
                    if (layoutRectangle[3] - result._actualSize[1] !== 0 &&
                        (layoutRectangle[3] - result._actualSize[1]) > (font._metrics._size / 2) - 1) {
                        verticalAlignShift -= (shift - (height - font._metrics._size)) / 2;
                    }
                }
            }
            if (this._isItalic) {
                this._sw._startNextLine(0, 0);
                this._sw._setLeading(+height);
            }
            this._drawLayoutResult(result, font, format, layoutRectangle);
            if (verticalAlignShift !== 0) {
                this._sw._startNextLine(0, -(verticalAlignShift - result._lineHeight));
            }
            _addProcSet('Text', this._resourceObject);
            this._sw._endText();
            if (this._isItalic) {
                this.restore(state);
            }
            this._underlineStrikeoutText(brush, result, font, layoutRectangle, format);
            if (clipRegion) {
                this.restore(state);
            }
        }
    };
    PdfGraphics.prototype._getNextPage = function () {
        var page;
        var pageCount = this._crossReference._document.pageCount;
        if (this._page._pageIndex <= pageCount - 2) {
            page = this._crossReference._document.getPage(this._page._pageIndex + 1);
        }
        else {
            page = this._crossReference._document.addPage();
        }
        return page;
    };
    PdfGraphics.prototype._applyStringSettings = function (font, pen, brush, format) {
        var tm = _TextRenderingMode.fill;
        var setLineWidth = false;
        if (pen && brush) {
            tm = _TextRenderingMode.fillStroke;
        }
        else if (pen) {
            tm = _TextRenderingMode.stroke;
        }
        else if (brush) {
            tm = _TextRenderingMode.fill;
        }
        if (font && font instanceof PdfTrueTypeFont && (font.isUnicode || (font._style & PdfFontStyle.bold) !== 0)) {
            var fontName = font._fontInternal._metrics._postScriptName;
            var isBoldFont = false;
            if (fontName && fontName.toLocaleLowerCase().includes('bold')) {
                isBoldFont = true;
            }
            if (font._fontInternal && font._fontInternal._metrics && font._fontInternal._metrics._isBold !==
                font.isBold && font.isBold === true && !isBoldFont) {
                if (!pen && brush) {
                    pen = new PdfPen(brush._color, 1);
                }
                tm = _TextRenderingMode.fillStroke;
                setLineWidth = true;
            }
        }
        if (format && format.clipPath) {
            tm |= _TextRenderingMode.clipFlag;
        }
        this._sw._beginText();
        this._stateControl(pen, brush, font, format);
        if (tm !== this._textRenderingMode) {
            this._sw._setTextRenderingMode(tm);
            this._textRenderingMode = tm;
        }
        var cs = (typeof format !== 'undefined' && format !== null) ? format.characterSpacing : 0;
        if (cs !== this._characterSpacing) {
            this._sw._setCharacterSpacing(cs);
            this._characterSpacing = cs;
        }
        var ws = (typeof format !== 'undefined' && format !== null) ? format.wordSpacing : 0;
        if (ws !== this._wordSpacing) {
            this._sw._setWordSpacing(ws);
            this._wordSpacing = ws;
        }
        if (font && setLineWidth) {
            this._sw._setLineWidth(font.size / 30);
        }
    };
    PdfGraphics.prototype._drawLayoutResult = function (result, font, format, layoutRectangle) {
        var height = (typeof format === 'undefined' || format === null || format.lineSpacing === 0) ?
            font._metrics._getHeight(format) :
            format.lineSpacing + font._metrics._getHeight(format);
        var lines = result._lines;
        var ttfFont = font;
        var unicode = (ttfFont !== null && ttfFont.isUnicode);
        for (var i = 0, len = lines.length; (i < len && i !== this._startCutIndex); i++) {
            var lineInfo = lines[Number.parseInt(i.toString(), 10)];
            var lineWidth = lineInfo._width;
            var hAlignShift = this._getHorizontalAlignShift(lineWidth, layoutRectangle[2], format) +
                this._getLineIndent(lineInfo, format, layoutRectangle[2], (i === 0));
            if (hAlignShift !== 0) {
                this._sw._startNextLine(hAlignShift, 0);
            }
            if (unicode) {
                this._drawUnicodeLine(lineInfo, layoutRectangle[2], font, format);
            }
            else {
                this._drawAsciiLine(lineInfo, layoutRectangle[2], format, font);
            }
            if ((i + 1 !== len)) {
                var vAlignShift = this._getTextVerticalAlignShift(result._actualSize[1], layoutRectangle[3], format);
                var matrix = new _PdfTransformationMatrix();
                var baseline = ((-(layoutRectangle[1] + font._metrics._getHeight(format)) -
                    font._metrics._getDescent(format)) -
                    vAlignShift) -
                    (height * (i + 1));
                matrix._translate(layoutRectangle[0], baseline);
                this._sw._modifyTM(matrix);
            }
        }
    };
    PdfGraphics.prototype._drawUnicodeLine = function (lineInfo, width, font, format) {
        var line = lineInfo._text;
        var rtl = (format !== null && typeof format !== 'undefined' && format.rightToLeft);
        var useWordSpace = (format !== null && typeof format !== 'undefined' && format.wordSpacing > 0);
        var ttfFont = font;
        var wordSpacing = this._justifyLine(lineInfo, width, format, ttfFont);
        var rtlRender = new _RtlRenderer();
        if (rtl || (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none)) {
            var blocks = [];
            var rightAlign = (format !== null && typeof format !== 'undefined' && format.alignment === PdfTextAlignment.right);
            if (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none) {
                blocks = rtlRender._layout(line, ttfFont, (format.textDirection === PdfTextDirection.rightToLeft) ? true : false, useWordSpace, format);
            }
            else {
                blocks = rtlRender._layout(line, ttfFont, rightAlign, useWordSpace, format);
            }
            var words = [];
            if (blocks.length > 1) {
                if (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none) {
                    words = rtlRender._splitLayout(line, ttfFont, (format.textDirection === PdfTextDirection.rightToLeft) ? true : false, useWordSpace, format);
                }
            }
            else {
                words = [line];
            }
            this._drawUnicodeBlocks(blocks, words, ttfFont, format, wordSpacing);
        }
        else {
            if (useWordSpace) {
                var result = this._breakUnicodeLine(line, ttfFont, null);
                var blocks = result.tokens;
                var words = result.words;
                this._drawUnicodeBlocks(blocks, words, ttfFont, format, wordSpacing);
            }
            else {
                var token = this._convertToUnicode(line, ttfFont);
                this._sw._showNextLineText(token, true);
            }
        }
    };
    PdfGraphics.prototype._drawUnicodeBlocks = function (blocks, words, font, format, wordSpacing) {
        if (blocks !== null && typeof blocks !== 'undefined' && blocks.length > 0 && words !== null && typeof words !== 'undefined' &&
            words.length > 0 && font !== null && typeof font !== 'undefined') {
            this._sw._startNextLine();
            var x = 0;
            var xShift = 0;
            var firstLineIndent = 0;
            var paragraphIndent = 0;
            try {
                if (format !== null && typeof format !== 'undefined') {
                    firstLineIndent = format.firstLineIndent;
                    paragraphIndent = format.paragraphIndent;
                    format.firstLineIndent = 0;
                    format.paragraphIndent = 0;
                }
                var spaceWidth = font._getCharacterWidth(_StringTokenizer._whiteSpace, format) + wordSpacing;
                var characterSpacing = (format !== null) ? format.characterSpacing : 0;
                var wordSpace = (format !== null && typeof format !== 'undefined' && wordSpacing === 0) ? format.wordSpacing : 0;
                spaceWidth += characterSpacing + wordSpace;
                for (var i = 0; i < blocks.length; i++) {
                    var token = blocks[i]; //eslint-disable-line
                    var word = words[i]; //eslint-disable-line
                    var tokenWidth = 0;
                    if (x !== 0) {
                        this._sw._startNextLine(x, 0);
                    }
                    if (word.length > 0) {
                        tokenWidth += font.measureString(word, format)[0];
                        tokenWidth += characterSpacing;
                        this._sw._showText(token);
                    }
                    if (i !== blocks.length - 1) {
                        x = tokenWidth + spaceWidth;
                        xShift += x;
                    }
                }
                if (xShift > 0) {
                    this._sw._startNextLine(-xShift, 0);
                }
            }
            finally {
                if (format !== null && typeof format !== 'undefined') {
                    format.firstLineIndent = firstLineIndent;
                    format.paragraphIndent = paragraphIndent;
                }
            }
        }
    };
    PdfGraphics.prototype._breakUnicodeLine = function (line, ttfFont, words) {
        var tokens = [];
        if (line !== null && typeof line !== 'undefined' && line.length > 0) {
            words = line.split(null);
            for (var i = 0; i < words.length; i++) {
                var word = words[i]; //eslint-disable-line
                var token = this._convertToUnicode(word, ttfFont);
                tokens[Number.parseInt(i.toString(), 10)] = token;
            }
        }
        return { tokens: tokens, words: words };
    };
    PdfGraphics.prototype._convertToUnicode = function (text, ttfFont) {
        var token = null;
        if (text !== null && typeof text !== 'undefined' && ttfFont !== null && typeof ttfFont !== 'undefined' &&
            ttfFont._fontInternal instanceof _UnicodeTrueTypeFont) {
            var ttfReader = ttfFont._fontInternal._ttfReader;
            ttfFont._setSymbols(text);
            token = ttfReader._convertString(text);
            var bytes = _stringToUnicodeArray(token);
            token = _bytesToString(bytes);
        }
        return token;
    };
    PdfGraphics.prototype._getTextVerticalAlignShift = function (textHeight, boundsHeight, format) {
        var shift = 0;
        if (boundsHeight >= 0 && (typeof format !== 'undefined' && format !== null) && format.lineAlignment !== PdfVerticalAlignment.top) {
            switch (format.lineAlignment) {
                case PdfVerticalAlignment.middle:
                    shift = (boundsHeight - textHeight) / 2;
                    break;
                case PdfVerticalAlignment.bottom:
                    shift = boundsHeight - textHeight;
                    break;
            }
        }
        return shift;
    };
    PdfGraphics.prototype._getHorizontalAlignShift = function (lineWidth, boundsWidth, format) {
        var shift = 0;
        if (boundsWidth >= 0 && (typeof format !== 'undefined' && format !== null) && format.alignment !== PdfTextAlignment.left) {
            switch (format.alignment) {
                case PdfTextAlignment.center:
                    shift = (boundsWidth - lineWidth) / 2;
                    break;
                case PdfTextAlignment.right:
                    shift = boundsWidth - lineWidth;
                    break;
            }
        }
        return shift;
    };
    PdfGraphics.prototype._getLineIndent = function (lineInfo, format, width, firstLine) {
        var lineIndent = 0;
        var firstParagraphLine = ((lineInfo._lineType & _LineType.firstParagraphLine) > 0);
        if (format && firstParagraphLine) {
            lineIndent = (firstLine) ? format.firstLineIndent : format.paragraphIndent;
            lineIndent = (width > 0) ? Math.min(width, lineIndent) : lineIndent;
        }
        return lineIndent;
    };
    PdfGraphics.prototype._drawAsciiLine = function (lineInfo, width, format, font) {
        this._justifyLine(lineInfo, width, format, font);
        var value = '';
        if (lineInfo._text.indexOf('(') !== -1 || lineInfo._text.indexOf(')') !== -1) {
            for (var i = 0; i < lineInfo._text.length; i++) {
                if (lineInfo._text[Number.parseInt(i.toString(), 10)] === '(') {
                    value += '\\\('; // eslint-disable-line
                }
                else if (lineInfo._text[Number.parseInt(i.toString(), 10)] === ')') {
                    value += '\\\)'; // eslint-disable-line
                }
                else {
                    value += lineInfo._text[Number.parseInt(i.toString(), 10)];
                }
            }
        }
        if (value === '') {
            value = lineInfo._text;
        }
        this._sw._showNextLineText('(' + value + ')');
    };
    PdfGraphics.prototype._justifyLine = function (lineInfo, boundsWidth, format, font) {
        var line = lineInfo._text;
        var lineWidth = lineInfo._width;
        var shouldJustify = this._shouldJustify(lineInfo, boundsWidth, format, font);
        var hasWordSpacing = (format && format.wordSpacing !== 0);
        var whitespacesCount = font._getCharacterCount(line, [' ', '\t']);
        var wordSpace = 0;
        if (shouldJustify) {
            if (hasWordSpacing) {
                lineWidth -= (whitespacesCount * format.wordSpacing);
            }
            wordSpace = (boundsWidth - lineWidth) / whitespacesCount;
            this._sw._setWordSpacing(wordSpace);
        }
        else if (format && format.alignment === PdfTextAlignment.justify) {
            this._sw._setWordSpacing(0);
        }
        return wordSpace;
    };
    PdfGraphics.prototype._shouldJustify = function (lineInfo, boundsWidth, format, font) {
        var line = lineInfo._text;
        var lineWidth = lineInfo._width;
        var justifyStyle = (format && format.alignment === PdfTextAlignment.justify);
        var goodWidth = (boundsWidth >= 0 && lineWidth < boundsWidth);
        var whitespacesCount = font._getCharacterCount(line, [' ', '\t']);
        var hasSpaces = (whitespacesCount > 0 && line[0] !== ' ');
        var goodLineBreakStyle = ((lineInfo._lineType & _LineType.layoutBreak) > 0);
        return (justifyStyle && goodWidth && hasSpaces && goodLineBreakStyle);
    };
    PdfGraphics.prototype._underlineStrikeoutText = function (brush, result, font, layoutRectangle, format) {
        if (font.isUnderline || font.isStrikeout) {
            var linePen = this._createUnderlineStrikeoutPen(brush, font);
            if (typeof linePen !== 'undefined' && linePen !== null) {
                var shift = this._getTextVerticalAlignShift(result._actualSize[1], layoutRectangle[3], format);
                var underlineYOffset = layoutRectangle[1] + shift + font._metrics._getAscent(format) + 1.5 * linePen._width;
                var strikeoutYOffset = layoutRectangle[1] + shift + font._metrics._getHeight(format) / 2 + 1.5 * linePen._width;
                var lines = result._lines;
                for (var i = 0; i < result._lineCount; i++) {
                    var lineInfo = lines[Number.parseInt(i.toString(), 10)];
                    var lineWidth = lineInfo._width;
                    var hShift = this._getHorizontalAlignShift(lineWidth, layoutRectangle[2], format);
                    var lineIndent = this._getLineIndent(lineInfo, format, layoutRectangle[2], (i === 0));
                    var x1 = layoutRectangle[0] + hShift;
                    var x2 = (!this._shouldJustify(lineInfo, layoutRectangle[2], format, font)) ?
                        x1 + lineWidth - lineIndent :
                        x1 + layoutRectangle[2] - lineIndent;
                    if (font.isUnderline) {
                        this.drawLine(linePen, x1, underlineYOffset, x2, underlineYOffset);
                        underlineYOffset += result._lineHeight;
                    }
                    if (font.isStrikeout) {
                        this.drawLine(linePen, x1, strikeoutYOffset, x2, strikeoutYOffset);
                        strikeoutYOffset += result._lineHeight;
                    }
                }
            }
        }
    };
    /**
     * Draws a line on the page graphics.
     *
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the line.
     * @param {number} x1 The x-coordinate of the starting point of the line.
     * @param {number} y1 The y-coordinate of the starting point of the line.
     * @param {number} x2 The x-coordinate of the ending point of the line.
     * @param {number} y2 The y-coordinate of the ending point of the line.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw a line on the page graphics
     * graphics.drawLine(pen, 10, 10, 100, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.drawLine = function (pen, x1, y1, x2, y2) {
        this._beginMarkContent();
        this._stateControl(pen);
        this._sw._beginPath(x1, y1);
        this._sw._appendLineSegment(x2, y2);
        this._sw._strokePath();
        _addProcSet('PDF', this._resourceObject);
        this._endMarkContent();
    };
    PdfGraphics.prototype._createUnderlineStrikeoutPen = function (brush, font) {
        return new PdfPen(brush._color, font._metrics._size / 20);
    };
    PdfGraphics.prototype._checkCorrectLayoutRectangle = function (textSize, x, y, format) {
        var layoutedRectangle = [x, y, textSize[0], textSize[0]];
        if (format) {
            switch (format.alignment) {
                case PdfTextAlignment.center:
                    layoutedRectangle[0] = layoutedRectangle[0] - layoutedRectangle[2] / 2;
                    break;
                case PdfTextAlignment.right:
                    layoutedRectangle[0] = layoutedRectangle[0] - layoutedRectangle[2];
                    break;
            }
            switch (format.lineAlignment) {
                case PdfVerticalAlignment.middle:
                    layoutedRectangle[1] = layoutedRectangle[1] - layoutedRectangle[3] / 2;
                    break;
                case PdfVerticalAlignment.bottom:
                    layoutedRectangle[1] = layoutedRectangle[1] - layoutedRectangle[3];
                    break;
            }
        }
        return layoutedRectangle;
    };
    PdfGraphics.prototype._drawGraphicsPath = function (pen, brush, fillMode, needClosing) {
        if (typeof fillMode === 'undefined') {
            fillMode = PdfFillMode.winding;
        }
        var isBrush = (typeof brush !== 'undefined' && brush !== null);
        var isPen = (typeof pen !== 'undefined' && pen !== null);
        var isEvenOdd = fillMode === PdfFillMode.alternate;
        if (isPen && isBrush) {
            if (needClosing) {
                this._sw._closeFillStrokePath(isEvenOdd);
            }
            else {
                this._sw._fillStrokePath(isEvenOdd);
            }
        }
        else if (!isPen && !isBrush) {
            this._sw._endPath();
        }
        else if (isPen) {
            if (needClosing) {
                this._sw._closeStrokePath();
            }
            else {
                this._sw._strokePath();
            }
        }
        else {
            if (needClosing) {
                this._sw._closeFillPath(isEvenOdd);
            }
            else {
                this._sw._fillPath(isEvenOdd);
            }
        }
    };
    PdfGraphics.prototype._initializeCoordinates = function (page) {
        var cbox;
        if (page) {
            var location_1 = [0, 0];
            var needTransformation = false;
            if (page._pageDictionary.has('CropBox') && page._pageDictionary.has('MediaBox')) {
                cbox = page._pageDictionary.getArray('CropBox');
                var mbox = page._pageDictionary.getArray('MediaBox');
                if (cbox[0] === mbox[0] && cbox[1] === mbox[1] && cbox[2] === mbox[2] && cbox[3] === mbox[3]) {
                    needTransformation = true;
                }
                if (cbox[0] > 0 && cbox[3] > 0 && mbox[0] < 0 && mbox[1] < 0) {
                    this.translateTransform(cbox[0], -cbox[3]);
                    location_1[0] = -cbox[0];
                    location_1[1] = cbox[3];
                }
                else if (!page._pageDictionary.has('CropBox')) {
                    needTransformation = true;
                }
                if (needTransformation) {
                    this._sw._writeComment('Change co-ordinate system to left/top.');
                    if (this._cropBox) {
                        this.translateTransform(this._cropBox[0], -this._cropBox[3]);
                    }
                    else {
                        if (-(page._origin[1]) < this._mediaBoxUpperRightBound || this._mediaBoxUpperRightBound === 0) {
                            this.translateTransform(0, -this._size[1]);
                        }
                        else {
                            this.translateTransform(0, -this._mediaBoxUpperRightBound);
                        }
                    }
                }
            }
        }
        else {
            this._sw._writeComment('Change co-ordinate system to left/top.');
            if (this._mediaBoxUpperRightBound !== (-this._size[1])) {
                if (this._cropBox) {
                    cbox = this._cropBox;
                    if (cbox[0] > 0 || cbox[1] > 0 || this._size[0] === cbox[2] || this._size[1] === cbox[3]) {
                        this.translateTransform(cbox[0], -cbox[3]);
                    }
                    else {
                        if (this._mediaBoxUpperRightBound === this._size[1] || this._mediaBoxUpperRightBound === 0) {
                            this.translateTransform(0, -this._size[1]);
                        }
                        else {
                            this.translateTransform(0, -this._mediaBoxUpperRightBound);
                        }
                    }
                }
                else {
                    if (this._mediaBoxUpperRightBound === this._size[1] || this._mediaBoxUpperRightBound === 0) {
                        this.translateTransform(0, -this._size[1]);
                    }
                    else {
                        this.translateTransform(0, -this._mediaBoxUpperRightBound);
                    }
                }
            }
        }
    };
    /**
     * Represents a scale transform of the graphics.
     *
     * @param {number} scaleX Scale factor in the x direction.
     * @param {number} scaleY Scale factor in the y direction.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Save the current graphics state
     * let state: PdfGraphicsState = graphics.save();
     * // Apply scale transform
     * graphics.scaleTransform(0.5, 0.5);
     * // Draw a string with the scaled transformation
     * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Restore the graphics to its previous state
     * graphics.restore(state);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.scaleTransform = function (scaleX, scaleY) {
        var matrix = new _PdfTransformationMatrix();
        matrix._scale(scaleX, scaleY);
        this._sw._modifyCtm(matrix);
        this._matrix._multiply(matrix);
    };
    /**
     * Represents a translate transform of the graphics.
     *
     * @param {number} x x-coordinate of the translation.
     * @param {number} y y-coordinate of the translation.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Save the current graphics state
     * let state: PdfGraphicsState = graphics.save();
     * // Apply translate transform
     * graphics.translateTransform(100, 100);
     * // Draw a string with the translation applied
     * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Restore the graphics to its previous state
     * graphics.restore(state);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.translateTransform = function (x, y) {
        var matrix = new _PdfTransformationMatrix();
        matrix._translate(x, -y);
        this._sw._modifyCtm(matrix);
        this._matrix._multiply(matrix);
    };
    /**
     * Represents a rotate transform of the graphics.
     *
     * @param {number} angle Angle of rotation in degrees.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Save the current graphics state
     * let state: PdfGraphicsState = graphics.save();
     * // Apply rotate transform
     * graphics.rotateTransform(-90);
     * // Draw a string with the rotation applied
     * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Restore the graphics to its previous state
     * graphics.restore(state);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.rotateTransform = function (angle) {
        var matrix = new _PdfTransformationMatrix();
        matrix._rotate(-angle);
        this._sw._modifyCtm(matrix);
        this._matrix._multiply(matrix);
    };
    /**
     * Represents a clipping region of this graphics.
     *
     * @param {number[]} bounds Rectangle structure that represents the new clip region, specified as [x, y, width, height].
     * @param {PdfFillMode} mode Member of the PdfFillMode enumeration that specifies the filling operation to use.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Set clipping region
     * graphics.setClip([0, 0, 50, 12], PdfFillMode.alternate);
     * // Draw a string within the clipping region
     * graphics.drawString("Hello world!", font, [0, 0, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.setClip = function (bounds, mode) {
        if (typeof mode === 'undefined') {
            mode = PdfFillMode.winding;
        }
        this._sw._appendRectangle(bounds[0], bounds[1], bounds[2], bounds[3]);
        this._sw._clipPath(mode === PdfFillMode.alternate);
    };
    /**
     * Sets the transparency for the graphics.
     *
     * @param {number} stroke The transparency value for strokes.
     * @param {number} fill The transparency value for fills.
     * @param {PdfBlendMode} mode The blend mode to use.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new font
     * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
     * // Set transparency
     * graphics.setTransparency(0.5, 0.5, PdfBlendMode.multiply);
     * // Draw the string
     * graphics.drawString("Hello world!", font, [0, 0, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfGraphics.prototype.setTransparency = function (stroke, fill, mode) {
        if (typeof fill === 'undefined') {
            fill = stroke;
        }
        if (typeof mode === 'undefined') {
            mode = PdfBlendMode.normal;
        }
        if (typeof this._transparencies === 'undefined') {
            this._transparencies = new Map();
        }
        var transparencyKey = 'CA:' + stroke.toString() + '_ca:' + fill.toString() + '_BM:' + mode.toString();
        var transparencyData;
        if (this._transparencies.size > 0) {
            this._transparencies.forEach(function (value, key) {
                if (value === transparencyKey) {
                    transparencyData = key;
                }
            });
        }
        if (!transparencyData) {
            transparencyData = new _TransparencyData();
            var transparencyDict = new _PdfDictionary();
            transparencyDict.update('CA', stroke);
            transparencyDict.update('ca', fill);
            transparencyDict.update('BM', _reverseMapBlendMode(mode));
            var ref = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(ref, transparencyDict);
            transparencyData._dictionary = transparencyDict;
            transparencyData._key = transparencyKey;
            transparencyData._name = _PdfName.get(_getNewGuidString());
            transparencyData._reference = ref;
            var dictionary = void 0;
            var isReference = false;
            if (this._resourceObject.has('ExtGState')) {
                var obj = this._resourceObject.getRaw('ExtGState'); // eslint-disable-line
                if (obj !== null && typeof obj !== 'undefined') {
                    if (obj instanceof _PdfReference) {
                        isReference = true;
                        dictionary = this._crossReference._fetch(obj);
                    }
                    else if (obj instanceof _PdfDictionary) {
                        dictionary = obj;
                    }
                }
            }
            else {
                dictionary = new _PdfDictionary(this._crossReference);
                this._resourceObject.update('ExtGState', dictionary);
            }
            dictionary.update(transparencyData._name.name, ref);
            if (isReference) {
                this._resourceObject._updated = true;
            }
            if (this._hasResourceReference) {
                this._source._updated = true;
            }
        }
        this._sw._setGraphicsState(transparencyData._name);
    };
    PdfGraphics.prototype._setTransparencyData = function (ref, name) {
        this._resourceMap.set(ref, name);
        var dictionary = this._crossReference._fetch(ref);
        var stroke = 0;
        var fill = 0;
        var mode = 0;
        if (dictionary) {
            if (dictionary.has('CA')) {
                stroke = dictionary.get('CA');
            }
            if (dictionary.has('ca')) {
                fill = dictionary.get('ca');
            }
            if (dictionary.has('ca')) {
                fill = dictionary.get('ca');
            }
            if (dictionary.has('BM')) {
                mode = _mapBlendMode(dictionary.get('BM'));
            }
        }
        var tkey = 'CA:' + stroke.toString() + '_ca:' + fill.toString() + '_BM:' + mode.toString();
        var tdata = new _TransparencyData();
        tdata._dictionary = dictionary;
        tdata._key = tkey;
        tdata._name = name;
        tdata._reference = ref;
        this._transparencies.set(tdata, tkey);
    };
    PdfGraphics.prototype._getTranslateTransform = function (x, y, input) {
        input._translate(x, -y);
        return input;
    };
    PdfGraphics.prototype._getScaleTransform = function (x, y, input) {
        if (input === null || typeof input === 'undefined') {
            input = new _PdfTransformationMatrix();
        }
        input._scale(x, y);
        return input;
    };
    PdfGraphics.prototype._clipTranslateMargins = function (clipBounds) {
        this._clipBounds = clipBounds;
        this._sw._writeComment('Clip margins.');
        this._sw._appendRectangle(clipBounds[0], clipBounds[1], clipBounds[2], clipBounds[3]);
        this._sw._closePath();
        this._sw._clipPath(false);
        this._sw._writeComment('Translate co-ordinate system.');
        this.translateTransform(clipBounds[0], clipBounds[1]);
    };
    PdfGraphics.prototype._skewTransform = function (angleX, angleY) {
        var matrix = new _PdfTransformationMatrix();
        this._getSkewTransform(angleX, angleY, matrix);
        this._sw._modifyCtm(matrix);
        matrix._multiply(matrix);
    };
    PdfGraphics.prototype._getSkewTransform = function (angleX, angleY, input) {
        input._skew(-angleX, -angleY);
        return input;
    };
    return PdfGraphics;
}());
export { PdfGraphics };
var _PdfTransformationMatrix = /** @class */ (function () {
    function _PdfTransformationMatrix() {
        this._matrix = new _Matrix(1, 0, 0, 1, 0, 0);
    }
    _PdfTransformationMatrix.prototype._translate = function (x, y) {
        this._matrix._translate(x, y);
    };
    _PdfTransformationMatrix.prototype._scale = function (x, y) {
        this._matrix._elements[0] = x;
        this._matrix._elements[3] = y;
    };
    _PdfTransformationMatrix.prototype._rotate = function (angle) {
        angle = (angle * Math.PI) / 180;
        this._matrix._elements[0] = Math.cos(angle);
        this._matrix._elements[1] = Math.sin(angle);
        this._matrix._elements[2] = -Math.sin(angle);
        this._matrix._elements[3] = Math.cos(angle);
    };
    _PdfTransformationMatrix.prototype._multiply = function (matrix) {
        this._matrix._multiply(matrix._matrix);
    };
    _PdfTransformationMatrix.prototype._toString = function () {
        var builder = '';
        for (var i = 0, len = this._matrix._elements.length; i < len; i++) {
            builder += _floatToString(this._matrix._elements[Number.parseInt(i.toString(), 10)]) + ' ';
        }
        return builder;
    };
    _PdfTransformationMatrix.prototype._skew = function (angleX, angleY) {
        var tanA = Math.tan(this._degreeToRadians(angleX));
        var tanB = Math.tan(this._degreeToRadians(angleY));
        var skew = new _Matrix(1, tanA, tanB, 1, 0, 0);
        this._matrix._multiply(skew);
    };
    _PdfTransformationMatrix.prototype._degreeToRadians = function (degreesX) {
        var degreeRadFactor = Math.PI / 180;
        return degreeRadFactor * degreesX;
    };
    return _PdfTransformationMatrix;
}());
export { _PdfTransformationMatrix };
var _Matrix = /** @class */ (function () {
    function _Matrix(arg1, arg2, arg3, arg4, arg5, arg6) {
        if (typeof arg1 === 'undefined') {
            this._elements = [];
        }
        else if (typeof arg1 === 'number') {
            this._elements = [arg1, arg2, arg3, arg4, arg5, arg6];
        }
        else {
            this._elements = arg1;
        }
    }
    Object.defineProperty(_Matrix.prototype, "_offsetX", {
        get: function () {
            return this._elements[4];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Matrix.prototype, "_offsetY", {
        get: function () {
            return this._elements[5];
        },
        enumerable: true,
        configurable: true
    });
    _Matrix.prototype._clone = function () {
        return new _Matrix(this._elements.slice());
    };
    _Matrix.prototype._translate = function (x, y) {
        this._elements[4] = x;
        this._elements[5] = y;
    };
    _Matrix.prototype._transform = function (points) {
        var x = points[0];
        var y = points[1];
        var x2 = x * this._elements[0] + y * this._elements[2] + this._offsetX;
        var y2 = x * this._elements[1] + y * this._elements[3] + this._offsetY;
        return [x2, y2];
    };
    _Matrix.prototype._multiply = function (matrix) {
        this._elements = [(this._elements[0] * matrix._elements[0] + this._elements[1] * matrix._elements[2]),
            (this._elements[0] * matrix._elements[1] + this._elements[1] * matrix._elements[3]),
            (this._elements[2] * matrix._elements[0] + this._elements[3] * matrix._elements[2]),
            (this._elements[2] * matrix._elements[1] + this._elements[3] * matrix._elements[3]),
            (this._offsetX * matrix._elements[0] + this._offsetY * matrix._elements[2] + matrix._offsetX),
            (this._offsetX * matrix._elements[1] + this._offsetY * matrix._elements[3] + matrix._offsetY)];
    };
    return _Matrix;
}());
export { _Matrix };
/**
 * Represents a state of the graphics from a PDF page.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new font
 * let font: PdfFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
 * // Save the graphics state
 * let state: PdfGraphicsState = graphics.save();
 * // Set graphics translate transform
 * graphics.translateTransform(100, 100);
 * // Draw the string
 * graphics.drawString("Hello world!", font, [10, 20, 100, 200], undefined, new PdfBrush([0, 0, 255]));
 * // Restore the graphics state
 * graphics.restore(state);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfGraphicsState = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfGraphicsState` class.
     *
     * @private
     * @param {PdfGraphics} graphics Graphics.
     * @param {_PdfTransformationMatrix} matrix Matrix.
     *
     */
    function PdfGraphicsState(graphics, matrix) {
        if (graphics) {
            this._g = graphics;
            this._transformationMatrix = matrix;
        }
        this._charSpacing = 0;
        this._wordSpacing = 0;
        this._textScaling = 100;
        this._textRenderingMode = _TextRenderingMode.fill;
    }
    return PdfGraphicsState;
}());
export { PdfGraphicsState };
var _TransparencyData = /** @class */ (function () {
    function _TransparencyData() {
    }
    return _TransparencyData;
}());
export var _TextRenderingMode;
(function (_TextRenderingMode) {
    _TextRenderingMode[_TextRenderingMode["fill"] = 0] = "fill";
    _TextRenderingMode[_TextRenderingMode["stroke"] = 1] = "stroke";
    _TextRenderingMode[_TextRenderingMode["fillStroke"] = 2] = "fillStroke";
    _TextRenderingMode[_TextRenderingMode["none"] = 3] = "none";
    _TextRenderingMode[_TextRenderingMode["clipFlag"] = 4] = "clipFlag";
    _TextRenderingMode[_TextRenderingMode["clipFill"] = 4] = "clipFill";
    _TextRenderingMode[_TextRenderingMode["clipStroke"] = 5] = "clipStroke";
    _TextRenderingMode[_TextRenderingMode["clipFillStroke"] = 6] = "clipFillStroke";
    _TextRenderingMode[_TextRenderingMode["clip"] = 7] = "clip";
})(_TextRenderingMode || (_TextRenderingMode = {}));
/**
 * Represents a brush for the PDF page.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new brush
 * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
 * // Draw a rectangle using brush
 * graphics.drawRectangle(10, 10, 100, 100, brush);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfBrush = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfBrush` class.
     *
     * @param {number[]} color Color.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Draw a rectangle using brush
     * graphics.drawRectangle(10, 10, 100, 100, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    function PdfBrush(color) {
        this._color = typeof color !== 'undefined' ? color : [0, 0, 0];
    }
    return PdfBrush;
}());
export { PdfBrush };
/**
 * Represents a pen for the PDF page.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Draw a rectangle using pen
 * graphics.drawRectangle(150, 50, 50, 50, pen);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfPen = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfPen` class.
     *
     * @param {number[]} color Color.
     * @param {number} width Width.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw a rectangle using pen
     * graphics.drawRectangle(150, 50, 50, 50, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    function PdfPen(color, width) {
        this._color = color;
        this._width = width;
        this._dashOffset = 0;
        this._dashPattern = [];
        this._dashStyle = PdfDashStyle.solid;
        this._miterLimit = 0;
        this._lineCap = PdfLineCap.flat;
        this._lineJoin = PdfLineJoin.miter;
    }
    return PdfPen;
}());
export { PdfPen };
var _PdfUnitConvertor = /** @class */ (function () {
    function _PdfUnitConvertor() {
        this._horizontalResolution = 96;
        this._proportions = this._updateProportions(this._horizontalResolution);
    }
    _PdfUnitConvertor.prototype._updateProportions = function (pixel) {
        return [pixel / 2.54, pixel / 6.0, 1, pixel / 72.0, pixel, pixel / 300.0, pixel / 25.4];
    };
    _PdfUnitConvertor.prototype._convertUnits = function (value, from, to) {
        return this._convertFromPixels(this._convertToPixels(value, from), to);
    };
    _PdfUnitConvertor.prototype._convertFromPixels = function (value, to) {
        var index = to;
        return (value / this._proportions[Number.parseInt(index.toString(), 10)]);
    };
    _PdfUnitConvertor.prototype._convertToPixels = function (value, from) {
        var index = from;
        return (value * this._proportions[Number.parseInt(index.toString(), 10)]);
    };
    return _PdfUnitConvertor;
}());
export { _PdfUnitConvertor };
