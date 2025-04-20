var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getCell, setCell, getSheet } from '../base/index';
import { checkDateFormat, executeTaskAsync, getAutoDetectFormatParser, isNumber } from '../common/index';
import { checkIsFormula, workbookFormulaOperation, removeUniquecol } from '../common/index';
import * as events from '../common/event';
import { SaveWorker } from '../workers/save-worker';
import { updateSheetFromDataSource } from '../common/index';
import { detach } from '@syncfusion/ej2-base';
/**
 * @hidden
 * The `WorkbookSave` module is used to handle the save action in Workbook library.
 */
var WorkbookSave = /** @class */ (function (_super) {
    __extends(WorkbookSave, _super);
    /**
     * Constructor for WorkbookSave module in Workbook library.
     *
     * @private
     * @param {Workbook} parent - Specifies the workbook.
     */
    function WorkbookSave(parent) {
        var _this = _super.call(this, parent) || this;
        _this.isProcessCompleted = false;
        _this.saveJSON = {};
        _this.isFullPost = false;
        _this.needBlobData = false;
        _this.customParams = null;
        _this.pdfLayoutSettings = { fitSheetOnOnePage: false };
        _this.addEventListener();
        return _this;
    }
    /**
     * Get the module name.
     *
     * @returns {string} - To Get the module name.
     * @private
     */
    WorkbookSave.prototype.getModuleName = function () {
        return 'workbookSave';
    };
    /**
     * To destroy the WorkbookSave module.
     *
     * @returns {void} - To destroy the WorkbookSave module.
     * @hidden
     */
    WorkbookSave.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * @hidden
     * @returns {void} - add Event Listener
     */
    WorkbookSave.prototype.addEventListener = function () {
        this.parent.on(events.beginSave, this.initiateSave, this);
        this.parent.on('getStringifyObject', this.performStringifyAction, this);
    };
    /**
     * @hidden
     * @returns {void} - remove Event Listener.
     */
    WorkbookSave.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(events.beginSave, this.initiateSave);
            this.parent.off('getStringifyObject', this.performStringifyAction);
        }
    };
    /**
     * Initiate save process.
     *
     * @hidden
     * @param {Object} args - Specify the args.
     * @returns {void} - Initiate save process.
     */
    WorkbookSave.prototype.initiateSave = function (args) {
        var saveSettings = args.saveSettings;
        this.saveSettings = {
            saveType: saveSettings.saveType,
            url: saveSettings.url,
            fileName: saveSettings.fileName || 'Sample'
            //passWord: saveSettings.passWord
        };
        this.isFullPost = args.isFullPost;
        this.needBlobData = args.needBlobData;
        if (this.needBlobData) {
            this.isFullPost = false;
        }
        this.customParams = args.customParams;
        this.pdfLayoutSettings = args.pdfLayoutSettings;
        this.updateBasicSettings();
        this.processSheets(saveSettings.autoDetectFormat, args.jsonConfig);
    };
    /**
     * Update save JSON with basic settings.
     *
     * @hidden
     * @returns {void} - Update save JSON with basic settings.
     */
    WorkbookSave.prototype.updateBasicSettings = function () {
        var jsonStr = this.getStringifyObject(this.parent, ['sheets', '_isScalar', 'observers', 'closed', 'isStopped', 'hasError',
            '__isAsync', 'beforeCellFormat', 'beforeCellRender', 'beforeDataBound', 'beforeOpen', 'beforeSave', 'beforeSelect',
            'beforeSort', 'cellEdit', 'cellEdited', 'cellEditing', 'cellSave', 'beforeCellSave', 'contextMenuItemSelect', 'contextMenuBeforeClose',
            'contextMenuBeforeOpen', 'created', 'dataBound', 'fileMenuItemSelect', 'fileMenuBeforeClose', 'fileMenuBeforeOpen',
            'saveComplete', 'sortComplete', 'select', 'actionBegin', 'actionComplete', 'afterHyperlinkClick', 'afterHyperlinkCreate',
            'beforeHyperlinkClick', 'beforeHyperlinkCreate', 'openComplete', 'openFailure', 'queryCellInfo', 'dialogBeforeOpen',
            'dataSourceChanged', 'beforeConditionalFormat', 'beforeCellUpdate']);
        var basicSettings = JSON.parse(jsonStr);
        var sheetCount = this.parent.sheets.length;
        if (sheetCount) {
            basicSettings.sheets = [];
        }
        this.saveJSON = basicSettings;
        this.saveJSON.filterCollection = [];
    };
    /**
     * Process sheets properties.
     *
     * @param {boolean} autoDetectFormat - Auto detect the format based on the cell value.
     * @param {SerializationOptions} jsonConfig - Specify the serialization options to exclude specific features from the JSON.
     * @hidden
     * @returns {void} - Process sheets properties.
     */
    WorkbookSave.prototype.processSheets = function (autoDetectFormat, jsonConfig) {
        var _this = this;
        var skipProps = ['dataSource', 'startCell', 'query', 'showFieldAsHeader', 'result'];
        if (this.parent.isAngular) {
            skipProps.push('template');
        }
        if (jsonConfig) {
            if (jsonConfig.onlyValues) {
                skipProps.push.apply(skipProps, ['style', 'formula', 'format', 'conditionalFormats', 'validation',
                    'hyperlink', 'wrap', 'chart', 'image', 'notes']);
            }
            else {
                var ignoreProps = {
                    style: jsonConfig.ignoreStyle,
                    formula: jsonConfig.ignoreFormula,
                    format: jsonConfig.ignoreFormat,
                    conditionalFormats: jsonConfig.ignoreConditionalFormat,
                    validation: jsonConfig.ignoreValidation,
                    wrap: jsonConfig.ignoreWrap,
                    chart: jsonConfig.ignoreChart,
                    image: jsonConfig.ignoreImage,
                    notes: jsonConfig.ignoreNote
                };
                if (jsonConfig.ignoreFreezePane) {
                    skipProps.push.apply(skipProps, ['frozenColumns', 'frozenRows']);
                }
                for (var prop in ignoreProps) {
                    if (ignoreProps[prop]) {
                        skipProps.push(prop);
                    }
                }
            }
        }
        var isNotLoaded;
        var isDataBinding;
        var sheet;
        var range;
        for (var sheetIdx = 0, sheetCount = this.parent.sheets.length; sheetIdx < sheetCount; sheetIdx++) {
            sheet = this.parent.sheets[sheetIdx];
            isNotLoaded = false;
            isDataBinding = false;
            for (var rangeIdx = 0, rangeCount = sheet.ranges.length; rangeIdx < rangeCount; rangeIdx++) {
                range = sheet.ranges[rangeIdx];
                if (range.dataSource) {
                    isDataBinding = true;
                    if (!range.info || !range.info.loadedRange || !range.info.loadedRange.length) {
                        isNotLoaded = true;
                        break;
                    }
                }
            }
            if (isNotLoaded) {
                var loadCompleteHandler = function (idx) {
                    executeTaskAsync(_this, _this.processSheet, _this.updateSheet, [_this.getStringifyObject(_this.parent.sheets[idx], skipProps, idx, false, true), idx], null, _this.parent);
                };
                this.parent.notify(updateSheetFromDataSource, { sheet: sheet, sheetIndex: sheetIdx, loadComplete: loadCompleteHandler.bind(this, sheetIdx),
                    loadFromStartCell: true, autoDetectFormat: autoDetectFormat });
            }
            else {
                executeTaskAsync(this, this.processSheet, this.updateSheet, [this.getStringifyObject(sheet, skipProps, sheetIdx, autoDetectFormat && isDataBinding, true), sheetIdx], null, this.parent);
            }
        }
    };
    /**
     * Update processed sheet data.
     *
     * @hidden
     * @param {Object[]} data - Specifies the data.
     * @returns {void} - Update processed sheet data.
     */
    WorkbookSave.prototype.updateSheet = function (data) {
        this.saveJSON.sheets[data[0]] = data[1];
        this.isProcessCompleted = this.getSheetLength(this.saveJSON.sheets) === this.parent.sheets.length;
        if (this.isProcessCompleted) {
            this.save(this.saveSettings);
        }
    };
    WorkbookSave.prototype.getSheetLength = function (sheets) {
        var len = 0;
        sheets.forEach(function (sheet) {
            if (sheet) {
                len++;
            }
        });
        return len;
    };
    /**
     * Save process.
     *
     * @hidden
     * @param {SaveOptions} saveSettings - Specifies the save settings props.
     * @returns {void} - Save process.
     */
    WorkbookSave.prototype.save = function (saveSettings) {
        var args = { cancel: false, jsonObject: this.saveJSON };
        this.parent.notify(events.onSave, args);
        if (!args.cancel) {
            if (this.isFullPost) {
                this.initiateFullPostSave();
                this.saveJSON = {};
            }
            else {
                executeTaskAsync(this, { 'workerTask': this.processSave }, this.updateSaveResult, [this.saveJSON, saveSettings, this.customParams, this.pdfLayoutSettings], true, this.parent);
            }
        }
    };
    /**
     * Update final save data.
     *
     * @hidden
     * @param {Object | Blob} result - specify the sve result.
     * @returns {void} - Update final save data.
     */
    WorkbookSave.prototype.updateSaveResult = function (result) {
        if (result.isFormDataError) {
            this.processSave(this.saveJSON, this.saveSettings, this.customParams, this.pdfLayoutSettings, this.updateSaveResult);
            return;
        }
        this.saveJSON = {};
        var args = {
            status: 'Success',
            message: '',
            url: this.saveSettings.url,
            fileName: this.saveSettings.fileName,
            saveType: this.saveSettings.saveType,
            blobData: null
        };
        if (typeof (result) === 'object' && result.error) {
            args.status = 'Failure';
            args.message = result.error.toString();
        }
        else if (typeof (result) === 'object' && result.dialog) {
            this.parent.notify(events.saveError, { content: result.dialog });
        }
        else {
            if (this.needBlobData) {
                args.blobData = result;
            }
            else {
                this.ClientFileDownload(result);
            }
        }
        this.parent.trigger('saveComplete', args);
        this.parent.notify(events.saveCompleted, args);
    };
    WorkbookSave.prototype.ClientFileDownload = function (blobData) {
        var anchor = this.parent.createElement('a', { attrs: { download: this.getFileNameWithExtension() } });
        var url = URL.createObjectURL(blobData);
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
    };
    WorkbookSave.prototype.initiateFullPostSave = function () {
        var keys = Object.keys(this.saveSettings);
        var i;
        var formElem = this.parent.createElement('form', { attrs: { method: 'POST', action: this.saveSettings.url } });
        var inputElem = this.parent.createElement('input', { attrs: { type: 'hidden', name: 'JSONData' } });
        inputElem.value = JSON.stringify(this.saveJSON);
        formElem.appendChild(inputElem);
        for (i = 0; i < keys.length; i++) {
            inputElem = this.parent.createElement('input', { attrs: { type: 'hidden', name: keys[i] } });
            inputElem.value = this.saveSettings[keys[i]];
            formElem.appendChild(inputElem);
        }
        keys = Object.keys(this.customParams);
        for (i = 0; i < keys.length; i++) {
            inputElem = this.parent.createElement('input', { attrs: { type: 'hidden', name: keys[i] } });
            inputElem.value = this.customParams[keys[i]];
            formElem.appendChild(inputElem);
        }
        inputElem = this.parent.createElement('input', { attrs: { type: 'hidden', name: 'pdfLayoutSettings' } });
        inputElem.value = JSON.stringify(this.pdfLayoutSettings);
        formElem.appendChild(inputElem);
        document.body.appendChild(formElem);
        formElem.submit();
        detach(formElem);
        this.parent.notify(events.saveCompleted, {});
    };
    WorkbookSave.prototype.performStringifyAction = function (args) {
        args.model = '{"jsonObject":{"Workbook":{"sheets":[';
        for (var sheetIdx = 0, sheetCount = this.parent.sheets.length - 1; sheetIdx <= sheetCount; sheetIdx++) {
            args.model += this.getStringifyObject(this.parent.sheets[sheetIdx], args.skipProps, sheetIdx) +
                (sheetIdx < sheetCount ? ',' : ']}}}');
        }
    };
    /**
     * Get stringified workbook object.
     *
     * @hidden
     * @param {object} model - Specifies the workbook or sheet model.
     * @param {string[]} skipProp - specifies the skipprop.
     * @param {number} sheetIdx - Specifies the sheet index.
     * @param {boolean} autoDetectFormat - Auto detect the format based on the cell value.
     * @param {boolean} isSaveAction - Specifies whether the call is for sheet processing during save action.
     * @returns {string} - Get stringified workbook object.
     */
    WorkbookSave.prototype.getStringifyObject = function (model, skipProp, sheetIdx, autoDetectFormat, isSaveAction) {
        var _this = this;
        if (skipProp === void 0) { skipProp = []; }
        if (sheetIdx === 0) {
            this.parent.notify(removeUniquecol, { clearAll: true });
        }
        if (isSaveAction) {
            this.parent.notify(events.setFilteredCollection, { sheetIdx: sheetIdx, isSaveAction: true, saveJson: this.saveJSON });
        }
        var chartColl = [];
        var chartModel;
        var autoDetectFormatFn = autoDetectFormat && getAutoDetectFormatParser(this.parent);
        var json = JSON.stringify(model, function (key, value) {
            if (skipProp.indexOf(key) > -1) {
                return undefined;
            }
            else if (key === 'cellStyle') {
                return _this.parent.commonCellStyle;
            }
            else {
                if (value && value.cells) {
                    for (var i = 0, len = value.cells.length; i < len; i++) {
                        var cell = value.cells[i];
                        var cellIdx = [Number(key), i];
                        if (cell) {
                            if (cell.value) {
                                if (autoDetectFormat && !cell.formula) {
                                    autoDetectFormatFn(cell);
                                }
                            }
                            else if (cell.formula && cell.formula.indexOf('=UNIQUE(') < 0) {
                                if (_this.parent.calculationMode === 'Automatic') {
                                    _this.parent.notify(workbookFormulaOperation, {
                                        action: 'refreshCalculate', value: cell.formula, rowIndex: cellIdx[0],
                                        colIndex: i, isFormula: checkIsFormula(cell.formula), sheetIndex: sheetIdx, isRefreshing: true
                                    });
                                }
                                cell.value = getCell(cellIdx[0], i, model).value;
                            }
                            if (cell.chart) {
                                chartColl.push({ index: cellIdx, chart: cell.chart });
                                chartModel = [];
                                for (var i_1 = 0, len_1 = cell.chart.length; i_1 < len_1; i_1++) {
                                    var chart = Object.assign({}, cell.chart[i_1]);
                                    delete chart.id;
                                    chartModel.push(chart);
                                }
                                cell.chart = chartModel;
                            }
                        }
                    }
                }
                if (key === 'validation' && value && typeof value.type === 'string' && value.type === 'Time') {
                    ['value1', 'value2'].forEach(function (valKey) {
                        var val = value[valKey] && value[valKey].toString();
                        if (val && !isNumber(Number(val))) {
                            value[valKey] = _this.getDateAsNumber({ range: [], cell: { value: val } }, val);
                        }
                    });
                }
                if (value && value.properties && value.maxHgts) {
                    value.properties = __assign({}, value.properties, { maxHgts: value.maxHgts });
                }
                // eslint-disable-next-line no-prototype-builtins
                if (value && typeof value === 'object' && value.hasOwnProperty('properties')) {
                    if (value.propName && value.propName.toString() === 'conditionalFormats') {
                        var properties = value.properties;
                        if (properties.format && properties.format.style) {
                            var style = properties.format.style;
                            if (style && style.backgroundColor === '#ffffff' && style.color === '#000000' &&
                                style.fontWeight !== 'bold' && style.fontStyle !== 'italic' && style.textDecoration !== 'underline') {
                                delete properties.format; // Remove format if it matches default cell style
                            }
                        }
                    }
                    return value.properties;
                }
                else if (value !== null) {
                    return value;
                }
                else {
                    return undefined;
                }
            }
        });
        var sheet = getSheet(this.parent, sheetIdx);
        chartColl.forEach(function (obj) {
            setCell(obj.index[0], obj.index[1], sheet, { chart: obj.chart }, true);
        });
        return json;
    };
    WorkbookSave.prototype.getDateAsNumber = function (args, cellValue) {
        var dateEventArgs = { value: cellValue, rowIndex: args.range[0], cell: args.cell,
            colIndex: args.range[1], sheetIndex: args.sheetIdx, updatedVal: '' };
        this.parent.notify(checkDateFormat, dateEventArgs);
        return dateEventArgs.updatedVal || cellValue;
    };
    WorkbookSave.prototype.getFileNameWithExtension = function (filename) {
        if (!filename) {
            filename = this.saveSettings.fileName;
        }
        var fileExt = this.getFileExtension();
        var idx = filename.lastIndexOf('.');
        if (idx > -1) {
            filename = filename.substr(0, idx);
        }
        return (filename + fileExt);
    };
    WorkbookSave.prototype.getFileExtension = function () {
        return ('.' + this.saveSettings.saveType.toLowerCase());
    };
    return WorkbookSave;
}(SaveWorker));
export { WorkbookSave };
