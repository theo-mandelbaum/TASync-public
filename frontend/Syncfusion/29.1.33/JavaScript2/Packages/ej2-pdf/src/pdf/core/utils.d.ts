import { _PdfDictionary, _PdfName, _PdfReference } from './pdf-primitives';
import { PdfDestination, PdfPage } from './pdf-page';
import { PdfFormFieldVisibility, PdfAnnotationFlag, PdfCheckBoxStyle, PdfHighlightMode, PdfBorderStyle, PdfBorderEffectStyle, PdfLineEndingStyle, _PdfCheckFieldState, PdfMeasurementUnit, _PdfGraphicsUnit, PdfTextMarkupAnnotationType, PdfAnnotationState, PdfAnnotationStateModel, PdfPopupIcon, PdfRubberStampAnnotationIcon, PdfAttachmentIcon, PdfAnnotationIntent, PdfBlendMode, PdfNumberStyle } from './enumerator';
import { PdfDocument, PdfPageSettings } from './pdf-document';
import { _PdfBaseStream } from './base-stream';
import { PdfStateItem, PdfComment, PdfWidgetAnnotation, PdfAnnotation } from './annotations/annotation';
import { PdfPopupAnnotationCollection } from './annotations/annotation-collection';
import { PdfTemplate } from './graphics/pdf-template';
import { PdfField } from './form/field';
import { PdfFont, PdfFontStyle } from './fonts/pdf-standard-font';
import { _PdfCrossReference } from './pdf-cross-reference';
import { PdfForm } from './form';
import { _ImageDecoder } from './graphics/images/image-decoder';
/**
 * Gets the unsigned value.
 *
 * @param {number} value input value.
 * @param {number} bits bits to process.
 * @returns {number} unsigned value.
 */
export declare function _toUnsigned(value: number, bits: number): number;
/**
 * Gets the signed 16 bit value.
 *
 * @param {number} value input value.
 * @returns {number} unsigned value.
 */
export declare function _toSigned16(value: number): number;
/**
 * Gets the signed 32 bit value.
 *
 * @param {number} value input value.
 * @returns {number} unsigned value.
 */
export declare function _toSigned32(value: number): number;
/**
 * Copy values from one array to another.
 *
 * @param {number[]} target destination array.
 * @param {number} at target index.
 * @param {number[]} source source array.
 * @param {number} start start index.
 * @param {number} end end index.
 * @returns {void} Returns nothing.
 */
export declare function _copyRange(target: number[], at: number, source: number[], start?: number, end?: number): void;
/**
 * Checks the type of the image using header bytes.
 *
 * @param {Uint8Array} imageData image data.
 * @param {number[]} header header bytes.
 * @returns {boolean} Header matched or not.
 */
export declare function _checkType(imageData: Uint8Array, header: number[]): boolean;
/**
 * Gets the image decoder.
 *
 * @param {Uint8Array} imageData image data.
 * @returns {_ImageDecoder} Image decoder.
 */
export declare function _getDecoder(imageData: Uint8Array): _ImageDecoder;
/**
 * Gets the page rotation.
 *
 * @param {PdfPage} page Page.
 * @param {number} height Height.
 * @param {number} left Left.
 * @returns {number} Page rotation.
 */
export declare function _checkRotation(page: PdfPage, height: number, left: number): number;
/**
 * Gets the page index.
 *
 * @param {PdfDocument} loadedDocument Loaded document.
 * @param {_PdfDictionary} pageDictionary Page dictionary.
 * @returns {number} Page index.
 */
export declare function _getPageIndex(loadedDocument: PdfDocument, pageDictionary: _PdfDictionary): number;
/**
 * Convert string value from annotation flag
 *
 * @private
 * @param {PdfAnnotationFlag} flag Annotation flag.
 * @returns {string} Valid string to write into XML.
 */
export declare function _annotationFlagsToString(flag: PdfAnnotationFlag): string;
/**
 * Convert string value to annotation flag
 *
 * @private
 * @param {string} flag String value to map
 * @returns {PdfAnnotationFlag} Annotation flag
 */
