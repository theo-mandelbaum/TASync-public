import { IRichTextEditor } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
import { Popup } from '@syncfusion/ej2-popups';
export declare class EmojiPicker {
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected renderFactory: RendererFactory;
    popupObj: Popup;
    private popDiv;
    private save;
    private clickEvent;
    private divElement;
    private i10n;
    private isDestroyed;
    isPopupDestroyed: boolean;
    noResultsFoundCount: number;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    /**
     * Destroys the Count.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    childDestroy(): void;
    protected addEventListener(): void;
    private toolbarClick;
    private onIframeMouseDown;
    private buttoncode;
    private docClick;
    private scrollEvent;
    private contentscroll;
    private emojiToolbarClick;
    private onKeyDown;
    private filterKeyHandler;
    private searchFilter;
    private emojiBtnClick;
    private onkeyPress;
    private onkeyUp;
    private getCoordinates;
    protected removeEventListener(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     */
    private getModuleName;
}
