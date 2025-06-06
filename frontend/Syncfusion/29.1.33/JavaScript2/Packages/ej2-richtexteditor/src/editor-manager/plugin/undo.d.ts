import { EditorManager } from './../base/editor-manager';
import { IHtmlSubCommands, IHtmlUndoRedoData } from './../base/interface';
import { IHtmlKeyboardEvent } from './../../editor-manager/base/interface';
import { IUndoCallBack } from '../../common/interface';
/**
 * `Undo` module is used to handle undo actions.
 */
export declare class UndoRedoManager {
    element: HTMLElement;
    private parent;
    steps: number;
    undoRedoStack: IHtmlUndoRedoData[];
    undoRedoSteps: number;
    undoRedoTimer: number;
    private debounceListener;
    constructor(parent?: EditorManager, options?: {
        [key: string]: number;
    });
    protected addEventListener(): void;
    private onPropertyChanged;
    protected removeEventListener(): void;
    /**
     * onAction method
     *
     * @param {IHtmlSubCommands} e - specifies the sub command
     * @returns {void}
     * @hidden
     * @deprecated
     */
    onAction(e: IHtmlSubCommands): void;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    private keyDown;
    private keyUp;
    private getTextContentFromFragment;
    private isElementStructureEqual;
    /**
     * RTE collection stored html format.
     *
     * @function saveData
     * @param {KeyboardEvent} e - specifies the keyboard event
     * @returns {void}
     * @hidden
     * @deprecated
     */
    saveData(e?: KeyboardEvent | MouseEvent | IUndoCallBack): void;
    /**
     * Undo the editable text.
     *
     * @function undo
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @returns {void}
     * @hidden
     * @deprecated
     */
    undo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * Redo the editable text.
     *
     * @param {IHtmlSubCommands} e - specifies the sub commands
     * @function redo
     * @returns {void}
     * @hidden
     * @deprecated
     */
    redo(e?: IHtmlSubCommands | IHtmlKeyboardEvent): void;
    /**
     * getUndoStatus method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    getUndoStatus(): {
        [key: string]: boolean;
    };
    getCurrentStackIndex(): number;
}
