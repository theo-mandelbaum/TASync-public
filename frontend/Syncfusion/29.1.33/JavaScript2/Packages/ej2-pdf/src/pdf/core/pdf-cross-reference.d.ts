import { _PdfStream } from './base-stream';
import { _PdfDictionary, _PdfReferenceSet, _PdfReference, _PdfCommand } from './pdf-primitives';
import { _PdfParser } from './pdf-parser';
import { _PdfBaseStream } from './base-stream';
import { PdfDocument } from './pdf-document';
import { _CipherTransform, _PdfEncryptor } from './security/encryptor';
export declare class _PdfCrossReference {
    _stream: _PdfStream;
    _pendingRefs: _PdfReferenceSet;
    _entries: _PdfObjectInformation[];
    _crossReferencePosition: any;
    _cacheMap: Map<_PdfReference, any>;
    _startXRefQueue: number[];
    _trailer: _PdfDictionary;
    _root: _PdfDictionary;
    _topDictionary: _PdfDictionary;
    _tableState: _PdfCrossTableState;
    _streamState: _PdfStreamState;
    _prevStartXref: number;
    _version: string;
    _nextReferenceNumber: number;
    _newLine: string;
    _document: PdfDocument;
    _allowCatalog: boolean;
    _password: string;
    _encrypt: _PdfEncryptor;
    _ids: string[];
    _permissionFlags: number;
    _prevXRefOffset: number;
    _indexes: Array<number>;
    _objectStreamCollection: Map<_PdfReference, _PdfArchievedStream>;
    _offsets: Array<number>;
    _offsetReference: Map<_PdfReference, any>;
    _objectStream: _PdfArchievedStream;
    _currentLength: number;
    constructor(document: PdfDocument, password?: string);
    _setStartXRef(startXRef: number): void;
    _parse(recoveryMode: boolean): void;
    _getEntry(i: number): _PdfObjectInformation;
    _fetch(ref: _PdfReference, suppressEncryption?: boolean): any;
    _fetchUncompressed(reference: _PdfReference, xrefEntry: _PdfObjectInformation, makeFilter?: boolean): any;
    _fetchCompressed(ref: _PdfReference, xrefEntry: _PdfObjectInformation): any;
    _readXRef(recoveryMode?: boolean): _PdfDictionary;
    _readToken(data: Uint8Array, offset: number): string;
    _skipUntil(data: Uint8Array, offset: number, what: Uint8Array): number;
    _indexObjects(): _PdfDictionary;
    _processXRefTable(parser: _PdfParser): _PdfDictionary;
    _readXRefTable(parser: _PdfParser): _PdfCommand;
    _processXRefStream(stream: _PdfStream): _PdfDictionary;
    _readXRefStream(stream: _PdfStream): void;
    _getCatalogObj(): _PdfDictionary;
    _save(): Uint8Array;
    _saveAsStream(currentLength: number, buffer: number[]): void;
    _updatedDictionary(currentLength: number, key: _PdfReference, buffer: number[], value: any, // eslint-disable-line
    cipher?: _CipherTransform): void;
    _writeXrefStream(buffer: number[]): void;
    _saveAsTable(currentLength: number, buffer: number[]): void;
    _writeXref(buffer: number[], tempBuffer: string, newStartXref: number): void;
    _writeXrefTable(buffer: number[]): void;
    _processString(value: string, length: number): string;
    _copyTrailer(newXref: _PdfDictionary): void;
    _computeMessageDigest(size: number): string;
    _getNextReference(): _PdfReference;
    _writeObject(obj: _PdfDictionary | _PdfBaseStream | any, // eslint-disable-line
    buffer: Array<number>, reference?: _PdfReference, transform?: _CipherTransform, isCrossReference?: boolean): void;
    _writeDictionary(dictionary: _PdfDictionary, buffer: Array<number>, spaceChar: string, transform?: _CipherTransform, isCrossReference?: boolean): void;
    _writeFontDictionary(dictionary: _PdfDictionary): void;
    _writeStream(stream: _PdfBaseStream, buffer: Array<number>, transform?: _CipherTransform, isCrossReference?: boolean): void;
    _writeValue(value: any, buffer: Array<number>, transform?: _CipherTransform, isCrossReference?: boolean): void;
    _writeUnicodeString(value: string, buffer: Array<number>): void;
    _writeString(value: string, buffer: Array<number>): void;
    _writeBytes(data: number[], buffer: Array<number>): void;
    _writeLong(value: number, count: number, buffer: Array<number>): void;
    _escapeString(value: string): string;
    _destroy(): void;
    _writeObjectCollection(objectCollection: Map<_PdfReference, any>, buffer: number[]): void;
    _writeArchiveStream(objectStreamCollection: Map<_PdfReference, _PdfArchievedStream>, key: _PdfReference, value: any): void;
    _writeObjectToBuffer(key: _PdfReference, value: any, buffer: number[], // eslint-disable-line
    objectStreamCollection: Map<_PdfReference, _PdfArchievedStream>): void;
    _writeToBuffer(buffer: number[], key: any, value: any, cipher?: _CipherTransform): void;
    _getSortedReferences(collection: Map<_PdfReference, any>): Map<_PdfReference, any>;
}
declare class _PdfObjectInformation {
    offset: number;
    gen: number;
    uncompressed: boolean;
    free: boolean;
}
declare class _PdfCrossTableState {
    entryNum: number;
    streamPos: number;
    parserBuf1: any;
    parserBuf2: any;
    firstEntryNum: number;
    entryCount: number;
}
declare class _PdfStreamState {
    entryRanges: number[];
    byteWidths: number[];
    entryNum: number;
    streamPos: number;
}
declare class _PdfArchievedStream {
    _indexes: string;
    _length: number;
    _updatedStream: number[];
    _crossReference: _PdfCrossReference;
    _reference: _PdfReference;
    _archiveXRef: string;
    _collection: number[];
    _archiveOffset: number;
    constructor(crossReference: _PdfCrossReference);
    _writeObject(key: _PdfReference, value: _PdfDictionary): void;
    _save(buffer: number[], currentLength: number): void;
}
export {};
