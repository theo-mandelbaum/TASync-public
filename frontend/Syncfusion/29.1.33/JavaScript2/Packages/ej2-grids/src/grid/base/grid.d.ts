import { Component, ModuleDeclaration, ChildProperty, TouchEventArgs } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n } from '@syncfusion/ej2-base';
import { KeyboardEvents, EmitType } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridModel, ResizeSettingsModel } from './grid-model';
import { ReturnType, BatchChanges } from '../base/type';
import { IDialogUI, ScrollPositionType, ActionArgs, ExportGroupCaptionEventArgs, FilterUI, LazyLoadArgs, ContextMenuClickEventArgs, NotifyArgs, ExportHeaders, DetailTemplateDetachArgs } from './interface';
import { AggregateQueryCellInfoEventArgs, IGrid } from './interface';
import { IRenderer, IValueFormatter, IFilterOperator, IIndex, RowDataBoundEventArgs, QueryCellInfoEventArgs } from './interface';
import { CellDeselectEventArgs, CellSelectEventArgs, CellSelectingEventArgs, ParentDetails, ContextMenuItemModel } from './interface';
import { PdfQueryCellInfoEventArgs, ExcelQueryCellInfoEventArgs, ExcelExportProperties, PdfExportProperties } from './interface';
import { PdfHeaderQueryCellInfoEventArgs, ExcelHeaderQueryCellInfoEventArgs, ExportDetailDataBoundEventArgs, ExportDetailTemplateEventArgs } from './interface';
import { ColumnMenuOpenEventArgs, BatchCancelArgs, RecordDoubleClickEventArgs, DataResult } from './interface';
import { HeaderCellInfoEventArgs, KeyboardEventArgs, RecordClickEventArgs, AdaptiveDialogEventArgs } from './interface';
import { FailureEventArgs, FilterEventArgs, ColumnDragEventArgs, GroupEventArgs, PrintEventArgs, ICustomOptr, ReorderEventArgs } from './interface';
import { RowDeselectEventArgs, RowSelectEventArgs, RowSelectingEventArgs, RowDeselectingEventArgs, PageEventArgs, RowDragEventArgs } from './interface';
import { BeforeBatchAddArgs, BeforeBatchDeleteArgs, BeforeBatchSaveArgs, ResizeArgs, ColumnMenuItemModel } from './interface';
import { BatchAddArgs, BatchDeleteArgs, BeginEditArgs, CellEditArgs, CellSaveArgs, BeforeDataBoundArgs, RowInfo } from './interface';
import { DetailDataBoundEventArgs, ColumnChooserEventArgs, AddEventArgs, SaveEventArgs, EditEventArgs, DeleteEventArgs } from './interface';
import { ExcelExportCompleteArgs, PdfExportCompleteArgs, DataStateChangeEventArgs, DataSourceChangedEventArgs } from './interface';
import { SearchEventArgs, SortEventArgs, ISelectedCell, BeforeCopyEventArgs, ColumnDataStateChangeEventArgs } from './interface';
import { BeforePasteEventArgs, CheckBoxChangeEventArgs, CommandClickEventArgs, BeforeAutoFillEventArgs } from './interface';
import { Render } from '../renderer/render';
import { Column, ColumnModel, ActionEventArgs } from '../models/column';
import { SelectionType, GridLine, SortDirection, SelectionMode, PrintMode, FilterType, FilterBarMode } from './enum';
import { CheckboxSelectionType, HierarchyGridPrintMode, NewRowPosition, ClipMode, freezeMode, IndicatorType } from './enum';
import { WrapMode, ToolbarItems, ContextMenuItem, ColumnMenuItem, ToolbarItem, CellSelectionMode, EditMode, ResizeMode } from './enum';
import { ColumnQueryModeType, RowRenderingDirection, AdaptiveMode } from './enum';
import { Data } from '../actions/data';
import { ServiceLocator } from '../services/service-locator';
import { ColumnWidthService } from '../services/width-controller';
import { AriaService } from '../services/aria-service';
import { FocusStrategy } from '../services/focus-strategy';
import { SortSettingsModel, SelectionSettingsModel, FilterSettingsModel, SearchSettingsModel, EditSettingsModel } from './grid-model';
import { SortDescriptorModel, PredicateModel, RowDropSettingsModel, GroupSettingsModel, TextWrapSettingsModel, LoadingIndicatorModel } from './grid-model';
import { InfiniteScrollSettingsModel } from './grid-model';
import { PageSettingsModel, AggregateRowModel, AggregateColumnModel, ColumnChooserSettingsModel } from '../models/models';
import { Sort } from '../actions/sort';
import { Page } from '../actions/page';
import { Selection } from '../actions/selection';
import { Filter } from '../actions/filter';
import { Search } from '../actions/search';
import { Resize } from '../actions/resize';
import { Reorder } from '../actions/reorder';
import { RowDD } from '../actions/row-reorder';
import { ShowHide } from '../actions/show-hide';
import { Scroll } from '../actions/scroll';
import { InfiniteScroll } from '../actions/infinite-scroll';
import { Group } from '../actions/group';
import { Print } from '../actions/print';
import { DetailRow } from '../actions/detail-row';
import { Toolbar } from '../actions/toolbar';
import { Edit } from '../actions/edit';
import { Row } from '../models/row';
import { ColumnChooser } from '../actions/column-chooser';
import { ExcelExport } from '../actions/excel-export';
import { PdfExport } from '../actions/pdf-export';
import { Clipboard } from '../actions/clipboard';
import { ContextMenu } from '../actions/context-menu';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { ColumnMenu } from '../actions/column-menu';
import { CheckState } from './enum';
import { Aggregate } from '../actions/aggregate';
import { ColumnDeselectEventArgs, ColumnSelectEventArgs, ColumnSelectingEventArgs } from './interface';
import { Workbook } from '@syncfusion/ej2-excel-export';
/**
 * Represents the field name and direction of sort column.
 */
export declare class SortDescriptor extends ChildProperty<SortDescriptor> {
    /**
     * Defines the field name of sort column.
     *
     * @default ''
     */
    field: string;
    /**
     * Defines the direction of sort column.
     *
     * @default ''
     */
    direction: SortDirection;
    /**
     * @hidden
     * Defines the sorted column whether or from grouping operation.
     *
     * @default false
     */
    isFromGroup: boolean;
}
/**
 * Configures the sorting behavior of Grid.
 */
export declare class SortSettings extends ChildProperty<SortSettings> {
    /**
     * Specifies the columns to sort at initial rendering of Grid.
     * Also user can get current sorted columns.
     *
     * @default []
     */
    columns: SortDescriptorModel[];
    /**
     * If `allowUnsort` set to false the user can not get the grid in unsorted state by clicking the sorted column header.
     *
     * @default true
     */
    allowUnsort: boolean;
}
/**
 * Represents the predicate for the filter column.
 */
export declare class Predicate extends ChildProperty<Predicate> {
    /**
     * Defines the field name of the filter column.
     *
     * @default ''
     */
    field: string;
    /**
     * Defines the operator to filter records. The available operators and its supported data types are:
     * <table>
     * <tr>
     * <td colspan=1 rowspan=1>
     * Operator<br/></td><td colspan=1 rowspan=1>
     * Description<br/></td><td colspan=1 rowspan=1>
     * Supported Types<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * startswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value begins with the specified value.<br/></td><td colspan=1 rowspan=1>
     * String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * endswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value ends with the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * contains<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value contains the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * equal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String | Number | Boolean | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * notequal<br/></td><td colspan=1 rowspan=1>
     * Checks for values that are not equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String | Number | Boolean | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * greaterthan<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is greater than the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * greaterthanorequal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is greater than or equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * lessthan<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is less than the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * lessthanorequal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is less than or equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * </table>
     *
     * @default null
     */
    operator: string;
    /**
     * Defines the value used to filter records.
     *
     * @default ''
     */
    value: string | number | Date | boolean | (string | number | Date | boolean)[];
    /**
     * If match case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     *
     * @default null
     */
    matchCase: boolean;
    /**
     * If ignoreAccent is set to true, then filter ignores the diacritic characters or accents while filtering.
     *
     * @default false
     */
    ignoreAccent: boolean;
    /**
     * Defines the relationship between one filter query and another by using AND or OR predicate.
     *
     * @default null
     */
    predicate: string;
    /**
     * @hidden
     * Defines the actual filter value for the filter column.
     */
    actualFilterValue: Object;
    /**
     * @hidden
     * Defines the actual filter operator for the filter column.
     */
    actualOperator: Object;
    /**
     * @hidden
     * Defines the type of the filter column.
     */
    type: string;
    /**
     * @hidden
     * Defines the predicate of filter column.
     */
    ejpredicate: Object;
    /**
     * Defines the UID of filter column.
     *
     * @default ''
     */
    uid: string;
    /**
     * @hidden
     * Defines the foreignKey availability in filtered columns.
     */
    isForeignKey: boolean;
    /**
     * Defines the condition to add the new predicates on existing predicate with "and"/"or" operator.
     *
     * @default ''
     */
    condition: string;
}
/**
 * Configures the infinite scroll behavior of Grid.
 */
export declare class InfiniteScrollSettings extends ChildProperty<InfiniteScrollSettings> {
    /**
     * If `enableCache` is set to true, the Grid will cache the loaded data to be reused next time it is needed.
     *
     * @default false
     */
    enableCache: boolean;
    /**
     * Defines the number of blocks to be maintained in Grid while settings enableCache as true.
     *
     * @default 3
     */
    maxBlocks: number;
    /**
     * Defines the number of blocks that will render at the initial Grid rendering.
     *
     * @default 3
     */
    initialBlocks: number;
}
/**
 * Configures the filtering behavior of the Grid.
 */
export declare class FilterSettings extends ChildProperty<FilterSettings> {
    /**
     * Specifies the columns to be filtered at initial rendering of the Grid. You can also get the columns that were currently filtered.
     *
     * @default []
     */
    columns: PredicateModel[];
    /**
     * Defines options for filtering type. The available options are
     * * `Menu` - Specifies the filter type as menu.
     * * `CheckBox` - Specifies the filter type as checkbox.
     * * `FilterBar` - Specifies the filter type as filterbar.
     * * `Excel` - Specifies the filter type as checkbox.
     *
     * @default FilterBar
     */
    type: FilterType;
    /**
     * Defines the filter bar modes. The available options are,
     * * `OnEnter`: Initiates filter operation after Enter key is pressed.
     * * `Immediate`: Initiates filter operation after a certain time interval. By default, time interval is 1500 ms.
     *
     * @default OnEnter
     */
    mode: FilterBarMode;
    /**
     * Shows or hides the filtered status message on the pager.
     *
     * @default true
     */
    showFilterBarStatus: boolean;
    /**
     * Defines the time delay (in milliseconds) in filtering records when the `Immediate` mode of filter bar is set.
     *
     * @default 1500
     */
    immediateModeDelay: number;
    /**
     * The `operators` is used to override the default operators in filter menu. This should be defined by type wise
     * (string, number, date and boolean). Based on the column type, this customize operator list will render in filter menu.
     *
     * > Check the [`Filter Menu Operator`](../../grid/filtering/filter-menu#customizing-filter-menu-operators-list) customization.
     *
     * @default null
     */
    operators: ICustomOptr;
    /**
     * If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     *
     * > Check the [`Diacritics`](../../grid/filtering/#diacritics/) filtering.
     *
     * @default false
     */
    ignoreAccent: boolean;
    /**
     * If `enableInfiniteScrolling` set to true, then the data will be loaded in Checkbox filter `Popup` content, when the scrollbar reaches the end.
     * This helps to load large dataset in Checkbox filter `Popup` content.
     * {% codeBlock src='grid/enableInfiniteScrolling/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableInfiniteScrolling: boolean;
    /**
     * If `enableInfiniteScrolling` set to true, For on demand request, Gets data from the parent data source based on given number of records count.
     *
     * @default 100
     */
    itemsCount: number;
    /**
     * Defines the loading indicator. The available loading indicator are:
     * * Spinner
     * * Shimmer
     *
     * @default Shimmer
     */
    loadingIndicator: IndicatorType;
    /**
     * If `enableCaseSensitivity` is set to true then searches grid records with exact match based on the filter
     * operator. It will have no effect on number, boolean and Date fields.
     *
     * @default false
     */
    enableCaseSensitivity: boolean;
    /**
     * If 'showFilterBarOperator' is set to true, then it renders the dropdownlist component to select the operator
     * in filterbar input
     *
     * @default false
     */
    showFilterBarOperator: boolean;
}
/**
 * Configures the selection behavior of the Grid.
 */
