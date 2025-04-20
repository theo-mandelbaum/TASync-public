/**
 * Specifies Workbook internal events.
 */
/** @hidden */
export var workbookDestroyed = 'workbookDestroyed';
/** @hidden */
export var updateSheetFromDataSource = 'updateSheetFromDataSource';
/** @hidden */
export var dataSourceChanged = 'dataSourceChanged';
/** @hidden */
export var dataChanged = 'dataChanged';
/** @hidden */
export var triggerDataChange = 'triggerDataChange';
/** @hidden */
export var workbookOpen = 'workbookOpen';
/** @hidden */
export var beginSave = 'beginSave';
/** @hidden */
export var beginAction = 'actionBegin';
/** @hidden */
export var sortImport = 'sortImport';
/** @hidden */
export var findToolDlg = 'findToolDlg';
/** @hidden */
export var exportDialog = 'exportDialog';
/** @hidden */
export var setFilteredCollection = 'setFilteredCollection';
/** @hidden */
export var saveCompleted = 'saveCompleted';
/** @hidden */
export var applyNumberFormatting = 'applyNumber';
/** @hidden */
export var getFormattedCellObject = 'getFormattedCell';
/** @hidden */
export var calculateFormula = 'calculateFormula';
/** @hidden */
export var refreshCellElement = 'refreshCellElem';
/** @hidden */
export var setCellFormat = 'setCellFormat';
/** @hidden */
export var findAllValues = 'findAllValues';
/** @hidden */
export var textDecorationUpdate = 'textDecorationUpdate';
/** @hidden */
export var applyCellFormat = 'applyCellFormat';
/** @hidden */
export var updateUsedRange = 'updateUsedRange';
/** @hidden */
export var updateRowColCount = 'updateRowColCount';
/** @hidden */
export var workbookFormulaOperation = 'workbookFormulaOperation';
/** @hidden */
export var workbookEditOperation = 'workbookEditOperation';
/** @hidden */
export var checkDateFormat = 'checkDateFormat';
/** @hidden */
export var checkNumberFormat = 'checkNumberFormat';
/** @hidden */
export var parseDecimalNumber = 'parseDecimalNumber';
/** @hidden */
export var getFormattedBarText = 'getFormattedBarText';
/** @hidden */
export var activeCellChanged = 'activeCellChanged';
/** @hidden */
export var openSuccess = 'openSuccess';
/** @hidden */
export var openFailure = 'openFailure';
/** @hidden */
export var sheetCreated = 'sheetCreated';
/** @hidden */
export var sheetsDestroyed = 'sheetsDestroyed';
/** @hidden */
export var aggregateComputation = 'aggregateComputation';
/** @hidden */
export var getUniqueRange = 'getUniqueRange';
/** @hidden */
export var removeUniquecol = 'removeUniquecol';
/** @hidden */
export var checkUniqueRange = 'checkUniqueRange';
/** @hidden */
export var reApplyFormula = 'reApplyFormula';
/** @hidden */
export var clearFormulaDependentCells = 'clearFormulaDependentCells';
/** @hidden */
export var formulaInValidation = 'formulaInValidation';
/** @hidden */
export var beforeSort = 'beforeSort';
/** @hidden */
export var initiateSort = 'initiateSort';
/** @hidden */
export var updateSortedDataOnCell = 'updateSortedDataOnCell';
/** @hidden */
export var sortComplete = 'sortComplete';
/** @hidden */
export var sortRangeAlert = 'sortRangeAlert';
/** @hidden */
export var initiatelink = 'initiatelink';
/** @hidden */
export var beforeHyperlinkCreate = 'beforeHyperlinkCreate';
/** @hidden */
export var afterHyperlinkCreate = 'afterHyperlinkCreate';
/** @hidden */
export var beforeHyperlinkClick = 'beforeHyperlinkClick';
/** @hidden */
export var afterHyperlinkClick = 'afterHyperlinkClick';
/** @hidden */
export var addHyperlink = 'addHyperlink';
/** @hidden */
export var setLinkModel = 'setLinkModel';
/** @hidden */
export var beforeFilter = 'beforeFilter';
/** @hidden */
export var initiateFilter = 'initiateFilter';
/** @hidden */
export var filterComplete = 'filterComplete';
/** @hidden */
export var filterRangeAlert = 'filterRangeAlert';
/** @hidden */
export var clearAllFilter = 'clearAllFilter';
/** @hidden */
export var wrapEvent = 'wrapText';
/** @hidden */
export var onSave = 'onSave';
/** @hidden */
export var insert = 'insert';
/** @hidden */
export var deleteAction = 'delete';
/** @hidden */
export var insertModel = 'insertModel';
/** @hidden */
export var deleteModel = 'deleteModel';
/** @hidden */
export var isValidation = 'isValidation';
/** @hidden */
export var cellValidation = 'cellValidation';
/** @hidden */
export var addHighlight = 'addHighlight';
/** @hidden */
export var dataValidate = 'dataValidate';
/** @hidden */
export var find = 'find';
/** @hidden */
export var goto = 'gotoHandler';
/** @hidden */
export var findWorkbookHandler = 'findHandler';
/** @hidden */
export var replace = 'replace';
/** @hidden */
export var replaceAll = 'replaceAll';
/** @hidden */
export var showFindAlert = 'showFindAlert';
/** @hidden */
export var findKeyUp = 'findKeyUp';
/** @hidden */
export var removeHighlight = 'removeHighlight';
/** @hidden */
export var queryCellInfo = 'queryCellInfo';
/** @hidden */
export var count = 'count';
/** @hidden */
export var findCount = 'findCount';
/** @hidden */
export var protectSheetWorkBook = 'protectSheet';
/** @hidden */
export var updateToggle = 'updateToggleItem';
/** @hidden */
export var protectsheetHandler = 'protectsheetHandler';
/** @hidden */
export var replaceAllDialog = 'replaceAllDialog';
/** @hidden */
export var unprotectsheetHandler = 'unprotectsheetHandler';
/** @hidden */
export var workBookeditAlert = 'editAlert';
/** @hidden */
export var workbookReadonlyAlert = 'readonlyAlert';
/** @hidden */
export var setLockCells = 'setLockCells';
/** @hidden */
export var applyLockCells = 'applyLockCells';
/** @hidden */
export var setMerge = 'setMerge';
/** @hidden */
export var applyMerge = 'applyMerge';
/** @hidden */
export var mergedRange = 'mergedRange';
/** @hidden */
export var activeCellMergedRange = 'activeCellMergedRange';
/** @hidden */
export var insertMerge = 'insertMerge';
/** @hidden */
export var hideShow = 'hideShow';
/** @hidden */
export var setCFRule = 'setCFRule';
/** @hidden */
export var applyCF = 'applyCF';
/** @hidden */
export var clearCFRule = 'clearCFRule';
/** @hidden */
export var clear = 'clear';
/** @hidden */
export var clearCF = 'clearCF';
/** @hidden */
export var setImage = 'setImage';
/** @hidden */
export var setChart = 'setChart';
/** @hidden */
export var initiateChart = 'initiateChart';
/** @hidden */
export var refreshRibbonIcons = 'refreshRibbonIcons';
/** @hidden */
export var refreshChart = 'refreshChart';
/** @hidden */
export var refreshChartSize = 'refreshChartSize';
/** @hidden */
export var deleteChartColl = 'deleteChartColl';
/** @hidden */
export var initiateChartModel = 'initiateChartModel';
/** @hidden */
export var focusChartBorder = 'focusChartBorder';
/** @hidden */
export var saveError = 'saveError';
/** @hidden */
export var updateHighlight = 'updateHighlight';
/** @hidden */
export var beforeInsert = 'beforeInsert';
/** @hidden */
export var beforeDelete = 'beforeDelete';
/** @hidden */
export var deleteHyperlink = 'deleteHyperlink';
/** @hidden */
export var moveOrDuplicateSheet = 'moveOrDuplicateSheet';
/** @hidden */
export var setAutoFill = 'setAutoFill';
/** @hidden */
export var refreshCell = 'refreshCell';
/** @hidden */
export var getFillInfo = 'getFillInfo';
/** @hidden */
export var getautofillDDB = 'getautofillDDB';
/** @hidden */
export var rowFillHandler = 'rowFillHandler';
/** @hidden */
export var getTextSpace = 'getTextSpace';
/** @hidden */
export var refreshClipboard = 'refreshClipboard';
/** @hidden */
export var updateView = 'updateView';
/** @hidden */
export var selectionComplete = 'selectionComplete';
/** @hidden */
export var refreshInsertDelete = 'refreshInsertDelete';
/** @hidden */
export var getUpdatedFormulaOnInsertDelete = 'getUpdatedFormulaOnInsertDelete';
/** @hidden */
export var beforeCellUpdate = 'beforeCellUpdate';
/** @hidden */
export var duplicateSheetFilterHandler = 'duplicateSheetFilterHandler';
/** @hidden */
export var unMerge = 'unMerge';
/** @hidden */
export var checkFormulaRef = 'checkFormulaRef';
/** @hidden */
export var parseFormulaArgument = 'parseFormulaArgument';
/** @hidden */
export var getCellRefValue = 'getCellRefValue';
/** @hidden */
export var commputeFormulaValue = 'commputeFormulaValue';
/** @hidden */
export var getChartRowIdxFromClientY = 'getChartRowIdxFromClientY';
/** @hidden */
export var getChartColIdxFromClientX = 'getChartColIdxFromClientX';
/** @hidden */
export var refreshChartCellOnInit = 'refreshChartCellOnInit';
/** @hidden */
export var localizedFormatAction = 'localizedFormatAction';
/** @hidden */
export var moveSheetHandler = 'moveSheetHandler';
/** @hidden */
export var addListValidationDropdown = 'addListValidationDropdown';
/** @hidden */
export var sheetRenameUpdate = 'sheetRenameUpdate';
/** @hidden */
export var updateSortCollection = 'updateSortCollection';
