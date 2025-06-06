import { Dictionary } from '../../base/dictionary';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { TextPosition } from '../selection/selection-helper';
import { LineWidget, TextElementBox, ParagraphWidget, ListTextElementBox, FieldElementBox, ShapeElementBox, BookmarkElementBox, CommentCharacterElementBox } from '../viewer/page';
import { searchResultsChangeEvent } from '../../base/index';
/**
 * @private
 */
var TextSearch = /** @class */ (function () {
    function TextSearch(owner) {
        this.wordBefore = '\\b';
        this.wordAfter = '\\b';
        this.owner = owner;
        this.documentHelper = this.owner.documentHelper;
    }
    TextSearch.prototype.find = function (pattern, findOption) {
        var result = this.findNext(pattern, findOption, '0;0;0');
        if (!isNullOrUndefined(result)) {
            var eventArgs = { source: this.documentHelper.owner };
            this.documentHelper.owner.trigger(searchResultsChangeEvent, eventArgs);
        }
        return result;
    };
    TextSearch.prototype.findNext = function (pattern, findOption, hierarchicalPosition) {
        if (typeof pattern === 'string') {
            pattern = this.stringToRegex(pattern, findOption);
        }
        if (hierarchicalPosition === undefined) {
            hierarchicalPosition = '0;0;0';
        }
        this.owner.searchModule.textSearchResults.clearResults();
        var results = this.owner.searchModule.textSearchResults;
        this.findDocument(results, pattern, true, findOption, hierarchicalPosition);
        return results.length > 0, results.currentSearchResult;
    };
    TextSearch.prototype.stringToRegex = function (textToFind, option) {
        if (textToFind.indexOf('\\') > -1) {
            textToFind = textToFind.split('\\').join('\\\\');
        }
        if (textToFind.indexOf('(') > -1 || textToFind.indexOf(')') > -1 || textToFind.indexOf('.') > -1 || textToFind.indexOf('[') > -1
            || textToFind.indexOf(']') > -1 || textToFind.indexOf('$') > -1 || textToFind.indexOf('{') > -1
            || textToFind.indexOf('}') > -1 || textToFind.indexOf('*') > -1 || textToFind.indexOf('|') > -1
            || textToFind.indexOf('^') > -1 || textToFind.indexOf('?') > -1 || textToFind.indexOf('+') > -1) {
            var text = '';
            for (var i = 0; i < textToFind.length; i++) {
                if (textToFind[parseInt(i.toString(), 10)] === '(' || textToFind[parseInt(i.toString(), 10)] === ')' || textToFind[parseInt(i.toString(), 10)] === '.' || textToFind[parseInt(i.toString(), 10)] === '['
                    || textToFind[parseInt(i.toString(), 10)] === ']' || textToFind[parseInt(i.toString(), 10)] === '$' || textToFind[parseInt(i.toString(), 10)] === '{' || textToFind[parseInt(i.toString(), 10)] === '}'
                    || textToFind[parseInt(i.toString(), 10)] === '*' || textToFind[parseInt(i.toString(), 10)] === '|' || textToFind[parseInt(i.toString(), 10)] === '^' || textToFind[parseInt(i.toString(), 10)] === '?'
                    || textToFind[parseInt(i.toString(), 10)] === '+') {
                    text += '\\' + textToFind[parseInt(i.toString(), 10)];
                }
                else {
                    text += textToFind[parseInt(i.toString(), 10)];
                }
            }
            textToFind = text;
        }
        if (option === 'WholeWord' || option === 'CaseSensitiveWholeWord') {
            textToFind = this.wordBefore + textToFind + this.wordAfter;
        }
        return RegExp(textToFind, (option === 'CaseSensitive' || option === 'CaseSensitiveWholeWord') ? 'g' : 'ig');
    };
    TextSearch.prototype.isPatternEmpty = function (pattern) {
        var wordEmpty = this.wordBefore + this.wordAfter;
        var patternRegExp = pattern.toString();
        return (patternRegExp.length === 0 || patternRegExp === wordEmpty);
    };
    TextSearch.prototype.findAll = function (pattern, findOption, hierarchicalPosition) {
        if (typeof pattern === 'string') {
            pattern = this.stringToRegex(pattern, findOption);
        }
        if (hierarchicalPosition === undefined) {
            hierarchicalPosition = '0;0;0';
        }
        this.owner.searchModule.textSearchResults.clearResults();
        var results = this.owner.searchModule.textSearchResults;
        this.findDocument(results, pattern, false, findOption, hierarchicalPosition);
        if (results.length > 0 && results.currentIndex < 0) {
            results.currentIndex = 0;
        }
        if (!isNullOrUndefined(results.currentSearchResult)) {
            var eventArgs = { source: this.documentHelper.owner };
            this.documentHelper.owner.trigger(searchResultsChangeEvent, eventArgs);
            return results;
        }
        return undefined;
    };
    TextSearch.prototype.getElementInfo = function (inlineElement, indexInInline, includeNextLine, pattern, findOption, isFirstMatch, results, selectionEnd, isSpellCheck) {
        var inlines = inlineElement;
        var stringBuilder = '';
        var spans = new Dictionary();
        // eslint-disable  no-constant-condition
        var previousElementCount = 0;
        do {
            if (inlineElement instanceof TextElementBox && (!isNullOrUndefined(inlineElement.text) && inlineElement.text !== '')) {
                spans.add(inlineElement, isSpellCheck ? stringBuilder.length + previousElementCount : stringBuilder.length);
                previousElementCount = 0;
                // IndexInInline Handled specifically for simple find operation to start from starting point
                if (inlineElement === inlines) {
                    stringBuilder = stringBuilder + (inlineElement.text.substring(indexInInline));
                }
                else {
                    stringBuilder = stringBuilder + (inlineElement.text);
                }
            }
            else if (inlineElement instanceof FieldElementBox) {
                var fieldBegin = inlineElement;
                if (!isNullOrUndefined(fieldBegin.fieldEnd)) {
                    /* eslint-disable-next-line max-len */
                    inlineElement = isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                }
            }
            else if (inlineElement instanceof ShapeElementBox && !isNullOrUndefined(inlineElement.textFrame)
                && inlineElement.textFrame.childWidgets.length > 0) {
                this.findInlineText(inlineElement.textFrame, pattern, findOption, isFirstMatch, results, selectionEnd);
            }
            if (!(inlineElement instanceof TextElementBox) && !(inlineElement instanceof ListTextElementBox)) {
                previousElementCount += inlineElement.length;
            }
            if (!isNullOrUndefined(inlineElement) && isNullOrUndefined(inlineElement.nextNode)) {
                var splittedParagraph = inlineElement.paragraph.nextSplitWidget;
                if (!isSpellCheck && !isNullOrUndefined(splittedParagraph) && splittedParagraph !== inlineElement.paragraph
                    && splittedParagraph.childWidgets.length > 0 && splittedParagraph.childWidgets[0] instanceof LineWidget
                    && splittedParagraph.childWidgets[0].children.length > 0) {
                    inlineElement = splittedParagraph.childWidgets[0].children[0];
                    continue;
                }
                else {
                    break;
                }
            }
            if (!isNullOrUndefined(inlineElement)) {
                if ((!isNullOrUndefined(includeNextLine) && !includeNextLine)) {
                    var elementBoxes = inlineElement.line.children;
                    var length_1 = inlineElement.line.children.length;
                    if (elementBoxes.indexOf(inlineElement) < length_1 - 1) {
                        inlineElement = inlineElement.nextNode;
                    }
                    else {
                        inlineElement = undefined;
                        break;
                    }
                }
                else {
                    inlineElement = inlineElement.nextNode;
                }
            }
            // eslint-disable-next-line no-constant-condition
        } while (true);
        var text = stringBuilder.toString();
        return { elementsWithOffset: spans, fullText: text };
    };
    /* eslint-disable-next-line max-len */
    TextSearch.prototype.updateMatchedTextLocation = function (matches, results, textInfo, indexInInline, inlines, isFirstMatch, selectionEnd, startPosition) {
        for (var i = 0; i < matches.length; i++) {
            var match = matches[parseInt(i.toString(), 10)];
            var isMatched = void 0;
            if (!(isNullOrUndefined(startPosition)) && match.index < startPosition) {
                continue;
            }
            var result = results.addResult();
            var spanKeys = textInfo.keys;
            var isContainField = false;
            for (var j = 0; j < spanKeys.length; j++) {
                var span = spanKeys[parseInt(j.toString(), 10)];
                var startIndex = textInfo.get(span);
                var spanLength = span.length;
                // IndexInInline Handled specifically for simple find operation to start from starting point
                if (span === inlines) {
                    spanLength -= indexInInline;
                }
                if (isNullOrUndefined(result.start) && match.index < startIndex + spanLength) {
                    var index = match.index - startIndex;
                    // IndexInInline Handled specifically for simple find operation to start from starting point
                    if (span === inlines) {
                        index += indexInInline;
                    }
                    var offset = (span.line).getOffset(span, index);
                    result.start = this.getTextPosition(span.line, offset.toString());
                    result.start.location = this.owner.selectionModule.getPhysicalPositionInternal(span.line, offset, true);
                    result.start.setPositionParagraph(span.line, offset);
                    result.startOffset = this.owner.selectionModule.getHierarchicalIndexByPosition(result.start);
                }
                if (match.index + match[0].length <= startIndex + spanLength) {
                    var index = (match.index + match[0].length) - startIndex;
                    // IndexInInline Handled specifically for simple find operation to start from starting point
                    if (span === inlines) {
                        index += indexInInline;
                    }
                    if (!(!isNullOrUndefined(this.owner.searchModule.textSearchResults) && this.owner.searchModule.textSearchResults.length !== 0) && span.text.charAt(span.text.length - 1) !== ' ' && !isNullOrUndefined(span.nextElement) && (span.nextElement instanceof BookmarkElementBox || span.nextElement instanceof CommentCharacterElementBox)) {
                        var element = span.nextElement;
                        while (element) {
                            element = element.nextElement;
                            if (element instanceof TextElementBox) {
                                break;
                            }
                        }
                        if (element && element instanceof TextElementBox && element.text.charAt(0) !== ' ') {
                            isContainField = true;
                            continue;
                        }
                    }
                    if (!(!isNullOrUndefined(this.owner.searchModule.textSearchResults)
                        && this.owner.searchModule.textSearchResults.length !== 0) && span.previousElement
                        && (span.previousElement instanceof BookmarkElementBox
                            || span.previousElement instanceof CommentCharacterElementBox)) {
                        isContainField = true;
                    }
                    var offset = 0;
                    if (isContainField) {
                        offset = (span.line).getOffset(span, 0) + span.length;
                    }
                    else {
                        offset = (span.line).getOffset(span, index);
                    }
                    result.end = this.getTextPosition(span.line, offset.toString());
                    result.end.location = this.owner.selectionModule.getPhysicalPositionInternal(span.line, offset, true);
                    result.end.setPositionParagraph(span.line, offset);
                    result.endOffset = this.owner.selectionModule.getHierarchicalIndexByPosition(result.end);
                    isMatched = true;
                    break;
                }
            }
            if (isFirstMatch) {
                results.currentIndex = 0;
                break;
            }
            else if (results.currentIndex < 0 && !isNullOrUndefined(selectionEnd) && (selectionEnd.isExistBefore(result.start) ||
                selectionEnd.isAtSamePosition(result.start))) {
                results.currentIndex = results.indexOf(result);
            }
            if (!isNullOrUndefined(startPosition) && isMatched) {
                break;
            }
        }
    };
    /* eslint-disable-next-line max-len */
    TextSearch.prototype.findDocument = function (results, pattern, isFirstMatch, findOption, hierachicalPosition) {
        if (this.isPatternEmpty(pattern)) {
            return;
        }
        if (findOption === undefined) {
            findOption = 'None';
        }
        var inline = undefined;
        var selectionEnd = undefined;
        if (hierachicalPosition !== undefined) {
            selectionEnd = this.owner.selectionModule.end;
        }
        if (hierachicalPosition !== undefined && isFirstMatch && selectionEnd !== undefined && selectionEnd.paragraph !== undefined) {
            if (selectionEnd.paragraph instanceof ParagraphWidget) {
                var indexInInline = 0;
                // IndexInInline Handled specifically for simple find operation to start from starting point
                /* eslint-disable-next-line max-len */
                var inlineElement = selectionEnd.currentWidget.getInline(this.owner.selectionModule.start.offset, indexInInline);
                inline = inlineElement.element;
                indexInInline = inlineElement.index;
                if (!isNullOrUndefined(inline)) {
                    var nextParagraphWidget = undefined;
                    nextParagraphWidget = this.findInline(inline, pattern, findOption, indexInInline, isFirstMatch, results, selectionEnd);
                    while (results.length === 0 && !isNullOrUndefined(nextParagraphWidget)) {
                        while (!isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.childWidgets.length === 0) {
                            /* eslint-disable-next-line max-len */
                            nextParagraphWidget = this.owner.selectionModule.getNextParagraph(nextParagraphWidget.containerWidget);
                        }
                        if (isNullOrUndefined(nextParagraphWidget)) {
                            break;
                        }
                        var lineWidget = nextParagraphWidget.childWidgets[0];
                        if (lineWidget.children[0] instanceof ListTextElementBox) {
                            inline = (lineWidget.children[2] instanceof TextElementBox) ? lineWidget.children[2] : undefined;
                        }
                        else {
                            inline = lineWidget.children[0];
                        }
                        if (isNullOrUndefined(inline)) {
                            break;
                        }
                        nextParagraphWidget = this.findInline(inline, pattern, findOption, 0, isFirstMatch, results, selectionEnd);
                    }
                    if (results.length > 0) {
                        return;
                    }
                }
            }
        }
        var section;
        section = this.documentHelper.pages[0].bodyWidgets[0];
        while (!isNullOrUndefined(section) && section.childWidgets.length === 0) {
            section = section.nextWidget;
        }
        if (isNullOrUndefined(section) || section.childWidgets.length === 0) {
            return;
        }
        this.findInlineText(section, pattern, findOption, isFirstMatch, results, selectionEnd);
        var headerFootersColletion = this.documentHelper.headersFooters;
        for (var i = 0; i < headerFootersColletion.length; i++) {
            var headerFooters = headerFootersColletion[parseInt(i.toString(), 10)];
            if (headerFooters) {
                for (var index in headerFooters) {
                    if (Object.prototype.hasOwnProperty.call(headerFooters, index)) {
                        var headerFooter = headerFooters[parseInt(index.toString(), 10)];
                        if (!isNullOrUndefined(headerFooter) && !isNullOrUndefined(headerFooter.page)) {
                            this.findInlineText(headerFooter, pattern, findOption, isFirstMatch, results, selectionEnd);
                        }
                    }
                }
            }
        }
        // (EJ2-854069) - Added below code to add the search results of the endnote and footnote in the results.
        var endNoteCollection = this.documentHelper.endnoteCollection;
        for (var i = 0; i < endNoteCollection.length; i++) {
            var endNote = endNoteCollection[parseInt(i.toString(), 10)];
            if (endNote) {
                if (!isNullOrUndefined(endNote) && !isNullOrUndefined(endNote.bodyWidget.page)) {
                    this.findInlineText(endNote.bodyWidget, pattern, findOption, isFirstMatch, results, selectionEnd);
                }
            }
        }
        var footNoteCollection = this.documentHelper.footnoteCollection;
        for (var i = 0; i < footNoteCollection.length; i++) {
            var footNote = footNoteCollection[parseInt(i.toString(), 10)];
            if (footNote) {
                if (!isNullOrUndefined(footNote) && !isNullOrUndefined(footNote.bodyWidget.page)) {
                    this.findInlineText(footNote.bodyWidget, pattern, findOption, isFirstMatch, results, selectionEnd);
                }
            }
        }
        if (isFirstMatch && !isNullOrUndefined(results) && results.length > 0) {
            return;
        }
    };
    /* eslint-disable-next-line max-len */
    TextSearch.prototype.findInlineText = function (section, pattern, findOption, isFirstMatch, results, selectionEnd) {
        var paragraphWidget = this.owner.documentHelper.getFirstParagraphBlock(section.childWidgets[0]);
        /* eslint-disable-next-line max-len */
        while (!isNullOrUndefined(paragraphWidget) && paragraphWidget.childWidgets.length === 1 && paragraphWidget.childWidgets[0].children.length === 0) {
            paragraphWidget = this.owner.selectionModule.getNextParagraphBlock(paragraphWidget);
        }
        while (!isNullOrUndefined(paragraphWidget) && paragraphWidget.childWidgets.length > 0) {
            var inlineElement = paragraphWidget.childWidgets[0];
            var inlineEle = inlineElement.children[0];
            if (isNullOrUndefined(inlineEle)) {
                break;
            }
            this.findInline(inlineEle, pattern, findOption, 0, isFirstMatch, results, selectionEnd);
            paragraphWidget = this.owner.selectionModule.getNextParagraphBlock(paragraphWidget);
            /* eslint-disable-next-line max-len */
            while (!isNullOrUndefined(paragraphWidget) && (((paragraphWidget.childWidgets.length === 1) && paragraphWidget.childWidgets[0].children.length === 0) || !isNullOrUndefined(paragraphWidget.previousSplitWidget))) {
                paragraphWidget = this.owner.selectionModule.getNextParagraphBlock(paragraphWidget);
            }
        }
        if (isFirstMatch && !isNullOrUndefined(results) && results.length > 0) {
            return;
        }
    };
    /* eslint-disable-next-line max-len */
    TextSearch.prototype.findInline = function (inlineElement, pattern, option, indexInInline, isFirstMatch, results, selectionEnd) {
        var inlines = inlineElement;
        var textInfo = this.getElementInfo(inlineElement, indexInInline, undefined, pattern, option, isFirstMatch, results, selectionEnd);
        var text = textInfo.fullText;
        var matches = [];
        var spans = textInfo.elementsWithOffset;
        var matchObject;
        // eslint-disable-next-line no-cond-assign
        while (!isNullOrUndefined(matchObject = pattern.exec(text))) {
            matches.push(matchObject);
        }
        this.updateMatchedTextLocation(matches, results, spans, indexInInline, inlines, isFirstMatch, selectionEnd);
        if (isFirstMatch) {
            return undefined;
        }
        /* eslint-disable-next-line max-len */
        var paragraphWidget = this.owner.selectionModule.getNextParagraphBlock(inlineElement.line.paragraph);
        return paragraphWidget;
    };
    TextSearch.prototype.getTextPosition = function (lineWidget, hierarchicalIndex) {
        var textPosition = new TextPosition(this.owner);
        var index = textPosition.getHierarchicalIndex(lineWidget, hierarchicalIndex);
        textPosition.setPositionForCurrentIndex(index);
        return textPosition;
    };
    return TextSearch;
}());
export { TextSearch };
/**
 * @private
 */
var SearchWidgetInfo = /** @class */ (function () {
    function SearchWidgetInfo(left, width) {
        this.leftInternal = 0;
        this.widthInternal = 0;
        this.leftInternal = left;
        this.widthInternal = width;
    }
    Object.defineProperty(SearchWidgetInfo.prototype, "left", {
        get: function () {
            return this.leftInternal;
        },
        set: function (value) {
            this.leftInternal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchWidgetInfo.prototype, "width", {
        get: function () {
            return this.widthInternal;
        },
        set: function (value) {
            this.widthInternal = value;
        },
        enumerable: true,
        configurable: true
    });
    return SearchWidgetInfo;
}());
export { SearchWidgetInfo };
