import { EditorManager } from '../base/editor-manager';
/**
 * PasteCleanup for MsWord content
 *
 * @hidden
 * @deprecated
 */
export declare class MsWordPaste {
    private parent;
    constructor(parent?: EditorManager);
    private olData;
    private ulData;
    private ignorableNodes;
    private blockNode;
    private borderStyle;
    private upperRomanNumber;
    private lowerRomanNumber;
    private lowerGreekNumber;
    private removableElements;
    private listContents;
    private addEventListener;
    private removeEventListener;
    private cropImageDimensions;
    private wordCleanup;
    private addDoubleBr;
    private cleanList;
    private insertAfter;
    private findClosestListElem;
    private addListClass;
    private addTableBorderClass;
    private imageConversion;
    private checkVShape;
    private convertToBase64;
    private conBytesToBase64;
    private conHexStringToBytes;
    private hexConversion;
    private extractCropValue;
    private removeClassName;
    private breakLineAddition;
    private findDetachElem;
    private removeUnwantedElements;
    private findDetachEmptyElem;
    private hasParentWithClass;
    private removeEmptyElements;
    private removeEmptyMetaTags;
    private styleCorrection;
    private filterStyles;
    private removeUnwantedStyle;
    private findStyleObject;
    private removingComments;
    private cleanUp;
    private listConverter;
    private getlistStyleType;
    private makeConversion;
    private getListContent;
    private processMargin;
    private removeEmptyAnchorTag;
    private findSource;
    private handleOneNoteContent;
    destroy(): void;
}
