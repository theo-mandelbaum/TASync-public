import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { EventHandler } from '@syncfusion/ej2-base';
import { attributes, createElement, classList, append } from '@syncfusion/ej2-base';
/**
 * `NumericContainer` module handles rendering and refreshing numeric container.
 */
var NumericContainer = /** @class */ (function () {
    /**
     * Constructor for numericContainer module
     *
     * @param {Pager} pagerModule - specifies the pagerModule
     * @hidden
     */
    function NumericContainer(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * The function is used to render numericContainer
     *
     * @returns {void}
     * @hidden
     */
    NumericContainer.prototype.render = function () {
        this.pagerElement = this.pagerModule.element;
        this.renderNumericContainer();
        this.refreshNumericLinks();
        this.wireEvents();
    };
    /**
     * Refreshes the numeric container of Pager.
     *
     * @returns {void}
     */
    NumericContainer.prototype.refresh = function () {
        this.pagerModule.updateTotalPages();
        if (this.links.length) {
            this.updateLinksHtml();
        }
        this.refreshAriaAttrLabel();
        this.updateStyles();
    };
    /**
     * The function is used to refresh refreshNumericLinks
     *
     * @returns {void}
     * @hidden
     */
    NumericContainer.prototype.refreshNumericLinks = function () {
        var link;
        var pagerObj = this.pagerModule;
        var div = pagerObj.element.querySelector('.e-numericcontainer');
        var frag = document.createDocumentFragment();
        div.innerHTML = '';
        for (var i = 1; i <= pagerObj.pageCount; i++) {
            link = createElement('a', {
                className: 'e-link e-numericitem e-spacing e-pager-default',
                attrs: { tabindex: '-1', 'aria-label': pagerObj.getLocalizedLabel('Page') + i + pagerObj.getLocalizedLabel('Of') +
                        pagerObj.totalPages + pagerObj.getLocalizedLabel('Pages'), href: '#' }
            });
            if (pagerObj.currentPage === i) {
                classList(link, ['e-currentitem', 'e-active'], ['e-pager-default']);
                link.setAttribute('aria-current', 'page');
            }
            frag.appendChild(link);
        }
        div.appendChild(frag);
        this.links = [].slice.call(div.childNodes);
    };
    /**
     * Binding events to the element while component creation
     *
     * @returns {void}
     * @hidden
     */
    NumericContainer.prototype.wireEvents = function () {
        EventHandler.add(this.pagerElement, 'click', this.clickHandler, this);
        EventHandler.add(this.pagerElement, 'auxclick', this.auxiliaryClickHandler, this);
    };
    /**
     * Unbinding events from the element while component destroy
     *
     * @returns {void}
     * @hidden
     */
    NumericContainer.prototype.unwireEvents = function () {
        EventHandler.remove(this.pagerModule.element, 'click', this.clickHandler);
        EventHandler.remove(this.pagerModule.element, 'auxclick', this.auxiliaryClickHandler);
    };
    /**
     * To destroy the PagerMessage
     *
     * @function destroy
     * @returns {void}
     * @hidden
     */
    NumericContainer.prototype.destroy = function () {
        this.unwireEvents();
    };
    NumericContainer.prototype.refreshAriaAttrLabel = function () {
        var pagerObj = this.pagerModule;
        var numericContainer = pagerObj.element.querySelector('.e-numericcontainer');
        var links = numericContainer.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            if (links[parseInt(i.toString(), 10)].hasAttribute('aria-label') && links[parseInt(i.toString(), 10)].hasAttribute('index')) {
                links[parseInt(i.toString(), 10)].setAttribute('aria-label', pagerObj.getLocalizedLabel('Page') + links[parseInt(i.toString(), 10)].getAttribute('index')
                    + pagerObj.getLocalizedLabel('Of') + pagerObj.totalPages + pagerObj.getLocalizedLabel('Pages'));
            }
        }
    };
    NumericContainer.prototype.renderNumericContainer = function () {
        this.element = createElement('div', {
            className: 'e-pagercontainer', attrs: { 'role': 'navigation' }
        });
        this.renderFirstNPrev(this.element);
        this.renderPrevPagerSet(this.element);
        this.element.appendChild(createElement('div', { className: 'e-numericcontainer' }));
        this.renderNextPagerSet(this.element);
        this.renderNextNLast(this.element);
        this.pagerModule.element.appendChild(this.element);
    };
    NumericContainer.prototype.renderFirstNPrev = function (pagerContainer) {
        this.first = createElement('div', {
            className: 'e-first e-icons e-icon-first',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('firstPageTooltip'),
                tabindex: '-1', role: 'button'
            }
        });
        this.prev = createElement('div', {
            className: 'e-prev e-icons e-icon-prev',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('previousPageTooltip'),
                tabindex: '-1', role: 'button'
            }
        });
        append([this.first, this.prev], pagerContainer);
    };
    NumericContainer.prototype.renderPrevPagerSet = function (pagerContainer) {
        var prevPager = createElement('div');
        this.PP = createElement('a', {
            className: 'e-link e-pp e-spacing', innerHTML: '...',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('previousPagerTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('previousPagerTooltip'),
                tabindex: '-1',
                href: '#'
            }
        });
        prevPager.appendChild(this.PP);
        pagerContainer.appendChild(prevPager);
    };
    NumericContainer.prototype.renderNextPagerSet = function (pagerContainer) {
        var nextPager = createElement('div');
        this.NP = createElement('a', {
            className: 'e-link e-np e-spacing',
            innerHTML: '...', attrs: {
                title: this.pagerModule.getLocalizedLabel('nextPagerTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('nextPagerTooltip'),
                tabindex: '-1',
                href: '#'
            }
        });
        nextPager.appendChild(this.NP);
        pagerContainer.appendChild(nextPager);
    };
    NumericContainer.prototype.renderNextNLast = function (pagerContainer) {
        this.next = createElement('div', {
            className: 'e-next e-icons e-icon-next',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('nextPageTooltip'),
                tabindex: '-1', role: 'button'
            }
        });
        this.last = createElement('div', {
            className: 'e-last e-icons e-icon-last',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('lastPageTooltip'),
                tabindex: '-1', role: 'button'
            }
        });
        append([this.next, this.last], pagerContainer);
    };
    NumericContainer.prototype.clickHandler = function (e) {
        var pagerObj = this.pagerModule;
        this.target = e.target;
        if (this.target.classList.contains('e-numericitem')) {
            e.preventDefault();
        }
        pagerObj.previousPageNo = pagerObj.currentPage;
        if (!this.target.classList.contains('e-disable') && !isNullOrUndefined(this.target.getAttribute('index'))) {
            pagerObj.currentPage = parseInt(this.target.getAttribute('index'), 10);
            this.pagerModule.isInteracted = true;
            pagerObj.dataBind();
        }
        return false;
    };
    NumericContainer.prototype.auxiliaryClickHandler = function (e) {
        this.target = e.target;
        if (this.target.classList.contains('e-numericitem') && (e.button === 1)) {
            e.preventDefault();
        }
    };
    NumericContainer.prototype.updateLinksHtml = function () {
        var pagerObj = this.pagerModule;
        var currentPageSet;
        var isLastSet;
        var pageNo;
        var numItems = this.pagerElement.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
        pagerObj.currentPage = pagerObj.totalPages === 1 ? 1 : pagerObj.currentPage;
        if (pagerObj.currentPage > pagerObj.totalPages && pagerObj.totalPages) {
            pagerObj.currentPage = pagerObj.totalPages;
        }
        currentPageSet = parseInt((pagerObj.currentPage / pagerObj.pageCount).toString(), 10);
        if (pagerObj.currentPage % pagerObj.pageCount === 0 && currentPageSet > 0) {
            currentPageSet = currentPageSet - 1;
        }
        for (var i = 0; i < pagerObj.pageCount; i++) {
            if (pagerObj.isPagerResized) {
                var focusedItem = this.pagerElement.querySelector('.e-focus');
                var focusedorTarget = this.target ? this.target : focusedItem ? focusedItem : null;
                var prevFocused = false;
                var nextFocused = false;
                var firstFocused = false;
                var lastFocused = false;
                var numItemFocused = false;
                var npFocused = false;
                var ppFocused = false;
                if (focusedorTarget) {
                    var classList_1 = focusedorTarget.classList;
                    if (classList_1.contains('e-icons')) {
                        switch (true) {
                            case classList_1.contains('e-prev'):
                                prevFocused = true;
                                break;
                            case classList_1.contains('e-next'):
                                nextFocused = true;
                                break;
                            case classList_1.contains('e-first'):
                                firstFocused = true;
                                break;
                            case classList_1.contains('e-last'):
                                lastFocused = true;
                                break;
                        }
                    }
                    else if (classList_1.contains('e-numericitem')) {
                        switch (true) {
                            case classList_1.contains('e-np'):
                                npFocused = true;
                                break;
                            case classList_1.contains('e-pp'):
                                ppFocused = true;
                                break;
                            default:
                                numItemFocused = classList_1.contains('e-numericitem');
                                break;
                        }
                    }
                }
                isLastSet = lastFocused || (this.pagerModule.keyAction === 'End');
                numItems = this.pagerElement.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
                var isPageAvailable = Array.from(numItems).some(function (item) { return parseInt(item.getAttribute('index'), 10) === pagerObj.currentPage; });
                //Setting pageNo to render based on key action or click action.
                if (firstFocused || this.pagerModule.keyAction === 'Home') {
                    pageNo = 1 + i;
                }
                else if (lastFocused || this.pagerModule.keyAction === 'End') {
                    pageNo = (currentPageSet * pagerObj.pageCount) + 1 + i;
                }
                else if (nextFocused || this.pagerModule.keyAction === 'ArrowRight' || prevFocused || this.pagerModule.keyAction === 'ArrowLeft') {
                    if (isPageAvailable) {
                        pageNo = parseInt(numItems[0].getAttribute('index'), 10) + i;
                    }
                    else if (prevFocused || this.pagerModule.keyAction === 'ArrowLeft') {
                        pageNo = parseInt(this.PP.getAttribute('index'), 10) + i;
                    }
                    else {
                        pageNo = pagerObj.currentPage + i;
                    }
                }
                else if (npFocused || ppFocused) {
                    pageNo = pagerObj.currentPage + i;
                }
                else if (numItemFocused) {
                    pageNo = (parseInt(numItems[0].getAttribute('index'), 10) + i);
                }
                else {
                    pageNo = (currentPageSet * pagerObj.pageCount) + 1 + i;
                }
            }
            else {
                pageNo = (currentPageSet * pagerObj.pageCount) + 1 + i;
            }
            if (pageNo <= pagerObj.totalPages) {
                this.links[parseInt(i.toString(), 10)].classList.remove('e-hide');
                this.links[parseInt(i.toString(), 10)].style.display = '';
                this.links[parseInt(i.toString(), 10)].setAttribute('index', pageNo.toString());
                this.links[parseInt(i.toString(), 10)].innerHTML = !pagerObj.customText ? pageNo.toString() : pagerObj.customText + pageNo;
                if (pagerObj.currentPage !== pageNo) {
                    this.links[parseInt(i.toString(), 10)].classList.add('e-pager-default');
                }
                else {
                    this.links[parseInt(i.toString(), 10)].classList.remove('e-pager-default');
                }
            }
            else {
                this.links[parseInt(i.toString(), 10)].innerHTML = !pagerObj.customText ? pageNo.toString() : pagerObj.customText + pageNo;
                this.links[parseInt(i.toString(), 10)].style.display = 'none';
            }
            classList(this.links[parseInt(i.toString(), 10)], [], ['e-currentitem', 'e-active']);
            this.links[parseInt(i.toString(), 10)].removeAttribute('aria-current');
        }
        attributes(this.first, {
            'index': '1',
            'title': this.pagerModule.getLocalizedLabel('firstPageTooltip')
        });
        attributes(this.pagerElement.querySelector('.e-mfirst'), {
            'index': '1',
            'title': this.pagerModule.getLocalizedLabel('firstPageTooltip')
        });
        attributes(this.last, {
            'index': pagerObj.totalPages.toString(),
            'title': this.pagerModule.getLocalizedLabel('lastPageTooltip')
        });
        attributes(this.pagerElement.querySelector('.e-mlast'), {
            'index': pagerObj.totalPages.toString(),
            'title': this.pagerModule.getLocalizedLabel('lastPageTooltip')
        });
        attributes(this.prev, {
            'index': (pagerObj.currentPage - 1).toString(),
            'title': this.pagerModule.getLocalizedLabel('previousPageTooltip')
        });
        attributes(this.pagerElement.querySelector('.e-mprev'), {
            'index': (pagerObj.currentPage - 1).toString(),
            'title': this.pagerModule.getLocalizedLabel('previousPageTooltip')
        });
        attributes(this.next, {
            'index': (pagerObj.currentPage + 1).toString(),
            'title': this.pagerModule.getLocalizedLabel('nextPageTooltip')
        });
        attributes(this.pagerElement.querySelector('.e-mnext'), {
            'index': (pagerObj.currentPage + 1).toString(),
            'title': this.pagerModule.getLocalizedLabel('nextPageTooltip')
        });
        var ppIndex = (this.pagerModule.isPagerResized && numItems.length)
            ? isLastSet
                ? parseInt(numItems[0].getAttribute('index'), 10) - pagerObj.avgNumItems
                : parseInt(numItems[0].getAttribute('index'), 10) - numItems.length
            : parseInt(this.links[0].getAttribute('index'), 10) - pagerObj.pageCount;
        attributes(this.PP, {
            'index': ((ppIndex < 1) ? '1' : ppIndex.toString()),
            'title': this.pagerModule.getLocalizedLabel('previousPagerTooltip'),
            'aria-label': this.pagerModule.getLocalizedLabel('previousPagerTooltip')
        });
        var NPIndex = (this.pagerModule.isPagerResized && numItems.length)
            ? parseInt(numItems[numItems.length - 1].getAttribute('index'), 10)
            : parseInt(this.links[this.links.length - 1].getAttribute('index'), 10);
        attributes(this.NP, {
            'index': (NPIndex + 1).toString(),
            'title': this.pagerModule.getLocalizedLabel('nextPagerTooltip'),
            'aria-label': this.pagerModule.getLocalizedLabel('nextPagerTooltip')
        });
        this.target = undefined;
    };
    NumericContainer.prototype.updateStyles = function () {
        var _this = this;
        this.updateFirstNPrevStyles();
        this.updatePrevPagerSetStyles();
        this.updateNextPagerSetStyles();
        this.updateNextNLastStyles();
        if (this.links.length) {
            var currentPageIndex = this.links.findIndex(function (link) { return link.getAttribute('index') === _this.pagerModule.currentPage.toString(); });
            var currentPage = (this.pagerModule.isPagerResized && currentPageIndex !== -1) ? currentPageIndex
                : ((this.pagerModule.currentPage - 1) % this.pagerModule.pageCount);
            if (this.links[parseInt(currentPage.toString(), 10)]) {
                classList(this.links[parseInt(currentPage.toString(), 10)], ['e-currentitem', 'e-active'], []);
                this.links[parseInt(currentPage.toString(), 10)].setAttribute('aria-current', 'page');
            }
        }
    };
    NumericContainer.prototype.updateFirstNPrevStyles = function () {
        var firstPage = ['e-firstpage', 'e-pager-default'];
        var firstPageDisabled = ['e-firstpagedisabled', 'e-disable'];
        var prevPage = ['e-prevpage', 'e-pager-default'];
        var prevPageDisabled = ['e-prevpagedisabled', 'e-disable'];
        if (this.pagerModule.totalPages > 0 && this.pagerModule.currentPage > 1) {
            classList(this.prev, prevPage, prevPageDisabled);
            classList(this.first, firstPage, firstPageDisabled);
            classList(this.pagerElement.querySelector('.e-mfirst'), firstPage, firstPageDisabled);
            classList(this.pagerElement.querySelector('.e-mprev'), prevPage, prevPageDisabled);
        }
        else {
            classList(this.prev, prevPageDisabled, prevPage);
            classList(this.first, firstPageDisabled, firstPage);
            classList(this.pagerElement.querySelector('.e-mprev'), prevPageDisabled, prevPage);
            classList(this.pagerElement.querySelector('.e-mfirst'), firstPageDisabled, firstPage);
        }
    };
    NumericContainer.prototype.updatePrevPagerSetStyles = function () {
        if (this.pagerModule.currentPage > this.pagerModule.pageCount || (this.pagerModule.isPagerResized
            && this.links.findIndex(function (link) { return parseInt(link.getAttribute('index'), 10) === 1; }))) {
            classList(this.PP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
        }
        else {
            classList(this.PP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
        }
    };
    NumericContainer.prototype.updateNextPagerSetStyles = function () {
        var pagerObj = this.pagerModule;
        var firstPage = this.links[0].innerHTML.replace(pagerObj.customText, '');
        var numItems = this.pagerElement.querySelectorAll('.e-numericitem:not(.e-hide):not([style*="display: none"]):not(.e-np):not(.e-pp)');
        if (!firstPage.length || !this.links.length || (parseInt(firstPage, 10) + pagerObj.pageCount > pagerObj.totalPages)
            || (pagerObj.isPagerResized && Array.from(numItems).some(function (item) { return parseInt(item.getAttribute('index'), 10) === pagerObj.totalPages; }))) {
            classList(this.NP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
        }
        else {
            classList(this.NP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
        }
    };
    NumericContainer.prototype.updateNextNLastStyles = function () {
        var lastPage = ['e-lastpage', 'e-pager-default'];
        var lastPageDisabled = ['e-lastpagedisabled', 'e-disable'];
        var nextPage = ['e-nextpage', 'e-pager-default'];
        var nextPageDisabled = ['e-nextpagedisabled', 'e-disable'];
        var pagerObj = this.pagerModule;
        if (pagerObj.currentPage === pagerObj.totalPages || pagerObj.totalRecordsCount === 0) {
            classList(this.last, lastPageDisabled, lastPage);
            classList(this.next, nextPageDisabled, nextPage);
            classList(this.pagerElement.querySelector('.e-mlast'), lastPageDisabled, lastPage);
            classList(this.pagerElement.querySelector('.e-mnext'), nextPageDisabled, nextPage);
        }
        else {
            classList(this.last, lastPage, lastPageDisabled);
            classList(this.next, nextPage, nextPageDisabled);
            classList(this.pagerElement.querySelector('.e-mlast'), lastPage, lastPageDisabled);
            classList(this.pagerElement.querySelector('.e-mnext'), nextPage, nextPageDisabled);
        }
    };
    return NumericContainer;
}());
export { NumericContainer };
