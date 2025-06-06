import { addClass, detach, EventHandler, isNullOrUndefined, Ajax } from '@syncfusion/ej2-base';
import { Browser, closest, removeClass, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { RenderType } from '../base/enum';
import { dispatchEvent, hasClass, convertToBlob } from '../base/util';
import { isIDevice } from '../../common/util';
/**
 * `Audio` module is used to handle audio actions.
 */
var Audio = /** @class */ (function () {
    function Audio(parent, serviceLocator) {
        this.isAudioUploaded = false;
        this.isAllowedTypes = true;
        this.deletedAudio = [];
        this.parent = parent;
        this.rteID = parent.element.id;
        this.i10n = serviceLocator.getService('rteLocale');
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.docClick = this.onDocumentClick.bind(this);
        this.isDestroyed = false;
    }
    Audio.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.insertAudio, this.insertingAudio, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.showAudioDialog, this.showDialog, this);
        this.parent.on(events.closeAudioDialog, this.closeDialog, this);
        this.parent.on(events.audioToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.dropDownSelect, this.alignmentSelect, this);
        this.parent.on(events.audioDelete, this.deleteAudio, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.insertCompleted, this.showAudioQuickToolbar, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.iframeMouseDown, this.closeDialog, this);
    };
    Audio.prototype.removeEventListener = function () {
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.keyUp, this.onKeyUp);
        this.parent.off(events.insertAudio, this.insertingAudio);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.showAudioDialog, this.showDialog);
        this.parent.off(events.closeAudioDialog, this.closeDialog);
        this.parent.off(events.audioToolbarAction, this.onToolbarAction);
        this.parent.off(events.dropDownSelect, this.alignmentSelect);
        this.parent.off(events.audioDelete, this.deleteAudio);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.insertCompleted, this.showAudioQuickToolbar);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.iframeMouseDown, this.closeDialog);
        if (!isNullOrUndefined(this.contentModule)) {
            EventHandler.remove(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.touchStart);
            EventHandler.remove(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.audioClick);
            this.parent.element.ownerDocument.removeEventListener('mousedown', this.docClick);
            this.docClick = null;
        }
    };
    Audio.prototype.afterRender = function () {
        this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
        EventHandler.add(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.touchStart, this);
        EventHandler.add(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.audioClick, this);
        this.parent.element.ownerDocument.addEventListener('mousedown', this.docClick);
    };
    Audio.prototype.checkAudioBack = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === 0 &&
            !isNOU(range.startContainer.previousSibling) && this.isAudioElem(range.startContainer.previousSibling)) {
            this.deletedAudio.push(range.startContainer.previousSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset - 1]) &&
            this.isAudioElem(range.startContainer.childNodes[range.startOffset - 1])) {
            this.deletedAudio.push(range.startContainer.childNodes[range.startOffset - 1]);
        }
    };
    Audio.prototype.checkAudioDel = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === range.startContainer.textContent.length &&
            !isNOU(range.startContainer.nextSibling) && range.startContainer.nextSibling.nodeName === 'AUDIO') {
            this.deletedAudio.push(range.startContainer.nextSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset]) &&
            this.isAudioElem(range.startContainer.childNodes[range.startOffset])) {
            this.deletedAudio.push(range.startContainer.childNodes[range.startOffset]);
        }
    };
    Audio.prototype.undoStack = function (args) {
        if ((args.subCommand.toLowerCase() === 'undo' || args.subCommand.toLowerCase() === 'redo') && this.parent.editorMode === 'HTML') {
            for (var i = 0; i < this.parent.formatter.getUndoRedoStack().length; i++) {
                var temp = this.parent.createElement('div');
                var contentElem = this.parent.formatter.getUndoRedoStack()[i].text;
                temp.appendChild(contentElem.cloneNode(true));
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Audio.prototype.touchStart = function (e, ele) {
        if (this.parent.readonly) {
            return;
        }
        this.prevSelectedAudEle = this.audEle;
    };
    Audio.prototype.onToolbarAction = function (args) {
        if (isIDevice()) {
            this.parent.notify(events.selectionRestore, {});
        }
        var item = args.args.item;
        switch (item.subCommand) {
            case 'AudioReplace':
                this.parent.notify(events.insertAudio, args);
                break;
            case 'AudioRemove':
                this.parent.notify(events.audioDelete, args);
                break;
        }
    };
    // eslint-disable-next-line
    Audio.prototype.onKeyUp = function (event) {
        if (!isNOU(this.deletedAudio) && this.deletedAudio.length > 0) {
            for (var i = 0; i < this.deletedAudio.length; i++) {
                var elem = this.deletedAudio[i];
                var srcElem = elem.tagName === 'SOURCE' ? elem : elem.querySelector('source');
                var args = {
                    element: this.deletedAudio[i].querySelector('audio'),
                    src: srcElem.getAttribute('src')
                };
                this.parent.trigger(events.afterMediaDelete, args);
            }
        }
    };
    Audio.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        var range;
        var save;
        var selectNodeEle;
        var selectParentEle;
        this.deletedAudio = [];
        var isCursor;
        var keyCodeValues = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
            44, 45, 9, 16, 17, 18, 19, 20, 33, 34, 35, 36, 37, 38, 39, 40, 91, 92, 93, 144, 145, 182, 183];
        if (this.parent.editorMode === 'HTML') {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            isCursor = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
        }
        if (!isCursor && this.parent.editorMode === 'HTML' && keyCodeValues.indexOf(originalEvent.which) < 0) {
            var nodes = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            for (var i = 0; i < nodes.length; i++) {
                if (this.isAudioElem(nodes[i])) {
                    this.deletedAudio.push(nodes[i]);
                }
            }
        }
        if (this.parent.editorMode === 'HTML' && ((originalEvent.which === 8 && originalEvent.code === 'Backspace') ||
            (originalEvent.which === 46 && originalEvent.code === 'Delete'))) {
            var isCursor_1 = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
            if ((originalEvent.which === 8 && originalEvent.code === 'Backspace' && isCursor_1)) {
                this.checkAudioBack(range);
            }
            else if ((originalEvent.which === 46 && originalEvent.code === 'Delete' && isCursor_1)) {
                this.checkAudioDel(range);
            }
        }
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) &&
            originalEvent.code !== 'KeyK') {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            if (!originalEvent.ctrlKey && originalEvent.key && (originalEvent.key.length === 1 || originalEvent.action === 'enter') &&
                (this.isAudioElem(selectParentEle[0])) && selectParentEle[0].parentElement) {
                var prev = selectParentEle[0].parentElement.childNodes[0];
                this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), prev, prev, prev.textContent.length, prev.textContent.length);
                removeClass([selectParentEle[0]], classes.CLS_AUD_FOCUS);
                this.quickToolObj.audioQTBar.hidePopup();
            }
        }
        if (originalEvent.ctrlKey && (originalEvent.keyCode === 89 || originalEvent.keyCode === 90)) {
            this.undoStack({ subCommand: (originalEvent.keyCode === 90 ? 'undo' : 'redo') });
        }
        if (originalEvent.keyCode === 8 || originalEvent.keyCode === 46) {
            if (selectNodeEle && (this.isAudioElem(selectNodeEle[0]) ||
                (originalEvent.keyCode === 46 && selectNodeEle[0].nextSibling &&
                    this.isAudioElem(selectNodeEle[0].nextSibling)) ||
                (originalEvent.keyCode === 8 && selectNodeEle[0].previousSibling &&
                    this.isAudioElem(selectNodeEle[0].previousSibling))) &&
                selectNodeEle.length <= 2) {
                if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection)) {
                    save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
                }
                originalEvent.preventDefault();
                var event_1 = {
                    selectNode: selectNodeEle, selection: save, selectParent: selectParentEle,
                    args: {
                        item: { command: 'Audios', subCommand: 'AudioRemove' },
                        originalEvent: originalEvent
                    }
                };
                this.deleteAudio(event_1, originalEvent.keyCode);
            }
        }
        switch (originalEvent.action) {
            case 'escape':
                if (!isNullOrUndefined(this.dialogObj)) {
                    this.dialogObj.close();
                }
                break;
            case 'backspace':
            case 'delete':
                for (var i = 0; i < this.deletedAudio.length; i++) {
                    var src = this.deletedAudio[i].src;
                    this.audioRemovePost(src);
                }
                if (this.parent.editorMode !== 'Markdown') {
                    if (range.startContainer.nodeType === 3) {
                        if (originalEvent.code === 'Backspace') {
                            if (range.startContainer.previousElementSibling && range.startOffset === 0 &&
                                range.startContainer.previousElementSibling.classList.contains(classes.CLS_AUDIOWRAP)) {
                                detach(range.startContainer.previousElementSibling);
                            }
                        }
                        else {
                            if (range.startContainer.nextElementSibling &&
                                range.endContainer.textContent.length === range.endOffset &&
                                range.startContainer.nextElementSibling.classList.contains(classes.CLS_AUDIOWRAP)) {
                                detach(range.startContainer.nextElementSibling);
                            }
                        }
                    }
                    else if (range.startContainer.nodeType === 1 && (range.startContainer.classList &&
                        (range.startContainer.classList.contains(classes.CLS_AUDIOWRAP) ||
                            range.startContainer.classList.contains(classes.CLS_CLICKELEM) ||
                            range.startContainer.classList.contains(classes.CLS_VID_CLICK_ELEM)))) {
                        detach(range.startContainer);
                    }
                }
                break;
            case 'insert-audio':
                if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection)) {
                    save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
                }
                this.openDialog(true, originalEvent, save, selectNodeEle, selectParentEle);
                originalEvent.preventDefault();
                break;
        }
        if (originalEvent.ctrlKey && originalEvent.key === 'a') {
            this.handleSelectAll();
        }
    };
    Audio.prototype.handleSelectAll = function () {
        var audioFocusNodes = this.parent.inputElement.querySelectorAll('.' + classes.CLS_AUD_FOCUS);
        removeClass(audioFocusNodes, classes.CLS_AUD_FOCUS);
    };
    Audio.prototype.openDialog = function (isInternal, event, selection, ele, parentEle) {
        var range;
        var save;
        var selectNodeEle;
        var selectParentEle;
        if (!isInternal && !isNOU(this.parent.formatter.editorManager.nodeSelection)) {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
        }
        else {
            save = selection;
            selectNodeEle = ele;
            selectParentEle = parentEle;
        }
        if (this.parent.editorMode === 'HTML') {
            this.insertAudio({
                args: {
                    item: { command: 'Audios', subCommand: 'Audio' },
                    originalEvent: event,
                    name: !isInternal ? 'showDialog' : null
                },
                selectNode: selectNodeEle,
                selection: save,
                selectParent: selectParentEle
            });
        }
    };
    Audio.prototype.showDialog = function (args) {
        if (!isNOU(args.originalEvent)) {
            this.openDialog(false, args.originalEvent);
        }
        else {
            this.openDialog(false);
        }
    };
    Audio.prototype.closeDialog = function () {
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
    };
    Audio.prototype.deleteAudio = function (e, keyCode) {
        if (!this.isAudioElem(e.selectNode[0])) {
            return;
        }
        if (this.audEle) {
            if (e.selectNode[0].nodeType === 3) {
                e.selectNode[0] = this.audEle;
            }
            else if (this.isAudioElem(e.selectNode[0])) {
                e.selectNode[0] = e.selectNode[0].classList.contains(classes.CLS_AUDIOWRAP) ? e.selectNode[0] :
                    e.selectNode[0].parentElement;
            }
        }
        var args = {
            element: e.selectNode[0].querySelector('audio'),
            src: e.selectNode[0].querySelector('source').getAttribute('src')
        };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        e.selection.restore();
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, {
            selectNode: e.selectNode,
            subCommand: e.args.item.subCommand
        });
        this.audioRemovePost(args.src);
        if (this.quickToolObj && document.body.contains(this.quickToolObj.audioQTBar.element)) {
            this.quickToolObj.audioQTBar.hidePopup();
        }
        if (isNullOrUndefined(keyCode)) {
            this.parent.trigger(events.afterMediaDelete, args);
        }
    };
    Audio.prototype.audioRemovePost = function (src) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var absoluteUrl = '';
        if (isNOU(this.parent.insertAudioSettings.removeUrl) || this.parent.insertAudioSettings.removeUrl === '') {
            return;
        }
        if (src.indexOf('http://') > -1 || src.indexOf('https://') > -1) {
            absoluteUrl = src;
        }
        else {
            absoluteUrl = new URL(src, document.baseURI).href;
        }
        this.removingAudioName = absoluteUrl.replace(/^.*[\\/]/, '');
        var xhr = new XMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/tslint/config
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200) {
                proxy.triggerPost(this.response);
            }
        });
        xhr.open('GET', absoluteUrl);
        xhr.responseType = 'blob';
        xhr.send();
    };
    Audio.prototype.triggerPost = function (response) {
        var removeUrl = this.parent.insertAudioSettings.removeUrl;
        if (isNOU(removeUrl) || removeUrl === '') {
            return;
        }
        var file = new File([response], this.removingAudioName);
        var ajax = new Ajax(removeUrl, 'POST', true, null);
        var formData = new FormData();
        formData.append('UploadFiles', file);
        ajax.send(formData);
    };
    Audio.prototype.audioClick = function (e) {
        if (Browser.isDevice) {
            if (this.isAudioElem(e.target)) {
                this.contentModule.getEditPanel().setAttribute('contenteditable', 'false');
                e.target.focus();
            }
            else {
                if (!this.parent.readonly) {
                    this.contentModule.getEditPanel().setAttribute('contenteditable', 'true');
                }
            }
        }
        if (this.isAudioElem(e.target) && !this.parent.userAgentData.isSafari()) {
            this.audEle = e.target.querySelector('audio');
            e.preventDefault();
        }
    };
    Audio.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (isNOU(this.contentModule.getEditPanel())) {
            return;
        }
        if (this.isAudioElem(target)) {
            this.audEle = target.querySelector('audio');
        }
        if (!isNullOrUndefined(this.dialogObj) && ((
        // eslint-disable-next-line
        !closest(target, '[id=' + "'" + this.dialogObj.element.id + "'" + ']') && this.parent.toolbarSettings.enable && this.parent.getToolbarElement() &&
            !this.parent.getToolbarElement().contains(e.target)) ||
            (this.parent.getToolbarElement() && this.parent.getToolbarElement().contains(e.target) &&
                !closest(target, '#' + this.parent.getID() + '_toolbar_Audio') &&
                !target.querySelector('#' + this.parent.getID() + '_toolbar_Audio')))) {
            /* eslint-disable */
            if (e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight) {
            }
            else {
                this.parent.notify(events.documentClickClosedBy, { closedBy: "outside click" });
                this.dialogObj.hide({ returnValue: true });
                this.parent.isBlur = true;
                dispatchEvent(this.parent.element, 'focusout');
            }
            /* eslint-enable */
        }
        if (this.contentModule.getEditPanel().querySelector('.' + classes.CLS_AUD_FOCUS)) {
            if (!this.isAudioElem(e.target) && !isNOU(this.audEle)) {
                this.audEle.style.outline = '';
            }
            else if (!isNOU(this.prevSelectedAudEle) && this.prevSelectedAudEle !== target) {
                this.prevSelectedAudEle.style.outline = '';
            }
        }
        if (this.parent.inlineMode.enable && target && this.dialogObj && !closest(target, '#' + this.dialogObj.element.id)) {
            this.dialogObj.hide();
        }
    };
    Audio.prototype.alignmentSelect = function (e) {
        var item = e.item;
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Audios') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
        if (this.audEle) {
            selectNodeEle = [this.audEle];
        }
        var args = { args: e, selectNode: selectNodeEle };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        switch (item.subCommand) {
            case 'Inline':
                this.inline(args);
                break;
            case 'Break':
                this.break(args);
                break;
        }
        if (this.quickToolObj && document.body.contains(this.quickToolObj.audioQTBar.element)) {
            this.quickToolObj.audioQTBar.hidePopup();
            removeClass([selectNodeEle[0]], classes.CLS_AUD_FOCUS);
        }
    };
    Audio.prototype.break = function (e) {
        if (e.selectNode[0].nodeName !== 'AUDIO') {
            return;
        }
        var subCommand = (e.args.item && e.args.item.subCommand) ?
            e.args.item.subCommand : 'Break';
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Audio.prototype.inline = function (e) {
        if (e.selectNode[0].nodeName !== 'AUDIO') {
            return;
        }
        var subCommand = (e.args.item && e.args.item.subCommand) ?
            e.args.item.subCommand : 'Inline';
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Audio.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly) {
            this.hideAudioQuickToolbar();
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            if ((showOnRightClick && args.which === 1) && !isNullOrUndefined(args.target) &&
                this.isAudioElem(args.target)) {
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), args.target);
            }
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.audioQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.audioQTBar.element.classList.contains('e-rte-pop');
            if (this.isAudioElem(target) && this.parent.quickToolbarModule) {
                if (isPopupOpen) {
                    return;
                }
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), target);
                if (isIDevice()) {
                    this.parent.notify(events.selectionSave, e);
                }
                if (target.querySelector('audio')) {
                    target.querySelector('audio').style.outline = '2px solid #4a90e2';
                }
                this.showAudioQuickToolbar({ args: args, type: 'Audios', elements: [args.target] });
            }
            else {
                this.hideAudioQuickToolbar();
            }
        }
    };
    Audio.prototype.isAudioElem = function (target) {
        if (target && target.nodeType !== 3 && target.nodeName !== 'BR' && (target.classList &&
            (target.classList.contains(classes.CLS_AUDIOWRAP) || target.classList.contains('e-rte-audio') || target.classList.contains(classes.CLS_CLICKELEM)))) {
            return true;
        }
        else {
            return false;
        }
    };
    Audio.prototype.showAudioQuickToolbar = function (e) {
        var _this = this;
        if (e.type !== 'Audios' || isNullOrUndefined(this.parent.quickToolbarModule)
            || isNullOrUndefined(this.parent.quickToolbarModule.audioQTBar) || isNullOrUndefined(e.args)) {
            return;
        }
        this.quickToolObj = this.parent.quickToolbarModule;
        var args = e.args;
        var target = e.elements;
        [].forEach.call(e.elements, function (element, index) {
            if (index === 0) {
                target = element;
            }
        });
        if (this.isAudioElem(target)) {
            var audioElem = target.tagName === 'AUDIO' ? target : target.querySelector('audio');
            addClass([audioElem], [classes.CLS_AUD_FOCUS]);
            audioElem.style.outline = '2px solid #4a90e2';
        }
        if (this.parent.quickToolbarModule.audioQTBar) {
            if (e.isNotify) {
                this.showPopupTime = setTimeout(function () {
                    _this.parent.formatter.editorManager.nodeSelection.Clear(_this.contentModule.getDocument());
                    _this.parent.formatter.editorManager.nodeSelection.setSelectionContents(_this.contentModule.getDocument(), target);
                    _this.quickToolObj.audioQTBar.showPopup(args.pageX - 50, target.getBoundingClientRect().top + 34, target);
                }, 400);
            }
            else {
                this.quickToolObj.audioQTBar.showPopup(args.pageX - 50, target.getBoundingClientRect().top + 34, target);
            }
        }
    };
    Audio.prototype.hideAudioQuickToolbar = function () {
        if (!isNullOrUndefined(this.contentModule.getEditPanel().querySelector('.' + classes.CLS_AUD_FOCUS))) {
            removeClass([this.contentModule.getEditPanel().querySelector('.' + classes.CLS_AUD_FOCUS)], classes.CLS_AUD_FOCUS);
            if (!isNOU(this.audEle)) {
                this.audEle.style.outline = '';
            }
            if (this.quickToolObj && this.quickToolObj.audioQTBar && document.body.contains(this.quickToolObj.audioQTBar.element)) {
                this.quickToolObj.audioQTBar.hidePopup();
            }
        }
    };
    Audio.prototype.insertingAudio = function (e) {
        this.insertAudio(e);
        if (!isNullOrUndefined(this.dialogObj)) {
            this.dialogObj.element.style.maxHeight = 'inherit';
            var dialogContent = this.dialogObj.element.querySelector('.e-audio-content');
            if (!isNullOrUndefined(this.parent.insertAudioSettings.path) || this.parent.editorMode === 'HTML') {
                document.getElementById(this.rteID + '_insertAudio').focus();
            }
            else {
                dialogContent.querySelector('.e-audio-url').focus();
            }
        }
    };
    Audio.prototype.clearDialogObj = function () {
        if (this.uploadObj && !this.uploadObj.isDestroyed) {
            this.uploadObj.destroy();
            detach(this.uploadObj.element);
            this.uploadObj = null;
        }
        if (this.button && !this.button.isDestroyed) {
            this.button.destroy();
            detach(this.button.element);
            this.button = null;
        }
        if (this.dialogObj && !this.dialogObj.isDestroyed) {
            this.dialogObj.destroy();
            detach(this.dialogObj.element);
            this.dialogObj = null;
        }
    };
    Audio.prototype.insertAudio = function (e) {
        var _this = this;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
            return;
        }
        var audioDialog = this.parent.createElement('div', { className: 'e-rte-audio-dialog', id: this.rteID + '_audio' });
        this.parent.rootContainer.appendChild(audioDialog);
        var audioInsert = this.i10n.getConstant('dialogInsert');
        var audiolinkCancel = this.i10n.getConstant('dialogCancel');
        var audioHeader = this.i10n.getConstant('audioHeader');
        var selection = e.selection;
        var selectObj = { selfAudio: this, selection: e.selection, args: e.args, selectParent: e.selectParent };
        var dialogModel = {
            header: audioHeader,
            cssClass: classes.CLS_RTE_ELEMENTS,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px',
            isModal: Browser.isDevice,
            buttons: [{
                    click: this.insertAudioUrl.bind(selectObj),
                    buttonModel: { content: audioInsert, cssClass: 'e-flat e-insertAudio', isPrimary: true, disabled: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel', content: audiolinkCancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                if (_this.isAudioUploaded) {
                    if (_this.dialogObj.element.querySelector('.e-file-abort-btn')) {
                        _this.dialogObj.element.querySelector('.e-file-abort-btn').click();
                    }
                    else {
                        _this.uploadObj.remove();
                    }
                }
                _this.parent.isBlur = false;
                if (event && !isNOU(event.event) && event.event.returnValue) {
                    if (_this.parent.editorMode === 'HTML') {
                        selection.restore();
                    }
                }
                _this.clearDialogObj();
                _this.dialogRenderObj.close(event);
            }
        };
        var dialogContent = this.parent.createElement('div', { className: 'e-audio-content' });
        if (!isNullOrUndefined(this.parent.insertAudioSettings.path) || this.parent.editorMode === 'HTML') {
            dialogContent.appendChild(this.audioUpload(e));
        }
        var linkHeader = this.parent.createElement('div', { className: 'e-audioheader' });
        var linkHeaderText = this.i10n.getConstant('audioLinkHeader');
        if (this.parent.editorMode === 'HTML') {
            linkHeader.innerHTML = linkHeaderText;
        }
        dialogContent.appendChild(linkHeader);
        dialogContent.appendChild(this.audioUrlPopup(e));
        if (e.selectNode && e.selectNode[0].nodeType === 1 && this.isAudioElem(e.selectNode[0])) {
            dialogModel.header = this.parent.localeObj.getConstant('editAudioHeader');
            dialogModel.content = dialogContent;
        }
        else {
            dialogModel.content = dialogContent;
        }
        this.dialogObj = this.dialogRenderObj.render(dialogModel);
        this.dialogObj.createElement = this.parent.createElement;
        this.dialogObj.appendTo(audioDialog);
        if (e.selectNode && e.selectNode[0].nodeType === 1 && this.isAudioElem(e.selectNode[0]) && (e.name === 'insertAudio')) {
            this.dialogObj.element.querySelector('.e-insertAudio').textContent = this.parent.localeObj.getConstant('dialogUpdate');
        }
        audioDialog.style.maxHeight = 'inherit';
        if (this.quickToolObj) {
            if (this.quickToolObj.audioQTBar && document.body.contains(this.quickToolObj.audioQTBar.element)) {
                this.quickToolObj.audioQTBar.hidePopup();
            }
            if (this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
                this.quickToolObj.inlineQTBar.hidePopup();
            }
            if (this.quickToolObj.textQTBar && this.parent.element.ownerDocument.body.contains(this.quickToolObj.textQTBar.element)) {
                this.quickToolObj.textQTBar.hidePopup();
            }
        }
    };
    Audio.prototype.audioUrlPopup = function (e) {
        var _this = this;
        var audioUrl = this.parent.createElement('div', { className: 'audioUrl' });
        var placeUrl = this.i10n.getConstant('audioUrl');
        this.inputUrl = this.parent.createElement('input', {
            className: 'e-input e-audio-url',
            attrs: { placeholder: placeUrl, spellcheck: 'false', 'aria-label': this.i10n.getConstant('audioLinkHeader') }
        });
        this.inputUrl.addEventListener('input', function () {
            if (!isNOU(_this.inputUrl)) {
                if (_this.inputUrl.value.length === 0) {
                    _this.dialogObj.getButtons(0).element.disabled = true;
                }
                else {
                    _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                }
            }
        });
        if (e.selectNode && this.isAudioElem(e.selectNode[0])) {
            var regex = new RegExp(/([^\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi);
            var sourceElement = e.selectNode[0].querySelector('source');
            this.inputUrl.value = sourceElement.src.match(regex) ? sourceElement.src : '';
        }
        audioUrl.appendChild(this.inputUrl);
        return audioUrl;
    };
    Audio.prototype.audioUpload = function (e) {
        var _this = this;
        var save;
        var selectParent;
        // eslint-disable-next-line
        var proxy = this;
        var iframe = proxy.parent.iframeSettings.enable;
        if (proxy.parent.editorMode === 'HTML' && (!iframe && isNullOrUndefined(closest(e.selection.range.startContainer.parentNode, '[id='
            // eslint-disable-next-line
            + "'" + this.parent.contentModule.getPanel().id + "'" + ']'))
            || (iframe && !hasClass(e.selection.range.startContainer.parentNode.ownerDocument.querySelector('body'), 'e-lib')))) {
            this.contentModule.getEditPanel().focus();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            selectParent = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
        }
        else {
            save = e.selection;
            selectParent = e.selectParent;
        }
        var uploadParentEle = this.parent.createElement('div', { className: 'e-aud-uploadwrap e-droparea' });
        var deviceAudioUpMsg = this.i10n.getConstant('audioDeviceUploadMessage');
        var audioUpMsg = this.i10n.getConstant('audioUploadMessage');
        var span = this.parent.createElement('span', { className: 'e-droptext' });
        var spanMsg = this.parent.createElement('span', {
            className: 'e-rte-upload-text', innerHTML: ((Browser.isDevice) ? deviceAudioUpMsg : audioUpMsg)
        });
        span.appendChild(spanMsg);
        var btnEle = this.parent.createElement('button', {
            className: 'e-browsebtn', id: this.rteID + '_insertAudio', attrs: { autofocus: 'true', type: 'button' }
        });
        span.appendChild(btnEle);
        uploadParentEle.appendChild(span);
        var browserMsg = this.i10n.getConstant('browse');
        this.button = new Button({ content: browserMsg, enableRtl: this.parent.enableRtl });
        this.button.isStringTemplate = true;
        this.button.createElement = this.parent.createElement;
        this.button.appendTo(btnEle);
        var btnClick = (Browser.isDevice) ? span : btnEle;
        EventHandler.add(btnClick, 'click', this.fileSelect, this);
        var uploadEle = this.parent.createElement('input', {
            id: this.rteID + '_upload', attrs: { type: 'File', name: 'UploadFiles' }
        });
        uploadParentEle.appendChild(uploadEle);
        var fileName;
        var selectArgs;
        var filesData;
        this.uploadObj = new Uploader({
            asyncSettings: { saveUrl: this.parent.insertAudioSettings.saveUrl, removeUrl: this.parent.insertAudioSettings.removeUrl },
            dropArea: span, multiple: false, enableRtl: this.parent.enableRtl,
            allowedExtensions: this.parent.insertAudioSettings.allowedTypes.toString(),
            selected: function (e) {
                proxy.isAudioUploaded = true;
                selectArgs = e;
                // eslint-disable-next-line
                filesData = e.filesData;
                _this.parent.trigger(events.fileSelected, selectArgs, function (selectArgs) {
                    if (!selectArgs.cancel) {
                        if (isNOU(selectArgs.filesData[0])) {
                            return;
                        }
                        _this.checkExtension(selectArgs.filesData[0]);
                        fileName = selectArgs.filesData[0].name;
                        if (_this.parent.editorMode === 'HTML' && isNullOrUndefined(_this.parent.insertAudioSettings.path)) {
                            var reader_1 = new FileReader();
                            // eslint-disable-next-line
                            reader_1.addEventListener('load', function (e) {
                                var url = _this.parent.insertAudioSettings.saveFormat === 'Base64' ? reader_1.result :
                                    URL.createObjectURL(convertToBlob(reader_1.result));
                                proxy.uploadUrl = {
                                    url: url, selection: save, fileName: fileName,
                                    selectParent: selectParent
                                };
                                proxy.inputUrl.setAttribute('disabled', 'true');
                                if (isNullOrUndefined(proxy.parent.insertAudioSettings.saveUrl) && _this.isAllowedTypes
                                    && !isNullOrUndefined(_this.dialogObj)) {
                                    _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                                }
                            });
                            reader_1.readAsDataURL(selectArgs.filesData[0].rawFile);
                        }
                    }
                });
            },
            beforeUpload: function (args) {
                _this.parent.trigger(events.beforeFileUpload, args);
            },
            uploading: function (e) {
                if (!_this.parent.isServerRendered) {
                    _this.parent.trigger(events.fileUploading, e);
                }
            },
            success: function (e) {
                _this.parent.trigger(events.fileUploadSuccess, e, function (e) {
                    if (!isNullOrUndefined(_this.parent.insertAudioSettings.path)) {
                        var url = _this.parent.insertAudioSettings.path + e.file.name;
                        // eslint-disable-next-line
                        var value = { url: url, selection: save };
                        proxy.uploadUrl = {
                            url: url, selection: save, fileName: fileName, selectParent: selectParent
                        };
                        proxy.inputUrl.setAttribute('disabled', 'true');
                    }
                    if (e.operation === 'upload' && !isNullOrUndefined(_this.dialogObj)) {
                        _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                    }
                });
            },
            failure: function (e) {
                _this.parent.trigger(events.fileUploadFailed, e);
            },
            removing: function () {
                // eslint-disable-next-line
                _this.parent.trigger(events.fileRemoving, e, function (e) {
                    proxy.isAudioUploaded = false;
                    _this.dialogObj.getButtons(0).element.disabled = true;
                    proxy.inputUrl.removeAttribute('disabled');
                    if (proxy.uploadUrl) {
                        proxy.uploadUrl.url = '';
                    }
                });
            }
        });
        this.uploadObj.isStringTemplate = true;
        this.uploadObj.createElement = this.parent.createElement;
        this.uploadObj.appendTo(uploadEle);
        return uploadParentEle;
    };
    Audio.prototype.checkExtension = function (e) {
        if (this.uploadObj.allowedExtensions) {
            if (this.uploadObj.allowedExtensions.toLocaleLowerCase().indexOf(('.' + e.type).toLocaleLowerCase()) === -1) {
                this.dialogObj.getButtons(0).element.setAttribute('disabled', 'disabled');
                this.isAllowedTypes = false;
            }
            else {
                this.isAllowedTypes = true;
            }
        }
    };
    Audio.prototype.fileSelect = function () {
        this.dialogObj.element.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    // eslint-disable-next-line
    Audio.prototype.cancelDialog = function (e) {
        this.parent.isBlur = false;
        this.dialogObj.hide({ returnValue: true });
        if (this.isAudioUploaded) {
            this.uploadObj.removing();
        }
    };
    // eslint-disable-next-line
    Audio.prototype.insertAudioUrl = function (e) {
        var proxy = this.selfAudio;
        //let audioSelectParent: Node = proxy.uploadUrl.selectParent[0];
        proxy.isAudioUploaded = false;
        var url = proxy.inputUrl.value;
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        if (!isNullOrUndefined(proxy.uploadUrl) && proxy.uploadUrl.url !== '') {
            proxy.uploadUrl.cssClass = (proxy.parent.insertAudioSettings.layoutOption === 'Inline' ?
                classes.CLS_AUDIOINLINE : classes.CLS_AUDIOBREAK);
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, proxy.uploadUrl);
            proxy.uploadUrl.url = '';
        }
        else if (url !== '') {
            if (proxy.parent.editorMode === 'HTML' && isNullOrUndefined(closest(
            // eslint-disable-next-line
            this.selection.range.startContainer.parentNode, '[id=' + "'" + proxy.contentModule.getPanel().id + "'" + ']')) && !(proxy.parent.iframeSettings.enable)) {
                proxy.contentModule.getEditPanel().focus();
                var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.contentModule.getDocument());
                this.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.contentModule.getDocument());
                this.selectParent = proxy.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            }
            var name_1 = proxy.parent.editorMode === 'HTML' ? url.split('/')[url.split('/').length - 1] : '';
            var value = {
                cssClass: (proxy.parent.insertAudioSettings.layoutOption === 'Inline' ? classes.CLS_AUDIOINLINE : classes.CLS_AUDIOBREAK),
                url: url, selection: this.selection, fileName: name_1,
                selectParent: this.selectParent
            };
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, value);
        }
    };
    /* eslint-disable */
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    /* eslint-enable */
    Audio.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.prevSelectedAudEle = undefined;
        if (this.showPopupTime) {
            clearTimeout(this.showPopupTime);
            this.showPopupTime = null;
        }
        this.removeEventListener();
        this.clearDialogObj();
        this.isDestroyed = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    Audio.prototype.getModuleName = function () {
        return 'audio';
    };
    return Audio;
}());
export { Audio };
