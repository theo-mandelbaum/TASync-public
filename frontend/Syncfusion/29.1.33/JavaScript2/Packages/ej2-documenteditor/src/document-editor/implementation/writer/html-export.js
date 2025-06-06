/* eslint-disable */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { HelperMethods } from '../editor/editor-helper';
import { sectionsProperty, characterFormatProperty, paragraphFormatProperty, listsProperty, abstractListsProperty, nameProperty, boldProperty, italicProperty, underlineProperty, baselineAlignmentProperty, strikethroughProperty, highlightColorProperty, fontSizeProperty, fontColorProperty, fontFamilyProperty, styleNameProperty, allCapsProperty, listIdProperty, listLevelNumberProperty, leftIndentProperty, rightIndentProperty, firstLineIndentProperty, textAlignmentProperty, afterSpacingProperty, beforeSpacingProperty, lineSpacingProperty, lineSpacingTypeProperty, listFormatProperty, bordersProperty, leftMarginProperty, rightMarginProperty, topMarginProperty, bottomMarginProperty, cellWidthProperty, columnSpanProperty, rowSpanProperty, verticalAlignmentProperty, isHeaderProperty, cellSpacingProperty, shadingProperty, tableAlignmentProperty, preferredWidthProperty, preferredWidthTypeProperty, backgroundColorProperty, hasNoneStyleProperty, lineStyleProperty, lineWidthProperty, textProperty, widthProperty, heightProperty, colorProperty, imageStringProperty, topProperty, bottomProperty, rightProperty, leftProperty, fieldTypeProperty, inlinesProperty, cellFormatProperty, rowFormatProperty, cellsProperty, rowsProperty, tableFormatProperty, blocksProperty, listLevelPatternProperty, abstractListIdProperty, levelsProperty, bookmarkTypeProperty, inlineFormatProperty, startAtProperty, characterSpacingProperty, scalingProperty, imagesProperty, Dictionary, isMetaFileProperty, restartLevelProperty, titleProperty, descriptionProperty, tabsProperty, tabJustificationProperty, tabLeaderProperty, positionProperty, contentControlPropertiesProperty } from '../../index';
/**
 * @private
 */
