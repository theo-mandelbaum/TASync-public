import * as events from '../base/constant';
import { PdfDocument, PdfGrid, PdfBorders, PdfPen, PdfPaddings, PdfGridLayoutFormat, PdfLayoutType, PdfLayoutBreakType } from '@syncfusion/ej2-pdf-export';
import { PdfStandardFont, PdfFontFamily, PdfFontStyle, PdfBitmap } from '@syncfusion/ej2-pdf-export';
import { PdfStringFormat, PdfTextAlignment, PdfColor, PdfSolidBrush, PdfTextWebLink } from '@syncfusion/ej2-pdf-export';
import { PdfVerticalAlignment, RectangleF, PdfPageTemplateElement } from '@syncfusion/ej2-pdf-export';
import { PointF, PdfPageNumberField, PdfCompositeField } from '@syncfusion/ej2-pdf-export';
import { PdfPageCountField, SizeF, PdfPageSettings, PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { PdfTrueTypeFont } from '@syncfusion/ej2-pdf-export';
import { ExportHelper, ExportValueFormatter } from './export-helper';
import { Data } from '../actions/data';
import { SummaryModelGenerator, GroupSummaryModelGenerator, CaptionSummaryModelGenerator } from '../services/summary-model-generator';
import { compile, getEnumValue, isNullOrUndefined, detach, extend } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { getValue } from '@syncfusion/ej2-base';
import { getUid, getPrintGridModel, measureColumnDepth, isExportColumns, updateColumnTypeForExportColumns, prepareColumns } from '../base/util';
/**
 * `PDF Export` module is used to handle the exportToPDF action.
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for the Grid PDF Export module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @hidden
     */
    function PdfExport(parent) {
        this.hideColumnInclude = false;
        this.currentViewData = false;
        this.customDataSource = false;
        this.isGrouping = false;
        this.headerOnPages = [];
        this.drawPosition = { xPosition: 0, yPosition: 0 };
        this.parent = parent;
        this.helper = new ExportHelper(parent);
        this.gridPool = {};
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    PdfExport.prototype.init = function (parent) {
        this.exportValueFormatter = new ExportValueFormatter(parent.locale);
        this.pdfDocument = undefined;
        this.hideColumnInclude = false;
        this.currentViewData = false;
        this.parent = parent;
        this.isGrouping = false;
        this.isExporting = true;
        parent.id = getUid('main-grid');
        this.gridPool[parent.id] = false;
        this.pdfPageSettings = new PdfPageSettings();
    };
    PdfExport.prototype.exportWithData = function (parent, pdfDoc, resolve, returnType, pdfExportProperties, isMultipleExport, reject) {
        var _this = this;
        this.init(parent);
        if (!isNullOrUndefined(pdfDoc)) {
            this.pdfDocument = pdfDoc;
        }
        else {
            this.pdfDocument = new PdfDocument();
        }
        this.processExport(parent, returnType, pdfExportProperties, isMultipleExport).then(function () {
            _this.isExporting = false;
            parent.trigger(events.pdfExportComplete, _this.isBlob ? { promise: _this.blobPromise } : { gridInstance: _this.parent });
            _this.parent.log('exporting_complete', _this.getModuleName());
            resolve(_this.pdfDocument);
        }).catch(function (e) {
            reject(_this.pdfDocument);
            _this.parent.trigger(events.actionFailure, e);
        });
    };
    /**
     * Used to map the input data
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {PdfExportProperties} pdfExportProperties - specifies the PdfExportProperties
     * @param {boolean} isMultipleExport - specifies the isMultipleExport
     * @param {Object} pdfDoc - specifies the pdfDoc
     * @param {boolean} isBlob - speciies whether it is Blob or not
     * @returns {void}
     */
    PdfExport.prototype.Map = function (parent, pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var _this = this;
        this.data = new Data(this.parent);
        this.isBlob = isBlob;
        this.gridPool = {};
        var query = pdfExportProperties && pdfExportProperties.query ? pdfExportProperties.query : new Query();
        if ((parent.childGrid || parent.detailTemplate) && !(!isNullOrUndefined(pdfExportProperties) && pdfExportProperties.hierarchyExportMode === 'None')) {
            parent.expandedRows = getPrintGridModel(parent).expandedRows;
        }
        var args = {
            requestType: 'beforePdfExport', cancel: false,
            headerPageNumbers: [], gridDrawPosition: { xPosition: 0, yPosition: 0 }, generateQuery: false
        };
        var gridObject = 'gridObject';
        args["" + gridObject] = parent;
        var can = 'cancel';
        var generateQuery = 'generateQuery';
        var header = 'headerPageNumbers';
        var drawPos = 'gridDrawPosition';
        parent.trigger(events.beforePdfExport, args);
        if (args["" + can] === true) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return new Promise(function (resolve, reject) {
                return resolve();
            });
        }
        if (isExportColumns(pdfExportProperties)) {
            updateColumnTypeForExportColumns(pdfExportProperties, parent);
        }
        if (args["" + generateQuery]) {
            query = ExportHelper.getQuery(parent, this.data);
        }
        this.headerOnPages = args["" + header];
        this.drawPosition = args["" + drawPos];
        this.parent.log('exporting_begin', this.getModuleName());
        if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.dataSource)) {
            pdfExportProperties.dataSource = pdfExportProperties.dataSource instanceof DataManager ?
                pdfExportProperties.dataSource : new DataManager(pdfExportProperties.dataSource);
            if (isNullOrUndefined(query.isCountRequired) || parent.aggregates) {
                query.isCountRequired = true;
            }
            return new Promise(function (resolve, reject) {
                pdfExportProperties.dataSource.executeQuery(query).then(function (returnType) {
                    _this.exportWithData(parent, pdfDoc, resolve, returnType, pdfExportProperties, isMultipleExport, reject);
                });
            });
        }
        else if (!isNullOrUndefined(pdfExportProperties) && pdfExportProperties.exportType === 'CurrentPage' &&
            !(this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length
                && !this.parent.getDataModule().isRemote())) {
            return new Promise(function (resolve, reject) {
                _this.exportWithData(parent, pdfDoc, resolve, _this.parent.getCurrentViewRecords(), pdfExportProperties, isMultipleExport, reject);
            });
        }
        else {
            var allPromise_1 = [];
            var query_1 = ExportHelper.getQuery(parent, this.data);
            if (this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length
                && !this.parent.getDataModule().isRemote()) {
                if (isNullOrUndefined(pdfExportProperties)) {
                    pdfExportProperties = { hierarchyExportMode: 'All' };
                }
                pdfExportProperties.hierarchyExportMode = pdfExportProperties.hierarchyExportMode === 'None' ? 'None' : 'All';
                if (pdfExportProperties.hierarchyExportMode === 'All') {
                    query_1.lazyLoad = [];
                }
            }
            allPromise_1.push(this.data.getData({}, query_1));
            allPromise_1.push(this.helper.getColumnData(parent));
            return new Promise(function (resolve, reject) {
                Promise.all(allPromise_1).then(function (e) {
                    _this.init(parent);
                    if (!isNullOrUndefined(pdfDoc)) {
                        _this.pdfDocument = pdfDoc['document'];
                    }
                    else {
                        _this.pdfDocument = new PdfDocument();
                    }
                    _this.processExport(parent, e[0], pdfExportProperties, isMultipleExport, pdfDoc).then(function (results) {
                        _this.isExporting = false;
                        parent.trigger(events.pdfExportComplete, _this.isBlob ? { promise: _this.blobPromise }
                            : { gridInstance: _this.parent });
                        _this.parent.log('exporting_complete', _this.getModuleName());
                        if (pdfExportProperties && pdfExportProperties.multipleExport && pdfExportProperties.multipleExport.type === 'AppendToPage') {
                            resolve(results);
                        }
                        else {
                            resolve(_this.pdfDocument);
                        }
                    }).catch(function (e) {
                        reject(_this.pdfDocument);
                        _this.parent.trigger(events.actionFailure, e);
                    });
                });
            });
        }
    };
    PdfExport.prototype.processExport = function (gObj, returnType, pdfExportProperties, isMultipleExport, pdfDoc) {
        var _this = this;
        var section = !(pdfDoc && pdfExportProperties && pdfExportProperties.multipleExport &&
            pdfExportProperties.multipleExport.type === 'AppendToPage') ? this.pdfDocument.sections.add() : null;
        var pdfGrid;
        this.processSectionExportProperties(section, pdfExportProperties);
        var pdfPage = pdfDoc && pdfExportProperties && pdfExportProperties.multipleExport &&
            pdfExportProperties.multipleExport.type === 'AppendToPage' ? pdfDoc['result'].page : section.pages.add();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise(function (resolve, reject) {
            pdfGrid = _this.processGridExport(gObj, returnType, pdfExportProperties);
            _this.globalResolve = resolve;
            _this.gridPool[gObj.id] = true;
            _this.helper.checkAndExport(_this.gridPool, _this.globalResolve);
        }).then(function () {
            // draw the grid
            var xPosition = _this.drawPosition['xPosition'];
            var yPosition;
            if (pdfDoc && pdfExportProperties && pdfExportProperties.multipleExport && pdfExportProperties.multipleExport.type === 'AppendToPage') {
                yPosition = pdfDoc['result'].bounds.y + pdfDoc['result'].bounds.height;
                if (pdfExportProperties.multipleExport.blankSpace) {
                    yPosition = pdfDoc['result'].bounds.y + pdfDoc['result'].bounds.height + pdfExportProperties.multipleExport.blankSpace;
                }
            }
            else {
                yPosition = _this.drawPosition['yPosition'];
            }
            var result;
            if (isMultipleExport) {
                var layoutFormat = new PdfGridLayoutFormat();
                layoutFormat.layout = PdfLayoutType.Paginate;
                layoutFormat.break = PdfLayoutBreakType.FitPage;
                //Set pagination bounds of PDF grid
                layoutFormat.paginateBounds = new RectangleF(0, 0, pdfPage.getClientSize().width, pdfPage.getClientSize().height);
                result = pdfGrid.draw(pdfPage, xPosition, yPosition, layoutFormat);
            }
            else {
                result = pdfGrid.draw(pdfPage, xPosition, yPosition);
            }
            _this.drawHeader(pdfExportProperties);
            if (!isMultipleExport) {
                // save the PDF
                if (!_this.isBlob) {
                    if (!isNullOrUndefined(pdfExportProperties) && pdfExportProperties.fileName) {
                        _this.pdfDocument.save(pdfExportProperties.fileName);
                    }
                    else {
                        _this.pdfDocument.save('Export.pdf');
                    }
                }
                else {
                    _this.blobPromise = _this.pdfDocument.save();
                }
                _this.pdfDocument.destroy();
                delete gObj.expandedRows;
            }
            if (pdfExportProperties && pdfExportProperties.multipleExport && pdfExportProperties.multipleExport.type === 'AppendToPage') {
                return { document: _this.pdfDocument, result: result };
            }
            else {
                return _this.pdfDocument;
            }
        });
    };
    PdfExport.prototype.processSectionExportProperties = function (section, pdfExportProperties) {
        if (!isNullOrUndefined(section) && !isNullOrUndefined(pdfExportProperties)
            && (!isNullOrUndefined(pdfExportProperties.pageOrientation) || !isNullOrUndefined(pdfExportProperties.pageSize))) {
            this.pdfPageSettings.orientation = (pdfExportProperties.pageOrientation === 'Landscape') ?
                PdfPageOrientation.Landscape : PdfPageOrientation.Portrait;
            this.pdfPageSettings.size = this.getPageSize(pdfExportProperties.pageSize);
            section.setPageSettings(this.pdfPageSettings);
        }
        return section;
    };
    PdfExport.prototype.processGridExport = function (gObj, returnType, pdfExportProperties) {
        var allowHorizontalOverflow = true;
        if (!isNullOrUndefined(pdfExportProperties)) {
            this.gridTheme = pdfExportProperties.theme;
            allowHorizontalOverflow = isNullOrUndefined(pdfExportProperties.allowHorizontalOverflow) ?
                true : pdfExportProperties.allowHorizontalOverflow;
        }
        var helper = new ExportHelper(gObj, this.helper.getForeignKeyData());
        var dataSource = this.processExportProperties(pdfExportProperties, returnType.result);
        var columns = isExportColumns(pdfExportProperties) ?
            prepareColumns(pdfExportProperties.columns, gObj.enableColumnVirtualization) :
            helper.getGridExportColumns(gObj.columns);
        columns = columns.filter(function (columns) { return isNullOrUndefined(columns.commands); });
        var isGrouping = false;
        if (gObj.groupSettings.columns.length) {
            isGrouping = true;
        }
        if ((gObj.childGrid || gObj.detailTemplate) && !isNullOrUndefined(pdfExportProperties)) {
            gObj.hierarchyPrintMode = pdfExportProperties.hierarchyExportMode || 'Expanded';
        }
        // create a grid
        var pdfGrid = new PdfGrid();
        // get header theme style
        var headerThemeStyle = this.getHeaderThemeStyle();
        var border = headerThemeStyle.border;
        var headerFont = headerThemeStyle.font;
        var headerBrush = headerThemeStyle.brush;
        var returnValue = helper.getHeaders(columns, this.hideColumnInclude);
        // Column collection with respect to the records in the grid
        var gridColumns = returnValue.columns;
        // process grid header content
        pdfGrid = this.processGridHeaders(gObj.groupSettings.columns.length, pdfGrid, returnValue.rows, gridColumns, border, headerFont, headerBrush, gObj, allowHorizontalOverflow, columns);
        // set alignment, width and type of the values of the column
        this.setColumnProperties(gridColumns, pdfGrid, helper, gObj, allowHorizontalOverflow);
        var captionThemeStyle = this.getSummaryCaptionThemeStyle();
        if (!isNullOrUndefined(dataSource) && dataSource.length) {
            if (isGrouping) {
                if (!isNullOrUndefined(captionThemeStyle.border)) {
                    border = captionThemeStyle.border;
                }
                this.processGroupedRecords(pdfGrid, dataSource, gridColumns, gObj, border, 0, captionThemeStyle.font, captionThemeStyle.
                    brush, captionThemeStyle.backgroundBrush, returnType, pdfExportProperties, helper, 0);
            }
            else {
                this.processRecord(border, gridColumns, gObj, dataSource, pdfGrid, 0, pdfExportProperties, helper, 0);
            }
            if (!isNullOrUndefined(returnType.aggregates)) {
                var summaryModel = new SummaryModelGenerator(gObj);
                var sRows = void 0;
                var column = summaryModel.getColumns();
                column = column.filter(function (col) { return isNullOrUndefined(col.commands) && col.type !== 'checkbox'; });
                if (gObj.aggregates.length && this.parent !== gObj) {
                    gObj.aggregateModule.prepareSummaryInfo();
                }
                if (this.customDataSource) {
                    sRows = summaryModel.generateRows(dataSource, returnType.aggregates, null, null, column);
                }
                else if (this.currentViewData) {
                    sRows = summaryModel.generateRows(this.parent.getCurrentViewRecords(), returnType.aggregates);
                }
                else if (isGrouping) {
                    sRows = summaryModel.generateRows(dataSource.records, returnType.aggregates);
                }
                else {
                    sRows = summaryModel.generateRows(returnType.result, returnType.aggregates, null, null, column);
                }
                this.processAggregates(sRows, pdfGrid, border, captionThemeStyle.font, captionThemeStyle.brush, captionThemeStyle.backgroundBrush, false, null, null, null, isGrouping ? false : true);
            }
        }
        else {
            var row = pdfGrid.rows.addRow();
            row.style.setBorder(border);
        }
        return pdfGrid;
    };
    PdfExport.prototype.getSummaryCaptionThemeStyle = function () {
        if (!isNullOrUndefined(this.gridTheme) && !isNullOrUndefined(this.gridTheme.caption)) {
            var fontSize = !isNullOrUndefined(this.gridTheme.caption.fontSize) ? this.gridTheme.caption.fontSize : 9.75;
            var fontFamily = !isNullOrUndefined(this.gridTheme.caption.fontName) ?
                this.getFontFamily(this.gridTheme.caption.fontName) : PdfFontFamily.Helvetica;
            var fontStyle = this.getFontStyle(this.gridTheme.caption);
            var pdfColor = new PdfColor(0, 0, 0);
            if (!isNullOrUndefined(this.gridTheme.caption.fontColor)) {
                var penBrushColor = this.hexToRgb(this.gridTheme.caption.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            var borderCaption = this.gridTheme.caption.border ? this.getBorderStyle(this.gridTheme.caption.border) : null;
            var font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
            if (!isNullOrUndefined(this.gridTheme.caption.font)) {
                font = this.gridTheme.caption.font;
            }
            return { font: font, brush: new PdfSolidBrush(pdfColor), backgroundBrush: new PdfSolidBrush(new PdfColor(246, 246, 246)),
                border: borderCaption };
        }
        else {
            //Material theme
            return { font: new PdfStandardFont(PdfFontFamily.Helvetica, 9.75), brush: new PdfSolidBrush(new PdfColor(0, 0, 0)),
                backgroundBrush: new PdfSolidBrush(new PdfColor(246, 246, 246)) };
        }
    };
    PdfExport.prototype.getGridPdfFont = function (args) {
        var fontFamily = 'fontFamily';
        var fontSize = 'fontSize';
        var fontStyle = 'fontStyle';
        var isTrueType = 'isTrueType';
        var style = 0;
        if (args.header && args.header.font) {
            var headerFont = args.header.font["" + fontFamily];
            var headerSize = args.header.font["" + fontSize];
            var headerStyle = args.header.font["" + fontStyle];
            style = (isNullOrUndefined(PdfFontStyle["" + headerStyle]) ? 0 : PdfFontStyle["" + headerStyle]);
            if (args.header.font["" + isTrueType]) {
                args.header.font = new PdfTrueTypeFont(headerFont, headerSize, style);
            }
            else {
                var fontFamily_1 = !isNullOrUndefined(headerFont) ?
                    this.getFontFamily(headerFont) : PdfFontFamily.Helvetica;
                args.header.font = new PdfStandardFont(fontFamily_1, headerSize, style);
            }
        }
        if (args.caption && args.caption.font) {
            var captionFont = args.caption.font["" + fontFamily];
            var captionSize = args.caption.font["" + fontSize];
            var captionStyle = args.caption.font["" + fontStyle];
            style = (isNullOrUndefined(PdfFontStyle["" + captionStyle]) ? 0 : PdfFontStyle["" + captionStyle]);
            if (args.caption.font["" + isTrueType]) {
                args.caption.font = new PdfTrueTypeFont(captionFont, captionSize, style);
            }
            else {
                var fontFamily_2 = !isNullOrUndefined(captionFont) ?
                    this.getFontFamily(captionFont) : PdfFontFamily.Helvetica;
                args.caption.font = new PdfStandardFont(fontFamily_2, captionSize, style);
            }
        }
        if (args.record && args.record.font) {
            var recordFont = args.record.font["" + fontFamily];
            var recordSize = args.record.font["" + fontSize];
            var recordStyle = args.record.font["" + fontStyle];
            style = (isNullOrUndefined(PdfFontStyle["" + recordStyle]) ? 0 : PdfFontStyle["" + recordStyle]);
            if (args.record.font["" + isTrueType]) {
                args.record.font = new PdfTrueTypeFont(recordFont, recordSize, style);
            }
            else {
                var fontFamily_3 = !isNullOrUndefined(recordFont) ?
                    this.getFontFamily(recordFont) : PdfFontFamily.Helvetica;
                args.record.font = new PdfStandardFont(fontFamily_3, recordSize, style);
            }
        }
    };
    PdfExport.prototype.getHeaderThemeStyle = function () {
        var border = new PdfBorders();
        if (!isNullOrUndefined(this.gridTheme) && !isNullOrUndefined(this.gridTheme.header)) {
            var fontFamily = !isNullOrUndefined(this.gridTheme.header.fontName) ?
                this.getFontFamily(this.gridTheme.header.fontName) : PdfFontFamily.Helvetica;
            var fontStyle = this.getFontStyle(this.gridTheme.header);
            var fontSize = !isNullOrUndefined(this.gridTheme.header.fontSize) ? this.gridTheme.header.fontSize : 10.5;
            var pdfColor = new PdfColor();
            if (!isNullOrUndefined(this.gridTheme.header.fontColor)) {
                var penBrushColor = this.hexToRgb(this.gridTheme.header.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            var font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
            if (!isNullOrUndefined(this.gridTheme.header.font)) {
                font = this.gridTheme.header.font;
            }
            return { border: this.getBorderStyle(this.gridTheme.header.border), font: font, brush: new PdfSolidBrush(pdfColor) };
        }
        else {
            //Material theme
            border.all = new PdfPen(new PdfColor(234, 234, 234));
            return { border: border, font: new PdfStandardFont(PdfFontFamily.Helvetica, 10.5),
                brush: new PdfSolidBrush(new PdfColor(102, 102, 102)) };
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.processGroupedRecords = function (pdfGrid, dataSource, gridColumns, gObj, border, level, font, brush, backgroundBrush, returnType, pdfExportProperties, helper, index) {
        var _this = this;
        var groupIndex = level;
        var _loop_1 = function (dataSourceItems) {
            var row = pdfGrid.rows.addRow();
            var col = gObj.getColumnByField(dataSourceItems.field);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var args = {
                value: dataSourceItems.key,
                column: col,
                style: undefined,
                isForeignKey: col.isForeignColumn()
            };
            var value = gObj.getColumnByField(dataSourceItems.field).headerText + ': ' + (!col.enableGroupByFormat ? this_1.exportValueFormatter.formatCellValue(args) : dataSourceItems.key) + ' - ' + dataSourceItems.count + (dataSource.count > 1 ? ' items' : ' item');
            var cArgs = { captionText: value, type: 'PDF', data: dataSourceItems, style: undefined };
            this_1.parent.trigger(events.exportGroupCaption, cArgs, function (cArgs) {
                row.cells.getCell(groupIndex).value = cArgs.captionText;
                row.cells.getCell(groupIndex).style.stringFormat = new PdfStringFormat(PdfTextAlignment.Left);
                row.style.setBorder(border);
                row.style.setFont(font);
                row.style.setTextBrush(brush);
                row.style.setBackgroundBrush(backgroundBrush);
                if (!isNullOrUndefined(cArgs.style)) {
                    _this.processCellStyle(row.cells.getCell(groupIndex), cArgs);
                }
                var sRows;
                var captionSummaryModel = new CaptionSummaryModelGenerator(gObj);
                if (!isNullOrUndefined(dataSourceItems.items.records)) {
                    sRows = captionSummaryModel.generateRows(dataSourceItems.items.records, dataSourceItems);
                }
                else {
                    sRows = captionSummaryModel.generateRows(dataSourceItems.items, dataSourceItems);
                }
                if (!isNullOrUndefined(sRows) && sRows.length === 0) {
                    row.cells.getCell(groupIndex + 1).columnSpan = pdfGrid.columns.count - (groupIndex + 1);
                }
                if (!isNullOrUndefined(dataSource.childLevels) && dataSource.childLevels > 0) {
                    _this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, true, row, groupIndex, null, null, gObj);
                    _this.processGroupedRecords(pdfGrid, dataSourceItems.items, gridColumns, gObj, border, (groupIndex + 1), font, brush, backgroundBrush, returnType, pdfExportProperties, helper, index);
                    index = _this.rowIndex;
                    var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
                    sRows = groupSummaryModel.generateRows(dataSourceItems.items.records, dataSourceItems);
                    _this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, false);
                }
                else {
                    _this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, true, row, groupIndex, null, null, gObj);
                    index = _this.processRecord(border, gridColumns, gObj, dataSourceItems.items, pdfGrid, (groupIndex + 1), pdfExportProperties, helper, index);
                    var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
                    sRows = groupSummaryModel.generateRows(dataSourceItems.items, dataSourceItems);
                    var isGroupedFooter = true;
                    _this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, false, null, null, isGroupedFooter, null, gObj);
                }
            });
        };
        var this_1 = this;
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var dataSourceItems = dataSource_1[_i];
            _loop_1(dataSourceItems);
        }
    };
    PdfExport.prototype.processGridHeaders = function (childLevels, pdfGrid, rows, gridColumn, border, headerFont, headerBrush, grid, allowHorizontalOverflow, eCols) {
        var _this = this;
        var columnCount = gridColumn.length + childLevels;
        var depth = measureColumnDepth(eCols);
        var cols = eCols;
        var index = 0;
        var rowNumber = [];
        for (var i = 0; i < rows.length; i++) {
            rowNumber[parseInt(i.toString(), 10)] = 0;
        }
        if (grid.groupSettings.columns.length) {
            index = grid.groupSettings.columns.length - 1;
            columnCount = columnCount - 1;
        }
        pdfGrid.columns.add(columnCount);
        pdfGrid.style.cellPadding = new PdfPaddings(5.76, 5.76, 0.5, 0.5);
        pdfGrid.headers.add(rows.length);
        var applyTextAndSpan = function (rowIdx, colIdx, col, rowSpan, colSpan) {
            var gridHeader = pdfGrid.headers.getHeader(rowIdx);
            var pdfCell = gridHeader.cells.getCell(colIdx);
            var cell = rows[parseInt(rowIdx.toString(), 10)].cells[grid.groupSettings.columns.length ?
                colIdx : rowNumber[parseInt(rowIdx.toString(), 10)]];
            rowNumber[parseInt(rowIdx.toString(), 10)] = rowNumber[parseInt(rowIdx.toString(), 10)] + 1;
            if (!isNullOrUndefined(col.headerTextAlign)) {
                pdfCell.style.stringFormat = _this.getHorizontalAlignment(col.headerTextAlign);
            }
            if (rowSpan > 0) {
                pdfCell.rowSpan = rowSpan;
                pdfCell.style.stringFormat = _this.getVerticalAlignment('Bottom', pdfCell.style.stringFormat, col.textAlign);
            }
            if (colSpan > 0) {
                pdfCell.columnSpan = colSpan;
            }
            gridHeader.style.setBorder(border);
            gridHeader.style.setFont(headerFont);
            gridHeader.style.setTextBrush(headerBrush);
            pdfCell.value = col.headerText;
            if (!isNullOrUndefined(cell) && (cell.cellType === CellType.HeaderIndent || cell.cellType === CellType.DetailHeader)) {
                pdfCell.value = '';
                pdfCell.width = 20;
            }
            var args = {
                cell: pdfCell,
                gridCell: cell,
                style: pdfCell.style
            };
            _this.parent.trigger(events.pdfHeaderQueryCellInfo, args);
            var evtArgs = args;
            var setCellBorder = args.style.borders;
            var setCellFont = args.style.font;
            var setHeaderBrush = args.style.textBrush;
            if (!isNullOrUndefined(setCellBorder)) {
                gridHeader.style.setBorder(setCellBorder);
            }
            if (!isNullOrUndefined(setCellFont)) {
                gridHeader.style.setFont(setCellFont);
            }
            if (!isNullOrUndefined(setHeaderBrush)) {
                gridHeader.style.setTextBrush(setHeaderBrush);
            }
            if (!isNullOrUndefined(evtArgs.style.verticalAlignment)) {
                pdfCell.style.stringFormat = _this.getVerticalAlignment(evtArgs.style.verticalAlignment, pdfCell.style.stringFormat);
            }
            if (!isNullOrUndefined(evtArgs.image)) {
                pdfCell.value = new PdfBitmap(evtArgs.image.base64);
            }
            if (!isNullOrUndefined(evtArgs.hyperLink)) {
                pdfCell.value = _this.setHyperLink(evtArgs);
            }
        };
        var recuHeader = function (cols, depth, spanCnt, colIndex, rowIndex, isRoot) {
            var cidx = 0;
            for (var i = 0; i < cols.length; i++) {
                if (isRoot) {
                    cidx = cidx + spanCnt + (i === 0 ? 0 : -1);
                    colIndex = cidx;
                    spanCnt = 0;
                }
                if (!isRoot && !cols[parseInt(i.toString(), 10)].visible) {
                    colIndex = colIndex - 1;
                }
                if (cols[parseInt(i.toString(), 10)].columns && cols[parseInt(i.toString(), 10)].columns.length) {
                    var newSpanCnt = recuHeader(cols[parseInt(i.toString(), 10)]
                        .columns, depth - 1, 0, i + colIndex, rowIndex + 1, false);
                    applyTextAndSpan(rowIndex, i + colIndex + index, cols[parseInt(i.toString(), 10)], 0, newSpanCnt);
                    spanCnt = spanCnt + newSpanCnt;
                    colIndex = colIndex + newSpanCnt - 1;
                }
                else if (cols[parseInt(i.toString(), 10)].visible || _this.hideColumnInclude) {
                    spanCnt++;
                    applyTextAndSpan(rowIndex, i + colIndex + index, cols[parseInt(i.toString(), 10)], depth, 0);
                }
            }
            return spanCnt;
        };
        recuHeader(cols, depth, 0, 0, 0, true);
        if (pdfGrid.columns.count >= 6 && allowHorizontalOverflow) {
            pdfGrid.style.allowHorizontalOverflow = true;
        }
        return pdfGrid;
    };
    PdfExport.prototype.processExportProperties = function (pdfExportProperties, dataSource) {
        if (!isNullOrUndefined(pdfExportProperties)) {
            if (!isNullOrUndefined(pdfExportProperties.theme)) {
                this.gridTheme = pdfExportProperties.theme;
            }
            var clientSize = this.pdfPageSettings.size;
            this.drawHeader(pdfExportProperties);
            if (!isNullOrUndefined(pdfExportProperties.footer)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var footer = pdfExportProperties.footer;
                var position = new PointF(0, ((clientSize.width - 80) - (footer.fromBottom * 0.75)));
                var size = new SizeF((clientSize.width - 80), (footer.height * 0.75));
                var bounds = new RectangleF(position, size);
                this.pdfDocument.template.bottom = this.drawPageTemplate(new PdfPageTemplateElement(bounds), footer);
            }
            if (!isNullOrUndefined(pdfExportProperties.includeHiddenColumn) && !this.isGrouping) {
                this.hideColumnInclude = pdfExportProperties.includeHiddenColumn;
            }
            if (!isNullOrUndefined(pdfExportProperties.dataSource)) {
                this.customDataSource = true;
                this.currentViewData = false;
            }
            else if (!isNullOrUndefined(pdfExportProperties.exportType)) {
                if (pdfExportProperties.exportType === 'CurrentPage') {
                    dataSource = this.parent.groupSettings && this.parent.groupSettings.enableLazyLoading
                        && this.parent.groupSettings.columns.length && !this.parent.getDataModule().isRemote() ? dataSource
                        : this.parent.currentViewData;
                    this.currentViewData = true;
                    this.customDataSource = false;
                }
                else {
                    this.currentViewData = false;
                    this.customDataSource = false;
                }
            }
            else {
                this.currentViewData = false;
                this.customDataSource = false;
            }
        }
        else {
            this.currentViewData = false;
            this.customDataSource = false;
        }
        return dataSource;
    };
    PdfExport.prototype.drawHeader = function (pdfExportProperties) {
        var _this = this;
        var clientSize = this.pdfPageSettings.size;
        if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.header)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var header = pdfExportProperties.header;
            var position = new PointF(0, header.fromTop);
            var size = new SizeF((clientSize.width - 80), (header.height * 0.75));
            var bounds = new RectangleF(position, size);
            if (!this.headerOnPages.length) {
                this.pdfDocument.template.top = this.drawPageTemplate(new PdfPageTemplateElement(bounds), header);
            }
            else {
                var headerTemplate_1 = this.drawPageTemplate(new PdfPageTemplateElement(bounds), header);
                this.headerOnPages.filter(function (index) {
                    if (index - 1 >= 0 && index - 1 <= _this.pdfDocument.pages.count - 1) {
                        _this.pdfDocument.pages.getPageByIndex(index - 1).graphics
                            .drawPdfTemplate(headerTemplate_1.template, new PointF(0, 0));
                    }
                });
            }
        }
    };
    PdfExport.prototype.drawPageTemplate = function (template, element) {
        for (var _i = 0, _a = element.contents; _i < _a.length; _i++) {
            var content = _a[_i];
            this.processContentValidation(content);
            switch (content.type) {
                case 'Text':
                    if (content.value === '' || content.value === undefined || content.value === null || typeof content.value !== 'string') {
                        throw new Error('please enter the valid input value in text content...');
                    }
                    this.drawText(template, content);
                    break;
                case 'PageNumber':
                    this.drawPageNumber(template, content);
                    break;
                case 'Image':
                    if (content.src === undefined || content.src === null || content.src === '') {
                        throw new Error('please enter the valid base64 string in image content...');
                    }
                    this.drawImage(template, content);
                    break;
                case 'Line':
                    this.drawLine(template, content);
                    break;
                default:
                    throw new Error('Please set valid content type...');
            }
        }
        return template;
    };
    PdfExport.prototype.processContentValidation = function (content) {
        if (content.type === undefined || content.type === null) {
            throw new Error('please set valid content type...');
        }
        else {
            if (content.type === 'Line') {
                if (content.points === undefined || content.points === null) {
                    throw new Error('please enter valid points in ' + content.type + ' content...');
                }
                else {
                    if (content.points.x1 === undefined || content.points.x1 === null || typeof content.points.x1 !== 'number') {
                        throw new Error('please enter valid x1 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.y1 === undefined || content.points.y1 === null || typeof content.points.y1 !== 'number') {
                        throw new Error('please enter valid y1 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.x2 === undefined || content.points.x2 === null || typeof content.points.x2 !== 'number') {
                        throw new Error('please enter valid x2 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.y2 === undefined || content.points.y2 === null || typeof content.points.y2 !== 'number') {
                        throw new Error('please enter valid y2 co-ordinate in ' + content.type + ' points...');
                    }
                }
            }
            else {
                if (content.position === undefined || content.position === null) {
                    throw new Error('please enter valid position in ' + content.type + ' content...');
                }
                else {
                    if (content.position.x === undefined || content.position.x === null || typeof content.position.x !== 'number') {
                        throw new Error('please enter valid x co-ordinate in ' + content.type + ' position...');
                    }
                    if (content.position.y === undefined || content.position.y === null || typeof content.position.y !== 'number') {
                        throw new Error('please enter valid y co-ordinate in ' + content.type + ' position...');
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.drawText = function (pageTemplate, content) {
        var font = this.getFont(content);
        var brush = this.getBrushFromContent(content);
        var pen = null;
        if (!isNullOrUndefined(content.style.textPenColor)) {
            var penColor = this.hexToRgb(content.style.textPenColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        if (brush == null && pen == null) {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var value = content.value.toString();
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var format = new PdfStringFormat();
        if (!isNullOrUndefined(content.style.stringFormat)) {
            format.alignment = content.style.stringFormat.alignment;
        }
        var result = this.setContentFormat(content, format);
        if (result !== null && !isNullOrUndefined(result.format) && !isNullOrUndefined(result.size)) {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, result.size.width, result.size.height, result.format);
        }
        else {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, format);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.drawPageNumber = function (documentHeader, content) {
        var font = this.getFont(content);
        var brush = null;
        if (!isNullOrUndefined(content.style.textBrushColor)) {
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        else {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var pageNumber = new PdfPageNumberField(font, brush);
        pageNumber.numberStyle = this.getPageNumberStyle(content.pageNumberType);
        var compositeField;
        var format;
        if (!isNullOrUndefined(content.format)) {
            var total = '$total';
            var current = '$current';
            if (content.format.indexOf(total) !== -1 && content.format.indexOf(current) !== -1) {
                var pageCount = new PdfPageCountField(font);
                pageCount.numberStyle = this.getPageNumberStyle(content.pageNumberType);
                if (content.format.indexOf(total) > content.format.indexOf(current)) {
                    format = content.format.replace(current, '0');
                    format = format.replace(total, '1');
                }
                else {
                    format = content.format.replace(current, '1');
                    format = format.replace(total, '0');
                }
                compositeField = new PdfCompositeField(font, brush, format, pageNumber, pageCount);
            }
            else if (content.format.indexOf(current) !== -1 && content.format.indexOf(total) === -1) {
                format = content.format.replace(current, '0');
                compositeField = new PdfCompositeField(font, brush, format, pageNumber);
            }
            else {
                var pageCount = new PdfPageCountField(font);
                format = content.format.replace(total, '0');
                compositeField = new PdfCompositeField(font, brush, format, pageCount);
            }
        }
        else {
            format = '{0}';
            compositeField = new PdfCompositeField(font, brush, format, pageNumber);
        }
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var result = this.setContentFormat(content, compositeField.stringFormat);
        if (result !== null && !isNullOrUndefined(result.format) && !isNullOrUndefined(result.size)) {
            compositeField.stringFormat = result.format;
            compositeField.bounds = new RectangleF(x, y, result.size.width, result.size.height);
        }
        compositeField.draw(documentHeader.graphics, x, y);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.drawImage = function (documentHeader, content) {
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var width = (!isNullOrUndefined(content.size)) ? (content.size.width * 0.75) : undefined;
        var height = (!isNullOrUndefined(content.size)) ? (content.size.height * 0.75) : undefined;
        var image = new PdfBitmap(content.src);
        if (!isNullOrUndefined(width)) {
            documentHeader.graphics.drawImage(image, x, y, width, height);
        }
        else {
            documentHeader.graphics.drawImage(image, x, y);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.drawLine = function (documentHeader, content) {
        var x1 = content.points.x1 * 0.75;
        var y1 = content.points.y1 * 0.75;
        var x2 = content.points.x2 * 0.75;
        var y2 = content.points.y2 * 0.75;
        var pen = this.getPenFromContent(content);
        if (!isNullOrUndefined(content.style) && content.style !== null) {
            if (!isNullOrUndefined(content.style.penSize) && content.style.penSize !== null && typeof content.style.penSize === 'number') {
                pen.width = content.style.penSize * 0.75;
            }
            pen.dashStyle = this.getDashStyle(content.style.dashStyle);
        }
        documentHeader.graphics.drawLine(pen, x1, y1, x2, y2);
    };
    PdfExport.prototype.processAggregates = function (sRows, pdfGrid, border, font, brush, backgroundBrush, isCaption, captionRow, groupIndex, isGroupedFooter, isAggregate, gObj) {
        for (var _i = 0, sRows_1 = sRows; _i < sRows_1.length; _i++) {
            var row = sRows_1[_i];
            var leastCaptionSummaryIndex = -1;
            var index = 0;
            var isEmpty = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var value = [];
            var aggIdx = isAggregate ? 0 : 1;
            var gridRow = void 0;
            if (isNullOrUndefined(captionRow)) {
                gridRow = pdfGrid.rows.addRow();
                gridRow.style.setBorder(border);
                gridRow.style.setFont(font);
                gridRow.style.setTextBrush(brush);
                gridRow.style.setBackgroundBrush(backgroundBrush);
            }
            for (var i = 0; i < pdfGrid.columns.count + aggIdx; i++) {
                var cell = row.cells[parseInt(index.toString(), 10)];
                if (cell.cellType === CellType.DetailFooterIntent) {
                    i--;
                    index++;
                    continue;
                }
                if (!this.hideColumnInclude) {
                    while (cell.visible === undefined) {
                        if (cell.cellType === CellType.DetailFooterIntent) {
                            continue;
                        }
                        if (!isNullOrUndefined(captionRow)) {
                            if (!isNullOrUndefined(captionRow.cells.getCell(i).value)) {
                                value.push(captionRow.cells.getCell(i).value);
                                isEmpty = false;
                                if (!isCaption) {
                                    i += 1;
                                }
                            }
                            else {
                                value.push('');
                            }
                        }
                        else {
                            value.push('');
                        }
                        i += 1;
                        index = index + 1;
                        cell = row.cells[parseInt(index.toString(), 10)];
                    }
                    while (!isNullOrUndefined(cell.visible) && !cell.visible) {
                        index = index + 1;
                        cell = row.cells[parseInt(index.toString(), 10)];
                    }
                }
                if (cell.isDataCell) {
                    var templateFn = {};
                    var footerTemplate = !isNullOrUndefined(cell.column.footerTemplate);
                    var groupFooterTemplate = !isNullOrUndefined(cell.column.groupFooterTemplate);
                    var groupCaptionTemplate = !isNullOrUndefined(cell.column.groupCaptionTemplate);
                    if (footerTemplate || groupCaptionTemplate || groupFooterTemplate) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var result = this.getTemplateFunction(templateFn, i, leastCaptionSummaryIndex, cell);
                        templateFn = result.templateFunction;
                        leastCaptionSummaryIndex = result.leastCaptionSummaryIndex;
                        var txt = void 0;
                        var data = row.data[cell.column.field ? cell.column.field : cell.column.columnName];
                        if ((this.parent.isReact || this.parent.isVue || this.parent.isVue3 || this.parent.isAngular) &&
                            !(typeof cell.column.footerTemplate === 'string' || typeof cell.column.groupFooterTemplate === 'string' || typeof cell.column.groupCaptionTemplate === 'string')) {
                            txt = data[(cell.column.type)];
                            txt = !isNullOrUndefined(txt) ? txt : '';
                        }
                        else {
                            txt = (templateFn[getEnumValue(CellType, cell.cellType)](data, this.parent));
                            txt = this.parent.isVue3 && !isNullOrUndefined(txt[1]) ? txt[1].textContent
                                : !isNullOrUndefined(txt[0]) ? txt[0].textContent : '';
                        }
                        isEmpty = false;
                        var args = {
                            row: row,
                            type: footerTemplate ? 'Footer' : groupFooterTemplate ? 'GroupFooter' : 'GroupCaption',
                            style: isNullOrUndefined(captionRow) ? gridRow.cells : captionRow.cells,
                            cell: cell,
                            value: txt
                        };
                        this.parent.trigger(events.pdfAggregateQueryCellInfo, args);
                        value.push(args.value);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var result = this.getSummaryWithoutTemplate(row.data[cell.column.field]);
                        if (!isNullOrUndefined(result)) {
                            value.push(result);
                        }
                    }
                }
                else {
                    value.push('');
                }
                if (isEmpty && value[parseInt(i.toString(), 10)] !== '' && !isNullOrUndefined(value[parseInt(i.toString(), 10)]) && value[parseInt(i.toString(), 10)] !== null) {
                    isEmpty = false;
                }
                index += 1;
            }
            if (!isAggregate) {
                if (!isCaption) {
                    value.splice(0, 1);
                }
                else {
                    for (var i = gObj.groupSettings.columns.length; i < value.length - 1; i++) {
                        value[parseInt(i.toString(), 10)] = value[i + 1];
                        value[i + 1] = value[i + 2] ? value[i + 2] : '';
                    }
                }
            }
            if (!isEmpty) {
                if (!isCaption) {
                    for (var i = 0; i < pdfGrid.columns.count; i++) {
                        gridRow.cells.getCell(i).value = value[parseInt(i.toString(), 10)].toString();
                    }
                }
                else {
                    for (var i = 0; i < pdfGrid.columns.count; i++) {
                        captionRow.cells.getCell(i).value = value[parseInt(i.toString(), 10)].toString();
                        if (i === groupIndex && leastCaptionSummaryIndex !== -1 && leastCaptionSummaryIndex !== 1) {
                            captionRow.cells.getCell(i).columnSpan = (leastCaptionSummaryIndex - 1) - groupIndex;
                        }
                        else if (i === groupIndex && leastCaptionSummaryIndex === -1) {
                            captionRow.cells.getCell(i).columnSpan = pdfGrid.columns.count - groupIndex;
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.getTemplateFunction = function (templateFn, index, leastCaptionSummaryIndex, cell) {
        if (!isNullOrUndefined(cell.column.footerTemplate) && cell.cellType === CellType.Summary) {
            templateFn[getEnumValue(CellType, CellType.Summary)] = compile(cell.column.footerTemplate);
        }
        else if (!isNullOrUndefined(cell.column.groupCaptionTemplate)) {
            if (leastCaptionSummaryIndex === -1) {
                leastCaptionSummaryIndex = index;
            }
            templateFn[getEnumValue(CellType, CellType.CaptionSummary)] = compile(cell.column.groupCaptionTemplate);
        }
        else {
            templateFn[getEnumValue(CellType, CellType.GroupSummary)] = compile(cell.column.groupFooterTemplate);
        }
        return { templateFunction: templateFn, leastCaptionSummaryIndex: leastCaptionSummaryIndex };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.getSummaryWithoutTemplate = function (data) {
        if (!isNullOrUndefined(data.Sum)) {
            return data.Sum;
        }
        else if (!isNullOrUndefined(data.Average)) {
            return data.Average;
        }
        else if (!isNullOrUndefined(data.Max)) {
            return data.Max;
        }
        else if (!isNullOrUndefined(data.Min)) {
            return data.Min;
        }
        else if (!isNullOrUndefined(data.Count)) {
            return data.Count;
        }
        else if (!isNullOrUndefined(data.TrueCount)) {
            return data.TrueCount;
        }
        else if (!isNullOrUndefined(data.FalseCount)) {
            return data.FalseCount;
        }
        else if (!isNullOrUndefined(data.Custom)) {
            return data.Custom;
        }
    };
    /**
     * Set alignment, width and type of the values of the column
     *
     * @param {Column[]} gridColumns - specifies the grid column
     * @param {PdfGrid} pdfGrid - specifies the pdfGrid
     * @param {ExportHelper} helper - specifies the helper
     * @param {IGrid} gObj - specifies the IGrid
     * @param {boolean} allowHorizontalOverflow - specifies the allowHorizontalOverflow
     * @returns {void}
     */
    PdfExport.prototype.setColumnProperties = function (gridColumns, pdfGrid, helper, gObj, allowHorizontalOverflow) {
        var startIndex = gObj.groupSettings.columns.length ? gObj.groupSettings.columns.length - 1 : 0;
        for (var i = 0; i < startIndex; i++) {
            pdfGrid.columns.getColumn(i).width = 20;
        }
        for (var i = 0; i < gridColumns.length; i++) {
            if (!isNullOrUndefined(gridColumns[parseInt(i.toString(), 10)].textAlign)) {
                pdfGrid.columns.getColumn(i + startIndex).format = this
                    .getHorizontalAlignment(gridColumns[parseInt(i.toString(), 10)].textAlign);
            }
            // Need to add width consideration with % value
            if (pdfGrid.style.allowHorizontalOverflow && !isNullOrUndefined(gridColumns[parseInt(i.toString(), 10)].width)
                && allowHorizontalOverflow) {
                pdfGrid.columns.getColumn(i + startIndex).width = typeof gridColumns[parseInt(i.toString(), 10)].width === 'number' ?
                    gridColumns[parseInt(i.toString(), 10)].width * 0.75 :
                    helper.getConvertedWidth(gridColumns[parseInt(i.toString(), 10)].width) * 0.75;
            }
        }
    };
    /**
     * set default style properties of each rows in exporting grid
     *
     * @param {PdfGridRow} row - specifies the PdfGridRow
     * @param {PdfBorders} border - specifies the PdfBorders
     * @returns {PdfGrid} returns the pdfgrid
     * @private
     */
    PdfExport.prototype.setRecordThemeStyle = function (row, border) {
        if (!isNullOrUndefined(this.gridTheme) && !isNullOrUndefined(this.gridTheme.record)) {
            var fontFamily = !isNullOrUndefined(this.gridTheme.record.fontName) ?
                this.getFontFamily(this.gridTheme.record.fontName) : PdfFontFamily.Helvetica;
            var fontSize = !isNullOrUndefined(this.gridTheme.record.fontSize) ? this.gridTheme.record.fontSize : 9.75;
            var fontStyle = this.getFontStyle(this.gridTheme.record);
            var font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
            if (!isNullOrUndefined(this.gridTheme.record.font)) {
                font = this.gridTheme.record.font;
            }
            row.style.setFont(font);
            var pdfColor = new PdfColor();
            if (!isNullOrUndefined(this.gridTheme.record.fontColor)) {
                var penBrushColor = this.hexToRgb(this.gridTheme.record.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            row.style.setTextBrush(new PdfSolidBrush(pdfColor));
        }
        else {
            row.style.setTextBrush(new PdfSolidBrush(new PdfColor(0, 0, 0)));
        }
        var borderRecord = this.gridTheme && this.gridTheme.record &&
            this.gridTheme.record.border ? this.getBorderStyle(this.gridTheme.record.border) : border;
        row.style.setBorder(borderRecord);
        return row;
    };
    /**
     * generate the formatted cell values
     *
     * @param {PdfBorders} border - specifies the border
     * @param {Column[]} columns - specifies the columns
     * @param {IGrid} gObj - specifies the IGrid
     * @param {Object[]} dataSource - specifies the datasource
     * @param {PdfGrid} pdfGrid - specifies the pdfGrid
     * @param {number} startIndex - specifies the startindex
     * @param {PdfExportProperties} pdfExportProperties - specifies the pdfExportProperties
     * @param {ExportHelper} helper - specifies the helper
     * @param {number} rowIndex - specifies the rowIndex
     * @returns {number} returns the number of records
     * @private
     */
    PdfExport.prototype.processRecord = function (border, columns, gObj, dataSource, pdfGrid, startIndex, pdfExportProperties, helper, rowIndex) {
        var rows = helper.getGridRowModel(columns, dataSource, gObj, rowIndex);
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            rowIndex++;
            this.rowIndex = rowIndex;
            // create a new row and set default style properties
            var gridRow = this.setRecordThemeStyle(pdfGrid.rows.addRow(), border);
            var cellLength = row.cells.length;
            for (var j = 0; j < cellLength; j++) {
                var gridCell = row.cells[parseInt(j.toString(), 10)];
                if (gridCell.cellType !== CellType.Data) {
                    continue;
                }
                var column = gridCell.column;
                var field = column.field;
                var cellValue = !isNullOrUndefined(field) ? column.valueAccessor(field, row.data, column) : '';
                var value = !isNullOrUndefined(cellValue) ? cellValue : '';
                var foreignKeyData = void 0;
                if (column.isForeignColumn && column.isForeignColumn()) {
                    foreignKeyData = helper.getFData(value, column);
                    value = getValue(column.foreignKeyValue, foreignKeyData);
                }
                var data = row.data;
                var cell = gridRow.cells.getCell(j);
                var args = {
                    data: data,
                    value: value,
                    column: column,
                    style: undefined,
                    colSpan: 1,
                    cell: cell
                };
                args.value = args.column.type === 'boolean' && typeof args.value === 'string' ? args.value :
                    this.exportValueFormatter.formatCellValue(args);
                this.parent.trigger(events.pdfQueryCellInfo, args);
                if (!isNullOrUndefined(args.image)) {
                    args.value = new PdfBitmap(args.image.base64);
                    args.value.height = args.image.height || args.value.height;
                    args.value.width = args.image.width || args.value.width;
                }
                cell.value = args.value;
                if (!isNullOrUndefined(args.hyperLink)) {
                    cell.value = this.setHyperLink(args);
                }
                if (!isNullOrUndefined(args.style)) {
                    this.processCellStyle(cell, args);
                }
                if (args.colSpan > 1) {
                    if ((j + 1 + args.colSpan) > gridRow.cells.count) {
                        args.colSpan = gridRow.cells.count - (j + 1);
                    }
                    cell.columnSpan = args.colSpan;
                    for (var i = 1; i < cell.columnSpan; i++) {
                        var spanCell = gridRow.cells.getCell(j + i);
                        spanCell.value = '';
                    }
                    j += (args.colSpan - 1);
                }
            }
            if (row.isExpand) {
                var gridRow_1 = this.setRecordThemeStyle(pdfGrid.rows.addRow(), border);
                var startIndexVal = (this.parent.childGrid || this.parent.detailTemplate) ? 0 : startIndex;
                var cell = gridRow_1.cells.getCell(startIndexVal);
                cell.columnSpan = gridRow_1.cells.count - (startIndexVal);
                cell.style.cellPadding = new PdfPaddings(10, 10, 10, 10);
                if (this.parent.childGrid) {
                    gObj.isPrinting = true;
                    var exportType = (!isNullOrUndefined(pdfExportProperties) && pdfExportProperties.exportType) ?
                        pdfExportProperties.exportType : 'AllPages';
                    var returnValue = this.helper.createChildGrid(gObj, row, exportType, this.gridPool);
                    var childGridObj = returnValue.childGrid;
                    var element = returnValue.element;
                    childGridObj.actionFailure =
                        helper.failureHandler(this.gridPool, childGridObj, this.globalResolve);
                    var childExportProperties = extend(pdfExportProperties, {
                        columns: null,
                        dataSource: null,
                        query: null
                    });
                    var args = {
                        childGrid: childGridObj, row: row, cell: cell, exportProperties: childExportProperties
                    };
                    this.parent.trigger(events.exportDetailDataBound, args);
                    childGridObj.beforeDataBound = this.childGridCell(cell, childGridObj, childExportProperties);
                    childGridObj.appendTo(element);
                }
                else if (this.parent.detailTemplate) {
                    var args = { parentRow: row, row: gridRow_1, value: {}, action: 'pdfexport', gridInstance: gObj };
                    this.parent.trigger(events.exportDetailTemplate, args);
                    cell.value = this.processDetailTemplate(args);
                }
            }
            this.parent.notify(events.exportRowDataBound, { type: 'pdf', rowObj: row });
        }
        return rowIndex;
    };
    PdfExport.prototype.processDetailTemplate = function (templateData) {
        var _this = this;
        if (templateData.value.columnHeader || templateData.value.rows) {
            // create a grid
            var pdfGrid = new PdfGrid();
            // get header theme style
            var headerThemeStyle = this.getHeaderThemeStyle();
            var border_1 = headerThemeStyle.border;
            var headerFont_1 = headerThemeStyle.font;
            var headerBrush_1 = headerThemeStyle.brush;
            var processRow = function (row, gridRow, isHeader) {
                if (isHeader) {
                    gridRow.style.setBorder(border_1);
                    gridRow.style.setFont(headerFont_1);
                    gridRow.style.setTextBrush(headerBrush_1);
                }
                for (var j = 0; j < row.cells.length; j++) {
                    var currentCell = row.cells[parseInt(j.toString(), 10)];
                    var pdfCell = gridRow.cells.getCell(currentCell.index ? currentCell.index : j);
                    if (currentCell.rowSpan > 0) {
                        pdfCell.rowSpan = currentCell.rowSpan;
                    }
                    if (currentCell.colSpan > 0) {
                        pdfCell.columnSpan = currentCell.colSpan;
                    }
                    pdfCell.value = currentCell.value;
                    if (!isNullOrUndefined(currentCell.image)) {
                        pdfCell.value = new PdfBitmap(currentCell.image.base64);
                        pdfCell.value.height = currentCell.image.height;
                        pdfCell.value.width = currentCell.image.width;
                    }
                    if (!isNullOrUndefined(currentCell.hyperLink)) {
                        pdfCell.value = _this.setHyperLink(currentCell);
                    }
                    if (!isNullOrUndefined(currentCell.style)) {
                        var cellStyle = {
                            style: {
                                backgroundColor: currentCell.style.backColor,
                                textAlignment: currentCell.style.pdfTextAlignment,
                                verticalAlignment: currentCell.style.pdfVerticalAlignment,
                                textBrushColor: currentCell.style.fontColor,
                                textPenColor: currentCell.style.pdfTextPenColor,
                                fontFamily: currentCell.style.pdfFontFamily,
                                fontSize: currentCell.style.fontSize,
                                bold: currentCell.style.bold,
                                italic: currentCell.style.italic,
                                underline: currentCell.style.underline,
                                strikeout: currentCell.style.strikeThrough,
                                border: currentCell.style.pdfBorder,
                                paragraphIndent: currentCell.style.pdfParagraphIndent,
                                cellPadding: currentCell.style.pdfCellPadding
                            }
                        };
                        _this.processCellStyle(pdfCell, cellStyle);
                    }
                }
            };
            if (templateData.value.columnCount) {
                pdfGrid.columns.add(templateData.value.columnCount);
            }
            else {
                if (templateData.value.columnHeader && templateData.value.columnHeader.length) {
                    pdfGrid.columns.add(templateData.value.columnHeader[0].cells.length);
                }
                else if (templateData.value.rows && templateData.value.rows.length) {
                    pdfGrid.columns.add(templateData.value.rows[0].cells.length);
                }
            }
            if (templateData.value.columnHeader) {
                pdfGrid.headers.add(templateData.value.columnHeader.length);
                for (var i = 0; i < templateData.value.columnHeader.length; i++) {
                    var gridHeader = pdfGrid.headers.getHeader(parseInt(i.toString(), 10));
                    processRow(templateData.value.columnHeader[parseInt(i.toString(), 10)], gridHeader, true);
                }
            }
            if (templateData.value.rows) {
                for (var _i = 0, _a = templateData.value.rows; _i < _a.length; _i++) {
                    var row = _a[_i];
                    // create a new row and set default style properties
                    var gridRow = this.setRecordThemeStyle(pdfGrid.rows.addRow(), border_1);
                    processRow(row, gridRow, false);
                }
            }
            return pdfGrid;
        }
        else if (templateData.value.image) {
            return new PdfBitmap(templateData.value.image.base64);
        }
        else if (templateData.value.text) {
            return templateData.value.text;
        }
        else if (templateData.value.hyperLink) {
            return this.setHyperLink(templateData.value);
        }
        return '';
    };
    PdfExport.prototype.setHyperLink = function (args) {
        // create the Text Web Link
        var textLink = new PdfTextWebLink();
        // set the hyperlink
        textLink.url = args.hyperLink.target;
        // set the link text
        textLink.text = args.hyperLink.displayText || args.hyperLink.target;
        // set the font
        textLink.font = new PdfStandardFont(PdfFontFamily.Helvetica, 9.75);
        // set the brush and pen for the text color
        textLink.brush = new PdfSolidBrush(new PdfColor(51, 102, 187));
        return textLink;
    };
    PdfExport.prototype.childGridCell = function (cell, childGridObj, pdfExportProperties) {
        var _this = this;
        return function (result) {
            childGridObj.beforeDataBound = null;
            result.cancel = true;
            cell.value = _this.processGridExport(childGridObj, result, pdfExportProperties);
            childGridObj.destroy();
            detach(childGridObj.element);
            _this.gridPool[childGridObj.id] = true;
            _this.helper.checkAndExport(_this.gridPool, _this.globalResolve);
            return cell;
        };
    };
    PdfExport.prototype.processCellStyle = function (cell, args) {
        if (!isNullOrUndefined(args.style.backgroundColor)) {
            var backColor = this.hexToRgb(args.style.backgroundColor);
            cell.style.backgroundBrush = new PdfSolidBrush(new PdfColor(backColor.r, backColor.g, backColor.b));
        }
        if (!isNullOrUndefined(args.style.textAlignment)) {
            cell.style.stringFormat = this.getHorizontalAlignment(args.style.textAlignment);
        }
        if (!isNullOrUndefined(args.style.cellPadding)) {
            cell.style.cellPadding = args.style.cellPadding;
        }
        if (!isNullOrUndefined(args.style.verticalAlignment)) {
            cell.style.stringFormat = this.getVerticalAlignment(args.style.verticalAlignment, cell.style.stringFormat);
        }
        if (!isNullOrUndefined(args.style.textBrushColor)) {
            var textBrushColor = this.hexToRgb(args.style.textBrushColor);
            cell.style.textBrush = new PdfSolidBrush(new PdfColor(textBrushColor.r, textBrushColor.g, textBrushColor.b));
        }
        if (!isNullOrUndefined(args.style.textPenColor)) {
            var textPenColor = this.hexToRgb(args.style.textPenColor);
            cell.style.textPen = new PdfPen(new PdfColor(textPenColor.r, textPenColor.g, textPenColor.b));
        }
        if (!isNullOrUndefined(args.style.fontFamily) || !isNullOrUndefined(args.style.fontSize) || !isNullOrUndefined(args.style.bold) ||
            !isNullOrUndefined(args.style.italic) || !isNullOrUndefined(args.style.underline) || !isNullOrUndefined(args.style.strikeout)) {
            cell.style.font = this.getFont(args);
        }
        if (!isNullOrUndefined(args.style.border)) {
            var border = new PdfBorders();
            var borderWidth = args.style.border.width;
            // set border width
            var width = (!isNullOrUndefined(borderWidth) && typeof borderWidth === 'number') ? (borderWidth * 0.75) : (undefined);
            // set border color
            var color = new PdfColor(196, 196, 196);
            if (!isNullOrUndefined(args.style.border.color)) {
                var borderColor = this.hexToRgb(args.style.border.color);
                color = new PdfColor(borderColor.r, borderColor.g, borderColor.b);
            }
            var pen = new PdfPen(color, width);
            // set border dashStyle 'Solid <default>, Dash, Dot, DashDot, DashDotDot'
            if (!isNullOrUndefined(args.style.border.dashStyle)) {
                pen.dashStyle = this.getDashStyle(args.style.border.dashStyle);
            }
            border.all = pen;
            cell.style.borders = border;
        }
        if (!isNullOrUndefined(args.style.paragraphIndent)) {
            cell.style.stringFormat = new PdfStringFormat();
            cell.style.stringFormat.paragraphIndent = args.style.paragraphIndent;
        }
    };
    /**
     * set text alignment of each columns in exporting grid
     *
     * @param {string} textAlign - specifies the textAlign
     * @param {PdfStringFormat} format - specifies the PdfStringFormat
     * @returns {PdfStringFormat} returns the PdfStringFormat
     * @private
     */
    PdfExport.prototype.getHorizontalAlignment = function (textAlign, format) {
        if (format === undefined) {
            format = new PdfStringFormat();
        }
        switch (textAlign) {
            case 'Right':
                format.alignment = PdfTextAlignment.Right;
                break;
            case 'Center':
                format.alignment = PdfTextAlignment.Center;
                break;
            case 'Justify':
                format.alignment = PdfTextAlignment.Justify;
                break;
            case 'Left':
                format.alignment = PdfTextAlignment.Left;
                break;
        }
        return format;
    };
    /**
     * set vertical alignment of each columns in exporting grid
     *
     * @param {string} verticalAlign - specifies the verticalAlign
     * @param {PdfStringFormat} format - specifies the PdfStringFormat
     * @param {string} textAlign - specifies the text align
     * @returns {PdfStringFormat} returns the PdfStringFormat
     * @private
     */
    PdfExport.prototype.getVerticalAlignment = function (verticalAlign, format, textAlign) {
        if (format === undefined) {
            format = new PdfStringFormat();
            format = this.getHorizontalAlignment(textAlign, format);
        }
        switch (verticalAlign) {
            case 'Bottom':
                format.lineAlignment = PdfVerticalAlignment.Bottom;
                break;
            case 'Middle':
                format.lineAlignment = PdfVerticalAlignment.Middle;
                break;
            case 'Top':
                format.lineAlignment = PdfVerticalAlignment.Top;
                break;
        }
        return format;
    };
    PdfExport.prototype.getFontFamily = function (fontFamily) {
        switch (fontFamily) {
            case 'TimesRoman':
                return 2;
            case 'Courier':
                return 1;
            case 'Symbol':
                return 3;
            case 'ZapfDingbats':
                return 4;
            default:
                return 0;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PdfExport.prototype.getFont = function (content) {
        if (content.font) {
            return content.font;
        }
        var fontSize = (!isNullOrUndefined(content.style.fontSize)) ? (content.style.fontSize * 0.75) : 9.75;
        var fontFamily = (!isNullOrUndefined(content.style.fontFamily)) ?
            (this.getFontFamily(content.style.fontFamily)) : PdfFontFamily.TimesRoman;
        var fontStyle = PdfFontStyle.Regular;
        if (!isNullOrUndefined(content.style.bold) && content.style.bold) {
            fontStyle |= PdfFontStyle.Bold;
        }
        if (!isNullOrUndefined(content.style.italic) && content.style.italic) {
            fontStyle |= PdfFontStyle.Italic;
        }
        if (!isNullOrUndefined(content.style.underline) && content.style.underline) {
            fontStyle |= PdfFontStyle.Underline;
        }
        if (!isNullOrUndefined(content.style.strikeout) && content.style.strikeout) {
            fontStyle |= PdfFontStyle.Strikeout;
        }
        return new PdfStandardFont(fontFamily, fontSize, fontStyle);
    };
    PdfExport.prototype.getPageNumberStyle = function (pageNumberType) {
        switch (pageNumberType) {
            case 'LowerLatin':
                return 2;
            case 'LowerRoman':
                return 3;
            case 'UpperLatin':
                return 4;
            case 'UpperRoman':
                return 5;
            default:
                return 1;
        }
    };
    PdfExport.prototype.setContentFormat = function (content, format) {
        if (!isNullOrUndefined(content.size)) {
            var width = content.size.width * 0.75;
            var height = content.size.height * 0.75;
            format = new PdfStringFormat(PdfTextAlignment.Left, PdfVerticalAlignment.Middle);
            if (!isNullOrUndefined(content.style.hAlign)) {
                switch (content.style.hAlign) {
                    case 'Right':
                        format.alignment = PdfTextAlignment.Right;
                        break;
                    case 'Center':
                        format.alignment = PdfTextAlignment.Center;
                        break;
                    case 'Justify':
                        format.alignment = PdfTextAlignment.Justify;
                        break;
                    default:
                        format.alignment = PdfTextAlignment.Left;
                }
            }
            if (!isNullOrUndefined(content.style.vAlign)) {
                format = this.getVerticalAlignment(content.style.vAlign, format);
            }
            return { format: format, size: new SizeF(width, height) };
        }
        return null;
    };
    PdfExport.prototype.getPageSize = function (pageSize) {
        switch (pageSize) {
            case 'Letter':
                return new SizeF(612, 792);
            case 'Note':
                return new SizeF(540, 720);
            case 'Legal':
                return new SizeF(612, 1008);
            case 'A0':
                return new SizeF(2380, 3368);
            case 'A1':
                return new SizeF(1684, 2380);
            case 'A2':
                return new SizeF(1190, 1684);
            case 'A3':
                return new SizeF(842, 1190);
            case 'A5':
                return new SizeF(421, 595);
            case 'A6':
                return new SizeF(297, 421);
            case 'A7':
                return new SizeF(210, 297);
            case 'A8':
                return new SizeF(148, 210);
            case 'A9':
                return new SizeF(105, 148);
            // case 'A10':
            // return new SizeF(74, 105);
            case 'B0':
                return new SizeF(2836, 4008);
            case 'B1':
                return new SizeF(2004, 2836);
            case 'B2':
                return new SizeF(1418, 2004);
            case 'B3':
                return new SizeF(1002, 1418);
            case 'B4':
                return new SizeF(709, 1002);
            case 'B5':
                return new SizeF(501, 709);
            case 'Archa':
                return new SizeF(648, 864);
            case 'Archb':
                return new SizeF(864, 1296);
            case 'Archc':
                return new SizeF(1296, 1728);
            case 'Archd':
                return new SizeF(1728, 2592);
            case 'Arche':
                return new SizeF(2592, 3456);
            case 'Flsa':
                return new SizeF(612, 936);
            case 'HalfLetter':
                return new SizeF(396, 612);
            case 'Letter11x17':
                return new SizeF(792, 1224);
            case 'Ledger':
                return new SizeF(1224, 792);
            default:
                return new SizeF(595, 842);
        }
    };
    PdfExport.prototype.getDashStyle = function (dashStyle) {
        switch (dashStyle) {
            case 'Dash':
                return 1;
            case 'Dot':
                return 2;
            case 'DashDot':
                return 3;
            case 'DashDotDot':
                return 4;
            default:
                return 0;
        }
    };
    PdfExport.prototype.getPenFromContent = function (content) {
        var pen = new PdfPen(new PdfColor(0, 0, 0));
        if (!isNullOrUndefined(content.style) && content.style !== null && !isNullOrUndefined(content.style.penColor)) {
            var penColor = this.hexToRgb(content.style.penColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        return pen;
    };
    PdfExport.prototype.getBrushFromContent = function (content) {
        var brush = null;
        if (!isNullOrUndefined(content.style.textBrushColor)) {
            /* tslint:disable-next-line:max-line-length */
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        return brush;
    };
    PdfExport.prototype.hexToRgb = function (hex) {
        if (hex === null || hex === '' || hex.length !== 7) {
            throw new Error('please set valid hex value for color...');
        }
        hex = hex.substring(1);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r: r, g: g, b: b };
    };
    PdfExport.prototype.getFontStyle = function (theme) {
        var fontStyle = PdfFontStyle.Regular;
        if (!isNullOrUndefined(theme) && theme.bold) {
            fontStyle |= PdfFontStyle.Bold;
        }
        if (!isNullOrUndefined(theme) && theme.italic) {
            fontStyle |= PdfFontStyle.Italic;
        }
        if (!isNullOrUndefined(theme) && theme.underline) {
            fontStyle |= PdfFontStyle.Underline;
        }
        if (!isNullOrUndefined(theme) && theme.strikeout) {
            fontStyle |= PdfFontStyle.Strikeout;
        }
        return fontStyle;
    };
    PdfExport.prototype.getBorderStyle = function (border) {
        var borders = new PdfBorders();
        if (!isNullOrUndefined(border)) {
            var borderWidth = border.width;
            // set border width
            var width = (!isNullOrUndefined(borderWidth) && typeof borderWidth === 'number') ? borderWidth * 0.75 : undefined;
            // set border color
            var color = new PdfColor(196, 196, 196);
            if (!isNullOrUndefined(border.color)) {
                var borderColor = this.hexToRgb(border.color);
                color = new PdfColor(borderColor.r, borderColor.g, borderColor.b);
            }
            var pen = new PdfPen(color, width);
            // set border dashStyle 'Solid <default>, Dash, Dot, DashDot, DashDotDot'
            if (!isNullOrUndefined(border.dashStyle)) {
                pen.dashStyle = this.getDashStyle(border.dashStyle);
            }
            borders.all = pen;
        }
        else {
            borders.all = new PdfPen(new PdfColor(234, 234, 234));
        }
        return borders;
    };
    PdfExport.prototype.destroy = function () {
        //destroy for exporting
    };
    return PdfExport;
}());
export { PdfExport };
