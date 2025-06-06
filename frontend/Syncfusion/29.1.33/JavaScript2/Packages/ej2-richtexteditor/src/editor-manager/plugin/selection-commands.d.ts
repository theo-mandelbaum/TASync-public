import { FormatPainterValue, ITableSelection } from '../base/interface';
import { CustomUserAgentData } from '../../common/user-agent';
export declare class SelectionCommands {
    static enterAction: string;
    static isUnwrapped: boolean;
    static isWrapped: boolean;
    static userAgentData: CustomUserAgentData;
    /**
     * applyFormat method
     *
     * @param {Document} docElement - specifies the document
     * @param {string} format - specifies the string value
     * @param {Node} endNode - specifies the end node
     * @param {string} enterAction - specifies the enter key action
     * @param {ITableSelection} tableCellSelection - specifies the table cell selection
     * @param {string} value - specifies the string value
     * @param {string} selector - specifies the string
     * @param {FormatPainterValue} painterValues specifies the element created and last child
     * @returns {void}
     * @hidden
     * @deprecated
     */
    static applyFormat(docElement: Document, format: string, endNode: Node, enterAction: string, tableCellSelection?: ITableSelection, value?: string, selector?: string, painterValues?: FormatPainterValue): void;
    private static insertCursorNode;
    private static getCursorFormat;
    private static removeFormat;
    private static insertFormat;
    private static applyStyles;
    private static getPriorityFormatNode;
    private static getInsertNode;
    private static getChildNode;
    private static applySelection;
    private static GetFormatNode;
    private static updateStyles;
    private static insertFormatPainterElem;
    private static formatPainterCleanup;
    private static concatenateTextExcludingList;
    private static conCatenateTextNode;
    private static hasColorsEqual;
    private static isMentionStartOrEnd;
}
