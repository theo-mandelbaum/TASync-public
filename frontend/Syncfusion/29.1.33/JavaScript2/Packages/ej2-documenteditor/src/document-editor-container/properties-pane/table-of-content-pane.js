import { createElement, L10n, classList, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * TOC Properties pane
 *
 * @private
 */
var TocProperties = /** @class */ (function () {
    function TocProperties(container, isRtl) {
        //Events Hook Constants
        this.onCloseClickHook = this.onCloseClick.bind(this);
        this.onInsertToClickHook = this.onInsertToc.bind(this);
        this.container = container;
        this.elementId = this.documentEditor.element.id;
        this.isRtl = isRtl;
        this.initializeTocPane();
    }
    Object.defineProperty(TocProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TocProperties.prototype, "toolbar", {
        get: function () {
            return this.container.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {boolean} enable - enable/disable table of content pane.
     * @returns {void}
     */
    TocProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    TocProperties.prototype.initializeTocPane = function () {
        this.localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.element = createElement('div', { id: this.elementId + '_tocProperties', className: 'e-de-prop-pane' });
        var container = createElement('div', { className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
        this.tocHeaderDiv(container);
        this.initTemplates(container);
        container = createElement('div', { className: 'e-de-cntr-pane-padding' });
        this.tocOptionsDiv(container);
        this.contentStylesDropdown(container);
        this.checkboxContent(container);
        this.buttonDiv(container);
        this.wireEvents();
        this.updateTocProperties();
        this.container.propertiesPaneContainer.appendChild(this.element);
    };
    TocProperties.prototype.updateTocProperties = function () {
        this.rightalignPageNumber.checked = true;
        this.showPageNumber.checked = true;
        this.hyperlink.checked = true;
    };
    TocProperties.prototype.wireEvents = function () {
        this.cancelBtn.element.addEventListener('click', this.onCloseClickHook);
        this.updateBtn.element.addEventListener('click', this.onInsertToClickHook);
        this.closeButton.addEventListener('click', this.onCloseClickHook);
    };
    TocProperties.prototype.onCloseClick = function () {
        this.onClose();
    };
    TocProperties.prototype.onClose = function () {
        if (this.container.showPropertiesPane
            && this.container.previousContext !== 'TableOfContents') {
            this.container.showPropertiesPaneOnSelection();
        }
        else {
            this.showTocPane(false);
            if (this.toolbar) {
                this.toolbar.enableDisablePropertyPaneButton(false);
            }
            this.container.showPropertiesPane = false;
        }
    };
    TocProperties.prototype.tocHeaderDiv = function (container) {
        var closeButtonFloat;
        //let headerDivMargin: string;
        var closeButtonMargin;
        if (!this.isRtl) {
            closeButtonFloat = 'float:right;';
            //headerDivMargin = 'margin-left:5.5px;';
            closeButtonMargin = 'margin-right:7px;';
        }
        else {
            closeButtonFloat = 'float:left;';
            //headerDivMargin = 'margin-right:5.5px;';
            closeButtonMargin = 'margin-left:7px;';
        }
        this.headerDiv = createElement('div', {
            id: this.elementId + 'toc_id',
            styles: 'display: block;'
        });
        container.appendChild(this.headerDiv);
        this.element.appendChild(container);
        this.title = createElement('label', {
            className: 'e-de-ctnr-prop-label'
        });
        this.title.textContent = this.localObj.getConstant('Table of Contents');
        this.headerDiv.appendChild(this.title);
        this.closeButton = createElement('span', {
            className: 'e-de-ctnr-close e-icons',
            styles: 'cursor: pointer;display:inline-block;color: #4A4A4A;' + closeButtonFloat + closeButtonMargin
        });
        this.headerDiv.appendChild(this.closeButton);
    };
    TocProperties.prototype.initTemplates = function (container) {
        this.template1(container);
        // let div: HTMLElement = createElement('div', { styles: 'display:block;border-top: 1px solid #E0E0E0;' }); this.element.appendChild(div);
    };
    TocProperties.prototype.template1 = function (container) {
        this.template1Div = createElement('div', {
            className: 'e-de-toc-template1'
        });
        if (this.isRtl) {
            this.template1Div.classList.add('e-de-rtl');
        }
        container.appendChild(this.template1Div);
        this.templateContent1 = createElement('div', {
            className: 'e-de-toc-template1-content1'
        });
        this.templateContent1.textContent = this.localObj.getConstant('HEADING - - - - 1');
        this.template1Div.appendChild(this.templateContent1);
        this.templateContent2 = createElement('div', {
            className: 'e-de-toc-template1-content2'
        });
        this.templateContent2.textContent = this.localObj.getConstant('HEADING - - - - 2');
        this.template1Div.appendChild(this.templateContent2);
        this.templateContent3 = createElement('div', {
            className: 'e-de-toc-template1-content3'
        });
        this.templateContent3.textContent = this.localObj.getConstant('HEADING - - - - 3');
        this.template1Div.appendChild(this.templateContent3);
    };
    TocProperties.prototype.tocOptionsDiv = function (container) {
        this.optionsDiv = createElement('div');
        container.appendChild(this.optionsDiv);
        this.element.appendChild(container);
        if (this.isRtl) {
            this.optionsDiv.classList.add('e-de-rtl');
        }
        this.label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        this.label.textContent = this.localObj.getConstant('Options');
        this.optionsDiv.appendChild(this.label);
    };
    /* eslint-disable-next-line max-len */
    TocProperties.prototype.createDropDownButton = function (id, parentDiv, iconCss, content, selectedIndex) {
        var buttonElement = createElement('input', { id: id });
        parentDiv.appendChild(buttonElement);
        var dropDownBtn = new DropDownList({ index: selectedIndex, dataSource: content, popupHeight: '150px', cssClass: 'e-de-prop-font-button', placeholder: this.localObj.getConstant('Levels') }, buttonElement);
        return dropDownBtn;
    };
    /* eslint-disable */
    TocProperties.prototype.contentStylesDropdown = function (container) {
        var _this = this;
        var contentStyleElementMargin;
        if (!this.isRtl) {
            contentStyleElementMargin = 'margin-left:5.5px;';
        }
        else {
            contentStyleElementMargin = 'margin-right:5.5px;';
        }
        this.contentStyleElement = createElement('div', { id: 'contentstyle_div' });
        this.contentStyleElement.setAttribute('title', this.localObj.getConstant('Number of heading or outline levels to be shown in table of contents'));
        container.appendChild(this.contentStyleElement);
        // let items: ItemModel[] = [{ text: '___________', id: 'solid' }];
        // this.borderStyle = this.createDropDownButton(
        //     this.elementId + '_borderStyleDiv',
        //     'width:120px;height:28px;margin-top:8px', contentStyleElement, 'e-de-icon-stroke-size', 'Solid', items
        // );
        var labelMargin;
        if (!this.isRtl) {
            labelMargin = 'margin-right:8px;';
        }
        else {
            labelMargin = 'margin-left:8px';
        }
        this.dropDownLabel = createElement('label', { className: 'e-de-prop-sub-label', styles: 'display:block' });
        this.dropDownLabel.textContent = this.localObj.getConstant('Levels');
        this.contentStyleElement.appendChild(this.dropDownLabel);
        container.appendChild(this.contentStyleElement);
        var dataSource = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.borderLevelStyle = this.createDropDownButton(this.elementId + '_borderLevelDiv', this.contentStyleElement, '', dataSource, 2);
        this.borderLevelStyle.change = function (args) {
            _this.borderLevelStyle.value = args.item.value;
        };
        container.appendChild(this.contentStyleElement);
    };
    TocProperties.prototype.checkboxContent = function (container) {
        var checkboxElementMargin;
        if (!this.isRtl) {
            checkboxElementMargin = 'margin-left:5.5px;';
        }
        else {
            checkboxElementMargin = 'margin-right:5.5px;';
        }
        this.checkboxElement = createElement('div', { id: 'toc_checkboxDiv', styles: 'margin-bottom:36px;' });
        container.appendChild(this.checkboxElement);
        this.showPageNumberDiv = createElement('div', { className: 'e-de-toc-checkbox1' });
        this.showPageNumberDiv.setAttribute('title', this.localObj.getConstant('Show page numbers in table of contents'));
        this.checkboxElement.appendChild(this.showPageNumberDiv);
        this.showpagenumberCheckboxElement = createElement('input', { id: 'showpagenumber', styles: 'width:12px;height:12px;margin-bottom:8px', className: 'e-de-prop-sub-label' });
        this.showPageNumberDiv.appendChild(this.showpagenumberCheckboxElement);
        this.showPageNumber = new CheckBox({
            label: this.localObj.getConstant('Show page numbers'),
            enableRtl: this.isRtl
        });
        this.showPageNumber.appendTo(this.showpagenumberCheckboxElement);
        this.rightAlignDiv = createElement('div', { className: 'e-de-toc-checkbox2' });
        this.rightAlignDiv.setAttribute('title', this.localObj.getConstant('Right align page numbers in table of contents'));
        this.checkboxElement.appendChild(this.rightAlignDiv);
        this.rightalignpagenumberCheckboxElement = createElement('input', { id: 'rightalignpagenumber', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
        this.rightAlignDiv.appendChild(this.rightalignpagenumberCheckboxElement);
        this.rightalignPageNumber = new CheckBox({
            label: this.localObj.getConstant('Right align page numbers'),
            enableRtl: this.isRtl
        });
        this.rightalignPageNumber.appendTo(this.rightalignpagenumberCheckboxElement);
        this.hyperlinkDiv = createElement('div', { className: 'e-de-toc-checkbox3' });
        this.hyperlinkDiv.setAttribute('title', this.localObj.getConstant('Use hyperlinks instead of page numbers'));
        this.checkboxElement.appendChild(this.hyperlinkDiv);
        this.hyperlinkCheckboxElement = createElement('input', { id: 'hyperlinkdiv', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
        this.hyperlinkDiv.appendChild(this.hyperlinkCheckboxElement);
        this.hyperlink = new CheckBox({
            label: this.localObj.getConstant('Use hyperlinks'),
            enableRtl: this.isRtl
        });
        this.hyperlink.appendTo(this.hyperlinkCheckboxElement);
    };
    TocProperties.prototype.buttonDiv = function (container) {
        var footerElementFloat;
        if (!this.isRtl) {
            footerElementFloat = 'float:right';
        }
        else {
            footerElementFloat = 'float:left';
        }
        this.footerElement = createElement('div', { id: 'footerDiv', styles: footerElementFloat });
        container.appendChild(this.footerElement);
        this.updatebuttoncontentStyleElement = createElement('button', {
            id: 'footerupdatebuttonDiv',
            attrs: { type: 'button' }
        });
        this.footerElement.appendChild(this.updatebuttoncontentStyleElement);
        this.updateBtn = new Button({
            content: this.localObj.getConstant('Update'), cssClass: 'btn-update', isPrimary: true
        });
        this.updateBtn.appendTo(this.updatebuttoncontentStyleElement);
        this.cancelbuttoncontentStyleElement = createElement('button', {
            id: 'footercancelbuttonDiv',
            attrs: { type: 'button' }
        });
        this.footerElement.appendChild(this.cancelbuttoncontentStyleElement);
        this.cancelBtn = new Button({
            content: this.localObj.getConstant('Cancel'), cssClass: this.isRtl ? 'e-de-btn-cancel-rtl' : 'e-de-btn-cancel'
        });
        this.cancelbuttoncontentStyleElement.setAttribute('aria-label', this.cancelBtn.content);
        this.cancelBtn.appendTo(this.cancelbuttoncontentStyleElement);
    };
    TocProperties.prototype.enableDisableInsertButton = function (enable) {
        if (this.prevContext === 'Text') {
            this.updateBtn.disabled = enable;
        }
        else {
            this.updateBtn.disabled = false;
        }
    };
    TocProperties.prototype.showTocPane = function (isShow, previousContextType) {
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            if (this.updateBtn) {
                this.enableDisableInsertButton(false);
            }
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.updateBtn.content = this.documentEditor.selectionModule.contextType === 'TableOfContents' ? this.localObj.getConstant('Update') : this.localObj.getConstant('Insert');
        this.updateBtn.element.setAttribute('aria-label', this.updateBtn.content);
        this.prevContext = this.documentEditor.selectionModule.contextType;
        if (this.documentEditor.selectionModule.contextType === 'TableOfContents') {
            var tocField = this.documentEditor.selectionModule.getTocFieldInternal();
            var code = this.documentEditor.selectionModule.getFieldCode(tocField);
            if (code.toLocaleLowerCase().indexOf('toc') !== -1 && !isNullOrUndefined(this.documentEditor.editorModule)) {
                var tocSettings = this.documentEditor.editorModule.getTocSettings(code, tocField);
                this.borderLevelStyle.value = tocSettings.endLevel.toString();
            }
        }
        else {
            this.borderLevelStyle.value = "3";
        }
        this.enableDisableInsertButton(this.documentEditor.selectionModule.isPlainContentControl());
        this.documentEditor.resize();
        if (isShow && this.documentEditor.enableAutoFocus) {
            this.updateBtn.element.focus();
        }
    };
    TocProperties.prototype.onInsertToc = function () {
        var tocSettings = {
            startLevel: 1,
            endLevel: parseInt(this.borderLevelStyle.value, 0),
            includeHyperlink: this.hyperlink.checked,
            includeOutlineLevels: true,
            includePageNumber: this.showPageNumber.checked,
            rightAlign: this.rightalignPageNumber.checked
        };
        if (tocSettings.rightAlign) {
            tocSettings.tabLeader = 'Dot';
        }
        this.documentEditor.editorModule.insertTableOfContents(tocSettings);
        this.documentEditor.focusIn();
    };
    TocProperties.prototype.destroy = function () {
        this.container = undefined;
        this.removeHTMLDOM();
        this.unWireEvents();
        if (this.showPageNumber) {
            this.showPageNumber.destroy();
            this.showPageNumber = undefined;
        }
        if (this.rightalignPageNumber) {
            this.rightalignPageNumber.destroy();
            this.rightalignPageNumber = undefined;
        }
        if (this.borderBtn) {
            this.borderBtn.destroy();
            this.borderBtn = undefined;
        }
        if (this.borderLevelStyle) {
            this.borderLevelStyle.destroy();
            this.borderLevelStyle = undefined;
        }
        if (this.hyperlink) {
            this.hyperlink.destroy();
        }
        this.hyperlink = undefined;
        if (this.updateBtn) {
            this.updateBtn.destroy();
        }
        this.updateBtn = undefined;
        if (this.cancelBtn) {
            this.cancelBtn.destroy();
        }
        this.cancelBtn = undefined;
        this.localObj = undefined;
        this.isRtl = undefined;
        if (this.element) {
            this.element.innerHTML = '';
            this.element = undefined;
        }
    };
    TocProperties.prototype.unWireEvents = function () {
        this.cancelBtn.element.removeEventListener('click', this.onCloseClickHook);
        this.updateBtn.element.removeEventListener('click', this.onInsertToClickHook);
        this.closeButton.removeEventListener('click', this.onCloseClickHook);
        this.onCloseClickHook = undefined;
        this.onInsertToClickHook = undefined;
    };
    TocProperties.prototype.removeHTMLDOM = function () {
        this.template1Div.remove();
        this.headerDiv.remove();
        this.closeButton.remove();
        this.title.remove();
        this.templateContent1.remove();
        this.templateContent2.remove();
        this.templateContent3.remove();
        this.optionsDiv.remove();
        this.label.remove();
        this.contentStyleElement.remove();
        this.checkboxElement.remove();
        this.showPageNumberDiv.remove();
        this.showpagenumberCheckboxElement.remove();
        this.rightAlignDiv.remove();
        this.rightalignpagenumberCheckboxElement.remove();
        this.hyperlinkDiv.remove();
        this.hyperlinkCheckboxElement.remove();
        this.footerElement.remove();
        this.updatebuttoncontentStyleElement.remove();
        this.cancelbuttoncontentStyleElement.remove();
    };
    return TocProperties;
}());
export { TocProperties };
