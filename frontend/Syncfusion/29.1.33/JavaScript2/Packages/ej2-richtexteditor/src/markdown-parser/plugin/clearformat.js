import * as CONSTANT from './../base/constant';
import * as EVENTS from './../../common/constant';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
var ClearFormat = /** @class */ (function () {
    /**
     * Constructor for creating the clear format plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function ClearFormat(parent) {
        this.parent = parent;
        this.selection = this.parent.markdownSelection;
        this.addEventListener();
    }
    ClearFormat.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.CLEAR_COMMAND, this.clear, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    ClearFormat.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.CLEAR_COMMAND, this.clear);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    ClearFormat.prototype.replaceRegex = function (data) {
        /* eslint-disable */
        return data.replace(/\*/ig, '\\*').replace(/\&/ig, '\\&')
            .replace(/\-/ig, '\\-').replace(/\^/ig, '\\^')
            .replace(/\$/ig, '\\$').replace(/\./ig, '\\.')
            .replace(/\|/ig, '\\|').replace(/\?/ig, '\\?')
            .replace(/\+/ig, '\\+').replace(/\-/ig, '\\-')
            .replace(/\&/ig, '\\&');
        /* eslint-enable */
    };
    ClearFormat.prototype.clearSelectionTags = function (text) {
        var data = this.parent.selectionTags;
        var keys = Object.keys(data);
        for (var num = 0; num < keys.length; num++) {
            var key = keys[num];
            if (Object.prototype.hasOwnProperty.call(data, key) && data["" + key] !== '') {
                var expString = this.replaceRegex(data["" + key]);
                var regExp = void 0;
                var startExp = data["" + key].length;
                var endExp = (data["" + key] === '<sup>' || data["" + key] === '<sub>') ? data["" + key].length + 1 : data["" + key].length;
                if (data["" + key] === '<sup>') {
                    // eslint-disable-next-line
                    regExp = new RegExp('<sup>(.*?)<\/sup>', 'ig');
                }
                else if (data["" + key] === '<sub>') {
                    // eslint-disable-next-line
                    regExp = new RegExp('<sub>(.*?)<\/sub>', 'ig');
                }
                else {
                    var regExpr = RegExp;
                    regExp = new regExpr(expString + '(.*?)' + expString, 'ig');
                }
                var val = text.match(regExp);
                for (var index = 0; val && index < val.length && val[index] !== ''; index++) {
                    // eslint-disable-next-line max-len
                    text = text.replace(val[index], val[index].substr(startExp, val[index].length - endExp - startExp));
                }
            }
        }
        return text;
    };
    ClearFormat.prototype.clearFormatTags = function (text) {
        var lines = text.split('\n');
        return this.clearFormatLines(lines);
    };
    ClearFormat.prototype.clearFormatLines = function (lines) {
        var tags = [this.parent.formatTags, this.parent.listTags];
        var str = '';
        for (var len = 0; len < lines.length; len++) {
            for (var num = 0; num < tags.length; num++) {
                var data = tags[num];
                var keys = Object.keys(data);
                for (var index = 0; index < keys.length; index++) {
                    var key = keys[index];
                    if (Object.prototype.hasOwnProperty.call(data, key) && data["" + key] !== '') {
                        if (lines[len].indexOf(data["" + key]) === 0) {
                            lines[len] = lines[len].replace(data["" + key], '');
                            lines[len] = this.clearFormatLines([lines[len]]);
                        }
                    }
                }
            }
            str = str + lines[len] + ((len !== lines.length - 1) ? '\n' : '');
        }
        return str;
    };
    ClearFormat.prototype.clear = function (e) {
        var textArea = this.parent.element;
        textArea.focus();
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var text = this.selection.getSelectedText(textArea);
        text = this.clearSelectionTags(text);
        text = this.clearFormatTags(text);
        textArea.value = textArea.value.substr(0, start)
            + text + textArea.value.substr(end, textArea.value.length);
        this.parent.markdownSelection.setSelection(textArea, start, start + text.length);
        this.restore(textArea, start, start + text.length, e);
    };
    ClearFormat.prototype.restore = function (textArea, start, end, event) {
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
    ClearFormat.prototype.destroy = function () {
        this.removeEventListener();
    };
    return ClearFormat;
}());
export { ClearFormat };
