import { debounce, isNullOrUndefined, detach } from '@syncfusion/ej2-base';
import { NodeSelection } from './../../selection/selection';
import * as EVENTS from './../../common/constant';
import { isIDevice, scrollToCursor, setEditFrameFocus } from '../../common/util';
/**
 * `Undo` module is used to handle undo actions.
 */
var UndoRedoManager = /** @class */ (function () {
    function UndoRedoManager(parent, options) {
        this.undoRedoStack = [];
        this.parent = parent;
        this.undoRedoSteps = !isNullOrUndefined(options) ? options.undoRedoSteps : 30;
        this.undoRedoTimer = !isNullOrUndefined(options) ? options.undoRedoTimer : 300;
        this.addEventListener();
    }
    UndoRedoManager.prototype.addEventListener = function () {
        this.debounceListener = debounce(this.keyUp, this.undoRedoTimer);
        this.parent.observer.on(EVENTS.KEY_UP_HANDLER, this.debounceListener, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.keyDown, this);
        this.parent.observer.on(EVENTS.ACTION, this.onAction, this);
        this.parent.observer.on(EVENTS.MODEL_CHANGED_PLUGIN, this.onPropertyChanged, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    UndoRedoManager.prototype.onPropertyChanged = function (props) {
        for (var _i = 0, _a = Object.keys(props.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'undoRedoSteps':
                    this.undoRedoSteps = props.newProp.undoRedoSteps;
                    break;
                case 'undoRedoTimer':
                    this.undoRedoTimer = props.newProp.undoRedoTimer;
                    break;
            }
        }
    };
    UndoRedoManager.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.KEY_UP_HANDLER, this.keyUp);
        this.parent.observer.off(EVENTS.KEY_DOWN_HANDLER, this.keyDown);
        this.parent.observer.off(EVENTS.ACTION, this.onAction);
        this.parent.observer.off(EVENTS.MODEL_CHANGED_PLUGIN, this.onPropertyChanged);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
        this.debounceListener = null;
    };
    /**
     * onAction method
     *
     * @param {IHtmlSubCommands} e - specifies the sub command
     * @returns {void}
     * @hidden
     * @deprecated
     */
    UndoRedoManager.prototype.onAction = function (e) {
        if (e.subCommand === 'Undo') {
            this.undo(e);
        }
        else {
            this.redo(e);
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
    UndoRedoManager.prototype.destroy = function () {
        this.removeEventListener();
        this.element = null;
        this.steps = null;
        this.undoRedoStack = [];
        this.undoRedoSteps = null;
        this.undoRedoTimer = null;
    };
    UndoRedoManager.prototype.keyDown = function (e) {
        var event = e.event;
        // eslint-disable-next-line
        var proxy = this;
        switch (event.action) {
            case 'undo':
                event.preventDefault();
                proxy.undo(e);
                break;
            case 'redo':
                event.preventDefault();
                proxy.redo(e);
                break;
        }
    };
    UndoRedoManager.prototype.keyUp = function (e) {
        if (e.event.keyCode !== 17 && !e.event.ctrlKey) {
            this.saveData(e);
        }
    };
    UndoRedoManager.prototype.getTextContentFromFragment = function (fragment) {
        var textContent = '';
        for (var i = 0; i < fragment.childNodes.length; i++) {
            var childNode = fragment.childNodes[i];
            if (childNode.nodeType === Node.TEXT_NODE) {
                textContent += childNode.textContent;
            }
            else if (childNode.nodeType === Node.ELEMENT_NODE) {
                textContent += this.getTextContentFromFragment(childNode);
            }
        }
        return textContent;
    };
    UndoRedoManager.prototype.isElementStructureEqual = function (previousFragment, currentFragment) {
        if (previousFragment.childNodes.length !== currentFragment.childNodes.length) {
            return false;
        }
        for (var i = 0; i < previousFragment.childNodes.length; i++) {
            var previousFragmentNode = previousFragment.childNodes[i];
            var currentFragmentNode = currentFragment.childNodes[i];
            if (!previousFragmentNode || !currentFragmentNode) {
                return false;
            }
            if (previousFragmentNode.nodeType !== currentFragmentNode.nodeType) {
                return false;
            }
            if (previousFragmentNode.outerHTML !== currentFragmentNode.outerHTML) {
                return false;
            }
        }
        return true;
    };
    /**
     * RTE collection stored html format.
     *
     * @function saveData
     * @param {KeyboardEvent} e - specifies the keyboard event
     * @returns {void}
     * @hidden
     * @deprecated
     */
    UndoRedoManager.prototype.saveData = function (e) {
        if (!this.parent.currentDocument) {
            return;
        }
        var range = new NodeSelection(this.parent.editableElement).getRange(this.parent.currentDocument);
        var currentContainer = this.parent.editableElement === range.startContainer.parentElement ?
            range.startContainer.parentElement : range.startContainer;
        for (var i = currentContainer.childNodes.length - 1; i >= 0; i--) {
            if (!isNullOrUndefined(currentContainer.childNodes[i]) && currentContainer.childNodes[i].nodeName === '#text' &&
                currentContainer.childNodes[i].textContent.length === 0 && currentContainer.childNodes[i].nodeName !== 'IMG' &&
                currentContainer.childNodes[i].nodeName !== 'BR' && currentContainer.childNodes[i].nodeName && 'HR') {
                detach(currentContainer.childNodes[i]);
            }
        }
        range = new NodeSelection(this.parent.editableElement).getRange(this.parent.currentDocument);
        var save = new NodeSelection(this.parent.editableElement).save(range, this.parent.currentDocument);
        var clonedElement = this.parent.editableElement.cloneNode(true);
        var fragment = document.createDocumentFragment();
        while (clonedElement.firstChild) {
            fragment.appendChild(clonedElement.firstChild);
        }
        var changEle = { text: fragment, range: save };
        if (this.undoRedoStack.length >= this.steps) {
            this.undoRedoStack = this.undoRedoStack.slice(0, this.steps + 1);
        }
        if (this.undoRedoStack.length > 1 && (this.undoRedoStack[this.undoRedoStack.length - 1].range.range.collapsed === range.collapsed)
            && (this.undoRedoStack[this.undoRedoStack.length - 1].range.startOffset === save.range.startOffset) &&
            (this.undoRedoStack[this.undoRedoStack.length - 1].range.endOffset === save.range.endOffset) &&
            (this.undoRedoStack[this.undoRedoStack.length - 1].range.range.startContainer === save.range.startContainer) &&
            (this.getTextContentFromFragment(this.undoRedoStack[this.undoRedoStack.length - 1].text).trim() ===
                this.getTextContentFromFragment(changEle.text).trim()) &&
            this.isElementStructureEqual(this.undoRedoStack[this.undoRedoStack.length - 1].text, changEle.text)) {
            return;
        }
        this.undoRedoStack.push(changEle);
        this.steps = this.undoRedoStack.length - 1;
        if (this.steps > this.undoRedoSteps) {
            this.undoRedoStack.shift();
            this.steps--;
        }
        if (e && e.callBack) {
            e.callBack();
        }
    };
    /**
     * Undo the editable text.
     *
     * @function undo
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @returns {void}
     * @hidden
     * @deprecated
     */
    UndoRedoManager.prototype.undo = function (e) {
        if (this.steps > 0) {
            var range = this.undoRedoStack[this.steps - 1].range;
            var removedContent = this.undoRedoStack[this.steps - 1].text;
            this.parent.editableElement.innerHTML = '';
            this.parent.editableElement.appendChild(removedContent.cloneNode(true));
            this.parent.editableElement.focus();
            scrollToCursor(this.parent.currentDocument, this.parent.editableElement);
            if (isIDevice()) {
                setEditFrameFocus(this.parent.editableElement, e.selector);
            }
            range.restore();
            this.steps--;
            if (e.callBack) {
                e.callBack({
                    requestType: 'Undo',
                    editorMode: 'HTML',
                    range: range,
                    elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument),
                    event: e.event
                });
            }
        }
    };
    /**
     * Redo the editable text.
     *
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @function redo
     * @returns {void}
     * @hidden
     * @deprecated
     */
    UndoRedoManager.prototype.redo = function (e) {
        if (this.undoRedoStack[this.steps + 1] != null) {
            var range = this.undoRedoStack[this.steps + 1].range;
            var addedContent = this.undoRedoStack[this.steps + 1].text;
            this.parent.editableElement.innerHTML = '';
            this.parent.editableElement.appendChild(addedContent.cloneNode(true));
            this.parent.editableElement.focus();
            scrollToCursor(this.parent.currentDocument, this.parent.editableElement);
            if (isIDevice()) {
                setEditFrameFocus(this.parent.editableElement, e.selector);
            }
            range.restore();
            this.steps++;
            if (e.callBack) {
                e.callBack({
                    requestType: 'Redo',
                    editorMode: 'HTML',
                    range: range,
                    elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument),
                    event: e.event
                });
            }
        }
    };
    /**
     * getUndoStatus method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    UndoRedoManager.prototype.getUndoStatus = function () {
        var status = { undo: false, redo: false };
        if (this.steps > 0) {
            status.undo = true;
        }
        if (this.undoRedoStack[this.steps + 1] != null) {
            status.redo = true;
        }
        return status;
    };
    UndoRedoManager.prototype.getCurrentStackIndex = function () {
        return this.steps;
    };
    return UndoRedoManager;
}());
export { UndoRedoManager };
