import { INotifyPropertyChanged, Component, EmitType } from '@syncfusion/ej2-base';
import { OtpInputModel } from './otp-input-model';
/**
 * Specifies the type of input for the Otp (One-Time Password) input component.
 */
export declare enum OtpInputType {
    /**
     * Specifies the type of input to be number for the Otp input.
     */
    Number = "number",
    /**
     * Specifies the type of input to be text for the Otp input.
     */
    Text = "text",
    /**
     * Specifies the type of input to be password for the Otp input.
     */
    Password = "password"
}
/**
 * Specifies the style variant for the Otp (One-Time Password) input component.
 */
export declare enum OtpInputStyle {
    /**
     * Specifies the style of the Otp input to be outlined.
     */
    Outlined = "outlined",
    /**
     * Specifies the style of the Otp input to be underlined.
     */
    Underlined = "underlined",
    /**
     * Specifies the style of the Otp input to be filled.
     */
    Filled = "filled"
}
/**
 * Enum for the case transformation options for OTP input text.
 *
 * @readonly
 * @enum {string}
 */
export declare enum TextTransform {
    /**
     * No case transformation. The input text remains unchanged.
     */
    None = "none",
    /**
     * Convert the input text to uppercase.
     */
    Uppercase = "uppercase",
    /**
     * Convert the input text to lowercase.
     */
    Lowercase = "lowercase"
}
/**
 * Provides information about valueChanged event callback
 */
export interface OtpChangedEventArgs {
    /**
     * Provides the Otp input container element.
     */
    element: HTMLElement;
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides whether the change is triggered by user interaction.
     */
    isInteracted: boolean;
    /**
     * Provides the previous value of the Otp input.
     */
    previousValue: string | number;
    /**
     * Provides the current value of the Otp input.
     */
    value: string | number;
}
/**
 * Provides information about focus event callback
 */
export interface OtpFocusEventArgs {
    /**
     * Provides the Otp input container element.
     */
    element: HTMLElement;
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides whether the change is triggered by user interaction.
     */
    isInteracted: boolean;
    /**
     * Provides the current value of the Otp input.
     */
    value: string | number;
    /**
     * The index of the OTP input field that is currently focused.
     */
    index: number;
}
/**
 * Provides information about input event callback
 */
export interface OtpInputEventArgs {
    /**
     * Provides the Otp input container element.
     */
    element: HTMLElement;
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides the previous value of the Otp input.
     */
    previousValue: string | number;
    /**
     * Provides the current value of the Otp input.
     */
    value: string | number;
    /**
     * The index of the OTP input field that is currently focused.
     */
    index: number;
}
/**
 * Represents the Otp component that allows the user to enter the otp values.
 * ```html
 * <div id='OTPInput'></div>
 * ```
 * ```typescript
 * <script>
 *   var OtpinputObj = new OtpInput();
 *   OtpinputObj.appendTo('#OTPInput');
 * </script>
 * ```
 */