export declare class SelectionSettings extends ChildProperty<SelectionSettings> {
    /**
     * Grid supports row, cell, and both (row and cell) selection mode.
     *
     * @default Row
     */
    mode: SelectionMode;
    /**
     * The cell selection modes are flow and box. It requires the selection
     * [`mode`](./selectionmode/) to be either cell or both.
     * * `Flow`: Selects the range of cells between start index and end index that also includes the other cells of the selected rows.
     * * `Box`: Selects the range of cells within the start and end column indexes that includes in between cells of rows within the range.
     * * `BoxWithBorder`: Selects the range of cells as like Box mode with borders.
     *
     * @default Flow
     */
    cellSelectionMode: CellSelectionMode;
    /**
     * Defines options for selection type. They are
     * * `Single`: Allows selection of only a row or a cell.
     * * `Multiple`: Allows selection of multiple rows or cells.
     *
     * @default Single
     */
    type: SelectionType;
    /**
     * If 'checkboxOnly' set to true, then the Grid selection is allowed only through checkbox.
     *
     * > To enable checkboxOnly selection, should specify the column type as`checkbox`.
     *
     * @default false
     */
    checkboxOnly: boolean;
    /**
     * If 'persistSelection' set to true, then the Grid selection is persisted on all operations.
     * For persisting selection in the Grid, any one of the column should be enabled as a primary key.
     *
     * @default false
     */
    persistSelection: boolean;
    /**
     * Defines options for checkbox selection Mode. They are
     * * `Default`: This is the default value of the checkboxMode. In this mode, user can select multiple rows by clicking rows one by one.
     * * `ResetOnRowClick`: In ResetOnRowClick mode, on clicking a row it will reset previously selected row and also multiple
     *  rows can be selected by using CTRL or SHIFT key.
     *
     * @default Default
     */
    checkboxMode: CheckboxSelectionType;
    /**
     * If 'enableSimpleMultiRowSelection' set to true, then the user can able to perform multiple row selection with single clicks.
     *
     * @default false
     */
    enableSimpleMultiRowSelection: boolean;
    /**
     * If 'enableToggle' set to true, then the user can able to perform toggle for the selected row.
     *
     * @default true
     */
    enableToggle: boolean;
    /**
     * If 'allowColumnSelection' set to true, then the user can able to select the columns.
     *
     * @default false
     */
    allowColumnSelection: boolean;
}
/**
 * Configures the search behavior of the Grid.
 */
export declare class SearchSettings extends ChildProperty<SearchSettings> {
    /**
     * Specifies the collection of fields included in search operation. By default, bounded columns of the Grid are included.
     *
     * @default []
     */
    fields: string[];
    /**
     * Specifies the key value to search Grid records at initial rendering.
     * You can also get the current search key.
     *
     * @default ''
     */
    key: string;
    /**
     * Defines the operator to search records. The available operators are:
     * <table>
     * <tr>
     * <td colspan=1 rowspan=1>
     * Operator<br/></td><td colspan=1 rowspan=1>
     * Description<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * startswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string begins with the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * endswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string ends with the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * contains<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string contains the specified string. <br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * equal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string is equal to the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * notequal<br/></td><td colspan=1 rowspan=1>
     * Checks for strings not equal to the specified string. <br/></td></tr>
     * </table>
     *
     * @default 'contains'
     */
    operator: string;
    /**
     * If `ignoreCase` is set to false, searches records that match exactly, else
     * searches records that are case insensitive(uppercase and lowercase letters treated the same).
     *
     * @default true
     */
    ignoreCase: boolean;
    /**
     * If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     *
     * > Check the [`Diacritics`](../../grid/filtering/#diacritics/) filtering.
     *
     * @default false
     */
    ignoreAccent: boolean;
}
/**
 * Configures the row drop settings of the Grid.
 */
export declare class RowDropSettings extends ChildProperty<RowDropSettings> {
    /**
     * Defines the ID of droppable component on which row drop should occur.
     *
     * @default null
     */
    targetID: string;
}
/**
 * Configures the text wrap settings of the Grid.
 */
export declare class TextWrapSettings extends ChildProperty<TextWrapSettings> {
    /**
     * The `wrapMode` property defines how the text in the grid cells should be wrapped. The available modes are:
     * * `Both`: Wraps text in both the header and content cells.
     * * `Content`: Wraps text in the content cells only.
     * * `Header`: Wraps texts in the header cells only.
     *
     * @default Both
     */
    wrapMode: WrapMode;
}
/**
 * Configures the resize behavior of the Grid.
 */
export declare class ResizeSettings extends ChildProperty<ResizeSettings> {
    /**
     * Defines the mode of Grid column resizing. The available modes are:
     * `Normal`: Columns will not be adjusted to fit the remaining space.
     * `Auto`: Resized column width will be adjusted by other columns automatically.
     *
     * @default Normal
     */
    mode: ResizeMode;
}
/**
 * Configures the group behavior of the Grid.
 */
export declare class GroupSettings extends ChildProperty<GroupSettings> {
    /**
     * If `showDropArea` is set to true, the group drop area element will be visible at the top of the Grid.
     *
     * @default true
     */
    showDropArea: boolean;
    /**
     * If `allowReordering` is set to true, Grid allows the grouped elements to be reordered.
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `showToggleButton` set to true, then the toggle button will be showed in the column headers which can be used to group
     * or ungroup columns by clicking them.
     *
     * @default false
     */
    showToggleButton: boolean;
    /**
     * If `showGroupedColumn` is set to false, it hides the grouped column after grouping.
     *
     * @default false
     */
    showGroupedColumn: boolean;
    /**
     * If `showUngroupButton` set to false, then ungroup button is hidden in dropped element.
     * It can be used to ungroup the grouped column when click on ungroup button.
     *
     * @default true
     */
    showUngroupButton: boolean;
    /**
     * If `disablePageWiseAggregates` set to true, then the group aggregate value will
     * be calculated from the whole data instead of paged data and two requests will be made for each page
     * when Grid bound with remote service.
     *
     * @default false
     */
    disablePageWiseAggregates: boolean;
    /**
     * Specifies the column names to group at initial rendering of the Grid.
     * You can also get the currently grouped columns.
     *
     * @default []
     */
    columns: string[];
    /**
     * The Caption Template allows user to display the string or HTML element in group caption.
     * > It accepts either the
     * [template string](https://ej2.syncfusion.com/documentation/common/template-engine/) or the HTML element ID.
     *
     * @default null
     * @aspType string
     */
    captionTemplate: string | Object | Function;
    /**
     * The Lazy load grouping, allows the Grid to render only the initial level caption rows in collapsed state while grouping.
     * The child rows of each caption will render only when we expand the captions.
     *
     * @default false
     */
    enableLazyLoading: boolean;
}
/**
 * Configures the edit behavior of the Grid.
 */
export declare class EditSettings extends ChildProperty<EditSettings> {
    /**
     * If `allowAdding` is set to true, new records can be added to the Grid.
     *
     * @default false
     */
    allowAdding: boolean;
    /**
     * If `allowEditing` is set to true, values can be updated in the existing record.
     *
     * @default false
     */
    allowEditing: boolean;
    /**
     * If `allowDeleting` is set to true, existing record can be deleted from the Grid.
     *
     * @default false
     */
    allowDeleting: boolean;
    /**
     * Defines the mode to edit. The available editing modes are:
     * * Normal
     * * Dialog
     * * Batch
     *
     * @default Normal
     */
    mode: EditMode;
    /**
     * If `allowEditOnDblClick` is set to false, Grid will not allow editing of a record on double click.
     *
     * @default true
     */
    allowEditOnDblClick: boolean;
    /**
     * if `showConfirmDialog` is set to false, confirm dialog does not show when batch changes are saved or discarded.
     *
     * @default true
     */
    showConfirmDialog: boolean;
    /**
     * If `showDeleteConfirmDialog` is set to true, confirm dialog will show delete action. You can also cancel delete command.
     *
     * @default false
     */
    showDeleteConfirmDialog: boolean;
    /**
     * Defines the custom edit elements for the dialog template.
     *
     * @default null
     * @aspType string
     */
    template: string | Object | Function;
    /**
     * Defines the custom edit elements for the dialog header template.
     *
     * @default null
     * @aspType string
     */
    headerTemplate: string | Object | Function;
    /**
     * Defines the custom edit elements for the dialog footer template.
     *
     * @default null
     * @aspType string
     */
    footerTemplate: string | Object | Function;
    /**
     * Defines the position of adding a new row. The available position are:
     * * Top
     * * Bottom
     *
     * @default Top
     */
    newRowPosition: NewRowPosition;
    /**
     * Defines the dialog params to edit.
     *
     * @default {}
     */
    dialog: IDialogUI;
    /**
     * If allowNextRowEdit is set to true, editing is done to next row. By default allowNextRowEdit is set to false.
     *
     * @default false
     */
    allowNextRowEdit: boolean;
    /**
     * If `showAddNewRow` is set to true, it indicates whether to display the add new form by default in the grid.
     *
     * @default false
     */
    showAddNewRow: boolean;
}
/**
 * Configures the Loading Indicator of the Grid.
 */
export declare class LoadingIndicator extends ChildProperty<LoadingIndicator> {
    /**
     * Defines the loading indicator. The available loading indicator are:
     * * Spinner
     * * Shimmer
     *
     * @default Spinner
     */
    indicatorType: IndicatorType;
}
/**
 * Represents the Grid component.
 * ```html
 * <div id="grid"></div>
 * <script>
 *  var gridObj = new Grid({ allowPaging: true });
 *  gridObj.appendTo("#grid");
 * </script>
 * ```
 */
