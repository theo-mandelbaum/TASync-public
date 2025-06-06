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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { append, createElement, formatUnit, EventHandler, addClass, remove, extend, Browser, isNullOrUndefined as isNoU, removeClass, closest, setStyleAttribute } from '@syncfusion/ej2-base';
import { MobileLayout } from './mobile-layout';
import * as events from '../base/constant';
import * as cls from '../base/css-constant';
/**
 * Kanban layout rendering module
 *
 */
var LayoutRender = /** @class */ (function (_super) {
    __extends(LayoutRender, _super);
    function LayoutRender(parent) {
        var _this = _super.call(this, parent) || this;
        _this.kanbanRows = [];
        _this.parent = parent;
        _this.columnKeys = [];
        _this.swimlaneIndex = 0;
        _this.swimlaneData = {};
        _this.scrollLeft = 0;
        _this.frozenOrder = 0;
        _this.parent.on(events.dataReady, _this.initRender, _this);
        _this.parent.on(events.contentReady, _this.scrollUiUpdate, _this);
        return _this;
    }
    LayoutRender.prototype.initRender = function () {
        if (this.parent.columns.length === 0) {
            return;
        }
        this.columnData = this.getColumnCards();
        this.kanbanRows = this.getRows();
        this.swimlaneData = this.getSwimlaneCards();
        if (this.parent.isAdaptive) {
            var parent_1 = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
            if (parent_1) {
                this.scrollLeft = parent_1.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(events.dataReady, this.initRender, this);
        this.parent.on(events.contentReady, this.scrollUiUpdate, this);
        if (this.parent.isAdaptive && this.parent.swimlaneSettings.keyField && this.parent.kanbanData.length !== 0) {
            this.renderSwimlaneHeader();
        }
        var header = createElement('div', { className: cls.HEADER_CLASS });
        this.parent.element.appendChild(header);
        this.renderHeader(header);
        this.renderContent();
        this.renderCards();
        this.renderValidation();
        this.parent.renderTemplates();
        this.parent.notify(events.contentReady, {});
        this.wireEvents();
        if (this.parent.isInitialRender) {
            this.parent.isInitialRender = false;
        }
    };
    LayoutRender.prototype.renderHeader = function (header) {
        var headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? cls.SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        var headerTable = createElement('table', {
            className: cls.TABLE_CLASS + ' ' + cls.HEADER_TABLE_CLASS
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        var tableHead = createElement('thead');
        var tableBody = createElement('tbody', { className: 'e-hide', innerHTML: '<tr><td></td></tr>', attrs: { 'role': 'rowgroup' } });
        headerTable.appendChild(tableBody);
        headerTable.appendChild(tableHead);
        if (this.parent.stackedHeaders.length > 0) {
            tableHead.appendChild(this.createStackedRow(this.parent.stackedHeaders));
        }
        var tr = createElement('tr', { className: cls.HEADER_ROW_CLASS });
        tableHead.appendChild(tr);
        var _loop_1 = function (column) {
            if (this_1.isColumnVisible(column)) {
                var index = this_1.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var th_1 = createElement('th', {
                    className: index === -1 ? cls.HEADER_CELLS_CLASS : cls.HEADER_CELLS_CLASS + ' ' + cls.COLLAPSED_CLASS,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'scope': 'col' }
                });
                var classList = [];
                if (column.allowToggle) {
                    classList.push(cls.HEADER_ROW_TOGGLE_CLASS);
                    if (!column.isExpanded) {
                        classList.push(cls.COLLAPSED_CLASS);
                    }
                }
                addClass([th_1], classList);
                var headerWrapper = createElement('div', { className: cls.HEADER_WRAP_CLASS });
                th_1.appendChild(headerWrapper);
                this_1.columnData = this_1.getColumnCards(this_1.parent.kanbanData);
                var noOfCard = this_1.columnData[column.keyField].length;
                var headerTitle = createElement('div', { className: cls.HEADER_TITLE_CLASS });
                headerWrapper.appendChild(headerTitle);
                if (column.template) {
                    var templateArgs = {
                        keyField: column.keyField, headerText: column.headerText, minCount: column.minCount, maxCount: column.maxCount,
                        allowToggle: column.allowToggle, isExpanded: column.isExpanded, showItemCount: column.showItemCount, count: noOfCard
                    };
                    addClass([th_1], cls.TEMPLATE_CLASS);
                    var templateId = this_1.parent.element.id + '_columnTemplate';
                    var templateHeader = this_1.parent.templateParser(column.template)(templateArgs, this_1.parent, 'columnTemplate', templateId, false);
                    append(templateHeader, headerTitle);
                }
                else {
                    var header_1 = createElement('div', { className: cls.HEADER_TEXT_CLASS, innerHTML: column.headerText });
                    headerTitle.appendChild(header_1);
                    if (column.showItemCount) {
                        var itemCount = createElement('div', {
                            className: cls.CARD_ITEM_COUNT_CLASS,
                            innerHTML: '- ' + noOfCard.toString() + ' ' + this_1.parent.localeObj.getConstant('items')
                        });
                        headerTitle.appendChild(itemCount);
                    }
                }
                if (column.allowToggle) {
                    var isExpand = (column.isExpanded && index === -1) ? true : false;
                    var name_1 = (isExpand) ? cls.COLUMN_EXPAND_CLASS : cls.COLUMN_COLLAPSE_CLASS;
                    var icon = createElement('div', {
                        className: cls.HEADER_ICON_CLASS + ' ' + cls.ICON_CLASS + ' ' + name_1,
                        attrs: { 'tabindex': '0', 'role': 'button' }
                    });
                    icon.setAttribute('aria-label', isExpand ? column.keyField + ' Expand' : column.keyField + ' Collapse');
                    th_1.setAttribute('aria-expanded', isExpand.toString());
                    headerWrapper.appendChild(icon);
                }
                var dataObj = [{ keyField: column.keyField, textField: column.headerText, count: noOfCard }];
                var args = { data: dataObj, element: tr, cancel: false, requestType: 'headerRow' };
                this_1.parent.trigger(events.queryCellInfo, args, function (columnArgs) {
                    if (!columnArgs.cancel) {
                        tr.appendChild(th_1);
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            _loop_1(column);
        }
    };
    LayoutRender.prototype.renderContent = function () {
        var content = createElement('div', { className: cls.CONTENT_CLASS });
        this.parent.element.appendChild(content);
        var contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? cls.SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        var contentTable = createElement('table', {
            className: cls.TABLE_CLASS + ' ' + cls.CONTENT_TABLE_CLASS, attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        var tHead = createElement('thead', { className: 'e-hide', attrs: { 'role': 'none' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var thElem = createElement('th', { id: column.keyField, innerHTML: column.keyField, attrs: { 'scope': 'col' } });
            thElem.style.display = 'none';
            tHead.appendChild(thElem);
        }
        contentTable.appendChild(tHead);
        var tBody = createElement('tbody', { attrs: { 'role': 'treegrid', 'aria-label': 'Kanban Content' } });
        contentTable.appendChild(tBody);
        var isCollaspsed = false;
        this.swimlaneRow = this.kanbanRows;
        this.initializeSwimlaneTree();
        for (var _b = 0, _c = this.swimlaneRow; _b < _c.length; _b++) {
            var row = _c[_b];
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                var index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
                this.renderSwimlaneRow(tBody, row, isCollaspsed);
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    };
    LayoutRender.prototype.renderSingleContent = function (tBody, row, isCollaspsed) {
        var className = isCollaspsed ? cls.CONTENT_ROW_CLASS + ' ' + cls.COLLAPSED_CLASS : cls.CONTENT_ROW_CLASS;
        var tr = createElement('tr', { className: className,
            attrs: { 'role': 'row', 'aria-label': row.keyField + 'row content' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (this.isColumnVisible(column)) {
                var index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var className_1 = index === -1 ? cls.CONTENT_CELLS_CLASS : cls.CONTENT_CELLS_CLASS + ' ' + cls.COLLAPSED_CLASS;
                var dragClass = (column.allowDrag ? ' ' + cls.DRAG_CLASS : '') + (column.allowDrop ? ' ' + cls.DROP_CLASS
                    + ' ' + cls.DROPPABLE_CLASS : '');
                var td = createElement('td', {
                    className: className_1 + dragClass, attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'tabindex': '0',
                        'aria-describedby': column.keyField.toString(), 'role': 'gridcell' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], cls.COLLAPSED_CLASS);
                    var text = (column.showItemCount ? '[' +
                        this.getColumnData(column.keyField, this.swimlaneData[row.keyField]).length + '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: cls.COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    var button = createElement('div', { className: cls.SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: cls.SHOW_ADD_ICON + ' ' + cls.ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
            }
        }
        var dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        var args = { data: dataObj, element: tr, cancel: false, requestType: 'contentRow' };
        this.parent.trigger(events.queryCellInfo, args, function (columnArgs) {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    };
    LayoutRender.prototype.initializeSwimlaneTree = function () {
        if (this.parent.swimlaneSettings.keyField && this.parent.isAdaptive && this.parent.kanbanData.length !== 0) {
            var swimlaneHeaderName = this.parent.element.querySelector('.' + cls.TOOLBAR_SWIMLANE_NAME_CLASS);
            this.swimlaneRow = [this.kanbanRows[this.swimlaneIndex]];
            this.renderSwimlaneTree();
            if (this.parent.swimlaneSettings.template) {
                var cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                var templateArgs = extend({}, this.swimlaneRow[0], { count: cardCount }, true);
                var swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', '', false);
                swimlaneHeaderName.appendChild(swimlaneTemplate[0]);
            }
            else {
                swimlaneHeaderName.innerHTML = this.swimlaneRow[0].textField;
                if (this.parent.swimlaneSettings.showItemCount) {
                    var cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                    var targetItemCountElement = this.parent.element.querySelector('.' + cls.SWIMLANE_HEADER_TOOLBAR_CLASS);
                    var itemCountElement = void 0;
                    var itemCountInnerElement = void 0;
                    if (!isNoU(targetItemCountElement)) {
                        itemCountElement = createElement('div', { className: cls.TOOLBAR_SWIMLANE_ITEM_COUNT_CLASS });
                        itemCountInnerElement = createElement('div', { className: cls.CARD_ITEM_COUNT_CLASS });
                        itemCountElement.appendChild(itemCountInnerElement);
                        targetItemCountElement.appendChild(itemCountElement);
                    }
                    itemCountInnerElement.innerHTML = "- " + cardCount + " " + this.parent.localeObj.getConstant('items');
                }
            }
        }
    };
    LayoutRender.prototype.renderSwimlaneRow = function (tBody, row, isCollapsed) {
        var name = cls.CONTENT_ROW_CLASS + ' ' + cls.SWIMLANE_ROW_CLASS;
        var className = isCollapsed ? ' ' + cls.COLLAPSED_CLASS : '';
        var tr = createElement('tr', {
            className: name + className, attrs: { 'aria-label': row.keyField + ' row header',
                'role': 'row', 'data-key': row.keyField, 'aria-expanded': (!isCollapsed).toString() }
        });
        var col = this.parent.columns.length - this.parent.actionModule.hideColumnKeys.length;
        var td = createElement('td', { className: cls.CONTENT_CELLS_CLASS,
            attrs: { 'data-role': 'kanban-column', 'role': 'gridcell', colspan: col.toString() } });
        var swimlaneHeader = createElement('div', { className: cls.SWIMLANE_HEADER_CLASS });
        td.appendChild(swimlaneHeader);
        var iconClass = isCollapsed ? cls.SWIMLANE_ROW_COLLAPSE_CLASS : cls.SWIMLANE_ROW_EXPAND_CLASS;
        var iconDiv = createElement('div', {
            className: cls.ICON_CLASS + ' ' + iconClass, attrs: {
                'tabindex': '0', 'role': 'button', 'aria-label': isCollapsed ? row.keyField + ' Collapse' : row.keyField + ' Expand'
            }
        });
        swimlaneHeader.appendChild(iconDiv);
        var headerWrap = createElement('div', { className: cls.HEADER_WRAP_CLASS });
        swimlaneHeader.appendChild(headerWrap);
        var cardCount = this.swimlaneData[row.keyField].length;
        if (this.parent.swimlaneSettings.template) {
            var templateArgs = extend({}, row, { count: cardCount }, true);
            addClass([td], cls.TEMPLATE_CLASS);
            var templateId = this.parent.element.id + '_swimlaneTemplate';
            var swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', templateId, false);
            append(swimlaneTemplate, headerWrap);
        }
        else {
            headerWrap.appendChild(createElement('div', {
                className: cls.SWIMLANE_ROW_TEXT_CLASS,
                innerHTML: row.textField,
                attrs: { 'data-role': row.textField }
            }));
        }
        if (this.parent.swimlaneSettings.showItemCount) {
            swimlaneHeader.appendChild(createElement('div', {
                className: cls.CARD_ITEM_COUNT_CLASS,
                innerHTML: "- " + cardCount.toString() + " " + this.parent.localeObj.getConstant('items')
            }));
        }
        tr.appendChild(td);
        var dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        var args = { data: dataObj, element: tr, cancel: false, requestType: 'swimlaneRow' };
        this.parent.trigger(events.queryCellInfo, args, function (columnArgs) {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    };
    LayoutRender.prototype.renderCards = function () {
        var _this = this;
        var rows = this.swimlaneRow;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        var removeTrs = [];
        var columnTransition = false;
        cardRows.forEach(function (tr, index) {
            var dataCount = 0;
            var _loop_2 = function (column) {
                if (_this.isColumnVisible(column)) {
                    var columnData = _this.parent.swimlaneSettings.keyField ?
                        _this.getColumnData(column.keyField, (_this.parent.swimlaneSettings.showEmptyRow &&
                            isNoU(_this.swimlaneData[rows[index].keyField])) ? []
                            : _this.swimlaneData[rows[index].keyField]) : _this.columnData[column.keyField];
                    dataCount += columnData.length;
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var cardWrapper_1 = createElement('div', {
                        className: cls.CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox', 'tabindex': '0',
                            'aria-label': column.keyField.toString()
                        }
                    });
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNoU(_this.parent.swimlaneSettings.keyField)) {
                        var borderElem = createElement('div', { className: cls.BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper_1);
                    if (columnData.length > 0) {
                        var _loop_3 = function (data) {
                            var cardText = data[_this.parent.cardSettings.headerField];
                            var cardIndex = _this.parent.actionModule.selectionArray.indexOf(cardText);
                            var cardElement = _this.renderCard(data);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], cls.CARD_SELECTION_CLASS);
                            }
                            var args = { data: data, element: cardElement, cancel: false };
                            _this.parent.trigger(events.cardRendered, args, function (cardArgs) {
                                if (!cardArgs.cancel) {
                                    cardWrapper_1.appendChild(cardElement);
                                }
                            });
                        };
                        for (var _i = 0, _a = columnData; _i < _a.length; _i++) {
                            var data = _a[_i];
                            _loop_3(data);
                        }
                    }
                    else {
                        cardWrapper_1.appendChild(_this.renderEmptyCard());
                    }
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_2(column);
            }
            if (dataCount === 0) {
                removeTrs.push(tr);
                if (swimlaneRows.length > 0) {
                    removeTrs.push(swimlaneRows[index]);
                }
            }
        });
        if (!this.parent.swimlaneSettings.showEmptyRow && (this.parent.kanbanData.length === 0 && !this.parent.showEmptyColumn)) {
            removeTrs.forEach(function (tr) { return remove(tr); });
        }
    };
    LayoutRender.prototype.renderCard = function (data) {
        var cardElement = createElement('div', {
            className: cls.CARD_CLASS,
            attrs: { 'data-id': data[this.parent.cardSettings.headerField], 'data-key': data[this.parent.keyField],
                'aria-selected': 'false', 'tabindex': '-1', 'role': 'option', 'aria-roledescription': 'Card'
            }
        });
        if (this.parent.cardHeight !== 'auto') {
            cardElement.style.height = formatUnit(this.parent.cardHeight);
        }
        if (this.parent.cardSettings.template) {
            addClass([cardElement], cls.TEMPLATE_CLASS);
            var templateId = this.parent.element.id + '_cardTemplate';
            var cardTemplate = this.parent.templateParser(this.parent.cardSettings.template)(data, this.parent, 'cardTemplate', templateId, false);
            append(cardTemplate, cardElement);
        }
        else {
            var tooltipClass = this.parent.enableTooltip ? ' ' + cls.TOOLTIP_TEXT_CLASS : '';
            if (this.parent.cardSettings.showHeader) {
                var cardHeader = createElement('div', { className: cls.CARD_HEADER_CLASS });
                var cardCaption = createElement('div', { className: cls.CARD_HEADER_TEXT_CLASS });
                var cardText = createElement('div', {
                    className: cls.CARD_HEADER_TITLE_CLASS + tooltipClass,
                    innerHTML: data[this.parent.cardSettings.headerField] || ''
                });
                cardHeader.appendChild(cardCaption);
                cardCaption.appendChild(cardText);
                cardElement.appendChild(cardHeader);
            }
            var cardContent = createElement('div', {
                className: cls.CARD_CONTENT_CLASS + tooltipClass,
                innerHTML: data[this.parent.cardSettings.contentField] || ''
            });
            cardElement.appendChild(cardContent);
            if (this.parent.cardSettings.tagsField && data[this.parent.cardSettings.tagsField]) {
                var cardTags = createElement('div', { className: cls.CARD_TAGS_CLASS });
                var tags = data[this.parent.cardSettings.tagsField].toString().split(',');
                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    var tag = tags_1[_i];
                    cardTags.appendChild(createElement('div', {
                        className: cls.CARD_TAG_CLASS + ' ' + cls.CARD_LABEL_CLASS, innerHTML: tag
                    }));
                }
                cardElement.appendChild(cardTags);
            }
            if (this.parent.cardSettings.grabberField && data[this.parent.cardSettings.grabberField]) {
                addClass([cardElement], cls.CARD_COLOR_CLASS);
                cardElement.style.borderLeftColor = data[this.parent.cardSettings.grabberField];
            }
            if (this.parent.cardSettings.footerCssField) {
                var cardFields = createElement('div', { className: cls.CARD_FOOTER_CLASS });
                var keys = data[this.parent.cardSettings.footerCssField].split(',');
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    cardFields.appendChild(createElement('div', {
                        className: key.trim() + ' ' + cls.CARD_FOOTER_CSS_CLASS
                    }));
                }
                cardElement.appendChild(cardFields);
            }
        }
        return cardElement;
    };
    LayoutRender.prototype.renderEmptyCard = function () {
        var emptyCard = createElement('span', {
            className: cls.EMPTY_CARD_CLASS, innerHTML: this.parent.localeObj.getConstant('noCard'),
            attrs: { 'aria-label': this.parent.localeObj.getConstant('noCard'), 'role': 'option' }
        });
        return emptyCard;
    };
    LayoutRender.prototype.renderColGroup = function (table) {
        var _this = this;
        var colGroup = createElement('colgroup');
        this.parent.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                var index = _this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var isToggle = column.allowToggle && !column.isExpanded;
                var className = index === -1 ? (isToggle ? cls.COLLAPSED_CLASS : '') : cls.COLLAPSED_CLASS;
                var col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() }
                });
                if (_this.parent.isAdaptive) {
                    var width = isToggle ? formatUnit(events.toggleWidth) : formatUnit(_this.getWidth());
                    col.style.width = width;
                }
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    };
    LayoutRender.prototype.getRows = function () {
        var _this = this;
        var kanbanRows = [];
        if (this.parent.swimlaneSettings.keyField) {
            this.parent.kanbanData.map(function (obj) {
                if (!_this.parent.swimlaneSettings.showEmptyRow) {
                    if ((isNoU(obj[_this.parent.keyField])) || (obj[_this.parent.keyField] === '') ||
                        (obj[_this.parent.keyField] && _this.columnKeys.indexOf(obj[_this.parent.keyField].toString()) === -1)) {
                        return;
                    }
                }
                var textField = obj[_this.parent.swimlaneSettings.textField] || obj[_this.parent.swimlaneSettings.keyField];
                var keyField = obj[_this.parent.swimlaneSettings.keyField];
                if (!obj[_this.parent.swimlaneSettings.keyField]) {
                    if (_this.parent.swimlaneSettings.showUnassignedRow) {
                        textField = _this.parent.localeObj.getConstant('unassigned');
                        keyField = '';
                    }
                    else {
                        return;
                    }
                }
                kanbanRows.push({ keyField: keyField, textField: textField });
            });
            kanbanRows = kanbanRows.filter(function (item, index, arr) {
                return index === arr.map(function (item) { return item.keyField; }).indexOf(item.keyField);
            });
            kanbanRows = this.swimlaneSorting(kanbanRows);
            kanbanRows.forEach(function (row) {
                row.count = _this.parent.kanbanData.filter(function (obj) {
                    return _this.columnKeys.indexOf(obj[_this.parent.keyField]) > -1 &&
                        obj[_this.parent.swimlaneSettings.keyField] === row.keyField;
                }).length;
            });
            if (kanbanRows.length === 0) {
                kanbanRows.push({ keyField: '', textField: '' });
            }
        }
        else {
            kanbanRows.push({ keyField: '', textField: '' });
        }
        return kanbanRows;
    };
    LayoutRender.prototype.swimlaneSorting = function (rows) {
        if (this.parent.swimlaneSettings.sortComparer) {
            rows = this.parent.swimlaneSettings.sortComparer.call(this.parent, rows);
        }
        else {
            rows.sort(function (a, b) { return a.textField.localeCompare(b.textField, undefined, { numeric: true }); });
            if (this.parent.swimlaneSettings.sortDirection === 'Descending') {
                rows.reverse();
            }
        }
        return rows;
    };
    LayoutRender.prototype.createStackedRow = function (rows) {
        var tr = createElement('tr', { className: cls.HEADER_ROW_CLASS + ' ' + cls.STACKED_HEADER_ROW_CLASS });
        var stackedHeaders = [];
        this.parent.columns.forEach(function (column) {
            var headerText = '';
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                if (row.keyFields.indexOf(column.keyField.toString()) !== -1) {
                    headerText = row.text;
                }
            }
            stackedHeaders.push(headerText);
        });
        for (var h = 0; h < stackedHeaders.length; h++) {
            var colSpan = 1;
            for (var j = h + 1; j < stackedHeaders.length; j++) {
                if ((stackedHeaders[h] !== '') && (stackedHeaders[j] !== '') && stackedHeaders[h] === stackedHeaders[j]) {
                    colSpan++;
                }
                else {
                    break;
                }
            }
            var div = createElement('div', { className: cls.HEADER_TEXT_CLASS, innerHTML: stackedHeaders[h] });
            var th = createElement('th', {
                className: cls.HEADER_CELLS_CLASS + ' ' + cls.STACKED_HEADER_CELL_CLASS,
                attrs: { 'colspan': colSpan.toString(), 'scope': 'col' }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    };
    LayoutRender.prototype.scrollUiUpdate = function () {
        var _this = this;
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        var height = this.parent.element.offsetHeight - header.offsetHeight;
        if (this.parent.isAdaptive) {
            height = window.innerHeight - (header.offsetHeight + events.bottomSpace);
            var swimlaneToolbar = this.parent.element.querySelector('.' + cls.SWIMLANE_HEADER_CLASS);
            if (swimlaneToolbar) {
                height -= swimlaneToolbar.offsetHeight;
            }
            var cardWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS));
            cardWrappers.forEach(function (cell) {
                var cardWrapper = cell.querySelector('.' + cls.CARD_WRAPPER_CLASS);
                if (!cardWrapper.classList.contains(cls.MULTI_CARD_WRAPPER_CLASS)) {
                    cardWrapper.style.height = formatUnit(height);
                    EventHandler.add(cell, 'touchmove', _this.onAdaptiveScroll, _this);
                }
            });
        }
        if (this.parent.height !== 'auto' && this.parent.height !== '100%') {
            content.style.height = formatUnit(height);
        }
        [].slice.call(header.children).forEach(function (node) {
            var paddingValue = 0;
            if ((content.offsetWidth - content.clientWidth) > 0) {
                paddingValue = 17;
                if ((content.offsetHeight - content.clientHeight) > 0) {
                    node.style.width = formatUnit(content.clientWidth);
                }
            }
            if (_this.parent.enableRtl) {
                node.style.paddingLeft = formatUnit(paddingValue);
            }
            else {
                node.style.paddingRight = formatUnit(paddingValue);
            }
        });
        this.updateScrollPosition();
    };
    LayoutRender.prototype.onContentScroll = function (e) {
        var target = e.target;
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        [].slice.call(header.children).forEach(function (node) { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
        if (!isNoU(this.parent.swimlaneSettings.keyField) && this.parent.swimlaneSettings.enableFrozenRows) {
            this.frozenRows(e);
        }
    };
    LayoutRender.prototype.addFrozenSwimlaneDataKey = function (currentElem) {
        var frozenKey = currentElem.getAttribute('data-key');
        if (!isNoU(frozenKey)) {
            this.frozenSwimlaneRow.setAttribute('data-key', frozenKey);
        }
    };
    LayoutRender.prototype.frozenRows = function (e) {
        var firstSwimlane = this.parent.element.querySelector('.' + cls.SWIMLANE_ROW_CLASS);
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        if (isNoU(this.frozenSwimlaneRow)) {
            this.frozenSwimlaneRow = createElement('div', { className: cls.FROZEN_SWIMLANE_ROW_CLASS });
            var frozenRow = createElement('div', { className: cls.FROZEN_ROW_CLASS });
            this.frozenSwimlaneRow.appendChild(frozenRow);
            this.parent.element.insertBefore(this.frozenSwimlaneRow, this.parent.element.firstElementChild);
            frozenRow.appendChild(firstSwimlane.querySelector('.' + cls.SWIMLANE_HEADER_CLASS).cloneNode(true));
            this.addFrozenSwimlaneDataKey(firstSwimlane);
            setStyleAttribute(this.frozenSwimlaneRow, { height: formatUnit(firstSwimlane.getBoundingClientRect().height),
                width: formatUnit(content.querySelector('.e-swimlane').getBoundingClientRect().width),
                top: formatUnit(header.getBoundingClientRect().height.toString())
            });
            setStyleAttribute(header, { position: 'relative', top: formatUnit((-this.frozenSwimlaneRow.getBoundingClientRect().height)) });
            setStyleAttribute(content, { position: 'relative', top: formatUnit((-this.frozenSwimlaneRow.getBoundingClientRect().height)) });
        }
        else {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + cls.SWIMLANE_ROW_CLASS));
            var curSwim = swimlaneRows[this.frozenOrder];
            var prevSwim = swimlaneRows[this.frozenOrder - 1];
            var nextSwim = swimlaneRows[this.frozenOrder + 1];
            var curSwimHeight = void 0;
            var prevSwimHeight = void 0;
            var nextSwimHeight = void 0;
            if (curSwim) {
                curSwimHeight = curSwim.getBoundingClientRect().top + curSwim.getBoundingClientRect().height;
            }
            if (prevSwim) {
                prevSwimHeight = prevSwim.getBoundingClientRect().top + prevSwim.getBoundingClientRect().height;
            }
            if (nextSwim) {
                nextSwimHeight = nextSwim.getBoundingClientRect().top + nextSwim.getBoundingClientRect().height;
            }
            var frozenSwimHeight = content.getBoundingClientRect().top + this.frozenSwimlaneRow.getBoundingClientRect().height;
            var frozenRowsElement = this.frozenSwimlaneRow.querySelector('.' + cls.FROZEN_ROW_CLASS);
            if (nextSwimHeight && frozenSwimHeight >= nextSwimHeight && this.frozenOrder < swimlaneRows.length - 1) {
                if (frozenRowsElement) {
                    remove(frozenRowsElement.querySelector('.' + cls.SWIMLANE_HEADER_CLASS));
                    frozenRowsElement.appendChild(nextSwim.querySelector('.' + cls.SWIMLANE_HEADER_CLASS).cloneNode(true));
                    this.addFrozenSwimlaneDataKey(nextSwim);
                }
                ++this.frozenOrder;
            }
            else if (prevSwimHeight && frozenSwimHeight < curSwimHeight && frozenSwimHeight > prevSwimHeight && this.frozenOrder > 0) {
                if (frozenRowsElement) {
                    remove(frozenRowsElement.querySelector('.' + cls.SWIMLANE_HEADER_CLASS));
                    frozenRowsElement.appendChild(prevSwim.querySelector('.' + cls.SWIMLANE_HEADER_CLASS).cloneNode(true));
                    this.addFrozenSwimlaneDataKey(prevSwim);
                }
                --this.frozenOrder;
            }
        }
        if (e && e.target.scrollTop === 0) {
            this.removeFrozenRows();
        }
    };
    LayoutRender.prototype.removeFrozenRows = function () {
        remove(this.frozenSwimlaneRow);
        this.frozenSwimlaneRow = null;
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        setStyleAttribute(header, { position: '', top: '' });
        setStyleAttribute(content, { position: '', top: '' });
        this.parent.scrollPosition.content = { left: this.parent.scrollPosition.content.left, top: 0 };
        content.scrollTop = 0;
        this.frozenOrder = 0;
    };
    LayoutRender.prototype.onColumnScroll = function (e) {
        var target = e.target;
        if (target.offsetParent) {
            var columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column["" + columnKey] = { left: target.scrollLeft, top: target.scrollTop };
        }
    };
    LayoutRender.prototype.onAdaptiveScroll = function (e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    };
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean}
     * @private
     * @hidden
     */
    LayoutRender.prototype.isColumnVisible = function (column) {
        var _this = this;
        var isVisible = false;
        var isNumeric = typeof column.keyField === 'number';
        if (isNumeric) {
            isVisible = this.parent.actionModule.hideColumnKeys.indexOf(column.keyField.toString()) === -1;
        }
        else {
            column.keyField.split(',').forEach(function (key) { isVisible = _this.parent.actionModule.hideColumnKeys.indexOf(key) === -1; });
        }
        return isVisible;
    };
    LayoutRender.prototype.renderLimits = function (column, target) {
        var limits = createElement('div', { className: cls.LIMITS_CLASS });
        if (column.minCount) {
            limits.appendChild(createElement('div', {
                className: cls.MIN_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('min') + ': ' + column.minCount.toString()
            }));
        }
        if (column.maxCount) {
            limits.appendChild(createElement('div', {
                className: cls.MAX_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('max') + ': ' + column.maxCount.toString()
            }));
        }
        if (limits.childElementCount > 0) {
            if (target.querySelector('.' + cls.CARD_WRAPPER_CLASS)) {
                target.insertBefore(limits, target.firstElementChild);
            }
            else {
                target.appendChild(limits);
            }
        }
    };
    LayoutRender.prototype.renderValidation = function () {
        var _this = this;
        this.parent.columns.forEach(function (column) {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            var cardData = _this.columnData[column.keyField];
            var keySelector = "[data-key=\"" + column.keyField + "\"]";
            var headerCell = _this.parent.element.querySelector("." + (cls.HEADER_CELLS_CLASS + keySelector));
            var rowCells = [].slice.call(_this.parent.element.querySelectorAll("." + (cls.CONTENT_CELLS_CLASS + keySelector)));
            if (_this.parent.constraintType === 'Swimlane' && _this.parent.swimlaneSettings.keyField) {
                _this.swimlaneRow.forEach(function (row, index) {
                    _this.renderLimits(column, rowCells[index]);
                    var rowCards = cardData.filter(function (card) {
                        return card[_this.parent.swimlaneSettings.keyField] === row.keyField;
                    });
                    var colorClass = _this.getValidationClass(column, rowCards.length);
                    if (colorClass) {
                        addClass([rowCells[index]], colorClass);
                    }
                });
            }
            else {
                _this.renderLimits(column, headerCell);
                var colorClass = _this.getValidationClass(column, cardData.length);
                if (colorClass) {
                    addClass(rowCells.concat(headerCell), colorClass);
                }
            }
        });
    };
    LayoutRender.prototype.getValidationClass = function (column, count) {
        var colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = cls.MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = cls.MIN_COLOR_CLASS;
        }
        return colorClass;
    };
    LayoutRender.prototype.refreshValidation = function () {
        var validations = [].slice.call(this.parent.element.querySelectorAll('.' + cls.LIMITS_CLASS));
        validations.forEach(function (node) { remove(node); });
        var minClass = [].slice.call(this.parent.element.querySelectorAll('.' + cls.MIN_COLOR_CLASS));
        removeClass(minClass, cls.MIN_COLOR_CLASS);
        var maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + cls.MAX_COLOR_CLASS));
        removeClass(maxClass, cls.MAX_COLOR_CLASS);
        this.renderValidation();
    };
    LayoutRender.prototype.getColumnData = function (columnValue, dataSource) {
        var _this = this;
        if (dataSource === void 0) { dataSource = this.parent.kanbanData; }
        var cardData = [];
        var isNumeric = typeof columnValue === 'number';
        if (isNumeric) {
            var keyData = dataSource.filter(function (cardObj) {
                return cardObj[_this.parent.keyField] === columnValue;
            });
            cardData = cardData.concat(keyData);
        }
        else {
            var columnKeys = columnValue.split(',');
            var _loop_4 = function (key) {
                var keyData = dataSource.filter(function (cardObj) {
                    return cardObj[_this.parent.keyField] === key.trim();
                });
                cardData = cardData.concat(keyData);
            };
            for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
                var key = columnKeys_1[_i];
                _loop_4(key);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    };
    LayoutRender.prototype.sortCategory = function (cardData) {
        var key = this.parent.cardSettings.headerField;
        var direction = this.parent.sortSettings.direction;
        switch (this.parent.sortSettings.sortBy) {
            case 'DataSourceOrder':
                this.sortOrder(key, direction, cardData);
                break;
            case 'Custom':
            case 'Index':
                if (this.parent.sortSettings.field) {
                    key = this.parent.sortSettings.field;
                }
                this.sortOrder(key, direction, cardData);
                break;
        }
        return cardData;
    };
    LayoutRender.prototype.sortOrder = function (key, direction, cardData) {
        var isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])["" + key] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        var first;
        var second;
        cardData = cardData.sort(function (firstData, secondData) {
            if (!isNumeric) {
                first = firstData["" + key] ? firstData["" + key].toLowerCase() : '';
                second = secondData["" + key] ? secondData["" + key].toLowerCase() : '';
            }
            else {
                first = firstData["" + key];
                second = secondData["" + key];
            }
            return (first > second) ? 1 : ((second > first) ? -1 : 0);
        });
        if (direction === 'Descending') {
            cardData.reverse();
        }
        return cardData;
    };
    LayoutRender.prototype.documentClick = function (args) {
        if (args.target.classList.contains(cls.SWIMLANE_OVERLAY_CLASS) &&
            this.parent.element.querySelector('.' + cls.SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        if (closest(args.target, "." + cls.ROOT_CLASS)) {
            return;
        }
        var cards = [].slice.call(this.parent.element.querySelectorAll("." + cls.CARD_CLASS + "." + cls.CARD_SELECTION_CLASS));
        removeClass(cards, cls.CARD_SELECTION_CLASS);
        this.disableAttributeSelection(cards);
    };
    LayoutRender.prototype.disableAttributeSelection = function (cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach(function (card) { card.setAttribute('aria-selected', 'false'); });
        }
    };
    LayoutRender.prototype.getColumnCards = function (data) {
        var _this = this;
        var columnData = {};
        this.columnKeys = [];
        this.parent.columns.forEach(function (column) {
            var isNumeric = typeof column.keyField === 'number';
            if (isNumeric) {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.toString());
            }
            else {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.split(',').map(function (e) { return e.trim(); }));
            }
            var cardData = _this.getColumnData(column.keyField, data);
            columnData[column.keyField] = cardData;
        });
        return columnData;
    };
    LayoutRender.prototype.getSwimlaneCards = function () {
        var _this = this;
        var swimlaneData = {};
        if (this.parent.swimlaneSettings.keyField) {
            this.kanbanRows.forEach(function (row) {
                return swimlaneData[row.keyField] = _this.parent.kanbanData.filter(function (obj) {
                    return !isNoU(obj[_this.parent.keyField]) &&
                        _this.columnKeys.indexOf(obj[_this.parent.keyField].toString()) > -1 &&
                        ((!obj[_this.parent.swimlaneSettings.keyField] && _this.parent.swimlaneSettings.showUnassignedRow) ?
                            '' : obj[_this.parent.swimlaneSettings.keyField]) === row.keyField;
                });
            });
        }
        return swimlaneData;
    };
    LayoutRender.prototype.refreshHeaders = function () {
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        [].slice.call(header.children).forEach(function (child) { return remove(child); });
        this.renderHeader(header);
    };
    LayoutRender.prototype.refreshCards = function () {
        this.parent.resetTemplates(['cardTemplate']);
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        cards.forEach(function (card) { return remove(card); });
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    };
    LayoutRender.prototype.refresh = function () {
        var _this = this;
        var isColumnTemplateRefreshed = false;
        this.parent.columns.forEach(function (column) {
            if (column.showItemCount) {
                if (column && column.template && !isColumnTemplateRefreshed) {
                    _this.refreshHeaders();
                    isColumnTemplateRefreshed = true;
                }
                var countSelector = "." + cls.HEADER_CELLS_CLASS + "[data-key=\"" + column.keyField + "\"] ." + cls.CARD_ITEM_COUNT_CLASS;
                var itemCount = _this.parent.element.querySelector(countSelector);
                if (itemCount) {
                    var isNumeric = typeof column.keyField === 'number';
                    var cardLength = 0;
                    if (isNumeric) {
                        // eslint-disable-next-line no-useless-escape
                        cardLength = ([].slice.call(_this.parent.element.querySelectorAll('.' + cls.CARD_CLASS + '[data-key=\"' + column.keyField + '\"]'))).length;
                    }
                    else {
                        var keys = column.keyField.split(',');
                        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                            var key = keys_2[_i];
                            // eslint-disable-next-line no-useless-escape
                            var cards = [].slice.call(_this.parent.element.querySelectorAll('.' + cls.CARD_CLASS + '[data-key=\"' + key.trim() + '\"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + cardLength + ' ' + _this.parent.localeObj.getConstant('items');
                }
            }
        });
        if (this.parent.swimlaneSettings.keyField) {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll("." + cls.SWIMLANE_ROW_CLASS));
            swimlaneRows.forEach(function (swimlane) {
                var swimlaneKey = swimlane.getAttribute('data-key');
                var itemCount = swimlane.querySelector("." + cls.CARD_ITEM_COUNT_CLASS);
                if (itemCount && swimlaneKey) {
                    var cards = [].slice.call(swimlane.nextElementSibling.querySelectorAll('.' + cls.CARD_CLASS));
                    itemCount.innerHTML = '- ' + cards.length + ' ' + _this.parent.localeObj.getConstant('items');
                }
            });
        }
        this.refreshValidation();
    };
    LayoutRender.prototype.updateScrollPosition = function () {
        var _this = this;
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        if (content) {
            if (!Browser.isIE) {
                content.scrollTo(this.parent.scrollPosition.content.left, this.parent.scrollPosition.content.top);
            }
            else {
                content.scrollTop = this.parent.scrollPosition.content.top;
                content.scrollLeft = this.parent.scrollPosition.content.left;
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (wrapper.offsetParent) {
                var scrollData = _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')];
                if (scrollData) {
                    if (!Browser.isIE) {
                        wrapper.scrollTo(scrollData.left, scrollData.top);
                    }
                    else {
                        wrapper.scrollTop = scrollData.top;
                        wrapper.scrollLeft = scrollData.left;
                    }
                }
            }
        });
    };
    LayoutRender.prototype.renderCardBasedOnIndex = function (data, index) {
        var _this = this;
        var key = data[this.parent.keyField];
        var cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
            var rowSelector = ".e-content-row.e-swimlane-row[data-key=\"" + data[this.parent.swimlaneSettings.keyField] + "\"]";
            if (this.parent.element.querySelector(rowSelector)) {
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
            }
            else {
                var columnIndex = this.columnKeys.indexOf(key);
                if (columnIndex !== -1 && this.parent.actionModule.hideColumnKeys.indexOf(key) === -1) {
                    var index_1 = this.kanbanRows.findIndex(function (rowData) { return rowData['keyField'] === data[_this.parent.swimlaneSettings.keyField]; });
                    var swim = [].slice.call(this.parent.element.querySelectorAll('.e-swimlane-row'));
                    var swimRow = this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS + ' tbody');
                    if (swim[index_1]) {
                        swimRow = swim[index_1];
                    }
                    this.renderSwimlaneRow(swimRow, this.kanbanRows[index_1], false);
                    this.renderSingleContent(swimRow, this.kanbanRows[index_1], false);
                }
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
                [].slice.call(cardRow.children).forEach(function (cell) {
                    var cardWrapper = createElement('div', { className: cls.CARD_WRAPPER_CLASS });
                    cell.appendChild(cardWrapper);
                    cardWrapper.appendChild(_this.renderEmptyCard());
                });
            }
        }
        if (this.parent.sortSettings.sortBy !== 'Index') {
            var field_1 = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field_1 = this.parent.sortSettings.field;
            }
            if (isNoU(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex(function (colData) {
                    return colData["" + field_1] === data["" + field_1];
                });
            }
            else {
                var swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex(function (colData) { return colData["" + field_1] === data["" + field_1]; });
            }
        }
        else if (this.parent.sortSettings.sortBy === 'Index' &&
            this.parent.sortSettings.field && this.parent.sortSettings.direction === 'Ascending') {
            index = data[this.parent.sortSettings.field] - 1;
        }
        if (cardRow) {
            var td = [].slice.call(cardRow.children).filter(function (e) {
                return e.getAttribute('data-key').replace(/\s/g, '').split(',').indexOf(key.toString().replace(/\s/g, '')) !== -1;
            })[0];
            var cardWrapper_2 = td.querySelector('.' + cls.CARD_WRAPPER_CLASS);
            var emptyCard = cardWrapper_2.querySelector('.' + cls.EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            var cardElement_1 = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(cls.DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement_1);
                addClass([cardElement_1], cls.DROPPABLE_CLASS);
            }
            var args = { data: data, element: cardElement_1, cancel: false };
            this.parent.trigger(events.cardRendered, args, function (cardArgs) {
                if (!cardArgs.cancel) {
                    if (isNoU(index) || cardWrapper_2.children.length === 0) {
                        cardWrapper_2.appendChild(cardElement_1);
                    }
                    else {
                        cardWrapper_2.insertBefore(cardElement_1, cardWrapper_2.childNodes[index]);
                    }
                }
            });
        }
    };
    LayoutRender.prototype.removeCard = function (data) {
        var cardKey = data[this.parent.cardSettings.headerField];
        var cardElement = this.parent.element.querySelector("." + cls.CARD_CLASS + "[data-id=\"" + cardKey + "\"]");
        if (cardElement) {
            this.isSelectedCard = cardElement.classList.contains(cls.CARD_SELECTION_CLASS) ? true : false;
            var cardContainer = cardElement.parentElement;
            remove(cardElement);
            if (cardContainer.querySelectorAll('.' + cls.CARD_CLASS + ':not(.' + cls.CLONED_CARD_CLASS + ')').length === 0) {
                cardContainer.appendChild(this.renderEmptyCard());
            }
        }
    };
    LayoutRender.prototype.wireEvents = function () {
        var _this = this;
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (_this.parent.isInitialRender && wrapper.offsetParent) {
                _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', _this.onColumnScroll, _this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    };
    LayoutRender.prototype.unWireEvents = function () {
        var _this = this;
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach(function (wrapper) { EventHandler.remove(wrapper, 'scroll', _this.onColumnScroll); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    };
    LayoutRender.prototype.wireDragEvent = function () {
        var _this = this;
        if (this.parent.allowDragAndDrop) {
            var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS
                + '.' + cls.DRAG_CLASS + ' .' + cls.CARD_CLASS));
            addClass(cards, cls.DROPPABLE_CLASS);
            cards.forEach(function (card) { return _this.parent.dragAndDropModule.wireDragEvents(card); });
        }
    };
    LayoutRender.prototype.unWireDragEvent = function () {
        var _this = this;
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS
            + '.' + cls.DRAG_CLASS + ' .' + cls.CARD_CLASS));
        removeClass(cards, cls.DROPPABLE_CLASS);
        cards.forEach(function (card) { return _this.parent.dragAndDropModule.unWireDragEvents(card); });
    };
    LayoutRender.prototype.destroy = function () {
        this.parent.resetTemplates();
        this.parent.off(events.dataReady, this.initRender);
        this.parent.off(events.contentReady, this.scrollUiUpdate);
        this.unWireEvents();
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        if (header) {
            remove(header);
        }
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        if (content) {
            remove(content);
        }
        if (this.treeViewObj) {
            this.treeViewObj.destroy();
            this.treeViewObj = null;
        }
        if (this.treePopup) {
            this.treePopup.destroy();
            this.treePopup = null;
        }
        var swimlaneToolBarEle = this.parent.element.querySelector('.' + cls.SWIMLANE_HEADER_CLASS);
        if (swimlaneToolBarEle) {
            remove(swimlaneToolBarEle);
        }
        var swimlaneContent = this.parent.element.querySelector('.' + cls.SWIMLANE_CONTENT_CLASS);
        if (swimlaneContent) {
            remove(swimlaneContent);
        }
        var swimlaneFrozenRow = this.parent.element.querySelector('.' + cls.FROZEN_SWIMLANE_ROW_CLASS);
        if (swimlaneFrozenRow) {
            remove(swimlaneFrozenRow);
            this.frozenSwimlaneRow = null;
        }
    };
    return LayoutRender;
}(MobileLayout));
export { LayoutRender };
