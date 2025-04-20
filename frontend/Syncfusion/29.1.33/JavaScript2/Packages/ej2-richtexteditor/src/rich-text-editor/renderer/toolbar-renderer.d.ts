import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { TooltipEventArgs } from '@syncfusion/ej2-popups';
import { IRenderer, IRichTextEditor, IToolbarOptions, IDropDownModel, IColorPickerModel } from '../base/interface';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { ServiceLocator } from '../services/service-locator';
/**
 * `Toolbar renderer` module is used to render toolbar in RichTextEditor.
 *
 * @hidden
 * @deprecated
 */
export declare class ToolbarRenderer implements IRenderer {
    private mode;
    private toolbarPanel;
    /**
     *
     * @hidden
     * @private
     */
    parent: IRichTextEditor;
    private currentElement;
    private currentDropdown;
    private tooltip;
    private l10n;
    private tooltipTargetEle;
    isDestroyed: boolean;
    isEscapeKey: boolean;
    /**
     * Constructor for toolbar renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     */
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private wireEvent;
    private destroyTooltip;
    private unWireEvent;
    private toolbarBeforeCreate;
    private toolbarCreated;
    private extendedToolbarMouseDownHandler;
    private toolbarClicked;
    private dropDownSelected;
    private beforeDropDownItemRender;
    private tooltipBeforeRender;
    private dropDownOpen;
    private dropDownClose;
    private dropDownBeforeClose;
    /**
     * renderToolbar method
     *
     * @param {IToolbarOptions} args - specifies the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderToolbar(args: IToolbarOptions): void;
    tooltipBeforeOpen(args: TooltipEventArgs): void;
    /**
     * renderDropDownButton method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderDropDownButton(args: IDropDownModel): DropDownButton;
    private mouseOutHandler;
    private closeTooltip;
    /**
     * renderListDropDown method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderListDropDown(args: IDropDownModel): DropDownButton;
    private paletteSelection;
    /**
     * renderColorPickerDropDown method
     *
     * @param {IColorPickerModel} args - specifies the arguments.
     * @param {string} item - specifies the item.
     * @param {ColorPicker} colorPicker - specifies the colorpicker.
     * @param {string} defaultColor -specifies the defaultColor.
     * @param {string} toolbarType - Specifies the type of toolbar triggering the color picker.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderColorPickerDropDown(args: IColorPickerModel, item: string, colorPicker: ColorPicker, defaultColor: string, toolbarType?: string): DropDownButton;
    private pickerRefresh;
    private setColorPickerContentWidth;
    /**
     * renderColorPicker method
     *
     * @param {IColorPickerModel} args - specifies the arguments
     * @param {string} item - specifies the string values
     * @param {string} toolbarType - Specifies the type of toolbar triggering the color picker.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderColorPicker(args: IColorPickerModel, item: string, toolbarType?: string): ColorPicker;
    /**
     * The function is used to render Rich Text Editor toolbar
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderPanel(): void;
    /**
     * Get the toolbar element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    getPanel(): Element;
    /**
     * Set the toolbar element of RichTextEditor
     *
     * @returns {void}
     * @param  {Element} panel - specifies the element.
     * @hidden
     * @deprecated
     */
    setPanel(panel: Element): void;
    destroy(): void;
}
