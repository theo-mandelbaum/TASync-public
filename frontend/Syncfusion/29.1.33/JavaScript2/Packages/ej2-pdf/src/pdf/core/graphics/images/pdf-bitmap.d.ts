import { _ImageDecoder } from './../../graphics/images/image-decoder';
import { PdfImage } from './pdf-image';
/**
 * The 'PdfBitmap' contains methods and properties to handle the Bitmap images.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create new image object by using JPEG image data as Base64 string format
 * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
 * //Draw the image.
 * graphics.drawImage(image, 10, 20, 400, 400);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfBitmap extends PdfImage {
    _imageStatus: boolean;
    _checkImageType: number;
    _decoder: _ImageDecoder;
    /**
     * Create an instance for `PdfBitmap` class.
     *
     * @param {string} encodedString Image as Base64 string.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * //Draw the image.
     * graphics.drawImage(image, 10, 20, 400, 400);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(encodedString: string);
    /**
     * Create an instance for `PdfBitmap` class.
     *
     * @param {Uint8Array} encodedString Image data as byte array.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create new image object by using JPEG image data as array of bytes
     * let image: PdfImage = new PdfBitmap(array);
     * //Draw the image.
     * graphics.drawImage(image, 10, 20, 400, 400);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(encodedString: Uint8Array);
    _initializeAsync(encodedString: string): void;
    _initializeAsync(encodedString: Uint8Array): void;
    _save(): void;
    _setColorSpace(): void;
}
