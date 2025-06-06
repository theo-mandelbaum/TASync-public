import { _TokenType } from './enumerator';
var _ContentParser = /** @class */ (function () {
    function _ContentParser(contentStream) {
        this._recordCollection = [];
        this._operands = [];
        this._lexer = new _ContentLexer(contentStream);
    }
    _ContentParser.prototype._readContent = function () {
        this._parseObject(_TokenType.eof);
        return this._recordCollection;
    };
    _ContentParser.prototype._parseObject = function (tokenType) {
        var symbol;
        while ((symbol = this._getNextToken()) !== _TokenType.eof) { // eslint-disable-line
            if (symbol === tokenType || symbol === _TokenType.none) {
                return;
            }
            switch (symbol) {
                case _TokenType.comment:
                    break;
                case _TokenType.number:
                    if (this._lexer._operatorParams === '-') {
                        this._operands.push('0');
                    }
                    else {
                        this._operands.push(this._lexer._operatorParams);
                    }
                    break;
                case _TokenType.real:
                    this._operands.push(this._lexer._operatorParams);
                    break;
                case _TokenType.string:
                case _TokenType.hexString:
                case _TokenType.unicodeHexString:
                case _TokenType.unicodeString:
                    this._operands.push(this._lexer._operatorParams);
                    break;
                case _TokenType.name:
                    this._operands.push(this._lexer._operatorParams);
                    break;
                case _TokenType.operator:
                    this._createRecord();
                    this._operands = [];
                    break;
                case _TokenType.beginArray:
                    break;
                case _TokenType.endArray:
                    throw new Error('Error while parsing content');
            }
        }
    };
    _ContentParser.prototype._createRecord = function () {
        var operand = this._lexer._operatorParams;
        var record = new _PdfRecord(operand, this._operands);
        record._splittedText = this._lexer._text;
        this._recordCollection.push(record);
    };
    _ContentParser.prototype._getNextToken = function () {
        return this._lexer._getNextToken();
    };
    return _ContentParser;
}());
export { _ContentParser };
var _ContentLexer = /** @class */ (function () {
    function _ContentLexer(data) {
        this._tokenType = _TokenType.none;
        this._currentCharacter = '\0';
        this._nextCharacter = '\0';
        this._offset = 0;
        this._text = [];
        this._data = data instanceof Uint8Array ? data : new Uint8Array(data);
    }
    _ContentLexer.prototype._getNextToken = function () {
        this._operatorParams = '';
        var value = this._moveToNextChar();
        switch (value) {
            case '%':
                return this._tokenType = this._getComment();
            case '/':
                return this._tokenType = this._getName();
            case '[':
            case '(':
                return this._tokenType = this._getLiteralString();
            case '+':
            case '-':
                return this._tokenType = this._getNumber();
            case '<':
                return this._tokenType = this._getEncodedDecimalString();
            case '.':
                return this._tokenType = this._getNumber();
            case '"':
            case '\'':
                return this._tokenType = this._getOperator();
        }
        if (!isNaN(parseInt(value, 10))) {
            return this._tokenType = this._getNumber();
        }
        if ((/[a-zA-Z]/).test(value)) {
            return this._tokenType = this._getOperator();
        }
        if (value === String.fromCharCode(65535)) {
            return this._tokenType = _TokenType.eof;
        }
        return this._tokenType = _TokenType.none;
    };
    _ContentLexer.prototype._getComment = function () {
        this._operatorParams = '';
        var value;
        var flag = (value = this._consumeValue()) !== '\x0A' && value !== String.fromCharCode(65535);
        while (flag) {
            flag = (value = this._consumeValue()) !== '\x0A' && value !== String.fromCharCode(65535);
        }
        return _TokenType.comment;
    };
    _ContentLexer.prototype._getName = function () {
        this._operatorParams = '';
        var flag = false;
        while (!flag) {
            var value = this._consumeValue();
            switch (value) {
                case '\0':
                case '\t':
                case '\x0A':
                case '\f':
                case '\x0D':
                case '\b':
                case ' ':
                case '%':
                case '(':
                case ')':
                case '<':
                case '>':
                case '[':
                case ']':
                case '/':
                    flag = true;
                    return _TokenType.name;
                default:
                    break;
            }
        }
        return _TokenType.none;
    };
    _ContentLexer.prototype._getNumber = function () {
        var value = this._currentCharacter;
        if (value === '+' || value === '-') {
            this._operatorParams += this._currentCharacter;
            value = this._getNextChar();
        }
        while (!isNaN(parseInt(value, 10)) || value === '.') {
            if (!isNaN(parseInt(value, 10))) {
                this._operatorParams += this._currentCharacter;
            }
            else if (value === '.') {
                if (this._operatorParams.includes('.')) {
                    break;
                }
                else {
                    this._operatorParams += this._currentCharacter;
                }
            }
            value = this._getNextChar();
        }
        return _TokenType.number;
    };
    _ContentLexer.prototype._getOperator = function () {
        this._operatorParams = '';
        var value = this._currentCharacter;
        while (this._isOperator(value)) {
            value = this._consumeValue();
        }
        return _TokenType.operator;
    };
    _ContentLexer.prototype._isOperator = function (value) {
        if ((/[a-zA-Z]/).test(value)) {
            return true;
        }
        switch (value) {
            case '*':
            case '\'':
            case '\"': // eslint-disable-line
            case '1':
            case '0':
                return true;
        }
        return false;
    };
    _ContentLexer.prototype._getLiteralString = function () {
        this._operatorParams = '';
        var beginChar = this._currentCharacter;
        var literal;
        var value = this._consumeValue();
        var flag = true;
        var index = 0;
        var char = '';
        this._text = [];
        while (flag) {
            if (beginChar === '(') {
                literal = this._getLiteralStringValue(value);
                this._operatorParams += literal;
                value = this._getNextChar();
                flag = false;
                break;
            }
            else {
                if (value === '(') {
                    if (char !== '') {
                        this._text[Number.parseInt(index.toString(), 10)] = char.slice(0, -1);
                        char = '';
                        index++;
                    }
                    value = this._consumeValue();
                    literal = this._getLiteralStringValue(value);
                    this._text[Number.parseInt(index.toString(), 10)] = '(' + literal;
                    index++;
                    this._operatorParams += literal;
                    value = this._getNextChar();
                    char += value;
                    continue;
                }
                else if (value === ']') {
                    flag = false;
                    value = this._consumeValue();
                    break;
                }
                else if (value === '>') {
                    this._text[Number.parseInt(index.toString(), 10)] = '<' + char;
                    index++;
                    char = '';
                }
                else if (value === '<') {
                    if (char !== '') {
                        this._text[Number.parseInt(index.toString(), 10)] = char.slice(0, -1);
                        index++;
                    }
                    char = '';
                }
                value = this._consumeValue();
                char += value;
            }
        }
        return _TokenType.string;
    };
    _ContentLexer.prototype._getEncodedDecimalString = function () {
        var startChar = '<';
        var endChar = '>';
        var space = ' ';
        var parentLevel = 0;
        var value = this._consumeValue();
        var flag = true;
        while (flag) {
            if (value === startChar) {
                parentLevel++;
                value = this._consumeValue();
            }
            else if (value === endChar) {
                if (parentLevel === 0) {
                    this._consumeValue();
                    flag = false;
                    break;
                }
                else if (parentLevel === 1) {
                    value = this._consumeValue();
                    if (value === '>') {
                        parentLevel--;
                    }
                    if (parentLevel === 1 && value === space) {
                        flag = false;
                        break;
                    }
                }
                else {
                    if (value === '>') {
                        parentLevel--;
                    }
                    value = this._consumeValue();
                }
            }
            else {
                value = this._consumeValue();
                if (value === String.fromCharCode(65535)) {
                    flag = false;
                    break;
                }
            }
        }
        return _TokenType.hexString;
    };
    _ContentLexer.prototype._getLiteralStringValue = function (value) {
        var parenthesesCount = 0;
        var literal = '';
        var flag = true;
        while (flag) {
            if (value === '\\') {
                literal += value;
                value = this._getNextChar();
                literal += value;
                value = this._getNextChar();
                continue;
            }
            if (value === '(') {
                parenthesesCount++;
                literal += value;
                value = this._getNextChar();
                continue;
            }
            if (value === ')' && parenthesesCount !== 0) {
                literal += value;
                value = this._getNextChar();
                parenthesesCount--;
                continue;
            }
            if (value === ')' && parenthesesCount === 0) {
                literal += value;
                flag = false;
                return literal;
            }
            literal += value;
            value = this._getNextChar();
        }
        return literal;
    };
    _ContentLexer.prototype._consumeValue = function () {
        this._operatorParams += this._currentCharacter;
        return this._getNextChar();
    };
    _ContentLexer.prototype._moveToNextChar = function () {
        while (this._currentCharacter !== String.fromCharCode(65535)) {
            switch (this._currentCharacter) {
                case '\0':
                case '\t':
                case '\x0A':
                case '\f':
                case '\x0D':
                case '\b':
                case ' ':
                    this._getNextChar();
                    break;
                default:
                    return this._currentCharacter;
            }
        }
        return this._currentCharacter;
    };
    _ContentLexer.prototype._getNextChar = function () {
        if (this._data.length <= this._offset) {
            if (this._nextCharacter === 'Q' || (this._currentCharacter === 'D' && this._nextCharacter === 'o')) {
                this._currentCharacter = this._nextCharacter;
                this._nextCharacter = String.fromCharCode(65535);
                return this._currentCharacter;
            }
            this._currentCharacter = String.fromCharCode(65535);
            this._nextCharacter = String.fromCharCode(65535);
        }
        else {
            this._currentCharacter = this._nextCharacter;
            this._nextCharacter = String.fromCharCode(this._data[this._offset++]);
            if (this._currentCharacter === '\x0D') {
                if (this._nextCharacter === '\x0A') {
                    this._currentCharacter = this._nextCharacter;
                    if (this._data.length <= this._offset) {
                        this._nextCharacter = String.fromCharCode(65535);
                    }
                    else {
                        this._nextCharacter = String.fromCharCode(this._data[this._offset++]);
                    }
                }
                else {
                    this._currentCharacter = '\x0A';
                }
            }
        }
        return this._currentCharacter;
    };
    return _ContentLexer;
}());
export { _ContentLexer };
var _PdfRecord = /** @class */ (function () {
    function _PdfRecord(operator, operands) {
        this._operator = operator;
        this._operands = operands;
    }
    return _PdfRecord;
}());
export { _PdfRecord };
