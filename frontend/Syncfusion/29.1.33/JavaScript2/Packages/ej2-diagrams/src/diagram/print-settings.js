/* eslint-disable jsdoc/require-param */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Browser } from '@syncfusion/ej2-base';
import { CanvasRenderer } from './rendering/canvas-renderer';
import { DiagramRenderer } from './rendering/renderer';
import { Size } from './primitives/size';
import { SnapConstraints } from './enum/enum';
import { setAttributeHtml, setAttributeSvg, createHtmlElement } from './utility/dom-util';
import { Rect } from './primitives/rect';
import { createSvgElement, getHTMLLayer } from './utility/dom-util';
import { getDiagramLayerSvg } from './utility/dom-util';
import { checkBrowserInfo } from './utility/diagram-util';
import { DiagramHtmlElement } from './core/elements/html-element';
import { DiagramNativeElement } from './core/elements/native-element';
import { LinearGradient } from './core/appearance';
var storeFormat;
/**
 * Print and Export Settings
 */
var PrintAndExport = /** @class */ (function () {
    function PrintAndExport(diagram) {
        var _this = this;
        this.printWindow = undefined;
        //833683 - Method for closing the newly opened print window.
        this.closePrintWindow = function () {
            if (_this.printWindow && !_this.printWindow.closed) {
                _this.printWindow.close();
            }
        };
        this.diagram = diagram;
    }
    /**
     * To Export the diagram
     *
     * @private
     */
    PrintAndExport.prototype.exportDiagram = function (options) {
        var fileType;
        var customBounds;
        var content;
        var content1 = '';
        var data = 'data';
        //let mode: string;
        var buffers = [];
        var margin = options.margin || {};
        var region = options && options.region ? options.region : 'Content';
        // isBlazor code removed
        var mode = options && options.mode ? options.mode : 'Download';
        var bounds = this.getDiagramBounds(region, options);
        if (options.bounds) {
            customBounds = true;
            bounds.x = options.bounds.x ? options.bounds.x : bounds.x;
            bounds.y = options.bounds.y ? options.bounds.y : bounds.y;
            bounds.width = options.bounds.width || bounds.width;
            bounds.height = options.bounds.height || bounds.height;
        }
        margin = {
            top: margin.top !== undefined ? margin.top : 25,
            bottom: margin.bottom !== undefined ? margin.bottom : 25,
            right: margin.right !== undefined ? margin.right : 25,
            left: margin.left !== undefined ? margin.left : 25
        };
        var nodes = this.diagram.nodes;
        if (region !== 'PageSettings') {
            bounds.x -= margin.left;
            bounds.y -= margin.top;
            bounds.width += margin.left + margin.right;
            bounds.height += margin.top + margin.bottom;
        }
        var fileName = options.fileName || 'diagram';
        if (options.format !== 'SVG') {
            data = this.setCanvas(options, bounds, margin, mode, customBounds, region, fileName);
            if (data !== null) {
                return data;
            }
        }
        else {
            fileType = options.format;
            options.bounds = bounds;
            options.margin = margin;
            var svg = content = this.diagramAsSvg(options, margin);
            if (mode === 'Data') {
                // isBlazor code removed
                return content;
            }
            var buffer = new XMLSerializer().serializeToString(svg);
            buffers.push(buffer);
        }
        if (mode === 'Download' && data !== null) {
            var browserInfo = void 0;
            // Ensure this for Safari
            // if (Browser.info.name === 'msie' && Number(Browser.info.version) < 10 || Browser.info.name === 'webkit') {
            //     let info: string = Browser.info.name === 'webkit' ? 'Safari' : 'IE-9';
            //     alert('Downloading option is not supported in ' + info + ', Please use the returned data');
            //     return content;
            // } else {
            for (var b = 0; b < buffers.length; b++) {
                var blob = new Blob([buffers[parseInt(b.toString(), 10)]], { type: 'application/octet-stream' });
                if (Browser.info.name === 'msie') {
                    window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType);
                }
                else {
                    var pom = createHtmlElement('a', { 'download': fileName + '.' + fileType });
                    var url = URL.createObjectURL(blob);
                    pom.href = url;
                    var e = document.createEvent('MouseEvents');
                    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    pom.dispatchEvent(e);
                }
            }
        }
        return null;
    };
    PrintAndExport.prototype.setCanvas = function (options, bounds, margin, mode, customBounds, region, fileName) {
        var content;
        options.bounds = bounds;
        options.region = region;
        var scaleX = 'scaleX';
        var scaleY = 'scaleY';
        var scaleOffsetX = 'scaleOffsetX';
        var scaleOffsetY = 'scaleOffsetY';
        this.setScaleValueforCanvas(options, bounds);
        var canvas = this.diagramAsCanvas({
            bounds: bounds, margin: margin, region: region, scaleX: options["" + scaleX],
            scaleY: options["" + scaleY], scaleOffsetX: options["" + scaleOffsetX], scaleOffsetY: options["" + scaleOffsetY]
        }, customBounds);
        var image;
        if (options.format === 'JPG') {
            image = content = storeFormat = canvas.toDataURL('image/jpeg');
        }
        else if (options.format === 'BMP') {
            image = content = storeFormat = canvas.toDataURL('image/bmp');
        }
        else {
            image = content = storeFormat = canvas.toDataURL();
        }
        if (mode === 'Data') {
            return content;
        }
        this.canvasMultiplePage(options, canvas, margin, image, fileName);
        return null;
    };
    PrintAndExport.prototype.canvasMultiplePage = function (options, canvas, margin, image, fileName) {
        var _this = this;
        var images = [];
        var imageData = image.substring(image.indexOf(':') + 1, image.indexOf(';'));
        var imageFormat = imageData.substring(imageData.indexOf('/') + 1);
        if (imageFormat === 'jpeg') {
            imageFormat = undefined;
        }
        else {
            imageFormat = imageFormat.toUpperCase();
        }
        var fileType = imageFormat || 'JPG';
        if (options.multiplePage) {
            options.pageHeight = options.pageHeight ? options.pageHeight : this.diagram.pageSettings.height;
            options.pageWidth = options.pageWidth ? options.pageWidth : this.diagram.pageSettings.width;
            options.pageHeight = options.pageHeight ? options.pageHeight : canvas.width;
            options.pageWidth = options.pageWidth ? options.pageWidth : canvas.height;
            margin = options.margin || {};
            if (options.pageOrientation) {
                if ((options.pageOrientation === 'Landscape' && options.pageHeight > options.pageWidth) ||
                    options.pageOrientation === 'Portrait' && options.pageWidth > options.pageHeight) {
                    var temp = options.pageWidth;
                    options.pageWidth = options.pageHeight;
                    options.pageHeight = temp;
                }
            }
            options.margin = {
                top: !isNaN(margin.top) ? margin.top : 0,
                bottom: !isNaN(margin.bottom) ? margin.bottom : 0,
                left: !isNaN(margin.left) ? margin.left : 0,
                right: !isNaN(margin.right) ? margin.right : 0
            };
            var attr = {
                'id': this.diagram.element.id + '_printImage',
                'src': image
            };
            var img_1 = createHtmlElement('img', attr);
            img_1.onload = function () {
                images = _this.getMultipleImage(img_1, options, true);
                _this.exportImage(images, fileName, fileType, image);
            };
        }
        else {
            images = [image];
            this.exportImage(images, fileName, fileType, image);
        }
    };
    PrintAndExport.prototype.exportImage = function (images, fileName, fileType, image) {
        var buffers = [];
        var length = (!(images instanceof HTMLElement)) ? images.length : 0;
        for (var g = 0; g < length; g++) {
            image = images[parseInt(g.toString(), 10)];
            image = image.replace(/^data:[a-z]*;,/, '');
            var image1 = image.split(',');
            var byteString = atob(image1[1]);
            var buffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(buffer);
            for (var i = 0; i < byteString.length; i++) {
                intArray[parseInt(i.toString(), 10)] = byteString.charCodeAt(i);
            }
            buffers.push(buffer);
        }
        var _loop_1 = function (j) {
            var b = new Blob([buffers[parseInt(j.toString(), 10)]], { type: 'application/octet-stream' });
            if (Browser.info.name === 'msie') {
                window.navigator.msSaveOrOpenBlob(b, fileName + '.' + fileType);
            }
            else {
                var htmlElement_1 = createHtmlElement('a', { 'download': fileName + '.' + fileType });
                var urlLink = URL.createObjectURL(b);
                htmlElement_1.href = urlLink;
                var mouseEvent_1 = document.createEvent('MouseEvents');
                mouseEvent_1.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                setTimeout(function () {
                    htmlElement_1.dispatchEvent(mouseEvent_1);
                }, ((j + 1) * 5));
            }
        };
        // Ensure this for safari
        // if (Browser.info.name === 'msie' && Number(Browser.info.version) < 10 || Browser.info.name === 'webkit') {
        //     let browserInfo: string = Browser.info.name === 'webkit' ? 'Safari' : 'IE-9';
        //     alert('Downloading option is not supported in ' + browserInfo + ', Please use the returned data');
        //     return content;
        // } else {
        for (var j = 0; j < buffers.length; j++) {
            _loop_1(j);
        }
    };
    /**   @private  */
    PrintAndExport.prototype.getObjectsBound = function (options) {
        var nodes = this.diagram.nodes;
        var nodebounds;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (node.visible) {
                if (((options.format !== 'SVG' && !(node instanceof DiagramNativeElement) && !(node instanceof DiagramHtmlElement))
                    || (options.format === 'SVG' && !(node instanceof DiagramHtmlElement)))) {
                    if (!nodebounds) {
                        nodebounds = node.wrapper.outerBounds;
                    }
                    else {
                        nodebounds = nodebounds.uniteRect(node.wrapper.outerBounds);
                    }
                }
            }
        }
        var connectors = this.diagram.connectors;
        for (var _a = 0, connectors_1 = connectors; _a < connectors_1.length; _a++) {
            var connector = connectors_1[_a];
            if (connector.visible) {
                if (!nodebounds) {
                    nodebounds = connector.wrapper.outerBounds;
                }
                else {
                    nodebounds = nodebounds.uniteRect(connector.wrapper.outerBounds);
                }
            }
        }
        return nodebounds || new Rect(0, 0, 0, 0);
    };
    /**   @private  */
    PrintAndExport.prototype.getDiagramBounds = function (mode, options) {
        var rect = this.getObjectsBound(options);
        var left = rect.left;
        var top = rect.top;
        var right = rect.right - rect.left;
        var bottom = rect.bottom - rect.top;
        if (mode !== 'Content') {
            if (this.diagram.pageSettings && this.diagram.pageSettings.multiplePage) {
                left = rect.left;
                top = rect.top;
                if (this.diagram.pageSettings.width) {
                    left = Math.floor(left / this.diagram.pageSettings.width) * this.diagram.pageSettings.width;
                    right = Math.ceil(rect.right / this.diagram.pageSettings.width) * this.diagram.pageSettings.width - left;
                }
                if (this.diagram.pageSettings.height) {
                    top = Math.floor(top / this.diagram.pageSettings.height) * this.diagram.pageSettings.height;
                    bottom = Math.ceil(rect.bottom / this.diagram.pageSettings.height) * this.diagram.pageSettings.height - top;
                }
                if ((rect.width === 0) && this.diagram.pageSettings.width !== null) {
                    right = this.diagram.pageSettings.width;
                }
                if ((rect.height === 0) && this.diagram.pageSettings.height !== null) {
                    bottom = this.diagram.pageSettings.height;
                }
            }
            else {
                if (this.diagram.pageSettings.width) {
                    left = 0;
                    right = this.diagram.pageSettings.width;
                }
                if (this.diagram.pageSettings.height) {
                    top = 0;
                    bottom = this.diagram.pageSettings.height;
                }
            }
        }
        //884801-After zooming and exporting the HTML content, the scroll Padding value is not considered
        if (this.diagram.scrollSettings.padding) {
            var scrollpadding = this.diagram.scrollSettings.padding;
            left -= scrollpadding.left;
            top -= scrollpadding.top;
            right += (scrollpadding.left + scrollpadding.right);
            bottom += (scrollpadding.top + scrollpadding.bottom);
        }
        var svgBounds = new Rect();
        svgBounds.x = left;
        svgBounds.y = top;
        svgBounds.width = right;
        svgBounds.height = bottom;
        return svgBounds;
    };
    PrintAndExport.prototype.setScaleValueforCanvas = function (options, bounds) {
        var scaleX = 'scaleX';
        var scaleY = 'scaleY';
        var scaleOffsetX = 'scaleOffsetX';
        var scaleOffsetY = 'scaleOffsetY';
        options["" + scaleX] = 1;
        options["" + scaleY] = 1;
        options["" + scaleOffsetX] = 0;
        options["" + scaleOffsetY] = 0;
        options.pageHeight = options.pageHeight || this.diagram.pageSettings.height;
        options.pageWidth = options.pageWidth || this.diagram.pageSettings.width;
        var pageOrientation = options.pageOrientation || this.diagram.pageSettings.orientation;
        if (!pageOrientation) {
            pageOrientation = 'Portrait';
        }
        if (pageOrientation === 'Portrait') {
            if (options.pageWidth > options.pageHeight) {
                var temp = options.pageHeight;
                options.pageHeight = options.pageWidth;
                options.pageWidth = temp;
            }
        }
        else {
            if (options.pageHeight > options.pageWidth) {
                var temp = options.pageWidth;
                options.pageWidth = options.pageHeight;
                options.pageHeight = temp;
            }
        }
        if (options.pageWidth && options.pageHeight && !options.multiplePage) {
            options.stretch = 'Meet';
        }
        var height = options.pageHeight || bounds.height;
        var width = options.pageWidth || bounds.width;
        if (options.stretch === 'Stretch' || options.stretch === 'Meet' || options.stretch === 'Slice') {
            options["" + scaleX] = width / bounds.width;
            options["" + scaleY] = height / bounds.height;
            if (options.stretch === 'Meet') {
                options["" + scaleX] = options["" + scaleY] = Math.min(options["" + scaleX], options["" + scaleY]);
                options["" + scaleOffsetY] = (options.pageHeight - bounds.height * options["" + scaleX]) / 2;
                options["" + scaleOffsetX] = (options.pageWidth - bounds.width * options["" + scaleX]) / 2;
            }
            else if (options.stretch === 'Slice') {
                options["" + scaleX] = options["" + scaleY] = Math.max(options["" + scaleX], options["" + scaleY]);
            }
            bounds.width = width;
            bounds.height = height;
        }
        bounds.x *= options["" + scaleX];
        bounds.y *= options["" + scaleY];
    };
    PrintAndExport.prototype.diagramAsSvg = function (options, margin) {
        var svg = this.diagram.createSvg(this.diagram.element.id + '_diagram_svg', options.bounds.width, options.bounds.height);
        document.body.appendChild(svg);
        var g = createSvgElement('g', { 'id': this.diagram.element.id + '_pageBackground' });
        var region = options && options.region ? options.region : 'Content';
        var bounds = this.getDiagramBounds(region, options);
        var left = bounds.x;
        var top = bounds.y;
        var width = bounds.width;
        var height = bounds.height;
        svg.appendChild(g);
        var attr = {
            'x': String(left),
            'y': String(top), 'width': String(width), 'height': String(height)
        };
        setAttributeSvg(g, attr);
        this.setTransform(g, options.bounds, margin);
        var gradient = document.getElementById(this.diagram.element.id + 'gradient_pattern');
        if (gradient) {
            // 914031: Export function breaks gradient background of nodes in the diagram
            svg.appendChild(gradient.cloneNode(true));
        }
        attr = {
            'x': String(left),
            'y': String(top), 'width': String(width + margin.left + margin.right), 'height': String(height + margin.top + margin.bottom)
        };
        var backimage = document.getElementById(this.diagram.element.id + '_backgroundImageLayer').cloneNode(true);
        setAttributeSvg(backimage, attr);
        svg.appendChild(backimage);
        this.setTransform(backimage, bounds, margin);
        var backRect = document.getElementById(this.diagram.element.id + '_backgroundLayerrect').cloneNode(true);
        setAttributeSvg(backRect, attr);
        svg.appendChild(backRect);
        this.setTransform(backRect, bounds, margin);
        if (this.diagram.mode === 'SVG') {
            var element = void 0;
            var i = void 0;
            var diagramLayerSVG = getDiagramLayerSvg(this.diagram.element.id);
            svg.appendChild(diagramLayerSVG.getElementById(this.diagram.diagramLayer.id).cloneNode(true));
            for (i = 0; i < svg.childNodes.length; i++) {
                element = svg.childNodes[parseInt(i.toString(), 10)];
                if (element.id === this.diagram.element.id + '_diagramLayer') {
                    this.setTransform(element, bounds, margin);
                }
            }
        }
        else {
            g = createSvgElement('g', { 'id': this.diagram.element.id + '_diagramLayer' });
            svg.appendChild(g);
            this.setTransform(g, options.bounds, margin);
            //renderLabels
            var renderer = new DiagramRenderer('', null, true);
            var htmlLayer = getHTMLLayer(this.diagram.element.id);
            this.diagram.renderDiagramElements(svg, renderer, htmlLayer, false);
        }
        document.body.removeChild(svg);
        return svg;
    };
    PrintAndExport.prototype.setTransform = function (element, bounds, margin) {
        element.setAttribute('transform', 'translate(' + (-bounds.x + margin.left) + ', ' +
            (-bounds.y + margin.top) + ')');
    };
    PrintAndExport.prototype.diagramAsCanvas = function (options, customBounds) {
        var scaleX = 'scaleX';
        var scaleY = 'scaleY';
        var scaleOffsetX = 'scaleOffsetX';
        var scaleOffsetY = 'scaleOffsetY';
        var element;
        var elements = [];
        var region = options.bounds;
        var margin = options.margin;
        var mode = options.region;
        var pageBounds = this.getDiagramBounds(mode, options);
        var bgColor = this.diagram.pageSettings.background.color;
        var canvas = CanvasRenderer.createCanvas(this.diagram.element.id + '_diagram', options.bounds.width, options.bounds.height);
        //canvas.setAttribute('style', 'position:absolute;top:135px;left:160px;');
        var context = canvas.getContext('2d');
        context.translate(-region.x, -region.y);
        context.save();
        context.fillStyle = (this.diagram.pageSettings.background.color === 'transparent') ? 'white' :
            this.diagram.pageSettings.background.color;
        region = mode === 'Content' ? pageBounds : region;
        context.fillRect(region.x, region.y, region.width, region.height);
        var bgImg = this.diagram.pageSettings.background;
        if (bgImg && bgImg.source) {
            pageBounds = this.getDiagramBounds(mode, options);
            var image = new Image();
            image.src = bgImg.source;
            var proportionX = pageBounds.width / image.width;
            var proportionY = pageBounds.height / image.height;
            var x = pageBounds.x;
            var y = pageBounds.y;
            var width = pageBounds.width;
            var height = pageBounds.height;
            var exportable = this.isImageExportable(bgImg);
            if (bgImg.scale !== 'None' && bgImg.align !== 'None') {
                var proportion = bgImg.scale === 'Meet' ? Math.min(proportionX, proportionY) : Math.max(proportionX, proportionY);
                width = proportion * image.width;
                height = proportion * image.height;
                if (bgImg.align.indexOf('xmid') > -1) {
                    x += (pageBounds.width - width) / 2;
                }
                else if (bgImg.align.indexOf('xmax') > -1) {
                    x = x + pageBounds.width - width;
                }
                if (bgImg.align.indexOf('ymid') > -1) {
                    y += (pageBounds.height - height) / 2;
                }
                else if (bgImg.align.indexOf('ymax') > -1) {
                    y = y + pageBounds.height - height;
                }
                if (this.diagram.pageSettings.background.color === 'none' || this.diagram.pageSettings.background.color === 'transparent') {
                    context.fillStyle = 'white';
                    context.fillRect(pageBounds.x * options["" + scaleX], pageBounds.y * options["" + scaleY], pageBounds.width * options["" + scaleX], pageBounds.height * options["" + scaleY]);
                }
                if (exportable) {
                    context.drawImage(image, x, y, proportion * image.width, proportion * image.height);
                }
            }
            else if (exportable) {
                context.drawImage(image, x, y, pageBounds.width, pageBounds.height);
            }
        }
        else {
            context.fillStyle = bgColor === 'transparent' ? 'white' : bgColor;
            context.fillRect((pageBounds.x * options["" + scaleX]) - margin.left, (pageBounds.y * options["" + scaleY]) - margin.top, (pageBounds.width * options["" + scaleX]) + margin.left + margin.right, (options["" + scaleY] * pageBounds.height) + margin.top + margin.bottom);
        }
        var brColor = this.diagram.pageSettings.background.color;
        var brWidth = this.diagram.pageSettings.width;
        if (brWidth) {
            context.strokeStyle = brColor === 'none' ? 'transparent' : brColor;
            context.lineWidth = brWidth;
            context.strokeRect(pageBounds.x * options["" + scaleX], pageBounds.y * options["" + scaleY], pageBounds.width * options["" + scaleX], pageBounds.height * options["" + scaleY]);
        }
        context.restore();
        var htmlLayer = getHTMLLayer(this.diagram.element.id);
        var renderer = new DiagramRenderer('', null, false);
        this.updateObjectValue(options["" + scaleX], options["" + scaleOffsetX], options["" + scaleOffsetY], true);
        this.diagram.renderDiagramElements(canvas, renderer, htmlLayer, false, true);
        this.updateObjectValue(options["" + scaleX], options["" + scaleOffsetX], options["" + scaleOffsetY], false);
        return canvas;
    };
    PrintAndExport.prototype.updateWrapper = function (canvas, value, scaleOffsetX, scaleOffsetY, isExport) {
        if (canvas && canvas.length > 0) {
            for (var j = 0; j < canvas.length; j++) {
                if (canvas[parseInt(j.toString(), 10)].children) {
                    this.updateWrapper(canvas[parseInt(j.toString(), 10)].children, value, scaleOffsetX, scaleOffsetY, isExport);
                }
                canvas[parseInt(j.toString(), 10)].exportScaleValue.x = value;
                canvas[parseInt(j.toString(), 10)].exportScaleValue.y = value;
                canvas[parseInt(j.toString(), 10)].exportScaleOffset.x = scaleOffsetX;
                canvas[parseInt(j.toString(), 10)].exportScaleOffset.y = scaleOffsetY;
                canvas[parseInt(j.toString(), 10)].isExport = isExport;
            }
        }
    };
    PrintAndExport.prototype.scaleGradientValue = function (node, scaleValue, isExport) {
        if (node.style.gradient.stops.length > 0) {
            var gradients = node.style.gradient;
            if (node.style.gradient instanceof LinearGradient) {
                gradients.x1 = isExport ? gradients.x1 * scaleValue : gradients.x1 / scaleValue;
                gradients.y1 = isExport ? gradients.y1 * scaleValue : gradients.y1 / scaleValue;
                gradients.x2 = isExport ? gradients.x2 * scaleValue : gradients.x2 / scaleValue;
                gradients.y2 = isExport ? gradients.y2 * scaleValue : gradients.y2 / scaleValue;
            }
            else {
                gradients.fx = isExport ? gradients.fx * scaleValue : gradients.fx / scaleValue;
                gradients.fy = isExport ? gradients.fy * scaleValue : gradients.fy / scaleValue;
                gradients.cx = isExport ? gradients.cx * scaleValue : gradients.cx / scaleValue;
                gradients.cy = isExport ? gradients.cy * scaleValue : gradients.cy / scaleValue;
                gradients.r = isExport ? gradients.r * scaleValue : gradients.r / scaleValue;
            }
        }
    };
    PrintAndExport.prototype.updateObjectValue = function (value, scaleOffsetX, scaleOffsetY, isExport) {
        var wrapper;
        for (var i = 0; i < this.diagram.nodes.length; i++) {
            wrapper = this.diagram.nodes[parseInt(i.toString(), 10)].wrapper;
            this.scaleGradientValue(this.diagram.nodes[parseInt(i.toString(), 10)], value, isExport);
            this.updateWrapper(wrapper.children, value, scaleOffsetX, scaleOffsetY, isExport);
            wrapper.exportScaleValue.x = value;
            wrapper.exportScaleValue.y = value;
            wrapper.exportScaleOffset.x = scaleOffsetX;
            wrapper.exportScaleOffset.y = scaleOffsetY;
            wrapper.isExport = isExport;
        }
        for (var j = 0; j < this.diagram.connectors.length; j++) {
            wrapper = this.diagram.connectors[parseInt(j.toString(), 10)].wrapper;
            for (var k = 0; k < wrapper.children.length; k++) {
                wrapper.children[parseInt(k.toString(), 10)].isExport = isExport;
                if (isExport) {
                    wrapper.children[parseInt(k.toString(), 10)].exportScaleValue.x = value;
                    wrapper.children[parseInt(k.toString(), 10)].exportScaleValue.y = value;
                    wrapper.children[parseInt(k.toString(), 10)].exportScaleOffset.x = scaleOffsetX;
                    wrapper.children[parseInt(k.toString(), 10)].exportScaleOffset.y = scaleOffsetY;
                }
            }
        }
    };
    PrintAndExport.prototype.isImageExportable = function (backgroundImage) {
        var state = true;
        var content;
        var canvas;
        if (backgroundImage.source) {
            try {
                canvas = CanvasRenderer.createCanvas(this.diagram.element.id + 'temp_canvas', 100, 100);
                var ctx = canvas.getContext('2d');
                ctx.save();
                var image = new Image();
                image.src = backgroundImage.source;
                ctx.drawImage(image, 0, 0, 100, 100);
                ctx.restore();
                content = canvas.toDataURL();
            }
            catch (e) {
                state = false;
            }
        }
        return state;
    };
    PrintAndExport.prototype.getPrintCanvasStyle = function (img, options) {
        var width = 0;
        var height = 0;
        var size = new Size();
        width = img.width;
        height = img.height;
        if (options.pageHeight || options.pageWidth) {
            height = options.pageHeight ? options.pageHeight : height;
            width = options.pageWidth ? options.pageWidth : width;
        }
        if (options.pageOrientation) {
            if ((options.pageOrientation === 'Landscape' && height > width) || options.pageOrientation === 'Portrait' && width > height) {
                var temp = width;
                width = height;
                height = temp;
            }
        }
        size.height = height;
        size.width = width;
        return size;
    };
    PrintAndExport.prototype.getMultipleImage = function (img, options, isExport) {
        var imageArray = [];
        var div = createHtmlElement('div', {});
        var pageSize = this.getPrintCanvasStyle(img, options);
        //let pageWidth: number;
        //let pageHeight: number;
        var margin = options.margin;
        var mLeft = margin.left;
        var mTop = margin.top;
        var mRight = margin.right;
        var mBottom = margin.bottom;
        var x = 0;
        var y = 0;
        var pageWidth = pageSize.width + x;
        var pageHeight = pageSize.height + y;
        var drawnX = 0;
        var drawnY = 0;
        if (options && options.multiplePage) {
            div.style.height = 'auto';
            div.style.width = 'auto';
            var imgHeight = img.height;
            var imgWidth = img.width;
            //if (img) {
            var i = 0;
            var j = 0;
            var url = void 0;
            var clipWidth = 0;
            var clipHeight = 0;
            var ctx = void 0;
            var canvas = void 0;
            do {
                do {
                    clipWidth = pageSize.width;
                    clipHeight = pageSize.height;
                    if ((drawnX + pageSize.width) >= imgWidth) {
                        clipWidth = (imgWidth - drawnX);
                    }
                    if ((drawnY + pageSize.height) >= imgHeight) {
                        clipHeight = (imgHeight - drawnY);
                    }
                    canvas = CanvasRenderer.createCanvas(this.diagram.element.id + '_multiplePrint', pageSize.width, pageSize.height);
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(img, x + drawnX + mLeft, y + drawnY + mTop, clipWidth - mRight - mLeft, clipHeight - mBottom - mTop, 0 + mLeft, 0 + mTop, clipWidth - mRight - mLeft, clipHeight - mBottom - mTop);
                    if ((drawnX + pageSize.width) >= imgWidth) {
                        drawnX -= (drawnX - imgWidth);
                    }
                    url = canvas.toDataURL();
                    ctx.restore();
                    drawnX += pageWidth;
                    if (isExport) {
                        imageArray.push(url);
                    }
                    else {
                        this.printImage(div, url, i + '' + j, pageWidth + 'px;', pageHeight + 'px;');
                    }
                    i++;
                } while (drawnX < imgWidth);
                j++;
                i = x = drawnX = 0;
                if ((drawnY + pageSize.height) >= imgHeight) {
                    drawnY -= (drawnY - imgHeight);
                }
                drawnY += pageHeight;
            } while (drawnY < imgHeight);
            //}
        }
        else {
            var x_1 = 0;
            var y_1 = 0;
            var pageSize_1 = this.getPrintCanvasStyle(img, options);
            ///let pageWidth: number; let pageHeight: number;
            var pageWidth_1 = pageSize_1.width;
            var pageHeight_1 = pageSize_1.height;
            //let ctx: CanvasRenderingContext2D;
            //let canvas: HTMLCanvasElement;
            //let url: string;
            var canvas = CanvasRenderer.createCanvas(this.diagram.element.id + '_diagram', pageWidth_1, pageHeight_1);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, x_1 + mLeft, y_1 + mTop, img.width - (mRight + mLeft), img.height - (mTop + mBottom), 0 + mLeft, 0 + mTop, pageWidth_1 - (mRight + mLeft), pageHeight_1 - (mTop + mBottom));
            var url = canvas.toDataURL();
            ctx.restore();
            if (isExport) {
                imageArray.push(url);
            }
            else {
                this.printImage(div, url, 0);
            }
        }
        if (isExport) {
            return imageArray;
        }
        else {
            return div;
        }
    };
    PrintAndExport.prototype.printImage = function (div, url, i, pageWidth, pageHeight) {
        var attr = { 'class': 'e-diagram-print-page', 'style': 'width:' + pageWidth + 'height:' + pageHeight };
        var img = createHtmlElement('img', attr);
        var innerDiv = createHtmlElement('div', attr);
        attr = { 'id': this.diagram.element.id + '_multiplePrint_img' + i, 'style': 'float:left', 'src': url };
        setAttributeHtml(img, attr);
        innerDiv.appendChild(img);
        div.appendChild(innerDiv);
    };
    /**
     * To print the image
     *
     * @private
     */
    PrintAndExport.prototype.print = function (options) {
        options.mode = 'Data';
        var url = this.exportDiagram(options);
        this.printImages(url, options);
    };
    PrintAndExport.prototype.printImages = function (url, options) {
        var _this = this;
        var attr = {
            'id': this.diagram.element.id + '_printImage',
            'src': url
        };
        options.margin = { top: 0, bottom: 0, right: 0, left: 0 };
        var img = createHtmlElement('img', attr);
        img.onload = function () {
            var div = _this.getMultipleImage(img, options);
            // specify window parameters
            var printWind = window.open('');
            _this.printWindow = printWind;
            if (printWind != null) {
                if ((div instanceof HTMLElement)) {
                    printWind.document.write('<html><head><style> body{margin:0px;}  @media print { .e-diagram-print-page' +
                        '{page-break-after: left; }.e-diagram-print-page:last-child {page-break-after: avoid;}}' +
                        '</style><title></title></head>');
                    //833683-Need to close print window after closing the parent window
                    window.addEventListener('beforeunload', _this.closePrintWindow);
                    printWind.addEventListener('load', function () {
                        setTimeout(function () {
                            printWind.window.print();
                            //To close new window once print window is closed
                            printWind.close();
                        }, 3000);
                    });
                    printWind.document.write('<center>' + div.innerHTML + '</center>');
                    printWind.document.close();
                }
            }
        };
    };
    PrintAndExport.prototype.getContent = function (styleSheets) {
        var snapConstraints = this.diagram.snapSettings.constraints;
        this.diagram.snapSettings.constraints = (this.diagram.snapSettings.constraints & ~SnapConstraints.ShowLines);
        this.diagram.dataBind();
        this.diagram.clearSelection();
        styleSheets = styleSheets || document.styleSheets;
        var styleSheetRef = '';
        for (var i = 0; i < styleSheets.length; i++) {
            if (styleSheets[parseInt(i.toString(), 10)].href || typeof styleSheets[parseInt(i.toString(), 10)] === 'string') {
                styleSheetRef += '<link href=\'' + (styleSheets[parseInt(i.toString(), 10)].href || styleSheets[parseInt(i.toString(), 10)]) + '\' rel=\'stylesheet\' />';
            }
        }
        var htmlData = document.getElementById(this.diagram.element.id + 'content').innerHTML;
        var marginStyle = 'margin-left:' + 0 + 'px;margin-top:' + 0 + 'px;margin-right:'
            + 0 + 'px;margin-bottom:' + 0 + 'px;';
        htmlData = styleSheetRef + '<body style="margin: 0px; padding: 0px"><div style=\'' +
            marginStyle + '\'>' + htmlData + '</div></body>';
        htmlData = htmlData.replace(/ transform: t/g, ' -webkit-transform: t');
        this.diagram.snapSettings.constraints = snapConstraints;
        this.diagram.dataBind();
        return htmlData;
    };
    /** @private */
    PrintAndExport.prototype.getDiagramContent = function (styleSheets) {
        if (this.diagram.scroller.currentZoom === 1) {
            var htmlData = this.getContent(styleSheets);
            /* tslint:disable */
            // eslint-disable-next-line quotes
            return checkBrowserInfo() ? htmlData.replace("url(" + location.protocol + '//' + location.host + location.pathname + "#diagram_pattern ", "url(#diagram_pattern)") : htmlData;
            /* tslint:enable */
        }
        else {
            var container = document.getElementById(this.diagram.element.id + 'content');
            var scrollerX = container.scrollLeft;
            var scrollerY = container.scrollTop;
            var oldZoom = this.diagram.scrollSettings.currentZoom;
            var oldHorizontalOffset = this.diagram.scroller.horizontalOffset;
            var oldVerticalOffset = this.diagram.scroller.verticalOffset;
            var oldWidth = Number(String(this.diagram.width).split('%')[0]) ?
                container.clientWidth : Number(String(this.diagram.width).split('px')[0]);
            var oldHeight = Number(String(this.diagram.height).split('%')[0]) ?
                container.clientHeight : Number(String(this.diagram.height).split('px')[0]);
            var bounds = this.getDiagramBounds('', {});
            this.diagram.scroller.zoom((1 / oldZoom));
            var scrollX_1 = 0;
            var scrollY_1 = 0;
            scrollX_1 = bounds.x;
            scrollY_1 = bounds.y;
            this.diagram.scroller.transform = {
                tx: -scrollX_1,
                ty: -scrollY_1,
                scale: this.diagram.scroller.currentZoom
            };
            this.diagram.scroller.horizontalOffset = -scrollX_1;
            this.diagram.scroller.verticalOffset = -scrollY_1;
            this.diagram.scroller.setSize();
            this.diagram.setSize(bounds.width, bounds.height);
            var htmlData = this.getContent(styleSheets);
            this.diagram.setSize(oldWidth, oldHeight);
            this.diagram.scroller.zoom(oldZoom / this.diagram.scrollSettings.currentZoom);
            this.diagram.dataBind();
            if (scrollerX || scrollerY) {
                this.diagram.setOffset(scrollerX, scrollerY);
            }
            else {
                this.diagram.scroller.transform = {
                    tx: (oldHorizontalOffset) / this.diagram.scroller.currentZoom,
                    ty: (oldVerticalOffset) / this.diagram.scroller.currentZoom,
                    scale: this.diagram.scroller.currentZoom
                };
                this.diagram.scroller.horizontalOffset = oldHorizontalOffset;
                this.diagram.scroller.verticalOffset = oldVerticalOffset;
            }
            this.diagram.renderSelector(false);
            /* tslint:disable */
            // eslint-disable-next-line quotes
            return checkBrowserInfo() ? htmlData.replace("url(" + location.protocol + '//' + location.host + location.pathname + "#diagram_pattern ", "url(#diagram_pattern)") : htmlData;
            /* tslint:enable */
        }
    };
    /** @private */
    PrintAndExport.prototype.exportImages = function (image, options) {
        var _this = this;
        var region = options && options.region ? options.region : 'Content';
        var margin = options.margin || {};
        margin = {
            top: !isNaN(margin.top) ? margin.top : 0,
            bottom: !isNaN(margin.bottom) ? margin.bottom : 0,
            left: !isNaN(margin.left) ? margin.left : 0,
            right: !isNaN(margin.right) ? margin.right : 0
        };
        var bounds = this.getDiagramBounds(region, {});
        if (options.bounds) {
            bounds.x = (!isNaN(options.bounds.x) ? options.bounds.x : bounds.x);
            bounds.y = (!isNaN(options.bounds.y) ? options.bounds.y : bounds.y);
            bounds.width = (options.bounds.width || bounds.width);
            bounds.height = (options.bounds.height || bounds.height);
        }
        var img = document.createElement('img');
        var attr = {
            'src': image
        };
        setAttributeHtml(img, attr);
        var context = this;
        img.onload = function () {
            var canvas = CanvasRenderer.createCanvas(context.diagram.element.id + 'innerImage', bounds.width + (margin.left + margin.right), bounds.height + (margin.top + margin.bottom));
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = context.diagram.pageSettings.background.color;
            ctx.fillRect(0, 0, bounds.width + (margin.left + margin.right), bounds.height + (margin.top + margin.bottom));
            ctx.drawImage(img, 0, 0, bounds.width, bounds.height, margin.left, margin.top, bounds.width, bounds.height);
            //898304 - exportImage function export images only in "png" format
            if (image && options.format === 'JPG') {
                image = canvas.toDataURL('image/jpeg');
            }
            else {
                image = canvas.toDataURL();
            }
            if (options.printOptions) {
                context.printImages(image, options);
                return;
            }
            ctx.restore();
            var fileName = options.fileName || 'diagram';
            _this.canvasMultiplePage(options, canvas, margin, image, fileName);
        };
        //898304 - exportImage function export images only in "png" format
        if (options.format === 'SVG') {
            this.exportDiagram(options);
        }
    };
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    PrintAndExport.prototype.destroy = function () {
        /**
         * Destroys the Print and Export module
         */
        //833683 - unwire beforeunload event on destroy
        window.removeEventListener('beforeunload', this.closePrintWindow);
        this.printWindow = undefined;
    };
    /**
     * Get module name.
     */
    PrintAndExport.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'PrintandExport';
    };
    return PrintAndExport;
}());
export { PrintAndExport };