export declare function _stringToAnnotationFlags(flag: string): PdfAnnotationFlag;
/**
 * Convert string value to byte array
 *
 * @private
 * @param {string} value string value.
 * @returns {string} Valid string to write into PDF.
 */
export declare function _stringToPdfString(value: string): string;
/**
 * Convert string value to byte array
 *
 * @private
 * @param {string} value string value.
 * @param {boolean} isDirect Whether to return a number[] or Uint8Array.
 * @param {boolean} isPassword Whether the string is a password.
 * @param {number[]} destination Destination array.
 * @returns {number[] | Uint8Array} Byte array
 */
export declare function _stringToBytes(value: string, isDirect?: boolean, isPassword?: boolean, destination?: number[]): number[] | Uint8Array;
/**
 * Check equal or not.
 *
 * @private
 * @param {number[]} first byte array.
 * @param {number[]} second byte array.
 * @returns {boolean} Equal or not
 */
export declare function _areArrayEqual(first: Uint8Array | number[], second: Uint8Array | number[]): boolean;
/**
 * Convert number to string as round value with fixed decimal points 2.
 *
 * @private
 * @param {number[]} value number value.
 * @returns {boolean} Equal string.
 */
export declare function _numberToString(value: number): string;
/**
 * Check whether entries in two array are equal or not.
 *
 * @private
 * @param {number[]} value first array.
 * @param {number[]} current second array.
 * @returns {boolean} Return true if for each elements are equal in both array.
 */
export declare function _areNotEqual(value: number[], current: number[]): boolean;
/**
 * Process bytes and convert as string.
 *
 * @private
 * @param {Uint8Array} bytes Input data.
 * @param {boolean} isJson Whether is json or xfdf.
 * @returns {string} String value processed from input bytes.
 */
export declare function _bytesToString(bytes: Uint8Array, isJson?: boolean): string;
/**
 * Decode unicode string.
 *
 * @private
 * @param {Uint8Array} bytes Input data.
 * @returns {string} String value processed from input bytes.
 */
export declare function _decodeUnicodeBytes(bytes: Uint8Array): string;
/**
 * Convert string to unicode array.
 *
 * @private
 * @param {string} value string value.
 * @returns {Uint8Array} unicode array
 */
export declare function _stringToUnicodeArray(value: string): Uint8Array;
/**
 * Convert byte array to hex string.
 *
 * @private
 * @param {Uint8Array} byteArray Byte array.
 * @returns {string} Hex string.
 */
export declare function _byteArrayToHexString(byteArray: Uint8Array): string;
/**
 * Convert hex string to byte array.
 *
 * @private
 * @param {string} hexString Hex string.
 * @param {boolean} isDirect Whether to return object or number[]. Default is false.
 * @returns {Uint8Array | number[]} Byte array.
 */
export declare function _hexStringToByteArray(hexString: string, isDirect?: boolean): Uint8Array | number[];
/**
 * Convert hex string to normal string.
 *
 * @private
 * @param {string} hexString Hex string.
 * @returns {string} Normal string.
 */
export declare function _hexStringToString(hexString: string): string;
/**
 * Check whether the character code is white space.
 *
 * @private
 * @param {number} ch The character code to check.
 * @returns {boolean} True if the character is space, otherwise false.
 */
export declare function _isWhiteSpace(ch: number): boolean;
/**
 * Decode bytes from base64 string.
 *
 * @private
 * @param {string} input The base64 string to decode.
 * @param {boolean} isDirect Whether to return object or number[]. Default is false.
 * @returns {Uint8Array | number[]} Decoded bytes.
 */
export declare function _decode(input: string, isDirect?: boolean): Uint8Array | number[];
/**
 * Encode bytes to base64 string.
 *
 * @private
 * @param {Uint8Array} bytes Bytes to encode.
 * @returns {string} Decoded string.
 */
export declare function _encode(bytes: Uint8Array): string;
/**
 * Get property value in inheritable mode.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @param {string} key Input dictionary.
 * @param {boolean} isArray Search array.
 * @param {boolean} stopWhenFound Stop when found.
 * @param {string[]} parentKey Key string for parent node.
 * @returns {any} Property value.
 */
