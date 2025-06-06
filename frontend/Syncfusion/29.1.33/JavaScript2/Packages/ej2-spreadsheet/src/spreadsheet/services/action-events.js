import { triggerDataChange } from '../../workbook/index';
import { beginAction } from '../../workbook/index';
import { completeAction, positionAutoFillElement } from '../common/index';
import { setActionData, updateUndoRedoCollection, spreadsheetDestroyed } from '../common/index';
/**
 *  Begin and complete events.
 *
 * @hidden
 */
var ActionEvents = /** @class */ (function () {
    /**
     * Constructor for initializing action begin and action complete services.
     *
     * @param {Spreadsheet} parent - Specifies the spreadsheet element.
     */
    function ActionEvents(parent) {
        this.parent = parent;
        this.addEventListener();
        //this.initializeActionBegin();
        //this.initializeActionComplete();
    }
    ActionEvents.prototype.initializeActionBegin = function () {
        var _this = this;
        var cellFormat = this.parent.beforeCellFormat;
        this.parent.beforeCellFormat = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: cellFormat, actionType: 'begin', eventType: 'format' });
        };
        var beforeOpen = this.parent.beforeOpen;
        this.parent.beforeOpen = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: beforeOpen, actionType: 'begin', eventType: 'beforeOpen' });
        };
        var beforeSave = this.parent.beforeSave;
        this.parent.beforeSave = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: beforeSave, actionType: 'begin', eventType: 'beforeSave' });
        };
        var beforeSort = this.parent.beforeSort;
        this.parent.beforeSort = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: beforeSort, actionType: 'begin', eventType: 'beforeSort' });
        };
    };
    ActionEvents.prototype.initializeActionComplete = function () {
        var _this = this;
        var sortComplete = this.parent.sortComplete;
        this.parent.sortComplete = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: sortComplete, actionType: 'complete', eventType: 'sorting' });
        };
        var cellSave = this.parent.cellSave;
        this.parent.cellSave = function (args) {
            _this.actionEventHandler({ evtArgs: args, evtFunc: cellSave, actionType: 'complete', eventType: 'cellSave' });
        };
    };
    ActionEvents.prototype.actionEventHandler = function (args) {
        if (args.evtFunc) {
            args.evtFunc.apply(this, [args]);
        }
        if (args.actionType === 'begin') {
            this.actionBeginHandler({ eventArgs: args.evtArgs, action: args.eventType });
        }
        else {
            this.actionCompleteHandler({ eventArgs: args.evtArgs, action: args.eventType });
        }
    };
    ActionEvents.prototype.actionBeginHandler = function (args) {
        var preventAction = args.preventAction;
        delete args.preventAction;
        var actionArgs = { action: args.action };
        if (args.isUndo) {
            actionArgs.isUndo = true;
            delete args.isUndo;
        }
        if (args.isRedo) {
            actionArgs.isUndo = false;
            delete args.isRedo;
        }
        actionArgs.args = args;
        this.parent.trigger('actionBegin', actionArgs);
        if (!preventAction && !this.parent.isPrintingProcessing && (args.action === 'clipboard' || args.action === 'format' ||
            args.action === 'cellSave' || args.action === 'addNote' || args.action === 'editNote' || args.action === 'deleteNote' ||
            args.action === 'beforeWrap' || args.action === 'beforeReplace' || args.action === 'filter' || args.action === 'beforeClear' ||
            args.action === 'beforeInsertImage' || args.action === 'beforeInsertChart' || args.action === 'chartDesign' ||
            args.action === 'cellDelete' || args.action === 'autofill' || args.action === 'validation' ||
            args.action === 'removeValidation' || args.action === 'hyperlink' || args.action === 'removeHyperlink' || args.action === 'deleteImage')) {
            this.parent.notify(setActionData, { args: args });
        }
        if (preventAction) {
            args.preventAction = true;
        }
        if (actionArgs.isUndo) {
            args.isUndo = true;
        }
        if (actionArgs.isUndo === false) {
            args.isRedo = true;
        }
    };
    ActionEvents.prototype.actionCompleteHandler = function (args) {
        var preventAction = args.preventAction;
        delete args.preventAction;
        this.parent.notify(triggerDataChange, args);
        if (!args.preventEventTrigger) {
            this.parent.trigger('actionComplete', args);
        }
        if (!preventAction && args.action !== 'undoRedo' && args.action !== 'gotoSheet') {
            this.parent.notify(updateUndoRedoCollection, { args: args });
        }
        this.parent.notify(positionAutoFillElement, null);
    };
    ActionEvents.prototype.addEventListener = function () {
        this.parent.on(completeAction, this.actionCompleteHandler, this);
        this.parent.on(beginAction, this.actionBeginHandler, this);
        this.parent.on(spreadsheetDestroyed, this.removeEventListener, this);
    };
    ActionEvents.prototype.removeEventListener = function () {
        this.parent.off(completeAction, this.actionCompleteHandler);
        this.parent.off(beginAction, this.actionBeginHandler);
        this.parent.off(spreadsheetDestroyed, this.removeEventListener);
    };
    return ActionEvents;
}());
export { ActionEvents };
