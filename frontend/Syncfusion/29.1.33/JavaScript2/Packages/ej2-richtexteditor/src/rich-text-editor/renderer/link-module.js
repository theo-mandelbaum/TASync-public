import { EventHandler, detach, isNullOrUndefined, select, extend, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { closest, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { CLS_RTE_ELEMENTS } from '../base/classes';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { RenderType } from '../base/enum';
import { dispatchEvent, parseHtml } from '../base/util';
import { isIDevice } from '../../common/util';
/**
 * `Link` module is used to handle undo actions.
 */
var Link = /** @class */ (function () {
    function Link(parent, serviceLocator) {
        this.parent = parent;
        this.rteID = parent.element.id;
        this.i10n = serviceLocator.getService('rteLocale');
        this.addEventListener();
        this.serviceLocator = serviceLocator;
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.isDestroyed = false;
        this.mouseDown = this.onDocumentClick.bind(this);
    }
    Link.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.insertLink, this.linkDialog, this);
        this.parent.on(events.showLinkDialog, this.showDialog, this);
        this.parent.on(events.closeLinkDialog, this.closeDialog, this);
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.insertCompleted, this.showLinkQuickToolbar, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.linkToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.unLink, this.removeLink, this);
        this.parent.on(events.editLink, this.editLink, this);
        this.parent.on(events.openLink, this.openLink, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    Link.prototype.onToolbarAction = function (args) {
        var item = args.args.item;
        switch (item.subCommand) {
            case 'OpenLink':
                this.parent.notify(events.openLink, args);
                break;
            case 'EditLink':
                this.parent.notify(events.editLink, args);
                break;
            case 'RemoveLink':
                this.parent.notify(events.unLink, args);
                break;
        }
    };
    Link.prototype.removeEventListener = function () {
        this.parent.off(events.insertLink, this.linkDialog);
        this.parent.off(events.showLinkDialog, this.showDialog);
        this.parent.off(events.closeLinkDialog, this.closeDialog);
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.insertCompleted, this.showLinkQuickToolbar);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.linkToolbarAction, this.onToolbarAction);
        this.parent.off(events.unLink, this.removeLink);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.editLink, this.editLink);
        this.parent.off(events.openLink, this.openLink);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.destroy);
        if (!isNullOrUndefined(this.contentModule)) {
            this.parent.element.ownerDocument.removeEventListener('mousedown', this.mouseDown);
            this.mouseDown = null;
        }
    };
    Link.prototype.onIframeMouseDown = function () {
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
    };
    Link.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                currentObj.setProperties({ cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                currentObj.setProperties({ cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    Link.prototype.setCssClass = function (e) {
        this.updateCss(this.checkBoxObj, e);
        this.updateCss(this.dialogObj, e);
    };
    Link.prototype.showLinkQuickToolbar = function (e) {
        var _this = this;
        if (!isNullOrUndefined(e.args) && e.args.action !== 'enter' &&
            e.args.action !== 'space') {
            var pageX_1;
            var pageY_1;
            if (e.type !== 'Links' || isNullOrUndefined(this.parent.quickToolbarModule) ||
                isNullOrUndefined(this.parent.quickToolbarModule.linkQTBar)) {
                return;
            }
            this.quickToolObj = this.parent.quickToolbarModule;
            var parentTop = this.parent.element.getBoundingClientRect().top;
            var parentLeft = this.parent.element.getBoundingClientRect().left;
            var range_1 = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var target_1;
            [].forEach.call(e.elements, function (element, index) {
                if (index === 0) {
                    target_1 = ((element.nodeName === '#text') ? (element.parentNode) : element);
                }
            });
            if (e.isNotify) {
                var tbElement = this.parent.toolbarModule.getToolbarElement();
                var linkTop = target_1.getBoundingClientRect().top;
                var linkLeft = target_1.getBoundingClientRect().left;
                var linkPos = linkTop - parentTop;
                var tbHeight = (tbElement) ? (tbElement.offsetHeight + this.parent.toolbarModule.getExpandTBarPopHeight()) : 0;
                pageX_1 = (this.parent.iframeSettings.enable) ? parentLeft + linkLeft : target_1.getBoundingClientRect().left;
                pageY_1 = window.pageYOffset + ((this.parent.iframeSettings.enable) ?
                    (parentTop + tbHeight + linkTop) : (parentTop + linkPos));
                this.linkQTPopupTime = setTimeout(function () {
                    _this.showLinkPopup(pageX_1, pageY_1, range_1);
                }, 400);
            }
            else {
                var args = void 0;
                args = e.args.touches ? e.args.changedTouches[0] : args = e.args;
                pageX_1 = (this.parent.iframeSettings.enable) ? window.pageXOffset + parentLeft + args.clientX : args.pageX;
                pageY_1 = (this.parent.iframeSettings.enable) ? window.pageYOffset + parentTop + args.clientY : args.pageY;
                this.showLinkPopup(pageX_1, pageY_1, range_1);
            }
            if (this.quickToolObj.linkQTBar) {
                this.quickToolObj.linkQTBar.showPopup(pageX_1, pageY_1, range_1.endContainer, 'link');
            }
        }
    };
    Link.prototype.showLinkPopup = function (pageX, pageY, range) {
        if (this.quickToolObj.linkQTBar) {
            this.quickToolObj.linkQTBar.showPopup(pageX, pageY, range.endContainer, 'link');
        }
    };
    Link.prototype.hideLinkQuickToolbar = function () {
        if (this.quickToolObj && this.quickToolObj.linkQTBar && document.body.contains(this.quickToolObj.linkQTBar.element)) {
            this.quickToolObj.linkQTBar.hidePopup();
        }
    };
    Link.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly) {
            this.hideLinkQuickToolbar();
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        var ismacRightClick = this.parent.userAgentData.isSafari() && args.which === 3;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.linkQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            target = this.getAnchorNode([target]);
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.linkQTBar.element.classList.contains('e-rte-pop');
            if (target.nodeName === 'A' && (target.childNodes.length > 0 && target.childNodes[0].nodeName !== 'IMG') &&
                e.args.target.nodeName !== 'IMG' &&
                !isNOU(closest(this.parent.getRange().startContainer.parentElement, 'A')) && (!isNOU(closest(this.parent.getRange().endContainer.parentElement, 'A')) || ismacRightClick)) {
                if (isPopupOpen) {
                    return;
                }
                if (e.args.ctrlKey === false) {
                    this.showLinkQuickToolbar({
                        args: args,
                        isNotify: false,
                        type: 'Links',
                        elements: [args.target]
                    });
                }
                else {
                    var selection = this.parent.formatter.editorManager.nodeSelection;
                    var range = selection.getRange(this.parent.contentModule.getDocument());
                    var args_1 = {
                        args: {
                            item: {
                                subCommand: 'OpenLink',
                                command: 'Links',
                                name: ''
                            },
                            originalEvent: e.args
                        },
                        selectNode: selection.getNodeCollection(range),
                        selectParent: selection.getParentNodeCollection(range),
                        selection: selection.save(range, this.parent.contentModule.getDocument())
                    };
                    this.parent.notify(events.openLink, args_1);
                }
            }
            else {
                this.hideLinkQuickToolbar();
            }
        }
    };
    Link.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        switch (originalEvent.action) {
            case 'escape':
                if (!isNullOrUndefined(this.dialogObj)) {
                    this.dialogObj.close();
                }
                break;
            case 'insert-link':
                this.openDialog(true, event);
                originalEvent.preventDefault();
                break;
        }
    };
    Link.prototype.openDialog = function (isInternal, event) {
        if (!isInternal) {
            this.parent.contentModule.getEditPanel().focus();
        }
        if (this.parent.editorMode === 'HTML') {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            var selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            var selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            var eventArgs = {
                args: event ? event.args : {
                    item: { command: 'Links', subCommand: 'CreateLink' },
                    originalEvent: undefined,
                    name: !isInternal ? 'showDialog' : null
                },
                selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
            };
            this.linkDialog(eventArgs);
        }
        else {
            var textArea = this.parent.contentModule.getEditPanel();
            this.parent.formatter.editorManager.markdownSelection.save(textArea.selectionStart, textArea.selectionEnd);
            this.linkDialog({
                args: {
                    item: { command: 'Links', subCommand: 'Link' },
                    originalEvent: event && event.args
                },
                member: 'link',
                text: this.parent.formatter.editorManager.markdownSelection.getSelectedText(this.parent.contentModule.getEditPanel()),
                module: 'Markdown',
                name: 'insertLink'
            });
        }
    };
    Link.prototype.showDialog = function () {
        this.openDialog(false);
        this.setCssClass({ cssClass: this.parent.getCssClass() });
    };
    Link.prototype.closeDialog = function () {
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
    };
    Link.prototype.clearDialogObj = function () {
        if (this.dialogObj) {
            this.dialogObj.destroy();
            detach(this.dialogObj.element);
            this.dialogObj = null;
        }
    };
    Link.prototype.linkDialog = function (e, inputDetails) {
        var _this = this;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
            return;
        }
        var selectText = (this.parent.editorMode === 'HTML') ?
            e.selection.getRange(this.parent.contentModule.getDocument()).toString() : e.text;
        if (!isNOU(inputDetails) && ((!isNOU(e.selectParent) && e.selectParent.length > 1) ||
            (!isNOU(e.selectNode) && e.selectNode.length > 1))) {
            inputDetails.text = selectText;
        }
        if (this.parent.editorMode === 'HTML' && (this.hasAnchorNodePresent(e.selectParent) || this.hasAnchorNodePresent(e.selectNode)) &&
            isNOU(inputDetails)) {
            this.editLink(e);
            return;
        }
        var linkWebAddress = this.i10n.getConstant('linkWebUrl');
        var linkDisplayText = this.i10n.getConstant('linkText');
        var linkTooltip = this.i10n.getConstant('linkTooltipLabel');
        var urlPlace = this.i10n.getConstant('linkurl');
        var textPlace = this.i10n.getConstant('textPlaceholder');
        var title = this.i10n.getConstant('linkTitle');
        var linkDialogEle = this.parent.createElement('div', {
            className: 'e-rte-link-dialog' + this.parent.getCssClass(true), id: this.rteID + '_rtelink'
        });
        this.parent.rootContainer.appendChild(linkDialogEle);
        var linkContent = this.parent.createElement('div', {
            className: 'e-rte-linkcontent' + this.parent.getCssClass(true), id: this.rteID + '_linkContent'
        });
        var htmlTextbox = (this.parent.editorMode === 'HTML') ? '<label>' + linkTooltip +
            '</label></div><div class="e-rte-field' + this.parent.getCssClass(true) + '">' +
            '<input type="text" data-role ="none" spellcheck="false" placeholder = "' + title + '"aria-label="' + this.i10n.getConstant('linkTitle') + '" class="e-input e-rte-linkTitle' + this.parent.getCssClass(true) + '"></div>' +
            '<div class="e-rte-label' + this.parent.getCssClass(true) + '"></div>' + '<div class="e-rte-field' + this.parent.getCssClass(true) + '">' +
            '<input type="checkbox" class="e-rte-linkTarget' + this.parent.getCssClass(true) + '"  data-role ="none"></div>' : '';
        var content = '<div class="e-rte-label' + this.parent.getCssClass(true) + '"><label>' + linkWebAddress + '</label></div>' + '<div class="e-rte-field' + this.parent.getCssClass(true) + '">' +
            '<input type="text" data-role ="none" spellcheck="false" placeholder="' + urlPlace + '"aria-label="' + this.i10n.getConstant('linkWebUrl') + '" class="e-input e-rte-linkurl' + this.parent.getCssClass(true) + '"/></div>' +
            '<div class="e-rte-label' + this.parent.getCssClass(true) + '">' + '<label>' + linkDisplayText + '</label></div><div class="e-rte-field' + this.parent.getCssClass(true) + '"> ' +
            '<input type="text" data-role ="none" spellcheck="false" class="e-input e-rte-linkText' + this.parent.getCssClass(true) + '"aria-label="' + this.i10n.getConstant('linkText') + '" placeholder="' + textPlace + '">' +
            '</div><div class="e-rte-label' + this.parent.getCssClass(true) + '">' + htmlTextbox;
        var contentElem = parseHtml(content);
        linkContent.appendChild(contentElem);
        var linkTarget = linkContent.querySelector('.e-rte-linkTarget');
        var linkUrl = linkContent.querySelector('.e-rte-linkurl');
        var linkText = linkContent.querySelector('.e-rte-linkText');
        var linkTitle = linkContent.querySelector('.e-rte-linkTitle');
        var linkOpenLabel = this.i10n.getConstant('linkOpenInNewWindow');
        this.checkBoxObj = new CheckBox({ label: linkOpenLabel, checked: true, enableRtl: this.parent.enableRtl,
            cssClass: this.parent.getCssClass() });
        this.checkBoxObj.isStringTemplate = true;
        this.checkBoxObj.createElement = this.parent.createElement;
        this.checkBoxObj.appendTo(linkTarget);
        var linkInsert = this.i10n.getConstant('dialogInsert');
        var linkCancel = this.i10n.getConstant('dialogCancel');
        var selection = e.selection;
        var selectObj = { selfLink: this, selection: e.selection, selectParent: e.selectParent, args: e.args };
        var dialogModel = {
            header: this.i10n.getConstant('linkHeader'),
            content: linkContent,
            cssClass: CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '310px',
            isModal: Browser.isDevice,
            buttons: [{
                    click: this.insertlink.bind(selectObj),
                    buttonModel: { content: linkInsert, cssClass: 'e-flat e-insertLink' + this.parent.getCssClass(true), isPrimary: true }
                },
                { click: this.cancelDialog.bind(selectObj), buttonModel: { cssClass: 'e-flat' + this.parent.getCssClass(true), content: linkCancel } }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                _this.parent.isBlur = false;
                if (event && event.event.returnValue) {
                    if (_this.parent.editorMode === 'HTML') {
                        selection.restore();
                    }
                    else {
                        _this.parent.formatter.editorManager.markdownSelection.restore(_this.parent.contentModule.getEditPanel());
                    }
                }
                if ((_this.dialogObj.element && _this.dialogObj.element.querySelector('.e-rte-linkurl') && _this.dialogObj.element.querySelector('.e-rte-linkurl') !== null)) {
                    EventHandler.remove(_this.dialogObj.element.querySelector('.e-rte-linkurl'), 'input', _this.handleKeyDown);
                }
                _this.dialogObj.destroy();
                detach(_this.dialogObj.element);
                var args = _this.dialogObj;
                _this.dialogRenderObj.close(args);
                _this.dialogObj = null;
            }
        };
        // eslint-disable-next-line
        this.dialogObj = this.dialogRenderObj.render(dialogModel);
        this.dialogObj.createElement = this.parent.createElement;
        this.dialogObj.appendTo(linkDialogEle);
        linkDialogEle.style.maxHeight = 'inherit';
        if (isNullOrUndefined(this.dialogObj)) {
            return;
        }
        if (!isNullOrUndefined(inputDetails)) {
            linkUrl.value = inputDetails.url;
            linkText.value = inputDetails.text;
            linkTitle.value = inputDetails.title;
            // eslint-disable-next-line
            (inputDetails.target) ? this.checkBoxObj.checked = true : this.checkBoxObj.checked = false;
            this.dialogObj.header = inputDetails.header;
            this.dialogObj.element.querySelector('.e-insertLink').textContent = inputDetails.btnText;
        }
        this.checkUrl(false);
        if ((this.parent.editorMode === 'HTML' && isNullOrUndefined(inputDetails) && ((!isNullOrUndefined(selectText)
            && selectText !== '') && (e.selection.range.startOffset === 0) || e.selection.range.startOffset !==
            e.selection.range.endOffset)) || e.module === 'Markdown') {
            linkText.value = selectText;
        }
        this.parent.element.ownerDocument.addEventListener('mousedown', this.mouseDown);
        if (this.quickToolObj) {
            this.hideLinkQuickToolbar();
            if (this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
                this.quickToolObj.inlineQTBar.hidePopup();
            }
            if (this.quickToolObj.textQTBar && this.parent.element.ownerDocument.body.contains(this.quickToolObj.textQTBar.element)) {
                this.quickToolObj.textQTBar.hidePopup();
            }
        }
    };
    Link.prototype.hasAnchorNodePresent = function (elements) {
        return !isNOU(elements) && elements.length > 0 &&
            elements.some(function (element) { return element && element.classList
                && element.classList.contains('e-rte-anchor'); });
    };
    // eslint-disable-next-line
    Link.prototype.insertlink = function (e) {
        var linkEle = this.selfLink.dialogObj.element;
        var linkUrl = linkEle.querySelector('.e-rte-linkurl').value.trim();
        var linkText = linkEle.querySelector('.e-rte-linkText').value;
        var linkTitle;
        if (this.selfLink.parent.editorMode === 'HTML') {
            linkTitle = linkEle.querySelector('.e-rte-linkTitle').value;
        }
        var target = (this.selfLink.checkBoxObj.checked) ? '_blank' : null;
        var linkLabel = (this.selfLink.checkBoxObj.checked) ? this.selfLink.i10n.getConstant('linkAriaLabel') : null;
        if (this.selfLink.parent.editorMode === 'Markdown' && linkUrl === '') {
            linkUrl = 'http://';
        }
        if (linkUrl === '') {
            this.selfLink.checkUrl(true);
            return;
        }
        if (this.selfLink.parent.editorMode === 'Markdown') {
            linkText = (linkText.trim() !== '') ? linkText : '';
        }
        else {
            linkText = (linkText.trim() === '') ? linkUrl : linkText;
        }
        if (!this.selfLink.isUrl(linkUrl)) {
            if (!this.selfLink.parent.enableAutoUrl) {
                linkUrl = linkUrl.indexOf('http') > -1 ? linkUrl : 'http://' + linkUrl;
            }
            else {
                // eslint-disable-next-line
                linkUrl = linkUrl;
            }
        }
        else {
            this.selfLink.checkUrl(false);
        }
        var proxy = this.selfLink;
        if (proxy.parent.editorMode === 'HTML' && isNullOrUndefined(closest(this.selection.range.startContainer.parentNode, '[id='
            // eslint-disable-next-line
            + "'" + proxy.parent.contentModule.getPanel().id + "'" + ']'))) {
            proxy.parent.contentModule.getEditPanel().focus();
            if (Browser.isIE && proxy.parent.iframeSettings.enable) {
                this.selection.restore();
            }
            var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.parent.contentModule.getDocument());
            this.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.parent.contentModule.getDocument());
            this.selectParent = proxy.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
        }
        var value = {
            url: linkUrl, text: linkText, title: linkTitle, target: target, ariaLabel: linkLabel,
            selection: this.selection, selectParent: this.selectParent
        };
        if (document.body.contains(proxy.dialogObj.element)) {
            this.selfLink.dialogObj.hide({ returnValue: false });
        }
        if (this.selfLink.dialogObj !== null) {
            return;
        }
        if (isIDevice() && proxy.parent.iframeSettings.enable) {
            select('iframe', proxy.parent.element).contentWindow.focus();
        }
        if (proxy.parent.editorMode === 'HTML') {
            this.selection.restore();
        }
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        var argsValue;
        if (!isNullOrUndefined(this.args) &&
            this.args.code === 'KeyK') {
            var originalEvent = this.args;
            extend(this.args, { item: { command: 'Links', subCommand: 'CreateLink' }, originalEvent: originalEvent }, true);
            var argsVal = {
                item: { command: 'Links', subCommand: 'CreateLink' }, originalEvent: originalEvent
            };
            argsValue = argsVal;
        }
        else {
            argsValue = this.args;
        }
        this.selfLink.parent.formatter.process(this.selfLink.parent, argsValue, (!isNullOrUndefined(this.args) &&
            this.args.originalEvent), value);
        this.selfLink.parent.contentModule.getEditPanel().focus();
    };
    Link.prototype.isUrl = function (url) {
        var regExp = RegExp;
        var regexp = new regExp('(ftp|http|https)://(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(/|/([\\w#!:.?+=&%@\\-\\/]))?', 'gi');
        return regexp.test(url);
    };
    Link.prototype.handleKeyDown = function () {
        var linkelem = this.parent.element.querySelector('#' + this.rteID + '_rtelink_dialog-content');
        var linkUrl = linkelem.querySelector('.e-rte-linkurl');
        if (linkUrl.classList.contains('e-error') && (linkUrl.value.length >= 1 && linkUrl.value.trim() !== ' ')) {
            removeClass([linkUrl], 'e-error');
        }
    };
    Link.prototype.checkUrl = function (e) {
        var linkEle = this.dialogObj.element;
        var linkUrl = linkEle.querySelector('.e-rte-linkurl');
        if (e) {
            addClass([linkUrl], 'e-error');
            linkUrl.setSelectionRange(0, linkUrl.value.length);
            linkUrl.focus();
            EventHandler.add(linkUrl, 'input', this.handleKeyDown, this);
        }
        else {
            removeClass([linkUrl], 'e-error');
            EventHandler.remove(linkUrl, 'input', this.handleKeyDown);
        }
    };
    Link.prototype.removeLink = function (e) {
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        var selectParentEle = this.getAnchorNode(e.selectParent);
        this.parent.formatter.process(this.parent, e.args, e.args, {
            selectNode: e.selectNode, selectParent: e.selectParent, selection: e.selection,
            text: selectParentEle.innerText,
            subCommand: e.args.item.subCommand
        });
        if (isIDevice() && this.parent.iframeSettings.enable) {
            select('iframe', this.parent.element).contentWindow.focus();
        }
        else {
            this.parent.contentModule.getEditPanel().focus();
        }
        this.hideLinkQuickToolbar();
    };
    Link.prototype.openLink = function (e) {
        var selectParentEle = this.getAnchorNode(e.selectParent);
        if (selectParentEle.classList.contains('e-rte-anchor') || selectParentEle.tagName === 'A') {
            var sanitizedHTML = this.parent.htmlEditorModule.sanitizeHelper(selectParentEle.outerHTML);
            var tempEle = document.createElement('div');
            tempEle.innerHTML = sanitizedHTML;
            this.parent.formatter.process(this.parent, e.args, e.args, {
                url: tempEle.firstChild.href, text: selectParentEle.innerText,
                target: selectParentEle.target === '' ? '_self' : '_blank', selectNode: e.selectNode,
                subCommand: e.args.item.subCommand
            });
            tempEle.remove();
        }
    };
    Link.prototype.getAnchorNode = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var anchorElement = closest(element, 'a');
            if (anchorElement) {
                return anchorElement;
            }
        }
        return elements[0];
    };
    Link.prototype.editLink = function (e) {
        var selectedNode = this.getAnchorNode(e.selectNode);
        var selectParentEle = this.getAnchorNode(e.selectParent);
        selectParentEle = selectedNode.nodeName === 'A' ? selectedNode : selectParentEle;
        if (selectParentEle.classList.contains('e-rte-anchor') || selectParentEle.tagName === 'A') {
            var linkUpdate = this.i10n.getConstant('dialogUpdate');
            var inputDetails = {
                url: selectParentEle.getAttribute('href'), text: selectParentEle.innerText,
                title: selectParentEle.title, target: selectParentEle.target,
                header: this.i10n.getConstant('editLink'), btnText: linkUpdate
            };
            this.linkDialog(e, inputDetails);
        }
    };
    // eslint-disable-next-line
    Link.prototype.cancelDialog = function (e) {
        this.selfLink.parent.isBlur = false;
        this.selfLink.dialogObj.hide({ returnValue: true });
        if (isIDevice()) {
            this.selection.restore();
        }
        else {
            var x = window.scrollX;
            var y = window.scrollY;
            this.selfLink.parent.contentModule.getEditPanel().focus();
            window.scrollTo(x, y);
        }
    };
    Link.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (!isNullOrUndefined(this.dialogObj) && ((
        // eslint-disable-next-line
        !closest(target, '[id=' + "'" + this.dialogObj.element.id + "'" + ']') && this.parent.toolbarSettings.enable &&
            this.parent.getToolbarElement() && !this.parent.getToolbarElement().contains(e.target)) ||
            (((this.parent.getToolbarElement() && this.parent.getToolbarElement().contains(e.target)) ||
                this.parent.inlineMode.enable && !closest(target, '#' + this.dialogObj.element.id)) &&
                !closest(target, '#' + this.parent.getID() + '_toolbar_CreateLink') &&
                !target.querySelector('#' + this.parent.getID() + '_toolbar_CreateLink')))) {
            this.parent.notify(events.documentClickClosedBy, { closedBy: 'outside click' });
            this.dialogObj.hide({ returnValue: true });
            this.parent.isBlur = true;
            dispatchEvent(this.parent.element, 'focusout');
        }
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Link.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (!isNOU(this.linkQTPopupTime)) {
            clearTimeout(this.linkQTPopupTime);
            this.linkQTPopupTime = null;
        }
        this.removeEventListener();
        this.isDestroyed = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    Link.prototype.getModuleName = function () {
        return 'link';
    };
    return Link;
}());
export { Link };