export declare function _getInheritableProperty(dictionary: _PdfDictionary, key: string, isArray?: boolean, stopWhenFound?: boolean, ...parentKey: string[]): any;
/**
 * Calculate bounds of annotation or field.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @param {boolean} isWidget Input page.
 * @returns {any} Bounds value.
 */
export declare function _parseRectangle(dictionary: _PdfDictionary, isWidget?: boolean): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Calculate bounds of annotation or field.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @param {string} page Input page.
 * @returns {any} Bounds value.
 */
export declare function _calculateBounds(dictionary: _PdfDictionary, page: PdfPage): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Calculate bounds of annotation or field.
 *
 * @private
 * @param {number[]} value array value.
 * @returns {any} Rectangle value.
 */
export declare function _toRectangle(value: number[]): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Calculate bounds of annotation or field.
 *
 * @private
 * @param {any} value Rectangle value.
 * @param {any} value.x X value.
 * @param {any} value.y Y value.
 * @param {any} value.width Width value.
 * @param {any} value.height Height value.
 * @returns {number[]} Bounds value.
 */
export declare function _fromRectangle(value: {
    x: number;
    y: number;
    width: number;
    height: number;
}): number[];
/**
 * Calculate bounds of annotation or field.
 *
 * @private
 * @param {number[]} value Input dictionary.
 * @param {string} page Input page.
 * @returns {number[]} Bounds value.
 */
export declare function _getUpdatedBounds(value: number[], page?: PdfPage): number[];
/**
 * Parse RGB color.
 *
 * @private
 * @param {string} colorString Color value in string format.
 * @returns {number[]} RGB color value.
 */
export declare function _convertToColor(colorString: string): number[];
/**
 * Parse RGB color.
 *
 * @private
 * @param {number[]} array Color array in dictionary.
 * @returns {number[]} RGB color value.
 */
export declare function _parseColor(array: number[]): number[];
/**
 * Get the border style in _PdfName.
 *
 * @private
 * @param {PdfBorderStyle} style border style in enum.
 * @returns {_PdfName} border style in _PdfName.
 */
export declare function _mapBorderStyle(style: PdfBorderStyle): _PdfName;
/**
 * Get the border effect style in _PdfName.
 *
 * @private
 * @param {string} style border effect style as string.
 * @returns {PdfBorderEffectStyle} border effect style.
 */
export declare function _mapBorderEffectStyle(style: string): PdfBorderEffectStyle;
/**
 * Get the string value for line ending style.
 *
 * @private
 * @param {PdfLineEndingStyle} style style in enum.
 * @returns {string} value default None.
 */
export declare function _reverseMapEndingStyle(style: PdfLineEndingStyle): string;
/**
 * Get the enum value for line ending style.
 *
 * @private
 * @param {string} style Style value in string.
 * @param {PdfLineEndingStyle} defaultValue Default style value to return.
 * @returns {PdfLineEndingStyle} enum value default 0.
 */
export declare function _mapLineEndingStyle(style: string, defaultValue?: PdfLineEndingStyle): PdfLineEndingStyle;
/**
 * Get highlight mode.
 *
 * @private
 * @param {string} mode Mode entry in dictionary.
 * @returns {PdfHighlightMode} Highlight mode.
 */
export declare function _mapHighlightMode(mode: string): PdfHighlightMode;
/**
 * Get highlight mode as string.
 *
 * @private
 * @param {PdfHighlightMode} mode Mode entry.
 * @returns {_PdfName} Highlight mode as PDF name.
 */
export declare function _reverseMapHighlightMode(mode: PdfHighlightMode): _PdfName;
/**
 * Reverse map blend mode.
 *
 * @private
 * @param {PdfBlendMode} mode Mode entry.
 * @returns {_PdfName} Blend mode as name.
 */
export declare function _reverseMapBlendMode(mode: PdfBlendMode): _PdfName;
/**
 * Map blend mode.
 *
 * @private
 * @param {_PdfName} token Blend mode as name.
 * @returns {PdfBlendMode} Mode value;
 */
