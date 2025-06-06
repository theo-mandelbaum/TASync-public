import { Component, KeyboardEvents, EmitType, L10n, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { AnimationModel } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SortOrder } from '@syncfusion/ej2-lists';
import { DropDownBaseModel, FieldSettingsModel } from './drop-down-base-model';
import { Popup } from '@syncfusion/ej2-popups';
import { VirtualInfo, VirtualScroll } from '../common/virtual-scroll';
import { GeneratedData } from '../drop-down-list';
export declare type FilterType = 'StartsWith' | 'EndsWith' | 'Contains';
export declare class FieldSettings extends ChildProperty<FieldSettings> {
    /**
     * Maps the text column from data table for each list item
     *
     * @default null
     */
    text: string;
    /**
     * Maps the value column from data table for each list item
     *
     * @default null
     */
    value: string;
    /**
     * Maps the icon class column from data table for each list item.
     *
     * @default null
     */
    iconCss: string;
    /**
     * Group the list items with it's related items by mapping groupBy field.
     *
     * @default null
     */
    groupBy: string;
    /**
     * Allows additional attributes such as title, disabled, etc., to configure the elements
     * in various ways to meet the criteria.
     *
     * @default null
     */
    htmlAttributes: string;
    /**
     * Defines whether the particular field value is disabled or not.
     *
     * @default null
     */
    disabled: string;
}
export declare const dropDownBaseClasses: DropDownBaseClassList;
export interface DropDownBaseClassList {
    root: string;
    rtl: string;
    content: string;
    selected: string;
    hover: string;
    noData: string;
    fixedHead: string;
    focus: string;
    li: string;
    disabled: string;
    group: string;
    grouping: string;
    virtualList: string;
}
export interface SelectEventArgs {
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted: boolean;
    /**
     * Returns the selected list item
     */
    item: HTMLLIElement;
    /**
     * Returns the selected item as JSON Object from the data source.
     *
     */
    itemData: FieldSettingsModel;
    /**
     * Specifies the original event arguments.
     */
    e: MouseEvent | KeyboardEvent | TouchEvent;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
}
export interface BeforeOpenEventArgs {
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
}
export interface ActionBeginEventArgs {
    /**
     * Specify the query to begin the data
     *
     */
    query: Query;
    /**
     * Set the data source to action begin
     *
     */
    data: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[];
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Specify the Event Name
     */
    eventName?: string;
    /**
     * Return Items
     */
    items?: Object[];
}
export interface ActionCompleteEventArgs {
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Returns the selected items as JSON Object from the data source.
     *
     */
    result?: ResultData;
    /**
     * Return the actual records.
     */
    actual?: object;
    /**
     * Return the aggregates
     */
    aggregates?: object;
    /**
     * Return the total number for records.
     */
    count?: number;
    /**
     * Specify the query to complete the data
     *
     */
    query?: Query;
    /**
     * Return the request type
     */
    request?: string;
    /**
     * Return the virtualSelectRecords
     */
    virtualSelectRecords?: object;
    /**
     * Return XMLHttpRequest
     */
    xhr: XMLHttpRequest;
    /**
     * Specify the Event Name
     */
    eventName?: string;
    /**
     * Return Items
     */
    items?: Object[];
}
export interface DataBoundEventArgs {
    /**
     * Returns the selected items as JSON Object from the data source.
     *
     */
    items: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[];
    /**
     * Return the bounded objects
     */
    e?: object;
}
/**
 * DropDownBase component will generate the list items based on given data and act as base class to drop-down related components
 */
