import { extend } from '@syncfusion/ej2-base';
import * as EVENTS from './../../common/constant';
import * as CONSTANT from './../../markdown-parser/base/constant';
/**
 * MDFormats internal plugin
 *
 * @hidden
 * @deprecated
 */
var MDFormats = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {IMDFormats} options - specifies the formats
     * @hidden
     * @deprecated
     */
    function MDFormats(options) {
        extend(this, this, options, true);
        this.selection = this.parent.markdownSelection;
        this.addEventListener();
    }
    MDFormats.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.FORMAT_TYPE, this.applyFormats, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    MDFormats.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.FORMAT_TYPE, this.applyFormats);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    MDFormats.prototype.applyFormats = function (e) {
        e.subCommand = e.subCommand.toLowerCase();
        var textArea = this.parent.element;
        this.selection.save(textArea.selectionStart, textArea.selectionEnd);
        var parents = this.selection.getSelectedParentPoints(textArea);
        if (this.isAppliedFormat(parents) === e.subCommand) {
            if (e.subCommand === 'pre') {
                if (parents.length > 1) {
                    this.applyCodeBlock(textArea, e, parents);
                }
                else {
                    return;
                }
            }
            this.cleanFormat(textArea);
            this.restore(textArea, textArea.selectionStart, textArea.selectionEnd, e);
            return;
        }
        if (e.subCommand === 'p') {
            this.cleanFormat(textArea);
            this.restore(textArea, textArea.selectionStart, textArea.selectionEnd, e);
            return;
        }
        else {
            if ((e.subCommand === 'pre' && parents.length !== 1) || e.subCommand !== 'pre') {
                this.cleanFormat(textArea, e.subCommand);
            }
        }
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var addedLength = 0;
        parents = this.selection.getSelectedParentPoints(textArea);
        if (e.subCommand === 'pre') {
            if (parents.length > 1) {
                this.applyCodeBlock(textArea, e, parents);
            }
            else {
                extend(e, e, { subCommand: 'InlineCode' }, true);
                this.parent.observer.notify(CONSTANT.selectionCommand, e);
            }
            return;
        }
        for (var i = 0; i < parents.length; i++) {
            if (parents[i].text !== '' && !this.selection.isStartWith(parents[i].text, '\\' + this.syntax[e.subCommand])) {
                parents[i].text = this.syntax[e.subCommand] + parents[i].text;
                textArea.value = textArea.value.substr(0, parents[i].start) + parents[i].text + '\n' +
                    textArea.value.substr(parents[i].end, textArea.value.length);
                start = i === 0 ? start + this.syntax[e.subCommand].length : start;
                addedLength += this.syntax[e.subCommand].length;
                if (parents.length !== 1) {
                    for (var j = i; j < parents.length; j++) {
                        parents[j].start = j !== 0 ?
                            this.syntax[e.subCommand].length + parents[j].start : parents[j].start;
                        parents[j].end = this.syntax[e.subCommand].length + parents[j].end;
                    }
                }
            }
            else if (parents[i].text === '' && i === 0) {
                this.selection.save(start, end);
                if (this.selection.getSelectedText(textArea).length === 0) {
                    parents[i].text = this.syntax[e.subCommand];
                    textArea.value = textArea.value.substr(0, parents[i].start) + this.syntax[e.subCommand] +
                        textArea.value.substr(parents[i].end, textArea.value.length);
                    start = i === 0 ? start + this.syntax[e.subCommand].length : start;
                    addedLength += this.syntax[e.subCommand].length;
                }
                if (parents.length !== 1) {
                    for (var j = i; j < parents.length; j++) {
                        parents[j].start = j !== 0 ? 1 + parents[j].start : parents[j].start;
                        parents[j].end = 1 + parents[j].end;
                    }
                }
            }
        }
        this.restore(textArea, start, end + addedLength, e);
    };
    MDFormats.prototype.clearRegex = function () {
        var regex = '';
        var configKey = Object.keys(this.syntax);
        for (var j = 0; j < configKey.length && configKey[j] !== 'pre' && configKey[j] !== 'p'; j++) {
            regex += regex === '' ? '^(' + this.selection.replaceSpecialChar(this.syntax[configKey[j]].trim()) + ')' :
                '|^(' + this.selection.replaceSpecialChar(this.syntax[configKey[j]].trim()) + ')';
        }
        return regex;
    };
    MDFormats.prototype.cleanFormat = function (textArea, command) {
        var parents = this.selection.getSelectedParentPoints(textArea);
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var removeLength = 0;
        if (this.selection.isClear(parents, this.clearRegex())) {
            for (var i = 0; i < parents.length; i++) {
                var configKey = Object.keys(this.syntax);
                for (var j = 0; parents[i].text !== '' && j < configKey.length; j++) {
                    var removeText = this.syntax[configKey[j]];
                    if (configKey[j] === command) {
                        continue;
                    }
                    // eslint-disable-next-line
                    var regex = new RegExp('^(' + this.selection.replaceSpecialChar(removeText) + ')', 'gim');
                    if (regex.test(parents[i].text)) {
                        parents[i].text = parents[i].text.replace(regex, '');
                        textArea.value = textArea.value.substr(0, parents[i].start) + parents[i].text + '\n' +
                            textArea.value.substr(parents[i].end, textArea.value.length);
                        start = i === 0 ? (start - (removeText.length)) > 0 ? start - (removeText.length) : 0 : start;
                        removeLength += removeText.length;
                        if (parents.length !== 1) {
                            for (var k = 0; k < parents.length; k++) {
                                parents[k].start = k !== 0 ?
                                    parents[k].start - removeText.length : parents[k].start;
                                parents[k].end = parents[k].end - removeText.length;
                            }
                        }
                        break;
                    }
                }
                if (parents[i].text === '' && i === 0) {
                    this.selection.save(start, end);
                    if (parents.length !== 1) {
                        for (var j = i; j < parents.length; j++) {
                            parents[j].start = j !== 0 ? 1 + parents[j].start : parents[j].start;
                            parents[j].end = 1 + parents[j].end;
                        }
                    }
                }
            }
            this.restore(textArea, start, end - removeLength);
        }
    };
    MDFormats.prototype.applyCodeBlock = function (textArea, event, parents) {
        var command = event.subCommand;
        var start = parents[0].start;
        var end = parents[parents.length - 1].end;
        var parentLines = this.selection.getAllParents(textArea.value);
        var firstPrevText = parentLines[parents[0].line - 1];
        var lastNextText = parentLines[(parents.length + 1) + 1];
        // eslint-disable-next-line
        var addedLength = 0;
        if (!this.selection.isStartWith(firstPrevText, this.syntax.pre.split('\n')[0]) &&
            !this.selection.isStartWith(lastNextText, this.syntax.pre.split('\n')[0])) {
            var lines = textArea.value.substring(start, end).split('\n');
            var lastLine = lines[lines.length - 1] === '' ? '' : '\n';
            textArea.value = textArea.value.substr(0, start) + this.syntax["" + command] + textArea.value.substring(start, end) +
                lastLine + this.syntax["" + command] +
                textArea.value.substr(end, textArea.value.length);
            start = this.selection.selectionStart + this.syntax["" + command].length;
            end = this.selection.selectionEnd + this.syntax["" + command].length - 1;
        }
        else {
            var cmd = this.syntax["" + command];
            var selection = this.parent.markdownSelection.getSelectedInlinePoints(textArea);
            var startNo = textArea.value.substr(0, textArea.selectionStart).lastIndexOf(cmd);
            var endNo = textArea.value.substr(textArea.selectionEnd, textArea.selectionEnd).indexOf(cmd);
            endNo = endNo + selection.end;
            var repStartText = this.replaceAt(textArea.value.substr(0, selection.start), cmd, '', startNo, selection.start);
            var repEndText = this.replaceAt(textArea.value.substr(selection.end, textArea.value.length), cmd, '', 0, endNo);
            textArea.value = repStartText + selection.text + repEndText;
            start = this.selection.selectionStart - cmd.length;
            end = this.selection.selectionEnd - cmd.length;
        }
        this.restore(textArea, start, end, event);
    };
    MDFormats.prototype.replaceAt = function (input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    };
    MDFormats.prototype.restore = function (textArea, start, end, event) {
        this.selection.save(start, end);
        this.selection.restore(textArea);
        if (event && event.callBack) {
            event.callBack({
                requestType: event.subCommand,
                selectedText: this.selection.getSelectedText(textArea),
                editorMode: 'Markdown',
                event: event.event
            });
        }
    };
    MDFormats.prototype.isAppliedFormat = function (lines, documentNode) {
        var format = 'p';
        // eslint-disable-next-line
        var configKey = Object.keys(this.syntax);
        var keys = Object.keys(this.syntax);
        var direction = this.parent.element.selectionDirection;
        var checkLine = direction === 'backward' ? lines[0].text : lines[lines.length - 1].text;
        for (var i = 0; !documentNode && i < keys.length; i++) {
            if (keys[i] !== 'pre' && this.selection.isStartWith(checkLine, this.syntax[keys[i]])) {
                format = keys[i];
                break;
            }
            else if (keys[i] === 'pre') {
                var parentLines = this.selection.getAllParents(this.parent.element.value);
                var firstPrevText = parentLines[lines[0].line - 1];
                var lastNextText = parentLines[lines.length + 1];
                if (this.selection.isStartWith(firstPrevText, this.syntax[keys[i]].split('\n')[0]) &&
                    this.selection.isStartWith(lastNextText, this.syntax[keys[i]].split('\n')[0])) {
                    format = keys[i];
                    break;
                }
            }
        }
        return format;
    };
    MDFormats.prototype.destroy = function () {
        this.removeEventListener();
    };
    return MDFormats;
}());
export { MDFormats };
