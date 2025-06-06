import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import { extend } from '@syncfusion/ej2-base';
import * as EVENTS from './../../common/constant';
/**
 * SelectionCommands internal component
 *
 * @hidden
 * @deprecated
 */
var MDSelectionFormats = /** @class */ (function () {
    function MDSelectionFormats(parent) {
        extend(this, this, parent, true);
        this.selection = this.parent.markdownSelection;
        this.addEventListener();
    }
    MDSelectionFormats.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.selectionCommand, this.applyCommands, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.keyDownHandler, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    MDSelectionFormats.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.selectionCommand, this.applyCommands);
        this.parent.observer.off(EVENTS.KEY_DOWN_HANDLER, this.keyDownHandler);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    MDSelectionFormats.prototype.keyDownHandler = function (e) {
        switch (e.event.action) {
            case 'bold':
                this.applyCommands({ subCommand: 'Bold', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'italic':
                this.applyCommands({ subCommand: 'Italic', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'strikethrough':
                this.applyCommands({ subCommand: 'StrikeThrough', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'uppercase':
                this.applyCommands({ subCommand: 'UpperCase', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'lowercase':
                this.applyCommands({ subCommand: 'LowerCase', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'superscript':
                this.applyCommands({ subCommand: 'SuperScript', callBack: e.callBack });
                e.event.preventDefault();
                break;
            case 'subscript':
                this.applyCommands({ subCommand: 'SubScript', callBack: e.callBack });
                e.event.preventDefault();
                break;
        }
    };
    MDSelectionFormats.prototype.isBold = function (text, cmd) {
        return text.search('\\' + cmd + '\\' + cmd + '') !== -1;
    };
    MDSelectionFormats.prototype.isItalic = function (text, cmd) {
        return text.search('\\' + cmd) !== -1;
    };
    MDSelectionFormats.prototype.isMatch = function (text, cmd) {
        var matchText = [''];
        switch (cmd) {
            case this.syntax.Italic:
                matchText = text.match(this.singleCharRegx(cmd));
                break;
            case this.syntax.InlineCode:
                matchText = text.match(this.singleCharRegx(cmd));
                break;
            case this.syntax.StrikeThrough:
                matchText = text.match(this.singleCharRegx(cmd));
                break;
        }
        return matchText;
    };
    MDSelectionFormats.prototype.multiCharRegx = function (cmd) {
        var regExp = RegExp;
        return new regExp('(\\' + cmd + '\\' + cmd + ')', 'g');
    };
    MDSelectionFormats.prototype.singleCharRegx = function (cmd) {
        var regExp = RegExp;
        return new regExp('(\\' + cmd + ')', 'g');
    };
    MDSelectionFormats.prototype.isAppliedCommand = function (cmd) {
        // eslint-disable-next-line
        var selectCmd = '';
        var isFormat = false;
        var textArea = this.parent.element;
        var start = textArea.selectionStart;
        var splitAt = function (index) { return function (x) { return [x.slice(0, index), x.slice(index)]; }; };
        var splitText = splitAt(start)(textArea.value);
        var cmdB = this.syntax.Bold.substr(0, 1);
        var cmdI = this.syntax.Italic;
        var selectedText = this.parent.markdownSelection.getSelectedText(textArea);
        if (selectedText !== '' && selectedText === selectedText.toLocaleUpperCase() && cmd === 'UpperCase') {
            return true;
        }
        else if (selectedText === '') {
            var beforeText = textArea.value.substr(splitText[0].length - 1, 1);
            var afterText = splitText[1].substr(0, 1);
            if ((beforeText !== '' && afterText !== '' && beforeText.match(/[a-z]/i)) &&
                beforeText === beforeText.toLocaleUpperCase() && afterText === afterText.toLocaleUpperCase() && cmd === 'UpperCase') {
                return true;
            }
        }
        if (!(this.isBold(splitText[0], cmdB)) && !(this.isItalic(splitText[0], cmdI)) && !(this.isBold(splitText[1], cmdB)) &&
            !(this.isItalic(splitText[1], cmdI))) {
            if ((!isNullOrUndefined(this.isMatch(splitText[0], this.syntax.StrikeThrough)) &&
                !isNullOrUndefined(this.isMatch(splitText[1], this.syntax.StrikeThrough))) &&
                (this.isMatch(splitText[0], this.syntax.StrikeThrough).length % 2 === 1 &&
                    this.isMatch(splitText[1], this.syntax.StrikeThrough).length % 2 === 1) && cmd === 'StrikeThrough') {
                isFormat = true;
            }
            if ((!isNullOrUndefined(this.isMatch(splitText[0], this.syntax.InlineCode)) &&
                !isNullOrUndefined(this.isMatch(splitText[1], this.syntax.InlineCode))) &&
                (this.isMatch(splitText[0], this.syntax.InlineCode).length % 2 === 1 &&
                    this.isMatch(splitText[1], this.syntax.InlineCode).length % 2 === 1) && cmd === 'InlineCode') {
                isFormat = true;
            }
            /* eslint-disable */
            if ((!isNullOrUndefined(splitText[0].match(/\<sub>/g)) && !isNullOrUndefined(splitText[1].match(/\<\/sub>/g))) &&
                (splitText[0].match(/\<sub>/g).length % 2 === 1 &&
                    splitText[1].match(/\<\/sub>/g).length % 2 === 1) && cmd === 'SubScript') {
                isFormat = true;
            }
            if ((!isNullOrUndefined(splitText[0].match(/\<sup>/g)) && !isNullOrUndefined(splitText[1].match(/\<\/sup>/g))) &&
                (splitText[0].match(/\<sup>/g).length % 2 === 1 && splitText[1].match(/\<\/sup>/g).length % 2 === 1) &&
                cmd === 'SuperScript') {
                isFormat = true;
            }
            /* eslint-enable */
        }
        if ((this.isBold(splitText[0], cmdB) && this.isBold(splitText[1], cmdB)) &&
            (splitText[0].match(this.multiCharRegx(cmdB)).length % 2 === 1 &&
                splitText[1].match(this.multiCharRegx(cmdB)).length % 2 === 1) && cmd === 'Bold') {
            isFormat = true;
        }
        splitText[0] = this.isBold(splitText[0], cmdB) ? splitText[0].replace(this.multiCharRegx(cmdB), '$%@') : splitText[0];
        splitText[1] = this.isBold(splitText[1], cmdB) ? splitText[1].replace(this.multiCharRegx(cmdB), '$%@') : splitText[1];
        if ((!isNullOrUndefined(this.isMatch(splitText[0], this.syntax.Italic)) &&
            !isNullOrUndefined(this.isMatch(splitText[1], this.syntax.Italic))) &&
            (this.isMatch(splitText[0], this.syntax.Italic).length % 2 === 1 &&
                this.isMatch(splitText[1], this.syntax.Italic).length % 2 === 1) && cmd === 'Italic') {
            isFormat = true;
        }
        if ((!isNullOrUndefined(this.isMatch(splitText[0], this.syntax.StrikeThrough)) &&
            !isNullOrUndefined(this.isMatch(splitText[1], this.syntax.StrikeThrough))) &&
            (this.isMatch(splitText[0], this.syntax.StrikeThrough).length % 2 === 1 &&
                this.isMatch(splitText[1], this.syntax.StrikeThrough).length % 2 === 1) && cmd === 'StrikeThrough') {
            isFormat = true;
        }
        if ((!isNullOrUndefined(this.isMatch(splitText[0], this.syntax.InlineCode)) &&
            !isNullOrUndefined(this.isMatch(splitText[1], this.syntax.InlineCode))) &&
            (this.isMatch(splitText[0], this.syntax.InlineCode).length % 2 === 1 &&
                this.isMatch(splitText[1], this.syntax.InlineCode).length % 2 === 1) && cmd === 'InlineCode') {
            isFormat = true;
        }
        /* eslint-disable */
        if ((!isNullOrUndefined(splitText[0].match(/\<sub>/g)) && !isNullOrUndefined(splitText[1].match(/\<\/sub>/g))) &&
            (splitText[0].match(/\<sub>/g).length % 2 === 1 && splitText[1].match(/\<\/sub>/g).length % 2 === 1) && cmd === 'SubScript') {
            isFormat = true;
        }
        if ((!isNullOrUndefined(splitText[0].match(/\<sup>/g)) && !isNullOrUndefined(splitText[1].match(/\<\/sup>/g))) &&
            (splitText[0].match(/\<sup>/g).length % 2 === 1 && splitText[1].match(/\<\/sup>/g).length % 2 === 1) && cmd === 'SuperScript') {
            isFormat = true;
            /* eslint-enable */
        }
        return isFormat;
    };
    MDSelectionFormats.prototype.applyCommands = function (e) {
        this.currentAction = e.subCommand;
        var textArea = this.parent.element;
        this.selection.save(textArea.selectionStart, textArea.selectionEnd);
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var addedLength = 0;
        var selection = this.parent.markdownSelection.getSelectedInlinePoints(textArea);
        if (this.isAppliedCommand(e.subCommand) && selection.text !== '') {
            var startCmd = this.syntax[e.subCommand];
            var endCmd = e.subCommand === 'SubScript' ? '</sub>' :
                e.subCommand === 'SuperScript' ? '</sup>' : this.syntax[e.subCommand];
            var startLength = (e.subCommand === 'UpperCase' || e.subCommand === 'LowerCase') ? 0 : startCmd.length;
            var startNo = textArea.value.substr(0, selection.start).lastIndexOf(startCmd);
            var endNo = textArea.value.substr(selection.end, textArea.value.length).indexOf(endCmd);
            endNo = endNo + selection.end;
            var repStartText = this.replaceAt(textArea.value.substr(0, selection.start), startCmd, '', startNo, selection.start);
            var repEndText = this.replaceAt(textArea.value.substr(selection.end, textArea.value.length), endCmd, '', 0, endNo);
            textArea.value = repStartText + selection.text + repEndText;
            this.restore(textArea, start - startLength, end - startLength, e);
            return;
        }
        if (selection.text !== '' && !this.isApplied(selection, e.subCommand)) {
            addedLength = (e.subCommand === 'UpperCase' || e.subCommand === 'LowerCase') ? 0 :
                this.syntax[e.subCommand].length;
            var repStart = textArea.value.substr(selection.start - this.syntax[e.subCommand].length, this.syntax[e.subCommand].length);
            var repEnd = void 0;
            if ((repStart === e.subCommand) || ((selection.start - this.syntax[e.subCommand].length ===
                textArea.value.indexOf(this.syntax[e.subCommand])) && (selection.end === textArea.value.lastIndexOf(this.syntax[e.subCommand]) || selection.end === textArea.value.lastIndexOf('</' + this.syntax[e.subCommand].substring(1, 5))))) {
                if (e.subCommand === 'SubScript' || e.subCommand === 'SuperScript') {
                    repEnd = textArea.value.substr(selection.end, this.syntax[e.subCommand].length + 1);
                }
                else {
                    repEnd = textArea.value.substr(selection.end, this.syntax[e.subCommand].length);
                }
                var repStartText = this.replaceAt(textArea.value.substr(0, selection.start), repStart, '', selection.start - this.syntax[e.subCommand].length, selection.start);
                var repEndText = this.replaceAt(textArea.value.substr(selection.end, textArea.value.length), repEnd, '', 0, repEnd.length);
                textArea.value = repStartText + selection.text + repEndText;
                this.restore(textArea, start - addedLength, end - addedLength, e);
            }
            else {
                if (e.subCommand === 'SubScript' || e.subCommand === 'SuperScript') {
                    selection.text = this.syntax[e.subCommand] + selection.text
                        + '</' + this.syntax[e.subCommand].substring(1, 5);
                }
                else if (e.subCommand === 'UpperCase' || e.subCommand === 'LowerCase') {
                    selection.text = (e.subCommand === 'UpperCase') ? selection.text.toUpperCase()
                        : selection.text.toLowerCase();
                }
                else {
                    selection.text = this.syntax[e.subCommand] + selection.text + this.syntax[e.subCommand];
                }
                textArea.value = textArea.value.substr(0, selection.start) + selection.text +
                    textArea.value.substr(selection.end, textArea.value.length);
                this.restore(textArea, start + addedLength, end + addedLength, e);
            }
        }
        else if (e.subCommand !== 'UpperCase' && e.subCommand !== 'LowerCase') {
            if (e.subCommand === 'SubScript' || e.subCommand === 'SuperScript') {
                selection.text = this.textReplace(selection.text, e.subCommand);
                selection.text = this.syntax[e.subCommand] + selection.text
                    + '</' + this.syntax[e.subCommand].substring(1, 5);
            }
            else {
                selection.text = this.textReplace(selection.text, e.subCommand);
                selection.text = this.syntax[e.subCommand] + selection.text + this.syntax[e.subCommand];
            }
            textArea.value = textArea.value.substr(0, selection.start)
                + selection.text + textArea.value.substr(selection.end, textArea.value.length);
            addedLength = this.syntax[e.subCommand].length;
            if (selection.start === selection.end) {
                this.restore(textArea, start + addedLength, end + addedLength, e);
            }
            else {
                this.restore(textArea, start + addedLength, end - addedLength, e);
            }
        }
        else {
            this.restore(textArea, start, end, e);
        }
        this.parent.undoRedoManager.saveData();
    };
    MDSelectionFormats.prototype.replaceAt = function (input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    };
    MDSelectionFormats.prototype.restore = function (textArea, start, end, event) {
        this.selection.save(start, end);
        this.selection.restore(textArea);
        if (event && event.callBack) {
            event.callBack({
                requestType: this.currentAction,
                selectedText: this.selection.getSelectedText(textArea),
                editorMode: 'Markdown',
                event: event.event
            });
        }
    };
    MDSelectionFormats.prototype.textReplace = function (text, command) {
        var regx = this.singleCharRegx(this.syntax["" + command]);
        switch (command) {
            case 'Bold':
                regx = this.multiCharRegx(this.syntax["" + command].substr(0, 1));
                text = text.replace(regx, '');
                break;
            case 'Italic':
                if (!this.isBold(text, this.syntax["" + command].substr(0, 1))) {
                    text = text.replace(regx, '');
                }
                else {
                    var regxB = this.multiCharRegx(this.syntax["" + command].substr(0, 1));
                    var repText = text;
                    repText = repText.replace(regxB, '$%@').replace(regx, '');
                    var regxTemp = new RegExp('\\$%@', 'g');
                    text = repText.replace(regxTemp, this.syntax["" + command].substr(0, 1) + this.syntax["" + command].substr(0, 1));
                }
                break;
            case 'StrikeThrough':
                text = text.replace(regx, '');
                break;
            case 'InlineCode':
                text = text.replace(regx, '');
                break;
            case 'SubScript':
                text = text.replace(/<sub>/g, '').replace(/<\/sub>/g, '');
                break;
            case 'SuperScript':
                text = text.replace(/<sup>/g, '').replace(/<\/sup>/g, '');
                break;
        }
        return text;
    };
    MDSelectionFormats.prototype.isApplied = function (line, command) {
        var regx = this.singleCharRegx(this.syntax["" + command]);
        var regExp;
        switch (command) {
            case 'SubScript':
            case 'SuperScript':
                regx = this.singleCharRegx(this.syntax["" + command]);
                return regx.test(line.text);
            case 'Bold':
            case 'StrikeThrough':
                regx = this.multiCharRegx(this.syntax["" + command].substr(0, 1));
                return regx.test(line.text);
            case 'UpperCase':
            case 'LowerCase':
                regExp = RegExp;
                regx = new regExp('^[' + this.syntax["" + command] + ']*$', 'g');
                return regx.test(line.text);
            case 'Italic': {
                var regTest = void 0;
                var regxB = this.multiCharRegx(this.syntax["" + command].substr(0, 1));
                if (regxB.test(line.text)) {
                    var repText = line.text;
                    repText = repText.replace(regxB, '$%#');
                    regTest = regx.test(repText);
                }
                else {
                    regTest = regx.test(line.text);
                }
                return regTest;
            }
            case 'InlineCode':
                return regx.test(line.text);
        }
    };
    MDSelectionFormats.prototype.destroy = function () {
        this.removeEventListener();
    };
    return MDSelectionFormats;
}());
export { MDSelectionFormats };
