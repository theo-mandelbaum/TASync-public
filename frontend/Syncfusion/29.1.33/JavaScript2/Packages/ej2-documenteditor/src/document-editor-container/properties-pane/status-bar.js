import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Represents document editor status bar.
 *
 * @private
 */
var StatusBar = /** @class */ (function () {
    function StatusBar(parentElement, docEditor) {
        this.startPage = 1;
        //Event Handler
        this.onPageLayoutClickHandler = this.onPageLayoutClick.bind(this);
        this.onWebLayoutClickHandler = this.onWebLayoutClick.bind(this);
        this.onPageNumberKeyDownHandler = this.onPageNumberKeyDown.bind(this);
        this.onPageNumberKeyUpHandler = this.onPageNumberKeyUp.bind(this);
        this.onPageNumberBlurHandler = this.onPageNumberBlur.bind(this);
        this.onPageNumberFocusHandler = this.onPageNumberFocus.bind(this);
        this.statusBarDiv = parentElement;
        this.container = docEditor;
        this.initializeStatusBar();
        this.wireEvents();
    }
    //Event Handler Methods
    StatusBar.prototype.onPageLayoutClick = function () {
        this.documentEditor.layoutType = 'Pages';
        this.addRemoveClass(this.pageButton, this.webButton);
        this.documentEditor.focusIn();
    };
    StatusBar.prototype.onWebLayoutClick = function () {
        this.documentEditor.layoutType = 'Continuous';
        this.addRemoveClass(this.webButton, this.pageButton);
        this.documentEditor.focusIn();
    };
    StatusBar.prototype.onPageNumberKeyDown = function (e) {
        if (e.which === 13) {
            e.preventDefault();
            var pageNumber = parseInt(this.pageNumberInput.value, 10);
            if (pageNumber > this.editorPageCount) {
                this.updatePageNumber();
            }
            else {
                if (this.documentEditor.selectionModule) {
                    this.documentEditor.selectionModule.goToPage(parseInt(this.pageNumberInput.value, 10));
                    this.documentEditor.focusIn();
                }
                else {
                    this.documentEditor.scrollToPage(parseInt(this.pageNumberInput.value, 10));
                }
            }
            this.pageNumberInput.contentEditable = 'false';
            if (this.pageNumberInput.value === '') {
                this.updatePageNumber();
            }
        }
        if (e.which > 64) {
            e.preventDefault();
        }
    };
    StatusBar.prototype.onPageNumberKeyUp = function () {
        this.updatePageNumberWidth();
    };
    StatusBar.prototype.onPageNumberBlur = function () {
        if (this.pageNumberInput.value === '' || parseInt(this.pageNumberInput.value, 10) > this.editorPageCount) {
            this.updatePageNumber();
        }
        this.pageNumberInput.contentEditable = 'false';
    };
    StatusBar.prototype.onPageNumberFocus = function () {
        this.pageNumberInput.select();
    };
    Object.defineProperty(StatusBar.prototype, "documentEditor", {
        //Public Methods
        //Properties
        get: function () {
            return this.container ? this.container.documentEditor : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusBar.prototype, "editorPageCount", {
        get: function () {
            return this.documentEditor ? this.documentEditor.pageCount : 1;
        },
        enumerable: true,
        configurable: true
    });
    StatusBar.prototype.initializeStatusBar = function () {
        var isRtl = this.container.enableRtl;
        this.documentEditor.enableSpellCheck = (this.container.enableSpellCheck) ? true : false;
        this.localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        var styles = isRtl ? 'padding-right:16px' : 'padding-left:16px';
        this.pageNumDiv = createElement('div', { className: (this.container.enableSpellCheck) ? 'e-de-ctnr-pg-no' : 'e-de-ctnr-pg-no-spellout', styles: styles });
        this.statusBarDiv.appendChild(this.pageNumDiv);
        this.pageLabel = createElement('span');
        this.pageLabel.textContent = this.localObj.getConstant('Page') + ' ';
        this.pageNumDiv.appendChild(this.pageLabel);
        this.pageNumberInput = createElement('input', { styles: 'text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text', attrs: { type: 'text', 'aria-label': this.localObj.getConstant('Current Page Number') }, className: 'e-de-pagenumber-input' });
        this.editablePageNumber = createElement('div', { styles: 'display: inline-flex', className: 'e-input e-de-pagenumber-text' });
        this.editablePageNumber.appendChild(this.pageNumberInput);
        var pageNumberOfLabelStyle = '';
        if (isRtl) {
            this.pageLabel.style.marginLeft = '6px';
            this.editablePageNumber.style.marginLeft = '6px';
            pageNumberOfLabelStyle = 'padding-left:5px';
        }
        else {
            this.pageLabel.style.marginRight = '6px';
            this.editablePageNumber.style.marginRight = '6px';
            pageNumberOfLabelStyle = 'padding-right:5px';
        }
        this.updatePageNumber();
        this.pageNumDiv.appendChild(this.editablePageNumber);
        this.editablePageNumber.setAttribute('title', this.localObj.getConstant('Current Page Number'));
        this.ofLabel = createElement('span', { styles: pageNumberOfLabelStyle });
        this.ofLabel.textContent = ' ' + this.localObj.getConstant('of') + ' ';
        this.pageNumDiv.appendChild(this.ofLabel);
        this.pageCount = createElement('span');
        this.pageNumDiv.appendChild(this.pageCount);
        this.updatePageCount();
        if (this.documentEditor.enableSpellCheck) {
            this.verticalLine = createElement('div', { className: 'e-de-statusbar-separator' });
            this.statusBarDiv.appendChild(this.verticalLine);
            this.spellCheckBtn = this.addSpellCheckElement();
            this.spellCheckButton.appendTo(this.spellCheckBtn);
        }
        this.pageButton = this.createButtonTemplate((this.container.enableSpellCheck) ? 'e-de-statusbar-pageweb e-btn-pageweb-spellcheck' : 'e-de-statusbar-pageweb', 'e-de-printlayout e-icons', 'Print layout', this.statusBarDiv, this.pageButton, (this.documentEditor.layoutType === 'Pages') ? true : false);
        this.webButton = this.createButtonTemplate('e-de-statusbar-pageweb', 'e-de-weblayout e-icons', 'Web layout', this.statusBarDiv, this.webButton, (this.documentEditor.layoutType === 'Continuous') ? true : false);
        this.pageButton.addEventListener('click', this.onPageLayoutClickHandler);
        this.webButton.addEventListener('click', this.onWebLayoutClickHandler);
        this.zoomBtn = createElement('button', {
            className: 'e-de-statusbar-zoom', attrs: { type: 'button' }
        });
        this.statusBarDiv.appendChild(this.zoomBtn);
        this.zoomBtn.setAttribute('title', this.localObj.getConstant('ZoomLevelTooltip'));
        var items = [
            {
                text: '200%'
            },
            {
                text: '175%'
            },
            {
                text: '150%'
            },
            {
                text: '125%'
            },
            {
                text: '100%'
            },
            {
                text: '75%'
            },
            {
                text: '50%'
            },
            {
                text: '25%'
            },
            {
                separator: true
            },
            {
                text: this.localObj.getConstant('Fit one page')
            },
            {
                text: this.localObj.getConstant('Fit page width')
            }
        ];
        this.zoom = new DropDownButton({ content: '100%', items: items, enableRtl: this.container.enableRtl, select: this.onZoom.bind(this) });
        this.zoom.isStringTemplate = true;
        this.zoom.appendTo(this.zoomBtn);
    };
    StatusBar.prototype.addSpellCheckElement = function () {
        var _this = this;
        var spellCheckBtn = createElement('button', {
            className: 'e-de-statusbar-spellcheck'
        });
        this.statusBarDiv.appendChild(spellCheckBtn);
        spellCheckBtn.setAttribute('title', 'Spell Checker options');
        var spellCheckItems = [
            {
                text: this.localObj.getConstant('Spell Check')
            },
            {
                text: this.localObj.getConstant('Underline errors')
            }
        ];
        this.spellCheckButton = new DropDownButton({
            content: this.localObj.getConstant('Spelling'), items: spellCheckItems, enableRtl: this.container.enableRtl, select: this.onSpellCheck.bind(this),
            beforeItemRender: function (args) {
                args.element.innerHTML = '<span></span>' + args.item.text;
                if (isNullOrUndefined(_this.currentLanguage)) {
                    _this.currentLanguage = _this.documentEditor.spellCheckerModule.languageID;
                }
                if (isNullOrUndefined(_this.allowSuggestion)) {
                    _this.allowSuggestion = _this.documentEditor.spellCheckerModule.allowSpellCheckAndSuggestion;
                }
                var span = args.element.children[0];
                if (args.item.text === _this.localObj.getConstant('Spell Check') && _this.documentEditor.enableSpellCheck &&
                    _this.documentEditor.spellCheckerModule.enableSpellCheck) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-spellcheck-item');
                }
                else if (args.item.text === _this.localObj.getConstant('Underline errors') && _this.documentEditor.enableSpellCheck &&
                    _this.documentEditor.spellCheckerModule.enableSpellCheck && !_this.documentEditor.spellCheckerModule.removeUnderline) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-underline-item');
                }
                else {
                    span.style.marginRight = '25px';
                    args.element.children[0].classList.remove('e-de-selected-spellcheck-item');
                    args.element.children[0].classList.remove('e-de-selected-underline-item');
                }
            }
        });
        return spellCheckBtn;
    };
    StatusBar.prototype.onZoom = function (args) {
        this.setZoomValue(args.item.text);
        this.updateZoomContent();
    };
    StatusBar.prototype.onSpellCheck = function (args) {
        this.setSpellCheckValue(args.item.text);
    };
    StatusBar.prototype.updateZoomContent = function () {
        this.zoom.content = Math.round(this.documentEditor.zoomFactor * 100) + '%';
    };
    StatusBar.prototype.setSpellCheckValue = function (text) {
        this.spellCheckButton.content = this.localObj.getConstant('Spelling');
        if (text.match(this.localObj.getConstant('Spell Check'))) {
            this.documentEditor.spellCheckerModule.enableSpellCheck =
                (this.documentEditor.spellCheckerModule.enableSpellCheck) ? false : true;
            this.documentEditor.documentHelper.triggerSpellCheck = false;
            this.documentEditor.documentHelper.triggerElementsOnLoading = false;
        }
        else if (text.match(this.localObj.getConstant('Underline errors'))) {
            if (this.documentEditor.enableSpellCheck && this.documentEditor.spellCheckerModule.enableSpellCheck) {
                this.documentEditor.spellCheckerModule.removeUnderline =
                    (this.documentEditor.spellCheckerModule.removeUnderline) ? false : true;
            }
        }
    };
    StatusBar.prototype.setZoomValue = function (text) {
        if (text.match(this.localObj.getConstant('Fit one page'))) {
            this.documentEditor.fitPage('FitOnePage');
        }
        else if (text.match(this.localObj.getConstant('Fit page width'))) {
            this.documentEditor.fitPage('FitPageWidth');
        }
        else {
            this.documentEditor.zoomFactor = parseInt(text, 10) / 100;
        }
    };
    /**
     * Updates page count.
     *
     * @returns {void}
     */
    StatusBar.prototype.updatePageCount = function () {
        this.pageCount.textContent = this.editorPageCount.toString();
    };
    /**
     * Updates page number.
     *
     * @returns {void}
     */
    StatusBar.prototype.updatePageNumber = function () {
        this.pageNumberInput.value = this.startPage.toString();
        this.updatePageNumberWidth();
    };
    StatusBar.prototype.updatePageNumberOnViewChange = function (args) {
        if (this.documentEditor.selectionModule
            && this.documentEditor.selectionModule.startPage >= args.startPage
            && this.documentEditor.selectionModule.startPage <= args.endPage) {
            this.startPage = this.documentEditor.selectionModule.startPage;
        }
        else {
            this.startPage = args.startPage;
        }
        this.updatePageNumber();
        this.updatePageCount();
    };
    StatusBar.prototype.wireEvents = function () {
        this.pageNumberInput.addEventListener('keydown', this.onPageNumberKeyDownHandler);
        this.pageNumberInput.addEventListener('keyup', this.onPageNumberKeyUpHandler);
        this.pageNumberInput.addEventListener('blur', this.onPageNumberBlurHandler);
        this.pageNumberInput.addEventListener('focus', this.onPageNumberFocusHandler);
    };
    StatusBar.prototype.unWireEvents = function () {
        this.pageButton.removeEventListener('click', this.onPageLayoutClickHandler);
        this.webButton.removeEventListener('click', this.onWebLayoutClickHandler);
        this.pageNumberInput.removeEventListener('keydown', this.onPageNumberKeyDownHandler);
        this.pageNumberInput.removeEventListener('keyup', this.onPageNumberKeyUpHandler);
        this.pageNumberInput.removeEventListener('blur', this.onPageNumberBlurHandler);
        this.pageNumberInput.removeEventListener('focus', this.onPageNumberFocusHandler);
    };
    StatusBar.prototype.updatePageNumberWidth = function () {
        if (this.pageNumberInput) {
            this.pageNumberInput.style.width = this.pageNumberInput.value.length >= 3 ? '30px' : '22px';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    StatusBar.prototype.toggleWebLayout = function () {
        this.addRemoveClass(this.pageButton, this.webButton);
    };
    /**
     * @private
     * @returns {void}
     */
    StatusBar.prototype.togglePageLayout = function () {
        this.addRemoveClass(this.webButton, this.pageButton);
    };
    StatusBar.prototype.addRemoveClass = function (addToElement, removeFromElement) {
        addToElement.classList.add('e-btn-toggle');
        if (removeFromElement.classList.contains('e-btn-toggle')) {
            removeFromElement.classList.remove('e-btn-toggle');
        }
    };
    /* eslint-disable-next-line max-len */
    StatusBar.prototype.createButtonTemplate = function (className, iconcss, toolTipText, div, appendDiv, toggle) {
        appendDiv = createElement('Button', { className: className, attrs: { type: 'button' } });
        div.appendChild(appendDiv);
        var btn = new Button({
            cssClass: className, iconCss: iconcss, enableRtl: this.container.enableRtl
        });
        if (toggle === true) {
            appendDiv.classList.add('e-btn-toggle');
        }
        btn.appendTo(appendDiv);
        appendDiv.setAttribute('title', this.localObj.getConstant(toolTipText));
        if (toolTipText === 'Web layout') {
            this.webBtn = btn;
        }
        else {
            this.pageBtn = btn;
        }
        return appendDiv;
    };
    /**
     * @private
     * @returns {void}
     */
    StatusBar.prototype.destroy = function () {
        this.unWireEvents();
        this.removeHTMLDom();
        this.dependentComponentsDestroy();
        this.pageButton = undefined;
        this.webButton = undefined;
        this.pageNumberInput = undefined;
        this.statusBarDiv = undefined;
        this.pageCount = undefined;
        this.editablePageNumber = undefined;
        this.localObj = undefined;
        this.container = undefined;
    };
    StatusBar.prototype.dependentComponentsDestroy = function () {
        if (this.zoom) {
            this.zoom.destroy();
            this.zoom = undefined;
        }
        if (this.spellCheckButton) {
            this.spellCheckButton.destroy();
            this.spellCheckButton = undefined;
        }
        if (this.pageBtn) {
            this.pageBtn.destroy();
            this.pageBtn = undefined;
        }
        if (this.webBtn) {
            this.webBtn.destroy();
            this.webBtn = undefined;
        }
    };
    StatusBar.prototype.removeHTMLDom = function () {
        this.pageNumDiv.remove();
        this.statusBarDiv.remove();
        this.pageCount.remove();
        this.pageLabel.remove();
        this.pageNumberInput.remove();
        this.editablePageNumber.remove();
        this.ofLabel.remove();
        this.zoomBtn.remove();
        this.pageButton.remove();
        this.webButton.remove();
        if (!isNullOrUndefined(this.verticalLine)) {
            this.verticalLine.remove();
        }
        if (!isNullOrUndefined(this.spellCheckBtn)) {
            this.spellCheckBtn.remove();
        }
    };
    return StatusBar;
}());
export { StatusBar };
