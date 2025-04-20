import { PathElement } from '../core/elements/path-element';
import { ImageElement } from '../core/elements/image-element';
import { TextElement } from '../core/elements/text-element';
import { Container } from '../core/containers/container';
import { rotateMatrix, identityMatrix, transformPointByMatrix } from '../primitives/matrix';
import { Size } from '../primitives/size';
import { wordBreakToString, whiteSpaceToString, textAlignToString, randomId, rotatePoint } from '../utility/base-util';
import { getUserHandlePosition, canShowCorner, getInterval, getSpaceValue, canShowControlPoints } from '../utility/diagram-util';
import { getDiagramElement, getAdornerLayer, getGridLayer, getHTMLLayer, updatePath } from '../utility/dom-util';
import { measurePath, getBackgroundLayerSvg, getBackgroundImageLayer, setAttributeSvg } from '../utility/dom-util';
import { SnapConstraints, RendererAction, FlipDirection, ConnectorConstraints } from '../enum/enum';
import { ThumbsConstraints, SelectorConstraints, ElementAction } from '../enum/enum';
import { SvgRenderer } from './svg-renderer';
import { CanvasRenderer } from './canvas-renderer';
import { processPathData, splitArrayCollection, transformPath } from '../utility/path-util';
import { isDiagramChild } from '../utility/diagram-util';
import { DiagramNativeElement } from '../core/elements/native-element';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { Point } from '../primitives/point';
import { canDrawThumbs, avoidDrawSelector } from '../utility/constraints-util';
import { Diagram } from '../diagram';
import { getSegmentThumbShapeHorizontal, getSegmentThumbShapeVertical } from '../objects/dictionary/common';
/**
 * Renderer module is used to render basic diagram elements
 */
