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
import { append, createElement, formatUnit, EventHandler, addClass, remove, extend, Browser, isNullOrUndefined as isNoU, removeClass, closest, detach, debounce } from '@syncfusion/ej2-base';
import { DataManager, Query, Deferred, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';
import { MobileLayout } from './mobile-layout';
import * as events from '../base/constant';
import * as cls from '../base/css-constant';
/**
 * Kanban layout rendering module
 *
 */
var VirtualLayoutRender = /** @class */ (function (_super) {
    __extends(VirtualLayoutRender, _super);
    function VirtualLayoutRender(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        _this.kanbanRows = [];
        _this.scrollStatus = {};
        _this.offsets = {};
        _this.tempOffsets = {};
        _this.offsetKeys = [];
        _this.columnKeys = [];
        _this.scrollLeft = 0;
        _this.frozenOrder = 0;
        _this.winResize = _this.windowResize.bind(_this);
        if (_this.parent.enableVirtualization) {
            _this.parent.on(events.dataReady, _this.initRender, _this);
            _this.parent.on(events.contentReady, _this.scrollUiUpdate, _this);
        }
        return _this;
    }
    VirtualLayoutRender.prototype.initRender = function () {
        this.isSwimlane = !isNoU(this.parent.swimlaneSettings.keyField) &&
            this.parent.swimlaneSettings.keyField.trim().length > 1 ? true : false;
        this.query = this.parent.query instanceof Query ? this.parent.query : new Query();
        if (this.parent.columns.length === 0) {
            return;
        }
        this.cardHeight = this.cardHeightCalculate();
        this.columnData = this.getColumnCards();
        this.kanbanRows = this.getRows();
        if (this.parent.isAdaptive) {
            var parent_1 = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
            if (parent_1) {
                this.scrollLeft = parent_1.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(events.dataReady, this.initRender, this);
        this.parent.on(events.contentReady, this.scrollUiUpdate, this);
        var header = createElement('div', { className: cls.HEADER_CLASS });
        this.parent.element.appendChild(header);
        this.renderHeader(header);
        if (!this.isSwimlane) {
            this.renderContent();
            this.renderCards();
        }
        this.renderValidation();
        this.parent.renderTemplates();
        this.parent.notify(events.contentReady, {});
        this.wireEvents();
        if (this.parent.isInitialRender) {
            this.parent.isInitialRender = false;
        }
    };
    VirtualLayoutRender.prototype.cardHeightCalculate = function () {
        var cardHeight;
        if (this.parent.cardHeight === 'auto') {
            cardHeight = 100 + 8; // 8 is the margin bottom value of the card.
        }
        else {
            cardHeight = parseInt(formatUnit(this.parent.cardHeight).split('px')[0], 10) + 8;
        }
        return cardHeight;
    };
    VirtualLayoutRender.prototype.renderHeader = function (header) {
        var headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? cls.SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        var headerTable = createElement('table', {
            className: cls.TABLE_CLASS + ' ' + cls.HEADER_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        var tableHead = createElement('thead');
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
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString() }
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
                var noOfCard = this_1.parent.dataModule.isRemote() ?
                    this_1.parent.columnDataCount[column.keyField] : this_1.columnData[column.keyField].length;
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
                        attrs: { 'tabindex': '0' }
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
    VirtualLayoutRender.prototype.renderContent = function () {
        var content = createElement('div', { className: cls.CONTENT_CLASS });
        this.parent.element.appendChild(content);
        var contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? cls.SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        var contentTable = createElement('table', {
            className: cls.TABLE_CLASS + ' ' + cls.CONTENT_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        var tBody = createElement('tbody');
        contentTable.appendChild(tBody);
        var isCollaspsed = false;
        for (var _i = 0, _a = this.kanbanRows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                var index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    };
    VirtualLayoutRender.prototype.renderSingleContent = function (tBody, row, isCollaspsed) {
        var className = isCollaspsed ? cls.CONTENT_ROW_CLASS + ' ' + cls.COLLAPSED_CLASS : cls.CONTENT_ROW_CLASS;
        var tr = createElement('tr', { className: className, attrs: { 'aria-expanded': 'true' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (this.isColumnVisible(column)) {
                var index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var className_1 = index === -1 ? cls.CONTENT_CELLS_CLASS : cls.CONTENT_CELLS_CLASS + ' ' + cls.COLLAPSED_CLASS;
                var dragClass = (column.allowDrag ? ' ' + cls.DRAG_CLASS : '') + (column.allowDrop ? ' ' + cls.DROP_CLASS
                    + ' ' + cls.DROPPABLE_CLASS : '');
                var td = createElement('td', {
                    className: className_1 + dragClass,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'aria-expanded': 'true',
                        'tabindex': '0', 'role': 'navigation' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], cls.COLLAPSED_CLASS);
                    var text = (column.showItemCount ? '[' + (this.parent.dataModule.isRemote() ?
                        this.parent.columnDataCount[column.keyField] : this.getColumnData(column.keyField).length) +
                        '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: cls.COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    var button = createElement('div', { className: cls.SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: cls.SHOW_ADD_ICON + ' ' + cls.ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
                if (this.parent.enableVirtualization) {
                    var headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
                    //'15' is reduced for optimal padding in the bottom and to avoid page scrollbar appear in the height auto case.
                    if (this.parent.height === 'auto') {
                        td.style.height = window.innerHeight - (headerHeight + this.parent.element.getBoundingClientRect().top + 15) + 'px';
                    }
                    else {
                        td.style.height = parseInt(formatUnit(this.parent.height).split('px')[0], 10) - (headerHeight + 15) + 'px';
                    }
                }
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
    VirtualLayoutRender.prototype.windowResize = function () {
        var cloumnsTDElem = this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS);
        var headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
        for (var j = 0; j < cloumnsTDElem.length; j++) {
            if (this.parent.height === 'auto') {
                cloumnsTDElem[j].style.height = window.innerHeight - (headerHeight + this.parent.element.getBoundingClientRect().top + 15) + 'px';
            }
            else {
                cloumnsTDElem[j].style.height = parseInt(formatUnit(this.parent.height).split('px')[0], 10) - (headerHeight + 15) + 'px';
            }
        }
    };
    VirtualLayoutRender.prototype.refreshColumnData = function (draggedColumnKey, droppedColumnKey, requestType, crudKeyField) {
        var _this = this;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var isCRUD = (requestType === 'cardChanged' || requestType === 'cardCreated' || requestType === 'cardRemoved')
            && !isNoU(crudKeyField);
        cardRows.forEach(function (tr) {
            var _loop_2 = function (column) {
                if (_this.isColumnVisible(column) && (column.keyField === draggedColumnKey || column.keyField === droppedColumnKey)
                    || isCRUD) {
                    var cards_1 = 0;
                    var blocks = [];
                    var columnData = _this.getColumnCards()[column.keyField];
                    var currentColumnDataCount = _this.parent.dataModule.isRemote() ?
                        _this.parent.columnDataCount[column.keyField] : columnData.length;
                    var overallHeight = _this.cardHeight * currentColumnDataCount;
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(function () { return ++cards_1; });
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var singleIndexCardCount = Math.ceil(parseInt(columnWrapper.style.height.split('px')[0], 10) / _this.cardHeight);
                    _this.offsets[1] = singleIndexCardCount * _this.cardHeight;
                    for (var i = 1; i < blocks.length; i++) {
                        _this.offsets[blocks[i]] = (_this.offsets[blocks[i - 1]]) + (singleIndexCardCount * _this.cardHeight);
                        _this.tempOffsets[blocks[i]] = _this.offsets[blocks[i] - 1] | 0;
                    }
                    var cardWrapper = columnWrapper.querySelector('.' + cls.CARD_WRAPPER_CLASS);
                    var maxBlock = currentColumnDataCount % 2 === 0 ? currentColumnDataCount - 2 : currentColumnDataCount - 1;
                    var viewInfo = _this.getInfoFromView(_this.scrollStatus[column.keyField]);
                    var transformY = _this.getTranslateY(viewInfo);
                    var cardVirtualElement = cardWrapper.querySelector('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS);
                    cardVirtualElement.style.maxHeight = currentColumnDataCount * _this.cardHeight + 'px';
                    _this.setPadding(transformY, cardVirtualElement, currentColumnDataCount);
                    _this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: _this.scrollStatus[column.keyField].currentScrollTop,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: _this.scrollStatus[column.keyField].scrollDirection,
                        currentBlockIndex: _this.scrollStatus[column.keyField].currentBlockIndex,
                        oldBlockIndex: _this.scrollStatus[column.keyField].oldBlockIndex,
                        offsets: _this.offsets,
                        tempOffsets: _this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    _this.scrollStatus[column.keyField] = _this.currentStatus;
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_2(column);
            }
        });
    };
    VirtualLayoutRender.prototype.renderCards = function () {
        var _this = this;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        var removeTrs = [];
        var columnTransition = false;
        cardRows.forEach(function (tr, index) {
            var dataCount = 0;
            var _loop_3 = function (column) {
                if (_this.isColumnVisible(column)) {
                    var cards_2 = 0;
                    var currentScrollIndex = 0;
                    var blocks = [];
                    _this.offsets = {};
                    _this.tempOffsets = {};
                    var columnData = _this.columnData[column.keyField];
                    var currentColumnDataCount = _this.parent.dataModule.isRemote()
                        ? _this.parent.columnDataCount[column.keyField] : columnData.length;
                    dataCount += currentColumnDataCount;
                    var overallHeight = (_this.cardHeight * currentColumnDataCount) + 7; //7 is difference between top space of the scroll element
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var singleIndexCardCount = Math.ceil(parseFloat(columnWrapper.style.height.split('px')[0]) / _this.cardHeight);
                    var currentColumnBlock = singleIndexCardCount > currentColumnDataCount ? currentColumnDataCount :
                        Math.floor(currentColumnDataCount / singleIndexCardCount);
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(function () { return ++cards_2; });
                    _this.offsets[1] = singleIndexCardCount * _this.cardHeight + 7;
                    for (var i = 1; i < blocks.length; i++) {
                        _this.offsets[blocks[i]] = (_this.offsets[blocks[i - 1]]) + (singleIndexCardCount * _this.cardHeight);
                        _this.tempOffsets[blocks[i]] = _this.offsets[blocks[i] - 1] | 0;
                    }
                    var cardWrapper = createElement('div', {
                        className: cls.CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    var cardVirtualWrapper_1 = createElement('div', {
                        className: cls.CARD_VIRTUAL_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    cardWrapper.appendChild(cardVirtualWrapper_1);
                    var maxBlock = currentColumnBlock % 2 === 0 ? currentColumnBlock : currentColumnBlock + 1;
                    _this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: null,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: null,
                        currentBlockIndex: [1, 2],
                        oldBlockIndex: [1, 2],
                        offsets: _this.offsets,
                        tempOffsets: _this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    _this.scrollStatus[column.keyField] = _this.currentStatus;
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNoU(_this.parent.swimlaneSettings.keyField)) {
                        var borderElem = createElement('div', { className: cls.BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper);
                    if (currentColumnDataCount > 0) {
                        var _loop_4 = function (i) {
                            var cardText = columnData[i][_this.parent.cardSettings.headerField];
                            var cardIndex = _this.parent.actionModule.selectionArray.indexOf(cardText);
                            var cardElement = _this.renderCard(columnData[i]);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], cls.CARD_SELECTION_CLASS);
                            }
                            var args = { data: columnData[i], element: cardElement, cancel: false };
                            _this.parent.trigger(events.cardRendered, args, function (cardArgs) {
                                if (!cardArgs.cancel) {
                                    cardVirtualWrapper_1.appendChild(cardElement);
                                }
                            });
                        };
                        for (var i = currentScrollIndex; i < singleIndexCardCount * 2 && i < columnData.length; i++) {
                            _loop_4(i);
                        }
                        cardVirtualWrapper_1.style.maxHeight = _this.cardHeight * currentColumnDataCount + 'px';
                    }
                    else {
                        cardVirtualWrapper_1.appendChild(_this.renderEmptyCard());
                    }
                    _this.setPadding(0, cardVirtualWrapper_1, currentColumnDataCount);
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_3(column);
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
    VirtualLayoutRender.prototype.renderCard = function (data) {
        var cardElement = createElement('div', {
            className: cls.CARD_CLASS,
            attrs: {
                'data-id': data[this.parent.cardSettings.headerField], 'data-key': data[this.parent.keyField],
                'aria-selected': 'false', 'tabindex': '-1', 'role': 'option'
            }
        });
        cardElement.style.height = this.cardHeight - 8 + 'px'; // Since in the public card height calculation margin bottom is added, so it reduced here.
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
    VirtualLayoutRender.prototype.renderEmptyCard = function () {
        var emptyCard = createElement('span', {
            className: cls.EMPTY_CARD_CLASS,
            innerHTML: this.parent.localeObj.getConstant('noCard')
        });
        return emptyCard;
    };
    VirtualLayoutRender.prototype.renderColGroup = function (table) {
        var _this = this;
        var colGroup = createElement('colgroup');
        this.parent.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                var index = _this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var isToggle = column.allowToggle && !column.isExpanded;
                var className = index === -1 ? (isToggle ? cls.COLLAPSED_CLASS : '') : cls.COLLAPSED_CLASS;
                var col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() },
                    styles: _this.parent.isAdaptive ? 'width: ' +
                        (isToggle ? formatUnit(events.toggleWidth) : formatUnit(_this.getWidth())) : ''
                });
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    };
    VirtualLayoutRender.prototype.getRows = function () {
        var kanbanRows = [];
        kanbanRows.push({ keyField: '', textField: '' });
        return kanbanRows;
    };
    VirtualLayoutRender.prototype.createStackedRow = function (rows) {
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
                attrs: { 'colspan': colSpan.toString() }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    };
    VirtualLayoutRender.prototype.scrollUiUpdate = function () {
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
    VirtualLayoutRender.prototype.onContentScroll = function (e) {
        var target = e.target;
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        [].slice.call(header.children).forEach(function (node) { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
    };
    VirtualLayoutRender.prototype.getOffset = function (block, viewInfo) {
        return Math.min(viewInfo.offsets[block] | 0, viewInfo.offsets[viewInfo.maxBlock] | 0);
    };
    VirtualLayoutRender.prototype.getTranslateY = function (viewInfo) {
        var block = (viewInfo.newBlockIndex[0] || 1) - 1;
        var translate = this.getOffset(block, viewInfo);
        var endTranslate = this.getOffset(viewInfo.newBlockIndex[viewInfo.newBlockIndex.length - 1], viewInfo);
        var result = translate > viewInfo.currentScrollTop ?
            this.getOffset(block - 1, viewInfo) : endTranslate < (viewInfo.currentScrollTop + viewInfo.columnHeight) ?
            this.getOffset(block + 1, viewInfo) : translate;
        return result;
    };
    VirtualLayoutRender.prototype.setPadding = function (paddingTop, scrollElem, dataCount, isScrolledToLast, direction) {
        if (isScrolledToLast && direction === 'down') {
            scrollElem.style.paddingTop = paddingTop + "px";
            scrollElem.style.paddingBottom = '0px';
        }
        else {
            scrollElem.style.paddingTop = paddingTop + "px";
            scrollElem.style.paddingBottom = this.cardHeight * dataCount - paddingTop + "px";
        }
    };
    VirtualLayoutRender.prototype.getData = function (keyField, column, take, skip) {
        var query = this.query.clone();
        var predicate = new Predicate(keyField, 'equal', column, true);
        query.where(predicate);
        query.take(take);
        query.skip(skip);
        query.addParams('KanbanVirtualScroll', 'KanbanVirtualScroll');
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            var def = this.eventPromise({ requestType: '' }, query);
            return def.promise;
        }
        return this.parent.dataModule.dataManager.executeQuery(query);
    };
    VirtualLayoutRender.prototype.eventPromise = function (args, query) {
        var state = this.getStateEventArgument(query);
        var def = new Deferred();
        state.updateData = def.resolve;
        state.action = args;
        return def;
    };
    VirtualLayoutRender.prototype.getStateEventArgument = function (query) {
        var adaptr = new UrlAdaptor();
        var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        var state = adaptr.processQuery(dm, query);
        var data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    };
    VirtualLayoutRender.prototype.dataManagerSuccess = function (e, type) {
        var _this = this;
        var resultData;
        if (type) {
            resultData = extend([], !isNoU(e.result.result) ?
                e.result.result : e.result, null, true);
        }
        else {
            this.parent.trigger(events.dataBinding, e, function (args) {
                resultData = extend([], !isNoU(args.result.result) ?
                    args.result.result : args.result, null, true);
                _this.parent.trigger(events.dataBound, null, function () { return _this.parent.hideSpinner(); });
            });
        }
        return resultData;
    };
    VirtualLayoutRender.prototype.dataManagerFailure = function (e) {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.trigger(events.actionFailure, { error: e }, function () { return _this.parent.hideSpinner(); });
    };
    VirtualLayoutRender.prototype.onColScrollShowSkeleton = function (args) {
        var target = args.target;
        if (this.parent.element.querySelectorAll('.e-card-skeleton-wrapper').length > 0) {
            return;
        }
        var key = target.parentElement.getAttribute('data-key');
        var previousScrollTop = this.scrollStatus[key].previousScrollTop;
        var parentElemHeight = target.parentElement.clientHeight;
        if ((target.scrollTop - previousScrollTop) > parentElemHeight || (previousScrollTop - target.scrollTop) > parentElemHeight) {
            this.showSkeleton(target, this.scrollStatus[key].singleIndexCardCount);
        }
    };
    VirtualLayoutRender.prototype.showSkeleton = function (cardWrapper, skeletonCount) {
        var cardVirtualSkeletonWrapper = createElement('div', {
            className: 'e-card-virtual-skeleton-wrapper', attrs: { 'role': 'listbox' }
        });
        cardWrapper.parentElement.insertBefore(cardVirtualSkeletonWrapper, cardWrapper);
        cardVirtualSkeletonWrapper.style.position = 'absolute';
        cardVirtualSkeletonWrapper.style.zIndex = '10';
        for (var j = 0; j < skeletonCount; j++) {
            var skeletonWrapper = createElement('div', { className: 'e-card-skeleton-wrapper' });
            var skeleton = createElement('span', { className: 'e-skeleton e-skeleton-text e-shimmer-wave' });
            skeleton.style.height = this.cardHeight + 'px';
            // Assumption fix, issue reproduce in rare cases only .
            if (!isNoU(cardWrapper.querySelector('.e-card'))) {
                skeleton.style.width = cardWrapper.querySelector('.e-card').getBoundingClientRect().width + 'px';
            }
            skeletonWrapper.appendChild(skeleton);
            cardVirtualSkeletonWrapper.appendChild(skeletonWrapper);
        }
    };
    VirtualLayoutRender.prototype.hideSkeleton = function (cardWrapper) {
        setTimeout(function () {
            var skeletonWrapper = cardWrapper.querySelectorAll('.e-card-virtual-skeleton-wrapper');
            for (var i = 0; i < skeletonWrapper.length; i++) {
                detach(skeletonWrapper[i]);
            }
        }, 50);
    };
    VirtualLayoutRender.prototype.onColumnScroll = function (e) {
        var _this = this;
        var target = e.target;
        var currentScrolledHeight = target.scrollTop;
        var columnKey;
        if (target.offsetParent) {
            columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column[columnKey] = { left: target.scrollLeft, top: target.scrollTop };
        }
        if (this.parent.enableVirtualization) {
            var cardWrapper_1 = target;
            var dataCount = 0;
            var columnData = this.getColumnCards()[columnKey];
            var currentColumnDataCount = this.parent.dataModule.isRemote() ?
                this.parent.columnDataCount[columnKey] : columnData.length;
            dataCount += currentColumnDataCount;
            var overallHeight = this.cardHeight * dataCount;
            var removeIndex = [];
            var addIndex = [];
            this.checkScrollDirection(columnKey, currentScrolledHeight);
            if (this.findScrollSpeed(target, columnKey) === 'fast' && currentScrolledHeight > overallHeight) {
                this.hideSkeleton(cardWrapper_1.parentElement);
                return;
            }
            var maxBlock = this.scrollStatus[columnKey].maxBlock;
            var isLastBlockRendered = this.scrollStatus[columnKey].currentBlockIndex.indexOf(maxBlock) > -1;
            var isDuplicateScroll = e.timeStamp - this.scrollStatus[columnKey].previousTimeStamps < 300;
            if (isLastBlockRendered && !isNoU(this.scrollStatus[columnKey].previousTimeStamps) && isDuplicateScroll) {
                this.hideSkeleton(cardWrapper_1.parentElement);
                return;
            }
            this.scrollStatus[columnKey].previousTimeStamps = e.timeStamp;
            var viewInfo_1 = this.getInfoFromView(this.scrollStatus[columnKey]);
            removeIndex = viewInfo_1.currentBlockIndex.filter(function (val) {
                return viewInfo_1.newBlockIndex.indexOf(val) === -1;
            });
            addIndex = viewInfo_1.newBlockIndex.filter(function (val) {
                return viewInfo_1.currentBlockIndex.indexOf(val) === -1;
            });
            var isScrolledToLast = currentScrolledHeight + target.clientHeight >= overallHeight;
            var transformY = isScrolledToLast ? overallHeight - (cardWrapper_1.querySelector('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS).childElementCount * this.cardHeight)
                : this.getTranslateY(viewInfo_1);
            var cardVirtualElement_1 = cardWrapper_1.querySelector('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS);
            if (removeIndex.length > 0) {
                var removeStartIndex = void 0;
                var removeEndIndex = void 0;
                if (removeIndex[0] === 1) {
                    removeStartIndex = 0;
                    removeEndIndex = (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount) - 1;
                }
                else {
                    removeStartIndex = ((removeIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    removeEndIndex = removeStartIndex + (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount);
                }
                this.removeCardsOnScroll(cardVirtualElement_1, this.scrollStatus[columnKey].scrollDirection === 'down' ? true : false, removeStartIndex, removeEndIndex);
            }
            if (addIndex.length > 0) {
                if (this.parent.dataModule.isRemote()) {
                    var visibleStartIndex = ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    var resultData_1 = [];
                    var dataManager = this.getData(this.parent.keyField, columnKey, (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length), visibleStartIndex);
                    dataManager.then(function (e) {
                        resultData_1 = _this.dataManagerSuccess(e);
                        _this.scrollCardInsert(columnKey, cardVirtualElement_1, target, currentScrolledHeight, cardWrapper_1, _this.scrollStatus[columnKey].scrollDirection === 'down' ? 0 : (resultData_1.length - 1), true, resultData_1, null);
                    }).catch(function (e) { return _this.dataManagerFailure(e); });
                }
                else {
                    var visibleStartIndex = this.scrollStatus[columnKey].scrollDirection === 'down' ? ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount)
                            + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) - 1;
                    var visibleLength = this.scrollStatus[columnKey].scrollDirection === 'down' ? visibleStartIndex + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    this.scrollCardInsert(columnKey, cardVirtualElement_1, target, currentScrolledHeight, cardWrapper_1, visibleStartIndex, false, columnData, visibleLength);
                }
            }
            this.scrollStatus[columnKey].currentBlockIndex = this.scrollStatus[columnKey].newBlockIndex;
            this.setPadding(transformY, cardVirtualElement_1, currentColumnDataCount, isScrolledToLast, this.scrollStatus[columnKey].scrollDirection);
            viewInfo_1.currentBlockIndex = viewInfo_1.newBlockIndex;
            this.parent.renderTemplates();
            this.hideSkeleton(cardWrapper_1.parentElement);
        }
    };
    VirtualLayoutRender.prototype.checkScrollDirection = function (columnKey, currentScrolledHeight) {
        // Update the previous and current scroll top value
        this.scrollStatus[columnKey].previousScrollTop = this.scrollStatus[columnKey].currentScrollTop;
        this.scrollStatus[columnKey].currentScrollTop = currentScrolledHeight;
        // Check the scroll direction
        if (currentScrolledHeight > this.scrollStatus[columnKey].previousScrollTop) {
            this.scrollStatus[columnKey].scrollDirection = 'down';
        }
        else {
            this.scrollStatus[columnKey].scrollDirection = 'up';
        }
    };
    VirtualLayoutRender.prototype.findScrollSpeed = function (target, columnKey) {
        // Find the scroll speed
        if (this.scrollStatus[columnKey].scrollDirection === 'down' &&
            (target.scrollTop - this.scrollStatus[columnKey].previousScrollTop > target.clientHeight)) {
            return 'fast';
        }
        else if (this.scrollStatus[columnKey].scrollDirection === 'up' &&
            (this.scrollStatus[columnKey].previousScrollTop - target.scrollTop > target.clientHeight)) {
            return 'fast';
        }
        return 'slow';
    };
    VirtualLayoutRender.prototype.removeCardsOnScroll = function (cardVirtualElement, isDown, removeStartIndex, removeEndIndex) {
        for (var j = removeStartIndex; j < removeEndIndex; j++) {
            var removableElem = isDown ? cardVirtualElement.firstChild
                : cardVirtualElement.lastChild;
            while (!isNoU(removableElem) && (removableElem.classList.contains(cls.DRAGGED_CARD_CLASS) ||
                removableElem.classList.contains(cls.DRAGGED_CLONE_CLASS) ||
                removableElem.classList.contains(cls.DROPPED_CLONE_CLASS) ||
                removableElem.classList.contains(cls.CLONED_CARD_CLASS))) {
                removableElem = isDown ? removableElem.nextSibling : removableElem.previousSibling;
            }
            if (!isNoU(removableElem)) {
                detach(removableElem);
            }
        }
    };
    VirtualLayoutRender.prototype.scrollCardInsert = function (columnKey, cardVirtualElement, target, currentScrolledHeight, cardWrapper, startNumber, isRemote, resultData, visibleLength) {
        var _this = this;
        var conditonsScrollDownCase = isRemote ? resultData.length : visibleLength;
        var conditonsScrollUpCase = isRemote ? 0 : visibleLength;
        if (resultData.length > 0) {
            var _loop_5 = function (j) {
                if (!isNoU(resultData[j])) {
                    var cardText = resultData[j][this_2.parent.cardSettings.headerField];
                    var cardIndex = this_2.parent.actionModule.selectionArray.indexOf(cardText);
                    var cardElement_1 = this_2.renderCard(resultData[j]);
                    if (cardIndex !== -1) {
                        cardElement_1.setAttribute('aria-selected', 'true');
                        addClass([cardElement_1], cls.CARD_SELECTION_CLASS);
                    }
                    var args = { data: resultData[j], element: cardElement_1, cancel: false };
                    this_2.parent.trigger(events.cardRendered, args, function (cardArgs) {
                        if (!cardArgs.cancel) {
                            if (_this.scrollStatus[columnKey].scrollDirection === 'down') {
                                cardVirtualElement.appendChild(cardElement_1);
                            }
                            else {
                                cardVirtualElement.insertBefore(cardElement_1, cardVirtualElement.firstChild);
                            }
                            _this.parent.dragAndDropModule.wireDragEvents(cardElement_1);
                            addClass([cardElement_1], cls.DROPPABLE_CLASS);
                        }
                    });
                }
            };
            var this_2 = this;
            for (var j = startNumber; this.scrollStatus[columnKey].scrollDirection === 'down' ? (j < conditonsScrollDownCase) :
                j >= conditonsScrollUpCase; this.scrollStatus[columnKey].scrollDirection === 'down' ? j++ : j--) {
                _loop_5(j);
            }
            target.scrollTop = currentScrolledHeight;
        }
        else {
            cardWrapper.appendChild(this.renderEmptyCard());
        }
    };
    VirtualLayoutRender.prototype.ensureColumnNotEmpty = function (draggedColumnKey) {
        var singleIndexCardCount = this.scrollStatus[draggedColumnKey].singleIndexCardCount;
        var draggedColumnData = this.columnData[draggedColumnKey];
        var draggedTdColummElement = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row) [data-key="' + draggedColumnKey + '"]');
        var wrapperELement = draggedTdColummElement.querySelector('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS);
        var cardsList = wrapperELement.querySelectorAll('.' + cls.CARD_CLASS);
        if (cardsList.length > 0) {
            var lastCardDataId = cardsList[cardsList.length - 1].getAttribute('data-id');
            var firstCardDataId = cardsList[0].getAttribute('data-id');
            var lastCardIndex = void 0;
            var firstCardIndex = void 0;
            if (cardsList.length < singleIndexCardCount * 2) {
                for (var i = 0; i < draggedColumnData.length; i++) {
                    if (lastCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        lastCardIndex = i;
                    }
                    if (firstCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        firstCardIndex = i;
                    }
                }
                var cardCount = cardsList.length;
                for (var i = cardCount; i < singleIndexCardCount * 2; i++) {
                    var isLast = lastCardIndex === draggedColumnData.length - 1 ? true : false;
                    var nextCardIndex = lastCardIndex < draggedColumnData.length ? lastCardIndex + 1 : firstCardIndex - 1;
                    if (nextCardIndex <= draggedColumnData.length) {
                        var nextCardData = draggedColumnData[nextCardIndex];
                        if (!isNoU(nextCardData)) {
                            var nextCard = this.renderCard(nextCardData);
                            this.triggerCardRendering(nextCard, nextCardIndex, draggedColumnData, wrapperELement, isLast);
                            if (isLast) {
                                firstCardIndex = nextCardIndex;
                            }
                            else {
                                lastCardIndex = nextCardIndex;
                            }
                        }
                    }
                }
            }
        }
    };
    VirtualLayoutRender.prototype.triggerCardRendering = function (nextCard, nextCardIndex, draggedColumnData, wrapperELement, isLast) {
        var _this = this;
        var cardText = draggedColumnData[nextCardIndex][this.parent.cardSettings.headerField];
        var cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
        if (cardIndex !== -1) {
            nextCard.setAttribute('aria-selected', 'true');
            addClass([nextCard], cls.CARD_SELECTION_CLASS);
        }
        var args = { data: draggedColumnData[nextCardIndex], element: nextCard, cancel: false };
        this.parent.trigger(events.cardRendered, args, function (cardArgs) {
            if (!cardArgs.cancel) {
                if (!isLast) {
                    wrapperELement.appendChild(nextCard);
                }
                else {
                    wrapperELement.insertBefore(nextCard, wrapperELement.querySelectorAll('.' + cls.CARD_CLASS)[0]);
                }
                _this.parent.dragAndDropModule.wireDragEvents(nextCard);
                addClass([nextCard], cls.DROPPABLE_CLASS);
            }
        });
    };
    VirtualLayoutRender.prototype.ensureBlocks = function (info) {
        var index = info.newBlockIndex[info.block];
        var maxPage = Math.ceil(info.totalColumnData / info.singleIndexCardCount);
        var max = Math.max;
        var indexes;
        if (info.scrollDirection === 'down') {
            indexes = index >= maxPage ? [max(index, 1), --index, --index].reverse() :
                (index + 1 >= maxPage ? [max(index - 1, 1), index, ++index] :
                    [max(index, 1), ++index, ++index]);
        }
        else {
            indexes = index === maxPage ? [max(index - 2, 1), max(index - 1, 1), index] :
                [max(index - 1, 1), index, index + 1];
        }
        // eslint-disable-next-line
        return indexes.filter(function (indexRemoveZero) { return indexRemoveZero > 0; });
    };
    VirtualLayoutRender.prototype.getInfoFromView = function (scrollStatus) {
        var isBlockAdded = false;
        var infoType = scrollStatus;
        infoType.page = this.getPageFromTop(scrollStatus);
        infoType.newBlockIndex = this.getBlockIndexes(infoType.page);
        var blocks = this.ensureBlocks(infoType);
        if (infoType.newBlockIndex.toString() !== blocks.toString()) {
            // To avoid dupilcate row index problem in key focus support
            var newBlock = blocks[blocks.length - 1];
            if (infoType.newBlockIndex.indexOf(newBlock) === -1) {
                isBlockAdded = true;
            }
        }
        infoType.newBlockIndex = isBlockAdded ? blocks : infoType.newBlockIndex;
        return infoType;
    };
    VirtualLayoutRender.prototype.getBlockIndexes = function (page) {
        return [page + (page - 1), page * 2];
    };
    VirtualLayoutRender.prototype.getPageFromTop = function (info) {
        var _this = this;
        var total = info.totalColumnData;
        var page = 0;
        this.offsetKeys = Object.keys(info.offsets);
        this.offsetKeys.some(function (offset) {
            var iOffset = Number(offset);
            var border = info.currentScrollTop <= info.offsets[parseInt(offset, 10)]
                || (iOffset === total && info.currentScrollTop > info.offsets[parseInt(offset, 10)]);
            if (border) {
                var maxPage = Math.ceil(total / info.singleIndexCardCount);
                if (_this.offsetKeys.length % 2 !== 0 && iOffset.toString() === _this.offsetKeys[_this.offsetKeys.length - 2]
                    && info.currentScrollTop <= info.offsets[_this.offsetKeys.length - 1]) {
                    iOffset = (iOffset + 1) > maxPage ? maxPage : iOffset + 1;
                }
                iOffset = iOffset > maxPage ? maxPage : iOffset;
                info.block = iOffset % 2 === 0 ? 1 : 0;
                page = Math.max(1, Math.min(_this.getPage(iOffset, maxPage), maxPage));
            }
            return border;
        });
        return page;
    };
    VirtualLayoutRender.prototype.getPage = function (block, maxPage) {
        if (block + 1 > maxPage) {
            return block % 2 === 0 ? block / 2 : (block - 1) / 2;
        }
        else {
            return block % 2 === 0 ? block / 2 : (block + 1) / 2;
        }
    };
    VirtualLayoutRender.prototype.onAdaptiveScroll = function (e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    };
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean} - Check column is visible or not.
     * @private
     * @hidden
     */
    VirtualLayoutRender.prototype.isColumnVisible = function (column) {
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
    VirtualLayoutRender.prototype.renderLimits = function (column, target) {
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
    VirtualLayoutRender.prototype.renderValidation = function () {
        var _this = this;
        this.parent.columns.forEach(function (column) {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            var cardData = _this.columnData[column.keyField];
            var keySelector = "[data-key=\"" + column.keyField + "\"]";
            var headerCell = _this.parent.element.querySelector("." + (cls.HEADER_CELLS_CLASS + keySelector));
            var rowCells = [].slice.call(_this.parent.element.querySelectorAll("." + (cls.CONTENT_CELLS_CLASS + keySelector)));
            _this.renderLimits(column, headerCell);
            var colorClass = _this.getValidationClass(column, cardData.length);
            if (colorClass) {
                addClass(rowCells.concat(headerCell), colorClass);
            }
        });
    };
    VirtualLayoutRender.prototype.getValidationClass = function (column, count) {
        var colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = cls.MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = cls.MIN_COLOR_CLASS;
        }
        return colorClass;
    };
    VirtualLayoutRender.prototype.refreshValidation = function () {
        var validations = [].slice.call(this.parent.element.querySelectorAll('.' + cls.LIMITS_CLASS));
        validations.forEach(function (node) { remove(node); });
        var minClass = [].slice.call(this.parent.element.querySelectorAll('.' + cls.MIN_COLOR_CLASS));
        removeClass(minClass, cls.MIN_COLOR_CLASS);
        var maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + cls.MAX_COLOR_CLASS));
        removeClass(maxClass, cls.MAX_COLOR_CLASS);
        this.renderValidation();
    };
    VirtualLayoutRender.prototype.getColumnData = function (columnValue, dataSource) {
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
            var _loop_6 = function (key) {
                var keyData = dataSource.filter(function (cardObj) {
                    return cardObj[_this.parent.keyField] === key.trim();
                });
                cardData = cardData.concat(keyData);
            };
            for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
                var key = columnKeys_1[_i];
                _loop_6(key);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    };
    VirtualLayoutRender.prototype.sortCategory = function (cardData) {
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
    VirtualLayoutRender.prototype.sortOrder = function (key, direction, cardData) {
        var isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])[key] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        var first;
        var second;
        cardData = cardData.sort(function (firstData, secondData) {
            if (!isNumeric) {
                first = firstData[key].toLowerCase();
                second = secondData[key].toLowerCase();
            }
            else {
                first = firstData[key];
                second = secondData[key];
            }
            return (first > second) ? 1 : ((second > first) ? -1 : 0);
        });
        if (direction === 'Descending') {
            cardData.reverse();
        }
        return cardData;
    };
    VirtualLayoutRender.prototype.documentClick = function (args) {
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
    VirtualLayoutRender.prototype.disableAttributeSelection = function (cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach(function (card) { card.setAttribute('aria-selected', 'false'); });
        }
    };
    VirtualLayoutRender.prototype.getColumnCards = function (data) {
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
    VirtualLayoutRender.prototype.refreshHeaders = function () {
        var header = this.parent.element.querySelector('.' + cls.HEADER_CLASS);
        [].slice.call(header.children).forEach(function (child) { return remove(child); });
        this.renderHeader(header);
    };
    VirtualLayoutRender.prototype.refreshCards = function () {
        this.parent.resetTemplates(['cardTemplate']);
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS));
        cards.forEach(function (card) { return remove(card); });
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    };
    VirtualLayoutRender.prototype.refresh = function () {
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
                    var columnDataLength = _this.parent.dataModule.isRemote() ? _this.parent.columnDataCount[column.keyField]
                        : _this.columnData[column.keyField].length;
                    var isNumeric = typeof column.keyField === 'number';
                    var cardLength = 0;
                    if (isNumeric) {
                        cardLength = ([].slice.call(_this.parent.element.querySelectorAll('.' + cls.CARD_CLASS + '[data-key="' + column.keyField + '"]'))).length;
                    }
                    else {
                        var keys = column.keyField.split(',');
                        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                            var key = keys_2[_i];
                            var cards = [].slice.call(_this.parent.element.querySelectorAll('.' + cls.CARD_CLASS + '[data-key="' + key.trim() + '"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + columnDataLength + ' ' + _this.parent.localeObj.getConstant('items');
                }
            }
        });
        this.refreshValidation();
    };
    VirtualLayoutRender.prototype.updateScrollPosition = function () {
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
    VirtualLayoutRender.prototype.renderCardBasedOnIndex = function (data, index, isDropped, requestType) {
        var _this = this;
        var key = data[this.parent.keyField];
        var cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.sortSettings.sortBy !== 'Index') {
            var field_1 = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field_1 = this.parent.sortSettings.field;
            }
            if (isNoU(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex(function (colData) {
                    return colData[field_1] === data[field_1];
                });
            }
            else {
                var swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex(function (colData) { return colData[field_1] === data[field_1]; });
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
            var cardWrapper_2 = td.querySelector('.' + cls.CARD_VIRTUAL_WRAPPER_CLASS);
            var emptyCard = cardWrapper_2.querySelector('.' + cls.EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            var cardElement_2 = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(cls.DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement_2);
                addClass([cardElement_2], cls.DROPPABLE_CLASS);
            }
            var args = { data: data, element: cardElement_2, cancel: false };
            this.parent.trigger(events.cardRendered, args, function (cardArgs) {
                var addCardCondition = isDropped ? true : cardWrapper_2.childNodes.length
                    < _this.scrollStatus[key].singleIndexCardCount;
                if (!cardArgs.cancel && addCardCondition || !isNoU(requestType)) {
                    if (isNoU(index) || cardWrapper_2.children.length === 0) {
                        cardWrapper_2.appendChild(cardElement_2);
                    }
                    else {
                        cardWrapper_2.insertBefore(cardElement_2, cardWrapper_2.childNodes[index]);
                    }
                }
            });
        }
    };
    VirtualLayoutRender.prototype.removeCard = function (data) {
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
    VirtualLayoutRender.prototype.wireEvents = function () {
        var _this = this;
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        window.addEventListener('resize', this.winResize);
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (_this.parent.isInitialRender && wrapper.offsetParent) {
                _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', _this.onColScrollShowSkeleton, _this);
            EventHandler.add(wrapper, 'scroll', debounce(_this.onColumnScroll, 200), _this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    };
    VirtualLayoutRender.prototype.unWireEvents = function () {
        var _this = this;
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        window.removeEventListener('resize', this.winResize);
        this.winResize = null;
        var content = this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            EventHandler.remove(content, 'scroll', this.onColScrollShowSkeleton);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach(function (wrapper) { EventHandler.remove(wrapper, 'scroll', debounce(_this.onColumnScroll, 200)); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    };
    VirtualLayoutRender.prototype.wireDragEvent = function () {
        var _this = this;
        if (this.parent.allowDragAndDrop) {
            var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS
                + '.' + cls.DRAG_CLASS + ' .' + cls.CARD_CLASS));
            addClass(cards, cls.DROPPABLE_CLASS);
            if (cards.length > 0) {
                cards.forEach(function (card) { return _this.parent.dragAndDropModule.wireDragEvents(card); });
            }
        }
    };
    VirtualLayoutRender.prototype.unWireDragEvent = function () {
        var _this = this;
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_CELLS_CLASS
            + '.' + cls.DRAG_CLASS + ' .' + cls.CARD_CLASS));
        removeClass(cards, cls.DROPPABLE_CLASS);
        if (cards.length > 0) {
            cards.forEach(function (card) { return _this.parent.dragAndDropModule.unWireDragEvents(card); });
        }
    };
    VirtualLayoutRender.prototype.destroy = function () {
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
    };
    return VirtualLayoutRender;
}(MobileLayout));
export { VirtualLayoutRender };
