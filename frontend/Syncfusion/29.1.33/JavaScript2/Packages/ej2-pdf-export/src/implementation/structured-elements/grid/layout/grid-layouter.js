var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PdfGrid } from '../pdf-grid';
import { PdfStringFormat } from './../../../graphics/fonts/pdf-string-format';
import { SizeF, RectangleF, PointF } from './../../../drawing/pdf-drawing';
import { PdfBorders } from '../styles/pdf-borders';
import { PdfLayoutType, PdfLayoutBreakType } from './../../../graphics/figures/enum';
import { PdfLayoutResult, PdfLayoutFormat, ElementLayouter } from './../../../graphics/figures/base/element-layouter';
import { PdfHorizontalOverflowType } from '../styles/style';
import { TemporaryDictionary } from './../../../collections/object-object-pair/dictionary';
import { PdfStringLayouter } from './../../../graphics/fonts/string-layouter';
import { PdfDocument } from './../../../document/pdf-document';
/**
 * Class `lay outing the text`.
 *
 */
var PdfGridLayouter = /** @class */ (function (_super) {
    __extends(PdfGridLayouter, _super);
    //constructor
    /**
     * Initialize a new instance for `PdfGrid` class.
     * @private
     */
    function PdfGridLayouter(baseFormat) {
        var _this = _super.call(this, baseFormat) || this;
        /**
         * @hidden
         * @private
         */
        _this.gridInitialWidth = 0;
        /**
         * @hidden
         * @private
         */
        _this.gridSize = new SizeF(0, 0);
        _this.parentCellIndex = 0;
        _this.tempWidth = 0;
        _this.childheight = 0;
        /**
         * Check weather it is `child grid or not`.
         * @private
         */
        _this.isChildGrid = false;
        /**
         * @hidden
         * @private
         */
        _this.hasRowSpanSpan = false;
        /**
         * @hidden
         * @private
         */
        _this.isRearranged = false;
        /**
         * @hidden
         * @private
         */
        _this.pageBounds = new RectangleF();
        /**
         * @hidden
         * @private
         */
        _this.listOfNavigatePages = [];
        /**
         * @hidden
         * @private
         */
        _this.flag = true;
        /**
         * @hidden
         * @private
         */
        _this.columnRanges = [];
        /**
         * @hidden
         * @private
         */
        _this.currentLocation = new PointF(0, 0);
        /**
         * @hidden
         * @private
         */
        _this.breakRow = true;
        _this.slr = null;
        _this.remainderText = null;
        _this.isPaginate = false;
        /**
         * Checks whether the x co-ordinate is need to set as client size or not.
         * @hidden
         * @private
         */
        _this.isOverloadWithPosition = false;
        return _this;
    }
    Object.defineProperty(PdfGridLayouter.prototype, "Grid", {
        //Properties
        get: function () {
            return this.elements;
        },
        enumerable: true,
        configurable: true
    });
    // Constructors
    /**
     * Initializes a new instance of the `StringLayouter` class.
     * @private
     */
    //Public methods
    /**
     * `Layouts` the text.
     * @private
     */
    /**
     * `Layouts` the specified graphics.
     * @private
     */
    /**
     * `Layouts` the specified graphics.
     * @private
     */
    /*public layout(graphics : PdfLayoutParams) : PdfLayoutResult
    public layout(graphics : PdfGraphics, bounds : RectangleF) : void
    public layout(graphics : PdfGraphics, bounds : PointF) : void
    public layout(graphics ?: PdfGraphics | PdfLayoutParams, bounds ?: PointF | RectangleF) : void | PdfLayoutResult  {
        if (graphics instanceof PdfGraphics) {
        if (bounds instanceof PointF) {
            if (bounds.x === 0) {
                bounds.x = PdfBorders.default.right.width / 2;
            }
            if (bounds.y === 0) {
                bounds.y = PdfBorders.default.top.width / 2;
            }
            let boundaries : RectangleF = new RectangleF(bounds, new SizeF(0, 0));
            this.layout(graphics, boundaries);
        } else {
            let width : number = graphics.clientSize.width;
            let parameter : PdfLayoutParams = new PdfLayoutParams();
            parameter.bounds = bounds;
            this.currentGraphics = graphics;
            if (graphics.layer != null) {
                let index : number = 0;
                if (this.currentGraphics.page instanceof PdfPage) {
                    index = (this.currentGraphics.page as PdfPage).section.indexOf(this.currentGraphics.page as PdfPage);
                } else {
                    index = (this.currentGraphics.page as PdfPageBase).defaultLayerIndex;
                }
            } else {
                this.layoutInternal(parameter);
            }
        }
    }
    }*/
    /**
     * Gets the `format`.
     * @private
     */
    PdfGridLayouter.prototype.getFormat = function (format) {
        var f = format;
        return f;
    };
    /**
     * `Layouts` the element.
     * @private
     */
    PdfGridLayouter.prototype.layoutInternal = function (param) {
        var format = this.getFormat(param.format);
        this.gridLayoutFormat = this.getFormat(param.format);
        this.currentPage = param.page;
        if (this.currentPage !== null) {
            var pageHeight = this.currentPage.getClientSize().height;
            var pageWidth = this.currentPage.getClientSize().width;
            this.currentPageBounds = this.currentPage.getClientSize();
        }
        else {
            throw Error('Can not set page as null');
            //this.currentPageBounds = this.currentGraphics.clientSize;
        }
        this.currentGraphics = this.currentPage.graphics;
        //this.currentGraphics = (this.currentPage != null ) ? this.currentPage.graphics : this.currentGraphics;
        // if (this.currentGraphics.layer !== null) {
        //     let index : number = 0;
        //     if (this.currentGraphics.page instanceof PdfPage) {
        //         index = (this.currentGraphics.page as PdfPage).section.indexOf(this.currentGraphics.page as PdfPage);
        //     } else {
        //         index = (this.currentGraphics.page as PdfPageBase).defaultLayerIndex;
        //     }
        //     this.listOfNavigatePages.push(index);
        // }
        var index = 0;
        index = this.currentGraphics.page.section.indexOf(this.currentGraphics.page);
        this.listOfNavigatePages.push(index);
        if (format != null && format.break === PdfLayoutBreakType.FitColumnsToPage) {
            this.currentBounds = new RectangleF(new PointF(param.bounds.x, param.bounds.y), new SizeF(this.Grid.columns.width, this.currentGraphics.clientSize.height));
        }
        else {
            this.currentBounds = new RectangleF(new PointF(param.bounds.x, param.bounds.y), this.currentGraphics.clientSize);
        }
        //this.currentBounds = new RectangleF(new PointF(param.bounds.x, param.bounds.y), this.currentGraphics.clientSize);
        if (this.Grid.rows.count !== 0) {
            this.currentBounds.width = (param.bounds.width > 0) ? param.bounds.width :
                (this.currentBounds.width - this.Grid.rows.getRow(0).cells.getCell(0).style.borders.left.width / 2);
        }
        else if (this.Grid.headers.count !== 0) {
            // this.currentBounds.width = (param.bounds.width > 0) ? param.bounds.width : (this.currentBounds.width -
            //                                 this.Grid.headers.getHeader(0).cells.getCell(0).style.borders.left.width / 2);
            this.currentBounds.width = param.bounds.width;
        }
        else {
            throw Error('Please add row or header into grid');
        }
        this.startLocation = new PointF(param.bounds.x, param.bounds.y);
        // if (this.Grid.style.allowHorizontalOverflow && this.currentBounds.width > this.currentGraphics.clientSize.width) {
        //     this.currentBounds.width = this.currentGraphics.clientSize.width;
        //     this.currentBounds.width -= this.currentBounds.x;
        // }
        // if (this.Grid.isChildGrid) {
        //     this.childheight = param.bounds.height;
        // }
        // if (param.format !== null && param.format.usePaginateBounds) {
        //     if (param.format.paginateBounds.height > 0) {
        //         this.currentBounds.height = param.format.paginateBounds.height;
        //     }
        //} else 
        if (param.bounds.height > 0 && !this.Grid.isChildGrid) {
            this.currentBounds.height = param.bounds.height;
        }
        if (!this.Grid.isChildGrid) {
            this.hType = this.Grid.style.horizontalOverflowType;
        }
        if (!this.Grid.style.allowHorizontalOverflow) {
            this.columnRanges = [];
            if (typeof this.Grid.isChildGrid !== 'undefined' && typeof this.Grid.isChildGrid) {
                this.Grid.measureColumnsWidth(this.currentBounds);
            }
            else {
                this.Grid.measureColumnsWidth(new RectangleF(this.currentBounds.x, this.currentBounds.y, this.currentBounds.x + this.currentBounds.width, this.currentBounds.height));
            }
            this.columnRanges.push([0, this.Grid.columns.count - 1]);
        }
        else {
            this.Grid.measureColumnsWidth();
            this.determineColumnDrawRanges();
        }
        if (this.Grid.hasRowSpanSpan) {
            for (var i = 0; i < this.Grid.rows.count; i++) {
                if (this.Grid.rows.getRow(i).height !== -1 && !this.Grid.rows.getRow(i).isRowHeightSet) {
                    this.Grid.rows.getRow(i).isRowHeightSet = true;
                }
            }
        }
        var result = this.layoutOnPage(param);
        return result;
    };
    // /* tslint:enable */
    /**
     * `Determines the column draw ranges`.
     * @private
     */
    PdfGridLayouter.prototype.determineColumnDrawRanges = function () {
        var startColumn = 0;
        var endColumn = 0;
        var cellWidths = 0;
        var availableWidth = this.currentGraphics.clientSize.width - this.currentBounds.x;
        for (var i = 0; i < this.Grid.columns.count; i++) {
            cellWidths += this.Grid.columns.getColumn(i).width;
            if (cellWidths >= availableWidth) {
                var subWidths = 0;
                for (var j = startColumn; j <= i; j++) {
                    subWidths += this.Grid.columns.getColumn(j).width;
                    if (subWidths > availableWidth) {
                        break;
                    }
                    endColumn = j;
                }
                this.columnRanges.push([startColumn, endColumn]);
                startColumn = endColumn + 1;
                endColumn = startColumn;
                cellWidths = (endColumn <= i) ? this.Grid.columns.getColumn(i).width : 0;
            }
        }
        // if (startColumn !== this.columns.Count) {
        this.columnRanges.push([startColumn, this.Grid.columns.count - 1]);
        // }
    };
    /**
     * `Layouts the on page`.
     * @private
     */
    PdfGridLayouter.prototype.layoutOnPage = function (param) {
        /* tslint:disable */
        this.pageBounds.x = param.bounds.x;
        this.pageBounds.y = param.bounds.y;
        this.pageBounds.height = param.bounds.height;
        var format = this.getFormat(param.format);
        var endArgs = null;
        var result = null;
        var layoutedPages = new TemporaryDictionary();
        var startPage = param.page;
        var isParentCell = false;
        var cellBounds = [];
        for (var index = 0; index < this.columnRanges.length; index++) {
            var range = this.columnRanges[index];
            this.cellStartIndex = range[0];
            this.cellEndIndex = range[1];
            var returnObject = this.raiseBeforePageLayout(this.currentPage, this.currentBounds, this.currentRowIndex);
            this.currentBounds = returnObject.currentBounds;
            this.currentRowIndex = returnObject.currentRowIndex;
            // if (returnObject.returnValue) {
            //     result = new PdfGridLayoutResult(this.currentPage, this.currentBounds);
            //     break;
            // }
            //Draw Headers.
            var drawHeader = void 0;
            for (var i_1 = 0; i_1 < this.Grid.headers.count; i_1++) {
                var row = this.Grid.headers.getHeader(i_1);
                var headerHeight = this.currentBounds.y;
                this.isHeader = true;
                if (startPage != this.currentPage) {
                    for (var k = this.cellStartIndex; k <= this.cellEndIndex; k++) {
                        if (row.cells.getCell(k).isCellMergeContinue) {
                            row.cells.getCell(k).isCellMergeContinue = false;
                            row.cells.getCell(k).value = "";
                        }
                    }
                }
                // RowLayoutResult
                var headerResult = this.drawRow(row);
                if (headerHeight === this.currentBounds.y) {
                    drawHeader = true;
                    if (PdfGridLayouter.repeatRowIndex === -1) {
                        PdfGridLayouter.repeatRowIndex = i_1;
                    }
                }
                else {
                    drawHeader = false;
                }
                if (!headerResult.isFinish && startPage !== null
                    && format.layout !== PdfLayoutType.OnePage && drawHeader) {
                    this.startLocation.x = this.currentBounds.x;
                    this.currentPage = this.getNextPageformat(format);
                    this.startLocation.y = this.currentBounds.y;
                    if (typeof format.paginateBounds !== 'undefined' && format.paginateBounds.x === 0 && format.paginateBounds.y === 0 && format.paginateBounds.width === 0 && format.paginateBounds.height === 0)
                        this.currentBounds.x += this.startLocation.x;
                    this.drawRow(row);
                }
                this.isHeader = false;
            }
            var i = 0;
            var length_1 = this.Grid.rows.count;
            var repeatRow = void 0;
            var startingHeight = 0;
            var flag = true;
            //Here is to draw parent Grid and Cells
            cellBounds = [];
            //Draw row by row with the specified cell range.
            for (var j = 0; j < this.Grid.rows.count; j++) {
                var row = this.Grid.rows.getRow(j);
                i++;
                this.currentRowIndex = i - 1;
                var originalHeight = this.currentBounds.y;
                startPage = this.currentPage;
                PdfGridLayouter.repeatRowIndex = -1;
                if (flag && row.grid.isChildGrid) {
                    startingHeight = originalHeight;
                    flag = false;
                }
                var rowResult = null;
                ///rowResult = this.drawRow(row);
                /*if(!row.isrowFinish) {
                    if(!row.grid.isgridSplit){
                        rowResult = this.drawRow(row);
                        row.isrowFinish = true;
                        row.isrowDraw = true;
                    } else {
                        if(!row.isrowDraw){
                            rowResult = this.drawRow(row);
                            row.isrowFinish = true;
                            row.isrowDraw = true;
                            row.grid.isgridSplit = false;
                        } else {
                            rowResult =  null;
                            break;
                        }
                    }
                }
                else {
                    //row.isrowFinish = false;
                    //rowResult = this.drawRow(row);
                    rowResult = null;
                    break;
                    
                }             */
                if (this.Grid.splitChildRowIndex == -1) {
                    rowResult = this.drawRow(row);
                    row.isrowFinish = true;
                }
                else {
                    if (row.grid.ParentCell.row.grid.isGridSplit && this.Grid.splitChildRowIndex <= row.rowIndex) {
                        rowResult = this.drawRow(row);
                        row.isrowFinish = true;
                    }
                    else if (row.isrowFinish) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                //rowResult = this.drawRow(row);
                cellBounds.push(rowResult.bounds.width);
                /*if (row.isRowBreaksNextPage)
                    {
                        let x : number  = 0;
                        for (let l : number = 0; l < row.cells.count; l++)
                        {
                            let isNestedRowBreak : boolean = false;
                            if (row.height == row.cells.getCell(l).height)
                            {
                                let n : number;
                                let grid : PdfGrid = row.cells.getCell(l).value as PdfGrid;
                                for (let m : number = grid.rows.count; 0 < m; m--)
                                {
                                    if ((grid.rows.getRow(m - 1).rowBreakHeight > 0))
                                    {
                                        isNestedRowBreak = true;
                                        break;
                                    }
                                    if (grid.rows.getRow(m - 1).isRowBreaksNextPage)
                                    {
                                        row.rowBreakHeightValue = grid.rows.getRow(m - 1).rowBreakHeightValue;
                                        break;
                                    }
                                    row.rowBreakHeightValue += grid.rows.getRow(m - 1).height;
                                }
                            }
                            if (isNestedRowBreak)
                                break;
                        }
                        for (let j : number = 0; j < row.cells.count; j++)
                        {

                            if (row.height > row.cells.getCell(j).height)
                            {
                                row.cells.getCell(j).value = " ";
                                let rect : RectangleF ;
                                let page : PdfPage = this.getNextPage(this.currentPage);
                                let section : PdfSection = this.currentPage.section;
                                let index : number = section.indexOf(page);
                                for (let k : number = 0; k < (section.count - 1) - index; k++)
                                {
                                    rect = new RectangleF(x, 0, row.grid.columns.getColumn(j).width, page.getClientSize().height);
                                    PdfGridLayouter.repeatRowIndex = -1;
                                    row.cells.getCell(j).draw(page.graphics, rect, false);
                                    page = this.getNextPage(page);
                                }
                                rect = new RectangleF(x, 0, row.grid.columns.getColumn(j).width, row.rowBreakHeightValue);

                                row.cells.getCell(j).draw(page.graphics, rect, false);
                            }
                            x += row.grid.columns.getColumn(j).width;
                        }
                    }*/
                //if height remains same, it is understood that row is not drawn in the page
                if (originalHeight === this.currentBounds.y) {
                    repeatRow = true;
                    PdfGridLayouter.repeatRowIndex = this.Grid.rows.rowCollection.indexOf(row);
                }
                else {
                    repeatRow = false;
                    PdfGridLayouter.repeatRowIndex = -1;
                }
                while (!rowResult.isFinish && startPage != null) {
                    var tempResult = this.getLayoutResult();
                    /*if (startPage != this.currentPage)
                        {
                            if (row.grid.isChildGrid && row.grid.ParentCell != null)
                            {
                                let bounds : RectangleF= new RectangleF(new PointF(format.paginateBounds.x,format.paginateBounds.y), new SizeF(param.bounds.width, tempResult.bounds.height));
                                bounds.x += param.bounds.x;
                                if (row.grid.ParentCell.row.grid.style.cellPadding != null)
                                {
                                    bounds.y += row.grid.ParentCell.row.grid.style.cellPadding.top;
                                    if (bounds.height > this.currentPageBounds.height)
                                    {
                                        bounds.height = this.currentPageBounds.height - bounds.y;
                                        bounds.height -= (row.grid.ParentCell.row.grid.style.cellPadding.bottom);
                                    }
                                }
                                // Draw border for cells in the nested grid cell's row.
                                for (let c : number = 0; c < row.cells.count; c++)
                                {
                                    let cell : PdfGridCell = row.cells.getCell(c);
                                    let cellWidth :  number= 0;
                                    if (cell.columnSpan > 1)
                                    {
                                        for (; c < cell.columnSpan; c++)
                                            cellWidth += row.grid.columns.getColumn(c).width;
                                    }
                                    else
                                        cellWidth = Math.max(cell.width, row.grid.columns.getColumn(c).width);
                                    cell.drawCellBorders(this.currentGraphics, new RectangleF(new PointF(bounds.x,bounds.y), new SizeF(cellWidth, bounds.height)));
                                    bounds.x += cellWidth;
                                    c += (cell.columnSpan - 1);
                                }
                            }
                        }
                        */
                    endArgs = this.raisePageLayouted(tempResult);
                    if (endArgs.cancel || repeatRow)
                        break;
                    else if (this.Grid.allowRowBreakAcrossPages) {
                        //If there is no space in the current page, add new page and then draw the remaining row.
                        this.currentPage = this.getNextPageformat(format);
                        originalHeight = this.currentBounds.y;
                        var location_1 = new PointF(PdfBorders.default.right.width / 2, PdfBorders.default.top.width / 2);
                        if ((format.paginateBounds.x === 0 && format.paginateBounds.y === 0 && format.paginateBounds.width === 0 &&
                            format.paginateBounds.height === 0) && (this.startLocation.x === location_1.x && this.startLocation.y === location_1.y)) {
                            this.currentBounds.x += this.startLocation.x;
                            this.currentBounds.y += this.startLocation.y;
                        }
                        if (this.isPaginate) {
                            this.startLocation.y = this.currentBounds.y;
                            this.isPaginate = false;
                        }
                        if (this.Grid.isChildGrid && row.grid.ParentCell != null) {
                            if (this.Grid.ParentCell.row.grid.style.cellPadding != null) {
                                if (row.rowBreakHeight + this.Grid.ParentCell.row.grid.style.cellPadding.top < this.currentBounds.height) {
                                    this.currentBounds.y = this.Grid.ParentCell.row.grid.style.cellPadding.top;
                                }
                            }
                        }
                        if (row.grid.ParentCell != null) {
                            row.grid.ParentCell.row.isRowBreaksNextPage = true;
                            row.grid.ParentCell.row.rowBreakHeightValue = row.rowBreakHeight + this.Grid.ParentCell.row.grid.style.cellPadding.top + this.Grid.ParentCell.row.grid.style.cellPadding.bottom;
                            for (var i_2 = row.rowIndex + 1; i_2 < row.grid.rows.count; i_2++) {
                                row.grid.ParentCell.row.rowBreakHeightValue += row.grid.rows.getRow(i_2).height;
                            }
                            //row.rowBreakHeight = row.grid.ParentCell.row.rowBreakHeightValue;
                        }
                        /*if (row.noOfPageCount > 1)
                        {
                            let temp : number = row.rowBreakHeightValue;
                            for (let j : number = 1; j < row.noOfPageCount; j++)
                            {
                                row.rowBreakHeightValue = 0;
                                row.height = ((row.noOfPageCount - 1) * this.currentPage.getClientSize().height);
                                this.drawRow(row);
                                this.currentPage = this.getNextPageformat(format);
                                startPage = this.currentPage;
                            }
                            row.rowBreakHeightValue = temp;
                            row.noOfPageCount = 1;
                            rowResult = this.drawRow(row);
                        } else {
                            rowResult = this.drawRow(row);
                        }
                        /*if(row.grid.isChildGrid){
                            row.isrowFinish = false;
                            row.isrowDraw = false;
                            row.grid.isgridSplit = true;
                            row.grid.ParentCell.row.grid.isgridSplit = true;
                            //rowResult.isFinish = false;
                            break;
                        }*/
                        if (row.grid.isChildGrid) {
                            //row.grid.isgridSplit = true;
                            row.isrowFinish = false;
                            //row.grid.ParentCell.row.grid.isgridSplit = true;
                            row.grid.splitChildRowIndex = row.rowIndex;
                            row.grid.ParentCell.row.grid.splitChildRowIndex = row.grid.ParentCell.row.rowIndex;
                            if (row.grid.ParentCell.row.grid.isGridSplit) {
                                row.grid.ParentCell.row.noOfPageCount += 1;
                                row.grid.ParentCell.row.grid.isGridSplit = false;
                            }
                            break;
                        }
                        if (row.noOfPageCount < 1) {
                            if (row.grid.splitChildRowIndex != -1) {
                                row.grid.isGridSplit = true;
                            }
                            if (row.style.border != null && ((row.style.border.left != null && row.style.border.left.width !== 1)
                                || (row.style.border.top != null && row.style.border.top.width !== 1))) {
                                var x = row.style.border.left.width / 2;
                                var y = row.style.border.top.width / 2;
                                if (this.currentBounds.x === PdfBorders.default.right.width / 2 && this.currentBounds.y === PdfBorders.default.right.width / 2) {
                                    var newBound = new RectangleF(x, y, this.currentBounds.width, this.currentBounds.height);
                                    this.currentBounds = newBound;
                                }
                            }
                            if (this.Grid.repeatHeader) {
                                for (var j_1 = 0; j_1 < this.Grid.headers.count; j_1++) {
                                    var headerRepeat = this.Grid.headers.getHeader(j_1);
                                    this.drawRow(headerRepeat);
                                }
                            }
                            rowResult = this.drawRow(row);
                            if (row.noOfPageCount >= 1) {
                                var temp = row.rowBreakHeightValue;
                                for (var j_2 = 0; j_2 < row.noOfPageCount; j_2++) {
                                    //this.currentPage.section.add();
                                    var tempResult1 = this.getLayoutResult();
                                    endArgs = this.raisePageLayouted(tempResult1);
                                    this.currentPage = this.getNextPageformat(format);
                                    originalHeight = this.currentBounds.y;
                                    //row.rowBreakHeightValue = 0;
                                    if (row.grid.splitChildRowIndex != -1) {
                                        row.grid.isGridSplit = true;
                                    }
                                    this.currentBounds.y = 0.5;
                                    if (this.Grid.repeatHeader) {
                                        for (var i_3 = 0; i_3 < this.Grid.headers.count; i_3++) {
                                            var header = this.Grid.headers.getHeader(i_3);
                                            this.drawRow(header);
                                        }
                                    }
                                    //row.height = ((row.noOfPageCount - 1) * this.currentPage.getClientSize().height);
                                    this.drawRow(row);
                                }
                                // row.rowBreakHeight = temp;
                                // row.noOfPageCount = 1;
                                // rowResult = this.drawRow(row);
                            }
                            row.grid.splitChildRowIndex = -1;
                            row.grid.isGridSplit = false;
                            rowResult.isFinish = this.checkIsFisished(row);
                            //row.NestedGridLayoutResult.bounds.height = row.rowBreakHeightValue;
                            //this.currentBounds.y = rowResult.bounds.y;
                            for (var i_4 = 0; i_4 < row.cells.count; i_4++) {
                                if (row.cells.getCell(i_4).value instanceof PdfGrid) {
                                    row.cells.getCell(i_4).value.splitChildRowIndex = -1;
                                }
                            }
                        }
                    }
                    // else if (!this.Grid.allowRowBreakAcrossPages && i < length)
                    // {
                    //     this.currentPage = this.getNextPageformat(format);
                    //     break;
                    // }
                    // else if (i >= length)
                    //     break;
                }
                if (!rowResult.isFinish && startPage !== null && format.layout !== PdfLayoutType.OnePage && repeatRow) {
                    // During pagination, cell position is maintained here.
                    this.startLocation.x = this.currentBounds.x;
                    var isAddNextPage = false;
                    this.currentPage = this.getNextPageformat(format);
                    /*if (!this.Grid.isSingleGrid)
                    {
                        for ( let j : number= 0; j < this.Grid.rows.count; j++)
                        {
                            let isWidthGreaterthanParent : boolean = false;
                            for (let k : number = 0; k < this.Grid.rows.getRow(j).cells.count; k++)
                            {
                                if (this.Grid.rows.getRow(j).cells.getCell(k).width > this.currentPageBounds.width)
                                    isWidthGreaterthanParent = true;
                            }
                            if (isWidthGreaterthanParent && this.Grid.rows.getRow(j).cells.getCell(this.rowBreakPageHeightCellIndex).pageCount > 0)
                            {
                                isAddNextPage = true;
                            }
                        }
                    }
                    if (!this.Grid.isRearranged && isAddNextPage)
                         {
                             let section : PdfSection = this.currentPage.section;
                             
                             //this.currentPage = section.add();
                         
                             this.currentGraphics = this.currentPage.graphics;
                             this.currentBounds = new RectangleF(new PointF(0,0), this.currentPage.getClientSize());
                          
                             let pageindex  : number = (this.currentGraphics.page as PdfPage).section.indexOf(this.currentGraphics.page as PdfPage);
                         }
                         else
                         {
                             this.currentPage = this.getNextPageformat(format);
                         }
                         if (format.paginateBounds.y == 0)
                             this.currentBounds.y = PdfBorders.default.top.width/2;
                         else
                         {
                             this.currentBounds.y = format == null ? 0 : format.paginateBounds.y;
                             
                         }*/
                    if (this.raiseBeforePageLayout(this.currentPage, this.currentBounds, this.currentRowIndex).returnValue) {
                        break;
                    }
                    if ((param.format !== null) && !param.format.usePaginateBounds && param.bounds !== null &&
                        param.bounds.height > 0 && !this.Grid.isChildGrid) {
                        this.currentBounds.height = param.bounds.height;
                    }
                    if (typeof param.format !== 'undefined' && param.format != null && typeof param.format.usePaginateBounds !== 'undefined' && !param.format.usePaginateBounds && !(param.format.paginateBounds.x === 0 && param.format.paginateBounds.y === 0 && param.format.paginateBounds.width === 0 && param.format.paginateBounds.height === 0) && param.format.paginateBounds.y === 0) {
                        this.currentBounds.y = PdfBorders.default.top.width / 2;
                    }
                    else {
                        this.currentBounds.y = format == null ? 0 : format.paginateBounds.y;
                        if (format != null && (format.paginateBounds.x !== 0 || format.paginateBounds.y !== 0 || format.paginateBounds.height !== 0 || format.paginateBounds.width !== 0)) {
                            this.currentBounds.x = format.paginateBounds.x;
                            this.currentBounds.width = format.paginateBounds.width;
                            this.currentBounds.height = format.paginateBounds.height;
                        }
                    }
                    if (typeof param.format !== 'undefined' && (param.format !== null) && typeof param.format.usePaginateBounds !== 'undefined' && !param.format.usePaginateBounds && param.bounds !== null &&
                        param.bounds.y > 0 && !this.Grid.isChildGrid) {
                        this.currentBounds.y = param.bounds.y;
                    }
                    this.startLocation.y = this.currentBounds.y;
                    if ((format.paginateBounds.x === format.paginateBounds.y) &&
                        (format.paginateBounds.y === format.paginateBounds.height) &&
                        (format.paginateBounds.height === format.paginateBounds.width) && (format.paginateBounds.width === 0)) {
                        this.currentBounds.x += this.startLocation.x;
                    }
                    if (this.currentBounds.x === PdfBorders.default.left.width / 2) {
                        this.currentBounds.y += this.startLocation.x;
                    }
                    if (this.Grid.repeatHeader) {
                        for (var i_5 = 0; i_5 < this.Grid.headers.count; i_5++) {
                            var header = this.Grid.headers.getHeader(i_5);
                            this.drawRow(header);
                        }
                    }
                    this.drawRow(row);
                    if (this.currentPage !== null && !layoutedPages.containsKey(this.currentPage)) {
                        layoutedPages.add(this.currentPage, range);
                    }
                }
                if (row.NestedGridLayoutResult != null) {
                    // Position for next row in the grid.
                    this.currentPage = row.NestedGridLayoutResult.page;
                    this.currentGraphics = this.currentPage.graphics; //If not, next row will not be drawn in the layouted page.
                    this.startLocation = new PointF(row.NestedGridLayoutResult.bounds.x, row.NestedGridLayoutResult.bounds.y);
                    var recalHeight = this.ReCalculateHeight(row, row.NestedGridLayoutResult.bounds.height);
                    this.currentBounds.y = recalHeight;
                    //this.currentBounds.y = row.NestedGridLayoutResult.bounds.height;
                    if (startPage != this.currentPage) {
                        var section = this.currentPage.section;
                        var startIndex = section.indexOf(startPage) + 1;
                        var endIndex = section.indexOf(this.currentPage);
                        for (var page = startIndex; page < endIndex + 1; page++) {
                            var pageGraphics = section.getPages()[page].graphics;
                            var location_2 = new PointF(format.paginateBounds.x, format.paginateBounds.y);
                            var height = page == endIndex ? (row.NestedGridLayoutResult.bounds.height - param.bounds.y) :
                                (this.currentBounds.height - location_2.y);
                            if (height <= pageGraphics.clientSize.height)
                                height += param.bounds.y;
                            // if (row.grid.isChildGrid && row.grid.ParentCell != null)
                            //     location.x += param.bounds.x;
                            location_2.y = format == null ? 0.5 : format.paginateBounds.y;
                            // Draw border for last paginated row containing nested grid.
                            for (var c = 0; c < row.cells.count; c++) {
                                var cell = row.cells.getCell(c);
                                var cellWidth = 0;
                                var totalwidth = 0;
                                var childGridCell = void 0;
                                if (cell.value instanceof PdfGrid) {
                                    if (!childGridCell) {
                                        childGridCell = cell;
                                    }
                                    for (var i_6 = 0; i_6 < cell.value.columns.count; i_6++) {
                                        totalwidth += cell.value.columns.getColumn(i_6).columnWidth;
                                    }
                                }
                                else {
                                    totalwidth = cell.width;
                                }
                                if (cell.columnSpan > 1) {
                                    for (; c < cell.columnSpan; c++)
                                        cellWidth += row.grid.columns.getColumn(c).width;
                                }
                                else
                                    cellWidth = Math.max(totalwidth, row.grid.columns.getColumn(c).width);
                                var bottomPadding = void 0;
                                if (childGridCell && childGridCell.style && childGridCell.style.cellPadding) {
                                    bottomPadding = childGridCell.style.cellPadding.bottom;
                                }
                                else {
                                    bottomPadding = this.Grid.style.cellPadding.bottom;
                                }
                                if (typeof bottomPadding === 'number' && (height + bottomPadding) < pageGraphics.clientSize.height) {
                                    height += bottomPadding;
                                    this.currentBounds.y += bottomPadding;
                                }
                                cell.drawCellBorders(pageGraphics, new RectangleF(location_2, new SizeF(cellWidth, height)));
                                var rowWidth = this.Grid.rows.getRow(this.Grid.rows.count - 1).width;
                                if (cellWidth !== rowWidth) {
                                    cell.drawCellBorders(pageGraphics, new RectangleF(location_2, new SizeF(rowWidth, height)));
                                }
                                location_2.x += cellWidth;
                                c += (cell.columnSpan - 1);
                            }
                        }
                        // So, nested grid drawing is completed for the current row. Update page.
                        // Otherwise, the next nested grid of the parent will draw borders from start.
                        startPage = this.currentPage;
                    }
                }
            }
            var isPdfGrid = false;
            var maximumCellBoundsWidth = 0;
            if (cellBounds.length > 0) {
                maximumCellBoundsWidth = cellBounds[0];
            }
            var largeNavigatePage = [[1, 2]];
            for (var c = 0; c < this.Grid.rows.count; c++) {
                if (this.cellEndIndex != -1 && this.Grid.rows.getRow(c).cells.getCell(this.cellEndIndex).value instanceof PdfGrid) {
                    var grid = this.Grid.rows.getRow(c).cells.getCell(this.cellEndIndex).value;
                    this.rowLayoutBoundsWidth = grid.rowLayoutBoundsWidth;
                    isPdfGrid = true;
                    // if (largeNavigatePage[0][0] < grid.listOfNavigatePages.length)
                    // {
                    //     largeNavigatePage[0][0] = grid.listOfNavigatePages.length;
                    //     largeNavigatePage[0][1] = cellBounds[c];
                    // }
                    // else if ((largeNavigatePage[0][0] == grid.listOfNavigatePages.length) && (largeNavigatePage[0][1] < cellBounds[c]))
                    // {
                    //     largeNavigatePage[0][1] = cellBounds[c];
                    // }
                }
            }
            if (!isPdfGrid && cellBounds.length > 0) {
                for (var c = 0; c < i - 1; c++) {
                    if (maximumCellBoundsWidth < cellBounds[c]) {
                        maximumCellBoundsWidth = cellBounds[c];
                    }
                }
                this.rowLayoutBoundsWidth = maximumCellBoundsWidth;
            }
            else {
                this.rowLayoutBoundsWidth = largeNavigatePage[0][1];
            }
            if (this.columnRanges.indexOf(range) < this.columnRanges.length - 1
                && startPage != null && format.layout != PdfLayoutType.OnePage) {
                isParentCell = this.Grid.isChildGrid;
                if (largeNavigatePage[0][0] != 0) {
                    var section = this.currentPage.section;
                    var pageIndex = section.indexOf(this.currentPage);
                    this.currentGraphics = this.currentPage.graphics;
                    this.currentBounds = new RectangleF(new PointF(0, 0), this.currentPage.getClientSize());
                    var pageindex = this.currentGraphics.page.section.indexOf(this.currentGraphics.page);
                }
                else {
                    this.currentPage = this.getNextPageformat(format);
                }
                // let locationGrid : PointF= new PointF(PdfBorders.default.right.width / 2, PdfBorders.default.top.width / 2);
                // if (format.paginateBounds == new RectangleF(0,0,0,0) && this.startLocation == locationGrid)
                // {
                //     this.currentBounds.x += this.startLocation.x;
                //     this.currentBounds.y += this.startLocation.y;
                // }
            }
            if (this.columnRanges.length - 1 !== index && this.columnRanges.length > 1 && format.layout !== PdfLayoutType.OnePage) {
                this.currentPage = this.getNextPageformat(format);
                if ((format.paginateBounds.x === format.paginateBounds.y) && (format.paginateBounds.y === format.paginateBounds.height)
                    && (format.paginateBounds.height === format.paginateBounds.width) && (format.paginateBounds.width === 0)) {
                    this.currentBounds.x += this.startLocation.x;
                    this.currentBounds.y += this.startLocation.y;
                    //this.currentBounds.height = this.pageBounds.height;
                }
            }
        }
        result = this.getLayoutResult();
        if (this.Grid.style.allowHorizontalOverflow && this.Grid.style.horizontalOverflowType == PdfHorizontalOverflowType.NextPage) {
            this.reArrangePages(layoutedPages);
        }
        this.raisePageLayouted(result);
        return result;
    };
    PdfGridLayouter.prototype.checkIsFisished = function (row) {
        var result = true;
        for (var i = 0; i < row.cells.count; i++) {
            if (!row.cells.getCell(i).FinishedDrawingCell) {
                result = false;
            }
        }
        return result;
    };
    /* tslint:enable */
    /**
     * Gets the `next page`.
     * @private
     */
    PdfGridLayouter.prototype.getNextPageformat = function (format) {
        var section = this.currentPage.section;
        var nextPage = null;
        var index = section.indexOf(this.currentPage);
        this.flag = false;
        if (index === section.count - 1) {
            nextPage = section.add();
        }
        else {
            nextPage = section.getPages()[index + 1];
        }
        this.currentGraphics = nextPage.graphics;
        var pageindex = this.currentGraphics.page.section.indexOf(this.currentGraphics.page);
        if (!(this.listOfNavigatePages.indexOf(pageindex) !== -1)) {
            this.listOfNavigatePages.push(pageindex);
        }
        this.currentBounds = new RectangleF(new PointF(0, 0), nextPage.getClientSize());
        if ((typeof format !== 'undefined') && format != null && format.usePaginateBounds && (typeof format.paginateBounds !== 'undefined') && format.paginateBounds != null && (format.paginateBounds.x !== format.paginateBounds.y) && (format.paginateBounds.y !== format.paginateBounds.height)
            && (format.paginateBounds.height !== format.paginateBounds.width) && (format.paginateBounds.width !== 0)) {
            this.currentBounds.x = format.paginateBounds.x;
            this.currentBounds.y = format.paginateBounds.y;
            this.currentBounds.height = format.paginateBounds.height;
        }
        return nextPage;
    };
    PdfGridLayouter.prototype.CheckIfDefaultFormat = function (format) {
        var defaultFormat = new PdfStringFormat();
        return (format.alignment === defaultFormat.alignment && format.characterSpacing === defaultFormat.characterSpacing &&
            format.clipPath === defaultFormat.clipPath && format.firstLineIndent === defaultFormat.firstLineIndent &&
            format.horizontalScalingFactor === defaultFormat.horizontalScalingFactor &&
            format.lineAlignment === defaultFormat.lineAlignment
            && format.lineLimit === defaultFormat.lineLimit && format.lineSpacing === defaultFormat.lineSpacing &&
            format.measureTrailingSpaces === defaultFormat.measureTrailingSpaces && format.noClip === defaultFormat.noClip &&
            format.paragraphIndent === defaultFormat.paragraphIndent && format.rightToLeft === defaultFormat.rightToLeft &&
            format.subSuperScript === defaultFormat.subSuperScript && format.wordSpacing === defaultFormat.wordSpacing &&
            format.wordWrap === defaultFormat.wordWrap);
    };
    /**
     * `Raises BeforeCellDraw event`.
     * @private
     */
    PdfGridLayouter.prototype.RaiseBeforeCellDraw = function (graphics, rowIndex, cellIndex, bounds, value, style) {
        var args = null;
        if (this.Grid.raiseBeginCellDraw) {
            args = new PdfGridBeginCellDrawEventArgs(graphics, rowIndex, cellIndex, bounds, value, style);
            this.Grid.onBeginCellDraw(args);
            style = args.style;
        }
        return style;
    };
    /**
     * `Raises AfterCellDraw event`.
     * @private
     */
    PdfGridLayouter.prototype.raiseAfterCellDraw = function (graphics, rowIndex, cellIndex, bounds, value, cellstyle) {
        var args = null;
        if (this.Grid.raiseEndCellDraw) {
            args = new PdfGridEndCellDrawEventArgs(graphics, rowIndex, cellIndex, bounds, value, cellstyle);
            this.Grid.onEndCellDraw(args);
        }
    };
    PdfGridLayouter.prototype.reArrangePages = function (layoutedPages) {
        var document = this.currentPage.document;
        var pages = [];
        var keys = layoutedPages.keys();
        var values = layoutedPages.values();
        for (var i = 0; i < keys.length; i++) {
            var page = keys[i];
            page.section = null;
            pages.push(page);
            document.pages.remove(page);
        }
        /* tslint:disable */
        for (var i = 0; i < layoutedPages.size(); i++) {
            var count = 0;
            for (var j = i, count_1 = (layoutedPages.size() / this.columnRanges.length); j < layoutedPages.size(); j += count_1) {
                var page = pages[j];
                if (typeof page !== 'undefined' && document.pages.indexOf(page) === -1) {
                    document.pages.add(page);
                }
            }
        }
        /* tslint:enable */
    };
    /**
     * Gets the `layout result`.
     * @private
     */
    PdfGridLayouter.prototype.getLayoutResult = function () {
        if (this.Grid.isChildGrid && this.Grid.allowRowBreakAcrossPages) {
            for (var i = 0; i < this.Grid.rows.count; i++) {
                var row = this.Grid.rows.getRow(i);
                if (row.rowBreakHeight > 0 && row.repeatFlag) {
                    this.startLocation.y = this.currentPage.origin.y;
                }
            }
        }
        var bounds;
        if (!this.isChanged) {
            bounds = new RectangleF(this.startLocation, new SizeF(this.currentBounds.width, this.currentBounds.y -
                this.startLocation.y));
        }
        // else {
        //     bounds = new RectangleF(this.currentLocation, new SizeF(this.currentBounds.width, this.currentBounds.y -
        //                              this.currentLocation.y));
        // }
        /* tslint:enable */
        return new PdfGridLayoutResult(this.currentPage, bounds);
    };
    /**
     * `Recalculate row height` for the split cell to be drawn.
     * @private
     */
    PdfGridLayouter.prototype.ReCalculateHeight = function (row, height) {
        var newHeight = 0.0;
        for (var i = this.cellStartIndex; i <= this.cellEndIndex; i++) {
            if (!(row.cells.getCell(i).remainingString === null || row.cells.getCell(i).remainingString === '' ||
                typeof row.cells.getCell(i).remainingString === 'undefined')) {
                newHeight = Math.max(newHeight, row.cells.getCell(i).measureHeight());
            }
        }
        return Math.max(height, newHeight);
    };
    /**
     * `Raises BeforePageLayout event`.
     * @private
     */
    PdfGridLayouter.prototype.raiseBeforePageLayout = function (currentPage, currentBounds, currentRow) {
        var cancel = false;
        if (this.Grid.raiseBeginPageLayout) {
            var args = new PdfGridBeginPageLayoutEventArgs(currentBounds, currentPage, currentRow);
            this.Grid.onBeginPageLayout(args);
            // if (currentBounds !== args.Bounds) {
            //     this.isChanged = true;
            //     this.currentLocation = new PointF(args.Bounds.x, args.Bounds.y);
            //     this.measureColumnsWidth(new RectangleF(new PointF(args.Bounds.x, args.Bounds.y) ,
            //                                                  new SizeF(args.Bounds.width + args.Bounds.x ,
            //                                                                 args.Bounds.height)));
            // }
            cancel = (typeof args.cancel === 'undefined' ? false : args.cancel);
            currentBounds = args.bounds;
            currentRow = args.startRowIndex;
        }
        return { returnValue: cancel, currentBounds: currentBounds, currentRowIndex: currentRow };
    };
    /**
     * `Raises PageLayout event` if needed.
     * @private
     */
    PdfGridLayouter.prototype.raisePageLayouted = function (result) {
        var args = new PdfGridEndPageLayoutEventArgs(result);
        if (this.Grid.raiseEndPageLayout) {
            this.Grid.onEndPageLayout(args);
        }
        return args;
    };
    PdfGridLayouter.prototype.drawRow = function (row, result, height) {
        if (typeof result === 'undefined') {
            //.. Check if required space available.
            //.....If the row conains spans which  falls through more than one page, then draw the row to next page.                        
            var result_1 = new RowLayoutResult();
            var rowHeightWithSpan = 0;
            var location_3 = new PointF(0, 0);
            var size = new SizeF(0, 0);
            var isHeader = false;
            if (row.rowSpanExists) {
                var maxSpan = 0;
                var currRowIndex = this.Grid.rows.rowCollection.indexOf(row);
                if (currRowIndex === -1) {
                    currRowIndex = this.Grid.headers.indexOf(row);
                    if (currRowIndex !== -1) {
                        isHeader = true;
                    }
                }
                for (var i = 0; i < row.cells.count; i++) {
                    var cell = row.cells.getCell(i);
                    maxSpan = Math.max(maxSpan, cell.rowSpan);
                }
                for (var i = currRowIndex; i < currRowIndex + maxSpan; i++) {
                    rowHeightWithSpan += (isHeader ? this.Grid.headers.getHeader(i).height : this.Grid.rows.getRow(i).height);
                }
                // let rowMaxHeight : number = rowHeightWithSpan;
                // for (let i : number = 0; i < row.cells.count; i++ ) {
                //     rowMaxHeight = rowMaxHeight > row.cells.getCell(i).height ? rowMaxHeight : row.cells.getCell(i).height;
                // }
                // let flag : boolean = true;
                // let nextRow : PdfGridRow = this.Grid.headers.getHeader(this.Grid.headers.indexOf(row) + 1);
                // for (let i : number = 0; i < nextRow.cells.count; i++ ) {
                //     if (nextRow.cells.getCell(i).value !== '' && nextRow.cells.getCell(i).value !== undefined) {
                //         flag = false;
                //         break;
                //     }
                // }
                // if ((rowMaxHeight > rowHeightWithSpan) && flag) {
                //     row.height += (rowMaxHeight - rowHeightWithSpan);
                // }                
            }
            var calculatedHeight = row.rowBreakHeight > 0.0 ? row.rowBreakHeight : row.height;
            if (typeof this.Grid.isChildGrid !== 'undefined' && this.Grid.isChildGrid && typeof this.Grid.ParentCell !== 'undefined' && this.Grid.ParentCell != null) {
                //Split row only if row height exceeds page height and AllowRowBreakAcrossPages is true.
                // if (calculatedHeight + this.Grid.ParentCell.row.grid.style.cellPadding.bottom +
                //             this.Grid.ParentCell.row.grid.style.cellPadding.top > this.currentPageBounds.height) {
                //     if (this.Grid.allowRowBreakAcrossPages) {
                //         result.isFinish = true;
                //         if ( this.Grid.isChildGrid && row.rowBreakHeight > 0 ) {
                //             if (this.Grid.ParentCell.row.grid.style.cellPadding !== null) {
                //                 this.currentBounds.y += this.Grid.ParentCell.row.grid.style.cellPadding.top;
                //             }
                //             this.currentBounds.x = this.startLocation.x;
                //         }
                //         result.bounds = this.currentBounds ;
                //         this.drawRowWithBreak(result, row, calculatedHeight);
                //     } else {
                //         //If AllowRowBreakAcrossPages is not true, draw the row till it fits the page.                       
                //         if (this.Grid.ParentCell.row.grid.style.cellPadding != null) {
                //             this.currentBounds.y += this.Grid.ParentCell.row.grid.style.cellPadding.top;
                //             calculatedHeight = this.currentBounds.height - this.currentBounds.y -
                //                     this.Grid.ParentCell.row.grid.style.cellPadding.bottom;
                //         }
                //         result.isFinish = false;
                //         this.drawRow( row, result, calculatedHeight);
                //     }
                // } else
                if (this.currentBounds.y + this.Grid.ParentCell.row.grid.style.cellPadding.bottom + calculatedHeight >
                    this.currentPageBounds.height || this.currentBounds.y + this.Grid.ParentCell.row.grid.style.cellPadding.bottom
                    + calculatedHeight > this.currentBounds.height || this.currentBounds.y +
                    this.Grid.ParentCell.row.grid.style.cellPadding.bottom + rowHeightWithSpan > this.currentPageBounds.height) {
                    //If a row is repeated and still cannot fit in page, proceed draw.
                    if (typeof this.Grid.ParentCell.row.grid.LayoutFormat !== 'undefined' && this.Grid.ParentCell.row.grid.LayoutFormat.break === PdfLayoutBreakType.FitPage) {
                        PdfGridLayouter.repeatRowIndex = this.Grid.rows.rowCollection.indexOf(row);
                        this.Grid.splitChildRowIndex = this.Grid.rows.rowCollection.indexOf(row);
                    }
                    if (PdfGridLayouter.repeatRowIndex > -1 && PdfGridLayouter.repeatRowIndex === row.rowIndex) {
                        if (this.Grid.allowRowBreakAcrossPages) {
                            result_1.isFinish = true;
                            // if (this.Grid.isChildGrid && row.rowBreakHeightValue > 0) {
                            //     // if (this.Grid.ParentCell.row.grid.style.cellPadding != null) {
                            //     //     this.currentBounds.y += this.Grid.ParentCell.row.grid.style.cellPadding.top;
                            //     // }
                            //     this.currentBounds.x = this.startLocation.x;
                            // }
                            result_1.bounds = this.currentBounds;
                            this.drawRowWithBreak(result_1, row, calculatedHeight);
                            row.repeatFlag = true;
                            row.repeatRowNumber = PdfGridLayouter.repeatRowIndex;
                        }
                        // else {
                        //     result.isFinish = false;
                        //     row.repeatFlag = false;
                        //     this.drawRow( row, result, calculatedHeight);
                        // }
                    }
                    // else {
                    //     result.isFinish = false;
                    // }
                }
                else {
                    result_1.isFinish = true;
                    if (row.grid.ParentCell.row.rowBreakHeightValue > 0) {
                        row.repeatFlag = true;
                    }
                    else {
                        row.repeatFlag = false;
                        calculatedHeight = row.height;
                    }
                    if (this.Grid.isChildGrid && row.rowBreakHeight > 0) {
                        if (this.Grid.ParentCell.row.grid.style.cellPadding != null) {
                            calculatedHeight += this.Grid.ParentCell.row.grid.style.cellPadding.bottom;
                        }
                    }
                    this.drawRow(row, result_1, calculatedHeight);
                }
            }
            else {
                //Split row only if row height exceeds page height and AllowRowBreakAcrossPages is true.
                if (calculatedHeight > this.currentPageBounds.height) {
                    if (this.Grid.allowRowBreakAcrossPages) {
                        result_1.isFinish = true;
                        //result.bounds = this.currentBounds;
                        this.drawRowWithBreak(result_1, row, calculatedHeight);
                        row.isrowFinish = true;
                        row.repeatFlag = true;
                        if (row.grid.splitChildRowIndex !== -1) {
                            result_1.isFinish = false;
                        }
                    }
                    // else {
                    //     //If AllowRowBreakAcrossPages is not true, draw the row till it fits the page.
                    //     result.isFinish = false;
                    //     this.drawRow( row, result, calculatedHeight);
                    // }
                }
                else if (this.currentBounds.y + calculatedHeight > this.currentPageBounds.height ||
                    this.currentBounds.y + calculatedHeight > (this.currentBounds.height + this.startLocation.y) ||
                    this.currentBounds.y + rowHeightWithSpan > this.currentPageBounds.height) {
                    // If a row is repeated and still cannot fit in page, proceed draw.
                    var isFit = false;
                    if ((this.Grid.allowRowBreakAcrossPages && !this.Grid.repeatHeader && !row.isRowHeightSet && !row.rowMergeComplete)) {
                        if (this.Grid.LayoutFormat !== null && this.Grid.LayoutFormat.paginateBounds.height > 0) {
                            isFit = this.isFitToCell((this.currentBounds.height + this.startLocation.y) - this.currentBounds.y, this.Grid, row);
                        }
                        else
                            isFit = this.isFitToCell(this.currentPageBounds.height - this.currentBounds.y, this.Grid, row);
                        if (isFit) {
                            this.isPaginate = true;
                        }
                    }
                    else if (this.Grid.allowRowBreakAcrossPages && this.Grid.LayoutFormat != null && this.Grid.LayoutFormat.layout == PdfLayoutType.Paginate && this.Grid.LayoutFormat.break != PdfLayoutBreakType.FitElement && row.isRowHeightSet && this.currentBounds.y + height > this.currentPageBounds.height) {
                        isFit = this.isFitToCell(this.currentPageBounds.height - this.currentBounds.y, this.Grid, row);
                        if (!isFit)
                            isFit = !(this.slr !== null && this.slr.actualSize.height == 0 && this.slr.remainder != null && this.slr.remainder.length > 0 && this.remainderText == this.slr.remainder);
                        if (isFit && this.slr != null && this.slr.lineCount > 1) {
                            //It may text cutoff issue
                            isFit = false;
                        }
                        this.remainderText = null;
                    }
                    if (PdfGridLayouter.repeatRowIndex > -1 && PdfGridLayouter.repeatRowIndex === row.rowIndex || isFit) {
                        if (this.Grid.allowRowBreakAcrossPages) {
                            result_1.isFinish = true;
                            this.drawRowWithBreak(result_1, row, calculatedHeight);
                            row.repeatFlag = true;
                            row.repeatRowNumber = PdfGridLayouter.repeatRowIndex;
                            if (row.grid.splitChildRowIndex !== -1) {
                                result_1.isFinish = false;
                            }
                        }
                        else {
                            result_1.isFinish = false;
                            this.drawRow(row, result_1, calculatedHeight);
                        }
                    }
                    else {
                        result_1.isFinish = false;
                    }
                }
                else {
                    result_1.isFinish = true;
                    this.drawRow(row, result_1, calculatedHeight);
                    row.repeatFlag = false;
                }
            }
            return result_1;
        }
        else {
            var skipcell = false;
            var location_4 = new PointF(this.currentBounds.x, this.currentBounds.y);
            // if (row.grid.isChildGrid && row.grid.allowRowBreakAcrossPages && this.startLocation.x !== this.currentBounds.x && row.width <
            //                 this.currentPage.getClientSize().width) {
            //     location.x = this.startLocation.x;
            // }
            result.bounds = new RectangleF(location_4, new SizeF(0, 0));
            height = this.ReCalculateHeight(row, height);
            for (var i = this.cellStartIndex; i <= this.cellEndIndex; i++) {
                var cancelSpans = ((i > this.cellEndIndex + 1) && (row.cells.getCell(i).columnSpan > 1));
                // let cancelSpans : boolean = false;
                if (!cancelSpans) {
                    for (var j = 1; j < row.cells.getCell(i).columnSpan; j++) {
                        row.cells.getCell(i + j).isCellMergeContinue = true;
                    }
                }
                var size = new SizeF(this.Grid.columns.getColumn(i).width, height);
                // if (size.width > this.currentGraphics.clientSize.width) {
                //     size.width = this.currentGraphics.clientSize.width;
                // }
                // if (this.Grid.isChildGrid && this.Grid.style.allowHorizontalOverflow) {
                //     if (size.width >= this.currentGraphics.clientSize.width) {
                //         size.width -= 2 * this.currentBounds.x;
                //     }
                // }
                /* tslint:disable */
                if (!this.CheckIfDefaultFormat(this.Grid.columns.getColumn(i).format) &&
                    this.CheckIfDefaultFormat(row.cells.getCell(i).stringFormat)) {
                    row.cells.getCell(i).stringFormat = this.Grid.columns.getColumn(i).format;
                }
                var cellstyle = row.cells.getCell(i).style;
                var tempValue = ((typeof row.cells.getCell(i).value === 'string' &&
                    row.cells.getCell(i).value !== null) ? row.cells.getCell(i).value : '');
                row.cells.getCell(i).style = this.RaiseBeforeCellDraw(this.currentGraphics, this.currentRowIndex, i, new RectangleF(location_4, size), tempValue, cellstyle);
                //row.cells.getCell(i).style = cellstyle;
                if (!skipcell) {
                    if (row.cells.getCell(i).value instanceof PdfGrid) {
                        var grid = row.cells.getCell(i).value;
                        grid.parentCellIndex = i;
                    }
                    var stringResult = row.cells.getCell(i).draw(this.currentGraphics, new RectangleF(location_4, size), cancelSpans);
                    if (row.grid.style.allowHorizontalOverflow && (row.cells.getCell(i).columnSpan > this.cellEndIndex ||
                        i + row.cells.getCell(i).columnSpan > this.cellEndIndex + 1) && this.cellEndIndex < row.cells.count - 1) {
                        row.rowOverflowIndex = this.cellEndIndex;
                    }
                    if (row.grid.style.allowHorizontalOverflow && (row.rowOverflowIndex > 0 && (row.cells.getCell(i).columnSpan >
                        this.cellEndIndex || i + row.cells.getCell(i).columnSpan > this.cellEndIndex + 1)) &&
                        row.cells.getCell(i).columnSpan - this.cellEndIndex + i - 1 > 0) {
                        row.cells.getCell(row.rowOverflowIndex + 1).value = stringResult !== null ? (stringResult.remainder !== undefined) ?
                            stringResult.remainder : '' : '';
                        row.cells.getCell(row.rowOverflowIndex + 1).stringFormat = row.cells.getCell(i).stringFormat;
                        row.cells.getCell(row.rowOverflowIndex + 1).style = row.cells.getCell(i).style;
                        row.cells.getCell(row.rowOverflowIndex + 1).columnSpan = row.cells.getCell(i).columnSpan - this.cellEndIndex + i - 1;
                    }
                }
                /* tslint:enable */
                tempValue = ((typeof row.cells.getCell(i).value === 'string' &&
                    row.cells.getCell(i).value !== null) ? row.cells.getCell(i).value : '');
                if (!cancelSpans) {
                    this.raiseAfterCellDraw(this.currentGraphics, this.currentRowIndex, i, new RectangleF(location_4, size), tempValue, row.cells.getCell(i).style);
                }
                if (row.cells.getCell(i).value instanceof PdfGrid) {
                    var grid = row.cells.getCell(i).value;
                    if (this.Grid.columns.getColumn(i).width >= this.currentGraphics.clientSize.width) {
                        location_4.x = grid.rowLayoutBoundsWidth;
                        location_4.x += grid.style.cellSpacing;
                    }
                    else {
                        location_4.x += this.Grid.columns.getColumn(i).width;
                    }
                }
                else {
                    location_4.x += this.Grid.columns.getColumn(i).width;
                }
            }
            if (!row.rowMergeComplete || row.isRowHeightSet) {
                this.currentBounds.y += height;
            }
            result.bounds = new RectangleF(new PointF(result.bounds.x, result.bounds.y), new SizeF(location_4.x, location_4.y));
        }
    };
    PdfGridLayouter.prototype.isFitToCell = function (currentHeight, grid, gridRow) {
        var isFit = false;
        var layouter = new PdfStringLayouter();
        for (var i = 0; i < gridRow.cells.count; i++) {
            var cell = gridRow.cells.getCell(i);
            if (typeof cell.value !== 'undefined' && cell.value !== null && typeof cell.value === 'string') {
                var font = null;
                if (typeof cell.style.font !== 'undefined' && cell.style.font != null) {
                    font = cell.style.font;
                }
                else if (typeof cell.row.style.font !== 'undefined' && cell.row.style.font != null) {
                    font = cell.row.style.font;
                }
                else if (typeof cell.row.grid.style.font !== 'undefined' && cell.row.grid.style.font != null) {
                    font = cell.row.grid.style.font;
                }
                else {
                    font = PdfDocument.defaultFont;
                }
                this.remainderText = cell.value;
                var width = cell.width;
                var column = grid.columns.getColumn(i);
                if (column.isCustomWidth && cell.width > column.width) {
                    width = column.width;
                }
                this.slr = layouter.layout(cell.value, font, cell.stringFormat, new SizeF(width, currentHeight), false, this.currentPageBounds);
                var height = this.slr.actualSize.height;
                if (cell.value !== '' && height === 0) {
                    isFit = false;
                    break;
                }
                if (cell.style !== null && cell.style.borders !== null && cell.style.borders.top !== null && cell.style.borders.bottom !== null) {
                    height += (cell.style.borders.top.width + cell.style.borders.bottom.width) * 2;
                }
                if (this.slr.lineCount > 1 && cell.stringFormat != null && cell.stringFormat.lineSpacing != 0) {
                    height += (this.slr.lineCount - 1) * (cell.style.stringFormat.lineSpacing);
                }
                if (cell.style.cellPadding === null) {
                    height += (grid.style.cellPadding.top + grid.style.cellPadding.bottom);
                }
                else {
                    height += (grid.style.cellPadding.top + grid.style.cellPadding.bottom);
                }
                height += grid.style.cellSpacing;
                if (currentHeight > height || (typeof this.slr.remainder !== 'undefined' && this.slr.remainder !== null)) {
                    isFit = true;
                    break;
                }
            }
        }
        return isFit;
    };
    PdfGridLayouter.prototype.drawRowWithBreak = function (result, row, calculateHeight) {
        var location = new PointF(this.currentBounds.x, this.currentBounds.y);
        if (row.grid.isChildGrid && row.grid.allowRowBreakAcrossPages && this.startLocation.x !== this.currentBounds.x) {
            location.x = this.startLocation.x;
        }
        result.bounds = new RectangleF(location, new SizeF(0, 0));
        this.gridHeight = row.rowBreakHeight > 0 ? this.currentPageBounds.height : 0;
        // Calculate the remaining height.
        if (row.grid.style.cellPadding.top + this.currentBounds.y + row.grid.style.cellPadding.bottom < this.currentPageBounds.height) {
            row.rowBreakHeight = this.currentBounds.y + calculateHeight - this.currentPageBounds.height;
        }
        // else {
        //     row.rowBreakHeight = calculateHeight;
        //     result.isFinish = false;
        //     return;
        // }
        // No need to explicit break if the row height is equal to grid height.
        for (var i = 0; i < row.cells.count; i++) {
            var cell = row.cells.getCell(i);
            var cellHeight = cell.measureHeight();
            if (cellHeight === calculateHeight && cell.value instanceof PdfGrid) {
                row.rowBreakHeight = 0;
            }
            // else if (cellHeight === calculateHeight && (cell.value as PdfGrid) === null) {
            //     row.rowBreakHeight = this.currentBounds.y + calculateHeight - this.currentPageBounds.height;
            // }
        }
        for (var i = this.cellStartIndex; i <= this.cellEndIndex; i++) {
            var gridColumnWidth = this.Grid.columns.getColumn(i).width;
            var cancelSpans = ((row.cells.getCell(i).columnSpan + i > this.cellEndIndex + 1) &&
                (row.cells.getCell(i).columnSpan > 1));
            if (!cancelSpans) {
                for (var k = 1; k < row.cells.getCell(i).columnSpan; k++) {
                    row.cells.getCell(i + k).isCellMergeContinue = true;
                    gridColumnWidth += this.Grid.columns.getColumn(i + k).width;
                }
            }
            var size = new SizeF(gridColumnWidth, this.gridHeight > 0.0 ? this.gridHeight :
                this.currentPageBounds.height);
            // if (size.width === 0) {
            //     size = new SizeF(row.cells.getCell(i).width, size.height);
            // }
            // if (!this.CheckIfDefaultFormat(this.Grid.columns.getColumn(i).format) &&
            //         this.CheckIfDefaultFormat((row.cells.getCell(i).stringFormat))) {
            //     row.cells.getCell(i).stringFormat = this.Grid.columns.getColumn(i).format;
            // }
            var cellstyle1 = row.cells.getCell(i).style;
            row.cells.getCell(i).style = cellstyle1;
            var skipcell = false;
            var stringResult = null;
            if (!skipcell) {
                row.cells.getCell(i)._rowHeight = row.height;
                stringResult = row.cells.getCell(i).draw(this.currentGraphics, new RectangleF(location, size), cancelSpans);
            }
            //If still row is to be drawn, set cell finished drawing cell as false and update the text to be drawn.
            if (row.rowBreakHeight > 0.0) {
                if (stringResult != null && typeof stringResult.remainder !== 'undefined') {
                    row.cells.getCell(i).FinishedDrawingCell = false;
                    row.cells.getCell(i).remainingString = stringResult.remainder == null ? ' ' : stringResult.remainder;
                    row.rowBreakHeight = calculateHeight - stringResult.actualSize.height;
                }
            }
            result.isFinish = (!result.isFinish) ? result.isFinish : row.cells.getCell(i).FinishedDrawingCell;
            // let tempValue : string = ((typeof row.cells.getCell(i).value === 'string' &&
            //row.cells.getCell(i).value !== null) ? row.cells.getCell(i).value : '') as string;
            // if (!cancelSpans) {
            //     // this.raiseAfterCellDraw(this.currentGraphics, this.currentRowIndex, i,
            //     //           new RectangleF(location, size), tempValue, row.cells.getCell(i).style);            
            //     this.raiseAfterCellDraw(this.currentGraphics, this.currentRowIndex, i, new RectangleF(location, size),
            //                             (row.cells.getCell(i).value as string) ? row.cells.getCell(i).value.toString() : ' ',
            //                             row.cells.getCell(i).style);
            //     }                
            if (row.cells.getCell(i).value instanceof PdfGrid) {
                var grid = row.cells.getCell(i).value;
                this.rowBreakPageHeightCellIndex = i;
                // row.cells.getCell(i).pageCount = grid.listOfNavigatePages.length;
                // for (let j : number = 0;j<grid.listOfNavigatePages.length;j++){
                //     let pageIndex : number =grid.listOfNavigatePages.indexOf(j);
                //             this.Grid.listOfNavigatePages.push(pageIndex);
                //     }
                if (this.Grid.columns.getColumn(i).width >= this.currentGraphics.clientSize.width) {
                    location.x = this.rowLayoutBoundsWidth;
                    location.x += grid.style.cellSpacing;
                }
                else {
                    location.x += this.Grid.columns.getColumn(i).width;
                }
            }
            else {
                location.x += this.Grid.columns.getColumn(i).width;
            }
        }
        this.currentBounds.y += this.gridHeight > 0.0 ? this.gridHeight : calculateHeight;
        result.bounds = new RectangleF(new PointF(result.bounds.x, result.bounds.y), new SizeF(location.x, location.y));
    };
    /**
     * @hidden
     * @private
     */
    PdfGridLayouter.repeatRowIndex = -1;
    return PdfGridLayouter;
}(ElementLayouter));
export { PdfGridLayouter };
// recalculateBounds : boolean, clientSize : SizeF
//Implementation
/**
 * `Initializes` internal data.
 * @private
 */
//Internal declaration
var PdfGridLayoutResult = /** @class */ (function (_super) {
    __extends(PdfGridLayoutResult, _super);
    /**
     * Constructor
     * @private
     */
    function PdfGridLayoutResult(page, bounds) {
        return _super.call(this, page, bounds) || this;
    }
    return PdfGridLayoutResult;
}(PdfLayoutResult));
export { PdfGridLayoutResult };
/**
 * `PdfGridLayoutFormat` class represents a flexible grid that consists of columns and rows.
 */
var PdfGridLayoutFormat = /** @class */ (function (_super) {
    __extends(PdfGridLayoutFormat, _super);
    /**
     * Initializes a new instance of the `PdfGridLayoutFormat` class.
     * @private
     */
    function PdfGridLayoutFormat(baseFormat) {
        return _super.call(this, baseFormat) || this;
    }
    return PdfGridLayoutFormat;
}(PdfLayoutFormat));
export { PdfGridLayoutFormat };
var GridCellEventArgs = /** @class */ (function () {
    // Constructors
    /**
     * Initialize a new instance for `GridCellEventArgs` class.
     * @private
     */
    function GridCellEventArgs(graphics, rowIndex, cellIndex, bounds, value) {
        this.gridRowIndex = rowIndex;
        this.gridCellIndex = cellIndex;
        this.internalValue = value;
        this.gridBounds = bounds;
        this.pdfGraphics = graphics;
    }
    Object.defineProperty(GridCellEventArgs.prototype, "rowIndex", {
        // Properties
        /**
         * Gets the value of current `row index`.
         * @private
         */
        get: function () {
            return this.gridRowIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridCellEventArgs.prototype, "cellIndex", {
        /**
         * Gets the value of current `cell index`.
         * @private
         */
        get: function () {
            return this.gridCellIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridCellEventArgs.prototype, "value", {
        /**
         * Gets the actual `value` of current cell.
         * @private
         */
        get: function () {
            return this.internalValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridCellEventArgs.prototype, "bounds", {
        /**
         * Gets the `bounds` of current cell.
         * @private
         */
        get: function () {
            return this.gridBounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridCellEventArgs.prototype, "graphics", {
        /**
         * Gets the instance of `current graphics`.
         * @private
         */
        get: function () {
            return this.pdfGraphics;
        },
        enumerable: true,
        configurable: true
    });
    return GridCellEventArgs;
}());
export { GridCellEventArgs };
var PdfGridBeginCellDrawEventArgs = /** @class */ (function (_super) {
    __extends(PdfGridBeginCellDrawEventArgs, _super);
    // Constructors
    /**
     * Initializes a new instance of the `StartCellLayoutEventArgs` class.
     * @private
     */
    function PdfGridBeginCellDrawEventArgs(graphics, rowIndex, cellIndex, bounds, value, style) {
        var _this = _super.call(this, graphics, rowIndex, cellIndex, bounds, value) || this;
        _this.style = style;
        return _this;
    }
    Object.defineProperty(PdfGridBeginCellDrawEventArgs.prototype, "skip", {
        // Properties
        /**
         * Gets or sets a value indicating whether the value of this cell should be `skipped`.
         * @private
         */
        get: function () {
            return this.bSkip;
        },
        set: function (value) {
            this.bSkip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfGridBeginCellDrawEventArgs.prototype, "style", {
        /**
         * Gets or sets a `style` value of the cell.
         * @private
         */
        get: function () {
            return this.cellStyle;
        },
        set: function (value) {
            this.cellStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfGridBeginCellDrawEventArgs;
}(GridCellEventArgs));
export { PdfGridBeginCellDrawEventArgs };
var PdfGridEndCellDrawEventArgs = /** @class */ (function (_super) {
    __extends(PdfGridEndCellDrawEventArgs, _super);
    // Constructors
    /**
     * Initializes a new instance of the `PdfGridEndCellLayoutEventArgs` class.
     * @private
     */
    function PdfGridEndCellDrawEventArgs(graphics, rowIndex, cellIndex, bounds, value, style) {
        var _this = _super.call(this, graphics, rowIndex, cellIndex, bounds, value) || this;
        _this.cellStyle = style;
        return _this;
    }
    Object.defineProperty(PdfGridEndCellDrawEventArgs.prototype, "style", {
        // Propertise
        /**
         * Get the `PdfGridCellStyle`.
         * @private
         */
        get: function () {
            return this.cellStyle;
        },
        enumerable: true,
        configurable: true
    });
    return PdfGridEndCellDrawEventArgs;
}(GridCellEventArgs));
export { PdfGridEndCellDrawEventArgs };
var PdfCancelEventArgs = /** @class */ (function () {
    function PdfCancelEventArgs() {
    }
    Object.defineProperty(PdfCancelEventArgs.prototype, "cancel", {
        // Properties
        /**
         * Gets and Sets the value of `cancel`.
         * @private
         */
        get: function () {
            return this.isCancel;
        },
        set: function (value) {
            this.isCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfCancelEventArgs;
}());
export { PdfCancelEventArgs };
var BeginPageLayoutEventArgs = /** @class */ (function (_super) {
    __extends(BeginPageLayoutEventArgs, _super);
    // Constructors
    /**
     * Initializes a new instance of the `BeginPageLayoutEventArgs` class with the specified rectangle and page.
     * @private
     */
    function BeginPageLayoutEventArgs(bounds, page) {
        var _this = _super.call(this) || this;
        _this.bounds = bounds;
        _this.pdfPage = page;
        return _this;
    }
    Object.defineProperty(BeginPageLayoutEventArgs.prototype, "bounds", {
        // Properties
        /**
         * Gets or sets value that indicates the lay outing `bounds` on the page.
         * @private
         */
        get: function () {
            return this.cellBounds;
        },
        set: function (value) {
            this.cellBounds = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeginPageLayoutEventArgs.prototype, "page", {
        /**
         * Gets the `page` where the lay outing should start.
         * @private
         */
        get: function () {
            return this.pdfPage;
        },
        enumerable: true,
        configurable: true
    });
    return BeginPageLayoutEventArgs;
}(PdfCancelEventArgs));
export { BeginPageLayoutEventArgs };
/**
 * `EndPageLayoutEventArgs` class is alternate for end page layout events.
 */
var EndPageLayoutEventArgs = /** @class */ (function (_super) {
    __extends(EndPageLayoutEventArgs, _super);
    // Constructors
    /**
     * Initializes a new instance of the `EndPageLayoutEventArgs` class. with the specified 'PdfLayoutResult'.
     * @private
     */
    function EndPageLayoutEventArgs(result) {
        var _this = _super.call(this) || this;
        _this.layoutResult = result;
        return _this;
    }
    Object.defineProperty(EndPageLayoutEventArgs.prototype, "result", {
        // Properties
        /**
         * Gets the lay outing `result` of the page.
         * @private
         */
        get: function () {
            return this.layoutResult;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndPageLayoutEventArgs.prototype, "nextPage", {
        /**
         * Gets or sets a value indicating the `next page` where the element should be layout.
         * @private
         */
        get: function () {
            return this.nextPdfPage;
        },
        set: function (value) {
            this.nextPdfPage = value;
        },
        enumerable: true,
        configurable: true
    });
    return EndPageLayoutEventArgs;
}(PdfCancelEventArgs));
export { EndPageLayoutEventArgs };
/**
 * `PdfGridBeginPageLayoutEventArgs` class is alternate for begin page layout events.
 */
var PdfGridBeginPageLayoutEventArgs = /** @class */ (function (_super) {
    __extends(PdfGridBeginPageLayoutEventArgs, _super);
    // Constructors
    /**
     * Initialize a new instance of `PdfGridBeginPageLayoutEventArgs` class.
     * @private
     */
    function PdfGridBeginPageLayoutEventArgs(bounds, page, startRow) {
        var _this = _super.call(this, bounds, page) || this;
        _this.startRow = startRow;
        return _this;
    }
    Object.defineProperty(PdfGridBeginPageLayoutEventArgs.prototype, "startRowIndex", {
        // Properties
        /**
         * Gets the `start row index`.
         * @private
         */
        get: function () {
            return this.startRow;
        },
        enumerable: true,
        configurable: true
    });
    return PdfGridBeginPageLayoutEventArgs;
}(BeginPageLayoutEventArgs));
export { PdfGridBeginPageLayoutEventArgs };
/**
 * `PdfGridEndPageLayoutEventArgs` class is alternate for begin page layout events.
 */
var PdfGridEndPageLayoutEventArgs = /** @class */ (function (_super) {
    __extends(PdfGridEndPageLayoutEventArgs, _super);
    // Constructors
    /**
     * Initialize a new instance of `PdfGridEndPageLayoutEventArgs` class.
     * @private
     */
    function PdfGridEndPageLayoutEventArgs(result) {
        return _super.call(this, result) || this;
    }
    return PdfGridEndPageLayoutEventArgs;
}(EndPageLayoutEventArgs));
export { PdfGridEndPageLayoutEventArgs };
var RowLayoutResult = /** @class */ (function () {
    //Constructors
    /**
     * Initializes a new instance of the `RowLayoutResult` class.
     * @private
     */
    function RowLayoutResult() {
        this.layoutedBounds = new RectangleF(0, 0, 0, 0);
    }
    Object.defineProperty(RowLayoutResult.prototype, "isFinish", {
        /**
         * Gets or sets a value indicating whether this instance `is finish`.
         * @private
         */
        get: function () {
            return this.bIsFinished;
        },
        set: function (value) {
            this.bIsFinished = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowLayoutResult.prototype, "bounds", {
        /**
         * Gets or sets the `bounds`.
         * @private
         */
        get: function () {
            return this.layoutedBounds;
        },
        set: function (value) {
            this.layoutedBounds = value;
        },
        enumerable: true,
        configurable: true
    });
    return RowLayoutResult;
}());
export { RowLayoutResult };
