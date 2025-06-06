import { Component, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { Button, ButtonModel } from '@syncfusion/ej2-buttons';
import { PositionDataModel } from '../popup/popup-model';
import { ButtonPropsModel, DialogModel, AnimationSettingsModel } from './dialog-model';
/**
 * Defines the types of a button in the dialog.
 */
export declare type ButtonType = 'Button' | 'Submit' | 'Reset';
/**
 * Provides information about a SanitizeSelectors.
 */
export interface SanitizeSelectors {
    /** Returns the tags. */
    tags?: string[];
    /** Returns the attributes. */
    attributes?: SanitizeRemoveAttrs[];
}
/**
 * Provides information about a BeforeSanitizeHtml event.
 */
export interface BeforeSanitizeHtmlArgs {
    /** Illustrates whether the current action needs to be prevented or not. */
    cancel?: boolean;
    /** It is a callback function and executed it before our inbuilt action. It should return HTML as a string.
     *
     * @function
     * @param {string} value - Returns the value.
     * @returns {string}
     */
    helper?: Function;
    /** Returns the selectors object which carrying both tags and attributes selectors to block list of cross-site scripting attack.
     *Also possible to modify the block list in this event.
     */
    selectors?: SanitizeSelectors;
}
/**
 * Provides information about a SanitizeRemoveAttributes.
 */
export interface SanitizeRemoveAttrs {
    /** Defines the attribute name to sanitize */
    attribute?: string;
    /** Defines the selector that sanitize the specified attributes within the selector */
    selector?: string;
}
export declare class ButtonProps extends ChildProperty<ButtonProps> {
    /**
     * Specifies the flat appearance of the dialog buttons
     *
     * @default true
     */
    isFlat: boolean;
    /**
     * Specifies the button component properties to render the dialog buttons.
     */
    buttonModel: ButtonModel;
    /**
     * Specify the type of the button.
     * Possible values are Button, Submit and Reset.
     *
     * @default 'Button'
     * @aspType string
     * @blazorType string
     */
    type: ButtonType | string;
    /**
     * Event triggers when `click` the dialog button.
     *
     * @event 'object'
     * @blazorProperty 'OnClick'
     */
    click: EmitType<Object>;
}
/**
 * Configures the animation properties for both open and close the dialog.
 */
export declare class AnimationSettings extends ChildProperty<AnimationSettings> {
    /**
     * Specifies the animation name that should be applied on open and close the dialog.
     * If user sets Fade animation, the dialog will open with `FadeIn` effect and close with `FadeOut` effect.
     * The following are the list of animation effects available to configure to the dialog:
     * 1. Fade
     * 2. FadeZoom
     * 3. FlipLeftDown
     * 4. FlipLeftUp
     * 5. FlipRightDown
     * 6. FlipRightUp
     * 7. FlipXDown
     * 8. FlipXUp
     * 9. FlipYLeft
     * 10. FlipYRight
     * 11. SlideBottom
     * 12. SlideLeft
     * 13. SlideRight
     * 14. SlideTop
     * 15. Zoom
     * 16. None
     *
     * @default 'Fade'
     */
    effect: DialogEffect;
    /**
     * Specifies the duration in milliseconds that the animation takes to open or close the dialog.
     *
     * @default 400
     */
    duration: number;
    /**
     * Specifies the delay in milliseconds to start animation.
     *
     * @default 0
     */
    delay: number;
}
/**
 * Specifies the Dialog animation effects.
 */
export declare type DialogEffect = 'Fade' | 'FadeZoom' | 'FlipLeftDown' | 'FlipLeftUp' | 'FlipRightDown' | 'FlipRightUp' | 'FlipXDown' | 'FlipXUp' | 'FlipYLeft' | 'FlipYRight' | 'SlideBottom' | 'SlideLeft' | 'SlideRight' | 'SlideTop' | 'Zoom' | 'None';
/**
 * Specifies the Resize Handles.
 */
export declare type ResizeDirections = 'South' | 'North' | 'East' | 'West' | 'NorthEast' | 'NorthWest' | 'SouthEast' | 'SouthWest' | 'All';
/**
 * Provides information about a BeforeOpen event.
 */
export interface BeforeOpenEventArgs {
    /**
     * Specify the value to override max-height value of dialog.
     */
    maxHeight: string;
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the target element of the dialog.
     *
     * @aspType string
     * @blazorType string
     * @deprecated
     */
    target?: HTMLElement | string;
}
/**
 * Provides information about a BeforeClose event.
 */
export interface BeforeCloseEventArgs {
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the target element of the dialog.
     *
     * @aspType string
     * @blazorType string
     * @deprecated
     */
    target?: HTMLElement | string;
    /**
     * Returns the original event arguments.
     */
    event: Event;
    /**
     * Returns whether the dialog, is closed by "close icon", "overlayClick", "escape" and "user action"
     */
    closedBy?: string;
}
/**
 * Provides information about a DialogOpen event.
 */
export interface OpenEventArgs {
    /**
     * Defines whether the focus action can be prevented in dialog.
     */
    preventFocus: boolean;
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Specify the name of the event.
     */
    name: string;
}
/**
 * Provides information about a Close event.
 */
export interface CloseEventArgs {
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the original event arguments.
     */
    event: Event;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
    /**
     * Specify the name of the event.
     */
    name: string;
}
/**
 * Provides information about a DragStart event.
 */
export interface DragStartEventArgs {
    /**
     * Returns the original event arguments.
     *
     * @blazorType MouseEventArgs
     */
    event: Event;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the target element of the dialog.
     */
    target: HTMLElement;
    /**
     * Returns the name of the event.
     */
    name: string;
}
/**
 * Provides information about a DragStop event.
 */
export interface DragStopEventArgs {
    /**
     * Returns the original event arguments.
     *
     * @blazorType MouseEventArgs
     */
    event: Event;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the target element of the dialog.
     */
    target: HTMLElement;
    /**
     * Returns the helper element.
     */
    helper: Element;
    /**
     * Returns the name of the event.
     */
    name: string;
}
/**
 * Provides information about a Drag event.
 */
export interface DragEventArgs {
    /**
     * Returns the original event arguments.
     *
     * @blazorType MouseEventArgs
     */
    event: Event;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the target element of the dialog.
     */
    target: HTMLElement;
    /**
     * Returns the name of the event.
     */
    name: string;
}
/**
 * Represents the dialog component that displays the information and get input from the user.
 * Two types of dialog components are `Modal and Modeless (non-modal)` depending on its interaction with parent application.
 * ```html
 * <div id="dialog"></div>
 * ```
 * ```typescript
 * <script>
 *   var dialogObj = new Dialog({ header: 'Dialog' });
 *   dialogObj.appendTo("#dialog");
 * </script>
 * ```
 */
export declare class Dialog extends Component<HTMLElement> implements INotifyPropertyChanged {
    private closeIconClickEventHandler;
    private dlgOverlayClickEventHandler;
    private createEventHandler;
    private contentEle;
    private dlgOverlay;
    private dlgContainer;
    private headerEle;
    private buttonContent;
    private ftrTemplateContent;
    private headerContent;
    private closeIcon;
    private popupObj;
    private btnObj;
    private closeIconBtnObj;
    private dragObj;
    private primaryButtonEle;
    private targetEle;
    private dialogOpen;
    private initialRender;
    private innerContentElement;
    private storeActiveElement;
    private focusElements;
    private focusIndex;
    private l10n;
    private clonedEle;
    private closeArgs;
    private calculatezIndex;
    private allowMaxHeight;
    private preventVisibility;
    private IsDragStop;
    private refElement;
    private dlgClosedBy;
    private isModelResize;
    private boundWindowResizeHandler;
    /**
     * Specifies the value that can be displayed in dialog's content area.
     * It can be information, list, or other HTML elements.
     * The content of dialog can be loaded with dynamic data such as database, AJAX content, and more.
     *
     * {% codeBlock src="dialog/content-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dialog/content-api/index.html" %}{% endcodeBlock %}
     *
     * @default ''
     * @blazorType string
     * @aspType string
     */
    content: string | HTMLElement | Function;
    /**
     * Defines whether to allow the cross-scripting site or not.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Enables or disables the persistence of the dialog's dimensions and position state between page reloads.
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Specifies the value that represents whether the close icon is shown in the dialog component.
     *
     * @default false
     */
    showCloseIcon: boolean;
    /**
     * Specifies the Boolean value whether the dialog can be displayed as modal or non-modal.
     * * `Modal`: It creates overlay that disable interaction with the parent application and user should
     * respond with modal before continuing with other applications.
     * * `Modeless`: It does not prevent user interaction with parent application.
     *
     * @default false
     */
    isModal: boolean;
    /**
     * Specifies the value that can be displayed in the dialog's title area that can be configured with plain text or HTML elements.
     * This is optional property and the dialog can be displayed without header, if the header property is null.
     *
     * @default ''
     * @blazorType string
     * @aspType string
     */
    header: string | HTMLElement | Function;
    /**
     * Specifies the value that represents whether the dialog component is visible.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Specifies the value whether the dialog component can be resized by the end-user.
     * If enableResize is true, the dialog component creates grip to resize it diagonal direction.
     *
     * @default false
     */
    enableResize: boolean;
    /**
     * Specifies the resize handles direction in the dialog component that can be resized by the end-user.
     *
     * @default ['South-East']
     */
    resizeHandles: ResizeDirections[];
    /**
     * Specifies the height of the dialog component.
     *
     * @default 'auto'
     * @blazorType string
     */
    height: string | number;
    /**
     * Specify the min-height of the dialog component.
     *
     * @default ''
     * @blazorType string
     */
    minHeight: string | number;
    /**
     * Specifies the width of the dialog.
     *
     * @default '100%'
     * @blazorType string
     */
    width: string | number;
    /**
     * Specifies the CSS class name that can be appended with root element of the dialog.
     * One or more custom CSS classes can be added to a dialog.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.
     *
     * @default 1000
     */
    zIndex: number;
    /**
     * Specifies the target element in which to display the dialog.
     * The default value is null, which refers the `document.body` element.
     *
     * @default null
     * @blazorType string
     */
    target: HTMLElement | string;
    /**
     * Specifies the template value that can be displayed with dialog's footer area.
     * This is optional property and can be used only when the footer is occupied with information or custom components.
     * By default, the footer is configured with action [buttons](#buttons).
     * If footer template is configured to dialog, the action buttons property will be disabled.
     *
     * > More information on the footer template configuration can be found on this [documentation](../../dialog/template/#footer) section.
     *
     * @default ''
     * @blazorType string
     * @aspType string
     */
    footerTemplate: HTMLElement | string | Function;
    /**
     * Specifies the value whether the dialog component can be dragged by the end-user.
     * The dialog allows to drag by selecting the header and dragging it for re-position the dialog.
     *
     * > More information on the draggable behavior can be found on this [documentation](../../dialog/getting-started/#draggable) section.
     *
     * {% codeBlock src='dialog/allowDragging/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowDragging: boolean;
    /**
     * Configures the action `buttons` that contains button properties with primary attributes and click events.
     * One or more action buttons can be configured to the dialog.
     *
     * > More information on the button configuration can be found on this
     * [documentation](../../dialog/getting-started/#enable-footer) section.
     *
     * {% codeBlock src="dialog/buttons-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dialog/buttons-api/index.html" %}{% endcodeBlock %}
     *
     * {% codeBlock src='dialog/buttons/index.md' %}{% endcodeBlock %}
     *
     * @default [{}]
     */
    buttons: ButtonPropsModel[];
    /**
     * Specifies the boolean value whether the dialog can be closed with the escape key
     * that is used to control the dialog's closing behavior.
     *
     * @default true
     */
    closeOnEscape: boolean;
    /**
     * Specifies the animation settings of the dialog component.
     * The animation effect can be applied on open and close the dialog with duration and delay.
     *
     * > More information on the animation settings in dialog can be found on this [documentation](../../dialog/animation/)  section.
     *
     * {% codeBlock src="dialog/animation-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dialog/animation-api/index.html" %}{% endcodeBlock %}
     *
     * {% codeBlock src='dialog/animationSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { effect: 'Fade', duration: 400, delay:0 }
     */
    animationSettings: AnimationSettingsModel;
    /**
     * Specifies the value where the dialog can be positioned within the document or target.
     * The position can be represented with pre-configured positions or specific X and Y values.
     * * `X value`: left, center, right, or offset value.
     * * `Y value`: top, center, bottom, or offset value.
     *
     * > More information on the positioning in dialog can be found on this [documentation](../../dialog/getting-started/#positioning)  section.
     *
     * {% codeBlock src='dialog/position/index.md' %}{% endcodeBlock %}
     *
     * @default { X: 'center', Y: 'center' }
     */
    position: PositionDataModel;
    /**
     * Event triggers when the dialog is created.
     *
     * @event 'object'
     * @blazorProperty 'Created'
     */
    created: EmitType<Object>;
    /**
     * Event triggers when a dialog is opened.
     *
     * @event 'object'
     * @blazorProperty 'Opened'
     * @blazorType OpenEventArgs
     */
    open: EmitType<Object>;
    /**
     * Event triggers before sanitize the value.
     *
     * @event 'object'
     * @blazorProperty 'OnSanitizeHtml'
     */
    beforeSanitizeHtml: EmitType<BeforeSanitizeHtmlArgs>;
    /**
     * Event triggers when the dialog is being opened.
     * If you cancel this event, the dialog remains closed.
     * Set the cancel argument to true to cancel the open of a dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnOpen'
     */
    beforeOpen: EmitType<BeforeOpenEventArgs>;
    /**
     * Event triggers after the dialog has been closed.
     *
     * @event 'object'
     * @blazorProperty 'Closed'
     * @blazorType CloseEventArgs
     */
    close: EmitType<Object>;
    /**
     * Event triggers before the dialog is closed.
     * If you cancel this event, the dialog remains opened.
     * Set the cancel argument to true to cancel the closure of a dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnClose'
     */
    beforeClose: EmitType<BeforeCloseEventArgs>;
    /**
     * Event triggers when the user begins dragging the dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnDragStart'
     * @blazorType DragStartEventArgs
     */
    dragStart: EmitType<Object>;
    /**
     * Event triggers when the user stop dragging the dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnDragStop'
     * @blazorType DragStopEventArgs
     */
    dragStop: EmitType<Object>;
    /**
     * Event triggers when the user drags the dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnDrag'
     * @blazorType DragEventArgs
     */
    drag: EmitType<Object>;
    /**
     * Event triggers when the overlay of dialog is clicked.
     *
     * @event 'object'
     * @blazorProperty 'OnOverlayClick'
     */
    overlayClick: EmitType<Object>;
    /**
     * Event triggers when the user begins to resize a dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnResizeStart'
     */
    resizeStart: EmitType<Object>;
    /**
     * Event triggers when the user resize the dialog.
     *
     * @event 'object'
     * @blazorProperty 'Resizing'
     */
    resizing: EmitType<Object>;
    /**
     * Event triggers when the user stop to resize a dialog.
     *
     * @event 'object'
     * @blazorProperty 'OnResizeStop'
     */
    resizeStop: EmitType<Object>;
    /**
     * Event triggers when the dialog is destroyed.
     *
     * @event 'object'
     * @blazorProperty 'Destroyed'
     */
    destroyed: EmitType<Event>;
    protected needsID: boolean;
    constructor(options?: DialogModel, element?: string | HTMLElement);
    /**
     *Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render(): void;
    private initializeValue;
    /**
     *Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    protected preRender(): void;
    private updatePersistData;
    private isNumberValue;
    private checkPositionData;
    private getEle;
    private getMinHeight;
    private onResizeStart;
    private onResizing;
    private onResizeComplete;
    private setResize;
    private getFocusElement;
    private keyDown;
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    private initialize;
    /**
     * Initialize the rendering
     *
     * @returns {void}
     * @private
     */
    private initRender;
    private getTargetContainer;
    private resetResizeIcon;
    private setOverlayZindex;
    private positionChange;
    private setPopupPosition;
    private setAllowDragging;
    private setButton;
    private buttonClickHandler;
    private setContent;
    private setTemplate;
    sanitizeHelper(value: string): string;
    private setMaxHeight;
    private setEnableRTL;
    private setTargetContent;
    private setHeader;
    private setFooterTemplate;
    private createHeaderContent;
    private renderCloseIcon;
    private closeIconTitle;
    private setCSSClass;
    private setIsModal;
    private getValidFocusNode;
    private focusableElements;
    private getAutoFocusNode;
    private disableElement;
    private focusContent;
    private bindEvent;
    private unBindEvent;
    private updateSanitizeContent;
    private isBlazorServerRender;
    /**
     * Module required function
     *
     * @returns {void}
     * @private
     */
    protected getModuleName(): string;
    /**
     * Called internally if any of the property value changed
     *
     * @param {DialogModel} newProp - specifies the new property
     * @param {DialogModel} oldProp - specifies the old property
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp: DialogModel, oldProp: DialogModel): void;
    private setTarget;
    private updateIsModal;
    private setzIndex;
    private windowResizeHandler;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {void}
     * @private
     */
    getPersistData(): string;
    private removeAllChildren;
    /**
     * To destroy the widget
     *
     * @returns {void}
     */
    destroy(): void;
    private wireWindowResizeEvent;
    private unWireWindowResizeEvent;
    /**
     * Binding event to the element while widget creation
     *
     * @returns {void}
     * @hidden
     */
    private wireEvents;
    /**
     * Unbinding event to the element while widget destroy
     *
     * @returns {void}
     * @hidden
     */
    private unWireEvents;
    /**
     * Refreshes the dialog's position when the user changes its header and footer height/width dynamically.
     *
     * @returns {void}
     */
    refreshPosition(): void;
    /**
     * Returns the current width and height of the Dialog
     *
     * @returns {DialogDimension}- returns the dialog element Dimension.
     * @public
     */
    getDimension(): DialogDimension;
    /**
     * Opens the dialog if it is in hidden state.
     * To open the dialog with full screen width, set the parameter to true.
     *
     * @param { boolean } isFullScreen - Enable the fullScreen Dialog.
     * @returns {void}
     */
    show(isFullScreen?: boolean): void;
    /**
     * Closes the dialog if it is in visible state.
     *
     * @param { Event } event - specifies the event
     * @returns {void}
     */
    hide(event?: Event): void;
    /**
     * Specifies to view the Full screen Dialog.
     *
     * @param {boolean} args - specifies the arguments
     * @returns {boolean} - returns the boolean value
     * @private
     */
    private fullScreen;
    /**
     * Returns the dialog button instances.
     * Based on that, you can dynamically change the button states.
     *
     * @param { number } index - Index of the button.
     * @returns {Button} - returns the button element
     */
    getButtons(index?: number): Button[] | Button;
    private unWireButtonEvents;
    private destroyButtons;
}
/**
 * Base for creating Alert and Confirmation Dialog through util method.
 */
export declare namespace DialogUtility {
    /**
     * An alert dialog box is used to display warning like messages to the users.
     * ```
     * Eg : DialogUtility.alert('Alert message');
     *
     * ```
     */
    /**
     *
     * @param {AlertDialogArgs} args - specifies the string
     * @returns {Dialog} - returns the dialog element.
     */
    function alert(args?: AlertDialogArgs | string): Dialog;
    /**
     * A confirm dialog displays a specified message along with ‘OK’ and ‘Cancel’ button.
     * ```
     * Eg : DialogUtility.confirm('Confirm dialog message');
     *
     * ```
     */
    /**
     *
     * @param {ConfirmDialogArgs} args - specifies the args
     * @returns {Dialog} - returns te element
     */
    function confirm(args?: ConfirmDialogArgs | string): Dialog;
}
/**
 * Provides information about a Button event.
 */
export interface ButtonArgs {
    icon?: string;
    cssClass?: string;
    click?: EmitType<Object>;
    text?: string;
    isFlat?: boolean;
}
/**
 * Provides information about a AlertDialog.
 */
export interface AlertDialogArgs {
    title?: string;
    content?: string | HTMLElement;
    isModal?: boolean;
    isDraggable?: boolean;
    showCloseIcon?: boolean;
    closeOnEscape?: boolean;
    position?: PositionDataModel;
    okButton?: ButtonArgs;
    animationSettings?: AnimationSettingsModel;
    cssClass?: string;
    zIndex?: number;
    open?: EmitType<Object>;
    close?: EmitType<Object>;
    width?: string | number;
    height?: string | number;
}
/**
 * Provides information about a ConfirmDialog.
 */
export interface ConfirmDialogArgs {
    title?: string;
    content?: string | HTMLElement;
    isModal?: boolean;
    isDraggable?: boolean;
    showCloseIcon?: boolean;
    closeOnEscape?: boolean;
    position?: PositionDataModel;
    okButton?: ButtonArgs;
    cancelButton?: ButtonArgs;
    animationSettings?: AnimationSettingsModel;
    cssClass?: string;
    zIndex?: number;
    open?: EmitType<Object>;
    close?: EmitType<Object>;
    width?: string | number;
    height?: string | number;
}
interface DialogDimension {
    width: number;
    height: number;
}
export {};
