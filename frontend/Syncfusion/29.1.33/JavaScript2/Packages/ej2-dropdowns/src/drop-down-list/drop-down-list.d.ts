/// <reference path="../drop-down-base/drop-down-base-model.d.ts" />
import { EmitType, ModuleDeclaration } from '@syncfusion/ej2-base';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { IInput, InputObject, FloatLabelType } from '@syncfusion/ej2-inputs';
import { DropDownBase, SelectEventArgs, FilteringEventArgs, PopupEventArgs } from '../drop-down-base/drop-down-base';
import { FieldSettingsModel } from '../drop-down-base/drop-down-base-model';
import { DropDownListModel } from '../drop-down-list';
import { DataManager, Query } from '@syncfusion/ej2-data';
export interface ChangeEventArgs extends SelectEventArgs {
    /**
     * Returns the selected value
     *
     * @isGenericType true
     */
    value: number | string | boolean | object;
    /**
     * Returns the previous selected list item
     */
    previousItem: HTMLLIElement;
    /**
     * Returns the previous selected item as JSON Object from the data source.
     *
     */
    previousItemData: FieldSettingsModel;
    /**
     * Returns the root element of the component.
     */
    element: HTMLElement;
    /**
     * Specifies the original event arguments.
     */
    event: MouseEvent | KeyboardEvent | TouchEvent;
}
export interface GeneratedData {
    [key: string]: Object;
}
export declare const dropDownListClasses: DropDownListClassList;
/**
 * The DropDownList component contains a list of predefined values from which you can
 * choose a single value.
 * ```html
 * <input type="text" tabindex="1" id="list"> </input>
 * ```
 * ```typescript
 *   let dropDownListObj:DropDownList = new DropDownList();
 *   dropDownListObj.appendTo("#list");
 * ```
 */
