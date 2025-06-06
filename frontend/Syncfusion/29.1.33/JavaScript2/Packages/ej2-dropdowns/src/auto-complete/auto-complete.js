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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../combo-box/combo-box-model.d.ts'/>
import { Property, EventHandler, isNullOrUndefined, detach, getValue } from '@syncfusion/ej2-base';
import { Event, Complex } from '@syncfusion/ej2-base';
import { removeClass, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { dropDownListClasses } from '../drop-down-list/drop-down-list';
import { ComboBox } from '../combo-box/combo-box';
import { highlightSearch, revertHighlightSearch } from '../common/highlight-search';
import { Search } from '../common/incremental-search';
import { FieldSettings } from '../drop-down-base/drop-down-base';
import { Input } from '@syncfusion/ej2-inputs';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
dropDownListClasses.root = 'e-autocomplete';
dropDownListClasses.icon = 'e-input-group-icon e-ddl-icon e-search-icon';
/**
 * The AutoComplete component provides the matched suggestion list when type into the input,
 * from which the user can select one.
 * ```html
 * <input id="list" type="text"/>
 * ```
 * ```typescript
 *   let atcObj:AutoComplete = new AutoComplete();
 *   atcObj.appendTo("#list");
 * ```
 */
var AutoComplete = /** @class */ (function (_super) {
    __extends(AutoComplete, _super);
    /**
     * * Constructor for creating the widget
     *
     * @param {AutoCompleteModel} options - Specifies the AutoComplete model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function AutoComplete(options, element) {
        var _this_1 = _super.call(this, options, element) || this;
        _this_1.isFiltered = false;
        _this_1.searchList = false;
        return _this_1;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    AutoComplete.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
    };
    AutoComplete.prototype.getLocaleName = function () {
        return 'auto-complete';
    };
    AutoComplete.prototype.getNgDirective = function () {
        return 'EJS-AUTOCOMPLETE';
    };
    AutoComplete.prototype.getQuery = function (query) {
        var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
        var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
        var filterType = (this.queryString === '' && !isNullOrUndefined(value)) ? 'equal' : this.filterType;
        var queryString = (this.queryString === '' && !isNullOrUndefined(value)) ? value : this.queryString;
        if (this.isFiltered) {
            if ((this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery))) {
                filterQuery = this.customFilterQuery.clone();
            }
            else if (!this.enableVirtualization) {
                return filterQuery;
            }
        }
        if (this.queryString !== null && this.queryString !== '') {
            var dataType = this.typeOfData(this.dataSource).typeof;
            if (!(this.dataSource instanceof DataManager) && dataType === 'string' || dataType === 'number') {
                filterQuery.where('', filterType, queryString, this.ignoreCase, this.ignoreAccent);
            }
            else {
                var mapping = !isNullOrUndefined(this.fields.value) ? this.fields.value : '';
                filterQuery.where(mapping, filterType, queryString, this.ignoreCase, this.ignoreAccent);
            }
        }
        if (!isNullOrUndefined(this.suggestionCount) && !this.enableVirtualization) {
            // Since default value of suggestioncount is 20, checked the condition
            if (this.suggestionCount !== 20) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onTake') {
                        filterQuery.queries.splice(queryElements, 1);
                    }
                }
            }
            filterQuery.take(this.suggestionCount);
        }
        if (this.enableVirtualization) {
            var queryTakeValue = 0;
            var querySkipValue = 0;
            var takeValue = this.getTakeValue();
            if (filterQuery && filterQuery.queries.length > 0) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onSkip') {
                        querySkipValue = filterQuery.queries[queryElements].e.nos;
                    }
                    if (filterQuery.queries[queryElements].fn === 'onTake') {
                        queryTakeValue = takeValue <= filterQuery.queries[queryElements].e.nos
                            ? filterQuery.queries[queryElements].e.nos
                            : takeValue;
                    }
                }
            }
            if (queryTakeValue <= 0 && this.query && this.query.queries.length > 0) {
                for (var queryElements = 0; queryElements < this.query.queries.length; queryElements++) {
                    if (this.query.queries[queryElements].fn === 'onTake') {
                        var currentTakeValue = this.query.queries[queryElements].e.nos;
                        queryTakeValue = takeValue <= currentTakeValue ? currentTakeValue : takeValue;
                    }
                }
            }
            if (filterQuery && filterQuery.queries.length > 0) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onSkip') {
                        querySkipValue = filterQuery.queries[queryElements].e.nos;
                        filterQuery.queries.splice(queryElements, 1);
                        --queryElements;
                        continue;
                    }
                    if (filterQuery.queries[queryElements].fn === 'onTake') {
                        var currentQueryTakeValue = filterQuery.queries[queryElements].e.nos;
                        queryTakeValue = currentQueryTakeValue <= queryTakeValue ? queryTakeValue : currentQueryTakeValue;
                        filterQuery.queries.splice(queryElements, 1);
                        --queryElements;
                    }
                }
            }
            if (querySkipValue > 0 && this.virtualItemStartIndex <= querySkipValue) {
                filterQuery.skip(querySkipValue);
            }
            else {
                filterQuery.skip(this.virtualItemStartIndex);
            }
            if (queryTakeValue > 0 && takeValue <= queryTakeValue) {
                filterQuery.take(queryTakeValue);
            }
            else {
                filterQuery.take(takeValue);
            }
            filterQuery.requiresCount();
        }
        return filterQuery;
    };
    AutoComplete.prototype.searchLists = function (e) {
        var _this_1 = this;
        this.isTyped = true;
        this.isDataFetched = this.isSelectCustom = false;
        this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
        this.checkAndResetCache();
        if (isNullOrUndefined(this.list)) {
            _super.prototype.renderList.call(this, e, true);
        }
        this.queryString = this.filterInput.value;
        if (e.type !== 'mousedown' && (e.keyCode === 40 || e.keyCode === 38)) {
            this.queryString = this.queryString === '' ? null : this.queryString;
            this.beforePopupOpen = true;
            this.resetList(this.dataSource, this.fields, null, e);
            return;
        }
        this.isSelected = false;
        this.activeIndex = null;
        this.isRequesting = false;
        var eventArgs = {
            preventDefaultAction: false,
            text: this.filterInput.value,
            updateData: function (dataSource, query, fields) {
                if (eventArgs.cancel) {
                    return;
                }
                _this_1.isFiltered = true;
                _this_1.customFilterQuery = query;
                _this_1.filterAction(dataSource, query, fields);
            },
            cancel: false
        };
        this.trigger('filtering', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel && !_this_1.isFiltered && !eventArgs.preventDefaultAction) {
                _this_1.searchList = true;
                _this_1.filterAction(_this_1.dataSource, null, _this_1.fields, e);
            }
        });
    };
    /**
     * To filter the data from given data source by using query
     *
     * @param {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param {Query} query - Specify the query to filter the data.
     * @param {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     * @deprecated
     */
    AutoComplete.prototype.filter = function (dataSource, query, fields) {
        this.isFiltered = true;
        this.filterAction(dataSource, query, fields);
    };
    AutoComplete.prototype.filterAction = function (dataSource, query, fields, e) {
        this.beforePopupOpen = true;
        var isNoDataElement = this.list.classList.contains('e-nodata');
        if (this.queryString !== '' && (this.queryString.length >= this.minLength)) {
            if (this.enableVirtualization && this.isFiltering() && this.isTyped) {
                this.isPreventScrollAction = true;
                this.list.scrollTop = 0;
                this.previousStartIndex = 0;
                this.virtualListInfo = null;
            }
            this.resetList(dataSource, fields, query, e);
            isNoDataElement = this.list.classList.contains('e-nodata');
            if (this.enableVirtualization && !isNoDataElement) {
                if (!this.list.querySelector('.e-virtual-ddl-content') && this.list.querySelector('.e-list-parent')) {
                    var virtualElement = this.createElement('div', {
                        className: 'e-virtual-ddl-content'
                    });
                    virtualElement.style.cssText = this.getTransformValues();
                    this.list.appendChild(virtualElement).appendChild(this.list.querySelector('.e-list-parent'));
                }
                if (!this.list.querySelector('.e-virtual-ddl') && this.list.parentElement) {
                    var virtualElement = this.createElement('div', {
                        id: this.element.id + '_popup', className: 'e-virtual-ddl'
                    });
                    virtualElement.style.cssText = this.GetVirtualTrackHeight();
                    this.list.parentElement.querySelector('.e-dropdownbase').appendChild(virtualElement);
                }
            }
            if ((this.getModuleName() === 'autocomplete' && !(this.dataSource instanceof DataManager)) || (this.getModuleName() === 'autocomplete' && (this.dataSource instanceof DataManager) && this.totalItemCount !== 0)) {
                this.getFilteringSkeletonCount();
            }
        }
        else {
            this.hidePopup(e);
            this.beforePopupOpen = false;
        }
        this.renderReactTemplates();
    };
    AutoComplete.prototype.clearAll = function (e, property) {
        if (isNullOrUndefined(property) || (!isNullOrUndefined(property) && isNullOrUndefined(property.dataSource))) {
            _super.prototype.clearAll.call(this, e);
            this.checkAndResetCache();
        }
        if (this.beforePopupOpen) {
            this.hidePopup();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AutoComplete.prototype.onActionComplete = function (ulElement, list, e, isUpdated) {
        if (!this.enableVirtualization) {
            this.fixedHeaderElement = null;
        }
        if ((this.getModuleName() === 'autocomplete' && !(this.dataSource instanceof DataManager)) || (this.getModuleName() === 'autocomplete' && (this.dataSource instanceof DataManager) && this.totalItemCount !== 0)) {
            this.getFilteringSkeletonCount();
        }
        _super.prototype.onActionComplete.call(this, ulElement, list, e);
        var item = this.list.querySelector('.' + dropDownListClasses.li);
        if (!isNullOrUndefined(item)) {
            removeClass([item], dropDownListClasses.focus);
        }
        if (!isNullOrUndefined(this.itemData) && !this.enableVirtualization) {
            this.focusIndexItem();
        }
        this.postBackAction();
    };
    AutoComplete.prototype.postBackAction = function () {
        if (this.autofill && !isNullOrUndefined(this.liCollections[0]) && this.searchList) {
            var items = [this.liCollections[0]];
            var dataSource = this.listData;
            var type = this.typeOfData(dataSource).typeof;
            var searchItem = Search(this.inputElement.value, items, 'StartsWith', this.ignoreCase, dataSource, this.fields, type);
            this.searchList = false;
            if (!isNullOrUndefined(searchItem.item)) {
                _super.prototype.setAutoFill.call(this, this.liCollections[0], true);
            }
        }
    };
    AutoComplete.prototype.setSelection = function (li, e) {
        if (!this.isValidLI(li)) {
            this.selectedLI = li;
            return;
        }
        if (!isNullOrUndefined(e) && e.type === 'keydown' && e.action !== 'enter'
            && e.action !== 'tab' && this.isValidLI(li)) {
            var value = this.getFormattedValue(li.getAttribute('data-value'));
            this.activeIndex = this.getIndexByValue(value);
            this.setHoverList(li);
            this.selectedLI = li;
            this.setScrollPosition(e);
            if (this.autofill && this.isPopupOpen) {
                this.preventAutoFill = false;
                var isKeyNavigate = (e && e.action === 'down' || e.action === 'up' ||
                    e.action === 'home' || e.action === 'end' || e.action === 'pageUp' || e.action === 'pageDown');
                _super.prototype.setAutoFill.call(this, li, isKeyNavigate);
            }
        }
        else {
            _super.prototype.setSelection.call(this, li, e);
            this.isFiltered = false;
        }
    };
    AutoComplete.prototype.listOption = function (dataSource, fieldsSettings) {
        var _this_1 = this;
        var fields = _super.prototype.listOption.call(this, dataSource, fieldsSettings);
        if (isNullOrUndefined(fields.itemCreated)) {
            fields.itemCreated = function (e) {
                if (_this_1.highlight) {
                    if (_this_1.element.tagName === _this_1.getNgDirective() && _this_1.itemTemplate) {
                        setTimeout(function () {
                            highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
                        }, 0);
                    }
                    else {
                        highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
                    }
                }
            };
        }
        else {
            var itemCreated_1 = fields.itemCreated;
            fields.itemCreated = function (e) {
                if (_this_1.highlight) {
                    highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
                }
                itemCreated_1.apply(_this_1, [e]);
            };
        }
        return fields;
    };
    AutoComplete.prototype.isFiltering = function () {
        return true;
    };
    AutoComplete.prototype.renderPopup = function (e) {
        if (!this.enableVirtualization) {
            this.list.scrollTop = 0;
        }
        _super.prototype.renderPopup.call(this, e);
    };
    AutoComplete.prototype.isEditTextBox = function () {
        return false;
    };
    AutoComplete.prototype.isPopupButton = function () {
        return this.showPopupButton;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AutoComplete.prototype.isSelectFocusItem = function (element) {
        return false;
    };
    AutoComplete.prototype.setInputValue = function (newProp, oldProp) {
        var oldValue = oldProp && oldProp.text ? oldProp.text : oldProp ? oldProp.value : oldProp;
        var value = newProp && newProp.text
            ? newProp.text
            : newProp && newProp.value
                ? newProp.value
                : this.value;
        if (this.allowObjectBinding) {
            oldValue = !isNullOrUndefined(oldValue)
                ? getValue((this.fields.value) ? this.fields.value : '', oldValue)
                : oldValue;
            value = !isNullOrUndefined(value)
                ? getValue((this.fields.value) ? this.fields.value : '', value)
                : value;
        }
        if (value && this.typedString === '' && !this.allowCustom && !(this.dataSource instanceof DataManager)) {
            var checkFields1_1 = this.typeOfData(this.dataSource).typeof === 'string' ? '' : this.fields.value;
            var listLength_1 = this.getItems().length;
            var query = new Query();
            // eslint-disable-next-line @typescript-eslint/tslint/config
            var _this_2 = null || this;
            new DataManager(this.dataSource).executeQuery(query.where(new Predicate(checkFields1_1, 'equal', value)))
                .then(function (e) {
                if (e.result.length > 0) {
                    _this_2.value = checkFields1_1 !== '' ? _this_2.allowObjectBinding ? e.result[0] : e.result[0][_this_2.fields.value].toString() : e.result[0].toString();
                    _this_2.addItem(e.result, listLength_1);
                    _this_2.updateValues();
                }
                else {
                    if (newProp && newProp.text) {
                        _this_2.setOldText(oldValue);
                    }
                    else if (newProp && newProp.value) {
                        _this_2.setOldValue(oldValue);
                    }
                    else {
                        _this_2.updateValues();
                    }
                }
            });
        }
        else if (newProp) {
            if (newProp.text) {
                this.setOldText(oldValue);
            }
            else {
                this.setOldValue(oldValue);
            }
        }
    };
    /**
     * Search the entered text and show it in the suggestion list if available.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - The event object.
     * @returns {void}
     * @deprecated
     */
    AutoComplete.prototype.showPopup = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.beforePopupOpen) {
            this.refreshPopup();
            return;
        }
        this.beforePopupOpen = true;
        this.preventAutoFill = true;
        if (isNullOrUndefined(this.list)) {
            this.renderList(e);
        }
        else {
            this.resetList(this.dataSource, this.fields, null, e);
        }
    };
    /**
     * Hides the popup if it is in open state.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - The event object.
     * @returns {void}
     */
    AutoComplete.prototype.hidePopup = function (e) {
        _super.prototype.hidePopup.call(this, e);
        this.activeIndex = null;
        this.virtualListInfo = this.viewPortInfo;
        this.previousStartIndex = this.viewPortInfo.startIndex;
        this.startIndex = this.viewPortInfo.startIndex;
        this.previousEndIndex = this.viewPortInfo.endIndex;
    };
    /**
     * Dynamically change the value of properties.
     *
     * @param {AutoCompleteModel} newProp - Returns the dynamic property value of the component.
     * @param {AutoCompleteModel} oldProp - Returns the previous property value of the component.
     * @private
     * @returns {void}
     */
    AutoComplete.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (this.getModuleName() === 'autocomplete') {
            this.setUpdateInitial(['fields', 'query', 'dataSource'], newProp);
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'showPopupButton':
                    if (this.showPopupButton) {
                        var button = Input.appendSpan(dropDownListClasses.icon, this.inputWrapper.container, this.createElement);
                        this.inputWrapper.buttons[0] = button;
                        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                        }
                        if (this.inputWrapper && this.inputWrapper.buttons && this.inputWrapper.buttons[0]) {
                            EventHandler.add(this.inputWrapper.buttons[0], 'click', this.dropDownClick, this);
                        }
                    }
                    else {
                        detach(this.inputWrapper.buttons[0]);
                        this.inputWrapper.buttons[0] = null;
                    }
                    break;
                default: {
                    // eslint-disable-next-line max-len
                    var atcProps = this.getPropObject(prop, newProp, oldProp);
                    _super.prototype.onPropertyChanged.call(this, atcProps.newProperty, atcProps.oldProperty);
                    break;
                }
            }
        }
    };
    AutoComplete.prototype.renderHightSearch = function () {
        if (this.highlight) {
            for (var i = 0; i < this.liCollections.length; i++) {
                var isHighlight = this.ulElement.querySelector('.e-active');
                if (!isHighlight) {
                    revertHighlightSearch(this.liCollections[i]);
                    highlightSearch(this.liCollections[i], this.queryString, this.ignoreCase, this.filterType);
                }
                isHighlight = null;
            }
        }
    };
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    AutoComplete.prototype.getModuleName = function () {
        return 'autocomplete';
    };
    /**
     * To initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    AutoComplete.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    __decorate([
        Complex({ value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], AutoComplete.prototype, "fields", void 0);
    __decorate([
        Property(true)
    ], AutoComplete.prototype, "ignoreCase", void 0);
    __decorate([
        Property(false)
    ], AutoComplete.prototype, "showPopupButton", void 0);
    __decorate([
        Property(false)
    ], AutoComplete.prototype, "highlight", void 0);
    __decorate([
        Property(20)
    ], AutoComplete.prototype, "suggestionCount", void 0);
    __decorate([
        Property({})
    ], AutoComplete.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], AutoComplete.prototype, "query", void 0);
    __decorate([
        Property(1)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        Property('Contains')
    ], AutoComplete.prototype, "filterType", void 0);
    __decorate([
        Event()
    ], AutoComplete.prototype, "filtering", void 0);
    __decorate([
        Property(null)
    ], AutoComplete.prototype, "index", void 0);
    __decorate([
        Property('Never')
    ], AutoComplete.prototype, "floatLabelType", void 0);
    __decorate([
        Property(null)
    ], AutoComplete.prototype, "valueTemplate", void 0);
    __decorate([
        Property(null)
    ], AutoComplete.prototype, "filterBarPlaceholder", void 0);
    __decorate([
        Property(false)
    ], AutoComplete.prototype, "allowFiltering", void 0);
    __decorate([
        Property(null)
    ], AutoComplete.prototype, "text", void 0);
    AutoComplete = __decorate([
        NotifyPropertyChanges
    ], AutoComplete);
    return AutoComplete;
}(ComboBox));
export { AutoComplete };
