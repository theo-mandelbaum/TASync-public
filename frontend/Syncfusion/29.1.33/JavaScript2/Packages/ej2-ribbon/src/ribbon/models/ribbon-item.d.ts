import { ChildProperty } from '@syncfusion/ej2-base';
import { RibbonItemType, RibbonItemSize, DisplayMode } from '../base/interface';
import { RibbonButtonSettingsModel } from './ribbon-button-settings-model';
import { RibbonCheckBoxSettingsModel } from './ribbon-checkbox-settings-model';
import { RibbonColorPickerSettingsModel } from './ribbon-colorpicker-settings-model';
import { RibbonComboBoxSettingsModel } from './ribbon-combobox-settings-model';
import { RibbonDropDownSettingsModel } from './ribbon-dropdown-settings-model';
import { RibbonSplitButtonSettingsModel } from './ribbon-splitbutton-settings-model';
import { RibbonTooltipModel } from './ribbon-tooltip-model';
import { RibbonGroupButtonSettingsModel } from './ribbon-group-button-settings-model';
import { RibbonGallerySettingsModel } from './ribbon-gallery-settings-model';
/**
 * Defines the ribbon item.
 */
export declare class RibbonItem extends ChildProperty<RibbonItem> {
    /**
     * Defines the key tip text to be accessed for specified Ribbon item.
     *
     * @default ''
     */
    keyTip: string;
    /**
     * Defines the active size of the ribbon item.
     *
     * @default 'Medium'
     * @aspNumberEnum
     */
    activeSize: RibbonItemSize;
    /**
     * Defines the sizes that are allowed for the ribbon item on ribbon resize.
     *
     * @default null
     * @aspNumberEnum
     */
    allowedSizes: RibbonItemSize;
    /**
     * Defines a unique identifier for the item.
     *
     * @default ''
     */
    id: string;
    /**
     * Defines one or more CSS classes to customize the appearance of item.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether the item is disabled or not.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Defines the template content for the ribbon item.
     * `ActiveSize` property is passed as string in template context.
     *
     * @default ''
     * @angularType string | object | HTMLElement
     * @reactType string | function | JSX.Element | HTMLElement
     * @vueType string | function | HTMLElement
     * @aspType string
     */
    itemTemplate: string | HTMLElement | Function;
    /**
     * Defines the type of control to be added as the Ribbon Item.
     *
     * @isenumeration true
     * @default RibbonItemType.Button
     * @asptype RibbonItemType
     */
    type: RibbonItemType | string;
    /**
     * Defines the display options for the ribbon item.
     *
     * @default 'Auto'
     * @aspNumberEnum
     */
    displayOptions: DisplayMode;
    /**
     * Defines the settings for the tooltip of the item.
     *
     * @default {}
     */
    ribbonTooltipSettings: RibbonTooltipModel;
    /**
     * Defines the settings for the ribbon button.
     *
     * @default {}
     */
    buttonSettings: RibbonButtonSettingsModel;
    /**
     * Defines the settings for the ribbon dropdown button.
     *
     * @default {}
     */
    dropDownSettings: RibbonDropDownSettingsModel;
    /**
     * Defines the settings for the ribbon checkbox.
     *
     * @default {}
     */
    checkBoxSettings: RibbonCheckBoxSettingsModel;
    /**
     * Defines the settings for the ribbon color picker.
     *
     * @default {}
     */
    colorPickerSettings: RibbonColorPickerSettingsModel;
    /**
     * Defines the settings for the ribbon combobox.
     *
     * @default {}
     */
    comboBoxSettings: RibbonComboBoxSettingsModel;
    /**
     * Defines the settings for the ribbon split button.
     *
     * @default {}
     */
    splitButtonSettings: RibbonSplitButtonSettingsModel;
    /**
     * Defines the properties for group button in Ribbon
     *
     * @default {}
     */
    groupButtonSettings: RibbonGroupButtonSettingsModel;
    /**
     * Defines the properties of the gallery view in Ribbon.
     *
     * @default {}
     */
    gallerySettings: RibbonGallerySettingsModel;
    /**
     * @param {Object} prop - Gets the property of item.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop: Object, muteOnChange: boolean): void;
}
