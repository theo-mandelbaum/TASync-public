/**
 * Horizontal alignment type
 */
export declare type TextAlign = 'left' | 'center' | 'right';
/**
 * Vertical alignment type
 */
export declare type VerticalAlign = 'bottom' | 'middle' | 'top';
/**
 * Font weight type
 */
export declare type FontWeight = 'bold' | 'normal';
/**
 * Font style type
 */
export declare type FontStyle = 'italic' | 'normal';
/**
 * Text decoration type
 *
 * @hidden
 */
export declare type TextDecoration = 'underline' | 'line-through' | 'underline line-through' | 'none';
/**
 * Font family type
 */
export declare type FontFamily = 'Arial' | 'Arial Black' | 'Axettac Demo' | 'Batang' | 'Book Antiqua' | 'Calibri' | 'Comic Sans MS' | 'Courier' | 'Courier New' | 'Din Condensed' | 'Georgia' | 'Helvetica' | 'Helvetica New' | 'Roboto' | 'Tahoma' | 'Times New Roman' | 'Verdana';
/**
 * Specifies the number format types in Spreadsheet.
 */
export declare type NumberFormatType = 'General' | 'Number' | 'Currency' | 'Accounting' | 'ShortDate' | 'LongDate' | 'Time' | 'Percentage' | 'Fraction' | 'Scientific' | 'Text';
/**
 * Specifies the option for save file type from Spreadsheet. By default, Excel save will be occur.
 */
export declare type SaveType = 'Xlsx' | 'Xls' | 'Csv' | 'Pdf';
/**
 * Defines the order of Sorting. They are
 * * Ascending
 * * Descending
 */
export declare type SortOrder = 
/**  Defines SortDirection as Ascending */
'Ascending' | 
/**  Defines SortDirection as Descending */
'Descending';
/**
 * Cell format type
 */
export declare type FormatType = 'CellFormat' | 'NumberFormat';
/**
 * Border type
 */
export declare type BorderType = 'Vertical' | 'Horizontal' | 'Outer' | 'Inner';
/**
 * Sheet visibility state
 */
export declare type SheetState = 
/** Defines the state of sheet as visible. */
'Visible' | 
/** Defines the state of sheet as hidden. It can be unhidden later. */
'Hidden' | 
/** Defines the state of sheet as hidden. Once set, it cannot be unhidden. */
'VeryHidden';
/**
 * Workbook model type
 */
export declare type ModelType = 'Sheet' | 'Row' | 'Column';
/**
 * validation type
 */
export declare type ValidationType = 'WholeNumber' | 'Decimal' | 'Date' | 'TextLength' | 'List' | 'Time' | 'Custom';
/**
 * validation operator
 */
export declare type ValidationOperator = 'Between' | 'NotBetween' | 'EqualTo' | 'NotEqualTo' | 'LessThan' | 'GreaterThan' | 'GreaterThanOrEqualTo' | 'LessThanOrEqualTo';
/**
 * Merge type
 */
export declare type MergeType = 
/** Merge all the cells between provided range. */
'All' | 
/** Merge the cells row-wise. */
'Horizontally' | 
/** Merge the cells column-wise. */
'Vertically';
/**
 * Conditional formatting HighlightCell Type
 *
 * @hidden
 */
export declare type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' | 'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
/**
 * Conditional formatting TopBottom Type
 *
 * @hidden
 */
export declare type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' | 'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
/**
 * Conditional formatting DataBar Type
 *
 * @hidden
 */
export declare type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' | 'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
/**
 * Conditional formatting ColorScale Type
 *
 * @hidden
 */
export declare type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' | 'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' | 'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
/**
 * Conditional formatting IconSet Type
 *
 * @hidden
 */
export declare type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' | 'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' | 'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' | 'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' | 'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
export declare type CFColor = 'RedFT' | 'YellowFT' | 'GreenFT' | 'RedF' | 'RedT';
/**
 * Clear type
 */
export declare type ClearType = 
/** Clear the content, formats and hyperlinks applied in the provided range. */
'Clear All' | 
/** Clear the formats applied in the provided range. */
'Clear Formats' | 
/** Clear the content in the provided range. */
'Clear Contents' | 
/** Clear the hyperlinks applied in the provided range. */
'Clear Hyperlinks';
/**
 * Chart type
 */
export declare type ChartType = 
/**  Define the Column series. */
'Column' | 
/**  Define the StackingColumn series. */
'StackingColumn' | 
/** Define the StackingColumn100 series */
'StackingColumn100' | 
/**  Define the line series. */
'Line' | 
/**  Define the StackingLine series. */
'StackingLine' | 
/** Define the StackingLine100 series */
'StackingLine100' | 
/**  Define the Bar series. */
'Bar' | 
/**  Define the StackingBar series. */
'StackingBar' | 
/** Define the StackingBar100 series */
'StackingBar100' | 
/**  Define the Area series. */
'Area' | 
/**  Define the StackingArea series. */
'StackingArea' | 
/** Define the StackingArea100 series */
'StackingArea100' | 
/**  Define the Scatter series. */
'Scatter' | 
/**  Define the Pie series. */
'Pie' | 
/**  Define the Doughnut series. */
'Doughnut';
/**
 * Chart theme
 */