export declare function _mapBlendMode(token: _PdfName): PdfBlendMode;
/**
 * Convert float to string.
 *
 * @private
 * @param {number} value number value.
 * @returns {string} equal fixed length string value;
 */
export declare function _floatToString(value: number): string;
/**
 * Check and add proc set value.
 *
 * @private
 * @param {string} value entry.
 * @param {_PdfDictionary} dictionary source dictionary.
 * @returns {void} Nothing;
 */
export declare function _addProcSet(value: string, dictionary: _PdfDictionary): void;
/**
 * Get new GUID string.
 *
 * @private
 * @returns {string} A new GUID string;
 */
export declare function _getNewGuidString(): string;
/**
 * Escape PDF name.
 *
 * @private
 * @param {string} value name value.
 * @returns {string} equal and processed name value;
 */
export declare function _escapePdfName(value: string): string;
/**
 * Calculate bezier arc points.
 *
 * @private
 * @param {number} x1 value.
 * @param {number} y1 value.
 * @param {number} x2 value.
 * @param {number} y2 value.
 * @param {number} start value.
 * @param {number} extent value.
 * @returns {number[]} bezier arc points;
 */
export declare function _getBezierArc(x1: number, y1: number, x2: number, y2: number, start: number, extent: number): number[];
/**
 * Find page of the annotation.
 *
 * @private
 * @param {PdfDocument} document PDF document.
 * @param {_PdfReference} reference Annotation reference.
 * @returns {PdfPage} Page of the annotation;
 */
export declare function _findPage(document: PdfDocument, reference: _PdfReference): PdfPage;
/**
 * Check the field is checked or not.
 *
 * @private
 * @param {_PdfDictionary} dictionary PDF dictionary.
 * @returns {boolean} True if the field is checked, otherwise false;
 */
export declare function _checkField(dictionary: _PdfDictionary): boolean;
/**
 * Get item value from state item field.
 *
 * @private
 * @param {_PdfDictionary} itemDictionary PDF document.
 * @returns {string} value of item;
 */
export declare function _getItemValue(itemDictionary: _PdfDictionary): string;
/**
 * Get state item template.
 *
 * @private
 * @param {_PdfCheckFieldState} state Check field state.
 * @param {PdfStateItem | PdfField} item source to check.
 * @returns {PdfTemplate} Appearance template;
 */
export declare function _getStateTemplate(state: _PdfCheckFieldState, item: PdfStateItem | PdfField): PdfTemplate;
/**
 * Get color value
 *
 * @private
 * @param {string} colorName name of the color.
 * @returns {number[]} return color value as number array.
 */
export declare function _getColorValue(colorName: string): number[];
/**
 * Update box value in template bounds.
 *
 * @private
 * @param {PdfTemplate} template Template object.
 * @param {number} angle Angle value.
 * @returns {void} Nothing.
 */
export declare function _setMatrix(template: PdfTemplate, angle?: number): void;
/**
 * Get the state item style to string
 *
 * @private
 * @param {PdfCheckBoxStyle} style State item style.
 * @returns {string} return as string value.
 */
export declare function _styleToString(style: PdfCheckBoxStyle): string;
/**
 * Get the string to state item style
 *
 * @private
 * @param {string} style State item style as string.
 * @returns {PdfCheckBoxStyle} return as state item style.
 */
export declare function _stringToStyle(style: string): PdfCheckBoxStyle;
/**
 * Map measurement unit type.
 *
 * @private
 * @param {string} unitString measurement unit as string.
 * @returns {PdfMeasurementUnit} measurement unit.
 */
export declare function _mapMeasurementUnit(unitString: string): PdfMeasurementUnit;
/**
 * Map markup annotation type.
 *
 * @private
 * @param {string} text markup type as string.
 * @returns {PdfTextMarkupAnnotationType} markup type as name.
 */
export declare function _mapMarkupAnnotationType(text: string): PdfTextMarkupAnnotationType;
/**
 * Reverse text markup annotation type.
 *
 * @private
 * @param {PdfTextMarkupAnnotationType} type markup type.
 * @returns {string} markup type as name.
 */
