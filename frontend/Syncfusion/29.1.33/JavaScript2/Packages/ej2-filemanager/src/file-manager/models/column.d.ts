import { ChildProperty, NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { SortComparer } from '../base/interface';
/**
 * Defines alignments of text, they are
 * * Left
 * * Right
 * * Center
 * * Justify
 */
export declare type TextAlign = 
/**  Defines Left alignment */
'Left' | 
/**  Defines Right alignment */
'Right' | 
/**  Defines Center alignment */
'Center' | 
/**  Defines Justify alignment */
'Justify';
/**
 * Defines the cell content's overflow mode. The available modes are
 * * `Clip` -  Truncates the cell content when it overflows its area.
 * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
 * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
 * also it will display tooltip while hover on ellipsis applied cell.
 */
export declare type ClipMode = 
/**  Truncates the cell content when it overflows its area */
'Clip' | 
/** Displays ellipsis when the cell content overflows its area */
'Ellipsis' | 
/** Displays ellipsis when the cell content overflows its area also it will display tooltip while hover on ellipsis applied cell. */
'EllipsisWithTooltip';
/**
 * Interface for a class Column
 */
export declare class Column extends ChildProperty<Column> {
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The bounded columns can be sort, filter and group etc.,
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     *
     * @default ''
     */
    field: string;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.
     *
     * @default ''
     */
    headerText: string;
    /**
     * Defines the width of the column in pixels or percentage.
     *
     * @default ''
     */
    width: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.
     *
     * @default ''
     */
    minWidth: string | number;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.
     *
     * @default ''
     */
    maxWidth: string | number;
    /**
     * Defines the alignment of the column in both header and content cells.
     *
     * @default Left
     */
    textAlign: TextAlign;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.
     *
     * @default Ellipsis
     */
    clipMode: ClipMode;
    /**
     * Define the alignment of column header which is used to align the text of column header.
     *
     * @default null
     */
    headerTextAlign: TextAlign;
    /**
     * Defines the data type of the column.
     *
     * @default null
     */
    type: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../common/internationalization/#manipulating-numbers)
     * and [`date`](../../common/internationalization/#manipulating-datetime) formats.
     *
     * @default null
     * @aspType string
     */
    format: string | NumberFormatOptions | DateFormatOptions;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either [template string](https://ej2.syncfusion.com/documentation/common/template-engine/) or HTML element ID.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
    /**
     * Defines the custom sort comparer function.
     * The sort comparer function has the same functionality like
     * [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) sort comparer.
     *
     * @default null
     * @aspType string
     */
    sortComparer: SortComparer | string;
    /**
     * Defines the column template as string or HTML element ID which is used to add customized element in the column header.
     *
     * @default null
     * @aspType string
     */
    headerTemplate: string | Function;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.
     *
     * @default true
     */
    allowSorting: boolean;
    /**
     * If `allowResizing` set to false, it disables resize option of a particular column.
     *
     * @default true
     */
    allowResizing: boolean;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * @default null
     */
    customAttributes: {
        [x: string]: Object;
    };
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     *
     * @default ''
     */
    hideAtMedia: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../common/internationalization/#manipulating-numbers)
     * and [`date`](../../common/internationalization/#manipulating-datetime) formats.
     *
     * @default null
     */
    customFormat: {
        [x: string]: Object;
    };
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.
     *
     * @deprecated
     * @default false
     */
    isPrimaryKey: boolean;
}
