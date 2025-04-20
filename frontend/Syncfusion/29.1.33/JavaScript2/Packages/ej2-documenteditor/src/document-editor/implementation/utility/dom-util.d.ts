import { L10n } from '@syncfusion/ej2-base';
import { DocumentEditor } from '../../document-editor';
import { Ruler } from '../ruler/index';
import { WTabStop } from '../format/paragraph-format';
import { TabJustification } from '../../base/types';
import { Size } from './size';
/**
 * defines the helper methods for the ruler
 * @private
 */
export declare class RulerHelper {
    private tabStopStwitch;
    private currentTabStopElement;
    private position;
    private hRulerBottom;
    /**
     * @private
     */
    vRulerBottom: HTMLElement;
    private locale;
    private documentEditor;
    private resizerEnabled;
    private isDraggingRender;
    private isDraggingIndents1;
    private isDraggingIndents2;
    private isDraggingIndents3;
    private isDraggingIndents4;
    private isDraggingForTab;
    private currentTabStop;
    private currrentParagraph;
    private tabIndex;
    private tabStopOffset;
    private rightLineOffset;
    private leftLineOffset;
    private firstIndentInitialValue;
    private diff;
    private minLimit2;
    private maxLimit2;
    private isHangingIndent;
    private hangingLineOffset;
    private hangingIndentInitialValue;
    private minLimit1;
    private maxLimit1;
    private leftIndent1;
    private tabStopElement;
    private justification;
    private isLeftRulerMargin;
    private isLeftMultiColumn;
    private isRightMultiColumn;
    private multiColumnElement;
    private hRuler;
    private vRuler;
    private columnInitialValue;
    private initialValue;
    private indentInitialValue;
    private tabInitialValue;
    private renderInitialValue;
    private currentScrollLeft;
    private initialRightMargin;
    private finalmouseXRelativeToDiv;
    private mouseDownTabValue;
    private mouseUpTabValue;
    private overlap;
    private markIndicator;
    private hangingIndentRuler;
    private firstLineIndentRuler;
    private rulerDiv;
    private rulerOverlap;
    private rulerMarginDiv;
    private verticalRulerMarginDiv;
    private firstLineIndent;
    private hangingIndent;
    private leftIndent;
    private rightIndent;
    private leftTab;
    private centerTab;
    private rightTab;
    private decimalTab;
    private barTab;
    private rulerSpaceDiv;
    private parentRulerDiv;
    private hSvg;
    private vLine;
    private vSvg;
    private hLine;
    private firstLineIndentSvg;
    private firstLineIndentPath;
    private hangingIndentSvg;
    private hangingIndentPath;
    private rightIndentSvg;
    private rightIndentPath;
    private leftIndentSvg;
    private leftIndentPath;
    private onmarkIndicatorClickHandler;
    private onHorizontalRulerMouseMoveHandler;
    private onHRulerMouseEnterHandler;
    private onHRulerMouseLeaveHandler;
    private onHRulerMouseDownHandler;
    private onHRulerMouseUpHandler;
    private onRulerDblClickHandler;
    private onDoubleClickHandler;
    private onRulerMouseUpHandler;
    private onVMouseMoveHandler;
    private onVMouseDownHandler;
    private onVMouseUpHandler;
    private onDocumentIntentTrueChangeHandler;
    private onDocumentIntentFalseChangeHandler;
    private onFirstLineIndentMouseDownHandler;
    private onIndentMouseMoveHandler;
    private onIndentMouseUpHandler;
    private onHangIndentMouseDownHandler;
    private onHangIndentMouseMoveHandler;
    private onHangIndentMouseUpHandler;
    private onLeftIndentMouseDownHandler;
    private onLeftIndentMouseMoveHandler;
    private onLeftIndentMouseUpHandler;
    private onRightIndentMouseDownHandler;
    private onRightIndentMouseMoveHandler;
    private onRightIndentMouseUpHandler;
    private onTabStopMouseDownHandler;
    private onTabStopMouseUpHandler;
    private onTabStopMouseMoveHandler;
    private onRenderTabStopMouseUpHandler;
    private onTabStopDblClickHandler;
    private onMarkIndicatorClick;
    onHRulerMouseEnter(): void;
    private onHRulerMouseLeave;
    private onRulerDblClick;
    private onHRulerMouseDown;
    private onHRulerMouseUp;
    private onRularMouseUp;
    private onVMouseMove;
    private onVMouseDown;
    private onVMouseUp;
    private onDocumentIntentTrue;
    private onDocumentIntentFalse;
    private onDoubleClick;
    private onFirstLineIndentMouseDown;
    private onIndentMouseMove;
    private onIndentMouseUp;
    private onHangIndentMouseDown;
    private onHangIndentMouseMove;
    private onHangIndentMouseUp;
    private onLeftIndentMouseDown;
    private onLeftIndentMouseMove;
    private onLeftIndentMouseUp;
    private onRightIndentMouseDown;
    private onRightIndentMouseMove;
    private onRightIndentMouseUp;
    private onTabStopMouseDown;
    private onTabStopMouseUp;
    private onTabStopMouseMove;
    private onRenderTabStopMouseUp;
    private onTabStopDblClick;
    /**
     * @private
     */
    hideTabStopSwitch(show: boolean): void;
    /**
     * @private
     */
    hideRulerBottom(show: boolean): void;
    private showHideElement;
    /**
     * createHtmlElement method \
     *
     * @returns {SVGSVGElement} createHtmlElement method .\
     * @param { string } elementType - provide the diagramId  value.
     * @param { Object } attribute - provide the diagramId  value.
     * @private
     */
    createHtmlElement(elementType: string, attribute: Object): HTMLElement;
    /**
     * createSvgElement method \
     *
     * @returns {SVGSVGElement} createSvgElement method .\
     * @param { string } elementType - provide the elementType  value.
     * @param { Object } attribute - provide the attribute  value.
     * @private
     */
    createSvgElement(elementType: string, attribute: Object): SVGElement;
    /**
     * applyStyleAgainstCsp method   \
     *
     * @returns {void} applyStyleAgainstCsp method .\
     * @param { SVGElement } svg - provide the svg  value.
     * @param { string } attributes - provide the boolean  value.
     * @private
     */
    applyStyleAgainstCsp(svg: SVGElement | HTMLElement, attributes: string): void;
    /**
     * setAttributeSvg method.
     *
     * @returns {void} setAttributeSvg method .\
     * @param { SVGElement } svg - provide the svg  value.
     * @param { Object } attributes - provide the boolean  value.
     * @private
     */
    setAttributeSvg(svg: SVGElement, attributes: Object): void;
    /**
     * setAttributeHtml method   \
     *
     * @returns {void} setAttributeHtml method .\
     * @param { HTMLElement } element - provide the svg  value.
     * @param { Object } attributes - provide the boolean  value.
     * @private
     */
    setAttributeHtml(element: HTMLElement, attributes: Object): void;
    /**
     * renderOverlapElement method \
     *
     * @returns {void} renderOverlapElement method .\
     * @param { DocumentEditor} documentEditor - provide the content  value.
     * @private
     */
    renderOverlapElement(documentEditor: DocumentEditor): HTMLElement;
    renderRulerMarkerIndicatorElement(documentEditor: DocumentEditor): void;
    private rulerGeometry;
    private isTopRulerMargin;
    private initialYValue;
    private currentScrollTop;
    private firstLineOffset;
    /**
     * renderRuler method \
     *
     * @returns {void} renderRuler method .\
     * @param { DocumentEditor} documentEditor - provide the content  value.
     * @param { boolean} isHorizontal - provide the content  value.
     * @private
     */
    renderRuler(documentEditor: DocumentEditor, isHorizontal: boolean): void;
    onHorizontalRulerMouseMoved(e: MouseEvent): void;
    updateRulerPosition(documentEditor: DocumentEditor, isHorizontal: boolean): void;
    updateIndicatorLines(documentEditor: DocumentEditor): void;
    createIndicatorLines(documentEditor: DocumentEditor): void;
    updateIndentMarkers(documentEditor: DocumentEditor): void;
    updateTabStopMarkers(documentEditor: DocumentEditor): void;
    private renderRulerMargins;
    private updateRulerMargins;
    private updateHorizontalRulerMargin;
    resizeVRulerMargins(isRulerTopMargin: boolean, currentTopMargin: number, currentScrollTop: number, currentBottomMargin: number, ruler: HTMLElement, mousePosition: number, documentEditor: DocumentEditor): void;
    private resizeRulerMargins;
    getRulerOrigin(): void;
    renderIndents(documentEditor: DocumentEditor, isHorizontal: boolean, rulerSize: Size, rulerGeometry: Size, locale: L10n): void;
    /**
     * updateRuler method
     *
     * @returns {void} updateRuler method.
     * @param {DocumentEditor} documentEditor - provide the documentEditor  value.
     * @param {boolean} rerenderRuler - provide the rerenderRuler  value.
     * @private
     */
    updateRuler(documentEditor: DocumentEditor, rerenderRuler: boolean): void;
    private removeTableMarkers;
    private updateTableMarkers;
    private renderTableMarkers;
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
    private updateRulerDimension;
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
    private updateRulerSpace;
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
    updateRulerDiv(documentEditor: DocumentEditor, rulerGeometry: Size, isHorizontal: boolean, ruler: Ruler): void;
    /**
     * getRulerGeometry method \
     *
     * @returns {void} getRulerGeometry method .\
     * @param { DocumentEditor} documentEditor - provide the documentEditor  value.
     * @private
     */
    private getRulerGeometry;
    private getVerticalHeight;
    renderTab(documentEditor: DocumentEditor, rulerSize: Size, tabStop: WTabStop, tabJustification: TabJustification, i: number, locale?: L10n): void;
    updateMargin(ruler: Ruler, documentEditor: DocumentEditor, isHorizontal: boolean): void;
    getTabJustification(dataNameValue: string): TabJustification;
    /**
     * getRulerSize method \
     *
     * @returns {void} getRulerSize method .\
     * @param { DocumentEditor} documentEditor - provide the documentEditor  value.
     * @private
     */
    getRulerSize(documentEditor: DocumentEditor): Size;
    destroy(): void;
    private removeHTMLElements;
    private removeSvgElements;
    private unWireEvents;
}
