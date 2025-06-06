import { ChildProperty, Property, Complex, Collection, isNullOrUndefined, extend, createElement, SanitizeHtmlHelper, compile, remove, Browser, merge, select, print, Component, Internationalization, EventHandler, Touch, Event, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip as Tooltip$1, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { DataUtil } from '@syncfusion/ej2-data';
import { PdfPageOrientation, PdfDocument, SizeF, PdfBitmap } from '@syncfusion/ej2-pdf-export';

/**
 * Specifies HeatMaps Themes
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var Theme;
(function (Theme) {
    /** @private */
    Theme.heatMapTitleFont = {
        size: '15px',
        fontWeight: '500',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.titleFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI',
        textOverflow: 'None'
    };
    /** @private */
    Theme.axisTitleFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.axisLabelFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI',
        textOverflow: 'None'
    };
    /** @private */
    Theme.legendLabelFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI',
        textOverflow: 'None'
    };
    /** @private */
    Theme.rectLabelFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI',
        textOverflow: 'None'
    };
    /** @private */
    Theme.tooltipFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI',
        textOverflow: 'None'
    };
})(Theme || (Theme = {}));
/**
 * Functions to check whether target object implement specific interface.
 *
 * @param  { HeatMapTheme } theme - specifies the value.
 * @returns { IThemeStyle } returns the theme style
 * @private
 */
function getThemeColor(theme) {
    let style;
    switch (theme.toLowerCase()) {
        case 'highcontrastlight':
        case 'highcontrast':
            style = {
                heatMapTitle: '#ffffff',
                axisTitle: '#ffffff',
                axisLabel: '#ffffff',
                cellBorder: '#EEEEEE',
                background: '#000000',
                cellTextColor: '#000000',
                toggledColor: '#000000',
                emptyCellColor: '#EEEEEE',
                legendLabel: '#ffffff',
                palette: [{ 'color': '#BEE7EE' },
                    { 'color': '#85c4cf' },
                    { 'color': '#4CA1AF' }]
            };
            break;
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                heatMapTitle: '#ffffff',
                axisTitle: '#ffffff',
                axisLabel: '#DADADA',
                cellBorder: '#EEEEEE',
                background: '#000000',
                cellTextColor: '#000000',
                toggledColor: '#000000',
                emptyCellColor: '#EEEEEE',
                legendLabel: '#ffffff',
                palette: [{ 'color': '#BEE7EE' },
                    { 'color': '#85c4cf' },
                    { 'color': '#4CA1AF' }]
            };
            break;
        case 'bootstrap4':
            style = {
                heatMapTitle: '#212529',
                axisTitle: '#212529',
                axisLabel: '#212529',
                cellBorder: '#E9ECEF',
                background: '#FFFFFF',
                cellTextColor: '#212529',
                toggledColor: '#ffffff',
                emptyCellColor: '#E9ECEF',
                legendLabel: '#212529',
                palette: [{ 'color': '#BEE7EE' },
                    { 'color': '#85c4cf' },
                    { 'color': '#4CA1AF' }]
            };
            break;
        case 'tailwind':
            style = {
                heatMapTitle: '#374151',
                axisTitle: '#374151',
                axisLabel: '#6B7280',
                cellBorder: '#E5E7EB',
                background: 'transparent',
                cellTextColor: '#111827',
                toggledColor: 'transparent',
                emptyCellColor: '#E5E7EB',
                legendLabel: '#374151',
                palette: [{ 'color': '#5A61F6' },
                    { 'color': '#65A30D' },
                    { 'color': '#14B8A6' }]
            };
            break;
        case 'tailwinddark':
            style = {
                heatMapTitle: '#D1D5DB',
                axisTitle: '#D1D5DB',
                axisLabel: '#9CA3AF',
                cellBorder: '#4B5563',
                background: 'transparent',
                cellTextColor: '#FFFFFF',
                toggledColor: 'transparent',
                emptyCellColor: '#374151',
                legendLabel: '#D1D5DB',
                palette: [{ 'color': '#8B5CF6' },
                    { 'color': '#22D3EE' },
                    { 'color': '#F87171' }]
            };
            break;
        case 'tailwind3':
            style = {
                heatMapTitle: '#111827',
                axisTitle: '#111827',
                axisLabel: '#4B5563',
                cellBorder: '#E5E7EB',
                background: 'transparent',
                cellTextColor: '#111827',
                toggledColor: 'transparent',
                emptyCellColor: '#E5E7EB',
                legendLabel: '#4B5563',
                palette: [{ 'color': '#2F4074' },
                    { 'color': '#03B4B4' },
                    { 'color': '#0D72DE' }]
            };
            break;
        case 'tailwind3dark':
            style = {
                heatMapTitle: '#FFFFFF',
                axisTitle: '#FFFFFF',
                axisLabel: '#D1D5DB',
                cellBorder: '#282F3C',
                background: 'transparent',
                cellTextColor: '#FFFFFF',
                toggledColor: 'transparent',
                emptyCellColor: '#282F3C',
                legendLabel: '#D1D5DB',
                palette: [{ 'color': '#8029F1' },
                    { 'color': '#1ABC9C' },
                    { 'color': '#0D72DE' }]
            };
            break;
        case 'bootstrap5':
            style = {
                heatMapTitle: '#212529',
                axisTitle: '#212529',
                axisLabel: '#212529',
                cellBorder: 'transparent',
                background: 'transparent',
                toggledColor: '#E9ECEF',
                emptyCellColor: '#E9ECEF',
                legendLabel: '#212529',
                palette: [{ 'color': '#DC3545' },
                    { 'color': '#FFC107' },
                    { 'color': '#D63384' }]
            };
            break;
        case 'bootstrap5dark':
            style = {
                heatMapTitle: '#DEE2E6',
                axisTitle: '#DEE2E6',
                axisLabel: '#DEE2E6',
                cellBorder: 'transparent',
                background: 'transparent',
                toggledColor: '#343A40',
                emptyCellColor: '#343A40',
                legendLabel: '#DEE2E6',
                palette: [{ 'color': '#DC3545' },
                    { 'color': '#FFC107' },
                    { 'color': '#D63384' }]
            };
            break;
        case 'fluent':
            style = {
                heatMapTitle: '#201F1E',
                axisTitle: '#201F1E',
                axisLabel: '#201F1E',
                cellBorder: '#EDEBE9',
                background: 'transparent',
                cellTextColor: '#111827',
                toggledColor: 'transparent',
                emptyCellColor: '#EDEBE9',
                legendLabel: '#201F1E',
                palette: [{ 'color': '#EDEBE9' },
                    { 'color': '#614570' },
                    { 'color': '#4C6FB1' }]
            };
            break;
        case 'fluentdark':
            style = {
                heatMapTitle: '#F3F2F1',
                axisTitle: '#F3F2F1',
                axisLabel: '#F3F2F1',
                cellBorder: '#EDEBE9',
                background: 'transparent',
                cellTextColor: '#FFFFFF',
                toggledColor: 'transparent',
                emptyCellColor: '#292827',
                legendLabel: '#F3F2F1',
                palette: [{ 'color': '#292827' },
                    { 'color': '#2A72D5' },
                    { 'color': '#43B786' }]
            };
            break;
        case 'material3':
            style = {
                heatMapTitle: '#1C1B1F',
                axisTitle: '#1C1B1F',
                axisLabel: '#1C1B1F',
                cellBorder: '#C4C7C5',
                background: 'transparent',
                cellTextColor: '#1C1B1F',
                toggledColor: '#F6F0FB',
                emptyCellColor: '#F6F0FB',
                legendLabel: '#49454E',
                palette: [{ 'color': '#6200EE' },
                    { 'color': '#E77A16' },
                    { 'color': '#82C100' }]
            };
            break;
        case 'material3dark':
            style = {
                heatMapTitle: '#E6E1E5',
                axisTitle: '#E6E1E5',
                axisLabel: '#E6E1E5',
                cellBorder: '#444746',
                background: 'transparent',
                cellTextColor: '#E6E1E5',
                toggledColor: '#49454F',
                emptyCellColor: '#49454E',
                legendLabel: '#CAC4D0',
                palette: [{ 'color': '#4EAAFF' },
                    { 'color': '#FA4EAB' },
                    { 'color': '#FFF500' }]
            };
            break;
        case 'fluent2':
            style = {
                heatMapTitle: '#242424',
                axisTitle: '#242424',
                axisLabel: '#242424',
                cellBorder: 'transparent',
                background: 'transparent',
                cellTextColor: '#242424',
                toggledColor: '#EDEBE9',
                emptyCellColor: '#EDEBE9',
                legendLabel: '#242424',
                palette: [{ 'color': '#6200EE' },
                    { 'color': '#09AF74' },
                    { 'color': '#0076E5' }]
            };
            break;
        case 'fluent2dark':
        case 'fluent2highcontrast':
            style = {
                heatMapTitle: '#FFFFFF',
                axisTitle: '#FFFFFF',
                axisLabel: '#FFFFFF',
                cellBorder: 'transparent',
                background: 'transparent',
                cellTextColor: '#FFFFFF',
                toggledColor: '#292827',
                emptyCellColor: '#292827',
                legendLabel: '#FFFFFF',
                palette: [{ 'color': '#9BB449' },
                    { 'color': '#2A72D5' },
                    { 'color': '#43B786' }]
            };
            break;
        default:
            style = {
                heatMapTitle: '#424242',
                axisTitle: '#424242',
                axisLabel: '#686868',
                cellBorder: '#EEEEEE',
                cellTextColor: '#000000',
                toggledColor: '#ffffff',
                background: '#FFFFFF',
                emptyCellColor: '#EEEEEE',
                legendLabel: '#353535',
                palette: [{ 'color': '#BEE7EE' },
                    { 'color': '#85c4cf' },
                    { 'color': '#4CA1AF' }]
            };
            break;
    }
    return style;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the text in heatmap.
 */
class Font extends ChildProperty {
}
__decorate([
    Property('16px')
], Font.prototype, "size", void 0);
__decorate([
    Property('')
], Font.prototype, "color", void 0);
__decorate([
    Property('Segoe UI')
], Font.prototype, "fontFamily", void 0);
__decorate([
    Property('Normal')
], Font.prototype, "fontWeight", void 0);
__decorate([
    Property('Normal')
], Font.prototype, "fontStyle", void 0);
__decorate([
    Property('Center')
], Font.prototype, "textAlignment", void 0);
__decorate([
    Property('Trim')
], Font.prototype, "textOverflow", void 0);
/**
 * Sets and gets the options to configures the margins of the heatmap.
 */
class Margin extends ChildProperty {
}
__decorate([
    Property(10)
], Margin.prototype, "left", void 0);
__decorate([
    Property(10)
], Margin.prototype, "right", void 0);
__decorate([
    Property(10)
], Margin.prototype, "top", void 0);
__decorate([
    Property(10)
], Margin.prototype, "bottom", void 0);
/**
 * Sets and gets the options to customize the borders in the heatmap.
 */
class Border extends ChildProperty {
}
__decorate([
    Property('')
], Border.prototype, "color", void 0);
__decorate([
    Property(1)
], Border.prototype, "width", void 0);
__decorate([
    Property('')
], Border.prototype, "radius", void 0);
/**
 * Sets and gets the options to customize the tooltip borders in the heatmap.
 */
class TooltipBorder extends ChildProperty {
}
__decorate([
    Property('')
], TooltipBorder.prototype, "color", void 0);
__decorate([
    Property(0)
], TooltipBorder.prototype, "width", void 0);
/**
 * Sets and gets the options to configure the mapping value for size and color in bubble cell type.
 */
class BubbleData extends ChildProperty {
}
__decorate([
    Property(null)
], BubbleData.prototype, "size", void 0);
__decorate([
    Property(null)
], BubbleData.prototype, "color", void 0);
/**
 * Sets and gets the options to customize the title of heatmap.
 */
class Title extends ChildProperty {
}
__decorate([
    Property('')
], Title.prototype, "text", void 0);
__decorate([
    Complex({}, Font)
], Title.prototype, "textStyle", void 0);
/**
 * Sets and gets the options to apply the fill color value for cell color range.
 */
class FillColor extends ChildProperty {
}
__decorate([
    Property('#eeeeee')
], FillColor.prototype, "minColor", void 0);
__decorate([
    Property('#eeeeee')
], FillColor.prototype, "maxColor", void 0);
/**
 * Sets and gets the options to customize palette colors.
 */
class PaletteCollection extends ChildProperty {
}
__decorate([
    Property(null)
], PaletteCollection.prototype, "value", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "color", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "label", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "startValue", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "endValue", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "minColor", void 0);
__decorate([
    Property(null)
], PaletteCollection.prototype, "maxColor", void 0);
/**
 * Sets and gets the options to customize the label border.
 */
class AxisLabelBorder extends ChildProperty {
}
__decorate([
    Property('#b5b5b5')
], AxisLabelBorder.prototype, "color", void 0);
__decorate([
    Property(1)
], AxisLabelBorder.prototype, "width", void 0);
__decorate([
    Property('Rectangle')
], AxisLabelBorder.prototype, "type", void 0);
/**
 * Sets and gets the options to customize the size of the bubble heatmap cell type.
 */
class BubbleSize extends ChildProperty {
}
__decorate([
    Property('0%')
], BubbleSize.prototype, "minimum", void 0);
__decorate([
    Property('100%')
], BubbleSize.prototype, "maximum", void 0);
/**
 * Sets and gets the options to configure the multi-level labels.
 */
class MultiLevelCategories extends ChildProperty {
}
__decorate([
    Property(null)
], MultiLevelCategories.prototype, "start", void 0);
__decorate([
    Property(null)
], MultiLevelCategories.prototype, "end", void 0);
__decorate([
    Property('')
], MultiLevelCategories.prototype, "text", void 0);
__decorate([
    Property(null)
], MultiLevelCategories.prototype, "maximumTextWidth", void 0);
/**
 * Sets and gets the options to customize the multi-level labels.
 */
class MultiLevelLabels extends ChildProperty {
}
__decorate([
    Property('Center')
], MultiLevelLabels.prototype, "alignment", void 0);
__decorate([
    Property('Wrap')
], MultiLevelLabels.prototype, "overflow", void 0);
__decorate([
    Complex(Theme.axisLabelFont, Font)
], MultiLevelLabels.prototype, "textStyle", void 0);
__decorate([
    Complex({ color: '#b5b5b5', width: 1, type: 'Rectangle' }, AxisLabelBorder)
], MultiLevelLabels.prototype, "border", void 0);
__decorate([
    Collection([], MultiLevelCategories)
], MultiLevelLabels.prototype, "categories", void 0);
/**
 * Internal class used to maintain colorcollection.
 *
 * @private
 */
class ColorCollection {
    constructor(value, color, label, startValue, endValue, minColor, maxColor) {
        this.value = value;
        this.color = color;
        this.label = label;
        this.startValue = startValue;
        this.endValue = endValue;
        this.minColor = minColor;
        this.maxColor = maxColor;
    }
}
/**
 * Specifies the current data of the bubble cell.
 */
class BubbleTooltipData {
    /**
     * @param {string} mappingName - Specifies the mapping name.
     * @param {number} bubbleData - Specifies the bubble data.
     * @param {string} valueType - Specifies the value type.
     * @private
     */
    constructor(mappingName, bubbleData, valueType) {
        this.mappingName = mappingName;
        this.bubbleData = bubbleData;
        this.valueType = valueType;
    }
}
/**
 * Internal class used to maintain legend colorcollection.
 *
 * @private
 */
class LegendColorCollection {
    constructor(value, color, label, startValue, endValue, minColor, maxColor, isHidden) {
        this.value = value;
        this.color = color;
        this.label = label;
        this.startValue = startValue;
        this.endValue = endValue;
        this.minColor = minColor;
        this.maxColor = maxColor;
        this.isHidden = isHidden;
    }
}
/**
 * class used to maintain xAxis labels details for multipleRow label intersect action.
 *
 * @private
 */
class MultipleRow {
    constructor(start, end, index, label, row) {
        this.index = 1;
        this.row = 1;
        this.start = start;
        this.end = end;
        this.index = index;
        this.label = label;
        this.row = row;
    }
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the color palette of heatmap.
 */
class PaletteSettings extends ChildProperty {
}
__decorate$1([
    Collection([{}], PaletteCollection)
], PaletteSettings.prototype, "palette", void 0);
__decorate$1([
    Property('Gradient')
], PaletteSettings.prototype, "type", void 0);
__decorate$1([
    Property('')
], PaletteSettings.prototype, "emptyPointColor", void 0);
__decorate$1([
    Property('Table')
], PaletteSettings.prototype, "colorGradientMode", void 0);
__decorate$1([
    Complex({}, FillColor)
], PaletteSettings.prototype, "fillColor", void 0);
/**
 * Helper class for colormapping
 */
class RgbColor {
    constructor(r, g, b) {
        this.R = r;
        this.G = g;
        this.B = b;
    }
}
class CellColor {
    constructor(heatMap) {
        this.heatMap = heatMap;
    }
    /**
     * To convert hexa color to RGB.
     *
     * @returns {any}
     * @private
     */
    convertToRGB(value, colorMapping) {
        let previousOffset = this.heatMap.isColorRange ? colorMapping[0].startValue : colorMapping[0].value;
        let nextOffset = 0;
        let i = 0;
        let previousColor;
        let nextColor;
        if (this.heatMap.isColorRange && this.heatMap.paletteSettings.type === 'Gradient') {
            for (i = 0; i < colorMapping.length; i++) {
                const offset = Number(colorMapping[i].endValue);
                if (value <= offset && value >= Number(colorMapping[i].startValue)) {
                    nextOffset = offset;
                    previousColor = this.heatMap.colorCollection[i].minColor;
                    nextColor = this.heatMap.colorCollection[i].maxColor;
                }
                else if (colorMapping[0].startValue !== this.heatMap.dataSourceMinValue && value < colorMapping[0].startValue) {
                    nextOffset = colorMapping[0].startValue;
                    previousOffset = this.heatMap.dataSourceMinValue;
                    previousColor = this.heatMap.paletteSettings.fillColor.minColor;
                    nextColor = this.heatMap.paletteSettings.fillColor.maxColor;
                    break;
                }
                else if (value > offset && value <= (i === (colorMapping.length - 1) ? this.heatMap.dataSourceMaxValue :
                    colorMapping[i + 1].startValue)) {
                    nextOffset = (i === (colorMapping.length - 1)) ? this.heatMap.dataSourceMaxValue : colorMapping[i + 1].startValue;
                    previousOffset = offset;
                    previousColor = this.heatMap.paletteSettings.fillColor.minColor;
                    nextColor = this.heatMap.paletteSettings.fillColor.maxColor;
                    break;
                }
                else {
                    nextOffset = offset;
                    previousOffset = offset;
                }
            }
        }
        else {
            for (i = 1; i < colorMapping.length; i++) {
                const offset = Number(colorMapping[i].value);
                if (value <= offset) {
                    nextOffset = offset;
                    previousColor = this.getEqualColor(colorMapping, previousOffset);
                    nextColor = this.getEqualColor(colorMapping, nextOffset);
                    break;
                }
                else {
                    nextOffset = offset;
                    previousOffset = offset;
                }
            }
        }
        let percent = 0;
        const full = (nextOffset) - previousOffset;
        percent = (value - previousOffset) / full;
        percent = isNaN(percent) || !isFinite(percent) ? 0 : percent;
        return this.getPercentageColor(percent, previousColor, nextColor);
    }
    /**
     * To convert RGB to HEX.
     *
     * @returns {string}
     * @private
     */
    rgbToHex(r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    /**
     * To convert Component to HEX.
     *
     * @returns {string}
     * @private
     */
    componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    /**
     * To get similar color.
     *
     * @returns {string}
     * @private
     */
    getEqualColor(list, offset) {
        for (let i = 0; i < list.length; i++) {
            if (Number(list[i].value) === offset) {
                let color = list[i].color;
                if (!isNullOrUndefined(color)) {
                    if (color.indexOf('rgb') !== -1) {
                        color = this.convertToHex(color);
                    }
                    else if (color.indexOf('#') === -1) {
                        color = '#FFFFFF';
                    }
                }
                else {
                    color = '#FFFFFF';
                }
                return color;
            }
        }
        return '#00000';
    }
    /**
     * To convert RGB to HEX.
     *
     * @returns {string}
     * @private
     */
    convertToHex(color) {
        let itemColor = color.substr(3);
        itemColor = itemColor.split('(')[1].split(')')[0];
        const colorSplit = itemColor.split(',');
        itemColor = this.rgbToHex(parseInt(colorSplit[0], 10), parseInt(colorSplit[1], 10), parseInt(colorSplit[2], 10));
        return itemColor;
    }
    /**
     * To get RGB for percentage value.
     *
     * @returns {any}
     * @private
     */
    getPercentageColor(percent, previous, next) {
        const nextColor = next.split('#')[1];
        const prevColor = previous.split('#')[1];
        const r = this.getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
        const g = this.getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
        const b = this.getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
        return new RgbColor(r, g, b);
    }
    /**
     * To convert numbet to percentage.
     *
     * @returns {any}
     * @private
     */
    getPercentage(percent, previous, next) {
        const full = next - previous;
        return Math.round((previous + (full * percent)));
    }
    /**
     * To get complete color Collection.
     *
     * @private
     */
    getColorCollection() {
        const heatMap = this.heatMap;
        heatMap.colorCollection = [];
        heatMap.legendColorCollection = [];
        let range;
        for (let j = 0; j < this.heatMap.paletteSettings.palette.length; j++) {
            if (this.heatMap.paletteSettings.palette[j].startValue === null ||
                this.heatMap.paletteSettings.palette[j].endValue === null) {
                this.heatMap.isColorRange = false;
                break;
            }
            else {
                this.heatMap.isColorRange = true;
            }
        }
        const minValue = heatMap.bubbleSizeWithColor ? heatMap.minColorValue : heatMap.dataSourceMinValue;
        const maxValue = heatMap.bubbleSizeWithColor ? heatMap.maxColorValue : heatMap.dataSourceMaxValue;
        heatMap.emptyPointColor = heatMap.paletteSettings.emptyPointColor ? heatMap.paletteSettings.emptyPointColor :
            heatMap.themeStyle.emptyCellColor;
        const tempcolorMapping = this.orderbyOffset(this.heatMap.isColorRange ? heatMap.paletteSettings.palette :
            heatMap.paletteSettings.palette && heatMap.paletteSettings.palette.length > 1 ?
                heatMap.paletteSettings.palette : heatMap.themeStyle.palette);
        if (!tempcolorMapping.isCompact) {
            if (heatMap.paletteSettings.type === 'Gradient') {
                range = (maxValue - minValue) / (tempcolorMapping.offsets.length - 1);
            }
            else {
                range = (maxValue - minValue) / (tempcolorMapping.offsets.length);
            }
            if (tempcolorMapping.offsets.length >= 2) {
                for (let index = 0; index < tempcolorMapping.offsets.length; index++) {
                    heatMap.colorCollection.push(new ColorCollection((Math.round(((minValue) + (index * range)) * 100) / 100), tempcolorMapping.offsets[index].color, tempcolorMapping.offsets[index].label, tempcolorMapping.offsets[index].startValue, tempcolorMapping.offsets[index].endValue, tempcolorMapping.offsets[index].minColor, tempcolorMapping.offsets[index].maxColor));
                    heatMap.legendColorCollection.push(new LegendColorCollection(Math.round(((minValue) + (index * range)) * 100) / 100, tempcolorMapping.offsets[index].color, tempcolorMapping.offsets[index].label, tempcolorMapping.offsets[index].startValue, tempcolorMapping.offsets[index].endValue, tempcolorMapping.offsets[index].minColor, tempcolorMapping.offsets[index].maxColor, false));
                }
            }
        }
        else {
            heatMap.colorCollection = tempcolorMapping.offsets;
            heatMap.legendColorCollection = extend([], tempcolorMapping.offsets, null, true);
        }
        if (!this.heatMap.isColorRange) {
            this.updateLegendColorCollection(minValue, maxValue, tempcolorMapping);
        }
    }
    /**
     * To update legend color Collection.
     *
     * @private
     */
    updateLegendColorCollection(minValue, maxValue, tempcolorMapping) {
        if (this.heatMap.paletteSettings.type === 'Fixed' && (tempcolorMapping.isCompact || tempcolorMapping.isLabel)) {
            return;
        }
        if (Math.round(minValue * 100) / 100 < this.heatMap.legendColorCollection[0].value) {
            this.heatMap.legendColorCollection.unshift(new LegendColorCollection(Math.round(minValue * 100) / 100, this.heatMap.legendColorCollection[0].color, this.heatMap.legendColorCollection[0].label, this.heatMap.legendColorCollection[0].startValue, this.heatMap.legendColorCollection[0].endValue, this.heatMap.legendColorCollection[0].minColor, this.heatMap.legendColorCollection[0].maxColor, true));
        }
        if (Math.round(maxValue * 100) / 100 > this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].value) {
            this.heatMap.legendColorCollection.push(new LegendColorCollection(Math.round(maxValue * 100) / 100, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].color, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].label, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].startValue, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].endValue, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].minColor, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].maxColor, true));
        }
    }
    /**
     * To get ordered palette color collection.
     *
     * @private
     */
    orderbyOffset(offsets) {
        const returnCollection = new PaletterColor();
        const key = this.heatMap.isColorRange ? 'to' : 'value';
        const label = 'label';
        returnCollection.isCompact = true;
        returnCollection.isLabel = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCollection.offsets = offsets.sort((a, b) => {
            if (isNullOrUndefined(a[label]) && isNullOrUndefined(b[label])) {
                returnCollection.isLabel = false;
            }
            if (!isNullOrUndefined(a[key]) && !isNullOrUndefined(b[key])) {
                return a[key] - b[key];
            }
            else {
                returnCollection.isCompact = false;
                return a;
            }
        });
        if (!returnCollection.isCompact) {
            returnCollection.offsets = this.heatMap.paletteSettings.palette && this.heatMap.paletteSettings.palette.length > 1 ?
                this.heatMap.paletteSettings.palette : this.heatMap.themeStyle.palette;
        }
        return returnCollection;
    }
    /**
     * To get color depends to value.
     *
     * @private
     */
    getColorByValue(text) {
        let color = '';
        let rbg;
        let compareValue = 0;
        if (text.toString() !== '') {
            if (this.heatMap.cellSettings.tileType === 'Bubble' &&
                (this.heatMap.cellSettings.bubbleType === 'Size' || this.heatMap.cellSettings.bubbleType === 'Sector')) {
                color = this.heatMap.isColorRange ? this.heatMap.colorCollection[0].minColor : this.heatMap.colorCollection[0].color;
            }
            else if (this.heatMap.paletteSettings.type === 'Fixed') {
                for (let y = 0; y < this.heatMap.colorCollection.length; y++) {
                    compareValue = this.heatMap.isColorRange ? this.heatMap.paletteSettings.palette[y].startValue :
                        this.heatMap.colorCollection[y + 1] ? this.heatMap.colorCollection[y + 1].value :
                            this.heatMap.colorCollection[y].value;
                    const singleValue = this.heatMap.dataSourceMinValue === this.heatMap.dataSourceMaxValue;
                    if (this.heatMap.isColorRange) {
                        let legendRange;
                        if ((text <= this.heatMap.colorCollection[y].endValue &&
                            text >= this.heatMap.colorCollection[y].startValue)) {
                            if (this.heatMap.legendVisibilityByCellType) {
                                legendRange = this.heatMap.legendModule.legendRange;
                            }
                            color = (this.heatMap.legendVisibilityByCellType && legendRange[y] &&
                                !legendRange[y].visible) ?
                                this.heatMap.themeStyle.toggledColor : this.heatMap.colorCollection[y].minColor;
                        }
                        else if (color === '') {
                            color = this.heatMap.paletteSettings.fillColor.minColor;
                        }
                    }
                    else {
                        if ((text <= compareValue && singleValue && y === 0) || text < compareValue ||
                            (text >= compareValue && y === this.heatMap.colorCollection.length - 1)) {
                            let legendRange;
                            if (this.heatMap.legendVisibilityByCellType) {
                                legendRange = this.heatMap.legendModule.legendRange;
                            }
                            color = (this.heatMap.legendVisibilityByCellType && legendRange[y] &&
                                !legendRange[y].visible) ?
                                this.heatMap.themeStyle.toggledColor : this.heatMap.colorCollection[y].color;
                            break;
                        }
                    }
                }
            }
            else {
                if (this.heatMap.paletteSettings.colorGradientMode !== 'Table') {
                    this.getColorCollection();
                }
                if (text < this.heatMap.colorCollection[0].value && !this.heatMap.isColorRange) {
                    color = this.heatMap.colorCollection[0].color;
                }
                else if (text > this.heatMap.colorCollection[this.heatMap.colorCollection.length - 1].value &&
                    !this.heatMap.isColorRange) {
                    color = this.heatMap.colorCollection[this.heatMap.colorCollection.length - 1].color;
                }
                else {
                    rbg = this.convertToRGB(text, this.heatMap.colorCollection);
                    color = this.rgbToHex(rbg.R, rbg.G, rbg.B);
                }
            }
        }
        else {
            color = this.heatMap.emptyPointColor;
        }
        return color;
    }
    /**
     * @returns {void}
     * @private
     */
    destroy() {
        this.heatMap = null;
    }
}

/**
 * Function to check whether target object implement specific interface
 *
 * @param  {string} value - specifies the value
 * @param  {number} containerSize - specifies the containerSize
 * @returns {number} returns the number
 * @hidden
 */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param  {string} text - specifies the text
 * @param  {FontModel} font - specifies the font
 * @returns {Size} returns the number
 * @hidden
 */
function measureText(text, font) {
    const breakText = text || '';
    let htmlObject = document.getElementById('heatmapmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'heatmapmeasuretext' });
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
    htmlObject.innerText = (breakText.indexOf('<br>') > -1 || breakText.indexOf('<br/>') > -1) ? breakText : text;
    htmlObject.style.position = 'absolute';
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.fontSize = (font.size).indexOf('px') !== -1 ? font.size : font.size + 'px';
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily;
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
/** @private */
class TextElement {
    constructor(fontModel, fontColor) {
        this['font-size'] = fontModel.size;
        this['font-style'] = fontModel.fontStyle.toLowerCase();
        this['font-family'] = fontModel.fontFamily;
        this['font-weight'] = fontModel.fontWeight.toLowerCase();
        this.fill = fontColor ? fontColor : '';
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param  {number} width - specifies the text
 * @param  {number} leftPadding - specifies the font
 * @param  {number} rightPadding - specifies the font
 * @param  {FontModel} titleStyle - specifies the font
 * @returns {number} returns the number
 * @hidden
 */
function titlePositionX(width, leftPadding, rightPadding, titleStyle) {
    let positionX;
    if (titleStyle.textAlignment === 'Near') {
        positionX = leftPadding;
    }
    else if (titleStyle.textAlignment === 'Center') {
        positionX = leftPadding + width / 2;
    }
    else {
        positionX = width + leftPadding;
    }
    return positionX;
}
/**
 * Specifies the size information of an element.
 */
class Size {
    /**
     * @param {number} width - Specifies the width.
     * @param {number} height - Specifies the height.
     * @private */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
/** @private */
class CustomizeOption {
    constructor(id) {
        this.id = id;
    }
}
/** @private */
class PathOption extends CustomizeOption {
    constructor(id, fill, width, color, opacity, dashArray, d) {
        super(id);
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color ? color : '';
        this['stroke-width'] = parseFloat(width.toString());
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string | Function } template - Specifies the template
 * @param { HeatMap } heatMap - Specifies the heatmap
 * @param { HTMLElement }  labelTemplate - Specifies the label template
 * @param { any } rectPosition - Specifies the rect datas
 * @param { any } xLabels - Specifies the xlabels
 * @param { any } yLabels - Specifies the ylabels
 * @param { number } index - Specifies the index
 * @returns {any} templateFunction -  returns the size
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLabelTemplate(template, heatMap, labelTemplate, rectPosition, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
xLabels, yLabels, index) {
    if (heatMap.enableHtmlSanitizer && typeof template === 'string') {
        template = SanitizeHtmlHelper.sanitize(template);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const templateFunction = getTemplateFunction(template, heatMap);
    let rectData = null;
    const dataSource = heatMap.dataSource;
    if (heatMap.dataSourceSettings.isJsonData && (heatMap.dataSourceSettings.adaptorType === 'Cell' || heatMap.dataSourceSettings.adaptorType === 'Table')) {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        const yLabelData = heatMap.yAxis.valueType === 'Numeric' ? heatMap.yAxis.labels : yLabels;
        // eslint-disable-next-line @typescript-eslint/tslint/config
        const xLabelData = heatMap.xAxis.valueType === 'Numeric' ? heatMap.xAxis.labels : xLabels;
        // eslint-disable-next-line @typescript-eslint/tslint/config
        dataSource.forEach((item) => {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            const yDataMapping = heatMap.dataSourceSettings.adaptorType === 'Cell' ? Object.keys(item).some((key) => item[key] === yLabelData[rectPosition.yIndex]) : (Object.prototype.hasOwnProperty.call(item, yLabelData[rectPosition.yIndex]));
            if (Object.keys(item).some((key) => item[key] === xLabelData[rectPosition.xIndex])
                && yDataMapping) {
                rectData = item;
            }
        });
    }
    else {
        rectData = { value: rectPosition.value, xLabel: xLabels[rectPosition.xIndex], yLabel: yLabels[rectPosition.yIndex] };
    }
    if (!isNullOrUndefined(templateFunction)) {
        const tempElement = templateFunction(rectData, heatMap, templateFunction, heatMap.element.id + '_Template' + index, false);
        const templateElement = convertElement(tempElement, heatMap.element.id + '_LabelTemplate_' + index);
        templateElement.style.cssText = 'opacity: 1; display: flex; align-items: center; justify-content: center; z-index: 2; position: absolute;' + 'top:' + rectPosition.y + 'px;' + 'left:' + rectPosition.x + 'px;' + 'height:' + rectPosition.height + 'px;' + 'width:' + rectPosition.width + 'px;';
        for (let i = 0; i < templateElement.children.length; i++) {
            templateElement.children[i].style.pointerEvents = 'none';
        }
        labelTemplate.appendChild(templateElement);
    }
    return labelTemplate;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string | Function } template - Specifies the template
 * @param { HeatMap } heatMap - Specifies the heatmap
 * @returns {any}  -  returns the size
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTemplateFunction(template, heatMap) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let templateFn = null;
    try {
        if (typeof template !== 'function' && document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (heatMap.isVue || heatMap.isVue3) {
            templateFn = compile(template);
        }
        else if (typeof template === 'function') {
            templateFn = compile(template);
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { HTMLCollection } element - Specifies the heatmap
 * @param { string } elementId - Specifies the template
 * @returns { HTMLElement }  -  returns the size
 * @private
 */
function convertElement(element, elementId) {
    const childElement = createElement('div', {
        id: elementId
    });
    childElement.style.cssText = 'position: absolute;pointer-events: auto;';
    let elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    return childElement;
}
/**
 * Class to define currentRect private property.
 *
 * @private
 */
class CurrentRect {
    constructor(x, y, width, height, value, id, xIndex, yIndex, xValue, yValue, visible, displayText, textId, allowCollection) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.id = id;
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.xValue = xValue;
        this.yValue = yValue;
        this.visible = visible;
        this.displayText = displayText;
        this.textId = textId;
        /** @private */
        this.allowCollection = allowCollection;
    }
}
/**
 * Specifies the details of the selected cells.
 */
class SelectedCellDetails {
    /**
     * @param {number | BubbleTooltipData} value - Specifies the value.
     * @param {string} xLabel - Specifies the x label.
     * @param {string} yLabel - Specifies the y label.
     * @param {number} xValue - Specifies the x value.
     * @param {number} yValue - Specifies the y value.
     * @param {Element} cellElement - Specifies the cell element.
     * @param {number} xPosition - Specifies the x position.
     * @param {number} yPosition - Specifies the y position.
     * @param {number} width - Specifies the width.
     * @param {number} height - Specifies the height.
     * @param {number} x - Specifies the x value.
     * @param {number} y - Specifies the y value.
     * @private
     */
    constructor(value, xLabel, yLabel, xValue, yValue, cellElement, xPosition, yPosition, width, height, x, y) {
        this.value = value;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
        this.xValue = xValue;
        this.yValue = yValue;
        this.cellElement = cellElement;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}
/**
 * Class to define property to draw rectangle.
 *
 * @private
 */
class RectOption extends PathOption {
    constructor(id, fill, border, opacity, rect, borderColor, rx, ry, transform, dashArray) {
        super(id, fill, border.width, borderColor, opacity, dashArray);
        this.y = rect.y;
        this.x = rect.x;
        this.height = rect.height > 0 ? rect.height : 0;
        this.width = rect.width > 0 ? rect.width : 0;
        this.rx = rx ? rx : 0;
        this.ry = ry ? ry : 0;
        this.transform = transform ? transform : '';
    }
}
/**
 * Class to define property to draw circle.
 *
 * @private
 */
class CircleOption extends PathOption {
    constructor(id, fill, border, opacity, borderColor, cx, cy, r) {
        super(id, fill, border.width, borderColor, opacity);
        this.cx = cx ? cx : 0;
        this.cy = cy ? cy : 0;
        this.r = r ? r : 0;
    }
}
/**
 * Helper Class to define property to draw rectangle.
 *
 * @private
 */
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/**
 * Class to define property to draw text.
 *
 * @private
 */
class TextOption extends TextElement {
    constructor(id, basic, element, fontColor) {
        super(element, fontColor);
        this.transform = '';
        this['dominant-baseline'] = 'auto';
        this.role = 'region';
        this.labelRotation = 0;
        this.baseline = 'auto';
        this.id = id;
        this.x = basic.x;
        this.y = basic.y;
        this['text-anchor'] = basic['text-anchor'];
        this.text = basic.text;
        this['aria-label'] = basic.text;
        this.transform = basic.transform;
        this.labelRotation = basic.labelRotation;
        this['dominant-baseline'] = basic['dominant-baseline'];
        this.baseline = basic.baseline;
        this.dy = basic.dy;
    }
}
/**
 * Helper Class to define property to draw text.
 *
 * @private
 */
class TextBasic {
    constructor(x, y, anchor, text, labelRotation, transform, baseLine, dy) {
        this.transform = '';
        this['dominant-baseline'] = 'auto';
        this.labelRotation = 0;
        this.baseline = 'auto';
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this['text-anchor'] = anchor ? anchor : 'start';
        this.text = text ? text : '';
        this['aria-label'] = text;
        this.transform = transform ? transform : '';
        this.labelRotation = labelRotation;
        this['dominant-baseline'] = baseLine ? baseLine : 'auto';
        this.baseline = baseLine ? baseLine : '';
        this.dy = dy ? dy : '';
    }
}
/**
 * Class to define property to draw line.
 *
 * @private
 */
class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}
/**
 * Class to define property to draw line.
 *
 * @private
 */
class LineOption extends PathOption {
    constructor(id, line, stroke, strokewidth, opacity, dasharray) {
        super(id, null, strokewidth, stroke, opacity, dasharray, null);
        this.x1 = line.x1;
        this.y1 = line.y1;
        this.x2 = line.x2;
        this.y2 = line.y2;
    }
}
/**
 * Properties required to render path.
 *
 * @private
 */
class PathAttributes extends PathOption {
    constructor(id, path, fill, border, borderWidth, opacity, borderColor) {
        super(id, fill, borderWidth, borderColor, opacity, null);
        this.d = path.d;
        this.x = path.x;
        this.y = path.y;
    }
}
/**
 * Helper Class to define property to path.
 *
 * @private
 */
class Path {
    constructor(d, innerR, x, y, x1, y1, cx, cy, start, end, radius, counterClockWise) {
        this.d = d;
        this.innerR = innerR;
        this.cx = cx;
        this.cy = cy;
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.start = start;
        this.end = end;
        this.radius = radius;
        this.counterClockWise = counterClockWise;
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param  {number} values - specifies the values
 * @returns {number} returns the number
 * @hidden
 */
function sum(values) {
    let sum = 0;
    for (const value of values) {
        sum += value;
    }
    return sum;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { Size } heatmapSize - Specifies the heatmapsize
 * @param { number } topPadding - Specifies the topPadding
 * @param { number }  bottomPadding - Specifies the bottomPadding
 * @param { FontModel } titleStyle - Specifies the titleStyle
 * @returns {number} returns the number
 * @private
 */
function titlePositionY(heatmapSize, topPadding, bottomPadding, titleStyle) {
    let positionY;
    if (titleStyle.textAlignment === 'Near') {
        positionY = heatmapSize.height - bottomPadding;
    }
    else if (titleStyle.textAlignment === 'Center') {
        positionY = heatmapSize.height / 2;
    }
    else {
        positionY = topPadding;
    }
    return positionY;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { FontModel } font - Specifies the heatmapsize
 * @param { string } text - Specifies the topPadding
 * @param { number }  angle - Specifies the bottomPadding
 * @returns {Size} returns the size
 * @private
 */
function rotateTextSize(font, text, angle) {
    const renderer = new SvgRenderer('heatmapMeasureRotateText');
    const svgObject = renderer.createSvg({ id: 'heatmapMeasureRotateText_svg', width: 100, height: 100 });
    let height;
    let dy;
    let label;
    let tspanElement;
    const options = {
        'font-size': font.size,
        'font-style': font.fontStyle.toLowerCase(),
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight.toLowerCase(),
        'transform': 'rotate(' + angle + ', 0, 0)',
        'text-anchor': 'middle'
    };
    const htmlObject = renderer.createText(options, text[0]);
    if (typeof text !== 'string' && text.length > 1) {
        for (let i = 1, len = text.length; i < len; i++) {
            height = (measureText(text[i], font).height);
            dy = (0) + ((i * height));
            label = text[i];
            tspanElement = renderer.createTSpan({
                'x': 0, 'id': 'heatmapMeasureRotateText_' + i,
                'y': dy
            }, label);
            htmlObject.appendChild(tspanElement);
        }
    }
    svgObject.appendChild(htmlObject);
    document.body.appendChild(svgObject);
    const box = htmlObject.getBoundingClientRect();
    remove(svgObject);
    return new Size((box.right - box.left), (box.bottom - box.top));
}
/**
 * Class to draw SVG and Canvas Rectangle & Text.
 *
 * @private
 */
class DrawSvgCanvas {
    constructor(heatmap) {
        this.heatMap = heatmap;
    }
    //Svg & Canvas Rectangle Part
    drawRectangle(properties, parentElement, isFromSeries) {
        if (!this.heatMap.enableCanvasRendering) {
            delete properties.d;
            const rectElement = parentElement.appendChild(this.heatMap.renderer.drawRectangle(properties));
            if (rectElement.id.indexOf('Rect') === -1) {
                rectElement.setAttribute('title', 'Rect Element');
                rectElement.setAttribute('role', 'img');
                rectElement.setAttribute('aria-hidden', 'false');
            }
            else {
                const tabindex = (this.heatMap.cellSettings.enableCellHighlighting || this.heatMap.allowSelection) ? 0 : -1;
                rectElement.setAttribute('tabindex', tabindex.toString());
                rectElement.style.outline = 'none';
            }
        }
        else {
            this.drawCanvasRectangle(this.heatMap.canvasRenderer, properties, isFromSeries);
        }
    }
    //Svg & Canvas Bubble Part
    drawCircle(properties, parentElement) {
        if (!this.heatMap.enableCanvasRendering) {
            delete properties.d;
            const circleElement = parentElement.appendChild(this.heatMap.renderer.drawCircle(properties));
            const tabindex = this.heatMap.cellSettings.enableCellHighlighting ? 0 : -1;
            circleElement.setAttribute('tabindex', tabindex.toString());
            circleElement.style.outline = 'none';
        }
        else {
            this.drawCanvasCircle(this.heatMap.canvasRenderer, properties);
        }
    }
    //Svg & Canvas Pie Part
    drawPath(properties, options, parentElement) {
        if (!this.heatMap.enableCanvasRendering) {
            delete properties.x;
            delete properties.y;
            parentElement.appendChild(this.heatMap.renderer.drawPath(properties));
        }
        else {
            this.drawCanvasPath(this.heatMap.canvasRenderer, properties, options);
        }
    }
    //Svg & Canvas Text Part
    createText(properties, parentElement, text) {
        if (!this.heatMap.enableCanvasRendering) {
            delete properties.labelRotation;
            delete properties.baseline;
            delete properties.text;
            parentElement.appendChild(this.heatMap.renderer.createText(properties, text));
            properties.text = text;
        }
        else {
            this.canvasDrawText(properties, text);
        }
    }
    //Draw the wrapped text for both SVG & canvas
    createWrapText(options, font, parentElement) {
        let renderOptions = {};
        let htmlObject;
        let tspanElement;
        let height;
        renderOptions = {
            'id': options.id,
            'x': options.x,
            'y': options.y,
            'fill': options.fill,
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight.toLowerCase(),
            'text-anchor': options['text-anchor'],
            'transform': options.transform,
            'dominant-baseline': options['dominant-baseline'],
            'aria-label': options.text[0]
        };
        const text = options.text[0];
        if (!this.heatMap.enableCanvasRendering) {
            htmlObject = this.heatMap.renderer.createText(renderOptions, text);
        }
        else {
            this.heatMap.canvasRenderer.createText(options, text);
        }
        if (typeof options.text !== 'string' && options.text.length > 1) {
            for (let i = 1, len = options.text.length; i < len; i++) {
                height = (measureText(options.text[i], font).height);
                if (!this.heatMap.enableCanvasRendering) {
                    tspanElement = this.heatMap.renderer.createTSpan({
                        'x': options.x, 'id': options.id + i,
                        'y': (options.y) + (i * height)
                    }, options.text[i]);
                    htmlObject.appendChild(tspanElement);
                }
                else {
                    options.id = options.id + i;
                    options.y += height;
                    this.heatMap.canvasRenderer.createText(options, options.text[i]);
                }
            }
        }
        if (!this.heatMap.enableCanvasRendering) {
            parentElement.appendChild(htmlObject);
        }
    }
    drawLine(properties, parentElement) {
        if (!this.heatMap.enableCanvasRendering) {
            delete properties.d;
            parentElement.appendChild(this.heatMap.renderer.drawLine(properties));
        }
        else {
            this.heatMap.canvasRenderer.drawLine(properties);
        }
    }
    //Canvas Text Part
    canvasDrawText(options, label, translateX, translateY, wrappedLabels, elementHeight, isAxisLabel) {
        const ctx = this.heatMap.canvasRenderer.ctx;
        if (!translateX) {
            translateX = options.x;
        }
        if (!translateY) {
            translateY = options.y;
        }
        let fontWeight = this.getOptionValue(options, 'font-weight');
        if (!isNullOrUndefined(fontWeight) && fontWeight.toLowerCase() === 'regular') {
            fontWeight = 'normal';
        }
        const fontFamily = this.getOptionValue(options, 'font-family');
        const fontSize = (options['font-size'].toString()).indexOf('px') === -1 ? options['font-size'] + 'px' : options['font-size'];
        let anchor = this.getOptionValue(options, 'text-anchor');
        const fontStyle = this.getOptionValue(options, 'font-style').toLowerCase();
        const font = (fontStyle + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily);
        if (anchor === 'middle') {
            anchor = 'center';
        }
        ctx.save();
        ctx.fillStyle = options.fill;
        ctx.font = font;
        ctx.textAlign = anchor;
        if (options.baseline) {
            ctx.textBaseline = options.baseline;
        }
        ctx.translate(translateX, translateY);
        ctx.rotate(options.labelRotation * Math.PI / 180);
        if (isAxisLabel) {
            for (let i = 0; i < wrappedLabels.length; i++) {
                options.y = i !== 0 ? options.y + elementHeight : options.y;
                ctx.fillText(wrappedLabels[i], options.x - translateX, options.y - translateY);
            }
        }
        else {
            ctx.fillText(label, options.x - translateX, options.y - translateY);
        }
        ctx.restore();
    }
    // method to get the attributes value
    /* tslint:disable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionValue(options, key) {
        return options[key];
    }
    setAttributes(canvas, options) {
        canvas.ctx.lineWidth = options['stroke-width'];
        const dashArray = options['stroke-dasharray'];
        if (!isNullOrUndefined(dashArray)) {
            const dashArrayString = dashArray.split(',');
            canvas.ctx.setLineDash([parseInt(dashArrayString[0], 10), parseInt(dashArrayString[1], 10)]);
        }
        canvas.ctx.strokeStyle = options['stroke'];
    }
    drawCanvasRectangle(canvas, options, isFromSeries) {
        const canvasCtx = canvas.ctx;
        canvas.ctx.save();
        canvas.ctx.beginPath();
        canvas.ctx.globalAlpha = options['opacity'];
        this.setAttributes(canvas, options);
        this.drawCornerRadius(canvas, options);
        if ((options['stroke-width'] && options['stroke-width'] !== 0) || isFromSeries) {
            canvas.ctx.stroke();
        }
        canvas.ctx.restore();
        canvas.ctx = canvasCtx;
    }
    // To draw the corner of a rectangle
    drawCornerRadius(canvas, options) {
        let cornerRadius = options.rx;
        const x = options.x;
        const y = options.y;
        const width = options.width;
        const height = options.height;
        if (options.fill === 'none') {
            options.fill = 'transparent';
        }
        canvas.ctx.fillStyle = options.fill;
        if (width < 2 * cornerRadius) {
            cornerRadius = width / 2;
        }
        if (height < 2 * cornerRadius) {
            cornerRadius = height / 2;
        }
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(x + width - cornerRadius, y);
        canvas.ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
        canvas.ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
        canvas.ctx.arcTo(x, y + height, x, y, cornerRadius);
        canvas.ctx.arcTo(x, y, x + width, y, cornerRadius);
        canvas.ctx.closePath();
        canvas.ctx.fill();
    }
    drawCanvasCircle(canvas, options) {
        canvas.ctx.save();
        canvas.ctx.beginPath();
        canvas.ctx.arc(options.cx, options.cy, options.r, 0, 2 * Math.PI);
        canvas.ctx.fillStyle = options.fill;
        canvas.ctx.globalAlpha = options.opacity;
        canvas.ctx.fill();
        this.setAttributes(canvas, options);
        if (options['stroke-width'] && options['stroke-width'] !== 0) {
            canvas.ctx.stroke();
        }
        canvas.ctx.restore();
    }
    drawCanvasPath(canvas, properties, options) {
        const path = properties.d;
        const dataSplit = path.split(' ');
        canvas.ctx.save();
        canvas.ctx.beginPath();
        canvas.ctx.globalAlpha = properties.opacity;
        canvas.ctx.fillStyle = properties.fill;
        this.setAttributes(canvas, properties);
        for (let i = 0; i < dataSplit.length; i = i + 3) {
            const x1 = parseFloat(dataSplit[i + 1]);
            const y1 = parseFloat(dataSplit[i + 2]);
            switch (dataSplit[i]) {
                case 'M':
                    canvas.ctx.moveTo(x1, y1);
                    break;
                case 'L':
                    canvas.ctx.lineTo(x1, y1);
                    break;
                case 'A':
                case 'a':
                    canvas.ctx.arc(options.x, options.y, options.radius, (options.start * 0.0174533), (options.end * 0.0174533), false);
                    i = dataSplit[i] === 'a' ? i + 13 : i + 5;
                    break;
                case 'Z':
                    canvas.ctx.closePath();
                    break;
            }
        }
        canvas.ctx.fill();
        if (properties['stroke-width'] && properties['stroke-width'] !== 0) {
            canvas.ctx.stroke();
        }
        canvas.ctx.restore();
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string } title - Specifies the heatmapsize
 * @param { FontModel } style - Specifies the topPadding
 * @param { number }  width - Specifies the bottomPadding
 * @returns {string} returns the size
 * @private
 */
function getTitle(title, style, width) {
    let titleCollection = [];
    switch (style.textOverflow) {
        case 'Wrap':
            titleCollection = textWrap(title, width, style);
            break;
        case 'Trim':
            titleCollection.push(textTrim(width, title, style));
            break;
        default:
            titleCollection.push(textNone(width, title, style));
            break;
    }
    return titleCollection;
}
/**
 * @param { string[] } texts - Specifies the texts to be processed for rendering
 * @param { string } enableHtmlSanitizer - Specifies whether to enable HTML sanitization for the texts
 * @returns { string[] } returns the sanitized strings
 * @private
 */
function getSanitizedTexts(texts, enableHtmlSanitizer) {
    if (enableHtmlSanitizer) {
        for (let i = 0; i < texts.length; i++) {
            texts[i] = SanitizeHtmlHelper.sanitize(texts[i]);
        }
    }
    return texts;
}
/**
 * Function to check whether the line break character is in the string or not.
 *
 * @param {string[]} labels - Specifies the axis labels.
 * @returns {boolean} returns whether the line break character is in the string or not.
 * @private
 */
function getIsLineBreakLabel(labels) {
    let isLineBreak = false;
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1) {
            isLineBreak = true;
            break;
        }
    }
    return isLineBreak;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string } currentLabel - Specifies the heatmapsize
 * @param { number } maximumWidth - Specifies the topPadding
 * @param { FontModel }  font - Specifies the bottomPadding
 * @param { boolean }  isCellLabel - Specifies the CellLabel or not
 * @returns {string} returns the size
 * @private
 */
function textWrap(currentLabel, maximumWidth, font, isCellLabel) {
    const textCollection = currentLabel.split(' ');
    let label = '';
    const labelCollection = [];
    let text;
    for (let i = 0, len = textCollection.length; i < len; i++) {
        text = textCollection[i];
        if (measureText(label.concat(text), font).width < maximumWidth) {
            label = label.concat((label === '' ? '' : ' ') + text);
        }
        else {
            if (label !== '') {
                label = isCellLabel ? label.concat((label === '' ? '' : ' ') + text) : label;
                labelCollection.push(textTrim(maximumWidth, label, font));
                label = isCellLabel ? '' : text;
            }
            else {
                labelCollection.push(textTrim(maximumWidth, text, font));
                text = '';
            }
        }
        if (label && i === len - 1) {
            labelCollection.push(textTrim(maximumWidth, label, font));
        }
    }
    return labelCollection;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { number } maxWidth - Specifies the heatmapsize
 * @param { string } text - Specifies the topPadding
 * @param { FontModel }  font - Specifies the bottomPadding
 * @returns {string} returns the size
 * @private
 */
function textTrim(maxWidth, text, font) {
    let label = text;
    let size = measureText(text, font).width;
    if (size > maxWidth) {
        const textLength = text.length;
        for (let index = textLength - 1; index >= 0; --index) {
            label = text.substring(0, index) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { number } maxWidth - Specifies the heatmapsize
 * @param { string } text - Specifies the topPadding
 * @param { FontModel }  font - Specifies the bottomPadding
 * @returns {string} returns the size
 * @private
 */
function textNone(maxWidth, text, font) {
    let label = text;
    let size = measureText(text, font).width;
    if (size > maxWidth) {
        const textLength = text.length;
        for (let i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i);
            size = measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/** @private */
class Gradient {
    constructor(x, x1, x2, y1, y2) {
        this.id = x;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
}
class GradientColor {
    constructor(color, colorStop) {
        this.color = color;
        this.colorStop = colorStop;
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string } text - Specifies the heatmapsize
 * @param { number } x - Specifies the topPadding
 * @param { number }  y - Specifies the bottomPadding
 * @param { number }  areaWidth - Specifies the bottomPadding
 * @param { string }  id - Specifies the bottomPadding
 * @param { Element }  element - Specifies the bottomPadding
 * @param { boolean }  isTouch - Specifies the bottomPadding
 * @param { HeatMap }  heatmap - Specifies the bottomPadding
 * @returns {void} returns the size
 * @private
 */
function showTooltip(text, x, y, areaWidth, id, element, isTouch, heatmap) {
    let tooltip = document.getElementById(id);
    const size = measureText(text, {
        fontFamily: 'Segoe UI', size: '12px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    });
    const width = size.width + 5;
    x = (x + width > areaWidth) ? x - width : x;
    x = x < 0 ? 5 : x;
    if (!tooltip) {
        tooltip = createElement('div', { id: id });
        tooltip.style.cssText = 'top:' + (y + 15).toString() + 'px;left:' + (x + 15).toString() +
            'px;background-color: rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
            'padding-bottom : 2px; padding-top : 2px; font-size:12px; font-family: Segoe UI';
        tooltip.innerText = text;
        element.appendChild(tooltip);
    }
    else {
        tooltip.innerText = text;
        tooltip.style.top = (y + 15).toString() + 'px';
        tooltip.style.left = (x + 15).toString() + 'px';
    }
    if (text === heatmap.titleSettings.text) {
        tooltip.style.width = (x + 15) + size.width + 7 > heatmap.availableSize.width ?
            (heatmap.availableSize.width - (x + 15)).toString() + 'px' : '';
    }
    else {
        tooltip.style.left = (x + 15) + size.width + 7 > heatmap.availableSize.width ?
            (heatmap.availableSize.width - (size.width + 7)).toString() + 'px' : x.toString() + 'px';
        tooltip.style.top = (y + 15) + size.height + 6 > heatmap.availableSize.height ?
            (y - (size.height + 6) - 10).toString() + 'px' : tooltip.style.top; // 6 and 7 are padding and border width
    }
    if (isTouch) {
        if (!isNullOrUndefined(heatmap.tooltipTimer)) {
            window.clearTimeout(heatmap.tooltipTimer);
        }
        heatmap.tooltipTimer = setTimeout(() => { removeElement(id); }, 1500);
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string }  id - Specifies the bottomPadding
 * @returns {void} returns the size
 * @private
 */
function removeElement(id) {
    const element = getElement(id);
    if (element) {
        remove(element);
        removeMeasureElement();
    }
}
// eslint-disable-next-line valid-jsdoc
/**
 * @private
 */
function removeMeasureElement() {
    removeElement('heatmapmeasuretext');
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string }  id - Specifies the bottomPadding
 * @returns {Element} returns the size
 * @private
 */
function getElement(id) {
    return document.getElementById(id);
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { number } value - Specifies the topPadding
 * @param { number }  interval - Specifies the bottomPadding
 * @param { string } intervalType - Specifies the heatmapsize
 * @param { number }  increment - Specifies the bottomPadding
 * @returns {Date} returns the size
 * @private
 */
function increaseDateTimeInterval(value, interval, intervalType, increment) {
    const result = new Date(value);
    interval = Math.ceil(interval * increment);
    switch (intervalType) {
        case 'Years':
            result.setFullYear(result.getFullYear() + interval);
            break;
        case 'Months':
            result.setMonth(result.getMonth() + interval);
            break;
        case 'Days':
            result.setDate(result.getDate() + interval);
            break;
        case 'Hours':
            result.setHours(result.getHours() + interval);
            break;
        case 'Minutes':
            result.setMinutes(result.getMinutes() + interval);
            break;
    }
    return result;
}
/* private */
class CanvasTooltip {
    constructor(text, rect) {
        this.region = new Rect(0, 0, 0, 0);
        this.text = text;
        this.region = rect;
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { CanvasTooltip } tooltipCollection - Specifies the topPadding
 * @param { number }  xPosition - Specifies the bottomPadding
 * @param { number } yPosition - Specifies the heatmapsize
 * @returns {string} returns the size
 * @private
 */
function getTooltipText(tooltipCollection, xPosition, yPosition) {
    const length = tooltipCollection.length;
    let tooltip;
    let region;
    let text;
    for (let i = 0; i < length; i++) {
        tooltip = tooltipCollection[i];
        region = tooltip.region;
        if (xPosition >= region.x && xPosition <= (region.x + region.width) && yPosition >= region.y
            && yPosition <= (region.y + region.height)) {
            text = tooltip.text;
            break;
        }
    }
    return text;
}
/**
 * @private
 */
class PaletterColor {
}
/**
 * @private
 */
class GradientPointer {
    constructor(pathX1, pathY1, pathX2, pathY2, pathX3, pathY3) {
        this.pathX1 = pathX1;
        this.pathY1 = pathY1;
        this.pathX2 = pathX2;
        this.pathY2 = pathY2;
        this.pathX3 = pathX3;
        this.pathY3 = pathY3;
    }
}
/**
 * Class to define currentRect private property.
 *
 * @private
 */
class CurrentLegendRect {
    constructor(x, y, width, height, label, id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.id = id;
    }
}
/** @private */
class LegendRange {
    constructor(x, y, width, height, value, visible, currentPage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.visible = visible;
        this.currentPage = currentPage;
    }
}
/** @private */
class ToggleVisibility {
    constructor(visible, value, startValue, endValue) {
        this.visible = visible;
        this.value = value;
        this.startValue = startValue;
        this.endValue = endValue;
    }
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string } color - Specifies the topPadding
 * @returns {string} returns the size
 * @private
 */
function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    const element = document.getElementById('heatmapmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    const isRGBValue = color.replace(/[()RGBrgba ]/g, '').split(',');
    return convertToHexCode(new RgbColor(parseInt(isRGBValue[0], 10), parseInt(isRGBValue[1], 10), parseInt(isRGBValue[2], 10)));
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { RgbColor } value - Specifies the topPadding
 * @returns {string} returns the size
 * @private
 */
function convertToHexCode(value) {
    return '#' + componentToHex(value.R) + componentToHex(value.G) + componentToHex(value.B);
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { number }  value - Specifies the bottomPadding
 * @returns {string} returns the size
 * @private
 */
function componentToHex(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { string }  hex - Specifies the bottomPadding
 * @returns {RgbColor} returns the size
 * @private
 */
function convertHexToColor(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new RgbColor(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new RgbColor(255, 255, 255);
}
/**
 * Function to check whether target object implement specific interface
 *
 * @param { boolean }  isCustom - Specifies the bottomPadding
 * @param { string }  format - Specifies the bottomPadding
 * @param { number }  tempInterval - Specifies the bottomPadding
 * @param { Function }  formatFun - Specifies the bottomPadding
 * @returns {string} returns the size
 * @private
 */
function formatValue(isCustom, format, tempInterval, formatFun) {
    return isCustom ? format.replace('{value}', formatFun(tempInterval))
        : formatFun(tempInterval);
}
/** @private */
class MultiLevelPosition {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the axis of the heatmap.
 */
class Axis extends ChildProperty {
    constructor() {
        super(...arguments);
        /** @private */
        this.multipleRow = [];
        /** @private */
        this.rect = new Rect(undefined, undefined, 0, 0);
        /** @private */
        this.nearSizes = [];
        /** @private */
        this.farSizes = [];
        /** @private */
        this.maxLabelSize = new Size(0, 0);
        /** @private */
        this.titleSize = new Size(0, 0);
        /** @private */
        this.multilevel = [];
        /** @private */
        this.axisLabels = [];
        /** @private */
        this.tooltipLabels = [];
        /** @private */
        this.labelValue = [];
        /** @private */
        this.axisLabelSize = 0;
        /** @private */
        this.axisLabelInterval = 0;
        /** @private */
        this.dateTimeAxisLabelInterval = [];
        /** @private */
        this.maxLength = 0;
        /** @private */
        this.min = 0;
        /** @private */
        this.max = 0;
        /** @private */
        this.isIntersect = false;
        /** @private */
        this.jsonCellLabel = [];
        this.multiLevelSize = [];
        /** @private */
        this.xAxisMultiLabelHeight = [];
        /** @private */
        this.yAxisMultiLabelHeight = [];
        /** @private */
        this.multiLevelPosition = [];
    }
    /**
     * measure the axis title and label size
     *
     * @param axis
     * @param heatmap
     * @private
     */
    computeSize(axis, heatmap, rect) {
        let size = new Size(0, 0);
        const innerPadding = 10;
        this.titleSize = axis.getTitleSize(axis, innerPadding);
        this.maxLabelSize = axis.getMaxLabelSize(axis, heatmap);
        this.getMultilevelLabelsHeight(axis, rect, heatmap);
        for (let i = 0; i < this.multiLevelLabels.length; i++) {
            size = axis.multiLevelLabelSize(innerPadding, i);
            this.multiLevelSize.push(size);
        }
    }
    /**
     * calculating x, y position of multi level labels
     *
     * @private
     */
    multiPosition(axis, index) {
        const innerPadding = axis.orientation === 'Horizontal' ? 10 : 20;
        const multiPosition = new MultiLevelPosition(0, 0);
        if (axis.orientation === 'Horizontal') {
            const level0 = axis.maxLabelSize.height + innerPadding
                + ((axis.angle === 0 || axis.angle === 180 || axis.angle === 360) ? 0 : innerPadding);
            const level1 = this.xAxisMultiLabelHeight[index - 1];
            multiPosition.x = (axis.isInversed ? axis.rect.x + axis.rect.width : axis.rect.x);
            multiPosition.y = index === 0 ? axis.rect.y + (axis.opposedPosition ? -level0 : level0) :
                axis.multiLevelPosition[index - 1].y + (axis.opposedPosition ? -level1 : level1);
        }
        else {
            const level0 = axis.maxLabelSize.width + innerPadding;
            const level1 = index !== 0 && (this.multiLevelSize[index - 1].width);
            multiPosition.x = index === 0 ? axis.rect.x - (axis.opposedPosition ? -level0 : level0) :
                axis.multiLevelPosition[index - 1].x - (axis.opposedPosition ? -(level1 + innerPadding) : level1 + innerPadding);
            multiPosition.y = axis.isInversed ? axis.rect.y : axis.rect.y + axis.rect.height;
        }
        return multiPosition;
    }
    multiLevelLabelSize(innerPadding, index) {
        const labelSize = new Size(0, 0);
        const multiLevel = this.multiLevelLabels;
        const categoryLabel = multiLevel[index].categories;
        for (let i = 0; i < categoryLabel.length; i++) {
            const size = measureText(categoryLabel[i].text, multiLevel[index].textStyle);
            labelSize.width = (labelSize.width > size.width) ? labelSize.width : size.width;
            labelSize.height = (labelSize.height > size.height) ? labelSize.height : size.height;
        }
        const size = (this.orientation === 'Horizontal') ? this.xAxisMultiLabelHeight[index] :
            this.yAxisMultiLabelHeight[index];
        if (this.opposedPosition) {
            this.farSizes.push(size);
        }
        else {
            this.nearSizes.push(size);
        }
        return labelSize;
    }
    getMultilevelLabelsHeight(axis, rect, heatmap) {
        let labelSize;
        let gap;
        let height;
        const multiLevelLabelsHeight = [];
        let start;
        let end;
        let startPosition;
        let endPosition;
        const isVertical = axis.orientation === 'Vertical';
        const padding = axis.orientation === 'Vertical' ? 20 : 10;
        this.multiLevelLabels.map((multiLevel, index) => {
            multiLevel.categories.map((categoryLabel) => {
                start = typeof categoryLabel.start === 'number' ? categoryLabel.start : Number(new Date(categoryLabel.start));
                end = typeof categoryLabel.end === 'number' ? categoryLabel.end : Number(new Date(categoryLabel.end));
                if (categoryLabel.text !== '' && categoryLabel.start !== null && categoryLabel.end !== null) {
                    labelSize = measureText(categoryLabel.text, multiLevel.textStyle);
                    height = isVertical ? labelSize.width : labelSize.height;
                    startPosition = heatmap.heatMapAxis.calculateLeftPosition(axis, start, categoryLabel.start, rect);
                    endPosition = heatmap.heatMapAxis.calculateWidth(axis, categoryLabel.end, end, rect);
                    labelSize = measureText(categoryLabel.text, multiLevel.textStyle);
                    gap = ((categoryLabel.maximumTextWidth === null) ? Math.abs(endPosition - startPosition) :
                        categoryLabel.maximumTextWidth);
                    if ((labelSize.width > gap - padding) && (multiLevel.overflow === 'Wrap') && !isVertical) {
                        height = (height * (textWrap(categoryLabel.text, gap - padding, multiLevel.textStyle).length));
                    }
                    multiLevelLabelsHeight[index] = !multiLevelLabelsHeight[index] ? height + padding :
                        ((multiLevelLabelsHeight[index] < height) ? height + padding : multiLevelLabelsHeight[index]);
                }
            });
        });
        if (isVertical) {
            this.yAxisMultiLabelHeight = multiLevelLabelsHeight;
        }
        else {
            this.xAxisMultiLabelHeight = multiLevelLabelsHeight;
        }
    }
    getTitleSize(axis, innerPadding) {
        let titleSize = new Size(0, 0);
        if (this.title.text) {
            titleSize = measureText(this.title.text, this.title.textStyle);
            titleSize.height += innerPadding;
        }
        if (axis.opposedPosition) {
            this.farSizes.push(titleSize.height);
        }
        else {
            this.nearSizes.push(titleSize.height);
        }
        return titleSize;
    }
    getMaxLabelSize(axis, heatmap) {
        const labelSize = new Size(0, 0);
        const labels = this.axisLabels;
        const padding = (axis.border.width > 0 || axis.multiLevelLabels.length > 0) ? 10 : 0;
        const labelPadding = 10;
        let count = 1;
        const row = 1;
        const interval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') || (axis.textStyle.textOverflow === 'Wrap' || axis.textStyle.textOverflow === 'Trim') ?
            heatmap.initialClipRect.width / axis.axisLabelSize : heatmap.initialClipRect.width / axis.axisLabels.length;
        axis.angle = axis.labelRotation;
        axis.isIntersect = false;
        const isLineBreak = getIsLineBreakLabel(labels);
        if ((axis.orientation === 'Horizontal' && (axis.labelIntersectAction === 'Rotate45' ||
            (axis.labelRotation % 180 === 0 && axis.labelIntersectAction === 'Trim' || axis.enableTrim)) ||
            axis.labelIntersectAction === 'MultipleRows') && axis.textStyle.textOverflow !== 'Wrap' && axis.textStyle.textOverflow !== 'Trim') {
            let startX = heatmap.initialClipRect.x + ((!axis.isInversed) ? 0 : heatmap.initialClipRect.width);
            let previousEnd;
            let previousStart;
            this.clearMultipleRow();
            for (let i = 0, len = labels.length; i < len; i++) {
                const label = labels[i];
                const elementSize = measureText(label, axis.textStyle);
                const axisInterval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') ?
                    axis.dateTimeAxisLabelInterval[i] * interval : interval;
                let startPoint = startX + (!axis.isInversed ?
                    ((interval - elementSize.width) / 2) : -((interval + elementSize.width) / 2));
                startPoint = startPoint < heatmap.initialClipRect.x ? heatmap.initialClipRect.x : startPoint;
                const endPoint = startPoint + elementSize.width;
                if (!axis.isInversed) {
                    if (isNullOrUndefined(previousEnd)) {
                        previousEnd = endPoint;
                    }
                    else if ((startPoint < previousEnd) && axis.labelIntersectAction !== 'MultipleRows') {
                        if (axis.labelIntersectAction === 'Rotate45' && !(isLineBreak) && !axis.enableTrim) {
                            axis.angle = 45;
                        }
                        else {
                            axis.isIntersect = true;
                        }
                        break;
                    }
                    previousEnd = endPoint;
                }
                else {
                    if (isNullOrUndefined(previousStart)) {
                        previousStart = startPoint;
                    }
                    else if ((previousStart < endPoint && axis.labelIntersectAction !== 'MultipleRows')) {
                        if (axis.labelIntersectAction === 'Rotate45' && !(isLineBreak) && !axis.enableTrim) {
                            axis.angle = 45;
                        }
                        else {
                            axis.isIntersect = true;
                        }
                        break;
                    }
                    previousStart = startPoint;
                }
                startX += axis.isInversed ? -axisInterval : axisInterval;
                if (axis.orientation === 'Horizontal' && axis.labelIntersectAction === 'MultipleRows' && axis.labelRotation === 0) {
                    this.multipleRow.push(new MultipleRow(startPoint, endPoint, count, label, row));
                }
            }
            if (axis.orientation === 'Horizontal' && axis.labelIntersectAction === 'MultipleRows' && axis.isInversed) {
                this.multipleRow = this.multipleRow.reverse();
            }
        }
        let labelLength = 1;
        for (let i = 0; i < labels.length; i++) {
            const multipleRow = this.multipleRow;
            let label;
            if (axis.enableTrim || (axis.textStyle.textOverflow === 'Trim' && !(labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1))) {
                label = textTrim((axis.textStyle.textOverflow === 'Trim' && axis.orientation === 'Horizontal' ? interval : axis.maxLabelLength), labels[i], axis.textStyle);
            }
            else {
                label = labels[i];
            }
            let wrappedlabels = [];
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim) {
                const labelInterval = axis.orientation === 'Horizontal' ? interval : axis.maxLabelLength;
                if (isLineBreak) {
                    wrappedlabels = label.split(/<br\s*\/?>/, -1);
                    for (let i = 0; i < wrappedlabels.length; i++) {
                        wrappedlabels[i] = textTrim(labelInterval, wrappedlabels[i], axis.textStyle);
                    }
                }
                else {
                    wrappedlabels = textWrap(label, labelInterval, axis.textStyle);
                }
                labelLength = wrappedlabels.length > labelLength && !axis.enableTrim ? wrappedlabels.length : labelLength;
                if (axis.orientation === 'Vertical' || (axis.orientation === 'Horizontal' && axis.angle % 180 !== 0)) {
                    let labelWidth = 0;
                    for (let index = 0; index < wrappedlabels.length; index++) {
                        const wrappedlabelSize = measureText(wrappedlabels[index], axis.textStyle);
                        if (wrappedlabelSize.width > labelWidth) {
                            labelWidth = wrappedlabelSize.width;
                            label = wrappedlabels[index];
                        }
                    }
                }
                if (axis.orientation === 'Vertical') {
                    const tempintervel = heatmap.initialClipRect.height / (axis.axisLabelSize / axis.axisLabelInterval);
                    for (let index = 0; index < wrappedlabels.length; index++) {
                        if ((measureText(label, axis.textStyle).height * wrappedlabels.length) > (tempintervel - labelPadding) &&
                            wrappedlabels.length > 0 && (axis.angle !== 90 && axis.angle !== 270)) {
                            wrappedlabels.pop();
                            if (wrappedlabels.length > 0) {
                                wrappedlabels[wrappedlabels.length - 1] = wrappedlabels[wrappedlabels.length - 1] + '...';
                                /* eslint-disable max-len */
                                wrappedlabels[wrappedlabels.length - 1] = textTrim(axis.maxLabelLength, wrappedlabels[wrappedlabels.length - 1], axis.textStyle);
                            }
                        }
                    }
                }
            }
            else {
                if (isLineBreak && axis.enableTrim) {
                    wrappedlabels = label.split(/<br\s*\/?>/, -1);
                    const trimmedLabel = textTrim(axis.maxLabelLength, wrappedlabels[0], axis.textStyle);
                    label = (label.indexOf('<br>') !== -1 || label.indexOf('<br/>') !== -1) && trimmedLabel.indexOf('...') === -1 ? trimmedLabel + '...' : trimmedLabel;
                    wrappedlabels = [];
                }
                wrappedlabels.push(label);
            }
            const size = (axis.angle % 180 === 0) ?
                measureText(label, axis.textStyle) : rotateTextSize(axis.textStyle, wrappedlabels, axis.angle);
            labelSize.width = (labelSize.width > size.width) ? labelSize.width : size.width;
            if (axis.labelIntersectAction === 'MultipleRows' && axis.orientation === 'Horizontal' && axis.textStyle.textOverflow !== 'Wrap' && axis.textStyle.textOverflow !== 'Trim' && i > 0 && axis.labelRotation === 0) {
                if (multipleRow[i].end >= heatmap.initialClipRect.width && i < labels.length - 1) {
                    multipleRow[i].row = multipleRow[i].row + 1;
                }
                for (let k = 1; k <= axis.multilevel.length; k++) {
                    if (multipleRow[i].start < multipleRow[i - 1].end) {
                        if (axis.multilevel[k] < multipleRow[i].start) {
                            count = k;
                            break;
                        }
                        else if (k === axis.multilevel.length - 1) {
                            count = axis.multilevel.length;
                            break;
                        }
                    }
                    else if (size.width < interval) {
                        for (let j = 1; j <= axis.multilevel.length; j++) {
                            if (axis.multilevel[j] < multipleRow[i].start) {
                                count = j;
                                multipleRow[j].row = count;
                                break;
                            }
                        }
                    }
                }
                labelSize.height = (labelSize.height > ((size.height * count) + (((size.height * 0.5) / 2) * (count - 1)))) ?
                    labelSize.height : ((size.height * count) + (((size.height * 0.5) / 2) * count));
                this.multipleRow[i].index = count;
                axis.multilevel[count] = multipleRow[i].end;
            }
            else {
                if (axis.orientation === 'Horizontal' && axis.labelIntersectAction === 'MultipleRows' && i === 0 &&
                    axis.labelRotation === 0 && axis.textStyle.textOverflow !== 'Wrap' && axis.textStyle.textOverflow !== 'Trim') {
                    axis.multilevel[1] = multipleRow[i].end;
                }
                labelSize.height = (labelSize.height > size.height) ? labelSize.height : size.height;
            }
        }
        labelSize.height = (axis.angle % 180 === 0) ? labelSize.height * labelLength : labelSize.height;
        if (heatmap.cellSettings.border.width >= 20 && axis.orientation !== 'Horizontal') {
            labelSize.width = labelSize.width + (heatmap.cellSettings.border.width / 4);
        }
        if (axis.opposedPosition) {
            this.farSizes.push((axis.orientation === 'Horizontal') ? labelSize.height : labelSize.width + padding);
        }
        else {
            this.nearSizes.push((axis.orientation === 'Horizontal') ? labelSize.height : labelSize.width + padding);
        }
        return labelSize;
    }
    /**
     * Generate the axis lables for numeric axis
     *
     * @param heatmap
     * @private
     */
    calculateNumericAxisLabels(heatmap) {
        //Axis Min
        let min = 0;
        let max = 0;
        const interval = this.interval ? this.interval : 1;
        let adaptorMin;
        let adaptorMax;
        if (heatmap.adaptorModule && heatmap.isCellData) {
            adaptorMin = this.orientation === 'Horizontal' ?
                heatmap.adaptorModule.adaptiveXMinMax.min : heatmap.adaptorModule.adaptiveYMinMax.min;
            adaptorMax = this.orientation === 'Horizontal' ?
                heatmap.adaptorModule.adaptiveXMinMax.max : heatmap.adaptorModule.adaptiveYMinMax.max;
        }
        min = !isNullOrUndefined(this.minimum) ? this.minimum : ((adaptorMin) ? adaptorMin : 0);
        max = !isNullOrUndefined(this.maximum) ? this.maximum :
            ((adaptorMax) ? adaptorMax : (this.maxLength * this.increment));
        let temp;
        if (this.minimum && this.maximum && min > max) {
            temp = min;
            min = max;
            max = temp;
        }
        max = !isNullOrUndefined(this.maximum) ? max : (adaptorMax ? adaptorMax : (max + min));
        const format = !isNullOrUndefined(this.labelFormat) ? this.labelFormat : '';
        const isCustom = format.match('{value}') !== null;
        this.format = heatmap.intl.getNumberFormat({
            format: isCustom ? '' : format
        });
        for (let i = min; i <= max; i = i + (interval * this.increment)) {
            const value = formatValue(isCustom, format, i, this.format);
            this.axisLabels.push(value);
        }
        this.min = 0;
        this.axisLabelSize = Math.floor(((max - min) / this.increment) + 1);
        this.max = this.axisLabelSize - 1;
        this.axisLabelInterval = interval;
        for (let i = min; i <= max; i = i + this.increment) {
            const value = formatValue(isCustom, format, i, this.format);
            this.tooltipLabels.push(value);
            this.labelValue.push(i);
        }
        this.labelValue = this.isInversed ? this.labelValue.reverse() : this.labelValue;
    }
    /**
     * Generate the axis lables for category axis
     *
     * @private
     */
    calculateCategoryAxisLabels() {
        let labels = this.labels ? this.labels : [];
        labels = (labels.length > 0) ? labels : this.jsonCellLabel;
        let min = !isNullOrUndefined(this.minimum) && !(this.minimum instanceof Date) ? this.minimum : 0;
        let max = !isNullOrUndefined(this.maximum) && !(this.maximum instanceof Date) ? this.maximum : this.maxLength;
        const interval = this.interval ? this.interval : 1;
        let temp;
        const format = !isNullOrUndefined(this.labelFormat) ? this.labelFormat : '';
        const isCustom = format.match('{value}') !== null;
        if (!isNullOrUndefined(this.minimum) && !isNullOrUndefined(this.maximum) && min > max) {
            temp = min;
            min = max;
            max = temp;
        }
        if (labels && labels.length > 0) {
            for (let i = min; i <= max; i = i + interval) {
                const value = !isNullOrUndefined(labels[i]) ? isCustom ? format.replace('{value}', labels[i].toString()) : labels[i].toString() : isCustom ? format.replace('{value}', i.toString()) : i.toString();
                this.axisLabels.push(value);
            }
        }
        else {
            for (let i = min; i <= max; i = i + interval) {
                const value = isCustom ? format.replace('{value}', i.toString()) : i.toString();
                this.axisLabels.push(value);
            }
        }
        for (let i = min; i <= max; i++) {
            this.tooltipLabels.push(!isNullOrUndefined(labels[i]) ? isCustom ? format.replace('{value}', labels[i].toString()) : labels[i].toString() : isCustom ? format.replace('{value}', i.toString()) : i.toString());
            this.labelValue.push(!isNullOrUndefined(labels[i]) ? labels[i].toString() : i.toString());
        }
        this.min = min;
        this.max = max;
        this.axisLabelSize = max - min + 1;
        this.axisLabelInterval = interval;
        this.labelValue = this.isInversed ? this.labelValue.reverse() : this.labelValue;
    }
    /**
     * Generate the axis labels for date time axis.
     *
     * @param heatmap
     * @private
     */
    calculateDateTimeAxisLabel(heatmap) {
        let interval = this.interval ? this.interval : 1;
        const option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        const dateParser = heatmap.intl.getDateParser(option);
        const dateFormatter = heatmap.intl.getDateFormat(option);
        let min;
        let max;
        let adaptorMin = null;
        let adaptorMax = null;
        if (heatmap.adaptorModule && heatmap.isCellData) {
            adaptorMin = this.orientation === 'Horizontal' ? heatmap.adaptorModule.adaptiveXMinMax.min :
                heatmap.adaptorModule.adaptiveYMinMax.min;
            adaptorMax = this.orientation === 'Horizontal' ? heatmap.adaptorModule.adaptiveXMinMax.max :
                heatmap.adaptorModule.adaptiveYMinMax.max;
        }
        const minimum = this.minimum ? this.minimum : (adaptorMin ? adaptorMin : null);
        const maximum = this.maximum ? this.maximum : (adaptorMax ? adaptorMax : null);
        if (minimum === null && maximum === null) {
            min = 0;
            max = this.maxLength * this.increment;
            for (let i = min; i <= max; i = i + (interval * this.increment)) {
                this.axisLabels.push(i.toString());
                this.tooltipLabels.push(i.toString());
                this.labelValue.push(i.toString());
            }
            this.min = 0;
            this.max = this.maxLength;
            this.axisLabelSize = (max - min) / this.increment + 1;
            this.axisLabelInterval = interval;
        }
        else {
            if (minimum !== null && maximum === null) {
                min = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: minimum }).val))));
                max = increaseDateTimeInterval(min, this.maxLength, this.intervalType, this.increment).getTime();
            }
            else if (minimum === null && maximum !== null) {
                max = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: maximum }).val))));
                min = increaseDateTimeInterval(max, -this.maxLength, this.intervalType, this.increment).getTime();
            }
            else {
                min = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: minimum }).val))));
                max = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: maximum }).val))));
            }
            this.format = heatmap.intl.getDateFormat({
                format: this.labelFormat, skeleton: this.getSkeleton()
            });
            let tempInterval = min;
            while (tempInterval <= max) {
                const value = this.format(new Date(tempInterval));
                this.axisLabels.push(value);
                if (this.showLabelOn !== 'None') {
                    interval = this.calculateLabelInterval(tempInterval);
                    this.dateTimeAxisLabelInterval.push(interval);
                }
                tempInterval = increaseDateTimeInterval(tempInterval, interval, this.intervalType, this.increment).getTime();
            }
            this.min = 0;
            this.axisLabelInterval = interval;
            this.axisLabelSize = this.getTotalLabelLength(min, max); // this.tooltipLabels.length;
            this.max = this.axisLabelSize - 1;
            tempInterval = min;
            while (tempInterval <= max) {
                const value = this.format(new Date(tempInterval));
                this.tooltipLabels.push(value);
                this.labelValue.push(new Date(tempInterval));
                tempInterval = increaseDateTimeInterval(tempInterval, 1, this.intervalType, this.increment).getTime();
            }
        }
        this.labelValue = this.isInversed ? this.labelValue.reverse() : this.labelValue;
    }
    calculateLabelInterval(interval) {
        const year = new Date(interval).getFullYear();
        const month = new Date(interval).getMonth() + 1;
        const day = new Date(interval).getDate();
        let numberOfDays;
        let tempInterval;
        if (this.showLabelOn === 'Years' || this.showLabelOn === 'Months') {
            if (this.showLabelOn === 'Years' && this.intervalType === 'Months') {
                tempInterval = Math.ceil(12 / this.increment);
            }
            else {
                numberOfDays = this.showLabelOn === 'Years' ? year % 4 === 0 ? 366 : 365 : new Date(year, month, 0).getDate();
                numberOfDays += 1 - day;
                tempInterval = this.intervalType === 'Days' ? Math.ceil(numberOfDays / this.increment) : this.intervalType === 'Hours' ?
                    Math.ceil((numberOfDays * 24) / this.increment) : this.intervalType === 'Minutes' ?
                    Math.ceil((numberOfDays * 24 * 60) / this.increment) : 1;
            }
        }
        else if (this.showLabelOn === 'Days') {
            tempInterval = this.intervalType === 'Hours' ? Math.ceil(24 / this.increment) : this.intervalType === 'Minutes' ?
                Math.ceil((24 * 60) / this.increment) : 1;
        }
        else if (this.showLabelOn === 'Hours') {
            const minutes = new Date(interval).getMinutes();
            tempInterval = this.intervalType === 'Minutes' ? Math.ceil((60 - minutes) / this.increment) : 1;
        }
        else {
            tempInterval = 1;
        }
        return tempInterval;
    }
    /**
     * @private
     */
    getSkeleton() {
        let skeleton;
        if (this.intervalType === 'Years') {
            skeleton = 'yMMM';
        }
        else if (this.intervalType === 'Months') {
            skeleton = 'MMMd';
        }
        else if (this.intervalType === 'Days') {
            skeleton = 'yMd';
        }
        else if (this.intervalType === 'Hours') {
            skeleton = 'EHm';
        }
        else if (this.intervalType === 'Minutes') {
            skeleton = 'Hms';
        }
        else {
            skeleton = 'Hms';
        }
        return skeleton;
    }
    /** @private */
    getTotalLabelLength(min, max) {
        let length = 0;
        const minimum = new Date(min);
        const maximum = new Date(max);
        let difference;
        let days;
        switch (this.intervalType) {
            case 'Years':
                // eslint-disable-next-line no-case-declarations
                const years = ((maximum.getFullYear() - minimum.getFullYear()) / this.increment) + 1;
                length = Math.floor(years);
                break;
            case 'Months':
                // eslint-disable-next-line no-case-declarations
                let months = (maximum.getFullYear() - minimum.getFullYear()) * 12;
                months -= minimum.getMonth();
                months += maximum.getMonth();
                length = months <= 0 ? 1 : Math.floor((months / this.increment) + 1);
                break;
            case 'Days':
                difference = Math.abs(minimum.getTime() - maximum.getTime());
                days = Math.floor(difference / (1000 * 3600 * 24));
                length = Math.floor((days / this.increment) + 1);
                break;
            case 'Hours':
                difference = Math.abs(minimum.getTime() - maximum.getTime());
                // eslint-disable-next-line no-case-declarations
                const hours = Math.floor(difference / (1000 * 3600));
                length = Math.floor(hours / this.increment) + 1;
                break;
            case 'Minutes':
                difference = Math.abs(minimum.getTime() - maximum.getTime());
                // eslint-disable-next-line no-case-declarations
                const minutes = Math.floor(difference / (1000 * 60));
                length = Math.floor(minutes / this.increment) + 1;
                break;
        }
        return length;
    }
    /**
     * Clear the axis label collection
     *
     * @private
     */
    clearAxisLabel() {
        this.axisLabels = [];
        this.tooltipLabels = [];
        this.dateTimeAxisLabelInterval = [];
        this.labelValue = [];
    }
    /**
     * Clear the axis label collection
     *
     * @private
     */
    clearMultipleRow() {
        this.multipleRow = [];
        this.multilevel = [];
    }
    /**
     * @returns {void}
     * @private
     */
    destroy() {
        this.axisLabels = null;
        this.multipleRow = null;
        this.rect = null;
        this.nearSizes = null;
        this.farSizes = null;
        this.maxLabelSize = null;
        this.titleSize = null;
        this.labelValue = null;
        this.format = null;
        this.multilevel = [];
        this.tooltipLabels = [];
        this.dateTimeAxisLabelInterval = [];
        this.jsonCellLabel = [];
        this.multiLevelSize = [];
        this.xAxisMultiLabelHeight = [];
        this.yAxisMultiLabelHeight = [];
        this.multiLevelPosition = [];
    }
}
__decorate$2([
    Complex({ text: '', textStyle: Theme.axisTitleFont }, Title)
], Axis.prototype, "title", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "opposedPosition", void 0);
__decorate$2([
    Property(null)
], Axis.prototype, "labels", void 0);
__decorate$2([
    Complex(Theme.axisLabelFont, Font)
], Axis.prototype, "textStyle", void 0);
__decorate$2([
    Property(0)
], Axis.prototype, "labelRotation", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "isInversed", void 0);
__decorate$2([
    Property('Category')
], Axis.prototype, "valueType", void 0);
__decorate$2([
    Property(1)
], Axis.prototype, "increment", void 0);
__decorate$2([
    Property('None')
], Axis.prototype, "showLabelOn", void 0);
__decorate$2([
    Property(null)
], Axis.prototype, "minimum", void 0);
__decorate$2([
    Property(null)
], Axis.prototype, "maximum", void 0);
__decorate$2([
    Property(null)
], Axis.prototype, "interval", void 0);
__decorate$2([
    Property('')
], Axis.prototype, "labelFormat", void 0);
__decorate$2([
    Property('Days')
], Axis.prototype, "intervalType", void 0);
__decorate$2([
    Property('Trim')
], Axis.prototype, "labelIntersectAction", void 0);
__decorate$2([
    Property(false)
], Axis.prototype, "enableTrim", void 0);
__decorate$2([
    Property(35)
], Axis.prototype, "maxLabelLength", void 0);
__decorate$2([
    Complex({ color: '#b5b5b5', width: 0, type: 'Rectangle' }, AxisLabelBorder)
], Axis.prototype, "border", void 0);
__decorate$2([
    Collection([], MultiLevelLabels)
], Axis.prototype, "multiLevelLabels", void 0);

class AxisHelper {
    constructor(heatMap) {
        this.heatMap = heatMap;
        this.padding = 10;
        this.drawSvgCanvas = new DrawSvgCanvas(heatMap);
    }
    /**
     * To render the x and y axis.
     *
     * @private
     */
    renderAxes() {
        this.initialClipRect = this.heatMap.initialClipRect;
        const heatMap = this.heatMap;
        let axisElement;
        let element;
        if (!heatMap.enableCanvasRendering) {
            axisElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'AxisCollection' });
        }
        const axes = this.heatMap.axisCollections;
        for (let i = 0, len = axes.length; i < len; i++) {
            const axis = axes[i];
            if (axis.orientation === 'Horizontal') {
                if (!heatMap.enableCanvasRendering) {
                    element = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisGroup' });
                }
                this.drawXAxisLine(element, axis);
                this.drawXAxisTitle(axis, element, axis.rect);
                this.drawXAxisLabels(axis, element, axis.rect);
            }
            else {
                element = heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisGroup' });
                this.drawYAxisLine(element, axis);
                this.drawYAxisTitle(axis, element, axis.rect);
                this.drawYAxisLabels(axis, element, axis.rect);
            }
            if (axis.multiLevelLabels.length > 0) {
                this.drawMultiLevels(element, axis);
            }
            if (!heatMap.enableCanvasRendering) {
                axisElement.appendChild(element);
            }
        }
        if (!heatMap.enableCanvasRendering) {
            this.heatMap.svgObject.appendChild(axisElement);
        }
    }
    drawXAxisLine(parent, axis) {
        const y = this.initialClipRect.y + (!axis.opposedPosition ? this.initialClipRect.height : 0);
        const line = new LineOption(this.heatMap.element.id + '_XAxisLine', new Line(this.initialClipRect.x, y, this.initialClipRect.x + this.initialClipRect.width, y), 'transparent', 0);
        this.drawSvgCanvas.drawLine(line, parent);
    }
    drawYAxisLine(parent, axis) {
        const x = this.initialClipRect.x + ((!axis.opposedPosition) ? 0 : this.initialClipRect.width);
        const line = new LineOption(this.heatMap.element.id + '_YAxisLine', new Line(x, this.initialClipRect.y, x, this.initialClipRect.height + this.initialClipRect.y), 'transparent', 0);
        this.drawSvgCanvas.drawLine(line, parent);
    }
    drawXAxisTitle(axis, parent, rect) {
        const titlepadding = (axis.textStyle.size === '0px' ? 0 : 10);
        const y = rect.y + (!axis.opposedPosition ? (axis.maxLabelSize.height + titlepadding +
            sum(axis.xAxisMultiLabelHeight)) : -(axis.maxLabelSize.height + titlepadding + sum(axis.xAxisMultiLabelHeight)));
        if (axis.title.text) {
            const heatMap = this.heatMap;
            const title = axis.title;
            const axisTitleText = this.heatMap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(title.text)) : title.text;
            const elementSize = measureText(axisTitleText, title.textStyle);
            let padding = this.padding;
            const anchor = title.textStyle.textAlignment === 'Near' ? 'start' :
                title.textStyle.textAlignment === 'Far' ? 'end' : 'middle';
            padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));
            const options = new TextOption(heatMap.element.id + '_XAxisTitle', new TextBasic(rect.x + titlePositionX(rect.width, 0, 0, title.textStyle), y + padding, anchor, axisTitleText), title.textStyle, title.textStyle.color || heatMap.themeStyle.axisTitle);
            this.drawSvgCanvas.createText(options, parent, axisTitleText);
        }
    }
    drawYAxisTitle(axis, parent, rect) {
        if (axis.title.text) {
            const title = axis.title;
            const heatMap = this.heatMap;
            const labelRotation = (axis.opposedPosition) ? 90 : -90;
            const anchor = title.textStyle.textAlignment === 'Near' ? 'start' :
                title.textStyle.textAlignment === 'Far' ? 'end' : 'middle';
            let padding = 10;
            padding = axis.opposedPosition ? padding : -padding;
            const titlepadding = (axis.textStyle.size === '0px' ? 0 : padding);
            const x = rect.x + titlepadding + ((axis.opposedPosition) ? axis.maxLabelSize.width + sum(axis.yAxisMultiLabelHeight) :
                -(axis.maxLabelSize.width + sum(axis.yAxisMultiLabelHeight)));
            const y = rect.y + titlePositionY(rect, 0, 0, title.textStyle) + (axis.opposedPosition ? this.padding : -this.padding);
            const axisTitleText = this.heatMap.enableHtmlSanitizer ? (SanitizeHtmlHelper.sanitize(title.text)) : title.text;
            const options = new TextOption(heatMap.element.id + '_YAxisTitle', new TextBasic(x, y - this.padding, anchor, axisTitleText, labelRotation, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')', 'auto'), title.textStyle, title.textStyle.color || heatMap.themeStyle.axisTitle);
            if (!this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.createText(options, parent, axisTitleText);
            }
            else {
                this.drawSvgCanvas.canvasDrawText(options, axisTitleText, x, y);
            }
        }
    }
    /**
     * Get the visible labels for both x and y axis
     *
     * @private
     */
    calculateVisibleLabels() {
        const heatmap = this.heatMap;
        let axis;
        const axisCollection = heatmap.axisCollections;
        const data = this.heatMap.dataSourceSettings;
        const processLabels = !(data && data.isJsonData && data.adaptorType === 'Cell');
        for (let i = 0, len = axisCollection.length; i < len; i++) {
            axis = axisCollection[i];
            if (axis.valueType === 'Numeric' && processLabels) {
                axis.clearAxisLabel();
                axis.calculateNumericAxisLabels(this.heatMap);
            }
            else if (axis.valueType === 'DateTime' && processLabels) {
                axis.clearAxisLabel();
                axis.calculateDateTimeAxisLabel(this.heatMap);
            }
            else if (axis.valueType === 'Category') {
                axis.clearAxisLabel();
                axis.calculateCategoryAxisLabels();
            }
            axis.tooltipLabels = axis.isInversed ? axis.tooltipLabels.reverse() : axis.tooltipLabels;
        }
    }
    /**
     * Measure the title and labels rendering position for both X and Y axis.
     *
     * @param rect
     * @private
     */
    measureAxis(rect) {
        const heatmap = this.heatMap;
        let axis;
        const axisCollection = heatmap.axisCollections;
        for (let i = axisCollection.length - 1; i >= 0; i--) {
            axis = axisCollection[i];
            const padding = axis.textStyle.size === '0px' ? 0 : this.padding;
            axis.nearSizes = [];
            axis.farSizes = [];
            axis.computeSize(axis, heatmap, rect);
            if (!axis.opposedPosition) {
                if (axis.orientation === 'Horizontal') {
                    rect.height -= (sum(axis.nearSizes) + padding);
                }
                else {
                    rect.x += sum(axis.nearSizes) + padding;
                    rect.width -= sum(axis.nearSizes) + padding;
                }
            }
            else {
                if (axis.orientation === 'Horizontal') {
                    rect.y += sum(axis.farSizes) + padding;
                    rect.height -= sum(axis.farSizes) + padding;
                }
                else {
                    rect.width -= sum(axis.farSizes) + padding;
                }
            }
        }
    }
    /**
     * Calculate the X and Y axis line position
     *
     * @param rect
     * @private
     */
    calculateAxisSize(rect) {
        const heatmap = this.heatMap;
        const axisCollection = heatmap.axisCollections;
        for (let i = 0, len = axisCollection.length; i < len; i++) {
            const axis = axisCollection[i];
            axis.rect = extend({}, rect, null, true);
            if (axis.orientation === 'Horizontal' && axis.multiLevelLabels.length !== 0) {
                if (axis.opposedPosition) {
                    axis.rect.y += (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
                    this.heatMap.initialClipRect.y += (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
                }
                rect.height -= (axis.angle === 0 || axis.angle === 180 || axis.angle === 360 ? 0 : this.padding);
            }
            if (axis.orientation === 'Horizontal' && !axis.opposedPosition) {
                axis.rect.y = rect.y + rect.height;
                axis.rect.height = 0;
            }
            if (axis.orientation === 'Vertical' && axis.opposedPosition) {
                axis.rect.x = rect.x + rect.width;
                axis.rect.width = 0;
            }
            axis.multiLevelPosition = [];
            for (let i = 0; i < axis.multiLevelLabels.length; i++) {
                const multiPosition = axis.multiPosition(axis, i);
                axis.multiLevelPosition.push(multiPosition);
            }
        }
    }
    drawXAxisLabels(axis, parent, rect) {
        const heatMap = this.heatMap;
        let labels = axis.axisLabels;
        let isLineBreak = false;
        const borderWidth = this.heatMap.cellSettings.border.width > 5 ? (this.heatMap.cellSettings.border.width / 2) : 0;
        const interval = (rect.width - borderWidth) / axis.axisLabelSize;
        let compactInterval = 0;
        let axisInterval = axis.interval ? axis.interval : 1;
        let tempintervel = rect.width / (axis.axisLabelSize / axis.axisLabelInterval);
        let temp = axis.axisLabelInterval;
        if (tempintervel > 0) {
            while (tempintervel < parseInt(axis.textStyle.size, 10)) {
                temp = temp + 1;
                tempintervel = rect.width / (axis.axisLabelSize / temp);
            }
        }
        else {
            temp = axis.tooltipLabels.length;
        }
        if (axis.axisLabelInterval < temp) {
            compactInterval = temp;
            labels = axis.tooltipLabels;
            axisInterval = temp;
        }
        let y;
        let padding = 10;
        let lableStrtX = rect.x + (!axis.isInversed ? 0 : rect.width);
        let labelPadding;
        let angle = axis.angle;
        padding = this.padding;
        let labelElement;
        let borderElement;
        if (!heatMap.enableCanvasRendering) {
            labelElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisLabels' });
            borderElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'XAxisLabelBorder' });
        }
        if (axis.isInversed && axis.labelIntersectAction === 'MultipleRows') {
            axis.multipleRow.reverse();
        }
        isLineBreak = getIsLineBreakLabel(labels);
        for (let i = 0, len = labels.length; i < len; i++) {
            const lableRect = new Rect(lableStrtX, rect.y, interval, rect.height);
            let elementSize = measureText(labels[i], axis.textStyle);
            let label = (axis.textStyle.textOverflow !== 'Wrap' && !(isLineBreak) && axis.textStyle.textOverflow !== 'Trim' && axis.labelIntersectAction === 'Trim' && (axis.isIntersect || elementSize.width > interval)) ? axis.valueType !== 'DateTime' ||
                axis.showLabelOn === 'None' ? textTrim(interval * axisInterval, labels[i], axis.textStyle) :
                textTrim(axis.dateTimeAxisLabelInterval[i] * interval, labels[i], axis.textStyle) : labels[i];
            label = ((axis.enableTrim || axis.textStyle.textOverflow === 'Trim') && !isLineBreak) ? textTrim((axis.textStyle.textOverflow === 'Trim' ? interval - (axis.border.width / 2) : axis.maxLabelLength), labels[i], axis.textStyle) : label;
            if (heatMap.enableHtmlSanitizer) {
                label = SanitizeHtmlHelper.sanitize(label);
            }
            let wrappedLabel = label;
            let wrappedlabels = [];
            let rotateSize = new Size(0, 0);
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim) {
                wrappedlabels = this.getLabels(wrappedLabel, interval - (axis.border.width / 2), axis, isLineBreak);
                wrappedLabel = this.getMaxLabel(wrappedlabels, axis);
            }
            else {
                if (isLineBreak && axis.enableTrim) {
                    wrappedlabels = this.getLabels(wrappedLabel, interval - (axis.border.width / 2), axis, isLineBreak);
                    wrappedLabel = textTrim(axis.maxLabelLength, wrappedlabels[0], axis.textStyle);
                    wrappedLabel = (label.indexOf('<br>') !== -1 || label.indexOf('<br/>') !== -1) && wrappedLabel.indexOf('...') === -1 ? wrappedLabel + '...' : wrappedLabel;
                    wrappedlabels = [];
                }
                wrappedlabels.push(wrappedLabel);
            }
            elementSize = measureText(wrappedLabel, axis.textStyle);
            let transform;
            labelPadding = (axis.opposedPosition) ? -(padding) : (padding + ((angle % 360) === 0 ? (elementSize.height / 2) : 0));
            elementSize.width = axis.isInversed ? (elementSize.width > interval ? interval : elementSize.width) : elementSize.width;
            let x = lableRect.x + ((!axis.isInversed) ?
                (lableRect.width / 2) - (elementSize.width / 2) : -((lableRect.width / 2) + (elementSize.width / 2)));
            if (axis.textStyle.textAlignment === 'Near') {
                x = lableRect.x - ((!axis.isInversed) ? 0 : lableRect.width);
            }
            else if (axis.textStyle.textAlignment === 'Far') {
                x = lableRect.x + ((!axis.isInversed) ?
                    (lableRect.width - elementSize.width) : -(elementSize.width));
            }
            if (axis.labelIntersectAction === 'Trim') {
                x = (!axis.isInversed) ? (x >= lableRect.x ? x : lableRect.x) : (x > (lableStrtX - interval) ? x : (lableStrtX - interval));
            }
            else if (angle % 180 === 0) {
                x = x < rect.x ? rect.x : x;
                x = ((x + elementSize.width) > (rect.x + rect.width)) ? (rect.x + rect.width - elementSize.width) : x;
            }
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.isInversed) {
                x = x < lableRect.x ? lableRect.x : x;
            }
            if (axis.labelIntersectAction === 'MultipleRows' && axis.textStyle.textOverflow !== 'Wrap' && axis.textStyle.textOverflow !== 'Trim' && axis.labelRotation === 0) {
                const a = axis.opposedPosition ? -(axis.multipleRow[i].index - 1) :
                    (axis.multipleRow[i].index - 1);
                if (axis.multipleRow[i].index > 1) {
                    y = rect.y + labelPadding + (elementSize.height * a) + (axis.opposedPosition ?
                        -(((elementSize.height * 0.5) / 2) * axis.multipleRow[i].index) :
                        (((elementSize.height * 0.5) / 2) * axis.multipleRow[i].index));
                }
                else {
                    y = rect.y + labelPadding + (axis.opposedPosition ? -((elementSize.height * 0.5) / 2) :
                        ((elementSize.height * 0.5) / 2));
                }
            }
            else {
                y = rect.y + ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && axis.opposedPosition && angle % 360 === 0 ? -(axis.farSizes.length >= 1 ? axis.farSizes[1] : 0) + padding : labelPadding);
            }
            this.drawXAxisBorder(axis, borderElement, axis.rect, x, elementSize.width, i);
            x = (axis.textStyle.textAlignment === 'Center' && wrappedlabels.length > 1) ? x + (elementSize.width / 2) : axis.textStyle.textAlignment === 'Near' ? x + padding / 2 : axis.textStyle.textAlignment === 'Far' ? x - padding / 2 : x;
            if (angle % 360 !== 0) {
                angle = (angle > 360) ? angle % 360 : angle;
                rotateSize = rotateTextSize(axis.textStyle, wrappedlabels, angle);
                /* eslint-disable max-len */
                x = lableRect.x + (axis.isInversed ? -(lableRect.width / 2) : (lableRect.width / 2)) + (angle === 90 ? (elementSize.height * ((wrappedlabels.length - 1) / 2)) : angle === 270 ? -(elementSize.height * (wrappedlabels.length - 1) / 2) : 0);
                /* eslint-disable max-len */
                y = y + (axis.opposedPosition ? (((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim ? (((angle % 360) === 180) ? padding : 0) + (rotateSize.height / 2) - (axis.farSizes.length >= 1 ? axis.farSizes[1] : 0) : -(rotateSize.height / 2)) + (axis.border.width / 2)) :
                    (((angle % 360) === 0) ? 0 : ((angle % 360) === 180) ? (rotateSize.height / 2) - (axis.border.width) + padding : (rotateSize.height / 2) - (axis.border.width)));
                if (wrappedlabels.length > 1) {
                    y = y - ((angle > 0 && angle < 80) || (angle > 300 && angle < 360) ? elementSize.height * ((wrappedlabels.length - 1) / 2) : (angle > 120 && angle < 240) && angle !== 180 && wrappedlabels.length > 2 ? -(elementSize.height * ((wrappedlabels.length - 2) / 2)) : 0);
                    x = x + ((angle > 0 && angle < 70) ? elementSize.height * ((wrappedlabels.length - 1) / 2) : 0);
                }
                transform = 'rotate(' + angle + ',' + x + ',' + y + ')';
            }
            if (this.heatMap.cellSettings.border.width > 5 && axis.opposedPosition) {
                y = y - (this.heatMap.cellSettings.border.width / 2);
            }
            if (this.heatMap.yAxis.opposedPosition && this.heatMap.cellSettings.border.width > 5) {
                x = x + (this.heatMap.cellSettings.border.width / 2);
            }
            if (this.heatMap.xAxis.isInversed && this.heatMap.cellSettings.border.width > 5) {
                x = x - (this.heatMap.cellSettings.border.width / 2);
            }
            if (elementSize.width >= interval) {
                x = axis.border.width ? x + (axis.border.width / 2) : x;
            }
            x = axis.textStyle.textAlignment === 'Near' ? x + (axis.border.width / 2) : axis.textStyle.textAlignment === 'Far' ?
                x - (axis.border.width / 2) : x;
            x = (angle % 360 === 0) && axis.textStyle.textAlignment === 'Center' && elementSize.width > interval ? lableRect.x + ((!axis.isInversed) ?
                (elementSize.width / 2) : -((elementSize.width / 2))) : x;
            const options = new TextOption(heatMap.element.id + '_XAxis_Label' + i, new TextBasic(x, y, (angle % 360 === 0) ? (axis.textStyle.textAlignment === 'Center' && wrappedlabels.length > 1) ? 'middle' : 'start' : 'middle', label, angle, transform), axis.textStyle, axis.textStyle.color || heatMap.themeStyle.axisLabel);
            /* eslint-disable max-len */
            options.text = isLineBreak ? wrappedlabels : getTitle(options.text, axis.textStyle, lableRect.width - (axis.border.width / 2));
            if (angle !== 0 && this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.canvasDrawText(options, null, null, null, wrappedlabels, elementSize.height, true);
            }
            else {
                if (axis.textStyle.textOverflow === 'Wrap' || isLineBreak) {
                    this.drawSvgCanvas.createWrapText(options, axis.textStyle, labelElement);
                }
                else {
                    this.drawSvgCanvas.createText(options, labelElement, label);
                }
            }
            if (compactInterval === 0) {
                const labelInterval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') ?
                    axis.dateTimeAxisLabelInterval[i] : axis.axisLabelInterval;
                lableStrtX = lableStrtX + (!axis.isInversed ? (labelInterval * interval) :
                    -(labelInterval * interval));
            }
            else {
                lableStrtX = lableStrtX + (!axis.isInversed ? (compactInterval * interval) : -(compactInterval * interval));
            }
            if (wrappedLabel.indexOf('...') !== -1) {
                const xValue = axis.angle % 360 !== 0 ? x - (rotateSize.width / 2) : (axis.textStyle.textAlignment === 'Center' ? x - (elementSize.width / 2) : x);
                const yValue = y - (axis.angle % 360 !== 0 ? (rotateSize.height / 2) : elementSize.height);
                label = labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1 ? labels[i].replace(/<br\s*\/?>/g, ' ') : labels[i];
                this.heatMap.tooltipCollection.push(new CanvasTooltip(label, new Rect(xValue, yValue, axis.angle % 360 !== 0 ? rotateSize.width : elementSize.width, axis.angle % 360 !== 0 ? rotateSize.height : elementSize.height * wrappedlabels.length)));
            }
            if (compactInterval !== 0) {
                i = i + (compactInterval - 1);
            }
        }
        if (!heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
            parent.appendChild(borderElement);
        }
    }
    getWrappedLabels(wrappedLabel, labelInterval, axis) {
        const wrappedlabels = wrappedLabel.split(/<br\s*\/?>/, -1);
        for (let i = 0; i < wrappedlabels.length; i++) {
            const label = wrappedlabels[i];
            wrappedlabels[i] = textTrim(labelInterval, label, axis.textStyle);
        }
        return wrappedlabels;
    }
    getMaxLabel(wrappedlabels, axis) {
        let label = '';
        let labelWidth = 0;
        let wrappedlabelSize = new Size(0, 0);
        for (let index = 0; index < wrappedlabels.length; index++) {
            wrappedlabelSize = measureText(wrappedlabels[index], axis.textStyle);
            if (wrappedlabelSize.width > labelWidth) {
                labelWidth = wrappedlabelSize.width;
                label = wrappedlabels[index];
            }
        }
        return label;
    }
    getLabels(label, labelInterval, axis, isLineBreak) {
        let wrappedlabels = [];
        if (isLineBreak) {
            wrappedlabels = this.getWrappedLabels(label, labelInterval, axis);
        }
        else {
            wrappedlabels = textWrap(label, labelInterval, axis.textStyle);
        }
        return wrappedlabels;
    }
    drawYAxisLabels(axis, parent, rect) {
        const heatMap = this.heatMap;
        let labels = axis.axisLabels;
        const interval = rect.height / axis.axisLabelSize;
        let compactInterval = 0;
        let tempintervel = rect.height / (axis.axisLabelSize / axis.axisLabelInterval);
        let temp = axis.axisLabelInterval;
        let label;
        if (tempintervel > 0) {
            while (tempintervel < parseInt(axis.textStyle.size, 10)) {
                temp = temp + 1;
                tempintervel = rect.height / (axis.axisLabelSize / temp);
            }
        }
        else {
            temp = axis.tooltipLabels.length;
        }
        if (axis.axisLabelInterval < temp) {
            compactInterval = temp;
            labels = axis.tooltipLabels;
        }
        let padding = 10;
        const labelPadding = 5;
        let lableStartY = rect.y + (axis.isInversed ? 0 : rect.height);
        let anchor = axis.opposedPosition ? 'start' : 'end';
        padding = axis.opposedPosition ? padding : -padding;
        let labelElement;
        let borderElement;
        if (!heatMap.enableCanvasRendering) {
            labelElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisLabels' });
            borderElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + 'YAxisLabelBorder' });
        }
        const isLineBreak = getIsLineBreakLabel(labels);
        for (let i = 0, len = labels.length; i < len; i++) {
            const labelRect = new Rect(rect.x, lableStartY, rect.width, interval);
            let position = axis.isInversed ? labelRect.height / 2 : -(labelRect.height / 2); //titlePositionY(lableRect, 0, 0, axis.textStyle);
            const axisWidth = this.heatMap.cellSettings.border.width >= 20 ? (this.heatMap.cellSettings.border.width / 2) : 0;
            const indexValue = this.heatMap.cellSettings.border.width > 5 ?
                (((this.heatMap.cellSettings.border.width / 2) / len) * (axis.isInversed ? (i) : (len - i))) : 0;
            label = (axis.enableTrim || axis.textStyle.textOverflow === 'Trim') && !isLineBreak ? textTrim(axis.maxLabelLength, labels[i], axis.textStyle) : labels[i];
            if (heatMap.enableHtmlSanitizer) {
                label = SanitizeHtmlHelper.sanitize(label);
            }
            const elementSize = measureText(label, axis.textStyle);
            let labelLength = 1;
            let wrappedLabel = [];
            let rotateSize = new Size(0, 0);
            if ((axis.textStyle.textOverflow === 'Wrap' || isLineBreak) && !axis.enableTrim) {
                wrappedLabel = this.getLabels(label, axis.maxLabelLength, axis, isLineBreak);
                for (let index = 0; index < wrappedLabel.length; index++) {
                    if ((elementSize.height * wrappedLabel.length) > (tempintervel + (labelPadding)) && wrappedLabel.length > 0 && (axis.angle !== 90 && axis.angle !== 270)) {
                        wrappedLabel.pop();
                        if (wrappedLabel.length > 0) {
                            wrappedLabel[wrappedLabel.length - 1] = wrappedLabel[wrappedLabel.length - 1] + '...';
                            /* eslint-disable max-len */
                            wrappedLabel[wrappedLabel.length - 1] = textTrim(axis.maxLabelLength, wrappedLabel[wrappedLabel.length - 1], axis.textStyle);
                        }
                    }
                }
                if (!(isLineBreak)) {
                    label = wrappedLabel.length !== 0 ? '' : label;
                    for (let labelIndex = 0; labelIndex < wrappedLabel.length; labelIndex++) {
                        label = isNullOrUndefined(label) ? wrappedLabel[labelIndex] : label + ' ' + wrappedLabel[labelIndex];
                    }
                }
                labelLength = wrappedLabel.length;
            }
            else {
                if (isLineBreak && axis.enableTrim) {
                    wrappedLabel = this.getLabels(label, axis.maxLabelLength, axis, isLineBreak);
                    const trimmedLabel = textTrim(axis.maxLabelLength, wrappedLabel[0], axis.textStyle);
                    label = (label.indexOf('<br>') !== -1 || label.indexOf('<br/>') !== -1) && trimmedLabel.indexOf('...') === -1 ? trimmedLabel + '...' : trimmedLabel;
                    wrappedLabel = [];
                }
                wrappedLabel.push(label);
            }
            let x = labelRect.x + padding + (axis.opposedPosition ? (axis.textStyle.textOverflow === 'Wrap' && axis.angle % 360 !== 0 ? labelLength * (elementSize.height / 2) : 0) + axisWidth : -axisWidth);
            if (axis.textStyle.textAlignment === 'Far' && axis.angle % 360 === 0) {
                /* eslint-disable max-len */
                position = axis.isInversed ? labelRect.height - (labelLength > 1 ? (elementSize.height * labelLength) - (elementSize.height / 2) : (elementSize.height / 2)) :
                    -(labelLength > 1 ? (elementSize.height * labelLength) - (elementSize.height / 2) : (elementSize.height / 2));
            }
            else if (axis.textStyle.textAlignment === 'Near' && axis.angle % 360 === 0) {
                /* eslint-disable max-len */
                position = (axis.isInversed ? elementSize.height / 2 : ((elementSize.height / 2) - labelRect.height)) + (axis.border.width / 2);
            }
            let y = (labelRect.y - indexValue) + position - ((labelLength > 1 && axis.textStyle.textAlignment === 'Center') || (axis.angle % 360 !== 0 && axis.opposedPosition) ? (((elementSize.height * labelLength) / 2) - (elementSize.height / 2)) : 0);
            if (axis.angle % 360 !== 0) {
                anchor = 'middle';
                axis.angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                rotateSize = rotateTextSize(axis.textStyle, wrappedLabel, axis.angle);
                x = labelRect.x + (axis.opposedPosition ? (rotateSize.width / 2 + padding) : -(rotateSize.width / 2 - padding)) + (axis.angle === 90 ? (elementSize.height * ((wrappedLabel.length - 1) / 2)) : axis.angle === 270 ? -(elementSize.height * (wrappedLabel.length - 1) / 2) : 0);
                y = labelRect.y + (axis.isInversed ? (labelRect.height / 2) : (-labelRect.height / 2)) + (axis.angle === 180 ? (elementSize.height * ((wrappedLabel.length - 1) / 2)) : 0);
                if (wrappedLabel.length > 1) {
                    const value = elementSize.height * ((wrappedLabel.length - 1) / 2);
                    y = y - ((axis.angle > 0 && axis.angle < 60) || (axis.angle > 290 && axis.angle < 360) ? value : (axis.angle > 115 && axis.angle < 240) && axis.angle !== 180 ? -value : 0);
                    x = x + (axis.angle > 20 && axis.angle < 160 && axis.angle !== 90 ? value : axis.angle > 200 && axis.angle < 330 && axis.angle !== 270 ? -value - (axis.angle > 200 && axis.angle < 240 && !axis.opposedPosition && wrappedLabel.length > 2 ? -(elementSize.height * ((wrappedLabel.length - 2) / 2)) : 0) :
                        (axis.angle >= 330 && axis.angle < 350 ? -value / 2 : 0));
                }
            }
            const options = new TextOption(heatMap.element.id + '_YAxis_Label' + i, new TextBasic(x, y, anchor, label, axis.angle, 'rotate(' + axis.angle + ',' + (x) + ',' + (y) + ')', 'middle'), axis.textStyle, axis.textStyle.color || heatMap.themeStyle.axisLabel);
            if (Browser.isIE && !heatMap.enableCanvasRendering) {
                options.dy = '1ex';
            }
            options.text = isLineBreak ? wrappedLabel : getTitle(options.text, axis.textStyle, axis.maxLabelLength);
            if (axis.angle !== 0 && this.heatMap.enableCanvasRendering) {
                this.drawSvgCanvas.canvasDrawText(options, null, null, null, wrappedLabel, elementSize.height, true);
            }
            else {
                if (axis.textStyle.textOverflow === 'Wrap' || isLineBreak) {
                    this.drawSvgCanvas.createWrapText(options, axis.textStyle, labelElement);
                }
                else {
                    this.drawSvgCanvas.createText(options, labelElement, label);
                }
            }
            if (compactInterval === 0) {
                const labelInterval = (axis.valueType === 'DateTime' && axis.showLabelOn !== 'None') ?
                    axis.dateTimeAxisLabelInterval[i] : axis.axisLabelInterval;
                lableStartY = lableStartY + (axis.isInversed ? (labelInterval * interval) :
                    -(labelInterval * interval));
            }
            else {
                lableStartY = lableStartY + (axis.isInversed ? (compactInterval * interval) : -(compactInterval * interval));
                i = i + (compactInterval - 1);
            }
            this.drawYAxisBorder(axis, borderElement, axis.rect, y, elementSize.height, i);
            label = this.getMaxLabel(wrappedLabel, axis);
            if (label.indexOf('...') !== -1) {
                const xValue = axis.opposedPosition ? x : (x - (axis.angle % 360 !== 0 ? (rotateSize.width / 2) : elementSize.width));
                const yValue = y - (axis.angle % 360 !== 0 ? (rotateSize.height / 2) : elementSize.height);
                label = labels[i].indexOf('<br>') !== -1 || labels[i].indexOf('<br/>') !== -1 ? labels[i].replace(/<br\s*\/?>/g, ' ') : labels[i];
                this.heatMap.tooltipCollection.push(new CanvasTooltip(label, new Rect(xValue, yValue, (axis.angle % 360 !== 0 ? rotateSize.width : elementSize.width), (axis.angle % 360 !== 0 ? rotateSize.height : elementSize.height * wrappedLabel.length))));
            }
        }
        if (!heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
            parent.appendChild(borderElement);
        }
    }
    drawXAxisBorder(axis, parent, rect, lableX, width, index) {
        const interval = rect.width / axis.axisLabelSize;
        let path = '';
        const padding = 10;
        const axisInterval = axis.interval ? axis.interval : 1;
        const startX = axis.isInversed ? rect.x + rect.width - (interval * index * axisInterval) :
            rect.x + (interval * index * axisInterval);
        const startY = rect.y;
        let endX;
        let endY;
        endY = startY + (axis.opposedPosition ? -(axis.maxLabelSize.height + padding) : axis.maxLabelSize.height + padding);
        // eslint-disable-next-line prefer-const
        endX = axis.isInversed ? startX - interval : startX + interval;
        let endY1 = axis.isInversed ? (lableX + width + padding) : (lableX - padding);
        let endY2 = axis.isInversed ? (lableX - padding) : (lableX + width + padding);
        endY2 = axis.textStyle.textAlignment === 'Near' && axis.isInversed ? endY2 + padding : axis.textStyle.textAlignment === 'Far' && !axis.isInversed ? endY2 - padding : endY2;
        endY1 = axis.textStyle.textAlignment === 'Far' && axis.isInversed ? endY1 - padding : axis.textStyle.textAlignment === 'Near' && !axis.isInversed ? endY1 + padding : endY1;
        switch (axis.border.type) {
            case 'Rectangle':
                path = ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY);
                break;
            case 'WithoutTopBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
            case 'WithoutBottomBorder':
                path = 'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                endY = startY + ((endY - startY) / 2) + (axis.opposedPosition ? 0 : 5);
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endY1 + ' ' + endY + ' ' + 'M' + ' ' + endY2 +
                    ' ' + endY + ' ' + 'L' +
                    ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
        }
        if (axis.border.width > 0 && axis.border.type !== 'WithoutBorder') {
            this.createAxisBorderElement(axis, path, parent, index);
        }
    }
    drawYAxisBorder(axis, parent, rect, lableY, height, index) {
        const interval = rect.height / axis.axisLabelSize;
        let path = '';
        const padding = 20;
        const axisInterval = axis.interval ? axis.interval : 1;
        const startX = rect.x;
        const startY = axis.isInversed ? rect.y + (interval * index * axisInterval) :
            rect.y + rect.height - (interval * index * axisInterval);
        let endX;
        let endY;
        endX = startX + (!axis.opposedPosition ? -(axis.maxLabelSize.width + padding) : axis.maxLabelSize.width + padding);
        // eslint-disable-next-line prefer-const
        endY = axis.isInversed ? startY + interval : startY - interval;
        const endY1 = axis.isInversed ? lableY - height / 2 : lableY + height / 2;
        const endY2 = axis.isInversed ? lableY + height / 2 : lableY - height / 2;
        switch (axis.border.type) {
            case 'Rectangle':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY;
                break;
            case 'WithoutTopBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'WithoutBottomBorder':
                path = 'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'M' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'Brace':
                endX = startX - (startX - endX) / 2;
                path = 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY1 + ' ' + 'M' + ' ' +
                    endX + ' ' + endY2 + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ' +
                    'L' + ' ' + startX + ' ' + endY;
                break;
        }
        if (axis.border.width > 0 && axis.border.type !== 'WithoutBorder') {
            this.createAxisBorderElement(axis, path, parent, index);
        }
    }
    /**
     * To create border element for axis.
     *
     * @returns {void}
     * @private
     */
    createAxisBorderElement(axis, labelBorder, parent, index) {
        let canvasTranslate;
        const id = axis.orientation === 'Horizontal' ? '_XAxis_Label_Border' : '_YAxis_Label_Border';
        const pathOptions = new PathOption(this.heatMap.element.id + id + index, 'transparent', axis.border.width, axis.border.color, 1, 'none', labelBorder);
        if (!this.heatMap.enableCanvasRendering) {
            const borderElement = this.heatMap.renderer.drawPath(pathOptions);
            parent.appendChild(borderElement);
        }
        else {
            this.heatMap.canvasRenderer.drawPath(pathOptions, canvasTranslate);
        }
    }
    drawMultiLevels(parent, axis) {
        let element;
        if (!this.heatMap.enableCanvasRendering) {
            element = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_' + axis.orientation + '_MultiLevelLabel' });
        }
        if (axis.orientation === 'Horizontal') {
            this.renderXAxisMultiLevelLabels(axis, element);
        }
        else {
            this.renderYAxisMultiLevelLabels(axis, element);
        }
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(element);
        }
    }
    /**
     * render x axis multi level labels
     *
     * @private
     * @returns {void}
     */
    renderXAxisMultiLevelLabels(axis, parent) {
        let x = 0;
        let y;
        const padding = 10;
        let startX;
        let startY;
        let endX = 0;
        let tooltip;
        let start;
        let end;
        let labelSize;
        let anchor;
        const isInversed = axis.isInversed;
        let labelElement;
        const opposedPosition = axis.opposedPosition;
        let pathRect = '';
        let gap;
        let textLength;
        const position = (isInversed ? axis.rect.width : 0) + axis.rect.x;
        axis.multiLevelLabels.map((multiLevel, level) => {
            labelElement = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_XAxisMultiLevelLabel' + level });
            multiLevel.categories.map((categoryLabel, i) => {
                if (!isNullOrUndefined(categoryLabel.start) && !isNullOrUndefined(categoryLabel.end)) {
                    if (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'TailwindDark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: 'Inter' } }, true);
                    }
                    if (this.heatMap.theme === 'Tailwind3' || this.heatMap.theme === 'Tailwind3Dark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: this.heatMap.themeStyle.axisLabel, fontFamily: 'Inter', fontWeight: '400' } }, true);
                    }
                    if (this.heatMap.theme === 'Material3' || this.heatMap.theme === 'Material3Dark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: 'Roboto' } }, true);
                    }
                    if (this.heatMap.theme === 'Fluent' || this.heatMap.theme === 'FluentDark') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } }, true);
                    }
                    if (this.heatMap.theme === 'Fluent2') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#242424', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (this.heatMap.theme === 'Fluent2Dark' || this.heatMap.theme === 'Fluent2HighContrast') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#FFFFFF', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (this.heatMap.theme === 'Bootstrap5') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#212529', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    if (this.heatMap.theme === 'Bootstrap5Dark') {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        multiLevel.setProperties({ textStyle: { color: '#DEE2E6', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                    }
                    tooltip = false;
                    start = typeof categoryLabel.start === 'number' ? categoryLabel.start : Number(new Date(categoryLabel.start));
                    end = typeof categoryLabel.end === 'number' ? categoryLabel.end : Number(new Date(categoryLabel.end));
                    startX = position + this.calculateLeftPosition(axis, start, categoryLabel.start, axis.rect);
                    startY = axis.multiLevelPosition[level].y;
                    endX = position + this.calculateWidth(axis, categoryLabel.end, end, axis.rect);
                    const text = this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text;
                    labelSize = measureText(text, multiLevel.textStyle);
                    gap = ((categoryLabel.maximumTextWidth === null) ? Math.abs(endX - startX) : categoryLabel.maximumTextWidth) - padding;
                    y = startY + (opposedPosition ? -((axis.xAxisMultiLabelHeight[level] - labelSize.height)) : labelSize.height);
                    x = !isInversed ? startX + padding : startX - gap;
                    if (multiLevel.alignment === 'Center') {
                        x = ((endX - startX) / 2) + startX;
                        x -= (labelSize.width > gap ? gap : labelSize.width) / 2;
                    }
                    else if (multiLevel.alignment === 'Far') {
                        x = !isInversed ? endX - padding : startX - padding;
                        x -= (labelSize.width > gap ? gap : labelSize.width);
                    }
                    else {
                        x = !isInversed ? startX + padding : endX + padding;
                    }
                    if (multiLevel.overflow === 'None' && labelSize.width > Math.abs(endX - startX)) {
                        x = !isInversed ? startX + padding : startX - labelSize.width - padding;
                        anchor = 'start';
                    }
                    const textBasic = new TextBasic(x, y, anchor, text, 0, 'translate(0,0)');
                    const options = new TextOption(this.heatMap.element.id + '_XAxis_MultiLevel' + level + '_Text' + i, textBasic, multiLevel.textStyle, multiLevel.textStyle.color || this.heatMap.themeStyle.axisLabel);
                    if (multiLevel.overflow === 'Wrap') {
                        options.text = textWrap(text, gap, multiLevel.textStyle);
                        textLength = options.text.length;
                    }
                    else if (multiLevel.overflow === 'Trim') {
                        options.text = textTrim(gap, text, multiLevel.textStyle);
                        textLength = 1;
                    }
                    if (multiLevel.overflow === 'Wrap' && options.text.length > 1) {
                        this.drawSvgCanvas.createWrapText(options, multiLevel.textStyle, labelElement);
                        for (let i = 0; i < options.text.length; i++) {
                            if (options.text[i].indexOf('...') !== -1) {
                                tooltip = true;
                                break;
                            }
                        }
                    }
                    else {
                        this.drawSvgCanvas.createText(options, labelElement, options.text);
                    }
                    if (!this.heatMap.enableCanvasRendering) {
                        parent.appendChild(labelElement);
                    }
                    if (options.text.indexOf('...') !== -1 || options.text[0].indexOf('...') !== -1 || tooltip) {
                        this.heatMap.tooltipCollection.push(new CanvasTooltip(categoryLabel.text, new Rect(x, y - labelSize.height, gap, labelSize.height * textLength)));
                    }
                    if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                        pathRect = this.renderXAxisLabelBorder(level, axis, startX, startY, endX, pathRect, level, labelSize, gap, x);
                    }
                }
            });
            if (pathRect !== '') {
                this.createBorderElement(level, axis, pathRect, parent);
                pathRect = '';
            }
        });
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
        }
    }
    /**
     * render x axis multi level labels border
     *
     * @private
     * @returns {void}
     */
    renderXAxisLabelBorder(labelIndex, axis, startX, startY, endX, path, level, labelSize, gap, x) {
        let path1;
        let path2;
        const endY = startY + (axis.opposedPosition ? -(axis.xAxisMultiLabelHeight[labelIndex]) :
            axis.xAxisMultiLabelHeight[labelIndex]);
        const padding = 3;
        switch (axis.multiLevelLabels[level].border.type) {
            case 'Rectangle':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ';
                break;
            case 'WithoutTopBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
            case 'WithoutBottomBorder':
                path += 'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                    'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                path1 = axis.isInversed ? (labelSize.width > gap ? gap : labelSize.width) + x + padding : x - padding;
                path2 = axis.isInversed ? x - padding : (labelSize.width > gap ? gap : labelSize.width) + x + padding;
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + (startY + (endY - startY) / 2) + ' ' +
                    'L' + ' ' + path1 + ' ' + (startY + (endY - startY) / 2) + ' ' + 'M' + ' ' + path2 + ' ' + (startY +
                    (endY - startY) / 2) + ' ' + 'L' + ' ' + endX + ' ' + (startY + (endY - startY) / 2) +
                    ' ' + 'L' + ' ' + endX + ' ' + startY + ' ';
                break;
        }
        return path;
    }
    /**
     * render y axis multi level labels
     *
     * @private
     * @returns {void}
     */
    renderYAxisMultiLevelLabels(axis, parent) {
        let x = 0;
        let y;
        const padding = 10;
        let startX;
        let startY;
        let endY;
        let start;
        let end;
        let labelSize;
        const isInversed = axis.isInversed;
        let labelElement;
        let pathRect = '';
        let gap;
        let text;
        const position = (!isInversed ? axis.rect.height : 0) + axis.rect.y;
        axis.multiLevelLabels.map((multiLevel, level) => {
            startY = axis.multiLevelPosition[level].y;
            labelElement = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_YAxisMultiLevelLabel' + level });
            multiLevel.categories.map((categoryLabel, i) => {
                if (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'TailwindDark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Inter' } }, true);
                }
                if (this.heatMap.theme === 'Tailwind3' || this.heatMap.theme === 'Tailwind3Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: this.heatMap.themeStyle.axisLabel, fontFamily: 'Inter', fontWeight: '400' } }, true);
                }
                if (this.heatMap.theme === 'Material3' || this.heatMap.theme === 'Material3Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Roboto' } }, true);
                }
                if (this.heatMap.theme === 'Bootstrap5' || this.heatMap.theme === 'Bootstrap5Dark') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { fontFamily: 'Segoe UI' } }, true);
                }
                if (this.heatMap.theme === 'Fluent2') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: '#242424', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                }
                if (this.heatMap.theme === 'Fluent2Dark' || this.heatMap.theme === 'Fluent2HighContrast') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiLevel.setProperties({ textStyle: { color: '#FFFFFF', size: '12px', fontWeight: '400', fontFamily: 'Segoe UI' } }, true);
                }
                start = typeof categoryLabel.start === 'number' ? categoryLabel.start : Number(new Date(categoryLabel.start));
                end = typeof categoryLabel.end === 'number' ? categoryLabel.end : Number(new Date(categoryLabel.end));
                startY = position + this.calculateLeftPosition(axis, start, categoryLabel.start, axis.rect);
                startX = axis.multiLevelPosition[level].x;
                endY = position + this.calculateWidth(axis, categoryLabel.start, end, axis.rect);
                const categoryText = this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text;
                labelSize = measureText(categoryText, multiLevel.textStyle);
                gap = ((categoryLabel.maximumTextWidth === null) ? Math.abs(startX) : categoryLabel.maximumTextWidth) - padding;
                const maxWidth = Math.abs(startX - (startX - axis.multiLevelSize[level].width - 2 * padding)) / 2 -
                    (labelSize.width / 2);
                x = (axis.opposedPosition ? startX : startX - axis.multiLevelSize[level].width - 2 * padding) + maxWidth;
                y = startY + padding;
                if (multiLevel.overflow !== 'None') {
                    if (multiLevel.overflow === 'Wrap') {
                        text = textWrap(categoryText, gap, multiLevel.textStyle);
                    }
                    else {
                        text = textTrim(gap, categoryText, multiLevel.textStyle);
                    }
                }
                if (multiLevel.alignment === 'Center') {
                    y += ((endY - startY) / 2 - (text.length * labelSize.height) / 2);
                }
                else if (multiLevel.alignment === 'Far') {
                    y = isInversed ? endY - labelSize.height / 2 : y - labelSize.height;
                }
                else {
                    y = isInversed ? y + labelSize.height / 2 : endY + labelSize.height;
                }
                if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                    pathRect = this.renderYAxisLabelBorder(level, axis, startX, startY, endY, pathRect, level, labelSize, gap, y);
                }
                const textBasic = new TextBasic(x, y, 'start', this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(categoryLabel.text) : categoryLabel.text, 0, 'translate(0,0)');
                const options = new TextOption(this.heatMap.element.id + '_YAxis_MultiLevel' + level + '_Text' + i, textBasic, multiLevel.textStyle, multiLevel.textStyle.color || this.heatMap.themeStyle.axisLabel);
                options.text = text;
                this.drawSvgCanvas.createText(options, labelElement, options.text);
                if (options.text.indexOf('...') !== -1) {
                    this.heatMap.tooltipCollection.push(new CanvasTooltip(categoryLabel.text, new Rect(x, y - labelSize.height, gap, labelSize.height)));
                }
                if (!this.heatMap.enableCanvasRendering) {
                    parent.appendChild(labelElement);
                }
            });
            if (pathRect !== '') {
                this.createBorderElement(level, axis, pathRect, parent);
                pathRect = '';
            }
        });
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(labelElement);
        }
    }
    /**
     * render x axis multi level labels border
     *
     * @private
     * @returns {void}
     */
    renderYAxisLabelBorder(labelIndex, axis, startX, startY, endY, path, level, labelSize, gap, y) {
        let padding = 20;
        let path1;
        let path2;
        const endX = startX - (axis.opposedPosition ? -(axis.multiLevelSize[labelIndex].width + padding) :
            (axis.multiLevelSize[labelIndex].width + padding));
        switch (axis.multiLevelLabels[level].border.type) {
            case 'Rectangle':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ';
                break;
            case 'WithoutTopBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'L' + ' ' + endX + ' ' + endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
            case 'WithoutBottomBorder':
                path += 'M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + startY + ' ' +
                    'L' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'WithoutTopandBottomBorder':
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + startY + ' ' +
                    'M' + ' ' + startX + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ';
                break;
            case 'Brace':
                padding = 10;
                path1 = axis.isInversed ? (y - padding - 5) : (y + (labelSize.height) - padding);
                path2 = axis.isInversed ? (y + (labelSize.height) - padding) : (y - padding - 5);
                path += 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + (startX + (endX - startX) / 2) + ' ' + startY + ' ' +
                    'L' + ' ' + (startX + (endX - startX) / 2) + ' ' + path1 + ' ' + 'M' + ' ' + (startX + (endX - startX) / 2) +
                    ' ' + path2 + ' ' + 'L' + ' ' + (startX + (endX - startX) / 2) + ' ' +
                    endY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ';
                break;
        }
        return path;
    }
    /**
     * create borer element
     *
     * @returns {void}
     * @private
     */
    createBorderElement(borderIndex, axis, path, parent) {
        let canvasTranslate;
        const id = axis.orientation === 'Horizontal' ? 'XAxis' : 'YAxis';
        const pathOptions = new PathOption(this.heatMap.element.id + '_' + id + '_MultiLevel_Rect_' + borderIndex, 'Transparent', axis.multiLevelLabels[borderIndex].border.width, axis.multiLevelLabels[borderIndex].border.color, 1, '', path);
        const borderElement = this.heatMap.renderer.drawPath(pathOptions);
        if (!this.heatMap.enableCanvasRendering) {
            parent.appendChild(borderElement);
        }
        else {
            this.heatMap.canvasRenderer.drawPath(pathOptions, canvasTranslate);
        }
    }
    /**
     * calculate left position of border element
     *
     * @private
     */
    calculateLeftPosition(axis, start, label, rect) {
        let value;
        let interval;
        if (typeof label === 'number') {
            if (axis.valueType === 'Numeric' && (axis.minimum || axis.maximum)) {
                const min = axis.minimum ? axis.minimum : 0;
                start -= min;
            }
            const size = axis.orientation === 'Horizontal' ? rect.width : rect.height;
            interval = size / (axis.axisLabelSize * axis.increment);
            value = (axis.isInversed ? -1 : 1) * start * interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        else {
            interval = this.calculateNumberOfDays(start, axis, true, rect);
            value = axis.isInversed ? -interval : interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        return value;
    }
    /**
     * calculate width of border element
     *
     * @private
     */
    calculateWidth(axis, label, end, rect) {
        let interval;
        let value;
        if (typeof label === 'number') {
            if (axis.valueType === 'Numeric' && (axis.minimum || axis.maximum)) {
                const min = axis.minimum ? axis.minimum : 0;
                end -= min;
            }
            const size = axis.orientation === 'Horizontal' ? rect.width : rect.height;
            interval = size / (axis.axisLabelSize * axis.increment);
            value = (axis.isInversed ? -1 : 1) * (end + 1) * interval;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        else {
            interval = this.calculateNumberOfDays(end, axis, false, rect);
            value = interval;
            value = axis.isInversed ? -value : value;
            value = axis.orientation === 'Horizontal' ? value : -value;
        }
        return value;
    }
    calculateNumberOfDays(date, axis, start, rect) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const oneMinute = 60 * 1000;
        let firstDate;
        let secondDate;
        const labels = axis.labelValue;
        let position;
        const interval = (axis.orientation === 'Horizontal' ? rect.width : rect.height) / axis.axisLabelSize;
        const givenDate = new Date(Number(date));
        let days = 0;
        for (let index = 0; index < axis.axisLabelSize; index++) {
            firstDate = new Date(Number(labels[index]));
            secondDate = axis.isInversed ? new Date(Number(labels[index - 1])) : new Date(Number(labels[index + 1]));
            if (index === (axis.isInversed ? 0 : axis.axisLabelSize - 1)) {
                secondDate = new Date(Number(labels[index]));
                if (axis.intervalType === 'Hours') {
                    secondDate = new Date(Number(secondDate.setHours(secondDate.getHours() + 1)));
                }
                else if ((axis.intervalType === 'Minutes')) {
                    secondDate = new Date(Number(secondDate.setMinutes(secondDate.getMinutes() + 1)));
                }
                else if ((axis.intervalType === 'Days')) {
                    secondDate = new Date(Number(secondDate.setDate(secondDate.getDate() + 1)));
                }
                else {
                    const numberOfDays = axis.intervalType === 'Months' ?
                        new Date(secondDate.getFullYear(), secondDate.getMonth() + 1, 0).getDate() :
                        secondDate.getFullYear() % 4 === 0 ? 366 : 365;
                    secondDate = new Date(Number(secondDate.setDate(secondDate.getDate() + numberOfDays)));
                }
            }
            if (Number(firstDate) <= date && Number(secondDate) >= date) {
                if (axis.intervalType === 'Minutes' || axis.intervalType === 'Hours') {
                    const totalMinutes = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneMinute)));
                    const minutesInHours = Math.abs((firstDate.getTime() - givenDate.getTime()) / (oneMinute));
                    days = (interval / totalMinutes) * minutesInHours;
                    index = axis.isInversed ? axis.axisLabelSize - 1 - index : index;
                    position = index * interval + days;
                    break;
                }
                else {
                    const numberOfDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                    // eslint-disable-next-line
                    start ? givenDate.getDate() : givenDate.setDate(givenDate.getDate() + 1);
                    if (numberOfDays !== 0) {
                        days = (interval / numberOfDays) * (Math.abs((firstDate.getTime() - givenDate.getTime()) / (oneDay)));
                    }
                    index = axis.isInversed ? axis.axisLabelSize - 1 - index : index;
                    position = index * interval + days;
                    break;
                }
            }
        }
        return position;
    }
    /**
     * @returns {void}
     * @private
     */
    destroy() {
        this.drawSvgCanvas = null;
        this.element = null;
        this.htmlObject = null;
        this.initialClipRect = null;
        this.heatMap = null;
    }
}

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to configure the cells of the heatmap.
 */
class CellSettings extends ChildProperty {
}
__decorate$3([
    Property('')
], CellSettings.prototype, "labelTemplate", void 0);
__decorate$3([
    Property(true)
], CellSettings.prototype, "showLabel", void 0);
__decorate$3([
    Property('')
], CellSettings.prototype, "format", void 0);
__decorate$3([
    Property(true)
], CellSettings.prototype, "enableCellHighlighting", void 0);
__decorate$3([
    Complex({}, BubbleSize)
], CellSettings.prototype, "bubbleSize", void 0);
__decorate$3([
    Complex({}, Border)
], CellSettings.prototype, "border", void 0);
__decorate$3([
    Complex(Theme.rectLabelFont, Font)
], CellSettings.prototype, "textStyle", void 0);
__decorate$3([
    Property('Rect')
], CellSettings.prototype, "tileType", void 0);
__decorate$3([
    Property('Color')
], CellSettings.prototype, "bubbleType", void 0);
__decorate$3([
    Property(false)
], CellSettings.prototype, "isInversedBubbleSize", void 0);
class Series {
    constructor(heatMap) {
        this.heatMap = heatMap;
        this.drawSvgCanvas = new DrawSvgCanvas(this.heatMap);
        this.cellColor = new CellColor(this.heatMap);
    }
    /**
     * To render rect series.
     *
     * @returns {void}
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    renderRectSeries() {
        this.createSeriesGroup();
        const heatMap = this.heatMap;
        let isValueInRange = false;
        heatMap.xLength = heatMap.axisCollections[0].axisLabelSize;
        heatMap.yLength = heatMap.axisCollections[1].axisLabelSize; // Series Part
        let tempX = Math.round(heatMap.initialClipRect.x * 100) / 100;
        let tempY = Math.round(heatMap.initialClipRect.y * 100) / 100;
        let dataXIndex = 0;
        let dataYIndex = 0;
        const cellSetting = heatMap.cellSettings;
        const tempWidth = Math.round(((heatMap.initialClipRect.width -
            (cellSetting.border.width / 2)) / heatMap.xLength) * 100) / 100;
        const tempHeight = Math.round(((heatMap.initialClipRect.height -
            (cellSetting.border.width / 2)) / heatMap.yLength) * 100) / 100;
        let tempVal = 0;
        let tempRectPosition = [];
        const tempBorder = cellSetting.border;
        let borderColor;
        let templateElement = null;
        let displayText;
        this.rectPositionCollection = [];
        this.color = '';
        this.bubbleColorValue = [];
        if (heatMap.yAxis.opposedPosition) {
            tempX = Math.round((heatMap.initialClipRect.x + (parseFloat(tempBorder.width.toString()) / 2)) * 100) / 100;
        }
        if (!isNullOrUndefined(this.heatMap.cellSettings.labelTemplate) && this.heatMap.cellSettings.labelTemplate !== '') {
            if (document.getElementById(this.heatMap.element.id + '_LabelTemplate_Group')) {
                removeElement(this.heatMap.element.id + '_LabelTemplate_Group');
            }
            templateElement = createElement('div', {
                id: heatMap.element.id + '_LabelTemplate_Group'
            });
        }
        const circleRadius = this.getBubbleRadius(tempWidth, tempHeight);
        let tempCircleRadius;
        for (let x = 0; x < (heatMap.xLength * heatMap.yLength); x++) {
            if (heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                this.heatMap.dataSourceMinValue = this.heatMap.dataMin[dataYIndex];
                this.heatMap.dataSourceMaxValue = this.heatMap.dataMax[dataYIndex];
            }
            else if (heatMap.paletteSettings.colorGradientMode === 'Row' && this.heatMap.paletteSettings.type === 'Gradient') {
                this.heatMap.dataSourceMinValue = this.heatMap.dataMin[dataXIndex];
                this.heatMap.dataSourceMaxValue = this.heatMap.dataMax[dataXIndex];
            }
            this.setTextAndColor(dataXIndex, dataYIndex);
            const rectPosition = new CurrentRect(0, 0, 0, 0, 0, '', 0, 0, 0, 0, true, '', '', true);
            borderColor = tempBorder.color;
            if (this.heatMap.bubbleSizeWithColor) {
                this.updateRectDetails(rectPosition, tempX, tempY, tempWidth, tempHeight, extend('', this.bubbleColorValue, null, true), x, dataYIndex, dataXIndex);
            }
            else {
                this.updateRectDetails(rectPosition, tempX, tempY, tempWidth, tempHeight, this.text, x, dataYIndex, dataXIndex);
            }
            if (cellSetting.showLabel) {
                if (isNullOrUndefined(this.heatMap.cellSettings.labelTemplate) || this.heatMap.cellSettings.labelTemplate === '') {
                    displayText = this.getFormatedText(this.text, cellSetting.format);
                }
                else {
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const rectValue = heatMap.dataSourceSettings.bubbleDataMapping && heatMap.dataSourceSettings.isJsonData && heatMap.dataSourceSettings.adaptorType === 'Cell' && !isNullOrUndefined(rectPosition.value[0]) ? rectPosition.value[0].bubbleData : rectPosition.value;
                    if (typeof rectValue == 'number' && this.cellColor.getColorByValue(rectValue) !== '#ffffff') {
                        createLabelTemplate(this.heatMap.cellSettings.labelTemplate, heatMap, templateElement, rectPosition, heatMap.axisCollections[0].axisLabels, heatMap.axisCollections[1].axisLabels.slice().reverse(), x);
                    }
                }
            }
            else {
                displayText = '';
            }
            rectPosition.displayText = displayText;
            if (heatMap.enableHtmlSanitizer) {
                displayText = SanitizeHtmlHelper.sanitize(displayText);
            }
            if (!isNullOrUndefined(this.heatMap.cellRender)) {
                displayText = this.cellRendering(rectPosition, displayText);
            }
            if ((heatMap.renderingMode === 'Canvas' && parseFloat(tempBorder.width.toString()) === 0) || (!borderColor &&
                cellSetting.tileType === 'Bubble' && cellSetting.bubbleType === 'Sector')) {
                borderColor = this.color;
            }
            if (cellSetting.tileType === 'Rect') { // Rectangle/Tile Series
                this.renderTileCell(rectPosition, tempBorder, x, this.color, borderColor);
                this.updateLabelVisibleStatus(tempWidth, tempHeight, displayText);
            }
            else {
                if (cellSetting.bubbleType === 'Color') { // Bubble by same size and different color Series
                    this.renderBubbleCell(rectPosition, tempBorder, x, this.color, borderColor, circleRadius);
                    this.updateLabelVisibleStatus((circleRadius * 2) - 12, (circleRadius * 2) - 6, displayText); // 6, 12 - circle padding
                }
                else if (!isNullOrUndefined(this.text) && (cellSetting.bubbleType === 'Size' || cellSetting.bubbleType === 'SizeAndColor')
                    && this.text.toString() !== '') { // Bubble by same color and different size Series
                    if (this.heatMap.paletteSettings.colorGradientMode !== 'Table' && this.heatMap.paletteSettings.type === 'Gradient') {
                        this.heatMap.minColorValue = !isFinite(this.heatMap.minColorValue) ?
                            this.heatMap.dataSourceMinValue : this.heatMap.minColorValue;
                        this.heatMap.maxColorValue = !isFinite(this.heatMap.maxColorValue) ?
                            this.heatMap.dataSourceMaxValue : this.heatMap.maxColorValue;
                    }
                    tempCircleRadius = this.getRadiusBypercentage(parseFloat(this.text.toString()), heatMap.dataSourceMinValue, heatMap.dataSourceMaxValue, circleRadius);
                    this.renderBubbleCell(rectPosition, tempBorder, x, this.color, borderColor, tempCircleRadius);
                    this.updateLabelVisibleStatus((tempCircleRadius * 2) - 12, (tempCircleRadius * 2) - 6, displayText);
                }
                else if (cellSetting.bubbleType === 'Sector' && !isNullOrUndefined(this.text) && this.text.toString() !== '') {
                    this.renderSectorCell(rectPosition, tempBorder, x.toString(), this.color, borderColor, circleRadius, this.text);
                    this.checkLabelXDisplay = false;
                    this.checkLabelYDisplay = false;
                }
            }
            tempRectPosition.push(rectPosition);
            if (heatMap.rangeSelection && heatMap.paletteSettings.type === 'Fixed') {
                isValueInRange = this.isCellValueInRange(dataXIndex, dataYIndex);
                rectPosition.visible = isValueInRange;
            }
            if (cellSetting.showLabel && this.checkLabelYDisplay && this.checkLabelXDisplay) {
                const themeCellTextStyle = cellSetting.textStyle;
                const options = new TextOption(heatMap.element.id + '_HeatMapRectLabels_' + x, new TextBasic(Math.round((tempX + tempWidth / 2) * 100) / 100, Math.round((tempY + tempHeight / 2) * 100) / 100, 'middle', displayText, null, null, 'middle'), themeCellTextStyle, themeCellTextStyle.color || this.getSaturatedColor(this.color));
                rectPosition.textId = options.id;
                if (heatMap.rangeSelection && heatMap.paletteSettings.type === 'Fixed') {
                    options.fill = isValueInRange ? options.fill : this.heatMap.themeStyle.toggledColor;
                }
                if (Browser.isIE && !heatMap.enableCanvasRendering) {
                    options.dy = this.heatMap.cellSettings.tileType === 'Bubble' ? '0.5ex' : '1ex';
                }
                if (this.heatMap.cellSettings.textStyle.textOverflow === 'Wrap') {
                    const labelTempWidth = cellSetting.tileType === 'Bubble' ? (cellSetting.bubbleType === 'Size' || cellSetting.bubbleType === 'SizeAndColor') ?
                        (tempCircleRadius * 2) - 12 : (cellSetting.bubbleType === 'Color') ? (circleRadius * 2) - 12 : tempWidth : tempWidth;
                    const LabeltempHeight = cellSetting.tileType === 'Bubble' ? (cellSetting.bubbleType === 'Size' || cellSetting.bubbleType === 'SizeAndColor') ?
                        (tempCircleRadius * 2) - 6 : (cellSetting.bubbleType === 'Color') ? (circleRadius * 2) - 6 : tempHeight : tempHeight;
                    options.text = textWrap(displayText, labelTempWidth, this.heatMap.cellSettings.textStyle, true);
                    this.updateLabelText(LabeltempHeight, labelTempWidth, options);
                    const totalTextHeight = parseInt(this.heatMap.cellSettings.textStyle.size, 10) * (options.text.length - 1);
                    options.y = (options.text.length > 1)
                        ? Math.round(tempY + (tempHeight - totalTextHeight) / 2) : options.y;
                    this.drawSvgCanvas.createWrapText(options, cellSetting.textStyle, this.containerTextObject);
                }
                else {
                    this.drawSvgCanvas.createText(options, this.containerTextObject, displayText);
                }
            }
            if (tempVal === heatMap.xLength - 1) {
                tempY = Math.round((tempY + tempHeight) * 100) / 100;
                tempVal = 0;
                dataYIndex = 0;
                if (heatMap.yAxis.opposedPosition) {
                    tempX = Math.round((heatMap.initialClipRect.x + (parseFloat(tempBorder.width.toString()) / 2)) * 100) / 100;
                }
                else {
                    tempX = Math.round(heatMap.initialClipRect.x * 100) / 100;
                }
                this.rectPositionCollection.push(tempRectPosition);
                tempRectPosition = [];
                dataXIndex++;
            }
            else {
                tempX = Math.round((tempX + tempWidth) * 100) / 100;
                tempVal++;
                dataYIndex++;
            }
        }
        if (!isNullOrUndefined(templateElement)) {
            document.getElementById(this.heatMap.element.id + '_Secondary_Element').appendChild(templateElement);
        }
        if (!heatMap.enableCanvasRendering) {
            heatMap.svgObject.appendChild(this.containerRectObject);
            if (cellSetting.showLabel && !(cellSetting.tileType === 'Bubble' && cellSetting.bubbleType === 'Sector')) {
                heatMap.svgObject.appendChild(this.containerTextObject);
            }
        }
    }
    /**
     * To toggle the cell text color based on legend selection.
     */
    isCellValueInRange(dataXIndex, dataYIndex) {
        let isValueInRange = false;
        for (let i = 0; i < this.heatMap.toggleValue.length; i++) {
            let maxValue;
            const minValue = (i === 0) && !this.heatMap.isColorRange ? this.heatMap.dataSourceMinValue :
                this.heatMap.isColorRange ?
                    this.heatMap.toggleValue[i].startValue : this.heatMap.toggleValue[i].value;
            if (this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'SizeAndColor') {
                maxValue = (i === this.heatMap.toggleValue.length - 1) ? this.heatMap.maxColorValue :
                    this.heatMap.toggleValue[i + 1].value - 0.01;
            }
            else {
                maxValue = (i === this.heatMap.toggleValue.length - 1 && !this.heatMap.isColorRange) ?
                    this.heatMap.dataSourceMaxValue : this.heatMap.isColorRange ?
                    this.heatMap.toggleValue[i].endValue : this.heatMap.toggleValue[i + 1].value - 0.01;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const clonedDataSource = this.heatMap.clonedDataSource;
            const bubbleText = !isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][1] : '';
            const text = parseFloat(this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'SizeAndColor' ?
                bubbleText.toString() : this.text.toString());
            if (isNaN(text)) {
                isValueInRange = true;
            }
            else if (!isNaN(text) && text >= minValue && text <= maxValue) {
                if (!this.heatMap.toggleValue[i].visible) {
                    isValueInRange = false;
                    break;
                }
                else {
                    isValueInRange = true;
                    break;
                }
            }
            else if (this.heatMap.isColorRange &&
                maxValue >= this.heatMap.toggleValue[i].endValue && i === this.heatMap.toggleValue.length - 1) {
                isValueInRange = true;
                break;
            }
        }
        return isValueInRange;
    }
    /**
     * To customize the cell.
     *
     * @returns {void}
     * @private
     */
    cellRendering(rectPosition, text) {
        const xAxis = this.heatMap.axisCollections[0];
        const yAxis = this.heatMap.axisCollections[1];
        const xLabels = xAxis.tooltipLabels;
        const yLabels = yAxis.tooltipLabels.slice().reverse();
        const yLabelValue = yAxis.labelValue.slice().reverse();
        const argData = {
            heatmap: this.heatMap,
            cancel: false,
            name: 'cellRender',
            value: rectPosition.value,
            xLabel: xLabels[rectPosition.xIndex].toString(),
            yLabel: yLabels[rectPosition.yIndex].toString(),
            displayText: text,
            xValue: xAxis.labelValue[rectPosition.xIndex],
            yValue: yLabelValue[rectPosition.yIndex],
            cellColor: this.color
        };
        this.heatMap.trigger('cellRender', argData);
        this.color = argData.cellColor;
        return argData.displayText;
    }
    /**
     * To set color and text details.
     *
     * @private
     */
    setTextAndColor(dataXIndex, dataYIndex) {
        this.bubbleColorValue = [];
        const adaptData = this.heatMap.dataSourceSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const clonedDataSource = this.heatMap.clonedDataSource;
        if (this.heatMap.bubbleSizeWithColor) {
            this.text = !isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][0]) &&
                clonedDataSource[dataXIndex][dataYIndex][0].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][0] : '';
            this.color = !isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ?
                this.cellColor.getColorByValue(clonedDataSource[dataXIndex][dataYIndex][1])
                : this.heatMap.isColorValueExist ? this.heatMap.emptyPointColor : this.cellColor.getColorByValue(this.text);
            const tempBubbleCollection = new BubbleTooltipData(adaptData.isJsonData && adaptData.adaptorType === 'Cell' ? adaptData.bubbleDataMapping.size : null, this.text, 'Size');
            this.bubbleColorValue.push(tempBubbleCollection);
            this.bubbleColorValue.push({
                mappingName: adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                    adaptData.bubbleDataMapping.color : null,
                bubbleData: !isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                    clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][1] : '',
                valueType: 'Color'
            });
        }
        else {
            this.text = clonedDataSource[dataXIndex][dataYIndex];
            this.color = this.cellColor.getColorByValue(this.text);
        }
    }
    /**
     * To update rect details.
     *
     * @private
     */
    createSeriesGroup() {
        if (!this.heatMap.enableCanvasRendering) {
            this.containerRectObject = this.heatMap.renderer.createGroup({
                id: this.heatMap.element.id + '_Container_RectGroup'
            });
            if (this.heatMap.cellSettings.showLabel &&
                !(this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'Sector')) {
                this.containerTextObject = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_Container_TextGroup', transform: 'translate( 0, 0)' });
            }
        }
    }
    /**
     * To update rect details.
     *
     * @private
     */
    updateRectDetails(rectPosition, tempX, tempY, tempWidth, tempHeight, text, x, dataXIndex, dataYIndex) {
        rectPosition.x = tempX;
        rectPosition.y = tempY;
        rectPosition.width = tempWidth;
        rectPosition.height = tempHeight;
        rectPosition.value = text;
        rectPosition.id = this.heatMap.element.id + '_HeatMapRect_' + x;
        rectPosition.xIndex = dataXIndex;
        rectPosition.yIndex = dataYIndex;
    }
    /**
     * To Render Tile Cell.
     *
     * @private
     */
    renderTileCell(rectPosition, tempBorder, x, color, borderColor) {
        const rect = new RectOption(this.heatMap.element.id + '_HeatMapRect_' + x, color, tempBorder, 1, new Rect(rectPosition.x, rectPosition.y, rectPosition.width, rectPosition.height), borderColor || this.heatMap.themeStyle.cellBorder, tempBorder.radius, tempBorder.radius);
        this.drawSvgCanvas.drawRectangle(rect, this.containerRectObject, true);
    }
    /**
     * To get bubble radius.
     *
     * @private
     */
    getBubbleRadius(width, height) {
        let radius = (width / 2) - 2;
        if (height / 2 < width / 2) {
            radius = (height / 2) - 2;
        }
        return radius < 0 ? 0 : radius;
    }
    /**
     * To Render Bubble Cell.
     *
     * @private
     */
    renderSectorCell(bubblePosition, tempBorder, x, color, borderColor, circleRadius, text) {
        let curve;
        let startAngle;
        let endAngle;
        let cX;
        let cY;
        let X1;
        let Y1;
        let tempcX;
        let tempcY;
        let pathBorderWidth;
        const centerX = Math.round((bubblePosition.x + (bubblePosition.width / 2)) * 100) / 100;
        const centerY = Math.round((bubblePosition.y + (bubblePosition.height / 2)) * 100) / 100;
        let tempColor = color;
        const sectorContibution = this.getRadiusBypercentage(text, this.heatMap.dataSourceMinValue, this.heatMap.dataSourceMaxValue, 360); // Circle total angle.
        for (let y = 0; y < 2; y++) {
            pathBorderWidth = parseFloat(tempBorder.width.toString());
            if (y === 0) {
                curve = sectorContibution >= 180 ? 1 : 0;
                startAngle = -90;
                if (sectorContibution === 0) {
                    endAngle = 270; // (360 - 90) for zero position adjustment.
                }
                else {
                    endAngle = (sectorContibution - 90);
                }
                cX = Math.round((centerX + circleRadius * Math.cos((sectorContibution - 90) * (Math.PI / 180))) * 100) / 100;
                cY = Math.round((centerY + circleRadius * Math.sin((sectorContibution - 90) * (Math.PI / 180))) * 100) / 100;
                X1 = Math.round(centerX * 100) / 100;
                Y1 = Math.round((centerY - circleRadius) * 100) / 100;
                if (sectorContibution === 0) {
                    tempColor = this.heatMap.emptyPointColor;
                }
            }
            else {
                curve = sectorContibution >= 180 ? 0 : 1;
                startAngle = endAngle;
                endAngle = 270; // (360 - 90) for zero position adjustment.
                tempColor = this.heatMap.emptyPointColor;
                x = x + '_Unfilled';
                tempcX = cX;
                tempcY = cY;
                cX = X1;
                cY = Y1;
                X1 = tempcX;
                Y1 = tempcY;
                if (sectorContibution === 0) {
                    pathBorderWidth = 1;
                    borderColor = color;
                }
            }
            const path = new Path('', false, centerX, centerY, X1, Y1, cX, cY, startAngle, endAngle, circleRadius, true);
            const sector = new PathAttributes(this.heatMap.element.id + '_HeatMapRect_' + x, path, tempColor, tempBorder, pathBorderWidth, 1, borderColor);
            this.calculateShapes(sector, path, sectorContibution, curve);
            this.drawSvgCanvas.drawPath(sector, path, this.containerRectObject);
            if (sectorContibution === 360) {
                break;
            }
        }
    }
    /**
     * To Render sector Cell.
     *
     * @private
     */
    calculateShapes(options, path, sectorContibution, curve) {
        let pathString;
        switch (sectorContibution) {
            case 360:
            case 0:
                if (sectorContibution === 0 && path.start === path.end) {
                    pathString = 'M' + ' ' + options.x + ' ' + options.y + ' ' + 'L' + ' ' + path.x + ' ' + (path.y - path.radius);
                }
                else {
                    pathString = !this.heatMap.enableCanvasRendering ? 'M' + ' ' + options.x + ' ' + options.y + ' ' : '';
                    pathString = pathString + 'm' + ' ' + (-path.radius) + ' ' + '0' + ' ' +
                        'a' + ' ' + path.radius + ' ' + path.radius + ' ' + '0' + ' ' + '1' + ' ' + '0' +
                        ' ' + (path.radius * 2) + ' ' + '0' + ' ' + 'a' + ' ' + path.radius +
                        ' ' + path.radius + ' ' + '0' + ' ' + '1' + ' ' + '0' +
                        ' ' + (-(path.radius * 2)) + ' ' + '0' + ' ';
                }
                merge(options, { 'd': pathString });
                break;
            default:
                pathString = 'M' + ' ' + options.x + ' ' + options.y + ' ' + 'L' + ' ' + path.x1 + ' ' + path.y1 + ' ' +
                    'A' + ' ' + path.radius + ' ' + path.radius + ' ' + '0' + ' ' + curve + ' ' + '1' + ' ' +
                    path.cx + ' ' + path.cy + ' ' + 'Z';
                merge(options, { 'd': pathString });
                break;
        }
    }
    /**
     * To Render Bubble Cell.
     *
     * @private
     */
    renderBubbleCell(bubblePosition, tempBorder, x, color, borderColor, circleRadius) {
        const circle = new CircleOption(this.heatMap.element.id + '_HeatMapRect_' + x, color, tempBorder, 1, borderColor || this.heatMap.themeStyle.cellBorder, Math.round((bubblePosition.x + (bubblePosition.width / 2)) * 100) / 100, Math.round((bubblePosition.y + (bubblePosition.height / 2)) * 100) / 100, circleRadius);
        this.drawSvgCanvas.drawCircle(circle, this.containerRectObject);
    }
    /**
     * To adjust the cell label text with respect to cell height in wrap case
     *
     * @private
     */
    updateLabelText(tempHeight, tempWidth, options) {
        const padding = 10;
        for (let i = 0; i < options.text.length; i++) {
            const requiredHeight = (parseInt(this.heatMap.cellSettings.textStyle.size, 10) * (i + 1)) + padding;
            if (tempHeight < requiredHeight) {
                options.text = options.text.slice(0, i);
                if (i > 0 && options.text[i - 1].slice(-3) !== '...') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const textArray = options.text.slice(0, i - 1);
                    const wrappedText = textTrim(tempWidth, options.text[i - 1] + '...', this.heatMap.cellSettings.textStyle);
                    textArray.push(wrappedText);
                    options.text = textArray;
                    break;
                }
                break;
            }
        }
    }
    /**
     * To find whether the X,Y Label need to display or not.
     *
     * @private
     */
    updateLabelVisibleStatus(tempWidth, tempHeight, displayText) {
        if (this.heatMap.cellSettings.showLabel && (isNullOrUndefined(this.heatMap.cellSettings.labelTemplate) || this.heatMap.cellSettings.labelTemplate === '')) {
            this.checkLabelYDisplay = tempHeight > parseInt(this.heatMap.cellSettings.textStyle.size, 10) ? true : false;
            this.checkLabelXDisplay = tempWidth > (displayText.length *
                (parseInt(this.heatMap.cellSettings.textStyle.size, 10) / 2)) || this.heatMap.cellSettings.textStyle.textOverflow === 'Wrap' ? true : false;
        }
    }
    /**
     * To find percentage value.
     *
     * @private
     */
    getRadiusBypercentage(text, min, max, radius) {
        let minimum = parseInt(this.heatMap.cellSettings.bubbleSize.minimum, 10);
        let maximum = parseInt(this.heatMap.cellSettings.bubbleSize.maximum, 10);
        if (minimum < 0 || minimum > 100 || isNaN(minimum)) {
            minimum = 0;
        }
        if (maximum < 0 || maximum > 100 || isNaN(maximum)) {
            maximum = 100;
        }
        let valueInPrecentage = ((text - min) /
            (max - min)) * 100;
        valueInPrecentage = isNaN(valueInPrecentage) ? 100 : valueInPrecentage;
        if ((this.heatMap.bubbleSizeWithColor ||
            (this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'Size'))) {
            if (this.heatMap.cellSettings.isInversedBubbleSize) {
                valueInPrecentage = 100 - valueInPrecentage;
            }
            valueInPrecentage = ((valueInPrecentage * (maximum - minimum)) / 100) + minimum;
        }
        radius = radius * (valueInPrecentage / 100);
        return (Math.round(radius * 100) / 100) < 0 ? 0 : (Math.round(radius * 100) / 100);
    }
    /**
     * To find saturated color for datalabel.
     *
     * @returns {string}
     * @private
     */
    getSaturatedColor(color) {
        let saturatedColor = color;
        saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
        const rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        const contrast = Math.round((rgbValue.R * 299 + rgbValue.G * 587 + rgbValue.B * 114) / 1000);
        return contrast >= 128 ? 'black' : 'white';
    }
    /**
     * To highlight the mouse hovered rect cell.
     *
     * @returns {void}
     * @private
     */
    highlightSvgRect(tempID) {
        if (tempID.indexOf('Celltooltip') === -1) {
            if (tempID.indexOf('_HeatMapRect') !== -1) {
                if (tempID.indexOf('_HeatMapRectLabels_') !== -1) {
                    const tempIndex = tempID.indexOf('_HeatMapRectLabels_') + 19;
                    tempID = this.heatMap.element.id + '_HeatMapRect_' + tempID.slice(tempIndex);
                }
                const element = document.getElementById(tempID);
                if (this.heatMap.tempRectHoverClass !== tempID) {
                    if (this.heatMap.cellSettings.enableCellHighlighting) {
                        let oldElement;
                        if (this.heatMap.tempRectHoverClass) {
                            oldElement = document.getElementById(this.heatMap.tempRectHoverClass);
                        }
                        if (oldElement && !this.heatMap.rectSelected) {
                            oldElement.setAttribute('opacity', '1');
                        }
                        if (element && !this.heatMap.rectSelected) {
                            element.setAttribute('opacity', '0.65');
                        }
                    }
                    this.heatMap.tempRectHoverClass = tempID;
                }
            }
            else {
                if (this.heatMap.cellSettings.enableCellHighlighting) {
                    let oldElement;
                    if (this.heatMap.tempRectHoverClass) {
                        oldElement = document.getElementById(this.heatMap.tempRectHoverClass);
                    }
                    if (oldElement && !this.heatMap.rectSelected) {
                        oldElement.setAttribute('opacity', '1');
                        this.heatMap.tempRectHoverClass = '';
                    }
                }
            }
        }
    }
    /**
     * To get the value depends to format.
     *
     * @returns {string}
     * @private
     */
    getFormatedText(val, getFormat) {
        const format = getFormat;
        const isCustom = format.match('{value}') !== null;
        this.format = this.heatMap.intl.getNumberFormat({
            format: isCustom ? '' : format
        });
        let value = '';
        if (val.toString() !== '') {
            value = formatValue(isCustom, format, val, this.format);
        }
        return value;
    }
    /**
     * To get mouse hovered cell details.
     *
     * @returns {CurrentRect}
     * @private
     */
    getCurrentRect(x, y) {
        let currentRect;
        const firstRectDetails = [];
        firstRectDetails.push(this.heatMap.heatMapSeries.rectPositionCollection[0][0]);
        let rectX = Math.ceil((x - firstRectDetails[0].x) / firstRectDetails[0].width) <
            this.heatMap.axisCollections[0].axisLabelSize ?
            Math.ceil((x - firstRectDetails[0].x) / firstRectDetails[0].width) :
            this.heatMap.axisCollections[0].axisLabelSize;
        const rectY = Math.floor(((y - firstRectDetails[0].y) / firstRectDetails[0].height)) <
            this.heatMap.axisCollections[1].axisLabelSize ?
            Math.floor(((y - firstRectDetails[0].y) / firstRectDetails[0].height)) :
            this.heatMap.axisCollections[1].axisLabelSize - 1;
        rectX = rectX === 0 ? 1 : rectX;
        // eslint-disable-next-line prefer-const
        currentRect = this.heatMap.heatMapSeries.rectPositionCollection[rectY][rectX - 1];
        this.hoverXAxisLabel = this.heatMap.axisCollections[0].tooltipLabels[rectX - 1];
        this.hoverXAxisValue = this.heatMap.axisCollections[0].labelValue[rectX - 1];
        this.hoverYAxisLabel = this.heatMap.axisCollections[1].tooltipLabels[(this.heatMap.axisCollections[1].tooltipLabels.length - 1) - rectY];
        this.hoverYAxisValue = this.heatMap.axisCollections[1].labelValue[(this.heatMap.axisCollections[1].labelValue.length - 1) - rectY];
        return currentRect;
    }
    /**
     * @returns {void}
     * @private
     */
    destroy() {
        if (!isNullOrUndefined(this.cellColor)) {
            this.cellColor.destroy();
        }
        this.cellColor = null;
        this.bubbleColorValue = null;
        this.containerRectObject = null;
        this.containerTextObject = null;
        this.drawSvgCanvas = null;
        this.format = null;
        this.hoverXAxisValue = null;
        this.hoverYAxisValue = null;
        this.rectPositionCollection = null;
        this.heatMap = null;
    }
}

/**
 * HeatMap tool tip file
 */
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sets and gets the options to customize the tooltip in heatmap.
 */
class TooltipSettings extends ChildProperty {
}
__decorate$4([
    Property('')
], TooltipSettings.prototype, "template", void 0);
__decorate$4([
    Property('')
], TooltipSettings.prototype, "fill", void 0);
__decorate$4([
    Complex({}, TooltipBorder)
], TooltipSettings.prototype, "border", void 0);
__decorate$4([
    Complex(Theme.tooltipFont, Font)
], TooltipSettings.prototype, "textStyle", void 0);
/**
 *
 * The `Tooltip` module is used to render the tooltip for heatmap series.
 */
class Tooltip {
    constructor(heatMap) {
        /* private */
        this.isFirst = true;
        /* private */
        this.isFadeout = false;
        this.heatMap = heatMap;
    }
    /**
     * Get module name
     */
    getModuleName() {
        return 'Tooltip';
    }
    /**
     * To show/hide Tooltip.
     *
     * @private
     */
    showHideTooltip(isShow, isFadeout) {
        if (!isNullOrUndefined(this.heatMap)) {
            const ele = document.getElementById(this.heatMap.element.id + 'Celltooltipcontainer');
            if (!isShow) {
                if (!isNullOrUndefined(ele) && ele.style.visibility !== 'hidden') {
                    if (!isNullOrUndefined(this.tooltipObject) && isFadeout && this.heatMap.isRectBoundary) {
                        this.tooltipObject.fadeOut();
                    }
                    else {
                        if (!isNullOrUndefined(this.tooltipObject) && !isNullOrUndefined(this.tooltipObject.element)) {
                            const tooltipElement = this.tooltipObject.element.firstChild;
                            tooltipElement.setAttribute('opacity', '0');
                        }
                    }
                    ele.style.visibility = 'hidden';
                }
                this.isFadeout = true;
            }
            else {
                ele.style.visibility = 'visible';
            }
        }
    }
    /**
     * To destroy the Tooltip.
     *
     * @returns {void}
     * @private
     */
    destroy() {
        if (!isNullOrUndefined(this.tooltipObject)) {
            this.tooltipObject.destroy();
            this.tooltipObject.controlInstance = null;
            removeElement(this.heatMap.element.id + 'Celltooltipcontainer');
        }
        this.tooltipObject = null;
        this.heatMap = null;
    }
    /**
     * To add Tooltip to the rect cell.
     *
     * @returns {void}
     * @private
     */
    createTooltip(currentRect, x, y, tempTooltipText) {
        let offset = null;
        const element = select('#' + this.heatMap.element.id + 'Celltooltipcontainer');
        if (this.heatMap.cellSettings.showLabel && this.heatMap.heatMapSeries.checkLabelXDisplay &&
            this.heatMap.heatMapSeries.checkLabelYDisplay) {
            offset = parseInt(this.heatMap.cellSettings.textStyle.size, 10) / 2;
        }
        if (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'Tailwind3') {
            this.heatMap.setProperties({ tooltipSettings: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } } }, true);
        }
        if (this.heatMap.theme === 'TailwindDark' || this.heatMap.theme === 'Tailwind3Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#F9FAFB', textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500', color: '#1F2937' } } }, true);
        }
        if (this.heatMap.theme === 'Bootstrap5') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#000000', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' } } }, true);
        }
        if (this.heatMap.theme === 'Bootstrap5Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#FFFFFF', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#212529' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent') {
            this.heatMap.setProperties({ tooltipSettings: { textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500' } } }, true);
        }
        if (this.heatMap.theme === 'FluentDark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#252423', textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500', color: '#F3F2F1' } } }, true);
        }
        if (this.heatMap.theme === 'Material3') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#313033', textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '400', color: '#F4EFF4' } } }, true);
        }
        if (this.heatMap.theme === 'Material3Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#E6E1E5', textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '400', color: '#313033' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#FFFFFF', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#242424' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2Dark') {
            this.heatMap.setProperties({ tooltipSettings: { fill: '#292929', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' } } }, true);
        }
        if (this.heatMap.theme === 'Fluent2HighContrast') {
            this.heatMap.setProperties({
                tooltipSettings: {
                    fill: '#000000', textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400', color: '#FFFFFF' },
                    border: { width: 1, color: '#FFF' }
                }
            }, true);
        }
        this.tooltipObject = new Tooltip$1({
            opacity: (this.heatMap.theme === 'Tailwind' || this.heatMap.theme === 'Tailwind3' || this.heatMap.theme === 'TailwindDark' || this.heatMap.theme === 'Tailwind3Dark' || this.heatMap.theme === 'Bootstrap5' || this.heatMap.theme === 'Bootstrap5Dark' || this.heatMap.theme === 'Fluent' || this.heatMap.theme === 'FluentDark'
                || this.heatMap.theme === 'Fluent2' || this.heatMap.theme === 'Fluent2Dark' || this.heatMap.theme === 'Fluent2HighContrast') ? 1 : 0.75,
            enableAnimation: false,
            offset: offset,
            location: { x: x, y: y },
            availableSize: this.heatMap.availableSize,
            data: {
                xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                value: currentRect.value,
                xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                    this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                    this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null
            },
            theme: this.heatMap.theme,
            content: tempTooltipText,
            fill: this.heatMap.tooltipSettings.fill,
            enableShadow: true,
            template: this.heatMap.tooltipSettings.template === '' ? null : this.heatMap.tooltipSettings.template,
            border: {
                width: this.heatMap.tooltipSettings.border.width,
                color: this.heatMap.tooltipSettings.border.color
            },
            textStyle: {
                size: this.heatMap.tooltipSettings.textStyle.size,
                fontWeight: this.heatMap.tooltipSettings.textStyle.fontWeight.toLowerCase(),
                color: this.heatMap.tooltipSettings.textStyle.color,
                fontStyle: this.heatMap.tooltipSettings.textStyle.fontStyle.toLowerCase(),
                fontFamily: this.heatMap.tooltipSettings.textStyle.fontFamily
            },
            areaBounds: {
                height: this.heatMap.initialClipRect.height + this.heatMap.initialClipRect.y,
                width: this.heatMap.initialClipRect.width, x: this.heatMap.initialClipRect.x
            }
        }, element);
    }
    /**
     * To create div container for tooltip.
     *
     * @returns {void}
     * @private
     */
    createTooltipDiv(heatMap) {
        const position = 'absolute';
        const top = heatMap.enableCanvasRendering && heatMap.allowSelection ? heatMap.availableSize.height : 0;
        const element2 = createElement('div', {
            id: this.heatMap.element.id + 'Celltooltipcontainer'
        });
        element2.style.cssText = 'position:' + position + '; z-index: 3;top:-' + top + 'px';
        const tooltipElement = createElement('div', {
            id: this.heatMap.element.id + 'Celltooltipparent'
        });
        tooltipElement.style.position = 'relative';
        tooltipElement.appendChild(element2);
        this.heatMap.element.appendChild(tooltipElement);
    }
    /**
     * To get default tooltip content.
     *
     * @private
     */
    getTooltipContent(currentRect, hetmapSeries) {
        let value;
        let content;
        const heatMap = this.heatMap;
        const adaptData = this.heatMap.dataSourceSettings;
        if (heatMap.bubbleSizeWithColor) {
            const xAxis = heatMap.xAxis.title && heatMap.xAxis.title.text !== '' ? heatMap.xAxis.title.text : 'X-Axis';
            const yAxis = heatMap.yAxis.title && heatMap.yAxis.title.text !== '' ? heatMap.yAxis.title.text : 'Y-Axis';
            const value1 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                adaptData.bubbleDataMapping.size : 'Value 1';
            const value2 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                adaptData.bubbleDataMapping.color : 'Value 2';
            value = hetmapSeries.getFormatedText(currentRect.value[0].bubbleData, this.heatMap.cellSettings.format);
            content = [xAxis + ' : ' + hetmapSeries.hoverXAxisLabel + '<br/>'
                    + yAxis + ' : ' + hetmapSeries.hoverYAxisLabel + '<br/>'
                    + value1 + ' : ' + value + '<br/>'
                    + value2 + ' : '
                    + hetmapSeries.getFormatedText(currentRect.value[1].bubbleData, this.heatMap.cellSettings.format)];
        }
        else {
            value = currentRect.value;
            content = [hetmapSeries.hoverXAxisLabel + ' | ' + hetmapSeries.hoverYAxisLabel + ' : ' +
                    hetmapSeries.getFormatedText(value, this.heatMap.cellSettings.format)];
        }
        content = getSanitizedTexts(content, this.heatMap.enableHtmlSanitizer);
        return content;
    }
    /**
     * To render tooltip.
     *
     * @private
     */
    renderTooltip(currentRect) {
        const hetmapSeries = this.heatMap.heatMapSeries;
        let tempTooltipText = [''];
        const showTooltip = this.heatMap.bubbleSizeWithColor ?
            !isNullOrUndefined(currentRect.value) && !isNullOrUndefined(currentRect.value[0].bubbleData)
                && currentRect.value[0].bubbleData.toString() !== '' ? true : false
            : isNullOrUndefined(currentRect.value) || (!isNullOrUndefined(currentRect.value) &&
                currentRect.value.toString() === '') ? false : true;
        if (!showTooltip) {
            this.showHideTooltip(false, false);
            if (!currentRect.visible) {
                this.showHideTooltip(false, false);
            }
        }
        else {
            if (!isNullOrUndefined(this.heatMap.tooltipRender)) {
                // this.tooltipObject.header = '';
                // this.tooltipObject.content = this.getTemplateText(
                //     currentRect, this.heatMap.tooltipTemplate, hetmapSeries.hoverXAxisLabel,
                //     hetmapSeries.hoverYAxisLabel);
                const content = this.getTooltipContent(currentRect, hetmapSeries);
                const argData = {
                    heatmap: this.heatMap,
                    cancel: false,
                    name: 'tooltipRender',
                    value: currentRect.value,
                    xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                    yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                    xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                        this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                    yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                        this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                    content: content
                };
                this.heatMap.trigger('tooltipRender', argData, (observedArgs) => {
                    if (!observedArgs.cancel) {
                        tempTooltipText = observedArgs.content;
                        this.tooltipCallback(currentRect, tempTooltipText);
                    }
                    else {
                        if (this.tooltipObject) {
                            this.showHideTooltip(false);
                        }
                    }
                });
            }
            else {
                //  this.tooltipObject.header = hetmapSeries.hoverYAxisLabel.toString();
                tempTooltipText = this.getTooltipContent(currentRect, hetmapSeries);
                this.tooltipCallback(currentRect, tempTooltipText);
            }
        }
    }
    /**
     * To render tooltip.
     */
    tooltipCallback(currentRect, tempTooltipText) {
        if (!this.tooltipObject) {
            this.createTooltip(currentRect, currentRect.x + (currentRect.width / 2), currentRect.y + (currentRect.height / 2), tempTooltipText);
        }
        else {
            this.tooltipObject.content = tempTooltipText;
            this.tooltipObject.data = {
                xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                    this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                    this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                value: currentRect.value
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.heatMap.isVue || this.heatMap.isVue3) {
            this.tooltipObject.controlInstance = this.heatMap;
        }
        this.showHideTooltip(true);
        this.tooltipObject.enableAnimation = (this.isFirst || this.isFadeout) ? false : true;
        this.isFirst = (this.isFirst) ? false : this.isFirst;
        this.isFadeout = (this.isFadeout) ? false : this.isFadeout;
        this.tooltipObject.location.x = currentRect.x + (currentRect.width / 2);
        this.tooltipObject.location.y = currentRect.y + (currentRect.height / 2);
        if (!currentRect.visible) {
            this.showHideTooltip(false, false);
        }
    }
}

class TwoDimensional {
    constructor(heatMap) {
        this.heatMap = heatMap;
    }
    /**
     * To reconstruct proper two dimensional dataSource depends on min and max values.
     *
     * @private
     */
    processDataSource(dataSource) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempCloneData = extend([], dataSource, null, true);
        this.heatMap.clonedDataSource = [];
        this.completeDataSource = [];
        const axis = this.heatMap.axisCollections;
        let dataLength = axis[0].maxLength + 1;
        let labelLength = axis[0].axisLabelSize + (axis[0].min > 0 ? axis[0].min : 0);
        let xLength = dataLength > labelLength ? dataLength : labelLength;
        let minVal;
        let maxVal;
        dataLength = axis[1].maxLength + 1;
        labelLength = axis[1].axisLabelSize + (axis[1].min > 0 ? axis[1].min : 0);
        const yLength = dataLength > labelLength ? dataLength : labelLength;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let tempVariable;
        let cloneDataIndex = 0;
        const minMaxDatasource = [];
        this.tempSizeArray = [];
        this.tempColorArray = [];
        this.heatMap.minColorValue = null;
        this.heatMap.maxColorValue = null;
        this.heatMap.dataMax = [];
        this.heatMap.dataMin = [];
        if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && xLength < yLength) {
            xLength = yLength;
        }
        for (let z = axis[1].valueType === 'Category' ? axis[1].min : 0; z < (this.heatMap.paletteSettings.colorGradientMode === 'Column' ? xLength : yLength); z++) {
            let tempIndex = axis[0].valueType === 'Category' ? axis[0].min : 0;
            this.completeDataSource.push([]);
            while (tempIndex < xLength) {
                if (tempIndex >= axis[0].min && tempIndex <= axis[0].max) {
                    this.processDataArray(tempCloneData, tempIndex, z, cloneDataIndex);
                }
                tempIndex++;
            }
            if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                tempVariable = extend([], tempCloneData[cloneDataIndex], null, true);
                for (let i = 0; i < tempVariable.length; i++) {
                    if (typeof (tempVariable[i]) === 'object' && (tempVariable[i]) !== null || undefined || '') {
                        tempVariable[i] = tempVariable[i][0];
                    }
                }
            }
            else {
                tempVariable = extend([], this.completeDataSource[cloneDataIndex], null, true);
            }
            const minMaxVal = this.getMinMaxValue(minVal, maxVal, tempVariable);
            if ((this.heatMap.paletteSettings.colorGradientMode === 'Column' ||
                this.heatMap.paletteSettings.colorGradientMode === 'Row') && this.heatMap.paletteSettings.type === 'Gradient') {
                this.heatMap.dataMax[z] = minMaxVal[1];
                this.heatMap.dataMin[z] = minMaxVal[0];
            }
            minVal = minMaxVal[0];
            maxVal = minMaxVal[1];
            if (this.heatMap.xAxis.isInversed) {
                this.completeDataSource[cloneDataIndex] = this.completeDataSource[cloneDataIndex].reverse();
            }
            if (z >= this.heatMap.axisCollections[1].min && z <= this.heatMap.axisCollections[1].max) {
                minMaxDatasource.push(this.completeDataSource[cloneDataIndex]);
            }
            cloneDataIndex++;
        }
        if (this.heatMap.paletteSettings.colorGradientMode === 'Row' && !this.heatMap.yAxis.isInversed &&
            this.heatMap.paletteSettings.type === 'Gradient') {
            this.heatMap.dataMax = this.heatMap.dataMax.reverse();
            this.heatMap.dataMin = this.heatMap.dataMin.reverse();
        }
        if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.xAxis.isInversed &&
            this.heatMap.paletteSettings.type === 'Gradient') {
            this.heatMap.dataMax = this.heatMap.dataMax.reverse();
            this.heatMap.dataMin = this.heatMap.dataMin.reverse();
        }
        if (!this.heatMap.yAxis.isInversed) {
            this.completeDataSource.reverse();
            minMaxDatasource.reverse();
        }
        this.heatMap.clonedDataSource = minMaxDatasource;
        this.heatMap.dataSourceMinValue = isNullOrUndefined(minVal) ? 0 : parseFloat(minVal.toString());
        this.heatMap.dataSourceMaxValue = isNullOrUndefined(maxVal) ? 0 : parseFloat(maxVal.toString());
        this.heatMap.isColorValueExist = isNullOrUndefined(this.heatMap.minColorValue) ? false : true;
        this.heatMap.minColorValue = isNullOrUndefined(this.heatMap.minColorValue) ?
            this.heatMap.dataSourceMinValue : parseFloat(this.heatMap.minColorValue.toString());
        this.heatMap.maxColorValue = isNullOrUndefined(this.heatMap.maxColorValue) ?
            this.heatMap.dataSourceMaxValue : parseFloat(this.heatMap.maxColorValue.toString());
    }
    /**
     * To process and create a proper data array.
     *
     *  @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processDataArray(tempCloneData, tempIndex, z, cloneDataIndex) {
        if (this.heatMap.bubbleSizeWithColor) {
            if (tempCloneData[tempIndex] && !isNullOrUndefined(tempCloneData[tempIndex][z])
                && typeof (tempCloneData[tempIndex][z]) === 'object') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const internalArray = tempCloneData[tempIndex][z];
                for (let tempx = 0; tempx < internalArray.length; tempx++) {
                    if (isNullOrUndefined(internalArray[tempx]) || isNaN(internalArray[tempx])) {
                        internalArray[tempx] = '';
                    }
                    if (tempx === 0) {
                        this.tempSizeArray.push(internalArray[tempx]);
                    }
                    else if (tempx === 1) {
                        this.tempColorArray.push(internalArray[tempx]);
                        break;
                    }
                }
                this.completeDataSource[cloneDataIndex].push(internalArray);
            }
            else {
                if (!isNullOrUndefined(tempCloneData[tempIndex]) && (tempCloneData[tempIndex][z] ||
                    (tempCloneData[tempIndex][z] === 0 &&
                        tempCloneData[tempIndex][z].toString() !== ''))) {
                    this.completeDataSource[cloneDataIndex].push([tempCloneData[tempIndex][z]]);
                    this.tempSizeArray.push(tempCloneData[tempIndex][z]);
                }
                else {
                    this.completeDataSource[cloneDataIndex].push('');
                }
            }
        }
        else {
            if (tempCloneData[tempIndex] && (tempCloneData[tempIndex][z] ||
                (tempCloneData[tempIndex][z] === 0 &&
                    tempCloneData[tempIndex][z].toString() !== ''))) {
                if (typeof (tempCloneData[tempIndex][z]) === 'object') {
                    if (tempCloneData[tempIndex][z].length > 0 &&
                        !isNullOrUndefined(tempCloneData[tempIndex][z][0])) {
                        this.completeDataSource[cloneDataIndex].push(tempCloneData[tempIndex][z][0]);
                    }
                    else {
                        this.completeDataSource[cloneDataIndex].push('');
                    }
                }
                else {
                    this.completeDataSource[cloneDataIndex].push(tempCloneData[tempIndex][z]);
                }
            }
            else {
                this.completeDataSource[cloneDataIndex].push('');
            }
        }
    }
    /**
     * To get minimum and maximum value
     *
     *  @private
     */
    getMinMaxValue(minVal, maxVal, tempVariable) {
        const minMaxValue = [];
        if (this.heatMap.bubbleSizeWithColor) {
            if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                this.tempSizeArray = tempVariable;
            }
            minMaxValue.push(this.getMinValue(minVal, this.tempSizeArray));
            minMaxValue.push(this.getMaxValue(maxVal, this.tempSizeArray));
            this.heatMap.minColorValue = this.getMinValue(this.heatMap.minColorValue, this.tempColorArray);
            this.heatMap.maxColorValue = this.getMaxValue(this.heatMap.maxColorValue, this.tempColorArray);
        }
        else {
            minMaxValue.push(this.getMinValue(minVal, tempVariable));
            minMaxValue.push(this.getMaxValue(maxVal, tempVariable));
        }
        return minMaxValue;
    }
    /**
     * To get minimum value
     *
     *  @private
     */
    getMinValue(minVal, tempVariable) {
        if (isNullOrUndefined(minVal)) {
            minVal = this.performSort(tempVariable);
        }
        else if (this.performSort(tempVariable) < minVal) {
            minVal = this.performSort(tempVariable);
        }
        else if ((this.heatMap.paletteSettings.colorGradientMode === 'Row' ||
            this.heatMap.paletteSettings.colorGradientMode === 'Column') && this.heatMap.paletteSettings.type === 'Gradient') {
            minVal = this.performSort(tempVariable);
        }
        return !isNullOrUndefined(minVal) ? parseFloat(minVal.toString()) : minVal;
    }
    /**
     * To get maximum value
     *
     *  @private
     */
    getMaxValue(maxVal, tempVariable) {
        if (isNullOrUndefined(maxVal) && tempVariable.length > 0) {
            maxVal = Math.max(...tempVariable);
        }
        else if (Math.max(...tempVariable) > maxVal) {
            maxVal = Math.max(...tempVariable);
        }
        else if ((this.heatMap.paletteSettings.colorGradientMode === 'Row' ||
            this.heatMap.paletteSettings.colorGradientMode === 'Column') && this.heatMap.paletteSettings.type === 'Gradient') {
            maxVal = Math.max(...tempVariable);
        }
        return !isNullOrUndefined(maxVal) ? parseFloat(maxVal.toString()) : maxVal;
    }
    /**
     * To perform sort operation.
     *
     *  @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    performSort(tempVariable) {
        return tempVariable.sort((a, b) => a - b).filter(this.checkmin)[0];
    }
    /**
     * To get minimum value
     *
     *  @private
     */
    checkmin(val) {
        return !isNullOrUndefined(val) && val.toString() !== '';
    }
    /**
     * @returns {void}
     * @private
     */
    destroy() {
        this.completeDataSource = null;
        this.tempColorArray = null;
        this.tempSizeArray = null;
        this.heatMap = null;
    }
}

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Gets and sets the options to customize the legend in the heatmap.
 */
class LegendSettings extends ChildProperty {
}
__decorate$5([
    Property('')
], LegendSettings.prototype, "height", void 0);
__decorate$5([
    Property('')
], LegendSettings.prototype, "width", void 0);
__decorate$5([
    Complex({ text: '', textStyle: Theme.titleFont }, Title)
], LegendSettings.prototype, "title", void 0);
__decorate$5([
    Property('Right')
], LegendSettings.prototype, "position", void 0);
__decorate$5([
    Property(true)
], LegendSettings.prototype, "visible", void 0);
__decorate$5([
    Property('Center')
], LegendSettings.prototype, "alignment", void 0);
__decorate$5([
    Property(true)
], LegendSettings.prototype, "showLabel", void 0);
__decorate$5([
    Property(true)
], LegendSettings.prototype, "showGradientPointer", void 0);
__decorate$5([
    Property(false)
], LegendSettings.prototype, "enableSmartLegend", void 0);
__decorate$5([
    Property('All')
], LegendSettings.prototype, "labelDisplayType", void 0);
__decorate$5([
    Complex(Theme.legendLabelFont, Font)
], LegendSettings.prototype, "textStyle", void 0);
__decorate$5([
    Property('')
], LegendSettings.prototype, "labelFormat", void 0);
__decorate$5([
    Property(true)
], LegendSettings.prototype, "toggleVisibility", void 0);
/**
 *
 * The `Legend` module is used to render legend for the heatmap.
 */
class Legend {
    constructor(heatMap) {
        this.maxLegendLabelSize = new Size(0, 0);
        this.gradientScaleSize = 10;
        this.segmentCollections = [];
        this.segmentCollectionsLabels = [];
        this.textWrapCollections = [];
        this.labelCollections = [];
        this.labelCollection = [];
        this.legendSize = 10;
        this.previousOptions = new GradientPointer(0, 0, 0, 0, 0, 0);
        this.listPerPage = 0;
        this.numberOfPages = 1;
        this.listWidth = 0;
        this.fillRect = new Rect(0, 0, 0, 0);
        this.legendRect = new Rect(0, 0, 0, 0);
        this.currentPage = 1;
        this.lastList = [];
        this.navigationCollections = [];
        this.pagingRect = new Rect(0, 0, 0, 0);
        this.listInterval = 10; // padding between two lists
        this.legendLabelTooltip = [];
        this.legendTitleTooltip = [];
        this.labelXCollections = [];
        this.labelYCollections = [];
        this.legendXCollections = [];
        this.legendYCollections = [];
        /** @private */
        this.legendRectPositionCollection = [];
        /** @private */
        this.legendRange = [];
        /** @private */
        this.legendTextRange = [];
        /** @private */
        this.visibilityCollections = [];
        this.heatMap = heatMap;
        this.drawSvgCanvas = new DrawSvgCanvas(heatMap);
    }
    /**
     * Get module name
     */
    getModuleName() {
        return 'Legend';
    }
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    destroy() {
        if (!isNullOrUndefined(this.tooltipObject)) {
            this.tooltipObject.destroy();
        }
        this.tooltipObject = null;
        this.drawSvgCanvas = null;
        this.format = null;
        this.gradientPointer = null;
        this.labelCollection = null;
        this.labelCollections = null;
        this.lastList = null;
        this.legend = null;
        this.legendGroup = null;
        this.legendRect = null;
        this.legendRectPositionCollection = null;
        this.legendRectScale = null;
        this.legendScale = null;
        this.legendXCollections = null;
        this.legendYCollections = null;
        this.maxLegendLabelSize = null;
        this.navigationCollections = null;
        this.pagingRect = null;
        this.paginggroup = null;
        this.segmentCollections = null;
        this.segmentCollectionsLabels = null;
        this.textWrapCollections = null;
        this.translategroup = null;
        this.visibilityCollections = null;
        this.fillRect = null;
        this.legendLabelTooltip = null;
        this.legendRange = [];
        this.legendTextRange = [];
        this.legendTitleTooltip = null;
        this.previousOptions = null;
        this.heatMap = null;
    }
    /**
     * @private
     */
    renderLegendItems() {
        const heatMap = this.heatMap;
        heatMap.toggleValue = [];
        const tempBorder = { color: 'transparent', width: 0 };
        this.legend = heatMap.renderer.createGroup({ id: heatMap.element.id + '_Heatmap_Legend' });
        const rectItems = new RectOption(heatMap.element.id + '_LegendBound', 'none', tempBorder, 1, this.legendGroup);
        this.drawSvgCanvas.drawRectangle(rectItems, this.legend);
        const legendBound = this.legendRectScale;
        const ctx = heatMap.canvasRenderer.ctx;
        const rectItemsSvg = new Rect(legendBound.x, legendBound.y, legendBound.width, legendBound.height);
        let fill;
        if (heatMap.paletteSettings.type === 'Fixed') {
            const colorCollection = (!heatMap.legendSettings.enableSmartLegend) ?
                heatMap.colorCollection : heatMap.legendColorCollection;
            this.legendRange = (heatMap.resizing || (!heatMap.legendOnLoad && heatMap.rendering)) ? [] : this.legendRange;
            this.legendTextRange = (heatMap.resizing || (!heatMap.legendOnLoad && heatMap.rendering)) ? [] : this.legendTextRange;
            if (heatMap.enableCanvasRendering) {
                ctx.save();
                ctx.clip();
            }
            for (let i = 0; i < colorCollection.length; i++) {
                const visibility = !isNullOrUndefined(this.visibilityCollections[i]) ?
                    this.visibilityCollections[i] : true;
                heatMap.toggleValue.push(new ToggleVisibility(visibility, colorCollection[i].value, colorCollection[i].startValue, colorCollection[i].endValue));
            }
        }
        if (heatMap.paletteSettings.type === 'Gradient' || (heatMap.paletteSettings.type === 'Fixed' &&
            heatMap.legendSettings.enableSmartLegend === true)) {
            if (heatMap.paletteSettings.type === 'Gradient') {
                if (heatMap.enableCanvasRendering) {
                    let grd;
                    const ctx = heatMap.canvasRenderer.ctx;
                    if (heatMap.horizontalGradient) {
                        grd = ctx.createLinearGradient(legendBound.x, 0, legendBound.x + legendBound.width, 0);
                    }
                    else {
                        grd = ctx.createLinearGradient(0, legendBound.y, 0, legendBound.y + legendBound.height);
                    }
                    if (heatMap.legendSettings.title.text) {
                        ctx.clip();
                    }
                    for (let i = 0; i < heatMap.legendColorCollection.length; i++) {
                        let value = (((this.heatMap.isColorRange ? heatMap.legendColorCollection[i].startValue :
                            heatMap.legendColorCollection[i].value) - this.legendMinValue) /
                            (this.legendMaxValue - this.legendMinValue));
                        value = isNaN(value) ? 0 : value;
                        if (this.heatMap.isColorRange && this.heatMap.paletteSettings.type === 'Gradient') {
                            this.calculateCanvasColorRange(i, grd);
                        }
                        else {
                            grd.addColorStop(value, heatMap.legendColorCollection[i].color);
                        }
                    }
                    ctx.fillStyle = grd;
                    fill = grd.toString();
                }
                else {
                    let gradientOptions;
                    let gradientColor;
                    const cgradientColors = [];
                    for (let i = 0; i < heatMap.legendColorCollection.length; i++) {
                        if (this.heatMap.isColorRange && this.heatMap.paletteSettings.type === 'Gradient') {
                            this.calculateColorRange(i, cgradientColors);
                        }
                        else {
                            let gradientPercentage = ((heatMap.legendColorCollection[i].value - this.legendMinValue) /
                                (this.legendMaxValue - this.legendMinValue)) * 100;
                            gradientPercentage = isNaN(gradientPercentage) ? 0 : gradientPercentage;
                            gradientColor = new GradientColor(heatMap.legendColorCollection[i].color, gradientPercentage + '%');
                            cgradientColors.push(gradientColor);
                        }
                        if (this.legendMaxValue === this.legendMinValue) {
                            break;
                        }
                    }
                    if (heatMap.horizontalGradient) {
                        gradientOptions = new Gradient(heatMap.element.id + '_lineargradient', '0%', '100%', '0%', '0%');
                    }
                    else {
                        gradientOptions = new Gradient(heatMap.element.id + '_lineargradient', '0%', '0%', '0%', '100%');
                    }
                    const linearGradient = heatMap.renderer.drawGradient('linearGradient', gradientOptions, cgradientColors);
                    this.legend.appendChild(linearGradient);
                    fill = 'url(#' + heatMap.element.id + '_lineargradient)';
                }
                const rectItem = new RectOption(heatMap.element.id + '_Gradient_Legend', fill, tempBorder, 1, rectItemsSvg);
                this.drawSvgCanvas.drawRectangle(rectItem, this.legend);
                this.renderElements(rectItemsSvg);
            }
            else {
                this.renderSmartLegend();
                this.renderTitle(rectItemsSvg);
            }
            if (!heatMap.enableCanvasRendering) {
                heatMap.svgObject.appendChild(this.legend);
            }
            if (heatMap.enableCanvasRendering) {
                ctx.restore();
            }
            this.renderLegendLabel(rectItemsSvg);
        }
        else {
            this.legendScale = heatMap.renderer.createGroup({ id: heatMap.element.id + 'Heatmap_GradientScale' });
            const listRect = new RectOption(heatMap.element.id + '_Gradient_Scale', 'none', tempBorder, 1, this.legendRectScale);
            this.drawSvgCanvas.drawRectangle(listRect, this.legendScale);
            this.renderTitle(rectItemsSvg);
            if (!heatMap.enableCanvasRendering) {
                this.legend.appendChild(this.legendScale);
            }
            this.translategroup = heatMap.renderer.createGroup({ id: heatMap.element.id + '_translate' });
            this.calculateListPerPage(rectItemsSvg);
            if (this.numberOfPages > 1) {
                this.paginggroup = heatMap.renderer.createGroup({ id: heatMap.element.id + '_navigation' });
            }
            this.renderListLegendMode(rectItemsSvg, true);
            if (heatMap.enableCanvasRendering) {
                ctx.restore();
            }
        }
    }
    renderElements(rectItemsSvg) {
        this.renderTitle(rectItemsSvg);
        this.renderColorAxisGrid(rectItemsSvg);
    }
    calculateCanvasColorRange(i, grd) {
        const heatMap = this.heatMap;
        let value = ((((heatMap.legendColorCollection[i].startValue < heatMap.dataSourceMinValue &&
            heatMap.legendColorCollection[i].endValue > heatMap.dataSourceMinValue) ?
            heatMap.dataSourceMinValue : heatMap.legendColorCollection[i].startValue) - this.legendMinValue) /
            (this.legendMaxValue - this.legendMinValue));
        value = isNaN(value) ? 0 : value;
        const value1 = ((heatMap.legendColorCollection[i].endValue >= this.heatMap.dataSourceMaxValue ?
            this.heatMap.dataSourceMaxValue : heatMap.legendColorCollection[i].endValue) - this.legendMinValue) /
            (this.legendMaxValue - this.legendMinValue);
        if (this.heatMap.legendColorCollection[0].startValue !== this.heatMap.dataSourceMinValue && i === 0 &&
            this.heatMap.legendColorCollection[0].startValue > this.heatMap.dataSourceMinValue) {
            value = (this.heatMap.legendColorCollection[0].startValue - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue);
            grd.addColorStop(value / 2, this.heatMap.paletteSettings.fillColor.minColor);
            grd.addColorStop(value, this.heatMap.paletteSettings.fillColor.maxColor);
        }
        grd.addColorStop(value, heatMap.legendColorCollection[i].minColor);
        grd.addColorStop(value1, heatMap.legendColorCollection[i].maxColor);
        if (this.heatMap.legendColorCollection[i].endValue !== ((i === this.heatMap.legendColorCollection.length - 1) ?
            this.heatMap.dataSourceMaxValue : this.heatMap.legendColorCollection[i + 1].startValue) &&
            this.heatMap.legendColorCollection[i].endValue < this.heatMap.dataSourceMaxValue) {
            value = (heatMap.legendColorCollection[i].endValue - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue);
            grd.addColorStop(value, this.heatMap.paletteSettings.fillColor.minColor);
            value = ((i === this.heatMap.legendColorCollection.length - 1 ? this.heatMap.dataSourceMaxValue :
                heatMap.legendColorCollection[i + 1].startValue) - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue);
            grd.addColorStop(value, this.heatMap.paletteSettings.fillColor.maxColor);
        }
    }
    calculateColorRange(i, cgradientColors = []) {
        const heatMap = this.heatMap;
        heatMap.toggleValue = [];
        let gradientPercentage;
        let gradientColor;
        let gradientColor2;
        let gradientColor3;
        if (this.heatMap.legendColorCollection[0].startValue > this.heatMap.dataSourceMinValue && i === 0) {
            gradientPercentage = (this.heatMap.dataSourceMinValue - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue) * 100;
            gradientPercentage = isNaN(gradientPercentage) ? 0 : gradientPercentage;
            gradientColor = new GradientColor(heatMap.paletteSettings.fillColor.minColor, gradientPercentage + '%');
            cgradientColors.push(gradientColor);
            gradientPercentage = (heatMap.legendColorCollection[0].startValue - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue) * 100;
            gradientColor = new GradientColor(heatMap.paletteSettings.fillColor.maxColor, gradientPercentage + '%');
            cgradientColors.push(gradientColor);
        }
        gradientPercentage = ((heatMap.legendColorCollection[i].startValue - this.legendMinValue) /
            (this.legendMaxValue - this.legendMinValue)) * 100;
        gradientPercentage = isNaN(gradientPercentage) ? 0 : gradientPercentage;
        gradientColor = new GradientColor(heatMap.legendColorCollection[i].minColor, gradientPercentage + '%');
        cgradientColors.push(gradientColor);
        gradientPercentage = (heatMap.legendColorCollection[i].endValue - this.legendMinValue) /
            (this.legendMaxValue - this.legendMinValue) * 100;
        const gradientColor1 = new GradientColor(heatMap.legendColorCollection[i].maxColor, gradientPercentage + '%');
        cgradientColors.push(gradientColor1);
        if (this.heatMap.legendColorCollection[i].endValue !== ((i === this.heatMap.legendColorCollection.length - 1) ?
            this.heatMap.dataSourceMaxValue : this.heatMap.legendColorCollection[i + 1].startValue)) {
            gradientPercentage = (heatMap.legendColorCollection[i].endValue - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue) * 100;
            gradientColor2 = new GradientColor(this.heatMap.paletteSettings.fillColor.minColor, (gradientPercentage) + '%');
            cgradientColors.push(gradientColor2);
            gradientPercentage = ((i === (this.heatMap.legendColorCollection.length - 1) ?
                this.heatMap.dataSourceMaxValue : heatMap.legendColorCollection[i + 1].startValue) - this.legendMinValue) /
                (this.legendMaxValue - this.legendMinValue) * 100;
            gradientColor3 = new GradientColor(this.heatMap.paletteSettings.fillColor.maxColor, (gradientPercentage) + '%');
            cgradientColors.push(gradientColor3);
        }
    }
    renderTitle(rect) {
        const heatMap = this.heatMap;
        if (heatMap.legendSettings.title.text) {
            const title = heatMap.legendSettings.title;
            let text = this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text;
            const titleSize = measureText(text, title.textStyle);
            let padding = !heatMap.legendSettings.showLabel ? heatMap.horizontalGradient ? 10 : 6 : this.labelPadding;
            let y;
            let anchor = 'start';
            let maxWidth;
            let dominantBaseline;
            const textAlignment = title.textStyle.textAlignment;
            let options;
            let yValue;
            if (heatMap.legendSettings.title.textStyle.textOverflow === 'Trim') {
                // TO DO: When the legend title is large and legend position is left or right,
                // the HeatMap is not rendered. The below line trimmed the large title text alone.
                maxWidth = heatMap.horizontalGradient ? rect.width - 10 : this.width - 10;
                text = textTrim(maxWidth, text, title.textStyle);
            }
            if (!heatMap.horizontalGradient) {
                padding = -(padding + titleSize.height / 4);
                if (text.length !== 0 && heatMap.enableCanvasRendering) {
                    this.legendTitleTooltip.push(new CanvasTooltip(title.text, new Rect(rect.x, rect.y - titleSize.height, maxWidth, titleSize.height)));
                }
                options = new TextOption(heatMap.element.id + '_legendTitle', new TextBasic(rect.x, rect.y + padding, anchor, text, 0, 'translate(0,0)', dominantBaseline), title.textStyle, title.textStyle.color || heatMap.themeStyle.heatMapTitle);
            }
            else {
                y = rect.y + (heatMap.legendSettings.position === 'Top' ? 0 :
                    -(10 + titleSize.height + padding));
                padding = heatMap.legendSettings.position === 'Top' ? -(padding + titleSize.height / 4) :
                    (padding + (3 * titleSize.height / 4));
                yValue = heatMap.legendSettings.position === 'Bottom' ? y : y - titleSize.height;
                if (text.length !== 0 && heatMap.enableCanvasRendering) {
                    this.legendTitleTooltip.push(new CanvasTooltip(title.text, new Rect(rect.x, yValue, maxWidth, titleSize.height)));
                }
                titleSize.width = rect.width < titleSize.width ? rect.width : titleSize.width;
                let rectValue = rect.x;
                if (text.indexOf('...') !== -1 && textAlignment === 'Far') {
                    rectValue = (rectValue + (rect.width / 2) - (titleSize.width / 2));
                }
                else {
                    rectValue = textAlignment === 'Near' ? rectValue : textAlignment === 'Far' ? rect.width + rectValue :
                        (rectValue + (rect.width / 2) - (titleSize.width / 2));
                }
                anchor = textAlignment === 'Far' && text.indexOf('...') === -1 ? 'end' : 'start';
                options = new TextOption(heatMap.element.id + '_legendTitle', new TextBasic(rectValue, y + padding, anchor, text, 0, 'translate(0,0)', dominantBaseline), title.textStyle, title.textStyle.color || heatMap.themeStyle.heatMapTitle);
            }
            this.drawSvgCanvas.createText(options, this.legend, text);
        }
    }
    renderSmartLegend() {
        const heatMap = this.heatMap;
        const colorCollection = heatMap.colorCollection;
        let smartLegendRect;
        const tempBorder = {
            color: 'transparent',
            width: 0
        };
        const legendBound = this.legendRectScale;
        let legendX;
        let legendY;
        let legendWidth;
        let legendHeight;
        const width = legendBound.width / colorCollection.length;
        const height = legendBound.height / colorCollection.length;
        this.legendRectPositionCollection = [];
        this.legendRange = [];
        for (let i = 0; i < heatMap.legendColorCollection.length; i++) {
            const rectPosition = new CurrentLegendRect(0, 0, 0, 0, '', '');
            if (heatMap.horizontalGradient) {
                legendX = legendBound.x + (i * width);
                legendY = legendBound.y;
                legendWidth = width;
                legendHeight = legendBound.height;
                this.segmentCollections.push((heatMap.legendSettings.labelDisplayType === 'Edge' &&
                    i === heatMap.legendColorCollection.length - 1 && !heatMap.legendColorCollection[i].isHidden) ?
                    legendX + width : legendX);
            }
            else {
                legendX = legendBound.x;
                legendY = legendBound.y + (i * height);
                legendWidth = legendBound.width;
                legendHeight = height;
                this.segmentCollections.push((heatMap.legendSettings.labelDisplayType === 'Edge' &&
                    i === heatMap.legendColorCollection.length - 1 && !heatMap.legendColorCollection[i].isHidden) ?
                    legendY + height : legendY);
            }
            const legendElement = this.heatMap.renderer.createGroup({
                id: heatMap.element.id + '_Smart_Legend_Group_' + i
            });
            const tabindex = this.heatMap.legendSettings.toggleVisibility ? 0 : -1;
            legendElement.setAttribute('tabindex', tabindex.toString());
            legendElement.style.outline = 'none';
            smartLegendRect = new Rect(legendX, legendY, legendWidth, legendHeight);
            const legendRange = new LegendRange(0, 0, 0, 0, 0, true, 0);
            legendRange.x = legendX;
            legendRange.y = legendY;
            legendRange.width = legendWidth;
            legendRange.height = legendHeight;
            legendRange.value = this.heatMap.isColorRange ?
                heatMap.legendColorCollection[i].endValue : heatMap.legendColorCollection[i].value;
            legendRange.currentPage = this.currentPage;
            if (colorCollection.length !== heatMap.legendColorCollection.length && i === heatMap.legendColorCollection.length - 1) {
                if (heatMap.horizontalGradient) {
                    legendRange.width = 0;
                }
                else {
                    legendRange.height = 0;
                }
                this.visibilityCollections[i] = this.visibilityCollections[i - 1];
            }
            legendRange.visible = !isNullOrUndefined(this.visibilityCollections[i]) ?
                this.visibilityCollections[i] : true;
            this.legendRange.push(legendRange);
            if (!heatMap.legendColorCollection[i].isHidden) {
                const color = heatMap.legendOnLoad ? this.heatMap.isColorRange ? colorCollection[i].minColor :
                    colorCollection[i].color : this.legendRange[i].visible ?
                    this.heatMap.isColorRange ? colorCollection[i].minColor :
                        colorCollection[i].color : this.heatMap.themeStyle.toggledColor || '#D3D3D3';
                const rectItem = new RectOption(heatMap.element.id + '_Smart_Legend' + i, color, tempBorder, 1, smartLegendRect);
                this.drawSvgCanvas.drawRectangle(rectItem, legendElement);
                this.legend.appendChild(legendElement);
                rectPosition.x = legendX;
                rectPosition.y = legendY;
                rectPosition.width = legendWidth;
                rectPosition.height = legendHeight;
                rectPosition.label = this.labelCollections[i];
                rectPosition.id = heatMap.element.id + '_Smart_Legend' + i;
                this.legendRectPositionCollection.push(rectPosition);
                const text = getTitle(this.labelCollections[i], heatMap.legendSettings.textStyle, this.textWrapCollections[i]);
                if (text.length !== 0 && heatMap.enableCanvasRendering) {
                    const elementSize = measureText(this.labelCollections[i], heatMap.legendSettings.textStyle);
                    this.legendLabelTooltip.push(new CanvasTooltip(this.labelCollections[i], new Rect(rectPosition.x, rectPosition.y, elementSize.width, elementSize.height)));
                }
            }
        }
    }
    colorRangeLegendPosition(i, labelX) {
        if (this.segmentCollections.length !== this.segmentCollectionsLabels.length) {
            for (let k = 0; k < this.segmentCollections.length; k++) {
                if (this.segmentCollectionsLabels[i] === this.segmentCollections[k]) {
                    labelX = this.segmentCollectionsLabels[i] + (((k === this.segmentCollections.length - 1 ?
                        (this.heatMap.horizontalGradient ? this.width : this.height) :
                        this.segmentCollections[k + 1]) - this.segmentCollections[k]) / 2);
                    break;
                }
            }
        }
        else {
            labelX = this.segmentCollectionsLabels[i] + (((i === this.segmentCollectionsLabels.length - 1 ?
                (this.heatMap.horizontalGradient ? this.width : this.height) :
                this.segmentCollectionsLabels[i + 1]) - this.segmentCollectionsLabels[i]) / 2);
        }
        this.labelPosition = labelX;
    }
    renderLegendLabel(rect) {
        const heatMap = this.heatMap;
        this.legendTextRange = [];
        if (heatMap.legendSettings.showLabel && (heatMap.paletteSettings.type === 'Gradient' ||
            (heatMap.paletteSettings.type === 'Fixed' && heatMap.legendSettings.labelDisplayType !== 'None'))) {
            let anchor = 'start';
            let dominantBaseline;
            let legendLabel;
            let textWrapWidth = 0;
            let text;
            this.legendLabelTooltip = [];
            let elementSize;
            const isColorRange = heatMap.isColorRange;
            const colorCollection = heatMap.legendColorCollection;
            if (heatMap.enableCanvasRendering) {
                const ctx = heatMap.canvasRenderer.ctx;
                ctx.rect(this.legendGroup.x, this.legendGroup.y, this.legendGroup.width, this.legendGroup.height);
                ctx.save();
                ctx.clip();
                ctx.restore();
            }
            else {
                legendLabel = heatMap.renderer.createGroup({ id: heatMap.element.id + '_Heatmap_LegendLabel' });
            }
            let labelX;
            let labelY;
            for (let i = 0; i < colorCollection.length; i++) {
                const value = ((colorCollection[i].value - (Math.round(this.legendMinValue * 100) / 100)) /
                    ((Math.round(this.legendMaxValue * 100) / 100) - (Math.round(this.legendMinValue * 100) / 100))) * 100;
                const index = colorCollection[i].isHidden ? (i - 1) : i;
                const legendElement = this.legend.querySelector('#' + heatMap.element.id + '_Smart_Legend_Group_' + index);
                if (heatMap.horizontalGradient) {
                    if (this.heatMap.isColorRange && heatMap.paletteSettings.type === 'Gradient') {
                        this.colorRangeLegendPosition(i, labelX);
                        labelX = this.labelPosition;
                    }
                    else if (this.heatMap.legendSettings.enableSmartLegend && this.heatMap.isColorRange &&
                        heatMap.paletteSettings.type === 'Fixed') {
                        labelX = this.segmentCollections[i] + ((rect.width / colorCollection.length) / 2);
                    }
                    else {
                        labelX = this.segmentCollections[i];
                    }
                    labelY = rect.y + rect.height + this.labelPadding;
                    anchor = (((Math.round(value * 100) / 100) === 0 && !isColorRange) || (heatMap.paletteSettings.type === 'Fixed' &&
                        i === 0)) ? 'start' : (((Math.round(value * 100) / 100) === 100 && heatMap.paletteSettings.type === 'Gradient' &&
                        !isColorRange) || (Math.round(heatMap.dataSourceMaxValue * 100) / 100) === colorCollection[i].value &&
                        heatMap.legendSettings.enableSmartLegend) || (heatMap.legendSettings.enableSmartLegend &&
                        heatMap.paletteSettings.type === 'Fixed' && heatMap.legendSettings.labelDisplayType === 'Edge') ? 'end' : 'middle';
                    dominantBaseline = 'hanging';
                }
                else {
                    labelX = rect.x + rect.width + this.labelPadding;
                    if (this.heatMap.isColorRange && heatMap.paletteSettings.type === 'Gradient') {
                        this.colorRangeLegendPosition(i, labelY);
                        labelY = this.labelPosition;
                    }
                    else if (this.heatMap.legendSettings.enableSmartLegend && this.heatMap.isColorRange &&
                        heatMap.paletteSettings.type === 'Fixed') {
                        labelY = this.segmentCollections[i] + ((rect.height / colorCollection.length) / 2);
                    }
                    else {
                        labelY = this.segmentCollections[i];
                    }
                    dominantBaseline = (((Math.round(value * 100) / 100) === 0 && !isColorRange) || (i === 0 &&
                        heatMap.paletteSettings.type === 'Fixed')) ? 'hanging' : (((Math.round(value * 100) / 100) === 100 &&
                        !isColorRange && heatMap.paletteSettings.type === 'Gradient') ||
                        (Math.round(heatMap.dataSourceMaxValue * 100) / 100) === colorCollection[i].value &&
                            heatMap.legendSettings.enableSmartLegend) || (heatMap.legendSettings.enableSmartLegend &&
                        heatMap.legendSettings.labelDisplayType === 'Edge' &&
                        heatMap.paletteSettings.type === 'Fixed') ? 'auto' : 'middle';
                }
                textWrapWidth = heatMap.horizontalGradient ? (heatMap.legendSettings.textStyle.textOverflow === 'None' ?
                    this.segmentCollections[i] : this.textWrapCollections[i]) :
                    this.width - (this.legendRectScale.width + this.labelPadding + this.legendRectPadding);
                text = getTitle(this.labelCollections[i], heatMap.legendSettings.textStyle, textWrapWidth);
                elementSize = measureText(text[0], heatMap.legendSettings.textStyle);
                if (heatMap.paletteSettings.type === 'Fixed') {
                    const rectY = dominantBaseline === 'hanging' ? labelY : dominantBaseline === 'middle' ?
                        labelY - elementSize.height / 2 : labelY - elementSize.height;
                    const rectX = anchor === 'end' ? labelX - elementSize.width : anchor === 'middle' ?
                        labelX - elementSize.width / 2 : labelX;
                    const textPosition = new LegendRange(rectX, rectY, elementSize.width, elementSize.height, colorCollection[i].value, true, this.currentPage);
                    textPosition.visible = !isNullOrUndefined(this.visibilityCollections[i]) ?
                        this.visibilityCollections[i] : true;
                    this.legendTextRange.push(textPosition);
                }
                if (this.labelCollections[i] !== '') {
                    if (text.length !== 0 && text[0].indexOf('...') !== -1 && heatMap.enableCanvasRendering) {
                        this.legendLabelTooltip.push(new CanvasTooltip(this.labelCollections[i], new Rect(labelX, labelY, elementSize.width, elementSize.height)));
                    }
                    text = getSanitizedTexts(text, this.heatMap.enableHtmlSanitizer);
                    const textBasic = new TextBasic(labelX, labelY, anchor, text, 0, 'translate(0,0)', dominantBaseline);
                    const options = new TextOption(heatMap.element.id + '_Legend_Label' + i, textBasic, heatMap.legendSettings.textStyle, heatMap.legendSettings.textStyle.color || heatMap.themeStyle.legendLabel);
                    options.fill = heatMap.legendOnLoad ? options.fill :
                        (heatMap.paletteSettings.type === 'Fixed' && !this.legendRange[i].visible) ? '#D3D3D3' : options.fill;
                    const legendItem = heatMap.paletteSettings.type === 'Fixed' ? legendElement : legendLabel;
                    if (text.length > 1) {
                        this.drawSvgCanvas.createWrapText(options, heatMap.legendSettings.textStyle, legendLabel);
                    }
                    else {
                        this.drawSvgCanvas.createText(options, legendItem, text[0]);
                    }
                    if (Browser.isIE && !heatMap.enableCanvasRendering) {
                        if (dominantBaseline === 'middle') {
                            legendItem.lastChild.setAttribute('dy', '0.6ex');
                        }
                        else if (dominantBaseline === 'hanging') {
                            legendItem.lastChild.setAttribute('dy', '1.5ex');
                        }
                    }
                }
                if (this.legendMaxValue === this.legendMinValue && heatMap.paletteSettings.type === 'Gradient') {
                    break;
                }
            }
            if (!heatMap.enableCanvasRendering) {
                this.legendGroup.height = this.legendGroup.height > 0 ? this.legendGroup.height : 0;
                this.legendGroup.width = this.legendGroup.width > 0 ? this.legendGroup.width : 0;
                if (heatMap.paletteSettings.type === 'Gradient') {
                    this.legend.appendChild(legendLabel);
                }
                const clippath = heatMap.renderer.createClipPath({ id: heatMap.element.id + '_clipPath' });
                const clipRect = heatMap.renderer.drawRectangle(this.legendGroup);
                clippath.appendChild(clipRect);
                heatMap.svgObject.appendChild(clippath);
                this.legend.style.cssText = 'clip-path:url(#' + clippath.id + ')';
            }
        }
    }
    /**
     * @private
     */
    renderGradientPointer(e, pageX, pageY) {
        const heatMap = this.heatMap;
        const currentRect = heatMap.heatMapSeries.getCurrentRect(pageX, pageY);
        const cellValue = heatMap.bubbleSizeWithColor ? currentRect.value[0].bubbleData.toString() !== '' ?
            !this.heatMap.isColorValueExist ? currentRect.value[0].bubbleData.toString() :
                currentRect.value[1].bubbleData.toString() : '' : currentRect.value.toString();
        const rect = this.legendRectScale;
        let legendPart;
        let direction;
        let options;
        let legendPath;
        let pathX1;
        let pathY1;
        let pathX2;
        let pathY2;
        let pathX3;
        let pathY3;
        if (cellValue.toString() !== '') {
            if (!heatMap.horizontalGradient) {
                legendPart = rect.height / 100;
                legendPath = legendPart * ((Number(cellValue) - this.legendMinValue) /
                    (this.legendMaxValue - this.legendMinValue)) * 100;
                legendPath = isNaN(legendPath) ? 0 : legendPath;
                pathX1 = rect.x - 1;
                pathY1 = rect.y + legendPath;
                pathX2 = pathX3 = rect.x - 8;
                pathY2 = rect.y - 5 + legendPath;
                pathY3 = rect.y + 5 + legendPath;
            }
            else {
                legendPart = rect.width / 100;
                legendPath = legendPart * ((Number(cellValue) - this.legendMinValue) /
                    (this.legendMaxValue - this.legendMinValue)) * 100;
                legendPath = isNaN(legendPath) ? 0 : legendPath;
                pathX1 = rect.x + legendPath;
                pathY1 = rect.y + rect.height;
                pathX2 = rect.x - 5 + legendPath;
                pathY2 = pathY3 = rect.y + rect.height + 8;
                pathX3 = rect.x + 5 + legendPath;
            }
            direction = 'M' + ' ' + pathX1 + ' ' + pathY1 + ' ' +
                'L' + ' ' + pathX2 + ' ' + pathY2 + ' ' + 'L' + ' ' + pathX3 + ' ' + pathY3 + ' ' + 'Z';
            options = new PathOption(heatMap.element.id + '_Gradient_Pointer', 'gray', 0.01, '#A0A0A0', 1, '0,0', direction);
            if (!heatMap.enableCanvasRendering) {
                this.gradientPointer = heatMap.renderer.drawPath(options);
                this.gradientPointer.style.visibility = 'visible';
                this.legend.appendChild(this.gradientPointer);
            }
            else {
                this.removeGradientPointer();
                let canvasTranslate;
                heatMap.canvasRenderer.drawPath(options, canvasTranslate);
                if (!isNullOrUndefined(this.previousOptions)) {
                    this.previousOptions.pathX1 = pathX1;
                    this.previousOptions.pathY1 = pathY1;
                    this.previousOptions.pathX2 = pathX2;
                    this.previousOptions.pathY2 = pathY2;
                    this.previousOptions.pathX3 = pathX3;
                    this.previousOptions.pathY3 = pathY3;
                }
            }
        }
        else {
            this.removeGradientPointer();
        }
    }
    /**
     * @private
     */
    removeGradientPointer() {
        const heatMap = this.heatMap;
        if (!isNullOrUndefined(heatMap)) {
            if (this.gradientPointer && !heatMap.enableCanvasRendering) {
                this.gradientPointer.style.visibility = 'hidden';
            }
            else if (heatMap.enableCanvasRendering) {
                if (!isNullOrUndefined(this.fillRect) && !isNullOrUndefined(this.previousOptions) &&
                    Object.keys(this.previousOptions).length !== 0) {
                    if (heatMap.horizontalGradient) {
                        this.fillRect.x = this.previousOptions.pathX2 - 1;
                        this.fillRect.y = this.previousOptions.pathY1;
                        this.fillRect.width = this.previousOptions.pathX3 - this.previousOptions.pathX2 + 2;
                        this.fillRect.height = this.previousOptions.pathY2 + 1 - this.previousOptions.pathY1;
                    }
                    else {
                        this.fillRect.x = this.previousOptions.pathX2 - 1;
                        this.fillRect.y = this.previousOptions.pathY2 - 1;
                        this.fillRect.width = this.previousOptions.pathX1 - this.previousOptions.pathX2 + 1;
                        this.fillRect.height = this.previousOptions.pathY3 - this.previousOptions.pathY2 + 2;
                    }
                }
                heatMap.canvasRenderer.ctx.fillStyle = heatMap.themeStyle.background;
                if (!isNullOrUndefined(this.fillRect)) {
                    heatMap.canvasRenderer.ctx.clearRect(this.fillRect.x, this.fillRect.y, this.fillRect.width, this.fillRect.height);
                }
            }
        }
    }
    /**
     * @private
     */
    calculateLegendBounds(rect) {
        const heatMap = this.heatMap;
        const legendSettings = heatMap.legendSettings;
        this.labelCollection = [];
        this.labelCollections = [];
        const colorCollection = heatMap.legendColorCollection;
        if (legendSettings.position !== 'Bottom' && legendSettings.position !== 'Top' &&
            legendSettings.position !== 'Right' && legendSettings.position !== 'Left') {
            legendSettings.position = 'Right';
        }
        const title = heatMap.legendSettings.title;
        const titleSize = measureText(this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text, title.textStyle);
        heatMap.horizontalGradient = legendSettings.position === 'Bottom' || legendSettings.position === 'Top';
        this.legendRectPadding = heatMap.horizontalGradient ? heatMap.legendSettings.title.text ?
            titleSize.height + 16 : 16 : 10; // padding between rect and legend
        this.labelPadding = legendSettings.showLabel ? this.heatMap.horizontalGradient ? 10 : 6 : 0; // padding between list and label
        this.legendHeight = legendSettings.height;
        this.legendWidth = legendSettings.width;
        const format = heatMap.legendSettings.labelFormat;
        const isCustom = format.match('{value}') !== null;
        this.format = heatMap.intl.getNumberFormat({ format: isCustom ? '' : format });
        if (heatMap.paletteSettings.type === 'Fixed') {
            for (let i = 0; i < colorCollection.length; i++) {
                const label = colorCollection[i].label ? colorCollection[i].label : this.heatMap.isColorRange ?
                    colorCollection[i].startValue.toString() + '-' + colorCollection[i].endValue.toString() : formatValue(isCustom, format, colorCollection[i].value, this.format).toString();
                const legendEventArg = { cancel: false, text: label, name: 'legendRender' };
                this.labelCollection.push(label);
                this.heatMap.trigger('legendRender', legendEventArg);
                if (heatMap.legendRender) {
                    if (heatMap.legendSettings.enableSmartLegend && heatMap.legendSettings.labelDisplayType === 'Edge'
                        && i > 0 && i < colorCollection.length - 1) {
                        this.labelCollections.push('');
                    }
                    else {
                        if (!legendEventArg.cancel) {
                            this.labelCollections.push(legendEventArg.text);
                        }
                        else {
                            this.labelCollections.push('');
                        }
                    }
                }
                else {
                    if (heatMap.legendSettings.enableSmartLegend && heatMap.legendSettings.labelDisplayType === 'Edge'
                        && i > 0 && i < colorCollection.length - 1) {
                        this.labelCollections.push('');
                    }
                    else {
                        this.labelCollections.push(label);
                    }
                }
            }
        }
        else {
            for (let i = 0; i < colorCollection.length; i++) {
                const label = colorCollection[i].isHidden ? '' : colorCollection[i].label ? colorCollection[i].label :
                    this.heatMap.isColorRange ? colorCollection[i].startValue.toString() + '-' + colorCollection[i].endValue.toString() :
                        formatValue(isCustom, format, colorCollection[i].value, this.format).toString();
                const legendEventArg = { cancel: false, text: label, name: 'legendRender' };
                if (!colorCollection[i].isHidden) {
                    this.heatMap.trigger('legendRender', legendEventArg);
                }
                if (heatMap.legendRender) {
                    if (!legendEventArg.cancel) {
                        if (i > 0 && i < colorCollection.length - 1 && heatMap.legendSettings.labelDisplayType === 'Edge') {
                            this.labelCollections.push('');
                        }
                        else {
                            if (!legendEventArg.cancel) {
                                this.labelCollections.push(legendEventArg.text);
                            }
                            else {
                                this.labelCollections.push('');
                            }
                        }
                    }
                    else {
                        this.labelCollections.push('');
                    }
                }
                else {
                    if (i > 0 && i < colorCollection.length - 1 && heatMap.legendSettings.labelDisplayType === 'Edge') {
                        this.labelCollections.push('');
                    }
                    else {
                        this.labelCollections.push(label);
                    }
                }
            }
        }
        if (heatMap.paletteSettings.type === 'Gradient' || (heatMap.paletteSettings.type === 'Fixed' &&
            heatMap.legendSettings.enableSmartLegend)) {
            this.maxLegendLabelSize = this.getMaxLabelSize();
            if (heatMap.horizontalGradient && legendSettings.height === '') {
                this.legendHeight = ((2 * this.legendRectPadding) + this.legendSize + this.maxLegendLabelSize.height).toString();
            }
            else if (!heatMap.horizontalGradient && legendSettings.width === '' && (legendSettings.textStyle.textOverflow === 'None' ||
                (heatMap.paletteSettings.type === 'Fixed' && heatMap.legendSettings.enableSmartLegend &&
                    heatMap.legendSettings.labelDisplayType === 'None'))) {
                this.legendWidth = ((2 * this.legendRectPadding) + this.legendSize + this.maxLegendLabelSize.width).toString();
            }
            this.calculateTitleBounds();
        }
        else {
            this.calculateListLegendBounds(rect);
        }
        this.legendHeight = this.legendHeight ? this.legendHeight : heatMap.horizontalGradient ? '50' : '100%';
        this.legendWidth = this.legendWidth ? this.legendWidth : heatMap.horizontalGradient ?
            '100%' : heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend ? '70' : '50';
        this.height = stringToNumber(this.legendHeight, rect.height);
        this.width = stringToNumber(this.legendWidth, rect.width);
        if (heatMap.horizontalGradient) {
            this.height = heatMap.paletteSettings.type === 'Gradient' || heatMap.legendSettings.enableSmartLegend ?
                this.height < 50 ? 50 : this.height : this.height;
            if (legendSettings.position === 'Top') {
                rect.y += this.height;
            }
            rect.height -= this.height;
        }
        else {
            this.width = heatMap.paletteSettings.type === 'Gradient' || heatMap.legendSettings.enableSmartLegend ?
                this.width < 50 ? 50 : this.width : this.width;
            if (legendSettings.position === 'Left') {
                rect.x += this.width;
            }
            rect.width -= this.width;
        }
    }
    calculateTitleBounds() {
        const heatMap = this.heatMap;
        const title = heatMap.legendSettings.title;
        const titleSize = measureText(this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text, title.textStyle);
        if (heatMap.legendSettings.title.text) {
            if ((heatMap.legendSettings.position === 'Top' || heatMap.legendSettings.position === 'Bottom') &&
                heatMap.legendSettings.height === '') {
                this.legendHeight = (((2 * this.legendRectPadding) - titleSize.height) +
                    this.legendSize + this.maxLegendLabelSize.height).toString();
            }
            if (heatMap.legendSettings.width === '' && (heatMap.legendSettings.textStyle.textOverflow === 'None' ||
                (heatMap.paletteSettings.type === 'Fixed' && heatMap.legendSettings.enableSmartLegend &&
                    heatMap.legendSettings.labelDisplayType === 'None'))) {
                if (heatMap.legendSettings.position === 'Right') {
                    this.legendWidth = ((2 * this.legendRectPadding + titleSize.width) +
                        this.legendSize + this.maxLegendLabelSize.width).toString();
                }
                else if (heatMap.legendSettings.position === 'Left') {
                    titleSize.width = titleSize.width > this.maxLegendLabelSize.width ? titleSize.width : this.maxLegendLabelSize.width;
                    this.legendWidth = ((2 * this.legendRectPadding + titleSize.width) + this.legendSize).toString();
                }
            }
        }
    }
    calculateListLegendBounds(rect) {
        const heatMap = this.heatMap;
        this.listWidth = 0;
        this.listHeight = 0;
        this.currentPage = 1;
        const padding = 10; // padding of paging elements
        const title = heatMap.legendSettings.title;
        const titleSize = measureText(this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text, title.textStyle);
        const height = (titleSize.height + 50).toString();
        if (heatMap.horizontalGradient) {
            for (let i = 0; i < heatMap.colorCollection.length; i++) {
                let size = 0;
                if (heatMap.legendSettings.showLabel) {
                    const text = this.labelCollections[i];
                    size = measureText(this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text, heatMap.legendSettings.textStyle).width;
                }
                const perListWidth = this.legendSize + this.labelPadding + size + this.listInterval;
                this.listWidth += perListWidth;
            }
            this.listWidth += this.listInterval + padding;
            if (this.legendWidth === '') {
                this.legendWidth = this.listWidth > rect.width ? rect.width.toString() : this.listWidth.toString();
            }
            if (this.legendHeight === '') {
                this.numberOfRows = Math.ceil(this.listWidth / stringToNumber(this.legendWidth, rect.width));
                this.numberOfRows = this.numberOfRows > 3 ? 3 : this.numberOfRows;
                this.legendHeight = (this.listWidth > rect.width || this.listWidth > stringToNumber(this.legendWidth, rect.width)) &&
                    this.numberOfRows > 3 ? (((this.legendSize + this.listInterval) * this.numberOfRows) + this.legendRectPadding +
                    parseInt(heatMap.legendSettings.textStyle.size, 10) + padding).toString() :
                    (((this.legendSize + this.listInterval) * this.numberOfRows) + this.legendRectPadding).toString();
            }
        }
        else {
            this.listHeight = ((this.legendSize + this.listInterval) * heatMap.colorCollection.length)
                + this.listInterval + (heatMap.legendSettings.title.text ? titleSize.height : 0);
            if (this.legendHeight === '') {
                this.legendHeight = this.listHeight > rect.height ? rect.height.toString() : this.listHeight.toString();
            }
            if (this.legendWidth === '' && heatMap.legendSettings.textStyle.textOverflow !== 'Trim') {
                this.maxLegendLabelSize = this.getMaxLabelSize();
                this.maxLegendLabelSize.width = titleSize.width > this.maxLegendLabelSize.width ?
                    titleSize.width : this.maxLegendLabelSize.width;
                this.legendWidth = ((2 * this.legendRectPadding) + this.legendSize + this.labelPadding +
                    this.maxLegendLabelSize.width).toString();
            }
        }
        if (stringToNumber(this.legendHeight, rect.height) < 50) {
            this.legendHeight = height;
        }
        if (stringToNumber(this.legendWidth, rect.width) < 70) {
            this.legendWidth = '70';
        }
    }
    getMaxLabelSize() {
        const heatMap = this.heatMap;
        this.maxLegendLabelSize = new Size(0, 0);
        if (!heatMap.legendSettings.showLabel || (heatMap.horizontalGradient && heatMap.paletteSettings.type === 'Fixed' &&
            !heatMap.legendSettings.enableSmartLegend) || (heatMap.paletteSettings.type === 'Fixed' &&
            heatMap.legendSettings.labelDisplayType === 'None')) {
            return this.maxLegendLabelSize;
        }
        else {
            const labelSize = this.maxLegendLabelSize;
            for (let i = 0; i < heatMap.legendColorCollection.length; i++) {
                const size = measureText(heatMap.enableHtmlSanitizer ?
                    SanitizeHtmlHelper.sanitize(this.labelCollections[i]) :
                    this.labelCollections[i], heatMap.legendSettings.textStyle);
                labelSize.width = (labelSize.width > size.width) ? labelSize.width : size.width;
                labelSize.height = (labelSize.height > size.height) ? labelSize.height : size.height;
            }
            return labelSize;
        }
    }
    /**
     * @private
     */
    calculateLegendSize(rect, legendTop) {
        const heatMap = this.heatMap;
        const legendSettings = heatMap.legendSettings;
        let left;
        let top;
        const padding = 10; // inner padding for axis title and axil labels
        const alignment = legendSettings.alignment;
        let width;
        let height = stringToNumber(this.legendHeight, rect.height);
        if (!heatMap.legendSettings.title.text) {
            width = stringToNumber(this.legendWidth, rect.width);
        }
        else {
            width = this.width;
        }
        const axis = heatMap.axisCollections;
        let axisTitlePadding = 0;
        if (heatMap.horizontalGradient) {
            width = width > rect.width ? rect.width : width;
            height = heatMap.paletteSettings.type === 'Gradient' || heatMap.legendSettings.enableSmartLegend ?
                height > 50 ? height : 50 : this.height;
            left = alignment === 'Near' ? rect.x : alignment === 'Far' ? rect.x + rect.width - width :
                rect.x + (rect.width / 2) - (width / 2);
            if (heatMap.xAxis.title.text !== '') {
                axisTitlePadding = measureText(heatMap.xAxis.title.text, heatMap.xAxis.textStyle).height + padding;
            }
            const axisHeight = axis[0].opposedPosition ? 0 : sum(axis[0].xAxisMultiLabelHeight) + axis[0].maxLabelSize.height +
                axisTitlePadding + padding;
            top = legendSettings.position === 'Top' ? heatMap.titleSettings.text ? legendTop :
                heatMap.margin.top : rect.y + rect.height + axisHeight;
        }
        else {
            height = height > rect.height ? rect.height : height;
            width = heatMap.paletteSettings.type === 'Gradient' || heatMap.legendSettings.enableSmartLegend ?
                width > 50 ? width : 50 : width;
            top = alignment === 'Near' ? rect.y : alignment === 'Far' ? rect.y + rect.height - height :
                rect.y + (rect.height / 2) - (height / 2);
            if (heatMap.yAxis.title.text !== '') {
                axisTitlePadding = measureText(heatMap.yAxis.title.text, heatMap.yAxis.textStyle).height + padding;
            }
            const axisWidth = axis[1].opposedPosition ? sum(axis[1].yAxisMultiLabelHeight) +
                axis[1].maxLabelSize.width + axisTitlePadding + 2 * padding : 0;
            left = legendSettings.position === 'Right' ? rect.x + rect.width + axisWidth : heatMap.margin.left;
        }
        this.legendGroup = new Rect(left, top, width, height);
        this.calculateGradientScale(this.legendGroup);
    }
    // calculating number of lists per page
    measureListLegendBound(rect) {
        const heatMap = this.heatMap;
        const title = heatMap.legendSettings.title;
        const padding = 15; // padding of paging element
        this.numberOfPages = 1;
        const titleSize = measureText(heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text, title.textStyle);
        if (heatMap.horizontalGradient) {
            if (this.listWidth > this.width) {
                this.numberOfRows = Math.ceil(this.listWidth / this.width);
                this.listHeight = ((this.legendSize + this.listInterval) * this.numberOfRows);
                this.listPerPage = this.numberOfRows <= 3 ? this.numberOfRows : Math.ceil((this.height - padding -
                    parseInt(heatMap.legendSettings.textStyle.size, 10) -
                    this.legendRectPadding) / (this.legendSize + this.listInterval));
                this.numberOfPages = Math.ceil(this.numberOfRows / this.listPerPage);
            }
            else {
                this.listPerPage = 1;
            }
        }
        else {
            if (this.listHeight > rect.height || this.listHeight > this.height) {
                let maxHeight = stringToNumber(this.legendHeight, rect.height);
                maxHeight = maxHeight > rect.height ? rect.height : maxHeight;
                maxHeight = heatMap.legendSettings.title.text ? maxHeight - titleSize.height : maxHeight;
                this.listPerPage = Math.floor(maxHeight / (this.legendSize + this.listInterval) - 1);
                this.numberOfPages = Math.max(1, Math.ceil(heatMap.colorCollection.length / this.listPerPage));
            }
            else {
                this.listPerPage = heatMap.colorCollection.length;
                this.legendHeight = this.listHeight.toString();
            }
        }
    }
    renderPagingElements() {
        const heatMap = this.heatMap;
        if (this.numberOfPages > 1) {
            this.navigationCollections = [];
            this.legend.appendChild(this.paginggroup);
            const iconSize = 10;
            const rightArrowX = this.legendGroup.x + this.legendGroup.width - iconSize;
            const rightArrowY = this.legendGroup.y + this.legendGroup.height - iconSize;
            const text = this.currentPage + '/' + this.numberOfPages;
            const textSize = measureText(text, heatMap.legendSettings.textStyle);
            const textX = rightArrowX - textSize.width - 15;
            const textBasic = new TextBasic(textX, rightArrowY, 'start', text, 0, 'translate(0,0)', 'middle');
            const options = new TextOption(heatMap.element.id + '_paging', textBasic, heatMap.legendSettings.textStyle, heatMap.legendSettings.textStyle.color || heatMap.themeStyle.legendLabel);
            this.drawSvgCanvas.createText(options, this.paginggroup, text);
            if (Browser.isIE && !heatMap.enableCanvasRendering) {
                this.paginggroup.lastChild.setAttribute('dy', '0.6ex');
            }
            this.pagingRect = new Rect(textX, rightArrowY - textSize.height / 2, textSize.width, textSize.height);
            const pagingTextRect = new RectOption(heatMap.element.id + '_pagingText', 'none', { color: 'transparent', width: 0 }, 1, this.pagingRect);
            this.drawSvgCanvas.drawRectangle(pagingTextRect, this.paginggroup);
            const rightArrowRect = new RectOption(heatMap.element.id + '_rightArrow', 'none', { color: 'transparent', width: 0 }, 1, new Rect(rightArrowX - iconSize, rightArrowY - iconSize / 2, iconSize, iconSize));
            this.drawSvgCanvas.drawRectangle(rightArrowRect, this.paginggroup);
            const rightArrow = 'M' + ' ' + (rightArrowX) + ' ' + rightArrowY + ' ' +
                'L' + ' ' + (rightArrowX - iconSize) + ' ' + (rightArrowY - iconSize / 2) + ' ' + 'L' + ' ' +
                (rightArrowX - iconSize) + ' ' + (rightArrowY + (iconSize / 2)) + 'Z';
            const leftX = textX - 15;
            const leftArrow = 'M' + ' ' + leftX + ' ' + rightArrowY + ' ' +
                'L' + ' ' + (leftX + iconSize) + ' ' + (rightArrowY - iconSize / 2) + ' ' + 'L' + ' ' +
                (leftX + iconSize) + ' ' + (rightArrowY + (iconSize / 2)) + 'Z';
            const leftArrowRect = new RectOption(heatMap.element.id + '_leftArrow', 'none', { color: 'transparent', width: 0 }, 1, new Rect(leftX + iconSize / 2, rightArrowY - iconSize / 2, iconSize, iconSize));
            this.drawSvgCanvas.drawRectangle(leftArrowRect, this.paginggroup);
            const leftOption = new PathOption(heatMap.element.id + '_Legend_leftarrow', 'gray', 0.01, '#A0A0A0', 1, '0,0', leftArrow);
            const rightOption = new PathOption(heatMap.element.id + '_Legend_rightarrow', 'gray', 0.01, '#A0A0A0', 1, '0,0', rightArrow);
            this.navigationCollections.push(rightArrowRect);
            this.navigationCollections.push(leftArrowRect);
            if (!heatMap.enableCanvasRendering) {
                const arrow = heatMap.renderer.drawPath(leftOption);
                arrow.setAttribute('tabindex', '0');
                arrow.style.outline = 'none';
                const rightarrow = heatMap.renderer.drawPath(rightOption);
                rightarrow.setAttribute('tabindex', '0');
                rightarrow.style.outline = 'none';
                this.paginggroup.appendChild(arrow);
                this.paginggroup.appendChild(rightarrow);
            }
            else {
                let canvasTranslate;
                heatMap.canvasRenderer.clearRect(leftArrowRect);
                heatMap.canvasRenderer.clearRect(rightArrowRect);
                heatMap.canvasRenderer.drawPath(leftOption, canvasTranslate);
                heatMap.canvasRenderer.drawPath(rightOption, canvasTranslate);
            }
        }
    }
    calculateGradientScale(scale) {
        const heatMap = this.heatMap;
        const padding = 10; // padding between legend bounds and gradient scale
        let left;
        let top;
        let height;
        let width;
        const title = heatMap.legendSettings.title;
        const titleSize = measureText(heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(title.text) : title.text, title.textStyle);
        const titleHeight = heatMap.legendSettings.title.text ? titleSize.height : 0;
        if (heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend) {
            this.measureListLegendBound(heatMap.initialClipRect);
        }
        if (heatMap.horizontalGradient) {
            left = scale.x + padding;
            top = scale.y + this.legendRectPadding;
            width = heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend ?
                scale.width - (2 * this.listInterval) : scale.width - 2 * padding;
            height = heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend ?
                (this.legendSize + this.listInterval) * this.listPerPage - this.listInterval : this.gradientScaleSize;
        }
        else {
            left = scale.x + this.legendRectPadding;
            top = scale.y + padding + titleHeight;
            width = (heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend) ?
                scale.width - padding : this.gradientScaleSize;
            height = heatMap.paletteSettings.type === 'Fixed' && !heatMap.legendSettings.enableSmartLegend ?
                (this.legendSize + this.listInterval) * this.listPerPage - this.listInterval :
                scale.height - 2 * padding - titleHeight;
        }
        this.legendRectScale = new Rect(left, top, width, height);
        if (heatMap.paletteSettings.type === 'Gradient' || heatMap.paletteSettings.type === 'Fixed' &&
            heatMap.legendSettings.enableSmartLegend) {
            this.calculateColorAxisGrid(this.legendRectScale);
        }
    }
    calculateColorAxisGrid(legendRect) {
        const heatMap = this.heatMap;
        const rect = this.legendRectScale;
        let legendPart;
        let text;
        let maxTextWrapLength = 0;
        this.segmentCollectionsLabels = [];
        this.segmentCollections = [];
        this.textWrapCollections = [];
        let pathX1;
        let pathY1;
        const colorCollection = heatMap.paletteSettings.type === 'Gradient' ?
            heatMap.legendColorCollection : heatMap.colorCollection;
        const minValue = heatMap.bubbleSizeWithColor ? heatMap.minColorValue : heatMap.dataSourceMinValue;
        const maxValue = heatMap.bubbleSizeWithColor ? heatMap.maxColorValue : heatMap.dataSourceMaxValue;
        this.legendMinValue = this.heatMap.isColorRange ? (colorCollection[0].startValue > heatMap.dataSourceMinValue) ?
            heatMap.dataSourceMinValue : colorCollection[0].startValue : ((colorCollection[0].value > minValue) ? minValue :
            colorCollection[0].value);
        this.legendMaxValue = this.heatMap.isColorRange ? (colorCollection[colorCollection.length - 1].endValue <
            heatMap.dataSourceMaxValue) ? heatMap.dataSourceMaxValue : colorCollection[colorCollection.length - 1].endValue :
            (colorCollection[colorCollection.length - 1].value < maxValue ? maxValue : colorCollection[colorCollection.length - 1].value);
        if (heatMap.paletteSettings.type === 'Gradient') {
            for (let index = 0; index < colorCollection.length; index++) {
                let value;
                legendPart = (this.heatMap.isColorRange && heatMap.horizontalGradient ? rect.width : rect.height) / 100;
                if (this.heatMap.isColorRange) {
                    if (colorCollection[0].startValue !== this.heatMap.dataSourceMinValue && index === 0 &&
                        colorCollection[0].startValue > this.heatMap.dataSourceMinValue) {
                        value = (this.heatMap.dataSourceMinValue - this.legendMinValue) /
                            (this.legendMaxValue - this.legendMinValue) * 100;
                        pathY1 = (heatMap.horizontalGradient ? legendRect.x : legendRect.y) + (legendPart * value);
                        this.segmentCollections.push(pathY1);
                    }
                    value = ((((colorCollection[index].startValue < heatMap.dataSourceMinValue &&
                        colorCollection[index].endValue >
                            heatMap.dataSourceMaxValue) ? heatMap.dataSourceMinValue : colorCollection[index].startValue) -
                        this.legendMinValue) / (this.legendMaxValue - this.legendMinValue)) * 100;
                    value = isNaN(value) ? 0 : value;
                    pathY1 = (heatMap.horizontalGradient ? legendRect.x : legendRect.y) + (legendPart * value);
                    this.segmentCollections.push(pathY1);
                    this.segmentCollectionsLabels.push(pathY1);
                    if (colorCollection[index].endValue !== ((index === colorCollection.length - 1) ?
                        this.heatMap.dataSourceMaxValue : colorCollection[index + 1].startValue) &&
                        this.heatMap.legendColorCollection[index].endValue < this.heatMap.dataSourceMaxValue) {
                        if (index === colorCollection.length - 1) {
                            value = (colorCollection[index].endValue - this.legendMinValue) /
                                (this.legendMaxValue - this.legendMinValue) * 100;
                            pathY1 = (heatMap.horizontalGradient ? legendRect.x : legendRect.y) + (legendPart * value);
                            this.segmentCollections.push(pathY1);
                        }
                        value = ((index === colorCollection.length - 1 ? this.heatMap.dataSourceMaxValue :
                            colorCollection[index].endValue) - this.legendMinValue) /
                            (this.legendMaxValue - this.legendMinValue) * 100;
                        pathY1 = (heatMap.horizontalGradient ? legendRect.x : legendRect.y) + (legendPart * value);
                        this.segmentCollections.push(pathY1);
                    }
                }
                else {
                    value = ((colorCollection[index].value - this.legendMinValue) /
                        (this.legendMaxValue - this.legendMinValue)) * 100;
                    value = isNaN(value) ? 0 : value;
                    if (!heatMap.horizontalGradient) {
                        legendPart = rect.height / 100;
                        pathY1 = legendRect.y + (legendPart * value);
                        this.segmentCollections.push(pathY1);
                    }
                    else {
                        legendPart = rect.width / 100;
                        pathX1 = legendRect.x + (legendPart * value);
                        this.segmentCollections.push(pathX1);
                    }
                }
            }
        }
        let textWrapWidth;
        if (heatMap.horizontalGradient) {
            const segmentWidth = this.heatMap.isColorRange ? this.segmentCollectionsLabels : this.segmentCollections;
            for (let i = 0; i < colorCollection.length; i++) {
                if (heatMap.paletteSettings.type === 'Gradient') {
                    const previousSegmentWidth = (segmentWidth[i] - segmentWidth[i - 1]) / 2;
                    const nextSegmentWidth = (segmentWidth[i + 1] - segmentWidth[i]) / 2;
                    if (i === colorCollection.length - 1) {
                        textWrapWidth = this.heatMap.isColorRange ? (legendRect.width - segmentWidth[i - 1]) / 2 : previousSegmentWidth;
                    }
                    else if (i === 0) {
                        textWrapWidth = nextSegmentWidth;
                    }
                    else {
                        textWrapWidth = (previousSegmentWidth < nextSegmentWidth && !this.heatMap.isColorRange) ?
                            previousSegmentWidth : nextSegmentWidth;
                    }
                }
                else {
                    const width = this.legendRectScale.width / heatMap.colorCollection.length;
                    textWrapWidth = heatMap.legendSettings.labelDisplayType === 'Edge' ? width : width / 2;
                }
                this.textWrapCollections.push(textWrapWidth);
                text = getTitle(this.labelCollections[i], heatMap.legendSettings.textStyle, textWrapWidth);
                maxTextWrapLength = text.length > maxTextWrapLength ? text.length : maxTextWrapLength;
            }
            if (heatMap.legendSettings.position === 'Bottom') {
                heatMap.initialClipRect.height -= (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
                this.legendGroup.y -= (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
                this.legendRectScale.y = this.legendGroup.y + this.legendRectPadding;
                this.legendGroup.height = parseInt(this.legendHeight, 10) + (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
            }
            else {
                heatMap.initialClipRect.y += (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
                heatMap.initialClipRect.height -= (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
                this.legendRectScale.y = this.legendGroup.y + this.legendRectPadding;
                this.legendGroup.height = parseInt(this.legendHeight, 10) + (this.maxLegendLabelSize.height * (maxTextWrapLength - 1));
            }
        }
    }
    renderColorAxisGrid(legendRect) {
        const heatMap = this.heatMap;
        let legendElement;
        let pathX1;
        let pathY1;
        let pathX2;
        let pathY2;
        if (!heatMap.enableCanvasRendering) {
            legendElement = this.heatMap.renderer.createGroup({ id: heatMap.element.id + '_ColorAxis_Grid' });
        }
        for (let i = 0; i < (heatMap.isColorRange ? this.segmentCollections.length : heatMap.legendColorCollection.length); i++) {
            if (!heatMap.horizontalGradient) {
                pathX1 = legendRect.x;
                pathY1 = pathY2 = this.segmentCollections[i];
                pathX2 = legendRect.x + legendRect.width;
            }
            else {
                pathX1 = pathX2 = this.segmentCollections[i];
                pathY1 = legendRect.y;
                pathY2 = legendRect.y + legendRect.height;
            }
            const direction = new Line(pathX1, pathY1, pathX2, pathY2);
            const line = new LineOption(this.heatMap.element.id + '_ColorAxis_Grid' + i, direction, '#EEEEEE', 1);
            this.drawSvgCanvas.drawLine(line, legendElement);
            if (!heatMap.enableCanvasRendering) {
                this.legend.appendChild(legendElement);
            }
        }
    }
    /**
     * @private
     */
    renderLegendTitleTooltip(e, pageX, pageY) {
        if (e.target.id.indexOf('_legendTitle') !== -1 && e.target.textContent.indexOf('...') > -1) {
            showTooltip(this.heatMap.legendSettings.title.text, pageX, pageY, this.heatMap.element.offsetWidth, this.heatMap.element.id + '_legendTitle_Tooltip', getElement(this.heatMap.element.id + '_Secondary_Element'), null, this.heatMap);
            document.getElementById(this.heatMap.element.id + '_legendTitle_Tooltip').style.visibility = 'visible';
        }
        else {
            removeElement(this.heatMap.element.id + '_legendTitle_Tooltip');
        }
    }
    /**
     * @private
     */
    renderLegendLabelTooltip(e, pageX, pageY) {
        if (e.target.id.indexOf('_Legend_Label') !== -1 && e.target.textContent.indexOf('...') > -1) {
            const targetId = e.target.id.split(this.heatMap.element.id + '_Legend_Label');
            if (targetId.length === 2) {
                let index;
                if (targetId[1].length === 1 || this.heatMap.legendSettings.textStyle.textOverflow === 'Trim') {
                    index = parseInt(targetId[1], 10);
                }
                else {
                    index = parseInt(targetId[1].substring(0, targetId[1].length - 1), 10);
                }
                showTooltip(this.labelCollections[index], pageX, pageY, this.heatMap.element.offsetWidth, this.heatMap.element.id + '_LegendLabel_Tooltip', getElement(this.heatMap.element.id + '_Secondary_Element'), null, this.heatMap);
                document.getElementById(this.heatMap.element.id + '_LegendLabel_Tooltip').style.visibility = 'visible';
            }
        }
        else {
            removeElement(this.heatMap.element.id + '_LegendLabel_Tooltip');
        }
    }
    calculateListPerPage(rect) {
        const heatMap = this.heatMap;
        if (heatMap.horizontalGradient) {
            this.lastList = [];
            let legendX = rect.x;
            let legendY = rect.y;
            let size = 0;
            let division = 0;
            let labelX = 0;
            let labelY = 0;
            const interval = 20;
            let i;
            const legendSize = 10;
            const padding = 5;
            this.labelXCollections = [];
            this.labelYCollections = [];
            this.legendXCollections = [];
            this.legendYCollections = [];
            for (i = 0; i < heatMap.colorCollection.length; i++) {
                if (heatMap.legendSettings.showLabel) {
                    const text = this.labelCollections[i];
                    size = measureText(heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text, heatMap.legendSettings.textStyle).width;
                }
                labelX = legendX + legendSize + padding;
                labelY = legendY + padding;
                const maxWidth = heatMap.legendSettings.showLabel ? labelX + size : legendX + this.legendSize + this.listInterval;
                if (i !== 0 && maxWidth > this.legendGroup.width + this.legendGroup.x - this.listInterval) {
                    division += 1;
                    legendX = rect.x;
                    legendY = rect.y + (division * interval);
                    labelX = legendX + legendSize + padding;
                    labelY = legendY + padding;
                    if (division % (this.listPerPage) === 0) {
                        this.lastList.push(i);
                        legendY = rect.y;
                        labelY = legendY + padding;
                        division = 0;
                    }
                }
                this.labelXCollections.push(labelX);
                this.labelYCollections.push(labelY);
                this.legendXCollections.push(legendX);
                this.legendYCollections.push(legendY);
                legendX = legendX + this.legendSize + this.labelPadding + size + this.listInterval;
            }
            this.lastList.push(i);
            this.numberOfPages = this.lastList.length;
        }
    }
    renderListLegendMode(rect, translate) {
        const heatMap = this.heatMap;
        const legendSize = 10;
        const tempBorder = {
            color: 'transparent', width: 0
        };
        const padding = 5; // padding for legend label from top
        this.legendLabelTooltip = [];
        let listRect;
        let size = new Size(0, 0);
        let labelX = 0;
        let labelY = 0;
        let legendX = rect.x;
        let legendY = rect.y;
        if (translate) {
            this.renderPagingElements();
        }
        let x;
        let y;
        const textWrapWidth = heatMap.legendSettings.title.text ? this.width - (2 * (this.legendSize + this.labelPadding)) :
            this.legendGroup.width - (this.legendSize + this.legendRectPadding + this.labelPadding);
        if (!heatMap.horizontalGradient) {
            x = (this.currentPage * (this.listPerPage)) - (this.listPerPage);
            y = x + this.listPerPage;
            y = y < heatMap.colorCollection.length ? y : heatMap.colorCollection.length;
        }
        else {
            x = this.currentPage === 1 ? 0 : this.lastList[this.currentPage - 2];
            y = this.lastList[this.currentPage - 1];
        }
        for (let i = x; i < y; i++) {
            if (heatMap.legendSettings.showLabel) {
                const text = this.labelCollections[i];
                size = measureText(this.heatMap.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text, heatMap.legendSettings.textStyle);
            }
            const legendElement = this.heatMap.renderer.createGroup({
                id: heatMap.element.id + '_Legend_Index_' + i
            });
            const legendEventArgs = {
                cancel: false, text: this.labelCollection[i], name: 'legendRender'
            };
            if (heatMap.horizontalGradient) {
                legendX = this.legendXCollections[i];
                legendY = this.legendYCollections[i];
                labelX = this.labelXCollections[i];
                labelY = this.labelYCollections[i];
            }
            labelX = legendX + this.legendSize + this.labelPadding;
            labelY = legendY + padding;
            this.heatMap.trigger('legendRender', legendEventArgs);
            if (translate && heatMap.rendering && this.legendRange.length < heatMap.colorCollection.length) {
                const rectPosition = new LegendRange(legendX, legendY, legendSize, legendSize, heatMap.colorCollection[i].value, true, this.currentPage);
                rectPosition.visible = !isNullOrUndefined(this.visibilityCollections[i]) ?
                    this.visibilityCollections[i] : true;
                if (!legendEventArgs.cancel) {
                    this.legendRange.push(rectPosition);
                }
                else {
                    const rectPosition = new LegendRange(legendX, legendY, 0, 0, heatMap.colorCollection[i].value, true, this.currentPage);
                    this.legendRange.push(rectPosition);
                }
                if (heatMap.legendSettings.showLabel) {
                    const textPosition = new LegendRange(labelX, (labelY - size.height / 2), size.width, size.height, heatMap.colorCollection[i].value, true, this.currentPage);
                    textPosition.visible = !isNullOrUndefined(this.visibilityCollections[i]) ?
                        this.visibilityCollections[i] : true;
                    this.legendTextRange.push(textPosition);
                }
            }
            if (!legendEventArgs.cancel) {
                listRect = new Rect(legendX, legendY, legendSize, legendSize);
                const listColor = heatMap.legendOnLoad ? this.heatMap.isColorRange ? heatMap.colorCollection[i].minColor :
                    heatMap.colorCollection[i].color :
                    this.legendRange[i].visible ? this.heatMap.isColorRange ? heatMap.colorCollection[i].minColor :
                        heatMap.colorCollection[i].color : '#D3D3D3';
                const rectItems = new RectOption(heatMap.element.id + '_legend_list' + i, listColor, tempBorder, 1, listRect);
                this.drawSvgCanvas.drawRectangle(rectItems, legendElement);
                if (heatMap.legendSettings.showLabel) {
                    const text = getTitle(this.labelCollections[i], heatMap.legendSettings.textStyle, textWrapWidth);
                    if (text[0].indexOf('...') !== -1 && heatMap.enableCanvasRendering) {
                        this.legendLabelTooltip.push(new CanvasTooltip(this.labelCollections[i], new Rect(labelX, labelY, size.width, size.height)));
                    }
                    const textBasic = new TextBasic(labelX, labelY, 'start', text, 0, 'translate(0,0)', 'middle');
                    const options = new TextOption(heatMap.element.id + '_Legend_Label' + i, textBasic, heatMap.legendSettings.textStyle, heatMap.legendSettings.textStyle.color || heatMap.themeStyle.legendLabel);
                    options.fill = heatMap.legendOnLoad ? options.fill : this.legendRange[i].visible ? options.fill : '#D3D3D3';
                    this.drawSvgCanvas.createText(options, legendElement, text[0]);
                    if (Browser.isIE && !heatMap.enableCanvasRendering) {
                        legendElement.lastChild.setAttribute('dy', '0.6ex');
                    }
                }
                if (heatMap.horizontalGradient) {
                    legendX = legendX + this.legendSize + this.labelPadding + size.width + this.listInterval;
                }
                else {
                    legendY += this.legendSize + this.listInterval;
                }
            }
            const tabindex = this.heatMap.legendSettings.toggleVisibility ? 0 : -1;
            legendElement.setAttribute('tabindex', tabindex.toString());
            legendElement.style.outline = 'none';
            this.translategroup.appendChild(legendElement);
        }
        if (!heatMap.enableCanvasRendering) {
            this.legendGroup.height = this.legendGroup.height > 0 ? this.legendGroup.height : 0;
            this.legendGroup.width = this.legendGroup.width > 0 ? this.legendGroup.width : 0;
            const clippath = heatMap.renderer.createClipPath({ id: heatMap.element.id + '_LegendScale_ClipPath' });
            const clipRect = heatMap.renderer.drawRectangle(this.legendGroup);
            clippath.appendChild(clipRect);
            this.translategroup.appendChild(clippath);
            this.legend.style.cssText = 'clip-path:url(#' + clippath.id + ')';
            this.legendScale.appendChild(this.translategroup);
            heatMap.svgObject.appendChild(this.legend);
        }
    }
    /**
     * @private
     */
    translatePage(heatMap, page, isNext) {
        const padding = 5;
        if ((isNext && page >= 1 && page < this.numberOfPages) || (!isNext && page > 1 && page <= this.numberOfPages)) {
            if (isNext) {
                this.currentPage += 1;
                this.legendRect.y += this.legendRect.height;
            }
            else {
                this.currentPage -= 1;
                this.legendRect.y -= this.legendRect.height;
            }
            if (!heatMap.enableCanvasRendering) {
                this.paginggroup.removeChild(this.paginggroup.firstChild);
                while (this.translategroup.childNodes.length) {
                    this.translategroup.removeChild(this.translategroup.firstChild);
                }
            }
            else {
                const ctxPrimaryCanvas = heatMap.canvasRenderer.ctx;
                const ctxSecondaryCanvas = heatMap.secondaryCanvasRenderer.ctx;
                for (const canvas of [ctxPrimaryCanvas, ctxSecondaryCanvas]) {
                    if (!isNullOrUndefined(canvas)) {
                        canvas.clearRect(this.legendRectScale.x - padding, this.legendRectScale.y - padding, this.legendRectScale.width + padding, this.legendRectScale.height + (2 * padding));
                        canvas.clearRect(this.pagingRect.x, this.pagingRect.y, this.pagingRect.width, this.pagingRect.height);
                    }
                }
            }
            this.renderListLegendMode(this.legendRectScale, true);
        }
        if (heatMap.enableCanvasRendering && heatMap.allowSelection && heatMap.rectSelected) {
            const ctx = heatMap.secondaryCanvasRenderer.ctx;
            const position = heatMap.legendSettings.position;
            const initialRect = heatMap.initialClipRect;
            const rectX = position === 'Right' ? initialRect.x + initialRect.width : 0;
            const rectY = position === 'Bottom' ? initialRect.y + initialRect.height : 0;
            const rectWidth = position === 'Right' ? heatMap.availableSize.width - (initialRect.x +
                initialRect.width) : position === 'Left' ? initialRect.x : heatMap.availableSize.width;
            const rectHeight = position === 'Top' ? initialRect.y : position === 'Bottom' ?
                heatMap.availableSize.height - (initialRect.y + initialRect.height) : heatMap.availableSize.height;
            ctx.save();
            ctx.clearRect(rectX, rectY, rectWidth, rectHeight);
            ctx.restore();
            const oldCanvas = document.getElementById(heatMap.element.id + '_canvas');
            const newCanvas = document.getElementById(heatMap.element.id + '_secondary_canvas');
            const rectImage = oldCanvas.getContext('2d').getImageData(rectX, rectY, rectWidth, rectHeight);
            newCanvas.getContext('2d').putImageData(rectImage, rectX, rectY);
            oldCanvas.style.opacity = '0.3';
        }
    }
    /**
     * To create div container for tooltip which appears on hovering the smart legend.
     *
     * @param heatmap
     * @private
     */
    createTooltipDiv() {
        const element = createElement('div', {
            id: this.heatMap.element.id + 'legendLabelTooltipContainer'
        });
        element.style.cssText = 'position: absolute; pointer-events: none;';
        this.heatMap.element.appendChild(element);
    }
    /**
     * To render tooltip for smart legend.
     *
     * @private
     */
    renderTooltip(currentLegendRect) {
        const heatMap = this.heatMap;
        const tempTooltipText = [currentLegendRect.label];
        let offset = null;
        offset = parseInt(heatMap.legendSettings.textStyle.size, 10) / 2;
        this.tooltipObject = new Tooltip$1({
            offset: offset,
            theme: heatMap.theme,
            content: tempTooltipText,
            location: {
                x: currentLegendRect.x + (currentLegendRect.width / 2),
                y: currentLegendRect.y + (currentLegendRect.height / 2)
            },
            inverted: heatMap.horizontalGradient ? false : true,
            areaBounds: {
                height: this.legendGroup.height + this.legendGroup.y,
                width: this.legendGroup.width + this.legendGroup.x,
                x: heatMap.legendSettings.position === 'Right' ? 0 : this.legendGroup.x,
                y: heatMap.legendSettings.position === 'Top' ? heatMap.titleSettings.text === '' ? this.legendGroup.height -
                    this.legendGroup.y : this.legendGroup.y : 0
            }
        }, '#' + this.heatMap.element.id + 'legendLabelTooltipContainer');
        this.tooltipObject.element.style.visibility = 'visible';
    }
    /**
     * To create tooltip for smart legend.
     *
     * @private
     */
    createTooltip(pageX, pageY) {
        let currentLegendRect;
        for (let i = 0; i < this.heatMap.colorCollection.length; i++) {
            const position = this.legendRectPositionCollection[i];
            if (position && pageX > position.x && pageX < position.width + position.x &&
                pageY > position.y && pageY < position.height + position.y) {
                currentLegendRect = this.legendRectPositionCollection[i];
                break;
            }
        }
        const ele = document.getElementById(this.heatMap.element.id + 'legendLabelTooltipContainer');
        if (ele && ele.style.visibility === 'visible' && this.tooltipObject && !this.heatMap.isTouch) {
            this.tooltipObject.fadeOut();
            ele.style.visibility = 'hidden';
        }
        if (currentLegendRect) {
            this.renderTooltip(currentLegendRect);
        }
    }
    /**
     * Toggle the visibility of cells based on legend selection
     *
     * @private
     */
    legendRangeSelection(index) {
        const heatMap = this.heatMap;
        const legendRange = this.legendRange;
        const padding = 5;
        const legendPadding = heatMap.horizontalGradient ? 10 : 0;
        const legendBound = this.legendRectScale;
        const ctxPrimaryCanvas = heatMap.canvasRenderer.ctx;
        const ctxSecondaryCanvas = heatMap.secondaryCanvasRenderer.ctx;
        heatMap.rangeSelection = true;
        if (heatMap.enableCanvasRendering) {
            if (heatMap.legendSettings.enableSmartLegend) {
                if (!isNullOrUndefined(ctxPrimaryCanvas)) {
                    ctxPrimaryCanvas.clearRect(legendBound.x - padding, legendBound.y - padding, (legendBound.width + this.labelPadding +
                        this.maxLegendLabelSize.width) + padding, legendBound.height + 2 * (padding + legendPadding));
                }
                if (!isNullOrUndefined(ctxSecondaryCanvas)) {
                    ctxSecondaryCanvas.clearRect(legendBound.x - padding, legendBound.y - padding, (legendBound.width + this.labelPadding +
                        this.maxLegendLabelSize.width) + padding, legendBound.height + 2 * (padding + legendPadding));
                }
            }
            else {
                if (!isNullOrUndefined(ctxPrimaryCanvas)) {
                    ctxPrimaryCanvas.clearRect(legendBound.x - padding, legendBound.y - padding, legendBound.width +
                        padding, legendBound.height + (2 * padding));
                }
                if (!isNullOrUndefined(ctxSecondaryCanvas)) {
                    ctxSecondaryCanvas.clearRect(legendBound.x - padding, legendBound.y - padding, legendBound.width +
                        padding, legendBound.height + (2 * padding));
                }
            }
        }
        else {
            if (heatMap.legendSettings.enableSmartLegend) {
                while (this.legend && this.legend.childNodes.length) {
                    this.legend.removeChild(this.legend.firstChild);
                }
            }
            else {
                while (this.translategroup && this.translategroup.childNodes.length) {
                    this.translategroup.removeChild(this.translategroup.firstChild);
                }
            }
            removeElement(heatMap.heatMapSeries.containerRectObject.id);
            if (heatMap.cellSettings.showLabel) {
                removeElement(heatMap.heatMapSeries.containerTextObject.id);
            }
        }
        if (heatMap.legendSettings.enableSmartLegend) {
            if (heatMap.colorCollection.length !== heatMap.legendColorCollection.length) {
                if (index === heatMap.legendColorCollection.length - 1) {
                    heatMap.toggleValue[index - 1].visible = this.visibilityCollections[index - 1] =
                        legendRange[index - 1].visible = !legendRange[index].visible;
                }
                else {
                    if (index === heatMap.colorCollection.length - 1) {
                        heatMap.toggleValue[index + 1].visible = this.visibilityCollections[index + 1] =
                            legendRange[index + 1].visible = !legendRange[index].visible;
                    }
                }
            }
        }
        heatMap.toggleValue[index].visible = this.visibilityCollections[index] =
            legendRange[index].visible = !legendRange[index].visible;
        heatMap.legendOnLoad = false;
        if (heatMap.legendSettings.enableSmartLegend) {
            this.renderSmartLegend();
            const rectItemsSvg = new Rect(legendBound.x, legendBound.y, legendBound.width, legendBound.height);
            this.renderLegendLabel(rectItemsSvg);
            if (heatMap.enableCanvasRendering) {
                ctxPrimaryCanvas.save();
                ctxPrimaryCanvas.clip();
            }
            if (heatMap.renderingMode === 'SVG') {
                this.renderTitle(rectItemsSvg);
            }
        }
        else {
            this.renderListLegendMode(this.legendRectScale, false);
        }
        if (heatMap.enableCanvasRendering) {
            ctxPrimaryCanvas.restore();
        }
        heatMap.heatMapSeries.renderRectSeries();
        heatMap.clearSelection();
        if (heatMap.enableCanvasRendering && heatMap.allowSelection) ;
    }
    /**
     * update visibility collections of legend and series
     *
     * @private
     */
    updateLegendRangeCollections() {
        const heatMap = this.heatMap;
        heatMap.rangeSelection = !heatMap.legendOnLoad ? true : false;
        this.visibilityCollections = !heatMap.legendOnLoad ? this.visibilityCollections : [];
        heatMap.toggleValue = !heatMap.legendOnLoad ? heatMap.toggleValue : [];
        this.legendRange = !heatMap.legendOnLoad ? this.legendRange : [];
        this.legendTextRange = !heatMap.legendOnLoad ? this.legendTextRange : [];
    }
}

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the adaptor in the heatmap.
 */
class Data extends ChildProperty {
}
__decorate$6([
    Property(false)
], Data.prototype, "isJsonData", void 0);
__decorate$6([
    Property('None')
], Data.prototype, "adaptorType", void 0);
__decorate$6([
    Property('')
], Data.prototype, "xDataMapping", void 0);
__decorate$6([
    Property('')
], Data.prototype, "yDataMapping", void 0);
__decorate$6([
    Property('')
], Data.prototype, "valueMapping", void 0);
__decorate$6([
    Complex({}, BubbleData)
], Data.prototype, "bubbleDataMapping", void 0);
class AdaptiveMinMax {
}
/**
 *
 * The `Adaptor` module is used to handle JSON and Table data.
 */
class Adaptor {
    constructor(heatMap) {
        this.reconstructedXAxis = [];
        this.reconstructedYAxis = [];
        this.adaptiveXMinMax = new AdaptiveMinMax();
        this.adaptiveYMinMax = new AdaptiveMinMax();
        this.heatMap = heatMap;
    }
    /**
     * Method to construct Two Dimentional Datasource.
     *
     * @returns {void}
     * @private
     */
    constructDatasource(dataSource, dataSourceSettings) {
        if (dataSourceSettings.adaptorType === 'Cell') {
            const xAxis = this.heatMap.xAxis;
            const yAxis = this.heatMap.yAxis;
            this.adaptiveXMinMax.min = xAxis.minimum;
            this.adaptiveXMinMax.max = xAxis.maximum;
            this.adaptiveYMinMax.min = yAxis.minimum;
            this.adaptiveYMinMax.max = yAxis.maximum;
            if (((xAxis.valueType === 'Numeric' || xAxis.valueType === 'DateTime') &&
                (isNullOrUndefined(xAxis.minimum) || isNullOrUndefined(xAxis.maximum))) ||
                ((yAxis.valueType === 'Numeric' || yAxis.valueType === 'DateTime') &&
                    (isNullOrUndefined(yAxis.minimum) || isNullOrUndefined(yAxis.maximum)))) {
                this.getMinMaxValue(dataSource, dataSourceSettings, xAxis, yAxis);
            }
            this.heatMap.isCellData = true;
        }
        if (dataSourceSettings.adaptorType === 'None') {
            this.heatMap.completeAdaptDataSource = dataSource;
        }
        else if (!dataSourceSettings.isJsonData && dataSourceSettings.adaptorType === 'Table') {
            this.heatMap.completeAdaptDataSource = dataSource;
        }
        else if (dataSourceSettings.isJsonData && dataSourceSettings.adaptorType === 'Table') {
            this.heatMap.completeAdaptDataSource = this.processJsonTableData(dataSource, dataSourceSettings);
        }
        else if (dataSourceSettings.isJsonData && dataSourceSettings.adaptorType === 'Cell') {
            this.heatMap.completeAdaptDataSource = this.processJsonCellData(dataSource, dataSourceSettings);
        }
        else if (!dataSourceSettings.isJsonData && dataSourceSettings.adaptorType === 'Cell') {
            this.constructAdaptiveAxis();
            this.heatMap.completeAdaptDataSource = this.processCellData(dataSource);
            this.heatMap.isCellData = true;
        }
    }
    /**
     * Method to construct Axis Collection.
     *
     * @returns {void}
     * @private
     */
    constructAdaptiveAxis() {
        const xAxis = this.heatMap.xAxis;
        const yAxis = this.heatMap.yAxis;
        if (xAxis.valueType === 'Numeric') {
            this.reconstructedXAxis = this.getNumericAxisCollection(this.adaptiveXMinMax.min, this.adaptiveXMinMax.max, xAxis.increment);
        }
        if (yAxis.valueType === 'Numeric') {
            this.reconstructedYAxis = this.getNumericAxisCollection(this.adaptiveYMinMax.min, this.adaptiveYMinMax.max, yAxis.increment);
        }
        if (xAxis.valueType === 'DateTime') {
            this.reconstructedXAxis = this.getDateAxisCollection(this.adaptiveXMinMax.min, this.adaptiveXMinMax.max, xAxis.intervalType, xAxis.increment);
        }
        if (yAxis.valueType === 'DateTime') {
            this.reconstructedYAxis = this.getDateAxisCollection(this.adaptiveYMinMax.min, this.adaptiveYMinMax.max, yAxis.intervalType, yAxis.increment);
        }
    }
    /**
     * Method to calculate Numeric Axis Collection.
     *
     * @returns {string[]}
     * @private
     */
    getNumericAxisCollection(min, max, increment) {
        let loopIndex = min;
        const tempAxisColl = [];
        while (loopIndex <= max) {
            tempAxisColl.push(loopIndex.toString());
            loopIndex = loopIndex + increment;
        }
        return tempAxisColl;
    }
    /**
     * Method to calculate DateTime Axis Collection.
     *
     * @returns {string[]}
     * @private
     */
    getDateAxisCollection(min, max, intervalType, increment) {
        const option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        const dateParser = this.heatMap.intl.getDateParser(option);
        const dateFormatter = this.heatMap.intl.getDateFormat(option);
        min = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: min }).val))));
        let tempInterval = min;
        const tempAxisColl = [];
        while (tempInterval <= max) {
            tempAxisColl.push(new Date(tempInterval).toString());
            tempInterval = increaseDateTimeInterval(tempInterval, 1, intervalType, increment).getTime();
        }
        return tempAxisColl;
    }
    /**
     * Method to calculate Maximum and Minimum Value from datasource.
     *
     * @returns {void}
     * @private
     */
    getMinMaxValue(dataSource, adapData, xAxis, yAxis) {
        const data = dataSource;
        const label = Object.keys(data[0]);
        if (data.length > 0) {
            this.adaptiveXMinMax.min = !isNullOrUndefined(xAxis.minimum) ? xAxis.minimum : adapData.isJsonData ?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[0][label[0]] : data[0][0];
            this.adaptiveYMinMax.min = !isNullOrUndefined(yAxis.minimum) ? yAxis.minimum : adapData.isJsonData ?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[0][label[1]] : data[0][1];
            this.adaptiveXMinMax.max = !isNullOrUndefined(xAxis.maximum) ? xAxis.maximum : adapData.isJsonData ?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[0][label[0]] : data[0][0];
            this.adaptiveYMinMax.max = !isNullOrUndefined(yAxis.maximum) ? yAxis.maximum : adapData.isJsonData ?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[0][label[1]] : data[0][1];
        }
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xDataIndex = adapData.isJsonData ? data[dataIndex][label[0]] : data[dataIndex][0];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const yDataIndex = adapData.isJsonData ? data[dataIndex][label[1]] : data[dataIndex][1];
            if (xDataIndex < this.adaptiveXMinMax.min && isNullOrUndefined(xAxis.minimum)) {
                this.adaptiveXMinMax.min = xDataIndex;
            }
            if (xDataIndex > this.adaptiveXMinMax.max && isNullOrUndefined(xAxis.maximum)) {
                this.adaptiveXMinMax.max = xDataIndex;
            }
            if (yDataIndex < this.adaptiveYMinMax.min && isNullOrUndefined(yAxis.minimum)) {
                this.adaptiveYMinMax.min = yDataIndex;
            }
            if (yDataIndex > this.adaptiveYMinMax.max && isNullOrUndefined(yAxis.maximum)) {
                this.adaptiveYMinMax.max = yDataIndex;
            }
        }
    }
    /**
     * Method to process Cell datasource.
     *
     * @returns {Object}
     * @private
     */
    processCellData(dataSource) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempDataCollection = dataSource;
        const xLabels = this.reconstructedXAxis;
        const yLabels = this.reconstructedYAxis;
        let currentDataXIndex = 0;
        let currentDataYIndex = 0;
        this.reconstructData = [];
        if (tempDataCollection && tempDataCollection.length) {
            for (let xindex = 0; xindex < tempDataCollection.length; xindex++) {
                if (this.heatMap.xAxis.valueType === 'Category') {
                    currentDataXIndex = tempDataCollection[xindex][0];
                }
                else {
                    currentDataXIndex = xLabels.indexOf(tempDataCollection[xindex][0].toString());
                }
                if (currentDataXIndex > -1) {
                    while (!this.reconstructData[currentDataXIndex]) {
                        this.reconstructData.push([]);
                    }
                    if (this.heatMap.yAxis.valueType === 'Category') {
                        currentDataYIndex = tempDataCollection[xindex][1];
                    }
                    else {
                        currentDataYIndex = yLabels.indexOf(tempDataCollection[xindex][1].toString());
                    }
                    if (currentDataYIndex !== -1) {
                        while (this.reconstructData[currentDataXIndex][currentDataYIndex] !== '') {
                            this.reconstructData[currentDataXIndex].push('');
                        }
                        this.reconstructData[currentDataXIndex][currentDataYIndex] =
                            isNullOrUndefined(tempDataCollection[xindex][2]) ?
                                '' : tempDataCollection[xindex][2];
                    }
                }
            }
        }
        return this.reconstructData;
    }
    /**
     * Method to process JSON Cell datasource.
     *
     * @returns {Object}
     * @private
     */
    processJsonCellData(dataSource, adaptordata) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempDataCollection = dataSource;
        const xAxisLabels = this.heatMap.xAxis.labels ? this.heatMap.xAxis.labels : [];
        const yAxisLabels = this.heatMap.yAxis.labels ? this.heatMap.yAxis.labels : [];
        const axisCollections = this.heatMap.axisCollections;
        if (xAxisLabels.length === 0 || yAxisLabels.length === 0) {
            this.generateAxisLabels(dataSource, adaptordata);
        }
        const xLabels = (this.heatMap.xAxis.valueType === 'Category') ? (xAxisLabels.length > 0 ?
            this.heatMap.xAxis.labels : axisCollections[0].jsonCellLabel) : axisCollections[0].labelValue;
        const yLabels = (this.heatMap.yAxis.valueType === 'Category') ? (yAxisLabels.length > 0 ?
            this.heatMap.yAxis.labels : axisCollections[1].jsonCellLabel) : axisCollections[1].labelValue;
        let currentDataXIndex = 0;
        let currentDataYIndex = 0;
        if (tempDataCollection.length) {
            this.reconstructData = [];
            for (let index = 0; index < tempDataCollection.length; index++) {
                currentDataXIndex = this.getSplitDataValue(tempDataCollection[index], adaptordata, xLabels, !isNullOrUndefined(adaptordata.xDataMapping) ?
                    adaptordata.xDataMapping.split('.') : null, this.heatMap.xAxis.valueType);
                if (currentDataXIndex !== -1) {
                    while (!this.reconstructData[currentDataXIndex]) {
                        this.reconstructData.push([]);
                    }
                    currentDataYIndex = this.getSplitDataValue(tempDataCollection[index], adaptordata, yLabels, !isNullOrUndefined(adaptordata.yDataMapping) ?
                        adaptordata.yDataMapping.split('.') : null, this.heatMap.yAxis.valueType);
                    if (currentDataYIndex !== -1) {
                        while (isNullOrUndefined(this.reconstructData[currentDataXIndex][currentDataYIndex])) {
                            this.reconstructData[currentDataXIndex].push('');
                        }
                        if (this.heatMap.bubbleSizeWithColor) {
                            this.reconstructData[currentDataXIndex][currentDataYIndex] = [
                                this.getSplitDataValue(tempDataCollection[index], adaptordata, null, adaptordata.bubbleDataMapping.size.split('.'), ''),
                                this.getSplitDataValue(tempDataCollection[index], adaptordata, null, adaptordata.bubbleDataMapping.color.split('.'), '')
                            ];
                        }
                        else {
                            this.reconstructData[currentDataXIndex][currentDataYIndex] = this.getSplitDataValue(tempDataCollection[index], adaptordata, null, !isNullOrUndefined(adaptordata.valueMapping) ?
                                adaptordata.valueMapping.split('.') : null, '');
                        }
                    }
                }
            }
        }
        return this.reconstructData;
    }
    /**
     * Method to generate axis labels when labels are not given.
     *
     * @returns {string}
     * @private
     */
    generateAxisLabels(dataSource, adaptordata) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempDataCollection = dataSource;
        const xLabels = this.heatMap.xAxis.labels ? this.heatMap.xAxis.labels : [];
        const yLabels = this.heatMap.yAxis.labels ? this.heatMap.yAxis.labels : [];
        const hasXLabels = xLabels.length > 0 ? true : false;
        const hasYLabels = yLabels.length > 0 ? true : false;
        const axisCollection = this.heatMap.axisCollections;
        for (let index = 0; index < axisCollection.length; index++) {
            const valueType = axisCollection[index].valueType;
            const axis = axisCollection[index];
            if (valueType === 'Category') {
                let hasLabels;
                let dataMapping;
                let labels;
                if (axis.orientation === 'Horizontal') {
                    hasLabels = hasXLabels;
                    dataMapping = adaptordata.xDataMapping;
                    axis.jsonCellLabel = labels = [];
                }
                else {
                    hasLabels = hasYLabels;
                    dataMapping = adaptordata.yDataMapping;
                    axis.jsonCellLabel = labels = [];
                }
                if (!hasLabels) {
                    for (let i = 0; i < tempDataCollection.length; i++) {
                        if (dataMapping in tempDataCollection[i]) {
                            const xValue = tempDataCollection[i][dataMapping].toString();
                            if (labels.indexOf(xValue.toString()) === -1) {
                                labels.push(xValue);
                            }
                        }
                    }
                }
            }
            else if (valueType === 'DateTime') {
                axis.clearAxisLabel();
                axis.calculateDateTimeAxisLabel(this.heatMap);
            }
            else {
                axis.clearAxisLabel();
                axis.calculateNumericAxisLabels(this.heatMap);
            }
        }
    }
    /**
     * Method to get data from complex mapping.
     *
     * @returns {number|string}
     * @private
     */
    getSplitDataValue(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tempSplitDataCollection, adaptordata, labels, tempSplitData, valueType) {
        let value = -1;
        const option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        const dateParser = this.heatMap.intl.getDateParser(option);
        const dateFormatter = this.heatMap.intl.getDateFormat(option);
        this.tempSplitDataCollection = tempSplitDataCollection;
        for (let splitIndex = 0; splitIndex < (!isNullOrUndefined(tempSplitData) ? tempSplitData.length : 0); splitIndex++) {
            value = !isNullOrUndefined(labels) ? (!(valueType === 'DateTime') ?
                labels.indexOf(this.tempSplitDataCollection[tempSplitData[splitIndex]]) :
                ((typeof this.tempSplitDataCollection[tempSplitData[splitIndex]] === 'string' ||
                    typeof this.tempSplitDataCollection[tempSplitData[splitIndex]] === 'object') ?
                    labels.map(Number).indexOf(Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: this.tempSplitDataCollection[tempSplitData[splitIndex]] }).val))))) :
                    // eslint-disable-next-line max-len
                    labels.map(Number).indexOf(+new Date(this.tempSplitDataCollection[tempSplitData[splitIndex]]).setHours(0, 0, 0, 0)))) : null;
            if (!isNullOrUndefined(this.tempSplitDataCollection)) {
                this.tempSplitDataCollection = value !== -1 && !isNullOrUndefined(labels) ?
                    this.tempSplitDataCollection : this.tempSplitDataCollection[tempSplitData[splitIndex]];
            }
            if (isNullOrUndefined(this.tempSplitDataCollection)) {
                break;
            }
        }
        value = !isNullOrUndefined(labels) ? value : isNullOrUndefined(this.tempSplitDataCollection) ||
            this.tempSplitDataCollection.toString() === '' ? '' : parseFloat(this.tempSplitDataCollection.toString());
        return value;
    }
    /**
     * Method to process JSON Table datasource.
     *
     * @returns {Object}
     * @private
     */
    processJsonTableData(dataSource, adaptordata) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempDataCollection = dataSource;
        let currentDataXIndex = 0;
        let currentDataYIndex = 0;
        const xLabels = this.heatMap.xAxis.labels ? this.heatMap.xAxis.labels : [];
        const yLabels = this.heatMap.yAxis.labels ? this.heatMap.yAxis.labels : [];
        let key;
        if (tempDataCollection.length) {
            this.reconstructData = [];
            for (let xindex = 0; xindex < tempDataCollection.length; xindex++) {
                currentDataXIndex = this.getSplitDataValue(tempDataCollection[xindex], adaptordata, xLabels, !isNullOrUndefined(adaptordata.xDataMapping) ?
                    adaptordata.xDataMapping.split('.') : null, this.heatMap.xAxis.valueType);
                if (currentDataXIndex !== -1) {
                    while (!this.reconstructData[currentDataXIndex]) {
                        this.reconstructData.push([]);
                    }
                    for (let index = 0; index < Object.keys(this.tempSplitDataCollection).length; index++) {
                        key = Object.keys(this.tempSplitDataCollection)[index];
                        currentDataYIndex = key !== adaptordata.xDataMapping ? yLabels.indexOf(key) : -1;
                        if (currentDataYIndex !== -1) {
                            while (isNullOrUndefined(this.reconstructData[currentDataXIndex][currentDataYIndex])) {
                                this.reconstructData[currentDataXIndex].push('');
                            }
                            this.reconstructData[currentDataXIndex][currentDataYIndex] =
                                isNullOrUndefined(this.tempSplitDataCollection[key]) ?
                                    '' : this.tempSplitDataCollection[key];
                        }
                    }
                }
            }
        }
        return this.reconstructData;
    }
    /**
     * To destroy the Adaptor.
     *
     * @returns {void}
     * @private
     */
    destroy() {
        this.reconstructData = null;
        this.reconstructedXAxis = null;
        this.reconstructedYAxis = null;
        this.adaptiveXMinMax = null;
        this.adaptiveYMinMax = null;
        this.tempSplitDataCollection = null;
        this.heatMap = null;
    }
    /**
     * To get Module name
     */
    getModuleName() {
        return 'Adaptor';
    }
}

class ExportUtils {
    /**
     * Constructor for Heatmap
     *
     * @param  {HeatMap} control - specifies the control
     *
     */
    constructor(control) {
        this.control = control;
    }
    /**
     * To export the file as image/svg format
     *
     * @param type
     * @param fileName
     * @private
     */
    export(type, fileName, orientation) {
        const controlValue = this.getControlsValue();
        const width = controlValue.width;
        const height = controlValue.height;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let element = this.control.svgObject;
        let url;
        const isCanvas = this.control.enableCanvasRendering;
        let image;
        if (!isCanvas) {
            element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': width.toString(),
                    'height': height.toString()
                }
            });
        }
        const isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
        orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
        const svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
            controlValue.svg.outerHTML +
            '</svg>';
        if (!isCanvas) {
            const exportElement = this.control.svgObject.cloneNode(true);
            const backgroundElement = exportElement.childNodes[0];
            const backgroundColor = backgroundElement.getAttribute('fill');
            if ((this.control.theme === 'Tailwind' || this.control.theme === 'Tailwind3' || this.control.theme === 'Bootstrap5' || this.control.theme === 'Fluent' || this.control.theme === 'Material3' || this.control.theme === 'Fluent2')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((this.control.theme === 'TailwindDark' || this.control.theme === 'Tailwind3Dark' || this.control.theme === 'Bootstrap5Dark' || this.control.theme === 'FluentDark' || this.control.theme === 'Material3Dark' ||
                this.control.theme === 'Fluent2Dark' || this.control.theme === 'Fluent2HighContrast')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                backgroundElement.setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
        }
        else {
            url = element.toDataURL('image/png');
        }
        if (type === 'SVG') {
            if (Browser.info.name === 'msie') {
                const svg = new Blob([(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'application/octet-stream' });
                if (!isNullOrUndefined(window.navigator.msSaveOrOpenBlob)) {
                    window.navigator.msSaveOrOpenBlob(svg, fileName + '.' + type.toLocaleLowerCase());
                }
            }
            else {
                this.triggerDownload(fileName, type, url, isDownload);
            }
        }
        else if (Browser.info.name === 'msie') {
            let canvas = element;
            if (!isCanvas) {
                canvas = this.createCanvas();
            }
            image = canvas.toDataURL(type);
            if (type === 'PDF') {
                this.exportPdf(canvas, orientation, width, height, isDownload, fileName);
            }
            else {
                this.doExport(type, image, fileName);
            }
        }
        else {
            const image = new Image();
            const ctx = element.getContext('2d');
            const backgroundColor = ctx.shadowColor;
            image.onload = (() => {
                if ((this.control.theme === 'Tailwind' || this.control.theme === 'Tailwind3' || this.control.theme === 'Bootstrap5'
                    || this.control.theme === 'Fluent' || this.control.theme === 'Material3' || this.control.theme === 'Fluent2')
                    && (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent')) {
                    ctx.fillStyle = 'rgba(255,255,255, 1)';
                }
                else if ((this.control.theme === 'TailwindDark' || this.control.theme === 'Tailwind3Dark' ||
                    this.control.theme === 'Bootstrap5Dark' || this.control.theme === 'FluentDark' || this.control.theme === 'Material3Dark'
                    || this.control.theme === 'Fluent2Dark' || this.control.theme === 'Fluent2HighContrast')
                    && (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent')) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                }
                ctx.fillRect(0, 0, element.width, element.height);
                ctx.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                if (type === 'PDF') {
                    this.exportPdf(element, orientation, width, height, isDownload, fileName);
                }
                else {
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(element.msToBlob(), fileName + '.' + type.toLocaleLowerCase());
                    }
                    else {
                        this.triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                }
            });
            image.src = url;
        }
        if (!isCanvas) {
            const id = document.getElementById(this.control.element.id);
            removeElement(id + '_canvas');
        }
    }
    /**
     * To trigger the download element
     *
     * @param fileName
     * @param type
     * @param url
     * @private
     */
    triggerDownload(fileName, type, url, isDownload) {
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
    }
    /**
     * To get the maximum size value
     *
     * @param controls
     * @param name
     */
    getControlsValue() {
        let width = 0;
        let height = 0;
        const isCanvas = this.control.enableCanvasRendering;
        const svgObject = new SvgRenderer('').createSvg({
            id: 'Svg_Export_Element',
            width: 200, height: 200
        });
        const svg = this.control.svgObject.cloneNode(true);
        const groupEle = this.control.renderer.createGroup({});
        groupEle.style.cssText = 'transform: translateY(' + height + 'px)';
        if (!isCanvas) {
            groupEle.appendChild(svg);
        }
        width = Math.max(this.control.availableSize.width, width);
        height = height + this.control.availableSize.height;
        if (!isCanvas) {
            svgObject.appendChild(groupEle);
        }
        if (!isCanvas) {
            svgObject.setAttribute('width', width + '');
            svgObject.setAttribute('height', height + '');
        }
        return {
            'width': width,
            'height': height,
            'svg': svgObject
        };
    }
    createCanvas() {
        const heatmap = this.control;
        const renderMode = heatmap.renderingMode;
        heatmap.renderingMode = 'Canvas';
        heatmap.refresh();
        const canvas = heatmap.svgObject;
        heatmap.renderingMode = renderMode;
        heatmap.refresh();
        return canvas;
    }
    exportPdf(element, orientation, width, height, isDownload, fileName) {
        const document = new PdfDocument();
        const margin = document.pageSettings.margins;
        const pdfDefaultWidth = document.pageSettings.width;
        const pdfDefaultHeight = document.pageSettings.height;
        let imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        document.pageSettings.orientation = orientation;
        const exactWidth = (pdfDefaultWidth < width) ? (width + margin.left + margin.right) : pdfDefaultWidth;
        const exactHeight = (pdfDefaultHeight < height) ? (height + margin.top + margin.bottom) : pdfDefaultHeight;
        document.pageSettings.size = new SizeF(exactWidth, exactHeight);
        imageString = imageString.slice(imageString.indexOf(',') + 1);
        document.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, width, height);
        if (isDownload) {
            document.save(fileName + '.pdf');
            document.destroy();
        }
    }
    doExport(type, image, fileName) {
        let images = [];
        const fileType = type || 'JPG';
        images = [image];
        this.exportImage(images, fileName, fileType, image);
    }
    exportImage(images, fileName, fileType, image) {
        const buffers = [];
        const length = (!(images instanceof HTMLElement)) ? images.length : 0;
        for (let g = 0; g < length; g++) {
            image = images[g];
            image = image.replace(/^data:[a-z]*;,/, '');
            const image1 = image.split(',');
            const byteString = atob(image1[1]);
            const buffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(buffer);
            for (let i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            buffers.push(buffer);
        }
        for (let j = 0; j < buffers.length; j++) {
            const b = new Blob([buffers[j]], { type: 'application/octet-stream' });
            if (Browser.info.name === 'msie' && !isNullOrUndefined(window.navigator.msSaveOrOpenBlob)) {
                window.navigator.msSaveOrOpenBlob(b, fileName + '.' + fileType.toLocaleLowerCase());
            }
        }
    }
    /**
     * To print the heatmap elements.
     *
     * @param elements
     * @private
     */
    print() {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        if (this.control.renderingMode === 'SVG') {
            print(this.getHTMLContent(), this.printWindow);
        }
        else {
            const element = this.control.svgObject;
            const dataUrl = element.toDataURL();
            const image = new Image();
            const ctx = element.getContext('2d');
            image.onload = (() => {
                ctx.drawImage(image, 0, 0);
            });
            image.src = dataUrl;
            print(image, this.printWindow);
        }
    }
    /**
     * To get the html string of the heatmap.
     *
     * @param elements
     * @private
     */
    getHTMLContent() {
        const div = createElement('div');
        div.appendChild(this.control.element.cloneNode(true));
        return div;
    }
}

/**
 * Heat Map Component
 */
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the heatmap control. This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```html
 * <div id="container"/>
 * <script>
 *   var heatmapObj = new HeatMap();
 *   heatmapObj.appendTo("#container");
 * </script>
 * ```
 */
let HeatMap = class HeatMap extends Component {
    /**
     * Represents the heatmap control. This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
     * ```html
     * <div id="container"/>
     * <script>
     *   var heatmapObj = new HeatMap();
     *   heatmapObj.appendTo("#container");
     * </script>
     * ```
     */
    constructor() {
        /**
         * Sets and gets the width of the heatmap. The width of the heatmap accepts pixel or percentage values given in string format.
         *
         * If specified as '100%, heatmap renders to the full width of its parent element.
         *
         * @default null
         */
        super(...arguments);
        /** @private */
        this.enableCanvasRendering = false;
        /** @private */
        this.isColorRange = false;
        /** @private */
        this.isCellTapHold = false;
        /** @private */
        this.selectedCellCount = 0;
        /** @private */
        this.toggleValue = [];
        /** @private */
        this.legendOnLoad = true;
        /** @private */
        this.resizing = false;
        /** @private */
        this.rendering = true;
        /** @private */
        this.multiSelection = false;
        /** @private */
        this.rectSelected = false;
        /** @private */
        this.previousSelectedCellsRect = [];
        /** @private */
        this.multiCellCollection = [];
        /** @private */
        this.selectedMultiCellCollection = [];
        /** @private */
        this.tempMultiCellCollection = [];
        /**
         * @private
         */
        this.tooltipCollection = [];
        /**
         * @private
         */
        this.isCellData = false;
    }
    preRender() {
        this.initPrivateVariable();
        this.unWireEvents();
        this.wireEvents();
    }
    /**
     * This method is used to perform the export functionality for the heatmap.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the file name for the exported file.
     * @param {PdfPageOrientation} orientation - Specifies the orientation for the exported PDF document.
     */
    export(type, fileName, orientation) {
        const exportMap = new ExportUtils(this);
        exportMap.export(type, fileName, orientation);
    }
    initPrivateVariable() {
        this.renderer = new SvgRenderer(this.element.id);
        this.canvasRenderer = new CanvasRenderer(this.element.id);
        this.secondaryCanvasRenderer = new CanvasRenderer(this.element.id + '_secondary');
        this.heatMapAxis = new AxisHelper(this);
        this.heatMapSeries = new Series(this);
        this.drawSvgCanvas = new DrawSvgCanvas(this);
        this.twoDimensional = new TwoDimensional(this);
        this.cellColor = new CellColor(this);
        this.tempRectHoverClass = '';
        this.tempTooltipRectId = '';
        this.setCulture();
    }
    /**
     * Method to set culture for heatmap
     */
    setCulture() {
        this.intl = new Internationalization();
    }
    render() {
        this.horizontalGradient = this.legendSettings.position === 'Bottom' || this.legendSettings.position === 'Top';
        this.updateBubbleHelperProperty();
        this.trigger('load', { heatmap: this });
        if (this.theme === 'TailwindDark' || this.theme === 'Tailwind') {
            const textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Inter' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Inter' } } }, true);
        }
        if (this.theme === 'Tailwind3Dark' || this.theme === 'Tailwind3') {
            const textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Inter', fontWeight: '600' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '400' } } }, true);
            this.setProperties({ yAxis: { title: { textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Inter', fontWeight: '400' } } }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Inter', fontWeight: '400' } } }, true);
        }
        if (this.theme === 'Material3' || this.theme === 'Material3Dark') {
            const textSettings = { title: { textStyle: { size: '14px', fontFamily: 'Roboto', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'Roboto', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '16px', fontFamily: 'Roboto' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: 'Roboto', fontWeight: '400' } } }, true);
        }
        if (this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark') {
            const textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } }, textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Segoe UI', fontWeight: '400' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { size: '10px', fontWeight: '400', fontFamily: 'Segoe UI' } } }, true);
        }
        if (this.theme === 'Fluent' || this.theme === 'FluentDark') {
            const textSettings = { title: { textStyle: { size: '12px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif', fontWeight: '500' } }, textStyle: { size: '12px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' } };
            this.setProperties({ titleSettings: { textStyle: { size: '16px', fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif' } } }, true);
        }
        if (this.theme === 'Fluent2' || this.theme === 'Fluent2Dark' || this.theme === 'Fluent2HighContrast') {
            const textSettings = { title: { textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } }, textStyle: { size: '12px', fontFamily: 'Segoe UI', fontWeight: '400' } };
            this.setProperties({ titleSettings: { textStyle: { size: '14px', fontFamily: 'Segoe UI', fontWeight: '600' } } }, true);
            this.setProperties({ legendSettings: textSettings }, true);
            this.setProperties({ xAxis: textSettings }, true);
            this.setProperties({ yAxis: textSettings }, true);
            this.setProperties({ cellSettings: { textStyle: { size: '10px', fontWeight: '400', fontFamily: 'Segoe UI' } } }, true);
        }
        this.initAxis();
        this.processInitData();
        this.setTheme();
        this.calculateMaxLength();
        this.heatMapAxis.calculateVisibleLabels();
        this.twoDimensional.processDataSource(this.completeAdaptDataSource);
        this.createSvg();
        this.cellColor.getColorCollection();
        this.calculateBounds();
        this.renderElements();
        this.appendSvgObject();
        if (this.tooltipModule) {
            this.tooltipModule.showHideTooltip(false);
        }
        this.renderComplete();
    }
    /**
     * To re-calculate the datasource while changing datasource property dynamically.
     *
     * @private
     */
    reRenderDatasource() {
        this.dataSourceMinValue = null;
        this.dataSourceMaxValue = null;
        this.processInitData();
        this.calculateMaxLength();
        this.heatMapAxis.calculateVisibleLabels();
        this.twoDimensional.processDataSource(this.completeAdaptDataSource);
        this.cellColor.getColorCollection();
        this.calculateBounds();
    }
    /**
     * To process datasource property.
     *
     * @private
     */
    processInitData() {
        if (this.adaptorModule) {
            this.adaptorModule.constructDatasource(this.dataSource, this.dataSourceSettings);
        }
        else {
            this.completeAdaptDataSource = this.dataSource;
        }
    }
    /**
     * To set render mode of heatmap as SVG or Canvas.
     *
     * @private
     */
    setRenderMode() {
        if (this.renderingMode === 'Canvas') {
            this.enableCanvasRendering = true;
        }
        else if (this.renderingMode === 'Auto' &&
            (this.axisCollections[0].axisLabelSize * this.axisCollections[1].axisLabelSize) >= 10000) {
            this.enableCanvasRendering = true;
        }
        else {
            this.enableCanvasRendering = false;
        }
    }
    /**
     * To set bubble helper private property.
     *
     * @private
     */
    updateBubbleHelperProperty() {
        if (isNullOrUndefined(this.legendModule) || (this.cellSettings.tileType === 'Bubble' &&
            (this.cellSettings.bubbleType === 'Size' || this.cellSettings.bubbleType === 'Sector'))) {
            this.legendVisibilityByCellType = false;
        }
        else if (this.legendModule && this.legendSettings.visible) {
            this.legendVisibilityByCellType = true;
        }
        if (this.cellSettings.tileType === 'Bubble' && this.cellSettings.bubbleType === 'SizeAndColor') {
            this.bubbleSizeWithColor = true;
        }
        else {
            this.bubbleSizeWithColor = false;
        }
    }
    renderElements() {
        this.tooltipCollection = [];
        this.renderSecondaryElement();
        this.renderBorder();
        this.renderTitle();
        this.heatMapAxis.renderAxes();
        if (this.tooltipModule && this.showTooltip) {
            this.tooltipModule.tooltipObject = null;
            this.tooltipModule.createTooltipDiv(this);
        }
        this.heatMapSeries.renderRectSeries();
        if (this.legendModule && this.legendSettings.visible
            && this.legendVisibilityByCellType) {
            this.legendModule.renderLegendItems();
            if (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                this.legendSettings.labelDisplayType === 'None') {
                this.legendModule.createTooltipDiv();
            }
        }
        removeMeasureElement();
    }
    /**
     * Get component name
     *
     * @private
     */
    getModuleName() {
        return 'heatmap';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData() {
        return '';
    }
    /**
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    onPropertyChanged(newProp, oldProp) {
        let renderer = false;
        let refreshBounds = false;
        let isUpdateSelection = true;
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'renderingMode':
                    this.rendering = false;
                    isUpdateSelection = false;
                    renderer = true;
                    break;
                case 'cellSettings':
                    this.updateBubbleHelperProperty();
                    if (this.legendModule && ((newProp.cellSettings.tileType !== (oldProp.cellSettings
                        !== undefined && oldProp.cellSettings.tileType))
                        || (newProp.cellSettings.bubbleType !== oldProp.cellSettings.bubbleType))) {
                        this.legendOnLoad = true;
                        this.legendModule.updateLegendRangeCollections();
                    }
                    if (this.cellSettings.tileType === 'Bubble') {
                        isUpdateSelection = false;
                    }
                    this.reRenderDatasource();
                    refreshBounds = true;
                    break;
                case 'showTooltip':
                    refreshBounds = true;
                    break;
                case 'dataSource':
                case 'dataSourceSettings':
                    this.isCellData = false;
                    this.paletteCellSelectionUpdation();
                    this.reRenderDatasource();
                    isUpdateSelection = false;
                    renderer = true;
                    break;
                case 'titleSettings':
                case 'width':
                case 'height':
                case 'margin':
                case 'backgroundColor':
                    refreshBounds = true;
                    break;
                case 'legendSettings':
                    this.updateBubbleHelperProperty();
                    if (this.legendModule && this.legendVisibilityByCellType && (((newProp.legendSettings.visible !==
                        (oldProp.legendSettings !== undefined && oldProp.legendSettings.visible)) ||
                        (newProp.legendSettings.enableSmartLegend !== oldProp.legendSettings.enableSmartLegend)))) {
                        this.legendOnLoad = true;
                        this.legendModule.updateLegendRangeCollections();
                    }
                    else {
                        this.legendOnLoad = false;
                    }
                    refreshBounds = true;
                    break;
                case 'yAxis':
                case 'xAxis':
                    this.paletteCellSelectionUpdation();
                    this.reRenderDatasource();
                    isUpdateSelection = false;
                    refreshBounds = true;
                    break;
                case 'paletteSettings':
                    this.paletteCellSelectionUpdation();
                    this.twoDimensional.processDataSource(this.completeAdaptDataSource);
                    this.cellColor.getColorCollection();
                    this.calculateBounds();
                    renderer = true;
                    break;
                case 'theme':
                    this.setTheme();
                    renderer = true;
                    break;
                case 'tooltipSettings':
                    if (this.tooltipModule) {
                        this.tooltipModule.tooltipObject.fill = this.tooltipSettings.fill;
                        this.tooltipModule.tooltipObject.border = this.tooltipSettings.border;
                        this.tooltipModule.tooltipObject.textStyle = this.tooltipSettings.textStyle;
                        this.tooltipModule.tooltipObject.template = this.tooltipSettings.template;
                        this.tooltipModule.tooltipObject.refresh();
                    }
                    break;
            }
        }
        if (!refreshBounds && renderer) {
            this.createSvg();
            this.renderElements();
            this.appendSvgObject();
            this.trigger('created');
            if (!isUpdateSelection) {
                this.clearSelection();
            }
        }
        else if (refreshBounds) {
            this.createSvg();
            this.refreshBound();
            this.appendSvgObject();
            this.trigger('created');
        }
        if (this.allowSelection && this.rectSelected) {
            if (isUpdateSelection) {
                this.updateCellSelection();
            }
            else {
                this.clearSelection();
            }
        }
        this.rendering = true;
    }
    paletteCellSelectionUpdation() {
        this.updateBubbleHelperProperty();
        if (this.legendModule && this.legendVisibilityByCellType) {
            this.legendOnLoad = true;
            this.legendModule.updateLegendRangeCollections();
        }
    }
    /**
     * create svg or canvas element
     *
     * @private
     */
    createSvg() {
        this.removeSvg();
        this.setRenderMode();
        this.calculateSize();
        if (!this.enableCanvasRendering) {
            this.svgObject = this.renderer.createSvg({
                id: this.element.id + '_svg',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
            if (this.cellSettings.border.width.toString() === '0' && this.cellSettings.tileType === 'Rect') {
                this.svgObject.setAttribute('shape-rendering', 'crispEdges');
            }
        }
        else {
            this.svgObject = this.canvasRenderer.createCanvas({
                id: this.element.id + '_canvas',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
            if (this.allowSelection) {
                this.createMultiCellDiv(true);
            }
        }
    }
    /**
     *  To Remove the SVG.
     *
     * @private
     */
    removeSvg() {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
        }
        if (document.getElementById(this.element.id + 'Celltooltipcontainer')) {
            remove(document.getElementById(this.element.id + 'Celltooltipcontainer'));
        }
        if (document.getElementById(this.element.id + 'legendLabelTooltipContainer')) {
            remove(document.getElementById(this.element.id + 'legendLabelTooltipContainer'));
        }
        if (document.getElementById(this.element.id + '_Multi_CellSelection_Canvas')) {
            remove(document.getElementById(this.element.id + '_Multi_CellSelection_Canvas'));
        }
        if (document.getElementById(this.element.id + '_CellSelection_Container')) {
            remove(document.getElementById(this.element.id + '_CellSelection_Container'));
        }
        if (document.getElementById(this.element.id + '_secondary_canvas')) {
            remove(document.getElementById(this.element.id + '_secondary_canvas'));
        }
        if (this.svgObject) {
            const svgElement = document.getElementById(this.svgObject.id);
            if (svgElement) {
                while (this.svgObject.childNodes.length) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                remove(this.svgObject);
            }
        }
    }
    renderSecondaryElement() {
        const tooltipDiv = this.createElement('div');
        tooltipDiv.id = this.element.id + '_Secondary_Element';
        this.element.appendChild(tooltipDiv);
        const divElement = this.createElement('div', {
            id: this.element.id + '_CellSelection_Container'
        });
        divElement.style.cssText = 'position:absolute; z-index: 2 ; top:' + this.initialClipRect.y + 'px' + '; left:' + this.initialClipRect.x + 'px';
        this.element.appendChild(divElement);
    }
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]}
     * @private
     */
    requiredModules() {
        const modules = [];
        if (this.showTooltip) {
            modules.push({
                member: 'Tooltip',
                args: [this],
                name: 'Tooltip'
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this],
                name: 'Legend'
            });
        }
        if (!isNullOrUndefined(this.dataSourceSettings) && ((this.dataSourceSettings.adaptorType === 'Table' && this.dataSourceSettings.isJsonData) || this.dataSourceSettings.adaptorType === 'Cell')) {
            modules.push({
                member: 'Adaptor',
                args: [this],
                name: 'Adaptor'
            });
        }
        return modules;
    }
    /**
     * This method destroys the heatmap. This method removes the events associated with the heatmap and disposes the objects created for rendering and updating the heatmap.
     * {% codeBlock src='heatmap/destroy/index.md' %}{% endcodeBlock %}
     *
     * @function destroy
     * @returns {void}.
     * @member of Heatmap
     */
    destroy() {
        this.unWireEvents();
        this.touchInstance.destroy();
        this.touchInstance = null;
        for (let i = 0; i < this.axisCollections.length; i++) {
            this.axisCollections[i].destroy();
        }
        this.axisCollections = null;
        if (!isNullOrUndefined(this.heatMapSeries)) {
            this.heatMapSeries.destroy();
        }
        this.heatMapSeries = null;
        if (!isNullOrUndefined(this.heatMapAxis)) {
            this.heatMapAxis.destroy();
        }
        this.heatMapAxis = null;
        super.destroy();
        removeMeasureElement();
        if (!isNullOrUndefined(this.twoDimensional)) {
            this.twoDimensional.destroy();
        }
        this.twoDimensional = null;
        this.element.innerHTML = '';
        this.availableSize = null;
        this.elementSize = null;
        this.initialClipRect = null;
        this.element.classList.remove('e-heatmap');
        this.drawSvgCanvas = null;
        this.cellColor = null;
        this.colorCollection = null;
        this.legendColorCollection = null;
        this.clonedDataSource = null;
        this.completeAdaptDataSource = null;
        this.currentRect = null;
        this.dataMax = null;
        this.dataMin = null;
        this.previousRect = null;
        this.selectedCellsRect = null;
        this.canvasSelectedCells = null;
        this.titleRect = null;
        this.tooltipCollection = null;
        this.border = null;
        this.intl = null;
        this.titleCollection = null;
        this.themeStyle = null;
        this.renderer = null;
        this.canvasRenderer = null;
        this.secondaryCanvasRenderer = null;
        this.svgObject = null;
        this.resizeEvent = null;
        this.toggleValue = [];
        this.previousSelectedCellsRect = [];
        this.selectedMultiCellCollection = [];
        this.tempMultiCellCollection = [];
    }
    /**
     * Applies all the pending property changes and render the component again.
     *
     * @function destroy
     * @returns {void}.
     */
    refresh() {
        super.refresh();
        this.element.classList.add('e-heatmap');
    }
    /**
     * Appending svg object to the element
     *
     * @private
     */
    appendSvgObject() {
        this.element.appendChild(this.svgObject);
        if (this.enableCanvasRendering && this.allowSelection) {
            this.createMultiCellDiv(false);
        }
    }
    renderBorder() {
        this.border = {
            width: 0
        };
        const background = !isNullOrUndefined(this.backgroundColor) ? this.backgroundColor : this.themeStyle.background;
        const width = 0;
        const rect = new RectOption(this.element.id + '_HeatmapBorder', background, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
        this.drawSvgCanvas.drawRectangle(rect, this.svgObject);
    }
    calculateSize() {
        const width = stringToNumber(this.width, this.element.offsetWidth) || this.element.offsetWidth || 600;
        const height = stringToNumber(this.height, this.element.offsetHeight) || this.element.offsetHeight || 450;
        this.availableSize = new Size(width, height);
        let alignElement = this.element;
        while (alignElement.parentNode) {
            if (alignElement.tagName === 'BODY') {
                break;
            }
            const align = alignElement.align;
            if (align === 'center') {
                const containerWidth = this.availableSize.width.toString();
                this.element.style.width = containerWidth + 'px';
                this.element.style.margin = '0 auto';
                break;
            }
            alignElement = alignElement.parentElement;
        }
    }
    renderTitle() {
        if (this.titleSettings.text) {
            const titleStyle = this.titleSettings.textStyle;
            const anchor = titleStyle.textAlignment === 'Near' ? 'start' :
                titleStyle.textAlignment === 'Far' ? 'end' : 'middle';
            this.elementSize = measureText(this.titleCollection[0], titleStyle);
            const options = new TextOption(this.element.id + '_HeatmapTitle', new TextBasic(titlePositionX(this.availableSize.width - this.margin.left - this.margin.right, this.margin.left, this.margin.right, titleStyle), this.margin.top + ((this.elementSize.height) * 3 / 4), anchor, this.titleCollection), titleStyle, titleStyle.color || this.themeStyle.heatMapTitle);
            if (this.titleCollection.length > 1) {
                this.drawSvgCanvas.createWrapText(options, titleStyle, this.svgObject);
            }
            else {
                this.drawSvgCanvas.createText(options, this.svgObject, this.titleCollection[0]);
                if (this.titleCollection[0].indexOf('...') !== -1 && this.enableCanvasRendering) {
                    this.tooltipCollection.push(new CanvasTooltip(this.titleSettings.text, new Rect(this.margin.left, this.margin.top, this.elementSize.width, this.elementSize.height)));
                }
            }
        }
    }
    titleTooltip(event, x, y, isTouch) {
        const targetId = event.target.id;
        if ((targetId === (this.element.id + '_HeatmapTitle')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, x, y, this.element.offsetWidth, this.element.id + '_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch, this);
        }
        else {
            removeElement(this.element.id + '_Title_Tooltip');
        }
    }
    // eslint-disable-next-line
    axisTooltip(event, x, y, isTouch) {
        const targetId = event.target.id;
        if ((targetId.indexOf(this.element.id + '_XAxis_Label') !== -1) ||
            (targetId.indexOf(this.element.id + '_YAxis_Label') !== -1) ||
            (targetId.indexOf(this.element.id + '_XAxis_MultiLevel') !== -1) ||
            (targetId.indexOf(this.element.id + '_YAxis_MultiLevel') !== -1)) {
            const tooltipText = getTooltipText(this.tooltipCollection, x, y);
            if (tooltipText) {
                showTooltip(tooltipText, x, y, this.element.offsetWidth, this.element.id + '_axis_Tooltip', getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
            }
            else {
                removeElement(this.element.id + '_axis_Tooltip');
            }
        }
        else {
            removeElement(this.element.id + '_axis_Tooltip');
        }
    }
    isHeatmapRect(x, y) {
        const firstRectDetails = [];
        const lastRectDetails = [];
        let isRect;
        const borderBoundary = 5;
        if (this.heatMapSeries.rectPositionCollection.length > 0) {
            firstRectDetails.push(this.heatMapSeries.rectPositionCollection[0][0]);
            lastRectDetails.push(this.heatMapSeries.rectPositionCollection[this.yLength - 1][this.xLength - 1]);
        }
        if (firstRectDetails.length > 0 && lastRectDetails.length > 0) {
            if (this.cellSettings.border.width > borderBoundary && (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                y <= (lastRectDetails[0].y + lastRectDetails[0].height)) && this.cellSettings.tileType === 'Rect') {
                const currentRect = this.heatMapSeries.getCurrentRect(x, y);
                const rectHeight = lastRectDetails[0].height;
                const rectWidth = lastRectDetails[0].width;
                const cellBorder = this.cellSettings.border.width / 2;
                if ((x >= (currentRect.x + cellBorder) && (y >= (currentRect.y + cellBorder)) &&
                    (x <= (currentRect.x + (rectWidth - cellBorder)) &&
                        (y <= (currentRect.y + (rectHeight - cellBorder)))))) {
                    isRect = true;
                    this.isRectBoundary = true;
                }
                else {
                    isRect = false;
                    this.isRectBoundary = false;
                }
            }
            else {
                isRect = (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                    x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                    y <= (lastRectDetails[0].y + lastRectDetails[0].height));
                this.isRectBoundary = isRect;
            }
        }
        return isRect;
    }
    setTheme() {
        /*! Set theme */
        this.themeStyle = getThemeColor(this.theme);
    }
    calculateBounds() {
        const margin = this.margin;
        // Title Height;
        let titleHeight = 0;
        const padding = (this.legendModule && this.legendSettings.position === 'Top'
            && this.legendVisibilityByCellType) || this.titleSettings.textStyle.size === '0px' ? 0 : 16; // title padding
        const left = margin.left;
        const width = this.availableSize.width - left - margin.right;
        if ((this.paletteSettings.colorGradientMode === 'Column' || this.paletteSettings.colorGradientMode === 'Row') &&
            this.paletteSettings.type === 'Gradient') {
            if (this.paletteSettings.palette.length === 0) {
                this.legendVisibilityByCellType = false;
            }
            else {
                for (let i = 0; i < this.paletteSettings.palette.length; i++) {
                    if (this.paletteSettings.palette[i].value !== null || '') {
                        this.legendVisibilityByCellType = true;
                    }
                    else if (this.paletteSettings.palette[i].value === null || '') {
                        this.legendVisibilityByCellType = false;
                        break;
                    }
                }
            }
        }
        if (this.titleSettings.text) {
            const titleText = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(this.titleSettings.text) :
                this.titleSettings.text;
            this.titleCollection = getTitle(titleText, this.titleSettings.textStyle, width);
            titleHeight = (measureText(titleText, this.titleSettings.textStyle).height * this.titleCollection.length) +
                padding;
        }
        const top = margin.top + titleHeight;
        this.titleRect = new Rect(margin.left, margin.top, this.availableSize.width - margin.left - margin.right, titleHeight);
        const height = this.availableSize.height - top - margin.bottom;
        this.initialClipRect = new Rect(left, top, width, height);
        const legendTop = this.initialClipRect.y;
        if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
            this.legendModule.calculateLegendBounds(this.initialClipRect);
        }
        this.heatMapAxis.measureAxis(this.initialClipRect);
        if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
            this.legendModule.calculateLegendSize(this.initialClipRect, legendTop);
        }
        this.heatMapAxis.calculateAxisSize(this.initialClipRect);
    }
    refreshBound() {
        this.updateBubbleHelperProperty();
        this.calculateBounds();
        this.renderElements();
    }
    initAxis() {
        let axis;
        const axes = [this.xAxis, this.yAxis];
        this.axisCollections = [];
        for (let i = 0, len = axes.length; i < len; i++) {
            axis = axes[i];
            axis.orientation = (i === 0) ? 'Horizontal' : 'Vertical';
            axis.jsonCellLabel = [];
            this.axisCollections.push(axis);
        }
    }
    /**
     * Method to bind events for HeatMap
     */
    wireEvents() {
        /*! Find the Events type */
        // eslint-disable-next-line
        const isIE11Pointer = Browser.isPointer;
        const start = Browser.touchStartEvent;
        const stop = Browser.touchEndEvent;
        const move = Browser.touchMoveEvent;
        const cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, Browser.isDevice ? start : 'click', this.heatMapMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.heatMapMouseRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.heatMapMouseDoubleClick, this);
        EventHandler.add(this.element, start, this.heatMapMouseMove, this);
        EventHandler.add(this.element, stop, this.heatMapMouseLeave, this);
        EventHandler.add(this.element, move, this.heatMapMouseMove, this);
        EventHandler.add(this.element, cancel, this.heatMapMouseLeave, this);
        EventHandler.add(this.element, 'keyup', this.heatMapKeyUp, this);
        EventHandler.add(this.element, 'keydown', this.heatMapKeyDown, this);
        this.resizeEvent = this.heatMapResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
        // eslint-disable-next-line
        const heatmap = this;
        /**
         * Support for touch tapHold and tap for HeatMap
         */
        this.touchInstance = new Touch(this.element, {
            tapHold: (e) => {
                const targetId = e.originalEvent.target.id;
                if ((targetId.indexOf(this.element.id + '_HeatMapRect_') !== -1 || targetId.indexOf(this.element.id + '_HeatMapRectLabels_') !== -1) && this.allowSelection) {
                    heatmap.isCellTapHold = true;
                    const selectedCellCollection = [];
                    for (let i = 0; i < this.multiCellCollection.length; i++) {
                        selectedCellCollection.push(this.multiCellCollection[i]);
                    }
                    if (!e.originalEvent.ctrlKey || !this.enableMultiSelect) {
                        this.multiCellCollection = [];
                    }
                    heatmap.getDataCollection();
                    const argData = {
                        heatmap: heatmap,
                        cancel: false,
                        name: 'cellSelected',
                        data: heatmap.multiCellCollection
                    };
                    heatmap.trigger('cellSelected', argData);
                    if (!argData.cancel) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (e.ctrlKey === false || !this.enableMultiSelect) {
                            this.removeSelectedCellsBorder(false);
                        }
                        heatmap.currentRect.allowCollection = false;
                    }
                    else {
                        this.multiCellCollection = selectedCellCollection;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (this.multiCellCollection.length > 0 || e.ctrlKey === false || !this.enableMultiSelect) {
                            this.removeSelectedCellsBorder(true);
                        }
                    }
                    heatmap.setCellOpacity();
                    window.clearTimeout(this.tooltipTimer);
                    heatmap.tooltipOnMouseMove(null, heatmap.currentRect, heatmap.isCellTapHold);
                }
            },
            // eslint-disable-next-line @typescript-eslint/tslint/config
            tap: (e) => {
                const targetId = e.originalEvent.target.id;
                if ((targetId.indexOf(this.element.id + '_HeatMapRect_') !== -1 || targetId.indexOf(this.element.id + '_HeatMapRectLabels_') !== -1 || targetId.indexOf(this.element.id + '_CellSelection_Container_') !== -1)) {
                    let isCellTap = false;
                    if (!heatmap.isCellTapHold) {
                        isCellTap = true;
                    }
                    let pageX;
                    let pageY;
                    let touchArg;
                    const elementRect = this.element.getBoundingClientRect();
                    if (e.originalEvent.type === 'touchend' || e.originalEvent.type === 'touchstart') {
                        this.isTouch = true;
                        touchArg = e.originalEvent;
                        pageX = touchArg.changedTouches[0].clientX;
                        pageY = touchArg.changedTouches[0].clientY;
                    }
                    else {
                        this.isTouch = false;
                        pageX = e.originalEvent.clientX;
                        pageY = e.originalEvent.clientY;
                    }
                    pageX -= elementRect.left;
                    pageY -= elementRect.top;
                    const currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
                    window.clearTimeout(this.tooltipTimer);
                    heatmap.tooltipOnMouseMove(null, currentRect, isCellTap);
                }
            }
        });
        this.setStyle(this.element);
    }
    /**
     * Applying styles for heatmap element
     */
    setStyle(element) {
        element.style.touchAction = 'element';
        element.style.touchAction = 'element';
        element.style.zoom = 'none';
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
    }
    /**
     * This method is used to print the rendered heatmap.
     */
    print() {
        const exportChart = new ExportUtils(this);
        exportChart.print();
    }
    /**
     * Method to unbind events for HeatMap
     */
    unWireEvents() {
        /*! Find the Events type */
        // eslint-disable-next-line
        const isIE11Pointer = Browser.isPointer;
        const start = Browser.touchStartEvent;
        const stop = Browser.touchEndEvent;
        const move = Browser.touchMoveEvent;
        const cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, Browser.isDevice ? start : 'click', this.heatMapMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.heatMapMouseRightClick);
        EventHandler.remove(this.element, 'dblclick', this.heatMapMouseDoubleClick);
        EventHandler.remove(this.element, start, this.heatMapMouseMove);
        EventHandler.remove(this.element, stop, this.heatMapMouseLeave);
        EventHandler.remove(this.element, move, this.heatMapMouseMove);
        EventHandler.remove(this.element, cancel, this.heatMapMouseLeave);
        EventHandler.remove(this.element, 'keyup', this.heatMapKeyUp);
        EventHandler.remove(this.element, 'keydown', this.heatMapKeyDown);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    }
    /**
     * Handles the heatmap resize.
     *
     * @returns {boolean}
     * @private
     */
    // eslint-disable-next-line
    heatMapResize(e) {
        this.resizing = true;
        const argData = {
            heatmap: this,
            cancel: false,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.availableSize.width, this.availableSize.height)
        };
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            if (this.isDestroyed) {
                clearTimeout(this.resizeTimer);
                return;
            }
            this.createSvg();
            argData.currentSize = this.availableSize;
            this.trigger('resized', argData);
            this.refreshBound();
            this.appendSvgObject();
            if (this.allowSelection) {
                this.updateCellSelection();
            }
            this.trigger('loaded', ({ heatmap: this }));
            this.resizing = false;
        }, 500);
        return false;
    }
    /**
     * Method to bind selection after window resize for HeatMap
     */
    updateCellSelection() {
        const wSize = this.initialClipRect.width / this.axisCollections[0].axisLabelSize;
        const hSize = this.initialClipRect.height / this.axisCollections[1].axisLabelSize;
        const x = this.initialClipRect.x;
        const y = this.initialClipRect.y;
        if (!this.enableCanvasRendering) {
            if (this.multiCellCollection.length !== 0) {
                const containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                const containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                for (let i = 0; i < containersRect.childNodes.length; i++) {
                    containersRect.childNodes[i].setAttribute('opacity', '0.3');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '0.3');
                    }
                }
                for (let i = 0; i < this.multiCellCollection.length; i++) {
                    const collectionClass = this.multiCellCollection[i].cellElement;
                    const cellIndex = collectionClass.id.replace(this.element.id + '_HeatMapRect_', '');
                    const index = parseInt(cellIndex, 10);
                    containersRect.childNodes[index].setAttribute('opacity', '1');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        const getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                        if (getText) {
                            getText.setAttribute('opacity', '1');
                        }
                        this.addSvgClass(containersRect.childNodes[index]);
                    }
                }
            }
        }
        else if (this.enableCanvasRendering) {
            const rect = this.multiCellCollection;
            const oldCanvas = document.getElementById(this.element.id + '_canvas');
            const newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            const initialRect = this.initialClipRect;
            const rectHeight = initialRect.y + initialRect.height;
            const rectWidth = initialRect.x + initialRect.width;
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                this.multiCellCollection[i].width = rect[i].width = wSize;
                this.multiCellCollection[i].height = rect[i].height = hSize;
                this.multiCellCollection[i].x = rect[i].x = x + wSize * this.multiCellCollection[i].xPosition;
                this.multiCellCollection[i].y = rect[i].y = y + hSize * this.multiCellCollection[i].yPosition;
                const rectImage = oldCanvas.getContext('2d').getImageData(rect[i].x, rect[i].y, rect[i].width, rect[i].height);
                newCanvas.getContext('2d').putImageData(rectImage, rect[i].x, rect[i].y);
                oldCanvas.style.opacity = '0.3';
            }
            const topPositions = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
            newCanvas.getContext('2d').putImageData(topPositions, 0, 0);
            const bottomPositions = oldCanvas.getContext('2d').getImageData(0, rectHeight, this.availableSize.width, this.availableSize.height - rectHeight);
            newCanvas.getContext('2d').putImageData(bottomPositions, 0, initialRect.y + initialRect.height);
            const rightPosition = oldCanvas.getContext('2d').
                getImageData(rectWidth, 0, this.availableSize.width - rectWidth, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(rightPosition, rectWidth, 0);
            const leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
            removeElement(this.element.id + '_selectedCells');
        }
    }
    clearSVGSelection() {
        const rect = document.getElementById(this.element.id + '_Container_RectGroup');
        const text = document.getElementById(this.element.id + '_Container_TextGroup');
        for (let i = 0; i < rect.childNodes.length; i++) {
            const elementClassName = rect.childNodes[i].getAttribute('class');
            if (elementClassName === this.element.id + '_selected') {
                this.removeSvgClass(rect.childNodes[i], elementClassName);
            }
            rect.childNodes[i].setAttribute('opacity', '1');
            if (this.cellSettings.showLabel && text.childNodes[i]) {
                text.childNodes[i].setAttribute('opacity', '1');
            }
        }
    }
    /**
     * Get the maximum length of data source for both horizontal and vertical
     *
     * @private
     */
    calculateMaxLength() {
        const dataSource = this.completeAdaptDataSource;
        if (dataSource && dataSource.length > 0) {
            const xAxisMax = dataSource.length - 1;
            let yAxisMax = 0;
            for (let i = 0; i <= xAxisMax; i++) {
                const length = dataSource[i].length;
                yAxisMax = yAxisMax > length ? yAxisMax : length;
            }
            this.axisCollections[0].maxLength = xAxisMax;
            this.axisCollections[1].maxLength = yAxisMax - 1;
        }
        else {
            this.axisCollections[0].maxLength = 0;
            this.axisCollections[1].maxLength = 0;
        }
    }
    /**
     * To find mouse x, y for aligned heatmap element svg position
     */
    setMouseXY(pageX, pageY) {
        const rect = this.element.getBoundingClientRect();
        let svgCanvasRect;
        if (this.enableCanvasRendering) {
            svgCanvasRect = document.getElementById(this.element.id + '_canvas').getBoundingClientRect();
        }
        else {
            svgCanvasRect = document.getElementById(this.element.id + '_svg').getBoundingClientRect();
        }
        this.mouseX = (pageX - rect.left) - Math.max(svgCanvasRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgCanvasRect.top - rect.top, 0);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    triggerClickEvent(e, isDoubleClick, hasRightClicked) {
        let pageX;
        let pageY;
        let touchArg;
        const elementRect = this.element.getBoundingClientRect();
        if (e.type === 'touchstart') {
            if (!isDoubleClick) {
                this.isTouch = true;
            }
            touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            if (!isDoubleClick) {
                this.isTouch = false;
            }
            pageY = e.clientY;
            pageX = e.clientX;
        }
        pageX -= elementRect.left;
        pageY -= elementRect.top;
        const isheatmapRect = this.isHeatmapRect(pageX, pageY);
        if (isheatmapRect) {
            const currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
            this.trigger(isDoubleClick ? 'cellDoubleClick' : 'cellClick', {
                heatmap: this,
                value: currentRect.value,
                x: currentRect.x,
                y: currentRect.y,
                xLabel: this.heatMapSeries.hoverXAxisLabel,
                yLabel: this.heatMapSeries.hoverYAxisLabel,
                xValue: this.heatMapSeries.hoverXAxisValue,
                yValue: this.heatMapSeries.hoverYAxisValue,
                cellElement: this.enableCanvasRendering ? null : document.getElementById(currentRect.id),
                hasRightClicked: hasRightClicked,
                event: e
            });
        }
        return { x: pageX, y: pageY };
    }
    heatMapMouseRightClick(e) {
        this.triggerClickEvent(e, false, true);
    }
    heatMapMouseDoubleClick(e) {
        this.triggerClickEvent(e, true, false);
    }
    /**
     * @param {PointerEvent} e - Specifies the event.
     * @returns {boolean} Returns the boolean that that the heatmap is clicked or not
     * @private
     */
    heatMapMouseClick(e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const position = this.triggerClickEvent(e, false, false);
        const pageX = position.x;
        const pageY = position.y;
        this.notify('click', e);
        if (this.isHeatmapRect(pageX, pageY) && this.currentRect) {
            const rectElement = document.getElementById(this.currentRect.id);
            if (!isNullOrUndefined(rectElement)) {
                rectElement.focus();
            }
        }
        if (this.paletteSettings.type !== 'Gradient' && this.legendModule
            && this.legendSettings.visible && this.legendVisibilityByCellType) {
            const page = this.legendModule.navigationCollections;
            if (page.length && pageX > page[0].x && pageX < page[0].x + page[0].width &&
                pageY > page[0].y && pageY < page[0].y + page[0].height) {
                this.legendModule.translatePage(this, this.legendModule.currentPage, true);
            }
            else if (page.length && pageX > page[1].x && pageX < page[1].x + page[1].width &&
                pageY > page[1].y && pageY < page[1].y + page[1].height) {
                this.legendModule.translatePage(this, this.legendModule.currentPage, false);
            }
            const legendRange = this.legendModule.legendRange;
            const legendTextRange = this.legendModule.legendTextRange;
            let loop = true;
            for (let i = 0; i < legendRange.length; i++) {
                if (this.legendModule && this.legendSettings.toggleVisibility &&
                    this.legendModule.currentPage === legendRange[i].currentPage) {
                    if ((loop && (pageX >= legendRange[i].x
                        && pageX <= legendRange[i].width + legendRange[i].x) &&
                        (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                        ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                            pageX >= legendTextRange[i].x
                            && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                            (pageY >= legendTextRange[i].y
                                && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                        this.legendModule.legendRangeSelection(i);
                        loop = false;
                    }
                }
            }
        }
        return false;
    }
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     *
     * @private
     */
    heatMapMouseMove(e) {
        let pageX;
        let pageY;
        let touchArg;
        const elementRect = this.element.getBoundingClientRect();
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = false;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.removeFocus('none');
        pageX -= elementRect.left;
        pageY -= elementRect.top;
        this.setMouseXY(pageX, pageY);
        this.mouseAction(e, pageX, pageY, touchArg, elementRect);
        return true;
    }
    /**
     * Handles the mouse Move.
     *
     * @returns {boolean}
     */
    mouseAction(e, pageX, pageY, touchArg, elementRect) {
        let tooltipText;
        if (e.target && e.target.id) {
            const isheatmapRect = this.isHeatmapRect(pageX, pageY);
            if (this.legendModule) {
                if (isheatmapRect) {
                    if (this.paletteSettings.type === 'Gradient' &&
                        this.legendSettings.showGradientPointer && this.legendSettings.visible && this.legendVisibilityByCellType) {
                        this.legendModule.renderGradientPointer(e, pageX, pageY);
                    }
                }
                else {
                    this.legendModule.removeGradientPointer();
                }
                this.renderMousePointer(pageX, pageY);
            }
            let isshowTooltip;
            let currentRect;
            isshowTooltip = this.showTooltip && this.tooltipModule ? isheatmapRect : false;
            if (isheatmapRect) {
                currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
                if (e.which !== 2 && e.which !== 3) {
                    isshowTooltip = this.cellSelectionOnMouseMove(e, currentRect, pageX, pageY, isshowTooltip);
                }
            }
            this.tooltipOnMouseMove(e, currentRect, isshowTooltip, isheatmapRect);
            if (this.legendModule && this.legendSettings.visible && this.paletteSettings.type === 'Fixed' &&
                this.legendSettings.enableSmartLegend && this.legendSettings.labelDisplayType === 'None') {
                this.legendModule.createTooltip(pageX, pageY);
            }
            if (!this.enableCanvasRendering) {
                if (this.titleSettings.text && this.titleSettings.textStyle.textOverflow === 'Trim') {
                    this.titleTooltip(e, pageX, pageY, this.isTouch);
                }
                this.axisTooltip(e, pageX, pageY, this.isTouch);
                if (this.legendModule && this.legendSettings.visible && this.legendSettings.showLabel && this.legendVisibilityByCellType) {
                    this.legendModule.renderLegendLabelTooltip(e, pageX, pageY);
                }
                if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
                    this.legendModule.renderLegendTitleTooltip(e, pageX, pageY);
                }
            }
            else {
                // eslint-disable-next-line
                elementRect = this.element.getBoundingClientRect();
                const tooltipRect = (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                    this.legendSettings.labelDisplayType === 'None') ? false : true;
                tooltipText = getTooltipText(this.tooltipCollection, pageX, pageY) || (this.legendModule && tooltipRect &&
                    (!isNullOrUndefined(this.legendModule.legendLabelTooltip) &&
                        getTooltipText(this.legendModule.legendLabelTooltip, pageX, pageY)
                        || !isNullOrUndefined(this.legendModule.legendTitleTooltip) &&
                            getTooltipText(this.legendModule.legendTitleTooltip, pageX, pageY)));
                if (tooltipText) {
                    showTooltip(tooltipText, pageX, pageY, this.element.offsetWidth, this.element.id + '_canvas_Tooltip', getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
                }
                else {
                    removeElement(this.element.id + '_canvas_Tooltip');
                }
            }
        }
        return true;
    }
    /**
     * Triggering cell selection
     */
    cellSelectionOnMouseMove(e, currentRect, pageX, pageY, isshowTooltip) {
        if ((this.cellSettings.tileType === 'Rect' && e.type === 'mousedown' || e.type === 'touchstart'
            || e.type === 'pointerdown') && this.allowSelection) {
            this.previousRect = currentRect;
            this.multiSelection = true;
            this.rectSelected = true;
            this.initialCellX = pageX;
            this.initialCellY = pageY;
            e.preventDefault();
        }
        if (this.cellSettings.tileType === 'Rect' && this.multiSelection && currentRect) {
            isshowTooltip = false;
            this.highlightSelectedCells(this.previousRect, currentRect, pageX, pageY, e);
        }
        return isshowTooltip;
    }
    /**
     * Rendering tooltip on mouse move
     */
    tooltipOnMouseMove(e, currentRect, isshowTooltip, isheatmapRect) {
        if (isshowTooltip && currentRect) {
            if (this.tempTooltipRectId !== currentRect.id) {
                if (this.showTooltip) {
                    if ((this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
                        && !this.enableCanvasRendering) {
                        this.heatMapSeries.highlightSvgRect(currentRect.id);
                    }
                    if (this.tooltipTimer && !isNullOrUndefined(e) && (e.type === 'touchstart' || e.type === 'touchmove')) {
                        window.clearTimeout(this.tooltipTimer);
                        this.tooltipTimer = null;
                    }
                    this.tooltipModule.renderTooltip(currentRect);
                    const tooltipObject = this.tooltipModule.tooltipObject;
                    if (this.isTouch) {
                        this.tooltipTimer = setTimeout(() => {
                            if (!isNullOrUndefined(tooltipObject) &&
                                !isNullOrUndefined(document.getElementById(tooltipObject.element.id))
                                && !isNullOrUndefined(document.getElementById(tooltipObject.element.id).firstChild)) {
                                tooltipObject.fadeOut();
                            }
                            this.tooltipModule.isFadeout = true;
                            window.clearTimeout(this.tooltipTimer);
                            this.tooltipTimer = null;
                        }, 1500);
                        if (e) {
                            if (e.type === 'touchmove') {
                                if (e.cancelable) {
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
                this.tempTooltipRectId = currentRect.id;
            }
        }
        else {
            if (e !== null) {
                const borderBoundary = 5;
                if (!isheatmapRect) {
                    if ((this.cellSettings.enableCellHighlighting || this.showTooltip) && !this.enableCanvasRendering &&
                        this.cellSettings.border.width < borderBoundary) {
                        this.heatMapSeries.highlightSvgRect(e.target.id);
                    }
                    if (this.tooltipModule && this.showTooltip) {
                        this.tooltipModule.showHideTooltip(false, true);
                    }
                }
                else if (!this.showTooltip && this.cellSettings.border.width > borderBoundary) {
                    this.heatMapSeries.highlightSvgRect(e.target.id);
                }
            }
            this.tempTooltipRectId = '';
        }
    }
    /**
     * To select the multiple cells on mouse move action
     */
    highlightSelectedCells(previousRect, currentRect, pageX, pageY, e) {
        const pXIndex = previousRect.xIndex;
        const pYIndex = previousRect.yIndex;
        const cXIndex = currentRect.xIndex;
        const cYIndex = currentRect.yIndex;
        this.currentRect = currentRect;
        this.selectedCellsRect = new Rect(0, 0, 0, 0);
        this.selectedCellsRect.x = previousRect.x > currentRect.x ? currentRect.x : previousRect.x;
        this.selectedCellsRect.y = previousRect.y > currentRect.y ? currentRect.y : previousRect.y;
        this.selectedCellsRect.width = ((previousRect.x > currentRect.x ? (pXIndex - cXIndex) :
            (cXIndex - pXIndex)) + 1) * currentRect.width;
        this.selectedCellsRect.height = ((previousRect.y > currentRect.y ? (pYIndex - cYIndex) :
            (cYIndex - pYIndex)) + 1) * currentRect.height;
        if (e.type === 'touchstart' && this.multiCellCollection.length === 0 && !this.isCellTapHold) {
            this.isCellTapHold = true;
        }
        else {
            this.isCellTapHold = false;
        }
        e.preventDefault();
        const x = this.initialCellX > pageX ? pageX : this.initialCellX;
        const y = this.initialCellY > pageY ? pageY : this.initialCellY;
        const rect = new Rect(x - this.initialClipRect.x, y - this.initialClipRect.y, Math.abs(pageX - this.initialCellX), Math.abs(pageY - this.initialCellY));
        if (((rect.width > 0) && this.enableMultiSelect && e.ctrlKey === false)) {
            this.removeSelectedCellsBorder(false);
            const tooltipElement = document.getElementById(this.element.id + 'Celltooltipcontainer_svg');
            if (tooltipElement) {
                this.tooltipModule.tooltipObject = null;
                tooltipElement.setAttribute('opacity', '0');
            }
        }
        const parentDiv = document.getElementById(this.element.id + '_CellSelection_Container');
        const svgObject = this.renderer.createSvg({
            id: this.element.id + '_CellSelection_Container_svg',
            width: this.initialClipRect.width,
            height: this.initialClipRect.height
        });
        parentDiv.appendChild(svgObject);
        const parent = document.getElementById(this.element.id + '_CellSelection_Container_svg');
        if (this.enableMultiSelect) {
            const rectItems = new RectOption(this.element.id + '_selectedCells', '#87ceeb', { color: 'transparent', width: 1 }, 1, rect, '#0000ff');
            parent.appendChild(this.renderer.drawRectangle(rectItems));
            document.getElementById(this.element.id + '_selectedCells').style.opacity = '0.5';
        }
    }
    /**
     * Method to get selected cell data collection for HeatMap
     */
    getDataCollection() {
        if (!isNullOrUndefined(this.previousRect) && !isNullOrUndefined(this.currentRect)) {
            const pXIndex = this.previousRect.xIndex;
            const pYIndex = this.previousRect.yIndex;
            const cXIndex = this.currentRect.xIndex;
            const cYIndex = this.currentRect.yIndex;
            const minX = cXIndex > pXIndex ? pXIndex : cXIndex;
            const maxX = cXIndex > pXIndex ? cXIndex : pXIndex;
            const minY = cYIndex > pYIndex ? pYIndex : cYIndex;
            const maxY = cYIndex > pYIndex ? cYIndex : pYIndex;
            let tempX = minX;
            let tempY = minY;
            let cellX = this.previousRect.x;
            let cellY = this.previousRect.y;
            this.getCellCollection(this.currentRect, this.previousRect, true, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            tempX = minX;
            tempY = minY;
            cellX = this.previousRect.x;
            cellY = this.previousRect.y;
            this.checkSelectedCells();
            this.getCellCollection(this.currentRect, this.previousRect, false, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            this.selectedMultiCellCollection = [];
            this.canvasSelectedCells = new Rect(0, 0, 0, 0);
            this.selectedCellCount = 0;
        }
    }
    /**
     * To get the selected datas.
     */
    getCellCollection(currentRect, previousRect, singleCellData, tempX, tempY, maxX, maxY, minX, cellX, cellY) {
        const xIndex = Math.abs((currentRect.xIndex === previousRect.xIndex ?
            0 : currentRect.xIndex - previousRect.xIndex)) + 1;
        const yIndex = Math.abs((currentRect.yIndex === previousRect.yIndex ?
            0 : currentRect.yIndex - previousRect.yIndex)) + 1;
        for (let i = 0; i < (xIndex * yIndex); i++) {
            if (singleCellData) {
                this.getSelectedCellData(cellX, cellY, true);
            }
            else {
                this.getSelectedCellData(cellX, cellY, false);
            }
            if (tempX < maxX) {
                cellX += currentRect.xIndex > previousRect.xIndex ? currentRect.width : -currentRect.width;
                tempX++;
            }
            else if (tempY < maxY) {
                cellY += currentRect.yIndex > previousRect.yIndex ? currentRect.height : -currentRect.height;
                cellX = previousRect.x;
                tempX = minX;
            }
        }
    }
    /**
     * To remove the selection on mouse click without ctrl key.
     */
    removeSelectedCellsBorder(isSelectionCancel) {
        if (!this.enableCanvasRendering) {
            const containerRect = document.getElementById(this.element.id + '_Container_RectGroup');
            const containerText = document.getElementById(this.element.id + '_Container_TextGroup');
            for (let i = 0; i < containerRect.childNodes.length; i++) {
                const elementClassName = containerRect.childNodes[i].getAttribute('class');
                if (isSelectionCancel) {
                    containerRect.childNodes[i].setAttribute('opacity', '1');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '1');
                        this.removeSvgClass(containerRect.childNodes[i], elementClassName);
                    }
                }
                else {
                    containerRect.childNodes[i].setAttribute('opacity', '0.3');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '0.3');
                        this.removeSvgClass(containerRect.childNodes[i], elementClassName);
                    }
                }
            }
        }
        else {
            const ctx = this.secondaryCanvasRenderer.ctx;
            for (let i = 0; i < this.previousSelectedCellsRect.length; i++) {
                const rect = this.previousSelectedCellsRect[i];
                ctx.save();
                ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                ctx.restore();
            }
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                const rects = this.multiCellCollection[i];
                if (this.multiCellCollection.length > 0) {
                    ctx.save();
                    ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                }
            }
        }
    }
    /**
     * To highlight the selected multiple cells on mouse move action in canvas mode.
     */
    highlightSelectedAreaInCanvas(rect) {
        if (rect.x) {
            const oldCanvas = document.getElementById(this.element.id + '_canvas');
            const newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            const initialRect = this.initialClipRect;
            const rectImage = oldCanvas.getContext('2d').getImageData(rect.x, rect.y, rect.width, rect.height);
            newCanvas.getContext('2d').putImageData(rectImage, rect.x, rect.y);
            oldCanvas.style.opacity = '0.3';
            const topPosition = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
            newCanvas.getContext('2d').putImageData(topPosition, 0, 0);
            const bottomPosition = oldCanvas.getContext('2d').getImageData(0, initialRect.y + initialRect.height, this.availableSize.width, this.availableSize.height - (initialRect.y + initialRect.height));
            newCanvas.getContext('2d').putImageData(bottomPosition, 0, initialRect.y + initialRect.height);
            const rightPosition = oldCanvas.getContext('2d').getImageData(initialRect.x + initialRect.width, 0, this.availableSize.width - (initialRect.x + initialRect.width), this.availableSize.height);
            newCanvas.getContext('2d').putImageData(rightPosition, initialRect.x + initialRect.width, 0);
            const leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
            newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
        }
    }
    /**
     * To get the collection of selected cells.
     */
    getSelectedCellData(cellX, cellY, cellCollection) {
        const xAxis = this.axisCollections[0];
        const yAxis = this.axisCollections[1];
        const xLabels = xAxis.tooltipLabels;
        const yLabels = yAxis.tooltipLabels.slice().reverse();
        const rectPosition = this.heatMapSeries.getCurrentRect(cellX + 1, cellY + 1);
        const currentRect = document.getElementById(rectPosition.id);
        const cellDetails = new SelectedCellDetails(null, '', '', 0, 0, null, 0, 0, 0, 0, 0, 0);
        cellDetails.value = rectPosition.value;
        cellDetails.xLabel = xLabels[rectPosition.xIndex].toString();
        cellDetails.yLabel = yLabels[rectPosition.yIndex].toString();
        cellDetails.xValue = xAxis.labelValue[rectPosition.xIndex];
        cellDetails.yValue = yAxis.labelValue.slice().reverse()[rectPosition.yIndex];
        cellDetails.cellElement = this.enableCanvasRendering ? null : currentRect;
        cellDetails.xPosition = rectPosition.xIndex;
        cellDetails.yPosition = rectPosition.yIndex;
        cellDetails.width = this.currentRect.width;
        cellDetails.height = this.currentRect.height;
        cellDetails.x = this.currentRect.x;
        cellDetails.y = this.currentRect.y;
        this.currentRect.allowCollection = true;
        this.addSvgClass(currentRect);
        if (cellCollection) {
            this.selectedMultiCellCollection.push(cellDetails);
            this.currentRect.allowCollection = false;
        }
        else {
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                if (this.multiCellCollection[i].xPosition === cellDetails.xPosition &&
                    this.multiCellCollection[i].yPosition === cellDetails.yPosition) {
                    this.currentRect.allowCollection = false;
                    if (this.selectedCellCount === this.selectedMultiCellCollection.length) {
                        this.currentRect.allowCollection = false;
                        if (!this.enableCanvasRendering) {
                            for (let j = 0; j < this.selectedMultiCellCollection.length; j++) {
                                const rectElement = this.selectedMultiCellCollection[j].cellElement;
                                if (rectElement) {
                                    const index = rectElement.id.replace(this.element.id + '_HeatMapRect_', '');
                                    // eslint-disable-next-line
                                    const containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                                    const elementClassName = rectElement.getAttribute('class');
                                    rectElement.setAttribute('opacity', '0.3');
                                    const getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                                    if (getText) {
                                        getText.setAttribute('opacity', '0.3');
                                    }
                                    this.removeSvgClass(rectElement, elementClassName);
                                }
                            }
                        }
                        else {
                            const ctx = this.secondaryCanvasRenderer.ctx;
                            const rect = this.canvasSelectedCells;
                            ctx.save();
                            ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                            ctx.restore();
                            this.selectedCellsRect = new Rect(0, 0, 0, 0);
                        }
                        this.multiCellCollection.splice(i, 1);
                    }
                }
            }
        }
        if (rectPosition.visible && !isNullOrUndefined(rectPosition.value) && this.currentRect.allowCollection === true) {
            this.multiCellCollection.push(cellDetails);
        }
    }
    /**
     * To add class for selected cells
     *
     * @private
     */
    addSvgClass(element) {
        if (!this.enableCanvasRendering) {
            const className = this.element.id + '_selected';
            element.classList.add(className);
        }
    }
    /**
     * To remove class for unselected cells
     *
     * @private
     */
    removeSvgClass(rectElement, className) {
        if (className) {
            rectElement.setAttribute('class', className.replace(className, ''));
        }
    }
    /**
     * This method is used to clear the cell selection in the heatmap.
     * {% codeBlock src='heatmap/clearSelection/index.md' %}{% endcodeBlock %}
     */
    clearSelection() {
        if (!this.enableCanvasRendering && this.allowSelection) {
            this.clearSVGSelection();
        }
        if (this.enableCanvasRendering) {
            const ctx = this.secondaryCanvasRenderer.ctx;
            for (let i = 0; i < this.previousSelectedCellsRect.length; i++) {
                ctx.save();
                ctx.clearRect(this.previousSelectedCellsRect[i].x - 1, this.previousSelectedCellsRect[i].y - 1, this.previousSelectedCellsRect[i].width + 2, this.previousSelectedCellsRect[i].height + 2);
                ctx.restore();
            }
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                const rects = this.multiCellCollection[i];
                if (this.multiCellCollection.length > 0) {
                    ctx.save();
                    ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                }
            }
            const canvas = document.getElementById(this.element.id + '_canvas');
            canvas.style.opacity = '1';
        }
        this.tempMultiCellCollection = [];
        this.multiCellCollection = [];
        this.rectSelected = false;
    }
    renderMousePointer(pageX, pageY) {
        const legendRange = this.legendModule.legendRange;
        const legendTextRange = this.legendModule.legendTextRange;
        let loop = true;
        for (let i = 0; i < legendRange.length; i++) {
            if (this.legendSettings.toggleVisibility && this.legendModule.currentPage === legendRange[i].currentPage) {
                if ((loop && (pageX >= legendRange[i].x
                    && pageX <= legendRange[i].width + legendRange[i].x) &&
                    (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                    ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                        pageX >= legendTextRange[i].x
                        && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                        (pageY >= legendTextRange[i].y
                            && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                    if (this.enableCanvasRendering) {
                        document.getElementById(this.element.id + '_canvas').style.cursor = 'Pointer';
                    }
                    else {
                        document.getElementById(this.element.id + '_svg').style.cursor = 'Pointer';
                        const legendLabelTooltipContainer = document.getElementById(this.element.id + 'legendLabelTooltipContainer');
                        if (!isNullOrUndefined(legendLabelTooltipContainer)) {
                            legendLabelTooltipContainer.style.cursor = 'Pointer';
                        }
                    }
                    loop = false;
                }
                else if (loop) {
                    if (this.enableCanvasRendering) {
                        document.getElementById(this.element.id + '_canvas').style.cursor = '';
                    }
                    else {
                        document.getElementById(this.element.id + '_svg').style.cursor = '';
                    }
                }
            }
        }
    }
    /**
     * Handles the mouse end.
     *
     * @returns {boolean}
     * @private
     */
    heatMapMouseLeave(e) {
        if (e.target && e.target.id &&
            (this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
            && !this.enableCanvasRendering) {
            this.heatMapSeries.highlightSvgRect(this.tempTooltipRectId);
        }
        if (this.allowSelection && this.multiSelection) {
            this.multiSelection = false;
            if (e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'touchend' || e.type === 'pointerup') {
                if (e.which !== 2 && e.which !== 3) {
                    if (this.isCellTapHold === false) {
                        let rect;
                        const selectionRect = document.getElementById(this.element.id + '_selectedCells');
                        if (!isNullOrUndefined(selectionRect)) {
                            const rectBound = selectionRect.getClientRects()[0];
                            rect = new Rect(rectBound.left, rectBound.top, rectBound.width, rectBound.height);
                        }
                        else {
                            let pageX;
                            let pageY;
                            let touchArg;
                            const elementRect = this.element.getBoundingClientRect();
                            if (e.type === 'touchend') {
                                this.isTouch = true;
                                touchArg = e;
                                pageY = touchArg.changedTouches[0].clientY;
                                pageX = touchArg.changedTouches[0].clientX;
                            }
                            else {
                                this.isTouch = false;
                                pageY = e.clientY;
                                pageX = e.clientX;
                            }
                            pageX -= elementRect.left;
                            pageY -= elementRect.top;
                            const x = this.initialCellX > pageX ? pageX : this.initialCellX;
                            const y = this.initialCellY > pageY ? pageY : this.initialCellY;
                            rect = new Rect(x - this.initialClipRect.x, y - this.initialClipRect.y, Math.abs(pageX - this.initialCellX) !== 0 ? Math.abs(pageX - this.initialCellX) :
                                Math.abs(pageY - this.initialCellY), Math.abs(pageY - this.initialCellY));
                        }
                        if (!(rect.width > 0 && !this.enableMultiSelect)) {
                            const selectedCellCollection = [];
                            for (let i = 0; i < this.multiCellCollection.length; i++) {
                                selectedCellCollection.push(this.multiCellCollection[i]);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            if (e.ctrlKey === false || !this.enableMultiSelect) {
                                this.multiCellCollection = [];
                            }
                            this.getDataCollection();
                            const argData = {
                                heatmap: this,
                                cancel: false,
                                name: 'cellSelected',
                                data: this.multiCellCollection
                            };
                            this.trigger('cellSelected', argData);
                            if (!argData.cancel) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (e.ctrlKey === false || !this.enableMultiSelect) {
                                    this.removeSelectedCellsBorder(false);
                                }
                                this.currentRect.allowCollection = false;
                            }
                            else {
                                this.multiCellCollection = selectedCellCollection;
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (this.multiCellCollection.length > 0 || e.ctrlKey === false || !this.enableMultiSelect) {
                                    this.removeSelectedCellsBorder(true);
                                }
                            }
                            this.setCellOpacity();
                            if (e.type === 'touchend') {
                                window.clearTimeout(this.tooltipTimer);
                                this.tooltipOnMouseMove(null, this.currentRect, true);
                            }
                        }
                    }
                    else {
                        this.isCellTapHold = false;
                    }
                }
            }
        }
        if (this.tooltipModule && this.showTooltip && e.type === 'mouseleave') {
            this.tooltipModule.showHideTooltip(false);
        }
        this.tempTooltipRectId = '';
        if (this.legendModule && this.legendSettings.visible && this.legendModule.tooltipObject &&
            this.legendModule.tooltipObject.element) {
            const tooltipElement = this.legendModule.tooltipObject.element.firstChild;
            if (e.type === 'mouseleave') {
                tooltipElement.setAttribute('opacity', '0');
            }
            else {
                if (this.legendTooltipTimer) {
                    window.clearTimeout(this.legendTooltipTimer);
                }
                this.legendTooltipTimer = setTimeout(() => {
                    tooltipElement.setAttribute('opacity', '0');
                }, 1500);
            }
        }
        if (this.paletteSettings.type === 'Gradient' && this.legendModule && this.legendSettings.showGradientPointer &&
            this.legendSettings.visible && this.legendVisibilityByCellType) {
            if (e.type === 'mouseleave') {
                this.legendModule.removeGradientPointer();
            }
            else {
                if (this.gradientTimer) {
                    window.clearTimeout(this.gradientTimer);
                }
                this.gradientTimer = setTimeout(() => { this.legendModule.removeGradientPointer(); }, 1500);
            }
        }
        if (this.enableCanvasRendering) {
            const main = document.getElementById(this.element.id + '_hoverRect_canvas');
            if (main) {
                main.style.visibility = 'hidden';
                this.tempRectHoverClass = '';
            }
        }
        if (this.titleSettings.text && this.titleCollection[0].indexOf('...') !== -1) {
            if (e.cancelable) {
                e.preventDefault();
            }
            if (!this.isTouch) {
                if (!this.enableCanvasRendering) {
                    removeElement(this.element.id + '_Title_Tooltip');
                }
                else {
                    removeElement(this.element.id + '_canvas_Tooltip');
                }
            }
        }
        return true;
    }
    /**
     * This method is used to perform operations when keyboard up on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    heatMapKeyUp(e) {
        if (e.code !== 'Tab') {
            return;
        }
        this.removeFocus('none');
        if (this.tooltipModule) {
            this.tooltipModule.showHideTooltip(false);
        }
        const targetElement = e.target;
        const isRect = targetElement.id.indexOf('HeatMapRect') > -1;
        const isLegend = targetElement.id.indexOf('Legend') > -1;
        const toHighlightCells = this.cellSettings.enableCellHighlighting;
        if (toHighlightCells && !isLegend && !this.rectSelected) {
            this.heatMapSeries.highlightSvgRect(targetElement.id);
        }
        else if ((isRect && this.allowSelection) || (isLegend && this.legendSettings.toggleVisibility) || targetElement.id.indexOf('arrow') > -1) {
            targetElement.style.outline = '2px solid black';
            targetElement.classList.add('keyboard-focused');
        }
    }
    /**
     * This method is used to perform operations when keyboard down on Heatmap.
     *
     * @param {KeyboardEvent} e - Specifies the keyboard event on Heatmap.
     * @returns {void}
     * @private
     */
    heatMapKeyDown(e) {
        if (e.code !== 'Enter') {
            return;
        }
        if (!e.ctrlKey) {
            this.multiCellCollection = [];
        }
        this.removeFocus('none');
        let targetElement = e.target;
        if (this.allowSelection && (targetElement.id.indexOf('HeatMapRect') > -1) && this.cellSettings.tileType === 'Rect') {
            this.previousRect = this.currentRect = this.getRectElement(targetElement.id);
            this.removeSelectedCellsBorder(false);
            this.getDataCollection();
            this.setCellOpacity();
            this.rectSelected = true;
        }
        else if (this.legendModule && this.legendSettings.visible) {
            const index = this.calculateLegendIndex(targetElement);
            if (!isNullOrUndefined(index)) {
                this.legendModule.legendRangeSelection(index);
            }
            targetElement = document.getElementById(targetElement.id);
            this.handleArrowNavigation(targetElement);
            targetElement.setAttribute('tabindex', '0');
            targetElement.focus();
        }
    }
    /**
     * Method to find the legend index.
     */
    calculateLegendIndex(targetElement) {
        if (this.legendSettings.toggleVisibility) {
            if (targetElement.id.indexOf('Legend_Index') > -1) {
                return parseFloat(targetElement.id.split('Legend_Index_')[1]);
            }
            if (targetElement.id.indexOf('_Smart_Legend_Group_') > -1) {
                return parseFloat(targetElement.id.split('_Smart_Legend_Group_')[1]);
            }
        }
        return null;
    }
    /**
     * Method to handle arrow navigation in legend.
     */
    handleArrowNavigation(targetElement) {
        if (targetElement.id.indexOf('arrow') > -1) {
            const currentPage = this.legendModule.currentPage;
            const maxPage = this.legendColorCollection.length / this.legendModule.listPerPage;
            if (currentPage < maxPage && targetElement.id.indexOf('rightarrow') > -1) {
                this.legendModule.translatePage(this, currentPage, true);
            }
            else if (currentPage <= maxPage && targetElement.id.indexOf('leftarrow') > -1) {
                this.legendModule.translatePage(this, currentPage, false);
            }
        }
    }
    /**
     * Method to return Current rect.
     */
    getRectElement(id) {
        const rectCollection = this.heatMapSeries.rectPositionCollection;
        for (let i = 0; i < rectCollection.length; i++) {
            for (let j = 0; j < rectCollection[i].length; j++) {
                if (rectCollection[i][j].id === id) {
                    return rectCollection[i][j];
                }
            }
        }
        return null;
    }
    /**
     * Method to remove the highlight outline.
     */
    removeFocus(outline) {
        const highlightedElement = document.querySelector('.keyboard-focused');
        if (highlightedElement) {
            highlightedElement.style.outline = outline;
            highlightedElement.classList.remove('keyboard-focused');
        }
    }
    /**
     * Method to Check for deselection of cell.
     */
    checkSelectedCells() {
        if (!this.enableCanvasRendering) {
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                for (let j = 0; j < this.selectedMultiCellCollection.length; j++) {
                    if (this.selectedMultiCellCollection[j].cellElement.getAttribute('id')
                        === this.multiCellCollection[i].cellElement.getAttribute('id')) {
                        this.selectedCellCount++;
                    }
                }
            }
        }
        else {
            this.canvasSelectedCells = new Rect(0, 0, 0, 0);
            this.canvasSelectedCells.x = this.selectedCellsRect.x;
            this.canvasSelectedCells.y = this.selectedCellsRect.y;
            this.canvasSelectedCells.width = this.selectedCellsRect.width;
            this.canvasSelectedCells.height = this.selectedCellsRect.height;
            for (let i = 0; i < this.multiCellCollection.length; i++) {
                for (let j = 0; j < this.selectedMultiCellCollection.length; j++) {
                    if (this.selectedMultiCellCollection[j].xPosition === this.multiCellCollection[i].xPosition &&
                        this.selectedMultiCellCollection[j].yPosition === this.multiCellCollection[i].yPosition) {
                        this.selectedCellCount++;
                    }
                }
            }
            if (this.legendModule && this.rectSelected && this.paletteSettings.type === 'Gradient') {
                this.legendModule.removeGradientPointer();
            }
        }
    }
    /**
     * Method to remove opacity for text of selected cell for HeatMap
     */
    removeOpacity(containersRect, containerText) {
        for (let i = 0; i < containersRect.childNodes.length; i++) {
            containersRect.childNodes[i].setAttribute('opacity', '0.3');
            if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                containerText.childNodes[i].setAttribute('opacity', '0.3');
            }
        }
    }
    /**
     * Method to set opacity for selected cell for HeatMap
     */
    setCellOpacity() {
        if (!this.enableCanvasRendering) {
            if (this.multiCellCollection.length !== 0) {
                this.tempMultiCellCollection.push(this.multiCellCollection);
                const containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                const containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                this.removeOpacity(containersRect, containerText);
                for (let i = 0; i < this.multiCellCollection.length; i++) {
                    const collectionClasss = this.multiCellCollection[i].cellElement;
                    const index = parseInt(collectionClasss.id.replace(this.element.id + '_HeatMapRect_', ''), 10);
                    containersRect.childNodes[index].setAttribute('opacity', '1');
                    containersRect.childNodes[index].setAttribute('tabindex', '0');
                    if (this.cellSettings.showLabel) {
                        const getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                        if (getText) {
                            getText.setAttribute('opacity', '1');
                        }
                    }
                }
            }
        }
        else {
            this.previousSelectedCellsRect.push(this.selectedCellsRect);
            this.highlightSelectedAreaInCanvas(this.selectedCellsRect);
        }
        removeElement(this.element.id + '_selectedCells');
    }
    /**
     * To create div container for rendering two layers of canvas.
     *
     * @returns {void}
     * @private
     */
    createMultiCellDiv(onLoad) {
        if (onLoad) {
            const divElement = this.createElement('div', {
                id: this.element.id + '_Multi_CellSelection_Canvas'
            });
            divElement.style.position = 'relative';
            this.element.appendChild(divElement);
            this.svgObject.style.position = 'absolute';
            this.svgObject.style.left = '0px';
            this.svgObject.style.top = '0px';
            this.svgObject.style.zIndex = '0';
        }
        else {
            let secondaryCanvas;
            secondaryCanvas = document.getElementById(this.element.id + '_secondary_canvas');
            if (isNullOrUndefined(secondaryCanvas)) {
                secondaryCanvas = this.secondaryCanvasRenderer.createCanvas({
                    width: this.availableSize.width,
                    height: this.availableSize.height, x: 0, y: 0
                });
            }
            secondaryCanvas.style.cssText = 'position: relative; z-index: 1';
            this.element.appendChild(secondaryCanvas);
        }
    }
};
__decorate$7([
    Property(null)
], HeatMap.prototype, "width", void 0);
__decorate$7([
    Property(null)
], HeatMap.prototype, "height", void 0);
__decorate$7([
    Property(true)
], HeatMap.prototype, "showTooltip", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "tooltipRender", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "resized", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "loaded", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "cellRender", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "cellSelected", void 0);
__decorate$7([
    Property('SVG')
], HeatMap.prototype, "renderingMode", void 0);
__decorate$7([
    Property(null)
], HeatMap.prototype, "dataSource", void 0);
__decorate$7([
    Complex({}, Data)
], HeatMap.prototype, "dataSourceSettings", void 0);
__decorate$7([
    Property(null)
], HeatMap.prototype, "backgroundColor", void 0);
__decorate$7([
    Property('Material')
], HeatMap.prototype, "theme", void 0);
__decorate$7([
    Property(false)
], HeatMap.prototype, "allowSelection", void 0);
__decorate$7([
    Property(true)
], HeatMap.prototype, "enableMultiSelect", void 0);
__decorate$7([
    Property(false)
], HeatMap.prototype, "enableHtmlSanitizer", void 0);
__decorate$7([
    Complex({}, Margin)
], HeatMap.prototype, "margin", void 0);
__decorate$7([
    Complex({ text: '', textStyle: Theme.heatMapTitleFont }, Title)
], HeatMap.prototype, "titleSettings", void 0);
__decorate$7([
    Complex({}, Axis)
], HeatMap.prototype, "xAxis", void 0);
__decorate$7([
    Complex({ position: 'Right' }, LegendSettings)
], HeatMap.prototype, "legendSettings", void 0);
__decorate$7([
    Complex({}, PaletteSettings)
], HeatMap.prototype, "paletteSettings", void 0);
__decorate$7([
    Complex({}, TooltipSettings)
], HeatMap.prototype, "tooltipSettings", void 0);
__decorate$7([
    Complex({}, Axis)
], HeatMap.prototype, "yAxis", void 0);
__decorate$7([
    Complex({}, CellSettings)
], HeatMap.prototype, "cellSettings", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "created", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "load", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "cellClick", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "cellDoubleClick", void 0);
__decorate$7([
    Event()
], HeatMap.prototype, "legendRender", void 0);
HeatMap = __decorate$7([
    NotifyPropertyChanges
], HeatMap);

export { AdaptiveMinMax, Adaptor, Axis, AxisHelper, AxisLabelBorder, Border, BubbleData, BubbleSize, BubbleTooltipData, CanvasTooltip, CellColor, CellSettings, CircleOption, ColorCollection, CurrentLegendRect, CurrentRect, CustomizeOption, Data, DrawSvgCanvas, ExportUtils, FillColor, Font, Gradient, GradientColor, GradientPointer, HeatMap, Legend, LegendColorCollection, LegendRange, LegendSettings, Line, LineOption, Margin, MultiLevelCategories, MultiLevelLabels, MultiLevelPosition, MultipleRow, PaletteCollection, PaletteSettings, PaletterColor, Path, PathAttributes, PathOption, Rect, RectOption, RgbColor, SelectedCellDetails, Series, Size, TextBasic, TextElement, TextOption, Title, ToggleVisibility, Tooltip, TooltipBorder, TooltipSettings, TwoDimensional, colorNameToHex, componentToHex, convertElement, convertHexToColor, convertToHexCode, createLabelTemplate, formatValue, getElement, getIsLineBreakLabel, getSanitizedTexts, getTemplateFunction, getTitle, getTooltipText, increaseDateTimeInterval, measureText, removeElement, removeMeasureElement, rotateTextSize, showTooltip, stringToNumber, sum, textNone, textTrim, textWrap, titlePositionX, titlePositionY };
//# sourceMappingURL=ej2-heatmap.es2015.js.map
