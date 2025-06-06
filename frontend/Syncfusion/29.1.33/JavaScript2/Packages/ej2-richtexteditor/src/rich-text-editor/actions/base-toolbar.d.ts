import { ItemModel, Toolbar as tool } from '@syncfusion/ej2-navigations';
import { IRichTextEditor, IRenderer, IToolbarRenderOptions, IToolbarItems } from '../base/interface';
import { IToolbarItemModel } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
export declare class BaseToolbar {
    toolbarObj: tool;
    /**
     *
     * @hidden
     * @private
     */
    parent: IRichTextEditor;
    isDestroyed: boolean;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    private tools;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private addEventListener;
    private removeEventListener;
    private setCssClass;
    private setRtl;
    private getClass;
    private getTemplateObject;
    /**
     * getObject method
     *
     * @param {string} item - specifies the string value
     * @param {string} container - specifies the value of string
     * @returns {IToolbarItemModel} - returns the model element
     * @hidden
     * @deprecated
     */
    getObject(item: string, container: string): IToolbarItemModel;
    /**
     * @param {string} tbItems - specifies the string value
     * @param {string} container - specifies the container value
     * @returns {ItemModel} - retunrs the model element
     * @hidden
     * @deprecated
     */
    getItems(tbItems: (string | IToolbarItems)[], container: string): ItemModel[];
    private getToolbarOptions;
    /**
     * render method
     *
     * @param {IToolbarRenderOptions} args - specifies the toolbar options
     * @returns {void}
     * @hidden
     * @deprecated
     */
    render(args: IToolbarRenderOptions): void;
    destroy(): void;
}
