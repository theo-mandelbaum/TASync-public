import { _PdfDictionary, _PdfReference } from './pdf-primitives';
export declare abstract class _PdfBaseStream {
    offset: number;
    dictionary: _PdfDictionary;
    reference: _PdfReference;
    _isCompress: boolean;
    _isImage: boolean;
    getByte(): number;
    getBytes(length?: number): Uint8Array;
    readonly length: number;
    readonly isEmpty: boolean;
    readonly isDataLoaded: boolean;
    peekByte(): number;
    peekBytes(length: number): Uint8Array;
    getUnsignedInteger16(): number;
    getInt32(): number;
    getByteRange(begin: number, end: number): Uint8Array;
    makeSubStream(start: number, length: number, dictionary: _PdfDictionary): _PdfBaseStream;
    readBlock(): void;
    reset(): void;
    moveStart(): void;
    getString(isHex?: boolean, bytes?: Uint8Array): string;
    skip(n?: number): void;
    getBaseStreams(): _PdfBaseStream[];
}
export declare class _PdfStream extends _PdfBaseStream {
    constructor(arrayBuffer: number[] | Uint8Array | ArrayBuffer, dictionary?: _PdfDictionary, start?: number, length?: number);
    bytes: Uint8Array;
    start: number;
    isImageStream: boolean;
    end: number;
    dataStream2: string[];
    /**
     * Gets the position of the stream.
     *
     * @returns {number} offset position.
     */
    /**
    * Sets the position of the stream.
    *
    * @param {number} value offset position.
    */
    position: number;
    /**
     * Gets the length of the stream (Read only).
     *
     * @returns {number} length.
     */
    readonly length: number;
    /**
     * Gets a value indicating whether the stream is empty (Read only).
     *
     * @returns {boolean} stream empty or not.
     */
    readonly isEmpty: boolean;
    /**
     * Gets the data of the stream.
     *
     * @returns {string[]} data of the stream.
     */
    /**
    * Sets the data of the stream.
    *
    * @param {string[]} value data.
    */
    data: string[];
    getByte(): number;
    getBytes(length?: number): Uint8Array;
    getByteRange(begin: number, end: number): Uint8Array;
    reset(): void;
    moveStart(): void;
    makeSubStream(start: number, length: number, dictionary?: _PdfDictionary): _PdfStream;
    readBlock(): void;
    _clearStream(): void;
    _write(text: string): void;
    _writeBytes(data: number[]): void;
}
export declare class _PdfContentStream extends _PdfBaseStream {
    _bytes: number[];
    _pendingResources: string;
    readonly length: number;
    constructor(bytes: number[]);
    write(data: string | number[]): void;
    getString(isHex?: boolean): string;
}
export declare class _PdfNullStream extends _PdfStream {
    constructor();
}
