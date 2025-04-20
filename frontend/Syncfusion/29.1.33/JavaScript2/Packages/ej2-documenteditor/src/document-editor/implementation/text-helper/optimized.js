import { isNullOrUndefined, createElement, updateCSSText } from '@syncfusion/ej2-base';
/**
 *  Class which performs optimized text measuring logic to find font height.
 */
var Optimized = /** @class */ (function () {
    /**
     * Constructor to initialize Optimized module.
     *
     * @param {DocumentHelper} documentHelper - the document helper object.
     */
    function Optimized(documentHelper) {
        this.documentHelper = documentHelper;
        this.optimizedHeightCollection = {};
    }
    Optimized.prototype.getModuleName = function () {
        return 'Optimized';
    };
    /**
     * Construct key based on the character format.
     *
     * @param {WCharacterFormat} characterFormat - the character format to construct key.
     * @returns {string} - the constructed key.
     */
    Optimized.prototype.getkeyFromCharFormat = function (characterFormat) {
        var formatText = characterFormat.fontFamily.toLocaleLowerCase();
        if (characterFormat.bold) {
            formatText += ';' + 'bold';
        }
        if (characterFormat.italic) {
            formatText += ';' + 'italic';
        }
        return formatText;
    };
    /**
     * Method to retrieve font information with optimized text measuring logic.
     *
     * @param {WCharacterFormat} characterFormat -character format to apply.
     * @returns {string} - returns font size information.
     */
    Optimized.prototype.getFontInfo = function (characterFormat) {
        var iframe = createElement('iframe');
        document.body.appendChild(iframe);
        var innerHtml = '<!DOCTYPE html>'
            + '<html><head></head>'
            + '<body>'
            + '</body>'
            + '</html>';
        var externalFonts = this.documentHelper.owner.externalFonts;
        if (externalFonts && externalFonts.length > 0) {
            externalFonts.forEach(function (externalFont) {
                if (externalFont.src) {
                    innerHtml += '<style>@font-face {font-family: \'' + externalFont.fontFamily + '\'; src: ' + externalFont.src + '; }</style>';
                }
            });
        }
        if (!isNullOrUndefined(iframe.contentDocument)) {
            iframe.contentDocument.open();
            iframe.contentDocument.write(innerHtml);
            iframe.contentDocument.close();
        }
        var container = document.createElement('div');
        var cssText = 'position:absolute;top:-1000px;left:-1000px;opacity:0;font-size:0px;line-height:normal';
        updateCSSText(container, cssText);
        // constant tested height value for calculating height factor which matches 90% accuracy with GDI+ value.
        var maxFontHeight = 288;
        var factor = 1.0 / window.devicePixelRatio;
        container.style.transform = 'scale(' + factor.toString() + ',' + factor.toString() + ')';
        /* eslint-disable-next-line max-len */
        container.innerHTML = '';
        var baselineReferenceSpan = document.createElement('span');
        baselineReferenceSpan.className = 'e-de-font-info';
        baselineReferenceSpan.style.cssText = 'font-size: 0; font-family: ' + characterFormat.fontFamily + '; display: inline-block;';
        baselineReferenceSpan.textContent = 'm';
        var fontMeasurementSpan = document.createElement('span');
        fontMeasurementSpan.className = 'e-de-font-info';
        fontMeasurementSpan.style.cssText = 'font-size: ' + maxFontHeight + 'pt; ' +
            'font-family: ' + characterFormat.fontFamily + '; ' +
            (characterFormat.bold ? 'font-weight: bold; ' : '') +
            (characterFormat.italic ? 'font-style: italic; ' : '') +
            'display: inline-block;';
        fontMeasurementSpan.textContent = 'm';
        container.appendChild(baselineReferenceSpan);
        container.appendChild(fontMeasurementSpan);
        iframe.contentDocument.body.appendChild(container);
        /* eslint-disable-next-line max-len */
        var baseLineFactor = container.firstChild.offsetTop / container.lastChild.offsetHeight;
        var heightFactor = parseFloat((container.lastChild.offsetHeight / maxFontHeight).toFixed(2));
        document.body.removeChild(iframe);
        return { HeightFactor: heightFactor, BaselineFactor: baseLineFactor };
    };
    /**
     * @private
     * @param {WCharacterFormat} characterFormat - character format to apply.
     * @returns {TextSizeInfo} returns text size information.
     */
    Optimized.prototype.getHeightInternal = function (characterFormat) {
        var key = this.getkeyFromCharFormat(characterFormat);
        //With optimized technique, height and baseline factor will be same for each font-family, hence we maintaining cache for the factors and updating height based on font size.
        var isBidi = characterFormat.bidi || characterFormat.complexScript;
        if (isNullOrUndefined(this.optimizedHeightCollection["" + key])) {
            var fontInfo = this.getFontInfo(characterFormat);
            this.optimizedHeightCollection["" + key] = fontInfo;
            var fontHeight = fontInfo.HeightFactor * (isBidi ? characterFormat.fontSizeBidi : characterFormat.fontSize);
            return { Height: fontHeight, BaselineOffset: fontInfo.BaselineFactor * fontHeight };
        }
        else {
            var fontSizeInfo = this.optimizedHeightCollection["" + key];
            var fontHeight = fontSizeInfo.HeightFactor * (isBidi ? characterFormat.fontSizeBidi : characterFormat.fontSize);
            return { Height: fontHeight, BaselineOffset: fontSizeInfo.BaselineFactor * fontHeight };
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Optimized.prototype.destroy = function () {
        this.documentHelper = undefined;
        this.optimizedHeightCollection = undefined;
    };
    return Optimized;
}());
export { Optimized };
