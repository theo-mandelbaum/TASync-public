import { Observer } from '@syncfusion/ej2-base';
import * as CONSTANT from './constant';
import { MDLists } from './../plugin/lists';
import { MDFormats } from './../plugin/formats';
import { MDSelectionFormats } from './../plugin/md-selection-formats';
import { MarkdownSelection } from './../plugin/markdown-selection';
import { extend } from '@syncfusion/ej2-base';
import { markdownFormatTags, markdownListsTags, markdownSelectionTags } from './../../common/config';
import { UndoRedoCommands } from './../plugin/undo';
import { MDLink } from './../plugin/link';
import { MDTable } from './../plugin/table';
import * as EVENTS from './../../common/constant';
import { ClearFormat } from './../plugin/clearformat';
import { MDInsertText } from './../plugin/insert-text';
/**
 * MarkdownParser internal component
 *
 * @hidden
 * @deprecated
 */
var MarkdownParser = /** @class */ (function () {
    /**
     * Constructor for creating the component
     *
     * @param {IMarkdownParserModel} options - specifies the options
     * @hidden
     * @deprecated
     */
    function MarkdownParser(options) {
        this.initialize();
        extend(this, this, options, true);
        this.observer = new Observer(this);
        this.markdownSelection = new MarkdownSelection();
        this.listObj = new MDLists({ parent: this, syntax: this.listTags });
        this.formatObj = new MDFormats({ parent: this, syntax: this.formatTags });
        this.undoRedoManager = new UndoRedoCommands(this, options.options);
        this.mdSelectionFormats = new MDSelectionFormats({ parent: this, syntax: this.selectionTags });
        this.linkObj = new MDLink(this);
        this.tableObj = new MDTable({ parent: this, syntaxTag: ({ Formats: this.formatTags, List: this.listTags }) });
        this.clearObj = new ClearFormat(this);
        this.insertTextObj = new MDInsertText(this);
        this.wireEvents();
    }
    MarkdownParser.prototype.initialize = function () {
        this.formatTags = markdownFormatTags;
        this.listTags = markdownListsTags;
        this.selectionTags = markdownSelectionTags;
    };
    MarkdownParser.prototype.wireEvents = function () {
        this.observer.on(EVENTS.KEY_DOWN, this.editorKeyDown, this);
        this.observer.on(EVENTS.KEY_UP, this.editorKeyUp, this);
        this.observer.on(EVENTS.MODEL_CHANGED, this.onPropertyChanged, this);
    };
    MarkdownParser.prototype.unwireEvents = function () {
        this.observer.off(EVENTS.KEY_DOWN, this.editorKeyDown);
        this.observer.off(EVENTS.KEY_UP, this.editorKeyUp);
        this.observer.off(EVENTS.MODEL_CHANGED, this.onPropertyChanged);
    };
    MarkdownParser.prototype.onPropertyChanged = function (props) {
        this.observer.notify(EVENTS.MODEL_CHANGED_PLUGIN, props);
    };
    MarkdownParser.prototype.editorKeyDown = function (e) {
        this.observer.notify(EVENTS.KEY_DOWN_HANDLER, e);
    };
    MarkdownParser.prototype.editorKeyUp = function (e) {
        this.observer.notify(EVENTS.KEY_UP_HANDLER, e);
    };
    /* eslint-disable */
    /**
     * markdown execCommand method
     *
     * @param {MarkdownExecCommand} command - specifies the command
     * @param {T} - specifies the value
     * @param {Event} event - specifies the event
     * @param {Function} callBack - specifies the call back function
     * @param {string} text - specifies the string value
     * @param {T} exeValue - specifies the value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    /* eslint-enable */
    MarkdownParser.prototype.execCommand = function (command, value, event, callBack, text, exeValue) {
        switch (command.toLocaleLowerCase()) {
            case 'lists':
                this.observer.notify(CONSTANT.LISTS_COMMAND, { subCommand: value, event: event, callBack: callBack });
                break;
            case 'formats':
                this.observer.notify(EVENTS.FORMAT_TYPE, { subCommand: value, event: event, callBack: callBack });
                break;
            case 'actions':
                this.observer.notify(EVENTS.ACTION, { subCommand: value, event: event, callBack: callBack });
                break;
            case 'style':
            case 'effects':
            case 'casing':
                this.observer.notify(CONSTANT.selectionCommand, { subCommand: value, event: event, callBack: callBack });
                break;
            case 'links':
            case 'images':
                this.observer.notify(CONSTANT.LINK_COMMAND, { subCommand: value, event: event, callBack: callBack, item: exeValue });
                break;
            case 'table':
                switch (value.toString().toLocaleLowerCase()) {
                    case 'createtable':
                        this.observer.notify(CONSTANT.MD_TABLE, { subCommand: value, item: exeValue, event: event, callBack: callBack });
                        break;
                }
                break;
            case 'clear':
                this.observer.notify(CONSTANT.CLEAR_COMMAND, { subCommand: value, event: event, callBack: callBack });
                break;
            case 'inserttext':
                this.observer.notify(CONSTANT.INSERT_TEXT_COMMAND, { subCommand: value, event: event, callBack: callBack,
                    value: { text: exeValue } });
                break;
        }
    };
    MarkdownParser.prototype.destroy = function () {
        this.observer.notify(EVENTS.INTERNAL_DESTROY, {});
        this.unwireEvents();
    };
    return MarkdownParser;
}());
export { MarkdownParser };
