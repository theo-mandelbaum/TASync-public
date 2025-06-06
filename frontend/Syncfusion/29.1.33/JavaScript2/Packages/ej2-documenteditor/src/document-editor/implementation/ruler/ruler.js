/* eslint-disable @typescript-eslint/ban-types */
import { HelperMethods } from '../editor/editor-helper';
import { Size } from '../utility/size';
/**
 * @private
 */
var Ruler = /** @class */ (function () {
    /**
     *  Constructor for creating the Ruler Component
     *
     * @param {string | HTMLElement} element The ruler element.
     * @param {RulerHelper} rulerHelper The ruler helper.
     */
    function Ruler(element, rulerHelper) {
        /**
         * Defines the unique interval of the ruler.
         *
         * @default 6
         */
        this.interval = 4;
        /**
         * Sets the segment width of the ruler.
         *
         * @default 36
         */
        this.segmentWidth = 47.9988;
        /**
         * Defines the orientation of the ruler.
         *
         * @default 'Horizontal'
         */
        this.orientation = 'Horizontal';
        /**
         * Defines the alignment of the tick in the ruler.
         *
         *
         * @default 'RightOrBottom'
         */
        this.tickAlignment = 'RightOrBottom';
        /**
         * Defines the color of the marker.
         *
         * @default 'red'
         */
        this.markerColor = 'red';
        /**
         * Defines the thickness of the ruler.
         *
         * @default 15
         */
        this.thickness = 15;
        /**
         * Sets the segment width of the ruler.
         *
         * @default null
         * @deprecated
         */
        this.arrangeTick = null;
        /**
         * Defines the length of the ruler.
         *
         * @default 400
         */
        this.length = 400;
        /**   @private  */
        this.offset = 0;
        /**   @private  */
        this.scale = 1;
        /**   @private  */
        this.rulerStartValue = 1584;
        /**   @private  */
        this.zeroPosition = HelperMethods.convertPointToPixel(1584);
        /**   @private  */
        this.addSegmentWidth = false;
        this.element = element;
        this.rulerHelper = rulerHelper;
    }
    /**
     * @private
     * @returns {void} To append the ruler
     */
    Ruler.prototype.appendTo = function () {
        this.preRender();
        this.render();
    };
    /**
     * Initializes the values of private members.
     *
     * @returns {void}  Initializes the values of private members.
     * @private
     */
    Ruler.prototype.preRender = function () {
        this.unWireEvents();
        this.wireEvents();
    };
    /**
     * Renders the rulers.
     *
     * @returns {void}  Renders the rulers.
     * @private
     */
    Ruler.prototype.render = function () {
        this.updateRulerGeometry();
        //this.renderComplete();
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    Ruler.prototype.getModuleName = function () {
        return 'Ruler';
    };
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    Ruler.prototype.destroy = function () {
        var _this = this;
        this.unWireEvents();
        // this.notify('destroy', {});
        // super.destroy();
        if (this.rulerSpacediv) {
            this.rulerSpacediv.remove();
            this.rulerSpacediv = null;
        }
        if (this.rulerSVGElement) {
            this.rulerSVGElement.childNodes.forEach(function (element) {
                _this.rulerSVGElement.removeChild(element);
                element = null;
            });
            this.rulerSVGElement.innerHTML = '';
            this.rulerSVGElement.remove();
            this.rulerSVGElement = null;
        }
        this.element.classList.remove('e-ruler');
    };
    /**
     * Refreshes the ruler when the Ruler properties are updated\
     *
     * @returns {  void}    Refreshes the ruler when the Ruler properties are updated .\
     * @param {RulerModel} newProp - provide the newProp value.
     * @param {RulerModel} oldProp - provide the oldProp value.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // public onPropertyChanged(newProp: RulerModel, oldProp: RulerModel): void {
    //     for (const prop of Object.keys(newProp)) {
    //         switch (prop) {
    //             case 'interval':
    //             case 'segmentWidth':
    //             case 'tickAlignment':
    //             case 'markerColor':
    //             case 'thickness':
    //                 this.updateRuler();
    //                 break;
    //         }
    //     }
    // }
    /**
     * @param {boolean} show - provide the show value.
     * @private
     * @returns {void} To show or hide the ruler
     */
    Ruler.prototype.showHideRuler = function (show) {
        if (show) {
            this.element.style.display = 'block';
        }
        else {
            this.element.style.display = 'none';
        }
    };
    Ruler.prototype.updateRulerGeometry = function () {
        this.element.style.textAlign = 'left';
        this.renderRulerSpace();
        this.updateRuler();
    };
    Ruler.prototype.renderRulerSpace = function () {
        var rulerGeometry = this.getRulerGeometry();
        this.rulerSpacediv = document.getElementById(this.element.id + '_ruler_space');
        if (!this.rulerSpacediv) {
            this.rulerSpacediv = this.rulerHelper.createHtmlElement('div', {
                'id': this.element.id + '_ruler_space',
                'style': 'height:' + rulerGeometry.height + 'px;width:' + rulerGeometry.width + 'px;cssFloat:' + 'left;'
            });
            this.element.appendChild(this.rulerSpacediv);
        }
        return this.rulerSpacediv;
    };
    /**
     * @private
     *
     * @returns {void} To update the ruler
     */
    Ruler.prototype.updateRuler = function () {
        var rulerSize = this.getRulerSize();
        var rulerGeometry = this.getRulerGeometry();
        var length = 0;
        var offset = 0;
        var availableSize = new Size();
        this.rulerSVGElement = this.getRulerSVG(rulerGeometry);
        if (this.rulerSVGElement) {
            length = this.length;
            availableSize.height = rulerSize;
            offset = this.offset;
            if (length && length !== Infinity) {
                var unitLength = length;
                var unitOffset = offset;
                this.updateSegments(unitOffset, (unitLength + Math.abs(unitOffset)), this.rulerSVGElement, rulerSize);
            }
        }
    };
    Ruler.prototype.updateSegments = function (start, end, svg, rulerSize) {
        var run = start;
        var trans = { trans: 0 };
        this.rulerStartValue = HelperMethods.convertPixelToPoint(this.zeroPosition);
        while (run < end) {
            var rulerSegment = this.getNewSegment(run, svg);
            if (rulerSegment) {
                svg.appendChild(rulerSegment.segment);
                run = this.updateSegment(start, end, rulerSegment, run, trans, rulerSize);
            }
        }
        this.addSegmentWidth = false;
    };
    Ruler.prototype.updateSegment = function (start, end, rulerSegment, run, trans, rulerSize) {
        var segWidth = this.updateSegmentWidth(this.scale);
        if (run === start) {
            this.startValue = Math.floor(start / segWidth) * segWidth / this.scale;
            this.startValue = (this.startValue % 1) !== 0 ? Number((this.startValue).toFixed(1)) : this.startValue;
            rulerSegment.label.textContent = this.rulerStartValue.toString();
            this.defStartValue = run = this.startValue * this.scale;
            if (this.orientation === 'Horizontal') {
                this.hRulerOffset = start - run;
            }
            else {
                this.vRulerOffset = start - run;
            }
        }
        else {
            //  this.startValue = (run / this.scale);
            this.startValue = HelperMethods.convertPixelToPoint(run);
            this.startValue = (this.startValue % 1) !== 0 ? Number((this.startValue).toFixed(1)) : this.startValue;
            //  rulerSegment.label.textContent = (this.startValue).toString();
            var labeltext = void 0;
            if (this.rulerStartValue === 0) {
                this.addSegmentWidth = true;
            }
            if (this.addSegmentWidth) {
                labeltext = Math.abs(this.rulerStartValue + 36);
            }
            else {
                labeltext = Math.abs(this.rulerStartValue - 36);
            }
            // const labeltext = this.subtractAndAdd(this.rulerStartValue, 36);
            rulerSegment.label.textContent = (labeltext).toString();
            this.rulerStartValue = labeltext;
            //  if (this.addSegmentWidth) {
            //   if ((1584 - this.startValue) <= this.leftMargin && !((1584 -this.startValue) >= (HelperMethods.convertPixelToPoint(this.pageWidth) - this.rightMargin))) {
            //  rulerSegment.label.textContent = (this.startValue - this.leftMargin).toString();
            // if (this.startValue >= 1584 && (Math.round(HelperMethods.convertPointToPixel(this.startValue)) < ((2112 - HelperMethods.convertPointToPixel(this.startMargin)) + ((pageLength) - HelperMethods.convertPointToPixel(this.endMargin))))) {
            //     const rectElement = rulerSegment.segment.querySelector('.e-ruler-segment1') as SVGRectElement;
            //     var rect = rulerSegment.segment.firstChild;
            //     rectElement.setAttribute("fill", "white");
            // }
            //}
        }
        this.updateTickLabel(rulerSegment, rulerSize);
        var translate = (this.orientation === 'Horizontal') ? ((trans.trans + 0.5) + ',0.5') : ('0.5,' + (trans.trans + 0.5));
        rulerSegment.segment.setAttribute('transform', 'translate(' + translate + ') scale(' + 1 + ',1)');
        trans.trans += segWidth * this.scale;
        run += segWidth;
        return run;
    };
    Ruler.prototype.updateTickLabel = function (rulerSegment, rulerSize) {
        var bBox = rulerSegment.segment.lastChild.getBBox();
        var isHorizontal = (this.orientation === 'Horizontal') ? true : false;
        var isRightOrBottom = (this.tickAlignment === 'RightOrBottom') ? true : false;
        var x = isHorizontal ? -4 : 0;
        var y = isHorizontal ? (isRightOrBottom ? (rulerSize / 2 + (11 / 2) - (11 / 2)) :
            (rulerSize / 2 + (11 / 2))) : bBox.height;
        if (isHorizontal) {
            y = y + 2;
        }
        if (!isHorizontal) {
            x = x + 10;
            y = y + 2;
        }
        var translate = isRightOrBottom ? (-(bBox.width + 2) + ',' + ((rulerSize / 2) - bBox.height)) :
            (-(bBox.width + 2) + ',' + ((rulerSize / 2) - bBox.height / 2));
        var attr = isHorizontal ? { 'x': x, 'y': y } :
            { 'x': x, 'y': y, 'transform': 'rotate(270)' + 'translate(' + translate + ')' };
        this.rulerHelper.setAttributeSvg(rulerSegment.segment.lastChild, attr);
    };
    Ruler.prototype.getNewSegment = function (run, svg) {
        var segment = this.createNewTicks(run, svg);
        var label = this.createTickLabel(svg, segment);
        return { segment: segment, label: label };
    };
    Ruler.prototype.createNewTicks = function (run, svg) {
        var tick;
        var tickInterval;
        var segmentWidth = this.updateSegmentWidth(this.scale);
        //let g: SVGElement;
        var attr = { 'class': 'e-de-ruler-segment' };
        var g = this.rulerHelper.createSvgElement('g', attr);
        //let rect: SVGElement;
        var rectattr = { 'class': 'e-de-ruler-segment1' };
        var rect = this.rulerHelper.createSvgElement('rect', rectattr);
        var width = this.orientation === 'Horizontal' ? (segmentWidth * this.scale) : 15;
        var height = this.orientation === 'Horizontal' ? 15 : segmentWidth;
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        rect.setAttribute('fill', 'lightgrey');
        // g.appendChild(rect);
        for (var i = 0; i < this.interval; i++) {
            tickInterval = segmentWidth / this.interval;
            tick = this.createTick(svg, tickInterval, i + 1, run);
            if (tick) {
                g.appendChild(tick);
            }
        }
        return g;
    };
    Ruler.prototype.getLinePoint = function (svg, tickInterval, length) {
        var segmentWidth = this.updateSegmentWidth(this.scale);
        var rulerSize = this.getRulerSize();
        tickInterval = tickInterval * (length - 1);
        length = ((tickInterval % segmentWidth) === 0) ? rulerSize : rulerSize * 0.3;
        return length;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Ruler.prototype.createTick = function (svg, tickInterval, length, run) {
        var ruler;
        //let line: SVGElement;
        var linePoint = this.getLinePoint(svg, tickInterval, length);
        var rulerSize = this.getRulerSize();
        //let args: IArrangeTickOptions;
        //let attr: Object;
        var isHorizontal = (this.orientation === 'Horizontal') ? true : false;
        var isRightOrBottom = (this.tickAlignment === 'RightOrBottom') ? true : false;
        // const arrangeTick: Function = getFunction(this.arrangeTick);
        // // eslint-disable-next-line
        // const args:IArrangeTickOptions = { ruler: ruler, tickLength: linePoint, tickInterval: ((this.segmentWidth / this.interval) * (length - 1)) };
        // if (arrangeTick) {
        //     arrangeTick(args);
        // }
        // linePoint = args.tickLength;
        var point = tickInterval * (length - 1) * this.scale;
        var x1 = isHorizontal ? point : (isRightOrBottom ? rulerSize : 0);
        var x2 = isHorizontal ? point : (isRightOrBottom ? (rulerSize - linePoint) : (rulerSize - (rulerSize - linePoint)));
        var y1 = isHorizontal ? (isRightOrBottom ? rulerSize : (rulerSize - (rulerSize - linePoint))) : point;
        var y2 = isHorizontal ? (isRightOrBottom ? (rulerSize - linePoint) : 0) : point;
        var line;
        if (y2 !== 0) {
            y1 = y1 - 6;
            y2 = y2 - 6;
            if (!isHorizontal) {
                x1 = x1 - 6;
                x2 = x2 - 6;
            }
            var attr = { 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'stroke-width': '0.25', 'stroke': 'black' };
            line = this.rulerHelper.createSvgElement('line', attr);
            line.setAttribute('class', 'e-de-ruler-tick');
        }
        return line;
    };
    Ruler.prototype.createTickLabel = function (svg, segment) {
        var text;
        if (segment) {
            var attr = { 'class': 'e-de-ruler-tick-label', 'style': 'font-weight: 400' };
            text = this.rulerHelper.createSvgElement('text', attr);
            segment.appendChild(text);
        }
        return text;
    };
    /**
     * @private
     * @param {number} scale
     */
    /**
     * updateSegmentWidth method\
     *
     * @returns {number}    updateSegmentWidth method .\
     * @param {string} scale - provide the scale value.
     *
     * @private
     */
    Ruler.prototype.updateSegmentWidth = function (scale) {
        if (this.segmentWidth !== 100) {
            return this.segmentWidth;
        }
        var five = 25;
        var multiples = 1;
        var div;
        //let scaleRound: number;
        var fifty = 100;
        var scaleRound = Math.pow(2, Math.round(Math.log(scale) / Math.log(2)));
        div = fifty;
        div = (fifty / scaleRound);
        while (div > 100) {
            multiples /= 10;
            div /= 10;
        }
        while (div < 25) {
            multiples *= 10;
            div *= 10;
        }
        if (div >= five && div % five !== 0) {
            div = Math.round(div / five) * five;
        }
        return div * scale / multiples;
    };
    // private createMarkerLine(rulerSvg: SVGSVGElement, rulerObj: HTMLElement, attr: Object): SVGElement {
    //     let line: SVGElement;
    //     if (rulerObj) {
    //         line = rulerSvg.getElementById(rulerObj.id + '_marker') as SVGElement;
    //         if (line) {
    //             line.parentNode.removeChild(line);
    //         }
    //         line = this.rulerHelper.createSvgElement('line', attr);
    //     }
    //     return line;
    // }
    // /**
    //  * updateSegmentWidth method\
    //  *
    //  * @returns {void}    updateSegmentWidth method .\
    //  * @param {HTMLElement} rulerObj - Defines the ruler Object
    //  * @param {PointModel} currentPoint - Defines the current point for ruler Object
    //  * @param {number} offset - Defines the offset ruler Object
    //  *
    //  * @private
    //  */
    // public drawRulerMarker(rulerObj: HTMLElement, currentPoint: PointModel, offset: number): void {
    //     let rulerSvg: SVGSVGElement;
    //     let rulerSize: number;
    //     let scale: number;
    //     let diff: number;
    //     let i: number;
    //     let attr: Object;
    //     let line: SVGElement;
    //     const isHorizontal: boolean = this.orientation === 'Horizontal' ? true : false;
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const rulerSvgElements: NodeListOf<SVGSVGElement> | any = rulerObj.getElementsByTagName('svg');
    //     for (i = 0; i < rulerSvgElements.length; i++) {
    //         if (rulerSvgElements[parseInt(i.toString(), 10)]) {
    //             rulerSvg = rulerSvgElements[parseInt(i.toString(), 10)];
    //         }
    //         break;
    //     }
    //     if (rulerSvg) {
    //         rulerSize = this.getRulerSize();
    //         attr = {
    //             'id': rulerObj.id + '_marker', 'x1': 0, 'y1': 0, 'x2': (isHorizontal ? 0 : rulerSize),
    //             'y2': (isHorizontal ? rulerSize : 0), 'stroke': this.markerColor, 'stroke-width': 1.5,
    //             'class': 'e-d-ruler-marker'
    //         };
    //         line = this.createMarkerLine(rulerSvg, rulerObj, attr);
    //         scale = this.scale;
    //         diff = this.offset - this.defStartValue;
    //         const point: number = isHorizontal ? currentPoint.x : currentPoint.y;
    //         const move: number = (point * scale) + offset + diff;
    //         line.setAttribute('transform', 'translate(' + (isHorizontal ? ((move + 0.5) + ' 0.5') : ('0.5 ' + (move + 0.5))) + ')');
    //         rulerSvg.appendChild(line);
    //     }
    // }
    Ruler.prototype.getRulerGeometry = function () {
        if (this.orientation === 'Horizontal') {
            return new Size(this.length, this.element ? this.element.getBoundingClientRect().height : 0);
        }
        else {
            return new Size(this.element ? this.element.getBoundingClientRect().width : 0, this.length);
        }
    };
    Ruler.prototype.getRulerSize = function () {
        return this.thickness;
    };
    Ruler.prototype.getRulerSVG = function (rulerGeometry) {
        var rulerSpace;
        var rulerSize = this.getRulerSize();
        var svg;
        if (this.element) {
            rulerSpace = document.getElementById(this.element.id + '_ruler_space');
            if (rulerSpace) {
                var attr = {
                    'id': this.element.id + '_Ruler_svg',
                    width: this.orientation === 'Horizontal' ? this.length : rulerSize + 'px',
                    height: this.orientation === 'Horizontal' ? rulerSize : (rulerGeometry.height) + 'px',
                    style: 'position:inherit;'
                };
                svg = this.rulerHelper.createSvgElement('svg', attr);
                if (rulerSpace.childNodes.length > 0) {
                    for (var i = rulerSpace.childNodes.length - 1; i >= 0; i--) {
                        rulerSpace.childNodes[parseInt(i.toString(), 10)].parentNode.removeChild(rulerSpace.childNodes[parseInt(i.toString(), 10)]);
                    }
                }
                rulerSpace.appendChild(svg);
            }
        }
        return svg;
    };
    /**
     * Method to bind events for the ruler \
     *
     * @returns {void}    Method to bind events for the ruler .\
     * @private
     */
    Ruler.prototype.wireEvents = function () {
        //wire Events
    };
    /**
     *  Method to unbind events for the ruler \
     *
     * @returns {void}     Method to unbind events for the ruler .\
     * @private
     */
    Ruler.prototype.unWireEvents = function () {
        //unWire Events
    };
    return Ruler;
}());
export { Ruler };
