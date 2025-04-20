import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { freezePaneData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';
/**
 * Freeze pane Spreadsheet sample
 */
function FreezePane() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let spreadsheet;
    const cellStyle = { fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' };
    const bold = { fontWeight: 'bold' };
    function onCreated() {
        spreadsheet.wrap("C2:P2");
        spreadsheet.merge('A1:B1');
        spreadsheet.merge('C1:P1');
        spreadsheet.cellFormat({
            backgroundColor: '#4e4ee6', color: '#FFFFF4', fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle'
        }, 'A1:P2');
        spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4' }, 'A3:B26');
        spreadsheet.numberFormat('$#,##0.00', 'C2:P26');
        spreadsheet.numberFormat('$#,##0.00', 'O27:P27');
    }
    return (<div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent openUrl='http://localhost:62728/api/spreadsheet/open' saveUrl='http://localhost:62728/api/spreadsheet/save' ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)}>
                    <SheetsDirective>
                        <SheetDirective name='Gross Salary' frozenRows={2} frozenColumns={2} selectedRange='C1'>
                            <RangesDirective>
                                <RangeDirective dataSource={freezePaneData} startCell='A2'></RangeDirective>
                            </RangesDirective>
                            <RowsDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Period' style={cellStyle}></CellDirective>
                                        <CellDirective index={3} value='Total Gross Salary' style={cellStyle}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective index={26}>
                                    <CellsDirective>
                                        <CellDirective index={13} value="Total Amount:" style={bold}></CellDirective>
                                        <CellDirective formula='=SUM(O4:O26)' style={cellStyle}></CellDirective>
                                        <CellDirective formula='=SUM(P4:P26)' style={cellStyle}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={80}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the <code>Spreadsheet</code> freeze pane feature by applying frozen rows and columns with the Gross Salary scenario as an example. In this sample, you can see the frozen rows/columns that are visible while scrolling the sheet content vertically/horizontally.
                </p>
            </div>
            <div id="description">
                <p>
                    Freeze Panes helps you to keep particular rows or columns visible when scrolling the sheet content in the spreadsheet.
                    You can specify the number of frozen rows and columns using <code>frozenRows</code> and <code>frozenColumns</code> properties inside the `Sheet` property
                </p>
                <p>
                    In this sample, the first 2 rows and columns are frozen using the `frozenRows` and `frozenColumns` properties.
                </p>
                <p>
                    More information about <code>freeze pane</code> can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/getting-started"> documentation</a> section.
                </p>
            </div>
        </div>);
}
export default FreezePane;
