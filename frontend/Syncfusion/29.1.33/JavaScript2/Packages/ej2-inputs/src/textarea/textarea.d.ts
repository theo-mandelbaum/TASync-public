import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { FloatLabelType } from '../input/input';
import { FocusInEventArgs, FocusOutEventArgs, InputEventArgs, ChangedEventArgs } from '../textbox/textbox';
import { TextAreaModel } from './textarea-model';
export declare type Resize = 'Vertical' | 'Horizontal' | 'Both' | 'None';
export declare class TextArea extends Component<HTMLTextAreaElement> implements INotifyPropertyChanged {
    private textareaWrapper;
    private textareaOptions;
    private globalize;
    private l10n;
    private previousValue;
    private formElement;
    private isForm;
    private initialValue;
    private inputPreviousValue;
    private preventChange;
    private clearButton;
    /**
     * Specifies the boolean value whether the TextArea allows user to change the text.
     *
     * @default false
     */
    readonly: boolean;
    /**
     * Sets the content of the TextArea.
     *
     * @default null
     */
    value: string;
    /**
     * Specifies the floating label behavior of the TextArea that the placeholder text floats above the TextArea based on the below values.
     * Possible values are:
     * * `Never` - The placeholder text should not be float ever.
     * * `Always` - The placeholder text floats above the TextArea always.
     * * `Auto` - The placeholder text floats above the TextArea while focusing or enter a value in TextArea.
     *
     * @default Never
     */
    floatLabelType: FloatLabelType;
    /**
     * Specifies the CSS class value that is appended to wrapper of Textbox.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the text that is shown as a hint/placeholder until the user focus or enter a value in TextArea.
     * The property is depending on the floatLabelType property.
     *
     * @default null
     */
    placeholder: string;
    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Specifies a Boolean value that indicates whether the TextArea allow user to interact with it.
     *
     * @default true
     */
    enabled: boolean;
    /**
     * Specifies a Boolean value that indicates whether the clear button is displayed in TextArea.
     *
     * @default false
     */
    showClearButton: boolean;
    /**
     * Enable or disable persisting TextArea state between page reloads. If enabled, the `value` state will be persisted.
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Specifies the width of the TextArea component.
     *
     * @default null
     */
    width: number | string;
    /**
     * Specifies the resize mode of textarea.
     * possible values are:
     * * `Vertical` - The textarea element can be resized vertically.
     * * `Horizontal` - The textarea element can be resized horizontally.
     * * `Both` - The textarea element can be resized both vertically and horizontally.
     * * `None` - The textarea element cannot be resized.
     *
     * @default Both
     */
    resizeMode: Resize;
    /**
     * Specifies the maximum number of characters allowed in TextArea.
     *
     * @aspType int?
     */
    maxLength: number;
    /**
     * specifies the visible width of the textarea, measured in average character widths.
     *
     * @aspType int?
     */
    cols: number;
    /**
     * specifies the visible height of the textarea, measured in lines
     *
     * @aspType int?
     */
    rows: number;
    /**
     * Triggers when the TextArea component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the TextArea component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Triggers when the content of TextArea has changed and gets focus-out.
     *
     * @event change
     */
    change: EmitType<ChangedEventArgs>;
    /**
     * Triggers when the TextArea has focus-out.
     *
     * @event blur
     */
    blur: EmitType<FocusOutEventArgs>;
    /**
     * Triggers when the TextArea gets focus.
     *
     * @event focus
     */
    focus: EmitType<FocusInEventArgs>;
    /**
     * Triggers each time when the value of TextArea has changed.
     *
     * @event input
     */
    input: EmitType<InputEventArgs>;
    constructor(options?: TextAreaModel, element?: string | HTMLTextAreaElement);
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {TextAreaModel} newProp - Returns the dynamic property value of the component.
     * @param {TextAreaModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: TextAreaModel, oldProp: TextAreaModel): void;
    protected preRender(): void;
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render(): void;
    getModuleName(): string;
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     */
    getPersistData(): string;
    private checkAttributes;
    protected wireEvents(): void;
    protected unWireEvents(): void;
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also, it maintains the initial TextArea element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
    private focusHandler;
    private focusOutHandler;
    protected keydownHandler(args: KeyboardEvent): void;
    private inputHandler;
    private changeHandler;
    private raiseChangeEvent;
    private updateHTMLAttributesToWrapper;
    private updateHTMLAttributesToElement;
    private bindClearEvent;
    private resetInputHandler;
    /**
     * Adding the multiple attributes as key-value pair to the TextArea element.
     *
     * @param {string} attributes - Specifies the attributes to be add to TextArea element.
     * @returns {void}
     */
    addAttributes(attributes: {
        [key: string]: string;
    }): void;
    /**
     * Removing the multiple attributes as key-value pair to the TextArea element.
     *
     * @param { string[] } attributes - Specifies the attributes name to be removed from TextArea element.
     * @returns {void}
     */
    removeAttributes(attributes: string[]): void;
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    focusIn(): void;
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut(): void;
    /**
     * Sets up the width for the textarea wrapper.
     *
     * @returns {void}
     */
    private setWrapperWidth;
    private resetForm;
    private resetValue;
    private setElementWidth;
    private getCurrentResizeClass;
}
