import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { IRichTextEditor } from '../base/interface';
import { IUpdateItemsModel } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
import { BaseToolbar } from './base-toolbar';
import { DropDownButtons } from './dropdown-buttons';
import { RichTextEditorModel } from '../base/rich-text-editor-model';
import { ColorPickerInput } from './color-picker';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
export declare class Toolbar {
    isDestroyed: boolean;
    toolbarObj: tool;
    private editPanel;
    private isToolbar;
    private editableElement;
    private tbItems;
    baseToolbar: BaseToolbar;
    private tbElement;
    private tbWrapper;
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    private isTransformChild;
    private contentRenderer;
    dropDownModule: DropDownButtons;
    colorPickerModule: ColorPickerInput;
    private toolbarActionModule;
    protected renderFactory: RendererFactory;
    private keyBoardModule;
    private tools;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    private toolbarBindEvent;
    private toolBarKeyDown;
    private createToolbarElement;
    private getToolbarMode;
    private checkToolbarResponsive;
    private checkIsTransformChild;
    private toggleFloatClass;
    private renderToolbar;
    /**
     * addFixedTBarClass method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    addFixedTBarClass(): void;
    /**
     * removeFixedTBarClass method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    removeFixedTBarClass(): void;
    private showFixedTBar;
    private hideFixedTBar;
    /**
     * updateItem method
     *
     * @param {IUpdateItemsModel} args - specifies the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    updateItem(args: IUpdateItemsModel): void;
    private updateToolbarStatus;
    private fullScreen;
    private hideScreen;
    /**
     * getBaseToolbar method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getBaseToolbar(): BaseToolbar;
    /**
     * addTBarItem method
     *
     * @param {IUpdateItemsModel} args - specifies the arguments.
     * @param {number} index - specifies the index value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    addTBarItem(args: IUpdateItemsModel, index: number): void;
    /**
     * enableTBarItems method
     *
     * @param {BaseToolbar} baseToolbar - specifies the toolbar.
     * @param {string} items - specifies the string value.
     * @param {boolean} isEnable - specifies the boolean value.
     * @param {boolean} muteToolbarUpdate - specifies the toolbar.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    enableTBarItems(baseToolbar: BaseToolbar, items: string | string[], isEnable: boolean, muteToolbarUpdate?: boolean): void;
    /**
     * removeTBarItems method
     *
     * @param {string} items - specifies the string value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    removeTBarItems(items: string | string[]): void;
    /**
     * getExpandTBarPopHeight method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getExpandTBarPopHeight(): number;
    /**
     * getToolbarHeight method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getToolbarHeight(): number;
    /**
     * getToolbarElement method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getToolbarElement(): Element;
    /**
     * refreshToolbarOverflow method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    refreshToolbarOverflow(): void;
    private isToolbarDestroyed;
    private destroyToolbar;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private mouseDownHandler;
    private focusChangeHandler;
    private dropDownBeforeOpenHandler;
    private tbFocusHandler;
    protected wireEvents(): void;
    protected unWireEvents(): void;
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private setCssClass;
    private onRefresh;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the string value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    protected onPropertyChanged(e: {
        [key: string]: RichTextEditorModel;
    }): void;
    private refreshToolbar;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
    private renderColorPicker;
}
