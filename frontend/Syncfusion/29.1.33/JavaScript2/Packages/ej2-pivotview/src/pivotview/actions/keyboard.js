import { KeyboardEvents, closest, addClass, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
/**
 * PivotView Keyboard interaction
 */
/** @hidden */
var KeyboardInteraction = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param {PivotView} parent - Instance of pivot table.
     */
    function KeyboardInteraction(parent) {
        this.keyConfigs = {
            tab: 'tab',
            shiftTab: 'shift+tab',
            enter: 'enter',
            shiftUp: 'shift+upArrow',
            shiftDown: 'shift+downArrow',
            shiftLeft: 'shift+leftArrow',
            shiftRight: 'shift+rightArrow',
            shiftEnter: 'shift+enter',
            ctrlEnter: 'ctrl+enter',
            upArrow: 'upArrow',
            downArrow: 'downArrow',
            leftArrow: 'leftArrow',
            rightArrow: 'rightArrow',
            escape: 'escape',
            ctrlShiftF: 'ctrl+shift+f'
        };
        this.parent = parent;
        this.event = undefined;
        this.parent.element.tabIndex = this.parent.element.tabIndex === -1 ? 0 : this.parent.element.tabIndex;
        this.pivotViewKeyboardModule = new KeyboardEvents(this.parent.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    KeyboardInteraction.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'tab':
                this.processTab(e);
                break;
            case 'shiftTab':
                this.processShiftTab(e);
                break;
            case 'enter':
            case 'shiftEnter':
            case 'ctrlEnter':
                this.processEnter(e);
                break;
            case 'shiftUp':
            case 'shiftDown':
            case 'shiftLeft':
            case 'shiftRight':
            case 'upArrow':
            case 'downArrow':
            case 'leftArrow':
            case 'rightArrow':
                this.processSelection(e);
                break;
            case 'escape':
                this.clearSelection();
                break;
            case 'ctrlShiftF':
                this.toggleFieldList(e);
                break;
        }
    };
    KeyboardInteraction.prototype.getNextButton = function (target) {
        var allPivotButtons = this.allpivotButtons(target);
        removeClass(allPivotButtons, 'e-btn-focused');
        if (this.parent.grid.element.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            var len = allPivotButtons.length;
            for (var i = 0; i < len; i++) {
                if (allPivotButtons[i].getAttribute('data-uid') === target.getAttribute('data-uid')) {
                    return (allPivotButtons[i + 1] ? allPivotButtons[i + 1] : target);
                }
            }
        }
        return target;
    };
    KeyboardInteraction.prototype.getPrevButton = function (target) {
        var allPivotButtons = this.allpivotButtons(target);
        removeClass(allPivotButtons, 'e-btn-focused');
        if (this.parent.grid.element.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            var len = allPivotButtons.length;
            for (var i = 0; i < len; i++) {
                if (allPivotButtons[i].getAttribute('data-uid') === target.getAttribute('data-uid')) {
                    return (allPivotButtons[i - 1] ? allPivotButtons[i - 1] : target);
                }
            }
        }
        return target;
    };
    KeyboardInteraction.prototype.allpivotButtons = function (target) {
        var buttons = [];
        if (target && this.parent.showGroupingBar) {
            var columnFilterValueGroup = closest(target, '.' + cls.GRID_GROUPING_BAR_CLASS);
            var rowGroup = closest(target, '.' + cls.GROUP_PIVOT_ROW);
            var chartGroup = closest(target, '.' + cls.CHART_GROUPING_BAR_CLASS);
            var tableAxis = target.classList.contains(cls.ROWSHEADER);
            var chartAxis = void 0;
            var rowAxis = void 0;
            var columnFilterValueAxis = void 0;
            if (columnFilterValueGroup !== null) {
                rowAxis = columnFilterValueGroup.classList.contains(cls.GRID_GROUPING_BAR_CLASS);
            }
            else if (rowGroup !== null) {
                columnFilterValueAxis = rowGroup.classList.contains(cls.GROUP_PIVOT_ROW);
            }
            else if (chartGroup !== null) {
                chartAxis = chartGroup.classList.contains(cls.CHART_GROUPING_BAR_CLASS);
            }
            if (rowAxis || columnFilterValueAxis || tableAxis) {
                var groupingbarButton = [].slice.call(this.parent.element.querySelector('.' + cls.GRID_GROUPING_BAR_CLASS).querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
                var headerButton = [].slice.call(this.parent.element.querySelector('.' + cls.GROUP_PIVOT_ROW).querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
                buttons = groupingbarButton.concat(headerButton);
            }
            else if (chartAxis) {
                buttons = [].slice.call(this.parent.element.querySelector('.' + cls.CHART_GROUPING_BAR_CLASS).querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
            }
        }
        return buttons;
    };
    KeyboardInteraction.prototype.processTab = function (e) {
        var target = e.target;
        if (target && (closest(target, '.' + cls.PIVOT_BUTTON_CLASS) || target.classList.contains('e-group-row'))) {
            if (this.parent.grid) {
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                if (target.classList.contains('e-group-row') && target.querySelector('.e-btn-focused')) {
                    target = target.querySelector('.e-btn-focused');
                }
                else if (target.classList.contains('e-group-row')) {
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                    e.preventDefault();
                    return;
                }
                var nextButton = this.getNextButton(target);
                if (nextButton.getAttribute('data-uid') !== target.getAttribute('data-uid')) {
                    if (this.parent.element.querySelector('.e-focused')) {
                        this.parent.element.querySelector('.e-focused').setAttribute('tabindex', '-1');
                        removeClass(this.parent.element.querySelectorAll('.e-focus'), 'e-focus');
                        removeClass(this.parent.element.querySelectorAll('.e-focused'), 'e-focused');
                        gridFocus.setFocusedElement(this.parent.element.querySelector('.e-headercell'));
                        this.parent.element.querySelector('.e-headercell').setAttribute('tabindex', '0');
                    }
                    else {
                        gridFocus.currentInfo.skipAction = true;
                    }
                    addClass([nextButton], 'e-btn-focused');
                    nextButton.focus();
                }
                else {
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                }
                e.preventDefault();
                return;
            }
        }
        else if (!this.parent.showGroupingBar && this.parent.showFieldList &&
            target && closest(target, '.' + cls.TOGGLE_FIELD_LIST_CLASS)) {
            if (this.parent.grid) {
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                gridFocus.focus();
                var element = gridFocus.getFocusedElement();
                addClass([element], ['e-focused', 'e-focus']);
                element.setAttribute('tabindex', '0');
                e.preventDefault();
                return;
            }
        }
        else if (!this.parent.showGroupingBar && !this.parent.showFieldList &&
            target && closest(target, '.' + cls.PIVOT_VIEW_CLASS) && !closest(target, '.e-popup.e-popup-open')) {
            if (this.parent.grid) {
                var gridElement = closest(target, '.' + cls.PIVOT_VIEW_CLASS);
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                var rows = [].slice.call(gridElement.getElementsByTagName('tr'));
                if (target.innerHTML === (rows[rows.length - 1]).lastChild.innerHTML) {
                    gridFocus.currentInfo.skipAction = true;
                }
                else {
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                    e.preventDefault();
                    return;
                }
            }
        }
        else if (target && closest(target, '.' + cls.GRID_TOOLBAR) && this.parent.toolbar && this.parent.toolbarModule) {
            clearTimeout(this.timeOutObj);
            this.timeOutObj = setTimeout(function () {
                removeClass(closest(target, '.' + cls.GRID_TOOLBAR).querySelectorAll('.e-menu-item.e-focused'), 'e-focused');
                if (document.activeElement && document.activeElement.classList.contains('e-menu-item')) {
                    addClass([document.activeElement], 'e-focused');
                }
            });
        }
        else if (target.classList.contains('e-numerictextbox')) {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            gridFocus.focus();
            var element = gridFocus.getFocusedElement();
            removeClass([element], ['e-focused', 'e-focus']);
            element.setAttribute('tabindex', '0');
            e.preventDefault();
        }
    };
    KeyboardInteraction.prototype.processShiftTab = function (e) {
        var target = e.target;
        if (target && (closest(target, '.' + cls.PIVOT_BUTTON_CLASS) || target.classList.contains('e-group-row'))) {
            if (this.parent.grid) {
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                if (target.classList.contains('e-group-row') && target.querySelector('.e-btn-focused')) {
                    target = target.querySelector('.e-btn-focused');
                }
                else if (target.classList.contains('e-group-row')) {
                    target = this.parent.element.querySelector('.e-btn-focused') ? this.parent.element.querySelector('.e-btn-focused') :
                        this.parent.element.querySelector('.' + cls.GRID_GROUPING_BAR_CLASS);
                    var allPivotButtons = this.allpivotButtons(target);
                    if (allPivotButtons.length > 0 && allPivotButtons[allPivotButtons.length - 1]) {
                        gridFocus.currentInfo.skipAction = true;
                        allPivotButtons[allPivotButtons.length - 1].focus();
                        removeClass(allPivotButtons, 'e-btn-focused');
                        addClass([allPivotButtons[allPivotButtons.length - 1]], 'e-btn-focused');
                        e.preventDefault();
                        return;
                    }
                }
                var prevButton = this.getPrevButton(target);
                if (prevButton.getAttribute('data-uid') !== target.getAttribute('data-uid')) {
                    gridFocus.currentInfo.skipAction = true;
                    prevButton.focus();
                    e.preventDefault();
                    return;
                }
            }
        }
        else if (target && this.parent.grid && (target.classList.contains('e-movablefirst') ||
            (target.classList.contains('e-rowsheader') && closest(target, 'tr').getAttribute('data-uid') ===
                this.parent.grid.element.querySelector('.e-frozencontent tr').getAttribute('data-uid')))) {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            if (target.classList.contains('e-movablefirst')) {
                target = (this.parent.element.querySelector('.' + cls.GROUP_ROW_CLASS + ' .e-btn-focused')) ?
                    (this.parent.element.querySelector('.' + cls.GROUP_ROW_CLASS + ' .e-btn-focused')) :
                    (this.parent.element.querySelector('.' + cls.GROUP_ROW_CLASS));
                var element = gridFocus.getFocusedElement();
                removeClass([element], ['e-focused', 'e-focus']);
            }
            var allPivotButtons_1 = this.allpivotButtons(target);
            if (allPivotButtons_1.length > 0) {
                gridFocus.currentInfo.skipAction = true;
                setTimeout(function () {
                    allPivotButtons_1[allPivotButtons_1.length - 1].focus();
                });
                removeClass(allPivotButtons_1, 'e-btn-focused');
                addClass([allPivotButtons_1[allPivotButtons_1.length - 1]], 'e-btn-focused');
                e.preventDefault();
                return;
            }
        }
        else if (target && closest(target, '.' + cls.GRID_TOOLBAR) &&
            this.parent.toolbar && this.parent.toolbarModule) {
            clearTimeout(this.timeOutObj);
            this.timeOutObj = setTimeout(function () {
                removeClass(closest(target, '.' + cls.GRID_TOOLBAR).querySelectorAll('.e-menu-item.e-focused'), 'e-focused');
                if (document.activeElement && document.activeElement.classList.contains('e-menu-item')) {
                    addClass([document.activeElement], 'e-focused');
                }
            });
        }
        else if (target.classList.contains('e-numerictextbox')) {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            gridFocus.focus();
            var element = gridFocus.getFocusedElement();
            removeClass([element], ['e-focused', 'e-focus']);
            element.setAttribute('tabindex', '0');
            e.preventDefault();
        }
    };
    KeyboardInteraction.prototype.processEnter = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.GRID_CLASS)) {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            if (e.keyCode === 13 && !e.shiftKey && !e.ctrlKey) {
                if (target.querySelector('.' + cls.ICON)) {
                    this.event = e;
                    target.querySelector('.' + cls.ICON).click();
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                }
                else if (target.classList.contains('e-valuescontent')) {
                    target.dispatchEvent(new MouseEvent('dblclick', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    }));
                    if (target.querySelector('.e-numerictextbox')) {
                        target.click();
                    }
                }
                else if (target.classList.contains('e-numerictextbox')) {
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    removeClass([element], ['e-focused', 'e-focus']);
                }
            }
            else if (e.keyCode === 13 && e.shiftKey && !e.ctrlKey) {
                if (this.parent.enableValueSorting) {
                    this.event = e;
                    target.click();
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                }
            }
            else if (e.keyCode === 13 && !e.shiftKey && e.ctrlKey) {
                if (this.parent.hyperlinkSettings && target.querySelector('a')) {
                    target.querySelector('a').click();
                }
            }
            e.preventDefault();
            return;
        }
    };
    KeyboardInteraction.prototype.clearSelection = function () {
        var control = this.parent;
        removeClass(control.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR + ',.' + cls.SELECTED_BGCOLOR), [cls.SELECTED_BGCOLOR, cls.CELL_SELECTED_BGCOLOR, cls.CELL_ACTIVE_BGCOLOR]);
        this.parent.renderModule.selected();
    };
    KeyboardInteraction.prototype.processSelection = function (e) {
        var target = e.target;
        if (this.parent.grid && this.parent.gridSettings.allowSelection && this.parent.gridSettings.selectionSettings.mode !== 'Row' &&
            !target.classList.contains('e-numerictextbox')) {
            var control_1 = this.parent;
            var colIndex_1 = parseInt(e.target.getAttribute('aria-colindex'), 10) - 1;
            var rowIndex_1 = Number(e.target.getAttribute('index'));
            var ele_1;
            if (target.nodeName === 'TH' || target.nodeName === 'TD') {
                if (e.action === 'shiftUp' || e.action === 'upArrow') {
                    ele_1 = (rowIndex_1 === 0 || colIndex_1 === 0 || (target.nodeName !== 'TH' &&
                        control_1.renderModule.rowStartPos !== rowIndex_1)) ? null
                        : this.getParentElement(control_1, ele_1, colIndex_1, rowIndex_1 - 1);
                }
                else if (e.action === 'shiftDown' || e.action === 'downArrow') {
                    ele_1 = control_1.element.querySelector('th[aria-colindex="' + (colIndex_1 + 1) + '"][index="' + (rowIndex_1 + 1) + '"]');
                }
                else if (e.action === 'shiftLeft' || e.action === 'leftArrow') {
                    ele_1 = e.target.previousSibling;
                }
                else {
                    ele_1 = e.target.nextSibling;
                }
            }
            if (!isNullOrUndefined(ele_1)) {
                if (control_1.gridSettings.selectionSettings.mode === 'Both' ? !ele_1.classList.contains(cls.ROW_CELL_CLASS) : true) {
                    colIndex_1 = parseInt(ele_1.getAttribute('aria-colindex'), 10) - 1;
                    rowIndex_1 = Number(ele_1.getAttribute('index'));
                    var colSpan_1 = Number(ele_1.getAttribute('aria-colspan'));
                    control_1.clearSelection(ele_1, e);
                    var selectArgs = {
                        cancel: false,
                        isCellClick: true,
                        currentCell: ele_1,
                        data: control_1.pivotValues[rowIndex_1][colIndex_1]
                    };
                    control_1.trigger(events.cellSelecting, selectArgs, function (observedArgs) {
                        if (!observedArgs.cancel) {
                            control_1.applyColumnSelection(e, ele_1, colIndex_1, colIndex_1 + (colSpan_1 > 0 ? (colSpan_1 - 1) : 0), rowIndex_1);
                        }
                    });
                }
                else {
                    control_1.clearSelection(ele_1, e);
                }
            }
            else {
                if (e.action === 'upArrow') {
                    ele_1 = control_1.element.querySelector('[aria-colindex="' + (colIndex_1 + 1) + '"][index="' + (rowIndex_1 - 1) + '"]');
                    rowIndex_1--;
                }
                else if (e.action === 'downArrow') {
                    ele_1 = control_1.element.querySelector('[aria-colindex="' + (colIndex_1 + 1) + '"][index="' + (rowIndex_1 + 1) + '"]');
                    rowIndex_1++;
                }
                if (!isNullOrUndefined(ele_1)) {
                    control_1.clearSelection(ele_1, e);
                }
            }
        }
        else if (target && (e.keyCode === 37 || e.keyCode === 38) &&
            this.parent && this.parent.showGroupingBar && this.parent.groupingBarModule && !target.classList.contains('e-numerictextbox')) {
            if (this.parent.grid && this.parent.element.querySelector('.e-frozenheader') && this.parent.element.querySelector('.e-frozenheader').querySelectorAll('.e-focus').length > 0) {
                removeClass(this.parent.element.querySelector('.e-frozenheader').querySelectorAll('.e-focus'), 'e-focus');
                removeClass(this.parent.element.querySelector('.e-frozenheader').querySelectorAll('.e-focused'), 'e-focused');
                this.parent.element.querySelector('.e-headercell').setAttribute('tabindex', '-1');
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                gridFocus.setFocusedElement(target);
                addClass([target], ['e-focused', 'e-focus']);
                target.setAttribute('tabindex', '0');
                target.focus();
                e.preventDefault();
                return;
            }
        }
        else if (target.classList.contains('e-numerictextbox') && (e.action === 'rightArrow' || e.action === 'leftArrow')) {
            target.click();
        }
    };
    KeyboardInteraction.prototype.getParentElement = function (control, ele, colIndex, rowIndex) {
        while (!ele) {
            ele = control.element.querySelector('[aria-colindex="' + (colIndex + 1) + '"][index="' + rowIndex + '"]');
            colIndex--;
        }
        return ele;
    };
    KeyboardInteraction.prototype.toggleFieldList = function (e) {
        if (this.parent && !this.parent.isDestroyed && this.parent.showFieldList &&
            this.parent.pivotFieldListModule && !this.parent.pivotFieldListModule.isDestroyed &&
            this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)) {
            if (!this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).classList.contains(cls.ICON_HIDDEN)) {
                this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).click();
                e.preventDefault();
                return;
            }
            else if (this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).classList.contains(cls.ICON_HIDDEN) &&
                this.parent.pivotFieldListModule.dialogRenderer && this.parent.pivotFieldListModule.dialogRenderer.fieldListDialog &&
                !this.parent.pivotFieldListModule.dialogRenderer.fieldListDialog.isDestroyed) {
                this.parent.pivotFieldListModule.dialogRenderer.fieldListDialog.hide();
            }
        }
    };
    /**
     *
     * To destroy the keyboard module.
     *
     * @returns  {void}
     * @private
     */
    KeyboardInteraction.prototype.destroy = function () {
        if (this.pivotViewKeyboardModule) {
            this.pivotViewKeyboardModule.destroy();
        }
        else {
            return;
        }
    };
    return KeyboardInteraction;
}());
export { KeyboardInteraction };
