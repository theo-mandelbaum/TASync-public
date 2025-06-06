import { IFormatPainterEditor, IFormatPainterSettings } from '../base';
import { EditorManager } from '../base';
export declare class FormatPainterActions implements IFormatPainterEditor {
    private INVALID_TAGS;
    private parent;
    private copyCollection;
    private deniedFormatsCollection;
    private newElem;
    private newElemLastChild;
    private settings;
    constructor(parent?: EditorManager, options?: IFormatPainterSettings);
    private addEventListener;
    private onPropertyChanged;
    private removeEventListener;
    /**
     * Destroys the format painter.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private actionHandler;
    private callBack;
    private generateElement;
    private pasteAction;
    private removeDeniedFormats;
    private copyAction;
    private getRangeParentElem;
    private getNearestBlockParentElement;
    private isBlockElement;
    private escapeAction;
    private paintPlainTextFormat;
    private validateELementTag;
    private findCurrentContext;
    private insertFormatNode;
    private isListCopied;
    private insertBlockNode;
    private insertNewList;
    private insertSameList;
    private isSameListType;
    private cleanEmptyLists;
    private setDeniedFormats;
    private detachEmptyBlockNodes;
    private makeDeniedFormatsCollection;
}