export declare type ChartTheme = 
/**  Render a chart with Material theme. */
'Material' | 
/**  Render a chart with Fabric theme. */
'Fabric' | 
/**  Render a chart with Bootstrap theme. */
'Bootstrap' | 
/**  Render a chart with HighcontrastLight theme. */
'HighContrastLight' | 
/**  Render a chart with MaterialDark theme. */
'MaterialDark' | 
/**  Render a chart with FabricDark theme. */
'FabricDark' | 
/**  Render a chart with HighContrast theme. */
'HighContrast' | 
/**  Render a chart with BootstrapDark theme. */
'BootstrapDark' | 
/**  Render a chart with Bootstrap4 theme. */
'Bootstrap4' | 
/**  Render a chart with Bootstrap5Dark theme. */
'Bootstrap5Dark' | 
/**  Render a chart with Bootstrap5 theme. */
'Bootstrap5' | 
/**  Render a chart with Tailwind theme. */
'Tailwind' | 
/**  Render a chart with TailwindDark theme. */
'TailwindDark' | 
/**  Render a chart with Tailwind3 theme. */
'Tailwind3' | 
/**  Render a chart with Tailwind3Dark theme. */
'Tailwind3Dark' | 
/**  Render a chart with Fluent theme. */
'Fluent' | 
/**  Render a chart with FluentDark theme. */
'FluentDark' | 
/**  Render a chart with Fluent 2 theme. */
'Fluent2' | 
/**  Render a chart with Fluent 2 dark theme. */
'Fluent2Dark' | 
/**  Render a chart with Material3 theme. */
'Material3' | 
/**  Render a chart with Material3Dark theme. */
'Material3Dark';
/**
 * Defines the position of the legend. They are
 * * auto - Places the legend based on area type.
 * * top - Displays the legend on the top of chart.
 * * left - Displays the legend on the left of chart.
 * * bottom - Displays the legend on the bottom of chart.
 * * right - Displays the legend on the right of chart.
 */
export declare type LegendPosition = 
/** Places the legend based on area type. */
'Auto' | 
/** Places the legend on the top of chart. */
'Top' | 
/** Places the legend on the left of chart. */
'Left' | 
/** Places the legend on the bottom of chart. */
'Bottom' | 
/** Places the legend on the right of chart. */
'Right';
/**
 * Defines the LabelPosition, They are.
 * * outer - Position the label outside the point.
 * * top - Position the label on top of the point.
 * * bottom - Position the label on bottom of the point.
 * * middle - Position the label to middle of the point.
 * * auto - Position the label based on series.
 */
export declare type LabelPosition = 
/** Position the label outside the point. */
'Outer' | 
/** Position the label on top of the point. */
'Top' | 
/** Position the label on bottom of the point. */
'Bottom' | 
/** Position the label to middle of the point. */
'Middle' | 
/** Position the label based on series. */
'Auto';
/**
 * Defines the shape of marker. They are
 * * circle - Renders a circle.
 * * rectangle - Renders a rectangle.
 * * triangle - Renders a triangle.
 * * diamond - Renders a diamond.
 * * cross - Renders a cross.
 * * horizontalLine - Renders a horizontalLine.
 * * verticalLine - Renders a verticalLine.
 * * pentagon- Renders a pentagon.
 * * invertedTriangle - Renders a invertedTriangle.
 * * image - Renders a image.
 */
export declare type ChartShape = 
/** Render a circle. */
'Circle' | 
/** Render a Triangle. */
'Triangle' | 
/** Render a Diamond. */
'Diamond' | 
/** Render a Plus. */
'Plus' | 
/** Render a none */
'None';
/**
 * Defines fill type options.
 */
export declare type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
/**
 * Defines Auto fill direction options.
 */
export declare type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
/**
 * Defines the types of page orientation.
 */
export declare type PdfPageOrientation = 
/** Used to display content in a vertical layout. */
'Portrait' | 
/** Used to display content in a horizontal layout. */
'Landscape';
/**
 * Defines the calculation modes for spreadsheet formulas.
 */
export declare type CalculationMode = 
/**
 * Formulas are recalculated automatically whenever a change affecting a value occurs in the spreadsheet.
 */
'Automatic' | 
/**
 * Formulas are recalculated only when explicitly triggered by the user.
 */
'Manual';
