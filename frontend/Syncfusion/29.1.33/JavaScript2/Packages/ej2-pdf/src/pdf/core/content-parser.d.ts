import { _TokenType } from './enumerator';
export declare class _ContentParser {
    _lexer: _ContentLexer;
    _recordCollection: _PdfRecord[];
    _operands: string[];
    constructor(contentStream: number[]);
    constructor(contentStream: Uint8Array);
    _readContent(): _PdfRecord[];
    _parseObject(tokenType: _TokenType): void;
    _createRecord(): void;
    _getNextToken(): _TokenType;
}
export declare class _ContentLexer {
    _data: Uint8Array;
    _tokenType: _TokenType;
    _operatorParams: string;
    _currentCharacter: string;
    _nextCharacter: string;
    _offset: number;
    _text: string[];
    constructor(data: Uint8Array | number[]);
    _getNextToken(): _TokenType;
    _getComment(): _TokenType;
    _getName(): _TokenType;
    _getNumber(): _TokenType;
    _getOperator(): _TokenType;
    _isOperator(value: string): boolean;
    _getLiteralString(): _TokenType;
    _getEncodedDecimalString(): _TokenType;
    _getLiteralStringValue(value: string): string;
    _consumeValue(): string;
    _moveToNextChar(): string;
    _getNextChar(): string;
}
export declare class _PdfRecord {
    _operator: string;
    _operands: string[];
    _splittedText: string[];
    constructor(operator: string, operands: string[]);
}