export declare class DropDownBase extends Component<HTMLElement> implements INotifyPropertyChanged {
    protected listData: {
        [key: string]: Object;
    }[] | string[] | boolean[] | number[];
    protected ulElement: HTMLElement;
    protected incrementalLiCollections: HTMLElement[];
    protected incrementalListData: {
        [key: string]: Object;
    }[] | string[] | boolean[] | number[];
    protected incrementalUlElement: HTMLElement;
    protected liCollections: HTMLElement[];
    private bindEvent;
    private scrollTimer;
    protected list: HTMLElement;
    protected fixedHeaderElement: HTMLElement;
    protected keyboardModule: KeyboardEvents;
    protected enableRtlElements: HTMLElement[];
    protected rippleFun: Function;
    protected l10n: L10n;
    protected item: HTMLLIElement;
    protected itemData: {
        [key: string]: Object;
    } | string | number | boolean;
    protected isActive: boolean;
    protected isRequested: boolean;
    protected isDataFetched: boolean;
    protected selectData: {
        [key: string]: Object;
    }[] | string[] | boolean[] | number[];
    protected queryString: string;
    protected sortedData: {
        [key: string]: Object;
    }[] | string[] | boolean[] | number[];
    protected isGroupChecking: boolean;
    protected itemTemplateId: string;
    protected displayTemplateId: string;
    protected spinnerTemplateId: string;
    protected valueTemplateId: string;
    protected groupTemplateId: string;
    protected headerTemplateId: string;
    protected footerTemplateId: string;
    protected noRecordsTemplateId: string;
    protected actionFailureTemplateId: string;
    protected preventChange: boolean;
    protected isPreventChange: boolean;
    protected isDynamicDataChange: boolean;
    protected addedNewItem: boolean;
    protected isAddNewItemTemplate: boolean;
    protected isRequesting: boolean;
    private isVirtualizationEnabled;
    protected isCustomDataUpdated: boolean;
    private isAllowFiltering;
    private virtualizedItemsCount;
    private isCheckBoxSelection;
    protected totalItemCount: number;
    protected dataCount: number;
    protected remoteDataCount: number;
    protected isRemoteDataUpdated: boolean;
    protected virtualGroupDataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[];
    protected isIncrementalRequest: boolean;
    protected itemCount: number;
    protected initialRemoteRender: boolean;
    protected virtualListHeight: number;
    protected virtualItemCount: number;
    protected isVirtualScrolling: boolean;
    protected observer: VirtualScroll;
    protected isPreventScrollAction: boolean;
    protected scrollPreStartIndex: number;
    protected isScrollActionTriggered: boolean;
    protected previousStartIndex: number;
    protected isMouseScrollAction: boolean;
    protected isKeyBoardAction: boolean;
    protected isScrollChanged: boolean;
    protected isUpwardScrolling: boolean;
    protected containerElementRect: ClientRect;
    protected previousEndIndex: number;
    protected previousInfo: VirtualInfo;
    protected startIndex: number;
    protected currentPageNumber: number;
    protected pageCount: number;
    protected isPreventKeyAction: boolean;
    protected virtualItemStartIndex: number;
    protected virtualItemEndIndex: number;
    protected generatedDataObject: GeneratedData;
    protected listItemHeight: number;
    protected skeletonCount: number;
    protected popupContentElement: HTMLElement;
    protected keyboardEvent: KeyboardEventArgs;
    protected listContainerHeight: string;
    protected isVirtualTrackHeight: boolean;
    protected virtualSelectAll: boolean;
    protected incrementalQueryString: string;
    protected incrementalEndIndex: number;
    protected incrementalStartIndex: number;
    protected incrementalPreQueryString: string;
    protected isObjectCustomValue: boolean;
    protected appendUncheckList: boolean;
    protected getInitialData: boolean;
    protected preventPopupOpen: boolean;
    protected setCurrentView: boolean;
    protected customFilterQuery: Query;
    protected virtualSelectAllState: boolean;
    protected CurrentEvent: KeyboardEventArgs | MouseEvent;
    protected virtualSelectAllData: {
        [key: string]: Object;
    }[] | string[] | number[] | boolean[];
    protected firstItem: string | number | boolean | object;
    protected preventDefActionFilter: boolean;
    protected isDynamicData: boolean;
    protected isPrimitiveData: boolean;
    protected isCustomFiltering: boolean;
    protected virtualListInfo: VirtualInfo;
    protected viewPortInfo: VirtualInfo;
    protected selectedValueInfo: VirtualInfo;
    /**
     * The `fields` property maps the columns of the data table and binds the data to the component.
     * * text - Maps the text column from data table for each list item.
     * * value - Maps the value column from data table for each list item.
     * * iconCss - Maps the icon class column from data table for each list item.
     * * groupBy - Group the list items with it's related items by mapping groupBy field.
     * ```html
     * <input type="text" tabindex="1" id="list"> </input>
     * ```
     * ```typescript
     *   let customers: DropDownList = new DropDownList({
     *      dataSource:new DataManager({ url:'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/' }),
     *      query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(5),
     *      fields: { text: 'ContactName', value: 'CustomerID' },
     *      placeholder: 'Select a customer'
     *   });
     *   customers.appendTo("#list");
     * ```
     *
     * @default {text: null, value: null, iconCss: null, groupBy: null, disabled: null}
     * @deprecated
     */
    fields: FieldSettingsModel;
    /**
     * Accepts the template design and assigns it to each list item present in the popup.
     * We have built-in `template engine`
     *
     * which provides options to compile template string into a executable function.
     * For EX: We have expression evolution as like ES6 expression string literals.
     *
     * @default null
     * @aspType string
     * @deprecated
     */
    itemTemplate: string | Function;
    /**
     * Accepts the template design and assigns it to the group headers present in the popup list.
     *
     * @default null
     * @aspType string
     * @deprecated
     */
    groupTemplate: string | Function;
    /**
     * Accepts the template design and assigns it to popup list of component
     * when no data is available on the component.
     *
     * @default 'No records found'
     * @aspType string
     * @deprecated
     */
    noRecordsTemplate: string | Function;
    /**
     * Accepts the template and assigns it to the popup list content of the component
     * when the data fetch request from the remote server fails.
     *
     * @default 'Request failed'
     * @aspType string
     * @deprecated
     */
    actionFailureTemplate: string | Function;
    /**
     * Specifies the `sortOrder` to sort the data source. The available type of sort orders are
     * * `None` - The data source is not sorting.
     * * `Ascending` - The data source is sorting with ascending order.
     * * `Descending` - The data source is sorting with descending order.
     *
     * @default null
     * @asptype object
     * @aspjsonconverterignore
     * @deprecated
     */
    sortOrder: SortOrder;
    /**
     * Accepts the list items either through local or remote service and binds it to the component.
     * It can be an array of JSON Objects or an instance of
     * `DataManager`.
     *
     * @default []
     * @deprecated
     */
    dataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[];
    /**
     * Accepts the external `Query`
     * which will execute along with the data processing.
     *
     * @default null
     * @deprecated
     */
    query: Query;
    /**
     * Determines on which filter type, the component needs to be considered on search action.
     * The `FilterType` and its supported data types are
     *
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * FilterType<br/></td><td colSpan=1 rowSpan=1>
     * Description<br/></td><td colSpan=1 rowSpan=1>
     * Supported Types<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * StartsWith<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value begins with the specified value.<br/></td><td colSpan=1 rowSpan=1>
     * String<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * EndsWith<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value ends with specified value.<br/><br/></td><td colSpan=1 rowSpan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Contains<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value contains with specified value.<br/><br/></td><td colSpan=1 rowSpan=1>
     * <br/>String<br/></td></tr>
     * </table>
     *
     * The default value set to `StartsWith`, all the suggestion items which contain typed characters to listed in the suggestion popup.
     *
     * @default 'StartsWith'
     * @deprecated
     */
    filterType: FilterType;
    /**
     * When set to ‘false’, consider the `case-sensitive` on performing the search to find suggestions.
     * By default consider the casing.
     *
     * @default true
     * @deprecated
     */
    ignoreCase: boolean;
    /**
     * specifies the z-index value of the component popup element.
     *
     * @default 1000
     * @deprecated
     */
    zIndex: number;
    /**
     * ignoreAccent set to true, then ignores the diacritic characters or accents when filtering.
     *
     * @deprecated
     */
    ignoreAccent: boolean;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
     *
     * @default 'en-US'
     * @deprecated
     */
    locale: string;
    /**
     * Triggers before fetching data from the remote server.
     *
     * @event actionBegin
     */
    actionBegin: EmitType<Object>;
    /**
     * Triggers after data is fetched successfully from the remote server.
     *
     * @event actionComplete
     */
    actionComplete: EmitType<Object>;
    /**
     * Triggers when the data fetch request from the remote server fails.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<Object>;
    /**
     * Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation.
     *
     * @event select
     */
    select: EmitType<SelectEventArgs>;
    /**
     * Triggers when data source is populated in the popup list..
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * * Constructor for DropDownBase class
     *
     * @param {DropDownBaseModel} options - Specifies the DropDownBase model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: DropDownBaseModel, element?: string | HTMLElement);
    protected getPropObject(prop: string, newProp: {
        [key: string]: string;
    }, oldProp: {
        [key: string]: string;
    }): {
        [key: string]: Object;
    };
    protected getValueByText(text: string, ignoreCase?: boolean, ignoreAccent?: boolean): string | number | boolean;
    private checkValueCase;
    private checkingAccent;
    private checkIgnoreCase;
    private checkNonIgnoreCase;
    private getItemValue;
    private templateCompiler;
    protected l10nUpdate(actionFailure?: boolean): void;
    protected checkAndResetCache(): void;
    protected updateIncrementalInfo(startIndex: number, endIndex: number): void;
    protected updateIncrementalView(startIndex: number, endIndex: number): void;
    protected updateVirtualItemIndex(): void;
    protected getFilteringSkeletonCount(): void;
    protected getSkeletonCount(retainSkeleton?: boolean): void;
    protected GetVirtualTrackHeight(): string;
    protected getTransformValues(): string;
    protected UpdateSkeleton(isSkeletonCountChange?: boolean, skeletonCount?: number): void;
    protected getLocaleName(): string;
    protected getTextByValue(value: string | number | boolean): string;
    protected getFormattedValue(value: string): string | number | boolean;
    /**
     * Sets RTL to dropdownbase wrapper
     *
     * @returns {void}
     */
    protected setEnableRtl(): void;
    /**
     * Initialize the Component.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - The event object.
     * @returns {void}
     */
    private initialize;
    /**
     * Get the properties to be maintained in persisted state.
     *
     * @returns {string} Returns the persisted data of the component.
     */
    protected getPersistData(): string;
    /**
     * Sets the enabled state to DropDownBase.
     *
     * @param {string} value - Specifies the attribute values to add on the input element.
     * @returns {void}
     */
    protected updateDataAttribute(value: {
        [key: string]: string;
    }): void;
    private renderItemsBySelect;
    private updateFields;
    private getJSONfromOption;
    /**
     * Execute before render the list items
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Creates the list items of DropDownBase component.
     *
     * @param {Object[] | string[] | number[] | DataManager | boolean[]} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} event - Specifies the event which is the reason for the invocation of this method.
     * @returns {void}
     */
    private setListData;
    protected handleVirtualKeyboardActions(e: KeyboardEventArgs, pageCount: number): void;
    protected updatePopupState(): void;
    protected updatePopupPosition(): void;
    protected virtualSelectionAll(state: boolean, li: NodeListOf<HTMLElement> | HTMLElement[], event: MouseEvent | KeyboardEventArgs): void;
    protected updateRemoteData(): void;
    private bindChildItems;
    protected isObjectInArray(objectToFind: any, array: any[]): boolean;
    protected updateListValues(): void;
    protected findListElement(list: HTMLElement, findNode: string, attribute: string, value: string | boolean | number): HTMLElement;
    private raiseDataBound;
    private remainingItems;
    private emptyDataRequest;
    protected showSpinner(): void;
    protected hideSpinner(): void;
    protected onActionFailure(e: Object): void;
    protected onActionComplete(ulElement: HTMLElement, list: {
        [key: string]: Object;
    }[] | boolean[] | string[] | number[], e?: Object): void;
    protected postRender(listElement: HTMLElement, list: {
        [key: string]: Object;
    }[] | number[] | string[] | boolean[], bindEvent: boolean): void;
    /**
     * Get the query to do the data operation before list item generation.
     *
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @returns {Query} Returns the query to do the data query operation.
     */
    protected getQuery(query: Query): Query;
    protected updateVirtualizationProperties(itemCount: number, filtering: boolean, isCheckbox?: boolean): void;
    /**
     * To render the template content for group header element.
     *
     * @param {HTMLElement} listEle - Specifies the group list elements.
     * @returns {void}
     */
    private renderGroupTemplate;
    /**
     * To create the ul li list items
     *
     * @param {object []} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @returns {HTMLElement} Return the ul li list items.
     */
    protected createListItems(dataSource: {
        [key: string]: Object;
    }[], fields: FieldSettingsModel): HTMLElement;
    protected listOption(dataSource: {
        [key: string]: Object;
    }[] | string[] | number[] | boolean[], fields: FieldSettingsModel): FieldSettingsModel;
    protected setFloatingHeader(e: Event): void;
    protected scrollStop(e?: Event, isDownkey?: boolean): void;
    protected getPageCount(returnExactCount?: boolean): number;
    private updateGroupHeader;
    private updateGroupFixedHeader;
    protected getValidLi(): HTMLElement;
    /**
     * To render the list items
     *
     * @param {object[]} listData - Specifies the list of array of data.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {boolean} isCheckBoxUpdate - Specifies whether the list item is updated with checkbox.
     * @returns {HTMLElement} Return the list items.
     */
    protected renderItems(listData: {
        [key: string]: Object;
    }[], fields: FieldSettingsModel, isCheckBoxUpdate?: boolean): HTMLElement;
    private createVirtualContent;
    private updateListElements;
    protected templateListItem(dataSource: {
        [key: string]: Object;
    }[], fields: FieldSettingsModel): HTMLElement;
    protected typeOfData(items: {
        [key: string]: Object;
    }[] | string[] | number[] | boolean[]): {
        [key: string]: Object;
    };
    protected setFixedHeader(): void;
    private getSortedDataSource;
    /**
     * Return the index of item which matched with given value in data source
     *
     * @param {string | number | boolean} value - Specifies given value.
     * @returns {number} Returns the index of the item.
     */
    protected getIndexByValue(value: string | number | boolean | object): number;
    /**
     * Return the index of item which matched with given value in data source
     *
     * @param {string | number | boolean} value - Specifies given value.
     * @param {HTMLElement} ulElement - Specifies given value.
     * @returns {number} Returns the index of the item.
     */
    protected getIndexByValueFilter(value: string | number | boolean, ulElement: HTMLElement): number | null;
    /**
     * To dispatch the event manually
     *
     * @param {HTMLElement} element - Specifies the element to dispatch the event.
     * @param {string} type - Specifies the name of the event.
     * @returns {void}
     */
    protected dispatchEvent(element: HTMLElement, type: string): void;
    /**
     * To set the current fields
     *
     * @returns {void}
     */
    protected setFields(): void;
    /**
     * reset the items list.
     *
     * @param {Object[] | string[] | number[] | DataManager | boolean[]} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    protected resetList(dataSource?: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[], fields?: FieldSettingsModel, query?: Query, e?: MouseEvent | KeyboardEventArgs | TouchEvent): void;
    protected updateSelectElementData(isFiltering: boolean): void;
    protected updateSelection(): void;
    protected renderList(): void;
    protected updateDataSource(props?: DropDownBaseModel, oldProps?: DropDownBaseModel): void;
    protected setUpdateInitial(props: string[], newProp: {
        [key: string]: string;
    }, oldProp?: {
        [key: string]: string;
    }): void;
    /**
     * When property value changes happened, then onPropertyChanged method will execute the respective changes in this component.
     *
     * @param {DropDownBaseModel} newProp - Returns the dynamic property value of the component.
     * @param {DropDownBaseModel} oldProp - Returns the previous property value of the component.
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp: DropDownBaseModel, oldProp: DropDownBaseModel): void;
    /**
     * Build and render the component
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @param {boolean} isEmptyData - Specifies the component to initialize with list data or not.
     * @private
     * @returns {void}
     */
    render(e?: MouseEvent | KeyboardEventArgs | TouchEvent, isEmptyData?: boolean): void;
    protected removeScrollEvent(): void;
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    getModuleName(): string;
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    getItems(): Element[];
    /**
     * Adds a new item to the popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     *
     * @param { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } itemIndex - Specifies the index to place the newly added item in the popup list.
     * @returns {void}
     * @deprecated
     */
    addItem(items: {
        [key: string]: Object;
    }[] | {
        [key: string]: Object;
    } | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    /**
     * Checks if the given HTML element is disabled.
     *
     * @param {HTMLElement} li - The HTML element to check.
     * @returns {boolean} - Returns true if the element is disabled, otherwise false.
     */
    protected isDisabledElement(li: HTMLElement): boolean;
    /**
     * Checks whether the list item at the specified index is disabled.
     *
     * @param {number} index - The index of the list item to check.
     * @returns {boolean} True if the list item is disabled, false otherwise.
     */
    protected isDisabledItemByIndex(index: number): boolean;
    /**
     * Disables the given list item.
     *
     * @param { HTMLLIElement } li - The list item to disable.
     * @returns {void}
     */
    protected disableListItem(li: HTMLLIElement): void;
    protected validationAttribute(target: HTMLElement, hidden: Element): void;
    protected setZIndex(): void;
    protected updateActionCompleteData(li: HTMLElement, item: {
        [key: string]: Object;
    }, index?: number): void;
    protected updateAddItemList(list: HTMLElement, itemCount: number): void;
    protected updateDataList(): void;
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string | number } value - Specifies the value of the list item.
     * @returns {Object}
     */
    getDataByValue(value: string | number | boolean | object): {
        [key: string]: Object;
    } | string | number | boolean;
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
}
export interface ResultData {
    /**
     * To return the JSON result.
     */
    result: {
        [key: string]: Object;
    }[];
}
export interface FilteringEventArgs {
    /**
     * To prevent the internal filtering action.
     */
    preventDefaultAction: boolean;
    /**
     * Gets the `keyup` event arguments.
     */
    baseEventArgs: Object;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel: boolean;
    /**
     * Search text value.
     */
    text: string;
    /**
     * To filter the data from given data source by using query
     *
     * @param  {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param  {Query} query - Specify the query to filter the data.
     * @param  {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     */
    updateData(dataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void;
}
export interface PopupEventArgs {
    /**
     * Specifies the popup Object.
     *
     * @deprecated
     */
    popup: Popup;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Specifies the animation Object.
     */
    animation?: AnimationModel;
    /**
     * Specifies the event.
     */
    event?: MouseEvent | KeyboardEventArgs | TouchEvent | Object;
}
export interface FocusEventArgs {
    /**
     * Specifies the focus interacted.
     */
    isInteracted?: boolean;
    /**
     * Specifies the event.
     */
    event?: MouseEvent | FocusEvent | TouchEvent | KeyboardEvent;
}
