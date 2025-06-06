import { Observer } from '@syncfusion/ej2-base';
import { MarkdownExecCommand } from './types';
import { MDLists } from './../plugin/lists';
import { MDFormats } from './../plugin/formats';
import { IMarkdownParserModel } from './../base/interface';
import { MDSelectionFormats } from './../plugin/md-selection-formats';
import { MarkdownSelection } from './../plugin/markdown-selection';
import { UndoRedoCommands } from './../plugin/undo';
import { MDLink } from './../plugin/link';
import { MDTable } from './../plugin/table';
import { ClearFormat } from './../plugin/clearformat';
import { MDInsertText } from './../plugin/insert-text';
/**
 * MarkdownParser internal component
 *
 * @hidden
 * @deprecated
 */
export declare class MarkdownParser {
    observer: Observer;
    listObj: MDLists;
    formatObj: MDFormats;
    formatTags: {
        [key: string]: string;
    };
    listTags: {
        [key: string]: string;
    };
    selectionTags: {
        [key: string]: string;
    };
    element: Element;
    undoRedoManager: UndoRedoCommands;
    mdSelectionFormats: MDSelectionFormats;
    markdownSelection: MarkdownSelection;
    linkObj: MDLink;
    tableObj: MDTable;
    clearObj: ClearFormat;
    insertTextObj: MDInsertText;
    /**
     * Constructor for creating the component
     *
     * @param {IMarkdownParserModel} options - specifies the options
     * @hidden
     * @deprecated
     */
    constructor(options: IMarkdownParserModel);
    private initialize;
    private wireEvents;
    private unwireEvents;
    private onPropertyChanged;
    private editorKeyDown;
    private editorKeyUp;
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
    execCommand<T>(command: MarkdownExecCommand, value: T, event?: Event, callBack?: Function, text?: string, exeValue?: T): void;
    destroy(): void;
}
