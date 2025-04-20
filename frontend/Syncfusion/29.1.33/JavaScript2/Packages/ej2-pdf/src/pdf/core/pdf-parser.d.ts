import { _PdfName, _PdfDictionary } from './pdf-primitives';
import { _PdfStream, _PdfBaseStream } from './base-stream';
import { _PdfCrossReference } from './pdf-cross-reference';
import { _CipherTransform, _PdfEncryptor } from './security/encryptor';
export declare class _PdfLexicalOperator {
    stream: any;
    stringBuffer: Array<string>;
    _hexStringNumber: number;
    beginInlineImagePosition: number;
    currentChar: number;
    constructor(stream: any);
    nextChar(): number;
    peekChar(): number;
    getNumber(): number;
    getString(): string;
    getName(): _PdfName;
    getHexString(): string;
    getObject(): any;
    peekObj(): any;
    skipToNextLine(): void;
    _toHexDigit(ch: number): number;
}
export declare class _PdfParser {
    lexicalOperator: _PdfLexicalOperator;
    xref: _PdfCrossReference;
    allowStreams: boolean;
    recoveryMode: boolean;
    imageCache: Map<string, _PdfBaseStream>;
    first: any;
    second: any;
    private _isColorSpace;
    private _isPassword;
    _encryptor: _PdfEncryptor;
    constructor(lexicalOperator: _PdfLexicalOperator, xref: _PdfCrossReference, allowStreams?: boolean, recoveryMode?: boolean, encryptor?: _PdfEncryptor);
    refill(): void;
    shift(): void;
    tryShift(): boolean;
    getObject(cipherTransform?: _CipherTransform): any;
    getObject(objectNumber?: number, generationNumber?: number | boolean, isCipherTransform?: boolean): any;
    findDiscreteDecodeInlineStreamEnd(stream: any): number;
    findDecodeInlineStreamEnd(stream: any): number;
    findHexDecodeInlineStreamEnd(stream: any): number;
    inlineStreamSkipEI(stream: any): void;
    makeInlineImage(cipher?: _CipherTransform): any;
    makeInlineImage(objectNumber?: number, generationNumber?: number, isCipherTransform?: boolean): any;
    _computeMaxNumber(bytes: Uint8Array): number;
    makeStream(dictionary: _PdfDictionary, cipherTransform?: _CipherTransform, makeFilter?: boolean): any;
    filter(stream: any, dictionary: _PdfDictionary, length: number): any;
    makeFilter(stream: any, name: string, maybeLength: number, params: any): any;
    _findStreamLength(startPosition: number, signature: Uint8Array): number;
    findDefaultInlineStreamEnd(stream: any): number;
    _checkEnd(): boolean;
}
export declare class _Linearization {
    length: number;
    xref: _PdfCrossReference;
    hints: number[];
    objectNumberFirst: number;
    endFirst: number;
    pageCount: number;
    mainXRefEntriesOffset: number;
    pageFirst: number;
    isValid: boolean;
    constructor(stream: _PdfStream);
    getInt(dictionary: _PdfDictionary, name: string, allowZeroValue?: boolean): number;
    getHints(dictionary: _PdfDictionary): number[];
}
