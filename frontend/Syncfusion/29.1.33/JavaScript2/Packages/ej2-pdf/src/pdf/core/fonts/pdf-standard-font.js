var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PdfStringFormat } from './pdf-string-format';
import { _PdfFontMetrics, _CjkWidthTable, _StandardWidthTable, _CjkSameWidth, _CjkDifferentWidth } from './pdf-font-metrics';
import { _PdfDictionary, _PdfName } from './../pdf-primitives';
import { _PdfStringLayouter } from './string-layouter';
import { _UnicodeTrueTypeFont } from './unicode-true-type-font';
import { _fromRectangle } from './../utils';
import { PdfTextDirection } from './../../core/enumerator';
import { _RtlRenderer } from './../graphics/rightToLeft/text-renderer';
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
var PdfFont = /** @class */ (function () {
    function PdfFont(size, style) {
        if (typeof size === 'number' && typeof style === 'undefined') {
            this._size = size;
        }
        else {
            this._size = size;
            this._style = style;
        }
    }
    Object.defineProperty(PdfFont.prototype, "size", {
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
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "style", {
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
        get: function () {
            return this._style;
        },
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
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "isUnderline", {
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
        get: function () {
            return (this.style & PdfFontStyle.underline) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "isStrikeout", {
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
        get: function () {
            return (this.style & PdfFontStyle.strikeout) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "_metrics", {
        get: function () {
            return this._fontMetrics;
        },
        set: function (value) {
            this._fontMetrics = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "isBold", {
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
        get: function () {
            return ((this.style & PdfFontStyle.bold) > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "isItalic", {
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
        get: function () {
            return ((this.style & PdfFontStyle.italic) > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFont.prototype, "height", {
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
        get: function () {
            return this._metrics._getHeight();
        },
        enumerable: true,
        configurable: true
    });
    PdfFont.prototype._setInternals = function (internals) {
        if (!internals) {
            throw new Error('ArgumentNullException:internals');
        }
        this._pdfFontInternals = internals;
    };
    PdfFont.prototype._getCharacterCount = function (text, symbols) {
        if (typeof symbols === 'string') {
            var numSymbols = 0;
            var curIndex = 0;
            curIndex = text.indexOf(symbols, curIndex);
            while (curIndex !== -1) {
                numSymbols++;
                curIndex++;
                curIndex = text.indexOf(symbols, curIndex);
            }
            return numSymbols;
        }
        else {
            var count = 0;
            for (var i = 0; i < text.length; i++) {
                if (symbols.indexOf(text[Number.parseInt(i.toString(), 10)]) !== -1) {
                    count++;
                }
            }
            return count;
        }
    };
    PdfFont.prototype.measureString = function (text, arg2, arg3, arg4, arg5) {
        if (typeof text === 'string' && typeof arg2 === 'undefined') {
            return this.measureString(text, null);
        }
        else if (typeof text === 'string' && (arg2 instanceof PdfStringFormat || arg2 === null) &&
            typeof arg3 === 'undefined' && typeof arg4 === 'undefined') {
            var temparg2 = arg2;
            var charactersFitted = 0;
            var linesFilled = 0;
            return this.measureString(text, temparg2, charactersFitted, linesFilled);
        }
        else if (typeof text === 'string' && (arg2 instanceof PdfStringFormat || arg2 === null)
            && typeof arg3 === 'number' && typeof arg4 === 'number') {
            var temparg2 = arg2;
            return this.measureString(text, 0, temparg2, arg3, arg4);
        }
        else if (typeof text === 'string' && typeof arg2 === 'number'
            && (arg3 instanceof PdfStringFormat || arg3 === null) && typeof arg4 === 'number' && typeof arg5 === 'number') {
            var layoutArea = [arg2, 0];
            var temparg3 = arg3;
            return this.measureString(text, layoutArea, temparg3, arg4, arg5);
        }
        else {
            var temparg2 = arg2;
            var temparg3 = arg3;
            var layouter = new _PdfStringLayouter();
            var result = layouter._layout(text, this, temparg3, temparg2);
            arg4 = text.length;
            arg5 = (result._empty) ? 0 : result._lines.length;
            return result._actualSize;
        }
    };
    PdfFont.prototype._applyFormatSettings = function (line, format, width) {
        var realWidth = width;
        if (typeof format !== 'undefined' && format !== null && width > 0) {
            if (format.characterSpacing !== 0) {
                realWidth += (line.length - 1) * format.characterSpacing;
            }
            if (format.wordSpacing !== 0) {
                realWidth += this._getCharacterCount(line, [' ', '\t']) * format.wordSpacing;
            }
        }
        return realWidth;
    };
    return PdfFont;
}());
export { PdfFont };
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
var PdfStandardFont = /** @class */ (function (_super) {
    __extends(PdfStandardFont, _super);
    function PdfStandardFont(fontFamily, size, style) {
        var _this = _super.call(this, size, (typeof style === 'undefined') ? PdfFontStyle.regular : style) || this;
        _this._fontFamily = fontFamily;
        _this._checkStyle();
        _this._initializeInternals();
        return _this;
    }
    Object.defineProperty(PdfStandardFont.prototype, "fontFamily", {
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
        get: function () {
            return this._fontFamily;
        },
        enumerable: true,
        configurable: true
    });
    PdfStandardFont.prototype._checkStyle = function () {
        if (this._fontFamily === PdfFontFamily.symbol || this._fontFamily === PdfFontFamily.zapfDingbats) {
            this._style &= ~(PdfFontStyle.bold | PdfFontStyle.italic);
        }
    };
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
    PdfStandardFont.prototype.getLineWidth = function (line, format) {
        var width = 0;
        for (var i = 0, len = line.length; i < len; i++) {
            width += this._getCharacterWidthInternal(line[Number.parseInt(i.toString(), 10)]);
        }
        width *= (0.001 * this._metrics._size);
        width = this._applyFormatSettings(line, format, width);
        return width;
    };
    PdfStandardFont.prototype._initializeInternals = function () {
        this._metrics = _PdfStandardFontMetricsFactory._getMetrics(this._fontFamily, this._style, this._size);
        this._dictionary = this._createInternals();
    };
    PdfStandardFont.prototype._createInternals = function () {
        var dictionary = new _PdfDictionary();
        dictionary._updated = true;
        dictionary.set('Type', _PdfName.get('Font'));
        dictionary.set('Subtype', _PdfName.get('Type1'));
        dictionary.set('BaseFont', new _PdfName(this._metrics._postScriptName));
        if (this._fontFamily !== PdfFontFamily.symbol && this._fontFamily !== PdfFontFamily.zapfDingbats) {
            dictionary.set('Encoding', new _PdfName('WinAnsiEncoding'));
        }
        return dictionary;
    };
    PdfStandardFont.prototype._getCharacterWidthInternal = function (charCode) {
        var code = charCode.charCodeAt(0);
        if (this._metrics._name === 'Helvetica' ||
            this._metrics._name === 'Courier' ||
            this._metrics._name === 'TimesRoman' ||
            this._metrics._name === 'Symbol' ||
            this._metrics._name === 'ZapfDingbats') {
            code = code - 32;
        }
        code = (code >= 0 && code !== 128) ? code : 0;
        return this._metrics._widthTable._itemAt(code);
    };
    return PdfStandardFont;
}(PdfFont));
export { PdfStandardFont };
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
var PdfCjkStandardFont = /** @class */ (function (_super) {
    __extends(PdfCjkStandardFont, _super);
    function PdfCjkStandardFont(fontFamily, size, style) {
        var _this = _super.call(this, size, (typeof style === 'undefined') ? PdfFontStyle.regular : style) || this;
        _this._fontFamily = fontFamily;
        _this._size = size;
        _this._initializeInternals();
        return _this;
    }
    Object.defineProperty(PdfCjkStandardFont.prototype, "fontFamily", {
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
        get: function () {
            return this._fontFamily;
        },
        enumerable: true,
        configurable: true
    });
    PdfCjkStandardFont.prototype._initializeInternals = function () {
        this._metrics = _PdfCjkStandardFontMetricsFactory._getMetrics(this._fontFamily, this._style, this._size);
        this._dictionary = this._createInternals();
    };
    PdfCjkStandardFont.prototype._createInternals = function () {
        var dictionary = new _PdfDictionary();
        dictionary._updated = true;
        dictionary.set('Type', _PdfName.get('Font'));
        dictionary.set('Subtype', _PdfName.get('Type0'));
        dictionary.set('BaseFont', new _PdfName(this._metrics._postScriptName));
        dictionary.set('Encoding', this._getEncoding(this._fontFamily));
        dictionary.set('DescendantFonts', this._getDescendantFont());
        return dictionary;
    };
    PdfCjkStandardFont.prototype._getEncoding = function (fontFamily) {
        var encoding = 'Unknown';
        switch (fontFamily) {
            case PdfCjkFontFamily.hanyangSystemsGothicMedium:
            case PdfCjkFontFamily.hanyangSystemsShinMyeongJoMedium:
                encoding = 'UniKS-UCS2-H';
                break;
            case PdfCjkFontFamily.heiseiKakuGothicW5:
            case PdfCjkFontFamily.heiseiMinchoW3:
                encoding = 'UniJIS-UCS2-H';
                break;
            case PdfCjkFontFamily.monotypeHeiMedium:
            case PdfCjkFontFamily.monotypeSungLight:
                encoding = 'UniCNS-UCS2-H';
                break;
            case PdfCjkFontFamily.sinoTypeSongLight:
                encoding = 'UniGB-UCS2-H';
                break;
        }
        return new _PdfName(encoding);
    };
    PdfCjkStandardFont.prototype._getDescendantFont = function () {
        var dictionary = new _PdfDictionary();
        dictionary._updated = true;
        dictionary.set('Type', _PdfName.get('Font'));
        dictionary.set('Subtype', _PdfName.get('CIDFontType2'));
        dictionary.set('BaseFont', new _PdfName(this._metrics._postScriptName));
        dictionary.set('DW', this._metrics._widthTable._defaultWidth);
        dictionary.set('W', this._metrics._widthTable._toArray());
        dictionary.set('FontDescriptor', _PdfCjkFontDescriptorFactory._getFontDescriptor(this._fontFamily, this._style, this._metrics));
        dictionary.set('CIDSystemInfo', this._getSystemInformation());
        return [dictionary];
    };
    PdfCjkStandardFont.prototype._getSystemInformation = function () {
        var systemInformation = new _PdfDictionary();
        systemInformation._updated = true;
        systemInformation.set('Registry', 'Adobe');
        switch (this._fontFamily) {
            case PdfCjkFontFamily.hanyangSystemsGothicMedium:
            case PdfCjkFontFamily.hanyangSystemsShinMyeongJoMedium:
                systemInformation.set('Ordering', 'Korea1');
                systemInformation.set('Supplement', 1);
                break;
            case PdfCjkFontFamily.heiseiKakuGothicW5:
            case PdfCjkFontFamily.heiseiMinchoW3:
                systemInformation.set('Ordering', 'Japan1');
                systemInformation.set('Supplement', 2);
                break;
            case PdfCjkFontFamily.monotypeHeiMedium:
            case PdfCjkFontFamily.monotypeSungLight:
                systemInformation.set('Ordering', 'CNS1');
                systemInformation.set('Supplement', '0');
                break;
            case PdfCjkFontFamily.sinoTypeSongLight:
                systemInformation.set('Ordering', 'GB1');
                systemInformation.set('Supplement', 2);
                break;
        }
        return systemInformation;
    };
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
    PdfCjkStandardFont.prototype.getLineWidth = function (line, format) {
        var width = 0;
        for (var i = 0; i < line.length; i++) {
            width += this._getCharacterWidthInternal(line.charCodeAt(i));
        }
        width *= (0.001 * this._metrics._size);
        width = this._applyFormatSettings(line, format, width);
        return width;
    };
    PdfCjkStandardFont.prototype._getCharacterWidthInternal = function (charCode) {
        charCode = (charCode >= 0) ? charCode : 0;
        return this._metrics._widthTable._itemAt(charCode);
    };
    return PdfCjkStandardFont;
}(PdfFont));
export { PdfCjkStandardFont };
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
var PdfTrueTypeFont = /** @class */ (function (_super) {
    __extends(PdfTrueTypeFont, _super);
    function PdfTrueTypeFont(base64String, size, style) {
        var _this = _super.call(this, size, (typeof style === 'undefined') ? PdfFontStyle.regular : style) || this;
        _this._isEmbedFont = false;
        _this._isUnicode = true;
        if (style !== undefined) {
            _this._createFontInternal(base64String, style);
        }
        else {
            _this._createFontInternal(base64String, PdfFontStyle.regular);
        }
        return _this;
    }
    Object.defineProperty(PdfTrueTypeFont.prototype, "isUnicode", {
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
        get: function () {
            return this._isUnicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTrueTypeFont.prototype, "isEmbed", {
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
        get: function () {
            return this._isEmbedFont;
        },
        enumerable: true,
        configurable: true
    });
    PdfTrueTypeFont.prototype._createFontInternal = function (base64String, style) {
        this._fontInternal = new _UnicodeTrueTypeFont(base64String, this._size);
        this.style = style;
        this._initializeInternals();
    };
    PdfTrueTypeFont.prototype._initializeInternals = function () {
        var internals = null;
        if (this._fontInternal instanceof _UnicodeTrueTypeFont) {
            this._fontInternal._isEmbed = this._isEmbedFont;
        }
        this._fontInternal._createInternals();
        internals = this._fontInternal._getInternals();
        this._metrics = this._fontInternal._metrics;
        this._metrics._isUnicodeFont = true;
        this._setInternals(internals);
    };
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
    PdfTrueTypeFont.prototype.getLineWidth = function (line, format) {
        var width = 0;
        if (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none) {
            width = this._getUnicodeLineWidth(line, width);
        }
        else {
            for (var i = 0, len = line.length; i < len; i++) {
                width += this._getCharacterWidthInternal(line[Number.parseInt(i.toString(), 10)]);
            }
        }
        width *= (0.001 * this._metrics._size);
        width = this._applyFormatSettings(line, format, width);
        return width;
    };
    PdfTrueTypeFont.prototype._getUnicodeLineWidth = function (line, width) {
        width = 0;
        var glyphIndex = [];
        var result = false;
        var rtlRender = new _RtlRenderer();
        var value = rtlRender._getGlyphIndex(line, this, glyphIndex);
        result = value._result;
        glyphIndex = value._glyphIndex;
        if (result && glyphIndex !== null) {
            var ttfReader = this._fontInternal._ttfReader;
            for (var i = 0, len = glyphIndex.length; i < len; i++) {
                var index = glyphIndex[Number.parseInt(i.toString(), 10)];
                var glyph = ttfReader._getGlyph(index);
                if (glyph !== null && typeof glyph !== 'undefined') {
                    width += glyph._width;
                }
            }
        }
        return width;
    };
    PdfTrueTypeFont.prototype._getCharacterWidth = function (charCode, format) {
        var codeWidth = this._fontInternal._getCharacterWidth(charCode);
        var size = this._metrics._getSize(format);
        codeWidth *= (0.001 * size);
        return codeWidth;
    };
    PdfTrueTypeFont.prototype._setSymbols = function (text) {
        var internalFont = this._fontInternal;
        if (internalFont !== null && typeof internalFont !== 'undefined') {
            internalFont._setSymbols(text);
        }
    };
    PdfTrueTypeFont.prototype._getCharacterWidthInternal = function (charCode) {
        var code = charCode.charCodeAt(0);
        code = (code >= 0 && code !== 128) ? code : 0;
        return this._metrics._widthTable._itemAt(code);
    };
    return PdfTrueTypeFont;
}(PdfFont));
export { PdfTrueTypeFont };
var _PdfStandardFontMetricsFactory = /** @class */ (function () {
    function _PdfStandardFontMetricsFactory() {
    }
    _PdfStandardFontMetricsFactory._getMetrics = function (fontFamily, fontStyle, size) {
        var metrics = null;
        switch (fontFamily) {
            case PdfFontFamily.helvetica:
                metrics = this._getHelveticaMetrics(fontStyle, size);
                metrics._name = 'Helvetica';
                break;
            case PdfFontFamily.courier:
                metrics = this._getCourierMetrics(fontStyle, size);
                metrics._name = 'Courier';
                break;
            case PdfFontFamily.timesRoman:
                metrics = this._getTimesMetrics(fontStyle, size);
                metrics._name = 'TimesRoman';
                break;
            case PdfFontFamily.symbol:
                metrics = this._getSymbolMetrics(size);
                metrics._name = 'Symbol';
                break;
            case PdfFontFamily.zapfDingbats:
                metrics = this._getZapfDingbatsMetrics(size);
                metrics._name = 'ZapfDingbats';
                break;
            default:
                metrics = this._getHelveticaMetrics(fontStyle, size);
                metrics._name = 'Helvetica';
                break;
        }
        metrics._subScriptSizeFactor = this._subSuperScriptFactor;
        metrics._superscriptSizeFactor = this._subSuperScriptFactor;
        return metrics;
    };
    _PdfStandardFontMetricsFactory._getHelveticaMetrics = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        if ((fontStyle & PdfFontStyle.bold) > 0 && (fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._helveticaBoldItalicAscent;
            metrics._descent = this._helveticaBoldItalicDescent;
            metrics._postScriptName = this._helveticaBoldItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._arialBoldWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.bold) > 0) {
            metrics._ascent = this._helveticaBoldAscent;
            metrics._descent = this._helveticaBoldDescent;
            metrics._postScriptName = this._helveticaBoldName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._arialBoldWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._helveticaItalicAscent;
            metrics._descent = this._helveticaItalicDescent;
            metrics._postScriptName = this._helveticaItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._arialWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else {
            metrics._ascent = this._helveticaAscent;
            metrics._descent = this._helveticaDescent;
            metrics._postScriptName = this._helveticaName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._arialWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        return metrics;
    };
    _PdfStandardFontMetricsFactory._getCourierMetrics = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        if ((fontStyle & PdfFontStyle.bold) > 0 && (fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._courierBoldItalicAscent;
            metrics._descent = this._courierBoldItalicDescent;
            metrics._postScriptName = this._courierBoldItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._fixedWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.bold) > 0) {
            metrics._ascent = this._courierBoldAscent;
            metrics._descent = this._courierBoldDescent;
            metrics._postScriptName = this._courierBoldName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._fixedWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._courierItalicAscent;
            metrics._descent = this._courierItalicDescent;
            metrics._postScriptName = this._courierItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._fixedWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else {
            metrics._ascent = this._courierAscent;
            metrics._descent = this._courierDescent;
            metrics._postScriptName = this._courierName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._fixedWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        return metrics;
    };
    _PdfStandardFontMetricsFactory._getTimesMetrics = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        if ((fontStyle & PdfFontStyle.bold) > 0 && (fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._timesBoldItalicAscent;
            metrics._descent = this._timesBoldItalicDescent;
            metrics._postScriptName = this._timesBoldItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._timesRomanBoldItalicWidths);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.bold) > 0) {
            metrics._ascent = this._timesBoldAscent;
            metrics._descent = this._timesBoldDescent;
            metrics._postScriptName = this._timesBoldName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._timesRomanBoldWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else if ((fontStyle & PdfFontStyle.italic) > 0) {
            metrics._ascent = this._timesItalicAscent;
            metrics._descent = this._timesItalicDescent;
            metrics._postScriptName = this._timesItalicName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._timesRomanItalicWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        else {
            metrics._ascent = this._timesAscent;
            metrics._descent = this._timesDescent;
            metrics._postScriptName = this._timesName;
            metrics._size = size;
            metrics._widthTable = new _StandardWidthTable(this._timesRomanWidth);
            metrics._height = metrics._ascent - metrics._descent;
        }
        return metrics;
    };
    _PdfStandardFontMetricsFactory._getSymbolMetrics = function (size) {
        var metrics = new _PdfFontMetrics();
        metrics._ascent = this._symbolAscent;
        metrics._descent = this._symbolDescent;
        metrics._postScriptName = this._symbolName;
        metrics._size = size;
        metrics._widthTable = new _StandardWidthTable(this._symbolWidth);
        metrics._height = metrics._ascent - metrics._descent;
        return metrics;
    };
    _PdfStandardFontMetricsFactory._getZapfDingbatsMetrics = function (size) {
        var metrics = new _PdfFontMetrics();
        metrics._ascent = this._zapfDingbatsAscent;
        metrics._descent = this._zapfDingbatsDescent;
        metrics._postScriptName = this._zapfDingbatsName;
        metrics._size = size;
        metrics._widthTable = new _StandardWidthTable(this._zapfDingbatsWidth);
        metrics._height = metrics._ascent - metrics._descent;
        return metrics;
    };
    _PdfStandardFontMetricsFactory._subSuperScriptFactor = 1.52;
    _PdfStandardFontMetricsFactory._helveticaAscent = 931;
    _PdfStandardFontMetricsFactory._helveticaDescent = -225;
    _PdfStandardFontMetricsFactory._helveticaName = 'Helvetica';
    _PdfStandardFontMetricsFactory._helveticaBoldAscent = 962;
    _PdfStandardFontMetricsFactory._helveticaBoldDescent = -228;
    _PdfStandardFontMetricsFactory._helveticaBoldName = 'Helvetica-Bold';
    _PdfStandardFontMetricsFactory._helveticaItalicAscent = 931;
    _PdfStandardFontMetricsFactory._helveticaItalicDescent = -225;
    _PdfStandardFontMetricsFactory._helveticaItalicName = 'Helvetica-Oblique';
    _PdfStandardFontMetricsFactory._helveticaBoldItalicAscent = 962;
    _PdfStandardFontMetricsFactory._helveticaBoldItalicDescent = -228;
    _PdfStandardFontMetricsFactory._helveticaBoldItalicName = 'Helvetica-BoldOblique';
    _PdfStandardFontMetricsFactory._courierAscent = 805;
    _PdfStandardFontMetricsFactory._courierDescent = -250;
    _PdfStandardFontMetricsFactory._courierName = 'Courier';
    _PdfStandardFontMetricsFactory._courierBoldAscent = 801;
    _PdfStandardFontMetricsFactory._courierBoldDescent = -250;
    _PdfStandardFontMetricsFactory._courierBoldName = 'Courier-Bold';
    _PdfStandardFontMetricsFactory._courierItalicAscent = 805;
    _PdfStandardFontMetricsFactory._courierItalicDescent = -250;
    _PdfStandardFontMetricsFactory._courierItalicName = 'Courier-Oblique';
    _PdfStandardFontMetricsFactory._courierBoldItalicAscent = 801;
    _PdfStandardFontMetricsFactory._courierBoldItalicDescent = -250;
    _PdfStandardFontMetricsFactory._courierBoldItalicName = 'Courier-BoldOblique';
    _PdfStandardFontMetricsFactory._timesAscent = 898;
    _PdfStandardFontMetricsFactory._timesDescent = -218;
    _PdfStandardFontMetricsFactory._timesName = 'Times-Roman';
    _PdfStandardFontMetricsFactory._timesBoldAscent = 935;
    _PdfStandardFontMetricsFactory._timesBoldDescent = -218;
    _PdfStandardFontMetricsFactory._timesBoldName = 'Times-Bold';
    _PdfStandardFontMetricsFactory._timesItalicAscent = 883;
    _PdfStandardFontMetricsFactory._timesItalicDescent = -217;
    _PdfStandardFontMetricsFactory._timesItalicName = 'Times-Italic';
    _PdfStandardFontMetricsFactory._timesBoldItalicAscent = 921;
    _PdfStandardFontMetricsFactory._timesBoldItalicDescent = -218;
    _PdfStandardFontMetricsFactory._timesBoldItalicName = 'Times-BoldItalic';
    _PdfStandardFontMetricsFactory._symbolAscent = 1010;
    _PdfStandardFontMetricsFactory._symbolDescent = -293;
    _PdfStandardFontMetricsFactory._symbolName = 'Symbol';
    _PdfStandardFontMetricsFactory._zapfDingbatsAscent = 820;
    _PdfStandardFontMetricsFactory._zapfDingbatsDescent = -143;
    _PdfStandardFontMetricsFactory._zapfDingbatsName = 'ZapfDingbats';
    _PdfStandardFontMetricsFactory._arialWidth = [
        278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333,
        278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584,
        584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833,
        722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278,
        469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833,
        556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334,
        584, 0, 556, 0, 222, 556, 333, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0,
        611, 0, 0, 222, 222, 333, 333, 350, 556, 1000, 333, 1000, 500, 333, 944, 0,
        500, 667, 0, 333, 556, 556, 556, 556, 260, 556, 333, 737, 370, 556, 584, 0,
        737, 333, 400, 584, 333, 333, 333, 556, 537, 278, 333, 333, 365, 556, 834, 834,
        834, 611, 667, 667, 667, 667, 667, 667, 1000, 722, 667, 667, 667, 667, 278, 278,
        278, 278, 722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667,
        667, 611, 556, 556, 556, 556, 556, 556, 889, 500, 556, 556, 556, 556, 278, 278,
        278, 278, 556, 556, 556, 556, 556, 556, 556, 584, 611, 556, 556, 556, 556, 500,
        556, 500
    ];
    _PdfStandardFontMetricsFactory._arialBoldWidth = [
        278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333,
        278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584,
        584, 611, 975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833,
        722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333,
        584, 556, 333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889,
        611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389,
        584, 0, 556, 0, 278, 556, 500, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0,
        611, 0, 0, 278, 278, 500, 500, 350, 556, 1000, 333, 1000, 556, 333, 944, 0,
        500, 667, 0, 333, 556, 556, 556, 556, 280, 556, 333, 737, 370, 556, 584, 0,
        737, 333, 400, 584, 333, 333, 333, 611, 556, 278, 333, 333, 365, 556, 834, 834,
        834, 611, 722, 722, 722, 722, 722, 722, 1000, 722, 667, 667, 667, 667, 278, 278,
        278, 278, 722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667,
        667, 611, 556, 556, 556, 556, 556, 556, 889, 556, 556, 556, 556, 556, 278, 278,
        278, 278, 611, 611, 611, 611, 611, 611, 611, 584, 611, 611, 611, 611, 611, 556,
        611, 556
    ];
    _PdfStandardFontMetricsFactory._fixedWidth = [
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600,
        600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600
    ];
    _PdfStandardFontMetricsFactory._timesRomanWidth = [
        250, 333, 408, 500, 500, 833, 778, 180, 333, 333, 500, 564, 250, 333,
        250, 278, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 278, 278, 564, 564,
        564, 444, 921, 722, 667, 667, 722, 611, 556, 722, 722, 333, 389, 722, 611, 889,
        722, 722, 556, 722, 667, 556, 611, 722, 722, 944, 722, 722, 611, 333, 278, 333,
        469, 500, 333, 444, 500, 444, 500, 444, 333, 500, 500, 278, 278, 500, 278, 778,
        500, 500, 500, 500, 333, 389, 278, 500, 500, 722, 500, 500, 444, 480, 200, 480,
        541, 0, 500, 0, 333, 500, 444, 1000, 500, 500, 333, 1000, 556, 333, 889, 0,
        611, 0, 0, 333, 333, 444, 444, 350, 500, 1000, 333, 980, 389, 333, 722, 0,
        444, 722, 0, 333, 500, 500, 500, 500, 200, 500, 333, 760, 276, 500, 564, 0,
        760, 333, 400, 564, 300, 300, 333, 500, 453, 250, 333, 300, 310, 500, 750, 750,
        750, 444, 722, 722, 722, 722, 722, 722, 889, 667, 611, 611, 611, 611, 333, 333,
        333, 333, 722, 722, 722, 722, 722, 722, 722, 564, 722, 722, 722, 722, 722, 722,
        556, 500, 444, 444, 444, 444, 444, 444, 667, 444, 444, 444, 444, 444, 278, 278,
        278, 278, 500, 500, 500, 500, 500, 500, 500, 564, 500, 500, 500, 500, 500, 500,
        500, 500
    ];
    _PdfStandardFontMetricsFactory._timesRomanBoldWidth = [
        250, 333, 555, 500, 500, 1000, 833, 278, 333, 333, 500, 570, 250, 333,
        250, 278, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 333, 333, 570, 570,
        570, 500, 930, 722, 667, 722, 722, 667, 611, 778, 778, 389, 500, 778, 667, 944,
        722, 778, 611, 778, 722, 556, 667, 722, 722, 1000, 722, 722, 667, 333, 278, 333,
        581, 500, 333, 500, 556, 444, 556, 444, 333, 500, 556, 278, 333, 556, 278, 833,
        556, 500, 556, 556, 444, 389, 333, 556, 500, 722, 500, 500, 444, 394, 220, 394,
        520, 0, 500, 0, 333, 500, 500, 1000, 500, 500, 333, 1000, 556, 333, 1000, 0,
        667, 0, 0, 333, 333, 500, 500, 350, 500, 1000, 333, 1000, 389, 333, 722, 0,
        444, 722, 0, 333, 500, 500, 500, 500, 220, 500, 333, 747, 300, 500, 570, 0,
        747, 333, 400, 570, 300, 300, 333, 556, 540, 250, 333, 300, 330, 500, 750, 750,
        750, 500, 722, 722, 722, 722, 722, 722, 1000, 722, 667, 667, 667, 667, 389, 389,
        389, 389, 722, 722, 778, 778, 778, 778, 778, 570, 778, 722, 722, 722, 722, 722,
        611, 556, 500, 500, 500, 500, 500, 500, 722, 444, 444, 444, 444, 444, 278, 278,
        278, 278, 500, 556, 500, 500, 500, 500, 500, 570, 500, 556, 556, 556, 556, 500,
        556, 500
    ];
    _PdfStandardFontMetricsFactory._timesRomanItalicWidth = [
        250, 333, 420, 500, 500, 833, 778, 214, 333, 333, 500, 675, 250, 333,
        250, 278, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 333, 333, 675, 675,
        675, 500, 920, 611, 611, 667, 722, 611, 611, 722, 722, 333, 444, 667, 556, 833,
        667, 722, 611, 722, 611, 500, 556, 722, 611, 833, 611, 556, 556, 389, 278, 389,
        422, 500, 333, 500, 500, 444, 500, 444, 278, 500, 500, 278, 278, 444, 278, 722,
        500, 500, 500, 500, 389, 389, 278, 500, 444, 667, 444, 444, 389, 400, 275, 400,
        541, 0, 500, 0, 333, 500, 556, 889, 500, 500, 333, 1000, 500, 333, 944, 0,
        556, 0, 0, 333, 333, 556, 556, 350, 500, 889, 333, 980, 389, 333, 667, 0,
        389, 556, 0, 389, 500, 500, 500, 500, 275, 500, 333, 760, 276, 500, 675, 0,
        760, 333, 400, 675, 300, 300, 333, 500, 523, 250, 333, 300, 310, 500, 750, 750,
        750, 500, 611, 611, 611, 611, 611, 611, 889, 667, 611, 611, 611, 611, 333, 333,
        333, 333, 722, 667, 722, 722, 722, 722, 722, 675, 722, 722, 722, 722, 722, 556,
        611, 500, 500, 500, 500, 500, 500, 500, 667, 444, 444, 444, 444, 444, 278, 278,
        278, 278, 500, 500, 500, 500, 500, 500, 500, 675, 500, 500, 500, 500, 500, 444,
        500, 444
    ];
    _PdfStandardFontMetricsFactory._timesRomanBoldItalicWidths = [
        250, 389, 555, 500, 500, 833, 778, 278, 333, 333, 500, 570, 250, 333,
        250, 278, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 333, 333, 570, 570,
        570, 500, 832, 667, 667, 667, 722, 667, 667, 722, 778, 389, 500, 667, 611, 889,
        722, 722, 611, 722, 667, 556, 611, 722, 667, 889, 667, 611, 611, 333, 278, 333,
        570, 500, 333, 500, 500, 444, 500, 444, 333, 500, 556, 278, 278, 500, 278, 778,
        556, 500, 500, 500, 389, 389, 278, 556, 444, 667, 500, 444, 389, 348, 220, 348,
        570, 0, 500, 0, 333, 500, 500, 1000, 500, 500, 333, 1000, 556, 333, 944, 0,
        611, 0, 0, 333, 333, 500, 500, 350, 500, 1000, 333, 1000, 389, 333, 722, 0,
        389, 611, 0, 389, 500, 500, 500, 500, 220, 500, 333, 747, 266, 500, 606, 0,
        747, 333, 400, 570, 300, 300, 333, 576, 500, 250, 333, 300, 300, 500, 750, 750,
        750, 500, 667, 667, 667, 667, 667, 667, 944, 667, 667, 667, 667, 667, 389, 389,
        389, 389, 722, 722, 722, 722, 722, 722, 722, 570, 722, 722, 722, 722, 722, 611,
        611, 500, 500, 500, 500, 500, 500, 500, 722, 444, 444, 444, 444, 444, 278, 278,
        278, 278, 500, 556, 500, 500, 500, 500, 500, 570, 500, 556, 556, 556, 556, 444,
        500, 444
    ];
    _PdfStandardFontMetricsFactory._symbolWidth = [
        250, 333, 713, 500, 549, 833, 778, 439, 333, 333, 500, 549, 250, 549,
        250, 278, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 278, 278,
        549, 549, 549, 444, 549, 722, 667, 722, 612, 611, 763, 603, 722, 333,
        631, 722, 686, 889, 722, 722, 768, 741, 556, 592, 611, 690, 439, 768,
        645, 795, 611, 333, 863, 333, 658, 500, 500, 631, 549, 549, 494, 439,
        521, 411, 603, 329, 603, 549, 549, 576, 521, 549, 549, 521, 549, 603,
        439, 576, 713, 686, 493, 686, 494, 480, 200, 480, 549, 750, 620, 247,
        549, 167, 713, 500, 753, 753, 753, 753, 1042, 987, 603, 987, 603, 400,
        549, 411, 549, 549, 713, 494, 460, 549, 549, 549, 549, 1000, 603, 1000,
        658, 823, 686, 795, 987, 768, 768, 823, 768, 768, 713, 713, 713, 713,
        713, 713, 713, 768, 713, 790, 790, 890, 823, 549, 250, 713, 603, 603,
        1042, 987, 603, 987, 603, 494, 329, 790, 790, 786, 713, 384, 384, 384,
        384, 384, 384, 494, 494, 494, 494, 329, 274, 686, 686, 686, 384, 384,
        384, 384, 384, 384, 494, 494, 494, -1
    ];
    _PdfStandardFontMetricsFactory._zapfDingbatsWidth = [
        278, 974, 961, 974, 980, 719, 789, 790, 791, 690, 960, 939, 549, 855,
        911, 933, 911, 945, 974, 755, 846, 762, 761, 571, 677, 763, 760, 759,
        754, 494, 552, 537, 577, 692, 786, 788, 788, 790, 793, 794, 816, 823,
        789, 841, 823, 833, 816, 831, 923, 744, 723, 749, 790, 792, 695, 776,
        768, 792, 759, 707, 708, 682, 701, 826, 815, 789, 789, 707, 687, 696,
        689, 786, 787, 713, 791, 785, 791, 873, 761, 762, 762, 759, 759, 892,
        892, 788, 784, 438, 138, 277, 415, 392, 392, 668, 668, 390, 390, 317,
        317, 276, 276, 509, 509, 410, 410, 234, 234, 334, 334, 732, 544, 544,
        910, 667, 760, 760, 776, 595, 694, 626, 788, 788, 788, 788, 788, 788,
        788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788,
        788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788, 788,
        788, 788, 788, 788, 788, 788, 894, 838, 1016, 458, 748, 924, 748, 918,
        927, 928, 928, 834, 873, 828, 924, 924, 917, 930, 931, 463, 883, 836,
        836, 867, 867, 696, 696, 874, 874, 760, 946, 771, 865, 771, 888, 967,
        888, 831, 873, 927, 970, 918
    ];
    return _PdfStandardFontMetricsFactory;
}());
export { _PdfStandardFontMetricsFactory };
var _PdfCjkStandardFontMetricsFactory = /** @class */ (function () {
    function _PdfCjkStandardFontMetricsFactory() {
    }
    _PdfCjkStandardFontMetricsFactory._getHanyangSystemsGothicMedium = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 127, 500));
        widthTable._add(new _CjkSameWidth(8094, 8190, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 880;
        metrics._descent = -120;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HYGoThic-Medium,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'HYGoThic-Medium,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HYGoThic-Medium,Italic';
        }
        else {
            metrics._postScriptName = 'HYGoThic-Medium';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getHanyangSystemsShinMyeongJoMedium = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(8094, 8190, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 880;
        metrics._descent = -120;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HYSMyeongJo-Medium,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'HYSMyeongJo-Medium,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HYSMyeongJo-Medium,Italic';
        }
        else {
            metrics._postScriptName = 'HYSMyeongJo-Medium';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getHeiseiKakuGothicW5 = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(231, 632, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 857;
        metrics._descent = -125;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HeiseiKakuGo-W5,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'HeiseiKakuGo-W5,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HeiseiKakuGo-W5,Italic';
        }
        else {
            metrics._postScriptName = 'HeiseiKakuGo-W5';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getHeiseiMinchoW3 = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(231, 632, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 857;
        metrics._descent = -143;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HeiseiMin-W3,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'HeiseiMin-W3,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'HeiseiMin-W3,Italic';
        }
        else {
            metrics._postScriptName = 'HeiseiMin-W3';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getMonotypeHeiMedium = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(13648, 13742, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 880;
        metrics._descent = -120;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'MHei-Medium,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'MHei-Medium,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'MHei-Medium,Italic';
        }
        else {
            metrics._postScriptName = 'MHei-Medium';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getMonotypeSungLight = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(13648, 13742, 500));
        metrics._widthTable = widthTable;
        metrics._ascent = 880;
        metrics._descent = -120;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'MSung-Light,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'MSung-Light,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'MSung-Light,Italic';
        }
        else {
            metrics._postScriptName = 'MSung-Light';
        }
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getSinoTypeSongLight = function (fontStyle, size) {
        var metrics = new _PdfFontMetrics();
        var widthTable = new _CjkWidthTable(1000);
        widthTable._add(new _CjkSameWidth(1, 95, 500));
        widthTable._add(new _CjkSameWidth(814, 939, 500));
        widthTable._add(new _CjkDifferentWidth(7712, [500]));
        widthTable._add(new _CjkDifferentWidth(7716, [500]));
        metrics._ascent = 880;
        metrics._descent = -120;
        metrics._size = size;
        metrics._height = metrics._ascent - metrics._descent;
        if ((fontStyle & PdfFontStyle.bold) !== 0 && (fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'STSong-Light,BoldItalic';
        }
        else if ((fontStyle & PdfFontStyle.bold) !== 0) {
            metrics._postScriptName = 'STSong-Light,Bold';
        }
        else if ((fontStyle & PdfFontStyle.italic) !== 0) {
            metrics._postScriptName = 'STSong-Light,Italic';
        }
        else {
            metrics._postScriptName = 'STSong-Light';
        }
        metrics._widthTable = widthTable;
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._getMetrics = function (fontFamily, fontStyle, size) {
        var metrics;
        switch (fontFamily) {
            case PdfCjkFontFamily.hanyangSystemsGothicMedium:
                metrics = this._getHanyangSystemsGothicMedium(fontStyle, size);
                metrics._name = 'HanyangSystemsGothicMedium';
                break;
            case PdfCjkFontFamily.hanyangSystemsShinMyeongJoMedium:
                metrics = this._getHanyangSystemsShinMyeongJoMedium(fontStyle, size);
                metrics._name = 'HanyangSystemsShinMyeongJoMedium';
                break;
            case PdfCjkFontFamily.heiseiKakuGothicW5:
                metrics = this._getHeiseiKakuGothicW5(fontStyle, size);
                metrics._name = 'HeiseiKakuGothicW5';
                break;
            case PdfCjkFontFamily.heiseiMinchoW3:
                metrics = this._getHeiseiMinchoW3(fontStyle, size);
                metrics._name = 'HeiseiMinchoW3';
                break;
            case PdfCjkFontFamily.monotypeHeiMedium:
                metrics = this._getMonotypeHeiMedium(fontStyle, size);
                metrics._name = 'MonotypeHeiMedium';
                break;
            case PdfCjkFontFamily.monotypeSungLight:
                metrics = this._getMonotypeSungLight(fontStyle, size);
                metrics._name = 'MonotypeSungLight';
                break;
            case PdfCjkFontFamily.sinoTypeSongLight:
                metrics = this._getSinoTypeSongLight(fontStyle, size);
                metrics._name = 'SinoTypeSongLight';
                break;
        }
        metrics._subScriptSizeFactor = this._subSuperScriptFactor;
        metrics._superscriptSizeFactor = this._subSuperScriptFactor;
        return metrics;
    };
    _PdfCjkStandardFontMetricsFactory._subSuperScriptFactor = 1.52;
    return _PdfCjkStandardFontMetricsFactory;
}());
export { _PdfCjkStandardFontMetricsFactory };
var _PdfCjkFontDescriptorFactory = /** @class */ (function () {
    function _PdfCjkFontDescriptorFactory() {
    }
    _PdfCjkFontDescriptorFactory._fillMonotypeSungLight = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: -160, y: -249, width: 1175, height: 1137 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 1000);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 880);
        fontDescriptor.set('XHeight', 616);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillHeiseiKakuGothicW5 = function (fontDescriptor, fontStyle, fontFamily, fontMetrics) {
        var fontBox = { x: -92, y: -250, width: 1102, height: 1172 };
        var fontBoxItalic = { x: -92, y: -250, width: 1102, height: 1932 };
        if ((fontStyle & (PdfFontStyle.italic | PdfFontStyle.bold)) !== PdfFontStyle.italic) {
            this._fillFontBox(fontDescriptor, fontBox);
        }
        else {
            this._fillFontBox(fontDescriptor, fontBoxItalic);
        }
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 689);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 718);
        fontDescriptor.set('XHeight', 500);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillHanyangSystemsShinMyeongJoMedium = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: 0, y: -148, width: 1001, height: 1028 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 1000);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 880);
        fontDescriptor.set('XHeight', 616);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillHeiseiMinchoW3 = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: -123, y: -257, width: 1124, height: 1167 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 702);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 718);
        fontDescriptor.set('XHeight', 500);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillSinoTypeSongLight = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: -25, y: -254, width: 1025, height: 1134 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 1000);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 880);
        fontDescriptor.set('XHeight', 616);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillMonotypeHeiMedium = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: -45, y: -250, width: 1060, height: 1137 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 1000);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 880);
        fontDescriptor.set('XHeight', 616);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillHanyangSystemsGothicMedium = function (fontDescriptor, fontFamily, fontMetrics) {
        var fontBox = { x: -6, y: -145, width: 1009, height: 1025 };
        this._fillFontBox(fontDescriptor, fontBox);
        this._fillKnownInformation(fontDescriptor, fontFamily, fontMetrics);
        fontDescriptor.set('Flags', 4);
        fontDescriptor.set('StemV', 93);
        fontDescriptor.set('StemH', 93);
        fontDescriptor.set('AvgWidth', 1000);
        fontDescriptor.set('MaxWidth', 1000);
        fontDescriptor.set('CapHeight', 880);
        fontDescriptor.set('XHeight', 616);
        fontDescriptor.set('Leading', 250);
    };
    _PdfCjkFontDescriptorFactory._fillFontBox = function (fontDescriptor, fontBox) {
        fontDescriptor.set('FontBBox', _fromRectangle(fontBox));
    };
    _PdfCjkFontDescriptorFactory._fillKnownInformation = function (fontDescriptor, fontFamily, fontMetrics) {
        fontDescriptor.set('FontName', _PdfName.get(fontMetrics._postScriptName));
        fontDescriptor.set('Type', _PdfName.get('FontDescriptor'));
        fontDescriptor.set('ItalicAngle', 0);
        fontDescriptor.set('MissingWidth', fontMetrics._widthTable._defaultWidth);
        fontDescriptor.set('Ascent', fontMetrics._ascent);
        fontDescriptor.set('Descent', fontMetrics._descent);
        switch (fontFamily) {
            case PdfCjkFontFamily.monotypeHeiMedium:
            case PdfCjkFontFamily.hanyangSystemsGothicMedium:
            case PdfCjkFontFamily.heiseiKakuGothicW5:
                fontDescriptor.set('Flags', 4);
                break;
            case PdfCjkFontFamily.sinoTypeSongLight:
            case PdfCjkFontFamily.monotypeSungLight:
            case PdfCjkFontFamily.hanyangSystemsShinMyeongJoMedium:
            case PdfCjkFontFamily.heiseiMinchoW3:
                fontDescriptor.set('Flags', 6);
                break;
        }
    };
    _PdfCjkFontDescriptorFactory._getFontDescriptor = function (fontFamily, fontStyle, fontMetrics) {
        var fontDescriptor = new _PdfDictionary();
        fontDescriptor._updated = true;
        switch (fontFamily) {
            case PdfCjkFontFamily.hanyangSystemsGothicMedium:
                this._fillHanyangSystemsGothicMedium(fontDescriptor, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.hanyangSystemsShinMyeongJoMedium:
                this._fillHanyangSystemsShinMyeongJoMedium(fontDescriptor, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.heiseiKakuGothicW5:
                this._fillHeiseiKakuGothicW5(fontDescriptor, fontStyle, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.heiseiMinchoW3:
                this._fillHeiseiMinchoW3(fontDescriptor, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.monotypeHeiMedium:
                this._fillMonotypeHeiMedium(fontDescriptor, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.monotypeSungLight:
                this._fillMonotypeSungLight(fontDescriptor, fontFamily, fontMetrics);
                break;
            case PdfCjkFontFamily.sinoTypeSongLight:
                this._fillSinoTypeSongLight(fontDescriptor, fontFamily, fontMetrics);
                break;
            default:
                break;
        }
        return fontDescriptor;
    };
    return _PdfCjkFontDescriptorFactory;
}());
export { _PdfCjkFontDescriptorFactory };
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
export var PdfFontStyle;
(function (PdfFontStyle) {
    /**
     * Specifies the font style `regular`.
     */
    PdfFontStyle[PdfFontStyle["regular"] = 0] = "regular";
    /**
     * Specifies the font style `bold`.
     */
    PdfFontStyle[PdfFontStyle["bold"] = 1] = "bold";
    /**
     * Specifies the font style `italic`.
     */
    PdfFontStyle[PdfFontStyle["italic"] = 2] = "italic";
    /**
     * Specifies the font style `underline`.
     */
    PdfFontStyle[PdfFontStyle["underline"] = 4] = "underline";
    /**
     * Specifies the font style `strikeout`.
     */
    PdfFontStyle[PdfFontStyle["strikeout"] = 8] = "strikeout";
})(PdfFontStyle || (PdfFontStyle = {}));
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
export var PdfFontFamily;
(function (PdfFontFamily) {
    /**
     * Specifies the `helvetica` font family.
     */
    PdfFontFamily[PdfFontFamily["helvetica"] = 0] = "helvetica";
    /**
     * Specifies the `courier` font family.
     */
    PdfFontFamily[PdfFontFamily["courier"] = 1] = "courier";
    /**
     * Specifies the `timesRoman` font family.
     */
    PdfFontFamily[PdfFontFamily["timesRoman"] = 2] = "timesRoman";
    /**
     * Specifies the `symbol` font family.
     */
    PdfFontFamily[PdfFontFamily["symbol"] = 3] = "symbol";
    /**
     * Specifies the `zapfDingbats` font family.
     */
    PdfFontFamily[PdfFontFamily["zapfDingbats"] = 4] = "zapfDingbats";
})(PdfFontFamily || (PdfFontFamily = {}));
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
export var PdfCjkFontFamily;
(function (PdfCjkFontFamily) {
    /**
     * Specifies the `heiseiKakuGothicW5` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["heiseiKakuGothicW5"] = 0] = "heiseiKakuGothicW5";
    /**
     * Specifies the `heiseiMinchoW3` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["heiseiMinchoW3"] = 1] = "heiseiMinchoW3";
    /**
     * Specifies the `hanyangSystemsGothicMedium` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["hanyangSystemsGothicMedium"] = 2] = "hanyangSystemsGothicMedium";
    /**
     * Specifies the `hanyangSystemsShinMyeongJoMedium` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["hanyangSystemsShinMyeongJoMedium"] = 3] = "hanyangSystemsShinMyeongJoMedium";
    /**
     * Specifies the `monotypeHeiMedium` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["monotypeHeiMedium"] = 4] = "monotypeHeiMedium";
    /**
     * Specifies the `monotypeSungLight` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["monotypeSungLight"] = 5] = "monotypeSungLight";
    /**
     * Specifies the `sinoTypeSongLight` CJK font family.
     */
    PdfCjkFontFamily[PdfCjkFontFamily["sinoTypeSongLight"] = 6] = "sinoTypeSongLight";
})(PdfCjkFontFamily || (PdfCjkFontFamily = {}));
var _UnicodeLine = /** @class */ (function () {
    function _UnicodeLine() {
        this._result = false;
        this._glyphIndex = [];
    }
    return _UnicodeLine;
}());
export { _UnicodeLine };
