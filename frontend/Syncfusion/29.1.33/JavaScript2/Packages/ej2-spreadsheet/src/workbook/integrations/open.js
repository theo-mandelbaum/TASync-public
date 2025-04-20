/**
 * Open properties.
 */
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { workbookOpen, openSuccess, openFailure, sheetsDestroyed, workbookFormulaOperation, getRangeIndexes } from '../common/index';
import { sheetCreated, protectSheetWorkBook, getRangeAddress, beginAction } from '../common/index';
import { initSheet, getSheet } from '../base/index';
import { clearUndoRedoCollection } from '../../spreadsheet/common/event';
var WorkbookOpen = /** @class */ (function () {
    function WorkbookOpen(parent) {
        this.loopIndex = 0;
        this.processedLoopIndex = 0;
        this.retryCount = 0;
        this.currentDocumentId = null;
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To open the excel file stream or excel url into the spreadsheet.
     *
     * @param {OpenArgs} options - Options to open a excel file.
     * @returns {void} - To open the excel file stream or excel url into the spreadsheet.
     */
    WorkbookOpen.prototype.open = function (options) {
        this.load(options);
    };
    WorkbookOpen.prototype.load = function (options, isRetryRequest) {
        var _this = this;
        if (!this.parent.allowOpen) {
            return;
        }
        if (options.jsonObject) {
            this.fetchSuccess(options.jsonObject, options, null, true, true);
            return;
        }
        var formData = new FormData();
        if (options.file) {
            formData.append('file', options.file);
        }
        else if (options.sheetIndex >= 0) {
            formData.append('sheetPassword', options.sheetPassword);
            formData.append('sheetIndex', options.sheetIndex.toString());
        }
        else {
            this.parent.isOpen = false;
            return;
        }
        var args = { passWord: '' };
        if (options.password && options.password.length) {
            args.passWord = options.password;
        }
        if (args.passWord && args.passWord.length) {
            options.password = args.passWord;
        }
        if (options.password) {
            formData.append('password', options.password);
        }
        formData.append('IsManualCalculationEnabled', (this.parent.calculationMode === 'Manual').toString());
        var eventArgs = {
            file: options.file || null,
            cancel: false,
            requestData: {
                method: 'POST',
                body: formData
            },
            password: args.passWord
        };
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var guid = options.guid;
        if (isNullOrUndefined(options.sheetPassword) && !guid && isNullOrUndefined(isRetryRequest)) {
            this.parent.trigger('beforeOpen', eventArgs);
            this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'beforeOpen' });
        }
        else if (guid) {
            formData.append('guid', guid);
        }
        if (eventArgs.cancel) {
            this.parent.isOpen = false;
            return;
        }
        var header = { chunkSize: null, documentId: null };
        if (this.parent.openSettings.chunkSize > 0 && isNullOrUndefined(options.sheetPassword)) {
            this.setToDefaults(isRetryRequest);
            if (!isNullOrUndefined(this.parent.openSettings.chunkSize) && this.parent.openSettings.chunkSize !== 0) {
                header.chunkSize = this.parent.openSettings.chunkSize.toString();
            }
            if (!isNullOrUndefined(this.currentDocumentId)) {
                header.documentId = this.currentDocumentId;
            }
            if (!isNullOrUndefined(header)) {
                formData.append('chunkPayload', JSON.stringify(header));
            }
        }
        fetch(this.parent.openUrl, eventArgs.requestData)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url
                });
            }
        })
            .then(function (data) { return _this.fetchSuccess(data, eventArgs, options.orginalFile, undefined, true); })
            .catch(function (error) {
            if (error.toString().indexOf('Unexpected end of JSON input') === -1 && _this.parent.openSettings.chunkSize > 0 && _this.retryCount < _this.parent.openSettings.retryCount) {
                setTimeout(function () {
                    _this.retryCount++;
                    _this.load(options, true);
                }, _this.parent.openSettings.retryAfterDelay);
            }
            else {
                if (_this.retryCount >= _this.parent.openSettings.retryCount) {
                    _this.retryCount = 0;
                }
                _this.fetchFailure(error);
            }
        });
    };
    WorkbookOpen.prototype.fetchFailure = function (error) {
        if (isUndefined(error.status) && isUndefined(error.statusText)) {
            error.statusText = 'Improper response';
        }
        this.parent.notify(openFailure, error);
        this.parent.isOpen = false;
    };
    WorkbookOpen.prototype.fetchSuccess = function (data, eventArgs, file, isOpenFromJson, isImport) {
        var openError = ['UnsupportedFile', 'InvalidUrl', 'NeedPassword', 'InCorrectPassword', 'InCorrectSheetPassword',
            'CorrectSheetPassword', 'DataLimitExceeded', 'FileSizeLimitExceeded', 'ExternalWorkbook'];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var workbookData = typeof data === 'string' ? JSON.parse(data) : data;
        var impData = workbookData.Workbook;
        if (!isNullOrUndefined(impData)) {
            if (openError.indexOf(impData) > -1) {
                if (file) {
                    eventArgs.file = file;
                }
                this.parent.notify(openSuccess, {
                    context: this, data: impData, guid: workbookData.Guid, eventArgs: eventArgs,
                    isOpenFromJson: isOpenFromJson
                });
                return;
            }
            this.updateModel(impData, isOpenFromJson, isImport);
            this.parent.notify(openSuccess, { context: this, data: impData, isOpenFromJson: isOpenFromJson, eventArgs: eventArgs });
            this.parent.isOpen = false;
            if (eventArgs && eventArgs.password && eventArgs.password.length > 0) {
                if (this.parent.showSheetTabs) {
                    this.parent.element.querySelector('.e-add-sheet-tab').removeAttribute('disabled');
                    this.parent.element.querySelector('.e-add-sheet-tab').classList.remove('e-disabled');
                }
                this.parent.password = '';
            }
        }
        else {
            var totalChunk = workbookData.chunkTotalCount;
            this.currentDocumentId = workbookData.documentId;
            this.chunkList = new Array(totalChunk);
            var processedChunkIndex = 0;
            var chunkLimit = totalChunk > this.parent.openSettings.chunkSize ? this.parent.openSettings.chunkSize : totalChunk;
            var processedLoopIndex = 0;
            this.processedLoopIndex = 0;
            var binaryString = '';
            /* eslint-disable-next-line @typescript-eslint/no-this-alias */
            var instance = this;
            if (!isNullOrUndefined(totalChunk)) {
                while (processedChunkIndex < totalChunk) {
                    instance.processChunk(processedChunkIndex, chunkLimit, processedLoopIndex, binaryString, eventArgs, file, isOpenFromJson, isImport);
                    processedChunkIndex += instance.parent.openSettings.chunkSize;
                    chunkLimit = processedChunkIndex + instance.parent.openSettings.chunkSize < totalChunk ?
                        instance.parent.openSettings.chunkSize : totalChunk - processedChunkIndex;
                    processedLoopIndex++;
                    instance.processedLoopIndex++;
                }
            }
        }
    };
    WorkbookOpen.prototype.processChunk = function (processedChunkIndex, chunkLimit, processedLoopIndex, binaryString, eventArgs, file, isOpenFromJson, isImport) {
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        var instance = this;
        var header = {
            currentChunk: processedChunkIndex.toString(), chunkSize: chunkLimit.toString(),
            loopIndex: processedLoopIndex.toString(), documentId: this.currentDocumentId
        };
        var formData = new FormData();
        formData.append('chunkPayload', JSON.stringify(header));
        var requestEventArgs = {
            file: file || null,
            cancel: false,
            requestData: {
                method: 'POST',
                body: formData
            },
            password: eventArgs.password
        };
        fetch(this.parent.openUrl, requestEventArgs.requestData)
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url
                });
            }
        })
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            .then(function (data) {
            if (data !== '') {
                var chunks = atob(data['chunk']);
                var bytes = new Uint8Array(chunks.length);
                for (var i = 0; i < chunks.length; i++) {
                    bytes[i] = chunks.charCodeAt(i);
                }
                chunks = new TextDecoder('utf-8').decode(bytes);
                instance.chunkList[data['loopIndex']] = chunks;
                instance.loopIndex++;
                if (instance.loopIndex === instance.processedLoopIndex) {
                    var splicedArray = instance.chunkList.splice(0, instance.loopIndex);
                    for (var k = 0; k < splicedArray.length; k++) {
                        binaryString += splicedArray.slice(k, k + 1).join('');
                    }
                    data = JSON.parse(binaryString);
                    instance.setToDefaults();
                    instance.fetchSuccess(data, eventArgs, file, isOpenFromJson, isImport);
                }
            }
        })
            .catch(function (error) {
            if (isNullOrUndefined(instance.currentFailedChunkIndex) || instance.currentFailedChunkIndex === processedChunkIndex) {
                instance.currentFailedChunkIndex = processedChunkIndex;
                if (instance.retryCount < instance.parent.openSettings.retryCount) {
                    setTimeout(function () {
                        instance.processedLoopIndex = processedLoopIndex;
                        instance.processChunk(processedChunkIndex, chunkLimit, processedLoopIndex, binaryString, eventArgs, file, isOpenFromJson, isImport);
                        instance.retryCount++;
                    }, instance.parent.openSettings.retryAfterDelay);
                }
                else {
                    instance.retryCount = 0;
                    return instance.fetchFailure(error);
                }
            }
        });
    };
    WorkbookOpen.prototype.setToDefaults = function (isRetryRequest) {
        this.currentFailedChunkIndex = null;
        if (!isRetryRequest) {
            this.retryCount = 0;
        }
        this.loopIndex = 0;
        this.processedLoopIndex = 0;
        this.chunkList = [];
    };
    WorkbookOpen.prototype.updateModel = function (workbookModel, isOpenFromJson, isImport) {
        this.parent.notify(workbookFormulaOperation, { action: 'unRegisterSheet' });
        this.setSelectAllRange(workbookModel.sheets, isOpenFromJson);
        this.parent.sheetNameCount = 1;
        this.parent.sheets = [];
        this.parent.notify(sheetsDestroyed, {});
        this.parent.notify(clearUndoRedoCollection, null);
        workbookModel.activeSheetIndex = workbookModel.activeSheetIndex || workbookModel.sheets.findIndex(function (sheet) { return sheet.state !== 'Hidden'; });
        this.parent.setProperties({
            'isProtected': workbookModel.isProtected || false,
            'password': workbookModel.password || '',
            'sheets': workbookModel.sheets,
            'activeSheetIndex': workbookModel.activeSheetIndex,
            'definedNames': workbookModel.definedNames || [],
            'filterCollection': workbookModel.filterCollection || [],
            'sortCollection': workbookModel.sortCollection || [],
            'listSeparator': workbookModel.listSeparator || this.parent.listSeparator
        }, true);
        if (!isNullOrUndefined(workbookModel.showSheetTabs)) {
            this.parent.showSheetTabs = workbookModel.showSheetTabs;
        }
        initSheet(this.parent, undefined, isImport);
        this.parent.notify(sheetCreated, null);
        this.parent.notify(workbookFormulaOperation, { action: 'registerSheet', isImport: true });
        this.parent.notify(workbookFormulaOperation, { action: 'initiateDefinedNames' });
        this.parent.notify(protectSheetWorkBook, null);
    };
    WorkbookOpen.prototype.setSelectAllRange = function (sheets, isOpenFromJson) {
        var _this = this;
        var curSheet;
        var curRange;
        sheets.forEach(function (sheet) {
            if (sheet.selectedRange) {
                var selectedIndex = getRangeIndexes(sheet.selectedRange);
                var rowCount = (isUndefined(sheet.rowCount) ? 100 : sheet.rowCount) - 1;
                var colCount = (isUndefined(sheet.colCount) ? 100 : sheet.colCount) - 1;
                if (selectedIndex[2] === 65535) {
                    selectedIndex[2] = rowCount;
                }
                if (selectedIndex[3] === 255) {
                    selectedIndex[3] = colCount;
                }
                if (selectedIndex[0] === 65535) {
                    selectedIndex[0] = rowCount;
                }
                if (selectedIndex[1] === 255) {
                    selectedIndex[1] = colCount;
                }
                sheet.selectedRange = getRangeAddress(selectedIndex);
            }
            if (isOpenFromJson && _this.parent.isAngular) {
                for (var i = 0; i < _this.parent.sheets.length; i++) {
                    curSheet = getSheet(_this.parent, i);
                    if (sheet.name === curSheet.name) {
                        if (sheet.ranges) {
                            sheet.ranges.forEach(function (range, index) {
                                curRange = curSheet.ranges[index];
                                if (curRange && curRange.template) {
                                    range.template = curRange.template;
                                }
                            });
                        }
                        break;
                    }
                }
            }
        });
    };
    WorkbookOpen.prototype.sheetsDestroyHandler = function (args) {
        if (isNullOrUndefined(args.sheetIndex)) {
            this.preventFormatCheck = null;
        }
    };
    /**
     * Adding event listener for workbook open.
     *
     * @returns {void} - Adding event listener for workbook open.
     */
    WorkbookOpen.prototype.addEventListener = function () {
        this.parent.on(workbookOpen, this.open.bind(this));
        this.parent.on(sheetsDestroyed, this.sheetsDestroyHandler, this);
    };
    /**
     * Removing event listener workbook open.
     *
     * @returns {void} - removing event listener workbook open.
     */
    WorkbookOpen.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(workbookOpen, this.open.bind(this));
            this.parent.off(sheetsDestroyed, this.sheetsDestroyHandler);
        }
    };
    /**
     * To Remove the event listeners
     *
     * @returns {void} - To Remove the event listeners
     */
    WorkbookOpen.prototype.destroy = function () {
        this.removeEventListener();
        if (!this.parent.refreshing) {
            this.preventFormatCheck = null;
        }
        this.parent = null;
    };
    /**
     * Get the workbook open module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookOpen.prototype.getModuleName = function () {
        return 'workbookOpen';
    };
    return WorkbookOpen;
}());
export { WorkbookOpen };
