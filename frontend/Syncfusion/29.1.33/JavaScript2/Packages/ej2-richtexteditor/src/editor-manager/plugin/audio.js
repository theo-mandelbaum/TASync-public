import { createElement, isNullOrUndefined as isNOU, detach, addClass, Browser } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import * as classes from './../base/classes';
import { InsertHtml } from './inserthtml';
import * as EVENTS from './../../common/constant';
import { scrollToCursor } from '../../common/util';
/**
 * Audio internal component
 *
 * @hidden
 * @deprecated
 */
var AudioCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Audio plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function AudioCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    AudioCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.AUDIO, this.audioCommand, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    AudioCommand.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.AUDIO, this.audioCommand);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    /**
     * audioCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    AudioCommand.prototype.audioCommand = function (e) {
        var selectNode;
        var audiowrapper;
        var value = e.value.toString().toLowerCase();
        if (value === 'inline' || value === 'break' || value === 'audioremove') {
            selectNode = e.item.selectNode[0];
            audiowrapper = selectNode.closest('.' + classes.CLASS_AUDIO_WRAP);
        }
        switch (value) {
            case 'audio':
            case 'audioreplace':
                this.createAudio(e);
                break;
            case 'inline':
                selectNode.removeAttribute('class');
                audiowrapper.style.display = 'inline-block';
                addClass([selectNode], [classes.CLASS_AUDIO, classes.CLASS_AUDIO_INLINE, classes.CLASS_AUDIO_FOCUS]);
                this.callBack(e);
                break;
            case 'break':
                selectNode.removeAttribute('class');
                audiowrapper.style.display = 'block';
                addClass([selectNode], [classes.CLASS_AUDIO_BREAK, classes.CLASS_AUDIO, classes.CLASS_AUDIO_FOCUS]);
                this.callBack(e);
                break;
            case 'audioremove':
                if (audiowrapper) {
                    detach(audiowrapper);
                }
                else {
                    detach(selectNode);
                }
                this.callBack(e);
                break;
        }
    };
    AudioCommand.prototype.createAudio = function (e) {
        var _this = this;
        var isReplaced = false;
        var wrapElement;
        if (!isNOU(e.item.selectParent) && e.item.selectParent[0].classList &&
            (e.item.selectParent[0].classList.contains(classes.CLASS_CLICK_ELEM) ||
                e.item.selectParent[0].classList.contains(classes.CLASS_AUDIO_WRAP) || e.item.selectParent[0].tagName === 'AUDIO')) {
            var audioEle = e.item.selectParent[0].querySelector('source');
            this.setStyle(audioEle, e);
            isReplaced = true;
        }
        else {
            wrapElement = createElement('span', { className: classes.CLASS_AUDIO_WRAP, attrs: { contentEditable: 'false', title: ((!isNOU(e.item.title)) ? e.item.title : (!isNOU(e.item.fileName) ? e.item.fileName : '')) } });
            var audElement = createElement('audio', { className: classes.CLASS_AUDIO + ' ' + classes.CLASS_AUDIO_INLINE, attrs: { controls: '' } });
            var sourceElement = createElement('source');
            var clickElement = createElement('span', { className: classes.CLASS_CLICK_ELEM });
            this.setStyle(sourceElement, e);
            audElement.appendChild(sourceElement);
            clickElement.appendChild(audElement);
            wrapElement.appendChild(clickElement);
            if (!isNOU(e.item.selection)) {
                e.item.selection.restore();
            }
            InsertHtml.Insert(this.parent.currentDocument, wrapElement, this.parent.editableElement);
            if (!isNOU(e.item.selection)) {
                var range = e.item.selection.getRange(this.parent.currentDocument);
                var focusNode = document.createTextNode(' ');
                var node = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)[0];
                wrapElement.parentNode.insertBefore(focusNode, node.nextSibling);
                var save = e.item.selection.save(range, this.parent.currentDocument);
            }
        }
        if (e.callBack && (isNOU(e.selector) || !isNOU(e.selector) && e.selector !== 'pasteCleanupModule')) {
            var selectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)[0];
            var audioElm_1 = (e.value === 'AudioReplace' || isReplaced) ? ((e.item.selectParent[0].tagName.toLowerCase() === 'audio') ? e.item.selectParent[0] : e.item.selectParent[0].querySelector('audio'))
                : (Browser.isIE ? selectedNode : selectedNode.querySelector('audio'));
            audioElm_1.addEventListener('loadeddata', function () {
                if (e.value !== 'AudioReplace' || !isReplaced) {
                    if (!isNOU(_this.parent.currentDocument)) {
                        if (_this.parent.userAgentData.isSafari()) {
                            scrollToCursor(_this.parent.currentDocument, _this.parent.editableElement);
                        }
                        e.callBack({
                            requestType: 'Audios',
                            editorMode: 'HTML',
                            event: e.event,
                            range: _this.parent.nodeSelection.getRange(_this.parent.currentDocument),
                            elements: [audioElm_1]
                        });
                    }
                }
            });
            if (isReplaced) {
                audioElm_1.load();
            }
        }
    };
    AudioCommand.prototype.setStyle = function (sourceElement, e) {
        if (!isNOU(e.item.url)) {
            sourceElement.setAttribute('src', e.item.url);
        }
        var fileExtension = e.item.fileName ? e.item.fileName.split('.').pop().toLowerCase() :
            e.item.url ? e.item.url.split('.').pop().toLowerCase() : '';
        if (fileExtension === 'opus') {
            sourceElement.type = 'audio/ogg';
        }
        else if (fileExtension === 'm4a') {
            sourceElement.type = 'audio/mp4';
        }
        else {
            sourceElement.type = e.item.fileName && e.item.fileName.split('.').length > 0 ?
                'audio/' + e.item.fileName.split('.')[e.item.fileName.split('.').length - 1] :
                e.item.url && e.item.url.split('.').length > 0 ? 'audio/' + e.item.url.split('.')[e.item.url.split('.').length - 1] : '';
        }
    };
    AudioCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    AudioCommand.prototype.destroy = function () {
        this.removeEventListener();
    };
    return AudioCommand;
}());
export { AudioCommand };