export declare class OtpInput extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Specifies the length of the Otp (One-Time Password) to be entered by the user.
     * This determines the number of input fields in the Otp Input.
     *
     * {% codeBlock src='otp-input/length/index.md' %}{% endcodeBlock %}
     *
     * @default 4
     */
    length: number;
    /**
     * Specifies the value of the Otp (One-Time Password) input.
     * This can be a string or a number, representing the Otp value entered by the user.
     *
     * {% codeBlock src='otp-input/value/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @aspType string
     */
    value: string | number;
    /**
     * Specifies the input type of the Otp.
     *
     * {% codeBlock src='otp-input/type/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default OtpInputType.Number
     * @asptype OtpInputType
     */
    type: string | OtpInputType;
    /**
     * Specifies the separator used to separate each input field in the Otp Input component.
     * The separator is displayed between each input field.
     *
     * {% codeBlock src='otp-input/separator/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     */
    separator: string;
    /**
     * Specifies the text that is shown as a hint/placeholder until the user focuses on or enters a value in the Otp Input.
     * If a single text is provided, it will be used for all input fields; otherwise, each text letter will be used for each field.
     *
     * {% codeBlock src='otp-input/placeholder/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     */
    placeholder: string;
    /**
     * Specifies the style variant for the input fields in the Otp Input component.
     *
     * {% codeBlock src='otp-input/stylingMode/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default OtpInputStyle.Outlined
     * @asptype OtpInputStyle
     */
    stylingMode: string | OtpInputStyle;
    /**
     * Specifies whether the Otp input component is disabled.
     * When set to true, the component is disabled and user input is not allowed.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Defines one or more CSS classes that can be used to customize the appearance of the Otp (One-Time Password) input component.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies whether the OTP input field should automatically receive focus when the component is rendered.
     *
     * @type {boolean}
     * @default false
     */
    autoFocus: boolean;
    /**
     * Specifies the case transformation for the OTP input text.
     *
     * Valid values are:
     * - `TextTransform.Uppercase` for uppercase transformation.
     * - `TextTransform.Lowercase` for lowercase transformation.
     * - `TextTransform.None` for no transformation.
     *
     * @isenumeration true
     * @asptype TextTransform
     * @type {TextTransform}
     * @default TextTransform.None
     */
    textTransform: string | TextTransform;
    /**
     * Specifies additional HTML attributes to be applied to the Otp (One-Time Password) input component.
     *
     * {% codeBlock src='otp-input/htmlAttributes/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Defines the ARIA-label attribute for each input field in the Otp (One-Time Password) input component.
     * Each string in the array corresponds to the ARIA-label attribute for each input field.
     *
     * {% codeBlock src='otp-input/ariaLabels/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    ariaLabels: string[];
    /**
     * Event triggers after the creation of the Otp Input.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event triggers after the value is changed and the Otp input is focused out.
     *
     * @event change
     */
    valueChanged: EmitType<OtpChangedEventArgs>;
    /**
     * Event triggers when the Otp input is focused.
     *
     * @event focus
     */
    focus: EmitType<OtpFocusEventArgs>;
    /**
     * Event triggers when the Otp input is focused out.
     *
     * @event blur
     */
    blur: EmitType<OtpFocusEventArgs>;
    /**
     * Event triggers each time when the value of each Otp input is changed.
     *
     * @event input
     */
    input: EmitType<OtpInputEventArgs>;
    private inputs;
    private previousValue;
    private hiddenInputEle;
    private separatorElements;
    private shouldFireFocus;
    private shouldFireBlur;
    private isFocusInCalled;
    private isFocusOutCalled;
    constructor(options?: OtpInputModel, element?: string | HTMLElement);
    protected preRender(): void;
    render(): void;
    private initialize;
    private renderInputs;
    private createOtpInput;
    private handleWheelEvent;
    private renderSeparator;
    private updateSeparatorValue;
    private addPlaceHolder;
    private updateInputType;
    private getDefaultValue;
    private getTransformedText;
    private handleInputChange;
    private handleKeyAction;
    private handleSelection;
    private handleFocus;
    private handleBlur;
    private handlePaste;
    private triggerInputEvent;
    private triggerValuechanged;
    private wireEvents;
    private unWireEvents;
    private updateValueProperty;
    private updateInputValue;
    private updateCssClass;
    private updateVariantClass;
    private updateAriaLabel;
    private updateDisabledState;
    private setElementAttributes;
    private setInputMode;
    private handleLengthChange;
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    getModuleName(): string;
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    /**
     * Destroy the Otp input.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Sets the focus to the Otp input for interaction.
     *
     * @returns {void}
     */
    focusIn(): void;
    /**
     * Remove the focus from Otp input, if it is in focus state.
     *
     * @returns {void}
     */
    focusOut(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {OtpInputModel} newProp - Specifies new properties
     * @param  {OtpInputModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: OtpInputModel, oldProp?: OtpInputModel): void;
}
