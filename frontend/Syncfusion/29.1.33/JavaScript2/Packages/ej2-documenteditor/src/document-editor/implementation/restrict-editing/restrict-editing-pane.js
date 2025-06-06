import { createElement, L10n, isNullOrUndefined, updateCSSText } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { AddUserDialog } from './add-user-dialog';
import { EnforceProtectionDialog, UnProtectDocumentDialog } from './enforce-protection-dialog';
import { Base64 } from '../editor/editor-helper';
import { ListView } from '@syncfusion/ej2-lists';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * @private
 * @param {any} args - Specifies the args
 * @returns {void}
 */
var RestrictEditing = /** @class */ (function () {
    function RestrictEditing(documentHelper) {
        var _this = this;
        this.addRemove = true;
        this.protectionType = 'ReadOnly';
        this.previousProtectionType = 'Read only';
        this.isShowRestrictPane = false;
        this.isAddUser = false;
        this.usersCollection = ['Everyone'];
        /**
         * @returns {void}
         */
        this.closePane = function () {
            _this.isShowRestrictPane = false;
            _this.restrictPane.style.display = 'none';
            _this.documentHelper.owner.showHideRulers();
            _this.documentHelper.owner.triggerResize();
        };
        this.onYesButtonClick = function () {
            _this.viewer.owner.editorModule.removeAllEditRestrictions();
            _this.documentHelper.dialog.hide();
        };
        this.onCancelButtonClick = function (args) {
            _this.protectionTypeDrop.value = _this.previousProtectionType;
            _this.documentHelper.dialog.hide();
        };
        this.onNoButtonClick = function () {
            _this.documentHelper.dialog.hide();
        };
        /**
         * @returns {void}
         */
        this.showAllRegion = function () {
            _this.documentHelper.selection.showAllEditingRegion();
        };
        this.documentHelper = documentHelper;
        this.addUserDialog = new AddUserDialog(documentHelper);
        this.enforceProtectionDialog = new EnforceProtectionDialog(documentHelper, this);
        this.unProtectDialog = new UnProtectDocumentDialog(documentHelper, this);
        this.base64 = new Base64();
    }
    Object.defineProperty(RestrictEditing.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    RestrictEditing.prototype.showHideRestrictPane = function (isShow) {
        if (!this.restrictPane) {
            this.localObj = new L10n('documenteditor', this.viewer.owner.defaultLocale);
            this.localObj.setLocale(this.viewer.owner.locale);
            this.initPane(this.localObj, this.documentHelper.owner.enableRtl);
        }
        if (isShow) {
            this.restrictPane.style.display = 'block';
            this.isShowRestrictPane = true;
            this.documentHelper.selection.isHighlightEditRegion = true;
            this.wireEvents();
            this.documentHelper.updateViewerSize();
            this.loadPaneValue();
            this.addUserCollection();
        }
        else {
            this.closePane();
            if (this.documentHelper.owner.enableAutoFocus) {
                this.documentHelper.updateFocus();
            }
        }
        this.documentHelper.owner.triggerResize();
    };
    RestrictEditing.prototype.initPane = function (localValue, isRtl) {
        this.restrictPane = createElement('div', { className: 'e-de-restrict-pane' });
        if (isRtl) {
            this.restrictPane.classList.add('e-rtl');
        }
        var headerWholeDiv = createElement('div', { className: 'e-de-rp-whole-header' });
        var headerDiv1 = createElement('div', {
            innerHTML: localValue.getConstant('Restrict Editing'), className: 'e-de-rp-header'
        });
        this.closeButton = createElement('button', {
            className: 'e-de-rp-close-icon e-de-close-icon e-btn e-flat e-icon-btn',
            attrs: { type: 'button' }
        });
        this.closeButton.setAttribute('aria-label', this.localObj.getConstant('Close'));
        headerWholeDiv.appendChild(this.closeButton);
        headerWholeDiv.appendChild(headerDiv1);
        var closeSpan = createElement('span', { className: 'e-de-op-close-icon e-de-close-icon e-btn-icon e-icons' });
        this.closeButton.appendChild(closeSpan);
        this.restrictPane.appendChild(headerWholeDiv);
        this.initRestrictEditingPane(localValue);
        var cssText = 'display:inline-flex;';
        updateCSSText(this.documentHelper.optionsPaneContainer, cssText);
        this.documentHelper.optionsPaneContainer.insertBefore(this.restrictPane, this.documentHelper.viewerContainer);
    };
    /* eslint-disable  */
    RestrictEditing.prototype.initRestrictEditingPane = function (localObj) {
        this.restrictPaneWholeDiv = createElement('div');
        var formatWholeDiv = createElement('div', { className: 'e-de-rp-sub-div' });
        var formatDiv = createElement('div', {
            innerHTML: localObj.getConstant('Formatting restrictions'),
            className: 'e-de-rp-format'
        });
        formatWholeDiv.appendChild(formatDiv);
        var allowFormatting = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        formatWholeDiv.appendChild(allowFormatting);
        this.allowFormat = this.createCheckBox(localObj.getConstant('Allow formatting'), allowFormatting);
        this.restrictPaneWholeDiv.appendChild(formatWholeDiv);
        // Editing restrictions
        var editRestrictWholeDiv = createElement('div', { className: 'e-de-rp-sub-div' });
        // let editRestrict: HTMLElement = createElement('div', {
        //     innerHTML: localObj.getConstant('Editing restrictions'),
        //     className: 'e-de-rp-format'
        // });
        // editRestrictWholeDiv.appendChild(editRestrict);
        var readOnly = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        var protectionTypeInput = createElement('input', {
            className: 'e-prop-font-style'
        });
        editRestrictWholeDiv.appendChild(protectionTypeInput);
        var protectionTypeValue = [
            { Value: 'Read only', Name: localObj.getConstant('Read only') },
            { Value: 'Filling in forms', Name: localObj.getConstant('Filling in forms') },
            { Value: 'Comments', Name: localObj.getConstant('Comments') },
            { Value: 'Tracked changes', Name: localObj.getConstant('Tracked changes') }
        ];
        this.protectionTypeDrop = new DropDownList({
            dataSource: protectionTypeValue,
            cssClass: 'e-de-prop-dropdown',
            floatLabelType: 'Always',
            placeholder: localObj.getConstant('Editing restrictions'),
            fields: { text: 'Name', value: 'Value' },
            enableRtl: this.documentHelper.owner.enableRtl
        });
        this.protectionTypeDrop.value = 'Read only';
        this.protectionTypeDrop.appendTo(protectionTypeInput);
        // let allowPrint: HTMLInputElement = createElement('input', {
        //     attrs: { type: 'checkbox' },
        //     id: this.viewer.owner.containerId + '_allowPrint'
        // }) as HTMLInputElement;
        // editRestrictWholeDiv.appendChild(allowPrint);
        // this.allowPrint = this.createCheckBox('Allow Printing', allowPrint);
        // let allowCopy: HTMLInputElement = createElement('input', {
        //     attrs: { type: 'checkbox' },
        //     id: this.viewer.owner.containerId + '_allowCopy'
        // }) as HTMLInputElement;
        // editRestrictWholeDiv.appendChild(allowCopy);
        // this.allowCopy = this.createCheckBox('Allow Copy', allowCopy);
        this.restrictPaneWholeDiv.appendChild(editRestrictWholeDiv);
        // User Permissions
        this.userWholeDiv = createElement('div', { className: 'e-de-rp-sub-div' });
        var userDiv = createElement('div', {
            innerHTML: localObj.getConstant('Exceptions Optional'),
            className: 'e-de-rp-format'
        });
        this.userWholeDiv.appendChild(userDiv);
        var subContentDiv = createElement('div', {
            innerHTML: localObj.getConstant('Select Part Of Document And User'),
            className: 'e-de-rp-sub-content-div'
        });
        this.userWholeDiv.appendChild(subContentDiv);
        var emptyuserDiv = createElement('div', { className: 'e-de-rp-user' });
        this.userWholeDiv.appendChild(emptyuserDiv);
        this.addedUser = new ListView({
            cssClass: 'e-de-user-listView',
            dataSource: [{ text: 'Everyone' }],
            showCheckBox: true,
            select: this.selectHandler.bind(this),
            enableRtl: this.documentHelper.owner.enableRtl
        });
        this.addedUser.appendTo(emptyuserDiv);
        this.addUser = createElement('button', {
            className: 'e-btn e-primary e-flat e-de-rp-mu-btn',
            innerHTML: localObj.getConstant('More users') + '...',
            //styles: 'margin-top: 3px',
            attrs: { type: 'button' }
        });
        this.addUser.setAttribute('aria-label', localObj.getConstant('More users'));
        this.userWholeDiv.appendChild(this.addUser);
        this.restrictPaneWholeDiv.appendChild(this.userWholeDiv);
        var lastDiv = createElement('div', { className: 'e-de-rp-enforce' });
        this.restrictPaneWholeDiv.appendChild(lastDiv);
        this.enforceProtection = createElement('button', {
            innerHTML: localObj.getConstant('Enforcing Protection'),
            className: 'e-btn e-de-rp-btn-enforce',
            attrs: { type: 'button' }
        });
        this.enforceProtection.setAttribute('aria-label', localObj.getConstant('Enforcing Protection'));
        lastDiv.appendChild(this.enforceProtection);
        this.restrictPane.appendChild(this.restrictPaneWholeDiv);
        this.stopProtectionDiv = createElement('div', { styles: 'display:none' });
        var headerDiv = createElement('div', { innerHTML: localObj.getConstant('Your permissions'), className: 'e-de-rp-stop-div1' });
        this.stopProtectionDiv.appendChild(headerDiv);
        var contentWholeDiv = createElement('div', { className: 'e-de-rp-stop-div2' });
        this.stopProtectionDiv.appendChild(contentWholeDiv);
        var content1 = localObj.getConstant('Protected Document');
        this.contentDiv1 = createElement('div', { innerHTML: content1 });
        contentWholeDiv.appendChild(this.contentDiv1);
        var content2 = localObj.getConstant('ReadOnlyProtection');
        this.contentDiv2 = createElement('div', { innerHTML: content2 });
        contentWholeDiv.appendChild(this.contentDiv2);
        this.stopReadOnlyOptions = createElement('div');
        this.stopProtectionDiv.appendChild(this.stopReadOnlyOptions);
        var navigateNext = createElement('div', { className: 'e-de-rp-enforce-nav' });
        var navigateNextButton = createElement('button', {
            innerHTML: localObj.getConstant('Find Next Region I Can Edit'), className: 'e-btn e-de-rp-nav-btn',
            attrs: { type: 'button' }
        });
        navigateNext.appendChild(navigateNextButton);
        navigateNextButton.addEventListener('click', this.navigateNextRegion.bind(this));
        this.stopReadOnlyOptions.appendChild(navigateNext);
        var showAllRegion = createElement('div', { className: 'e-de-rp-enforce-nav' });
        var showAllRegionButton = createElement('button', {
            innerHTML: localObj.getConstant('Show All Regions I Can Edit'), className: 'e-btn e-de-rp-nav-btn',
            attrs: { type: 'button' }
        });
        showAllRegion.appendChild(showAllRegionButton);
        showAllRegionButton.addEventListener('click', this.showAllRegion);
        this.stopReadOnlyOptions.appendChild(showAllRegion);
        var highlightRegion = createElement('div', { className: 'e-de-rp-nav-lbl e-de-rp-more-less' });
        var highlightRegionInput = createElement('input', { attrs: { type: 'checkbox' }, className: 'e-btn e-de-rp-nav-btn' });
        highlightRegion.appendChild(highlightRegionInput);
        this.stopReadOnlyOptions.appendChild(highlightRegion);
        this.highlightCheckBox = new CheckBox({ label: localObj.getConstant('Highlight the regions I can edit'), change: this.changeHighlightOptions.bind(this), enableRtl: this.documentHelper.owner.enableRtl }, highlightRegionInput);
        var lastButtonDiv = createElement('div', { className: 'e-de-rp-enforce' });
        this.stopProtection = createElement('button', {
            innerHTML: localObj.getConstant('Stop Protection'),
            className: 'e-btn e-de-rp-btn-stop-enforce',
            attrs: { type: 'button' }
        });
        lastButtonDiv.appendChild(this.stopProtection);
        this.stopProtectionDiv.appendChild(lastButtonDiv);
        this.restrictPane.appendChild(this.stopProtectionDiv);
    };
    RestrictEditing.prototype.showStopProtectionPane = function (show) {
        if (show) {
            this.stopProtectionDiv.style.display = 'block';
            this.restrictPaneWholeDiv.style.display = 'none';
        }
        else {
            this.stopProtectionDiv.style.display = 'none';
            this.restrictPaneWholeDiv.style.display = 'block';
        }
        switch (this.documentHelper.protectionType) {
            case 'ReadOnly':
                this.stopReadOnlyOptions.style.display = 'block';
                break;
            case 'CommentsOnly':
                this.stopReadOnlyOptions.style.display = 'block';
                break;
            default:
                this.stopReadOnlyOptions.style.display = 'none';
                break;
        }
        this.documentHelper.owner.showHideRulers();
        this.documentHelper.owner.triggerResize();
    };
    RestrictEditing.prototype.wireEvents = function () {
        this.addUser.addEventListener('click', this.addUserDialog.show);
        this.enforceProtection.addEventListener('click', this.protectDocument.bind(this));
        this.stopProtection.addEventListener('click', this.stopProtectionTriggered.bind(this));
        this.closeButton.addEventListener('click', this.closePane);
        this.allowFormat.addEventListener('change', this.enableFormatting.bind(this));
        this.protectionTypeDrop.addEventListener('change', this.protectionTypeDropChanges.bind(this));
        this.highlightCheckBox.addEventListener('change', this.highlightClicked.bind(this));
    };
    RestrictEditing.prototype.changeHighlightOptions = function () {
        var _this = this;
        this.documentHelper.owner.documentEditorSettings.highlightEditableRanges = this.highlightCheckBox.checked;
        setTimeout(function () {
            if (_this.documentHelper) {
                _this.documentHelper.owner.focusIn();
            }
        }, 10);
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    RestrictEditing.prototype.enableFormatting = function (args) {
        this.documentHelper.restrictFormatting = !args.checked;
    };
    RestrictEditing.prototype.stopProtectionTriggered = function (args) {
        if ((isNullOrUndefined(this.documentHelper.saltValue) || this.documentHelper.saltValue === '')
            && (isNullOrUndefined(this.documentHelper.hashValue) || this.documentHelper.hashValue === '')) {
            this.documentHelper.owner.editorModule.unProtectDocument();
            return;
        }
        this.unProtectDialog.show();
    };
    RestrictEditing.prototype.protectionTypeDropChanges = function (args) {
        switch (args.value) {
            case 'Read only':
                this.protectionType = 'ReadOnly';
                this.userWholeDiv.style.display = 'block';
                //this.enforceProtection.style.marginLeft = '0px';
                this.contentDiv1.innerHTML = this.localObj.getConstant('Protected Document');
                this.contentDiv2.innerHTML = this.localObj.getConstant('ReadOnlyProtection');
                //this.contentDiv2.style.display = 'block';     
                this.previousProtectionType = args.previousItemData.Value;
                break;
            case 'Filling in forms':
                this.protectionType = 'FormFieldsOnly';
                this.userWholeDiv.style.display = 'none';
                //this.enforceProtection.style.marginLeft = '8px';
                this.contentDiv1.innerHTML = this.localObj.getConstant('Protected Document');
                this.contentDiv2.innerHTML = this.localObj.getConstant('FormFieldsOnly');
                //this.contentDiv2.style.display = 'block';
                this.previousProtectionType = args.previousItemData.Value;
                this.showRemovedIgnoreDialog();
                break;
            case 'Comments':
                this.protectionType = 'CommentsOnly';
                this.userWholeDiv.style.display = 'block';
                //this.enforceProtection.style.marginLeft = '0px';
                this.contentDiv1.innerHTML = this.localObj.getConstant('Protected Document');
                this.contentDiv2.innerHTML = this.localObj.getConstant('CommentsOnly');
                //this.contentDiv2.style.display = 'none';
                this.previousProtectionType = args.previousItemData.Value;
                break;
            case 'Tracked changes':
                this.protectionType = 'RevisionsOnly';
                this.userWholeDiv.style.display = 'none';
                this.contentDiv1.innerHTML = this.localObj.getConstant('Protected Document');
                this.contentDiv2.innerHTML = this.localObj.getConstant('TrackChangesOnly');
                this.previousProtectionType = args.previousItemData.Value;
                this.showRemovedIgnoreDialog();
                break;
            default:
                this.protectionType = 'NoProtection';
                this.addedUser.uncheckAllItems();
                this.viewer.owner.editorModule.removeAllEditRestrictions();
                break;
        }
    };
    RestrictEditing.prototype.showRemovedIgnoreDialog = function () {
        if (this.documentHelper.selection && this.documentHelper.editRanges.length > 0) {
            this.documentHelper.dialog.height = ' Auto';
            this.documentHelper.dialog.width = ' 600px';
            this.documentHelper.dialog.header = this.localObj.getConstant('Information');
            this.documentHelper.dialog.content = this.localObj.getConstant('RemovedIgnoreExceptions') + '<br>' + '<br>' + this.localObj.getConstant('RemovedIgnore');
            this.documentHelper.dialog.buttons = [{
                    click: this.onYesButtonClick,
                    buttonModel: { content: this.localObj.getConstant('Yes') }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: this.localObj.getConstant('Cancel') }
                },
                {
                    click: this.onNoButtonClick,
                    buttonModel: { content: this.localObj.getConstant('No') }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
        }
    };
    RestrictEditing.prototype.selectHandler = function (args) {
        if (args.isChecked) {
            this.viewer.owner.editorModule.insertEditRangeElement(args.text);
            args.event.target.classList.add('e-check');
        }
        else {
            this.viewer.owner.editorModule.removeUserRestrictions(args.text);
        }
    };
    RestrictEditing.prototype.highlightClicked = function (args) {
        this.documentHelper.selection.isHighlightEditRegion = args.checked;
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    RestrictEditing.prototype.protectDocument = function () {
        this.enforceProtectionDialog.show();
    };
    RestrictEditing.prototype.createCheckBox = function (label, element) {
        var checkBox = new CheckBox({ label: label, enableRtl: this.documentHelper.owner.enableRtl });
        checkBox.appendTo(element);
        return checkBox;
    };
    RestrictEditing.prototype.loadPaneValue = function () {
        // if (!this.isAddUser) {
        //     this.protectionType = this.documentHelper.protectionType;
        // }
        this.allowFormat.checked = !this.documentHelper.restrictFormatting;
        switch (this.documentHelper.protectionType) {
            case 'ReadOnly':
                this.protectionTypeDrop.value = 'Read only';
                break;
            case 'FormFieldsOnly':
                this.protectionTypeDrop.value = 'Filling in forms';
                break;
            case 'CommentsOnly':
                this.protectionTypeDrop.value = 'Comments';
                break;
            case 'RevisionsOnly':
                this.protectionTypeDrop.value = 'Tracked changes';
                break;
        }
        this.highlightCheckBox.checked = this.documentHelper.owner.documentEditorSettings.highlightEditableRanges;
        this.documentHelper.selection.isHighlightEditRegion = this.documentHelper.owner.documentEditorSettings.highlightEditableRanges;
        this.addedUser.enablePersistence = true;
        this.addedUser.dataSource = this.usersCollection.slice();
        this.addedUser.dataBind();
        this.showStopProtectionPane(this.documentHelper.isDocumentProtected);
    };
    RestrictEditing.prototype.navigateNextRegion = function () {
        this.documentHelper.selection.navigateToNextEditingRegion();
    };
    RestrictEditing.prototype.addUserCollection = function () {
        if (this.documentHelper.selection && this.documentHelper.selection.editRangeCollection.length > 0) {
            for (var i = 0; i < this.documentHelper.selection.editRangeCollection.length; i++) {
                var editStart = this.documentHelper.selection.editRangeCollection[i];
                if (editStart.user !== '' && this.usersCollection.indexOf(editStart.user) === -1) {
                    this.usersCollection.push(editStart.user);
                }
                if (editStart.group !== '' && this.usersCollection.indexOf(editStart.group) === -1) {
                    this.usersCollection.push(editStart.group);
                }
            }
        }
        this.addedUser.dataSource = this.documentHelper.userCollection.slice();
        this.addedUser.dataBind();
    };
    RestrictEditing.prototype.updateUserInformation = function () {
        this.addedUser.uncheckAllItems();
        if (this.documentHelper.selection.checkSelectionIsAtEditRegion) {
            var editRange = this.documentHelper.selection.getEditRangeStartElement();
            if (editRange) {
                var index = this.addedUser.dataSource.indexOf(editRange.user);
                if (index > -1) {
                    var listElement = this.addedUser.element.querySelectorAll('li')[index];
                    listElement.querySelector('.e-icons').classList.add('e-check');
                }
                index = this.addedUser.dataSource.indexOf(editRange.group);
                if (index > -1) {
                    var listElement = this.addedUser.element.querySelectorAll('li')[index];
                    listElement.querySelector('.e-icons').classList.add('e-check');
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    RestrictEditing.prototype.destroy = function () {
        if (this.addUserDialog) {
            this.addUserDialog.destroy();
        }
        this.addUserDialog = undefined;
        if (this.enforceProtectionDialog) {
            this.enforceProtectionDialog.destroy();
        }
        this.enforceProtectionDialog = undefined;
        if (this.unProtectDialog) {
            this.unProtectDialog.destroy();
        }
        this.unProtectDialog = undefined;
        if (this.base64) {
            this.base64.destroy();
        }
        this.base64 = undefined;
        if (this.addedUser) {
            this.addedUser.destroy();
            this.addedUser = undefined;
        }
        if (this.allowFormat) {
            this.allowFormat.destroy();
            this.allowFormat = undefined;
        }
        if (this.protectionTypeDrop) {
            this.protectionTypeDrop.destroy();
            this.protectionTypeDrop = undefined;
        }
        if (this.highlightCheckBox) {
            this.highlightCheckBox.destroy();
            this.highlightCheckBox = undefined;
        }
        if (this.addUser) {
            this.addUser.innerHTML = '';
            this.addUser.remove();
            this.addUser = undefined;
        }
        if (this.restrictPane) {
            this.restrictPane.innerHTML = '';
            this.restrictPane.remove();
            this.restrictPane = undefined;
        }
        if (this.enforceProtection) {
            this.enforceProtection.innerHTML = '';
            this.enforceProtection.remove();
            this.enforceProtection = undefined;
        }
        if (this.stopProtection) {
            this.stopProtection.innerHTML = '';
            this.stopProtection.remove();
            this.stopProtection = undefined;
        }
        if (this.stopProtectionDiv) {
            this.stopProtectionDiv.innerHTML = '';
            this.stopProtectionDiv.remove();
            this.stopProtectionDiv = undefined;
        }
        if (this.stopReadOnlyOptions) {
            this.stopReadOnlyOptions.innerHTML = '';
            this.stopReadOnlyOptions.remove();
            this.stopReadOnlyOptions = undefined;
        }
        if (this.contentDiv1) {
            this.contentDiv1.innerHTML = '';
            this.contentDiv1.remove();
            this.contentDiv1 = undefined;
        }
        if (this.contentDiv2) {
            this.contentDiv2.innerHTML = '';
            this.contentDiv2.remove();
            this.contentDiv2 = undefined;
        }
        if (this.closeButton) {
            this.closeButton.innerHTML = '';
            this.closeButton.remove();
            this.closeButton = undefined;
        }
        if (this.userWholeDiv) {
            this.userWholeDiv.innerHTML = '';
            this.userWholeDiv.remove();
            this.userWholeDiv = undefined;
        }
        if (this.restrictPaneWholeDiv) {
            this.restrictPaneWholeDiv.innerHTML = '';
            this.restrictPaneWholeDiv.remove();
            this.restrictPaneWholeDiv = undefined;
        }
        this.usersCollection = [];
        this.usersCollection = undefined;
        this.previousProtectionType = undefined;
        this.currentHashValue = undefined;
        this.currentSaltValue = undefined;
        this.documentHelper = undefined;
    };
    return RestrictEditing;
}());
export { RestrictEditing };