export declare class DropDownList extends DropDownBase implements IInput {
    protected inputWrapper: InputObject;
    protected inputElement: HTMLInputElement;
    private valueTempElement;
    private listObject;
    private header;
    private footer;
    protected selectedLI: HTMLElement;
    protected previousSelectedLI: HTMLElement;
    protected previousItemData: {
        [key: string]: Object;
    } | string | number | boolean;
    protected hiddenElement: HTMLSelectElement;
    protected isPopupOpen: boolean;
    private isDocumentClick;
    protected isInteracted: boolean;
    private isFilterFocus;
    protected beforePopupOpen: boolean;
    protected initial: boolean;
    private searchBoxHeight;
    private popupObj;
    private backIconElement;
    private clearIconElement;
    private containerStyle;
    protected previousValue: string | number | boolean | object;
    protected activeIndex: number;
    protected filterInput: HTMLInputElement;
    private searchKeyModule;
    private tabIndex;
    private isNotSearchList;
    protected isTyped: boolean;
    protected isSelected: boolean;
    protected preventFocus: boolean;
    protected preventAutoFill: boolean;
    protected queryString: string;
    protected isValidKey: boolean;
    protected typedString: string;
    protected isEscapeKey: boolean;
    private isPreventBlur;
    protected isTabKey: boolean;
    private actionCompleteData;
    private actionData;
    protected prevSelectPoints: {
        [key: string]: number;
    };
    protected isSelectCustom: boolean;
    protected isDropDownClick: boolean;
    protected preventAltUp: boolean;
    private searchKeyEvent;
    private filterInputObj;
    protected spinnerElement: HTMLElement;
    protected keyConfigure: {
        [key: string]: string;
    };
    protected isCustomFilter: boolean;
    private isSecondClick;
    protected isListSearched: boolean;
    protected preventChange: boolean;
    protected selectedElementID: string;
    private preselectedIndex;
    private isTouched;
    protected isFocused: boolean;
    private clearButton;
    protected autoFill: boolean;
    private resizer;
    private isResizing;
    private originalHeight;
    private originalWidth;
    private originalMouseX;
    private originalMouseY;
    private resizeHeight;
    private resizeWidth;
    private isUpdateHeaderHeight;
    private isUpdateFooterHeight;
    private filterArgs;
    private isReactTemplateUpdate;
    /**
     * Sets CSS classes to the root element of the component that allows customization of appearance.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the width of the component. By default, the component width sets based on the width of
     * its parent container. You can also set the width in pixel values.
     *
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies a value that indicates whether the component is enabled or not.
     *
     * @default true
     * @deprecated
     */
    enabled: boolean;
    /**
     * Enable or disable persisting component's state between page reloads.
     * If enabled, following list of states will be persisted.
     * 1. value
     *
     * @default false
     * @deprecated
     */
    enablePersistence: boolean;
    /**
     * Specifies the height of the popup list.
     * > For more details about the popup configuration refer to
     * [`Popup Configuration`](../../drop-down-list/getting-started#configure-the-popup-list) documentation.
     *
     * @default '300px'
     * @aspType string
     */
    popupHeight: string | number;
    /**
     * Specifies the width of the popup list. By default, the popup width sets based on the width of
     * the component.
     * > For more details about the popup configuration refer to
     * [`Popup Configuration`](../../drop-down-list/getting-started#configure-the-popup-list) documentation.
     *
     * @default '100%'
     * @aspType string
     */
    popupWidth: string | number;
    /**
     * Specifies a short hint that describes the expected value of the DropDownList component.
     *
     * @default null
     */
    placeholder: string;
    /**
     * Accepts the value to be displayed as a watermark text on the filter bar.
     *
     * @default null
     */
    filterBarPlaceholder: string;
    /**
     * Allows additional HTML attributes such as title, name, etc., and
     * accepts n number of attributes in a key-value pair format.
     *
     * {% codeBlock src='dropdownlist/htmlAttributes/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Accepts the external `Query`
     * that execute along with data processing.
     *
     * {% codeBlock src='dropdownlist/query/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @deprecated
     */
    query: Query;
    /**
     * Accepts the template design and assigns it to the selected list item in the input element of the component.
     * For more details about the available template options refer to
     * [`Template`](../../drop-down-list/templates) documentation.
     *
     * We have built-in `template engine`
     * which provides options to compile template string into a executable function.
     * For EX: We have expression evolution as like ES6 expression string literals.
     *
     * @default null
     * @aspType string
     */
    valueTemplate: string | Function;
    /**
     * Accepts the template design and assigns it to the header container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../drop-down-list/templates) documentation.
     *
     * @default null
     * @aspType string
     */
    headerTemplate: string | Function;
    /**
     * Accepts the template design and assigns it to the footer container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../drop-down-list/templates) documentation.
     *
     * @default null
     * @aspType string
     */
    footerTemplate: string | Function;
    /**
     * When allowFiltering is set to true, show the filter bar (search box) of the component.
     * The filter action retrieves matched items through the `filtering` event based on
     * the characters typed in the search TextBox.
     *
     * If no match is found, the value of the `noRecordsTemplate` property will be displayed.
     * > For more details about the filtering refer to [`Filtering`](../../drop-down-list/filtering) documentation.
     *
     * {% codeBlock src="dropdownlist/allow-filtering-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dropdownlist/allow-filtering-api/index.html" %}{% endcodeBlock %}
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When set to false, the popup will display similarly on both mobile and desktop devices.
     *
     * @default true
     */
    isDeviceFullScreen: boolean;
    /**
     * When set to true, the user interactions on the component are disabled.
     *
     * @default false
     */
    readonly: boolean;
    /**
     * Defines whether to enable virtual scrolling in the component.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * Gets or sets a value that indicates whether the DropDownList popup can be resized.
     * When set to `true`, a resize handle appears in the bottom-right corner of the popup,
     * allowing the user to resize the width and height of the popup.
     *
     * @default false
     */
    allowResize: boolean;
    /**
     * Gets or sets the display text of the selected item in the component.
     *
     * @default null
     * @aspType string
     */
    text: string | null;
    /**
     * Gets or sets the value of the selected item in the component.
     *
     * @default null
     * @isGenericType true
     */
    value: number | string | boolean | object | null;
    /**
     * Defines whether the object binding is allowed or not in the component.
     *
     * @default false
     */
    allowObjectBinding: boolean;
    /**
     * Gets or sets the index of the selected item in the component.
     *
     * {% codeBlock src="dropdownlist/index-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dropdownlist/index-api/index.html" %}{% endcodeBlock %}
     *
     * @default null
     * @aspType double
     */
    index: number | null;
    /**
     * Specifies whether to display the floating label above the input element.
     * Possible values are:
     * * Never: The label will never float in the input when the placeholder is available.
     * * Always: The floating label will always float above the input.
     * * Auto: The floating label will float above the input after focusing or entering a value in the input.
     *
     * {% codeBlock src="dropdownlist/float-label-type-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="dropdownlist/float-label-type-api/index.html" %}{% endcodeBlock %}
     *
     * @default Syncfusion.EJ2.Inputs.FloatLabelType.Never
     * @aspType Syncfusion.EJ2.Inputs.FloatLabelType
     * @isEnumeration true
     */
    floatLabelType: FloatLabelType;
    /**
     * Specifies whether to show or hide the clear button.
     * When the clear button is clicked, `value`, `text`, and `index` properties are reset to null.
     *
     * @default false
     */
    showClearButton: boolean;
    /**
     * Triggers on typing a character in the filter bar when the
     * [`allowFiltering`](./#allowfiltering)
     * is enabled.
     * > For more details about the filtering refer to [`Filtering`](../../drop-down-list/filtering) documentation.
     *
     * @event filtering
     */
    filtering: EmitType<FilteringEventArgs>;
    /**
     * Triggers when an item in a popup is selected or when the model value is changed by user.
     * Use change event to
     * [`Configure the Cascading DropDownList`](../../drop-down-list/how-to/cascading)
     *
     * @event change
     */
    change: EmitType<ChangeEventArgs>;
    /**
     * Triggers when the popup before opens.
     *
     * @event beforeOpen
     */
    beforeOpen: EmitType<Object>;
    /**
     * Triggers when the popup opens.
     *
     * @event open
     */
    open: EmitType<PopupEventArgs>;
    /**
     * Triggers when the popup is closed.
     *
     * @event close
     */
    close: EmitType<PopupEventArgs>;
    /**
     * Triggers when focus moves out from the component.
     *
     * @event blur
     */
    blur: EmitType<Object>;
    /**
     * Triggers when the component is focused.
     *
     * @event focus
     */
    focus: EmitType<Object>;
    /**
     * Triggers when the user finishes resizing the DropDown popup.
     *
     * @event resizeStop
     */
    resizeStop: EmitType<Object>;
    /**
     * Triggers continuously while the DropDown popup is being resized by the user.
     * This event provides live updates on the width and height of the popup.
     *
     * @event resizing
     */
    resizing: EmitType<Object>;
    /**
     * Triggers when the user starts resizing the DropDown popup.
     *
     * @event resizeStart
     */
    resizeStart: EmitType<Object>;
    /**
     * * Constructor for creating the DropDownList component.
     *
     * @param {DropDownListModel} options - Specifies the DropDownList model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: DropDownListModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler.
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    private initializeData;
    protected setZIndex(): void;
    requiredModules(): ModuleDeclaration[];
    protected renderList(e?: MouseEvent | KeyboardEventArgs | TouchEvent, isEmptyData?: boolean): void;
    private floatLabelChange;
    protected resetHandler(e: MouseEvent): void;
    protected resetFocusElement(): void;
    protected clearAll(e?: MouseEvent | KeyboardEventArgs | TouchEvent, properties?: DropDownListModel): void;
    private resetSelection;
    private setHTMLAttributes;
    protected getAriaAttributes(): {
        [key: string]: string;
    };
    protected setEnableRtl(): void;
    private setEnable;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persisted data of the component.
     */
    protected getPersistData(): string;
    protected getLocaleName(): string;
    private preventTabIndex;
    protected targetElement(): HTMLElement | HTMLInputElement;
    protected getNgDirective(): string;
    protected getElementByText(text: string): Element;
    protected getElementByValue(value: string | number | boolean | object): Element;
    private initValue;
    /**
     * Checks if the given value is disabled.
     *
     * @param { string | number | boolean | object } value - The value to check for disablement. Can be a string, number, boolean, or object.
     * @returns { boolean } A boolean indicating whether the value is disabled.
     */
    protected isDisableItemValue(value: string | number | boolean | object): boolean;
    protected updateValues(): void;
    protected onBlurHandler(e: MouseEvent): void;
    protected focusOutAction(e?: MouseEvent | KeyboardEventArgs): void;
    protected onFocusOut(e?: MouseEvent | KeyboardEventArgs): void;
    protected onFocus(e?: FocusEvent | MouseEvent | KeyboardEvent | TouchEvent): void;
    protected resizingWireEvent(): void;
    protected resizingUnWireEvent(): void;
    private resetValueHandler;
    protected wireEvent(): void;
    protected bindCommonEvent(): void;
    protected windowResize(): void;
    private bindClearEvent;
    protected unBindCommonEvent(): void;
    protected updateIconState(): void;
    /**
     * Event binding for list
     *
     * @returns {void}
     */
    private wireListEvents;
    private onSearch;
    private onServerIncrementalSearch;
    protected startResizing(event: MouseEvent | TouchEvent): void;
    protected resizePopup(event?: MouseEvent | TouchEvent): void;
    protected stopResizing(event: MouseEvent | TouchEvent): void;
    protected onMouseClick(e: MouseEvent): void;
    private onMouseOver;
    private setHover;
    private onMouseLeave;
    protected removeHover(): void;
    protected isValidLI(li: Element | HTMLElement): boolean;
    protected updateIncrementalItemIndex(startIndex: number, endIndex: number): void;
    protected incrementalSearch(e: KeyboardEventArgs): void;
    /**
     * Hides the spinner loader.
     *
     * @returns {void}
     */
    hideSpinner(): void;
    /**
     * Shows the spinner loader.
     *
     * @returns {void}
     */
    showSpinner(): void;
    protected keyActionHandler(e: KeyboardEventArgs): void;
    private updateUpDownAction;
    private updateHomeEndAction;
    protected selectCurrentValueOnTab(e: KeyboardEventArgs): void;
    protected mobileKeyActionHandler(e: KeyboardEventArgs): void;
    protected handleVirtualKeyboardActions(e: KeyboardEventArgs, pageCount: number): void;
    protected selectCurrentItem(e: KeyboardEventArgs): void;
    protected isSelectFocusItem(element: Element): boolean;
    private pageUpSelection;
    private PageUpDownSelection;
    private pageDownSelection;
    protected unWireEvent(): void;
    /**
     * Event un binding for list items.
     *
     * @returns {void}
     */
    private unWireListEvents;
    protected checkSelector(id: string): string;
    protected onDocumentClick(e: MouseEvent): void;
    private activeStateChange;
    private focusDropDown;
    protected dropDownClick(e: MouseEvent): void;
    protected cloneElements(): void;
    protected updateSelectedItem(li: Element, e: MouseEvent | KeyboardEvent | TouchEvent, preventSelect?: boolean, isSelection?: boolean): void;
    private selectEventCallback;
    protected activeItem(li: Element): void;
    protected setValue(e?: KeyboardEventArgs): boolean;
    protected setSelection(li: Element, e: MouseEvent | KeyboardEventArgs | TouchEvent): void;
    private setSelectOptions;
    private dropdownCompiler;
    private setValueTemplate;
    protected removeSelection(): void;
    protected getItemData(): {
        [key: string]: string;
    };
    /**
     * To trigger the change event for list.
     *
     * @param {MouseEvent | KeyboardEvent | TouchEvent} eve - Specifies the event arguments.
     * @param {boolean} isCustomValue - Specifies whether the value is custom value or not.
     * @returns {void}
     */
    protected onChangeEvent(eve: MouseEvent | KeyboardEvent | TouchEvent, isCustomValue?: boolean): void;
    private detachChanges;
    protected detachChangeEvent(eve: MouseEvent | KeyboardEvent | TouchEvent): void;
    protected setHiddenValue(): void;
    /**
     * Filter bar implementation
     *
     * @param {KeyboardEventArgs} e - Specifies the event arguments.
     * @returns {void}
     */
    protected onFilterUp(e: KeyboardEventArgs): void;
    protected onFilterDown(e: KeyboardEventArgs): void;
    protected removeFillSelection(): void;
    protected getQuery(query: Query): Query;
    protected getSelectionPoints(): {
        [key: string]: number;
    };
    protected searchLists(e: KeyboardEventArgs | MouseEvent): void;
    /**
     * To filter the data from given data source by using query
     *
     * @param {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param {Query} query - Specify the query to filter the data.
     * @param {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     * @deprecated
     */
    filter(dataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void;
    private filteringAction;
    protected setSearchBox(popupElement: HTMLElement): InputObject;
    protected onInput(e: any): void;
    protected pasteHandler(e: KeyboardEventArgs): void;
    protected onActionFailure(e: Object): void;
    protected getTakeValue(): number;
    protected onActionComplete(ulElement: HTMLElement, list: {
        [key: string]: Object;
    }[], e?: Object, isUpdated?: boolean): void;
    private isValueInList;
    private checkFieldValue;
    private updateActionCompleteDataValues;
    private addNewItem;
    protected updateActionCompleteData(li: HTMLElement, item: {
        [key: string]: Object;
    }, index?: number): void;
    private actionCompleteDataUpdate;
    protected focusIndexItem(): void;
    protected updateSelection(): void;
    private updateSelectionList;
    protected removeFocus(): void;
    protected renderPopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent | Object): void;
    private checkCollision;
    private getOffsetValue;
    private createPopup;
    private isEmptyList;
    protected getFocusElement(): void;
    private isFilterLayout;
    private scrollHandler;
    private isElementInViewport;
    private setSearchBoxPosition;
    private setPopupPosition;
    private setWidth;
    private scrollBottom;
    private scrollTop;
    private IsScrollerAtEnd;
    protected isEditTextBox(): boolean;
    protected isFiltering(): boolean;
    protected isPopupButton(): boolean;
    protected setScrollPosition(e?: KeyboardEventArgs): void;
    private clearText;
    private setEleWidth;
    private closePopup;
    private updateInitialData;
    private destroyPopup;
    private clickOnBackIcon;
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    render(): void;
    private getListHeight;
    private setFooterTemplate;
    private setHeaderTemplate;
    /**
     * Sets the enabled state to DropDownBase.
     *
     * @returns {void}
     */
    protected setEnabled(): void;
    protected setOldText(text: string): void;
    protected setOldValue(value: string | number | boolean | object): void;
    protected refreshPopup(): void;
    protected checkData(newProp?: DropDownListModel): void;
    protected updateDataSource(props?: DropDownListModel, oldProps?: DropDownListModel): void;
    protected checkCustomValue(): void;
    private updateInputFields;
    /**
     * Dynamically change the value of properties.
     *
     * @private
     * @param {DropDownListModel} newProp - Returns the dynamic property value of the component.
     * @param {DropDownListModel} oldProp - Returns the previous previous value of the component.
     * @returns {void}
     */
    onPropertyChanged(newProp: DropDownListModel, oldProp: DropDownListModel): void;
    private checkValidLi;
    private setSelectionData;
    protected updatePopupState(): void;
    protected setReadOnly(): void;
    protected setInputValue(newProp?: any, oldProp?: any): void;
    private setCssClass;
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    getModuleName(): string;
    /**
     * Opens the popup that displays the list of items.
     *
     * @returns {void}
     */
    showPopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void;
    private executeCloneElements;
    private invokeRenderPopup;
    protected renderHightSearch(): void;
    /**
     * Hides the popup if it is in an open state.
     *
     * @returns {void}
     */
    hidePopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void;
    /**
     * Sets the focus on the component for interaction.
     *
     * @returns {void}
     */
    focusIn(e?: FocusEvent | MouseEvent | KeyboardEvent | TouchEvent): void;
    /**
     * Moves the focus from the component if the component is already focused.
     *
     * @returns {void}
     */
    focusOut(e?: MouseEvent | KeyboardEventArgs): void;
    /**
     * Method to disable specific item in the popup.
     *
     * @param {string | number | object | HTMLLIElement} item - Specifies the item to be disabled.
     * @returns {void}
     * @deprecated
     */
    disableItem(item: string | number | object | HTMLLIElement): void;
    /**
     * Removes the component from the DOM and detaches all its related event handlers. Also it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    getItems(): Element[];
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string | number } value - Specifies the value of the list item.
     * @returns {Object}
     */
    getDataByValue(value: string | number | boolean): {
        [key: string]: Object;
    } | string | number | boolean;
    /**
     * Allows you to clear the selected values from the component.
     *
     * @returns {void}
     */
    clear(): void;
}
export interface DropDownListClassList {
    root: string;
    hover: string;
    selected: string;
    rtl: string;
    base: string;
    disable: string;
    input: string;
    inputFocus: string;
    li: string;
    icon: string;
    iconAnimation: string;
    value: string;
    focus: string;
    device: string;
    backIcon: string;
    filterBarClearIcon: string;
    filterInput: string;
    resizeIcon: string;
    filterParent: string;
    mobileFilter: string;
    footer: string;
    header: string;
    clearIcon: string;
    clearIconHide: string;
    popupFullScreen: string;
    disableIcon: string;
    hiddenElement: string;
    content: string;
    virtualList: string;
}
