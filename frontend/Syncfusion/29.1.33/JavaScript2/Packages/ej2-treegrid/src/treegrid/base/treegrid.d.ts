import { Component, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, KeyboardEvents } from '@syncfusion/ej2-base';
import { Column, ColumnModel } from '../models/column';
import { BeforeBatchSaveArgs, BeforeBatchAddArgs, BatchDeleteArgs, BeforeBatchDeleteArgs } from '@syncfusion/ej2-grids';
import { ColumnQueryModeType, HeaderCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { RowDragEventArgs, RowDropSettingsModel } from '@syncfusion/ej2-grids';
import { LoadingIndicatorModel } from '../models/loading-indicator-model';
import { DetailDataBoundEventArgs, ClipMode, ColumnChooser } from '@syncfusion/ej2-grids';
import { SearchEventArgs, AddEventArgs, EditEventArgs, DeleteEventArgs } from '@syncfusion/ej2-grids';
import { SaveEventArgs, CellSaveArgs, BatchAddArgs, BatchCancelArgs, BeginEditArgs, CellEditArgs } from '@syncfusion/ej2-grids';
import { TextWrapSettingsModel } from '../models/textwrap-settings-model';
import { Filter } from '../actions/filter';
import { BeforeCopyEventArgs, BeforePasteEventArgs } from '@syncfusion/ej2-grids';
import { TreeClipboard } from '../actions/clipboard';
import { Aggregate } from '../actions/summary';
import { Reorder } from '../actions/reorder';
import { Resize } from '../actions/resize';
import { Selection as TreeGridSelection } from '../actions/selection';
import { ColumnMenu } from '../actions/column-menu';
import { DetailRow } from '../actions/detail-row';
import { Freeze } from '../actions/freeze-column';
import { Print } from '../actions/print';
import { TreeGridModel } from './treegrid-model';
import { FilterSettingsModel } from '../models/filter-settings-model';
import { SearchSettingsModel } from '../models/search-settings-model';
import { RowInfo, RowDataBoundEventArgs, PageEventArgs, FilterEventArgs, FailureEventArgs, SortEventArgs } from '@syncfusion/ej2-grids';
import { RowSelectingEventArgs, RowSelectEventArgs, RowDeselectEventArgs, IIndex, ISelectedCell } from '@syncfusion/ej2-grids';
import { CellSelectEventArgs, CellDeselectEventArgs } from '@syncfusion/ej2-grids';
import { SelectionSettingsModel } from '../models/selection-settings-model';
import { SortDirection, ColumnDragEventArgs } from '@syncfusion/ej2-grids';
import { PrintMode, Data, ContextMenuItemModel } from '@syncfusion/ej2-grids';
import { ColumnMenuItem, ColumnMenuItemModel, CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportCompleteArgs, ExcelHeaderQueryCellInfoEventArgs, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { PdfExportCompleteArgs, PdfHeaderQueryCellInfoEventArgs, PdfQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportProperties, PdfExportProperties, CellSelectingEventArgs, PrintEventArgs } from '@syncfusion/ej2-grids';
import { ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';
import { BeforeDataBoundArgs } from '@syncfusion/ej2-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Grid, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { Render } from '../renderer/render';
import { DataManipulation } from './data';
import { RowDD } from '../actions/rowdragdrop';
import { Sort } from '../actions/sort';
import { ITreeData, RowExpandedEventArgs, RowCollapsedEventArgs, RowCollapsingEventArgs, TreeGridExcelExportProperties } from './interface';
import { DataStateChangeEventArgs, RowExpandingEventArgs, TreeGridPdfExportProperties } from './interface';
import { GridLine } from '@syncfusion/ej2-grids';
import { DataSourceChangedEventArgs, RecordDoubleClickEventArgs, ResizeArgs } from '@syncfusion/ej2-grids';
import { ToolbarItems, ToolbarItem, ContextMenuItem, RowPosition, CopyHierarchyType } from '../enum';
import { ItemModel, ClickEventArgs, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { PageSettingsModel } from '../models/page-settings-model';
import { AggregateRowModel } from '../models/summary-model';
import { ExcelExport } from '../actions/excel-export';
import { PdfExport } from '../actions/pdf-export';
import { Toolbar } from '../actions/toolbar';
import { Page } from '../actions/page';
import { ContextMenu } from '../actions/context-menu';
import { EditSettingsModel } from '../models/edit-settings-model';
import { Edit } from '../actions/edit';
import { SortSettingsModel } from '../models/sort-settings-model';
import { InfiniteScrollSettingsModel } from '../models/infinite-scroll-settings-model';
/**
 * Represents the TreeGrid component.
 * ```html
 * <div id='treegrid'></div>
 * <script>
 *  var treegridObj = new TreeGrid({ allowPaging: true });
 *  treegridObj.appendTo('#treegrid');
 * </script>
 * ```
 */
export declare class TreeGrid extends Component<HTMLElement> implements INotifyPropertyChanged {
    constructor(options?: TreeGridModel, element?: Element);
    private defaultLocale;
    private dataResults;
    private l10n;
    dataModule: DataManipulation;
    private registeredTemplate;
    private uniqueIDCollection;
    private uniqueIDFilterCollection;
    private changedRecords;
    private deletedRecords;
    private addedRecords;
    private targetElement;
    private isGantt;
    private isAddedFromGantt;
    private isIndentEnabled;
    private indentOutdentAction;
    private isFromChartSide;
    private parentQuery;
    private isCollapsedEventTriggered;
    private isCollapsingEventTriggered;
    private isExpandedEventTriggered;
    private isExpandingEventTriggered;
    private collapseAllPrevent;
    private expandAllPrevent;
    /**
     * The `sortModule` is used to manipulate sorting in TreeGrid.
     */
    sortModule: Sort;
    private action;
    private dropIndex;
    private dropPosition;
    private modifiedRecords;
    private selectedRecords;
    private selectedRows;
    private loggerModule;
    private isSelfReference;
    private columnModel;
    private isExpandAll;
    private isCollapseAll;
    private isExpandRefresh;
    private gridSettings;
    private isEditCollapse;
    private treeColumnTextAlign;
    private treeColumnField;
    private stackedHeader;
    private isExcel;
    /** @hidden */
    initialRender: boolean;
    /** @hidden */
    flatData: Object[];
    /** @hidden */
    private infiniteScrollData;
    /** @hidden */
    private remoteCollapsedData;
    /** @hidden */
    private remoteExpandedData;
    /** @hidden */
    isLocalData: boolean;
    /** @hidden */
    parentData: Object[];
    /**
     * @hidden
     */
    renderModule: Render;
    /** @hidden */
    summaryModule: Aggregate;
    /**
     * The `reorderModule` is used to manipulate reordering in TreeGrid.
     */
    reorderModule: Reorder;
    /**
     * The `columnMenuModule` is used to manipulate column menu items and its action in TreeGrid.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `rowDragandDrop` is used to manipulate Row Reordering in TreeGrid.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `contextMenuModule` is used to handle context menu items and its action in the TreeGrid.
     */
    contextMenuModule: ContextMenu;
    /**
     * `detailRowModule` is used to handle detail rows rendering in the TreeGrid.
     *
     * @hidden
     */
    detailRowModule: DetailRow;
    /**
     * `freezeModule` is used to freeze the rows and columns in the TreeGrid.
     *
     * @hidden
     */
    freezeModule: Freeze;
    /**
     * Specifies the number of rows that should remain visible and fixed at the top of the TreeGrid during scrolling.
     *
     * This feature helps improve readability in data-heavy grids by keeping the header rows or key rows visible.
     *
     * @default 0
     */
    frozenRows: number;
    /**
     * Specifies the number of columns that should remain visible and fixed on the left side of the TreeGrid during horizontal scrolling.
     *
     * This feature ensures key columns, such as identifiers, stay visible while users scroll through data.
     *
     * @default 0
     */
    frozenColumns: number;
    /**
     * Defines the options for printing the TreeGrid.
     * The available print modes are:
     * * `AllPages`: Prints all pages of the TreeGrid.
     * * `CurrentPage`: Prints only the current page of the TreeGrid.
     *
     * @default Syncfusion.EJ2.Grids.ClipMode.Ellipsis
     * @aspType Syncfusion.EJ2.Grids.ClipMode
     * @isEnumeration true
     */
    clipMode: ClipMode;
    /**
     * `resizeModule` is used to manipulate resizing in the TreeGrid.
     *
     * @hidden
     */
    resizeModule: Resize;
    /**
     * The `keyboardModule` is used to manipulate keyboard interactions in TreeGrid.
     */
    keyboardModule: KeyboardEvents;
    /**
     * The `printModule` is used to handle the printing feature of the TreeGrid.
     */
    printModule: Print;
    /**
     * `clipboardModule` is used to handle TreeGrid copy action.
     */
    clipboardModule: TreeClipboard;
    private keyConfigs;
    /** @hidden */
    filterModule: Filter;
    excelExportModule: ExcelExport;
    pdfExportModule: PdfExport;
    selectionModule: TreeGridSelection;
    /** @hidden */
    /** @hidden */
    grid: Grid;
    /**
     * Defines the schema of dataSource.
     * If the `columns` declaration is empty or undefined then the `columns` are automatically generated from data source.
     * {% codeBlock src='treegrid/columns/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    columns: ColumnModel[] | string[] | Column[];
    /**
     * Specifies the mapping property path for child records in data source
     * {% codeBlock src='treegrid/childMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    childMapping: string;
    /**
     * Specifies whether record is parent or not for the remote data binding
     *
     * @default null
     */
    hasChildMapping: string;
    /**
     * Specifies the index of the column that needs to have the expander button.
     *
     * @default 0
     */
    treeColumnIndex: number;
    /**
     * Specifies the name of the field in the dataSource, which contains the id of that row.
     * {% codeBlock src='treegrid/idMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    idMapping: string;
    /**
     * Specifies the name of the field in the dataSource, which contains the parent’s id
     * {% codeBlock src='treegrid/parentIdMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    parentIdMapping: string;
    /**
     * Specifies whether to load all rows in a collapsed state when the TreeGrid is initially rendered.
     *
     * This setting is particularly useful when dealing with large datasets, as it helps enhance loading performance by
     * reducing initial data rendering.
     *
     * @default false
     */
    enableCollapseAll: boolean;
    /**
     * Specifies the mapping property path for the expand status of a record in data source.
     *
     * @default null
     */
    expandStateMapping: string;
    /**
     * If `allowRowDragAndDrop` is set to true, row reordering functionality is enabled, allowing rows to be dragged
     * and dropped within the TreeGrid or across TreeGrids.
     *
     * This feature enables users to reorganize data dynamically via drag-and-drop operations.
     *
     * @default false
     */
    allowRowDragAndDrop: boolean;
    /**
     * It is used to render TreeGrid table rows.
     * {% codeBlock src='treegrid/dataSource/index.md' %}{% endcodeBlock %}
     *
     * @default []
     * @isGenericType true
     * @isDataSource true
     */
    dataSource: Object | DataManager;
    /**
     * Defines the external [Query](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.
     *
     * @default null
     */
    query: Query;
    /**
     * @hidden
     */
    cloneQuery: Query;
    /**
     * Defines the options for printing the TreeGrid.
     * The available print modes are:
     * * `AllPages`: Prints all pages of the TreeGrid.
     * * `CurrentPage`: Prints only the current page of the TreeGrid.
     *
     * @default Syncfusion.EJ2.Grids.PrintMode.AllPages
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.PrintMode
     */
    printMode: PrintMode;
    /**
     * If `allowPaging` is set to true, pager renders.
     *
     * @default false
     */
    allowPaging: boolean;
    /**
     * When enabled, only parent records would be rendered during the initial render and child records will be loaded only when expanding a parent record.
     * This property is only applicable for remote data binding.
     * Loading child records on demand can improve the performance of data-bound controls with a large number of records.
     * Child records are only loaded when they are requested, rather than loading all child records at once.
     *
     * @default true
     */
    loadChildOnDemand: boolean;
    /**
     * If `allowTextWrap` set to true,
     * then text content will wrap to the next line when its text content exceeds the width of the Column Cells.
     *
     * @default false
     */
    allowTextWrap: boolean;
    /**
     * Configures the text wrap in the TreeGrid.
     *
     * @default {wrapMode:"Both"}
     */
    textWrapSettings: TextWrapSettingsModel;
    /**
     * If `allowReordering` is set to true, TreeGrid columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     * > If TreeGrid is rendered with stacked headers, reordering is allowed only at the same level as the column headers.
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to true, TreeGrid columns can be resized.
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If `autoCheckHierarchy` is set to true, hierarchy checkbox selection is enabled in TreeGrid.
     *
     * @default false
     */
    autoCheckHierarchy: boolean;
    /**
     * Configures the pager in the TreeGrid.
     *
     * @default {currentPage: 1, pageSize: 12, pageCount: 8, enableQueryString: false, pageSizes: false, template: null}
     */
    pageSettings: PageSettingsModel;
    /**
     * Configures the row drop settings of the TreeGrid.
     */
    rowDropSettings: RowDropSettingsModel;
    /**
     * Defines the currencyCode format of the Tree Grid columns
     *
     * @private
     */
    private currencyCode;
    /**
     * @hidden
     * It used to render pager template
     * @default null
     * @aspType string
     */
    pagerTemplate: string | Function;
    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.
     *
     * > Check the [Column menu](../../treegrid/columns/#column-menu/) for its configuration.
     *
     * @default false
     */
    showColumnMenu: boolean;
    /**
     * If `showColumnChooser` is set to true, it allows you to dynamically show or hide columns.
     *
     * @default false
     */
    showColumnChooser: boolean;
    /**
     * If `allowSorting` is set to true, it allows sorting of treegrid records when column header is clicked.
     *
     * @default false
     */
    allowSorting: boolean;
    /**
     * If `allowMultiSorting` set to true, then it will allow the user to sort multiple column in the treegrid.
     * > `allowSorting` should be true.
     *
     * @default true
     */
    allowMultiSorting: boolean;
    /**
     * Configures the sort settings of the TreeGrid.
     *
     * @default {columns:[]}
     */
    sortSettings: SortSettingsModel;
    /**
     * Configures the TreeGrid aggregate rows.
     * > Check the [Aggregates](../../treegrid/aggregates/aggregates) for its configuration.
     *
     * @default []
     */
    aggregates: AggregateRowModel[];
    /**
     * Configures the edit settings.
     *
     * @default { allowAdding: false, allowEditing: false, allowDeleting: false, mode:'Normal',
     * allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * If `allowFiltering` is set to true the filter bar will be displayed.
     * If set to false the filter bar will not be displayed.
     * Filter bar allows the user to filter tree grid records with required criteria.
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
     * or the HTML element ID.
     *
     * @aspType string
     */
    detailTemplate: string | Function;
    /**
     * Configures the filter settings of the TreeGrid.
     *
     * @default {columns: [], type: 'FilterBar', mode: 'Immediate', showFilterBarStatus: true, immediateModeDelay: 1500 , operators: {}}
     */
    filterSettings: FilterSettingsModel;
    /**
     * Configures the search settings of the TreeGrid.
     *
     * @default {search: [] , operators: {}}
     */
    searchSettings: SearchSettingsModel;
    /**
     * `toolbar` defines the ToolBar items of the TreeGrid.
     * It contains built-in and custom toolbar items.
     * If a string value is assigned to the `toolbar` option, it is considered as the template for the whole TreeGrid ToolBar.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the TreeGrid's Toolbar.
     * <br><br>
     * The available built-in ToolBar items are:
     * * Search: Searches records by the given key.
     * * ExpandAll: Expands all the rows in TreeGrid
     * * CollapseAll: Collapses all the rows in TreeGrid
     * * ExcelExport - Export the TreeGrid to Excel(excelExport() method manually to make export.)
     * * PdfExport - Export the TreeGrid to PDF(pdfExport() method manually to make export.)
     * * CsvExport - Export the TreeGrid to CSV(csvExport() method manually to make export.)<br><br>
     * The following code example implements the custom toolbar items.
     *
     * @default null
     */
    toolbar: (ToolbarItems | string | ItemModel | ToolbarItem)[];
    /**
     * @hidden
     * It used to render toolbar template
     * @default null
     * @aspType string
     */
    toolbarTemplate: string | Function;
    /**
     * Defines how TreeGrid content lines are displayed, determining the visibility of vertical and horizontal lines.
     *
     * * `Both`: Displays both horizontal and vertical grid lines.
     * * `None`: Hides both horizontal and vertical grid lines.
     * * `Horizontal`: Displays only horizontal grid lines.
     * * `Vertical`: Displays only vertical grid lines.
     * * `Default`: Adjusts line visibility based on the theme.
     *
     * @default Syncfusion.EJ2.Grids.GridLine.Default
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.GridLine
     */
    gridLines: GridLine;
    /**
     * `contextMenuItems` defines both built-in and custom context menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Edit` - Edit the current record.
     * * `Delete` - Delete the current record.
     * * `Save` - Save the edited record.
     * * `Cancel` - Cancel the edited state.
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
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property like filterbar, menu filter.
     *
     * @default null
     */
    columnMenuItems: ColumnMenuItem[] | ColumnMenuItemModel[];
    /**
     * The row template that renders customized rows from the given template.
     * By default, TreeGrid renders a table row for every data source item.
     * > * It accepts either [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
     * or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [Row Template](../../treegrid/row) customization.
     *
     * @aspType string
     */
    rowTemplate: string | Function;
    /**
     * `copyHierarchyMode` Defines the copy clipboard types.
     * <br><br>
     * The available built-in items are,
     * * `Parent` - Copy the selected data with parent record.
     * * `Child` - Copy the selected data with child record.
     * * `Both` - Copy the selected data with both parent and child record.
     * * `None` - Copy only the selected record.
     *
     * @default Parent
     */
    copyHierarchyMode: CopyHierarchyType;
    /**
     * Defines the height of TreeGrid rows.
     *
     * @default null
     */
    rowHeight: number;
    /**
     * If `enableAltRow` is set to true, the TreeGrid will render with `e-altrow` CSS class to the alternative tr elements.
     * > Check the [AltRow](../../treegrid/row/#styling-alternate-rows/) to customize the styles of alternative rows.
     *
     * @default true
     */
    enableAltRow: boolean;
    /**
     * Enables or disables the key board interaction of TreeGrid.
     *
     * @hidden
     * @default true
     */
    allowKeyboard: boolean;
    /**
     * If `enableHover` is set to true, the row hover is enabled in the TreeGrid.
     *
     * @default false
     */
    enableHover: boolean;
    /**
     * If `enableAutoFill` is set to true, then the auto fill icon will displayed on cell selection for copy cells.
     * It requires the selection `mode` to be Cell and `cellSelectionMode` to be `Box`.
     *
     * @default false
     */
    enableAutoFill: boolean;
    /**
     * If `enableAdaptiveUI` is set to true, the pop-up UI will become adaptive to small screens,
     * and be used for filtering and other features.
     * ```html
     * <div id='treegrid'></div>
     * <script>
     *  var treegridObj = new TreeGrid({ enableAdaptiveUI: true });
     *  treegridObj.appendTo('#treegrid');
     * </script>
     * ```
     *
     * @default false
     */
    enableAdaptiveUI: boolean;
    /**
     * If `enableImmutableMode`  is set to true, the TreeGrid will reuse old rows if it exists in the new result instead of
     * full refresh while performing the TreeGrid actions.
     *
     * @default false
     */
    enableImmutableMode: boolean;
    /**
     * Defines the scrollable height of the TreeGrid content.
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Defines the TreeGrid width.
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     *  Configures the loading indicator of the Tree Grid. Specifies whether to display spinner or shimmer effect
     *  during the waiting time on any actions (paging, sorting, filtering, CRUD operations) performed in Tree Grid.
     *
     * @default {indicatorType: 'Spinner'}
     */
    loadingIndicator: LoadingIndicatorModel;
    /**
     * Specifies whether to display shimmer effect during scrolling action in virtual scrolling feature.
     * If disabled, spinner is shown instead of shimmer effect.
     *
     * @default true
     */
    enableVirtualMaskRow: boolean;
    /**
     * If `enableVirtualization` set to true, then the TreeGrid will render only the rows visible within the view-port
     * and load subsequent rows on vertical scrolling. This helps to load large dataset in TreeGrid.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * Enables column virtualization in the TreeGrid. When set to `true`, only columns visible within the viewport are rendered.
     * Additional columns are loaded as you horizontally scroll. This is beneficial for rendering large datasets efficiently.
     *
     * @default false
     */
    enableColumnVirtualization: boolean;
    /**
     * Determines whether to sanitize untrusted HTML content in the TreeGrid. If `true`, potentially harmful HTML strings
     * and scripts are sanitized before rendering to protect against XSS attacks.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * Enables infinite scrolling in the TreeGrid. When set to `true`, additional data is loaded as the scrollbar
     * reaches the end. Useful for handling large datasets.
     *
     * @default false
     */
    enableInfiniteScrolling: boolean;
    /**
     * Configures settings for infinite scrolling.
     *
     * @default { enableCache: false, maxBlocks: 5, initialBlocks: 5 }
     */
    infiniteScrollSettings: InfiniteScrollSettingsModel;
    /**
     * Specifies how data is retrieved from the data source for the TreeGrid.
     * The available modes are:
     * * `All`: Retrieve the entire data source.
     * * `Schema`: Retrieve data only for defined columns.
     * * `ExcludeHidden`: Retrieve data only for visible columns in the TreeGrid.
     *
     * @default All
     */
    columnQueryMode: ColumnQueryModeType;
    /**
     * If `allowSelection` is set to true, selection of (highlight row) TreeGrid records by clicking is allowed.
     *
     * @default true
     */
    allowSelection: boolean;
    /**
     * Specifies the index of the row to be selected upon initial rendering.
     * Also retrieves the index of the currently selected row.
     *
     * @default -1
     */
    selectedRowIndex: number;
    /**
     * Configures the selection behavior.
     *
     * @default {mode: 'Row', cellSelectionMode: 'Flow', type: 'Single'}
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Enables exporting the TreeGrid to an Excel file if set to true.
     *
     * > Check the [ExcelExport](../../treegrid/excel-export/) documentation for more details.
     *
     * @default false
     */
    allowExcelExport: boolean;
    /**
     * Enables exporting the TreeGrid to a PDF file if set to true.
     *
     * > Check the [PdfExport](../../treegrid/pdf-export/) documentation for more details.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Allows customization of TreeGrid properties before rendering.
     *
     * @event load
     */
    load: EmitType<Object>;
    /**
     * Triggers while a TreeGrid record is expanding.
     *
     * @event expanding
     */
    expanding: EmitType<RowExpandingEventArgs>;
    /**
     * Triggers after a TreeGrid record is expanded.
     *
     * @event expanded
     */
    expanded: EmitType<RowExpandedEventArgs>;
    /**
     * Triggers while a TreeGrid record is collapsing.
     *
     * @event collapsing
     */
    collapsing: EmitType<RowCollapsingEventArgs>;
    /**
     * Triggers after a TreeGrid record is collapsed.
     *
     * @event collapsed
     */
    collapsed: EmitType<RowCollapsedEventArgs>;
    /**
     * Triggers when a cell is being saved.
     *
     * @event cellSave
     */
    cellSave: EmitType<CellSaveArgs>;
    /**
     * Triggers after a cell is saved.
     *
     * @event cellSaved
     */
    cellSaved: EmitType<CellSaveArgs>;
    /**
     * Triggers when TreeGrid actions like sorting, filtering, paging, etc., start.
     *
     * @event actionBegin
     */
    actionBegin: EmitType<PageEventArgs | FilterEventArgs | SortEventArgs | SearchEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs>;
    /**
     * Triggers when TreeGrid actions like sorting, filtering, paging, etc., are completed.
     *
     * @event actionComplete
     */
    actionComplete: EmitType<PageEventArgs | FilterEventArgs | SortEventArgs | SearchEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs>;
    /**
     * Triggers before a record is edited.
     *
     * @event beginEdit
     */
    beginEdit: EmitType<BeginEditArgs>;
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
     * Triggers before records are cancelled in batch mode.
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
     * Triggers when a cell is being edited.
     *
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Triggers when any TreeGrid action fails to achieve the desired results.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Triggers when the data source is populated in the TreeGrid.
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when data in the TreeGrid is added, deleted, or updated.
     * Invoke the done method from the argument to start rendering after an edit operation.
     *
     * @event dataSourceChanged
     * @deprecated
     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Triggers when TreeGrid actions such as sorting, paging, etc., are completed.
     * The current view data and total record count should be assigned to the dataSource based on the action performed.
     *
     * @event dataStateChange
     * @deprecated
     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * Triggers when a record is double-clicked.
     *
     * @event recordDoubleClick
     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * Triggered every time a request is made to access row information, element, or data.
     * This event is triggered before the row element is appended to the TreeGrid element.
     *
     * @event rowDataBound
     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Triggers after a detail row expands. This event triggers initially during the first expand.
     *
     * @event detailDataBound
     */
    detailDataBound: EmitType<DetailDataBoundEventArgs>;
    /**
     * Triggered every time a request is made to access cell information, element, or data.
     * This event is triggered before the cell element is appended to the TreeGrid element.
     *
     * @event queryCellInfo
     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
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
     * Triggers before the selected row is deselected.
     *
     * @event rowDeselecting
     * @deprecated
     */
    rowDeselecting: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers when a selected row is deselected.
     *
     * @event rowDeselected
     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Triggered for accessing header information.
     *
     * @event headerCellInfo
     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * Triggers before any cell selection occurs.
     *
     * @event cellSelecting
     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
    /**
     * Triggers before the column menu opens.
     *
     * @event columnMenuOpen
     * @deprecated
     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Triggers when there is a click on the column menu.
     *
     * @event columnMenuClick
     */
    columnMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers after a cell is selected.
     *
     * @event cellSelected
     */
    cellSelected: EmitType<CellSelectEventArgs>;
    /**
     * Triggers before a selected cell is deselected.
     *
     * @event cellDeselecting
     * @deprecated
     */
    cellDeselecting: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when a selected cell is deselected.
     *
     * @event cellDeselected
     * @deprecated
     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when column resizing starts.
     *
     * @event resizeStart
     * @deprecated
     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers during column resizing.
     *
     * @event resizing
     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Triggers when column resizing ends.
     *
     * @event resizeStop
     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when column header dragging begins.
     *
     * @event columnDragStart
     */
    columnDragStart: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers continuously while the column header is being dragged.
     *
     * @event columnDrag
     */
    columnDrag: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when a column header is dropped onto the target column.
     *
     * @event columnDrop
     */
    columnDrop: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when the state of a checkbox changes in a checkbox column.
     *
     * @event checkboxChange
     */
    checkboxChange: EmitType<CheckBoxChangeEventArgs>;
    /**
     * Triggers after the print action has been completed.
     *
     * @event printComplete
     */
    printComplete: EmitType<PrintEventArgs>;
    /**
     * Triggers before the print action begins.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<PrintEventArgs>;
    /**
     * Triggers when a toolbar item is clicked.
     *
     * @event toolbarClick
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers before data is bound to the TreeGrid.
     *
     * @event beforeDataBound
     */
    beforeDataBound: EmitType<BeforeDataBoundArgs>;
    /**
     * Triggers before the context menu opens.
     *
     * @event contextMenuOpen
     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when an item in the context menu is clicked.
     *
     * @event contextMenuClick
     */
    contextMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers before the TreeGrid copy action is initiated.
     *
     * @event beforeCopy
     */
    beforeCopy: EmitType<BeforeCopyEventArgs>;
    /**
     * Triggers before the TreeGrid paste action is initiated.
     *
     * @event beforePaste
     */
    beforePaste: EmitType<BeforePasteEventArgs>;
    /**
     * Triggers continuously while row elements are being dragged.
     *
     * @event rowDrag
     */
    rowDrag: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row element dragging starts.
     *
     * @event rowDragStart
     */
    rowDragStart: EmitType<RowDragEventArgs>;
    /**
     * Triggers just before the row element dragging begins.
     *
     * @event rowDragStartHelper
     */
    rowDragStartHelper: EmitType<RowDragEventArgs>;
    /**
     * Triggers when a row element is dropped onto the target row.
     *
     * @event rowDrop
     */
    rowDrop: EmitType<RowDragEventArgs>;
    /**
     * Triggers before each cell is exported to a PDF document, allowing customization of cells.
     *
     * @event pdfQueryCellInfo
     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Triggers before each header cell is exported to a PDF document, allowing customization of cells.
     *
     * @event pdfHeaderQueryCellInfo
     */
    pdfHeaderQueryCellInfo: EmitType<PdfHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before each cell is exported to an Excel file, allowing customization of cells.
     *
     * @event excelQueryCellInfo
     */
    excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    /**
     * Triggers before each header cell is exported to an Excel file, allowing customization of cells.
     *
     * @event excelHeaderQueryCellInfo
     */
    excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before TreeGrid data is exported to an Excel file.
     *
     * @event beforeExcelExport
     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Triggers after TreeGrid data is exported to an Excel file.
     *
     * @event excelExportComplete
     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
    /**
     * Triggers before TreeGrid data is exported to a PDF document.
     *
     * @event beforePdfExport
     */
    beforePdfExport: EmitType<Object>;
    /**
     * Triggers after TreeGrid data is exported to a PDF document.
     *
     * @event pdfExportComplete
     */
    pdfExportComplete: EmitType<PdfExportCompleteArgs>;
    /**
     * Exports the TreeGrid data to an Excel file (.xlsx).
     *
     * @param {ExcelExportProperties | TreeGridExcelExportProperties} excelExportProperties - The properties used to configure the Excel export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {workbook} workbook - The workbook instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    excelExport(excelExportProperties?: ExcelExportProperties | TreeGridExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Exports the TreeGrid data to a CSV file.
     *
     * @param {ExcelExportProperties} excelExportProperties - The properties used to configure the CSV export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {workbook} workbook - The workbook instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Exports the TreeGrid data to a PDF document.
     *
     * @param {PdfExportProperties | TreeGridPdfExportProperties} pdfExportProperties - The properties used to configure the PDF export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {Object} pdfDoc - The PDF document instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    pdfExport(pdfExportProperties?: PdfExportProperties | TreeGridPdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    /**
     * Sends a POST request to export the TreeGrid to an Excel file on the server side.
     *
     * @param {string} url - The URL for the server-side Excel export action.
     * @returns {void}
     */
    serverExcelExport(url: string): void;
    /**
     * Sends a POST request to export the TreeGrid to a PDF document on the server side.
     *
     * @param {string} url - The URL for the server-side PDF export action.
     * @returns {void}
     */
    serverPdfExport(url: string): void;
    /**
     * Sends a POST request to export the TreeGrid to a CSV file on the server side.
     *
     * @param {string} url - The URL for the server-side CSV export action.
     * @returns {void}
     */
    serverCsvExport(url: string): void;
    /**
     * Exports the TreeGrid data to the specified URL using a POST request.
     *
     * @param {string} url - Defines exporting url
     * @returns {void}
     */
    private exportTreeGrid;
    /**
     * Sets the header text and other properties for an array of columns based on specified criteria.
     *
     * @param {Column[]} columns - Defines array of columns
     * @param {string[]} include - Defines array of sting
     * @returns {Column[]} returns array of columns
     */
    private setHeaderText;
    /**
     * Retrieves the appropriate format string from the given format options.
     *
     * @param {string | NumberFormatOptions | DateFormatOptions} format - The format options to retrieve the format string from.
     * @returns {string} The format string extracted from the provided format options.
     */
    private getFormat;
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns TreeGrid module name
     */
    protected getModuleName(): string;
    /**
     * For internal use only - Initialize the event handler;
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Sorts a column with the specified options.
     *
     * @param {string} columnName - The name of the column to be sorted.
     * @param {SortDirection} direction - The direction of the sorting operation.
     * @param {boolean} isMultiSort - Specifies whether previous sorted columns should be maintained during sorting.
     * @returns {void}
     */
    sortByColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    /**
     * Clears all the sorted columns in the TreeGrid.
     *
     * @returns {void}
     */
    clearSorting(): void;
    /**
     * Removes the sorted state from a column specified by the field name.
     *
     * @param {string} field - The field name of the column from which the sort state should be removed.
     * @returns {void}
     * @hidden
     */
    removeSortColumn(field: string): void;
    /**
     * Searches for TreeGrid records using a specified search string.
     * Customize the search behavior through the [searchSettings](./#searchsettings/).
     *
     * @param {string} searchString - The string used as the search key.
     * @returns {void}
     */
    search(searchString: string): void;
    /**
     * Adjusts column widths to fit their content, ensuring content is displayed without wrapping or truncation.
     * - Hidden columns are ignored by this method.
     * - Use the `autoFitColumns` method during the `dataBound` event for initial rendering.
     *
     * @param {string | string[]} fieldNames - The name(s) of the column(s) to be auto-fitted.
     * @returns {void}
     */
    autoFitColumns(fieldNames?: string | string[]): void;
    /**
     * Reorders TreeGrid columns by specifying their field names.
     *
     * @param {string | string[]} fromFName - The field name(s) of the column(s) to be moved.
     * @param {string} toFName - The destination field name to place the moved columns.
     * @returns {void}
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    private TreeGridLocale;
    /**
     * Prints all the pages of the TreeGrid and hides the pager by default.
     * Customize print options using the [printMode](./#printmode).
     *
     * @returns {void}
     */
    print(): void;
    private treeGridkeyActionHandler;
    private findnextRowElement;
    private findPreviousRowElement;
    private initProperties;
    /**
     * Attaches event handlers to the necessary elements during the component's initialization.
     *
     * @hidden
     * @returns {void}
     */
    wireEvents(): void;
    /**
     * Provides a list of the modules that are required for rendering the TreeGrid component.
     *
     * This method is essential for ensuring that all dependent modules are loaded and available
     * during the component's lifecycle, enabling full functionality.
     *
     * @returns {ModuleDeclaration[]} - Returns an array of the required TreeGrid module declarations.
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    private resizeCheck;
    extendRequiredModules(modules: ModuleDeclaration[]): void;
    private isCommandColumn;
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    unwireEvents(): void;
    /**
     * Logs tree grid error message on console
     *
     * @param {string | string[]} types - Tree Grid error type
     * @param {object} args - Error details
     * @hidden
     * @private
     * @returns {void}
     */
    log(types: string | string[], args?: Object): void;
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    private actionFailureHandler;
    private refreshToolbarItems;
    private afterGridRender;
    private convertTreeData;
    private bindGridProperties;
    private triggerEvents;
    private IsExpandCollapseClicked;
    private bindGridEvents;
    private lastRowBorder;
    private isPixelHeight;
    private extendedGridDataBoundEvent;
    private objectEqualityChecker;
    private bindCallBackEvents;
    private extendedGridEditEvents;
    private updateRowTemplate;
    private bindedDataSource;
    private extendedGridActionEvents;
    private extendedGridEvents;
    private bindGridDragEvents;
    /**
     * Renders TreeGrid component
     *
     * @private
     * @returns {void}
     */
    protected loadGrid(): void;
    /**
     * AutoGenerate TreeGrid columns from first record
     *
     * @hidden
     * @returns {void}
     */
    private autoGenerateColumns;
    private getGridEditSettings;
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - returns context menu items
     */
    private getContextMenu;
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - Returns toolbar items
     */
    private getGridToolbar;
    private getGridColumns;
    private lastRowCellBorderUpdated;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeGridModel} newProp - properties details which has to be modified
     * @hidden
     * @returns {void}
     */
    onPropertyChanged(newProp: TreeGridModel): void;
    private updateTreeColumnTextAlign;
    /**
     * Destroys the TreeGrid component by detaching event handlers,
     * removing attributes and classes, and clearing the component's DOM elements.
     *
     * This method ensures that all resources used by the TreeGrid are properly released
     * and the component is cleaned up from the DOM to prevent memory leaks.
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
    /**
     * Updates the TreeGrid model and ensures that the underlying Grid's data model is in sync with TreeGrid.
     * This method binds current data and settings to the TreeGrid.
     *
     * @method dataBind
     * @returns {void}
     * @private
     */
    dataBind(): void;
    /**
     * Retrieves the properties of the TreeGrid that should be retained and persisted between sessions.
     *
     * The method ensures that user preferences and important settings like paging, sorting, filtering,
     * column configurations, etc., are preserved and can be restored when the component is re-initialized.
     *
     * @returns {string} - Returns persist properties details
     * @hidden
     */
    getPersistData(): string;
    private ignoreInArrays;
    private ignoreInColumn;
    private mouseClickHandler;
    /**
     * Retrieves all the TreeGrid row elements.
     *
     * This method is useful for accessing the HTML representation of the rows for further manipulation or inspection.
     *
     * @returns {HTMLTableRowElement[]} - Returns row elements collection
     */
    getRows(): HTMLTableRowElement[];
    /**
     * Obtains the pager element of the TreeGrid.
     *
     * The pager enables navigation between pages when the TreeGrid displays paginated data.
     *
     * @returns {Element} - Returns pager element
     */
    getPager(): Element;
    /**
     * Adds a new record to the TreeGrid at the specified position or default location.
     *
     * @param {Object} data - Object containing the data for the new record. If omitted, an empty row is added.
     * @param {number} index - The index at which the new row should be added.
     * @param {RowPosition} position - Specifies the position of the new row (e.g., before, after or child).
     *
     * > Requires `editSettings.allowAdding` to be true.
     *
     * @returns {void}
     */
    addRecord(data?: Object, index?: number, position?: RowPosition): void;
    /**
     * Cancels the current edit operation on the TreeGrid.
     *
     * This method discards changes made to the row and exits the edit mode without saving.
     *
     * @returns {void}
     */
    closeEdit(): void;
    /**
     * Saves the current cell value changes without committing to the data source.
     *
     * This operation persists the changes in the UI but not in the underlying data model.
     *
     * @returns {void}
     */
    saveCell(): void;
    /**
     * Updates the value of a specific cell directly, bypassing the edit mode.
     *
     * This method provides a quick way to update the UI and data without user interaction.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     * @returns {void}
     */
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    /**
     * Updates a specific row with given values directly, skipping the edit state.
     *
     * This method allows for bulk updates of row data programmatically.
     *
     * @param {number} index - The index of the row to update.
     * @param {Object} data - The data object containing updated field values.
     * @returns {void}
     */
    updateRow(index: number, data: Object): void;
    /**
     * Deletes a record based on specified criteria or the selected record if none specified.
     *
     * @param {string} fieldName - The name of the primary key field.
     * @param {Object} data - The data object representing the record to delete.
     * @returns {void}
     *
     * > Requires `editSettings.allowDeleting` to be true.
     */
    deleteRecord(fieldName?: string, data?: Object): void;
    /**
     * Initiates editing for a specific row using its HTML element.
     *
     * This allows for manual control of which row enters edit mode through the UI.
     *
     * @param {HTMLTableRowElement} row - The table row element to enter into edit mode.
     * @returns {void}
     */
    startEdit(row?: HTMLTableRowElement): void;
    /**
     * Begins editing of a specific cell using row and field indices.
     *
     * Customers can programmatically specify which cell to edit without user input.
     *
     * @param {number} rowIndex - The index of the row containing the cell.
     * @param {string} field - The field name of the cell to edit.
     * @returns {void}
     */
    editCell(rowIndex?: number, field?: string): void;
    /**
     * Enables or disables specified ToolBar items within the TreeGrid.
     *
     * This facilitates dynamic control of toolbar actions based on application logic.
     *
     * @param {string[]} items - Array of ToolBar item IDs to enable or disable.
     * @param {boolean} isEnable - Boolean flag to determine whether to enable (true) or disable (false) items.
     * @returns {void}
     */
    enableToolbarItems(items: string[], isEnable: boolean): void;
    /**
     * Commits the edits made to a record in edit mode, updating the data source.
     *
     * Use this method to finalize changes for rows in edit mode, ensuring persistence.
     *
     * @returns {void}
     */
    endEdit(): void;
    /**
     * Displays the column chooser at a specified screen position.
     *
     * Useful for customizing the visibility of columns interactively via the UI.
     *
     * @param {number} x - The X-axis position of the column chooser.
     * @param {number} y - The Y-axis position of the column chooser.
     * @returns {void}
     */
    openColumnChooser(x?: number, y?: number): void;
    /**
     * Deletes a visible row from the TreeGrid using its HTML element.
     *
     * Apply this method when handling row deletions through DOM manipulations.
     *
     * @param {HTMLTableRowElement} tr - The table row element to remove.
     * @returns {void}
     */
    deleteRow(tr: HTMLTableRowElement): void;
    /**
     * Retrieves the primary key field names used in the TreeGrid.
     *
     * This information is crucial for identifying and manipulating unique rows.
     *
     * @returns {string[]} - Returns an array of primary key field names.
     */
    getPrimaryKeyFieldNames(): string[];
    /**
     * Updates the value of a specific cell using its primary key for identification.
     *
     * Useful for targeted updates that leverage unique identifiers to ensure accuracy.
     *
     * @param {string| number} key - The primary key value of the row containing the cell.
     * @param {string} field - The field name of the cell to update.
     * @param {string | number | boolean | Date} value - The new value to assign to the specified cell.
     * @returns {void}
     */
    setCellValue(key: string | number, field: string, value: string | number | boolean | Date): void;
    /**
     * Updates the data for a specific row identified by its primary key and refreshes the display.
     *
     * Important for keeping the displayed data consistent with the source database or dataset.
     *
     * @param {string| number} key - The primary key value of the row to update.
     * @param {Object} rowData - The new data to apply to the row.
     * @returns {void}
     */
    setRowData(key: string | number, rowData?: ITreeData): void;
    /**
     * Navigates to a specified page number within the TreeGrid pagination.
     *
     * This can be used to programmatically change the page being viewed,
     * allowing for scripted navigation through data.
     *
     * @param {number} pageNo - The page number to navigate to. Must be within valid page range.
     * @returns {void}
     */
    goToPage(pageNo: number): void;
    /**
     * Updates the external message displayed within the pager component.
     *
     * This is useful for showing custom messages or additional information
     * related to the data set or pagination status.
     *
     * @param {string} message - The custom message to display in the pager.
     * @returns {void}
     */
    updateExternalMessage(message: string): void;
    /**
     * Retrieves a cell element based on its row and column indices in the TreeGrid.
     *
     * This method is helpful for accessing cell-level elements for custom
     * operations or styling.
     *
     * @param {number} rowIndex - The index of the row containing the cell.
     * @param {number} columnIndex - The index of the column containing the cell.
     * @returns {Element} - Returns the HTML element of the specified cell.
     */
    getCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Retrieves a column object by the column's field name.
     *
     * This is typically used for obtaining the details of a column for
     * configuration or data manipulation purposes.
     *
     * @param {string} field - The field name of the column.
     * @returns {Column} - Returns the column object corresponding to the field.
     */
    getColumnByField(field: string): Column;
    /**
     * Fetches a column object using the column's unique identifier (UID).
     *
     * Useful in scenarios where columns do not have unique field names but
     * are uniquely identifiable via UID.
     *
     * @param {string} uid - The unique identifier for the column.
     * @returns {Column} - Returns the column object for the given UID.
     */
    getColumnByUid(uid: string): Column;
    /**
     * Retrieves the names of all column fields in the TreeGrid.
     *
     * This method provides a list of field names useful for dynamic operations
     * or configuration where fields need to be enumerated or manipulated.
     *
     * @returns {string[]} - Returns an array of column field names.
     */
    getColumnFieldNames(): string[];
    /**
     * Retrieves the footer content element of the TreeGrid, usually for styling or custom manipulation.
     *
     * This can be used to access the footer for adding custom functionality
     * or styling purposes to enhance user interaction at the bottom of the grid.
     *
     * @returns {Element} - Returns the footer content HTML element.
     */
    getFooterContent(): Element;
    /**
     * Acquires the footer table element of the TreeGrid for layout management.
     *
     * Useful for manipulating the table's structure or style beneath the grid content.
     *
     * @returns {Element} - Returns the footer table HTML element.
     */
    getFooterContentTable(): Element;
    /**
     * Shows one or more columns based on the specified column names.
     *
     * This is useful for dynamically adjusting the visibility of columns
     * based on user actions or application logic.
     *
     * @param {string|string[]} keys - A single column name or an array of column names to show.
     * @param {string} showBy - Key to determine visibility either as field name or header text.
     * @returns {void}
     */
    showColumns(keys: string | string[], showBy?: string): void;
    /**
     * Hides one or more columns based on the specified column names.
     *
     * Utilized to dynamically reduce the visibility of columns based on
     * user roles or preferences.
     *
     * @param {string|string[]} keys - A single column name or an array of column names to hide.
     * @param {string} hideBy - Key to evaluate columns either as field name or header text.
     * @returns {void}
     */
    hideColumns(keys: string | string[], hideBy?: string): void;
    /**
     * Retrieves a column header element based on the field name of the column.
     *
     * This method helps to directly manipulate headers, such as applying custom styles.
     *
     * @param {string} field - The field name of the desired column.
     * @returns {Element} - Returns the HTML element of the column header.
     */
    getColumnHeaderByField(field: string): Element;
    /**
     * Acquires the column header element using the column's index.
     *
     * Suitable for situations where direct column index is available
     * and header access is needed for operations.
     *
     * @param {number} index - The index of the column.
     * @returns {Element} - Returns the HTML element of the specified column header.
     */
    getColumnHeaderByIndex(index: number): Element;
    /**
     * Retrieves a column header element utilizing the column's UID.
     *
     * Useful for precision access to header elements when UIDs are used
     * uniquely to manage column identities.
     *
     * @param {string} uid - The UID of the column.
     * @returns {Element} - Returns the HTML element of the column header.
     */
    getColumnHeaderByUid(uid: string): Element;
    /**
     * Determines the column index by the specified field name.
     *
     * Helpful in converting field names to indices for operations that require
     * numeric input for array or collection indexing.
     *
     * @param {string} field - The field name of the column.
     * @returns {number} - Returns the index of the column.
     */
    getColumnIndexByField(field: string): number;
    private getVirtualColIndexByUid;
    /**
     * Determines the column index based on the unique identifier (UID).
     *
     * This can be crucial in scenarios that involve dynamic column management
     * where UID provides an accurate reference.
     *
     * @param {string} uid - The UID of the column.
     * @returns {number} - Returns the column index.
     */
    getColumnIndexByUid(uid: string): number;
    /**
     * Fetches a collection of columns from the TreeGrid optionally refreshing the column model.
     *
     * Use this method to retrieve and optionally refresh the list of columns
     * to ensure up-to-date configurations and settings.
     *
     * @param {boolean} isRefresh - Determines whether to refresh the grid's column model.
     * @returns {Column[]} - Returns an array of TreeGrid column objects.
     */
    getColumns(isRefresh?: boolean): Column[];
    private updateColumnModel;
    private updateColumnsWidth;
    /**
     * Retrieves the main content area of the TreeGrid.
     *
     * This method allows access to the main content DIV, which can
     * be used for layout adjustments or adding custom elements.
     *
     * @returns {Element} - Returns the TreeGrid content HTML element.
     */
    getContent(): Element;
    private mergePersistTreeGridData;
    private mergeColumns;
    private setFrozenCount;
    private splitFrozenCount;
    private isFrozenGrid;
    private updateTreeGridModel;
    /**
     * Retrieves the content table element of the TreeGrid.
     *
     * This table contains the main data display area, allowing for
     * interaction and data manipulation directly within the TreeGrid.
     *
     * @returns {Element} - Returns the HTML element representing the content table.
     */
    getContentTable(): Element;
    /**
     * Obtains all data row elements from the TreeGrid, excluding summary rows.
     *
     * Provides a way to access the visual representation of data for purposes
     * like custom formatting or event binding.
     *
     * @returns {Element[]} - Returns an array of data row elements.
     */
    getDataRows(): Element[];
    /**
     * Retrieves the current set of records that are visible in the TreeGrid view.
     *
     * This method excludes any summary rows to focus on the main data set
     * currently being viewed by the user.
     *
     * @returns {Object[]} - Returns an array of the current view records.
     * @isGenericType true
     */
    getCurrentViewRecords(): Object[];
    /**
     * Collects data changes (added, edited, and deleted) that have not been saved in batch mode.
     *
     * This allows you to view pending changes awaiting a commit to the data source.
     *
     * @returns {Object} - Returns an object detailing batch changes.
     */
    getBatchChanges(): Object;
    /**
     * Retrieves the header content element of the TreeGrid.
     *
     * Mainly used for interacting with the header section, which includes
     * column headers and any applied header styling or events.
     *
     * @returns {Element} - Returns the HTML element for header content.
     */
    getHeaderContent(): Element;
    /**
     * Retrieves the header table element of the TreeGrid.
     *
     * This method is useful for direct access to the table structure
     * where column headers are defined.
     *
     * @returns {Element} - Returns the HTML element for the header table.
     */
    getHeaderTable(): Element;
    /**
     * Fetches a specific row element based on its index in the TreeGrid.
     *
     * This provides a way to directly access and manipulate a row using its index.
     *
     * @param {number} index - The index of the desired row.
     * @returns {Element} - Returns the HTML element of the specified row.
     */
    getRowByIndex(index: number): Element;
    /**
     * Provides detailed information about a row based on a specified target element.
     *
     * Integral for retrieving metadata such as row index or data object
     * when working with events or complex tree structures.
     *
     * @param {Element | EventTarget} target - The target element or event triggering the request.
     * @returns {RowInfo} - Returns an object containing row information.
     */
    getRowInfo(target: Element | EventTarget): RowInfo;
    /**
     * Finds the unique identifier (UID) for a column based on its field name.
     *
     * UIDs are essential for precise identification and manipulation within complex grids.
     *
     * @param {string} field - The field name of the column.
     * @returns {string} - Returns the unique identifier for the specified column.
     */
    getUidByColumnField(field: string): string;
    /**
     * Retrieves all the columns that are currently set to be visible within the TreeGrid.
     *
     * Helps in understanding the user's current view and can be used to dynamically
     * adjust the visible columns.
     *
     * @returns {Column[]} - Returns an array of visible column objects.
     */
    getVisibleColumns(): Column[];
    /**
     * Displays a loading spinner overlay across the TreeGrid for any data action or long-running process.
     *
     * This can be manually invoked to indicate processing, enhancing user experience by providing feedback.
     *
     * @returns {void}
     */
    showSpinner(): void;
    /**
     * Hides a manually shown loading spinner overlay from the TreeGrid.
     *
     * Ensures that any long-running process indication is removed after completion
     * to manage user interface aesthetics.
     *
     * @returns {void}
     */
    hideSpinner(): void;
    /**
     * Refreshes the visual appearance and data of the TreeGrid, updating header and content.
     *
     * This is crucial for synchronizing the displayed data with the underlying data source,
     * ensuring the view reflects current data.
     *
     * @returns {void}
     */
    refresh(): void;
    /**
     * Retrieves the records associated with rows that have their checkboxes checked.
     *
     * Facilitates operations that require information about specifically selected or
     * interacted rows within the grid.
     *
     * @returns {Object[]} - Returns an array of checked row data objects.
     * @isGenericType true
     */
    getCheckedRecords(): Object[];
    /**
     * Retrieves currently visible records according to the TreeGrid's visual state.
     *
     * It considers row expansion and collapse states to return only those records
     * that a user can currently interact with.
     *
     * @returns {Object[]} - Returns visible records reflecting the TreeGrid's current view.
     * @isGenericType true
     */
    getVisibleRecords(): Object[];
    /**
     * Retrieves the indices of rows that have their checkboxes checked.
     *
     * This can assist in programatically assessing which rows have been selected
     * by checkbox interaction for further processing.
     *
     * @returns {number[]} - Returns an array of indices corresponding to checked rows.
     */
    getCheckedRowIndexes(): number[];
    /**
     * Selects rows in the TreeGrid using row indices, checking their associated checkboxes.
     *
     * This method provides automation for selecting or highlighting specific rows,
     * useful in scenarios needing pre-selection or default selections.
     *
     * @param {number[]} indexes - An array of row indices to be marked as selected.
     * @returns {void}
     */
    selectCheckboxes(indexes: number[]): void;
    /**
     * Updates and refreshes the TreeGrid's column definitions and layout.
     *
     * Ensures that the latest column settings are displayed, either refreshing the UI
     * or adjusting internal configurations to match current data or configuration updates.
     *
     * @param {boolean} refreshUI - A flag indicating whether the DOM should be updated.
     * @returns {void}
     */
    refreshColumns(refreshUI?: boolean): void;
    private getTreeColumn;
    /**
     * Refreshes the header section of the TreeGrid to reflect any structural or data changes.
     *
     * This method is useful when there are dynamic updates or layout adjustments
     * needed in the header portion to ensure it aligns with current grid data or settings.
     *
     * @returns {void}
     */
    refreshHeader(): void;
    /**
     * Expands or collapse child records
     *
     * @param {HTMLElement} target - Expand collapse icon cell as target element
     * @returns {void}
     * @hidden
     */
    private expandCollapseRequest;
    /**
     * Expands the specified parent row within the TreeGrid to reveal its nested data.
     *
     * This method is useful for programmatically expanding rows to display their
     * hierarchical children, providing detailed views for nested data structures.
     *
     * @param {HTMLTableRowElement} row - The table row element that should be expanded.
     * @param {Object} record - Optional. Represents the data record associated with the row to be expanded.
     * @param {Object} key - Optional. The primary key value that uniquely identifies the record.
     * @param {number} level - Optional. Indicates the hierarchical level of the record within the TreeGrid.
     * @returns {void}
     */
    expandRow(row: HTMLTableRowElement, record?: Object, key?: Object, level?: number): void;
    private expandRows;
    private expandCollapseAllChildren;
    private getCollapseExpandRecords;
    /**
     * Collapses the specified parent row in the TreeGrid.
     *
     * This method collapses the row associated with the provided HTMLTableRowElement,
     * hiding any of its displayed child rows. It is typically used to manage the
     * visibility of hierarchical data within a tree structure.
     *
     * @param {HTMLTableRowElement} row - The HTMLTableRowElement representing the parent row
     *                                    whose child rows are to be collapsed.
     * @param {Object} record - (Optional) The data record associated with the row being collapsed.
     *                            This can be used to access or manipulate the underlying data
     *                            when collapsing the row.
     * @param {Object} key - (Optional) The primary key value of the record. It can be used to identify
     *                         the target record uniquely when collapsing the row, especially in cases
     *                         where the row or record data needs to be referenced or logged.
     * @returns {void}
     */
    collapseRow(row: HTMLTableRowElement, record?: Object, key?: Object): void;
    private collapseRows;
    private updateExpandStateMapping;
    /**
     * Expands all the records at the specified hierarchical level within the TreeGrid.
     *
     * This method is useful for visually expanding data at a certain depth, making
     * all parent rows visible at the given level and their child rows accessible.
     *
     * @param {number} level - The hierarchical level at which parent rows should be expanded.
     * @returns {void}
     */
    expandAtLevel(level: number): void;
    /**
     * Expands a specific record identified by the provided primary key value.
     *
     * This method is useful for expanding particular node in the TreeGrid when
     * the parent rows need to be targeted individually by their unique key.
     *
     * @param {Object} key - The primary key value of the record to be expanded.
     * @returns {void}
     */
    expandByKey(key: Object): void;
    private expandAction;
    private getRecordDetails;
    /**
     * Collapses all the records at the specified hierarchical level within the TreeGrid.
     *
     * This function helps in hiding child rows for all parent nodes at a given level,
     * effectively reducing the visible depth of the hierarchical structure.
     *
     * @param {number} level - The hierarchical level at which parent rows should be collapsed.
     * @returns {void}
     */
    collapseAtLevel(level: number): void;
    /**
     * Collapses a specific record identified by the provided primary key value.
     *
     * This method is useful for collapsing particular node in the TreeGrid when
     * the parent rows need to be targeted individually by their unique key.
     *
     * @param {Object} key - The primary key value of the record to be collapsed.
     * @returns {void}
     */
    collapseByKey(key: Object): void;
    private expandCollapseActionByKey;
    private collapseAction;
    /**
     * Expands all rows in the TreeGrid, making the full hierarchy visible.
     *
     * This method should be used with caution on large datasets, as it makes
     * all nodes and their child rows visible, which might affect performance.
     *
     * @returns {void}
     */
    expandAll(): void;
    /**
     * Collapses all rows in the TreeGrid, hiding all child rows and leaving only parent nodes visible.
     *
     * This method can be used to quickly minimize the view to only top-level data,
     * which is helpful for summarizing or performing broad overviews of the dataset.
     *
     * @returns {void}
     */
    collapseAll(): void;
    private expandCollapseAll;
    private expandCollapse;
    private updateChildOnDemand;
    private remoteExpand;
    private localExpand;
    private toggleRowVisibility;
    private updateAltRow;
    private treeColumnRowTemplate;
    private collapseRemoteChild;
    /**
     * Method to sanitize html element
     *
     * @param {any} value - Specifies the html value to sanitize
     * @returns {any} Returns the sanitized html value
     * @hidden
     */
    private sanitize;
    /**
     * @hidden
     * @returns {void}
     */
    addListener(): void;
    private updateResultModel;
    /**
     * @hidden
     * @returns {void}
     */
    private removeListener;
    /**
     * Filters the TreeGrid rows based on a specified column and filter criteria.
     *
     * This method allows for dynamic filtering against column data using various
     * operators and values, supporting case-sensitive filtering and accent sensitivity.
     *
     * @param {string} fieldName - The name of the column to apply the filter on.
     * @param {string} filterOperator - The operator used to perform the filter (e.g., 'equals', 'startswith').
     * @param {string | number | Date | boolean } filterValue - The value to filter against.
     * @param {string} predicate - The logical operator ('AND'/'OR') to combine this filter with others.
     * @param {boolean} matchCase - If true, the filter performs a case-sensitive match.
     * @param {boolean} ignoreAccent - If true, the filter ignores diacritical marks.
     * @param {string} actualFilterValue - The original value used for filtering, useful for distinguishing displayed and actual values.
     * @param {string} actualOperator - The actual operator that is applied when different from the displayed operator.
     * @returns {void}
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean | number[] | string[] | Date[] | boolean[], predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: string, actualOperator?: string): void;
    /**
     * Clears all filters applied to the TreeGrid, restoring the view to show all records.
     *
     * This method is useful for resetting the grid to its unfiltered state.
     *
     * @returns {void}
     */
    clearFiltering(): void;
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
     * Selects a row in the TreeGrid by its index.
     *
     * Use this method to highlight a specific row; useful for programmatically navigating data.
     *
     * @param {number} index - Index of the row to select.
     * @param {boolean} isToggle - If true, toggles the selection state of the row.
     * @returns {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects multiple rows in the TreeGrid given an array of row indexes.
     *
     * Useful for batch operations where multiple row selections are necessary.
     *
     * @param {number[]} rowIndexes - Array of row index numbers to select.
     * @returns {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Deselects all selected rows and cells within the TreeGrid.
     *
     * Resets the selection state of the grid, which is useful after bulk operations.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * Copies the data of selected rows or cells to the clipboard.
     *
     * This method supports including headers for better context when pasting elsewhere.
     *
     * @param {boolean} withHeader - (Optional) If true, includes column headers in the copied data.
     * @returns {void}
     */
    copy(withHeader?: boolean): void;
    /**
     * Pastes data into the selected cells from the clipboard.
     *
     * Automatically places the pasted data starting from the specified indices.
     *
     * @param {string} data - The clipboard data to paste.
     * @param {number} rowIndex - The starting row index for pasting.
     * @param {number} colIndex - The starting column index for pasting.
     * @returns {void}
     */
    paste(data: string, rowIndex: number, colIndex: number): void;
    /**
     * Selects a cell by its index position in the TreeGrid.
     *
     * Useful for navigating or highlighting specific data cells within the grid.
     *
     * @param {IIndex} cellIndex - An object specifying the row and column indexes.
     * @param {boolean} isToggle - (Optional) If true, toggles the selection state of the cell.
     * @returns {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Retrieves the currently selected rows.
     *
     * Useful for obtaining the selected data elements for downstream processing.
     *
     * @returns {Element[]} - An array of Element objects representing the selected rows.
     */
    getSelectedRows(): Element[];
    /**
     * Gets a movable table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} - Returns movable cell element from the indexes passed
     *
     * @deprecated This method is deprecated. Use getCellFromIndex method instead.
     */
    getMovableCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets all the TreeGrid's movable table data rows.
     *
     * @returns {Element[]} - Returns element collection of movable rows
     *
     * @deprecated This method is deprecated. Use getDataRows method instead.
     */
    getMovableDataRows(): Element[];
    /**
     * Gets a movable tables row by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} - Returns movable row based on index passed
     *
     * @deprecated This method is deprecated. Use getRowByIndex method instead.
     */
    getMovableRowByIndex(index: number): Element;
    /**
     * Gets the TreeGrid's movable content rows from frozen treegrid.
     *
     * @returns {Element[]}: Returns movable row element
     * @deprecated This method is deprecated. Use getRows method instead.
     */
    getMovableRows(): Element[];
    /**
     * Gets a frozen right tables row element by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} returns the element
     *
     * @deprecated This method is deprecated. Use getRowByIndex method instead.
     */
    getFrozenRightRowByIndex(index: number): Element;
    /**
     * Gets the Tree Grid's frozen right content rows from frozen Tree Grid.
     *
     * @returns {Element[]} returns the element
     *
     * @deprecated This method is deprecated. Use getRows method instead.
     */
    getFrozenRightRows(): Element[];
    /**
     * Gets all the Tree Grid's frozen right table data rows.
     *
     * @returns {Element[]} Returns the Element
     *
     * @deprecated This method is deprecated. Use getDataRows method instead.
     */
    getFrozenRightDataRows(): Element[];
    /**
     * Gets a frozen right table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getCellFromIndex method instead.
     */
    getFrozenRightCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a frozen left column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    getFrozenLeftColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a frozen right column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    getFrozenRightColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a movable column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    getMovableColumnHeaderByIndex(index: number): Element;
    /**
     * @hidden
     * @returns {number} Returns the movable column count
     */
    getMovableColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Left column
     */
    getFrozenLeftColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Right column count
     */
    getFrozenRightColumnsCount(): number;
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenLeftColumns(): Column[];
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenRightColumns(): Column[];
    /**
     * @hidden
     * @returns {number} Returns the visible movable count
     */
    getVisibleMovableCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen Right count
     */
    getVisibleFrozenRightCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen left count
     */
    getVisibleFrozenLeftCount(): number;
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getMovableColumns(): Column[];
    /**
     * Gets the number of frozen column in tree grid
     *
     * @hidden
     * @returns {number} - Returns frozen column count
     */
    getFrozenColumns(): number;
    private getFrozenCount;
    /**
     * Retrieves the indexes of the currently selected rows in the TreeGrid.
     *
     * This method is useful when you need to perform actions based on the selected rows,
     * such as retrieving data or changing the selection.
     *
     * @returns {number[]} - An array of numbers representing the indexes of selected rows.
     */
    getSelectedRowIndexes(): number[];
    /**
     * Retrieves the indexes of the selected cells within the selected rows.
     *
     * This can be useful for handling cell-specific operations, such as
     * applying styles or editing values programmatically.
     *
     * @returns {ISelectedCell[]} - An array of objects representing the selected cells' indexes.
     */
    getSelectedRowCellIndexes(): ISelectedCell[];
    /**
     * Retrieves the data records corresponding to the currently selected rows.
     *
     * This method provides the full record data for the selected rows,
     * which is useful for data manipulation or extraction operations.
     *
     * @isGenericType true
     * @returns {Object[]} - An array of data objects representing the selected records.
     */
    getSelectedRecords(): Object[];
    /**
     * Obtains the data handling modules used by the TreeGrid.
     *
     * This includes both the base data module for standard grid operations and the tree module
     * for handling hierarchical data, giving complete access to data management capabilities.
     *
     * @returns {{baseModule: Data, treeModule: DataManipulation}} - An object containing both grid and tree data modules.
     */
    getDataModule(): {
        baseModule: Data;
        treeModule: DataManipulation;
    };
    /**
     * Reorders rows in the TreeGrid based on specified source indexes and a target position.
     *
     * This functionality allows for dynamic rearrangement of rows, such as moving selected
     * rows to a new position as siblings or children.
     *
     * @param {number[]} fromIndexes - An array indicating the source indexes of the rows to be moved.
     * @param {number} toIndex - The target index where the rows should be moved.
     * @param {string} position - The position relative to the target index ('above', 'below', 'child').
     * @returns {void}
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    /**
     * Indents a specified record, promoting it to one level deeper in the hierarchy.
     *
     * This function moves the selected row to become the last child of its preceding row,
     * altering the visual and hierarchical data structure.
     *
     * @param {Object} record - (Optional) The record to be indented. If omitted, the currently selected row is used.
     * @returns {void}
     */
    indent(record?: Object): void;
    /**
     * Outdents a specified record, moving it one level up in the hierarchy.
     *
     * This method repositions the selected row to be a sibling of its parent, impacting
     * its display and the hierarchical relationships within the TreeGrid.
     *
     * @param {Object} record - (Optional) The record to be outdented. If omitted, the currently selected row is used.
     * @returns {void}
     */
    outdent(record?: Object): void;
    /**
     * `columnchooserModule` is used to dynamically show or hide the TreeGrid columns.
     *
     * @hidden
     */
    columnChooserModule: ColumnChooser;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the TreeGrid.
     */
    toolbarModule: Toolbar;
    /**
     * The `editModule` is used to handle TreeGrid content manipulation.
     */
    editModule: Edit;
    /**
     * The `pagerModule` is used to manipulate paging in the TreeGrid.
     */
    pagerModule: Page;
}
