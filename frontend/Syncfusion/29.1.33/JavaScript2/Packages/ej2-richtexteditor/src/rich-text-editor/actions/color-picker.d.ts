import { IRichTextEditor, IRenderer, IColorPickerRenderArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/**
 * `Color Picker` module is used to handle ColorPicker actions.
 */
export declare class ColorPickerInput {
    private defaultColorPicker;
    private fontColorPicker;
    private backgroundColorPicker;
    /**
     * @hidden
     */
    fontColorDropDown: DropDownButton;
    /**
     * @hidden
     */
    backgroundColorDropDown: DropDownButton;
    protected parent: IRichTextEditor;
    protected locator: ServiceLocator;
    protected toolbarRenderer: IRenderer;
    protected renderFactory: RendererFactory;
    private tools;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private initializeInstance;
    /**
     * renderColorPickerInput method
     *
     * @param {IColorPickerRenderArgs} args - specify the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderColorPickerInput(args: IColorPickerRenderArgs): void;
    destroy(): void;
    /**
     * destroyColorPicker method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroyColorPicker(): void;
    private setRtl;
    private setCssClass;
    private updateCss;
    protected addEventListener(): void;
    private showColorPicker;
    private onPropertyChanged;
    protected removeEventListener(): void;
}
