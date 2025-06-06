import { addClass, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { isActionPrevent } from '../base/util';
/**
 * The `Search` module is used to handle search action.
 */
var Search = /** @class */ (function () {
    /**
     * Constructor for Grid search module.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @hidden
     */
    function Search(parent) {
        //Internal variables
        /** @hidden */
        this.headerFocus = false;
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * Checks if the input string contains non-numeric characters.
     *
     * @param {string} searchString - The string to be checked for non-numeric characters.
     * @returns {boolean} - `true` if the input string contains non-numeric characters, `false` otherwise.
     */
    Search.prototype.hasNonNumericCharacters = function (searchString) {
        var decimalFound = false;
        for (var _i = 0, searchString_1 = searchString; _i < searchString_1.length; _i++) {
            var char = searchString_1[_i];
            if ((char < '0' || char > '9') && char !== '.') {
                return true;
            }
            if (char === '.') {
                if (decimalFound) {
                    // If decimal is found more than once, it's not valid
                    return true;
                }
                decimalFound = true;
            }
        }
        return false;
    };
    /**
     * Searches Grid records by given key.
     *
     * > You can customize the default search action by using [`searchSettings`](./searchsettings/).
     *
     * @param  {string} searchString - Defines the key.
     * @returns {void}
     */
    Search.prototype.search = function (searchString) {
        var gObj = this.parent;
        searchString = isNullOrUndefined(searchString) ? '' : searchString;
        if (isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, { instance: this, handler: this.search, arg1: searchString });
            return;
        }
        if (searchString !== gObj.searchSettings.key) {
            this.headerFocus = false;
            // Check searchString is number and parseFloat to remove trailing zeros
            if (searchString !== '' && !this.hasNonNumericCharacters(searchString)) {
                if (searchString === '.' || (searchString.indexOf('.') === -1)) {
                    gObj.searchSettings.key = searchString.toString();
                }
                else {
                    gObj.searchSettings.key = parseFloat(searchString).toString();
                }
            }
            else {
                gObj.searchSettings.key = searchString.toString();
            }
            gObj.dataBind();
        }
        else if (this.refreshSearch) {
            gObj.refresh();
        }
        else {
            this.headerFocus = false;
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Search.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(events.searchComplete, this.onSearchComplete, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.actionCompleteFunc = this.onActionComplete.bind(this);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunc);
        this.parent.on(events.cancelBegin, this.cancelBeginEvent, this);
    };
    /**
     * @returns {void}
     * @hidden
     */
    Search.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(events.searchComplete, this.onSearchComplete);
        this.parent.off(events.destroy, this.destroy);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunc);
        this.parent.off(events.cancelBegin, this.cancelBeginEvent);
    };
    /**
     * To destroy the print
     *
     * @returns {void}
     * @hidden
     */
    Search.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @param {NotifyArgs} e - specfies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Search.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (!isNullOrUndefined(e.properties.key)) {
            this.parent.notify(events.modelChanged, {
                requestType: 'searching', type: events.actionBegin, searchString: this.parent.searchSettings.key
            });
        }
        else {
            this.parent.notify(events.modelChanged, {
                requestType: 'searching', type: events.actionBegin
            });
        }
    };
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Search.prototype.onSearchComplete = function (e) {
        this.parent.trigger(events.actionComplete, extend(e, {
            searchString: this.parent.searchSettings.key, requestType: 'searching', type: events.actionComplete
        }));
    };
    /**
     * The function used to store the requestType
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Search.prototype.onActionComplete = function (e) {
        if (this.refreshSearch && e.requestType === 'refresh' && this.headerFocus) {
            this.headerFocus = false;
            this.parent.focusModule.focus();
            addClass([this.parent.focusModule.currentInfo.element], ['e-focused']);
        }
        this.refreshSearch = e.requestType !== 'searching';
    };
    Search.prototype.cancelBeginEvent = function (e) {
        if (e.requestType === 'searching') {
            this.parent.setProperties({ searchSettings: { key: '' } }, true);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Search.prototype.getModuleName = function () {
        return 'search';
    };
    return Search;
}());
export { Search };
