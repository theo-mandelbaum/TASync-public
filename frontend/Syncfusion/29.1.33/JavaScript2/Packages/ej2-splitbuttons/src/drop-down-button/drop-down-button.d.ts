import { EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { Component, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { MenuEventArgs, BeforeOpenCloseMenuEventArgs, OpenCloseMenuEventArgs, DropDownAnimationEffect } from './../common/common';
import { SplitButtonIconPosition } from './../common/common';
import { ItemModel } from './../common/common-model';
import { DropDownButtonModel, DropDownMenuAnimationSettingsModel } from './drop-down-button-model';
/**
 * Animation configuration settings.
 */
export declare class DropDownMenuAnimationSettings extends ChildProperty<DropDownMenuAnimationSettings> {
    /**
     * Specifies the animation effect applied when the DropDownMenu is shown.
     * The possible effects are:
     * * None: Specifies that the DropDownMenu appears without any animation effect.
     * * SlideDown: Specifies that the DropDownMenu appears with a slide down effect.
     * * ZoomIn: Specifies that the DropDownMenu appears with a zoom in effect.
     * * FadeIn: Specifies that the DropDownMenu appears with a fade in effect.
     *
     * @default 'SlideDown'
     * @isEnumeration true
     */
    effect: DropDownAnimationEffect;
    /**
     * Specifies the time duration (in milliseconds) of the animation effect when the DropDownMenu is displayed.
     *
     * @default 400
     */
    duration: number;
    /**
     * Specifies the easing function applied during the animation effect of the DropDownMenu.
     *
     * @default 'ease'
     */
    easing: string;
}
/**
 * DropDownButton component is used to toggle contextual overlays for displaying list of action items.
 * It can contain both text and images.
 * ```html
 * <button id="element">DropDownButton</button>
 * ```
 * ```typescript
 * <script>
 * var dropDownButtonObj = new DropDownButton({items: [{ text: 'Action1' }, { text: 'Action2' },{ text: 'Action3' }]);
 * dropDownButtonObj.appendTo("#element");
 * </script>
 * ```
 */
export declare class DropDownButton extends Component<HTMLButtonElement> implements INotifyPropertyChanged {
    /** @hidden */
    dropDown: Popup;
    protected button: Button;
    /** @hidden */
    activeElem: HTMLElement[];
    private rippleFn;
    private delegateMousedownHandler;
    private isPopupCreated;
    private popupContent;
    /**
     * Defines the content of the DropDownButton element that can either be a text or HTML elements.
     *
     * @default ""
     */
    content: string;
    /**
     * Defines class/multiple classes separated by a space in the DropDownButton element. The
     * DropDownButton size and styles can be customized by using this.
     *
     * @default ""
     */
    cssClass: string;
    /**
     * Specifies a value that indicates whether the DropDownButton is `disabled` or not.
     *
     * @default false.
     */
    disabled: boolean;
    /**
     * Defines class/multiple classes separated by a space for the DropDownButton that is used to
     * include an icon. DropDownButton can also include font icon and sprite image.
     *
     * @default ""
     */
    iconCss: string;
    /**
     * Positions the icon before/top of the text content in the DropDownButton. The possible values are:
     * * Left: The icon will be positioned to the left of the text content.
     * * Top: The icon will be positioned to the top of the text content.
     *
     * @default "Left"
     */
    iconPosition: SplitButtonIconPosition;
    /**
     * Specifies whether to enable the rendering of untrusted HTML values in the DropDownButton component.
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Specifies action items with its properties which will be rendered as DropDownButton popup.
     *
     * @default []
     */
    items: ItemModel[];
    /**
     * Specifies the popup element creation on open.
     *
     * @default false
     */
    createPopupOnClick: boolean;
    /**
     * Allows to specify the DropDownButton popup item element.
     *
     * @default ""
     */
    target: string | Element;
    /**
     * Specifies the event to close the DropDownButton popup.
     *
     * @default ""
     */
    closeActionEvents: string;
    /**
     * Specifies the template content to be displayed.
     *
     * @default null
     * @aspType string
     */
    itemTemplate: string | Function;
    /**
     * This property defines the width of the dropdown popup for the DropDownButton component.
     *
     * @property {string | number} popupWidth - A string or number representing the width of the dropdown.
     * It can be a valid CSS unit such as `px`, `%`, or `rem`, or a number interpreted as pixels.
     * @default "auto"
     * @remarks
     * The `popupWidth` property allows developers to control the width of the dropdown popup, ensuring it fits their design requirements.
     * The default value of `auto` allows the popup to adjust based on the content length, but a specific width can be provided for more precise control.
     */
    popupWidth: string | number;
    /**
     * Specifies the animation settings for opening the sub menu in the DropDownMenu.
     * The settings control the duration, easing, and effect of the animation applied when the sub menu opens.
     *
     * @default { effect: 'None' }
     */
    animationSettings: DropDownMenuAnimationSettingsModel;
    /**
     * Triggers while rendering each Popup item of DropDownButton.
     *
     * @event beforeItemRender
     */
    beforeItemRender: EmitType<MenuEventArgs>;
    /**
     * Triggers before opening the DropDownButton popup.
     *
     * @event beforeOpen
     */
    beforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before closing the DropDownButton popup.
     *
     * @event beforeClose
     */
    beforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers while closing the DropDownButton popup.
     *
     * @event close
     */
    close: EmitType<OpenCloseMenuEventArgs>;
    /**
     * Triggers while opening the DropDownButton popup.
     *
     * @event open
     */
    open: EmitType<OpenCloseMenuEventArgs>;
    /**
     * Triggers while selecting action item in DropDownButton popup.
     *
     * @event select
     */
    select: EmitType<MenuEventArgs>;
    /**
     * Triggers once the component rendering is completed.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Constructor for creating the widget
     *
     * @param  {DropDownButtonModel} options - Specifies dropdown button model
     * @param  {string|HTMLButtonElement} element - Specifies element
     * @hidden
     */
    constructor(options?: DropDownButtonModel, element?: string | HTMLButtonElement);
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    getPersistData(): string;
    /**
     * To open/close DropDownButton popup based on current state of the DropDownButton.
     *
     * @returns {void}
     */
    toggle(): void;
    /**
     * Initialize the Component rendering
     *
     * @returns {void}
     * @private
     */
    render(): void;
    /**
     * Adds a new item to the menu. By default, new item appends to the list as the last item,
     * but you can insert based on the text parameter.
     *
     * @param  { ItemModel[] } items - Specifies an array of JSON data.
     * @param { string } text - Specifies the text to insert the newly added item in the menu.
     * @returns {void}.
     */
    addItems(items: ItemModel[], text?: string): void;
    /**
     * Removes the items from the menu.
     *
     * @param  { string[] } items - Specifies an array of string to remove the items.
     * @param { string } isUniqueId - Set `true` if specified items is a collection of unique id.
     * @returns {void}.
     */
    removeItems(items: string[], isUniqueId?: boolean): void;
    private createPopup;
    private getTargetElement;
    private createItems;
    private compiletemplate;
    private hasIcon;
    private createAnchor;
    private initialize;
    private isColorPicker;
    private appendArrowSpan;
    protected setActiveElem(elem: HTMLElement[]): void;
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    getModuleName(): string;
    private canOpen;
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    destroy(): void;
    protected destroyPopup(): void;
    protected getPopUpElement(): HTMLElement;
    protected getULElement(): HTMLElement;
    protected wireEvents(): void;
    protected windowResize(): void;
    protected popupWireEvents(): void;
    protected popupUnWireEvents(): void;
    /**
     * Handles the keyboard interactions.
     *
     * @param {KeyboardEventArgs} e - Specifies keyboard event args.
     * @returns {void}
     * @hidden
     */
    keyBoardHandler(e: KeyboardEventArgs): void;
    private isSafari;
    protected upDownKeyHandler(e: KeyboardEventArgs): void;
    private keyEventHandler;
    private getLI;
    private mousedownHandler;
    private focusoutHandler;
    protected clickHandler(e: MouseEvent | KeyboardEventArgs): void;
    private triggerSelect;
    private openPopUp;
    private animatePopup;
    private setWidth;
    private closePopup;
    protected unWireEvents(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {DropDownButtonModel} newProp - Specifies new properties
     * @param  {DropDownButtonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: DropDownButtonModel, oldProp: DropDownButtonModel): void;
    /**
     * Sets the focus to DropDownButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    focusIn(): void;
}
