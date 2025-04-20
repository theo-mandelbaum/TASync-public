import { PdfPage } from './../pdf-page';
import { _PdfStreamWriter } from './pdf-stream-writer';
import { _PdfContentStream } from './../base-stream';
import { _PdfDictionary, _PdfReference, _PdfName } from './../pdf-primitives';
import { _PdfCrossReference } from './../pdf-cross-reference';
import { PdfFont, PdfTrueTypeFont } from './../fonts/pdf-standard-font';
import { _PdfStringLayoutResult, _LineInfo } from './../fonts/string-layouter';
import { _PdfGraphicsUnit, PdfBlendMode, PdfLineJoin, PdfLineCap, PdfDashStyle, PdfFillMode, PathPointType } from './../enumerator';
import { PdfStringFormat } from './../fonts/pdf-string-format';
import { PdfTemplate } from './pdf-template';
import { PdfPath } from './pdf-path';
import { PdfImage } from './images/pdf-image';
import { PdfLayer } from '../layers/layer';
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
export declare class PdfGraphics {
    _source: _PdfDictionary;
    _sw: _PdfStreamWriter;
    _cropBox: Array<number>;
    _mediaBoxUpperRightBound: number;
    _m: _PdfTransformationMatrix;
    _characterSpacing: number;
    _wordSpacing: number;
    _textScaling: number;
    _textRenderingMode: _TextRenderingMode;
    _graphicsState: PdfGraphicsState[];
    _size: number[];
    _clipBounds: number[];
    _resourceObject: _PdfDictionary;
    _resourceMap: Map<_PdfReference, _PdfName>;
    _crossReference: _PdfCrossReference;
    _transparencies: Map<_TransparencyData, string>;
    _hasResourceReference: boolean;
    _currentPen: PdfPen;
    _currentBrush: PdfBrush;
    _currentFont: any;
    _colorSpaceInitialized: boolean;
    _startCutIndex: number;
    _page: PdfPage;
    _template: PdfTemplate;
    _isTemplateGraphics: boolean;
    _state: PdfGraphicsState;
    _pendingResource: any[];
    _isItalic: boolean;
    _isEmptyLayer: boolean;
    _layer: PdfLayer;
    /**
     * Initializes a new instance of the `PdfGraphics` class.
     *
     * @param {number[]} size The graphics client size.
     * @param {_PdfContentStream} content Content stream.
     * @param {_PdfCrossReference} xref Cross reference.
     * @param {PdfPage | PdfTemplate} source Source object of the graphics.
     * @private
     */
    constructor(size: number[], content: _PdfContentStream, xref: _PdfCrossReference, source: PdfPage | PdfTemplate);
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
    readonly clientSize: number[];
    readonly _matrix: _PdfTransformationMatrix;
    readonly _resources: Map<_PdfReference, _PdfName>;
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
    save(): PdfGraphicsState;
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
    restore(state?: PdfGraphicsState): void;
    _doRestore(): PdfGraphicsState;
    /**
     * Draw a rectangle on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangular region.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangular region.
     * @param {number} width The width of the rectangular region.
     * @param {number} height The height of the rectangular region.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the rectangle.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw a rectangle on the page graphics.
     * graphics.drawRectangle(10, 20, 100, 200, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawRectangle(x: number, y: number, width: number, height: number, pen: PdfPen): void;
    /**
     * Draw a rectangle on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangular region.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangular region.
     * @param {number} width The width of the rectangular region.
     * @param {number} height The height of the rectangular region.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the rectangle.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush.
     * let brush: PdfBrush = new PdfBrush([0, 0, 255]);
     * // Draw a filled rectangle on the page graphics.
     * graphics.drawRectangle(10, 20, 100, 200, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawRectangle(x: number, y: number, width: number, height: number, brush: PdfBrush): void;
    /**
     * Draw a rectangle on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangular region.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangular region.
     * @param {number} width The width of the rectangular region.
     * @param {number} height The height of the rectangular region.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the rectangle.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the rectangle.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen.
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush.
     * let brush: PdfBrush = new PdfBrush([0, 0, 255]);
     * // Draw a rectangle with both stroke and fill on the page graphics.
     * graphics.drawRectangle(10, 20, 100, 200, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawRectangle(x: number, y: number, width: number, height: number, pen: PdfPen, brush: PdfBrush): void;
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
    drawBezier(startX: number, startY: number, firstX: number, firstY: number, secondX: number, secondY: number, endX: number, endY: number, pen: PdfPen): void;
    /**
     * Draws a pie slice on a PDF graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} width The width of the bounding rectangle.
     * @param {number} height The height of the bounding rectangle.
     * @param {number} startAngle The angle in degrees measured clockwise from the x-axis to the start of the pie slice.
     * @param {number} sweepAngle The angle in degrees measured clockwise from the startAngle to the end of the pie slice.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the pie slice.
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
     * // Draw a pie slice on the page graphics
     * graphics.drawPie(10, 50, 200, 200, 180, 60, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPie(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number, pen: PdfPen): void;
    /**
     * Draws a pie slice on PDF graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} width The width of the bounding rectangle.
     * @param {number} height The height of the bounding rectangle.
     * @param {number} startAngle The angle in degrees, measured clockwise from the x-axis to the start of the pie slice.
     * @param {number} sweepAngle The angle in degrees, measured clockwise from the startAngle to the end of the pie slice.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the pie slice.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Draw a pie slice on the page graphics
     * graphics.drawPie(10, 50, 200, 200, 180, 60, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPie(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number, brush: PdfBrush): void;
    /**
     * Draws a pie slice on PDF graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} width The width of the bounding rectangle.
     * @param {number} height The height of the bounding rectangle.
     * @param {number} startAngle The angle in degrees, measured clockwise from the x-axis to the start of the pie slice.
     * @param {number} sweepAngle The angle in degrees, measured clockwise from the startAngle to the end of the pie slice.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the pie slice.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the pie slice.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Draw a pie slice on the page graphics
     * graphics.drawPie(10, 50, 200, 200, 180, 60, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPie(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number, pen: PdfPen, brush: PdfBrush): void;
    /**
     * Draw polygon on the page graphics.
     *
     * @param {Array<number[]>} points The points of the polygon.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the polygon.
     * @returns {void} Nothing.
     *
     *  ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Get the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Define the polygon points
     * let points: number[][] = [[10, 100], [10, 200], [100, 100], [100, 200], [55, 150]];
     * // Draw the polygon on the page graphics
     * graphics.drawPolygon(points, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPolygon(points: Array<number[]>, pen: PdfPen): void;
    /**
     * Draw polygon on the page graphics.
     *
     * @param {Array<number[]>} points The points of the polygon.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the polygon.
     * @returns {void} Nothing
     *
     *```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Define the polygon points
     * let points: number[][] = [[10, 100], [10, 200], [100, 100], [100, 200], [55, 150]];
     * // Draw the polygon on the page graphics
     * graphics.drawPolygon(points, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPolygon(points: Array<number[]>, brush: PdfBrush): void;
    /**
     * Draw polygon on the page graphics.
     *
     * @param {Array<number[]>} points The points of the polygon.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the polygon.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the polygon.
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
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Define the polygon points
     * let points: number[][] = [[10, 100], [10, 200], [100, 100], [100, 200], [55, 150]];
     * // Draw the polygon on the page graphics
     * graphics.drawPolygon(points, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPolygon(points: Array<number[]>, pen: PdfPen, brush: PdfBrush): void;
    /**
     * Draw ellipse on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle that defines ellipse.
     * @param {number} width The width of the bounding rectangle that defines ellipse.
     * @param {number} height The height of the bounding rectangle that defines ellipse.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the ellipse.
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
     * // Draw an ellipse on the page graphics
     * graphics.drawEllipse(10, 20, 100, 200, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawEllipse(x: number, y: number, width: number, height: number, pen: PdfPen): void;
    /**
     * Draw ellipse on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse.
     * @param {number} width The width of the bounding rectangle that defines ellipse.
     * @param {number} height The height of the bounding rectangle that defines ellipse.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the ellipse.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Draw an ellipse on the page graphics
     * graphics.drawEllipse(10, 20, 100, 200, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawEllipse(x: number, y: number, width: number, height: number, brush: PdfBrush): void;
    /**
     * Draw ellipse on the page graphics.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse.
     * @param {number} width The width of the bounding rectangle that defines ellipse.
     * @param {number} height The height of the bounding rectangle that defines ellipse.
     * @param {PdfPen} pen Pen that determines the stroke color, width, and style of the ellipse.
     * @param {PdfBrush} brush Brush that determines the fill color and texture of the ellipse.
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
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Draw an ellipse on the page graphics
     * graphics.drawEllipse(10, 20, 100, 200, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawEllipse(x: number, y: number, width: number, height: number, pen: PdfPen, brush: PdfBrush): void;
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
    drawArc(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number, pen: PdfPen): void;
    private _beginMarkContent;
    private _endMarkContent;
    /**
     * Draws an image on the page graphics.
     *
     * @param {PdfImage} image The image to be drawn on the page.
     * @param {number} x The x-coordinate of the upper-left corner where the image will be drawn.
     * @param {number} y The y-coordinate of the upper-left corner where the image will be drawn.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new image object using JPEG image data as a Base64 string
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image on the page graphics
     * graphics.drawImage(image, 10, 20);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawImage(image: PdfImage, x: number, y: number): void;
    /**
     * Draws an image on the page graphics.
     *
     * @param {PdfImage} image The image to be drawn on the page.
     * @param {number} x The x-coordinate of the upper-left corner where the image will be drawn.
     * @param {number} y The y-coordinate of the upper-left corner where the image will be drawn.
     * @param {number} width The width of the image to be drawn.
     * @param {number} height The height of the image to be drawn.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new image object using JPEG image data as a Base64 string
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image on the page graphics with specified width and height
     * graphics.drawImage(image, 10, 20, 400, 400);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawImage(image: PdfImage, x: number, y: number, width: number, height: number): void;
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
    drawTemplate(template: PdfTemplate, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _processResources(crossReference: _PdfCrossReference): void;
    _updateImageResource(image: PdfImage, keyName: _PdfName, source: _PdfDictionary, crossReference: _PdfCrossReference): void;
    _updateFontResource(font: PdfFont, keyName: _PdfName, source: _PdfDictionary, crossReference: _PdfCrossReference): void;
    /**
     * Draws a graphics path defined by a pen and path.
     *
     * @param {PdfPath} path The path to be drawn.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the path.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new path
     * let path: PdfPath = new PdfPath();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Add lines to the path
     * path.addLine(10, 100, 50, 100);
     * path.addLine(50, 100, 50, 150);
     * path.addLine(50, 150, 10, 100);
     * // Draw the path on the page graphics
     * graphics.drawPath(path, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPath(path: PdfPath, pen: PdfPen): void;
    /**
     * Draws a graphics path defined by a brush and path.
     *
     * @param {PdfPath} path The path to be drawn.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the path.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new path
     * let path: PdfPath = new PdfPath();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Add an ellipse to the path
     * path.addEllipse(200, 200, 100, 50);
     * // Draw the path on the page graphics
     * graphics.drawPath(path, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPath(path: PdfPath, brush: PdfBrush): void;
    /**
     * Draws a graphics path defined by a pen, brush, and path.
     *
     * @param {PdfPath} path The path to be drawn.
     * @param {PdfPen} pen The pen that determines the stroke color, width, and style of the path.
     * @param {PdfBrush} brush The brush that determines the fill color and texture of the path.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new path
     * let path: PdfPath = new PdfPath();
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Add an ellipse to the path
     * path.addEllipse(200, 200, 100, 50);
     * // Draw the path on the page graphics with both pen and brush
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    drawPath(path: PdfPath, pen: PdfPen, brush: PdfBrush): void;
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
    drawRoundedRectangle(x: number, y: number, width: number, height: number, radius: number, pen: PdfPen, brush: PdfBrush): void;
    _constructArcPath(x1: number, y1: number, x2: number, y2: number, start: number, sweep: number): void;
    _constructPiePath(x1: number, y1: number, x2: number, y2: number, start: number, sweep: number): void;
    _writePen(pen: PdfPen): void;
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
    drawString(value: string, font: PdfFont, bounds: number[], pen?: PdfPen, brush?: PdfBrush, format?: PdfStringFormat): void;
    _buildUpPath(points: Array<number[]>, types: PathPointType[]): void;
    _getBezierPoint(points: Array<number[]>, types: PathPointType[], index: number): {
        index: number;
        point: number[];
    };
    _initialize(): void;
    _initializeCurrentColorSpace(): void;
    _brushControl(brush: PdfBrush): void;
    _penControl(pen: PdfPen): void;
    _fontControl(font: PdfFont, format: PdfStringFormat): void;
    _setPenBrush(first?: PdfPen | PdfBrush, second?: PdfBrush): {
        pen: PdfPen;
        brush: PdfBrush;
    };
    _stateControl(pen?: PdfPen, brush?: PdfBrush, font?: PdfFont, format?: PdfStringFormat): void;
    _drawStringLayoutResult(result: _PdfStringLayoutResult, font: PdfFont, pen: PdfPen, brush: PdfBrush, layoutRectangle: number[], format: PdfStringFormat): void;
    _getNextPage(): PdfPage;
    _applyStringSettings(font: PdfFont, pen: PdfPen, brush: PdfBrush, format: PdfStringFormat): void;
    _drawLayoutResult(result: _PdfStringLayoutResult, font: PdfFont, format: PdfStringFormat, layoutRectangle: number[]): void;
    _drawUnicodeLine(lineInfo: _LineInfo, width: number, font: PdfFont, format: PdfStringFormat): void;
    _drawUnicodeBlocks(blocks: string[], words: string[], font: PdfTrueTypeFont, format: PdfStringFormat, wordSpacing: number): void;
    _breakUnicodeLine(line: string, ttfFont: PdfTrueTypeFont, words: string[]): {
        tokens: string[];
        words: string[];
    };
    _convertToUnicode(text: string, ttfFont: PdfTrueTypeFont): string;
    _getTextVerticalAlignShift(textHeight: number, boundsHeight: number, format: PdfStringFormat): number;
    _getHorizontalAlignShift(lineWidth: number, boundsWidth: number, format: PdfStringFormat): number;
    _getLineIndent(lineInfo: _LineInfo, format: PdfStringFormat, width: number, firstLine: boolean): number;
    _drawAsciiLine(lineInfo: _LineInfo, width: number, format: PdfStringFormat, font: PdfFont): void;
    _justifyLine(lineInfo: _LineInfo, boundsWidth: number, format: PdfStringFormat, font: PdfFont): number;
    _shouldJustify(lineInfo: _LineInfo, boundsWidth: number, format: PdfStringFormat, font: PdfFont): boolean;
    _underlineStrikeoutText(brush: PdfBrush, result: _PdfStringLayoutResult, font: PdfFont, layoutRectangle: number[], format: PdfStringFormat): void;
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
    drawLine(pen: PdfPen, x1: number, y1: number, x2: number, y2: number): void;
    _createUnderlineStrikeoutPen(brush: PdfBrush, font: PdfFont): PdfPen;
    _checkCorrectLayoutRectangle(textSize: number[], x: number, y: number, format: PdfStringFormat): number[];
    _drawGraphicsPath(pen?: PdfPen, brush?: PdfBrush, fillMode?: PdfFillMode, needClosing?: boolean): void;
    _initializeCoordinates(page?: PdfPage): void;
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
    scaleTransform(scaleX: number, scaleY: number): void;
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
    translateTransform(x: number, y: number): void;
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
    rotateTransform(angle: number): void;
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
    setClip(bounds: number[], mode?: PdfFillMode): void;
    /**
     * Represents a transparency of this graphics.
     *
     * @param {number} stroke The transparency value for the stroke.
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
     * graphics.setTransparency(0.5);
     * // Draw a string with transparency
     * graphics.drawString("Hello world!", font, [0, 0, 100, 200], undefined, new PdfBrush([0, 0, 255]));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setTransparency(stroke: number): void;
    /**
     * Represents a transparency setting for the graphics.
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
    setTransparency(stroke: number, fill: number, mode: PdfBlendMode): void;
    _setTransparencyData(ref: _PdfReference, name: _PdfName): void;
    _getTranslateTransform(x: number, y: number, input: _PdfTransformationMatrix): _PdfTransformationMatrix;
    _getScaleTransform(x: number, y: number, input: _PdfTransformationMatrix): _PdfTransformationMatrix;
    _clipTranslateMargins(clipBounds: number[]): void;
    _skewTransform(angleX: number, angleY: number): void;
    _getSkewTransform(angleX: number, angleY: number, input: _PdfTransformationMatrix): _PdfTransformationMatrix;
}
export declare class _PdfTransformationMatrix {
    _matrix: _Matrix;
    constructor();
    _translate(x: number, y: number): void;
    _scale(x: number, y: number): void;
    _rotate(angle: number): void;
    _multiply(matrix: _PdfTransformationMatrix): void;
    _toString(): string;
    _skew(angleX: number, angleY: number): void;
    _degreeToRadians(degreesX: number): number;
}
export declare class _Matrix {
    _elements: number[];
    constructor();
    constructor(elements: number[]);
    constructor(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number);
    readonly _offsetX: number;
    readonly _offsetY: number;
    _clone(): _Matrix;
    _translate(x: number, y: number): void;
    _transform(points: number[]): number[];
    _multiply(matrix: _Matrix): void;
}
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
export declare class PdfGraphicsState {
    _g: PdfGraphics;
    _transformationMatrix: _PdfTransformationMatrix;
    _textRenderingMode: _TextRenderingMode;
    _charSpacing: number;
    _wordSpacing: number;
    _textScaling: number;
    _currentPen: PdfPen;
    _currentBrush: PdfBrush;
    _currentFont: any;
    /**
     * Initializes a new instance of the `PdfGraphicsState` class.
     *
     * @private
     * @param {PdfGraphics} graphics Graphics.
     * @param {_PdfTransformationMatrix} matrix Matrix.
     *
     */
    constructor(graphics: PdfGraphics, matrix: _PdfTransformationMatrix);
}
declare class _TransparencyData {
    _key: string;
    _reference: _PdfReference;
    _dictionary: _PdfDictionary;
    _name: _PdfName;
}
export declare enum _TextRenderingMode {
    fill = 0,
    stroke = 1,
    fillStroke = 2,
    none = 3,
    clipFlag = 4,
    clipFill = 4,
    clipStroke = 5,
    clipFillStroke = 6,
    clip = 7
}
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
export declare class PdfBrush {
    _color: number[];
    /**
     * Initializes a new instance of the `PdfBrush` class.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush();
     * // Draw a rectangle using brush
     * graphics.drawRectangle(10, 10, 100, 100, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
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
    constructor(color: number[]);
}
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
export declare class PdfPen {
    _color: number[];
    _width: number;
    _dashOffset: number;
    _dashPattern: number[];
    _dashStyle: PdfDashStyle;
    _lineCap: PdfLineCap;
    _lineJoin: PdfLineJoin;
    _miterLimit: number;
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
    constructor(color: number[], width: number);
}
export declare class _PdfUnitConvertor {
    _horizontalResolution: number;
    _proportions: number[];
    constructor();
    _updateProportions(pixel: number): number[];
    _convertUnits(value: number, from: _PdfGraphicsUnit, to: _PdfGraphicsUnit): number;
    _convertFromPixels(value: number, to: _PdfGraphicsUnit): number;
    _convertToPixels(value: number, from: _PdfGraphicsUnit): number;
}
export {};