export declare class Grid extends Component<HTMLElement> implements INotifyPropertyChanged {
    private gridPager;
    private isInitial;
    isPreventScrollEvent: boolean;
    private columnModel;
    private rowTemplateFn;
    private emptyRecordTemplateFn;
    private editTemplateFn;
    private editHeaderTemplateFn;
    private editFooterTemplateFn;
    private columnChooserTemplateFn;
    private columnChooserHeaderTemplateFn;
    private columnChooserFooterTemplateFn;
    private detailTemplateFn;
    private sortedColumns;
    private footerElement;
    private inViewIndexes;
    private mediaCol;
    private getShowHideService;
    private keyA;
    private frozenRightCount;
    private freezeColumnRefresh;
    private rightcount;
    private frozenLeftCount;
    private leftcount;
    private tablesCount;
    private movableCount;
    private movablecount;
    private fixedcount;
    private fixedCount;
    private visibleFrozenLeft;
    private visibleFrozenFixed;
    private frozenName;
    private isPreparedFrozenColumns;
    private visibleFrozenRight;
    private visibleMovable;
    private frozenLeftColumns;
    private frozenRightColumns;
    private movableColumns;
    private fixedColumns;
    private stackedLeft;
    private stackedRight;
    private stackedFixed;
    private stackedMovable;
    private stackedarrayLeft;
    private stackedarrayRight;
    private stackedarrayFixed;
    private stackedarrayMovable;
    private media;
    private headerMaskTable;
    private contentMaskTable;
    private footerContentMaskTable;
    private maskRowContentScroll;
    private autoFitColumnsResize;
    /** @hidden */
    invokedFromMedia: boolean;
    /** @hidden */
    tableIndex: number;
    private dataBoundFunction;
    private dataToBeUpdated;
    private componentRefresh;
    private isChangeDataSourceCall;
    private mergedColumns;
    /** @hidden */
    recordsCount: number;
    /** @hidden */
    isVirtualAdaptive: boolean;
    /** @hidden */
    /**
     * * If `requireTemplateRef` is set to false in the load event, then the template element can't be accessed in grid queryCellInfo, and rowDataBound events.
     * * By default, React's grid queryCellInfo and rowDataBound events allow access to the template element.
     * * Avoid accessing the template elements in the grid queryCellInfo and rowDataBound events to improve rendering performance by setting this value as false.
     *
     * @default true
     */
    requireTemplateRef: boolean;
    /** @hidden */
    vRows: Row<Column>[];
    /** @hidden */
    vcRows: Row<Column>[];
    /** @hidden */
    vGroupOffsets: {
        [x: number]: number;
    };
    /** @hidden */
    isInitialLoad: boolean;
    /** @hidden */
    private rowUid;
    /**
     * @hidden
     */
    mergeCells: {
        [key: string]: number;
    };
    /**
     * @hidden
     */
    checkAllRows: CheckState;
    /**
     * @hidden
     */
    isCheckBoxSelection: boolean;
    /**
     * @hidden
     */
    isPersistSelection: boolean;
    /**
     * Gets the currently visible records of the Grid.
     *
     * @default []
     */
    currentViewData: Object[];
    /** @hidden */
    /**
     * Gets the parent Grid details.
     *
     * @default {}
     */
    parentDetails: ParentDetails;
    /** @hidden */
    printGridParent: IGrid;
    /** @hidden */
    isEdit: boolean;
    /** @hidden */
    commonQuery: Query;
    /** @hidden */
    scrollPosition: ScrollPositionType;
    /** @hidden */
    isLastCellPrimaryKey: boolean;
    /** @hidden */
    translateX: number;
    /** @hidden */
    filterOperators: IFilterOperator;
    /** @hidden */
    localeObj: L10n;
    /** @hidden */
    isManualRefresh: boolean;
    /** @hidden */
    isAutoFitColumns: boolean;
    /** @hidden */
    enableDeepCompare: boolean;
    /** @hidden */
    totalDataRecordsCount: number;
    /** @hidden */
    disableSelectedRecords: Object[];
    /** @hidden */
    partialSelectedRecords: Object[];
    /** @hidden */
    lazyLoadRender: IRenderer;
    /** @hidden */
    isSpan: boolean;
    /** @hidden */
    islazyloadRequest: boolean;
    /** @hidden */
    isAddNewRow: boolean;
    /** @hidden */
    addNewRowFocus: boolean;
    isSelectedRowIndexUpdating: boolean;
    private defaultLocale;
    private keyConfigs;
    private keyPress;
    private toolTipObj;
    private prevElement;
    private stackedColumn;
    private isExcel;
    /** @hidden */
    lockcolPositionCount: number;
    /** @hidden */
    prevPageMoving: boolean;
    /** @hidden */
    pageTemplateChange: boolean;
    /** @hidden */
    isAutoGen: boolean;
    /** @hidden */
    isAutoGenerateColumns: boolean;
    /** @hidden */
    pageRequireRefresh: boolean;
    private mediaBindInstance;
    /** @hidden */
    commandDelIndex: number;
    /** @hidden */
    preventAutoFit: boolean;
    /** @hidden */
    asyncTimeOut: number;
    /** @hidden */
    isExportGrid: boolean;
    /** @hidden */
    isWidgetsDestroyed: boolean;
    /**
     * @hidden
     */
    renderModule: Render;
    /**
     * @hidden
     */
    headerModule: IRenderer;
    /**
     * @hidden
     */
    contentModule: IRenderer;
    /**
     * @hidden
     */
    valueFormatterService: IValueFormatter;
    /**
     * @hidden
     */
    serviceLocator: ServiceLocator;
    /**
     * @hidden
     */
    ariaService: AriaService;
    /**
     * The `keyboardModule` is used to manipulate keyboard interactions in the Grid.
     */
    keyboardModule: KeyboardEvents;
    /**
     * @hidden
     */
    widthService: ColumnWidthService;
    /**
     * The `rowDragAndDropModule` is used to manipulate row reordering in the Grid.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `pagerModule` is used to manipulate paging in the Grid.
     */
    pagerModule: Page;
    /**
     * The `sortModule` is used to manipulate sorting in the Grid.
     */
    sortModule: Sort;
    /**
     * The `filterModule` is used to manipulate filtering in the Grid.
     */
    filterModule: Filter;
    /**
     * The `selectionModule` is used to manipulate selection behavior in the Grid.
     */
    selectionModule: Selection;
    /**
     * The `showHider` is used to manipulate column's show/hide operation in the Grid.
     *
     * @default ''
     */
    showHider: ShowHide;
    /**
     * The `searchModule` is used to manipulate searching in the Grid.
     */
    searchModule: Search;
    /**
     * The `scrollModule` is used to manipulate scrolling in the Grid.
     */
    scrollModule: Scroll;
    /**
     * The `infiniteScrollModule` is used to manipulate infinite scrolling in the Grid.
     */
    infiniteScrollModule: InfiniteScroll;
    /**
     * The `reorderModule` is used to manipulate reordering in the Grid.
     */
    reorderModule: Reorder;
    /**
     * `resizeModule` is used to manipulate resizing in the Grid.
     *
     * @hidden
     */
    resizeModule: Resize;
    /**
     * The `groupModule` is used to manipulate grouping behavior in the Grid.
     */
    groupModule: Group;
    /**
     * The `printModule` is used to handle the printing feature of the Grid.
     */
    printModule: Print;
    /**
     * The `excelExportModule` is used to handle Excel exporting feature in the Grid.
     */
    excelExportModule: ExcelExport;
    /**
     * The `pdfExportModule` is used to handle PDF exporting feature in the Grid.
     */
    pdfExportModule: PdfExport;
    /**
     * `detailRowModule` is used to handle detail rows rendering in the Grid.
     *
     * @hidden
     */
    detailRowModule: DetailRow;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the Grid.
     */
    toolbarModule: Toolbar;
    /**
     * The `contextMenuModule` is used to handle context menu items and its action in the Grid.
     */
    contextMenuModule: ContextMenu;
    /**
     * The `columnMenuModule` is used to manipulate column menu items and its action in the Grid.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `editModule` is used to handle Grid content manipulation.
     */
    editModule: Edit;
    /**
     * `clipboardModule` is used to handle Grid copy action.
     */
    clipboardModule: Clipboard;
    /**
     * `columnchooserModule` is used to dynamically show or hide the Grid columns.
     *
     * @hidden
     */
    columnChooserModule: ColumnChooser;
    /**
     * The `aggregateModule` is used to manipulate aggregate functionality in the Grid.
     *
     * @hidden
     */
    aggregateModule: Aggregate;
    private loggerModule;
    private enableLogger;
    /** @hidden */
    focusModule: FocusStrategy;
    adaptiveDlgTarget: HTMLElement;
    protected needsID: boolean;
    /**
     * Defines the schema of dataSource.
     * If the `columns` declaration is empty or undefined then the `columns` are automatically generated from data source.
     * {% codeBlock src='grid/columns/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    columns: Column[] | string[] | ColumnModel[];
    /**
     * If `enableAltRow` is set to true, the grid will render with `e-altrow` CSS class to the alternative tr elements.
     * > Check the [`AltRow`](../../grid/row/#styling-alternate-rows/) to customize the styles of alternative rows.
     * {% codeBlock src='grid/enableAltRow/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAltRow: boolean;
    /**
     * If `enableHover` is set to true, the row hover is enabled in the Grid.
     * {% codeBlock src='grid/enableHover/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHover: boolean;
    /**
     * If `enableAutoFill` is set to true, then the auto fill icon will displayed on cell selection for copy cells.
     * It requires the selection `mode` to be Cell and `cellSelectionMode` to be `Box`.
     * {% codeBlock src='grid/enableAutoFill/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableAutoFill: boolean;
    /**
     * Enables or disables the key board interaction of Grid.
     *
     * @default true
     */
    allowKeyboard: boolean;
    /**
     * If 'enableStickyHeader' set to true, then the user can able to make the column headers visible when the document is scrolled.
     *
     * @default false
     */
    enableStickyHeader: boolean;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the Grid component.
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * If `allowTextWrap` set to true,
     * then text content will wrap to the next line when its text content exceeds the width of the Column Cells.
     * {% codeBlock src='grid/allowTextWrap/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowTextWrap: boolean;
    /**
     * Configures the text wrap in the Grid.
     * {% codeBlock src='grid/textWrapSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {wrapMode:"Both"}
     */
    textWrapSettings: TextWrapSettingsModel;
    /**
     * Defines the resizing behavior of the Grid.
     *
     * @default {mode:"Normal"}
     */
    resizeSettings: ResizeSettingsModel;
    /**
     * If `allowPaging` is set to true, the pager renders at the footer of the Grid. It is used to handle page navigation in the Grid.
     *
     * > Check the [`Paging`](../../grid/paging/) to configure the grid pager.
     * {% codeBlock src='grid/allowPaging/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowPaging: boolean;
    /**
     * Configures the pager in the Grid.
     * {% codeBlock src='grid/pageSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {currentPage: 1, pageSize: 12, pageCount: 8, enableQueryString: false, pageSizes: false, template: null}
     */
    pageSettings: PageSettingsModel;
    /**
     * Configures the Loading Indicator of the Grid.
     *
     * @default {indicatorType: 'Spinner'}
     */
    loadingIndicator: LoadingIndicatorModel;
    /**
     * Specifies the shimmer effect for Grid virtual and infinite scrolling.
     *
     * @default true
     */
    enableVirtualMaskRow: boolean;
    /**
     * If `enableVirtualization` set to true, then the Grid will render only the rows visible within the view-port
     * and load subsequent rows on vertical scrolling. This helps to load large dataset in Grid.
     * {% codeBlock src='grid/enableVirtualization/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * If `enableColumnVirtualization` set to true, then the Grid will render only the columns visible within the view-port
     * and load subsequent columns on horizontal scrolling. This helps to load large dataset of columns in Grid.
     * {% codeBlock src='grid/enableColumnVirtualization/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableColumnVirtualization: boolean;
    /**
     * If `enableInfiniteScrolling` set to true, then the data will be loaded in Grid when the scrollbar reaches the end.
     * This helps to load large dataset in Grid.
     * {% codeBlock src='grid/enableInfiniteScrolling/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableInfiniteScrolling: boolean;
    /**
     * Configures the search behavior in the Grid.
     * {% codeBlock src='grid/searchSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { ignoreCase: true, fields: [], operator: 'contains', key: '' }
     */
    searchSettings: SearchSettingsModel;
    /**
     * If `allowSorting` is set to true, it allows sorting of grid records when column header is clicked.
     *
     * > Check the [`Sorting`](../../grid/sorting/) to customize its default behavior.
     * {% codeBlock src='grid/allowSorting/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowSorting: boolean;
    /**
     *  Defines the mode of clip. The available modes are,
     * `Clip`: Truncates the cell content when it overflows its area.
     * `Ellipsis`: Displays ellipsis when the cell content overflows its area.
     * `EllipsisWithTooltip`:  Displays ellipsis when the cell content overflows its area,
     *  also it will display the tooltip while hover on ellipsis is applied.
     * {% codeBlock src='grid/clipMode/index.md' %}{% endcodeBlock %}
     *
     * @default Ellipsis
     */
    clipMode: ClipMode;
    /**
     * If `allowMultiSorting` set to true, then it will allow the user to sort multiple column in the grid.
     * > `allowSorting` should be true.
     * {% codeBlock src='grid/allowMultiSorting/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowMultiSorting: boolean;
    /**
     * If `allowExcelExport` set to true, then it will allow the user to export grid to Excel file.
     *
     * > Check the [`ExcelExport`](../../grid/excel-exporting/) to configure exporting document.
     * {% codeBlock src='grid/allowExcelExport/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowExcelExport: boolean;
    /**
     * If `allowPdfExport` set to true, then it will allow the user to export grid to Pdf file.
     *
     * > Check the [`Pdfexport`](../../grid/pdf-export/) to configure the exporting document.
     * {% codeBlock src='grid/allowPdfExport/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Configures the sort settings.
     * {% codeBlock src='grid/sortSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns:[]}
     */
    sortSettings: SortSettingsModel;
    /**
     * Configures the infinite scroll settings.
     * {% codeBlock src='grid/infiniteScrollSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { enableCache: false, maxBlocks: 5, initialBlocks: 5 }
     */
    infiniteScrollSettings: InfiniteScrollSettingsModel;
    /**
     * If `allowSelection` is set to true, it allows selection of (highlight row) Grid records by clicking it.
     * {% codeBlock src='grid/allowSelection/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    allowSelection: boolean;
    /**
     * The `selectedRowIndex` allows you to select a row at initial rendering.
     * You can also get the currently selected row index.
     * {% codeBlock src='grid/selectedRowIndex/index.md' %}{% endcodeBlock %}
     *
     * @default -1
     */
    selectedRowIndex: number;
    /**
     * Configures the selection settings.
     * {% codeBlock src='grid/selectionSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {mode: 'Row', cellSelectionMode: 'Flow', type: 'Single'}
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * If `allowFiltering` set to true the filter bar will be displayed.
     * If set to false the filter bar will not be displayed.
     * Filter bar allows the user to filter grid records with required criteria.
     *
     * > Check the [`Filtering`](../../grid/filtering/) to customize its default behavior.
     * {% codeBlock src='grid/allowFiltering/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * Defines the grid row elements rendering direction. The available directions are,
     * * `Horizontal`: Renders the grid row elements in the horizontal direction
     * * `Vertical`: Renders the grid row elements in the vertical direction
     *
     * @default Horizontal
     */
    rowRenderingMode: RowRenderingDirection;
    /**
     * If `enableAdaptiveUI` set to true the grid filter, sort, and edit dialogs render adaptively.
     *
     * @default false
     */
    enableAdaptiveUI: boolean;
    /**
     * One of the adaptiveUIMode enumeration that specifies the Adaptive Mode. The default value is Both.
     *
     * @default Both
     */
    adaptiveUIMode: AdaptiveMode;
    /**
     * If `allowReordering` is set to true, Grid columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     * > If Grid is rendered with stacked headers, reordering is allowed only at the same level as the column headers.
     * {% codeBlock src='grid/allowReordering/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to true, Grid columns can be resized.
     * {% codeBlock src='grid/allowResizing/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If `allowRowDragAndDrop` is set to true, you can drag and drop grid rows at another grid.
     * {% codeBlock src='grid/allowRowDragAndDrop/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowRowDragAndDrop: boolean;
    /**
     * Configures the row drop settings.
     *
     * @default {targetID: ''}
     */
    rowDropSettings: RowDropSettingsModel;
    /**
     * Configures the filter settings of the Grid.
     * {% codeBlock src='grid/filterSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns: [], type: 'FilterBar', mode: 'Immediate', showFilterBarStatus: true, immediateModeDelay: 1500 , operators: {}}
     */
    filterSettings: FilterSettingsModel;
    /**
     * If `allowGrouping` set to true, then it will allow the user to dynamically group or ungroup columns.
     * Grouping can be done by drag and drop columns from column header to group drop area.
     *
     * > Check the [`Grouping`](../../grid/grouping/) to customize its default behavior.
     * {% codeBlock src='grid/allowGrouping/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowGrouping: boolean;
    /**
     * If `enableImmutableMode`  is set to true, the grid will reuse old rows if it exists in the new result instead of
     * full refresh while performing the grid actions.
     *
     * @default false
     */
    enableImmutableMode: boolean;
    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.
     *
     * > Check the [`Column menu`](../../grid/columns/#column-menu/) for its configuration.
     * {% codeBlock src='grid/showColumnMenu/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    showColumnMenu: boolean;
    /**
     * If `autoFit` set to true, then it will auto fit the columns based on given width.
     *
     * @default false
     */
    autoFit: boolean;
    /**
     * Configures the group settings.
     * {% codeBlock src='grid/groupSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {showDropArea: true, showToggleButton: false, showGroupedColumn: false, showUngroupButton: true, columns: []}
     */
    groupSettings: GroupSettingsModel;
    /**
     * Configures the edit settings.
     * {% codeBlock src='grid/editSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { allowAdding: false, allowEditing: false, allowDeleting: false, mode:'Normal',
     * allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * Configures the Grid aggregate rows.
     * {% codeBlock src='grid/aggregates/index.md' %}{% endcodeBlock %}
     * > Check the [`Aggregates`](../../grid/aggregates/) for its configuration.
     *
     * @default []
     */
    aggregates: AggregateRowModel[];
    /**
     * If `showColumnChooser` is set to true, it allows you to dynamically show or hide columns.
     *
     * > Check the [`ColumnChooser`](../../grid/columns/#column-chooser/) for its configuration.
     * {% codeBlock src='grid/showColumnChooser/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    showColumnChooser: boolean;
    /**
     * Configures the column chooser in the Grid.
     *
     * @default { columnChooserOperator: 'startsWith' }
     */
    columnChooserSettings: ColumnChooserSettingsModel;
    /**
     * If `enableHeaderFocus` set to true, then header element will be focused when focus moves to grid.
     *
     * @default false
     */
    enableHeaderFocus: boolean;
    /**
     * Defines the scrollable height of the grid content.
     * {% codeBlock src='grid/height/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Defines the Grid width.
     * {% codeBlock src='grid/width/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     * Defines the mode of grid lines. The available modes are,
     * * `Both`: Displays both horizontal and vertical grid lines.
     * * `None`: No grid lines are displayed.
     * * `Horizontal`: Displays the horizontal grid lines only.
     * * `Vertical`: Displays the vertical grid lines only.
     * * `Default`: Displays grid lines based on the theme.
     * {% codeBlock src='grid/gridLines/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    gridLines: GridLine;
    /**
     * The row template that renders customized rows from the given template.
     * By default, Grid renders a table row for every data source item.
     * > * It accepts either [template string](../../common/template-engine/) or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [`Row Template`](../../grid/row/) customization.
     *
     * @default null
     * @aspType string
     */
    rowTemplate: string | Function;
    /**
     * The empty record template that renders customized element or text or image instead of displaying the empty record message in the grid.
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     *
     * @default null
     * @aspType string
     */
    emptyRecordTemplate: string | Function;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     *
     * {% codeBlock src="grid/detail-template-api/index.ts" %}{% endcodeBlock %}
     *
     * @default null
     * @aspType string
     */
    detailTemplate: string | Function;
    /**
     * Defines Grid options to render child Grid.
     * It requires the [`queryString`](./#querystring) for parent
     * and child relationship.
     *
     * > Check the [`Child Grid`](../../grid/hierarchy-grid/) for its configuration.
     *
     * @default ''
     *
     */
    childGrid: GridModel;
    /**
     * Defines the relationship between parent and child datasource. It acts as the foreign key for parent datasource.
     *
     * @default ''
     */
    queryString: string;
    /**
     * Defines the print modes. The available print modes are
     * * `AllPages`: Prints all pages of the Grid.
     * * `CurrentPage`: Prints the current page of the Grid.
     * {% codeBlock src='grid/printMode/index.md' %}{% endcodeBlock %}
     *
     * @default AllPages
     */
    printMode: PrintMode;
    /**
     * Defines the hierarchy grid print modes. The available modes are
     * * `Expanded` - Prints the master grid with expanded child grids.
     * * `All` - Prints the master grid with all the child grids.
     * * `None` - Prints the master grid alone.
     *
     * @default Expanded
     */
    hierarchyPrintMode: HierarchyGridPrintMode;
    /**
     * It is used to render grid table rows.
     * If the `dataSource` is an array of JavaScript objects,
     * then Grid will create instance of [`DataManager`](https://ej2.syncfusion.com/documentation/api/data/dataManager/)
     * from this `dataSource`.
     * If the `dataSource` is an existing [`DataManager`](https://ej2.syncfusion.com/documentation/api/data/dataManager/),
     *  the Grid will not initialize a new one.
     *
     * > Check the available [`Adaptors`](../../data/adaptors/) to customize the data operation.
     * {% codeBlock src='grid/dataSource/index.md' %}{% endcodeBlock %}
     *
     * @default []
     * @isGenericType true
     */
    dataSource: Object | DataManager | DataResult;
    /**
     * Defines the height of Grid rows.
     * {% codeBlock src='grid/rowHeight/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    rowHeight: number;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.
     * {% codeBlock src='grid/query/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    query: Query;
    /**
     * Defines the currencyCode format of the Grid columns
     *
     * @private
     */
    private currencyCode;
    /**
     * Defines the id of the grids that needs to be exported
     *
     * @default null
     */
    exportGrids: string[];
    /**
     * `toolbar` defines the ToolBar items of the Grid.
     * It contains built-in and custom toolbar items.
     * If a string value is assigned to the `toolbar` option, it is considered as the template for the whole Grid ToolBar.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the Grid's Toolbar.
     * <br><br>
     * The available built-in ToolBar items are:
     * * Add: Adds a new record.
     * * Edit: Edits the selected record.
     * * Update: Updates the edited record.
     * * Delete: Deletes the selected record.
     * * Cancel: Cancels the edit state.
     * * Search: Searches records by the given key.
     * * Print: Prints the Grid.
     * * ExcelExport - Export the Grid to Excel(excelExport() method manually to make export.)
     * * PdfExport - Export the Grid to PDF(pdfExport() method manually to make export.)
     * * CsvExport - Export the Grid to CSV(csvExport() method manually to make export.)<br><br>
     * The following code example implements the custom toolbar items.
     *
     *  > Check the [`Toolbar`](../../grid/tool-bar/#custom-toolbar-items/) to customize its default items.
     *
     * {% codeBlock src="grid/toolbar-api/index.ts" %}{% endcodeBlock %}
     * {% codeBlock src='grid/toolbar/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    toolbar: (ToolbarItems | string | ItemModel | ToolbarItem)[];
    /**
     * `contextMenuItems` defines both built-in and custom context menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Group` - Group by current column.
     * * `Ungroup` - Ungroup by current column.
     * * `Edit` - Edit the current record.
     * * `Delete` - Delete the current record.
     * * `Save` - Save the edited record.
     * * `Cancel` - Cancel the edited state.
     * * `Copy` - Copy the selected records.
     * * `PdfExport` - Export the grid as Pdf format.
     * * `ExcelExport` - Export the grid as Excel format.
     * * `CsvExport` - Export the grid as CSV format.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `FirstPage` - Go to the first page.
     * * `PrevPage` - Go to the previous page.
     * * `LastPage` - Go to the last page.
     * * `NextPage` - Go to the next page.
     *
     * @default null
     */
    contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[];
    /**
     * `columnMenuItems` defines both built-in and custom column menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Group` - Group by current column.
     * * `Ungroup` - Ungroup by current column.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property like checkbox filter, excel filter, menu filter.
     *
     * @default null
     */
    columnMenuItems: ColumnMenuItem[] | ColumnMenuItemModel[];
    /**
     * It used to render toolbar template
     *
     * @default null
     * @aspType string
     */
    toolbarTemplate: string | Function;
    /**
     * It used to render pager template
     *
     * @default null
     * @aspType string
     */
    pagerTemplate: string | Function;
    /**
     * Gets or sets the number of frozen rows.
     * {% codeBlock src='grid/frozenRows/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    frozenRows: number;
    /**
     * Gets or sets the number of frozen columns.
     * {% codeBlock src='grid/frozenColumns/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    frozenColumns: number;
    /**
     * Defines the own class for the grid element.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * `columnQueryMode`provides options to retrive data from the datasource.Their types are
     * * `All`: It Retrives whole datasource.
     * * `Schema`: Retrives data for all the defined columns in grid from the datasource.
     * * `ExcludeHidden`: Retrives data only for visible columns of grid from the dataSource.
     *
     * @default All
     */
    columnQueryMode: ColumnQueryModeType;
    /**
     * Gets or sets the current action details.
     *
     * @default {}
     */
    currentAction: ActionArgs;
    /**
     * Defines the version for Grid persistence.
     *
     * @default ''
     */
    ej2StatePersistenceVersion: string;
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
     * This event allows customization of Grid properties before rendering.
     *
     * @event load
     */
    load: EmitType<Object>;
    /**
     * Triggered every time a request is made to access row information, element, or data.
     * This will be triggered before the row element is appended to the Grid element.
     *
     * @event rowDataBound
     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Triggered every time a request is made to access cell information, element, or data.
     * This will be triggered before the cell element is appended to the Grid element.
     *
     * @event queryCellInfo
     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**
     * Triggered for stacked header.
     *
     * @event headerCellInfo
     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * Triggers when Grid actions such as sorting, filtering, paging, grouping etc., starts.
     *
     * {% codeBlock src='grid/actionBegin/index.md' %}{% endcodeBlock %}
     *
     * @event actionBegin
     */
    actionBegin: EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs | NotifyArgs | ReorderEventArgs>;
    /**
     * Triggers when Grid actions such as sorting, filtering, paging, grouping etc. are completed.
     *
     * @event actionComplete
     */
    actionComplete: EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs | NotifyArgs | ReorderEventArgs>;
    /**
     * Triggers when any Grid action failed to achieve the desired results.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Triggers when data source is populated in the Grid.
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when record is double clicked.
     *
     * @event recordDoubleClick
     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * Triggers when record is clicked.
     *
     * @event recordClick
     */
    recordClick: EmitType<RecordClickEventArgs>;
    /**
     * Triggers before row selection occurs.
     *
     * @event rowSelecting
     */
    rowSelecting: EmitType<RowSelectingEventArgs>;
    /**
     * Triggers after a row is selected.
     *
     * @event rowSelected
     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**
     * Triggers before deselecting the selected row.
     *
     * @event rowDeselecting
     */
    rowDeselecting: EmitType<RowDeselectingEventArgs>;
    /**
     * Triggers when a selected row is deselected.
     *
     * @event rowDeselected
     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers before any cell selection occurs.
     *
     * @event cellSelecting
     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
    /**
     * Triggers after a cell is selected.
     *
     * @event cellSelected
     */
    cellSelected: EmitType<CellSelectEventArgs>;
    /**
     * Triggers before the selected cell is deselecting.
     *
     * @event cellDeselecting
     */
    cellDeselecting: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when a particular selected cell is deselected.
     *
     * @event cellDeselected
     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers before column selection occurs.
     *
     * @event columnSelecting
     */
    columnSelecting: EmitType<ColumnSelectingEventArgs>;
    /**
     * Triggers after a column is selected.
     *
     * @event columnSelected
     */
    columnSelected: EmitType<ColumnSelectEventArgs>;
    /**
     * Triggers before deselecting the selected column.
     *
     * @event columnDeselecting
     */
    columnDeselecting: EmitType<ColumnDeselectEventArgs>;
    /**
     * Triggers when a selected column is deselected.
     *
     * @event columnDeselected
     */
    columnDeselected: EmitType<ColumnDeselectEventArgs>;
    /**
     * Triggers when column header element drag (move) starts.
     *
     * @event columnDragStart
     */
    columnDragStart: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when column header element is dragged (moved) continuously.
     *
     * @event columnDrag
     */
    columnDrag: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when a column header element is dropped on the target column.
     *
     * @event columnDrop
     */
    columnDrop: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers after print action is completed.
     *
     * @event printComplete
     */
    printComplete: EmitType<PrintEventArgs>;
    /**
     * Triggers before the print action starts.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<PrintEventArgs>;
    /**
     * Triggers before exporting each cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfQueryCellInfo
     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfHeaderQueryCellInfo
     */
    pdfHeaderQueryCellInfo: EmitType<PdfHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting aggregate cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfAggregateQueryCellInfo
     */
    pdfAggregateQueryCellInfo: EmitType<AggregateQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting aggregate cell to Excel document. You can also customize the PDF cells.
     *
     * @event excelAggregateQueryCellInfo
     */
    excelAggregateQueryCellInfo: EmitType<AggregateQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each detail Grid to PDF document.
     *
     * @event exportDetailDataBound
     */
    exportDetailDataBound: EmitType<ExportDetailDataBoundEventArgs>;
    /**
     * Triggers before exporting each detail template.
     *
     * @event exportDetailTemplate
     */
    exportDetailTemplate: EmitType<ExportDetailTemplateEventArgs>;
    /**
     * Triggers before exporting each cell to Excel file.
     * You can also customize the Excel cells.
     *
     * @event excelQueryCellInfo
     */
    excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to Excel file.
     * You can also customize the Excel cells.
     *
     * @event excelHeaderQueryCellInfo
     */
    excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before Grid data is exported to Excel file.
     *
     * @event beforeExcelExport
     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Triggers after Grid data is exported to Excel file.
     *
     * @event excelExportComplete
     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
    /**
     * Triggers before Grid data is exported to PDF document.
     *
     * @event beforePdfExport
     */
    beforePdfExport: EmitType<Object>;
    /**
     * Triggers after Grid data is exported to PDF document.
     *
     * @event pdfExportComplete
     */
    pdfExportComplete: EmitType<PdfExportCompleteArgs>;
    /**
     * Triggers when row element's before drag(move).
     *
     * @event rowDragStartHelper
     */
    rowDragStartHelper: EmitType<RowDragEventArgs>;
    /**
     * Triggers after detail row expands.
     * > This event triggers at initial expand.
     *
     * @event detailDataBound
     */
    detailDataBound: EmitType<DetailDataBoundEventArgs>;
    /**
     * Triggers when row element's drag(move) starts.
     *
     * @event rowDragStart
     */
    rowDragStart: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row elements are dragged (moved) continuously.
     *
     * @event rowDrag
     */
    rowDrag: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row elements are dropped on the target row.
     *
     * @event rowDrop
     */
    rowDrop: EmitType<RowDragEventArgs>;
    /**
     * Triggers when toolbar item is clicked.
     *
     * @event toolbarClick
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers before the columnChooser open.
     *
     * @event beforeOpenColumnChooser
     */
    beforeOpenColumnChooser: EmitType<ColumnChooserEventArgs>;
    /**
     * Triggers before adaptive filter and sort dialogs open.
     *
     * @event beforeOpenAdaptiveDialog
     */
    beforeOpenAdaptiveDialog: EmitType<AdaptiveDialogEventArgs>;
    /**
     * Triggers when records are added in batch mode.
     *
     * @event batchAdd
     */
    batchAdd: EmitType<BatchAddArgs>;
    /**
     * Triggers when records are deleted in batch mode.
     *
     * @event batchDelete
     */
    batchDelete: EmitType<BatchDeleteArgs>;
    /**
     * Triggers when cancel the batch edit changes batch mode.
     *
     * @event batchCancel
     */
    batchCancel: EmitType<BatchCancelArgs>;
    /**
     * Triggers before records are added in batch mode.
     *
     * @event beforeBatchAdd
     */
    beforeBatchAdd: EmitType<BeforeBatchAddArgs>;
    /**
     * Triggers before records are deleted in batch mode.
     *
     * @event beforeBatchDelete
     */
    beforeBatchDelete: EmitType<BeforeBatchDeleteArgs>;
    /**
     * Triggers before records are saved in batch mode.
     *
     * @event beforeBatchSave
     */
    beforeBatchSave: EmitType<BeforeBatchSaveArgs>;
    /**
     * Triggers before the record is to be edit.
     *
     * @event beginEdit
     */
    beginEdit: EmitType<BeginEditArgs>;
    /**
     * Triggers when command button is clicked.
     *
     * @event commandClick
     */
    commandClick: EmitType<CommandClickEventArgs>;
    /**
     * Triggers when the cell is being edited.
     *
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Triggers when the cell is being saved.
     *
     * @event cellSave
     */
    cellSave: EmitType<CellSaveArgs>;
    /**
     * Triggers after the cell is saved.
     *
     * @event cellSaved
     */
    cellSaved: EmitType<CellSaveArgs>;
    /**
     * Triggers when column resize starts.
     *
     * @event resizeStart
     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers on column resizing.
     *
     * @event resizing
     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Triggers when column resize ends.
     *
     * @event resizeStop
     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when any keyboard keys are pressed inside the grid.
     *
     * @event keyPressed
     */
    keyPressed: EmitType<KeyboardEventArgs>;
    /**
     * Triggers before data is bound to Grid.
     *
     * @event beforeDataBound
     */
    beforeDataBound: EmitType<BeforeDataBoundArgs>;
    /**
     * Triggers before context menu opens.
     *
     * @event contextMenuOpen
     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when click on context menu.
     *
     * @event contextMenuClick
     */
    contextMenuClick: EmitType<ContextMenuClickEventArgs>;
    /**
     * Triggers before column menu opens.
     *
     * @event columnMenuOpen
     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Triggers when click on column menu.
     *
     * @event columnMenuClick
     */
    columnMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers when the check box state change in checkbox column.
     *
     * @event checkBoxChange
     */
    checkBoxChange: EmitType<CheckBoxChangeEventArgs>;
    /**
     * Triggers before Grid copy action.
     *
     * @event beforeCopy
     */
    beforeCopy: EmitType<BeforeCopyEventArgs>;
    /**
     * Triggers before Grid paste action.
     *
     * @event beforePaste
     */
    beforePaste: EmitType<BeforePasteEventArgs>;
    /**
     * Triggers before Grid autoFill action.
     *
     * @event beforeAutoFill
     */
    beforeAutoFill: EmitType<BeforeAutoFillEventArgs>;
    /**
     * Triggers when the grid actions such as Sorting, Paging, Grouping etc., are done to get column `dataSource`.
     * In this event,the current view column data and total record count should be assigned to the column `dataSource` based
     * on the action performed.
     *
     * @event columnDataStateChange
     */
    columnDataStateChange: EmitType<ColumnDataStateChangeEventArgs>;
    /**
     * Triggers when the grid actions such as Sorting, Paging, Grouping etc., are done.
     * In this event,the current view data and total record count should be assigned to the `dataSource` based on the action performed.
     *
     * @event dataStateChange
     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * Triggers when the grid data is added, deleted and updated.
     * Invoke the done method from the argument to start render after edit operation.
     *
     * @event dataSourceChanged
     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Triggers before exporting each caption row to PDF/Excel/CSV document. You can also customize the export caption row values.
     *
     * @event exportGroupCaption
     */
    exportGroupCaption: EmitType<ExportGroupCaptionEventArgs>;
    /**
     * Triggers when expand the caption row in lazy load grouping.
     *
     * @event lazyLoadGroupExpand
     */
    lazyLoadGroupExpand: EmitType<LazyLoadArgs>;
    /**
     * Triggers when collapse the caption row in lazy load grouping.
     *
     * @event lazyLoadGroupCollapse
     */
    lazyLoadGroupCollapse: EmitType<LazyLoadArgs>;
    /**
     * Event triggered before a detail template row is removed from the DOM.
     *
     * This event allows executing necessary cleanup operations or additional actions before the detail row is detached.
     *
     * @event beforeDetailTemplateDetach
     */
    beforeDetailTemplateDetach: EmitType<DetailTemplateDetachArgs>;
    /**
     * Constructor for creating the component
     *
     * @param {GridModel} options - specifies the options
     * @param {string | HTMLElement} element - specifies the element
     * @hidden
     */
    constructor(options?: GridModel, element?: string | HTMLElement);
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} returns the persist data
     */
    getPersistData(): string;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} Returns the module Declaration
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    extendRequiredModules(modules: ModuleDeclaration[]): void;
    private resizeCheck;
    /**
     * For internal use only - Initialize the event handler;
     *
     * @returns {void}
     * @private
     */
    protected preRender(): void;
    private initProperties;
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @returns {void}
     * @private
     */
    protected render(): void;
    private setInitialFrozenColumnIndex;
    /**
     * By default, grid shows the spinner for all its actions. You can use this method to show spinner at your needed time.
     *
     * @returns {void}
     */
    showSpinner(): void;
    /**
     * By default, grid shows the spinner for all its actions. You can use this method to show spinner at your needed time.
     *
     * @returns {void}
     */
    hideSpinner(): void;
    showMaskRow(axisDirection?: string, dialogElement?: Element): void;
    private getContentMaskColumns;
    private createEmptyMaskTable;
    private createMaskTable;
    private applyMaskRow;
    private createMaskRow;
    private getShimmerTemplate;
    addShimmerEffect(): void;
    private translateMaskRow;
    removeMaskRow(): void;
    private refreshMaskRow;
    private refreshMaskRowColgroupWidth;
    private updateStackedFilter;
    getMediaColumns(): void;
    private pushMediaColumn;
    /**
     * @param {Column} col - specifies the column
     * @returns {void}
     * @hidden
     */
    updateMediaColumns(col: Column): void;
    /**
     * @param {number} columnIndex - specifies the column index
     * @param {MediaQueryList} e - specifies the MediaQueryList
     * @returns {void}
     * @hidden
     */
    mediaQueryUpdate(columnIndex: number, e?: MediaQueryList): void;
    private refreshMediaCol;
    private removeMediaListener;
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    protected eventInitializer(): void;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     *
     * @function destroy
     * @returns {void}
     */
    destroy(): void;
    private destroyDependentModules;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    protected getModuleName(): string;
    private enableBoxSelection;
    private setCSSClass;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {GridModel} newProp - Defines new properties
     * @param {GridModel} oldProp - Defines old properties
     * @returns {void}
     * @hidden
     */
    onPropertyChanged(newProp: GridModel, oldProp: GridModel): void;
    private extendedPropertyChange;
    private maintainSelection;
    /**
     * @param {Object} prop - Defines the property
     * @param {boolean} muteOnChange - Defines the mute on change
     * @returns {void}
     * @private
     */
    setProperties(prop: Object, muteOnChange?: boolean): void;
    /**
     * @hidden
     * @returns {number} - Returns the tables count
     */
    getTablesCount(): number;
    /**
     * @hidden
     * @returns {void}
     */
    updateDefaultCursor(): void;
    private updateColumnModel;
    getFrozenLeftCount(): number;
    isFrozenGrid(): boolean;
    getFrozenMode(): freezeMode;
    private updateLockableColumns;
    private checkLockColumns;
    /**
     * @param {string} position - specifies position
     * @returns {number} returns the width
     * @hidden
     */
    leftrightColumnWidth(position?: string): number;
    /**
     * Gets the columns from the Grid.
     *
     * @param {boolean} isRefresh - Defines the boolean whether to refresh
     * @returns {Column[]} - returns the column
     */
    getColumns(isRefresh?: boolean): Column[];
    /**
     * @private
     * @param {string} stackedHeader - Defines the stacked header
     * @param {Column[]} col - Defines the column
     * @returns {Column} Returns the Column
     */
    getStackedHeaderColumnByHeaderText(stackedHeader: string, col: Column[]): Column;
    /**
     * @private
     * @returns {number[]} Returns the column indexes
     */
    getColumnIndexesInView(): number[];
    /**
     * @private
     * @returns {Query} - returns the query
     */
    getQuery(): Query;
    /**
     * @private
     * @returns {object} - returns the locale constants
     */
    getLocaleConstants(): Object;
    /**
     * @param {number[]} indexes - specifies the indexes
     * @returns {void}
     * @private
     */
    setColumnIndexesInView(indexes: number[]): void;
    /**
     * Gets the visible columns from the Grid.
     *
     * @returns {Column[]} returns the column
     */
    getVisibleColumns(): Column[];
    /**
     * Gets the header div of the Grid.
     *
     * @returns {Element} - Returns the element
     */
    getHeaderContent(): Element;
    /**
     * Sets the header div of the Grid to replace the old header.
     *
     * @param  {Element} element - Specifies the Grid header.
     *
     * @returns {void}
     */
    setGridHeaderContent(element: Element): void;
    /**
     * Gets the content table of the Grid.
     *
     * @returns {Element} - Returns the element
     */
    getContentTable(): Element;
    /**
     * Sets the content table of the Grid to replace the old content table.
     *
     * @param  {Element} element - Specifies the Grid content table.
     *
     * @returns {void}
     */
    setGridContentTable(element: Element): void;
    /**
     * Gets the content div of the Grid.
     *
     * @returns {Element} Returns the element
     */
    getContent(): Element;
    /**
     * Sets the content div of the Grid to replace the old Grid content.
     *
     * @param  {Element} element - Specifies the Grid content.
     *
     * @returns {void}
     */
    setGridContent(element: Element): void;
    /**
     * Gets the header table element of the Grid.
     *
     * @returns {Element} returns the element
     */
    getHeaderTable(): Element;
    /**
     * Sets the header table of the Grid to replace the old one.
     *
     * @param  {Element} element - Specifies the Grid header table.
     *
     * @returns {void}
     */
    setGridHeaderTable(element: Element): void;
    /**
     * Gets the footer div of the Grid.
     *
     * @returns {Element} returns the element
     */
    getFooterContent(): Element;
    /**
     * Gets the footer table element of the Grid.
     *
     * @returns {Element} returns the element
     */
    getFooterContentTable(): Element;
    /**
     * Gets the pager of the Grid.
     *
     * @returns {Element} returns the element
     */
    getPager(): Element;
    /**
     * Sets the pager of the Grid to replace the old pager.
     *
     * @param  {Element} element - Specifies the Grid pager.
     *
     * @returns {void}
     */
    setGridPager(element: Element): void;
    /**
     * Gets a row by index.
     *
     * @param  {number} index - Specifies the row index.
     *
     * @returns {Element} returns the element
     */
    getRowByIndex(index: number): Element;
    /**
     * Gets a movable tables row by index.
     *
     * @param  {number} index - Specifies the row index.
     *
     * @returns {Element} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getRowByIndex()` method instead, and apply the `e-unfreeze` class to select the movable cell within the tr element.
     */
    getMovableRowByIndex(index: number): Element;
    /**
     * Gets a frozen tables row by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getRowByIndex()` method instead, and apply the `e-leftfreeze` class to select the frozen cell within the tr element.
     */
    getFrozenRowByIndex(index: number): Element;
    /**
     * Gets all the data rows of the Grid.
     *
     * @returns {Element[]} returns the element
     */
    getRows(): Element[];
    /**
     * Gets a frozen right tables row element by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getRowByIndex()` method instead, and apply the `e-rightfreeze` class to select the frozen right cell within the tr element.
     */
    getFrozenRightRowByIndex(index: number): Element;
    /**
     * Get a row information based on cell
     *
     * @param {Element | EventTarget} target - specifies the element
     *
     * @returns {RowInfo} returns the row info
     */
    getRowInfo(target: Element | EventTarget): RowInfo;
    /**
     * Gets the Grid's movable content rows from frozen grid.
     *
     * @returns {Element[]} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getRows()` method instead, and apply the `e-unfreeze` class to select the movable cell within the tr element.
     */
    getMovableRows(): Element[];
    /**
     * Gets the Grid's frozen right content rows from frozen grid.
     *
     * @returns {Element[]} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getRows()` method instead, and apply the `e-rightfreeze` class to select the frozen right cell within the tr element.
     */
    getFrozenRightRows(): Element[];
    /**
     * Gets all the Grid's data rows.
     *
     * @returns {Element[]} returns the element
     */
    getDataRows(): Element[];
    /**
     * @param {boolean} includeAdd - specifies includeAdd
     * @returns {Element[]} returns the element
     * @hidden
     */
    getAllDataRows(includeAdd?: boolean): Element[];
    /**
     * @param {HTMLElement[]} fRows - Defines the frozen Rows
     * @param {HTMLElement[]} mrows - Defines the movable Rows
     * @returns {HTMLElement[]} Returns the element
     * @hidden
     */
    addMovableRows(fRows: HTMLElement[], mrows: HTMLElement[]): HTMLElement[];
    private generateDataRows;
    /**
     * Gets all the Grid's movable table data rows.
     *
     * @returns {Element[]} Returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getDataRows()` method instead, and apply the `e-unfreeze` class to select the movable cell within the tr element.
     */
    getMovableDataRows(): Element[];
    /**
     * @param {boolean} includeAdd Defines the include add in boolean
     * @returns {Element[]} Returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getAllDataRows()` method instead, and apply the `e-unfreeze` class to select the movable cell within the tr element.
     * @hidden
     */
    getAllMovableDataRows(includeAdd?: boolean): Element[];
    /**
     * Gets all the Grid's frozen table data rows.
     *
     * @returns {Element[]} returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getDataRows()` method instead, and apply the `e-leftfreeze` class to select the frozen cell within the tr element.
     */
    getFrozenDataRows(): Element[];
    /**
     * @param {boolean} includeAdd Defines the include add in boolean
     * @returns {Element[]} Returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getAllDataRows()` method instead, and apply the `e-leftfreeze` class to select the frozen cell within the tr element.
     * @hidden
     */
    getAllFrozenDataRows(includeAdd?: boolean): Element[];
    /**
     * Gets all the Grid's frozen right table data rows.
     *
     * @returns {Element[]} Returns the Element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getDataRows()` method instead, and apply the `e-rightfreeze` class to select the frozen right cell within the tr element.
     */
    getFrozenRightDataRows(): Element[];
    /**
     * @param {boolean} includeAdd Defines the include add in boolean
     * @returns {Element[]} Returns the element
     * @deprecated This method has been marked as deprecated. It is recommended to utilize the `getAllDataRows()` method instead, and apply the `e-rightfreeze` class to select the frozen right cell within the tr element.
     * @hidden
     */
    getAllFrozenRightDataRows(includeAdd?: boolean): Element[];
    /**
     * Updates particular cell value based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *
     * @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     * @param {string } field - Specifies the field name which you want to update.
     * @param {string | number | boolean | Date} value - To update new value for the particular cell.
     *
     * @returns {void}
     */
    setCellValue(key: string | number, field: string, value: string | number | boolean | Date | null): void;
    /**
     * @param {string} columnUid - Defines column uid
     * @param {boolean} renderTemplates - Defines renderTemplates need to invoke
     * @returns {void}
     * @hidden
     */
    refreshReactColumnTemplateByUid(columnUid: string, renderTemplates?: boolean): void;
    /**
     * @param {Element[] | NodeListOf<Element>} rows - Defines the rows
     * @param {boolean} isChildGrid - Defines whether it is a Hierarchy Grid.
     * @param {boolean} isFrozen - Defines whether it is a Frozen Grid
     * @returns {void}
     * @hidden
     */
    refreshReactTemplateTD(rows?: Element[] | NodeListOf<Element>, isChildGrid?: boolean, isFrozen?: boolean): void;
    /**
     * @returns {void}
     * @hidden
     */
    refreshGroupCaptionFooterTemplate(): void;
    /**
     * @param {string} columnUid - Defines column uid
     * @returns {void}
     * @hidden
     */
    refreshReactHeaderTemplateByUid(columnUid: string): void;
    /**
     * Updates and refresh the particular row values based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *
     * @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     * @param {Object} rowData - To update new data for the particular row.
     *
     * @returns {void}
     */
    setRowData(key: string | number, rowData?: Object): void;
    private setFrozenRowData;
    /**
     * Gets a cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     *
     * @returns {Element} Returns the Element
     */
    getCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a movable table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     *
     * @returns {Element} Returns the Element
     * @deprecated This method is deprecated. Use `getCellFromIndex()` method instead
     */
    getMovableCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a frozen right table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} Returns the Element
     * @deprecated This method is deprecated. Use `getCellFromIndex()` method instead.
     */
    getFrozenRightCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     *
     * @returns {Element} Returns the Element
     */
    getColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a movable column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     * @deprecated This method is deprecated. Use `getColumnHeaderByIndex()` method instead.
     */
    getMovableColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a frozen right column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     * @deprecated This method is deprecated. Use `getColumnHeaderByIndex()` method instead.
     */
    getFrozenRightColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a frozen left column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     * @deprecated This method is deprecated. Use `getColumnHeaderByIndex()` method instead.
     */
    getFrozenLeftColumnHeaderByIndex(index: number): Element;
    /**
     * @param {string} uid - Defines the uid
     * @returns {Row<Column>} Returns the row object
     * @hidden
     */
    getRowObjectFromUID(uid: string): Row<Column>;
    private rowObject;
    /**
     * Get an array of row objects.
     *
     * @returns {Row<Column>[]} Returns the Row object
     */
    getRowsObject(): Row<Column>[];
    /**
     * @hidden
     * @returns {Row<Column>[]} Returns the Row object
     * @deprecated  This method is deprecated. Use `getRowsObject()` method instead.
     */
    getMovableRowsObject(): Row<Column>[];
    /**
     * @hidden
     * @returns {Row<Column>[]} Returns the Row object
     * @deprecated This method is deprecated. Use `getRowsObject()` method instead.
     */
    getFrozenRightRowsObject(): Row<Column>[];
    /**
     * Gets a column header by column name.
     *
     * @param  {string} field - Specifies the column name.
     *
     * @returns {Element} - Returns the element
     */
    getColumnHeaderByField(field: string): Element;
    /**
     * Gets a column header by UID.
     *
     * @param {string} uid - Specifies the column uid.
     *
     * @returns {Element} - Returns the element
     */
    getColumnHeaderByUid(uid: string): Element;
    /**
     * @hidden
     * @param {number} index - Defines the index
     * @returns {Column} Returns the column
     */
    getColumnByIndex(index: number): Column;
    /**
     * Gets a Column by column name.
     *
     * @param  {string} field - Specifies the column name.
     *
     * @returns {Column} Returns the column
     */
    getColumnByField(field: string): Column;
    /**
     * Gets a column index by column name.
     *
     * @param  {string} field - Specifies the column name.
     *
     * @returns {number} Returns the index by field
     */
    getColumnIndexByField(field: string): number;
    /**
     * Gets a column by UID.
     *
     * @param  {string} uid - Specifies the column UID.
     * @param  {boolean} isColumns - Defines the all columns.
     *
     * @returns {Column} Returns the column
     */
    getColumnByUid(uid: string, isColumns?: boolean): Column;
    /**
     * @param {Column[]} columns - Defines the columns
     * @param {Column[]} stackedColumn - Defines the stacked columns
     * @returns {Column[]} Returns the columns
     * @hidden
     */
    getStackedColumns(columns: Column[], stackedColumn?: Column[]): Column[];
    /**
     * Gets a column index by UID.
     *
     * @param  {string} uid - Specifies the column UID.
     *
     * @returns {number} Returns the column by index
     */
    getColumnIndexByUid(uid: string): number;
    /**
     * Gets UID by column name.
     *
     * @param  {string} field - Specifies the column name.
     *
     * @returns {string} Returns the column by field
     */
    getUidByColumnField(field: string): string;
    /**
     * Gets column index by column uid value.
     *
     * @private
     * @param  {string} uid - Specifies the column uid.
     * @returns {number} Returns the column by field
     */
    getNormalizedColumnIndex(uid: string): number;
    /**
     * Gets indent cell count.
     *
     * @private
     * @returns {number} Returns the indent count
     */
    getIndentCount(): number;
    /**
     * Gets the collection of column fields.
     *
     * @returns {string[]} Returns the Field names
     */
    getColumnFieldNames(): string[];
    /**
     * Gets a compiled row template.
     *
     * @returns {Function} Returns the row TEmplate
     * @private
     */
    getRowTemplate(): Function;
    /**
     * Gets a compiled empty Record template.
     *
     * @returns {Function} Returns the empty Record template
     * @private
     */
    getEmptyRecordTemplate(): Function;
    /**
     * Gets a compiled detail row template.
     *
     * @private
     * @returns {Function} Returns the Detail template
     */
    getDetailTemplate(): Function;
    /**
     * Gets a compiled dialog edit template.
     *
     * @private
     * @returns {Function} Returns the Edit template
     */
    getEditTemplate(): Function;
    /**
     * Gets a compiled dialog edit header template.
     *
     * @private
     * @returns {Function} returns template function
     */
    getEditHeaderTemplate(): Function;
    /**
     * Gets a compiled dialog edit footer template.
     *
     * @private
     * @returns {Function} Returns the Footer template
     */
    getEditFooterTemplate(): Function;
    /**
     * Gets a compiled column chooser template.
     *
     * @private
     * @returns {Function} Returns the template
     */
    getColumnChooserTemplate(): Function;
    /**
     * Gets a compiled column chooser header template.
     *
     * @private
     * @returns {Function} returns the header template
     */
    getColumnChooserHeaderTemplate(): Function;
    /**
     * Gets a compiled column chooser footer template.
     *
     * @private
     * @returns {Function} Returns the Footer template
     */
    getColumnChooserFooterTemplate(): Function;
    /**
     * Get the names of the primary key columns of the Grid.
     *
     * @returns {string[]} Returns the field names
     */
    getPrimaryKeyFieldNames(): string[];
    /**
     * Refreshes the Grid header and content.
     *
     * @returns {void}
     */
    refresh(): void;
    /**
     * Refreshes the Grid header.
     *
     * @returns {void}
     */
    refreshHeader(): void;
    /**
     * Gets the collection of selected rows.
     *
     * @returns {Element[]} Returns the element
     */
    getSelectedRows(): Element[];
    /**
     * Gets the collection of selected row indexes.
     *
     * @returns {number[]} Returns the Selected row indexes
     */
    getSelectedRowIndexes(): number[];
    /**
     * Gets the collection of selected row and cell indexes.
     *
     * @returns {number[]} Returns the Selected row cell indexes
     */
    getSelectedRowCellIndexes(): ISelectedCell[];
    /**
     * Gets the collection of selected records.
     *
     * @returns {Object[]} Returns the selected records
     * @isGenericType true
     */
    getSelectedRecords(): Object[];
    /**
     * Gets the collection of selected columns uid.
     *
     * @returns {string[]} Returns the selected column uid
     * @isGenericType true
     */
    getSelectedColumnsUid(): string[];
    /**
     * Gets the data module.
     *
     * @returns {Data} Returns the data
     */
    getDataModule(): Data;
    /**
     * Shows a column by its column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     *
     * @returns {void}
     */
    showColumns(keys: string | string[], showBy?: string): void;
    /**
     * Hides a column by column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     *
     * @returns {void}
     */
    hideColumns(keys: string | string[], hideBy?: string): void;
    /**
     * @hidden
     * @returns {number} Returns the Frozen column
     */
    getFrozenColumns(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Right column count
     */
    getFrozenRightColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Left column
     */
    getFrozenLeftColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the movable column count
     */
    getMovableColumnsCount(): number;
    private updateFrozenColumnsWidth;
    private refreshSplitFrozenColumn;
    /**
     * @hidden
     * @returns {void}
     */
    setFrozenCount(): void;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen left count
     */
    getVisibleFrozenLeftCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen Right count
     */
    getVisibleFrozenRightCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible movable count
     */
    getVisibleMovableCount(): number;
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenRightColumns(): Column[];
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenLeftColumns(): Column[];
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getMovableColumns(): Column[];
    private splitStackedColumns;
    private pushStackedColumns;
    private pushallcol;
    private resetStackedColumns;
    private splitFrozenCount;
    private removeBorder;
    private isVisibleColumns;
    private lastVisibleLeftCol;
    private firstVisibleRightCol;
    private frozenLeftBorderColumns;
    private frozenRightBorderColumns;
    /**
     * @hidden
     * @returns {number} Returns the visible frozen columns count
     */
    getVisibleFrozenColumns(): number;
    /**
     * Get the current Filter operator and field.
     *
     * @returns {FilterUI} Returns the filter UI
     */
    getFilterUIInfo(): FilterUI;
    private getVisibleFrozenColumnsCount;
    private getVisibleFrozenCount;
    private getFrozenCount;
    /**
     * Navigates to the specified target page.
     *
     * @param  {number} pageNo - Defines the page number to navigate.
     *
     * @returns {void}
     */
    goToPage(pageNo: number): void;
    /**
     * Defines the text of external message.
     *
     * @param  {string} message - Defines the message to update.
     *
     * @returns {void}
     */
    updateExternalMessage(message: string): void;
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     *
     * @returns {void}
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    /**
     * Remove the existing columns along with the grid actions like sorting, filtering, searching, grouping, aggregate, etc., and grid will refresh with new columns based on the updated new data source.
     * > * If no columns are specified while changing the data source, then the columns are auto generated in the Grid based on the list of columns in the updated data source.
     *
     * @param {Object | DataManager | DataResult} dataSource -  Assign the new datasource.
     * @param {Column[] | string[] | ColumnModel[]} columns - Defines columns.
     * @returns {void}
     *
     *
     * ```typescript
     * <button id="btn">change dataSource </button>
     * <div id="Grid"></div>
     * <script>
     * let gridObj: Grid = new Grid({
     *     dataSource: employeeData,  // you can define the datamanager here if you are binding a data through datamanager
     *     columns: [
     *         { field: 'OrderID', headerText: 'Order ID', width:100 },
     *         { field: 'EmployeeID', headerText: 'Employee ID' }],
     * });
     * gridObj.appendTo('#Grid');
     * document.getElementById('btn').addEventListener("click", function(){
     * let newColumn: [
     *     { field: 'CustomerID', headerText: 'Customer ID', width:100 },
     *     { field: 'FirstName', headerText: 'Name' }];
     * gridObj.changeDataSource(customerData, newColumn);
     * });
     * </script>
     * ```
     *
     */
    changeDataSource(dataSource?: Object | DataManager | DataResult, columns?: Column[] | string[] | ColumnModel[]): void;
    /**
     * Clears all the sorted columns of the Grid.
     *
     * @returns {void}
     */
    clearSorting(): void;
    /**
     * Remove sorted column by field name.
     *
     * @param {string} field - Defines the column field name to remove sort.
     * @returns {void}
     * @hidden
     */
    removeSortColumn(field: string): void;
    /**
     * @hidden
     * @returns {void}
     */
    clearGridActions(): void;
    /**
     * Filters grid row by column name with the given options.
     *
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, the grid filters the records with exact match. if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     *
     * @returns {void}
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean | number[] | string[] | Date[] | boolean[] | null, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: string, actualOperator?: string): void;
    /**
     * Clears all the filtered rows of the Grid.
     *
     * @param {string[]} fields - Defines the Fields
     * @returns {void}
     */
    clearFiltering(fields?: string[]): void;
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @returns {void}
     * @hidden
     */
    removeFilteredColsByField(field: string, isClearFilterBar?: boolean): void;
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     *
     * @returns {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     *
     * @returns {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     *
     * @returns {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Selects a range of cells from start and end indexes.
     *
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     *
     * @returns {void}
     */
    selectCellsByRange(startIndex: IIndex, endIndex?: IIndex): void;
    /**
     * Searches Grid records using the given key.
     * You can customize the default search option by using the
     * [`searchSettings`](./#searchsettings/).
     *
     * @param  {string} searchString - Defines the key.
     *
     * @returns {void}
     */
    search(searchString: string): void;
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./#printmode).
     *
     * @returns {void}
     */
    print(): void;
    /**
     * Delete a record with Given options. If fieldname and data is not given then grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     *
     * @param {string} fieldname - Defines the primary key field, 'Name of the column'.
     * @param {Object} data - Defines the JSON data of the record to be deleted.
     * @returns {void}
     */
    deleteRecord(fieldname?: string, data?: Object): void;
    /**
     * Starts edit the selected row. At least one row must be selected before invoking this method.
     * `editSettings.allowEditing` should be true.
     * {% codeBlock src='grid/startEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void}
     */
    startEdit(): void;
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     *
     * @returns {void}
     */
    endEdit(): void;
    /**
     * Cancels edited state.
     *
     * @returns {void}
     */
    closeEdit(): void;
    /**
     * Adds a new record to the Grid. Without passing parameters, it adds empty rows.
     * > `editSettings.allowEditing` should be true.
     *
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     * @returns {void}
     */
    addRecord(data?: Object, index?: number): void;
    /**
     * Delete any visible row by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     * @returns {void}
     */
    deleteRow(tr: HTMLTableRowElement): void;
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     *
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     *
     * @returns {void}
     */
    editCell(index: number, field: string): void;
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     *
     * @returns {void}
     * {% codeBlock src='grid/saveCell/index.md' %}{% endcodeBlock %}
     */
    saveCell(): void;
    /**
     * To update the specified cell by given value without changing into edited state.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     *
     * @returns {void}
     */
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    /**
     * To update the specified row by given values without changing into edited state.
     *
     * {% codeBlock src='grid/updateRow/index.md' %}{% endcodeBlock %}
     *
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     *
     * @returns {void}
     */
    updateRow(index: number, data: Object): void;
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     *
     * @returns {Object} Returns the batch changes
     */
    getBatchChanges(): Object;
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     *
     * @returns {void}
     */
    enableToolbarItems(items: string[], isEnable: boolean): void;
    /**
     * Copy the selected rows or cells data into clipboard.
     *
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     * @returns {void}
     */
    copy(withHeader?: boolean): void;
    /**
     * @hidden
     * @returns {void}
     */
    recalcIndentWidth(): void;
    /**
     * @hidden
     * @returns {void}
     */
    resetIndentWidth(): void;
    /**
     * @hidden
     * @returns {boolean} Returns isRowDragable
     */
    isRowDragable(): boolean;
    /**
     * Changes the Grid column positions by field names.
     *
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     *
     * @returns {void}
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByIndex multiple times,
     * then you won't get the same results every time.
     *
     * @param  {number} fromIndex - Defines the origin field index.
     * @param  {number} toIndex - Defines the destination field index.
     *
     * @returns {void}
     */
    reorderColumnByIndex(fromIndex: number, toIndex: number): void;
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByTargetIndex multiple times,
     * then you will get the same results every time.
     *
     * @param  {string} fieldName - Defines the field name.
     * @param  {number} toIndex - Defines the destination field index.
     *
     * @returns {void}
     */
    reorderColumnByTargetIndex(fieldName: string | string[], toIndex: number): void;
    /**
     * Changes the Grid Row position with given indexes.
     *
     * @param  {number} fromIndexes - Defines the origin Indexes.
     * @param  {number} toIndex - Defines the destination Index.
     *
     * @returns {void}
     */
    reorderRows(fromIndexes: number[], toIndex: number): void;
    /**
     * @param {ReturnType} e - Defines the Return type
     * @returns {void}
     * @hidden
     */
    refreshDataSource(e: ReturnType): void;
    /**
     * @param {boolean} enable -Defines the enable
     * @returns {void}
     * @hidden
     */
    disableRowDD(enable: boolean): void;
    /**
     * Changes the column width to automatically fit its content to ensure that the width shows the content without wrapping/hiding.
     * > * This method ignores the hidden columns.
     * > * Uses the `autoFitColumns` method in the `dataBound` event to resize at initial rendering.
     * > * By specifying the start row index and end row index, providing the range within which the maximum width for that column should be considered when applying `autoFitColumns`.
     * > * The width of header rows is always calculated. If the width of a header row exceeds the specified range, its width will be allocated to the specific content rows.
     *
     * @param  {string |string[]} fieldNames - Defines the column names.
     * @param  {number} startRowIndex - Specifies the start index of the content row.
     * @param  {number} endRowIndex - Specifies the end index of content row.
     * @returns {void}
     *
     *
     * ```typescript
     * <div id="Grid"></div>
     * <script>
     * let gridObj: Grid = new Grid({
     *     dataSource: employeeData,
     *     columns: [
     *         { field: 'OrderID', headerText: 'Order ID', width:100 },
     *         { field: 'EmployeeID', headerText: 'Employee ID' }],
     *     dataBound: () => gridObj.autoFitColumns('EmployeeID');
     * });
     * gridObj.appendTo('#Grid');
     * </script>
     * ```
     *
     */
    autoFitColumns(fieldNames?: string | string[], startRowIndex?: number, endRowIndex?: number): void;
    /**
     * @returns {void}
     * @hidden
     */
    preventAdjustColumns(): void;
    private restoreAdjustColumns;
    private widthUnit;
    private defaultIndentWidth;
    private isPercentageWidthGrid;
    /**
     * @param {number} x - Defines the number
     * @param {number} y - Defines the number
     * @param {Element} target - Defines the Element
     * @returns {void}
     * @hidden
     */
    createColumnchooser(x: number, y: number, target: Element): void;
    private initializeServices;
    private processModel;
    private initForeignColumn;
    private enableVerticalRendering;
    private gridRender;
    dataReady(): void;
    private updateRTL;
    private createGridPopUpElement;
    private updateGridLines;
    private updateResizeLines;
    /**
     * The function is used to apply text wrap
     *
     * @returns {void}
     * @hidden
     */
    applyTextWrap(): void;
    /**
     * The function is used to remove text wrap
     *
     * @returns {void}
     * @hidden
     */
    removeTextWrap(): void;
    /**
     * The function is used to add Tooltip to the grid cell that has ellipsiswithtooltip clip mode.
     *
     * @returns {void}
     * @hidden
     */
    createTooltip(): void;
    /** @hidden
     * @returns {void}
     */
    freezeRefresh(): void;
    private getTooltipStatus;
    private mouseMoveHandler;
    private isEllipsisTooltip;
    private scrollHandler;
    /**
     * To create table for ellipsiswithtooltip
     *
     * @param {Element} table - Defines the table
     * @param {string} tag - Defines the tag
     * @param {string} type - Defines the type
     * @returns {HTMLDivElement} Returns the HTML div ELement
     * @hidden
     */
    protected createTable(table: Element, tag: string, type: string): HTMLDivElement;
    private onKeyPressed;
    /**
     * Binding events to the element while component creation.
     *
     * @hidden
     * @returns {void}
     */
    wireEvents(): void;
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    unwireEvents(): void;
    /**
     * @hidden
     * @returns {void}
     */
    addListener(): void;
    /**
     * @hidden
     * @returns {void}
     */
    removeListener(): void;
    /**
     * Get current visible data of grid.
     *
     * @returns {Object[]} Returns the current view records
     *
     * @isGenericType true
     */
    getCurrentViewRecords(): Object[];
    private mouseClickHandler;
    private checkEdit;
    private dblClickHandler;
    private focusOutHandler;
    private isChildGrid;
    /**
     * @param {Object} persistedData - Defines the persisted data
     * @returns {void}
     * @hidden
     */
    mergePersistGridData(persistedData?: Object): void;
    private mergeColumns;
    /**
     * @hidden
     * @returns {boolean} Returns the isDetail
     */
    isDetail(): boolean;
    private isCommandColumn;
    private isForeignKeyEnabled;
    private keyPressHandler;
    private keyDownHandler;
    private keyActionHandler;
    /**
     * @param {Function[]} modules - Defines the modules
     * @returns {void}
     * @hidden
     */
    setInjectedModules(modules: Function[]): void;
    private updateColumnObject;
    private refreshFrozenPosition;
    /**
     * Gets the foreign columns from Grid.
     *
     * @returns {Column[]} Returns Foreign key column
     */
    getForeignKeyColumns(): Column[];
    /**
     * @hidden
     * @returns {number} Returns row height
     */
    getRowHeight(): number;
    /**
     * Refreshes the Grid column changes.
     *
     * @returns {void}
     */
    refreshColumns(): void;
    /**
     * Export Grid data to Excel file(.xlsx).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {Workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} Returns the excelexport
     */
    excelExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: Workbook, isBlob?: boolean): Promise<any>;
    /**
     * Export Grid data to CSV file.
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {Workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} Returns csv export
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: Workbook, isBlob?: boolean): Promise<any>;
    /**
     * Export Grid data to PDF document.
     *
     * @param {pdfExportProperties} pdfExportProperties - Defines the export properties of the Grid.
     * @param {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     *
     * @returns {Promise<any>} Returns pdfexport
     */
    pdfExport(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    private exportMultiplePdfGrids;
    private exportMultipleExcelGrids;
    /**
     * Groups a column by column name.
     *
     * @param  {string} columnName - Defines the column name to group.
     *
     * @returns {void}
     */
    groupColumn(columnName: string): void;
    /**
     * Expands all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    groupExpandAll(): void;
    /**
     * Collapses all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    groupCollapseAll(): void;
    /**
     * Expands or collapses grouped rows by target element.
     *
     * @param  {Element} target - Defines the target element of the grouped row.
     * @returns {void}
     */
    /**
     * Clears all the grouped columns of the Grid.
     *
     * @returns {void}
     */
    clearGrouping(): void;
    /**
     * Ungroups a column by column name.
     *
     * {% codeBlock src='grid/ungroupColumn/index.md' %}{% endcodeBlock %}
     *
     * @param  {string} columnName - Defines the column name to ungroup.
     *
     * @returns {void}
     */
    ungroupColumn(columnName: string): void;
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param {number} x - Defines the X axis.
     * @param {number} y - Defines the Y axis.
     *
     * @returns {void}
     */
    openColumnChooser(x?: number, y?: number): void;
    private scrollRefresh;
    /**
     * Collapses a detail row with the given target.
     *
     * @param  {Element} target - Defines the expanded element to collapse.
     * @returns {void}
     */
    /**
     * Collapses all the detail rows of the Grid.
     *
     * @returns {void}
     */
    detailCollapseAll(): void;
    /**
     * Expands a detail row with the given target.
     *
     * @param  {Element} target - Defines the collapsed element to expand.
     * @returns {void}
     */
    /**
     * Expands all the detail rows of the Grid.
     *
     * @returns {void}
     */
    detailExpandAll(): void;
    /**
     * Deselects the currently selected cells.
     *
     * @returns {void}
     */
    clearCellSelection(): void;
    /**
     * Deselects the currently selected rows.
     *
     * @returns {void}
     */
    clearRowSelection(): void;
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     *
     * @returns {void}
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Selects a range of rows from start and end row indexes.
     *
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     *
     * @returns {void}
     */
    selectRowsByRange(startIndex: number, endIndex?: number): void;
    /**
     * @hidden
     * @returns {boolean} Returns whether context menu is open or not
     */
    isContextMenuOpen(): boolean;
    /**
     * @param {Function} module - Defines the module
     * @returns {boolean} return the injected modules
     * @hidden
     */
    ensureModuleInjected(module: Function): boolean;
    /**
     * Destroys the given template reference.
     *
     * @param {string[]} propertyNames - Defines the collection of template name.
     * @param {any} index - specifies the index
     *
     * @returns {void}
     */
    destroyTemplate(propertyNames?: string[], index?: any): void;
    /**
     * @param {string | string[]} type - Defines the type
     * @param {Object} args - Defines the arguments
     * @returns {void}
     * @hidden
     * @private
     */
    log(type: string | string[], args?: Object): void;
    /**
     * @param {Element} element - Defines the element
     * @returns {void}
     * @hidden
     */
    applyBiggerTheme(element: Element): void;
    /**
     * @hidden
     * @returns {Object} Returns the previous row data
     */
    getPreviousRowData(): Object;
    /**
     * Hides the scrollbar placeholder of Grid content when grid content is not overflown.
     *
     * @returns {void}
     */
    hideScroll(): void;
    /**
     * Get row index by primary key or row data.
     *
     * @param  {string | Object} value - Defines the primary key value.
     *
     * @returns {number} Returns the index
     */
    getRowIndexByPrimaryKey(value: string | Object): number;
    /**
     * @param {string} field - Defines the field name
     * @param {boolean} isForeignKey - Defines the foreign key
     * @returns {Column} returns the column
     * @hidden
     */
    grabColumnByFieldFromAllCols(field: string, isForeignKey?: boolean): Column;
    /**
     * @param {string} uid - Defines the uid
     * @returns {Column} returns the column
     * @hidden
     */
    grabColumnByUidFromAllCols(uid: string): Column;
    /**
     * Get all filtered records from the Grid and it returns array of objects for the local dataSource, returns a promise object if the Grid has remote data.
     *
     * @returns {Object[] | Promise<Object>} Returns the filtered records
     */
    getFilteredRecords(): Object[] | Promise<Object>;
    private getUserAgent;
    /**
     * @param {TouchEventArgs} e - Defines the TouchEventArgs
     * @returns {void}
     * @hidden
     */
    tapEvent(e: TouchEventArgs): void;
    /**
     * @param {string} prefix - specifies the prefix
     * @returns {string} returns the row uid
     * @hidden
     */
    getRowUid(prefix: string): string;
    /**
     * @param {string} uid - specifies the uid
     * @returns {Element} returns the element
     * @hidden
     */
    getRowElementByUID(uid: string): Element;
    /**
     * Gets the hidden columns from the Grid.
     *
     * @returns {Column[]} Returns the Column
     */
    getHiddenColumns(): Column[];
    /**
     * Calculates the page size by parent element height
     *
     * @param {number | string } containerHeight - specifies the container height
     * @returns {number} returns the page size
     */
    calculatePageSizeByParentHeight(containerHeight: number | string): number;
    private getNoncontentHeight;
    /**
     *To perform aggregate operation on a column.
     *
     * @param  {AggregateColumnModel} summaryCol - Pass Aggregate Column details.
     * @param  {Object} summaryData - Pass JSON Array for which its field values to be calculated.
     *
     * @returns {number} returns the summary values
     */
    getSummaryValues(summaryCol: AggregateColumnModel, summaryData: Object): number;
    /**
     * Sends a Post request to export Grid to Excel file in server side.
     *
     * @param  {string} url - Pass Url for server side excel export action.
     *
     * @param  {ExportHeaders} headers - The headers to include in the export request.
     *
     * @returns {void}
     */
    serverExcelExport(url: string, headers?: ExportHeaders): void;
    /**
     * Sends a Post request to export Grid to Pdf file in server side.
     *
     * @param  {string} url - Pass Url for server side pdf export action.
     *
     * @param  {ExportHeaders} headers - The headers to include in the export request.
     *
     * @returns {void}
     */
    serverPdfExport(url: string, headers?: ExportHeaders): void;
    /**
     * Sends a Post request to export Grid to CSV file in server side.
     *
     * @param  {string} url - Pass Url for server side csv export action.
     *
     * @param  {ExportHeaders} headers - The headers to include in the export request.
     *
     * @returns {void}
     */
    serverCsvExport(url: string, headers?: ExportHeaders): void;
    /**
     * @param {string} url - Defines exporting url
     * @param {ExportHeaders} headers - The optional headers for the export request.
     * @returns {void}
     * @hidden
     */
    exportGrid(url: string, headers?: ExportHeaders): void;
    /**
     * @param {Column[]} columns - Defines array of columns
     * @param {string[]} include - Defines array of sting
     * @returns {Column[]} returns array of columns
     * @hidden
     */
    setHeaderText(columns: Column[], include: string[]): Column[];
    private getFormat;
    /**
     * @hidden
     * @returns {boolean} returns the isCollapseStateEnabled
     */
    isCollapseStateEnabled(): boolean;
    /**
     * @param {number} key - Defines the primary key value.
     * @param {Object} rowData - Defines the rowData
     * @returns {void}
     */
    updateRowValue(key: number, rowData: Object): void;
    /**
     * @hidden
     * @returns {void}
     */
    setForeignKeyData(): void;
    /**
     * @param {string} field - specifies the field
     * @returns {void}
     * @hidden
     */
    resetFilterDlgPosition(field: string): void;
    /**
     * @param {any} callBack - specifies the callBack method
     * @returns {void}
     * @hidden
     */
    renderTemplates(callBack?: any): void;
    /**
     * Apply the changes to the Grid without refreshing the rows.
     *
     * @param  {BatchChanges} changes - Defines changes to be updated.
     * @returns {void}
     */
    batchUpdate(changes: BatchChanges): void;
    /**
     * Apply the changes to the Grid in one batch after 50ms without refreshing the rows.
     *
     * @param  {BatchChanges} changes - Defines changes to be updated.
     * @returns {void}
     */
    batchAsyncUpdate(changes: BatchChanges): void;
    private processBulkRowChanges;
    private processRowChanges;
    private setNewData;
    private deleteRowElement;
    private bulkRefresh;
    private renderRowElement;
    private addRowObject;
    /**
     * @hidden
     * @returns {void}
     */
    updateVisibleExpandCollapseRows(): void;
    /**
     * Method to sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @param {string} value - Specifies the html value to sanitize
     * @returns {string} Returns the sanitized html string
     * @hidden
     */
    sanitize(value: string): string;
    /**
     * @param {string | number} height - specifies the height
     * @returns {number | string} - specifies the height number
     * @hidden
     */
    getHeight(height: string | number): number | string;
    /**
     * @hidden
     * @returns {Element} - returns frozen right content
     * @deprecated This method is deprecated. Use `getContent()` method instead.
     */
    getFrozenRightContent(): Element;
    /**
     * @hidden
     * @returns {Element} - returns frozen right header
     * @deprecated This method is deprecated. Use `getHeaderContent()` method instead.
     */
    getFrozenRightHeader(): Element;
    /**
     * @hidden
     * @returns {Element} - returns movable header tbody
     * @deprecated This method is deprecated. Use `getHeaderContent().querySelector('tbody')` method instead.
     */
    getMovableHeaderTbody(): Element;
    /**
     * @hidden
     * @returns {Element} - returns movable content tbody
     * @deprecated This method is deprecated. Use `getContent().querySelector('tbody')` method instead.
     */
    getMovableContentTbody(): Element;
    /**
     * @hidden
     * @returns {Element} - returns frozen header tbody
     * @deprecated This method is deprecated. Use `getHeaderContent().querySelector('tbody')` method instead.
     */
    getFrozenHeaderTbody(): Element;
    /**
     * @hidden
     * @returns {Element} - returns frozen left content tbody
     * @deprecated This method is deprecated. Use `getContent().querySelector('tbody')` method instead.
     */
    getFrozenLeftContentTbody(): Element;
    /**
     * @hidden
     * @returns {Element} - returns frozen right header tbody
     * @deprecated This method is deprecated. Use `getHeaderContent().querySelector('tbody')` method instead.
     */
    getFrozenRightHeaderTbody(): Element;
    /**
     * @returns {Element} returns frozen right content tbody
     * @deprecated This method is deprecated. Use `getContent().querySelector('tbody')` method instead.
     * @hidden
     */
    getFrozenRightContentTbody(): Element;
    /**
     * @param {boolean} isCustom - Defines custom filter dialog open
     * @returns {void}
     * @hidden
     */
    showResponsiveCustomFilter(isCustom?: boolean): void;
    /**
     * @param {boolean} isCustom - Defines custom sort dialog open
     * @returns {void}
     * @hidden
     */
    showResponsiveCustomSort(isCustom?: boolean): void;
    /**
     * @param {boolean} isCustom - Defines custom column chooser dialog open
     * @returns {void}
     * @hidden
     */
    showResponsiveCustomColumnChooser(isCustom?: boolean): void;
    /**
     * To manually show the vertical row mode filter dialog
     *
     * @returns {void}
     */
    showAdaptiveFilterDialog(): void;
    /**
     * To manually show the vertical row sort filter dialog
     *
     * @returns {void}
     */
    showAdaptiveSortDialog(): void;
    /**
     * @param {boolean} isColVirtualization - Defines column virtualization
     * @returns {Column[]} returns array of column models
     * @hidden
     */
    getCurrentVisibleColumns(isColVirtualization?: boolean): Column[];
    private enableInfiniteAggrgate;
}
