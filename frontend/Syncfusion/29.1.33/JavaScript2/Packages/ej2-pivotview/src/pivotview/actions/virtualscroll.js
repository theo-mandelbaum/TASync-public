import { EventHandler, setStyleAttribute, Browser, closest, addClass, removeClass } from '@syncfusion/ej2-base';
import { contentReady } from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { PivotUtil } from '../../base/util';
import * as events from '../../common/base/constant';
/**
 * `VirtualScroll` module is used to handle scrolling behavior.
 */
var VirtualScroll = /** @class */ (function () {
    /**
     * Constructor for PivotView scrolling.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    function VirtualScroll(parent) {
        this.previousValues = { top: 0, left: 0 };
        this.frozenPreviousValues = { top: 0, left: 0 };
        this.eventType = '';
        this.isFireFox = Browser.userAgent.toLowerCase().indexOf('firefox') > -1;
        this.isScrolling = false;
        this.parent = parent;
        this.addInternalEvents();
    }
    /**
     * It returns the Module name.
     *
     * @returns {string} - string.
     * @hidden
     */
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualscroll';
    };
    VirtualScroll.prototype.addInternalEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(contentReady, this.wireEvents, this);
    };
    VirtualScroll.prototype.wireEvents = function () {
        this.engineModule = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        if (this.parent.displayOption.view !== 'Chart') {
            var mCont = this.parent.element.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV);
            var gridContent = this.parent.element.querySelector('.' + cls.GRID_CONTENT);
            var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
            var mScrollBar = gridContent.querySelector('.' + cls.VIRTUALTABLE_DIV);
            EventHandler.clearEvents(mCont);
            if (this.isFireFox) {
                EventHandler.clearEvents(mHdr);
            }
            if (this.engineModule) {
                var ele = this.parent.isAdaptive ? mCont : gridContent.querySelector('.' + cls.VIRTUALTABLE_DIV);
                EventHandler.add(ele, 'scroll touchmove pointermove', this.onHorizondalScroll(mHdr, mCont), this);
                EventHandler.add(mCont.parentElement, 'scroll wheel touchmove pointermove keyup keydown', this.onVerticalScroll(mCont.parentElement, mCont), this);
                if (this.isFireFox) {
                    EventHandler.add(ele, 'mouseup touchend scroll', this.common(mHdr, mCont, mCont), this);
                    if (!this.parent.isAdaptive) {
                        EventHandler.add(mCont.parentElement, 'mouseup touchend scroll', this.common(mHdr, mCont.parentElement, mCont), this);
                    }
                }
                else {
                    EventHandler.add(ele, 'mouseup touchend', this.common(mHdr, mCont, mCont), this);
                    if (!this.parent.isAdaptive) {
                        EventHandler.add(mCont.parentElement, 'mouseup touchend', this.common(mHdr, mCont.parentElement, mCont), this);
                    }
                }
                EventHandler.add(mScrollBar, 'scroll', this.onCustomScrollbarScroll(mCont, mHdr), this);
                EventHandler.add(mCont, 'scroll', this.onCustomScrollbarScroll(mScrollBar, mHdr), this);
                EventHandler.add(mHdr, 'scroll', this.onCustomScrollbarScroll(mScrollBar, mCont), this);
                // EventHandler.add(mCont.parentElement, 'wheel', this.onWheelScroll(mCont), this);
                // EventHandler.add(mCont.parentElement, 'touchstart pointerdown', this.setPageXY(), this);
                // EventHandler.add(mCont.parentElement, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont), this);
                EventHandler.add(mHdr, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(mHdr, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont), this);
                EventHandler.add(mCont, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(mCont, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont), this);
            }
            this.parent.grid.on('check-scroll-reset', function (args) {
                args.cancel = true;
            });
            this.parent.grid.on('prevent-frozen-scroll-refresh', function (args) {
                args.cancel = true;
            });
            this.parent.grid.isPreventScrollEvent = true;
        }
    };
    VirtualScroll.prototype.onWheelScroll = function (mCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            var top = element.scrollTop + (e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY);
            if (_this.frozenPreviousValues.top === top) {
                return;
            }
            e.preventDefault();
            _this.frozenPreviousValues.top = top;
            _this.eventType = e.type;
        };
    };
    VirtualScroll.prototype.getPointXY = function (e) {
        var pageXY = { x: 0, y: 0 };
        if (!(e.touches && e.touches.length)) {
            pageXY.x = e.pageX;
            pageXY.y = e.pageY;
        }
        else {
            pageXY.x = e.touches[0].pageX;
            pageXY.y = e.touches[0].pageY;
        }
        return pageXY;
    };
    VirtualScroll.prototype.onCustomScrollbarScroll = function (mCont, mHdr) {
        var _this = this;
        var content = mCont;
        var header = mHdr;
        return function (e) {
            var eContent = _this.parent.element.querySelector('.' + cls.CONTENT_CLASS);
            if (eContent.querySelector('tbody') === null) {
                return;
            }
            var target = e.target;
            var left = target.scrollLeft;
            if (_this.previousValues.left === left || (_this.isFireFox && target.classList.contains(cls.MOVABLEHEADER_DIV))) {
                return;
            }
            content.scrollLeft = left;
            header.scrollLeft = left;
            // this.previousValues.left = left;
            if (_this.parent.isDestroyed) {
                return;
            }
        };
    };
    VirtualScroll.prototype.onTouchScroll = function (mHdr, mCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            var pageXY = _this.getPointXY(e);
            var top = _this.parent.element.querySelector('.' + cls.GRID_CLASS + ' .' + cls.CONTENT_CLASS).scrollTop +
                (_this.pageXY.y - pageXY.y);
            var ele = _this.parent.isAdaptive ? mCont : element.parentElement.parentElement.querySelector('.' + cls.VIRTUALTABLE_DIV);
            var left = ele.scrollLeft + (_this.pageXY.x - pageXY.x);
            if (_this.frozenPreviousValues.left === left || left < 0) {
                return;
            }
            mHdr.scrollLeft = left;
            ele.scrollLeft = left;
            _this.pageXY.x = pageXY.x;
            _this.frozenPreviousValues.left = left;
            if (_this.frozenPreviousValues.top === top || top < 0) {
                return;
            }
            _this.pageXY.y = pageXY.y;
            _this.frozenPreviousValues.top = top;
            _this.eventType = e.type;
        };
    };
    VirtualScroll.prototype.update = function (top, left, e, ele, mHdr, mCont) {
        var _this = this;
        var virtualTable = this.parent.element.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV);
        this.parent.isScrolling = true;
        var engine = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings)
        };
        var enableOptimizedRendering = this.parent.virtualScrollSettings && this.parent.virtualScrollSettings.allowSinglePage && this.parent.dataType === 'pivot';
        if (this.parent.pageSettings && engine.pageSettings) {
            if (this.direction === 'vertical') {
                var vScrollPos = mCont.parentElement.scrollHeight - (top + mCont.parentElement.offsetHeight);
                var rowValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'row' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.rowPageSize * rowValues * this.parent.gridSettings.rowHeight);
                var section = Math.ceil(top / exactSize);
                section += enableOptimizedRendering && vScrollPos <= 0 ? 1 : 0;
                if (((this.parent.scrollPosObject.vertical === section || engine.pageSettings.rowPageSize >= engine.rowCount) ||
                    (virtualTable && (virtualTable.scrollHeight < (virtualTable.parentElement.clientHeight * 3)))) &&
                    !enableOptimizedRendering) {
                    return;
                }
                this.parent.actionObj.actionName = events.verticalScroll;
                if (enableOptimizedRendering && this.parent.grid && this.parent.grid.element.querySelector('.e-spinner-inner')) {
                    addClass([this.parent.grid.element.querySelector('.e-spinner-inner')], [cls.PIVOT_HIDE_LOADER]);
                }
                this.parent.actionBeginMethod();
                if (!enableOptimizedRendering) {
                    this.parent.showWaitingPopup();
                }
                this.parent.scrollPosObject.vertical = section;
                this.parent.pageSettings.currentRowPage = engine.pageSettings.currentRowPage = section > 1 ? section : 1;
                var rowStartPos_1 = 0;
                this.parent.trigger(events.enginePopulating, args, function () {
                    if (_this.parent.dataType === 'pivot') {
                        if (_this.parent.dataSourceSettings.mode === 'Server') {
                            _this.parent.getEngine('onScroll', null, null, null, null, null, null);
                        }
                        else {
                            _this.parent.engineModule.generateGridData(_this.parent.dataSourceSettings, true, false, _this.parent.engineModule.headerCollection);
                            rowStartPos_1 = _this.parent.engineModule.rowStartPos;
                        }
                    }
                    else {
                        _this.parent.olapEngineModule.scrollPage();
                        rowStartPos_1 = _this.parent.olapEngineModule.pageRowStartPos;
                    }
                    _this.enginePopulatedEventMethod(engine);
                });
                var exactPage = Math.ceil(rowStartPos_1 / (this.parent.pageSettings.rowPageSize * rowValues));
                var pos = exactSize * exactPage -
                    (engine.rowFirstLvl * rowValues * this.parent.gridSettings.rowHeight);
                this.parent.scrollPosObject.verticalSection = pos;
            }
            else {
                var hScrollPos = ele.scrollWidth - (ele.scrollLeft + ele.offsetWidth);
                var colValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'column' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.columnPageSize *
                    colValues * this.parent.gridSettings.columnWidth);
                var section = Math.ceil(Math.abs(left) / exactSize);
                var enableOptimizedRendering_1 = this.parent.virtualScrollSettings && this.parent.virtualScrollSettings.allowSinglePage && this.parent.dataType === 'pivot';
                section += enableOptimizedRendering_1 && hScrollPos <= 0 ? 1 : 0;
                if ((this.parent.scrollPosObject.horizontal === section || (virtualTable && (virtualTable.scrollWidth <
                    (virtualTable.parentElement.clientWidth * 3)))) && !enableOptimizedRendering_1) {
                    return;
                }
                this.parent.actionObj.actionName = events.horizontalScroll;
                if (enableOptimizedRendering_1 && this.parent.grid && this.parent.grid.element.querySelector('.e-spinner-inner')) {
                    addClass([this.parent.grid.element.querySelector('.e-spinner-inner')], [cls.PIVOT_HIDE_LOADER]);
                    if (mHdr) {
                        removeClass([mHdr, mCont], ['e-virtual-pivot-content']);
                    }
                }
                this.parent.actionBeginMethod();
                if (!enableOptimizedRendering_1) {
                    this.parent.showWaitingPopup();
                }
                var pivot_1 = this.parent;
                pivot_1.scrollPosObject.horizontal = section;
                this.parent.pageSettings.currentColumnPage = engine.pageSettings.currentColumnPage = section > 1 ? section : 1;
                var colStartPos_1 = 0;
                this.parent.trigger(events.enginePopulating, args, function () {
                    if (pivot_1.dataType === 'pivot') {
                        if (_this.parent.dataSourceSettings.mode === 'Server') {
                            _this.parent.getEngine('onScroll', null, null, null, null, null, null);
                        }
                        else {
                            pivot_1.engineModule.generateGridData(pivot_1.dataSourceSettings, true, false, pivot_1.engineModule.headerCollection);
                            colStartPos_1 = pivot_1.engineModule.colStartPos;
                        }
                    }
                    else {
                        pivot_1.olapEngineModule.scrollPage();
                        colStartPos_1 = pivot_1.olapEngineModule.pageColStartPos;
                    }
                    _this.enginePopulatedEventMethod(engine);
                });
                var exactPage = Math.ceil(colStartPos_1 / (pivot_1.pageSettings.columnPageSize * colValues));
                var pos = exactSize * exactPage - (engine.colFirstLvl *
                    colValues * pivot_1.gridSettings.columnWidth);
                pivot_1.scrollPosObject.horizontalSection = pos;
            }
            this.parent.actionObj.actionName = this.parent.getActionCompleteName();
            if (this.parent.actionObj.actionName) {
                this.parent.actionCompleteMethod();
            }
        }
    };
    VirtualScroll.prototype.enginePopulatedEventMethod = function (engine, control) {
        var _this = this;
        var pivot = control ? control : this.parent;
        var eventArgs = {
            dataSourceSettings: pivot.dataSourceSettings,
            pivotValues: engine.pivotValues
        };
        pivot.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
            _this.parent.pivotValues = observedArgs.pivotValues;
        });
    };
    VirtualScroll.prototype.setPageXY = function () {
        var _this = this;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            _this.pageXY = _this.getPointXY(e);
        };
    };
    VirtualScroll.prototype.common = function (mHdr, mCont, fCont) {
        var _this = this;
        return function (e) {
            var enableOptimizedRendering = _this.parent.virtualScrollSettings &&
                _this.parent.virtualScrollSettings.allowSinglePage && _this.parent.dataType === 'pivot';
            if (_this.isScrolling || !enableOptimizedRendering) {
                _this.isScrolling = false;
                var ele = _this.parent.isAdaptive ? mCont :
                    closest(mCont, '.' + cls.GRID_CONTENT).querySelector('.' + cls.VIRTUALTABLE_DIV);
                if (enableOptimizedRendering) {
                    if (_this.direction === 'vertical') {
                        if (_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                            addClass([fCont], ['e-virtual-pivot-content']);
                            removeClass([_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)], [cls.PIVOT_HIDE_LOADER]);
                        }
                    }
                    else {
                        if (_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                            addClass([mHdr, mCont], ['e-virtual-pivot-content']);
                            removeClass([_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)], [cls.PIVOT_HIDE_LOADER]);
                        }
                    }
                }
                _this.update(_this.parent.element.querySelector('.' + cls.GRID_CLASS + ' .' +
                    cls.CONTENT_CLASS).scrollTop * _this.parent.verticalScrollScale, ele.scrollLeft * _this.parent.horizontalScrollScale, e, ele, mHdr, mCont);
            }
        };
    };
    /**
     * It performs while scrolling horizontal scroll bar
     *
     * @param {HTMLElement} mHdr - It contains the header details.
     * @param {HTMLElement} mCont - It contains the content details.
     * @returns {Function} - It returns the table details as Function.
     * @hidden
     */
    VirtualScroll.prototype.onHorizondalScroll = function (mHdr, mCont) {
        var _this = this;
        var timeOutObj;
        var ele = this.parent.isAdaptive ? mCont : closest(mCont, '.' + cls.GRID_CONTENT).querySelector('.' + cls.VIRTUALTABLE_DIV);
        var eleScrollLeft = Math.abs(ele.scrollLeft);
        var left = eleScrollLeft * this.parent.horizontalScrollScale;
        var horiOffset = left - this.parent.scrollPosObject.horizontalSection - eleScrollLeft;
        horiOffset = this.parent.enableRtl ? horiOffset : -horiOffset;
        if (ele.style.display !== 'none') {
            this.alignFreezedCells(horiOffset, false);
        }
        return function (e) {
            eleScrollLeft = Math.abs(ele.scrollLeft);
            left = eleScrollLeft * _this.parent.horizontalScrollScale;
            if (e.type === 'wheel' || e.type === 'touchmove' || _this.eventType === 'wheel' || _this.eventType === 'touchmove') {
                clearTimeout(timeOutObj);
                timeOutObj = setTimeout(function () {
                    left = e.type === 'touchmove' ? eleScrollLeft : left;
                    _this.update(mCont.parentElement.scrollTop * _this.parent.verticalScrollScale, left, e, ele, mHdr, mCont);
                }, 300);
            }
            if (_this.previousValues.left === left) {
                return;
            }
            _this.parent.scrollDirection = _this.direction = 'horizondal';
            _this.isScrolling = true;
            horiOffset = left - _this.parent.scrollPosObject.horizontalSection - eleScrollLeft;
            horiOffset = _this.parent.enableRtl ? horiOffset : -horiOffset;
            var vertiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',').length > 1 ?
                mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[1].trim() : '0px)';
            if (eleScrollLeft < _this.parent.scrollerBrowserLimit) {
                setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
                _this.alignFreezedCells(horiOffset, false);
            }
            var excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                -(_this.parent.scrollPosObject.horizontalSection - left) : ((left + (mHdr.offsetWidth -
                mHdr.querySelector('.e-headercell.e-leftfreeze').offsetWidth)) -
                (_this.parent.scrollPosObject.horizontalSection + (mCont.querySelector('.' + cls.TABLE).offsetWidth -
                    mCont.querySelector('.' + cls.TABLE).querySelector('.e-leftfreeze.e-rowsheader').offsetWidth)));
            var notLastPage = Math.ceil(_this.parent.scrollPosObject.horizontalSection / _this.parent.horizontalScrollScale) <
                _this.parent.scrollerBrowserLimit;
            if (_this.parent.scrollPosObject.horizontalSection > left ? true : (excessMove > 1 && notLastPage)) {
                //  showSpinner(this.parent.element);
                var enableOptimizedRendering = _this.parent.virtualScrollSettings && _this.parent.virtualScrollSettings.allowSinglePage && _this.parent.dataType === 'pivot';
                if (enableOptimizedRendering && _this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                    addClass([mHdr, mCont], ['e-virtual-pivot-content']);
                    removeClass([_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)], [cls.PIVOT_HIDE_LOADER]);
                }
                if (left > mHdr.clientWidth) {
                    if (_this.parent.scrollPosObject.left < 1) {
                        _this.parent.scrollPosObject.left = mHdr.clientWidth;
                    }
                    _this.parent.scrollPosObject.left = _this.parent.scrollPosObject.left - 50;
                    excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                        (excessMove - _this.parent.scrollPosObject.left) : (excessMove + _this.parent.scrollPosObject.left);
                }
                else {
                    excessMove = -_this.parent.scrollPosObject.horizontalSection;
                }
                horiOffset = -((left - (_this.parent.scrollPosObject.horizontalSection + excessMove) - closest(mCont, '.' + cls.GRID_CONTENT).querySelector('.' + cls.VIRTUALTABLE_DIV).scrollLeft));
                var vWidth = (_this.parent.gridSettings.columnWidth * _this.engineModule.columnCount);
                if (vWidth > _this.parent.scrollerBrowserLimit) {
                    _this.parent.horizontalScrollScale = vWidth / _this.parent.scrollerBrowserLimit;
                    vWidth = _this.parent.scrollerBrowserLimit;
                }
                if (horiOffset > vWidth && horiOffset > left) {
                    horiOffset = left;
                    excessMove = 0;
                }
                setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
                _this.alignFreezedCells(horiOffset, false);
                _this.parent.scrollPosObject.horizontalSection = _this.parent.scrollPosObject.horizontalSection + excessMove;
            }
            var hScrollPos = (ele.scrollWidth - (eleScrollLeft + (ele.offsetWidth -
                _this.parent.element.querySelector('.' + cls.GRID_CLASS)
                    .querySelector('.' + cls.HEADERCELL + '.' + cls.FREEZED_CELL).offsetWidth)));
            if (hScrollPos <= 0) {
                var virtualDiv = mCont.querySelector('.' + cls.VIRTUALTRACK_DIV);
                virtualDiv.style.display = 'none';
                var mCntScrollPos = (mCont.scrollWidth - (mCont.scrollLeft + mCont.offsetWidth));
                virtualDiv.style.display = '';
                var mCntVScrollPos = (mCont.scrollWidth - (mCont.scrollLeft + mCont.offsetWidth));
                _this.parent.scrollPosObject.horizontalSection -= mCntScrollPos > hScrollPos ? mCntScrollPos : -mCntVScrollPos;
                horiOffset = (eleScrollLeft > _this.parent.scrollerBrowserLimit) ?
                    Number(mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[0].split('px')[0].trim()) :
                    -(((eleScrollLeft * _this.parent.horizontalScrollScale) -
                        _this.parent.scrollPosObject.horizontalSection - eleScrollLeft));
                setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
                _this.alignFreezedCells(horiOffset, false);
            }
            _this.previousValues.left = left;
            _this.frozenPreviousValues.left = left;
            _this.eventType = '';
            mHdr.scrollLeft = ele.scrollLeft;
            mCont.scrollLeft = ele.scrollLeft;
        };
    };
    /**
     * It performs while scrolling horizontal scroll bar
     *
     * @param {number} horiOffset - It contains the horizondal offset translation value of freezed cells.
     * @param {boolean} isParentCells - It helps to identify the frozen cells of the parent element.
     * @returns {void}
     * @hidden
     */
    VirtualScroll.prototype.alignFreezedCells = function (horiOffset, isParentCells) {
        for (var i = 0, j = this.parent.element.querySelectorAll('.' + cls.FREEZED_CELL); i < j.length; i++) {
            if (this.parent.isTabular && this.parent.dataSourceSettings.rows.length > 1) {
                var rowsHeaderElement = this.parent.element.querySelector('.' + cls.FREEZED_CELL);
                if (isParentCells) {
                    if (this.parent.enableRtl) {
                        j[i].style.right = -horiOffset + 'px';
                    }
                    else {
                        this.setFrozenColumnPosition(horiOffset, rowsHeaderElement, i, j);
                    }
                }
                else {
                    if (this.parent.enableRtl) {
                        j[i].style.right = (Number(horiOffset)) + 'px';
                    }
                    else {
                        this.setFrozenColumnPosition(horiOffset, rowsHeaderElement, i, j);
                    }
                }
            }
            else {
                if (isParentCells) {
                    if (this.parent.enableRtl) {
                        j[i].style.right = -horiOffset + 'px';
                    }
                    else {
                        j[i].style.left = horiOffset + 'px';
                    }
                }
                else {
                    if (this.parent.enableRtl) {
                        j[i].style.right = (Number(horiOffset)) + 'px';
                    }
                    else {
                        j[i].style.left = (Number(-horiOffset)) + 'px';
                    }
                }
            }
        }
    };
    VirtualScroll.prototype.onVerticalScroll = function (mCont, fCont) {
        var _this = this;
        var timeOutObj;
        var virtualTableElement = mCont.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV) ?
            mCont.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV) : mCont;
        return function (e) {
            if (_this.parent.isAdaptive || (virtualTableElement.scrollHeight > (virtualTableElement.parentElement.clientHeight * 3))) {
                var top_1 = mCont.scrollTop * _this.parent.verticalScrollScale;
                if (e.type === 'wheel' || e.type === 'touchmove' || e.type === 'scroll'
                    || _this.eventType === 'wheel' || _this.eventType === 'touchmove' || e.type === 'keyup' || e.type === 'keydown') {
                    var ele_1 = _this.parent.isAdaptive ? mCont : closest(mCont, '.' + cls.GRID_CONTENT).querySelector('.' + cls.VIRTUALTABLE_DIV);
                    clearTimeout(timeOutObj);
                    timeOutObj = setTimeout(function () {
                        var scrollLeft = 0;
                        if (_this.parent.isAdaptive) {
                            var contentTable = ele_1.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV);
                            scrollLeft = (ele_1.scrollLeft === contentTable.scrollLeft) ? ele_1.scrollLeft :
                                contentTable.scrollLeft;
                        }
                        else {
                            scrollLeft = ele_1.scrollLeft;
                        }
                        _this.update(mCont.scrollTop * _this.parent.verticalScrollScale, scrollLeft * _this.parent.horizontalScrollScale, e, ele_1, null, mCont);
                    }, 300);
                }
                if (_this.previousValues.top === top_1) {
                    return;
                }
                if (_this.parent.scrollPosObject.horizontalSection < 0) {
                    _this.parent.scrollPosObject.horizontalSection = 0;
                }
                _this.parent.scrollDirection = _this.direction = 'vertical';
                _this.isScrolling = true;
                var vertiOffset = -((top_1 - _this.parent.scrollPosObject.verticalSection - mCont.scrollTop));
                var horiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim();
                if (vertiOffset > _this.parent.virtualDiv.clientHeight) {
                    vertiOffset = _this.parent.virtualDiv.clientHeight;
                }
                if (mCont.scrollTop < _this.parent.scrollerBrowserLimit) {
                    setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                        transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                    });
                    setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                        transform: horiOffset + ',' + vertiOffset + 'px)'
                    });
                }
                var excessMove = _this.parent.scrollPosObject.verticalSection > top_1 ?
                    -(_this.parent.scrollPosObject.verticalSection - top_1) : ((top_1 + mCont.clientHeight) -
                    (_this.parent.scrollPosObject.verticalSection + mCont.querySelector('.' + cls.TABLE).offsetHeight));
                var notLastPage = Math.ceil(_this.parent.scrollPosObject.verticalSection / _this.parent.verticalScrollScale) <
                    _this.parent.scrollerBrowserLimit;
                if (_this.parent.scrollPosObject.verticalSection > top_1 ? true : (excessMove > 1 && notLastPage)) {
                    //  showSpinner(this.parent.element);
                    var enableOptimizedRendering = _this.parent.virtualScrollSettings && _this.parent.virtualScrollSettings.allowSinglePage && _this.parent.dataType === 'pivot';
                    if (enableOptimizedRendering && _this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                        addClass([fCont], ['e-virtual-pivot-content']);
                        removeClass([_this.parent.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)], [cls.PIVOT_HIDE_LOADER]);
                    }
                    if (top_1 > mCont.clientHeight) {
                        if (_this.parent.scrollPosObject.top < 1) {
                            _this.parent.scrollPosObject.top = mCont.clientHeight;
                        }
                        _this.parent.scrollPosObject.top = _this.parent.scrollPosObject.top - 50;
                        excessMove = _this.parent.scrollPosObject.verticalSection > top_1 ?
                            (excessMove - _this.parent.scrollPosObject.top) : (excessMove + _this.parent.scrollPosObject.top);
                    }
                    else {
                        excessMove = -_this.parent.scrollPosObject.verticalSection;
                    }
                    var movableTable = _this.parent.element.querySelector('.' + cls.CONTENT_CLASS).querySelector('.' + cls.TABLE);
                    vertiOffset = -((top_1 - (_this.parent.scrollPosObject.verticalSection + excessMove) - mCont.scrollTop));
                    var vHeight = (_this.parent.gridSettings.rowHeight * _this.engineModule.rowCount + 0.1
                        - movableTable.clientHeight);
                    if (vHeight > _this.parent.scrollerBrowserLimit) {
                        _this.parent.verticalScrollScale = vHeight / _this.parent.scrollerBrowserLimit;
                        vHeight = _this.parent.scrollerBrowserLimit;
                    }
                    if (vertiOffset > vHeight && vertiOffset > top_1) {
                        vertiOffset = top_1;
                        excessMove = 0;
                    }
                    if (vertiOffset > _this.parent.virtualDiv.clientHeight) {
                        vertiOffset = _this.parent.virtualDiv.clientHeight;
                    }
                    setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                        transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                    });
                    setStyleAttribute(mCont.querySelector('.' + cls.TABLE), {
                        transform: horiOffset + ',' + vertiOffset + 'px)'
                    });
                    _this.parent.scrollPosObject.verticalSection = _this.parent.scrollPosObject.verticalSection + excessMove;
                }
                _this.previousValues.top = top_1;
                _this.frozenPreviousValues.top = top_1;
                _this.eventType = '';
            }
        };
    };
    /**
     * @hidden
     */
    VirtualScroll.prototype.removeInternalEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(contentReady, this.wireEvents);
    };
    /**
     * To destroy the virtualscrolling event listener
     *
     * @returns {void}
     * @hidden
     */
    VirtualScroll.prototype.destroy = function () {
        this.removeInternalEvents();
    };
    VirtualScroll.prototype.setFrozenColumnPosition = function (horiOffset, rowsHeaderElement, i, j) {
        if (rowsHeaderElement) {
            var colIndex = parseInt(rowsHeaderElement.getAttribute('aria-colindex'), 10) - 1;
            if (colIndex > 0 && colIndex <= (this.parent.engineModule.rowMaxLevel + 1)) {
                j[i].style.left = (colIndex * this.parent.gridSettings.columnWidth) + 'px';
            }
        }
        else {
            j[i].style.left = horiOffset + 'px';
        }
    };
    return VirtualScroll;
}());
export { VirtualScroll };
