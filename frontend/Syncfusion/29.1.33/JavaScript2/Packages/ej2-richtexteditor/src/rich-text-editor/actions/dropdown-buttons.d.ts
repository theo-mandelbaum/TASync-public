import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { IRichTextEditor, IRenderer, IDropDownRenderArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
export declare class DropDownButtons {
    numberFormatListDropDown: DropDownButton;
    bulletFormatListDropDown: DropDownButton;
    formatDropDown: DropDownButton;
    fontNameDropDown: DropDownButton;
    fontSizeDropDown: DropDownButton;
    alignDropDown: DropDownButton;
    imageAlignDropDown: DropDownButton;
    displayDropDown: DropDownButton;
    tableRowsDropDown: DropDownButton;
    tableColumnsDropDown: DropDownButton;
    tableCellDropDown: DropDownButton;
    tableCellVerticalAlignDropDown: DropDownButton;
    /**
     *
     * @hidden
     * @private
     */
    parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    private i10n;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    private beforeRender;
    private dropdownContent;
    /**
     * renderDropDowns method
     *
     * @param {IDropDownRenderArgs} args - specifies the arguments
     * @returns {void}
     * @hidden
     * @param {HTMLElement} targetEle - specifies the arugument
     * @deprecated
     */
    renderDropDowns(args: IDropDownRenderArgs, targetEle?: HTMLElement): void;
    private getUpdateItems;
    private onPropertyChanged;
    private getEditNode;
    private rowDropDown;
    private columnDropDown;
    private cellDropDown;
    private verticalAlignDropDown;
    private renderDisplayDropDown;
    private renderAlignmentDropDown;
    private tableStylesDropDown;
    private removeDropDownClasses;
    /**
     * destroyDropDowns method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroyDropDowns(): void;
    private setRtl;
    private updateCss;
    private setCssClass;
    protected addEventListener(): void;
    private onIframeMouseDown;
    private closeOpenDropdowns;
    protected removeEventListener(): void;
    destroy(): void;
}
