var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createElement, Browser, isNullOrUndefined, isBlazor, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { AjaxHandler, ExtractTextOption } from '../index';
import { createSpinner, showSpinner, hideSpinner } from '../index';
import { Rect } from '@syncfusion/ej2-drawings';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { PdfViewerUtils, TaskPriorityLevel } from '../base/pdfviewer-utlis';
var searchTextCollection = [];
/**
 * TextSearch module
 *
 * @param {Event} event - event
 * @returns {void}
 */
var TextSearch = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdf viewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    function TextSearch(pdfViewer, pdfViewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.isTextSearch = false;
        /**
         * @private
         */
        this.searchCount = 0;
        /**
         * @private
         */
        this.currentOccurrence = 0;
        this.searchIndex = 0;
        this.currentSearchIndex = 0;
        this.startIndex = null;
        /**
         * @private
         */
        this.searchPageIndex = null;
        this.startSearchPageIndex = null;
        this.searchString = null;
        this.isMatchCase = false;
        this.isMultiSearch = false;
        this.isSingleSearch = false;
        this.findTextDocumentCollection = [];
        this.searchRequestHandler = null;
        this.textSearchHandleRequest = null;
        /**
         * @private
         */
        this.isTextSearchHandled = false;
        this.textSearchOpen = false;
        /**
         * @private
         */
        this.programaticalSearch = false;
        /**
         * @private
         */
        this.isFiltering = false;
        this.textContents = [];
        /**
         * @private
         */
        this.searchMatches = [];
        this.multiSearchCounts = {};
        this.getSearchTextDetails = {};
        this.searchedPages = [];
        this.isPrevSearch = false;
        this.isExactMatch = false;
        this.autompleteDataSource = [];
        this.searchedOccurrences = [];
        this.isSelectedFromPopup = false;
        /**
         * @private
         */
        this.isDocumentTextCollectionReady = false;
        this.intervalId = null;
        /**
         * @private
         */
        this.searchTextDivzIndex = '-1';
        this.tempElementStorage = [];
        /**
         * @private
         */
        this.isMessagePopupOpened = false;
        /**
         * @private
         */
        this.isTextRetrieved = false;
        this.isTextSearched = false;
        this.isTextSearchEventTriggered = false;
        this.isSearchText = false;
        this.isLastOccurrenceCompleted = false;
        this.checkBoxOnChange = function (event) {
            if (event.checked) {
                _this.isMatchCase = true;
                _this.searchString = '';
                if (_this.searchInput.value && _this.searchInput.value !== '') {
                    _this.isTextSearch = true;
                }
            }
            else {
                _this.isMatchCase = false;
                _this.searchString = '';
                if (_this.searchInput.value && _this.searchInput.value !== '') {
                    _this.isTextSearch = true;
                }
            }
            if (_this.isTextSearch && _this.isDocumentTextCollectionReady) {
                _this.resetVariables();
                _this.clearAllOccurrences();
                var inputString = _this.searchInput.value;
                _this.searchIndex = 0;
                _this.initiateTextSearch(inputString);
                if (_this.searchCount === 0 && !_this.isMessagePopupOpened) {
                    _this.onMessageBoxOpen();
                }
            }
        };
        this.searchKeypressHandler = function (event) {
            var char = String.fromCharCode(event.which || event.keyCode);
            var isAlphanumeric = /[a-zA-Z0-9]/.test(char);
            var isSpecialCharacter = function (char) { return /[!@#$%^&*(),.?":{}|<>]/.test(char); };
            if ((isAlphanumeric || isSpecialCharacter) && !(event.ctrlKey || event.altKey)) {
                _this.initiateTextSearch(_this.searchInput.value);
                _this.updateSearchInputIcon(false);
            }
            else {
                _this.resetVariables();
            }
        };
        this.searchClickHandler = function (event) {
            _this.searchButtonClick(_this.searchBtn, _this.searchAutocompleteObj);
        };
        this.nextButtonOnClick = function (event) {
            _this.searchString = _this.searchInput.value;
            _this.nextSearch();
        };
        this.prevButtonOnClick = function (event) {
            _this.searchString = _this.searchInput.value;
            _this.prevSearch();
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.createTextSearchBox = function () {
        var _this = this;
        this.searchBox = createElement('div', { id: this.pdfViewer.element.id + '_search_box', className: 'e-pv-text-search-bar' });
        var toolbarElement;
        if (isBlazor()) {
            toolbarElement = document.getElementById('toolbarContainer');
        }
        else {
            toolbarElement = this.pdfViewerBase.getElement('_toolbarContainer');
        }
        if (toolbarElement) {
            if (isBlazor()) {
                this.searchBox.style.top = toolbarElement.clientHeight + 'px';
            }
            else {
                this.searchBox.style.top = toolbarElement.clientHeight + 'px';
            }
        }
        var searchElementsContainer = createElement('div', { id: this.pdfViewer.element.id + '_search_box_elements', className: 'e-pv-text-search-bar-elements' });
        this.searchInputContainer = createElement('div', { id: this.pdfViewer.element.id + '_search_input_container', className: 'e-input-group e-pv-text-search-input' });
        this.searchInput = createElement('input', { id: this.pdfViewer.element.id + '_search_input', className: 'e-input e-pv-search-input-ele' });
        var tempData = {
            matches: [
                { 'SearchString': '', 'Count': '' }
            ]
        };
        var isFirst = false;
        this.searchAutocompleteObj = new AutoComplete({
            dataSource: tempData.matches,
            fields: { value: 'SearchString' },
            headerTemplate: "<div class=\"e-pv-automplete-header\"><span class=\"e-pv-search-exact-matches\">" + this.pdfViewer.localeObj.getConstant('Exact Matches') + "</span><span class=\"e-pv-total-exact-matches\"></span></div>",
            itemTemplate: '<div class="e-pv-autocomplete-item">' +
                '<span class="e-pv-autocomplete-word"> ${SearchString} </span><span class="e-pv-autocomplete-count">${Count}</span></div>',
            placeholder: this.pdfViewer.localeObj.getConstant('Find in document'),
            popupHeight: '200px',
            beforeOpen: function (event) {
                if (Array.isArray(_this.autompleteDataSource) && (_this.autompleteDataSource.length === 0)) {
                    event.cancel = true;
                }
            },
            select: function (event) {
                _this.isSelectedFromPopup = true;
                _this.isSingleSearch = true;
                _this.isMultiSearch = false;
                _this.isExactMatch = true;
                _this.initiateSearch(event.itemData.SearchString);
            },
            filtering: function (event) {
                if (!_this.isDocumentTextCollectionReady) {
                    _this.resetVariablesTextSearch();
                    _this.clearAllOccurrences();
                }
                _this.isSelectedFromPopup = false;
                if (_this.searchCountEle) {
                    _this.searchCountEle.innerHTML = '';
                    _this.adjustInputContainerWidth();
                }
                _this.isSingleSearch = false;
                _this.isExactMatch = false;
                _this.isMultiSearch = _this.matchAnyWordCheckBox.checked;
                _this.initiateTextSearch(event.text);
                if (event.text === '') {
                    clearInterval(_this.intervalId);
                    _this.showLoadingIndicator(false);
                }
                _this.searchString = '';
                if (_this.documentTextCollection.length === _this.pdfViewerBase.pageCount) {
                    _this.isDocumentTextCollectionReady = true;
                }
                var updateInterval = setInterval(function () {
                    if (_this.documentTextCollection.length === _this.pdfViewerBase.pageCount) {
                        event.updateData(_this.autompleteDataSource, null);
                        if (Array.isArray(_this.autompleteDataSource) && (_this.autompleteDataSource.length !== 0)) {
                            var dataSourceInfo = _this.autompleteDataSource;
                            var totalCount = dataSourceInfo.reduce(function (acc, obj) {
                                return acc + parseInt(obj.Count, 10);
                            }, 0);
                            document.querySelector('.e-pv-total-exact-matches').innerHTML = totalCount;
                            if (_this.isMultiSearch) {
                                document.querySelector('.e-pv-search-exact-matches').innerHTML = _this.pdfViewer.localeObj.getConstant('Total Matches');
                            }
                            else {
                                document.querySelector('.e-pv-search-exact-matches').innerHTML = _this.pdfViewer.localeObj.getConstant('Exact Matches');
                            }
                        }
                        else if (_this.autompleteDataSource.length === 0) {
                            var element = document.querySelector('.e-pv-total-exact-matches');
                            if (!isNullOrUndefined(element)) {
                                element.innerHTML = '0';
                            }
                            _this.searchAutocompleteObj.hidePopup();
                        }
                        clearInterval(updateInterval);
                        _this.isDocumentTextCollectionReady = true;
                    }
                }, 1000);
            },
            created: function (event) {
                _this.searchAutocompleteObj.element.addEventListener('keydown', function (args) {
                    if (args.key === 'Enter') {
                        _this.isSingleSearch = true;
                        _this.isExactMatch = _this.isSelectedFromPopup;
                        _this.isMultiSearch = false;
                        if (!_this.isDocumentTextCollectionReady && _this.pdfViewerBase.clientSideRendering) {
                            if (_this.searchInput.value !== '' && _this.searchInput.value !== _this.searchString) {
                                _this.isTextSearchHandled = false;
                                _this.searchCount = 0;
                                _this.searchIndex = 0;
                                _this.searchPageIndex = 0;
                                _this.textSearchWhileLoading(_this.searchInput.value, _this.isMatchCase);
                                _this.searchString = _this.searchInput.value;
                            }
                            if (_this.isTextSearchHandled) {
                                _this.nextSearch();
                            }
                        }
                        else {
                            _this.initiateTextSearch(_this.searchInput.value);
                        }
                        if (_this.searchCount === 0 && !_this.isMessagePopupOpened &&
                            _this.documentTextCollection.length === _this.pdfViewerBase.pageCount) {
                            _this.onMessageBoxOpen();
                        }
                    }
                });
                _this.searchAutocompleteObj.element.parentElement.querySelector('.e-clear-icon').addEventListener('mousedown', function (args) {
                    _this.showLoadingIndicator(false);
                    clearInterval(_this.intervalId);
                    _this.searchInput.value = '';
                    _this.resetTextSearch();
                    if (_this.searchCountEle) {
                        _this.searchCountEle.innerHTML = '';
                        _this.adjustInputContainerWidth();
                    }
                    _this.searchInput.focus();
                    _this.searchString = '';
                });
            }
        });
        this.searchBtn = createElement('span', { id: this.pdfViewer.element.id + '_search_box-icon', className: 'e-input-group-icon e-input-search-group-icon e-pv-search-icon' });
        this.searchBtn.setAttribute('tabindex', '0');
        this.searchInputContainer.appendChild(this.searchInput);
        this.searchAutocompleteObj.appendTo(this.searchInput);
        searchElementsContainer.appendChild(this.searchInputContainer);
        this.searchCountEle = createElement('span', { id: this.pdfViewer.element.id + '_search_count', className: 'e-pv-search-count', innerHTML: '' });
        searchElementsContainer.appendChild(this.searchCountEle);
        if (this.pdfViewer.enableRtl) {
            this.prevSearchBtn = this.createSearchBoxButtons('prev_occurrence', 'e-pv-next-search');
        }
        else {
            this.prevSearchBtn = this.createSearchBoxButtons('prev_occurrence', 'e-pv-prev-search');
        }
        this.prevSearchBtn.setAttribute('aria-label', 'Previous Search text');
        searchElementsContainer.appendChild(this.prevSearchBtn);
        if (this.pdfViewer.enableRtl) {
            this.nextSearchBtn = this.createSearchBoxButtons('next_occurrence', 'e-pv-prev-search');
        }
        else {
            this.nextSearchBtn = this.createSearchBoxButtons('next_occurrence', 'e-pv-next-search');
        }
        this.nextSearchBtn.setAttribute('aria-label', 'Next Search text');
        searchElementsContainer.appendChild(this.nextSearchBtn);
        var matchCaseContainer = createElement('div', { id: this.pdfViewer.element.id + '_match_case_container', className: 'e-pv-textsearch-match-case-container' });
        var matchCaseInput = createElement('input', { id: this.pdfViewer.element.id + '_match_case' });
        matchCaseInput.type = 'checkbox';
        if (isBlazor()) {
            matchCaseInput.style.height = '17px';
            matchCaseInput.style.width = '17px';
            matchCaseInput.addEventListener('change', this.checkBoxOnChange.bind(this));
        }
        matchCaseContainer.appendChild(matchCaseInput);
        var matchAnyWordInput = createElement('input', { id: this.pdfViewer.element.id + '_match_any_word' });
        matchAnyWordInput.type = 'checkbox';
        matchCaseContainer.appendChild(matchAnyWordInput);
        this.searchBox.appendChild(searchElementsContainer);
        this.searchBox.appendChild(matchCaseContainer);
        this.pdfViewerBase.mainContainer.appendChild(this.searchBox);
        if (isBlazor()) {
            var matchCaseText_1 = createElement('span', { id: this.pdfViewer.element.id + '_search_box_text', styles: 'position: absolute; padding-top: 3px; padding-left: 8px; padding-right: 8px; font-size: 13px' });
            var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Matchcase');
            promise.then(function (value) {
                matchCaseText_1.textContent = value;
            });
            matchCaseContainer.appendChild(matchCaseText_1);
        }
        else {
            var checkBox = new CheckBox({ cssClass: 'e-pv-match-case', label: this.pdfViewer.localeObj.getConstant('Match case'), htmlAttributes: { 'tabindex': '0' }, change: this.checkBoxOnChange.bind(this) });
            checkBox.appendTo(matchCaseInput);
            this.matchAnyWordCheckBox = new CheckBox({
                cssClass: 'e-pv-match-any-word', label: this.pdfViewer.localeObj.getConstant('Match any word'), htmlAttributes: { 'tabindex': '0' }, change: function () {
                    _this.isMultiSearch = _this.matchAnyWordCheckBox.checked;
                }
            });
            this.matchAnyWordCheckBox.appendTo(matchAnyWordInput);
        }
        matchCaseContainer.firstElementChild.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.target.click();
                event.preventDefault();
                event.stopPropagation();
            }
        });
        matchAnyWordInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.target.click();
                event.preventDefault();
                event.stopPropagation();
            }
        });
        var waitingPopup = createElement('div', { id: this.pdfViewer.element.id + '_textSearchLoadingIndicator' });
        this.searchInputContainer.appendChild(waitingPopup);
        waitingPopup.style.position = 'absolute';
        waitingPopup.style.top = '15px';
        waitingPopup.style.left = this.searchInputContainer.clientWidth - 46 + 'px';
        createSpinner({ target: waitingPopup, cssClass: 'e-spin-center' });
        this.setLoaderProperties(waitingPopup);
        this.showSearchBox(false);
        if (this.pdfViewer.enableRtl) {
            this.searchBox.classList.add('e-rtl');
            this.searchBox.style.left = '88.3px';
        }
        else {
            this.searchBox.classList.remove('e-rtl');
            this.searchBox.style.right = '88.3px';
        }
        this.searchBtn.addEventListener('click', this.searchClickHandler.bind(this));
        this.searchBtn.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                _this.searchClickHandler(event);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        this.nextSearchBtn.addEventListener('click', this.nextButtonOnClick.bind(this));
        this.prevSearchBtn.addEventListener('click', this.prevButtonOnClick.bind(this));
    };
    TextSearch.prototype.setLoaderProperties = function (element) {
        var spinnerElement = element.firstChild.firstChild.firstChild;
        if (spinnerElement) {
            spinnerElement.style.height = '18px';
            spinnerElement.style.width = '18px';
            spinnerElement.style.transformOrigin = '9px 9px 9px';
        }
    };
    TextSearch.prototype.showLoadingIndicator = function (isShow) {
        var waitingPopup = document.getElementById(this.pdfViewer.element.id + '_textSearchLoadingIndicator');
        if (waitingPopup) {
            if (isShow) {
                showSpinner(waitingPopup);
            }
            else {
                hideSpinner(waitingPopup);
            }
        }
    };
    TextSearch.prototype.textSearchWhileLoading = function (searchWord, isMatchCase, startIndex, endIndex, isFirstResult, isCompleted) {
        var endPage = endIndex ? endIndex : 100;
        var isPagesCompleted = isCompleted ? isCompleted : false;
        if (endPage >= this.pdfViewerBase.pageCount) {
            endPage = this.pdfViewerBase.pageCount;
            isPagesCompleted = true;
        }
        if (!this.pdfViewerBase.clientSideRendering) {
            // eslint-disable-next-line
            var proxy_1 = this;
            var jsonObject = { text: searchWord, matchCase: isMatchCase, documentId: this.pdfViewerBase.getDocumentId(), hashId: this.pdfViewerBase.hashId, action: 'SearchTextPdf', elementId: this.pdfViewer.element.id, uniqueId: this.pdfViewerBase.documentId, startIndex: startIndex ? startIndex : 0, endIndex: endPage, isCompleted: isPagesCompleted, isRequestsend: !isNullOrUndefined(isFirstResult) ? isFirstResult : true };
            this.textSearchHandleRequest = new AjaxHandler(this.pdfViewer);
            this.textSearchHandleRequest.url = this.pdfViewer.serviceUrl + '/' + 'SearchTextPdf';
            this.textSearchHandleRequest.responseType = 'json';
            this.textSearchHandleRequest.send(jsonObject);
            this.textSearchHandleRequest.onSuccess = function (result) {
                var data = result.data;
                if (data) {
                    try {
                        proxy_1.searchTextAfteresult(data.resultPages, data.totalSearchCount, data.searchWord, data.matchCase, (data.isRequestsend.toLowerCase() === 'true'), (data.isCompleted.toLowerCase() === 'true'), data.endIndex);
                    }
                    catch (error) {
                        data = null;
                    }
                }
            };
        }
        if (this.pdfViewerBase.clientSideRendering) {
            this.pdfViewerBase.pdfViewerRunner.addTask({
                message: 'searchText',
                zoomFactor: this.pdfViewerBase.getZoomFactor(),
                searchWord: searchWord,
                matchCase: isMatchCase,
                startIndex: startIndex ? startIndex : 0,
                endIndex: endPage,
                isCompleted: isPagesCompleted,
                isRequestsend: !isNullOrUndefined(isFirstResult) ? isFirstResult : false
            }, TaskPriorityLevel.Medium);
        }
    };
    /**
     * @param {any} resultPages - Result of the text search word
     * @param {number} totalSearchCount - Search count of the word
     * @param {string} searchWord - Word that given for the text search
     * @param {boolean} matchCase - It gives about the match case
     * @param {boolean} isFirstResult - It gives first result from the request
     * @param {boolean} isCompleted - It gives the search complete indication
     * @param {number} endIndex - It describes end pageindex of the result
     * @private
     * @returns {void}
     */
    TextSearch.prototype.searchTextAfteresult = function (resultPages, totalSearchCount, searchWord, matchCase, isFirstResult, isCompleted, endIndex) {
        if (totalSearchCount === 0 && this.searchCount === 0) {
            if (isCompleted) {
                this.isTextSearchHandled = true;
                this.pdfViewerBase.createNotificationPopup(this.pdfViewer.localeObj.getConstant('No Matches'));
                this.showLoadingIndicator(false);
            }
        }
        else {
            if (this.isSingleSearch && this.searchString === searchWord && this.isMatchCase === matchCase && (this.textSearchOpen ||
                this.programaticalSearch)) {
                this.isTextSearchHandled = true;
                var details = this.getSearchTextDetails;
                this.getSearchTextDetails = __assign({}, details, resultPages);
                this.hightlightSearchedTexts(this.searchPageIndex, isFirstResult);
                if (isCompleted) {
                    this.showLoadingIndicator(false);
                }
                else {
                    this.showLoadingIndicator(true);
                }
                this.searchCount = this.searchCount + totalSearchCount;
                if (!isFirstResult) {
                    this.currentOccurrence = 1;
                    this.searchedOccurrences.push(this.currentOccurrence);
                    if (this.searchedOccurrences.length === 1) {
                        this.pdfViewer.fireTextSearchStart(this.searchString, this.isMatchCase);
                    }
                }
                this.searchCountEle.style.display = 'inline-block';
                this.getSearchCountText();
                this.updateLoadingIndicator();
            }
        }
        if (!isCompleted && this.searchString === searchWord && (this.textSearchOpen || this.programaticalSearch)) {
            this.textSearchWhileLoading(searchWord, matchCase, endIndex, endIndex + 100, (this.searchCount !== 0) ? true : false, isCompleted);
        }
    };
    TextSearch.prototype.updateLoadingIndicator = function () {
        var loadingIndicator = document.getElementById(this.pdfViewer.element.id + '_textSearchLoadingIndicator');
        loadingIndicator.style.left = this.searchInputContainer.clientWidth - 46 + 'px';
    };
    /**
     * @param {number} pageNumber - It decribes the search pageIndex value
     * @param {boolean} isPageChange - It describes the first result highlight
     * @param {boolean} isSearchCompleted - It describes the text search has been completed or not.
     * @private
     * @returns {void}
     */
    TextSearch.prototype.hightlightSearchedTexts = function (pageNumber, isPageChange, isSearchCompleted) {
        this.clearAllOccurrences();
        var elementIdCount;
        var keys = [];
        for (var key in this.getSearchTextDetails) {
            if (Object.prototype.hasOwnProperty.call(this.getSearchTextDetails, key)) {
                keys.push(parseInt(key, 10));
            }
        }
        keys.sort(function (a, b) { return a - b; });
        if (!isNullOrUndefined(pageNumber)) {
            var previous = keys[keys.length - 1];
            var next = keys[0];
            for (var i = 0; i < keys.length; i++) {
                if (keys[parseInt(i.toString(), 10)] < pageNumber) {
                    previous = keys[parseInt(i.toString(), 10)];
                }
                else if (keys[parseInt(i.toString(), 10)] > pageNumber) {
                    next = keys[parseInt(i.toString(), 10)];
                    break;
                }
            }
            if (!this.getSearchTextDetails[parseInt(pageNumber.toString(), 10)]) {
                pageNumber = next;
            }
            if ((this.searchIndex + 1) > this.getSearchTextDetails[parseInt(pageNumber.toString(), 10)].pageOccurrence ||
                this.searchIndex < 0) {
                if ((this.searchIndex + 1) > this.getSearchTextDetails[parseInt(pageNumber.toString(), 10)].pageOccurrence) {
                    pageNumber = ((pageNumber + 1) === keys[keys.length - 1]) ? 0 : next;
                    this.searchIndex = 0;
                }
                if (this.searchIndex < 0) {
                    pageNumber = ((pageNumber - 1) === -1) ? keys[keys.length - 1] : previous;
                    this.searchIndex = (this.getSearchTextDetails[parseInt(pageNumber.toString(), 10)].pageOccurrence - 1);
                }
            }
        }
        for (var key in this.getSearchTextDetails) {
            if (Object.prototype.hasOwnProperty.call(this.getSearchTextDetails, key)) {
                var value = this.getSearchTextDetails[parseInt(key.toString(), 10)];
                var idSearchIndexCount = 0;
                // eslint-disable-next-line guard-for-in
                for (var boundsKey in value.Bounds) {
                    if (Object.prototype.hasOwnProperty.call(value.Bounds, boundsKey)) {
                        var bounds = value.Bounds[parseInt(boundsKey.toString(), 10)];
                        for (var i = 0; i < bounds.length; i++) {
                            var leftValue = (this.pdfViewerBase.clientSideRendering === true) ?
                                bounds[parseInt(i.toString(), 10)].Left :
                                this.pdfViewerBase.ConvertPointToPixel(bounds[parseInt(i.toString(), 10)].Left);
                            var topValue = (this.pdfViewerBase.clientSideRendering === true) ?
                                bounds[parseInt(i.toString(), 10)].Top :
                                this.pdfViewerBase.ConvertPointToPixel(bounds[parseInt(i.toString(), 10)].Top);
                            var heightValue = (this.pdfViewerBase.clientSideRendering === true) ?
                                bounds[parseInt(i.toString(), 10)].Height :
                                this.pdfViewerBase.ConvertPointToPixel(bounds[parseInt(i.toString(), 10)].Height);
                            var widthValue = (this.pdfViewerBase.clientSideRendering === true) ?
                                bounds[parseInt(i.toString(), 10)].Width :
                                this.pdfViewerBase.ConvertPointToPixel(bounds[parseInt(i.toString(), 10)].Width);
                            var pageIndex = null;
                            if (isNullOrUndefined(isSearchCompleted)) {
                                pageIndex = pageNumber ? pageNumber : keys[0];
                            }
                            else {
                                if (isSearchCompleted) {
                                    pageIndex = null;
                                }
                            }
                            if ((this.searchIndex === idSearchIndexCount) && pageIndex === Number(key)) {
                                elementIdCount = idSearchIndexCount;
                                if ((!isNullOrUndefined(isPageChange) && !isPageChange) || isNullOrUndefined(isPageChange)) {
                                    this.pdfViewerBase.updateScrollTop(Number(key));
                                }
                                var idString = '_searchtext_' + Number(key) + '_' + idSearchIndexCount;
                                var element = void 0;
                                if (bounds.length <= 1 || i === 0) {
                                    element = document.getElementById(this.pdfViewer.element.id + idString);
                                }
                                else {
                                    element = document.getElementById(this.pdfViewer.element.id + idString + '_' + i);
                                }
                                if (element) {
                                    element.parentElement.removeChild(element);
                                }
                                this.searchPageIndex = Number(key);
                                this.createSearchTextDiv(idSearchIndexCount, Number(key), heightValue, widthValue, topValue, leftValue, 'e-pv-search-text-highlight', false, 0, i);
                            }
                            else {
                                this.createSearchTextDiv(idSearchIndexCount, Number(key), heightValue, widthValue, topValue, leftValue, 'e-pv-search-text-highlightother', false, 0, i);
                            }
                        }
                    }
                    idSearchIndexCount++;
                }
            }
        }
        if ((!isNullOrUndefined(isPageChange) && !isPageChange) || isNullOrUndefined(isPageChange)) {
            var element = this.pdfViewerBase.getElement('_searchtext_' + this.searchPageIndex + '_' + elementIdCount);
            var scrollPoint = { y: -100, x: -100 };
            this.scrollToSearchStr(element, scrollPoint);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.textSearchBoxOnResize = function () {
        if (this.pdfViewer.toolbarModule && this.pdfViewer.enableToolbar) {
            var secondaryToolbar = this.pdfViewerBase.getElement('_toolbarContainer_popup');
            if (secondaryToolbar) {
                if (secondaryToolbar.contains(this.pdfViewerBase.getElement('_search').parentElement)) {
                    this.searchBox.style.right = '0px';
                }
            }
        }
        else {
            if (this.pdfViewerBase.viewerContainer.clientWidth + this.pdfViewerBase.viewerContainer.offsetLeft <
                this.searchBox.offsetLeft + this.searchBox.clientWidth) {
                this.searchBox.style.right = '0px';
                this.searchBox.style.width = parseInt(this.searchBox.style.width, 10) - ((this.searchBox.offsetLeft + this.searchBox.clientWidth) - (this.pdfViewerBase.viewerContainer.clientWidth)) + 'px';
                this.searchInput.style.width = parseInt(this.searchInput.style.width, 10) - ((this.searchBox.offsetLeft + this.searchBox.clientWidth) - (this.pdfViewerBase.viewerContainer.clientWidth)) + 'px';
            }
            else {
                this.searchBox.style.right = '88.3px';
                this.searchBox.style.width = '';
                this.searchInput.style.width = '';
            }
        }
    };
    /**
     * @param {boolean} isShow - It describes about the isShow
     * @private
     * @returns {void}
     */
    TextSearch.prototype.showSearchBox = function (isShow) {
        if (!isNullOrUndefined(this.searchBox)) {
            if (isShow) {
                this.searchBox.style.display = 'block';
                this.textSearchOpen = true;
            }
            else {
                this.searchBox.style.display = 'none';
                this.searchInput.value = '';
                this.searchCountEle.style.display = 'none';
                if (this.pdfViewer.toolbarModule) {
                    this.pdfViewer.toolbarModule.isTextSearchBoxDisplayed = false;
                }
                this.textSearchOpen = false;
            }
            this.onTextSearchClose();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.searchAfterSelection = function () {
        if (this.currentOccurrence === 0) {
            this.searchPageIndex = this.pdfViewerBase.currentPageNumber - 1;
            this.startSearchPageIndex = this.searchPageIndex;
        }
        if (this.isTextSearch) {
            if (this.currentOccurrence !== 0) {
                this.initSearch(this.searchPageIndex, true);
                this.highlightOthers();
            }
        }
    };
    TextSearch.prototype.calculateSearchCount = function (inputString, documentTextCollection) {
        var _this = this;
        this.searchCount = 0;
        if (!this.isTextSearchHandled) {
            this.currentOccurrence = 0;
            this.resetVariables();
            this.searchIndex = 0;
        }
        if (!inputString || inputString.trim() === '') {
            if (this.searchCountEle) {
                this.searchCountEle.innerHTML = '';
                this.adjustInputContainerWidth();
            }
            return;
        }
        if (this.isMultiSearch) {
            if (this.searchCountEle) {
                this.searchCountEle.innerHTML = '';
                this.adjustInputContainerWidth();
            }
            var wordsToSearch = inputString.split(' ');
            this.multiSearchCounts = {};
            for (var _i = 0, wordsToSearch_1 = wordsToSearch; _i < wordsToSearch_1.length; _i++) {
                var word = wordsToSearch_1[_i];
                word = word.trim();
                if (word === '') {
                    continue;
                }
                var wordCount = 0;
                for (var i = 0; i < documentTextCollection.length; i++) {
                    var pageIndex = parseInt(Object.keys(documentTextCollection[parseInt(i.toString(), 10)])[0], 10);
                    var documentIndex = documentTextCollection[parseInt(i.toString(), 10)][parseInt(pageIndex.toString(), 10)];
                    var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                    if (!this.isMatchCase) {
                        pageTextData = pageTextData.toLowerCase();
                        word = word.toLowerCase();
                    }
                    var matchIndex = pageTextData.indexOf(word);
                    while (matchIndex !== -1) {
                        wordCount++;
                        matchIndex = pageTextData.indexOf(word, matchIndex + 1);
                    }
                }
                this.multiSearchCounts["" + word] = wordCount;
            }
            var transformedData_1 = Object.keys(this.multiSearchCounts).map(function (key) { return ({
                SearchString: key,
                Count: _this.multiSearchCounts["" + key].toString()
            }); });
            this.autompleteDataSource = transformedData_1;
            return;
        }
        var wordCounts = {};
        for (var i = 0; i < documentTextCollection.length; i++) {
            var pageIndex = parseInt(Object.keys(documentTextCollection[parseInt(i.toString(), 10)])[0], 10);
            var documentIndex = documentTextCollection[parseInt(i.toString(), 10)][parseInt(pageIndex.toString(), 10)];
            var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
            var multiSearch = (pageTextData.replace((/(\s\r\n)/gm), ' ')).replace((/(\r\n)/gm), ' ');
            var Multiline = (pageTextData.replace((/(\s\r\n)/gm), '  ')).replace((/(\r\n)/gm), ' ');
            var specialCharcterSearch = multiSearch.replace(/[^a-zA-Z0-9]+/g, ' ');
            var arrayReturns = void 0;
            var queryLength = inputString.length;
            var matches = [];
            var matchedArray = [];
            var matchIndex = -queryLength;
            var newIndex = -queryLength;
            var multiSearchIndex = -queryLength;
            var MultilineIndex = -queryLength;
            var specialcharcterIndex = -queryLength;
            if (!this.isMatchCase) {
                inputString = inputString.toLowerCase();
                pageTextData = pageTextData.toLowerCase();
                multiSearch = multiSearch.toLowerCase();
                Multiline = Multiline.toLowerCase();
                specialCharcterSearch = specialCharcterSearch.toLowerCase();
            }
            while (matchIndex !== 0 || (matchIndex === 0 && matches.length > 0 && matches[0] === 0)) {
                if (!inputString || inputString === ' ') {
                    break;
                }
                if (this.isExactMatch) {
                    var match = void 0;
                    // eslint-disable-next-line
                    var escapedInputString = inputString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    // eslint-disable-next-line
                    var regex_1 = new RegExp("(?<!\\w)" + escapedInputString + "(?!\\w)", 'g');
                    match = regex_1.exec(pageTextData);
                    while (match !== null) {
                        matches.push(match.index);
                        match = regex_1.exec(pageTextData);
                    }
                    break;
                }
                matchIndex = pageTextData.indexOf(inputString, matchIndex + queryLength);
                if (inputString.indexOf(' ') !== -1) {
                    var newString = inputString.replace(' ', '\r\n');
                    newIndex = pageTextData.indexOf(newString, newIndex + queryLength);
                    if (!(newIndex <= -1)) {
                        if (newIndex < matchIndex) {
                            matches.push(newIndex);
                        }
                    }
                }
                if (matchIndex <= -1 && newIndex <= -1) {
                    break;
                }
                if (!(matchIndex <= -1)) {
                    matches.push(matchIndex);
                }
                if (newIndex > matchIndex && !(newIndex <= -1)) {
                    matches.push(newIndex);
                }
            }
            if (matches.length === 0) {
                multiSearchIndex = multiSearch.indexOf(inputString, multiSearchIndex + queryLength);
                MultilineIndex = Multiline.indexOf(inputString, MultilineIndex + queryLength);
                specialcharcterIndex = specialCharcterSearch.indexOf(inputString, specialcharcterIndex + queryLength);
                if (multiSearchIndex !== -1) {
                    arrayReturns = this.correctLinetext(inputString, matchIndex, pageTextData);
                    matchIndex = -arrayReturns[0].length;
                    for (var i_1 = 0; i_1 < arrayReturns.length; i_1++) {
                        matchIndex = pageTextData.indexOf(arrayReturns[parseInt(i_1.toString(), 10)].trim(), matchIndex + (arrayReturns[i_1 - 1] === undefined ||
                            null ? arrayReturns[0].length : arrayReturns[i_1 - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                            }
                            else {
                                i_1 = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                else if (specialcharcterIndex !== -1) {
                    arrayReturns = this.correctLinetext(inputString, matchIndex, pageTextData);
                    matchIndex = -arrayReturns[0].length;
                    for (var i_2 = 0; i_2 < arrayReturns.length; i_2++) {
                        matchIndex = pageTextData.indexOf(arrayReturns[parseInt(i_2.toString(), 10)].trim(), matchIndex + (arrayReturns[i_2 - 1] === undefined ||
                            null ? arrayReturns[0].length : arrayReturns[i_2 - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                            }
                            else {
                                i_2 = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                else if (MultilineIndex !== -1) {
                    arrayReturns = this.correctLinetext(inputString, matchIndex, pageTextData);
                    matchIndex = -arrayReturns[0].length;
                    for (var i_3 = 0; i_3 < arrayReturns.length; i_3++) {
                        matchIndex = pageTextData.indexOf(arrayReturns[parseInt(i_3.toString(), 10)].trim(), matchIndex + (arrayReturns[i_3 - 1] === undefined ||
                            null ? arrayReturns[0].length : arrayReturns[i_3 - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                            }
                            else {
                                i_3 = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                if (matches.length > 1) {
                    matches.splice(1, matches.length);
                }
            }
            var words = pageTextData.match(/[a-zA-Z]+|\d+/g);
            if (!isNullOrUndefined(words)) {
                words.forEach(function (word) {
                    if (word.startsWith(inputString)) {
                        if (wordCounts["" + word]) {
                            wordCounts["" + word]++;
                        }
                        else {
                            wordCounts["" + word] = 1;
                        }
                    }
                });
            }
            if (matches.length > 0) {
                this.searchCount = this.searchCount + matches.length;
            }
            if (this.searchMatches && matches.length > 0) {
                this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
            }
        }
        var transformedData = Object.keys(wordCounts).map(function (key) { return ({
            SearchString: key,
            Count: wordCounts["" + key].toString()
        }); });
        if (this.isSingleSearch) {
            if (this.searchCountEle) {
                if (this.searchedOccurrences.indexOf(this.currentOccurrence + 1) === -1) {
                    if (!this.isTextSearchHandled) {
                        this.searchedOccurrences.push(this.currentOccurrence + 1);
                    }
                }
                this.adjustInputContainerWidth();
            }
            if (this.searchedOccurrences.length === 1) {
                this.pdfViewer.fireTextSearchStart(this.searchString, this.isMatchCase);
            }
            if (!this.isTextSearchHandled) {
                this.currentOccurrence += 1;
            }
        }
        else {
            if (this.searchAutocompleteObj) {
                this.autompleteDataSource = transformedData;
            }
        }
    };
    TextSearch.prototype.getSearchCountText = function () {
        if (this.pdfViewer.enableRtl) {
            this.searchCountEle.innerHTML = this.searchCount + " " + this.pdfViewer.localeObj.getConstant('of') + " " + this.currentOccurrence;
        }
        else {
            this.searchCountEle.innerHTML = this.currentOccurrence + " " + this.pdfViewer.localeObj.getConstant('of') + " " + this.searchCount;
        }
    };
    TextSearch.prototype.adjustInputContainerWidth = function () {
        var parentContainer = this.searchCountEle.parentElement;
        if (this.searchCount > 0) {
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                if (parentContainer) {
                    parentContainer.style.display = 'block';
                }
            }
            this.searchCountEle.style.display = 'inline-block';
        }
        else {
            this.searchCountEle.style.display = 'none';
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                if (parentContainer) {
                    parentContainer.style.display = 'none';
                }
            }
        }
    };
    TextSearch.prototype.initiateTextSearch = function (inputString, isMobileSearch) {
        this.enableNextButton(true);
        this.enablePrevButton(true);
        this.autompleteDataSource = [];
        if (this.pdfViewer.enableHtmlSanitizer && typeof inputString === 'string') {
            inputString = SanitizeHtmlHelper.sanitize(inputString);
        }
        if (inputString && inputString.length > 0 && inputString[inputString.length - 1] === ' ') {
            inputString = inputString.slice(0, inputString.length - 1);
        }
        this.initiateSearch(inputString, isMobileSearch);
    };
    TextSearch.prototype.handleSearchAfterTextCollectionReady = function (inputString, isMobileSearch) {
        if (isMobileSearch) {
            var searchCountElement = document.getElementById(this.pdfViewer.element.id + '_search_count');
            this.searchCountEle = searchCountElement;
        }
        this.isSingleSearch = isMobileSearch ? isMobileSearch : this.isSingleSearch;
        if (inputString !== this.searchString || this.isLastOccurrenceCompleted) {
            this.isTextSearchHandled = false;
            this.calculateSearchCount(inputString, this.documentTextCollection);
            this.isInitialSearch = true;
            this.isLastOccurrenceCompleted = false;
            if (this.currentOccurrence === 0) {
                this.startSearchPageIndex = this.searchPageIndex;
            }
        }
        if (inputString !== this.searchString || this.searchPageIndex === null || this.startSearchPageIndex === null) {
            this.isTextSearch = false;
            if (!this.isTextSearchHandled) {
                this.searchPageIndex = this.pdfViewerBase.currentPageNumber - 1;
                this.startSearchPageIndex = this.searchPageIndex;
            }
        }
        if (!this.isTextSearchHandled) {
            this.clearAllOccurrences();
        }
        if (inputString !== '' && !this.isMultiSearch && this.isSingleSearch && this.searchCount > 0) {
            if (this.searchMatches[this.searchPageIndex] && inputString === this.searchString) {
                if (this.searchMatches[this.searchPageIndex].length === 0) {
                    this.initSearch(this.searchPageIndex, false);
                }
                else {
                    this.nextSearch();
                }
            }
            else if (isNullOrUndefined(this.searchMatches[this.searchPageIndex]) && inputString === this.searchString) {
                this.initSearch(this.searchPageIndex, false);
            }
            else {
                this.textSearch(inputString);
            }
        }
        if (inputString === '') {
            this.searchString = '';
        }
    };
    /**
     * @param {string} inputString - It describes about the input string
     * @param {boolean} isMobileSearch - Indicates is mobile search or not
     * @private
     * @returns {void}
     */
    TextSearch.prototype.initiateSearch = function (inputString, isMobileSearch) {
        var _this = this;
        var pageCount = this.pdfViewerBase.pageCount;
        if (!isNullOrUndefined(this.intervalId)) {
            clearInterval(this.intervalId);
        }
        var checkDocumentTextCollection = function () {
            if (!_this.isTextSearchHandled) {
                _this.showLoadingIndicator(true);
            }
            if (_this.documentTextCollection.length === pageCount) {
                clearInterval(_this.intervalId);
                _this.isDocumentTextCollectionReady = true;
                _this.calculateSearchCount(_this.searchInput.value, _this.documentTextCollection);
                _this.getSearchTextDetails = {};
                _this.showLoadingIndicator(false);
                _this.intervalId = null;
                if (!_this.isTextSearchHandled) {
                    _this.handleSearchAfterTextCollectionReady(inputString, isMobileSearch);
                }
            }
            if (isMobileSearch) {
                if (_this.pdfViewerBase.navigationPane) {
                    _this.pdfViewerBase.navigationPane.setSearchInputWidth();
                }
            }
        };
        if (!this.isDocumentTextCollectionReady) {
            this.intervalId = setInterval(checkDocumentTextCollection, 1000);
        }
        else {
            this.handleSearchAfterTextCollectionReady(inputString, isMobileSearch);
        }
    };
    TextSearch.prototype.textSearch = function (inputString) {
        if (inputString !== '' || inputString) {
            this.searchString = inputString;
            this.isTextSearch = true;
            this.isSearchText = true;
            this.searchPageIndex = this.pdfViewerBase.currentPageNumber - 1;
            this.isTextSearchEventTriggered = false;
            if (!this.isTextSearchHandled) {
                this.showLoadingIndicator(true);
            }
            if (this.pdfViewer.isExtractText) {
                if (this.isTextRetrieved) {
                    for (var i = 0; i < this.pdfViewerBase.pageCount; i++) {
                        this.initSearch(i, false, true);
                    }
                }
                else {
                    this.isTextSearched = true;
                    for (var i = 0; i < this.documentTextCollection.length; i++) {
                        this.initSearch(i, false, true);
                    }
                }
            }
            if (!this.isTextSearchHandled) {
                this.searchPageIndex = this.findNextPageWithText(this.searchPageIndex, true);
                this.initSearch(this.searchPageIndex, false);
                this.highlightOthers();
            }
        }
    };
    TextSearch.prototype.nextSearch = function () {
        this.isPrevSearch = false;
        this.isTextSearch = true;
        this.isSearchText = false;
        var isCountIncreased = false;
        if (this.isDocumentTextCollectionReady) {
            if (this.searchString) {
                this.clearAllOccurrences();
                if (this.currentOccurrence !== 0) {
                    this.searchIndex = this.searchIndex + 1;
                    if (this.areAllOccurencesSearched() && !this.isMessagePopupOpened) {
                        this.onMessageBoxOpen();
                    }
                }
                else {
                    this.searchIndex = 0;
                    this.currentOccurrence += 1;
                    isCountIncreased = true;
                    this.getSearchCountText();
                    if (this.searchedOccurrences.indexOf(this.currentOccurrence) === -1) {
                        this.searchedOccurrences.push(this.currentOccurrence);
                    }
                    if (this.searchedOccurrences.length === 1) {
                        this.pdfViewer.fireTextSearchStart(this.searchString, this.isMatchCase);
                    }
                }
                if (this.searchMatches[this.searchPageIndex]) {
                    if (this.searchIndex >= this.searchMatches[this.searchPageIndex].length) {
                        this.searchIndex = 0;
                        this.searchPageIndex = this.findNextPageWithText(this.searchPageIndex);
                        if (this.pdfViewerBase.pageCount > 0) {
                            this.initSearch(this.searchPageIndex, false);
                        }
                        else {
                            this.initSearch(this.searchPageIndex, true);
                            if (!this.isMessagePopupOpened) {
                                this.onMessageBoxOpen();
                            }
                            this.pdfViewerBase.updateScrollTop(this.searchPageIndex);
                        }
                        this.showLoadingIndicator(true);
                    }
                    else {
                        this.highlightSearchedTexts(this.searchPageIndex, false, undefined);
                        var element_1 = this.pdfViewerBase.getElement('_searchtext_' + this.searchPageIndex + '_' + this.searchIndex);
                        if (!isNullOrUndefined(element_1)) {
                            var isScroll = this.isScrollPages(element_1);
                            if (isScroll) {
                                this.pdfViewerBase.updateScrollTop(this.searchPageIndex);
                            }
                        }
                        this.showLoadingIndicator(false);
                    }
                    this.highlightOthers(true);
                    if (this.currentOccurrence <= this.searchCount && !this.isMessagePopupOpened) {
                        if (this.currentOccurrence === this.searchCount) {
                            this.currentOccurrence = 1;
                        }
                        else {
                            if (!isCountIncreased) {
                                this.currentOccurrence = (this.currentOccurrence + 1);
                            }
                        }
                        if (this.searchCountEle && this.isSingleSearch) {
                            this.getSearchCountText();
                            if (this.searchedOccurrences.indexOf(this.currentOccurrence) === -1) {
                                this.searchedOccurrences.push(this.currentOccurrence);
                            }
                            this.adjustInputContainerWidth();
                        }
                    }
                }
                else if (!this.searchMatches[this.searchPageIndex] && !this.isMessagePopupOpened) {
                    if (this.pdfViewerBase.pageCount > 1) {
                        this.initSearch(this.searchPageIndex, false);
                    }
                }
                else {
                    if (!this.isMessagePopupOpened) {
                        this.initiateTextSearch(this.searchInput.value);
                    }
                }
            }
            else {
                this.initiateTextSearch(this.searchInput.value);
            }
            var element = this.pdfViewerBase.getElement('_searchtext_' + this.searchPageIndex + '_' + this.searchIndex);
            if (!isNullOrUndefined(element)) {
                this.scrollToSearch(element);
            }
        }
        else {
            this.clearAllOccurrences();
            if (this.areAllOccurencesSearched()) {
                this.onMessageBoxOpen();
            }
            if (!this.isMessagePopupOpened) {
                if (this.currentOccurrence !== 0) {
                    this.searchIndex = this.searchIndex + 1;
                }
                if (this.currentOccurrence + 1 > this.searchCount) {
                    this.currentOccurrence = 1;
                }
                else {
                    this.currentOccurrence = this.currentOccurrence + 1;
                }
                if (this.searchedOccurrences.indexOf(this.currentOccurrence) === -1) {
                    this.searchedOccurrences.push(this.currentOccurrence);
                }
                this.getSearchCountText();
                this.hightlightSearchedTexts(this.searchPageIndex);
            }
        }
    };
    TextSearch.prototype.findNextPageWithText = function (currentPageIndex, isInitialSearch) {
        if (isInitialSearch) {
            this.isInitialSearch = false;
            if (this.searchMatches[parseInt(currentPageIndex.toString(), 10)] &&
                this.searchMatches[parseInt(currentPageIndex.toString(), 10)].length > 0) {
                return currentPageIndex;
            }
        }
        for (var i = 1; i < this.pdfViewerBase.pageCount; i++) {
            var nextPageIndex = (currentPageIndex + i) % this.pdfViewerBase.pageCount;
            if (this.searchMatches[parseInt(nextPageIndex.toString(), 10)] &&
                this.searchMatches[parseInt(nextPageIndex.toString(), 10)].length > 0) {
                if (this.searchedOccurrences.length === this.searchCount && !isInitialSearch) {
                    nextPageIndex = this.startSearchPageIndex;
                    return nextPageIndex;
                }
                return nextPageIndex;
            }
        }
        return currentPageIndex;
    };
    TextSearch.prototype.findFirstNonEmptyPage = function () {
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            if (this.searchMatches[parseInt(j.toString(), 10)] && this.searchMatches[parseInt(j.toString(), 10)].length > 0) {
                return j;
            }
        }
        return null;
    };
    TextSearch.prototype.prevSearch = function () {
        searchTextCollection.push(this.searchPageIndex);
        this.isPrevSearch = true;
        this.isTextSearch = true;
        this.isSearchText = false;
        if (this.isDocumentTextCollectionReady) {
            if (this.searchString) {
                this.clearAllOccurrences();
                this.searchIndex = this.searchIndex - 1;
                if (this.currentOccurrence === 0) {
                    this.currentOccurrence = this.searchCount + 1;
                }
                if (this.areAllOccurencesSearched() && !this.isMessagePopupOpened) {
                    this.onMessageBoxOpen();
                }
                if (!this.isMessagePopupOpened) {
                    if (this.searchIndex < 0) {
                        this.searchPageIndex = this.findPreviousPageWithText();
                        this.initSearch(this.searchPageIndex, false);
                        this.showLoadingIndicator(true);
                    }
                    else {
                        this.highlightSearchedTexts(this.searchPageIndex, false, undefined);
                        this.showLoadingIndicator(false);
                    }
                    this.highlightOthers(true);
                }
                if (this.currentOccurrence - 1 >= 0 && !this.isMessagePopupOpened) {
                    if (this.currentOccurrence - 1 === 0) {
                        this.currentOccurrence = this.searchCount;
                    }
                    else {
                        this.currentOccurrence = this.currentOccurrence - 1;
                    }
                    if (this.searchCountEle && this.isSingleSearch) {
                        this.getSearchCountText();
                        if (this.searchedOccurrences.indexOf(this.currentOccurrence) === -1) {
                            this.searchedOccurrences.push(this.currentOccurrence);
                        }
                        if (this.searchedOccurrences.length === 1) {
                            this.pdfViewer.fireTextSearchStart(this.searchString, this.isMatchCase);
                        }
                        this.adjustInputContainerWidth();
                    }
                }
            }
            else {
                this.searchIndex = this.searchIndex - 1;
                this.searchPageIndex = ((this.searchPageIndex - 1) < 0) ? (this.pdfViewerBase.pageCount - 1) : this.searchPageIndex - 1;
                var inputString = this.searchInput.value;
                this.textSearch(inputString);
            }
        }
        else {
            this.clearAllOccurrences();
            if (this.areAllOccurencesSearched()) {
                this.onMessageBoxOpen();
            }
            if (!this.isMessagePopupOpened) {
                if (this.currentOccurrence !== 0) {
                    this.searchIndex = this.searchIndex - 1;
                }
                if ((this.currentOccurrence - 1) <= 0) {
                    this.currentOccurrence = this.searchCount;
                    var pageNum = Object.keys(this.getSearchTextDetails).pop();
                    this.pdfViewerBase.updateScrollTop(Number(pageNum));
                }
                else {
                    this.currentOccurrence = this.currentOccurrence - 1;
                }
                if (this.searchedOccurrences.indexOf(this.currentOccurrence) === -1) {
                    this.searchedOccurrences.push(this.currentOccurrence);
                }
                this.getSearchCountText();
                this.hightlightSearchedTexts(this.searchPageIndex);
            }
        }
        var element = this.pdfViewerBase.getElement('_searchtext_' + this.searchPageIndex + '_' + this.searchIndex);
        if (!isNullOrUndefined(element)) {
            this.scrollToSearch(element);
        }
    };
    TextSearch.prototype.scrollToSearch = function (element) {
        var scrollPoint = { y: -100, x: -100 };
        var isScroll = this.isScrollPages(element);
        if (isScroll) {
            this.scrollToSearchStr(element, scrollPoint);
        }
    };
    TextSearch.prototype.isScrollPages = function (childEle) {
        var parentRect = this.pdfViewer.element.getBoundingClientRect();
        var childRect = childEle.getBoundingClientRect();
        var toolbarHeight = (this.pdfViewer.enableToolbar && !isNullOrUndefined(this.pdfViewer.toolbarModule))
            ? this.pdfViewer.toolbar.toolbarElement.getBoundingClientRect().height : 0;
        var isScroll = childRect.top >= (parentRect.top + toolbarHeight) &&
            childRect.left >= parentRect.left && childRect.bottom <= parentRect.bottom &&
            (childRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
            childRect.right <= parentRect.right;
        return !isScroll;
    };
    TextSearch.prototype.findPreviousPageWithText = function () {
        var currentPageIndex = this.searchPageIndex;
        for (var i = 1; i < this.pdfViewerBase.pageCount; i++) {
            var prevPageIndex = (currentPageIndex - i + this.pdfViewerBase.pageCount) % this.pdfViewerBase.pageCount;
            if (this.searchMatches[parseInt(prevPageIndex.toString(), 10)] &&
                this.searchMatches[parseInt(prevPageIndex.toString(), 10)].length > 0) {
                if (this.searchedOccurrences.length === this.searchCount) {
                    prevPageIndex = 0;
                    return prevPageIndex;
                }
                return prevPageIndex;
            }
        }
        return currentPageIndex;
    };
    TextSearch.prototype.initSearch = function (pageIndex, isSinglePageSearch, isCount) {
        var storedData = this.pdfViewerBase.getStoredData(pageIndex, true);
        var pageText = null;
        var textContents = null;
        var characterBounds = null;
        if (isCount) {
            if (this.documentTextCollection.length !== 0) {
                var documentIndex = this.
                    documentTextCollection[parseInt(pageIndex.toString(), 10)][parseInt(pageIndex.toString(), 10)];
                var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                if (this.documentTextCollection[parseInt(pageIndex.toString(), 10)] && documentIndex) {
                    this.getSearchTextContent(pageIndex, this.searchString, pageTextData, textContents, isSinglePageSearch, this.documentTextCollection[parseInt(pageIndex.toString(), 10)]);
                }
            }
        }
        else {
            if (storedData) {
                pageText = storedData['pageText'];
                textContents = storedData['textContent'];
                characterBounds = this.pdfViewerBase.textLayer.characterBound[parseInt(pageIndex.toString(), 10)];
                this.textContents[parseInt(pageIndex.toString(), 10)] = textContents;
                this.getPossibleMatches(pageIndex, this.searchString, pageText, textContents, isSinglePageSearch, characterBounds);
                this.getSearchCountText();
            }
            else {
                if (!isSinglePageSearch && !isNullOrUndefined(pageIndex)) {
                    this.createRequestForSearch(pageIndex);
                }
            }
        }
    };
    TextSearch.prototype.getPossibleMatches = function (pageIndex, searchString, pageString, textContents, isSinglePageSearch, characterBounds) {
        var arrayReturns;
        var pageText = pageString;
        var searchText = searchString;
        var multiSearch = (pageText.replace((/(\s\r\n)/gm), ' ')).replace((/(\r\n)/gm), ' ');
        var Multiline = (pageString.replace((/(\s\r\n)/gm), '  ')).replace((/(\r\n)/gm), ' ');
        var specialCharcterSearch = multiSearch.replace(/[^a-zA-Z0-9]+/g, ' ');
        var queryLength = searchString.length;
        if (!this.isMatchCase) {
            searchText = searchString.toLowerCase();
            pageText = pageString.toLowerCase();
            multiSearch = multiSearch.toLowerCase();
            Multiline = Multiline.toLowerCase();
            specialCharcterSearch = specialCharcterSearch.toLowerCase();
        }
        var matches = [];
        var matchedArray = [];
        var matchIndex = -queryLength;
        var newIndex = -queryLength;
        var multiSearchIndex = -queryLength;
        var MultilineIndex = -queryLength;
        var specialcharcterIndex = -queryLength;
        while (matchIndex !== 0 || matchIndex === 0) {
            if (searchText === '' || searchText === ' ' || !searchText) {
                break;
            }
            if (this.isExactMatch) {
                var match = void 0;
                // eslint-disable-next-line
                var escapedInputString = searchString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                // eslint-disable-next-line
                var regex_2 = new RegExp("(?<!\\w)" + escapedInputString + "(?!\\w)", 'g');
                match = regex_2.exec(pageText);
                while (match !== null) {
                    matches.push(match.index);
                    match = regex_2.exec(pageText);
                }
                break;
            }
            matchIndex = pageText.indexOf(searchText, matchIndex + queryLength);
            var textSearch = pageString.substring(0, matchIndex);
            var unicodeLength = 0;
            // eslint-disable-next-line
            if (!this.isMatchCase && (/[^\u0000-\u007F]/.test(pageString)) && matchIndex !== -1) {
                var textLength = pageText.substring(0, matchIndex + queryLength).length;
                var unicodeSplitLength = pageText.substring(0, matchIndex + queryLength).
                    replace(/[\u0300-\u036f]/g, '').length;
                unicodeLength = textLength - unicodeSplitLength;
                matchIndex = matchIndex - unicodeLength;
            }
            if (searchText.indexOf(' ') !== -1) {
                var newString = searchString.replace(' ', '\r\n');
                newIndex = pageText.indexOf(newString, newIndex + queryLength);
                newIndex = -1;
                if (!(newIndex <= -1)) {
                    if (newIndex < matchIndex) {
                        matches.push(newIndex);
                    }
                }
            }
            if (matchIndex <= -1 && newIndex <= -1) {
                break;
            }
            if (!(matchIndex <= -1)) {
                matches.push(matchIndex);
            }
            if (newIndex > matchIndex && !(newIndex <= -1)) {
                matches.push(newIndex);
            }
            if (unicodeLength > 0) {
                matchIndex = matchIndex + unicodeLength;
            }
        }
        if (matches.length === 0) {
            multiSearchIndex = multiSearch.indexOf(searchText, multiSearchIndex + queryLength);
            MultilineIndex = Multiline.indexOf(searchText, MultilineIndex + queryLength);
            specialcharcterIndex = specialCharcterSearch.indexOf(searchText, specialcharcterIndex + queryLength);
            if (multiSearchIndex !== -1) {
                arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                matchIndex = -arrayReturns[0].length;
                for (var i = 0; i < arrayReturns.length; i++) {
                    matchIndex = pageText.indexOf(arrayReturns[parseInt(i.toString(), 10)].trim(), matchIndex + (arrayReturns[i - 1] === undefined ||
                        null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                    matchedArray.push(matchIndex);
                    if (matchedArray.length > 1) {
                        if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                            matches.push(matchedArray);
                            this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                        }
                        else {
                            i = -1;
                            matchIndex = matchedArray[0] + arrayReturns[0].length;
                            matchedArray.splice(0, matchedArray.length);
                        }
                    }
                }
            }
            else if (specialcharcterIndex !== -1) {
                arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                matchIndex = -arrayReturns[0].length;
                for (var i = 0; i < arrayReturns.length; i++) {
                    matchIndex = pageText.indexOf(arrayReturns[parseInt(i.toString(), 10)].trim(), matchIndex + (arrayReturns[i - 1] === undefined ||
                        null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                    matchedArray.push(matchIndex);
                    if (matchedArray.length > 1) {
                        if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                            matches.push(matchedArray);
                            this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                        }
                        else {
                            i = -1;
                            matchIndex = matchedArray[0] + arrayReturns[0].length;
                            matchedArray.splice(0, matchedArray.length);
                        }
                    }
                }
            }
            else if (MultilineIndex !== -1) {
                arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                matchIndex = -arrayReturns[0].length;
                for (var i = 0; i < arrayReturns.length; i++) {
                    matchIndex = pageText.indexOf(arrayReturns[parseInt(i.toString(), 10)].trim(), matchIndex + (arrayReturns[i - 1] === undefined ||
                        null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                    matchedArray.push(matchIndex);
                    if (matchedArray.length > 1) {
                        if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                            matches.push(matchedArray);
                            this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
                        }
                        else {
                            i = -1;
                            matchIndex = matchedArray[0] + arrayReturns[0].length;
                            matchedArray.splice(0, matchedArray.length);
                        }
                    }
                }
            }
            if (matches.length > 1) {
                matches.splice(1, matches.length);
            }
        }
        if (this.searchMatches && matches.length > 0) {
            this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
        }
        if (!isSinglePageSearch) {
            if (this.searchedPages.indexOf(pageIndex) === -1) {
                this.searchedPages.push(pageIndex);
                this.startIndex = this.searchedPages[0];
            }
            this.updateSearchInputIcon(false);
        }
        if (this.searchMatches && this.searchMatches[parseInt(pageIndex.toString(), 10)] &&
            this.searchMatches[parseInt(pageIndex.toString(), 10)].length !== 0) {
            if (!isSinglePageSearch) {
                if (this.isPrevSearch) {
                    this.searchIndex = this.searchMatches[parseInt(pageIndex.toString(), 10)].length - 1;
                }
                if ((this.pdfViewerBase.currentPageNumber - 1) !== this.searchPageIndex) {
                    if (this.searchMatches.length > 0 && (this.searchIndex === -1) &&
                        (this.searchPageIndex) === this.currentSearchIndex) {
                        if (!this.isMessagePopupOpened && !this.isSearchText) {
                            this.onMessageBoxOpen();
                        }
                        this.searchPageIndex = this.getSearchPage(this.pdfViewerBase.currentPageNumber - 1);
                        this.searchedPages = [this.searchPageIndex];
                    }
                    else if (this.isPrevSearch && this.searchMatches && this.searchMatches.length > 0 &&
                        (this.searchMatches[this.searchPageIndex] && this.searchMatches[this.searchPageIndex].length > 0) &&
                        this.searchedPages.length === this.pdfViewerBase.pageCount && this.startIndex - 1 === this.searchPageIndex) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.searchedPages = [this.startIndex];
                    }
                    else if (searchTextCollection[0] === this.searchPageIndex && this.areAllOccurencesSearched()) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                    }
                }
                else if (this.searchMatches && (this.searchMatches[this.searchPageIndex] &&
                    this.searchMatches[this.searchPageIndex].length > 0) &&
                    this.searchedPages.length === this.pdfViewerBase.pageCount &&
                    this.startIndex === this.searchPageIndex && this.pdfViewerBase.pageCount > 1) {
                    if (!this.isMessagePopupOpened) {
                        this.onMessageBoxOpen();
                    }
                    this.searchedPages = [this.startIndex];
                }
            }
            this.highlightSearchedTexts(pageIndex, isSinglePageSearch, arrayReturns);
        }
        else {
            if (!isSinglePageSearch) {
                if (this.isPrevSearch) {
                    this.searchPageIndex = ((this.searchPageIndex - 1) < 0) ? (this.pdfViewerBase.pageCount - 1) : this.searchPageIndex - 1;
                }
                else {
                    this.searchPageIndex = ((this.searchPageIndex + 1) < this.pdfViewerBase.pageCount) ? (this.searchPageIndex + 1) : 0;
                }
                if (this.searchedPages.indexOf(this.searchPageIndex) === -1 && this.searchedPages.length !== this.pdfViewerBase.pageCount) {
                    this.showLoadingIndicator(true);
                    this.searchPageIndex = this.findNextPageWithText(this.searchPageIndex, true);
                    this.initSearch(this.searchPageIndex, false);
                }
                else {
                    var searchPageIndex = this.getSearchPage(pageIndex);
                    if (this.searchMatches && isNullOrUndefined(this.searchMatches[this.searchPageIndex]) &&
                        this.searchedPages.length === this.pdfViewerBase.pageCount) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.pdfViewerBase.updateScrollTop(this.startIndex);
                    }
                    else if (this.searchMatches && this.searchMatches.length > 0 && (this.searchIndex === 0 ||
                        this.searchIndex === -1) && (searchPageIndex) === this.currentSearchIndex) {
                        if (this.isPrevSearch) {
                            if (!this.isMessagePopupOpened) {
                                this.onMessageBoxOpen();
                            }
                            this.searchPageIndex = searchPageIndex;
                            this.searchedPages = [searchPageIndex];
                            this.searchIndex = -1;
                        }
                        else {
                            if (!this.isMessagePopupOpened && this.pdfViewerBase.currentPageNumber !== 0 && !this.isSearchText) {
                                this.onMessageBoxOpen();
                            }
                            this.searchPageIndex = searchPageIndex;
                            this.searchedPages = [searchPageIndex];
                            this.searchIndex = 0;
                        }
                        this.highlightSearchedTexts(this.searchPageIndex, isSinglePageSearch, undefined);
                    }
                    else if (this.searchMatches && (this.searchMatches[this.searchPageIndex] &&
                        this.searchMatches[this.searchPageIndex].length > 0) &&
                        this.searchedPages.length === this.pdfViewerBase.pageCount) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.searchPageIndex = this.startIndex;
                        this.searchedPages = [this.searchPageIndex];
                        this.searchIndex = 0;
                        this.pdfViewerBase.updateScrollTop(this.startIndex);
                        this.highlightSearchedTexts(this.searchPageIndex, isSinglePageSearch, undefined);
                    }
                }
            }
        }
    };
    TextSearch.prototype.correctLinetext = function (searchString, matchIndex, pageText) {
        var indiuvalLineArray = [];
        var searchArray = searchString.split(/[" "]+/);
        if (!this.isMatchCase) {
            searchArray = searchString.toLowerCase().split(/\s+/);
        }
        matchIndex = 0;
        var linestring = '';
        var mergedText = pageText.replace(/ \r\n/g, ' ');
        mergedText = mergedText.replace(/\r\n/g, ' ');
        if (/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/.test(mergedText)) {
            mergedText = mergedText.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
        }
        mergedText = mergedText.replace(/[^a-zA-Z0-9 ]/g, '');
        searchString = searchString.replace(/[^a-zA-Z0-9 ]/g, '');
        var result = mergedText.match(searchString);
        if (!this.isMatchCase) {
            result = mergedText.match(searchString.toLowerCase());
        }
        if (isNullOrUndefined(result)) {
            return indiuvalLineArray;
        }
        else {
            result = pageText.slice(result.index, pageText.length);
        }
        var pageCheck = result;
        for (var i = 0; i < searchArray.length; i++) {
            var searchArrayText = linestring + searchArray[parseInt(i.toString(), 10)];
            matchIndex = pageText.indexOf(searchArrayText, matchIndex);
            pageCheck = pageCheck ? pageCheck.replace(searchArray[i - 1], '') : pageText.replace(searchArray[i - 1], '');
            if ((pageCheck[pageCheck.indexOf(searchArray[parseInt(i.toString(), 10)]) - 1] === '\n' && (pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1]) === '\n') || (pageCheck[pageCheck.indexOf(searchArray[parseInt(i.toString(), 10)]) - 1] === '\n' && isNullOrUndefined((pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1])))) {
                matchIndex = -1;
                if (linestring === '') {
                    linestring = searchArray[parseInt(i.toString(), 10)];
                    i = i + 1;
                }
            }
            if (matchIndex !== -1) {
                linestring += searchArray[parseInt(i.toString(), 10)] + ' ';
                if (i === (searchArray.length - 1)) {
                    indiuvalLineArray.push(linestring);
                }
            }
            else {
                indiuvalLineArray.push(linestring);
                linestring = searchArray[parseInt(i.toString(), 10)] + ' ';
                if (pageCheck[pageCheck.indexOf(searchArray[parseInt(i.toString(), 10)]) - 1] === '\n' && pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1] === '\n') {
                    indiuvalLineArray.push(linestring);
                    linestring = searchArray[i + 1] + ' ';
                    pageCheck = pageCheck ? pageCheck.replace(searchArray[i - 1], '') : pageText.replace(searchArray[i - 1], '');
                    i = i + 1;
                }
                if (i === (searchArray.length - 1)) {
                    indiuvalLineArray.push(linestring);
                }
            }
        }
        return indiuvalLineArray;
    };
    TextSearch.prototype.getSearchTextContent = function (pageIndex, searchString, pageString, textContents, isSinglePageSearch, characterBounds) {
        var pageText = pageString;
        var searchText = searchString;
        var queryLength = searchString.length;
        if (!this.isMatchCase) {
            searchText = searchString.toLowerCase();
            pageText = pageString.toLowerCase();
        }
        var matches = [];
        var matchIndex = -queryLength;
        var newIndex = -queryLength;
        while (matchIndex !== 0) {
            if (searchText === '' || searchText === ' ' || !searchText) {
                break;
            }
            matchIndex = pageText.indexOf(searchText, matchIndex + queryLength);
            if (searchText.indexOf(' ') !== -1) {
                var newString = searchString.replace(' ', '\r\n');
                newIndex = pageText.indexOf(newString, newIndex + queryLength);
                if (!(newIndex <= -1)) {
                    if (newIndex < matchIndex) {
                        matches.push(newIndex);
                    }
                }
            }
            if (matchIndex <= -1 && newIndex <= -1) {
                break;
            }
            if (!(matchIndex <= -1)) {
                matches.push(matchIndex);
            }
            if (newIndex > matchIndex && !(newIndex <= -1)) {
                matches.push(newIndex);
            }
        }
        if (matches.length !== 0) {
            this.searchCount = this.searchCount + matches.length;
        }
        if (this.searchMatches && matches.length > 0) {
            this.searchMatches[parseInt(pageIndex.toString(), 10)] = matches;
        }
    };
    TextSearch.prototype.getSearchPage = function (pageIndex) {
        var pageNumber = null;
        if (this.isPrevSearch) {
            for (var i = pageIndex; i >= 0; i--) {
                if (i !== pageIndex && this.searchMatches[parseInt(i.toString(), 10)]) {
                    pageNumber = i;
                    break;
                }
            }
            if (!pageNumber) {
                for (var j = this.pdfViewerBase.pageCount - 1; j > pageIndex; j--) {
                    if (this.searchMatches[parseInt(j.toString(), 10)]) {
                        pageNumber = j;
                        break;
                    }
                }
            }
        }
        else {
            for (var i = pageIndex; i < this.pdfViewerBase.pageCount; i++) {
                if (i !== pageIndex && this.searchMatches[parseInt(i.toString(), 10)]) {
                    pageNumber = i;
                    break;
                }
            }
            if (!pageNumber) {
                if (pageIndex === 0) {
                    pageNumber = pageIndex;
                }
                else {
                    for (var j = 0; j < pageIndex; j++) {
                        if (this.searchMatches[parseInt(j.toString(), 10)]) {
                            pageNumber = j;
                            break;
                        }
                    }
                }
            }
        }
        return pageNumber;
    };
    TextSearch.prototype.areAllNonEmptyPagesSearched = function () {
        var nonEmptyPages = [];
        for (var i = 0; i < this.searchMatches.length; i++) {
            if (this.searchMatches[parseInt(i.toString(), 10)] && this.searchMatches[parseInt(i.toString(), 10)].length > 0) {
                nonEmptyPages.push(i);
            }
        }
        for (var _i = 0, nonEmptyPages_1 = nonEmptyPages; _i < nonEmptyPages_1.length; _i++) {
            var pageIndex = nonEmptyPages_1[_i];
            if (this.searchedPages.indexOf(pageIndex) === -1) {
                return false;
            }
        }
        return true;
    };
    TextSearch.prototype.areAllOccurencesSearched = function () {
        return this.searchedOccurrences.length === this.searchCount;
    };
    TextSearch.prototype.highlightSearchedTexts = function (pageIndex, isSinglePageSearch, ArrayReturns) {
        var matches = this.searchMatches[parseInt(pageIndex.toString(), 10)];
        var scrollPoint = { y: -100, x: -100 };
        var className;
        var searchingText = this.searchString;
        var characterBounds = this.pdfViewerBase.textLayer.characterBound[parseInt(pageIndex.toString(), 10)];
        var isHighlight = false;
        if (isSinglePageSearch && (this.pdfViewerBase.currentPageNumber - 1) !== this.searchPageIndex) {
            if (this.searchMatches.length > 0) {
                if (pageIndex === this.getSearchPage(this.pdfViewerBase.currentPageNumber - 1)) {
                    isHighlight = true;
                }
            }
        }
        if (characterBounds && matches !== undefined) {
            for (var i = 0; i < matches.length; i++) {
                if (matches[parseInt(i.toString(), 10)].length !== undefined && ArrayReturns !== undefined) {
                    if (i === this.searchIndex && pageIndex === this.searchPageIndex) {
                        for (var j = 0; j < ArrayReturns.length; j++) {
                            className = 'e-pv-search-text-highlight';
                            this.addDivForSearch(i, pageIndex, characterBounds, (ArrayReturns[parseInt(j.toString(), 10)].trim()).length, className, j);
                        }
                    }
                    else {
                        for (var j = 0; j < ArrayReturns.length; j++) {
                            className = 'e-pv-search-text-highlightother';
                            this.addDivForSearch(i, pageIndex, characterBounds, (ArrayReturns[parseInt(j.toString(), 10)].trim()).length, className, j);
                        }
                    }
                }
                else if (i === this.searchIndex && pageIndex === this.searchPageIndex) {
                    className = 'e-pv-search-text-highlight';
                }
                else {
                    className = 'e-pv-search-text-highlightother';
                }
                if (isNullOrUndefined(matches[parseInt(i.toString(), 10)].length)) {
                    this.addDivForSearch(i, pageIndex, characterBounds, this.searchString.length, className, undefined);
                }
            }
            this.searchString = searchingText;
            if (pageIndex === this.searchPageIndex && !isSinglePageSearch) {
                var element = this.pdfViewerBase.getElement('_searchtext_' + pageIndex + '_' + this.searchIndex);
                if (element) {
                    var targetScrollElement = this.getScrollElement(element);
                    var isScroll = this.isScrollPages(targetScrollElement);
                    if (isScroll) {
                        this.scrollToSearchStr(element, scrollPoint);
                    }
                }
                else {
                    this.pdfViewerBase.updateScrollTop(pageIndex);
                    var element_2 = this.pdfViewerBase.getElement('_searchtext_' + pageIndex + '_' + this.searchIndex);
                    if (element_2) {
                        var targetScrollElement = this.getScrollElement(element_2);
                        this.scrollToSearchStr(targetScrollElement, scrollPoint);
                    }
                }
            }
        }
    };
    TextSearch.prototype.addDivForSearch = function (index, pageIndex, characterBounds, queryLength, className, nestedIndex) {
        var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
        if (isNullOrUndefined(textLayer) && className === 'e-pv-search-text-highlight') {
            if (this.pdfViewer.navigation) {
                this.pdfViewer.navigation.goToPage(pageIndex + 1);
            }
        }
        var count;
        if (this.searchMatches[parseInt(pageIndex.toString(), 10)][parseInt(index.toString(), 10)].length !== undefined) {
            count = this.searchMatches[parseInt(pageIndex.toString(), 10)][parseInt(index.toString(), 10)]["" + nestedIndex];
        }
        else {
            count = this.searchMatches[parseInt(pageIndex.toString(), 10)][parseInt(index.toString(), 10)];
        }
        var initial = count;
        var divCount = 0;
        while (count < initial + queryLength) {
            count = this.addDivElement(count, characterBounds, queryLength, className, index, pageIndex, initial, divCount, nestedIndex);
            divCount++;
        }
        if (className === 'e-pv-search-text-highlight') {
            this.showLoadingIndicator(false);
        }
    };
    TextSearch.prototype.addDivElement = function (count, characterBounds, queryLength, className, index, pageIndex, initial, divCount, nestedIndex) {
        var height = 0;
        var width = 0;
        var top = 0;
        var left = 0;
        var isRTL = false;
        if (characterBounds[parseInt(count.toString(), 10)]) {
            left = characterBounds[parseInt(count.toString(), 10)].X;
            top = characterBounds[parseInt(count.toString(), 10)].Y;
        }
        var v = 0;
        if ((count - initial) !== 0) {
            v = count - initial;
            queryLength += 1;
        }
        // eslint-disable-next-line
        for (v = v; v < queryLength; v++) {
            if (characterBounds[parseInt(count.toString(), 10)]) {
                var charBound = characterBounds[parseInt(count.toString(), 10)];
                if (left > charBound.X + charBound.Width) {
                    isRTL = true;
                }
                top = (top < charBound.Y) ? top : charBound.Y;
                var topDifference = (top < charBound.Y) ? (charBound.Y - top) : (top - charBound.Y);
                height = (height > (topDifference + charBound.Height)) ? height : (topDifference + charBound.Height);
                count++;
            }
        }
        var isContinuation = false;
        if (!isRTL) {
            if (initial + queryLength !== count) {
                isContinuation = true;
                if (characterBounds[count - 1]) {
                    width = (characterBounds[count - 1].X - left);
                }
            }
            else {
                isContinuation = false;
                var storedData = this.pdfViewerBase.clientSideRendering ?
                    this.pdfViewerBase.getLinkInformation(pageIndex, true) : this.pdfViewerBase.getStoredData(pageIndex, true);
                var pageText = null;
                if (storedData) {
                    pageText = storedData['pageText'];
                }
                else if (this.pdfViewer.isExtractText && this.documentTextCollection.length !== 0) {
                    var documentIndex = this.documentTextCollection[parseInt(pageIndex.toString(), 10)][parseInt(pageIndex.toString(), 10)];
                    pageText = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                }
                if (characterBounds[parseInt(count.toString(), 10)]) {
                    if (pageText && (pageText[parseInt(count.toString(), 10)] === '' || pageText[parseInt(count.toString(), 10)] === ' ' || pageText[parseInt(count.toString(), 10)] === '\r' || pageText[parseInt(count.toString(), 10)] === '\n') && (characterBounds[parseInt(count.toString(), 10)].Width) === 0) {
                        width = (characterBounds[count - 1].X - left) + characterBounds[count - 1].Width;
                    }
                    else {
                        width = (characterBounds[parseInt(count.toString(), 10)].X - left);
                    }
                }
                else {
                    if (characterBounds[count - 1]) {
                        width = (characterBounds[count - 1].X - left) + characterBounds[count - 1].Width;
                    }
                }
            }
        }
        else {
            var charBound = characterBounds[(initial + queryLength) - 1];
            left = charBound.X;
            width = characterBounds[parseInt(initial.toString(), 10)].X - characterBounds[(initial + queryLength) - 1].X;
            top = (top < charBound.Y) ? top : charBound.Y;
            var topDifference = (top < charBound.Y) ? (charBound.Y - top) : (top - charBound.Y);
            height = (height > (topDifference + charBound.Height)) ? height : (topDifference + charBound.Height);
            //some RTL character calculated width is zero and width difference value calculated from Y possition difference in the same line.
            var widthDifference = initial > 0 ? characterBounds[initial - 1].Y
                - characterBounds[parseInt(initial.toString(), 10)].Y : 0;
            for (var j = (initial + queryLength) - 1; j >= initial; j--) {
                charBound = characterBounds[parseInt(j.toString(), 10)];
                if (charBound.Width === 0) {
                    widthDifference = charBound.Y - characterBounds[j - 1].Y;
                }
            }
            width = width + widthDifference;
        }
        this.createSearchTextDiv(index, pageIndex, height, width, top, left, className, isContinuation, divCount, nestedIndex);
        return count;
    };
    TextSearch.prototype.createSearchTextDiv = function (index, pageIndex, height, width, top, left, className, isContinuation, divCount, nestedIndex) {
        var idString = '_searchtext_' + pageIndex + '_' + index;
        if (isContinuation) {
            idString += '_' + divCount;
        }
        var nestedElement = document.getElementsByClassName('e-pv-search-text-highlight');
        if (nestedIndex !== undefined && this.pdfViewerBase.getElement(idString) && !nestedElement[parseInt(nestedIndex.toString(), 10)]) {
            var textDiv = createElement('div', { id: this.pdfViewer.element.id + idString + '_' + nestedIndex });
            var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
            this.calculateBounds(textDiv, height, width, top, left, pageDetails);
            textDiv.classList.add(className);
            if (className === 'e-pv-search-text-highlight') {
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchHighlightColor === '') ? '#fdd835' : this.pdfViewer.textSearchColorSettings.searchHighlightColor;
                var bounds = { left: left, top: top, width: width, height: height };
                this.pdfViewer.fireTextSearchHighlight(this.searchString, this.isMatchCase, bounds, (pageIndex + 1));
            }
            else if (className === 'e-pv-search-text-highlightother') {
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchColor === '') ? '#8b4c12' : this.pdfViewer.textSearchColorSettings.searchColor;
            }
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
            textDiv.style.zIndex = this.searchTextDivzIndex;
            if (textLayer) {
                textLayer.appendChild(textDiv);
            }
        }
        if (!this.pdfViewerBase.getElement(idString)) {
            var textDiv = createElement('div', { id: this.pdfViewer.element.id + idString });
            var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
            this.calculateBounds(textDiv, height, width, top, left, pageDetails);
            textDiv.classList.add(className);
            if (className === 'e-pv-search-text-highlight') {
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchHighlightColor === '') ? '#fdd835' : this.pdfViewer.textSearchColorSettings.searchHighlightColor;
                var bounds = { left: left, top: top, width: width, height: height };
                this.pdfViewer.fireTextSearchHighlight(this.searchString, this.isMatchCase, bounds, (pageIndex + 1));
            }
            else if (className === 'e-pv-search-text-highlightother') {
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchColor === '') ? '#8b4c12' : this.pdfViewer.textSearchColorSettings.searchColor;
            }
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
            textDiv.style.zIndex = this.searchTextDivzIndex;
            if (textLayer) {
                textLayer.appendChild(textDiv);
            }
        }
    };
    TextSearch.prototype.calculateBounds = function (textDiv, height, width, top, left, pageDetails) {
        if (pageDetails.rotation === 0 || pageDetails.rotation === 2) {
            textDiv.style.height = Math.ceil(height) * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = width * this.pdfViewerBase.getZoomFactor() + 'px';
            if (pageDetails.rotation === 2) {
                textDiv.style.top = (pageDetails.height - top - height) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.left = Math.ceil(pageDetails.width - left - width) * this.pdfViewerBase.getZoomFactor() + 'px';
            }
            else {
                textDiv.style.top = top * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.left = left * this.pdfViewerBase.getZoomFactor() + 'px';
            }
        }
        else if (pageDetails.rotation === 1) {
            textDiv.style.height = width * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = height * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.top = left * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.left = (pageDetails.height - top - height) * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else if (pageDetails.rotation === 3) {
            textDiv.style.height = width * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = height * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.left = ((pageDetails.width - pageDetails.height) + top) * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.top = (pageDetails.height - left - width) * this.pdfViewerBase.getZoomFactor() + 'px';
        }
    };
    TextSearch.prototype.isClassAvailable = function () {
        var isClass = false;
        for (var j = 0; j < this.tempElementStorage.length; j++) {
            if (this.tempElementStorage[parseInt(j.toString(), 10)].classString) {
                if (this.tempElementStorage[parseInt(j.toString(), 10)].classString === 'e-pv-search-text-highlight' || this.tempElementStorage[parseInt(j.toString(), 10)].classString === 'e-pv-search-text-highlightother') {
                    isClass = true;
                    break;
                }
            }
        }
        return isClass;
    };
    TextSearch.prototype.getScrollElement = function (element) {
        var targetElement = element;
        if (element.childNodes.length > 0) {
            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[parseInt(i.toString(), 10)].classList) {
                    if (element.childNodes[parseInt(i.toString(), 10)].classList.contains('e-pv-search-text-highlight')) {
                        targetElement = element.childNodes[parseInt(i.toString(), 10)];
                    }
                }
            }
        }
        return targetElement;
    };
    TextSearch.prototype.scrollToSearchStr = function (element, scrollPoint) {
        var parent = element.offsetParent;
        var offsetY = element.offsetTop + element.clientTop;
        var offsetX = element.offsetLeft + element.clientLeft;
        while (parent.id !== this.pdfViewerBase.viewerContainer.id) {
            offsetY += parent.offsetTop;
            offsetX += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        if (scrollPoint) {
            offsetY += scrollPoint.y;
            offsetX += scrollPoint.x;
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                parent.scrollLeft = offsetX;
            }
            else {
                if (this.pdfViewerBase.getZoomFactor() > 1.5) {
                    parent.scrollLeft = offsetX;
                }
            }
        }
        parent.scrollTop = offsetY;
        this.pdfViewerBase.updateMobileScrollerPosition();
    };
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    TextSearch.prototype.resizeSearchElements = function (pageIndex) {
        var searchDivs = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_searchtext_' + pageIndex + '"]');
        for (var i = 0; i < searchDivs.length; i++) {
            var textDiv = searchDivs[parseInt(i.toString(), 10)];
            var previousZoomFactor = 1;
            if (this.pdfViewer.magnificationModule) {
                previousZoomFactor = this.pdfViewer.magnificationModule.previousZoomFactor;
            }
            var outputdata = pageIndex + '_' + previousZoomFactor + '_' + this.pdfViewerBase.getZoomFactor();
            if (textDiv.getAttribute('name') !== outputdata) {
                textDiv.style.width = (parseFloat(textDiv.style.width) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.height = (parseFloat(textDiv.style.height) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.top = (parseFloat(textDiv.style.top) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.left = (parseFloat(textDiv.style.left) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.setAttribute('name', outputdata);
            }
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextSearch.prototype.highlightOtherOccurrences = function (pageNumber) {
        this.initSearch(pageNumber, true);
    };
    TextSearch.prototype.highlightOthers = function (isSearched) {
        var indexes = this.getIndexes();
        var lowerPageValue = parseFloat(indexes.lowerPageValue.toString());
        var higherPageValue = parseFloat(indexes.higherPageValue.toString());
        for (var i = lowerPageValue; i <= higherPageValue; i++) {
            if (this.searchMatches[parseInt(i.toString(), 10)] &&
                this.searchMatches[parseInt(i.toString(), 10)].length > 0) {
                this.highlightOtherOccurrences(i);
            }
        }
        if (isSearched) {
            this.showLoadingIndicator(false);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.clearAllOccurrences = function () {
        var searchTextDivs = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_searchtext_"]');
        for (var i = 0; i < searchTextDivs.length; i++) {
            searchTextDivs[parseInt(i.toString(), 10)].parentElement.removeChild(searchTextDivs[parseInt(i.toString(), 10)]);
        }
    };
    /**
     * @private
     * @returns {any} - any
     */
    TextSearch.prototype.getIndexes = function () {
        var lowerPageValue = this.pdfViewerBase.currentPageNumber - 3;
        lowerPageValue = (lowerPageValue > 0) ? lowerPageValue : 0;
        var higherPageValue = this.pdfViewerBase.currentPageNumber + 1;
        higherPageValue = (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        return { lowerPageValue: lowerPageValue, higherPageValue: higherPageValue };
    };
    TextSearch.prototype.applyTextSelection = function () {
        if (this.pdfViewer.textSelectionModule && !this.pdfViewerBase.isTextSelectionDisabled) {
            var indexes = this.getIndexes();
            var lowerPageValue = parseFloat(indexes.lowerPageValue.toString());
            var higherPageValue = parseFloat(indexes.higherPageValue.toString());
            for (var i = lowerPageValue; i <= higherPageValue; i++) {
                this.pdfViewer.textSelectionModule.applySelectionRangeOnScroll(i);
            }
        }
    };
    /**
     * @private
     * @param {boolean} [cleardocumentCollection=false] - If true, clears the document text collection.
     * @returns {void}
     */
    TextSearch.prototype.resetTextSearch = function (cleardocumentCollection) {
        if (cleardocumentCollection === void 0) { cleardocumentCollection = false; }
        this.resetVariables();
        this.onTextSearchClose();
        this.searchPageIndex = null;
        this.searchIndex = 0;
        this.updateSearchInputIcon(true);
        this.enableNextButton(false);
        this.enablePrevButton(false);
        if (cleardocumentCollection) {
            this.documentTextCollection = [];
        }
        this.isTextRetrieved = false;
        this.isTextSearched = false;
        this.isSearchText = false;
        if (this.searchRequestHandler) {
            this.searchRequestHandler.clear();
        }
        this.searchCount = 0;
        this.searchString = '';
    };
    TextSearch.prototype.onTextSearchClose = function () {
        this.isPrevSearch = false;
        this.isTextSearch = false;
        if (this.pdfViewerBase.pageCount > 0) {
            this.clearAllOccurrences();
        }
    };
    TextSearch.prototype.createRequestForSearch = function (pageIndex) {
        // eslint-disable-next-line
        var proxy = this;
        var viewPortWidth = 816;
        var viewPortHeight = this.pdfViewer.element.clientHeight;
        var pageWidth = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width;
        var pageHeight = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height;
        var tileCount = this.pdfViewerBase.getTileCount(pageWidth, pageHeight);
        var noTileX = viewPortWidth >= pageWidth ? 1 : tileCount;
        var noTileY = viewPortWidth >= pageWidth ? 1 : tileCount;
        var isTileRendering = false;
        var tileSettings = this.pdfViewer.tileRenderingSettings;
        if (tileSettings.enableTileRendering && tileSettings.x > 0 && tileSettings.y > 0) {
            noTileX = viewPortWidth >= pageWidth ? 1 : tileSettings.x;
            noTileY = viewPortWidth >= pageWidth ? 1 : tileSettings.y;
        }
        if (noTileX > 1 && noTileY > 1) {
            isTileRendering = true;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                var _a, _b;
                var jsonObject = {
                    xCoordinate: x, yCoordinate: y, pageNumber: pageIndex, viewPortWidth: viewPortWidth, viewPortHeight: viewPortHeight, documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId, zoomFactor: proxy.pdfViewerBase.getZoomFactor(), tilecount: tileCount, action: 'Search', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId,
                    tileXCount: noTileX, tileYCount: noTileY
                };
                if (this_1.pdfViewerBase.jsonDocumentId) {
                    jsonObject.documentId = this_1.pdfViewerBase.jsonDocumentId;
                }
                var zoomFactor = this_1.pdfViewerBase.retrieveCurrentZoomFactor();
                this_1.searchRequestHandler = new AjaxHandler(this_1.pdfViewer);
                this_1.searchRequestHandler.url = this_1.pdfViewer.serviceUrl + '/' + this_1.pdfViewer.serverActionSettings.renderPages;
                this_1.searchRequestHandler.responseType = 'json';
                if (!this_1.pdfViewerBase.clientSideRendering) {
                    this_1.searchRequestHandler.send(jsonObject);
                }
                this_1.searchRequestHandler.onSuccess = function (result) {
                    var data = result.data;
                    if (data) {
                        if (typeof data !== 'object') {
                            try {
                                data = JSON.parse(data);
                            }
                            catch (error) {
                                proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderPages);
                                data = null;
                            }
                        }
                        if (data) {
                            proxy.searchRequestOnSuccess(data, proxy, viewPortWidth, pageWidth, isTileRendering, pageIndex, x, y, noTileX, noTileY);
                        }
                    }
                };
                this_1.searchRequestHandler.onFailure = function (result) {
                    proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderPages);
                };
                this_1.searchRequestHandler.onError = function (result) {
                    proxy.pdfViewerBase.openNotificationPopup();
                    proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderPages);
                };
                if (this_1.pdfViewerBase.clientSideRendering) {
                    var textDetailsId = this_1.pdfViewerBase.documentId + '_' + pageIndex + '_textDetails';
                    var isTextNeed = this_1.pdfViewerBase.pageTextDetails ? this_1.pdfViewerBase.pageTextDetails["" + textDetailsId] ? false : true : true;
                    var cropBoxRect = new Rect(0, 0, 0, 0);
                    var mediaBoxRect = new Rect(0, 0, 0, 0);
                    var currentPage = this_1.pdfViewer.pdfRenderer.loadedDocument.getPage(pageIndex);
                    if (currentPage && currentPage._pageDictionary && currentPage._pageDictionary._map &&
                        currentPage._pageDictionary._map.CropBox) {
                        _a = currentPage._pageDictionary._map.CropBox, cropBoxRect.x = _a[0], cropBoxRect.y = _a[1], cropBoxRect.width = _a[2], cropBoxRect.height = _a[3];
                    }
                    if (currentPage && currentPage._pageDictionary && currentPage._pageDictionary._map &&
                        currentPage._pageDictionary._map.MediaBox) {
                        _b = currentPage._pageDictionary._map.MediaBox, mediaBoxRect.x = _b[0], mediaBoxRect.y = _b[1], mediaBoxRect.width = _b[2], mediaBoxRect.height = _b[3];
                    }
                    if (viewPortWidth >= pageWidth || !this_1.pdfViewer.tileRenderingSettings.enableTileRendering) {
                        this_1.pdfViewerBase.pdfViewerRunner.addTask({
                            pageIndex: pageIndex,
                            message: 'renderPageSearch',
                            zoomFactor: proxy.pdfViewerBase.getZoomFactor(),
                            isTextNeed: isTextNeed,
                            textDetailsId: textDetailsId,
                            cropBoxRect: cropBoxRect,
                            mediaBoxRect: mediaBoxRect
                        }, TaskPriorityLevel.High);
                    }
                    else {
                        this_1.pdfViewerBase.pdfViewerRunner.addTask({
                            pageIndex: pageIndex,
                            message: 'renderImageAsTileSearch',
                            zoomFactor: zoomFactor,
                            tileX: x,
                            tileY: y,
                            tileXCount: noTileX,
                            tileYCount: noTileY,
                            isTextNeed: isTextNeed,
                            textDetailsId: textDetailsId,
                            cropBoxRect: cropBoxRect,
                            mediaBoxRect: mediaBoxRect
                        }, TaskPriorityLevel.High);
                    }
                    this_1.pdfViewerBase.pdfViewerRunner.onMessage('imageRenderedSearch,renderTileImageSearch', function (event) {
                        switch (event.data.message) {
                            case 'imageRenderedSearch':
                                if (event.data.message === 'imageRenderedSearch') {
                                    var canvas = document.createElement('canvas');
                                    var _a = event.data, value = _a.value, width = _a.width, height = _a.height, pageIndex_1 = _a.pageIndex;
                                    canvas.width = width;
                                    canvas.height = height;
                                    var canvasContext = canvas.getContext('2d');
                                    var imageData = canvasContext.createImageData(width, height);
                                    imageData.data.set(value);
                                    canvasContext.putImageData(imageData, 0, 0);
                                    var imageUrl = canvas.toDataURL();
                                    proxy.pdfViewerBase.releaseCanvas(canvas);
                                    var textBounds = event.data.textBounds;
                                    var textContent = event.data.textContent;
                                    var pageText = event.data.pageText;
                                    var rotation = event.data.rotation;
                                    var characterBounds = event.data.characterBounds;
                                    var hyperlinksDetails = proxy.pdfViewer.pdfRendererModule.getHyperlinks(pageIndex_1);
                                    var data = ({
                                        image: imageUrl, pageNumber: pageIndex_1, uniqueId: proxy.pdfViewerBase.documentId,
                                        pageWidth: width, zoomFactor: event.data.zoomFactor, hyperlinks: hyperlinksDetails.hyperlinks,
                                        hyperlinkBounds: hyperlinksDetails.hyperlinkBounds,
                                        linkAnnotation: hyperlinksDetails.linkAnnotation, linkPage: hyperlinksDetails.linkPage,
                                        annotationLocation: hyperlinksDetails.annotationLocation, characterBounds: characterBounds
                                    });
                                    if (event.data.isTextNeed) {
                                        data.textBounds = textBounds;
                                        data.textContent = textContent;
                                        data.rotation = rotation;
                                        data.pageText = pageText;
                                        proxy.pdfViewerBase.storeTextDetails(pageIndex_1, textBounds, textContent, pageText, rotation, characterBounds);
                                    }
                                    else {
                                        var textDetails = JSON.parse(proxy.pdfViewerBase.pageTextDetails["" + event.data.textDetailsId]);
                                        data.textBounds = textDetails.textBounds;
                                        data.textContent = textDetails.textContent;
                                        data.rotation = textDetails.rotation;
                                        data.pageText = textDetails.pageText;
                                        data.characterBounds = textDetails.characterBounds;
                                    }
                                    if (data && data.image && data.uniqueId === proxy.pdfViewerBase.documentId) {
                                        proxy.pdfViewer.fireAjaxRequestSuccess(proxy.pdfViewer.serverActionSettings.renderPages, data);
                                        var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex_1;
                                        var blobObj = proxy.pdfViewerBase.createBlobUrl(data.image.split('base64,')[1], 'image/png');
                                        var Url = URL || webkitURL;
                                        var blobUrl = Url.createObjectURL(blobObj);
                                        var storeObject = {
                                            image: blobUrl, width: data.pageWidth, uniqueId: data.uniqueId, zoomFactor: data.zoomFactor
                                        };
                                        proxy.pdfViewerBase.storeImageData(pageNumber, storeObject);
                                        proxy.searchRequestOnSuccess(data, proxy, viewPortWidth, pageWidth, isTileRendering, pageIndex_1, x, y, noTileX, noTileY);
                                    }
                                }
                                break;
                            case 'renderTileImageSearch':
                                if (event.data.message === 'renderTileImageSearch') {
                                    var canvas = document.createElement('canvas');
                                    var _b = event.data, value = _b.value, w = _b.w, h = _b.h, noTileX_1 = _b.noTileX, noTileY_1 = _b.noTileY, x_1 = _b.x, y_1 = _b.y, pageIndex_2 = _b.pageIndex;
                                    canvas.setAttribute('height', h);
                                    canvas.setAttribute('width', w);
                                    canvas.width = w;
                                    canvas.height = h;
                                    var canvasContext = canvas.getContext('2d');
                                    var imageData = canvasContext.createImageData(w, h);
                                    imageData.data.set(value);
                                    canvasContext.putImageData(imageData, 0, 0);
                                    var imageUrl = canvas.toDataURL();
                                    proxy.pdfViewerBase.releaseCanvas(canvas);
                                    var tileWidth = w;
                                    var tileHeight = h;
                                    var textBounds = event.data.textBounds;
                                    var textContent = event.data.textContent;
                                    var pageText = event.data.pageText;
                                    var rotation = event.data.rotation;
                                    var characterBounds = event.data.characterBounds;
                                    var tileData = {
                                        image: imageUrl,
                                        noTileX: noTileX_1,
                                        noTileY: noTileY_1,
                                        pageNumber: pageIndex_2,
                                        tileX: x_1,
                                        tileY: y_1,
                                        uniqueId: proxy.pdfViewerBase.documentId,
                                        pageWidth: pageWidth,
                                        width: tileWidth,
                                        transformationMatrix: {
                                            Values: [1, 0, 0, 1, tileWidth * x_1, tileHeight * y_1, 0, 0, 0]
                                        },
                                        zoomFactor: event.data.zoomFactor,
                                        characterBounds: characterBounds,
                                        isTextNeed: event.data.isTextNeed,
                                        textDetailsId: event.data.textDetailsId
                                    };
                                    if (tileData && tileData.image && tileData.uniqueId === proxy.pdfViewerBase.documentId) {
                                        proxy.pdfViewer.fireAjaxRequestSuccess(proxy.pdfViewer.serverActionSettings.renderPages, tileData);
                                        var pageNumber = (tileData.pageNumber !== undefined) ? tileData.pageNumber : pageIndex_2;
                                        if (x_1 === 0 && y_1 === 0) {
                                            var blobObj = proxy.pdfViewerBase.createBlobUrl(tileData.image.split('base64,')[1], 'image/png');
                                            var Url = URL || webkitURL;
                                            var blobUrl = Url.createObjectURL(blobObj);
                                            var storeObject = {
                                                image: blobUrl, width: tileData.pageWidth, uniqueId: tileData.uniqueId,
                                                tileX: tileData.tileX, tileY: tileData.tileY,
                                                zoomFactor: tileData.zoomFactor,
                                                transformationMatrix: tileData.transformationMatrix
                                            };
                                            if (tileData.isTextNeed) {
                                                tileData.textBounds = textBounds;
                                                tileData.textContent = textContent;
                                                tileData.rotation = rotation;
                                                tileData.pageText = pageText;
                                                proxy.pdfViewerBase.storeTextDetails(pageIndex_2, textBounds, textContent, pageText, rotation, characterBounds);
                                            }
                                            else {
                                                var textDetails = JSON.parse(proxy.pdfViewerBase.pageTextDetails["" + tileData.textDetailsId]);
                                                tileData.textBounds = textDetails.textBounds;
                                                tileData.textContent = textDetails.textContent;
                                                tileData.rotation = textDetails.rotation;
                                                tileData.pageText = textDetails.pageText;
                                                tileData.characterBounds = textDetails.characterBounds;
                                            }
                                            proxy.pdfViewerBase.storeImageData(pageNumber, storeObject, tileData.tileX, tileData.tileY);
                                        }
                                        else {
                                            var blobObj = proxy.pdfViewerBase.createBlobUrl(tileData.image.split('base64,')[1], 'image/png');
                                            var Url = URL || webkitURL;
                                            var blobUrl = Url.createObjectURL(blobObj);
                                            var storeObject = {
                                                image: blobUrl, width: tileData.width, uniqueId: tileData.uniqueId,
                                                tileX: tileData.tileX, tileY: tileData.tileY, zoomFactor: tileData.zoomFactor,
                                                transformationMatrix: tileData.transformationMatrix
                                            };
                                            proxy.pdfViewerBase.storeImageData(pageNumber, storeObject, tileData.tileX, tileData.tileY);
                                        }
                                        proxy.searchRequestOnSuccess(tileData, proxy, viewPortWidth, pageWidth, isTileRendering, pageIndex_2, x_1, y_1, noTileX_1, noTileY_1);
                                    }
                                }
                                break;
                        }
                    });
                }
            };
            for (var y = 0; y < noTileY; y++) {
                _loop_2(y);
            }
        };
        var this_1 = this;
        for (var x = 0; x < noTileX; x++) {
            _loop_1(x);
        }
    };
    TextSearch.prototype.searchRequestOnSuccess = function (data, proxy, viewPortWidth, pageWidth, isTileRendering, pageIndex, x, y, noTileX, noTileY) {
        if (!isNullOrUndefined(data.pageText) && data.uniqueId === proxy.pdfViewerBase.documentId) {
            this.getSearchCountText();
            proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderPages, data);
            var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex;
            if (viewPortWidth >= pageWidth) {
                proxy.pdfViewerBase.storeWinData(data, pageNumber);
            }
            else {
                proxy.pdfViewerBase.storeWinData(data, pageNumber, data.tileX, data.tileY);
            }
            if (!isTileRendering) {
                if (!this.isMessagePopupOpened) {
                    proxy.initSearch(pageIndex, false);
                }
            }
            else {
                if (x === (noTileX - 1) && y === (noTileY - 1)) {
                    if (!this.isMessagePopupOpened) {
                        proxy.initSearch(pageIndex, false);
                    }
                }
            }
        }
        else if (isTileRendering && data.uniqueId === proxy.pdfViewerBase.documentId) {
            proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderPages, data);
            var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex;
            proxy.pdfViewerBase.storeWinData(data, pageNumber, data.tileX, data.tileY);
            if (x === (noTileX - 1) && y === (noTileY - 1)) {
                proxy.initSearch(pageIndex, false);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.getPDFDocumentTexts = function () {
        var startIndex = 0;
        var endIndex = 50;
        var pageCount = this.pdfViewerBase.pageCount;
        if (endIndex >= pageCount) {
            endIndex = pageCount;
        }
        this.createRequestForGetPdfTexts(startIndex, endIndex);
    };
    /**
     * @param {number} startIndex - It describes about the start index
     * @param {number} endIndex - It describes about the end index
     * @private
     * @returns {void}
     */
    TextSearch.prototype.createRequestForGetPdfTexts = function (startIndex, endIndex) {
        // eslint-disable-next-line
        var proxy = this;
        var jsonObject = { pageStartIndex: startIndex, pageEndIndex: endIndex, documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId, action: 'RenderPdfTexts', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        this.searchRequestHandler = new AjaxHandler(this.pdfViewer);
        this.searchRequestHandler.url = this.pdfViewer.serviceUrl + '/' + this.pdfViewer.serverActionSettings.renderTexts;
        this.searchRequestHandler.responseType = 'json';
        if (!this.pdfViewerBase.clientSideRendering) {
            this.searchRequestHandler.send(jsonObject);
        }
        this.searchRequestHandler.onSuccess = function (result) {
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderTexts);
                        data = null;
                    }
                }
                if (data) {
                    proxy.pdfTextSearchRequestOnSuccess(data, proxy, startIndex, endIndex);
                }
            }
        };
        this.searchRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderTexts);
        };
        this.searchRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderTexts);
        };
        if (this.pdfViewerBase.clientSideRendering) {
            var requestType = 'pdfTextSearchRequest';
            this.pdfViewer.pdfRendererModule.getDocumentText(jsonObject, requestType);
        }
    };
    /**
     * @private
     * @param {any} data - It gets the data
     * @param {number} startIndex - It gets the starting index
     * @param {number} endIndex - It gets the ending index
     * @returns {void}
     */
    TextSearch.prototype.pdfTextSearchRequestSuccess = function (data, startIndex, endIndex) {
        this.pdfTextSearchRequestOnSuccess(data, this, startIndex, endIndex);
    };
    TextSearch.prototype.pdfTextSearchRequestOnSuccess = function (data, proxy, startIndex, endIndex) {
        if (data.documentTextCollection && data.uniqueId === proxy.pdfViewerBase.documentId) {
            if (!data.isNeedToRender) {
                proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderTexts, data);
                proxy.documentTextCollection = this.updateDocumentCollection(proxy.documentTextCollection, data.documentTextCollection);
                var pageCount = proxy.pdfViewerBase.pageCount;
                if (endIndex !== pageCount) {
                    startIndex = endIndex;
                    endIndex = endIndex + 50;
                    if (endIndex >= pageCount) {
                        endIndex = pageCount;
                    }
                    proxy.createRequestForGetPdfTexts(startIndex, endIndex);
                }
                else {
                    proxy.isTextRetrieved = true;
                    proxy.pdfViewer.pdfRendererModule.documentTextCollection = [];
                    proxy.pdfViewer.fireTextExtractionCompleted(proxy.documentTextCollection);
                    if (proxy.isTextSearched && proxy.searchString.length > 0) {
                        proxy.textSearch(proxy.searchString);
                        proxy.isTextSearched = false;
                    }
                }
            }
            else {
                proxy.findTextDocumentCollection = this.updateDocumentCollection(proxy.findTextDocumentCollection, data.documentTextCollection);
                proxy.pdfViewer.pdfRendererModule.documentTextCollection = [];
            }
        }
    };
    TextSearch.prototype.updateDocumentCollection = function (textCollection, eventDataCollection) {
        if (textCollection && textCollection.length > 0) {
            if ((this.pdfViewer.isVue) && !(this.pdfViewer.isVue3)) {
                textCollection = this.orderPdfTextCollections(JSON.parse("[" + JSON.stringify(textCollection).slice(1, -1) + "," + JSON.stringify(eventDataCollection).slice(1, -1) + "]"));
            }
            else {
                textCollection = eventDataCollection.concat(textCollection);
                textCollection = this.orderPdfTextCollections(textCollection);
            }
        }
        else {
            if ((this.pdfViewer.isVue) && !(this.pdfViewer.isVue3)) {
                textCollection = JSON.parse("[" + JSON.stringify(eventDataCollection).slice(1, -1) + "]");
            }
            else {
                textCollection = eventDataCollection;
            }
        }
        return textCollection;
    };
    TextSearch.prototype.orderPdfTextCollections = function (oldCollection) {
        var annotationCollectionList = [];
        for (var i = 0; i < oldCollection.length; i++) {
            if (annotationCollectionList.length === 0) {
                annotationCollectionList.push(oldCollection[parseInt(i.toString(), 10)]);
            }
            else {
                if (parseInt(Object.keys(oldCollection[parseInt(i.toString(), 10)])[0], 10) >
                    parseInt(Object.keys(annotationCollectionList[annotationCollectionList.length - 1])[0], 10)) {
                    annotationCollectionList.push(oldCollection[parseInt(i.toString(), 10)]);
                }
                else {
                    for (var j = 0; j < annotationCollectionList.length; j++) {
                        if ((parseInt(Object.keys(oldCollection[parseInt(i.toString(), 10)])[0], 10) <
                            parseInt(Object.keys(annotationCollectionList[parseInt(j.toString(), 10)])[0], 10))) {
                            annotationCollectionList.splice(j, 0, oldCollection[parseInt(i.toString(), 10)]);
                            break;
                        }
                    }
                }
            }
        }
        return annotationCollectionList;
    };
    TextSearch.prototype.createSearchBoxButtons = function (id, className) {
        var button = createElement('button', { id: this.pdfViewer.element.id + '_' + id, className: 'e-btn e-icon-btn e-pv-text-search-btn ' + className });
        button.setAttribute('type', 'button');
        var iconSpan = createElement('span', { id: this.pdfViewer.element.id + '_' + id + 'Icon', className: 'e-pv-icon-search ' + className + '-icon' });
        button.disabled = true;
        button.appendChild(iconSpan);
        return button;
    };
    TextSearch.prototype.enablePrevButton = function (isEnable) {
        if ((!Browser.isDevice || this.pdfViewer.enableDesktopMode)) {
            if (isEnable) {
                this.prevSearchBtn.removeAttribute('disabled');
            }
            else {
                if (this.prevSearchBtn) {
                    this.prevSearchBtn.disabled = true;
                }
            }
        }
    };
    TextSearch.prototype.enableNextButton = function (isEnable) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (isEnable) {
                this.nextSearchBtn.removeAttribute('disabled');
            }
            else {
                if (this.nextSearchBtn) {
                    this.nextSearchBtn.disabled = true;
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.resetVariables = function () {
        this.searchedPages = [];
        this.searchMatches = [];
        this.searchedOccurrences = [];
    };
    TextSearch.prototype.resetVariablesTextSearch = function () {
        this.getSearchTextDetails = {};
        this.isTextSearchHandled = false;
    };
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isMobileSearch - It indicates is mobile search or not
     * @private
     * @returns {void}
     */
    TextSearch.prototype.searchButtonClick = function (element, inputElement, isMobileSearch) {
        this.isMessagePopupOpened = false;
        if (element.classList.contains('e-pv-search-icon')) {
            this.initiateTextSearch(inputElement.value, isMobileSearch);
        }
        else if (element.classList.contains('e-pv-search-close')) {
            this.showLoadingIndicator(false);
            inputElement.value = '';
            this.resetTextSearch();
            if (this.searchCountEle) {
                this.searchCountEle.innerHTML = '';
                this.adjustInputContainerWidth();
            }
            inputElement.focus();
        }
    };
    TextSearch.prototype.updateSearchInputIcon = function (isEnable) {
        if (isBlazor()) {
            if (this.searchBtn && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
                this.searchBtn = this.pdfViewerBase.getElement('_search_box-icon').children[0].children[0];
            }
        }
        if (this.searchBtn) {
            if (isEnable) {
                this.searchBtn.classList.remove('e-pv-search-close');
                this.searchBtn.classList.add('e-pv-search-icon');
            }
            else {
                this.searchBtn.classList.remove('e-pv-search-icon');
                this.searchBtn.classList.add('e-pv-search-close');
            }
        }
    };
    TextSearch.prototype.onMessageBoxOpen = function () {
        var _this = this;
        this.pdfViewer.fireTextSearchComplete(this.searchString, this.isMatchCase);
        this.showLoadingIndicator(false);
        this.isMessagePopupOpened = true;
        if (this.pdfViewer.showNotificationDialog) {
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                if (isBlazor()) {
                    var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Nomatches');
                    promise.then(function (value) {
                        _this.pdfViewerBase.createNotificationPopup(value);
                    });
                }
                else {
                    if (this.searchMatches.length > 0) {
                        this.pdfViewerBase.createNotificationPopup(this.pdfViewer.localeObj.getConstant('No More Matches'));
                    }
                    else {
                        this.pdfViewerBase.createNotificationPopup(this.pdfViewer.localeObj.getConstant('No Matches'));
                    }
                }
            }
            else {
                if (isBlazor()) {
                    var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_NoTextFound');
                    promise.then(function (value) {
                        _this.pdfViewerBase.navigationPane.createTooltipMobile(value);
                    });
                }
                else {
                    if (this.searchMatches.length > 0) {
                        this.pdfViewerBase.navigationPane.createTooltipMobile(this.pdfViewer.localeObj.getConstant('No More Search Matches'));
                    }
                    else {
                        this.pdfViewerBase.navigationPane.createTooltipMobile(this.pdfViewer.localeObj.getConstant('No Search Matches'));
                    }
                }
            }
        }
        else {
            setTimeout(function () {
                _this.isMessagePopupOpened = false;
            }, 100);
        }
        this.currentOccurrence = this.searchCount;
        this.isLastOccurrenceCompleted = true;
        if (this.currentOccurrence === this.searchCount) {
            this.currentOccurrence = 0;
        }
        if (this.searchCountEle && this.isSingleSearch) {
            this.getSearchCountText();
            this.adjustInputContainerWidth();
        }
        this.searchedPages = [];
        this.searchedOccurrences = [];
        this.searchIndex = 0;
        if (!this.programaticalSearch) {
            if (!this.isDocumentTextCollectionReady) {
                this.hightlightSearchedTexts(undefined, true, true);
            }
            else {
                this.highlightAfterComplete();
            }
        }
        this.searchString = '';
        this.searchPageIndex = this.startSearchPageIndex;
        if (isNullOrUndefined(this.searchPageIndex)) {
            this.pdfViewerBase.updateScrollTop(0);
        }
        else {
            this.pdfViewerBase.updateScrollTop(this.searchPageIndex);
        }
        this.showLoadingIndicator(false);
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.highlightAfterComplete = function () {
        for (var k = 0; k < this.searchMatches.length; k++) {
            if (this.searchMatches[parseInt(k.toString(), 10)] && this.searchMatches[parseInt(k.toString(), 10)].length > 0) {
                var matches = this.searchMatches[parseInt(k.toString(), 10)];
                var className = 'e-pv-search-text-highlightother';
                var characterBounds = this.pdfViewerBase.textLayer.characterBound[parseInt(k.toString(), 10)];
                if (characterBounds && matches !== undefined) {
                    for (var i = 0; i < matches.length; i++) {
                        if ((matches[parseInt(i.toString(), 10)].length)) {
                            var documentIndex = this.documentTextCollection[parseInt(k.toString(), 10)][parseInt(k.toString(), 10)];
                            var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                            var searchString = this.searchInput.value;
                            if (!this.isMatchCase) {
                                searchString = searchString.toLowerCase();
                                pageTextData = pageTextData.toLowerCase();
                            }
                            var arrayReturns = this.correctLinetext(searchString, null, pageTextData);
                            for (var j = 0; j < arrayReturns.length; j++) {
                                var idString = void 0;
                                if (j === 0) {
                                    idString = '_searchtext_' + k + '_' + i;
                                }
                                else {
                                    idString = '_searchtext_' + k + '_' + i + '_' + j;
                                }
                                if (!this.pdfViewerBase.getElement(idString)) {
                                    this.addDivForSearch(i, k, characterBounds, (arrayReturns[parseInt(j.toString(), 10)].trim()).length, className, j);
                                }
                            }
                        }
                        if (isNullOrUndefined(matches[parseInt(i.toString(), 10)].length)) {
                            this.addDivForSearch(i, k, characterBounds, this.searchInput.value.length, className, undefined);
                        }
                    }
                }
            }
        }
    };
    /**
     * Searches the target text in the PDF document and highlights the occurrences in the pages
     *
     * @param  {string} searchText - Specifies the searchText content
     * @param  {boolean} isMatchCase - If set true , its highlights the MatchCase content
     * @returns {void}
     */
    TextSearch.prototype.searchText = function (searchText, isMatchCase) {
        var _this = this;
        if (this.documentTextCollection.length === this.pdfViewerBase.pageCount) {
            this.isDocumentTextCollectionReady = true;
        }
        else {
            var updateInterval_1 = setInterval(function () {
                if (_this.documentTextCollection.length === _this.pdfViewerBase.pageCount) {
                    clearInterval(updateInterval_1);
                    _this.calculateSearchCount(searchText, _this.documentTextCollection);
                    _this.getSearchTextDetails = {};
                    _this.isDocumentTextCollectionReady = true;
                }
            }, 1000);
        }
        if (this.isDocumentTextCollectionReady || !this.pdfViewerBase.clientSideRendering) {
            if (searchText && searchText.length > 0 && searchText[searchText.length - 1] === ' ') {
                searchText = searchText.slice(0, searchText.length - 1);
            }
            if (this.pdfViewer.enableHtmlSanitizer && searchText) {
                searchText = SanitizeHtmlHelper.sanitize(searchText);
            }
            this.searchString = searchText;
            this.isMatchCase = isMatchCase;
            this.searchIndex = 0;
            this.programaticalSearch = true;
            this.isSingleSearch = true;
            this.isTextSearchHandled = false;
            this.calculateSearchCount(searchText, this.documentTextCollection);
            this.textSearch(searchText);
        }
        else {
            if (this.searchString !== searchText) {
                this.isSingleSearch = true;
                this.searchString = searchText;
                this.isMatchCase = isMatchCase;
                this.searchIndex = 0;
                this.searchCount = 0;
                this.searchPageIndex = 0;
                this.programaticalSearch = true;
                this.textSearchWhileLoading(searchText, isMatchCase);
            }
        }
    };
    /**
     * Searches the next occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns {void}
     */
    TextSearch.prototype.searchNext = function () {
        this.nextSearch();
    };
    /**
     * Searches the previous occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns {void}
     */
    TextSearch.prototype.searchPrevious = function () {
        this.prevSearch();
    };
    /**
     * Cancels the text search of the PdfViewer.
     *
     * @returns {void}
     */
    TextSearch.prototype.cancelTextSearch = function () {
        this.resetTextSearch();
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.destroy = function () {
        this.searchMatches = undefined;
    };
    /**
     * Searches for the specified text or an array of strings within the document and returns the bounding rectangles for each occurrence. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for these search strings on that page; otherwise, it returns the bounding rectangles for all pages in the document where the strings were found.
     *
     * @param  {string | string[]} searchText - Specifies the search text content. If an array is passed, it will search for multiple texts.
     * @param  {boolean} isMatchCase - If set to true, it will consider match case during the search.
     * @param  {number} [pageIndex] - Optional parameter to specify a particular page to search in the document.
     * @returns { Record<string, SearchResultModel[]> | SearchResultModel[]} - If `searchText` is a string, it returns an array of `SearchResult` objects, where each object contains the page index and an array of bounds representing the locations of the search text found on that page. If `searchText` is an array of strings, it returns an object where each key is a search text string, and each value is an array of `SearchResult` objects. Each `SearchResult` object contains the page index and an array of bounds representing the locations of that search text on the corresponding page.
     */
    TextSearch.prototype.findText = function (searchText, isMatchCase, pageIndex) {
        var _this = this;
        this.isMatchCase = isMatchCase;
        var searchTerms = Array.isArray(searchText) ? searchText : [searchText];
        var searchResults = {};
        var startIndex = !isNullOrUndefined(pageIndex) ? pageIndex : 0;
        var endIndex = !isNullOrUndefined(pageIndex) ? pageIndex + 1 : this.documentTextCollection.length;
        var fetchTextCollection = function (endIndex) {
            return _this.documentTextCollection[parseInt(endIndex.toString(), 10)] ?
                _this.documentTextCollection[parseInt(endIndex.toString(), 10)][parseInt(endIndex.toString(), 10)] : null;
        };
        var documentTextCollection = fetchTextCollection(endIndex - 1);
        var findTextResult = [];
        if (documentTextCollection && documentTextCollection.TextData.length > 0) {
            findTextResult = this.getSearchResults(searchText, searchTerms, searchResults, startIndex, endIndex, this.documentTextCollection);
        }
        return findTextResult;
    };
    /**
     * Searches for the specified text or an array of strings within the document and returns the bounding rectangles for each occurrence. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for these search strings on that page; otherwise, it returns the bounding rectangles for all pages in the document where the strings were found.
     *
     * @param  {string | string[]} searchText - Specifies the search text content. If an array is passed, it will search for multiple texts.
     * @param  {boolean} isMatchCase - If set to true, it will consider match case during the search.
     * @param  {number} [pageIndex] - Optional parameter to specify a particular page to search in the document.
     * @returns {Promise<SearchResultModel[] | Record<string, SearchResultModel[]>>} - If `searchText` is a string, the method returns a Promise that resolves to an array of `SearchResult` objects, where each object contains the page index and an array of bounds representing the locations of the search text found on that page. If `searchText` is an array of strings, it returns a Promise that resolves to an object, where each key is a search text string, and each value is an array of `SearchResult` objects. Each `SearchResult` object contains the page index and an array of bounds representing the locations of that search text on the corresponding page.
     */
    TextSearch.prototype.findTextAsync = function (searchText, isMatchCase, pageIndex) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        this.isMatchCase = isMatchCase;
        this.pdfViewer.pdfRenderer.searchResults = {};
        var searchTerms = Array.isArray(searchText) ? searchText : [searchText];
        var searchResults = {};
        var startIndex = pageIndex ? pageIndex : 0;
        var endIndex = !isNullOrUndefined(pageIndex) ? pageIndex + 1 : this.pdfViewerBase.pageCount;
        var jsonObject = { pageStartIndex: startIndex, pageEndIndex: endIndex, documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId, action: 'RenderPdfTexts', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        var requestType = 'pdfTextSearchRequest';
        if (this.pdfViewer.extractTextOption === ExtractTextOption.None ||
            this.pdfViewer.extractTextOption === ExtractTextOption.TextOnly) {
            return new Promise(function (resolve, reject) {
                var processPage = function (i, msg) {
                    proxy.pdfViewerBase.pdfViewerRunner.addTask({
                        pageIndex: i,
                        message: msg,
                        zoomFactor: proxy.pdfViewer.magnificationModule.zoomFactor,
                        isTextNeed: true,
                        isLayout: true,
                        isSkipCharacterBounds: false,
                        isNeedToRender: true,
                        jsonObject: jsonObject,
                        isRenderText: true,
                        requestType: requestType
                    }, TaskPriorityLevel.Medium);
                    proxy.pdfViewerBase.pdfViewerRunner.onMessage(msg, function (event) {
                        if ((event.data.message.indexOf('extractText') !== -1)) {
                            proxy.pdfViewer.pdfRendererModule.textExtractionOnmessage(event, null, null);
                            if (event.data.pageIndex + 1 === endIndex) {
                                resolve(_this.getSearchResults(searchText, searchTerms, searchResults, startIndex, endIndex, proxy.findTextDocumentCollection));
                                proxy.findTextDocumentCollection = [];
                            }
                        }
                    });
                };
                var msg = 'extractText_' + PdfViewerUtils.createGUID();
                for (var i = startIndex; i < endIndex; i++) {
                    processPage(i, msg);
                }
            });
        }
        else {
            return Promise.resolve(this.getSearchResults(searchText, searchTerms, searchResults, startIndex, endIndex, proxy.documentTextCollection));
        }
    };
    TextSearch.prototype.getSearchResults = function (searchText, searchTerms, searchResults, startIndex, endIndex, documentCollection) {
        for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
            var term = searchTerms_1[_i];
            this.calculateSearchCount(term, documentCollection);
            searchResults["" + term] = [];
            for (var i = startIndex; i < endIndex; i++) {
                var matches = this.searchMatches[parseInt(i.toString(), 10)];
                if (!matches) {
                    continue;
                }
                var pageIndex = parseInt(Object.keys(documentCollection[parseInt(i.toString(), 10)])[0], 10);
                var documentIndex = documentCollection[parseInt(i.toString(), 10)][parseInt(pageIndex.toString(), 10)];
                var characterBounds = documentIndex.textData ? documentIndex.textData : documentIndex.TextData;
                if (!characterBounds) {
                    continue;
                }
                var pageResult = { pageIndex: i, bounds: [] };
                for (var _a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
                    var matchIndex = matches_1[_a];
                    var rect = this.calculateTextBounds(term, matchIndex, characterBounds);
                    pageResult.bounds.push(rect);
                }
                if (pageResult.bounds.length > 0) {
                    searchResults["" + term].push(pageResult);
                }
            }
        }
        return Array.isArray(searchText) ? searchResults : searchResults[searchText];
    };
    /**
     * Calculates the bounding rectangle for a given search text within the PDF based on character bounds.
     *
     * @param {string} searchText - The text string for which to calculate the bounding rectangle.
     * @param {any} matchIndex - The starting index of the match within the character bounds array.
     * @param {any} characterBounds - An array containing the bounds of each character on the page.
     * @private
     * @returns {IPdfRectBounds} - The calculated bounding rectangle, specifying the position and dimensions
     *                             (x, y, width, height) of the highlighted text area on the PDF page.
     */
    TextSearch.prototype.calculateTextBounds = function (searchText, matchIndex, characterBounds) {
        var startBound = characterBounds[parseInt(matchIndex.toString(), 10)].Bounds;
        var left = startBound.X;
        var top = startBound.Y;
        var width = 0;
        var height = startBound.Height;
        var lastRight = 0;
        for (var k = 0; k < searchText.length; k++) {
            var index = matchIndex && !isNullOrUndefined(matchIndex.length) && matchIndex.length > 1 ?
                matchIndex[0] : matchIndex;
            var currentBound = characterBounds[parseInt((index + k).toString(), 10)].Bounds;
            height = Math.max(height, currentBound.Height);
            if (k === searchText.length - 1) {
                lastRight = currentBound.Right;
            }
        }
        width = lastRight - left;
        return {
            x: left,
            y: top,
            width: width,
            height: height
        };
    };
    /**
     * @private
     * @returns {void}
     */
    TextSearch.prototype.getModuleName = function () {
        return 'TextSearch';
    };
    return TextSearch;
}());
export { TextSearch };
