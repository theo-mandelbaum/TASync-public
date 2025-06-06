import { isNullOrUndefined, createElement, remove, merge, ChildProperty, Property, Component, resetBlazorTemplate, extend, Browser, isBlazor, updateBlazorTemplate, animationMode, Animation, compile, Complex, Event, NotifyPropertyChanges } from '@syncfusion/ej2-base';

/* eslint-disable jsdoc/require-returns */
class SvgRenderer {
    /* End-Properties */
    constructor(rootID) {
        //Internal Variables
        this.svgLink = 'http://www.w3.org/2000/svg';
        this.rootId = rootID;
    }
    // method to get the attributes value
    // tslint:disable-next-line:no-any
    getOptionValue(options, key) {
        return options[key];
    } /* tslint:enable */
    /**
     * To create a Html5 SVG element
     *
     * @param {SVGAttributes} options - Options to create SVG
     * @returns {Element} It returns a appropriate element
     */
    createSvg(options) {
        if (isNullOrUndefined(options.id)) {
            options.id = this.rootId + '_svg';
        }
        this.svgObj = document.getElementById(options.id);
        if (isNullOrUndefined(document.getElementById(options.id))) {
            this.svgObj = document.createElementNS(this.svgLink, 'svg');
        }
        this.svgObj = this.setElementAttributes(options, this.svgObj);
        this.setSVGSize(options.width, options.height);
        return this.svgObj;
    }
    // method to set the height and width for the SVG element
    setSVGSize(width, height) {
        const element = document.getElementById(this.rootId);
        const size = !isNullOrUndefined(element) ? element.getBoundingClientRect() : null;
        if (isNullOrUndefined(this.width) || this.width <= 0) {
            this.svgObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.svgObj.setAttribute('width', this.width.toString());
        }
        if (isNullOrUndefined(this.height) || this.height <= 0) {
            this.svgObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.svgObj.setAttribute('height', this.height.toString());
        }
    }
    /**
     * To draw a path
     *
     * @param {PathAttributes} options - Options to draw a path in SVG
     * @returns {Element} It returns a appropriate path
     */
    drawPath(options) {
        let path = document.getElementById(options.id);
        if (path === null) {
            path = document.createElementNS(this.svgLink, 'path');
        }
        path = this.setElementAttributes(options, path);
        return path;
    }
    /**
     * To draw a line
     *
     * @param {LineAttributes} options - Options to draw a line in SVG
     * @returns {Element} It returns a appropriate element
     */
    drawLine(options) {
        let line = document.getElementById(options.id);
        if (line === null) {
            line = document.createElementNS(this.svgLink, 'line');
        }
        line = this.setElementAttributes(options, line);
        return line;
    }
    /**
     * To draw a rectangle
     *
     * @param {BaseAttibutes} options - Required options to draw a rectangle in SVG
     * @returns {Element} It returns a appropriate element
     */
    drawRectangle(options) {
        let rectangle = document.getElementById(options.id);
        if (rectangle === null) {
            rectangle = document.createElementNS(this.svgLink, 'rect');
        }
        rectangle = this.setElementAttributes(options, rectangle);
        return rectangle;
    }
    /**
     * To draw a circle
     *
     * @param {CircleAttributes} options - Required options to draw a circle in SVG
     * @returns {Element} It returns a appropriate element
     */
    drawCircle(options) {
        let circle = document.getElementById(options.id);
        if (circle === null) {
            circle = document.createElementNS(this.svgLink, 'circle');
        }
        circle = this.setElementAttributes(options, circle);
        return circle;
    }
    /**
     * To draw a polyline
     *
     * @param {PolylineAttributes} options - Options required to draw a polyline
     * @returns {Element} It returns a appropriate element
     */
    drawPolyline(options) {
        let polyline = document.getElementById(options.id);
        if (polyline === null) {
            polyline = document.createElementNS(this.svgLink, 'polyline');
        }
        polyline = this.setElementAttributes(options, polyline);
        return polyline;
    }
    /**
     * To draw an ellipse
     *
     * @param {EllipseAttributes} options - Options required to draw an ellipse
     * @returns {Element} It returns a appropriate element
     */
    drawEllipse(options) {
        let ellipse = document.getElementById(options.id);
        if (ellipse === null) {
            ellipse = document.createElementNS(this.svgLink, 'ellipse');
        }
        ellipse = this.setElementAttributes(options, ellipse);
        return ellipse;
    }
    /**
     * To draw a polygon
     *
     * @param {PolylineAttributes} options - Options needed to draw a polygon in SVG
     * @returns {Element} It returns a appropriate element
     */
    drawPolygon(options) {
        let polygon = document.getElementById(options.id);
        if (polygon === null) {
            polygon = document.createElementNS(this.svgLink, 'polygon');
        }
        polygon = this.setElementAttributes(options, polygon);
        return polygon;
    }
    /**
     * To draw an image
     *
     * @param {ImageAttributes} options - Required options to draw an image in SVG
     * @returns {Element} It returns a appropriate element
     */
    drawImage(options) {
        const img = document.createElementNS(this.svgLink, 'image');
        img.setAttributeNS(null, 'height', options.height.toString());
        img.setAttributeNS(null, 'width', options.width.toString());
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
        img.setAttributeNS(null, 'x', options.x.toString());
        img.setAttributeNS(null, 'y', options.y.toString());
        img.setAttributeNS(null, 'id', options.id);
        img.setAttributeNS(null, 'visibility', options.visibility);
        if (!isNullOrUndefined(this.getOptionValue(options, 'clip-path'))) {
            img.setAttributeNS(null, 'clip-path', this.getOptionValue(options, 'clip-path'));
        }
        if (!isNullOrUndefined(options.preserveAspectRatio)) {
            img.setAttributeNS(null, 'preserveAspectRatio', options.preserveAspectRatio);
        }
        return img;
    }
    /**
     * To draw a text
     *
     * @param {TextAttributes} options - Options needed to draw a text in SVG
     * @param {string} label - Label of the text
     * @returns {Element} It returns a appropriate element
     */
    createText(options, label) {
        let text = document.createElementNS(this.svgLink, 'text');
        text = this.setElementAttributes(options, text);
        if (!isNullOrUndefined(label)) {
            text.textContent = label;
        }
        return text;
    }
    /**
     * To create a tSpan
     *
     * @param {TextAttributes} options - Options to create tSpan
     * @param {string} label - The text content which is to be rendered in the tSpan
     * @returns {Element} It returns a appropriate element
     */
    createTSpan(options, label) {
        let tSpan = document.createElementNS(this.svgLink, 'tspan');
        tSpan = this.setElementAttributes(options, tSpan);
        if (!isNullOrUndefined(label)) {
            tSpan.textContent = label;
        }
        return tSpan;
    }
    /**
     * To create a title
     *
     * @param {string} text - The text content which is to be rendered in the title
     * @returns {Element} It returns a appropriate element
     */
    createTitle(text) {
        const title = document.createElementNS(this.svgLink, 'title');
        title.textContent = text;
        return title;
    }
    /**
     * To create defs element in SVG
     *
     * @returns {Element} It returns a appropriate element
     */
    createDefs() {
        const defs = document.createElementNS(this.svgLink, 'defs');
        return defs;
    }
    /**
     * To create clip path in SVG
     *
     * @param {BaseAttibutes} options - Options needed to create clip path
     * @returns {Element} It returns a appropriate element
     */
    createClipPath(options) {
        let clipPath = document.createElementNS(this.svgLink, 'clipPath');
        clipPath = this.setElementAttributes(options, clipPath);
        return clipPath;
    }
    /**
     * To create foreign object in SVG
     *
     * @param {BaseAttibutes} options - Options needed to create foreign object
     * @returns {Element} It returns a appropriate element
     */
    createForeignObject(options) {
        let foreignObject = document.createElementNS(this.svgLink, 'foreignObject');
        foreignObject = this.setElementAttributes(options, foreignObject);
        return foreignObject;
    }
    /**
     * To create group element in SVG
     *
     * @param {BaseAttibutes} options - Options needed to create group
     * @returns {Element} It returns a appropriate element
     */
    createGroup(options) {
        let group = document.createElementNS(this.svgLink, 'g');
        group = this.setElementAttributes(options, group);
        return group;
    }
    /**
     * To create pattern in SVG
     *
     * @param {PatternAttributes} options - Required options to create pattern in SVG
     * @param {string} element - Specifies the name of the pattern
     * @returns {Element} It returns a appropriate element
     */
    createPattern(options, element) {
        let pattern = document.createElementNS(this.svgLink, element);
        pattern = this.setElementAttributes(options, pattern);
        return pattern;
    }
    /**
     * To create radial gradient in SVG
     *
     * @param {string[]} colors - Specifies the colors required to create radial gradient
     * @param {string} name - Specifies the name of the gradient
     * @param {RadialGradient} options - value for radial gradient
     * @returns {string} It returns color name
     */
    createRadialGradient(colors, name, options) {
        let colorName;
        if (!isNullOrUndefined(colors[0].colorStop)) {
            const newOptions = {
                'id': this.rootId + '_' + name + 'radialGradient',
                'cx': options.cx + '%',
                'cy': options.cy + '%',
                'r': options.r + '%',
                'fx': options.fx + '%',
                'fy': options.fy + '%'
            };
            this.drawGradient('radialGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'radialGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    }
    /**
     * To create linear gradient in SVG
     *
     * @param {GradientColor[]} colors - Array of string specifies the values for color
     * @param {string} name - Specifies the name of the gradient
     * @param {LinearGradient} options - Specifies the options for gradient
     * @returns {string} It returns color name
     */
    createLinearGradient(colors, name, options) {
        let colorName;
        if (!isNullOrUndefined(colors[0].colorStop)) {
            const newOptions = {
                'id': this.rootId + '_' + name + 'linearGradient',
                'x1': options.x1 + '%',
                'y1': options.y1 + '%',
                'x2': options.x2 + '%',
                'y2': options.y2 + '%'
            };
            this.drawGradient('linearGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'linearGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    }
    /**
     * To render the gradient element in SVG
     *
     * @param {string} gradientType - Specifies the type of the gradient
     * @param {RadialGradient | LinearGradient} options - Options required to render a gradient
     * @param {string[]} colors - Array of string specifies the values for color
     * @returns {Element} It returns a appropriate element
     */
    drawGradient(gradientType, options, colors) {
        const defs = this.createDefs();
        let gradient = document.createElementNS(this.svgLink, gradientType);
        gradient = this.setElementAttributes(options, gradient);
        for (let i = 0; i < colors.length; i++) {
            const stop = document.createElementNS(this.svgLink, 'stop');
            stop.setAttribute('offset', colors[i].colorStop);
            stop.setAttribute('stop-color', colors[i].color);
            stop.setAttribute('stop-opacity', colors[i].opacity ? (colors[i].opacity) : '1');
            if (!isNullOrUndefined(colors[i].style)) {
                stop.style.cssText = colors[i].style;
            }
            gradient.appendChild(stop);
        }
        defs.appendChild(gradient);
        return defs;
    }
    /**
     * To render a clip path
     *
     * @param {BaseAttibutes} options - Options required to render a clip path
     * @returns {Element} It returns a appropriate element
     */
    drawClipPath(options) {
        const defs = this.createDefs();
        const clipPath = this.createClipPath({ 'id': options.id });
        options.id = options.id + '_Rect';
        const rect = this.drawRectangle(options);
        clipPath.appendChild(rect);
        defs.appendChild(clipPath);
        return defs;
    }
    /**
     * To create circular clip path in SVG
     *
     * @param {CircleAttributes} options - Options required to create circular clip path
     * @returns {Element} It returns a appropriate element
     */
    drawCircularClipPath(options) {
        const defs = this.createDefs();
        const clipPath = this.createClipPath({ 'id': options.id });
        options.id = options.id + '_Circle';
        const circle = this.drawCircle(options);
        clipPath.appendChild(circle);
        defs.appendChild(clipPath);
        return defs;
    }
    /**
     * To set the attributes to the element
     *
     * @param {SVGCanvasAttributes} options - Attributes to set for the element
     * @param {Element} element - The element to which the attributes need to be set
     * @returns {Element} It returns a appropriate element
     */
    setElementAttributes(options, element) {
        const keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'style') {
                element.style.cssText = options[keys[i]];
            }
            else {
                element.setAttribute(keys[i], options[keys[i]]);
            }
        }
        return element;
    }
    /**
     * To create a Html5 canvas element
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    createCanvas() {
        return null;
    }
}

/* eslint-disable no-case-declarations */
/**
 * @private
 */
class CanvasRenderer {
    /* End-Properties */
    constructor(rootID) {
        this.rootId = rootID;
    }
    // method to get the attributes value
    // tslint:disable-next-line:no-any
    getOptionValue(options, key) {
        return options[key];
    }
    /* tslint:enable */
    /**
     * To create a Html5 canvas element
     *
     * @param {BaseAttibutes} options - Options to create canvas
     * @returns {HTMLCanvasElement} Creating a canvas
     */
    createCanvas(options) {
        const canvasObj = document.createElement('canvas');
        canvasObj.setAttribute('id', this.rootId + '_canvas');
        this.ctx = canvasObj.getContext('2d');
        this.canvasObj = canvasObj;
        this.setCanvasSize(options.width, options.height);
        return this.canvasObj;
    }
    /**
     * To set the width and height for the Html5 canvas element
     *
     * @param {number} width - width of the canvas
     * @param {number} height - height of the canvas
     * @returns {void} Setting canvas size
     */
    setCanvasSize(width, height) {
        const element = document.getElementById(this.rootId);
        const size = !isNullOrUndefined(element) ? element.getBoundingClientRect() : null;
        if (isNullOrUndefined(this.width)) {
            this.canvasObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.canvasObj.setAttribute('width', this.width.toString());
        }
        if (isNullOrUndefined(this.height)) {
            this.canvasObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.canvasObj.setAttribute('height', this.height.toString());
        }
    }
    // To set the values to the attributes
    setAttributes(options) {
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        const dashArray = this.getOptionValue(options, 'stroke-dasharray');
        if (!isNullOrUndefined(dashArray)) {
            const dashArrayString = dashArray.split(',');
            this.ctx.setLineDash([parseInt(dashArrayString[0], 10), parseInt(dashArrayString[1], 10)]);
        }
        this.ctx.strokeStyle = this.getOptionValue(options, 'stroke');
    }
    /**
     * To draw a line
     *
     * @param {LineAttributes} options - required options to draw a line on the canvas
     * @returns {void} To draw a line
     */
    drawLine(options) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.moveTo(options.x1, options.y1);
        this.ctx.lineTo(options.x2, options.y2);
        this.ctx.stroke();
        this.ctx.restore();
    }
    /**
     * To draw a rectangle
     *
     * @param {RectAttributes} options - required options to draw a rectangle on the canvas.
     * @param {Int32Array} canvasTranslate TO get a translate value of canvas.
     * @returns {void} To draw rectangle.
     */
    drawRectangle(options, canvasTranslate) {
        const canvasCtx = this.ctx;
        const cornerRadius = options.rx;
        this.ctx.save();
        this.ctx.beginPath();
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.ctx.globalAlpha = this.getOptionValue(options, 'opacity');
        this.setAttributes(options);
        this.ctx.rect(options.x, options.y, options.width, options.height);
        if (cornerRadius !== null && cornerRadius >= 0) {
            this.drawCornerRadius(options);
        }
        else {
            if (options.fill === 'none') {
                options.fill = 'transparent';
            }
            this.ctx.fillStyle = options.fill;
            this.ctx.fillRect(options.x, options.y, options.width, options.height);
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        return (this.canvasObj);
    }
    // To draw the corner of a rectangle
    drawCornerRadius(options) {
        let cornerRadius = options.rx;
        const x = options.x;
        const y = options.y;
        const width = options.width;
        const height = options.height;
        if (options.fill === 'none') {
            options.fill = 'transparent';
        }
        this.ctx.fillStyle = options.fill;
        if (width < 2 * cornerRadius) {
            cornerRadius = width / 2;
        }
        if (height < 2 * cornerRadius) {
            cornerRadius = height / 2;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + width - cornerRadius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
        this.ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
        this.ctx.arcTo(x, y + height, x, y, cornerRadius);
        this.ctx.arcTo(x, y, x + width, y, cornerRadius);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    /**
     * To draw a path on the canvas
     *
     * @param {PathAttributes} options - options needed to draw path.
     * @param {Int32Array} canvasTranslate - Array of numbers to translate the canvas.
     * @returns {Element} To draw a path.
     */
    drawPath(options, canvasTranslate) {
        const path = options.d;
        const dataSplit = path.split(' ');
        const borderWidth = this.getOptionValue(options, 'stroke-width');
        const canvasCtx = this.ctx;
        let flag = true;
        this.ctx.save();
        this.ctx.beginPath();
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.ctx.globalAlpha = options.opacity ? options.opacity : this.getOptionValue(options, 'fill-opacity');
        this.setAttributes(options);
        for (let i = 0; i < dataSplit.length; i = i + 3) {
            const x1 = parseFloat(dataSplit[i + 1]);
            const y1 = parseFloat(dataSplit[i + 2]);
            switch (dataSplit[i]) {
                case 'M':
                    if (!options.innerR && !options.cx) {
                        this.ctx.moveTo(x1, y1);
                    }
                    break;
                case 'L':
                    if (!options.innerR) {
                        this.ctx.lineTo(x1, y1);
                    }
                    break;
                case 'Q':
                    const q1 = parseFloat(dataSplit[i + 3]);
                    const q2 = parseFloat(dataSplit[i + 4]);
                    this.ctx.quadraticCurveTo(x1, y1, q1, q2);
                    i = i + 2;
                    break;
                case 'C':
                    const c1 = parseFloat(dataSplit[i + 3]);
                    const c2 = parseFloat(dataSplit[i + 4]);
                    const c3 = parseFloat(dataSplit[i + 5]);
                    const c4 = parseFloat(dataSplit[i + 6]);
                    this.ctx.bezierCurveTo(x1, y1, c1, c2, c3, c4);
                    i = i + 4;
                    break;
                case 'A':
                    if (!options.innerR) {
                        if (options.cx) {
                            this.ctx.arc(options.cx, options.cy, options.radius, 0, 2 * Math.PI, options.counterClockWise);
                        }
                        else {
                            this.ctx.moveTo(options.x, options.y);
                            this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                            this.ctx.lineTo(options.x, options.y);
                        }
                    }
                    else if (flag) {
                        this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                        this.ctx.arc(options.x, options.y, options.innerR, options.end, options.start, !options.counterClockWise);
                        flag = false;
                    }
                    i = i + 5;
                    break;
                case 'z':
                case 'Z':
                    this.ctx.closePath();
                    //since for loop is incremented by 3, to get next value after 'z' i is decremented for 2.
                    i = i - 2;
                    break;
            }
        }
        if (options.fill !== 'none' && options.fill !== undefined) {
            this.ctx.fillStyle = options.fill;
            this.ctx.fill();
        }
        if (borderWidth > 0) {
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        return this.canvasObj;
    }
    /**
     * To draw a text
     *
     * @param {TextAttributes} options - options required to draw text
     * @param {string} label - Specifies the text which has to be drawn on the canvas
     * @param {number} transX - Specifies the text of translate X
     * @param {number} transY - Specifies the text of translate Y
     * @param {number} dy - Specifies the text of translate dy
     * @param {boolean} isTSpan - Specifies the boolean value of span value
     * @returns {void}
     */
    createText(options, label, transX, transY, dy, isTSpan) {
        let fontWeight = this.getOptionValue(options, 'font-weight');
        if (!isNullOrUndefined(fontWeight) && fontWeight.toLowerCase() === 'regular') {
            fontWeight = 'normal';
        }
        const fontSize = this.getOptionValue(options, 'font-size');
        const fontFamily = this.getOptionValue(options, 'font-family');
        const fontStyle = this.getOptionValue(options, 'font-style').toLowerCase();
        const font = (fontStyle + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily);
        let anchor = this.getOptionValue(options, 'text-anchor');
        const opacity = options.opacity !== undefined ? options.opacity : 1;
        if (anchor === 'middle') {
            anchor = 'center';
        }
        this.ctx.save();
        this.ctx.fillStyle = options.fill;
        this.ctx.font = font;
        this.ctx.textAlign = anchor;
        this.ctx.globalAlpha = opacity;
        if (options.baseline) {
            this.ctx.textBaseline = options.baseline;
        }
        if (!isTSpan) {
            const txtlngth = 0;
            this.ctx.translate(options.x + (txtlngth / 2) + (transX ? transX : 0), options.y + (transY ? transY : 0));
            this.ctx.rotate(options.labelRotation * Math.PI / 180);
        }
        this.ctx.fillText(label, isTSpan ? options.x : 0, isTSpan ? dy : 0);
        this.ctx.restore();
        return this.canvasObj;
    }
    /**
     * To draw circle on the canvas
     *
     * @param {CircleAttributes} options - required options to draw the circle
     * @param {Int32Array} canvasTranslate Translate value of canvas
     * @returns {void}
     */
    drawCircle(options, canvasTranslate) {
        const canvasCtx = this.ctx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(options.cx, options.cy, options.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = options.fill;
        this.ctx.globalAlpha = options.opacity;
        this.ctx.fill();
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.setAttributes(options);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
        return this.canvasObj;
    }
    /**
     * To draw polyline
     *
     * @param {PolylineAttributes} options - options needed to draw polyline
     * @returns {void}
     */
    drawPolyline(options) {
        this.ctx.save();
        this.ctx.beginPath();
        const points = options.points.split(' ');
        for (let i = 0; i < points.length - 1; i++) {
            const point = points[i].split(',');
            const x = parseFloat(point[0]);
            const y = parseFloat(point[1]);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            }
            else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
    }
    /**
     * To draw an ellipse on the canvas
     *
     * @param {EllipseAttributes} options - options needed to draw ellipse
     * @param {Int32Array} canvasTranslate Translate value of canvas
     * @returns {void}
     */
    drawEllipse(options, canvasTranslate) {
        const canvasCtx = this.ctx;
        const circumference = Math.max(options.rx, options.ry);
        const scaleX = options.rx / circumference;
        const scaleY = options.ry / circumference;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(options.cx, options.cy);
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.ctx.save();
        this.ctx.scale(scaleX, scaleY);
        this.ctx.arc(0, 0, circumference, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = options.fill;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
    }
    /**
     * To draw an image
     *
     * @param {ImageAttributes} options - options required to draw an image on the canvas
     * @returns {void}
     */
    drawImage(options) {
        this.ctx.save();
        const imageObj = new Image();
        if (!isNullOrUndefined(options.href)) {
            imageObj.src = options.href;
            this.ctx.drawImage(imageObj, options.x, options.y, options.width, options.height);
        }
        this.ctx.restore();
    }
    /**
     * To create a linear gradient
     *
     * @param {string[]} colors - Specifies the colors required to create linear gradient
     * @returns {string} It returns color
     */
    createLinearGradient(colors) {
        let myGradient;
        if (!isNullOrUndefined(colors[0].colorStop)) {
            myGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasObj.height);
        }
        const color = this.setGradientValues(colors, myGradient);
        return color;
    }
    /**
     * To create a radial gradient
     *
     * @param {string[]} colors - Specifies the colors required to create linear gradient
     * @returns {string} It returns gradient color
     */
    createRadialGradient(colors) {
        let myGradient;
        if (!isNullOrUndefined(colors[0].colorStop)) {
            myGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.canvasObj.height);
        }
        const colorName = this.setGradientValues(colors, myGradient);
        return colorName;
    }
    // To set the gradient values
    setGradientValues(colors, myGradient) {
        let colorName;
        if (!isNullOrUndefined(colors[0].colorStop)) {
            for (let i = 0; i <= colors.length - 1; i++) {
                const color = colors[i].color;
                const newColorStop = (colors[i].colorStop).slice(0, -1);
                const stopColor = parseInt(newColorStop, 10) / 100;
                myGradient.addColorStop(stopColor, color);
            }
            colorName = myGradient.toString();
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    }
    /**
     * To set the attributes to the element
     *
     * @param {SVGCanvasAttributes} options - Attributes to set for the element
     * @param {HTMLElement} element - The element to which the attributes need to be set
     * @returns {HTMLElement} It returns null value
     */
    setElementAttributes(options, element) {
        const keys = Object.keys(options);
        const values = Object.keys(options).map((key) => { return options[key]; });
        for (let i = 0; i < keys.length; i++) {
            element.setAttribute(keys[i], values[i]);
        }
        return null;
    }
    /**
     * To update the values of the canvas element attributes
     *
     * @param {SVGCanvasAttributes} options - Specifies the colors required to create gradient
     * @returns {void}
     */
    updateCanvasAttributes(options) {
        this.setElementAttributes(options, this.canvasObj);
        const ctx = this.ctx;
        if (!isNullOrUndefined(this.dataUrl)) {
            const img = new Image;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
            img.src = this.dataUrl;
        }
    }
    /**
     * This method clears the given rectangle region
     *
     * @param {Rect} rect The rect parameter as passed
     */
    clearRect(rect) {
        this.ctx.restore();
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
    }
    /**
     * For canvas rendering in chart
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    createGroup() {
        return null;
    }
    /**
     * To render a clip path
     *
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    drawClipPath() {
        return null;
    }
    /**
     * To render a Circular clip path
     *
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    drawCircularClipPath() {
        return null;
    }
    /**
     * Clip method to perform clip in canvas mode
     *
     * @param {BaseAttibutes} options The canvas clip of options
     */
    canvasClip(options) {
        this.ctx.save();
        this.ctx.fillStyle = 'transparent';
        this.ctx.rect(options.x, options.y, options.width, options.height);
        this.ctx.fill();
        this.ctx.clip();
    }
    /**
     * Tp restore the canvas
     */
    canvasRestore() {
        this.ctx.restore();
    }
    /**
     * To draw a polygon
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    drawPolygon() {
        return null;
    }
    /**
     * To create defs element in SVG
     * Dummy method for using canvas/svg render in the same variable name in chart control
     *
     * @returns {Element} It returns null
     */
    createDefs() {
        return null;
    }
    /**
     * To create clip path in SVG
     * Dummy method for using canvas/svg render in the same variable name in chart control
     */
    createClipPath() {
        return null;
    }
    /**
     * To create a Html5 SVG element
     * Dummy method for using canvas/svg render in the same variable name in chart control
     *
     * @returns {Element} It returns null
     */
    createSvg() {
        return null;
    }
}

/** @private */
function getTooltipThemeColor(theme) {
    let style;
    switch (theme) {
        case 'Highcontrast':
        case 'HighContrast':
            style = {
                tooltipFill: '#ffffff',
                tooltipBoldLabel: '#000000',
                tooltipLightLabel: '#000000',
                tooltipHeaderLine: '#969696',
                textStyle: { fontFamily: 'Segoe UI', color: '#000000', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'MaterialDark':
        case 'FabricDark':
        case 'BootstrapDark':
            style = {
                tooltipFill: theme === 'MaterialDark' ? '#F4F4F4' : theme === 'FabricDark' ? '#A19F9D' : '#F0F0F0',
                tooltipBoldLabel: theme === 'MaterialDark' ? 'rgba(18, 18, 18, 1)' : theme === 'FabricDark' ? '#DADADA' : '#1A1A1A',
                tooltipLightLabel: theme === 'MaterialDark' ? 'rgba(18, 18, 18, 1)' : theme === 'FabricDark' ? '#DADADA' : '#1A1A1A',
                tooltipHeaderLine: '#9A9A9A',
                textStyle: theme === 'MaterialDark' ? { fontFamily: 'Roboto', color: 'rgba(18, 18, 18, 1)', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' } : theme === 'FabricDark' ? { fontFamily: 'Segoe UI', color: '#DADADA', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' } : { fontFamily: 'Helvetica', color: '#1A1A1A', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Bootstrap4':
            style = {
                tooltipFill: '#212529',
                tooltipBoldLabel: '#F9FAFB',
                tooltipLightLabel: '#F9FAFB',
                tooltipHeaderLine: 'rgba(255, 255, 255, 0.2)',
                textStyle: { fontFamily: 'Helvetica', color: '#F9FAFB', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Tailwind3':
            style = {
                tooltipFill: '#111827',
                tooltipBoldLabel: '#F9FAFB',
                tooltipLightLabel: '#F9FAFB',
                tooltipHeaderLine: '#D1D5DB',
                textStyle: { fontFamily: 'Inter', color: '#F9FAFB', fontWeight: '500', size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Tailwind3Dark':
            style = {
                tooltipFill: '#F9FAFB',
                tooltipBoldLabel: '#1F2937',
                tooltipLightLabel: '#1F2937',
                tooltipHeaderLine: '#374151',
                textStyle: { fontFamily: 'Inter', color: '#1F2937', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Tailwind':
            style = {
                tooltipFill: '#111827',
                tooltipBoldLabel: '#F9FAFB',
                tooltipLightLabel: '#F9FAFB',
                tooltipHeaderLine: '#6B7280',
                textStyle: { fontFamily: 'Inter', color: '#F9FAFB', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'TailwindDark':
            style = {
                tooltipFill: '#E9ECEF',
                tooltipBoldLabel: '#1F2937',
                tooltipLightLabel: '#1F2937',
                tooltipHeaderLine: '#9CA3AF',
                textStyle: { fontFamily: 'Inter', color: '#1F2937', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Bootstrap5':
            style = {
                tooltipFill: '#000000E5',
                tooltipBoldLabel: '#FFFFFF',
                tooltipLightLabel: '#FFFFFF',
                tooltipHeaderLine: '#FFFFFF',
                textStyle: { fontFamily: 'Segoe UI', color: '#FFFFFF', fontWeight: null, size: '12px', headerTextSize: '16px', boldTextSize: '14px' }
            };
            break;
        case 'Bootstrap5Dark':
            style = {
                tooltipFill: '#FFFFFFE5',
                tooltipBoldLabel: '#212529',
                tooltipLightLabel: '#212529',
                tooltipHeaderLine: '#212529',
                textStyle: { fontFamily: 'Helvetica', color: '#212529', fontWeight: null, size: '12px', headerTextSize: '16px', boldTextSize: '14px' }
            };
            break;
        case 'Fluent':
            style = {
                tooltipFill: '#FFFFFF',
                tooltipBoldLabel: '#323130',
                tooltipLightLabel: '#323130',
                tooltipHeaderLine: '#D2D0CE',
                textStyle: { fontFamily: 'Segoe UI', color: '#323130', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'FluentDark':
            style = {
                tooltipFill: '#323130',
                tooltipBoldLabel: '#F3F2F2',
                tooltipLightLabel: '#F3F2F1',
                tooltipHeaderLine: '#3B3A39',
                textStyle: { fontFamily: 'Segoe UI', color: '#F3F2F1', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Fluent2':
            style = {
                tooltipFill: '#FFFFFF',
                tooltipBoldLabel: '#242424',
                tooltipLightLabel: '#242424',
                tooltipHeaderLine: '#D2D0CE',
                textStyle: { fontFamily: 'Segoe UI', color: '#242424', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Fluent2Dark':
            style = {
                tooltipFill: '#292929',
                tooltipBoldLabel: '#FFFFFF',
                tooltipLightLabel: '#FFFFFF',
                tooltipHeaderLine: '#3B3A39',
                textStyle: { fontFamily: 'Segoe UI', color: '#FFFFFF', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Fluent2HighContrast':
            style = {
                tooltipFill: '#000000',
                tooltipBoldLabel: '#FFFFFF',
                tooltipLightLabel: '#FFFFFF',
                tooltipHeaderLine: '#3B3A39',
                textStyle: { fontFamily: 'Segoe UI', color: '#FFFFFF', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Material3':
            style = {
                tooltipFill: '#313033',
                tooltipBoldLabel: '#F4EFF4',
                tooltipLightLabel: '#F4EFF4',
                tooltipHeaderLine: '#F4EFF4',
                textStyle: { fontFamily: 'Roboto', color: '#F4EFF4', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        case 'Material3Dark':
            style = {
                tooltipFill: '#E6E1E5',
                tooltipBoldLabel: '#313033',
                tooltipLightLabel: '#313033',
                tooltipHeaderLine: '#313033',
                textStyle: { fontFamily: 'Roboto', color: '#313033', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
        default:
            style = {
                tooltipFill: theme === 'Material' ? '#000816' : theme === 'Fabric' ? '#FFFFFF' : '#212529',
                tooltipBoldLabel: theme === 'Material' ? 'rgba(249, 250, 251, 1)' : theme === 'Fabric' ? '#333333' : '#F9FAFB',
                tooltipLightLabel: theme === 'Material' ? 'rgba(249, 250, 251, 1)' : theme === 'Fabric' ? '#333333' : '#F9FAFB',
                tooltipHeaderLine: theme === 'Fabric' ? '#D2D0CE' : '#ffffff',
                textStyle: theme === 'Material' ? { fontFamily: 'Roboto', color: 'rgba(249, 250, 251, 1)', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' } : theme === 'Fabric' ? { fontFamily: 'Segoe UI', color: '#333333', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' } : { fontFamily: 'Helvetica', color: '#F9FAFB', fontWeight: null, size: '12px', headerTextSize: '12px', boldTextSize: '12px' }
            };
            break;
    }
    return style;
}

/**
 * Function to measure the height and width of the text.
 *
 * @private
 * @param {string} text To get a text
 * @param {FontModel} font To get a font of the text
 * @returns {Size} measureText
 */
function measureText(text, font, themeFontStyle, isHeader) {
    const breakText = text || ''; // For avoid NuLL value
    let htmlObject = document.getElementById('chartmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'chartmeasuretext' });
        document.body.appendChild(htmlObject);
    }
    if (typeof (text) === 'string' && (text.indexOf('<') > -1 || text.indexOf('>') > -1)) {
        const textArray = text.split(' ');
        for (let i = 0; i < textArray.length; i++) {
            if (textArray[i].indexOf('<br/>') === -1) {
                textArray[i] = textArray[i].replace(/[<>]/g, '&');
            }
        }
        text = textArray.join(' ');
    }
    htmlObject.innerHTML = (breakText.indexOf('<br>') > -1 || breakText.indexOf('<br/>') > -1) ? breakText : text;
    htmlObject.style.position = 'fixed';
    htmlObject.style.fontSize = font.size || (isHeader ? themeFontStyle.headerTextSize : themeFontStyle.size);
    htmlObject.style.fontStyle = font.fontStyle || themeFontStyle.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily || themeFontStyle.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    const fontWidth = htmlObject.clientWidth;
    const fontHeight = htmlObject.clientHeight;
    const fontWeight = htmlObject.style.fontWeight;
    htmlObject.style.fontWeight = font.fontWeight || themeFontStyle.fontWeight;
    return new Size(htmlObject.style.fontWeight === 'bold' && fontWeight === 'normal' ? Math.max(fontWidth, htmlObject.clientWidth) : htmlObject.clientWidth, htmlObject.style.fontWeight === 'bold' && fontWeight === 'normal' ? Math.max(fontHeight, htmlObject.clientHeight) : htmlObject.clientHeight);
}
/** @private */
function withInAreaBounds(x, y, areaBounds, width = 0, height = 0) {
    return (x >= areaBounds.x - width && x <= areaBounds.x + areaBounds.width + width && y >= areaBounds.y - height
        && y <= areaBounds.y + areaBounds.height + height);
}
/** @private */
function findDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY, controlName = '') {
    let direction = '';
    const startX = rect.x;
    const startY = rect.y;
    const width = rect.x + rect.width;
    const height = rect.y + rect.height;
    if (top) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + startY + ' ' + (startX + rX) + ' ' + startY + ' ' +
            ' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
            + startY + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height));
        if (arrowPadding !== 0) {
            if (controlName === 'RangeNavigator') {
                if ((arrowLocation.x - arrowPadding) > width / 2) {
                    direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (height));
                    direction = direction.concat(' L' + ' ' + (tipX + arrowPadding) + ' ' + (height + arrowPadding)
                        + ' L' + ' ' + (arrowLocation.x) + ' ' + height);
                }
                else {
                    direction = direction.concat(' L' + ' ' + (arrowLocation.x) + ' ' + (height));
                    direction = direction.concat(' L' + ' ' + (tipX - arrowPadding) + ' ' + (height + arrowPadding)
                        + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + height);
                }
            }
            else {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (height));
                direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (height + arrowPadding)
                    + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + height);
            }
        }
        if ((arrowLocation.x - arrowPadding) > startX) {
            direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else {
            if (arrowPadding === 0) {
                direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                    + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
            }
            else {
                direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height + rY) + ' z');
            }
        }
    }
    else if (bottom) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + (startY) + ' ' + (startX + rX) + ' ' + (startY) + ' L' + ' ' + (arrowLocation.x - arrowPadding) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (arrowLocation.y));
        direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY)
            + ' Q ' + (width) + ' ' + (startY) + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + (width) + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height) +
            ' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + (startX) + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    }
    else if (left) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + (startY) + ' ' + (startX + rX) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' '
            + (startY) + ' ' + (width) + ' ' + ((controlName === 'RangeNavigator' ? 0 : (startY + rY)) + ' L' + ' ' + (width) + ' ' + (controlName === 'RangeNavigator' ? 0 : (arrowLocation.y - arrowPadding))));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + 0) :
            direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + (tipY));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y - rY)) :
            direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    }
    else {
        direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
            + (startY) + ' ' + (startX) + ' ' + ((controlName === 'RangeNavigator' ? 0 : (startY + rY)) + ' L' + ' ' + (startX) + ' ' + (controlName === 'RangeNavigator' ? 0 : (arrowLocation.y - arrowPadding))));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + 0) :
            direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + (tipY));
        direction = (controlName === 'RangeNavigator') ? direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y - rY)) :
            direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y + arrowPadding));
        direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height - rY) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX + rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (height) + ' Q ' + width + ' '
            + (height) + ' ' + (width) + ' ' + (height - rY) +
            ' L' + ' ' + (width) + ' ' + (startY + rY) + ' Q ' + width + ' '
            + (startY) + ' ' + (width - rX) + ' ' + (startY) + ' z');
    }
    return direction;
}
/** @private */
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
/** @private */
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Side {
    constructor(bottom, right) {
        this.isRight = right;
        this.isBottom = bottom;
    }
}
/** @private */
class CustomizeOption {
    constructor(id) {
        this.id = id;
    }
}
/** @private */
class TextOption extends CustomizeOption {
    constructor(id, x, y, anchor, text, transform = '', baseLine, labelRotation) {
        super(id);
        this.transform = '';
        this.baseLine = 'auto';
        this.labelRotation = 0;
        this.x = x;
        this.y = y;
        this.anchor = anchor;
        this.text = text;
        this.transform = transform;
        this.baseLine = baseLine;
        this.labelRotation = labelRotation;
    }
}
/** @private */
function getElement(id) {
    return document.getElementById(id);
}
/** @private */
function removeElement(id) {
    const element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
function drawSymbol(location, shape, size, url, options, role, label) {
    const renderer = new SvgRenderer('');
    const temp = calculateShapes(location, size, shape, options, url);
    const htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    htmlObject.setAttribute('role', role);
    htmlObject.setAttribute('aria-label', label);
    return htmlObject;
}
/** @private */
function calculateShapes(location, size, shape, options, url) {
    let path;
    let functionName = 'Path';
    const width = size.width;
    const height = size.height;
    const locX = location.x;
    const locY = location.y;
    const x = location.x + (-width / 2);
    const y = location.y + (-height / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
            break;
        case 'Plus':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'Cross':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'HorizontalLine':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY;
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'VerticalLine':
            path = 'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' + (locY + (-height / 2));
            merge(options, { 'd': path, stroke: options.fill });
            break;
        case 'Diamond':
            path = 'M' + ' ' + x + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + locY + ' z';
            merge(options, { 'd': path });
            break;
        case 'Rectangle':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            path = 'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Pentagon':
            const eq = 72;
            let xValue;
            let yValue;
            for (let i = 0; i <= 5; i++) {
                xValue = (width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    path = 'M' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ';
                }
                else {
                    path = path.concat('L' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ');
                }
            }
            path = path.concat('Z');
            merge(options, { 'd': path });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
            break;
        case 'Star': {
            const cornerPoints = 5;
            const outerRadius = Math.min(width, height) / 2;
            const innerRadius = outerRadius / 2;
            const angle = Math.PI / cornerPoints;
            let starPath = '';
            for (let i = 0; i < 2 * cornerPoints; i++) {
                const radius = (i % 2 === 0) ? outerRadius : innerRadius;
                const currentX = locX + radius * Math.cos(i * angle - Math.PI / 2);
                const currentY = locY + radius * Math.sin(i * angle - Math.PI / 2);
                starPath += (i === 0 ? 'M' : 'L') + currentX + ',' + currentY;
            }
            starPath += 'Z';
            merge(options, { 'd': starPath });
            break;
        }
    }
    return { renderOption: options, functionName: functionName };
}
/** @private */
class PathOption extends CustomizeOption {
    constructor(id, fill, width, color, opacity, dashArray, d) {
        super(id);
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
}
/** @private */
function textElement(options, font, color, parent, themeStyle) {
    let renderOptions = {};
    const renderer = new SvgRenderer('');
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color,
        'font-size': font.size || themeStyle.size,
        'font-style': font.fontStyle || themeStyle.fontStyle,
        'font-family': font.fontFamily || themeStyle.fontFamily,
        'font-weight': font.fontWeight || themeStyle.fontWeight,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine
    };
    const text = typeof options.text === 'string' ? options.text : options.text[0];
    const htmlObject = renderer.createText(renderOptions, text);
    if (parent) {
        parent.appendChild(htmlObject);
    }
    return htmlObject;
}
class TooltipLocation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the fonts in charts.
 *
 * @private
 */
class TextStyle extends ChildProperty {
}
__decorate([
    Property(null)
], TextStyle.prototype, "size", void 0);
__decorate([
    Property('')
], TextStyle.prototype, "color", void 0);
__decorate([
    Property('Segoe UI')
], TextStyle.prototype, "fontFamily", void 0);
__decorate([
    Property('Normal')
], TextStyle.prototype, "fontWeight", void 0);
__decorate([
    Property('Normal')
], TextStyle.prototype, "fontStyle", void 0);
__decorate([
    Property(1)
], TextStyle.prototype, "opacity", void 0);
__decorate([
    Property(null)
], TextStyle.prototype, "headerTextSize", void 0);
__decorate([
    Property(null)
], TextStyle.prototype, "boldTextSize", void 0);
/**
 * Configures the borders in the chart.
 *
 * @private
 */
class TooltipBorder extends ChildProperty {
}
__decorate([
    Property('')
], TooltipBorder.prototype, "color", void 0);
__decorate([
    Property(1)
], TooltipBorder.prototype, "width", void 0);
__decorate([
    Property('')
], TooltipBorder.prototype, "dashArray", void 0);
/**
 * Configures the borders in the chart.
 *
 * @private
 */
class AreaBounds extends ChildProperty {
}
__decorate([
    Property(0)
], AreaBounds.prototype, "x", void 0);
__decorate([
    Property(0)
], AreaBounds.prototype, "y", void 0);
__decorate([
    Property(0)
], AreaBounds.prototype, "width", void 0);
__decorate([
    Property(0)
], AreaBounds.prototype, "height", void 0);
/**
 * Configures the borders in the chart.
 *
 * @private
 */
class ToolLocation extends ChildProperty {
}
__decorate([
    Property(0)
], ToolLocation.prototype, "x", void 0);
__decorate([
    Property(0)
], ToolLocation.prototype, "y", void 0);
/**
 * Represents the Tooltip control.
 * ```html
 * <div id="tooltip"/>
 * <script>
 *   var tooltipObj = new Tooltip({ isResponsive : true });
 *   tooltipObj.appendTo("#tooltip");
 * </script>
 * ```
 *
 * @private
 */
let Tooltip = class Tooltip extends Component {
    /**
     * Constructor for creating the widget
     *
     * @hidden
     */
    constructor(options, element) {
        super(options, element);
    }
    /**
     * Initialize the event handler.
     *
     * @private
     */
    preRender() {
        this.allowServerDataBinding = false;
        this.initPrivateVariable();
        if (!this.isCanvas) {
            this.removeSVG();
        }
        this.createTooltipElement();
    }
    initPrivateVariable() {
        this.renderer = new SvgRenderer(this.element.id);
        this.themeStyle = getTooltipThemeColor(this.theme);
        this.formattedText = [];
        this.padding = 5;
        this.highlightPadding = 3;
        this.areaMargin = 10;
        this.isFirst = true;
        this.markerPoint = [];
    }
    removeSVG() {
        const svgObject = document.getElementById(this.element.id + '_svg');
        const templateObject = document.getElementById(this.element.id + 'parent_template');
        if (this.blazorTemplate) {
            resetBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate');
        }
        if (svgObject && svgObject.parentNode) {
            remove(svgObject);
        }
        if (templateObject && templateObject.parentNode) {
            remove(templateObject);
        }
    }
    /**
     * To Initialize the control rendering.
     */
    render() {
        this.fadeOuted = false;
        if (!this.template) {
            this.renderText(this.isFirst);
            const argsData = {
                cancel: false, name: 'tooltipRender', tooltip: this
            };
            this.trigger('tooltipRender', argsData);
            const markerSide = this.renderTooltipElement(this.areaBounds, this.location);
            this.drawMarker(markerSide.isBottom, markerSide.isRight, this.markerSize);
        }
        else {
            this.updateTemplateFn();
            this.createTemplate(this.areaBounds, this.location);
        }
        this.trigger('loaded', { tooltip: this });
        const element = document.getElementById('chartmeasuretext');
        if (element) {
            remove(element);
        }
        this.allowServerDataBinding = true;
    }
    createTooltipElement() {
        this.textElements = [];
        if (!this.template || this.shared) {
            // SVG element for tooltip
            if (this.enableRTL) {
                this.element.setAttribute('dir', 'ltr');
            }
            const svgObject = this.renderer.createSvg({ id: this.element.id + '_svg' });
            this.element.appendChild(svgObject);
            // Group to hold text and path.
            let groupElement = document.getElementById(this.element.id + '_group');
            if (!groupElement) {
                groupElement = this.renderer.createGroup({ id: this.element.id + '_group' });
                groupElement.setAttribute('transform', 'translate(0,0)');
            }
            svgObject.appendChild(groupElement);
            const pathElement = this.renderer.drawPath({
                'id': this.element.id + '_path', 'stroke-width': ((this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2' || this.theme === 'Fluent2HighContrast') && !this.border.width) ? 1 : this.border.width,
                'fill': this.fill || this.themeStyle.tooltipFill, 'opacity': ((this.theme === 'TailwindDark' || this.theme === 'Tailwind' || this.theme === 'Tailwind3Dark' || this.theme === 'Tailwind3' || this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark' || this.theme.indexOf('Fluent2') > -1) && this.opacity === 0.75) ?
                    1 : this.opacity,
                'stroke': this.border.color || (this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2' ? '#D2D0CE' : this.border.color)
            });
            groupElement.appendChild(pathElement);
        }
    }
    drawMarker(isBottom, isRight, size) {
        if (this.shapes.length <= 0) {
            return null;
        }
        let shapeOption;
        let count = 0;
        const markerGroup = this.renderer.createGroup({ id: this.element.id + '_trackball_group' });
        const groupElement = getElement(this.element.id + '_group');
        if (!groupElement) {
            return null;
        }
        const x = ((this.enableRTL) ? this.elementSize.width - (size / 2) :
            (this.marginX * 2) + (size / 2)) + (isRight ? this.arrowPadding : 0);
        for (const shape of this.shapes) {
            if (shape !== 'None') {
                shapeOption = new PathOption(this.element.id + '_Trackball_' + count, this.palette[count], 1, '#cccccc', 1, null);
                if (this.markerPoint[count]) {
                    let padding = 0;
                    if (this.header.indexOf('<br') > -1) {
                        padding = this.header.split(/<br.*?>/g).length + count;
                    }
                    const tooltipContent = (this.formattedText && this.formattedText.length >= 2)
                        ? `${this.getTooltipTextContent(this.formattedText[1])}, ${this.getTooltipTextContent(this.formattedText[0])}`
                        : '';
                    markerGroup.appendChild(drawSymbol(new TooltipLocation(x, this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : padding)), shape, new Size(size, size), '', shapeOption, 'img', tooltipContent));
                }
                count++;
            }
        }
        groupElement.appendChild(markerGroup);
    }
    renderTooltipElement(areaBounds, location) {
        const tooltipDiv = getElement(this.element.id);
        const arrowLocation = new TooltipLocation(0, 0);
        const tipLocation = new TooltipLocation(0, 0);
        const svgObject = getElement(this.element.id + '_svg');
        const groupElement = getElement(this.element.id + '_group');
        const pathElement = getElement(this.element.id + '_path');
        let rect;
        let isTop = false;
        let isLeft = false;
        let isBottom = false;
        let x = 0;
        let y = 0;
        if (!isNullOrUndefined(groupElement)) {
            if (this.header !== '' && this.showHeaderLine) {
                this.elementSize.height += this.marginY;
            }
            if (this.isFixed) {
                const width = this.elementSize.width + (2 * this.marginX);
                const height = this.elementSize.height + (2 * this.marginY);
                rect = new Rect(location.x, location.y, width, height);
            }
            else if (this.content.length > 1) {
                rect = this.sharedTooltipLocation(areaBounds, this.location.x, this.location.y);
                isTop = true;
            }
            else {
                rect = this.tooltipLocation(areaBounds, location, arrowLocation, tipLocation);
                if (!this.inverted) {
                    isTop = (rect.y < (location.y + this.clipBounds.y));
                    isBottom = !isTop;
                    y = (isTop ? 0 : this.arrowPadding);
                }
                else {
                    isLeft = (rect.x < (location.x + this.clipBounds.x));
                    x = (isLeft ? 0 : this.arrowPadding);
                    if (this.allowHighlight) {
                        rect.x += isLeft ? this.highlightPadding : -(2 * this.highlightPadding);
                    }
                }
            }
            if (this.header !== '' && this.showHeaderLine) {
                let wrapPadding = 2;
                let padding = 0;
                const wrapHeader = this.isWrap ? this.wrappedText : this.header;
                if (this.isWrap && typeof (wrapHeader) === 'string' && (wrapHeader.indexOf('<') > -1 || wrapHeader.indexOf('>') > -1)) {
                    const textArray = wrapHeader.split('<br>');
                    wrapPadding = textArray.length;
                }
                if (this.header.indexOf('<br') > -1) {
                    padding = 5 * (this.header.split(/<br.*?>/g).length - 1);
                }
                const key = 'properties';
                const font = extend({}, this.textStyle, null, true)[key];
                const headerSize = measureText(this.isWrap ? this.wrappedText : this.header, font, this.themeStyle.textStyle).height
                    + (this.marginY * wrapPadding) + (isBottom ? this.arrowPadding : 0) + (this.isWrap ? 5 : padding); //header padding;
                const xLength = (this.marginX * 3) + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0);
                const direction = 'M ' + xLength + ' ' + headerSize +
                    'L ' + (rect.width + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0) - (this.marginX * 2)) +
                    ' ' + headerSize;
                const pathElement = this.renderer.drawPath({
                    'id': this.element.id + '_header_path', 'stroke-width': 1,
                    'fill': null, 'opacity': this.theme === 'Material3' || this.theme === 'Material3Dark' ? 0.2 : 0.8, 'stroke': this.themeStyle.tooltipHeaderLine, 'd': direction
                });
                groupElement.appendChild(pathElement);
            }
            const start = this.border.width / 2;
            const pointRect = new Rect(start + x, start + y, rect.width - start, rect.height - start);
            groupElement.setAttribute('opacity', '1');
            if (this.enableAnimation && !this.isFirst && !this.crosshair) {
                this.animateTooltipDiv(tooltipDiv, rect);
            }
            else {
                this.updateDiv(tooltipDiv, rect.x, rect.y);
            }
            // eslint-disable-next-line no-extra-boolean-cast
            svgObject.setAttribute('height', (rect.height + this.border.width + (!((!this.inverted)) ? 0 : this.arrowPadding) + 5).toString());
            svgObject.setAttribute('width', (rect.width + this.border.width + (((!this.inverted)) ? 0 : this.arrowPadding) + 5).toString());
            svgObject.setAttribute('opacity', '1');
            if (!isNullOrUndefined(this.tooltipPlacement)) {
                isTop = this.tooltipPlacement.indexOf('Top') > -1;
                isBottom = this.tooltipPlacement.indexOf('Bottom') > -1;
                isLeft = this.tooltipPlacement.indexOf('Left') > -1;
            }
            pathElement.setAttribute('d', findDirection(this.rx, this.ry, pointRect, arrowLocation, this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y, this.controlName));
            if ((this.enableShadow && this.theme !== 'Bootstrap4') || this.theme.indexOf('Fluent2') > -1) {
                // To fix next chart initial tooltip opacity issue in tab control
                const shadowId = this.element.id + '_shadow';
                if (this.theme === 'Tailwind' || this.theme === 'TailwindDark' || this.theme === 'Tailwind3' || this.theme === 'Tailwind3Dark'
                    || this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark') {
                    pathElement.setAttribute('box-shadow', '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)');
                }
                else {
                    pathElement.setAttribute('filter', Browser.isIE ? '' : 'url(#' + shadowId + ')');
                }
                let shadow = '<filter id="' + shadowId + '" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
                if (this.theme.indexOf('Fluent2') > -1) {
                    shadow += '<feOffset dx="-1" dy="3.6" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/>';
                }
                else {
                    shadow += '<feOffset dx="3" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/>';
                }
                shadow += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                const defElement = this.renderer.createDefs();
                defElement.setAttribute('id', this.element.id + 'SVG_tooltip_definition');
                groupElement.appendChild(defElement);
                defElement.innerHTML = shadow;
            }
            const borderColor = ((this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2') && !this.border.color) ? '#D2D0CE' : this.theme === 'Fluent2HighContrast' ? '#FFFFFF' : this.border.color;
            pathElement.setAttribute('stroke', borderColor);
            if (!isNullOrUndefined(this.border.dashArray)) {
                pathElement.setAttribute('stroke-dasharray', this.border.dashArray);
            }
            this.changeText(new TooltipLocation(x, y), isBottom, !isLeft && !isTop && !isBottom);
            if (this.revert) {
                this.inverted = !this.inverted;
                this.revert = false;
            }
        }
        return new Side(isBottom, !isLeft && !isTop && !isBottom);
    }
    changeText(point, isBottom, isRight) {
        const element = document.getElementById(this.element.id + '_text');
        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }
    }
    findFormattedText() {
        this.formattedText = [];
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            this.formattedText = this.formattedText.concat(this.header);
        }
        this.formattedText = this.formattedText.concat(this.content);
    }
    // tslint:disable-next-line:max-func-body-length
    renderText(isRender) {
        let height = 0;
        let width = 0; // Padding for text;
        let subWidth = 0;
        let lines;
        const key = 'properties';
        const font = extend({}, this.textStyle, null, true)[key];
        const groupElement = getElement(this.element.id + '_group');
        let tspanElement;
        let textCollection;
        let tspanStyle = '';
        let line;
        let tspanOption;
        this.findFormattedText();
        this.isWrap = false;
        const isRtlEnabled = document.body.getAttribute('dir') === 'rtl';
        const anchor = isRtlEnabled && !this.enableRTL ? 'end' : 'start';
        this.leftSpace = this.areaBounds.x + this.location.x;
        this.rightSpace = (this.areaBounds.x + this.areaBounds.width) - this.leftSpace;
        const headerContent = this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
        const isBoldTag = this.header.indexOf('<b>') > -1 && this.header.indexOf('</b>') > -1;
        const headerWidth = measureText(this.formattedText[0], font, this.themeStyle.textStyle).width
            + (2 * this.marginX) + this.arrowPadding;
        const isLeftSpace = (this.location.x - headerWidth) < this.location.x;
        const isRightSpace = (this.areaBounds.x + this.areaBounds.width) < (this.location.x + headerWidth);
        let header;
        let headerSpace = (headerContent !== '' && this.showHeaderLine) ? this.marginY : 0;
        let isRow = true;
        let isColumn = true;
        this.markerPoint = [];
        const markerSize = (this.shapes.length > 0) ? 10 : 0;
        const markerPadding = (this.shapes.length > 0) ? 5 : 0;
        const spaceWidth = 4;
        let subStringLength;
        const fontSize = '12px';
        let fontWeight = '400';
        let labelColor = this.themeStyle.tooltipLightLabel;
        const dy = (22 / parseFloat(fontSize)) * (parseFloat(font.size || this.themeStyle.textStyle.size));
        const contentWidth = [];
        let textHeight = 0;
        if (!isRender || this.isCanvas) {
            removeElement(this.element.id + '_text');
            removeElement(this.element.id + '_header_path');
            removeElement(this.element.id + '_trackball_group');
            removeElement(this.element.id + 'SVG_tooltip_definition');
        }
        // Condition to resolve the text size issue only in chart.
        if (this.controlName === 'Chart' && parseFloat(fontSize) < parseFloat(font.size || this.themeStyle.textStyle.headerTextSize)) {
            textHeight = (parseFloat(font.size || this.themeStyle.textStyle.size) - parseFloat(fontSize));
        }
        const options = new TextOption(this.element.id + '_text', this.marginX * 2, (textHeight + this.marginY * 2 + this.padding * 2 + (this.marginY === 2 ? this.controlName === 'RangeNavigator' ? 5 : 3 : 0)), anchor, '');
        const parentElement = textElement(options, font, font.color || this.themeStyle.tooltipBoldLabel, groupElement, this.themeStyle.textStyle);
        const withoutHeader = this.formattedText.length === 1 && this.formattedText[0].indexOf(' : <b>') > -1;
        const isHeader = this.header !== '';
        const size = isHeader && isBoldTag ? 16 : 13;
        for (let k = 0, pointsLength = this.formattedText.length; k < pointsLength; k++) {
            textCollection = this.formattedText[k].replace(/<(b|strong)>/g, '<b>')
                .replace(/<\/(b|strong)>/g, '</b>')
                .split(/<br.*?>/g);
            if (this.isTextWrap && this.header !== this.formattedText[k] && this.formattedText[k].indexOf('<br') === -1) {
                subStringLength = Math.round(this.leftSpace > this.rightSpace ? (this.leftSpace / size) : (this.rightSpace / size));
                textCollection = this.formattedText[k].match(new RegExp('.{1,' + subStringLength + '}', 'g'));
            }
            if (k === 0 && !withoutHeader && this.isTextWrap &&
                (this.leftSpace < headerWidth || isLeftSpace) &&
                (this.rightSpace < headerWidth || isRightSpace)) {
                subStringLength = Math.round(this.leftSpace > this.rightSpace ? (this.leftSpace / size) : (this.rightSpace / size));
                header = headerContent !== '' ? headerContent : this.formattedText[k];
                textCollection = header.match(new RegExp('.{1,' + subStringLength + '}', 'g'));
                this.wrappedText = isBoldTag ? '<b>' + textCollection.join('<br>') + '</b>' : textCollection.join('<br>');
                this.isWrap = textCollection.length > 1;
            }
            if (textCollection[0] === '') {
                continue;
            }
            if ((k !== 0) || (headerContent === '')) {
                this.markerPoint.push(((headerContent !== '' && this.showHeaderLine) ? (this.marginY) : 0) + options.y + height - (textHeight !== 0 ? ((textHeight / this.markerSize) * (parseFloat(font.size || this.themeStyle.textStyle.headerTextSize) / this.markerSize)) : 0));
            }
            for (let i = 0, len = textCollection.length; i < len; i++) { // string value of unicode for LTR is \u200E
                lines = textCollection[i].replace(/<b>/g, '<br><b>').replace(/<\/b>/g, '</b><br>').replace(/:/g, (this.enableRTL) ? '<br>\u200E: <br>' : '<br>\u200E:<br>')
                    .split('<br>');
                if (this.enableRTL && lines.length > 0 && textCollection[i].match(/:/g)) {
                    lines[0] = lines[0].trim();
                    lines.reverse();
                }
                subWidth = 0;
                isColumn = true;
                height += dy;
                for (let j = 0, len = lines.length; j < len; j++) {
                    line = lines[j];
                    if (this.enableRTL && line !== '' && this.isRTLText(line)) {
                        line = line.concat('\u200E');
                    }
                    if (!/\S/.test(line) && line !== '') {
                        line = ' '; //to trim multiple white spaces to single white space
                    }
                    if ((!isColumn && line === ' ') || (line.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '')) {
                        subWidth += line !== ' ' ? spaceWidth : 0;
                        if (isColumn && !isRow) {
                            if (this.header.indexOf('<br') > -1 && k !== 0) {
                                headerSpace += this.header.split(/<br.*?>/g).length;
                            }
                            tspanOption = {
                                x: (this.marginX * 2) + (markerSize + markerPadding),
                                dy: dy + ((isColumn) ? headerSpace : 0), fill: ''
                            };
                            headerSpace = null;
                        }
                        else {
                            if (isRow && isColumn) {
                                tspanOption = {
                                    x: (headerContent === '') ? ((this.marginX * 2) + (markerSize + markerPadding))
                                        : (this.marginX * 2) + (this.isWrap ? (markerSize + markerPadding) : 0)
                                };
                            }
                            else {
                                tspanOption = {};
                            }
                        }
                        isColumn = false;
                        tspanElement = this.renderer.createTSpan(tspanOption, '');
                        parentElement.appendChild(tspanElement);
                        if (line.indexOf('<b>') > -1 || ((isBoldTag && j === 0 && k === 0) && (isHeader || this.isWrap))) {
                            fontWeight = '600';
                            labelColor = this.themeStyle.tooltipBoldLabel;
                            tspanStyle = 'font-weight:' + fontWeight;
                            font.fontWeight = fontWeight;
                            (tspanElement).setAttribute('fill', this.textStyle.color || labelColor);
                        }
                        else {
                            tspanStyle = fontWeight === '600' ? 'font-weight:' + fontWeight : '';
                            font.fontWeight = fontWeight;
                            (tspanElement).setAttribute('fill', this.textStyle.color || labelColor);
                        }
                        if (line.indexOf('</b>') > -1 || ((isBoldTag && j === len - 1 && k === 0) && (isHeader || this.isWrap))) {
                            fontWeight = 'Normal';
                            labelColor = this.themeStyle.tooltipLightLabel;
                        }
                        // eslint-disable-next-line no-useless-escape
                        if (tspanStyle !== '') {
                            tspanElement.style.fontWeight = tspanStyle.split('font-weight:')[1];
                            tspanElement.style.color = tspanElement.getAttribute('fill');
                        }
                        // 'inherit' will apply css style from parent element.
                        tspanElement.style.fontFamily = 'inherit';
                        tspanElement.style.fontStyle = 'inherit';
                        tspanElement.style.fontSize = (this.header === this.formattedText[k]) ? font.size || this.themeStyle.textStyle.headerTextSize : (line.indexOf('<b>') > -1 || line.indexOf('</b>') > -1) ? font.size || this.themeStyle.textStyle.boldTextSize : font.size || this.themeStyle.textStyle.size;
                        tspanElement.style.fontWeight = (this.header === this.formattedText[k] && (this.header.indexOf('<b>') === -1 || this.header.indexOf('</b>') === -1)) ? (this.textStyle.fontWeight || (this.theme.indexOf('Tailwind3') > -1 ? '500' : '600')) : line.indexOf('<b>') > -1 || line.indexOf('</b>') > -1 ? (this.theme.indexOf('Bootstrap5') > -1) ? (this.textStyle.fontWeight || '600') : 'bold' : ((line.indexOf('<b>') === -1 || line.indexOf('</b>') === -1) && (this.theme.indexOf('Bootstrap5') > -1 || this.theme.indexOf('Tailwind3') > -1)) ? this.textStyle.fontWeight || (this.theme.indexOf('Tailwind3') > -1 ? '500' : '600') : (this.textStyle.fontWeight || font.fontWeight);
                        const textFont = extend({}, this.textStyle, null, true)[key];
                        textFont.fontWeight = tspanElement.style.fontWeight;
                        textFont.size = tspanElement.style.fontSize;
                        isRow = false;
                        (tspanElement).textContent = line = this.getTooltipTextContent(line);
                        subWidth += measureText(line, textFont, this.themeStyle.textStyle).width;
                    }
                }
                subWidth -= spaceWidth;
                width = Math.max(width, subWidth);
                contentWidth.push(subWidth);
            }
        }
        this.elementSize = new Size(width + (width > 0 ? (2 * this.marginX) : 0), height);
        this.elementSize.width += (markerSize + markerPadding); // marker size + marker Spacing
        const element = (parentElement.childNodes[0]);
        if (headerContent !== '' && element && !this.isWrap) {
            font.fontWeight = '600';
            const width = (this.elementSize.width + (2 * this.padding)) / 2 - measureText(headerContent, font, this.themeStyle.textStyle, true).width
                / 2;
            element.setAttribute('x', width.toString());
        }
        this.renderContentRTL(parentElement, isHeader, markerSize + markerPadding, contentWidth);
    }
    renderContentRTL(textElement, isHeader, markerSize, contentWidth) {
        if (this.enableRTL) {
            let tspanElement;
            let contentWidthIndex = isHeader ? 1 : 0;
            for (let i = 0; i < textElement.childNodes.length; i++) {
                tspanElement = (textElement.childNodes[i]);
                if ((!isHeader || i > 0) && !isNullOrUndefined(tspanElement.getAttribute('x'))) {
                    tspanElement.setAttribute('x', (this.elementSize.width - (markerSize + contentWidth[contentWidthIndex])).toString());
                    contentWidthIndex++;
                }
            }
        }
    }
    getTooltipTextContent(tooltipText) {
        const characterCollection = tooltipText.match(/<[a-zA-Z\/](.|\n)*?>/g);
        if (isNullOrUndefined(characterCollection)) {
            return tooltipText;
        }
        const isRtlText = this.isRTLText(tooltipText);
        for (let i = 0; i < characterCollection.length; i++) {
            if (this.isValidHTMLElement(characterCollection[i].replace('<', '').replace('/', '').replace('>', '').trim())) {
                tooltipText = tooltipText.replace(characterCollection[i], isRtlText ? '\u200E' : '');
            }
        }
        return tooltipText;
    }
    isValidHTMLElement(element) {
        return document.createElement(element).toString() !== '[object HTMLUnknownElement]';
    }
    isRTLText(tooltipContent) {
        return /[\u0590-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(tooltipContent);
    }
    createTemplate(areaBounds, location) {
        const argsData = { cancel: false, name: 'tooltipRender', tooltip: this };
        this.trigger('tooltipRender', argsData);
        const parent = document.getElementById(this.element.id);
        if (this.isCanvas) {
            this.removeSVG();
        }
        const firstElement = parent.firstElementChild;
        if (firstElement) {
            remove(firstElement);
        }
        if (!argsData.cancel) {
            const elem = createElement('div', { id: this.element.id + 'parent_template' });
            let templateElement;
            if (this.controlName === 'Chart' && this.shared) {
                for (let i = 0; i < this.data.length; i++) {
                    const sharedTemplateElement = this.templateFn(this.data[i], this.controlInstance, elem.id, elem.id + '_blazorTemplate', '');
                    if (i === 0) {
                        templateElement = sharedTemplateElement;
                    }
                    else {
                        if (sharedTemplateElement.length > 1) {
                            templateElement[i].outerHTML = sharedTemplateElement[i].outerHTML || sharedTemplateElement[i].textContent;
                        }
                        else {
                            templateElement[templateElement.length - 1].outerHTML += sharedTemplateElement[0].outerHTML;
                        }
                    }
                }
            }
            else {
                templateElement = this.templateFn(this.data, this.controlInstance, elem.id, elem.id + '_blazorTemplate', '');
            }
            while (templateElement && templateElement.length > 0) {
                if (isBlazor() || templateElement.length === 1) {
                    elem.appendChild(templateElement[0]);
                    templateElement = null;
                }
                else {
                    elem.appendChild(templateElement[0]);
                }
            }
            parent.appendChild(elem);
            const element = this.isCanvas ? elem : this.element;
            const rect = element.getBoundingClientRect();
            this.padding = 0;
            this.elementSize = new Size(rect.width, rect.height);
            const tooltipRect = this.shared ? this.sharedTooltipLocation(areaBounds, this.location.x, this.location.y)
                : this.tooltipLocation(areaBounds, location, new TooltipLocation(0, 0), new TooltipLocation(0, 0));
            if (this.enableAnimation && !this.isFirst && !this.crosshair) {
                this.animateTooltipDiv(this.element, tooltipRect);
            }
            else {
                this.updateDiv(element, tooltipRect.x, tooltipRect.y);
            }
            if (this.blazorTemplate) {
                //Customer issue - F149037  Call back function to handle the blazor tooltip alignment issues
                const tooltipRendered = () => {
                    const rect1 = getElement(thisObject.element.id).getBoundingClientRect();
                    thisObject.elementSize = new Size(rect1.width, rect1.height);
                    const tooltipRect1 = thisObject.tooltipLocation(areaBounds, location, new TooltipLocation(0, 0), new TooltipLocation(0, 0));
                    thisObject.updateDiv(getElement(thisObject.element.id), tooltipRect1.x, tooltipRect1.y);
                };
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const thisObject = this;
                tooltipRendered.bind(thisObject, areaBounds, location);
                updateBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate', this.blazorTemplate.name, this.blazorTemplate.parent, undefined, tooltipRendered);
            }
        }
        else {
            remove(getElement(this.element.id + '_tooltip'));
        }
    }
    sharedTooltipLocation(bounds, x, y) {
        const width = this.elementSize.width + (2 * this.marginX);
        const height = this.elementSize.height + (2 * this.marginY);
        const tooltipRect = new Rect(x + 2 * this.padding, y - height - this.padding, width, height);
        if (tooltipRect.y < bounds.y) {
            tooltipRect.y += (tooltipRect.height + 2 * this.padding);
        }
        if (tooltipRect.y + tooltipRect.height > bounds.y + bounds.height) {
            tooltipRect.y = Math.max((bounds.y + bounds.height) - (tooltipRect.height + 2 * this.padding), bounds.y);
        }
        if (tooltipRect.x + tooltipRect.width > bounds.x + bounds.width) {
            tooltipRect.x = (bounds.x + this.location.x) - (tooltipRect.width + 4 * this.padding);
        }
        if (tooltipRect.x < bounds.x) {
            tooltipRect.x = bounds.x;
        }
        return tooltipRect;
    }
    /** @private */
    getCurrentPosition(bounds, symbolLocation, arrowLocation, tipLocation) {
        const position = this.tooltipPlacement;
        const clipX = this.clipBounds.x;
        const clipY = this.clipBounds.y;
        const markerHeight = this.offset;
        const width = this.elementSize.width + (2 * this.marginX);
        const height = this.elementSize.height + (2 * this.marginY);
        let location = new TooltipLocation(symbolLocation.x, symbolLocation.y);
        if (position === 'Top' || position === 'Bottom') {
            location = new TooltipLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight);
            arrowLocation.x = tipLocation.x = width / 2;
            if (position === 'Bottom') {
                location.y = symbolLocation.y + clipY + markerHeight;
            }
            if (bounds.x + bounds.width < location.x + width) {
                location.x = (bounds.width > width) ? ((bounds.x + bounds.width) - width + 6) : bounds.x;
                arrowLocation.x = tipLocation.x = (bounds.width > width) ? (bounds.x + symbolLocation.x - location.x) : symbolLocation.x;
            }
            else if (bounds.x > location.x) {
                location.x = bounds.x;
                arrowLocation.x = tipLocation.x = symbolLocation.x;
            }
        }
        else {
            location = new TooltipLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
            arrowLocation.y = tipLocation.y = height / 2;
            if (position === 'Left') {
                location.x = symbolLocation.x + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (bounds.y + bounds.height < location.y + height) {
                location.y = (bounds.height > height) ? ((bounds.y + bounds.height) - height + 6) : bounds.y;
                arrowLocation.y = tipLocation.y = (bounds.height > height) ? (bounds.y + symbolLocation.y - location.y) : symbolLocation.y;
            }
            else if (bounds.y > location.y) {
                location.y = bounds.y;
                arrowLocation.y = tipLocation.y = symbolLocation.y;
            }
        }
        return new Rect(location.x, location.y, width, height);
    }
    // tslint:disable-next-line:max-func-body-length
    /** @private */
    tooltipLocation(bounds, symbolLocation, arrowLocation, tipLocation) {
        if (!isNullOrUndefined(this.tooltipPlacement)) {
            const tooltipRect = this.getCurrentPosition(bounds, symbolLocation, arrowLocation, tipLocation);
            return tooltipRect;
        }
        let location = new TooltipLocation(symbolLocation.x, symbolLocation.y);
        const width = this.elementSize.width + (2 * this.marginX);
        const height = this.elementSize.height + (2 * this.marginY);
        const markerHeight = this.offset;
        const clipX = this.clipBounds.x;
        const clipY = this.clipBounds.y;
        const boundsX = bounds.x;
        const boundsY = bounds.y;
        this.outOfBounds = false;
        if (!this.inverted) {
            location = new TooltipLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * (this.allowHighlight ? this.highlightPadding : this.padding)) -
                this.arrowPadding - markerHeight);
            arrowLocation.x = tipLocation.x = width / 2;
            if ((location.y < boundsY || (this.isNegative)) && !(this.controlName === 'Progressbar')) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            if (location.y + height + this.arrowPadding > boundsY + bounds.height) {
                location.y = Math.min(symbolLocation.y, boundsY + bounds.height) + clipY
                    - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight;
            }
            if (((location.x + width > boundsX + bounds.width) && location.y < boundsY || (this.isNegative)) && !(this.controlName === 'Progressbar')) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            tipLocation.x = width / 2;
            if (location.x < boundsX && !(this.controlName === 'Progressbar')) {
                arrowLocation.x -= (boundsX - location.x);
                tipLocation.x -= (boundsX - location.x);
                location.x = boundsX;
            }
            if (location.x + width > boundsX + bounds.width && !(this.controlName === 'Progressbar')) {
                arrowLocation.x += ((location.x + width) - (boundsX + bounds.width));
                tipLocation.x += ((location.x + width) - (boundsX + bounds.width));
                location.x -= ((location.x + width) - (boundsX + bounds.width));
            }
            if (location.x < boundsX && !(this.controlName === 'Progressbar')) {
                arrowLocation.x -= (boundsX - location.x);
                tipLocation.x -= (boundsX - location.x);
                location.x = boundsX;
            }
            if (arrowLocation.x + this.arrowPadding > width - this.rx) {
                arrowLocation.x = width - this.rx - this.arrowPadding;
                tipLocation.x = width - this.rx - this.arrowPadding;
            }
            if (arrowLocation.x - this.arrowPadding < this.rx) {
                arrowLocation.x = tipLocation.x = this.rx + this.arrowPadding;
            }
            if (this.controlName === 'Chart') {
                if (((bounds.x + bounds.width) - (location.x + arrowLocation.x)) < this.areaMargin + this.arrowPadding ||
                    (location.x + arrowLocation.x) < this.areaMargin + this.arrowPadding) {
                    this.outOfBounds = true;
                }
                if (this.template && (location.y < 0)) {
                    location.y = symbolLocation.y + clipY + markerHeight;
                }
                if (!withInAreaBounds(location.x, location.y, bounds) || this.outOfBounds) {
                    this.inverted = !this.inverted;
                    this.revert = true;
                    location = new TooltipLocation(symbolLocation.x + markerHeight + clipX, symbolLocation.y + clipY - this.elementSize.height / 2 - (this.padding));
                    tipLocation.x = arrowLocation.x = 0;
                    tipLocation.y = arrowLocation.y = height / 2;
                    if ((location.x + this.arrowPadding + width > boundsX + bounds.width) || (this.isNegative)) {
                        location.x = (symbolLocation.x > boundsX + bounds.width ? bounds.width : symbolLocation.x)
                            + clipX - markerHeight - (this.arrowPadding + width);
                    }
                    if (location.x < boundsX) {
                        location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + markerHeight + clipX;
                    }
                    if (location.y <= boundsY) {
                        tipLocation.y -= (boundsY - location.y);
                        arrowLocation.y -= (boundsY - location.y);
                        location.y = boundsY;
                    }
                    if (location.y + height >= bounds.height + boundsY) {
                        arrowLocation.y += ((location.y + height) - (bounds.height + boundsY));
                        tipLocation.y += ((location.y + height) - (bounds.height + boundsY));
                        location.y -= ((location.y + height) - (bounds.height + boundsY));
                    }
                    if ((this.arrowPadding) + arrowLocation.y > height - this.ry) {
                        arrowLocation.y = height - this.arrowPadding - this.ry;
                        tipLocation.y = height;
                    }
                    if (arrowLocation.y - this.arrowPadding < this.ry) {
                        arrowLocation.y = (this.arrowPadding) + this.ry;
                        tipLocation.y = 0;
                    }
                }
            }
        }
        else {
            location = new TooltipLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
            arrowLocation.y = tipLocation.y = height / 2;
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (this.isNegative)) {
                location.x = (symbolLocation.x > bounds.width + bounds.x ? bounds.width : symbolLocation.x)
                    + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (location.x < boundsX) {
                location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + clipX + markerHeight;
            }
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width)) {
                location.x = (symbolLocation.x > bounds.width + bounds.x ? bounds.width : symbolLocation.x)
                    + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (location.y <= boundsY) {
                arrowLocation.y -= (boundsY - location.y);
                tipLocation.y -= (boundsY - location.y);
                location.y = boundsY;
            }
            if (location.y + height >= boundsY + bounds.height) {
                arrowLocation.y += ((location.y + height) - (boundsY + bounds.height));
                tipLocation.y += ((location.y + height) - (boundsY + bounds.height));
                location.y -= ((location.y + height) - (boundsY + bounds.height));
            }
            if (arrowLocation.y + this.arrowPadding > height - this.ry) {
                arrowLocation.y = height - this.ry - this.arrowPadding;
                tipLocation.y = height;
            }
            if (arrowLocation.y - this.arrowPadding < this.ry) {
                arrowLocation.y = tipLocation.y = this.ry + this.arrowPadding;
            }
            if (this.controlName === 'Chart') {
                if ((location.y + arrowLocation.y) < this.areaMargin + this.arrowPadding ||
                    ((bounds.y + bounds.height) - (location.y + arrowLocation.y)) < this.areaMargin + this.arrowPadding) {
                    this.outOfBounds = true;
                }
                if (!withInAreaBounds(location.x, location.y, bounds) || this.outOfBounds) {
                    this.inverted = !this.inverted;
                    location = new TooltipLocation(symbolLocation.x + clipX - this.padding - this.elementSize.width / 2, symbolLocation.y + clipY - this.elementSize.height - (2 * this.padding) - markerHeight - this.arrowPadding);
                    this.revert = true;
                    tipLocation.x = arrowLocation.x = width / 2;
                    tipLocation.y = arrowLocation.y = 0;
                    if (location.y < boundsY || (this.isNegative)) {
                        location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + markerHeight + clipY;
                    }
                    if (location.y + this.arrowPadding + height > boundsY + bounds.height) {
                        location.y = Math.min(symbolLocation.y, boundsY + bounds.height) + clipY
                            - this.elementSize.height - (2 * this.padding) - markerHeight - this.arrowPadding;
                    }
                    tipLocation.x = width / 2;
                    if (location.x < boundsX) {
                        tipLocation.x -= (boundsX - location.x);
                        arrowLocation.x -= (boundsX - location.x);
                        location.x = boundsX;
                    }
                    if (location.x + width > bounds.width + boundsX) {
                        arrowLocation.x += ((location.x + width) - (bounds.width + boundsX));
                        tipLocation.x += ((location.x + width) - (bounds.width + boundsX));
                        location.x -= ((location.x + width) - (bounds.width + boundsX));
                    }
                    if ((this.arrowPadding) + arrowLocation.x > width - this.rx) {
                        tipLocation.x = width - this.rx - (this.arrowPadding);
                        arrowLocation.x = width - this.rx - (this.arrowPadding);
                    }
                    if (arrowLocation.x - (this.arrowPadding) < this.rx) {
                        arrowLocation.x = tipLocation.x = this.rx + (this.arrowPadding);
                    }
                }
            }
        }
        return new Rect(location.x, location.y, width, height);
    }
    animateTooltipDiv(tooltipDiv, rect) {
        let x = parseFloat(tooltipDiv.style.left);
        let y = parseFloat(tooltipDiv.style.top);
        const duration = (this.duration === 0 && animationMode === 'Enable') ? 300 : this.duration;
        if ((this.controlName === 'Chart' && this.shared) && !this.enableRTL) {
            const transformValues = this.element.style.transform.split(/[(),\s]+/);
            x = parseFloat(transformValues[1]);
            y = parseFloat(transformValues[2]);
            tooltipDiv.style.transition = 'transform ' + duration + 'ms ease';
        }
        let currenDiff;
        new Animation({}).animate(tooltipDiv, {
            duration: duration,
            progress: (args) => {
                currenDiff = (args.timeStamp / args.duration);
                tooltipDiv.style.animation = null;
                if ((this.controlName === 'Chart' && this.shared) && !this.enableRTL) {
                    tooltipDiv.style.transform = 'translate(' + (x + (rect.x - x)) + 'px,' + (y + rect.y - y) + 'px)';
                    tooltipDiv.style.left = '';
                    tooltipDiv.style.top = '';
                }
                else if (this.controlName === 'Chart' && this.showNearestTooltip) {
                    tooltipDiv.style.transition = 'left ' + args.duration + 'ms ease-out, top ' + args.duration + 'ms ease-out';
                    tooltipDiv.style.left = rect.x + 'px';
                    tooltipDiv.style.top = rect.y + 'px';
                }
                else {
                    tooltipDiv.style.left = (x + currenDiff * (rect.x - x)) + 'px';
                    tooltipDiv.style.top = (y + currenDiff * (rect.y - y)) + 'px';
                    tooltipDiv.style.transform = this.controlName === 'RangeNavigator' ? tooltipDiv.style.transform : '';
                }
            },
            end: (model) => {
                this.updateDiv(tooltipDiv, rect.x, rect.y);
                this.trigger('animationComplete', { tooltip: this });
            }
        });
    }
    updateDiv(tooltipDiv, x, y) {
        if ((this.controlName === 'Chart' && this.shared && !this.crosshair) && !this.enableRTL) {
            tooltipDiv.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            tooltipDiv.style.left = '';
            tooltipDiv.style.top = '';
        }
        else {
            tooltipDiv.style.left = x + 'px';
            tooltipDiv.style.top = y + 'px';
            tooltipDiv.style.transform = this.controlName === 'RangeNavigator' ? tooltipDiv.style.transform : '';
        }
    }
    updateTemplateFn() {
        if (this.template) {
            try {
                if (typeof this.template !== 'function' && document.querySelectorAll(this.template).length) {
                    this.templateFn = compile(document.querySelector(this.template).innerHTML.trim());
                }
                else {
                    this.templateFn = compile(this.template);
                }
            }
            catch (e) {
                this.templateFn = compile(this.template);
            }
        }
    }
    /** @private */
    fadeOut() {
        const tooltipElement = (this.isCanvas && !this.template) ? getElement(this.element.id + '_svg') :
            getElement(this.element.id);
        const tooltipDiv = getElement(this.element.id);
        if (tooltipElement) {
            let tooltipGroup = tooltipElement.firstChild;
            if (tooltipGroup.nodeType !== Node.ELEMENT_NODE) {
                tooltipGroup = tooltipElement.firstElementChild;
            }
            if (this.isCanvas && !this.template) {
                tooltipGroup = document.getElementById(this.element.id + '_group') ? document.getElementById(this.element.id + '_group') :
                    tooltipGroup;
            }
            if (!tooltipGroup) {
                return null;
            }
            let opacity = parseFloat(tooltipGroup.getAttribute('opacity'));
            opacity = !isNullOrUndefined(opacity) ? opacity : 1;
            new Animation({}).animate(tooltipGroup, {
                duration: 200,
                progress: (args) => {
                    //  tooltipGroup.removeAttribute('e-animate');
                    this.progressAnimation(tooltipGroup, opacity, (args.timeStamp / args.duration));
                },
                end: () => {
                    this.fadeOuted = true;
                    this.endAnimation(tooltipGroup);
                    tooltipDiv.style.transition = '';
                }
            });
        }
    }
    progressAnimation(tooltipGroup, opacity, timeStamp) {
        tooltipGroup.style.animation = '';
        tooltipGroup.setAttribute('opacity', (opacity - timeStamp).toString());
    }
    /*
     * @hidden
     */
    endAnimation(tooltipGroup) {
        tooltipGroup.setAttribute('opacity', '0');
        if (this.template) {
            tooltipGroup.style.display = 'none';
        }
        this.trigger('animationComplete', { tooltip: this });
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData() {
        const keyEntity = [];
        return this.addOnPersist(keyEntity);
    }
    /**
     * Get component name
     *
     *  @private
     */
    getModuleName() {
        return 'tooltip';
    }
    /**
     * To destroy the accumulationcharts
     *
     * @private
     */
    destroy() {
        super.destroy();
        this.element.classList.remove('e-tooltip');
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        if (this.blazorTemplate) {
            resetBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate');
        }
        this.isFirst = false;
        this.render();
    }
};
__decorate([
    Property(false)
], Tooltip.prototype, "enable", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "shared", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "crosshair", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "enableShadow", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "fill", void 0);
__decorate([
    Property('')
], Tooltip.prototype, "header", void 0);
__decorate([
    Property(0.75)
], Tooltip.prototype, "opacity", void 0);
__decorate([
    Complex({ size: '12px', fontWeight: null, color: null, fontStyle: 'Normal', fontFamily: null }, TextStyle)
], Tooltip.prototype, "textStyle", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "template", void 0);
__decorate([
    Property(true)
], Tooltip.prototype, "enableAnimation", void 0);
__decorate([
    Property(300)
], Tooltip.prototype, "duration", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "inverted", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "isNegative", void 0);
__decorate([
    Complex({ color: null, width: null }, TooltipBorder)
], Tooltip.prototype, "border", void 0);
__decorate([
    Property([])
], Tooltip.prototype, "content", void 0);
__decorate([
    Property(10)
], Tooltip.prototype, "markerSize", void 0);
__decorate([
    Complex({ x: 0, y: 0 }, ToolLocation)
], Tooltip.prototype, "clipBounds", void 0);
__decorate([
    Property([])
], Tooltip.prototype, "palette", void 0);
__decorate([
    Property([])
], Tooltip.prototype, "shapes", void 0);
__decorate([
    Complex({ x: 0, y: 0 }, ToolLocation)
], Tooltip.prototype, "location", void 0);
__decorate([
    Property(0)
], Tooltip.prototype, "offset", void 0);
__decorate([
    Property(4)
], Tooltip.prototype, "rx", void 0);
__decorate([
    Property(4)
], Tooltip.prototype, "ry", void 0);
__decorate([
    Property(5)
], Tooltip.prototype, "marginX", void 0);
__decorate([
    Property(5)
], Tooltip.prototype, "marginY", void 0);
__decorate([
    Property(7)
], Tooltip.prototype, "arrowPadding", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "data", void 0);
__decorate([
    Property('Material')
], Tooltip.prototype, "theme", void 0);
__decorate([
    Complex({ x: 0, y: 0, width: 0, height: 0 }, AreaBounds)
], Tooltip.prototype, "areaBounds", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "availableSize", void 0);
__decorate([
    Property()
], Tooltip.prototype, "blazorTemplate", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "isCanvas", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "isTextWrap", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "isFixed", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "tooltipPlacement", void 0);
__decorate([
    Property(null)
], Tooltip.prototype, "controlInstance", void 0);
__decorate([
    Property('')
], Tooltip.prototype, "controlName", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "showNearestTooltip", void 0);
__decorate([
    Event()
], Tooltip.prototype, "tooltipRender", void 0);
__decorate([
    Event()
], Tooltip.prototype, "loaded", void 0);
__decorate([
    Event()
], Tooltip.prototype, "animationComplete", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "enableRTL", void 0);
__decorate([
    Property(false)
], Tooltip.prototype, "allowHighlight", void 0);
__decorate([
    Property(true)
], Tooltip.prototype, "showHeaderLine", void 0);
Tooltip = __decorate([
    NotifyPropertyChanges
], Tooltip);

export { AreaBounds, CanvasRenderer, CustomizeOption, PathOption, Rect, Side, Size, SvgRenderer, TextOption, TextStyle, ToolLocation, Tooltip, TooltipBorder, TooltipLocation, calculateShapes, drawSymbol, findDirection, getElement, getTooltipThemeColor, measureText, removeElement, textElement, withInAreaBounds };
//# sourceMappingURL=ej2-svg-base.es2015.js.map
