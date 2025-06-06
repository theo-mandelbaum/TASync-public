/* eslint-disable @typescript-eslint/no-explicit-any */
import { closest, classList, createElement, remove, addClass, removeClass, isNullOrUndefined as isNoU, formatUnit, createInstance, detach } from '@syncfusion/ej2-base';
import { Columns } from '../models/columns';
import * as events from '../base/constant';
import * as cls from '../base/css-constant';
/**
 * Action module is used to perform card actions.
 */
var Action = /** @class */ (function () {
    /**
     * Constructor for action module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    function Action(parent) {
        this.parent = parent;
        this.columnToggleArray = [];
        this.selectionArray = [];
        this.lastCardSelection = null;
        this.lastSelectionRow = null;
        this.lastCard = null;
        this.selectedCardsElement = [];
        this.selectedCardsData = [];
        this.hideColumnKeys = [];
    }
    Action.prototype.clickHandler = function (e) {
        var elementSelector = '.' + cls.CARD_CLASS + ',.' + cls.HEADER_ICON_CLASS + ',.' + cls.CONTENT_ROW_CLASS + '.' +
            cls.SWIMLANE_ROW_CLASS + ',.' + cls.SHOW_ADD_BUTTON + ',.' + cls.FROZEN_SWIMLANE_ROW_CLASS + ',.' + cls.CONTENT_ROW_CLASS +
            ':not(.' + cls.SWIMLANE_ROW_CLASS + ') .' + cls.CONTENT_CELLS_CLASS;
        var target = closest(e.target, elementSelector);
        if (!target) {
            return;
        }
        if (target.classList.contains(cls.CARD_CLASS)) {
            if (this.parent.allowKeyboard) {
                this.parent.keyboardModule.cardTabIndexRemove();
            }
            this.cardClick(e);
        }
        else if (target.classList.contains(cls.HEADER_ICON_CLASS)) {
            this.columnExpandCollapse(e);
        }
        else if (target.classList.contains(cls.CONTENT_ROW_CLASS) && target.classList.contains(cls.SWIMLANE_ROW_CLASS)) {
            this.rowExpandCollapse(e);
        }
        else if (target.classList.contains(cls.SHOW_ADD_BUTTON)) {
            this.addButtonClick(target);
        }
        else if (target.classList.contains(cls.FROZEN_SWIMLANE_ROW_CLASS)) {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + cls.SWIMLANE_ROW_CLASS));
            var targetIcon = this.parent.layoutModule.frozenSwimlaneRow.querySelector('.' + cls.ICON_CLASS);
            this.rowExpandCollapse(e, swimlaneRows[this.parent.layoutModule.frozenOrder]);
            var isCollapsed = targetIcon.classList.contains(cls.SWIMLANE_ROW_COLLAPSE_CLASS) ? true : false;
            if (isCollapsed) {
                classList(targetIcon, [cls.SWIMLANE_ROW_EXPAND_CLASS], [cls.SWIMLANE_ROW_COLLAPSE_CLASS]);
            }
            else {
                classList(targetIcon, [cls.SWIMLANE_ROW_COLLAPSE_CLASS], [cls.SWIMLANE_ROW_EXPAND_CLASS]);
            }
        }
    };
    Action.prototype.addButtonClick = function (target) {
        var _this = this;
        var newData = {};
        if (this.parent.kanbanData.length === 0) {
            newData[this.parent.cardSettings.headerField] = 1;
        }
        else if (typeof (this.parent.kanbanData[0])[this.parent.cardSettings.headerField] === 'number') {
            var id = this.parent.kanbanData.map(function (obj) {
                return parseInt(obj[_this.parent.cardSettings.headerField], 10);
            });
            newData[this.parent.cardSettings.headerField] = Math.max.apply(Math, id) + 1;
        }
        newData[this.parent.keyField] = closest(target, '.' + cls.CONTENT_CELLS_CLASS).getAttribute('data-key');
        if (this.parent.sortSettings.sortBy === 'Index') {
            newData[this.parent.sortSettings.field] = 1;
            if (closest(target, '.' + cls.CONTENT_CELLS_CLASS).querySelector('.' + cls.CARD_CLASS)) {
                var card = this.parent.sortSettings.direction === 'Ascending' ?
                    target.nextElementSibling.classList.contains(cls.BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.lastElementChild : target.nextElementSibling.lastElementChild
                    : target.nextElementSibling.classList.contains(cls.BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.firstElementChild : target.nextElementSibling.firstElementChild;
                var data = this.parent.getCardDetails(card);
                newData[this.parent.sortSettings.field] = data[this.parent.sortSettings.field] + 1;
            }
        }
        if (this.parent.kanbanData.length !== 0 && this.parent.swimlaneSettings.keyField &&
            closest(target, '.' + cls.CONTENT_ROW_CLASS).previousElementSibling) {
            newData[this.parent.swimlaneSettings.keyField] =
                closest(target, '.' + cls.CONTENT_ROW_CLASS).previousElementSibling.getAttribute('data-key');
        }
        this.parent.openDialog('Add', newData);
    };
    Action.prototype.doubleClickHandler = function (e) {
        var target = closest(e.target, '.' + cls.CARD_CLASS);
        if (target) {
            this.cardDoubleClick(e);
        }
    };
    Action.prototype.cardClick = function (e, selectedCard) {
        var _this = this;
        var target = closest((selectedCard) ? selectedCard : e.target, '.' + cls.CARD_CLASS);
        var cardClickObj = this.parent.getCardDetails(target);
        if (cardClickObj) {
            this.parent.activeCardData = { data: cardClickObj, element: target };
            var args = { data: cardClickObj, element: target, cancel: false, event: e };
            this.parent.trigger(events.cardClick, args, function (clickArgs) {
                if (!clickArgs.cancel) {
                    if (target.classList.contains(cls.CARD_SELECTION_CLASS) && e.type === 'click') {
                        removeClass([target], cls.CARD_SELECTION_CLASS);
                        if (_this.parent.enableVirtualization) {
                            _this.parent.virtualLayoutModule.disableAttributeSelection(target);
                        }
                        else {
                            _this.parent.layoutModule.disableAttributeSelection(target);
                        }
                    }
                    else {
                        var isCtrlKey = e.ctrlKey;
                        if (_this.parent.isAdaptive && _this.parent.touchModule) {
                            isCtrlKey = (_this.parent.touchModule.mobilePopup && _this.parent.touchModule.tabHold) || isCtrlKey;
                        }
                        _this.cardSelection(target, isCtrlKey, e.shiftKey);
                    }
                    if (_this.parent.isAdaptive && _this.parent.touchModule) {
                        _this.parent.touchModule.updatePopupContent();
                    }
                    var cell = closest(target, '.' + cls.CONTENT_CELLS_CLASS);
                    if (_this.parent.allowKeyboard) {
                        var element = [].slice.call(cell.querySelectorAll('.' + cls.CARD_CLASS));
                        element.forEach(function (e) { e.setAttribute('tabindex', '0'); });
                        _this.parent.keyboardModule.addRemoveTabIndex('Remove');
                    }
                }
            });
        }
    };
    Action.prototype.cardDoubleClick = function (e) {
        var _this = this;
        var target = closest(e.target, '.' + cls.CARD_CLASS);
        var cardDoubleClickObj = this.parent.getCardDetails(target);
        this.parent.activeCardData = { data: cardDoubleClickObj, element: target };
        this.cardSelection(target, false, false);
        var args = { data: cardDoubleClickObj, element: target, cancel: false, event: e };
        this.parent.trigger(events.cardDoubleClick, args, function (doubleClickArgs) {
            if (!doubleClickArgs.cancel) {
                _this.parent.dialogModule.openDialog('Edit', args.data);
            }
        });
    };
    Action.prototype.rowExpandCollapse = function (e, isFrozenElem) {
        var _this = this;
        var headerTarget = (e instanceof HTMLElement) ? e : e.target;
        var currentSwimlaneHeader = !isNoU(isFrozenElem) ? isFrozenElem : headerTarget;
        var args = { cancel: false, target: headerTarget, requestType: 'rowExpandCollapse' };
        this.parent.trigger(events.actionBegin, args, function (actionArgs) {
            if (!actionArgs.cancel) {
                var target = closest(currentSwimlaneHeader, '.' + cls.SWIMLANE_ROW_CLASS);
                var key = target.getAttribute('data-key');
                var tgtRow = _this.parent.element.querySelector('.' + cls.CONTENT_ROW_CLASS + (":nth-child(" + (target.rowIndex + 2) + ")"));
                var targetIcon = target.querySelector("." + cls.SWIMLANE_ROW_EXPAND_CLASS + ",." + cls.SWIMLANE_ROW_COLLAPSE_CLASS);
                var isCollapsed = target.classList.contains(cls.COLLAPSED_CLASS) ? true : false;
                var tabIndex_1;
                if (isCollapsed) {
                    removeClass([tgtRow, target], cls.COLLAPSED_CLASS);
                    classList(targetIcon, [cls.SWIMLANE_ROW_EXPAND_CLASS], [cls.SWIMLANE_ROW_COLLAPSE_CLASS]);
                    _this.parent.swimlaneToggleArray.splice(_this.parent.swimlaneToggleArray.indexOf(key), 1);
                    tabIndex_1 = '0';
                }
                else {
                    addClass([tgtRow, target], cls.COLLAPSED_CLASS);
                    classList(targetIcon, [cls.SWIMLANE_ROW_COLLAPSE_CLASS], [cls.SWIMLANE_ROW_EXPAND_CLASS]);
                    _this.parent.swimlaneToggleArray.push(key);
                    tabIndex_1 = '-1';
                }
                targetIcon.setAttribute('aria-label', isCollapsed ? key + ' Expand' : key + ' Collapse');
                target.setAttribute('aria-expanded', isCollapsed.toString());
                tgtRow.setAttribute('aria-expanded', isCollapsed.toString());
                var rows = [].slice.call(tgtRow.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS));
                rows.forEach(function (cell) { cell.setAttribute('tabindex', tabIndex_1); });
                _this.parent.notify(events.contentReady, {});
                _this.parent.trigger(events.actionComplete, { target: headerTarget, requestType: 'rowExpandCollapse' });
            }
        });
    };
    Action.prototype.columnExpandCollapse = function (e) {
        var _this = this;
        var headerTarget = (e instanceof HTMLElement) ? e : e.target;
        var args = { cancel: false, target: headerTarget, requestType: 'columnExpandCollapse' };
        this.parent.trigger(events.actionBegin, args, function (actionArgs) {
            if (!actionArgs.cancel) {
                var target = closest(headerTarget, '.' + cls.HEADER_CELLS_CLASS);
                var colIndex = target.cellIndex;
                _this.columnToggle(target);
                var collapsed = _this.parent.element.querySelectorAll("." + cls.HEADER_CELLS_CLASS + "." + cls.COLLAPSED_CLASS).length;
                if (collapsed === (_this.parent.columns.length - _this.hideColumnKeys.length)) {
                    var index = (colIndex + 1 === collapsed) ? 1 : colIndex + 2;
                    var headerSelector = "." + cls.HEADER_CELLS_CLASS + ":not(." + cls.STACKED_HEADER_CELL_CLASS + "):nth-child(" + index + ")";
                    var nextCol = _this.parent.element.querySelector(headerSelector);
                    addClass([nextCol], cls.COLLAPSED_CLASS);
                    _this.columnToggle(nextCol);
                }
                _this.parent.notify(events.contentReady, {});
                _this.parent.trigger(events.actionComplete, { target: headerTarget, requestType: 'columnExpandCollapse' });
            }
        });
    };
    Action.prototype.columnToggle = function (target) {
        var _this = this;
        var colIndex = target.cellIndex;
        var elementSelector = "." + cls.CONTENT_ROW_CLASS + ":not(." + cls.SWIMLANE_ROW_CLASS + ")";
        var targetRow = [].slice.call(this.parent.element.querySelectorAll(elementSelector));
        var colSelector = "." + cls.TABLE_CLASS + " col:nth-child(" + (colIndex + 1) + ")";
        var targetIcon = target.querySelector("." + cls.COLUMN_EXPAND_CLASS + ",." + cls.COLUMN_COLLAPSE_CLASS);
        var colGroup = [].slice.call(this.parent.element.querySelectorAll(colSelector));
        if (target.classList.contains(cls.COLLAPSED_CLASS)) {
            removeClass(colGroup, cls.COLLAPSED_CLASS);
            if (this.parent.isAdaptive) {
                if (this.parent.enableVirtualization) {
                    colGroup.forEach(function (col) { return col.style.width = formatUnit(_this.parent.virtualLayoutModule.getWidth()); });
                }
                else {
                    colGroup.forEach(function (col) { return col.style.width = formatUnit(_this.parent.layoutModule.getWidth()); });
                }
            }
            classList(targetIcon, [cls.COLUMN_EXPAND_CLASS], [cls.COLUMN_COLLAPSE_CLASS]);
            var _loop_1 = function (row) {
                var targetCol = row.querySelector("." + cls.CONTENT_CELLS_CLASS + ":nth-child(" + (colIndex + 1) + ")");
                removeClass([targetCol, target], cls.COLLAPSED_CLASS);
                remove(targetCol.querySelector('.' + cls.COLLAPSE_HEADER_TEXT_CLASS));
                target.setAttribute('aria-expanded', 'true');
                targetCol.setAttribute('aria-expanded', 'true');
                var collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + cls.COLLAPSED_CLASS));
                collapsedCell.forEach(function (cell) {
                    var collapasedText = cell.querySelector('.' + cls.COLLAPSE_HEADER_TEXT_CLASS);
                    collapasedText.style.height = 'auto';
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
            };
            for (var _i = 0, targetRow_1 = targetRow; _i < targetRow_1.length; _i++) {
                var row = targetRow_1[_i];
                _loop_1(row);
            }
            if (this.parent.kanbanData.length === 0 && targetRow.length === 0) {
                removeClass([target], cls.COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'true');
            }
            this.columnToggleArray.splice(this.columnToggleArray.indexOf(target.getAttribute('data-key')), 1);
            this.parent.columns[colIndex].setProperties({ isExpanded: true }, true);
            target.querySelector('.e-header-icon').setAttribute('aria-label', target.getAttribute('data-key') + ' Expand');
        }
        else {
            addClass(colGroup, cls.COLLAPSED_CLASS);
            if (this.parent.isAdaptive) {
                colGroup.forEach(function (col) { return col.style.width = formatUnit(events.toggleWidth); });
            }
            classList(targetIcon, [cls.COLUMN_COLLAPSE_CLASS], [cls.COLUMN_EXPAND_CLASS]);
            var key = target.getAttribute('data-key');
            var _loop_2 = function (row) {
                var targetCol = row.querySelector("." + cls.CONTENT_CELLS_CLASS + "[data-key=\"" + key + "\"]");
                var index = targetCol.cellIndex;
                var text = void 0;
                if (!this_1.parent.enableVirtualization) {
                    text = (this_1.parent.columns[index].showItemCount ? '[' +
                        targetCol.querySelectorAll('.' + cls.CARD_CLASS).length + '] ' : '') + this_1.parent.columns[index].headerText;
                }
                else {
                    var value = this_1.parent.dataModule.isRemote() ?
                        this_1.parent.columnDataCount[this_1.parent.columns[index].keyField]
                        : this_1.parent.virtualLayoutModule.columnData[this_1.parent.columns[index].keyField].length;
                    text = (this_1.parent.columns[index].showItemCount ? '[' +
                        value + '] ' : '') + this_1.parent.columns[index].headerText;
                }
                targetCol.appendChild(createElement('div', { className: cls.COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                addClass([targetCol, target], cls.COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
                targetCol.setAttribute('aria-expanded', 'false');
                var collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + cls.COLLAPSED_CLASS));
                collapsedCell.forEach(function (cell) {
                    var collapasedText = cell.querySelector('.' + cls.COLLAPSE_HEADER_TEXT_CLASS);
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
            };
            var this_1 = this;
            for (var _a = 0, targetRow_2 = targetRow; _a < targetRow_2.length; _a++) {
                var row = targetRow_2[_a];
                _loop_2(row);
            }
            if (this.parent.kanbanData.length === 0 && targetRow.length === 0) {
                addClass([target], cls.COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
            }
            this.columnToggleArray.push(target.getAttribute('data-key'));
            this.parent.columns[colIndex].setProperties({ isExpanded: false }, true);
            target.querySelector('.e-header-icon').setAttribute('aria-label', key + ' Collapse');
        }
    };
    Action.prototype.cardSelection = function (target, isCtrl, isShift) {
        var _this = this;
        if (!target) {
            return;
        }
        var cards = this.parent.getSelectedCards();
        if (this.parent.cardSettings.selectionType !== 'None') {
            var contentRow = closest(target, '.' + cls.CONTENT_ROW_CLASS);
            var index = !isNoU(this.lastSelectionRow) ? this.lastSelectionRow.rowIndex : contentRow.rowIndex;
            if (index !== contentRow.rowIndex && (isCtrl || isShift) && this.parent.cardSettings.selectionType === 'Multiple') {
                return;
            }
            if (cards.length !== 0 && (!isCtrl || this.parent.cardSettings.selectionType === 'Single')) {
                removeClass(cards, cls.CARD_SELECTION_CLASS);
                if (this.parent.enableVirtualization) {
                    this.parent.virtualLayoutModule.disableAttributeSelection(cards);
                }
                else {
                    this.parent.layoutModule.disableAttributeSelection(cards);
                }
                cards.forEach(function (el) {
                    _this.selectionArray.splice(_this.selectionArray.indexOf(el.getAttribute('data-id')), 1);
                    _this.selectedCardsElement.splice(_this.selectedCardsElement.indexOf(el), 1);
                    _this.selectedCardsData.splice(_this.selectedCardsData.indexOf(_this.parent.getCardDetails(el), 1));
                });
            }
            if (cards.length > 0 && isShift && this.parent.cardSettings.selectionType === 'Multiple') {
                var curCards_1 = [];
                var start = void 0;
                var end = void 0;
                var i = void 0;
                var allCards = [].slice.call(contentRow.querySelectorAll('.' + cls.CARD_CLASS));
                allCards.forEach(function (el) { return curCards_1.push(el.getAttribute('data-id')); });
                var curId = target.getAttribute('data-id');
                var lastId = this.lastCard.getAttribute('data-id');
                var curIndex = end = curCards_1.indexOf(curId);
                var lastIndex = start = curCards_1.indexOf(lastId);
                var select = curIndex > lastIndex ? 'next' : 'prev';
                if (select === 'prev') {
                    start = curIndex;
                    end = lastIndex;
                }
                for (i = start; i <= end; i++) {
                    var card = allCards[i];
                    addClass([card], cls.CARD_SELECTION_CLASS);
                    card.setAttribute('aria-selected', 'true');
                    card.setAttribute('tabindex', '0');
                    this.selectionArray.push(card.getAttribute('data-id'));
                    this.selectedCardsElement.push(card);
                    this.selectedCardsData.push(this.parent.getCardDetails(card));
                    this.lastCardSelection = card;
                    if (select === 'prev') {
                        this.lastCardSelection = allCards[start];
                    }
                }
            }
            else {
                addClass([target], cls.CARD_SELECTION_CLASS);
                target.setAttribute('aria-selected', 'true');
                target.setAttribute('tabindex', '0');
                this.selectionArray.push(target.getAttribute('data-id'));
                this.selectedCardsElement.push(target);
                this.selectedCardsData.push(this.parent.getCardDetails(target));
                this.lastCard = this.lastCardSelection = target;
                this.lastSelectionRow = closest(target, '.' + cls.CONTENT_ROW_CLASS);
                if (this.lastSelectionRow.previousElementSibling) {
                    var elementSelector = "." + cls.SWIMLANE_ROW_EXPAND_CLASS + ",." + cls.SWIMLANE_ROW_COLLAPSE_CLASS;
                    var parentEle = this.lastSelectionRow.previousElementSibling.querySelector(elementSelector);
                    if (parentEle && parentEle.classList.contains(cls.SWIMLANE_ROW_COLLAPSE_CLASS)) {
                        this.rowExpandCollapse(parentEle);
                    }
                }
            }
        }
    };
    Action.prototype.addColumn = function (columnOptions, index) {
        var addColumn = createInstance(Columns, [this.parent, 'columns', columnOptions, true]);
        this.parent.columns.splice(index, 0, addColumn);
        this.parent.notify(events.dataReady, { processedData: this.parent.kanbanData });
    };
    Action.prototype.deleteColumn = function (index) {
        var listKey = this.parent.element.querySelectorAll('.' + cls.HEADER_CELLS_CLASS).item(index);
        if (listKey && listKey.classList.contains(cls.HEADER_ROW_TOGGLE_CLASS)) {
            this.columnToggleArray.splice(this.columnToggleArray.indexOf(listKey.getAttribute('data-key'), 0));
        }
        this.parent.columns.splice(index, 1);
        if (this.parent.columns.length === 0) {
            detach(this.parent.element.querySelector('.' + cls.HEADER_CLASS));
            detach(this.parent.element.querySelector('.' + cls.CONTENT_CLASS));
        }
        else {
            this.parent.notify(events.dataReady, { processedData: this.parent.kanbanData });
        }
    };
    Action.prototype.showColumn = function (key) {
        var index = this.hideColumnKeys.indexOf(key.toString());
        if (index !== -1) {
            this.hideColumnKeys.splice(index, 1);
            this.parent.notify(events.dataReady, { processedData: this.parent.kanbanData });
        }
    };
    Action.prototype.hideColumn = function (key) {
        this.hideColumnKeys.push(key.toString());
        this.parent.notify(events.dataReady, { processedData: this.parent.kanbanData });
    };
    /**
     * Maintain the single card selection
     *
     * @param {Record<string, any>} data - Specifies the selected card data.
     * @returns {void}
     * @private
     * @hidden
     */
    Action.prototype.SingleCardSelection = function (data) {
        if (this.parent.cardSettings.selectionType !== 'None' && data[this.parent.cardSettings.headerField]) {
            // eslint-disable-next-line no-useless-escape
            var card = this.parent.element.querySelector('.e-card[data-id=\"' +
                // eslint-disable-next-line no-useless-escape
                data[this.parent.cardSettings.headerField].toString() + '"\]');
            if (card) {
                addClass([card], cls.CARD_SELECTION_CLASS);
                card.setAttribute('aria-selected', 'true');
                card.setAttribute('tabindex', '0');
            }
        }
    };
    return Action;
}());
export { Action };
