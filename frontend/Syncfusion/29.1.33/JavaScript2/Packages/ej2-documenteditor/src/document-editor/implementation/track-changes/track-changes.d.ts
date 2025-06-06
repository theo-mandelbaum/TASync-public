import { RevisionType } from '../../base/types';
import { DocumentEditor } from '../../document-editor';
import { ElementBox } from '../viewer/page';
import { TextPosition } from '../selection';
/**
 * The revision class which holds the information related to changes made in the document
 */
export declare class Revision {
    /**
     * Gets or sets the author name who made the change
     *
     * @private
     */
    author: string;
    /**
     * Indicates when the track changes made
     *
     * @private
     */
    date: string;
    /**
     * Indicates the type of track changes revision
     *
     * @private
     */
    revisionType: RevisionType;
    /**
     * Holds the reference of the items which are under this revision.
     *
     * @private
     */
    range: object[];
    /**
     * @private
     */
    revisionID: string;
    private owner;
    /**
     * Used to update cursor position by ensuring items were removed or not
     */
    private isContentRemoved;
    private isTableRevision;
    /**
     * Indicates whether to skip unlinking ranges for table elements.
     */
    private canSkipTableItems;
    private skipUnLinkElement;
    constructor(documentHelper: DocumentEditor, author: string, date: string);
    private handleAcceptReject;
    private handleGroupAcceptReject;
    /**
     * Method which accepts the selected revision, revision marks will be removed and changes will be included in the viewer.
     *
     * @returns {void}
     */
    accept(): void;
    /**
     * Method which rejects the selected revision, revision marks will be removed leaving the original content.
     */
    reject(): void;
    /**
     * Select the current revision.
     */
    select(): void;
    /**
     * Unlinks revision and its assosiated range
     * @private
     * @param item
     * @param revision
     * @param isFromAccept
     */
    unlinkRangeItem(item: any, revision: Revision, isFromAccept: boolean, start: TextPosition, end: TextPosition): boolean;
    private removeRevisionFromPara;
    private updateRevisionID;
    private removeRevisionItemsFromRange;
    /**
     * Method to clear linked ranges in revision
     *
     * @private
     * @param {any} item - Specifies the item
     * @returns {void}
     */
    removeRangeRevisionForItem(item: any, skipUpdate?: boolean): void;
    /**
     * @private
     * @param {Element} element - Specifies the element.
     * @returns {boolean} Resturs skip element removal
     */
    skipeElementRemoval(element: ElementBox): boolean;
    private removeRevisionFromRow;
    private removeItem;
    private canSkipCloning;
    /**
     * @private
     *
     */
    destroy(): void;
    /**
     * @private
     * @returns {Revision} - Returns revision
     */
    clone(): Revision;
    /**
     * Method to clone the revisions for the element
     *
     * @param {Revision[]} revisions - revision array.
     * @returns {string[]} - returns clones revisions.
     */
    static cloneRevisions(revisions: Revision[]): string[];
}
/**
 * Represents the revision collections in the document.
 */
export declare class RevisionCollection {
    /**
     * @private
     */
    changes: Revision[];
    private owner;
    /**
     * @private
     */
    skipGroupAcceptReject: boolean;
    /**
     * @private
     */
    get(index: number): Revision;
    readonly length: number;
    constructor(owner: DocumentEditor);
    remove(revision: Revision): any;
    /**
     * Method which accepts all the revision in the revision collection
     *
     * @returns {void}
     */
    acceptAll(): void;
    /**
     * Method which rejects all the revision in the revision collection
     *
     * @returns {void}
     */
    rejectAll(): void;
    /**
     * @private
     * @param {boolean} isfromAcceptAll - Specifies the is accept all.
     * @param {Revision[]} changes - Specifies the revisions.
     * @returns {void}
     */
    handleRevisionCollection(isfromAcceptAll: boolean, changes?: Revision[]): void;
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    destroy(): void;
}