export declare function _reverseMarkupAnnotationType(type: PdfTextMarkupAnnotationType): string;
/**
 * Map graphics unit.
 *
 * @private
 * @param {string} unitString String value.
 * @returns {_PdfGraphicsUnit} PDF graphics unit.
 */
export declare function _mapGraphicsUnit(unitString: string): _PdfGraphicsUnit;
/**
 * Map rubber stamp icon.
 *
 * @param {string} iconString String value.
 * @returns {PdfRubberStampAnnotationIcon} Rubber stamp icon.
 */
export declare function _mapRubberStampIcon(iconString: string): PdfRubberStampAnnotationIcon;
/**
 * Map popup icon.
 *
 * @private
 * @param {string} iconString String value.
 * @returns {PdfRubberStampAnnotationIcon} Popup icon.
 */
export declare function _mapPopupIcon(iconString: string): PdfPopupIcon;
/**
 * Convert annotation state to string value.
 *
 * @private
 * @param {PdfAnnotationState} type Annotation state.
 * @returns {string} String value.
 */
export declare function _reverseMapAnnotationState(type: PdfAnnotationState): string;
/**
 * Convert string value to annotation state.
 *
 * @private
 * @param {string} type String value.
 * @returns {PdfAnnotationState} Annotation state.
 */
export declare function _mapAnnotationState(type: string): PdfAnnotationState;
/**
 * Convert annotation state model to string value.
 *
 * @private
 * @param {PdfAnnotationStateModel} type Annotation state model.
 * @returns {string} String value.
 */
export declare function _reverseMapAnnotationStateModel(type: PdfAnnotationStateModel): string;
/**
 * Convert string value to annotation state model.
 *
 * @private
 * @param {string} type String value.
 * @returns {PdfAnnotationStateModel} Annotation state model.
 */
export declare function _mapAnnotationStateModel(type: string): PdfAnnotationStateModel;
/**
 * Map attachment icon.
 *
 * @private
 * @param {string} iconString String value.
 * @returns {PdfAttachmentIcon} Icon.
 */
export declare function _mapAttachmentIcon(iconString: string): PdfAttachmentIcon;
/**
 * Map attachment intent.
 *
 * @private
 * @param {string} intentString String value.
 * @returns {PdfAnnotationIntent} intent.
 */
export declare function _mapAnnotationIntent(intentString: string): PdfAnnotationIntent;
/**
 * Convert PDF font style to string value.
 *
 * @private
 * @param {PdfFontStyle} style Font style.
 * @returns {string} String value.
 */
export declare function _reverseMapPdfFontStyle(style: PdfFontStyle): string;
/**
 * Get special character.
 *
 * @private
 * @param {string} input Input string.
 * @returns {string} String value.
 */
export declare function _getSpecialCharacter(input: string): string;
/**
 * Get latin character.
 *
 * @private
 * @param {string} input Input string.
 * @returns {string} String value.
 */
export declare function _getLatinCharacter(input: string): string;
/**
 * Encode value to string.
 *
 * @private
 * @param {string} value Input string.
 * @returns {string} result.
 */
export declare function _encodeValue(value: string): string;
/**
 * Parse and retrieve comments and review history from the annotation.
 *
 * @private
 * @param {PdfComment} annotation Input annotation.
 * @param {boolean} isReview Input is review or not.
 * @returns {PdfPopupAnnotationCollection} result.
 */
export declare function _getCommentsOrReview(annotation: PdfComment, isReview: boolean): PdfPopupAnnotationCollection;
/**
 * Returns true if input dictionary is belongs to the review history.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @returns {boolean} Input is review or not.
 */
export declare function _checkReview(dictionary: _PdfDictionary): boolean;
/**
 * Returns true if input dictionary is belongs to the comments.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @returns {boolean} Input is comments or not.
 */
export declare function _checkComment(dictionary: _PdfDictionary): boolean;
/**
 * Update visibility.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @param {PdfFormFieldVisibility} value Visibility.
 * @returns {void} Nothing.
 */
