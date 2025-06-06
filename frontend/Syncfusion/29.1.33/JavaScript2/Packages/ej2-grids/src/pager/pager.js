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
import { Component, L10n, Browser, addClass, removeClass, classList } from '@syncfusion/ej2-base';
import { createElement, compile as templateCompiler, EventHandler, extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Property, Event, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { NumericContainer } from './numeric-container';
import { PagerMessage } from './pager-message';
import { appendChildren, parentsUntil } from '../grid/base/util';
import * as events from '../grid/base/constant';
/**
 * Represents the `Pager` component.
 * ```html
 * <div id="pager"/>
 * ```
 * ```typescript
 * <script>
 *   var pagerObj = new Pager({ totalRecordsCount: 50, pageSize:10 });
 *   pagerObj.appendTo("#pager");
 * </script>
 * ```
 */
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    /**
     * Constructor for creating the component.
     *
     * @param {PagerModel} options - specifies the options
     * @param {string} element - specifies the element
     * @param {string} parent - specifies the pager parent
     * @hidden
     */
    function Pager(options, element, parent) {
        var _this = _super.call(this, options, element) || this;
        /** @hidden */
        _this.hasParent = false;
        _this.checkAll = true;
        _this.pageRefresh = 'pager-refresh';
        _this.firstPagerFocus = false;
        /** @hidden */
        _this.isCancel = false;
        /** @hidden */
        _this.isInteracted = false;
        _this.parent = parent;
        return _this;
    }
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} returns the modules declaration
     * @hidden
     */
    Pager.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableExternalMessage) {
            modules.push({
                member: 'externalMessage',
                args: [this],
                name: 'ExternalMessage'
            });
        }
        if (this.checkpagesizes()) {
            modules.push({
                member: 'pagerdropdown',
                args: [this],
                name: 'PagerDropDown'
            });
        }
        return modules;
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @hidden
     */
    Pager.prototype.preRender = function () {
        //preRender
        this.defaultConstants = {
            currentPageInfo: '{0} of {1} pages',
            totalItemsInfo: '({0} items)',
            totalItemInfo: '({0} item)',
            firstPageTooltip: 'Go to first page',
            lastPageTooltip: 'Go to last page',
            nextPageTooltip: 'Go to next page',
            previousPageTooltip: 'Go to previous page',
            nextPagerTooltip: 'Go to next pager items',
            previousPagerTooltip: 'Go to previous pager items',
            pagerDropDown: 'Items per page',
            pagerAllDropDown: 'Items',
            CurrentPageInfo: '{0} of {1} pages',
            TotalItemsInfo: '({0} items)',
            FirstPageTooltip: 'Go to first page',
            LastPageTooltip: 'Go to last page',
            NextPageTooltip: 'Go to next page',
            PreviousPageTooltip: 'Go to previous page',
            NextPagerTooltip: 'Go to next pager items',
            PreviousPagerTooltip: 'Go to previous pager items',
            PagerDropDown: 'Items per page',
            PagerAllDropDown: 'Items',
            All: 'All',
            Container: 'Pager Container',
            Information: 'Pager Information',
            ExternalMsg: 'Pager external message',
            Page: 'Page ',
            Of: ' of ',
            Pages: ' Pages'
        };
        this.containerModule = new NumericContainer(this);
        this.pagerMessageModule = new PagerMessage(this);
    };
    /**
     * To Initialize the component rendering
     *
     * @returns {void}
     */
    Pager.prototype.render = function () {
        this.element.setAttribute('data-role', 'pager');
        this.element.setAttribute('tabindex', '-1');
        this.initLocalization();
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            this.element.classList.add('e-mac-safari');
        }
        if (this.cssClass) {
            if (this.cssClass.indexOf(' ') !== -1) {
                addClass([this.element], this.cssClass.split(' '));
            }
            else {
                addClass([this.element], [this.cssClass]);
            }
        }
        if (!this.hasParent) {
            this.element.setAttribute('tabindex', '0');
        }
        if (this.enableQueryString) {
            var pageValue = new URL(window.location.href).searchParams.get('page');
            if (!isNullOrUndefined(pageValue) && window.location.href.indexOf('?page=') > 0) {
                var currentPageValue = parseInt(pageValue, 10);
                if (this.hasParent) {
                    this.parent
                        .setProperties({ pageSettings: { currentPage: currentPageValue } }, true);
                }
                this.currentPage = currentPageValue;
            }
        }
        if (this.template) {
            if (this.isReactTemplate()) {
                this.on(this.pageRefresh, this.pagerTemplate, this);
                this.notify(this.pageRefresh, {});
            }
            else {
                this.pagerTemplate();
            }
        }
        else {
            this.updateRTL();
            this.totalRecordsCount = this.totalRecordsCount || 0;
            this.renderFirstPrevDivForDevice();
            this.containerModule.render();
            if (this.enablePagerMessage) {
                this.pagerMessageModule.render();
            }
            this.renderNextLastDivForDevice();
            if (this.checkpagesizes() && this.pagerdropdownModule) {
                this.pagerdropdownModule.render();
            }
            this.addAriaLabel();
            if (this.enableExternalMessage && this.externalMessageModule) {
                this.externalMessageModule.render();
            }
            this.refresh();
            this.trigger('created', { 'currentPage': this.currentPage, 'totalRecordsCount': this.totalRecordsCount });
        }
        this.wireEvents();
        this.addListener();
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} returns the persist data
     * @hidden
     */
    Pager.prototype.getPersistData = function () {
        var keyEntity = ['currentPage', 'pageSize'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * To destroy the Pager component.
     *
     * @method destroy
     * @returns {void}
     */
    Pager.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.isReactTemplate()) {
            this.off(this.pageRefresh, this.pagerTemplate);
            if (!this.hasParent) {
                this.destroyTemplate(['pagerTemplate']);
            }
        }
        this.removeListener();
        this.unwireEvents();
        _super.prototype.destroy.call(this);
        this.containerModule.destroy();
        this.pagerMessageModule.destroy();
        if (!this.isReactTemplate()) {
            this.element.innerHTML = '';
        }
    };
    /**
     * Destroys the given template reference.
     *
     * @param {string[]} propertyNames - Defines the collection of template name.
     * @param {any} index - Defines the index
     */
    // eslint-disable-next-line
    Pager.prototype.destroyTemplate = function (propertyNames, index) {
        this.clearTemplate(propertyNames, index);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Pager.prototype.getModuleName = function () {
        return 'pager';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {PagerModel} newProp - specifies the new property
     * @param {PagerModel} oldProp - specifies the old propety
     * @returns {void}
     * @hidden
     */
    Pager.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (this.isDestroyed) {
            return;
        }
        if ((newProp.pageSize === this.getLocalizedLabel('All')) && oldProp.pageSize === this.totalRecordsCount) {
            this.pageSize = this.totalRecordsCount;
            return;
        }
        if (newProp.pageCount !== oldProp.pageCount) {
            this.containerModule.refreshNumericLinks();
            this.containerModule.refresh();
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'currentPage':
                    if (this.checkGoToPage(newProp.currentPage, oldProp.currentPage)) {
                        this.currentPageChanged(newProp, oldProp);
                    }
                    break;
                case 'pageSize':
                case 'totalRecordsCount':
                case 'customText':
                    if (this.checkpagesizes() && this.pagerdropdownModule) {
                        if (oldProp.pageSize !== newProp.pageSize) {
                            this.currentPage = 1;
                        }
                        this.pagerdropdownModule.setDropDownValue('value', this.pageSize);
                    }
                    if (newProp.pageSize !== oldProp.pageSize) {
                        this.pageSize = newProp.pageSize;
                        this.currentPageChanged(newProp, oldProp);
                        if (this.isCancel && this.hasParent) {
                            this.parent
                                .setProperties({ pageSettings: { pageSize: oldProp.pageSize } }, true);
                        }
                    }
                    else {
                        this.refresh();
                    }
                    break;
                case 'pageSizes':
                    if (this.checkpagesizes() && this.pagerdropdownModule) {
                        this.pagerdropdownModule.destroy();
                        this.pagerdropdownModule.render();
                    }
                    this.refresh();
                    break;
                case 'template':
                    this.templateFn = this.compile(this.template);
                    this.refresh();
                    break;
                case 'locale':
                    this.initLocalization();
                    this.refresh();
                    break;
                case 'enableExternalMessage':
                    if (this.enableExternalMessage && this.externalMessageModule) {
                        this.externalMessageModule.render();
                    }
                    break;
                case 'externalMessage':
                    if (this.externalMessageModule) {
                        this.externalMessageModule.refresh();
                    }
                    break;
                case 'enableRtl':
                    this.updateRTL();
                    break;
                case 'enablePagerMessage':
                    if (this.enablePagerMessage) {
                        this.pagerMessageModule.showMessage();
                    }
                    else {
                        this.pagerMessageModule.hideMessage();
                    }
                    break;
            }
        }
        this.resizePager();
    };
    Pager.prototype.wireEvents = function () {
        if (!this.hasParent) {
            EventHandler.add(this.element, 'keydown', this.keyPressHandler, this);
            EventHandler.add(document.body, 'keydown', this.keyDownHandler, this);
        }
        EventHandler.add(this.element, 'focusin', this.onFocusIn, this);
        EventHandler.add(this.element, 'focusout', this.onFocusOut, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.add(window, 'resize', this.resizePager, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.add(window, 'load', this.resizePager, this);
    };
    Pager.prototype.unwireEvents = function () {
        if (!this.hasParent) {
            EventHandler.remove(this.element, 'keydown', this.keyPressHandler);
            EventHandler.remove(document.body, 'keydown', this.keyDownHandler);
        }
        EventHandler.remove(this.element, 'focusin', this.onFocusIn);
        EventHandler.remove(this.element, 'focusout', this.onFocusOut);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.remove(window, 'resize', this.resizePager);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.remove(window, 'load', this.resizePager);
    };
    Pager.prototype.onFocusIn = function (e) {
        var focusedTabIndexElement = this.getFocusedTabindexElement();
        if (isNullOrUndefined(focusedTabIndexElement)) {
            var target = e.target;
            var dropDownPage = this.getDropDownPage();
            if (!this.hasParent) {
                this.element.tabIndex = -1;
            }
            if (target === this.element && !this.hasParent) {
                var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
                this.addFocus(focusablePagerElements[0], true);
                return;
            }
            if (target === this.element) {
                this.element.tabIndex = 0;
                return;
            }
            if (target !== dropDownPage && !target.classList.contains('e-disable')) {
                this.addFocus(target, true);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Pager.prototype.onFocusOut = function (e) {
        var focusedElement = this.getFocusedElement();
        var dropDownPage = this.getDropDownPage();
        if (!isNullOrUndefined(focusedElement)) {
            this.removeFocus(focusedElement, true);
        }
        if (this.pageSizes && dropDownPage && dropDownPage.classList.contains('e-input-focus')) {
            this.removeFocus(dropDownPage, true);
        }
        this.setTabIndexForFocusLastElement();
        if (!this.hasParent) {
            this.element.tabIndex = 0;
        }
        if (this.hasParent) {
            this.element.tabIndex = -1;
        }
    };
    Pager.prototype.keyDownHandler = function (e) {
        if (e.altKey) {
            if (e.keyCode === 74) {
                var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
                if (focusablePagerElements.length > 0) {
                    focusablePagerElements[0].focus();
                }
            }
        }
    };
    Pager.prototype.keyPressHandler = function (e) {
        var presskey = extend(e, { cancel: false });
        this.notify(events.keyPressed, presskey);
        if (presskey.cancel === true) {
            e.stopImmediatePropagation();
        }
    };
    Pager.prototype.addListener = function () {
        if (this.isDestroyed) {
            return;
        }
        if (!this.hasParent) {
            this.on(events.keyPressed, this.onKeyPress, this);
        }
    };
    Pager.prototype.removeListener = function () {
        if (this.isDestroyed) {
            return;
        }
        if (!this.hasParent) {
            this.off(events.keyPressed, this.onKeyPress);
        }
    };
    Pager.prototype.onKeyPress = function (e) {
        if (!this.hasParent) {
            if (this.checkPagerHasFocus()) {
                this.changePagerFocus(e);
            }
            else {
                e.preventDefault();
                this.setPagerFocus();
            }
        }
    };
    /**
     * @returns {boolean} - Return the true value if pager has focus
     * @hidden */
    Pager.prototype.checkPagerHasFocus = function () {
        return this.getFocusedTabindexElement() ? true : false;
    };
    /**
     * @returns {void}
     * @hidden */
    Pager.prototype.setPagerContainerFocus = function () {
        this.element.focus();
    };
    /**
     * @returns {void}
     * @hidden */
    Pager.prototype.setPagerFocus = function () {
        var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
        if (focusablePagerElements.length > 0) {
            focusablePagerElements[0].focus();
        }
    };
    Pager.prototype.setPagerFocusForActiveElement = function () {
        var currentActivePage = this.getActiveElement();
        if (currentActivePage) {
            currentActivePage.focus();
        }
    };
    Pager.prototype.setTabIndexForFocusLastElement = function () {
        var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
        var dropDownPage = this.getDropDownPage();
        if (this.pageSizes && dropDownPage && !isNullOrUndefined(dropDownPage.offsetParent)) {
            dropDownPage.tabIndex = 0;
        }
        else if (focusablePagerElements.length > 0) {
            focusablePagerElements[focusablePagerElements.length - 1].tabIndex = 0;
        }
    };
    /**
     * @param {KeyboardEventArgs} e - Keyboard Event Args
     * @returns {void}
     * @hidden */
    Pager.prototype.changePagerFocus = function (e) {
        this.keyAction = e.key;
        if (e.shiftKey && e.keyCode === 9) {
            this.changeFocusByShiftTab(e);
        }
        else if (e.keyCode === 9) {
            this.changeFocusByTab(e);
        }
        else if (e.keyCode === 13 || e.keyCode === 32) {
            this.navigateToPageByEnterOrSpace(e);
        }
        else if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 35 || e.keyCode === 36) {
            this.navigateToPageByKey(e);
        }
        this.keyAction = '';
    };
    Pager.prototype.getFocusedTabindexElement = function () {
        var focusedTabIndexElement;
        var tabindexElements = this.element.querySelectorAll('[tabindex]:not([tabindex="-1"])');
        for (var i = 0; i < tabindexElements.length; i++) {
            var element = tabindexElements[parseInt(i.toString(), 10)];
            if (element && (element.classList.contains('e-focused') || element.classList.contains('e-input-focus'))) {
                focusedTabIndexElement = element;
                break;
            }
        }
        return focusedTabIndexElement;
    };
    Pager.prototype.changeFocusByTab = function (e) {
        var currentItemPagerFocus = this.getFocusedTabindexElement();
        var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
        var dropDownPage = this.getDropDownPage();
        if (focusablePagerElements.length > 0) {
            if (this.pageSizes && dropDownPage && currentItemPagerFocus === focusablePagerElements[focusablePagerElements.length - 1]) {
                dropDownPage.tabIndex = 0;
            }
            else {
                for (var i = 0; i < focusablePagerElements.length; i++) {
                    if (currentItemPagerFocus === focusablePagerElements[parseInt(i.toString(), 10)]) {
                        var incrementNumber = i + 1;
                        if (incrementNumber < focusablePagerElements.length) {
                            e.preventDefault();
                            focusablePagerElements[parseInt(incrementNumber.toString(), 10)].focus();
                        }
                        break;
                    }
                }
            }
        }
    };
    Pager.prototype.changeFocusByShiftTab = function (e) {
        var currentItemPagerFocus = this.getFocusedTabindexElement();
        var focusablePagerElements = this.getFocusablePagerElements(this.element, []);
        var dropDownPage = this.getDropDownPage();
        if (this.pageSizes && dropDownPage && dropDownPage.classList.contains('e-input-focus')) {
            dropDownPage.tabIndex = -1;
            this.addFocus(focusablePagerElements[focusablePagerElements.length - 1], true);
        }
        else if (focusablePagerElements.length > 0) {
            for (var i = 0; i < focusablePagerElements.length; i++) {
                if (currentItemPagerFocus === focusablePagerElements[parseInt(i.toString(), 10)]) {
                    var decrementNumber = i - 1;
                    if (decrementNumber >= 0) {
                        e.preventDefault();
                        focusablePagerElements[parseInt(decrementNumber.toString(), 10)].focus();
                    }
                    else if (this.hasParent) {
                        var rows = this.parent.getRows();
                        var lastRow = rows[rows.length - 1];
                        var lastCell = lastRow.lastChild;
                        e.preventDefault();
                        lastCell.focus();
                        this.firstPagerFocus = true;
                    }
                    break;
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden */
    Pager.prototype.checkFirstPagerFocus = function () {
        if (this.firstPagerFocus) {
            this.firstPagerFocus = false;
            return true;
        }
        return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Pager.prototype.navigateToPageByEnterOrSpace = function (e) {
        var currentItemPagerFocus = this.getFocusedElement();
        if (currentItemPagerFocus) {
            this.goToPage(parseInt(currentItemPagerFocus.getAttribute('index'), 10));
            var currentActivePage = this.getActiveElement();
            var selectedClass = this.getClass(currentItemPagerFocus);
            var classElement = this.getElementByClass(selectedClass);
            if ((selectedClass === 'e-first' || selectedClass === 'e-prev' || selectedClass === 'e-next'
                || selectedClass === 'e-last' || selectedClass === 'e-pp' || selectedClass === 'e-np')
                && classElement && !classElement.classList.contains('e-disable')) {
                classElement.focus();
            }
            else if (this.checkFocusInAdaptiveMode(currentItemPagerFocus)) {
                this.changeFocusInAdaptiveMode(currentItemPagerFocus);
            }
            else {
                if (currentActivePage) {
                    currentActivePage.focus();
                }
            }
        }
    };
    Pager.prototype.navigateToPageByKey = function (e) {
        var actionClass = e.keyCode === 37 ? '.e-prev' : e.keyCode === 39 ? '.e-next'
            : e.keyCode === 35 ? '.e-last' : e.keyCode === 36 ? '.e-first' : '';
        var pagingItem = this.element.querySelector(actionClass);
        var currentItemPagerFocus = this.getFocusedElement();
        if (!isNullOrUndefined(pagingItem) && pagingItem.hasAttribute('index')
            && !isNaN(parseInt(pagingItem.getAttribute('index'), 10))) {
            this.goToPage(parseInt(pagingItem.getAttribute('index'), 10));
            var currentActivePage = this.getActiveElement();
            if (this.checkFocusInAdaptiveMode(currentItemPagerFocus)) {
                this.changeFocusInAdaptiveMode(currentItemPagerFocus);
            }
            else {
                if (currentActivePage) {
                    currentActivePage.focus();
                }
            }
        }
    };
    Pager.prototype.checkFocusInAdaptiveMode = function (element) {
        var selectedClass = this.getClass(element);
        return selectedClass === 'e-mfirst' || selectedClass === 'e-mprev' || selectedClass === 'e-mnext'
            || selectedClass === 'e-mlast' ? true : false;
    };
    Pager.prototype.changeFocusInAdaptiveMode = function (element) {
        var selectedClass = this.getClass(element);
        var classElement = this.getElementByClass(selectedClass);
        if (classElement && classElement.classList.contains('e-disable')) {
            if (selectedClass === 'e-mnext' || selectedClass === 'e-mlast') {
                var mPrev = this.element.querySelector('.e-mprev');
                mPrev.focus();
            }
            else {
                this.setPagerFocus();
            }
        }
    };
    Pager.prototype.removeTabindexLastElements = function () {
        var tabIndexElements = this.element.querySelectorAll('[tabindex]:not([tabindex="-1"])');
        if (tabIndexElements.length > 1) {
            for (var i = 1; i < tabIndexElements.length; i++) {
                var element = tabIndexElements[parseInt(i.toString(), 10)];
                if (element) {
                    element.tabIndex = -1;
                }
            }
        }
    };
    Pager.prototype.getActiveElement = function () {
        return this.element.querySelector('.e-active');
    };
    /**
     * @returns {Element} - Returns DropDown Page
     * @hidden */
    Pager.prototype.getDropDownPage = function () {
        var dropDownPageHolder = this.element.querySelector('.e-pagerdropdown');
        var dropDownPage;
        if (dropDownPageHolder) {
            dropDownPage = dropDownPageHolder.children[0];
        }
        return dropDownPage;
    };
    Pager.prototype.getFocusedElement = function () {
        return this.element.querySelector('.e-focused');
    };
    Pager.prototype.getClass = function (element) {
        var currentClass;
        var classList = ['e-mfirst', 'e-mprev', 'e-first', 'e-prev', 'e-pp',
            'e-np', 'e-next', 'e-last', 'e-mnext', 'e-mlast'];
        for (var i = 0; i < classList.length; i++) {
            if (element && element.classList.contains(classList[parseInt(i.toString(), 10)])) {
                currentClass = classList[parseInt(i.toString(), 10)];
                return currentClass;
            }
        }
        return currentClass;
    };
    Pager.prototype.getElementByClass = function (className) {
        return this.element.querySelector('.' + className);
    };
    /**
     * @param {Element} element - Pager element
     * @param {Element[]} previousElements - Iterating pager element
     * @returns {Element[]} - Returns focusable pager element
     * @hidden */
    Pager.prototype.getFocusablePagerElements = function (element, previousElements) {
        var target = element;
        var targetChildrens = target.children;
        var pagerElements = previousElements;
        for (var i = 0; i < targetChildrens.length; i++) {
            var element_1 = targetChildrens[parseInt(i.toString(), 10)];
            if (element_1.children.length > 0 && !element_1.classList.contains('e-pagesizes')) {
                pagerElements = this.getFocusablePagerElements(element_1, pagerElements);
            }
            else {
                var tabindexElement = targetChildrens[parseInt(i.toString(), 10)];
                if (tabindexElement.hasAttribute('tabindex') && !element_1.classList.contains('e-disable')
                    && element_1.style.display !== 'none'
                    && !isNullOrUndefined(element_1.offsetParent)) {
                    pagerElements.push(tabindexElement);
                }
            }
        }
        return pagerElements;
    };
    Pager.prototype.addFocus = function (element, addFocusClass) {
        if (!isNullOrUndefined(element)) {
            if (addFocusClass) {
                addClass([element], ['e-focused', 'e-focus']);
            }
            element.tabIndex = 0;
        }
    };
    Pager.prototype.removeFocus = function (element, removeFocusClass) {
        if (removeFocusClass) {
            removeClass([element], ['e-focused', 'e-focus']);
        }
        element.tabIndex = -1;
    };
    /**
     * Gets the localized label by locale keyword.
     *
     * @param  {string} key - specifies the key
     * @returns {string} returns the localized label
     */
    Pager.prototype.getLocalizedLabel = function (key) {
        return this.localeObj.getConstant(key);
    };
    /**
     * Navigate to target page by given number.
     *
     * @param  {number} pageNo - Defines page number.
     * @returns {void}
     */
    Pager.prototype.goToPage = function (pageNo) {
        if (this.checkGoToPage(pageNo)) {
            this.currentPage = pageNo;
            this.isInteracted = false;
            this.dataBind();
        }
    };
    /**
     * @param {number} pageSize - specifies the pagesize
     * @returns {void}
     * @hidden
     */
    Pager.prototype.setPageSize = function (pageSize) {
        this.pageSize = pageSize;
        this.dataBind();
    };
    Pager.prototype.checkpagesizes = function () {
        if (this.pageSizes === true || this.pageSizes.length) {
            return true;
        }
        return false;
    };
    Pager.prototype.checkGoToPage = function (newPageNo, oldPageNo) {
        if (newPageNo !== this.currentPage) {
            this.previousPageNo = this.currentPage;
        }
        if (!isNullOrUndefined(oldPageNo)) {
            this.previousPageNo = oldPageNo;
        }
        if (this.previousPageNo !== newPageNo && (newPageNo >= 1 && newPageNo <= this.totalPages)) {
            return true;
        }
        return false;
    };
    Pager.prototype.currentPageChanged = function (newProp, oldProp) {
        if (this.enableQueryString) {
            this.updateQueryString(this.currentPage);
        }
        if (newProp.currentPage !== oldProp.currentPage || newProp.pageSize !== oldProp.pageSize) {
            var args = {
                currentPage: this.currentPage,
                newProp: newProp, oldProp: oldProp, cancel: false, isInteracted: this.isInteracted
            };
            this.trigger('click', args);
            if (!args.cancel) {
                this.isCancel = false;
                this.refresh();
            }
            else {
                this.isCancel = true;
                if (oldProp && oldProp.pageSize) {
                    this.setProperties({ pageSize: oldProp.pageSize }, true);
                    if (this.pagerdropdownModule) {
                        this.pagerdropdownModule.setDropDownValue('value', oldProp.pageSize);
                        this.pagerdropdownModule['dropDownListObject'].text = oldProp.pageSize + '';
                    }
                }
            }
        }
    };
    Pager.prototype.pagerTemplate = function () {
        if (this.isReactTemplate() && this.hasParent) {
            return;
        }
        var result;
        this.element.classList.add('e-pagertemplate');
        this.compile(this.template);
        var data = {
            currentPage: this.currentPage, pageSize: this.pageSize, pageCount: this.pageCount,
            totalRecordsCount: this.totalRecordsCount, totalPages: this.totalPages
        };
        var tempId = this.element.parentElement.id + '_template';
        if (this.isReactTemplate() && !this.isVue) {
            this.getPagerTemplate()(data, this, 'pagerTemplate', tempId, null, null, this.element);
            this.renderReactTemplates();
        }
        else {
            result = this.isVue ? this.getPagerTemplate()(data, this, 'pagerTemplate', null, null, null, null, this.root)
                : this.getPagerTemplate()(data);
            appendChildren(this.element, result);
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Pager.prototype.updateTotalPages = function () {
        this.totalPages = this.isAllPage ? 1 : (this.totalRecordsCount % this.pageSize === 0) ? (this.totalRecordsCount / this.pageSize) :
            (parseInt((this.totalRecordsCount / this.pageSize).toString(), 10) + 1);
    };
    /**
     * @returns {Function} returns the function
     * @hidden
     */
    Pager.prototype.getPagerTemplate = function () {
        return this.templateFn;
    };
    /**
     * @param {string | Function} template - specifies the template
     * @returns {Function} returns the function
     * @hidden
     */
    Pager.prototype.compile = function (template) {
        if (template) {
            try {
                if (typeof template === 'function') {
                    this.templateFn = templateCompiler(template);
                }
                else {
                    if (document.querySelectorAll(template).length) {
                        this.templateFn = templateCompiler(document.querySelector(template).innerHTML.trim());
                    }
                    else {
                        this.templateFn = templateCompiler(template);
                    }
                }
            }
            catch (e) {
                this.templateFn = templateCompiler(template);
            }
        }
        return undefined;
    };
    /**
     * Refreshes page count, pager information and external message.
     *
     * @returns {void}
     */
    Pager.prototype.refresh = function () {
        if (this.template) {
            if (this.isReactTemplate()) {
                this.updateTotalPages();
                this.notify(this.pageRefresh, {});
            }
            else {
                this.element.innerHTML = '';
                this.updateTotalPages();
                this.pagerTemplate();
            }
        }
        else {
            this.updateRTL();
            var focusedTabIndexElement = this.getFocusedTabindexElement();
            this.containerModule.refresh();
            this.removeTabindexLastElements();
            if (focusedTabIndexElement && focusedTabIndexElement.classList.contains('e-disable')) {
                if (this.checkFocusInAdaptiveMode(focusedTabIndexElement)) {
                    this.changeFocusInAdaptiveMode(focusedTabIndexElement);
                }
                else {
                    this.setPagerFocusForActiveElement();
                }
            }
            if (this.enablePagerMessage) {
                this.pagerMessageModule.refresh();
            }
            if (this.pagerdropdownModule) {
                this.pagerdropdownModule.refresh();
            }
            if (this.enableExternalMessage && this.externalMessageModule) {
                this.externalMessageModule.refresh();
            }
            this.setTabIndexForFocusLastElement();
            this.resizePager();
        }
    };
    Pager.prototype.updateRTL = function () {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    };
    Pager.prototype.initLocalization = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultConstants, this.locale);
    };
    Pager.prototype.updateQueryString = function (value) {
        var updatedUrl = this.getUpdatedURL(window.location.href, 'page', value.toString());
        window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    };
    Pager.prototype.getUpdatedURL = function (uri, key, value) {
        var regExp = RegExp;
        var regx = new regExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
        if (uri.match(regx)) {
            return uri.replace(regx, '$1' + key + '=' + value + '$2');
        }
        else {
            var hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            return uri + (uri.indexOf('?') !== -1 ? '&' : '?') + key + '=' + value + hash;
        }
    };
    Pager.prototype.renderFirstPrevDivForDevice = function () {
        this.element.appendChild(createElement('div', {
            className: 'e-mfirst e-icons e-icon-first',
            attrs: { title: this.getLocalizedLabel('firstPageTooltip'), tabindex: '-1' }
        }));
        this.element.appendChild(createElement('div', {
            className: 'e-mprev e-icons e-icon-prev',
            attrs: { title: this.getLocalizedLabel('previousPageTooltip'), tabindex: '-1' }
        }));
    };
    Pager.prototype.renderNextLastDivForDevice = function () {
        this.element.appendChild(createElement('div', {
            className: 'e-mnext e-icons e-icon-next',
            attrs: { title: this.getLocalizedLabel('nextPageTooltip'), tabindex: '-1' }
        }));
        this.element.appendChild(createElement('div', {
            className: 'e-mlast e-icons e-icon-last',
            attrs: { title: this.getLocalizedLabel('lastPageTooltip'), tabindex: '-1' }
        }));
    };
    Pager.prototype.addAriaLabel = function () {
        var classList = ['.e-mfirst', '.e-mprev', '.e-mnext', '.e-mlast'];
        if (!Browser.isDevice) {
            for (var i = 0; i < classList.length; i++) {
                var element = this.element.querySelector(classList[parseInt(i.toString(), 10)]);
                element.setAttribute('aria-label', element.getAttribute('title'));
            }
        }
    };
    Pager.prototype.isReactTemplate = function () {
        return (this.isReact || this.isVue) && this.template && typeof (this.template) !== 'string' && !(this.template.prototype && this.template.prototype.CSPTemplate);
    };
    /**
     * Loop through all the inner elements of pager to calculate the required width for pager child elements.
     *
     * @returns {number} returns the actual width occupied by pager elements.
     */
    Pager.prototype.calculateActualWidth = function () {
        var pagerElements = this.element.querySelectorAll(
        /* tslint:disable-next-line:max-line-length */
        '.e-mfirst, .e-mprev, .e-icon-first, .e-icon-prev, .e-pp:not(.e-disable), .e-numericitem:not(.e-hide), .e-numericitem.e-active.e-hide, .e-np:not(.e-disable), .e-icon-next, .e-icon-last, .e-parentmsgbar, .e-mnext, .e-mlast, .e-pagerdropdown, .e-pagerconstant');
        var actualWidth = 0;
        for (var i = 0; i < pagerElements.length; i++) {
            if (getComputedStyle(pagerElements[parseInt(i.toString(), 10)]).display !== 'none') {
                actualWidth += pagerElements[parseInt(i.toString(), 10)].offsetWidth
                    + parseFloat(getComputedStyle(pagerElements[parseInt(i.toString(), 10)]).marginLeft)
                    + parseFloat(getComputedStyle(pagerElements[parseInt(i.toString(), 10)]).marginRight);
            }
        }
        var pagerContainer = this.element.querySelector('.e-pagercontainer');
        actualWidth += parseFloat(getComputedStyle(pagerContainer).marginLeft)
            + parseFloat(getComputedStyle(pagerContainer).marginRight);
        return actualWidth;
    };
    /**
     * Resize pager component by hiding pager component's numeric items based on total width available for pager.
     *
     * @returns {void}
     */
    Pager.prototype.resizePager = function () {
        var _this = this;
        var isStyleApplied = this.element.classList.contains('e-pager') ? getComputedStyle(this.element).getPropertyValue('border-style').includes('solid') : null;
        if (!(this.template) && isStyleApplied) {
            var pagerContainer = this.element.querySelector('.e-pagercontainer');
            var actualWidth = this.calculateActualWidth();
            var pagerWidth = this.element.clientWidth
                - parseFloat(getComputedStyle(this.element).paddingLeft)
                - parseFloat(getComputedStyle(this.element).paddingRight)
                - parseFloat(getComputedStyle(this.element).marginLeft)
                - parseFloat(getComputedStyle(this.element).marginRight);
            var numItems = pagerContainer.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
            var hiddenNumItems = pagerContainer.querySelectorAll('.e-numericitem.e-hide:not([style*="display: none"])');
            var hideFrom = numItems.length;
            var showFrom = 1;
            var bufferWidth = (!isNullOrUndefined(parentsUntil(this.element, 'e-bigger'))) ? 10 : 5;
            var NP = pagerContainer.querySelector('.e-np');
            var PP = pagerContainer.querySelector('.e-pp');
            var detailItems = this.element.querySelectorAll('.e-parentmsgbar:not(.e-hide):not([style*="display: none"]), .e-pagesizes:not(.e-hide):not([style*="display: none"])');
            var totDetailWidth_1 = 0;
            if (detailItems.length) {
                detailItems.forEach(function (item) {
                    totDetailWidth_1 += item.offsetWidth;
                });
                this.averageDetailWidth = totDetailWidth_1 / detailItems.length;
            }
            var totalWidth = 0;
            /**
             * Loop to calculate average width of numeric item.
             */
            for (var i = 0; i < numItems.length; i++) {
                totalWidth += numItems[parseInt(i.toString(), 10)].offsetWidth
                    + parseFloat(getComputedStyle(numItems[parseInt(i.toString(), 10)]).marginLeft)
                    + parseFloat(getComputedStyle(numItems[parseInt(i.toString(), 10)]).marginRight);
            }
            var numericItemWidth = totalWidth / numItems.length;
            /**
             * Condition to hide numeric items when calculated actual width exceeds available pager space.
             */
            if (pagerWidth > 0 && (actualWidth >= (pagerWidth - (numericItemWidth ? numericItemWidth : 0)))) {
                this.isPagerResized = true;
                if (this.currentPage !== this.totalPages) {
                    classList(NP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
                }
                actualWidth = this.calculateActualWidth();
                var diff = Math.abs((actualWidth) - pagerWidth);
                // To calculate number of numeric items need to be hidden.
                var numToHide = Math.ceil(diff / (numericItemWidth));
                numToHide = (numToHide === 0) ? 1 : (numToHide > numItems.length) ? (numItems.length - 1) : numToHide;
                for (var i = 1; i <= numToHide; i++) {
                    var hideIndex = hideFrom - parseInt(i.toString(), 10);
                    numItems = pagerContainer.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
                    if (this.currentPage !== 1 && ((parseInt(numItems[Math.abs(hideIndex)].getAttribute('index'), 10) === this.currentPage)
                        || parseInt(numItems[numItems.length - 1].getAttribute('index'), 10) === this.currentPage)) {
                        hideIndex = 0;
                        classList(PP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
                    }
                    if (numItems[Math.abs(hideIndex)] && !(numItems[Math.abs(hideIndex)].classList.contains('e-currentitem'))) {
                        numItems[Math.abs(hideIndex)].classList.add('e-hide');
                    }
                }
                numItems = pagerContainer.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
                // To hide Pager message elements when no more numeric items available to hide.
                if (numItems.length <= 1 && detailItems.length && window.innerWidth >= 768) {
                    var pagerDetailItemsWidth = this.calculateActualWidth();
                    if ((pagerDetailItemsWidth) > (pagerWidth - bufferWidth)) {
                        var detailtoHide = Math.floor((pagerWidth - (pagerDetailItemsWidth - totDetailWidth_1))
                            / this.averageDetailWidth);
                        detailtoHide = detailItems.length - detailtoHide;
                        for (var i = 0; i < (detailtoHide > detailItems.length ? detailItems.length : detailtoHide); i++) {
                            detailItems[parseInt(i.toString(), 10)].classList.add('e-hide');
                        }
                    }
                }
            }
            /**
             * Condition to show numeric items when space availble in pager at dom.
             */
            else if (actualWidth < (pagerWidth) && hiddenNumItems.length) {
                var diff = Math.abs(pagerWidth - (actualWidth));
                var hiddenDetailItems = this.element.querySelectorAll('.e-parentmsgbar.e-hide, .e-pagesizes.e-hide');
                // To show Pager message elements.
                if (hiddenDetailItems.length && (diff > (this.averageDetailWidth + (this.averageDetailWidth / 4)))) {
                    hiddenDetailItems[(hiddenDetailItems.length - 1)].classList.remove('e-hide');
                }
                if ((diff > (numericItemWidth * 2) && !hiddenDetailItems.length && window.innerWidth >= 768)) {
                    // To calculate number of numeric items need to be shown.
                    var numToShow = Math.floor((diff) / (numericItemWidth + bufferWidth));
                    numToShow = (numToShow > hiddenNumItems.length) ? hiddenNumItems.length : (numToShow - 1);
                    //Seggregating hidden num items as less index and greater index values than current page value.
                    var lesserIndexItems = Array.from(hiddenNumItems).filter(function (item) { return parseInt(item.getAttribute('index'), 10) < _this.currentPage; }).sort(function (a, b) { return parseInt(b.getAttribute('index'), 10) - parseInt(a.getAttribute('index'), 10); });
                    var greaterIndexItems = Array.from(hiddenNumItems).filter(function (item) { return parseInt(item.getAttribute('index'), 10) > _this.currentPage; });
                    var showItems = (lesserIndexItems.length && lesserIndexItems)
                        || (greaterIndexItems.length && greaterIndexItems);
                    for (var i = 1; i <= numToShow; i++) {
                        var showItem = showItems && showItems[Math.abs(showFrom - i)];
                        if (showItem) {
                            showItem.classList.remove('e-hide');
                            if (showItem === showItems[showItems.length - 1]) {
                                showItems = null;
                            }
                        }
                    }
                }
            }
            numItems = pagerContainer.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
            if (numItems.length) {
                if (parseInt(numItems[numItems.length - 1].getAttribute('index'), 10) === this.totalPages) {
                    classList(NP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
                }
                if (parseInt(numItems[0].getAttribute('index'), 10) === 1) {
                    classList(PP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
                }
                var isLastSet = Array.from(numItems).some(function (item) { return parseInt(item.getAttribute('index'), 10) === _this.totalPages; });
                var ppIndex = (parseInt(numItems[0].getAttribute('index'), 10) - (isLastSet && !isNullOrUndefined(this.avgNumItems) ? this.avgNumItems : numItems.length));
                PP.setAttribute('index', (ppIndex < 1) ? '1' : ppIndex.toString());
                NP.setAttribute('index', (parseInt(numItems[numItems.length - 1].getAttribute('index'), 10) + 1).toString());
                this.avgNumItems = isLastSet ? this.avgNumItems : numItems.length;
            }
            /**
             * Condition to add adaptive class name and set pagermessage content with "/" when media query css has been applied.
             */
            if (((this.element.offsetWidth < 769) && window.getComputedStyle(this.element.querySelector('.e-mfirst')).getPropertyValue('display') !== 'none') && this.pageSizes) {
                this.element.querySelector('.e-pagesizes').classList.remove('e-hide');
                this.element.querySelector('.e-parentmsgbar').classList.remove('e-hide');
                this.element.classList.add('e-adaptive');
                this.element.querySelector('.e-pagenomsg').innerHTML = this.element.offsetWidth < 481 ? (this.currentPage + ' / ' + this.totalPages) : this.pagerMessageModule.format(this.getLocalizedLabel('currentPageInfo'), [this.totalRecordsCount === 0 ? 0 :
                        this.currentPage, this.totalPages || 0, this.totalRecordsCount || 0]) + ' ';
            }
            else {
                this.element.classList.remove('e-adaptive');
                this.element.querySelector('.e-pagenomsg').innerHTML = this.pagerMessageModule.format(this.getLocalizedLabel('currentPageInfo'), [this.totalRecordsCount === 0 ? 0 :
                        this.currentPage, this.totalPages || 0, this.totalRecordsCount || 0]) + ' ';
            }
        }
    };
    __decorate([
        Property(false)
    ], Pager.prototype, "enableQueryString", void 0);
    __decorate([
        Property(false)
    ], Pager.prototype, "enableExternalMessage", void 0);
    __decorate([
        Property(true)
    ], Pager.prototype, "enablePagerMessage", void 0);
    __decorate([
        Property(12)
    ], Pager.prototype, "pageSize", void 0);
    __decorate([
        Property(10)
    ], Pager.prototype, "pageCount", void 0);
    __decorate([
        Property(1)
    ], Pager.prototype, "currentPage", void 0);
    __decorate([
        Property()
    ], Pager.prototype, "totalRecordsCount", void 0);
    __decorate([
        Property()
    ], Pager.prototype, "externalMessage", void 0);
    __decorate([
        Property(false)
    ], Pager.prototype, "pageSizes", void 0);
    __decorate([
        Property()
    ], Pager.prototype, "template", void 0);
    __decorate([
        Property('')
    ], Pager.prototype, "customText", void 0);
    __decorate([
        Event()
    ], Pager.prototype, "click", void 0);
    __decorate([
        Property('')
    ], Pager.prototype, "cssClass", void 0);
    __decorate([
        Event()
    ], Pager.prototype, "dropDownChanged", void 0);
    __decorate([
        Event()
    ], Pager.prototype, "created", void 0);
    Pager = __decorate([
        NotifyPropertyChanges
    ], Pager);
    return Pager;
}(Component));
export { Pager };
