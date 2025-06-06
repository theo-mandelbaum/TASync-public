import { _PdfCommand, _PdfName, _PdfDictionary, _isCommand, _PdfReference, _isName } from './pdf-primitives';
import { _isWhiteSpace, FormatError, ParserEndOfFileException, _decodeText } from './utils';
import { _PdfNullStream } from './base-stream';
import { PdfPredictorStream } from './predictor-stream';
import { _PdfFlateStream } from './flate-stream';
import { _CipherTransform } from './security/encryptor';
var maxCacheLength = 1000;
var maxNumberLength = 5552;
var endOfFile = 'EOF';
var specialChars = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var _PdfLexicalOperator = /** @class */ (function () {
    function _PdfLexicalOperator(stream) {
        this.stream = stream;
        this.nextChar();
        this.stringBuffer = [];
        this._hexStringNumber = 0;
        this.beginInlineImagePosition = -1;
    }
    _PdfLexicalOperator.prototype.nextChar = function () {
        return (this.currentChar = this.stream.getByte());
    };
    _PdfLexicalOperator.prototype.peekChar = function () {
        return this.stream.peekByte();
    };
    _PdfLexicalOperator.prototype.getNumber = function () {
        var ch = this.currentChar;
        var eNotation = false;
        var divideBy = 0;
        var sign = 0;
        if (ch === 0x2d) {
            sign = -1;
            ch = this.nextChar();
            if (ch === 0x2d) {
                ch = this.nextChar();
            }
        }
        else if (ch === 0x2b) {
            sign = 1;
            ch = this.nextChar();
        }
        if (ch === 0x0a || ch === 0x0d) {
            do {
                ch = this.nextChar();
            } while (ch === 0x0a || ch === 0x0d);
        }
        if (ch === 0x2e) {
            divideBy = 10;
            ch = this.nextChar();
        }
        if (ch < 0x30 || ch > 0x39) {
            if (_isWhiteSpace(ch) || ch === -1) {
                if (divideBy === 10 && sign === 0) {
                    return 0;
                }
                if (divideBy === 0 && sign === -1) {
                    return 0;
                }
            }
            throw new FormatError("Invalid number: " + String.fromCharCode(ch) + " (charCode " + ch + ")");
        }
        sign = sign || 1;
        var baseValue = ch - 0x30;
        var powerValue = 0;
        var powerValueSign = 1;
        ch = this.nextChar();
        while (ch >= 0) {
            if (ch >= 0x30 && ch <= 0x39) {
                var currentDigit = ch - 0x30;
                if (eNotation) {
                    powerValue = powerValue * 10 + currentDigit;
                }
                else {
                    if (divideBy !== 0) {
                        divideBy *= 10;
                    }
                    baseValue = baseValue * 10 + currentDigit;
                }
            }
            else if (ch === 0x2e) {
                if (divideBy === 0) {
                    divideBy = 1;
                }
                else {
                    break;
                }
            }
            else if (ch === 0x2d) {
                ch = this.nextChar();
                continue;
            }
            else if (ch === 0x45 || ch === 0x65) {
                ch = this.peekChar();
                if (ch === 0x2b || ch === 0x2d) {
                    powerValueSign = ch === 0x2d ? -1 : 1;
                    this.nextChar();
                }
                else if (ch < 0x30 || ch > 0x39) {
                    break;
                }
                eNotation = true;
            }
            else {
                break;
            }
            ch = this.nextChar();
        }
        if (divideBy !== 0) {
            baseValue /= divideBy;
        }
        if (eNotation) {
            baseValue *= Math.pow(10, (powerValueSign * powerValue));
        }
        return sign * baseValue;
    };
    _PdfLexicalOperator.prototype.getString = function () {
        var numParen = 1;
        var done = false;
        var stringBuffer = this.stringBuffer;
        stringBuffer.length = 0;
        var ch = this.nextChar();
        while (true) { // eslint-disable-line
            var charBuffered = false;
            switch (ch | 0) {
                case -1:
                    done = true;
                    break;
                case 0x28:
                    ++numParen;
                    stringBuffer.push('(');
                    break;
                case 0x29:
                    if (--numParen === 0) {
                        this.nextChar();
                        done = true;
                    }
                    else {
                        stringBuffer.push(')');
                    }
                    break;
                case 0x5c:
                    ch = this.nextChar();
                    switch (ch) {
                        case -1:
                            done = true;
                            break;
                        case 0x6e:
                            stringBuffer.push('\n');
                            break;
                        case 0x72:
                            stringBuffer.push('\r');
                            break;
                        case 0x74:
                            stringBuffer.push('\t');
                            break;
                        case 0x62:
                            stringBuffer.push('\b');
                            break;
                        case 0x66:
                            stringBuffer.push('\f');
                            break;
                        case 0x5c:
                        case 0x28:
                        case 0x29:
                            stringBuffer.push(String.fromCharCode(ch));
                            break;
                        case 0x30:
                        case 0x31:
                        case 0x32:
                        case 0x33:
                        case 0x34:
                        case 0x35:
                        case 0x36:
                        case 0x37:
                            var x = ch & 0x0f; // eslint-disable-line
                            ch = this.nextChar();
                            charBuffered = true;
                            if (ch >= 0x30 && ch <= 0x37) {
                                x = (x << 3) + (ch & 0x0f);
                                ch = this.nextChar();
                                if (ch >= 0x30 && ch <= 0x37) {
                                    charBuffered = false;
                                    x = (x << 3) + (ch & 0x0f);
                                }
                            }
                            stringBuffer.push(String.fromCharCode(x));
                            break;
                        case 0x0d:
                            if (this.peekChar() === 0x0a) {
                                this.nextChar();
                            }
                            break;
                        case 0x0a:
                            break;
                        default:
                            stringBuffer.push(String.fromCharCode(ch));
                            break;
                    }
                    break;
                default:
                    stringBuffer.push(String.fromCharCode(ch));
                    break;
            }
            if (done) {
                break;
            }
            if (!charBuffered) {
                ch = this.nextChar();
            }
        }
        return stringBuffer.join('');
    };
    _PdfLexicalOperator.prototype.getName = function () {
        var ch;
        var previousCh;
        var stringBuffer = this.stringBuffer;
        stringBuffer.length = 0;
        ch = this.nextChar();
        while (ch >= 0 && !specialChars[ch]) { // eslint-disable-line
            if (ch === 0x23) {
                ch = this.nextChar();
                if (specialChars[ch]) { // eslint-disable-line
                    stringBuffer.push('#');
                    break;
                }
                var x = this._toHexDigit(ch);
                if (x !== -1) {
                    previousCh = ch;
                    ch = this.nextChar();
                    var x2 = this._toHexDigit(ch);
                    if (x2 === -1) {
                        stringBuffer.push('#', String.fromCharCode(previousCh));
                        if (specialChars[ch]) { // eslint-disable-line
                            break;
                        }
                        stringBuffer.push(String.fromCharCode(ch));
                        ch = this.nextChar();
                        continue;
                    }
                    stringBuffer.push(String.fromCharCode((x << 4) | x2));
                }
                else {
                    stringBuffer.push('#', String.fromCharCode(ch));
                }
            }
            else {
                stringBuffer.push(String.fromCharCode(ch));
            }
            ch = this.nextChar();
        }
        return _PdfName.get(stringBuffer.join(''));
    };
    _PdfLexicalOperator.prototype.getHexString = function () {
        var stringBuffer = this.stringBuffer;
        stringBuffer.length = 0;
        var ch = this.currentChar;
        var isFirstHex = true;
        var firstDigit;
        var secondDigit;
        this._hexStringNumber = 0;
        while (true) { // eslint-disable-line
            if (ch < 0) {
                break;
            }
            else if (ch === 0x3e) {
                this.nextChar();
                break;
            }
            else if (specialChars[ch] === 1) { // eslint-disable-line
                ch = this.nextChar();
                continue;
            }
            else {
                if (isFirstHex) {
                    firstDigit = this._toHexDigit(ch);
                    if (firstDigit === -1) {
                        ch = this.nextChar();
                        continue;
                    }
                }
                else {
                    secondDigit = this._toHexDigit(ch);
                    if (secondDigit === -1) {
                        ch = this.nextChar();
                        continue;
                    }
                    stringBuffer.push(String.fromCharCode((firstDigit << 4) | secondDigit));
                }
                isFirstHex = !isFirstHex;
                ch = this.nextChar();
            }
        }
        return stringBuffer.join('');
    };
    _PdfLexicalOperator.prototype.getObject = function () {
        var comment = false;
        var ch = this.currentChar;
        while (true) { // eslint-disable-line
            if (ch < 0) {
                return endOfFile;
            }
            if (comment) {
                if (ch === 0x0a || ch === 0x0d) {
                    comment = false;
                }
            }
            else if (ch === 0x25) {
                comment = true;
            }
            else if (specialChars[ch] !== 1) { // eslint-disable-line
                break;
            }
            ch = this.nextChar();
        }
        switch (ch | 0) {
            case 0x30:
            case 0x31:
            case 0x32:
            case 0x33:
            case 0x34:
            case 0x35:
            case 0x36:
            case 0x37:
            case 0x38:
            case 0x39:
            case 0x2b:
            case 0x2d:
            case 0x2e:
                return this.getNumber();
            case 0x28:
                return this.getString();
            case 0x2f:
                return this.getName();
            case 0x5b:
                this.nextChar();
                return _PdfCommand.get('[');
            case 0x5d:
                this.nextChar();
                return _PdfCommand.get(']');
            case 0x3c:
                ch = this.nextChar();
                if (ch === 0x3c) {
                    this.nextChar();
                    return _PdfCommand.get('<<');
                }
                return this.getHexString();
            case 0x3e:
                ch = this.nextChar();
                if (ch === 0x3e) {
                    this.nextChar();
                    return _PdfCommand.get('>>');
                }
                return _PdfCommand.get('>');
            case 0x7b:
                this.nextChar();
                return _PdfCommand.get('{');
            case 0x7d:
                this.nextChar();
                return _PdfCommand.get('}');
            case 0x29:
                this.nextChar();
                throw new FormatError("Illegal character: " + ch);
        }
        var str = String.fromCharCode(ch);
        if (ch < 0x20 || ch > 0x7f) {
            var nextCh = this.peekChar();
            if (nextCh >= 0x20 && nextCh <= 0x7f) {
                this.nextChar();
                return _PdfCommand.get(str);
            }
        }
        ch = this.nextChar();
        while (ch >= 0 && !specialChars[ch]) { // eslint-disable-line
            var possibleCommand = str + String.fromCharCode(ch);
            if (str.length === 128) {
                throw new FormatError("Command token too long: " + str.length);
            }
            str = possibleCommand;
            ch = this.nextChar();
        }
        if (str === 'true') {
            return true;
        }
        if (str === 'false') {
            return false;
        }
        if (str === 'null') {
            return null;
        }
        if (str === 'BI') {
            this.beginInlineImagePosition = this.stream.position;
        }
        return _PdfCommand.get(str);
    };
    _PdfLexicalOperator.prototype.peekObj = function () {
        var streamPos = this.stream.position;
        var currentChar = this.currentChar;
        var beginInlineImagePosition = this.beginInlineImagePosition;
        var nextObj; // eslint-disable-line
        try {
            nextObj = this.getObject();
        }
        catch (ex) { } // eslint-disable-line
        this.stream.position = streamPos;
        this.currentChar = currentChar;
        this.beginInlineImagePosition = beginInlineImagePosition;
        return nextObj;
    };
    _PdfLexicalOperator.prototype.skipToNextLine = function () {
        var ch = this.currentChar;
        while (ch >= 0) {
            if (ch === 0x0d) {
                ch = this.nextChar();
                if (ch === 0x0a) {
                    this.nextChar();
                }
                break;
            }
            else if (ch === 0x0a) {
                this.nextChar();
                break;
            }
            ch = this.nextChar();
        }
    };
    _PdfLexicalOperator.prototype._toHexDigit = function (ch) {
        if (ch >= 0x30 && ch <= 0x39) {
            return ch & 0x0f;
        }
        if ((ch >= 0x41 && ch <= 0x46) || (ch >= 0x61 && ch <= 0x66)) {
            return (ch & 0x0f) + 9;
        }
        return -1;
    };
    return _PdfLexicalOperator;
}());
export { _PdfLexicalOperator };
var _PdfParser = /** @class */ (function () {
    function _PdfParser(lexicalOperator, xref, allowStreams, recoveryMode, encryptor) {
        if (allowStreams === void 0) { allowStreams = false; }
        if (recoveryMode === void 0) { recoveryMode = false; }
        this._isColorSpace = false;
        this._isPassword = false;
        this.lexicalOperator = lexicalOperator;
        this.xref = xref;
        this.allowStreams = allowStreams;
        this.recoveryMode = recoveryMode;
        this.imageCache = new Map();
        this._encryptor = encryptor;
        this.refill();
    }
    _PdfParser.prototype.refill = function () {
        this.first = this.lexicalOperator.getObject();
        this.second = this.lexicalOperator.getObject();
    };
    _PdfParser.prototype.shift = function () {
        if (this.second instanceof _PdfCommand && this.second.command === 'ID') {
            this.first = this.second;
            this.second = null;
        }
        else {
            this.first = this.second;
            this.second = this.lexicalOperator.getObject();
        }
    };
    _PdfParser.prototype.tryShift = function () {
        try {
            this.shift();
            return true;
        }
        catch (e) {
            return false;
        }
    };
    _PdfParser.prototype.getObject = function (arguement1, arguement2, arguement3) {
        var cipherTransform;
        var first = this.first; // eslint-disable-line
        this.shift();
        if (first instanceof _PdfCommand) {
            switch (first.command) {
                case 'BI':
                    if (typeof arguement1 === 'number' && typeof arguement2 === 'number') {
                        return this.makeInlineImage(arguement1, arguement2, arguement3);
                    }
                    else if (arguement1 instanceof _CipherTransform) {
                        return this.makeInlineImage(arguement1);
                    }
                    else {
                        return this.makeInlineImage();
                    }
                case '[':
                    var array = []; // eslint-disable-line
                    while (!_isCommand(this.first, ']') && this.first !== endOfFile) {
                        var entry = void 0; // eslint-disable-line
                        if (typeof arguement1 === 'number' && typeof arguement2 === 'number') {
                            cipherTransform = this._encryptor._createCipherTransform(arguement1, arguement2);
                            entry = this.getObject(arguement1, arguement2, arguement3);
                        }
                        else if (arguement1 instanceof _CipherTransform) {
                            cipherTransform = arguement1;
                            entry = this.getObject(arguement1);
                        }
                        else {
                            entry = this.getObject(arguement1);
                        }
                        if (array.length === 0 && _isName(entry, 'Indexed')) {
                            this._isColorSpace = true;
                        }
                        entry = _decodeText(entry, this._isColorSpace, this._isPassword);
                        array.push(entry);
                    }
                    if (this.first === endOfFile) {
                        if (this.recoveryMode) {
                            return array;
                        }
                        throw new ParserEndOfFileException('End of file inside array.');
                    }
                    this._isColorSpace = false;
                    this.shift();
                    return array;
                case '<<':
                    var dictionary = new _PdfDictionary(this.xref); // eslint-disable-line
                    while (!_isCommand(this.first, '>>') && this.first !== endOfFile) {
                        if (!(this.first instanceof _PdfName)) {
                            this.shift();
                            continue;
                        }
                        var key = this.first.name;
                        if (key === 'U' || key === 'O' || key === 'ID') {
                            this._isPassword = true;
                        }
                        this.shift();
                        var isEnd = this._checkEnd();
                        if (isEnd) {
                            break;
                        }
                        if (typeof arguement1 === 'number' && typeof arguement2 === 'number') {
                            cipherTransform = this._encryptor._createCipherTransform(arguement1, arguement2);
                        }
                        var value = void 0; // eslint-disable-line
                        if (typeof arguement1 === 'number' && typeof arguement2 === 'number') {
                            value = this.getObject(arguement1, arguement2, arguement3);
                        }
                        else if (arguement1 instanceof _CipherTransform) {
                            value = this.getObject(arguement1);
                        }
                        else {
                            value = this.getObject();
                        }
                        value = _decodeText(value, this._isColorSpace, this._isPassword);
                        this._isPassword = false;
                        dictionary.set(key, value);
                    }
                    if (this.first === endOfFile) {
                        if (this.recoveryMode) {
                            return dictionary;
                        }
                        throw new ParserEndOfFileException('End of file inside dictionary.');
                    }
                    if (_isCommand(this.second, 'stream')) {
                        if (this.allowStreams === true) {
                            if (arguement1 instanceof _CipherTransform) {
                                cipherTransform = arguement1;
                            }
                            else if (arguement3 && typeof arguement2 === 'number') {
                                cipherTransform = this._encryptor._createCipherTransform(arguement1, arguement2);
                            }
                            if (typeof arguement2 === 'boolean' && arguement2) {
                                return this.makeStream(dictionary, cipherTransform, arguement2);
                            }
                            else {
                                return this.makeStream(dictionary, cipherTransform);
                            }
                        }
                        else {
                            return dictionary;
                        }
                    }
                    this.shift();
                    return dictionary;
                default:
                    return first;
            }
        }
        if (Number.isInteger(first)) {
            if (Number.isInteger(this.first) && _isCommand(this.second, 'R')) {
                var ref = _PdfReference.get(first, this.first);
                this.shift();
                this.shift();
                return ref;
            }
            return first;
        }
        if (typeof first === 'string') {
            if (arguement1 instanceof _CipherTransform) {
                cipherTransform = arguement1;
            }
            else if (typeof arguement1 === 'number' && typeof arguement2 === 'number') {
                cipherTransform = this._encryptor._createCipherTransform(arguement1, arguement2);
            }
            if (cipherTransform) {
                return cipherTransform.decryptString(first);
            }
            return first;
        }
        return first;
    };
    _PdfParser.prototype.findDiscreteDecodeInlineStreamEnd = function (stream) {
        var startPos = stream.position;
        var foundEnd = false;
        var b;
        var markerLength;
        b = stream.getByte();
        while (b !== -1) {
            if (b !== 0xff) {
                b = stream.getByte();
                continue;
            }
            switch (stream.getByte()) {
                case 0x00:
                    break;
                case 0xff:
                    stream.skip(-1);
                    break;
                case 0xd9:
                    foundEnd = true;
                    break;
                case 0xc0:
                case 0xc1:
                case 0xc2:
                case 0xc3:
                case 0xc5:
                case 0xc6:
                case 0xc7:
                case 0xc9:
                case 0xca:
                case 0xcb:
                case 0xcd:
                case 0xce:
                case 0xcf:
                case 0xc4:
                case 0xcc:
                case 0xda:
                case 0xdb:
                case 0xdc:
                case 0xdd:
                case 0xde:
                case 0xdf:
                case 0xe0:
                case 0xe1:
                case 0xe2:
                case 0xe3:
                case 0xe4:
                case 0xe5:
                case 0xe6:
                case 0xe7:
                case 0xe8:
                case 0xe9:
                case 0xea:
                case 0xeb:
                case 0xec:
                case 0xed:
                case 0xee:
                case 0xef:
                case 0xfe:
                    markerLength = stream.getUnsignedInteger16();
                    if (markerLength > 2) {
                        stream.skip(markerLength - 2);
                    }
                    else {
                        stream.skip(-2);
                    }
                    break;
            }
            if (foundEnd) {
                break;
            }
            b = stream.getByte();
        }
        var length = stream.position - startPos;
        if (b === -1) {
            stream.skip(-length);
            return this.findDefaultInlineStreamEnd(stream);
        }
        this.inlineStreamSkipEI(stream);
        return length;
    };
    _PdfParser.prototype.findDecodeInlineStreamEnd = function (stream) {
        var startPos = stream.position;
        var ch;
        while ((ch = stream.getByte()) !== -1) { // eslint-disable-line
            if (ch === 0x7e) {
                var tildePos = stream.position;
                ch = stream.peekByte();
                while (_isWhiteSpace(ch)) {
                    stream.skip();
                    ch = stream.peekByte();
                }
                if (ch === 0x3e) {
                    stream.skip();
                    break;
                }
                if (stream.position > tildePos) {
                    var maybeEI = stream.peekBytes(2);
                    if (maybeEI[0] === 0x45 && maybeEI[1] === 0x49) {
                        break;
                    }
                }
            }
        }
        var length = stream.position - startPos;
        if (ch === -1) {
            stream.skip(-length);
            return this.findDefaultInlineStreamEnd(stream);
        }
        this.inlineStreamSkipEI(stream);
        return length;
    };
    _PdfParser.prototype.findHexDecodeInlineStreamEnd = function (stream) {
        var startPos = stream.position;
        var ch;
        ch = stream.getByte();
        while (ch !== -1) {
            if (ch === 0x3e) {
                break;
            }
            ch = stream.getByte();
        }
        var length = stream.position - startPos;
        if (ch === -1) {
            stream.skip(-length);
            return this.findDefaultInlineStreamEnd(stream);
        }
        this.inlineStreamSkipEI(stream);
        return length;
    };
    _PdfParser.prototype.inlineStreamSkipEI = function (stream) {
        var state = 0;
        var ch;
        ch = stream.getByte();
        while (ch !== -1) {
            if (state === 0) {
                state = ch === 0x45 ? 1 : 0;
            }
            else if (state === 1) {
                state = ch === 0x49 ? 2 : 0;
            }
            else if (state === 2) {
                break;
            }
            ch = stream.getByte();
        }
    };
    _PdfParser.prototype.makeInlineImage = function (arguement1, arguement2, arguement3) {
        var lexicalOperator = this.lexicalOperator;
        var stream = lexicalOperator.stream;
        var dictionary = new _PdfDictionary(this.xref);
        var dictLength;
        var cipherTransform;
        if (arguement3) {
            if (arguement1 instanceof _CipherTransform) {
                cipherTransform = arguement1;
            }
            else {
                cipherTransform = this._encryptor._createCipherTransform(arguement1, arguement2);
            }
        }
        while (!_isCommand(this.first, 'ID') && this.first !== endOfFile) {
            if (!(this.first instanceof _PdfName)) {
                throw new FormatError('Dictionary key must be a name object');
            }
            var key = this.first.name;
            this.shift();
            if (this.first.name === endOfFile) {
                break;
            }
            if (arguement1 instanceof _CipherTransform) {
                dictionary.set(key, this.getObject(arguement1));
            }
            else {
                dictionary.set(key, this.getObject(arguement1, arguement2, arguement3));
            }
        }
        if (lexicalOperator.beginInlineImagePosition !== -1) {
            dictLength = stream.position - lexicalOperator.beginInlineImagePosition;
        }
        var filter = dictionary.get('F', 'Filter'); // eslint-disable-line
        var filterName;
        if (filter instanceof _PdfName) {
            filterName = filter.name;
        }
        else if (Array.isArray(filter)) {
            var reference = filter[0]; // eslint-disable-line
            var filterZero = (reference !== null && typeof reference !== 'undefined' && reference instanceof _PdfReference) ?
                this.xref._fetch(reference) :
                reference;
            if (filterZero) {
                filterName = filterZero.name;
            }
        }
        var startPos = stream.position;
        var length;
        switch (filterName) {
            case 'DCT':
            case 'DCTDecode':
                length = this.findDiscreteDecodeInlineStreamEnd(stream);
                break;
            case 'A85':
            case 'ASCII85Decode':
                length = this.findDecodeInlineStreamEnd(stream);
                break;
            case 'AHx':
            case 'ASCIIHexDecode':
                length = this.findHexDecodeInlineStreamEnd(stream);
                break;
            default:
                length = this.findDefaultInlineStreamEnd(stream);
        }
        var imageStream = stream.makeSubStream(startPos, length, dictionary); // eslint-disable-line
        var cacheKey;
        if (length < maxCacheLength && dictLength < maxNumberLength) {
            var imageBytes = imageStream.getBytes();
            imageStream.reset();
            var initialStreamPos = stream.position;
            stream.position = lexicalOperator.beginInlineImagePosition;
            var dictBytes = stream.getBytes(dictLength);
            stream.position = initialStreamPos;
            cacheKey = this._computeMaxNumber(imageBytes) + '_' + this._computeMaxNumber(dictBytes);
            var cacheEntry = this.imageCache.get(cacheKey);
            if (cacheEntry !== undefined) {
                this.second = _PdfCommand.get('EI');
                this.shift();
                cacheEntry.reset();
                return cacheEntry;
            }
        }
        if (cipherTransform) {
            imageStream = cipherTransform.createStream(imageStream, length);
        }
        imageStream = this.filter(imageStream, dictionary, length);
        imageStream.dictionary = dictionary;
        if (cacheKey !== undefined) {
            this.imageCache.set(cacheKey, imageStream);
        }
        this.second = _PdfCommand.get('EI');
        this.shift();
        return imageStream;
    };
    _PdfParser.prototype._computeMaxNumber = function (bytes) {
        var bytesLength = bytes.length;
        var a = 1;
        var b = 0;
        for (var i = 0; i < bytesLength; ++i) {
            a += bytes[i] & 0xff; // eslint-disable-line
            b += a;
        }
        return (b % 65521 << 16) | a % 65521;
    };
    _PdfParser.prototype.makeStream = function (dictionary, cipherTransform, makeFilter) {
        if (makeFilter === void 0) { makeFilter = false; }
        var lexicalOperator = this.lexicalOperator;
        var stream = lexicalOperator.stream; // eslint-disable-line
        lexicalOperator.skipToNextLine();
        var startPosition = stream.position - 1;
        var length = dictionary.get('Length');
        if (!Number.isInteger(length)) {
            length = 0;
        }
        stream.position = startPosition + length;
        lexicalOperator.nextChar();
        if (this.tryShift() && _isCommand(this.second, 'endstream')) {
            this.shift();
        }
        else {
            var endStreamSignature = new Uint8Array([0x65, 0x6e, 0x64, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d]);
            var actualLength = this._findStreamLength(startPosition, endStreamSignature);
            if (actualLength < 0) {
                var end = endStreamSignature.length - 1;
                var truncatedSignature = endStreamSignature.slice(0, end);
                var maybeLength = this._findStreamLength(startPosition, truncatedSignature);
                if (maybeLength >= 0) {
                    var lastByte = stream.peekBytes(end + 1)[end]; // eslint-disable-line
                    if (_isWhiteSpace(lastByte)) {
                        actualLength = maybeLength;
                    }
                }
                if (actualLength < 0) {
                    throw new FormatError('Missing endstream command.');
                }
            }
            length = actualLength;
            lexicalOperator.nextChar();
            this.shift();
            this.shift();
        }
        this.shift();
        stream = stream.makeSubStream(startPosition, length, dictionary);
        if (!makeFilter) {
            if (cipherTransform) {
                stream = cipherTransform.createStream(stream, length);
            }
            stream = this.filter(stream, dictionary, length);
        }
        stream.dictionary = dictionary;
        return stream;
    };
    _PdfParser.prototype.filter = function (stream, dictionary, length) {
        var filter = dictionary.get('F', 'Filter'); // eslint-disable-line
        var params = dictionary.get('DP', 'DecodeParms'); // eslint-disable-line
        if (filter instanceof _PdfName) {
            return this.makeFilter(stream, filter.name, length, params);
        }
        var maybeLength = length;
        if (Array.isArray(filter)) {
            var filterArray = filter; // eslint-disable-line
            var paramsArray = params; // eslint-disable-line
            for (var i = 0; i < filterArray.length; ++i) {
                var reference = filterArray[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                filter = reference instanceof _PdfReference ? this.xref._fetch(reference) : reference;
                if (!(filter instanceof _PdfName)) {
                    throw new FormatError("Bad filter name '" + filter + "'");
                }
                params = null;
                if (Array.isArray(paramsArray) && i in paramsArray) {
                    var ref = paramsArray[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                    params = ref instanceof _PdfReference ? this.xref._fetch(ref) : ref;
                }
                stream = this.makeFilter(stream, filter.name, maybeLength, params);
                maybeLength = null;
            }
        }
        return stream;
    };
    _PdfParser.prototype.makeFilter = function (stream, name, maybeLength, params) {
        if (maybeLength === 0) {
            return new _PdfNullStream();
        }
        try {
            if (name === 'Fl' || name === 'FlateDecode') {
                if (params) {
                    return new PdfPredictorStream(new _PdfFlateStream(stream, maybeLength), maybeLength, params);
                }
                return new _PdfFlateStream(stream, maybeLength);
            }
            return stream;
        }
        catch (ex) {
            return new _PdfNullStream();
        }
    };
    _PdfParser.prototype._findStreamLength = function (startPosition, signature) {
        var stream = this.lexicalOperator.stream;
        stream.position = startPosition;
        var length = 2048;
        var signatureLength = signature.length;
        while (stream.position < stream.end) {
            var scanBytes = stream.peekBytes(length);
            var scanLength = scanBytes.length - signatureLength;
            if (scanLength <= 0) {
                break;
            }
            var position = 0;
            while (position < scanLength) {
                var j = 0;
                while (j < signatureLength && scanBytes[position + j] === signature[j]) { // eslint-disable-line
                    j++;
                }
                if (j >= signatureLength) {
                    stream.position += position;
                    return stream.position - startPosition;
                }
                position++;
            }
            stream.position += scanLength;
        }
        return -1;
    };
    _PdfParser.prototype.findDefaultInlineStreamEnd = function (stream) {
        var startPosition = stream.position;
        var n = 10;
        var state = 0;
        var ch;
        var endImagePosition;
        ch = stream.getByte();
        while (ch !== -1) {
            if (state === 0) {
                state = ch === 0x45 ? 1 : 0;
            }
            else if (state === 1) {
                state = ch === 0x49 ? 2 : 0;
            }
            else {
                if (state !== 2) {
                    throw new Error('findDefaultInlineStreamEnd - invalid state.');
                }
                if (ch === 0x20 || ch === 0xa || ch === 0xd) {
                    endImagePosition = stream.position;
                    var followingBytes = stream.peekBytes(n);
                    for (var i = 0, ii = followingBytes.length; i < ii; i++) {
                        ch = followingBytes[i]; // eslint-disable-line
                        if (ch === 0x0 && followingBytes[i + 1] !== 0x0) {
                            continue;
                        }
                        if (ch !== 0xa && ch !== 0xd && (ch < 0x20 || ch > 0x7f)) {
                            state = 0;
                            break;
                        }
                    }
                    if (state !== 2) {
                        ch = stream.getByte();
                        continue;
                    }
                    if (state === 2) {
                        break;
                    }
                }
                else {
                    state = 0;
                }
            }
            ch = stream.getByte();
        }
        if (ch === -1) {
            if (typeof endImagePosition !== 'undefined') {
                stream.skip(-(stream.position - endImagePosition));
            }
        }
        var endOffset = 4;
        stream.skip(-endOffset);
        ch = stream.peekByte();
        stream.skip(endOffset);
        if (!_isWhiteSpace(ch)) {
            endOffset--;
        }
        return stream.position - endOffset - startPosition;
    };
    _PdfParser.prototype._checkEnd = function () {
        if (this.first === endOfFile) {
            return true;
        }
        else {
            return false;
        }
    };
    return _PdfParser;
}());
export { _PdfParser };
/* eslint-disable */
var _Linearization = /** @class */ (function () {
    function _Linearization(stream) {
        this.isValid = false;
        var parser = new _PdfParser(new _PdfLexicalOperator(stream), null);
        var obj1 = parser.getObject();
        var obj2 = parser.getObject();
        var obj3 = parser.getObject();
        var dictionary = parser.getObject();
        this.isValid = Number.isInteger(obj1) && Number.isInteger(obj2) && _isCommand(obj3, 'obj') && typeof dictionary !== 'undefined';
        if (this.isValid) {
            var obj = dictionary.get('Linearized');
            this.isValid = typeof obj !== 'undefined' && obj > 0;
        }
        if (this.isValid) {
            var length_1 = this.getInt(dictionary, 'L');
            if (length_1 !== stream.length) {
                throw new Error('The L parameter in the linearization dictionary ' + 'does not equal the stream length.');
            }
            this.length = length_1;
            this.hints = this.getHints(dictionary);
            this.objectNumberFirst = this.getInt(dictionary, 'O');
            this.endFirst = this.getInt(dictionary, 'E');
            this.pageCount = this.getInt(dictionary, 'N');
            this.mainXRefEntriesOffset = this.getInt(dictionary, 'T');
            this.pageFirst = dictionary.has('P') ? this.getInt(dictionary, 'P', true) : 0;
        }
    }
    _Linearization.prototype.getInt = function (dictionary, name, allowZeroValue) {
        if (allowZeroValue === void 0) { allowZeroValue = false; }
        var obj = dictionary.get(name);
        if (typeof obj !== 'undefined' && Number.isInteger(obj) && (allowZeroValue ? obj >= 0 : obj > 0)) {
            return obj;
        }
        throw new Error("The '" + name + "' parameter in the linearization " + 'dictionary is invalid.');
    };
    _Linearization.prototype.getHints = function (dictionary) {
        var hints = dictionary.getArray('H');
        var hintsLength = hints.length;
        if (hints && (hintsLength === 2 || hintsLength === 4)) {
            for (var index = 0; index < hintsLength; index++) {
                var hint = hints[index];
                if (!(Number.isInteger(hint) && hint > 0)) {
                    throw new Error("Hint (" + index + ") in the linearization dictionary is invalid.");
                }
            }
            return hints;
        }
        throw new Error('Hint array in the linearization dictionary is invalid.');
    };
    return _Linearization;
}());
export { _Linearization };
/* eslint-enable */