export declare function _updateVisibility(dictionary: _PdfDictionary, value: PdfFormFieldVisibility): void;
/**
 * Remove duplicate reference.
 *
 * @private
 * @param {_PdfDictionary} dictionary Input dictionary.
 * @param {_PdfCrossReference} crossTable Cross reference table.
 * @param {string} key Key string for appearance type.
 * @returns {void} Nothing.
 */
export declare function _removeDuplicateReference(dictionary: _PdfDictionary, crossTable: _PdfCrossReference, key: string): void;
/**
 * Remove duplicate reference from resources.
 *
 * @private
 * @param {_PdfDictionary} resources Input resources.
 * @param {_PdfCrossReference} crossTable Cross reference table.
 * @returns {void} Nothing.
 */
export declare function _removeDuplicateFromResources(resources: _PdfDictionary, crossTable: _PdfCrossReference): void;
/**
 * Remove duplicate reference.
 *
 * @private
 * @param {any} normal Input.
 * @param {_PdfCrossReference} crossReference Cross reference table.
 * @param {string} firstKey Key string for appearance type.
 * @param {string} secondKey Key string for appearance type.
 * @returns {void} Nothing.
 */
export declare function _removeReferences(normal: any, crossReference: _PdfCrossReference, firstKey: string, secondKey: string): void;
export declare class BaseException {
    message: string;
    name: string;
    constructor(message: string, name: string);
}
export declare class FormatError extends BaseException {
    constructor(message: string);
}
export declare class ParserEndOfFileException extends BaseException {
    constructor(message: string);
}
/**
 * Gets the default string.
 *
 * @param {string} item Input string.
 * @returns {string} result.
 */
export declare function _defaultToString(item: string | number | string[] | number[] | Object | Object[] | boolean): string;
/**
 * Gets the form field font.
 *
 * @param {PdfForm} form form.
 * @param {PdfWidgetAnnotation} widget widget annotation.
 * @param {PdfField} field field.
 * @returns {PdfFont} font.
 */
export declare function _obtainFontDetails(form: PdfForm, widget: PdfWidgetAnnotation, field: PdfField): PdfFont;
/**
 * Gets the font style.
 *
 * @param {string} fontFamilyString Font family string.
 * @returns {PdfFontStyle} result.
 */
export declare function _getFontStyle(fontFamilyString: string): PdfFontStyle;
/**
 * Map the font.
 *
 * @param {string} name Font name.
 * @param {number} size Font size.
 * @param {PdfFontStyle} style Font style.
 * @param {PdfAnnotation} annotation Annotation or Field.
 * @returns {PdfFont} result.
 */
export declare function _mapFont(name: string, size: number, style: PdfFontStyle, annotation: PdfAnnotation | PdfField): PdfFont;
/**
 * Gets the font stream.
 *
 * @param {_PdfDictionary} widgetDictionary Widget dictionary.
 * @param {_PdfCrossReference} crossReference Cross reference.
 * @param {PdfAnnotation} annotation Annotation.
 * @returns {Uint8Array} result.
 */
export declare function _tryParseFontStream(widgetDictionary: _PdfDictionary, crossReference: _PdfCrossReference, annotation: PdfAnnotation | PdfField): Uint8Array;
/**
 * Gets the boolean if two arrays are equal.
 *
 * @param {Array<number[]>} inkPointsCollection Ink points collection.
 * @param {Array<number[]>} previousCollection Previous collection.
 * @returns {boolean} result.
 */
export declare function _checkInkPoints(inkPointsCollection: Array<number[]>, previousCollection: Array<number[]>): boolean;
/**
 * Gets the Destination.
 *
 * @param {_PdfDictionary} dictionary widget dictionary.
 * @param {string} key bookmark or action dictionary key.
 * @returns {PdfDestination} destination.
 */
export declare function _obtainDestination(dictionary: _PdfDictionary, key: string): PdfDestination;
/**
 * Update the annotation bounds.
 *
 * @param {PdfAnnotation} annotation annotation.
 * @param {number[]} bounds annotation bounds.
 * @returns {number[]} bounds.
 */
