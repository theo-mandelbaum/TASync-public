/* eslint-disable */
import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';
import { TextElementBox, ErrorTextElementBox } from '../viewer/page';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
/**
 * Spell check dialog
 */
var SpellCheckDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function SpellCheckDialog(documentHelper) {
        var _this = this;
        this.ignoreClickHandler = this.onIgnoreClick.bind(this);
        this.ignoreAllClickHandler = this.onIgnoreAllClick.bind(this);
        this.addToDictClickHandler = this.onAddToDictClick.bind(this);
        this.selectHandlerClickHandler = this.onSelectHandlerClick.bind(this);
        this.changeButtonClickHandler = this.onChangeButtonClick.bind(this);
        this.onChangeAllButtonClickHandler = this.onChangeAllButtonClick.bind(this);
        /**
         * @param {SelectEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.selectHandler = function (args) {
            _this.selectedText = args.text;
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.clearSelectionHighlight();
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onIgnoreClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellCheckerModule.manageReplace('Ignore Once', _this.elementBox);
                _this.removeErrors();
                _this.parent.spellCheckerModule.checkForNextError();
                // this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.onIgnoreAllClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                var text = _this.elementBox.text;
                _this.parent.spellCheckerModule.handleIgnoreAllItems({ element: _this.elementBox, text: text });
                _this.parent.spellCheckerModule.checkForNextError();
                // this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.addToDictClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellCheckerModule.handleAddToDictionary({ element: _this.elementBox, text: _this.elementBox.text });
                if (_this.parent.spellCheckerModule.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellCheckerModule.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellCheckerModule.checkForNextError();
                _this.documentHelper.hideDialog();
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellCheckerModule.manageReplace(_this.selectedText, _this.elementBox);
                _this.removeErrors();
                _this.parent.spellCheckerModule.checkForNextError();
                hideSpinner(_this.documentHelper.dialog.element);
                _this.selectedText = undefined;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeAllButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                _this.parent.spellCheckerModule.isChangeAll = true;
                showSpinner(_this.documentHelper.dialog.element);
                var elements = _this.parent.spellCheckerModule.errorWordCollection.get(_this.errorText);
                for (var i = elements.length - 1; i >= 0; i--) {
                    if (elements[i] instanceof ErrorTextElementBox && !elements[i].ischangeDetected) {
                        _this.parent.spellCheckerModule.manageReplace(_this.selectedText, elements[i]);
                    }
                    else if (elements[i] instanceof TextElementBox) {
                        var matchResults = _this.parent.spellCheckerModule.getMatchedResultsFromElement(elements[i]);
                        var results = matchResults.textResults;
                        var markIndex = (elements[i].ischangeDetected) ?
                            elements[i].start.offset : elements[i].line.getOffset(elements[i], 0);
                        _this.parent.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, results, matchResults.elementInfo, 0, elements[i], false, null, markIndex);
                        for (var j = 0; j < results.length; j++) {
                            var element = _this.parent.spellCheckerModule.createErrorElementWithInfo(results.innerList[j], elements[i]);
                            _this.parent.spellCheckerModule.manageReplace(_this.selectedText, element);
                        }
                    }
                }
                if (_this.parent.spellCheckerModule.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellCheckerModule.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellCheckerModule.checkForNextError();
                _this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellCheckerModule.isChangeAll = false;
                _this.selectedText = undefined;
            }
        };
        this.documentHelper = documentHelper;
        createSpinner({ target: this.documentHelper.dialog.element, cssClass: 'e-spin-overlay' });
    }
    Object.defineProperty(SpellCheckDialog.prototype, "parent", {
        get: function () {
            return this.documentHelper.owner;
        },
        enumerable: true,
        configurable: true
    });
    SpellCheckDialog.prototype.getModuleName = function () {
        return 'SpellCheckDialog';
    };
    SpellCheckDialog.prototype.onSelectHandlerClick = function (args) {
        this.selectHandler(args);
    };
    SpellCheckDialog.prototype.onIgnoreClick = function () {
        this.onIgnoreClicked();
    };
    SpellCheckDialog.prototype.removeErrors = function () {
        if (!isNullOrUndefined(this.errorText) && this.parent.spellCheckerModule.errorWordCollection.containsKey(this.errorText)) {
            var textElement = this.parent.spellCheckerModule.errorWordCollection.get(this.errorText);
            textElement.splice(0, 1);
            if (textElement.length === 0) {
                this.parent.spellCheckerModule.errorWordCollection.remove(this.errorText);
            }
        }
        if (this.parent.spellCheckerModule.errorWordCollection.length === 0) {
            this.documentHelper.hideDialog();
        }
    };
    SpellCheckDialog.prototype.onIgnoreAllClick = function () {
        this.onIgnoreAllClicked();
    };
    SpellCheckDialog.prototype.onAddToDictClick = function () {
        this.addToDictClicked();
    };
    SpellCheckDialog.prototype.onChangeButtonClick = function () {
        this.changeButtonClicked();
    };
    SpellCheckDialog.prototype.onChangeAllButtonClick = function () {
        this.changeAllButtonClicked();
    };
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    SpellCheckDialog.prototype.show = function (error, elementbox) {
        this.target = undefined;
        this.localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        this.localValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.updateSuggestionDialog(error, elementbox);
        }
    };
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    SpellCheckDialog.prototype.updateSuggestionDialog = function (error, elementBox) {
        var _this = this;
        this.elementBox = elementBox;
        var suggestions;
        if (this.isSpellChecking) {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            this.parent.spellCheckerModule.callSpellChecker(this.parent.spellCheckerModule.languageID, error, false, true).then(function (data) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                var jsonObject = JSON.parse(data);
                suggestions = jsonObject.Suggestions;
                _this.isSpellChecking = false;
                _this.handleRetrievedSuggestion(error, suggestions);
            });
        }
        else {
            error = this.parent.spellCheckerModule.manageSpecialCharacters(error, undefined, true);
            suggestions = this.parent.spellCheckerModule.errorSuggestions.containsKey(error) ?
                this.parent.spellCheckerModule.errorSuggestions.get(error) : [];
            this.handleRetrievedSuggestion(error, suggestions);
        }
    };
    SpellCheckDialog.prototype.handleRetrievedSuggestion = function (error, suggestions) {
        error = this.parent.spellCheckerModule.manageSpecialCharacters(error, undefined, true);
        this.initSpellCheckDialog(this.localValue, error, suggestions);
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        this.documentHelper.dialog.header = this.localValue.getConstant('Spelling Editor');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.buttons = [{
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localValue.getConstant('Cancel'), cssClass: 'e-control e-flat', isPrimary: true }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
        hideSpinner(this.documentHelper.dialog.element);
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value.
     * @param {string} error - Specifies the error text.
     * @param {string[]} suggestion - Specifies the suggestion.
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    SpellCheckDialog.prototype.initSpellCheckDialog = function (localValue, error, suggestion, isRtl) {
        var id = this.documentHelper.owner.containerId + '_add_SpellCheck';
        this.target = createElement('div', { id: id, className: 'e-de-insert-spellchecker' });
        this.errorText = error;
        this.textContainer = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Spelling')
        });
        this.target.appendChild(this.textContainer);
        this.spellContainer = createElement('div', { className: 'e-de-spellcheck-error-container' });
        this.listviewDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
        this.spellContainer.appendChild(this.listviewDiv);
        this.spellingListView = new ListView({
            dataSource: [error],
            cssClass: 'e-dlg-spellcheck-listitem'
        });
        this.spellingListView.appendTo(this.listviewDiv);
        this.buttonDiv = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        this.spellContainer.appendChild(this.buttonDiv);
        this.ignoreButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore') });
        this.buttonDiv.appendChild(this.ignoreButtonElement);
        this.ignoreButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore'));
        this.ignorebutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        this.ignorebutton.appendTo(this.ignoreButtonElement);
        this.ignoreButtonElement.addEventListener('click', this.ignoreClickHandler);
        this.ignoreAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore All') });
        this.ignoreAllButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore All'));
        this.buttonDiv.appendChild(this.ignoreAllButtonElement);
        this.ignoreAllbutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        this.ignoreAllbutton.appendTo(this.ignoreAllButtonElement);
        this.ignoreAllButtonElement.addEventListener('click', this.ignoreAllClickHandler);
        this.addDictButtonElement = createElement('button', { innerHTML: localValue.getConstant('Add to Dictionary') });
        this.addDictButtonElement.setAttribute('aria-label', localValue.getConstant('Add to Dictionary'));
        this.buttonDiv.appendChild(this.addDictButtonElement);
        this.addDictButton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        this.addDictButton.appendTo(this.addDictButtonElement);
        this.addDictButtonElement.addEventListener('click', this.addToDictClickHandler);
        this.target.appendChild(this.spellContainer);
        this.suggestionDiv = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Suggestions')
        });
        this.target.appendChild(this.suggestionDiv);
        this.suggestionContainer = createElement('div', { className: 'e-de-spellcheck-suggestion-container' });
        this.target.appendChild(this.suggestionContainer);
        this.suggestListDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
        this.suggestListDiv.setAttribute('aria-label', localValue.getConstant('Suggestions'));
        this.suggestionContainer.appendChild(this.suggestListDiv);
        this.suggestionListView = new ListView({
            dataSource: suggestion,
            cssClass: 'e-dlg-spellcheck-listitem'
        });
        this.suggestionListView.appendTo(this.suggestListDiv);
        this.suggestionListView.addEventListener('select', this.selectHandlerClickHandler);
        this.suggestBtnContainder = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        this.suggestionContainer.appendChild(this.suggestBtnContainder);
        this.changeButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change') });
        this.changeButtonElement.setAttribute('aria-label', localValue.getConstant('Change'));
        this.suggestBtnContainder.appendChild(this.changeButtonElement);
        this.changeButton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        this.changeButton.appendTo(this.changeButtonElement);
        this.changeButtonElement.addEventListener('click', this.changeButtonClickHandler);
        this.changeAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change All') });
        this.changeAllButtonElement.setAttribute('aria-label', localValue.getConstant('Change All'));
        this.suggestBtnContainder.appendChild(this.changeAllButtonElement);
        this.changeAllbutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        this.changeAllbutton.appendTo(this.changeAllButtonElement);
        this.changeAllButtonElement.addEventListener('click', this.onChangeAllButtonClickHandler);
        if (isNullOrUndefined(suggestion) || suggestion.length === 0) {
            this.changeButton.disabled = true;
            this.changeAllbutton.disabled = true;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    SpellCheckDialog.prototype.destroy = function () {
        if (this.target) {
            this.target.remove();
            this.target = undefined;
        }
        if (this.elementBox) {
            this.elementBox.destroy();
            this.elementBox = undefined;
        }
        this.documentHelper = undefined;
        if (this.spellingListView) {
            this.spellingListView.destroy();
            this.spellingListView = undefined;
        }
        if (this.suggestionListView) {
            this.suggestionListView.destroy();
            this.suggestionListView = undefined;
        }
        this.selectedText = undefined;
        this.removeEvents();
        this.removeElements();
    };
    SpellCheckDialog.prototype.removeEvents = function () {
        if (this.ignoreButtonElement) {
            this.ignoreButtonElement.removeEventListener('click', this.ignoreClickHandler);
        }
        if (this.ignoreAllButtonElement) {
            this.ignoreAllButtonElement.removeEventListener('click', this.ignoreAllClickHandler);
        }
        if (this.addDictButtonElement) {
            this.addDictButtonElement.removeEventListener('click', this.addToDictClickHandler);
        }
        if (this.changeButtonElement) {
            this.changeButtonElement.removeEventListener('click', this.changeButtonClickHandler);
        }
        if (this.changeAllButtonElement) {
            this.changeAllButtonElement.removeEventListener('click', this.onChangeAllButtonClickHandler);
        }
        if (this.suggestionListView) {
            this.suggestionListView.removeEventListener('select', this.selectHandlerClickHandler);
        }
    };
    SpellCheckDialog.prototype.removeElements = function () {
        if (this.textContainer) {
            this.textContainer.remove();
            this.textContainer = undefined;
        }
        if (this.spellContainer) {
            this.spellContainer.remove();
            this.spellContainer = undefined;
        }
        if (this.listviewDiv) {
            this.listviewDiv.remove();
            this.listviewDiv = undefined;
        }
        if (this.buttonDiv) {
            this.buttonDiv.remove();
            this.buttonDiv = undefined;
        }
        if (this.ignoreButtonElement) {
            this.ignoreButtonElement.remove();
            this.ignoreButtonElement = undefined;
        }
        if (this.ignorebutton) {
            this.ignorebutton.destroy();
            this.ignorebutton = undefined;
        }
        if (this.ignoreAllButtonElement) {
            this.ignoreAllButtonElement.remove();
            this.ignoreAllButtonElement = undefined;
        }
        if (this.ignoreAllbutton) {
            this.ignoreAllbutton.destroy();
            this.ignoreAllbutton = undefined;
        }
        if (this.addDictButtonElement) {
            this.addDictButtonElement.remove();
            this.addDictButtonElement = undefined;
        }
        if (this.addDictButton) {
            this.addDictButton.destroy();
            this.addDictButton = undefined;
        }
        if (this.suggestionDiv) {
            this.suggestionDiv.remove();
            this.suggestionDiv = undefined;
        }
        if (this.suggestionContainer) {
            this.suggestionContainer.remove();
            this.suggestionContainer = undefined;
        }
        if (this.suggestListDiv) {
            this.suggestListDiv.remove();
            this.suggestListDiv = undefined;
        }
        if (this.suggestBtnContainder) {
            this.suggestBtnContainder.remove();
            this.suggestBtnContainder = undefined;
        }
        if (this.changeButtonElement) {
            this.changeButtonElement.remove();
            this.changeButtonElement = undefined;
        }
        if (this.changeButton) {
            this.changeButton.destroy();
            this.changeButton = undefined;
        }
        if (this.changeAllButtonElement) {
            this.changeAllButtonElement.remove();
            this.changeAllButtonElement = undefined;
        }
        if (this.changeAllbutton) {
            this.changeAllbutton.destroy();
            this.changeAllbutton = undefined;
        }
    };
    return SpellCheckDialog;
}());
export { SpellCheckDialog };
