import { _PdfWordWrapType } from './../enumerator';
var _PdfStringLayouter = /** @class */ (function () {
    function _PdfStringLayouter() {
    }
    _PdfStringLayouter.prototype._layout = function (text, font, format, size) {
        this._initialize(text, font, format, size);
        var result = this._doLayout();
        this._clear();
        return result;
    };
    _PdfStringLayouter.prototype._initialize = function (text, font, format, size) {
        this._font = font;
        this._format = format;
        this._size = size;
        this._rectangle = [0, 0, size[0], size[1]];
        this._reader = new _StringTokenizer(text);
        this._pageHeight = 0;
    };
    _PdfStringLayouter.prototype._clear = function () {
        this._font = null;
        this._format = null;
        this._reader._close();
        this._reader = null;
    };
    _PdfStringLayouter.prototype._doLayout = function () {
        var result = new _PdfStringLayoutResult();
        var lineResult = new _PdfStringLayoutResult();
        var lines = [];
        var line = this._reader._peekLine();
        var lineIndent = this._getLineIndent(true);
        while (line !== null) {
            lineResult = this._layoutLine(line, lineIndent);
            if (typeof lineResult !== 'undefined' && lineResult !== null) {
                var numSymbolsInserted = 0;
                var returnedValue = this._copyToResult(result, lineResult, lines, numSymbolsInserted);
                var success = returnedValue.success;
                numSymbolsInserted = returnedValue.flag;
                if (!success) {
                    this._reader._read(numSymbolsInserted);
                    break;
                }
            }
            this._reader._readLine();
            line = this._reader._peekLine();
            lineIndent = this._getLineIndent(false);
        }
        this._finalizeResult(result, lines);
        return result;
    };
    _PdfStringLayouter.prototype._getLineIndent = function (firstLine) {
        var lineIndent = 0;
        if (this._format) {
            lineIndent = (firstLine) ? this._format.firstLineIndent : this._format.paragraphIndent;
            lineIndent = (this._size[0] > 0) ? Math.min(this._size[0], lineIndent) : lineIndent;
        }
        return lineIndent;
    };
    _PdfStringLayouter.prototype._getLineHeight = function () {
        var height = this._font._metrics._getHeight();
        if (this._format && this._format.lineSpacing !== 0) {
            height = this._format.lineSpacing + this._font._metrics._getHeight();
        }
        return height;
    };
    _PdfStringLayouter.prototype._getLineWidth = function (line) {
        return this._font.getLineWidth(line, this._format);
    };
    _PdfStringLayouter.prototype._layoutLine = function (line, lineIndent) {
        var lineResult = new _PdfStringLayoutResult();
        lineResult._lineHeight = this._getLineHeight();
        var lines = [];
        var maxWidth = this._size[0];
        var lineWidth = this._getLineWidth(line) + lineIndent;
        var lineType = _LineType.firstParagraphLine;
        var readWord = true;
        if (maxWidth <= 0 || Math.round(lineWidth) <= Math.round(maxWidth)) {
            this._addToLineResult(lineResult, lines, line, lineWidth, _LineType.newLineBreak | lineType);
        }
        else {
            var builder = '';
            var curLine = '';
            lineWidth = lineIndent;
            var curIndent = lineIndent;
            var reader = new _StringTokenizer(line);
            var word = reader._peekWord();
            if (word.length !== reader._length) {
                if (word === ' ') {
                    curLine = curLine + word;
                    builder = builder + word;
                    reader._position += 1;
                    word = reader._peekWord();
                }
            }
            while (word !== null) {
                curLine = curLine + word;
                var curLineWidth = this._getLineWidth(curLine.toString()) + curIndent;
                if (curLine.toString() === ' ') {
                    curLine = '';
                    curLineWidth = 0;
                }
                if (curLineWidth > maxWidth) {
                    if (this._getWrapType() === _PdfWordWrapType.none) {
                        break;
                    }
                    if (curLine.length === word.length) {
                        if (this._getWrapType() === _PdfWordWrapType.wordOnly) {
                            lineResult._remainder = line.substring(reader._position);
                            break;
                        }
                        else if (curLine.length === 1) {
                            builder = builder + word;
                            break;
                        }
                        else {
                            readWord = false;
                            curLine = '';
                            word = reader._peek().toString();
                            continue;
                        }
                    }
                    else {
                        if (this._getLineWidth(word.toString()) > maxWidth) {
                            if (typeof this._format !== 'undefined' && this._format !== null) {
                                this._format._wordWrap = _PdfWordWrapType.character;
                            }
                        }
                        else {
                            if (typeof this._format !== 'undefined' && this._format !== null) {
                                this._format._wordWrap = _PdfWordWrapType.word;
                            }
                        }
                        if (this._getWrapType() !== _PdfWordWrapType.character || !readWord) {
                            var stringValue = builder.toString();
                            if (stringValue !== ' ') {
                                this._addToLineResult(lineResult, lines, stringValue, lineWidth, _LineType.layoutBreak | lineType);
                            }
                            curLine = '';
                            builder = '';
                            lineWidth = 0;
                            curIndent = 0;
                            curLineWidth = 0;
                            lineType = _LineType.none;
                            word = (readWord) ? word : reader._peekWord();
                            readWord = true;
                        }
                        else {
                            readWord = false;
                            curLine = '';
                            curLine = curLine + builder.toString();
                            word = reader._peek().toString();
                        }
                        continue;
                    }
                }
                builder = builder + word;
                lineWidth = curLineWidth;
                if (readWord) {
                    reader._readWord();
                    word = reader._peekWord();
                }
                else {
                    reader._read();
                    word = reader._peek().toString();
                }
            }
            if (builder.length > 0) {
                this._addToLineResult(lineResult, lines, builder.toString(), lineWidth, _LineType.newLineBreak | _LineType.lastParagraphLine);
            }
            reader._close();
        }
        lineResult._layoutLines = [];
        for (var index = 0; index < lines.length; index++) {
            lineResult._layoutLines.push(lines[index]); // eslint-disable-line
        }
        lines = [];
        return lineResult;
    };
    _PdfStringLayouter.prototype._addToLineResult = function (lineResult, lines, line, lineWidth, breakType) {
        var info = new _LineInfo();
        info._text = line;
        info._width = lineWidth;
        info._lineType = breakType;
        lines.push(info);
        var size = lineResult._actualSize;
        size[1] = size[1] + this._getLineHeight();
        size[0] = Math.max(size[0], lineWidth);
        lineResult._size = size;
    };
    _PdfStringLayouter.prototype._copyToResult = function (result, lineResult, lines, flag) {
        var success = true;
        var allowPartialLines = (this._format && !this._format.lineLimit);
        var height = result._actualSize[1];
        var maxHeight = this._size[1];
        if ((this._pageHeight > 0) && (maxHeight + this._rectangle[1] > this._pageHeight)) {
            maxHeight = this._rectangle[1] - this._pageHeight;
            maxHeight = Math.max(maxHeight, -maxHeight);
        }
        flag = 0;
        if (lineResult._lines !== null) {
            for (var i = 0, len = lineResult._lines.length; i < len; i++) {
                var expHeight = height + lineResult._lineHeight;
                if (expHeight <= maxHeight || maxHeight <= 0 || allowPartialLines) {
                    var info = lineResult._lines[i]; // eslint-disable-line
                    flag += info._text.length;
                    info = this._trimLine(info, (lines.length === 0));
                    lines.push(info);
                    var size = result._actualSize;
                    size[0] = Math.max(size[0], info._width);
                    result._size = size;
                    height = expHeight;
                }
                else {
                    success = false;
                    break;
                }
            }
        }
        if (height !== result._size[1]) {
            result._size = [result._actualSize[0], height];
        }
        return { success: success, flag: flag };
    };
    _PdfStringLayouter.prototype._finalizeResult = function (result, lines) {
        result._layoutLines = [];
        for (var index = 0; index < lines.length; index++) {
            result._layoutLines.push(lines[index]); // eslint-disable-line
        }
        result._lineHeight = this._getLineHeight();
        if (!this._reader._end) {
            result._remainder = this._reader._readToEnd();
        }
        lines = [];
    };
    _PdfStringLayouter.prototype._trimLine = function (info, firstLine) {
        var line = info._text.trim();
        var lineWidth = info._width;
        if (line.length !== info._text.length) {
            lineWidth = this._getLineWidth(line);
            if ((info._lineType & _LineType.firstParagraphLine) > 0) {
                lineWidth += this._getLineIndent(firstLine);
            }
        }
        info._text = line;
        info._width = lineWidth;
        return info;
    };
    _PdfStringLayouter.prototype._getWrapType = function () {
        var wrapType = (this._format !== null && typeof this._format !== 'undefined') ?
            this._format._wordWrap : _PdfWordWrapType.word;
        return wrapType;
    };
    return _PdfStringLayouter;
}());
export { _PdfStringLayouter };
var _PdfStringLayoutResult = /** @class */ (function () {
    function _PdfStringLayoutResult() {
    }
    Object.defineProperty(_PdfStringLayoutResult.prototype, "_actualSize", {
        get: function () {
            if (typeof this._size === 'undefined') {
                this._size = [0, 0];
            }
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStringLayoutResult.prototype, "_lines", {
        get: function () {
            return this._layoutLines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStringLayoutResult.prototype, "_empty", {
        get: function () {
            return (this._layoutLines === null || this._layoutLines.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStringLayoutResult.prototype, "_lineCount", {
        get: function () {
            return (!this._empty) ? this._layoutLines.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    return _PdfStringLayoutResult;
}());
export { _PdfStringLayoutResult };
var _LineInfo = /** @class */ (function () {
    function _LineInfo() {
    }
    return _LineInfo;
}());
export { _LineInfo };
export var _LineType;
(function (_LineType) {
    _LineType[_LineType["none"] = 0] = "none";
    _LineType[_LineType["newLineBreak"] = 1] = "newLineBreak";
    _LineType[_LineType["layoutBreak"] = 2] = "layoutBreak";
    _LineType[_LineType["firstParagraphLine"] = 4] = "firstParagraphLine";
    _LineType[_LineType["lastParagraphLine"] = 8] = "lastParagraphLine";
})(_LineType || (_LineType = {}));
var _StringTokenizer = /** @class */ (function () {
    function _StringTokenizer(textValue) {
        this._position = 0;
        if (typeof textValue === 'undefined' || textValue === null) {
            throw new Error('ArgumentNullException:text');
        }
        this._text = textValue;
    }
    Object.defineProperty(_StringTokenizer.prototype, "_length", {
        get: function () {
            return this._text.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_StringTokenizer.prototype, "_end", {
        get: function () {
            return (this._position === this._text.length);
        },
        enumerable: true,
        configurable: true
    });
    _StringTokenizer.prototype._readLine = function () {
        var position = this._position;
        while (position < this._length) {
            var ch = this._text[position]; // eslint-disable-line
            var text = void 0;
            switch (ch) {
                case '\r':
                case '\n':
                    text = this._text.substring(this._position, position);
                    this._position = position + 1;
                    if (((ch === '\r') && (this._position < this._length)) && (this._text[this._position] === '\n')) {
                        this._position++;
                    }
                    return text;
            }
            position++;
        }
        if (position > this._position) {
            var text2 = this._text.substring(this._position, position);
            this._position = position;
            return text2;
        }
        return null;
    };
    _StringTokenizer.prototype._peekLine = function () {
        var position = this._position;
        var line = this._readLine();
        this._position = position;
        return line;
    };
    _StringTokenizer.prototype._readWord = function () {
        var position = this._position;
        while (position < this._length) {
            var ch = this._text[position]; // eslint-disable-line
            var text = void 0;
            switch (ch) {
                case '\r':
                case '\n':
                    text = this._text.substring(this._position, position - this._position);
                    this._position = position + 1;
                    if (((ch === '\r') && (this._position < this._length)) && (this._text[this._position] === '\n')) {
                        this._position++;
                    }
                    return text;
                case ' ':
                case '\t':
                    if (position === this._position) {
                        position++;
                    }
                    text = this._text.substring(this._position, position);
                    this._position = position;
                    return text;
            }
            position++;
        }
        if (position > this._position) {
            var text2 = this._text.substring(this._position, position);
            this._position = position;
            return text2;
        }
        return null;
    };
    _StringTokenizer.prototype._peekWord = function () {
        var position = this._position;
        var word = this._readWord();
        this._position = position;
        return word;
    };
    _StringTokenizer.prototype._read = function (count) {
        if (typeof count === 'undefined') {
            var character = '0';
            if (!this._end) {
                character = this._text[this._position];
                this._position++;
            }
            return character;
        }
        else {
            var value = 0;
            var builder = '';
            while (!this._end && value < count) {
                builder += this._read();
                value++;
            }
            return builder;
        }
    };
    _StringTokenizer.prototype._peek = function () {
        return this._end ? '0' : this._text[this._position];
    };
    _StringTokenizer.prototype._close = function () {
        this._text = null;
    };
    _StringTokenizer.prototype._readToEnd = function () {
        var text;
        if (this._position === 0) {
            text = this._text;
        }
        else {
            text = this._text.substring(this._position);
        }
        this._position = this._length;
        return text;
    };
    _StringTokenizer._whiteSpace = ' ';
    _StringTokenizer._tab = '\t';
    _StringTokenizer._spaces = [_StringTokenizer._whiteSpace, _StringTokenizer._tab];
    return _StringTokenizer;
}());
export { _StringTokenizer };
