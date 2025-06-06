import { PdfStringFormat } from './pdf-string-format';
import { _PdfFontMetrics } from './pdf-font-metrics';
import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { _UnicodeTrueTypeFont } from './unicode-true-type-font';
/**
 * Represents the base class for font objects.`
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare abstract class PdfFont {
    _style: PdfFontStyle;
    _size: number;
    _dictionary: _PdfDictionary;
    _pdfFontInternals: _PdfDictionary;
    _fontMetrics: _PdfFontMetrics;
    _reference: _PdfReference;
    _key: string;
    /**
     * Gets the size of the PDF font.
     *
     * @returns {number} size.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Gets the font size
     * let size: number = font.size;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly size: number;
    /**
     * Gets the style of the PDF font.
     *
     * @returns {PdfFontStyle} size.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.italic);
     * // Gets the font style
     * let style: PdfFontStyle = font.style;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the style of the PDF font.
    *
    * @param {PdfFontStyle} value to font style.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Gets the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Create a new PDF standard font
    * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
    * // Sets the font style
    * font.style = PdfFontStyle.italic;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    style: PdfFontStyle;
    /**
     * Gets the boolean flag indicating whether the font has underline style or not.
     *
     * @returns {boolean} isUnderline.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.underline);
     * // Gets the boolean flag indicating whether the font has underline style or not.
     * let underline: boolean = font.isUnderline;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isUnderline: boolean;
    /**
     * Gets the boolean flag indicating whether the font has strike out style or not.
     *
     * @returns {boolean} isStrikeout.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.strikeout);
     * // Gets the boolean flag indicating whether the font has strike out style or not.
     * let strikeout: boolean = font.isStrikeout;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isStrikeout: boolean;
    _metrics: _PdfFontMetrics;
    /**
     * Gets the boolean flag indicating whether the font has bold style or not.
     *
     * @returns {boolean} isBold.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.bold);
     * // Gets the boolean flag indicating whether the font has bold style or not.
     * let bold: boolean = font.isBold;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isBold: boolean;
    /**
     * Gets the boolean flag indicating whether the font has italic style or not.
     *
     * @returns {boolean} isItalic.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.italic);
     * // Gets the boolean flag indicating whether the font has italic style or not.
     * let italic: boolean = font.isItalic;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isItalic: boolean;
    /**
     * Gets the font height.
     *
     * @returns {number} height.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.italic);
     * // Gets the font height
     * let height: number = font.height;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly height: number;
    constructor(size: number);
    constructor(size: number, style: PdfFontStyle);
    _setInternals(internals: _PdfDictionary): void;
    _getCharacterCount(text: string, symbols: string[] | string): number;
    /**
     * Measures the size of a given text string when rendered using this PDF font.
     *
     * @param {string} text Text.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font with respect to the string format.
     *
     * @param {string} text Text.
     * @param {PdfStringFormat} format String format.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, format: PdfStringFormat): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font.
     *
     * @param {string} text Text.
     * @param {PdfStringFormat} format String format.
     * @param {number} charactersFitted Characters fitted.
     * @param {number} linesFilled Lines filled.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', format, 10, 10);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, format: PdfStringFormat, charactersFitted: number, linesFilled: number): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font with respect to the maximum line width.
     *
     * @param {string} text Text.
     * @param {number} width width.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', 50);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, width: number): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font  with respect to the string format and maximum line width.
     *
     * @param {string} text Text.
     * @param {number} width width.
     * @param {PdfStringFormat} format String format.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', 50, format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, width: number, format: PdfStringFormat): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font.
     *
     * @param {string} text Text.
     * @param {number} width width.
     * @param {PdfStringFormat} format String format.
     * @param {number} charactersFitted Characters fitted.
     * @param {number} linesFilled Lines filled.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', 50, format, 10, 10);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, width: number, format: PdfStringFormat, charactersFitted: number, linesFilled: number): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font with respect to the layout area.
     *
     * @param {string} text Text.
     * @param {number []} layoutArea Layout area.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', [100, 100]);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, layoutArea: number[]): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font with respect to the layout area and string format.
     *
     * @param {string} text Text.
     * @param {PdfStringFormat} format String format.
     * @param {number []} layoutArea Layout area.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', [100, 100], format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, layoutArea: number[], format: PdfStringFormat): number[];
    /**
     * Measures the size of a given text string when rendered using this PDF font.
     *
     * @param {string} text Text.
     * @param {PdfStringFormat} format String format.
     * @param {number []} layoutArea Layout area.
     * @param {number} charactersFitted Characters fitted.
     * @param {number} linesFilled Lines filled.
     * @returns {number[]} actualSize.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Measure the size of the text
     * let size: number[] = font.measureString('Syncfusion', format, [0, 0], 0, 0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    measureString(text: string, layoutArea: number[], format: PdfStringFormat, charactersFitted: number, linesFilled: number): number[];
    _applyFormatSettings(line: string, format: PdfStringFormat, width: number): number;
    abstract getLineWidth(line: string, format: PdfStringFormat): number;
    abstract _initializeInternals(): void;
}
/**
 * Represents one of the 14 standard fonts.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfStandardFont extends PdfFont {
    _fontFamily: PdfFontFamily;
    /**
     * Gets the font family of the PDF standard font.
     *
     * @returns {PdfFontFamily} fontFamily.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.strikeout);
     * // Gets the font family
     * let fontFamily: PdfFontFamily = font.fontFamily;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly fontFamily: PdfFontFamily;
    /**
     * Initializes a new instance of the `PdfStandardFont` class.
     *
     * @param {PdfFontFamily} fontFamily PdfFontFamily.
     * @param {number} size Size.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(fontFamily: PdfFontFamily, size: number);
    /**
     * Initializes a new instance of the `PdfStandardFont` class.
     *
     * @param {PdfFontFamily} fontFamily PdfFontFamily.
     * @param {PdfFontStyle} style PdfFontStyle.
     * @param {number} size Size.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(fontFamily: PdfFontFamily, size: number, style: PdfFontStyle);
    _checkStyle(): void;
    /**
     * Gets the line width.
     *
     * @param {string} line Line.
     * @param {PdfStringFormat} format String format.
     * @returns {number} width.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Get the text width
     * let width: number = font.getLineWidth('Syncfusion', format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getLineWidth(line: string, format: PdfStringFormat): number;
    _initializeInternals(): void;
    _createInternals(): _PdfDictionary;
    _getCharacterWidthInternal(charCode: string): number;
}
/**
 * Represents one of the 7 CJK standard fonts.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF CJK standard font
 * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('こんにちは世界', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfCjkStandardFont extends PdfFont {
    _fontFamily: PdfCjkFontFamily;
    /**
     * Gets the font family of the PDF CJK font.
     *
     * @returns {PdfCjkFontFamily} fontFamily.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF CJK standard font
     * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20);
     * // Gets the font family
     * let fontFamily: PdfCjkFontFamily = font.fontFamily;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly fontFamily: PdfCjkFontFamily;
    /**
     * Initializes a new instance of the `PdfCjkStandardFont` class.
     *
     * @param {PdfCjkFontFamily} fontFamily PdfFontFamily.
     * @param {number} size Size.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF CJK standard font
     * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('こんにちは世界', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(fontFamily: PdfCjkFontFamily, size: number);
    /**
     * Initializes a new instance of the `PdfCjkStandardFont` class.
     *
     * @param {PdfCjkFontFamily} fontFamily PdfFontFamily.
     * @param {PdfFontStyle} style PdfFontStyle.
     * @param {number} size Size.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF CJK standard font
     * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20, PdfFontStyle.bold);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('こんにちは世界', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(fontFamily: PdfCjkFontFamily, size: number, style: PdfFontStyle);
    _initializeInternals(): void;
    _createInternals(): _PdfDictionary;
    _getEncoding(fontFamily: PdfCjkFontFamily): _PdfName;
    _getDescendantFont(): _PdfDictionary[];
    _getSystemInformation(): _PdfDictionary;
    /**
     * Gets the line width.
     *
     * @param {string} line Line.
     * @param {PdfStringFormat} format String format.
     * @returns {number} width.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF CJK standard font
     * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20, PdfFontStyle.bold);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Get the text width
     * let width: number = font.getLineWidth('Syncfusion', format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getLineWidth(line: string, format: PdfStringFormat): number;
    _getCharacterWidthInternal(charCode: number): number;
}
/**
 * Represents TrueType font.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF truetype font
 * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfTrueTypeFont extends PdfFont {
    _fontInternal: _UnicodeTrueTypeFont;
    _isEmbedFont: boolean;
    _isUnicode: boolean;
    /**
     * Gets the boolean flag indicating whether the font has unicode or not.
     *
     * @returns {boolean} unicode.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF truetype font
     * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10);
     * // Gets the boolean flag indicating whether the font has or not.
     * let isUnicode: boolean = font.isUnicode;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isUnicode: boolean;
    /**
     * Gets the boolean flag indicating whether the font is embedded or not.
     *
     * @returns {boolean} isEmbed.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF truetype font
     * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10);
     * // Gets the boolean flag indicating whether the font is embedded or not.
     * let isEmbed: boolean = font.isEmbed;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isEmbed: boolean;
    /**
     * Initializes a new instance of the `PdfTrueTypeFont` class.
     *
     * @param {string} base64String Base64String.
     * @param {number} size Size.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF truetype font
     * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('Syncfusion', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(base64String: string, size: number);
    /**
     * Initializes a new instance of the `PdfTrueTypeFont` class.
     *
     * @param {string} base64String Base64String.
     * @param {number} size Font size.
     * @param {style} style Font style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF truetype font
     * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Draw the text
     * page.graphics.drawString('Syncfusion', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(base64String: string, size: number, style: PdfFontStyle);
    _createFontInternal(base64String: string, style: PdfFontStyle): void;
    _initializeInternals(): void;
    /**
     * Gets the line width.
     *
     * @param {string} line Line.
     * @param {PdfStringFormat} format String format.
     * @returns {number} width.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF truetype font
     * let font: PdfTrueTypeFont = new PdfTrueTypeFont(base64String, 10, PdfFontStyle.regular);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
     * // Get the text width
     * let width: number = font.getLineWidth('Syncfusion', format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getLineWidth(line: string, format: PdfStringFormat): number;
    _getUnicodeLineWidth(line: string, width: number): number;
    _getCharacterWidth(charCode: string, format: PdfStringFormat): number;
    _setSymbols(text: string): void;
    _getCharacterWidthInternal(charCode: string): number;
}
export declare class _PdfStandardFontMetricsFactory {
    static readonly _subSuperScriptFactor: number;
    static readonly _helveticaAscent: number;
    static readonly _helveticaDescent: number;
    static readonly _helveticaName: string;
    static readonly _helveticaBoldAscent: number;
    static readonly _helveticaBoldDescent: number;
    static readonly _helveticaBoldName: string;
    static readonly _helveticaItalicAscent: number;
    static readonly _helveticaItalicDescent: number;
    static readonly _helveticaItalicName: string;
    static readonly _helveticaBoldItalicAscent: number;
    static readonly _helveticaBoldItalicDescent: number;
    static readonly _helveticaBoldItalicName: string;
    static readonly _courierAscent: number;
    static readonly _courierDescent: number;
    static readonly _courierName: string;
    static readonly _courierBoldAscent: number;
    static readonly _courierBoldDescent: number;
    static readonly _courierBoldName: string;
    static readonly _courierItalicAscent: number;
    static readonly _courierItalicDescent: number;
    static readonly _courierItalicName: string;
    static readonly _courierBoldItalicAscent: number;
    static readonly _courierBoldItalicDescent: number;
    static readonly _courierBoldItalicName: string;
    static readonly _timesAscent: number;
    static readonly _timesDescent: number;
    static readonly _timesName: string;
    static readonly _timesBoldAscent: number;
    static readonly _timesBoldDescent: number;
    static readonly _timesBoldName: string;
    static readonly _timesItalicAscent: number;
    static readonly _timesItalicDescent: number;
    static readonly _timesItalicName: string;
    static readonly _timesBoldItalicAscent: number;
    static readonly _timesBoldItalicDescent: number;
    static readonly _timesBoldItalicName: string;
    static readonly _symbolAscent: number;
    static readonly _symbolDescent: number;
    static readonly _symbolName: string;
    static readonly _zapfDingbatsAscent: number;
    static readonly _zapfDingbatsDescent: number;
    static readonly _zapfDingbatsName: string;
    static _arialWidth: number[];
    static _arialBoldWidth: number[];
    static _fixedWidth: number[];
    static _timesRomanWidth: number[];
    static _timesRomanBoldWidth: number[];
    static _timesRomanItalicWidth: number[];
    static _timesRomanBoldItalicWidths: number[];
    static _symbolWidth: number[];
    static _zapfDingbatsWidth: number[];
    static _getMetrics(fontFamily: PdfFontFamily, fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getHelveticaMetrics(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getCourierMetrics(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getTimesMetrics(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getSymbolMetrics(size: number): _PdfFontMetrics;
    static _getZapfDingbatsMetrics(size: number): _PdfFontMetrics;
}
export declare class _PdfCjkStandardFontMetricsFactory {
    static readonly _subSuperScriptFactor: number;
    static _getHanyangSystemsGothicMedium(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getHanyangSystemsShinMyeongJoMedium(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getHeiseiKakuGothicW5(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getHeiseiMinchoW3(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getMonotypeHeiMedium(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getMonotypeSungLight(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getSinoTypeSongLight(fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
    static _getMetrics(fontFamily: PdfCjkFontFamily, fontStyle: PdfFontStyle, size: number): _PdfFontMetrics;
}
export declare class _PdfCjkFontDescriptorFactory {
    static _fillMonotypeSungLight(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillHeiseiKakuGothicW5(fontDescriptor: _PdfDictionary, fontStyle: PdfFontStyle, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillHanyangSystemsShinMyeongJoMedium(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillHeiseiMinchoW3(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillSinoTypeSongLight(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillMonotypeHeiMedium(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillHanyangSystemsGothicMedium(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _fillFontBox(fontDescriptor: _PdfDictionary, fontBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    static _fillKnownInformation(fontDescriptor: _PdfDictionary, fontFamily: PdfCjkFontFamily, fontMetrics: _PdfFontMetrics): void;
    static _getFontDescriptor(fontFamily: PdfCjkFontFamily, fontStyle: PdfFontStyle, fontMetrics: _PdfFontMetrics): _PdfDictionary;
}
/**
 * Public enum to define font style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfFontStyle {
    /**
     * Specifies the font style `regular`.
     */
    regular = 0,
    /**
     * Specifies the font style `bold`.
     */
    bold = 1,
    /**
     * Specifies the font style `italic`.
     */
    italic = 2,
    /**
     * Specifies the font style `underline`.
     */
    underline = 4,
    /**
     * Specifies the font style `strikeout`.
     */
    strikeout = 8
}
/**
 * Public enum to define font family.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfFontFamily {
    /**
     * Specifies the `helvetica` font family.
     */
    helvetica = 0,
    /**
     * Specifies the `courier` font family.
     */
    courier = 1,
    /**
     * Specifies the `timesRoman` font family.
     */
    timesRoman = 2,
    /**
     * Specifies the `symbol` font family.
     */
    symbol = 3,
    /**
     * Specifies the `zapfDingbats` font family.
     */
    zapfDingbats = 4
}
/**
 * Public enum to define CJK font family.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF CJK standard font
 * let font: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiMinchoW3, 20);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
 * // Draw the text
 * page.graphics.drawString('こんにちは世界', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfCjkFontFamily {
    /**
     * Specifies the `heiseiKakuGothicW5` CJK font family.
     */
    heiseiKakuGothicW5 = 0,
    /**
     * Specifies the `heiseiMinchoW3` CJK font family.
     */
    heiseiMinchoW3 = 1,
    /**
     * Specifies the `hanyangSystemsGothicMedium` CJK font family.
     */
    hanyangSystemsGothicMedium = 2,
    /**
     * Specifies the `hanyangSystemsShinMyeongJoMedium` CJK font family.
     */
    hanyangSystemsShinMyeongJoMedium = 3,
    /**
     * Specifies the `monotypeHeiMedium` CJK font family.
     */
    monotypeHeiMedium = 4,
    /**
     * Specifies the `monotypeSungLight` CJK font family.
     */
    monotypeSungLight = 5,
    /**
     * Specifies the `sinoTypeSongLight` CJK font family.
     */
    sinoTypeSongLight = 6
}
export declare class _UnicodeLine {
    _result: boolean;
    _glyphIndex: number[];
}
