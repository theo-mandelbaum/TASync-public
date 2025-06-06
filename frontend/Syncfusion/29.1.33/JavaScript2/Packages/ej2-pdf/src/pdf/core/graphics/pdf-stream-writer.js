import { _escapePdfName } from './../utils';
import { _PdfColorSpace } from '../enumerator';
var _PdfStreamWriter = /** @class */ (function () {
    function _PdfStreamWriter(stream) {
        this._newLine = '\r\n';
        this._whiteSpace = ' ';
        this._stream = stream;
    }
    _PdfStreamWriter.prototype._writeOperator = function (value) {
        this._stream.write(value);
        this._stream.write(this._newLine);
    };
    _PdfStreamWriter.prototype._saveGraphicsState = function () {
        this._writeOperator('q');
    };
    _PdfStreamWriter.prototype._restoreGraphicsState = function () {
        this._writeOperator('Q');
    };
    _PdfStreamWriter.prototype._writeComment = function (comment) {
        if (comment && comment.length > 0) {
            this._writeOperator('% ' + comment);
        }
    };
    _PdfStreamWriter.prototype._setGraphicsState = function (value) {
        this._stream.write("/" + _escapePdfName(value.name) + " ");
        this._writeOperator('gs');
    };
    _PdfStreamWriter.prototype._modifyCtm = function (matrix) {
        this._stream.write(matrix._toString() + " ");
        this._writeOperator('cm');
    };
    _PdfStreamWriter.prototype._modifyTM = function (matrix) {
        this._stream.write(matrix._toString() + " ");
        this._writeOperator('Tm');
    };
    _PdfStreamWriter.prototype._setColorSpace = function (value, arg2, arg3) {
        if (typeof value === 'string' && typeof arg2 === 'boolean') {
            this._stream.write("/" + value + " ");
            this._writeOperator(arg2 ? 'CS' : 'cs');
        }
        else if (Array.isArray(value) && typeof arg2 === 'number' && typeof arg3 === 'boolean') {
            var colorSpaceName = void 0;
            switch (arg2) {
                case _PdfColorSpace.rgb:
                    colorSpaceName = 'DeviceRGB';
                    break;
                case _PdfColorSpace.cmyk:
                    colorSpaceName = 'DeviceCMYK';
                    break;
                case _PdfColorSpace.grayScale:
                    colorSpaceName = 'DeviceGray';
                    break;
                default:
                    colorSpaceName = 'DeviceRGB';
                    break;
            }
            this._stream.write("/" + colorSpaceName + " ");
            this._writeOperator(arg3 ? 'CS' : 'cs');
            this._setColor(value, arg3);
        }
    };
    _PdfStreamWriter.prototype._setColor = function (color, forStroking) {
        this._stream.write((color[0] / 255).toFixed(3) + " " + (color[1] / 255).toFixed(3) + " " + (color[2] / 255).toFixed(3) + " ");
        this._writeOperator(forStroking ? 'RG' : 'rg');
    };
    _PdfStreamWriter.prototype._appendRectangle = function (x, y, width, height) {
        this._writePoint(x, y);
        this._writePoint(width, height);
        this._writeOperator('re');
    };
    _PdfStreamWriter.prototype._writePoint = function (x, y) {
        this._stream.write(x.toFixed(3) + " " + (-y).toFixed(3) + " ");
    };
    _PdfStreamWriter.prototype._clipPath = function (isEvenOdd) {
        this._stream.write((isEvenOdd ? 'W*' : 'W') + " n" + this._newLine);
    };
    _PdfStreamWriter.prototype._fillPath = function (isEvenOdd) {
        this._writeOperator(isEvenOdd ? 'f*' : 'f');
    };
    _PdfStreamWriter.prototype._closeFillPath = function (isEvenOdd) {
        this._writeOperator('h');
        this._fillPath(isEvenOdd);
    };
    _PdfStreamWriter.prototype._strokePath = function () {
        this._writeOperator('S');
    };
    _PdfStreamWriter.prototype._closeStrokePath = function () {
        this._writeOperator('s');
    };
    _PdfStreamWriter.prototype._fillStrokePath = function (isEvenOdd) {
        this._writeOperator(isEvenOdd ? 'B*' : 'B');
    };
    _PdfStreamWriter.prototype._closeFillStrokePath = function (isEvenOdd) {
        this._writeOperator(isEvenOdd ? 'b*' : 'b');
    };
    _PdfStreamWriter.prototype._endPath = function () {
        this._writeOperator('n');
    };
    _PdfStreamWriter.prototype._setFont = function (name, size) {
        this._stream.write("/" + name + " " + size.toFixed(3) + " ");
        this._writeOperator('Tf');
    };
    _PdfStreamWriter.prototype._setTextScaling = function (textScaling) {
        this._stream.write(textScaling.toFixed(3) + " ");
        this._writeOperator('Tz');
    };
    _PdfStreamWriter.prototype._closePath = function () {
        this._writeOperator('h');
    };
    _PdfStreamWriter.prototype._startNextLine = function (x, y) {
        if (typeof x === 'undefined') {
            this._writeOperator('T*');
        }
        else {
            this._writePoint(x, y);
            this._writeOperator('Td');
        }
    };
    _PdfStreamWriter.prototype._setLeading = function (leading) {
        this._write(leading.toFixed(3) + " ");
        this._write(this._whiteSpace);
        this._writeOperator('TL');
    };
    _PdfStreamWriter.prototype._showText = function (text) {
        this._writeText(text);
        this._writeOperator('Tj');
    };
    _PdfStreamWriter.prototype._write = function (string) {
        var builder = '';
        builder += string;
        builder += '\r\n';
        this._writeOperator(builder);
    };
    _PdfStreamWriter.prototype._writeText = function (text) {
        var result = '';
        var data = this._escapeSymbols(text);
        for (var i = 0; i < data.length; i++) {
            result += String.fromCharCode(data[i]); // eslint-disable-line
        }
        result = '(' + result + ')';
        this._stream.write(result);
    };
    _PdfStreamWriter.prototype._beginText = function () {
        this._writeOperator('BT');
    };
    _PdfStreamWriter.prototype._endText = function () {
        this._writeOperator('ET');
    };
    _PdfStreamWriter.prototype._beginPath = function (x, y) {
        this._writePoint(x, y);
        this._writeOperator('m');
    };
    _PdfStreamWriter.prototype._appendLineSegment = function (x, y) {
        this._writePoint(x, y);
        this._writeOperator('l');
    };
    _PdfStreamWriter.prototype._appendBezierSegment = function (x1, y1, x2, y2, x3, y3) {
        this._writePoint(x1, y1);
        this._writePoint(x2, y2);
        this._writePoint(x3, y3);
        this._writeOperator('c');
    };
    _PdfStreamWriter.prototype._setTextRenderingMode = function (renderingMode) {
        this._stream.write(renderingMode.toString() + " ");
        this._writeOperator('Tr');
    };
    _PdfStreamWriter.prototype._setCharacterSpacing = function (charSpacing) {
        this._stream.write(charSpacing.toFixed(3) + " ");
        this._writeOperator('Tc');
    };
    _PdfStreamWriter.prototype._setWordSpacing = function (wordSpacing) {
        this._stream.write(wordSpacing.toFixed(3) + " ");
        this._writeOperator('Tw');
    };
    _PdfStreamWriter.prototype._showNextLineText = function (text, unicode) {
        if (unicode !== null && typeof unicode !== 'undefined' && unicode) {
            this._writeText(text);
            this._writeOperator('\'');
        }
        else {
            this._stream.write(text);
            this._writeOperator('\'');
        }
    };
    _PdfStreamWriter.prototype._setLineDashPattern = function (pattern, patternOffset) {
        var tempPattern = '[';
        if (pattern.length > 1) {
            for (var index = 0; index < pattern.length; index++) {
                if (index === pattern.length - 1) {
                    tempPattern += pattern[index].toString(); // eslint-disable-line
                }
                else {
                    tempPattern += pattern[index].toString() + ' '; // eslint-disable-line
                }
            }
        }
        tempPattern += '] ';
        tempPattern += patternOffset.toString();
        tempPattern += ' d';
        this._writeOperator(tempPattern);
    };
    _PdfStreamWriter.prototype._setMiterLimit = function (miterLimit) {
        this._stream.write(miterLimit.toFixed(3) + " ");
        this._writeOperator('M');
    };
    _PdfStreamWriter.prototype._setLineWidth = function (width) {
        this._stream.write(width.toFixed(3) + " ");
        this._writeOperator('w');
    };
    _PdfStreamWriter.prototype._setLineCap = function (lineCapStyle) {
        this._stream.write(lineCapStyle + " ");
        this._writeOperator('J');
    };
    _PdfStreamWriter.prototype._setLineJoin = function (lineJoinStyle) {
        this._stream.write(lineJoinStyle + " ");
        this._writeOperator('j');
    };
    _PdfStreamWriter.prototype._executeObject = function (name) {
        this._stream.write("/" + name.name + " ");
        this._writeOperator('Do');
    };
    _PdfStreamWriter.prototype._beginMarkupSequence = function (name) {
        this._stream.write("/" + name + " ");
        this._writeOperator('BMC');
    };
    _PdfStreamWriter.prototype._endMarkupSequence = function () {
        this._writeOperator('EMC');
    };
    _PdfStreamWriter.prototype._clear = function () {
        this._stream._bytes = [];
    };
    _PdfStreamWriter.prototype._escapeSymbols = function (value) {
        var data = [];
        for (var i = 0; i < value.length; i++) {
            var currentData = value.charCodeAt(i);
            switch (currentData) {
                case 40:
                case 41:
                    data.push(92);
                    data.push(currentData);
                    break;
                case 13:
                    data.push(92);
                    data.push(114);
                    break;
                case 92:
                    data.push(92);
                    data.push(currentData);
                    break;
                default:
                    data.push(currentData);
                    break;
            }
        }
        return data;
    };
    return _PdfStreamWriter;
}());
export { _PdfStreamWriter };
