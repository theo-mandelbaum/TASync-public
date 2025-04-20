import { TreeGrid } from '../base/treegrid';
import { ITreeData } from '../base';
/**
 * TreeGrid RowDragAndDrop module
 *
 * @hidden
 */
export declare class RowDD {
    private parent;
    /** @hidden
     * Represents the position where a row can be dropped within the TreeGrid.
     */
    private dropPosition;
    /** @hidden
     * Represents the record that is currently being dragged in the TreeGrid.
     */
    private draggedRecord;
    /** @hidden
     * Represents the record that the currently dragged item is being dropped onto in the TreeGrid.
     */
    private droppedRecord;
    /** @hidden
     * Stores the data representation of the TreeGrid, including hierarchical structures.
     */
    treeGridData: ITreeData[];
    /** @hidden
     * Represents the underlying hierarchical data of the TreeGrid.
     */
    private treeData;
    /** @hidden
     * Indicates whether a row can be dropped into the current target position during a drag-and-drop operation.
     */
    private canDrop;
    /** @hidden
     * Indicates whether the current drag operation includes child records of the dragged item.
     */
    private isDraggedWithChild;
    /** @hidden
     *
     */
    isMultipleGrid: string;
    /** @hidden
     * Indicates whether multiple TreeGrid instances are being managed or displayed.
     */
    private modifiedRecords;
    /** @hidden
     * Represents the currently selected item in the TreeGrid.
     */
    private selectedItem;
    /** @hidden
     * Represents the currently selected item in the TreeGrid.
     */
    private selectedRecords;
    /** @hidden
     * Holds an array of currently selected records in the TreeGrid.
     */
    private selectedRows;
    /** @hidden
     * Indicates whether there is a droppable item in the TreeGrid.
     */
    private hasDropItem;
    /** @hidden
     * Indicates whether the item is being added to the bottom of the TreeGrid.
     */
    isaddtoBottom: boolean;
    private selectedRecord;
    private selectedRow;
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    constructor(parent?: TreeGrid);
    /**
     * Retrieves child records for a specified parent ID in the TreeGrid.
     *
     * @param {string} id - The unique ID of the parent record for which to retrieve child records.
     * @returns {ITreeData[]} An array of child records corresponding to the specified parent ID.
     */
    private getChildrecordsByParentID;
    /**
     * @hidden
     * @returns {void}
     */
    private addEventListener;
    /**
     * Reorder the rows based on given indexes and position
     *
     * @returns {void}
     * @param {number[]} fromIndexes - source indexes of rows to be re-ordered
     * @param {number} toIndex - Destination row index
     * @param {string} position - Drop position as above or below or child
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    /**
     * Updates the rows and cells
     *
     * @param {Object[]} records - Updates the given records
     * @param {HTMLTableRowElement[]} rows - Updates the given rows
     * @param {number} index -  Updates the given cell index
     * @returns {void}
     */
    private updateRowAndCellElements;
    /**
     * Performs indent or outdent actions on selected records in the TreeGrid.
     *
     * @param {ITreeData} [record] - The record to be indented or outdented. If undefined, the method operates on the currently selected record.
     * @param {string} [request] - The action to perform, either 'indent' or 'outdent'.
     * @returns {void}
     */
    private indentOutdentAction;
    /**
     * Triggers a specified event for the TreeGrid, notifying subscribers about the event occurrence.
     *
     * @param {string} action - The action to be triggered, either 'indenting' or 'outdenting'.
     * @param {number} dropIndex - The index at which the row should be dropped.
     * @returns {void}
     */
    private eventTrigger;
    /**
     * Reorders the flat data array of the TreeGrid and updates the index of each record.
     *
     * @param {ITreeData[]} currentData - The array of tree data records to reorder.
     * @returns {ITreeData[]} The updated array of tree data records with indices set.
     */
    private orderToIndex;
    /**
     * Handles the addition of new rows to the TreeGrid.
     *
     * @param {Object} e - The event object containing information about the rows being added.
     * @param {number} e.toIndex - The index at which the new rows should be added in the TreeGrid.
     * @param {Object[]} e.records - An array of the records to be added to the TreeGrid.
     *
     * @returns {void} This function does not return any value.
     */
    private rowsAdded;
    /**
     * Handles the removal of specified rows from the TreeGrid.
     *
     * @param {Object} e - The event object containing information about the removed rows.
     * @param {number[]} e.indexes - An array of indexes of the rows that were removed.
     * @param {Object[]} e.records - An array of the records corresponding to the removed rows.
     *
     * @returns {void} This function does not return any value.
     */
    private rowsRemoved;
    /**
     * Refreshes the data source of the TreeGrid.
     *
     * @returns {void} This function does not return any value.
     */
    private refreshGridDataSource;
    /**
     * Removes the border from the first row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} element - The table row element from which to remove the border.
     * @returns {void} This function does not return any value.
     */
    private removeFirstrowBorder;
    /**
     * Removes the border from the last row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} element - The row element from which to remove the last row border.
     * @returns {void}
     */
    private removeLastrowBorder;
    /**
     * Updates the icons associated with the specified rows in the TreeGrid.
     *
     * @param {Element[]} row - The array of row elements to update the icons for.
     * @param {number} index - The index of the row being updated.
     * @param {RowDragEventArgs} args - The event arguments associated with the row drag operation.
     * @returns {string} The drop position ('topSegment', 'middleSegment', 'bottomSegment', or 'Invalid').
     */
    private updateIcon;
    /**
     * Updates the border status for a specified row and index.
     *
     * @private
     * @param {Element[]} row - The array of row elements to be updated.
     * @param {number} index - The index of the row element for which the border status is to be updated.
     * @returns {boolean} - Returns true if the border status was successfully updated, otherwise false.
     */
    private updateBorderStatus;
    /**
     * Removes the visual border from all child rows within the TreeGrid.
     *
     * @returns {void} No return value.
     */
    private removeChildBorder;
    /**
     * Adds a visual border to the first row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} targetRow - The target row element to which the border will be added, if it is the first row.
     * @returns {void} No return value.
     */
    private addFirstrowBorder;
    /**
     * Adds a visual border to the last row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} trElement - The table row element to which the border will be added, if it is the last row.
     * @returns {void} No return value.
     */
    private addLastRowborder;
    /**
     * Retrieves the total scroll width of the TreeGrid content area.
     *
     * @returns {number} The width of the scrollbar if content overflows, otherwise 0.
     */
    private getScrollWidth;
    /**
     * Adds an error element to the dragged row element during a row drag-and-drop operation.
     *
     * @returns {void} No return value.
     */
    private addErrorElem;
    /**
     * Removes the error element from the DOM and adjusts the position of the drop item count if necessary.
     *
     * @returns {void} No return value.
     */
    private removeErrorElem;
    /**
     * Applies drop border styles to row elements based on the current drop position ('topSegment' or 'bottomSegment').
     *
     * @param {Element} target - The target element where the drop action is taking place.
     * @param {boolean} [isBorderNeed=true] - Indicates whether a border is needed during the drop action. Defaults to `true`.
     * @returns {void} No return value.
     */
    private topOrBottomBorder;
    /**
     * Removes the drop border classes ('e-dropbottom' and 'e-droptop') from the parent element if present.
     *
     * @returns {void} No return value.
     */
    private removetopOrBottomBorder;
    /**
     * Adds or removes a specified class from a list of HTML elements.
     *
     * @param {Element[]} cells - The list of HTML elements to which the class will be added or removed.
     * @param {boolean} add - A flag indicating whether to add (`true`) or remove (`false`) the class.
     * @param {string} className - The class name to be added or removed from each element in `cells`.
     * @returns {void} No return value.
     */
    private addRemoveClasses;
    /**
     * Calculates the offset position of the specified HTML element relative to the document.
     *
     * @param {Element} element - The HTML element for which the offset position is calculated.
     * @returns {PositionOffSet} The offset position containing `top` and `left` values.
     */
    private getOffset;
    /**
     * Handles the dragging of rows in the TreeGrid.
     *
     * @param {RowDragEventArgs} args - The event arguments for the row drag action.
     * @returns {void} This function does not return a value.
     */
    private Rowdraging;
    /**
     * Handles the row drop event for the TreeGrid.
     *
     * @param {RowDropEventArgs} args - The event arguments for the row drop action.
     * @returns {void} This function does not return a value.
     */
    private rowDropped;
    /**
     * Removes the border elements for the first and last rows of the TreeGrid.
     *
     * @returns {void} This function does not return a value.
     */
    private removeRowBorders;
    /**
     * Handles the drag-and-drop operation between TreeGrids, updating the source and target grids.
     *
     * @param {RowDropEventArgs} args - The arguments related to the row drop event, including target information and data being dropped.
     * @returns {void} - This function does not return any value.
     */
    private dragDropGrid;
    /**
     * Retrieves the index of the target row based on its 'aria-rowindex' attribute.
     *
     * @param {Element} targetRow - The target row element from which to retrieve the index.
     * @returns {number} - The index of the target row, or 0 if the targetRow is null or undefined.
     */
    private getTargetIdx;
    /**
     * Retrieves the parent data of a given record during a row drag-and-drop operation.
     *
     * @param {ITreeData} record - The record for which to retrieve the parent data.
     * @param {Object[]} [data] - Optional data array containing additional information related to the drop operation.
     * @returns {void} - This function does not return any value.
     */
    private getParentData;
    /**
     * Handles the row drop operation for the tree grid.
     *
     * @param {RowDropEventArgs} args - The event arguments containing details about the drop operation, including the target index and data.
     * @param {boolean} [isByMethod=false] - Optional flag indicating if the drop operation is triggered by a method.
     * @returns {void} - This function does not return any value.
     */
    private dropRows;
    /**
     * Handles the logic for inserting a dragged record into the middle of a parent record's child records.
     *
     * @param {number} recordIndex - The index at which to insert the dragged record relative to the parent record's child records.
     * @returns {void} - This function does not return any value.
     */
    private dropMiddle;
    /**
     * Handles the logic for inserting a dragged record at the top of a parent record's child records.
     *
     * @param {number} recordIndex1 - The index at which to insert the dragged record in the tree grid data.
     * @returns {void} - This function does not return any value.
     */
    private dropAtTop;
    /**
     * Updates the level and hierarchy of the dragged record based on the drop position.
     *
     * @returns {void} - This function does not return any value.
     */
    private recordLevel;
    /**
     * Deletes the currently dragged row from the TreeGrid.
     *
     * @returns {void} - This function does not return any value.
     */
    private deleteDragRow;
    /**
     * Updates the child records of a specified parent record in the TreeGrid.
     *
     * @param {ITreeData} record - The parent record whose child records will be updated.
     * @param {number} count - The initial count to keep track of record positioning.
     * @returns {number} - The updated count after processing all child records.
     */
    private updateChildRecord;
    /**
     * Updates the level of child records for a specified parent record in the TreeGrid.
     *
     * @param {ITreeData} record - The parent record whose child records' levels will be updated.
     * @param {number} level - The current level of the parent record.
     * @returns {number} - The updated level after processing all child records.
     */
    private updateChildRecordLevel;
    /**
     * Removes specified records from the TreeGrid data source.
     *
     * @param {ITreeData} record - The record to be removed, including any child records if applicable.
     * @returns {void} - This method does not return a value.
     */
    private removeRecords;
    /**
     * Updates the records in the TreeGrid data source that have been modified.
     *
     * @param {ITreeData} record - The record to update, along with its parent records if applicable.
     * @returns {void} - This method does not return a value.
     */
    private updateModifiedRecords;
    /**
     * Recursively removes child records from the specified record and updates the data source.
     *
     * @param {ITreeData} record - The parent record whose child records are to be removed.
     * @returns {void} - This method does not return a value.
     */
    private removeChildItem;
    /**
     * Retrieves the count of child records associated with the specified parent record.
     *
     * @param {ITreeData} record - The parent record for which child count is to be calculated.
     * @param {number} count - The initial count to start with, usually passed as 0.
     * @returns {number} - The total count of child records.
     */
    private getChildCount;
    /**
     * Ensures the validity of the drop position for the dragged records by verifying the hierarchy and position constraints.
     * If the current record is found in the dragged records' children, sets the drop position to 'Invalid'.
     *
     * @param {ITreeData[]} draggedRecords - The array of dragged records being verified.
     * @param {ITreeData} currentRecord - The current record to check against dragged records.
     * @returns {void} - This function does not return a value.
     */
    private ensuredropPosition;
    private isDuplicateData;
    /**
     * Cleans up resources, event listeners, and DOM elements when the TreeGrid component is destroyed.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * @hidden
     * @returns {void}
     */
    removeEventListener(): void;
    /**
     * hidden
     */
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns RowDragAndDrop module name
     */
    private getModuleName;
}
