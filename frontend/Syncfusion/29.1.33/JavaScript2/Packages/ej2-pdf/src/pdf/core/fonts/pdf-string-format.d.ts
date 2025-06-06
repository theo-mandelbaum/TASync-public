import { PdfTextAlignment, PdfTextDirection, PdfSubSuperScript, _PdfWordWrapType } from './../enumerator';
/**
 * Represents the text layout information.
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
export declare class PdfStringFormat {
    alignment: PdfTextAlignment;
    lineLimit: boolean;
    lineAlignment: PdfVerticalAlignment;
    characterSpacing: number;
    wordSpacing: number;
    lineSpacing: number;
    clipPath: boolean;
    horizontalScalingFactor: number;
    firstLineIndent: number;
    measureTrailingSpaces: boolean;
    noClip: boolean;
    _internalParagraphIndent: number;
    textDirection: PdfTextDirection;
    rightToLeft: boolean;
    _pdfSubSuperScript: PdfSubSuperScript;
    _wordWrapType: _PdfWordWrapType;
    _isList: boolean;
    /**
     * Initializes a new instance of the `PdfStringFormat` class.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat();
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfStringFormat` class.
     *
     * @param {PdfTextAlignment} alignment PdfTextAlignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(alignment: PdfTextAlignment);
    /**
     * Initializes a new instance of the `PdfStringFormat` class.
     *
     * @param {PdfTextAlignment} alignment PdfTextAlignment.
     * @param {PdfVerticalAlignment} lineAlignment PdfVerticalAlignment.
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
    constructor(alignment: PdfTextAlignment, lineAlignment: PdfVerticalAlignment);
    /**
     * Gets the paragraph indent from string format.
     *
     * @returns {number} Returns the paragraph indent.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
     * // Get the default paragraph indent
     * let paragraph: number = format.paragraphIndent;
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the paragraph indent to string format.
    *
    * @param {number} value paragraph indent.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Gets the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Create a new PDF standard font
    * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
    * // Create a new PDF string format
    * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
    * // Set a new paragraph indent
    * format.paragraphIndent = 20;
    * // Draw the text
    * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    paragraphIndent: number;
    /**
     * Gets the subscript or superscript mode from string format.
     *
     * @returns {PdfSubSuperScript} Returns the subscript or superscript mode.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF standard font
     * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new PDF string format
     * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
     * // Set a new paragraph indent
     * format.paragraphIndent = 20;
     * // Get the subscript or superscript mode
     * let script: PdfSubSuperScript = format.subSuperScript;
     * // Draw the text
     * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the subscript or superscript mode to string format.
    *
    * @param {PdfSubSuperScript} value subscript or superscript mode.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Gets the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Create a new PDF standard font
    * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
    * // Create a new PDF string format
    * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
    * // Set a new paragraph indent
    * format.paragraphIndent = 20;
    * // Set the subscript or superscript mode
    * format.subSuperScript = PdfSubSuperScript.subScript;
    * // Draw the text
    * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    subSuperScript: PdfSubSuperScript;
    _wordWrap: _PdfWordWrapType;
}
/**
 * Public enum to define vertical alignment.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.regular);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.top);
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfVerticalAlignment {
    /**
     * Specifies the type of `top`.
     */
    top = 0,
    /**
     * Specifies the type of `middle`.
     */
    middle = 1,
    /**
     * Specifies the type of `bottom`.
     */
    bottom = 2
}