var HtmlExport = /** @class */ (function () {
    function HtmlExport() {
        this.document = undefined;
        this.prevListLevel = undefined;
        this.isOrdered = undefined;
        this.keywordIndex = undefined;
        /**
         * @private
         */
        this.fieldCheck = 0;
        /* eslint:enable:no-any */
    }
    HtmlExport.prototype.writeHtml = function (document, isOptimizeSfdt) {
        this.keywordIndex = isOptimizeSfdt ? 1 : 0;
        this.document = document;
        var html = '';
        if (document.hasOwnProperty(imagesProperty[this.keywordIndex])) {
            this.serializeImages(document[imagesProperty[this.keywordIndex]]);
        }
        for (var i = 0; i < document[sectionsProperty[this.keywordIndex]].length; i++) {
            html += this.serializeSection(document[sectionsProperty[this.keywordIndex]][i]);
        }
        return html;
    };
    HtmlExport.prototype.serializeImages = function (data) {
        this.images = new Dictionary();
        for (var img in data) {
            if (Array.isArray(data["" + img])) {
                this.images.add(parseInt(img), data["" + img]);
            }
            else {
                var images = [];
                images.push(data["" + img]);
                this.images.add(parseInt(img), images);
            }
        }
    };
    HtmlExport.prototype.serializeSection = function (section) {
        var string = '';
        var listLevel = undefined;
        var listCloseCount = [];
        for (var i = 0; i < section[blocksProperty[this.keywordIndex]].length; i++) {
            var block = section[blocksProperty[this.keywordIndex]][i];
            if (block.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                string += this.serializeParagraph(block, listCloseCount);
                listLevel = this.getListLevel(block);
            }
            else if (block.hasOwnProperty(blocksProperty[this.keywordIndex])) {
                string += this.serializeSection(block);
            }
            else {
                string += this.closeList();
                string += this.serializeTable(block);
            }
        }
        if (listCloseCount.length > 0 && (isNullOrUndefined(listLevel) || isNullOrUndefined(this.prevListLevel) || (this.prevListLevel[restartLevelProperty[this.keywordIndex]] === listLevel[restartLevelProperty[this.keywordIndex]] && this.prevListLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]] === listLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]]))) {
            while (listCloseCount.length > 0) {
                string += this.closeList();
                listCloseCount.pop();
            }
        }
        string += this.closeList();
        this.prevListLevel = undefined;
        this.isOrdered = undefined;
        return string;
    };
    // Serialize Paragraph
    HtmlExport.prototype.serializeParagraph = function (paragraph, listCloseCount) {
        var blockStyle = '';
        var isList = false;
        var isPreviousList = false;
        var restartLevel = undefined;
        var leftIndent = 0;
        if (!isNullOrUndefined(this.prevListLevel)) {
            isPreviousList = true;
        }
        var tagAttributes = [];
        var listLevel = undefined;
        if (!isNullOrUndefined(paragraph[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]])) {
            listLevel = this.getListLevel(paragraph);
            if (!isPreviousList) {
                this.prevListLevel = listLevel;
            }
            if (this.prevListLevel !== listLevel) {
                isPreviousList = false;
            }
            if (!isNullOrUndefined(listCloseCount) && !isNullOrUndefined(listLevel) && !isNullOrUndefined(this.prevListLevel) && ((this.prevListLevel[restartLevelProperty[this.keywordIndex]] < listLevel[restartLevelProperty[this.keywordIndex]] && this.prevListLevel !== listLevel) || (this.prevListLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]] !== listLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]]))) {
                listCloseCount.push(listCloseCount.length);
                restartLevel = this.prevListLevel[restartLevelProperty[this.keywordIndex]];
                leftIndent = this.prevListLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]];
            }
            this.prevListLevel = listLevel;
        }
        if (!isNullOrUndefined(listCloseCount) && listCloseCount.length > 0 && (isNullOrUndefined(listLevel) || isNullOrUndefined(this.prevListLevel) || (this.prevListLevel[restartLevelProperty[this.keywordIndex]] === restartLevel && this.prevListLevel[paragraphFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]] === leftIndent))) {
            while (listCloseCount.length > 0) {
                blockStyle += this.closeList();
                listCloseCount.pop();
            }
        }
        if (!isPreviousList && !(listCloseCount && listCloseCount.length !== 0)) {
            blockStyle += this.closeList();
        }
        if (!isNullOrUndefined(listLevel)) {
            isList = true;
        }
        if (isList && !isPreviousList) {
            blockStyle += this.getHtmlList(listLevel, paragraph[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]][listLevelNumberProperty[this.keywordIndex]]);
        }
        tagAttributes.push('style="' + this.serializeParagraphStyle(paragraph, '', isList) + ';' + 'white-space:pre' + '"');
        if (isList) {
            blockStyle += this.createAttributesTag('li', tagAttributes);
        }
        else {
            this.prevListLevel = undefined;
            this.isOrdered = undefined;
            blockStyle += this.createAttributesTag(this.getStyleName(paragraph[paragraphFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]]), tagAttributes);
        }
        if (paragraph[inlinesProperty[this.keywordIndex]].length === 0) {
            //Handled to preserve non breaking space for empty paragraphs similar to MS Word behavior.
            blockStyle += '<span />';
        }
        else {
            blockStyle = this.serializeInlines(paragraph, blockStyle);
        }
        if (isList) {
            blockStyle += this.endTag('li');
            if (blockStyle.indexOf('<ul') > -1) {
                this.isOrdered = false;
            }
            else if (blockStyle.indexOf('<ol') > -1) {
                this.isOrdered = true;
            }
        }
        else {
            blockStyle += this.endTag(this.getStyleName(paragraph[paragraphFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]]));
        }
        return blockStyle;
    };
    HtmlExport.prototype.closeList = function () {
        var blockStyle = '';
        if (!isNullOrUndefined(this.isOrdered)) {
            if (this.isOrdered) {
                blockStyle = this.endTag('ol');
            }
            else {
                blockStyle = this.endTag('ul');
            }
            this.isOrdered = undefined;
        }
        return blockStyle;
    };
    HtmlExport.prototype.getListLevel = function (paragraph) {
        var listLevel = undefined;
        var list = undefined;
        for (var i = 0; i < this.document[listsProperty[this.keywordIndex]].length; i++) {
            if (this.document[listsProperty[this.keywordIndex]][i][listIdProperty[this.keywordIndex]] === paragraph[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]][listIdProperty[this.keywordIndex]]) {
                list = this.document[listsProperty[this.keywordIndex]][i];
                break;
            }
        }
        if (list) {
            for (var j = 0; j < this.document[abstractListsProperty[this.keywordIndex]].length; j++) {
                if (this.document[abstractListsProperty[this.keywordIndex]][j][abstractListIdProperty[this.keywordIndex]] === list[abstractListIdProperty[this.keywordIndex]]) {
                    var levelNumber = paragraph[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]][listLevelNumberProperty[this.keywordIndex]];
                    listLevel = this.document[abstractListsProperty[this.keywordIndex]][j][levelsProperty[this.keywordIndex]][levelNumber];
                    break;
                }
            }
        }
        return listLevel;
    };
    HtmlExport.prototype.getHtmlList = function (listLevel, levelNumer) {
        //if (start == null || (start != null && start.Paragraph != this)) {
        //    let block: BlockAdv = this.GetPreviousBlock();
        //    if (block instanceof ParagraphAdv) {
        //        let previousListLevel: ListLevelAdv = (block as ParagraphAdv).ParagraphFormat.ListFormat.ListLevel;
        //        if (previousListLevel == listLevel)
        //            return "";
        //    }
        //}
        var html = '';
        if (listLevel[listLevelPatternProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 10 : 'Bullet')) {
            html += '<ul type="';
            switch (levelNumer) {
                case 0:
                    html += 'disc';
                    listLevel[characterFormatProperty[this.keywordIndex]][fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                    break;
                case 1:
                    html += 'circle';
                    listLevel[characterFormatProperty[this.keywordIndex]][fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                    break;
                case 2:
                    html += 'square';
                    listLevel[characterFormatProperty[this.keywordIndex]][fontFamilyProperty[this.keywordIndex]] = 'Wingdings';
                    break;
                default:
                    html += 'disc';
                    listLevel[characterFormatProperty[this.keywordIndex]][fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                    break;
            }
            html += '">';
        }
        else {
            html += '<ol type="';
            switch (listLevel[listLevelPatternProperty[this.keywordIndex]]) {
                case 'UpRoman':
                case 2:
                    html += 'I';
                    break;
                case 'LowRoman':
                case 3:
                    html += 'i';
                    break;
                case 'UpLetter':
                case 4:
                    html += 'A';
                    break;
                case 'LowLetter':
                case 5:
                    html += 'a';
                    break;
                default:
                    html += '1';
                    break;
            }
            html += '" start="' + listLevel[startAtProperty[this.keywordIndex]].toString() + '">';
        }
        return html;
    };
    //SerializeInlines
    HtmlExport.prototype.serializeInlines = function (paragraph, blockStyle) {
        var inline = undefined;
        var i = 0;
        var tabCount = 0;
        while (paragraph[inlinesProperty[this.keywordIndex]].length > i) {
            inline = paragraph[inlinesProperty[this.keywordIndex]][i];
            if ((inline.hasOwnProperty(textProperty[this.keywordIndex])
                && inline[textProperty[this.keywordIndex]] === '\t')) {
                tabCount++;
                i++;
                continue;
            }
            else if (tabCount > 0) {
                var tagAttributes = [];
                tagAttributes.push('style="mso-tab-count:' + tabCount.toString() + '"');
                blockStyle += this.createAttributesTag('span', tagAttributes) + this.endTag('span');
                tabCount = 0;
            }
            if (inline.hasOwnProperty(imageStringProperty[this.keywordIndex])) {
                blockStyle += this.serializeImageContainer(inline);
            }
            else if (inline.hasOwnProperty(fieldTypeProperty[this.keywordIndex])) {
                if (inline[fieldTypeProperty[this.keywordIndex]] === 0) {
                    var fieldCode = paragraph[inlinesProperty[this.keywordIndex]][i + 1];
                    if (isNullOrUndefined(fieldCode[textProperty[this.keywordIndex]])) {
                        fieldCode = paragraph[inlinesProperty[this.keywordIndex]][i + 2];
                    }
                    if (!isNullOrUndefined(fieldCode) && !isNullOrUndefined(fieldCode[textProperty[this.keywordIndex]]) &&
                        (fieldCode[textProperty[this.keywordIndex]].indexOf('TOC') >= 0 || fieldCode[textProperty[this.keywordIndex]].indexOf('HYPERLINK') >= 0)) {
                        this.fieldCheck = 1;
                        var tagAttributes = [];
                        tagAttributes.push('style="' + this.serializeInlineStyle(inline[characterFormatProperty[this.keywordIndex]]) + '"');
                        blockStyle += this.createAttributesTag('a', tagAttributes);
                    }
                    else {
                        this.fieldCheck = undefined;
                    }
                }
                else if (inline[fieldTypeProperty[this.keywordIndex]] === 2) {
                    if (!isNullOrUndefined(this.fieldCheck)) {
                        this.fieldCheck = 2;
                    }
                    else {
                        this.fieldCheck = 0;
                    }
                }
                else {
                    if (!isNullOrUndefined(this.fieldCheck) && this.fieldCheck !== 0) {
                        blockStyle += this.endTag('a');
                    }
                    this.fieldCheck = 0;
                }
            }
            else if (inline.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                blockStyle += this.serializeContentInlines(inline, blockStyle);
            }
            else {
                var text = isNullOrUndefined(inline[textProperty[this.keywordIndex]]) ? '' : inline[textProperty[this.keywordIndex]];
                if (inline.hasOwnProperty(bookmarkTypeProperty[this.keywordIndex])) {
                    switch (inline[bookmarkTypeProperty[this.keywordIndex]]) {
                        case 0:
                            blockStyle += '<a name=' + inline[nameProperty[this.keywordIndex]] + '>';
                            break;
                        case 1:
                            blockStyle += '</a>';
                            break;
                    }
                }
                if (this.fieldCheck === 0) {
                    blockStyle += this.serializeSpan(text, inline[characterFormatProperty[this.keywordIndex]]);
                }
                if (this.fieldCheck === 1) {
                    var hyperLink = text.replace(/"/g, '');
                    blockStyle += ' href= \"' + hyperLink.replace('HYPERLINK', '').trim();
                    blockStyle += '\"';
                    blockStyle += '>';
                }
                if (this.fieldCheck === 2) {
                    blockStyle += this.serializeSpan(text, inline[characterFormatProperty[this.keywordIndex]]);
                }
            }
            i++;
        }
        return blockStyle;
    };
    HtmlExport.prototype.serializeContentInlines = function (inline, inlineStyle) {
        inlineStyle = this.serializeInlines(inline, inlineStyle);
        return inlineStyle;
    };
    // Serialize Span
    HtmlExport.prototype.serializeSpan = function (spanText, characterFormat) {
        var spanClass = '';
        if (spanText.indexOf('\v') !== -1) {
            spanClass += '<br>';
            return spanClass.toString();
        }
        else if (spanText.indexOf('\f') !== -1) {
            spanClass += '<br style = "page-break-after:always;"/>';
            return spanClass.toString();
        }
        var tagAttributes = [];
        this.serializeInlineStyle(characterFormat);
        tagAttributes.push('style="' + this.serializeInlineStyle(characterFormat) + '"');
        spanClass += this.createAttributesTag('span', tagAttributes);
        // Todo: Need to handle it.
        // If the text starts with white-space, need to check whether it is a continuous space.
        // if (characterFormat.ownerBase instanceof WInline) {
        //     let inline: WInline = (characterFormat.ownerBase as WInline);
        //     if (inline instanceof WSpan && !isNullOrUndefined(inline.text) && inline.text !== '' && (inline as WSpan).text[0] === ' ') {
        //         Check previous inline until, it has valid rendered text.
        //         do {
        //             inline = WInline.getPreviousTextInline((inline as WSpan));
        //         } while (inline instanceof WSpan && !isNullOrUndefined(inline.text));
        //     } else {
        //         inline = undefined;
        //     }
        //     If current white-space is a continuation of consecutive spaces, this will be set true.
        //     ignoreFirstSpace = inline instanceof WSpan && !isNullOrUndefined(inline.text)
        //         && (inline as WSpan).text[(inline as WSpan).text.length - 1] === ' ';
        // }
        var text = this.decodeHtmlNames(spanText.toString());
        // if (text.length === 0) {
        //     text = '&nbsp';
        // }
        spanClass += text;
        spanClass += this.endTag('span');
        return spanClass.toString();
    };
    /**
     * @private
     * @param {string} style - style name.
     * @returns {string} - return heading tag.
     */
    HtmlExport.prototype.getStyleName = function (style) {
        switch (style) {
            case 'Heading 1':
                return 'h1';
            case 'Heading 2':
                return 'h2';
            case 'Heading 3':
                return 'h3';
            case 'Heading 4':
                return 'h4';
            case 'Heading 5':
                return 'h5';
            default:
                return 'p';
        }
    };
    //Serialize Image
    HtmlExport.prototype.serializeImageContainer = function (image) {
        var imageStyle = '';
        var tagAttributes = [];
        this.serializeInlineStyle(image[characterFormatProperty[this.keywordIndex]]);
        var imageSource = '';
        if (!isNullOrUndefined(image[imageStringProperty[this.keywordIndex]])) {
            var base64ImageString = this.images.get(parseInt(image[imageStringProperty[this.keywordIndex]]));
            imageSource = base64ImageString[HelperMethods.parseBoolValue(image[isMetaFileProperty[this.keywordIndex]]) ? 1 : 0];
        }
        var width = HelperMethods.convertPointToPixel(image[widthProperty[this.keywordIndex]]);
        var height = HelperMethods.convertPointToPixel(image[heightProperty[this.keywordIndex]]);
        tagAttributes.push('width="' + width.toString() + '"');
        tagAttributes.push('height="' + height.toString() + '"');
        tagAttributes.push('src="' + imageSource + '"');
        imageStyle += this.createAttributesTag('img', tagAttributes);
        imageStyle += (this.endTag('img'));
        return imageStyle.toString();
    };
    // Serialize Table Cell
    HtmlExport.prototype.serializeCell = function (cell, row) {
        var blockStyle = '';
        var tagAttributes = [];
        var cellHtml = '';
        tagAttributes = [];
        if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]])) {
            //if (cell.cellFormat.shading.backgroundColor !== Color.FromArgb(0, 0, 0, 0)) {
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]] !== 'empty') {
                tagAttributes.push('bgcolor="' + HelperMethods.getColor(cell[cellFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]]) + '"');
            }
            // }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]] > 1) {
                tagAttributes.push('colspan="' + cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]].toString() + '"');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][rowSpanProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][rowSpanProperty[this.keywordIndex]] > 1) {
                tagAttributes.push('rowspan="' + cell[cellFormatProperty[this.keywordIndex]][rowSpanProperty[this.keywordIndex]].toString() + '"');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][cellWidthProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][cellWidthProperty[this.keywordIndex]] !== 0) {
                var cellWidth = HelperMethods.convertPointToPixel(cell[cellFormatProperty[this.keywordIndex]][cellWidthProperty[this.keywordIndex]]);
                tagAttributes.push('width="' + cellWidth.toString() + '"');
            }
            var cellAlignment = isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]) ? 'top' :
                this.convertVerticalAlignment(cell[cellFormatProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]);
            tagAttributes.push('valign="' + cellAlignment + '"');
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]] !== 0) {
                cellHtml += ('padding-left:' + cell[cellFormatProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]] !== 0) {
                cellHtml += ('padding-right:' + cell[cellFormatProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][topMarginProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][topMarginProperty[this.keywordIndex]] !== 0) {
                cellHtml += ('padding-top:' + cell[cellFormatProperty[this.keywordIndex]][topMarginProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][bottomMarginProperty[this.keywordIndex]]) && cell[cellFormatProperty[this.keywordIndex]][bottomMarginProperty[this.keywordIndex]] !== 0) {
                cellHtml += ('padding-bottom:' + cell[cellFormatProperty[this.keywordIndex]][bottomMarginProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!isNullOrUndefined(cell[cellFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]])) {
                cellHtml += this.serializeCellBordersStyle(cell[cellFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]], row);
            }
        }
        if (cellHtml.length !== 0) {
            tagAttributes.push('style="' + cellHtml + '"');
        }
        blockStyle += (this.createAttributesTag('td', tagAttributes));
        for (var k = 0; k < cell[blocksProperty[this.keywordIndex]].length; k++) {
            var block = cell[blocksProperty[this.keywordIndex]][k];
            if (block.hasOwnProperty(rowsProperty[this.keywordIndex])) {
                blockStyle += this.serializeTable(block);
            }
            else if (block.hasOwnProperty(blocksProperty[this.keywordIndex])) {
                blockStyle += this.serializeSection(block);
            }
            else {
                blockStyle += this.serializeParagraph(block);
            }
        }
        blockStyle += (this.endTag('td'));
        return blockStyle;
    };
    HtmlExport.prototype.convertVerticalAlignment = function (cellVerticalAlignment) {
        switch (cellVerticalAlignment) {
            case 'Center':
            case 1:
                return 'middle';
            case 'Bottom':
            case 2:
                return 'bottom';
            default:
                return 'top';
        }
    };
    // Serialize Table
    HtmlExport.prototype.serializeTable = function (table) {
        var html = '';
        html += this.createTableStartTag(table);
        for (var j = 0; j < table[rowsProperty[this.keywordIndex]].length; j++) {
            html += this.serializeRow(table[rowsProperty[this.keywordIndex]][j]);
        }
        html += this.createTableEndTag();
        return html;
    };
    // Serialize Row
    HtmlExport.prototype.serializeRow = function (row) {
        var html = '';
        html += this.createRowStartTag(row);
        for (var k = 0; k < row[cellsProperty[this.keywordIndex]].length; k++) {
            html += this.serializeCell(row[cellsProperty[this.keywordIndex]][k], row);
        }
        return html;
    };
    // Serialize Styles
    HtmlExport.prototype.serializeParagraphStyle = function (paragraph, className, isList, keywordIndex) {
        var paragraphClass = '';
        var editor;
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = keywordIndex;
        }
        if (paragraph[inlinesProperty[this.keywordIndex]].length > 0) {
            paragraphClass += this.serializeCharacterFormat(paragraph[characterFormatProperty[this.keywordIndex]]);
        }
        var isEmptyLine = false;
        if (paragraph[inlinesProperty[this.keywordIndex]].length == 0) {
            isEmptyLine = true;
        }
        paragraphClass += this.serializeCharacterFormat(paragraph[characterFormatProperty[this.keywordIndex]], isEmptyLine);
        paragraphClass += this.serializeParagraphFormat(paragraph[paragraphFormatProperty[this.keywordIndex]], isList);
        return paragraphClass;
    };
    HtmlExport.prototype.serializeInlineStyle = function (characterFormat) {
        return this.serializeCharacterFormat(characterFormat);
    };
    HtmlExport.prototype.serializeTableBorderStyle = function (borders) {
        var borderStyle = '';
        var border = {};
        //LeftBorder
        border = borders[leftProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'left');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-left-style:none;');
        }
        //TopBorder
        border = borders[topProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'top');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-top-style:none;');
        }
        //RightBorder
        border = borders[rightProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'right');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-right-style:none;');
        }
        //BottomBorder
        border = borders[bottomProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'bottom');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-bottom-style:none;');
        }
        return borderStyle;
    };
    HtmlExport.prototype.serializeCellBordersStyle = function (borders, row) {
        var borderStyle = '';
        //borderStyle = 'border:solid 1px;';
        // if (borders.left.color) {
        //     borderStyle += ('border-left-color:' + HelperMethods.getColor(borders.left.color));
        //     borderStyle += ';';
        // }
        // borderStyle += this.serializeBorderStyle(borders.left, 'left');
        // if (!isNullOrUndefined(borders.right.color)) {
        //     borderStyle += ('border-right-color:' + HelperMethods.getColor(borders.right.color));
        //     borderStyle += ';';
        // }
        // borderStyle += this.serializeBorderStyle(borders.right, 'right');
        // if (!isNullOrUndefined(borders.top.color)) {
        //     borderStyle += ('border-top-color:' + HelperMethods.getColor(borders.top.color));
        //     borderStyle += ';';
        // }
        // borderStyle += this.serializeBorderStyle(borders.top, 'top');
        // if (!isNullOrUndefined(borders.bottom.color)) {
        //     borderStyle += ('border-bottom-color:' + HelperMethods.getColor(borders.bottom.color));
        //     borderStyle += ';';
        // }
        // borderStyle += this.serializeBorderStyle(borders.bottom, 'bottom');
        var border = {};
        //LeftBorder
        border = borders[leftProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'left');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-left-style:none;');
        }
        else if (!isNullOrUndefined(row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][leftProperty[this.keywordIndex]])) {
            border = row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][leftProperty[this.keywordIndex]];
            if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
                border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'left');
            }
        }
        //TopBorder
        border = borders[topProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'top');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-top-style:none;');
        }
        else if (!isNullOrUndefined(row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][topProperty[this.keywordIndex]])) {
            border = row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][topProperty[this.keywordIndex]];
            if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
                border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'top');
            }
        }
        //RightBorder
        border = borders[rightProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'right');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-right-style:none;');
        }
        else if (!isNullOrUndefined(row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][rightProperty[this.keywordIndex]])) {
            border = row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][rightProperty[this.keywordIndex]];
            if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
                border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'right');
            }
        }
        //BottomBorder
        border = borders[bottomProperty[this.keywordIndex]];
        if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
            border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
            borderStyle += this.serializeBorderStyle(border, 'bottom');
        }
        else if (!isNullOrUndefined(border) && HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) {
            borderStyle += ('border-bottom-style:none;');
        }
        else if (!isNullOrUndefined(row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][bottomProperty[this.keywordIndex]])) {
            border = row[rowFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]][bottomProperty[this.keywordIndex]];
            if (!isNullOrUndefined(border) && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[colorProperty[this.keywordIndex]] = isNullOrUndefined(border[colorProperty[this.keywordIndex]]) ? "#000000" : border[colorProperty[this.keywordIndex]];
                border[lineWidthProperty[this.keywordIndex]] = isNullOrUndefined(border[lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'bottom');
            }
        }
        return borderStyle;
    };
    HtmlExport.prototype.serializeBorderStyle = function (border, borderPosition) {
        var borderStyle = '';
        borderStyle += ('border-' + borderPosition + '-style:' + this.convertBorderLineStyle(border[lineStyleProperty[this.keywordIndex]]));
        borderStyle += ';';
        if (border[lineWidthProperty[this.keywordIndex]] > 0) {
            borderStyle += ('border-' + borderPosition + '-width:' + border[lineWidthProperty[this.keywordIndex]].toString() + 'pt;');
        }
        //if (border.color !== Color.FromArgb(0, 0, 0, 0))
        if (!isNullOrUndefined(border[colorProperty[this.keywordIndex]])) {
            borderStyle += ('border-' + borderPosition + '-color:' + HelperMethods.getColor(border[colorProperty[this.keywordIndex]]) + ';');
        }
        return borderStyle;
    };
    HtmlExport.prototype.convertBorderLineStyle = function (lineStyle) {
        switch (lineStyle) {
            case 'Single':
            case 0:
                return 'solid';
            case 'None':
            case 1:
                return 'none';
            case 'Dot':
            case 2:
                return 'dotted';
            case 'DashSmallGap':
            case 'DashLargeGap':
            case 'DashDot':
            case 'DashDotDot':
            case 3:
            case 4:
            case 5:
            case 6:
                return 'dashed';
            case 'Double':
            case 'Triple':
            case 'ThinThickSmallGap':
            case 'ThickThinSmallGap':
            case 'ThinThickThinSmallGap':
            case 'ThinThickMediumGap':
            case 'ThickThinMediumGap':
            case 'ThinThickThinMediumGap':
            case 'ThinThickLargeGap':
            case 'ThickThinLargeGap':
            case 'ThinThickThinLargeGap':
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                return 'double';
            case 'SingleWavy':
            case 18:
                return 'solid';
            case 'DoubleWavy':
            case 19:
                return 'double';
            case 'DashDotStroked':
            case 20:
                return 'solid';
            case 'Emboss3D':
            case 21:
                return 'ridge';
            case 'Engrave3D':
            case 22:
                return 'groove';
            case 'Outset':
            case 23:
                return 'outset';
            case 'Inset':
            case 24:
                return 'inset';
            default:
                return 'solid';
        }
    };
    // Serialize Format
    HtmlExport.prototype.serializeCharacterFormat = function (characterFormat, isEmptyLine) {
        if (!isNullOrUndefined(characterFormat[inlineFormatProperty[this.keywordIndex]])) {
            return this.serializeCharacterFormat(characterFormat[inlineFormatProperty[this.keywordIndex]], isEmptyLine);
        }
        var propertyValue;
        var charStyle = '';
        charStyle += 'font-weight';
        charStyle += ':';
        charStyle += HelperMethods.parseBoolValue(characterFormat[boldProperty[this.keywordIndex]]) ? 'bold' : 'normal';
        charStyle += ';';
        charStyle += 'font-style';
        charStyle += ':';
        if (HelperMethods.parseBoolValue(characterFormat[italicProperty[this.keywordIndex]])) {
            charStyle += 'italic';
        }
        else {
            charStyle += 'normal';
        }
        charStyle += ';';
        charStyle += this.serializeTextDecoration(characterFormat);
        //Text Baseline Alignment
        if (characterFormat[baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Superscript') || characterFormat[baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Subscript')) {
            charStyle += 'vertical-align';
            charStyle += ':';
            charStyle += characterFormat[baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Superscript') ? 'super' : 'sub';
            charStyle += ';';
        }
        //Text Foreground and Background Color
        if (!isNullOrUndefined(characterFormat[highlightColorProperty[this.keywordIndex]]) && characterFormat[highlightColorProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'NoColor') && !isEmptyLine) {
            charStyle += 'background-color';
            charStyle += ':';
            charStyle += this.keywordIndex == 1 ? this.getHighlightColorCode(characterFormat[highlightColorProperty[this.keywordIndex]]) : HelperMethods.getHighlightColorCode(characterFormat.highlightColor.toString());
            charStyle += ';';
        }
        //Font Color
        propertyValue = characterFormat[fontColorProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            charStyle += 'color';
            charStyle += ':';
            charStyle += HelperMethods.getColor(propertyValue);
            charStyle += ';';
        }
        if (!isNullOrUndefined(characterFormat[allCapsProperty[this.keywordIndex]]) && HelperMethods.parseBoolValue(characterFormat[allCapsProperty[this.keywordIndex]])) {
            charStyle += 'text-transform';
            charStyle += ':';
            charStyle += 'uppercase';
            charStyle += ';';
        }
        propertyValue = characterFormat[fontSizeProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            charStyle += 'font-size';
            charStyle += ':';
            charStyle += propertyValue.toString();
            charStyle += 'pt';
            charStyle += ';';
        }
        propertyValue = characterFormat[fontFamilyProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            charStyle += 'font-family';
            charStyle += ':';
            charStyle += propertyValue.toString();
            charStyle += ';';
        }
        propertyValue = characterFormat[characterSpacingProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            charStyle += 'letter-spacing';
            charStyle += ':';
            charStyle += propertyValue.toString();
            charStyle += 'pt';
            charStyle += ';';
        }
        propertyValue = characterFormat[scalingProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            charStyle += 'transform:scaleX(';
            charStyle += (propertyValue / 100).toString();
            charStyle += ')';
            charStyle += ';';
        }
        return charStyle.toString();
    };
    HtmlExport.prototype.serializeTextDecoration = function (characterFormat) {
        var charStyle = 'text-decoration:';
        var value = '';
        // Double strike through will become Single strike through while saving HTML using MS Word.
        if (characterFormat[strikethroughProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'SingleStrike') || characterFormat[strikethroughProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'DoubleStrike')) {
            value += 'line-through ';
        }
        if (!isNullOrUndefined(characterFormat[underlineProperty[this.keywordIndex]]) && characterFormat[underlineProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None')) {
            value += 'underline';
        }
        if (value.length > 1) {
            value = charStyle + value + ';';
        }
        return value;
    };
    /**
     * @private
     */
    HtmlExport.prototype.serializeParagraphFormat = function (paragraphFormat, isList, keywordIndex) {
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = keywordIndex;
        }
        if (!isNullOrUndefined(paragraphFormat[inlineFormatProperty[this.keywordIndex]])) {
            return this.serializeParagraphFormat(paragraphFormat[inlineFormatProperty[this.keywordIndex]], isList);
        }
        var propertyValue;
        var paraStyle = '';
        propertyValue = this.getTextAlignment(paragraphFormat[textAlignmentProperty[this.keywordIndex]]);
        if (!isNullOrUndefined(propertyValue)) {
            paraStyle += 'text-align:' + propertyValue.toLowerCase() + ';';
        }
        propertyValue = paragraphFormat[beforeSpacingProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            paraStyle += 'margin-top:' + propertyValue.toString() + 'pt; ';
        }
        propertyValue = paragraphFormat[rightIndentProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            paraStyle += 'margin-right:' + propertyValue.toString() + 'pt; ';
        }
        propertyValue = paragraphFormat[afterSpacingProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            paraStyle += 'margin-bottom:' + propertyValue.toString() + 'pt; ';
        }
        propertyValue = paragraphFormat[leftIndentProperty[this.keywordIndex]];
        if (isList) {
            // if (isNullOrUndefined(propertyValue)) {
            //     propertyValue = -36;
            // } else {
            //     propertyValue -= 36;
            // }
            propertyValue = 0;
        }
        if (!isNullOrUndefined(propertyValue)) {
            paraStyle += 'margin-left:' + propertyValue.toString() + 'pt; ';
        }
        propertyValue = paragraphFormat[firstLineIndentProperty[this.keywordIndex]];
        if (isList) {
            // if (isNullOrUndefined(propertyValue)) {
            //     propertyValue = 18;
            // } else {
            //     propertyValue += 18;
            // }
            propertyValue = 0;
        }
        if (!isNullOrUndefined(propertyValue) && propertyValue !== 0) {
            paraStyle += 'text-indent:' + propertyValue.toString() + 'pt;';
        }
        if (!isNullOrUndefined(paragraphFormat[tabsProperty[this.keywordIndex]]) && paragraphFormat[tabsProperty[this.keywordIndex]].length > 0) {
            paraStyle += this.serializeTabs(paragraphFormat[tabsProperty[this.keywordIndex]]);
        }
        propertyValue = paragraphFormat[lineSpacingProperty[this.keywordIndex]];
        if (!isNullOrUndefined(propertyValue)) {
            var lineSpacingType = paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]];
            var isMultiple = lineSpacingType === (this.keywordIndex == 1 ? 0 : 'Multiple');
            var isAtLeast = lineSpacingType === (this.keywordIndex == 1 ? 0 : 'AtLeast');
            //Write Default linespacing
            if (propertyValue == 1 && isMultiple) {
                paraStyle += 'line-height:' + 'normal;';
            }
            else if (isMultiple) {
                paraStyle += 'line-height:' + (Math.abs(propertyValue) * 100).toString() + '%;';
            } //Writes the lineSpacing value other than lineSpacingRule Atleast and lineSpacing value less than 12
            else if (!isAtLeast || propertyValue >= 12) {
                paraStyle += 'line-height:' + propertyValue.toString() + 'pt;';
            }
        }
        return paraStyle.toString();
    };
    HtmlExport.prototype.serializeTabs = function (tabs) {
        var tabsStyle = 'tab-stops:';
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.hasOwnProperty(tabJustificationProperty[this.keywordIndex])) {
                var tabJustification = this.getTabJustification(tab[tabJustificationProperty[this.keywordIndex]]);
                if (tabJustification !== '') {
                    tabsStyle += tabJustification + ' ';
                }
            }
            if (tab.hasOwnProperty(tabLeaderProperty[this.keywordIndex])) {
                var tabLeader = this.getTabLeader(tab[tabLeaderProperty[this.keywordIndex]]);
                if (tabLeader !== '') {
                    tabsStyle += tabLeader + ' ';
                }
            }
            if (tab.hasOwnProperty(positionProperty[this.keywordIndex])) {
                tabsStyle += tab[positionProperty[this.keywordIndex]].toString() + 'pt';
            }
            if (i !== tabs.length - 1) {
                tabsStyle += ' ';
            }
        }
        tabsStyle += ';';
        return tabsStyle;
    };
    HtmlExport.prototype.getTabLeader = function (tabLeader) {
        switch (tabLeader) {
            case 'Dot':
            case 2:
                return 'dotted';
            case 'Hyphen':
            case 3:
                return 'dashed';
            case 'Underscore':
            case 4:
                return 'heavy';
            default:
                return '';
        }
    };
    HtmlExport.prototype.getTabJustification = function (tabJustification) {
        switch (tabJustification) {
            case 'Bar':
            case 1:
                return 'bar';
            case 'Center':
            case 2:
                return 'center';
            case 'Decimal':
            case 3:
                return 'decimal';
            case 'Right':
            case 5:
                return 'right';
            default:
                return '';
        }
    };
    HtmlExport.prototype.createAttributesTag = function (tagValue, localProperties) {
        var sb = '';
        sb += '<';
        sb += tagValue;
        for (var i = 0; i < localProperties.length; i++) {
            sb += ' ';
            sb += localProperties[i];
        }
        if (tagValue !== 'a') {
            sb += '>';
        }
        return sb;
    };
    HtmlExport.prototype.createTag = function (tagValue) {
        var s = '';
        s += '<';
        s += tagValue;
        s += '>';
        return s;
    };
    HtmlExport.prototype.endTag = function (tagValue) {
        var sb = '';
        sb += '<';
        sb += '/';
        sb += tagValue;
        sb += '>';
        return sb;
    };
    HtmlExport.prototype.createTableStartTag = function (table) {
        var blockStyle = '';
        var tableStyle = '';
        var tagAttributes = [];
        //tagAttributes.push('border="' + '1"');
        if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]])) {
            //if (table.tableFormat.shading.backgroundColor !== Color.FromArgb(0, 0, 0, 0)) {
            if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]]) && !isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]]) && table[tableFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]] !== 'empty') {
                tagAttributes.push('bgcolor="' + HelperMethods.getColor(table[tableFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]][backgroundColorProperty[this.keywordIndex]]) + '"');
            }
            //}
            if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][cellSpacingProperty[this.keywordIndex]]) && table[tableFormatProperty[this.keywordIndex]][cellSpacingProperty[this.keywordIndex]] > 0) {
                tagAttributes.push('cellspacing="' + (((table[tableFormatProperty[this.keywordIndex]][cellSpacingProperty[this.keywordIndex]] * 72) / 96) * 2).toString() + '"');
            }
            else {
                tableStyle += ('border-collapse:collapse;');
            }
            tagAttributes.push('cellpadding="' + '0"');
            //Table title property
            if (!isNullOrUndefined(table[titleProperty[this.keywordIndex]])) {
                tagAttributes.push('title="' + table[titleProperty[this.keywordIndex]] + '"');
            }
            //Table description property
            if (!isNullOrUndefined(table[descriptionProperty[this.keywordIndex]])) {
                tagAttributes.push('summary="' + table[descriptionProperty[this.keywordIndex]] + '"');
            }
            if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]]) && table[tableFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]] !== 0 &&
                table[tableFormatProperty[this.keywordIndex]][tableAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Left')) {
                tableStyle += 'margin-left:' + (table[tableFormatProperty[this.keywordIndex]][leftIndentProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]])) {
                tableStyle += this.serializeTableWidth(table[tableFormatProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]])) {
                tableStyle += this.serializeTableBorderStyle(table[tableFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]]);
            }
        }
        if (tableStyle.length !== 0) {
            tagAttributes.push('style="', tableStyle.toString() + '"');
        }
        return blockStyle += (this.createAttributesTag('table', tagAttributes));
    };
    HtmlExport.prototype.serializeTableWidth = function (tableFormat) {
        var width = '';
        switch (tableFormat[preferredWidthTypeProperty[this.keywordIndex]]) {
            case 'Percent':
            case 1:
                width += 'width: ' + tableFormat[preferredWidthProperty[this.keywordIndex]].toString() + '%;';
                break;
            case 'Point':
            case 2:
                width += 'width: ' + tableFormat[preferredWidthProperty[this.keywordIndex]].toString() + 'pt;';
                break;
            case 'Auto':
            case 0:
                width += 'width: auto;';
                break;
        }
        return width;
    };
    HtmlExport.prototype.getHighlightColorCode = function (highlightColor) {
        var color = '#ffffff';
        switch (highlightColor) {
            case 1:
                color = '#ffff00';
                break;
            case 2:
                color = '#00ff00';
                break;
            case 3:
                color = '#00ffff';
                break;
            case 4:
                color = '#ff00ff';
                break;
            case 5:
                color = '#0000ff';
                break;
            case 6:
                color = '#ff0000';
                break;
            case 7:
                color = '#000080';
                break;
            case 8:
                color = '#008080';
                break;
            case 9:
                color = '#008000';
                break;
            case 10:
                color = '#800080';
                break;
            case 11:
                color = '#800000';
                break;
            case 12:
                color = '#808000';
                break;
            case 13:
                color = '#808080';
                break;
            case 14:
                color = '#c0c0c0';
                break;
            case 15:
                color = '#000000';
                break;
        }
        return color;
    };
    HtmlExport.prototype.getTextAlignment = function (textAlignment) {
        switch (textAlignment) {
            case 1:
                return 'Center';
            case 2:
                return 'Right';
            case 3:
                return 'Justify';
            default:
                return 'Left';
        }
    };
    HtmlExport.prototype.createTableEndTag = function () {
        var blockStyle = '';
        blockStyle += (this.endTag('table'));
        return blockStyle;
    };
    HtmlExport.prototype.createRowStartTag = function (row) {
        var blockStyle = '';
        var tagAttributes = [];
        if (HelperMethods.parseBoolValue(row[rowFormatProperty[this.keywordIndex]][isHeaderProperty[this.keywordIndex]])) {
            blockStyle += (this.createTag('thead'));
        }
        if (!isNullOrUndefined(row[rowFormatProperty[this.keywordIndex]][heightProperty[this.keywordIndex]]) && row[rowFormatProperty[this.keywordIndex]][heightProperty[this.keywordIndex]] > 0) {
            var height = HelperMethods.convertPointToPixel(row[rowFormatProperty[this.keywordIndex]][heightProperty[this.keywordIndex]]);
            tagAttributes.push('height="' + height + '"');
        }
        return blockStyle + this.createAttributesTag('tr', tagAttributes);
    };
    HtmlExport.prototype.createRowEndTag = function (row) {
        var blockStyle = '';
        blockStyle += (this.endTag('tr'));
        if (HelperMethods.parseBoolValue(row[rowFormatProperty[this.keywordIndex]][isHeaderProperty[this.keywordIndex]])) {
            blockStyle += (this.endTag('thead'));
        }
        return blockStyle;
    };
    HtmlExport.prototype.decodeHtmlNames = function (text) {
        if (text === '\t') {
            return '&emsp;';
        }
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var splittedText = text.split(' ');
        var htmlText = '';
        if (splittedText.length > 0) {
            htmlText = splittedText[0];
            for (var i = 0; i < splittedText.length - 1; i++) {
                htmlText += ' ' + splittedText[i + 1];
            }
        }
        return htmlText;
    };
    return HtmlExport;
}());
export { HtmlExport };
