import { Observer } from '@syncfusion/ej2-base';
import { ICommandModel, IFormatPainterEditor } from './interface';
import { EditorExecCommand as ExecCommand } from './types';
import { Lists } from './../plugin/lists';
import { NodeSelection } from './../../selection/index';
import { DOMNode } from './../plugin/dom-node';
import { Formats } from './../plugin/formats';
import { LinkCommand } from './../plugin/link';
import { Alignments } from './../plugin/alignments';
import { Indents } from './../plugin/indents';
import { ImageCommand } from './../plugin/image';
import { AudioCommand } from './../plugin/audio';
import { VideoCommand } from './../plugin/video';
import { TableCommand } from './../plugin/table';
import { SelectionBasedExec } from './../plugin/selection-exec';
import { InsertHtmlExec } from './../plugin/inserthtml-exec';
import { ClearFormatExec } from './../plugin/clearformat-exec';
import { UndoRedoManager } from './../plugin/undo';
import { MsWordPaste } from '../plugin/ms-word-clean-up';
import { InsertTextExec } from '../plugin/insert-text';
import { NodeCutter } from '../plugin/nodecutter';
import { EmojiPickerAction } from '../plugin/emoji-picker-action';
import { TableSelection } from '../plugin/table-selection';
import { CustomUserAgentData } from '../../common/user-agent';
/**
 * EditorManager internal component
 *
 * @hidden
 * @deprecated
 */
export declare class EditorManager {
    currentDocument: HTMLDocument;
    observer: Observer;
    listObj: Lists;
    nodeSelection: NodeSelection;
    nodeCutter: NodeCutter;
    domNode: DOMNode;
    formatObj: Formats;
    linkObj: LinkCommand;
    alignmentObj: Alignments;
    indentsObj: Indents;
    imgObj: ImageCommand;
    audioObj: AudioCommand;
    videoObj: VideoCommand;
    tableObj: TableCommand;
    selectionObj: SelectionBasedExec;
    inserthtmlObj: InsertHtmlExec;
    insertTextObj: InsertTextExec;
    clearObj: ClearFormatExec;
    undoRedoManager: UndoRedoManager;
    msWordPaste: MsWordPaste;
    formatPainterEditor: IFormatPainterEditor;
    editableElement: Element;
    emojiPickerObj: EmojiPickerAction;
    tableCellSelection: TableSelection;
    isDestroyed: boolean;
    private clickCount;
    private lastClickTime;
    userAgentData: CustomUserAgentData;
    /**
     * Constructor for creating the component
     *
     * @hidden
     * @deprecated
     * @param {ICommandModel} options - specifies the command Model
     */
    constructor(options: ICommandModel);
    private wireEvents;
    private unwireEvents;
    private onWordPaste;
    private onPropertyChanged;
    private editorKeyDown;
    private editorKeyUp;
    private onBegin;
    /**
     * execCommand
     *
     * @param {ExecCommand} command - specifies the execution command
     * @param {T} value - specifes the value.
     * @param {Event} event - specifies the call back event
     * @param {Function} callBack - specifies the function
     * @param {string} text - specifies the string value
     * @param {T} exeValue - specifies the values to be executed
     * @param {string} selector - specifies the selector values
     * @returns {void}
     * @hidden
     * @deprecated
     */
    execCommand<T>(command: ExecCommand, value: T, event?: Event, callBack?: Function, text?: string | Node, exeValue?: T, selector?: string, enterAction?: string): void;
    private editorMouseDown;
    private tripleClickSelection;
    private getParentBlockNode;
    destroy(): void;
    beforeSlashMenuApplyFormat(): void;
}