/** @private */
var DiagramRenderer = /** @class */ (function () {
    function DiagramRenderer(name, svgRender, isSvgMode) {
        /**   @private  */
        this.renderer = null;
        /** @private */
        this.isSvgMode = true;
        /** @private */
        this.touchMove = undefined;
        this.transform = { x: 0, y: 0 };
        this.diagramId = name;
        this.element = getDiagramElement(this.diagramId);
        this.svgRenderer = svgRender;
        this.isSvgMode = isSvgMode;
        this.renderer = isSvgMode ? new SvgRenderer() : new CanvasRenderer();
    }
    /**
     * Method used to set the cur \
     *
     *  @param {HTMLElement} canvas - Provide the canvas .
     *  @param {string} cursor - Provide the element .
     * @returns {void }   Method used to set the layer  .\
     * @private
     */
    DiagramRenderer.prototype.setCursor = function (canvas, cursor) {
        canvas.style.cursor = cursor;
    };
    /**
     * Method used to set the layer \
     *
     * @returns {void }   Method used to set the layer  .\
     *
     * @private
     */
    DiagramRenderer.prototype.setLayers = function () {
        this.iconSvgLayer = this.element.getElementsByClassName('e-ports-expand-layer')[0];
        this.adornerSvgLayer = this.element.getElementsByClassName('e-adorner-layer')[0];
        this.nativeSvgLayer = this.element.getElementsByClassName('e-native-layer')[0];
        this.diagramSvgLayer = this.element.getElementsByClassName('e-diagram-layer')[0];
    };
    DiagramRenderer.prototype.getAdornerLayer = function () {
        var adornerLayer = getAdornerLayer(this.diagramId);
        return adornerLayer;
    };
    DiagramRenderer.prototype.getParentSvg = function (element, targetElement, canvas) {
        if (this.diagramId && element && element.id) {
            if (element.id.split('_icon_content').length > 1 || element.id.split('_nodeport').length > 1 ||
                (element.elementActions & ElementAction.ElementIsPort)) {
                return this.iconSvgLayer;
            }
            if (targetElement && targetElement === 'selector') {
                return this.adornerSvgLayer;
            }
            else if (element instanceof DiagramNativeElement) {
                return this.nativeSvgLayer;
            }
            else {
                return this.diagramSvgLayer;
            }
        }
        return canvas;
    };
    DiagramRenderer.prototype.getParentElement = function (element, defaultParent, svgElement, indexValue) {
        var layerGElement = defaultParent;
        if (svgElement && this.diagramId && element && element.id) {
            if (element.id.split('_icon_content').length > 1) {
                layerGElement = svgElement.getElementById(this.diagramId + '_diagramExpander');
                defaultParent = null;
            }
            else if (element.id.split('_nodeport').length > 1) {
                layerGElement = svgElement.getElementById(this.diagramId + '_diagramPorts');
            }
            else if (element instanceof DiagramNativeElement) {
                layerGElement = svgElement.getElementById(this.diagramId + '_nativeLayer');
                defaultParent = null;
            }
            else if (element.elementActions & ElementAction.ElementIsPort) {
                layerGElement = svgElement.getElementById(this.diagramId + '_diagramPorts');
                defaultParent = null;
            }
            else {
                layerGElement = svgElement.getElementById(this.diagramId + '_diagramLayer');
            }
            var groupElement = this.getGroupElement(element, defaultParent || layerGElement, indexValue);
            layerGElement = groupElement.g;
            if (groupElement.svg) {
                svgElement = groupElement.svg;
            }
        }
        return { g: layerGElement, svg: svgElement };
    };
    DiagramRenderer.prototype.getGroupElement = function (element, canvas, indexValue) {
        var gElement;
        var parentSvg = this.getParentSvg(element);
        var svgElement;
        if (canvas && parentSvg) {
            if (parentSvg) {
                gElement = parentSvg.getElementById(element.id + '_groupElement');
                if (!gElement && parentSvg !== this.nativeSvgLayer) { //code added
                    var nativeSvg = this.nativeSvgLayer;
                    gElement = nativeSvg.getElementById(element.id + '_groupElement');
                    svgElement = nativeSvg;
                }
            }
            if (!gElement) {
                gElement = this.svgRenderer.createGElement('g', { id: element.id + '_groupElement' });
                if (indexValue !== undefined && canvas.childNodes.length > indexValue) {
                    canvas.insertBefore(gElement, canvas.childNodes[parseInt(indexValue.toString(), 10)]);
                }
                else {
                    canvas.appendChild(gElement);
                }
            }
        }
        return { g: gElement, svg: svgElement };
    };
    /**
     * Method used to render the diagram element \
     *
     * @returns {void }   Method used to render the diagram element  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the canvas value.
     * @param {HTMLElement } htmlLayer - Provide the HTMLElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {SVGSVGElement} parentSvg - Provide the SVGSVGElement value.
     * @param {boolean } createParent - Provide the boolean value.
     * @param {boolean } fromPalette - Provide the boolean value.
     * @param {number } indexValue - Provide the indexValue value.
     * @param {boolean } isPreviewNode - Provide the isPreviewNode value.
     * @param {object } centerPoint - Provide the centerPoint value.
     * @param {object} portCenterPoint - Provide the portCenterPoint value.
     * @private
     */
    DiagramRenderer.prototype.renderElement = function (element, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, isPreviewNode, centerPoint, portCenterPoint) {
        var isElement = true;
        if (element instanceof Container) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            isElement = false;
            element.id = element.id ? element.id : randomId();
            this.renderContainer(element, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, isPreviewNode, centerPoint, portCenterPoint);
        }
        else if (element instanceof ImageElement) {
            this.renderImageElement(element, canvas, transform, parentSvg, fromPalette);
        }
        else if (element instanceof PathElement) {
            this.renderPathElement(element, canvas, transform, parentSvg, fromPalette, isPreviewNode, portCenterPoint);
        }
        else if (element instanceof TextElement) {
            this.renderTextElement(element, canvas, transform, parentSvg, fromPalette, centerPoint);
        }
        else if (element instanceof DiagramNativeElement) {
            this.renderNativeElement(element, canvas, transform, parentSvg, fromPalette);
        }
        else if (element instanceof DiagramHtmlElement) {
            this.renderHTMLElement(element, canvas, htmlLayer, transform, parentSvg, fromPalette, indexValue);
        }
        else {
            this.renderRect(element, canvas, transform, parentSvg, isPreviewNode);
        }
    };
    /**
     * Method used to draw the selection rectangle for the node \
     *
     * @returns {void }  Method used to draw the selection rectangle for the node  .\
     *
     * @param {number} x - Provide the DiagramElement value.
     * @param {number } y - Provide the SVGElement value.
     * @param {number } w - Provide the Transforms value.
     * @param {number } h - Provide the Transforms value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the Transforms value.
     * @param {number } t - Provide the Transforms value.
     * @private
     */
    DiagramRenderer.prototype.drawSelectionRectangle = function (x, y, w, h, canvas, t) {
        x = (x + t.tx) * t.scale;
        y = (y + t.ty) * t.scale;
        var options = {
            width: w * t.scale, height: h * t.scale,
            x: x + 0.5, y: y + 0.5, fill: 'transparent', stroke: 'gray', angle: 0,
            pivotX: 0.5, pivotY: 0.5, strokeWidth: 1,
            dashArray: '6 3', opacity: 1,
            visible: true, id: canvas.id + '_selected_region'
        };
        var adornerLayer = this.getAdornerLayer();
        this.svgRenderer.updateSelectionRegion(adornerLayer, options);
    };
    /**
     * Method used to render the highlighter \
     *
     * @returns {void }  Method used to render the highlighter  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @private
     */
    DiagramRenderer.prototype.renderHighlighter = function (element, canvas, transform) {
        var width = element.actualSize.width || 2;
        var height = element.actualSize.height || 2;
        var x = element.offsetX - width * element.pivot.x;
        var y = element.offsetY - height * element.pivot.y;
        x = (x + transform.tx) * transform.scale;
        y = (y + transform.ty) * transform.scale;
        var options = {
            width: width * transform.scale, height: height * transform.scale,
            x: x, y: y, fill: 'transparent', stroke: '#8CC63F', angle: element.rotateAngle,
            pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: 4,
            dashArray: '', opacity: 1, cornerRadius: 0,
            visible: true, id: canvas.id + '_highlighter', class: 'e-diagram-highlighter'
        };
        this.svgRenderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, canvas);
    };
    /**
     * Method used to render the node selection rectangle \
     *
     * @returns {void }  Method used to render the node selection rectangle  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {number } isFirst - Provide the boolean value.
     * @private
     */
    DiagramRenderer.prototype.renderSelectionRectangle = function (element, canvas, transform, isFirst) {
        var width = element.actualSize.width || 2;
        var height = element.actualSize.height || 2;
        var x = element.offsetX - width * element.pivot.x;
        var y = element.offsetY - height * element.pivot.y;
        x = (x + transform.tx) * transform.scale;
        y = (y + transform.ty) * transform.scale;
        var options = {
            width: width * transform.scale, height: height * transform.scale,
            x: x, y: y, fill: 'transparent', stroke: '#00cc00', angle: element.rotateAngle,
            pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: isFirst ? 2 : 1,
            dashArray: '', opacity: 1, cornerRadius: 0,
            visible: true, id: element.id + '_highlighter', class: isFirst ? 'e-diagram-first-selection-indicator e-diagram-selection-indicator' : 'e-diagram-selection-indicator'
        };
        var parentSvg = this.getParentSvg(element, 'selector');
        this.svgRenderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, parentSvg);
    };
    /**
     * Method used to render the selection line for connector  \
     *
     * @returns {void } Method used to render the selection line for connector .\
     *
     * @param {PathElement} element - Provide the path element of the diagram .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value.
     * @param { boolean } isFirst - Provide the boolean value.
     * @private
     */
    DiagramRenderer.prototype.renderSelectionLine = function (element, canvas, transform, isFirst) {
        var options = this.getBaseAttributes(element, transform);
        options.data = element.absolutePath;
        options.id = options.id + '_highlighter';
        var ariaLabel = element.description ? element.description : element.id;
        if (!this.isSvgMode) {
            options.x = element.flipOffset.x ? element.flipOffset.x : options.x;
            options.y = element.flipOffset.y ? element.flipOffset.y : options.y;
        }
        if (transform) {
            options.x = options.x * transform.scale;
            options.y = options.y * transform.scale;
        }
        options.stroke = '#00cc00';
        options.strokeWidth = isFirst ? 2 : 1;
        options.class = isFirst ? 'e-diagram-first-selection-indicator e-diagram-selection-indicator' : 'e-diagram-selection-indicator';
        var parentSvg = this.getParentSvg(element, 'selector');
        this.svgRenderer.drawPath(canvas, options, this.diagramId, undefined, parentSvg, ariaLabel, transform.scale);
    };
    /**
     * Method used to render the stack highlighter \
     *
     * @returns {void }  Method used to render the stack highlighter  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {SVGElement } canvas - Provide the SVGElement value.
     * @param {Transforms } transform - Provide the Transforms value.
     * @param {boolean} isVertical - Provide the Boolean value.
     * @param {PointModel } position - Provide the PointModel value.
     * @param {boolean } isUml - Provide the boolean value.
     * @param {boolean } isSwimlane - Provide the boolean value.
     * @private
     */
    DiagramRenderer.prototype.renderStackHighlighter = function (element, canvas, transform, isVertical, position, isUml, isSwimlane) {
        var width = element.actualSize.width || 2;
        var x = element.offsetX - width * element.pivot.x;
        var height = element.actualSize.height || 2;
        var y = element.offsetY - height * element.pivot.y;
        x = (x + transform.tx) * transform.scale;
        var data;
        var bounds = element.bounds;
        var newPathString = '';
        y = (y + transform.ty) * transform.scale;
        if (!isVertical) {
            var d = height * transform.scale;
            data = 'M 10 -10 L 0 0 Z M -10 -10 L 0 0 Z M 0 0 L 0 ' + (d) + ' Z M 0  ' + (d) +
                ' L -10  ' + (d + 10) + ' Z L 10  ' + (d + 10) + ' Z';
            if (position.x >= element.offsetX) {
                //879085- swimlane helper guides not rendered properly when zoomed
                x += width * transform.scale;
            }
        }
        else {
            if (isUml) {
                var d = width * transform.scale;
                data = 'M 0 0 L ' + (d + 2) + ' 0 Z';
                var scaleX = -bounds.x;
                var scaleY = -bounds.y;
                var arrayCollection = [];
                scaleX = element.actualSize.width / Number(bounds.width ? bounds.width : 1) * transform.scale;
                scaleY = element.actualSize.height / Number(bounds.height ? bounds.height : 1) * transform.scale;
                var umlData = 'M7,4 L8,4 8,7 11,7 11,8 8,8 8,11 7,11 7,8 4,8 4,7 7,7 z M7.5,0.99999994' +
                    'C3.9160004,1 1,3.9160004 0.99999994,7.5 1,11.084 3.9160004,14 7.5,14 11.084,14 14,11.084 14,7.5 14,' +
                    '3.9160004 11.084,1 7.5,0.99999994 z M7.5,0 C11.636002,0 15,3.3639984 15,7.5 15,11.636002 11.636002,15 7.5,' +
                    '15 3.3640003,15 0,11.636002 0,7.5 0,3.3639984 3.3640003,0 7.5,0 z';
                arrayCollection = processPathData(umlData);
                arrayCollection = splitArrayCollection(arrayCollection);
                newPathString = transformPath(arrayCollection, scaleX + d + 2, scaleY - 8, false, bounds.x, bounds.y, 0, 0);
                if (position.y >= element.offsetY) {
                    y += height;
                }
            }
            else {
                if (isSwimlane) {
                    if (position.y >= element.offsetY) {
                        //879085- swimlane helper guides not rendered properly when zoomed
                        y += height * transform.scale;
                    }
                }
                var d = width * transform.scale;
                data = 'M -10 -10 L 0 0 Z M -10 10 L 0 0 Z M 0 0 L ' + (d) + ' 0 Z M ' + (d) + ' 0 L ' +
                    (d + 10) + ' 10 Z L ' + (d + 10) + ' -10 Z';
            }
        }
        var options = {
            data: data + newPathString,
            width: width * transform.scale, height: height * transform.scale,
            x: x, y: y, fill: 'transparent', stroke: '#8CC63F', angle: element.rotateAngle,
            pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: 1,
            dashArray: '', opacity: 1,
            visible: true, id: canvas.id + '_stack_highlighter', class: 'e-diagram-highlighter'
        };
        this.svgRenderer.drawPath(canvas, options, this.diagramId);
    };
    /**
     * Method used to draw the line \
     *
     * @returns {void }  Method used to draw the line  .\
     *
     * @param {SVGElement} canvas - Provide the SVGElement value.
     * @param {LineAttributes } options - Provide the LineAttributes value.
     * @private
     */
    DiagramRenderer.prototype.drawLine = function (canvas, options) {
        this.svgRenderer.drawLine(canvas, options);
    };
    /**
     * Method used to draw the path \
     *
     * @returns {void }  Method used to draw the path  .\
     *
     * @param {SVGElement} canvas - Provide the canvas value.
     * @param {PathAttributes } options - Provide the PathAttributes value.
     * @private
     */
    DiagramRenderer.prototype.drawPath = function (canvas, options) {
        this.svgRenderer.drawPath(canvas, options, this.diagramId);
    };
    /**
     * Method used to render the resize handle \
     *
     * @returns {void }  Method used to render the resize handle  .\
     *
     * @param {DiagramElement} element - Provide the DiagramElement value.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param {  ThumbsConstraints } constraints - Provide the constraints value  .
     * @param { number} currentZoom - Provide the currentZoom value.
     * @param { SelectorConstraints } selectorConstraints - Provide the selectorConstraints value .
     * @param { Transforms } transform - Provide the transform  value.
     * @param { boolean } canMask - Provide the canMask boolean value.
     * @param { number } enableNode - Provide the enableNode value.
     * @param { boolean } nodeConstraints - Provide the nodeConstraints  value.
     * @param { boolean } isSwimlane - Provide the isSwimlane boolean value.
     * @param { number } handleSize - Provide the handleSize value.
     * @private
     */
    DiagramRenderer.prototype.renderResizeHandle = function (element, canvas, constraints, currentZoom, selectorConstraints, transform, canMask, enableNode, nodeConstraints, isSwimlane, handleSize) {
        var left = element.offsetX - element.actualSize.width * element.pivot.x;
        var top = element.offsetY - element.actualSize.height * element.pivot.y;
        var height = element.actualSize.height;
        var width = element.actualSize.width;
        if (!isSwimlane &&
            (constraints & ThumbsConstraints.Rotate && canDrawThumbs(this.rendererActions) && (!avoidDrawSelector(this.rendererActions)))) {
            this.renderPivotLine(element, canvas, transform, selectorConstraints, canMask);
            this.renderRotateThumb(element, canvas, transform, selectorConstraints, canMask);
        }
        else {
            if (this.touchMove) {
                var rotateThumb = document.getElementById('rotateThumb');
                if (rotateThumb) {
                    rotateThumb.setAttribute('visibility', 'hidden');
                }
            }
        }
        this.renderBorder(element, canvas, transform, enableNode, nodeConstraints, isSwimlane);
        var nodeWidth = element.actualSize.width * currentZoom;
        var nodeHeight = element.actualSize.height * currentZoom;
        if (!nodeConstraints && canDrawThumbs(this.rendererActions) && (!avoidDrawSelector(this.rendererActions))) {
            //Bug 860033: Bpmn text annotation path size not rendered properly while dragging.
            //Added below condition to prevent the resize thumbs for bpmn text annotation.
            if (!element.isTextAnnotation) {
                if (nodeWidth >= 40 && nodeHeight >= 40) {
                    //Hide corners when the size is less than 40
                    if (selectorConstraints & SelectorConstraints.ResizeNorthWest) {
                        this.renderCircularHandle('resizeNorthWest', element, left, top, canvas, canShowCorner(selectorConstraints, 'ResizeNorthWest'), constraints & ThumbsConstraints.ResizeNorthWest, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on top left side direction' }, undefined, 'e-diagram-resize-handle e-northwest', handleSize);
                    }
                    if (selectorConstraints & SelectorConstraints.ResizeNorthEast) {
                        this.renderCircularHandle('resizeNorthEast', element, left + width, top, canvas, canShowCorner(selectorConstraints, 'ResizeNorthEast'), constraints & ThumbsConstraints.ResizeNorthEast, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on top right side direction' }, undefined, 'e-diagram-resize-handle e-northeast', handleSize);
                    }
                    if (selectorConstraints & SelectorConstraints.ResizeSouthWest) {
                        this.renderCircularHandle('resizeSouthWest', element, left, top + height, canvas, canShowCorner(selectorConstraints, 'ResizeSouthWest'), constraints & ThumbsConstraints.ResizeSouthWest, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on bottom left side direction' }, undefined, 'e-diagram-resize-handle e-southwest', handleSize);
                    }
                    if (selectorConstraints & SelectorConstraints.ResizeSouthEast) {
                        this.renderCircularHandle('resizeSouthEast', element, left + width, top + height, canvas, canShowCorner(selectorConstraints, 'ResizeSouthEast'), constraints & ThumbsConstraints.ResizeSouthEast, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on bottom right side direction' }, undefined, 'e-diagram-resize-handle e-southeast', handleSize);
                    }
                }
                if (selectorConstraints & SelectorConstraints.ResizeNorth) {
                    this.renderCircularHandle('resizeNorth', element, left + width / 2, top, canvas, canShowCorner(selectorConstraints, 'ResizeNorth'), constraints & ThumbsConstraints.ResizeNorth, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on top side direction' }, undefined, 'e-diagram-resize-handle e-north', handleSize);
                }
                if (selectorConstraints & SelectorConstraints.ResizeSouth) {
                    this.renderCircularHandle('resizeSouth', element, left + width / 2, top + height, canvas, canShowCorner(selectorConstraints, 'ResizeSouth'), constraints & ThumbsConstraints.ResizeSouth, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on bottom side direction' }, undefined, 'e-diagram-resize-handle e-south', handleSize);
                }
                if (selectorConstraints & SelectorConstraints.ResizeWest) {
                    this.renderCircularHandle('resizeWest', element, left, top + height / 2, canvas, canShowCorner(selectorConstraints, 'ResizeWest'), constraints & ThumbsConstraints.ResizeWest, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on left side direction' }, undefined, 'e-diagram-resize-handle e-west', handleSize);
                }
                if (selectorConstraints & SelectorConstraints.ResizeEast) {
                    this.renderCircularHandle('resizeEast', element, left + width, top + height / 2, canvas, canShowCorner(selectorConstraints, 'ResizeEast'), constraints & ThumbsConstraints.ResizeEast, transform, undefined, canMask, { 'aria-label': 'Thumb to resize the selected object on right side direction' }, undefined, 'e-diagram-resize-handle e-east', handleSize);
                }
            }
        }
    };
    /**
     * Method used to render the end point of the handle \
     *
     * @returns {void }  Method used to render the end point of the handle  .\
     *
     * @param {ConnectorModel} selector - Provide the ConnectorModel.
     * @param {HTMLCanvasElement | SVGElement } canvas - Provide the element.
     * @param {  ThumbsConstraints } constraints - Provide the constraints value  .
     * @param { SelectorConstraints} selectorConstraints - Provide the selectorConstraints value.
     * @param { Transforms } transform - Provide the transform value .
     * @param { boolean } connectedSource - Provide the connectedSource boolean value.
     * @param { boolean } connectedTarget - Provide the connectedTarget boolean value.
     * @param { boolean } isSegmentEditing - Provide the isSegmentEditing boolean value.
     * @param { boolean } canShowBezierPoints - Provide the canShowBezierPoints boolean value.
     * @param {number} handleSize - Provide the handleSize value.
     * @private
     */
    DiagramRenderer.prototype.renderEndPointHandle = function (selector, canvas, constraints, selectorConstraints, transform, connectedSource, connectedTarget, isSegmentEditing, canShowBezierPoints, handleSize) {
        var sourcePoint = selector.sourcePoint;
        var targetPoint = selector.targetPoint;
        var wrapper = selector.wrapper;
        var i;
        var segment;
        this.renderCircularHandle('connectorSourceThumb', wrapper, sourcePoint.x, sourcePoint.y, canvas, canShowCorner(selectorConstraints, 'ConnectorSourceThumb'), constraints & ThumbsConstraints.ConnectorSource, transform, connectedSource, undefined, { 'aria-label': 'Thumb to move the source point of the connector' }, undefined, 'e-diagram-endpoint-handle e-sourceend', handleSize);
        this.renderCircularHandle('connectorTargetThumb', wrapper, targetPoint.x, targetPoint.y, canvas, canShowCorner(selectorConstraints, 'ConnectorTargetThumb'), constraints & ThumbsConstraints.ConnectorTarget, transform, connectedTarget, undefined, { 'aria-label': 'Thumb to move the target point of the connector' }, undefined, 'e-diagram-endpoint-handle e-targetend', handleSize);
        if (isSegmentEditing) {
            if ((selector.type === 'Straight') && selector.segments.length > 0) {
                for (i = 0; i < selector.segments.length - 1; i++) {
                    segment = selector.segments[parseInt(i.toString(), 10)];
                    var className = 'e-diagram-straight-segment-handle';
                    this.renderCircularHandle(('segementThumb_' + (i + 1)), wrapper, segment.point.x, segment.point.y, canvas, true, constraints & ThumbsConstraints.ConnectorSource, transform, connectedSource, null, null, i, className, handleSize);
                }
            } //824805-Support to modify bezier connector segment thumb shape and style
            else if ((selector.type === 'Bezier') && selector.segments.length > 0) {
                for (i = 0; i < selector.segments.length - 1; i++) {
                    segment = selector.segments[parseInt(i.toString(), 10)];
                    var className = 'e-diagram-bezier-segment-handle';
                    this.renderBezierHandle(('segementThumb_' + (i + 1)), wrapper, segment.point.x, segment.point.y, canvas, true, selector, transform, connectedSource, null, i, className, handleSize);
                }
            }
            else {
                // (EJ2-57115) - Added below code to check if maxSegmentThumb is zero or not
                if (!selector.maxSegmentThumb) {
                    for (i = 0; i < selector.segments.length; i++) {
                        var seg = selector.segments[parseInt(i.toString(), 10)];
                        this.renderOrthogonalThumbs('orthoThumb_' + (i + 1), wrapper, seg, canvas, canShowCorner(selectorConstraints, 'ConnectorSourceThumb'), transform, selector);
                    }
                }
                else {
                    // (EJ2-57115) - Added below code to check if maxSegmentThumb is non zero then we have ignore the rendering of
                    // first and last segment thumb
                    var start = selector.segments.length <= selector.maxSegmentThumb ? 0 : 1;
                    var end = selector.segments.length <= selector.maxSegmentThumb
                        ? selector.segments.length : selector.segments.length - 1;
                    // (EJ2-57115) - If maxSegmentThumb is greater than or equal to 3 means then set start as second segment(1) and end as last before segment
                    if (selector.maxSegmentThumb >= 3 && selector.segments.length === 3) {
                        start = 1;
                        end = selector.segments.length - 1;
                    }
                    // (EJ2-57115) - If segments length is greater than maxSegmentThumb + 2 means then set start as 2
                    start = selector.segments.length > selector.maxSegmentThumb + 2 ? 2 : start;
                    // (EJ2-57115) - If segments length is greater than maxSegmentThumb + 2 means then set end as last before segment
                    end = selector.segments.length > selector.maxSegmentThumb + 2 ? selector.segments.length - 2 : end;
                    if (selector.segments.length === 1 && selector.segments[0].points.length <= 2) {
                        start = 1;
                        end = selector.segments.length;
                    }
                    for (i = start; i < end; i++) {
                        var seg = selector.segments[parseInt(i.toString(), 10)];
                        this.renderOrthogonalThumbs('orthoThumb_' + (i + 1), wrapper, seg, canvas, canShowCorner(selectorConstraints, 'ConnectorSourceThumb'), transform, selector);
                    }
                }
            }
        }
        if (selector.type === 'Bezier' && canShowBezierPoints) {
            var segmentCount = selector.segments.length - 1;
            var controlPointsVisibility = selector.bezierSettings != null
                ? selector.bezierSettings.controlPointsVisibility : null;
            for (i = 0; i <= segmentCount; i++) {
                var segment_1 = selector.segments[parseInt(i.toString(), 10)];
                var bezierPoint = !Point.isEmptyPoint(segment_1.point1) ? segment_1.point1
                    : segment_1.bezierPoint1;
                if (controlPointsVisibility != null && (i === 0 && canShowControlPoints(controlPointsVisibility, 'Source'))
                    || (i !== 0 && canShowControlPoints(controlPointsVisibility, 'Intermediate'))) {
                    this.renderCircularHandle('bezierPoint_' + (i + 1) + '_1', wrapper, bezierPoint.x, bezierPoint.y, canvas, canShowCorner(selectorConstraints, 'ConnectorSourceThumb'), constraints & ThumbsConstraints.ConnectorSource, transform, undefined, undefined, { 'aria-label': 'Thumb to move the source point of the connector' }, undefined, 'e-diagram-bezier-control-handle e-source', handleSize);
                    if (canShowCorner(selectorConstraints, 'ConnectorSourceThumb')) {
                        this.renderBezierLine('bezierLine_' + (i + 1) + '_1', wrapper, canvas, segment_1.points[0], !Point.isEmptyPoint(segment_1.point1) ? segment_1.point1 : segment_1.bezierPoint1, transform);
                    }
                }
                bezierPoint = !Point.isEmptyPoint(segment_1.point2) ? segment_1.point2 : segment_1.bezierPoint2;
                if (controlPointsVisibility != null && (i === segmentCount && canShowControlPoints(controlPointsVisibility, 'Target'))
                    || (i !== segmentCount && canShowControlPoints(controlPointsVisibility, 'Intermediate'))) {
                    this.renderCircularHandle('bezierPoint_' + (i + 1) + '_2', wrapper, bezierPoint.x, bezierPoint.y, canvas, canShowCorner(selectorConstraints, 'ConnectorTargetThumb'), constraints & ThumbsConstraints.ConnectorTarget, transform, undefined, undefined, { 'aria-label': 'Thumb to move the target point of the connector' }, undefined, 'e-diagram-bezier-control-handle e-target', handleSize);
                    if (canShowCorner(selectorConstraints, 'ConnectorTargetThumb')) {
                        this.renderBezierLine('bezierLine_' + (i + 1) + '_2', wrapper, canvas, segment_1.points[1], !Point.isEmptyPoint(segment_1.point2) ? segment_1.point2 : segment_1.bezierPoint2, transform);
                    }
                }
            }
        }
    };
    /**
     * Method used to render the orthogonal thumb \
     *
     * @returns {void }  Method used to render the orthogonal thumb  .\
     *
     * @param {string} id - Provide the id for the element.
     * @param {DiagramElement } selector - Provide the selector element.
     * @param {  OrthogonalSegment } segment - Provide the segment value  .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { boolean } visibility - Provide the visibility value .
     * @param { Transforms } t - Provide the Transforms value.
     * @param { ConnectorModel } connector - Provide the connector value.
     * @private
     */
    DiagramRenderer.prototype.renderOrthogonalThumbs = function (id, selector, segment, canvas, visibility, t, connector) {
        var orientation;
        var visible;
        var length;
        var j = 0;
        var direction;
        // (EJ2-57115) - Added below code to check if maxSegmentThumb is zero or not
        if (!connector.maxSegmentThumb) {
            for (j = 0; j < segment.points.length - 1; j++) {
                length = Point.distancePoints(segment.points[parseInt(j.toString(), 10)], segment.points[j + 1]);
                orientation = (segment.points[parseInt(j.toString(), 10)].y.toFixed(2) === segment.points[j + 1].y.toFixed(2)) ? 'horizontal' : 'vertical';
                //850501-Added below code to check the direction of the segments
                direction = Point.direction(segment.points[parseInt(j.toString(), 10)], segment.points[j + 1]);
                visible = (length >= 50 && segment.allowDrag) ? true : false;
                this.renderOrthogonalThumb((id + '_' + (j + 1)), selector, (((segment.points[parseInt(j.toString(), 10)].x + segment.points[j + 1].x) / 2)), (((segment.points[parseInt(j.toString(), 10)].y + segment.points[j + 1].y) / 2)), canvas, visible, orientation, t, connector, direction);
            }
        }
        else {
            // (EJ2-57115) - Added below code to check if maxSegmentThumb greater then 3 means then we have ignore the rendering of
            // first and last segment thumb
            // Set the start value as 1 if segment points is greater than 3
            var start = segment.points.length < 3 ? 0 : 1;
            // set the end value as segment.points.length - 2 if segment points is greater then 3
            var end = segment.points.length < 3 ? segment.points.length - 1 : segment.points.length - 2;
            start = connector.segments.length === 1 ? start : 0;
            end = connector.segments.length === 1 ? end : segment.points.length - 1;
            for (j = start; j < end; j++) {
                length = Point.distancePoints(segment.points[parseInt(j.toString(), 10)], segment.points[j + 1]);
                orientation = (segment.points[parseInt(j.toString(), 10)].y.toFixed(2) === segment.points[j + 1].y.toFixed(2)) ? 'horizontal' : 'vertical';
                visible = (length >= 50 && segment.allowDrag) ? true : false;
                this.renderOrthogonalThumb((id + '_' + (j + 1)), selector, (((segment.points[parseInt(j.toString(), 10)].x + segment.points[j + 1].x) / 2)), (((segment.points[parseInt(j.toString(), 10)].y + segment.points[j + 1].y) / 2)), canvas, visible, orientation, t, connector, direction);
            }
        }
    };
    /**
     * Method used to render the orthogonal thumb \
     *
     * @returns {void }  Method used to render the orthogonal thumb  .\
     *
     * @param {string} id - Provide the id for the element.
     * @param {DiagramElement } selector - Provide the selector element.
     * @param {  Transforms } x - Provide the x value  .
     * @param { Transforms } y - Provide the y value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible boolean value.
     * @param { string } orientation - Provide the orientation value.
     * @param { Transforms } t - Provide the Transforms value.
     * @param { ConnectorModel } connector - Provide the connector value.
     * @param { string } direction - Provide the direction of the segment.
     * @private
     */
    DiagramRenderer.prototype.renderOrthogonalThumb = function (id, selector, x, y, canvas, visible, orientation, t, connector, direction) {
        var path;
        var segmentThumbAngle = 0;
        var diagramElement = document.getElementById(this.diagramId);
        var instance = 'ej2_instances';
        var diagram;
        if (diagramElement) {
            diagram = diagramElement["" + instance][0];
        }
        //824805-Support to modify connector segment thumb shape and style based on constraints
        var inheritsegmentThumbShape = (connector.constraints & ConnectorConstraints.InheritSegmentThumbShape);
        var segmentThumbShape = inheritsegmentThumbShape ? diagram.segmentThumbShape : connector.segmentThumbShape;
        //850501-Added below code to modify connector segment thumb size based on constraints
        var inheritSegmentThumbSize = (connector.constraints & ConnectorConstraints.InheritSegmentThumbSize);
        var segmentThumbSize = inheritSegmentThumbSize ? diagram.segmentThumbSize : connector.segmentThumbSize;
        if (orientation === 'horizontal') {
            path = getSegmentThumbShapeHorizontal(segmentThumbShape);
        }
        else {
            path = getSegmentThumbShapeVertical(segmentThumbShape);
        }
        //850501-Added the below code to change the angles of the segmentThumbShape(arrows) based on the direction
        if (segmentThumbShape === 'Arrow' || segmentThumbShape === 'DoubleArrow' || segmentThumbShape === 'OpenArrow') {
            switch (direction) {
                case 'Bottom':
                case 'Right':
                    segmentThumbAngle = 180;
                    break;
                default:
                    segmentThumbAngle = 0;
            }
        }
        else if (segmentThumbShape === 'Fletch' || segmentThumbShape === 'OpenFetch' || segmentThumbShape === 'IndentedArrow' || segmentThumbShape === 'OutdentedArrow') {
            switch (direction) {
                case 'Bottom':
                    segmentThumbAngle = -90;
                    break;
                case 'Top':
                    segmentThumbAngle = 90;
                    break;
                case 'Right':
                    segmentThumbAngle = 180;
                    break;
                default:
                    segmentThumbAngle = 0;
            }
        }
        var options = {
            x: ((x + t.tx) * t.scale) - segmentThumbSize / 2, y: ((y + t.ty) * t.scale) - segmentThumbSize / 2, angle: segmentThumbAngle,
            fill: '#e2e2e2', stroke: 'black', strokeWidth: 1, dashArray: '', data: path,
            width: segmentThumbSize, height: segmentThumbSize, pivotX: 0.5, pivotY: 0.5, opacity: 1, visible: visible, id: id,
            class: 'e-diagram-ortho-segment-handle'
        };
        //850501-Added the below code to adjust size for the segment thumb shape based on the size given
        var absoluteBounds = measurePath(options.data);
        var desiredSize = new Size(options.width, options.height);
        var pathElement = new PathElement();
        options.data = pathElement.updatePath(options.data, absoluteBounds, desiredSize);
        //Bug 914365: Node is not resizable using touch interaction
        //Added below code to update the element if it is already rendered during touch move interaction
        if (this.touchMove) {
            var thumb = document.getElementById(id);
            if (thumb) {
                this.updateSegmentPosition(thumb, options);
            }
            else {
                this.svgRenderer.drawPath(canvas, options, this.diagramId);
            }
        }
        else {
            this.svgRenderer.drawPath(canvas, options, this.diagramId);
        }
    };
    /**
     * Method used to render the pivot line line\
     *
     * @returns {void } Method used to render the pivot line line .\
     *
     * @param {DiagramElement} element - Provide the diagram element value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param {  Transforms } transform - Provide the transform value  .
     * @param { SelectorConstraints } selectorConstraints - Provide the selector constraints value.
     * @param { boolean } canMask - Provide the canMask boolean value.
     * @private
     */
    DiagramRenderer.prototype.renderPivotLine = function (element, canvas, transform, selectorConstraints, canMask) {
        var wrapper = element;
        var dashArray = '2,3';
        var visible = (selectorConstraints & SelectorConstraints.Rotate) ? true : false;
        if (canMask) {
            visible = false;
        }
        var options = this.getBaseAttributes(wrapper, transform);
        options.fill = 'None';
        options.stroke = 'black';
        options.strokeWidth = 1;
        options.dashArray = dashArray;
        options.visible = visible;
        var scale = transform.scale;
        options.x *= scale;
        options.y *= scale;
        options.width *= scale;
        options.height *= scale;
        options.id = 'pivotLine';
        options.class = 'e-diagram-pivot-line';
        var startPoint = { x: wrapper.actualSize.width * wrapper.pivot.x * scale, y: -20 };
        var endPoint = { x: wrapper.actualSize.width * wrapper.pivot.x * scale, y: 0 };
        options.startPoint = startPoint;
        options.endPoint = endPoint;
        this.svgRenderer.drawLine(canvas, options);
    };
    /**
     * Method used to render the bezier line for the connector  \
     *
     * @returns {void } Method used to render the bezier line for the connector .\
     *
     * @param {string} id - Provide the id value for the bezier line.
     * @param { DiagramElement } wrapper - Provide the wrapper for the element.
     * @param {  HTMLCanvasElement | SVGElement } canvas - Provide the canvas element  .
     * @param { PointModel } start - Provide the pointmodel value.
     * @param { PointModel } end - Provide the pointmodel value.
     * @param { Transforms } transform - Provide the itransform value .
     * @private
     */
    DiagramRenderer.prototype.renderBezierLine = function (id, wrapper, canvas, start, end, transform) {
        var dashArray = '3,3';
        var options = this.getBaseAttributes(wrapper, transform);
        options.id = id;
        options.stroke = 'black';
        options.strokeWidth = 1;
        options.dashArray = dashArray;
        options.fill = 'None';
        options.class = 'e-diagram-bezier-control-line';
        options.x = 0;
        options.y = 0;
        var scale = transform.scale;
        var x1 = (start.x + transform.tx) * scale;
        var y1 = (start.y + transform.ty) * scale;
        var x2 = (end.x + transform.tx) * scale;
        var y2 = (end.y + transform.ty) * scale;
        var startPoint = { x: x1, y: y1 };
        var endPoint = { x: x2, y: y2 };
        options.startPoint = startPoint;
        options.endPoint = endPoint;
        this.svgRenderer.drawLine(canvas, options);
    };
    /**
     * Method used to render the circular handle for the node element  \
     *
     * @returns {void } Method used to render the circular handle for the node element .\
     *
     * @param {string} id - Provide the id value.
     * @param { DiagramElement } selector - Provide the selector element value.
     * @param { number } cx - Provide cx value  .
     * @param { number } cy - Provide cx value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible property for the handle .
     * @param { number } enableSelector - Provide the value for the enableSelector .
     * @param { Transforms } t - Provide the transform value .
     * @param { boolean } connected - Provide the connected boolean value .
     * @param { boolean } canMask - Provide the canMask boolean value .
     * @param { Object } ariaLabel - Provide the label properties .
     * @param { number } count - Provide the count value  .
     * @param { string } className - Provide the class name for this element .
     * @param { number } handleSize - Provide the handle size value .
     *
     * @private
     */
    // Feature (EJ2-44346) Provide support to increase the size of the resize thumb
    DiagramRenderer.prototype.renderCircularHandle = function (id, selector, cx, cy, canvas, visible, enableSelector, t, connected, canMask, ariaLabel, count, className, handleSize) {
        var wrapper = selector;
        var newPoint = { x: cx, y: cy };
        if (wrapper.rotateAngle !== 0 || wrapper.parentTransform !== 0) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, wrapper.rotateAngle + wrapper.parentTransform, wrapper.offsetX, wrapper.offsetY);
            newPoint = transformPointByMatrix(matrix, newPoint);
        }
        var options = this.getBaseAttributes(wrapper);
        options.stroke = 'black';
        options.strokeWidth = 1;
        if (count !== undefined) {
            options.id = 'segmentEnd_' + count;
            options.fill = '#e2e2e2';
        }
        else {
            options.fill = connected ? '#8CC63F' : 'white';
        }
        options.cornerRadius = handleSize / 2;
        options.angle = selector.rotateAngle;
        options.id = id;
        options.visible = visible;
        options.class = className;
        options.width = handleSize;
        options.height = handleSize;
        // EJ2-65895 - Added below code to calculate the rect x and y if node pivot is not equal to 0.5
        options.x = (newPoint.x + t.tx) * t.scale;
        options.y = (newPoint.y + t.ty) * t.scale;
        options.x = options.x - options.width / 2;
        options.y = options.y - options.height / 2;
        if (connected) {
            options.class += ' e-connected';
        }
        if (canMask) {
            options.visible = false;
        }
        //Bug 914365: Node is not resizable using touch interaction
        //Added below code to update the element if it is already rendered during touch move interaction
        if (this.touchMove) {
            var handle = document.getElementById(id);
            if (handle) {
                this.updateResizeHandle(handle, options);
            }
            else {
                var parentSvg = this.getParentSvg(selector, 'selector');
                this.svgRenderer.drawRectangle(canvas, options, this.diagramId, true, true, parentSvg, ariaLabel, true, enableSelector);
            }
        }
        else {
            var parentSvg = this.getParentSvg(selector, 'selector');
            this.svgRenderer.drawRectangle(canvas, options, this.diagramId, true, true, parentSvg, ariaLabel, true, enableSelector);
        }
    };
    DiagramRenderer.prototype.updateResizeHandle = function (handle, options) {
        var attr = {
            'id': options.id, 'x': options.x.toString(), 'y': options.y.toString(), 'width': options.width.toString(),
            'height': options.height.toString(), 'visibility': options.visible ? 'visible' : 'hidden',
            'transform': 'rotate(' + options.angle + ','
                + (options.x + options.width / 2) + ',' + (options.y + options.height / 2) + ')',
            'rx': options.cornerRadius || 0, 'ry': options.cornerRadius || 0, 'opacity': options.opacity
        };
        setAttributeSvg(handle, attr);
    };
    //824805-Support to modify bezier connector segmentThumbShape
    /**
     * Method used to render the segment thumb shape for Bezier connector  \
     *
     * @returns {void } Method used to render the segment thumb shape for Bezier connector .\
     *
     * @param {string} id - Provide the id value.
     * @param { DiagramElement } selector - Provide the selector element value.
     * @param { number } cx - Provide cx value  .
     * @param { number } cy - Provide cx value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element.
     * @param { boolean } visible - Provide the visible property for the handle .
     * @param { ConnectorModel } connector - Provide the value for the connector .
     * @param { Transforms } t - Provide the transform value .
     * @param { boolean } connected - Provide the connected boolean value .
     * @param { boolean } canMask - Provide the canMask boolean value .
     * @param { number } count - Provide the count value  .
     * @param { string } className - Provide the class name for this element .
     * @param { number } handleSize - Provide the handle size value .
     *
     * @private
     */
    DiagramRenderer.prototype.renderBezierHandle = function (id, selector, cx, cy, canvas, visible, connector, t, connected, canMask, count, className, handleSize) {
        var diagramElement = document.getElementById(this.diagramId);
        var instance = 'ej2_instances';
        var diagram;
        if (diagramElement) {
            diagram = diagramElement["" + instance][0];
        }
        var wrapper = selector;
        var newPoint = { x: cx, y: cy };
        if (wrapper.rotateAngle !== 0 || wrapper.parentTransform !== 0) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, wrapper.rotateAngle + wrapper.parentTransform, wrapper.offsetX, wrapper.offsetY);
            newPoint = transformPointByMatrix(matrix, newPoint);
        }
        var inheritsegmentThumbShape = (connector.constraints & ConnectorConstraints.InheritSegmentThumbShape);
        var segmentThumbShape = inheritsegmentThumbShape ? diagram.segmentThumbShape : connector.segmentThumbShape;
        //850501-Added below code to modify connector segment thumb size based on constraints
        var inheritSegmentThumbSize = (connector.constraints & ConnectorConstraints.InheritSegmentThumbSize);
        var segmentThumbSize = inheritSegmentThumbSize ? diagram.segmentThumbSize : connector.segmentThumbSize;
        var path = getSegmentThumbShapeVertical(segmentThumbShape);
        var options = this.getBaseAttributes(wrapper);
        options.stroke = 'black';
        options.strokeWidth = 1;
        if (count !== undefined) {
            options.id = 'segmentEnd_' + count;
            options.fill = '#e2e2e2';
        }
        else {
            options.fill = connected ? '#8CC63F' : 'white';
        }
        options.angle = selector.rotateAngle;
        options.id = id;
        options.visible = visible;
        options.class = className;
        options.width = segmentThumbSize;
        options.height = segmentThumbSize;
        // EJ2-65895 - Added below code to calculate the rect x and y if node pivot is not equal to 0.5
        options.data = path;
        options.x = ((newPoint.x + t.tx) * t.scale);
        options.y = ((newPoint.y + t.ty) * t.scale);
        options.x = options.x - options.width / 2;
        options.y = options.y - options.height / 2;
        if (connected) {
            options.class += ' e-connected';
        }
        if (canMask) {
            options.visible = false;
        }
        //850501-Added the below code to adjust size for the segment thumb shape based on the size given
        var absoluteBounds = measurePath(options.data);
        var desiredSize = new Size(options.width, options.height);
        var pathElement = new PathElement();
        options.data = pathElement.updatePath(options.data, absoluteBounds, desiredSize);
        //Bug 914365: Node is not resizable using touch interaction
        //Added below code to update the element if it is already rendered during touch move interaction
        if (this.touchMove) {
            var handle = document.getElementById(id);
            if (handle) {
                this.updateSegmentPosition(handle, options);
            }
            else {
                var parentSvg = this.getParentSvg(selector, 'selector');
                this.svgRenderer.drawPath(canvas, options, this.diagramId, true, parentSvg);
            }
        }
        else {
            var parentSvg = this.getParentSvg(selector, 'selector');
            this.svgRenderer.drawPath(canvas, options, this.diagramId, true, parentSvg);
        }
    };
    DiagramRenderer.prototype.updateSegmentPosition = function (handle, options) {
        var attr = {
            'id': options.id, 'transform': 'rotate(' + options.angle + ',' + (options.x + options.width * options.pivotX) + ','
                + (options.y + options.height * options.pivotY) + ')' + 'translate(' + (options.x) + ',' + (options.y) + ')',
            'visibility': options.visible ? 'visible' : 'hidden', 'opacity': options.opacity
        };
        setAttributeSvg(handle, attr);
    };
    /**
     * Method used to render border for the node element  \
     *
     * @returns {void } Method used to render border for the node element .\
     *
     * @param {SelectorModel} selector - Provide the selector model instance.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { number } enableNode - Provide enableNode boolean value.
     * @param { boolean } isBorderTickness - Provide the thickness value for the node.
     * @param { boolean } isSwimlane - Provide the isSwimlane boolean value .
     * @private
     */
    DiagramRenderer.prototype.renderBorder = function (selector, canvas, transform, enableNode, isBorderTickness, isSwimlane) {
        var wrapper = selector;
        var options = this.getBaseAttributes(wrapper, transform);
        options.x *= transform.scale;
        options.y *= transform.scale;
        options.width *= transform.scale;
        options.height *= transform.scale;
        options.fill = 'transparent';
        options.stroke = '#097F7F';
        options.strokeWidth = 1.2;
        options.gradient = null;
        options.dashArray = '6,3';
        options.class = 'e-diagram-selector';
        if (isSwimlane) {
            options.class += ' e-diagram-lane';
        }
        options.id = 'borderRect';
        options.id = (this.rendererActions & RendererAction.DrawSelectorBorder) ? 'borderRect_symbol' : 'borderRect';
        if (!enableNode) {
            options.class += ' e-disabled';
        }
        if (isBorderTickness) {
            options.class += ' e-thick-border';
        }
        options.cornerRadius = 0;
        var parentSvg = this.getParentSvg(selector, 'selector');
        this.svgRenderer.drawRectangle(canvas, options, this.diagramId, undefined, true, parentSvg);
    };
    /**
     * Method used to render user handle for the node element\
     *
     * @returns {void } Method used to render user handle for the node element .\
     *
     * @param {SelectorModel} selectorItem - Provide the selector model instance.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value.
     * @param { HTMLElement } diagramUserHandlelayer - Provide the HTMLElement value.
     * @param { Actions } currentAction - Provide the currentAction value.
     * @param { boolean } inAction - Provide the inAction value.
     * @private
     */
    DiagramRenderer.prototype.renderUserHandler = function (selectorItem, canvas, transform, diagramUserHandlelayer, currentAction, inAction) {
        var wrapper = selectorItem.wrapper;
        var canDraw;
        for (var _i = 0, _a = selectorItem.userHandles; _i < _a.length; _i++) {
            var obj = _a[_i];
            canDraw = true;
            //879279 : Userhandle should be removed on dragging the node/connector in mousemove action
            if ((obj.disableConnectors && selectorItem.connectors.length > 0) ||
                (obj.disableNodes && selectorItem.nodes.length > 0) ||
                (currentAction === 'Drag' && inAction)) {
                canDraw = false;
            }
            var div = document.getElementById(obj.name + '_template_hiddenUserHandle');
            if (div) {
                obj.template = (div.childNodes[0]).cloneNode(true);
            }
            //const newPoint: PointModel;
            var newPoint = getUserHandlePosition(selectorItem, obj, transform);
            newPoint.x = (newPoint.x + transform.tx) * transform.scale;
            newPoint.y = (newPoint.y + transform.ty) * transform.scale;
            if (obj.visible) {
                obj.visible = (selectorItem.constraints & SelectorConstraints.UserHandle) ? true : false;
            }
            if (canDraw) {
                if (obj.pathData) {
                    var data = obj.pathData ? obj.pathData : obj.content;
                    var option = this.getBaseAttributes(wrapper);
                    option.id = obj.name + '_userhandle';
                    option.fill = obj.backgroundColor;
                    option.stroke = obj.borderColor;
                    option.strokeWidth = obj.borderWidth;
                    option.centerX = newPoint.x;
                    option.centerY = newPoint.y;
                    option.radius = obj.size * 0.5;
                    option.class = 'e-diagram-userhandle-circle';
                    option.angle = 0;
                    option.visible = obj.visible;
                    option.opacity = 1;
                    this.svgRenderer.drawCircle(canvas, option, 1, { 'aria-label': obj.name + 'user handle' });
                    var pathPading = 5;
                    var arrayCollection = [];
                    arrayCollection = processPathData(data);
                    arrayCollection = splitArrayCollection(arrayCollection);
                    var pathSize = measurePath(data);
                    //requiredSize/contentSize
                    var scaleX = (obj.size - 0.45 * obj.size) / pathSize.width;
                    var scaleY = (obj.size - 0.45 * obj.size) / pathSize.height;
                    var newData = transformPath(arrayCollection, scaleX, scaleY, true, pathSize.x, pathSize.y, 0, 0);
                    pathSize = measurePath(newData);
                    var options = {
                        x: newPoint.x - pathSize.width / 2,
                        y: newPoint.y - pathSize.height / 2, angle: 0, id: '',
                        class: 'e-diagram-userhandle-path', fill: obj.pathColor,
                        stroke: obj.backgroundColor, strokeWidth: 0.5, dashArray: '', data: newData,
                        width: obj.size - pathPading, height: obj.size - pathPading, pivotX: 0, pivotY: 0, opacity: 1, visible: obj.visible
                    };
                    this.svgRenderer.drawPath(canvas, options, this.diagramId, undefined, undefined, { 'aria-label': obj.name + 'user handle' });
                }
                else if (obj.content) {
                    //const handleContent: DiagramNativeElement;
                    var handleContent = new DiagramNativeElement(obj.name, this.diagramId);
                    handleContent.content = obj.content;
                    handleContent.offsetX = newPoint.x;
                    handleContent.offsetY = newPoint.y;
                    handleContent.id = obj.name + '_shape';
                    handleContent.horizontalAlignment = 'Center';
                    handleContent.verticalAlignment = 'Center';
                    handleContent.visible = obj.visible;
                    handleContent.setOffsetWithRespectToBounds(newPoint.x, newPoint.y, 'Fraction');
                    handleContent.relativeMode = 'Object';
                    handleContent.description = obj.name || 'User handle';
                    handleContent.measure(new Size(obj.size, obj.size));
                    handleContent.arrange(handleContent.desiredSize);
                    this.svgRenderer.drawNativeContent(handleContent, canvas, obj.size, obj.size, this.adornerSvgLayer);
                }
                else if (obj.source) {
                    var element = new ImageElement();
                    var options = this.getBaseAttributes(element, transform);
                    options.width = obj.size;
                    options.height = obj.size;
                    options.x = newPoint.x - (obj.size / 2);
                    options.y = newPoint.y - (obj.size / 2);
                    options.sourceWidth = obj.size;
                    options.sourceHeight = obj.size;
                    options.alignment = element.imageAlign;
                    options.source = obj.source;
                    options.scale = element.imageScale;
                    options.visible = obj.visible;
                    options.description = obj.name || 'User handle';
                    options.id = obj.name + '_';
                    this.renderer.drawImage(canvas, options, this.adornerSvgLayer, false);
                }
                else {
                    //const templateContent: DiagramHtmlElement;
                    var templateContent = new DiagramHtmlElement(obj.name, this.diagramId);
                    templateContent.offsetX = newPoint.x;
                    templateContent.offsetY = newPoint.y;
                    templateContent.id = obj.name + '_shape';
                    templateContent.visible = obj.visible;
                    templateContent.relativeMode = 'Object';
                    templateContent.template = obj.template;
                    templateContent.measure(new Size(obj.size, obj.size));
                    templateContent.arrange(templateContent.desiredSize);
                    this.svgRenderer.drawHTMLContent(templateContent, diagramUserHandlelayer, undefined, true, undefined);
                }
            }
        }
    };
    /**
     * Method used to render rotate thumb of the diagramnode element  \
     *
     * @returns {void } Method used to render rotate thumb of the diagramnode element .\
     *
     * @param {DiagramElement} wrapper - Provide the wrapper  element value.
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SelectorConstraints } selectorConstraints - Provide the selectorConstraints value.
     * @param { boolean } canMask - Provide the boolean value .
     * @private
     */
    DiagramRenderer.prototype.renderRotateThumb = function (wrapper, canvas, transform, selectorConstraints, canMask) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var element = new PathElement();
        var newPoint;
        var size = new Size();
        size.width = 18;
        size.height = 16;
        var top = wrapper.offsetY - wrapper.actualSize.height * wrapper.pivot.y;
        var left = wrapper.offsetX - wrapper.actualSize.width * wrapper.pivot.x;
        var visible = (selectorConstraints & SelectorConstraints.Rotate) ? true : false;
        if (canMask) {
            visible = false;
        }
        var data = 'M 16.856144362449648 10.238890446662904 L 18.000144362449646 3.437890446662903' +
            'L 15.811144362449646 4.254890446662903 C 14.837144362449646 2.5608904466629028 13.329144362449647 ' +
            ' 1.2598904466629026 11.485144362449645 0.5588904466629026 C 9.375144362449646 - 0.24510955333709716 7.071144362449646 ' +
            ' - 0.18010955333709716 5.010144362449646 0.7438904466629028 C 2.942144362449646 1.6678904466629028 1.365144362449646' +
            ' 3.341890446662903 0.558144362449646 5.452890446662903 C - 0.244855637550354 7.567890446662903 - 0.17985563755035394' +
            ' 9.866890446662904 0.7431443624496461 11.930890446662904 C 1.6681443624496461 13.994890446662904 3.343144362449646' +
            ' 15.575890446662903 5.457144362449647 16.380890446662903 C 6.426144362449647 16.7518904466629 7.450144362449647' +
            ' 16.9348904466629 8.470144362449647 16.9348904466629 C 9.815144362449647 16.9348904466629 11.155144362449647 ' +
            '16.6178904466629 12.367144362449647 15.986890446662901 L 11.351144362449647 14.024890446662901 C 9.767144362449647' +
            ' 14.8468904466629 7.906144362449647 14.953890446662902 6.237144362449647 14.3178904466629 C 4.677144362449647' +
            ' 13.7218904466629 3.444144362449647 12.5558904466629 2.758144362449647 11.028890446662901 C 2.078144362449646 ' +
            '9.501890446662903 2.031144362449646 7.802890446662903 2.622144362449646 6.243890446662903 C 3.216144362449646' +
            ' 4.6798904466629025 4.387144362449646 3.442890446662903 5.914144362449646 2.760890446662903 C 7.437144362449646 ' +
            '2.078890446662903 9.137144362449646 2.0298904466629026 10.700144362449645 2.6258904466629027 C 11.946144362449646 ' +
            '3.100890446662903 12.971144362449646 3.9538904466629026 13.686144362449646 5.049890446662903 L 11.540144362449645 ' +
            '5.850890446662903 L 16.856144362449648 10.238890446662904 Z';
        var pivotX = left + wrapper.pivot.x * wrapper.actualSize.width;
        var pivotY = top;
        pivotX = (pivotX + transform.tx) * transform.scale;
        pivotY = (pivotY + transform.ty) * transform.scale;
        newPoint = { x: pivotX - size.width * 0.5, y: pivotY - 30 - size.height * 0.5 };
        if (wrapper.rotateAngle !== 0 || wrapper.parentTransform !== 0) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, wrapper.rotateAngle + wrapper.parentTransform, (transform.tx + wrapper.offsetX) * transform.scale, (transform.ty + wrapper.offsetY) * transform.scale);
            newPoint = transformPointByMatrix(matrix, newPoint);
        }
        var options = {
            x: newPoint.x,
            y: newPoint.y,
            angle: wrapper.rotateAngle + wrapper.parentTransform,
            fill: '#231f20', stroke: 'black', strokeWidth: 0.5, dashArray: '', data: data,
            width: 20, height: 20, pivotX: 0, pivotY: 0, opacity: 1, visible: visible, id: wrapper.id, class: 'e-diagram-rotate-handle'
        };
        options.id = 'rotateThumb';
        //Bug 914365: Node is not resizable using touch interaction
        //Added below code to update the element if it is already rendered during touch move interaction
        if (this.touchMove) {
            var thumb = document.getElementById('rotateThumb');
            if (thumb) {
                this.updateSegmentPosition(thumb, options);
            }
            else {
                this.svgRenderer.drawPath(canvas, options, this.diagramId, true, undefined, { 'aria-label': 'Thumb to rotate the selected object' });
            }
        }
        else {
            this.svgRenderer.drawPath(canvas, options, this.diagramId, true, undefined, { 'aria-label': 'Thumb to rotate the selected object' });
        }
    };
    /**
     * Method used to render the path element for the diagram  \
     *
     * @returns {void } Method used to render the path element for the diagram .\
     *
     * @param {PathElement} element - Provide the path element of the diagram .
     * @param { HTMLCanvasElement | SVGElement } canvas - Provide the canvas element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the parent SVG element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @param { boolean } isPreviewNode - Provide the boolean value .
     * @param {object} portCenterPoint - provide the portCenterPoint value.
     * @private
     */
    DiagramRenderer.prototype.renderPathElement = function (element, canvas, transform, parentSvg, fromPalette, isPreviewNode, portCenterPoint) {
        var options = this.getBaseAttributes(element, transform, isPreviewNode);
        options.data = element.absolutePath;
        options.data = element.absolutePath;
        // Feature 826644: Support to add ports to the connector. Added below condition to position port based on its alignment and offset.
        if (element.isPathPort && portCenterPoint) {
            options.x = portCenterPoint[element.id] ? portCenterPoint[element.id].cx : options.x;
            options.y = portCenterPoint[element.id] ? portCenterPoint[element.id].cy : options.y;
            element.bounds.x = options.x;
            element.bounds.y = options.y;
            var diagramElement = document.getElementById(this.diagramId);
            var instance = 'ej2_instances';
            var diagram = void 0;
            if (diagramElement) {
                diagram = diagramElement["" + instance][0];
                if (diagram.eventHandler.currentAction !== 'PortDrag') {
                    element.offsetX = options.x + (element.width / 2);
                    element.offsetY = options.y + (element.height / 2);
                }
            }
        }
        var ariaLabel = element.description ? element.description : element.id;
        if (element.isExport) {
            var pathBounds = element.absoluteBounds;
            //Bug 857388: Connector with bridging is not properly exported.
            //Below we save the arc values of bridge and use it in renderPath method.
            var collection = processPathData(options.data);
            // Get r1 and r2 values for 'A' commands
            var arc = this.findAndStoreArcValues(collection);
            options.arc = arc;
            options.data = updatePath(element, pathBounds, undefined, options);
        }
        this.renderer.drawPath(canvas, options, this.diagramId, undefined, parentSvg, ariaLabel, undefined, this, element);
    };
    // Function to filter 'A' commands and extract r1 and r2 values
    DiagramRenderer.prototype.findAndStoreArcValues = function (arr) {
        var rValues = [];
        arr.forEach(function (obj) {
            if (obj.command === 'A') {
                // Store r1 and r2 values in an object
                var rObj = { r1: obj.r1 / 2, r2: obj.r2 / 2 };
                rValues.push(rObj);
            }
        });
        // Return array of r1 and r2 values
        return rValues;
    };
    /**
     * Method used to update the grid line for the diagram  \
     *
     * @returns {void } Method used to update the grid line for the diagram .\
     *
     * @param {SnapSettingsModel} snapSettings - Provide the snapsetting value of the diagram .
     * @param { SVGSVGElement } gridSvg - Provide the SVG grid  element value.
     * @param { Transforms } t - Provide the transform value  .
     * @param { RulerSettingsModel } rulerSettings - Provide the ruler setting property .
     * @param { RulerModel } hRuler - Provide the horizontal ruler property value .
     * @param { RulerModel } vRuler - Provide the vertical ruler property value .
     * @private
     */
    DiagramRenderer.prototype.renderSvgGridlines = function (snapSettings, gridSvg, t, rulerSettings, hRuler, vRuler) {
        var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.setAttribute('id', this.diagramId + '_grid_pattern_defn');
        if (snapSettings.constraints & SnapConstraints.ShowHorizontalLines ||
            snapSettings.constraints & SnapConstraints.ShowVerticalLines) {
            pattern.setAttribute('id', this.diagramId + '_pattern');
        }
        var hWidth = 0;
        var hHeight = 0;
        var hSegmentwidth = 0;
        var vSegmentwidth = 0;
        var scale = 1;
        var isRulerGrid = false;
        var isLine = snapSettings.gridType === 'Lines';
        var verticalLineIntervals = isLine ?
            snapSettings.verticalGridlines.lineIntervals : snapSettings.verticalGridlines.dotIntervals;
        var horizontalLineIntervals = isLine ?
            snapSettings.horizontalGridlines.lineIntervals : snapSettings.horizontalGridlines.dotIntervals;
        if (rulerSettings.showRulers && rulerSettings.dynamicGrid && hRuler && vRuler) {
            hSegmentwidth = vRuler.updateSegmentWidth(t.scale);
            vSegmentwidth = hRuler.updateSegmentWidth(t.scale);
            snapSettings.horizontalGridlines.scaledIntervals = [hSegmentwidth / hRuler.interval];
            snapSettings.verticalGridlines.scaledIntervals = [vSegmentwidth / vRuler.interval];
            isRulerGrid = true;
        }
        else {
            for (var i = 0; i < verticalLineIntervals.length; i = i + 1) {
                hWidth += verticalLineIntervals[parseInt(i.toString(), 10)];
            }
            for (var i = 0; i < horizontalLineIntervals.length; i = i + 1) {
                hHeight += horizontalLineIntervals[parseInt(i.toString(), 10)];
            }
            scale = this.scaleSnapInterval(snapSettings, t.scale);
        }
        hWidth = isRulerGrid ? vSegmentwidth : hWidth * scale;
        hHeight = isRulerGrid ? hSegmentwidth : hHeight * scale;
        var attr = {
            id: this.diagramId + '_pattern', x: 0, y: 0, width: hWidth,
            height: hHeight, patternUnits: 'userSpaceOnUse'
        };
        setAttributeSvg(pattern, attr);
        this.horizontalSvgGridlines(pattern, hWidth, hHeight, scale, snapSettings, rulerSettings, vRuler, isRulerGrid, isLine, horizontalLineIntervals);
        this.verticalSvgGridlines(pattern, hWidth, hHeight, scale, snapSettings, rulerSettings, hRuler, isRulerGrid, isLine, verticalLineIntervals);
        defs.appendChild(pattern);
        gridSvg.appendChild(defs);
    };
    DiagramRenderer.prototype.horizontalSvgGridlines = function (pattern, hWidth, hHeight, scale, snapSettings, rulerSettings, vRuler, isRulerGrid, isLine, intervals) {
        var space = 0;
        var dashArray = [];
        var hLine;
        if (snapSettings.constraints & SnapConstraints.ShowHorizontalLines) {
            if (snapSettings.horizontalGridlines.lineDashArray) {
                dashArray = this.renderer.parseDashArray(snapSettings.horizontalGridlines.lineDashArray);
            }
            if (rulerSettings.showRulers && rulerSettings.dynamicGrid && vRuler) {
                intervals = this.updateLineIntervals(intervals, rulerSettings, vRuler, hHeight, isLine);
            }
            intervals = getInterval(intervals, isLine);
            for (var i = 0; i < intervals.length; i = i + 2) {
                space = getSpaceValue(intervals, isLine, i, space);
                var spaceY = 0;
                hLine = document.createElementNS('http://www.w3.org/2000/svg', isLine ? 'path' : 'circle');
                var attr = void 0;
                var d = isLine ? space + intervals[parseInt(i.toString(), 10)] / 2 : space;
                d = isRulerGrid ? d : d * scale;
                if (isLine) {
                    if (dashArray.toString() === '') {
                        attr = {
                            'stroke-width': intervals[parseInt(i.toString(), 10)],
                            'd': 'M0,' + (d) + ' L' + hWidth + ',' + (d) + ' Z',
                            'class': intervals[parseInt(i.toString(), 10)] === 1.25 ? 'e-diagram-thick-grid' : 'e-diagram-thin-grid',
                            'stroke': snapSettings.horizontalGridlines.lineColor
                        };
                    }
                    else {
                        attr = {
                            'stroke-width': intervals[parseInt(i.toString(), 10)], 'stroke': snapSettings.horizontalGridlines.lineColor,
                            'd': 'M0,' + (d) + ' L' + hWidth + ',' + (d) + ' Z',
                            'class': intervals[parseInt(i.toString(), 10)] === 1.25 ? 'e-diagram-thick-grid' : 'e-diagram-thin-grid',
                            'dashArray': dashArray.toString()
                        };
                    }
                    setAttributeSvg(hLine, attr);
                    pattern.appendChild(hLine);
                    space += intervals[i + 1] + intervals[parseInt(i.toString(), 10)];
                }
                else {
                    this.renderDotGrid(i, pattern, snapSettings, spaceY, d, scale, true);
                    space += intervals[parseInt(i.toString(), 10)];
                }
            }
        }
    };
    DiagramRenderer.prototype.renderDotGrid = function (i, pattern, snapSettings, spacey, d, scale, isHorizontal) {
        var intervals = !isHorizontal ?
            snapSettings.horizontalGridlines.dotIntervals : snapSettings.verticalGridlines.dotIntervals;
        intervals = getInterval(intervals, false);
        var r;
        var hLine;
        //const doubleRadius: boolean;
        var dy;
        var attr;
        for (var j = 1; j < intervals.length; j = j + 2) {
            r = j === intervals.length - 1 ? intervals[0] : intervals[j - 1];
            hLine = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dy = spacey;
            dy = dy * scale;
            attr = {
                'cx': isHorizontal ? dy : d, 'cy': isHorizontal ? d : dy, 'fill': snapSettings.horizontalGridlines.lineColor, 'r': r
            };
            setAttributeSvg(hLine, attr);
            pattern.appendChild(hLine);
            spacey += intervals[parseInt(j.toString(), 10)] + intervals[j - 1];
        }
    };
    DiagramRenderer.prototype.verticalSvgGridlines = function (pattern, hWidth, hHeight, scale, snapSettings, rulerSettings, hRuler, isRulerGrid, isLine, intervals) {
        var space = 0;
        var dashArray = [];
        var vLine;
        if (snapSettings.constraints & SnapConstraints.ShowVerticalLines) {
            if (snapSettings.verticalGridlines.lineDashArray) {
                dashArray = this.renderer.parseDashArray(snapSettings.verticalGridlines.lineDashArray);
            }
            if (rulerSettings.showRulers && rulerSettings.dynamicGrid && hRuler) {
                intervals = this.updateLineIntervals(intervals, rulerSettings, hRuler, hWidth, isLine);
            }
            var spaceY = 0;
            intervals = getInterval(intervals, isLine);
            for (var i = 0; i < intervals.length; i = i + 2) {
                space = getSpaceValue(intervals, isLine, i, space);
                var d = isLine ? space + intervals[parseInt(i.toString(), 10)] / 2 : space;
                d = isRulerGrid ? d : d * scale;
                vLine = document.createElementNS('http://www.w3.org/2000/svg', isLine ? 'path' : 'circle');
                var attr = void 0;
                if (isLine) {
                    if (dashArray.toString() === '') {
                        attr = {
                            'stroke-width': intervals[parseInt(i.toString(), 10)],
                            'd': 'M' + (d) + ',0 L' + (d) + ',' + hHeight + ' Z',
                            'class': intervals[parseInt(i.toString(), 10)] === 1.25 ? 'e-diagram-thick-grid' : 'e-diagram-thin-grid',
                            'stroke': snapSettings.verticalGridlines.lineColor
                        };
                    }
                    else {
                        attr = {
                            'stroke-width': intervals[parseInt(i.toString(), 10)],
                            'class': intervals[parseInt(i.toString(), 10)] === 1.25 ? 'e-diagram-thick-grid' : 'e-diagram-thin-grid',
                            'stroke': snapSettings.verticalGridlines.lineColor,
                            'd': 'M' + (d) + ',0 L' + (d) + ',' + hHeight + ' Z',
                            'dashArray': dashArray.toString()
                        };
                    }
                    setAttributeSvg(vLine, attr);
                    pattern.appendChild(vLine);
                    space += intervals[i + 1] + intervals[parseInt(i.toString(), 10)];
                }
                else {
                    this.renderDotGrid(i, pattern, snapSettings, spaceY, d, scale, false);
                    space += intervals[parseInt(i.toString(), 10)];
                }
            }
        }
    };
    /**
     * Method used to update the grid line for the diagram  \
     *
     * @returns {void } Method used to update the grid line for the diagram .\
     *
     * @param {SnapSettingsModel} snapSettings - Provide the snapsetting value of the diagram .
     * @param { SVGSVGElement } svgGrid - Provide the SVG grid  element value.
     * @param { Transforms } transform - Provide the transform value  .
     * @param { RulerSettingsModel } rulerSettings - Provide the ruler setting property .
     * @param { RulerModel } hRuler - Provide the horizontal ruler property value .
     * @param { RulerModel } vRuler - Provide the vertical ruler property value .
     * @private
     */
    DiagramRenderer.prototype.updateGrid = function (snapSettings, svgGrid, transform, rulerSettings, hRuler, vRuler) {
        var grid = svgGrid.getElementById(this.diagramId + '_grid_rect');
        //let i: number;
        var isRulerGrid = false;
        if (grid) {
            var pattern = svgGrid.getElementById(this.diagramId + '_pattern');
            if (pattern) {
                pattern.parentNode.removeChild(pattern);
            }
            var hSegmentwidth = 0;
            var vSegmentwidth = 0;
            var scale = 1;
            var isLine = snapSettings.gridType === 'Lines';
            var verticalLineIntervals = isLine ?
                snapSettings.verticalGridlines.lineIntervals : snapSettings.verticalGridlines.dotIntervals;
            var horizontalLineIntervals = isLine ?
                snapSettings.horizontalGridlines.lineIntervals : snapSettings.horizontalGridlines.dotIntervals;
            if (rulerSettings.showRulers && rulerSettings.dynamicGrid && vRuler && hRuler) {
                hSegmentwidth = vRuler.updateSegmentWidth(transform.scale);
                vSegmentwidth = hRuler.updateSegmentWidth(transform.scale);
                isRulerGrid = true;
                snapSettings.horizontalGridlines.scaledIntervals = [hSegmentwidth / hRuler.interval];
                snapSettings.verticalGridlines.scaledIntervals = [vSegmentwidth / vRuler.interval];
            }
            else {
                scale = this.scaleSnapInterval(snapSettings, transform.scale);
            }
            var height = 0;
            for (var j = 0; j < horizontalLineIntervals.length; j = j + 1) {
                height += horizontalLineIntervals[parseInt(j.toString(), 10)];
            }
            var width = 0;
            for (var j = 0; j < verticalLineIntervals.length; j = j + 1) {
                width += verticalLineIntervals[parseInt(j.toString(), 10)];
            }
            var attr = {
                x: -transform.tx * transform.scale,
                y: -transform.ty * transform.scale
            };
            setAttributeSvg(grid, attr);
            width = isRulerGrid ? vSegmentwidth : width * scale;
            height = isRulerGrid ? hSegmentwidth : height * scale;
            attr = {
                id: this.diagramId + '_pattern', x: 0, y: 0, width: width,
                height: height, patternUnits: 'userSpaceOnUse'
            };
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            setAttributeSvg(pattern, attr);
            this.horizontalSvgGridlines(pattern, width, height, scale, snapSettings, rulerSettings, vRuler, isRulerGrid, isLine, horizontalLineIntervals);
            this.verticalSvgGridlines(pattern, width, height, scale, snapSettings, rulerSettings, hRuler, isRulerGrid, isLine, verticalLineIntervals);
            var defs = svgGrid.getElementById(this.diagramId + '_grid_pattern_defn');
            if (defs) {
                defs.appendChild(pattern);
            }
        }
    };
    DiagramRenderer.prototype.updateLineIntervals = function (intervals, rulerSettings, ruler, segmentWidth, isLine) {
        var newInterval = [];
        var tickInterval = segmentWidth / ruler.interval;
        var interval = isLine ? ruler.interval : ruler.interval + 1;
        for (var i = 0; i < interval * 2; i++) {
            if (i % 2 === 0) {
                newInterval[parseInt(i.toString(), 10)] = isLine ? ((i === 0) ? 1.25 : 0.25) : 0;
            }
            else {
                newInterval[parseInt(i.toString(), 10)] = isLine ? (tickInterval - newInterval[i - 1]) : tickInterval;
            }
        }
        return newInterval;
    };
    DiagramRenderer.prototype.scaleSnapInterval = function (snapSettings, scale) {
        if (scale >= 2) {
            while (scale >= 2) {
                scale /= 2;
            }
        }
        else if (scale <= 0.5) {
            while (scale <= 0.5) {
                scale *= 2;
            }
        }
        var i;
        snapSettings.horizontalGridlines.scaledIntervals = snapSettings.horizontalGridlines.snapIntervals;
        snapSettings.verticalGridlines.scaledIntervals = snapSettings.verticalGridlines.snapIntervals;
        if (scale !== 1) {
            var gridlines = snapSettings.horizontalGridlines;
            gridlines.scaledIntervals = [];
            for (i = 0; i < gridlines.snapIntervals.length; i++) {
                gridlines.scaledIntervals[parseInt(i.toString(), 10)] = gridlines.snapIntervals[parseInt(i.toString(), 10)] * scale;
            }
            gridlines = snapSettings.verticalGridlines;
            gridlines.scaledIntervals = [];
            for (i = 0; i < gridlines.snapIntervals.length; i++) {
                gridlines.scaledIntervals[parseInt(i.toString(), 10)] = gridlines.snapIntervals[parseInt(i.toString(), 10)] * scale;
            }
        }
        return scale;
    };
    /**
     * Method used to render the text element  \
     *
     * @returns {void }Method used to render the text element  .\
     *
     * @param {TextElement} element - Provide the text element .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @param { object } centerPoint - Provide the center point value .
     * @private
     */
    DiagramRenderer.prototype.renderTextElement = function (element, canvas, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform, parentSvg, fromPalette, centerPoint) {
        var options = this.getBaseAttributes(element, transform);
        if (centerPoint) {
            //Bug 827039: Bezier annotation content alignment is not working properly.
            // Removed -2 cx-2 and cy-2 from the below two line to resolve the alignment issue.
            options.x = centerPoint[element.id] ? centerPoint[element.id].cx : options.x;
            options.y = centerPoint[element.id] ? centerPoint[element.id].cy : options.y;
            // (EJ2-56874) - Set the calculated x and y position to the bezier connector annotation's(text element) bounds x,y position
            element.bounds.x = options.x;
            element.bounds.y = options.y;
            // (EJ2-58802) - Calculate the center point x and y with the element export scale value if element is in export mode
            if (element.isExport) {
                options.x = options.x * Math.min(element.exportScaleValue.x || element.exportScaleValue.y);
                options.y = options.y * Math.min(element.exportScaleValue.x || element.exportScaleValue.y);
            }
        }
        options.cornerRadius = 0;
        options.whiteSpace = whiteSpaceToString(element.style.whiteSpace, element.style.textWrapping);
        options.content = element.content;
        options.breakWord = wordBreakToString(element.style.textWrapping);
        options.textAlign = textAlignToString(element.style.textAlign);
        options.color = element.style.color;
        options.italic = element.style.italic;
        options.bold = element.style.bold;
        options.fontSize = element.style.fontSize;
        options.fontFamily = element.style.fontFamily;
        options.textOverflow = element.style.textOverflow;
        options.textWrapping = element.style.textWrapping;
        options.textDecoration = element.style.textDecoration;
        options.doWrap = element.doWrap;
        options.wrapBounds = element.wrapBounds;
        options.childNodes = element.childNodes;
        options.isHorizontalLane = element.isLaneOrientation;
        options.id = element.id ? element.id : randomId();
        if (element.isLaneOrientation) {
            options.parentOffsetX = this.groupElement.offsetX;
            options.parentOffsetY = this.groupElement.offsetY;
            options.parentWidth = this.groupElement.actualSize.width;
            options.parentHeight = this.groupElement.actualSize.height;
        }
        options.dashArray = '';
        options.strokeWidth = 0;
        options.fill = element.style.fill;
        var ariaLabel = element.description ? element.description : element.content ? element.content : element.id;
        if ((element.style.textWrapping === 'Wrap' || element.style.textWrapping === 'WrapWithOverflow') &&
            this.groupElement && options.height > this.groupElement.actualSize.height &&
            (element.style.textOverflow === 'Clip' || element.style.textOverflow === 'Ellipsis')) {
            options.y = options.y + (options.height - this.groupElement.actualSize.height) / 2;
        }
        this.renderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, parentSvg);
        this.renderer.drawText(canvas, options, parentSvg, ariaLabel, this.diagramId, (element.isExport && Math.min(element.exportScaleValue.x || element.exportScaleValue.y)), this, element);
        if (this.isSvgMode) {
            element.doWrap = false;
        }
    };
    DiagramRenderer.prototype.renderNativeElement = function (element, canvas, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform, parentSvg, fromPalette) {
        var templateWidth;
        var templateHeight;
        var nativeSvg = this.getParentSvg(element, undefined, canvas) || parentSvg;
        var nativeLayer = this.getParentElement(element, canvas, nativeSvg).g || canvas;
        var options = this.getBaseAttributes(element, transform);
        options.fill = 'transparent';
        options.cornerRadius = element.cornerRadius;
        options.stroke = 'transparent';
        this.renderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, parentSvg);
        switch (element.scale) {
            case 'None':
                templateWidth = element.contentSize.width;
                templateHeight = element.contentSize.height;
                break;
            case 'Stretch':
                templateWidth = element.actualSize.width;
                templateHeight = element.actualSize.height;
                break;
            case 'Meet':
                if (element.actualSize.width <= element.actualSize.height) {
                    templateWidth = templateHeight = element.actualSize.width;
                }
                else {
                    templateWidth = templateHeight = element.actualSize.height;
                }
                break;
            case 'Slice':
                if (element.actualSize.width >= element.actualSize.height) {
                    templateWidth = templateHeight = element.actualSize.width;
                }
                else {
                    templateWidth = templateHeight = element.actualSize.height;
                }
                break;
        }
        if (this.svgRenderer) {
            this.svgRenderer.drawNativeContent(element, nativeLayer, templateHeight, templateWidth, nativeSvg);
        }
    };
    DiagramRenderer.prototype.renderHTMLElement = function (element, canvas, htmlLayer, transform, parentSvg, fromPalette, indexValue) {
        var options = this.getBaseAttributes(element, transform);
        options.fill = 'transparent';
        options.cornerRadius = element.cornerRadius;
        options.stroke = 'transparent';
        this.renderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, parentSvg);
        if (this.svgRenderer) {
            this.svgRenderer.drawHTMLContent(element, htmlLayer.children[0], transform, isDiagramChild(htmlLayer), indexValue);
        }
    };
    /**
     * Method used to render the image element  \
     *
     * @returns {void }Method used to render the image element  .\
     *
     * @param {ImageElement} element - Provide the image element .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { Transforms } transform - Provide the transform value  .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } fromPalette - Provide the boolean value .
     * @private
     */
    DiagramRenderer.prototype.renderImageElement = function (element, canvas, transform, parentSvg, fromPalette) {
        var options = this.getBaseAttributes(element, transform);
        options.cornerRadius = 0;
        this.renderer.drawRectangle(canvas, options, this.diagramId, undefined, undefined, parentSvg);
        // let sx: number; let sy: number;
        var imageWidth;
        var imageHeight;
        var sourceWidth;
        var sourceHeight;
        var contentWidth = element.contentSize.width;
        var contentHeight = element.contentSize.height;
        var widthRatio = options.width / contentWidth;
        var heightRatio = options.height / contentHeight;
        var ratio;
        if (element.stretch === 'Stretch') {
            // 909174: Image node is not exported properly Issue Fix
            ratio = Math.min(widthRatio, heightRatio);
            imageWidth = contentWidth * ratio;
            imageHeight = contentHeight * ratio;
        }
        else {
            switch (element.stretch) {
                case 'Meet':
                    ratio = Math.min(widthRatio, heightRatio);
                    imageWidth = contentWidth * ratio;
                    imageHeight = contentHeight * ratio;
                    options.x += Math.abs(options.width - imageWidth) / 2;
                    options.y += Math.abs(options.height - imageHeight) / 2;
                    break;
                case 'Slice':
                    ratio = Math.max(widthRatio, heightRatio);
                    imageWidth = contentWidth * ratio;
                    imageHeight = contentHeight * ratio;
                    sourceWidth = options.width / imageWidth * contentWidth;
                    sourceHeight = options.height / imageHeight * contentHeight;
                    break;
                case 'None':
                    imageWidth = contentWidth;
                    imageHeight = contentHeight;
                    break;
            }
        }
        options.width = imageWidth;
        options.height = imageHeight;
        //Commented for code coverage
        //(options as ImageAttributes).sourceX = sx;
        //(options as ImageAttributes).sourceY = sy;
        options.sourceWidth = sourceWidth;
        options.sourceHeight = sourceHeight;
        options.source = element.source;
        options.alignment = element.imageAlign;
        options.scale = element.imageScale;
        options.description = element.description ? element.description : element.id;
        this.renderer.drawImage(canvas, options, parentSvg, fromPalette, this, element);
    };
    /**
     * Method used to render the container  \
     *
     * @returns {void} Method used to render the container .\
     *
     * @param {Container} group - Provide the container .
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the canvas element .
     * @param { HTMLElement } htmlLayer - Provide the html layer element  .
     * @param { Transforms } transform - Provide the transform value .
     * @param { SVGSVGElement } parentSvg - Provide the SVG layer element .
     * @param { boolean } createParent - Provide the boolean value .
     * @param { boolean } fromPalette - Provide the boolean value  .
     * @param { number } indexValue - Provide the indexValue value .
     * @param { boolean } isPreviewNode - Provide the boolean value .
     * @param { object } centerPoint - Provide the centerPoint value .
     * @param {object} portCenterPoint - provide the portCenterPoint value.
     * @private
     */
    DiagramRenderer.prototype.renderContainer = function (group, canvas, htmlLayer, transform, parentSvg, createParent, fromPalette, indexValue, isPreviewNode, centerPoint, portCenterPoint) {
        var svgParent = { svg: parentSvg, g: canvas };
        var diagramElement = document.getElementById(this.diagramId);
        var instance = 'ej2_instances';
        var diagram;
        if (diagramElement) {
            diagram = diagramElement["" + instance][0];
        }
        if (this.diagramId) {
            parentSvg = this.getParentSvg(group) || parentSvg;
            if (this.isSvgMode) {
                //const groupElement: HTMLCanvasElement | SVGElement;
                // eslint-disable-next-line max-len
                var groupElement = this.getParentElement(group, canvas, parentSvg, indexValue).g || canvas;
                parentSvg = this.getParentSvg(this.hasNativeParent(group.children)) || parentSvg;
                var svgNativeParent = this.getParentElement(this.hasNativeParent(group.children), groupElement, parentSvg, indexValue);
                svgParent.svg = svgNativeParent.svg || parentSvg;
                svgParent.g = svgNativeParent.g || groupElement;
                if (createParent) {
                    if (parentSvg) {
                        if (!parentSvg.getElementById(svgParent.g.id)) {
                            canvas.appendChild(svgParent.g);
                        }
                    }
                    canvas = svgParent.g;
                }
                else {
                    canvas = svgParent.g;
                }
            }
        }
        this.renderRect(group, canvas, transform, parentSvg);
        this.groupElement = group;
        if (group.hasChildren()) {
            var parentG = void 0;
            var svgParent_1;
            for (var _i = 0, _a = group.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.groupElement = group;
                parentSvg = this.getParentSvg(this.hasNativeParent(group.children) || child) || parentSvg;
                if (this.isSvgMode) {
                    svgParent_1 = this.getParentElement(this.hasNativeParent(group.children) || child, canvas, parentSvg);
                    parentG = svgParent_1.g || canvas;
                    if (svgParent_1.svg) {
                        parentSvg = svgParent_1.svg;
                    }
                }
                if (!this.isSvgMode) {
                    if (child.relativeMode === 'Object') {
                        child.flip = group.flip;
                        //To update the compensation and adhoc child flip in print and export.
                        if (child.id && (child.id.includes('_0_compensation') || child.id.includes('_0_adhoc'))) {
                            if (group.children[0].flip) {
                                child.flip = group.children[0].flip;
                            }
                        }
                    }
                }
                var parentGElement = parentG;
                this.renderElement(child, parentG || canvas, htmlLayer, transform, parentSvg, true, fromPalette, indexValue, isPreviewNode, centerPoint, portCenterPoint);
                if (group.children && group.children[0] instanceof DiagramNativeElement) {
                    if (child instanceof TextElement || (child.elementActions & ElementAction.ElementIsPort)) {
                        parentGElement = document.getElementById(child.id + '_groupElement');
                    }
                }
                if (child instanceof TextElement && parentGElement) {
                    this.renderFlipTextElement(group, parentGElement, child, child.flip, child.flipMode);
                }
            }
            var selectedNode = void 0;
            if (diagram && diagram.selectedItems && diagram.selectedItems.nodes
                && diagram.selectedItems.nodes.length > 0) {
                selectedNode = diagram.selectedItems.nodes[0];
            }
            var innerNodeContent = void 0;
            var innerLabelContent = void 0;
            var isNodeSelected = false;
            var Node_1;
            var objId = group.id.includes('group_container')
                ? group.id.split('group_container')[0]
                : group.id;
            if (diagram && diagram.selectedItems) {
                Node_1 = diagram.getObject(objId);
            }
            selectedNode = Node_1;
            if (selectedNode && selectedNode.flipMode) {
                isNodeSelected = true;
            }
            var containerId = '';
            if (selectedNode) {
                containerId = selectedNode.children ? selectedNode.id + 'group_container' : selectedNode.id + '_content_groupElement';
            }
            if (diagram instanceof Diagram && diagram.nameTable["" + objId] && diagram.nameTable["" + objId].propName !== 'connectors') {
                if (isNodeSelected && selectedNode) {
                    if (group.children && group.children[0] instanceof DiagramNativeElement) {
                        innerNodeContent = document.getElementById(selectedNode.id + '_content_inner_native_element');
                    }
                    else if (group.children && group.children[0] instanceof DiagramHtmlElement) {
                        innerNodeContent = document.getElementById(selectedNode.id + '_content_html_element');
                        if (!innerNodeContent) {
                            innerNodeContent = document.getElementById(containerId);
                        }
                    }
                    else {
                        innerNodeContent = document.getElementById(containerId);
                    }
                    this.renderFlipElement(group, innerNodeContent, group.flip);
                }
            }
        }
    };
    /**
     * Method used to flip the text element   \
     *
     * @returns {void} Method used to flip the text element.\
     *
     * @param {DiagramElement} element - Provide the node element.
     * @param { HTMLCanvasElement | SVGElement} canvas - Provide the text canvas element.
     * @param { DiagramElement } textElement - Provide the text element.
     * @param { FlipDirection } flip - Provide the node flip direction.
     * @param { FlipMode } flipMode - Provide the node flipMode.
     * @param { boolean } isCanvasMode - Provide the isCanvas mode.
     */
    DiagramRenderer.prototype.renderFlipTextElement = function (element, canvas, textElement, flip, flipMode, isCanvasMode) {
        var attr = {};
        var scaleX = 1;
        var scaleY = 1;
        var posX = 0;
        var posY = 0;
        var offsetX = 0;
        var offsetY = 0;
        if (flip !== FlipDirection.None) {
            var rotateAngle = element.rotateAngle;
            if (element.rotateAngle === 0 && element.id.includes('group_container')) {
                rotateAngle = element.parentTransform;
            }
            // Fetch annotation offset
            var textPos = textElement.getAbsolutePosition(textElement.desiredSize);
            if (!textPos) {
                var size = textElement.desiredSize;
                textPos = { x: 0.5 * size.width, y: 0.5 * size.height };
            }
            if (textPos && textElement.content !== '') {
                // Inverting and translating Annotation
                if (flipMode === 'All' || flipMode === 'LabelAndLabelText') {
                    if (flip === FlipDirection.Horizontal || flip === FlipDirection.Both) {
                        posX = element.bounds.center.x;
                        offsetX = -element.bounds.center.x;
                        scaleX = -1;
                    }
                    if (flip === FlipDirection.Vertical || flip === FlipDirection.Both) {
                        posY = element.bounds.center.y;
                        offsetY = -element.bounds.center.y;
                        scaleY = -1;
                    }
                    if (flip === FlipDirection.Horizontal || flip === FlipDirection.Vertical) {
                        var angle = Math.sin(rotateAngle * Math.PI / 180);
                        //918299 - Issue with Polygon Shape Node Rotation After Grouping and Flipping
                        if (textPos.y !== undefined && !isNaN(textPos.y)) {
                            var textPosY = textPos.y / textElement.desiredSize.height;
                            if (!isNaN(textPosY)) {
                                offsetX += -element.desiredSize.height * angle * (-2 * textPosY + 1);
                            }
                        }
                        if (textPos.x !== undefined && !isNaN(textPos.x)) {
                            var textPosX = textPos.x / textElement.desiredSize.width;
                            if (!isNaN(textPosX)) {
                                offsetY += element.desiredSize.width * angle * (-2 * textPosX + 1);
                            }
                        }
                    }
                    attr = {
                        'transform': 'translate(' + posX + ',' + posY + ') scale(' + scaleX + ','
                            + scaleY + ') translate(' + offsetX + ',' + offsetY + ')'
                    };
                }
                // Inverting Annotation without flipping position
                else if (flipMode === 'LabelText' || flipMode === 'PortAndLabelText') {
                    if (flip === FlipDirection.Horizontal || flip === FlipDirection.Both) {
                        posX = textElement.offsetX;
                        offsetX = -textElement.offsetX;
                        scaleX = -1;
                    }
                    if (flip === FlipDirection.Vertical || flip === FlipDirection.Both) {
                        posY = textElement.offsetY;
                        offsetY = -textElement.offsetY;
                        scaleY = -1;
                    }
                    attr = {
                        'transform': 'translate(' + posX + ',' + posY + ') scale(' + scaleX + ','
                            + scaleY + ') translate(' + offsetX + ',' + offsetY + ')'
                    };
                }
                // Translating Annotation
                else if (flipMode === 'PortAndLabel' || flipMode === 'Label') {
                    var labelPosX = 0;
                    var labelPosY = 0;
                    var labelPos = this.flipLabel(element, textElement, textPos, flip);
                    labelPosX = labelPos.x - textElement.offsetX;
                    labelPosY = labelPos.y - textElement.offsetY;
                    attr = { 'transform': 'translate(' + labelPosX + ',' + labelPosY + ')' };
                }
            }
        }
        else {
            attr = {
                'transform': 'translate(' + 0 + ',' + 0 + ')'
            };
        }
        if (!isCanvasMode) {
            this.setFlipAttributes(element, canvas, attr, scaleX, scaleY, false);
            return {};
        }
        else {
            return attr;
        }
    };
    DiagramRenderer.prototype.renderFlipElement = function (element, canvas, flip, isCanvasMode) {
        var attr = {};
        var scaleX = 1;
        var scaleY = 1;
        var posX = 0;
        var posY = 0;
        var offsetX = 0;
        var offsetY = 0;
        if (flip !== FlipDirection.None) {
            if (flip === FlipDirection.Horizontal || flip === FlipDirection.Both) {
                posX = element.bounds.center.x;
                offsetX = -element.bounds.center.x;
                scaleX = -1;
            }
            if (flip === FlipDirection.Vertical || flip === FlipDirection.Both) {
                posY = element.bounds.center.y;
                offsetY = -element.bounds.center.y;
                scaleY = -1;
            }
            attr = {
                'transform': 'translate(' + posX + ',' + posY + ') scale(' + scaleX + ','
                    + scaleY + ') translate(' + offsetX + ',' + offsetY + ')'
            };
        }
        else {
            attr = {
                'transform': 'translate(' + 0 + ',' + 0 + ')'
            };
        }
        var isHtml = element && element.children &&
            element.children.length && (element.children[0] instanceof DiagramHtmlElement);
        if (!isCanvasMode) {
            this.setFlipAttributes(element, canvas, attr, scaleX, scaleY, isHtml);
            return {};
        }
        else {
            return attr;
        }
    };
    DiagramRenderer.prototype.setFlipAttributes = function (element, canvas, attr, scaleX, scaleY, isHtml) {
        if (attr) {
            if (isHtml) {
                var id = canvas.id.split('_preview');
                var layer = document.getElementById(id[0] + '_html_div') ||
                    (getHTMLLayer(this.diagramId).children[0]);
                canvas = layer.querySelector(('#' + element.id + '_content_html_element'));
                var flipAngle = (element.flip === FlipDirection.None || element.flip === FlipDirection.Both) ? 1 : -1;
                if (canvas) {
                    canvas.style.transform =
                        'scale(' + scaleX + ',' + scaleY + ')' + 'rotate(' + ((flipAngle * element.rotateAngle) + element.parentTransform) + 'deg)';
                }
            }
            else {
                setAttributeSvg(canvas, attr);
            }
        }
    };
    /**
     * Calculates Flipped Position of textElement considering annotation offset
     *
     * @returns {PointModel} - flipped point of textElement current point
     *
     * @param {NodeModel} element - Provide node wrapper element containing the text element.
     * @param {TextElement} textElement - Provide the textElememt to flip.
     * @param {PointModel} labelPos - Provide the annotation offset.
     * @param {FlipDirection} flip - Provide the node flip direction.
     */
    DiagramRenderer.prototype.flipLabel = function (element, textElement, labelPos, flip) {
        var flippedOffset;
        if (flip !== FlipDirection.None) {
            var flippedOffsetX = void 0;
            var flippedOffsetY = void 0;
            // Node's topLeft Position
            var topLeft = {
                x: element.offsetX - element.desiredSize.width / 2,
                y: element.offsetY - element.desiredSize.height / 2
            };
            flippedOffsetX = topLeft.x + (element.desiredSize.width * ((labelPos.x / textElement.desiredSize.width)));
            flippedOffsetY = topLeft.y + (element.desiredSize.height * ((labelPos.y / textElement.desiredSize.height)));
            if (flip === FlipDirection.Both || flip === FlipDirection.Horizontal) {
                flippedOffsetX = topLeft.x + (element.desiredSize.width * (1 - (labelPos.x / textElement.desiredSize.width)));
            }
            if (flip === FlipDirection.Both || flip === FlipDirection.Vertical) {
                flippedOffsetY = topLeft.y + (element.desiredSize.height * (1 - (labelPos.y / textElement.desiredSize.height)));
            }
            // Flipped Position
            flippedOffset = { x: flippedOffsetX, y: flippedOffsetY };
            // FlippedPoint after rotating, with node offset as its pivot
            flippedOffset = rotatePoint(element.rotateAngle + element.parentTransform, element.offsetX, element.offsetY, flippedOffset);
        }
        return flippedOffset;
    };
    /**
     * Method used to check the native parent  \
     *
     * @returns {void} Method used to check the native parent .\
     *
     * @param { DiagramElement[]} children - Provide the diagram element .
     * @param { number} count - Provide the count value .
     * @private
     */
    DiagramRenderer.prototype.hasNativeParent = function (children, count) {
        if (children && children.length > 0 && (count || 0 < 3)) {
            var child = children[0];
            if (child instanceof DiagramNativeElement) {
                return child;
            }
            else if (child.children && child.children.length) {
                this.hasNativeParent(child.children, count++ || 0);
            }
        }
        return undefined;
    };
    /**
     * Method used the draw the reactangle for the diagram  \
     *
     * @returns {void} Method used the draw the reactangle for the diagram .\
     *
     * @param { SVGElement} element - Provide the SVG elements .
     * @param { RectAttributes} canvas - Provide the Canvas element  .
     * @param { RectAttributes} transform - Provide transform value for the node  .
     * @param { RectAttributes} parentSvg -provide the parent SVG  .
     * @param { RectAttributes} isPreviewNode - Provide the preview boolean value  .
     * @private
     */
    DiagramRenderer.prototype.renderRect = function (element, canvas, transform, parentSvg, isPreviewNode) {
        var options = this.getBaseAttributes(element, transform, isPreviewNode);
        options.cornerRadius = element.cornerRadius || 0;
        if (element.isExport) {
            options.cornerRadius *= element.exportScaleValue.x;
        }
        var ariaLabel = element.description ? element.description : element.id;
        this.renderer.drawRectangle(canvas, options, this.diagramId, element.isExport, undefined, parentSvg, ariaLabel, undefined, undefined, this, element);
    };
    /**
     * Method used the draw the reactangle for the diagram  \
     *
     * @returns {void} Method used the draw the reactangle for the diagram .\
     *
     * @param { SVGElement} canvas - Provide the SVG elements .
     * @param { RectAttributes} options - Provide the attributes to draw the rectangle  .
     * @private
     */
    DiagramRenderer.prototype.drawRect = function (canvas, options) {
        options.cornerRadius = 0;
        this.svgRenderer.drawRectangle(canvas, options, this.diagramId);
    };
    /**
     * Will get the base attributes for all the elements  \
     *
     * @returns {BaseAttributes} Will get the base attributes for all the elements .\
     *
     * @param { DiagramElement} element - Provide the diagram elements .
     * @param { Transforms} transform - Provide the transform value for the  elements .
     * @param { boolean} isPreviewNode - Provide the preview boolean value.
     * @private
     */
    DiagramRenderer.prototype.getBaseAttributes = function (element, transform, isPreviewNode) {
        var options = {
            width: element.actualSize.width, height: element.actualSize.height,
            //EJ2-840163-Draw highlighter not rendered properly while hovering ports
            x: element.offsetX - element.actualSize.width * element.pivot.x,
            y: element.offsetY - element.actualSize.height * element.pivot.y,
            fill: element.style.fill, stroke: element.style.strokeColor, angle: element.rotateAngle + element.parentTransform,
            pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: element.style.strokeWidth,
            dashArray: element.style.strokeDashArray || '', opacity: element.style.opacity, shadow: element.shadow,
            gradient: element.style.gradient, visible: element.visible, id: element.id, description: element.description,
            canApplyStyle: element.canApplyStyle, shapeType: element.shapeType
        };
        if (element.rotationReference === 'Page') {
            options.angle = element.rotateAngle;
        }
        if (isPreviewNode) {
            options.x = options.x - .5;
            options.y = options.y - .5;
        }
        if (element.isExport) {
            options.width *= element.exportScaleValue.x;
            options.height *= element.exportScaleValue.y;
            options.x *= element.exportScaleValue.x;
            options.y *= element.exportScaleValue.y;
            options.strokeWidth *= element.exportScaleValue.x;
        }
        if (element.flip) {
            options.flip = element.flip;
            if ((element.flip === FlipDirection.Horizontal || element.flip === FlipDirection.Vertical) &&
                element instanceof ImageElement && !this.isSvgMode) {
                options.isImage = true;
            }
        }
        if (element.flipMode) {
            options.flipMode = element.flipMode;
        }
        if (transform) {
            options.x += transform.tx;
            options.y += transform.ty;
        }
        return options;
    };
    /**
     * Will render the SVG background image  \
     *
     * @returns {void} Will render the SVG background image  .\
     *
     * @param { Transforms} background - Provide the transforms values .
     * @param { boolean} diagramElement - Provide element for the daigram.
     * @param { boolean} x - Provide the rendering mode of the daigram.
     * @param { boolean} y - Provide the rendering mode of the daigram.
     * @param { boolean} width - Provide the rendering mode of the daigram.
     * @param { boolean} height - Provide the rendering mode of the daigram.
     * @private
     */
    DiagramRenderer.renderSvgBackGroundImage = function (background, diagramElement, x, y, width, height) {
        if (background.source) {
            var backgroundLayer = getBackgroundLayerSvg(diagramElement.id);
            var target = backgroundLayer.getElementById(diagramElement.id + '_image');
            if (!target) {
                var bgimageLayer = getBackgroundImageLayer(diagramElement.id);
                target = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                target.setAttribute('id', diagramElement.id + '_image');
                bgimageLayer.appendChild(target);
            }
            var imageObj = new Image();
            imageObj.src = background.source;
            target.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageObj.src.toString());
            var scale = background.scale !== 'None' ? background.scale : '';
            var imgAlign = background.align;
            var aspectRatio = imgAlign.charAt(0).toLowerCase() + imgAlign.slice(1);
            if (scale) {
                aspectRatio += ' ' + scale.charAt(0).toLowerCase() + scale.slice(1);
            }
            var attr = {
                'id': diagramElement.id + '_image', 'x': x, 'y': y,
                'width': width, 'height': height,
                'preserveAspectRatio': aspectRatio
            };
            setAttributeSvg(target, attr);
        }
    };
    /**
     * Method used to transform the layer  \
     *
     *  @returns {boolean} Method used to transform the layer  .\
     *  @param { Transforms} transform - Provide the transforms values .
     *  @param { boolean} svgMode - Provide the rendering mode of the daigram.
     *  @private
     */
    DiagramRenderer.prototype.transformLayers = function (transform, svgMode) {
        var tx = transform.tx * transform.scale;
        var ty = transform.ty * transform.scale;
        var domTable = 'domTable';
        if (tx !== this.transform.x || ty !== this.transform.y || (tx === 0 || ty === 0)) {
            //diagram layer
            if (svgMode) {
                if (!window["" + domTable][this.diagramId + '_diagramLayer']) {
                    window["" + domTable][this.diagramId + '_diagramLayer'] =
                        this.diagramSvgLayer.getElementById(this.diagramId + '_diagramLayer');
                }
                var diagramLayer = window["" + domTable][this.diagramId + '_diagramLayer'];
                diagramLayer.setAttribute('transform', 'translate('
                    + (transform.tx * transform.scale) + ',' + (transform.ty * transform.scale) + '),scale('
                    + transform.scale + ')');
            }
            //background
            //gridline
            var gridLayer = getGridLayer(this.diagramId);
            gridLayer.setAttribute('transform', 'translate(' + (transform.tx * transform.scale) + ','
                + (transform.ty * transform.scale) + ')');
            //portslayer
            if (!window["" + domTable][this.diagramId + '_diagramPorts']) {
                window["" + domTable][this.diagramId + '_diagramPorts'] = this.iconSvgLayer.getElementById(this.diagramId + '_diagramPorts');
            }
            var portsLayer = window["" + domTable][this.diagramId + '_diagramPorts'];
            portsLayer.setAttribute('transform', 'translate('
                + (transform.tx * transform.scale) + ',' + (transform.ty * transform.scale) + '),scale('
                + transform.scale + ')');
            //expandlayer
            if (!window["" + domTable][this.diagramId + '_diagramExpander']) {
                window["" + domTable][this.diagramId + '_diagramExpander'] =
                    this.iconSvgLayer.getElementById(this.diagramId + '_diagramExpander');
            }
            var expandLayer = window["" + domTable][this.diagramId + '_diagramExpander'];
            expandLayer.setAttribute('transform', 'translate('
                + (transform.tx * transform.scale) + ',' + (transform.ty * transform.scale) + '),scale('
                + transform.scale + ')');
            //nativelayer
            if (!window["" + domTable][this.diagramId + '_nativeLayer']) {
                window["" + domTable][this.diagramId + '_nativeLayer'] = this.nativeSvgLayer.getElementById(this.diagramId + '_nativeLayer');
            }
            var nativeLayer = window["" + domTable][this.diagramId + '_nativeLayer'];
            nativeLayer.setAttribute('transform', 'translate('
                + (transform.tx * transform.scale) + ',' + (transform.ty * transform.scale) + '),scale('
                + transform.scale + ')');
            //htmlLayer
            var htmlLayer = getHTMLLayer(this.diagramId).children[0];
            htmlLayer.style.transform = 'translate('
                + (transform.tx * transform.scale) + 'px,' + (transform.ty * transform.scale) + 'px)scale('
                + transform.scale + ')';
            this.transform = { x: transform.tx * transform.scale, y: transform.ty * transform.scale };
            return true;
        }
        return false;
    };
    /**
     * Method used to update the nodes in the diagram  \
     *
     *  @returns {void} Method used to update the nodes in the diagram  .\
     *  @param { HTMLCanvasElement} element - Provide the diagram element .
     *  @param { HTMLCanvasElement} diagramElementsLayer - Provide the diagram layer element .
     *  @param { HTMLCanvasElement} htmlLayer -Provide the html element .
     *  @param { HTMLCanvasElement} transform - Provide the transform value .
     *  @param { HTMLCanvasElement} insertIndex - Provide the index value.
     *  @param { object} centerPoint - Provide the center point value.
     *  @param {object} portCenterPoint - provide the portCenterPoint value.
     *  @private
     */
    DiagramRenderer.prototype.updateNode = function (element, diagramElementsLayer, htmlLayer, transform, insertIndex, centerPoint, portCenterPoint) {
        this.renderElement(element, diagramElementsLayer, htmlLayer, transform, this.getParentSvg(element), undefined, undefined, insertIndex, null, centerPoint, portCenterPoint);
    };
    return DiagramRenderer;
}());
export { DiagramRenderer };
