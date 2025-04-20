import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
//import { DocumentEditorRulerModel } from '../ruler-settings-model';
import { Ruler } from '../ruler/index';
import { HelperMethods, Point } from '../editor/editor-helper';
import { WTabStop } from '../format/paragraph-format';
import { Size } from './size';
/* eslint-disable */
/**
 * defines the helper methods for the ruler
 * @private
 */
var RulerHelper = /** @class */ (function () {
    function RulerHelper() {
        this.resizerEnabled = false;
        this.isDraggingRender = false;
        this.isDraggingIndents1 = false;
        this.isDraggingIndents2 = false;
        this.isDraggingIndents3 = false;
        this.isDraggingIndents4 = false;
        this.isDraggingForTab = false;
        this.currentTabStop = undefined;
        this.tabIndex = 0;
        this.isLeftRulerMargin = undefined;
        this.isLeftMultiColumn = false;
        this.isRightMultiColumn = false;
        //Event handler
        this.onmarkIndicatorClickHandler = this.onMarkIndicatorClick.bind(this);
        this.onHorizontalRulerMouseMoveHandler = this.onHorizontalRulerMouseMoved.bind(this);
        this.onHRulerMouseEnterHandler = this.onHRulerMouseEnter.bind(this);
        this.onHRulerMouseLeaveHandler = this.onHRulerMouseLeave.bind(this);
        this.onHRulerMouseDownHandler = this.onHRulerMouseDown.bind(this);
        this.onHRulerMouseUpHandler = this.onHRulerMouseUp.bind(this);
        this.onRulerDblClickHandler = this.onRulerDblClick.bind(this);
        this.onDoubleClickHandler = this.onDoubleClick.bind(this);
        this.onRulerMouseUpHandler = this.onRularMouseUp.bind(this);
        this.onVMouseMoveHandler = this.onVMouseMove.bind(this);
        this.onVMouseDownHandler = this.onVMouseDown.bind(this);
        this.onVMouseUpHandler = this.onVMouseUp.bind(this);
        this.onDocumentIntentTrueChangeHandler = this.onDocumentIntentTrue.bind(this);
        this.onDocumentIntentFalseChangeHandler = this.onDocumentIntentFalse.bind(this);
        this.onFirstLineIndentMouseDownHandler = this.onFirstLineIndentMouseDown.bind(this);
        this.onIndentMouseMoveHandler = this.onIndentMouseMove.bind(this);
        this.onIndentMouseUpHandler = this.onIndentMouseUp.bind(this);
        this.onHangIndentMouseDownHandler = this.onHangIndentMouseDown.bind(this);
        this.onHangIndentMouseMoveHandler = this.onHangIndentMouseMove.bind(this);
        this.onHangIndentMouseUpHandler = this.onHangIndentMouseUp.bind(this);
        this.onLeftIndentMouseDownHandler = this.onLeftIndentMouseDown.bind(this);
        this.onLeftIndentMouseMoveHandler = this.onLeftIndentMouseMove.bind(this);
        this.onLeftIndentMouseUpHandler = this.onLeftIndentMouseUp.bind(this);
        this.onRightIndentMouseDownHandler = this.onRightIndentMouseDown.bind(this);
        this.onRightIndentMouseMoveHandler = this.onRightIndentMouseMove.bind(this);
        this.onRightIndentMouseUpHandler = this.onRightIndentMouseUp.bind(this);
        this.onTabStopMouseDownHandler = this.onTabStopMouseDown.bind(this);
        this.onTabStopMouseUpHandler = this.onTabStopMouseUp.bind(this);
        this.onTabStopMouseMoveHandler = this.onTabStopMouseMove.bind(this);
        this.onRenderTabStopMouseUpHandler = this.onRenderTabStopMouseUp.bind(this);
        this.onTabStopDblClickHandler = this.onTabStopDblClick.bind(this);
        this.isTopRulerMargin = false;
    }
    //Event handler methods
    RulerHelper.prototype.onMarkIndicatorClick = function () {
        var divElements = document.querySelector('.e-de-ruler-markIndicator');
        for (var i = 0; i < divElements.childNodes.length; i++) {
            var currentDiv = divElements.childNodes[parseInt(i.toString(), 10)];
            if (currentDiv.style.display === 'block') {
                currentDiv.style.display = 'none';
                var nextIndex = (i + 1) % divElements.childNodes.length;
                divElements.childNodes[parseInt(nextIndex.toString(), 10)].style.display = 'block';
                break;
            }
        }
    };
    // private onHorizontalRulerMouseMove(e: MouseEvent): void {
    //     if (this.documentEditor.isDestroyed || !this.documentEditor.documentEditorSettings.showRuler) {
    //         return;
    //     }
    //     const divRect: DOMRect = this.hRuler.getBoundingClientRect() as DOMRect;
    //     const leftMargin: number = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin
    //         * this.documentEditor.zoomFactor;
    //     const rightMargin: number = (HelperMethods.convertPixelToPoint(divRect.width) -
    //         this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * this.documentEditor.zoomFactor);
    //     let pixelValue: number = Math.round(e.clientX - divRect.left);
    //     let mouseXRelativeToDiv: number = HelperMethods.convertPixelToPoint(pixelValue);
    //     if (!this.isDragging) {
    //         if (this.documentEditor.isOnIndent) {
    //             this.hRuler.style.cursor = 'default';
    //             if (this.hRuler.hasAttribute('title')) {
    //                 this.hRuler.removeAttribute('title');
    //             }
    //             this.resizerEnabled = false;
    //         } else if (((leftMargin - 3) <= mouseXRelativeToDiv) && ((leftMargin + 3) >= mouseXRelativeToDiv)) {
    //             if (this.documentEditor.layoutType === 'Pages') {
    //                 this.hRuler.style.cursor = 'e-resize';
    //                 this.hRuler.setAttribute('title', this.locale.getConstant('Left Margin'));
    //                 this.resizerEnabled = true;
    //                 this.isLeftRulerMargin = true;
    //             }
    //         } else if ((((rightMargin - 3) <= mouseXRelativeToDiv) && ((rightMargin + 3) >= mouseXRelativeToDiv))) {
    //             if (this.documentEditor.layoutType === 'Pages') {
    //                 this.hRuler.style.cursor = 'e-resize';
    //                 this.hRuler.setAttribute('title', this.locale.getConstant('Right Margin'));
    //                 this.resizerEnabled = true;
    //                 this.isLeftRulerMargin = false;
    //             }
    //         } else if (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns.length > 0) {
    //             const columns: WColumnFormat[] = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns;
    //             if (this.documentEditor.layoutType === 'Pages') {
    //                 for (let i: number = 1; i <= columns.length; i++) {
    //                     const rulerMarginDiv: HTMLElement = document.getElementById(this.documentEditor.element.id + '_hRuler_Margin' + i);
    //                     const maginLeft: number = rulerMarginDiv.getBoundingClientRect().left;
    //                     const width: number = rulerMarginDiv.getBoundingClientRect().width;
    //                     if (((maginLeft - 3) <= e.clientX) && ((maginLeft + 3) >= e.clientX)) {
    //                         this.hRuler.style.cursor = 'e-resize';
    //                         this.multiColumnElement = rulerMarginDiv;
    //                         this.hRuler.setAttribute('title', this.locale.getConstant('Left Margin'));
    //                         this.isLeftMultiColumn = true;
    //                         this.resizerEnabled = true;
    //                         break;
    //                     } else if (((maginLeft + width - 3) <= e.clientX) && ((maginLeft + width + 3) >= e.clientX)) {
    //                         this.hRuler.style.cursor = 'e-resize';
    //                         this.multiColumnElement = rulerMarginDiv;
    //                         this.hRuler.setAttribute('title', this.locale.getConstant('Right Margin'));
    //                         this.isRightMultiColumn = true;
    //                         this.resizerEnabled = true;
    //                         break;
    //                     } else {
    //                         this.hRuler.style.cursor = 'default';
    //                         if (this.hRuler.hasAttribute('title')) {
    //                             this.hRuler.removeAttribute('title');
    //                         }
    //                         this.isLeftMultiColumn = false;
    //                         this.isRightMultiColumn = false;
    //                         this.resizerEnabled = false;
    //                     }
    //                 }
    //             }
    //         }
    //         else {
    //             this.hRuler.style.cursor = 'default';
    //             if (this.hRuler.hasAttribute('title')) {
    //                 this.hRuler.removeAttribute('title');
    //             }
    //             this.resizerEnabled = false;
    //         }
    //     }
    //     if (this.isDragging) {
    //         const rulerZeroPoint: number = HelperMethods.convertPointToPixel(
    //             1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
    //         const pageWidth: number = this.documentEditor.selectionModule.sectionFormat.pageWidth;
    //         const rightMarginValue: number = this.documentEditor.selectionModule.sectionFormat.rightMargin;
    //         let rightIndentValue: number = this.documentEditor.selectionModule.paragraphFormat.rightIndent;
    //         rightIndentValue = rightIndentValue > 0 ? rightIndentValue : 0;
    //         const minimumValue: number = 42;
    //         let firstLineIndent: number = this.documentEditor.selectionModule.paragraphFormat.firstLineIndent;
    //         const leftMarginValue: number = this.documentEditor.selectionModule.sectionFormat.leftMargin;
    //         firstLineIndent = firstLineIndent >= 0 ? firstLineIndent : 0;
    //         const leftIndent: number = this.documentEditor.selectionModule.paragraphFormat.leftIndent;
    //         if (this.isLeftRulerMargin) {
    //             const leftMaxLimit: number = rulerZeroPoint + (
    //                 HelperMethods.convertPointToPixel(pageWidth - rightMarginValue -
    //                     rightIndentValue - minimumValue - firstLineIndent - leftIndent) * this.documentEditor.zoomFactor);
    //             const leftMinLimit: number = rulerZeroPoint;
    //             if (pixelValue + rulerZeroPoint > leftMaxLimit) {
    //                 pixelValue = leftMaxLimit - rulerZeroPoint;
    //                 mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
    //             } else if (pixelValue + rulerZeroPoint < leftMinLimit) {
    //                 pixelValue = leftMinLimit - rulerZeroPoint;
    //                 mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
    //             }
    //         } else {
    //             const rightMinLimit: number = rulerZeroPoint + (HelperMethods.convertPointToPixel(
    //                 leftMarginValue + leftIndent + firstLineIndent + minimumValue + rightIndentValue) * this.documentEditor.zoomFactor);
    //             const rightMaxLimit: number = rulerZeroPoint + (HelperMethods.convertPointToPixel(
    //                 pageWidth) * this.documentEditor.zoomFactor);
    //             if (pixelValue + rulerZeroPoint > rightMaxLimit) {
    //                 pixelValue = rightMaxLimit - rulerZeroPoint;
    //                 mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
    //             } else if (pixelValue + rulerZeroPoint < rightMinLimit) {
    //                 pixelValue = rightMinLimit - rulerZeroPoint;
    //                 mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
    //             }
    //         }
    //         this.finalmouseXRelativeToDiv = mouseXRelativeToDiv;
    //         const currentRightMargin: number = (HelperMethods.convertPixelToPoint(divRect.width)
    //             - (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * this.documentEditor.zoomFactor));
    //         if (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.numberOfColumns <= 1) {
    //             this.resizeRulerMargins(this.isLeftRulerMargin, this.initialValue,
    //                 this.currentScrollLeft, currentRightMargin, this.hRuler, mouseXRelativeToDiv, true, this.documentEditor);
    //         }
    //         const rightIndent: HTMLElement = document.getElementById(this.documentEditor.element.id + '_rightIndent');
    //         if (this.isLeftRulerMargin) {
    //             const difference: number = mouseXRelativeToDiv - this.initialValue;
    //             rightIndent.style.left = (this.initialRightMargin - HelperMethods.convertPointToPixel(difference)) + 'px';
    //         } else {
    //             const difference: number = mouseXRelativeToDiv - this.initialValue;
    //             rightIndent.style.left = (this.initialRightMargin + HelperMethods.convertPointToPixel(difference)) + 'px';
    //         }
    //         const startValue: number = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
    //         const indicatorLineValue: number = startValue + pixelValue;
    //         const lineSvg: HTMLElement = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
    //         lineSvg.style.left = indicatorLineValue + 'px';
    //     }
    // }
    RulerHelper.prototype.onHRulerMouseEnter = function () {
        if (!isNullOrUndefined(this.currentTabStopElement)) {
            this.currentTabStopElement.style.display = 'block';
        }
    };
    RulerHelper.prototype.onHRulerMouseLeave = function () {
        if (!isNullOrUndefined(this.currentTabStopElement)) {
            this.currentTabStopElement.style.display = 'none';
            //this.currentTabStopElement = undefined;
        }
    };
    RulerHelper.prototype.onRulerDblClick = function () {
        this.documentEditor.showDialog('PageSetup');
    };
    RulerHelper.prototype.onHRulerMouseDown = function (e) {
        if (this.resizerEnabled && !this.documentEditor.isTableMarkerDragging) {
            this.isDraggingRender = true;
            if (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns.length > 0) {
                if (this.isLeftMultiColumn) {
                    this.columnInitialValue = this.multiColumnElement.getBoundingClientRect().left;
                }
                else if (this.isRightMultiColumn) {
                    this.columnInitialValue = this.multiColumnElement.getBoundingClientRect().left
                        + this.multiColumnElement.getBoundingClientRect().width;
                }
            }
            var divRect_1 = this.hRuler.getBoundingClientRect();
            this.renderInitialValue = HelperMethods.convertPixelToPoint(Math.round(e.clientX - divRect_1.left));
            this.currentScrollLeft = this.hRuler.scrollLeft;
            var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
            this.initialRightMargin = HelperMethods.getNumberFromString(rightIndent.style.left);
            var pixelValue = Math.round(e.clientX - divRect_1.left);
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            var indicatorLineValue = startValue + pixelValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
            lineSvg.style.display = 'block';
        }
        var divRect = this.hRuler.getBoundingClientRect();
        if (divRect.y + (divRect.height / 2) <= e.clientY) {
            this.mouseDownTabValue = e.clientX - this.hRuler.getBoundingClientRect().left;
            if (this.documentEditor.layoutType === 'Pages') {
                this.mouseDownTabValue = HelperMethods.convertPixelToPoint(this.mouseDownTabValue - HelperMethods.convertPointToPixel(this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin) *
                    this.documentEditor.zoomFactor);
                if (this.position.paragraph.paragraphFormat.bidi) {
                    var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
                    paraWidth = HelperMethods.convertPixelToPoint(paraWidth * this.documentEditor.zoomFactor);
                    this.mouseDownTabValue = paraWidth - this.mouseDownTabValue;
                }
            }
            else if (this.documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    this.mouseDownTabValue = HelperMethods.convertPixelToPoint((this.mouseDownTabValue) - 20);
                    var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
                    paraWidth = HelperMethods.convertPixelToPoint(paraWidth * this.documentEditor.zoomFactor);
                    this.mouseDownTabValue = paraWidth - this.mouseDownTabValue;
                }
                else {
                    this.mouseDownTabValue = HelperMethods.convertPixelToPoint((this.mouseDownTabValue) - 20);
                }
            }
        }
    };
    RulerHelper.prototype.onHRulerMouseUp = function (e) {
        var container = document.getElementById(this.documentEditor.element.id + '_markIndicator');
        var divRect = this.hRuler.getBoundingClientRect();
        if (divRect.y + (divRect.height / 2) <= e.clientY) {
            this.mouseUpTabValue = e.clientX - this.hRuler.getBoundingClientRect().left;
            if (this.documentEditor.layoutType === 'Pages') {
                this.mouseUpTabValue = HelperMethods.convertPixelToPoint(this.mouseUpTabValue -
                    HelperMethods.convertPointToPixel(this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin)
                        * this.documentEditor.zoomFactor);
                if (this.position.paragraph.paragraphFormat.bidi) {
                    var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
                    paraWidth = HelperMethods.convertPixelToPoint(paraWidth * this.documentEditor.zoomFactor);
                    this.mouseUpTabValue = paraWidth - this.mouseUpTabValue;
                }
            }
            else if (this.documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    this.mouseUpTabValue = HelperMethods.convertPixelToPoint((this.mouseUpTabValue) - 20);
                    var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
                    paraWidth = HelperMethods.convertPixelToPoint(paraWidth * this.documentEditor.zoomFactor);
                    this.mouseUpTabValue = paraWidth - this.mouseUpTabValue;
                }
                else {
                    this.mouseUpTabValue = HelperMethods.convertPixelToPoint((this.mouseUpTabValue) - 20);
                }
            }
            var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
            var rightIndentValue = HelperMethods.getNumberFromString(rightIndent.style.left);
            var maxValue = rightIndentValue;
            if (this.mouseUpTabValue > 0 && this.mouseUpTabValue < maxValue && this.mouseDownTabValue === this.mouseUpTabValue) {
                if (!isNullOrUndefined(container)) {
                    var visibleElement = container.querySelector('.e-de-ruler-marker[style*="display: block;"]');
                    if (!isNullOrUndefined(visibleElement)) {
                        this.mouseUpTabValue /= this.documentEditor.zoomFactor;
                        var dataNameValue = visibleElement.getAttribute('data-name');
                        if (dataNameValue === 'LeftTab' || dataNameValue === 'CenterTab'
                            || dataNameValue === 'RightTab' || dataNameValue === 'DecimalTab' || dataNameValue === 'BarTab') {
                            var tabStop = new WTabStop();
                            tabStop.position = this.mouseUpTabValue;
                            tabStop.tabJustification = this.getTabJustification(dataNameValue);
                            tabStop.deletePosition = 0;
                            tabStop.tabLeader = 'None';
                            this.documentEditor.editorModule.onApplyParagraphFormat('tabStop', [tabStop], false, false);
                        }
                        else if (dataNameValue === 'FirstLineIndent' || dataNameValue === 'HangingIndent') {
                            var property = 'firstLineIndent';
                            if (dataNameValue === 'HangingIndent') {
                                var initialValue = this.documentEditor.selectionModule.paragraphFormat.firstLineIndent;
                                var differenceValue = this.mouseUpTabValue + initialValue;
                                var currentValue = this.documentEditor.selectionModule.start.paragraph.paragraphFormat.firstLineIndent;
                                this.documentEditor.editorModule.onApplyParagraphFormat('firstLineIndent', currentValue - differenceValue, false, false);
                                var leftIndentCurrentValue = this.documentEditor.selectionModule.start.paragraph.paragraphFormat.leftIndent + currentValue;
                                currentValue = currentValue - differenceValue;
                                this.documentEditor.editorModule.onApplyParagraphFormat('leftIndent', leftIndentCurrentValue - currentValue, false, false, true);
                            }
                            else {
                                this.documentEditor.editorModule.onApplyParagraphFormat(property, this.mouseDownTabValue, false, false);
                            }
                        }
                    }
                }
            }
        }
    };
    RulerHelper.prototype.onRularMouseUp = function (e) {
        if (this.isDraggingRender && !this.documentEditor.isTableMarkerDragging) {
            var divRect = this.hRuler.getBoundingClientRect();
            var mouseXRelativeToDiv = this.finalmouseXRelativeToDiv; // HelperMethods.convertPixelToPoint(Math.round(e.clientX - divRect.left));
            // const currentLeftMargin = documentEditor.hRuler.startMargin * documentEditor.zoomFactor;
            // const currentScrollLeft = hRuler.scrollLeft;
            // const currentRightMargin = (HelperMethods.convertPixelToPoint(divRect.width) - (documentEditor.selection.end.paragraph.bodyWidget.sectionFormat.rightMargin * documentEditor.zoomFactor));
            // resizeRulerMargins(isLeftRulerMargin, currentLeftMargin, currentScrollLeft, currentRightMargin, hRuler, mouseXRelativeToDiv, true, documentEditor);
            // if (hRuler) {
            //     rulerObj.scrollLeft = rulerObj.scrollLeft - HelperMethods.convertPointToPixel((documentEditor.hRuler.leftMargin < mouseXRelativeToDiv) ? (mouseXRelativeToDiv - documentEditor.hRuler.leftMargin) : (documentEditor.hRuler.leftMargin - mouseXRelativeToDiv));
            // }
            // updateRuler(documentEditor, documentEditor.hRuler, true);
            if (this.isLeftMultiColumn || this.isRightMultiColumn) {
                var finalvalue = 0;
                finalvalue = e.clientX - this.columnInitialValue;
                var secFormat = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.cloneFormat();
                var pageWidth = this.documentEditor.selectionModule.sectionFormat.pageWidth
                    - this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin -
                    this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin;
                var columnSpace = this.isLeftMultiColumn ? (secFormat.columns[0].space +
                    ((HelperMethods.convertPixelToPoint(finalvalue))))
                    : (secFormat.columns[0].space - ((HelperMethods.convertPixelToPoint(finalvalue))));
                for (var i = 0; i < secFormat.columns.length; i++) {
                    var col = secFormat.columns[parseInt(i.toString(), 10)];
                    if (columnSpace >= 0 && col.width >= 36) {
                        var widthCal = HelperMethods.convertPointToPixel((pageWidth - (HelperMethods.convertPixelToPoint(columnSpace) * (secFormat.numberOfColumns - 1))) / (secFormat.numberOfColumns));
                        col.width = widthCal;
                        if (i < secFormat.columns.length - 1) {
                            col.space = columnSpace;
                        }
                    }
                    else {
                        col[0].space = col[1].space;
                    }
                }
                this.documentEditor.editorModule.onApplySectionFormat(undefined, secFormat);
                this.isLeftMultiColumn = false;
                this.isRightMultiColumn = false;
            }
            else if (this.isLeftRulerMargin) {
                this.documentEditor.hRuler.startMargin = (mouseXRelativeToDiv / this.documentEditor.zoomFactor);
                this.documentEditor.selectionModule.sectionFormat.leftMargin = mouseXRelativeToDiv / this.documentEditor.zoomFactor;
            }
            else {
                var rightMargin = HelperMethods.convertPixelToPoint(this.rulerGeometry.width) - (mouseXRelativeToDiv / this.documentEditor.zoomFactor);
                // documentEditor.hRuler.endMargin = rightMargin;
                this.documentEditor.selectionModule.sectionFormat.rightMargin = rightMargin;
            }
            this.resizerEnabled = false;
            this.isDraggingRender = false;
            this.isLeftRulerMargin = undefined;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
        }
    };
    RulerHelper.prototype.onVMouseMove = function (e) {
        if (this.documentEditor.isDestroyed || !this.documentEditor.documentEditorSettings.showRuler) {
            return;
        }
        var divRect = this.vRuler.getBoundingClientRect();
        var topMargin = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin
            * this.documentEditor.zoomFactor;
        var bottomMargin = (HelperMethods.convertPixelToPoint(divRect.height) - this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin
            * this.documentEditor.zoomFactor);
        var mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(Math.round(e.clientY - divRect.top));
        var pixelValue = Math.round(e.clientY - divRect.top);
        if (!this.isDraggingRender) {
            if (((topMargin - 3) <= mouseXRelativeToDiv) && ((topMargin + 3) >= mouseXRelativeToDiv)) {
                this.vRuler.style.cursor = 'n-resize';
                this.vRuler.setAttribute('title', this.locale.getConstant('Top Margin'));
                this.resizerEnabled = true;
                this.isTopRulerMargin = true;
            }
            else if ((((bottomMargin - 3) <= mouseXRelativeToDiv) && ((bottomMargin + 3) >= mouseXRelativeToDiv))) {
                this.vRuler.style.cursor = 'n-resize';
                this.vRuler.setAttribute('title', this.locale.getConstant('Bottom Margin'));
                this.resizerEnabled = true;
                this.isTopRulerMargin = false;
            }
            else {
                this.vRuler.style.cursor = 'default';
                if (this.vRuler.hasAttribute('title')) {
                    this.vRuler.removeAttribute('title');
                }
                this.resizerEnabled = false;
            }
        }
        if (this.isDraggingRender) {
            var mouseXRelativeToDiv_1 = HelperMethods.convertPixelToPoint(Math.round(e.clientY - divRect.top));
            var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.topMargin)
                * this.documentEditor.zoomFactor;
            var pageHeight = this.documentEditor.selectionModule.sectionFormat.pageHeight;
            var minimumValue = 12;
            var bottomMarginValue = this.documentEditor.selectionModule.sectionFormat.bottomMargin;
            var topMarginValue = this.documentEditor.selectionModule.sectionFormat.topMargin;
            if (this.isTopRulerMargin) {
                var topMinLimit = rulerZeroPoint;
                var topMaxLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(pageHeight - bottomMarginValue - minimumValue) * this.documentEditor.zoomFactor);
                if (pixelValue + rulerZeroPoint > topMaxLimit) {
                    pixelValue = topMaxLimit - rulerZeroPoint;
                    mouseXRelativeToDiv_1 = HelperMethods.convertPixelToPoint(pixelValue);
                }
                else if (pixelValue + rulerZeroPoint < topMinLimit) {
                    pixelValue = topMinLimit - rulerZeroPoint;
                    mouseXRelativeToDiv_1 = HelperMethods.convertPixelToPoint(pixelValue);
                }
            }
            else {
                var bottomMinLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(topMarginValue + minimumValue) * this.documentEditor.zoomFactor);
                var bottomMaxLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(pageHeight) * this.documentEditor.zoomFactor);
                if (pixelValue + rulerZeroPoint > bottomMaxLimit) {
                    pixelValue = bottomMaxLimit - rulerZeroPoint;
                    mouseXRelativeToDiv_1 = HelperMethods.convertPixelToPoint(pixelValue);
                }
                else if (pixelValue + rulerZeroPoint < bottomMinLimit) {
                    pixelValue = bottomMinLimit - rulerZeroPoint;
                    mouseXRelativeToDiv_1 = HelperMethods.convertPixelToPoint(pixelValue);
                }
            }
            var currentBottomMargin = (HelperMethods.convertPixelToPoint(divRect.height) -
                (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin * this.documentEditor.zoomFactor));
            this.resizeVRulerMargins(this.isTopRulerMargin, this.initialYValue, this.currentScrollTop, currentBottomMargin, this.vRuler, mouseXRelativeToDiv_1, this.documentEditor);
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.y * this.documentEditor.zoomFactor;
            var indicatorLineValue = startValue + pixelValue; // + 15;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_vRuler_indicator_svg');
            lineSvg.style.top = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onVMouseDown = function (e) {
        if (this.resizerEnabled) {
            this.isDraggingRender = true;
            var divRect = this.vRuler.getBoundingClientRect();
            this.initialYValue = HelperMethods.convertPixelToPoint(Math.round(e.clientY - divRect.top));
            this.currentScrollTop = this.vRuler.scrollTop;
            var pixelValue = Math.round(e.clientY - divRect.top);
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_vRuler_indicator_svg');
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.y * this.documentEditor.zoomFactor;
            var indicatorLineValue = (startValue + pixelValue); // + 15;
            lineSvg.style.top = indicatorLineValue + 'px';
            lineSvg.style.display = 'block';
        }
    };
    RulerHelper.prototype.onVMouseUp = function (e) {
        if (this.isDraggingRender) {
            var divRect = this.vRuler.getBoundingClientRect();
            var mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(Math.round(e.clientY - divRect.top));
            // const currentTopMargin = documentEditor.hRuler.startMargin * documentEditor.zoomFactor;
            // const currentScrollTop = vRuler.scrollTop;
            // const currentBottomMargin = (HelperMethods.convertPixelToPoint(divRect.height) - (documentEditor.selection.end.paragraph.bodyWidget.sectionFormat.bottomMargin * documentEditor.zoomFactor));
            // resizeVRulerMargins(isTopRulerMargin, currentTopMargin, currentScrollTop, currentBottomMargin, vRuler, mouseXRelativeToDiv, documentEditor);
            // if (hRuler) {
            //     rulerObj.scrollLeft = rulerObj.scrollLeft - HelperMethods.convertPointToPixel((documentEditor.hRuler.leftMargin < mouseXRelativeToDiv) ? (mouseXRelativeToDiv - documentEditor.hRuler.leftMargin) : (documentEditor.hRuler.leftMargin - mouseXRelativeToDiv));
            // }
            // updateRuler(documentEditor, documentEditor.hRuler, true);
            if (this.isTopRulerMargin) {
                this.documentEditor.vRuler.startMargin = (mouseXRelativeToDiv / this.documentEditor.zoomFactor);
                this.documentEditor.selectionModule.sectionFormat.topMargin = mouseXRelativeToDiv / this.documentEditor.zoomFactor;
            }
            else {
                var bottomtMargin = HelperMethods.convertPixelToPoint(this.rulerGeometry.height) - (mouseXRelativeToDiv / this.documentEditor.zoomFactor);
                this.documentEditor.vRuler.endMargin = bottomtMargin;
                this.documentEditor.selectionModule.sectionFormat.bottomMargin = bottomtMargin;
            }
            this.resizerEnabled = false;
            this.isDraggingRender = false;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_vRuler_indicator_svg');
            lineSvg.style.display = 'none';
            this.isTopRulerMargin = undefined;
        }
    };
    RulerHelper.prototype.onDocumentIntentTrue = function () {
        this.documentEditor.isOnIndent = true;
    };
    RulerHelper.prototype.onDocumentIntentFalse = function () {
        this.documentEditor.isOnIndent = false;
    };
    RulerHelper.prototype.onDoubleClick = function (event) {
        this.documentEditor.showDialog('Paragraph');
        event.stopPropagation();
    };
    RulerHelper.prototype.onFirstLineIndentMouseDown = function (e) {
        this.isDraggingIndents1 = true;
        this.firstLineOffset = e.clientX - this.firstLineIndent.getBoundingClientRect().left;
        this.indentInitialValue = HelperMethods.getNumberFromString(this.firstLineIndent.style.left);
        var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
        if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
            rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                    this.documentEditor.selectionModule.sectionFormat.leftMargin -
                    this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
        }
        if (this.documentEditor.layoutType === 'Continuous') {
            rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                    20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
            }
        }
        var value = rulerZeroPoint + e.clientX - this.firstLineOffset - this.hRuler.getBoundingClientRect().left;
        var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
        startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
        var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
        var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
        lineSvg.style.left = indicatorLineValue + 'px';
        lineSvg.style.display = 'block';
        e.stopPropagation();
    };
    RulerHelper.prototype.onIndentMouseMove = function (e) {
        if (this.isDraggingIndents1) {
            var rulerZeroPoint = void 0;
            var maxValue = void 0;
            var minValue = void 0;
            var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
            var rightIndentValue = HelperMethods.getNumberFromString(rightIndent.style.left);
            if (this.documentEditor.layoutType === 'Pages') {
                if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                            this.documentEditor.selectionModule.sectionFormat.leftMargin -
                            this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                    maxValue = rulerZeroPoint - 6 + (HelperMethods.convertPointToPixel(this.documentEditor.selectionModule.sectionFormat.pageWidth) * this.documentEditor.zoomFactor);
                    minValue = rightIndentValue + HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor;
                }
                else {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin)
                        * this.documentEditor.zoomFactor;
                    minValue = rulerZeroPoint - 6;
                    maxValue = rightIndentValue - HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor;
                }
            }
            else if (this.documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                        20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                    maxValue = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20 + 40 - 6;
                    minValue = rightIndentValue + (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                }
                else {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                    minValue = rulerZeroPoint - 6;
                    maxValue = rightIndentValue - (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                }
            }
            var value = rulerZeroPoint + e.clientX - this.firstLineOffset - this.hRuler.getBoundingClientRect().left;
            if (value < minValue) {
                value = minValue;
            }
            else if (value > maxValue) {
                value = maxValue;
            }
            this.firstLineIndent.style.left = value + 'px';
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
            var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onIndentMouseUp = function (e) {
        if (this.isDraggingIndents1) {
            this.isDraggingIndents1 = false;
            var finalValue = HelperMethods.getNumberFromString(this.firstLineIndent.style.left);
            if (parseInt(this.firstLineIndent.style.left.replace('px', ''), 10) < 0) {
                finalValue *= -1;
            }
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                this.documentEditor.editorModule.applyRulerMarkerValues('firstLineIndent', finalValue, this.indentInitialValue);
            }
            else {
                this.documentEditor.editorModule.applyRulerMarkerValues('firstLineIndent', this.indentInitialValue, finalValue);
            }
            this.indentInitialValue = finalValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
        }
    };
    RulerHelper.prototype.onHangIndentMouseDown = function (e) {
        this.isDraggingIndents2 = true;
        this.hangingLineOffset = e.clientX - this.hangingIndent.getBoundingClientRect().left;
        this.hangingIndentInitialValue = HelperMethods.getNumberFromString(this.hangingIndent.style.left);
        var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
        var rightPosition = HelperMethods.getNumberFromString(rightIndent.style.left);
        var rulerZeroPoint;
        if (this.documentEditor.layoutType === 'Pages') {
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                    (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                        this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                this.minLimit1 = rightPosition + (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                this.maxLimit1 = rulerZeroPoint - 6 + (HelperMethods.convertPointToPixel(this.documentEditor.selectionModule.sectionFormat.pageWidth) * this.documentEditor.zoomFactor);
            }
            else {
                rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
                this.minLimit1 = rulerZeroPoint - 6;
                this.maxLimit1 = (rightPosition - HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
            }
        }
        else if (this.documentEditor.layoutType === 'Continuous') {
            if (this.position.paragraph.paragraphFormat.bidi) {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                    20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                this.maxLimit1 = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20 + 40 - 6;
                this.minLimit1 = rightPosition + (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
            }
            else {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                this.minLimit1 = rulerZeroPoint - 6;
                this.maxLimit1 = (rightPosition - HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
            }
        }
        this.leftIndent1 = document.getElementById(this.documentEditor.element.id + '_leftIndent');
        var value = rulerZeroPoint + e.clientX - this.hangingLineOffset - this.hRuler.getBoundingClientRect().left;
        var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
        startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
        var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
        var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
        lineSvg.style.left = indicatorLineValue + 'px';
        lineSvg.style.display = 'block';
        e.stopPropagation();
    };
    RulerHelper.prototype.onHangIndentMouseMove = function (e) {
        if (this.isDraggingIndents2) {
            var rulerZeroPoint = void 0;
            if (this.documentEditor.layoutType === 'Pages') {
                if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                            this.documentEditor.selectionModule.sectionFormat.leftMargin -
                            this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                }
                else {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
                }
            }
            else if (this.documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                        20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                }
                else {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                }
            }
            var value = rulerZeroPoint + e.clientX - this.hangingLineOffset - this.hRuler.getBoundingClientRect().left;
            if ((value) > this.maxLimit1) {
                value = this.maxLimit1;
            }
            else if (value < this.minLimit1) {
                value = this.minLimit1;
            }
            this.leftIndent1.style.left = value + 'px';
            this.hangingIndent.style.left = value + 'px';
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
            var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onHangIndentMouseUp = function (e) {
        if (this.isDraggingIndents2) {
            this.isDraggingIndents2 = false;
            var finalValue = HelperMethods.getNumberFromString(this.hangingIndent.style.left);
            if (parseInt(this.hangingIndent.style.left.replace('px', ''), 10) < 0) {
                finalValue *= -1;
            }
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                this.documentEditor.editorModule.applyRulerMarkerValues('hangingIndent', finalValue, this.hangingIndentInitialValue);
            }
            else {
                this.documentEditor.editorModule.applyRulerMarkerValues('hangingIndent', this.hangingIndentInitialValue, finalValue);
            }
            this.hangingIndentInitialValue = finalValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
        }
    };
    RulerHelper.prototype.onLeftIndentMouseDown = function (e) {
        var rulerZeroPoint;
        this.isDraggingIndents3 = true;
        this.leftLineOffset = e.clientX - this.leftIndent.getBoundingClientRect().left;
        this.indentInitialValue = HelperMethods.getNumberFromString(this.leftIndent.style.left);
        this.firstIndentInitialValue = HelperMethods.getNumberFromString(this.firstLineIndent.style.left);
        this.diff = this.firstIndentInitialValue - this.indentInitialValue;
        this.firstLineIndent = document.getElementById(this.documentEditor.element.id + '_firstLineIndent');
        var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
        var rightPosition = HelperMethods.getNumberFromString(rightIndent.style.left);
        if (this.documentEditor.layoutType === 'Pages') {
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                    (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                        this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                this.minLimit2 = (rightPosition + HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                this.maxLimit2 = rulerZeroPoint - 6 + (HelperMethods.convertPointToPixel(this.documentEditor.selectionModule.sectionFormat.pageWidth) * this.documentEditor.zoomFactor);
                this.isHangingIndent = (HelperMethods.getNumberFromString(this.hangingIndent.style.left) - rightPosition)
                    <= (HelperMethods.getNumberFromString(this.firstLineIndent.style.left) - rightPosition);
            }
            else {
                rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
                this.minLimit2 = rulerZeroPoint - 6;
                this.maxLimit2 = (rightPosition - HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                this.isHangingIndent = (rightPosition - HelperMethods.getNumberFromString(this.hangingIndent.style.left))
                    <= (rightPosition - HelperMethods.getNumberFromString(this.firstLineIndent.style.left));
            }
        }
        else if (this.documentEditor.layoutType === 'Continuous') {
            if (this.position.paragraph.paragraphFormat.bidi) {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                    20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                this.maxLimit2 = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20 + 40 - 6;
                this.minLimit2 = rightPosition + (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                this.isHangingIndent = (HelperMethods.getNumberFromString(this.hangingIndent.style.left) - rightPosition)
                    <= (HelperMethods.getNumberFromString(this.firstLineIndent.style.left) - rightPosition);
            }
            else {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                this.minLimit2 = rulerZeroPoint - 6;
                this.maxLimit2 = (rightPosition - HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                this.isHangingIndent = (rightPosition - HelperMethods.getNumberFromString(this.hangingIndent.style.left))
                    <= (rightPosition - HelperMethods.getNumberFromString(this.firstLineIndent.style.left));
            }
        }
        var value = rulerZeroPoint + e.clientX - this.leftLineOffset - this.hRuler.getBoundingClientRect().left;
        var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
        startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
        var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
        var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
        lineSvg.style.left = indicatorLineValue + 'px';
        lineSvg.style.display = 'block';
        e.stopPropagation();
    };
    RulerHelper.prototype.onLeftIndentMouseMove = function (e) {
        if (this.isDraggingIndents3) {
            var rulerZeroPoint = void 0;
            var value = void 0;
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                if (this.documentEditor.layoutType === 'Pages') {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                            this.documentEditor.selectionModule.sectionFormat.leftMargin
                            - this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                }
                else if (this.documentEditor.layoutType === 'Continuous') {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                        20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                }
                value = rulerZeroPoint + e.clientX - this.leftLineOffset - this.hRuler.getBoundingClientRect().left;
                if (this.isHangingIndent) {
                    if ((value + this.diff) > this.maxLimit2) {
                        value = this.maxLimit2 - this.diff;
                    }
                }
                else {
                    if ((value) > this.maxLimit2) {
                        value = this.maxLimit2;
                    }
                }
                if (this.isHangingIndent) {
                    if (value < this.minLimit2) {
                        value = this.minLimit2;
                    }
                }
                else {
                    if ((value + this.diff) < this.minLimit2) {
                        value = this.minLimit2 - this.diff;
                    }
                }
            }
            else {
                if (this.documentEditor.layoutType === 'Pages') {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
                }
                else if (this.documentEditor.layoutType === 'Continuous') {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                }
                value = rulerZeroPoint + e.clientX - this.leftLineOffset - this.hRuler.getBoundingClientRect().left;
                if (this.isHangingIndent) {
                    if ((value) > this.maxLimit2) {
                        value = this.maxLimit2;
                    }
                }
                else {
                    if ((value + this.diff) > this.maxLimit2) {
                        value = this.maxLimit2 - this.diff;
                    }
                }
                if (this.isHangingIndent) {
                    if ((value + this.diff) < this.minLimit2) {
                        value = this.minLimit2 - this.diff;
                    }
                }
                else {
                    if (value < this.minLimit2) {
                        value = this.minLimit2;
                    }
                }
            }
            this.hangingIndent.style.left = value + 'px';
            this.leftIndent.style.left = value + 'px';
            this.firstLineIndent.style.left = (this.firstIndentInitialValue + (value - this.indentInitialValue)) + 'px';
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
            var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onLeftIndentMouseUp = function (e) {
        if (this.isDraggingIndents3) {
            this.isDraggingIndents3 = false;
            var finalValue = HelperMethods.getNumberFromString(this.leftIndent.style.left);
            if (parseInt(this.leftIndent.style.left.replace('px', ''), 10) < 0) {
                finalValue *= -1;
            }
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                this.documentEditor.editorModule.applyRulerMarkerValues('leftIndent', finalValue, this.indentInitialValue);
            }
            else {
                this.documentEditor.editorModule.applyRulerMarkerValues('leftIndent', this.indentInitialValue, finalValue);
            }
            this.indentInitialValue = finalValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
        }
    };
    RulerHelper.prototype.onRightIndentMouseDown = function (e) {
        this.isDraggingIndents4 = true;
        this.rightLineOffset = e.clientX - this.rightIndent.getBoundingClientRect().left;
        this.indentInitialValue = HelperMethods.getNumberFromString(this.rightIndent.style.left);
        var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
        if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
            rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                (this.documentEditor.selectionModule.sectionFormat.pageWidth - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                    this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
        }
        if (this.documentEditor.layoutType === 'Continuous') {
            rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                    20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
            }
        }
        var value = rulerZeroPoint + e.clientX - this.rightLineOffset - this.hRuler.getBoundingClientRect().left;
        var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
        startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
        var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
        var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
        lineSvg.style.left = indicatorLineValue + 'px';
        lineSvg.style.display = 'block';
        e.stopPropagation();
    };
    RulerHelper.prototype.onRightIndentMouseMove = function (e) {
        if (this.isDraggingIndents4) {
            var rulerZeroPoint = void 0;
            var value = void 0;
            var leftIndent = document.getElementById(this.documentEditor.element.id + '_leftIndent');
            var firstLineIndent = document.getElementById(this.documentEditor.element.id + '_firstLineIndent');
            var maxValue = void 0;
            var minValue = void 0;
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                if (this.documentEditor.layoutType === 'Pages') {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin -
                        (this.documentEditor.selectionModule.sectionFormat.pageWidth -
                            this.documentEditor.selectionModule.sectionFormat.leftMargin -
                            this.documentEditor.selectionModule.sectionFormat.rightMargin)) * this.documentEditor.zoomFactor;
                }
                else if (this.documentEditor.layoutType === 'Continuous') {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor)
                        - 20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                }
                value = rulerZeroPoint + e.clientX - this.rightLineOffset - this.hRuler.getBoundingClientRect().left;
                var nearestElement = (HelperMethods.getNumberFromString(leftIndent.style.left) - value) <= (HelperMethods.getNumberFromString(firstLineIndent.style.left) - value) ? leftIndent : firstLineIndent;
                var indentValue = HelperMethods.getNumberFromString(nearestElement.style.left);
                maxValue = indentValue - (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
                minValue = rulerZeroPoint - 6;
            }
            else {
                if (this.documentEditor.layoutType === 'Pages') {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
                }
                else if (this.documentEditor.layoutType === 'Continuous') {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                }
                value = rulerZeroPoint + e.clientX - this.rightLineOffset - this.hRuler.getBoundingClientRect().left;
                var nearestElement = (value - HelperMethods.getNumberFromString(leftIndent.style.left))
                    <= (value - HelperMethods.getNumberFromString(firstLineIndent.style.left)) ? leftIndent : firstLineIndent;
                var indentValue = HelperMethods.getNumberFromString(nearestElement.style.left);
                maxValue = rulerZeroPoint + (this.documentEditor.documentHelper.currentPage.boundingRectangle.width
                    * this.documentEditor.zoomFactor) - 6;
                minValue = indentValue + (HelperMethods.convertPointToPixel(42) * this.documentEditor.zoomFactor);
            }
            if (value < minValue) {
                value = minValue;
            }
            else if (value > maxValue) {
                value = maxValue;
            }
            this.rightIndent.style.left = value + 'px';
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
            var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onRightIndentMouseUp = function (e) {
        if (this.isDraggingIndents4) {
            this.isDraggingIndents4 = false;
            var finalValue = HelperMethods.getNumberFromString(this.rightIndent.style.left);
            if (this.documentEditor.selectionModule.paragraphFormat.bidi) {
                this.documentEditor.editorModule.applyRulerMarkerValues('rightIndent', this.indentInitialValue, finalValue);
            }
            else {
                this.documentEditor.editorModule.applyRulerMarkerValues('rightIndent', finalValue, this.indentInitialValue);
            }
            this.indentInitialValue = finalValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
        }
    };
    RulerHelper.prototype.onTabStopMouseDown = function (e) {
        e.stopPropagation();
        this.isDraggingForTab = true;
        this.tabStopOffset = e.clientX - this.tabStopElement.getBoundingClientRect().left;
        this.tabInitialValue = HelperMethods.getNumberFromString(this.tabStopElement.style.left);
        this.tabIndex = parseInt(this.tabStopElement.id.split('_')[this.tabStopElement.id.split('_').length - 1], 10);
        this.currentTabStop = this.currrentParagraph.paragraphFormat.tabs[parseInt(this.tabIndex.toString(), 10)];
        this.currentTabStopElement = this.tabStopElement;
        var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin)
            * this.documentEditor.zoomFactor;
        if (this.documentEditor.layoutType === 'Continuous') {
            rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
            if (this.position.paragraph.paragraphFormat.bidi) {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor)
                    - 20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
            }
        }
        var value = rulerZeroPoint + e.clientX - this.tabStopOffset - this.hRuler.getBoundingClientRect().left;
        var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
        startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
        var indicatorLineValue = startValue + (value - rulerZeroPoint);
        var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
        lineSvg.style.left = indicatorLineValue + 'px';
        lineSvg.style.display = 'block';
    };
    RulerHelper.prototype.onTabStopMouseUp = function (e) {
        if (!isNullOrUndefined(this.currentTabStopElement)) {
            this.currentTabStopElement = undefined;
        }
    };
    RulerHelper.prototype.onTabStopMouseMove = function (e) {
        if (this.isDraggingForTab) {
            var rulerZeroPoint = void 0;
            if (this.documentEditor.layoutType === 'Continuous') {
                rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) - 20;
                if (this.position.paragraph.paragraphFormat.bidi) {
                    rulerZeroPoint = (this.documentEditor.hRuler.zeroPosition * this.documentEditor.zoomFactor) -
                        20 - (this.documentEditor.viewer.clientArea.width * this.documentEditor.zoomFactor);
                }
            }
            else if (this.documentEditor.layoutType === 'Pages') {
                rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin)
                    * this.documentEditor.zoomFactor;
                if (this.position.paragraph.bidi) {
                    rulerZeroPoint = HelperMethods.convertPointToPixel(1584 + this.documentEditor.selectionModule.sectionFormat.rightMargin
                        - this.documentEditor.selectionModule.sectionFormat.pageWidth) * this.documentEditor.zoomFactor;
                }
            }
            var value = rulerZeroPoint + e.clientX - this.tabStopOffset - this.hRuler.getBoundingClientRect().left;
            var minValue = rulerZeroPoint;
            var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
            var rightIndentValue = HelperMethods.getNumberFromString(rightIndent.style.left);
            var maxValue = rightIndentValue;
            var leftIndent = document.getElementById(this.documentEditor.element.id + '_leftIndent');
            var leftIndentValue = HelperMethods.getNumberFromString(leftIndent.style.left);
            minValue = leftIndentValue;
            if (this.position.paragraph.paragraphFormat.bidi) {
                minValue = rightIndentValue;
                maxValue = leftIndentValue;
            }
            if (this.justification === 'CenterTab' || this.justification === 'DecimalTab') {
                maxValue += 4;
            }
            else if (this.justification === 'RightTab') {
                maxValue += 5.5;
            }
            else {
                maxValue += 1.5;
            }
            if (value < minValue) {
                value = minValue;
            }
            else if (value > maxValue) {
                value = maxValue;
            }
            this.tabStopElement.style.left = value + 'px';
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            startValue = this.documentEditor.layoutType === 'Continuous' ? 0 : startValue;
            var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.onRenderTabStopMouseUp = function (e) {
        if (this.isDraggingForTab && !isNullOrUndefined(this.currentTabStop)) {
            if (!isNullOrUndefined(this.currentTabStopElement) && this.currentTabStopElement.style.display === 'none') {
                this.documentEditor.editorModule.removeTabStops([this.currrentParagraph], [this.currentTabStop]);
                this.currentTabStopElement.parentNode.removeChild(this.currentTabStopElement);
            }
            else {
                var finalValue = HelperMethods.getNumberFromString(this.tabStopElement.style.left);
                this.tabInitialValue = finalValue;
                this.documentEditor.editorModule.removeTabStops([this.currrentParagraph], [this.currentTabStop]);
                finalValue = HelperMethods.convertPixelToPoint(finalValue / this.documentEditor.zoomFactor) - 1584;
                finalValue = this.currrentParagraph.paragraphFormat.bidi ? finalValue * -1 : finalValue;
                this.currentTabStop.position = finalValue;
                this.documentEditor.editorModule.updateTabStopCollection(this.currrentParagraph, [this.currentTabStop]);
            }
            this.updateTabStopMarkers(this.documentEditor);
            this.isDraggingForTab = false;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.display = 'none';
            this.currentTabStopElement = undefined;
        }
    };
    RulerHelper.prototype.onTabStopDblClick = function (event) {
        this.documentEditor.showTabDialog();
        event.stopPropagation();
    };
    /**
     * @private
     */
    RulerHelper.prototype.hideTabStopSwitch = function (show) {
        if (this.tabStopStwitch) {
            this.showHideElement(show, this.tabStopStwitch);
        }
    };
    /**
     * @private
     */
    RulerHelper.prototype.hideRulerBottom = function (show) {
        if (this.hRulerBottom) {
            this.showHideElement(show, this.hRulerBottom);
        }
        if (this.vRulerBottom) {
            this.showHideElement(show, this.vRulerBottom);
        }
    };
    RulerHelper.prototype.showHideElement = function (show, element) {
        if (show) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    };
    /* eslint-enable */
    /**
     * createHtmlElement method \
     *
     * @returns {SVGSVGElement} createHtmlElement method .\
     * @param { string } elementType - provide the diagramId  value.
     * @param { Object } attribute - provide the diagramId  value.
     * @private
     */
    RulerHelper.prototype.createHtmlElement = function (elementType, attribute) {
        var element = createElement(elementType, attribute);
        this.setAttributeHtml(element, attribute);
        return element;
    };
    /**
     * createSvgElement method \
     *
     * @returns {SVGSVGElement} createSvgElement method .\
     * @param { string } elementType - provide the elementType  value.
     * @param { Object } attribute - provide the attribute  value.
     * @private
     */
    RulerHelper.prototype.createSvgElement = function (elementType, attribute) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
        this.setAttributeSvg(element, attribute);
        return element;
    };
    /**
     * applyStyleAgainstCsp method   \
     *
     * @returns {void} applyStyleAgainstCsp method .\
     * @param { SVGElement } svg - provide the svg  value.
     * @param { string } attributes - provide the boolean  value.
     * @private
     */
    RulerHelper.prototype.applyStyleAgainstCsp = function (svg, attributes) {
        var keys = attributes.split(';');
        for (var i = 0; i < keys.length; i++) {
            var attribute = keys[parseInt(i.toString(), 10)].split(':');
            if (attribute.length === 2) {
                svg.style[attribute[0].trim()] = attribute[1].trim();
            }
        }
    };
    /**
     * setAttributeSvg method.
     *
     * @returns {void} setAttributeSvg method .\
     * @param { SVGElement } svg - provide the svg  value.
     * @param { Object } attributes - provide the boolean  value.
     * @private
     */
    RulerHelper.prototype.setAttributeSvg = function (svg, attributes) {
        var keys = Object.keys(attributes);
        for (var i = 0; i < keys.length; i++) {
            // Added below condition to check whether svg is undefined or not
            if (svg && keys[parseInt(i.toString(), 10)] !== 'style') {
                svg.setAttribute(keys[parseInt(i.toString(), 10)], attributes[keys[parseInt(i.toString(), 10)]]);
            }
            else {
                this.applyStyleAgainstCsp(svg, attributes[keys[parseInt(i.toString(), 10)]]);
            }
        }
    };
    /**
     * setAttributeHtml method   \
     *
     * @returns {void} setAttributeHtml method .\
     * @param { HTMLElement } element - provide the svg  value.
     * @param { Object } attributes - provide the boolean  value.
     * @private
     */
    RulerHelper.prototype.setAttributeHtml = function (element, attributes) {
        var keys = Object.keys(attributes);
        for (var i = 0; i < keys.length; i++) {
            if (keys[parseInt(i.toString(), 10)] !== 'style') {
                element.setAttribute(keys[parseInt(i.toString(), 10)], attributes[keys[parseInt(i.toString(), 10)]]);
            }
            else {
                this.applyStyleAgainstCsp(element, attributes[keys[parseInt(i.toString(), 10)]]);
            }
        }
    };
    /**
     * renderOverlapElement method \
     *
     * @returns {void} renderOverlapElement method .\
     * @param { DocumentEditor} documentEditor - provide the content  value.
     * @private
     */
    RulerHelper.prototype.renderOverlapElement = function (documentEditor) {
        var rulerSize = this.getRulerSize(documentEditor);
        var attributes = {
            'id': documentEditor.element.id + '_overlapRuler',
            style: 'height:' + rulerSize.height + 'px;width:' + rulerSize.width + 'px;position:absolute;margin-left:0;margin-top:0;diplay:none',
            class: 'e-ruler-overlap'
        };
        this.overlap = this.createHtmlElement('div', attributes);
        var element = document.getElementById(documentEditor.element.id + '_viewerContainer');
        element.insertBefore(this.overlap, element.firstChild);
        return this.overlap;
    };
    RulerHelper.prototype.renderRulerMarkerIndicatorElement = function (documentEditor) {
        if (!documentEditor.enableSelection) {
            return;
        }
        var rulerSize = this.getRulerSize(documentEditor);
        var attributes = {
            'id': documentEditor.element.id + '_markIndicator',
            style: 'height:' + rulerSize.height + 'px;width:' + rulerSize.width + 'px;position:absolute;margin-left:0;margin-top:0;z-index:5;border:1px solid #ccc;display:' + (documentEditor.layoutType === 'Pages' ? 'block;' : 'none;'),
            class: 'e-de-ruler-markIndicator'
        };
        this.markIndicator = this.createHtmlElement('div', attributes);
        this.tabStopStwitch = this.markIndicator;
        var element = document.getElementById(documentEditor.element.id + '_viewerContainer');
        element.insertBefore(this.markIndicator, element.firstChild);
        var ownerId = documentEditor.element.id;
        this.firstLineIndentRuler = document.getElementById(ownerId + '_firstLineIndent').cloneNode(true);
        this.hangingIndentRuler = document.getElementById(ownerId + '_hangingIndent').cloneNode(true);
        this.firstLineIndentRuler.style.left = '1px';
        this.firstLineIndentRuler.style.top = rulerSize.height / 2 - 3 + 'px';
        this.firstLineIndentRuler.style.display = 'none';
        this.firstLineIndentRuler.classList.add('e-de-ruler-marker');
        this.firstLineIndentRuler.setAttribute('id', ownerId + '_firstLineIndent_-1');
        this.hangingIndentRuler.style.left = '1px';
        this.hangingIndentRuler.style.top = rulerSize.height / 2 - 3 + 'px';
        this.hangingIndentRuler.style.display = 'none';
        this.hangingIndentRuler.classList.add('e-de-ruler-marker');
        this.hangingIndentRuler.setAttribute('id', ownerId + '_hangingIndent_-1');
        this.markIndicator.appendChild(this.hangingIndentRuler);
        this.markIndicator.appendChild(this.firstLineIndentRuler);
        var justification = ['Left', 'Center', 'Right', 'Decimal', 'Bar'];
        var locale = new L10n('documenteditor', documentEditor.defaultLocale);
        locale.setLocale(documentEditor.locale);
        for (var i = 0; i < 5; i++) {
            this.renderTab(documentEditor, rulerSize, undefined, justification[parseInt(i.toString(), 10)], -1, locale);
            var element_1 = document.getElementById(documentEditor.element.id + '_' + justification[parseInt(i.toString(), 10)] + 'Tab_-1');
            if (!isNullOrUndefined(element_1)) {
                element_1.classList.remove('e-de-ruler-tab');
                element_1.classList.add('e-de-ruler-marker');
                element_1.style.display = i === 0 ? 'block' : 'none';
                element_1.style.position = 'absolute';
                element_1.style.margin = '4px 3px';
                this.markIndicator.appendChild(element_1);
            }
        }
        this.markIndicator.addEventListener('click', this.onmarkIndicatorClickHandler);
    };
    /**
     * renderRuler method \
     *
     * @returns {void} renderRuler method .\
     * @param { DocumentEditor} documentEditor - provide the content  value.
     * @param { boolean} isHorizontal - provide the content  value.
     * @private
     */
    RulerHelper.prototype.renderRuler = function (documentEditor, isHorizontal) {
        this.documentEditor = documentEditor;
        if (!documentEditor.enableSelection) {
            return;
        }
        this.rulerDiv = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler' : '_vRuler'));
        var rulerSize = this.getRulerSize(documentEditor);
        this.rulerGeometry = this.getRulerGeometry(documentEditor);
        var height = isHorizontal ? documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.x
            : (documentEditor.selectionModule.getPageTop(documentEditor.selectionModule.end.paragraph.bodyWidget.page));
        var margin = isHorizontal ? ('margin-left:' + height + 'px;') : ('margin-top:' + height + 'px;');
        if (documentEditor.selectionModule.isForward) {
            this.position = documentEditor.selectionModule.start;
        }
        else {
            this.position = documentEditor.selectionModule.end;
        }
        // const margin: string = isHorizontal ? ('margin-left:' + (pixelsToPoints(documentEditor.selection.end.paragraph.bodyWidget.page.boundingRectangle.x)) + 'px;') : ('margin-top:' + rulerSize.height + 'px;');
        if (!this.rulerDiv) {
            var style_1 = 'height:' + (isHorizontal ? rulerSize.height : this.rulerGeometry.height) + 'px;overflow:hidden;width:' +
                (isHorizontal ? this.rulerGeometry.width : rulerSize.width) + 'px;position:absolute;font-size:9px;text-align: left;z-index: 4;user-select:none;' + margin;
            var attributes_1 = {
                'id': documentEditor.element.id + (isHorizontal ? '_hRuler' : '_vRuler'),
                style: style_1, class: (isHorizontal ? 'e-de-hRuler' : 'e-de-vRuler')
            };
            this.rulerDiv = this.createHtmlElement('div', attributes_1);
        }
        this.rulerDiv.addEventListener('dblclick', this.onRulerDblClickHandler);
        var pageElement = document.getElementById(documentEditor.element.id + '_pageContainer');
        var style = 'height:' + (isHorizontal ? rulerSize.height : pageElement.getBoundingClientRect().height) + 'px;overflow:hidden;width:' +
            (isHorizontal ? pageElement.getBoundingClientRect().width : rulerSize.width) + 'px;position:absolute;z-index: 3;';
        var attributes = {
            'id': documentEditor.element.id + (isHorizontal ? '_hRulerBottom' : '_vRulerBottom'),
            style: style, class: (isHorizontal ? 'e-de-hRuler' : 'e-de-vRuler')
        };
        this.rulerOverlap = this.createHtmlElement('div', attributes);
        // isHorizontal ? (this.hRulerBottom = overlap) : (this.vRulerBottom = overlap);
        if (isHorizontal) {
            this.hRulerBottom = this.rulerOverlap;
        }
        else {
            this.vRulerBottom = this.rulerOverlap;
        }
        var parentElement = document.getElementById(documentEditor.element.id + '_viewerContainer');
        parentElement.insertBefore(this.rulerOverlap, parentElement.firstChild);
        var element = isHorizontal ? document.getElementById(documentEditor.element.id + '_hRulerBottom') : document.getElementById(documentEditor.element.id + '_vRulerBottom');
        element.insertBefore(this.rulerDiv, element.firstChild);
        this.renderRulerMargins(documentEditor, isHorizontal, this.rulerDiv);
        //const documentEditorRuler: DocumentEditorRulerModel = isHorizontal ? documentEditor.documentEditorSettings.rulerSettings.horizontalRuler : documentEditor.documentEditorSettings.rulerSettings.verticalRuler;
        var ruler = new Ruler(this.rulerDiv, this);
        ruler.orientation = isHorizontal ? 'Horizontal' : 'Vertical';
        this.updateMargin(ruler, documentEditor, isHorizontal);
        // ruler.pageWidth = documentEditor.selection.end.paragraph.bodyWidget.page.boundingRectangle.width;
        // ruler.pageHeight = documentEditor.selection.end.paragraph.bodyWidget.page.boundingRectangle.height;
        // ruler.length = (isHorizontal ? rulerGeometry.width : rulerGeometry.height) + documentEditorRuler.segmentWidth;
        ruler.length = ruler.zeroPosition * 2;
        ruler.appendTo();
        // eslint-disable-next-line
        isHorizontal ? documentEditor.hRuler = ruler : documentEditor.vRuler = ruler;
        this.updateRulerPosition(documentEditor, isHorizontal);
        var rulerObj = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler' : '_vRuler'));
        // eslint-disable-next-line
        isHorizontal ? documentEditor.hRuler.element = rulerObj : documentEditor.vRuler.element = rulerObj;
        if (rulerObj) {
            // Set the scrollLeft property to the desired value (e.g., 100 pixels)
            if (isHorizontal) {
                rulerObj.scrollLeft = ruler.zeroPosition -
                    HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin);
            }
            else {
                rulerObj.scrollTop = ruler.zeroPosition -
                    HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin);
            }
        }
        this.locale = new L10n('documenteditor', documentEditor.defaultLocale);
        if (isHorizontal) {
            this.renderIndents(documentEditor, isHorizontal, rulerSize, this.rulerGeometry, this.locale);
        }
        this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
        if (isHorizontal) {
            document.addEventListener('mousemove', this.onHorizontalRulerMouseMoveHandler);
            this.hRuler.addEventListener('mouseenter', this.onHRulerMouseEnterHandler);
            this.hRuler.addEventListener('mouseleave', this.onHRulerMouseLeaveHandler);
            this.hRuler.addEventListener('mousedown', this.onHRulerMouseDownHandler);
            this.hRuler.addEventListener('mouseup', this.onHRulerMouseUpHandler);
            document.addEventListener('mouseup', this.onRulerMouseUpHandler);
        }
        //Vertical Ruler Resizing
        this.vRuler = document.getElementById(documentEditor.element.id + '_vRuler');
        this.isTopRulerMargin = false;
        if (!isHorizontal) {
            document.addEventListener('mousemove', this.onVMouseMoveHandler);
            this.vRuler.addEventListener('mousedown', this.onVMouseDownHandler);
            document.addEventListener('mouseup', this.onVMouseUpHandler);
        }
    };
    RulerHelper.prototype.onHorizontalRulerMouseMoved = function (e) {
        if (this.documentEditor.isDestroyed || !this.documentEditor.documentEditorSettings.showRuler) {
            return;
        }
        var divRect = this.hRuler.getBoundingClientRect();
        var leftMargin = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin
            * this.documentEditor.zoomFactor;
        var rightMargin = (HelperMethods.convertPixelToPoint(divRect.width) -
            this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * this.documentEditor.zoomFactor);
        var pixelValue = Math.round(e.clientX - divRect.left);
        var mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
        if (!this.isDraggingRender) {
            if (this.documentEditor.isOnIndent) {
                this.hRuler.style.cursor = 'default';
                if (this.hRuler.hasAttribute('title')) {
                    this.hRuler.removeAttribute('title');
                }
                this.resizerEnabled = false;
            }
            else if (((leftMargin - 3) <= mouseXRelativeToDiv) && ((leftMargin + 3) >= mouseXRelativeToDiv)) {
                if (this.documentEditor.layoutType === 'Pages') {
                    this.hRuler.style.cursor = 'e-resize';
                    this.hRuler.setAttribute('title', this.locale.getConstant('Left Margin'));
                    this.resizerEnabled = true;
                    this.isLeftRulerMargin = true;
                }
            }
            else if ((((rightMargin - 3) <= mouseXRelativeToDiv) && ((rightMargin + 3) >= mouseXRelativeToDiv))) {
                if (this.documentEditor.layoutType === 'Pages') {
                    this.hRuler.style.cursor = 'e-resize';
                    this.hRuler.setAttribute('title', this.locale.getConstant('Right Margin'));
                    this.resizerEnabled = true;
                    this.isLeftRulerMargin = false;
                }
            }
            else if (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns.length > 0) {
                var columns = this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns;
                if (this.documentEditor.layoutType === 'Pages') {
                    for (var i = 1; i <= columns.length; i++) {
                        var rulerMarginDiv = document.getElementById(this.documentEditor.element.id + '_hRuler_Margin' + i);
                        var maginLeft = rulerMarginDiv.getBoundingClientRect().left;
                        var width = rulerMarginDiv.getBoundingClientRect().width;
                        if (((maginLeft - 3) <= e.clientX) && ((maginLeft + 3) >= e.clientX)) {
                            this.hRuler.style.cursor = 'e-resize';
                            this.multiColumnElement = rulerMarginDiv;
                            this.hRuler.setAttribute('title', this.locale.getConstant('Left Margin'));
                            this.isLeftMultiColumn = true;
                            this.resizerEnabled = true;
                            break;
                        }
                        else if (((maginLeft + width - 3) <= e.clientX) && ((maginLeft + width + 3) >= e.clientX)) {
                            this.hRuler.style.cursor = 'e-resize';
                            this.multiColumnElement = rulerMarginDiv;
                            this.hRuler.setAttribute('title', this.locale.getConstant('Right Margin'));
                            this.isRightMultiColumn = true;
                            this.resizerEnabled = true;
                            break;
                        }
                        else {
                            this.hRuler.style.cursor = 'default';
                            if (this.hRuler.hasAttribute('title')) {
                                this.hRuler.removeAttribute('title');
                            }
                            this.isLeftMultiColumn = false;
                            this.isRightMultiColumn = false;
                            this.resizerEnabled = false;
                        }
                    }
                }
            }
            else {
                this.hRuler.style.cursor = 'default';
                if (this.hRuler.hasAttribute('title')) {
                    this.hRuler.removeAttribute('title');
                }
                this.resizerEnabled = false;
            }
        }
        if (this.isDraggingRender) {
            var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - this.documentEditor.selectionModule.sectionFormat.leftMargin) * this.documentEditor.zoomFactor;
            var pageWidth = this.documentEditor.selectionModule.sectionFormat.pageWidth;
            var rightMarginValue = this.documentEditor.selectionModule.sectionFormat.rightMargin;
            var rightIndentValue = this.documentEditor.selectionModule.paragraphFormat.rightIndent;
            rightIndentValue = rightIndentValue > 0 ? rightIndentValue : 0;
            var minimumValue = 42;
            var firstLineIndent = this.documentEditor.selectionModule.paragraphFormat.firstLineIndent;
            var leftMarginValue = this.documentEditor.selectionModule.sectionFormat.leftMargin;
            firstLineIndent = firstLineIndent >= 0 ? firstLineIndent : 0;
            var leftIndent = this.documentEditor.selectionModule.paragraphFormat.leftIndent;
            if (this.isLeftRulerMargin) {
                var leftMaxLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(pageWidth - rightMarginValue -
                    rightIndentValue - minimumValue - firstLineIndent - leftIndent) * this.documentEditor.zoomFactor);
                var leftMinLimit = rulerZeroPoint;
                if (pixelValue + rulerZeroPoint > leftMaxLimit) {
                    pixelValue = leftMaxLimit - rulerZeroPoint;
                    mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
                }
                else if (pixelValue + rulerZeroPoint < leftMinLimit) {
                    pixelValue = leftMinLimit - rulerZeroPoint;
                    mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
                }
            }
            else {
                var rightMinLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(leftMarginValue + leftIndent + firstLineIndent + minimumValue + rightIndentValue) * this.documentEditor.zoomFactor);
                var rightMaxLimit = rulerZeroPoint + (HelperMethods.convertPointToPixel(pageWidth) * this.documentEditor.zoomFactor);
                if (pixelValue + rulerZeroPoint > rightMaxLimit) {
                    pixelValue = rightMaxLimit - rulerZeroPoint;
                    mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
                }
                else if (pixelValue + rulerZeroPoint < rightMinLimit) {
                    pixelValue = rightMinLimit - rulerZeroPoint;
                    mouseXRelativeToDiv = HelperMethods.convertPixelToPoint(pixelValue);
                }
            }
            this.finalmouseXRelativeToDiv = mouseXRelativeToDiv;
            var currentRightMargin = (HelperMethods.convertPixelToPoint(divRect.width)
                - (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin
                    * this.documentEditor.zoomFactor));
            if (this.documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.numberOfColumns <= 1) {
                /* eslint-disable-next-line max-len */
                this.resizeRulerMargins(this.isLeftRulerMargin, this.renderInitialValue, this.currentScrollLeft, currentRightMargin, this.hRuler, mouseXRelativeToDiv, true, this.documentEditor);
            }
            var rightIndent = document.getElementById(this.documentEditor.element.id + '_rightIndent');
            if (this.isLeftRulerMargin) {
                var difference = mouseXRelativeToDiv - this.renderInitialValue;
                rightIndent.style.left = (this.initialRightMargin - HelperMethods.convertPointToPixel(difference)) + 'px';
            }
            else {
                var difference = mouseXRelativeToDiv - this.renderInitialValue;
                rightIndent.style.left = (this.initialRightMargin + HelperMethods.convertPointToPixel(difference)) + 'px';
            }
            var startValue = this.documentEditor.documentHelper.currentPage.boundingRectangle.x;
            var indicatorLineValue = startValue + pixelValue;
            var lineSvg = document.getElementById(this.documentEditor.element.id + '_hRuler_indicator_svg');
            lineSvg.style.left = indicatorLineValue + 'px';
        }
    };
    RulerHelper.prototype.updateRulerPosition = function (documentEditor, isHorizontal) {
        var rulerObj = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler' : '_vRuler'));
        // eslint-disable-next-line
        isHorizontal ? documentEditor.hRuler.element = rulerObj : documentEditor.vRuler.element = rulerObj;
        if (rulerObj) {
            // Set the scrollLeft property to the desired value (e.g., 100 pixels)
            rulerObj.scrollLeft = 2112 - HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin);
        }
    };
    RulerHelper.prototype.updateIndicatorLines = function (documentEditor) {
        var hRulerSvg = document.getElementById(documentEditor.element.id + '_hRuler_indicator_svg');
        var hRulerLine = document.getElementById(documentEditor.element.id + '_hRuler_indicator');
        var vRulerSvg = document.getElementById(documentEditor.element.id + '_vRuler_indicator_svg');
        var vRulerLine = document.getElementById(documentEditor.element.id + '_vRuler_indicator');
        var pageContainer = document.getElementById(documentEditor.element.id + '_pageContainer');
        var pageData = pageContainer.getBoundingClientRect();
        var pageHeight = pageData.height;
        var pageWidth = pageData.width;
        hRulerSvg.style.height = pageHeight + 'px';
        hRulerLine.setAttribute('y2', "" + pageHeight);
        vRulerSvg.style.width = pageWidth + 'px';
        vRulerLine.setAttribute('x2', "" + pageWidth);
    };
    RulerHelper.prototype.createIndicatorLines = function (documentEditor) {
        if (!documentEditor.enableSelection) {
            return;
        }
        var viewerContainer = document.getElementById(documentEditor.element.id + '_viewerContainer');
        var pageContainer = document.getElementById(documentEditor.element.id + '_pageContainer');
        // let container = document.getElementById(documentEditor.element.id);
        var data = viewerContainer.getBoundingClientRect();
        var pageData = pageContainer.getBoundingClientRect();
        var pageHeight = pageData.height;
        var pageWidth = pageData.width;
        this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
        var hSvgAttr = {
            id: documentEditor.element.id + '_hRuler_indicator_svg',
            width: 0.5 + 'px',
            height: pageHeight + 'px',
            style: 'position:absolute;z-index:1;display:none;'
        };
        this.hSvg = this.createSvgElement('svg', hSvgAttr);
        var verticalLineAttr = { 'x1': 0, 'y1': this.hRuler.getBoundingClientRect().height + 5, 'x2': 0, 'y2': pageHeight, 'stroke-width': 0.5, 'stroke': 'black' };
        this.vLine = this.createSvgElement('line', verticalLineAttr);
        this.vLine.setAttribute('id', documentEditor.element.id + '_hRuler_indicator');
        this.hSvg.appendChild(this.vLine);
        viewerContainer.insertBefore(this.hSvg, viewerContainer.firstChild);
        var vRuler = document.getElementById(documentEditor.element.id + '_vRuler');
        var vSvgAttr = {
            id: documentEditor.element.id + '_vRuler_indicator_svg',
            width: pageWidth + 'px',
            height: 0.5 + 'px',
            style: 'position:absolute;z-index:1;display:none;'
        };
        this.vSvg = this.createSvgElement('svg', vSvgAttr);
        var horizontalLineAttr = { 'x1': vRuler.getBoundingClientRect().width + 5, 'y1': 0, 'x2': pageWidth, 'y2': 0, 'stroke-width': 0.5, 'stroke': 'black' };
        this.hLine = this.createSvgElement('line', horizontalLineAttr);
        this.hLine.setAttribute('id', documentEditor.element.id + '_vRuler_indicator');
        this.vSvg.appendChild(this.hLine);
        viewerContainer.insertBefore(this.vSvg, viewerContainer.firstChild);
    };
    RulerHelper.prototype.updateIndentMarkers = function (documentEditor) {
        if (isNullOrUndefined(documentEditor) || isNullOrUndefined(documentEditor.element)
            || isNullOrUndefined(documentEditor.element.id) || isNullOrUndefined(documentEditor.hRuler)
            || isNullOrUndefined(documentEditor.hRuler.zeroPosition)) {
            return;
        }
        var indent = undefined;
        var ownerId = documentEditor.element.id;
        var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - documentEditor.selectionModule.sectionFormat.leftMargin);
        var currentIndentValue;
        var finalValue;
        var currentMargin;
        var pixelValue;
        // if (documentEditor.selection.end.paragraph.isInsideTable) {
        //     currentIndentValue = documentEditor.selection.paragraphFormat.leftIndent;
        //     currentMargin = documentEditor.selection.sectionFormat.leftMargin;
        //     finalValue = HelperMethods.convertPointToPixel(currentIndentValue) + currentCell.x;
        //     pixelValue = (((rulerZeroPoint + ((finalValue))) * documentEditor.zoomFactor)) + 'px';
        //     indent = document.getElementById(ownerId + '_leftIndent');
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_hangingIndent');
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_firstLineIndent');
        //     currentIndentValue = documentEditor.selection.paragraphFormat.firstLineIndent;
        //     currentMargin = documentEditor.selection.paragraphFormat.leftIndent;
        //     finalValue = HelperMethods.convertPointToPixel(currentIndentValue + currentMargin) + currentCell.x;
        //     pixelValue = (((rulerZeroPoint + ((finalValue))) * documentEditor.zoomFactor)) + 'px';
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_rightIndent');
        //     currentIndentValue = documentEditor.selection.paragraphFormat.rightIndent;
        //     currentMargin = documentEditor.selection.sectionFormat.rightMargin;
        //     finalValue = (currentCell.x + currentCell.width) - HelperMethods.convertPointToPixel(currentIndentValue);
        //     pixelValue = ((rulerZeroPoint + finalValue - 2) * documentEditor.zoomFactor) + 'px';
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        // }
        // else {
        //     indent = document.getElementById(ownerId + '_leftIndent');
        //     currentIndentValue = documentEditor.selection.paragraphFormat.leftIndent;
        //     currentMargin = documentEditor.selection.sectionFormat.leftMargin;
        //     finalValue = currentMargin + currentIndentValue;
        //     pixelValue = (((rulerZeroPoint + (HelperMethods.convertPointToPixel(finalValue))) * documentEditor.zoomFactor) - 6) + 'px';
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_hangingIndent');
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_firstLineIndent');
        //     currentIndentValue = documentEditor.selection.paragraphFormat.firstLineIndent;
        //     let leftIndent = documentEditor.selection.paragraphFormat.leftIndent;
        //     let leftMargin = documentEditor.selection.sectionFormat.leftMargin;
        //     if (currentIndentValue < 0 && leftIndent < 0) {
        //         currentIndentValue = currentIndentValue < 0 ? 0 : currentIndentValue;
        //     }
        //     finalValue = leftMargin + leftIndent + currentIndentValue;
        //     pixelValue = (((rulerZeroPoint + HelperMethods.convertPointToPixel(finalValue)) * documentEditor.zoomFactor) - 6) + 'px';
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        //     indent = document.getElementById(ownerId + '_rightIndent');
        //     currentIndentValue = documentEditor.selection.paragraphFormat.rightIndent;
        //     currentMargin = documentEditor.selection.sectionFormat.rightMargin;
        //     finalValue = documentEditor.selection.sectionFormat.pageWidth - (currentIndentValue + currentMargin);
        //     pixelValue = (((rulerZeroPoint + HelperMethods.convertPointToPixel(finalValue)) * documentEditor.zoomFactor) - 6) + 'px';
        //     if (!isNullOrUndefined(indent)) {
        //         indent.style.left = pixelValue;
        //     }
        // }
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        if (this.position.paragraph.paragraphFormat.bidi || (this.position.paragraph.isInsideTable
            && this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi)) {
            var rulerMarginDivWidth = ((rulerGeometry.width / documentEditor.zoomFactor) -
                (HelperMethods.convertPointToPixel((this.position.paragraph.bodyWidget.sectionFormat.rightMargin)
                    + (this.position.paragraph.bodyWidget.sectionFormat.leftMargin))));
            rulerZeroPoint -= rulerMarginDivWidth;
        }
        var paraStart = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['x'].toString()) : this.position.paragraph.x;
        var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
        var finalValueTemp;
        if (this.position.paragraph.paragraphFormat.bidi) {
            rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - documentEditor.selectionModule.sectionFormat.leftMargin -
                (documentEditor.selectionModule.sectionFormat.pageWidth -
                    documentEditor.selectionModule.sectionFormat.leftMargin -
                    documentEditor.selectionModule.sectionFormat.rightMargin));
        }
        var leftIndent = document.getElementById(documentEditor.element.id + '_leftIndent');
        var rightIndent = document.getElementById(documentEditor.element.id + '_rightIndent');
        if (this.position.paragraph.paragraphFormat.bidi) {
            leftIndent.setAttribute('title', this.locale.getConstant('Right Indent'));
            rightIndent.setAttribute('title', this.locale.getConstant('Left Indent'));
            finalValueTemp = rulerZeroPoint + paraStart + paraWidth;
        }
        else {
            leftIndent.setAttribute('title', this.locale.getConstant('Left Indent'));
            rightIndent.setAttribute('title', this.locale.getConstant('Right Indent'));
            finalValueTemp = rulerZeroPoint + paraStart;
        }
        var firstLineIndent = this.position.paragraph.paragraphFormat.firstLineIndent;
        indent = document.getElementById(ownerId + '_leftIndent');
        if (!isNullOrUndefined(indent)) {
            if (documentEditor.layoutType === 'Pages') {
                indent.style.left = ((finalValueTemp * documentEditor.zoomFactor) - 6) + 'px';
            }
            else if (documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) -
                        20 - documentEditor.viewer.clientArea.width;
                    finalValueTemp = rulerZeroPoint + paraStart + paraWidth;
                    indent.style.left = finalValueTemp + 'px';
                }
                else {
                    rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - 20;
                    finalValueTemp = rulerZeroPoint + (paraStart * documentEditor.zoomFactor);
                    indent.style.left = finalValueTemp + 'px';
                }
            }
        }
        indent = document.getElementById(ownerId + '_hangingIndent');
        if (!isNullOrUndefined(indent)) {
            if (documentEditor.layoutType === 'Pages') {
                indent.style.left = ((finalValueTemp * documentEditor.zoomFactor) - 6) + 'px';
            }
            else if (documentEditor.layoutType === 'Continuous') {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) -
                        20 - documentEditor.viewer.clientArea.width;
                    finalValueTemp = rulerZeroPoint + paraStart + paraWidth;
                    indent.style.left = finalValueTemp + 'px';
                }
                else {
                    rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - 20;
                    finalValueTemp = rulerZeroPoint + (paraStart * documentEditor.zoomFactor);
                    indent.style.left = finalValueTemp + 'px';
                }
            }
        }
        indent = document.getElementById(ownerId + '_firstLineIndent');
        if (documentEditor.layoutType === 'Pages') {
            if (!isNullOrUndefined(indent)) {
                if (this.position.paragraph.paragraphFormat.bidi) {
                    indent.style.left = (((finalValueTemp - HelperMethods.convertPointToPixel(firstLineIndent)) * documentEditor.zoomFactor) - 6) + 'px';
                }
                else {
                    indent.style.left = (((finalValueTemp + HelperMethods.convertPointToPixel(firstLineIndent)) * documentEditor.zoomFactor) - 6) + 'px';
                }
            }
        }
        else if (documentEditor.layoutType === 'Continuous') {
            if (this.position.paragraph.paragraphFormat.bidi) {
                rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) -
                    20 - documentEditor.viewer.clientArea.width;
                finalValueTemp = rulerZeroPoint + paraStart + paraWidth - (HelperMethods.convertPointToPixel(firstLineIndent) * documentEditor.zoomFactor);
            }
            else {
                rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - 20;
                finalValueTemp = rulerZeroPoint + ((paraStart + HelperMethods.convertPointToPixel(firstLineIndent)) * documentEditor.zoomFactor);
            }
            indent.style.left = finalValueTemp + 'px';
        }
        indent = document.getElementById(ownerId + '_rightIndent');
        if (documentEditor.layoutType === 'Pages') {
            if (this.position.paragraph.paragraphFormat.bidi) {
                finalValueTemp = rulerZeroPoint + paraStart;
            }
            else {
                finalValueTemp = rulerZeroPoint + paraStart + paraWidth;
            }
            if (!isNullOrUndefined(indent)) {
                indent.style.left = ((finalValueTemp * documentEditor.zoomFactor) - 6) + 'px';
            }
        }
        else if (documentEditor.layoutType === 'Continuous') {
            if (this.position.paragraph.paragraphFormat.bidi) {
                rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) -
                    20 - (documentEditor.viewer.clientArea.width * documentEditor.zoomFactor);
                finalValueTemp = rulerZeroPoint + paraStart;
                indent.style.left = finalValueTemp + 'px';
            }
            else {
                rulerZeroPoint = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - 20;
                finalValueTemp = rulerZeroPoint + ((paraStart + paraWidth) * documentEditor.zoomFactor);
                indent.style.left = finalValueTemp + 'px';
            }
        }
    };
    RulerHelper.prototype.updateTabStopMarkers = function (documentEditor) {
        if (isNullOrUndefined(documentEditor) || isNullOrUndefined(documentEditor.element)
            || isNullOrUndefined(documentEditor.element.id) || isNullOrUndefined(documentEditor.hRuler)
            || isNullOrUndefined(documentEditor.hRuler.zeroPosition)) {
            return;
        }
        var locale = new L10n('documenteditor', documentEditor.defaultLocale);
        locale.setLocale(documentEditor.locale);
        var ownerId = documentEditor.element.id;
        this.markIndicator = document.getElementById(ownerId + '_markIndicator');
        this.markIndicator.style.display = documentEditor.layoutType === 'Pages' ? 'block' : 'none';
        var paragarph = this.position.paragraph;
        var tabs = paragarph.paragraphFormat.tabs;
        var zoomFactor = documentEditor.zoomFactor;
        var rulerSize = this.getRulerSize(documentEditor);
        var RenderedTabElement = HelperMethods.convertNodeListToArray(document.querySelectorAll('.e-de-ruler-tab'));
        for (var i = 0; i < tabs.length; i++) {
            var tabStop = tabs[parseInt(i.toString(), 10)];
            var justification = tabStop.tabJustification;
            // const position: number = tabStop.position;
            var id = documentEditor.element.id + '_' + justification + 'Tab_' + i.toString();
            var tabMarker = document.getElementById(id);
            if (!isNullOrUndefined(tabMarker)) {
                if (!isNullOrUndefined(RenderedTabElement) && RenderedTabElement.length > 0) {
                    RenderedTabElement.splice(RenderedTabElement.indexOf(tabMarker), 1);
                }
                var value = this.position.paragraph.paragraphFormat.bidi ?
                    (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                    : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                if (justification === 'Center' || justification === 'Decimal') {
                    tabMarker.style.left = ((value * zoomFactor) - 4) + 'px';
                }
                else if (justification === 'Right') {
                    tabMarker.style.left = ((value * zoomFactor) - 5.5) + 'px';
                }
                else {
                    tabMarker.style.left = ((value * zoomFactor) - 1.5) + 'px';
                }
            }
            else {
                if (justification !== 'List' && !isNullOrUndefined(justification)) {
                    this.renderTab(documentEditor, rulerSize, tabStop, justification, i, locale);
                }
            }
        }
        if (!isNullOrUndefined(RenderedTabElement)) {
            for (var i = 0; i < RenderedTabElement.length; i++) {
                var elementToRemove = RenderedTabElement[parseInt(i.toString(), 10)];
                if (!isNullOrUndefined(elementToRemove)) {
                    elementToRemove.parentNode.removeChild(elementToRemove);
                }
            }
        }
    };
    RulerHelper.prototype.renderRulerMargins = function (documentEditor, isHorizontal, rulerContainer) {
        var rulerSize = this.getRulerSize(documentEditor);
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        var height = isHorizontal ? documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.x
            : (documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.y + rulerSize.height);
        // const margin: string = isHorizontal ? ('margin-left:' + height + 'px;') : ('margin-top:' + height + 'px;');
        //const leftMarginValue = 2112 - (HelperMethods.convertPointToPixel(documentEditor.selection.end.paragraph.bodyWidget.sectionFormat.leftMargin));
        var leftMarginValue = 2112 * documentEditor.zoomFactor;
        var rulerMargin = isHorizontal ? ('margin-left:' + leftMarginValue + 'px;') : ('margin-top:' + leftMarginValue + 'px;');
        var rulerHeight = (isHorizontal ? rulerSize.height : (rulerGeometry.height -
            (HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin
                + documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin) * documentEditor.zoomFactor)));
        // const rulerHeight =  (isHorizontal ? rulerSize.height : rulerGeometry.height);
        if (isHorizontal) {
            for (var i = 1; i <= 13; i++) {
                this.rulerMarginDiv = document.getElementById(documentEditor.element.id + '_hRuler_Margin' + i);
                if (!this.rulerMarginDiv) {
                    var rulerstyle = 'height:' + rulerHeight + 'px;overflow:hidden;width:' +
                        (rulerGeometry.width - (HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin + documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin) * documentEditor.zoomFactor)) + 'px;position:absolute;' + 'font-size:9px;text-align: left;z-index: -1;display: block' + rulerMargin;
                    var rulerattributes = {
                        'id': documentEditor.element.id + '_hRuler_Margin' + i,
                        style: rulerstyle,
                        class: 'e-de-ruler-margin'
                    };
                    this.rulerMarginDiv = this.createHtmlElement('div', rulerattributes);
                }
                rulerContainer.appendChild(this.rulerMarginDiv);
            }
        }
        else {
            if (!this.verticalRulerMarginDiv) {
                this.verticalRulerMarginDiv = document.getElementById(documentEditor.element.id + '_vRuler_Margin');
                var rulerstyle = 'height:' + rulerHeight + 'px;overflow:hidden;width:' +
                    rulerSize.width + 'px;position:absolute;' + 'font-size:9px;text-align: left;z-index: -1;' + rulerMargin;
                var rulerattributes = {
                    'id': documentEditor.element.id + '_vRuler_Margin',
                    style: rulerstyle,
                    class: 'e-de-ruler-margin'
                };
                this.verticalRulerMarginDiv = this.createHtmlElement('div', rulerattributes);
            }
            rulerContainer.appendChild(this.verticalRulerMarginDiv);
        }
    };
    RulerHelper.prototype.updateRulerMargins = function (documentEditor) {
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        var leftMarginValue = (documentEditor.hRuler.zeroPosition) * documentEditor.zoomFactor;
        this.updateHorizontalRulerMargin(documentEditor);
        var verticalRulerMarginDiv = document.getElementById(documentEditor.element.id + '_vRuler_Margin');
        var rulerMarginDivHeight = rulerGeometry.height - (HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin
            * documentEditor.zoomFactor) + (documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin
            * documentEditor.zoomFactor)));
        verticalRulerMarginDiv.style.marginTop = leftMarginValue + 'px';
        verticalRulerMarginDiv.style.height = rulerMarginDivHeight + 'px';
    };
    RulerHelper.prototype.updateHorizontalRulerMargin = function (documentEditor) {
        var columns = documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.columns;
        var leftMarginValue = (documentEditor.hRuler.zeroPosition) * documentEditor.zoomFactor;
        var skipLoop = false;
        var paraBidi = this.position.paragraph.paragraphFormat.bidi;
        var tableBidi = false;
        var currnLefttMargin = HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin - 72);
        var currentRightMargin = HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin - 72);
        if (this.position.paragraph.isInsideTable) {
            tableBidi = this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi;
        }
        var rulerMarginDivWidth = (this.getRulerGeometry(documentEditor).width -
            (HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin
                * documentEditor.zoomFactor) + (documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin
                * documentEditor.zoomFactor))));
        if (paraBidi || tableBidi) {
            leftMarginValue = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - rulerMarginDivWidth;
        }
        for (var i = 0; i < 13; i++) {
            var horizontalRulerMarginDiv = document.getElementById(documentEditor.element.id + '_hRuler_Margin' + (i + 1));
            if (horizontalRulerMarginDiv) {
                if ((columns.length === 0 && !skipLoop) || (documentEditor.layoutType === 'Continuous' && !skipLoop)) {
                    if (paraBidi || tableBidi) {
                        var startValue = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - rulerMarginDivWidth;
                        horizontalRulerMarginDiv.style.marginLeft = startValue + 'px';
                    }
                    else {
                        horizontalRulerMarginDiv.style.marginLeft = leftMarginValue + 'px';
                    }
                    horizontalRulerMarginDiv.style.display = 'block';
                    if (documentEditor.layoutType === 'Continuous') {
                        var paraWidth = !isNullOrUndefined(this.position.paragraph['absoluteXPosition']) ? parseFloat(this.position.paragraph['absoluteXPosition']['width'].toString()) : this.position.paragraph.width;
                        horizontalRulerMarginDiv.style.width = (paraWidth * documentEditor.zoomFactor) + 'px';
                    }
                    else {
                        horizontalRulerMarginDiv.style.width = rulerMarginDivWidth + 'px';
                    }
                    skipLoop = true;
                }
                else if ((columns.length >= i + 1) && documentEditor.layoutType === 'Pages') {
                    if (paraBidi || tableBidi) {
                        horizontalRulerMarginDiv.style.marginLeft = leftMarginValue + 'px';
                        leftMarginValue -= ((currnLefttMargin + currentRightMargin) / (columns.length)) * documentEditor.zoomFactor;
                        leftMarginValue = leftMarginValue + (columns[parseInt(i.toString(), 10)].width +
                            columns[parseInt(i.toString(), 10)].space) * documentEditor.zoomFactor;
                    }
                    else {
                        horizontalRulerMarginDiv.style.marginLeft = leftMarginValue + 'px';
                        leftMarginValue -= ((currnLefttMargin + currentRightMargin) / (columns.length)) * documentEditor.zoomFactor;
                        leftMarginValue = leftMarginValue + (columns[parseInt(i.toString(), 10)].width +
                            columns[parseInt(i.toString(), 10)].space) * documentEditor.zoomFactor;
                    }
                    horizontalRulerMarginDiv.style.display = 'block';
                    horizontalRulerMarginDiv.style.width = (columns[parseInt(i.toString(), 10)].width - ((currnLefttMargin + currentRightMargin) / columns.length)) * documentEditor.zoomFactor + 'px';
                }
                else {
                    horizontalRulerMarginDiv.style.display = 'none';
                }
            }
        }
    };
    RulerHelper.prototype.resizeVRulerMargins = function (isRulerTopMargin, currentTopMargin, currentScrollTop, currentBottomMargin, ruler, mousePosition, documentEditor) {
        var rulerMarginDiv = document.getElementById(documentEditor.element.id + '_vRuler_Margin');
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        if (isRulerTopMargin) {
            rulerMarginDiv.style.height = (rulerGeometry.height - HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin * documentEditor.zoomFactor) + mousePosition)).toString() + 'px';
            if (currentTopMargin < mousePosition) {
                ruler.scrollTop = currentScrollTop - HelperMethods.convertPointToPixel(mousePosition - currentTopMargin);
            }
            else {
                ruler.scrollTop = currentScrollTop + HelperMethods.convertPointToPixel(currentTopMargin - mousePosition);
            }
        }
        else {
            var bottomMargin = HelperMethods.convertPixelToPoint(rulerGeometry.height) - mousePosition;
            rulerMarginDiv.style.height = (rulerGeometry.height - HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin * documentEditor.zoomFactor) + (bottomMargin))).toString() + 'px';
            if (currentBottomMargin < mousePosition) {
                //  ruler.scrollLeft = currentScrollLeft - HelperMethods.convertPointToPixel(mousePosition - currentRightMargin);
            }
            else {
                //  ruler.scrollLeft = currentScrollLeft + HelperMethods.convertPointToPixel(currentRightMargin - mousePosition);
            }
        }
    };
    RulerHelper.prototype.resizeRulerMargins = function (isRulerLeftMargin, currentLeftMargin, currentScrollLeft, currentRightMargin, ruler, mousePosition, isHorizontal, documentEditor) {
        var rulerMarginDiv = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler_Margin1' : '_vRuler_Margin'));
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        if (!isNullOrUndefined(isRulerLeftMargin) && isRulerLeftMargin) {
            rulerMarginDiv.style.width = (rulerGeometry.width - HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * documentEditor.zoomFactor) + mousePosition)).toString() + 'px';
            if (currentLeftMargin < mousePosition) {
                ruler.scrollLeft = currentScrollLeft - HelperMethods.convertPointToPixel(mousePosition - currentLeftMargin);
            }
            else {
                ruler.scrollLeft = currentScrollLeft + HelperMethods.convertPointToPixel(currentLeftMargin - mousePosition);
            }
        }
        else {
            var rightMargin = HelperMethods.convertPixelToPoint(rulerGeometry.width) - mousePosition;
            rulerMarginDiv.style.width = (rulerGeometry.width - HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin * documentEditor.zoomFactor) + (rightMargin))).toString() + 'px';
            if (currentRightMargin < mousePosition) {
                //  ruler.scrollLeft = currentScrollLeft - HelperMethods.convertPointToPixel(mousePosition - currentRightMargin);
            }
            else {
                //  ruler.scrollLeft = currentScrollLeft + HelperMethods.convertPointToPixel(currentRightMargin - mousePosition);
            }
        }
    };
    RulerHelper.prototype.getRulerOrigin = function () {
        var range = 1584;
        var pixelValue = HelperMethods.convertPointToPixel(1584);
        //console.log('PixelValue: ', pixelValue);
        //console.log('PointsValue: ', range);
    };
    RulerHelper.prototype.renderIndents = function (documentEditor, isHorizontal, rulerSize, rulerGeometry, locale) {
        this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
        this.firstLineIndent = document.getElementById(documentEditor.element.id + '_firstLineIndent');
        if (!this.firstLineIndent) {
            var margin = ('left:' + (HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin) - 6) * documentEditor.zoomFactor + 'px;');
            var style = 'height:' + ((rulerSize.height - 3) / 2) + 'px;overflow:hidden;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 5;' + margin;
            var attributes = {
                'id': documentEditor.element.id + '_firstLineIndent',
                style: style,
                'data-name': 'FirstLineIndent',
                class: 'e-de-ruler-indent'
            };
            this.firstLineIndent = this.createHtmlElement('div', attributes);
            this.firstLineIndent.setAttribute('title', locale.getConstant('First Line Indent'));
            // let svg: SVGElement;
            // Create an SVG element
            var attr = {
                'id': documentEditor.element.id + '_firstLineIndent_svg',
                width: rulerSize.width + 'px',
                height: ((rulerSize.height - 3) / 2) + 'px',
                style: 'position:inherit;left:0px'
            };
            this.firstLineIndentSvg = this.createSvgElement('svg', attr);
            this.firstLineIndentSvg.setAttribute('fill', 'none');
            var pathattr = {
                style: 'position:inherit;left:0px'
            };
            // Create a path element inside the SVG
            this.firstLineIndentPath = this.createSvgElement('path', pathattr);
            this.firstLineIndentPath.setAttribute('class', 'e-de-ruler-indent-svg');
            this.firstLineIndentPath.setAttribute('d', 'M 0.5 0.5 H 11.5 V 2.7128 L 6 5.4211 L 0.5 2.7128 V 0.5 Z');
            this.firstLineIndentPath.setAttribute('fill', 'white');
            this.firstLineIndentPath.setAttribute('stroke', '#A1A1A1');
            // Append the path element to the SVG element
            this.firstLineIndentSvg.appendChild(this.firstLineIndentPath);
            this.firstLineIndent.appendChild(this.firstLineIndentSvg);
            this.hRuler.append(this.firstLineIndent);
            this.firstLineIndent.addEventListener('dblclick', this.onDoubleClickHandler);
            //Draggable for first line Indent.
            this.isDraggingIndents1 = false;
            this.indentInitialValue = HelperMethods.getNumberFromString(this.firstLineIndent.style.left); // for mouse up event
            var indentsInitialValue2 = HelperMethods.getNumberFromString(this.firstLineIndent.style.left); // for mouse move event
            this.firstLineIndent.addEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.firstLineIndent.addEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.firstLineIndent.addEventListener('mousedown', this.onFirstLineIndentMouseDownHandler);
            document.addEventListener('mousemove', this.onIndentMouseMoveHandler);
            document.addEventListener('mouseup', this.onIndentMouseUpHandler);
        }
        //Rendering HangingIndent
        this.hangingIndent = document.getElementById(documentEditor.element.id + '_hangingIndent');
        if (!this.hangingIndent) {
            var margin = ('left:' + (HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin) - 6) + 'px;');
            var style = 'height:' + (rulerSize.height / 2) + 'px;top:' + (((rulerSize.height - 3) / 2) + 1) + 'px;overflow:hidden;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 5;' + margin;
            var attributes = {
                'id': documentEditor.element.id + '_hangingIndent',
                style: style,
                'data-name': 'HangingIndent',
                class: 'e-de-ruler-indent'
            };
            this.hangingIndent = this.createHtmlElement('div', attributes);
            this.hangingIndent.setAttribute('title', locale.getConstant('Hanging Indent'));
            // let hangingIndentSvg: SVGElement;
            // Create an SVG element
            var attr = {
                'id': documentEditor.element.id + '_hangingIndent_svg',
                width: rulerSize.width + 'px',
                height: ((rulerSize.height - 3) / 2) + 'px',
                style: 'position:inherit;left:0px'
            };
            this.hangingIndentSvg = this.createSvgElement('svg', attr);
            this.hangingIndentSvg.setAttribute('fill', 'none');
            var pathattr = {
                style: 'position:inherit;left:0px'
            };
            // Create a path element inside the SVG
            this.hangingIndentPath = this.createSvgElement('path', pathattr);
            this.hangingIndentPath.setAttribute('class', 'e-de-ruler-indent-svg');
            this.hangingIndentPath.setAttribute('d', 'M 0.5 5.3211 H 11.5 V 3.1083 L 6 0.4 L 0.5 3.1083 V 5.3211 Z');
            this.hangingIndentPath.setAttribute('fill', 'white');
            this.hangingIndentPath.setAttribute('stroke', '#A1A1A1');
            // Append the path element to the SVG element
            this.hangingIndentSvg.appendChild(this.hangingIndentPath);
            this.hangingIndent.appendChild(this.hangingIndentSvg);
            this.hRuler.append(this.hangingIndent);
            this.hangingIndent.addEventListener('dblclick', this.onDoubleClickHandler);
            this.hangingIndentInitialValue = HelperMethods.getNumberFromString(this.hangingIndent.style.left); // for mouse up event
            var initialValue2 = HelperMethods.getNumberFromString(this.hangingIndent.style.left); // for mouse move event
            this.hangingIndent.addEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.hangingIndent.addEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.hangingIndent.addEventListener('mousedown', this.onHangIndentMouseDownHandler);
            document.addEventListener('mousemove', this.onHangIndentMouseMoveHandler);
            document.addEventListener('mouseup', this.onHangIndentMouseUpHandler);
        }
        //Rendering LeftIndent
        this.leftIndent = document.getElementById(documentEditor.element.id + '_leftIndent');
        if (!this.leftIndent) {
            var margin = ('left:' + (HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin) - 6) + 'px;');
            var style = 'height:4px;top:11px;overflow:hidden;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 5;' + margin;
            var attributes = {
                'id': documentEditor.element.id + '_leftIndent',
                style: style,
                class: 'e-de-ruler-indent'
            };
            this.leftIndent = this.createHtmlElement('div', attributes);
            this.leftIndent.setAttribute('title', locale.getConstant('Left Indent'));
            // let leftIndentSvg: SVGElement;
            // Create an SVG element
            var attr = {
                'id': documentEditor.element.id + '_leftIndent_svg',
                width: rulerSize.width + 'px',
                height: '4px',
                style: 'position:inherit;left:0px'
            };
            this.leftIndentSvg = this.createSvgElement('svg', attr);
            this.leftIndentSvg.setAttribute('fill', 'none');
            var pathattr = {
                style: 'position:inherit;left:0px'
            };
            // Create a path element inside the SVG
            this.leftIndentPath = this.createSvgElement('path', pathattr);
            this.leftIndentPath.setAttribute('class', 'e-de-ruler-indent-svg');
            this.leftIndentPath.setAttribute('d', 'M 0.5 3.5 H 11.5 V 0.5 H 0.5 V 3.5 Z');
            this.leftIndentPath.setAttribute('fill', 'white');
            this.leftIndentPath.setAttribute('stroke', '#A1A1A1');
            // Append the path element to the SVG element
            this.leftIndentSvg.appendChild(this.leftIndentPath);
            this.leftIndent.appendChild(this.leftIndentSvg);
            this.hRuler.append(this.leftIndent);
            this.leftIndent.addEventListener('dblclick', this.onDoubleClickHandler);
            this.indentInitialValue = HelperMethods.getNumberFromString(this.leftIndent.style.left); // for mouse down event
            var initialValue2 = HelperMethods.getNumberFromString(this.leftIndent.style.left); // for mouse move event
            this.leftIndent.addEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.leftIndent.addEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.leftIndent.addEventListener('mousedown', this.onLeftIndentMouseDownHandler);
            document.addEventListener('mousemove', this.onLeftIndentMouseMoveHandler);
            document.addEventListener('mouseup', this.onLeftIndentMouseUpHandler);
        }
        //Rendering RightIndent
        this.rightIndent = document.getElementById(documentEditor.element.id + '_rightIndent');
        if (!this.rightIndent) {
            var margin = ('left:' + (documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.width - HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin) - 6) + 'px;');
            var style = 'height:7px;top:8px;overflow:hidden;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
            var attributes = {
                'id': documentEditor.element.id + '_rightIndent',
                style: style,
                class: 'e-de-ruler-indent'
            };
            this.rightIndent = this.createHtmlElement('div', attributes);
            this.rightIndent.setAttribute('title', locale.getConstant('Right Indent'));
            // let rightIndentSvg: SVGElement;
            // Create an SVG element
            var attr = {
                'id': documentEditor.element.id + '_rightIndent_svg',
                width: rulerSize.width + 'px',
                height: '7px',
                style: 'position:inherit;left:0px'
            };
            this.rightIndentSvg = this.createSvgElement('svg', attr);
            this.rightIndentSvg.setAttribute('fill', 'none');
            var pathattr = {
                style: 'position:inherit;left:0px'
            };
            // Create a path element inside the SVG
            this.rightIndentPath = this.createSvgElement('path', pathattr);
            this.rightIndentPath.setAttribute('class', 'e-de-ruler-indent-svg');
            this.rightIndentPath.setAttribute('d', 'M 0.5 6.5 H 11.5 V 4.2872 L 6 1.5789 L 0.5 4.2872 V 6.5 Z');
            this.rightIndentPath.setAttribute('fill', 'white');
            this.rightIndentPath.setAttribute('stroke', '#A1A1A1');
            // Append the path element to the SVG element
            this.rightIndentSvg.appendChild(this.rightIndentPath);
            this.rightIndent.appendChild(this.rightIndentSvg);
            this.hRuler.append(this.rightIndent);
            this.rightIndent.addEventListener('dblclick', this.onDoubleClickHandler);
            //Draggable for left line Indent.
            this.indentInitialValue = HelperMethods.getNumberFromString(this.rightIndent.style.left); // for mouse down event
            var initialValue2 = HelperMethods.getNumberFromString(this.rightIndent.style.left); // for mouse move event
            this.rightIndent.addEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.rightIndent.addEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.rightIndent.addEventListener('mousedown', this.onRightIndentMouseDownHandler);
            document.addEventListener('mousemove', this.onRightIndentMouseMoveHandler);
            document.addEventListener('mouseup', this.onRightIndentMouseUpHandler);
        }
        this.updateIndentMarkers(documentEditor);
    };
    /**
     * updateRuler method
     *
     * @returns {void} updateRuler method.
     * @param {DocumentEditor} documentEditor - provide the documentEditor  value.
     * @param {boolean} rerenderRuler - provide the rerenderRuler  value.
     * @private
     */
    RulerHelper.prototype.updateRuler = function (documentEditor, rerenderRuler) {
        /* eslint-disable-next-line max-len */
        if (documentEditor.isDestroyed || documentEditor.rulerHelper && documentEditor.documentEditorSettings && !documentEditor.documentEditorSettings.showRuler ||
            documentEditor.isReadOnlyMode) {
            return;
        }
        // const hOffset: number = - documentEditor.scroller.horizontalOffset;
        // const vOffset: number = - documentEditor.scroller.verticalOffset;
        var hOffset = 0;
        // const vOffset: number = - documentEditor.scroller.verticalOffset;
        if (isNullOrUndefined(documentEditor.hRuler) && isNullOrUndefined(documentEditor.vRuler)) {
            return;
        }
        if (documentEditor.selectionModule.isForward) {
            this.position = documentEditor.selectionModule.start;
        }
        else {
            this.position = documentEditor.selectionModule.end;
        }
        this.updateRulerDimension(documentEditor, documentEditor.hRuler, hOffset, rerenderRuler);
        this.updateRulerDimension(documentEditor, documentEditor.vRuler, hOffset, rerenderRuler);
        this.updateRulerMargins(documentEditor);
        this.updateIndentMarkers(documentEditor);
        this.updateTabStopMarkers(documentEditor);
        if (this.position.paragraph.isInsideTable) {
            this.updateTableMarkers(documentEditor, documentEditor.hRuler);
        }
        else {
            this.removeTableMarkers(documentEditor, documentEditor.hRuler);
        }
        this.updateIndicatorLines(documentEditor);
    };
    RulerHelper.prototype.removeTableMarkers = function (documentEditor, ruler) {
        var renderedTableMarkers = HelperMethods.convertNodeListToArray(document.querySelectorAll('.e-de-ruler-table-marker'));
        if (!isNullOrUndefined(renderedTableMarkers)) {
            for (var i = 0; i < renderedTableMarkers.length; i++) {
                var elementToRemove = renderedTableMarkers[parseInt(i.toString(), 10)];
                if (!isNullOrUndefined(elementToRemove)) {
                    elementToRemove.parentNode.removeChild(elementToRemove);
                }
            }
        }
    };
    RulerHelper.prototype.updateTableMarkers = function (documentEditor, ruler) {
        var renderedTableMarkers = HelperMethods.convertNodeListToArray(document.querySelectorAll('.e-de-ruler-table-marker'));
        if (isNullOrUndefined(renderedTableMarkers)) {
            // const tablewidget: TableWidget =
            // ((documentEditor.selection.end.paragraph.containerWidget as TableCellWidget).ownerTable as TableWidget);
            // const tableColumns = ((documentEditor.selection.end.paragraph.containerWidget as TableCellWidget).ownerTable
            //  as TableWidget).tableHolder.columns.length;
            // const tableXPos: number = undefined;
            // this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
            this.renderTableMarkers(documentEditor, ruler);
        }
        else if (this.position.paragraph.isInsideTable) {
            this.renderTableMarkers(documentEditor, ruler);
        }
    };
    RulerHelper.prototype.renderTableMarkers = function (documentEditor, ruler) {
        var _this = this;
        this.removeTableMarkers(documentEditor, documentEditor.hRuler);
        var intialPosition;
        var tablewidget = this.position.paragraph.containerWidget.ownerTable;
        var tableRowWidget = this.position.paragraph.associatedCell.ownerRow.clone();
        var cellWidgets = tableRowWidget.childWidgets;
        var value = this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi ? cellWidgets.length : 0;
        if (this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi) {
            cellWidgets.reverse();
        }
        var tableXPos;
        this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
        var _loop_1 = function (i) {
            var tableMarker = document.getElementById(documentEditor.element.id + '_tableMarker_' + value);
            //if (!tableMarker) {
            var margin = void 0;
            if (i === 0) {
                tableXPos = (cellWidgets[parseInt(i.toString(), 10)].x
                    - cellWidgets[parseInt(i.toString(), 10)].margin.left)
                    * documentEditor.zoomFactor + this_1.hRuler.scrollLeft;
                margin = ('left:' + (tableXPos - 4) + 'px;');
            }
            else {
                tableXPos = tableXPos + ((cellWidgets[i - 1].width
                    + cellWidgets[i - 1].margin.left
                    + cellWidgets[i - 1].margin.right) * documentEditor.zoomFactor);
                margin = 'left:' + (tableXPos - 4) + 'px;';
            }
            var style = 'height:' + (ruler.thickness) + 'px;overflow:hidden;width:10px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
            var attributes = {
                'id': documentEditor.element.id + '_tableMarker_' + value,
                'class': 'e-de-ruler-table-marker',
                style: style
            };
            tableMarker = this_1.createHtmlElement('div', attributes);
            var locale = new L10n('documenteditor', documentEditor.defaultLocale);
            tableMarker.setAttribute('title', locale.getConstant('Move Table Column'));
            // Create an SVG element
            var attr = {
                'id': documentEditor.element.id + '_tableMarker_svg' + i,
                width: 9 + 'px',
                height: 11 + 'px',
                style: 'position:inherit;left:0px;top:3px;'
            };
            var svg = this_1.createSvgElement('svg', attr);
            svg.setAttribute('fill', 'none');
            var pathattr = {
                style: 'position:inherit;left:0px;'
            };
            // Create a path element inside the SVG
            var pathElement = this_1.createSvgElement('path', pathattr);
            pathElement.setAttribute('class', 'e-de-ruler-table-svg');
            pathElement.setAttribute('d', 'M1 1V0H2V1H3V0H4V1H5V0H6V1H7V2H6V3H7V4H6V5H7V6H6V7H7V8H0V7H1V6H0V5H1V4H0V3H1V2H0V1H1ZM2 2V3H3V2H2ZM4 2V3H5V2H4ZM5 4H4V5H5V4ZM5 6H4V7H5V6ZM3 7V6H2V7H3ZM2 5H3V4H2V5Z');
            pathElement.setAttribute('fill', '#A1A1A1');
            // Append the path element to the SVG element
            svg.appendChild(pathElement);
            tableMarker.appendChild(svg);
            this_1.hRuler.append(tableMarker);
            // }
            if (this_1.position.paragraph.associatedCell.ownerTable.tableFormat.bidi) {
                value--;
            }
            else {
                value++;
            }
            tableMarker.addEventListener('dblclick', function (event) {
                documentEditor.showDialog('TableProperties');
                event.stopPropagation();
            });
            var tableMarkerOffset;
            tableMarker.addEventListener('mousedown', function (e) {
                tableMarkerOffset = e.clientX - tableMarker.getBoundingClientRect().left;
                documentEditor.startXPosition = HelperMethods.convertPixelToPoint(e.clientX);
                documentEditor.isTableMarkerDragging = true;
                var cursorPoint = new Point(e.clientX, e.clientY);
                var touchPoint = documentEditor.viewer.findFocusedPage(cursorPoint, true, true);
                var currentMarkerPostion;
                if (e.currentTarget instanceof HTMLElement) {
                    var parts = e.currentTarget.id.split('_');
                    var value_1 = parts[parts.length - 1];
                    currentMarkerPostion = parseInt(value_1, 10);
                }
                var tableWidget = documentEditor.selectionModule.end.paragraph.containerWidget.ownerTable;
                documentEditor.editorModule.tableResize.currentResizingTable = tableWidget;
                documentEditor.editorModule.tableResize.resizeNode = 0;
                documentEditor.editorModule.tableResize.resizerPosition = currentMarkerPostion;
                documentEditor.editorModule.tableResize.startingPoint.x = touchPoint.x;
                documentEditor.editorModule.tableResize.startingPoint.y = touchPoint.y;
                documentEditor.editorHistoryModule.initResizingHistory(touchPoint, documentEditor.editorModule.tableResize);
                var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - documentEditor.selectionModule.sectionFormat.leftMargin) * documentEditor.zoomFactor;
                var value = rulerZeroPoint + e.clientX - tableMarkerOffset - _this.hRuler.getBoundingClientRect().left;
                var startValue = documentEditor.documentHelper.currentPage.boundingRectangle.x;
                var indicatorLineValue = startValue + (value - rulerZeroPoint) + 6;
                var lineSvg = document.getElementById(documentEditor.element.id + '_hRuler_indicator_svg');
                lineSvg.style.left = (indicatorLineValue - 6) + 'px';
                lineSvg.style.display = 'block';
            });
            document.addEventListener('mousemove', function (e) {
                if (documentEditor.isDestroyed || !documentEditor.documentEditorSettings.showRuler) {
                    return;
                }
                if (documentEditor.isTableMarkerDragging) {
                    _this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
                    var rulerZeroPoint = HelperMethods.convertPointToPixel(1584 - documentEditor.selectionModule.sectionFormat.leftMargin) * documentEditor.zoomFactor;
                    if (documentEditor.selectionModule.end.paragraph.associatedCell.ownerTable.tableFormat.bidi) {
                        var rulerGeometry = _this.getRulerGeometry(documentEditor);
                        var rulerMarginDivWidth = (rulerGeometry.width - (HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * documentEditor.zoomFactor)
                            + (documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin
                                * documentEditor.zoomFactor))));
                        rulerZeroPoint -= rulerMarginDivWidth;
                    }
                    var value_2 = rulerZeroPoint + e.clientX - tableMarkerOffset - _this.hRuler.getBoundingClientRect().left;
                    tableMarker.style.left = value_2 + 'px';
                    var startValue = documentEditor.documentHelper.currentPage.boundingRectangle.x;
                    var indicatorLineValue = startValue + (value_2 - rulerZeroPoint) + 6;
                    var lineSvg = document.getElementById(documentEditor.element.id + '_hRuler_indicator_svg');
                    lineSvg.style.left = (indicatorLineValue - 6) + 'px';
                }
            });
            document.addEventListener('mouseup', function (e) {
                if (documentEditor.isDestroyed || !documentEditor.documentEditorSettings.showRuler) {
                    return;
                }
                if (documentEditor.isTableMarkerDragging) {
                    var cursorPoint = new Point(e.clientX, e.clientY);
                    var dragValue = _this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi ?
                        (documentEditor.startXPosition - HelperMethods.convertPixelToPoint(e.clientX))
                        : (HelperMethods.convertPixelToPoint(e.clientX) - documentEditor.startXPosition);
                    documentEditor.editorModule.tableResize.handleResizing(cursorPoint, true, (dragValue / documentEditor.zoomFactor));
                    documentEditor.editorModule.tableResize.updateResizingHistory(documentEditor.viewer.findFocusedPage(cursorPoint, true, true));
                    documentEditor.isTableMarkerDragging = false;
                    var lineSvg = document.getElementById(documentEditor.element.id + '_hRuler_indicator_svg');
                    lineSvg.style.display = 'none';
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i <= cellWidgets.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * updateRulerDimension method \
     *
     * @returns {void} updateRulerDimension method .\
     * @param {DocumentEditor} documentEditor - provide the documentEditor  value.
     * @param {Ruler} ruler - provide the content  value.
     * @param {number} offset - provide the content  value.
     * @param {boolean} rerenderRuler - provide the rerenderRuler  value.
     * @private
     */
    RulerHelper.prototype.updateRulerDimension = function (documentEditor, ruler, offset, rerenderRuler) {
        var isHorizontal = ruler.orientation === 'Horizontal' ? true : false;
        var rulerSize = this.getRulerSize(documentEditor);
        var rulerGeometry = this.getRulerGeometry(documentEditor);
        //const documentEditorRuler: DocumentEditorRulerModel = isHorizontal ? documentEditor.documentEditorSettings.rulerSettings.horizontalRuler : documentEditor.documentEditorSettings.rulerSettings.verticalRuler;
        this.updateRulerDiv(documentEditor, rulerGeometry, isHorizontal, ruler);
        this.updateRulerSpace(documentEditor, rulerGeometry, isHorizontal, ruler);
        this.updateMargin(ruler, documentEditor, isHorizontal);
        // ruler.pageWidth = documentEditor.selection.end.paragraph.bodyWidget.page.boundingRectangle.width * documentEditor.zoomFactor;
        // ruler.pageHeight = documentEditor.selection.end.paragraph.bodyWidget.page.boundingRectangle.height * documentEditor.zoomFactor;
        ruler.length = documentEditor.zoomFactor < 1 ?
            ((ruler.zeroPosition * 2) / documentEditor.zoomFactor)
            : ((ruler.zeroPosition * 2) * documentEditor.zoomFactor);
        var rulerObj = ruler.element;
        if (isHorizontal) {
            rulerObj.style.marginLeft = (documentEditor.layoutType === 'Pages' ? documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.x : 0) + 'px';
        }
        else {
            rulerObj.parentElement.style.display = documentEditor.layoutType === 'Pages' ? 'block' : 'none';
            rulerObj.style.marginTop = documentEditor.selectionModule.getPageTop(documentEditor.selectionModule.end.paragraph.bodyWidget.page) + 'px';
        }
        if (rerenderRuler) {
            ruler.offset = offset;
            ruler.scale = documentEditor.zoomFactor;
            // if (documentEditor.layoutType === 'Pages') {
            ruler.length = documentEditor.zoomFactor < 1 ?
                ((ruler.zeroPosition * 2) / documentEditor.zoomFactor)
                : ((ruler.zeroPosition * 2) * documentEditor.zoomFactor);
            // } else if (documentEditor.layoutType === 'Continuous') {
            //     ruler.length = (ruler.zeroPosition * 2) / documentEditor.zoomFactor;
            // }
            ruler.updateRuler();
        }
        if (isHorizontal) {
            if (documentEditor.layoutType === 'Pages') {
                var paraBidi = this.position.paragraph.paragraphFormat.bidi;
                var tableBidi = false;
                if (this.position.paragraph.isInsideTable) {
                    tableBidi = this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi;
                }
                if (paraBidi || tableBidi) {
                    var rulerMarginDivWidth = (rulerGeometry.width - (HelperMethods.convertPointToPixel((documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin * documentEditor.zoomFactor))));
                    rulerObj.scrollLeft = (documentEditor.hRuler.zeroPosition * documentEditor.zoomFactor) - rulerMarginDivWidth;
                }
                else {
                    rulerObj.scrollLeft = (ruler.zeroPosition - HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin)) * documentEditor.zoomFactor;
                }
            }
            else {
                var paraBidi = this.position.paragraph.paragraphFormat.bidi;
                var tableBidi = false;
                if (this.position.paragraph.isInsideTable) {
                    tableBidi = this.position.paragraph.associatedCell.ownerTable.tableFormat.bidi;
                }
                if (paraBidi || tableBidi) {
                    // const rulerMarginDivWidth = (rulerGeometry.width - 40);
                    rulerObj.scrollLeft = ((ruler.zeroPosition - documentEditor.viewer.clientActiveArea.width)
                        * documentEditor.zoomFactor) - 20;
                }
                else {
                    // 20 is set approximately to the web layout.
                    rulerObj.scrollLeft = (ruler.zeroPosition * documentEditor.zoomFactor) - 20;
                }
            }
        }
        else {
            rulerObj.scrollTop = (ruler.zeroPosition - HelperMethods.convertPointToPixel(documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin)) * documentEditor.zoomFactor;
        }
    };
    /**
     * updateRulerSpace method \
     *
     * @returns {void} updateRulerDiv method .\
     * @param {DocumentEditor} documentEditor - provide the documentEditor  value.
     * @param {Size} rulerGeometry - provide the content  value.
     * @param {boolean} isHorizontal - provide the content  value.
     * @param {Ruler} ruler - provide the ruler  value.
     * @private
     */
    RulerHelper.prototype.updateRulerSpace = function (documentEditor, rulerGeometry, isHorizontal, ruler) {
        this.rulerSpaceDiv = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler_ruler_space' : '_vRuler_ruler_space'));
        if (this.rulerSpaceDiv && documentEditor && rulerGeometry) {
            this.rulerSpaceDiv.style.width = (isHorizontal ? (rulerGeometry.width + (ruler.segmentWidth * 2)) : ruler.thickness) + 'px';
            this.rulerSpaceDiv.style.height = (isHorizontal ? ruler.thickness : (rulerGeometry.height + (ruler.segmentWidth * 2))) + 'px';
        }
    };
    /**
     * updateRulerDiv method \
     *
     * @returns {void} updateRulerDiv method .\
     * @param {DocumentEditor} documentEditor - provide the documentEditor  value.
     * @param {Size} rulerGeometry - provide the content  value.
     * @param {boolean} isHorizontal - provide the content  value.
     * @param {Ruler} ruler - provide the ruler  value.
     * @private
     */
    RulerHelper.prototype.updateRulerDiv = function (documentEditor, rulerGeometry, isHorizontal, ruler) {
        // parent div
        this.parentRulerDiv = document.getElementById(documentEditor.element.id + (isHorizontal ? '_hRuler' : '_vRuler'));
        if (this.parentRulerDiv && documentEditor && rulerGeometry) {
            this.parentRulerDiv.style.width = (isHorizontal ? documentEditor.layoutType === 'Continuous' ? rulerGeometry.width / documentEditor.zoomFactor : rulerGeometry.width : ruler.thickness) + 'px';
            this.parentRulerDiv.style.height = (isHorizontal ? ruler.thickness : rulerGeometry.height) + 'px';
            this.parentRulerDiv = document.getElementById(documentEditor.element.id + '_overlapRuler');
            if (this.parentRulerDiv) {
                // eslint-disable-next-line
                isHorizontal ? (this.parentRulerDiv.style.height === ruler.thickness + 'px') : (this.parentRulerDiv.style.width === ruler.thickness + 'px');
            }
        }
        if (isHorizontal) {
            if (this.hRulerBottom) {
                var pageElement = document.getElementById(documentEditor.element.id + '_pageContainer');
                this.hRulerBottom.style.width = pageElement.getBoundingClientRect().width + 'px';
            }
        }
        // let vRulerDiv: HTMLElement = document.getElementById(documentEditor.element.id + '_vRuler');
        // if (vRulerDiv) {
        //     vRulerDiv.style.width = ruler.thickness + 'px';
        //     vRulerDiv.style.height =  rulerGeometry.height + 'px';
        // }
    };
    /**
     * getRulerGeometry method \
     *
     * @returns {void} getRulerGeometry method .\
     * @param { DocumentEditor} documentEditor - provide the documentEditor  value.
     * @private
     */
    RulerHelper.prototype.getRulerGeometry = function (documentEditor) {
        var rulerSize = this.getRulerSize(documentEditor);
        var height = (documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.height
            * documentEditor.zoomFactor);
        var width = (documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.width
            * documentEditor.zoomFactor);
        return new Size(width, height);
    };
    RulerHelper.prototype.getVerticalHeight = function (documentEditor) {
        var pageheight = HelperMethods.convertPixelToPoint(documentEditor.selectionModule.end.paragraph.bodyWidget.page.boundingRectangle.height);
        var containerHeight = documentEditor.element.getBoundingClientRect().height;
        if (pageheight < containerHeight) {
            return pageheight;
        }
        else {
            return containerHeight - documentEditor.documentHelper.pages[0].boundingRectangle.y;
        }
    };
    RulerHelper.prototype.renderTab = function (documentEditor, rulerSize, tabStop, tabJustification, i, locale) {
        this.hRuler = document.getElementById(documentEditor.element.id + '_hRuler');
        var zoomFactor = documentEditor.documentHelper.zoomFactor;
        var value;
        switch (tabJustification) {
            case 'Left': {
                this.leftTab = document.getElementById(documentEditor.element.id + '_LeftTab' + '_' + i);
                if (!this.leftTab) {
                    var style = '';
                    if (!isNullOrUndefined(tabStop)) {
                        value = this.position.paragraph.paragraphFormat.bidi ?
                            (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                            : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                        var margin = ('left:' + ((value - 1.5) * zoomFactor) + 'px;');
                        style = 'height:9px;overflow:hidden;top:7px;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
                    }
                    var attributes = {
                        'id': documentEditor.element.id + '_LeftTab' + '_' + i,
                        'class': 'e-de-ruler-tab e-de-ruler-tab-left',
                        style: style,
                        'data-name': 'LeftTab'
                    };
                    this.leftTab = this.createHtmlElement('div', attributes);
                    this.leftTab.setAttribute('title', locale.getConstant('Left Tab'));
                    // let svg: SVGElement;
                    // Create an SVG element
                    var attr = {
                        'id': documentEditor.element.id + '_leftTab_svg',
                        width: rulerSize.width / 2 + 'px',
                        height: rulerSize.height / 2 + 'px',
                        style: 'position:inherit;left:0px'
                    };
                    var svg = this.createSvgElement('svg', attr);
                    svg.setAttribute('fill', 'none');
                    var pathattr = {
                        style: 'position:inherit;left:0px'
                    };
                    // Create a path element inside the SVG
                    var pathElement = this.createSvgElement('path', pathattr);
                    pathElement.setAttribute('class', 'e-de-ruler-tab-svg');
                    pathElement.setAttribute('d', 'M3 5H7V7H1V1H3V5Z');
                    pathElement.setAttribute('fill', '#605E5C');
                    pathElement.setAttribute('stroke', '#A1A1A1');
                    // Append the path element to the SVG element
                    svg.appendChild(pathElement);
                    this.leftTab.appendChild(svg);
                    this.hRuler.append(this.leftTab);
                }
                break;
            }
            case 'Center': {
                this.centerTab = document.getElementById(documentEditor.element.id + '_CenterTab' + '_' + i);
                if (!this.centerTab) {
                    var style = '';
                    if (!isNullOrUndefined(tabStop)) {
                        value = this.position.paragraph.paragraphFormat.bidi ?
                            (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                            : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                        var margin = ('left:' + ((value - 4) * zoomFactor) + 'px;');
                        style = 'height:9px;overflow:hidden;top:7px;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
                    }
                    var attributes = {
                        'id': documentEditor.element.id + '_CenterTab' + '_' + i,
                        'class': 'e-de-ruler-tab e-de-ruler-tab-center',
                        style: style,
                        'data-name': 'CenterTab'
                    };
                    this.centerTab = this.createHtmlElement('div', attributes);
                    this.centerTab.setAttribute('title', locale.getConstant('Center Tab'));
                    // let svg: SVGElement;
                    // Create an SVG element
                    var attr = {
                        'id': documentEditor.element.id + '_centerTab_svg',
                        width: rulerSize.width / 2 + 'px',
                        height: rulerSize.height / 2 + 'px',
                        style: 'position:inherit;left:0px'
                    };
                    var svg = this.createSvgElement('svg', attr);
                    svg.setAttribute('fill', 'none');
                    var pathattr = {
                        style: 'position:inherit;left:0px'
                    };
                    // Create a path element inside the SVG
                    var pathElement = this.createSvgElement('path', pathattr);
                    pathElement.setAttribute('class', 'e-de-ruler-tab-svg');
                    pathElement.setAttribute('d', 'M5 5H8V7H0V5H3V1H5V5Z');
                    pathElement.setAttribute('fill', '#605E5C');
                    pathElement.setAttribute('stroke', '#A1A1A1');
                    // Append the path element to the SVG element
                    svg.appendChild(pathElement);
                    this.centerTab.appendChild(svg);
                    this.hRuler.append(this.centerTab);
                }
                break;
            }
            case 'Right': {
                this.rightTab = document.getElementById(documentEditor.element.id + '_RightTab' + '_' + i);
                if (!this.rightTab) {
                    var style = '';
                    if (!isNullOrUndefined(tabStop)) {
                        value = this.position.paragraph.paragraphFormat.bidi ?
                            (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                            : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                        var margin = ('left:' + ((value - 5.5) * zoomFactor) + 'px;');
                        style = 'height:9px;overflow:hidden;top:7px;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
                    }
                    var attributes = {
                        'id': documentEditor.element.id + '_RightTab' + '_' + i,
                        'class': 'e-de-ruler-tab e-de-ruler-tab-right',
                        style: style,
                        'data-name': 'RightTab'
                    };
                    this.rightTab = this.createHtmlElement('div', attributes);
                    this.rightTab.setAttribute('title', locale.getConstant('Right Tab'));
                    // let svg: SVGElement;
                    // Create an SVG element
                    var attr = {
                        'id': documentEditor.element.id + '_rightTab_svg',
                        width: rulerSize.width / 2 + 'px',
                        height: rulerSize.height / 2 + 'px',
                        style: 'position:inherit;left:0px'
                    };
                    var svg = this.createSvgElement('svg', attr);
                    svg.setAttribute('fill', 'none');
                    var pathattr = {
                        style: 'position:inherit;left:0px'
                    };
                    // Create a path element inside the SVG
                    var pathElement = this.createSvgElement('path', pathattr);
                    pathElement.setAttribute('class', 'e-de-ruler-tab-svg');
                    pathElement.setAttribute('d', 'M5 5V1H7V7H1V5H5Z');
                    pathElement.setAttribute('fill', '#605E5C');
                    pathElement.setAttribute('stroke', '#A1A1A1');
                    // Append the path element to the SVG element
                    svg.appendChild(pathElement);
                    this.rightTab.appendChild(svg);
                    this.hRuler.append(this.rightTab);
                }
                break;
            }
            case 'Decimal': {
                this.decimalTab = document.getElementById(documentEditor.element.id + '_DecimalTab' + '_' + i);
                if (!this.decimalTab) {
                    var style = '';
                    if (!isNullOrUndefined(tabStop)) {
                        value = this.position.paragraph.paragraphFormat.bidi ?
                            (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                            : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                        var margin = ('left:' + ((value * zoomFactor) - 4) + 'px;');
                        style = 'height:9px;overflow:hidden;top:7px;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
                    }
                    var attributes = {
                        'id': documentEditor.element.id + '_DecimalTab' + '_' + i,
                        'class': 'e-de-ruler-tab e-de-ruler-tab-decimal',
                        style: style,
                        'data-name': 'DecimalTab'
                    };
                    this.decimalTab = this.createHtmlElement('div', attributes);
                    this.decimalTab.setAttribute('title', locale.getConstant('Decimal Tab'));
                    // const svg: SVGElement;
                    // Create an SVG element
                    var attr = {
                        'id': documentEditor.element.id + '_decimalTab_svg',
                        width: rulerSize.width / 2 + 'px',
                        height: rulerSize.height / 2 + 'px',
                        style: 'position:inherit;left:0px'
                    };
                    var svg = this.createSvgElement('svg', attr);
                    svg.setAttribute('fill', 'none');
                    var pathattr = {
                        style: 'position:inherit;left:0px'
                    };
                    // Create a path element inside the SVG
                    var pathElement = this.createSvgElement('path', pathattr);
                    pathElement.setAttribute('class', 'e-de-ruler-tab-svg');
                    pathElement.setAttribute('d', 'M6 0H4V6H0V8H4H6H10V6H6V0Z');
                    pathElement.setAttribute('fill', '#605E5C');
                    pathElement.setAttribute('clip-rule', 'evenodd');
                    pathElement.setAttribute('fill-rule', 'evenodd');
                    pathElement.setAttribute('stroke', '#A1A1A1');
                    // Append the path element to the SVG element
                    svg.appendChild(pathElement);
                    this.decimalTab.appendChild(svg);
                    this.hRuler.append(this.decimalTab);
                }
                break;
            }
            case 'Bar': {
                this.barTab = document.getElementById(documentEditor.element.id + '_BarTab' + '_' + i);
                if (!this.barTab) {
                    var style = '';
                    if (!isNullOrUndefined(tabStop)) {
                        value = this.position.paragraph.paragraphFormat.bidi ?
                            (HelperMethods.convertPointToPixel(1584 - tabStop.position))
                            : (HelperMethods.convertPointToPixel(1584 + tabStop.position));
                        var margin = ('left:' + ((value - 1.5) * zoomFactor) + 'px;');
                        style = 'height:9px;overflow:hidden;top:7px;width:12px;position:absolute;font-size:11px;text-align: left;z-index: 4;' + margin;
                    }
                    var attributes = {
                        'id': documentEditor.element.id + '_BarTab' + '_' + i,
                        'class': 'e-de-ruler-tab e-de-ruler-tab-bar',
                        style: style,
                        'data-name': 'BarTab'
                    };
                    this.barTab = this.createHtmlElement('div', attributes);
                    this.barTab.setAttribute('title', locale.getConstant('Bar Tab'));
                    // const svg: SVGElement;
                    // Create an SVG element
                    var attr = {
                        'id': documentEditor.element.id + '_barTab_svg',
                        width: rulerSize.width / 2 + 'px',
                        height: rulerSize.height / 2 + 'px',
                        style: 'position:inherit;left:0px'
                    };
                    var svg = this.createSvgElement('svg', attr);
                    svg.setAttribute('fill', 'none');
                    var rectAttr = {
                        style: 'position:inherit;left:0px'
                    };
                    var rect = this.createSvgElement('rect', rectAttr);
                    rect.setAttribute('width', '2');
                    rect.setAttribute('height', '8');
                    rect.setAttribute('fill', '#605E5C');
                    rect.setAttribute('stroke', '#A1A1A1');
                    // Append the path element to the SVG element
                    svg.appendChild(rect);
                    this.barTab.appendChild(svg);
                    this.hRuler.append(this.barTab);
                }
                break;
            }
        }
        if (!isNullOrUndefined(tabStop)) {
            this.tabStopElement = document.getElementById(documentEditor.element.id + '_' + tabJustification + 'Tab' + '_' + i);
            if (!isNullOrUndefined(tabStop)) {
                this.tabStopElement.addEventListener('dblclick', this.onTabStopDblClickHandler);
            }
            this.tabInitialValue = HelperMethods.getNumberFromString(this.tabStopElement.style.left); // for mouse up event
            var initialValue2 = HelperMethods.getNumberFromString(this.tabStopElement.style.left); // for mouse move event
            this.justification = this.tabStopElement.getAttribute('data-name');
            this.currrentParagraph = this.position.paragraph;
            this.tabStopElement.addEventListener('mousedown', this.onTabStopMouseDownHandler);
            this.tabStopElement.addEventListener('mouseup', this.onTabStopMouseUpHandler);
            document.addEventListener('mousemove', this.onTabStopMouseMoveHandler);
            document.addEventListener('mouseup', this.onRenderTabStopMouseUpHandler);
        }
    };
    RulerHelper.prototype.updateMargin = function (ruler, documentEditor, isHorizontal) {
        if (isHorizontal) {
            ruler.startMargin = documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.leftMargin;
            ruler.endMargin = documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.rightMargin;
        }
        else {
            ruler.startMargin = documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.topMargin;
            ruler.endMargin = documentEditor.selectionModule.end.paragraph.bodyWidget.sectionFormat.bottomMargin;
        }
    };
    RulerHelper.prototype.getTabJustification = function (dataNameValue) {
        switch (dataNameValue) {
            case 'LeftTab':
                return 'Left';
            case 'CenterTab':
                return 'Center';
            case 'RightTab':
                return 'Right';
            case 'DecimalTab':
                return 'Decimal';
            case 'BarTab':
                return 'Bar';
        }
        return 'Left';
    };
    /**
     * getRulerSize method \
     *
     * @returns {void} getRulerSize method .\
     * @param { DocumentEditor} documentEditor - provide the documentEditor  value.
     * @private
     */
    RulerHelper.prototype.getRulerSize = function (documentEditor) {
        var top = 0;
        var left = 0;
        //if (diagram.rulerSettings.showRulers) {
        // top = documentEditor.documentEditorSettings.rulerSettings.horizontalRuler.thickness;
        // left = documentEditor.documentEditorSettings.rulerSettings.verticalRuler.thickness;
        top = 15;
        left = 15;
        //}
        return new Size(left, top);
    };
    RulerHelper.prototype.destroy = function () {
        this.unWireEvents();
        this.removeHTMLElements();
        this.removeSvgElements();
    };
    RulerHelper.prototype.removeHTMLElements = function () {
        var _this = this;
        if (this.tabStopStwitch) {
            this.tabStopStwitch.remove();
            this.tabStopStwitch = null;
        }
        if (this.hRulerBottom) {
            this.hRulerBottom.remove();
            this.hRulerBottom = null;
        }
        if (this.vRulerBottom) {
            this.vRulerBottom.remove();
            this.vRulerBottom = null;
        }
        if (this.overlap) {
            this.overlap.remove();
            this.overlap = null;
        }
        if (this.markIndicator) {
            this.markIndicator.remove();
            this.markIndicator = null;
        }
        if (this.rulerDiv) {
            this.rulerDiv.remove();
            this.rulerDiv = null;
        }
        if (this.rulerOverlap) {
            this.rulerOverlap.remove();
            this.rulerOverlap = null;
        }
        if (this.rulerMarginDiv) {
            this.rulerMarginDiv.remove();
            this.rulerMarginDiv = null;
        }
        if (this.verticalRulerMarginDiv) {
            this.verticalRulerMarginDiv.remove();
            this.verticalRulerMarginDiv = null;
        }
        if (this.firstLineIndent) {
            this.firstLineIndent.remove();
            this.firstLineIndent = null;
        }
        if (this.hangingIndent) {
            this.hangingIndent.remove();
            this.hangingIndent = null;
        }
        if (this.leftIndent) {
            this.leftIndent.remove();
            this.leftIndent = null;
        }
        if (this.rightIndent) {
            this.rightIndent.remove();
            this.rightIndent = null;
        }
        if (this.parentRulerDiv) {
            this.parentRulerDiv.remove();
            this.parentRulerDiv = null;
        }
        if (this.rulerSpaceDiv) {
            this.rulerSpaceDiv.remove();
            this.rulerSpaceDiv = null;
        }
        if (this.firstLineIndentRuler) {
            this.firstLineIndentRuler.remove();
            this.firstLineIndentRuler = null;
        }
        if (this.hangingIndentRuler) {
            this.hangingIndentRuler.remove();
            this.hangingIndentRuler = null;
        }
        if (this.leftTab) {
            this.leftTab.childNodes.forEach(function (element) {
                _this.leftTab.removeChild(element);
                element = null;
            });
            this.leftTab.innerHTML = '';
            this.leftTab.remove();
            this.leftTab = null;
        }
        if (this.rightTab) {
            this.rightTab.childNodes.forEach(function (element) {
                _this.rightTab.removeChild(element);
                element = null;
            });
            this.rightTab.innerHTML = '';
            this.rightTab.remove();
            this.rightTab = null;
        }
        if (this.centerTab) {
            this.centerTab.childNodes.forEach(function (element) {
                _this.centerTab.removeChild(element);
                element = null;
            });
            this.centerTab.innerHTML = '';
            this.centerTab.remove();
            this.centerTab = null;
        }
        if (this.decimalTab) {
            this.decimalTab.childNodes.forEach(function (element) {
                _this.decimalTab.removeChild(element);
                element = null;
            });
            this.decimalTab.innerHTML = '';
            this.decimalTab.remove();
            this.decimalTab = null;
        }
        if (this.barTab) {
            this.barTab.childNodes.forEach(function (element) {
                _this.barTab.removeChild(element);
                element = null;
            });
            this.barTab.innerHTML = '';
            this.barTab.remove();
            this.barTab = null;
        }
        if (this.vRuler) {
            this.vRuler.childNodes.forEach(function (element) {
                _this.vRuler.removeChild(element);
                element = null;
            });
            this.vRuler.innerHTML = '';
            this.vRuler.remove();
            this.vRuler = null;
        }
        if (this.hRuler) {
            this.hRuler.childNodes.forEach(function (element) {
                _this.hRuler.removeChild(element);
                element = null;
            });
            this.hRuler.innerHTML = '';
            this.hRuler.remove();
            this.hRuler = null;
        }
    };
    RulerHelper.prototype.removeSvgElements = function () {
        if (this.hSvg) {
            this.hSvg.remove();
            this.hSvg = null;
        }
        if (this.vLine) {
            this.vLine.remove();
            this.vLine = null;
        }
        if (this.vSvg) {
            this.vSvg.remove();
            this.vSvg = null;
        }
        if (this.hLine) {
            this.hLine.remove();
            this.hLine = null;
        }
        if (this.firstLineIndentSvg) {
            this.firstLineIndentSvg.remove();
            this.firstLineIndentSvg = null;
        }
        if (this.firstLineIndentPath) {
            this.firstLineIndentPath.remove();
            this.firstLineIndentPath = null;
        }
        if (this.hangingIndentSvg) {
            this.hangingIndentSvg.remove();
            this.hangingIndentSvg = null;
        }
        if (this.hangingIndentPath) {
            this.hangingIndentPath.remove();
            this.hangingIndentPath = null;
        }
        if (this.rightIndentSvg) {
            this.rightIndentSvg.remove();
            this.rightIndentSvg = null;
        }
        if (this.rightIndentPath) {
            this.rightIndentPath.remove();
            this.rightIndentPath = null;
        }
        if (this.leftIndentSvg) {
            this.leftIndentSvg.remove();
            this.leftIndentSvg = null;
        }
        if (this.leftIndentPath) {
            this.leftIndentPath.remove();
            this.leftIndentPath = null;
        }
    };
    RulerHelper.prototype.unWireEvents = function () {
        if (this.markIndicator) {
            this.markIndicator.removeEventListener('click', this.onmarkIndicatorClickHandler);
        }
        if (this.rulerDiv) {
            this.rulerDiv.removeEventListener('dblclick', this.onRulerDblClickHandler);
        }
        if (this.hRuler) {
            this.hRuler.removeEventListener('mouseenter', this.onHRulerMouseEnterHandler);
            this.hRuler.removeEventListener('mouseleave', this.onHRulerMouseLeaveHandler);
            this.hRuler.removeEventListener('mousedown', this.onHRulerMouseDownHandler);
            this.hRuler.removeEventListener('mouseup', this.onHRulerMouseUpHandler);
        }
        if (this.vRuler) {
            this.vRuler.removeEventListener('mousedown', this.onVMouseDownHandler);
        }
        if (this.firstLineIndent) {
            this.firstLineIndent.removeEventListener('dblclick', this.onDoubleClickHandler);
            this.firstLineIndent.removeEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.firstLineIndent.removeEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.firstLineIndent.removeEventListener('mousedown', this.onFirstLineIndentMouseDownHandler);
        }
        document.removeEventListener('mousemove', this.onHorizontalRulerMouseMoveHandler);
        document.removeEventListener('mouseup', this.onRulerMouseUpHandler);
        document.removeEventListener('mousemove', this.onVMouseMoveHandler);
        document.removeEventListener('mouseup', this.onVMouseUpHandler);
        document.removeEventListener('mousemove', this.onIndentMouseMoveHandler);
        document.removeEventListener('mouseup', this.onIndentMouseUpHandler);
        if (this.leftIndent) {
            this.leftIndent.removeEventListener('dblclick', this.onDoubleClickHandler);
            this.leftIndent.removeEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.leftIndent.removeEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.leftIndent.removeEventListener('mousedown', this.onLeftIndentMouseDownHandler);
        }
        document.removeEventListener('mousemove', this.onLeftIndentMouseMoveHandler);
        document.removeEventListener('mouseup', this.onLeftIndentMouseUpHandler);
        if (this.hangingIndent) {
            this.hangingIndent.removeEventListener('dblclick', this.onDoubleClickHandler);
            this.hangingIndent.removeEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.hangingIndent.removeEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.hangingIndent.removeEventListener('mousedown', this.onHangIndentMouseDownHandler);
        }
        document.removeEventListener('mousemove', this.onHangIndentMouseMoveHandler);
        document.removeEventListener('mouseup', this.onHangIndentMouseUpHandler);
        if (this.rightIndent) {
            this.rightIndent.removeEventListener('dblclick', this.onDoubleClickHandler);
            this.rightIndent.removeEventListener('mouseenter', this.onDocumentIntentTrueChangeHandler);
            this.rightIndent.removeEventListener('mouseleave', this.onDocumentIntentFalseChangeHandler);
            this.rightIndent.removeEventListener('mousedown', this.onRightIndentMouseDownHandler);
        }
        document.removeEventListener('mousemove', this.onRightIndentMouseMoveHandler);
        document.removeEventListener('mouseup', this.onRightIndentMouseUpHandler);
        if (this.tabStopElement) {
            this.tabStopElement.removeEventListener('dblclick', this.onTabStopDblClickHandler);
            this.tabStopElement.removeEventListener('mousedown', this.onTabStopMouseDownHandler);
            this.tabStopElement.removeEventListener('mouseup', this.onTabStopMouseUpHandler);
        }
        document.removeEventListener('mousemove', this.onTabStopMouseMoveHandler);
        document.removeEventListener('mouseup', this.onRenderTabStopMouseUpHandler);
        //Set the handler to undefined
        this.onmarkIndicatorClickHandler = undefined;
        // this.onHorizontalRulerMousemoveHandler = undefined;
        // this.onHRulerMouseEnterHandler = undefined;
        // this.onHRulerMouseLeaveHandler = undefined;
        // this.onHRulerMouseDownHandler = undefined;
        // this.onHRulerMouseUpHandler = undefined;
    };
    return RulerHelper;
}());
export { RulerHelper };
