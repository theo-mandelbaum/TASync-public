import { createElement, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Toolbar as Tool } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/**
 * @hidden
 */
var FormDesignerToolbar = /** @class */ (function () {
    function FormDesignerToolbar(viewer, viewerBase, toolbar) {
        /**
         * @private
         */
        this.isToolbarHidden = false;
        this.isTextboxBtnVisible = true;
        this.isPasswordBtnVisible = true;
        this.isCheckboxBtnVisible = true;
        this.isRadiobuttonBtnVisible = true;
        this.isDropdownBtnVisible = true;
        this.isListboxBtnVisible = true;
        this.isSignatureBtnVisible = true;
        this.isDeleteBtnVisible = true;
        this.toolbarBorderHeight = 1;
        this.pdfViewer = viewer;
        this.pdfViewerBase = viewerBase;
        this.primaryToolbar = toolbar;
    }
    FormDesignerToolbar.prototype.initializeFormDesignerToolbar = function () {
        this.toolbarElement = createElement('div', { id: this.pdfViewer.element.id + '_formdesigner_toolbar', className: 'e-pv-formdesigner-toolbar' });
        this.pdfViewerBase.viewerMainContainer.appendChild(this.toolbarElement);
        this.toolbar = new Tool({
            width: '', height: '', overflowMode: 'Popup',
            items: this.createToolbarItems(), clicked: this.onToolbarClicked.bind(this)
        });
        //this.toolbar.isStringTemplate = true;
        if (this.pdfViewer.enableRtl) {
            this.toolbar.enableRtl = true;
        }
        this.toolbar.appendTo(this.toolbarElement);
        this.afterToolbarCreation();
        this.createSignContainer();
        this.applyFormDesignerToolbarSettings();
        //this.updateToolbarItems();
        this.showFormDesignerToolbar(null, true);
    };
    /**
     * @private
     * @returns {void}
     */
    FormDesignerToolbar.prototype.resetFormDesignerToolbar = function () {
        if (this.pdfViewer.isFormDesignerToolbarVisible) {
            this.pdfViewer.designerMode = true;
            this.pdfViewer.formDesignerModule.setMode('designer');
            this.adjustViewer(false);
            this.toolbarElement.style.display = '';
            this.isToolbarHidden = false;
            this.adjustViewer(true);
            this.primaryToolbar.selectItem(this.primaryToolbar.formDesignerItem);
            this.pdfViewer.isFormDesignerToolbarVisible = true;
        }
        else {
            this.toolbarElement.style.display = 'none';
            this.isToolbarHidden = true;
            if (!this.pdfViewer.isAnnotationToolbarVisible) {
                this.adjustViewer(true);
            }
            this.primaryToolbar.deSelectItem(this.primaryToolbar.formDesignerItem);
            this.pdfViewer.isFormDesignerToolbarVisible = false;
        }
    };
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @param {boolean} isInitialLoading - It describes about the isInitialLoading boolean value
     * @private
     * @returns {void}
     */
    FormDesignerToolbar.prototype.showFormDesignerToolbar = function (element, isInitialLoading) {
        if (!this.isToolbarHidden) {
            if (element) {
                this.primaryToolbar.deSelectItem(element);
            }
            else {
                if (this.pdfViewer.enableToolbar) {
                    this.primaryToolbar.deSelectItem(this.primaryToolbar.formDesignerItem);
                }
            }
            this.adjustViewer(false);
            //this.deselectAllItems();
            if (this.pdfViewer.formFieldCollection) {
                var filteredFields = this.pdfViewer.formFieldCollection.filter(function (field) {
                    return field.formFieldAnnotationType === 'Textbox' && field.isMultiline;
                });
                filteredFields.forEach(function (field) {
                    var resize = document.getElementById(field.id);
                    if (resize) {
                        resize.style.pointerEvents = 'none';
                        resize.style.resize = 'none';
                    }
                });
            }
            this.toolbarElement.style.display = 'none';
            this.pdfViewer.formDesignerModule.setMode('edit');
            this.pdfViewer.designerMode = false;
            if (!isInitialLoading) {
                this.pdfViewer.isFormDesignerToolbarVisible = false;
            }
        }
        else {
            var toolBarInitialStatus = this.toolbarElement.style.display;
            this.toolbarElement.style.display = 'block';
            this.pdfViewer.designerMode = true;
            this.pdfViewer.formDesignerModule.setMode('designer');
            if (!isInitialLoading) {
                this.pdfViewer.isFormDesignerToolbarVisible = true;
            }
            if (element) {
                this.primaryToolbar.selectItem(element);
            }
            else {
                if (this.pdfViewer.enableToolbar) {
                    this.primaryToolbar.selectItem(this.primaryToolbar.formDesignerItem);
                }
            }
            if (toolBarInitialStatus === 'none') {
                this.adjustViewer(true);
            }
            if (this.pdfViewer.formFieldCollection) {
                var filteredFields = this.pdfViewer.formFieldCollection.filter(function (field) {
                    return field.formFieldAnnotationType === 'Textbox' && field.isMultiline;
                });
                filteredFields.forEach(function (field) {
                    var resize = document.getElementById(field.id);
                    if (resize) {
                        resize.style.pointerEvents = 'auto';
                        resize.style.resize = 'auto';
                    }
                });
            }
        }
        if (this.pdfViewer.magnification && this.pdfViewer.magnification.fitType === 'fitToPage') {
            this.pdfViewer.magnification.fitToPage();
        }
        //this.enableAnnotationAddTools(true);
        this.isToolbarHidden = !this.isToolbarHidden;
    };
    /**
     * @param {boolean} isAdjust - It describes about the isAdjust boolean value
     * @private
     * @returns {void}
     */
    FormDesignerToolbar.prototype.adjustViewer = function (isAdjust) {
        var splitterElement;
        var toolbarContainer;
        var formDesignerToolbarHeight;
        if (isBlazor()) {
            splitterElement = this.pdfViewer.element.querySelector('.e-pv-sidebar-toolbar-splitter');
            toolbarContainer = this.pdfViewer.element.querySelector('.e-pv-toolbar');
            var formDesignerToolbarContainer = this.pdfViewer.element.querySelector('.e-pv-formDesigner-toolbar');
            formDesignerToolbarHeight = this.getToolbarHeight(formDesignerToolbarContainer);
        }
        else {
            splitterElement = this.pdfViewerBase.getElement('_sideBarToolbarSplitter');
            toolbarContainer = this.pdfViewerBase.getElement('_toolbarContainer');
            formDesignerToolbarHeight = this.getToolbarHeight(this.toolbarElement);
        }
        var toolbarHeight = this.getToolbarHeight(toolbarContainer);
        var sideBarToolbar = this.pdfViewerBase.navigationPane.sideBarToolbar;
        var sideBarContentContainer = this.pdfViewerBase.navigationPane.sideBarContentContainer;
        var commentsContainer = this.pdfViewerBase.navigationPane.commentPanelContainer;
        var commentPanelResizer = this.pdfViewerBase.navigationPane.commentPanelResizer;
        var newToolbarHeight = '';
        if (isAdjust) {
            if (this.pdfViewer.enableToolbar) {
                sideBarToolbar.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
                sideBarContentContainer.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
                splitterElement.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
                commentsContainer.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
                commentPanelResizer.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
            }
            else {
                sideBarToolbar.style.top = (formDesignerToolbarHeight) + 'px';
                sideBarContentContainer.style.top = (formDesignerToolbarHeight) + 'px';
                splitterElement.style.top = (formDesignerToolbarHeight) + 'px';
                commentsContainer.style.top = (formDesignerToolbarHeight) + 'px';
                commentPanelResizer.style.top = (toolbarHeight + formDesignerToolbarHeight) + 'px';
            }
            if (!this.pdfViewer.enableToolbar) {
                toolbarHeight = 0;
            }
            this.pdfViewerBase.viewerContainer.style.height = this.updateViewerHeight(this.getElementHeight(this.pdfViewerBase.viewerContainer), (formDesignerToolbarHeight + toolbarHeight)) + 'px';
            newToolbarHeight = this.getNavigationToolbarHeight(formDesignerToolbarHeight + toolbarHeight);
            sideBarToolbar.style.height = newToolbarHeight;
            splitterElement.style.height = newToolbarHeight;
            commentPanelResizer.style.height = newToolbarHeight;
            sideBarContentContainer.style.height = newToolbarHeight;
        }
        else {
            if (this.pdfViewer.enableToolbar) {
                sideBarToolbar.style.top = toolbarHeight + 'px';
                sideBarContentContainer.style.top = toolbarHeight + 'px';
                splitterElement.style.top = toolbarHeight + 'px';
                commentsContainer.style.top = toolbarHeight + 'px';
                commentPanelResizer.style.top = toolbarHeight + 'px';
            }
            else {
                sideBarToolbar.style.top = 1 + 'px';
                sideBarToolbar.style.height = '100%';
                sideBarContentContainer.style.top = 1 + 'px';
                sideBarContentContainer.style.height = '100%';
                splitterElement.style.top = 1 + 'px';
                splitterElement.style.height = '100%';
                commentsContainer.style.top = 1 + 'px';
                commentsContainer.style.height = '100%';
                commentPanelResizer.style.top = 1 + 'px';
                commentPanelResizer.style.height = '100%';
            }
            if (!this.pdfViewer.enableToolbar) {
                toolbarHeight = 0;
            }
            this.pdfViewerBase.viewerContainer.style.height = this.updateViewerHeight(this.getElementHeight(this.pdfViewerBase.viewerContainer), formDesignerToolbarHeight) + 'px';
            newToolbarHeight = this.getNavigationToolbarHeight(toolbarHeight);
            sideBarToolbar.style.height = newToolbarHeight;
            splitterElement.style.height = newToolbarHeight;
            commentPanelResizer.style.height = newToolbarHeight;
            sideBarContentContainer.style.height = newToolbarHeight;
            if (this.pdfViewerBase.viewerContainer.style.height === '0px') {
                this.pdfViewerBase.viewerContainer.style.height = (parseInt(this.pdfViewer.element.style.height, 10) - parseInt(sideBarToolbar.style.top, 10)) + 'px';
            }
        }
    };
    FormDesignerToolbar.prototype.getElementHeight = function (element) {
        try {
            return element.getBoundingClientRect().height;
        }
        catch (error) {
            return 0;
        }
    };
    FormDesignerToolbar.prototype.updateViewerHeight = function (viewerHeight, toolbarHeight) {
        return this.getElementHeight(this.pdfViewer.element) - toolbarHeight;
    };
    FormDesignerToolbar.prototype.resetViewerHeight = function (viewerHeight, toolbarHeight) {
        return viewerHeight + toolbarHeight;
    };
    FormDesignerToolbar.prototype.getNavigationToolbarHeight = function (toolbarHeight) {
        var height = this.pdfViewer.element.getBoundingClientRect().height;
        return (height !== 0) ? height - toolbarHeight + 'px' : '';
    };
    FormDesignerToolbar.prototype.updateContentContainerHeight = function (isAdjust, isBlazor) {
        var formDesignerToolbarHeight;
        if (isBlazor) {
            var formDesignerToolbarContainer = this.pdfViewer.element.querySelector('.e-pv-formDesigner-toolbar');
            formDesignerToolbarHeight = this.getToolbarHeight(formDesignerToolbarContainer);
        }
        else {
            formDesignerToolbarHeight = this.getToolbarHeight(this.toolbarElement);
        }
        var sideBarClientRect = this.pdfViewerBase.navigationPane.sideBarContentContainer.getBoundingClientRect();
        if (sideBarClientRect.height !== 0) {
            if (isAdjust) {
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.height = sideBarClientRect.height - formDesignerToolbarHeight + 'px';
            }
            else {
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.height = sideBarClientRect.height + formDesignerToolbarHeight + 'px';
            }
        }
    };
    FormDesignerToolbar.prototype.getToolbarHeight = function (element) {
        var toolbarHeight = element.getBoundingClientRect().height;
        if (toolbarHeight === 0 && element === this.pdfViewerBase.getElement('_toolbarContainer')) {
            // getComputedStyle gets the value from style and toolbar border height is added to it.
            toolbarHeight = parseFloat(window.getComputedStyle(element)['height']) + this.toolbarBorderHeight;
        }
        return toolbarHeight;
    };
    FormDesignerToolbar.prototype.createToolbarItems = function () {
        var signTemplate = this.getTemplate('button', '_formfield_signature', 'e-pv-annotation-handwritten-container');
        var items = [];
        items.push({ prefixIcon: 'e-pv-textbox-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_textbox', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-password-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_passwordfield', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-checkbox-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_checkbox', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-radiobutton-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_radiobutton', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-dropdown-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_dropdown', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-listbox-icon e-pv-icon', className: 'e-pv-annotation-shapes-container', id: this.pdfViewer.element.id + '_formdesigner_listbox', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ template: signTemplate, align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ type: 'Separator', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-annotation-delete-icon e-pv-icon', className: 'e-pv-annotation-delete-container', id: this.pdfViewer.element.id + '_formdesigner_delete', align: 'Left', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        items.push({ prefixIcon: 'e-pv-annotation-tools-close-icon e-pv-icon', className: 'e-pv-annotation-tools-close-container', id: this.pdfViewer.element.id + '_formdesigner_close', align: 'Right', attr: { 'tabindex': 0, 'data-tabindex': 0 } });
        return items;
    };
    FormDesignerToolbar.prototype.createSignContainer = function () {
        var _this = this;
        this.handWrittenSignatureItem = this.pdfViewerBase.getElement('_formfield_signature');
        this.handWrittenSignatureItem.setAttribute('tabindex', '0');
        this.handWrittenSignatureItem.setAttribute('data-tabindex', '0');
        this.primaryToolbar.createTooltip(this.pdfViewerBase.getElement('_formfield_signature'), this.pdfViewer.localeObj.getConstant('HandwrittenSignatureDialogHeaderText'));
        var items = [];
        items = [
            {
                text: 'ADD SIGNATURE'
            },
            {
                separator: true
            },
            {
                text: 'ADD INITIAL'
            }
        ];
        var saveOptions = {
            items: items,
            iconCss: 'e-pv-handwritten-icon e-pv-icon',
            cssClass: 'e-pv-handwritten-popup',
            beforeItemRender: function (args) {
                _this.pdfViewer.clearSelection(_this.pdfViewerBase.currentPageNumber - 1);
                if (args.element && args.element.className.indexOf('e-separator') !== -1) {
                    args.element.style.margin = '8px 0';
                    args.element.setAttribute('role', 'menuitem');
                    args.element.setAttribute('aria-label', 'separator');
                }
                if (args.item.text === 'ADD SIGNATURE') {
                    args.element.innerHTML = '';
                    var addInitialSpan = createElement('button');
                    addInitialSpan.classList.add('e-control', 'e-btn', 'e-lib', 'e-outline', 'e-primary');
                    addInitialSpan.textContent = _this.pdfViewer.localeObj.getConstant('SignatureFieldDialogHeaderText');
                    if (_this.pdfViewer.locale === 'en-US') {
                        addInitialSpan.style.width = '130px';
                    }
                    else {
                        addInitialSpan.style.width = 'auto';
                    }
                    addInitialSpan.style.height = '36px';
                    addInitialSpan.addEventListener('click', _this.clickSignature.bind(_this));
                    args.element.appendChild(addInitialSpan);
                    args.element.addEventListener('mouseover', _this.hoverInitialBtn.bind(_this));
                    args.element.style.width = '206px';
                    args.element.style.display = 'flex';
                    args.element.style.flexDirection = 'column';
                    args.element.style.height = 'auto';
                    args.element.style.alignItems = 'center';
                    args.element.setAttribute('role', 'menuitem');
                }
                if (args.item.text === 'ADD INITIAL') {
                    args.element.innerHTML = '';
                    var addInitialSpan = createElement('button');
                    addInitialSpan.classList.add('e-control', 'e-btn', 'e-lib', 'e-outline', 'e-primary');
                    addInitialSpan.textContent = _this.pdfViewer.localeObj.getConstant('InitialFieldDialogHeaderText');
                    if (_this.pdfViewer.locale === 'en-US') {
                        addInitialSpan.style.width = '130px';
                    }
                    else {
                        addInitialSpan.style.width = 'auto';
                    }
                    addInitialSpan.style.height = '36px';
                    addInitialSpan.addEventListener('click', _this.clickInitial.bind(_this));
                    args.element.appendChild(addInitialSpan);
                    args.element.addEventListener('mouseover', _this.hoverInitialBtn.bind(_this));
                    args.element.style.width = '206px';
                    args.element.style.display = 'flex';
                    args.element.style.flexDirection = 'column';
                    args.element.style.height = 'auto';
                    args.element.style.alignItems = 'center';
                    args.element.setAttribute('role', 'menuitem');
                }
            }
        };
        var drpDownBtn = new DropDownButton(saveOptions);
        if (this.pdfViewer.enableRtl) {
            drpDownBtn.enableRtl = this.pdfViewer.enableRtl;
        }
        drpDownBtn.appendTo(this.handWrittenSignatureItem);
    };
    FormDesignerToolbar.prototype.hoverInitialBtn = function (event) {
        var eventTarget = event.target;
        var currentFieldID = isNullOrUndefined(event.path) ? event.composedPath()[0].id : event.path[0].id;
        if (currentFieldID !== 'sign_' + currentFieldID.split('_')[1] && currentFieldID !== 'delete_' + currentFieldID.split('_')[1]) {
            var liElement = document.getElementById(eventTarget.id);
            if (isNullOrUndefined(liElement)) {
                liElement = document.getElementById(eventTarget.parentElement.id);
            }
            if (liElement != null && (eventTarget.id !== 'sign_' + eventTarget.id.split('_')[1] || eventTarget.id !== 'sign_border_' + eventTarget.id.split('_')[2])) {
                liElement.style.background = 'transparent';
                liElement.style.cursor = 'default';
            }
            else if (liElement.parentElement != null && (eventTarget.id !== 'sign_' + eventTarget.id.split('_')[1] || eventTarget.id !== 'sign_border_' + eventTarget.id.split('_')[2])) {
                liElement.parentElement.style.background = 'transparent';
                liElement.parentElement.style.cursor = 'default';
            }
        }
    };
    FormDesignerToolbar.prototype.getTemplate = function (elementName, id, className) {
        var element = createElement(elementName, { id: this.pdfViewer.element.id + id });
        if (className) {
            element.className = className;
        }
        return element.outerHTML;
    };
    FormDesignerToolbar.prototype.onToolbarClicked = function (args) {
        if (args && args.item) {
            if (args.item.id.indexOf('textbox') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('Textbox');
            }
            else if (args.item.id.indexOf('passwordfield') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('Password');
            }
            else if (args.item.id.indexOf('checkbox') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('CheckBox');
            }
            else if (args.item.id.indexOf('radiobutton') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('RadioButton');
            }
            else if (args.item.id.indexOf('dropdown') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('DropDown');
            }
            else if (args.item.id.indexOf('listbox') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('ListBox');
            }
            else if (args.item.id.indexOf('signature') !== -1) {
                this.pdfViewer.formDesignerModule.setFormFieldMode('SignatureField');
            }
            else if (args.item.id.indexOf('close') !== -1) {
                this.pdfViewer.toolbarModule.formDesignerToolbarModule.
                    showFormDesignerToolbar(this.pdfViewer.toolbarModule.formDesignerItem);
            }
            else if (args.item.id.indexOf('delete') !== -1) {
                this.pdfViewer.formDesignerModule.deleteFormField(this.pdfViewer.selectedItems.formFields[0]);
                this.showHideDeleteIcon(false);
            }
            if (this.pdfViewer.selectedItems.formFields.length > 0) {
                this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.formFields[0].pageIndex);
            }
        }
    };
    FormDesignerToolbar.prototype.clickSignature = function (args) {
        this.pdfViewer.formDesignerModule.setFormFieldMode('SignatureField');
    };
    FormDesignerToolbar.prototype.clickInitial = function (args) {
        this.pdfViewer.isInitialFieldToolbarSelection = true;
        this.pdfViewer.formDesignerModule.setFormFieldMode('InitialField');
        this.pdfViewer.isInitialFieldToolbarSelection = false;
    };
    FormDesignerToolbar.prototype.afterToolbarCreation = function () {
        this.textboxItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_textbox', 'e-pv-formdesigner-textbox', this.pdfViewer.localeObj.getConstant('Textbox'));
        this.textboxItem.setAttribute('tabindex', '0');
        this.textboxItem.setAttribute('data-tabindex', '0');
        this.passwordItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_passwordfield', 'e-pv-formdesigner-passwordfield', this.pdfViewer.localeObj.getConstant('Password'));
        this.passwordItem.setAttribute('tabindex', '0');
        this.passwordItem.setAttribute('data-tabindex', '0');
        this.checkboxItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_checkbox', 'e-pv-formdesigner-checkbox', this.pdfViewer.localeObj.getConstant('Check Box'));
        this.checkboxItem.setAttribute('tabindex', '0');
        this.checkboxItem.setAttribute('data-tabindex', '0');
        this.radioButtonItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_radiobutton', 'e-pv-formdesigner-radiobutton', this.pdfViewer.localeObj.getConstant('Radio Button'));
        this.radioButtonItem.setAttribute('tabindex', '0');
        this.radioButtonItem.setAttribute('data-tabindex', '0');
        this.dropdownItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_dropdown', 'e-pv-formdesigner-dropdown', this.pdfViewer.localeObj.getConstant('Dropdown'));
        this.dropdownItem.setAttribute('tabindex', '0');
        this.dropdownItem.setAttribute('data-tabindex', '0');
        this.listboxItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_listbox', 'e-pv-formdesigner-listbox', this.pdfViewer.localeObj.getConstant('List Box'));
        this.listboxItem.setAttribute('tabindex', '0');
        this.listboxItem.setAttribute('data-tabindex', '0');
        //this.signatureItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_signature', 'e-pv-formdesigner-signature', this.pdfViewer.localeObj.getConstant('Signature'));
        this.deleteItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_delete', 'e-pv-formdesigner-delete', this.pdfViewer.localeObj.getConstant('Delete FormField'));
        this.closeItem = this.primaryToolbar.addClassToolbarItem('_formdesigner_close', 'e-pv-annotation-tools-close', null);
        this.closeItem.setAttribute('tabindex', '0');
        this.closeItem.setAttribute('data-tabindex', '0');
        this.showHideDeleteIcon(false);
        //this.enableTextMarkupAnnotationPropertiesTools(false);
    };
    FormDesignerToolbar.prototype.showHideDeleteIcon = function (isEnable) {
        if (this.toolbar) {
            this.toolbar.enableItems(this.deleteItem.parentElement, isEnable);
            this.deleteItem.setAttribute('tabindex', isEnable ? '0' : '-1');
            this.deleteItem.setAttribute('data-tabindex', isEnable ? '0' : '-1');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormDesignerToolbar.prototype.applyFormDesignerToolbarSettings = function () {
        if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems) {
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('TextboxTool') !== -1) {
                this.showTextboxTool(true);
            }
            else {
                this.showTextboxTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('PasswordTool') !== -1) {
                this.showPasswordTool(true);
            }
            else {
                this.showPasswordTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('CheckBoxTool') !== -1) {
                this.showCheckboxTool(true);
            }
            else {
                this.showCheckboxTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('RadioButtonTool') !== -1) {
                this.showRadioButtonTool(true);
            }
            else {
                this.showRadioButtonTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('DropdownTool') !== -1) {
                this.showDropdownTool(true);
            }
            else {
                this.showDropdownTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('ListboxTool') !== -1) {
                this.showListboxTool(true);
            }
            else {
                this.showListboxTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('DrawSignatureTool') !== -1) {
                this.showDrawSignatureTool(true);
            }
            else {
                this.showDrawSignatureTool(false);
            }
            if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.indexOf('DeleteTool') !== -1) {
                this.showDeleteTool(true);
            }
            else {
                this.showDeleteTool(false);
            }
            this.showSeparator();
        }
    };
    FormDesignerToolbar.prototype.showTextboxTool = function (isShow) {
        this.isTextboxBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 0, 0);
    };
    FormDesignerToolbar.prototype.showPasswordTool = function (isShow) {
        this.isPasswordBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 1, 1);
    };
    FormDesignerToolbar.prototype.showCheckboxTool = function (isShow) {
        this.isCheckboxBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 2, 2);
    };
    FormDesignerToolbar.prototype.showRadioButtonTool = function (isShow) {
        this.isRadiobuttonBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 3, 3);
    };
    FormDesignerToolbar.prototype.showDropdownTool = function (isShow) {
        this.isDropdownBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 4, 4);
    };
    FormDesignerToolbar.prototype.showListboxTool = function (isShow) {
        this.isListboxBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 5, 5);
    };
    FormDesignerToolbar.prototype.showDrawSignatureTool = function (isShow) {
        this.isSignatureBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 6, 6);
    };
    FormDesignerToolbar.prototype.showDeleteTool = function (isShow) {
        this.isDeleteBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 8, 8);
    };
    FormDesignerToolbar.prototype.showSeparator = function () {
        if (!this.isSignatureBtnVisible && !this.isDeleteBtnVisible) {
            this.applyHideToToolbar(false, 7, 7);
        }
    };
    FormDesignerToolbar.prototype.applyHideToToolbar = function (show, startIndex, endIndex) {
        var isHide = !show;
        for (var index = startIndex; index <= endIndex; index++) {
            this.toolbar.hideItem(index, isHide);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormDesignerToolbar.prototype.destroy = function () {
        var componentElement = [this.textboxItem, this.passwordItem, this.checkboxItem, this.radioButtonItem,
            this.listboxItem, this.dropdownItem, this.handWrittenSignatureItem, this.deleteItem];
        for (var i = 0; i < componentElement.length; i++) {
            if (componentElement[parseInt(i.toString(), 10)]) {
                this.destroyDependentComponent(componentElement[parseInt(i.toString(), 10)]);
            }
        }
    };
    FormDesignerToolbar.prototype.destroyDependentComponent = function (component) {
        if (component.ej2_instances) {
            for (var i = component.ej2_instances.length - 1; i >= 0; i--) {
                component.ej2_instances[parseInt(i.toString(), 10)].destroy();
            }
        }
    };
    return FormDesignerToolbar;
}());
export { FormDesignerToolbar };
