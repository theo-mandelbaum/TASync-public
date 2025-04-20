import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ContextMenu as Context } from '@syncfusion/ej2-navigations';
import { ContextMenuItem } from './types';
/**
 * ContextMenu module is used to handle the context menus used in the control.
 *
 * @hidden
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Initialize the constructor of ontextmenu
     *
     * @param { PdfViewer } pdfViewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    function ContextMenu(pdfViewer, pdfViewerBase) {
        this.copyContextMenu = [];
        this.contextMenuList = [];
        this.customMenuItems = [];
        this.filteredCustomItemsIds = [];
        this.defaultContextMenuItems = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
        this.defaultCutId = this.pdfViewer.element.id + '_contextmenu_cut';
        this.defaultCopyId = this.pdfViewer.element.id + '_contextmenu_copy';
        this.defaultPasteId = this.pdfViewer.element.id + '_contextmenu_paste';
        this.defaultDeleteId = this.pdfViewer.element.id + '_contextmenu_delete';
        this.defaultCommentId = this.pdfViewer.element.id + '_contextmenu_comment';
        this.defaultUnderlineId = this.pdfViewer.element.id + '_contextmenu_underline';
        this.defaultHighlightId = this.pdfViewer.element.id + '_contextmenu_highlight';
        this.defaultStrikethroughId = this.pdfViewer.element.id + '_contextmenu_strikethrough';
        this.defaultScaleratioId = this.pdfViewer.element.id + '_contextmenu_scaleratio';
        this.defaultPropertiesId = this.pdfViewer.element.id + '_contextmenu_properties';
        this.copyContextMenu = [
            { text: this.pdfViewer.localeObj.getConstant('Cut'), iconCss: 'e-pv-cut-icon', id: this.defaultCutId },
            { text: this.pdfViewer.localeObj.getConstant('Copy'), iconCss: 'e-pv-copy-icon', id: this.defaultCopyId },
            { text: this.pdfViewer.localeObj.getConstant('Highlight context'), iconCss: 'e-pv-highlight-icon', id: this.defaultHighlightId },
            { text: this.pdfViewer.localeObj.getConstant('Underline context'), iconCss: 'e-pv-underline-icon', id: this.defaultUnderlineId },
            { text: this.pdfViewer.localeObj.getConstant('Strikethrough context'), iconCss: 'e-pv-strikethrough-icon', id: this.defaultStrikethroughId },
            { text: this.pdfViewer.localeObj.getConstant('Paste'), iconCss: 'e-pv-paste-icon', id: this.defaultPasteId },
            { text: this.pdfViewer.localeObj.getConstant('Delete Context'), iconCss: 'e-pv-delete-icon', id: this.defaultDeleteId },
            { text: this.pdfViewer.localeObj.getConstant('Scale Ratio'), iconCss: 'e-pv-scale-ratio-icon', id: this.defaultScaleratioId },
            { separator: true, id: this.pdfViewer.element.id + '_context_menu_comment_separator' },
            { text: this.pdfViewer.localeObj.getConstant('Comment'), iconCss: 'e-pv-comment-icon', id: this.defaultCommentId },
            { separator: true, id: this.pdfViewer.element.id + '_context_menu_separator' },
            { text: this.pdfViewer.localeObj.getConstant('Properties'), iconCss: 'e-pv-property-icon', id: this.defaultPropertiesId }
        ];
        this.defaultLength = this.copyContextMenu.length;
    }
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.createContextMenu = function () {
        this.contextMenuElement = createElement('ul', { id: this.pdfViewer.element.id + '_context_menu', className: 'e-pv-context-menu' });
        this.pdfViewer.element.appendChild(this.contextMenuElement);
        this.contextMenuObj = new Context({
            target: '#' + this.pdfViewerBase.viewerContainer.id, items: this.copyContextMenu,
            beforeOpen: this.contextMenuOnBeforeOpen.bind(this), select: this.onMenuItemSelect.bind(this),
            created: this.contextMenuOnCreated.bind(this)
        });
        if (this.pdfViewer.enableRtl) {
            this.contextMenuObj.enableRtl = true;
        }
        this.contextMenuObj.appendTo(this.contextMenuElement);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.contextMenuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            this.contextMenuObj.animationSettings.effect = 'SlideDown';
        }
    };
    ContextMenu.prototype.contextMenuOnCreated = function (args) {
        var items = [this.defaultHighlightId, this.defaultUnderlineId,
            this.defaultStrikethroughId];
        if (this.pdfViewer.annotationModule) {
            if (!this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
                this.contextMenuObj.enableItems(items, false, true);
            }
        }
        else {
            this.contextMenuObj.enableItems(items, false, true);
        }
    };
    ContextMenu.prototype.setTarget = function (args) {
        var target = null;
        if (args.event && args.event.target) {
            target = args.event.target;
            this.currentTarget = target;
        }
        return target;
    };
    ContextMenu.prototype.contextMenuOnBeforeOpen = function (args) {
        var _this = this;
        var _a;
        if (this.pdfViewerBase.preventContextmenu) {
            args.cancel = true;
        }
        if (this.copyContextMenu.length === this.defaultLength) {
            (_a = this.customMenuItems).push.apply(_a, this.pdfViewer.customContextMenuItems);
            this.addCustomContextMenuItems();
        }
        else if (this.copyContextMenu.length !== this.defaultLength && this.copyShowCustomContextMenuBottom !==
            this.pdfViewer.showCustomContextMenuBottom) {
            this.customMenuItems.forEach(function (menuItem) {
                var index = _this.copyContextMenu.findIndex(function (item) { return item.id === menuItem.id; });
                if (index !== -1) {
                    _this.copyContextMenu.splice(index, 1);
                }
            });
            this.addCustomContextMenuItems();
        }
        var target = this.setTarget(args);
        var currentAnnotSettings = this.pdfViewer.selectedItems.annotations.length !== 0 ?
            this.pdfViewer.selectedItems.annotations[0].annotationSettings : null;
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus && target && target.className === 'free-text-input' && target.tagName === 'TEXTAREA') {
            this.pdfViewerBase.isFreeTextContextMenu = true;
        }
        this.defaultContextMenuItems = [this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Highlight context'),
            this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'), this.pdfViewer.localeObj.getConstant('Paste'),
            this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Properties')
        ];
        var customItems = this.customMenuItems.length > 0 ?
            this.contextMenuObj.items.slice(this.pdfViewer.showCustomContextMenuBottom ? -this.customMenuItems.length : 0, this.pdfViewer.showCustomContextMenuBottom ?
                this.contextMenuObj.items.length : this.customMenuItems.length).map(function (item) { return item.text; }) : [];
        this.contextMenuObj.showItems(this.pdfViewer.showCustomContextMenuBottom ?
            this.defaultContextMenuItems.concat(customItems) : customItems.concat(this.defaultContextMenuItems));
        this.pdfViewerBase.getElement('_context_menu_separator').classList.remove('e-menu-hide');
        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
        this.contextMenuObj.enableItems([this.defaultCutId, this.defaultCopyId, this.defaultPasteId, this.defaultDeleteId], true, true);
        if (!isNullOrUndefined(customItems) && this.customMenuItems.length !== 0) {
            var commonIds = [];
            if (args.items.length < this.defaultLength) {
                commonIds = args.items.map(function (item) { return item.id; });
            }
            else {
                commonIds = this.customMenuItems.map(function (item) { return item.id; });
            }
            this.filteredCustomItemsIds = commonIds.filter(function (id) { return !isNullOrUndefined(id); });
            this.pdfViewer.firecustomContextMenuBeforeOpen(this.filteredCustomItemsIds);
        }
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.checkContextMenuDeleteItem(this.contextMenuObj);
        }
        if (this.pdfViewer.textSelectionModule || this.pdfViewerBase.isShapeBasedAnnotationsEnabled()) {
            if (args.event || this.pdfViewerBase.isTouchDesignerMode) {
                var isClickWithinSelectionBounds = this.pdfViewerBase.isClickWithinSelectionBounds(args.event);
                if (this.pdfViewerBase.isFreeTextContextMenu) {
                    this.contextMenuObj.hideItems([this.defaultHighlightId, this.defaultUnderlineId, this.defaultStrikethroughId,
                        this.defaultPropertiesId, this.defaultCommentId,
                        this.defaultScaleratioId, this.defaultDeleteId], true);
                    this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                    this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                    if (this.pdfViewer.annotation.freeTextAnnotationModule &&
                        this.pdfViewer.annotation.freeTextAnnotationModule.isTextSelected) {
                        this.contextMenuObj.enableItems([this.defaultCopyId], true, true);
                        this.contextMenuObj.enableItems([this.defaultCutId], true, true);
                    }
                    else {
                        this.contextMenuObj.enableItems([this.defaultCopyId], false, true);
                        this.contextMenuObj.enableItems([this.defaultCutId], false, true);
                        window.getSelection().removeAllRanges();
                    }
                    if (this.pdfViewer.annotation.freeTextAnnotationModule && this.pdfViewer.annotation.freeTextAnnotationModule.selectedText !== '') {
                        this.contextMenuObj.enableItems([this.defaultPasteId], true, true);
                    }
                    else {
                        this.contextMenuObj.enableItems([this.defaultPasteId], false, true);
                    }
                }
                else if ((isClickWithinSelectionBounds && this.pdfViewer.textSelectionModule) || (this.pdfViewer.textSelectionModule && this.pdfViewer.textSelectionModule.selectionRangeArray.length > 0 && this.pdfViewer.contextMenuSettings.contextMenuAction === 'MouseUp')) {
                    if ((!args.event.target.classList.contains('e-pv-maintaincontent') && args.event.target.classList.contains('e-pv-text') || args.event.target.classList.contains('e-pv-text-layer'))) {
                        if (this.pdfViewerBase.checkIsNormalText()) {
                            args.cancel = true;
                        }
                    }
                    else if ((Browser.isIE || Browser.info.name === 'edge') && args.event.target.classList.contains('e-pv-page-container')) {
                        args.cancel = true;
                    }
                    this.contextMenuObj.hideItems([this.defaultCutId, this.defaultPasteId, this.defaultDeleteId,
                        this.defaultScaleratioId, this.defaultCommentId, this.defaultPropertiesId], true);
                    this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                    this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                }
                else if (this.pdfViewer.selectedItems.annotations.length !== 0 && (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'HandWrittenSignature' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureText' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureImage' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Path')) {
                    this.onOpeningForShape(false, true);
                }
                else if (this.pdfViewer.selectedItems.annotations.length !== 0 && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType !== 'Path' && !currentAnnotSettings.isLock) {
                    this.onOpeningForShape(true);
                }
                else if (this.pdfViewer.selectedItems.annotations.length !== 0 && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType !== 'Path' && currentAnnotSettings.isLock) {
                    this.hideDefaultContextMenu();
                }
                else if (this.pdfViewer.selectedItems.formFields.length !== 0 &&
                    this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType && this.pdfViewer.designerMode) {
                    this.onOpeningForShape(true);
                    if (!isNullOrUndefined(this.pdfViewer.toolbar) &&
                        !isNullOrUndefined(this.pdfViewer.toolbar.formDesignerToolbarModule)) {
                        this.pdfViewer.toolbar.formDesignerToolbarModule.showHideDeleteIcon(true);
                    }
                }
                else {
                    var target_1 = this.pdfViewerBase.designerModetarget;
                    var annotationModule = this.pdfViewer.annotationModule;
                    if (args.event && args.event.target) {
                        target_1 = args.event.target;
                    }
                    if (this.pdfViewer.annotation && this.pdfViewer.annotation.isShapeCopied && ((target_1).classList.contains('e-pv-text-layer') ||
                        (target_1).classList.contains('e-pv-text') || (target_1).classList.contains('e-pv-viewer-container')) && !this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                        this.onOpeningForShape(false);
                    }
                    else if (this.pdfViewer.formDesigner && this.pdfViewer.formDesigner.isShapeCopied && ((target_1).classList.contains('e-pv-text-layer') ||
                        (target_1).classList.contains('e-pv-text'))) {
                        this.onOpeningForShape(false);
                    }
                    else if (this.pdfViewerBase.isCalibrateAnnotationModule() &&
                        this.pdfViewer.annotationModule.measureAnnotationModule.currentAnnotationMode && !currentAnnotSettings) {
                        this.contextMenuObj.hideItems([this.defaultHighlightId, this.defaultUnderlineId,
                            this.defaultStrikethroughId, this.defaultPropertiesId], true);
                        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
                        this.contextMenuObj.enableItems([this.defaultCutId, this.defaultCopyId, this.defaultPasteId,
                            this.defaultDeleteId, this.defaultCommentId], false, true);
                    }
                    else if (annotationModule && annotationModule.textMarkupAnnotationModule &&
                        annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation &&
                        !annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation.annotationSettings.isLock) {
                        this.contextMenuObj.hideItems([this.defaultHighlightId, this.defaultUnderlineId, this.defaultStrikethroughId,
                            this.defaultPropertiesId, this.defaultCutId,
                            this.defaultCopyId, this.defaultPasteId, this.defaultScaleratioId], true);
                        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
                        this.contextMenuObj.showItems([this.defaultDeleteId, this.defaultCommentId], true);
                    }
                    else if (args.items && args.items.length > 0 && this.pdfViewer.textSelectionModule &&
                        this.pdfViewer.textSelectionModule.isTextSelection && isClickWithinSelectionBounds) {
                        this.contextMenuObj.hideItems([this.defaultCutId, this.defaultPasteId, this.defaultDeleteId,
                            this.defaultScaleratioId, this.defaultCommentId, this.defaultPropertiesId], true);
                        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                    }
                    else {
                        args.cancel = true;
                    }
                }
            }
            else if (this.pdfViewer.textSelectionModule && (this.pdfViewer.contextMenuOption === 'MouseUp')) {
                this.contextMenuObj.hideItems([this.defaultCutId, this.defaultPasteId, this.defaultDeleteId,
                    this.defaultScaleratioId, this.defaultCommentId, this.defaultPropertiesId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.hideContextItems();
            }
            this.enableCommentPanelItem();
        }
        else {
            args.cancel = true;
        }
        if (this.pdfViewer.contextMenuOption === 'None') {
            args.cancel = true;
        }
        else {
            this.contextMenuItems(args);
        }
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.restrictContextMenu()) {
            args.cancel = true;
        }
        if (this.pdfViewer.disableDefaultContextMenu === true) {
            this.hideDefaultContextMenu();
        }
        this.pdfViewerBase.isTouchDesignerMode = false;
    };
    ContextMenu.prototype.contextMenuItems = function (args) {
        if (this.pdfViewer.contextMenuSettings.contextMenuItems.length) {
            var hideMenuItems = [];
            var contextMenuList = this.contextMenuCollection();
            var ul = this.contextMenuObj.getRootElement();
            for (var j = 0; j < this.pdfViewer.contextMenuSettings.contextMenuItems.length; j++) {
                for (var i = 0; i < this.contextMenuList.length; i++) {
                    var menuItem = this.contextMenuList[parseInt(i.toString(), 10)].text;
                    switch (menuItem) {
                        case 'Highlight':
                            menuItem = 'Highlight context';
                            break;
                        case 'Underline':
                            menuItem = 'Underline context';
                            break;
                        case 'Strikethrough':
                            menuItem = 'Strikethrough context';
                            break;
                        case 'Delete':
                            menuItem = 'Delete Context';
                            break;
                        case 'Scale Ratio':
                            menuItem = 'Scale Ratio';
                            break;
                        case 'Comment':
                            this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                            break;
                        case 'Properties':
                            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                            break;
                    }
                    var menuName = this.contextMenuList[parseInt(i.toString(), 10)].text;
                    if (j === 0 && menuName !== ContextMenuItem[this.pdfViewer.contextMenuSettings.
                        contextMenuItems[parseInt(j.toString(), 10)]]) {
                        hideMenuItems.push(menuName);
                    }
                    if (j > 0 && menuName === ContextMenuItem[this.pdfViewer.contextMenuSettings.
                        contextMenuItems[parseInt(j.toString(), 10)]]) {
                        for (var k = 0; k < hideMenuItems.length; k++) {
                            if (hideMenuItems[parseInt(k.toString(), 10)] === menuName) {
                                if (this.pdfViewer.disableContextMenuItems && this.pdfViewer.disableContextMenuItems.length > 0) {
                                    var isDisabled = false;
                                    for (var l = 0; l < this.pdfViewer.disableContextMenuItems.length; l++) {
                                        if (hideMenuItems[parseInt(k.toString(), 10)] ===
                                            ContextMenuItem[this.pdfViewer.disableContextMenuItems[parseInt(l.toString(), 10)]]) {
                                            isDisabled = true;
                                        }
                                    }
                                    if (!isDisabled) {
                                        hideMenuItems.splice(k, 1);
                                    }
                                }
                                else {
                                    hideMenuItems.splice(k, 1);
                                }
                            }
                        }
                    }
                }
            }
            var hideLocaleItem = this.processLocaleContent(hideMenuItems);
            this.contextMenuObj.hideItems(hideLocaleItem);
            if (this.getEnabledItemCount(ul) === 0) {
                args.cancel = true;
            }
        }
    };
    ContextMenu.prototype.processLocaleContent = function (hideMenuItems) {
        var contextMenuLocaleContent = [];
        if (hideMenuItems.length > 0) {
            for (var i = 0; i < hideMenuItems.length; i++) {
                var menuItem = hideMenuItems[parseInt(i.toString(), 10)];
                switch (menuItem) {
                    case 'Highlight':
                        menuItem = 'Highlight context';
                        break;
                    case 'Underline':
                        menuItem = 'Underline context';
                        break;
                    case 'Strikethrough':
                        menuItem = 'Strikethrough context';
                        break;
                    case 'Delete':
                        menuItem = 'Delete Context';
                        break;
                    case 'ScaleRatio':
                        menuItem = 'Scale Ratio';
                        break;
                }
                contextMenuLocaleContent.push(this.pdfViewer.localeObj.getConstant(menuItem));
            }
        }
        return contextMenuLocaleContent;
    };
    ContextMenu.prototype.contextMenuCollection = function () {
        return this.contextMenuList = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Highlight' }, { text: 'Underline' }, { text: 'Strikethrough' },
            { text: 'Paste' }, { text: 'Delete' }, { text: 'ScaleRatio' }, { text: 'Comment' }, { text: 'Properties' }];
    };
    ContextMenu.prototype.getEnabledItemCount = function (ul) {
        var enabledItemCount = this.copyContextMenu.length;
        var liCollection = ul.children;
        for (var i = 0; i < liCollection.length; i++) {
            var li = liCollection[parseInt(i.toString(), 10)];
            if (li.classList.contains('e-menu-hide') || li.classList.contains('e-disabled')) {
                enabledItemCount = enabledItemCount - 1;
            }
        }
        return enabledItemCount;
    };
    ContextMenu.prototype.hideContextItems = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 0) {
            this.contextMenuObj.hideItems([this.defaultCutId, this.defaultPasteId, this.defaultDeleteId,
                this.defaultScaleratioId, this.defaultPropertiesId], true);
            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
        }
    };
    ContextMenu.prototype.enableCommentPanelItem = function () {
        if (this.pdfViewer.enableCommentPanel) {
            this.contextMenuObj.enableItems([this.defaultCommentId], true, true);
        }
        else {
            this.contextMenuObj.enableItems([this.defaultCommentId], false, true);
        }
        if (this.pdfViewer.selectedItems.formFields.length !== 0) {
            this.contextMenuObj.enableItems([this.defaultCommentId], false, true);
        }
    };
    ContextMenu.prototype.onOpeningForShape = function (isProp, isSignature) {
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.isShapeCopied) {
            this.contextMenuObj.enableItems([this.defaultPasteId], true, true);
        }
        else if (this.pdfViewer.formDesigner && this.pdfViewer.formDesigner.isShapeCopied) {
            this.contextMenuObj.enableItems([this.defaultPasteId], true, true);
        }
        else {
            this.contextMenuObj.enableItems([this.defaultPasteId], false, true);
        }
        this.contextMenuObj.hideItems([this.defaultHighlightId, this.defaultUnderlineId, this.defaultStrikethroughId,
            this.defaultScaleratioId], true);
        if (isProp) {
            if (this.pdfViewer.selectedItems.annotations.length !== 0 && (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Line' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'LineWidthArrowHead' ||
                this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance')) {
                this.contextMenuObj.showItems([this.defaultPropertiesId], true);
            }
            else if (this.pdfViewer.selectedItems.formFields.length !== 0 &&
                this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType) {
                this.contextMenuObj.hideItems([this.defaultCommentId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.contextMenuObj.showItems([this.defaultPropertiesId], true);
            }
            else if (isNullOrUndefined(isSignature) && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Image' && !this.pdfViewer.selectedItems.annotations[0].id.startsWith('stamp')) {
                this.contextMenuObj.hideItems([this.defaultPropertiesId, this.defaultCommentId, this.defaultCutId,
                    this.defaultCopyId, this.defaultPasteId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.contextMenuObj.hideItems([this.defaultPropertiesId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
            }
        }
        else if (isSignature) {
            if ((this.pdfViewer.selectedItems.annotations[0].annotName === 'SignatureField' || this.pdfViewer.selectedItems.annotations[0].annotName === 'InitialField' || this.pdfViewer.selectedItems.annotations[0].annotName === 'SignatureText')) {
                this.contextMenuObj.hideItems([this.defaultPropertiesId, this.defaultCommentId, this.defaultCutId,
                    this.defaultCopyId, this.defaultPasteId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.contextMenuObj.hideItems([this.defaultPropertiesId, this.defaultCommentId], true);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
        }
        else {
            this.contextMenuObj.hideItems([this.defaultCutId, this.defaultCopyId, this.defaultDeleteId,
                this.defaultPropertiesId, this.defaultCommentId], true);
            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
            this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
        }
    };
    ContextMenu.prototype.OnItemSelected = function (selectedMenu) {
        this.pdfViewerBase.OnItemSelected(selectedMenu);
    };
    ContextMenu.prototype.onMenuItemSelect = function (args) {
        var foundItem = this.filteredCustomItemsIds.find(function (item) { return item === args.item.id; });
        var matchingItemId = isNullOrUndefined(foundItem) ? undefined : foundItem.toString();
        if (matchingItemId) {
            this.pdfViewer.firecustomContextMenuSelect(matchingItemId);
        }
        else {
            this.pdfViewerBase.OnItemSelected(args.item.text);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.destroy = function () {
        if (this.contextMenuObj) {
            this.previousAction = '';
            this.contextMenuObj.destroy();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.close = function () {
        this.contextMenuObj.close();
    };
    /**
     * open the context menu.
     *
     * @param {number} top - The top.
     * @param {number} left - The left.
     * @param {HTMLElement} target - The target.
     * @returns {void}
     */
    ContextMenu.prototype.open = function (top, left, target) {
        this.contextMenuObj.open(top, left, target);
    };
    ContextMenu.prototype.addCustomContextMenuItems = function () {
        var idSet = new Set();
        this.customMenuItems = this.customMenuItems.reverse().filter(function (item) { return !idSet.has(item.id) && idSet.add(item.id); }).reverse();
        var length = this.customMenuItems.length;
        if (length > 0) {
            if (this.pdfViewer.showCustomContextMenuBottom === true) {
                for (var i = 0; i < length; i++) {
                    this.copyContextMenu.push(this.customMenuItems[parseInt(i.toString(), 10)]);
                }
            }
            else {
                for (var i = length - 1; i >= 0; i--) {
                    this.copyContextMenu.unshift(this.customMenuItems[parseInt(i.toString(), 10)]);
                }
            }
            this.contextMenuObj.items = this.copyContextMenu;
            this.contextMenuObj.dataBind();
        }
        this.copyShowCustomContextMenuBottom = this.pdfViewer.showCustomContextMenuBottom;
    };
    ContextMenu.prototype.hideDefaultContextMenu = function () {
        this.contextMenuObj.hideItems(this.defaultContextMenuItems);
        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
    };
    return ContextMenu;
}());
export { ContextMenu };