export declare function _updateBounds(annotation: PdfAnnotation, bounds?: number[]): number[];
/**
 * Decode text.
 *
 * @param {string} text Text to decode.
 * @param {boolean} isColorSpace Color space or not
 * @param {boolean} isPassword Password or not
 * @returns {string} Decoded text.
 */
export declare function _decodeText(text: string, isColorSpace: boolean, isPassword: boolean): string;
/**
 * Number of bytes required to save the number.
 *
 * @param {number} input number.
 * @returns {number} number of bytes.
 */
export declare function _getSize(input: number): number;
/**
 * Convert the string to big endian bytes.
 *
 * @param {string} input string.
 * @returns {number[]} bytes.
 */
export declare function _stringToBigEndianBytes(input: string): number[];
/**
 * Convert number respect to ordered list number style.
 *
 * @param {number} intArabic Input value.
 * @param {PdfNumberStyle} numberStyle Number style.
 * @returns {string} String value.
 */
export declare function _convertNumber(intArabic: number, numberStyle: PdfNumberStyle): string;
/**
 * Convert arabic numbers to roman style.
 *
 * @param {number} intArabic Input value.
 * @returns {string} String value.
 */
export declare function _arabicToRoman(intArabic: number): string;
/**
 * Convert arabic numbers to alphabet.
 *
 * @param {number} arabic Input value.
 * @returns {string} String value.
 */
export declare function _arabicToLetter(arabic: number): string;
/**
 * Convert character code to string.
 *
 * @param {number} value Input value.
 * @returns {string} String value.
 */
export declare function _appendChar(value: number): string;
/**
 * Check whether the value is null or undefined.
 *
 * @param {any} value Input value.
 * @returns {boolean} Return true if the value is null or undefined; otherwise, return false
 */
export declare function _isNullOrUndefined(value: any): boolean;
/**
 * Compare two arrays of numbers to determine if they are equal.
 *
 * This function checks if two arrays have the same length and
 * identical elements in the same order.
 *
 * @param {number[]} arr1 - The first array to compare.
 * @param {number[]} arr2 - The second array to compare.
 * @returns {boolean} 'true' if the arrays are equal, otherwise 'false'.
 */
export declare function _isArrayEqual(arr1: number[], arr2: number[]): boolean;
/**
 * Defines a property on an object with specific attributes.
 *
 * @param {Object} obj - The target object on which the property will be defined.
 * @param {string} prop - The name of the property to define.
 * @param {any} value - The value to assign to the property.
 * @param {boolean} [serializable = false] - If true, the property will not be enumerable.
 * @returns {any} The value of the property that was defined.
 *
 */
export declare function _defineProperty(obj: any, prop: string, value: any, serializable?: boolean): any;
/**
 * Compresses the content of a PDFBaseStream
 *
 * @param {_PdfBaseStream} stream - Base stream to compress.
 * @param {boolean} isExport - Denotes compress the stream as a hex-encoded string.
 * @returns {boolean} compressed string.
 */
export declare function _compressStream(stream: _PdfBaseStream, isExport?: boolean): string;
/**
 * Check whether the input string contains any right-to-left (RTL) characters.
 *
 * @param {string} input The input string.
 * @returns {boolean} Returns true if the string contains any RTL characters; otherwise, returns false.
 */
export declare function _isRightToLeftCharacters(input: string): boolean;
/**
 * Updates the page count value in the dictionary
 *
 * @param {_PdfDictionary} dictionary - Dictionary to update page count.
 * @param {number} valueToIncrement - Page count.
 * @returns {void} Nothing.
 */
export declare function _updatePageCount(dictionary: _PdfDictionary, valueToIncrement: number): void;
/**
 * Updates the page settings in the dictionary
 *
 * @param {_PdfDictionary} dictionary - Dictionary to update page settings.
 * @param {PdfPageSettings} settings - PDF page settings.
 * @returns {void} Nothing.
 */
export declare function _updatePageSettings(dictionary: _PdfDictionary, settings: PdfPageSettings): void;
/**
 * Base64 encoded string representing an empty PDF document.
 */
export declare const _emptyPdfData: string;
