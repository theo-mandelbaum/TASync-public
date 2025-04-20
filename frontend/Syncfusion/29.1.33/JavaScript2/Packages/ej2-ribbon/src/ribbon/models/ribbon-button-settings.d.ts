import { ChildProperty, EmitType } from '@syncfusion/ej2-base';
/**
 * Defines the ribbon button item.
 */
export declare class RibbonButtonSettings extends ChildProperty<RibbonButtonSettings> {
    /**
     * Defines the content for the button.
     *
     * @default ''
     */
    content: string;
    /**
     * Defines one or more CSS classes to customize the appearance of button.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines the CSS class for the icons to be shown in button.
     *
     * @default ''
     */
    iconCss: string;
    /**
     * Defines whether the button is toggle button or not.
     *
     * @default false
     */
    isToggle: boolean;
    /**
     * Defines whether the button is primary button or not.
     *
     * @default false
     */
    isPrimary: boolean;
    /**
     * Specifies additional HTML attributes to be applied to the button.
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Event triggers once the button is created.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event triggers when the button is clicked.
     *
     * @event clicked
     */
    clicked: EmitType<Event>;
    /**
     * @param {Object} prop - Gets the property of button.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop: Object, muteOnChange: boolean): void;
}
