import { createElement, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { removeElement } from '../utils/helper';
import { afterExport } from '../model/constants';
import { PdfPageOrientation, PdfDocument, PdfBitmap, SizeF, PdfStandardFont, PdfPageTemplateElement, PdfSolidBrush, PdfColor } from '@syncfusion/ej2-pdf-export';
/** @private */
var ExportUtils = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     *
     * @param control
     */
    function ExportUtils(control) {
        this.control = control;
    }
    /**
     * To export the file as image/svg format.
     *
     * @param type
     * @param fileName
     */
    ExportUtils.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
        var _this = this;
        var controlValue = this.getControlsValue(controls, isVertical, (exportToMultiplePage && type === 'PDF'), type);
        var canvasElements = [];
        var controlWidth = [];
        var controlHeight = [];
        var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
        orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
        var _loop_1 = function (i) {
            controlWidth.push(width ? width : controlValue[i].width);
            controlHeight.push(height ? height : controlValue[i].height);
            var element = controls[i].svgObject;
            var isCanvas = controls[i].enableCanvas;
            var image = void 0;
            if (!isCanvas) {
                element = createElement('canvas', {
                    id: 'ej2-canvas',
                    attrs: {
                        'width': controlWidth[i].toString(),
                        'height': controlHeight[i].toString()
                    }
                });
            }
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                controlValue[i].svg.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(controlValue[i].svg)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (Browser.info.name === 'msie') {
                    var svg = new Blob([(new XMLSerializer()).serializeToString(controlValue[i].svg)], { type: 'application/octet-stream' });
                    window.navigator.msSaveOrOpenBlob(svg, fileName + '.' + type.toLocaleLowerCase());
                }
                else {
                    this_1.triggerDownload(fileName, type, url, isDownload);
                }
            }
            else if (Browser.info.name === 'msie') {
                var canvas = element;
                if (!isCanvas) {
                    canvas = this_1.createCanvas();
                }
                image = canvas.toDataURL();
                canvasElements.push(element);
                if (type === 'PDF') {
                    if (canvasElements.length === controlValue.length) {
                        this_1.exportPdf(canvasElements, orientation, controlWidth, controlHeight, isDownload, fileName, header, footer);
                    }
                }
                else {
                    this_1.doexport(type, image, fileName);
                }
            }
            else {
                var image_1 = new Image();
                var ctx_1 = element.getContext('2d');
                image_1.onload = (function () {
                    ctx_1.drawImage(image_1, 0, 0);
                    window.URL.revokeObjectURL(url);
                    canvasElements.push(element);
                    if (type === 'PDF') {
                        if (canvasElements.length === controlValue.length) {
                            _this.exportPdf(canvasElements, orientation, controlWidth, controlHeight, isDownload, fileName, header, footer);
                        }
                    }
                    else {
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(element.toBlob(null), fileName + '.' + type.toLocaleLowerCase());
                        }
                        else {
                            _this.triggerDownload(fileName, type, element.toDataURL('image/' + type.toLowerCase()), isDownload);
                        }
                    }
                });
                image_1.src = url;
            }
            if (!isCanvas) {
                removeElement(document.getElementById(controls[i].element.id + '_canvas'));
            }
        };
        var this_1 = this;
        for (var i = 0; i < controlValue.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * To get data url for charts.
     *
     * @param chart
     */
    ExportUtils.prototype.getDataUrl = function (chart) {
        var controlValue = this.getControlsValue([chart]);
        var element = this.control.svgObject;
        var isCanvas = this.control.enableCanvas;
        if (!isCanvas) {
            element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': controlValue[0].width.toString(),
                    'height': controlValue[0].height.toString()
                }
            });
        }
        var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(controlValue[0].svg)], { type: 'image/svg+xml' }));
        if (Browser.info.name === 'msie') {
            var canvas = element;
            if (!isCanvas) {
                canvas = this.createCanvas();
            }
            var argsData = {
                name: afterExport, cancel: false, dataUrl: element.toDataURL('image/png')
            };
            chart.trigger(afterExport, argsData);
            return { element: canvas, dataUrl: canvas.toDataURL() };
        }
        else {
            var image_2 = new Image();
            var ctx_2 = element.getContext('2d');
            image_2.onload = (function () {
                ctx_2.drawImage(image_2, 0, 0);
                window.URL.revokeObjectURL(url);
                var argsData = {
                    name: afterExport, cancel: false, dataUrl: element.toDataURL('image/png')
                };
                chart.trigger(afterExport, argsData);
                return argsData.dataUrl;
            });
            image_2.src = url;
            return { element: element, blobUrl: url };
        }
    };
    /**
     * To trigger the download element.
     *
     * @param fileName
     * @param type
     * @param url
     */
    ExportUtils.prototype.triggerDownload = function (fileName, type, url, isDownload) {
        createElement('a', {
            attrs: {
                'download': fileName + '.' + type.toLocaleLowerCase(),
                'href': url
            }
        }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
            view: window,
            bubbles: false,
            cancelable: true
        }));
    };
    /**
     * To get the maximum size value.
     *
     * @param {(Chart | RangeNavigator | AccumulationChart | StockChart | BulletChart | Chart3D | CircularChart3D)[]} controls - The array of controls to retrieve the maximum size value.
     * @param {boolean} isVertical - Indicates whether the orientation is vertical.
     * @param {boolean} isMultiPages - Indicates whether multiple pages are used.
     * @param {ExportType} type - The type of export.
     * @returns {IControlValue[]} - An array of control values.
     */
    ExportUtils.prototype.getControlsValue = function (controls, isVertical, isMultiPages, type) {
        var width = 0;
        var height = 0;
        var svgObject = new SvgRenderer('').createSvg({
            id: 'Svg_Export_Element',
            width: 200, height: 200
        });
        var controlValues = [];
        var backgroundColor;
        for (var i = 0; i < controls.length; i++) {
            var control = controls[i];
            if (control.enableRtl) {
                svgObject.setAttribute('direction', 'rtl');
            }
            var isCanvas = control.enableCanvas;
            var svg = control.svgObject.cloneNode(true);
            var groupEle = control.renderer.createGroup({
                style: (isNullOrUndefined(isVertical) || isVertical) ? 'transform: translateY(' + height + 'px)' :
                    'transform: translateX(' + width + 'px)'
            });
            backgroundColor = svg.childNodes[0] ? svg.childNodes[0].getAttribute('fill') : 'transparent';
            if (backgroundColor === 'transparent') {
                if (control.theme.indexOf('Dark') > -1 || control.theme.indexOf('HighContrast') > -1) {
                    backgroundColor = 'rgba(0, 0, 0, 1)';
                }
                else {
                    backgroundColor = 'rgba(255, 255, 255, 1)';
                }
            }
            if (!isCanvas) {
                if (control.getModuleName() === 'stockChart') {
                    svg.childNodes[0].firstChild.setAttribute('fill', backgroundColor);
                    for (var index = 1; index < svg.childNodes.length; index++) {
                        svg.childNodes[index].childNodes[0].setAttribute('fill', backgroundColor);
                    }
                }
                else if (type === 'SVG') {
                    svg.childNodes[0].setAttribute('fill', backgroundColor);
                }
                groupEle.appendChild(svg);
            }
            var top_1 = 0;
            var left = 0;
            if (control.stockLegendModule && control.legendSettings.visible) {
                if (control.legendSettings.position === 'Bottom' || control.legendSettings.position === 'Top'
                    || control.legendSettings.position === 'Auto') {
                    top_1 += control.stockLegendModule.legendBounds.height;
                }
                else if (control.legendSettings.position === 'Left' || control.legendSettings.position === 'Right') {
                    left += control.stockLegendModule.legendBounds.width;
                }
            }
            width = (isNullOrUndefined(isVertical) || isVertical) ? Math.max(control.availableSize.width + left, width) :
                width + control.availableSize.width + left;
            height = (isNullOrUndefined(isVertical) || isVertical) ? height + control.availableSize.height + top_1 :
                Math.max(control.availableSize.height + top_1, height);
            if (!isCanvas) {
                svgObject.appendChild(groupEle);
            }
            if (isMultiPages || i === controls.length - 1) {
                if ((!isMultiPages && !(this.control.enableCanvas)) || (isMultiPages && !isCanvas)) {
                    svgObject.setAttribute('width', width + '');
                    svgObject.setAttribute('height', height + '');
                    svgObject.style.backgroundColor = backgroundColor;
                }
                controlValues.push({
                    'width': width,
                    'height': height,
                    'svg': svgObject
                });
            }
            if (isMultiPages && (i < controls.length)) {
                width = 0;
                height = 0;
                svgObject = new SvgRenderer('').createSvg({
                    id: 'Svg_Export_Element',
                    width: 200, height: 200
                });
            }
        }
        return controlValues;
    };
    ExportUtils.prototype.createCanvas = function () {
        var chart = this.control;
        this.canvasRender(true, chart);
        var canvas = chart.svgObject;
        this.canvasRender(false, chart);
        return canvas;
    };
    /**
     * To convert svg chart into canvas chart to fix export issue in IE
     * We cant export svg to other formats in IE
     *
     * @param enableCanvas
     * @param chart
     * @param enableCanvas
     * @param chart
     */
    ExportUtils.prototype.canvasRender = function (enableCanvas, chart) {
        chart.enableCanvas = enableCanvas;
        chart['preRender']();
        chart['render']();
    };
    ExportUtils.prototype.exportPdf = function (element, orientation, width, height, isDownload, fileName, header, footer) {
        var document = new PdfDocument();
        var margin = document.pageSettings.margins;
        var pdfDefaultWidth = document.pageSettings.width;
        var pdfDefaultHeight = document.pageSettings.height;
        for (var i = 0; element.length > i; i++) {
            var imageString = element[i].toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
            document.pageSettings.orientation = orientation;
            var exactWidth = (pdfDefaultWidth < width[i]) ? (width[i] + margin.left + margin.right) :
                pdfDefaultWidth;
            var exactHeight = (orientation === 0 && pdfDefaultHeight > height[i]) ?
                (width[i] + margin.left + margin.right) : (pdfDefaultHeight < height[i]) ?
                (height[i] + margin.top + margin.bottom) : pdfDefaultHeight;
            if (header !== undefined) {
                var font = new PdfStandardFont(1, header.fontSize || 15);
                var pdfHeader = new PdfPageTemplateElement(exactWidth, 30);
                pdfHeader.graphics.drawString(header.content + '', font, null, new PdfSolidBrush(new PdfColor(0, 0, 0)), header.x, header.y, null);
                document.template.top = pdfHeader;
            }
            if (footer !== undefined) {
                var font = new PdfStandardFont(1, footer.fontSize || 15);
                var pdfFooter = new PdfPageTemplateElement(exactWidth, 30);
                pdfFooter.graphics.drawString(footer.content + '', font, null, new PdfSolidBrush(new PdfColor(0, 0, 0)), footer.x, footer.y, null);
                document.template.bottom = pdfFooter;
            }
            document.pageSettings.size = new SizeF(exactWidth, exactHeight);
            imageString = imageString.slice(imageString.indexOf(',') + 1);
            document.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, width[i], height[i]);
        }
        if (isDownload) {
            document.save(fileName + '.pdf');
            document.destroy();
        }
    };
    ExportUtils.prototype.doexport = function (type, image, fileName) {
        var images = [];
        var fileType = type || 'JPG';
        images = [image];
        this.exportImage(images, fileName, fileType, image);
    };
    /**
     * Exports the given images as a file with the specified name and type.
     *
     * @param {string[] | HTMLElement} images - The images to be exported. Can be an array of image URLs or an HTML element containing the image.
     * @param {string} fileName - The name of the exported file.
     * @param {string} fileType - The type of the exported file (e.g., 'png', 'jpeg').
     * @param {string} image - The image data to be used for export.
     * @returns {void}
     * @private
     */
    ExportUtils.prototype.exportImage = function (images, fileName, fileType, image) {
        var buffers = [];
        var length = (!(images instanceof HTMLElement)) ? images.length : 0;
        for (var g = 0; g < length; g++) {
            image = images[g];
            image = image.replace(/^data:[a-z]*;,/, '');
            var image1 = image.split(',');
            var byteString = atob(image1[1]);
            var buffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(buffer);
            for (var i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            buffers.push(buffer);
        }
        for (var j = 0; j < buffers.length; j++) {
            var b = new Blob([buffers[j]], { type: 'application/octet-stream' });
            if (Browser.info.name === 'msie') {
                window.navigator.msSaveOrOpenBlob(b, fileName + '.' + fileType.toLocaleLowerCase());
            }
        }
    };
    return ExportUtils;
}());
export { ExportUtils };
