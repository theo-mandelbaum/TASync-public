import { Draggable, Droppable, EventHandler } from '@syncfusion/ej2-base';
import { createElement, closest, remove, classList, addClass, removeClass } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend, updateCSSText } from '@syncfusion/ej2-base';
import { parentsUntil, isActionPrevent, isGroupAdaptive, updatecloneRow, getComplexFieldID, getParsedFieldID, isComplexField, findCellIndex, resetRowIndex } from '../base/util';
import { resetCachedRowIndex, groupReorderRowObject } from '../base/util';
import { generateExpandPredicates, getPredicates, capitalizeFirstLetter } from '../base/util';
import * as events from '../base/constant';
import { AriaService } from '../services/aria-service';
import { GroupModelGenerator } from '../services/group-model-generator';
import { DataUtil, Predicate } from '@syncfusion/ej2-data';
import * as literals from '../base/string-literals';
import { RowRenderer } from '../renderer/row-renderer';
// eslint-disable-next-line valid-jsdoc, jsdoc/require-param, jsdoc/require-returns
/**
 *
 * The `Group` module is used to handle group action.
 */
var Group = /** @class */ (function () {
    /**
     * Constructor for Grid group module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {GroupSettingsModel} groupSettings - specifies the GroupSettingsModel
     * @param {string[]} sortedColumns - specifies the sortedColumns
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     * @hidden
     */
    function Group(parent, groupSettings, sortedColumns, serviceLocator) {
        var _this = this;
        //Internal variables
        this.sortRequired = true;
        /** @hidden */
        this.groupSortFocus = false;
        /** @hidden */
        this.groupTextFocus = false;
        /** @hidden */
        this.groupCancelFocus = false;
        /** @hidden */
        this.preventFocusOnGroup = false;
        this.isAppliedGroup = false;
        this.isAppliedUnGroup = false;
        this.isAppliedCaptionRowBorder = false;
        this.reorderingColumns = [];
        this.visualElement = createElement('div', {
            className: 'e-cloneproperties e-dragclone e-gdclone',
            attrs: { action: 'grouping' }
        });
        this.helper = function (e) {
            var gObj = _this.parent;
            var target = e.sender.target;
            var element = target.classList.contains('e-groupheadercell') ? target :
                parentsUntil(target, 'e-groupheadercell');
            if (!element || (!target.classList.contains('e-drag') && _this.groupSettings.allowReordering)) {
                return false;
            }
            _this.column = gObj.getColumnByField(element.firstElementChild.getAttribute('ej-mappingname'));
            _this.visualElement.textContent = element.textContent;
            updateCSSText(_this.visualElement, "width: " + (element.offsetWidth + 2) + "px;\n            height: " + (element.offsetHeight + 2) + "px; line-height: 23px;");
            _this.visualElement.setAttribute('e-mappinguid', _this.column.uid);
            gObj.element.appendChild(_this.visualElement);
            return _this.visualElement;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.dragStart = function (e) {
            _this.parent.element.classList.add('e-ungroupdrag');
        };
        this.drag = function (e) {
            if (_this.groupSettings.allowReordering) {
                _this.animateDropper(e);
            }
            var target = e.target;
            var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
            _this.parent.trigger(events.columnDrag, { target: target, draggableType: 'headercell', column: _this.column });
            if (!_this.groupSettings.allowReordering) {
                classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
                if (!(parentsUntil(target, literals.gridContent) || parentsUntil(target, 'e-headercell'))) {
                    classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
                }
            }
        };
        this.dragStop = function (e) {
            _this.parent.element.classList.remove('e-ungroupdrag');
            var preventDrop = !(parentsUntil(e.target, literals.gridContent) || parentsUntil(e.target, 'e-gridheader'));
            if (_this.groupSettings.allowReordering && preventDrop) {
                remove(e.helper);
                if (parentsUntil(e.target, 'e-groupdroparea')) {
                    _this.rearrangeGroup();
                }
                else if (!(parentsUntil(e.target, 'e-grid'))) {
                    var field = _this.parent.getColumnByUid(e.helper.getAttribute('e-mappinguid')).field;
                    if (_this.groupSettings.columns.indexOf(field) !== -1) {
                        _this.ungroupColumn(field);
                    }
                }
                return;
            }
            else if (preventDrop) {
                remove(e.helper);
                return;
            }
        };
        this.animateDropper = function (e) {
            var uid = _this.parent.element.querySelector('.e-cloneproperties').getAttribute('e-mappinguid');
            var dragField = _this.parent.getColumnByUid(uid).field;
            var parent = parentsUntil(e.target, 'e-groupdroparea');
            var dropTarget = parentsUntil(e.target, 'e-group-animator');
            var grouped = [].slice.call(_this.element.getElementsByClassName('e-groupheadercell'))
                .map(function (e) { return e.querySelector('div').getAttribute('ej-mappingname'); });
            var cols = JSON.parse(JSON.stringify(grouped));
            if (dropTarget || parent) {
                if (dropTarget) {
                    var dropField = dropTarget.querySelector('div[ej-mappingname]').getAttribute('ej-mappingname');
                    var dropIndex = +(dropTarget.getAttribute('index'));
                    if (dropField !== dragField) {
                        var dragIndex = cols.indexOf(dragField);
                        if (dragIndex !== -1) {
                            cols.splice(dragIndex, 1);
                        }
                        var flag = dropIndex !== -1 && dragIndex === dropIndex;
                        cols.splice(dropIndex + (flag ? 1 : 0), 0, dragField);
                    }
                }
                else if (parent && cols.indexOf(dragField) === -1) {
                    cols.push(dragField);
                }
                _this.element.innerHTML = '';
                if (cols.length && !_this.element.classList.contains('e-grouped')) {
                    _this.element.classList.add('e-grouped');
                }
                _this.reorderingColumns = cols;
                for (var c = 0; c < cols.length; c++) {
                    _this.addColToGroupDrop(cols[parseInt(c.toString(), 10)]);
                }
            }
            else {
                _this.addLabel();
                _this.removeColFromGroupDrop(dragField);
            }
        };
        this.drop = function (e) {
            var gObj = _this.parent;
            var column = gObj.getColumnByUid(e.droppedElement.getAttribute('e-mappinguid'));
            _this.element.classList.remove('e-hover');
            remove(e.droppedElement);
            _this.aria.setDropTarget(_this.parent.element.querySelector('.e-groupdroparea'), false);
            _this.aria.setGrabbed(_this.parent.getHeaderTable().querySelector('[aria-grabbed=true]'), false);
            if (isNullOrUndefined(column) || column.allowGrouping === false ||
                parentsUntil(gObj.getColumnHeaderByUid(column.uid), 'e-grid').getAttribute('id') !==
                    gObj.element.getAttribute('id')) {
                _this.parent.log('action_disabled_column', { moduleName: _this.getModuleName(), columnName: column ? column.headerText : undefined });
                return;
            }
            _this.groupColumn(column.field);
        };
        this.contentRefresh = true;
        this.aria = new AriaService();
        this.parent = parent;
        this.groupSettings = groupSettings;
        this.serviceLocator = serviceLocator;
        this.sortedColumns = sortedColumns;
        this.focus = serviceLocator.getService('focus');
        this.addEventListener();
        this.groupGenerator = new GroupModelGenerator(this.parent);
    }
    Group.prototype.addLabel = function () {
        if (!this.element.getElementsByClassName('e-group-animator').length) {
            var dragLabel = this.l10n.getConstant('GroupDropArea');
            this.element.innerHTML = dragLabel;
            this.element.classList.remove('e-grouped');
        }
    };
    Group.prototype.rearrangeGroup = function () {
        this.sortRequired = false;
        this.updateModel();
    };
    Group.prototype.columnDrag = function (e) {
        if (this.groupSettings.allowReordering && e.column.allowGrouping) {
            this.animateDropper(e);
        }
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        if (!this.parent.allowReordering) {
            classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
        }
        if (!(e.column.allowGrouping && (parentsUntil(e.target, 'e-groupdroparea') ||
            (parentsUntil(e.target, 'e-headercell') &&
                parentsUntil(e.target, 'e-headercell').isEqualNode(this.parent.getColumnHeaderByField(e.column.field))))) &&
            !(this.parent.allowReordering && parentsUntil(e.target, 'e-headercell'))) {
            classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
        }
        if (e.target.classList.contains('e-groupdroparea')) {
            this.element.classList.add('e-hover');
        }
        else {
            this.element.classList.remove('e-hover');
        }
    };
    Group.prototype.columnDragStart = function (e) {
        if (e.target.classList.contains('e-stackedheadercell')) {
            return;
        }
        var dropArea = this.parent.element.querySelector('.e-groupdroparea');
        this.aria.setDropTarget(dropArea, e.column.allowGrouping);
        var element = e.target.classList.contains('e-headercell') ? e.target : parentsUntil(e.target, 'e-headercell');
        this.aria.setGrabbed(element, true, !e.column.allowGrouping);
    };
    Group.prototype.columnDrop = function (e) {
        var gObj = this.parent;
        if (e.droppedElement.getAttribute('action') === 'grouping') {
            var column = gObj.getColumnByUid(e.droppedElement.getAttribute('e-mappinguid'));
            if (isNullOrUndefined(column) || column.allowGrouping === false ||
                parentsUntil(gObj.getColumnHeaderByUid(column.uid), 'e-grid').getAttribute('id') !==
                    gObj.element.getAttribute('id')) {
                return;
            }
            this.ungroupColumn(column.field);
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Group.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
        this.parent.on(events.groupComplete, this.onActionComplete, this);
        this.parent.on(events.ungroupComplete, this.onActionComplete, this);
        this.parent.on(events.inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(events.click, this.clickHandler, this);
        this.parent.on(events.columnDrag, this.columnDrag, this);
        this.parent.on(events.columnDragStart, this.columnDragStart, this);
        this.parent.on(events.headerDrop, this.columnDrop, this);
        this.parent.on(events.columnDrop, this.columnDrop, this);
        this.parent.on(events.headerRefreshed, this.refreshSortIcons, this);
        this.parent.on(events.sortComplete, this.refreshSortIcons, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
        this.parent.on(events.contentReady, this.initialEnd, this);
        this.parent.on(events.onEmpty, this.initialEnd, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.on(events.groupAggregates, this.onGroupAggregates, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on('group-expand-collapse', this.updateExpand, this);
        this.parent.on('persist-data-changed', this.initialEnd, this);
    };
    /**
     * @returns {void}
     * @hidden
     */
    Group.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.uiUpdate, this.enableAfterRender);
        this.parent.off(events.groupComplete, this.onActionComplete);
        this.parent.off(events.ungroupComplete, this.onActionComplete);
        this.parent.off(events.inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(events.click, this.clickHandler);
        this.parent.off(events.columnDrag, this.columnDrag);
        this.parent.off(events.columnDragStart, this.columnDragStart);
        this.parent.off(events.columnDrop, this.columnDrop);
        this.parent.off(events.headerDrop, this.columnDrop);
        this.parent.off(events.headerRefreshed, this.refreshSortIcons);
        this.parent.off(events.sortComplete, this.refreshSortIcons);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        this.parent.off(events.groupAggregates, this.onGroupAggregates);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off('group-expand-collapse', this.updateExpand);
    };
    Group.prototype.initialEnd = function () {
        var gObj = this.parent;
        this.parent.off(events.contentReady, this.initialEnd);
        this.parent.off(events.onEmpty, this.initialEnd);
        if (this.parent.getColumns().length && this.groupSettings.columns.length) {
            this.contentRefresh = false;
            for (var _i = 0, _a = gObj.groupSettings.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                this.groupColumn(col);
            }
            this.contentRefresh = true;
        }
    };
    Group.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        if (e.target && parentsUntil(e.target, 'e-groupheadercell') && (e.action === 'tab' || e.action === 'shiftTab')) {
            var focusableGroupedItems = this.getFocusableGroupedItems();
            if ((e.action === 'tab' && e.target === focusableGroupedItems[focusableGroupedItems.length - 1])
                || (e.action === 'shiftTab' && e.target === focusableGroupedItems[0])) {
                return;
            }
            for (var i = 0; i < focusableGroupedItems.length; i++) {
                if (e.target === focusableGroupedItems[parseInt(i.toString(), 10)]) {
                    e.preventDefault();
                    var index = e.action === 'tab' ? i + 1 : i - 1;
                    focusableGroupedItems[parseInt(index.toString(), 10)].focus();
                    return;
                }
            }
        }
        var isMacLike = /(Mac)/i.test(navigator.platform);
        if (isMacLike && e.metaKey) {
            if (e.action === 'downArrow') {
                e.action = 'ctrlDownArrow';
            }
            else if (e.action === 'upArrow') {
                e.action = 'ctrlUpArrow';
            }
        }
        if ((e.action !== 'ctrlSpace' && (!this.groupSettings.columns.length ||
            ['altDownArrow', 'altUpArrow', 'ctrlDownArrow', 'ctrlUpArrow', 'enter'].indexOf(e.action) === -1))
            || (this.parent.groupSettings.enableLazyLoading && this.groupSettings.columns.length
                && (e.action === 'ctrlUpArrow' || e.action === 'ctrlDownArrow'))) {
            return;
        }
        switch (e.action) {
            case 'altDownArrow':
            case 'altUpArrow':
                // eslint-disable-next-line no-case-declarations
                var selected = gObj.allowSelection ? gObj.getSelectedRowIndexes() : [];
                if (selected.length) {
                    e.preventDefault();
                    var rows = gObj.getContentTable().querySelector(literals.tbody).children;
                    var dataRow = gObj.getDataRows()[selected[selected.length - 1]];
                    var grpRow = void 0;
                    for (var i = dataRow.rowIndex; i >= 0; i--) {
                        if (!rows[parseInt(i.toString(), 10)].classList.contains(literals.row) && !rows[parseInt(i.toString(), 10)].classList.contains('e-detailrow')) {
                            grpRow = rows[parseInt(i.toString(), 10)];
                            break;
                        }
                    }
                    this.expandCollapseRows(grpRow.querySelector(e.action === 'altUpArrow' ?
                        '.e-recordplusexpand' : '.e-recordpluscollapse'));
                }
                break;
            case 'ctrlDownArrow':
                e.preventDefault();
                this.expandAll();
                break;
            case 'ctrlUpArrow':
                e.preventDefault();
                this.collapseAll();
                break;
            case 'enter':
                if (e.target.classList.contains('e-groupsort')) {
                    this.groupSortFocus = true;
                    e.preventDefault();
                    this.applySortFromTarget(e.target);
                    break;
                }
                else if (e.target.classList.contains('e-ungroupbutton')) {
                    this.groupCancelFocus = true;
                    e.preventDefault();
                    this.unGroupFromTarget(e.target);
                    break;
                }
                if (this.parent.isEdit || (closest(e.target, '#' + this.parent.element.id + '_searchbar') !== null) ||
                    parentsUntil(e.target, 'e-pager') || parentsUntil(e.target, 'e-toolbar')) {
                    return;
                }
                // eslint-disable-next-line no-case-declarations
                var element = this.focus.getFocusedElement();
                if (element && (element.classList.contains('e-icon-grightarrow') || element.classList.contains('e-icon-gdownarrow'))) {
                    element = element.parentElement;
                }
                // eslint-disable-next-line no-case-declarations
                var row = element && element.parentElement ? element.parentElement.querySelector('[class^="e-record"]') : null;
                if (!row) {
                    break;
                }
                if (element.children.length && (element.children[0].classList.contains('e-icon-grightarrow') ||
                    element.children[0].classList.contains('e-icon-gdownarrow'))) {
                    e.preventDefault();
                    this.expandCollapseRows(row);
                }
                break;
            case 'ctrlSpace':
                // eslint-disable-next-line no-case-declarations
                var elem = gObj.focusModule.currentInfo.element;
                if (elem && elem.classList.contains('e-headercell')) {
                    e.preventDefault();
                    var column = gObj.getColumnByUid(elem.firstElementChild.getAttribute('e-mappinguid'));
                    if (column.field && gObj.groupSettings.columns.indexOf(column.field) < 0) {
                        this.groupColumn(column.field);
                    }
                    else {
                        this.ungroupColumn(column.field);
                    }
                }
                break;
        }
    };
    /**
     * @returns {Element[]} - Return the focusable grouping items
     * @hidden */
    Group.prototype.getFocusableGroupedItems = function () {
        var focusableGroupedItems = [];
        if (this.groupSettings.columns.length) {
            var focusableGroupedHeaderItems = this.element.querySelectorAll('.e-groupheadercell');
            for (var i = 0; i < focusableGroupedHeaderItems.length; i++) {
                focusableGroupedItems.push(focusableGroupedHeaderItems[parseInt(i.toString(), 10)].querySelector('.e-grouptext'));
                focusableGroupedItems.push(focusableGroupedHeaderItems[parseInt(i.toString(), 10)].querySelector('.e-groupsort'));
                focusableGroupedItems.push(focusableGroupedHeaderItems[parseInt(i.toString(), 10)].querySelector('.e-ungroupbutton'));
            }
        }
        return focusableGroupedItems;
    };
    Group.prototype.wireEvent = function () {
        EventHandler.add(this.element, 'focusin', this.onFocusIn, this);
        EventHandler.add(this.element, 'focusout', this.onFocusOut, this);
        EventHandler.add(this.parent.element, 'auxclick', this.auxilaryclickHandler, this);
    };
    Group.prototype.unWireEvent = function () {
        EventHandler.remove(this.element, 'focusin', this.onFocusIn);
        EventHandler.remove(this.element, 'focusout', this.onFocusOut);
        EventHandler.remove(this.parent.element, 'auxclick', this.auxilaryclickHandler);
    };
    Group.prototype.onFocusIn = function (e) {
        if (this.parent.focusModule.currentInfo && this.parent.focusModule.currentInfo.element) {
            removeClass([this.parent.focusModule.currentInfo.element, this.parent.focusModule.currentInfo.elementToFocus], ['e-focused', 'e-focus']);
            this.parent.focusModule.currentInfo.element.tabIndex = -1;
        }
        this.addOrRemoveFocus(e);
    };
    Group.prototype.onFocusOut = function (e) {
        this.addOrRemoveFocus(e);
    };
    Group.prototype.addOrRemoveFocus = function (e) {
        if (e.target.classList.contains('e-groupdroparea') || e.target.classList.contains('e-grouptext')
            || e.target.classList.contains('e-groupsort')
            || e.target.classList.contains('e-ungroupbutton')) {
            var target = e.target.classList.contains('e-grouptext') ?
                e.target.parentElement.parentElement : e.target;
            if (e.type === 'focusin') {
                this.parent.focusModule.currentInfo.element = e.target;
                this.parent.focusModule.currentInfo.elementToFocus = e.target;
                addClass([target], ['e-focused', 'e-focus']);
                e.target.tabIndex = 0;
            }
            else {
                removeClass([target], ['e-focused', 'e-focus']);
                e.target.tabIndex = -1;
            }
        }
    };
    Group.prototype.clickHandler = function (e) {
        if (e.target.classList.contains('e-grouptext')) {
            this.groupTextFocus = true;
        }
        if (e.target.classList.contains('e-groupsort')) {
            this.groupSortFocus = true;
        }
        if (e.target.classList.contains('e-ungroupbutton')) {
            this.groupCancelFocus = true;
        }
        if (e.target.classList.contains('e-icon-grightarrow') || e.target.classList.contains('e-icon-gdownarrow')) {
            e.preventDefault();
        }
        var trgtEle = parentsUntil(e.target, 'e-recordplusexpand') ||
            parentsUntil(e.target, 'e-recordpluscollapse');
        if (trgtEle && (trgtEle.children[0].classList.contains('e-icon-gdownarrow') || trgtEle.children[0].classList.contains('e-icon-grightarrow'))) {
            this.expandCollapseRows(e.target);
        }
        this.applySortFromTarget(e.target);
        this.unGroupFromTarget(e.target);
        this.toogleGroupFromHeader(e.target);
    };
    Group.prototype.auxilaryclickHandler = function (e) {
        if (e.target.classList.contains('e-icon-grightarrow') || e.target.classList.contains('e-icon-gdownarrow')
            && (e.button === 1)) {
            e.preventDefault();
        }
    };
    Group.prototype.unGroupFromTarget = function (target) {
        if (target.classList.contains('e-ungroupbutton')) {
            this.ungroupColumn(target.parentElement.getAttribute('ej-mappingname'));
        }
    };
    Group.prototype.toogleGroupFromHeader = function (target) {
        if (this.groupSettings.showToggleButton) {
            if (target.classList.contains('e-grptogglebtn')) {
                if (target.classList.contains('e-toggleungroup')) {
                    this.ungroupColumn(this.parent.getColumnByUid(target.parentElement.getAttribute('e-mappinguid')).field);
                }
                else {
                    this.groupColumn(this.parent.getColumnByUid(target.parentElement.getAttribute('e-mappinguid')).field);
                }
            }
            else {
                if (target.classList.contains('e-toggleungroup')) {
                    this.ungroupColumn(target.parentElement.getAttribute('ej-mappingname'));
                }
            }
        }
    };
    Group.prototype.applySortFromTarget = function (target) {
        var gObj = this.parent;
        var gHeader = closest(target, '.e-groupheadercell');
        if (gObj.allowSorting && gHeader && !target.classList.contains('e-ungroupbutton') &&
            !target.classList.contains('e-toggleungroup')) {
            var field = gHeader.firstElementChild.getAttribute('ej-mappingname');
            if (gObj.getColumnHeaderByField(field).getElementsByClassName('e-ascending').length) {
                gObj.sortColumn(field, 'Descending', true);
            }
            else {
                gObj.sortColumn(field, 'Ascending', true);
            }
        }
    };
    /**
     * Expands or collapses grouped rows by target element.
     *
     * @param  {Element} target - Defines the target element of the grouped row.
     * @returns {void}
     */
    Group.prototype.expandCollapseRows = function (target) {
        var trgt = parentsUntil(target, 'e-recordplusexpand') ||
            parentsUntil(target, 'e-recordpluscollapse');
        if (trgt) {
            var rowNodes = [].slice.call(this.parent.getContentTable().querySelector(literals.tbody).children);
            if (this.parent.editSettings.showAddNewRow) {
                if (rowNodes[0].classList.contains('e-addedrow')) {
                    rowNodes.shift();
                }
                else if (rowNodes[rowNodes.length - 1].classList.contains('e-addedrow')) {
                    rowNodes.pop();
                }
            }
            var isHide = void 0;
            var dataManager = void 0;
            var query = void 0;
            var gObj = this.parent;
            var indent = trgt.parentElement.getElementsByClassName('e-indentcell').length;
            var uid = trgt.parentElement.getAttribute('data-uid');
            var captionRow = gObj.getRowObjectFromUID(uid);
            var expand = false;
            if (trgt.classList.contains('e-recordpluscollapse')) {
                addClass([trgt], 'e-recordplusexpand');
                removeClass([trgt], 'e-recordpluscollapse');
                trgt.firstElementChild.className = 'e-icons e-gdiagonaldown e-icon-gdownarrow';
                trgt.firstElementChild.setAttribute('title', this.l10n.getConstant('Expanded'));
                expand = true;
                captionRow.isExpand = true;
                if (isGroupAdaptive(gObj)) {
                    this.updateVirtualRows(gObj, target, expand, query, dataManager);
                }
                if (this.parent.groupSettings.enableLazyLoading) {
                    if ((this.parent.filterSettings.columns.length || this.parent.sortSettings.columns.length ||
                        this.parent.searchSettings.key.length) && this.parent.getContent().firstElementChild.scrollTop === 0) {
                        this.parent.contentModule.isTop = true;
                    }
                    (this.parent.enableVirtualization ? this.parent.lazyLoadRender :
                        this.parent.contentModule).captionExpand(trgt.parentElement);
                }
            }
            else {
                isHide = true;
                captionRow.isExpand = false;
                removeClass([trgt], 'e-recordplusexpand');
                addClass([trgt], 'e-recordpluscollapse');
                trgt.firstElementChild.className = 'e-icons e-gnextforward e-icon-grightarrow';
                trgt.firstElementChild.setAttribute('title', this.l10n.getConstant('Collapsed'));
                if (isGroupAdaptive(gObj)) {
                    this.updateVirtualRows(gObj, target, !isHide, query, dataManager);
                }
                if (this.parent.groupSettings.enableLazyLoading) {
                    (this.parent.enableVirtualization ? this.parent.lazyLoadRender :
                        this.parent.contentModule).captionCollapse(trgt.parentElement);
                }
            }
            this.aria.setExpand(trgt, expand);
            if (!isGroupAdaptive(gObj) && !this.parent.groupSettings.enableLazyLoading) {
                var rowObjs = gObj.getRowsObject();
                var startIdx = rowObjs.indexOf(captionRow);
                var rowsState = {};
                var cacheStartIdx = gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings &&
                    gObj.infiniteScrollSettings.enableCache && rowObjs.length !== rowNodes.length ?
                    Array.from(rowNodes).indexOf(trgt.parentElement) : undefined;
                for (var i = startIdx; i < rowObjs.length; i++) {
                    if (i > startIdx && rowObjs[parseInt(i.toString(), 10)].indent === indent) {
                        break;
                    }
                    if (rowObjs[parseInt(i.toString(), 10)].isDetailRow) {
                        var visible = rowObjs[i - 1].isExpand && rowObjs[i - 1].visible;
                        if (cacheStartIdx && cacheStartIdx > 0 && cacheStartIdx < rowNodes.length) {
                            rowNodes[parseInt(cacheStartIdx.toString(), 10)].style.display = visible ? '' : 'none';
                        }
                        else if (isNullOrUndefined(cacheStartIdx)) {
                            rowNodes[parseInt(i.toString(), 10)].style.display = visible ? '' : 'none';
                        }
                    }
                    else if (rowsState[rowObjs[parseInt(i.toString(), 10)].parentUid] === false) {
                        rowObjs[parseInt(i.toString(), 10)].visible = false;
                        if (cacheStartIdx && cacheStartIdx > 0 && cacheStartIdx < rowNodes.length) {
                            rowNodes[parseInt(cacheStartIdx.toString(), 10)].style.display = 'none';
                        }
                        else if (isNullOrUndefined(cacheStartIdx)) {
                            rowNodes[parseInt(i.toString(), 10)].style.display = 'none';
                        }
                    }
                    else {
                        if (!(rowObjs[parseInt(i.toString(), 10)].isDataRow || rowObjs[parseInt(i.toString(), 10)].isCaptionRow
                            || rowObjs[parseInt(i.toString(), 10)].isDetailRow || rowObjs[parseInt(i.toString(), 10)].isAggregateRow)) {
                            var visible = rowObjs[parseInt(i.toString(), 10)].cells
                                .some(function (cell) { return cell.isDataCell && cell.visible; });
                            if (visible === rowObjs[parseInt(i.toString(), 10)].visible) {
                                continue;
                            }
                        }
                        rowObjs[parseInt(i.toString(), 10)].visible = true;
                        if (cacheStartIdx && cacheStartIdx > 0 && cacheStartIdx < rowNodes.length) {
                            rowNodes[parseInt(cacheStartIdx.toString(), 10)].style.display = '';
                            rowNodes[parseInt(cacheStartIdx.toString(), 10)].classList.remove('e-hide');
                        }
                        else if (isNullOrUndefined(cacheStartIdx)) {
                            rowNodes[parseInt(i.toString(), 10)].style.display = '';
                            rowNodes[parseInt(i.toString(), 10)].classList.remove('e-hide');
                        }
                    }
                    if (rowObjs[parseInt(i.toString(), 10)].isCaptionRow) {
                        rowsState[rowObjs[parseInt(i.toString(), 10)].uid] = rowObjs[parseInt(i.toString(), 10)].isExpand
                            && rowObjs[parseInt(i.toString(), 10)].visible;
                    }
                    if (!isNullOrUndefined(cacheStartIdx)) {
                        cacheStartIdx++;
                    }
                }
                this.lastCaptionRowBorder();
                this.parent.notify(events.refreshExpandandCollapse, { rows: this.parent.getRowsObject() });
            }
            if (!this.parent.enableInfiniteScrolling || !this.parent.groupSettings.enableLazyLoading) {
                this.parent.notify(events.captionActionComplete, { isCollapse: isHide, parentUid: uid });
            }
        }
    };
    /**
     * The function is used to set border in last row
     *
     * @returns { void }
     * @hidden
     */
    Group.prototype.lastCaptionRowBorder = function () {
        var table = this.parent.getContentTable();
        var clientHeight = this.parent.getContent().clientHeight;
        if ((!this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling) ||
            this.parent.groupSettings.enableLazyLoading) {
            if (table.scrollHeight < clientHeight || this.isAppliedCaptionRowBorder) {
                if (this.isAppliedCaptionRowBorder || table.querySelector('.e-lastrowcell')) {
                    var borderCells = table.querySelectorAll('.e-lastrowcell');
                    for (var i = 0, len = borderCells.length; i < len; i++) {
                        removeClass([borderCells[parseInt(i.toString(), 10)]], 'e-lastrowcell');
                    }
                    this.isAppliedCaptionRowBorder = false;
                }
                var rowNodes = this.parent.getContentTable().querySelector(literals.tbody).children;
                var lastRow = rowNodes[rowNodes.length - 1];
                if (lastRow.style.display !== 'none' && !lastRow.classList.contains('e-groupcaptionrow')) {
                    if (table.scrollHeight < clientHeight) {
                        addClass(table.querySelectorAll('tr:last-child td'), 'e-lastrowcell');
                        this.isAppliedCaptionRowBorder = true;
                    }
                }
                else {
                    for (var i = rowNodes.length - 1, len = 0; i > len; i--) {
                        if (rowNodes[parseInt(i.toString(), 10)].style.display !== 'none'
                            && rowNodes[parseInt(i.toString(), 10)].classList.contains('e-groupcaptionrow')) {
                            if (rowNodes[parseInt(i.toString(), 10)].querySelector('.e-recordpluscollapse')) {
                                addClass(rowNodes[parseInt(i.toString(), 10)].childNodes, 'e-lastrowcell');
                                this.isAppliedCaptionRowBorder = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    Group.prototype.updateVirtualRows = function (gObj, target, isExpand, query, dataManager) {
        var rObj = gObj.getRowObjectFromUID(target.closest('tr').getAttribute('data-uid'));
        rObj.isExpand = isExpand;
        updatecloneRow(gObj);
        this.parent.notify(events.refreshVirtualMaxPage, {});
        query = gObj.getDataModule().generateQuery(false);
        query.queries = gObj.getDataModule().aggregateQuery(gObj.getQuery().clone()).queries;
        var args = { requestType: 'virtualscroll', rowObject: rObj };
        if (gObj.contentModule) {
            args.virtualInfo = gObj.contentModule.prevInfo;
        }
        dataManager = gObj.getDataModule().getData(args, query.requiresCount());
        dataManager.then(function (e) { return gObj.renderModule.dataManagerSuccess(e, args); });
    };
    Group.prototype.expandCollapse = function (isExpand) {
        if (!this.parent.groupSettings.columns.length) {
            return;
        }
        if (!isExpand) {
            this.parent.notify(events.initialCollapse, isExpand);
        }
        var rowNodes = this.parent.getContentTable().querySelector(literals.tbody).children;
        var rowObjs = this.parent.getRowsObject();
        var row;
        for (var i = 0, len = rowNodes.length; i < len; i++) {
            if (rowNodes[parseInt(i.toString(), 10)].querySelectorAll('.e-recordplusexpand, .e-recordpluscollapse').length) {
                row = rowNodes[parseInt(i.toString(), 10)].querySelector(isExpand ? '.e-recordpluscollapse' : '.e-recordplusexpand');
                if (row) {
                    if (isExpand) {
                        row.className = 'e-recordplusexpand';
                        row.firstElementChild.className = 'e-icons e-gdiagonaldown e-icon-gdownarrow';
                        row.setAttribute('aria-expanded', 'true');
                        row.firstElementChild.setAttribute('title', this.l10n.getConstant('Expanded'));
                    }
                    else {
                        row.className = 'e-recordpluscollapse';
                        row.firstElementChild.className = 'e-icons e-gnextforward e-icon-grightarrow';
                        row.setAttribute('aria-expanded', 'false');
                        row.firstElementChild.setAttribute('title', this.l10n.getConstant('Collapsed'));
                    }
                }
                if (!(rowNodes[parseInt(i.toString(), 10)].firstElementChild.classList.contains('e-recordplusexpand') ||
                    rowNodes[parseInt(i.toString(), 10)].firstElementChild.classList.contains('e-recordpluscollapse'))) {
                    rowNodes[parseInt(i.toString(), 10)].style.display = isExpand ? '' : 'none';
                }
            }
            else {
                rowNodes[parseInt(i.toString(), 10)].style.display = isExpand ? '' : 'none';
            }
            if (rowObjs[parseInt(i.toString(), 10)].isCaptionRow) {
                rowObjs[parseInt(i.toString(), 10)].isExpand = isExpand ? true : false;
            }
        }
        this.parent.updateVisibleExpandCollapseRows();
        this.lastCaptionRowBorder();
        this.parent.notify(events.refreshExpandandCollapse, { rows: this.parent.getRowsObject() });
    };
    /**
     * Expands all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    Group.prototype.expandAll = function () {
        this.expandCollapse(true);
    };
    /**
     * Collapses all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    Group.prototype.collapseAll = function () {
        this.expandCollapse(false);
    };
    /**
     * The function is used to render grouping
     *
     * @returns {void}
     * @hidden
     */
    Group.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.renderGroupDropArea();
        this.initDragAndDrop();
        this.refreshToggleBtn();
        this.wireEvent();
    };
    Group.prototype.renderGroupDropArea = function () {
        var groupElem = this.parent.element.querySelector('.e-groupdroparea');
        if (groupElem) {
            remove(groupElem);
        }
        this.element = this.parent.createElement('div', { className: 'e-groupdroparea', attrs: { 'tabindex': '-1' } });
        if (this.groupSettings.allowReordering) {
            this.element.classList.add('e-group-animate');
        }
        this.updateGroupDropArea();
        this.parent.element.insertBefore(this.element, this.parent.element.firstChild);
        if (!this.groupSettings.showDropArea || this.parent.rowRenderingMode === 'Vertical') {
            this.element.style.display = 'none';
        }
    };
    Group.prototype.updateGroupDropArea = function (clear) {
        if (this.groupSettings.showDropArea && !this.groupSettings.columns.length) {
            var dragLabel = this.l10n.getConstant('GroupDropArea');
            this.element.innerHTML = dragLabel;
            this.element.classList.remove('e-grouped');
        }
        else {
            if ((this.element.innerHTML === this.l10n.getConstant('GroupDropArea') && (this.groupSettings.columns.length === 1
                || !this.isAppliedGroup && !this.isAppliedUnGroup)) || clear) {
                this.element.innerHTML = '';
            }
            this.element.classList.add('e-grouped');
        }
    };
    Group.prototype.initDragAndDrop = function () {
        this.initializeGHeaderDrop();
        this.initializeGHeaderDrag();
    };
    Group.prototype.initializeGHeaderDrag = function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var drag = new Draggable(this.element, {
            dragTarget: this.groupSettings.allowReordering ? '.e-drag' : '.e-groupheadercell',
            distance: this.groupSettings.allowReordering ? -10 : 5,
            helper: this.helper,
            dragStart: this.dragStart,
            drag: this.drag,
            dragStop: this.dragStop
        });
    };
    Group.prototype.initializeGHeaderDrop = function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var drop = new Droppable(this.element, {
            accept: '.e-dragclone',
            drop: this.drop
        });
    };
    /**
     * Groups a column by column name.
     *
     * @param  {string} columnName - Defines the column name to group.
     * @returns {void}
     */
    Group.prototype.groupColumn = function (columnName) {
        var gObj = this.parent;
        var column = gObj.getColumnByField(columnName);
        if (isNullOrUndefined(column) || column.allowGrouping === false ||
            (this.contentRefresh && this.groupSettings.columns.indexOf(columnName) > -1)) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), columnName: column.headerText });
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, { instance: this, handler: this.groupColumn, arg1: columnName });
            return;
        }
        column.visible = gObj.groupSettings.showGroupedColumn;
        this.colName = columnName;
        this.isAppliedGroup = true;
        if (this.contentRefresh) {
            this.updateModel();
        }
        else {
            this.addColToGroupDrop(columnName);
        }
        this.updateGroupDropArea();
        this.isAppliedGroup = false;
    };
    /**
     * Ungroups a column by column name.
     *
     * @param  {string} columnName - Defines the column name to ungroup.
     * @returns {void}
     */
    Group.prototype.ungroupColumn = function (columnName) {
        var gObj = this.parent;
        var column = this.parent.enableColumnVirtualization ?
            this.parent.columns.filter(function (c) { return c.field === columnName; })[0] : gObj.getColumnByField(columnName);
        if (isNullOrUndefined(column) || column.allowGrouping === false || this.groupSettings.columns.indexOf(columnName) < 0) {
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, { instance: this, handler: this.ungroupColumn, arg1: columnName });
            return;
        }
        column.visible = true;
        this.colName = column.field;
        var columns = JSON.parse(JSON.stringify(this.groupSettings.columns));
        columns.splice(columns.indexOf(this.colName), 1);
        if (this.sortedColumns.indexOf(columnName) < 0) {
            for (var i = 0, len = gObj.sortSettings.columns.length; i < len; i++) {
                if (columnName === gObj.sortSettings.columns[parseInt(i.toString(), 10)].field) {
                    gObj.sortSettings.columns.splice(i, 1);
                    break;
                }
            }
        }
        if (this.groupSettings.allowReordering) {
            this.reorderingColumns = columns;
        }
        this.groupSettings.columns = columns;
        if (gObj.allowGrouping) {
            this.isAppliedUnGroup = true;
            this.parent.dataBind();
        }
    };
    /**
     * The function used to update groupSettings
     *
     * @returns {void}
     * @hidden
     */
    Group.prototype.updateModel = function () {
        var columns = JSON.parse(JSON.stringify(this.groupSettings.columns));
        columns = this.reorderingColumns.length ? JSON.parse(JSON.stringify(this.reorderingColumns)) : columns;
        if (this.sortRequired) {
            if (columns.indexOf(this.colName) === -1) {
                columns.push(this.colName);
            }
            this.groupAddSortingQuery(this.colName);
        }
        this.sortRequired = true;
        this.parent.groupSettings.columns = columns;
        this.parent.dataBind();
    };
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Group.prototype.onActionComplete = function (e) {
        if (e.requestType === 'grouping') {
            this.addColToGroupDrop(this.colName);
        }
        else {
            this.removeColFromGroupDrop(this.colName);
        }
        if (this.groupSettings.showDropArea && this.parent.height === '100%') {
            this.parent.scrollModule.refresh();
        }
        var args = this.groupSettings.columns.indexOf(this.colName) > -1 ? {
            columnName: this.colName, requestType: 'grouping', type: events.actionComplete
        } : { requestType: 'ungrouping', type: events.actionComplete };
        this.parent.trigger(events.actionComplete, extend(e, args));
        this.colName = null;
    };
    Group.prototype.groupAddSortingQuery = function (colName) {
        var i = 0;
        while (i < this.parent.sortSettings.columns.length) {
            if (this.parent.sortSettings.columns[parseInt(i.toString(), 10)].field === colName) {
                break;
            }
            i++;
        }
        if (this.parent.sortSettings.columns.length === i) {
            this.parent.sortSettings.columns.push({ field: colName, direction: 'Ascending', isFromGroup: true });
        }
        else if (!this.parent.allowSorting) {
            this.parent.sortSettings.columns[parseInt(i.toString(), 10)].direction = 'Ascending';
        }
    };
    Group.prototype.createElement = function (field) {
        var gObj = this.parent;
        var direction = 'Ascending';
        var animator = this.parent.createElement('div', { className: 'e-grid-icon e-group-animator' });
        var groupedColumn = this.parent.createElement('div', { className: 'e-grid-icon e-groupheadercell' });
        var childDiv = this.parent.createElement('div', { attrs: { 'ej-mappingname': field } });
        if (isComplexField(field)) {
            childDiv.setAttribute('ej-complexname', getComplexFieldID(field));
        }
        var column = this.parent.getColumnByField(field);
        //Todo headerTemplateID for grouped column, disableHtmlEncode
        var headerCell = gObj.getColumnHeaderByUid(column.uid);
        // if (!isNullOrUndefined(column.headerTemplate)) {
        //     if (column.headerTemplate.indexOf('#') !== -1) {
        //         childDiv.innerHTML = document.querySelector(column.headerTemplate).innerHTML.trim();
        //     } else {
        //         childDiv.innerHTML = column.headerTemplate;
        //     }
        //     childDiv.firstElementChild.classList.add('e-grouptext');
        // } else {
        if (this.groupSettings.allowReordering) {
            childDiv.appendChild(this.parent.createElement('span', {
                className: 'e-drag e-icons e-icon-drag', innerHTML: '&nbsp;',
                attrs: { title: 'Drag', tabindex: '-1', 'aria-label': this.l10n.getConstant('GroupedDrag') }
            }));
        }
        childDiv.appendChild(this.parent.createElement('span', {
            className: 'e-grouptext', innerHTML: column.headerText,
            attrs: { tabindex: '-1' }
        }));
        // }
        if (this.groupSettings.showToggleButton) {
            childDiv.appendChild(this.parent.createElement('span', {
                className: 'e-togglegroupbutton e-icons e-icon-ungroup e-toggleungroup', innerHTML: '&nbsp;',
                attrs: { tabindex: '-1', 'aria-label': this.l10n.getConstant('UnGroupAria') }
            }));
        }
        if (headerCell.querySelectorAll('.e-ascending,.e-descending').length) {
            direction = headerCell.querySelector('.e-ascending') ? 'Ascending' : 'Descending';
        }
        childDiv.appendChild(this.parent.createElement('span', {
            className: 'e-groupsort e-icons ' +
                ('e-' + direction.toLowerCase() + ' e-icon-' + direction.toLowerCase()), innerHTML: '&nbsp;',
            attrs: { tabindex: '-1', 'aria-label': this.l10n.getConstant('GroupedSortIcon') + column.headerText, role: 'button' }
        }));
        var ungroupButton = this.parent.createElement('span', {
            className: 'e-ungroupbutton e-icons e-icon-hide', innerHTML: '&nbsp;',
            attrs: { title: this.l10n.getConstant('UnGroup'),
                tabindex: '-1', 'aria-label': this.l10n.getConstant('UnGroupIcon') + column.headerText, role: 'button' }
        });
        updateCSSText(ungroupButton, this.groupSettings.showUngroupButton ? '' : 'display: none;');
        childDiv.appendChild(ungroupButton);
        groupedColumn.appendChild(childDiv);
        if (this.groupSettings.allowReordering) {
            animator.appendChild(groupedColumn);
            animator.appendChild(this.createSeparator());
            groupedColumn = animator;
        }
        return groupedColumn;
    };
    Group.prototype.addColToGroupDrop = function (field) {
        var groupElem = isComplexField(field) ? this.parent.element.querySelector('.e-groupdroparea div[ej-complexname=' +
            getParsedFieldID(getComplexFieldID(field)) + ']') : this.parent.element.querySelector('.e-groupdroparea div[ej-mappingname=' + getParsedFieldID(field) + ']');
        if (this.groupSettings.allowReordering && groupElem) {
            return;
        }
        var column = this.parent.getColumnByField(field);
        if (isNullOrUndefined(column)) {
            return;
        }
        var groupedColumn = this.createElement(field);
        if (this.groupSettings.allowReordering) {
            var index = this.element.getElementsByClassName('e-group-animator').length;
            groupedColumn.setAttribute('index', index.toString());
        }
        this.element.appendChild(groupedColumn);
        var focusModule = this.parent.focusModule;
        focusModule.setActive(true);
        var firstContentCellIndex = [0, 0];
        if (focusModule.active.matrix.matrix[firstContentCellIndex[0]][firstContentCellIndex[1]] === 0) {
            firstContentCellIndex = findCellIndex(focusModule.active.matrix.matrix, firstContentCellIndex, true);
        }
        focusModule.active.matrix.current = firstContentCellIndex;
        if (this.parent.editSettings.showAddNewRow) {
            this.parent.notify(events.showAddNewRowFocus, {});
        }
        else if (this.parent.isInitialLoad && !this.preventFocusOnGroup) {
            focusModule.focus();
        }
        //Todo:  rtl
    };
    Group.prototype.createSeparator = function () {
        var separator = this.parent.createElement('span', {
            className: 'e-nextgroup e-icons e-icon-next', innerHTML: '&nbsp;',
            attrs: { tabindex: '-1', 'aria-label': this.l10n.getConstant('GroupSeperator') }
        });
        updateCSSText(separator, this.groupSettings.showUngroupButton ? '' : 'display: none;');
        return separator;
    };
    Group.prototype.refreshToggleBtn = function (isRemove) {
        if (this.groupSettings.showToggleButton) {
            var headers = [].slice.call(this.parent.getHeaderTable().getElementsByClassName('e-headercelldiv'));
            for (var i = 0, len = headers.length; i < len; i++) {
                if (!((headers[parseInt(i.toString(), 10)].classList.contains('e-emptycell')) || (headers[parseInt(i.toString(), 10)].classList.contains('e-headerchkcelldiv')))) {
                    var column = this.parent.getColumnByUid(headers[parseInt(i.toString(), 10)].getAttribute('e-mappinguid'));
                    if (!this.parent.showColumnMenu || (this.parent.showColumnMenu && !column.showColumnMenu)) {
                        if (headers[parseInt(i.toString(), 10)].getElementsByClassName('e-grptogglebtn').length) {
                            remove(headers[parseInt(i.toString(), 10)].querySelectorAll('.e-grptogglebtn')[0]);
                        }
                        if (!isRemove) {
                            headers[parseInt(i.toString(), 10)].appendChild(this.parent.createElement('span', {
                                className: 'e-grptogglebtn e-icons ' + (this.groupSettings.columns.indexOf(column.field) > -1 ?
                                    'e-toggleungroup e-icon-ungroup' : 'e-togglegroup e-icon-group'), attrs: { tabindex: '-1',
                                    'aria-label': isNullOrUndefined(this.l10n) ? this.parent.localeObj.getConstant('GroupButton')
                                        : this.l10n.getConstant('GroupButton') }
                            }));
                        }
                    }
                }
            }
        }
    };
    Group.prototype.removeColFromGroupDrop = function (field) {
        if (!isNullOrUndefined(this.getGHeaderCell(field))) {
            var elem = this.getGHeaderCell(field);
            if (this.groupSettings.allowReordering) {
                var parent_1 = parentsUntil(elem, 'e-group-animator');
                remove(parent_1);
            }
            else {
                remove(elem);
            }
            this.updateGroupDropArea();
            if (this.parent.editSettings.showAddNewRow) {
                this.parent.notify(events.showAddNewRowFocus, {});
            }
        }
        this.isAppliedUnGroup = false;
    };
    Group.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'columns':
                    // eslint-disable-next-line no-case-declarations
                    var args = void 0;
                    if (this.contentRefresh) {
                        if (!this.isAppliedUnGroup) {
                            if (!this.isAppliedGroup) {
                                this.updateGroupDropArea(true);
                                for (var j = 0; j < this.parent.sortSettings.columns.length; j++) {
                                    if (this.parent.sortSettings.columns[parseInt(j.toString(), 10)].isFromGroup) {
                                        this.parent.sortSettings.columns.splice(j, 1);
                                        j--;
                                    }
                                }
                                for (var i = 0; i < this.groupSettings.columns.length; i++) {
                                    this.colName = this.groupSettings.columns[parseInt(i.toString(), 10)];
                                    var col = this.parent.getColumnByField(this.colName);
                                    col.visible = this.parent.groupSettings.showGroupedColumn;
                                    this.groupAddSortingQuery(this.colName);
                                    if (i < this.groupSettings.columns.length - 1) {
                                        this.addColToGroupDrop(this.groupSettings.columns[parseInt(i.toString(), 10)]);
                                    }
                                }
                            }
                            args = {
                                columnName: this.colName, requestType: e.properties["" + prop].length ? 'grouping' : 'ungrouping',
                                type: events.actionBegin, preventFocusOnGroup: false
                            };
                        }
                        else {
                            args = { columnName: this.colName, requestType: 'ungrouping', type: events.actionBegin };
                        }
                        if (!this.groupSettings.showGroupedColumn) {
                            var columns = e.oldProperties["" + prop];
                            for (var i = 0; i < columns.length; i++) {
                                if (e.properties["" + prop].indexOf(columns[parseInt(i.toString(), 10)]) === -1) {
                                    this.parent.getColumnByField(columns[parseInt(i.toString(), 10)]).visible = true;
                                }
                            }
                        }
                        this.parent.notify(events.modelChanged, args);
                    }
                    break;
                case 'showDropArea':
                    this.updateGroupDropArea();
                    if (this.groupSettings.showDropArea) {
                        this.element.style.display = '';
                        this.parent.headerModule.refreshUI();
                    }
                    else {
                        this.element.style.display = 'none';
                    }
                    if (this.parent.height === '100%') {
                        this.parent.scrollModule.refresh();
                    }
                    break;
                case 'showGroupedColumn':
                    this.updateGroupedColumn(this.groupSettings.showGroupedColumn);
                    this.parent.notify(events.modelChanged, { requestType: 'refresh' });
                    break;
                case 'showUngroupButton':
                    this.updateButtonVisibility(this.groupSettings.showUngroupButton, 'e-ungroupbutton');
                    break;
                case 'showToggleButton':
                    this.updateButtonVisibility(this.groupSettings.showToggleButton, 'e-togglegroupbutton ');
                    this.parent.refreshHeader();
                    break;
                case 'enableLazyLoading':
                    this.parent.freezeRefresh();
                    break;
            }
        }
    };
    Group.prototype.updateGroupedColumn = function (isVisible) {
        for (var i = 0; i < this.groupSettings.columns.length; i++) {
            this.parent.getColumnByField(this.groupSettings.columns[parseInt(i.toString(), 10)]).visible = isVisible;
        }
    };
    Group.prototype.updateButtonVisibility = function (isVisible, className) {
        var gHeader = [].slice.call(this.element.getElementsByClassName(className));
        for (var i = 0; i < gHeader.length; i++) {
            gHeader[parseInt(i.toString(), 10)].style.display = isVisible ? '' : 'none';
        }
    };
    Group.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
        }
    };
    /**
     * To destroy the reorder
     *
     * @returns {void}
     * @hidden
     */
    Group.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement || (!gridElement.querySelector('.' + literals.gridHeader) && !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((this.parent.isDestroyed || !this.parent.allowGrouping) && !this.parent.refreshing) {
            this.clearGrouping();
        }
        this.unWireEvent();
        this.removeEventListener();
        this.refreshToggleBtn(true);
        if (this.element.parentNode) {
            remove(this.element);
        }
        //call ejdrag and drop destroy
    };
    /**
     * Clears all the grouped columns of the Grid.
     *
     * @returns {void}
     */
    Group.prototype.clearGrouping = function () {
        var cols = JSON.parse(JSON.stringify(this.groupSettings.columns));
        this.contentRefresh = false;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (i === (len - 1)) {
                this.contentRefresh = true;
            }
            this.ungroupColumn(cols[parseInt(i.toString(), 10)]);
        }
        this.contentRefresh = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Group.prototype.getModuleName = function () {
        return 'group';
    };
    Group.prototype.refreshSortIcons = function () {
        var gObj = this.parent;
        var header;
        var cols = gObj.sortSettings.columns;
        var fieldNames = this.parent.getColumns().map(function (c) { return c.field; });
        this.refreshToggleBtn();
        for (var i = 0, len = cols.length; i < len; i++) {
            if (fieldNames.indexOf(cols[parseInt(i.toString(), 10)].field) === -1) {
                continue;
            }
            header = gObj.getColumnHeaderByField(cols[parseInt(i.toString(), 10)].field);
            if (!gObj.allowSorting && (this.sortedColumns.indexOf(cols[parseInt(i.toString(), 10)].field) > -1 ||
                this.groupSettings.columns.indexOf(cols[parseInt(i.toString(), 10)].field) > -1)) {
                classList(header.querySelector('.e-sortfilterdiv'), ['e-ascending', 'e-icon-ascending'], []);
                if (cols.length > 1) {
                    header.querySelector('.e-headercelldiv').appendChild(this.parent.createElement('span', { className: 'e-sortnumber', innerHTML: (i + 1).toString() }));
                }
            }
            else if (this.getGHeaderCell(cols[parseInt(i.toString(), 10)].field) && this.getGHeaderCell(cols[parseInt(i.toString(), 10)].field).getElementsByClassName('e-groupsort').length) {
                if (cols[parseInt(i.toString(), 10)].direction === 'Ascending') {
                    classList(this.getGHeaderCell(cols[parseInt(i.toString(), 10)].field).querySelector('.e-groupsort'), ['e-ascending', 'e-icon-ascending'], ['e-descending', 'e-icon-descending']);
                }
                else {
                    classList(this.getGHeaderCell(cols[parseInt(i.toString(), 10)].field).querySelector('.e-groupsort'), ['e-descending', 'e-icon-descending'], ['e-ascending', 'e-icon-ascending']);
                }
            }
        }
    };
    Group.prototype.getGHeaderCell = function (field) {
        if (this.element && this.element.querySelector('[ej-mappingname="' + field + '"]')) {
            return this.element.querySelector('[ej-mappingname="' + field + '"]').parentElement;
        }
        return null;
    };
    Group.prototype.onGroupAggregates = function (editedData) {
        if (this.parent.groupSettings.enableLazyLoading) {
            if (this.parent.editSettings.mode !== 'Batch') {
                this.updateLazyLoadGroupAggregates(editedData);
            }
            return;
        }
        var aggregates = this.iterateGroupAggregates(editedData);
        var rowData = this.groupGenerator.generateRows(aggregates, {});
        var summaryRows = this.parent.getRowsObject().filter(function (row) { return !row.isDataRow; });
        var updateSummaryRows = rowData.filter(function (data) { return !data.isDataRow; });
        if (this.parent.isReact || this.parent.isVue) {
            this.parent.destroyTemplate(['groupFooterTemplate', 'groupCaptionTemplate', 'footerTemplate']);
        }
        for (var i = 0; i < updateSummaryRows.length; i++) {
            var row = updateSummaryRows[parseInt(i.toString(), 10)];
            var cells = row.cells.filter(function (cell) { return cell.isDataCell; });
            var args = { cells: cells, data: row.data, dataUid: summaryRows[parseInt(i.toString(), 10)] ? summaryRows[parseInt(i.toString(), 10)].uid : '' };
            this.parent.notify(events.refreshAggregateCell, args);
        }
    };
    Group.prototype.updateLazyLoadGroupAggregates = function (data, remoteResult) {
        var _this = this;
        var groupCaptionTemplates = this.getGroupAggregateTemplates(true);
        var groupFooterTemplates = this.getGroupAggregateTemplates(false);
        if (!groupCaptionTemplates.length && !groupFooterTemplates.length) {
            return;
        }
        var gObj = this.parent;
        var isRemote = gObj.getDataModule().isRemote();
        var updatedData = data[0];
        var editedRow = data.row;
        var groupedCols = gObj.groupSettings.columns;
        var groupLazyLoadRenderer = gObj.contentModule;
        var groupCache = groupLazyLoadRenderer.getGroupCache();
        var currentPageGroupCache = groupCache[gObj.pageSettings.currentPage];
        var result = remoteResult ? remoteResult : [];
        var _loop_1 = function (i) {
            var groupField = groupedCols[parseInt(i.toString(), 10)];
            var groupKey = updatedData["" + groupField];
            var groupCaptionRowObject = this_1.getGroupCaptionRowObject(editedRow, groupedCols.length - i);
            if (isRemote && result.length) {
                if (i !== 0) {
                    var prevGroupField = groupedCols[i - 1];
                    var prevGroupKey_1 = updatedData["" + prevGroupField];
                    result = result.find(function (data) {
                        return data.key === prevGroupKey_1;
                    }).items;
                }
                this_1.updateLazyLoadGroupAggregatesRow(result, groupKey, groupCaptionRowObject, currentPageGroupCache, groupCaptionTemplates, groupFooterTemplates);
            }
            else {
                var query = gObj.renderModule.data.generateQuery();
                if (i !== 0) {
                    var currentLevelCaptionRowObjects = currentPageGroupCache.filter(function (data) {
                        return data.isCaptionRow && data.parentUid === groupCaptionRowObject.parentUid;
                    });
                    var index = currentLevelCaptionRowObjects.indexOf(groupCaptionRowObject);
                    var fields = gObj.groupSettings.columns.slice(0, i).reverse();
                    var keys = fields.map(function (data) {
                        return updatedData["" + data];
                    });
                    var pred = generateExpandPredicates(fields, keys, groupLazyLoadRenderer);
                    var predicateList = getPredicates(pred);
                    var lazyLoad = { level: i, skip: index, take: 1, where: predicateList };
                    query.lazyLoad.push({ key: 'onDemandGroupInfo', value: lazyLoad });
                }
                gObj.renderModule.data.getData({}, query).then(function (e) {
                    if (isRemote) {
                        _this.updateLazyLoadGroupAggregates(data, e.result);
                    }
                    else {
                        _this.updateLazyLoadGroupAggregatesRow(e.result, groupKey, groupCaptionRowObject, currentPageGroupCache, groupCaptionTemplates, groupFooterTemplates);
                    }
                    if (i === groupedCols.length - 1 || isRemote) {
                        _this.destroyRefreshGroupCaptionFooterTemplate();
                    }
                }).catch(function (e) { return gObj.renderModule.dataManagerFailure(e, { requestType: 'grouping' }); });
                if (isRemote) {
                    return "break";
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < groupedCols.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
    };
    Group.prototype.destroyRefreshGroupCaptionFooterTemplate = function () {
        var gObj = this.parent;
        if (gObj.isAngular || gObj.isReact || gObj.isVue) {
            gObj.destroyTemplate(['groupCaptionTemplate', 'groupFooterTemplate']);
        }
        gObj.refreshGroupCaptionFooterTemplate();
        gObj.removeMaskRow();
        gObj.hideSpinner();
    };
    Group.prototype.updateLazyLoadGroupAggregatesRow = function (result, groupKey, groupCaptionRowObject, currentPageGroupCache, groupCaptionTemplates, groupFooterTemplates) {
        var updatedGroupCaptionData = result.find(function (data) {
            return data.key === groupKey;
        });
        if (groupCaptionTemplates.length) {
            this.updateLazyLoadGroupAggregatesCell(updatedGroupCaptionData, groupCaptionRowObject, groupCaptionTemplates);
        }
        if (groupFooterTemplates.length) {
            var groupFooterRowObject = currentPageGroupCache.find(function (data) {
                return data.isAggregateRow && data.parentUid === groupCaptionRowObject.uid;
            });
            this.updateLazyLoadGroupAggregatesCell(updatedGroupCaptionData, groupFooterRowObject, groupFooterTemplates);
        }
    };
    Group.prototype.updateLazyLoadGroupAggregatesCell = function (updatedGroupCaptionData, captionFooterRowObject, captionFooterTemplates) {
        var prevCaptionFooterData = captionFooterRowObject.data;
        var updatedGroupCaptionDataAggregates = updatedGroupCaptionData.aggregates;
        if (captionFooterRowObject.isCaptionRow) {
            prevCaptionFooterData.aggregates = updatedGroupCaptionDataAggregates;
        }
        for (var i = 0; i < captionFooterTemplates.length; i++) {
            var template = captionFooterTemplates[parseInt(i.toString(), 10)];
            var key = template.field + ' - ' + template.type;
            var fieldData = prevCaptionFooterData[template.field];
            fieldData["" + key] = updatedGroupCaptionDataAggregates["" + key];
            fieldData[capitalizeFirstLetter(template.type)] = updatedGroupCaptionDataAggregates["" + key];
            if (fieldData[template.type]) {
                fieldData[template.type] = updatedGroupCaptionDataAggregates["" + key];
            }
        }
    };
    Group.prototype.getGroupCaptionRowObject = function (element, groupCaptionIndex) {
        var gObj = this.parent;
        var uid = element.getAttribute('data-uid');
        var parentCaptionRowObject = gObj.getRowObjectFromUID(uid);
        for (var i = 0; i < groupCaptionIndex; i++) {
            parentCaptionRowObject = gObj.getRowObjectFromUID(parentCaptionRowObject.parentUid);
        }
        return parentCaptionRowObject;
    };
    /**
     * @param { boolean } groupCaptionTemplate - Defines template either group caption or footer
     * @returns { Object[] } - Returns template array
     * @hidden
     */
    Group.prototype.getGroupAggregateTemplates = function (groupCaptionTemplate) {
        var aggregates = [];
        var aggregateRows = this.parent.aggregates;
        for (var j = 0; j < aggregateRows.length; j++) {
            var row = aggregateRows[parseInt(j.toString(), 10)];
            for (var k = 0; k < row.columns.length; k++) {
                if ((groupCaptionTemplate && row.columns[parseInt(k.toString(), 10)].groupCaptionTemplate)
                    || (!groupCaptionTemplate && row.columns[parseInt(k.toString(), 10)].groupFooterTemplate)) {
                    var aggr = {};
                    var type = row.columns[parseInt(k.toString(), 10)].type.toString();
                    aggr = { type: type.toLowerCase(), field: row.columns[parseInt(k.toString(), 10)].field };
                    aggregates.push(aggr);
                }
            }
        }
        return aggregates;
    };
    /**
     * @param { Row<Column> } fromRowObj - Defines group key changed Data row object.
     * @param { Row<Column> } toRowObj - Defines group key setting reference Data row object.
     * @returns { void }
     * @hidden
     */
    Group.prototype.groupedRowReorder = function (fromRowObj, toRowObj) {
        var dragRow = this.parent.getRowElementByUID(fromRowObj.uid);
        var dropRow = this.parent.getRowElementByUID(toRowObj.uid);
        var dropArgs = {
            rows: [dragRow], target: dropRow, fromIndex: fromRowObj.index, dropIndex: toRowObj.index
        };
        if (!isNullOrUndefined(fromRowObj) && !isNullOrUndefined(toRowObj) &&
            fromRowObj.parentUid !== toRowObj.parentUid) {
            if (dropRow) {
                if (dropRow['style'].display === 'none') {
                    dragRow['style'].display = 'none';
                }
                if (dropArgs.fromIndex > dropArgs.dropIndex) {
                    this.parent.getContentTable().querySelector(literals.tbody).insertBefore(dragRow, dropRow);
                }
                else {
                    this.parent.getContentTable().querySelector(literals.tbody).insertBefore(dragRow, dropRow.nextSibling);
                }
            }
            else {
                remove(dragRow);
            }
            this.groupReorderHandler(fromRowObj, toRowObj);
            var tr = [].slice.call(this.parent.getContentTable().getElementsByClassName(literals.row));
            groupReorderRowObject(this.parent, dropArgs, tr, toRowObj);
            if (this.parent.enableVirtualization) {
                resetCachedRowIndex(this.parent);
            }
            else {
                resetRowIndex(this.parent, this.parent.getRowsObject().filter(function (data) { return data.isDataRow; }), tr);
            }
            this.parent.notify(events.refreshExpandandCollapse, { rows: this.parent.getRowsObject() });
        }
    };
    Group.prototype.groupReorderHandler = function (dragRowObject, dropRowObject) {
        var gObj = this.parent;
        var dragRowObjectData = dragRowObject.data;
        var dropRowObjectData = dropRowObject.data;
        var groupAggregateTemplate = gObj['groupModule'].getGroupAggregateTemplates(false);
        var dropParentRowObject = gObj.getRowObjectFromUID(dropRowObject.parentUid);
        var dragParentRowObject = gObj.getRowObjectFromUID(dragRowObject.parentUid);
        var dropRootParentRowObjects = [dropParentRowObject];
        var dragRootParentRowObjects = [dragParentRowObject];
        var groupColumns = gObj.groupSettings.columns;
        for (var j = 0; j < groupColumns.length; j++) {
            dragRowObjectData[groupColumns[parseInt(j.toString(), 10)]] = dropRowObjectData[groupColumns[parseInt(j.toString(), 10)]];
            if (j > 0) {
                dropRootParentRowObjects.push(gObj.getRowObjectFromUID(dropRootParentRowObjects[j - 1].parentUid));
                dragRootParentRowObjects.push(gObj.getRowObjectFromUID(dragRootParentRowObjects[j - 1].parentUid));
            }
        }
        dragRowObject.parentUid = dropRowObject.parentUid;
        dragRowObject.visible = dropRowObject.visible;
        dragRowObject['parentGid'] = dropRowObject['parentGid'];
        if (dragRowObject.changes !== dragRowObjectData) {
            dragRowObject.changes = dragRowObjectData;
        }
        var updatedCurrentViewData = this.iterateGroupAggregates([{ dragRowObjects: dragRootParentRowObjects,
                dropRowObjects: dropRootParentRowObjects }]);
        var updatedDragCurrentViewData = updatedCurrentViewData.filter(function (object) {
            return (object['key'] === dragRootParentRowObjects[dragRootParentRowObjects.length - 1].data['key'] ||
                (object['key'] instanceof Date && object['key'].toString() ===
                    dragRootParentRowObjects[dragRootParentRowObjects.length - 1].data['key'].toString()));
        });
        var updatedDropCurrentViewData = updatedCurrentViewData.filter(function (object) {
            return (object['key'] === dropRootParentRowObjects[dropRootParentRowObjects.length - 1].data['key'] ||
                (object['key'] instanceof Date && object['key'].toString() ===
                    dropRootParentRowObjects[dropRootParentRowObjects.length - 1].data['key'].toString()));
        });
        updatedCurrentViewData = [];
        if (!isNullOrUndefined(updatedDragCurrentViewData[0])) {
            updatedCurrentViewData.push(updatedDragCurrentViewData[0]);
        }
        if (!isNullOrUndefined(updatedDropCurrentViewData[0])) {
            updatedCurrentViewData.push(updatedDropCurrentViewData[0]);
        }
        var currentViewData = gObj.currentViewData;
        for (var i = 0; i < currentViewData.length; i++) {
            if (isNullOrUndefined(updatedDragCurrentViewData[0]) &&
                currentViewData[parseInt(i.toString(), 10)]['key'] ===
                    dragRootParentRowObjects[dragRootParentRowObjects.length - 1].data['key']) {
                currentViewData.splice(i, 1);
                i--;
            }
            else if (isNullOrUndefined(updatedDropCurrentViewData[0]) &&
                currentViewData[parseInt(i.toString(), 10)]['key'] ===
                    dropRootParentRowObjects[dropRootParentRowObjects.length - 1].data['key']) {
                currentViewData.splice(i, 1);
                i--;
            }
            else if (!isNullOrUndefined(updatedDragCurrentViewData[0]) &&
                currentViewData[parseInt(i.toString(), 10)]['key'] === updatedDragCurrentViewData[0]['key']) {
                currentViewData[parseInt(i.toString(), 10)] = updatedDragCurrentViewData[0];
            }
            else if (!isNullOrUndefined(updatedDropCurrentViewData[0]) &&
                currentViewData[parseInt(i.toString(), 10)]['key'] === updatedDropCurrentViewData[0]['key']) {
                currentViewData[parseInt(i.toString(), 10)] = updatedDropCurrentViewData[0];
            }
        }
        var updatedRowObject = this.groupGenerator.generateRows(updatedCurrentViewData, {});
        var dragRootParentAggregateRowObject = [];
        var dropRootParentAggregateRowObject = [];
        for (var i = 0; i < dragRootParentRowObjects.length; i++) {
            dragRootParentAggregateRowObject
                .push.apply(dragRootParentAggregateRowObject, this.getGroupParentFooterAggregateRowObject(dragRootParentRowObjects[parseInt(i.toString(), 10)].uid));
        }
        for (var i = 0; i < dropRootParentRowObjects.length; i++) {
            dropRootParentAggregateRowObject
                .push.apply(dropRootParentAggregateRowObject, this.getGroupParentFooterAggregateRowObject(dropRootParentRowObjects[parseInt(i.toString(), 10)].uid));
        }
        dragRootParentRowObjects.push.apply(dragRootParentRowObjects, dragRootParentAggregateRowObject);
        dropRootParentRowObjects.push.apply(dropRootParentRowObjects, dropRootParentAggregateRowObject);
        this.updatedRowObjChange(dragRootParentRowObjects, updatedRowObject, groupAggregateTemplate, true);
        this.updatedRowObjChange(dropRootParentRowObjects, updatedRowObject, groupAggregateTemplate);
        this.groupReorderRefreshHandler(dragRootParentRowObjects);
        this.groupReorderRefreshHandler(dropRootParentRowObjects);
    };
    Group.prototype.updatedRowObjChange = function (rootParentRowObjects, updatedRowObjects, groupAggregateTemplate, isDraggedRow) {
        var gObj = this.parent;
        var rowObjects = gObj.getRowsObject();
        var cache = {};
        var virtualCacheRowObjects = [];
        if (gObj.enableVirtualization) {
            cache = gObj.contentModule['vgenerator'].cache;
            virtualCacheRowObjects = gObj.vcRows;
        }
        for (var i = 0; i < rootParentRowObjects.length; i++) {
            var keyPresent = false;
            var parentRowObject = rootParentRowObjects[parseInt(i.toString(), 10)];
            for (var j = 0; j < updatedRowObjects.length; j++) {
                var updatedRowObject = updatedRowObjects[parseInt(j.toString(), 10)];
                if (!isNullOrUndefined(updatedRowObject) && !isNullOrUndefined(parentRowObject.data['key']) &&
                    !isNullOrUndefined(updatedRowObject.data['key']) && ((parentRowObject.data['key'] ===
                    updatedRowObject.data['key'] || (parentRowObject.data['key'] instanceof Date &&
                    parentRowObject.data['key'].toString() === updatedRowObject.data['key'].toString())))) {
                    var isParentKeyPresent = true;
                    var nextParentObject = rootParentRowObjects[parseInt((i + 1).toString(), 10)];
                    if (isDraggedRow && nextParentObject && !nextParentObject.isAggregateRow) {
                        var key = nextParentObject.data['key'].toString();
                        var field = nextParentObject.data['field'];
                        var groupedData = updatedRowObject.data['items'].records ?
                            updatedRowObject.data['items'].records : updatedRowObject.data['items'];
                        if (groupedData && groupedData.length && groupedData[0]["" + field] &&
                            groupedData[0]["" + field].toString() !== key) {
                            isParentKeyPresent = false;
                        }
                    }
                    if (!isParentKeyPresent && isDraggedRow) {
                        continue;
                    }
                    var index = rowObjects.indexOf(parentRowObject);
                    if (index !== -1) {
                        rowObjects[parseInt(index.toString(), 10)].data = updatedRowObject.data;
                        rowObjects[parseInt(index.toString(), 10)]['gSummary'] = updatedRowObject['gSummary'];
                    }
                    if (gObj.enableVirtualization) {
                        var vIndex = virtualCacheRowObjects.indexOf(parentRowObject);
                        if (vIndex !== -1) {
                            virtualCacheRowObjects[parseInt(vIndex.toString(), 10)].data = updatedRowObject.data;
                            virtualCacheRowObjects[parseInt(vIndex.toString(), 10)]['gSummary'] = updatedRowObject['gSummary'];
                        }
                    }
                    parentRowObject.data = updatedRowObject.data;
                    parentRowObject['gSummary'] = ['gSummary'];
                    updatedRowObjects.splice(j, 1);
                    j--;
                    keyPresent = true;
                    break;
                }
                else if (parentRowObject.isAggregateRow &&
                    updatedRowObject.isAggregateRow) {
                    for (var l = 0; l < groupAggregateTemplate.length; l++) {
                        if (this.evaluateGroupAggregateValueChange(parentRowObject, updatedRowObject, groupAggregateTemplate[parseInt(l.toString(), 10)])) {
                            var index = rowObjects.indexOf(parentRowObject);
                            if (index !== -1) {
                                rowObjects[parseInt(index.toString(), 10)].data = updatedRowObject.data;
                                rowObjects[parseInt(index.toString(), 10)]['gSummary'] = updatedRowObject['gSummary'];
                            }
                            if (gObj.enableVirtualization) {
                                var vIndex = virtualCacheRowObjects.indexOf(parentRowObject);
                                if (vIndex !== -1) {
                                    virtualCacheRowObjects[parseInt(vIndex.toString(), 10)].data = updatedRowObject.data;
                                    virtualCacheRowObjects[parseInt(vIndex.toString(), 10)]['gSummary'] = updatedRowObject['gSummary'];
                                }
                            }
                            parentRowObject.data = updatedRowObject.data;
                            parentRowObject['gSummary'] = updatedRowObject['gSummary'];
                            keyPresent = true;
                            break;
                        }
                    }
                    if (keyPresent) {
                        break;
                    }
                }
            }
            if (!keyPresent) {
                var removeElem = gObj.getRowElementByUID(parentRowObject.uid);
                if (!isNullOrUndefined(removeElem)) {
                    remove(removeElem);
                }
                rowObjects.splice(rowObjects.indexOf(parentRowObject), 1);
                if (gObj.enableVirtualization) {
                    virtualCacheRowObjects.splice(virtualCacheRowObjects.indexOf(parentRowObject), 1);
                    for (var k = 1; k <= Object.keys(cache).length; k++) {
                        var vcIndex = cache[parseInt(k.toString(), 10)].indexOf(parentRowObject);
                        if (vcIndex !== -1) {
                            cache[parseInt(k.toString(), 10)].splice([parseInt(vcIndex.toString(), 10)], 1);
                        }
                    }
                }
                if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache) {
                    gObj.infiniteScrollModule.resetInfiniteCache(rowObjects);
                }
            }
        }
    };
    Group.prototype.groupReorderRefreshHandler = function (parentRowObjects) {
        var gObj = this.parent;
        var row = new RowRenderer(gObj['serviceLocator'], null, gObj);
        var columns = gObj.getColumns();
        for (var j = 0; j < parentRowObjects.length; j++) {
            var rowObject = parentRowObjects[parseInt(j.toString(), 10)];
            if (!isNullOrUndefined(rowObject.uid) &&
                !isNullOrUndefined(gObj.getRowElementByUID(rowObject.uid))) {
                row.refresh(rowObject, columns, false);
            }
        }
    };
    Group.prototype.getGroupParentFooterAggregateRowObject = function (parentUid) {
        var rowObjects = this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache &&
            this.parent.groupSettings.columns.length ? this.parent.contentModule['rows'] : this.parent.getRowsObject();
        var parentFooterAggregates = [];
        for (var i = 0; i < rowObjects.length; i++) {
            var rowObject = rowObjects[parseInt(i.toString(), 10)];
            if (rowObject.parentUid === parentUid && rowObject.isAggregateRow) {
                parentFooterAggregates.push(rowObject);
            }
        }
        return parentFooterAggregates;
    };
    Group.prototype.evaluateGroupAggregateValueChange = function (rowObjects, updatedRowObject, groupAggregateTemplate) {
        var change = false;
        if (rowObjects.data[groupAggregateTemplate['field']]['field'] === updatedRowObject.data[groupAggregateTemplate['field']]['field']
            && rowObjects.data[groupAggregateTemplate['field']]['key'] === updatedRowObject.data[groupAggregateTemplate['field']]['key'] &&
            rowObjects.data[groupAggregateTemplate['field']]
                // eslint-disable-next-line no-prototype-builtins
                .hasOwnProperty(groupAggregateTemplate['field'] + ' - ' + groupAggregateTemplate['type']) &&
            updatedRowObject.data[groupAggregateTemplate['field']]
                // eslint-disable-next-line no-prototype-builtins
                .hasOwnProperty(groupAggregateTemplate['field'] + ' - ' + groupAggregateTemplate['type'])) {
            change = true;
        }
        return change;
    };
    Group.prototype.gettingVirtualData = function (parentRowObjs, curViewRec, pK) {
        var datas = [];
        var _loop_2 = function (i) {
            if (curViewRec.indexOf(parentRowObjs[parseInt(i.toString(), 10)].data) === -1) {
                datas.push(parentRowObjs[parseInt(i.toString(), 10)].data);
            }
            if (parentRowObjs[parseInt(i.toString(), 10)].data['field'] === this_2.parent.groupSettings.columns[0]) {
                var draggedData_1 = parentRowObjs[parseInt(i.toString(), 10)].data['items'];
                if (!isNullOrUndefined(draggedData_1['records'])) {
                    draggedData_1 = draggedData_1['records'];
                }
                var _loop_3 = function (j) {
                    if (pK && curViewRec.findIndex(function (data) { return data[pK.toString()] ===
                        draggedData_1[parseInt(j.toString(), 10)][pK.toString()]; }) === -1) {
                        datas.push(draggedData_1[parseInt(j.toString(), 10)]);
                    }
                };
                for (var j = 0; j < draggedData_1.length; j++) {
                    _loop_3(j);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < parentRowObjs.length; i++) {
            _loop_2(i);
        }
        return datas;
    };
    Group.prototype.iterateGroupAggregates = function (editedData) {
        var _this = this;
        var updatedData = editedData instanceof Array ? editedData : [];
        var rows = this.parent.getRowsObject();
        var initData = this.parent.getCurrentViewRecords().slice();
        var field = this.parent.getPrimaryKeyFieldNames()[0];
        var dragParentRowObjects = editedData && editedData.length ?
            editedData[0] && editedData[0]['dragRowObjects'] : null;
        var dropParentRowObjects = editedData && editedData.length ?
            editedData[0] && editedData[0]['dropRowObjects'] : null;
        var dropRootKey = null;
        var dragRootKey = null;
        if (this.parent.enableVirtualization && this.parent.allowGrouping && this.parent.groupSettings.columns.length &&
            (!isNullOrUndefined(dragParentRowObjects) || !isNullOrUndefined(dropParentRowObjects))) {
            if (dragParentRowObjects) {
                initData.push.apply(initData, this.gettingVirtualData(dragParentRowObjects, initData, field));
            }
            if (dropParentRowObjects) {
                initData.push.apply(initData, this.gettingVirtualData(dropParentRowObjects, initData, field));
            }
        }
        var isInfiniteGroup = this.parent.enableInfiniteScrolling && this.parent.allowGrouping && editedData.length &&
            this.parent.groupSettings.columns.length && !isNullOrUndefined(dragParentRowObjects) &&
            !isNullOrUndefined(dropParentRowObjects);
        if (isInfiniteGroup) {
            initData = [];
            dropRootKey = dropParentRowObjects[dropParentRowObjects.length - 1].data['key'];
            dragRootKey = dragParentRowObjects[dragParentRowObjects.length - 1].data['key'];
            this.parent.getRowsObject().map(function (row) {
                var groupKey = row.data[_this.parent.groupSettings.columns[0]];
                if (row.isDataRow &&
                    ((groupKey === dropRootKey || groupKey === dragRootKey) || (groupKey instanceof Date &&
                        (groupKey.toString() === dropRootKey.toString() || groupKey.toString() === dragRootKey.toString())))) {
                    initData.push(row.data);
                }
            });
        }
        var deletedCols = [];
        var changeds = rows.map(function (row) {
            if (row.edit === 'delete') {
                deletedCols.push(row.data);
            }
            return row.changes instanceof Object ? row.changes : row.data;
        });
        changeds = updatedData.length === 0 ? changeds : updatedData;
        var mergeData = initData.map(function (item) {
            var pKeyVal = DataUtil.getObject(field, item);
            var value;
            var hasVal = changeds.some(function (cItem) {
                value = cItem;
                return pKeyVal === DataUtil.getObject(field, cItem);
            });
            return hasVal ? value : item;
        });
        var eData = editedData;
        if (!(eData.type && eData.type === 'cancel') && deletedCols.length > 0) {
            for (var i = 0; i < deletedCols.length; i++) {
                var index = mergeData.indexOf(deletedCols[parseInt(i.toString(), 10)]);
                mergeData.splice(index, 1);
            }
        }
        var aggregates = [];
        var aggregateRows = this.parent.aggregates;
        for (var j = 0; j < aggregateRows.length; j++) {
            var row = aggregateRows[parseInt(j.toString(), 10)];
            for (var k = 0; k < row.columns.length; k++) {
                var aggr = {};
                var type = row.columns[parseInt(k.toString(), 10)].type.toString();
                var types = type.split(',').map(function (t) { return t.trim(); });
                for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                    var aggregateType = types_1[_i];
                    aggr = { type: aggregateType.toLowerCase(), field: row.columns[parseInt(k.toString(), 10)].field };
                    aggregates.push(aggr);
                }
            }
        }
        var result;
        var aggrds;
        var groupedCols = this.parent.groupSettings.columns;
        for (var l = 0; l < groupedCols.length; l++) {
            aggrds = result ? result : mergeData;
            result = DataUtil.group(aggrds, groupedCols[parseInt(l.toString(), 10)], aggregates, null, null);
        }
        if (isInfiniteGroup) {
            var lastGroupKey = this.parent.currentViewData[this.parent.currentViewData.length - 1]['key'];
            if ((lastGroupKey instanceof Date && (lastGroupKey.toString() === dropRootKey.toString() ||
                lastGroupKey.toString() === dragRootKey.toString())) ||
                (lastGroupKey === dropRootKey || lastGroupKey === dragRootKey)) {
                var groups_1 = [];
                for (var i = 0; i < result.length; i++) {
                    groups_1.push(result[parseInt(i.toString(), 10)]);
                }
                var predicate_1 = [];
                var addWhere = function (input) {
                    for (var i = 0; i < groups_1.length; i++) {
                        predicate_1.push(new Predicate('field', '==', groups_1[parseInt(i.toString(), 10)].field).
                            and(_this.parent.renderModule.getPredicate('key', 'equal', groups_1[parseInt(i.toString(), 10)].key)));
                    }
                    input.where(Predicate.or(predicate_1));
                };
                var newQuery = this.parent.getDataModule().generateQuery(true);
                addWhere(newQuery);
                var updatedGroupData = this.parent.getDataModule().dataManager.executeLocal(newQuery);
                this.parent.renderModule.updateGroupInfo(result, updatedGroupData);
            }
        }
        return result;
    };
    Group.prototype.updateExpand = function (args) {
        var uid = args.uid;
        var isExpand = args.isExpand;
        var rows = this.parent.getRowsObject();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[parseInt(i.toString(), 10)];
            if (row.uid === uid || isNullOrUndefined(uid)) {
                row.isExpand = isExpand;
                var _loop_4 = function (j) {
                    var childRow = rows[parseInt(j.toString(), 10)];
                    var closestParent = void 0;
                    if (childRow.parentUid !== row.uid) {
                        closestParent = rows.filter(function (x) { return x.uid === childRow.parentUid; })[0];
                    }
                    if (childRow.parentUid === row.uid) {
                        childRow.visible = row.isExpand;
                    }
                    else if (!isNullOrUndefined(closestParent) && childRow.parentUid === closestParent.uid) {
                        if (closestParent.isExpand && closestParent.visible === true) {
                            childRow.visible = true;
                        }
                        else if (closestParent.isExpand && closestParent.visible === false) {
                            childRow.visible = false;
                        }
                    }
                    if (isNullOrUndefined(uid)) {
                        return "break";
                    }
                };
                for (var j = i + 1; j < rows.length; j++) {
                    var state_2 = _loop_4(j);
                    if (state_2 === "break")
                        break;
                }
            }
        }
        this.parent.notify(events.contentReady, { rows: rows, args: { isFrozen: false, rows: rows } });
    };
    return Group;
}());
export { Group };
