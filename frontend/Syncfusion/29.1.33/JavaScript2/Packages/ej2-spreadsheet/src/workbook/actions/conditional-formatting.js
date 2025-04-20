import { getSheet } from '../index';
import { setCFRule, clearCFRule, getRangeAddress, getSheetIndexFromAddress } from '../common/index';
import { getRangeIndexes, getSwapRange } from '../common/index';
import { applyCF, clearCF, goto, beginAction } from '../common/index';
/**
 * The `WorkbookConditionalFormat` module is used to handle conditional formatting action in Spreadsheet.
 */
var WorkbookConditionalFormat = /** @class */ (function () {
    /**
     * Constructor for WorkbookConditionalFormat module.
     *
     * @param {Workbook} parent - Specifies the parent element.
     */
    function WorkbookConditionalFormat(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the conditional format module.
     *
     * @returns {void}
     */
    WorkbookConditionalFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookConditionalFormat.prototype.addEventListener = function () {
        this.parent.on(setCFRule, this.setCFRule, this);
        this.parent.on(clearCFRule, this.clearCFRule, this);
    };
    WorkbookConditionalFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setCFRule, this.setCFRule);
            this.parent.off(clearCFRule, this.clearCFRule);
        }
    };
    WorkbookConditionalFormat.prototype.setCFRule = function (e) {
        var cf = e.cfModel;
        var sheetIndex = e.sheetIdx === undefined ? getSheetIndexFromAddress(this.parent, cf.range) : e.sheetIdx;
        var sheet = getSheet(this.parent, sheetIndex);
        var indexes = getSwapRange(getRangeIndexes(cf.range || sheet.selectedRange));
        cf.range = getRangeAddress(indexes);
        if (e.isAction) {
            var eventArgs = { range: cf.range, type: cf.type, cancel: false, cFColor: cf.cFColor, value: cf.value,
                sheetIdx: sheetIndex };
            this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'conditionalFormat' });
            if (eventArgs.cancel) {
                return;
            }
            cf.type = eventArgs.type;
            cf.cFColor = eventArgs.cFColor;
            cf.value = eventArgs.value;
            if (eventArgs.range !== cf.range) {
                cf.range = eventArgs.range;
                indexes = getSwapRange(getRangeIndexes(eventArgs.range));
            }
            delete eventArgs.cancel;
        }
        if (!sheet.conditionalFormats) {
            this.parent.setSheetPropertyOnMute(sheet, 'conditionalFormats', []);
        }
        sheet.conditionalFormats.push(cf);
        if (sheetIndex !== this.parent.activeSheetIndex) {
            if (e.isUndoRedo && !e.isFromUpdateAction) {
                this.parent.notify(goto, { address: sheet.name + '!' + cf.range });
            }
        }
        else {
            this.parent.notify(applyCF, { cfModel: [cf], isAction: true });
        }
        this.parent.setUsedRange(indexes[2], indexes[3]);
        if (e.isAction) {
            this.parent.notify('actionComplete', { eventArgs: { range: cf.range, type: cf.type, cFColor: cf.cFColor, value: cf.value, sheetIdx: sheetIndex },
                action: 'conditionalFormat' });
        }
    };
    WorkbookConditionalFormat.prototype.clearCFRule = function (args) {
        if (args.sheetIdx === undefined) {
            args.sheetIdx = this.parent.activeSheetIndex;
        }
        var sheet = getSheet(this.parent, args.sheetIdx);
        var cfRule = sheet.conditionalFormats;
        var allowActionComplete = cfRule && cfRule[cfRule.length - 1] && cfRule[cfRule.length - 1].action !== 'autofillWithCF';
        if (args.isUndo) {
            if (args.updatedCFModel) {
                args.updatedCFModel.forEach(function (cf) {
                    for (var i = 0; i < cfRule.length; i++) {
                        if (cfRule[i].type === cf.type && cfRule[i].cFColor === cf.cFColor &&
                            cfRule[i].range === cf.range && cfRule[i].value === cf.value) {
                            cfRule.splice(i, 1);
                            break;
                        }
                    }
                });
            }
            cfRule.push.apply(cfRule, args.oldCFModel.map(function (item) { return Object.assign({}, item); }));
            this.parent.notify(applyCF, { cfModel: args.oldCFModel, isAction: true });
            if (args.sheetIdx !== this.parent.activeSheetIndex) {
                this.parent.notify(goto, { address: sheet.name + '!' + args.range });
            }
            return;
        }
        if (!cfRule || !cfRule.length) {
            return;
        }
        var cf;
        var cfRange;
        var cfIdx;
        var newRange;
        var left;
        var right;
        var top;
        var bottom;
        var range;
        var idx = args.range && (typeof args.range === 'string' ? getRangeIndexes(args.range) : args.range);
        idx = idx ? getSwapRange(idx) : idx;
        args.oldCFModel = [];
        args.updatedCFModel = [];
        var updatedCFModel = [];
        var oldRange = [];
        var refreshCF = [];
        for (var i = 0; i < cfRule.length; i++) {
            cf = cfRule[i];
            cfRange = cf.range.split(',');
            for (var j = 0; j < cfRange.length; j++) {
                cfIdx = getRangeIndexes(cfRange[j]);
                if (args.range) {
                    if (idx[0] <= cfIdx[0] && idx[1] <= cfIdx[1] && idx[2] >= cfIdx[2] && idx[3] >= cfIdx[3]) {
                        cfRange.splice(j, 1);
                        j--;
                    }
                    else {
                        top = idx[0] >= cfIdx[0] && idx[0] <= cfIdx[2];
                        bottom = idx[2] >= cfIdx[0] && idx[2] <= cfIdx[2];
                        left = idx[1] >= cfIdx[1] && idx[1] <= cfIdx[3];
                        right = idx[3] >= cfIdx[1] && idx[3] <= cfIdx[3];
                        newRange = [];
                        if (top && bottom) {
                            if (left || right || (idx[1] < cfIdx[1] && idx[3] > cfIdx[3])) {
                                if (idx[0] - cfIdx[0] > 0) {
                                    newRange.push(getRangeAddress([cfIdx[0], cfIdx[1], idx[0] - 1, cfIdx[3]]));
                                }
                                if (cfIdx[2] - idx[2] > 0) {
                                    newRange.push(getRangeAddress([idx[2] + 1, cfIdx[1], cfIdx[2], cfIdx[3]]));
                                }
                            }
                            if (left && idx[1] !== cfIdx[1]) {
                                newRange.push(getRangeAddress([idx[0], cfIdx[1], idx[2], idx[1] - 1]));
                            }
                            if (right && idx[3] !== cfIdx[3]) {
                                newRange.push(getRangeAddress([idx[0], idx[3] + 1, idx[2], cfIdx[3]]));
                            }
                        }
                        else if (left && right) {
                            if (top || bottom || (idx[0] < cfIdx[0] && idx[2] > cfIdx[2])) {
                                if (idx[1] - cfIdx[1] > 0) {
                                    newRange.push(getRangeAddress([cfIdx[0], cfIdx[1], cfIdx[2], idx[1] - 1]));
                                }
                                if (cfIdx[3] - idx[3] > 0) {
                                    newRange.push(getRangeAddress([cfIdx[0], idx[3] + 1, cfIdx[2], cfIdx[3]]));
                                }
                            }
                            if (top) {
                                if (idx[0] !== cfIdx[0]) {
                                    newRange.push(getRangeAddress([cfIdx[0], idx[1], idx[0] - 1, idx[3]]));
                                }
                            }
                            else if (bottom && idx[2] !== cfIdx[2]) {
                                newRange.push(getRangeAddress([idx[2] + 1, idx[1], cfIdx[2], idx[3]]));
                            }
                        }
                        else if (top || bottom) {
                            if (left) {
                                if (idx[1] !== cfIdx[1]) {
                                    newRange.push(getRangeAddress([cfIdx[0], cfIdx[1], cfIdx[2], idx[1] - 1]));
                                }
                                if (idx[0] - cfIdx[0] > 0) {
                                    newRange.push(getRangeAddress([cfIdx[0], idx[1], idx[0] - 1, cfIdx[3]]));
                                }
                                else if (cfIdx[2] - idx[2] > 0) {
                                    newRange.push(getRangeAddress([idx[2] + 1, idx[1], cfIdx[2], cfIdx[3]]));
                                }
                            }
                            else if (right) {
                                if (idx[3] !== cfIdx[3]) {
                                    newRange.push(getRangeAddress([cfIdx[0], idx[3] + 1, cfIdx[2], cfIdx[3]]));
                                }
                                if (idx[0] - cfIdx[0] > 0) {
                                    newRange.push(getRangeAddress([cfIdx[0], cfIdx[1], idx[0] - 1, idx[3]]));
                                }
                                else if (cfIdx[2] - idx[2] > 0) {
                                    newRange.push(getRangeAddress([idx[2] + 1, cfIdx[1], cfIdx[2], idx[3]]));
                                }
                            }
                        }
                        if (newRange.length) {
                            cfRange[j] = newRange.join(',');
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    idx = cfIdx;
                    cfRange.splice(j, 1);
                    j--;
                }
                if (args.sheetIdx === this.parent.activeSheetIndex) {
                    this.parent.notify(clearCF, { indexes: idx.slice() });
                }
            }
            range = cfRange.join(',');
            if (range !== cf.range) {
                if (args.cfModel && (args.cfModel.cFColor !== cf.cFColor || args.cfModel.type !== cf.type ||
                    args.cfModel.value !== cf.value)) {
                    refreshCF.push(cf);
                    continue;
                }
                oldRange.push(cf.range);
                if (!range) {
                    args.oldCFModel.push(cf);
                    updatedCFModel.concat(cfRule.splice(i, 1));
                    i--;
                }
                else {
                    args.oldCFModel.push({ type: cf.type, cFColor: cf.cFColor, format: cf.format, range: cf.range, value: cf.value });
                    cf.range = range;
                    if (cf.result) {
                        delete cf.result;
                        this.parent.notify(applyCF, { cfModel: [cf], isAction: true });
                    }
                    args.updatedCFModel.push(cf);
                    updatedCFModel.push(cf);
                }
            }
        }
        if (args.sheetIdx !== this.parent.activeSheetIndex) {
            if (args.isUndoRedo && !args.isFromUpdateAction) {
                this.parent.notify(goto, { address: sheet.name + '!' + args.range });
            }
        }
        else if (refreshCF.length) {
            this.parent.notify(applyCF, { cfModel: refreshCF, isAction: true });
        }
        if ((args.isAction || args.isClear) && args.oldCFModel.length) {
            var eventArgs = { cFormats: updatedCFModel, oldRange: oldRange,
                previousConditionalFormats: args.oldCFModel, sheetIdx: args.sheetIdx, selectedRange: args.range };
            if (args.updatedCFModel.length) {
                eventArgs.conditionalFormats = args.updatedCFModel;
            }
            if (args.isClear) {
                args.cfClearActionArgs = eventArgs;
            }
            else {
                if (allowActionComplete) {
                    this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'clearCF' });
                }
            }
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {void} string
     */
    WorkbookConditionalFormat.prototype.getModuleName = function () {
        return 'workbookConditionalFormatting';
    };
    return WorkbookConditionalFormat;
}());
export { WorkbookConditionalFormat };
