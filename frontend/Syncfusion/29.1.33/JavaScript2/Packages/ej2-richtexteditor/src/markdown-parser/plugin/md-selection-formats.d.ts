import { IMDFormats } from './../base/interface';
/**
 * SelectionCommands internal component
 *
 * @hidden
 * @deprecated
 */
export declare class MDSelectionFormats {
    private parent;
    private selection;
    syntax: {
        [key: string]: string;
    };
    private currentAction;
    constructor(parent: IMDFormats);
    private addEventListener;
    private removeEventListener;
    private keyDownHandler;
    private isBold;
    private isItalic;
    private isMatch;
    private multiCharRegx;
    private singleCharRegx;
    isAppliedCommand(cmd?: string): boolean;
    private applyCommands;
    private replaceAt;
    private restore;
    private textReplace;
    private isApplied;
    destroy(): void;
}
