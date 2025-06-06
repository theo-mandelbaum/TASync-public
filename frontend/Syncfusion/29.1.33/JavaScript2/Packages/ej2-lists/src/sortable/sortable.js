var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Base, Event, getUniqueID, NotifyPropertyChanges, Property } from '@syncfusion/ej2-base';
import { closest, Draggable, remove, compareElementParent } from '@syncfusion/ej2-base';
import { addClass, isNullOrUndefined, getComponent, isBlazor, EventHandler } from '@syncfusion/ej2-base';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sortable Module provides support to enable sortable functionality in Dom Elements.
 * ```html
 * <div id="sortable">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 *   <div>Item 5</div>
 * </div>
 * ```
 * ```typescript
 *   let ele: HTMLElement = document.getElementById('sortable');
 *   let sortObj: Sortable = new Sortable(ele, {});
 * ```
 */
var Sortable = /** @class */ (function (_super) {
    __extends(Sortable, _super);
    function Sortable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.getHelper = function (e) {
            var target = _this.getSortableElement(e.sender.target);
            if (!_this.isValidTarget(target, _this)) {
                return false;
            }
            var element;
            if (_this.helper) {
                element = _this.helper({ sender: target, element: e.element });
            }
            else {
                element = target.cloneNode(true);
                element.style.width = target.offsetWidth + "px";
                element.style.height = target.offsetHeight + "px";
            }
            addClass([element], ['e-sortableclone']);
            document.body.appendChild(element);
            return element;
        };
        _this.onDrag = function (e) {
            if (!e.target) {
                return;
            }
            _this.trigger('drag', { event: e.event, element: _this.element, target: e.target });
            var newInst = _this.getSortableInstance(e.target);
            var target = _this.getSortableElement(e.target, newInst);
            if ((_this.isValidTarget(target, newInst) || (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1)) && (_this.curTarget !== target ||
                !isNullOrUndefined(newInst.placeHolder)) && (newInst.placeHolderElement ? newInst.placeHolderElement !== e.target : true)) {
                if (e.target.classList.contains('e-list-group-item')) {
                    target = e.target;
                }
                _this.curTarget = target;
                if (_this.target === target) {
                    return;
                }
                var oldIdx = _this.getIndex(newInst.placeHolderElement, newInst);
                var placeHolder = _this.getPlaceHolder(target, newInst);
                var newIdx = void 0;
                if (placeHolder) {
                    oldIdx = isNullOrUndefined(oldIdx) ? _this.getIndex(_this.target) : oldIdx;
                    newIdx = _this.getIndex(target, newInst, e.event);
                    var isPlaceHolderPresent = _this.isPlaceHolderPresent(newInst);
                    if (isPlaceHolderPresent && oldIdx === newIdx) {
                        return;
                    }
                    if (isPlaceHolderPresent) {
                        _this.removePlaceHolder(newInst);
                    }
                    newInst.placeHolderElement = placeHolder;
                    if (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1) {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                    else if (newInst.element !== _this.element && newIdx === newInst.element.childElementCount) {
                        newInst.element.appendChild(newInst.placeHolderElement);
                    }
                    else {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                }
                else {
                    oldIdx = isNullOrUndefined(oldIdx) ? _this.getIndex(_this.target) :
                        _this.getIndex(target, newInst) < oldIdx || !oldIdx ? oldIdx : oldIdx - 1;
                    newIdx = _this.getIndex(target, newInst);
                    var idx = newInst.element !== _this.element ? newIdx : oldIdx < newIdx ? newIdx + 1 : newIdx;
                    _this.updateItemClass(newInst);
                    newInst.element.insertBefore(_this.target, newInst.element.children[idx]);
                    _this.curTarget = _this.target;
                    _this.trigger('drop', {
                        droppedElement: _this.target, element: newInst.element, previousIndex: oldIdx, currentIndex: newIdx,
                        target: e.target, helper: document.getElementsByClassName('e-sortableclone')[0], event: e.event, scope: _this.scope
                    });
                }
            }
            else if (_this.curTarget !== _this.target && _this.scope && _this.curTarget !== target && !isNullOrUndefined(newInst.placeHolder)) {
                _this.removePlaceHolder(_this.getSortableInstance(_this.curTarget));
                _this.curTarget = _this.target;
            }
            newInst = _this.getSortableInstance(_this.curTarget);
            if (isNullOrUndefined(target) && e.target !== newInst.placeHolderElement) {
                if (_this.isPlaceHolderPresent(newInst)) {
                    _this.removePlaceHolder(newInst);
                }
            }
            else {
                var placeHolders = [].slice.call(document.getElementsByClassName('e-sortable-placeholder'));
                var inst_1;
                placeHolders.forEach(function (placeHolder) {
                    inst_1 = _this.getSortableInstance(placeHolder);
                    if (inst_1.element && inst_1 !== newInst) {
                        _this.removePlaceHolder(inst_1);
                    }
                });
            }
        };
        _this.onDragStart = function (e) {
            _this.target = _this.getSortableElement(e.target);
            var cancelDrag = false;
            _this.target.classList.add('e-grabbed');
            _this.curTarget = _this.target;
            e.helper = document.getElementsByClassName('e-sortableclone')[0];
            var args = { cancel: false, element: _this.element, target: _this.target };
            _this.trigger('beforeDragStart', args, function (observedArgs) {
                if (observedArgs.cancel) {
                    cancelDrag = observedArgs.cancel;
                    _this.onDragStop(e);
                }
            });
            if (cancelDrag) {
                return;
            }
            if (isBlazor) {
                _this.trigger('dragStart', {
                    event: e.event, element: _this.element, target: _this.target,
                    bindEvents: e.bindEvents, dragElement: e.dragElement
                });
            }
            else {
                _this.trigger('dragStart', { event: e.event, element: _this.element, target: _this.target });
            }
        };
        _this.onDragStop = function (e) {
            var dropInst = _this.getSortableInstance(_this.curTarget);
            var prevIdx;
            var curIdx;
            var handled;
            prevIdx = _this.getIndex(_this.target);
            var isPlaceHolderPresent = _this.isPlaceHolderPresent(dropInst);
            if (isPlaceHolderPresent) {
                var curIdx_1 = _this.getIndex(dropInst.placeHolderElement, dropInst);
                prevIdx = _this === dropInst && (prevIdx - curIdx_1) >= 1 ? prevIdx - 1 : prevIdx;
                var args = {
                    previousIndex: prevIdx, currentIndex: curIdx_1, target: e.target, droppedElement: _this.target,
                    helper: e.helper, cancel: false, handled: false
                };
                _this.trigger('beforeDrop', args, function (observedArgs) {
                    if (!observedArgs.cancel) {
                        handled = observedArgs.handled;
                        _this.updateItemClass(dropInst);
                        if (observedArgs.handled) {
                            var ele = _this.target.cloneNode(true);
                            _this.target.classList.remove('e-grabbed');
                            _this.target = ele;
                        }
                        dropInst.element.insertBefore(_this.target, dropInst.placeHolderElement);
                        var curIdx_2 = _this.getIndex(_this.target, dropInst);
                        prevIdx = _this === dropInst && (prevIdx - curIdx_2) >= 1 ? prevIdx - 1 : prevIdx;
                        _this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx_2,
                            target: e.target, helper: e.helper, droppedElement: _this.target, scopeName: _this.scope, handled: handled
                        });
                    }
                    _this.removePlaceHolder(dropInst);
                });
            }
            dropInst = _this.getSortableInstance(e.target);
            curIdx = dropInst.element.childElementCount;
            prevIdx = _this.getIndex(_this.target);
            if (dropInst.element.querySelector('.e-list-nrt')) {
                curIdx = curIdx - 1;
            }
            if (_this.curTarget === _this.target && e.target === _this.curTarget) {
                curIdx = prevIdx;
            }
            if (dropInst.element === e.target || (!isPlaceHolderPresent && _this.curTarget === _this.target)) {
                var beforeDropArgs = {
                    previousIndex: prevIdx, currentIndex: curIdx,
                    target: e.target, droppedElement: _this.target, helper: e.helper, cancel: false
                };
                _this.trigger('beforeDrop', beforeDropArgs, function (observedArgs) {
                    if ((dropInst.element === e.target || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nrt') > -1) || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nr-template') > -1)
                        || e.target.closest('.e-list-nr-template')) && !observedArgs.cancel) {
                        _this.updateItemClass(dropInst);
                        dropInst.element.appendChild(_this.target);
                        _this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx,
                            target: e.target, helper: e.helper, droppedElement: _this.target, scopeName: _this.scope
                        });
                    }
                });
            }
            _this.target.classList.remove('e-grabbed');
            _this.target = null;
            _this.curTarget = null;
            remove(e.helper);
            getComponent(_this.element, 'draggable').intDestroy(e.event);
        };
        _this.bind();
        return _this;
    }
    Sortable_1 = Sortable;
    Sortable.prototype.bind = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('sortable');
        }
        if (!this.itemClass) {
            this.itemClass = 'e-sort-item';
            this.dataBind();
        }
        this.initializeDraggable();
    };
    Sortable.prototype.initializeDraggable = function () {
        new Draggable(this.element, {
            helper: this.getHelper,
            dragStart: this.onDragStart,
            drag: this.onDrag,
            dragStop: this.onDragStop,
            dragTarget: "." + this.itemClass,
            enableTapHold: true,
            tapHoldThreshold: 200,
            queryPositionInfo: this.queryPositionInfo,
            distance: 1
        });
        this.wireEvents();
    };
    Sortable.prototype.wireEvents = function () {
        var wrapper = this.element;
        EventHandler.add(wrapper, 'keydown', this.keyDownHandler, this);
    };
    Sortable.prototype.unwireEvents = function () {
        var wrapper = this.element;
        EventHandler.remove(wrapper, 'keydown', this.keyDownHandler);
    };
    Sortable.prototype.keyDownHandler = function (e) {
        if (e.keyCode === 27) {
            var dragStop = getComponent(this.element, 'draggable');
            if (dragStop) {
                dragStop.intDestroy(null);
            }
            var dragWrapper = document.getElementsByClassName('e-sortableclone')[0];
            if (dragWrapper) {
                dragWrapper.remove();
            }
            var dragPlaceholder = document.getElementsByClassName('e-sortable-placeholder')[0];
            if (dragPlaceholder) {
                dragPlaceholder.remove();
            }
        }
    };
    Sortable.prototype.getPlaceHolder = function (target, instance) {
        if (instance.placeHolder) {
            var placeHolderElement = instance.placeHolder({ element: instance.element, grabbedElement: this.target, target: target });
            placeHolderElement.classList.add('e-sortable-placeholder');
            return placeHolderElement;
        }
        return null;
    };
    Sortable.prototype.isValidTarget = function (target, instance) {
        return target && compareElementParent(target, instance.element) && target.classList.contains(instance.itemClass) &&
            !target.classList.contains('e-disabled');
    };
    Sortable.prototype.removePlaceHolder = function (instance) {
        remove(instance.placeHolderElement);
        instance.placeHolderElement = null;
    };
    Sortable.prototype.updateItemClass = function (instance) {
        if (this !== instance) {
            this.target.classList.remove(this.itemClass);
            this.target.classList.add(instance.itemClass);
        }
    };
    Sortable.prototype.getSortableInstance = function (element) {
        element = closest(element, ".e-" + this.getModuleName());
        if (element) {
            var inst = getComponent(element, Sortable_1);
            return inst.scope && this.scope && inst.scope === this.scope ? inst : this;
        }
        else {
            return this;
        }
    };
    Sortable.prototype.getIndex = function (target, instance, e) {
        if (instance === void 0) { instance = this; }
        var idx;
        var placeHolderPresent;
        [].slice.call(instance.element.children).forEach(function (element, index) {
            if (element.classList.contains('e-sortable-placeholder')) {
                placeHolderPresent = true;
            }
            if (element === target) {
                idx = index;
                if (!isNullOrUndefined(e)) {
                    if (placeHolderPresent) {
                        idx -= 1;
                    }
                    var offset = target.getBoundingClientRect();
                    var clientY = offset.bottom - ((offset.bottom - offset.top) / 2);
                    var cltY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                    idx = cltY <= clientY ? idx : idx + 1;
                }
                return;
            }
        });
        return idx;
    };
    Sortable.prototype.getSortableElement = function (element, instance) {
        if (instance === void 0) { instance = this; }
        return closest(element, "." + instance.itemClass);
    };
    Sortable.prototype.queryPositionInfo = function (value) {
        value.left = scrollX ? parseFloat(value.left) - scrollX + "px" : value.left;
        value.top = scrollY ? parseFloat(value.top) - scrollY + "px" : value.top;
        return value;
    };
    Sortable.prototype.isPlaceHolderPresent = function (instance) {
        return instance.placeHolderElement && !!closest(instance.placeHolderElement, "#" + instance.element.id);
    };
    /**
     * It is used to sort array of elements from source element to destination element.
     *
     * @param destination - Defines the destination element to which the sortable elements needs to be appended.
     *
     * If it is null, then the Sortable library element will be considered as destination.
     * @param targetIndexes - Specifies the sortable elements indexes which needs to be sorted.
     * @param insertBefore - Specifies the index before which the sortable elements needs to be appended.
     * If it is null, elements will be appended as last child.
     * @function moveTo
     * @returns {void}
     */
    Sortable.prototype.moveTo = function (destination, targetIndexes, insertBefore) {
        moveTo(this.element, destination, targetIndexes, insertBefore);
    };
    /**
     * It is used to destroy the Sortable library.
     */
    Sortable.prototype.destroy = function () {
        this.unwireEvents();
        if (this.itemClass === 'e-sort-item') {
            this.itemClass = null;
            this.dataBind();
        }
        getComponent(this.element, Draggable).destroy();
        _super.prototype.destroy.call(this);
    };
    Sortable.prototype.getModuleName = function () {
        return 'sortable';
    };
    Sortable.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'itemClass':
                    [].slice.call(this.element.children).forEach(function (element) {
                        if (element.classList.contains(oldProp.itemClass)) {
                            element.classList.remove(oldProp.itemClass);
                        }
                        if (newProp.itemClass) {
                            element.classList.add(newProp.itemClass);
                        }
                    });
                    break;
            }
        }
    };
    var Sortable_1;
    __decorate([
        Property(false)
    ], Sortable.prototype, "enableAnimation", void 0);
    __decorate([
        Property(null)
    ], Sortable.prototype, "itemClass", void 0);
    __decorate([
        Property(null)
    ], Sortable.prototype, "scope", void 0);
    __decorate([
        Property()
    ], Sortable.prototype, "helper", void 0);
    __decorate([
        Property()
    ], Sortable.prototype, "placeHolder", void 0);
    __decorate([
        Event()
    ], Sortable.prototype, "drag", void 0);
    __decorate([
        Event()
    ], Sortable.prototype, "beforeDragStart", void 0);
    __decorate([
        Event()
    ], Sortable.prototype, "dragStart", void 0);
    __decorate([
        Event()
    ], Sortable.prototype, "beforeDrop", void 0);
    __decorate([
        Event()
    ], Sortable.prototype, "drop", void 0);
    Sortable = Sortable_1 = __decorate([
        NotifyPropertyChanges
    ], Sortable);
    return Sortable;
}(Base));
export { Sortable };
/**
 * It is used to sort array of elements from source element to destination element.
 *
 * @param {HTMLElement} from - The source element from which to move elements.
 * @param {HTMLElement} [to=from] - The destination element to which to move elements. Defaults to the source element.
 * @param {number[]} [targetIndexes] - The indexes of elements to move. If not provided, all children of the source element will be moved.
 * @param {number} [insertBefore] - The index before which to insert the moved elements in the destination element. If not provided, elements will be appended to the end of the destination element.
 * @returns {void}
 * @private
 */
export function moveTo(from, to, targetIndexes, insertBefore) {
    var targetElements = [];
    if (!to) {
        to = from;
    }
    if (targetIndexes && targetIndexes.length) {
        targetIndexes.forEach(function (index) {
            targetElements.push(from.children[index]);
        });
    }
    else {
        targetElements = [].slice.call(from.children);
    }
    if (isNullOrUndefined(insertBefore)) {
        targetElements.forEach(function (target) {
            to.appendChild(target);
        });
    }
    else {
        var insertElement_1 = to.children[insertBefore];
        targetElements.forEach(function (target) {
            to.insertBefore(target, insertElement_1);
        });
    }
}
