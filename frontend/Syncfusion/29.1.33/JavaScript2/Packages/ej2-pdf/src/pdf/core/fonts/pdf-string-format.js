import { PdfSubSuperScript, _PdfWordWrapType } from './../enumerator';
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
var PdfStringFormat = /** @class */ (function () {
    function PdfStringFormat(arg1, arg2) {
        this.horizontalScalingFactor = 100.0;
        this.rightToLeft = false;
        this._wordWrapType = _PdfWordWrapType.word;
        this._isList = false;
        this.lineLimit = true;
        if (typeof arg1 !== 'undefined') {
            this.alignment = arg1;
        }
        if (typeof arg2 !== 'undefined') {
            this.lineAlignment = arg2;
        }
        else {
            this.lineAlignment = PdfVerticalAlignment.top;
        }
        this.characterSpacing = 0;
        this.wordSpacing = 0;
        this.lineSpacing = 0;
        this.clipPath = false;
        this.firstLineIndent = 0;
        this._internalParagraphIndent = 0;
        this.measureTrailingSpaces = false;
        this.noClip = false;
    }
    Object.defineProperty(PdfStringFormat.prototype, "paragraphIndent", {
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
        get: function () {
            return this._internalParagraphIndent;
        },
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
        set: function (value) {
            this._internalParagraphIndent = value;
            this.firstLineIndent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfStringFormat.prototype, "subSuperScript", {
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
        get: function () {
            if (typeof this._pdfSubSuperScript === 'undefined' || this._pdfSubSuperScript === null) {
                return PdfSubSuperScript.none;
            }
            else {
                return this._pdfSubSuperScript;
            }
        },
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
        set: function (value) {
            this._pdfSubSuperScript = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfStringFormat.prototype, "_wordWrap", {
        get: function () {
            return this._wordWrapType;
        },
        set: function (value) {
            this._wordWrapType = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfStringFormat;
}());
export { PdfStringFormat };
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
export var PdfVerticalAlignment;
(function (PdfVerticalAlignment) {
    /**
     * Specifies the type of `top`.
     */
    PdfVerticalAlignment[PdfVerticalAlignment["top"] = 0] = "top";
    /**
     * Specifies the type of `middle`.
     */
    PdfVerticalAlignment[PdfVerticalAlignment["middle"] = 1] = "middle";
    /**
     * Specifies the type of `bottom`.
     */
    PdfVerticalAlignment[PdfVerticalAlignment["bottom"] = 2] = "bottom";
})(PdfVerticalAlignment || (PdfVerticalAlignment = {}));
