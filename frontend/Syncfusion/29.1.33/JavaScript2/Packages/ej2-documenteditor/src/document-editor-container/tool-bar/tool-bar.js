import { createElement, L10n, isNullOrUndefined, EventHandler, classList, Browser } from '@syncfusion/ej2-base';
import { Toolbar as EJ2Toolbar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { hideSpinner, DialogUtility } from '@syncfusion/ej2-popups';
import { XmlHttpRequestHandler, beforePaneSwitchEvent, toolbarClickEvent, beforeFileOpenEvent } from '../../document-editor/base/index';
import { SectionBreakType } from './../../index';
import { ListView } from '@syncfusion/ej2-lists';
var TOOLBAR_ID = '_toolbar';
var NEW_ID = '_new';
var OPEN_ID = '_open';
var UNDO_ID = '_undo';
var REDO_ID = '_redo';
var INSERT_IMAGE_ID = '_image';
var INSERT_IMAGE_LOCAL_ID = '_image_local';
var INSERT_IMAGE_ONLINE_ID = '_image_url';
var INSERT_TABLE_ID = '_table';
var INSERT_LINK_ID = '_link';
var BOOKMARK_ID = '_bookmark';
var COMMENT_ID = '_comment';
var TRACK_ID = '_track';
var TABLE_OF_CONTENT_ID = '_toc';
var HEADER_ID = '_header';
var FOOTER_ID = '_footer';
var PAGE_SET_UP_ID = '_page_setup';
var PAGE_NUMBER_ID = '_page_number';
var BREAK_ID = '_break';
var LISTVIEW_ID = '_listView';
var FIND_ID = '_find';
var CLIPBOARD_ID = '_use_local_clipboard';
var RESTRICT_EDITING_ID = '_restrict_edit';
var PAGE_BREAK = '_page_break';
var SECTION_BREAK = '_section_break';
var SECTION_BREAK_CONTINUOUS = '_section_break_continuous';
var COLUMN_BREAK = '_column_break';
var READ_ONLY = '_read_only';
var PROTECTIONS = '_protections';
var FORM_FIELDS_ID = '_form_fields';
var UPDATE_FIELDS_ID = '_update_fields';
var TEXT_FORM = '_text_form';
var CHECKBOX = '_checkbox';
var DROPDOWN = '_dropdown';
var FOOTNOTE_ID = '_footnote';
var ENDNOTE_ID = '_endnote';
var COLUMNS_ID = '_columns';
var PAGE_SET_UP = '_page_set';
var CONTENT_CONTROL_ID = '_content_control';
var RICHTEXT_CONTENT_CONTROL_ID = '_richtext_content_control';
var PLAINTEXT_CONTENT_CONTROL_ID = '_plaintext_content_control';
var COMBOBOX_CONTENT_CONTROL_ID = '_combobox_content_control';
var DROPDOWNDOWN_CONTENT_CONTROL_ID = '_dropdown_content_control';
var DATEPICKER_CONTENT_CONTROL_ID = '_datepicker_content_control';
var CHECKBOX_CONTENT_CONTROL_ID = '_checkbox_content_control';
var PICTURE_CONTENT_CONTROL_ID = '_picture_content_control';
var XMLMAPPING_ID = '_xmlmapping';
/**
 * Toolbar Module
 */
var Toolbar = /** @class */ (function () {
    /**
     * @private
     * @param {DocumentEditorContainer} container - DocumentEditorContainer object.
     */
    function Toolbar(container) {
        /**
         * @private
         */
        this.isCommentEditing = false;
        this.container = container;
        this.importHandler = new XmlHttpRequestHandler();
    }
    Object.defineProperty(Toolbar.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    /**
     * Enables or disables the specified Toolbar item.
     *
     * @param  {number} itemIndex - Index of the toolbar items that need to be enabled or disabled.
     * @param  {boolean} isEnable  - Boolean value that determines whether the toolbar item should be enabled or disabled. By default, `isEnable` is set to true.
     * @returns {void}
     */
    Toolbar.prototype.enableItems = function (itemIndex, isEnable) {
        this.toolbar.enableItems(itemIndex, isEnable);
    };
    /**
     * @private
     * @param {CustomToolbarItemModel|ToolbarItem} items - Toolbar items
     * @returns {void}
     */
    Toolbar.prototype.initToolBar = function (items) {
        // items = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(items)));
        this.toolbarItems = items;
        this.renderToolBar();
        this.wireEvent();
    };
    Toolbar.prototype.renderToolBar = function () {
        if (isNullOrUndefined(this.container)) {
            return;
        }
        var toolbarContainer = this.container.toolbarContainer;
        var toolbarWrapper = createElement('div', { className: 'e-de-tlbr-wrapper' });
        var toolbarTarget = createElement('div', { className: 'e-de-toolbar' });
        this.initToolbarItems();
        toolbarWrapper.appendChild(toolbarTarget);
        toolbarContainer.appendChild(toolbarWrapper);
        // Show hide pane button initialization
        var locale = this.container.localObj;
        var propertiesPaneDiv = createElement('div', { className: 'e-de-ctnr-properties-pane-btn' });
        this.buttonElement = createElement('button', { attrs: { type: 'button', 'aria-label': locale.getConstant('Hide properties pane'), 'aria-pressed': 'true' } });
        propertiesPaneDiv.appendChild(this.buttonElement);
        var cssClassName = 'e-tbar-btn e-tbtn-txt e-control e-btn e-de-showhide-btn';
        var iconCss = 'e-icons e-de-ctnr-showhide';
        if (this.container.enableRtl) {
            cssClassName += '-rtl';
            iconCss = 'e-icons e-de-ctnr-showhide e-de-flip';
        }
        this.propertiesPaneButton = new Button({
            cssClass: cssClassName,
            iconCss: iconCss
        });
        if (this.container.showPropertiesPane) {
            this.buttonElement.title = locale.getConstant('Hide properties pane');
        }
        else {
            this.buttonElement.title = locale.getConstant('Show properties pane');
            classList(propertiesPaneDiv, this.container.restrictEditing ? ['e-de-overlay'] : [], this.container.restrictEditing ? [] : ['e-de-overlay']);
            propertiesPaneDiv.classList.add('e-de-pane-disable-clr');
        }
        this.propertiesPaneButton.appendTo(this.buttonElement);
        EventHandler.add(this.buttonElement, 'click', this.showHidePropertiesPane, this);
        toolbarContainer.appendChild(propertiesPaneDiv);
        this.toolbar.appendTo(toolbarTarget);
        this.initToolbarDropdown(toolbarTarget);
    };
    Toolbar.prototype.initToolbarDropdown = function (toolbarTarget) {
        var _this = this;
        if (this.container) {
            var locale = this.container.localObj;
            var id_1 = this.container.element.id + TOOLBAR_ID;
            if (this.toolbarItems.indexOf('Image') >= 0) {
                this.imgDropDwn = new DropDownButton({
                    items: [
                        {
                            text: locale.getConstant('Upload from computer'), iconCss: 'e-icons e-de-ctnr-upload',
                            id: id_1 + INSERT_IMAGE_LOCAL_ID
                        }
                    ],
                    //,{ text: locale.getConstant('By URL'), iconCss: 'e-icons e-de-ctnr-link', id: id + INSERT_IMAGE_ONLINE_ID }],
                    cssClass: 'e-de-toolbar-btn-first e-caret-hide',
                    select: this.onDropDownButtonSelect.bind(this)
                });
                this.imgDropDwn.appendTo('#' + id_1 + INSERT_IMAGE_ID);
            }
            if (this.toolbarItems.indexOf('PageSetup') >= 0) {
                this.PageSetUpDropDwn = new DropDownButton({
                    items: [
                        { text: locale.getConstant('Page Setup'), iconCss: 'e-icons e-de-ctnr-page-size', id: id_1 + PAGE_SET_UP },
                        { text: locale.getConstant('Columns'), iconCss: 'e-icons e-de-ctnr-columns', id: id_1 + COLUMNS_ID }
                    ],
                    cssClass: 'e-de-toolbar-btn-first e-caret-hide',
                    select: this.onDropDownButtonSelect.bind(this)
                });
                this.PageSetUpDropDwn.appendTo('#' + id_1 + PAGE_SET_UP_ID);
            }
            if (this.toolbarItems.indexOf('ContentControl') >= 0) {
                //e-btn-icon e-icons e-de-ctnr-image e-icon-left
                this.ContentControlDropDwn = new DropDownButton({
                    items: [
                        { text: locale.getConstant('Rich Text Content Control'), iconCss: 'e-icons e-de-ctnr-change-case', id: id_1 + RICHTEXT_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Plain Text Content Control'), iconCss: 'e-icons e-de-ctnr-change-case', id: id_1 + PLAINTEXT_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Picture Content Control'), iconCss: 'e-icons e-de-ctnr-image', id: id_1 + PICTURE_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Combo Box Content Control'), iconCss: 'e-icons e-de-combo-box', id: id_1 + COMBOBOX_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Drop-Down List Content Control'), iconCss: 'e-icons e-de-dropdown-list', id: id_1 + DROPDOWNDOWN_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Date Picker Content Control'), iconCss: 'e-icons e-timeline-today', id: id_1 + DATEPICKER_CONTENT_CONTROL_ID },
                        { text: locale.getConstant('Check Box Content Control'), iconCss: 'e-icons e-check-box', id: id_1 + CHECKBOX_CONTENT_CONTROL_ID }
                    ],
                    cssClass: 'e-de-toolbar-btn-first e-caret-hide',
                    select: this.onDropDownButtonSelect.bind(this)
                });
                this.ContentControlDropDwn.appendTo('#' + id_1 + CONTENT_CONTROL_ID);
            }
            if (this.toolbarItems.indexOf('Break') >= 0) {
                var breakDataSource = [
                    { text: locale.getConstant('Page'), iconCss: 'e-de-listview e-de-listview-icon e-icons e-de-ctnr-page-break', id: PAGE_BREAK, category: locale.getConstant('Page Breaks') },
                    { text: locale.getConstant('Column'), iconCss: 'e-de-listview e-de-listview-icon e-icons e-de-ctnr-page-break-column', id: COLUMN_BREAK, category: locale.getConstant('Page Breaks') },
                    { text: locale.getConstant('Next Page'), iconCss: 'e-de-listview e-de-listview-icon e-icons e-de-ctnr-section-break', id: SECTION_BREAK, category: locale.getConstant('Section Breaks') },
                    { text: locale.getConstant('Continuous'), iconCss: 'e-de-listview e-de-listview-icon e-icons e-de-ctnr-section-break-continuous', id: SECTION_BREAK_CONTINUOUS, category: locale.getConstant('Section Breaks') }
                ];
                var ddbOption = {
                    target: '#' + id_1 + BREAK_ID + LISTVIEW_ID,
                    cssClass: 'e-caret-hide'
                };
                this.breakDropDwn = new DropDownButton(ddbOption, '#' + id_1 + BREAK_ID);
                this.breakListView = new ListView({
                    dataSource: breakDataSource,
                    width: '170px',
                    fields: { iconCss: 'iconCss', groupBy: 'category' },
                    showIcon: true,
                    select: this.onListViewSelection.bind(this)
                });
                this.breakListView.appendTo('#' + id_1 + BREAK_ID + LISTVIEW_ID);
            }
            this.filePicker = createElement('input', {
                attrs: { type: 'file', accept: '.doc,.docx,.rtf,.txt,.htm,.html,.sfdt' }, className: 'e-de-ctnr-file-picker'
            });
            if (Browser.isIE) {
                document.body.appendChild(this.filePicker);
            }
            this.imagePicker = createElement('input', {
                attrs: { type: 'file', accept: '.jpg,.jpeg,.png,.bmp,.svg' }, className: 'e-de-ctnr-file-picker'
            });
            if (Browser.isIE) {
                document.body.appendChild(this.imagePicker);
            }
            if (this.toolbarItems.indexOf('LocalClipboard') >= 0) {
                this.toggleButton(id_1 + CLIPBOARD_ID, this.container.enableLocalPaste);
            }
            if (this.toolbarItems.indexOf('TrackChanges') >= 0) {
                this.toggleButton(id_1 + TRACK_ID, this.container.enableTrackChanges);
            }
            if (this.toolbarItems.indexOf('RestrictEditing') >= 0) {
                this.toggleButton(id_1 + RESTRICT_EDITING_ID, this.container.restrictEditing);
                var restrictIconCss = '';
                if (this.container.restrictEditing) {
                    restrictIconCss = ' e-de-selected-item';
                }
                this.restrictDropDwn = new DropDownButton({
                    items: [
                        { text: locale.getConstant('Read only'), id: id_1 + READ_ONLY, iconCss: 'e-icons' + restrictIconCss },
                        { text: locale.getConstant('Protections'), id: id_1 + PROTECTIONS, iconCss: 'e-icons' }
                    ],
                    cssClass: 'e-de-toolbar-btn-first e-caret-hide',
                    select: this.onDropDownButtonSelect.bind(this),
                    beforeItemRender: function (args) {
                        _this.onBeforeRenderRestrictDropdown(args, id_1);
                    }
                });
                this.restrictDropDwn.appendTo('#' + id_1 + RESTRICT_EDITING_ID);
            }
            if (this.toolbarItems.indexOf('FormFields') >= 0) {
                this.formFieldDropDown = new DropDownButton({
                    items: [
                        { text: locale.getConstant('Text Form'), iconCss: 'e-icons e-de-textform', id: id_1 + TEXT_FORM },
                        { text: locale.getConstant('Check Box'), iconCss: 'e-icons e-de-checkbox-form', id: id_1 + CHECKBOX },
                        { text: locale.getConstant('DropDown'), iconCss: 'e-icons e-de-dropdownform', id: id_1 + DROPDOWN }
                    ],
                    cssClass: 'e-de-toolbar-btn-first e-caret-hide',
                    select: this.onDropDownButtonSelect.bind(this)
                });
                this.formFieldDropDown.appendTo('#' + id_1 + FORM_FIELDS_ID);
            }
        }
    };
    Toolbar.prototype.onListViewSelection = function (args) {
        var parentId = this.container.element.id + TOOLBAR_ID;
        var id = args.item.id;
        if (id === parentId + BREAK_ID + LISTVIEW_ID + '_' + PAGE_BREAK) {
            this.container.documentEditor.editorModule.insertPageBreak();
        }
        else if (id === parentId + BREAK_ID + LISTVIEW_ID + '_' + SECTION_BREAK) {
            this.container.documentEditor.editorModule.insertSectionBreak();
        }
        else if (id === parentId + BREAK_ID + LISTVIEW_ID + '_' + SECTION_BREAK_CONTINUOUS) {
            this.container.documentEditor.editorModule.insertSectionBreak(SectionBreakType.Continuous);
        }
        else if (id === parentId + BREAK_ID + LISTVIEW_ID + '_' + COLUMN_BREAK) {
            this.container.documentEditor.editorModule.insertColumnBreak();
        }
        args.item.classList.remove('e-active');
    };
    Toolbar.prototype.onBeforeRenderRestrictDropdown = function (args, id) {
        var selectedIcon = args.element.getElementsByClassName('e-menu-icon')[0];
        if (!isNullOrUndefined(selectedIcon)) {
            if (args.item.id === id + READ_ONLY) {
                this.toggleRestrictIcon(selectedIcon, this.container.restrictEditing);
            }
            if (args.item.id === id + PROTECTIONS) {
                var restrictPane = document.getElementsByClassName('e-de-restrict-pane')[0];
                if (!isNullOrUndefined(restrictPane)) {
                    var toggleProtection = !(restrictPane.style.display === 'none');
                    this.toggleRestrictIcon(selectedIcon, toggleProtection);
                }
            }
        }
    };
    Toolbar.prototype.toggleRestrictIcon = function (icon, toggle) {
        if (toggle) {
            icon.classList.add('e-de-selected-item');
        }
        else {
            icon.classList.remove('e-de-selected-item');
        }
    };
    Toolbar.prototype.showHidePropertiesPane = function () {
        var paneDiv = document.getElementsByClassName('e-de-ctnr-properties-pane-btn')[0];
        var locale = this.container.localObj;
        if (this.container.propertiesPaneContainer.style.display === 'none') {
            this.container.showPropertiesPane = true;
            paneDiv.classList.remove('e-de-pane-disable-clr');
            this.buttonElement.title = locale.getConstant('Hide properties pane');
            this.buttonElement.setAttribute('aria-label', locale.getConstant('Hide properties pane'));
            this.buttonElement.setAttribute('aria-pressed', 'true');
            classList(paneDiv, ['e-de-pane-enable-clr'], []);
            this.container.trigger(beforePaneSwitchEvent, { type: 'PropertiesPane' });
        }
        else if (this.container.previousContext.indexOf('Header') >= 0
            || this.container.previousContext.indexOf('Footer') >= 0) {
            this.container.showHeaderProperties = !this.container.showHeaderProperties;
        }
        else {
            this.container.showPropertiesPane = false;
            paneDiv.classList.remove('e-de-pane-enable-clr');
            this.buttonElement.title = locale.getConstant('Show properties pane');
            this.buttonElement.setAttribute('aria-label', locale.getConstant('Show properties pane'));
            this.buttonElement.setAttribute('aria-pressed', 'false');
            classList(paneDiv, ['e-de-pane-disable-clr'], []);
        }
        this.enableDisablePropertyPaneButton(this.container.showPropertiesPane);
        this.container.showPropertiesPaneOnSelection();
        this.documentEditor.focusIn();
    };
    Toolbar.prototype.onWrapText = function (text) {
        var content = '';
        var index = text.lastIndexOf(' ');
        if (index !== -1) {
            content = text.slice(0, index);
            text.slice(index);
            content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        }
        else {
            content = text;
        }
        return content;
    };
    Toolbar.prototype.wireEvent = function () {
        this.propertiesPaneButton.on('click', this.togglePropertiesPane.bind(this));
        EventHandler.add(this.filePicker, 'change', this.onFileChange, this);
        EventHandler.add(this.imagePicker, 'change', this.onImageChange, this);
    };
    Toolbar.prototype.initToolbarItems = function () {
        this.toolbar = new EJ2Toolbar({
            enableRtl: this.container.enableRtl,
            clicked: this.clickHandler.bind(this),
            items: this.getToolbarItems()
        });
    };
    /**
     * @private
     * @param {CustomToolbarItemModel|ToolbarItem} items - Toolbar items
     * @returns {void}
     */
    Toolbar.prototype.reInitToolbarItems = function (items) {
        var _this = this;
        // items = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(items)));
        for (var i = 0; i < items.length; i++) {
            switch (items[parseInt(i.toString(), 10)]) {
                case 'RestrictEditing':
                    if (!isNullOrUndefined(this.restrictDropDwn)) {
                        this.restrictDropDwn.destroy();
                    }
                    break;
                case 'Break':
                    if (!isNullOrUndefined(this.breakDropDwn)) {
                        this.breakDropDwn.destroy();
                    }
                    break;
                case 'PageSetup':
                    if (!isNullOrUndefined(this.PageSetUpDropDwn)) {
                        this.PageSetUpDropDwn.destroy();
                    }
                    break;
                case 'Image':
                    if (!isNullOrUndefined(this.imgDropDwn)) {
                        this.imgDropDwn.destroy();
                    }
                    break;
                case 'FormFields':
                    if (!isNullOrUndefined(this.formFieldDropDown)) {
                        this.formFieldDropDown.destroy();
                    }
                    break;
            }
        }
        this.toolbarItems = items;
        var toolbarTarget = this.container.toolbarContainer;
        this.toolbar.items = this.getToolbarItems();
        /* eslint-disable @typescript-eslint/indent */
        this.toolbarTimer = Number(setTimeout(function () {
            if (_this.toolbarTimer) {
                clearTimeout(_this.toolbarTimer);
            }
            _this.initToolbarDropdown(toolbarTarget);
            if (items.indexOf('Open') >= 0) {
                EventHandler.add(_this.filePicker, 'change', _this.onFileChange, _this);
            }
            if (items.indexOf('Image') >= 0) {
                EventHandler.add(_this.imagePicker, 'change', _this.onImageChange, _this);
            }
        }, 200));
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Toolbar.prototype.getToolbarItems = function () {
        var locale = this.container.localObj;
        var id = this.container.element.id + TOOLBAR_ID;
        var toolbarItems = [];
        var className;
        var tItem = this.toolbarItems;
        for (var i = 0; i < this.toolbarItems.length; i++) {
            if (i === 0) {
                className = 'e-de-toolbar-btn-start';
            }
            else if ((tItem[i + 1] === 'Separator') && (tItem[i - 1] === 'Separator')) {
                className = 'e-de-toolbar-btn';
            }
            else if (tItem[i + 1] === 'Separator') {
                className = 'e-de-toolbar-btn-last';
            }
            else if (tItem[i - 1] === 'Separator') {
                className = 'e-de-toolbar-btn-first';
            }
            else if (i === (this.toolbarItems.length - 1)) {
                className = 'e-de-toolbar-btn-end';
            }
            else {
                className = 'e-de-toolbar-btn-middle';
            }
            switch (tItem[parseInt(i.toString(), 10)]) {
                case 'Separator':
                    toolbarItems.push({
                        type: 'Separator', cssClass: 'e-de-separator'
                    });
                    break;
                case 'New':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-new', tooltipText: locale.getConstant('Create a new document'),
                        id: id + NEW_ID, text: locale.getConstant('New'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Create a new document') }
                    });
                    break;
                case 'Open':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-open', tooltipText: locale.getConstant('Open a document'), id: id + OPEN_ID,
                        text: locale.getConstant('Open'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Open a document') }
                    });
                    break;
                case 'Undo':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-undo', tooltipText: locale.getConstant('Undo Tooltip'),
                        id: id + UNDO_ID, text: locale.getConstant('Undo'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Undo Tooltip') }
                    });
                    break;
                case 'Redo':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-redo', tooltipText: locale.getConstant('Redo Tooltip'),
                        id: id + REDO_ID, text: locale.getConstant('Redo'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Redo Tooltip') }
                    });
                    break;
                case 'Comments':
                    toolbarItems.push({
                        prefixIcon: 'e-de-cnt-cmt-add',
                        tooltipText: locale.getConstant('Show comments'),
                        id: id + COMMENT_ID, text: locale.getConstant('Comments'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Show comments') }
                    });
                    break;
                case 'TrackChanges':
                    toolbarItems.push({
                        prefixIcon: 'e-de-cnt-track',
                        tooltipText: locale.getConstant('Track Changes'),
                        id: id + TRACK_ID, text: this.onWrapText(locale.getConstant('TrackChanges')), cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('TrackChanges'), 'aria-pressed': this.container.enableTrackChanges, role: 'button', 'aria-hidden': 'true' }
                    });
                    break;
                case 'Image':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Insert inline picture from a file') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="' + id + INSERT_IMAGE_ID + '"><span class="e-btn-icon e-icons e-de-ctnr-image e-icon-left"></span><span class="e-tbar-btn-text">' + locale.getConstant('Image') + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button>',
                        id: id + INSERT_IMAGE_ID, htmlAttributes: { 'aria-label': locale.getConstant('Insert inline picture from a file'), 'aria-haspopup': false }
                    });
                    break;
                case 'Table':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-table', tooltipText: locale.getConstant('Insert a table into the document'),
                        id: id + INSERT_TABLE_ID, text: locale.getConstant('Table'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Insert a table into the document'), 'aria-haspopup': true }
                    });
                    break;
                case 'Hyperlink':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-link',
                        tooltipText: locale.getConstant('Create Hyperlink'),
                        id: id + INSERT_LINK_ID, text: locale.getConstant('Link'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Create Hyperlink'), 'aria-haspopup': true }
                    });
                    break;
                case 'Bookmark':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-bookmark',
                        tooltipText: locale.getConstant('Insert a bookmark in a specific place in this document'),
                        id: id + BOOKMARK_ID, text: locale.getConstant('Bookmark'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Insert a bookmark in a specific place in this document'), 'aria-haspopup': true }
                    });
                    break;
                case 'TableOfContents':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-tableofcontent',
                        tooltipText: locale.getConstant('Provide an overview of your document by adding a table of contents'),
                        id: id + TABLE_OF_CONTENT_ID, text: this.onWrapText(locale.getConstant('Table of Contents')),
                        cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Table of Contents') }
                    });
                    break;
                case 'Header':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-header', tooltipText: locale.getConstant('Add or edit the header'),
                        id: id + HEADER_ID, text: locale.getConstant('Header'), cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('Add or edit the header') }
                    });
                    break;
                case 'Footer':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-footer', tooltipText: locale.getConstant('Add or edit the footer'),
                        id: id + FOOTER_ID, text: locale.getConstant('Footer'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Add or edit the footer') }
                    });
                    break;
                case 'PageSetup':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Page Setup') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="' + id + PAGE_SET_UP_ID + '"><span class="e-btn-icon e-icons e-de-ctnr-pagesetup e-icon-left"></span><span class="e-tbar-btn-text">' + this.onWrapText(locale.getConstant('Page Setup')) + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button>',
                        id: id + PAGE_SET_UP_ID, htmlAttributes: { 'aria-label': locale.getConstant('Page Setup') }
                    });
                    break;
                case 'PageNumber':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-pagenumber', tooltipText: locale.getConstant('Add page numbers'),
                        id: id + PAGE_NUMBER_ID, text: this.onWrapText(locale.getConstant('Page Number')),
                        cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Page Number') }
                    });
                    break;
                case 'Break':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Break') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="' + id + BREAK_ID + '"><span class="e-btn-icon e-icons e-de-ctnr-break e-icon-left"></span><span class="e-tbar-btn-text">' + locale.getConstant('Break') + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button><div id="' + id + BREAK_ID + LISTVIEW_ID + '"></div>',
                        id: id + BREAK_ID, htmlAttributes: { 'aria-label': locale.getConstant('Break') }
                    });
                    break;
                case 'Find':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-find', tooltipText: locale.getConstant('Find Text'),
                        id: id + FIND_ID, text: locale.getConstant('Find'), cssClass: className, htmlAttributes: { 'aria-label': locale.getConstant('Find Text') }
                    });
                    break;
                case 'LocalClipboard':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-paste',
                        tooltipText: locale.getConstant('Toggle between the internal clipboard and system clipboard'),
                        id: id + CLIPBOARD_ID, text: this.onWrapText(locale.getConstant('Local Clipboard')),
                        cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('Local Clipboard'), 'aria-pressed': this.container.enableLocalPaste, role: 'button', 'aria-hidden': 'true' }
                    });
                    break;
                case 'RestrictEditing':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Restrict editing') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="' + id + RESTRICT_EDITING_ID + '"><span class="e-btn-icon e-de-ctnr-lock e-icons e-icon-left"></span><span class="e-tbar-btn-text">' + this.onWrapText(locale.getConstant('Restrict Editing')) + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button>',
                        htmlAttributes: { 'aria-label': locale.getConstant('Restrict editing') }
                    });
                    break;
                case 'FormFields':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Form Fields') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="' + id + FORM_FIELDS_ID + '"><span class="e-btn-icon e-de-formfield e-icons e-icon-left"></span><span class="e-tbar-btn-text">' + this.onWrapText(locale.getConstant('Form Fields')) + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button>',
                        id: id + FORM_FIELDS_ID,
                        htmlAttributes: { 'aria-label': locale.getConstant('Form Fields') }
                    });
                    break;
                case 'UpdateFields':
                    toolbarItems.push({
                        prefixIcon: 'e-de-update-field', tooltipText: locale.getConstant('Update cross reference fields'),
                        id: id + UPDATE_FIELDS_ID, text: this.onWrapText(locale.getConstant('Update Fields')),
                        cssClass: className + ' e-de-formfields',
                        htmlAttributes: { 'aria-label': locale.getConstant('Update cross reference fields') }
                    });
                    break;
                case 'InsertFootnote':
                    toolbarItems.push({
                        prefixIcon: 'e-de-footnote', tooltipText: locale.getConstant('Footnote Tooltip'),
                        text: this.onWrapText(locale.getConstant('Insert Footnote')), id: id + FOOTNOTE_ID,
                        cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('Insert Footnote') }
                    });
                    break;
                case 'InsertEndnote':
                    toolbarItems.push({
                        prefixIcon: 'e-de-endnote', tooltipText: locale.getConstant('Endnote Tooltip'),
                        text: this.onWrapText(locale.getConstant('Insert Endnote')), id: id + ENDNOTE_ID,
                        cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('Insert Endnote') }
                    });
                    break;
                case 'ContentControl':
                    toolbarItems.push({
                        template: '<button title="' + locale.getConstant('Content Control') + '" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="' + id + CONTENT_CONTROL_ID + '"><span class="e-btn-icon e-icons e-de-ctnr-content-control e-icon-left"></span><span class="e-tbar-btn-text">' + this.onWrapText(locale.getConstant('Content Control')) + '</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button>',
                        id: id + CONTENT_CONTROL_ID, htmlAttributes: { 'aria-label': locale.getConstant('Content Control') }
                    });
                    break;
                case 'XML Mapping':
                    toolbarItems.push({
                        prefixIcon: 'e-de-ctnr-xml-mapping', tooltipText: locale.getConstant('XML Mapping Pane'),
                        id: id + XMLMAPPING_ID, text: this.onWrapText(locale.getConstant('XML Mapping Pane')), cssClass: className,
                        htmlAttributes: { 'aria-label': locale.getConstant('XML Mapping Pane') }
                    });
                    break;
                default:
                    //Here we need to process the items
                    toolbarItems.push(tItem[parseInt(i.toString(), 10)]);
                    break;
            }
        }
        /* eslint-disable */
        for (var i = 0; i < toolbarItems.length; i++) {
            var tabindex = void 0;
            if (toolbarItems[i].text !== 'Separator') {
                tabindex = i.toString();
                toolbarItems[i].htmlattributes = { 'tabindex': tabindex };
            }
        }
        /* eslint-enable */
        return toolbarItems;
    };
    Toolbar.prototype.clickHandler = function (args) {
        var id = this.container.element.id + TOOLBAR_ID;
        switch (args.item.id) {
            case id + NEW_ID:
                this.container.documentEditor.openBlank();
                this.documentEditor.focusIn();
                break;
            case id + OPEN_ID:
                this.filePicker.value = '';
                this.filePicker.click();
                this.documentEditor.focusIn();
                break;
            case id + UNDO_ID:
                this.container.documentEditor.editorHistoryModule.undo();
                break;
            case id + REDO_ID:
                this.container.documentEditor.editorHistoryModule.redo();
                break;
            case id + INSERT_TABLE_ID:
                this.container.documentEditor.showDialog('Table');
                break;
            case id + INSERT_LINK_ID:
                this.container.documentEditor.showDialog('Hyperlink');
                break;
            case id + BOOKMARK_ID:
                this.container.documentEditor.showDialog('Bookmark');
                break;
            case id + COMMENT_ID:
                this.documentEditor.editorModule.isUserInsert = true;
                this.documentEditor.editorModule.insertComment('');
                this.documentEditor.editorModule.isUserInsert = false;
                break;
            case id + TRACK_ID:
                this.toggleTrackChangesInternal(args.item.id);
                break;
            case id + HEADER_ID:
                this.container.documentEditor.selectionModule.goToHeader();
                this.container.statusBar.toggleWebLayout();
                break;
            case id + TABLE_OF_CONTENT_ID:
                this.onToc();
                break;
            case id + XMLMAPPING_ID:
                if (!this.container.documentEditor.isXmlPaneTool) {
                    this.container.documentEditor.showXmlPane();
                }
                this.container.statusBar.toggleWebLayout();
                break;
            case id + FOOTER_ID:
                this.container.documentEditor.selectionModule.goToFooter();
                this.container.statusBar.toggleWebLayout();
                break;
            // case id + PAGE_SET_UP_ID:
            //     this.container.documentEditor.showDialog('PageSetup');
            //     break;
            case id + PAGE_NUMBER_ID:
                this.container.documentEditor.editorModule.insertPageNumber();
                break;
            case id + FIND_ID:
                this.container.documentEditor.showOptionsPane();
                break;
            case id + CLIPBOARD_ID:
                this.toggleLocalPaste(args.item.id);
                break;
            case id + UPDATE_FIELDS_ID:
                this.documentEditor.updateFields();
                break;
            case id + FOOTNOTE_ID:
                this.documentEditor.editorModule.insertFootnote();
                break;
            case id + ENDNOTE_ID:
                this.documentEditor.editorModule.insertEndnote();
                break;
            default:
                this.container.trigger(toolbarClickEvent, args);
                break;
        }
        if (args.item.id === id + NEW_ID || args.item.id === id + OPEN_ID || args.item.id === id + UNDO_ID || args.item.id === REDO_ID
            || args.item.id === id + XMLMAPPING_ID || args.item.id === id + COMMENT_ID || args.item.id === id + TRACK_ID
            || args.item.id === id + HEADER_ID || args.item.id === id + TABLE_OF_CONTENT_ID || args.item.id === id + FOOTER_ID
            || args.item.id === id + PAGE_NUMBER_ID || args.item.id === id + CLIPBOARD_ID || args.item.id === id + UPDATE_FIELDS_ID
            || args.item.id === id + FOOTNOTE_ID || args.item.id === id + ENDNOTE_ID || args.item.id === id + PAGE_SET_UP_ID ||
            args.item.id === id + BREAK_ID || args.item.id === id + RESTRICT_EDITING_ID || args.item.id === id + FORM_FIELDS_ID) {
            this.documentEditor.focusIn();
        }
    };
    Toolbar.prototype.toggleLocalPaste = function (id) {
        this.container.enableLocalPaste = !this.container.enableLocalPaste;
        this.toggleButton(id, this.container.enableLocalPaste);
    };
    Toolbar.prototype.toggleEditing = function () {
        this.container.restrictEditing = !this.container.restrictEditing;
        this.container.showPropertiesPane = !this.container.restrictEditing;
    };
    /**
     * @private
     * @param {boolean} enable - Enable/Disable restrictEditing changes toolbar item.
     * @returns {void}
     */
    Toolbar.prototype.toggleRestrictEditing = function (enable) {
        var restrictEditingId = this.container.element.id + TOOLBAR_ID + RESTRICT_EDITING_ID;
        var element = document.getElementById(restrictEditingId);
        if (element) {
            this.toggleButton(restrictEditingId, enable);
        }
    };
    Toolbar.prototype.toggleButton = function (id, toggle) {
        var element = document.getElementById(id);
        if (toggle) {
            classList(element, ['e-btn-toggle'], []);
            element.setAttribute('aria-pressed', 'true');
        }
        else {
            classList(element, [], ['e-btn-toggle']);
            element.setAttribute('aria-pressed', 'false');
        }
    };
    Toolbar.prototype.toggleTrackChangesInternal = function (id, enable) {
        if (!isNullOrUndefined(enable)) {
            this.container.enableTrackChanges = !enable;
        }
        this.container.enableTrackChanges = !this.container.enableTrackChanges;
        this.toggleButton(id, this.container.enableTrackChanges);
    };
    Toolbar.prototype.togglePropertiesPane = function () {
        this.container.showPropertiesPane = !this.container.showPropertiesPane;
    };
    Toolbar.prototype.onDropDownButtonSelect = function (args) {
        var _this = this;
        var parentId = this.container.element.id + TOOLBAR_ID;
        var id = args.item.id;
        if (id === parentId + INSERT_IMAGE_LOCAL_ID) {
            this.imagePicker.value = '';
            this.imagePicker.click();
        }
        else if (id === parentId + PAGE_SET_UP) {
            this.container.documentEditor.showDialog('PageSetup');
        }
        else if (id === parentId + COLUMNS_ID) {
            this.container.documentEditor.showDialog('Columns');
        }
        else if (id === parentId + DATEPICKER_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('Date');
        }
        else if (id === parentId + CHECKBOX_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('CheckBox');
        }
        else if (id === parentId + COMBOBOX_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('ComboBox');
        }
        else if (id === parentId + RICHTEXT_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('RichText');
        }
        else if (id === parentId + PLAINTEXT_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('Text');
        }
        else if (id === parentId + PICTURE_CONTENT_CONTROL_ID) {
            this.container.documentEditor.showDialog('PictureContentControl');
        }
        else if (id === parentId + DROPDOWNDOWN_CONTENT_CONTROL_ID) {
            this.container.documentEditor.editor.insertContentControl('DropDownList');
        }
        else if (id === parentId + INSERT_IMAGE_ONLINE_ID) {
            // Need to implement image dialog;
        }
        else if (id === parentId + READ_ONLY) {
            this.toggleEditing();
        }
        else if (id === parentId + PROTECTIONS) {
            this.documentEditor.documentHelper.restrictEditingPane.showHideRestrictPane(true);
        }
        else if (id === parentId + CHECKBOX) {
            this.documentEditor.editorModule.insertFormField('CheckBox');
        }
        else if (id === parentId + DROPDOWN) {
            this.documentEditor.editorModule.insertFormField('DropDown');
        }
        else if (id === parentId + TEXT_FORM) {
            this.documentEditor.editorModule.insertFormField('Text');
        }
        setTimeout(function () {
            _this.documentEditor.focusIn();
        }, 30);
    };
    Toolbar.prototype.onFileChange = function () {
        var _this = this;
        var file = this.filePicker.files[0];
        var filesize = file.size;
        var check;
        var eventArgs = { fileSize: filesize, isCanceled: check };
        this.documentEditor.trigger(beforeFileOpenEvent, eventArgs);
        if (eventArgs.isCanceled) {
            return;
        }
        if (file) {
            var formatType_1 = file.name.substr(file.name.lastIndexOf('.'));
            if (formatType_1 === '.sfdt' || formatType_1 === '.txt') {
                var fileReader_1 = new FileReader();
                fileReader_1.onload = function () {
                    if (formatType_1 === '.txt') {
                        _this.container.documentEditor.documentHelper.openTextFile(fileReader_1.result);
                    }
                    else {
                        /* eslint-disable */
                        _this.container.documentEditor.openAsync(fileReader_1.result);
                        /* eslint-enable */
                    }
                };
                fileReader_1.readAsText(file);
            }
            else {
                if (this.isSupportedFormatType(formatType_1.toLowerCase())) {
                    //this.convertToSfdt(file);
                    this.documentEditor.open(file);
                }
                else {
                    var localizeValue = new L10n('documenteditor', this.documentEditor.defaultLocale);
                    DialogUtility.alert({
                        content: localizeValue.getConstant('Unsupported format'),
                        closeOnEscape: true, showCloseIcon: true,
                        position: { X: 'center', Y: 'center' }
                    }).enableRtl = this.container.enableRtl;
                }
            }
            this.container.documentEditor.documentName = file.name.substr(0, file.name.lastIndexOf('.'));
        }
    };
    Toolbar.prototype.isSupportedFormatType = function (formatType) {
        switch (formatType) {
            case '.dotx':
            case '.docx':
            case '.docm':
            case '.dotm':
            case '.dot':
            case '.doc':
            case '.rtf':
            case '.txt':
            case '.xml':
            case '.html':
                return true;
            default:
                return false;
        }
    };
    // private convertToSfdt(file: File): void {
    //     showSpinner(this.container.containerTarget);
    //     this.importHandler.url = this.container.serviceUrl + this.container.serverActionSettings.import;
    //     this.importHandler.onSuccess = this.successHandler.bind(this);
    //     this.importHandler.onFailure = this.failureHandler.bind(this);
    //     this.importHandler.onError = this.failureHandler.bind(this);
    //     this.importHandler.customHeaders = this.container.headers;
    //     const httprequestEventArgs: XmlHttpRequestEventArgs = { serverActionType: 'Import', headers: this.container.headers, timeout: 0, cancel: false, withCredentials: false  };
    //     this.container.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
    //     const formData: FormData = new FormData();
    //     formData.append('files', file);
    //     if (httprequestEventArgs.cancel) {
    //         hideSpinner(this.container.containerTarget);
    //     } else {
    //         this.importHandler.send(formData, httprequestEventArgs);
    //     }
    // }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Toolbar.prototype.failureHandler = function (args) {
        if (args.name === 'onError') {
            DialogUtility.alert({
                content: this.container.localObj.getConstant('Error in establishing connection with web server'),
                closeOnEscape: true, showCloseIcon: true,
                position: { X: 'center', Y: 'center' }
            }).enableRtl = this.container.enableRtl;
        }
        else {
            alert('Failed to load the file');
            this.documentEditor.fireServiceFailure(args);
        }
        hideSpinner(this.container.containerTarget);
    };
    Toolbar.prototype.successHandler = function (result) {
        /* eslint-disable */
        this.container.documentEditor.open(result.data);
        hideSpinner(this.container.containerTarget);
        /* eslint-enable */
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    Toolbar.prototype.onImageChange = function () {
        var _this = this;
        var file = this.imagePicker.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function () {
            _this.insertImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };
    Toolbar.prototype.insertImage = function (data) {
        var image = document.createElement('img');
        var container = this.container;
        image.addEventListener('load', function () {
            container.documentEditor.editorModule.insertImageInternal(data, true, this.width, this.height, this.alt);
        });
        image.src = data;
    };
    Toolbar.prototype.enableDisableFormField = function (enable) {
        var ele = document.getElementById('container_toolbar_form_fields');
        if (!isNullOrUndefined(ele)) {
            this.toolbar.enableItems(ele.parentElement, enable);
        }
    };
    /**
     * @private
     * @param {boolean} enable - Emable/Disable insert comment toolbar item.
     * @returns {void}
     */
    Toolbar.prototype.enableDisableInsertComment = function (enable) {
        this.isCommentEditing = !enable;
        var id = this.container.element.id + TOOLBAR_ID;
        var commentId = id + COMMENT_ID;
        var element = document.getElementById(commentId);
        if (!this.container.enableComment && element) {
            this.toolbar.removeItems(element.parentElement);
        }
        else if (element) {
            if (!isNullOrUndefined(this.documentEditor) && (this.documentEditor.isReadOnly ||
                this.documentEditor.documentHelper.isDocumentProtected)) {
                enable = this.documentEditor.documentHelper.isCommentOnlyMode || !this.documentEditor.isReadOnlyMode;
            }
            this.toolbar.enableItems(element.parentElement, enable);
        }
    };
    /**
     * @private
     * @param {boolean} enable - Emable/Disable track changes toolbar item.
     * @returns {void}
     */
    Toolbar.prototype.toggleTrackChanges = function (enable) {
        var trackId = this.container.element.id + TOOLBAR_ID + TRACK_ID;
        var element = document.getElementById(trackId);
        if (element) {
            this.toggleTrackChangesInternal(trackId, enable);
        }
    };
    // /**
    //  * @private
    //  */
    // public enableDisableTrackChanges(enable: boolean): void {
    //     let id: string = this.container.element.id + TOOLBAR_ID + TRACK_ID;
    //     if (!isNullOrUndefined(this.documentEditor) && (this.documentEditor.isReadOnly ||
    //         this.documentEditor.documentHelper.isDocumentProtected)) {
    //         enable = false;
    //     }
    //     this.toggleTrackChanges(id, enable);
    // }
    /**
     * @private
     * @param {boolean} enable - Enable/Diable toolbar items.
     * @param {boolean} isProtectedContent - Define whether document is protected.
     * @returns {void}
     */
    Toolbar.prototype.enableDisableToolBarItem = function (enable, isProtectedContent) {
        if (!isNullOrUndefined(this.container.element)) {
            var id = this.container.element.id + TOOLBAR_ID;
            for (var _i = 0, _a = this.toolbar.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var itemId = item.id;
                if (itemId !== id + NEW_ID && itemId !== id + OPEN_ID && itemId !== id + FIND_ID &&
                    itemId !== id + CLIPBOARD_ID && itemId !== id + RESTRICT_EDITING_ID
                    && item.type !== 'Separator') {
                    if (enable && this.isCommentEditing && itemId === id + COMMENT_ID) {
                        continue;
                    }
                    if (itemId !== id + UNDO_ID && itemId !== id + REDO_ID && itemId !== id + INSERT_TABLE_ID &&
                        itemId !== id + INSERT_LINK_ID && itemId !== id + BOOKMARK_ID && itemId !== id + COMMENT_ID &&
                        itemId !== id + HEADER_ID && itemId !== id + XMLMAPPING_ID && itemId !== id + TABLE_OF_CONTENT_ID &&
                        itemId !== id + FOOTER_ID && itemId !== id + PAGE_SET_UP_ID && itemId !== id + CONTENT_CONTROL_ID
                        && itemId !== id + PAGE_NUMBER_ID && itemId !== id + INSERT_IMAGE_ID && itemId !== id + FORM_FIELDS_ID
                        && itemId !== id + BREAK_ID && itemId !== id + TRACK_ID && itemId !== id + FOOTNOTE_ID
                        && itemId !== id + ENDNOTE_ID &&
                        itemId !== id + UPDATE_FIELDS_ID) {
                        continue;
                    }
                    if (isProtectedContent && this.documentEditor.documentHelper.isFormFillProtectedMode
                        && itemId === id + UPDATE_FIELDS_ID) {
                        continue;
                    }
                    var element = document.getElementById(item.id);
                    if (!isNullOrUndefined(element) && !isNullOrUndefined(element.parentElement)) {
                        this.toolbar.enableItems(element.parentElement, enable);
                    }
                }
            }
            if (!isNullOrUndefined(this.documentEditor)) {
                this.enableDisableFormField(!this.documentEditor.enableHeaderAndFooter && enable && !this.documentEditor.isReadOnlyMode);
            }
            var isPlainContetnControl = this.documentEditor.selectionModule.isPlainContentControl();
            if (this.documentEditor.selectionModule.isinFootnote || this.documentEditor.selectionModule.isinEndnote
                || this.documentEditor.enableHeaderAndFooter || isPlainContetnControl) {
                if (this.containsItem(id + ENDNOTE_ID)) {
                    this.toolbar.enableItems(document.getElementById(id + ENDNOTE_ID).parentElement, false);
                }
                if (this.containsItem(id + FOOTNOTE_ID)) {
                    this.toolbar.enableItems(document.getElementById(id + FOOTNOTE_ID).parentElement, false);
                }
                if (this.containsItem(id + BREAK_ID)) {
                    this.toolbar.enableItems(document.getElementById(id + BREAK_ID).parentElement, false);
                }
                if (isPlainContetnControl) {
                    if (this.containsItem(id + INSERT_TABLE_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + INSERT_TABLE_ID).parentElement, false);
                    }
                    if (this.containsItem(id + INSERT_IMAGE_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + INSERT_IMAGE_ID).parentElement, false);
                    }
                    if (this.containsItem(id + COMMENT_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + COMMENT_ID).parentElement, false);
                    }
                    if (this.containsItem(id + BOOKMARK_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + BOOKMARK_ID).parentElement, false);
                    }
                    if (this.containsItem(id + INSERT_LINK_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + INSERT_LINK_ID).parentElement, false);
                    }
                    if (this.containsItem(id + FORM_FIELDS_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + FORM_FIELDS_ID).parentElement, false);
                    }
                    if (this.containsItem(id + CONTENT_CONTROL_ID)) {
                        this.toolbar.enableItems(document.getElementById(id + CONTENT_CONTROL_ID).parentElement, false);
                    }
                }
            }
            if (!isProtectedContent || this.container.showPropertiesPane) {
                if (isProtectedContent) {
                    enable = this.container.showPropertiesPane;
                }
                classList(this.propertiesPaneButton.element.parentElement, !enable ? ['e-de-overlay'] : [], !enable ? [] : ['e-de-overlay']);
            }
            var protectionType = this.documentEditor.documentHelper.protectionType;
            if (enable || (this.documentEditor.documentHelper.isDocumentProtected &&
                (protectionType === 'FormFieldsOnly' || protectionType === 'CommentsOnly'))) {
                this.enableDisableUndoRedo();
            }
            if (this.documentEditor.documentHelper.isTrackedOnlyMode && this.containsItem(id + TRACK_ID)) {
                this.toolbar.enableItems(document.getElementById(id + TRACK_ID).parentElement, false);
            }
        }
    };
    Toolbar.prototype.containsItem = function (id) {
        for (var _i = 0, _a = this.toolbar.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id === id) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.enableDisableUndoRedo = function () {
        var id = this.container.element.id + TOOLBAR_ID;
        if (this.toolbarItems.indexOf('Undo') >= 0) {
            var undoElement = document.getElementById(id + UNDO_ID);
            // We can optimize this condition check to single bool validation instead of array collection.
            /* eslint-disable-next-line max-len */
            if (!isNullOrUndefined(undoElement)) {
                this.toolbar.enableItems(undoElement.parentElement, this.container.documentEditor.editorHistoryModule.canUndo());
            }
        }
        if (this.toolbarItems.indexOf('Redo') >= 0) {
            var redoElement = document.getElementById(id + REDO_ID);
            // We can optimize this condition check to single bool validation instead of array collection.
            /* eslint-disable-next-line max-len */
            if (!isNullOrUndefined(redoElement)) {
                this.toolbar.enableItems(redoElement.parentElement, this.container.documentEditor.editorHistoryModule.canRedo());
            }
        }
    };
    Toolbar.prototype.onToc = function () {
        if (this.container.previousContext === 'TableOfContents' && this.container.propertiesPaneContainer.style.display === 'none') {
            this.container.showPropertiesPane = false;
            this.documentEditor.focusIn();
            return;
        }
        if (this.container.headerFooterProperties.element.style.display === 'block') {
            this.documentEditor.selectionModule.closeHeaderFooter();
        }
        this.enableDisablePropertyPaneButton(false);
        this.container.showProperties('toc');
    };
    /**
     * @private
     * @param {boolean} isShow - show/hide property pane.
     * @returns {void}
     */
    Toolbar.prototype.enableDisablePropertyPaneButton = function (isShow) {
        if (isShow) {
            classList(this.propertiesPaneButton.element.firstChild, ['e-pane-enabled'], ['e-pane-disabled']);
        }
        else {
            classList(this.propertiesPaneButton.element.firstChild, ['e-pane-disabled'], ['e-pane-enabled']);
        }
    };
    /**
     * @private
     * @returns { void }
     */
    Toolbar.prototype.destroy = function () {
        if (this.restrictDropDwn) {
            this.restrictDropDwn.destroy();
            this.restrictDropDwn = undefined;
        }
        if (this.imgDropDwn) {
            this.imgDropDwn.destroy();
            this.imgDropDwn = undefined;
        }
        if (this.PageSetUpDropDwn) {
            this.PageSetUpDropDwn.destroy();
            this.PageSetUpDropDwn = undefined;
        }
        if (this.breakDropDwn) {
            this.breakDropDwn.destroy();
            this.breakDropDwn = undefined;
        }
        if (this.formFieldDropDown) {
            this.formFieldDropDown.destroy();
            this.formFieldDropDown = undefined;
        }
        if (this.ContentControlDropDwn) {
            this.ContentControlDropDwn.destroy();
            this.ContentControlDropDwn = undefined;
        }
        if (this.toolbar) {
            var toolbarElement = this.toolbar.element;
            this.toolbar.destroy();
            this.toolbar = undefined;
            toolbarElement.parentElement.removeChild(toolbarElement);
        }
        if (this.container.toolbarContainer) {
            this.container.containerTarget.removeChild(this.container.toolbarContainer);
            this.container.toolbarContainer = undefined;
        }
        if (this.container.toolbarModule) {
            this.container.toolbarModule = undefined;
        }
        if (this.propertiesPaneButton) {
            this.propertiesPaneButton.destroy();
        }
        if (this.breakListView) {
            this.breakListView.destroy();
            this.breakListView = undefined;
        }
        this.propertiesPaneButton = undefined;
        this.toolbarItems = [];
        this.toolbarItems = undefined;
        this.container = undefined;
    };
    return Toolbar;
}());
export { Toolbar };
